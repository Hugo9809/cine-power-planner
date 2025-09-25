// storage.js - Handles reading from and writing to localStorage.
/* global texts, currentLang, SAFE_LOCAL_STORAGE, __cineGlobal, LZString */

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
const LEGACY_SCHEMA_CACHE_KEY = 'cinePowerPlanner_schemaCache';
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
const TEMPERATURE_UNIT_STORAGE_KEY_DEFAULT = 'cameraPowerPlanner_temperatureUnit';

function resolveTemperatureUnitStorageKey() {
  if (!GLOBAL_SCOPE) {
    return TEMPERATURE_UNIT_STORAGE_KEY_DEFAULT;
  }

  const existing =
    typeof GLOBAL_SCOPE.TEMPERATURE_UNIT_STORAGE_KEY === 'string'
      ? GLOBAL_SCOPE.TEMPERATURE_UNIT_STORAGE_KEY
      : TEMPERATURE_UNIT_STORAGE_KEY_DEFAULT;

  if (GLOBAL_SCOPE.TEMPERATURE_UNIT_STORAGE_KEY !== existing) {
    try {
      GLOBAL_SCOPE.TEMPERATURE_UNIT_STORAGE_KEY = existing;
    } catch (assignError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to assign temperature unit storage key globally.', assignError);
      }
      try {
        Object.defineProperty(GLOBAL_SCOPE, 'TEMPERATURE_UNIT_STORAGE_KEY', {
          configurable: true,
          writable: true,
          value: existing,
        });
      } catch (defineError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Unable to expose temperature unit storage key globally.', defineError);
        }
      }
    }
  }

  return existing;
}

const TEMPERATURE_UNIT_STORAGE_KEY_NAME = resolveTemperatureUnitStorageKey();
const AUTO_GEAR_RULES_STORAGE_KEY = 'cameraPowerPlanner_autoGearRules';
const AUTO_GEAR_SEEDED_STORAGE_KEY = 'cameraPowerPlanner_autoGearSeeded';
const AUTO_GEAR_BACKUPS_STORAGE_KEY = 'cameraPowerPlanner_autoGearBackups';
const AUTO_GEAR_PRESETS_STORAGE_KEY = 'cameraPowerPlanner_autoGearPresets';
const AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY = 'cameraPowerPlanner_autoGearMonitorDefaults';
const AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY = 'cameraPowerPlanner_autoGearActivePreset';
const AUTO_GEAR_AUTO_PRESET_STORAGE_KEY = 'cameraPowerPlanner_autoGearAutoPreset';
const AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY = 'cameraPowerPlanner_autoGearShowBackups';
const AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY = 'cameraPowerPlanner_autoGearBackupRetention';
const FULL_BACKUP_HISTORY_STORAGE_KEY = 'cameraPowerPlanner_fullBackups';
const STORAGE_AUTO_BACKUP_NAME_PREFIX = 'auto-backup-';
const STORAGE_AUTO_BACKUP_DELETION_PREFIX = 'auto-backup-before-delete-';
const MAX_AUTO_BACKUPS = 50;
const AUTO_BACKUP_MANUAL_RENAME_FLAG = '__cineManualAutoBackupRename';
const MAX_DELETION_BACKUPS = 20;
const MAX_FULL_BACKUP_HISTORY_ENTRIES = 200;
const AUTO_GEAR_BACKUP_RETENTION_DEFAULT_VALUE = 12;
const AUTO_GEAR_BACKUP_RETENTION_MIN = 1;

function ensureGlobalAutoGearBackupDefaults() {
  if (!GLOBAL_SCOPE || typeof GLOBAL_SCOPE !== 'object') {
    return;
  }

  if (typeof GLOBAL_SCOPE.AUTO_GEAR_BACKUP_RETENTION_DEFAULT !== 'number') {
    try {
      GLOBAL_SCOPE.AUTO_GEAR_BACKUP_RETENTION_DEFAULT = AUTO_GEAR_BACKUP_RETENTION_DEFAULT_VALUE;
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to expose auto gear backup retention default globally.', error);
      }
    }
  }

  if (typeof GLOBAL_SCOPE.AUTO_GEAR_BACKUP_RETENTION_MIN !== 'number') {
    try {
      GLOBAL_SCOPE.AUTO_GEAR_BACKUP_RETENTION_MIN = AUTO_GEAR_BACKUP_RETENTION_MIN;
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to expose auto gear backup retention minimum globally.', error);
      }
    }
  }
}

ensureGlobalAutoGearBackupDefaults();

const STORAGE_BACKUP_SUFFIX = '__backup';
const MAX_SAVE_ATTEMPTS = 3;
const MAX_QUOTA_RECOVERY_STEPS = 100;
const STORAGE_MIGRATION_BACKUP_SUFFIX = '__legacyMigrationBackup';
const RAW_STORAGE_BACKUP_KEYS = new Set([
  getCustomFontStorageKeyName(),
  CUSTOM_LOGO_STORAGE_KEY,
  DEVICE_SCHEMA_CACHE_KEY,
]);

const MAX_MIGRATION_BACKUP_CLEANUP_STEPS = 10;
const MIGRATION_BACKUP_COMPRESSION_ALGORITHM = 'lz-string';
const MIGRATION_BACKUP_COMPRESSION_ENCODING = 'json-string';

function canUseMigrationBackupCompression() {
  return (
    typeof LZString === 'object'
    && LZString !== null
    && typeof LZString.compressToUTF16 === 'function'
    && typeof LZString.decompressFromUTF16 === 'function'
  );
}

function tryCreateCompressedMigrationBackupCandidate(serializedPayload, createdAt) {
  if (typeof serializedPayload !== 'string' || !serializedPayload) {
    return null;
  }
  if (!canUseMigrationBackupCompression()) {
    return null;
  }

  let compressed;
  try {
    compressed = LZString.compressToUTF16(serializedPayload);
  } catch (compressionError) {
    console.warn('Unable to compress migration backup payload', compressionError);
    return null;
  }

  if (typeof compressed !== 'string' || !compressed || compressed.length >= serializedPayload.length) {
    return null;
  }

  let serializedCompressedPayload;
  try {
    serializedCompressedPayload = JSON.stringify({
      createdAt,
      compression: MIGRATION_BACKUP_COMPRESSION_ALGORITHM,
      encoding: MIGRATION_BACKUP_COMPRESSION_ENCODING,
      data: compressed,
      originalSize: serializedPayload.length,
      compressedSize: compressed.length,
    });
  } catch (serializationError) {
    console.warn('Unable to serialize compressed migration backup payload', serializationError);
    return null;
  }

  return {
    serialized: serializedCompressedPayload,
    originalSize: serializedPayload.length,
    compressedSize: compressed.length,
  };
}

function parseMigrationBackupMetadata(raw) {
  if (typeof raw !== 'string' || !raw) {
    return { createdAt: 0, size: typeof raw === 'string' ? raw.length : 0 };
  }

  const metadata = { createdAt: 0, size: raw.length };

  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      const candidate = typeof parsed.createdAt === 'string' ? parsed.createdAt.trim() : '';
      if (candidate) {
        const timestamp = Date.parse(candidate);
        if (!Number.isNaN(timestamp)) {
          metadata.createdAt = timestamp;
        }
      }
    }
  } catch (error) {
    void error;
  }

  return metadata;
}

function collectMigrationBackupEntriesForCleanup(storage, excludeKey) {
  if (!storage) {
    return [];
  }

  let snapshot;
  try {
    snapshot = snapshotStorageEntries(storage, { suppressAlerts: true });
  } catch (error) {
    console.warn('Unable to inspect storage while preparing migration backup cleanup', error);
    return [];
  }

  if (!snapshot || typeof snapshot !== 'object') {
    return [];
  }

  return Object.keys(snapshot)
    .filter((candidate) => {
      if (typeof candidate !== 'string' || !candidate) {
        return false;
      }
      if (!candidate.endsWith(STORAGE_MIGRATION_BACKUP_SUFFIX)) {
        return false;
      }
      if (excludeKey && candidate === excludeKey) {
        return false;
      }
      return true;
    })
    .map((candidate) => {
      const raw = snapshot[candidate];
      const normalized = typeof raw === 'string' ? raw : raw === null || raw === undefined ? '' : String(raw);
      const metadata = parseMigrationBackupMetadata(normalized);
      return {
        key: candidate,
        createdAt: metadata.createdAt,
        size: metadata.size,
      };
    })
    .sort((a, b) => {
      if (a.createdAt && b.createdAt && a.createdAt !== b.createdAt) {
        return a.createdAt - b.createdAt;
      }
      if (a.createdAt && !b.createdAt) {
        return -1;
      }
      if (!a.createdAt && b.createdAt) {
        return 1;
      }
      if (a.size !== b.size) {
        return b.size - a.size;
      }
      return a.key.localeCompare(b.key);
    });
}

function pruneMigrationBackupEntriesForCleanup(storage, excludeKey) {
  const entries = collectMigrationBackupEntriesForCleanup(storage, excludeKey);
  if (!entries.length) {
    return [];
  }

  const removedKeys = [];
  const target = entries[0];
  try {
    storage.removeItem(target.key);
    removedKeys.push(target.key);
  } catch (error) {
    console.warn(`Unable to remove migration backup ${target.key} during cleanup`, error);
  }

  return removedKeys;
}

function attemptMigrationBackupQuotaRecovery(storage, key, backupKey, tryWrite) {
  if (!storage || typeof storage.setItem !== 'function') {
    return { success: false, error: null };
  }

  const removedBackups = [];
  let lastError = null;

  if (typeof tryWrite !== 'function') {
    return { success: false, error: null };
  }

  const attemptWrite = () => {
    const result = tryWrite();
    if (result && typeof result === 'object' && 'error' in result && result.error) {
      lastError = result.error;
    }
    if (result && result.success) {
      return { success: true, quota: false };
    }
    if (result && result.quota) {
      return { success: false, quota: true, error: result.error || null };
    }
    return { success: false, quota: false, error: result && result.error ? result.error : null };
  };

  if (typeof clearUiCacheStorageEntries === 'function') {
    let cleared = false;
    try {
      clearUiCacheStorageEntries();
      cleared = true;
    } catch (clearError) {
      console.warn('Unable to clear cached UI storage entries before creating migration backup', clearError);
    }

    if (cleared) {
      const retryAfterClear = attemptWrite();
      if (retryAfterClear.success) {
        console.warn(`Cleared cached planner data to free storage before creating migration backup for ${key}.`);
        return { success: true, error: null };
      }
      if (!retryAfterClear.quota) {
        return { success: false, error: retryAfterClear.error };
      }
    }
  }

  for (let attempt = 0; attempt < MAX_MIGRATION_BACKUP_CLEANUP_STEPS; attempt += 1) {
    const removed = pruneMigrationBackupEntriesForCleanup(storage, backupKey);
    if (!removed.length) {
      break;
    }
    removedBackups.push(...removed);
    const retry = attemptWrite();
    if (retry.success) {
      console.warn(
        `Removed ${removedBackups.length} older migration backup${removedBackups.length > 1 ? 's' : ''} to free up storage before creating migration backup for ${key}.`,
        removedBackups,
      );
      return { success: true, error: null };
    }
    if (!retry.quota) {
      return { success: false, error: retry.error };
    }
  }

  if (removedBackups.length > 0) {
    console.warn(
      `Removed ${removedBackups.length} older migration backup${removedBackups.length > 1 ? 's' : ''} while attempting to create migration backup for ${key}, but storage quota is still exceeded.`,
      removedBackups,
    );
  }

  return { success: false, error: lastError };
}

function ensurePreWriteMigrationBackup(storage, key) {
  if (!storage || typeof storage.getItem !== 'function' || !key) {
    return null;
  }

  let rawValue = null;
  try {
    rawValue = storage.getItem(key);
  } catch (inspectionError) {
    console.warn(`Unable to inspect existing value for ${key} before creating migration backup`, inspectionError);
    return null;
  }

  if (rawValue === null || rawValue === undefined) {
    return null;
  }

  let parsedValue = rawValue;
  if (typeof rawValue === 'string' && rawValue) {
    try {
      parsedValue = JSON.parse(rawValue);
    } catch (parseError) {
      void parseError;
    }
  }

  createStorageMigrationBackup(storage, key, parsedValue);
  return parsedValue;
}

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
  const createdAt = new Date().toISOString();
  try {
    serialized = JSON.stringify({
      createdAt,
      data: originalValue,
    });
  } catch (serializationError) {
    console.warn(`Unable to serialize migration backup for ${key}`, serializationError);
    return;
  }

  const tryStoreSerialized = (candidate, options = {}) => {
    const { logCompression = false, info = null } = options || {};
    try {
      storage.setItem(backupKey, candidate.serialized);
      if (logCompression && info && !tryStoreSerialized.compressionLogged) {
        tryStoreSerialized.compressionLogged = true;
        const savings = info.originalSize - info.compressedSize;
        const percent = info.originalSize > 0 ? Math.round((savings / info.originalSize) * 100) : 0;
        console.warn(
          `Stored compressed migration backup for ${key} to reduce storage usage by ${savings} characters (${percent}%).`,
        );
      }
      return { success: true, quota: false };
    } catch (error) {
      return { success: false, quota: isQuotaExceededError(error), error };
    }
  };
  tryStoreSerialized.compressionLogged = tryStoreSerialized.compressionLogged || false;

  const standardCandidate = { serialized };
  const standardResult = tryStoreSerialized(standardCandidate);
  if (standardResult.success) {
    return;
  }

  const handleFailure = (error) => {
    console.warn(`Unable to create migration backup for ${key}`, error);
  };

  if (!standardResult.quota) {
    handleFailure(standardResult.error);
    return;
  }

  const compressedCandidate = tryCreateCompressedMigrationBackupCandidate(serialized, createdAt);

  const runRecoveryWith = (candidate, options, fallbackError) => {
    const recovery = attemptMigrationBackupQuotaRecovery(storage, key, backupKey, () =>
      tryStoreSerialized(candidate, options),
    );
    if (recovery && recovery.success) {
      return true;
    }
    const errorToReport = recovery && recovery.error ? recovery.error : fallbackError;
    handleFailure(errorToReport);
    alertStorageError('migration-backup-quota');
    return false;
  };

  if (compressedCandidate) {
    const compressedResult = tryStoreSerialized(compressedCandidate, {
      logCompression: true,
      info: compressedCandidate,
    });
    if (compressedResult.success) {
      return;
    }
    if (!compressedResult.quota) {
      handleFailure(compressedResult.error);
      return;
    }
    if (runRecoveryWith(compressedCandidate, { logCompression: true, info: compressedCandidate }, compressedResult.error)) {
      return;
    }
    return;
  }

  if (runRecoveryWith(standardCandidate, {}, standardResult.error)) {
    return;
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
  AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY,
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
  TEMPERATURE_UNIT_STORAGE_KEY_NAME,
];

const STORAGE_ALERT_FLAG_NAME = '__cameraPowerPlannerStorageAlertShown';
const SESSION_FALLBACK_ALERT_FLAG_NAME = '__cameraPowerPlannerSessionFallbackAlertShown';

let storageErrorAlertShown = false;
if (GLOBAL_SCOPE) {
  if (typeof GLOBAL_SCOPE[STORAGE_ALERT_FLAG_NAME] === 'boolean') {
    storageErrorAlertShown = GLOBAL_SCOPE[STORAGE_ALERT_FLAG_NAME];
  } else {
    GLOBAL_SCOPE[STORAGE_ALERT_FLAG_NAME] = false;
  }
}

let sessionFallbackAlertShown = false;
if (GLOBAL_SCOPE) {
  if (typeof GLOBAL_SCOPE[SESSION_FALLBACK_ALERT_FLAG_NAME] === 'boolean') {
    sessionFallbackAlertShown = GLOBAL_SCOPE[SESSION_FALLBACK_ALERT_FLAG_NAME];
  } else {
    GLOBAL_SCOPE[SESSION_FALLBACK_ALERT_FLAG_NAME] = false;
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
          alertSessionFallback();
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

function snapshotStorageEntries(storage, options = {}) {
  const snapshot = Object.create(null);
  if (!storage) {
    return snapshot;
  }

  const { suppressAlerts = false } = options || {};

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
      if (!suppressAlerts) {
        alertStorageError('migration-read');
      }
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
      if (!suppressAlerts) {
        alertStorageError('migration-read');
      }
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
      if (!suppressAlerts) {
        alertStorageError('migration-read');
      }
    }
    return snapshot;
  }

  Object.keys(storage).forEach(captureKey);
  return snapshot;
}

function updateGlobalSafeLocalStorageReference() {
  if (!GLOBAL_SCOPE || typeof GLOBAL_SCOPE !== 'object') {
    return;
  }

  try {
    Object.defineProperty(GLOBAL_SCOPE, 'SAFE_LOCAL_STORAGE', {
      configurable: true,
      get: getSafeLocalStorage,
    });
    return;
  } catch (defineError) {
    void defineError;
    try {
      GLOBAL_SCOPE.SAFE_LOCAL_STORAGE = getSafeLocalStorage();
      return;
    } catch (assignError) {
      console.warn('Unable to refresh SAFE_LOCAL_STORAGE global reference', assignError);
    }
  }
}

function downgradeSafeLocalStorageToMemory(reason, error, failingStorage) {
  if (!safeLocalStorageInfo || safeLocalStorageInfo.type === 'memory') {
    return;
  }

  const activeStorage = safeLocalStorageInfo.storage;
  if (!activeStorage || (failingStorage && failingStorage !== activeStorage)) {
    return;
  }

  let snapshot = Object.create(null);
  try {
    snapshot = snapshotStorageEntries(activeStorage, { suppressAlerts: true });
  } catch (snapshotError) {
    console.warn('Unable to capture storage snapshot during downgrade', snapshotError);
  }

  const memoryStorage = createMemoryStorage();
  Object.keys(snapshot).forEach((key) => {
    try {
      memoryStorage.setItem(key, snapshot[key]);
    } catch (copyError) {
      console.warn('Unable to copy storage entry to memory during downgrade', key, copyError);
    }
  });

  safeLocalStorageInfo = { storage: memoryStorage, type: 'memory' };
  lastFailedUpgradeCandidate = null;

  console.warn(
    reason
      ? `Downgraded planner storage to in-memory fallback after ${reason} errors.`
      : 'Downgraded planner storage to in-memory fallback after storage errors.',
    error,
  );

  updateGlobalSafeLocalStorageReference();
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

updateGlobalSafeLocalStorageReference();

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
  if (val === null || typeof val !== 'object') {
    return false;
  }
  let prototype;
  try {
    prototype = Object.getPrototypeOf(val);
  } catch {
    return false;
  }
  if (prototype === null || prototype === Object.prototype) {
    return true;
  }
  const secondLevel = Object.getPrototypeOf(prototype);
  if (secondLevel === null && typeof prototype.constructor === 'function') {
    const name = prototype.constructor.name;
    return name === 'Object' || name === '';
  }
  return false;
}

function parseAutoBackupKey(name) {
  if (typeof name !== 'string') {
    return { timestamp: Number.NEGATIVE_INFINITY, label: '' };
  }

  if (name.startsWith(STORAGE_AUTO_BACKUP_NAME_PREFIX)) {
    const match = name.match(/^auto-backup-(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})(?:-(.*))?$/);
    if (!match) {
      return { timestamp: Number.NEGATIVE_INFINITY, label: '' };
    }
    const [, year, month, day, hour, minute, rawLabel = ''] = match;
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
    return {
      timestamp: Number.isNaN(time) ? Number.NEGATIVE_INFINITY : time,
      label: rawLabel.trim(),
    };
  }

  if (name.startsWith(STORAGE_AUTO_BACKUP_DELETION_PREFIX)) {
    const match = name.match(/^auto-backup-before-delete-(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})(?:-(.*))?$/);
    if (!match) {
      return { timestamp: Number.NEGATIVE_INFINITY, label: '' };
    }
    const [, year, month, day, hour, minute, second, rawLabel = ''] = match;
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
    return {
      timestamp: Number.isNaN(time) ? Number.NEGATIVE_INFINITY : time,
      label: rawLabel.trim(),
    };
  }

  return { timestamp: Number.NEGATIVE_INFINITY, label: '' };
}

function collectAutoBackupEntries(container, prefix) {
  if (!isPlainObject(container) || typeof prefix !== 'string') {
    return [];
  }

  return Object.keys(container)
    .filter((key) => typeof key === 'string' && key.startsWith(prefix))
    .map((key) => {
      const { timestamp, label } = parseAutoBackupKey(key);
      return { key, timestamp, label };
    })
    .sort((a, b) => {
      if (a.timestamp !== b.timestamp) {
        return a.timestamp - b.timestamp;
      }
      return a.key.localeCompare(b.key);
    });
}

function getAutoBackupLabelKey(entry) {
  if (!entry || typeof entry !== 'object') {
    return '';
  }
  if (typeof entry.label === 'string' && entry.label.trim()) {
    return entry.label.trim();
  }
  if (typeof entry.key === 'string') {
    return entry.key;
  }
  return '';
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
  if (value instanceof Date) {
    const timestamp = value.getTime();
    if (Number.isNaN(timestamp)) {
      return 'date:invalid';
    }
    return `date:${timestamp}`;
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

function isManualAutoBackupEntry(container, key) {
  if (!isPlainObject(container) || typeof key !== 'string') {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(container, key)) {
    return false;
  }

  const value = container[key];
  if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
    return false;
  }

  return Boolean(value[AUTO_BACKUP_MANUAL_RENAME_FLAG]);
}

function applyManualAutoBackupRenameFlag(entry, flagged) {
  if (!flagged || !entry || typeof entry !== 'object' || Array.isArray(entry)) {
    return entry;
  }

  if (
    Object.prototype.hasOwnProperty.call(entry, AUTO_BACKUP_MANUAL_RENAME_FLAG)
    && entry[AUTO_BACKUP_MANUAL_RENAME_FLAG]
  ) {
    return entry;
  }

  return { ...entry, [AUTO_BACKUP_MANUAL_RENAME_FLAG]: true };
}

function removeDuplicateAutoBackupEntries(container, entries) {
  if (!isPlainObject(container) || !Array.isArray(entries) || entries.length < 2) {
    return [];
  }

  const removedKeys = [];
  const seenSignaturesByLabel = new Map();

  for (let index = entries.length - 1; index >= 0; index -= 1) {
    const entry = entries[index];
    if (!entry || typeof entry.key !== 'string') {
      continue;
    }
    if (isManualAutoBackupEntry(container, entry.key)) {
      continue;
    }
    const labelKey = getAutoBackupLabelKey(entry);
    const labelSignatures = seenSignaturesByLabel.get(labelKey) || new Set();
    const value = Object.prototype.hasOwnProperty.call(container, entry.key)
      ? container[entry.key]
      : undefined;
    const signature = createStableValueSignature(value);
    if (labelSignatures.has(signature)) {
      delete container[entry.key];
      entries.splice(index, 1);
      removedKeys.push(entry.key);
      continue;
    }
    labelSignatures.add(signature);
    seenSignaturesByLabel.set(labelKey, labelSignatures);
  }

  return removedKeys;
}

function pruneAutoBackupEntries(container, entries, limit, removedKeys) {
  if (!isPlainObject(container) || !Array.isArray(entries) || entries.length <= limit) {
    return;
  }

  const labelCounts = new Map();
  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    if (!entry || typeof entry !== 'object') {
      continue;
    }
    const labelKey = getAutoBackupLabelKey(entry);
    labelCounts.set(labelKey, (labelCounts.get(labelKey) || 0) + 1);
  }

  let index = 0;
  while (entries.length > limit && index < entries.length) {
    const entry = entries[index];
    if (!entry || typeof entry.key !== 'string') {
      index += 1;
      continue;
    }
    const labelKey = getAutoBackupLabelKey(entry);
    const count = labelCounts.get(labelKey) || 0;
    const manual = isManualAutoBackupEntry(container, entry.key);
    if (labelKey && count > 1) {
      if (manual) {
        index += 1;
        continue;
      }
      delete container[entry.key];
      entries.splice(index, 1);
      labelCounts.set(labelKey, count - 1);
      removedKeys.push(entry.key);
      continue;
    }
    index += 1;
  }

  if (entries.length <= limit) {
    return;
  }

  let pass = 0;
  while (entries.length > limit && pass < 2) {
    index = 0;
    while (entries.length > limit && index < entries.length) {
      const entry = entries[index];
      if (!entry || typeof entry.key !== 'string') {
        index += 1;
        continue;
      }
      const manual = isManualAutoBackupEntry(container, entry.key);
      if (pass === 0 && manual) {
        index += 1;
        continue;
      }
      const labelKey = getAutoBackupLabelKey(entry);
      const count = labelCounts.get(labelKey) || 0;
      delete container[entry.key];
      entries.splice(index, 1);
      labelCounts.set(labelKey, Math.max(0, count - 1));
      removedKeys.push(entry.key);
    }
    pass += 1;
  }
}

function enforceAutoBackupLimits(container) {
  if (!isPlainObject(container)) {
    return [];
  }

  const removed = [];

  const autoBackups = collectAutoBackupEntries(container, STORAGE_AUTO_BACKUP_NAME_PREFIX);
  if (autoBackups.length > MAX_AUTO_BACKUPS) {
    removed.push(...removeDuplicateAutoBackupEntries(container, autoBackups));
    pruneAutoBackupEntries(container, autoBackups, MAX_AUTO_BACKUPS, removed);
  }

  const deletionBackups = collectAutoBackupEntries(container, STORAGE_AUTO_BACKUP_DELETION_PREFIX);
  if (deletionBackups.length > MAX_DELETION_BACKUPS) {
    removed.push(...removeDuplicateAutoBackupEntries(container, deletionBackups));
    pruneAutoBackupEntries(container, deletionBackups, MAX_DELETION_BACKUPS, removed);
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

  const autoBackups = collectAutoBackupEntries(container, STORAGE_AUTO_BACKUP_NAME_PREFIX);
  if (autoBackups.length > 0) {
    const oldest = autoBackups.shift();
    if (oldest) {
      delete container[oldest.key];
      return oldest.key;
    }
  }

  const deletionBackups = collectAutoBackupEntries(container, STORAGE_AUTO_BACKUP_DELETION_PREFIX);
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

function alertSessionFallback() {
  if (sessionFallbackAlertShown) {
    return;
  }

  sessionFallbackAlertShown = true;
  if (GLOBAL_SCOPE) {
    GLOBAL_SCOPE[SESSION_FALLBACK_ALERT_FLAG_NAME] = true;
  }

  if (typeof window === 'undefined' || typeof window.alert !== 'function') return;

  let msg = 'Warning: Local storage is unavailable. Data will only persist for this browser tab.';
  try {
    if (typeof texts !== 'undefined') {
      const lang = typeof currentLang !== 'undefined' && texts[currentLang] ? currentLang : 'en';
      msg = texts[lang]?.alertSessionFallback || msg;
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
    { legacy: `${legacyPrefix}autoGearBackupRetention`, modern: AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY },
    { legacy: `${legacyPrefix}autoGearMonitorDefaults`, modern: AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY },
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
    downgradeSafeLocalStorageToMemory('read access', err, storage);
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
      downgradeSafeLocalStorageToMemory('read access', err, storage);
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
        downgradeSafeLocalStorageToMemory('write access', error, storage);
        alertStorageError();
        return;
      }
    }

    if (!useBackup) {
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
    downgradeSafeLocalStorageToMemory('deletion', e, storage);
    alertStorageError();
  }

  if (useBackup) {
    try {
    storage.removeItem(fallbackKey);
  } catch (backupError) {
    console.error(`${errorMessage} (backup)`, backupError);
    downgradeSafeLocalStorageToMemory('deletion', backupError, storage);
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

const UI_CACHE_STORAGE_KEYS = [
  DEVICE_SCHEMA_CACHE_KEY,
  LEGACY_SCHEMA_CACHE_KEY,
];

const UI_CACHE_STORAGE_ACCESS_WARNINGS = new Set();

function collectUiCacheStorages() {
  const candidates = [];
  const seenScopes = new Set();

  const pushCandidate = (candidate) => {
    if (!candidate || typeof candidate.getItem !== 'function') {
      return;
    }
    candidates.push(candidate);
  };

  const readProperty = (scope, property, label) => {
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return null;
    }
    try {
      return scope[property];
    } catch (error) {
      if (label && !UI_CACHE_STORAGE_ACCESS_WARNINGS.has(label)) {
        UI_CACHE_STORAGE_ACCESS_WARNINGS.add(label);
        console.warn(`Unable to access ${label} while clearing UI caches`, error);
      }
      return null;
    }
  };

  const inspectScope = (scope, label) => {
    if (!scope || seenScopes.has(scope)) {
      return;
    }
    seenScopes.add(scope);

    pushCandidate(readProperty(scope, 'SAFE_LOCAL_STORAGE', `${label}.SAFE_LOCAL_STORAGE`));
    pushCandidate(readProperty(scope, 'localStorage', `${label}.localStorage`));
    pushCandidate(readProperty(scope, 'sessionStorage', `${label}.sessionStorage`));

    const nested = readProperty(scope, '__cineGlobal', `${label}.__cineGlobal`);
    if (nested && nested !== scope) {
      inspectScope(nested, `${label}.__cineGlobal`);
    }
  };

  inspectScope(typeof globalThis !== 'undefined' ? globalThis : null, 'globalThis');
  inspectScope(typeof window !== 'undefined' ? window : null, 'window');
  inspectScope(typeof self !== 'undefined' ? self : null, 'self');
  inspectScope(typeof global !== 'undefined' ? global : null, 'global');
  if (typeof __cineGlobal !== 'undefined') {
    inspectScope(__cineGlobal, '__cineGlobal');
  }

  if (safeLocalStorageInfo && safeLocalStorageInfo.storage) {
    pushCandidate(safeLocalStorageInfo.storage);
  }

  if (typeof SAFE_LOCAL_STORAGE !== 'undefined' && SAFE_LOCAL_STORAGE) {
    pushCandidate(SAFE_LOCAL_STORAGE);
  }

  try {
    pushCandidate(getSafeLocalStorage());
  } catch (error) {
    if (!UI_CACHE_STORAGE_ACCESS_WARNINGS.has('getSafeLocalStorage')) {
      UI_CACHE_STORAGE_ACCESS_WARNINGS.add('getSafeLocalStorage');
      console.warn('Unable to access safe local storage while clearing UI caches', error);
    }
  }

  pushCandidate(getWindowStorage('localStorage'));
  pushCandidate(getWindowStorage('sessionStorage'));

  if (typeof localStorage !== 'undefined') {
    pushCandidate(localStorage);
  }

  if (typeof sessionStorage !== 'undefined') {
    pushCandidate(sessionStorage);
  }

  return collectUniqueStorages(candidates);
}

function clearUiCacheStorageEntries() {
  const storages = collectUiCacheStorages();
  if (!storages.length) {
    return;
  }

  UI_CACHE_STORAGE_KEYS.forEach((key) => {
    if (typeof key !== 'string' || !key) {
      return;
    }

    storages.forEach((storage) => {
      deleteFromStorage(storage, key, `Failed to clear UI cache entry ${key}`);
    });
  });
}

function loadFlagFromStorage(storage, key, errorMessage) {
  if (!storage) return false;
  try {
    return storage.getItem(key) === '1';
  } catch (e) {
    console.error(errorMessage, e);
    downgradeSafeLocalStorageToMemory('read access', e, storage);
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
    downgradeSafeLocalStorageToMemory('write access', e, storage);
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

function normalizeDiagramPositions(positions) {
  if (!positions || typeof positions !== 'object') {
    return {};
  }
  const normalized = {};
  Object.keys(positions).forEach((key) => {
    const value = positions[key];
    if (!value || typeof value !== 'object') {
      return;
    }
    const x = Number(value.x);
    const y = Number(value.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return;
    }
    normalized[key] = { x, y };
  });
  return normalized;
}

function diagramPositionsEqual(a, b) {
  const keysA = Object.keys(a || {});
  const keysB = Object.keys(b || {});
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i += 1) {
    const key = keysA[i];
    if (!Object.prototype.hasOwnProperty.call(b || {}, key)) {
      return false;
    }
    const valueA = a[key];
    const valueB = b[key];
    if (!valueA || typeof valueA !== 'object' || !valueB || typeof valueB !== 'object') {
      return false;
    }
    if (Number(valueA.x) !== valueB.x || Number(valueA.y) !== valueB.y) {
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

  if (Object.prototype.hasOwnProperty.call(state, 'autoGearHighlight')) {
    const value = state.autoGearHighlight;
    const normalized = value === true || value === 'true' || value === 1 || value === '1';
    if (value !== normalized || typeof value !== 'boolean') {
      state.autoGearHighlight = normalized;
      changed = true;
    }
  }

  if (Object.prototype.hasOwnProperty.call(state, 'diagramPositions')) {
    const normalizedPositions = normalizeDiagramPositions(state.diagramPositions);
    if (Object.keys(normalizedPositions).length === 0) {
      delete state.diagramPositions;
      changed = true;
    } else if (!diagramPositionsEqual(state.diagramPositions, normalizedPositions)) {
      state.diagramPositions = normalizedPositions;
      changed = true;
    }
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

  ensurePreWriteMigrationBackup(safeStorage, SESSION_STATE_KEY);
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
    return;
  }

  if (!isPlainObject(deviceData)) {
    console.warn('Ignoring invalid device data payload. Expected a plain object.');
    return;
  }

  ensurePreWriteMigrationBackup(safeStorage, DEVICE_STORAGE_KEY);
  saveJSONToStorage(
    safeStorage,
    DEVICE_STORAGE_KEY,
    deviceData,
    "Error saving device data to localStorage:",
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
  ensurePreWriteMigrationBackup(safeStorage, SETUP_STORAGE_KEY);
  saveJSONToStorage(
    safeStorage,
    SETUP_STORAGE_KEY,
    normalizedSetups,
    "Error saving setups to localStorage:",
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
    const existing = setups[oldName];
    const wasAutoBackup = typeof oldName === 'string'
      && oldName.startsWith(STORAGE_AUTO_BACKUP_NAME_PREFIX);
    if (wasAutoBackup && isPlainObject(existing)) {
      existing[AUTO_BACKUP_MANUAL_RENAME_FLAG] = true;
    }
    setups[target] = existing;
    delete setups[oldName];
    return { result: target, changed: true };
  });
}

// --- Project Storage ---
const REQUIREMENT_FIELDS_KEEP_NEWLINES = new Set(['prepDays', 'shootingDays', 'crew']);

const LEGACY_PROJECT_FIELD_LABELS = {
  productionCompany: [
    'Production Company',
    'Produktionsfirma',
    'Société de production',
    'Productora',
    'Casa di produzione',
  ],
  rentalHouse: ['Rental House', 'Verleih', 'Location', 'Rental', 'Rental'],
  crew: ['Crew', 'Team', 'Équipe', 'Equipo', 'Troupe'],
  prepDays: [
    'Prep Days',
    'Prep-Tage',
    'Jours de préparation',
    'Días de preparación',
    'Giorni di preparazione',
  ],
  shootingDays: [
    'Shooting Days',
    'Drehtage',
    'Jours de tournage',
    'Días de rodaje',
    'Giorni di riprese',
  ],
  deliveryResolution: [
    'Delivery Resolution',
    'Auslieferungsauflösung',
    'Résolution de livraison',
    'Resolución de entrega',
    'Risoluzione di consegna',
  ],
  recordingResolution: [
    'Recording Resolution',
    'Aufnahmeauflösung',
    'Résolution d’enregistrement',
    'Resolución de grabación',
    'Risoluzione di registrazione',
  ],
  aspectRatio: [
    'Aspect Ratio',
    'Seitenverhältnis',
    "Format d’image",
    'Relación de aspecto',
    'Formato',
  ],
  codec: ['Codec', 'Codec', 'Codec', 'Códec', 'Codec'],
  baseFrameRate: [
    'Base Frame Rate',
    'Basis-Framerate',
    'Cadence de base',
    'Velocidad base',
    'Frame rate base',
  ],
  sensorMode: [
    'Sensor Mode',
    'Sensormodus',
    'Mode capteur',
    'Modo de sensor',
    'Modalità sensore',
  ],
  lenses: ['Lenses', 'Objektive', 'Optiques', 'Ópticas', 'Obiettivi'],
  requiredScenarios: [
    'Required Scenarios',
    'Anforderungen',
    'Scénarios requis',
    'Escenarios requeridos',
    'Scenari richiesti',
  ],
  cameraHandle: [
    'Camera Handle',
    'Kamera-Handgriff',
    'Poignée caméra',
    'Empuñadura de cámara',
    'Maniglia camera',
  ],
  viewfinderExtension: [
    'Viewfinder Extension',
    'Sucher-Verlängerung',
    'Extension viseur',
    'Extensión de visor',
    'Prolunga mirino',
  ],
  viewfinderEyeLeatherColor: [
    'Viewfinder Eye Leather Color',
    'Sucher-Augenmuschel-Farbe',
    "Couleur de l’œil du viseur",
    'Color del ocular del visor',
    'Colore gomma mirino',
  ],
  mattebox: ['Mattebox', 'Matte-Box', 'Matte box', 'Matte box', 'Matte box'],
  gimbal: [
    'Gimbal',
    'Gimbal-Stabilisator',
    'Stabilisateur gimbal',
    'Estabilizador gimbal',
    'Stabilizzatore gimbal',
  ],
  videoDistribution: [
    'Video Distribution',
    'Videoverteilung',
    'Distribution vidéo',
    'Distribución de vídeo',
    'Distribuzione video',
  ],
  monitoringSupport: [
    'Monitoring support',
    'Monitoring-Support',
    'Support de monitoring',
    'Soporte de monitorización',
    'Supporto monitoraggio',
  ],
  monitoringConfiguration: [
    'Monitoring configuration',
    'Monitoring-Konfiguration',
    'Configuration de monitoring',
    'Configuración de monitorización',
    'Configurazione monitoraggio',
  ],
  focusMonitor: [
    'Focus Monitor',
    'Fokusmonitor',
    'Moniteur focus',
    'Monitor de foco',
    'Monitor fuoco',
  ],
  monitorUserButtons: [
    'Onboard Monitor User Buttons',
    'Onboard-Monitor-Buttons',
    'Boutons personnalisés du moniteur',
    'Botones de usuario del monitor integrado',
    'Tasti monitor onboard',
  ],
  cameraUserButtons: [
    'Camera User Buttons',
    'Kamera-Buttons',
    'Boutons personnalisés caméra',
    'Botones de usuario de la cámara',
    'Tasti camera',
  ],
  viewfinderUserButtons: [
    'Viewfinder User Buttons',
    'Sucher-Buttons',
    'Boutons personnalisés viseur',
    'Botones de usuario del visor',
    'Tasti mirino',
  ],
  tripodHeadBrand: [
    'Tripod Head Brand',
    'Kopfmarke',
    'Marque de la tête',
    'Marca de la cabeza',
    'Marca della testa',
  ],
  tripodBowl: [
    'Tripod Bowl',
    'Schalentyp',
    'Type de bol',
    'Tipo de bowl',
    'Tipo di bowl',
  ],
  tripodTypes: [
    'Tripod Types',
    'Stativtypen',
    'Types de trépied',
    'Tipos de trípode',
    'Tipi di treppiede',
  ],
  tripodSpreader: [
    'Tripod Spreader',
    'Spreizer-Option',
    'Type de spreader',
    'Tipo de esparcidor',
    'Tipo di spreader',
  ],
  sliderBowl: [
    'Slider Bowl',
    'Slider-Schale',
    'Slider bowl',
    'Bowl del slider',
    'Slider bowl',
  ],
  easyrig: [
    'Further Stabilisation',
    'Weitere Stabilisierung',
    'Stabilisation complémentaire',
    'Estabilización adicional',
    'Stabilizzazione aggiuntiva',
  ],
};

const LEGACY_PROJECT_LABEL_FIELD_MAP = (() => {
  const map = new Map();
  const normalize = (label) => {
    if (typeof label !== 'string') return '';
    return label
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[:：]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .trim()
      .toLowerCase();
  };
  Object.entries(LEGACY_PROJECT_FIELD_LABELS).forEach(([field, labels]) => {
    labels.forEach((label) => {
      const normalized = normalize(label);
      if (normalized && !map.has(normalized)) {
        map.set(normalized, field);
      }
    });
  });
  return map;
})();

const HTML_ENTITY_MAP = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};

function decodeHtmlEntities(value) {
  if (typeof value !== 'string' || !value) {
    return '';
  }
  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity) => {
    if (!entity) return match;
    if (entity[0] === '#') {
      const code = entity[1] === 'x' || entity[1] === 'X'
        ? parseInt(entity.slice(2), 16)
        : parseInt(entity.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    const mapped = HTML_ENTITY_MAP[entity.toLowerCase()];
    return mapped !== undefined ? mapped : match;
  });
}

function stripHtmlTags(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/<[^>]*>/g, '');
}

function normalizeRequirementValueFromHtml(rawHtml, fieldName) {
  if (typeof rawHtml !== 'string') {
    return '';
  }
  const normalizedBreaks = rawHtml
    .replace(/<\s*br\s*\/?\s*>/gi, '\n')
    .replace(/<\/(p|div|li|ul|ol)>/gi, '\n')
    .replace(/<li[^>]*>/gi, '');
  const text = decodeHtmlEntities(stripHtmlTags(normalizedBreaks))
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');
  const parts = text
    .split('\n')
    .map((part) => part.replace(/\s+/g, ' ').trim())
    .filter((part) => part);
  if (!parts.length) {
    return '';
  }
  if (fieldName && REQUIREMENT_FIELDS_KEEP_NEWLINES.has(fieldName)) {
    return parts.join('\n');
  }
  return parts.join(', ');
}

function mapLegacyRequirementLabel(labelText) {
  if (typeof labelText !== 'string') {
    return '';
  }
  const normalized = labelText
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[:：]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .toLowerCase();
  if (!normalized) {
    return '';
  }
  return LEGACY_PROJECT_LABEL_FIELD_MAP.get(normalized) || '';
}

function extractProjectInfoFromHtml(html) {
  if (typeof html !== 'string') {
    return null;
  }
  const trimmed = html.trim();
  if (!trimmed) {
    return null;
  }
  const info = {};
  const gridOpenMatch = trimmed.match(/<div[^>]*class=["'][^"']*requirements-grid[^"']*["'][^>]*>/i);
  const gridStartIndex = gridOpenMatch ? gridOpenMatch.index : -1;
  if (gridStartIndex === -1) {
    const headingMatch = trimmed.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    if (headingMatch) {
      const title = decodeHtmlEntities(stripHtmlTags(headingMatch[1]));
      const projectName = title.replace(/[“”"']/g, '').trim();
      if (projectName) {
        info.projectName = projectName;
      }
    }
    return Object.keys(info).length ? info : null;
  }
  const gridHtml = trimmed.slice(gridStartIndex);
  const prefix = trimmed.slice(0, gridStartIndex);
  const headingMatch = prefix.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  if (headingMatch) {
    const title = decodeHtmlEntities(stripHtmlTags(headingMatch[1]));
    const projectName = title.replace(/[“”"']/g, '').trim();
    if (projectName && !/gear list/i.test(projectName)) {
      info.projectName = projectName;
    }
  }
  const boxRegex = /<div[^>]*class=["'][^"']*requirement-box[^"']*["'][^>]*>[\s\S]*?<\/div>/gi;
  let match;
  while ((match = boxRegex.exec(gridHtml))) {
    const boxHtml = match[0];
    const fieldMatch = boxHtml.match(/data-field=["']([^"']+)["']/i);
    const labelMatch = boxHtml.match(/<span[^>]*class=["'][^"']*req-label[^"']*["'][^>]*>([\s\S]*?)<\/span>/i);
    const valueMatch = boxHtml.match(/<span[^>]*class=["'][^"']*req-value[^"']*["'][^>]*>([\s\S]*?)<\/span>/i);
    const rawField = fieldMatch ? fieldMatch[1].trim() : '';
    const label = labelMatch ? decodeHtmlEntities(stripHtmlTags(labelMatch[1])) : '';
    const fieldName = rawField || mapLegacyRequirementLabel(label);
    if (!fieldName) {
      continue;
    }
    const rawValue = valueMatch ? valueMatch[1] : '';
    const normalizedValue = normalizeRequirementValueFromHtml(rawValue, fieldName);
    if (!normalizedValue) {
      continue;
    }
    if (!Object.prototype.hasOwnProperty.call(info, fieldName)) {
      info[fieldName] = normalizedValue;
    }
  }
  return Object.keys(info).length ? info : null;
}

function cloneProjectData(value) {
  if (Array.isArray(value)) {
    return value.map((item) => cloneProjectData(item));
  }
  if (isPlainObject(value)) {
    const clone = {};
    Object.entries(value).forEach(([key, val]) => {
      clone[key] = cloneProjectData(val);
    });
    return clone;
  }
  return value;
}

function cloneProjectInfo(projectInfo) {
  if (!isPlainObject(projectInfo)) {
    return null;
  }
  try {
    return JSON.parse(JSON.stringify(projectInfo));
  } catch (error) {
    console.warn('Unable to serialize project info during normalization', error);
    try {
      return cloneProjectData(projectInfo);
    } catch (fallbackError) {
      console.warn('Unable to deep clone project info during normalization', fallbackError);
      return { ...projectInfo };
    }
  }
}

function sanitizeImportedCrewEntries(entries) {
  if (!Array.isArray(entries)) {
    return [];
  }
  const sanitized = [];
  entries.forEach((entry) => {
    if (!isPlainObject(entry)) {
      const normalized = sanitizeImportedValue(entry);
      if (normalized !== null && normalized !== undefined) {
        sanitized.push(normalized);
      }
      return;
    }
    const result = {};
    const name = typeof entry.name === 'string' ? entry.name.trim() : '';
    if (name) {
      result.name = name;
    }
    const phone = typeof entry.phone === 'string' ? entry.phone.trim() : '';
    if (phone) {
      result.phone = phone;
    }
    const email = typeof entry.email === 'string' ? entry.email.trim() : '';
    if (email) {
      result.email = email;
    }
    const note = typeof entry.text === 'string' ? entry.text.trim() : '';
    if (note) {
      result.text = note;
    }
    const role = typeof entry.role === 'string' ? entry.role.trim() : '';
    if (role) {
      result.role = role;
    }
    if (Object.keys(result).length) {
      sanitized.push(result);
    }
  });
  return sanitized;
}

function sanitizeImportedValue(value) {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  }
  if (typeof value === 'number') {
    return Number.isNaN(value) ? null : value;
  }
  if (typeof value === 'boolean') {
    return value ? true : null;
  }
  if (Array.isArray(value)) {
    const sanitized = value
      .map((item) => sanitizeImportedValue(item))
      .filter((item) => item !== null && item !== undefined && !(typeof item === 'string' && !item));
    return sanitized.length ? sanitized : null;
  }
  if (isPlainObject(value)) {
    return sanitizeImportedProjectInfo(value);
  }
  return null;
}

function sanitizeImportedProjectInfo(info) {
  if (!isPlainObject(info)) {
    return null;
  }
  const normalized = {};
  Object.entries(info).forEach(([key, raw]) => {
    if (raw === null || raw === undefined) {
      return;
    }
    if (key === 'people') {
      const crew = sanitizeImportedCrewEntries(raw);
      if (crew.length) {
        normalized.people = crew;
      }
      return;
    }
    const value = sanitizeImportedValue(raw);
    if (value !== null && value !== undefined) {
      normalized[key] = value;
    }
  });
  return Object.keys(normalized).length ? normalized : null;
}

function cloneAutoGearRules(rules) {
  if (!Array.isArray(rules) || !rules.length) {
    return null;
  }
  try {
    return JSON.parse(JSON.stringify(rules));
  } catch (error) {
    console.warn('Unable to serialize automatic gear rules during normalization', error);
    try {
      return cloneProjectData(rules);
    } catch (fallbackError) {
      console.warn('Unable to deep clone automatic gear rules during normalization', fallbackError);
      return rules.slice();
    }
  }
}

function cloneDiagramPositionsForStorage(positions) {
  if (!isPlainObject(positions) || !Object.keys(positions).length) {
    return {};
  }
  try {
    return JSON.parse(JSON.stringify(positions));
  } catch (error) {
    console.warn('Unable to serialize diagram positions during normalization', error);
    try {
      return cloneProjectData(positions);
    } catch (fallbackError) {
      console.warn('Unable to deep clone diagram positions during normalization', fallbackError);
      return { ...positions };
    }
  }
}

function cloneProjectGearSelectors(selectors) {
  if (!isPlainObject(selectors)) {
    return null;
  }
  const clone = {};
  Object.entries(selectors).forEach(([id, value]) => {
    if (typeof id !== 'string' || !id) {
      return;
    }
    if (Array.isArray(value)) {
      clone[id] = value.map((item) => (typeof item === 'string' ? item : String(item ?? '')));
    } else if (value === undefined || value === null) {
      clone[id] = '';
    } else {
      clone[id] = typeof value === 'string' ? value : String(value);
    }
  });
  return Object.keys(clone).length ? clone : null;
}

function normalizeProject(data) {
  let manualRenameFlagged = false;
  if (isPlainObject(data) && data[AUTO_BACKUP_MANUAL_RENAME_FLAG]) {
    manualRenameFlagged = true;
  } else if (
    isPlainObject(data)
    && isPlainObject(data.project)
    && data.project[AUTO_BACKUP_MANUAL_RENAME_FLAG]
  ) {
    manualRenameFlagged = true;
  }

  if (typeof data === "string") {
    const parsed = tryParseJSONLike(data);
    if (parsed.success) {
      const normalized = normalizeProject(parsed.parsed);
      if (normalized) {
        return applyManualAutoBackupRenameFlag(normalized, manualRenameFlagged);
      }
    }
    const fallback = { gearList: data, projectInfo: null };
    return applyManualAutoBackupRenameFlag(fallback, manualRenameFlagged);
  }
  if (isPlainObject(data)) {
    // New format { gearList, projectInfo }
    if (Object.prototype.hasOwnProperty.call(data, "gearList") || Object.prototype.hasOwnProperty.call(data, "projectInfo")) {
      let normalizedProjectInfo = isPlainObject(data.projectInfo)
        ? data.projectInfo
        : null;
      if (!normalizedProjectInfo && typeof data.projectInfo === "string") {
        const parsedInfo = tryParseJSONLike(data.projectInfo);
        if (parsedInfo.success && isPlainObject(parsedInfo.parsed)) {
          normalizedProjectInfo = parsedInfo.parsed;
        }
      }
      if (!normalizedProjectInfo && isPlainObject(data.project)) {
        if (isPlainObject(data.project.projectInfo)) {
          normalizedProjectInfo = data.project.projectInfo;
        } else if (typeof data.project.projectInfo === "string") {
          const parsedProjectInfo = tryParseJSONLike(data.project.projectInfo);
          if (parsedProjectInfo.success && isPlainObject(parsedProjectInfo.parsed)) {
            normalizedProjectInfo = parsedProjectInfo.parsed;
          }
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
      if (!normalizedAutoGearRules && isPlainObject(data.project)) {
        const nestedRules = data.project.autoGearRules;
        if (Array.isArray(nestedRules) && nestedRules.length) {
          normalizedAutoGearRules = nestedRules;
        } else if (typeof nestedRules === "string") {
          const parsedNestedRules = tryParseJSONLike(nestedRules);
          if (parsedNestedRules.success && Array.isArray(parsedNestedRules.parsed) && parsedNestedRules.parsed.length) {
            normalizedAutoGearRules = parsedNestedRules.parsed;
          }
        }
      }

      let gearListSource = data.gearList;
      if (
        (gearListSource === null
          || gearListSource === undefined
          || (typeof gearListSource === "string" && !gearListSource))
        && isPlainObject(data.project)
        && Object.prototype.hasOwnProperty.call(data.project, "gearList")
      ) {
        gearListSource = data.project.gearList;
      }

      let normalizedGearList =
        typeof gearListSource === "string" || (gearListSource && typeof gearListSource === "object")
          ? gearListSource
          : "";

      let normalizedGearSelectors = null;
      if (isPlainObject(data.gearSelectors)) {
        normalizedGearSelectors = cloneProjectGearSelectors(data.gearSelectors);
      } else if (typeof data.gearSelectors === "string") {
        const parsedSelectors = tryParseJSONLike(data.gearSelectors);
        if (parsedSelectors.success && isPlainObject(parsedSelectors.parsed)) {
          normalizedGearSelectors = cloneProjectGearSelectors(parsedSelectors.parsed);
        }
      }

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
            if (!normalizedGearSelectors && isPlainObject(nested.gearSelectors)) {
              normalizedGearSelectors = cloneProjectGearSelectors(nested.gearSelectors);
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

      if (normalizedProjectInfo) {
        normalizedProjectInfo = sanitizeImportedProjectInfo(normalizedProjectInfo) || null;
      }

      const normalized = {
        gearList: Array.isArray(normalizedGearList) || isPlainObject(normalizedGearList)
          ? cloneProjectData(normalizedGearList)
          : normalizedGearList,
        projectInfo: normalizedProjectInfo ? cloneProjectInfo(normalizedProjectInfo) : null,
      };
      let normalizedDiagramPositions = normalizeDiagramPositions(data.diagramPositions);
      if (
        Object.keys(normalizedDiagramPositions).length === 0
        && isPlainObject(data.project)
      ) {
        normalizedDiagramPositions = normalizeDiagramPositions(data.project.diagramPositions);
      }
      if (Object.keys(normalizedDiagramPositions).length) {
        normalized.diagramPositions = cloneDiagramPositionsForStorage(normalizedDiagramPositions);
      }
      const htmlSources = [];
      if (typeof data.projectHtml === 'string') {
        htmlSources.push(data.projectHtml);
      }
      if (isPlainObject(data.project) && typeof data.project.projectHtml === 'string') {
        htmlSources.push(data.project.projectHtml);
      }
      if (isPlainObject(normalizedGearList) && typeof normalizedGearList.projectHtml === 'string') {
        htmlSources.push(normalizedGearList.projectHtml);
      } else if (typeof normalizedGearList === 'string') {
        htmlSources.push(normalizedGearList);
      }
      if (!normalizedGearSelectors && isPlainObject(data.project) && isPlainObject(data.project.gearSelectors)) {
        normalizedGearSelectors = cloneProjectGearSelectors(data.project.gearSelectors);
      }
      if (!normalizedGearSelectors && isPlainObject(normalizedGearList) && isPlainObject(normalizedGearList.gearSelectors)) {
        normalizedGearSelectors = cloneProjectGearSelectors(normalizedGearList.gearSelectors);
      }
      if (!normalizedProjectInfo) {
        for (let i = 0; i < htmlSources.length; i += 1) {
          const recovered = extractProjectInfoFromHtml(htmlSources[i]);
          if (recovered) {
            normalized.projectInfo = cloneProjectInfo(recovered);
            break;
          }
        }
      } else if (htmlSources.length) {
        for (let i = 0; i < htmlSources.length; i += 1) {
          const recovered = extractProjectInfoFromHtml(htmlSources[i]);
          if (recovered) {
            const recoveredClone = cloneProjectInfo(recovered) || {};
            const normalizedClone = cloneProjectInfo(normalizedProjectInfo) || {};
            normalized.projectInfo = { ...recoveredClone, ...normalizedClone };
            break;
          }
        }
      }
      if (normalizedAutoGearRules && normalizedAutoGearRules.length) {
        normalized.autoGearRules = cloneAutoGearRules(normalizedAutoGearRules);
      }
      if (normalizedGearSelectors && Object.keys(normalizedGearSelectors).length) {
        normalized.gearSelectors = normalizedGearSelectors;
      }
      return applyManualAutoBackupRenameFlag(normalized, manualRenameFlagged);
    }
    // Legacy format { projectHtml, gearHtml }
    if (Object.prototype.hasOwnProperty.call(data, "projectHtml") || Object.prototype.hasOwnProperty.call(data, "gearHtml")) {
      const legacy = {
        gearList: { projectHtml: data.projectHtml || "", gearHtml: data.gearHtml || "" },
        projectInfo: null,
      };
      return applyManualAutoBackupRenameFlag(legacy, manualRenameFlagged);
    }

    if (isPlainObject(data.project)) {
      const nested = normalizeProject(data.project);
      if (nested) {
        return applyManualAutoBackupRenameFlag(nested, manualRenameFlagged);
      }
    } else if (typeof data.project === "string") {
      const parsedProject = tryParseJSONLike(data.project);
      if (parsedProject.success) {
        const nested = normalizeProject(parsedProject.parsed);
        if (nested) {
          return applyManualAutoBackupRenameFlag(nested, manualRenameFlagged);
        }
      }
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

const NORMALIZED_PROJECT_KEYS = new Set([
  "gearList",
  "projectInfo",
  "autoGearRules",
  "diagramPositions",
  "gearSelectors",
  AUTO_BACKUP_MANUAL_RENAME_FLAG,
]);

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
    if (!Array.isArray(entry.autoGearRules) || !entry.autoGearRules.length) {
      return false;
    }
  }
  if (
    Object.prototype.hasOwnProperty.call(entry, "diagramPositions")
    && !isPlainObject(entry.diagramPositions)
  ) {
    return false;
  }
  if (
    Object.prototype.hasOwnProperty.call(entry, "gearSelectors")
    && !isPlainObject(entry.gearSelectors)
  ) {
    return false;
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

function persistAllProjects(projects) {
  const safeStorage = getSafeLocalStorage();
  enforceAutoBackupLimits(projects);
  ensurePreWriteMigrationBackup(safeStorage, PROJECT_STORAGE_KEY);
  saveJSONToStorage(
    safeStorage,
    PROJECT_STORAGE_KEY,
    projects,
    "Error saving project to localStorage:",
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
    ? `${STORAGE_AUTO_BACKUP_DELETION_PREFIX}${timestamp}-${sanitizedName}`
    : `${STORAGE_AUTO_BACKUP_DELETION_PREFIX}${timestamp}`;
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
  if (typeof key === 'string' && key.startsWith(STORAGE_AUTO_BACKUP_NAME_PREFIX)) {
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
  persistAllProjects(projects);
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

  ensurePreWriteMigrationBackup(safeStorage, FAVORITES_STORAGE_KEY);
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

  ensurePreWriteMigrationBackup(safeStorage, FEEDBACK_STORAGE_KEY);
  saveJSONToStorage(
    safeStorage,
    FEEDBACK_STORAGE_KEY,
    feedback,
    "Error saving feedback to localStorage:",
  );
}

function normalizeFullBackupHistoryEntry(entry) {
  if (!entry) {
    return null;
  }

  if (typeof entry === 'string') {
    const trimmed = entry.trim();
    return trimmed ? { createdAt: trimmed } : null;
  }

  if (typeof entry === 'object') {
    const createdAt = typeof entry.createdAt === 'string' && entry.createdAt.trim()
      ? entry.createdAt.trim()
      : typeof entry.iso === 'string' && entry.iso.trim()
        ? entry.iso.trim()
        : typeof entry.timestamp === 'string' && entry.timestamp.trim()
          ? entry.timestamp.trim()
          : null;
    if (!createdAt) {
      return null;
    }
    const normalized = { createdAt };
    if (typeof entry.fileName === 'string' && entry.fileName.trim()) {
      normalized.fileName = entry.fileName.trim();
    } else if (typeof entry.name === 'string' && entry.name.trim()) {
      normalized.fileName = entry.name.trim();
    }
    return normalized;
  }

  return null;
}

function loadFullBackupHistory() {
  applyLegacyStorageMigrations();
  const safeStorage = getSafeLocalStorage();
  const parsed = loadJSONFromStorage(
    safeStorage,
    FULL_BACKUP_HISTORY_STORAGE_KEY,
    "Error loading full backup history from localStorage:",
    [],
    { validate: (value) => value === null || Array.isArray(value) },
  );
  if (!Array.isArray(parsed)) {
    return [];
  }
  return parsed
    .map(normalizeFullBackupHistoryEntry)
    .filter(Boolean);
}

function saveFullBackupHistory(entries) {
  const safeEntries = Array.isArray(entries)
    ? entries
        .map(normalizeFullBackupHistoryEntry)
        .filter(Boolean)
    : [];
  const safeStorage = getSafeLocalStorage();
  if (!safeEntries.length) {
    deleteFromStorage(
      safeStorage,
      FULL_BACKUP_HISTORY_STORAGE_KEY,
      "Error deleting full backup history from localStorage:",
    );
    return;
  }
  ensurePreWriteMigrationBackup(safeStorage, FULL_BACKUP_HISTORY_STORAGE_KEY);
  saveJSONToStorage(
    safeStorage,
    FULL_BACKUP_HISTORY_STORAGE_KEY,
    safeEntries,
    "Error saving full backup history to localStorage:",
  );
}

const recordFullBackupHistoryEntry = entry => {
  const normalized = normalizeFullBackupHistoryEntry(entry);
  if (!normalized) {
    return loadFullBackupHistory();
  }
  const history = loadFullBackupHistory();
  history.push(normalized);
  const trimmed = history.slice(-MAX_FULL_BACKUP_HISTORY_ENTRIES);
  saveFullBackupHistory(trimmed);
  return trimmed;
};

function normalizeImportedFullBackupHistory(value) {
  if (value === null || value === undefined) {
    return [];
  }

  if (typeof value === 'string') {
    const parsed = tryParseJSONLike(value);
    if (parsed.success) {
      return normalizeImportedFullBackupHistory(parsed.parsed);
    }
    const entry = normalizeFullBackupHistoryEntry(value);
    return entry ? [entry] : [];
  }

  if (Array.isArray(value)) {
    return value
      .map(normalizeFullBackupHistoryEntry)
      .filter(Boolean);
  }

  if (isPlainObject(value)) {
    if (Array.isArray(value.history)) {
      return normalizeImportedFullBackupHistory(value.history);
    }
    if (Array.isArray(value.entries)) {
      return normalizeImportedFullBackupHistory(value.entries);
    }
    if (Array.isArray(value.list)) {
      return normalizeImportedFullBackupHistory(value.list);
    }
    const entry = normalizeFullBackupHistoryEntry(value);
    if (entry) {
      return [entry];
    }
    const nestedValues = Object.values(value);
    if (nestedValues.length) {
      return normalizeImportedFullBackupHistory(nestedValues);
    }
  }

  return [];
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
  ensurePreWriteMigrationBackup(safeStorage, AUTO_GEAR_RULES_STORAGE_KEY);
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
  ensurePreWriteMigrationBackup(safeStorage, AUTO_GEAR_BACKUPS_STORAGE_KEY);
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
  ensurePreWriteMigrationBackup(safeStorage, AUTO_GEAR_PRESETS_STORAGE_KEY);
  saveJSONToStorage(
    safeStorage,
    AUTO_GEAR_PRESETS_STORAGE_KEY,
    safePresets,
    "Error saving automatic gear presets to localStorage:",
  );
}

function loadAutoGearMonitorDefaults() {
  applyLegacyStorageMigrations();
  const safeStorage = getSafeLocalStorage();
  const defaults = loadJSONFromStorage(
    safeStorage,
    AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY,
    "Error loading automatic gear monitor defaults from localStorage:",
    {},
    { validate: (value) => value === null || typeof value === 'object' },
  );
  return defaults && typeof defaults === 'object' ? defaults : {};
}

function saveAutoGearMonitorDefaults(defaults) {
  const safeDefaults = defaults && typeof defaults === 'object' ? defaults : {};
  const safeStorage = getSafeLocalStorage();
  ensurePreWriteMigrationBackup(safeStorage, AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY);
  saveJSONToStorage(
    safeStorage,
    AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY,
    safeDefaults,
    "Error saving automatic gear monitor defaults to localStorage:",
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
    downgradeSafeLocalStorageToMemory('read access', error, safeStorage);
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
    downgradeSafeLocalStorageToMemory('read access', error, safeStorage);
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
    downgradeSafeLocalStorageToMemory('write access', error, safeStorage);
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
    downgradeSafeLocalStorageToMemory('read access', error, safeStorage);
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
    downgradeSafeLocalStorageToMemory('read access', inspectionError, safeStorage);
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
    downgradeSafeLocalStorageToMemory('write access', error, safeStorage);
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

function clampAutoGearBackupRetention(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return getAutoGearBackupRetentionDefault();
  }
  const rounded = Math.round(numeric);
  if (!Number.isFinite(rounded)) {
    return getAutoGearBackupRetentionDefault();
  }
  if (rounded < AUTO_GEAR_BACKUP_RETENTION_MIN) {
    return AUTO_GEAR_BACKUP_RETENTION_MIN;
  }
  if (rounded > MAX_AUTO_BACKUPS) {
    return MAX_AUTO_BACKUPS;
  }
  return rounded;
}

function getAutoGearBackupRetentionDefault() {
  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.AUTO_GEAR_BACKUP_RETENTION_DEFAULT === 'number') {
    const candidate = GLOBAL_SCOPE.AUTO_GEAR_BACKUP_RETENTION_DEFAULT;
    if (Number.isFinite(candidate) && candidate >= AUTO_GEAR_BACKUP_RETENTION_MIN) {
      return Math.min(Math.max(Math.round(candidate), AUTO_GEAR_BACKUP_RETENTION_MIN), MAX_AUTO_BACKUPS);
    }
  }
  return AUTO_GEAR_BACKUP_RETENTION_DEFAULT_VALUE;
}

function normalizeAutoGearBackupRetentionValue(value, fallback = getAutoGearBackupRetentionDefault()) {
  if (value === null || value === undefined) {
    return fallback;
  }
  if (typeof value === 'number') {
    return clampAutoGearBackupRetention(value);
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) {
      return fallback;
    }
    const parsed = Number(trimmed);
    if (Number.isFinite(parsed)) {
      return clampAutoGearBackupRetention(parsed);
    }
    const maybeJson = tryParseJSONLike(trimmed);
    if (maybeJson && maybeJson.success) {
      return normalizeAutoGearBackupRetentionValue(maybeJson.parsed, fallback);
    }
    return fallback;
  }
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      const candidate = normalizeAutoGearBackupRetentionValue(value[index], null);
      if (typeof candidate === 'number' && Number.isFinite(candidate)) {
        return clampAutoGearBackupRetention(candidate);
      }
    }
    return fallback;
  }
  if (isPlainObject(value)) {
    const candidateKeys = ['value', 'retention', 'limit', 'count'];
    for (let i = 0; i < candidateKeys.length; i += 1) {
      const key = candidateKeys[i];
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        continue;
      }
      const candidate = normalizeAutoGearBackupRetentionValue(value[key], null);
      if (typeof candidate === 'number' && Number.isFinite(candidate)) {
        return clampAutoGearBackupRetention(candidate);
      }
    }
    return fallback;
  }
  return fallback;
}

function loadAutoGearBackupRetention() {
  applyLegacyStorageMigrations();
  const safeStorage = getSafeLocalStorage();
  const retention = loadJSONFromStorage(
    safeStorage,
    AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY,
    "Error loading automatic gear backup retention from localStorage:",
    getAutoGearBackupRetentionDefault(),
    {
      validate: (value) =>
        value === null
        || typeof value === 'number'
        || typeof value === 'string'
        || Array.isArray(value)
        || isPlainObject(value),
    },
  );
  return normalizeAutoGearBackupRetentionValue(retention);
}

function saveAutoGearBackupRetention(retention) {
  const safeStorage = getSafeLocalStorage();
  const normalized = normalizeAutoGearBackupRetentionValue(retention);
  ensurePreWriteMigrationBackup(safeStorage, AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY);
  saveJSONToStorage(
    safeStorage,
    AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY,
    normalized,
    "Error saving automatic gear backup retention to localStorage:",
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
  deleteFromStorage(safeStorage, AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY, msg);
  deleteFromStorage(safeStorage, AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY, msg);
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
            downgradeSafeLocalStorageToMemory('read access', backupError, storage);
          }
        }
        return null;
      }
      return String(value);
    } catch (error) {
      console.warn('Unable to read storage key for backup', key, error);
      downgradeSafeLocalStorageToMemory('read access', error, storage);
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

    const temperatureUnit = readLocalStorageValue(TEMPERATURE_UNIT_STORAGE_KEY_NAME);
    if (temperatureUnit) {
      preferences.temperatureUnit = temperatureUnit;
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
      autoGearMonitorDefaults: loadAutoGearMonitorDefaults(),
      autoGearActivePresetId: loadAutoGearActivePresetId(),
      autoGearAutoPresetId: loadAutoGearAutoPresetId(),
      autoGearShowBackups: loadAutoGearBackupVisibility(),
      autoGearBackupRetention: loadAutoGearBackupRetention(),
      fullBackupHistory: loadFullBackupHistory(),
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

    const schemaCache = readLocalStorageValue(DEVICE_SCHEMA_CACHE_KEY);
    if (schemaCache !== null && schemaCache !== undefined) {
      payload.schemaCache = schemaCache;
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
            downgradeSafeLocalStorageToMemory('deletion', backupError, storage);
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
            downgradeSafeLocalStorageToMemory('write access', backupError, storage);
            alertStorageError();
          }
        }
      }
    } catch (error) {
      console.warn('Unable to persist storage key during import', key, error);
      downgradeSafeLocalStorageToMemory('write access', error, storage);
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

function normalizeImportedAutoGearBackupRetention(value) {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === 'number') {
    return clampAutoGearBackupRetention(value);
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) {
      return null;
    }
    const direct = Number(trimmed);
    if (Number.isFinite(direct)) {
      return clampAutoGearBackupRetention(direct);
    }
    const parsed = tryParseJSONLike(trimmed);
    if (parsed && parsed.success) {
      return normalizeImportedAutoGearBackupRetention(parsed.parsed);
    }
    return null;
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i += 1) {
      const candidate = normalizeImportedAutoGearBackupRetention(value[i]);
      if (typeof candidate === 'number') {
        return candidate;
      }
    }
    return null;
  }
  if (isPlainObject(value)) {
    const candidateKeys = ['value', 'retention', 'limit', 'count'];
    for (let i = 0; i < candidateKeys.length; i += 1) {
      const key = candidateKeys[i];
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        continue;
      }
      const candidate = normalizeImportedAutoGearBackupRetention(value[key]);
      if (typeof candidate === 'number') {
        return candidate;
      }
    }
    return null;
  }
  if (typeof value === 'boolean') {
    return value ? AUTO_GEAR_BACKUP_RETENTION_MIN : null;
  }
  return null;
}

function normalizeImportedAutoGearPresets(value) {
  return normalizeImportedArray(
    value,
    ["presets", "entries", "items", "list", "values", "data"],
    (entry) => entry !== null && typeof entry === "object",
  );
}

function normalizeImportedAutoGearMonitorDefaults(value) {
  if (!value || typeof value !== 'object') {
    return {};
  }
  const normalized = {};
  Object.entries(value).forEach(([key, val]) => {
    if (typeof val !== 'string') return;
    const trimmed = val.trim();
    if (!trimmed) return;
    normalized[key] = trimmed;
  });
  return normalized;
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
      if (parsed && typeof parsed === 'object') {
        if (
          parsed.compression === MIGRATION_BACKUP_COMPRESSION_ALGORITHM
          && parsed.encoding === MIGRATION_BACKUP_COMPRESSION_ENCODING
          && typeof parsed.data === 'string'
        ) {
          if (canUseMigrationBackupCompression()) {
            try {
              const decompressed = LZString.decompressFromUTF16(parsed.data);
              if (typeof decompressed === 'string' && decompressed) {
                const decoded = JSON.parse(decompressed);
                if (decoded && typeof decoded === 'object' && Object.prototype.hasOwnProperty.call(decoded, 'data')) {
                  raw = decoded.data;
                } else {
                  raw = null;
                }
              } else {
                raw = null;
              }
            } catch (decompressionError) {
              console.warn('Unable to decompress migration backup entry during import', entry && entry.key, decompressionError);
              raw = null;
            }
          } else {
            console.warn('Compression support is unavailable while reading migration backup entry', entry && entry.key);
            raw = null;
          }
        } else if (Object.prototype.hasOwnProperty.call(parsed, 'data')) {
          raw = parsed.data;
        } else {
          raw = null;
        }
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

  const exportStructureKeys = [
    'devices',
    'setups',
    'session',
    'feedback',
    'favorites',
    'preferences',
    'project',
    'projects',
    'autoGearRules',
    'autoGearBackups',
    'autoGearPresets',
    'autoGearMonitorDefaults',
    'autoGearSeeded',
    'autoGearActivePresetId',
    'autoGearAutoPresetId',
    'autoGearBackupRetention',
    'autoGearShowBackups',
    'fullBackupHistory',
    'fullBackups',
  ];

  const resemblesExportPayload = exportStructureKeys.some((key) =>
    Object.prototype.hasOwnProperty.call(snapshot, key),
  );

  if (resemblesExportPayload) {
    return null;
  }

  const data = {};
  let hasAssignments = false;
  let hasSnapshotKeys = false;

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

  const simpleSnapshotKeys = new Set([
    CUSTOM_LOGO_STORAGE_KEY,
    ...preferenceKeys,
  ]);

  const booleanPreferenceKeys = new Set([
    'darkMode',
    'pinkMode',
    'highContrast',
    'reduceMotion',
    'relaxedSpacing',
    'showAutoBackups',
    'iosPwaHelpShown',
  ]);

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
      return;
    }

    const normalizedKey = entry.key.replace(/(?:__backup|__legacyMigrationBackup)$/u, '');
    if (simpleSnapshotKeys.has(normalizedKey)) {
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
  assignJSONValue(AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY, 'autoGearMonitorDefaults');
  assignJSONValue(AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY, 'autoGearBackupRetention');

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

  const temperatureUnitEntry = readSnapshotEntry(snapshot, TEMPERATURE_UNIT_STORAGE_KEY_NAME);
  if (temperatureUnitEntry) {
    markSnapshotEntry(temperatureUnitEntry);
    const storedUnit = parseSnapshotStringValue(temperatureUnitEntry);
    if (typeof storedUnit === 'string') {
      const normalizedUnit = storedUnit.trim();
      if (normalizedUnit) {
        preferences.temperatureUnit = normalizedUnit;
        hasAssignments = true;
      }
    }
  }

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

    if (Object.prototype.hasOwnProperty.call(prefs, 'temperatureUnit')) {
      const unit = prefs.temperatureUnit;
      if (typeof unit === 'string') {
        const normalizedUnit = unit.trim();
        if (normalizedUnit) {
          safeSetLocalStorage(TEMPERATURE_UNIT_STORAGE_KEY_NAME, normalizedUnit);
        }
      } else if (unit === null) {
        safeSetLocalStorage(TEMPERATURE_UNIT_STORAGE_KEY_NAME, null);
      }
    }
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
      saveAutoGearSeedFlag(false);
    } else {
      saveAutoGearSeedFlag(flag);
    }
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearPresets')) {
    const presets = normalizeImportedAutoGearPresets(allData.autoGearPresets);
    saveAutoGearPresets(presets);
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearMonitorDefaults')) {
    const defaults = normalizeImportedAutoGearMonitorDefaults(allData.autoGearMonitorDefaults);
    saveAutoGearMonitorDefaults(defaults);
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
      saveAutoGearBackupVisibility(false);
    } else {
      saveAutoGearBackupVisibility(visibility);
    }
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearBackupRetention')) {
    const retention = normalizeImportedAutoGearBackupRetention(allData.autoGearBackupRetention);
    if (typeof retention === 'number' && Number.isFinite(retention)) {
      saveAutoGearBackupRetention(retention);
    }
  }

  if (Object.prototype.hasOwnProperty.call(allData, 'fullBackupHistory')) {
    const history = normalizeImportedFullBackupHistory(allData.fullBackupHistory);
    saveFullBackupHistory(history);
  } else if (Object.prototype.hasOwnProperty.call(allData, 'fullBackups')) {
    const history = normalizeImportedFullBackupHistory(allData.fullBackups);
    saveFullBackupHistory(history);
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

const STORAGE_API = {
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
  loadAutoGearMonitorDefaults,
  saveAutoGearMonitorDefaults,
  loadAutoGearActivePresetId,
  saveAutoGearActivePresetId,
  loadAutoGearAutoPresetId,
  saveAutoGearAutoPresetId,
  loadAutoGearBackupVisibility,
  saveAutoGearBackupVisibility,
  loadAutoGearBackupRetention,
  saveAutoGearBackupRetention,
  getAutoGearBackupRetentionDefault,
  loadFullBackupHistory,
  saveFullBackupHistory,
  recordFullBackupHistoryEntry,
  requestPersistentStorage,
  clearUiCacheStorageEntries,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = STORAGE_API;
}

if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
  Object.keys(STORAGE_API).forEach((key) => {
    const value = STORAGE_API[key];
    if (typeof value !== 'function') {
      return;
    }
    if (typeof GLOBAL_SCOPE[key] === 'function') {
      return;
    }
    try {
      GLOBAL_SCOPE[key] = value;
    } catch (assignmentError) {
      void assignmentError;
      try {
        Object.defineProperty(GLOBAL_SCOPE, key, {
          configurable: true,
          writable: true,
          value,
        });
      } catch (definitionError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn(`Unable to expose storage helper ${key} globally.`, definitionError);
        }
      }
    }
  });

  try {
    if (typeof GLOBAL_SCOPE.recordFullBackupHistoryEntry !== 'function') {
      GLOBAL_SCOPE.recordFullBackupHistoryEntry = recordFullBackupHistoryEntry;
    }
    if (typeof GLOBAL_SCOPE.loadFullBackupHistory !== 'function') {
      GLOBAL_SCOPE.loadFullBackupHistory = loadFullBackupHistory;
    }
  } catch (ex) {
    void ex;
  }
}
