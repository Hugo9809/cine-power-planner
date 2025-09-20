function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var GLOBAL_SCOPE = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : null;
var DEVICE_STORAGE_KEY = 'cameraPowerPlanner_devices';
var SETUP_STORAGE_KEY = 'cameraPowerPlanner_setups';
var SESSION_STATE_KEY = 'cameraPowerPlanner_session';
var FEEDBACK_STORAGE_KEY = 'cameraPowerPlanner_feedback';
var PROJECT_STORAGE_KEY = 'cameraPowerPlanner_project';
var FAVORITES_STORAGE_KEY = 'cameraPowerPlanner_favorites';
var DEVICE_SCHEMA_CACHE_KEY = 'cameraPowerPlanner_schemaCache';
var CUSTOM_FONT_STORAGE_KEY_DEFAULT = 'cameraPowerPlanner_customFonts';
function ensureCustomFontStorageKeyName() {
  if (!GLOBAL_SCOPE) {
    return CUSTOM_FONT_STORAGE_KEY_DEFAULT;
  }
  var existingName = typeof GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY_NAME === 'string' ? GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY_NAME : typeof GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY === 'string' ? GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY : CUSTOM_FONT_STORAGE_KEY_DEFAULT;
  if (GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY !== existingName) {
    GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY = existingName;
  }
  if (GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY_NAME !== existingName) {
    GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY_NAME = existingName;
  }
  return existingName;
}
function getCustomFontStorageKeyName() {
  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY_NAME === 'string') {
    return GLOBAL_SCOPE.CUSTOM_FONT_STORAGE_KEY_NAME;
  }
  return ensureCustomFontStorageKeyName();
}
ensureCustomFontStorageKeyName();
var CUSTOM_LOGO_STORAGE_KEY = 'customLogo';
var AUTO_GEAR_RULES_STORAGE_KEY = 'cameraPowerPlanner_autoGearRules';
var AUTO_GEAR_SEEDED_STORAGE_KEY = 'cameraPowerPlanner_autoGearSeeded';
var AUTO_GEAR_BACKUPS_STORAGE_KEY = 'cameraPowerPlanner_autoGearBackups';
var AUTO_GEAR_PRESETS_STORAGE_KEY = 'cameraPowerPlanner_autoGearPresets';
var AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY = 'cameraPowerPlanner_autoGearActivePreset';
var AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY = 'cameraPowerPlanner_autoGearShowBackups';
var STORAGE_BACKUP_SUFFIX = '__backup';
var RAW_STORAGE_BACKUP_KEYS = new Set([getCustomFontStorageKeyName(), CUSTOM_LOGO_STORAGE_KEY]);
var STORAGE_ALERT_FLAG_NAME = '__cameraPowerPlannerStorageAlertShown';
var storageErrorAlertShown = false;
if (GLOBAL_SCOPE) {
  if (typeof GLOBAL_SCOPE[STORAGE_ALERT_FLAG_NAME] === 'boolean') {
    storageErrorAlertShown = GLOBAL_SCOPE[STORAGE_ALERT_FLAG_NAME];
  } else {
    GLOBAL_SCOPE[STORAGE_ALERT_FLAG_NAME] = false;
  }
}
var DEVICE_COLLECTION_KEYS = ['cameras', 'monitors', 'video', 'viewfinders', 'directorMonitors', 'iosVideo', 'videoAssist', 'media', 'lenses', 'batteries', 'batteryHotswaps', 'wirelessReceivers'];
var FIZ_COLLECTION_KEYS = ['motors', 'handUnits', 'controllers', 'distance'];
var ACCESSORY_COLLECTION_KEYS = ['chargers', 'cages', 'powerPlates', 'cameraSupport', 'matteboxes', 'filters', 'rigging', 'batteries', 'cables', 'videoAssist', 'media', 'tripodHeads', 'tripods', 'sliders', 'cameraStabiliser', 'grip', 'carts'];
var getStorageManager = function getStorageManager() {
  return typeof navigator !== 'undefined' && navigator && _typeof(navigator.storage) === 'object' ? navigator.storage : null;
};
var SAFE_LOCAL_STORAGE = function () {
  var TEST_KEY = '__storage_test__';
  var verifyStorage = function verifyStorage(storage) {
    if (!storage) return null;
    storage.setItem(TEST_KEY, '1');
    storage.removeItem(TEST_KEY);
    return storage;
  };
  if (typeof window !== 'undefined') {
    try {
      if ('localStorage' in window) {
        var storage = verifyStorage(window.localStorage);
        if (storage) return storage;
      }
    } catch (e) {
      console.warn('localStorage is unavailable:', e);
    }
    try {
      if ('sessionStorage' in window) {
        var _storage = verifyStorage(window.sessionStorage);
        if (_storage) {
          console.warn('Falling back to sessionStorage; data persists for this tab only.');
          return _storage;
        }
      }
    } catch (e) {
      console.warn('sessionStorage fallback is unavailable:', e);
    }
  }
  alertStorageError();
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
}();
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
  return val !== null && _typeof(val) === 'object' && !Array.isArray(val);
}
function alertStorageError() {
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
function loadJSONFromStorage(storage, key, errorMessage) {
  var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  if (!storage) return defaultValue;
  var _ref2 = options || {},
    _ref2$disableBackup = _ref2.disableBackup,
    disableBackup = _ref2$disableBackup === void 0 ? false : _ref2$disableBackup,
    backupKey = _ref2.backupKey,
    validate = _ref2.validate,
    _ref2$restoreIfMissin = _ref2.restoreIfMissing,
    restoreIfMissing = _ref2$restoreIfMissin === void 0 ? false : _ref2$restoreIfMissin;
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
    alertStorageError();
  }
  return defaultValue;
}
function saveJSONToStorage(storage, key, value, errorMessage, successMessage) {
  var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  if (!storage) return;
  var _ref3 = options || {},
    _ref3$disableBackup = _ref3.disableBackup,
    disableBackup = _ref3$disableBackup === void 0 ? false : _ref3$disableBackup,
    backupKey = _ref3.backupKey;
  var fallbackKey = typeof backupKey === 'string' && backupKey ? backupKey : "".concat(key).concat(STORAGE_BACKUP_SUFFIX);
  var useBackup = !disableBackup && fallbackKey && fallbackKey !== key;
  var serialized;
  try {
    serialized = JSON.stringify(value);
  } catch (serializationError) {
    console.error(errorMessage, serializationError);
    alertStorageError();
    return;
  }
  try {
    storage.setItem(key, serialized);
    if (useBackup) {
      try {
        storage.setItem(fallbackKey, serialized);
      } catch (backupError) {
        console.warn("Unable to update backup copy for ".concat(key), backupError);
        alertStorageError();
      }
    }
    if (successMessage) {
      console.log(successMessage);
    }
  } catch (e) {
    console.error(errorMessage, e);
    alertStorageError();
  }
}
function deleteFromStorage(storage, key, errorMessage) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  if (!storage) return;
  var _ref4 = options || {},
    _ref4$disableBackup = _ref4.disableBackup,
    disableBackup = _ref4$disableBackup === void 0 ? false : _ref4$disableBackup,
    backupKey = _ref4.backupKey;
  var fallbackKey = typeof backupKey === 'string' && backupKey ? backupKey : "".concat(key).concat(STORAGE_BACKUP_SUFFIX);
  var useBackup = !disableBackup && fallbackKey && fallbackKey !== key;
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
      console.error("".concat(errorMessage, " (backup)"), backupError);
      alertStorageError();
    }
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
function loadWithMigration(primary, fallback, key, primaryLoadMsg, fallbackLoadMsg, saveMsg, deleteMsg, loadOptions) {
  var value = loadJSONFromStorage(primary, key, primaryLoadMsg, null, loadOptions);
  if (value !== null) return value;
  if (!fallback) return null;
  var migrated = loadJSONFromStorage(fallback, key, fallbackLoadMsg, null, loadOptions);
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
function loadSessionState() {
  return loadWithMigration(SAFE_LOCAL_STORAGE, typeof sessionStorage !== 'undefined' ? sessionStorage : null, SESSION_STATE_KEY, "Error loading session state from localStorage:", "Error loading session state from sessionStorage:", "Error saving session state to localStorage:", "Error deleting session state from sessionStorage:", {
    validate: function validate(value) {
      return value === null || isPlainObject(value);
    }
  });
}
function saveSessionState(state) {
  if (state === null || state === undefined) {
    deleteFromStorage(SAFE_LOCAL_STORAGE, SESSION_STATE_KEY, "Error deleting session state from localStorage:");
    return;
  }
  if (!isPlainObject(state)) {
    console.warn('Ignoring invalid session state payload. Expected a plain object.');
    return;
  }
  saveJSONToStorage(SAFE_LOCAL_STORAGE, SESSION_STATE_KEY, state, "Error saving session state to localStorage:");
}
function loadDeviceData() {
  var parsedData = loadJSONFromStorage(SAFE_LOCAL_STORAGE, DEVICE_STORAGE_KEY, "Error loading device data from localStorage:", null, {
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
    saveJSONToStorage(SAFE_LOCAL_STORAGE, DEVICE_STORAGE_KEY, data, "Error updating device data in localStorage during normalization:");
  }
  console.log("Device data loaded from localStorage.");
  return data;
}
function saveDeviceData(deviceData) {
  if (deviceData === null || deviceData === undefined) {
    deleteFromStorage(SAFE_LOCAL_STORAGE, DEVICE_STORAGE_KEY, "Error deleting device data from localStorage:");
    console.log("Device data cleared from localStorage.");
    return;
  }
  if (!isPlainObject(deviceData)) {
    console.warn('Ignoring invalid device data payload. Expected a plain object.');
    return;
  }
  saveJSONToStorage(SAFE_LOCAL_STORAGE, DEVICE_STORAGE_KEY, deviceData, "Error saving device data to localStorage:", "Device data saved to localStorage.");
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
  var parsedData = loadJSONFromStorage(SAFE_LOCAL_STORAGE, SETUP_STORAGE_KEY, "Error loading setups from localStorage:", null, {
    validate: function validate(value) {
      return value === null || Array.isArray(value) || isPlainObject(value);
    }
  });
  var _normalizeSetups = normalizeSetups(parsedData),
    setups = _normalizeSetups.data,
    changed = _normalizeSetups.changed;
  if (changed) {
    saveJSONToStorage(SAFE_LOCAL_STORAGE, SETUP_STORAGE_KEY, setups, "Error updating setups in localStorage during normalization:");
  }
  return setups;
}
function saveSetups(setups) {
  var _normalizeSetups2 = normalizeSetups(setups),
    normalizedSetups = _normalizeSetups2.data;
  saveJSONToStorage(SAFE_LOCAL_STORAGE, SETUP_STORAGE_KEY, normalizedSetups, "Error saving setups to localStorage:", "Setups saved to localStorage.");
}
function updateSetups(callback) {
  var setups = loadSetups();
  var _ref5 = callback(setups) || {},
    result = _ref5.result,
    _ref5$changed = _ref5.changed,
    changed = _ref5$changed === void 0 ? true : _ref5$changed;
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
    setups[target] = setups[oldName];
    delete setups[oldName];
    return {
      result: target,
      changed: true
    };
  });
}
function normalizeProject(data) {
  if (typeof data === "string") {
    return {
      gearList: data,
      projectInfo: null
    };
  }
  if (isPlainObject(data)) {
    if (Object.prototype.hasOwnProperty.call(data, "gearList") || Object.prototype.hasOwnProperty.call(data, "projectInfo")) {
      var normalized = {
        gearList: typeof data.gearList === "string" || data.gearList && _typeof(data.gearList) === "object" ? data.gearList : "",
        projectInfo: isPlainObject(data.projectInfo) ? data.projectInfo : null
      };
      if (Array.isArray(data.autoGearRules) && data.autoGearRules.length) {
        normalized.autoGearRules = data.autoGearRules;
      }
      return normalized;
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
  }
  return null;
}
var LEGACY_PROJECT_ROOT_KEYS = new Set(["gearList", "projectInfo", "projectHtml", "gearHtml", "autoGearRules"]);
var NORMALIZED_PROJECT_KEYS = new Set(["gearList", "projectInfo", "autoGearRules"]);
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
    return Array.isArray(entry.autoGearRules) && entry.autoGearRules.length > 0;
  }
  return true;
}
function readAllProjectsFromStorage() {
  var parsed = loadJSONFromStorage(SAFE_LOCAL_STORAGE, PROJECT_STORAGE_KEY, "Error loading project from localStorage:", null, {
    validate: function validate(value) {
      return value === null || typeof value === "string" || Array.isArray(value) || isPlainObject(value);
    }
  });
  var projects = {};
  var changed = false;
  if (parsed === null || parsed === undefined) {
    return {
      projects: projects,
      changed: false
    };
  }
  if (typeof parsed === "string") {
    var normalized = normalizeProject(parsed);
    if (normalized) {
      projects[""] = normalized;
    }
    return {
      projects: projects,
      changed: true
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
      changed: true
    };
  }
  if (!isPlainObject(parsed)) {
    return {
      projects: projects,
      changed: true
    };
  }
  var keys = Object.keys(parsed);
  var maybeLegacy = keys.length > 0 && keys.every(function (key) {
    return LEGACY_PROJECT_ROOT_KEYS.has(key);
  });
  if (maybeLegacy) {
    var _normalized2 = normalizeProject(parsed);
    if (_normalized2) {
      projects[""] = _normalized2;
    }
    return {
      projects: projects,
      changed: true
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
    changed: changed
  };
}
function persistAllProjects(projects, successMessage) {
  saveJSONToStorage(SAFE_LOCAL_STORAGE, PROJECT_STORAGE_KEY, projects, "Error saving project to localStorage:", successMessage);
}
function loadProject(name) {
  var _readAllProjectsFromS = readAllProjectsFromStorage(),
    projects = _readAllProjectsFromS.projects,
    changed = _readAllProjectsFromS.changed;
  if (changed && SAFE_LOCAL_STORAGE) {
    persistAllProjects(projects);
  }
  if (name === undefined) {
    return projects;
  }
  var key = name || "";
  return Object.prototype.hasOwnProperty.call(projects, key) ? projects[key] : null;
}
function saveProject(name, project) {
  if (!isPlainObject(project)) return;
  var normalized = normalizeProject(project) || {
    gearList: "",
    projectInfo: null
  };
  var _readAllProjectsFromS2 = readAllProjectsFromStorage(),
    projects = _readAllProjectsFromS2.projects;
  projects[name || ""] = normalized;
  persistAllProjects(projects, "Project saved to localStorage.");
}
function deleteProject(name) {
  if (name === undefined) {
    deleteFromStorage(SAFE_LOCAL_STORAGE, PROJECT_STORAGE_KEY, "Error deleting project from localStorage:");
    return;
  }
  var key = name || "";
  var _readAllProjectsFromS3 = readAllProjectsFromStorage(),
    projects = _readAllProjectsFromS3.projects;
  if (!Object.prototype.hasOwnProperty.call(projects, key)) {
    return;
  }
  delete projects[key];
  if (Object.keys(projects).length === 0) {
    deleteFromStorage(SAFE_LOCAL_STORAGE, PROJECT_STORAGE_KEY, "Error deleting project from localStorage:");
  } else {
    persistAllProjects(projects);
  }
}
function createProjectImporter() {
  var _readAllProjectsFromS4 = readAllProjectsFromStorage(),
    projects = _readAllProjectsFromS4.projects;
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
function importProjectCollection(collection, ensureImporter) {
  var fallbackLabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Imported project";
  if (typeof collection === "string") {
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
    Object.entries(collection).forEach(function (_ref6) {
      var _ref7 = _slicedToArray(_ref6, 2),
        name = _ref7[0],
        proj = _ref7[1];
      _importProject(name, proj);
    });
    return true;
  }
  return false;
}
function loadFavorites() {
  var parsed = loadJSONFromStorage(SAFE_LOCAL_STORAGE, FAVORITES_STORAGE_KEY, "Error loading favorites from localStorage:", {}, {
    validate: function validate(value) {
      return value === null || isPlainObject(value);
    }
  });
  return isPlainObject(parsed) ? parsed : {};
}
function saveFavorites(favs) {
  if (favs === null || favs === undefined) {
    deleteFromStorage(SAFE_LOCAL_STORAGE, FAVORITES_STORAGE_KEY, "Error deleting favorites from localStorage:");
    return;
  }
  if (!isPlainObject(favs)) {
    console.warn('Ignoring invalid favorites payload. Expected a plain object.');
    return;
  }
  saveJSONToStorage(SAFE_LOCAL_STORAGE, FAVORITES_STORAGE_KEY, favs, "Error saving favorites to localStorage:");
}
function loadFeedback() {
  var parsed = loadJSONFromStorage(SAFE_LOCAL_STORAGE, FEEDBACK_STORAGE_KEY, "Error loading feedback from localStorage:", null, {
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
  if (feedback === null || feedback === undefined) {
    deleteFromStorage(SAFE_LOCAL_STORAGE, FEEDBACK_STORAGE_KEY, "Error deleting feedback from localStorage:");
    return;
  }
  if (!isPlainObject(feedback)) {
    console.warn('Ignoring invalid feedback payload. Expected a plain object.');
    return;
  }
  saveJSONToStorage(SAFE_LOCAL_STORAGE, FEEDBACK_STORAGE_KEY, feedback, "Error saving feedback to localStorage:", "Feedback saved to localStorage.");
}
function loadAutoGearRules() {
  var parsed = loadJSONFromStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_RULES_STORAGE_KEY, "Error loading automatic gear rules from localStorage:", [], {
    validate: function validate(value) {
      return value === null || Array.isArray(value);
    }
  });
  return Array.isArray(parsed) ? parsed : [];
}
function saveAutoGearRules(rules) {
  var safeRules = Array.isArray(rules) ? rules : [];
  saveJSONToStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_RULES_STORAGE_KEY, safeRules, "Error saving automatic gear rules to localStorage:");
}
function loadAutoGearBackups() {
  var parsed = loadJSONFromStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_BACKUPS_STORAGE_KEY, "Error loading automatic gear rule backups from localStorage:", [], {
    validate: function validate(value) {
      return value === null || Array.isArray(value);
    }
  });
  return Array.isArray(parsed) ? parsed : [];
}
function saveAutoGearBackups(backups) {
  var safeBackups = Array.isArray(backups) ? backups : [];
  saveJSONToStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_BACKUPS_STORAGE_KEY, safeBackups, "Error saving automatic gear rule backups to localStorage:");
}
function loadAutoGearSeedFlag() {
  return loadFlagFromStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_SEEDED_STORAGE_KEY, "Error loading automatic gear seed flag from localStorage:");
}
function saveAutoGearSeedFlag(flag) {
  saveFlagToStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_SEEDED_STORAGE_KEY, Boolean(flag), "Error saving automatic gear seed flag to localStorage:");
}
function loadAutoGearPresets() {
  var presets = loadJSONFromStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_PRESETS_STORAGE_KEY, "Error loading automatic gear presets from localStorage:", [], {
    validate: function validate(value) {
      return value === null || Array.isArray(value);
    }
  });
  return Array.isArray(presets) ? presets : [];
}
function saveAutoGearPresets(presets) {
  var safePresets = Array.isArray(presets) ? presets : [];
  saveJSONToStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_PRESETS_STORAGE_KEY, safePresets, "Error saving automatic gear presets to localStorage:");
}
function loadAutoGearActivePresetId() {
  if (!SAFE_LOCAL_STORAGE) {
    return '';
  }
  try {
    var value = SAFE_LOCAL_STORAGE.getItem(AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY);
    return typeof value === 'string' ? value : '';
  } catch (error) {
    console.error('Error loading automatic gear active preset from localStorage:', error);
    alertStorageError();
    return '';
  }
}
function saveAutoGearActivePresetId(presetId) {
  if (!SAFE_LOCAL_STORAGE) {
    return;
  }
  try {
    if (presetId) {
      SAFE_LOCAL_STORAGE.setItem(AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY, presetId);
    } else {
      SAFE_LOCAL_STORAGE.removeItem(AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY);
    }
  } catch (error) {
    console.error('Error saving automatic gear active preset to localStorage:', error);
    alertStorageError();
  }
}
function loadAutoGearBackupVisibility() {
  return loadFlagFromStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY, "Error loading automatic gear backup visibility from localStorage:");
}
function saveAutoGearBackupVisibility(flag) {
  saveFlagToStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY, Boolean(flag), "Error saving automatic gear backup visibility to localStorage:");
}
function clearAllData() {
  var msg = "Error clearing storage:";
  deleteFromStorage(SAFE_LOCAL_STORAGE, DEVICE_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, SETUP_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, FEEDBACK_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, FAVORITES_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, PROJECT_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_RULES_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_BACKUPS_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_SEEDED_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_PRESETS_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, getCustomFontStorageKeyName(), msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, CUSTOM_LOGO_STORAGE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, DEVICE_SCHEMA_CACHE_KEY, msg);
  deleteFromStorage(SAFE_LOCAL_STORAGE, SESSION_STATE_KEY, msg);
  if (typeof sessionStorage !== 'undefined') {
    deleteFromStorage(sessionStorage, SESSION_STATE_KEY, msg);
  }
  console.log("All planner data cleared from storage.");
}
function readLocalStorageValue(key) {
  var storage = SAFE_LOCAL_STORAGE;
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
    autoGearActivePresetId: loadAutoGearActivePresetId(),
    autoGearShowBackups: loadAutoGearBackupVisibility()
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
  return payload;
}
function safeSetLocalStorage(key, value) {
  var storage = SAFE_LOCAL_STORAGE;
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
function getSafeLocalStorage() {
  return SAFE_LOCAL_STORAGE;
}
function importAllData(allData) {
  if (!isPlainObject(allData)) {
    return;
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
    var booleanPrefs = ['darkMode', 'pinkMode', 'highContrast', 'showAutoBackups'];
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
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearRules')) {
    saveAutoGearRules(allData.autoGearRules);
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearBackups')) {
    saveAutoGearBackups(allData.autoGearBackups);
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearSeeded')) {
    saveAutoGearSeedFlag(allData.autoGearSeeded);
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearPresets')) {
    saveAutoGearPresets(allData.autoGearPresets);
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearActivePresetId')) {
    saveAutoGearActivePresetId(typeof allData.autoGearActivePresetId === 'string' ? allData.autoGearActivePresetId : '');
  }
  if (Object.prototype.hasOwnProperty.call(allData, 'autoGearShowBackups')) {
    saveAutoGearBackupVisibility(Boolean(allData.autoGearShowBackups));
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
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
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
    loadAutoGearActivePresetId: loadAutoGearActivePresetId,
    saveAutoGearActivePresetId: saveAutoGearActivePresetId,
    loadAutoGearBackupVisibility: loadAutoGearBackupVisibility,
    saveAutoGearBackupVisibility: saveAutoGearBackupVisibility,
    requestPersistentStorage: requestPersistentStorage
  };
}