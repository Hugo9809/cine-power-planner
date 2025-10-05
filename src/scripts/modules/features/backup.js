(function () {
  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    return {};
  }

  const GLOBAL_SCOPE = detectGlobalScope();

  function resolveModuleBase(scope) {
    if (typeof cineModuleBase === 'object' && cineModuleBase) {
      return cineModuleBase;
    }

    if (typeof require === 'function') {
      try {
        const required = require('../base.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (scope && typeof scope.cineModuleBase === 'object') {
      return scope.cineModuleBase;
    }

    return null;
  }

  const MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }

  const freezeDeep = typeof MODULE_BASE.freezeDeep === 'function'
    ? MODULE_BASE.freezeDeep
    : function fallbackFreezeDeep(value) {
        if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
          return value;
        }
        const seen = new WeakSet();
        function freeze(target) {
          if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
            return target;
          }
          if (seen.has(target)) {
            return target;
          }
          seen.add(target);
          try {
            const keys = Object.getOwnPropertyNames(target);
            for (let index = 0; index < keys.length; index += 1) {
              const key = keys[index];
              const descriptor = Object.getOwnPropertyDescriptor(target, key);
              if (!descriptor || descriptor.get || descriptor.set) {
                continue;
              }
              freeze(descriptor.value);
            }
            Object.freeze(target);
          } catch (error) {
            void error;
          }
          return target;
        }
        return freeze(value);
      };

  const exposeGlobal = typeof MODULE_BASE.exposeGlobal === 'function'
    ? function expose(name, value, options) {
        return MODULE_BASE.exposeGlobal(name, value, GLOBAL_SCOPE, options || {});
      }
    : function fallbackExpose(name, value) {
        try {
          GLOBAL_SCOPE[name] = value;
          return true;
        } catch (error) {
          void error;
          return false;
        }
      };

  const moduleRegistry = typeof MODULE_BASE.getModuleRegistry === 'function'
    ? MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE)
    : null;

  const registerOrQueueModule = typeof MODULE_BASE.registerOrQueueModule === 'function'
    ? function register(name, api, options, onError) {
        return MODULE_BASE.registerOrQueueModule(
          name,
          api,
          options,
          onError,
          GLOBAL_SCOPE,
          moduleRegistry,
        );
      }
    : function fallbackRegister() {
        return false;
      };

  const SESSION_AUTO_BACKUP_NAME_PREFIX = 'auto-backup-';
  const SESSION_AUTO_BACKUP_DELETION_PREFIX = 'auto-backup-before-delete-';

  const BACKUP_STORAGE_KEY_PREFIXES = ['cameraPowerPlanner_', 'cinePowerPlanner_'];

  const BACKUP_STORAGE_KNOWN_KEYS = new Set([
    'darkMode',
    'pinkMode',
    'highContrast',
    'showAutoBackups',
    'accentColor',
    'fontSize',
    'fontFamily',
    'customLogo',
    'language',
  ]);

  if (typeof IOS_PWA_HELP_STORAGE_KEY === 'string' && IOS_PWA_HELP_STORAGE_KEY) {
    BACKUP_STORAGE_KNOWN_KEYS.add(IOS_PWA_HELP_STORAGE_KEY);
  } else if (
    GLOBAL_SCOPE
    && typeof GLOBAL_SCOPE.IOS_PWA_HELP_STORAGE_KEY === 'string'
    && GLOBAL_SCOPE.IOS_PWA_HELP_STORAGE_KEY
  ) {
    BACKUP_STORAGE_KNOWN_KEYS.add(GLOBAL_SCOPE.IOS_PWA_HELP_STORAGE_KEY);
  } else {
    BACKUP_STORAGE_KNOWN_KEYS.add('iosPwaHelpShown');
  }

  const BACKUP_METADATA_BASE_KEYS = new Set([
    'settings',
    'storage',
    'localStorage',
    'values',
    'entries',
    'sessionStorage',
    'sessionState',
    'sessionEntries',
    'payload',
    'plannerData',
    'allData',
    'generatedAt',
    'version',
    'appVersion',
    'applicationVersion',
  ]);

  const BACKUP_DATA_KEYS = [
    'devices',
    'setups',
    'session',
    'feedback',
    'project',
    'projects',
    'gearList',
    'favorites',
    'autoGearRules',
    'autoGearSeeded',
    'autoGearBackups',
    'autoGearPresets',
    'autoGearMonitorDefaults',
    'autoGearActivePresetId',
    'autoGearAutoPresetId',
    'autoGearShowBackups',
    'autoGearBackupRetention',
    'customLogo',
    'customFonts',
    'preferences',
    'schemaCache',
    'fullBackupHistory',
    'fullBackups',
  ];

  const BACKUP_DATA_COMPLEX_KEYS = new Set([
    'devices',
    'setups',
    'session',
    'sessions',
    'feedback',
    'project',
    'projects',
    'gearList',
    'favorites',
    'autoGearRules',
    'autoGearBackups',
    'autoGearPresets',
    'autoGearMonitorDefaults',
    'preferences',
    'fullBackupHistory',
    'fullBackups',
    'customFonts',
  ]);

  function isPlainObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  function formatFullBackupFilename(date) {
    const safeDate = date instanceof Date && !Number.isNaN(date.valueOf())
      ? date
      : new Date();
    const pad = value => String(value).padStart(2, '0');
    const year = safeDate.getFullYear();
    const month = pad(safeDate.getMonth() + 1);
    const day = pad(safeDate.getDate());
    const hours = pad(safeDate.getHours());
    const minutes = pad(safeDate.getMinutes());
    const seconds = pad(safeDate.getSeconds());
    const offsetMinutes = safeDate.getTimezoneOffset();
    let offsetSuffix = 'Z';
    if (offsetMinutes !== 0) {
      const sign = offsetMinutes > 0 ? '-' : '+';
      const abs = Math.abs(offsetMinutes);
      const offsetHours = pad(Math.floor(abs / 60));
      const offsetMins = pad(abs % 60);
      offsetSuffix = `${sign}${offsetHours}:${offsetMins}`;
    }
    const iso = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSuffix}`;
    const safeIso = iso.replace(/[:]/g, '-');
    return {
      iso,
      fileName: `${safeIso} full app backup.json`,
    };
  }

  function resolveSafeLocalStorage() {
    if (typeof getSafeLocalStorage === 'function') {
      try {
        const storage = getSafeLocalStorage();
        if (storage) {
          return storage;
        }
      } catch (error) {
        console.warn('Unable to obtain safe local storage reference', error);
      }
    }
    if (typeof SAFE_LOCAL_STORAGE !== 'undefined') {
      return SAFE_LOCAL_STORAGE;
    }
    if (typeof localStorage !== 'undefined') {
      return localStorage;
    }
    return null;
  }

  function captureStorageSnapshot(storage) {
    const snapshot = Object.create(null);
    if (!storage) return snapshot;

    const assignEntry = (key, valueOrGetter) => {
      if (typeof key !== 'string' || !key) {
        return;
      }
      try {
        const value = typeof valueOrGetter === 'function'
          ? valueOrGetter()
          : valueOrGetter;
        snapshot[key] = value;
      } catch (error) {
        console.warn('Failed to read storage entry for backup', key, error);
      }
    };

    const tryEnumerateByIndex = () => {
      if (typeof storage.key !== 'function' || typeof storage.length !== 'number') {
        return false;
      }
      let length = 0;
      try {
        length = Number(storage.length) || 0;
      } catch (lengthError) {
        console.warn('Failed to inspect storage length for backup snapshot', lengthError);
        return true;
      }
      for (let i = 0; i < length; i += 1) {
        let key;
        try {
          key = storage.key(i);
        } catch (keyError) {
          console.warn('Failed to access storage key for backup snapshot', keyError);
          continue;
        }
        assignEntry(key, () => storage.getItem(key));
      }
      return true;
    };

    const tryEnumerateByKeys = () => {
      if (typeof storage.keys !== 'function') {
        return false;
      }
      let keys;
      try {
        keys = storage.keys();
      } catch (keysError) {
        console.warn('Failed to enumerate storage keys for backup snapshot', keysError);
        return true;
      }
      if (!keys) {
        return true;
      }
      const iterate = (list) => {
        if (!list) return;
        if (typeof list.forEach === 'function') {
          list.forEach(key => assignEntry(key, () => storage.getItem(key)));
        } else if (typeof list[Symbol.iterator] === 'function') {
          for (const key of list) {
            assignEntry(key, () => storage.getItem(key));
          }
        }
      };
      iterate(keys);
      return true;
    };

    const tryEnumerateByForEach = () => {
      if (typeof storage.forEach !== 'function') {
        return false;
      }
      try {
        storage.forEach((value, key) => {
          assignEntry(key, value);
        });
      } catch (error) {
        console.warn('Failed to iterate storage for backup snapshot', error);
      }
      return true;
    };

    let enumerated = false;
    try {
      enumerated = tryEnumerateByIndex();
    } catch (error) {
      console.warn('Failed to snapshot storage via index enumeration', error);
    }

    if (!Object.keys(snapshot).length) {
      try {
        enumerated = tryEnumerateByKeys() || enumerated;
      } catch (error) {
        console.warn('Failed to snapshot storage via key enumeration', error);
      }
    }

    if (!Object.keys(snapshot).length && !enumerated) {
      try {
        tryEnumerateByForEach();
      } catch (error) {
        console.warn('Failed to snapshot storage via iteration', error);
      }
    } else if (!Object.keys(snapshot).length) {
      tryEnumerateByForEach();
    }

    return snapshot;
  }

  function createSafeStorageReader(storage, errorMessagePrefix) {
    if (!storage || typeof storage.getItem !== 'function') {
      return () => null;
    }

    const message = typeof errorMessagePrefix === 'string' && errorMessagePrefix
      ? errorMessagePrefix
      : 'Failed to read storage key';

    return (key) => {
      if (typeof key !== 'string') {
        return null;
      }
      try {
        return storage.getItem(key);
      } catch (error) {
        console.warn(`${message}`, key, error);
        return null;
      }
    };
  }

  function restoreSessionStorageSnapshot(snapshot) {
    if (typeof sessionStorage === 'undefined' || !sessionStorage) {
      return;
    }

    const entries = snapshot && typeof snapshot === 'object'
      ? Object.entries(snapshot)
      : [];
    const retainedKeys = new Set(entries.map(([key]) => key));

    const keysToRemove = [];
    try {
      const { length } = sessionStorage;
      for (let i = 0; i < length; i += 1) {
        const key = sessionStorage.key(i);
        if (typeof key !== 'string') continue;
        if (!retainedKeys.has(key)) {
          keysToRemove.push(key);
        }
      }
    } catch (error) {
      console.warn('Failed to inspect sessionStorage during restore rollback', error);
    }

    keysToRemove.forEach((key) => {
      try {
        sessionStorage.removeItem(key);
      } catch (removeError) {
        console.warn('Failed to remove sessionStorage key during restore rollback', key, removeError);
      }
    });

    entries.forEach(([key, value]) => {
      if (typeof key !== 'string') return;
      try {
        sessionStorage.setItem(key, typeof value === 'string' ? value : String(value));
      } catch (setError) {
        console.warn('Failed to reapply sessionStorage key during restore rollback', key, setError);
      }
    });
  }

  function normalizeStoredValue(value) {
    if (typeof value === 'string') return value;
    if (value === undefined || value === null) return '';
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value);
      } catch (error) {
        console.warn('Failed to serialize stored value for backup compatibility', error);
        return '';
      }
    }
    try {
      return String(value);
    } catch (error) {
      console.warn('Failed to normalize stored value for backup compatibility', error);
      return '';
    }
  }

  function convertEntriesToSnapshot(section) {
    if (!section) return null;

    let source = section;
    if (typeof source === 'string') {
      let parsed = null;
      try {
        parsed = JSON.parse(source);
      } catch (error) {
        parsed = null;
      }
      if (parsed && (Array.isArray(parsed) || isPlainObject(parsed))) {
        source = parsed;
      } else {
        return null;
      }
    }

    const snapshot = Object.create(null);
    const assignEntry = (key, value) => {
      if (typeof key !== 'string' || !key) return;
      snapshot[key] = normalizeStoredValue(value);
    };

    if (Array.isArray(source)) {
      source.forEach(entry => {
        if (!entry) return;
        if (Array.isArray(entry)) {
          assignEntry(entry[0], entry[1]);
          return;
        }
        if (typeof entry === 'object') {
          if (typeof entry.key === 'string') {
            assignEntry(entry.key, entry.value ?? entry.val ?? entry.data ?? entry.content ?? entry.string);
            return;
          }
          if (typeof entry.name === 'string') {
            assignEntry(entry.name, entry.value ?? entry.val ?? entry.data ?? entry.content ?? entry.string);
            return;
          }
          if (Array.isArray(entry.entry)) {
            assignEntry(entry.entry[0], entry.entry[1]);
          }
        }
      });
    } else if (isPlainObject(source)) {
      Object.entries(source).forEach(([key, value]) => {
        assignEntry(key, value);
      });
    } else {
      return null;
    }

    return Object.keys(snapshot).length ? snapshot : null;
  }

  function extractFirstMatchingSnapshot(source, keys) {
    if (!isPlainObject(source)) return { snapshot: null, keyUsed: null };
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      if (!Object.prototype.hasOwnProperty.call(source, key)) continue;
      const snapshot = convertEntriesToSnapshot(source[key]);
      if (snapshot) {
        return { snapshot, keyUsed: key };
      }
    }
    return { snapshot: null, keyUsed: null };
  }

  function looksLikeStoredSettingKey(key) {
    if (BACKUP_STORAGE_KNOWN_KEYS.has(key)) {
      return true;
    }
    return BACKUP_STORAGE_KEY_PREFIXES.some(prefix => key.startsWith(prefix));
  }

  function restoreLocalStorageSnapshot(storage, snapshot) {
    if (!storage || typeof storage.setItem !== 'function') {
      return;
    }

    const entries = snapshot && typeof snapshot === 'object'
      ? Object.entries(snapshot)
      : [];
    const targetKeys = new Set(entries.map(([key]) => key));

    const keysToRemove = [];
    try {
      const { length } = storage;
      for (let i = 0; i < length; i += 1) {
        const key = storage.key(i);
        if (typeof key !== 'string') continue;
        if (!targetKeys.has(key) && looksLikeStoredSettingKey(key)) {
          keysToRemove.push(key);
        }
      }
    } catch (error) {
      console.warn('Failed to inspect storage during restore rollback', error);
    }

    keysToRemove.forEach((key) => {
      try {
        storage.removeItem(key);
      } catch (removeError) {
        console.warn('Failed to remove storage key during restore rollback', key, removeError);
      }
    });

    entries.forEach(([key, value]) => {
      if (typeof key !== 'string') return;
      try {
        if (value === null || value === undefined) {
          storage.removeItem(key);
        } else {
          storage.setItem(key, typeof value === 'string' ? value : String(value));
        }
      } catch (setError) {
        console.warn('Failed to reapply storage key during restore rollback', key, setError);
      }
    });
  }

  function buildLegacyStorageFromRoot(source, metadataKeys) {
    if (!isPlainObject(source)) return null;
    const snapshot = Object.create(null);
    Object.entries(source).forEach(([key, value]) => {
      if (metadataKeys.has(key)) return;
      if (!looksLikeStoredSettingKey(key)) return;
      snapshot[key] = normalizeStoredValue(value);
    });
    return Object.keys(snapshot).length ? snapshot : null;
  }

  function convertLegacyDataEntriesToObject(entries) {
    if (!Array.isArray(entries)) {
      return null;
    }

    const snapshot = Object.create(null);
    const assignEntry = (key, value) => {
      if (typeof key !== 'string' || !key) return;
      if (Object.prototype.hasOwnProperty.call(snapshot, key)) return;
      snapshot[key] = value;
    };

    const keyCandidateKeys = ['key', 'name', 'section', 'type'];
    const valueCandidateKeys = [
      'value',
      'data',
      'content',
      'payload',
      'entries',
      'items',
      'record',
      'snapshot',
      'state',
      'values',
      'settings',
      'sectionData',
      'body',
    ];

    entries.forEach(entry => {
      if (!entry) return;
      if (Array.isArray(entry)) {
        assignEntry(entry[0], entry[1]);
        return;
      }
      if (!isPlainObject(entry)) {
        return;
      }

      if (Array.isArray(entry.entry)) {
        assignEntry(entry.entry[0], entry.entry[1]);
        return;
      }

      const keyCandidate = keyCandidateKeys.find(candidate => {
        const value = entry[candidate];
        return typeof value === 'string' && value;
      });

      if (!keyCandidate) {
        return;
      }

      let value = undefined;
      for (let i = 0; i < valueCandidateKeys.length; i += 1) {
        const candidate = valueCandidateKeys[i];
        if (Object.prototype.hasOwnProperty.call(entry, candidate)) {
          value = entry[candidate];
          break;
        }
      }

      if (value === undefined) {
        value = entry.value
          ?? entry.data
          ?? entry.content
          ?? entry.payload
          ?? entry.entries
          ?? entry.items
          ?? entry.snapshot
          ?? entry.state
          ?? entry.values
          ?? entry.settings;
      }

      if (value === undefined) {
        return;
      }

      assignEntry(entry[keyCandidate], value);
    });

    return Object.keys(snapshot).length ? snapshot : null;
  }

  function normalizeBackupDataSection(section) {
    if (isPlainObject(section)) {
      return section;
    }

    if (Array.isArray(section)) {
      const converted = convertLegacyDataEntriesToObject(section);
      if (converted) {
        return converted;
      }
    }

    if (typeof section === 'string') {
      const parsed = parseBackupDataString(section);
      if (parsed) {
        return parsed;
      }
    }

    if (section && typeof section === 'object') {
      if (typeof section.toJSON === 'function') {
        try {
          const toJsonValue = section.toJSON();
          if (isPlainObject(toJsonValue) || Array.isArray(toJsonValue)) {
            return normalizeBackupDataSection(toJsonValue);
          }
        } catch (error) {
          console.warn('Failed to convert backup data via toJSON', error);
        }
      }
    }

    return null;
  }

  function normalizeBackupDataValue(key, value) {
    if (typeof key === 'string' && BACKUP_DATA_COMPLEX_KEYS.has(key)) {
      const normalized = normalizeBackupDataSection(value);
      if (normalized) {
        return normalized;
      }
    }
    return value;
  }

  function mergeBackupDataSections(base, additions) {
    if (!isPlainObject(additions) || !Object.keys(additions).length) {
      return base ? { ...base } : null;
    }

    const target = base ? { ...base } : {};
    Object.entries(additions).forEach(([key, value]) => {
      if (typeof key !== 'string') return;
      if (Object.prototype.hasOwnProperty.call(target, key)) return;
      target[key] = normalizeBackupDataValue(key, value);
    });
    return target;
  }

  function sanitizeBackupPayload(raw) {
    if (raw === null || raw === undefined) {
      return '';
    }

    const decodeBinaryPayload = (value) => {
      if (typeof value !== 'object' || value === null) {
        return null;
      }

      const isNodeBuffer =
        typeof Buffer !== 'undefined'
        && typeof Buffer.isBuffer === 'function'
        && Buffer.isBuffer(value);

      const objectTag = Object.prototype.toString.call(value);

      const isArrayBuffer =
        typeof ArrayBuffer !== 'undefined'
        && (value instanceof ArrayBuffer || objectTag === '[object ArrayBuffer]' || objectTag === '[object SharedArrayBuffer]');

      const isArrayBufferView = (() => {
        if (typeof ArrayBuffer === 'undefined') {
          return false;
        }
        if (typeof ArrayBuffer.isView === 'function' && ArrayBuffer.isView(value)) {
          return true;
        }
        return Boolean(
          value
          && typeof value === 'object'
          && typeof value.buffer === 'object'
          && typeof value.byteLength === 'number'
          && typeof value.BYTES_PER_ELEMENT === 'number'
        );
      })();

      if (!isNodeBuffer && !isArrayBuffer && !isArrayBufferView) {
        return null;
      }

      const toUint8Array = () => {
        if (isNodeBuffer) {
          return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
        }
        if (isArrayBuffer) {
          return new Uint8Array(value);
        }
        if (
          typeof value.buffer === 'object'
          && typeof value.byteLength === 'number'
        ) {
          const offset = typeof value.byteOffset === 'number' ? value.byteOffset : 0;
          return new Uint8Array(value.buffer, offset, value.byteLength);
        }
        throw new TypeError('Unsupported binary payload type');
      };

      const decodeWithTextDecoder = (array) => {
        if (typeof TextDecoder !== 'function') {
          return null;
        }
        try {
          const decoder = new TextDecoder('utf-8', { fatal: false });
          return decoder.decode(array);
        } catch (error) {
          console.warn('Failed to decode backup payload with TextDecoder', error);
          return null;
        }
      };

      const decodeWithBuffer = () => {
        if (!isNodeBuffer) {
          return null;
        }
        try {
          return value.toString('utf8');
        } catch (error) {
          console.warn('Failed to decode backup payload with Buffer', error);
          return null;
        }
      };

      const decodeManually = (array) => {
        try {
          let result = '';
          const CHUNK_SIZE = 0x8000;
          for (let index = 0; index < array.length; index += CHUNK_SIZE) {
            const slice = array.subarray(index, index + CHUNK_SIZE);
            result += String.fromCharCode.apply(null, slice);
          }
          return result;
        } catch (error) {
          console.warn('Failed to manually decode backup payload', error);
          return null;
        }
      };

      const array = toUint8Array();
      return decodeWithTextDecoder(array)
        || decodeWithBuffer()
        || decodeManually(array);
    };

    let text;
    if (typeof raw === 'string') {
      text = raw;
    } else {
      const decoded = decodeBinaryPayload(raw);
      if (typeof decoded === 'string') {
        text = decoded;
      } else {
        try {
          text = String(raw);
        } catch (error) {
          console.warn('Failed to coerce backup payload to string', error);
          text = '';
        }
      }
    }

    if (typeof text !== 'string') {
      return '';
    }

    if (!text.includes('\u0000')) {
      return text;
    }

    try {
      return text.replace(/[\u0000-\u001f\u007f]/g, '');
    } catch (error) {
      console.warn('Failed to strip control characters from backup payload', error);
      return text;
    }
  }

  function parseBackupDataString(raw) {
    if (typeof raw !== 'string') {
      return null;
    }

    const sanitized = sanitizeBackupPayload(raw);
    if (!sanitized) {
      return null;
    }

    const trimmed = sanitized.trim();
    if (!trimmed) {
      return null;
    }

    try {
      const parsed = JSON.parse(trimmed);
      if (isPlainObject(parsed)) {
        return parsed;
      }
      if (Array.isArray(parsed)) {
        return convertLegacyDataEntriesToObject(parsed);
      }
    } catch (error) {
      console.warn('Failed to parse backup data string', error);
    }

    return null;
  }

  function extractBackupSections(raw) {
    const parsed = isPlainObject(raw) ? raw : {};
    const versionValue =
      typeof parsed.version === 'string'
        ? parsed.version
        : typeof parsed.appVersion === 'string'
          ? parsed.appVersion
          : typeof parsed.applicationVersion === 'string'
            ? parsed.applicationVersion
            : undefined;

    const settingsResult = extractFirstMatchingSnapshot(parsed, [
      'settings',
      'localStorage',
      'storage',
      'storedSettings',
      'values',
      'entries',
    ]);
    const sessionResult = extractFirstMatchingSnapshot(parsed, [
      'sessionStorage',
      'session',
      'sessions',
      'sessionState',
      'sessionEntries',
    ]);

    const metadataKeys = new Set(BACKUP_METADATA_BASE_KEYS);
    if (settingsResult.keyUsed) metadataKeys.add(settingsResult.keyUsed);
    if (sessionResult.keyUsed) metadataKeys.add(sessionResult.keyUsed);

    const settingsSnapshot = settingsResult.snapshot || buildLegacyStorageFromRoot(parsed, metadataKeys);
    const sessionSnapshot = sessionResult.snapshot;

    let dataSection = null;
    const dataKeys = ['data', 'payload', 'plannerData', 'allData'];
    for (let index = 0; index < dataKeys.length; index += 1) {
      const key = dataKeys[index];
      if (!Object.prototype.hasOwnProperty.call(parsed, key)) continue;
      const normalized = normalizeBackupDataSection(parsed[key]);
      if (normalized) {
        dataSection = mergeBackupDataSections(dataSection, normalized);
      }
    }

    const fallback = {};
    BACKUP_DATA_KEYS.forEach(key => {
      if (metadataKeys.has(key)) return;
      if (!Object.prototype.hasOwnProperty.call(parsed, key)) return;
      fallback[key] = normalizeBackupDataValue(key, parsed[key]);
    });
    if (Object.keys(fallback).length) {
      dataSection = mergeBackupDataSections(dataSection, fallback);
    }

    return {
      fileVersion: versionValue,
      settings: settingsSnapshot,
      sessionStorage: sessionSnapshot,
      data: isPlainObject(dataSection) ? dataSection : null,
    };
  }

  function triggerBackupDownload(url, fileName) {
    if (typeof document === 'undefined') {
      return false;
    }
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.rel = 'noopener';
    anchor.target = '_blank';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    let success = false;
    try {
      anchor.click();
      success = true;
    } catch (error) {
      console.warn('Failed to trigger backup download', error);
      success = false;
    }
    setTimeout(() => {
      try {
        anchor.remove();
      } catch (error) {
        void error;
      }
    }, 0);
    return success;
  }

  function encodeBackupDataUrl(payload) {
    if (typeof payload !== 'string') {
      return null;
    }

    try {
      return `data:application/json;charset=utf-8,${encodeURIComponent(payload)}`;
    } catch (error) {
      console.warn('Failed to encode backup payload as data URL', error);
      return null;
    }
  }

  function openBackupFallbackWindow(payload, fileName) {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return false;
    }

    let backupWindow = null;
    try {
      backupWindow = window.open('', '_blank', 'noopener');
    } catch (error) {
      console.warn('Failed to open fallback backup window', error);
      backupWindow = null;
    }

    if (!backupWindow) {
      return false;
    }

    try {
      const doc = backupWindow.document;
      if (!doc) {
        return false;
      }

      const langAttr = document && document.documentElement && document.documentElement.getAttribute
        ? document.documentElement.getAttribute('lang')
        : 'en';
      doc.open();
      doc.write(`<!DOCTYPE html><html lang="${langAttr || 'en'}"><head><meta charset="utf-8"><title>Manual download</title></head><body></body></html>`);
      doc.close();

      try {
        doc.title = fileName || 'backup.json';
      } catch (titleError) {
        void titleError;
      }

      const body = doc.body;
      if (!body) {
        return false;
      }

      body.style.margin = '0';
      body.style.padding = '1.5rem';
      body.style.background = '#f8f9fb';
      body.style.color = '#0f172a';
      body.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

      const container = doc.createElement('div');
      container.style.maxWidth = '960px';
      container.style.margin = '0 auto';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '1rem';

      const heading = doc.createElement('h1');
      heading.textContent = fileName || 'Manual backup';
      heading.style.margin = '0';
      heading.style.fontSize = '1.5rem';
      heading.style.fontWeight = '600';

      const description = doc.createElement('p');
      if (typeof getManualDownloadFallbackMessage === 'function') {
        description.textContent = getManualDownloadFallbackMessage();
      } else {
        description.textContent = 'Copy the text below and save it to a file ending with .json to keep your data safe.';
      }
      description.style.margin = '0';
      description.style.lineHeight = '1.5';

      const helper = doc.createElement('p');
      if (typeof getManualDownloadCopyHint === 'function') {
        helper.textContent = getManualDownloadCopyHint();
      } else {
        helper.textContent = 'Select the text, copy it and paste into your preferred notes app or text editor.';
      }
      helper.style.margin = '0';
      helper.style.lineHeight = '1.5';

      const textArea = doc.createElement('textarea');
      textArea.value = payload;
      textArea.readOnly = true;
      textArea.spellcheck = false;
      textArea.style.width = '100%';
      textArea.style.height = '70vh';
      textArea.style.resize = 'vertical';
      textArea.style.padding = '1rem';
      textArea.style.borderRadius = '1rem';
      textArea.style.border = '1px solid rgba(15, 23, 42, 0.15)';
      textArea.style.background = '#ffffff';
      textArea.style.fontFamily = "'SFMono-Regular', 'Roboto Mono', 'Menlo', 'Courier New', monospace";
      textArea.style.fontSize = '0.875rem';
      textArea.style.lineHeight = '1.5';
      textArea.style.boxShadow = '0 0.75rem 2.5rem rgba(15, 23, 42, 0.16)';

      container.appendChild(heading);
      container.appendChild(description);
      container.appendChild(helper);
      container.appendChild(textArea);
      body.appendChild(container);

      try {
        textArea.focus();
        textArea.select();
      } catch (focusError) {
        void focusError;
      }

      try {
        backupWindow.focus();
      } catch (focusWindowError) {
        void focusWindowError;
      }

      return true;
    } catch (renderError) {
      console.warn('Failed to render manual backup window', renderError);
      return false;
    }
  }

  function downloadBackupPayload(payload, fileName) {
    const failureResult = { success: false, method: null };

    if (typeof payload !== 'string') {
      return failureResult;
    }

    let blob = null;
    if (typeof Blob !== 'undefined') {
      try {
        blob = new Blob([payload], { type: 'application/json' });
      } catch (blobError) {
        console.warn('Failed to create backup blob', blobError);
        blob = null;
      }
    }

    if (blob) {
      if (typeof navigator !== 'undefined' && typeof navigator.msSaveOrOpenBlob === 'function') {
        try {
          const msSaveResult = navigator.msSaveOrOpenBlob(blob, fileName);
          if (msSaveResult === false) {
            console.warn('Saving backup via msSaveOrOpenBlob was cancelled or declined');
          } else {
            return { success: true, method: 'ms-save' };
          }
        } catch (msError) {
          console.warn('Failed to save backup via msSaveOrOpenBlob', msError);
        }
      }

      if (typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') {
        let objectUrl = null;
        try {
          objectUrl = URL.createObjectURL(blob);
        } catch (urlError) {
          console.warn('Failed to create object URL for backup blob', urlError);
          objectUrl = null;
        }

        if (objectUrl) {
          const triggered = triggerBackupDownload(objectUrl, fileName);
          if (typeof URL.revokeObjectURL === 'function') {
            setTimeout(() => {
              try {
                URL.revokeObjectURL(objectUrl);
              } catch (revokeError) {
                void revokeError;
              }
            }, 0);
          }
          if (triggered) {
            return { success: true, method: 'blob-url' };
          }
        }
      }
    }

    const encoded = encodeBackupDataUrl(payload);
    if (encoded) {
      const triggered = triggerBackupDownload(encoded, fileName);
      if (triggered) {
        return { success: true, method: 'data-url' };
      }
    }

    const opened = openBackupFallbackWindow(payload, fileName);
    if (opened) {
      return { success: true, method: 'manual' };
    }

    return failureResult;
  }

  function isAutoBackupName(name) {
    return typeof name === 'string'
      && (name.startsWith(SESSION_AUTO_BACKUP_NAME_PREFIX)
        || name.startsWith(SESSION_AUTO_BACKUP_DELETION_PREFIX));
  }

  function parseAutoBackupName(name) {
    if (typeof name !== 'string') {
      return null;
    }

    const config = (() => {
      if (name.startsWith(SESSION_AUTO_BACKUP_DELETION_PREFIX)) {
        return {
          prefixLength: SESSION_AUTO_BACKUP_DELETION_PREFIX.length,
          type: 'auto-backup-before-delete',
          includeSeconds: true,
          minParts: 6,
        };
      }
      if (name.startsWith(SESSION_AUTO_BACKUP_NAME_PREFIX)) {
        return {
          prefixLength: SESSION_AUTO_BACKUP_NAME_PREFIX.length,
          type: 'auto-backup',
          includeSeconds: false,
          minParts: 5,
        };
      }
      return null;
    })();

    if (!config) {
      return null;
    }

    const remainder = name.slice(config.prefixLength);
    const parts = remainder.split('-');
    if (parts.length < config.minParts) {
      return null;
    }

    const year = Number(parts[0]);
    const month = Number(parts[1]) - 1;
    const day = Number(parts[2]);
    const hour = Number(parts[3]);
    const minute = Number(parts[4]);

    const dateParts = [year, month, day, hour, minute];

    let labelParts = parts.slice(5);
    if (config.includeSeconds) {
      const secondsPart = labelParts.length ? labelParts[0] : '0';
      dateParts.push(Number(secondsPart));
      labelParts = labelParts.slice(1);
    }

    const label = labelParts.join('-').trim();
    const date = new Date(...dateParts);

    return {
      type: config.type,
      date: Number.isNaN(date.valueOf()) ? null : date,
      label,
      includeSeconds: config.includeSeconds,
    };
  }

  const backupAPI = freezeDeep({
    formatFullBackupFilename,
    resolveSafeLocalStorage,
    captureStorageSnapshot,
    createSafeStorageReader,
    restoreSessionStorageSnapshot,
    restoreLocalStorageSnapshot,
    sanitizeBackupPayload,
    parseBackupDataString,
    normalizeBackupDataSection,
    normalizeBackupDataValue,
    mergeBackupDataSections,
    extractBackupSections,
    triggerBackupDownload,
    encodeBackupDataUrl,
    openBackupFallbackWindow,
    downloadBackupPayload,
    isAutoBackupName,
    parseAutoBackupName,
    isPlainObject,
    constants: freezeDeep({
      SESSION_AUTO_BACKUP_NAME_PREFIX,
      SESSION_AUTO_BACKUP_DELETION_PREFIX,
      BACKUP_STORAGE_KEY_PREFIXES: BACKUP_STORAGE_KEY_PREFIXES.slice(),
      BACKUP_STORAGE_KNOWN_KEYS: Array.from(BACKUP_STORAGE_KNOWN_KEYS),
      BACKUP_METADATA_BASE_KEYS: Array.from(BACKUP_METADATA_BASE_KEYS),
      BACKUP_DATA_KEYS: BACKUP_DATA_KEYS.slice(),
      BACKUP_DATA_COMPLEX_KEYS: Array.from(BACKUP_DATA_COMPLEX_KEYS),
    }),
  });

  registerOrQueueModule(
    'cineFeatureBackup',
    backupAPI,
    {
      category: 'feature',
      description: 'Backup and restore helpers for snapshots, payload normalization, downloads and diff metadata.',
      replace: true,
    },
    (error) => {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to register cineFeatureBackup module.', error);
      }
    },
  );

  const globalExports = [
    ['cineFeatureBackup', backupAPI],
    ['formatFullBackupFilename', formatFullBackupFilename],
    ['resolveSafeLocalStorage', resolveSafeLocalStorage],
    ['captureStorageSnapshot', captureStorageSnapshot],
    ['createSafeStorageReader', createSafeStorageReader],
    ['restoreSessionStorageSnapshot', restoreSessionStorageSnapshot],
    ['restoreLocalStorageSnapshot', restoreLocalStorageSnapshot],
    ['sanitizeBackupPayload', sanitizeBackupPayload],
    ['parseBackupDataString', parseBackupDataString],
    ['normalizeBackupDataSection', normalizeBackupDataSection],
    ['normalizeBackupDataValue', normalizeBackupDataValue],
    ['mergeBackupDataSections', mergeBackupDataSections],
    ['extractBackupSections', extractBackupSections],
    ['triggerBackupDownload', triggerBackupDownload],
    ['encodeBackupDataUrl', encodeBackupDataUrl],
    ['openBackupFallbackWindow', openBackupFallbackWindow],
    ['downloadBackupPayload', downloadBackupPayload],
    ['isAutoBackupName', isAutoBackupName],
    ['parseAutoBackupName', parseAutoBackupName],
    ['SESSION_AUTO_BACKUP_NAME_PREFIX', SESSION_AUTO_BACKUP_NAME_PREFIX],
    ['SESSION_AUTO_BACKUP_DELETION_PREFIX', SESSION_AUTO_BACKUP_DELETION_PREFIX],
  ];

  globalExports.forEach(([name, value]) => {
    exposeGlobal(name, value, { configurable: true, writable: true });
  });
})();
