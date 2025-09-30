function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var GLOBAL_SCOPE = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : null;
if (GLOBAL_SCOPE && GLOBAL_SCOPE.__cineStorageInitialized) {
  if (typeof module !== 'undefined' && module && module.exports && GLOBAL_SCOPE.__cineStorageApi && typeof GLOBAL_SCOPE.__cineStorageApi === 'object') {
    module.exports = GLOBAL_SCOPE.__cineStorageApi;
  }
} else {
  try {
    Object.defineProperty(GLOBAL_SCOPE, '__cineStorageInitialized', { configurable: true, writable: true, value: true });
  } catch (storageInitFlagError) {
    if (GLOBAL_SCOPE) {
      GLOBAL_SCOPE.__cineStorageInitialized = true;
    }
    void storageInitFlagError;
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
var MOUNT_VOLTAGE_STORAGE_KEY_SYMBOL = typeof Symbol === 'function' ? Symbol.for('cinePowerPlanner.mountVoltageKey') : null;
function readGlobalStringValue(scope, key) {
  if (!scope || _typeof(scope) !== 'object') {
    return '';
  }
  if (key === 'MOUNT_VOLTAGE_STORAGE_KEY' && MOUNT_VOLTAGE_STORAGE_KEY_SYMBOL) {
    try {
      var symbolValue = scope[MOUNT_VOLTAGE_STORAGE_KEY_SYMBOL];
      if (typeof symbolValue === 'string' && symbolValue) {
        return symbolValue;
      }
    } catch (symbolReadError) {
      void symbolReadError;
    }
  }
  var descriptor = null;
  try {
    descriptor = Object.getOwnPropertyDescriptor(scope, key);
  } catch (descriptorError) {
    descriptor = null;
  }
  if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, 'value') && typeof descriptor.value === 'string' && descriptor.value) {
    return descriptor.value;
  }
  var directValue = '';
  try {
    directValue = scope[key];
  } catch (readError) {
    directValue = '';
  }
  return typeof directValue === 'string' && directValue ? directValue : '';
}
function exposeGlobalStringValue(scope, key, value) {
  if (!scope || _typeof(scope) !== 'object') {
    return '';
  }
  if (key === 'MOUNT_VOLTAGE_STORAGE_KEY' && MOUNT_VOLTAGE_STORAGE_KEY_SYMBOL) {
    try {
      scope[MOUNT_VOLTAGE_STORAGE_KEY_SYMBOL] = value;
      var symbolAssigned = scope[MOUNT_VOLTAGE_STORAGE_KEY_SYMBOL];
      if (typeof symbolAssigned === 'string' && symbolAssigned) {
        return symbolAssigned;
      }
    } catch (symbolExposeError) {
      void symbolExposeError;
    }
  }
  var descriptor = null;
  try {
    descriptor = Object.getOwnPropertyDescriptor(scope, key);
  } catch (descriptorError) {
    descriptor = null;
    void descriptorError;
  }
  if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, 'value') && typeof descriptor.value === 'string' && descriptor.value) {
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
  if (key === 'MOUNT_VOLTAGE_STORAGE_KEY' && typeof console !== 'undefined' && typeof console.warn === 'function') {
    console.warn('Unable to expose mount voltage storage key globally. Using fallback only.');
  }
  return '';
}
function resolveMountVoltageStorageKeyName() {
  var fallback = 'cameraPowerPlanner_mountVoltages';
  if (!GLOBAL_SCOPE || _typeof(GLOBAL_SCOPE) !== 'object') {
    return fallback;
  }
  var existing = readGlobalStringValue(GLOBAL_SCOPE, 'MOUNT_VOLTAGE_STORAGE_KEY');
  if (existing) {
    return existing;
  }
  var exposed = exposeGlobalStringValue(GLOBAL_SCOPE, 'MOUNT_VOLTAGE_STORAGE_KEY', fallback);
  if (exposed) {
    return exposed;
  }
  return fallback;
}
var MOUNT_VOLTAGE_STORAGE_KEY_NAME = resolveMountVoltageStorageKeyName();
function ensureCustomFontStorageKeyName() {
  if (!GLOBAL_SCOPE) {
    return CUSTOM_FONT_STORAGE_KEY_DEFAULT;
  }
  var existingName = typeof GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY_NAME === 'string' ? GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY_NAME : typeof GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY === 'string' ? GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY : CUSTOM_FONT_STORAGE_KEY_DEFAULT;
  var normalizedName = existingName;
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
  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY_NAME === 'string') {
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
  var existing = typeof GLOBAL_SCOPE.TEMPERATURE_UNIT_STORAGE_KEY === 'string' ? GLOBAL_SCOPE.TEMPERATURE_UNIT_STORAGE_KEY : TEMPERATURE_UNIT_STORAGE_KEY_DEFAULT;
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
          value: existing
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
if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
  try {
    if (!Object.prototype.hasOwnProperty.call(GLOBAL_SCOPE, '__CINE_AUTO_BACKUP_RENAMED_FLAG')) {
      Object.defineProperty(GLOBAL_SCOPE, '__CINE_AUTO_BACKUP_RENAMED_FLAG', {
        configurable: true,
        writable: false,
        value: STORAGE_AUTO_BACKUP_RENAMED_FLAG
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
var MAX_AUTO_BACKUPS = 50;
var MAX_DELETION_BACKUPS = 20;
var MAX_FULL_BACKUP_HISTORY_ENTRIES = 200;
var AUTO_GEAR_BACKUP_RETENTION_DEFAULT_VALUE = 12;
var AUTO_GEAR_BACKUP_RETENTION_MIN = 1;
function ensureGlobalAutoGearBackupDefaults() {
  if (!GLOBAL_SCOPE || _typeof(GLOBAL_SCOPE) !== 'object') {
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
var STORAGE_BACKUP_SUFFIX = '__backup';
var MAX_SAVE_ATTEMPTS = 3;
var MAX_QUOTA_RECOVERY_STEPS = 100;
var STORAGE_MIGRATION_BACKUP_SUFFIX = '__legacyMigrationBackup';
var RAW_STORAGE_BACKUP_KEYS = new Set([getCustomFontStorageKeyName(), CUSTOM_LOGO_STORAGE_KEY, DEVICE_SCHEMA_CACHE_KEY, MOUNT_VOLTAGE_STORAGE_KEY_NAME]);
var MAX_MIGRATION_BACKUP_CLEANUP_STEPS = 10;
var MIGRATION_BACKUP_COMPRESSION_ALGORITHM = 'lz-string';
var MIGRATION_BACKUP_COMPRESSION_ENCODING = 'json-string';
function canUseMigrationBackupCompression() {
  return (typeof LZString === "undefined" ? "undefined" : _typeof(LZString)) === 'object' && LZString !== null && typeof LZString.compressToUTF16 === 'function' && typeof LZString.decompressFromUTF16 === 'function';
}
function tryCreateCompressedMigrationBackupCandidate(serializedPayload, createdAt) {
  if (typeof serializedPayload !== 'string' || !serializedPayload) {
    return null;
  }
  if (!canUseMigrationBackupCompression()) {
    return null;
  }
  var compressed;
  try {
    compressed = LZString.compressToUTF16(serializedPayload);
  } catch (compressionError) {
    console.warn('Unable to compress migration backup payload', compressionError);
    return null;
  }
  if (typeof compressed !== 'string' || !compressed || compressed.length >= serializedPayload.length) {
    return null;
  }
  var serializedCompressedPayload;
  try {
    serializedCompressedPayload = JSON.stringify({
      createdAt: createdAt,
      compression: MIGRATION_BACKUP_COMPRESSION_ALGORITHM,
      encoding: MIGRATION_BACKUP_COMPRESSION_ENCODING,
      data: compressed,
      originalSize: serializedPayload.length,
      compressedSize: compressed.length
    });
  } catch (serializationError) {
    console.warn('Unable to serialize compressed migration backup payload', serializationError);
    return null;
  }
  return {
    serialized: serializedCompressedPayload,
    originalSize: serializedPayload.length,
    compressedSize: compressed.length
  };
}
function parseMigrationBackupMetadata(raw) {
  if (typeof raw !== 'string' || !raw) {
    return {
      createdAt: 0,
      size: typeof raw === 'string' ? raw.length : 0
    };
  }
  var metadata = {
    createdAt: 0,
    size: raw.length
  };
  try {
    var parsed = JSON.parse(raw);
    if (parsed && _typeof(parsed) === 'object') {
      var candidate = typeof parsed.createdAt === 'string' ? parsed.createdAt.trim() : '';
      if (candidate) {
        var timestamp = Date.parse(candidate);
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
  var snapshot;
  try {
    snapshot = snapshotStorageEntries(storage, {
      suppressAlerts: true
    });
  } catch (error) {
    console.warn('Unable to inspect storage while preparing migration backup cleanup', error);
    return [];
  }
  if (!snapshot || _typeof(snapshot) !== 'object') {
    return [];
  }
  return Object.keys(snapshot).filter(function (candidate) {
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
  }).map(function (candidate) {
    var raw = snapshot[candidate];
    var normalized = typeof raw === 'string' ? raw : raw === null || raw === undefined ? '' : String(raw);
    var metadata = parseMigrationBackupMetadata(normalized);
    return {
      key: candidate,
      createdAt: metadata.createdAt,
      size: metadata.size
    };
  }).sort(function (a, b) {
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
  var entries = collectMigrationBackupEntriesForCleanup(storage, excludeKey);
  if (!entries.length) {
    return [];
  }
  var removedKeys = [];
  var target = entries[0];
  try {
    storage.removeItem(target.key);
    removedKeys.push(target.key);
  } catch (error) {
    console.warn("Unable to remove migration backup ".concat(target.key, " during cleanup"), error);
  }
  return removedKeys;
}
function attemptMigrationBackupQuotaRecovery(storage, key, backupKey, tryWrite) {
  if (!storage || typeof storage.setItem !== 'function') {
    return {
      success: false,
      error: null
    };
  }
  var removedBackups = [];
  var lastError = null;
  if (typeof tryWrite !== 'function') {
    return {
      success: false,
      error: null
    };
  }
  var attemptWrite = function attemptWrite() {
    var result = tryWrite();
    if (result && _typeof(result) === 'object' && 'error' in result && result.error) {
      lastError = result.error;
    }
    if (result && result.success) {
      return {
        success: true,
        quota: false
      };
    }
    if (result && result.quota) {
      return {
        success: false,
        quota: true,
        error: result.error || null
      };
    }
    return {
      success: false,
      quota: false,
      error: result && result.error ? result.error : null
    };
  };
  if (typeof clearUiCacheStorageEntries === 'function') {
    var cleared = false;
    try {
      clearUiCacheStorageEntries();
      cleared = true;
    } catch (clearError) {
      console.warn('Unable to clear cached UI storage entries before creating migration backup', clearError);
    }
    if (cleared) {
      var retryAfterClear = attemptWrite();
      if (retryAfterClear.success) {
        console.warn("Cleared cached planner data to free storage before creating migration backup for ".concat(key, "."));
        return {
          success: true,
          error: null
        };
      }
      if (!retryAfterClear.quota) {
        return {
          success: false,
          error: retryAfterClear.error
        };
      }
    }
  }
  for (var attempt = 0; attempt < MAX_MIGRATION_BACKUP_CLEANUP_STEPS; attempt += 1) {
    var removed = pruneMigrationBackupEntriesForCleanup(storage, backupKey);
    if (!removed.length) {
      break;
    }
    removedBackups.push.apply(removedBackups, _toConsumableArray(removed));
    var retry = attemptWrite();
    if (retry.success) {
      console.warn("Removed ".concat(removedBackups.length, " older migration backup").concat(removedBackups.length > 1 ? 's' : '', " to free up storage before creating migration backup for ").concat(key, "."), removedBackups);
      return {
        success: true,
        error: null
      };
    }
    if (!retry.quota) {
      return {
        success: false,
        error: retry.error
      };
    }
  }
  if (removedBackups.length > 0) {
    console.warn("Removed ".concat(removedBackups.length, " older migration backup").concat(removedBackups.length > 1 ? 's' : '', " while attempting to create migration backup for ").concat(key, ", but storage quota is still exceeded."), removedBackups);
  }
  return {
    success: false,
    error: lastError
  };
}
function ensurePreWriteMigrationBackup(storage, key) {
  if (!storage || typeof storage.getItem !== 'function' || !key) {
    return null;
  }
  var rawValue = null;
  try {
    rawValue = storage.getItem(key);
  } catch (inspectionError) {
    console.warn("Unable to inspect existing value for ".concat(key, " before creating migration backup"), inspectionError);
    return null;
  }
  if (rawValue === null || rawValue === undefined) {
    return null;
  }
  var parsedValue = rawValue;
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
  var backupKey = "".concat(key).concat(STORAGE_MIGRATION_BACKUP_SUFFIX);
  var hasExistingBackup = false;
  if (typeof storage.getItem === 'function') {
    try {
      var existing = storage.getItem(backupKey);
      if (existing !== null && existing !== undefined) {
        hasExistingBackup = true;
      }
    } catch (inspectionError) {
      console.warn("Unable to inspect migration backup for ".concat(key), inspectionError);
    }
  }
  if (hasExistingBackup) {
    return;
  }
  var serialized;
  var createdAt = new Date().toISOString();
  try {
    serialized = JSON.stringify({
      createdAt: createdAt,
      data: originalValue
    });
  } catch (serializationError) {
    console.warn("Unable to serialize migration backup for ".concat(key), serializationError);
    return;
  }
  var _tryStoreSerialized = function tryStoreSerialized(candidate) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _ref = options || {},
      _ref$logCompression = _ref.logCompression,
      logCompression = _ref$logCompression === void 0 ? false : _ref$logCompression,
      _ref$info = _ref.info,
      info = _ref$info === void 0 ? null : _ref$info;
    try {
      storage.setItem(backupKey, candidate.serialized);
      if (logCompression && info && !_tryStoreSerialized.compressionLogged) {
        _tryStoreSerialized.compressionLogged = true;
        var savings = info.originalSize - info.compressedSize;
        var percent = info.originalSize > 0 ? Math.round(savings / info.originalSize * 100) : 0;
        console.warn("Stored compressed migration backup for ".concat(key, " to reduce storage usage by ").concat(savings, " characters (").concat(percent, "%)."));
      }
      return {
        success: true,
        quota: false
      };
    } catch (error) {
      return {
        success: false,
        quota: isQuotaExceededError(error),
        error: error
      };
    }
  };
  _tryStoreSerialized.compressionLogged = _tryStoreSerialized.compressionLogged || false;
  var standardCandidate = {
    serialized: serialized
  };
  var standardResult = _tryStoreSerialized(standardCandidate);
  if (standardResult.success) {
    return;
  }
  var handleFailure = function handleFailure(error) {
    console.warn("Unable to create migration backup for ".concat(key), error);
  };
  if (!standardResult.quota) {
    handleFailure(standardResult.error);
    return;
  }
  var compressedCandidate = tryCreateCompressedMigrationBackupCandidate(serialized, createdAt);
  var runRecoveryWith = function runRecoveryWith(candidate, options, fallbackError) {
    var recovery = attemptMigrationBackupQuotaRecovery(storage, key, backupKey, function () {
      return _tryStoreSerialized(candidate, options);
    });
    if (recovery && recovery.success) {
      return true;
    }
    var errorToReport = recovery && recovery.error ? recovery.error : fallbackError;
    handleFailure(errorToReport);
    alertStorageError('migration-backup-quota');
    return false;
  };
  if (compressedCandidate) {
    var compressedResult = _tryStoreSerialized(compressedCandidate, {
      logCompression: true,
      info: compressedCandidate
    });
    if (compressedResult.success) {
      return;
    }
    if (!compressedResult.quota) {
      handleFailure(compressedResult.error);
      return;
    }
    if (runRecoveryWith(compressedCandidate, {
      logCompression: true,
      info: compressedCandidate
    }, compressedResult.error)) {
      return;
    }
    return;
  }
  if (runRecoveryWith(standardCandidate, {}, standardResult.error)) {
    return;
  }
}
var PRIMARY_STORAGE_KEYS = [DEVICE_STORAGE_KEY, SETUP_STORAGE_KEY, SESSION_STATE_KEY, FEEDBACK_STORAGE_KEY, PROJECT_STORAGE_KEY, FAVORITES_STORAGE_KEY, DEVICE_SCHEMA_CACHE_KEY, AUTO_GEAR_RULES_STORAGE_KEY, AUTO_GEAR_SEEDED_STORAGE_KEY, AUTO_GEAR_BACKUPS_STORAGE_KEY, AUTO_GEAR_PRESETS_STORAGE_KEY, AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY, AUTO_GEAR_AUTO_PRESET_STORAGE_KEY, AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY, AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY];
var SIMPLE_STORAGE_KEYS = [CUSTOM_LOGO_STORAGE_KEY, getCustomFontStorageKeyName(), 'darkMode', 'pinkMode', 'highContrast', 'reduceMotion', 'relaxedSpacing', 'showAutoBackups', 'accentColor', 'fontSize', 'fontFamily', 'language', 'iosPwaHelpShown', TEMPERATURE_UNIT_STORAGE_KEY_NAME];
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
var DEVICE_COLLECTION_KEYS = ['cameras', 'monitors', 'video', 'viewfinders', 'directorMonitors', 'iosVideo', 'videoAssist', 'media', 'lenses', 'batteries', 'batteryHotswaps', 'wirelessReceivers'];
var FIZ_COLLECTION_KEYS = ['motors', 'handUnits', 'controllers', 'distance'];
var ACCESSORY_COLLECTION_KEYS = ['chargers', 'cages', 'powerPlates', 'cameraSupport', 'matteboxes', 'filters', 'rigging', 'batteries', 'cables', 'videoAssist', 'media', 'tripodHeads', 'tripods', 'sliders', 'cameraStabiliser', 'grip', 'carts'];
var getStorageManager = function getStorageManager() {
  return typeof navigator !== 'undefined' && navigator && _typeof(navigator.storage) === 'object' ? navigator.storage : null;
};
var STORAGE_TEST_KEY = '__storage_test__';
var QUOTA_ERROR_NAMES = new Set(['QuotaExceededError', 'NS_ERROR_DOM_QUOTA_REACHED']);
var QUOTA_ERROR_CODES = new Set([22, 1014]);
var QUOTA_ERROR_NUMBERS = new Set([22, 1014]);
function isQuotaExceededError(error) {
  if (!error || _typeof(error) !== 'object') {
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
      for (var i = 0; i < PRIMARY_STORAGE_KEYS.length; i += 1) {
        var key = PRIMARY_STORAGE_KEYS[i];
        if (storage.getItem(key) !== null) {
          return true;
        }
        var backupKey = "".concat(key).concat(STORAGE_BACKUP_SUFFIX);
        if (storage.getItem(backupKey) !== null) {
          return true;
        }
      }
      for (var _i = 0; _i < SIMPLE_STORAGE_KEYS.length; _i += 1) {
        var _key = SIMPLE_STORAGE_KEYS[_i];
        if (storage.getItem(_key) !== null) {
          return true;
        }
        if (RAW_STORAGE_BACKUP_KEYS.has(_key)) {
          var _backupKey = "".concat(_key).concat(STORAGE_BACKUP_SUFFIX);
          if (storage.getItem(_backupKey) !== null) {
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
      var length = typeof storage.length === 'number' ? storage.length : 0;
      for (var index = 0; index < length; index += 1) {
        var candidate = storage.key(index);
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
      console.warn('localStorage quota exceeded. Existing planner data will remain available but new saves may fail.', error);
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
  var memoryStore = {};
  return {
    get length() {
      return Object.keys(memoryStore).length;
    },
    key: function key(index) {
      var keys = Object.keys(memoryStore);
      return index >= 0 && index < keys.length ? keys[index] : null;
    },
    getItem: function getItem(key) {
      return Object.prototype.hasOwnProperty.call(memoryStore, key) ? memoryStore[key] : null;
    },
    setItem: function setItem(key, value) {
      memoryStore[key] = String(value);
    },
    removeItem: function removeItem(key) {
      delete memoryStore[key];
    },
    clear: function clear() {
      memoryStore = {};
    },
    keys: function keys() {
      return Object.keys(memoryStore);
    }
  };
}
function initializeSafeLocalStorage() {
  if (typeof window !== 'undefined') {
    var candidate = null;
    try {
      if ('localStorage' in window) {
        candidate = window.localStorage;
        var storage = verifyStorage(candidate);
        if (storage) {
          lastFailedUpgradeCandidate = null;
          return {
            storage: storage,
            type: 'local'
          };
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
        var _storage = verifyStorage(window.sessionStorage);
        if (_storage) {
          console.warn('Falling back to sessionStorage; data persists for this tab only.');
          alertSessionFallback();
          return {
            storage: _storage,
            type: 'session'
          };
        }
      }
    } catch (e) {
      console.warn('sessionStorage fallback is unavailable:', e);
    }
  }
  alertStorageError();
  return {
    storage: createMemoryStorage(),
    type: 'memory'
  };
}
var lastFailedUpgradeCandidate = null;
var safeLocalStorageInfo = initializeSafeLocalStorage();
function migrateSnapshotToStorage(snapshot, target) {
  var migratedKeys = [];
  var failedKeys = [];
  if (!snapshot || !target || typeof target.setItem !== 'function') {
    return {
      migratedKeys: migratedKeys,
      failedKeys: failedKeys
    };
  }
  Object.keys(snapshot).forEach(function (key) {
    var value = snapshot[key];
    if (value === null || value === undefined) {
      return;
    }
    var existing = null;
    var existingRead = false;
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
  return {
    migratedKeys: migratedKeys,
    failedKeys: failedKeys
  };
}
function clearMigratedKeys(snapshot, source, keysToRemove) {
  if (!snapshot || !source || typeof source.removeItem !== 'function') {
    return;
  }
  var keys = Array.isArray(keysToRemove) && keysToRemove.length > 0 ? keysToRemove : Object.keys(snapshot);
  keys.forEach(function (key) {
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
  keys.forEach(function (key) {
    try {
      target.removeItem(key);
    } catch (error) {
      console.warn('Unable to roll back migrated storage key after upgrade failure', key, error);
    }
  });
}
function snapshotStorageEntries(storage) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var snapshot = Object.create(null);
  if (!storage) {
    return snapshot;
  }
  var _ref2 = options || {},
    _ref2$suppressAlerts = _ref2.suppressAlerts,
    suppressAlerts = _ref2$suppressAlerts === void 0 ? false : _ref2$suppressAlerts;
  var captureKey = function captureKey(key) {
    if (typeof key !== 'string' || !key) {
      return;
    }
    var value;
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
    for (var index = 0; index < storage.length; index += 1) {
      captureKey(storage.key(index));
    }
    return snapshot;
  }
  if (typeof storage.keys === 'function') {
    try {
      var keys = storage.keys();
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
      storage.forEach(function (value, key) {
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
  if (!GLOBAL_SCOPE || _typeof(GLOBAL_SCOPE) !== 'object') {
    return;
  }
  try {
    Object.defineProperty(GLOBAL_SCOPE, 'SAFE_LOCAL_STORAGE', {
      configurable: true,
      get: getSafeLocalStorage
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
  var activeStorage = safeLocalStorageInfo.storage;
  if (!activeStorage || failingStorage && failingStorage !== activeStorage) {
    return;
  }
  var snapshot = Object.create(null);
  try {
    snapshot = snapshotStorageEntries(activeStorage, {
      suppressAlerts: true
    });
  } catch (snapshotError) {
    console.warn('Unable to capture storage snapshot during downgrade', snapshotError);
  }
  var memoryStorage = createMemoryStorage();
  Object.keys(snapshot).forEach(function (key) {
    try {
      memoryStorage.setItem(key, snapshot[key]);
    } catch (copyError) {
      console.warn('Unable to copy storage entry to memory during downgrade', key, copyError);
    }
  });
  safeLocalStorageInfo = {
    storage: memoryStorage,
    type: 'memory'
  };
  lastFailedUpgradeCandidate = null;
  console.warn(reason ? "Downgraded planner storage to in-memory fallback after ".concat(reason, " errors.") : 'Downgraded planner storage to in-memory fallback after storage errors.', error);
  updateGlobalSafeLocalStorageReference();
}
function attemptLocalStorageUpgrade() {
  if (!safeLocalStorageInfo || safeLocalStorageInfo.type === 'local') {
    return safeLocalStorageInfo.storage;
  }
  if (typeof window === 'undefined') {
    return safeLocalStorageInfo.storage;
  }
  var candidate;
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
  var verified;
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
  var snapshot = snapshotStorageEntries(safeLocalStorageInfo.storage);
  var _migrateSnapshotToSto = migrateSnapshotToStorage(snapshot, verified),
    migratedKeys = _migrateSnapshotToSto.migratedKeys,
    failedKeys = _migrateSnapshotToSto.failedKeys;
  if (failedKeys.length > 0) {
    rollbackMigratedKeys(verified, migratedKeys);
    console.warn('Aborting localStorage upgrade because some entries could not be migrated. Continuing to use fallback storage.', failedKeys);
    alertStorageError('migration-write');
    lastFailedUpgradeCandidate = candidate;
    return safeLocalStorageInfo.storage;
  }
  clearMigratedKeys(snapshot, safeLocalStorageInfo.storage, migratedKeys);
  safeLocalStorageInfo = {
    storage: verified,
    type: 'local'
  };
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
var persistentStorageRequestPromise = null;
function requestPersistentStorage() {
  if (persistentStorageRequestPromise) {
    return persistentStorageRequestPromise;
  }
  var storageManager = getStorageManager();
  if (!storageManager || typeof storageManager.persist !== 'function') {
    persistentStorageRequestPromise = Promise.resolve({
      supported: Boolean(storageManager),
      granted: false,
      alreadyGranted: false
    });
    return persistentStorageRequestPromise;
  }
  persistentStorageRequestPromise = _asyncToGenerator(_regenerator().m(function _callee() {
    var alreadyGranted, supportsPersistedCheck, granted, persisted, _t, _t2, _t3;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          alreadyGranted = false;
          supportsPersistedCheck = typeof storageManager.persisted === 'function';
          if (!supportsPersistedCheck) {
            _context.n = 4;
            break;
          }
          _context.p = 1;
          _context.n = 2;
          return storageManager.persisted();
        case 2:
          alreadyGranted = _context.v;
          _context.n = 4;
          break;
        case 3:
          _context.p = 3;
          _t = _context.v;
          console.warn('Unable to determine persistent storage state', _t);
        case 4:
          if (!alreadyGranted) {
            _context.n = 5;
            break;
          }
          return _context.a(2, {
            supported: true,
            granted: true,
            alreadyGranted: true
          });
        case 5:
          _context.p = 5;
          _context.n = 6;
          return storageManager.persist();
        case 6:
          granted = _context.v;
          if (!(!granted && supportsPersistedCheck)) {
            _context.n = 11;
            break;
          }
          _context.p = 7;
          _context.n = 8;
          return storageManager.persisted();
        case 8:
          persisted = _context.v;
          if (!persisted) {
            _context.n = 9;
            break;
          }
          return _context.a(2, {
            supported: true,
            granted: true,
            alreadyGranted: true
          });
        case 9:
          _context.n = 11;
          break;
        case 10:
          _context.p = 10;
          _t2 = _context.v;
          console.warn('Unable to verify persistent storage after request', _t2);
        case 11:
          return _context.a(2, {
            supported: true,
            granted: granted,
            alreadyGranted: false
          });
        case 12:
          _context.p = 12;
          _t3 = _context.v;
          console.warn('Persistent storage request failed', _t3);
          return _context.a(2, {
            supported: true,
            granted: false,
            alreadyGranted: false,
            error: _t3
          });
      }
    }, _callee, null, [[7, 10], [5, 12], [1, 3]]);
  }))();
  return persistentStorageRequestPromise;
}
if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
  requestPersistentStorage();
}
function isPlainObject(val) {
  if (val === null || _typeof(val) !== 'object') {
    return false;
  }
  var prototype;
  try {
    prototype = Object.getPrototypeOf(val);
  } catch (_unused) {
    return false;
  }
  if (prototype === null || prototype === Object.prototype) {
    return true;
  }
  var secondLevel = Object.getPrototypeOf(prototype);
  if (secondLevel === null && typeof prototype.constructor === 'function') {
    var name = prototype.constructor.name;
    return name === 'Object' || name === '';
  }
  return false;
}
function parseAutoBackupKey(name) {
  if (typeof name !== 'string') {
    return {
      timestamp: Number.NEGATIVE_INFINITY,
      label: ''
    };
  }
  if (name.startsWith(STORAGE_AUTO_BACKUP_NAME_PREFIX)) {
    var match = name.match(/^auto-backup-(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})(?:-(.*))?$/);
    if (!match) {
      return {
        timestamp: Number.NEGATIVE_INFINITY,
        label: ''
      };
    }
    var _match = _slicedToArray(match, 7),
      year = _match[1],
      month = _match[2],
      day = _match[3],
      hour = _match[4],
      minute = _match[5],
      _match$ = _match[6],
      rawLabel = _match$ === void 0 ? '' : _match$;
    var date = new Date(Number.parseInt(year, 10), Number.parseInt(month, 10) - 1, Number.parseInt(day, 10), Number.parseInt(hour, 10), Number.parseInt(minute, 10), 0, 0);
    var time = date.getTime();
    return {
      timestamp: Number.isNaN(time) ? Number.NEGATIVE_INFINITY : time,
      label: rawLabel.trim()
    };
  }
  if (name.startsWith(STORAGE_AUTO_BACKUP_DELETION_PREFIX)) {
    var _match2 = name.match(/^auto-backup-before-delete-(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})(?:-(.*))?$/);
    if (!_match2) {
      return {
        timestamp: Number.NEGATIVE_INFINITY,
        label: ''
      };
    }
    var _match3 = _slicedToArray(_match2, 8),
      _year = _match3[1],
      _month = _match3[2],
      _day = _match3[3],
      _hour = _match3[4],
      _minute = _match3[5],
      second = _match3[6],
      _match3$ = _match3[7],
      _rawLabel = _match3$ === void 0 ? '' : _match3$;
    var _date = new Date(Number.parseInt(_year, 10), Number.parseInt(_month, 10) - 1, Number.parseInt(_day, 10), Number.parseInt(_hour, 10), Number.parseInt(_minute, 10), Number.parseInt(second, 10), 0);
    var _time = _date.getTime();
    return {
      timestamp: Number.isNaN(_time) ? Number.NEGATIVE_INFINITY : _time,
      label: _rawLabel.trim()
    };
  }
  return {
    timestamp: Number.NEGATIVE_INFINITY,
    label: ''
  };
}
function collectAutoBackupEntries(container, prefix) {
  if (!isPlainObject(container) || typeof prefix !== 'string') {
    return [];
  }
  return Object.keys(container).filter(function (key) {
    return typeof key === 'string' && key.startsWith(prefix);
  }).map(function (key) {
    var _parseAutoBackupKey = parseAutoBackupKey(key),
      timestamp = _parseAutoBackupKey.timestamp,
      label = _parseAutoBackupKey.label;
    return {
      key: key,
      timestamp: timestamp,
      label: label
    };
  }).sort(function (a, b) {
    if (a.timestamp !== b.timestamp) {
      return a.timestamp - b.timestamp;
    }
    return a.key.localeCompare(b.key);
  });
}
function markAutoBackupValueAsRenamed(value) {
  if (!value || _typeof(value) !== 'object') {
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
        value: true
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
  if (!value || _typeof(value) !== 'object') {
    return false;
  }
  if (value[STORAGE_AUTO_BACKUP_RENAMED_FLAG] === true) {
    return true;
  }
  if (isPlainObject(value.projectInfo) && value.projectInfo[STORAGE_AUTO_BACKUP_RENAMED_FLAG] === true) {
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
  if (!entry || _typeof(entry) !== 'object') {
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
    return "[".concat(value.map(function (item) {
      return createStableValueSignature(item);
    }).join(','), "]");
  }
  if (value instanceof Date) {
    var timestamp = value.getTime();
    if (Number.isNaN(timestamp)) {
      return 'date:invalid';
    }
    return "date:".concat(timestamp);
  }
  if (isPlainObject(value)) {
    var keys = Object.keys(value).sort();
    var entries = keys.map(function (key) {
      return "".concat(JSON.stringify(key), ":").concat(createStableValueSignature(value[key]));
    });
    return "{".concat(entries.join(','), "}");
  }
  if (typeof value === 'number') {
    if (Number.isNaN(value)) {
      return 'number:NaN';
    }
    if (!Number.isFinite(value)) {
      return value > 0 ? 'number:Infinity' : 'number:-Infinity';
    }
    return "number:".concat(value);
  }
  if (typeof value === 'bigint') {
    return "bigint:".concat(value.toString());
  }
  if (typeof value === 'boolean') {
    return value ? 'boolean:true' : 'boolean:false';
  }
  if (typeof value === 'string') {
    return "string:".concat(value);
  }
  if (_typeof(value) === 'symbol') {
    return "symbol:".concat(String(value));
  }
  if (typeof value === 'function') {
    return "function:".concat(value.name || 'anonymous');
  }
  return "".concat(_typeof(value), ":").concat(String(value));
}
function removeSingleDuplicateAutoBackupEntry(container, entries) {
  if (!isPlainObject(container) || !Array.isArray(entries) || entries.length < 2) {
    return null;
  }
  var seenSignaturesByLabel = new Map();
  for (var index = entries.length - 1; index >= 0; index -= 1) {
    var entry = entries[index];
    if (!entry || typeof entry.key !== 'string') {
      continue;
    }
    if (isRenamedAutoBackupEntry(container, entry.key)) {
      continue;
    }
    var labelKey = getAutoBackupLabelKey(entry);
    var labelSignatures = seenSignaturesByLabel.get(labelKey) || new Set();
    var value = Object.prototype.hasOwnProperty.call(container, entry.key) ? container[entry.key] : undefined;
    var signature = createStableValueSignature(value);
    if (labelSignatures.has(signature)) {
      delete container[entry.key];
      entries.splice(index, 1);
      return entry.key;
    }
    labelSignatures.add(signature);
    seenSignaturesByLabel.set(labelKey, labelSignatures);
  }
  return null;
}
function removeDuplicateAutoBackupEntries(container, entries) {
  var removedKeys = [];
  while (true) {
    var removedKey = removeSingleDuplicateAutoBackupEntry(container, entries);
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
  var labelCounts = new Map();
  for (var _index = 0; _index < entries.length; _index += 1) {
    var entry = entries[_index];
    if (!entry || _typeof(entry) !== 'object') {
      continue;
    }
    var labelKey = getAutoBackupLabelKey(entry);
    labelCounts.set(labelKey, (labelCounts.get(labelKey) || 0) + 1);
  }
  var index = 0;
  while (entries.length > limit && index < entries.length) {
    var _entry = entries[index];
    if (!_entry || typeof _entry.key !== 'string') {
      index += 1;
      continue;
    }
    if (isRenamedAutoBackupEntry(container, _entry.key)) {
      index += 1;
      continue;
    }
    var _labelKey = getAutoBackupLabelKey(_entry);
    var count = labelCounts.get(_labelKey) || 0;
    if (_labelKey && count > 1) {
      delete container[_entry.key];
      entries.splice(index, 1);
      labelCounts.set(_labelKey, count - 1);
      removedKeys.push(_entry.key);
      continue;
    }
    index += 1;
  }
  if (entries.length <= limit) {
    return;
  }
  index = 0;
  while (entries.length > limit && index < entries.length) {
    var _entry2 = entries[index];
    if (!_entry2 || typeof _entry2.key !== 'string') {
      index += 1;
      continue;
    }
    if (isRenamedAutoBackupEntry(container, _entry2.key)) {
      index += 1;
      continue;
    }
    var _labelKey2 = getAutoBackupLabelKey(_entry2);
    var _count = labelCounts.get(_labelKey2) || 0;
    delete container[_entry2.key];
    entries.splice(index, 1);
    labelCounts.set(_labelKey2, Math.max(0, _count - 1));
    removedKeys.push(_entry2.key);
  }
  if (entries.length > limit) {
    for (var fallbackIndex = entries.length - 1; entries.length > limit && fallbackIndex >= 0; fallbackIndex -= 1) {
      var _entry3 = entries[fallbackIndex];
      if (!_entry3 || typeof _entry3.key !== 'string') {
        continue;
      }
      delete container[_entry3.key];
      entries.splice(fallbackIndex, 1);
      removedKeys.push(_entry3.key);
    }
  }
}
function enforceAutoBackupLimits(container) {
  if (!isPlainObject(container)) {
    return [];
  }
  var removed = [];
  var autoBackups = collectAutoBackupEntries(container, STORAGE_AUTO_BACKUP_NAME_PREFIX);
  if (autoBackups.length > MAX_AUTO_BACKUPS) {
    removed.push.apply(removed, _toConsumableArray(removeDuplicateAutoBackupEntries(container, autoBackups)));
    pruneAutoBackupEntries(container, autoBackups, MAX_AUTO_BACKUPS, removed);
  }
  var deletionBackups = collectAutoBackupEntries(container, STORAGE_AUTO_BACKUP_DELETION_PREFIX);
  if (deletionBackups.length > MAX_DELETION_BACKUPS) {
    removed.push.apply(removed, _toConsumableArray(removeDuplicateAutoBackupEntries(container, deletionBackups)));
    pruneAutoBackupEntries(container, deletionBackups, MAX_DELETION_BACKUPS, removed);
  }
  if (removed.length > 0) {
    console.warn("Removed ".concat(removed.length, " older automatic backup").concat(removed.length > 1 ? 's' : '', " to stay within storage limits."), removed);
  }
  return removed;
}
function removeOldestAutoBackupEntry(container) {
  if (!isPlainObject(container)) {
    return null;
  }
  var autoBackups = collectAutoBackupEntries(container, STORAGE_AUTO_BACKUP_NAME_PREFIX);
  var duplicateAutoBackupKey = removeSingleDuplicateAutoBackupEntry(container, autoBackups);
  if (duplicateAutoBackupKey) {
    return duplicateAutoBackupKey;
  }
  if (autoBackups.length > 0) {
    var fallback = null;
    for (var index = 0; index < autoBackups.length; index += 1) {
      var candidate = autoBackups[index];
      if (!candidate || typeof candidate.key !== 'string') {
        continue;
      }
      if (!isRenamedAutoBackupEntry(container, candidate.key)) {
        delete container[candidate.key];
        return candidate.key;
      }
      if (!fallback) {
        fallback = candidate;
      }
    }
    if (fallback && typeof fallback.key === 'string') {
      delete container[fallback.key];
      return fallback.key;
    }
  }
  var deletionBackups = collectAutoBackupEntries(container, STORAGE_AUTO_BACKUP_DELETION_PREFIX);
  var duplicateDeletionBackupKey = removeSingleDuplicateAutoBackupEntry(container, deletionBackups);
  if (duplicateDeletionBackupKey) {
    return duplicateDeletionBackupKey;
  }
  if (deletionBackups.length > 0) {
    var _fallback = null;
    for (var _index2 = 0; _index2 < deletionBackups.length; _index2 += 1) {
      var _candidate = deletionBackups[_index2];
      if (!_candidate || typeof _candidate.key !== 'string') {
        continue;
      }
      if (!isRenamedAutoBackupEntry(container, _candidate.key)) {
        delete container[_candidate.key];
        return _candidate.key;
      }
      if (!_fallback) {
        _fallback = _candidate;
      }
    }
    if (_fallback && typeof _fallback.key === 'string') {
      delete container[_fallback.key];
      return _fallback.key;
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
  var msg = 'Storage error: Unable to access local data. Changes may not be saved.';
  try {
    if (typeof texts !== 'undefined') {
      var _texts$lang;
      var lang = typeof currentLang !== 'undefined' && texts[currentLang] ? currentLang : 'en';
      msg = ((_texts$lang = texts[lang]) === null || _texts$lang === void 0 ? void 0 : _texts$lang.alertStorageError) || msg;
    }
  } catch (err) {
    void err;
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
  var msg = 'Warning: Local storage is unavailable. Data will only persist for this browser tab.';
  try {
    if (typeof texts !== 'undefined') {
      var _texts$lang2;
      var lang = typeof currentLang !== 'undefined' && texts[currentLang] ? currentLang : 'en';
      msg = ((_texts$lang2 = texts[lang]) === null || _texts$lang2 === void 0 ? void 0 : _texts$lang2.alertSessionFallback) || msg;
    }
  } catch (err) {
    void err;
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
    console.warn("Unable to access ".concat(name, " during legacy migration"), error);
    return null;
  }
}
function collectUniqueStorages(storages) {
  var unique = [];
  for (var i = 0; i < storages.length; i += 1) {
    var storage = storages[i];
    if (!storage || typeof storage.getItem !== 'function') {
      continue;
    }
    if (!unique.includes(storage)) {
      unique.push(storage);
    }
  }
  return unique;
}
function migrateKeyBetweenStorages(source, target, legacyKey, modernKey) {
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  if (!source || typeof source.getItem !== 'function') {
    return false;
  }
  var _options$keepLegacy = options.keepLegacy,
    keepLegacy = _options$keepLegacy === void 0 ? false : _options$keepLegacy;
  var legacyValue;
  try {
    legacyValue = source.getItem(legacyKey);
  } catch (error) {
    console.warn("Unable to read legacy storage key ".concat(legacyKey), error);
    alertStorageError('migration-read');
    return false;
  }
  if (legacyValue === null || legacyValue === undefined) {
    return false;
  }
  var destination = target && typeof target.setItem === 'function' ? target : source;
  try {
    var existing = destination.getItem(modernKey);
    if (existing !== null && existing !== undefined) {
      if (!keepLegacy && source !== destination) {
        try {
          source.removeItem(legacyKey);
        } catch (removeError) {
          console.warn("Unable to remove legacy storage key ".concat(legacyKey), removeError);
        }
      }
      return false;
    }
  } catch (readError) {
    console.warn("Unable to inspect destination storage for ".concat(modernKey), readError);
  }
  try {
    destination.setItem(modernKey, legacyValue);
  } catch (writeError) {
    console.warn("Unable to migrate legacy storage key ".concat(legacyKey), writeError);
    return false;
  }
  if (!keepLegacy) {
    try {
      source.removeItem(legacyKey);
    } catch (removeError) {
      console.warn("Unable to remove legacy storage key ".concat(legacyKey, " after migration"), removeError);
    }
  }
  return true;
}
function migrateKeyInStorages(storages, preferredTarget, legacyKey, modernKey, options) {
  var migrated = false;
  for (var i = 0; i < storages.length; i += 1) {
    if (migrateKeyBetweenStorages(storages[i], preferredTarget, legacyKey, modernKey, options)) {
      migrated = true;
    }
  }
  return migrated;
}
function migrateLegacyStorageKeys() {
  var safeStorage = getSafeLocalStorage();
  var localStorages = collectUniqueStorages([getWindowStorage('localStorage'), safeStorage]);
  var sessionStorages = collectUniqueStorages([getWindowStorage('sessionStorage'), typeof sessionStorage !== 'undefined' ? sessionStorage : null]);
  var legacyPrefix = 'cinePowerPlanner_';
  var mappings = [{
    legacy: "".concat(legacyPrefix, "devices"),
    modern: DEVICE_STORAGE_KEY
  }, {
    legacy: "".concat(legacyPrefix, "setups"),
    modern: SETUP_STORAGE_KEY
  }, {
    legacy: "".concat(legacyPrefix, "session"),
    modern: SESSION_STATE_KEY,
    includeSession: true
  }, {
    legacy: "".concat(legacyPrefix, "feedback"),
    modern: FEEDBACK_STORAGE_KEY
  }, {
    legacy: "".concat(legacyPrefix, "project"),
    modern: PROJECT_STORAGE_KEY
  }, {
    legacy: "".concat(legacyPrefix, "projects"),
    modern: PROJECT_STORAGE_KEY
  }, {
    legacy: "".concat(legacyPrefix, "favorites"),
    modern: FAVORITES_STORAGE_KEY
  }, {
    legacy: "".concat(legacyPrefix, "schemaCache"),
    modern: DEVICE_SCHEMA_CACHE_KEY
  }, {
    legacy: "".concat(legacyPrefix, "autoGearRules"),
    modern: AUTO_GEAR_RULES_STORAGE_KEY
  }, {
    legacy: "".concat(legacyPrefix, "autoGearBackups"),
    modern: AUTO_GEAR_BACKUPS_STORAGE_KEY
  }, {
    legacy: "".concat(legacyPrefix, "autoGearSeeded"),
    modern: AUTO_GEAR_SEEDED_STORAGE_KEY
  }, {
    legacy: "".concat(legacyPrefix, "autoGearPresets"),
    modern: AUTO_GEAR_PRESETS_STORAGE_KEY
  }, {
    legacy: "".concat(legacyPrefix, "autoGearActivePreset"),
    modern: AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY
  }, {
    legacy: "".concat(legacyPrefix, "autoGearAutoPreset"),
    modern: AUTO_GEAR_AUTO_PRESET_STORAGE_KEY
  }, {
    legacy: "".concat(legacyPrefix, "autoGearShowBackups"),
    modern: AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY
  }, {
    legacy: "".concat(legacyPrefix, "autoGearBackupRetention"),
    modern: AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY
  }, {
    legacy: "".concat(legacyPrefix, "autoGearMonitorDefaults"),
    modern: AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY
  }, {
    legacy: "".concat(legacyPrefix, "customFonts"),
    modern: CUSTOM_FONT_STORAGE_KEY_DEFAULT,
    updateFontKey: true
  }];
  mappings.forEach(function (_ref4) {
    var legacy = _ref4.legacy,
      modern = _ref4.modern,
      _ref4$includeSession = _ref4.includeSession,
      includeSession = _ref4$includeSession === void 0 ? false : _ref4$includeSession,
      _ref4$updateFontKey = _ref4.updateFontKey,
      updateFontKey = _ref4$updateFontKey === void 0 ? false : _ref4$updateFontKey;
    var migratedLocal = migrateKeyInStorages(localStorages, safeStorage, legacy, modern);
    migrateKeyInStorages(localStorages, safeStorage, "".concat(legacy).concat(STORAGE_BACKUP_SUFFIX), "".concat(modern).concat(STORAGE_BACKUP_SUFFIX));
    if (includeSession) {
      migrateKeyInStorages(sessionStorages, null, legacy, modern);
      migrateKeyInStorages(sessionStorages, null, "".concat(legacy).concat(STORAGE_BACKUP_SUFFIX), "".concat(modern).concat(STORAGE_BACKUP_SUFFIX));
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
function loadJSONFromStorage(storage, key, errorMessage) {
  var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  if (!storage) return defaultValue;
  var _ref5 = options || {},
    _ref5$disableBackup = _ref5.disableBackup,
    disableBackup = _ref5$disableBackup === void 0 ? false : _ref5$disableBackup,
    backupKey = _ref5.backupKey,
    validate = _ref5.validate,
    _ref5$restoreIfMissin = _ref5.restoreIfMissing,
    restoreIfMissing = _ref5$restoreIfMissin === void 0 ? false : _ref5$restoreIfMissin,
    _ref5$alertOnFailure = _ref5.alertOnFailure,
    alertOnFailure = _ref5$alertOnFailure === void 0 ? null : _ref5$alertOnFailure;
  var fallbackKey = typeof backupKey === 'string' && backupKey ? backupKey : "".concat(key).concat(STORAGE_BACKUP_SUFFIX);
  var useBackup = !disableBackup && fallbackKey && fallbackKey !== key;
  var shouldAlert = false;
  var parseRawValue = function parseRawValue(raw, label) {
    if (raw === null || raw === undefined) {
      return {
        ok: false,
        reason: 'missing'
      };
    }
    try {
      var parsed = JSON.parse(raw);
      if (typeof validate === 'function' && !validate(parsed)) {
        console.warn("".concat(errorMessage, " Invalid data").concat(label ? " (".concat(label, ")") : '', "."));
        shouldAlert = true;
        return {
          ok: false,
          reason: 'invalid'
        };
      }
      return {
        ok: true,
        value: parsed,
        raw: raw
      };
    } catch (err) {
      console.error("".concat(errorMessage).concat(label ? " (".concat(label, ")") : ''), err);
      shouldAlert = true;
      return {
        ok: false,
        reason: 'error'
      };
    }
  };
  var primaryRaw = null;
  try {
    primaryRaw = storage.getItem(key);
  } catch (err) {
    console.error("".concat(errorMessage, " (read)"), err);
    downgradeSafeLocalStorageToMemory('read access', err, storage);
    shouldAlert = true;
  }
  var primary = parseRawValue(primaryRaw, '');
  if (primary.ok) {
    return primary.value;
  }
  var missingPrimary = !primary.ok && primary.reason === 'missing';
  var shouldAttemptBackup = useBackup && (shouldAlert || restoreIfMissing || missingPrimary);
  if (shouldAttemptBackup) {
    var backupRaw = null;
    try {
      backupRaw = storage.getItem(fallbackKey);
    } catch (err) {
      console.error("".concat(errorMessage, " (backup read)"), err);
      downgradeSafeLocalStorageToMemory('read access', err, storage);
      shouldAlert = true;
    }
    var backup = parseRawValue(backupRaw, 'backup');
    if (backup.ok) {
      if (shouldAlert || missingPrimary) {
        console.warn("Recovered ".concat(key, " from backup copy."));
      }
      if (backup.raw !== null && backup.raw !== undefined) {
        try {
          storage.setItem(key, backup.raw);
        } catch (restoreError) {
          console.warn("Unable to restore primary copy for ".concat(key, " from backup"), restoreError);
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
function saveJSONToStorage(storage, key, value, errorMessage) {
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  if (!storage) return;
  var _ref6 = options || {},
    _ref6$disableBackup = _ref6.disableBackup,
    disableBackup = _ref6$disableBackup === void 0 ? false : _ref6$disableBackup,
    backupKey = _ref6.backupKey,
    onQuotaExceeded = _ref6.onQuotaExceeded;
  var fallbackKey = typeof backupKey === 'string' && backupKey ? backupKey : "".concat(key).concat(STORAGE_BACKUP_SUFFIX);
  var useBackup = !disableBackup && fallbackKey && fallbackKey !== key;
  var serializeValue = function serializeValue() {
    try {
      return JSON.stringify(value);
    } catch (serializationError) {
      console.error(errorMessage, serializationError);
      alertStorageError();
      return null;
    }
  };
  var preservedBackupValue;
  var hasPreservedBackup = false;
  var removedBackupDuringRetry = false;
  var quotaRecoverySteps = 0;
  var quotaRecoveryFailed = false;
  var registerQuotaRecoveryStep = function registerQuotaRecoveryStep() {
    quotaRecoverySteps += 1;
    if (quotaRecoverySteps > MAX_QUOTA_RECOVERY_STEPS) {
      quotaRecoveryFailed = true;
      console.warn("Exceeded maximum storage recovery attempts while saving ".concat(key, "."));
      return false;
    }
    return true;
  };
  var attemptHandleQuota = function attemptHandleQuota(error) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!isQuotaExceededError(error) || typeof onQuotaExceeded !== 'function') {
      return false;
    }
    try {
      return onQuotaExceeded(error, _objectSpread({
        storage: storage,
        key: key,
        value: value
      }, context)) === true;
    } catch (handlerError) {
      var scope = context && context.isBackup ? ' (backup)' : '';
      console.error("Error while handling quota exceed for ".concat(key).concat(scope), handlerError);
      return false;
    }
  };
  var attempts = 0;
  var _loop = function _loop() {
      attempts += 1;
      var serialized = serializeValue();
      if (serialized === null) {
        return {
          v: void 0
        };
      }
      var skipPrimaryWrite = false;
      if (typeof storage.getItem === 'function') {
        try {
          var existingValue = storage.getItem(key);
          if (existingValue === serialized) {
            skipPrimaryWrite = true;
          }
        } catch (inspectError) {
          console.warn("Unable to inspect existing value for ".concat(key), inspectError);
        }
      }
      var existingBackupValue;
      var hasExistingBackup = false;
      if (useBackup && typeof storage.getItem === 'function') {
        try {
          existingBackupValue = storage.getItem(fallbackKey);
          hasExistingBackup = typeof existingBackupValue === 'string';
        } catch (inspectError) {
          console.warn("Unable to inspect existing backup for ".concat(key), inspectError);
        }
      }
      if (!hasPreservedBackup && hasExistingBackup && typeof existingBackupValue === 'string') {
        preservedBackupValue = existingBackupValue;
        hasPreservedBackup = true;
      }
      if (skipPrimaryWrite && (!useBackup || hasExistingBackup && existingBackupValue === serialized)) {
        return {
          v: void 0
        };
      }
      if (!skipPrimaryWrite) {
        try {
          storage.setItem(key, serialized);
        } catch (error) {
          if (attemptHandleQuota(error)) {
            if (!registerQuotaRecoveryStep()) {
              return 0;
            }
            if (attempts > 0) {
              attempts -= 1;
            }
            return 1;
          }
          console.error(errorMessage, error);
          downgradeSafeLocalStorageToMemory('write access', error, storage);
          alertStorageError();
          return {
            v: void 0
          };
        }
      }
      if (!useBackup) {
        return {
          v: void 0
        };
      }
      var attemptBackupWrite = function attemptBackupWrite() {
        try {
          storage.setItem(fallbackKey, serialized);
          return 'success';
        } catch (error) {
          var backupError = error;
          var backupRemovedForRetry = false;
          if (isQuotaExceededError(backupError)) {
            if (hasExistingBackup) {
              try {
                storage.removeItem(fallbackKey);
                backupRemovedForRetry = true;
                removedBackupDuringRetry = true;
              } catch (removeError) {
                console.warn("Unable to remove previous backup for ".concat(key), removeError);
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
              serialized: serialized,
              backupKey: fallbackKey,
              isBackup: true
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
              console.warn("Unable to restore previous backup for ".concat(key), restoreError);
            }
          }
          console.warn("Unable to update backup copy for ".concat(key), backupError);
          alertStorageError();
          return 'failure';
        }
      };
      var backupResult = attemptBackupWrite();
      if (backupResult === 'success') {
        return {
          v: void 0
        };
      }
      if (backupResult === 'retry') {
        if (attempts > 0) {
          attempts -= 1;
        }
        return 1;
      }
      if (quotaRecoveryFailed) {
        return 0;
      }
      return {
        v: void 0
      };
    },
    _ret;
  while (attempts < MAX_SAVE_ATTEMPTS) {
    _ret = _loop();
    if (_ret === 0) break;
    if (_ret === 1) continue;
    if (_ret) return _ret.v;
  }
  if (hasPreservedBackup && removedBackupDuringRetry && typeof preservedBackupValue === 'string') {
    try {
      storage.setItem(fallbackKey, preservedBackupValue);
    } catch (restoreError) {
      console.warn("Unable to restore preserved backup for ".concat(key), restoreError);
    }
  }
  console.error(errorMessage, new Error('Unable to save value after multiple attempts.'));
  alertStorageError();
}
function deleteFromStorage(storage, key, errorMessage) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  if (!storage) return;
  var _ref7 = options || {},
    _ref7$disableBackup = _ref7.disableBackup,
    disableBackup = _ref7$disableBackup === void 0 ? false : _ref7$disableBackup,
    backupKey = _ref7.backupKey;
  var fallbackKey = typeof backupKey === 'string' && backupKey ? backupKey : "".concat(key).concat(STORAGE_BACKUP_SUFFIX);
  var useBackup = !disableBackup && fallbackKey && fallbackKey !== key;
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
      console.error("".concat(errorMessage, " (backup)"), backupError);
      downgradeSafeLocalStorageToMemory('deletion', backupError, storage);
      alertStorageError();
    }
  }
  var migrationBackupKey = "".concat(key).concat(STORAGE_MIGRATION_BACKUP_SUFFIX);
  try {
    storage.removeItem(migrationBackupKey);
  } catch (migrationError) {
    console.warn("Unable to remove migration backup for ".concat(key), migrationError);
  }
}
var UI_CACHE_STORAGE_KEYS = [DEVICE_SCHEMA_CACHE_KEY, LEGACY_SCHEMA_CACHE_KEY];
var UI_CACHE_STORAGE_ACCESS_WARNINGS = new Set();
function collectUiCacheStorages() {
  var candidates = [];
  var seenScopes = new Set();
  var pushCandidate = function pushCandidate(candidate) {
    if (!candidate || typeof candidate.getItem !== 'function') {
      return;
    }
    candidates.push(candidate);
  };
  var readProperty = function readProperty(scope, property, label) {
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return null;
    }
    try {
      return scope[property];
    } catch (error) {
      if (label && !UI_CACHE_STORAGE_ACCESS_WARNINGS.has(label)) {
        UI_CACHE_STORAGE_ACCESS_WARNINGS.add(label);
        console.warn("Unable to access ".concat(label, " while clearing UI caches"), error);
      }
      return null;
    }
  };
  var _inspectScope = function inspectScope(scope, label) {
    if (!scope || seenScopes.has(scope)) {
      return;
    }
    seenScopes.add(scope);
    pushCandidate(readProperty(scope, 'SAFE_LOCAL_STORAGE', "".concat(label, ".SAFE_LOCAL_STORAGE")));
    pushCandidate(readProperty(scope, 'localStorage', "".concat(label, ".localStorage")));
    pushCandidate(readProperty(scope, 'sessionStorage', "".concat(label, ".sessionStorage")));
    var nested = readProperty(scope, '__cineGlobal', "".concat(label, ".__cineGlobal"));
    if (nested && nested !== scope) {
      _inspectScope(nested, "".concat(label, ".__cineGlobal"));
    }
  };
  _inspectScope(typeof globalThis !== 'undefined' ? globalThis : null, 'globalThis');
  _inspectScope(typeof window !== 'undefined' ? window : null, 'window');
  _inspectScope(typeof self !== 'undefined' ? self : null, 'self');
  _inspectScope(typeof global !== 'undefined' ? global : null, 'global');
  if (typeof __cineGlobal !== 'undefined') {
    _inspectScope(__cineGlobal, '__cineGlobal');
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
  var storages = collectUiCacheStorages();
  if (!storages.length) {
    return;
  }
  UI_CACHE_STORAGE_KEYS.forEach(function (key) {
    if (typeof key !== 'string' || !key) {
      return;
    }
    storages.forEach(function (storage) {
      deleteFromStorage(storage, key, "Failed to clear UI cache entry ".concat(key));
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
function loadWithMigration(primary, fallback, key, primaryLoadMsg, fallbackLoadMsg, saveMsg, deleteMsg, loadOptions) {
  var value = loadJSONFromStorage(primary, key, primaryLoadMsg, null, loadOptions);
  if (value !== null) return value;
  if (!fallback) return null;
  var fallbackOptions = _objectSpread(_objectSpread({}, loadOptions || {}), {}, {
    alertOnFailure: 'migration-read'
  });
  var migrated = loadJSONFromStorage(fallback, key, fallbackLoadMsg, null, fallbackOptions);
  if (migrated !== null) {
    saveJSONToStorage(primary, key, migrated, saveMsg);
    deleteFromStorage(fallback, key, deleteMsg);
    return migrated;
  }
  return null;
}
function generateUniqueName(base, usedNames, normalizedNames) {
  var trimmedBase = base.trim();
  var name = trimmedBase;
  var suffix = 2;
  var normalized = normalizedNames || new Set(_toConsumableArray(usedNames).map(function (n) {
    return n.trim().toLowerCase();
  }));
  var candidate = trimmedBase.toLowerCase();
  while (normalized.has(candidate)) {
    name = "".concat(trimmedBase, " (").concat(suffix++, ")");
    candidate = name.toLowerCase();
  }
  usedNames.add(name);
  normalized.add(candidate);
  return name;
}
function collectStringValues(value) {
  if (value === null || value === undefined) {
    return [];
  }
  if (typeof value === 'string') {
    var trimmed = value.trim();
    return trimmed ? [trimmed] : [];
  }
  if (Array.isArray(value)) {
    return value.filter(function (item) {
      return typeof item === 'string';
    }).map(function (item) {
      return item.trim();
    }).filter(function (item) {
      return item;
    });
  }
  if (isPlainObject(value)) {
    return Object.values(value).filter(function (item) {
      return typeof item === 'string';
    }).map(function (item) {
      return item.trim();
    }).filter(function (item) {
      return item;
    });
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
  for (var i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
function normalizeDiagramPositions(positions) {
  if (!positions || _typeof(positions) !== 'object') {
    return {};
  }
  var normalized = {};
  Object.keys(positions).forEach(function (key) {
    var value = positions[key];
    if (!value || _typeof(value) !== 'object') {
      return;
    }
    var x = Number(value.x);
    var y = Number(value.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return;
    }
    normalized[key] = {
      x: x,
      y: y
    };
  });
  return normalized;
}
function diagramPositionsEqual(a, b) {
  var keysA = Object.keys(a || {});
  var keysB = Object.keys(b || {});
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (var i = 0; i < keysA.length; i += 1) {
    var key = keysA[i];
    if (!Object.prototype.hasOwnProperty.call(b || {}, key)) {
      return false;
    }
    var valueA = a[key];
    var valueB = b[key];
    if (!valueA || _typeof(valueA) !== 'object' || !valueB || _typeof(valueB) !== 'object') {
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
    return {
      state: null,
      changed: false
    };
  }
  var state = _objectSpread({}, raw);
  var changed = false;
  var normalizeStringField = function normalizeStringField(key) {
    if (!Object.prototype.hasOwnProperty.call(state, key)) {
      return;
    }
    var value = state[key];
    if (typeof value === 'string') {
      var trimmed = value.trim();
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
  ['setupName', 'setupSelect', 'camera', 'monitor', 'video', 'cage', 'distance', 'batteryPlate', 'battery', 'batteryHotswap', 'sliderBowl', 'easyrig'].forEach(normalizeStringField);
  var mergeArrayField = function mergeArrayField(targetKey) {
    var legacyKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var values = [];
    var keys = [targetKey].concat(_toConsumableArray(legacyKeys));
    var hadLegacyData = false;
    keys.forEach(function (key) {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        var collected = collectStringValues(state[key]);
        if (key !== targetKey) {
          hadLegacyData = true;
        }
        if (collected.length) {
          values.push.apply(values, _toConsumableArray(collected));
        }
      }
    });
    keys.slice(1).forEach(function (legacyKey) {
      if (Object.prototype.hasOwnProperty.call(state, legacyKey)) {
        delete state[legacyKey];
        changed = true;
      }
    });
    var unique = [];
    var seen = new Set();
    values.forEach(function (val) {
      if (!seen.has(val)) {
        seen.add(val);
        unique.push(val);
      }
    });
    var hasTargetKey = Object.prototype.hasOwnProperty.call(state, targetKey);
    var existing = hasTargetKey && Array.isArray(state[targetKey]) ? state[targetKey].filter(function (item) {
      return typeof item === 'string';
    }).map(function (item) {
      return item.trim();
    }).filter(function (item) {
      return item;
    }) : [];
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
    var value = state.autoGearHighlight;
    var normalized = value === true || value === 'true' || value === 1 || value === '1';
    if (value !== normalized || typeof value !== 'boolean') {
      state.autoGearHighlight = normalized;
      changed = true;
    }
  }
  if (Object.prototype.hasOwnProperty.call(state, 'diagramPositions')) {
    var normalizedPositions = normalizeDiagramPositions(state.diagramPositions);
    if (Object.keys(normalizedPositions).length === 0) {
      delete state.diagramPositions;
      changed = true;
    } else if (!diagramPositionsEqual(state.diagramPositions, normalizedPositions)) {
      state.diagramPositions = normalizedPositions;
      changed = true;
    }
  }
  return {
    state: state,
    changed: changed
  };
}
function loadSessionState() {
  applyLegacyStorageMigrations();
  var safeStorage = getSafeLocalStorage();
  var raw = loadWithMigration(safeStorage, typeof sessionStorage !== 'undefined' ? sessionStorage : null, SESSION_STATE_KEY, "Error loading session state from localStorage:", "Error loading session state from sessionStorage:", "Error saving session state to localStorage:", "Error deleting session state from sessionStorage:", {
    validate: function validate(value) {
      return value === null || isPlainObject(value);
    }
  });
  if (raw === null) {
    return null;
  }
  var _normalizeSessionStat = normalizeSessionStatePayload(raw),
    state = _normalizeSessionStat.state,
    changed = _normalizeSessionStat.changed;
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
  var safeStorage = getSafeLocalStorage();
  if (state === null || state === undefined) {
    deleteFromStorage(safeStorage, SESSION_STATE_KEY, "Error deleting session state from localStorage:");
    return;
  }
  if (!isPlainObject(state)) {
    console.warn('Ignoring invalid session state payload. Expected a plain object.');
    return;
  }
  ensurePreWriteMigrationBackup(safeStorage, SESSION_STATE_KEY);
  saveJSONToStorage(safeStorage, SESSION_STATE_KEY, state, "Error saving session state to localStorage:");
}
function loadDeviceData() {
  applyLegacyStorageMigrations();
  var safeStorage = getSafeLocalStorage();
  var parsedData = loadJSONFromStorage(safeStorage, DEVICE_STORAGE_KEY, "Error loading device data from localStorage:", null, {
    validate: function validate(value) {
      return value === null || isPlainObject(value);
    }
  });
  if (!isPlainObject(parsedData)) {
    return null;
  }
  var data = _objectSpread({}, parsedData);
  var changed = false;
  function ensureObject(target, key) {
    if (!isPlainObject(target[key])) {
      target[key] = {};
      changed = true;
    }
  }
  DEVICE_COLLECTION_KEYS.forEach(function (key) {
    ensureObject(data, key);
  });
  if (!isPlainObject(data.fiz)) {
    data.fiz = {};
    changed = true;
  }
  FIZ_COLLECTION_KEYS.forEach(function (key) {
    ensureObject(data.fiz, key);
  });
  if (!isPlainObject(data.accessories)) {
    data.accessories = {};
    changed = true;
  }
  ACCESSORY_COLLECTION_KEYS.forEach(function (key) {
    ensureObject(data.accessories, key);
  });
  if (!Array.isArray(data.filterOptions)) {
    data.filterOptions = Array.isArray(parsedData.filterOptions) ? parsedData.filterOptions.slice() : [];
    changed = true;
  }
  if (changed) {
    createStorageMigrationBackup(safeStorage, DEVICE_STORAGE_KEY, parsedData);
    saveJSONToStorage(safeStorage, DEVICE_STORAGE_KEY, data, "Error updating device data in localStorage during normalization:");
  }
  return data;
}
function saveDeviceData(deviceData) {
  var safeStorage = getSafeLocalStorage();
  if (deviceData === null || deviceData === undefined) {
    deleteFromStorage(safeStorage, DEVICE_STORAGE_KEY, "Error deleting device data from localStorage:");
    return;
  }
  if (!isPlainObject(deviceData)) {
    console.warn('Ignoring invalid device data payload. Expected a plain object.');
    return;
  }
  ensurePreWriteMigrationBackup(safeStorage, DEVICE_STORAGE_KEY);
  saveJSONToStorage(safeStorage, DEVICE_STORAGE_KEY, deviceData, "Error saving device data to localStorage:");
}
function normalizeSetups(rawData) {
  if (!rawData) {
    return {
      data: {},
      changed: false
    };
  }
  if (Array.isArray(rawData)) {
    var obj = {};
    var used = new Set();
    var _normalized = new Set();
    for (var idx = 0; idx < rawData.length; idx += 1) {
      var item = rawData[idx];
      if (!isPlainObject(item)) {
        continue;
      }
      var base = item.name || item.setupName || "Setup ".concat(idx + 1);
      var key = generateUniqueName(base, used, _normalized);
      obj[key] = item;
    }
    return {
      data: obj,
      changed: true
    };
  }
  if (!isPlainObject(rawData)) {
    return {
      data: {},
      changed: true
    };
  }
  var normalized = {};
  var changed = false;
  Object.keys(rawData).forEach(function (name) {
    var value = rawData[name];
    if (isPlainObject(value)) {
      normalized[name] = value;
    } else {
      changed = true;
    }
  });
  if (!changed) {
    return {
      data: rawData,
      changed: false
    };
  }
  return {
    data: normalized,
    changed: true
  };
}
function loadSetups() {
  applyLegacyStorageMigrations();
  var safeStorage = getSafeLocalStorage();
  var parsedData = loadJSONFromStorage(safeStorage, SETUP_STORAGE_KEY, "Error loading setups from localStorage:", null, {
    validate: function validate(value) {
      return value === null || Array.isArray(value) || isPlainObject(value);
    }
  });
  var _normalizeSetups = normalizeSetups(parsedData),
    setups = _normalizeSetups.data,
    changed = _normalizeSetups.changed;
  if (changed) {
    createStorageMigrationBackup(safeStorage, SETUP_STORAGE_KEY, parsedData);
    saveJSONToStorage(safeStorage, SETUP_STORAGE_KEY, setups, "Error updating setups in localStorage during normalization:");
  }
  return setups;
}
function saveSetups(setups) {
  var _normalizeSetups2 = normalizeSetups(setups),
    normalizedSetups = _normalizeSetups2.data;
  enforceAutoBackupLimits(normalizedSetups);
  var safeStorage = getSafeLocalStorage();
  ensurePreWriteMigrationBackup(safeStorage, SETUP_STORAGE_KEY);
  saveJSONToStorage(safeStorage, SETUP_STORAGE_KEY, normalizedSetups, "Error saving setups to localStorage:", {
    onQuotaExceeded: function onQuotaExceeded() {
      var removedKey = removeOldestAutoBackupEntry(normalizedSetups);
      if (!removedKey) {
        return false;
      }
      console.warn("Removed automatic backup \"".concat(removedKey, "\" to free up storage space before saving setups."));
      return true;
    }
  });
}
function updateSetups(callback) {
  var setups = loadSetups();
  var _ref8 = callback(setups) || {},
    result = _ref8.result,
    _ref8$changed = _ref8.changed,
    changed = _ref8$changed === void 0 ? true : _ref8$changed;
  if (changed) {
    saveSetups(setups);
  }
  return result;
}
function saveSetup(name, setup) {
  updateSetups(function (setups) {
    setups[name] = setup;
    return {
      changed: true
    };
  });
}
function loadSetup(name) {
  var setups = loadSetups();
  return setups[name];
}
function deleteSetup(name) {
  updateSetups(function (setups) {
    if (Object.prototype.hasOwnProperty.call(setups, name)) {
      delete setups[name];
      return {
        changed: true
      };
    }
    return {
      changed: false
    };
  });
}
function renameSetup(oldName, newName) {
  return updateSetups(function (setups) {
    if (!Object.prototype.hasOwnProperty.call(setups, oldName)) {
      return {
        result: null,
        changed: false
      };
    }
    var sanitized = newName.trim();
    if (!sanitized) {
      return {
        result: oldName,
        changed: false
      };
    }
    if (oldName.trim().toLowerCase() === sanitized.toLowerCase()) {
      return {
        result: oldName,
        changed: false
      };
    }
    var used = new Set(Object.keys(setups));
    used.delete(oldName);
    var target = generateUniqueName(sanitized, used);
    var movedValue = setups[oldName];
    setups[target] = movedValue;
    delete setups[oldName];
    var wasAutoBackup = typeof oldName === 'string' && oldName.startsWith(STORAGE_AUTO_BACKUP_NAME_PREFIX);
    var targetIsAutoBackup = typeof target === 'string' && target.startsWith(STORAGE_AUTO_BACKUP_NAME_PREFIX);
    if (wasAutoBackup && targetIsAutoBackup) {
      markAutoBackupValueAsRenamed(movedValue);
    }
    return {
      result: target,
      changed: true
    };
  });
}
var REQUIREMENT_FIELDS_KEEP_NEWLINES = new Set(['prepDays', 'shootingDays', 'crew']);
var LEGACY_PROJECT_FIELD_LABELS = {
  productionCompany: ['Production Company', 'Produktionsfirma', 'Société de production', 'Productora', 'Casa di produzione'],
  rentalHouse: ['Rental House', 'Verleih', 'Location', 'Rental', 'Rental'],
  crew: ['Crew', 'Team', 'Équipe', 'Equipo', 'Troupe'],
  prepDays: ['Prep Days', 'Prep-Tage', 'Jours de préparation', 'Días de preparación', 'Giorni di preparazione'],
  shootingDays: ['Shooting Days', 'Drehtage', 'Jours de tournage', 'Días de rodaje', 'Giorni di riprese'],
  deliveryResolution: ['Delivery Resolution', 'Auslieferungsauflösung', 'Résolution de livraison', 'Resolución de entrega', 'Risoluzione di consegna'],
  recordingResolution: ['Recording Resolution', 'Aufnahmeauflösung', 'Résolution d’enregistrement', 'Resolución de grabación', 'Risoluzione di registrazione'],
  aspectRatio: ['Aspect Ratio', 'Seitenverhältnis', "Format d’image", 'Relación de aspecto', 'Formato'],
  codec: ['Codec', 'Codec', 'Codec', 'Códec', 'Codec'],
  baseFrameRate: ['Base Frame Rate', 'Basis-Framerate', 'Cadence de base', 'Velocidad base', 'Frame rate base'],
  sensorMode: ['Sensor Mode', 'Sensormodus', 'Mode capteur', 'Modo de sensor', 'Modalità sensore'],
  lenses: ['Lenses', 'Objektive', 'Optiques', 'Ópticas', 'Obiettivi'],
  requiredScenarios: ['Required Scenarios', 'Anforderungen', 'Scénarios requis', 'Escenarios requeridos', 'Scenari richiesti'],
  cameraHandle: ['Camera Handle', 'Kamera-Handgriff', 'Poignée caméra', 'Empuñadura de cámara', 'Maniglia camera'],
  viewfinderExtension: ['Viewfinder Extension', 'Sucher-Verlängerung', 'Extension viseur', 'Extensión de visor', 'Prolunga mirino'],
  viewfinderEyeLeatherColor: ['Viewfinder Eye Leather Color', 'Sucher-Augenmuschel-Farbe', "Couleur de l’œil du viseur", 'Color del ocular del visor', 'Colore gomma mirino'],
  mattebox: ['Mattebox', 'Matte-Box', 'Matte box', 'Matte box', 'Matte box'],
  gimbal: ['Gimbal', 'Gimbal-Stabilisator', 'Stabilisateur gimbal', 'Estabilizador gimbal', 'Stabilizzatore gimbal'],
  videoDistribution: ['Video Distribution', 'Videoverteilung', 'Distribution vidéo', 'Distribución de vídeo', 'Distribuzione video'],
  monitoringSupport: ['Monitoring support', 'Monitoring-Support', 'Support de monitoring', 'Soporte de monitorización', 'Supporto monitoraggio'],
  monitoringConfiguration: ['Monitoring configuration', 'Monitoring-Konfiguration', 'Configuration de monitoring', 'Configuración de monitorización', 'Configurazione monitoraggio'],
  focusMonitor: ['Focus Monitor', 'Fokusmonitor', 'Moniteur focus', 'Monitor de foco', 'Monitor fuoco'],
  monitorUserButtons: ['Onboard Monitor User Buttons', 'Onboard-Monitor-Buttons', 'Boutons personnalisés du moniteur', 'Botones de usuario del monitor integrado', 'Tasti monitor onboard'],
  cameraUserButtons: ['Camera User Buttons', 'Kamera-Buttons', 'Boutons personnalisés caméra', 'Botones de usuario de la cámara', 'Tasti camera'],
  viewfinderUserButtons: ['Viewfinder User Buttons', 'Sucher-Buttons', 'Boutons personnalisés viseur', 'Botones de usuario del visor', 'Tasti mirino'],
  tripodHeadBrand: ['Tripod Head Brand', 'Kopfmarke', 'Marque de la tête', 'Marca de la cabeza', 'Marca della testa'],
  tripodBowl: ['Tripod Bowl', 'Schalentyp', 'Type de bol', 'Tipo de bowl', 'Tipo di bowl'],
  tripodTypes: ['Tripod Types', 'Stativtypen', 'Types de trépied', 'Tipos de trípode', 'Tipi di treppiede'],
  tripodSpreader: ['Tripod Spreader', 'Spreizer-Option', 'Type de spreader', 'Tipo de esparcidor', 'Tipo di spreader'],
  sliderBowl: ['Slider Bowl', 'Slider-Schale', 'Slider bowl', 'Bowl del slider', 'Slider bowl'],
  easyrig: ['Further Stabilisation', 'Weitere Stabilisierung', 'Stabilisation complémentaire', 'Estabilización adicional', 'Stabilizzazione aggiuntiva']
};
var LEGACY_PROJECT_LABEL_FIELD_MAP = function () {
  var map = new Map();
  var normalize = function normalize(label) {
    if (typeof label !== 'string') return '';
    return label.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[:：]/g, '').replace(/[^a-zA-Z0-9]+/g, ' ').trim().toLowerCase();
  };
  Object.entries(LEGACY_PROJECT_FIELD_LABELS).forEach(function (_ref9) {
    var _ref0 = _slicedToArray(_ref9, 2),
      field = _ref0[0],
      labels = _ref0[1];
    labels.forEach(function (label) {
      var normalized = normalize(label);
      if (normalized && !map.has(normalized)) {
        map.set(normalized, field);
      }
    });
  });
  return map;
}();
var HTML_ENTITY_MAP = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' '
};
function decodeHtmlEntities(value) {
  if (typeof value !== 'string' || !value) {
    return '';
  }
  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, function (match, entity) {
    if (!entity) return match;
    if (entity[0] === '#') {
      var code = entity[1] === 'x' || entity[1] === 'X' ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    var mapped = HTML_ENTITY_MAP[entity.toLowerCase()];
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
  var normalizedBreaks = rawHtml.replace(/<\s*br\s*\/?\s*>/gi, '\n').replace(/<\/(p|div|li|ul|ol)>/gi, '\n').replace(/<li[^>]*>/gi, '');
  var text = decodeHtmlEntities(stripHtmlTags(normalizedBreaks)).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  var parts = text.split('\n').map(function (part) {
    return part.replace(/\s+/g, ' ').trim();
  }).filter(function (part) {
    return part;
  });
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
  var normalized = labelText.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[:：]/g, '').replace(/[^a-zA-Z0-9]+/g, ' ').trim().toLowerCase();
  if (!normalized) {
    return '';
  }
  return LEGACY_PROJECT_LABEL_FIELD_MAP.get(normalized) || '';
}
function extractProjectInfoFromHtml(html) {
  if (typeof html !== 'string') {
    return null;
  }
  var trimmed = html.trim();
  if (!trimmed) {
    return null;
  }
  var info = {};
  var gridOpenMatch = trimmed.match(/<div[^>]*class=["'][^"']*requirements-grid[^"']*["'][^>]*>/i);
  var gridStartIndex = gridOpenMatch ? gridOpenMatch.index : -1;
  if (gridStartIndex === -1) {
    var _headingMatch = trimmed.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    if (_headingMatch) {
      var title = decodeHtmlEntities(stripHtmlTags(_headingMatch[1]));
      var projectName = title.replace(/[“”"']/g, '').trim();
      if (projectName) {
        info.projectName = projectName;
      }
    }
    return Object.keys(info).length ? info : null;
  }
  var gridHtml = trimmed.slice(gridStartIndex);
  var prefix = trimmed.slice(0, gridStartIndex);
  var headingMatch = prefix.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  if (headingMatch) {
    var _title = decodeHtmlEntities(stripHtmlTags(headingMatch[1]));
    var _projectName = _title.replace(/[“”"']/g, '').trim();
    if (_projectName && !/gear list/i.test(_projectName)) {
      info.projectName = _projectName;
    }
  }
  var boxRegex = /<div[^>]*class=["'][^"']*requirement-box[^"']*["'][^>]*>[\s\S]*?<\/div>/gi;
  var match;
  while (match = boxRegex.exec(gridHtml)) {
    var boxHtml = match[0];
    var fieldMatch = boxHtml.match(/data-field=["']([^"']+)["']/i);
    var labelMatch = boxHtml.match(/<span[^>]*class=["'][^"']*req-label[^"']*["'][^>]*>([\s\S]*?)<\/span>/i);
    var valueMatch = boxHtml.match(/<span[^>]*class=["'][^"']*req-value[^"']*["'][^>]*>([\s\S]*?)<\/span>/i);
    var rawField = fieldMatch ? fieldMatch[1].trim() : '';
    var label = labelMatch ? decodeHtmlEntities(stripHtmlTags(labelMatch[1])) : '';
    var fieldName = rawField || mapLegacyRequirementLabel(label);
    if (!fieldName) {
      continue;
    }
    var rawValue = valueMatch ? valueMatch[1] : '';
    var normalizedValue = normalizeRequirementValueFromHtml(rawValue, fieldName);
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
    return value.map(function (item) {
      return cloneProjectData(item);
    });
  }
  if (isPlainObject(value)) {
    var clone = {};
    Object.entries(value).forEach(function (_ref1) {
      var _ref10 = _slicedToArray(_ref1, 2),
        key = _ref10[0],
        val = _ref10[1];
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
      return _objectSpread({}, projectInfo);
    }
  }
}
function sanitizeImportedCrewEntries(entries) {
  if (!Array.isArray(entries)) {
    return [];
  }
  var sanitized = [];
  entries.forEach(function (entry) {
    if (!isPlainObject(entry)) {
      var normalized = sanitizeImportedValue(entry);
      if (normalized !== null && normalized !== undefined) {
        sanitized.push(normalized);
      }
      return;
    }
    var result = {};
    var name = typeof entry.name === 'string' ? entry.name.trim() : '';
    if (name) {
      result.name = name;
    }
    var phone = typeof entry.phone === 'string' ? entry.phone.trim() : '';
    if (phone) {
      result.phone = phone;
    }
    var email = typeof entry.email === 'string' ? entry.email.trim() : '';
    if (email) {
      result.email = email;
    }
    var note = typeof entry.text === 'string' ? entry.text.trim() : '';
    if (note) {
      result.text = note;
    }
    var role = typeof entry.role === 'string' ? entry.role.trim() : '';
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
    var trimmed = value.trim();
    return trimmed ? trimmed : null;
  }
  if (typeof value === 'number') {
    return Number.isNaN(value) ? null : value;
  }
  if (typeof value === 'boolean') {
    return value ? true : null;
  }
  if (Array.isArray(value)) {
    var sanitized = value.map(function (item) {
      return sanitizeImportedValue(item);
    }).filter(function (item) {
      return item !== null && item !== undefined && !(typeof item === 'string' && !item);
    });
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
  var normalized = {};
  Object.entries(info).forEach(function (_ref11) {
    var _ref12 = _slicedToArray(_ref11, 2),
      key = _ref12[0],
      raw = _ref12[1];
    if (raw === null || raw === undefined) {
      return;
    }
    if (key === 'people') {
      var crew = sanitizeImportedCrewEntries(raw);
      if (crew.length) {
        normalized.people = crew;
      }
      return;
    }
    var value = sanitizeImportedValue(raw);
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
      return _objectSpread({}, positions);
    }
  }
}
function cloneProjectGearSelectors(selectors) {
  if (!isPlainObject(selectors)) {
    return null;
  }
  var clone = {};
  Object.entries(selectors).forEach(function (_ref13) {
    var _ref14 = _slicedToArray(_ref13, 2),
      id = _ref14[0],
      value = _ref14[1];
    if (typeof id !== 'string' || !id) {
      return;
    }
    if (Array.isArray(value)) {
      clone[id] = value.map(function (item) {
        return typeof item === 'string' ? item : String(item !== null && item !== void 0 ? item : '');
      });
    } else if (value === undefined || value === null) {
      clone[id] = '';
    } else {
      clone[id] = typeof value === 'string' ? value : String(value);
    }
  });
  return Object.keys(clone).length ? clone : null;
}
function normalizeProject(data) {
  if (typeof data === "string") {
    var parsed = tryParseJSONLike(data);
    if (parsed.success) {
      var normalized = normalizeProject(parsed.parsed);
      if (normalized) {
        return normalized;
      }
    }
    return {
      gearList: data,
      projectInfo: null
    };
  }
  if (isPlainObject(data)) {
    if (Object.prototype.hasOwnProperty.call(data, "gearList") || Object.prototype.hasOwnProperty.call(data, "projectInfo")) {
      var normalizedProjectInfo = isPlainObject(data.projectInfo) ? data.projectInfo : null;
      if (!normalizedProjectInfo && typeof data.projectInfo === "string") {
        var parsedInfo = tryParseJSONLike(data.projectInfo);
        if (parsedInfo.success && isPlainObject(parsedInfo.parsed)) {
          normalizedProjectInfo = parsedInfo.parsed;
        }
      }
      if (!normalizedProjectInfo && isPlainObject(data.project)) {
        if (isPlainObject(data.project.projectInfo)) {
          normalizedProjectInfo = data.project.projectInfo;
        } else if (typeof data.project.projectInfo === "string") {
          var parsedProjectInfo = tryParseJSONLike(data.project.projectInfo);
          if (parsedProjectInfo.success && isPlainObject(parsedProjectInfo.parsed)) {
            normalizedProjectInfo = parsedProjectInfo.parsed;
          }
        }
      }
      var normalizedAutoGearRules = Array.isArray(data.autoGearRules) && data.autoGearRules.length ? data.autoGearRules : null;
      if (!normalizedAutoGearRules && typeof data.autoGearRules === "string") {
        var parsedRules = tryParseJSONLike(data.autoGearRules);
        if (parsedRules.success && Array.isArray(parsedRules.parsed) && parsedRules.parsed.length) {
          normalizedAutoGearRules = parsedRules.parsed;
        }
      }
      if (!normalizedAutoGearRules && isPlainObject(data.project)) {
        var nestedRules = data.project.autoGearRules;
        if (Array.isArray(nestedRules) && nestedRules.length) {
          normalizedAutoGearRules = nestedRules;
        } else if (typeof nestedRules === "string") {
          var parsedNestedRules = tryParseJSONLike(nestedRules);
          if (parsedNestedRules.success && Array.isArray(parsedNestedRules.parsed) && parsedNestedRules.parsed.length) {
            normalizedAutoGearRules = parsedNestedRules.parsed;
          }
        }
      }
      var gearListSource = data.gearList;
      if ((gearListSource === null || gearListSource === undefined || typeof gearListSource === "string" && !gearListSource) && isPlainObject(data.project) && Object.prototype.hasOwnProperty.call(data.project, "gearList")) {
        gearListSource = data.project.gearList;
      }
      var normalizedGearList = typeof gearListSource === "string" || gearListSource && _typeof(gearListSource) === "object" ? gearListSource : "";
      var normalizedGearSelectors = null;
      if (isPlainObject(data.gearSelectors)) {
        normalizedGearSelectors = cloneProjectGearSelectors(data.gearSelectors);
      } else if (typeof data.gearSelectors === "string") {
        var parsedSelectors = tryParseJSONLike(data.gearSelectors);
        if (parsedSelectors.success && isPlainObject(parsedSelectors.parsed)) {
          normalizedGearSelectors = cloneProjectGearSelectors(parsedSelectors.parsed);
        }
      }
      if (typeof normalizedGearList === "string") {
        var parsedGear = tryParseJSONLike(normalizedGearList);
        if (parsedGear.success) {
          var nested = normalizeProject(parsedGear.parsed);
          if (nested) {
            normalizedGearList = nested.gearList;
            if (!normalizedProjectInfo && nested.projectInfo) {
              normalizedProjectInfo = nested.projectInfo;
            }
            if ((!normalizedAutoGearRules || !normalizedAutoGearRules.length) && Array.isArray(nested.autoGearRules) && nested.autoGearRules.length) {
              normalizedAutoGearRules = nested.autoGearRules;
            }
            if (!normalizedGearSelectors && isPlainObject(nested.gearSelectors)) {
              normalizedGearSelectors = cloneProjectGearSelectors(nested.gearSelectors);
            }
          } else if (typeof parsedGear.parsed === "string" || isPlainObject(parsedGear.parsed) && Object.values(parsedGear.parsed).every(function (value) {
            return typeof value === "string";
          })) {
            normalizedGearList = parsedGear.parsed;
          }
        }
      }
      if (normalizedGearList && _typeof(normalizedGearList) === "object" && !isPlainObject(normalizedGearList)) {
        normalizedGearList = "";
      }
      if (normalizedProjectInfo) {
        normalizedProjectInfo = sanitizeImportedProjectInfo(normalizedProjectInfo) || null;
      }
      var _normalized2 = {
        gearList: Array.isArray(normalizedGearList) || isPlainObject(normalizedGearList) ? cloneProjectData(normalizedGearList) : normalizedGearList,
        projectInfo: normalizedProjectInfo ? cloneProjectInfo(normalizedProjectInfo) : null
      };
      var normalizedDiagramPositions = normalizeDiagramPositions(data.diagramPositions);
      if (Object.keys(normalizedDiagramPositions).length === 0 && isPlainObject(data.project)) {
        normalizedDiagramPositions = normalizeDiagramPositions(data.project.diagramPositions);
      }
      if (Object.keys(normalizedDiagramPositions).length) {
        _normalized2.diagramPositions = cloneDiagramPositionsForStorage(normalizedDiagramPositions);
      }
      var htmlSources = [];
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
        for (var i = 0; i < htmlSources.length; i += 1) {
          var recovered = extractProjectInfoFromHtml(htmlSources[i]);
          if (recovered) {
            _normalized2.projectInfo = cloneProjectInfo(recovered);
            break;
          }
        }
      } else if (htmlSources.length) {
        for (var _i2 = 0; _i2 < htmlSources.length; _i2 += 1) {
          var _recovered = extractProjectInfoFromHtml(htmlSources[_i2]);
          if (_recovered) {
            var recoveredClone = cloneProjectInfo(_recovered) || {};
            var normalizedClone = cloneProjectInfo(normalizedProjectInfo) || {};
            _normalized2.projectInfo = _objectSpread(_objectSpread({}, recoveredClone), normalizedClone);
            break;
          }
        }
      }
      if (normalizedAutoGearRules && normalizedAutoGearRules.length) {
        _normalized2.autoGearRules = cloneAutoGearRules(normalizedAutoGearRules);
      }
      if (normalizedGearSelectors && Object.keys(normalizedGearSelectors).length) {
        _normalized2.gearSelectors = normalizedGearSelectors;
      }
      return _normalized2;
    }
    if (Object.prototype.hasOwnProperty.call(data, "projectHtml") || Object.prototype.hasOwnProperty.call(data, "gearHtml")) {
      return {
        gearList: {
          projectHtml: data.projectHtml || "",
          gearHtml: data.gearHtml || ""
        },
        projectInfo: null
      };
    }
    if (isPlainObject(data.project)) {
      var _nested = normalizeProject(data.project);
      if (_nested) {
        return _nested;
      }
    } else if (typeof data.project === "string") {
      var parsedProject = tryParseJSONLike(data.project);
      if (parsedProject.success) {
        var _nested2 = normalizeProject(parsedProject.parsed);
        if (_nested2) {
          return _nested2;
        }
      }
    }
  }
  return null;
}
var LEGACY_PROJECT_ROOT_KEYS = new Set(["gearList", "projectInfo", "projectHtml", "gearHtml", "autoGearRules"]);
var NORMALIZED_PROJECT_KEYS = new Set(["gearList", "projectInfo", "autoGearRules", "diagramPositions", "gearSelectors"]);
function isNormalizedProjectEntry(entry) {
  if (!isPlainObject(entry)) {
    return false;
  }
  var keys = Object.keys(entry);
  if (!keys.every(function (key) {
    return NORMALIZED_PROJECT_KEYS.has(key);
  })) {
    return false;
  }
  var gearList = entry.gearList,
    projectInfo = entry.projectInfo;
  if (typeof gearList !== "string" && !(isPlainObject(gearList) && Object.keys(gearList).every(function (key) {
    return typeof gearList[key] === "string";
  }))) {
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
  if (Object.prototype.hasOwnProperty.call(entry, "diagramPositions") && !isPlainObject(entry.diagramPositions)) {
    return false;
  }
  if (Object.prototype.hasOwnProperty.call(entry, "gearSelectors") && !isPlainObject(entry.gearSelectors)) {
    return false;
  }
  return true;
}
function readAllProjectsFromStorage() {
  applyLegacyStorageMigrations();
  var safeStorage = getSafeLocalStorage();
  var parsed = loadJSONFromStorage(safeStorage, PROJECT_STORAGE_KEY, "Error loading project from localStorage:", null, {
    validate: function validate(value) {
      return value === null || typeof value === "string" || Array.isArray(value) || isPlainObject(value);
    }
  });
  var originalValue = parsed;
  var projects = {};
  var changed = false;
  if (parsed === null || parsed === undefined) {
    return {
      projects: projects,
      changed: false,
      originalValue: originalValue
    };
  }
  if (typeof parsed === "string") {
    var normalized = normalizeProject(parsed);
    if (normalized) {
      projects[""] = normalized;
    }
    return {
      projects: projects,
      changed: true,
      originalValue: originalValue
    };
  }
  if (Array.isArray(parsed)) {
    var usedNames = new Set();
    var normalizedNames = new Set();
    parsed.forEach(function (item, index) {
      var normalized = normalizeProject(item);
      if (!normalized) {
        changed = true;
        return;
      }
      var baseName = isPlainObject(item) && typeof item.name === "string" ? item.name.trim() : "Project ".concat(index + 1);
      var candidate = baseName || "Project ".concat(index + 1);
      var unique = generateUniqueName(candidate, usedNames, normalizedNames);
      projects[unique] = normalized;
    });
    return {
      projects: projects,
      changed: true,
      originalValue: originalValue
    };
  }
  if (!isPlainObject(parsed)) {
    return {
      projects: projects,
      changed: true,
      originalValue: originalValue
    };
  }
  var keys = Object.keys(parsed);
  var maybeLegacy = keys.length > 0 && keys.every(function (key) {
    return LEGACY_PROJECT_ROOT_KEYS.has(key);
  });
  if (maybeLegacy) {
    var _normalized3 = normalizeProject(parsed);
    if (_normalized3) {
      projects[""] = _normalized3;
    }
    return {
      projects: projects,
      changed: true,
      originalValue: originalValue
    };
  }
  keys.forEach(function (key) {
    var normalized = normalizeProject(parsed[key]);
    if (normalized) {
      projects[key] = normalized;
      if (!isNormalizedProjectEntry(parsed[key])) {
        changed = true;
      }
    } else {
      changed = true;
    }
  });
  return {
    projects: projects,
    changed: changed,
    originalValue: originalValue
  };
}
function persistAllProjects(projects) {
  var safeStorage = getSafeLocalStorage();
  enforceAutoBackupLimits(projects);
  ensurePreWriteMigrationBackup(safeStorage, PROJECT_STORAGE_KEY);
  saveJSONToStorage(safeStorage, PROJECT_STORAGE_KEY, projects, "Error saving project to localStorage:", {
    onQuotaExceeded: function onQuotaExceeded() {
      var removedKey = removeOldestAutoBackupEntry(projects);
      if (!removedKey) {
        return false;
      }
      console.warn("Removed automatic project backup \"".concat(removedKey, "\" to free up storage space before saving projects."));
      return true;
    }
  });
}
function loadProject(name) {
  var _readAllProjectsFromS = readAllProjectsFromStorage(),
    projects = _readAllProjectsFromS.projects,
    changed = _readAllProjectsFromS.changed,
    originalValue = _readAllProjectsFromS.originalValue;
  if (changed) {
    var safeStorage = getSafeLocalStorage();
    if (safeStorage) {
      createStorageMigrationBackup(safeStorage, PROJECT_STORAGE_KEY, originalValue);
    }
    persistAllProjects(projects);
  }
  if (name === undefined) {
    return projects;
  }
  var key = name || "";
  return Object.prototype.hasOwnProperty.call(projects, key) ? projects[key] : null;
}
function sanitizeProjectNameForBackup(name) {
  if (typeof name !== 'string') {
    return '';
  }
  var collapsed = name.replace(/\s+/g, ' ').trim();
  if (!collapsed) {
    return '';
  }
  if (collapsed.length <= 120) {
    return collapsed;
  }
  return collapsed.slice(0, 120);
}
function formatAutoBackupTimestamp(date) {
  var pad = function pad(value) {
    return String(value).padStart(2, '0');
  };
  return [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate()), pad(date.getHours()), pad(date.getMinutes()), pad(date.getSeconds())].join('-');
}
function generateDeletionBackupMetadata(projectName, projects) {
  var now = new Date();
  var timestamp = formatAutoBackupTimestamp(now);
  var sanitizedName = sanitizeProjectNameForBackup(projectName);
  var baseName = sanitizedName ? "".concat(STORAGE_AUTO_BACKUP_DELETION_PREFIX).concat(timestamp, "-").concat(sanitizedName) : "".concat(STORAGE_AUTO_BACKUP_DELETION_PREFIX).concat(timestamp);
  var usedNames = new Set(Object.keys(projects));
  if (!usedNames.has(baseName)) {
    return {
      name: baseName
    };
  }
  var suffix = 2;
  var candidate = "".concat(baseName, "-").concat(suffix);
  while (usedNames.has(candidate)) {
    suffix += 1;
    candidate = "".concat(baseName, "-").concat(suffix);
  }
  return {
    name: candidate
  };
}
function cloneProjectEntryForBackup(entry) {
  if (entry === undefined) {
    return undefined;
  }
  if (entry === null || _typeof(entry) !== 'object') {
    return entry;
  }
  try {
    return JSON.parse(JSON.stringify(entry));
  } catch (error) {
    console.warn('Unable to deep clone project for backup', error);
    return _objectSpread({}, entry);
  }
}
function maybeCreateProjectDeletionBackup(projects, key) {
  if (!projects || !Object.prototype.hasOwnProperty.call(projects, key)) {
    return {
      status: 'missing'
    };
  }
  if (typeof key === 'string' && key.startsWith(STORAGE_AUTO_BACKUP_NAME_PREFIX)) {
    return {
      status: 'skipped'
    };
  }
  var entry = projects[key];
  if (entry === undefined) {
    return {
      status: 'missing'
    };
  }
  var _generateDeletionBack = generateDeletionBackupMetadata(key, projects),
    backupName = _generateDeletionBack.name;
  if (!backupName) {
    return {
      status: 'failed'
    };
  }
  var cloned = cloneProjectEntryForBackup(entry);
  if (cloned === undefined) {
    return {
      status: 'failed'
    };
  }
  projects[backupName] = cloned;
  return {
    status: 'created',
    backupName: backupName
  };
}
function saveProject(name, project) {
  if (!isPlainObject(project)) return;
  var normalized = normalizeProject(project) || {
    gearList: "",
    projectInfo: null
  };
  var _readAllProjectsFromS2 = readAllProjectsFromStorage(),
    projects = _readAllProjectsFromS2.projects,
    changed = _readAllProjectsFromS2.changed,
    originalValue = _readAllProjectsFromS2.originalValue;
  if (changed) {
    var safeStorage = getSafeLocalStorage();
    if (safeStorage) {
      createStorageMigrationBackup(safeStorage, PROJECT_STORAGE_KEY, originalValue);
    }
  }
  projects[name || ""] = normalized;
  persistAllProjects(projects);
}
function deleteProject(name) {
  if (name === undefined) {
    deleteFromStorage(getSafeLocalStorage(), PROJECT_STORAGE_KEY, "Error deleting project from localStorage:");
    return;
  }
  var key = name || "";
  var _readAllProjectsFromS3 = readAllProjectsFromStorage(),
    projects = _readAllProjectsFromS3.projects,
    changed = _readAllProjectsFromS3.changed,
    originalValue = _readAllProjectsFromS3.originalValue;
  if (changed) {
    var safeStorage = getSafeLocalStorage();
    if (safeStorage) {
      createStorageMigrationBackup(safeStorage, PROJECT_STORAGE_KEY, originalValue);
    }
  }
  if (!Object.prototype.hasOwnProperty.call(projects, key)) {
    return;
  }
  var backupOutcome = maybeCreateProjectDeletionBackup(projects, key);
  if (backupOutcome.status === 'failed') {
    console.warn("Automatic backup before deleting project \"".concat(key, "\" failed. Deletion aborted."));
    alertStorageError();
    return;
  }
  delete projects[key];
  if (Object.keys(projects).length === 0) {
    deleteFromStorage(getSafeLocalStorage(), PROJECT_STORAGE_KEY, "Error deleting project from localStorage:");
  } else {
    persistAllProjects(projects);
  }
}
function createProjectImporter() {
  var _readAllProjectsFromS4 = readAllProjectsFromStorage(),
    projects = _readAllProjectsFromS4.projects,
    changed = _readAllProjectsFromS4.changed,
    originalValue = _readAllProjectsFromS4.originalValue;
  if (changed) {
    var safeStorage = getSafeLocalStorage();
    if (safeStorage) {
      createStorageMigrationBackup(safeStorage, PROJECT_STORAGE_KEY, originalValue);
    }
  }
  var usedNames = new Set(Object.keys(projects));
  var normalizedNames = new Set(_toConsumableArray(usedNames).map(function (name) {
    return name.trim().toLowerCase();
  }));
  var defaultName = "Imported project";
  return function (rawName, project) {
    var fallbackName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultName;
    var normalizedProject = normalizeProject(project);
    if (!normalizedProject) return;
    var candidates = [];
    if (typeof rawName === "string") {
      candidates.push(rawName.trim());
    }
    if (isPlainObject(project)) {
      if (typeof project.name === "string") {
        candidates.push(project.name.trim());
      }
      var info = project.projectInfo;
      if (isPlainObject(info) && typeof info.projectName === "string") {
        candidates.push(info.projectName.trim());
      }
    }
    var fallback = typeof fallbackName === "string" && fallbackName.trim() ? fallbackName.trim() : defaultName;
    if (candidates.includes("") && !normalizedNames.has("")) {
      usedNames.add("");
      normalizedNames.add("");
      saveProject("", normalizedProject);
      return;
    }
    var baseName = candidates.find(function (candidate) {
      return candidate;
    }) || fallback;
    var uniqueName = generateUniqueName(baseName, usedNames, normalizedNames);
    saveProject(uniqueName, normalizedProject);
  };
}
function tryParseJSONLike(value) {
  if (typeof value !== "string") {
    return {
      success: false,
      parsed: null
    };
  }
  var trimmed = value.trim();
  if (!trimmed) {
    return {
      success: false,
      parsed: null
    };
  }
  var firstChar = trimmed[0];
  var lastChar = trimmed[trimmed.length - 1];
  var expectedClosing = null;
  if (firstChar === "{") {
    expectedClosing = "}";
  } else if (firstChar === "[") {
    expectedClosing = "]";
  } else if (firstChar === "\"") {
    expectedClosing = "\"";
  }
  if (!expectedClosing || lastChar !== expectedClosing) {
    return {
      success: false,
      parsed: null
    };
  }
  try {
    return {
      success: true,
      parsed: JSON.parse(trimmed)
    };
  } catch (error) {
    void error;
    return {
      success: false,
      parsed: null
    };
  }
}
function importProjectCollection(collection, ensureImporter) {
  var fallbackLabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Imported project";
  if (typeof collection === "string") {
    var parsed = tryParseJSONLike(collection);
    if (parsed.success) {
      return importProjectCollection(parsed.parsed, ensureImporter, fallbackLabel);
    }
    ensureImporter()("", collection);
    return true;
  }
  if (Array.isArray(collection)) {
    var importProject = ensureImporter();
    collection.forEach(function (proj, idx) {
      if (proj === null || proj === undefined) return;
      var rawName = isPlainObject(proj) && typeof proj.name === "string" ? proj.name : "";
      importProject(rawName, proj, "".concat(fallbackLabel, " ").concat(idx + 1));
    });
    return true;
  }
  if (isPlainObject(collection)) {
    var _importProject = ensureImporter();
    Object.entries(collection).forEach(function (_ref15) {
      var _ref16 = _slicedToArray(_ref15, 2),
        name = _ref16[0],
        proj = _ref16[1];
      _importProject(name, proj);
    });
    return true;
  }
  return false;
}
function loadFavorites() {
  applyLegacyStorageMigrations();
  var safeStorage = getSafeLocalStorage();
  var parsed = loadJSONFromStorage(safeStorage, FAVORITES_STORAGE_KEY, "Error loading favorites from localStorage:", {}, {
    validate: function validate(value) {
      return value === null || isPlainObject(value);
    }
  });
  return isPlainObject(parsed) ? parsed : {};
}
function saveFavorites(favs) {
  var safeStorage = getSafeLocalStorage();
  if (favs === null || favs === undefined) {
    deleteFromStorage(safeStorage, FAVORITES_STORAGE_KEY, "Error deleting favorites from localStorage:");
    return;
  }
  if (!isPlainObject(favs)) {
    console.warn('Ignoring invalid favorites payload. Expected a plain object.');
    return;
  }
  ensurePreWriteMigrationBackup(safeStorage, FAVORITES_STORAGE_KEY);
  saveJSONToStorage(safeStorage, FAVORITES_STORAGE_KEY, favs, "Error saving favorites to localStorage:");
}
function loadFeedback() {
  applyLegacyStorageMigrations();
  var safeStorage = getSafeLocalStorage();
  var parsed = loadJSONFromStorage(safeStorage, FEEDBACK_STORAGE_KEY, "Error loading feedback from localStorage:", null, {
    validate: function validate(value) {
      return value === null || isPlainObject(value);
    }
  });
  if (isPlainObject(parsed)) {
    return parsed;
  }
  return {};
}
function saveFeedback(feedback) {
  var safeStorage = getSafeLocalStorage();
  if (feedback === null || feedback === undefined) {
    deleteFromStorage(safeStorage, FEEDBACK_STORAGE_KEY, "Error deleting feedback from localStorage:");
    return;
  }
  if (!isPlainObject(feedback)) {
    console.warn('Ignoring invalid feedback payload. Expected a plain object.');
    return;
  }
  ensurePreWriteMigrationBackup(safeStorage, FEEDBACK_STORAGE_KEY);
  saveJSONToStorage(safeStorage, FEEDBACK_STORAGE_KEY, feedback, "Error saving feedback to localStorage:");
}
function normalizeFullBackupHistoryEntry(entry) {
  if (!entry) {
    return null;
  }
  if (typeof entry === 'string') {
    var trimmed = entry.trim();
    return trimmed ? {
      createdAt: trimmed
    } : null;
  }
  if (_typeof(entry) === 'object') {
    var createdAt = typeof entry.createdAt === 'string' && entry.createdAt.trim() ? entry.createdAt.trim() : typeof entry.iso === 'string' && entry.iso.trim() ? entry.iso.trim() : typeof entry.timestamp === 'string' && entry.timestamp.trim() ? entry.timestamp.trim() : null;
    if (!createdAt) {
      return null;
    }
    var normalized = {
      createdAt: createdAt
    };
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
  var safeStorage = getSafeLocalStorage();
  var parsed = loadJSONFromStorage(safeStorage, FULL_BACKUP_HISTORY_STORAGE_KEY, "Error loading full backup history from localStorage:", [], {
    validate: function validate(value) {
      return value === null || Array.isArray(value);
    }
  });
  if (!Array.isArray(parsed)) {
    return [];
  }
  return parsed.map(normalizeFullBackupHistoryEntry).filter(Boolean);
}
function saveFullBackupHistory(entries) {
  var safeEntries = Array.isArray(entries) ? entries.map(normalizeFullBackupHistoryEntry).filter(Boolean) : [];
  var safeStorage = getSafeLocalStorage();
  if (!safeEntries.length) {
    deleteFromStorage(safeStorage, FULL_BACKUP_HISTORY_STORAGE_KEY, "Error deleting full backup history from localStorage:");
    return;
  }
  ensurePreWriteMigrationBackup(safeStorage, FULL_BACKUP_HISTORY_STORAGE_KEY);
  saveJSONToStorage(safeStorage, FULL_BACKUP_HISTORY_STORAGE_KEY, safeEntries, "Error saving full backup history to localStorage:");
}
var recordFullBackupHistoryEntry = function recordFullBackupHistoryEntry(entry) {
  var normalized = normalizeFullBackupHistoryEntry(entry);
  if (!normalized) {
    return loadFullBackupHistory();
  }
  var history = loadFullBackupHistory();
  history.push(normalized);
  var trimmed = history.slice(-MAX_FULL_BACKUP_HISTORY_ENTRIES);
  saveFullBackupHistory(trimmed);
  return trimmed;
};
function normalizeImportedFullBackupHistory(value) {
  if (value === null || value === undefined) {
    return [];
  }
  if (typeof value === 'string') {
    var parsed = tryParseJSONLike(value);
    if (parsed.success) {
      return normalizeImportedFullBackupHistory(parsed.parsed);
    }
    var entry = normalizeFullBackupHistoryEntry(value);
    return entry ? [entry] : [];
  }
  if (Array.isArray(value)) {
    return value.map(normalizeFullBackupHistoryEntry).filter(Boolean);
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
    var _entry4 = normalizeFullBackupHistoryEntry(value);
    if (_entry4) {
      return [_entry4];
    }
    var nestedValues = Object.values(value);
    if (nestedValues.length) {
      return normalizeImportedFullBackupHistory(nestedValues);
    }
  }
  return [];
}
function loadAutoGearRules() {
  applyLegacyStorageMigrations();
  var safeStorage = getSafeLocalStorage();
  var parsed = loadJSONFromStorage(safeStorage, AUTO_GEAR_RULES_STORAGE_KEY, "Error loading automatic gear rules from localStorage:", [], {
    validate: function validate(value) {
      return value === null || Array.isArray(value);
    }
  });
  return Array.isArray(parsed) ? parsed : [];
}
function saveAutoGearRules(rules) {
  var safeRules = Array.isArray(rules) ? rules : [];
  var safeStorage = getSafeLocalStorage();
  ensurePreWriteMigrationBackup(safeStorage, AUTO_GEAR_RULES_STORAGE_KEY);
  saveJSONToStorage(safeStorage, AUTO_GEAR_RULES_STORAGE_KEY, safeRules, "Error saving automatic gear rules to localStorage:");
}
function loadAutoGearBackups() {
  applyLegacyStorageMigrations();
  var safeStorage = getSafeLocalStorage();
  var parsed = loadJSONFromStorage(safeStorage, AUTO_GEAR_BACKUPS_STORAGE_KEY, "Error loading automatic gear rule backups from localStorage:", [], {
    validate: function validate(value) {
      return value === null || Array.isArray(value);
    }
  });
  return Array.isArray(parsed) ? parsed : [];
}
function saveAutoGearBackups(backups) {
  var safeBackups = Array.isArray(backups) ? backups : [];
  var safeStorage = getSafeLocalStorage();
  ensurePreWriteMigrationBackup(safeStorage, AUTO_GEAR_BACKUPS_STORAGE_KEY);
  saveJSONToStorage(safeStorage, AUTO_GEAR_BACKUPS_STORAGE_KEY, safeBackups, "Error saving automatic gear rule backups to localStorage:");
}
function loadAutoGearSeedFlag() {
  applyLegacyStorageMigrations();
  var safeStorage = getSafeLocalStorage();
  return loadFlagFromStorage(safeStorage, AUTO_GEAR_SEEDED_STORAGE_KEY, "Error loading automatic gear seed flag from localStorage:");
}
function saveAutoGearSeedFlag(flag) {
  var safeStorage = getSafeLocalStorage();
  saveFlagToStorage(safeStorage, AUTO_GEAR_SEEDED_STORAGE_KEY, Boolean(flag), "Error saving automatic gear seed flag to localStorage:");
}
function loadAutoGearPresets() {
  applyLegacyStorageMigrations();
  var safeStorage = getSafeLocalStorage();
  var presets = loadJSONFromStorage(safeStorage, AUTO_GEAR_PRESETS_STORAGE_KEY, "Error loading automatic gear presets from localStorage:", [], {
    validate: function validate(value) {
      return value === null || Array.isArray(value);
    }
  });
  return Array.isArray(presets) ? presets : [];
}
function saveAutoGearPresets(presets) {
  var safePresets = Array.isArray(presets) ? presets : [];
  var safeStorage = getSafeLocalStorage();
  ensurePreWriteMigrationBackup(safeStorage, AUTO_GEAR_PRESETS_STORAGE_KEY);
  saveJSONToStorage(safeStorage, AUTO_GEAR_PRESETS_STORAGE_KEY, safePresets, "Error saving automatic gear presets to localStorage:");
}
function loadAutoGearMonitorDefaults() {
  applyLegacyStorageMigrations();
  var safeStorage = getSafeLocalStorage();
  var defaults = loadJSONFromStorage(safeStorage, AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY, "Error loading automatic gear monitor defaults from localStorage:", {}, {
    validate: function validate(value) {
      return value === null || _typeof(value) === 'object';
    }
  });
  return defaults && _typeof(defaults) === 'object' ? defaults : {};
}
function saveAutoGearMonitorDefaults(defaults) {
  var safeDefaults = defaults && _typeof(defaults) === 'object' ? defaults : {};
  var safeStorage = getSafeLocalStorage();
  ensurePreWriteMigrationBackup(safeStorage, AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY);
  saveJSONToStorage(safeStorage, AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY, safeDefaults, "Error saving automatic gear monitor defaults to localStorage:");
}
function removeAutoGearPresetFromStorage(presetId, storage) {
  if (!presetId) {
    return;
  }
  var safeStorage = storage || getSafeLocalStorage();
  if (!safeStorage) {
    return;
  }
  var rawPresets;
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
  var parsedPresets;
  try {
    parsedPresets = JSON.parse(rawPresets);
  } catch (parseError) {
    console.error('Error parsing automatic gear presets while removing autosaved preset from localStorage:', parseError);
    return;
  }
  if (!Array.isArray(parsedPresets)) {
    return;
  }
  var filteredPresets = parsedPresets.filter(function (preset) {
    if (!preset || _typeof(preset) !== 'object') {
      return true;
    }
    return preset.id !== presetId;
  });
  if (filteredPresets.length === parsedPresets.length) {
    return;
  }
  saveJSONToStorage(safeStorage, AUTO_GEAR_PRESETS_STORAGE_KEY, filteredPresets, "Error saving automatic gear presets to localStorage:");
}
function loadAutoGearActivePresetId() {
  applyLegacyStorageMigrations();
  var safeStorage = getSafeLocalStorage();
  if (!safeStorage) {
    return '';
  }
  try {
    var value = safeStorage.getItem(AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY);
    return typeof value === 'string' ? value : '';
  } catch (error) {
    console.error('Error loading automatic gear active preset from localStorage:', error);
    downgradeSafeLocalStorageToMemory('read access', error, safeStorage);
    alertStorageError();
    return '';
  }
}
function saveAutoGearActivePresetId(presetId) {
  var safeStorage = getSafeLocalStorage();
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
  var safeStorage = getSafeLocalStorage();
  if (!safeStorage) {
    return '';
  }
  try {
    var value = safeStorage.getItem(AUTO_GEAR_AUTO_PRESET_STORAGE_KEY);
    return typeof value === 'string' ? value : '';
  } catch (error) {
    console.error('Error loading automatic gear auto preset from localStorage:', error);
    downgradeSafeLocalStorageToMemory('read access', error, safeStorage);
    alertStorageError();
    return '';
  }
}
function saveAutoGearAutoPresetId(presetId) {
  var safeStorage = getSafeLocalStorage();
  if (!safeStorage) {
    return;
  }
  var previousPresetId = '';
  try {
    var existingId = safeStorage.getItem(AUTO_GEAR_AUTO_PRESET_STORAGE_KEY);
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
  var safeStorage = getSafeLocalStorage();
  return loadFlagFromStorage(safeStorage, AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY, "Error loading automatic gear backup visibility from localStorage:");
}
function saveAutoGearBackupVisibility(flag) {
  var safeStorage = getSafeLocalStorage();
  saveFlagToStorage(safeStorage, AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY, Boolean(flag), "Error saving automatic gear backup visibility to localStorage:");
}
function clampAutoGearBackupRetention(value) {
  var numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return getAutoGearBackupRetentionDefault();
  }
  var rounded = Math.round(numeric);
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
    var candidate = GLOBAL_SCOPE.AUTO_GEAR_BACKUP_RETENTION_DEFAULT;
    if (Number.isFinite(candidate) && candidate >= AUTO_GEAR_BACKUP_RETENTION_MIN) {
      return Math.min(Math.max(Math.round(candidate), AUTO_GEAR_BACKUP_RETENTION_MIN), MAX_AUTO_BACKUPS);
    }
  }
  return AUTO_GEAR_BACKUP_RETENTION_DEFAULT_VALUE;
}
function normalizeAutoGearBackupRetentionValue(value) {
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getAutoGearBackupRetentionDefault();
  if (value === null || value === undefined) {
    return fallback;
  }
  if (typeof value === 'number') {
    return clampAutoGearBackupRetention(value);
  }
  if (typeof value === 'string') {
    var trimmed = value.trim();
    if (!trimmed) {
      return fallback;
    }
    var parsed = Number(trimmed);
    if (Number.isFinite(parsed)) {
      return clampAutoGearBackupRetention(parsed);
    }
    var maybeJson = tryParseJSONLike(trimmed);
    if (maybeJson && maybeJson.success) {
      return normalizeAutoGearBackupRetentionValue(maybeJson.parsed, fallback);
    }
    return fallback;
  }
  if (Array.isArray(value)) {
    for (var index = 0; index < value.length; index += 1) {
      var candidate = normalizeAutoGearBackupRetentionValue(value[index], null);
      if (typeof candidate === 'number' && Number.isFinite(candidate)) {
        return clampAutoGearBackupRetention(candidate);
      }
    }
    return fallback;
  }
  if (isPlainObject(value)) {
    var candidateKeys = ['value', 'retention', 'limit', 'count'];
    for (var i = 0; i < candidateKeys.length; i += 1) {
      var key = candidateKeys[i];
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        continue;
      }
      var _candidate2 = normalizeAutoGearBackupRetentionValue(value[key], null);
      if (typeof _candidate2 === 'number' && Number.isFinite(_candidate2)) {
        return clampAutoGearBackupRetention(_candidate2);
      }
    }
    return fallback;
  }
  return fallback;
}
function loadAutoGearBackupRetention() {
  applyLegacyStorageMigrations();
  var safeStorage = getSafeLocalStorage();
  var retention = loadJSONFromStorage(safeStorage, AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY, "Error loading automatic gear backup retention from localStorage:", getAutoGearBackupRetentionDefault(), {
    validate: function validate(value) {
      return value === null || typeof value === 'number' || typeof value === 'string' || Array.isArray(value) || isPlainObject(value);
    }
  });
  return normalizeAutoGearBackupRetentionValue(retention);
}
function saveAutoGearBackupRetention(retention) {
  var safeStorage = getSafeLocalStorage();
  var normalized = normalizeAutoGearBackupRetentionValue(retention);
  ensurePreWriteMigrationBackup(safeStorage, AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY);
  saveJSONToStorage(safeStorage, AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY, normalized, "Error saving automatic gear backup retention to localStorage:");
}
function clearAllData() {
  var msg = "Error clearing storage:";
  var safeStorage = getSafeLocalStorage();
  deleteFromStorage(safeStorage, DEVICE_STORAGE_KEY, msg);
  deleteFromStorage(safeStorage, SETUP_STORAGE_KEY, msg);
  deleteFromStorage(safeStorage, FEEDBACK_STORAGE_KEY, msg);
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
  deleteFromStorage(safeStorage, getCustomFontStorageKeyName(), msg);
  deleteFromStorage(safeStorage, CUSTOM_LOGO_STORAGE_KEY, msg);
  deleteFromStorage(safeStorage, DEVICE_SCHEMA_CACHE_KEY, msg);
  deleteFromStorage(safeStorage, SESSION_STATE_KEY, msg);
  if (typeof sessionStorage !== 'undefined') {
    deleteFromStorage(sessionStorage, SESSION_STATE_KEY, msg);
  }
  var preferenceKeys = ['darkMode', 'pinkMode', 'highContrast', 'reduceMotion', 'relaxedSpacing', 'showAutoBackups', 'accentColor', 'fontSize', 'fontFamily', 'language', 'iosPwaHelpShown'];
  preferenceKeys.forEach(function (key) {
    deleteFromStorage(safeStorage, key, msg, {
      disableBackup: true
    });
  });
  var storageCandidates = collectUniqueStorages([safeStorage, typeof SAFE_LOCAL_STORAGE !== 'undefined' ? SAFE_LOCAL_STORAGE : null, getWindowStorage('localStorage'), typeof localStorage !== 'undefined' ? localStorage : null]);
  var sessionCandidates = collectUniqueStorages([typeof sessionStorage !== 'undefined' ? sessionStorage : null, getWindowStorage('sessionStorage')]);
  var prefixedKeys = ['cameraPowerPlanner_', 'cinePowerPlanner_'];
  var collectKeysWithPrefixes = function collectKeysWithPrefixes(storage) {
    if (!storage) {
      return [];
    }
    var keys = [];
    if (typeof storage.key === 'function' && typeof storage.length === 'number') {
      var _loop2 = function _loop2() {
        var candidateKey = null;
        try {
          candidateKey = storage.key(index);
        } catch (error) {
          console.warn('Unable to inspect storage key during factory reset', error);
        }
        if (typeof candidateKey === 'string' && prefixedKeys.some(function (prefix) {
          return candidateKey.startsWith(prefix);
        })) {
          keys.push(candidateKey);
        }
      };
      for (var index = 0; index < storage.length; index += 1) {
        _loop2();
      }
      return keys;
    }
    if (typeof storage.keys === 'function') {
      try {
        var candidateKeys = storage.keys();
        if (Array.isArray(candidateKeys)) {
          candidateKeys.forEach(function (candidateKey) {
            if (typeof candidateKey === 'string' && prefixedKeys.some(function (prefix) {
              return candidateKey.startsWith(prefix);
            })) {
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
        storage.forEach(function (value, candidateKey) {
          if (typeof candidateKey === 'string' && prefixedKeys.some(function (prefix) {
            return candidateKey.startsWith(prefix);
          })) {
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
  var deletePrefixedKeys = function deletePrefixedKeys(storages) {
    storages.forEach(function (storage) {
      var keysToRemove = collectKeysWithPrefixes(storage);
      if (!keysToRemove.length) {
        return;
      }
      keysToRemove.forEach(function (key) {
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
function readLocalStorageValue(key) {
  var storage = getSafeLocalStorage();
  if (!storage || typeof storage.getItem !== 'function') return null;
  try {
    var value = storage.getItem(key);
    if (value === null || value === undefined) {
      if (RAW_STORAGE_BACKUP_KEYS.has(key)) {
        try {
          var backupValue = storage.getItem("".concat(key).concat(STORAGE_BACKUP_SUFFIX));
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
  var preferences = {};
  var darkMode = parseStoredBoolean(readLocalStorageValue('darkMode'));
  if (darkMode !== null) {
    preferences.darkMode = darkMode;
  }
  var pinkMode = parseStoredBoolean(readLocalStorageValue('pinkMode'));
  if (pinkMode !== null) {
    preferences.pinkMode = pinkMode;
  }
  var highContrast = parseStoredBoolean(readLocalStorageValue('highContrast'));
  if (highContrast !== null) {
    preferences.highContrast = highContrast;
  }
  var reduceMotion = parseStoredBoolean(readLocalStorageValue('reduceMotion'));
  if (reduceMotion !== null) {
    preferences.reduceMotion = reduceMotion;
  }
  var relaxedSpacing = parseStoredBoolean(readLocalStorageValue('relaxedSpacing'));
  if (relaxedSpacing !== null) {
    preferences.relaxedSpacing = relaxedSpacing;
  }
  var showAutoBackups = parseStoredBoolean(readLocalStorageValue('showAutoBackups'));
  if (showAutoBackups !== null) {
    preferences.showAutoBackups = showAutoBackups;
  }
  var accentColor = readLocalStorageValue('accentColor');
  if (accentColor) {
    preferences.accentColor = accentColor;
  }
  var fontSize = readLocalStorageValue('fontSize');
  if (fontSize) {
    preferences.fontSize = fontSize;
  }
  var fontFamily = readLocalStorageValue('fontFamily');
  if (fontFamily) {
    preferences.fontFamily = fontFamily;
  }
  var language = readLocalStorageValue('language');
  if (language) {
    preferences.language = language;
  }
  var iosPwaHelpShown = parseStoredBoolean(readLocalStorageValue('iosPwaHelpShown'));
  if (iosPwaHelpShown !== null) {
    preferences.iosPwaHelpShown = iosPwaHelpShown;
  }
  var temperatureUnit = readLocalStorageValue(TEMPERATURE_UNIT_STORAGE_KEY_NAME);
  if (temperatureUnit) {
    preferences.temperatureUnit = temperatureUnit;
  }
  return preferences;
}
function normalizeCustomFontEntries(entries) {
  if (!Array.isArray(entries)) {
    return [];
  }
  return entries.map(function (entry) {
    return {
      id: entry && typeof entry.id === 'string' ? entry.id : null,
      name: entry && typeof entry.name === 'string' ? entry.name : '',
      data: entry && typeof entry.data === 'string' ? entry.data : ''
    };
  }).filter(function (entry) {
    return entry.id && entry.name && entry.data;
  });
}
function readStoredCustomFonts() {
  var raw = readLocalStorageValue(getCustomFontStorageKeyName());
  if (!raw) {
    return [];
  }
  try {
    var parsed = JSON.parse(raw);
    return normalizeCustomFontEntries(parsed);
  } catch (error) {
    console.warn('Failed to parse stored custom fonts for backup', error);
    return [];
  }
}
function exportAllData() {
  var payload = {
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
    fullBackupHistory: loadFullBackupHistory()
  };
  var preferences = collectPreferenceSnapshot();
  if (Object.keys(preferences).length) {
    payload.preferences = preferences;
  }
  var customLogo = readLocalStorageValue(CUSTOM_LOGO_STORAGE_KEY);
  if (customLogo) {
    payload.customLogo = customLogo;
  }
  var customFonts = readStoredCustomFonts();
  if (customFonts.length) {
    payload.customFonts = customFonts;
  }
  var schemaCache = readLocalStorageValue(DEVICE_SCHEMA_CACHE_KEY);
  if (schemaCache !== null && schemaCache !== undefined) {
    payload.schemaCache = schemaCache;
  }
  return payload;
}
function safeSetLocalStorage(key, value) {
  var storage = getSafeLocalStorage();
  if (!storage) return;
  var useBackup = RAW_STORAGE_BACKUP_KEYS.has(key);
  var backupKey = "".concat(key).concat(STORAGE_BACKUP_SUFFIX);
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
      var storedValue = String(value);
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
    var normalized = value.trim().toLowerCase();
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
    for (var i = 0; i < value.length; i += 1) {
      var _normalized4 = normalizeImportedBoolean(value[i]);
      if (_normalized4 !== null) {
        return _normalized4;
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
function normalizeImportedArray(value) {
  var fallbackKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var filterFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  if (Array.isArray(value)) {
    return filterFn ? value.filter(function (entry) {
      return filterFn(entry);
    }) : value.filter(function (entry) {
      return entry !== null && entry !== undefined;
    });
  }
  if (typeof value === "string") {
    var parsed = tryParseJSONLike(value);
    if (parsed.success) {
      return normalizeImportedArray(parsed.parsed, fallbackKeys, filterFn);
    }
    return [];
  }
  if (isPlainObject(value)) {
    for (var i = 0; i < fallbackKeys.length; i += 1) {
      var key = fallbackKeys[i];
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        continue;
      }
      var extracted = normalizeImportedArray(value[key], fallbackKeys, filterFn);
      if (extracted.length) {
        return extracted;
      }
    }
    var entries = Object.values(value);
    if (entries.length) {
      return filterFn ? entries.filter(function (entry) {
        return filterFn(entry);
      }) : entries.filter(function (entry) {
        return entry !== null && entry !== undefined;
      });
    }
  }
  return [];
}
function normalizeImportedAutoGearRules(value) {
  return normalizeImportedArray(value, ["rules", "items", "entries", "list", "values", "data"], function (entry) {
    return entry !== null && _typeof(entry) === "object";
  });
}
function normalizeImportedAutoGearBackups(value) {
  return normalizeImportedArray(value, ["backups", "entries", "items", "list", "values", "data"], function (entry) {
    return entry !== null && _typeof(entry) === "object";
  });
}
function normalizeImportedAutoGearBackupRetention(value) {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === 'number') {
    return clampAutoGearBackupRetention(value);
  }
  if (typeof value === 'string') {
    var trimmed = value.trim();
    if (!trimmed) {
      return null;
    }
    var direct = Number(trimmed);
    if (Number.isFinite(direct)) {
      return clampAutoGearBackupRetention(direct);
    }
    var parsed = tryParseJSONLike(trimmed);
    if (parsed && parsed.success) {
      return normalizeImportedAutoGearBackupRetention(parsed.parsed);
    }
    return null;
  }
  if (Array.isArray(value)) {
    for (var i = 0; i < value.length; i += 1) {
      var candidate = normalizeImportedAutoGearBackupRetention(value[i]);
      if (typeof candidate === 'number') {
        return candidate;
      }
    }
    return null;
  }
  if (isPlainObject(value)) {
    var candidateKeys = ['value', 'retention', 'limit', 'count'];
    for (var _i3 = 0; _i3 < candidateKeys.length; _i3 += 1) {
      var key = candidateKeys[_i3];
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        continue;
      }
      var _candidate3 = normalizeImportedAutoGearBackupRetention(value[key]);
      if (typeof _candidate3 === 'number') {
        return _candidate3;
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
  return normalizeImportedArray(value, ["presets", "entries", "items", "list", "values", "data"], function (entry) {
    return entry !== null && _typeof(entry) === "object";
  });
}
function normalizeImportedAutoGearMonitorDefaults(value) {
  if (!value || _typeof(value) !== 'object') {
    return {};
  }
  var normalized = {};
  Object.entries(value).forEach(function (_ref17) {
    var _ref18 = _slicedToArray(_ref17, 2),
      key = _ref18[0],
      val = _ref18[1];
    if (typeof val !== 'string') return;
    var trimmed = val.trim();
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
    for (var i = 0; i < value.length; i += 1) {
      var candidate = normalizeImportedPresetId(value[i]);
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
  var variants = [key];
  if (typeof key === 'string') {
    if (key.startsWith('cameraPowerPlanner_')) {
      variants.push("cinePowerPlanner_".concat(key.slice('cameraPowerPlanner_'.length)));
    } else if (key.startsWith('cinePowerPlanner_')) {
      variants.push("cameraPowerPlanner_".concat(key.slice('cinePowerPlanner_'.length)));
    }
  }
  return variants;
}
function readSnapshotEntry(snapshot, key) {
  if (!isPlainObject(snapshot)) {
    return null;
  }
  var variants = getSnapshotKeyVariants(key);
  for (var i = 0; i < variants.length; i += 1) {
    var candidate = variants[i];
    if (Object.prototype.hasOwnProperty.call(snapshot, candidate)) {
      return {
        key: candidate,
        value: snapshot[candidate],
        type: 'primary'
      };
    }
  }
  for (var _i4 = 0; _i4 < variants.length; _i4 += 1) {
    var _candidate4 = "".concat(variants[_i4]).concat(STORAGE_BACKUP_SUFFIX);
    if (Object.prototype.hasOwnProperty.call(snapshot, _candidate4)) {
      return {
        key: _candidate4,
        value: snapshot[_candidate4],
        type: 'backup'
      };
    }
  }
  for (var _i5 = 0; _i5 < variants.length; _i5 += 1) {
    var _candidate5 = "".concat(variants[_i5]).concat(STORAGE_MIGRATION_BACKUP_SUFFIX);
    if (Object.prototype.hasOwnProperty.call(snapshot, _candidate5)) {
      return {
        key: _candidate5,
        value: snapshot[_candidate5],
        type: 'migration-backup'
      };
    }
  }
  return null;
}
function extractSnapshotStoredValue(entry) {
  if (!entry) {
    return undefined;
  }
  var raw = entry.value;
  if (entry.type === 'migration-backup') {
    try {
      var parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (parsed && _typeof(parsed) === 'object') {
        if (parsed.compression === MIGRATION_BACKUP_COMPRESSION_ALGORITHM && parsed.encoding === MIGRATION_BACKUP_COMPRESSION_ENCODING && typeof parsed.data === 'string') {
          if (canUseMigrationBackupCompression()) {
            try {
              var decompressed = LZString.decompressFromUTF16(parsed.data);
              if (typeof decompressed === 'string' && decompressed) {
                var decoded = JSON.parse(decompressed);
                if (decoded && _typeof(decoded) === 'object' && Object.prototype.hasOwnProperty.call(decoded, 'data')) {
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
  var raw = extractSnapshotStoredValue(entry);
  if (raw === undefined) {
    return undefined;
  }
  if (raw === null) {
    return null;
  }
  if (typeof raw === 'string') {
    var trimmed = raw.trim();
    if (!trimmed) {
      return '';
    }
    try {
      return JSON.parse(trimmed);
    } catch (_unused2) {
      return raw;
    }
  }
  return raw;
}
function parseSnapshotStringValue(entry) {
  var raw = extractSnapshotStoredValue(entry);
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
  if (Array.isArray(raw) || raw && _typeof(raw) === 'object') {
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
  var exportStructureKeys = ['devices', 'setups', 'session', 'feedback', 'favorites', 'preferences', 'project', 'projects', 'autoGearRules', 'autoGearBackups', 'autoGearPresets', 'autoGearMonitorDefaults', 'autoGearSeeded', 'autoGearActivePresetId', 'autoGearAutoPresetId', 'autoGearBackupRetention', 'autoGearShowBackups', 'fullBackupHistory', 'fullBackups'];
  var resemblesExportPayload = exportStructureKeys.some(function (key) {
    return Object.prototype.hasOwnProperty.call(snapshot, key);
  });
  if (resemblesExportPayload) {
    return null;
  }
  var data = {};
  var hasAssignments = false;
  var hasSnapshotKeys = false;
  var preferenceKeys = ['darkMode', 'pinkMode', 'highContrast', 'reduceMotion', 'relaxedSpacing', 'showAutoBackups', 'accentColor', 'fontSize', 'fontFamily', 'language', 'iosPwaHelpShown'];
  var simpleSnapshotKeys = new Set([CUSTOM_LOGO_STORAGE_KEY].concat(preferenceKeys));
  var booleanPreferenceKeys = new Set(['darkMode', 'pinkMode', 'highContrast', 'reduceMotion', 'relaxedSpacing', 'showAutoBackups', 'iosPwaHelpShown']);
  var markSnapshotEntry = function markSnapshotEntry(entry) {
    if (!entry || typeof entry.key !== 'string') {
      return;
    }
    if (entry.key.startsWith('cameraPowerPlanner_') || entry.key.startsWith('cinePowerPlanner_') || entry.key.endsWith(STORAGE_BACKUP_SUFFIX) || entry.key.endsWith(STORAGE_MIGRATION_BACKUP_SUFFIX)) {
      hasSnapshotKeys = true;
      return;
    }
    var normalizedKey = entry.key.replace(/(?:__backup|__legacyMigrationBackup)$/, '');
    if (simpleSnapshotKeys.has(normalizedKey)) {
      hasSnapshotKeys = true;
    }
  };
  var assignJSONValue = function assignJSONValue(storageKey, targetKey) {
    var entry = readSnapshotEntry(snapshot, storageKey);
    if (!entry) {
      return;
    }
    markSnapshotEntry(entry);
    var value = parseSnapshotJSONValue(entry);
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
  var schemaEntry = readSnapshotEntry(snapshot, DEVICE_SCHEMA_CACHE_KEY);
  if (schemaEntry) {
    markSnapshotEntry(schemaEntry);
    var cacheValue = parseSnapshotStringValue(schemaEntry);
    if (cacheValue !== undefined) {
      data.schemaCache = cacheValue;
      hasAssignments = true;
    }
  }
  var customFontsEntry = readSnapshotEntry(snapshot, getCustomFontStorageKeyName());
  if (customFontsEntry) {
    markSnapshotEntry(customFontsEntry);
    var fontsValue = parseSnapshotJSONValue(customFontsEntry);
    if (fontsValue !== undefined) {
      data.customFonts = fontsValue;
      hasAssignments = true;
    }
  }
  var customLogoEntry = readSnapshotEntry(snapshot, CUSTOM_LOGO_STORAGE_KEY);
  if (customLogoEntry) {
    markSnapshotEntry(customLogoEntry);
    var logoValue = parseSnapshotStringValue(customLogoEntry);
    if (logoValue !== undefined) {
      data.customLogo = logoValue;
      hasAssignments = true;
    }
  }
  var seedEntry = readSnapshotEntry(snapshot, AUTO_GEAR_SEEDED_STORAGE_KEY);
  if (seedEntry) {
    markSnapshotEntry(seedEntry);
    data.autoGearSeeded = extractSnapshotStoredValue(seedEntry);
    hasAssignments = true;
  }
  var activePresetEntry = readSnapshotEntry(snapshot, AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY);
  if (activePresetEntry) {
    markSnapshotEntry(activePresetEntry);
    data.autoGearActivePresetId = parseSnapshotStringValue(activePresetEntry);
    hasAssignments = true;
  }
  var autoPresetEntry = readSnapshotEntry(snapshot, AUTO_GEAR_AUTO_PRESET_STORAGE_KEY);
  if (autoPresetEntry) {
    markSnapshotEntry(autoPresetEntry);
    data.autoGearAutoPresetId = parseSnapshotStringValue(autoPresetEntry);
    hasAssignments = true;
  }
  var backupsVisibilityEntry = readSnapshotEntry(snapshot, AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY);
  if (backupsVisibilityEntry) {
    markSnapshotEntry(backupsVisibilityEntry);
    data.autoGearShowBackups = extractSnapshotStoredValue(backupsVisibilityEntry);
    hasAssignments = true;
  }
  var preferences = {};
  preferenceKeys.forEach(function (key) {
    var entry = readSnapshotEntry(snapshot, key);
    if (!entry) {
      return;
    }
    markSnapshotEntry(entry);
    var raw = extractSnapshotStoredValue(entry);
    if (booleanPreferenceKeys.has(key)) {
      var normalized = normalizeImportedBoolean(raw);
      if (normalized !== null) {
        preferences[key] = normalized;
        hasAssignments = true;
        return;
      }
    }
    var stringValue = parseSnapshotStringValue(entry);
    if (stringValue !== undefined) {
      preferences[key] = stringValue;
      hasAssignments = true;
    }
  });
  var temperatureUnitEntry = readSnapshotEntry(snapshot, TEMPERATURE_UNIT_STORAGE_KEY_NAME);
  if (temperatureUnitEntry) {
    markSnapshotEntry(temperatureUnitEntry);
    var storedUnit = parseSnapshotStringValue(temperatureUnitEntry);
    if (typeof storedUnit === 'string') {
      var normalizedUnit = storedUnit.trim();
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
function importAllData(allData) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!isPlainObject(allData)) {
    return;
  }
  var _ref19 = options || {},
    _ref19$skipSnapshotCo = _ref19.skipSnapshotConversion,
    skipSnapshotConversion = _ref19$skipSnapshotCo === void 0 ? false : _ref19$skipSnapshotCo;
  if (!skipSnapshotConversion) {
    var converted = convertStorageSnapshotToData(allData);
    if (converted) {
      importAllData(converted, {
        skipSnapshotConversion: true
      });
      return;
    }
  }
  var hasOwn = function hasOwn(key) {
    return Object.prototype.hasOwnProperty.call(allData, key);
  };
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
    var prefs = allData.preferences;
    var booleanPrefs = ['darkMode', 'pinkMode', 'highContrast', 'reduceMotion', 'relaxedSpacing', 'showAutoBackups', 'iosPwaHelpShown'];
    booleanPrefs.forEach(function (key) {
      if (Object.prototype.hasOwnProperty.call(prefs, key) && typeof prefs[key] === 'boolean') {
        safeSetLocalStorage(key, prefs[key]);
      }
    });
    var stringPrefs = ['accentColor', 'fontSize', 'fontFamily', 'language'];
    stringPrefs.forEach(function (key) {
      if (Object.prototype.hasOwnProperty.call(prefs, key)) {
        var value = prefs[key];
        if (typeof value === 'string' && value) {
          safeSetLocalStorage(key, value);
        }
      }
    });
    if (Object.prototype.hasOwnProperty.call(prefs, 'temperatureUnit')) {
      var unit = prefs.temperatureUnit;
      if (typeof unit === 'string') {
        var normalizedUnit = unit.trim();
        if (normalizedUnit) {
          safeSetLocalStorage(TEMPERATURE_UNIT_STORAGE_KEY_NAME, normalizedUnit);
        }
      } else if (unit === null) {
        safeSetLocalStorage(TEMPERATURE_UNIT_STORAGE_KEY_NAME, null);
      }
    }
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'customLogo')) {
    var logo = allData.customLogo;
    if (typeof logo === 'string' && logo) {
      safeSetLocalStorage(CUSTOM_LOGO_STORAGE_KEY, logo);
    } else {
      safeSetLocalStorage(CUSTOM_LOGO_STORAGE_KEY, null);
    }
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'customFonts')) {
    var fonts = normalizeCustomFontEntries(allData.customFonts);
    if (fonts.length) {
      try {
        safeSetLocalStorage(getCustomFontStorageKeyName(), JSON.stringify(fonts));
      } catch (error) {
        console.warn('Unable to store imported custom fonts', error);
      }
    } else {
      safeSetLocalStorage(getCustomFontStorageKeyName(), null);
    }
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'schemaCache')) {
    var cache = allData.schemaCache;
    if (typeof cache === 'string' || cache === null) {
      safeSetLocalStorage(DEVICE_SCHEMA_CACHE_KEY, cache);
    } else if (cache && _typeof(cache) === 'object') {
      try {
        safeSetLocalStorage(DEVICE_SCHEMA_CACHE_KEY, JSON.stringify(cache));
      } catch (schemaError) {
        console.warn('Unable to store imported schema cache', schemaError);
      }
    }
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearRules')) {
    var rules = normalizeImportedAutoGearRules(allData.autoGearRules);
    saveAutoGearRules(rules);
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearBackups')) {
    var backups = normalizeImportedAutoGearBackups(allData.autoGearBackups);
    saveAutoGearBackups(backups);
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearSeeded')) {
    var flag = normalizeImportedBoolean(allData.autoGearSeeded);
    if (flag === null) {
      saveAutoGearSeedFlag(false);
    } else {
      saveAutoGearSeedFlag(flag);
    }
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearPresets')) {
    var presets = normalizeImportedAutoGearPresets(allData.autoGearPresets);
    saveAutoGearPresets(presets);
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearMonitorDefaults')) {
    var defaults = normalizeImportedAutoGearMonitorDefaults(allData.autoGearMonitorDefaults);
    saveAutoGearMonitorDefaults(defaults);
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearActivePresetId')) {
    var presetId = normalizeImportedPresetId(allData.autoGearActivePresetId);
    saveAutoGearActivePresetId(typeof presetId === 'string' ? presetId : '');
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearAutoPresetId')) {
    saveAutoGearAutoPresetId(typeof allData.autoGearAutoPresetId === 'string' ? allData.autoGearAutoPresetId : '');
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearShowBackups')) {
    var visibility = normalizeImportedBoolean(allData.autoGearShowBackups);
    if (visibility === null) {
      saveAutoGearBackupVisibility(false);
    } else {
      saveAutoGearBackupVisibility(visibility);
    }
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearBackupRetention')) {
    var retention = normalizeImportedAutoGearBackupRetention(allData.autoGearBackupRetention);
    if (typeof retention === 'number' && Number.isFinite(retention)) {
      saveAutoGearBackupRetention(retention);
    }
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'fullBackupHistory')) {
    var history = normalizeImportedFullBackupHistory(allData.fullBackupHistory);
    saveFullBackupHistory(history);
  } else if (Object.prototype.hasOwnProperty.call(allData, 'fullBackups')) {
    var _history = normalizeImportedFullBackupHistory(allData.fullBackups);
    saveFullBackupHistory(_history);
  }
  var importProjectEntry = null;
  var ensureProjectImporter = function ensureProjectImporter() {
    if (!importProjectEntry) {
      importProjectEntry = createProjectImporter();
    }
    return importProjectEntry;
  };
  if (allData.project) {
    importProjectCollection(allData.project, ensureProjectImporter);
  } else if (allData.projects) {
    importProjectCollection(allData.projects, ensureProjectImporter);
  } else if (typeof allData.gearList === "string") {
    ensureProjectImporter()("", {
      gearList: allData.gearList
    });
  }
}
var STORAGE_API = {
  getSafeLocalStorage: getSafeLocalStorage,
  loadDeviceData: loadDeviceData,
  saveDeviceData: saveDeviceData,
  loadSetups: loadSetups,
  saveSetups: saveSetups,
  saveSetup: saveSetup,
  loadSetup: loadSetup,
  deleteSetup: deleteSetup,
  renameSetup: renameSetup,
  loadProject: loadProject,
  saveProject: saveProject,
  deleteProject: deleteProject,
  loadSessionState: loadSessionState,
  saveSessionState: saveSessionState,
  loadFavorites: loadFavorites,
  saveFavorites: saveFavorites,
  loadAutoGearBackups: loadAutoGearBackups,
  saveAutoGearBackups: saveAutoGearBackups,
  loadFeedback: loadFeedback,
  saveFeedback: saveFeedback,
  clearAllData: clearAllData,
  exportAllData: exportAllData,
  importAllData: importAllData,
  loadAutoGearRules: loadAutoGearRules,
  saveAutoGearRules: saveAutoGearRules,
  loadAutoGearSeedFlag: loadAutoGearSeedFlag,
  saveAutoGearSeedFlag: saveAutoGearSeedFlag,
  loadAutoGearPresets: loadAutoGearPresets,
  saveAutoGearPresets: saveAutoGearPresets,
  loadAutoGearMonitorDefaults: loadAutoGearMonitorDefaults,
  saveAutoGearMonitorDefaults: saveAutoGearMonitorDefaults,
  loadAutoGearActivePresetId: loadAutoGearActivePresetId,
  saveAutoGearActivePresetId: saveAutoGearActivePresetId,
  loadAutoGearAutoPresetId: loadAutoGearAutoPresetId,
  saveAutoGearAutoPresetId: saveAutoGearAutoPresetId,
  loadAutoGearBackupVisibility: loadAutoGearBackupVisibility,
  saveAutoGearBackupVisibility: saveAutoGearBackupVisibility,
  loadAutoGearBackupRetention: loadAutoGearBackupRetention,
  saveAutoGearBackupRetention: saveAutoGearBackupRetention,
  getAutoGearBackupRetentionDefault: getAutoGearBackupRetentionDefault,
  loadFullBackupHistory: loadFullBackupHistory,
  saveFullBackupHistory: saveFullBackupHistory,
  recordFullBackupHistoryEntry: recordFullBackupHistoryEntry,
  requestPersistentStorage: requestPersistentStorage,
  clearUiCacheStorageEntries: clearUiCacheStorageEntries
};
if (typeof module !== "undefined" && module.exports) {
  module.exports = STORAGE_API;
}
if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
  Object.keys(STORAGE_API).forEach(function (key) {
    var value = STORAGE_API[key];
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
          value: value
        });
      } catch (definitionError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn("Unable to expose storage helper ".concat(key, " globally."), definitionError);
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
    Object.defineProperty(GLOBAL_SCOPE, '__cineStorageApi', { configurable: true, writable: true, value: STORAGE_API });
  } catch (storageApiExposeError) {
    GLOBAL_SCOPE.__cineStorageApi = STORAGE_API;
    void storageApiExposeError;
  }
}
}
