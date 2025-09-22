// storage.js - Handles reading from and writing to localStorage.
/* global texts, currentLang, SAFE_LOCAL_STORAGE */

const GLOBAL_SCOPE =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
        ? global
        : typeof self !== 'undefined'
          ? self
          : null;

const DEVICE_STORAGE_KEY = 'cameraPowerPlanner_devices';
const SETUP_STORAGE_KEY = 'cameraPowerPlanner_setups';
const SESSION_STATE_KEY = 'cameraPowerPlanner_session';
const FEEDBACK_STORAGE_KEY = 'cameraPowerPlanner_feedback';
const PROJECT_STORAGE_KEY = 'cameraPowerPlanner_project';
const FAVORITES_STORAGE_KEY = 'cameraPowerPlanner_favorites';
const DEVICE_SCHEMA_CACHE_KEY = 'cameraPowerPlanner_schemaCache';
const CUSTOM_FONT_STORAGE_KEY_DEFAULT = 'cameraPowerPlanner_customFonts';

function ensureCustomFontStorageKeyName() {
  if (!GLOBAL_SCOPE) {
    return CUSTOM_FONT_STORAGE_KEY_DEFAULT;
  }

  const existingName =
    typeof GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY_NAME === 'string'
      ? GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY_NAME
      : typeof GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY === 'string'
        ? GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY
        : CUSTOM_FONT_STORAGE_KEY_DEFAULT;

  let normalizedName = existingName;
  if (existingName === 'cinePowerPlanner_customFonts') {
    normalizedName = CUSTOM_FONT_STORAGE_KEY_DEFAULT;
  }

  if (GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY !== normalizedName) {
    GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY = normalizedName;
  }

  if (GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY_NAME !== normalizedName) {
    GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY_NAME = normalizedName;
  }

  return normalizedName;
}

function getCustomFontStorageKeyName() {
  if (GLOBAL_SCOPE &&
      typeof GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY_NAME === 'string') {
    return GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY_NAME;
  }

  return ensureCustomFontStorageKeyName();
}

ensureCustomFontStorageKeyName();

const CUSTOM_LOGO_STORAGE_KEY = 'customLogo';
const AUTO_GEAR_RULES_STORAGE_KEY = 'cameraPowerPlanner_autoGearRules';
const AUTO_GEAR_SEEDED_STORAGE_KEY = 'cameraPowerPlanner_autoGearSeeded';
const AUTO_GEAR_BACKUPS_STORAGE_KEY = 'cameraPowerPlanner_autoGearBackups';
const AUTO_GEAR_PRESETS_STORAGE_KEY = 'cameraPowerPlanner_autoGearPresets';
const AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY = 'cameraPowerPlanner_autoGearActivePreset';
const AUTO_GEAR_AUTO_PRESET_STORAGE_KEY = 'cameraPowerPlanner_autoGearAutoPreset';
const AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY = 'cameraPowerPlanner_autoGearShowBackups';
const AUTO_BACKUP_NAME_PREFIX = 'auto-backup-';
const AUTO_BACKUP_DELETION_PREFIX = 'auto-backup-before-delete-';
const MAX_AUTO_BACKUPS = 50;
const MAX_DELETION_BACKUPS = 20;

const STORAGE_BACKUP_SUFFIX = '__backup';
const MAX_SAVE_ATTEMPTS = 3;
const MAX_QUOTA_RECOVERY_STEPS = 100;
const STORAGE_MIGRATION_BACKUP_SUFFIX = '__legacyMigrationBackup';
const RAW_STORAGE_BACKUP_KEYS = new Set([
  getCustomFontStorageKeyName(),
  CUSTOM_LOGO_STORAGE_KEY,
]);

function createStorageMigrationBackup(storage, key, originalValue) {
  if (!storage || typeof storage.setItem !== 'function') {
    return;
  }
  if (originalValue === null || originalValue === undefined) {
    return;
  }

  const backupKey = `${key}${STORAGE_MIGRATION_BACKUP_SUFFIX}`;
  let hasExistingBackup = false;

  if (typeof storage.getItem === 'function') {
    try {
      const existing = storage.getItem(backupKey);
      if (existing !== null && existing !== undefined) {
        hasExistingBackup = true;
      }
    } catch (inspectionError) {
      console.warn(`Unable to inspect migration backup for ${key}`, inspectionError);
    }
  }

  if (hasExistingBackup) {
    return;
  }

  let serialized;
  try {
    serialized = JSON.stringify({
      createdAt: new Date().toISOString(),
      data: originalValue,
    });
  } catch (serializationError) {
    console.warn(`Unable to serialize migration backup for ${key}`, serializationError);
    return;
  }

  try {
    storage.setItem(backupKey, serialized);
    console.log(`Stored migration backup for ${key}.`);
  } catch (writeError) {
    console.warn(`Unable to create migration backup for ${key}`, writeError);
  }
}

const PRIMARY_STORAGE_KEYS = [
  DEVICE_STORAGE_KEY,
  SETUP_STORAGE_KEY,
  SESSION_STATE_KEY,
  FEEDBACK_STORAGE_KEY,
  PROJECT_STORAGE_KEY,
  FAVORITES_STORAGE_KEY,
  DEVICE_SCHEMA_CACHE_KEY,
  AUTO_GEAR_RULES_STORAGE_KEY,
  AUTO_GEAR_SEEDED_STORAGE_KEY,
  AUTO_GEAR_BACKUPS_STORAGE_KEY,
  AUTO_GEAR_PRESETS_STORAGE_KEY,
  AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY,
  AUTO_GEAR_AUTO_PRESET_STORAGE_KEY,
  AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY,
];

const SIMPLE_STORAGE_KEYS = [
  CUSTOM_LOGO_STORAGE_KEY,
  getCustomFontStorageKeyName(),
  'darkMode',
  'pinkMode',
  'highContrast',
  'reduceMotion',
  'relaxedSpacing',
  'showAutoBackups',
  'accentColor',
  'fontSize',
  'fontFamily',
  'language',
  'iosPwaHelpShown',
];

const STORAGE_ALERT_FLAG_NAME = '__cameraPowerPlannerStorageAlertShown';

let storageErrorAlertShown = false;
if (GLOBAL_SCOPE) {
  if (typeof GLOBAL_SCOPE[STORAGE_ALERT_FLAG_NAME] === 'boolean') {
    storageErrorAlertShown = GLOBAL_SCOPE[STORAGE_ALERT_FLAG_NAME];
  } else {
    GLOBAL_SCOPE[STORAGE_ALERT_FLAG_NAME] = false;
  }
}

const DEVICE_COLLECTION_KEYS = [
  'cameras',
  'monitors',
  'video',
  'viewfinders',
  'directorMonitors',
  'iosVideo',
  'videoAssist',
  'media',
  'lenses',
  'batteries',
  'batteryHotswaps',
  'wirelessReceivers',
];

const FIZ_COLLECTION_KEYS = ['motors', 'handUnits', 'controllers', 'distance'];

const ACCESSORY_COLLECTION_KEYS = [
  'chargers',
  'cages',
  'powerPlates',
  'cameraSupport',
  'matteboxes',
  'filters',
  'rigging',
  'batteries',
  'cables',
  'videoAssist',
  'media',
  'tripodHeads',
  'tripods',
  'sliders',
  'cameraStabiliser',
  'grip',
  'carts',
];

const getStorageManager = () =>
  typeof navigator !== 'undefined' &&
  navigator &&
  typeof navigator.storage === 'object'
    ? navigator.storage
    : null;

// Safely detect usable localStorage. Some environments (like private browsing)
// may block access and throw errors. If unavailable, fall back to
// sessionStorage when possible so data persists across reloads within the same
// tab. When neither storage option is available we fall back to a simple
// in-memory store to avoid runtime errors even though the data will be lost on
// reload.
const STORAGE_TEST_KEY = '__storage_test__';

const QUOTA_ERROR_NAMES = new Set([
  'QuotaExceededError',
  'NS_ERROR_DOM_QUOTA_REACHED',
]);
const QUOTA_ERROR_CODES = new Set([22, 1014]);
const QUOTA_ERROR_NUMBERS = new Set([22, 1014]);

function isQuotaExceededError(error) {
  if (!error || typeof error !== 'object') {
    return false;
  }
  if (typeof error.code === 'number' && QUOTA_ERROR_CODES.has(error.code)) {
    return true;
  }
  if (typeof error.number === 'number' && QUOTA_ERROR_NUMBERS.has(error.number)) {
    return true;
  }
  if (typeof error.name === 'string' && QUOTA_ERROR_NAMES.has(error.name)) {
    return true;
  }
  return false;
}

function hasStoredEntries(storage) {
  if (!storage) return false;

  try {
    if (typeof storage.length === 'number' && storage.length > 0) {
      return true;
    }
  } catch (lengthError) {
    console.warn('Unable to read storage length after quota error', lengthError);
  }

  if (typeof storage.getItem === 'function') {
    try {
      for (let i = 0; i < PRIMARY_STORAGE_KEYS.length; i += 1) {
        const key = PRIMARY_STORAGE_KEYS[i];
        if (storage.getItem(key) !== null) {
          return true;
        }
        const backupKey = `${key}${STORAGE_BACKUP_SUFFIX}`;
        if (storage.getItem(backupKey) !== null) {
          return true;
        }
      }

      for (let i = 0; i < SIMPLE_STORAGE_KEYS.length; i += 1) {
        const key = SIMPLE_STORAGE_KEYS[i];
        if (storage.getItem(key) !== null) {
          return true;
        }
        if (RAW_STORAGE_BACKUP_KEYS.has(key)) {
          const backupKey = `${key}${STORAGE_BACKUP_SUFFIX}`;
          if (storage.getItem(backupKey) !== null) {
            return true;
          }
        }
      }
    } catch (inspectionError) {
      console.warn('Unable to inspect known storage keys after quota error', inspectionError);
    }
  }

  if (typeof storage.key === 'function') {
    try {
      const length = typeof storage.length === 'number' ? storage.length : 0;
      for (let index = 0; index < length; index += 1) {
        const candidate = storage.key(index);
        if (typeof candidate === 'string' && candidate) {
          return true;
        }
      }
    } catch (iterationError) {
      console.warn('Unable to iterate storage keys after quota error', iterationError);
    }
  }

  return false;
}

function verifyStorage(storage) {
  if (!storage) return null;
  try {
    storage.setItem(STORAGE_TEST_KEY, '1');
  } catch (error) {
    if (isQuotaExceededError(error) && hasStoredEntries(storage)) {
      console.warn(
        'localStorage quota exceeded. Existing planner data will remain available but new saves may fail.',
        error,
      );
      return storage;
    }
    throw error;
  }

  try {
    storage.removeItem(STORAGE_TEST_KEY);
  } catch (cleanupError) {
    console.warn('Unable to clean up storage test key', cleanupError);
  }

  return storage;
}

function createMemoryStorage() {
  let memoryStore = {};
  return {
    get length() {
      return Object.keys(memoryStore).length;
    },
    key(index) {
      const keys = Object.keys(memoryStore);
      return index >= 0 && index < keys.length ? keys[index] : null;
    },
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(memoryStore, key)
        ? memoryStore[key]
        : null;
    },
    setItem(key, value) {
      memoryStore[key] = String(value);
    },
    removeItem(key) {
      delete memoryStore[key];
    },
    clear() {
      memoryStore = {};
    },
    keys() {
      return Object.keys(memoryStore);
    },
  };
}

function initializeSafeLocalStorage() {
  if (typeof window !== 'undefined') {
    let candidate = null;
    try {
      if ('localStorage' in window) {
        candidate = window.localStorage;
        const storage = verifyStorage(candidate);
        if (storage) {
          lastFailedUpgradeCandidate = null;
          return { storage, type: 'local' };
        }
      }
    } catch (e) {
      console.warn('localStorage is unavailable:', e);
      if (candidate) {
        lastFailedUpgradeCandidate = candidate;
      }
    }

    try {
      if ('sessionStorage' in window) {
        const storage = verifyStorage(window.sessionStorage);
        if (storage) {
          console.warn('Falling back to sessionStorage; data persists for this tab only.');
          return { storage, type: 'session' };
        }
      }
    } catch (e) {
      console.warn('sessionStorage fallback is unavailable:', e);
    }
  }

  alertStorageError();
  return { storage: createMemoryStorage(), type: 'memory' };
}

let lastFailedUpgradeCandidate = null;
let safeLocalStorageInfo = initializeSafeLocalStorage();

function migrateSnapshotToStorage(snapshot, target) {
  const migratedKeys = [];
  const failedKeys = [];

  if (!snapshot || !target || typeof target.setItem !== 'function') {
    return { migratedKeys, failedKeys };
  }

  Object.keys(snapshot).forEach((key) => {
    const value = snapshot[key];
    if (value === null || value === undefined) {
      return;
    }

    let existing = null;
    let existingRead = false;
    try {
      existing = target.getItem(key);
      existingRead = true;
    } catch (readError) {
      console.warn('Unable to inspect localStorage during upgrade', key, readError);
    }

    if (existingRead && existing !== null && existing !== undefined && existing !== value) {
      createStorageMigrationBackup(target, key, existing);
    }

    if (existingRead && existing === value) {
      migratedKeys.push(key);
      return;
    }

    try {
      target.setItem(key, value);
      migratedKeys.push(key);
    } catch (writeError) {
      console.warn('Unable to migrate storage key during upgrade', key, writeError);
      failedKeys.push(key);
    }
  });

  return { migratedKeys, failedKeys };
}

function clearMigratedKeys(snapshot, source, keysToRemove) {
  if (!snapshot || !source || typeof source.removeItem !== 'function') {
    return;
  }

  const keys = Array.isArray(keysToRemove) && keysToRemove.length > 0
    ? keysToRemove
    : Object.keys(snapshot);

  keys.forEach((key) => {
    try {
      source.removeItem(key);
    } catch (error) {
      console.warn('Unable to remove migrated storage key from fallback', key, error);
    }
  });
}

function rollbackMigratedKeys(target, keys) {
  if (!target || typeof target.removeItem !== 'function' || !Array.isArray(keys)) {
    return;
  }

  keys.forEach((key) => {
    try {
      target.removeItem(key);
    } catch (error) {
      console.warn('Unable to roll back migrated storage key after upgrade failure', key, error);
    }
  });
}

function snapshotStorageEntries(storage) {
  const snapshot = Object.create(null);
  if (!storage) {
    return snapshot;
  }

  const captureKey = (key) => {
    if (typeof key !== 'string' || !key) {
      return;
    }
    let value;
    try {
      if (typeof storage.getItem === 'function') {
        value = storage.getItem(key);
      } else if (Object.prototype.hasOwnProperty.call(storage, key)) {
        value = storage[key];
      }
    } catch (error) {
      console.warn('Unable to read storage key during snapshot', key, error);
      alertStorageError('migration-read');
      return;
    }
    if (value === null || value === undefined) {
      return;
    }
    snapshot[key] = String(value);
  };

  if (typeof storage.key === 'function' && typeof storage.length === 'number') {
    for (let index = 0; index < storage.length; index += 1) {
      captureKey(storage.key(index));
    }
    return snapshot;
  }

  if (typeof storage.keys === 'function') {
    try {
      const keys = storage.keys();
      if (Array.isArray(keys)) {
        keys.forEach(captureKey);
      }
    } catch (error) {
      console.warn('Unable to enumerate storage keys during snapshot', error);
      alertStorageError('migration-read');
    }
    return snapshot;
  }

  if (typeof storage.forEach === 'function') {
    try {
      storage.forEach((value, key) => {
        if (typeof key !== 'string') {
          return;
        }
        if (value === null || value === undefined) {
          return;
        }
        snapshot[key] = String(value);
      });
    } catch (error) {
      console.warn('Unable to iterate storage entries during snapshot', error);
      alertStorageError('migration-read');
    }
    return snapshot;
  }

  Object.keys(storage).forEach(captureKey);
  return snapshot;
}

function attemptLocalStorageUpgrade() {
  if (!safeLocalStorageInfo || safeLocalStorageInfo.type === 'local') {
    return safeLocalStorageInfo.storage;
  }

  if (typeof window === 'undefined') {
    return safeLocalStorageInfo.storage;
  }

  let candidate;
  try {
    if (!('localStorage' in window)) {
      return safeLocalStorageInfo.storage;
    }
    candidate = window.localStorage;
  } catch (error) {
    console.warn('Unable to access localStorage during upgrade attempt', error);
    lastFailedUpgradeCandidate = null;
    return safeLocalStorageInfo.storage;
  }

  if (candidate && candidate === lastFailedUpgradeCandidate) {
    return safeLocalStorageInfo.storage;
  }

  let verified;
  try {
    verified = verifyStorage(candidate);
  } catch (verificationError) {
    console.warn('localStorage upgrade verification failed', verificationError);
    lastFailedUpgradeCandidate = candidate;
    return safeLocalStorageInfo.storage;
  }

  if (!verified || verified === safeLocalStorageInfo.storage) {
    if (!verified) {
      lastFailedUpgradeCandidate = candidate;
    } else {
      lastFailedUpgradeCandidate = null;
    }
    return safeLocalStorageInfo.storage;
  }

  const snapshot = snapshotStorageEntries(safeLocalStorageInfo.storage);
  const { migratedKeys, failedKeys } = migrateSnapshotToStorage(snapshot, verified);

  if (failedKeys.length > 0) {
    rollbackMigratedKeys(verified, migratedKeys);
    console.warn(
      'Aborting localStorage upgrade because some entries could not be migrated. Continuing to use fallback storage.',
      failedKeys,
    );
    alertStorageError('migration-write');
    lastFailedUpgradeCandidate = candidate;
    return safeLocalStorageInfo.storage;
  }

  clearMigratedKeys(snapshot, safeLocalStorageInfo.storage, migratedKeys);

  safeLocalStorageInfo = { storage: verified, type: 'local' };
  lastFailedUpgradeCandidate = null;
  return verified;
}

function getSafeLocalStorage() {
  if (!safeLocalStorageInfo || !safeLocalStorageInfo.storage) {
    safeLocalStorageInfo = initializeSafeLocalStorage();
  }

  if (safeLocalStorageInfo.type !== 'local') {
    attemptLocalStorageUpgrade();
  }

  return safeLocalStorageInfo.storage;
}

if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
  try {
    Object.defineProperty(GLOBAL_SCOPE, 'SAFE_LOCAL_STORAGE', {
      configurable: true,
      get: getSafeLocalStorage,
    });
  } catch {
    GLOBAL_SCOPE.SAFE_LOCAL_STORAGE = getSafeLocalStorage();
  }
}

let persistentStorageRequestPromise = null;

function requestPersistentStorage() {
  if (persistentStorageRequestPromise) {
    return persistentStorageRequestPromise;
  }

  const storageManager = getStorageManager();
  if (!storageManager || typeof storageManager.persist !== 'function') {
    persistentStorageRequestPromise = Promise.resolve({
      supported: Boolean(storageManager),
      granted: false,
      alreadyGranted: false,
    });
    return persistentStorageRequestPromise;
  }

  persistentStorageRequestPromise = (async () => {
    let alreadyGranted = false;
    const supportsPersistedCheck = typeof storageManager.persisted === 'function';

    if (supportsPersistedCheck) {
      try {
        alreadyGranted = await storageManager.persisted();
      } catch (persistedError) {
        console.warn('Unable to determine persistent storage state', persistedError);
      }
    }

    if (alreadyGranted) {
      return {
        supported: true,
        granted: true,
        alreadyGranted: true,
      };
    }

    try {
      const granted = await storageManager.persist();
      if (!granted && supportsPersistedCheck) {
        try {
          const persisted = await storageManager.persisted();
          if (persisted) {
            return {
              supported: true,
              granted: true,
              alreadyGranted: true,
            };
          }
        } catch (verifyError) {
          console.warn('Unable to verify persistent storage after request', verifyError);
        }
      }

      return {
        supported: true,
        granted,
        alreadyGranted: false,
      };
    } catch (error) {
      console.warn('Persistent storage request failed', error);
      return {
        supported: true,
        granted: false,
        alreadyGranted: false,
        error,
      };
    }
  })();

  return persistentStorageRequestPromise;
}

if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
  requestPersistentStorage();
}

// Helper to check for plain objects
function isPlainObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}

function getAutoBackupTimestamp(name) {
  if (typeof name !== 'string') {
    return Number.NEGATIVE_INFINITY;
  }

  let match = null;
  if (name.startsWith(AUTO_BACKUP_NAME_PREFIX)) {
    match = name.match(/^auto-backup-(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/);
    if (!match) {
      return Number.NEGATIVE_INFINITY;
    }
    const [, year, month, day, hour, minute] = match;
    const date = new Date(
      Number.parseInt(year, 10),
      Number.parseInt(month, 10) - 1,
      Number.parseInt(day, 10),
      Number.parseInt(hour, 10),
      Number.parseInt(minute, 10),
      0,
      0,
    );
    const time = date.getTime();
    return Number.isNaN(time) ? Number.NEGATIVE_INFINITY : time;
  }

  if (name.startsWith(AUTO_BACKUP_DELETION_PREFIX)) {
    match = name.match(/^auto-backup-before-delete-(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/);
    if (!match) {
      return Number.NEGATIVE_INFINITY;
    }
    const [, year, month, day, hour, minute, second] = match;
    const date = new Date(
      Number.parseInt(year, 10),
      Number.parseInt(month, 10) - 1,
      Number.parseInt(day, 10),
      Number.parseInt(hour, 10),
      Number.parseInt(minute, 10),
      Number.parseInt(second, 10),
      0,
    );
    const time = date.getTime();
    return Number.isNaN(time) ? Number.NEGATIVE_INFINITY : time;
  }

  return Number.NEGATIVE_INFINITY;
}

function collectAutoBackupEntries(container, prefix) {
  if (!isPlainObject(container) || typeof prefix !== 'string') {
    return [];
  }

  return Object.keys(container)
    .filter((key) => typeof key === 'string' && key.startsWith(prefix))
    .map((key) => ({ key, timestamp: getAutoBackupTimestamp(key) }))
    .sort((a, b) => {
      if (a.timestamp !== b.timestamp) {
        return a.timestamp - b.timestamp;
      }
      return a.key.localeCompare(b.key);
    });
}

function createStableValueSignature(value) {
  if (value === null) {
    return 'null';
  }
  if (value === undefined) {
    return 'undefined';
  }
  if (Array.isArray(value)) {
    return `[${value.map(item => createStableValueSignature(item)).join(',')}]`;
  }
  if (isPlainObject(value)) {
    const keys = Object.keys(value).sort();
    const entries = keys.map(key => `${JSON.stringify(key)}:${createStableValueSignature(value[key])}`);
    return `{${entries.join(',')}}`;
  }
  if (typeof value === 'number') {
    if (Number.isNaN(value)) {
      return 'number:NaN';
    }
    if (!Number.isFinite(value)) {
      return value > 0 ? 'number:Infinity' : 'number:-Infinity';
    }
    return `number:${value}`;
  }
  if (typeof value === 'bigint') {
    return `bigint:${value.toString()}`;
  }
  if (typeof value === 'boolean') {
    return value ? 'boolean:true' : 'boolean:false';
  }
  if (typeof value === 'string') {
    return `string:${value}`;
  }
  if (typeof value === 'symbol') {
    return `symbol:${String(value)}`;
  }
  if (typeof value === 'function') {
    return `function:${value.name || 'anonymous'}`;
  }
  return `${typeof value}:${String(value)}`;
}

function removeDuplicateAutoBackupEntries(container, entries) {
  if (!isPlainObject(container) || !Array.isArray(entries) || entries.length < 2) {
    return [];
  }

  const removedKeys = [];
  const seenSignatures = new Map();

  for (let index = entries.length - 1; index >= 0; index -= 1) {
    const entry = entries[index];
    if (!entry || typeof entry.key !== 'string') {
      continue;
    }
    const signature = createStableValueSignature(container[entry.key]);
    if (seenSignatures.has(signature)) {
      delete container[entry.key];
      entries.splice(index, 1);
      removedKeys.push(entry.key);
    } else {
      seenSignatures.set(signature, entry.key);
    }
  }

  return removedKeys;
}

function enforceAutoBackupLimits(container) {
  if (!isPlainObject(container)) {
    return [];
  }

  const removed = [];

  const autoBackups = collectAutoBackupEntries(container, AUTO_BACKUP_NAME_PREFIX);
  if (autoBackups.length > MAX_AUTO_BACKUPS) {
    removed.push(...removeDuplicateAutoBackupEntries(container, autoBackups));
    while (autoBackups.length > MAX_AUTO_BACKUPS) {
      const entry = autoBackups.shift();
      if (!entry) {
        break;
      }
      delete container[entry.key];
      removed.push(entry.key);
    }
  }

  const deletionBackups = collectAutoBackupEntries(container, AUTO_BACKUP_DELETION_PREFIX);
  if (deletionBackups.length > MAX_DELETION_BACKUPS) {
    removed.push(...removeDuplicateAutoBackupEntries(container, deletionBackups));
    while (deletionBackups.length > MAX_DELETION_BACKUPS) {
      const entry = deletionBackups.shift();
      if (!entry) {
        break;
      }
      delete container[entry.key];
      removed.push(entry.key);
    }
  }

  if (removed.length > 0) {
    console.warn(
      `Removed ${removed.length} older automatic backup${removed.length > 1 ? 's' : ''} to stay within storage limits.`,
      removed,
    );
  }

  return removed;
}

function removeOldestAutoBackupEntry(container) {
  if (!isPlainObject(container)) {
    return null;
  }

  const autoBackups = collectAutoBackupEntries(container, AUTO_BACKUP_NAME_PREFIX);
  if (autoBackups.length > 0) {
    const oldest = autoBackups.shift();
    if (oldest) {
      delete container[oldest.key];
      return oldest.key;
    }
  }

  const deletionBackups = collectAutoBackupEntries(container, AUTO_BACKUP_DELETION_PREFIX);
  if (deletionBackups.length > 0) {
    const oldest = deletionBackups.shift();
    if (oldest) {
      delete container[oldest.key];
      return oldest.key;
    }
  }

  return null;
}

function shouldDisplayStorageAlert(reason) {
  if (!reason) {
    return true;
  }

  if (reason === 'migration-read') {
    if (typeof safeLocalStorageInfo !== 'undefined' && safeLocalStorageInfo) {
      if (safeLocalStorageInfo.type && safeLocalStorageInfo.type !== 'memory') {
        return false;
      }
    }
  }

  return true;
}

function alertStorageError(reason) {
  if (!shouldDisplayStorageAlert(reason)) {
    return;
  }

  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE[STORAGE_ALERT_FLAG_NAME] === 'boolean') {
    storageErrorAlertShown = GLOBAL_SCOPE[STORAGE_ALERT_FLAG_NAME];
  }

  if (storageErrorAlertShown) {
    return;
  }

  storageErrorAlertShown = true;
  if (GLOBAL_SCOPE) {
    GLOBAL_SCOPE[STORAGE_ALERT_FLAG_NAME] = true;
  }

  if (typeof window === 'undefined' || typeof window.alert !== 'function') return;
  let msg = 'Storage error: Unable to access local data. Changes may not be saved.';
  try {
    if (typeof texts !== 'undefined') {
      const lang = typeof currentLang !== 'undefined' && texts[currentLang]
        ? currentLang
        : 'en';
      msg = texts[lang]?.alertStorageError || msg;
    }
  } catch (err) {
    void err;
    // ignore and fall back to default
  }
  window.alert(msg);
}

function getWindowStorage(name) {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window[name];
  } catch (error) {
    console.warn(`Unable to access ${name} during legacy migration`, error);
    return null;
  }
}

function collectUniqueStorages(storages) {
  const unique = [];
  for (let i = 0; i < storages.length; i += 1) {
    const storage = storages[i];
    if (!storage || typeof storage.getItem !== 'function') {
      continue;
    }
    if (!unique.includes(storage)) {
      unique.push(storage);
    }
  }
  return unique;
}

function migrateKeyBetweenStorages(source, target, legacyKey, modernKey, options = {}) {
  if (!source || typeof source.getItem !== 'function') {
    return false;
  }

  const { keepLegacy = false } = options;

  let legacyValue;
  try {
    legacyValue = source.getItem(legacyKey);
  } catch (error) {
    console.warn(`Unable to read legacy storage key ${legacyKey}`, error);
    alertStorageError('migration-read');
    return false;
  }

  if (legacyValue === null || legacyValue === undefined) {
    return false;
  }

  const destination = target && typeof target.setItem === 'function' ? target : source;

  try {
    const existing = destination.getItem(modernKey);
    if (existing !== null && existing !== undefined) {
      if (!keepLegacy && source !== destination) {
        try {
          source.removeItem(legacyKey);
        } catch (removeError) {
          console.warn(`Unable to remove legacy storage key ${legacyKey}`, removeError);
        }
      }
      return false;
    }
  } catch (readError) {
    console.warn(`Unable to inspect destination storage for ${modernKey}`, readError);
  }

  try {
    destination.setItem(modernKey, legacyValue);
  } catch (writeError) {
    console.warn(`Unable to migrate legacy storage key ${legacyKey}`, writeError);
    return false;
  }

  if (!keepLegacy) {
    try {
      source.removeItem(legacyKey);
    } catch (removeError) {
      console.warn(`Unable to remove legacy storage key ${legacyKey} after migration`, removeError);
    }
  }

  return true;
}

function migrateKeyInStorages(storages, preferredTarget, legacyKey, modernKey, options) {
  let migrated = false;
  for (let i = 0; i < storages.length; i += 1) {
    if (migrateKeyBetweenStorages(storages[i], preferredTarget, legacyKey, modernKey, options)) {
      migrated = true;
    }
  }
  return migrated;
}

function migrateLegacyStorageKeys() {
  const safeStorage = getSafeLocalStorage();
  const localStorages = collectUniqueStorages([
    getWindowStorage('localStorage'),
    safeStorage,
  ]);
  const sessionStorages = collectUniqueStorages([
    getWindowStorage('sessionStorage'),
    typeof sessionStorage !== 'undefined' ? sessionStorage : null,
  ]);

  const legacyPrefix = 'cinePowerPlanner_';

  const mappings = [
    { legacy: `${legacyPrefix}devices`, modern: DEVICE_STORAGE_KEY },
    { legacy: `${legacyPrefix}setups`, modern: SETUP_STORAGE_KEY },
    { legacy: `${legacyPrefix}session`, modern: SESSION_STATE_KEY, includeSession: true },
    { legacy: `${legacyPrefix}feedback`, modern: FEEDBACK_STORAGE_KEY },
    { legacy: `${legacyPrefix}project`, modern: PROJECT_STORAGE_KEY },
    { legacy: `${legacyPrefix}projects`, modern: PROJECT_STORAGE_KEY },
    { legacy: `${legacyPrefix}favorites`, modern: FAVORITES_STORAGE_KEY },
    { legacy: `${legacyPrefix}schemaCache`, modern: DEVICE_SCHEMA_CACHE_KEY },
    { legacy: `${legacyPrefix}autoGearRules`, modern: AUTO_GEAR_RULES_STORAGE_KEY },
    { legacy: `${legacyPrefix}autoGearBackups`, modern: AUTO_GEAR_BACKUPS_STORAGE_KEY },
    { legacy: `${legacyPrefix}autoGearSeeded`, modern: AUTO_GEAR_SEEDED_STORAGE_KEY },
    { legacy: `${legacyPrefix}autoGearPresets`, modern: AUTO_GEAR_PRESETS_STORAGE_KEY },
    { legacy: `${legacyPrefix}autoGearActivePreset`, modern: AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY },
    { legacy: `${legacyPrefix}autoGearAutoPreset`, modern: AUTO_GEAR_AUTO_PRESET_STORAGE_KEY },
    { legacy: `${legacyPrefix}autoGearShowBackups`, modern: AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY },
    { legacy: `${legacyPrefix}customFonts`, modern: CUSTOM_FONT_STORAGE_KEY_DEFAULT, updateFontKey: true },
  ];

  mappings.forEach(({ legacy, modern, includeSession = false, updateFontKey = false }) => {
    const migratedLocal = migrateKeyInStorages(localStorages, safeStorage, legacy, modern);
    migrateKeyInStorages(
      localStorages,
      safeStorage,
      `${legacy}${STORAGE_BACKUP_SUFFIX}`,
      `${modern}${STORAGE_BACKUP_SUFFIX}`,
    );

    if (includeSession) {
      migrateKeyInStorages(sessionStorages, null, legacy, modern);
      migrateKeyInStorages(
        sessionStorages,
        null,
        `${legacy}${STORAGE_BACKUP_SUFFIX}`,
        `${modern}${STORAGE_BACKUP_SUFFIX}`,
      );
    }

    if (updateFontKey && migratedLocal && GLOBAL_SCOPE) {
      if (GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY === legacy) {
        GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY = modern;
      }
      if (GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY_NAME === legacy) {
        GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY_NAME = modern;
      }
    }
  });
}

function applyLegacyStorageMigrations() {
  migrateLegacyStorageKeys();
}

// Generic helpers for storage access
function loadJSONFromStorage(
  storage,
  key,
  errorMessage,
  defaultValue = null,
  options = {},
) {
  if (!storage) return defaultValue;

  const {
    disableBackup = false,
    backupKey,
    validate,
    restoreIfMissing = false,
    alertOnFailure = null,
  } = options || {};

  const fallbackKey = typeof backupKey === 'string' && backupKey
    ? backupKey
    : `${key}${STORAGE_BACKUP_SUFFIX}`;
  const useBackup = !disableBackup && fallbackKey && fallbackKey !== key;

  let shouldAlert = false;

  const parseRawValue = (raw, label) => {
    if (raw === null || raw === undefined) {
      return { ok: false, reason: 'missing' };
    }
    try {
      const parsed = JSON.parse(raw);
      if (typeof validate === 'function' && !validate(parsed)) {
        console.warn(`${errorMessage} Invalid data${label ? ` (${label})` : ''}.`);
        shouldAlert = true;
        return { ok: false, reason: 'invalid' };
      }
      return { ok: true, value: parsed, raw };
    } catch (err) {
      console.error(`${errorMessage}${label ? ` (${label})` : ''}`, err);
      shouldAlert = true;
      return { ok: false, reason: 'error' };
    }
  };

  let primaryRaw = null;
  try {
    primaryRaw = storage.getItem(key);
  } catch (err) {
    console.error(`${errorMessage} (read)`, err);
    shouldAlert = true;
  }

  const primary = parseRawValue(primaryRaw, '');
  if (primary.ok) {
    return primary.value;
  }

  const missingPrimary = !primary.ok && primary.reason === 'missing';

  const shouldAttemptBackup =
    useBackup && (shouldAlert || restoreIfMissing || missingPrimary);

  if (shouldAttemptBackup) {
    let backupRaw = null;
    try {
      backupRaw = storage.getItem(fallbackKey);
    } catch (err) {
      console.error(`${errorMessage} (backup read)`, err);
      shouldAlert = true;
    }

    const backup = parseRawValue(backupRaw, 'backup');
    if (backup.ok) {
      if (shouldAlert || missingPrimary) {
        console.warn(`Recovered ${key} from backup copy.`);
      }
      if (backup.raw !== null && backup.raw !== undefined) {
        try {
          storage.setItem(key, backup.raw);
        } catch (restoreError) {
          console.warn(`Unable to restore primary copy for ${key} from backup`, restoreError);
        }
      }
      return backup.value;
    }
  }

  if (shouldAlert) {
    alertStorageError(alertOnFailure);
  }

  return defaultValue;
}

function saveJSONToStorage(
  storage,
  key,
  value,
  errorMessage,
  successMessage,
  options = {},
) {
  if (!storage) return;

  const { disableBackup = false, backupKey, onQuotaExceeded } = options || {};
  const fallbackKey = typeof backupKey === 'string' && backupKey
    ? backupKey
    : `${key}${STORAGE_BACKUP_SUFFIX}`;
  const useBackup = !disableBackup && fallbackKey && fallbackKey !== key;

  const serializeValue = () => {
    try {
      return JSON.stringify(value);
    } catch (serializationError) {
      console.error(errorMessage, serializationError);
      alertStorageError();
      return null;
    }
  };

  const logSuccess = () => {
    if (successMessage) {
      console.log(successMessage);
    }
  };

  let preservedBackupValue;
  let hasPreservedBackup = false;
  let removedBackupDuringRetry = false;
  let quotaRecoverySteps = 0;
  let quotaRecoveryFailed = false;

  const registerQuotaRecoveryStep = () => {
    quotaRecoverySteps += 1;
    if (quotaRecoverySteps > MAX_QUOTA_RECOVERY_STEPS) {
      quotaRecoveryFailed = true;
      console.warn(`Exceeded maximum storage recovery attempts while saving ${key}.`);
      return false;
    }
    return true;
  };

  const attemptHandleQuota = (error, context = {}) => {
    if (!isQuotaExceededError(error) || typeof onQuotaExceeded !== 'function') {
      return false;
    }

    try {
      return onQuotaExceeded(error, {
        storage,
        key,
        value,
        ...context,
      }) === true;
    } catch (handlerError) {
      const scope = context && context.isBackup ? ' (backup)' : '';
      console.error(`Error while handling quota exceed for ${key}${scope}`, handlerError);
      return false;
    }
  };

  let attempts = 0;
  while (attempts < MAX_SAVE_ATTEMPTS) {
    attempts += 1;

    const serialized = serializeValue();
    if (serialized === null) {
      return;
    }

    let skipPrimaryWrite = false;
    if (typeof storage.getItem === 'function') {
      try {
        const existingValue = storage.getItem(key);
        if (existingValue === serialized) {
          skipPrimaryWrite = true;
        }
      } catch (inspectError) {
        console.warn(`Unable to inspect existing value for ${key}`, inspectError);
      }
    }

    let existingBackupValue;
    let hasExistingBackup = false;
    if (useBackup && typeof storage.getItem === 'function') {
      try {
        existingBackupValue = storage.getItem(fallbackKey);
        hasExistingBackup = typeof existingBackupValue === 'string';
      } catch (inspectError) {
        console.warn(`Unable to inspect existing backup for ${key}`, inspectError);
      }
    }

    if (!hasPreservedBackup && hasExistingBackup && typeof existingBackupValue === 'string') {
      preservedBackupValue = existingBackupValue;
      hasPreservedBackup = true;
    }

    if (
      skipPrimaryWrite
      && (!useBackup || (hasExistingBackup && existingBackupValue === serialized))
    ) {
      logSuccess();
      return;
    }

    if (!skipPrimaryWrite) {
      try {
        storage.setItem(key, serialized);
      } catch (error) {
        if (attemptHandleQuota(error)) {
          if (!registerQuotaRecoveryStep()) {
            break;
          }
          if (attempts > 0) {
            attempts -= 1;
          }
          continue;
        }
        console.error(errorMessage, error);
        alertStorageError();
        return;
      }
    }

    if (!useBackup) {
      logSuccess();
      return;
    }

    const attemptBackupWrite = () => {
      try {
        storage.setItem(fallbackKey, serialized);
        return 'success';
      } catch (error) {
        let backupError = error;
        let backupRemovedForRetry = false;

        if (isQuotaExceededError(backupError)) {
          if (hasExistingBackup) {
            try {
              storage.removeItem(fallbackKey);
              backupRemovedForRetry = true;
              removedBackupDuringRetry = true;
            } catch (removeError) {
              console.warn(`Unable to remove previous backup for ${key}`, removeError);
            }

            if (backupRemovedForRetry) {
              try {
                storage.setItem(fallbackKey, serialized);
                removedBackupDuringRetry = false;
                return 'success';
              } catch (retryError) {
                backupError = retryError;
              }
            }
          }

          if (attemptHandleQuota(backupError, {
            serialized,
            backupKey: fallbackKey,
            isBackup: true,
          })) {
            if (!registerQuotaRecoveryStep()) {
              return 'failure';
            }
            return 'retry';
          }
        }

        if (backupRemovedForRetry && hasExistingBackup && typeof existingBackupValue === 'string') {
          try {
            storage.setItem(fallbackKey, existingBackupValue);
            removedBackupDuringRetry = false;
          } catch (restoreError) {
            console.warn(`Unable to restore previous backup for ${key}`, restoreError);
          }
        }

        console.warn(`Unable to update backup copy for ${key}`, backupError);
        alertStorageError();
        return 'failure';
      }
    };

    const backupResult = attemptBackupWrite();
    if (backupResult === 'success') {
      logSuccess();
      return;
    }

    if (backupResult === 'retry') {
      if (attempts > 0) {
        attempts -= 1;
      }
      continue;
    }

    if (quotaRecoveryFailed) {
      break;
    }

    return;
  }

  if (hasPreservedBackup && removedBackupDuringRetry && typeof preservedBackupValue === 'string') {
    try {
      storage.setItem(fallbackKey, preservedBackupValue);
    } catch (restoreError) {
      console.warn(`Unable to restore preserved backup for ${key}`, restoreError);
    }
  }

  console.error(errorMessage, new Error('Unable to save value after multiple attempts.'));
  alertStorageError();
}

// Generic helper to delete a key from storage with consistent error handling
function deleteFromStorage(storage, key, errorMessage, options = {}) {
  if (!storage) return;

  const { disableBackup = false, backupKey } = options || {};
  const fallbackKey = typeof backupKey === 'string' && backupKey
    ? backupKey
    : `${key}${STORAGE_BACKUP_SUFFIX}`;
  const useBackup = !disableBackup && fallbackKey && fallbackKey !== key;

  try {
    storage.removeItem(key);
  } catch (e) {
    console.error(errorMessage, e);
    alertStorageError();
  }

  if (useBackup) {
    try {
      storage.removeItem(fallbackKey);
    } catch (backupError) {
      console.error(`${errorMessage} (backup)`, backupError);
      alertStorageError();
    }
  }

  const migrationBackupKey = `${key}${STORAGE_MIGRATION_BACKUP_SUFFIX}`;
  try {
    storage.removeItem(migrationBackupKey);
  } catch (migrationError) {
    console.warn(`Unable to remove migration backup for ${key}`, migrationError);
  }
}

function loadFlagFromStorage(storage, key, errorMessage) {
  if (!storage) return false;
  try {
    return storage.getItem(key) === '1';
  } catch (e) {
    console.error(errorMessage, e);
    alertStorageError();
    return false;
  }
}

function saveFlagToStorage(storage, key, value, errorMessage) {
  if (!storage) return;
  try {
    if (value) {
      storage.setItem(key, '1');
    } else {
      storage.removeItem(key);
    }
  } catch (e) {
    console.error(errorMessage, e);
    alertStorageError();
  }
}

// Attempt to load JSON from a primary storage. If missing, try a fallback
// storage and migrate the data to the primary one. Useful for gradually moving
// keys from sessionStorage to localStorage.
function loadWithMigration(
  primary,
  fallback,
  key,
  primaryLoadMsg,
  fallbackLoadMsg,
  saveMsg,
  deleteMsg,
  loadOptions,
) {
  const value = loadJSONFromStorage(primary, key, primaryLoadMsg, null, loadOptions);
  if (value !== null) return value;
  if (!fallback) return null;
  const fallbackOptions = {
    ...(loadOptions || {}),
    alertOnFailure: 'migration-read',
  };
  const migrated = loadJSONFromStorage(
    fallback,
    key,
    fallbackLoadMsg,
    null,
    fallbackOptions,
  );
  if (migrated !== null) {
    saveJSONToStorage(primary, key, migrated, saveMsg);
    deleteFromStorage(fallback, key, deleteMsg);
    return migrated;
  }
  return null;
}

// Generate a unique name by appending numeric suffixes if needed
// Comparisons are case-insensitive and ignore surrounding whitespace.
// Optionally accepts a set of normalized names to avoid recomputing the
// normalised lookup on each call when generating many names in a loop.
function generateUniqueName(base, usedNames, normalizedNames) {
  const trimmedBase = base.trim();
  let name = trimmedBase;
  let suffix = 2;

  const normalized = normalizedNames || new Set(
    [...usedNames].map((n) => n.trim().toLowerCase()),
  );
  let candidate = trimmedBase.toLowerCase();
  while (normalized.has(candidate)) {
    name = `${trimmedBase} (${suffix++})`;
    candidate = name.toLowerCase();
  }
  usedNames.add(name);
  normalized.add(candidate);
  return name;
}

// --- Session State Storage ---
// Store the current session (unsaved setup) in localStorage so it survives
// full app reloads.
function collectStringValues(value) {
  if (value === null || value === undefined) {
    return [];
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed ? [trimmed] : [];
  }
  if (Array.isArray(value)) {
    return value
      .filter((item) => typeof item === 'string')
      .map((item) => item.trim())
      .filter((item) => item);
  }
  if (isPlainObject(value)) {
    return Object.values(value)
      .filter((item) => typeof item === 'string')
      .map((item) => item.trim())
      .filter((item) => item);
  }
  return [];
}

function arraysEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

function normalizeSessionStatePayload(raw) {
  if (!isPlainObject(raw)) {
    return { state: null, changed: false };
  }

  const state = { ...raw };
  let changed = false;

  const normalizeStringField = (key) => {
    if (!Object.prototype.hasOwnProperty.call(state, key)) {
      return;
    }
    const value = state[key];
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed !== value) {
        state[key] = trimmed;
        changed = true;
      }
      return;
    }
    if (value === null || value === undefined) {
      state[key] = '';
      changed = true;
      return;
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
      state[key] = String(value);
      changed = true;
      return;
    }
    state[key] = '';
    changed = true;
  };

  [
    'setupName',
    'setupSelect',
    'camera',
    'monitor',
    'video',
    'cage',
    'distance',
    'batteryPlate',
    'battery',
    'batteryHotswap',
    'sliderBowl',
    'easyrig',
  ].forEach(normalizeStringField);

  const mergeArrayField = (targetKey, legacyKeys = []) => {
    const values = [];
    const keys = [targetKey, ...legacyKeys];
    let hadLegacyData = false;

    keys.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        const collected = collectStringValues(state[key]);
        if (key !== targetKey) {
          hadLegacyData = true;
        }
        if (collected.length) {
          values.push(...collected);
        }
      }
    });

    keys.slice(1).forEach((legacyKey) => {
      if (Object.prototype.hasOwnProperty.call(state, legacyKey)) {
        delete state[legacyKey];
        changed = true;
      }
    });

    const unique = [];
    const seen = new Set();
    values.forEach((val) => {
      if (!seen.has(val)) {
        seen.add(val);
        unique.push(val);
      }
    });

    const hasTargetKey = Object.prototype.hasOwnProperty.call(state, targetKey);
    const existing = hasTargetKey && Array.isArray(state[targetKey])
      ? state[targetKey].filter((item) => typeof item === 'string').map((item) => item.trim()).filter((item) => item)
      : [];

    if (!hasTargetKey && !hadLegacyData && unique.length === 0 && existing.length === 0) {
      return;
    }

    if (!arraysEqual(existing, unique)) {
      state[targetKey] = unique;
      changed = true;
    }
  };

  mergeArrayField('motors', ['motor', 'motorSelect']);
  mergeArrayField('controllers', ['controller', 'controllerSelect']);

  if (Object.prototype.hasOwnProperty.call(state, 'projectInfo') && !isPlainObject(state.projectInfo)) {
    state.projectInfo = null;
    changed = true;
  }

  return { state, changed };
}

function loadSessionState() {
  applyLegacyStorageMigrations();
  const safeStorage = getSafeLocalStorage();
  const raw = loadWithMigration(
    safeStorage,
    typeof sessionStorage !== 'undefined' ? sessionStorage : null,
    SESSION_STATE_KEY,
    "Error loading session state from localStorage:",
    "Error loading session state from sessionStorage:",
    "Error saving session state to localStorage:",
    "Error deleting session state from sessionStorage:",
    { validate: (value) => value === null || isPlainObject(value) },
  );
  if (raw === null) {
    return null;
  }

  const { state, changed } = normalizeSessionStatePayload(raw);
  if (!state) {
    return null;
  }

  if (changed) {
    createStorageMigrationBackup(safeStorage, SESSION_STATE_KEY, raw);
    saveSessionState(state);
  }

  return state;
}

function saveSessionState(state) {
  const safeStorage = getSafeLocalStorage();
  if (state === null || state === undefined) {
    deleteFromStorage(
      safeStorage,
      SESSION_STATE_KEY,
      "Error deleting session state from localStorage:",
    );
    return;
  }

  if (!isPlainObject(state)) {
    console.warn('Ignoring invalid session state payload. Expected a plain object.');
    return;
  }

  saveJSONToStorage(
    safeStorage,
    SESSION_STATE_KEY,
    state,
    "Error saving session state to localStorage:",
  );
}

// --- Device Data Storage ---
function loadDeviceData() {
  applyLegacyStorageMigrations();
  const safeStorage = getSafeLocalStorage();
  const parsedData = loadJSONFromStorage(
    safeStorage,
    DEVICE_STORAGE_KEY,
    "Error loading device data from localStorage:",
    null,
    { validate: (value) => value === null || isPlainObject(value) },
  );
  if (!isPlainObject(parsedData)) {
    return null;
  }

  const data = { ...parsedData };
  let changed = false;

  function ensureObject(target, key) {
    if (!isPlainObject(target[key])) {
      target[key] = {};
      changed = true;
    }
  }

  DEVICE_COLLECTION_KEYS.forEach((key) => {
    ensureObject(data, key);
  });

  if (!isPlainObject(data.fiz)) {
    data.fiz = {};
    changed = true;
  }
  FIZ_COLLECTION_KEYS.forEach((key) => {
    ensureObject(data.fiz, key);
  });

  if (!isPlainObject(data.accessories)) {
    data.accessories = {};
    changed = true;
  }
  ACCESSORY_COLLECTION_KEYS.forEach((key) => {
    ensureObject(data.accessories, key);
  });

  if (!Array.isArray(data.filterOptions)) {
    data.filterOptions = Array.isArray(parsedData.filterOptions)
      ? parsedData.filterOptions.slice()
      : [];
    changed = true;
  }

  if (changed) {
    createStorageMigrationBackup(safeStorage, DEVICE_STORAGE_KEY, parsedData);
    saveJSONToStorage(
      safeStorage,
      DEVICE_STORAGE_KEY,
      data,
      "Error updating device data in localStorage during normalization:",
    );
  }

  console.log("Device data loaded from localStorage.");
  return data;
}

function saveDeviceData(deviceData) {
  const safeStorage = getSafeLocalStorage();
  if (deviceData === null || deviceData === undefined) {
    deleteFromStorage(
      safeStorage,
      DEVICE_STORAGE_KEY,
      "Error deleting device data from localStorage:",
    );
    console.log("Device data cleared from localStorage.");
    return;
  }

  if (!isPlainObject(deviceData)) {
    console.warn('Ignoring invalid device data payload. Expected a plain object.');
    return;
  }

  saveJSONToStorage(
    safeStorage,
    DEVICE_STORAGE_KEY,
    deviceData,
    "Error saving device data to localStorage:",
    "Device data saved to localStorage.",
  );
}

// --- Setup Data Storage ---
function normalizeSetups(rawData) {
  if (!rawData) {
    return { data: {}, changed: false };
  }

  if (Array.isArray(rawData)) {
    const obj = {};
    const used = new Set();
    const normalized = new Set();
    for (let idx = 0; idx < rawData.length; idx += 1) {
      const item = rawData[idx];
      if (!isPlainObject(item)) {
        continue;
      }
      const base = item.name || item.setupName || `Setup ${idx + 1}`;
      const key = generateUniqueName(base, used, normalized);
      obj[key] = item;
    }
    return { data: obj, changed: true };
  }

  if (!isPlainObject(rawData)) {
    return { data: {}, changed: true };
  }

  const normalized = {};
  let changed = false;
  Object.keys(rawData).forEach((name) => {
    const value = rawData[name];
    if (isPlainObject(value)) {
      normalized[name] = value;
    } else {
      changed = true;
    }
  });

  if (!changed) {
    return { data: rawData, changed: false };
  }

  return { data: normalized, changed: true };
}

function loadSetups() {
  applyLegacyStorageMigrations();
  const safeStorage = getSafeLocalStorage();
  const parsedData = loadJSONFromStorage(
    safeStorage,
    SETUP_STORAGE_KEY,
    "Error loading setups from localStorage:",
    null,
    {
      validate: (value) =>
        value === null || Array.isArray(value) || isPlainObject(value),
    },
  );
  const { data: setups, changed } = normalizeSetups(parsedData);
  if (changed) {
    createStorageMigrationBackup(safeStorage, SETUP_STORAGE_KEY, parsedData);
    saveJSONToStorage(
      safeStorage,
      SETUP_STORAGE_KEY,
      setups,
      "Error updating setups in localStorage during normalization:",
    );
  }
  return setups;
}

function saveSetups(setups) {
  const { data: normalizedSetups } = normalizeSetups(setups);
  enforceAutoBackupLimits(normalizedSetups);
  const safeStorage = getSafeLocalStorage();
  saveJSONToStorage(
    safeStorage,
    SETUP_STORAGE_KEY,
    normalizedSetups,
    "Error saving setups to localStorage:",
    "Setups saved to localStorage.",
    {
      onQuotaExceeded: () => {
        const removedKey = removeOldestAutoBackupEntry(normalizedSetups);
        if (!removedKey) {
          return false;
        }
        console.warn(
          `Removed automatic backup "${removedKey}" to free up storage space before saving setups.`,
        );
        return true;
      },
    },
  );
}

function updateSetups(callback) {
  const setups = loadSetups();
  const { result, changed = true } = callback(setups) || {};
  if (changed) {
    saveSetups(setups);
  }
  return result;
}

function saveSetup(name, setup) {
  updateSetups((setups) => {
    setups[name] = setup;
    return { changed: true };
  });
}

function loadSetup(name) {
  const setups = loadSetups();
  return setups[name];
}

function deleteSetup(name) {
  updateSetups((setups) => {
    if (Object.prototype.hasOwnProperty.call(setups, name)) {
      delete setups[name];
      return { changed: true };
    }
    return { changed: false };
  });
}

function renameSetup(oldName, newName) {
  return updateSetups((setups) => {
    if (!Object.prototype.hasOwnProperty.call(setups, oldName)) {
      return { result: null, changed: false };
    }
    const sanitized = newName.trim();
    // Guard against empty or whitespace-only names. Renaming to such a value
    // would create an empty key in the setups object. In that case simply keep
    // the original name.
    if (!sanitized) {
      return { result: oldName, changed: false };
    }
    if (oldName.trim().toLowerCase() === sanitized.toLowerCase()) {
      return { result: oldName, changed: false };
    }
    const used = new Set(Object.keys(setups));
    used.delete(oldName);
    const target = generateUniqueName(sanitized, used);
    setups[target] = setups[oldName];
    delete setups[oldName];
    return { result: target, changed: true };
  });
}

// --- Project Storage ---
function normalizeProject(data) {
  if (typeof data === "string") {
    const parsed = tryParseJSONLike(data);
    if (parsed.success) {
      const normalized = normalizeProject(parsed.parsed);
      if (normalized) {
        return normalized;
      }
    }
    return { gearList: data, projectInfo: null };
  }
  if (isPlainObject(data)) {
    // New format { gearList, projectInfo }
    if (Object.prototype.hasOwnProperty.call(data, "gearList") || Object.prototype.hasOwnProperty.call(data, "projectInfo")) {
      let normalizedProjectInfo = isPlainObject(data.projectInfo) ? data.projectInfo : null;
      if (!normalizedProjectInfo && typeof data.projectInfo === "string") {
        const parsedInfo = tryParseJSONLike(data.projectInfo);
        if (parsedInfo.success && isPlainObject(parsedInfo.parsed)) {
          normalizedProjectInfo = parsedInfo.parsed;
        }
      }

      let normalizedAutoGearRules = Array.isArray(data.autoGearRules) && data.autoGearRules.length
        ? data.autoGearRules
        : null;
      if (!normalizedAutoGearRules && typeof data.autoGearRules === "string") {
        const parsedRules = tryParseJSONLike(data.autoGearRules);
        if (parsedRules.success && Array.isArray(parsedRules.parsed) && parsedRules.parsed.length) {
          normalizedAutoGearRules = parsedRules.parsed;
        }
      }

      let normalizedGearList =
        typeof data.gearList === "string" || (data.gearList && typeof data.gearList === "object")
          ? data.gearList
          : "";

      if (typeof normalizedGearList === "string") {
        const parsedGear = tryParseJSONLike(normalizedGearList);
        if (parsedGear.success) {
          const nested = normalizeProject(parsedGear.parsed);
          if (nested) {
            normalizedGearList = nested.gearList;
            if (!normalizedProjectInfo && nested.projectInfo) {
              normalizedProjectInfo = nested.projectInfo;
            }
            if (
              (!normalizedAutoGearRules || !normalizedAutoGearRules.length)
              && Array.isArray(nested.autoGearRules)
              && nested.autoGearRules.length
            ) {
              normalizedAutoGearRules = nested.autoGearRules;
            }
          } else if (
            typeof parsedGear.parsed === "string"
            || (isPlainObject(parsedGear.parsed)
              && Object.values(parsedGear.parsed).every((value) => typeof value === "string"))
          ) {
            normalizedGearList = parsedGear.parsed;
          }
        }
      }

      if (
        normalizedGearList
        && typeof normalizedGearList === "object"
        && !isPlainObject(normalizedGearList)
      ) {
        normalizedGearList = "";
      }

      const normalized = {
        gearList: normalizedGearList,
        projectInfo: normalizedProjectInfo,
      };
      if (normalizedAutoGearRules && normalizedAutoGearRules.length) {
        normalized.autoGearRules = normalizedAutoGearRules;
      }
      return normalized;
    }
    // Legacy format { projectHtml, gearHtml }
    if (Object.prototype.hasOwnProperty.call(data, "projectHtml") || Object.prototype.hasOwnProperty.call(data, "gearHtml")) {
      return {
        gearList: { projectHtml: data.projectHtml || "", gearHtml: data.gearHtml || "" },
        projectInfo: null,
      };
    }
  }
  return null;
}

const LEGACY_PROJECT_ROOT_KEYS = new Set([
  "gearList",
  "projectInfo",
  "projectHtml",
  "gearHtml",
  "autoGearRules",
]);

const NORMALIZED_PROJECT_KEYS = new Set(["gearList", "projectInfo", "autoGearRules"]);

function isNormalizedProjectEntry(entry) {
  if (!isPlainObject(entry)) {
    return false;
  }
  const keys = Object.keys(entry);
  if (!keys.every((key) => NORMALIZED_PROJECT_KEYS.has(key))) {
    return false;
  }
  const { gearList, projectInfo } = entry;
  if (
    typeof gearList !== "string" &&
    !(isPlainObject(gearList) &&
      Object.keys(gearList).every((key) => typeof gearList[key] === "string"))
  ) {
    return false;
  }
  if (projectInfo !== null && !isPlainObject(projectInfo)) {
    return false;
  }
  if (Object.prototype.hasOwnProperty.call(entry, "autoGearRules")) {
    return Array.isArray(entry.autoGearRules) && entry.autoGearRules.length > 0;
  }
  return true;
}

function readAllProjectsFromStorage() {
  applyLegacyStorageMigrations();
  const safeStorage = getSafeLocalStorage();
  const parsed = loadJSONFromStorage(
    safeStorage,
    PROJECT_STORAGE_KEY,
    "Error loading project from localStorage:",
    null,
    {
      validate: (value) =>
        value === null
        || typeof value === "string"
        || Array.isArray(value)
        || isPlainObject(value),
    },
  );
  const originalValue = parsed;
  const projects = {};
  let changed = false;

  if (parsed === null || parsed === undefined) {
    return { projects, changed: false, originalValue };
  }

  if (typeof parsed === "string") {
    const normalized = normalizeProject(parsed);
    if (normalized) {
      projects[""] = normalized;
    }
    return { projects, changed: true, originalValue };
  }

  if (Array.isArray(parsed)) {
    const usedNames = new Set();
    const normalizedNames = new Set();
    parsed.forEach((item, index) => {
      const normalized = normalizeProject(item);
      if (!normalized) {
        changed = true;
        return;
      }
      const baseName =
        isPlainObject(item) && typeof item.name === "string"
          ? item.name.trim()
          : `Project ${index + 1}`;
      const candidate = baseName || `Project ${index + 1}`;
      const unique = generateUniqueName(candidate, usedNames, normalizedNames);
      projects[unique] = normalized;
    });
    return { projects, changed: true, originalValue };
  }

  if (!isPlainObject(parsed)) {
    return { projects, changed: true, originalValue };
  }

  const keys = Object.keys(parsed);
  const maybeLegacy =
    keys.length > 0 && keys.every((key) => LEGACY_PROJECT_ROOT_KEYS.has(key));

  if (maybeLegacy) {
    const normalized = normalizeProject(parsed);
    if (normalized) {
      projects[""] = normalized;
    }
    return { projects, changed: true, originalValue };
  }

  keys.forEach((key) => {
    const normalized = normalizeProject(parsed[key]);
    if (normalized) {
      projects[key] = normalized;
      if (!isNormalizedProjectEntry(parsed[key])) {
        changed = true;
      }
    } else {
      changed = true;
    }
  });

  return { projects, changed, originalValue };
}

function persistAllProjects(projects, successMessage) {
  const safeStorage = getSafeLocalStorage();
  enforceAutoBackupLimits(projects);
  saveJSONToStorage(
    safeStorage,
    PROJECT_STORAGE_KEY,
    projects,
    "Error saving project to localStorage:",
    successMessage,
    {
      onQuotaExceeded: () => {
        const removedKey = removeOldestAutoBackupEntry(projects);
        if (!removedKey) {
          return false;
        }
        console.warn(
          `Removed automatic project backup "${removedKey}" to free up storage space before saving projects.`,
        );
        return true;
      },
    },
  );
}

function loadProject(name) {
  const { projects, changed, originalValue } = readAllProjectsFromStorage();
  if (changed) {
    const safeStorage = getSafeLocalStorage();
    if (safeStorage) {
      createStorageMigrationBackup(safeStorage, PROJECT_STORAGE_KEY, originalValue);
    }
    persistAllProjects(projects);
  }
  if (name === undefined) {
    return projects;
  }
  const key = name || "";
  return Object.prototype.hasOwnProperty.call(projects, key) ? projects[key] : null;
}

function sanitizeProjectNameForBackup(name) {
  if (typeof name !== 'string') {
    return '';
  }
  const collapsed = name.replace(/\s+/g, ' ').trim();
  if (!collapsed) {
    return '';
  }
  if (collapsed.length <= 120) {
    return collapsed;
  }
  return collapsed.slice(0, 120);
}

function formatAutoBackupTimestamp(date) {
  const pad = (value) => String(value).padStart(2, '0');
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join('-');
}

function generateDeletionBackupMetadata(projectName, projects) {
  const now = new Date();
  const timestamp = formatAutoBackupTimestamp(now);
  const sanitizedName = sanitizeProjectNameForBackup(projectName);
  const baseName = sanitizedName
    ? `${AUTO_BACKUP_DELETION_PREFIX}${timestamp}-${sanitizedName}`
    : `${AUTO_BACKUP_DELETION_PREFIX}${timestamp}`;
  const usedNames = new Set(Object.keys(projects));
  if (!usedNames.has(baseName)) {
    return { name: baseName };
  }
  let suffix = 2;
  let candidate = `${baseName}-${suffix}`;
  while (usedNames.has(candidate)) {
    suffix += 1;
    candidate = `${baseName}-${suffix}`;
  }
  return { name: candidate };
}

function cloneProjectEntryForBackup(entry) {
  if (entry === undefined) {
    return undefined;
  }
  if (entry === null || typeof entry !== 'object') {
    return entry;
  }
  try {
    return JSON.parse(JSON.stringify(entry));
  } catch (error) {
    console.warn('Unable to deep clone project for backup', error);
    return { ...entry };
  }
}

function maybeCreateProjectDeletionBackup(projects, key) {
  if (!projects || !Object.prototype.hasOwnProperty.call(projects, key)) {
    return { status: 'missing' };
  }
  if (typeof key === 'string' && key.startsWith(AUTO_BACKUP_NAME_PREFIX)) {
    return { status: 'skipped' };
  }
  const entry = projects[key];
  if (entry === undefined) {
    return { status: 'missing' };
  }
  const { name: backupName } = generateDeletionBackupMetadata(key, projects);
  if (!backupName) {
    return { status: 'failed' };
  }
  const cloned = cloneProjectEntryForBackup(entry);
  if (cloned === undefined) {
    return { status: 'failed' };
  }
  projects[backupName] = cloned;
  return { status: 'created', backupName };
}

function saveProject(name, project) {
  if (!isPlainObject(project)) return;
  const normalized = normalizeProject(project) || { gearList: "", projectInfo: null };
  const { projects, changed, originalValue } = readAllProjectsFromStorage();
  if (changed) {
    const safeStorage = getSafeLocalStorage();
    if (safeStorage) {
      createStorageMigrationBackup(safeStorage, PROJECT_STORAGE_KEY, originalValue);
    }
  }
  projects[name || ""] = normalized;
  persistAllProjects(projects, "Project saved to localStorage.");
}

function deleteProject(name) {
  if (name === undefined) {
    deleteFromStorage(
      getSafeLocalStorage(),
      PROJECT_STORAGE_KEY,
      "Error deleting project from localStorage:",
    );
    return;
  }

  const key = name || "";
  const { projects, changed, originalValue } = readAllProjectsFromStorage();
  if (changed) {
    const safeStorage = getSafeLocalStorage();
    if (safeStorage) {
      createStorageMigrationBackup(safeStorage, PROJECT_STORAGE_KEY, originalValue);
    }
  }
  if (!Object.prototype.hasOwnProperty.call(projects, key)) {
    return;
  }
  const backupOutcome = maybeCreateProjectDeletionBackup(projects, key);
  if (backupOutcome.status === 'failed') {
    console.warn(`Automatic backup before deleting project "${key}" failed. Deletion aborted.`);
    alertStorageError();
    return;
  }
  delete projects[key];
  if (Object.keys(projects).length === 0) {
    deleteFromStorage(
      getSafeLocalStorage(),
      PROJECT_STORAGE_KEY,
      "Error deleting project from localStorage:",
    );
  } else {
    persistAllProjects(projects);
    if (backupOutcome.status === 'created' && backupOutcome.backupName) {
      console.log(
        `Stored automatic backup "${backupOutcome.backupName}" before deleting project "${key}".`,
      );
    }
  }
}

function createProjectImporter() {
  const { projects, changed, originalValue } = readAllProjectsFromStorage();
  if (changed) {
    const safeStorage = getSafeLocalStorage();
    if (safeStorage) {
      createStorageMigrationBackup(safeStorage, PROJECT_STORAGE_KEY, originalValue);
    }
  }
  const usedNames = new Set(Object.keys(projects));
  const normalizedNames = new Set(
    [...usedNames].map((name) => name.trim().toLowerCase()),
  );
  const defaultName = "Imported project";

  return (rawName, project, fallbackName = defaultName) => {
    const normalizedProject = normalizeProject(project);
    if (!normalizedProject) return;

    const candidates = [];
    if (typeof rawName === "string") {
      candidates.push(rawName.trim());
    }
    if (isPlainObject(project)) {
      if (typeof project.name === "string") {
        candidates.push(project.name.trim());
      }
      const info = project.projectInfo;
      if (isPlainObject(info) && typeof info.projectName === "string") {
        candidates.push(info.projectName.trim());
      }
    }

    const fallback = typeof fallbackName === "string" && fallbackName.trim()
      ? fallbackName.trim()
      : defaultName;

    if (candidates.includes("") && !normalizedNames.has("")) {
      usedNames.add("");
      normalizedNames.add("");
      saveProject("", normalizedProject);
      return;
    }

    const baseName = candidates.find((candidate) => candidate) || fallback;
    const uniqueName = generateUniqueName(baseName, usedNames, normalizedNames);
    saveProject(uniqueName, normalizedProject);
  };
}

function tryParseJSONLike(value) {
  if (typeof value !== "string") {
    return { success: false, parsed: null };
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return { success: false, parsed: null };
  }

  const firstChar = trimmed[0];
  const lastChar = trimmed[trimmed.length - 1];
  let expectedClosing = null;
  if (firstChar === "{") {
    expectedClosing = "}";
  } else if (firstChar === "[") {
    expectedClosing = "]";
  } else if (firstChar === "\"") {
    expectedClosing = "\"";
  }

  if (!expectedClosing || lastChar !== expectedClosing) {
    return { success: false, parsed: null };
  }

  try {
    return { success: true, parsed: JSON.parse(trimmed) };
  } catch (error) {
    void error;
    return { success: false, parsed: null };
  }
}

function importProjectCollection(collection, ensureImporter, fallbackLabel = "Imported project") {
  if (typeof collection === "string") {
    const parsed = tryParseJSONLike(collection);
    if (parsed.success) {
      return importProjectCollection(parsed.parsed, ensureImporter, fallbackLabel);
    }

    ensureImporter()("", collection);
    return true;
  }

  if (Array.isArray(collection)) {
    const importProject = ensureImporter();
    collection.forEach((proj, idx) => {
      if (proj === null || proj === undefined) return;
      const rawName =
        isPlainObject(proj) && typeof proj.name === "string"
          ? proj.name
          : "";
      importProject(rawName, proj, `${fallbackLabel} ${idx + 1}`);
    });
    return true;
  }

  if (isPlainObject(collection)) {
    const importProject = ensureImporter();
    Object.entries(collection).forEach(([name, proj]) => {
      importProject(name, proj);
    });
    return true;
  }

  return false;
}

// --- Favorites Storage ---
function loadFavorites() {
  applyLegacyStorageMigrations();
  const safeStorage = getSafeLocalStorage();
  const parsed = loadJSONFromStorage(
    safeStorage,
    FAVORITES_STORAGE_KEY,
    "Error loading favorites from localStorage:",
    {},
    { validate: (value) => value === null || isPlainObject(value) },
  );
  return isPlainObject(parsed) ? parsed : {};
}

function saveFavorites(favs) {
  const safeStorage = getSafeLocalStorage();
  if (favs === null || favs === undefined) {
    deleteFromStorage(
      safeStorage,
      FAVORITES_STORAGE_KEY,
      "Error deleting favorites from localStorage:",
    );
    return;
  }

  if (!isPlainObject(favs)) {
    console.warn('Ignoring invalid favorites payload. Expected a plain object.');
    return;
  }

  saveJSONToStorage(
    safeStorage,
    FAVORITES_STORAGE_KEY,
    favs,
    "Error saving favorites to localStorage:",
  );
}

// --- User Feedback Storage ---
function loadFeedback() {
  applyLegacyStorageMigrations();
  const safeStorage = getSafeLocalStorage();
  const parsed = loadJSONFromStorage(
    safeStorage,
    FEEDBACK_STORAGE_KEY,
    "Error loading feedback from localStorage:",
    null,
    { validate: (value) => value === null || isPlainObject(value) },
  );
  if (isPlainObject(parsed)) {
    return parsed;
  }
  return {};
}

function saveFeedback(feedback) {
  const safeStorage = getSafeLocalStorage();
  if (feedback === null || feedback === undefined) {
    deleteFromStorage(
      safeStorage,
      FEEDBACK_STORAGE_KEY,
      "Error deleting feedback from localStorage:",
    );
    return;
  }

  if (!isPlainObject(feedback)) {
    console.warn('Ignoring invalid feedback payload. Expected a plain object.');
    return;
  }

  saveJSONToStorage(
    safeStorage,
    FEEDBACK_STORAGE_KEY,
    feedback,
    "Error saving feedback to localStorage:",
    "Feedback saved to localStorage.",
  );
}

// --- Automatic Gear Rules Storage ---
function loadAutoGearRules() {
  applyLegacyStorageMigrations();
  const safeStorage = getSafeLocalStorage();
  const parsed = loadJSONFromStorage(
    safeStorage,
    AUTO_GEAR_RULES_STORAGE_KEY,
    "Error loading automatic gear rules from localStorage:",
    [],
    { validate: (value) => value === null || Array.isArray(value) },
  );
  return Array.isArray(parsed) ? parsed : [];
}

function saveAutoGearRules(rules) {
  const safeRules = Array.isArray(rules) ? rules : [];
  const safeStorage = getSafeLocalStorage();
  saveJSONToStorage(
    safeStorage,
    AUTO_GEAR_RULES_STORAGE_KEY,
    safeRules,
    "Error saving automatic gear rules to localStorage:",
  );
}

function loadAutoGearBackups() {
  applyLegacyStorageMigrations();
  const safeStorage = getSafeLocalStorage();
  const parsed = loadJSONFromStorage(
    safeStorage,
    AUTO_GEAR_BACKUPS_STORAGE_KEY,
    "Error loading automatic gear rule backups from localStorage:",
    [],
    { validate: (value) => value === null || Array.isArray(value) },
  );
  return Array.isArray(parsed) ? parsed : [];
}

function saveAutoGearBackups(backups) {
  const safeBackups = Array.isArray(backups) ? backups : [];
  const safeStorage = getSafeLocalStorage();
  saveJSONToStorage(
    safeStorage,
    AUTO_GEAR_BACKUPS_STORAGE_KEY,
    safeBackups,
    "Error saving automatic gear rule backups to localStorage:",
  );
}

function loadAutoGearSeedFlag() {
  applyLegacyStorageMigrations();
  const safeStorage = getSafeLocalStorage();
  return loadFlagFromStorage(
    safeStorage,
    AUTO_GEAR_SEEDED_STORAGE_KEY,
    "Error loading automatic gear seed flag from localStorage:",
  );
}

function saveAutoGearSeedFlag(flag) {
  const safeStorage = getSafeLocalStorage();
  saveFlagToStorage(
    safeStorage,
    AUTO_GEAR_SEEDED_STORAGE_KEY,
    Boolean(flag),
    "Error saving automatic gear seed flag to localStorage:",
  );
}

function loadAutoGearPresets() {
  applyLegacyStorageMigrations();
  const safeStorage = getSafeLocalStorage();
  const presets = loadJSONFromStorage(
    safeStorage,
    AUTO_GEAR_PRESETS_STORAGE_KEY,
    "Error loading automatic gear presets from localStorage:",
    [],
    { validate: (value) => value === null || Array.isArray(value) },
  );
  return Array.isArray(presets) ? presets : [];
}

function saveAutoGearPresets(presets) {
  const safePresets = Array.isArray(presets) ? presets : [];
  const safeStorage = getSafeLocalStorage();
  saveJSONToStorage(
    safeStorage,
    AUTO_GEAR_PRESETS_STORAGE_KEY,
    safePresets,
    "Error saving automatic gear presets to localStorage:",
  );
}

function removeAutoGearPresetFromStorage(presetId, storage) {
  if (!presetId) {
    return;
  }

  const safeStorage = storage || getSafeLocalStorage();
  if (!safeStorage) {
    return;
  }

  let rawPresets;
  try {
    rawPresets = safeStorage.getItem(AUTO_GEAR_PRESETS_STORAGE_KEY);
  } catch (error) {
    console.error('Error loading automatic gear presets while removing autosaved preset from localStorage:', error);
    alertStorageError();
    return;
  }

  if (rawPresets === null || typeof rawPresets === 'undefined') {
    return;
  }

  let parsedPresets;
  try {
    parsedPresets = JSON.parse(rawPresets);
  } catch (parseError) {
    console.error('Error parsing automatic gear presets while removing autosaved preset from localStorage:', parseError);
    return;
  }

  if (!Array.isArray(parsedPresets)) {
    return;
  }

  const filteredPresets = parsedPresets.filter((preset) => {
    if (!preset || typeof preset !== 'object') {
      return true;
    }
    return preset.id !== presetId;
  });

  if (filteredPresets.length === parsedPresets.length) {
    return;
  }

  saveJSONToStorage(
    safeStorage,
    AUTO_GEAR_PRESETS_STORAGE_KEY,
    filteredPresets,
    "Error saving automatic gear presets to localStorage:",
  );
}

function loadAutoGearActivePresetId() {
  applyLegacyStorageMigrations();
  const safeStorage = getSafeLocalStorage();
  if (!safeStorage) {
    return '';
  }
  try {
    const value = safeStorage.getItem(AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY);
    return typeof value === 'string' ? value : '';
  } catch (error) {
    console.error('Error loading automatic gear active preset from localStorage:', error);
    alertStorageError();
    return '';
  }
}

function saveAutoGearActivePresetId(presetId) {
  const safeStorage = getSafeLocalStorage();
  if (!safeStorage) {
    return;
  }
  try {
    if (presetId) {
      safeStorage.setItem(AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY, presetId);
    } else {
      safeStorage.removeItem(AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY);
    }
  } catch (error) {
    console.error('Error saving automatic gear active preset to localStorage:', error);
    alertStorageError();
  }
}

function loadAutoGearAutoPresetId() {
  applyLegacyStorageMigrations();
  const safeStorage = getSafeLocalStorage();
  if (!safeStorage) {
    return '';
  }
  try {
    const value = safeStorage.getItem(AUTO_GEAR_AUTO_PRESET_STORAGE_KEY);
    return typeof value === 'string' ? value : '';
  } catch (error) {
    console.error('Error loading automatic gear auto preset from localStorage:', error);
    alertStorageError();
    return '';
  }
}

function saveAutoGearAutoPresetId(presetId) {
  const safeStorage = getSafeLocalStorage();
  if (!safeStorage) {
    return;
  }
  let previousPresetId = '';
  try {
    const existingId = safeStorage.getItem(AUTO_GEAR_AUTO_PRESET_STORAGE_KEY);
    if (typeof existingId === 'string' && existingId) {
      previousPresetId = existingId;
    }
  } catch (inspectionError) {
    console.error('Error inspecting automatic gear auto preset in localStorage:', inspectionError);
  }
  try {
    if (presetId) {
      safeStorage.setItem(AUTO_GEAR_AUTO_PRESET_STORAGE_KEY, presetId);
      if (previousPresetId && previousPresetId !== presetId) {
        removeAutoGearPresetFromStorage(previousPresetId, safeStorage);
      }
    } else {
      safeStorage.removeItem(AUTO_GEAR_AUTO_PRESET_STORAGE_KEY);
      if (previousPresetId) {
        removeAutoGearPresetFromStorage(previousPresetId, safeStorage);
      }
    }
  } catch (error) {
    console.error('Error saving automatic gear auto preset to localStorage:', error);
    alertStorageError();
  }
}

function loadAutoGearBackupVisibility() {
  applyLegacyStorageMigrations();
  const safeStorage = getSafeLocalStorage();
  return loadFlagFromStorage(
    safeStorage,
    AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY,
    "Error loading automatic gear backup visibility from localStorage:",
  );
}

function saveAutoGearBackupVisibility(flag) {
  const safeStorage = getSafeLocalStorage();
  saveFlagToStorage(
    safeStorage,
    AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY,
    Boolean(flag),
    "Error saving automatic gear backup visibility to localStorage:",
  );
}

// --- Clear All Stored Data ---
function clearAllData() {
  const msg = "Error clearing storage:";
  const safeStorage = getSafeLocalStorage();
  deleteFromStorage(safeStorage, DEVICE_STORAGE_KEY, msg);
  deleteFromStorage(safeStorage, SETUP_STORAGE_KEY, msg);
  deleteFromStorage(safeStorage, FEEDBACK_STORAGE_KEY, msg);
  // Favorites were added later and can be forgotten if not explicitly cleared.
  // Ensure they are removed alongside other stored planner data.
  deleteFromStorage(safeStorage, FAVORITES_STORAGE_KEY, msg);
  deleteFromStorage(safeStorage, PROJECT_STORAGE_KEY, msg);
  deleteFromStorage(safeStorage, AUTO_GEAR_RULES_STORAGE_KEY, msg);
  deleteFromStorage(safeStorage, AUTO_GEAR_BACKUPS_STORAGE_KEY, msg);
  deleteFromStorage(safeStorage, AUTO_GEAR_SEEDED_STORAGE_KEY, msg);
  deleteFromStorage(safeStorage, AUTO_GEAR_PRESETS_STORAGE_KEY, msg);
  deleteFromStorage(safeStorage, AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY, msg);
  deleteFromStorage(safeStorage, AUTO_GEAR_AUTO_PRESET_STORAGE_KEY, msg);
  deleteFromStorage(safeStorage, AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY, msg);
  deleteFromStorage(
    safeStorage,
    getCustomFontStorageKeyName(),
    msg
  );
  deleteFromStorage(safeStorage, CUSTOM_LOGO_STORAGE_KEY, msg);
  deleteFromStorage(safeStorage, DEVICE_SCHEMA_CACHE_KEY, msg);
  deleteFromStorage(safeStorage, SESSION_STATE_KEY, msg);
  if (typeof sessionStorage !== 'undefined') {
    deleteFromStorage(sessionStorage, SESSION_STATE_KEY, msg);
  }
  const preferenceKeys = [
    'darkMode',
    'pinkMode',
    'highContrast',
    'reduceMotion',
    'relaxedSpacing',
    'showAutoBackups',
    'accentColor',
    'fontSize',
    'fontFamily',
    'language',
    'iosPwaHelpShown',
  ];
  preferenceKeys.forEach((key) => {
    deleteFromStorage(safeStorage, key, msg, { disableBackup: true });
  });

  const storageCandidates = collectUniqueStorages([
    safeStorage,
    typeof SAFE_LOCAL_STORAGE !== 'undefined' ? SAFE_LOCAL_STORAGE : null,
    getWindowStorage('localStorage'),
    typeof localStorage !== 'undefined' ? localStorage : null,
  ]);
  const sessionCandidates = collectUniqueStorages([
    typeof sessionStorage !== 'undefined' ? sessionStorage : null,
    getWindowStorage('sessionStorage'),
  ]);
  const prefixedKeys = ['cameraPowerPlanner_', 'cinePowerPlanner_'];

  const collectKeysWithPrefixes = (storage) => {
    if (!storage) {
      return [];
    }

    const keys = [];

    if (typeof storage.key === 'function' && typeof storage.length === 'number') {
      for (let index = 0; index < storage.length; index += 1) {
        let candidateKey = null;
        try {
          candidateKey = storage.key(index);
        } catch (error) {
          console.warn('Unable to inspect storage key during factory reset', error);
        }
        if (typeof candidateKey === 'string'
          && prefixedKeys.some(prefix => candidateKey.startsWith(prefix))) {
          keys.push(candidateKey);
        }
      }
      return keys;
    }

    if (typeof storage.keys === 'function') {
      try {
        const candidateKeys = storage.keys();
        if (Array.isArray(candidateKeys)) {
          candidateKeys.forEach((candidateKey) => {
            if (typeof candidateKey === 'string'
              && prefixedKeys.some(prefix => candidateKey.startsWith(prefix))) {
              keys.push(candidateKey);
            }
          });
        }
      } catch (error) {
        console.warn('Unable to enumerate storage keys during factory reset', error);
      }
      return keys;
    }

    if (typeof storage.forEach === 'function') {
      try {
        storage.forEach((value, candidateKey) => {
          if (typeof candidateKey === 'string'
            && prefixedKeys.some(prefix => candidateKey.startsWith(prefix))) {
            keys.push(candidateKey);
          }
        });
      } catch (error) {
        console.warn('Unable to iterate storage entries during factory reset', error);
      }
      return keys;
    }

    return keys;
  };

  const deletePrefixedKeys = (storages) => {
    storages.forEach((storage) => {
      const keysToRemove = collectKeysWithPrefixes(storage);
      if (!keysToRemove.length) {
        return;
      }
      keysToRemove.forEach((key) => {
        try {
          deleteFromStorage(storage, key, msg);
        } catch (error) {
          console.warn('Unable to remove legacy storage key during factory reset', key, error);
        }
      });
    });
  };

  deletePrefixedKeys(storageCandidates);
  deletePrefixedKeys(sessionCandidates);
  console.log("All planner data cleared from storage.");
}

// --- Export/Import All Planner Data ---
  function readLocalStorageValue(key) {
    const storage = getSafeLocalStorage();
    if (!storage || typeof storage.getItem !== 'function') return null;
    try {
      const value = storage.getItem(key);
      if (value === null || value === undefined) {
        if (RAW_STORAGE_BACKUP_KEYS.has(key)) {
          try {
            const backupValue = storage.getItem(`${key}${STORAGE_BACKUP_SUFFIX}`);
            if (backupValue !== null && backupValue !== undefined) {
              return String(backupValue);
            }
          } catch (backupError) {
            console.warn('Unable to read backup key for export', key, backupError);
          }
        }
        return null;
      }
      return String(value);
    } catch (error) {
      console.warn('Unable to read storage key for backup', key, error);
      return null;
    }
  }

  function parseStoredBoolean(value) {
    if (value === null) return null;
    if (value === 'true' || value === '1') return true;
    if (value === 'false' || value === '0') return false;
    return null;
  }

  function collectPreferenceSnapshot() {
    const preferences = {};

    const darkMode = parseStoredBoolean(readLocalStorageValue('darkMode'));
    if (darkMode !== null) {
      preferences.darkMode = darkMode;
    }

    const pinkMode = parseStoredBoolean(readLocalStorageValue('pinkMode'));
    if (pinkMode !== null) {
      preferences.pinkMode = pinkMode;
    }

    const highContrast = parseStoredBoolean(readLocalStorageValue('highContrast'));
    if (highContrast !== null) {
      preferences.highContrast = highContrast;
    }

    const reduceMotion = parseStoredBoolean(readLocalStorageValue('reduceMotion'));
    if (reduceMotion !== null) {
      preferences.reduceMotion = reduceMotion;
    }

    const relaxedSpacing = parseStoredBoolean(readLocalStorageValue('relaxedSpacing'));
    if (relaxedSpacing !== null) {
      preferences.relaxedSpacing = relaxedSpacing;
    }

    const showAutoBackups = parseStoredBoolean(readLocalStorageValue('showAutoBackups'));
    if (showAutoBackups !== null) {
      preferences.showAutoBackups = showAutoBackups;
    }

    const accentColor = readLocalStorageValue('accentColor');
    if (accentColor) {
      preferences.accentColor = accentColor;
    }

    const fontSize = readLocalStorageValue('fontSize');
    if (fontSize) {
      preferences.fontSize = fontSize;
    }

    const fontFamily = readLocalStorageValue('fontFamily');
    if (fontFamily) {
      preferences.fontFamily = fontFamily;
    }

    const language = readLocalStorageValue('language');
    if (language) {
      preferences.language = language;
    }

    const iosPwaHelpShown = parseStoredBoolean(readLocalStorageValue('iosPwaHelpShown'));
    if (iosPwaHelpShown !== null) {
      preferences.iosPwaHelpShown = iosPwaHelpShown;
    }

    return preferences;
  }

  function normalizeCustomFontEntries(entries) {
    if (!Array.isArray(entries)) {
      return [];
    }
    return entries
      .map((entry) => ({
        id: entry && typeof entry.id === 'string' ? entry.id : null,
        name: entry && typeof entry.name === 'string' ? entry.name : '',
        data: entry && typeof entry.data === 'string' ? entry.data : '',
      }))
      .filter((entry) => entry.id && entry.name && entry.data);
  }

  function readStoredCustomFonts() {
    const raw = readLocalStorageValue(getCustomFontStorageKeyName());
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw);
      return normalizeCustomFontEntries(parsed);
    } catch (error) {
      console.warn('Failed to parse stored custom fonts for backup', error);
      return [];
    }
  }

  function exportAllData() {
    const payload = {
      devices: loadDeviceData(),
      setups: loadSetups(),
      session: loadSessionState(),
      feedback: loadFeedback(),
      project: loadProject(),
      favorites: loadFavorites(),
      autoGearRules: loadAutoGearRules(),
      autoGearBackups: loadAutoGearBackups(),
      autoGearSeeded: loadAutoGearSeedFlag(),
      autoGearPresets: loadAutoGearPresets(),
      autoGearActivePresetId: loadAutoGearActivePresetId(),
      autoGearAutoPresetId: loadAutoGearAutoPresetId(),
      autoGearShowBackups: loadAutoGearBackupVisibility(),
    };

    const preferences = collectPreferenceSnapshot();
    if (Object.keys(preferences).length) {
      payload.preferences = preferences;
    }

    const customLogo = readLocalStorageValue(CUSTOM_LOGO_STORAGE_KEY);
    if (customLogo) {
      payload.customLogo = customLogo;
    }

    const customFonts = readStoredCustomFonts();
    if (customFonts.length) {
      payload.customFonts = customFonts;
    }

    return payload;
  }

  function safeSetLocalStorage(key, value) {
    const storage = getSafeLocalStorage();
    if (!storage) return;
    const useBackup = RAW_STORAGE_BACKUP_KEYS.has(key);
    const backupKey = `${key}${STORAGE_BACKUP_SUFFIX}`;
    try {
      if (value === null || value === undefined) {
        storage.removeItem(key);
        if (useBackup) {
          try {
            storage.removeItem(backupKey);
          } catch (backupError) {
            console.warn('Unable to remove backup key during import', backupKey, backupError);
          }
        }
      } else {
        const storedValue = String(value);
        storage.setItem(key, storedValue);
        if (useBackup) {
          try {
            storage.setItem(backupKey, storedValue);
          } catch (backupError) {
            console.warn('Unable to update backup key during import', backupKey, backupError);
            alertStorageError();
          }
        }
      }
    } catch (error) {
      console.warn('Unable to persist storage key during import', key, error);
      if (useBackup) {
        alertStorageError();
      }
    }
  }

function normalizeImportedBoolean(value) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (!normalized) {
      return null;
    }
    if (normalized === "true" || normalized === "1" || normalized === "yes" || normalized === "on") {
      return true;
    }
    if (normalized === "false" || normalized === "0" || normalized === "no" || normalized === "off") {
      return false;
    }
    return null;
  }

  if (typeof value === "number") {
    if (Number.isNaN(value)) {
      return null;
    }
    return value !== 0;
  }

  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i += 1) {
      const normalized = normalizeImportedBoolean(value[i]);
      if (normalized !== null) {
        return normalized;
      }
    }
    return null;
  }

  if (isPlainObject(value)) {
    if (Object.prototype.hasOwnProperty.call(value, "value")) {
      return normalizeImportedBoolean(value.value);
    }
    if (Object.prototype.hasOwnProperty.call(value, "enabled")) {
      return normalizeImportedBoolean(value.enabled);
    }
  }

  return null;
}

function normalizeImportedArray(value, fallbackKeys = [], filterFn = null) {
  if (Array.isArray(value)) {
    return filterFn
      ? value.filter((entry) => filterFn(entry))
      : value.filter((entry) => entry !== null && entry !== undefined);
  }

  if (typeof value === "string") {
    const parsed = tryParseJSONLike(value);
    if (parsed.success) {
      return normalizeImportedArray(parsed.parsed, fallbackKeys, filterFn);
    }
    return [];
  }

  if (isPlainObject(value)) {
    for (let i = 0; i < fallbackKeys.length; i += 1) {
      const key = fallbackKeys[i];
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        continue;
      }
      const extracted = normalizeImportedArray(value[key], fallbackKeys, filterFn);
      if (extracted.length) {
        return extracted;
      }
    }

    const entries = Object.values(value);
    if (entries.length) {
      return filterFn
        ? entries.filter((entry) => filterFn(entry))
        : entries.filter((entry) => entry !== null && entry !== undefined);
    }
  }

  return [];
}

function normalizeImportedAutoGearRules(value) {
  return normalizeImportedArray(
    value,
    ["rules", "items", "entries", "list", "values", "data"],
    (entry) => entry !== null && typeof entry === "object",
  );
}

function normalizeImportedAutoGearBackups(value) {
  return normalizeImportedArray(
    value,
    ["backups", "entries", "items", "list", "values", "data"],
    (entry) => entry !== null && typeof entry === "object",
  );
}

function normalizeImportedAutoGearPresets(value) {
  return normalizeImportedArray(
    value,
    ["presets", "entries", "items", "list", "values", "data"],
    (entry) => entry !== null && typeof entry === "object",
  );
}

function normalizeImportedPresetId(value) {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number") {
    return Number.isNaN(value) ? "" : String(value);
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i += 1) {
      const candidate = normalizeImportedPresetId(value[i]);
      if (candidate) {
        return candidate;
      }
    }
    return "";
  }
  if (isPlainObject(value)) {
    if (typeof value.id === "string" && value.id) {
      return value.id;
    }
    if (typeof value.value === "string") {
      return value.value;
    }
    if (Object.prototype.hasOwnProperty.call(value, "name")) {
      return normalizeImportedPresetId(value.name);
    }
  }
  return "";
}

function getSnapshotKeyVariants(key) {
  const variants = [key];
  if (typeof key === 'string') {
    if (key.startsWith('cameraPowerPlanner_')) {
      variants.push(`cinePowerPlanner_${key.slice('cameraPowerPlanner_'.length)}`);
    } else if (key.startsWith('cinePowerPlanner_')) {
      variants.push(`cameraPowerPlanner_${key.slice('cinePowerPlanner_'.length)}`);
    }
  }
  return variants;
}

function readSnapshotEntry(snapshot, key) {
  if (!isPlainObject(snapshot)) {
    return null;
  }

  const variants = getSnapshotKeyVariants(key);
  for (let i = 0; i < variants.length; i += 1) {
    const candidate = variants[i];
    if (Object.prototype.hasOwnProperty.call(snapshot, candidate)) {
      return { key: candidate, value: snapshot[candidate], type: 'primary' };
    }
  }

  for (let i = 0; i < variants.length; i += 1) {
    const candidate = `${variants[i]}${STORAGE_BACKUP_SUFFIX}`;
    if (Object.prototype.hasOwnProperty.call(snapshot, candidate)) {
      return { key: candidate, value: snapshot[candidate], type: 'backup' };
    }
  }

  for (let i = 0; i < variants.length; i += 1) {
    const candidate = `${variants[i]}${STORAGE_MIGRATION_BACKUP_SUFFIX}`;
    if (Object.prototype.hasOwnProperty.call(snapshot, candidate)) {
      return { key: candidate, value: snapshot[candidate], type: 'migration-backup' };
    }
  }

  return null;
}

function extractSnapshotStoredValue(entry) {
  if (!entry) {
    return undefined;
  }

  let raw = entry.value;
  if (entry.type === 'migration-backup') {
    try {
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (parsed && typeof parsed === 'object' && Object.prototype.hasOwnProperty.call(parsed, 'data')) {
        raw = parsed.data;
      } else {
        raw = null;
      }
    } catch (error) {
      console.warn('Unable to parse migration backup entry during import', entry.key, error);
      raw = null;
    }
  }

  return raw;
}

function parseSnapshotJSONValue(entry) {
  const raw = extractSnapshotStoredValue(entry);
  if (raw === undefined) {
    return undefined;
  }
  if (raw === null) {
    return null;
  }
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (!trimmed) {
      return '';
    }
    try {
      return JSON.parse(trimmed);
    } catch {
      return raw;
    }
  }
  return raw;
}

function parseSnapshotStringValue(entry) {
  const raw = extractSnapshotStoredValue(entry);
  if (raw === undefined) {
    return undefined;
  }
  if (raw === null) {
    return null;
  }
  if (typeof raw === 'string') {
    return raw;
  }
  if (typeof raw === 'number' || typeof raw === 'boolean') {
    return String(raw);
  }
  if (Array.isArray(raw) || (raw && typeof raw === 'object')) {
    try {
      return JSON.stringify(raw);
    } catch (serializationError) {
      console.warn('Unable to serialize snapshot entry during import', entry && entry.key, serializationError);
      return null;
    }
  }
  return null;
}

function convertStorageSnapshotToData(snapshot) {
  if (!isPlainObject(snapshot)) {
    return null;
  }

  const data = {};
  let hasAssignments = false;
  let hasSnapshotKeys = false;

  const markSnapshotEntry = (entry) => {
    if (!entry || typeof entry.key !== 'string') {
      return;
    }
    if (
      entry.key.startsWith('cameraPowerPlanner_') ||
      entry.key.startsWith('cinePowerPlanner_') ||
      entry.key.endsWith(STORAGE_BACKUP_SUFFIX) ||
      entry.key.endsWith(STORAGE_MIGRATION_BACKUP_SUFFIX)
    ) {
      hasSnapshotKeys = true;
    }
  };

  const assignJSONValue = (storageKey, targetKey) => {
    const entry = readSnapshotEntry(snapshot, storageKey);
    if (!entry) {
      return;
    }
    markSnapshotEntry(entry);
    const value = parseSnapshotJSONValue(entry);
    if (value === undefined) {
      return;
    }
    data[targetKey] = value;
    hasAssignments = true;
  };

  assignJSONValue(DEVICE_STORAGE_KEY, 'devices');
  assignJSONValue(SETUP_STORAGE_KEY, 'setups');
  assignJSONValue(SESSION_STATE_KEY, 'session');
  assignJSONValue(FEEDBACK_STORAGE_KEY, 'feedback');
  assignJSONValue(PROJECT_STORAGE_KEY, 'project');
  assignJSONValue(FAVORITES_STORAGE_KEY, 'favorites');
  assignJSONValue(AUTO_GEAR_RULES_STORAGE_KEY, 'autoGearRules');
  assignJSONValue(AUTO_GEAR_BACKUPS_STORAGE_KEY, 'autoGearBackups');
  assignJSONValue(AUTO_GEAR_PRESETS_STORAGE_KEY, 'autoGearPresets');

  const schemaEntry = readSnapshotEntry(snapshot, DEVICE_SCHEMA_CACHE_KEY);
  if (schemaEntry) {
    markSnapshotEntry(schemaEntry);
    const cacheValue = parseSnapshotStringValue(schemaEntry);
    if (cacheValue !== undefined) {
      data.schemaCache = cacheValue;
      hasAssignments = true;
    }
  }

  const customFontsEntry = readSnapshotEntry(snapshot, getCustomFontStorageKeyName());
  if (customFontsEntry) {
    markSnapshotEntry(customFontsEntry);
    const fontsValue = parseSnapshotJSONValue(customFontsEntry);
    if (fontsValue !== undefined) {
      data.customFonts = fontsValue;
      hasAssignments = true;
    }
  }

  const customLogoEntry = readSnapshotEntry(snapshot, CUSTOM_LOGO_STORAGE_KEY);
  if (customLogoEntry) {
    markSnapshotEntry(customLogoEntry);
    const logoValue = parseSnapshotStringValue(customLogoEntry);
    if (logoValue !== undefined) {
      data.customLogo = logoValue;
      hasAssignments = true;
    }
  }

  const seedEntry = readSnapshotEntry(snapshot, AUTO_GEAR_SEEDED_STORAGE_KEY);
  if (seedEntry) {
    markSnapshotEntry(seedEntry);
    data.autoGearSeeded = extractSnapshotStoredValue(seedEntry);
    hasAssignments = true;
  }

  const activePresetEntry = readSnapshotEntry(snapshot, AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY);
  if (activePresetEntry) {
    markSnapshotEntry(activePresetEntry);
    data.autoGearActivePresetId = parseSnapshotStringValue(activePresetEntry);
    hasAssignments = true;
  }

  const autoPresetEntry = readSnapshotEntry(snapshot, AUTO_GEAR_AUTO_PRESET_STORAGE_KEY);
  if (autoPresetEntry) {
    markSnapshotEntry(autoPresetEntry);
    data.autoGearAutoPresetId = parseSnapshotStringValue(autoPresetEntry);
    hasAssignments = true;
  }

  const backupsVisibilityEntry = readSnapshotEntry(snapshot, AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY);
  if (backupsVisibilityEntry) {
    markSnapshotEntry(backupsVisibilityEntry);
    data.autoGearShowBackups = extractSnapshotStoredValue(backupsVisibilityEntry);
    hasAssignments = true;
  }

  const preferenceKeys = [
    'darkMode',
    'pinkMode',
    'highContrast',
    'reduceMotion',
    'relaxedSpacing',
    'showAutoBackups',
    'accentColor',
    'fontSize',
    'fontFamily',
    'language',
    'iosPwaHelpShown',
  ];
  const booleanPreferenceKeys = new Set([
    'darkMode',
    'pinkMode',
    'highContrast',
    'reduceMotion',
    'relaxedSpacing',
    'showAutoBackups',
    'iosPwaHelpShown',
  ]);
  const preferences = {};

  preferenceKeys.forEach((key) => {
    const entry = readSnapshotEntry(snapshot, key);
    if (!entry) {
      return;
    }
    markSnapshotEntry(entry);
    const raw = extractSnapshotStoredValue(entry);
    if (booleanPreferenceKeys.has(key)) {
      const normalized = normalizeImportedBoolean(raw);
      if (normalized !== null) {
        preferences[key] = normalized;
        hasAssignments = true;
        return;
      }
    }
    const stringValue = parseSnapshotStringValue(entry);
    if (stringValue !== undefined) {
      preferences[key] = stringValue;
      hasAssignments = true;
    }
  });

  if (Object.keys(preferences).length > 0) {
    data.preferences = preferences;
  }

  if (!hasAssignments || !hasSnapshotKeys) {
    return null;
  }

  return data;
}

function importAllData(allData, options = {}) {
  if (!isPlainObject(allData)) {
    return;
  }

  const { skipSnapshotConversion = false } = options || {};

  if (!skipSnapshotConversion) {
    const converted = convertStorageSnapshotToData(allData);
    if (converted) {
      importAllData(converted, { skipSnapshotConversion: true });
      return;
    }
  }

  const hasOwn = (key) => Object.prototype.hasOwnProperty.call(allData, key);

  if (hasOwn('devices')) {
    saveDeviceData(allData.devices);
  }
  if (hasOwn('setups')) {
    saveSetups(allData.setups);
  }
  if (hasOwn('session')) {
    saveSessionState(allData.session);
  }
  if (hasOwn('feedback')) {
    saveFeedback(allData.feedback);
  }
  if (hasOwn('favorites')) {
    saveFavorites(allData.favorites);
  }
  if (isPlainObject(allData.preferences)) {
    const prefs = allData.preferences;
    const booleanPrefs = [
      'darkMode',
      'pinkMode',
      'highContrast',
      'reduceMotion',
      'relaxedSpacing',
      'showAutoBackups',
      'iosPwaHelpShown',
    ];
    booleanPrefs.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(prefs, key) && typeof prefs[key] === 'boolean') {
        safeSetLocalStorage(key, prefs[key]);
      }
    });
    const stringPrefs = ['accentColor', 'fontSize', 'fontFamily', 'language'];
    stringPrefs.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(prefs, key)) {
        const value = prefs[key];
        if (typeof value === 'string' && value) {
          safeSetLocalStorage(key, value);
        }
      }
    });
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'customLogo')) {
    const logo = allData.customLogo;
    if (typeof logo === 'string' && logo) {
      safeSetLocalStorage(CUSTOM_LOGO_STORAGE_KEY, logo);
    } else {
      safeSetLocalStorage(CUSTOM_LOGO_STORAGE_KEY, null);
    }
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'customFonts')) {
    const fonts = normalizeCustomFontEntries(allData.customFonts);
    if (fonts.length) {
      try {
        safeSetLocalStorage(
          getCustomFontStorageKeyName(),
          JSON.stringify(fonts)
        );
      } catch (error) {
        console.warn('Unable to store imported custom fonts', error);
      }
    } else {
      safeSetLocalStorage(getCustomFontStorageKeyName(), null);
    }
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'schemaCache')) {
    const cache = allData.schemaCache;
    if (typeof cache === 'string' || cache === null) {
      safeSetLocalStorage(DEVICE_SCHEMA_CACHE_KEY, cache);
    } else if (cache && typeof cache === 'object') {
      try {
        safeSetLocalStorage(DEVICE_SCHEMA_CACHE_KEY, JSON.stringify(cache));
      } catch (schemaError) {
        console.warn('Unable to store imported schema cache', schemaError);
      }
    }
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearRules')) {
    const rules = normalizeImportedAutoGearRules(allData.autoGearRules);
    saveAutoGearRules(rules);
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearBackups')) {
    const backups = normalizeImportedAutoGearBackups(allData.autoGearBackups);
    saveAutoGearBackups(backups);
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearSeeded')) {
    const flag = normalizeImportedBoolean(allData.autoGearSeeded);
    if (flag === null) {
      saveAutoGearSeedFlag(Boolean(allData.autoGearSeeded));
    } else {
      saveAutoGearSeedFlag(flag);
    }
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearPresets')) {
    const presets = normalizeImportedAutoGearPresets(allData.autoGearPresets);
    saveAutoGearPresets(presets);
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearActivePresetId')) {
    const presetId = normalizeImportedPresetId(allData.autoGearActivePresetId);
    saveAutoGearActivePresetId(typeof presetId === 'string' ? presetId : '');
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearAutoPresetId')) {
    saveAutoGearAutoPresetId(
      typeof allData.autoGearAutoPresetId === 'string' ? allData.autoGearAutoPresetId : ''
    );
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearShowBackups')) {
    const visibility = normalizeImportedBoolean(allData.autoGearShowBackups);
    if (visibility === null) {
      saveAutoGearBackupVisibility(Boolean(allData.autoGearShowBackups));
    } else {
      saveAutoGearBackupVisibility(visibility);
    }
  }

  let importProjectEntry = null;
  const ensureProjectImporter = () => {
    if (!importProjectEntry) {
      importProjectEntry = createProjectImporter();
    }
    return importProjectEntry;
  };

  if (allData.project) {
    importProjectCollection(allData.project, ensureProjectImporter);
  } else if (allData.projects) {
    // Legacy plural key. Accept object map or array of named projects.
    importProjectCollection(allData.projects, ensureProjectImporter);
  } else if (typeof allData.gearList === "string") {
    // Legacy export format stored just the gear list HTML
    ensureProjectImporter()("", { gearList: allData.gearList });
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    getSafeLocalStorage,
    loadDeviceData,
    saveDeviceData,
    loadSetups,
    saveSetups,
    saveSetup,
    loadSetup,
    deleteSetup,
    renameSetup,
    loadProject,
    saveProject,
    deleteProject,
    loadSessionState,
    saveSessionState,
    loadFavorites,
    saveFavorites,
    loadAutoGearBackups,
    saveAutoGearBackups,
    loadFeedback,
    saveFeedback,
    clearAllData,
    exportAllData,
    importAllData,
    loadAutoGearRules,
    saveAutoGearRules,
    loadAutoGearSeedFlag,
    saveAutoGearSeedFlag,
    loadAutoGearPresets,
    saveAutoGearPresets,
    loadAutoGearActivePresetId,
    saveAutoGearActivePresetId,
    loadAutoGearAutoPresetId,
    saveAutoGearAutoPresetId,
    loadAutoGearBackupVisibility,
    saveAutoGearBackupVisibility,
    requestPersistentStorage,
  };
}
