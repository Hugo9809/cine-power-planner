// storage.js - Handles reading from and writing to localStorage.
/* global texts, currentLang, SAFE_LOCAL_STORAGE, __cineGlobal, LZString,
          applyMountVoltagePreferences, parseStoredMountVoltages,
          resetMountVoltagePreferences */
/* exported getMountVoltageStorageKeyName, getMountVoltageStorageBackupKeyName */

(function initializeStorageModule() {
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

  const FORCE_STORAGE_REINITIALIZE =
    typeof process !== 'undefined' &&
    process &&
    process.env &&
    (process.env.JEST_WORKER_ID || process.env.CINE_FORCE_STORAGE_REINIT);

  if (GLOBAL_SCOPE && GLOBAL_SCOPE.__cineStorageInitialized) {
    if (FORCE_STORAGE_REINITIALIZE) {
      try {
        delete GLOBAL_SCOPE.__cineStorageInitialized;
      } catch (resetInitFlagError) {
        GLOBAL_SCOPE.__cineStorageInitialized = false;
        void resetInitFlagError;
      }

      try {
        delete GLOBAL_SCOPE.__cineStorageApi;
      } catch (resetApiError) {
        GLOBAL_SCOPE.__cineStorageApi = null;
        void resetApiError;
      }
    } else {
      if (
        typeof module !== 'undefined' &&
        module.exports &&
        GLOBAL_SCOPE.__cineStorageApi &&
        typeof GLOBAL_SCOPE.__cineStorageApi === 'object'
      ) {
        module.exports = GLOBAL_SCOPE.__cineStorageApi;
      }
      return;
    }
  }

  if (GLOBAL_SCOPE) {
    try {
      Object.defineProperty(GLOBAL_SCOPE, '__cineStorageInitialized', {
        configurable: true,
        writable: true,
        value: true,
      });
    } catch (storageInitFlagError) {
      GLOBAL_SCOPE.__cineStorageInitialized = true;
      void storageInitFlagError;
    }
  }

  const STORAGE_DEEP_CLONE =
    GLOBAL_SCOPE && typeof GLOBAL_SCOPE.__cineDeepClone === 'function'
      ? GLOBAL_SCOPE.__cineDeepClone
      : function storageFallbackDeepClone(value) {
          if (value === null || typeof value !== 'object') {
            return value;
          }

          try {
            return JSON.parse(JSON.stringify(value));
          } catch (cloneError) {
            void cloneError;
          }

          return value;
        };

  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.__cineDeepClone !== 'function') {
    try {
      GLOBAL_SCOPE.__cineDeepClone = STORAGE_DEEP_CLONE;
    } catch (storageDeepCloneError) {
      void storageDeepCloneError;
    }
  }

var DEVICE_STORAGE_KEY = 'cameraPowerPlanner_devices';
var SETUP_STORAGE_KEY = 'cameraPowerPlanner_setups';
var SESSION_STATE_KEY = 'cameraPowerPlanner_session';
var FEEDBACK_STORAGE_KEY = 'cameraPowerPlanner_feedback';
var PROJECT_STORAGE_KEY = 'cameraPowerPlanner_project';
var FAVORITES_STORAGE_KEY = 'cameraPowerPlanner_favorites';
var DEVICE_SCHEMA_CACHE_KEY = 'cameraPowerPlanner_schemaCache';
var LEGACY_SCHEMA_CACHE_KEY = 'cinePowerPlanner_schemaCache';
var CUSTOM_FONT_STORAGE_KEY_DEFAULT = 'cameraPowerPlanner_customFonts';
var MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK = 'cameraPowerPlanner_mountVoltages';
var MOUNT_VOLTAGE_STORAGE_KEY_SYMBOL =
  typeof Symbol === 'function'
    ? Symbol.for('cinePowerPlanner.mountVoltageKey')
    : null;

var PROJECT_STORAGE_READ_CACHE = null;

var STORAGE_CACHE_SYMBOL =
  typeof Symbol === 'function'
    ? Symbol.for('cinePowerPlanner.storageCache')
    : '__cineStorageStateCache';

var STORAGE_STATE_CACHE_WEAKMAP =
  typeof WeakMap === 'function' && typeof Map === 'function'
    ? new WeakMap()
    : null;

var COMPRESSION_STRATEGY_CACHE =
  typeof Map === 'function'
    ? new Map()
    : null;
var COMPRESSION_STRATEGY_CACHE_KEYS = [];
var COMPRESSION_STRATEGY_CACHE_LIMIT = 6;

function getCompressionStrategyCacheKey(variants) {
  if (!Array.isArray(variants) || !variants.length) {
    return null;
  }

  var segments = [];
  for (var i = 0; i < variants.length; i += 1) {
    var variant = variants[i] || {};
    var name = typeof variant.variant === 'string' ? variant.variant : '';
    var compressName = typeof variant.compress === 'string' ? variant.compress : '';
    var decompressName = typeof variant.decompress === 'string' ? variant.decompress : '';
    segments.push(name + ':' + compressName + ':' + decompressName);
  }

  return segments.join('|');
}

function readCompressionStrategyCache(cacheKey, lzReference) {
  if (!COMPRESSION_STRATEGY_CACHE || !cacheKey) {
    return null;
  }

  var cached;
  try {
    cached = COMPRESSION_STRATEGY_CACHE.get(cacheKey);
  } catch (cacheReadError) {
    cached = null;
    void cacheReadError;
  }

  if (!cached || cached.lz !== lzReference) {
    return null;
  }

  if (!Array.isArray(cached.strategies) || !cached.strategies.length) {
    return Array.isArray(cached.strategies) ? [] : null;
  }

  return cached.strategies.slice();
}

function pruneCompressionStrategyCache(cacheKey) {
  if (!COMPRESSION_STRATEGY_CACHE || !cacheKey) {
    return;
  }

  var existingIndex = COMPRESSION_STRATEGY_CACHE_KEYS.indexOf(cacheKey);
  if (existingIndex !== -1) {
    COMPRESSION_STRATEGY_CACHE_KEYS.splice(existingIndex, 1);
  }

  COMPRESSION_STRATEGY_CACHE_KEYS.push(cacheKey);

  while (COMPRESSION_STRATEGY_CACHE_KEYS.length > COMPRESSION_STRATEGY_CACHE_LIMIT) {
    var oldestKey = COMPRESSION_STRATEGY_CACHE_KEYS.shift();
    if (typeof COMPRESSION_STRATEGY_CACHE.delete === 'function') {
      try {
        COMPRESSION_STRATEGY_CACHE.delete(oldestKey);
      } catch (cacheDeleteError) {
        void cacheDeleteError;
      }
    }
  }
}

function writeCompressionStrategyCache(cacheKey, lzReference, strategies) {
  if (!COMPRESSION_STRATEGY_CACHE || !cacheKey) {
    return;
  }

  var payload = {
    lz: lzReference,
    strategies: Array.isArray(strategies) ? strategies.slice() : [],
  };

  try {
    COMPRESSION_STRATEGY_CACHE.set(cacheKey, payload);
    pruneCompressionStrategyCache(cacheKey);
  } catch (cacheStoreError) {
    void cacheStoreError;
  }
}

function getStorageStateCacheMap(storage, createIfMissing) {
  if (!storage || (typeof storage !== 'object' && typeof storage !== 'function')) {
    return null;
  }

  let existing = null;
  if (STORAGE_CACHE_SYMBOL) {
    try {
      existing = storage[STORAGE_CACHE_SYMBOL];
    } catch (readError) {
      existing = null;
      void readError;
    }
  }

  if (!existing && STORAGE_STATE_CACHE_WEAKMAP) {
    try {
      existing = STORAGE_STATE_CACHE_WEAKMAP.get(storage) || null;
    } catch (weakMapReadError) {
      existing = null;
      void weakMapReadError;
    }
  }

  if (existing || !createIfMissing) {
    return existing || null;
  }

  const map = new Map();
  let assigned = false;

  if (STORAGE_CACHE_SYMBOL) {
    try {
      Object.defineProperty(storage, STORAGE_CACHE_SYMBOL, {
        configurable: true,
        writable: true,
        value: map,
      });
      assigned = true;
    } catch (defineError) {
      void defineError;
      try {
        storage[STORAGE_CACHE_SYMBOL] = map;
        assigned = true;
      } catch (assignError) {
        assigned = false;
        void assignError;
      }
    }
  }

  if (!assigned && STORAGE_STATE_CACHE_WEAKMAP) {
    try {
      STORAGE_STATE_CACHE_WEAKMAP.set(storage, map);
      assigned = true;
    } catch (weakMapStoreError) {
      assigned = false;
      void weakMapStoreError;
    }
  }

  return assigned ? map : null;
}

function getCachedStorageEntry(storage, key) {
  const map = getStorageStateCacheMap(storage, false);
  if (!map || typeof key !== 'string' || !key) {
    return null;
  }
  return map.get(key) || null;
}

function clearCachedStorageEntry(storage, key) {
  const map = getStorageStateCacheMap(storage, false);
  if (!map || typeof key !== 'string' || !key) {
    return;
  }

  if (typeof map.delete === 'function') {
    map.delete(key);
  }

  if (map.size === 0) {
    if (STORAGE_CACHE_SYMBOL) {
      try {
        if (storage && (typeof storage === 'object' || typeof storage === 'function')) {
          if (Object.prototype.hasOwnProperty.call(storage, STORAGE_CACHE_SYMBOL)) {
            delete storage[STORAGE_CACHE_SYMBOL];
          }
        }
      } catch (clearError) {
        void clearError;
      }
    }
    if (STORAGE_STATE_CACHE_WEAKMAP) {
      try {
        STORAGE_STATE_CACHE_WEAKMAP.delete(storage);
      } catch (weakMapDeleteError) {
        void weakMapDeleteError;
      }
    }
  }
}

function cloneValueForCache(value) {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  try {
    return STORAGE_DEEP_CLONE(value);
  } catch (cloneError) {
    void cloneError;
  }

  return value;
}

function cloneCachedEntryValue(entry) {
  if (!entry) {
    return undefined;
  }

  const { value } = entry;
  if (value === null || typeof value !== 'object') {
    return value;
  }

  return cloneValueForCache(value);
}

function cloneLookupMap(source, options) {
  const map = new Map();
  if (!source || typeof source.forEach !== 'function') {
    return map;
  }

  const { freezeArray = false } = options || {};

  source.forEach((value, key) => {
    if (Array.isArray(value)) {
      const copy = value.slice();
      if (freezeArray) {
        try {
          Object.freeze(copy);
        } catch (freezeError) {
          void freezeError;
        }
      }
      map.set(key, copy);
    } else {
      map.set(key, value);
    }
  });

  return map;
}

function cloneProjectLookupSnapshotForReturn(lookup) {
  if (!lookup || typeof lookup !== 'object') {
    return { raw: new Map(), normalized: new Map() };
  }

  return {
    raw: cloneLookupMap(lookup.raw),
    normalized: cloneLookupMap(lookup.normalized),
  };
}

function captureProjectLookupSnapshotForCache(lookup) {
  if (!lookup || typeof lookup !== 'object') {
    return { raw: new Map(), normalized: new Map() };
  }

  return {
    raw: cloneLookupMap(lookup.raw),
    normalized: cloneLookupMap(lookup.normalized, { freezeArray: true }),
  };
}

function freezeProjectSnapshotProjects(projects) {
  if (!isPlainObject(projects)) {
    return {};
  }

  const frozen = {};
  const keys = Object.keys(projects);
  for (let index = 0; index < keys.length; index += 1) {
    const key = keys[index];
    const entry = projects[key];
    if (entry && typeof entry === 'object') {
      try {
        Object.freeze(entry);
      } catch (freezeError) {
        void freezeError;
      }
    }
    frozen[key] = entry;
  }

  try {
    Object.freeze(frozen);
  } catch (freezeRootError) {
    void freezeRootError;
  }

  return frozen;
}

function setProjectReadCacheSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') {
    PROJECT_STORAGE_READ_CACHE = null;
    return;
  }

  PROJECT_STORAGE_READ_CACHE = {
    projects: freezeProjectSnapshotProjects(snapshot.projects),
    changed: Boolean(snapshot.changed),
    originalValue: snapshot.originalValue,
    lookup: captureProjectLookupSnapshotForCache(snapshot.lookup),
    rawValue: snapshot.rawValue === undefined ? undefined : snapshot.rawValue,
  };
}

function getProjectReadCacheClone(options) {
  if (!PROJECT_STORAGE_READ_CACHE) {
    return null;
  }

  const safeStorage = getSafeLocalStorage();
  let currentRaw = null;
  if (safeStorage && typeof safeStorage.getItem === 'function') {
    try {
      currentRaw = safeStorage.getItem(PROJECT_STORAGE_KEY);
    } catch (storageReadError) {
      currentRaw = null;
      void storageReadError;
    }
  }

  if (
    PROJECT_STORAGE_READ_CACHE.rawValue !== undefined
    && PROJECT_STORAGE_READ_CACHE.rawValue !== currentRaw
  ) {
    PROJECT_STORAGE_READ_CACHE = null;
    return null;
  }

  const { forMutation = false } = options || {};
  const projects = forMutation
    ? STORAGE_DEEP_CLONE(PROJECT_STORAGE_READ_CACHE.projects)
    : PROJECT_STORAGE_READ_CACHE.projects;

  return {
    projects,
    changed: PROJECT_STORAGE_READ_CACHE.changed,
    originalValue: PROJECT_STORAGE_READ_CACHE.originalValue,
    lookup: cloneProjectLookupSnapshotForReturn(PROJECT_STORAGE_READ_CACHE.lookup),
  };
}

function invalidateProjectReadCache() {
  PROJECT_STORAGE_READ_CACHE = null;
}

function cacheStorageValue(storage, key, rawValue, normalizedValue, value) {
  if (typeof key !== 'string' || !key) {
    return;
  }

  if (!storage || (typeof storage !== 'object' && typeof storage !== 'function')) {
    return;
  }

  const map = getStorageStateCacheMap(storage, true);
  if (!map) {
    return;
  }

  const cachedValue = cloneValueForCache(value);
  const normalized = typeof normalizedValue === 'string' && normalizedValue
    ? normalizedValue
    : typeof rawValue === 'string' && rawValue
      ? rawValue
      : null;

  const cacheEntry = {
    raw: typeof rawValue === 'string' && rawValue ? rawValue : null,
    normalizedRaw: normalized,
    value: cachedValue,
  };

  map.set(key, cacheEntry);
}

function tryGetCachedStorageValue(storage, key, primaryRaw, rawStored) {
  const entry = getCachedStorageEntry(storage, key);
  if (!entry) {
    return { hit: false };
  }

  if (typeof rawStored === 'string' && rawStored) {
    if (entry.raw && entry.raw === rawStored) {
      return { hit: true, value: cloneCachedEntryValue(entry) };
    }
  }

  if (typeof primaryRaw === 'string' && primaryRaw) {
    if (entry.normalizedRaw && entry.normalizedRaw === primaryRaw) {
      return { hit: true, value: cloneCachedEntryValue(entry) };
    }
    if (entry.raw && entry.raw === primaryRaw) {
      return { hit: true, value: cloneCachedEntryValue(entry) };
    }
  }

  return { hit: false };
}

function readGlobalStringValue(scope, key) {
  if (!scope || typeof scope !== 'object') {
    return '';
  }

  var descriptor;
  try {
    descriptor = Object.getOwnPropertyDescriptor(scope, key);
  } catch (descriptorError) {
    descriptor = null;
    void descriptorError;
  }

  if (
    descriptor &&
    Object.prototype.hasOwnProperty.call(descriptor, 'value') &&
    typeof descriptor.value === 'string' &&
    descriptor.value
  ) {
    return descriptor.value;
  }

  var directValue;
  try {
    directValue = scope[key];
  } catch (readError) {
    directValue = '';
    void readError;
  }

  if (typeof directValue === 'string' && directValue) {
    return directValue;
  }

  if (key === 'MOUNT_VOLTAGE_STORAGE_KEY' && MOUNT_VOLTAGE_STORAGE_KEY_SYMBOL) {
    try {
      const symbolValue = scope[MOUNT_VOLTAGE_STORAGE_KEY_SYMBOL];
      if (typeof symbolValue === 'string' && symbolValue) {
        return symbolValue;
      }
    } catch (symbolReadError) {
      void symbolReadError;
    }
  }

  return '';
}

function exposeGlobalStringValue(scope, key, value) {
  if (!scope || typeof scope !== 'object') {
    return '';
  }

  if (key === 'MOUNT_VOLTAGE_STORAGE_KEY' && MOUNT_VOLTAGE_STORAGE_KEY_SYMBOL) {
    try {
      scope[MOUNT_VOLTAGE_STORAGE_KEY_SYMBOL] = value;
      const symbolAssigned = scope[MOUNT_VOLTAGE_STORAGE_KEY_SYMBOL];
      if (typeof symbolAssigned === 'string' && symbolAssigned) {
        return symbolAssigned;
      }
    } catch (symbolExposeError) {
      void symbolExposeError;
    }
  }

  var descriptor;
  try {
    descriptor = Object.getOwnPropertyDescriptor(scope, key);
  } catch (descriptorError) {
    descriptor = null;
    void descriptorError;
  }

  if (
    descriptor &&
    Object.prototype.hasOwnProperty.call(descriptor, 'value') &&
    typeof descriptor.value === 'string' &&
    descriptor.value
  ) {
    return descriptor.value;
  }

  if (descriptor && descriptor.configurable === false && descriptor.writable === false) {
    return '';
  }

  var assigned = '';

  try {
    scope[key] = value;
    assigned = scope[key];
  } catch (assignError) {
    assigned = '';
    void assignError;
  }

  if (typeof assigned === 'string' && assigned) {
    return assigned;
  }

  if (
    key === 'MOUNT_VOLTAGE_STORAGE_KEY' &&
    typeof console !== 'undefined' &&
    typeof console.warn === 'function'
  ) {
    console.warn(
      'Unable to expose mount voltage storage key globally. Using fallback only.'
    );
  }

  return '';
}

function resolveMountVoltageStorageKeyName() {
  if (!GLOBAL_SCOPE || typeof GLOBAL_SCOPE !== 'object') {
    return MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK;
  }

  var existing = readGlobalStringValue(GLOBAL_SCOPE, 'MOUNT_VOLTAGE_STORAGE_KEY');
  if (existing) {
    return existing;
  }

  var exposed = exposeGlobalStringValue(
    GLOBAL_SCOPE,
    'MOUNT_VOLTAGE_STORAGE_KEY',
    MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK
  );
  if (exposed) {
    return exposed;
  }

  return MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK;
}

var MOUNT_VOLTAGE_STORAGE_KEY_NAME = resolveMountVoltageStorageKeyName();

function refreshMountVoltageStorageKeyName() {
  const resolved = resolveMountVoltageStorageKeyName();
  if (resolved && resolved !== MOUNT_VOLTAGE_STORAGE_KEY_NAME) {
    MOUNT_VOLTAGE_STORAGE_KEY_NAME = resolved;
    if (GLOBAL_SCOPE) {
      exposeGlobalStringValue(
        GLOBAL_SCOPE,
        'MOUNT_VOLTAGE_STORAGE_KEY',
        resolved,
      );
    }
    if (typeof RAW_STORAGE_BACKUP_KEYS !== 'undefined' && RAW_STORAGE_BACKUP_KEYS && typeof RAW_STORAGE_BACKUP_KEYS.add === 'function') {
      RAW_STORAGE_BACKUP_KEYS.add(resolved);
      const variants = getStorageKeyVariants(resolved);
      for (let i = 0; i < variants.length; i += 1) {
        const variant = variants[i];
        if (typeof variant === 'string' && variant) {
          RAW_STORAGE_BACKUP_KEYS.add(variant);
        }
      }
    }
  }
  return MOUNT_VOLTAGE_STORAGE_KEY_NAME;
}

function getMountVoltageStorageKeyName() {
  return refreshMountVoltageStorageKeyName();
}

function getMountVoltageStorageBackupKeyName() {
  const key = refreshMountVoltageStorageKeyName();
  return key ? `${key}__backup` : `${MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK}__backup`;
}

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

var CUSTOM_LOGO_STORAGE_KEY = 'customLogo';
var TEMPERATURE_UNIT_STORAGE_KEY_DEFAULT = 'cameraPowerPlanner_temperatureUnit';

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

var TEMPERATURE_UNIT_STORAGE_KEY_NAME = resolveTemperatureUnitStorageKey();
var AUTO_GEAR_RULES_STORAGE_KEY = 'cameraPowerPlanner_autoGearRules';
var AUTO_GEAR_SEEDED_STORAGE_KEY = 'cameraPowerPlanner_autoGearSeeded';
var AUTO_GEAR_BACKUPS_STORAGE_KEY = 'cameraPowerPlanner_autoGearBackups';
var AUTO_GEAR_PRESETS_STORAGE_KEY = 'cameraPowerPlanner_autoGearPresets';
var AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY = 'cameraPowerPlanner_autoGearMonitorDefaults';
var AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY = 'cameraPowerPlanner_autoGearActivePreset';
var AUTO_GEAR_AUTO_PRESET_STORAGE_KEY = 'cameraPowerPlanner_autoGearAutoPreset';
var AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY = 'cameraPowerPlanner_autoGearShowBackups';
var AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY = 'cameraPowerPlanner_autoGearBackupRetention';
var FULL_BACKUP_HISTORY_STORAGE_KEY = 'cameraPowerPlanner_fullBackups';
var STORAGE_AUTO_BACKUP_NAME_PREFIX = 'auto-backup-';
var STORAGE_AUTO_BACKUP_DELETION_PREFIX = 'auto-backup-before-delete-';
var STORAGE_AUTO_BACKUP_RENAMED_FLAG = '__cineAutoBackupRenamed';
var AUTO_BACKUP_METADATA_PROPERTY = '__cineAutoBackupMetadata';
var AUTO_BACKUP_SNAPSHOT_PROPERTY = '__cineAutoBackupSnapshot';
var AUTO_BACKUP_SNAPSHOT_VERSION = 1;
var AUTO_BACKUP_PAYLOAD_COMPRESSION_FLAG = '__cineAutoBackupCompressedPayload';
var AUTO_BACKUP_PAYLOAD_COMPRESSION_MIN_LENGTH = 2048;

function isAutoBackupStorageKey(name) {
  return typeof name === 'string'
    && (name.startsWith(STORAGE_AUTO_BACKUP_NAME_PREFIX)
      || name.startsWith(STORAGE_AUTO_BACKUP_DELETION_PREFIX));
}

if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
  try {
    if (!Object.prototype.hasOwnProperty.call(GLOBAL_SCOPE, '__CINE_AUTO_BACKUP_RENAMED_FLAG')) {
      Object.defineProperty(GLOBAL_SCOPE, '__CINE_AUTO_BACKUP_RENAMED_FLAG', {
        configurable: true,
        writable: false,
        value: STORAGE_AUTO_BACKUP_RENAMED_FLAG,
      });
    }
  } catch (error) {
    void error;
    try {
      GLOBAL_SCOPE.__CINE_AUTO_BACKUP_RENAMED_FLAG = STORAGE_AUTO_BACKUP_RENAMED_FLAG;
    } catch (assignmentError) {
      void assignmentError;
    }
  }
}
var MAX_AUTO_BACKUPS = 240;
var MAX_DELETION_BACKUPS = 20;
var MAX_FULL_BACKUP_HISTORY_ENTRIES = 200;
var AUTO_GEAR_BACKUP_RETENTION_DEFAULT_VALUE = 12;
var AUTO_GEAR_BACKUP_RETENTION_MIN = 1;
var AUTO_GEAR_BACKUP_RETENTION_MAX = 120;

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

function cloneAutoBackupMetadata(metadata) {
  if (!metadata || typeof metadata !== 'object') {
    return null;
  }

  return {
    version: Number.isFinite(metadata.version) ? metadata.version : AUTO_BACKUP_SNAPSHOT_VERSION,
    snapshotType: metadata.snapshotType === 'delta' ? 'delta' : 'full',
    base: typeof metadata.base === 'string' ? metadata.base : null,
    sequence: Number.isFinite(metadata.sequence) ? metadata.sequence : (metadata.snapshotType === 'delta' ? 1 : 0),
    createdAt: typeof metadata.createdAt === 'string' ? metadata.createdAt : null,
    changedKeys: Array.isArray(metadata.changedKeys) ? metadata.changedKeys.slice() : [],
    removedKeys: Array.isArray(metadata.removedKeys) ? metadata.removedKeys.slice() : [],
  };
}

function defineAutoBackupMetadata(target, metadata) {
  if (!target || typeof target !== 'object') {
    return;
  }

  const clonedMetadata = cloneAutoBackupMetadata(metadata);

  try {
    Object.defineProperty(target, AUTO_BACKUP_METADATA_PROPERTY, {
      configurable: true,
      enumerable: false,
      writable: true,
      value: clonedMetadata,
    });
  } catch (error) {
    void error;
    try {
      target[AUTO_BACKUP_METADATA_PROPERTY] = clonedMetadata;
    } catch (assignmentError) {
      void assignmentError;
    }
  }
}

function getAutoBackupMetadata(value) {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const metadata = value[AUTO_BACKUP_METADATA_PROPERTY];
  if (!metadata || typeof metadata !== 'object') {
    return null;
  }

  return metadata;
}

function copyAutoBackupMetadata(source, target) {
  if (!target || typeof target !== 'object') {
    return;
  }

  const metadata = getAutoBackupMetadata(source);
  if (metadata) {
    defineAutoBackupMetadata(target, metadata);
  }
}

function cloneAutoBackupValue(value, options) {
  const opts = options || {};
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => cloneAutoBackupValue(item, opts));
  }

  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  const clone = {};
  Object.keys(value).forEach((key) => {
    clone[key] = cloneAutoBackupValue(value[key], opts);
  });

  if (!opts.stripMetadata) {
    const metadata = getAutoBackupMetadata(value);
    if (metadata) {
      defineAutoBackupMetadata(clone, metadata);
    }
  }

  return clone;
}

function cloneAutoBackupValueWithLegacyNormalization(value, options) {
  const cloned = cloneAutoBackupValue(value, options);
  const normalized = normalizeLegacyLongGopStructure(cloned);
  return normalized !== cloned ? normalized : cloned;
}

function isCompressedAutoBackupSnapshotPayload(payload) {
  if (!isPlainObject(payload)) {
    return false;
  }
  if (payload[AUTO_BACKUP_PAYLOAD_COMPRESSION_FLAG] !== true) {
    return false;
  }
  return typeof payload.data === 'string' && payload.data;
}

function prepareAutoBackupSnapshotPayloadForStorage(payload, contextName) {
  if (!payload || typeof payload !== 'object') {
    return { payload, compression: null, compressed: false };
  }

  let serialized;
  try {
    serialized = JSON.stringify(payload);
  } catch (error) {
    console.warn('Unable to serialize auto backup payload before compression', error);
    return { payload, compression: null, compressed: false };
  }

  if (typeof serialized !== 'string' || serialized.length < AUTO_BACKUP_PAYLOAD_COMPRESSION_MIN_LENGTH) {
    return { payload, compression: null, compressed: false };
  }

  const candidate = createCompressedJsonStorageCandidate(serialized);
  if (!candidate || typeof candidate.serialized !== 'string') {
    return { payload, compression: null, compressed: false };
  }

  const savings = candidate.originalLength - candidate.wrappedLength;
  const compressedPayload = {
    [AUTO_BACKUP_PAYLOAD_COMPRESSION_FLAG]: true,
    data: candidate.serialized,
    originalLength: candidate.originalLength,
    compressedLength: candidate.wrappedLength,
    compressionVariant: candidate.compressionVariant || null,
  };

  if (
    typeof console !== 'undefined'
    && typeof console.warn === 'function'
    && savings > 0
  ) {
    const label = typeof contextName === 'string' && contextName
      ? `"${contextName}"`
      : 'an automatic backup';
    const percent = candidate.originalLength > 0
      ? Math.round((savings / candidate.originalLength) * 100)
      : 0;
    console.warn(
      `Stored compressed payload for ${label} snapshot to reduce storage usage by ${savings} characters (${percent}%).`,
    );
  }

  return {
    payload: compressedPayload,
    compression: {
      originalLength: candidate.originalLength,
      compressedLength: candidate.wrappedLength,
      compressionVariant: candidate.compressionVariant || null,
    },
    compressed: true,
  };
}

function restoreAutoBackupSnapshotPayload(snapshot, contextName) {
  if (!snapshot || typeof snapshot !== 'object') {
    return { payload: snapshot, compressed: false };
  }

  const rawPayload = snapshot.payload;
  if (!isCompressedAutoBackupSnapshotPayload(rawPayload)) {
    return { payload: rawPayload, compressed: false };
  }

  const decoded = decodeCompressedJsonStorageValue(rawPayload.data);
  if (!decoded.success || typeof decoded.value !== 'string') {
    const details = decoded && decoded.error ? decoded.error : null;
    console.warn('Unable to decompress automatic backup payload.', contextName, details);
    throw new Error('Failed to decompress automatic backup payload');
  }

  try {
    const parsed = JSON.parse(decoded.value);
    return { payload: parsed, compressed: true };
  } catch (error) {
    console.warn('Unable to parse decompressed automatic backup payload.', contextName, error);
    throw error;
  }
}

function deriveAutoBackupCreatedAt(name, fallbackDate) {
  const info = parseAutoBackupKey(name);
  if (info && Number.isFinite(info.timestamp) && info.timestamp > 0) {
    try {
      return new Date(info.timestamp).toISOString();
    } catch (error) {
      void error;
    }
  }

  const sourceDate = fallbackDate instanceof Date ? fallbackDate : new Date();
  try {
    return sourceDate.toISOString();
  } catch (error) {
    void error;
    return new Date().toISOString();
  }
}

function expandAutoBackupEntries(container, options) {
  if (!isPlainObject(container)) {
    return container;
  }

  const result = {};
  const cache = new Map();
  const opts = options || {};
  const isAutoBackupKey = typeof opts.isAutoBackupKey === 'function'
    ? opts.isAutoBackupKey
    : isAutoBackupStorageKey;

  const resolve = (name, stack) => {
    if (cache.has(name)) {
      return cache.get(name);
    }

    const value = container[name];
    if (!isPlainObject(value)) {
      const clonedValue = cloneAutoBackupValue(value);
      cache.set(name, clonedValue);
      return clonedValue;
    }

    const snapshot = value[AUTO_BACKUP_SNAPSHOT_PROPERTY];
    if (snapshot && typeof snapshot === 'object') {
      if (stack.has(name)) {
        console.warn('Detected cyclic auto-backup reference while expanding snapshot', name);
        const fallback = {};
        cache.set(name, fallback);
        return fallback;
      }

      stack.add(name);

      const snapshotType = snapshot.snapshotType === 'delta' ? 'delta' : 'full';
      const baseName = snapshotType === 'delta' && typeof snapshot.base === 'string'
        ? snapshot.base
        : null;
      const baseValue = baseName ? cloneAutoBackupValue(resolve(baseName, stack)) : {};
      let payloadInfo;
      try {
        payloadInfo = restoreAutoBackupSnapshotPayload(snapshot, name);
      } catch (payloadError) {
        console.warn('Failed to restore automatic backup payload while expanding snapshot', name, payloadError);
        throw payloadError;
      }
      const payload = isPlainObject(payloadInfo.payload) ? payloadInfo.payload : {};
      const changedKeys = Array.isArray(snapshot.changedKeys) && snapshot.changedKeys.length
        ? snapshot.changedKeys
        : Object.keys(payload);
      const removedKeys = Array.isArray(snapshot.removedKeys) ? snapshot.removedKeys : [];

      const expanded = cloneAutoBackupValue(baseValue);

      changedKeys.forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(payload, key)) {
          expanded[key] = cloneAutoBackupValue(payload[key]);
        }
      });

      removedKeys.forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(expanded, key)) {
          delete expanded[key];
        }
      });

      const metadata = {
        version: Number.isFinite(snapshot.version) ? snapshot.version : AUTO_BACKUP_SNAPSHOT_VERSION,
        snapshotType,
        base: snapshotType === 'delta' ? baseName : null,
        sequence: Number.isFinite(snapshot.sequence)
          ? snapshot.sequence
          : (snapshotType === 'delta' ? 1 : 0),
        createdAt: typeof snapshot.createdAt === 'string'
          ? snapshot.createdAt
          : deriveAutoBackupCreatedAt(name),
        changedKeys: changedKeys.slice(),
        removedKeys: removedKeys.slice(),
      };

      defineAutoBackupMetadata(expanded, metadata);
      cache.set(name, expanded);
      stack.delete(name);
      return expanded;
    }

    const cloned = cloneAutoBackupValue(value);
    if (isAutoBackupKey(name)) {
      const metadata = {
        version: AUTO_BACKUP_SNAPSHOT_VERSION,
        snapshotType: 'full',
        base: null,
        sequence: 0,
        createdAt: deriveAutoBackupCreatedAt(name),
        changedKeys: Object.keys(cloned),
        removedKeys: [],
      };
      defineAutoBackupMetadata(cloned, metadata);
    }
    cache.set(name, cloned);
    return cloned;
  };

  Object.keys(container).forEach((name) => {
    if (!isAutoBackupKey(name)) {
      const value = container[name];
      result[name] = isPlainObject(value)
        ? cloneAutoBackupValue(value)
        : value;
      return;
    }

    result[name] = resolve(name, new Set());
  });

  return result;
}

function computeAutoBackupDiff(currentValue, baseValue) {
  const payload = {};
  const changedKeys = [];
  const removedKeys = [];

  const baseKeys = isPlainObject(baseValue) ? Object.keys(baseValue) : [];
  const currentKeys = isPlainObject(currentValue) ? Object.keys(currentValue) : [];
  const allKeys = new Set([...baseKeys, ...currentKeys]);

  allKeys.forEach((key) => {
    if (key === AUTO_BACKUP_METADATA_PROPERTY) {
      return;
    }

    const hasCurrent = Object.prototype.hasOwnProperty.call(currentValue || {}, key);
    const hasBase = Object.prototype.hasOwnProperty.call(baseValue || {}, key);

    if (!hasCurrent && hasBase) {
      removedKeys.push(key);
      return;
    }

    if (!hasCurrent) {
      return;
    }

    const currentEntry = currentValue ? currentValue[key] : undefined;
    const baseEntry = hasBase ? baseValue[key] : undefined;

    const currentSignature = createStableValueSignature(currentEntry);
    const baseSignature = createStableValueSignature(baseEntry);

    if (currentSignature !== baseSignature) {
      changedKeys.push(key);
      payload[key] = cloneAutoBackupValue(currentEntry, { stripMetadata: true });
    }
  });

  return { payload, changedKeys, removedKeys };
}

function serializeAutoBackupEntries(entries, options) {
  if (!isPlainObject(entries)) {
    return entries;
  }

  const opts = options || {};
  const isAutoBackupKey = typeof opts.isAutoBackupKey === 'function'
    ? opts.isAutoBackupKey
    : isAutoBackupStorageKey;

  const serialized = {};
  const entryNames = Object.keys(entries);

  entryNames.forEach((name) => {
    const value = entries[name];
    const normalizedValue = cloneAutoBackupValueWithLegacyNormalization(value, { stripMetadata: true });

    if (!isAutoBackupKey(name) || !isPlainObject(normalizedValue)) {
      serialized[name] = normalizedValue;
      return;
    }

    const metadata = getAutoBackupMetadata(value);
    const createdAt = metadata && typeof metadata.createdAt === 'string'
      ? metadata.createdAt
      : deriveAutoBackupCreatedAt(name);

    if (!metadata || metadata.snapshotType !== 'delta') {
      serialized[name] = {};
      const snapshot = {
        version: AUTO_BACKUP_SNAPSHOT_VERSION,
        snapshotType: 'full',
        base: null,
        sequence: 0,
        createdAt,
        changedKeys: Object.keys(normalizedValue || {}),
        removedKeys: [],
      };
      const prepared = prepareAutoBackupSnapshotPayloadForStorage(normalizedValue, name);
      snapshot.payload = prepared.payload;
      if (prepared.compression) {
        snapshot.payloadCompression = prepared.compression;
      }
      serialized[name][AUTO_BACKUP_SNAPSHOT_PROPERTY] = snapshot;
      return;
    }

    const baseName = typeof metadata.base === 'string' ? metadata.base : null;
    const baseValue = baseName && Object.prototype.hasOwnProperty.call(entries, baseName)
      ? entries[baseName]
      : null;

    if (!baseValue || !isPlainObject(baseValue)) {
      serialized[name] = {};
      const snapshot = {
        version: AUTO_BACKUP_SNAPSHOT_VERSION,
        snapshotType: 'full',
        base: null,
        sequence: 0,
        createdAt,
        changedKeys: Object.keys(normalizedValue || {}),
        removedKeys: [],
      };
      const prepared = prepareAutoBackupSnapshotPayloadForStorage(normalizedValue, name);
      snapshot.payload = prepared.payload;
      if (prepared.compression) {
        snapshot.payloadCompression = prepared.compression;
      }
      serialized[name][AUTO_BACKUP_SNAPSHOT_PROPERTY] = snapshot;
      return;
    }

    const normalizedBase = cloneAutoBackupValueWithLegacyNormalization(baseValue, { stripMetadata: true });
    const diff = computeAutoBackupDiff(normalizedValue, normalizedBase);

    serialized[name] = {};
    const snapshot = {
      version: Number.isFinite(metadata.version) ? metadata.version : AUTO_BACKUP_SNAPSHOT_VERSION,
      snapshotType: 'delta',
      base: baseName,
      sequence: Number.isFinite(metadata.sequence) ? metadata.sequence : 1,
      createdAt,
      changedKeys: diff.changedKeys,
      removedKeys: diff.removedKeys,
    };
    const prepared = prepareAutoBackupSnapshotPayloadForStorage(diff.payload, name);
    snapshot.payload = prepared.payload;
    if (prepared.compression) {
      snapshot.payloadCompression = prepared.compression;
    }
    serialized[name][AUTO_BACKUP_SNAPSHOT_PROPERTY] = snapshot;
  });

  return serialized;
}

function getStorageKeyVariants(key) {
  if (typeof key !== 'string' || !key) {
    return [key];
  }

  const variants = new Set([key]);

  if (key.startsWith('cameraPowerPlanner_')) {
    variants.add(`cinePowerPlanner_${key.slice('cameraPowerPlanner_'.length)}`);
  } else if (key.startsWith('cinePowerPlanner_')) {
    variants.add(`cameraPowerPlanner_${key.slice('cinePowerPlanner_'.length)}`);
  }

  return Array.from(variants);
}

var STORAGE_BACKUP_SUFFIX = '__backup';
var MAX_SAVE_ATTEMPTS = 3;
var MAX_QUOTA_RECOVERY_STEPS = 100;
var STORAGE_MIGRATION_BACKUP_SUFFIX = '__legacyMigrationBackup';
var RAW_STORAGE_BACKUP_KEYS = new Set([
  getCustomFontStorageKeyName(),
  CUSTOM_LOGO_STORAGE_KEY,
  DEVICE_SCHEMA_CACHE_KEY,
  MOUNT_VOLTAGE_STORAGE_KEY_NAME,
]);

Array.from(RAW_STORAGE_BACKUP_KEYS).forEach((key) => {
  getStorageKeyVariants(key).forEach((variant) => {
    if (typeof variant === 'string' && variant) {
      RAW_STORAGE_BACKUP_KEYS.add(variant);
    }
  });
});

var CRITICAL_BACKUP_KEY_PROVIDERS = [
  () => ({ key: DEVICE_STORAGE_KEY }),
  () => ({ key: SETUP_STORAGE_KEY }),
  () => ({ key: SESSION_STATE_KEY }),
  () => ({ key: FEEDBACK_STORAGE_KEY }),
  () => ({ key: PROJECT_STORAGE_KEY }),
  () => ({ key: FAVORITES_STORAGE_KEY }),
  () => ({ key: DEVICE_SCHEMA_CACHE_KEY }),
  () => ({ key: AUTO_GEAR_RULES_STORAGE_KEY }),
  () => ({ key: AUTO_GEAR_SEEDED_STORAGE_KEY }),
  () => ({ key: AUTO_GEAR_BACKUPS_STORAGE_KEY }),
  () => ({ key: AUTO_GEAR_PRESETS_STORAGE_KEY }),
  () => ({ key: AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY }),
  () => ({ key: AUTO_GEAR_AUTO_PRESET_STORAGE_KEY }),
  () => ({ key: AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY }),
  () => ({ key: AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY }),
  () => ({ key: AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY }),
  () => ({ key: FULL_BACKUP_HISTORY_STORAGE_KEY }),
  () => ({ key: CUSTOM_LOGO_STORAGE_KEY }),
  () => ({ key: getCustomFontStorageKeyName() }),
  () => ({ key: 'darkMode' }),
  () => ({ key: 'pinkMode' }),
  () => ({ key: 'highContrast' }),
  () => ({ key: 'reduceMotion' }),
  () => ({ key: 'relaxedSpacing' }),
  () => ({ key: 'showAutoBackups' }),
  () => ({ key: 'accentColor' }),
  () => ({ key: 'fontSize' }),
  () => ({ key: 'fontFamily' }),
  () => ({ key: 'language' }),
  () => ({ key: 'iosPwaHelpShown' }),
  () => ({ key: TEMPERATURE_UNIT_STORAGE_KEY_NAME }),
  () => ({ key: getMountVoltageStorageKeyName(), backupKey: getMountVoltageStorageBackupKeyName() }),
];

function createCriticalStorageEntry(candidate, options = {}) {
  if (!candidate || typeof candidate !== 'object') {
    return null;
  }

  const { key, backupKey, storage = null } = candidate;
  if (typeof key !== 'string' || !key) {
    return null;
  }

  const resolvedBackupKey = typeof backupKey === 'string' && backupKey
    ? backupKey
    : `${key}${STORAGE_BACKUP_SUFFIX}`;

  return {
    key,
    backupKey: resolvedBackupKey,
    storage,
    label: typeof options.label === 'string' ? options.label : key,
  };
}

function gatherCriticalStorageEntries(options = {}) {
  const entries = [];
  const seen = new Set();

  const pushEntry = (entry) => {
    if (!entry) {
      return;
    }

    const variants = getStorageKeyVariants(entry.key);
    const expectedBaseBackupKey = `${entry.key}${STORAGE_BACKUP_SUFFIX}`;

    for (let index = 0; index < variants.length; index += 1) {
      const variantKey = variants[index];
      if (typeof variantKey !== 'string' || !variantKey) {
        continue;
      }

      let resolvedBackupKey = entry.backupKey;
      if (variantKey !== entry.key) {
        if (entry.backupKey === expectedBaseBackupKey) {
          resolvedBackupKey = `${variantKey}${STORAGE_BACKUP_SUFFIX}`;
        }
      }

      const variantEntry = variantKey === entry.key
        ? entry
        : {
          ...entry,
          key: variantKey,
          backupKey: resolvedBackupKey,
        };

      const storageId = variantEntry.storage || null;
      const id = `${variantEntry.key}__${storageId ? String(storageId) : 'default'}`;
      if (seen.has(id)) {
        continue;
      }

      seen.add(id);
      entries.push(variantEntry);
    }
  };

  for (let i = 0; i < CRITICAL_BACKUP_KEY_PROVIDERS.length; i += 1) {
    const provider = CRITICAL_BACKUP_KEY_PROVIDERS[i];
    if (typeof provider !== 'function') {
      continue;
    }
    let result;
    try {
      result = provider(options);
    } catch (providerError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Critical storage key provider failed', providerError);
      }
      continue;
    }
    const entry = createCriticalStorageEntry(result, options);
    if (entry) {
      pushEntry(entry);
    }
  }

  return entries;
}

let lastCriticalStorageGuardResult = null;

function registerCriticalStorageGuardResult(result) {
  lastCriticalStorageGuardResult = result;
  if (!GLOBAL_SCOPE || typeof GLOBAL_SCOPE !== 'object') {
    return;
  }

  try {
    GLOBAL_SCOPE.__cineCriticalStorageGuard = result;
  } catch (exposeError) {
    void exposeError;
    try {
      Object.defineProperty(GLOBAL_SCOPE, '__cineCriticalStorageGuard', {
        configurable: true,
        writable: true,
        value: result,
      });
    } catch (definitionError) {
      void definitionError;
    }
  }
}

function ensureCriticalStorageBackups(options = {}) {
  let safeStorage = options && options.storage ? options.storage : null;
  if (!safeStorage) {
    try {
      safeStorage = getSafeLocalStorage();
    } catch (guardError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to resolve safe storage while ensuring backups', guardError);
      }
      safeStorage = null;
    }
  }

  const summary = {
    ensured: [],
    skipped: [],
    errors: [],
    timestamp: new Date().toISOString(),
    storageType: safeLocalStorageInfo && safeLocalStorageInfo.type ? safeLocalStorageInfo.type : 'unknown',
  };

  const entries = gatherCriticalStorageEntries(options);
  const targetStorage = safeStorage && typeof safeStorage.getItem === 'function'
    ? safeStorage
    : null;

  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    const storage = entry.storage && typeof entry.storage.getItem === 'function'
      ? entry.storage
      : targetStorage;

    if (!storage || typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function') {
      summary.skipped.push({ key: entry.key, reason: 'unavailable-storage' });
      continue;
    }

    let primaryValue;
    try {
      primaryValue = storage.getItem(entry.key);
    } catch (readError) {
      summary.errors.push({ key: entry.key, reason: 'read-failed', error: readError });
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn(`Critical storage guard could not inspect ${entry.key}`, readError);
      }
      continue;
    }

    if (primaryValue === null || primaryValue === undefined) {
      summary.skipped.push({ key: entry.key, reason: 'missing' });
      continue;
    }

    let backupValue;
    try {
      backupValue = storage.getItem(entry.backupKey);
    } catch (backupReadError) {
      summary.errors.push({ key: entry.key, reason: 'backup-read-failed', error: backupReadError });
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn(`Critical storage guard could not read backup for ${entry.key}`, backupReadError);
      }
      continue;
    }

    if (typeof backupValue === 'string') {
      summary.skipped.push({ key: entry.key, reason: 'exists' });
      continue;
    }

    const stringPrimaryValue = typeof primaryValue === 'string'
      ? primaryValue
      : primaryValue === null || primaryValue === undefined
        ? ''
        : String(primaryValue);

    const tryStoreBackup = (candidate) => {
      try {
        storage.setItem(entry.backupKey, candidate);
        return { success: true, error: null };
      } catch (error) {
        return { success: false, error };
      }
    };

    const recordError = (error, reason = 'backup-write-failed') => {
      summary.errors.push({ key: entry.key, reason, error });
      if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error(`Critical storage guard could not mirror ${entry.key}`, error);
      }
    };

    const shouldAttemptCompression = typeof stringPrimaryValue === 'string'
      && stringPrimaryValue
      && !stringPrimaryValue.includes(`"${STORAGE_COMPRESSION_FLAG_KEY}":true`);

    let candidateValue = stringPrimaryValue;
    let compressionInfo = null;
    let writeResult = tryStoreBackup(candidateValue);

    if (!writeResult.success && writeResult.error) {
      if (!isQuotaExceededError(writeResult.error)) {
        recordError(writeResult.error);
        continue;
      }

      if (shouldAttemptCompression) {
        const compressedCandidate = createCompressedJsonStorageCandidate(stringPrimaryValue);
        if (compressedCandidate && typeof compressedCandidate.serialized === 'string' && compressedCandidate.serialized) {
          candidateValue = compressedCandidate.serialized;
          compressionInfo = compressedCandidate;
          writeResult = tryStoreBackup(candidateValue);
        }
      }

      if (!writeResult.success && writeResult.error && isQuotaExceededError(writeResult.error)) {
        const skipKeys = [entry.key, entry.backupKey];
        const sweepResult = attemptStorageCompressionSweep(storage, { skipKeys });
        if (sweepResult && sweepResult.success) {
          writeResult = tryStoreBackup(candidateValue);
        }
      }

      if (!writeResult.success) {
        recordError(writeResult.error, isQuotaExceededError(writeResult.error) ? 'backup-quota-exceeded' : 'backup-write-failed');
        if (isQuotaExceededError(writeResult.error)) {
          alertStorageError('critical-backup-quota');
        }
        continue;
      }
    }

    summary.ensured.push({
      key: entry.key,
      backupKey: entry.backupKey,
      compressed: Boolean(compressionInfo),
    });

    if (
      compressionInfo
      && typeof console !== 'undefined'
      && typeof console.warn === 'function'
      && typeof compressionInfo.originalLength === 'number'
      && typeof compressionInfo.wrappedLength === 'number'
    ) {
      const savings = compressionInfo.originalLength - compressionInfo.wrappedLength;
      const percent = compressionInfo.originalLength > 0
        ? Math.round((savings / compressionInfo.originalLength) * 100)
        : 0;
      console.warn(
        `Stored compressed critical backup for ${entry.key}, reducing storage usage by ${savings} characters (${percent}%).`,
      );
    }
  }

  registerCriticalStorageGuardResult(summary);

    if (summary.ensured.length && typeof console !== 'undefined' && typeof console.info === 'function') {
      const mirroredDetails = summary.ensured.map((entry) => ({
        key: entry.key,
        backupKey: entry.backupKey,
      }));
      console.info('Critical storage guard mirrored backup copies', {
        count: summary.ensured.length,
        entries: mirroredDetails,
      });
    }

  if (summary.errors.length && typeof console !== 'undefined' && typeof console.warn === 'function') {
    console.warn('Critical storage guard encountered issues', summary.errors);
  }

  return summary;
}

function getLastCriticalStorageGuardResult() {
  return lastCriticalStorageGuardResult;
}

var MAX_MIGRATION_BACKUP_CLEANUP_STEPS = 10;
var MIGRATION_BACKUP_COMPRESSION_ALGORITHM = 'lz-string';
var MIGRATION_BACKUP_COMPRESSION_ENCODING = 'json-string';
var MIGRATION_BACKUP_COMPRESSION_VARIANTS = [
  { variant: 'utf16', compress: 'compressToUTF16', decompress: 'decompressFromUTF16' },
  { variant: 'uri-component', compress: 'compressToEncodedURIComponent', decompress: 'decompressFromEncodedURIComponent' },
  { variant: 'base64', compress: 'compressToBase64', decompress: 'decompressFromBase64' },
];

var STORAGE_COMPRESSION_FLAG_KEY = '__cineStorageCompressed';
var STORAGE_COMPRESSION_VERSION = 1;
var STORAGE_COMPRESSION_ALGORITHM = 'lz-string';
var LEGACY_STORAGE_COMPRESSION_ALGORITHM = 'lz-string-utf16';
var STORAGE_COMPRESSION_VARIANTS = MIGRATION_BACKUP_COMPRESSION_VARIANTS;
var STORAGE_COMPRESSION_NAMESPACE = 'camera-power-planner:storage-compression';
var storageCompressionPatchedStorages = typeof WeakSet === 'function' ? new WeakSet() : null;
var STORAGE_COMPRESSION_SWEEP_LIMIT = 40;
var STORAGE_COMPRESSION_SWEEP_MIN_SAVINGS = 128;
var STORAGE_RAW_GET_ITEM_PROPERTY = '__cineRawGetItem';
var STORAGE_PROACTIVE_COMPRESSION_MIN_LENGTH = 1024;
var STORAGE_PROACTIVE_COMPRESSION_MIN_SAVINGS = 256;
var STORAGE_PROACTIVE_COMPRESSION_MIN_RATIO = 0.08;

function getAvailableLZStringCompressionStrategies(variants) {
  if (!Array.isArray(variants) || !variants.length) {
    return [];
  }

  var lzReference = typeof LZString === 'object' && LZString ? LZString : null;
  if (!lzReference) {
    return [];
  }

  var cacheKey = getCompressionStrategyCacheKey(variants);
  var cachedStrategies = readCompressionStrategyCache(cacheKey, lzReference);
  if (cachedStrategies !== null && cachedStrategies !== undefined) {
    return cachedStrategies;
  }

  var available = [];
  for (var i = 0; i < variants.length; i += 1) {
    var variant = variants[i];
    if (!variant) {
      continue;
    }

    var compressFn = typeof lzReference[variant.compress] === 'function'
      ? lzReference[variant.compress]
      : null;
    var decompressFn = typeof lzReference[variant.decompress] === 'function'
      ? lzReference[variant.decompress]
      : null;

    if (compressFn && decompressFn) {
      available.push({
        variant: variant.variant,
        compress: compressFn,
        decompress: decompressFn,
      });
    }
  }

  var result = available.length ? available.slice() : [];

  if (cacheKey) {
    writeCompressionStrategyCache(cacheKey, lzReference, result);
  }

  return result;
}

function tryDecompressWithStrategies(data, variants, preferredVariant, contextLabel) {
  if (typeof data !== 'string' || !data) {
    return { success: false };
  }

  var available = getAvailableLZStringCompressionStrategies(variants);
  if (!available.length) {
    return { success: false };
  }

  var attempts = [];
  if (preferredVariant) {
    var preferred = null;
    for (var i = 0; i < available.length; i += 1) {
      if (available[i].variant === preferredVariant) {
        preferred = available[i];
        break;
      }
    }
    if (preferred) {
      attempts.push(preferred);
    } else if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn("Compression variant "
        .concat(preferredVariant, " is unavailable while reading "
        ).concat(contextLabel || 'compressed payload', "."));
    }
  }

  for (var j = 0; j < available.length; j += 1) {
    if (!preferredVariant || available[j].variant !== preferredVariant) {
      attempts.push(available[j]);
    }
  }

  var lastError = null;
  for (var k = 0; k < attempts.length; k += 1) {
    var strategy = attempts[k];
    try {
      var decompressed = strategy.decompress(data);
      if (typeof decompressed === 'string' && decompressed) {
        return { success: true, value: decompressed, variant: strategy.variant };
      }
    } catch (error) {
      lastError = error;
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn("Unable to decompress "
          .concat(contextLabel || 'compressed payload', " with ")
          .concat(strategy.variant, " variant"), error);
      }
    }
  }

  return { success: false, error: lastError };
}

function canUseMigrationBackupCompression() {
  return getAvailableLZStringCompressionStrategies(MIGRATION_BACKUP_COMPRESSION_VARIANTS).length > 0;
}

function tryCreateCompressedMigrationBackupCandidate(serializedPayload, createdAt) {
  if (typeof serializedPayload !== 'string' || !serializedPayload) {
    return null;
  }
  if (!canUseMigrationBackupCompression()) {
    return null;
  }

  var bestCandidate = null;
  var strategies = getAvailableLZStringCompressionStrategies(MIGRATION_BACKUP_COMPRESSION_VARIANTS);

  for (var i = 0; i < strategies.length; i += 1) {
    var strategy = strategies[i];
    var compressed = null;
    try {
      compressed = strategy.compress(serializedPayload);
    } catch (compressionError) {
      console.warn("Unable to compress migration backup payload with "
        .concat(strategy.variant, " variant"), compressionError);
      continue;
    }

    if (typeof compressed !== 'string' || !compressed || compressed.length >= serializedPayload.length) {
      continue;
    }

    var record = {
      createdAt: createdAt,
      compression: MIGRATION_BACKUP_COMPRESSION_ALGORITHM,
      compressionVariant: strategy.variant,
      encoding: MIGRATION_BACKUP_COMPRESSION_ENCODING,
      data: compressed,
      originalSize: serializedPayload.length,
      compressedSize: compressed.length,
    };

    var serializedCompressedPayload;
    try {
      serializedCompressedPayload = JSON.stringify(record);
    } catch (serializationError) {
      console.warn('Unable to serialize compressed migration backup payload', serializationError);
      continue;
    }

    if (typeof serializedCompressedPayload !== 'string' || !serializedCompressedPayload) {
      continue;
    }

    if (serializedCompressedPayload.length >= serializedPayload.length) {
      continue;
    }

    if (!bestCandidate || serializedCompressedPayload.length < bestCandidate.serializedLength) {
      bestCandidate = {
        serialized: serializedCompressedPayload,
        serializedLength: serializedCompressedPayload.length,
        originalSize: serializedPayload.length,
        compressedSize: compressed.length,
        variant: strategy.variant,
      };
    }
  }

  return bestCandidate;
}

function parseMigrationBackupMetadata(raw) {
  if (typeof raw !== 'string' || !raw) {
    return { createdAt: 0, size: typeof raw === 'string' ? raw.length : 0 };
  }

  const metadata = { createdAt: 0, size: raw.length };

  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      let candidate = null;
      if (typeof parsed.createdAt === 'string') {
        candidate = parsed.createdAt.trim();
      } else if (
        typeof parsed.createdAt === 'number'
        && Number.isFinite(parsed.createdAt)
      ) {
        metadata.createdAt = parsed.createdAt;
      }

      if (candidate) {
        const timestamp = Date.parse(candidate);
        if (!Number.isNaN(timestamp)) {
          metadata.createdAt = timestamp;
        }
      } else {
        for (let i = 0; i < MIGRATION_BACKUP_LEGACY_CREATED_AT_KEYS.length; i += 1) {
          const key = MIGRATION_BACKUP_LEGACY_CREATED_AT_KEYS[i];
          if (typeof parsed[key] === 'string') {
            const trimmed = parsed[key].trim();
            if (trimmed) {
              const timestamp = Date.parse(trimmed);
              if (!Number.isNaN(timestamp)) {
                metadata.createdAt = timestamp;
                break;
              }
            }
          } else if (
            typeof parsed[key] === 'number'
            && Number.isFinite(parsed[key])
          ) {
            metadata.createdAt = parsed[key];
            break;
          }
        }
      }
    }
  } catch (error) {
    void error;
  }

  return metadata;
}

function canUseJsonValueCompression() {
  return canUseMigrationBackupCompression();
}

function createCompressedJsonStorageCandidate(serialized) {
  if (typeof serialized !== 'string' || !serialized) {
    return null;
  }
  if (!canUseJsonValueCompression()) {
    return null;
  }

  var strategies = getAvailableLZStringCompressionStrategies(STORAGE_COMPRESSION_VARIANTS);
  if (!strategies.length) {
    return null;
  }

  var best = null;
  for (var i = 0; i < strategies.length; i += 1) {
    var strategy = strategies[i];
    var compressed = null;
    try {
      compressed = strategy.compress(serialized);
    } catch (compressionError) {
      console.warn('Unable to compress storage payload with '
        .concat(strategy.variant, ' variant'), compressionError);
      continue;
    }

    if (typeof compressed !== 'string' || !compressed) {
      continue;
    }

    var wrapper = {
      [STORAGE_COMPRESSION_FLAG_KEY]: true,
      version: STORAGE_COMPRESSION_VERSION,
      algorithm: STORAGE_COMPRESSION_ALGORITHM,
      namespace: STORAGE_COMPRESSION_NAMESPACE,
      data: compressed,
      originalLength: serialized.length,
      compressedPayloadLength: compressed.length,
      compressionVariant: strategy.variant,
    };

    var wrappedSerialized;
    try {
      wrappedSerialized = JSON.stringify(wrapper);
    } catch (serializationError) {
      console.warn('Unable to serialize compressed storage payload wrapper', serializationError);
      continue;
    }

    if (typeof wrappedSerialized !== 'string' || !wrappedSerialized) {
      continue;
    }

    if (wrappedSerialized.length >= serialized.length) {
      continue;
    }

    if (!best || wrappedSerialized.length < best.wrappedLength) {
      best = {
        serialized: wrappedSerialized,
        originalLength: serialized.length,
        wrappedLength: wrappedSerialized.length,
        compressedPayloadLength: compressed.length,
        compressionVariant: strategy.variant,
      };
    }
  }

  return best;
}

function decodeCompressedJsonStorageValue(raw) {
  if (typeof raw !== 'string') {
    return { success: false };
  }

  if (!raw || raw.charCodeAt(0) !== 123) {
    return { success: false };
  }

  if (
    !raw.includes(`"${STORAGE_COMPRESSION_FLAG_KEY}":true`)
    || !raw.includes(`"namespace":"${STORAGE_COMPRESSION_NAMESPACE}`)
  ) {
    return { success: false };
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (parseError) {
    return { success: false, error: parseError };
  }

  if (!parsed || parsed[STORAGE_COMPRESSION_FLAG_KEY] !== true) {
    return { success: false };
  }

  if (parsed.namespace !== STORAGE_COMPRESSION_NAMESPACE) {
    return { success: false };
  }

  if (parsed.version !== STORAGE_COMPRESSION_VERSION) {
    console.warn('Unsupported storage compression version', parsed.version);
    return { success: false };
  }

  if (
    parsed.algorithm !== STORAGE_COMPRESSION_ALGORITHM
    && parsed.algorithm !== LEGACY_STORAGE_COMPRESSION_ALGORITHM
  ) {
    console.warn('Unsupported storage compression algorithm', parsed.algorithm);
    return { success: false };
  }

  if (typeof parsed.data !== 'string' || !parsed.data) {
    return { success: false };
  }

  if (!canUseJsonValueCompression()) {
    console.warn('Compressed storage payload detected but compression library is unavailable.');
    return { success: false };
  }

  var preferredVariant = null;
  if (typeof parsed.compressionVariant === 'string' && parsed.compressionVariant) {
    preferredVariant = parsed.compressionVariant;
  } else if (parsed.algorithm === LEGACY_STORAGE_COMPRESSION_ALGORITHM) {
    preferredVariant = 'utf16';
  }

  var decoded = tryDecompressWithStrategies(parsed.data, STORAGE_COMPRESSION_VARIANTS, preferredVariant, 'storage payload');
  if (!decoded.success) {
    return { success: false, error: decoded.error };
  }

  if (!parsed.compressionVariant && decoded.variant) {
    parsed.compressionVariant = decoded.variant;
  }

  return { success: true, value: decoded.value, metadata: parsed };
}

function maybeDecompressStoredString(raw, options) {
  if (typeof raw !== 'string') {
    return raw;
  }

  const decoded = decodeCompressedJsonStorageValue(raw);
  if (!decoded.success) {
    return raw;
  }

  if (options && typeof options.onDecoded === 'function') {
    try {
      options.onDecoded(decoded);
    } catch (callbackError) {
      console.warn('Error while processing storage decompression callback', callbackError);
    }
  }

  return decoded.value;
}

function attemptStorageCompressionSweep(storage, options) {
  if (!storage || typeof storage.length !== 'number' || typeof storage.key !== 'function') {
    return { success: false, compressed: 0, freed: 0 };
  }

  const { skipKeys = [], limit = STORAGE_COMPRESSION_SWEEP_LIMIT, minSavings = STORAGE_COMPRESSION_SWEEP_MIN_SAVINGS } = options || {};

  const skipSet = new Set();
  if (Array.isArray(skipKeys)) {
    for (let i = 0; i < skipKeys.length; i += 1) {
      const key = skipKeys[i];
      if (typeof key === 'string' && key) {
        skipSet.add(key);
      }
    }
  }

  const minSavingsThreshold = typeof minSavings === 'number' && minSavings > 0 ? minSavings : 0;
  const total = storage.length;
  const candidates = [];

  for (let index = 0; index < total; index += 1) {
    let key;
    try {
      key = storage.key(index);
    } catch (keyError) {
      void keyError;
      key = null;
    }

    if (typeof key !== 'string' || !key || skipSet.has(key)) {
      continue;
    }

    let raw;
    try {
      raw = storage.getItem(key);
    } catch (readError) {
      void readError;
      continue;
    }

    if (typeof raw !== 'string' || !raw) {
      continue;
    }

    if (raw.includes(`"${STORAGE_COMPRESSION_FLAG_KEY}":true`)) {
      continue;
    }

    const candidate = createCompressedJsonStorageCandidate(raw);
    if (!candidate || typeof candidate.serialized !== 'string' || !candidate.serialized) {
      continue;
    }

    const savings = typeof candidate.originalLength === 'number' && typeof candidate.wrappedLength === 'number'
      ? candidate.originalLength - candidate.wrappedLength
      : 0;
    if (savings < minSavingsThreshold) {
      continue;
    }

    candidates.push({
      key,
      serialized: candidate.serialized,
      savings: savings > 0 ? savings : 0,
      originalLength: typeof candidate.originalLength === 'number' ? candidate.originalLength : 0,
    });
  }

  if (!candidates.length) {
    return { success: false, compressed: 0, freed: 0 };
  }

  candidates.sort((a, b) => {
    if (b.savings !== a.savings) {
      return b.savings - a.savings;
    }
    return b.originalLength - a.originalLength;
  });

  const upperLimit = typeof limit === 'number' && limit > 0 ? Math.min(limit, candidates.length) : candidates.length;

  let compressedCount = 0;
  let freedCharacters = 0;

  for (let index = 0; index < candidates.length && compressedCount < upperLimit; index += 1) {
    const entry = candidates[index];
    if (!entry || typeof entry.serialized !== 'string' || !entry.serialized) {
      continue;
    }

    try {
      storage.setItem(entry.key, entry.serialized);
      compressedCount += 1;
      freedCharacters += entry.savings;
    } catch (writeError) {
      void writeError;
    }
  }

  if (compressedCount === 0) {
    return { success: false, compressed: 0, freed: 0 };
  }

  if (typeof console !== 'undefined' && typeof console.warn === 'function') {
    if (freedCharacters > 0) {
      console.warn(
        `Compressed ${compressedCount} stored entr${compressedCount === 1 ? 'y' : 'ies'} during quota recovery, freeing approximately ${freedCharacters} characters.`,
      );
    } else {
      console.warn(`Compressed ${compressedCount} stored entr${compressedCount === 1 ? 'y' : 'ies'} during quota recovery.`);
    }
  }

  return { success: true, compressed: compressedCount, freed: freedCharacters };
}

function decodeStoredValue(raw) {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return maybeDecompressStoredString(raw);
}

function patchIndividualStorageGetItem(storage) {
  if (!storage || typeof storage.getItem !== 'function') {
    return;
  }

  if (
    storageCompressionPatchedStorages
    && typeof storageCompressionPatchedStorages.has === 'function'
    && storageCompressionPatchedStorages.has(storage)
  ) {
    return;
  }

  const originalGetItem = storage.getItem;
  const rawGetItem = typeof originalGetItem === 'function'
    ? function rawStorageGetItem(key) {
        return originalGetItem.call(this, key);
      }
    : null;
  const patchedGetItem = function patchedStorageGetItem(key) {
    const rawValue = rawGetItem ? rawGetItem.call(this, key) : undefined;
    return maybeDecompressStoredString(rawValue);
  };

  try {
    Object.defineProperty(storage, 'getItem', {
      configurable: true,
      writable: true,
      value: patchedGetItem,
    });
  } catch (defineError) {
    const suppressDefineWarning =
      defineError
      && typeof defineError.message === 'string'
      && defineError.message.includes('Cannot redefine property');
    if (!suppressDefineWarning) {
      console.warn('Unable to redefine storage.getItem descriptor for compression support', defineError);
    }
    try {
      storage.getItem = patchedGetItem;
    } catch (assignError) {
      const suppressAssignWarning =
        assignError
        && typeof assignError.message === 'string'
        && assignError.message.includes('Cannot assign to read only property');
      if (!suppressAssignWarning) {
        console.warn('Unable to patch storage instance getItem for compression support', assignError);
      }
      if (suppressDefineWarning && suppressAssignWarning) {
        return;
      }
      if (!suppressDefineWarning && !suppressAssignWarning) {
        return;
      }
      return;
    }
  }

  if (rawGetItem) {
    try {
      Object.defineProperty(storage, STORAGE_RAW_GET_ITEM_PROPERTY, {
        configurable: true,
        writable: true,
        value: rawGetItem,
      });
    } catch (rawAssignError) {
      try {
        storage[STORAGE_RAW_GET_ITEM_PROPERTY] = rawGetItem;
      } catch (rawStoreError) {
        void rawStoreError;
      }
      void rawAssignError;
    }
  }

  if (
    storageCompressionPatchedStorages
    && typeof storageCompressionPatchedStorages.add === 'function'
  ) {
    try {
      storageCompressionPatchedStorages.add(storage);
    } catch (trackError) {
      void trackError;
    }
  }
}

function patchStorageGetItemForCompression() {
  if (typeof Storage === 'undefined') {
    const candidates = [];
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
      if (GLOBAL_SCOPE.localStorage) {
        candidates.push(GLOBAL_SCOPE.localStorage);
      }
      if (GLOBAL_SCOPE.sessionStorage) {
        candidates.push(GLOBAL_SCOPE.sessionStorage);
      }
    }
    if (typeof global !== 'undefined' && global && global !== GLOBAL_SCOPE) {
      if (global.localStorage) {
        candidates.push(global.localStorage);
      }
      if (global.sessionStorage) {
        candidates.push(global.sessionStorage);
      }
    }
    candidates.forEach(patchIndividualStorageGetItem);
    return;
  }

  const prototype = Storage.prototype;
  if (!prototype || typeof prototype.getItem !== 'function') {
    return;
  }

  if (prototype.__cineStorageCompressionPatched) {
    return;
  }

  const originalGetItem = prototype.getItem;
  const rawGetItem = function rawStorageGetItem(key) {
    return originalGetItem.call(this, key);
  };
  const patchedGetItem = function patchedStorageGetItem(key) {
    const rawValue = rawGetItem.call(this, key);
    return maybeDecompressStoredString(rawValue);
  };

  try {
    Object.defineProperty(prototype, 'getItem', {
      configurable: true,
      writable: true,
      value: patchedGetItem,
    });
  } catch (patchError) {
    console.warn('Unable to patch Storage.getItem for compression support', patchError);
    return;
  }

  try {
    Object.defineProperty(prototype, STORAGE_RAW_GET_ITEM_PROPERTY, {
      configurable: true,
      writable: false,
      value: rawGetItem,
    });
  } catch (rawError) {
    try {
      prototype[STORAGE_RAW_GET_ITEM_PROPERTY] = rawGetItem;
    } catch (assignError) {
      void assignError;
    }
    void rawError;
  }

  try {
    Object.defineProperty(prototype, '__cineStorageCompressionPatched', {
      configurable: true,
      writable: false,
      value: true,
    });
  } catch (flagError) {
    prototype.__cineStorageCompressionPatched = true;
    void flagError;
  }

  const candidates = [];
  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
    if (GLOBAL_SCOPE.localStorage) {
      candidates.push(GLOBAL_SCOPE.localStorage);
    }
    if (GLOBAL_SCOPE.sessionStorage) {
      candidates.push(GLOBAL_SCOPE.sessionStorage);
    }
  }
  if (typeof global !== 'undefined' && global && global !== GLOBAL_SCOPE) {
    if (global.localStorage) {
      candidates.push(global.localStorage);
    }
    if (global.sessionStorage) {
      candidates.push(global.sessionStorage);
    }
  }
  candidates.forEach(patchIndividualStorageGetItem);
}

function getRawStorageGetter(storage) {
  if (!storage || typeof storage !== 'object') {
    return null;
  }

  const direct = storage[STORAGE_RAW_GET_ITEM_PROPERTY];
  if (typeof direct === 'function') {
    return direct;
  }

  const prototype = Object.getPrototypeOf(storage);
  if (prototype && typeof prototype[STORAGE_RAW_GET_ITEM_PROPERTY] === 'function') {
    return prototype[STORAGE_RAW_GET_ITEM_PROPERTY];
  }

  return null;
}

function readRawStorageValue(storage, key, rawGetterOverride) {
  if (!storage || typeof key !== 'string' || !key) {
    return null;
  }

  const getter = typeof rawGetterOverride === 'function'
    ? rawGetterOverride
    : getRawStorageGetter(storage);
  if (typeof getter !== 'function') {
    return null;
  }

  try {
    return getter.call(storage, key);
  } catch (error) {
    void error;
    return null;
  }
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

var MIGRATION_BACKUP_LEGACY_DATA_KEYS = [
  'payload',
  'value',
  'content',
  'entries',
  'snapshot',
  'state',
  'record',
];

var MIGRATION_BACKUP_LEGACY_CREATED_AT_KEYS = ['iso', 'timestamp', 'time'];

function trySerializeMigrationBackupValue(value) {
  try {
    return JSON.stringify(value);
  } catch (serializationError) {
    console.warn('Unable to serialize normalized migration backup payload', serializationError);
    return null;
  }
}

function normalizeLegacyMigrationBackupCreatedAt(value, fallbackIso) {
  const fallback = typeof fallbackIso === 'string' && fallbackIso
    ? fallbackIso
    : null;

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) {
      return { value: fallback || new Date().toISOString(), changed: true };
    }
    const numeric = Number(trimmed);
    if (!Number.isNaN(numeric) && Number.isFinite(numeric) && String(numeric) === trimmed) {
      try {
        return { value: new Date(numeric).toISOString(), changed: true };
      } catch (error) {
        void error;
        return { value: fallback || new Date().toISOString(), changed: true };
      }
    }
    const timestamp = Date.parse(trimmed);
    if (!Number.isNaN(timestamp)) {
      try {
        const iso = new Date(timestamp).toISOString();
        return { value: iso, changed: iso !== trimmed };
      } catch (error) {
        void error;
        return { value: fallback || new Date().toISOString(), changed: true };
      }
    }
    return { value: trimmed, changed: trimmed !== value };
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    try {
      return { value: new Date(value).toISOString(), changed: true };
    } catch (error) {
      void error;
      return { value: fallback || new Date().toISOString(), changed: true };
    }
  }

  if (value instanceof Date) {
    const time = value.getTime();
    if (Number.isFinite(time)) {
      try {
        return { value: value.toISOString(), changed: true };
      } catch (error) {
        void error;
        return { value: fallback || new Date().toISOString(), changed: true };
      }
    }
  }

  if (fallback) {
    return { value: fallback, changed: true };
  }

  const generated = new Date().toISOString();
  return { value: generated, changed: true };
}

function normalizeLegacyMigrationBackupValue(rawValue, fallbackIso) {
  if (typeof rawValue !== 'string' || !rawValue) {
    return null;
  }

  const fallback = typeof fallbackIso === 'string' && fallbackIso
    ? fallbackIso
    : new Date().toISOString();

  let parsed;
  try {
    parsed = JSON.parse(rawValue);
  } catch (parseError) {
    void parseError;
    return trySerializeMigrationBackupValue({ createdAt: fallback, data: rawValue });
  }

  if (!parsed || typeof parsed !== 'object') {
    const dataValue = parsed === undefined ? rawValue : parsed;
    return trySerializeMigrationBackupValue({ createdAt: fallback, data: dataValue });
  }

  let normalized;
  let changed = false;

  if (Object.prototype.hasOwnProperty.call(parsed, 'data')) {
    normalized = { ...parsed };
  } else {
    let usedKey = null;
    for (let i = 0; i < MIGRATION_BACKUP_LEGACY_DATA_KEYS.length; i += 1) {
      const key = MIGRATION_BACKUP_LEGACY_DATA_KEYS[i];
      if (Object.prototype.hasOwnProperty.call(parsed, key)) {
        usedKey = key;
        break;
      }
    }

    if (usedKey) {
      normalized = { ...parsed };
      normalized.data = parsed[usedKey];
      delete normalized[usedKey];
      changed = true;
    } else {
      normalized = { data: parsed };
      changed = true;
    }
  }

  let rawCreatedAt = normalized.createdAt;
  let createdAtSourceKey = 'createdAt';
  if (rawCreatedAt === undefined) {
    for (let i = 0; i < MIGRATION_BACKUP_LEGACY_CREATED_AT_KEYS.length; i += 1) {
      const key = MIGRATION_BACKUP_LEGACY_CREATED_AT_KEYS[i];
      if (Object.prototype.hasOwnProperty.call(parsed, key)) {
        rawCreatedAt = parsed[key];
        createdAtSourceKey = key;
        break;
      }
    }
  }

  const { value: createdAt, changed: createdAtChanged } = normalizeLegacyMigrationBackupCreatedAt(
    rawCreatedAt,
    fallback,
  );

  normalized.createdAt = createdAt;
  if (createdAtSourceKey !== 'createdAt' && createdAtSourceKey && Object.prototype.hasOwnProperty.call(normalized, createdAtSourceKey)) {
    delete normalized[createdAtSourceKey];
    changed = true;
  }

  if (createdAtChanged) {
    changed = true;
  }

  if (!Object.prototype.hasOwnProperty.call(normalized, 'data')) {
    normalized.data = parsed;
    changed = true;
  }

  if (!changed) {
    return null;
  }

  return trySerializeMigrationBackupValue(normalized);
}

function upgradeLegacyMigrationBackupEntry(storage, backupKey, rawValue, fallbackIso) {
  const normalized = normalizeLegacyMigrationBackupValue(rawValue, fallbackIso);
  if (normalized === null) {
    return true;
  }
  if (typeof normalized !== 'string' || !normalized) {
    return false;
  }
  if (normalized === rawValue) {
    return true;
  }
  try {
    storage.setItem(backupKey, normalized);
    return true;
  } catch (error) {
    console.warn(`Unable to normalize legacy migration backup for ${backupKey}`, error);
    return false;
  }
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
        const fallbackCreatedAt = new Date().toISOString();
        upgradeLegacyMigrationBackupEntry(storage, backupKey, existing, fallbackCreatedAt);
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
        const storedLength = typeof info.serializedLength === 'number'
          ? info.serializedLength
          : info.compressedSize;
        const rawSavings = info.originalSize - storedLength;
        const savings = rawSavings > 0 ? rawSavings : 0;
        const percent = info.originalSize > 0
          ? Math.round((savings / info.originalSize) * 100)
          : 0;
        console.warn(
          `Stored compressed migration backup for ${key} to reduce storage usage by ${savings} characters (${percent}%) using ${info.variant || 'unknown'} variant.`,
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

var PRIMARY_STORAGE_KEYS = [
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
  AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY,
  AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY,
  FULL_BACKUP_HISTORY_STORAGE_KEY,
];

var SIMPLE_STORAGE_KEYS = [
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

var STORAGE_ALERT_FLAG_NAME = '__cameraPowerPlannerStorageAlertShown';
var SESSION_FALLBACK_ALERT_FLAG_NAME = '__cameraPowerPlannerSessionFallbackAlertShown';

var storageErrorAlertShown = false;
if (GLOBAL_SCOPE) {
  if (typeof GLOBAL_SCOPE[STORAGE_ALERT_FLAG_NAME] === 'boolean') {
    storageErrorAlertShown = GLOBAL_SCOPE[STORAGE_ALERT_FLAG_NAME];
  } else {
    GLOBAL_SCOPE[STORAGE_ALERT_FLAG_NAME] = false;
  }
}

var sessionFallbackAlertShown = false;
if (GLOBAL_SCOPE) {
  if (typeof GLOBAL_SCOPE[SESSION_FALLBACK_ALERT_FLAG_NAME] === 'boolean') {
    sessionFallbackAlertShown = GLOBAL_SCOPE[SESSION_FALLBACK_ALERT_FLAG_NAME];
  } else {
    GLOBAL_SCOPE[SESSION_FALLBACK_ALERT_FLAG_NAME] = false;
  }
}

var DEVICE_COLLECTION_KEYS = [
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

var FIZ_COLLECTION_KEYS = ['motors', 'handUnits', 'controllers', 'distance'];

var ACCESSORY_COLLECTION_KEYS = [
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

var getStorageManager = () =>
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
var STORAGE_TEST_KEY = '__storage_test__';

var QUOTA_ERROR_NAMES = new Set([
  'QuotaExceededError',
  'NS_ERROR_DOM_QUOTA_REACHED',
]);
var QUOTA_ERROR_CODES = new Set([22, 1014]);
var QUOTA_ERROR_NUMBERS = new Set([22, 1014]);

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
        const variants = getStorageKeyVariants(key);
        for (let j = 0; j < variants.length; j += 1) {
          const candidateKey = variants[j];
          if (storage.getItem(candidateKey) !== null) {
            return true;
          }
          const backupKey = `${candidateKey}${STORAGE_BACKUP_SUFFIX}`;
          if (storage.getItem(backupKey) !== null) {
            return true;
          }
        }
      }

      for (let i = 0; i < SIMPLE_STORAGE_KEYS.length; i += 1) {
        const key = SIMPLE_STORAGE_KEYS[i];
        const variants = getStorageKeyVariants(key);
        for (let j = 0; j < variants.length; j += 1) {
          const candidateKey = variants[j];
          if (storage.getItem(candidateKey) !== null) {
            return true;
          }
          if (RAW_STORAGE_BACKUP_KEYS.has(candidateKey)) {
            const backupKey = `${candidateKey}${STORAGE_BACKUP_SUFFIX}`;
            if (storage.getItem(backupKey) !== null) {
              return true;
            }
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
      if (!Object.prototype.hasOwnProperty.call(memoryStore, key)) {
        return null;
      }
      return maybeDecompressStoredString(memoryStore[key]);
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

var lastFailedUpgradeCandidate = null;
var safeLocalStorageInfo = initializeSafeLocalStorage();

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
patchStorageGetItemForCompression();

var persistentStorageRequestPromise = null;

function requestPersistentStorage() {
  const storageManager = getStorageManager();
  const supportsPersist =
    storageManager && typeof storageManager.persist === 'function';

  if (!supportsPersist) {
    return Promise.resolve({
      supported: Boolean(storageManager),
      granted: false,
      alreadyGranted: false,
    });
  }

  if (persistentStorageRequestPromise) {
    return persistentStorageRequestPromise;
  }

  const requestPromise = (async () => {
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

  const trackedPromise = requestPromise.then(
    (result) => {
      if (!result || result.granted !== true) {
        persistentStorageRequestPromise = null;
      }
      return result;
    },
    (error) => {
      persistentStorageRequestPromise = null;
      throw error;
    },
  );

  persistentStorageRequestPromise = trackedPromise;
  return trackedPromise;
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

function isMapLike(value) {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const tag = Object.prototype.toString.call(value);
  if (tag === '[object Map]') {
    return true;
  }

  if (typeof Map !== 'undefined') {
    try {
      if (value instanceof Map) {
        return true;
      }
    } catch (error) {
      void error;
    }
  }

  return (
    typeof value.size === 'number'
    && typeof value.entries === 'function'
    && typeof value.forEach === 'function'
    && typeof value.get === 'function'
    && typeof value.set === 'function'
  );
}

function convertMapLikeKey(key) {
  if (typeof key === 'string') {
    return key;
  }
  if (typeof key === 'number' || typeof key === 'boolean' || typeof key === 'bigint') {
    return String(key);
  }
  if (typeof key === 'symbol') {
    return key.description || key.toString();
  }
  if (key && typeof key === 'object') {
    try {
      const json = JSON.stringify(key);
      if (json && json !== '{}') {
        return json;
      }
    } catch (error) {
      void error;
    }
  }
  try {
    return String(key);
  } catch (error) {
    void error;
  }
  return null;
}

function convertMapLikeToObject(mapLike) {
  if (!isMapLike(mapLike)) {
    return null;
  }

  const snapshot = Object.create(null);
  const assignEntry = (rawKey, value) => {
    const key = convertMapLikeKey(rawKey);
    if (key === null || key === undefined) {
      return;
    }
    if (Object.prototype.hasOwnProperty.call(snapshot, key)) {
      return;
    }
    snapshot[key] = value;
  };

  let iterated = false;

  if (typeof mapLike.entries === 'function') {
    try {
      const iterator = mapLike.entries();
      if (iterator && typeof iterator.next === 'function') {
        for (let step = iterator.next(); !step.done; step = iterator.next()) {
          const entry = step && step.value;
          if (Array.isArray(entry) && entry.length >= 2) {
            assignEntry(entry[0], entry[1]);
          }
        }
        iterated = true;
      }
    } catch (error) {
      console.warn('Unable to iterate map-like value entries', error);
    }
  }

  if (!iterated && typeof mapLike.forEach === 'function') {
    try {
      mapLike.forEach((value, key) => {
        assignEntry(key, value);
      });
      iterated = true;
    } catch (error) {
      console.warn('Unable to iterate map-like value via forEach', error);
    }
  }

  if (!Object.keys(snapshot).length && !iterated) {
    return null;
  }

  return snapshot;
}

var LEGACY_LONG_GOP_TOKEN_REGEX = /^long[\s_-]?gop$/i;

function inferLegacyLongGopCompressionVariant(value) {
  if (typeof value !== 'string') {
    return null;
  }

  var trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  var lower = trimmed.toLowerCase();
  if (lower === 'utf16' || lower === 'utf-16') {
    return 'utf16';
  }
  if (lower === 'uri-component' || lower === 'uri_component' || lower === 'encoded-uri-component' || lower === 'uri') {
    return 'uri-component';
  }
  if (lower === 'base64') {
    return 'base64';
  }

  if (LEGACY_LONG_GOP_TOKEN_REGEX.test(lower)) {
    return 'utf16';
  }

  return null;
}

function normalizeLegacyLongGopString(value) {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  if (LEGACY_LONG_GOP_TOKEN_REGEX.test(trimmed)) {
    return 'long-gop';
  }

  return value;
}

function normalizeLegacyLongGopKey(key) {
  if (typeof key !== 'string') {
    return key;
  }

  return LEGACY_LONG_GOP_TOKEN_REGEX.test(key) ? 'long-gop' : key;
}

function normalizeLegacyLongGopStructure(value) {
  if (Array.isArray(value)) {
    let changed = false;
    const normalizedArray = value.map((item) => {
      const normalizedItem = normalizeLegacyLongGopStructure(item);
      if (normalizedItem !== item) {
        changed = true;
      }
      return normalizedItem;
    });
    return changed ? normalizedArray : value;
  }

  if (isPlainObject(value)) {
    let changed = false;
    const normalizedObject = {};
    Object.keys(value).forEach((key) => {
      const normalizedKey = normalizeLegacyLongGopKey(key);
      const originalValue = value[key];
      const normalizedValue = normalizeLegacyLongGopStructure(originalValue);
      if (normalizedKey !== key || normalizedValue !== originalValue) {
        changed = true;
      }
      normalizedObject[normalizedKey] = normalizedValue;
    });
    return changed ? normalizedObject : value;
  }

  return normalizeLegacyLongGopString(value);
}

function normalizeLegacyLongGopBackups(backups) {
  if (!Array.isArray(backups)) {
    return { normalized: Array.isArray(backups) ? backups : [], changed: false };
  }

  let changed = false;
  const normalized = backups.map((entry) => {
    if (entry === null || entry === undefined) {
      return entry;
    }
    const normalizedEntry = normalizeLegacyLongGopStructure(entry);
    if (normalizedEntry !== entry) {
      changed = true;
    }
    return normalizedEntry;
  });

  return { normalized, changed };
}

function parseAutoBackupKey(name) {
  if (typeof name !== 'string') {
    return { timestamp: Number.NEGATIVE_INFINITY, label: '' };
  }

  const parseWithPrefix = (prefix, options = {}) => {
    const remainder = name.slice(prefix.length);
    const parts = remainder.split('-');
    if (parts.length < 5) {
      return null;
    }

    const [yearPart, monthPart, dayPart, hourPart, minutePart] = parts;
    const year = Number.parseInt(yearPart, 10);
    const month = Number.parseInt(monthPart, 10) - 1;
    const day = Number.parseInt(dayPart, 10);
    const hour = Number.parseInt(hourPart, 10);
    const minute = Number.parseInt(minutePart, 10);

    if ([year, month, day, hour, minute].some(value => Number.isNaN(value))) {
      return null;
    }

    let includeSeconds = false;
    let seconds = 0;
    let labelStartIndex = 5;

    if (parts.length > labelStartIndex) {
      const secondsCandidate = parts[labelStartIndex];
      if (/^\d{1,2}$/u.test(secondsCandidate)) {
        includeSeconds = true;
        seconds = Number.parseInt(secondsCandidate, 10);
        labelStartIndex += 1;
      } else if (options.requireSeconds) {
        return null;
      }
    } else if (options.requireSeconds) {
      return null;
    }

    const label = parts.slice(labelStartIndex).join('-').trim();
    const date = new Date(year, month, day, hour, minute, includeSeconds ? seconds : 0, 0);
    const timestamp = date.getTime();

    if (Number.isNaN(timestamp)) {
      return null;
    }

    return { timestamp, label };
  };

  if (name.startsWith(STORAGE_AUTO_BACKUP_NAME_PREFIX)) {
    const parsed = parseWithPrefix(STORAGE_AUTO_BACKUP_NAME_PREFIX);
    if (parsed) {
      return parsed;
    }
    return { timestamp: Number.NEGATIVE_INFINITY, label: '' };
  }

  if (name.startsWith(STORAGE_AUTO_BACKUP_DELETION_PREFIX)) {
    const parsed = parseWithPrefix(STORAGE_AUTO_BACKUP_DELETION_PREFIX, { requireSeconds: false });
    if (parsed) {
      return parsed;
    }
    return { timestamp: Number.NEGATIVE_INFINITY, label: '' };
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

function markAutoBackupValueAsRenamed(value) {
  if (!value || typeof value !== 'object') {
    return;
  }

  try {
    value[STORAGE_AUTO_BACKUP_RENAMED_FLAG] = true;
  } catch (assignmentError) {
    void assignmentError;
    try {
      Object.defineProperty(value, STORAGE_AUTO_BACKUP_RENAMED_FLAG, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: true,
      });
    } catch (definitionError) {
      void definitionError;
    }
  }

  if (isPlainObject(value.projectInfo)) {
    try {
      value.projectInfo[STORAGE_AUTO_BACKUP_RENAMED_FLAG] = true;
    } catch (infoError) {
      void infoError;
    }
  }
}

function isAutoBackupValueRenamed(value) {
  if (!value || typeof value !== 'object') {
    return false;
  }
  if (value[STORAGE_AUTO_BACKUP_RENAMED_FLAG] === true) {
    return true;
  }
  if (
    isPlainObject(value.projectInfo)
    && value.projectInfo[STORAGE_AUTO_BACKUP_RENAMED_FLAG] === true
  ) {
    return true;
  }
  return false;
}

function isRenamedAutoBackupEntry(container, key) {
  if (!isPlainObject(container) || typeof key !== 'string') {
    return false;
  }
  return isAutoBackupValueRenamed(container[key]);
}

function getAutoBackupLabelKey(entry) {
  if (!entry || typeof entry !== 'object') {
    return '';
  }
  if (typeof entry.label === 'string') {
    const trimmed = entry.label.trim();
    if (trimmed) {
      return trimmed;
    }
  }
  if (typeof entry.key === 'string' && entry.key.trim()) {
    const key = entry.key.trim();
    if (
      key.startsWith(STORAGE_AUTO_BACKUP_NAME_PREFIX)
      || key.startsWith(STORAGE_AUTO_BACKUP_DELETION_PREFIX)
    ) {
      return '__auto-backup:unlabeled__';
    }
    return key;
  }
  return '__auto-backup:unlabeled__';
}

function getAutoBackupEntrySignature(container, entry) {
  if (!isPlainObject(container) || !entry || typeof entry.key !== 'string') {
    return 'undefined';
  }
  const value = Object.prototype.hasOwnProperty.call(container, entry.key)
    ? container[entry.key]
    : undefined;
  try {
    let preparedValue = value;
    if (isPlainObject(value) && value[AUTO_BACKUP_SNAPSHOT_PROPERTY]) {
      const cloneForSignature = cloneAutoBackupValue(value, { stripMetadata: true });
      const snapshot = cloneForSignature[AUTO_BACKUP_SNAPSHOT_PROPERTY];
      if (snapshot && typeof snapshot === 'object') {
        try {
          const restored = restoreAutoBackupSnapshotPayload(snapshot, entry.key);
          snapshot.payload = restored.payload;
          if (Object.prototype.hasOwnProperty.call(snapshot, 'payloadCompression')) {
            delete snapshot.payloadCompression;
          }
        } catch (payloadError) {
          console.warn('Failed to expand automatic backup payload for signature comparison', entry.key, payloadError);
        }
      }
      preparedValue = cloneForSignature;
    }

    const normalizedValue = cloneAutoBackupValueWithLegacyNormalization(preparedValue, {
      stripMetadata: true,
    });
    return createStableValueSignature(normalizedValue);
  } catch (error) {
    console.warn('Failed to create stable signature for automatic backup entry', error);
    return 'undefined';
  }
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

function removeSingleDuplicateAutoBackupEntry(container, entries) {
  if (!isPlainObject(container) || !Array.isArray(entries) || entries.length < 2) {
    return null;
  }

  const seenSignaturesByLabel = new Map();

  for (let index = entries.length - 1; index >= 0; index -= 1) {
    const entry = entries[index];
    if (!entry || typeof entry.key !== 'string') {
      continue;
    }
    if (isRenamedAutoBackupEntry(container, entry.key)) {
      continue;
    }

    const labelKey = getAutoBackupLabelKey(entry);
    let labelSignatures = seenSignaturesByLabel.get(labelKey);
    if (!labelSignatures) {
      labelSignatures = new Map();
      seenSignaturesByLabel.set(labelKey, labelSignatures);
    }

    const value = Object.prototype.hasOwnProperty.call(container, entry.key)
      ? container[entry.key]
      : undefined;
    const signature = createStableValueSignature(value);
    const seen = labelSignatures.get(signature);

    if (seen && typeof seen.key === 'string') {
      delete container[entry.key];
      entries.splice(index, 1);

      if (
        typeof console !== 'undefined'
        && typeof console.info === 'function'
      ) {
        console.info('Removed duplicate automatic backup while preserving newer copy.', {
          removedKey: entry.key,
          preservedKey: seen.key,
          label: labelKey,
        });
      }

      return entry.key;
    }

    labelSignatures.set(signature, {
      key: entry.key,
      signature,
    });
  }

  return null;
}

function removeDuplicateAutoBackupEntries(container, entries) {
  const removedKeys = [];
  while (true) {
    const removedKey = removeSingleDuplicateAutoBackupEntry(container, entries);
    if (!removedKey) {
      break;
    }
    removedKeys.push(removedKey);
  }
  return removedKeys;
}

function pruneAutoBackupEntries(container, entries, limit, removedKeys) {
  if (!isPlainObject(container) || !Array.isArray(entries) || entries.length <= limit) {
    return;
  }

  const duplicateBuckets = new Map();
  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    if (!entry || typeof entry.key !== 'string') {
      continue;
    }
    const labelKey = getAutoBackupLabelKey(entry);
    const signature = getAutoBackupEntrySignature(container, entry);
    const bucketKey = `${labelKey}__${signature}`;
    const existing = duplicateBuckets.get(bucketKey);
    if (existing) {
      existing.push(index);
    } else {
      duplicateBuckets.set(bucketKey, [index]);
    }
  }

  const removable = Array.from(duplicateBuckets.values())
    .filter(indexes => Array.isArray(indexes) && indexes.length > 1)
    .flatMap(indexes => indexes.slice(0, -1))
    .sort((a, b) => a - b);

  if (!removable.length) {
    if (entries.length > limit) {
      console.warn(
        'Skipped trimming automatic backups because all remaining versions are unique.',
        { limit, total: entries.length },
      );
    }
    return;
  }

  for (let i = removable.length - 1; i >= 0 && entries.length > limit; i -= 1) {
    const index = removable[i];
    const entry = entries[index];
    if (!entry || typeof entry.key !== 'string') {
      continue;
    }
    if (isRenamedAutoBackupEntry(container, entry.key)) {
      continue;
    }
    delete container[entry.key];
    entries.splice(index, 1);
    removedKeys.push(entry.key);
  }

  if (entries.length > limit) {
    console.warn(
      'Unable to trim automatic backups down to the configured limit without losing unique data.',
      { limit, remaining: entries.length },
    );
  }
}

function enforceAutoBackupLimits(container) {
  if (!isPlainObject(container)) {
    return [];
  }

  const removed = [];

  const autoBackups = collectAutoBackupEntries(container, STORAGE_AUTO_BACKUP_NAME_PREFIX);
  removed.push(...removeDuplicateAutoBackupEntries(container, autoBackups));
  if (autoBackups.length > MAX_AUTO_BACKUPS) {
    pruneAutoBackupEntries(container, autoBackups, MAX_AUTO_BACKUPS, removed);
  }

  const deletionBackups = collectAutoBackupEntries(container, STORAGE_AUTO_BACKUP_DELETION_PREFIX);
  removed.push(...removeDuplicateAutoBackupEntries(container, deletionBackups));
  if (deletionBackups.length > MAX_DELETION_BACKUPS) {
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
  const duplicateAutoBackupKey = removeSingleDuplicateAutoBackupEntry(container, autoBackups);
  if (duplicateAutoBackupKey) {
    return duplicateAutoBackupKey;
  }
  if (autoBackups.length > 0) {
    console.warn('Unable to free space by removing automatic backups because all versions are unique.');
  }

  const deletionBackups = collectAutoBackupEntries(container, STORAGE_AUTO_BACKUP_DELETION_PREFIX);
  const duplicateDeletionBackupKey = removeSingleDuplicateAutoBackupEntry(container, deletionBackups);
  if (duplicateDeletionBackupKey) {
    return duplicateDeletionBackupKey;
  }
  if (deletionBackups.length > 0) {
    console.warn('Unable to free space by removing pre-deletion backups because all versions are unique.');
  }

  return null;
}

function describeAutoGearBackupEntry(entry) {
  if (!entry || typeof entry !== 'object') {
    return '';
  }

  if (typeof entry.note === 'string') {
    const trimmedNote = entry.note.trim();
    if (trimmedNote) {
      return trimmedNote;
    }
  }

  if (typeof entry.createdAt === 'string') {
    const trimmedTimestamp = entry.createdAt.trim();
    if (trimmedTimestamp) {
      return trimmedTimestamp;
    }
  }

  if (typeof entry.id === 'string') {
    return entry.id;
  }

  return '';
}

function removeOldestAutoGearBackupEntry(backups) {
  if (!Array.isArray(backups) || backups.length === 0) {
    return null;
  }

  const removeAt = (index) => {
    const [removed] = backups.splice(index, 1);
    return {
      removed,
      label: describeAutoGearBackupEntry(removed),
    };
  };

  for (let index = backups.length - 1; index >= 0; index -= 1) {
    const entry = backups[index];
    if (!entry || typeof entry !== 'object') {
      return removeAt(index);
    }
    if (!Array.isArray(entry.rules)) {
      return removeAt(index);
    }
  }

  return removeAt(backups.length - 1);
}

function cleanupAutoGearBackupMigrationCopies(storage) {
  if (!storage || typeof storage.getItem !== 'function' || typeof storage.removeItem !== 'function') {
    return false;
  }

  const migrationBackupKey = `${AUTO_GEAR_BACKUPS_STORAGE_KEY}${STORAGE_MIGRATION_BACKUP_SUFFIX}`;
  const removedKeys = [];

  try {
    const existing = storage.getItem(migrationBackupKey);
    if (existing !== null && existing !== undefined) {
      storage.removeItem(migrationBackupKey);
      removedKeys.push(migrationBackupKey);
    }
  } catch (error) {
    console.warn(
      'Unable to inspect automatic gear backup migration snapshot while recovering storage quota.',
      error,
    );
  }

  try {
    const pruned = pruneMigrationBackupEntriesForCleanup(storage, migrationBackupKey);
    if (Array.isArray(pruned) && pruned.length > 0) {
      removedKeys.push(...pruned);
    }
  } catch (error) {
    console.warn('Unable to prune migration backups while recovering storage for automatic gear backups.', error);
  }

  if (removedKeys.length > 0) {
    console.warn(
      `Removed ${removedKeys.length} migration backup${removedKeys.length > 1 ? 's' : ''} while freeing storage for automatic gear backups.`,
      removedKeys,
    );
    return true;
  }

  return false;
}

function clearCachedPlannerDataForAutoGearBackups() {
  if (typeof clearUiCacheStorageEntries !== 'function') {
    return false;
  }

  try {
    clearUiCacheStorageEntries();
    console.warn(
      'Cleared cached planner data to free up storage space before saving automatic gear backups.',
    );
    return true;
  } catch (error) {
    console.warn(
      'Unable to clear cached planner data while recovering storage for automatic gear backups.',
      error,
    );
  }

  return false;
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
  if (!Array.isArray(storages) || storages.length === 0) {
    return [];
  }

  const unique = [];
  const seen = new Set();

  for (let i = 0; i < storages.length; i += 1) {
    const storage = storages[i];
    if (!storage || typeof storage.getItem !== 'function' || seen.has(storage)) {
      continue;
    }

    seen.add(storage);
    unique.push(storage);
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
    migrationBackupKey,
  } = options || {};

  const fallbackKey = typeof backupKey === 'string' && backupKey
    ? backupKey
    : `${key}${STORAGE_BACKUP_SUFFIX}`;
  const useBackup = !disableBackup && fallbackKey && fallbackKey !== key;

  const migrationBackupCandidates = (() => {
    const seen = new Set();
    const candidates = [];

    const pushCandidate = (candidate) => {
      if (typeof candidate !== 'string' || !candidate || seen.has(candidate)) {
        return;
      }
      seen.add(candidate);
      candidates.push(candidate);
    };

    if (typeof migrationBackupKey === 'string' && migrationBackupKey) {
      pushCandidate(migrationBackupKey);
    }

    const variants = getStorageKeyVariants(key);
    for (let i = 0; i < variants.length; i += 1) {
      pushCandidate(`${variants[i]}${STORAGE_MIGRATION_BACKUP_SUFFIX}`);
    }

    return candidates;
  })();

  const rawGetter = getRawStorageGetter(storage);
  let rawStoredValue =
    typeof rawGetter === 'function'
      ? readRawStorageValue(storage, key, rawGetter)
      : undefined;

  let shouldAlert = false;

  const parseRawValue = (raw, label) => {
    if (raw === null || raw === undefined) {
      return { ok: false, reason: 'missing' };
    }
    const normalizedRaw = typeof raw === 'string'
      ? maybeDecompressStoredString(raw)
      : raw;
    try {
      const parsed = JSON.parse(normalizedRaw);
      if (typeof validate === 'function' && !validate(parsed)) {
        console.warn(`${errorMessage} Invalid data${label ? ` (${label})` : ''}.`);
        shouldAlert = true;
        return { ok: false, reason: 'invalid' };
      }
      return {
        ok: true,
        value: parsed,
        raw,
        normalizedRaw,
      };
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

  if (typeof rawStoredValue === 'undefined' && typeof rawGetter === 'function') {
    rawStoredValue = readRawStorageValue(storage, key, rawGetter);
  }

  if (
    (primaryRaw === null || primaryRaw === undefined)
    && (rawStoredValue === null || rawStoredValue === undefined)
  ) {
    clearCachedStorageEntry(storage, key);
  }

  const cachedPrimary = tryGetCachedStorageValue(storage, key, primaryRaw, rawStoredValue);
  if (cachedPrimary.hit) {
    return cachedPrimary.value;
  }

  const primary = parseRawValue(primaryRaw, '');
  if (primary.ok) {
    const normalizedForCache = typeof primary.normalizedRaw === 'string' && primary.normalizedRaw
      ? primary.normalizedRaw
      : typeof primary.raw === 'string' && primary.raw
        ? primary.raw
        : null;
    const rawForCache = typeof rawStoredValue === 'string' && rawStoredValue
      ? rawStoredValue
      : typeof primary.raw === 'string' && primary.raw
        ? primary.raw
        : null;
    cacheStorageValue(storage, key, rawForCache, normalizedForCache, primary.value);
    return primary.value;
  }

  const missingPrimary = !primary.ok && primary.reason === 'missing';

  const attemptMigrationBackupRecovery = () => {
    if (!migrationBackupCandidates.length) {
      return { success: false, shouldAlert: false };
    }

    for (let i = 0; i < migrationBackupCandidates.length; i += 1) {
      const candidateKey = migrationBackupCandidates[i];
      let migrationRaw = null;
      let migrationRawStored;

      try {
        migrationRaw = storage.getItem(candidateKey);
      } catch (migrationReadError) {
        console.error(`${errorMessage} (migration backup read)`, migrationReadError);
        downgradeSafeLocalStorageToMemory('read access', migrationReadError, storage);
        return { success: false, shouldAlert: true };
      }

      if (typeof rawGetter === 'function') {
        migrationRawStored = readRawStorageValue(storage, candidateKey, rawGetter);
      }

      if (
        (migrationRaw === null || migrationRaw === undefined)
        && (migrationRawStored === null || migrationRawStored === undefined)
      ) {
        clearCachedStorageEntry(storage, candidateKey);
        continue;
      }

      const rawSource = migrationRaw !== null && migrationRaw !== undefined
        ? migrationRaw
        : migrationRawStored;

      const entry = { key: candidateKey, value: rawSource, type: 'migration-backup' };
      const extracted = extractSnapshotStoredValue(entry);

      if (typeof extracted === 'undefined') {
        continue;
      }

      let candidateValue = extracted;
      if (typeof candidateValue === 'string') {
        const trimmed = candidateValue.trim();
        if (trimmed) {
          try {
            candidateValue = JSON.parse(trimmed);
          } catch (parseError) {
            void parseError;
          }
        } else {
          candidateValue = '';
        }
      }

      if (typeof validate === 'function' && !validate(candidateValue)) {
        console.warn(`Ignored migration backup for ${key} because it failed validation.`);
        continue;
      }

      const migrationRawForCache = typeof migrationRawStored === 'string' && migrationRawStored
        ? migrationRawStored
        : typeof rawSource === 'string' && rawSource
          ? rawSource
          : null;
      const normalizedMigrationRaw = typeof rawSource === 'string' && rawSource
        ? rawSource
        : typeof migrationRawStored === 'string' && migrationRawStored
          ? migrationRawStored
          : null;
      cacheStorageValue(
        storage,
        candidateKey,
        migrationRawForCache,
        normalizedMigrationRaw,
        candidateValue,
      );

      let serializedCandidate = null;
      try {
        serializedCandidate = JSON.stringify(candidateValue);
      } catch (serializationError) {
        console.warn(`Unable to serialize recovered migration backup for ${key}`, serializationError);
        serializedCandidate = null;
      }

      let restoredRawValue = null;
      let shouldEscalate = false;

      if (serializedCandidate !== null) {
        let payloadToStore = serializedCandidate;
        const recompressed = typeof serializedCandidate === 'string'
          ? createCompressedJsonStorageCandidate(serializedCandidate)
          : null;
        if (recompressed && typeof recompressed.serialized === 'string') {
          payloadToStore = recompressed.serialized;
        }

        try {
          storage.setItem(key, payloadToStore);
          restoredRawValue = payloadToStore;
        } catch (restoreError) {
          console.warn(`Unable to restore primary copy for ${key} from migration backup`, restoreError);
          downgradeSafeLocalStorageToMemory('write access', restoreError, storage);
          shouldEscalate = true;
        }
      } else {
        shouldEscalate = true;
      }

      if (restoredRawValue !== null) {
        cacheStorageValue(storage, key, restoredRawValue, serializedCandidate, candidateValue);
      } else if (serializedCandidate !== null) {
        cacheStorageValue(storage, key, serializedCandidate, serializedCandidate, candidateValue);
      } else {
        cacheStorageValue(storage, key, null, null, candidateValue);
      }

      console.warn(
        restoredRawValue !== null
          ? `Recovered ${key} from migration backup copy.`
          : `Recovered ${key} from migration backup copy but could not rewrite the primary entry.`,
      );

      return { success: true, value: candidateValue, shouldAlert: shouldEscalate };
    }

    return { success: false, shouldAlert: false };
  };

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

    const backupRawStored = typeof rawGetter === 'function'
      ? readRawStorageValue(storage, fallbackKey, rawGetter)
      : undefined;
    const backup = parseRawValue(backupRaw, 'backup');
    if (backup.ok) {
      if (shouldAlert || missingPrimary) {
        console.warn(`Recovered ${key} from backup copy.`);
      }
      if (backup.raw !== null && backup.raw !== undefined) {
        let restoredRawValue = null;
        try {
          if (typeof backup.raw === 'string') {
            const recompressSource = typeof backup.normalizedRaw === 'string'
              && backup.normalizedRaw
              ? backup.normalizedRaw
              : backup.raw;
            const recompressed = createCompressedJsonStorageCandidate(recompressSource);
            if (recompressed && typeof recompressed.serialized === 'string') {
              storage.setItem(key, recompressed.serialized);
              restoredRawValue = recompressed.serialized;
            } else if (recompressSource !== backup.raw) {
              storage.setItem(key, recompressSource);
              restoredRawValue = recompressSource;
            } else {
              storage.setItem(key, backup.raw);
              restoredRawValue = backup.raw;
            }
          } else {
            storage.setItem(key, backup.raw);
            restoredRawValue = typeof backup.raw === 'string' ? backup.raw : null;
          }
        } catch (restoreError) {
          console.warn(`Unable to restore primary copy for ${key} from backup`, restoreError);
          restoredRawValue = null;
        }

        const normalizedBackup = typeof backup.normalizedRaw === 'string' && backup.normalizedRaw
          ? backup.normalizedRaw
          : typeof backup.raw === 'string' && backup.raw
            ? backup.raw
            : null;
        const fallbackRawForCache = typeof backupRawStored === 'string' && backupRawStored
          ? backupRawStored
          : typeof backup.raw === 'string' && backup.raw
            ? backup.raw
            : null;
        cacheStorageValue(storage, fallbackKey, fallbackRawForCache, normalizedBackup, backup.value);
        if (typeof restoredRawValue === 'string' && restoredRawValue) {
          cacheStorageValue(storage, key, restoredRawValue, normalizedBackup, backup.value);
        }
      }
      return backup.value;
    }
  }

  const shouldAttemptMigrationBackup =
    migrationBackupCandidates.length > 0
    && (missingPrimary || restoreIfMissing || shouldAlert);

  if (shouldAttemptMigrationBackup) {
    const migrationRecovery = attemptMigrationBackupRecovery();
    if (migrationRecovery.success) {
      if (migrationRecovery.shouldAlert) {
        shouldAlert = true;
      }
      return migrationRecovery.value;
    }
    if (migrationRecovery.shouldAlert) {
      shouldAlert = true;
    }
  }

  if (shouldAlert) {
    alertStorageError(alertOnFailure);
  }

  clearCachedStorageEntry(storage, key);
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

  const {
    disableBackup = false,
    backupKey,
    onQuotaExceeded,
    enableCompressionSweep = true,
    disableCompression = false,
    forceCompressionOnQuota = false,
  } = options || {};
  const fallbackKey = typeof backupKey === 'string' && backupKey
    ? backupKey
    : `${key}${STORAGE_BACKUP_SUFFIX}`;
  const useBackup = !disableBackup && fallbackKey && fallbackKey !== key;
  const compressionBlocked = Boolean(disableCompression);
  const allowQuotaCompression = forceCompressionOnQuota === true;

  const rawGetter = getRawStorageGetter(storage);
  const loadRawValue = (targetKey) => readRawStorageValue(storage, targetKey, rawGetter);

  let standardSerializedCache;
  let standardSerializationComputed = false;
  let compressionCandidate;
  let useCompressedSerialization = false;
  let compressionAttempted = false;
  let compressionLogged = false;

  const resetSerializationState = () => {
    standardSerializedCache = undefined;
    standardSerializationComputed = false;
    compressionCandidate = undefined;
    useCompressedSerialization = false;
    compressionAttempted = false;
    compressionLogged = false;
  };

  const computeStandardSerialized = () => {
    if (standardSerializationComputed) {
      return standardSerializedCache;
    }
    standardSerializationComputed = true;
    try {
      standardSerializedCache = JSON.stringify(value);
    } catch (serializationError) {
      standardSerializedCache = null;
      console.error(errorMessage, serializationError);
      alertStorageError();
    }
    return standardSerializedCache;
  };

  const computeCompressedSerialized = () => {
    if (compressionCandidate !== undefined) {
      return compressionCandidate && typeof compressionCandidate.serialized === 'string'
        ? compressionCandidate.serialized
        : null;
    }

    const baseline = computeStandardSerialized();
    if (typeof baseline !== 'string' || !baseline) {
      compressionCandidate = null;
      return null;
    }

    const candidate = createCompressedJsonStorageCandidate(baseline);
    if (!candidate || typeof candidate.serialized !== 'string') {
      compressionCandidate = null;
      return null;
    }

    compressionCandidate = candidate;
    return candidate.serialized;
  };

  const getSerializedForAttempt = () => {
    if (useCompressedSerialization) {
      const compressed = computeCompressedSerialized();
      if (typeof compressed === 'string') {
        return compressed;
      }
      useCompressedSerialization = false;
    }

    const standard = computeStandardSerialized();
    if (typeof standard === 'string') {
      return standard;
    }
    return null;
  };

  const tryEnableCompression = ({ force = false } = {}) => {
    const forcing = force && allowQuotaCompression;
    if (compressionBlocked && !forcing) {
      compressionAttempted = true;
      return false;
    }
    if (useCompressedSerialization) {
      return false;
    }
    if (compressionAttempted && !forcing) {
      return false;
    }
    compressionAttempted = true;
    const baseline = computeStandardSerialized();
    if (typeof baseline !== 'string' || !baseline) {
      return false;
    }
    const compressed = computeCompressedSerialized();
    if (typeof compressed !== 'string' || !compressed) {
      return false;
    }
    if (compressed.length >= baseline.length) {
      return false;
    }
    useCompressedSerialization = true;
    return true;
  };

  const logCompressionIfNeeded = () => {
    if (!useCompressedSerialization || !compressionCandidate || compressionLogged) {
      return;
    }

    const { originalLength, wrappedLength } = compressionCandidate;
    if (
      typeof originalLength === 'number'
      && typeof wrappedLength === 'number'
      && wrappedLength < originalLength
      && typeof console !== 'undefined'
      && typeof console.warn === 'function'
    ) {
      const savings = originalLength - wrappedLength;
      const percent = originalLength > 0 ? Math.round((savings / originalLength) * 100) : 0;
      console.warn(
        `Stored compressed value for ${key} to reduce storage usage by ${savings} characters (${percent}%).`,
      );
    }

    compressionLogged = true;
  };

  const maybeEnableProactiveCompression = () => {
    if (compressionBlocked) {
      compressionAttempted = true;
      return;
    }
    if (useCompressedSerialization || compressionAttempted) {
      return;
    }

    const baseline = computeStandardSerialized();
    if (typeof baseline !== 'string' || !baseline) {
      return;
    }

    if (baseline.length < STORAGE_PROACTIVE_COMPRESSION_MIN_LENGTH) {
      return;
    }

    const compressed = computeCompressedSerialized();
    if (typeof compressed !== 'string' || !compressed) {
      return;
    }

    const savings = baseline.length - compressed.length;
    if (savings < STORAGE_PROACTIVE_COMPRESSION_MIN_SAVINGS) {
      return;
    }

    const ratio = baseline.length > 0 ? savings / baseline.length : 0;
    if (ratio < STORAGE_PROACTIVE_COMPRESSION_MIN_RATIO) {
      return;
    }

    const rawExisting = loadRawValue(key);
    if (typeof rawExisting === 'string' && rawExisting === compressed) {
      return;
    }

    useCompressedSerialization = true;
    compressionAttempted = true;
  };

  let preservedBackupValue;
  let hasPreservedBackup = false;
  let removedBackupDuringRetry = false;
  let quotaRecoverySteps = 0;
  let quotaRecoveryFailed = false;
  let compressionSweepAttempted = false;

  maybeEnableProactiveCompression();

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
    if (!isQuotaExceededError(error)) {
      return false;
    }

    if (typeof onQuotaExceeded === 'function') {
      try {
        if (
          onQuotaExceeded(error, {
            storage,
            key,
            value,
            ...context,
          }) === true
        ) {
          return true;
        }
      } catch (handlerError) {
        const scope = context && context.isBackup ? ' (backup)' : '';
        console.error(`Error while handling quota exceed for ${key}${scope}`, handlerError);
      }
    }

    if (compressionSweepAttempted || enableCompressionSweep === false) {
      return false;
    }

    compressionSweepAttempted = true;
    const skipKeys = [key];
    if (useBackup && typeof fallbackKey === 'string' && fallbackKey && fallbackKey !== key) {
      skipKeys.push(fallbackKey);
    }
    if (context && typeof context.backupKey === 'string' && context.backupKey) {
      skipKeys.push(context.backupKey);
    }

    const sweepResult = attemptStorageCompressionSweep(storage, { skipKeys });
    return Boolean(sweepResult && sweepResult.success);
  };

  let attempts = 0;
  while (attempts < MAX_SAVE_ATTEMPTS) {
    attempts += 1;

    const serialized = getSerializedForAttempt();
    if (typeof serialized !== 'string') {
      return;
    }

    const normalizedSerialized = computeStandardSerialized();
    const normalizedString = typeof normalizedSerialized === 'string' && normalizedSerialized
      ? normalizedSerialized
      : null;

    let skipPrimaryWrite = false;
    let existingBackupValue;
    let hasExistingBackup = false;
    let existingBackupRaw = null;
    let observedPrimaryRawValue = null;
    let observedBackupRawValue = null;

    if (typeof storage.getItem === 'function') {
      try {
        const existingValue = storage.getItem(key);
        if (existingValue === serialized) {
          skipPrimaryWrite = true;
          observedPrimaryRawValue = serialized;
        } else if (useCompressedSerialization) {
          const existingRawValue = loadRawValue(key);
          if (typeof existingRawValue === 'string') {
            observedPrimaryRawValue = existingRawValue;
            if (existingRawValue === serialized) {
              skipPrimaryWrite = true;
            }
          }
        } else if (typeof existingValue === 'string') {
          observedPrimaryRawValue = existingValue;
        }
      } catch (inspectError) {
        console.warn(`Unable to inspect existing value for ${key}`, inspectError);
      }
    }

    if (useBackup && typeof storage.getItem === 'function') {
      try {
        existingBackupValue = storage.getItem(fallbackKey);
        hasExistingBackup = typeof existingBackupValue === 'string';
        if (hasExistingBackup && useCompressedSerialization) {
          existingBackupRaw = loadRawValue(fallbackKey);
          if (typeof existingBackupRaw === 'string') {
            observedBackupRawValue = existingBackupRaw;
          }
        } else if (hasExistingBackup) {
          observedBackupRawValue = existingBackupValue;
        }
      } catch (inspectError) {
        console.warn(`Unable to inspect existing backup for ${key}`, inspectError);
      }
    }

    if (!hasPreservedBackup && hasExistingBackup && typeof existingBackupValue === 'string') {
      preservedBackupValue = existingBackupValue;
      hasPreservedBackup = true;
    }

    const backupCandidates = (() => {
      if (!useBackup) {
        return [];
      }

      const candidates = [];

      if (useCompressedSerialization) {
        const standardSerialized = computeStandardSerialized();
        if (typeof standardSerialized === 'string' && standardSerialized) {
          candidates.push({ serialized: standardSerialized, compressed: false });
        }

        if (
          typeof serialized === 'string'
          && serialized
          && (!candidates.length || candidates[candidates.length - 1].serialized !== serialized)
        ) {
          candidates.push({ serialized, compressed: true });
        }
      } else if (typeof serialized === 'string' && serialized) {
        candidates.push({ serialized, compressed: false });
      }

      return candidates;
    })();

    const preferredBackupCandidate = backupCandidates.length ? backupCandidates[0] : null;

    const backupMatchesPreferred = hasExistingBackup
      && preferredBackupCandidate
      && typeof preferredBackupCandidate.serialized === 'string'
      && (
        existingBackupValue === preferredBackupCandidate.serialized
        || (
          typeof existingBackupRaw === 'string'
          && existingBackupRaw === preferredBackupCandidate.serialized
        )
      );

    if (skipPrimaryWrite && (!useBackup || backupMatchesPreferred)) {
      if (normalizedString) {
        const rawForCacheUpdate = useCompressedSerialization
          ? (typeof observedPrimaryRawValue === 'string' && observedPrimaryRawValue
            ? observedPrimaryRawValue
            : serialized)
          : serialized;
        cacheStorageValue(storage, key, rawForCacheUpdate, normalizedString, value);
        if (useBackup && hasExistingBackup) {
          const backupRawForCache = useCompressedSerialization
            ? (typeof existingBackupRaw === 'string' && existingBackupRaw
              ? existingBackupRaw
              : observedBackupRawValue)
            : observedBackupRawValue;
          if (typeof backupRawForCache === 'string' && backupRawForCache) {
            cacheStorageValue(storage, fallbackKey, backupRawForCache, normalizedString, value);
          }
        }
      }
      return;
    }

    if (!skipPrimaryWrite) {
      try {
        storage.setItem(key, serialized);
        logCompressionIfNeeded();
        if (normalizedString) {
          cacheStorageValue(storage, key, serialized, normalizedString, value);
        }
      } catch (error) {
        if (attemptHandleQuota(error)) {
          resetSerializationState();
          if (!registerQuotaRecoveryStep()) {
            break;
          }
          if (attempts > 0) {
            attempts -= 1;
          }
          continue;
        }
        if (!quotaRecoveryFailed && tryEnableCompression({ force: allowQuotaCompression })) {
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

    if (backupMatchesPreferred) {
      if (normalizedString && hasExistingBackup) {
        const backupRawForCache = useCompressedSerialization
          ? (typeof existingBackupRaw === 'string' && existingBackupRaw
            ? existingBackupRaw
            : observedBackupRawValue)
          : observedBackupRawValue;
        if (typeof backupRawForCache === 'string' && backupRawForCache) {
          cacheStorageValue(storage, fallbackKey, backupRawForCache, normalizedString, value);
        }
      }
      return;
    }

    const attemptBackupWrite = () => {
      const candidates = backupCandidates.length
        ? backupCandidates
        : [{ serialized, compressed: useCompressedSerialization }];

      let backupError = null;
      let backupRemovedForRetry = false;
      let lastCandidate = null;

      const tryStoreCandidate = (candidate) => {
        try {
          storage.setItem(fallbackKey, candidate.serialized);
          if (candidate.compressed) {
            logCompressionIfNeeded();
          }
          removedBackupDuringRetry = false;
          return true;
        } catch (error) {
          backupError = error;
          return false;
        }
      };

      for (let index = 0; index < candidates.length; index += 1) {
        const candidate = candidates[index];
        lastCandidate = candidate;

        if (tryStoreCandidate(candidate)) {
          if (normalizedString) {
            const normalizedForBackup = candidate.compressed && normalizedString
              ? normalizedString
              : candidate.serialized;
            cacheStorageValue(storage, fallbackKey, candidate.serialized, normalizedForBackup, value);
          }
          return 'success';
        }

        if (!isQuotaExceededError(backupError)) {
          break;
        }

        if (!backupRemovedForRetry && hasExistingBackup) {
          try {
            storage.removeItem(fallbackKey);
            clearCachedStorageEntry(storage, fallbackKey);
            backupRemovedForRetry = true;
            removedBackupDuringRetry = true;
            hasExistingBackup = false;
            if (tryStoreCandidate(candidate)) {
              if (normalizedString) {
                const normalizedForBackup = candidate.compressed && normalizedString
                  ? normalizedString
                  : candidate.serialized;
                cacheStorageValue(storage, fallbackKey, candidate.serialized, normalizedForBackup, value);
              }
              return 'success';
            }
          } catch (removeError) {
            console.warn(`Unable to remove previous backup for ${key}`, removeError);
          }
        }
      }

      if (isQuotaExceededError(backupError)) {
        if (attemptHandleQuota(backupError, {
          serialized: lastCandidate && typeof lastCandidate.serialized === 'string'
            ? lastCandidate.serialized
            : serialized,
          backupKey: fallbackKey,
          isBackup: true,
        })) {
          resetSerializationState();
          if (!registerQuotaRecoveryStep()) {
            return 'failure';
          }
          return 'retry';
        }

        if (!quotaRecoveryFailed && tryEnableCompression({ force: allowQuotaCompression })) {
          resetSerializationState();
          if (!registerQuotaRecoveryStep()) {
            return 'failure';
          }
          return 'retry';
        }
      }

      if (backupRemovedForRetry && typeof existingBackupValue === 'string') {
        try {
          storage.setItem(fallbackKey, existingBackupValue);
          if (normalizedString) {
            cacheStorageValue(storage, fallbackKey, existingBackupValue, normalizedString, value);
          }
          removedBackupDuringRetry = false;
        } catch (restoreError) {
          console.warn(`Unable to restore previous backup for ${key}`, restoreError);
        }
      }

      console.warn(`Unable to update backup copy for ${key}`, backupError);
      alertStorageError();
      return 'failure';
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
      clearCachedStorageEntry(storage, fallbackKey);
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

  clearCachedStorageEntry(storage, key);
  if (useBackup) {
    clearCachedStorageEntry(storage, fallbackKey);
  }

  if (key === PROJECT_STORAGE_KEY) {
    invalidateProjectReadCache();
  }

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

var UI_CACHE_STORAGE_KEYS = [
  DEVICE_SCHEMA_CACHE_KEY,
  LEGACY_SCHEMA_CACHE_KEY,
];

var UI_CACHE_STORAGE_ACCESS_WARNINGS = new Set();

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

function ensureImportedProjectBaseName(rawName) {
  const trimmed = typeof rawName === "string" ? rawName.trim() : "";
  if (!trimmed) {
    return "Project-imported";
  }
  if (trimmed.toLowerCase().endsWith("-imported")) {
    return trimmed;
  }
  return `${trimmed}-imported`;
}

function generateImportedProjectName(baseName, usedNames, normalizedNames) {
  const normalized = normalizedNames
    || new Set(
      [...usedNames]
        .map((name) => (typeof name === "string" ? name.trim().toLowerCase() : ""))
        .filter((name) => name),
    );
  const base = ensureImportedProjectBaseName(baseName);
  let candidate = base.trim();
  if (!candidate) {
    candidate = "Project-imported";
  }
  let normalizedCandidate = candidate.toLowerCase();
  let suffix = 2;
  while (normalizedCandidate && normalized.has(normalizedCandidate)) {
    candidate = `${base}-${suffix++}`;
    normalizedCandidate = candidate.trim().toLowerCase();
  }
  usedNames.add(candidate);
  if (normalizedCandidate) {
    normalized.add(normalizedCandidate);
  }
  return candidate;
}

function ensureUpdatedProjectBaseName(rawName) {
  const trimmed = typeof rawName === "string" ? rawName.trim() : "";
  if (!trimmed) {
    return "Project-updated";
  }
  if (trimmed.toLowerCase().endsWith("-updated")) {
    return trimmed;
  }
  return `${trimmed}-updated`;
}

function generateUpdatedProjectName(baseName, usedNames, normalizedNames) {
  const normalized = normalizedNames || new Set(
    [...usedNames]
      .map((name) => (typeof name === "string" ? name.trim().toLowerCase() : ""))
      .filter((name) => name),
  );
  const base = ensureUpdatedProjectBaseName(baseName);
  let candidate = base;
  let suffix = 2;
  let normalizedCandidate = candidate.trim().toLowerCase();
  while (normalizedCandidate && normalized.has(normalizedCandidate)) {
    candidate = `${base}-${suffix++}`;
    normalizedCandidate = candidate.trim().toLowerCase();
  }
  return candidate;
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

  const normalizedState = normalizeLegacyLongGopStructure(state);
  if (normalizedState !== state) {
    return { state: normalizedState, changed: true };
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
  const normalizedState = normalizeLegacyLongGopStructure(state);
  saveJSONToStorage(
    safeStorage,
    SESSION_STATE_KEY,
    normalizedState,
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
      const normalizedValue = normalizeLegacyLongGopStructure(value);
      if (normalizedValue !== value) {
        changed = true;
      }
      normalized[name] = normalizedValue;
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

  try {
    return expandAutoBackupEntries(setups, {
      isAutoBackupKey: (name) => typeof name === 'string'
        && name.startsWith(STORAGE_AUTO_BACKUP_NAME_PREFIX),
    });
  } catch (error) {
    console.warn('Failed to expand automatic backup entries while loading setups', error);
    return cloneAutoBackupValue(setups);
  }
}

function saveSetups(setups) {
  const { data: normalizedSetups } = normalizeSetups(setups);
  enforceAutoBackupLimits(normalizedSetups);
  const serializedSetups = serializeAutoBackupEntries(normalizedSetups, {
    isAutoBackupKey: (name) => typeof name === 'string'
      && name.startsWith(STORAGE_AUTO_BACKUP_NAME_PREFIX),
  });
  const safeStorage = getSafeLocalStorage();
  ensurePreWriteMigrationBackup(safeStorage, SETUP_STORAGE_KEY);
  saveJSONToStorage(
    safeStorage,
    SETUP_STORAGE_KEY,
    serializedSetups,
    "Error saving setups to localStorage:",
    {
      onQuotaExceeded: () => {
        const removedKey = removeOldestAutoBackupEntry(serializedSetups);
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
    const movedValue = setups[oldName];
    setups[target] = movedValue;
    delete setups[oldName];
    const wasAutoBackup = typeof oldName === 'string'
      && oldName.startsWith(STORAGE_AUTO_BACKUP_NAME_PREFIX);
    const targetIsAutoBackup = typeof target === 'string'
      && target.startsWith(STORAGE_AUTO_BACKUP_NAME_PREFIX);
    if (wasAutoBackup && targetIsAutoBackup) {
      markAutoBackupValueAsRenamed(movedValue);
    }
    return { result: target, changed: true };
  });
}

// --- Project Storage ---
var REQUIREMENT_FIELDS_KEEP_NEWLINES = new Set(['prepDays', 'shootingDays', 'crew']);

var LEGACY_PROJECT_FIELD_LABELS = {
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

var LEGACY_PROJECT_LABEL_FIELD_MAP = (() => {
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

var HTML_ENTITY_MAP = {
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
    return STORAGE_DEEP_CLONE(projectInfo);
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
  if (!Object.keys(normalized).length) {
    return null;
  }

  const normalizedWithLegacySupport = normalizeLegacyLongGopStructure(normalized);
  return normalizedWithLegacySupport;
}

function cloneAutoGearRules(rules) {
  if (!Array.isArray(rules) || !rules.length) {
    return null;
  }
  try {
    return STORAGE_DEEP_CLONE(rules);
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
    return STORAGE_DEEP_CLONE(positions);
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

function normalizeProjectPowerSelection(raw) {
  if (raw == null) {
    return null;
  }
  const normalizeString = (value) => {
    if (typeof value === "string") {
      return value.trim();
    }
    if (value === null || value === undefined) {
      return "";
    }
    if (typeof value === "number" || typeof value === "boolean") {
      return String(value);
    }
    return "";
  };
  if (!isPlainObject(raw)) {
    return null;
  }
  const normalized = {
    batteryPlate: normalizeString(raw.batteryPlate),
    battery: normalizeString(raw.battery),
    batteryHotswap: normalizeString(raw.batteryHotswap),
  };
  const hasValue = Object.keys(normalized).some((key) => normalized[key]);
  return hasValue ? normalized : null;
}

function cloneProjectPowerSelection(selection) {
  const normalized = normalizeProjectPowerSelection(selection);
  if (!normalized) {
    return null;
  }
  return {
    batteryPlate: normalized.batteryPlate,
    battery: normalized.battery,
    batteryHotswap: normalized.batteryHotswap,
  };
}

function normalizeProject(data) {
  if (typeof data === "string") {
    const parsed = tryParseJSONLike(data);
    if (parsed.success) {
      const normalized = normalizeProject(parsed.parsed);
      if (normalized) {
        return normalized;
      }
    }
    return normalizeProject({ gearList: data, projectInfo: null });
  }
  if (isMapLike(data)) {
    const converted = convertMapLikeToObject(data);
    if (converted) {
      return normalizeProject(converted);
    }
    return null;
  }
  if (isPlainObject(data)) {
    // New format { gearList, projectInfo }
    if (Object.prototype.hasOwnProperty.call(data, "gearList") || Object.prototype.hasOwnProperty.call(data, "projectInfo")) {
      const projectContainer = isMapLike(data.project)
        ? convertMapLikeToObject(data.project)
        : data.project;

      let projectInfoSource = data.projectInfo;
      if (isMapLike(projectInfoSource)) {
        projectInfoSource = convertMapLikeToObject(projectInfoSource);
      }

      let normalizedProjectInfo = isPlainObject(projectInfoSource)
        ? projectInfoSource
        : null;
      if (!normalizedProjectInfo && typeof projectInfoSource === "string") {
        const parsedInfo = tryParseJSONLike(projectInfoSource);
        if (parsedInfo.success && isPlainObject(parsedInfo.parsed)) {
          normalizedProjectInfo = parsedInfo.parsed;
        }
      }
      if (!normalizedProjectInfo && isPlainObject(projectContainer)) {
        let nestedProjectInfo = projectContainer.projectInfo;
        if (isMapLike(nestedProjectInfo)) {
          nestedProjectInfo = convertMapLikeToObject(nestedProjectInfo);
        }
        if (isPlainObject(nestedProjectInfo)) {
          normalizedProjectInfo = nestedProjectInfo;
        } else if (typeof nestedProjectInfo === "string") {
          const parsedProjectInfo = tryParseJSONLike(nestedProjectInfo);
          if (parsedProjectInfo.success && isPlainObject(parsedProjectInfo.parsed)) {
            normalizedProjectInfo = parsedProjectInfo.parsed;
          }
        }
      }

      let normalizedAutoGearRules = null;
      const assignAutoGearRules = (source) => {
        if (normalizedAutoGearRules && normalizedAutoGearRules.length) {
          return;
        }
        if (source === null || source === undefined) {
          return;
        }
        let candidate = source;
        if (isMapLike(candidate)) {
          const convertedRules = convertMapLikeToObject(candidate);
          if (convertedRules) {
            candidate = Object.values(convertedRules).filter((entry) => entry !== null && entry !== undefined);
          }
        }
        if (Array.isArray(candidate) && candidate.length) {
          normalizedAutoGearRules = candidate;
          return;
        }
        if (isPlainObject(candidate)) {
          const values = Object.values(candidate).filter((entry) => entry !== null && entry !== undefined);
          if (values.length) {
            normalizedAutoGearRules = values;
            return;
          }
        }
        if (typeof candidate === "string") {
          const parsedRules = tryParseJSONLike(candidate);
          if (parsedRules.success && Array.isArray(parsedRules.parsed) && parsedRules.parsed.length) {
            normalizedAutoGearRules = parsedRules.parsed;
          }
        }
      };

      assignAutoGearRules(data.autoGearRules);
      if (!normalizedAutoGearRules && isPlainObject(projectContainer)) {
        assignAutoGearRules(projectContainer.autoGearRules);
      }

      let gearListSource = isMapLike(data.gearList)
        ? convertMapLikeToObject(data.gearList)
        : data.gearList;
      if (
        (gearListSource === null
          || gearListSource === undefined
          || (typeof gearListSource === "string" && !gearListSource))
        && isPlainObject(projectContainer)
        && Object.prototype.hasOwnProperty.call(projectContainer, "gearList")
      ) {
        gearListSource = projectContainer.gearList;
      }
      if (isMapLike(gearListSource)) {
        const convertedGearList = convertMapLikeToObject(gearListSource);
        if (convertedGearList) {
          gearListSource = convertedGearList;
        }
      }

      let normalizedGearList =
        typeof gearListSource === "string" || (gearListSource && typeof gearListSource === "object")
          ? gearListSource
          : "";

      let normalizedGearSelectors = null;
      const gearSelectorsSource = isMapLike(data.gearSelectors)
        ? convertMapLikeToObject(data.gearSelectors)
        : data.gearSelectors;
      if (isPlainObject(gearSelectorsSource)) {
        normalizedGearSelectors = cloneProjectGearSelectors(gearSelectorsSource);
      } else if (typeof gearSelectorsSource === "string") {
        const parsedSelectors = tryParseJSONLike(gearSelectorsSource);
        if (parsedSelectors.success && isPlainObject(parsedSelectors.parsed)) {
          normalizedGearSelectors = cloneProjectGearSelectors(parsedSelectors.parsed);
        }
      }
      const powerSelectionSource = isMapLike(data.powerSelection)
        ? convertMapLikeToObject(data.powerSelection)
        : data.powerSelection;
      let normalizedPowerSelection = normalizeProjectPowerSelection(powerSelectionSource);
      if (!normalizedPowerSelection && isPlainObject(powerSelectionSource)) {
        normalizedPowerSelection = normalizeProjectPowerSelection(powerSelectionSource);
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
            if (!normalizedPowerSelection && isPlainObject(nested.powerSelection)) {
              normalizedPowerSelection = normalizeProjectPowerSelection(nested.powerSelection);
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
      const diagramSource = isMapLike(data.diagramPositions)
        ? convertMapLikeToObject(data.diagramPositions)
        : data.diagramPositions;
      let normalizedDiagramPositions = normalizeDiagramPositions(diagramSource);
      if (
        Object.keys(normalizedDiagramPositions).length === 0
        && isPlainObject(projectContainer)
      ) {
        const nestedDiagramSource = isMapLike(projectContainer.diagramPositions)
          ? convertMapLikeToObject(projectContainer.diagramPositions)
          : projectContainer.diagramPositions;
        normalizedDiagramPositions = normalizeDiagramPositions(nestedDiagramSource);
      }
      if (Object.keys(normalizedDiagramPositions).length) {
        normalized.diagramPositions = cloneDiagramPositionsForStorage(normalizedDiagramPositions);
      }
      const htmlSources = [];
      if (typeof data.projectHtml === 'string') {
        htmlSources.push(data.projectHtml);
      }
      if (typeof data.gearHtml === 'string') {
        htmlSources.push(data.gearHtml);
      }
      if (isPlainObject(projectContainer)) {
        if (typeof projectContainer.projectHtml === 'string') {
          htmlSources.push(projectContainer.projectHtml);
        }
        if (typeof projectContainer.gearHtml === 'string') {
          htmlSources.push(projectContainer.gearHtml);
        }
      }
      if (isPlainObject(gearListSource) && typeof gearListSource.gearHtml === 'string') {
        htmlSources.push(gearListSource.gearHtml);
      }
      if (isPlainObject(normalizedGearList)) {
        if (typeof normalizedGearList.projectHtml === 'string') {
          htmlSources.push(normalizedGearList.projectHtml);
        }
        if (typeof normalizedGearList.gearHtml === 'string') {
          htmlSources.push(normalizedGearList.gearHtml);
        }
      } else if (typeof normalizedGearList === 'string') {
        htmlSources.push(normalizedGearList);
      }
      if (!normalizedGearSelectors && isPlainObject(projectContainer)) {
        const nestedSelectorsSource = isMapLike(projectContainer.gearSelectors)
          ? convertMapLikeToObject(projectContainer.gearSelectors)
          : projectContainer.gearSelectors;
        if (isPlainObject(nestedSelectorsSource)) {
          normalizedGearSelectors = cloneProjectGearSelectors(nestedSelectorsSource);
        }
      }
      if (!normalizedGearSelectors && isPlainObject(normalizedGearList) && isPlainObject(normalizedGearList.gearSelectors)) {
        normalizedGearSelectors = cloneProjectGearSelectors(normalizedGearList.gearSelectors);
      }
      if (!normalizedPowerSelection && isPlainObject(projectContainer)) {
        const nestedPowerSelection = isMapLike(projectContainer.powerSelection)
          ? convertMapLikeToObject(projectContainer.powerSelection)
          : projectContainer.powerSelection;
        if (isPlainObject(nestedPowerSelection)) {
          normalizedPowerSelection = normalizeProjectPowerSelection(nestedPowerSelection);
        }
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
      const derivedGenerationFlag = typeof data.gearListAndProjectRequirementsGenerated === 'boolean'
        ? data.gearListAndProjectRequirementsGenerated
        : htmlSources.some((value) => typeof value === 'string' && value.trim());
      normalized.gearListAndProjectRequirementsGenerated = derivedGenerationFlag;
      if (normalizedAutoGearRules && normalizedAutoGearRules.length) {
        normalized.autoGearRules = cloneAutoGearRules(normalizedAutoGearRules);
      }
      if (normalizedGearSelectors && Object.keys(normalizedGearSelectors).length) {
        normalized.gearSelectors = normalizedGearSelectors;
      }
      if (normalizedPowerSelection) {
        normalized.powerSelection = cloneProjectPowerSelection(normalizedPowerSelection);
      }
      copyAutoBackupMetadata(data, normalized);
      if (normalized.projectInfo) {
        const normalizedInfo = normalizeLegacyLongGopStructure(normalized.projectInfo);
        if (normalizedInfo !== normalized.projectInfo) {
          normalized.projectInfo = normalizedInfo;
        }
      }
      if (normalized.autoGearRules) {
        const normalizedRules = normalizeLegacyLongGopStructure(normalized.autoGearRules);
        if (normalizedRules !== normalized.autoGearRules) {
          normalized.autoGearRules = normalizedRules;
        }
      }
      if (normalized.gearSelectors) {
        const normalizedSelectors = normalizeLegacyLongGopStructure(normalized.gearSelectors);
        if (normalizedSelectors !== normalized.gearSelectors) {
          normalized.gearSelectors = normalizedSelectors;
        }
      }
      if (normalized.diagramPositions) {
        const normalizedDiagram = normalizeLegacyLongGopStructure(normalized.diagramPositions);
        if (normalizedDiagram !== normalized.diagramPositions) {
          normalized.diagramPositions = normalizedDiagram;
        }
      }
      if (normalized.powerSelection) {
        const normalizedPower = normalizeLegacyLongGopStructure(normalized.powerSelection);
        if (normalizedPower !== normalized.powerSelection) {
          normalized.powerSelection = normalizedPower;
        }
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

    if (isPlainObject(data.project)) {
      const nested = normalizeProject(data.project);
      if (nested) {
        return nested;
      }
    } else if (typeof data.project === "string") {
      const parsedProject = tryParseJSONLike(data.project);
      if (parsedProject.success) {
        const nested = normalizeProject(parsedProject.parsed);
        if (nested) {
          return nested;
        }
      }
    }
  }
  return null;
}

var LEGACY_PROJECT_ROOT_KEYS = new Set([
  "gearList",
  "projectInfo",
  "projectHtml",
  "gearHtml",
  "autoGearRules",
  "powerSelection",
  "gearListAndProjectRequirementsGenerated",
]);

var NORMALIZED_PROJECT_KEYS = new Set([
  "gearList",
  "projectInfo",
  "autoGearRules",
  "diagramPositions",
  "gearSelectors",
  "powerSelection",
  "gearListAndProjectRequirementsGenerated",
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
  if (
    Object.prototype.hasOwnProperty.call(entry, "powerSelection")
  ) {
    const powerSelection = entry.powerSelection;
    if (!isPlainObject(powerSelection)) {
      return false;
    }
  }
  if (
    Object.prototype.hasOwnProperty.call(entry, "gearListAndProjectRequirementsGenerated")
    && typeof entry.gearListAndProjectRequirementsGenerated !== "boolean"
  ) {
    return false;
  }
  return true;
}

function normalizeProjectStorageKey(name) {
  if (typeof name !== "string") {
    return "";
  }
  return name.trim();
}

function resolveProjectKey(projects, lookup, name, options = {}) {
  if (!projects || typeof projects !== "object") {
    return null;
  }

  const rawName = typeof name === "string" ? name : "";
  if (Object.prototype.hasOwnProperty.call(projects, rawName)) {
    return rawName;
  }

  const normalizedName = normalizeProjectStorageKey(rawName);
  if (
    normalizedName
    && normalizedName !== rawName
    && Object.prototype.hasOwnProperty.call(projects, normalizedName)
  ) {
    return normalizedName;
  }

  if (!lookup || typeof lookup !== "object") {
    return null;
  }

  const { raw: rawMap, normalized: normalizedMap } = lookup;

  if (rawMap && typeof rawMap.get === "function" && rawMap.has(rawName)) {
    const candidate = rawMap.get(rawName);
    if (Object.prototype.hasOwnProperty.call(projects, candidate)) {
      return candidate;
    }
  }

  if (
    normalizedMap
    && typeof normalizedMap.get === "function"
    && normalizedMap.has(normalizedName)
  ) {
    const candidates = normalizedMap.get(normalizedName);
    if (Array.isArray(candidates)) {
      if (options && options.preferExact && rawName) {
        const exact = candidates.find(
          (candidate) => candidate === rawName && Object.prototype.hasOwnProperty.call(projects, candidate),
        );
        if (exact) {
          return exact;
        }
      }
      const firstExisting = candidates.find((candidate) =>
        Object.prototype.hasOwnProperty.call(projects, candidate)
      );
      if (firstExisting) {
        return firstExisting;
      }
    } else if (
      typeof candidates === "string"
      && Object.prototype.hasOwnProperty.call(projects, candidates)
    ) {
      return candidates;
    }
  }

  return null;
}

function readAllProjectsFromStorage(options = {}) {
  const { forceRefresh = false, forMutation = false } = options || {};
  applyLegacyStorageMigrations();

  if (!forceRefresh) {
    const cached = getProjectReadCacheClone({ forMutation });
    if (cached) {
      return cached;
    }
  }

  const safeStorage = getSafeLocalStorage();
  let storageRaw = null;
  if (safeStorage && typeof safeStorage.getItem === 'function') {
    try {
      storageRaw = safeStorage.getItem(PROJECT_STORAGE_KEY);
    } catch (storageReadError) {
      storageRaw = null;
      void storageReadError;
    }
  }

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
  const expandedParsed = expandAutoBackupEntries(parsed, {
    isAutoBackupKey: isAutoBackupStorageKey,
  });
  const projects = {};
  let changed = false;
  const usedProjectNames = new Set();
  const normalizedProjectNames = new Set();
  const markProjectNameUsed = (name) => {
    if (typeof name !== "string") {
      return;
    }
    usedProjectNames.add(name);
    const trimmed = name.trim();
    if (trimmed) {
      normalizedProjectNames.add(trimmed.toLowerCase());
    }
  };

  const rawKeyLookup = new Map();
  const normalizedKeyLookup = new Map();
  const registerLookupKey = (rawKey, storedKey) => {
    if (typeof rawKey !== "string") {
      return;
    }
    const effectiveKey = typeof storedKey === "string" ? storedKey : rawKey;
    rawKeyLookup.set(rawKey, effectiveKey);
    const normalized = normalizeProjectStorageKey(rawKey);
    if (!normalizedKeyLookup.has(normalized)) {
      normalizedKeyLookup.set(normalized, []);
    }
    normalizedKeyLookup.get(normalized).push(effectiveKey);
  };

  const createLookupSnapshot = () => ({
    raw: cloneLookupMap(rawKeyLookup),
    normalized: cloneLookupMap(normalizedKeyLookup),
  });

  const finalize = () => {
    const snapshot = {
      projects,
      changed,
      originalValue,
      lookup: createLookupSnapshot(),
      rawValue: storageRaw,
    };

    if (changed) {
      setProjectReadCacheSnapshot(null);
      if (forMutation) {
        return {
          projects: STORAGE_DEEP_CLONE(snapshot.projects),
          changed: snapshot.changed,
          originalValue: snapshot.originalValue,
          lookup: cloneProjectLookupSnapshotForReturn(snapshot.lookup),
        };
      }
      return snapshot;
    }

    setProjectReadCacheSnapshot(snapshot);
    const cached = getProjectReadCacheClone({ forMutation });
    return cached || snapshot;
  };

  if (expandedParsed === null || expandedParsed === undefined) {
    return finalize();
  }

  if (typeof expandedParsed === "string") {
    const normalized = normalizeProject(expandedParsed);
    if (normalized) {
      const updatedName = generateUpdatedProjectName("", usedProjectNames, normalizedProjectNames);
      projects[updatedName] = normalized;
      registerLookupKey("", updatedName);
      markProjectNameUsed(updatedName);
    }
    changed = true;
    return finalize();
  }

  if (Array.isArray(expandedParsed)) {
    const usedNames = usedProjectNames;
    const normalizedNames = normalizedProjectNames;
    expandedParsed.forEach((item, index) => {
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
      const unique = generateUpdatedProjectName(candidate, usedNames, normalizedNames);
      projects[unique] = normalized;
      registerLookupKey(candidate, unique);
      markProjectNameUsed(unique);
    });
    changed = true;
    return finalize();
  }

  if (!isPlainObject(expandedParsed)) {
    changed = true;
    return finalize();
  }

  const keys = Object.keys(expandedParsed);
  const maybeLegacy =
    keys.length > 0 && keys.every((key) => LEGACY_PROJECT_ROOT_KEYS.has(key));

  if (maybeLegacy) {
    const normalized = normalizeProject(expandedParsed);
    if (normalized) {
      const updatedName = generateUpdatedProjectName("", usedProjectNames, normalizedProjectNames);
      projects[updatedName] = normalized;
      registerLookupKey("", updatedName);
      markProjectNameUsed(updatedName);
    }
    changed = true;
    return finalize();
  }

  keys.forEach((key) => {
    if (isNormalizedProjectEntry(expandedParsed[key])) {
      const trimmedKey = typeof key === "string" ? key.trim() : "";
      if (trimmedKey) {
        normalizedProjectNames.add(trimmedKey.toLowerCase());
      }
    }
  });

  keys.forEach((key) => {
    const normalized = normalizeProject(expandedParsed[key]);
    if (normalized) {
      const originalEntry = expandedParsed[key];
      const needsUpgrade = !isNormalizedProjectEntry(originalEntry);
      let requiresContentUpdate = false;
      if (!needsUpgrade) {
        try {
          const normalizedSignature = createStableValueSignature(normalized);
          const originalSignature = createStableValueSignature(originalEntry);
          if (normalizedSignature !== originalSignature) {
            requiresContentUpdate = true;
          }
        } catch (signatureError) {
          requiresContentUpdate = true;
          console.warn(
            'Unable to compare stored project entry during legacy long-GOP normalization check',
            signatureError,
          );
        }
      }
      let finalKey = key;
      if (needsUpgrade) {
        finalKey = generateUpdatedProjectName(key, usedProjectNames, normalizedProjectNames);
        changed = true;
      }
      if (
        finalKey !== key
        && Object.prototype.hasOwnProperty.call(projects, finalKey)
      ) {
        const adjusted = generateUpdatedProjectName(finalKey, usedProjectNames, normalizedProjectNames);
        finalKey = adjusted;
      }
      projects[finalKey] = normalized;
      registerLookupKey(key, finalKey);
      markProjectNameUsed(finalKey);
      if (!needsUpgrade && requiresContentUpdate) {
        changed = true;
      }
    } else {
      changed = true;
    }
  });

  return finalize();
}

function persistAllProjects(projects) {
  const safeStorage = getSafeLocalStorage();
  enforceAutoBackupLimits(projects);
  const serializedProjects = serializeAutoBackupEntries(projects, {
    isAutoBackupKey: isAutoBackupStorageKey,
  });
  invalidateProjectReadCache();
  ensurePreWriteMigrationBackup(safeStorage, PROJECT_STORAGE_KEY);
  saveJSONToStorage(
    safeStorage,
    PROJECT_STORAGE_KEY,
    serializedProjects,
    "Error saving project to localStorage:",
    {
      forceCompressionOnQuota: true,
      onQuotaExceeded: () => {
        const removedKey = removeOldestAutoBackupEntry(serializedProjects);
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
  let { projects, changed, originalValue, lookup } = readAllProjectsFromStorage();
  if (changed) {
    const safeStorage = getSafeLocalStorage();
    if (safeStorage) {
      createStorageMigrationBackup(safeStorage, PROJECT_STORAGE_KEY, originalValue);
    }
    const mutableProjects = STORAGE_DEEP_CLONE(projects);
    persistAllProjects(mutableProjects);
    projects = mutableProjects;
  }
  if (name === undefined) {
    return projects;
  }
  const resolvedKey = resolveProjectKey(projects, lookup, name, { preferExact: true });
  if (
    resolvedKey !== null
    && resolvedKey !== undefined
    && Object.prototype.hasOwnProperty.call(projects, resolvedKey)
  ) {
    return projects[resolvedKey];
  }
  return null;
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
    const cloned = STORAGE_DEEP_CLONE(entry);
    const normalized = normalizeLegacyLongGopStructure(cloned);
    return normalized !== cloned ? normalized : cloned;
  } catch (error) {
    console.warn('Unable to deep clone project for backup', error);
    const fallback = { ...entry };
    const normalized = normalizeLegacyLongGopStructure(fallback);
    return normalized !== fallback ? normalized : fallback;
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

function generateOverwriteBackupMetadata(projectName, projects) {
  const timestamp = formatAutoBackupTimestamp(new Date());
  const sanitizedName = sanitizeProjectNameForBackup(projectName);
  const baseName = sanitizedName
    ? `${STORAGE_AUTO_BACKUP_NAME_PREFIX}${timestamp}-${sanitizedName}`
    : `${STORAGE_AUTO_BACKUP_NAME_PREFIX}${timestamp}`;
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

function maybeCreateProjectOverwriteBackup(projects, key) {
  if (!isPlainObject(projects) || typeof key !== 'string') {
    return { status: 'invalid' };
  }
  if (!Object.prototype.hasOwnProperty.call(projects, key)) {
    return { status: 'missing' };
  }
  if (
    key.startsWith(STORAGE_AUTO_BACKUP_NAME_PREFIX)
    || key.startsWith(STORAGE_AUTO_BACKUP_DELETION_PREFIX)
  ) {
    return { status: 'skipped' };
  }

  const backupSource = cloneProjectEntryForBackup(projects[key]);
  if (backupSource === undefined) {
    return { status: 'failed' };
  }

  const { name: backupName } = generateOverwriteBackupMetadata(key, projects);
  if (!backupName) {
    return { status: 'failed' };
  }

  projects[backupName] = backupSource;
  return { status: 'created', backupName };
}

function saveProject(name, project) {
  if (!isPlainObject(project)) return;
  const normalized = normalizeProject(project);
  if (!normalized) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn(
        `Skipped saving project "${name || ''}" because the payload could not be normalised.`,
      );
    }
    return;
  }
  const { projects, changed, originalValue, lookup } = readAllProjectsFromStorage({ forMutation: true });
  if (changed) {
    const safeStorage = getSafeLocalStorage();
    if (safeStorage) {
      createStorageMigrationBackup(safeStorage, PROJECT_STORAGE_KEY, originalValue);
    }
  }

  const requestedKey = typeof name === 'string' ? name : '';
  const preferredKey = normalizeProjectStorageKey(requestedKey);
  const resolvedKey = resolveProjectKey(projects, lookup, requestedKey, { preferExact: true });

  let storageKey = resolvedKey;
  let renamedFromKey = null;
  if (
    preferredKey
    && preferredKey !== resolvedKey
    && !Object.prototype.hasOwnProperty.call(projects, preferredKey)
  ) {
    storageKey = preferredKey;
    renamedFromKey = resolvedKey;
  }

  if (storageKey === null || storageKey === undefined) {
    storageKey = preferredKey;
  }

  if (!storageKey && storageKey !== '') {
    storageKey = '';
  }

  const existingKey = renamedFromKey !== null && renamedFromKey !== undefined
    ? renamedFromKey
    : storageKey;
  const hasExistingEntry =
    existingKey !== null
    && existingKey !== undefined
    && Object.prototype.hasOwnProperty.call(projects, existingKey);

  if (hasExistingEntry) {
    const existingSignature = createStableValueSignature(projects[existingKey]);
    const nextSignature = createStableValueSignature(normalized);
    if (existingSignature !== nextSignature) {
      const backupOutcome = maybeCreateProjectOverwriteBackup(projects, existingKey);
      if (backupOutcome.status === 'failed') {
        console.warn(
          `Automatic backup before overwriting project "${existingKey}" failed. Proceeding with save.`,
        );
      }
    }
  }

  if (
    renamedFromKey !== null
    && renamedFromKey !== undefined
    && renamedFromKey !== storageKey
  ) {
    delete projects[renamedFromKey];
  }

  projects[storageKey || ''] = normalized;
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

  const { projects, changed, originalValue, lookup } = readAllProjectsFromStorage({ forMutation: true });
  if (changed) {
    const safeStorage = getSafeLocalStorage();
    if (safeStorage) {
      createStorageMigrationBackup(safeStorage, PROJECT_STORAGE_KEY, originalValue);
    }
  }
  const resolvedKey = resolveProjectKey(projects, lookup, name, { preferExact: true });
  const key =
    resolvedKey !== null && resolvedKey !== undefined
      ? resolvedKey
      : normalizeProjectStorageKey(name);
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
  const { projects, changed, originalValue } = readAllProjectsFromStorage({ forMutation: true });
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

    const originalHasGenerationFlag =
      project
      && typeof project === "object"
      && Object.prototype.hasOwnProperty.call(project, "gearListAndProjectRequirementsGenerated")
      && typeof project.gearListAndProjectRequirementsGenerated === "boolean";

    if (
      !originalHasGenerationFlag
      && typeof normalizedProject.gearListAndProjectRequirementsGenerated !== 'boolean'
    ) {
      normalizedProject.gearListAndProjectRequirementsGenerated = false;
    }

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
    const normalizedBase = typeof baseName === "string" ? baseName.trim().toLowerCase() : "";
    const uniqueName = normalizedBase && normalizedNames.has(normalizedBase)
      ? generateImportedProjectName(baseName, usedNames, normalizedNames)
      : generateUniqueName(baseName, usedNames, normalizedNames);
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

    const importProject = ensureImporter();
    importProject("", collection, fallbackLabel);
    return true;
  }

  if (isMapLike(collection)) {
    const converted = convertMapLikeToObject(collection);
    if (converted) {
      return importProjectCollection(Object.entries(converted), ensureImporter, fallbackLabel);
    }
    return false;
  }

  if (Array.isArray(collection)) {
    const entries = collection
      .map((proj) => {
        if (proj === null || proj === undefined) {
          return null;
        }
        if (Array.isArray(proj) && proj.length >= 2) {
          return { name: proj[0], project: proj[1] };
        }
        if (isPlainObject(proj) && typeof proj.name === "string") {
          return { name: proj.name, project: proj };
        }
        return { name: '', project: proj };
      })
      .filter(Boolean);

    if (!entries.length) {
      return true;
    }

    const importProject = ensureImporter();
    let count = 0;
    entries.forEach(({ name, project }) => {
      if (project === null || project === undefined) {
        return;
      }
      count += 1;
      let normalizedName = '';
      if (typeof name === 'string') {
        normalizedName = name;
      } else if (typeof name === 'number' || typeof name === 'boolean' || typeof name === 'bigint') {
        normalizedName = String(name);
      } else if (typeof name === 'symbol') {
        normalizedName = name.description || name.toString();
      }
      importProject(normalizedName, project, `${fallbackLabel} ${count}`);
    });
    return true;
  }

  if (isPlainObject(collection)) {
    const importProject = ensureImporter();
    Object.entries(collection).forEach(([name, proj]) => {
      const normalizedName = typeof name === 'string' ? name : convertMapLikeKey(name);
      importProject(typeof normalizedName === 'string' ? normalizedName : '', proj);
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

var recordFullBackupHistoryEntry = entry => {
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

  if (isMapLike(value)) {
    const converted = convertMapLikeToObject(value);
    if (converted) {
      return normalizeImportedFullBackupHistory(Object.values(converted));
    }
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
  const rules = Array.isArray(parsed) ? parsed : [];
  const normalizedRules = Array.isArray(rules)
    ? normalizeLegacyLongGopStructure(rules)
    : [];
  if (normalizedRules !== rules) {
    saveAutoGearRules(normalizedRules, { skipNormalization: true });
  }
  return Array.isArray(normalizedRules) ? normalizedRules : [];
}

function saveAutoGearRules(rules, options = {}) {
  const opts = options || {};
  const { skipNormalization = false } = opts;
  const safeRules = Array.isArray(rules) ? rules.slice() : [];
  const normalizedRules = skipNormalization
    ? safeRules
    : (Array.isArray(safeRules) ? normalizeLegacyLongGopStructure(safeRules) : []);
  const safeStorage = getSafeLocalStorage();
  ensurePreWriteMigrationBackup(safeStorage, AUTO_GEAR_RULES_STORAGE_KEY);
  saveJSONToStorage(
    safeStorage,
    AUTO_GEAR_RULES_STORAGE_KEY,
    normalizedRules,
    "Error saving automatic gear rules to localStorage:",
  );
  return normalizedRules;
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
  const backups = Array.isArray(parsed) ? parsed : [];
  const { normalized: normalizedBackups, changed } = normalizeLegacyLongGopBackups(backups);
  if (changed) {
    saveAutoGearBackups(normalizedBackups, { skipNormalization: true });
  }
  return normalizedBackups;
}

function saveAutoGearBackups(backups, options = {}) {
  const opts = options || {};
  const { skipNormalization = false } = opts;
  const safeBackups = Array.isArray(backups) ? backups.slice() : [];
  const { normalized: normalizedBackups } = skipNormalization
    ? { normalized: safeBackups, changed: false }
    : normalizeLegacyLongGopBackups(safeBackups);
  const safeStorage = getSafeLocalStorage();
  ensurePreWriteMigrationBackup(safeStorage, AUTO_GEAR_BACKUPS_STORAGE_KEY);

  let attemptedMigrationCleanup = false;
  let attemptedCacheCleanup = false;

  saveJSONToStorage(
    safeStorage,
    AUTO_GEAR_BACKUPS_STORAGE_KEY,
    normalizedBackups,
    "Error saving automatic gear rule backups to localStorage:",
    {
      onQuotaExceeded: (error, context = {}) => {
        const removal = removeOldestAutoGearBackupEntry(normalizedBackups);
        if (removal) {
          const label = removal.label;
          if (label) {
            console.warn(
              `Removed automatic gear backup "${label}" to free up storage space before saving gear backups.`,
            );
          } else {
            console.warn(
              'Removed oldest automatic gear backup entry to free up storage space before saving gear backups.',
            );
          }
          return true;
        }

        const storage = context && context.storage ? context.storage : safeStorage;

        if (!attemptedMigrationCleanup) {
          attemptedMigrationCleanup = true;
          if (cleanupAutoGearBackupMigrationCopies(storage)) {
            return true;
          }
        }

        if (!attemptedCacheCleanup) {
          attemptedCacheCleanup = true;
          if (clearCachedPlannerDataForAutoGearBackups()) {
            return true;
          }
        }

        return false;
      },
    },
  );
  return normalizedBackups;
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
  const presetArray = Array.isArray(presets) ? presets : [];
  const normalized = Array.isArray(presetArray)
    ? normalizeLegacyLongGopStructure(presetArray)
    : [];
  if (normalized !== presetArray) {
    saveAutoGearPresets(normalized, { skipNormalization: true });
  }
  return Array.isArray(normalized) ? normalized : [];
}

function saveAutoGearPresets(presets, options = {}) {
  const opts = options || {};
  const { skipNormalization = false } = opts;
  const safePresets = Array.isArray(presets) ? presets.slice() : [];
  const normalizedPresets = skipNormalization
    ? safePresets
    : (Array.isArray(safePresets) ? normalizeLegacyLongGopStructure(safePresets) : []);
  const safeStorage = getSafeLocalStorage();
  ensurePreWriteMigrationBackup(safeStorage, AUTO_GEAR_PRESETS_STORAGE_KEY);
  saveJSONToStorage(
    safeStorage,
    AUTO_GEAR_PRESETS_STORAGE_KEY,
    normalizedPresets,
    "Error saving automatic gear presets to localStorage:",
  );
  return normalizedPresets;
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
  const monitorDefaults = defaults && typeof defaults === 'object' ? defaults : {};
  const normalizedDefaults = isPlainObject(monitorDefaults)
    ? normalizeLegacyLongGopStructure(monitorDefaults)
    : {};
  if (normalizedDefaults !== monitorDefaults) {
    saveAutoGearMonitorDefaults(normalizedDefaults, { skipNormalization: true });
  }
  return normalizedDefaults && typeof normalizedDefaults === 'object' ? normalizedDefaults : {};
}

function saveAutoGearMonitorDefaults(defaults, options = {}) {
  const opts = options || {};
  const { skipNormalization = false } = opts;
  const safeDefaults = defaults && typeof defaults === 'object' ? { ...defaults } : {};
  const normalizedDefaults = skipNormalization
    ? safeDefaults
    : (isPlainObject(safeDefaults) ? normalizeLegacyLongGopStructure(safeDefaults) : {});
  const safeStorage = getSafeLocalStorage();
  ensurePreWriteMigrationBackup(safeStorage, AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY);
  saveJSONToStorage(
    safeStorage,
    AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY,
    normalizedDefaults,
    "Error saving automatic gear monitor defaults to localStorage:",
  );
  return normalizedDefaults;
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
  let normalizedRawPresets = rawPresets;
  if (typeof rawPresets === 'string' && rawPresets) {
    normalizedRawPresets = maybeDecompressStoredString(rawPresets);
  }
  try {
    parsedPresets = JSON.parse(normalizedRawPresets);
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

function getAutoGearBackupRetentionUpperBound() {
  const candidate = typeof AUTO_GEAR_BACKUP_RETENTION_MAX === 'number'
    ? AUTO_GEAR_BACKUP_RETENTION_MAX
    : MAX_AUTO_BACKUPS;
  const numeric = Number(candidate);
  if (!Number.isFinite(numeric)) {
    return MAX_AUTO_BACKUPS;
  }
  const rounded = Math.round(numeric);
  if (!Number.isFinite(rounded)) {
    return MAX_AUTO_BACKUPS;
  }
  if (rounded < AUTO_GEAR_BACKUP_RETENTION_MIN) {
    return AUTO_GEAR_BACKUP_RETENTION_MIN;
  }
  if (rounded > MAX_AUTO_BACKUPS) {
    return MAX_AUTO_BACKUPS;
  }
  return rounded;
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
  const upperBound = getAutoGearBackupRetentionUpperBound();
  if (rounded > upperBound) {
    return upperBound;
  }
  return rounded;
}

function getAutoGearBackupRetentionDefault() {
  const upperBound = getAutoGearBackupRetentionUpperBound();
  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.AUTO_GEAR_BACKUP_RETENTION_DEFAULT === 'number') {
    const candidate = GLOBAL_SCOPE.AUTO_GEAR_BACKUP_RETENTION_DEFAULT;
    if (Number.isFinite(candidate) && candidate >= AUTO_GEAR_BACKUP_RETENTION_MIN) {
      const rounded = Math.round(candidate);
      if (!Number.isFinite(rounded)) {
        return upperBound;
      }
      if (rounded < AUTO_GEAR_BACKUP_RETENTION_MIN) {
        return AUTO_GEAR_BACKUP_RETENTION_MIN;
      }
      if (rounded > upperBound) {
        return upperBound;
      }
      return rounded;
    }
  }
  const fallback = Math.round(AUTO_GEAR_BACKUP_RETENTION_DEFAULT_VALUE);
  if (!Number.isFinite(fallback)) {
    return AUTO_GEAR_BACKUP_RETENTION_MIN;
  }
  if (fallback > upperBound) {
    return upperBound;
  }
  if (fallback < AUTO_GEAR_BACKUP_RETENTION_MIN) {
    return AUTO_GEAR_BACKUP_RETENTION_MIN;
  }
  return fallback;
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
    const variants = getStorageKeyVariants(key);
    for (let i = 0; i < variants.length; i += 1) {
      const candidateKey = variants[i];
      try {
        const value = storage.getItem(candidateKey);
        if (value === null || value === undefined) {
          if (RAW_STORAGE_BACKUP_KEYS.has(candidateKey)) {
            try {
              const backupValue = storage.getItem(`${candidateKey}${STORAGE_BACKUP_SUFFIX}`);
              if (backupValue !== null && backupValue !== undefined) {
                const decodedBackup = decodeStoredValue(backupValue);
                return typeof decodedBackup === 'string' ? decodedBackup : String(backupValue);
              }
            } catch (backupError) {
              console.warn('Unable to read backup key for export', candidateKey, backupError);
              downgradeSafeLocalStorageToMemory('read access', backupError, storage);
            }
          }
        } else {
          const decoded = decodeStoredValue(value);
          return typeof decoded === 'string' ? decoded : String(value);
        }
      } catch (error) {
        console.warn('Unable to read storage key for backup', candidateKey, error);
        downgradeSafeLocalStorageToMemory('read access', error, storage);
      }
    }
    return null;
  }

  function parseStoredBoolean(value) {
    if (value === null || value === undefined) {
      return null;
    }

    if (typeof value === 'boolean') {
      return value;
    }

    if (typeof value === 'number') {
      if (Number.isNaN(value)) {
        return null;
      }
      return value !== 0;
    }

    const normalized = String(value).trim().toLowerCase();
    if (!normalized) {
      return null;
    }

    if (normalized === 'true'
        || normalized === '1'
        || normalized === 'yes'
        || normalized === 'on') {
      return true;
    }

    if (normalized === 'false'
        || normalized === '0'
        || normalized === 'no'
        || normalized === 'off') {
      return false;
    }

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

    const mountVoltageKey = getMountVoltageStorageKeyName();
    const mountVoltages = readLocalStorageValue(mountVoltageKey);
    if (mountVoltages) {
      try {
        preferences.mountVoltages = JSON.parse(mountVoltages);
      } catch (voltageParseError) {
        console.warn('Failed to parse stored mount voltages for backup', voltageParseError);
        preferences.mountVoltages = mountVoltages;
      }
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
  if (isMapLike(value)) {
    const converted = convertMapLikeToObject(value);
    if (converted) {
      return normalizeImportedArray(converted, fallbackKeys, filterFn);
    }
    return [];
  }

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
  const rules = normalizeImportedArray(
    value,
    ["rules", "items", "entries", "list", "values", "data"],
    (entry) => entry !== null && typeof entry === "object",
  );
  if (!Array.isArray(rules)) {
    return [];
  }
  return normalizeLegacyLongGopStructure(rules);
}

function normalizeImportedAutoGearBackups(value) {
  const backups = normalizeImportedArray(
    value,
    ["backups", "entries", "items", "list", "values", "data"],
    (entry) => entry !== null && typeof entry === "object",
  );
  if (!Array.isArray(backups)) {
    return [];
  }
  const { normalized } = normalizeLegacyLongGopBackups(backups);
  return normalized;
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
  const presets = normalizeImportedArray(
    value,
    ["presets", "entries", "items", "list", "values", "data"],
    (entry) => entry !== null && typeof entry === "object",
  );
  if (!Array.isArray(presets)) {
    return [];
  }
  return normalizeLegacyLongGopStructure(presets);
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
  const legacyNormalized = normalizeLegacyLongGopStructure(normalized);
  return isPlainObject(legacyNormalized) ? legacyNormalized : normalized;
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
  return getStorageKeyVariants(key);
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
        const compressionToken = typeof parsed.compression === 'string' ? parsed.compression.trim() : '';
        const encodingToken = typeof parsed.encoding === 'string' ? parsed.encoding.trim() : '';
        const isModernCompression =
          compressionToken === MIGRATION_BACKUP_COMPRESSION_ALGORITHM
          && encodingToken === MIGRATION_BACKUP_COMPRESSION_ENCODING;
        const isLegacyLongGopCompression =
          LEGACY_LONG_GOP_TOKEN_REGEX.test(compressionToken)
          || LEGACY_LONG_GOP_TOKEN_REGEX.test(encodingToken);

        if ((isModernCompression || isLegacyLongGopCompression) && typeof parsed.data === 'string') {
          if (canUseMigrationBackupCompression()) {
            let preferredVariant = typeof parsed.compressionVariant === 'string'
              && parsed.compressionVariant
              ? parsed.compressionVariant
              : null;
            if (!preferredVariant) {
              if (isLegacyLongGopCompression) {
                preferredVariant = inferLegacyLongGopCompressionVariant(encodingToken)
                  || inferLegacyLongGopCompressionVariant(compressionToken)
                  || 'utf16';
              } else {
                preferredVariant = 'utf16';
              }
            }
            const decoded = tryDecompressWithStrategies(
              parsed.data,
              MIGRATION_BACKUP_COMPRESSION_VARIANTS,
              preferredVariant,
              'migration backup entry',
            );
            if (decoded.success && typeof decoded.value === 'string') {
              try {
                const payload = JSON.parse(decoded.value);
                if (payload && typeof payload === 'object' && Object.prototype.hasOwnProperty.call(payload, 'data')) {
                  raw = payload.data;
                } else {
                  raw = null;
                }
              } catch (parseError) {
                console.warn('Unable to parse migration backup entry during import', entry.key, parseError);
                raw = null;
              }
            } else {
              console.warn('Unable to decompress migration backup entry during import', entry && entry.key, decoded.error);
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

  const mountVoltageKeyName = getMountVoltageStorageKeyName();
  const simpleSnapshotKeys = new Set(
    [CUSTOM_LOGO_STORAGE_KEY, ...preferenceKeys, mountVoltageKeyName].filter(
      (key) => typeof key === 'string' && key,
    ),
  );

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

  const mountVoltageEntry = readSnapshotEntry(snapshot, mountVoltageKeyName);
  if (mountVoltageEntry) {
    markSnapshotEntry(mountVoltageEntry);
    const storedVoltages = parseSnapshotJSONValue(mountVoltageEntry);
    if (storedVoltages !== undefined) {
      preferences.mountVoltages = storedVoltages;
      hasAssignments = true;
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
  const mountVoltageKeyName = getMountVoltageStorageKeyName();

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
    if (Object.prototype.hasOwnProperty.call(prefs, 'mountVoltages')) {
      const rawVoltages = prefs.mountVoltages;
      if (rawVoltages && typeof rawVoltages === 'object') {
        try {
          safeSetLocalStorage(mountVoltageKeyName, JSON.stringify(rawVoltages));
        } catch (voltStoreError) {
          console.warn('Unable to store imported mount voltages', voltStoreError);
        }
        if (typeof applyMountVoltagePreferences === 'function') {
          applyMountVoltagePreferences(rawVoltages, { persist: false, triggerUpdate: true });
        }
      } else if (typeof rawVoltages === 'string') {
        safeSetLocalStorage(mountVoltageKeyName, rawVoltages);
        if (typeof parseStoredMountVoltages === 'function') {
          try {
            const parsedVoltages = parseStoredMountVoltages(rawVoltages);
            if (parsedVoltages && typeof applyMountVoltagePreferences === 'function') {
              applyMountVoltagePreferences(parsedVoltages, { persist: false, triggerUpdate: true });
            }
          } catch (voltParseError) {
            console.warn('Unable to parse imported mount voltages', voltParseError);
          }
        }
      } else if (rawVoltages === null) {
        safeSetLocalStorage(mountVoltageKeyName, null);
        if (typeof resetMountVoltagePreferences === 'function') {
          resetMountVoltagePreferences({ persist: false, triggerUpdate: true });
        }
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
  }
  if (allData.projects) {
    // Legacy plural key. Accept object map or array of named projects.
    importProjectCollection(allData.projects, ensureProjectImporter);
  } else if (!allData.project && typeof allData.gearList === "string") {
    // Legacy export format stored just the gear list HTML
    ensureProjectImporter()("", { gearList: allData.gearList });
  }
}

var STORAGE_API = {
  getSafeLocalStorage,
  loadDeviceData,
  saveDeviceData,
  loadSetups,
  saveSetups,
  saveSetup,
  loadSetup,
  deleteSetup,
  renameSetup,
  getMountVoltageStorageKeyName,
  getMountVoltageStorageBackupKeyName,
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
  ensureCriticalStorageBackups,
  getLastCriticalStorageGuardResult,
  decodeStoredValue,
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

if (GLOBAL_SCOPE) {
  try {
    Object.defineProperty(GLOBAL_SCOPE, '__cineStorageApi', {
      configurable: true,
      writable: true,
      value: STORAGE_API,
    });
  } catch (storageApiExposeError) {
    GLOBAL_SCOPE.__cineStorageApi = STORAGE_API;
    void storageApiExposeError;
  }
}

})();
