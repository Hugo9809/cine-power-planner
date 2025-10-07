function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
  var GLOBAL_SCOPE = detectGlobalScope();
  function resolveModuleBase(scope) {
    if ((typeof cineModuleBase === "undefined" ? "undefined" : _typeof(cineModuleBase)) === 'object' && cineModuleBase) {
      return cineModuleBase;
    }
    if (typeof require === 'function') {
      try {
        var required = require('../base.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    if (scope && _typeof(scope.cineModuleBase) === 'object') {
      return scope.cineModuleBase;
    }
    return null;
  }
  var MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }
  var freezeDeep = typeof MODULE_BASE.freezeDeep === 'function' ? MODULE_BASE.freezeDeep : function fallbackFreezeDeep(value) {
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
      return value;
    }
    var seen = new WeakSet();
    function freeze(target) {
      if (!target || _typeof(target) !== 'object' && typeof target !== 'function') {
        return target;
      }
      if (seen.has(target)) {
        return target;
      }
      seen.add(target);
      try {
        var keys = Object.getOwnPropertyNames(target);
        for (var index = 0; index < keys.length; index += 1) {
          var key = keys[index];
          var descriptor = Object.getOwnPropertyDescriptor(target, key);
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
  var exposeGlobal = typeof MODULE_BASE.exposeGlobal === 'function' ? function expose(name, value, options) {
    return MODULE_BASE.exposeGlobal(name, value, GLOBAL_SCOPE, options || {});
  } : function fallbackExpose(name, value) {
    try {
      GLOBAL_SCOPE[name] = value;
      return true;
    } catch (error) {
      void error;
      return false;
    }
  };
  var moduleRegistry = typeof MODULE_BASE.getModuleRegistry === 'function' ? MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE) : null;
  var registerOrQueueModule = typeof MODULE_BASE.registerOrQueueModule === 'function' ? function register(name, api, options, onError) {
    return MODULE_BASE.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, moduleRegistry);
  } : function fallbackRegister() {
    return false;
  };
  var SESSION_AUTO_BACKUP_NAME_PREFIX = 'auto-backup-';
  var SESSION_AUTO_BACKUP_DELETION_PREFIX = 'auto-backup-before-delete-';
  var BACKUP_STORAGE_KEY_PREFIXES = ['cameraPowerPlanner_', 'cinePowerPlanner_'];
  var BACKUP_STORAGE_KNOWN_KEYS = new Set(['darkMode', 'pinkMode', 'highContrast', 'showAutoBackups', 'accentColor', 'fontSize', 'fontFamily', 'customLogo', 'language']);
  if (typeof IOS_PWA_HELP_STORAGE_KEY === 'string' && IOS_PWA_HELP_STORAGE_KEY) {
    BACKUP_STORAGE_KNOWN_KEYS.add(IOS_PWA_HELP_STORAGE_KEY);
  } else if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.IOS_PWA_HELP_STORAGE_KEY === 'string' && GLOBAL_SCOPE.IOS_PWA_HELP_STORAGE_KEY) {
    BACKUP_STORAGE_KNOWN_KEYS.add(GLOBAL_SCOPE.IOS_PWA_HELP_STORAGE_KEY);
  } else {
    BACKUP_STORAGE_KNOWN_KEYS.add('iosPwaHelpShown');
  }
  var BACKUP_METADATA_BASE_KEYS = new Set(['settings', 'storage', 'localStorage', 'values', 'entries', 'sessionStorage', 'sessionState', 'sessionEntries', 'payload', 'plannerData', 'allData', 'generatedAt', 'version', 'appVersion', 'applicationVersion']);
  var BACKUP_DATA_KEYS = ['devices', 'setups', 'session', 'feedback', 'project', 'projects', 'gearList', 'favorites', 'autoGearRules', 'autoGearSeeded', 'autoGearBackups', 'autoGearPresets', 'autoGearMonitorDefaults', 'autoGearActivePresetId', 'autoGearAutoPresetId', 'autoGearShowBackups', 'autoGearBackupRetention', 'customLogo', 'customFonts', 'preferences', 'schemaCache', 'fullBackupHistory', 'fullBackups'];
  var BACKUP_DATA_COMPLEX_KEYS = new Set(['devices', 'setups', 'session', 'sessions', 'feedback', 'project', 'projects', 'gearList', 'favorites', 'autoGearRules', 'autoGearBackups', 'autoGearPresets', 'autoGearMonitorDefaults', 'preferences', 'fullBackupHistory', 'fullBackups', 'customFonts']);
  function isPlainObject(value) {
    return value !== null && _typeof(value) === 'object' && !Array.isArray(value);
  }
  function formatFullBackupFilename(date) {
    var safeDate = date instanceof Date && !Number.isNaN(date.valueOf()) ? date : new Date();
    var pad = function pad(value) {
      return String(value).padStart(2, '0');
    };
    var year = safeDate.getFullYear();
    var month = pad(safeDate.getMonth() + 1);
    var day = pad(safeDate.getDate());
    var hours = pad(safeDate.getHours());
    var minutes = pad(safeDate.getMinutes());
    var seconds = pad(safeDate.getSeconds());
    var offsetMinutes = safeDate.getTimezoneOffset();
    var offsetSuffix = 'Z';
    if (offsetMinutes !== 0) {
      var sign = offsetMinutes > 0 ? '-' : '+';
      var abs = Math.abs(offsetMinutes);
      var offsetHours = pad(Math.floor(abs / 60));
      var offsetMins = pad(abs % 60);
      offsetSuffix = "".concat(sign).concat(offsetHours, ":").concat(offsetMins);
    }
    var iso = "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hours, ":").concat(minutes, ":").concat(seconds).concat(offsetSuffix);
    var safeIso = iso.replace(/[:]/g, '-');
    return {
      iso: iso,
      fileName: "".concat(safeIso, " full app backup.json")
    };
  }
  function resolveSafeLocalStorage() {
    if (typeof getSafeLocalStorage === 'function') {
      try {
        var storage = getSafeLocalStorage();
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
    var snapshot = Object.create(null);
    if (!storage) return snapshot;
    var assignEntry = function assignEntry(key, valueOrGetter) {
      if (typeof key !== 'string' || !key) {
        return;
      }
      try {
        var value = typeof valueOrGetter === 'function' ? valueOrGetter() : valueOrGetter;
        snapshot[key] = value;
      } catch (error) {
        console.warn('Failed to read storage entry for backup', key, error);
      }
    };
    var tryEnumerateByIndex = function tryEnumerateByIndex() {
      if (typeof storage.key !== 'function' || typeof storage.length !== 'number') {
        return false;
      }
      var length = 0;
      try {
        length = Number(storage.length) || 0;
      } catch (lengthError) {
        console.warn('Failed to inspect storage length for backup snapshot', lengthError);
        return true;
      }
      var _loop = function _loop() {
        var key;
        try {
          key = storage.key(i);
        } catch (keyError) {
          console.warn('Failed to access storage key for backup snapshot', keyError);
          return 1;
        }
        assignEntry(key, function () {
          return storage.getItem(key);
        });
      };
      for (var i = 0; i < length; i += 1) {
        if (_loop()) continue;
      }
      return true;
    };
    var tryEnumerateByKeys = function tryEnumerateByKeys() {
      if (typeof storage.keys !== 'function') {
        return false;
      }
      var keys;
      try {
        keys = storage.keys();
      } catch (keysError) {
        console.warn('Failed to enumerate storage keys for backup snapshot', keysError);
        return true;
      }
      if (!keys) {
        return true;
      }
      var iterate = function iterate(list) {
        if (!list) return;
        if (typeof list.forEach === 'function') {
          list.forEach(function (key) {
            return assignEntry(key, function () {
              return storage.getItem(key);
            });
          });
        } else if (typeof list[Symbol.iterator] === 'function') {
          var _iterator = _createForOfIteratorHelper(list),
            _step;
          try {
            var _loop2 = function _loop2() {
              var key = _step.value;
              assignEntry(key, function () {
                return storage.getItem(key);
              });
            };
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              _loop2();
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      };
      iterate(keys);
      return true;
    };
    var tryEnumerateByForEach = function tryEnumerateByForEach() {
      if (typeof storage.forEach !== 'function') {
        return false;
      }
      try {
        storage.forEach(function (value, key) {
          assignEntry(key, value);
        });
      } catch (error) {
        console.warn('Failed to iterate storage for backup snapshot', error);
      }
      return true;
    };
    var enumerated = false;
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
      return function () {
        return null;
      };
    }
    var message = typeof errorMessagePrefix === 'string' && errorMessagePrefix ? errorMessagePrefix : 'Failed to read storage key';
    return function (key) {
      if (typeof key !== 'string') {
        return null;
      }
      try {
        return storage.getItem(key);
      } catch (error) {
        console.warn("".concat(message), key, error);
        return null;
      }
    };
  }
  function restoreSessionStorageSnapshot(snapshot) {
    if (typeof sessionStorage === 'undefined' || !sessionStorage) {
      return;
    }
    var entries = snapshot && _typeof(snapshot) === 'object' ? Object.entries(snapshot) : [];
    var retainedKeys = new Set(entries.map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        key = _ref2[0];
      return key;
    }));
    var keysToRemove = [];
    try {
      var _sessionStorage = sessionStorage,
        length = _sessionStorage.length;
      for (var i = 0; i < length; i += 1) {
        var key = sessionStorage.key(i);
        if (typeof key !== 'string') continue;
        if (!retainedKeys.has(key)) {
          keysToRemove.push(key);
        }
      }
    } catch (error) {
      console.warn('Failed to inspect sessionStorage during restore rollback', error);
    }
    keysToRemove.forEach(function (key) {
      try {
        sessionStorage.removeItem(key);
      } catch (removeError) {
        console.warn('Failed to remove sessionStorage key during restore rollback', key, removeError);
      }
    });
    entries.forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];
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
    if (_typeof(value) === 'object') {
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
    var source = section;
    if (typeof source === 'string') {
      var parsed = null;
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
    var snapshot = Object.create(null);
    var assignEntry = function assignEntry(key, value) {
      if (typeof key !== 'string' || !key) return;
      snapshot[key] = normalizeStoredValue(value);
    };
    if (Array.isArray(source)) {
      source.forEach(function (entry) {
        if (!entry) return;
        if (Array.isArray(entry)) {
          assignEntry(entry[0], entry[1]);
          return;
        }
        if (_typeof(entry) === 'object') {
          if (typeof entry.key === 'string') {
            var _ref5, _ref6, _ref7, _entry$value;
            assignEntry(entry.key, (_ref5 = (_ref6 = (_ref7 = (_entry$value = entry.value) !== null && _entry$value !== void 0 ? _entry$value : entry.val) !== null && _ref7 !== void 0 ? _ref7 : entry.data) !== null && _ref6 !== void 0 ? _ref6 : entry.content) !== null && _ref5 !== void 0 ? _ref5 : entry.string);
            return;
          }
          if (typeof entry.name === 'string') {
            var _ref8, _ref9, _ref0, _entry$value2;
            assignEntry(entry.name, (_ref8 = (_ref9 = (_ref0 = (_entry$value2 = entry.value) !== null && _entry$value2 !== void 0 ? _entry$value2 : entry.val) !== null && _ref0 !== void 0 ? _ref0 : entry.data) !== null && _ref9 !== void 0 ? _ref9 : entry.content) !== null && _ref8 !== void 0 ? _ref8 : entry.string);
            return;
          }
          if (Array.isArray(entry.entry)) {
            assignEntry(entry.entry[0], entry.entry[1]);
          }
        }
      });
    } else if (isPlainObject(source)) {
      Object.entries(source).forEach(function (_ref1) {
        var _ref10 = _slicedToArray(_ref1, 2),
          key = _ref10[0],
          value = _ref10[1];
        assignEntry(key, value);
      });
    } else {
      return null;
    }
    return Object.keys(snapshot).length ? snapshot : null;
  }
  function extractFirstMatchingSnapshot(source, keys) {
    if (!isPlainObject(source)) return {
      snapshot: null,
      keyUsed: null
    };
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      if (!Object.prototype.hasOwnProperty.call(source, key)) continue;
      var snapshot = convertEntriesToSnapshot(source[key]);
      if (snapshot) {
        return {
          snapshot: snapshot,
          keyUsed: key
        };
      }
    }
    return {
      snapshot: null,
      keyUsed: null
    };
  }
  function looksLikeStoredSettingKey(key) {
    if (BACKUP_STORAGE_KNOWN_KEYS.has(key)) {
      return true;
    }
    return BACKUP_STORAGE_KEY_PREFIXES.some(function (prefix) {
      return key.startsWith(prefix);
    });
  }
  function restoreLocalStorageSnapshot(storage, snapshot) {
    if (!storage || typeof storage.setItem !== 'function') {
      return;
    }
    var entries = snapshot && _typeof(snapshot) === 'object' ? Object.entries(snapshot) : [];
    var targetKeys = new Set(entries.map(function (_ref11) {
      var _ref12 = _slicedToArray(_ref11, 1),
        key = _ref12[0];
      return key;
    }));
    var keysToRemove = [];
    try {
      var length = storage.length;
      for (var i = 0; i < length; i += 1) {
        var key = storage.key(i);
        if (typeof key !== 'string') continue;
        if (!targetKeys.has(key) && looksLikeStoredSettingKey(key)) {
          keysToRemove.push(key);
        }
      }
    } catch (error) {
      console.warn('Failed to inspect storage during restore rollback', error);
    }
    keysToRemove.forEach(function (key) {
      try {
        storage.removeItem(key);
      } catch (removeError) {
        console.warn('Failed to remove storage key during restore rollback', key, removeError);
      }
    });
    entries.forEach(function (_ref13) {
      var _ref14 = _slicedToArray(_ref13, 2),
        key = _ref14[0],
        value = _ref14[1];
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
    var snapshot = Object.create(null);
    Object.entries(source).forEach(function (_ref15) {
      var _ref16 = _slicedToArray(_ref15, 2),
        key = _ref16[0],
        value = _ref16[1];
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
    var snapshot = Object.create(null);
    var assignEntry = function assignEntry(key, value) {
      if (typeof key !== 'string' || !key) return;
      if (Object.prototype.hasOwnProperty.call(snapshot, key)) return;
      snapshot[key] = value;
    };
    var keyCandidateKeys = ['key', 'name', 'section', 'type'];
    var valueCandidateKeys = ['value', 'data', 'content', 'payload', 'entries', 'items', 'record', 'snapshot', 'state', 'values', 'settings', 'sectionData', 'body'];
    entries.forEach(function (entry) {
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
      var keyCandidate = keyCandidateKeys.find(function (candidate) {
        var value = entry[candidate];
        return typeof value === 'string' && value;
      });
      if (!keyCandidate) {
        return;
      }
      var value = undefined;
      for (var i = 0; i < valueCandidateKeys.length; i += 1) {
        var candidate = valueCandidateKeys[i];
        if (Object.prototype.hasOwnProperty.call(entry, candidate)) {
          value = entry[candidate];
          break;
        }
      }
      if (value === undefined) {
        var _ref17, _ref18, _ref19, _ref20, _ref21, _ref22, _ref23, _ref24, _entry$value3;
        value = (_ref17 = (_ref18 = (_ref19 = (_ref20 = (_ref21 = (_ref22 = (_ref23 = (_ref24 = (_entry$value3 = entry.value) !== null && _entry$value3 !== void 0 ? _entry$value3 : entry.data) !== null && _ref24 !== void 0 ? _ref24 : entry.content) !== null && _ref23 !== void 0 ? _ref23 : entry.payload) !== null && _ref22 !== void 0 ? _ref22 : entry.entries) !== null && _ref21 !== void 0 ? _ref21 : entry.items) !== null && _ref20 !== void 0 ? _ref20 : entry.snapshot) !== null && _ref19 !== void 0 ? _ref19 : entry.state) !== null && _ref18 !== void 0 ? _ref18 : entry.values) !== null && _ref17 !== void 0 ? _ref17 : entry.settings;
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
      var converted = convertLegacyDataEntriesToObject(section);
      if (converted) {
        return converted;
      }
    }
    if (typeof section === 'string') {
      var parsed = parseBackupDataString(section);
      if (parsed) {
        return parsed;
      }
    }
    if (section && _typeof(section) === 'object') {
      if (typeof section.toJSON === 'function') {
        try {
          var toJsonValue = section.toJSON();
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
      var normalized = normalizeBackupDataSection(value);
      if (normalized) {
        return normalized;
      }
    }
    return value;
  }
  function mergeBackupDataSections(base, additions) {
    if (!isPlainObject(additions) || !Object.keys(additions).length) {
      return base ? _objectSpread({}, base) : null;
    }
    var target = base ? _objectSpread({}, base) : {};
    Object.entries(additions).forEach(function (_ref25) {
      var _ref26 = _slicedToArray(_ref25, 2),
        key = _ref26[0],
        value = _ref26[1];
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
    var decodeBinaryPayload = function decodeBinaryPayload(value) {
      if (_typeof(value) !== 'object' || value === null) {
        return null;
      }
      var isNodeBuffer = typeof Buffer !== 'undefined' && typeof Buffer.isBuffer === 'function' && Buffer.isBuffer(value);
      var objectTag = Object.prototype.toString.call(value);
      var isArrayBuffer = typeof ArrayBuffer !== 'undefined' && (value instanceof ArrayBuffer || objectTag === '[object ArrayBuffer]' || objectTag === '[object SharedArrayBuffer]');
      var isArrayBufferView = function () {
        if (typeof ArrayBuffer === 'undefined') {
          return false;
        }
        if (typeof ArrayBuffer.isView === 'function' && ArrayBuffer.isView(value)) {
          return true;
        }
        return Boolean(value && _typeof(value) === 'object' && _typeof(value.buffer) === 'object' && typeof value.byteLength === 'number' && typeof value.BYTES_PER_ELEMENT === 'number');
      }();
      if (!isNodeBuffer && !isArrayBuffer && !isArrayBufferView) {
        return null;
      }
      var toUint8Array = function toUint8Array() {
        if (isNodeBuffer) {
          return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
        }
        if (isArrayBuffer) {
          return new Uint8Array(value);
        }
        if (_typeof(value.buffer) === 'object' && typeof value.byteLength === 'number') {
          var offset = typeof value.byteOffset === 'number' ? value.byteOffset : 0;
          return new Uint8Array(value.buffer, offset, value.byteLength);
        }
        throw new TypeError('Unsupported binary payload type');
      };
      var decodeWithTextDecoder = function decodeWithTextDecoder(array) {
        if (typeof TextDecoder !== 'function') {
          return null;
        }
        try {
          var decoder = new TextDecoder('utf-8', {
            fatal: false
          });
          return decoder.decode(array);
        } catch (error) {
          console.warn('Failed to decode backup payload with TextDecoder', error);
          return null;
        }
      };
      var decodeWithBuffer = function decodeWithBuffer() {
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
      var decodeManually = function decodeManually(array) {
        try {
          var result = '';
          var CHUNK_SIZE = 0x8000;
          for (var index = 0; index < array.length; index += CHUNK_SIZE) {
            var slice = array.subarray(index, index + CHUNK_SIZE);
            result += String.fromCharCode.apply(null, slice);
          }
          return result;
        } catch (error) {
          console.warn('Failed to manually decode backup payload', error);
          return null;
        }
      };
      var array = toUint8Array();
      return decodeWithTextDecoder(array) || decodeWithBuffer() || decodeManually(array);
    };
    var text;
    if (typeof raw === 'string') {
      text = raw;
    } else {
      var decoded = decodeBinaryPayload(raw);
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
    if (!text.includes("\0")) {
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
    var sanitized = sanitizeBackupPayload(raw);
    if (!sanitized) {
      return null;
    }
    var trimmed = sanitized.trim();
    if (!trimmed) {
      return null;
    }
    try {
      var parsed = JSON.parse(trimmed);
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
    var parsed = isPlainObject(raw) ? raw : {};
    var versionValue = typeof parsed.version === 'string' ? parsed.version : typeof parsed.appVersion === 'string' ? parsed.appVersion : typeof parsed.applicationVersion === 'string' ? parsed.applicationVersion : undefined;
    var settingsResult = extractFirstMatchingSnapshot(parsed, ['settings', 'localStorage', 'storage', 'storedSettings', 'values', 'entries']);
    var sessionResult = extractFirstMatchingSnapshot(parsed, ['sessionStorage', 'session', 'sessions', 'sessionState', 'sessionEntries']);
    var metadataKeys = new Set(BACKUP_METADATA_BASE_KEYS);
    if (settingsResult.keyUsed) metadataKeys.add(settingsResult.keyUsed);
    if (sessionResult.keyUsed) metadataKeys.add(sessionResult.keyUsed);
    var settingsSnapshot = settingsResult.snapshot || buildLegacyStorageFromRoot(parsed, metadataKeys);
    var sessionSnapshot = sessionResult.snapshot;
    var dataSection = null;
    var dataKeys = ['data', 'payload', 'plannerData', 'allData'];
    for (var index = 0; index < dataKeys.length; index += 1) {
      var key = dataKeys[index];
      if (!Object.prototype.hasOwnProperty.call(parsed, key)) continue;
      var normalized = normalizeBackupDataSection(parsed[key]);
      if (normalized) {
        dataSection = mergeBackupDataSections(dataSection, normalized);
      }
    }
    var fallback = {};
    BACKUP_DATA_KEYS.forEach(function (key) {
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
      data: isPlainObject(dataSection) ? dataSection : null
    };
  }
  function triggerBackupDownload(url, fileName) {
    if (typeof document === 'undefined') {
      return false;
    }
    var anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.rel = 'noopener';
    anchor.target = '_blank';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    var success = false;
    try {
      anchor.click();
      success = true;
    } catch (error) {
      console.warn('Failed to trigger backup download', error);
      success = false;
    }
    setTimeout(function () {
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
      return "data:application/json;charset=utf-8,".concat(encodeURIComponent(payload));
    } catch (error) {
      console.warn('Failed to encode backup payload as data URL', error);
      return null;
    }
  }
  function openBackupFallbackWindow(payload, fileName) {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return false;
    }
    var backupWindow = null;
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
      var doc = backupWindow.document;
      if (!doc) {
        return false;
      }
      var langAttr = document && document.documentElement && document.documentElement.getAttribute ? document.documentElement.getAttribute('lang') : 'en';
      doc.open();
      doc.write("<!DOCTYPE html><html lang=\"".concat(langAttr || 'en', "\"><head><meta charset=\"utf-8\"><title>Manual download</title></head><body></body></html>"));
      doc.close();
      try {
        doc.title = fileName || 'backup.json';
      } catch (titleError) {
        void titleError;
      }
      var body = doc.body;
      if (!body) {
        return false;
      }
      body.style.margin = '0';
      body.style.padding = '1.5rem';
      body.style.background = '#f8f9fb';
      body.style.color = '#0f172a';
      body.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      var container = doc.createElement('div');
      container.style.maxWidth = '960px';
      container.style.margin = '0 auto';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '1rem';
      var heading = doc.createElement('h1');
      heading.textContent = fileName || 'Manual backup';
      heading.style.margin = '0';
      heading.style.fontSize = '1.5rem';
      heading.style.fontWeight = '600';
      var description = doc.createElement('p');
      if (typeof getManualDownloadFallbackMessage === 'function') {
        description.textContent = getManualDownloadFallbackMessage();
      } else {
        description.textContent = 'Copy the text below and save it to a file ending with .json to keep your data safe.';
      }
      description.style.margin = '0';
      description.style.lineHeight = '1.5';
      var helper = doc.createElement('p');
      if (typeof getManualDownloadCopyHint === 'function') {
        helper.textContent = getManualDownloadCopyHint();
      } else {
        helper.textContent = 'Select the text, copy it and paste into your preferred notes app or text editor.';
      }
      helper.style.margin = '0';
      helper.style.lineHeight = '1.5';
      var textArea = doc.createElement('textarea');
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
    var failureResult = {
      success: false,
      method: null
    };
    if (typeof payload !== 'string') {
      return failureResult;
    }
    var blob = null;
    if (typeof Blob !== 'undefined') {
      try {
        blob = new Blob([payload], {
          type: 'application/json'
        });
      } catch (blobError) {
        console.warn('Failed to create backup blob', blobError);
        blob = null;
      }
    }
    if (blob) {
      if (typeof navigator !== 'undefined' && typeof navigator.msSaveOrOpenBlob === 'function') {
        try {
          var msSaveResult = navigator.msSaveOrOpenBlob(blob, fileName);
          if (msSaveResult === false) {
            console.warn('Saving backup via msSaveOrOpenBlob was cancelled or declined');
          } else {
            return {
              success: true,
              method: 'ms-save'
            };
          }
        } catch (msError) {
          console.warn('Failed to save backup via msSaveOrOpenBlob', msError);
        }
      }
      if (typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') {
        var objectUrl = null;
        try {
          objectUrl = URL.createObjectURL(blob);
        } catch (urlError) {
          console.warn('Failed to create object URL for backup blob', urlError);
          objectUrl = null;
        }
        if (objectUrl) {
          var triggered = triggerBackupDownload(objectUrl, fileName);
          if (typeof URL.revokeObjectURL === 'function') {
            setTimeout(function () {
              try {
                URL.revokeObjectURL(objectUrl);
              } catch (revokeError) {
                void revokeError;
              }
            }, 0);
          }
          if (triggered) {
            return {
              success: true,
              method: 'blob-url'
            };
          }
        }
      }
    }
    var encoded = encodeBackupDataUrl(payload);
    if (encoded) {
      var _triggered = triggerBackupDownload(encoded, fileName);
      if (_triggered) {
        return {
          success: true,
          method: 'data-url'
        };
      }
    }
    var opened = openBackupFallbackWindow(payload, fileName);
    if (opened) {
      return {
        success: true,
        method: 'manual'
      };
    }
    return failureResult;
  }
  function isAutoBackupName(name) {
    return typeof name === 'string' && (name.startsWith(SESSION_AUTO_BACKUP_NAME_PREFIX) || name.startsWith(SESSION_AUTO_BACKUP_DELETION_PREFIX));
  }
  function parseAutoBackupName(name) {
    if (typeof name !== 'string') {
      return null;
    }
    var config = function () {
      if (name.startsWith(SESSION_AUTO_BACKUP_DELETION_PREFIX)) {
        return {
          prefixLength: SESSION_AUTO_BACKUP_DELETION_PREFIX.length,
          type: 'auto-backup-before-delete',
          secondsOptional: true
        };
      }
      if (name.startsWith(SESSION_AUTO_BACKUP_NAME_PREFIX)) {
        return {
          prefixLength: SESSION_AUTO_BACKUP_NAME_PREFIX.length,
          type: 'auto-backup',
          secondsOptional: true
        };
      }
      return null;
    }();
    if (!config) {
      return null;
    }
    var remainder = name.slice(config.prefixLength);
    var parts = remainder.split('-');
    if (parts.length < 5) {
      return null;
    }
    var baseParts = [];
    for (var index = 0; index < 5; index += 1) {
      baseParts.push(Number(parts[index]));
    }
    for (var i = 0; i < baseParts.length; i += 1) {
      if (Number.isNaN(baseParts[i])) {
        return null;
      }
    }
    var year = baseParts[0];
    var month = baseParts[1];
    var day = baseParts[2];
    var hour = baseParts[3];
    var minute = baseParts[4];
    var includeSeconds = false;
    var seconds = 0;
    var labelStartIndex = 5;
    if (parts.length > labelStartIndex) {
      var secondsCandidate = parts[labelStartIndex];
      if (/^\d{1,2}$/u.test(secondsCandidate)) {
        includeSeconds = true;
        seconds = Number(secondsCandidate);
        labelStartIndex += 1;
      } else if (!config.secondsOptional) {
        return null;
      }
    } else if (!config.secondsOptional) {
      return null;
    }
    var labelParts = parts.slice(labelStartIndex);
    var label = labelParts.join('-').trim();
    var date = _construct(Date, [year, month - 1, day, hour, minute, includeSeconds ? seconds : 0, 0]);
    return {
      type: config.type,
      date: Number.isNaN(date.valueOf()) ? null : date,
      label: label,
      includeSeconds: includeSeconds
    };
  }
  var backupAPI = freezeDeep({
    formatFullBackupFilename: formatFullBackupFilename,
    resolveSafeLocalStorage: resolveSafeLocalStorage,
    captureStorageSnapshot: captureStorageSnapshot,
    createSafeStorageReader: createSafeStorageReader,
    restoreSessionStorageSnapshot: restoreSessionStorageSnapshot,
    restoreLocalStorageSnapshot: restoreLocalStorageSnapshot,
    sanitizeBackupPayload: sanitizeBackupPayload,
    parseBackupDataString: parseBackupDataString,
    normalizeBackupDataSection: normalizeBackupDataSection,
    normalizeBackupDataValue: normalizeBackupDataValue,
    mergeBackupDataSections: mergeBackupDataSections,
    extractBackupSections: extractBackupSections,
    triggerBackupDownload: triggerBackupDownload,
    encodeBackupDataUrl: encodeBackupDataUrl,
    openBackupFallbackWindow: openBackupFallbackWindow,
    downloadBackupPayload: downloadBackupPayload,
    isAutoBackupName: isAutoBackupName,
    parseAutoBackupName: parseAutoBackupName,
    isPlainObject: isPlainObject,
    constants: freezeDeep({
      SESSION_AUTO_BACKUP_NAME_PREFIX: SESSION_AUTO_BACKUP_NAME_PREFIX,
      SESSION_AUTO_BACKUP_DELETION_PREFIX: SESSION_AUTO_BACKUP_DELETION_PREFIX,
      BACKUP_STORAGE_KEY_PREFIXES: BACKUP_STORAGE_KEY_PREFIXES.slice(),
      BACKUP_STORAGE_KNOWN_KEYS: Array.from(BACKUP_STORAGE_KNOWN_KEYS),
      BACKUP_METADATA_BASE_KEYS: Array.from(BACKUP_METADATA_BASE_KEYS),
      BACKUP_DATA_KEYS: BACKUP_DATA_KEYS.slice(),
      BACKUP_DATA_COMPLEX_KEYS: Array.from(BACKUP_DATA_COMPLEX_KEYS)
    })
  });
  registerOrQueueModule('cineFeatureBackup', backupAPI, {
    category: 'feature',
    description: 'Backup and restore helpers for snapshots, payload normalization, downloads and diff metadata.',
    replace: true,
    connections: ['cineModuleBase', 'cineModuleContext', 'cinePersistence']
  }, function (error) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('Unable to register cineFeatureBackup module.', error);
    }
  });
  var globalExports = [['cineFeatureBackup', backupAPI], ['formatFullBackupFilename', formatFullBackupFilename], ['resolveSafeLocalStorage', resolveSafeLocalStorage], ['captureStorageSnapshot', captureStorageSnapshot], ['createSafeStorageReader', createSafeStorageReader], ['restoreSessionStorageSnapshot', restoreSessionStorageSnapshot], ['restoreLocalStorageSnapshot', restoreLocalStorageSnapshot], ['sanitizeBackupPayload', sanitizeBackupPayload], ['parseBackupDataString', parseBackupDataString], ['normalizeBackupDataSection', normalizeBackupDataSection], ['normalizeBackupDataValue', normalizeBackupDataValue], ['mergeBackupDataSections', mergeBackupDataSections], ['extractBackupSections', extractBackupSections], ['triggerBackupDownload', triggerBackupDownload], ['encodeBackupDataUrl', encodeBackupDataUrl], ['openBackupFallbackWindow', openBackupFallbackWindow], ['downloadBackupPayload', downloadBackupPayload], ['isAutoBackupName', isAutoBackupName], ['parseAutoBackupName', parseAutoBackupName], ['SESSION_AUTO_BACKUP_NAME_PREFIX', SESSION_AUTO_BACKUP_NAME_PREFIX], ['SESSION_AUTO_BACKUP_DELETION_PREFIX', SESSION_AUTO_BACKUP_DELETION_PREFIX]];
  globalExports.forEach(function (_ref27) {
    var _ref28 = _slicedToArray(_ref27, 2),
      name = _ref28[0],
      value = _ref28[1];
    exposeGlobal(name, value, {
      configurable: true,
      writable: true
    });
  });
})();