function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var EVENTS_UI_HELPERS = function resolveUiHelpersForEvents() {
  if (typeof require === 'function') {
    try {
      var required = require('./app-core-ui-helpers.js');
      if (required && _typeof(required) === 'object') {
        return required;
      }
    } catch (uiHelpersError) {
      void uiHelpersError;
    }
  }
  var scopes = [];
  try {
    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
      scopes.push(CORE_GLOBAL_SCOPE);
    }
  } catch (coreScopeError) {
    void coreScopeError;
  }
  if (typeof globalThis !== 'undefined' && globalThis) {
    scopes.push(globalThis);
  }
  if (typeof window !== 'undefined' && window) {
    scopes.push(window);
  }
  if (typeof self !== 'undefined' && self) {
    scopes.push(self);
  }
  if (typeof global !== 'undefined' && global) {
    scopes.push(global);
  }
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope) {
      continue;
    }
    try {
      var helpers = scope.cineCoreUiHelpers;
      if (helpers && _typeof(helpers) === 'object') {
        return helpers;
      }
    } catch (scopeLookupError) {
      void scopeLookupError;
    }
  }
  return {};
}();
var DEVICE_STORAGE_KEY_FOR_EVENTS = 'cameraPowerPlanner_devices';
var toggleDeviceBtn = typeof toggleDeviceBtn !== 'undefined' ? toggleDeviceBtn : typeof document !== 'undefined' && typeof document.getElementById === 'function' ? document.getElementById('toggleDeviceManager') : null;
var deviceManagerSection = typeof deviceManagerSection !== 'undefined' ? deviceManagerSection : typeof document !== 'undefined' && typeof document.getElementById === 'function' ? document.getElementById('device-manager') : null;
if (typeof globalThis !== 'undefined') {
  if (toggleDeviceBtn && typeof globalThis.toggleDeviceBtn === 'undefined') {
    globalThis.toggleDeviceBtn = toggleDeviceBtn;
  }
  if (deviceManagerSection && typeof globalThis.deviceManagerSection === 'undefined') {
    globalThis.deviceManagerSection = deviceManagerSection;
  }
}
var STORAGE_HELPERS_FOR_EVENTS = function resolveStorageHelpersForEvents() {
  var resolved = {};
  var assignHelper = function assignHelper(source, key) {
    if (!source || typeof resolved[key] === 'function') {
      return;
    }
    var value = source[key];
    if (typeof value === 'function') {
      resolved[key] = value;
    }
  };
  if (typeof require === 'function') {
    try {
      var storageModule = require('./storage.js');
      if (storageModule && _typeof(storageModule) === 'object') {
        assignHelper(storageModule, 'getSafeLocalStorage');
        assignHelper(storageModule, 'saveDeviceData');
        assignHelper(storageModule, 'clearUiCacheStorageEntries');
      }
    } catch (storageRequireError) {
      void storageRequireError;
    }
  }
  var scopeCandidates = [];
  try {
    if ((typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' && CORE_GLOBAL_SCOPE) {
      scopeCandidates.push(CORE_GLOBAL_SCOPE);
    }
  } catch (coreScopeError) {
    void coreScopeError;
  }
  if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' && globalThis) {
    scopeCandidates.push(globalThis);
  }
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window) {
    scopeCandidates.push(window);
  }
  if ((typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' && self) {
    scopeCandidates.push(self);
  }
  if ((typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' && global) {
    scopeCandidates.push(global);
  }
  for (var index = 0; index < scopeCandidates.length; index += 1) {
    var scope = scopeCandidates[index];
    if (!scope || _typeof(scope) !== 'object') {
      continue;
    }
    assignHelper(scope, 'getSafeLocalStorage');
    assignHelper(scope, 'saveDeviceData');
    assignHelper(scope, 'clearUiCacheStorageEntries');
    if (typeof resolved.getSafeLocalStorage === 'function' && typeof resolved.saveDeviceData === 'function' && typeof resolved.clearUiCacheStorageEntries === 'function') {
      break;
    }
  }
  return resolved;
}();
var STORAGE_BACKUP_SUFFIX_FOR_EVENTS = '__backup';
var STORAGE_MIGRATION_BACKUP_SUFFIX_FOR_EVENTS = '__legacyMigrationBackup';
function clearDeviceStorageVariantForEvents(keyVariant, options) {
  if (typeof keyVariant !== 'string' || !keyVariant) {
    return false;
  }
  var settings = options && _typeof(options) === 'object' ? options : {};
  var removalKeys = new Set();
  removalKeys.add(keyVariant);
  if (typeof STORAGE_BACKUP_SUFFIX_FOR_EVENTS === 'string' && STORAGE_BACKUP_SUFFIX_FOR_EVENTS) {
    removalKeys.add("".concat(keyVariant).concat(STORAGE_BACKUP_SUFFIX_FOR_EVENTS));
  }
  if (typeof STORAGE_MIGRATION_BACKUP_SUFFIX_FOR_EVENTS === 'string' && STORAGE_MIGRATION_BACKUP_SUFFIX_FOR_EVENTS) {
    removalKeys.add("".concat(keyVariant).concat(STORAGE_MIGRATION_BACKUP_SUFFIX_FOR_EVENTS));
  }
  var removed = false;
  var logPrefix = settings.logPrefix || 'Failed to clear device storage variant';
  var storageCandidates = new Set();
  if (typeof STORAGE_HELPERS_FOR_EVENTS.getSafeLocalStorage === 'function') {
    try {
      var safeStorage = STORAGE_HELPERS_FOR_EVENTS.getSafeLocalStorage();
      if (safeStorage) {
        storageCandidates.add(safeStorage);
      }
    } catch (safeStorageError) {
      try {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn("".concat(logPrefix, ": safe storage lookup failed"), safeStorageError);
        }
      } catch (logError) {
        void logError;
      }
    }
  }
  try {
    if (typeof SAFE_LOCAL_STORAGE !== 'undefined' && SAFE_LOCAL_STORAGE) {
      storageCandidates.add(SAFE_LOCAL_STORAGE);
    }
  } catch (safeLocalStorageLookupError) {
    void safeLocalStorageLookupError;
  }
  try {
    if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' && globalThis && globalThis.localStorage) {
      storageCandidates.add(globalThis.localStorage);
    }
  } catch (globalThisLookupError) {
    void globalThisLookupError;
  }
  try {
    if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window && window.localStorage) {
      storageCandidates.add(window.localStorage);
    }
  } catch (windowLookupError) {
    void windowLookupError;
  }
  try {
    if (typeof localStorage !== 'undefined' && localStorage) {
      storageCandidates.add(localStorage);
    }
  } catch (localStorageLookupError) {
    void localStorageLookupError;
  }
  var removalTargets = Array.from(removalKeys);
  storageCandidates.forEach(function (storage) {
    if (!storage || typeof storage.removeItem !== 'function') {
      return;
    }
    for (var index = 0; index < removalTargets.length; index += 1) {
      var removalKey = removalTargets[index];
      if (typeof removalKey !== 'string' || !removalKey) {
        continue;
      }
      try {
        storage.removeItem(removalKey);
        removed = true;
      } catch (removeError) {
        try {
          if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn("".concat(logPrefix, " \"").concat(removalKey, "\""), removeError);
          }
        } catch (logError) {
          void logError;
        }
      }
    }
  });
  if (typeof STORAGE_HELPERS_FOR_EVENTS.clearUiCacheStorageEntries === 'function') {
    try {
      STORAGE_HELPERS_FOR_EVENTS.clearUiCacheStorageEntries(removalTargets);
    } catch (cacheClearError) {
      try {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Failed to clear UI cache entries for device storage reset', cacheClearError);
        }
      } catch (logError) {
        void logError;
      }
    }
  }
  return removed;
}
function clearAllDeviceStorageVariantsForEvents() {
  var variants = getDeviceStorageKeyVariantsForEvents();
  if (!variants || typeof variants.forEach !== 'function') {
    return false;
  }
  var clearedAny = false;
  variants.forEach(function (keyVariant) {
    if (typeof keyVariant !== 'string' || !keyVariant) {
      return;
    }
    if (typeof DEVICE_STORAGE_KEY_FOR_EVENTS === 'string' && keyVariant === DEVICE_STORAGE_KEY_FOR_EVENTS && typeof STORAGE_HELPERS_FOR_EVENTS.saveDeviceData === 'function') {
      try {
        STORAGE_HELPERS_FOR_EVENTS.saveDeviceData(null);
        clearedAny = true;
      } catch (storeError) {
        try {
          if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('Failed to clear primary device storage via saveDeviceData', storeError);
          }
        } catch (logError) {
          void logError;
        }
      }
    }
    var removedVariant = clearDeviceStorageVariantForEvents(keyVariant, {
      logPrefix: 'Failed to clear device storage variant'
    });
    if (removedVariant) {
      clearedAny = true;
    }
  });
  return clearedAny;
}
var CABLE_SUBCATEGORY_FALLBACK_KEYS = Object.freeze(['power', 'video', 'fiz', 'cables']);
function getCableSubcategoryKeysForUi(preferredKeys) {
  var values = [];
  var seen = new Set();
  var pushKey = function pushKey(key) {
    if (typeof key !== 'string') {
      return;
    }
    var trimmed = key.trim();
    if (!trimmed || seen.has(trimmed)) {
      return;
    }
    seen.add(trimmed);
    values.push(trimmed);
  };
  var schemaSubcategories = null;
  try {
    var schema = typeof deviceSchema !== 'undefined' ? deviceSchema : null;
    schemaSubcategories = schema && schema.accessories && schema.accessories.cables ? schema.accessories.cables : null;
  } catch (schemaLookupError) {
    void schemaLookupError;
    schemaSubcategories = null;
  }
  if (schemaSubcategories && _typeof(schemaSubcategories) === 'object') {
    try {
      for (var _i = 0, _Object$keys = Object.keys(schemaSubcategories); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        pushKey(key);
      }
    } catch (schemaIterationError) {
      void schemaIterationError;
    }
  }
  for (var index = 0; index < CABLE_SUBCATEGORY_FALLBACK_KEYS.length; index += 1) {
    pushKey(CABLE_SUBCATEGORY_FALLBACK_KEYS[index]);
  }
  var existingSubcategories = null;
  try {
    var devicesRoot = typeof devices !== 'undefined' ? devices : null;
    existingSubcategories = devicesRoot && devicesRoot.accessories && devicesRoot.accessories.cables ? devicesRoot.accessories.cables : null;
  } catch (devicesLookupError) {
    void devicesLookupError;
    existingSubcategories = null;
  }
  if (existingSubcategories && _typeof(existingSubcategories) === 'object') {
    try {
      for (var _i2 = 0, _Object$keys2 = Object.keys(existingSubcategories); _i2 < _Object$keys2.length; _i2++) {
        var _key = _Object$keys2[_i2];
        pushKey(_key);
      }
    } catch (existingIterationError) {
      void existingIterationError;
    }
  }
  if (Array.isArray(preferredKeys)) {
    for (var _index = 0; _index < preferredKeys.length; _index += 1) {
      pushKey(preferredKeys[_index]);
    }
  } else {
    pushKey(preferredKeys);
  }
  return values;
}
function getDeviceStorageKeyVariantsForEvents() {
  if (typeof require === 'function') {
    try {
      var storage = require('./storage.js');
      if (storage && _typeof(storage) === 'object') {
        if (typeof storage.getDeviceStorageKeyVariants === 'function') {
          var _variants = storage.getDeviceStorageKeyVariants();
          if (_variants && typeof _variants.forEach === 'function') {
            return Array.from(_variants);
          }
        }
        if (typeof storage.getStorageKeyVariants === 'function') {
          var _variants2 = storage.getStorageKeyVariants(DEVICE_STORAGE_KEY_FOR_EVENTS);
          if (_variants2 && typeof _variants2.forEach === 'function') {
            return Array.from(_variants2);
          }
        }
      }
    } catch (storageHelperError) {
      void storageHelperError;
    }
  }
  var variants = new Set();
  if (typeof DEVICE_STORAGE_KEY_FOR_EVENTS === 'string' && DEVICE_STORAGE_KEY_FOR_EVENTS) {
    variants.add(DEVICE_STORAGE_KEY_FOR_EVENTS);
    if (DEVICE_STORAGE_KEY_FOR_EVENTS.startsWith('cameraPowerPlanner_')) {
      variants.add("cinePowerPlanner_".concat(DEVICE_STORAGE_KEY_FOR_EVENTS.slice('cameraPowerPlanner_'.length)));
    } else if (DEVICE_STORAGE_KEY_FOR_EVENTS.startsWith('cinePowerPlanner_')) {
      variants.add("cameraPowerPlanner_".concat(DEVICE_STORAGE_KEY_FOR_EVENTS.slice('cinePowerPlanner_'.length)));
    }
  }
  return Array.from(variants);
}
var setButtonLabelWithIconForEvents = function resolveSetButtonLabelWithIconForEvents() {
  if (typeof EVENTS_UI_HELPERS.setButtonLabelWithIcon === 'function') {
    return EVENTS_UI_HELPERS.setButtonLabelWithIcon;
  }
  var candidates = [];
  try {
    if ((typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE.setButtonLabelWithIcon === 'function') {
      candidates.push(CORE_GLOBAL_SCOPE.setButtonLabelWithIcon);
    }
  } catch (coreScopeError) {
    void coreScopeError;
  }
  if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis.setButtonLabelWithIcon === 'function') {
    candidates.push(globalThis.setButtonLabelWithIcon);
  }
  if (typeof window !== 'undefined' && window && typeof window.setButtonLabelWithIcon === 'function') {
    candidates.push(window.setButtonLabelWithIcon);
  }
  if (typeof self !== 'undefined' && self && typeof self.setButtonLabelWithIcon === 'function') {
    candidates.push(self.setButtonLabelWithIcon);
  }
  if (typeof global !== 'undefined' && global && typeof global.setButtonLabelWithIcon === 'function') {
    candidates.push(global.setButtonLabelWithIcon);
  }
  if (candidates.length > 0) {
    return candidates[0];
  }
  return function setButtonLabelWithIconFallback(button, label) {
    if (!button) {
      return;
    }
    try {
      button.textContent = typeof label === 'string' ? label : '';
    } catch (assignError) {
      void assignError;
    }
  };
}();
var BACKUP_FEATURE_FOR_EVENTS = function resolveBackupFeatureForEvents() {
  if (typeof require === 'function') {
    try {
      var required = require('./modules/features/backup.js');
      if (required && _typeof(required) === 'object') {
        return required;
      }
    } catch (requireError) {
      void requireError;
    }
  }
  var scopes = [];
  try {
    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
      scopes.push(CORE_GLOBAL_SCOPE);
    }
  } catch (scopeError) {
    void scopeError;
  }
  if (typeof globalThis !== 'undefined' && globalThis) {
    scopes.push(globalThis);
  }
  if (typeof window !== 'undefined' && window) {
    scopes.push(window);
  }
  if (typeof self !== 'undefined' && self) {
    scopes.push(self);
  }
  if (typeof global !== 'undefined' && global) {
    scopes.push(global);
  }
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope) {
      continue;
    }
    try {
      var feature = scope.cineFeatureBackup;
      if (feature && _typeof(feature) === 'object') {
        return feature;
      }
    } catch (lookupError) {
      void lookupError;
    }
  }
  return {};
}();
var queueBackupPayloadForVaultForEvents = typeof BACKUP_FEATURE_FOR_EVENTS.queueBackupPayloadForVault === 'function' ? BACKUP_FEATURE_FOR_EVENTS.queueBackupPayloadForVault : null;
var getQueuedBackupPayloadsForEvents = typeof BACKUP_FEATURE_FOR_EVENTS.getQueuedBackupPayloads === 'function' ? BACKUP_FEATURE_FOR_EVENTS.getQueuedBackupPayloads : null;
var removeQueuedBackupRecordForEvents = typeof BACKUP_FEATURE_FOR_EVENTS.removeBackupVaultRecord === 'function' ? BACKUP_FEATURE_FOR_EVENTS.removeBackupVaultRecord : null;
var openQueuedBackupVaultWindowForEvents = typeof BACKUP_FEATURE_FOR_EVENTS.openQueuedBackupVaultWindow === 'function' ? BACKUP_FEATURE_FOR_EVENTS.openQueuedBackupVaultWindow : null;
var resolveQueuedBackupMessageForEvents = typeof BACKUP_FEATURE_FOR_EVENTS.resolveQueuedBackupMessage === 'function' ? BACKUP_FEATURE_FOR_EVENTS.resolveQueuedBackupMessage : null;
var downloadBackupPayloadForEvents = typeof BACKUP_FEATURE_FOR_EVENTS.downloadBackupPayload === 'function' ? BACKUP_FEATURE_FOR_EVENTS.downloadBackupPayload : null;
var isBackupVaultFallbackActiveForEvents = typeof BACKUP_FEATURE_FOR_EVENTS.isBackupVaultFallbackActive === 'function' ? BACKUP_FEATURE_FOR_EVENTS.isBackupVaultFallbackActive : null;
var buildSettingsBackupPackageForEvents = function resolveBuildSettingsBackupPackage() {
  if (typeof buildSettingsBackupPackage === 'function') {
    return buildSettingsBackupPackage;
  }
  var scopes = [];
  try {
    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
      scopes.push(CORE_GLOBAL_SCOPE);
    }
  } catch (scopeError) {
    void scopeError;
  }
  if (typeof globalThis !== 'undefined' && globalThis) {
    scopes.push(globalThis);
  }
  if (typeof window !== 'undefined' && window) {
    scopes.push(window);
  }
  if (typeof self !== 'undefined' && self) {
    scopes.push(self);
  }
  if (typeof global !== 'undefined' && global) {
    scopes.push(global);
  }
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope) {
      continue;
    }
    if (typeof scope.buildSettingsBackupPackage === 'function') {
      return scope.buildSettingsBackupPackage;
    }
  }
  return null;
}();
function collectLoggingResolverScopes() {
  var scopes = [];
  var primary = getGlobalScope();
  if (primary && scopes.indexOf(primary) === -1) {
    scopes.push(primary);
  }
  if (typeof globalThis !== 'undefined' && globalThis && scopes.indexOf(globalThis) === -1) {
    scopes.push(globalThis);
  }
  if (typeof window !== 'undefined' && window && scopes.indexOf(window) === -1) {
    scopes.push(window);
  }
  if (typeof self !== 'undefined' && self && scopes.indexOf(self) === -1) {
    scopes.push(self);
  }
  if (typeof global !== 'undefined' && global && scopes.indexOf(global) === -1) {
    scopes.push(global);
  }
  return scopes;
}
function resolveLoggingResolver() {
  if (typeof require === 'function') {
    try {
      var required = require('./modules/logging-resolver.js');
      if (required && typeof required.resolveLogger === 'function') {
        return required;
      }
    } catch (error) {
      void error;
    }
  }
  var scopes = collectLoggingResolverScopes();
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      var resolver = scope.cineLoggingResolver;
      if (resolver && typeof resolver.resolveLogger === 'function') {
        return resolver;
      }
    } catch (resolveError) {
      void resolveError;
    }
  }
  return null;
}
function resolveLegacyEventsLogger() {
  var scopes = collectLoggingResolverScopes();
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    var logging = null;
    try {
      logging = scope.cineLogging || null;
    } catch (error) {
      logging = null;
    }
    if (logging && typeof logging.createLogger === 'function') {
      try {
        return logging.createLogger('events', {
          meta: {
            source: 'app-events'
          }
        });
      } catch (creationError) {
        try {
          if (typeof logging.error === 'function') {
            logging.error('Failed to create events logger', creationError, {
              namespace: 'events-bootstrap'
            });
          }
        } catch (logError) {
          void logError;
        }
      }
    }
  }
  return null;
}
var eventsLogger = function resolveEventsLogger() {
  var resolver = resolveLoggingResolver();
  if (resolver && typeof resolver.resolveLogger === 'function') {
    try {
      var logger = resolver.resolveLogger('events', {
        meta: {
          source: 'app-events'
        }
      });
      if (logger) {
        return logger;
      }
    } catch (resolverError) {
      void resolverError;
    }
  }
  return resolveLegacyEventsLogger();
}();
var APP_EVENTS_AUTO_BACKUP_RENAMED_FLAG = typeof globalThis !== 'undefined' && globalThis.__CINE_AUTO_BACKUP_RENAMED_FLAG ? globalThis.__CINE_AUTO_BACKUP_RENAMED_FLAG : '__cineAutoBackupRenamed';
if (typeof viewfinderTypeOptions === 'undefined' || !Array.isArray(viewfinderTypeOptions)) {
  viewfinderTypeOptions = [];
}
if (typeof viewfinderConnectorOptions === 'undefined' || !Array.isArray(viewfinderConnectorOptions)) {
  viewfinderConnectorOptions = [];
}
function getGlobalScope() {
  if (typeof globalThis !== 'undefined' && globalThis) return globalThis;
  if (typeof window !== 'undefined' && window) return window;
  if (typeof self !== 'undefined' && self) return self;
  if (typeof global !== 'undefined' && global) return global;
  return null;
}
var resolvedDeviceManagerElements = {
  categorySelect: null
};
function resolveNewCategorySelect() {
  var cached = resolvedDeviceManagerElements.categorySelect;
  if (cached && _typeof(cached) === 'object') {
    if (typeof cached.isConnected === 'boolean') {
      if (cached.isConnected) {
        return cached;
      }
    } else if (cached.ownerDocument) {
      return cached;
    }
  }
  var element = null;
  if (typeof newCategorySelect !== 'undefined' && newCategorySelect) {
    element = newCategorySelect;
  } else if (typeof document !== 'undefined' && document && typeof document.getElementById === 'function') {
    element = document.getElementById('newCategory');
  }
  if (element) {
    resolvedDeviceManagerElements.categorySelect = element;
    var scope = getGlobalScope();
    if (scope && _typeof(scope) === 'object') {
      try {
        scope.newCategorySelect = scope.newCategorySelect || element;
      } catch (assignError) {
        void assignError;
      }
    }
  }
  return element;
}
var AUTO_BACKUP_CHANGE_THRESHOLD = 50;
var AUTO_BACKUP_INTERVAL_MS = 10 * 60 * 1000;
var AUTO_BACKUP_ALLOWED_REASONS = ['interval', 'project-switch', 'import', 'export', 'export-revert', 'before-reload', 'change-threshold'];
var AUTO_BACKUP_RATE_LIMITED_REASONS = new Set(['import']);
var AUTO_BACKUP_CADENCE_EXEMPT_REASONS = new Set(['import', 'export', 'export-revert', 'before-reload', 'project-switch']);
var AUTO_BACKUP_LOG_META = {
  feature: 'auto-backup'
};
var DEVICE_IMPORT_LOG_META = {
  feature: 'device-import',
  source: 'app-events'
};
var MAX_SANITIZED_IMPORT_ERRORS = 10;
function sanitizeErrorForLogging(error) {
  if (!error) {
    return null;
  }
  if (typeof error === 'string') {
    return {
      message: error
    };
  }
  if (_typeof(error) !== 'object') {
    try {
      return {
        message: String(error)
      };
    } catch (stringifyError) {
      void stringifyError;
      return {
        message: 'Unknown error'
      };
    }
  }
  var sanitized = {};
  if (typeof error.name === 'string' && error.name) {
    sanitized.name = error.name;
  }
  if (typeof error.message === 'string' && error.message) {
    sanitized.message = error.message;
  }
  if (typeof error.code === 'string' || typeof error.code === 'number') {
    sanitized.code = error.code;
  }
  if (typeof error.lineNumber === 'number') {
    sanitized.lineNumber = error.lineNumber;
  }
  if (typeof error.columnNumber === 'number') {
    sanitized.columnNumber = error.columnNumber;
  }
  if (Object.keys(sanitized).length > 0) {
    return sanitized;
  }
  try {
    return {
      message: String(error)
    };
  } catch (fallbackError) {
    void fallbackError;
    return {
      message: 'Unknown error'
    };
  }
}
function sanitizeImportErrors(errors) {
  if (!Array.isArray(errors) || errors.length === 0) {
    return [];
  }
  var sanitized = [];
  for (var index = 0; index < errors.length && sanitized.length < MAX_SANITIZED_IMPORT_ERRORS; index += 1) {
    var candidate = errors[index];
    if (typeof candidate === 'string') {
      sanitized.push(candidate);
    } else if (candidate && _typeof(candidate) === 'object') {
      var entry = {};
      if (typeof candidate.message === 'string' && candidate.message) {
        entry.message = candidate.message;
      }
      if (typeof candidate.code === 'string' || typeof candidate.code === 'number') {
        entry.code = candidate.code;
      }
      if (Object.keys(entry).length > 0) {
        sanitized.push(entry);
      } else {
        try {
          sanitized.push(String(candidate));
        } catch (stringifyError) {
          void stringifyError;
        }
      }
    } else {
      try {
        sanitized.push(String(candidate));
      } catch (stringifyError) {
        void stringifyError;
      }
    }
  }
  return sanitized;
}
function safeCountDevices(collection) {
  if (typeof countDeviceDatabaseEntries !== 'function') {
    return null;
  }
  if (!collection || _typeof(collection) !== 'object') {
    return collection === null ? 0 : null;
  }
  try {
    return countDeviceDatabaseEntries(collection);
  } catch (error) {
    void error;
  }
  return null;
}
function buildDeviceCountsSnapshot(currentDevices, importedDevices) {
  var snapshot = {};
  var existingCount = safeCountDevices(currentDevices);
  if (typeof existingCount === 'number') {
    snapshot.existing = existingCount;
  }
  var importedCount = safeCountDevices(importedDevices);
  if (typeof importedCount === 'number') {
    snapshot.imported = importedCount;
  }
  return Object.keys(snapshot).length > 0 ? snapshot : null;
}
function logDeviceImportEvent(level, message, detail, metaOverrides) {
  if (!eventsLogger || typeof eventsLogger[level] !== 'function') {
    return;
  }
  var meta = metaOverrides && _typeof(metaOverrides) === 'object' ? _objectSpread(_objectSpread({}, DEVICE_IMPORT_LOG_META), metaOverrides) : DEVICE_IMPORT_LOG_META;
  try {
    eventsLogger[level](message, detail || {}, meta);
  } catch (loggerError) {
    void loggerError;
  }
}
function resolveConsoleMethodForLevel(level) {
  if (typeof level !== 'string') {
    return 'log';
  }
  var normalized = level.toLowerCase();
  if (normalized === 'warn' || normalized === 'error' || normalized === 'info' || normalized === 'debug') {
    return normalized === 'debug' && typeof console !== 'undefined' && console && typeof console.debug !== 'function' ? 'log' : normalized;
  }
  return 'log';
}
function resolveCoreAutoBackupNamespace() {
  if (typeof require === 'function') {
    try {
      return require('./app-core-auto-backup.js');
    } catch (autoBackupRequireError) {
      void autoBackupRequireError;
    }
  }
  var candidateScopes = [getGlobalScope(), typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
  for (var index = 0; index < candidateScopes.length; index += 1) {
    var scope = candidateScopes[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      if (scope.CORE_AUTO_BACKUP && _typeof(scope.CORE_AUTO_BACKUP) === 'object') {
        return scope.CORE_AUTO_BACKUP;
      }
    } catch (lookupError) {
      void lookupError;
    }
  }
  return null;
}
var AUTO_BACKUP_LOGGER_NAMESPACE = resolveCoreAutoBackupNamespace();
var delegatedAutoBackupLogger = AUTO_BACKUP_LOGGER_NAMESPACE && typeof AUTO_BACKUP_LOGGER_NAMESPACE.logAutoBackupEvent === 'function' ? AUTO_BACKUP_LOGGER_NAMESPACE.logAutoBackupEvent : null;
function logAutoBackupEvent(level, message, detail, metaOverrides) {
  var resolvedLevel = typeof level === 'string' && level ? level : 'info';
  var resolvedMessage = typeof message === 'string' && message ? message : 'Auto backup event';
  var meta = metaOverrides && _typeof(metaOverrides) === 'object' ? _objectSpread(_objectSpread({}, AUTO_BACKUP_LOG_META), metaOverrides) : AUTO_BACKUP_LOG_META;
  var delegateHandled = false;
  if (delegatedAutoBackupLogger) {
    try {
      delegatedAutoBackupLogger(resolvedLevel, resolvedMessage, detail, meta);
      delegateHandled = true;
    } catch (delegateError) {
      delegateHandled = false;
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        try {
          console.warn('Auto backup delegate logging failed', delegateError);
        } catch (delegateConsoleError) {
          void delegateConsoleError;
        }
      }
    }
  }
  var handledByLogger = false;
  if (eventsLogger && typeof eventsLogger[resolvedLevel] === 'function') {
    try {
      eventsLogger[resolvedLevel](resolvedMessage, detail, meta);
      handledByLogger = true;
    } catch (loggerError) {
      if (eventsLogger && typeof eventsLogger.warn === 'function') {
        try {
          eventsLogger.warn('Auto backup logger invocation failed', loggerError, _objectSpread(_objectSpread({}, meta), {}, {
            originalLevel: resolvedLevel,
            originalMessage: resolvedMessage
          }));
        } catch (fallbackLogError) {
          void fallbackLogError;
        }
      }
    }
  }
  if (!(handledByLogger || delegateHandled) && typeof console !== 'undefined' && console) {
    var consoleMethod = resolveConsoleMethodForLevel(resolvedLevel);
    var fallback = typeof console[consoleMethod] === 'function' ? console[consoleMethod] : console.log;
    if (typeof fallback === 'function') {
      try {
        if (typeof detail !== 'undefined') {
          fallback.call(console, "[auto-backup] ".concat(resolvedMessage), detail);
        } else {
          fallback.call(console, "[auto-backup] ".concat(resolvedMessage));
        }
      } catch (consoleError) {
        void consoleError;
      }
    }
  }
}
function summarizeAutoBackupPayloadForLog(payload) {
  if (!payload || _typeof(payload) !== 'object') {
    return {
      hasContent: false
    };
  }
  var summary = {
    hasContent: false,
    projectInfoKeys: 0,
    gearListLength: 0,
    gearListAndProjectRequirementsGenerated: Boolean(payload.gearListAndProjectRequirementsGenerated),
    powerSelectionKeys: 0,
    gearSelectorGroups: 0,
    diagramPositionCount: 0,
    autoGearRuleCount: 0
  };
  var projectInfo = payload.projectInfo && _typeof(payload.projectInfo) === 'object' ? payload.projectInfo : null;
  if (projectInfo) {
    try {
      summary.projectInfoKeys = Object.keys(projectInfo).length;
    } catch (projectInfoError) {
      summary.projectInfoKeys = 0;
    }
  }
  if (typeof payload.gearList === 'string') {
    summary.gearListLength = payload.gearList.length;
  }
  var powerSelection = payload.powerSelection && _typeof(payload.powerSelection) === 'object' ? payload.powerSelection : null;
  if (powerSelection) {
    try {
      summary.powerSelectionKeys = Object.keys(powerSelection).length;
    } catch (powerSelectionError) {
      summary.powerSelectionKeys = 0;
    }
  }
  var gearSelectors = payload.gearSelectors && _typeof(payload.gearSelectors) === 'object' ? payload.gearSelectors : null;
  if (gearSelectors) {
    try {
      summary.gearSelectorGroups = Object.keys(gearSelectors).length;
    } catch (gearSelectorsError) {
      summary.gearSelectorGroups = 0;
    }
  }
  var diagramPositions = payload.diagramPositions && _typeof(payload.diagramPositions) === 'object' ? payload.diagramPositions : null;
  if (diagramPositions) {
    try {
      summary.diagramPositionCount = Object.keys(diagramPositions).length;
    } catch (diagramPositionsError) {
      summary.diagramPositionCount = 0;
    }
  }
  if (Array.isArray(payload.autoGearRules)) {
    summary.autoGearRuleCount = payload.autoGearRules.length;
  }
  summary.hasContent = Boolean(summary.projectInfoKeys || summary.gearListLength || summary.gearListAndProjectRequirementsGenerated || summary.powerSelectionKeys || summary.gearSelectorGroups || summary.diagramPositionCount || summary.autoGearRuleCount);
  return summary;
}
function resolveAutoBackupLogLevel(status, reason) {
  var normalizedStatus = typeof status === 'string' ? status : '';
  var normalizedReason = typeof reason === 'string' ? reason : '';
  if (normalizedStatus === 'error') {
    return 'error';
  }
  if (normalizedStatus === 'success') {
    return 'info';
  }
  if (normalizedStatus === 'skipped') {
    if (normalizedReason === 'disallowed' || normalizedReason === 'auto-backup-selected') {
      return 'warn';
    }
    return 'info';
  }
  return 'debug';
}
function resolveAutoBackupLogMessage(status, reason) {
  var normalizedStatus = typeof status === 'string' ? status : '';
  var normalizedReason = typeof reason === 'string' ? reason : '';
  if (normalizedStatus === 'success') {
    return 'Auto backup completed successfully';
  }
  if (normalizedStatus === 'error') {
    return normalizedReason ? "Auto backup failed (".concat(normalizedReason, ")") : 'Auto backup failed';
  }
  if (normalizedStatus === 'skipped') {
    return normalizedReason ? "Auto backup skipped (".concat(normalizedReason, ")") : 'Auto backup skipped';
  }
  return 'Auto backup run recorded';
}
function createDefaultAutoBackupLogDetail(result) {
  if (!result || _typeof(result) !== 'object') {
    return {
      status: 'unknown'
    };
  }
  var detail = {
    status: typeof result.status === 'string' ? result.status : 'unknown'
  };
  if (typeof result.reason === 'string' && result.reason) {
    detail.reason = result.reason;
  }
  if (typeof result.context === 'string' && result.context) {
    detail.context = result.context;
  }
  if (typeof result.elapsedSinceLastAutoBackupMs === 'number' && Number.isFinite(result.elapsedSinceLastAutoBackupMs)) {
    detail.elapsedSinceLastAutoBackupMs = Math.max(0, result.elapsedSinceLastAutoBackupMs);
  }
  if (typeof result.remainingIntervalMs === 'number' && Number.isFinite(result.remainingIntervalMs)) {
    detail.remainingIntervalMs = Math.max(0, result.remainingIntervalMs);
  }
  if (typeof result.changesSinceSnapshot === 'number' && Number.isFinite(result.changesSinceSnapshot)) {
    detail.changesSinceSnapshot = Math.max(0, result.changesSinceSnapshot);
  }
  if (typeof result.requiredChangeThreshold === 'number' && Number.isFinite(result.requiredChangeThreshold)) {
    detail.requiredChangeThreshold = Math.max(0, result.requiredChangeThreshold);
  }
  if (typeof result.remainingChanges === 'number' && Number.isFinite(result.remainingChanges)) {
    detail.remainingChanges = Math.max(0, result.remainingChanges);
  }
  if (typeof result.requiredIntervalMs === 'number' && Number.isFinite(result.requiredIntervalMs)) {
    detail.requiredIntervalMs = Math.max(0, result.requiredIntervalMs);
  }
  if (typeof result.name === 'string') {
    var trimmedName = result.name.trim();
    detail.hasName = trimmedName.length > 0;
    detail.nameLength = trimmedName.length;
    detail.nameWasAutoGenerated = trimmedName.startsWith('auto-backup-');
  }
  if (typeof result.createdAt === 'string' && result.createdAt) {
    detail.createdAt = result.createdAt;
  }
  return detail;
}
var AUTO_BACKUP_REASON_DEDUP_INTERVAL_MS = 2 * 60 * 1000;
var lastAutoBackupReasonState = new Map();
var AUTO_BACKUP_IMMEDIATE_COMMIT_DEBOUNCE_MS = 800;
var autoBackupChangesSinceSnapshot = 0;
var autoBackupThresholdInProgress = false;
var autoBackupChangePendingCommit = false;
var lastAutoBackupCompletedAtMs = 0;
var lastImmediateAutoBackupCommitAtMs = 0;
function resetAutoBackupChangeCounter() {
  autoBackupChangesSinceSnapshot = 0;
}
function recordAutoBackupRun(result, logDetailOverride) {
  autoBackupThresholdInProgress = false;
  if (!result || _typeof(result) !== 'object') {
    logAutoBackupEvent('warn', 'Auto backup run recorded without result metadata', {
      status: 'unknown'
    });
    return;
  }
  var status = typeof result.status === 'string' ? result.status : null;
  var reason = typeof result.reason === 'string' ? result.reason : null;
  var detail = logDetailOverride && _typeof(logDetailOverride) === 'object' ? _objectSpread({}, logDetailOverride) : createDefaultAutoBackupLogDetail(result);
  var level = resolveAutoBackupLogLevel(status, reason);
  var message = resolveAutoBackupLogMessage(status, reason);
  logAutoBackupEvent(level, message, detail);
  if (status === 'skipped') {
    if (reason === 'unchanged') {
      resetAutoBackupChangeCounter();
    }
    return;
  }
  if (status && status !== 'error') {
    resetAutoBackupChangeCounter();
    if (status === 'success') {
      lastAutoBackupCompletedAtMs = Date.now();
    }
  }
}
function isAutoBackupReasonAllowed(reason) {
  if (typeof reason !== 'string' || !reason) {
    return false;
  }
  return AUTO_BACKUP_ALLOWED_REASONS.includes(reason);
}
function showAutoBackupIndicatorSafe() {
  var scope = getGlobalScope();
  var indicator = scope && typeof scope.__cineShowAutoBackupIndicator === 'function' ? scope.__cineShowAutoBackupIndicator : null;
  if (!indicator) {
    return function () {};
  }
  try {
    var message = resolveAutoBackupIndicatorMessage();
    var hide = indicator(message);
    return typeof hide === 'function' ? hide : function () {};
  } catch (indicatorError) {
    console.warn('Failed to show auto backup indicator', indicatorError);
    return function () {};
  }
}
function triggerAutoBackupForChangeThreshold(details) {
  if (autoBackupThresholdInProgress) {
    return;
  }
  autoBackupThresholdInProgress = true;
  var run = function run() {
    try {
      autoBackup({
        suppressSuccess: true,
        triggerAutoSaveNotification: true,
        reason: 'change-threshold'
      });
    } catch (error) {
      console.warn('Failed to run auto backup after change threshold', error);
      autoBackupThresholdInProgress = false;
      logAutoBackupEvent('error', 'Auto backup change-threshold execution failed', {
        status: 'error',
        reason: 'change-threshold-run',
        errorName: error && typeof error.name === 'string' ? error.name : null,
        errorMessage: error && typeof error.message === 'string' ? error.message : null
      });
    }
  };
  if (typeof queueMicrotask === 'function') {
    try {
      queueMicrotask(run);
      return;
    } catch (queueError) {
      console.warn('Failed to queue auto backup microtask', queueError);
      logAutoBackupEvent('warn', 'Auto backup microtask scheduling failed', {
        status: 'skipped',
        reason: 'microtask-scheduling',
        errorName: queueError && typeof queueError.name === 'string' ? queueError.name : null,
        errorMessage: queueError && typeof queueError.message === 'string' ? queueError.message : null
      });
    }
  }
  var timer = setTimeout(run, 0);
  if (timer && typeof timer.unref === 'function') {
    timer.unref();
  }
}
function noteAutoBackupRelevantChange() {
  var details = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (details && details.reset === true) {
    resetAutoBackupChangeCounter();
    autoBackupChangePendingCommit = false;
    lastImmediateAutoBackupCommitAtMs = 0;
    return;
  }
  var pendingNotification = Boolean(details && details.pending === true);
  var commitRequested = Boolean(details && details.commit === true);
  var commitContext = details && _typeof(details.context) === 'object' && details.context !== null ? details.context : null;
  if (pendingNotification) {
    autoBackupChangePendingCommit = true;
    return;
  }
  if (commitRequested && !autoBackupChangePendingCommit && details.force !== true) {
    return;
  }
  if (commitRequested || autoBackupChangePendingCommit) {
    autoBackupChangePendingCommit = false;
    var immediateCommit = Boolean(commitContext && commitContext.immediate === true);
    if (immediateCommit) {
      var commitTimestamp = null;
      if (commitContext && typeof commitContext.completedAt === 'number' && Number.isFinite(commitContext.completedAt)) {
        commitTimestamp = commitContext.completedAt;
      } else if (commitContext && typeof commitContext.requestedAt === 'number' && Number.isFinite(commitContext.requestedAt)) {
        commitTimestamp = commitContext.requestedAt;
      }
      if (!Number.isFinite(commitTimestamp)) {
        commitTimestamp = Date.now();
      }
      if (details.force !== true && lastImmediateAutoBackupCommitAtMs > 0 && commitTimestamp >= lastImmediateAutoBackupCommitAtMs && commitTimestamp - lastImmediateAutoBackupCommitAtMs < AUTO_BACKUP_IMMEDIATE_COMMIT_DEBOUNCE_MS) {
        lastImmediateAutoBackupCommitAtMs = commitTimestamp;
        return;
      }
      if (commitTimestamp >= lastImmediateAutoBackupCommitAtMs || lastImmediateAutoBackupCommitAtMs <= 0) {
        lastImmediateAutoBackupCommitAtMs = commitTimestamp;
      }
    }
    autoBackupChangesSinceSnapshot = Math.min(AUTO_BACKUP_CHANGE_THRESHOLD, autoBackupChangesSinceSnapshot + 1);
    if (autoBackupChangesSinceSnapshot >= AUTO_BACKUP_CHANGE_THRESHOLD) {
      triggerAutoBackupForChangeThreshold(details);
    }
    return;
  }
  autoBackupChangesSinceSnapshot = Math.min(AUTO_BACKUP_CHANGE_THRESHOLD, autoBackupChangesSinceSnapshot + 1);
  if (autoBackupChangesSinceSnapshot >= AUTO_BACKUP_CHANGE_THRESHOLD) {
    triggerAutoBackupForChangeThreshold(details);
  }
}
try {
  var scope = getGlobalScope();
  if (scope) {
    scope.__cineNoteAutoBackupChange = noteAutoBackupRelevantChange;
  }
} catch (changeExposeError) {
  console.warn('Failed to expose auto backup change tracker', changeExposeError);
}
function markAutoBackupDataAsRenamed(value) {
  if (!value || _typeof(value) !== 'object') {
    return;
  }
  try {
    value[APP_EVENTS_AUTO_BACKUP_RENAMED_FLAG] = true;
  } catch (assignmentError) {
    void assignmentError;
  }
  var info = value.projectInfo;
  if (info && _typeof(info) === 'object') {
    try {
      info[APP_EVENTS_AUTO_BACKUP_RENAMED_FLAG] = true;
    } catch (infoError) {
      void infoError;
    }
  }
}
function callEventsCoreFunction(functionName) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (typeof callCoreFunctionIfAvailable === 'function') {
    return callCoreFunctionIfAvailable(functionName, args, options);
  }
  var scope = (typeof globalThis !== 'undefined' ? globalThis : null) || (typeof window !== 'undefined' ? window : null) || (typeof self !== 'undefined' ? self : null) || (typeof global !== 'undefined' ? global : null) || null;
  var target = typeof functionName === 'string' ? scope && scope[functionName] : functionName;
  if (typeof target === 'function') {
    try {
      return target.apply(scope, args);
    } catch (invokeError) {
      if (eventsLogger && typeof eventsLogger.error === 'function') {
        var metadata = {
          functionName: functionName,
          deferred: !!(options && options.defer),
          argumentsSnapshot: Array.isArray(args) ? args.slice(0, 5) : null
        };
        try {
          eventsLogger.error("Failed to invoke ".concat(functionName), invokeError, metadata);
        } catch (logError) {
          void logError;
        }
      }
      if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error("Failed to invoke ".concat(functionName), invokeError);
      }
    }
    return undefined;
  }
  if (options && options.defer === true) {
    var queue = scope && Array.isArray(scope.CORE_BOOT_QUEUE) ? scope.CORE_BOOT_QUEUE : null;
    if (queue) {
      queue.push(function () {
        callEventsCoreFunction(functionName, args, _objectSpread(_objectSpread({}, options), {}, {
          defer: false
        }));
      });
    }
  }
  return options && Object.prototype.hasOwnProperty.call(options, 'defaultValue') ? options.defaultValue : undefined;
}
var CORE_FUNCTION_MISSING_SENTINEL = Object.freeze({
  missing: true
});
var VIDEO_POWER_INPUT_HELPERS = function resolveVideoPowerInputHelpers() {
  if (typeof require === 'function') {
    try {
      var helpers = require('./modules/video-power-inputs.js');
      if (helpers && _typeof(helpers) === 'object') {
        return helpers;
      }
    } catch (helperError) {
      void helperError;
    }
  }
  return {};
}();
function invokeCoreFunctionStrict(functionName) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var result = callEventsCoreFunction(functionName, args, {
    defaultValue: CORE_FUNCTION_MISSING_SENTINEL
  });
  if (result === CORE_FUNCTION_MISSING_SENTINEL) {
    var error = new ReferenceError("Missing core function: ".concat(functionName));
    if (eventsLogger && typeof eventsLogger.error === 'function') {
      try {
        eventsLogger.error("Missing core function: ".concat(functionName), error);
      } catch (logError) {
        void logError;
      }
    }
    throw error;
  }
  return result;
}
function resolveFirstPowerInputType(device) {
  var result;
  try {
    result = callEventsCoreFunction('firstPowerInputType', [device]);
  } catch (error) {
    if (eventsLogger && typeof eventsLogger.warn === 'function') {
      try {
        eventsLogger.warn('Failed to resolve firstPowerInputType from core', error, {
          namespace: 'device-editor'
        });
      } catch (logError) {
        void logError;
      }
    }
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('Failed to resolve firstPowerInputType from core', error);
    }
  }
  if (typeof result === 'string') {
    return result;
  }
  if (Array.isArray(result) && result.length) {
    return typeof result[0] === 'string' ? result[0] : '';
  }
  if (result && _typeof(result) === 'object') {
    var candidate = result.type || result.portType;
    if (typeof candidate === 'string') {
      return candidate;
    }
  }
  return '';
}
function resolveCoreOptionsArray(functionName) {
  var existingValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var fallback = Array.isArray(existingValues) ? existingValues.slice() : [];
  try {
    var result = callEventsCoreFunction(functionName);
    if (Array.isArray(result)) {
      return result.slice();
    }
  } catch (coreError) {
    if (eventsLogger && typeof eventsLogger.warn === 'function') {
      try {
        eventsLogger.warn("Failed to resolve ".concat(functionName), coreError);
      } catch (logError) {
        void logError;
      }
    }
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn("Failed to resolve ".concat(functionName), coreError);
    }
  }
  return fallback;
}
function readGlobalArraySnapshot(key) {
  var scope = getGlobalScope();
  if (!scope || !key) {
    return [];
  }
  var value = scope[key];
  return Array.isArray(value) ? value.slice() : [];
}
function publishGlobalArraySnapshot(key, values) {
  var scope = getGlobalScope();
  if (!scope || !key) {
    return;
  }
  if (!Array.isArray(values)) {
    delete scope[key];
    return;
  }
  try {
    scope[key] = values.slice();
  } catch (error) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn("Failed to persist ".concat(key, " options on the global scope"), error);
    }
  }
}
function syncCoreOptionsArray(globalKey, functionName) {
  var existingValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var aggregated = [];
  var seen = new Set();
  var addValues = function addValues(values) {
    if (!Array.isArray(values)) {
      return;
    }
    for (var index = 0; index < values.length; index += 1) {
      var option = values[index];
      if (typeof option !== 'string') {
        continue;
      }
      if (!seen.has(option)) {
        seen.add(option);
        aggregated.push(option);
      }
    }
  };
  addValues(existingValues);
  addValues(readGlobalArraySnapshot(globalKey));
  var resolved = resolveCoreOptionsArray(functionName, aggregated);
  var finalValues = Array.isArray(resolved) ? resolved : aggregated;
  publishGlobalArraySnapshot(globalKey, finalValues);
  return finalValues;
}
var initialViewfinderTypeOptions = typeof viewfinderTypeOptions !== 'undefined' && Array.isArray(viewfinderTypeOptions) ? viewfinderTypeOptions : [];
viewfinderTypeOptions = syncCoreOptionsArray('viewfinderTypeOptions', 'getAllViewfinderTypes', initialViewfinderTypeOptions);
var initialViewfinderConnectorOptions = typeof viewfinderConnectorOptions !== 'undefined' && Array.isArray(viewfinderConnectorOptions) ? viewfinderConnectorOptions : [];
viewfinderConnectorOptions = syncCoreOptionsArray('viewfinderConnectorOptions', 'getAllViewfinderConnectors', initialViewfinderConnectorOptions);
function readCoreDeviceSelectionHelper() {
  if (typeof globalThis !== 'undefined' && typeof globalThis.hasAnyDeviceSelection === 'function') {
    return globalThis.hasAnyDeviceSelection;
  }
  if (typeof window !== 'undefined' && typeof window.hasAnyDeviceSelection === 'function') {
    return window.hasAnyDeviceSelection;
  }
  if (typeof self !== 'undefined' && typeof self.hasAnyDeviceSelection === 'function') {
    return self.hasAnyDeviceSelection;
  }
  if (typeof global !== 'undefined' && typeof global.hasAnyDeviceSelection === 'function') {
    return global.hasAnyDeviceSelection;
  }
  return null;
}
function refreshDeviceListsSafe() {
  if (typeof refreshDeviceLists === 'function') {
    try {
      refreshDeviceLists();
      return;
    } catch (refreshError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('refreshDeviceLists failed, retrying via core bridge.', refreshError);
      }
    }
  }
  if (typeof callEventsCoreFunction === 'function') {
    try {
      callEventsCoreFunction('refreshDeviceLists');
    } catch (bridgeError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Could not refresh device lists via core bridge.', bridgeError);
      }
    }
  }
}
function hasAnyDeviceSelectionSafe(state) {
  var coreHelper = readCoreDeviceSelectionHelper();
  if (coreHelper) {
    try {
      return coreHelper(state);
    } catch (error) {
      if (eventsLogger && typeof eventsLogger.warn === 'function') {
        var statePreview = state && _typeof(state) === 'object' ? Object.keys(state).slice(0, 10) : null;
        try {
          eventsLogger.warn('Failed to evaluate device selections via core helper', error, {
            statePreview: statePreview
          });
        } catch (logError) {
          void logError;
        }
      }
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Failed to evaluate device selections via core helper', error);
      }
    }
  }
  if (!state || _typeof(state) !== 'object') {
    return false;
  }
  var _isMeaningfulSelection = function isMeaningfulSelection(value) {
    if (Array.isArray(value)) {
      return value.some(function (item) {
        return _isMeaningfulSelection(item);
      });
    }
    if (value == null) {
      return false;
    }
    var normalized = typeof value === 'string' ? value.trim() : value;
    if (!normalized) {
      return false;
    }
    if (typeof normalized === 'string') {
      var lower = normalized.toLowerCase();
      if (lower === 'none') {
        return false;
      }
      if (lower === '--' || lower === '—' || lower === 'n/a' || lower === 'tbd' || lower === 'pending' || lower.startsWith('-- ') || lower.startsWith('— ') || lower.startsWith('select ') || lower.startsWith('choose ') || lower.startsWith('pick ') || lower.startsWith('add ')) {
        return false;
      }
    }
    return true;
  };
  var primarySelections = [state.camera, state.monitor, state.video, state.cage, state.batteryPlate, state.battery, state.batteryHotswap];
  if (primarySelections.some(function (value) {
    return _isMeaningfulSelection(value);
  })) {
    return true;
  }
  if (_isMeaningfulSelection(state.motors)) {
    return true;
  }
  if (_isMeaningfulSelection(state.controllers)) {
    return true;
  }
  if (_isMeaningfulSelection(state.distance)) {
    return true;
  }
  return false;
}
function getEventsCoreValue(functionName) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var defaultValue = Object.prototype.hasOwnProperty.call(options, 'defaultValue') ? options.defaultValue : '';
  var value = callEventsCoreFunction(functionName, [], {
    defaultValue: defaultValue
  });
  if (typeof value === 'string') {
    return value;
  }
  if (value === null || value === undefined) {
    return defaultValue;
  }
  try {
    return String(value);
  } catch (coerceError) {
    void coerceError;
    return defaultValue;
  }
}
function storeLoadedSetupStateSafe(state) {
  callEventsCoreFunction('storeLoadedSetupState', [state], {
    defaultValue: undefined
  });
}
function resolveCineUi() {
  var scopes = [];
  if (typeof globalThis !== 'undefined') scopes.push(globalThis);
  if (typeof window !== 'undefined') scopes.push(window);
  if (typeof self !== 'undefined') scopes.push(self);
  if (typeof global !== 'undefined') scopes.push(global);
  for (var index = 0; index < scopes.length; index += 1) {
    var _scope = scopes[index];
    if (!_scope || _typeof(_scope) !== 'object') {
      continue;
    }
    try {
      if (_scope.cineUi && _typeof(_scope.cineUi) === 'object') {
        return _scope.cineUi;
      }
    } catch (error) {
      void error;
    }
  }
  return null;
}
function getSetupSelectElement() {
  if (typeof setupSelect !== 'undefined' && setupSelect) {
    return setupSelect;
  }
  if (typeof document !== 'undefined' && document) {
    var element = document.getElementById('setupSelect');
    if (element) {
      return element;
    }
  }
  return null;
}
function addSafeEventListener(target, type, handler, options) {
  if (!target || typeof target.addEventListener !== 'function') return;
  target.addEventListener(type, handler, options);
}
var eventsCineUiRegistered = false;
function enqueueCineUiRegistration(callback) {
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  if (!scope || typeof callback !== 'function') {
    return;
  }
  try {
    var existing = scope.cineUi && _typeof(scope.cineUi) === 'object' ? scope.cineUi : null;
    if (existing) {
      callback(existing);
      return;
    }
  } catch (callbackError) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('cineUi registration callback failed', callbackError);
    }
    return;
  }
  var key = '__cineUiReadyQueue';
  if (!Array.isArray(scope[key])) {
    scope[key] = [];
  }
  scope[key].push(callback);
}
enqueueCineUiRegistration(registerEventsCineUiInternal);
addSafeEventListener(languageSelect, "change", function (event) {
  var updateDropdowns = function updateDropdowns() {
    if (typeof populateUserButtonDropdowns === 'function') {
      try {
        populateUserButtonDropdowns();
      } catch (userButtonError) {
        console.warn('Failed to refresh user button selectors after manual language change', userButtonError);
      }
    }
  };
  try {
    var result = setLanguage(event.target.value);
    if (result && typeof result.then === 'function') {
      result.then(updateDropdowns).catch(function (error) {
        console.warn('Language selection update failed', error);
      });
      return;
    }
  } catch (languageError) {
    console.warn('Language selection handler threw', languageError);
  }
  updateDropdowns();
});
addSafeEventListener(skipLink, "click", function () {
  var main = document.getElementById("mainContent");
  if (main) main.focus();
});
function handleSaveSetupClick() {
  if (typeof applyPendingProjectNameCollisionResolution === 'function') {
    try {
      applyPendingProjectNameCollisionResolution();
    } catch (pendingError) {
      console.warn('Failed to finalize pending project name collision before saving setup', pendingError);
    }
  }
  var typedName = setupNameInput.value.trim();
  if (!typedName) {
    alert(texts[currentLang].alertSetupName);
    return;
  }
  var currentSetup = _objectSpread({}, getCurrentSetupState());
  var langTexts = texts[currentLang] || {};
  var fallbackTexts = texts.en || {};
  var hasDeviceSelection = hasAnyDeviceSelectionSafe(currentSetup);
  var gearListHtml = getCurrentGearListHtml();
  if (gearListHtml) {
    currentSetup.gearList = gearListHtml;
  }
  var setupSelectElement = getSetupSelectElement();
  var selectedName = setupSelectElement && typeof setupSelectElement.value === 'string' ? setupSelectElement.value : '';
  var renamingExisting = Boolean(selectedName && typedName && selectedName !== typedName);
  var renamingAutoBackup = renamingExisting && typeof selectedName === 'string' && selectedName.startsWith('auto-backup-');
  var setups = getSetups();
  var finalName = typedName;
  var storedProjectSnapshot = null;
  if (renamingExisting) {
    if (typeof loadProject === 'function') {
      try {
        storedProjectSnapshot = loadProject(selectedName);
      } catch (error) {
        console.warn('Failed to load project data while renaming setup', error);
      }
    }
    if (typeof renameSetup === 'function') {
      try {
        var renamed = renameSetup(selectedName, typedName);
        if (typeof renamed === 'string' && renamed) {
          finalName = renamed;
        }
      } catch (error) {
        console.warn('Failed to rename setup in storage', error);
      }
      setups = getSetups();
    } else if (Object.prototype.hasOwnProperty.call(setups, selectedName)) {
      setups[typedName] = setups[selectedName];
      delete setups[selectedName];
      finalName = typedName;
    }
  }
  var finalIsAutoBackup = typeof finalName === 'string' && finalName.startsWith('auto-backup-');
  if (renamingAutoBackup && finalIsAutoBackup) {
    markAutoBackupDataAsRenamed(currentSetup);
  }
  setups[finalName] = currentSetup;
  storeSetups(setups);
  if (renamingExisting && storedProjectSnapshot && typeof saveProject === 'function') {
    try {
      if (renamingAutoBackup && finalIsAutoBackup) {
        markAutoBackupDataAsRenamed(storedProjectSnapshot);
      }
      saveProject(finalName, storedProjectSnapshot, {
        skipOverwriteBackup: true
      });
    } catch (error) {
      console.warn('Failed to preserve project data during setup rename', error);
    }
  }
  populateSetupSelect();
  setupNameInput.value = finalName;
  if (setupSelectElement) {
    setupSelectElement.value = finalName;
  }
  lastSetupName = finalName;
  saveCurrentSession();
  storeLoadedSetupStateSafe(getCurrentSetupState());
  checkSetupChanged();
  saveCurrentGearList();
  if (renamingExisting && selectedName && selectedName !== finalName) {
    if (typeof deleteProject === 'function') {
      try {
        deleteProject(selectedName);
      } catch (error) {
        console.warn('Failed to remove old project entry during setup rename', error);
      }
    } else if (typeof saveProject === 'function') {
      try {
        saveProject(selectedName, {
          projectInfo: null,
          gearList: ''
        }, {
          skipOverwriteBackup: true
        });
      } catch (error) {
        console.warn('Failed to clear legacy project entry during setup rename', error);
      }
    }
  }
  if (saveSetupBtn) {
    saveSetupBtn.disabled = !setupNameInput.value.trim();
  }
  var saveAlertTemplate = hasDeviceSelection ? langTexts.alertSetupSaved || fallbackTexts.alertSetupSaved : langTexts.alertSetupSavedNoDevices || fallbackTexts.alertSetupSavedNoDevices || langTexts.alertSetupSaved || fallbackTexts.alertSetupSaved;
  if (typeof saveAlertTemplate === 'string' && saveAlertTemplate) {
    alert(saveAlertTemplate.replace("{name}", finalName));
  }
}
addSafeEventListener(saveSetupBtn, "click", handleSaveSetupClick);
function handleDeleteSetupClick() {
  var setupSelectElement = getSetupSelectElement();
  var setupName = setupSelectElement && typeof setupSelectElement.value === 'string' ? setupSelectElement.value : '';
  if (!setupName) {
    alert(texts[currentLang].alertNoSetupSelected);
    return;
  }
  if (confirm(texts[currentLang].confirmDeleteSetup.replace("{name}", setupName)) && confirm(texts[currentLang].confirmDeleteSetupAgain)) {
    var backupName = ensureAutoBackupBeforeDeletion('delete setup');
    if (!backupName) {
      return;
    }
    var setups = getSetups();
    delete setups[setupName];
    storeSetups(setups);
    if (typeof deleteProject === 'function') {
      deleteProject(setupName);
    }
    populateSetupSelect();
    setupNameInput.value = "";
    var selectionResetHandled = false;
    if (setupSelectElement && typeof setupSelectElement.dispatchEvent === 'function') {
      lastSetupName = '';
      setupSelectElement.value = "";
      setupSelectElement.dispatchEvent(new Event('change'));
      selectionResetHandled = true;
    }
    if (!selectionResetHandled) {
      if (gearListOutput) {
        gearListOutput.innerHTML = '';
        gearListOutput.classList.add('hidden');
      }
      if (projectRequirementsOutput) {
        projectRequirementsOutput.innerHTML = '';
        projectRequirementsOutput.classList.add('hidden');
      }
      currentProjectInfo = null;
      if (projectForm) populateProjectForm({});
      storeLoadedSetupStateSafe(null);
      updateBatteryPlateVisibility();
      updateBatteryOptions();
      clearProjectAutoGearRules();
      renderAutoGearRulesList();
      updateAutoGearCatalogOptions();
      [cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect].forEach(function (sel) {
        var noneOption = Array.from(sel.options).find(function (opt) {
          return opt.value === "None";
        });
        if (noneOption) {
          sel.value = "None";
        } else {
          sel.selectedIndex = 0;
        }
      });
      if (typeof updateCageSelectOptions === 'function') {
        updateCageSelectOptions('None');
      }
      var sbSel = getSliderBowlSelect();
      if (sbSel) sbSel.value = '';
      motorSelects.forEach(function (sel) {
        if (sel.options.length) sel.value = "None";
      });
      controllerSelects.forEach(function (sel) {
        if (sel.options.length) sel.value = "None";
      });
      updateCalculations();
    }
    alert(texts[currentLang].alertSetupDeleted.replace("{name}", setupName));
  }
}
addSafeEventListener(deleteSetupBtn, "click", handleDeleteSetupClick);
function resetSetupStateToDefaults() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var suspendable = typeof suspendProjectPersistence === 'function' && typeof resumeProjectPersistence === 'function';
  if (suspendable) {
    try {
      suspendProjectPersistence();
    } catch (error) {
      console.warn('Failed to suspend project persistence during setup reset', error);
    }
  }
  var config = _typeof(options) === 'object' && options !== null ? options : {};
  var preserveSetupNameInput = Boolean(config.preserveSetupNameInput);
  try {
    if (!preserveSetupNameInput && setupNameInput) {
      setupNameInput.value = "";
    }
    var resetSelectToDefault = function resetSelectToDefault(select) {
      if (!select || _typeof(select) !== 'object') return;
      var isCameraSelect = select === cameraSelect;
      var noneOption = Array.from(select.options || []).find(function (opt) {
        return opt.value === "None";
      });
      if (noneOption) {
        select.value = "None";
      } else if (select.options && select.options.length) {
        select.selectedIndex = 0;
      } else {
        select.value = "";
      }
      if (isCameraSelect) {
        callEventsCoreFunction('updateRecordingMediaOptions');
      }
    };
    [cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect].forEach(resetSelectToDefault);
    if (typeof updateCageSelectOptions === 'function') {
      try {
        updateCageSelectOptions('None');
      } catch (error) {
        console.warn('Failed to reset cage options while preparing setup switch', error);
      }
    }
    var sliderBowlSelect = typeof getSliderBowlSelect === 'function' ? getSliderBowlSelect() : null;
    if (sliderBowlSelect) {
      sliderBowlSelect.value = '';
    }
    if (Array.isArray(motorSelects)) {
      motorSelects.forEach(resetSelectToDefault);
    }
    if (Array.isArray(controllerSelects)) {
      controllerSelects.forEach(resetSelectToDefault);
    }
    if (typeof updateBatteryPlateVisibility === 'function') {
      try {
        updateBatteryPlateVisibility();
      } catch (error) {
        console.warn('Failed to reset battery plate visibility while preparing setup switch', error);
      }
    }
    if (typeof updateBatteryOptions === 'function') {
      try {
        updateBatteryOptions();
      } catch (error) {
        console.warn('Failed to reset battery options while preparing setup switch', error);
      }
    }
    if (typeof displayGearAndRequirements === 'function') {
      try {
        displayGearAndRequirements('');
      } catch (error) {
        console.warn('Failed to reset gear and requirements display while preparing setup switch', error);
      }
    }
    if (gearListOutput) {
      gearListOutput.innerHTML = '';
      gearListOutput.classList.add('hidden');
    }
    if (projectRequirementsOutput) {
      projectRequirementsOutput.innerHTML = '';
      projectRequirementsOutput.classList.add('hidden');
    }
    currentProjectInfo = null;
    if (projectForm) {
      try {
        populateProjectForm({});
      } catch (error) {
        console.warn('Failed to reset project form while preparing setup switch', error);
      }
    }
    if (typeof clearProjectAutoGearRules === 'function') {
      try {
        clearProjectAutoGearRules();
      } catch (error) {
        console.warn('Failed to clear project auto gear rules while preparing setup switch', error);
      }
    }
    if (typeof setManualDiagramPositions === 'function') {
      try {
        setManualDiagramPositions({}, {
          render: false
        });
      } catch (error) {
        console.warn('Failed to reset manual diagram positions while preparing setup switch', error);
      }
    }
    try {
      storeLoadedSetupStateSafe(null);
    } catch (error) {
      console.warn('Failed to reset stored setup state while preparing setup switch', error);
    }
    if (typeof globalThis !== 'undefined') {
      globalThis.__cineLastGearListHtml = '';
    }
  } finally {
    if (suspendable) {
      try {
        resumeProjectPersistence();
      } catch (error) {
        console.warn('Failed to resume project persistence after setup reset', error);
      }
    }
  }
}
function finalizeSetupSelection(nextSetupName) {
  if (typeof renderAutoGearRulesList === 'function') {
    try {
      renderAutoGearRulesList();
    } catch (error) {
      console.warn('Failed to render auto gear rules list after setup switch', error);
    }
  }
  if (typeof updateAutoGearCatalogOptions === 'function') {
    try {
      updateAutoGearCatalogOptions();
    } catch (error) {
      console.warn('Failed to update auto gear catalog options after setup switch', error);
    }
  }
  if (saveSetupBtn) {
    saveSetupBtn.disabled = !setupNameInput.value.trim();
  }
  if (typeof updateCalculations === 'function') {
    try {
      updateCalculations();
    } catch (error) {
      console.warn('Failed to update calculations after setup switch', error);
    }
  }
  if (typeof checkSetupChanged === 'function') {
    try {
      checkSetupChanged();
    } catch (error) {
      console.warn('Failed to evaluate setup changes after setup switch', error);
    }
  }
  if (typeof setActiveProjectCompressionHold === 'function') {
    setActiveProjectCompressionHold(nextSetupName);
  }
  lastSetupName = nextSetupName;
}
var setupSelectTarget = getSetupSelectElement();
addSafeEventListener(setupSelectTarget, "change", function (event) {
  var setupName = event.target.value;
  var rawTypedName = setupNameInput && typeof setupNameInput.value === 'string' ? setupNameInput.value : '';
  var typedName = rawTypedName.trim();
  var previousKey = (lastSetupName && typeof lastSetupName === 'string' ? lastSetupName : '') || typedName || '';
  if (typeof setActiveProjectCompressionHold === 'function') {
    setActiveProjectCompressionHold(previousKey);
  }
  var normalizeProjectName = function normalizeProjectName(value) {
    return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
  };
  var normalizedLastSelection = normalizeProjectName(lastSetupName);
  var normalizedTargetSelection = normalizeProjectName(setupName);
  var autoSaveFlushed = false;
  if (typeof scheduleProjectAutoSave === 'function') {
    try {
      var normalizeForOverride = typeof normalizeSetupName === 'function' ? normalizeSetupName : function (value) {
        return typeof value === 'string' ? value.trim() : '';
      };
      var previousSelection = normalizeForOverride(typeof lastSetupName === 'string' ? lastSetupName : '');
      var storageKeyOverride = normalizeForOverride(previousKey);
      var overrides = {
        setupNameState: {
          typedName: typedName,
          selectedName: previousSelection,
          storageKey: storageKeyOverride,
          renameInProgress: Boolean(previousSelection && typedName && typedName !== previousSelection),
          typedNameHasTrailingWhitespace: Boolean(typedName && typeof rawTypedName === 'string' && /\s$/.test(rawTypedName))
        }
      };
      scheduleProjectAutoSave({
        immediate: true,
        overrides: overrides
      });
      autoSaveFlushed = true;
    } catch (error) {
      console.warn('Failed to flush project autosave before switching setups', error);
    }
  }
  if (!autoSaveFlushed) {
    try {
      if (typeof saveCurrentSession === 'function') {
        saveCurrentSession();
      }
      if (typeof saveCurrentGearList === 'function') {
        saveCurrentGearList();
      }
    } catch (error) {
      console.warn('Failed to persist project state before switching setups', error);
    }
  }
  if (typeof saveProject === 'function') {
    var info = projectForm ? collectProjectFormData() : {};
    if (info) {
      info.sliderBowl = getEventsCoreValue('getSliderBowlValue');
      info.easyrig = getEventsCoreValue('getEasyrigValue');
    }
    var previousProjectInfo = deriveProjectInfo(info);
    currentProjectInfo = previousProjectInfo;
    var _normalizeForOverride = typeof normalizeSetupName === 'function' ? normalizeSetupName : function (value) {
      return typeof value === 'string' ? value.trim() : '';
    };
    var normalizedPreviousKey = _normalizeForOverride(previousKey);
    var normalizedTypedName = _normalizeForOverride(typedName);
    var renameInProgressForPrevious = Boolean(normalizedPreviousKey && normalizedTypedName && normalizedTypedName !== normalizedPreviousKey);
    var projectInfoForStorage = typeof createProjectInfoSnapshotForStorage === 'function' ? createProjectInfoSnapshotForStorage(previousProjectInfo, {
      projectNameOverride: renameInProgressForPrevious ? normalizedPreviousKey : undefined
    }) : previousProjectInfo;
    var previousPowerSelection = typeof getPowerSelectionSnapshot === 'function' ? getPowerSelectionSnapshot() : null;
    var previousPayload = {
      projectInfo: projectInfoForStorage,
      gearList: getCurrentGearListHtml()
    };
    if (previousPowerSelection) {
      previousPayload.powerSelection = previousPowerSelection;
    }
    if (typeof getDiagramManualPositions === 'function') {
      var diagramPositions = getDiagramManualPositions();
      if (diagramPositions && Object.keys(diagramPositions).length) {
        previousPayload.diagramPositions = diagramPositions;
      }
    }
    var previousRules = getProjectScopedAutoGearRules();
    if (previousRules && previousRules.length) {
      previousPayload.autoGearRules = previousRules;
    }
    saveProject(previousKey, previousPayload, {
      skipOverwriteBackup: true
    });
  }
  if (typeof autoBackup === 'function' && normalizedTargetSelection !== normalizedLastSelection) {
    try {
      autoBackup({
        suppressSuccess: true,
        projectNameOverride: normalizeProjectName(previousKey),
        triggerAutoSaveNotification: true,
        reason: 'project-switch'
      });
    } catch (error) {
      console.warn('Failed to auto backup project before loading a different setup', error);
    }
  }
  resetSetupStateToDefaults();
  if (setupName === "") {
    finalizeSetupSelection(setupName);
    return;
  }
  {
    var setups = getSetups();
    var setup = setups[setupName];
    if (setup) {
      setupNameInput.value = setupName;
      cameraSelect.value = setup.camera || 'None';
      callEventsCoreFunction('updateRecordingMediaOptions');
      updateBatteryPlateVisibility();
      batteryPlateSelect.value = setup.batteryPlate || batteryPlateSelect.value;
      applyBatteryPlateSelectionFromBattery(setup.battery || '', batteryPlateSelect.value);
      monitorSelect.value = setup.monitor || 'None';
      videoSelect.value = setup.video || 'None';
      if (typeof updateCageSelectOptions === 'function') {
        updateCageSelectOptions(setup.cage || 'None');
      } else if (cageSelect) {
        cageSelect.value = setup.cage || 'None';
      }
      (setup.motors || []).forEach(function (val, i) {
        if (motorSelects[i]) motorSelects[i].value = val;
      });
      (setup.controllers || []).forEach(function (val, i) {
        if (controllerSelects[i]) controllerSelects[i].value = val;
      });
      distanceSelect.value = setup.distance || 'None';
      batterySelect.value = setup.battery || 'None';
      applyBatteryPlateSelectionFromBattery(setup.battery || '', batteryPlateSelect ? batteryPlateSelect.value : '');
      hotswapSelect.value = setup.batteryHotswap || 'None';
      setSliderBowlValue(setup.sliderBowl || '');
      setEasyrigValue(setup.easyrig || '');
      var storedPowerApplied = false;
      if (setup.powerSelection && typeof applyStoredPowerSelection === 'function') {
        storedPowerApplied = applyStoredPowerSelection(setup.powerSelection, {
          preferExisting: false
        });
      }
      var storedProject = typeof loadProject === 'function' ? loadProject(setupName) : null;
      if (!storedPowerApplied && storedProject && typeof applyStoredPowerSelection === 'function' && storedProject.powerSelection) {
        storedPowerApplied = applyStoredPowerSelection(storedProject.powerSelection, {
          preferExisting: false
        });
      }
      updateBatteryOptions();
      if (!storedPowerApplied && storedProject && typeof applyStoredPowerSelection === 'function' && storedProject.powerSelection) {
        storedPowerApplied = applyStoredPowerSelection(storedProject.powerSelection, {
          preferExisting: false
        });
        if (storedPowerApplied) {
          updateBatteryOptions();
        }
      }
      var storedHtml = typeof setup.gearList === 'string' && setup.gearList ? setup.gearList : typeof (storedProject === null || storedProject === void 0 ? void 0 : storedProject.gearList) === 'string' ? storedProject.gearList : '';
      currentProjectInfo = setup.projectInfo || (storedProject === null || storedProject === void 0 ? void 0 : storedProject.projectInfo) || null;
      var regenerateGearList = function regenerateGearList(info) {
        return callEventsCoreFunction('generateGearListHtml', [info || {}], {
          defaultValue: ''
        }) || '';
      };
      var html = storedHtml;
      if (!html) {
        html = regenerateGearList(currentProjectInfo || {});
      }
      if (html && typeof globalThis !== 'undefined') {
        globalThis.__cineLastGearListHtml = html;
      }
      if (typeof setManualDiagramPositions === 'function') {
        var _diagramPositions = {};
        if (typeof normalizeDiagramPositionsInput === 'function') {
          _diagramPositions = normalizeDiagramPositionsInput(storedProject === null || storedProject === void 0 ? void 0 : storedProject.diagramPositions);
          var setupDiagramPositions = normalizeDiagramPositionsInput(setup.diagramPositions);
          if (Object.keys(setupDiagramPositions).length) {
            _diagramPositions = _objectSpread(_objectSpread({}, _diagramPositions), setupDiagramPositions);
          }
        }
        setManualDiagramPositions(_diagramPositions, {
          render: false
        });
      }
      var projectRulesSource = Array.isArray(setup.autoGearRules) && setup.autoGearRules.length ? setup.autoGearRules : Array.isArray(storedProject === null || storedProject === void 0 ? void 0 : storedProject.autoGearRules) && storedProject.autoGearRules.length ? storedProject.autoGearRules : null;
      if (projectRulesSource) {
        useProjectAutoGearRules(projectRulesSource);
      } else {
        clearProjectAutoGearRules();
      }
      if (gearListOutput) {
        displayGearAndRequirements(html);
        populateProjectForm(currentProjectInfo || {});
        if (html) {
          ensureGearListActions();
          bindGearListCageListener();
          bindGearListEasyrigListener();
          bindGearListSliderBowlListener();
          bindGearListEyeLeatherListener();
          bindGearListProGaffTapeListener();
          bindGearListDirectorMonitorListener();
        }
        if (typeof saveProject === 'function') {
          var payload = {
            projectInfo: currentProjectInfo,
            gearListAndProjectRequirementsGenerated: Boolean(html)
          };
          var currentPowerSelection = typeof getPowerSelectionSnapshot === 'function' ? getPowerSelectionSnapshot() : null;
          if (currentPowerSelection) {
            payload.powerSelection = currentPowerSelection;
          }
          if (typeof getDiagramManualPositions === 'function') {
            var _diagramPositions2 = getDiagramManualPositions();
            if (_diagramPositions2 && Object.keys(_diagramPositions2).length) {
              payload.diagramPositions = _diagramPositions2;
            }
          }
          var activeRules = getProjectScopedAutoGearRules();
          if (activeRules && activeRules.length) {
            payload.autoGearRules = activeRules;
          }
          if (setup.gearSelectors && Object.keys(setup.gearSelectors).length) {
            payload.gearSelectors = setup.gearSelectors;
          } else if (storedProject !== null && storedProject !== void 0 && storedProject.gearSelectors && Object.keys(storedProject.gearSelectors).length) {
            payload.gearSelectors = storedProject.gearSelectors;
          }
          saveProject(setupName, payload, {
            skipOverwriteBackup: true
          });
        }
      }
    } else {
      var _storedProject = typeof loadProject === 'function' ? loadProject(setupName) : null;
      if (_storedProject && typeof applyStoredPowerSelection === 'function' && _storedProject.powerSelection) {
        var applied = applyStoredPowerSelection(_storedProject.powerSelection, {
          preferExisting: false
        });
        if (applied) {
          updateBatteryOptions();
        }
      } else {
        updateBatteryOptions();
      }
      currentProjectInfo = (_storedProject === null || _storedProject === void 0 ? void 0 : _storedProject.projectInfo) || null;
      if (projectForm) populateProjectForm(currentProjectInfo || {});
      if (gearListOutput) {
        var _regenerateGearList = function _regenerateGearList(info) {
          return callEventsCoreFunction('generateGearListHtml', [info || {}], {
            defaultValue: ''
          }) || '';
        };
        var _storedHtml = typeof (_storedProject === null || _storedProject === void 0 ? void 0 : _storedProject.gearList) === 'string' ? _storedProject.gearList : '';
        var _html = _storedHtml || _regenerateGearList(currentProjectInfo || {});
        displayGearAndRequirements(_html);
        if (_html) {
          ensureGearListActions();
          bindGearListCageListener();
          bindGearListEasyrigListener();
          bindGearListSliderBowlListener();
          bindGearListEyeLeatherListener();
          bindGearListProGaffTapeListener();
          bindGearListDirectorMonitorListener();
        }
      } else {
        displayGearAndRequirements('');
      }
      clearProjectAutoGearRules();
      if (typeof setManualDiagramPositions === 'function') {
        var normalizedDiagram = _storedProject !== null && _storedProject !== void 0 && _storedProject.diagramPositions && typeof normalizeDiagramPositionsInput === 'function' ? normalizeDiagramPositionsInput(_storedProject.diagramPositions) : {};
        setManualDiagramPositions(normalizedDiagram || {}, {
          render: false
        });
      }
    }
    storeLoadedSetupStateSafe(getCurrentSetupState());
  }
  finalizeSetupSelection(setupName);
});
function populateSetupSelect() {
  var setupsProvider = typeof getSetups === 'function' ? getSetups : null;
  var setupSelectTarget = getSetupSelectElement();
  if (!setupSelectTarget) {
    console.warn('populateSetupSelect: setup select element unavailable, aborting populate');
    return;
  }
  var textBundle = (typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object' && texts ? texts[currentLang] || texts.en || {} : {};
  var newSetupOptionLabel = typeof textBundle.newSetupOption === 'string' && textBundle.newSetupOption.trim() ? textBundle.newSetupOption : 'New setup';
  if (!setupsProvider) {
    console.warn('populateSetupSelect: getSetups is unavailable, using empty setup list');
  }
  var setups = setupsProvider ? setupsProvider() || {} : {};
  setupSelectTarget.innerHTML = "<option value=\"\">".concat(newSetupOptionLabel, "</option>");
  var includeAutoBackups = false;
  if (typeof showAutoBackups === 'boolean') {
    includeAutoBackups = showAutoBackups;
  } else if (typeof localStorage !== 'undefined') {
    try {
      includeAutoBackups = localStorage.getItem('showAutoBackups') === 'true';
    } catch (error) {
      console.warn('Could not read auto backup visibility preference', error);
    }
  }
  if (includeAutoBackups && typeof ensureAutoBackupsFromProjects === 'function') {
    try {
      ensureAutoBackupsFromProjects();
    } catch (error) {
      console.warn('Failed to prepare auto backups before populating selector', error);
    }
  }
  var names = Object.keys(setups).filter(function (name) {
    return includeAutoBackups || !name.startsWith('auto-backup-');
  }).sort(function (a, b) {
    var autoA = a.startsWith('auto-backup-');
    var autoB = b.startsWith('auto-backup-');
    if (autoA !== autoB) return autoA ? 1 : -1;
    return localeSort(a, b);
  });
  var _iterator = _createForOfIteratorHelper(names),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var name = _step.value;
      var opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      setupSelectTarget.appendChild(opt);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
populateSetupSelect();
checkSetupChanged();
function notifyAutoSaveFromBackup(message, backupName, severity) {
  if (typeof message !== 'string') {
    return;
  }
  var trimmed = message.trim();
  if (!trimmed) {
    return;
  }
  var notificationSeverity = typeof severity === 'string' && severity.trim() ? severity.trim() : 'success';
  if (typeof showNotification === 'function') {
    try {
      showNotification(notificationSeverity, trimmed);
    } catch (notifyError) {
      console.warn('Failed to display auto save notification after auto backup', notifyError);
    }
  }
  if (typeof document !== 'undefined' && typeof CustomEvent === 'function' && document && typeof document.dispatchEvent === 'function') {
    try {
      document.dispatchEvent(new CustomEvent('cine:auto-save-notification', {
        detail: {
          message: trimmed,
          source: 'auto-backup',
          backupName: backupName || null,
          severity: notificationSeverity,
          timestamp: new Date().toISOString()
        }
      }));
    } catch (eventError) {
      console.warn('Failed to dispatch auto save notification event after auto backup', eventError);
    }
  }
}
var AUTO_BACKUP_MAX_DELTA_SEQUENCE = 30;
var lastAutoBackupSignature = null;
var lastAutoBackupName = null;
var lastAutoBackupCreatedAtIso = null;
function createStableValueSignature(value) {
  if (value === null) {
    return 'null';
  }
  if (value === undefined) {
    return 'undefined';
  }
  if (Array.isArray(value)) {
    var signature = '[';
    for (var index = 0; index < value.length; index += 1) {
      if (index > 0) {
        signature += ',';
      }
      signature += createStableValueSignature(value[index]);
    }
    signature += ']';
    return signature;
  }
  if (value instanceof Date) {
    var timestamp = value.getTime();
    if (Number.isNaN(timestamp)) {
      return 'date:invalid';
    }
    return "date:".concat(timestamp);
  }
  var valueType = _typeof(value);
  if (valueType === 'number') {
    if (Number.isNaN(value)) {
      return 'number:NaN';
    }
    if (!Number.isFinite(value)) {
      return value > 0 ? 'number:Infinity' : 'number:-Infinity';
    }
    return "number:".concat(value);
  }
  if (valueType === 'bigint') {
    return "bigint:".concat(value.toString());
  }
  if (valueType === 'boolean') {
    return value ? 'boolean:true' : 'boolean:false';
  }
  if (valueType === 'string') {
    return "string:".concat(value);
  }
  if (valueType === 'symbol') {
    return "symbol:".concat(String(value));
  }
  if (valueType === 'function') {
    return "function:".concat(value.name || 'anonymous');
  }
  if (valueType === 'object') {
    var keys = Object.keys(value).sort();
    var _signature = '{';
    for (var _index2 = 0; _index2 < keys.length; _index2 += 1) {
      var key = keys[_index2];
      if (_index2 > 0) {
        _signature += ',';
      }
      _signature += "".concat(JSON.stringify(key), ":").concat(createStableValueSignature(value[key]));
    }
    _signature += '}';
    return _signature;
  }
  return "".concat(valueType, ":").concat(String(value));
}
function computeAutoBackupStateSignature(setupState, gearSelectors, gearListGenerated) {
  return createStableValueSignature({
    setup: setupState || null,
    gearSelectors: gearSelectors || null,
    gearListGenerated: Boolean(gearListGenerated)
  });
}
function hasMeaningfulAutoBackupContent(setupState, gearSelectors, gearListGenerated) {
  var hasDeviceSelection = hasAnyDeviceSelectionSafe(setupState);
  var hasProjectInfo = Boolean(setupState && _typeof(setupState) === 'object' && setupState.projectInfo);
  var hasAutoGearRules = Array.isArray(setupState && setupState.autoGearRules) && setupState.autoGearRules.length > 0;
  var hasDiagramPositions = Boolean(setupState && setupState.diagramPositions && _typeof(setupState.diagramPositions) === 'object' && Object.keys(setupState.diagramPositions).length > 0);
  var hasGearSelectors = Boolean(gearSelectors && _typeof(gearSelectors) === 'object' && Object.keys(gearSelectors).length > 0);
  var hasPowerSelection = Boolean(setupState && setupState.powerSelection && _typeof(setupState.powerSelection) === 'object' && Object.keys(setupState.powerSelection).length > 0);
  var hasGeneratedGear = Boolean(gearListGenerated);
  return hasDeviceSelection || hasProjectInfo || hasAutoGearRules || hasDiagramPositions || hasGearSelectors || hasPowerSelection || hasGeneratedGear;
}
function getSortedAutoBackupNames(setups) {
  if (!setups || _typeof(setups) !== 'object') {
    return [];
  }
  return Object.keys(setups).filter(function (name) {
    return typeof name === 'string' && name.startsWith('auto-backup-');
  }).sort();
}
function resolveLatestAutoBackupEntry(setups) {
  var names = getSortedAutoBackupNames(setups);
  if (!names.length) {
    return {
      name: null,
      entry: null
    };
  }
  var latestName = names[names.length - 1];
  var latestEntry = setups && _typeof(setups) === 'object' ? setups[latestName] : null;
  return {
    name: latestName,
    entry: latestEntry
  };
}
function computeStoredAutoBackupSignature(name, entry) {
  if (!entry || _typeof(entry) !== 'object') {
    return createStableValueSignature(null);
  }
  var gearSelectors = null;
  if (entry.gearSelectors && _typeof(entry.gearSelectors) === 'object') {
    gearSelectors = entry.gearSelectors;
  }
  var gearListGenerated = false;
  if (typeof loadProject === 'function' && name) {
    try {
      var storedProject = loadProject(name);
      if (storedProject && _typeof(storedProject) === 'object') {
        if (!gearSelectors && storedProject.gearSelectors && _typeof(storedProject.gearSelectors) === 'object') {
          gearSelectors = storedProject.gearSelectors;
        }
        if (typeof storedProject.gearListAndProjectRequirementsGenerated === 'boolean') {
          gearListGenerated = storedProject.gearListAndProjectRequirementsGenerated;
        }
      }
    } catch (error) {
      console.warn('Failed to inspect stored project payload for auto backup signature', error);
    }
  }
  return computeAutoBackupStateSignature(entry, gearSelectors, gearListGenerated);
}
function ensureLastAutoBackupSignatureInitialized(setups) {
  if (lastAutoBackupSignature || !setups || _typeof(setups) !== 'object') {
    return;
  }
  var _resolveLatestAutoBac = resolveLatestAutoBackupEntry(setups),
    name = _resolveLatestAutoBac.name,
    entry = _resolveLatestAutoBac.entry;
  if (!name || !entry || _typeof(entry) !== 'object') {
    return;
  }
  try {
    lastAutoBackupSignature = computeStoredAutoBackupSignature(name, entry);
    lastAutoBackupName = name;
    var metadata = readAutoBackupMetadata(entry);
    if (metadata && typeof metadata.createdAt === 'string') {
      lastAutoBackupCreatedAtIso = metadata.createdAt;
      var parsed = Date.parse(metadata.createdAt);
      if (!Number.isNaN(parsed)) {
        lastAutoBackupCompletedAtMs = parsed;
      }
    }
  } catch (error) {
    lastAutoBackupSignature = null;
    console.warn('Failed to prime automatic backup signature cache', error);
  }
}
function readAutoBackupMetadata(entry) {
  if (!entry || _typeof(entry) !== 'object') {
    return null;
  }
  var metadata = entry.__cineAutoBackupMetadata;
  if (!metadata || _typeof(metadata) !== 'object') {
    return null;
  }
  return metadata;
}
function attachAutoBackupMetadata(target, metadata) {
  if (!target || _typeof(target) !== 'object') {
    return;
  }
  var snapshotMetadata = metadata && _typeof(metadata) === 'object' ? {
    version: typeof metadata.version === 'number' ? metadata.version : 1,
    snapshotType: metadata.snapshotType === 'delta' ? 'delta' : 'full',
    base: typeof metadata.base === 'string' ? metadata.base : null,
    sequence: typeof metadata.sequence === 'number' ? metadata.sequence : 0,
    createdAt: typeof metadata.createdAt === 'string' ? metadata.createdAt : null,
    changedKeys: Array.isArray(metadata.changedKeys) ? metadata.changedKeys.slice() : [],
    removedKeys: Array.isArray(metadata.removedKeys) ? metadata.removedKeys.slice() : []
  } : null;
  try {
    Object.defineProperty(target, '__cineAutoBackupMetadata', {
      configurable: true,
      enumerable: false,
      writable: true,
      value: snapshotMetadata
    });
  } catch (error) {
    try {
      target.__cineAutoBackupMetadata = snapshotMetadata;
    } catch (assignmentError) {
      void assignmentError;
    }
  }
}
function determineNextAutoBackupPlan(setups) {
  if (!setups || _typeof(setups) !== 'object') {
    return {
      snapshotType: 'full',
      base: null,
      sequence: 0
    };
  }
  var autoBackupNames = getSortedAutoBackupNames(setups);
  if (!autoBackupNames.length) {
    return {
      snapshotType: 'full',
      base: null,
      sequence: 0
    };
  }
  var latestName = autoBackupNames[autoBackupNames.length - 1];
  var latestEntry = setups[latestName];
  var latestMetadata = readAutoBackupMetadata(latestEntry);
  if (!latestEntry || !latestMetadata) {
    return {
      snapshotType: 'full',
      base: null,
      sequence: 0
    };
  }
  var latestSequence = typeof latestMetadata.sequence === 'number' ? latestMetadata.sequence : 0;
  if (latestSequence >= AUTO_BACKUP_MAX_DELTA_SEQUENCE) {
    return {
      snapshotType: 'full',
      base: null,
      sequence: 0
    };
  }
  return {
    snapshotType: 'delta',
    base: latestName,
    sequence: latestSequence + 1
  };
}
function autoBackup() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var setupSelectElement = getSetupSelectElement();
  if (!setupSelectElement) return null;
  var config = _typeof(options) === 'object' && options !== null ? options : {};
  var suppressSuccess = Boolean(config.suppressSuccess);
  var suppressError = Boolean(config.suppressError);
  var force = config.force === true;
  var reason = typeof config.reason === 'string' && config.reason ? config.reason : 'unspecified';
  var successMessage = typeof config.successMessage === 'string' && config.successMessage ? config.successMessage : 'Auto backup saved';
  var errorMessage = typeof config.errorMessage === 'string' && config.errorMessage ? config.errorMessage : 'Auto backup failed';
  var triggerAutoSaveNotification = Boolean(config.triggerAutoSaveNotification);
  var autoSaveNotificationMessage = typeof config.autoSaveNotificationMessage === 'string' && config.autoSaveNotificationMessage.trim() ? config.autoSaveNotificationMessage.trim() : successMessage;
  var normalizeProjectName = function normalizeProjectName(value) {
    return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
  };
  var hasProjectNameOverride = Object.prototype.hasOwnProperty.call(config, 'projectNameOverride');
  var overrideName = hasProjectNameOverride ? normalizeProjectName(config.projectNameOverride) : null;
  var selectedName = typeof setupSelectElement.value === 'string' ? setupSelectElement.value : '';
  var typedName = setupNameInput && typeof setupNameInput.value === 'string' ? setupNameInput.value : '';
  var normalizedSelectedName = normalizeProjectName(selectedName);
  var normalizedTypedName = normalizeProjectName(typedName);
  var isAutoBackupName = function isAutoBackupName(name) {
    return typeof name === 'string' && name.startsWith('auto-backup-');
  };
  var nowMs = Date.now();
  var lastCompletedMs = lastAutoBackupCompletedAtMs || 0;
  var elapsedSinceLastAutoBackupMs = nowMs - lastCompletedMs;
  var enoughTimeElapsedSinceLastBackup = elapsedSinceLastAutoBackupMs >= AUTO_BACKUP_INTERVAL_MS;
  var enoughChangesAccumulated = autoBackupChangesSinceSnapshot >= AUTO_BACKUP_CHANGE_THRESHOLD;
  var enforceCadence = !force && !AUTO_BACKUP_CADENCE_EXEMPT_REASONS.has(reason);
  if (enforceCadence && !enoughTimeElapsedSinceLastBackup && !enoughChangesAccumulated) {
    var remainingIntervalMs = Math.max(0, AUTO_BACKUP_INTERVAL_MS - elapsedSinceLastAutoBackupMs);
    var skipped = {
      status: 'skipped',
      reason: 'cadence',
      context: reason,
      elapsedSinceLastAutoBackupMs: elapsedSinceLastAutoBackupMs,
      changesSinceSnapshot: autoBackupChangesSinceSnapshot,
      requiredIntervalMs: AUTO_BACKUP_INTERVAL_MS,
      requiredChangeThreshold: AUTO_BACKUP_CHANGE_THRESHOLD,
      remainingIntervalMs: remainingIntervalMs,
      remainingChanges: Math.max(0, AUTO_BACKUP_CHANGE_THRESHOLD - autoBackupChangesSinceSnapshot)
    };
    if (typeof console !== 'undefined' && typeof console.debug === 'function') {
      console.debug('Skipping auto backup because cadence requirements are not met.', skipped);
    }
    recordAutoBackupRun(skipped);
    return skipped;
  }
  if (!force && !isAutoBackupReasonAllowed(reason)) {
    var _skipped = {
      status: 'skipped',
      reason: 'disallowed',
      context: reason || null
    };
    if (typeof console !== 'undefined' && typeof console.debug === 'function') {
      console.debug('Skipping auto backup run because the trigger is not permitted.', {
        trigger: reason
      });
    }
    recordAutoBackupRun(_skipped);
    return _skipped;
  }
  if (!force && AUTO_BACKUP_RATE_LIMITED_REASONS.has(reason)) {
    var _nowMs = Date.now();
    var _lastCompletedMs = lastAutoBackupCompletedAtMs || 0;
    var elapsedMs = _nowMs - _lastCompletedMs;
    var enoughTimeElapsed = elapsedMs >= AUTO_BACKUP_INTERVAL_MS;
    var _enoughChangesAccumulated = autoBackupChangesSinceSnapshot >= AUTO_BACKUP_CHANGE_THRESHOLD;
    if (!enoughTimeElapsed && !_enoughChangesAccumulated) {
      var _skipped2 = {
        status: 'skipped',
        reason: 'rate-limited',
        context: reason
      };
      recordAutoBackupRun(_skipped2);
      return _skipped2;
    }
  }
  var nameForBackup = '';
  if (overrideName !== null && overrideName !== undefined) {
    if (overrideName && isAutoBackupName(overrideName)) {
      var _skipped3 = {
        status: 'skipped',
        reason: 'auto-backup-selected',
        context: reason
      };
      recordAutoBackupRun(_skipped3);
      return _skipped3;
    }
    nameForBackup = overrideName;
  } else if (normalizedSelectedName && isAutoBackupName(normalizedSelectedName)) {
    if (normalizedTypedName && !isAutoBackupName(normalizedTypedName) && normalizedTypedName !== normalizedSelectedName) {
      nameForBackup = normalizedTypedName;
    } else {
      var _skipped4 = {
        status: 'skipped',
        reason: 'auto-backup-selected',
        context: reason
      };
      recordAutoBackupRun(_skipped4);
      return _skipped4;
    }
  } else if (normalizedSelectedName) {
    nameForBackup = normalizedSelectedName;
  } else if (normalizedTypedName) {
    nameForBackup = normalizedTypedName;
  }
  var hideIndicator = null;
  try {
    hideIndicator = showAutoBackupIndicatorSafe();
  } catch (indicatorError) {
    console.warn('Failed to prepare auto backup indicator', indicatorError);
    hideIndicator = null;
  }
  try {
    var pad = function pad(n) {
      return String(n).padStart(2, '0');
    };
    var now = new Date();
    var baseName = "auto-backup-".concat(now.getFullYear(), "-").concat(pad(now.getMonth() + 1), "-").concat(pad(now.getDate()), "-").concat(pad(now.getHours()), "-").concat(pad(now.getMinutes()));
    var normalizedName = nameForBackup || '';
    var backupName = normalizedName ? "".concat(baseName, "-").concat(normalizedName) : baseName;
    var currentSetup = _objectSpread({}, getCurrentSetupState());
    var setupsSnapshot = getSetups();
    ensureLastAutoBackupSignatureInitialized(setupsSnapshot);
    var plan = determineNextAutoBackupPlan(setupsSnapshot);
    var resolvedPlan = plan;
    if (plan.snapshotType === 'delta') {
      var baseEntry = plan.base && setupsSnapshot ? setupsSnapshot[plan.base] : null;
      if (!baseEntry || _typeof(baseEntry) !== 'object') {
        resolvedPlan = {
          snapshotType: 'full',
          base: null,
          sequence: 0
        };
      }
    }
    var currentGearListHtml = getCurrentGearListHtml();
    var gearListGenerated = Boolean(currentGearListHtml);
    var payloadSummaryForLog = null;
    currentSetup.gearListAndProjectRequirementsGenerated = gearListGenerated;
    var gearSelectorsRaw = callEventsCoreFunction('getGearListSelectors', [], {
      defaultValue: {}
    }) || {};
    var gearSelectors = callEventsCoreFunction('cloneGearListSelectors', [gearSelectorsRaw], {
      defaultValue: {}
    }) || {};
    if (!hasMeaningfulAutoBackupContent(currentSetup, gearSelectors, gearListGenerated)) {
      var _skipped5 = {
        status: 'skipped',
        reason: 'empty',
        context: reason
      };
      recordAutoBackupRun(_skipped5);
      return _skipped5;
    }
    if (gearSelectors && Object.keys(gearSelectors).length) {
      currentSetup.gearSelectors = gearSelectors;
    }
    var currentSignature = computeAutoBackupStateSignature(currentSetup, gearSelectors, gearListGenerated);
    var _resolveLatestAutoBac2 = resolveLatestAutoBackupEntry(setupsSnapshot),
      latestStoredName = _resolveLatestAutoBac2.name,
      latestStoredEntry = _resolveLatestAutoBac2.entry;
    if (!force && latestStoredName && latestStoredEntry) {
      try {
        var latestStoredSignature = computeStoredAutoBackupSignature(latestStoredName, latestStoredEntry);
        if (latestStoredSignature === currentSignature) {
          var latestMetadata = readAutoBackupMetadata(latestStoredEntry);
          var latestCreatedAt = latestMetadata && typeof latestMetadata.createdAt === 'string' ? latestMetadata.createdAt : null;
          lastAutoBackupSignature = currentSignature;
          lastAutoBackupName = latestStoredName;
          lastAutoBackupCreatedAtIso = latestCreatedAt;
          recordAutoBackupRun({
            status: 'skipped',
            reason: 'unchanged',
            name: latestStoredName,
            createdAt: latestCreatedAt,
            context: reason
          });
          lastAutoBackupReasonState.set(reason, {
            timestamp: now.valueOf(),
            signature: currentSignature
          });
          return {
            status: 'skipped',
            reason: 'unchanged',
            name: latestStoredName,
            createdAt: latestCreatedAt,
            context: reason
          };
        }
      } catch (signatureCompareError) {
        console.warn('Failed to compare current auto backup against latest snapshot before saving', signatureCompareError);
      }
    }
    if (!force) {
      var lastReasonState = lastAutoBackupReasonState.get(reason);
      if (lastReasonState) {
        var elapsedSinceReason = now.valueOf() - lastReasonState.timestamp;
        if (elapsedSinceReason < AUTO_BACKUP_REASON_DEDUP_INTERVAL_MS && lastReasonState.signature === currentSignature) {
          var _skipped6 = {
            status: 'skipped',
            reason: 'duplicate-reason',
            name: lastAutoBackupName || null,
            createdAt: lastAutoBackupCreatedAtIso || null,
            context: reason
          };
          recordAutoBackupRun(_skipped6);
          return _skipped6;
        }
      }
    }
    if (!force && lastAutoBackupSignature && currentSignature === lastAutoBackupSignature) {
      var _skipped7 = {
        status: 'skipped',
        reason: 'unchanged',
        name: lastAutoBackupName || null,
        createdAt: lastAutoBackupCreatedAtIso || null,
        context: reason
      };
      recordAutoBackupRun(_skipped7);
      return _skipped7;
    }
    var timestamp = now.toISOString();
    var backupMetadata = {
      version: 1,
      snapshotType: resolvedPlan.snapshotType,
      base: resolvedPlan.base,
      sequence: resolvedPlan.sequence,
      createdAt: timestamp,
      changedKeys: [],
      removedKeys: []
    };
    attachAutoBackupMetadata(currentSetup, backupMetadata);
    var setups = setupsSnapshot;
    setups[backupName] = currentSetup;
    storeSetups(setups);
    if (typeof saveProject === 'function') {
      var gearListText = typeof currentGearListHtml === 'string' ? currentGearListHtml : '';
      var projectInfoSnapshot = currentSetup.projectInfo || null;
      if (projectInfoSnapshot && typeof createProjectInfoSnapshotForStorage === 'function') {
        try {
          projectInfoSnapshot = createProjectInfoSnapshotForStorage(projectInfoSnapshot) || projectInfoSnapshot;
        } catch (projectInfoSnapshotError) {
          console.warn('Failed to normalize project info for auto backup payload', projectInfoSnapshotError);
        }
      }
      if (projectInfoSnapshot && typeof callEventsCoreFunction === 'function') {
        try {
          var clonedInfo = callEventsCoreFunction('cloneProjectInfoForStorage', [projectInfoSnapshot], {
            defaultValue: projectInfoSnapshot
          });
          if (clonedInfo) {
            projectInfoSnapshot = clonedInfo;
          }
        } catch (projectInfoCloneError) {
          console.warn('Failed to clone project info for auto backup payload', projectInfoCloneError);
        }
      }
      var payload = {
        projectInfo: projectInfoSnapshot,
        gearListAndProjectRequirementsGenerated: Boolean(gearListText)
      };
      if (gearListText) {
        payload.gearList = gearListText;
      }
      var currentPowerSelection = typeof getPowerSelectionSnapshot === 'function' ? getPowerSelectionSnapshot() : null;
      if (currentPowerSelection && _typeof(currentPowerSelection) === 'object' && Object.keys(currentPowerSelection).length) {
        payload.powerSelection = currentPowerSelection;
      }
      if (gearSelectors && Object.keys(gearSelectors).length) {
        payload.gearSelectors = gearSelectors;
      }
      if (typeof getDiagramManualPositions === 'function') {
        try {
          var diagramPositions = getDiagramManualPositions();
          if (diagramPositions && _typeof(diagramPositions) === 'object' && Object.keys(diagramPositions).length) {
            payload.diagramPositions = diagramPositions;
          }
        } catch (diagramError) {
          console.warn('Failed to capture diagram positions for auto backup payload', diagramError);
        }
      }
      var activeRules = getProjectScopedAutoGearRules();
      if (activeRules && activeRules.length) {
        var clonedRules = activeRules;
        if (typeof callEventsCoreFunction === 'function') {
          try {
            clonedRules = callEventsCoreFunction('cloneProjectInfoForStorage', [activeRules], {
              defaultValue: activeRules
            }) || activeRules;
          } catch (ruleCloneError) {
            console.warn('Failed to clone auto gear rules for auto backup payload', ruleCloneError);
          }
        }
        payload.autoGearRules = clonedRules;
      }
      var hasPayloadContent = Boolean(payload.projectInfo && _typeof(payload.projectInfo) === 'object' && Object.keys(payload.projectInfo).length || payload.gearList || payload.gearListAndProjectRequirementsGenerated || payload.powerSelection && Object.keys(payload.powerSelection).length || payload.gearSelectors && Object.keys(payload.gearSelectors).length || payload.diagramPositions && Object.keys(payload.diagramPositions).length || payload.autoGearRules && payload.autoGearRules.length);
      if (hasPayloadContent) {
        attachAutoBackupMetadata(payload, backupMetadata);
        saveProject(backupName, payload);
        payloadSummaryForLog = summarizeAutoBackupPayloadForLog(payload);
      } else {
        payloadSummaryForLog = summarizeAutoBackupPayloadForLog(payload);
      }
    }
    var prevValue = setupSelectElement.value;
    var prevName = setupNameInput ? setupNameInput.value : '';
    populateSetupSelect();
    setupSelectElement.value = prevValue;
    if (setupNameInput) setupNameInput.value = prevName;
    if (!suppressSuccess) {
      showNotification('success', successMessage);
    }
    if (triggerAutoSaveNotification) {
      notifyAutoSaveFromBackup(autoSaveNotificationMessage, backupName);
    }
    lastAutoBackupSignature = currentSignature;
    lastAutoBackupName = backupName;
    lastAutoBackupCreatedAtIso = timestamp;
    var successLogDetail = {
      status: 'success',
      reason: reason,
      context: reason,
      snapshotType: resolvedPlan.snapshotType,
      hasPlanBase: Boolean(resolvedPlan.base),
      sequence: resolvedPlan.sequence,
      appendedProjectName: Boolean(nameForBackup),
      backupNameLength: typeof backupName === 'string' ? backupName.length : 0,
      changesSinceSnapshot: autoBackupChangesSinceSnapshot,
      elapsedSinceLastAutoBackupMs: elapsedSinceLastAutoBackupMs,
      force: force,
      gearListGenerated: gearListGenerated,
      payloadSummary: payloadSummaryForLog || null
    };
    recordAutoBackupRun({
      status: 'success',
      name: backupName,
      createdAt: timestamp,
      context: reason
    }, successLogDetail);
    lastAutoBackupReasonState.set(reason, {
      timestamp: now.valueOf(),
      signature: currentSignature
    });
    return backupName;
  } catch (e) {
    console.warn('Auto backup failed', e);
    if (!suppressError) {
      showNotification('error', errorMessage);
    }
    var errorDetail = {
      status: 'error',
      reason: 'exception',
      context: reason,
      errorName: e && typeof e.name === 'string' ? e.name : null,
      errorMessage: e && typeof e.message === 'string' ? e.message : null
    };
    if (e && typeof e.stack === 'string' && e.stack) {
      var stackPreview = e.stack.split('\n').slice(0, 5).join('\n');
      errorDetail.errorStackPreview = stackPreview;
    }
    recordAutoBackupRun({
      status: 'error',
      reason: 'exception',
      context: reason
    }, errorDetail);
    return null;
  } finally {
    if (typeof hideIndicator === 'function') {
      try {
        hideIndicator();
      } catch (hideError) {
        console.warn('Failed to hide auto backup indicator', hideError);
      }
    }
  }
}
function ensureAutoBackupBeforeDeletion(context) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = _typeof(options) === 'object' && options !== null ? options : {};
  var langTexts = texts[currentLang] || {};
  var fallbackTexts = texts.en || {};
  var successMessage = config.successMessage || langTexts.preDeleteBackupSuccess || fallbackTexts.preDeleteBackupSuccess || 'Automatic backup saved. Restore it anytime from Saved Projects.';
  var failureMessage = config.failureMessage || langTexts.preDeleteBackupFailed || fallbackTexts.preDeleteBackupFailed || 'Automatic backup failed. The action was cancelled.';
  var setupSelectElement = getSetupSelectElement();
  var normalizeProjectName = function normalizeProjectName(value) {
    return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
  };
  var selectedName = setupSelectElement && typeof setupSelectElement.value === 'string' ? normalizeProjectName(setupSelectElement.value) : '';
  var typedName = setupNameInput && typeof setupNameInput.value === 'string' ? normalizeProjectName(setupNameInput.value) : '';
  var rememberedName = normalizeProjectName(typeof lastSetupName === 'string' ? lastSetupName : '');
  var isAutoBackupName = function isAutoBackupName(name) {
    return typeof name === 'string' && name.startsWith('auto-backup-');
  };
  var candidateNames = [selectedName, typedName, rememberedName];
  var activeProjectName = candidateNames.find(function (name) {
    return name && !isAutoBackupName(name);
  }) || '';
  if (!activeProjectName) {
    if (config.notifyFailure !== false) {
      showNotification('error', failureMessage);
    }
    return null;
  }
  if (typeof scheduleProjectAutoSave === 'function') {
    try {
      scheduleProjectAutoSave(true);
    } catch (autoSaveError) {
      console.warn('Failed to flush project autosave before deletion backup', autoSaveError);
    }
  }
  var backupOutcome = {
    status: 'unsupported'
  };
  if (typeof createProjectDeletionBackup === 'function') {
    try {
      backupOutcome = createProjectDeletionBackup(activeProjectName);
    } catch (error) {
      console.error("Automatic backup before ".concat(context || 'deletion', " failed"), error);
      backupOutcome = {
        status: 'failed'
      };
    }
  }
  if (backupOutcome.status === 'created' || backupOutcome.status === 'skipped') {
    if (backupOutcome.status === 'created') {
      noteAutoBackupRelevantChange({
        reset: true
      });
    }
    if (config.notifySuccess !== false) {
      showNotification('success', successMessage);
    }
    return typeof backupOutcome.backupName === 'string' && backupOutcome.backupName ? backupOutcome.backupName : activeProjectName;
  }
  if (typeof console !== 'undefined' && typeof console.warn === 'function') {
    console.warn("Automatic backup before ".concat(context || 'deletion', " failed."), backupOutcome);
  }
  if (config.notifyFailure !== false) {
    showNotification('error', failureMessage);
  }
  return null;
}
var QUEUED_BACKUP_GESTURE_EVENTS = ['pointerdown', 'keydown', 'touchstart'];
var queuedBackupBanner = null;
var queuedBackupBannerMessageEl = null;
var queuedBackupBannerActionEl = null;
var queuedBackupGestureBound = false;
var queuedBackupFlushScheduled = false;
var queuedBackupFlushInProgress = false;
var autoBackupSchedulerTimer = null;
var autoGearBackupSchedulerTimer = null;
var hourlyBackupSchedulerTimer = null;
function getQueuedBackupBannerTexts() {
  var langTexts = (typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object' && texts && texts[currentLang] || {};
  var fallbackTexts = (typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object' && texts && texts.en || {};
  return {
    singular: langTexts.queuedBackupBannerMessageOne || fallbackTexts.queuedBackupBannerMessageOne || '1 backup saved in the local vault.',
    plural: langTexts.queuedBackupBannerMessageOther || fallbackTexts.queuedBackupBannerMessageOther || '{count} backups saved in the local vault.',
    gesture: langTexts.queuedBackupBannerGesture || fallbackTexts.queuedBackupBannerGesture || 'Interact with the planner to export them safely.',
    action: langTexts.queuedBackupBannerAction || fallbackTexts.queuedBackupBannerAction || 'Open local backup vault',
    fallbackHint: langTexts.queuedBackupFallbackHint || fallbackTexts.queuedBackupFallbackHint || 'Emergency fallback storage active. Export queued backups immediately.'
  };
}
function ensureQueuedBackupBannerElements() {
  if (typeof document === 'undefined') {
    return null;
  }
  if (queuedBackupBanner && queuedBackupBannerMessageEl && queuedBackupBannerActionEl) {
    return queuedBackupBanner;
  }
  var banner = document.createElement('section');
  banner.id = 'cineQueuedBackupBanner';
  banner.style.position = 'fixed';
  banner.style.right = '1.5rem';
  banner.style.left = '1.5rem';
  banner.style.bottom = '1.5rem';
  banner.style.maxWidth = '28rem';
  banner.style.marginLeft = 'auto';
  banner.style.padding = '1rem 1.25rem';
  banner.style.borderRadius = '1.25rem';
  banner.style.background = 'rgba(15, 22, 36, 0.92)';
  banner.style.color = '#f5f7fb';
  banner.style.boxShadow = '0 1.5rem 3.5rem rgba(5, 8, 17, 0.28)';
  banner.style.zIndex = '9999';
  banner.style.display = 'none';
  banner.style.flexDirection = 'column';
  banner.style.gap = '0.75rem';
  banner.setAttribute('role', 'status');
  banner.setAttribute('aria-live', 'assertive');
  banner.setAttribute('aria-hidden', 'true');
  var messageEl = document.createElement('p');
  messageEl.style.margin = '0';
  messageEl.style.lineHeight = '1.5';
  messageEl.style.fontSize = '0.95rem';
  var actionEl = document.createElement('button');
  actionEl.type = 'button';
  actionEl.style.alignSelf = 'flex-start';
  actionEl.style.background = '#ffbf3c';
  actionEl.style.color = '#11131a';
  actionEl.style.border = 'none';
  actionEl.style.borderRadius = '999px';
  actionEl.style.padding = '0.55rem 1.5rem';
  actionEl.style.fontWeight = '600';
  actionEl.style.cursor = 'pointer';
  actionEl.addEventListener('click', function (event) {
    try {
      event.preventDefault();
    } catch (preventDefaultError) {
      void preventDefaultError;
    }
    if (typeof openQueuedBackupVaultWindowForEvents === 'function') {
      Promise.resolve().then(function () {
        return openQueuedBackupVaultWindowForEvents();
      }).catch(function (vaultError) {
        console.warn('Failed to open queued backup vault window', vaultError);
      });
    }
  });
  banner.appendChild(messageEl);
  banner.appendChild(actionEl);
  try {
    (document.body || document.documentElement).appendChild(banner);
  } catch (appendError) {
    console.warn('Failed to attach queued backup banner to document', appendError);
  }
  queuedBackupBanner = banner;
  queuedBackupBannerMessageEl = messageEl;
  queuedBackupBannerActionEl = actionEl;
  return banner;
}
function showQueuedBackupBanner(count, fallbackActive) {
  var banner = ensureQueuedBackupBannerElements();
  if (!banner || !queuedBackupBannerMessageEl || !queuedBackupBannerActionEl) {
    return;
  }
  var textsForBanner = getQueuedBackupBannerTexts();
  var countValue = typeof count === 'number' && Number.isFinite(count) ? count : 1;
  var baseMessageTemplate = countValue === 1 ? textsForBanner.singular : textsForBanner.plural;
  var message = baseMessageTemplate.replace('{count}', String(countValue));
  var gesture = textsForBanner.gesture.replace('{count}', String(countValue));
  var parts = ["".concat(message, " ").concat(gesture).trim()];
  if (fallbackActive) {
    parts.push(textsForBanner.fallbackHint);
  }
  queuedBackupBannerMessageEl.textContent = parts.join(' ').trim();
  queuedBackupBannerActionEl.textContent = textsForBanner.action;
  banner.style.display = 'flex';
  banner.setAttribute('aria-hidden', 'false');
  attachQueuedBackupGestureListeners();
}
function hideQueuedBackupBanner() {
  if (!queuedBackupBanner) {
    return;
  }
  queuedBackupBanner.style.display = 'none';
  queuedBackupBanner.setAttribute('aria-hidden', 'true');
}
function attachQueuedBackupGestureListeners() {
  if (queuedBackupGestureBound || typeof document === 'undefined') {
    return;
  }
  var handler = handleQueuedBackupGesture;
  for (var index = 0; index < QUEUED_BACKUP_GESTURE_EVENTS.length; index += 1) {
    var eventName = QUEUED_BACKUP_GESTURE_EVENTS[index];
    try {
      document.addEventListener(eventName, handler, {
        passive: true
      });
    } catch (listenerError) {
      document.addEventListener(eventName, handler);
    }
  }
  queuedBackupGestureBound = true;
}
function detachQueuedBackupGestureListeners() {
  if (!queuedBackupGestureBound || typeof document === 'undefined') {
    return;
  }
  var handler = handleQueuedBackupGesture;
  for (var index = 0; index < QUEUED_BACKUP_GESTURE_EVENTS.length; index += 1) {
    var eventName = QUEUED_BACKUP_GESTURE_EVENTS[index];
    try {
      document.removeEventListener(eventName, handler, {
        passive: true
      });
    } catch (listenerError) {
      document.removeEventListener(eventName, handler);
    }
  }
  queuedBackupGestureBound = false;
}
function handleQueuedBackupGesture() {
  requestQueuedBackupFlush('gesture');
}
function requestQueuedBackupFlush(trigger) {
  if (queuedBackupFlushScheduled) {
    return;
  }
  if (typeof getQueuedBackupPayloadsForEvents !== 'function' || typeof downloadBackupPayloadForEvents !== 'function') {
    return;
  }
  queuedBackupFlushScheduled = true;
  Promise.resolve().then(function () {
    queuedBackupFlushScheduled = false;
    flushQueuedBackupVault(trigger);
  });
}
function updateQueuedBackupBannerFromVault() {
  if (typeof getQueuedBackupPayloadsForEvents !== 'function') {
    hideQueuedBackupBanner();
    detachQueuedBackupGestureListeners();
    return Promise.resolve(0);
  }
  return Promise.resolve(getQueuedBackupPayloadsForEvents()).then(function (entries) {
    var count = Array.isArray(entries) ? entries.length : 0;
    var fallbackActive = typeof isBackupVaultFallbackActiveForEvents === 'function' ? Boolean(isBackupVaultFallbackActiveForEvents()) : false;
    if (count > 0) {
      showQueuedBackupBanner(count, fallbackActive);
    } else {
      hideQueuedBackupBanner();
      detachQueuedBackupGestureListeners();
    }
    return count;
  }).catch(function (error) {
    console.warn('Failed to update queued backup banner from vault', error);
    hideQueuedBackupBanner();
    detachQueuedBackupGestureListeners();
    return 0;
  });
}
function flushQueuedBackupVault(_x) {
  return _flushQueuedBackupVault.apply(this, arguments);
}
function _flushQueuedBackupVault() {
  _flushQueuedBackupVault = _asyncToGenerator(_regenerator().m(function _callee(trigger) {
    var entries, index, entry, result, message, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          if (!queuedBackupFlushInProgress) {
            _context.n = 1;
            break;
          }
          return _context.a(2);
        case 1:
          if (!(typeof getQueuedBackupPayloadsForEvents !== 'function' || typeof downloadBackupPayloadForEvents !== 'function')) {
            _context.n = 2;
            break;
          }
          return _context.a(2);
        case 2:
          queuedBackupFlushInProgress = true;
          _context.p = 3;
          _context.n = 4;
          return Promise.resolve(getQueuedBackupPayloadsForEvents()).then(function (value) {
            return Array.isArray(value) ? value : [];
          }).catch(function (error) {
            console.warn('Failed to read queued backups for deferred download', error);
            return [];
          });
        case 4:
          entries = _context.v;
          if (entries.length) {
            _context.n = 5;
            break;
          }
          hideQueuedBackupBanner();
          detachQueuedBackupGestureListeners();
          return _context.a(2);
        case 5:
          index = 0;
        case 6:
          if (!(index < entries.length)) {
            _context.n = 13;
            break;
          }
          entry = entries[index];
          result = null;
          try {
            result = downloadBackupPayloadForEvents(entry.payload, entry.fileName, {
              skipQueue: true,
              source: entry && entry.metadata && entry.metadata.source ? entry.metadata.source : 'automatic',
              reason: trigger || 'gesture-flush',
              queueMetadata: entry && entry.metadata ? entry.metadata : {}
            });
          } catch (downloadError) {
            console.warn('Deferred backup download attempt threw an error', downloadError);
            result = null;
          }
          if (!(result && result.success)) {
            _context.n = 11;
            break;
          }
          if (!(typeof removeQueuedBackupRecordForEvents === 'function')) {
            _context.n = 10;
            break;
          }
          _context.p = 7;
          _context.n = 8;
          return removeQueuedBackupRecordForEvents(entry.id);
        case 8:
          _context.n = 10;
          break;
        case 9:
          _context.p = 9;
          _t = _context.v;
          console.warn('Failed to remove queued backup after export', _t);
        case 10:
          _context.n = 12;
          break;
        case 11:
          message = result && result.queueMessage ? result.queueMessage : resolveQueuedBackupMessageForEvents ? resolveQueuedBackupMessageForEvents(entry.fileName) : 'Automatic downloads are still blocked. Keep working offline and try again after interacting with the planner.';
          if (typeof showNotification === 'function') {
            try {
              showNotification('warning', message);
            } catch (notifyError) {
              void notifyError;
            }
          }
          return _context.a(3, 13);
        case 12:
          index += 1;
          _context.n = 6;
          break;
        case 13:
          _context.p = 13;
          queuedBackupFlushInProgress = false;
          updateQueuedBackupBannerFromVault();
          return _context.f(13);
        case 14:
          return _context.a(2);
      }
    }, _callee, null, [[7, 9], [3,, 13, 14]]);
  }));
  return _flushQueuedBackupVault.apply(this, arguments);
}
function handleQueuedBackupVaultQueuedEvent() {
  updateQueuedBackupBannerFromVault();
  attachQueuedBackupGestureListeners();
}
function handleQueuedBackupFallbackChangedEvent() {
  updateQueuedBackupBannerFromVault();
}
function scheduleAutoBackupTimer() {
  if (autoBackupSchedulerTimer) {
    try {
      clearTimeout(autoBackupSchedulerTimer);
    } catch (clearError) {
      void clearError;
    }
  }
  autoBackupSchedulerTimer = setTimeout(function () {
    try {
      autoBackup({
        reason: 'interval'
      });
    } catch (autoBackupError) {
      console.warn('Scheduled auto backup run failed', autoBackupError);
    }
    scheduleAutoBackupTimer();
  }, AUTO_BACKUP_INTERVAL_MS);
  if (autoBackupSchedulerTimer && typeof autoBackupSchedulerTimer.unref === 'function') {
    autoBackupSchedulerTimer.unref();
  }
}
function scheduleAutoGearBackupTimer() {
  if (autoGearBackupSchedulerTimer) {
    try {
      clearTimeout(autoGearBackupSchedulerTimer);
    } catch (clearError) {
      void clearError;
    }
  }
  autoGearBackupSchedulerTimer = setTimeout(function () {
    try {
      if (autoGearRulesDirtySinceBackup) {
        createAutoGearBackup();
      }
    } catch (gearBackupError) {
      console.warn('Scheduled auto gear backup failed', gearBackupError);
    }
    scheduleAutoGearBackupTimer();
  }, AUTO_GEAR_BACKUP_INTERVAL_MS);
  if (autoGearBackupSchedulerTimer && typeof autoGearBackupSchedulerTimer.unref === 'function') {
    autoGearBackupSchedulerTimer.unref();
  }
}
function queueScheduledFullBackup() {
  if (typeof queueBackupPayloadForVaultForEvents !== 'function' || typeof buildSettingsBackupPackageForEvents !== 'function') {
    return;
  }
  try {
    var packageInfo = buildSettingsBackupPackageForEvents(new Date());
    if (!packageInfo || typeof packageInfo.payload !== 'string') {
      return;
    }
    queueBackupPayloadForVaultForEvents(packageInfo.fileName, packageInfo.payload, {
      source: 'hourly-scheduler',
      reason: 'hourly-auto',
      createdAt: packageInfo.iso
    });
    if (resolveQueuedBackupMessageForEvents) {
      try {
        var queuedMessage = resolveQueuedBackupMessageForEvents(packageInfo.fileName);
        if (queuedMessage && typeof showNotification === 'function') {
          showNotification('info', queuedMessage);
        }
      } catch (messageError) {
        void messageError;
      }
    }
    updateQueuedBackupBannerFromVault();
  } catch (queueError) {
    console.warn('Failed to queue scheduled full backup payload', queueError);
  }
}
function scheduleHourlyBackupTimer() {
  if (hourlyBackupSchedulerTimer) {
    try {
      clearTimeout(hourlyBackupSchedulerTimer);
    } catch (clearError) {
      void clearError;
    }
  }
  hourlyBackupSchedulerTimer = setTimeout(function () {
    queueScheduledFullBackup();
    scheduleHourlyBackupTimer();
  }, 60 * 60 * 1000);
  if (hourlyBackupSchedulerTimer && typeof hourlyBackupSchedulerTimer.unref === 'function') {
    hourlyBackupSchedulerTimer.unref();
  }
}
if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
  window.addEventListener('cineBackupVault:queued', handleQueuedBackupVaultQueuedEvent);
  window.addEventListener('cineBackupVault:fallbackChanged', handleQueuedBackupFallbackChangedEvent);
}
if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
  document.addEventListener('cineBackupVault:queued', handleQueuedBackupVaultQueuedEvent);
  document.addEventListener('cineBackupVault:fallbackChanged', handleQueuedBackupFallbackChangedEvent);
}
if (typeof setTimeout === 'function') {
  scheduleAutoBackupTimer();
  scheduleAutoGearBackupTimer();
  scheduleHourlyBackupTimer();
}
updateQueuedBackupBannerFromVault();
function showDeviceManagerSection() {
  if (!deviceManagerSection || !toggleDeviceBtn) return;
  if (!deviceManagerSection.classList.contains('hidden')) return;
  deviceManagerSection.classList.remove('hidden');
  setButtonLabelWithIconForEvents(toggleDeviceBtn, texts[currentLang].hideDeviceManager, ICON_GLYPHS.minus);
  toggleDeviceBtn.setAttribute('title', texts[currentLang].hideDeviceManager);
  toggleDeviceBtn.setAttribute('data-help', texts[currentLang].hideDeviceManagerHelp);
  toggleDeviceBtn.setAttribute('aria-expanded', 'true');
  refreshDeviceListsSafe();
  updateCalculations();
}
function hideDeviceManagerSection() {
  if (!deviceManagerSection || !toggleDeviceBtn) return;
  if (deviceManagerSection.classList.contains('hidden')) return;
  deviceManagerSection.classList.add('hidden');
  setButtonLabelWithIconForEvents(toggleDeviceBtn, texts[currentLang].toggleDeviceManager, ICON_GLYPHS.gears);
  toggleDeviceBtn.setAttribute('title', texts[currentLang].toggleDeviceManager);
  toggleDeviceBtn.setAttribute('data-help', texts[currentLang].toggleDeviceManagerHelp);
  toggleDeviceBtn.setAttribute('aria-expanded', 'false');
}
function toggleDeviceManagerSection() {
  if (!deviceManagerSection || !toggleDeviceBtn) return;
  if (deviceManagerSection.classList.contains('hidden')) {
    showDeviceManagerSection();
  } else {
    hideDeviceManagerSection();
  }
}
addSafeEventListener(toggleDeviceBtn, 'click', toggleDeviceManagerSection);
function getEventsLanguageTexts() {
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  var allTexts = typeof texts !== 'undefined' && texts || (scope && _typeof(scope.texts) === 'object' ? scope.texts : null);
  var resolvedLang = typeof currentLang === 'string' && allTexts && _typeof(allTexts[currentLang]) === 'object' ? currentLang : 'en';
  var langTexts = allTexts && _typeof(allTexts[resolvedLang]) === 'object' && allTexts[resolvedLang] || {};
  var fallbackTexts = allTexts && _typeof(allTexts.en) === 'object' && allTexts.en || {};
  return {
    langTexts: langTexts,
    fallbackTexts: fallbackTexts
  };
}
function resolveAutoBackupIndicatorMessage() {
  var _getEventsLanguageTex = getEventsLanguageTexts(),
    langTexts = _getEventsLanguageTex.langTexts,
    fallbackTexts = _getEventsLanguageTex.fallbackTexts;
  return langTexts && langTexts.autoBackupInProgressNotice || fallbackTexts && fallbackTexts.autoBackupInProgressNotice || 'Auto backup in progress. Performance may pause briefly.';
}
function registerEventsCineUiInternal(cineUi) {
  if (!cineUi || eventsCineUiRegistered) {
    return;
  }
  eventsCineUiRegistered = true;
  try {
    if (cineUi.controllers && typeof cineUi.controllers.register === 'function') {
      cineUi.controllers.register('deviceManagerSection', {
        show: showDeviceManagerSection,
        hide: hideDeviceManagerSection,
        toggle: toggleDeviceManagerSection
      });
    }
  } catch (error) {
    console.warn('cineUi controller registration failed', error);
  }
  try {
    if (cineUi.interactions && typeof cineUi.interactions.register === 'function') {
      cineUi.interactions.register('saveSetup', handleSaveSetupClick);
      cineUi.interactions.register('deleteSetup', handleDeleteSetupClick);
    }
  } catch (error) {
    console.warn('cineUi interaction registration failed', error);
  }
  try {
    if (cineUi.help && typeof cineUi.help.register === 'function') {
      cineUi.help.register('saveSetup', function () {
        var _getEventsLanguageTex2 = getEventsLanguageTexts(),
          langTexts = _getEventsLanguageTex2.langTexts,
          fallbackTexts = _getEventsLanguageTex2.fallbackTexts;
        return langTexts.saveSetupHelp || fallbackTexts.saveSetupHelp || 'Capture the current project—including devices, requirements and notes—so it can be restored instantly. The autosave status dot beside Project Name glows while changes are secured. Press Enter or Ctrl+S to save quickly; the Save button stays disabled until a name is entered.';
      });
      cineUi.help.register('autoBackupBeforeDeletion', function () {
        var _getEventsLanguageTex3 = getEventsLanguageTexts(),
          langTexts = _getEventsLanguageTex3.langTexts,
          fallbackTexts = _getEventsLanguageTex3.fallbackTexts;
        return langTexts.preDeleteBackupSuccess || fallbackTexts.preDeleteBackupSuccess || 'Automatic safety copy stored before deletion. Find the matching auto-backup entry under Saved Projects and rename it if you plan to keep it permanently.';
      });
    }
  } catch (error) {
    console.warn('cineUi help registration failed', error);
  }
}
function registerEventsCineUi() {
  var cineUi = resolveCineUi();
  if (!cineUi) {
    return false;
  }
  registerEventsCineUiInternal(cineUi);
  return true;
}
registerEventsCineUi();
function toggleDeviceDetails(button) {
  var details = button.closest('li').querySelector('.device-details');
  var expanded = button.getAttribute('aria-expanded') === 'true';
  if (expanded) {
    details.style.display = 'none';
    button.textContent = texts[currentLang].showDetails;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('data-help', texts[currentLang].showDetails);
  } else {
    details.style.display = 'block';
    button.textContent = texts[currentLang].hideDetails;
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('data-help', texts[currentLang].hideDetails);
    if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function') {
      var rawName = typeof button.dataset.name === 'string' ? button.dataset.name : '';
      var rawCategory = typeof button.dataset.category === 'string' ? button.dataset.category : '';
      var rawSubcategory = typeof button.dataset.subcategory === 'string' ? button.dataset.subcategory : '';
      var detail = {
        name: rawName.trim(),
        category: rawCategory.trim(),
        subcategory: rawSubcategory.trim() || null
      };
      try {
        document.dispatchEvent(new CustomEvent('device-library:show-details', {
          detail: detail
        }));
      } catch (error) {
        console.warn('Failed to dispatch device-library:show-details event', error);
      }
    }
  }
}
function inferDeviceCategory(key, data) {
  var _data$power;
  if (key === "batteries" || key.endsWith('.batteries') || data.capacity !== undefined) return "batteries";
  if (key === "cameras" || data.recordingMedia || data.lensMount || (_data$power = data.power) !== null && _data$power !== void 0 && _data$power.batteryPlateSupport) return "cameras";
  if (key === "monitors" || data.screenSizeInches !== undefined && !key.includes("viewfinder")) return "monitors";
  if (key === "viewfinders" || key.includes("viewfinder")) return "viewfinders";
  if (key === "video" || key === "wirelessReceivers" || key === "iosVideo" || data.videoInputs || data.videoOutputs || data.frequency !== undefined) return "video";
  if (key === "fiz.motors" || data.torqueNm !== undefined || data.gearTypes) return "fiz.motors";
  if (key === "fiz.controllers" || data.powerSource || data.batteryType || data.connectivity) return "fiz.controllers";
  if (key === "fiz.distance" || data.measurementMethod || data.connectionCompatibility || data.measurementRange || data.accuracy) return "fiz.distance";
  return "generic";
}
function resolveDefaultLensMountType() {
  var _cameraSelect;
  var cameras = devices && devices.cameras ? devices.cameras : null;
  if (!cameras || _typeof(cameras) !== 'object') {
    return '';
  }
  var findPreferredMount = function findPreferredMount(cam) {
    if (!cam || _typeof(cam) !== 'object' || !Array.isArray(cam.lensMount)) {
      return '';
    }
    var nativeEntry = cam.lensMount.find(function (entry) {
      return entry && typeof entry.type === 'string' && typeof entry.mount === 'string' && entry.mount.toLowerCase() === 'native';
    });
    if (nativeEntry && nativeEntry.type) {
      return nativeEntry.type;
    }
    var fallback = cam.lensMount.find(function (entry) {
      return entry && typeof entry.type === 'string' && entry.type.trim();
    });
    return fallback ? fallback.type : '';
  };
  var selectedCameraName = typeof ((_cameraSelect = cameraSelect) === null || _cameraSelect === void 0 ? void 0 : _cameraSelect.value) === 'string' ? cameraSelect.value : '';
  if (selectedCameraName && cameras[selectedCameraName]) {
    var preferred = findPreferredMount(cameras[selectedCameraName]);
    if (preferred) {
      return preferred;
    }
  }
  var firstCamera = Object.values(cameras).find(function (entry) {
    return entry && _typeof(entry) === 'object';
  });
  if (firstCamera) {
    var _preferred = findPreferredMount(firstCamera);
    if (_preferred) {
      return _preferred;
    }
  }
  return '';
}
function normalizeLensFocusScale(value) {
  if (typeof normalizeFocusScale === 'function') {
    try {
      var _normalized = normalizeFocusScale(value);
      if (_normalized === 'imperial' || _normalized === 'metric') {
        return _normalized;
      }
    } catch (focusScaleNormalizeError) {
      void focusScaleNormalizeError;
    }
  }
  var normalized = typeof value === 'string' ? value.trim().toLowerCase() : '';
  if (normalized === 'imperial' || normalized === 'metric') {
    return normalized;
  }
  return '';
}
function applyCameraFizConnectors(connectors) {
  var normalized = Array.isArray(connectors) ? connectors.map(function (entry) {
    if (!entry || typeof entry === 'string') {
      return entry;
    }
    if (_typeof(entry) === 'object' && typeof entry.type === 'string') {
      return _objectSpread({}, entry);
    }
    return entry;
  }) : [];
  var applied = false;
  if (typeof setFizConnectors === 'function') {
    try {
      setFizConnectors(normalized);
      applied = true;
    } catch (directApplyError) {
      if (eventsLogger && typeof eventsLogger.warn === 'function') {
        try {
          eventsLogger.warn('Direct setFizConnectors invocation failed', directApplyError, {
            namespace: 'device-editor'
          });
        } catch (logError) {
          void logError;
        }
      }
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Direct setFizConnectors invocation failed', directApplyError);
      }
    }
  }
  if (!applied) {
    try {
      callEventsCoreFunction('setFizConnectors', [normalized], {
        defer: true
      });
      applied = true;
    } catch (coreInvokeError) {
      if (eventsLogger && typeof eventsLogger.error === 'function') {
        try {
          eventsLogger.error('Failed to schedule setFizConnectors', coreInvokeError, {
            namespace: 'device-editor'
          });
        } catch (logError) {
          void logError;
        }
      }
      if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error('Failed to schedule setFizConnectors', coreInvokeError);
      }
    }
  }
  return applied;
}
function applyCameraTimecodes(timecodes) {
  var normalized = Array.isArray(timecodes) ? timecodes.map(function (entry) {
    if (!entry) {
      return entry;
    }
    if (typeof entry === 'string') {
      var trimmed = entry.trim();
      return trimmed ? {
        type: trimmed,
        notes: ''
      } : entry;
    }
    if (_typeof(entry) === 'object') {
      var normalizedEntry = _objectSpread({}, entry);
      if (typeof normalizedEntry.type !== 'string' || !normalizedEntry.type) {
        var derivedType = typeof normalizedEntry.format === 'string' && normalizedEntry.format || typeof normalizedEntry.name === 'string' && normalizedEntry.name || '';
        if (derivedType) {
          normalizedEntry.type = derivedType;
        }
      }
      if (typeof normalizedEntry.notes !== 'string') {
        if (typeof normalizedEntry.comment === 'string') {
          normalizedEntry.notes = normalizedEntry.comment;
        } else if (normalizedEntry.notes == null) {
          normalizedEntry.notes = '';
        }
      }
      return normalizedEntry;
    }
    return entry;
  }) : [];
  var applied = false;
  if (typeof setTimecodes === 'function') {
    try {
      setTimecodes(normalized);
      applied = true;
    } catch (directApplyError) {
      if (eventsLogger && typeof eventsLogger.warn === 'function') {
        try {
          eventsLogger.warn('Direct setTimecodes invocation failed', directApplyError, {
            namespace: 'device-editor'
          });
        } catch (logError) {
          void logError;
        }
      }
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Direct setTimecodes invocation failed', directApplyError);
      }
    }
  }
  if (!applied) {
    try {
      callEventsCoreFunction('setTimecodes', [normalized], {
        defer: true
      });
      applied = true;
    } catch (coreInvokeError) {
      if (eventsLogger && typeof eventsLogger.error === 'function') {
        try {
          eventsLogger.error('Failed to schedule setTimecodes', coreInvokeError, {
            namespace: 'device-editor'
          });
        } catch (logError) {
          void logError;
        }
      }
      if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error('Failed to schedule setTimecodes', coreInvokeError);
      }
    }
  }
  return applied;
}
function populateDeviceForm(categoryKey, deviceData, subcategory) {
  placeWattField(categoryKey, deviceData);
  var type = inferDeviceCategory(categoryKey, deviceData);
  if (wattFieldDiv) wattFieldDiv.style.display = "";
  hideFormSection(batteryFieldsDiv);
  hideFormSection(cameraFieldsDiv);
  hideFormSection(monitorFieldsDiv);
  hideFormSection(viewfinderFieldsDiv);
  hideFormSection(videoFieldsDiv);
  hideFormSection(motorFieldsDiv);
  hideFormSection(controllerFieldsDiv);
  hideFormSection(distanceFieldsDiv);
  hideFormSection(lensFieldsDiv);
  clearDynamicFields();
  if (type === "batteries") {
    var _deviceData$capacity, _deviceData$pinA, _deviceData$dtapA;
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(batteryFieldsDiv);
    newCapacityInput.value = (_deviceData$capacity = deviceData.capacity) !== null && _deviceData$capacity !== void 0 ? _deviceData$capacity : '';
    newPinAInput.value = (_deviceData$pinA = deviceData.pinA) !== null && _deviceData$pinA !== void 0 ? _deviceData$pinA : '';
    if (dtapRow) dtapRow.style.display = categoryKey === "batteryHotswaps" ? "none" : "";
    newDtapAInput.value = categoryKey === "batteryHotswaps" ? '' : (_deviceData$dtapA = deviceData.dtapA) !== null && _deviceData$dtapA !== void 0 ? _deviceData$dtapA : '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "cameras") {
    var _deviceData$power, _deviceData$power2, _deviceData$power3;
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(cameraFieldsDiv);
    var tmp = resolveFirstPowerInputType(deviceData);
    cameraWattInput.value = deviceData.powerDrawWatts || '';
    cameraVoltageInput.value = ((_deviceData$power = deviceData.power) === null || _deviceData$power === void 0 || (_deviceData$power = _deviceData$power.input) === null || _deviceData$power === void 0 ? void 0 : _deviceData$power.voltageRange) || '';
    cameraPortTypeInput.value = tmp || "";
    setBatteryPlates(((_deviceData$power2 = deviceData.power) === null || _deviceData$power2 === void 0 ? void 0 : _deviceData$power2.batteryPlateSupport) || []);
    setRecordingMedia(deviceData.recordingMedia || []);
    callEventsCoreFunction('setLensMounts', [Array.isArray(deviceData.lensMount) ? deviceData.lensMount : []]);
    callEventsCoreFunction('setPowerDistribution', [((_deviceData$power3 = deviceData.power) === null || _deviceData$power3 === void 0 ? void 0 : _deviceData$power3.powerDistributionOutputs) || []], {
      defer: true
    });
    setVideoOutputs(deviceData.videoOutputs || []);
    applyCameraFizConnectors(deviceData.fizConnectors || []);
    setViewfinders(deviceData.viewfinder || []);
    applyCameraTimecodes(deviceData.timecode || []);
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "lenses") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(lensFieldsDiv);
    var fallbackMount = resolveDefaultLensMountType();
    var mountOptions = [];
    if (Array.isArray(deviceData === null || deviceData === void 0 ? void 0 : deviceData.mountOptions)) {
      mountOptions = deviceData.mountOptions;
    } else if (Array.isArray(deviceData === null || deviceData === void 0 ? void 0 : deviceData.lensMount)) {
      mountOptions = deviceData.lensMount;
    } else if (typeof (deviceData === null || deviceData === void 0 ? void 0 : deviceData.mount) === 'string' && deviceData.mount.trim()) {
      mountOptions = [{
        type: deviceData.mount.trim(),
        mount: 'native'
      }];
    }
    setLensDeviceMountOptions(mountOptions, fallbackMount);
    if (lensFocusScaleSelect) {
      updateLensFocusScaleSelectOptions();
      var storedFocusScale = normalizeLensFocusScale(deviceData && deviceData.focusScale);
      lensFocusScaleSelect.value = storedFocusScale || '';
    }
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "monitors") {
    var _deviceData$power4, _deviceData$video, _deviceData$video2, _deviceData$latencyMs, _deviceData$audioOutp, _deviceData$audioOutp2;
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(monitorFieldsDiv);
    monitorScreenSizeInput.value = deviceData.screenSizeInches || '';
    monitorBrightnessInput.value = deviceData.brightnessNits || '';
    monitorWattInput.value = deviceData.powerDrawWatts || '';
    monitorVoltageInput.value = ((_deviceData$power4 = deviceData.power) === null || _deviceData$power4 === void 0 || (_deviceData$power4 = _deviceData$power4.input) === null || _deviceData$power4 === void 0 ? void 0 : _deviceData$power4.voltageRange) || '';
    var mpt = resolveFirstPowerInputType(deviceData);
    monitorPortTypeInput.value = mpt || "";
    setMonitorVideoInputs(deviceData.videoInputs || ((_deviceData$video = deviceData.video) === null || _deviceData$video === void 0 ? void 0 : _deviceData$video.inputs) || []);
    setMonitorVideoOutputs(deviceData.videoOutputs || ((_deviceData$video2 = deviceData.video) === null || _deviceData$video2 === void 0 ? void 0 : _deviceData$video2.outputs) || []);
    monitorWirelessTxInput.checked = !!deviceData.wirelessTx;
    monitorLatencyInput.value = (_deviceData$latencyMs = deviceData.latencyMs) !== null && _deviceData$latencyMs !== void 0 ? _deviceData$latencyMs : '';
    monitorAudioOutputInput.value = ((_deviceData$audioOutp = deviceData.audioOutput) === null || _deviceData$audioOutp === void 0 ? void 0 : _deviceData$audioOutp.portType) || ((_deviceData$audioOutp2 = deviceData.audioOutput) === null || _deviceData$audioOutp2 === void 0 ? void 0 : _deviceData$audioOutp2.type) || deviceData.audioOutput || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "viewfinders") {
    var _deviceData$power5, _deviceData$video3, _deviceData$video4, _deviceData$latencyMs2;
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(viewfinderFieldsDiv);
    viewfinderScreenSizeInput.value = deviceData.screenSizeInches || '';
    viewfinderBrightnessInput.value = deviceData.brightnessNits || '';
    viewfinderWattInput.value = deviceData.powerDrawWatts || '';
    viewfinderVoltageInput.value = ((_deviceData$power5 = deviceData.power) === null || _deviceData$power5 === void 0 || (_deviceData$power5 = _deviceData$power5.input) === null || _deviceData$power5 === void 0 ? void 0 : _deviceData$power5.voltageRange) || '';
    var vfpt = resolveFirstPowerInputType(deviceData);
    viewfinderPortTypeInput.value = vfpt || "";
    setViewfinderVideoInputs(deviceData.videoInputs || ((_deviceData$video3 = deviceData.video) === null || _deviceData$video3 === void 0 ? void 0 : _deviceData$video3.inputs) || []);
    setViewfinderVideoOutputs(deviceData.videoOutputs || ((_deviceData$video4 = deviceData.video) === null || _deviceData$video4 === void 0 ? void 0 : _deviceData$video4.outputs) || []);
    viewfinderWirelessTxInput.checked = !!deviceData.wirelessTx;
    viewfinderLatencyInput.value = (_deviceData$latencyMs2 = deviceData.latencyMs) !== null && _deviceData$latencyMs2 !== void 0 ? _deviceData$latencyMs2 : '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "video") {
    var _deviceData$power6, _deviceData$video5, _deviceData$video6, _deviceData$latencyMs3;
    showFormSection(videoFieldsDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    callEventsCoreFunction('setVideoPowerInputs', [((_deviceData$power6 = deviceData.power) === null || _deviceData$power6 === void 0 ? void 0 : _deviceData$power6.input) || deviceData.powerInput || null]);
    setVideoInputs(deviceData.videoInputs || ((_deviceData$video5 = deviceData.video) === null || _deviceData$video5 === void 0 ? void 0 : _deviceData$video5.inputs) || []);
    setVideoOutputsIO(deviceData.videoOutputs || ((_deviceData$video6 = deviceData.video) === null || _deviceData$video6 === void 0 ? void 0 : _deviceData$video6.outputs) || []);
    videoFrequencyInput.value = deviceData.frequency || '';
    videoLatencyInput.value = (_deviceData$latencyMs3 = deviceData.latencyMs) !== null && _deviceData$latencyMs3 !== void 0 ? _deviceData$latencyMs3 : '';
    motorConnectorInput.value = '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "fiz.motors") {
    showFormSection(motorFieldsDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    motorConnectorInput.value = deviceData.fizConnector || '';
    motorInternalInput.checked = !!deviceData.internalController;
    motorTorqueInput.value = deviceData.torqueNm || '';
    motorGearInput.value = Array.isArray(deviceData.gearTypes) ? deviceData.gearTypes.join(', ') : '';
    motorNotesInput.value = deviceData.notes || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "fiz.controllers") {
    showFormSection(controllerFieldsDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    var cc = Array.isArray(deviceData.fizConnectors) ? deviceData.fizConnectors.map(function (fc) {
      return fc.type;
    }).join(', ') : deviceData.fizConnector || '';
    controllerConnectorInput.value = cc;
    controllerPowerInput.value = deviceData.powerSource || '';
    controllerBatteryInput.value = deviceData.batteryType || '';
    controllerConnectivityInput.value = deviceData.connectivity || '';
    controllerNotesInput.value = deviceData.notes || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "fiz.distance") {
    showFormSection(distanceFieldsDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    distanceConnectionInput.value = deviceData.connectionCompatibility || '';
    distanceMethodInput.value = deviceData.measurementMethod || '';
    distanceRangeInput.value = deviceData.measurementRange || '';
    distanceAccuracyInput.value = deviceData.accuracy || '';
    distanceOutputInput.value = deviceData.outputDisplay || '';
    distanceNotesInput.value = deviceData.notes || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "accessories.cables") {
    if (wattFieldDiv) {
      wattFieldDiv.style.display = "none";
    }
    if (subcategoryFieldDiv) {
      subcategoryFieldDiv.hidden = false;
    }
    var subcategoryKeys = getCableSubcategoryKeysForUi(subcategory ? [subcategory] : []);
    newSubcategorySelect.innerHTML = '';
    for (var index = 0; index < subcategoryKeys.length; index += 1) {
      var sc = subcategoryKeys[index];
      var opt = document.createElement('option');
      opt.value = sc;
      opt.textContent = sc.charAt(0).toUpperCase() + sc.slice(1);
      newSubcategorySelect.appendChild(opt);
    }
    var effectiveSubcategory = subcategory && subcategoryKeys.includes(subcategory) ? subcategory : newSubcategorySelect.options.length > 0 ? newSubcategorySelect.options[0].value : '';
    newSubcategorySelect.value = effectiveSubcategory || '';
    newSubcategorySelect.disabled = false;
    if (effectiveSubcategory) {
      buildDynamicFields("accessories.cables.".concat(effectiveSubcategory), deviceData, categoryExcludedAttrs["accessories.cables.".concat(effectiveSubcategory)] || []);
    }
  } else {
    var watt = _typeof(deviceData) === 'object' ? deviceData.powerDrawWatts : deviceData;
    newWattInput.value = watt || '';
    var schemaAttrs = typeof getSchemaAttributesForCategory === 'function' ? getSchemaAttributesForCategory(categoryKey) : [];
    var hasWattage = schemaAttrs.includes('powerDrawWatts') || deviceData && deviceData.powerDrawWatts !== undefined;
    if (wattFieldDiv) {
      wattFieldDiv.style.display = hasWattage ? "" : "none";
    }
    var hasDtap = schemaAttrs.includes('dtapA') || schemaAttrs.includes('pinA') || deviceData && (deviceData.dtapA !== undefined || deviceData.pinA !== undefined);
    if (dtapRow) {
      dtapRow.style.display = hasDtap ? "" : "none";
    }
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  }
}
addSafeEventListener(deviceManagerSection, "click", function (event) {
  var button = event.target.closest('button');
  if (!button || !deviceManagerSection.contains(button)) {
    return;
  }
  if (button.classList.contains("detail-toggle")) {
    toggleDeviceDetails(button);
  } else if (button.classList.contains("edit-btn")) {
    var name = button.dataset.name;
    var categoryKey = button.dataset.category;
    var subcategory = button.dataset.subcategory;
    var categorySelect = resolveNewCategorySelect();
    if (!categorySelect) {
      console.warn('Cannot edit device: category select is unavailable');
      return;
    }
    if (!Array.from(categorySelect.options).some(function (opt) {
      return opt.value === categoryKey;
    })) {
      var _categoryNames$curren;
      var opt = document.createElement("option");
      opt.value = categoryKey;
      opt.textContent = ((_categoryNames$curren = categoryNames[currentLang]) === null || _categoryNames$curren === void 0 ? void 0 : _categoryNames$curren[categoryKey]) || categoryKey;
      categorySelect.appendChild(opt);
    }
    addDeviceBtn.dataset.mode = "edit";
    addDeviceBtn.dataset.originalName = name;
    addDeviceBtn.dataset.originalCategory = categoryKey;
    if (categoryKey === "accessories.cables" && subcategory) {
      addDeviceBtn.dataset.originalSubcategory = subcategory;
    } else {
      delete addDeviceBtn.dataset.originalSubcategory;
    }
    categorySelect.value = categoryKey;
    newNameInput.value = name;
    categorySelect.dispatchEvent(new Event('change'));
    var deviceData;
    if (categoryKey === "accessories.cables") {
      deviceData = devices.accessories.cables[subcategory][name];
    } else if (categoryKey.includes('.')) {
      var _categoryKey$split = categoryKey.split('.'),
        _categoryKey$split2 = _slicedToArray(_categoryKey$split, 2),
        mainCat = _categoryKey$split2[0],
        subCat = _categoryKey$split2[1];
      deviceData = devices[mainCat][subCat][name];
    } else {
      deviceData = devices[categoryKey][name];
    }
    populateDeviceForm(categoryKey, deviceData, subcategory);
    setButtonLabelWithIconForEvents(addDeviceBtn, texts[currentLang].updateDeviceBtn, ICON_GLYPHS.save);
    addDeviceBtn.setAttribute('data-help', texts[currentLang].updateDeviceBtnHelp);
    addDeviceBtn.dataset.mode = "edit";
    setButtonLabelWithIconForEvents(cancelEditBtn, texts[currentLang].cancelEditBtn, ICON_GLYPHS.circleX);
    cancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
    showFormSection(cancelEditBtn);
    document.getElementById("addDeviceHeading").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  } else if (button.classList.contains("delete-btn")) {
    var _name = button.dataset.name;
    var _categoryKey = button.dataset.category;
    var _subcategory = button.dataset.subcategory;
    if (confirm(texts[currentLang].confirmDeleteDevice.replace("{name}", _name))) {
      if (_categoryKey === "accessories.cables") {
        delete devices.accessories.cables[_subcategory][_name];
      } else if (_categoryKey.includes('.')) {
        var _categoryKey$split3 = _categoryKey.split('.'),
          _categoryKey$split4 = _slicedToArray(_categoryKey$split3, 2),
          _mainCat = _categoryKey$split4[0],
          _subCat = _categoryKey$split4[1];
        delete devices[_mainCat][_subCat][_name];
      } else {
        delete devices[_categoryKey][_name];
      }
      if (typeof updateGlobalDevicesReference === 'function') {
        updateGlobalDevicesReference(devices);
      }
      storeDevices(devices);
      viewfinderTypeOptions = syncCoreOptionsArray('viewfinderTypeOptions', 'getAllViewfinderTypes', viewfinderTypeOptions);
      viewfinderConnectorOptions = syncCoreOptionsArray('viewfinderConnectorOptions', 'getAllViewfinderConnectors', viewfinderConnectorOptions);
      refreshDeviceListsSafe();
      callCoreFunctionIfAvailable('updateMountTypeOptions', [], {
        defer: true
      });
      populateSelect(cameraSelect, devices.cameras, true);
      populateMonitorSelect();
      populateSelect(videoSelect, devices.video, true);
      motorSelects.forEach(function (sel) {
        return populateSelect(sel, devices.fiz.motors, true);
      });
      controllerSelects.forEach(function (sel) {
        return populateSelect(sel, devices.fiz.controllers, true);
      });
      populateSelect(distanceSelect, devices.fiz.distance, true);
      populateSelect(batterySelect, devices.batteries, true);
      updateFizConnectorOptions();
      updateMotorConnectorOptions();
      updateControllerConnectorOptions();
      updateControllerPowerOptions();
      updateControllerBatteryOptions();
      updateControllerConnectivityOptions();
      updatePowerDistTypeOptions();
      updatePowerDistVoltageOptions();
      updatePowerDistCurrentOptions();
      updateTimecodeTypeOptions();
      updateDistanceConnectionOptions();
      updateDistanceMethodOptions();
      updateDistanceDisplayOptions();
      applyFilters();
      updateCalculations();
    }
  }
});
addSafeEventListener(deviceManagerSection, 'keydown', function (event) {
  if (event.target.classList.contains('detail-toggle') && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    toggleDeviceDetails(event.target);
  }
});
var newCategorySelectElement = resolveNewCategorySelect();
if (newCategorySelectElement) {
  addSafeEventListener(newCategorySelectElement, "change", function () {
    var _addDeviceBtn;
    var wasEditing = ((_addDeviceBtn = addDeviceBtn) === null || _addDeviceBtn === void 0 ? void 0 : _addDeviceBtn.dataset.mode) === "edit";
    var previousName = newNameInput ? newNameInput.value : "";
    var val = newCategorySelectElement.value;
    placeWattField(val);
    clearDynamicFields();
    subcategoryFieldDiv.hidden = true;
    var previousSubcategoryValue = newSubcategorySelect ? newSubcategorySelect.value : '';
    newSubcategorySelect.innerHTML = "";
    newSubcategorySelect.disabled = false;
    if (dtapRow) dtapRow.style.display = "";
    if (wattFieldDiv) wattFieldDiv.style.display = "";
    hideFormSection(batteryFieldsDiv);
    hideFormSection(cameraFieldsDiv);
    hideFormSection(monitorFieldsDiv);
    hideFormSection(viewfinderFieldsDiv);
    hideFormSection(videoFieldsDiv);
    hideFormSection(motorFieldsDiv);
    hideFormSection(controllerFieldsDiv);
    hideFormSection(distanceFieldsDiv);
    if (val === "batteries" || val === "accessories.batteries" || val === "batteryHotswaps") {
      if (wattFieldDiv) wattFieldDiv.style.display = "none";
      showFormSection(batteryFieldsDiv);
      if (dtapRow) dtapRow.style.display = val === "batteryHotswaps" ? "none" : "";
    } else if (val === "cameras") {
      if (wattFieldDiv) wattFieldDiv.style.display = "none";
      showFormSection(cameraFieldsDiv);
    } else if (val === "lenses") {
      if (wattFieldDiv) wattFieldDiv.style.display = "none";
      showFormSection(lensFieldsDiv);
      setLensDeviceMountOptions([], resolveDefaultLensMountType());
      if (lensFocusScaleSelect) {
        updateLensFocusScaleSelectOptions();
        lensFocusScaleSelect.value = '';
      }
    } else if (val === "monitors" || val === "directorMonitors") {
      if (wattFieldDiv) wattFieldDiv.style.display = "none";
      showFormSection(monitorFieldsDiv);
    } else if (val === "viewfinders") {
      if (wattFieldDiv) wattFieldDiv.style.display = "none";
      showFormSection(viewfinderFieldsDiv);
    } else if (val === "video" || val === "wirelessReceivers" || val === "iosVideo") {
      showFormSection(videoFieldsDiv);
    } else if (val === "fiz.motors") {
      showFormSection(motorFieldsDiv);
    } else if (val === "fiz.controllers") {
      showFormSection(controllerFieldsDiv);
    } else if (val === "fiz.distance") {
      showFormSection(distanceFieldsDiv);
    } else if (val === "accessories.cables") {
      if (wattFieldDiv) wattFieldDiv.style.display = "none";
      if (subcategoryFieldDiv) subcategoryFieldDiv.hidden = false;
      var subcategoryKeys = getCableSubcategoryKeysForUi(previousSubcategoryValue ? [previousSubcategoryValue] : []);
      for (var index = 0; index < subcategoryKeys.length; index += 1) {
        var sc = subcategoryKeys[index];
        var opt = document.createElement('option');
        opt.value = sc;
        opt.textContent = sc.charAt(0).toUpperCase() + sc.slice(1);
        newSubcategorySelect.appendChild(opt);
      }
      var effectiveSubcategory = previousSubcategoryValue && subcategoryKeys.includes(previousSubcategoryValue) ? previousSubcategoryValue : newSubcategorySelect.options.length > 0 ? newSubcategorySelect.options[0].value : '';
      newSubcategorySelect.value = effectiveSubcategory || '';
      if (effectiveSubcategory) {
        buildDynamicFields("accessories.cables.".concat(effectiveSubcategory), {}, categoryExcludedAttrs["accessories.cables.".concat(effectiveSubcategory)] || []);
      }
    } else {
      var schemaAttrs = typeof getSchemaAttributesForCategory === 'function' ? getSchemaAttributesForCategory(val) : [];
      var hasWattage = schemaAttrs.includes('powerDrawWatts');
      if (wattFieldDiv) {
        wattFieldDiv.style.display = hasWattage ? "" : "none";
      }
      var hasDtap = schemaAttrs.includes('dtapA') || schemaAttrs.includes('pinA');
      if (dtapRow) {
        dtapRow.style.display = hasDtap ? "" : "none";
      }
      buildDynamicFields(val, {}, categoryExcludedAttrs[val] || []);
    }
    newWattInput.value = "";
    newCapacityInput.value = "";
    newPinAInput.value = "";
    newDtapAInput.value = "";
    cameraWattInput.value = "";
    cameraVoltageInput.value = "";
    cameraPortTypeInput.value = "";
    monitorScreenSizeInput.value = "";
    monitorBrightnessInput.value = "";
    monitorWattInput.value = "";
    monitorVoltageInput.value = "";
    monitorPortTypeInput.value = "";
    monitorWirelessTxInput.checked = false;
    monitorLatencyInput.value = "";
    monitorAudioOutputInput.value = "";
    if (typeof clearMonitorVideoInputs === 'function') {
      clearMonitorVideoInputs();
    } else if (typeof window !== 'undefined' && typeof window.clearMonitorVideoInputs === 'function') {
      window.clearMonitorVideoInputs();
    }
    clearMonitorVideoOutputs();
    viewfinderScreenSizeInput.value = "";
    viewfinderBrightnessInput.value = "";
    viewfinderWattInput.value = "";
    viewfinderVoltageInput.value = "";
    viewfinderPortTypeInput.value = "";
    viewfinderWirelessTxInput.checked = false;
    viewfinderLatencyInput.value = "";
    clearViewfinderVideoInputs();
    clearViewfinderVideoOutputs();
    clearBatteryPlates();
    if (typeof clearRecordingMedia === 'function') {
      clearRecordingMedia();
    }
    clearLensMounts();
    clearLensDeviceMountOptions();
    if (lensFocusScaleSelect) {
      lensFocusScaleSelect.value = '';
    }
    callEventsCoreFunction('clearPowerDistribution', [], {
      defer: true
    });
    clearVideoOutputs();
    clearFizConnectors();
    clearViewfinders();
    clearTimecodes();
    callEventsCoreFunction('clearVideoPowerInputs');
    clearVideoInputs();
    clearVideoOutputsIO();
    videoFrequencyInput.value = "";
    videoLatencyInput.value = "";
    motorConnectorInput.value = "";
    motorInternalInput.checked = false;
    motorTorqueInput.value = "";
    motorGearInput.value = "";
    motorNotesInput.value = "";
    controllerConnectorInput.value = "";
    controllerPowerInput.value = "";
    controllerBatteryInput.value = "";
    controllerConnectivityInput.value = "";
    controllerNotesInput.value = "";
    distanceConnectionInput.value = "";
    distanceMethodInput.value = "";
    distanceRangeInput.value = "";
    distanceAccuracyInput.value = "";
    distanceOutputInput.value = "";
    distanceNotesInput.value = "";
    if (val !== 'accessories.cables') {
      buildDynamicFields(val, {}, categoryExcludedAttrs[val] || []);
    }
    if (newNameInput) {
      if (wasEditing) {
        newNameInput.value = previousName;
      } else {
        newNameInput.value = "";
      }
    }
    var cancelLabel = texts[currentLang].cancelEditBtn;
    if (wasEditing) {
      setButtonLabelWithIconForEvents(addDeviceBtn, texts[currentLang].updateDeviceBtn, ICON_GLYPHS.save);
      addDeviceBtn.setAttribute('data-help', texts[currentLang].updateDeviceBtnHelp);
      setButtonLabelWithIconForEvents(cancelEditBtn, cancelLabel, ICON_GLYPHS.circleX);
      cancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
      showFormSection(cancelEditBtn);
    } else {
      setButtonLabelWithIconForEvents(addDeviceBtn, texts[currentLang].addDeviceBtn, ICON_GLYPHS.add);
      addDeviceBtn.setAttribute('data-help', texts[currentLang].addDeviceBtnHelp);
      addDeviceBtn.dataset.mode = "add";
      delete addDeviceBtn.dataset.originalName;
      delete addDeviceBtn.dataset.originalSubcategory;
      delete addDeviceBtn.dataset.originalCategory;
      setButtonLabelWithIconForEvents(cancelEditBtn, cancelLabel, ICON_GLYPHS.circleX);
      cancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
      hideFormSection(cancelEditBtn);
    }
  });
} else {
  console.warn('Device manager category select is unavailable; change handler not registered');
}
addSafeEventListener(newSubcategorySelect, 'change', function () {
  var categorySelect = resolveNewCategorySelect();
  if (categorySelect && categorySelect.value === 'accessories.cables') {
    buildDynamicFields("accessories.cables.".concat(newSubcategorySelect.value), {}, categoryExcludedAttrs["accessories.cables.".concat(newSubcategorySelect.value)] || []);
  }
});
function resetDeviceForm() {
  if (addDeviceBtn) {
    addDeviceBtn.dataset.mode = "add";
    delete addDeviceBtn.dataset.originalName;
    delete addDeviceBtn.dataset.originalSubcategory;
    delete addDeviceBtn.dataset.originalCategory;
  }
  if (cancelEditBtn) {
    hideFormSection(cancelEditBtn);
    setButtonLabelWithIconForEvents(cancelEditBtn, texts[currentLang].cancelEditBtn, ICON_GLYPHS.circleX);
    cancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
  }
  var categorySelect = resolveNewCategorySelect();
  if (categorySelect && categorySelect.isConnected) {
    try {
      categorySelect.dispatchEvent(new Event('change'));
    } catch (err) {
      console.warn('resetDeviceForm dispatch failed', err);
    }
  }
}
function clearDeviceManagerFilterForCategory(categoryKey, deviceName) {
  if (!categoryKey || typeof document === 'undefined' || !document) {
    return;
  }
  var normalizedCategory = String(categoryKey);
  var filterInput = document.querySelector("input.list-filter[data-category-key=\"".concat(normalizedCategory, "\"]")) || document.getElementById("".concat(normalizedCategory.replace(/[^a-z0-9]+/gi, '_'), "ListFilter"));
  if (!filterInput) {
    return;
  }
  var rawFilter = typeof filterInput.value === 'string' ? filterInput.value : '';
  var trimmedFilter = rawFilter.trim();
  if (!trimmedFilter) {
    return;
  }
  var normalizedFilter = trimmedFilter.toLowerCase();
  var normalizedName = typeof deviceName === 'string' && deviceName ? deviceName.trim().toLowerCase() : '';
  if (normalizedName && normalizedName.includes(normalizedFilter)) {
    return;
  }
  filterInput.value = '';
  try {
    filterInput.dispatchEvent(new Event('input', {
      bubbles: true
    }));
  } catch (inputError) {
    void inputError;
  }
  try {
    filterInput.dispatchEvent(new Event('change', {
      bubbles: true
    }));
  } catch (changeError) {
    void changeError;
  }
}
function applyDynamicFieldsToDevice(container, key, categoryKey, excludedAttributes) {
  if (!container || _typeof(container) !== 'object' || !key) {
    applyDynamicFieldValues(undefined, categoryKey, excludedAttributes);
    return;
  }
  var currentEntry = container[key];
  var updatedEntry = applyDynamicFieldValues(currentEntry, categoryKey, excludedAttributes);
  if (updatedEntry && updatedEntry !== currentEntry) {
    container[key] = updatedEntry;
  }
}
addSafeEventListener(addDeviceBtn, "click", function (event) {
  if (event && typeof event.preventDefault === 'function') {
    try {
      event.preventDefault();
    } catch (preventDefaultError) {
      void preventDefaultError;
    }
  }
  var name = newNameInput.value.trim();
  var categorySelect = resolveNewCategorySelect();
  var category = categorySelect ? categorySelect.value : '';
  var isEditing = addDeviceBtn.dataset.mode === "edit";
  var originalName = addDeviceBtn.dataset.originalName;
  var originalCategory = addDeviceBtn.dataset.originalCategory;
  var subcategory = category === "accessories.cables" ? newSubcategorySelect.value : null;
  var originalSubcategory = addDeviceBtn.dataset.originalSubcategory;
  if (!name) {
    alert(texts[currentLang].alertDeviceName);
    return;
  }
  if (category === "accessories.cables" && !subcategory) {
    alert(texts[currentLang].alertDeviceFields);
    return;
  }
  var targetCategory = getCategoryContainer(category, subcategory, {
    create: true
  });
  if (!targetCategory) {
    alert(texts[currentLang].alertDeviceFields);
    return;
  }
  var storedOriginalCategory = originalCategory || category;
  var storedOriginalSubcategory = originalSubcategory || null;
  var originalCollection = isEditing ? getCategoryContainer(storedOriginalCategory, storedOriginalCategory === "accessories.cables" ? storedOriginalSubcategory : null, {
    create: false
  }) : null;
  var originalDeviceData = isEditing && originalCollection ? originalCollection[originalName] : undefined;
  var editingSameCategory = isEditing && storedOriginalCategory === category;
  var editingSamePath = editingSameCategory && (category !== "accessories.cables" || storedOriginalSubcategory === subcategory);
  var categoryChanged = isEditing && storedOriginalCategory !== category;
  var cablePathChanged = isEditing && (category === "accessories.cables" && subcategory !== storedOriginalSubcategory || storedOriginalCategory === "accessories.cables" && storedOriginalSubcategory !== subcategory);
  var nameChanged = isEditing && name !== originalName;
  if (!isEditing && targetCategory[name] !== undefined || isEditing && targetCategory[name] !== undefined && (nameChanged || categoryChanged || cablePathChanged)) {
    alert(texts[currentLang].alertDeviceExists);
    return;
  }
  if (category === "batteries" || category === "accessories.batteries" || category === "batteryHotswaps") {
    var capacity = parseFloat(newCapacityInput.value);
    var pinA = parseFloat(newPinAInput.value);
    var dtapA = category === "batteryHotswaps" ? undefined : parseFloat(newDtapAInput.value);
    if (isNaN(capacity) || isNaN(pinA) || capacity < 0 || pinA < 0 || category !== "batteryHotswaps" && (isNaN(dtapA) || dtapA < 0)) {
      alert(texts[currentLang].alertDeviceFields);
      return;
    }
    var existing = editingSamePath && originalDeviceData ? _objectSpread({}, originalDeviceData) : {};
    if (category === "batteryHotswaps") {
      targetCategory[name] = _objectSpread(_objectSpread({}, existing), {}, {
        capacity: capacity,
        pinA: pinA
      });
    } else {
      targetCategory[name] = _objectSpread(_objectSpread({}, existing), {}, {
        capacity: capacity,
        pinA: pinA,
        dtapA: dtapA
      });
    }
    applyDynamicFieldsToDevice(targetCategory, name, category, categoryExcludedAttrs[category] || []);
  } else if (category === "accessories.cables") {
    var _existing = isEditing && originalDeviceData ? _objectSpread({}, originalDeviceData) : {};
    targetCategory[name] = _objectSpread({}, _existing);
    applyDynamicFieldsToDevice(targetCategory, name, "accessories.cables.".concat(subcategory), categoryExcludedAttrs["accessories.cables.".concat(subcategory)] || []);
  } else if (category === "cameras") {
    var watt = parseFloat(cameraWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    var powerDist, videoOut, fizCon, viewfinder, timecode, plateSupport;
    try {
      powerDist = invokeCoreFunctionStrict('getPowerDistribution');
      videoOut = invokeCoreFunctionStrict('getVideoOutputs');
      fizCon = invokeCoreFunctionStrict('getFizConnectors');
      viewfinder = invokeCoreFunctionStrict('getViewfinders');
      timecode = invokeCoreFunctionStrict('getTimecodes');
      plateSupport = invokeCoreFunctionStrict('getBatteryPlates');
    } catch (e) {
      console.error("Invalid camera JSON input:", e);
      alert(texts[currentLang].alertInvalidCameraJSON);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: watt,
      power: {
        input: {
          voltageRange: cameraVoltageInput.value,
          type: cameraPortTypeInput.value
        },
        batteryPlateSupport: plateSupport,
        powerDistributionOutputs: powerDist
      },
      videoOutputs: videoOut,
      fizConnectors: fizCon,
      recordingMedia: getRecordingMedia(),
      viewfinder: viewfinder,
      lensMount: getLensMounts(),
      timecode: timecode
    };
    applyDynamicFieldsToDevice(targetCategory, name, category, categoryExcludedAttrs[category] || []);
    callCoreFunctionIfAvailable('updateMountTypeOptions', [], {
      defer: true
    });
  } else if (category === "lenses") {
    var _existing2 = editingSamePath && originalDeviceData ? _objectSpread({}, originalDeviceData) : {};
    var mountOptions = getLensDeviceMountOptions();
    if (mountOptions.length) {
      _existing2.mountOptions = mountOptions;
      _existing2.mount = mountOptions[0].type || '';
    } else {
      delete _existing2.mountOptions;
      delete _existing2.mount;
    }
    if (lensFocusScaleSelect) {
      var selectedFocusScale = normalizeLensFocusScale(lensFocusScaleSelect.value);
      if (selectedFocusScale) {
        _existing2.focusScale = selectedFocusScale;
      } else {
        delete _existing2.focusScale;
      }
    }
    targetCategory[name] = _existing2;
    applyDynamicFieldsToDevice(targetCategory, name, category, categoryExcludedAttrs[category] || []);
    callCoreFunctionIfAvailable('updateMountTypeOptions', [], {
      defer: true
    });
  } else if (category === "monitors" || category === "directorMonitors") {
    var _watt = parseFloat(monitorWattInput.value);
    if (isNaN(_watt) || _watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    var screenSize = parseFloat(monitorScreenSizeInput.value);
    var brightness = parseFloat(monitorBrightnessInput.value);
    var monitorLatencyRaw = typeof monitorLatencyInput.value === 'string' ? monitorLatencyInput.value.trim() : '';
    var monitorLatencyValue = monitorLatencyRaw !== '' ? monitorLatencyRaw : undefined;
    var monitorData = {
      screenSizeInches: isNaN(screenSize) ? undefined : screenSize,
      brightnessNits: isNaN(brightness) ? undefined : brightness,
      powerDrawWatts: _watt,
      power: {
        input: {
          voltageRange: monitorVoltageInput.value,
          type: monitorPortTypeInput.value
        },
        output: null
      },
      video: {
        inputs: getMonitorVideoInputs(),
        outputs: getMonitorVideoOutputs()
      },
      wirelessTx: monitorWirelessTxInput.checked,
      audioOutput: monitorAudioOutputInput.value ? {
        portType: monitorAudioOutputInput.value
      } : undefined
    };
    if (typeof monitorLatencyValue !== 'undefined') {
      monitorData.latencyMs = monitorLatencyValue;
    }
    targetCategory[name] = monitorData;
    applyDynamicFieldsToDevice(targetCategory, name, category, categoryExcludedAttrs[category] || []);
  } else if (category === "viewfinders") {
    var _watt2 = parseFloat(viewfinderWattInput.value);
    if (isNaN(_watt2) || _watt2 <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    var _screenSize = parseFloat(viewfinderScreenSizeInput.value);
    var _brightness = parseFloat(viewfinderBrightnessInput.value);
    var viewfinderLatencyRaw = typeof viewfinderLatencyInput.value === 'string' ? viewfinderLatencyInput.value.trim() : '';
    var viewfinderLatencyValue = viewfinderLatencyRaw !== '' ? viewfinderLatencyRaw : undefined;
    var viewfinderData = {
      screenSizeInches: isNaN(_screenSize) ? undefined : _screenSize,
      brightnessNits: isNaN(_brightness) ? undefined : _brightness,
      powerDrawWatts: _watt2,
      power: {
        input: {
          voltageRange: viewfinderVoltageInput.value,
          type: viewfinderPortTypeInput.value
        },
        output: null
      },
      video: {
        inputs: getViewfinderVideoInputs(),
        outputs: getViewfinderVideoOutputs()
      },
      wirelessTx: viewfinderWirelessTxInput.checked
    };
    if (typeof viewfinderLatencyValue !== 'undefined') {
      viewfinderData.latencyMs = viewfinderLatencyValue;
    }
    targetCategory[name] = viewfinderData;
    applyDynamicFieldsToDevice(targetCategory, name, category, categoryExcludedAttrs[category] || []);
  } else if (category === "video" || category === "wirelessReceivers" || category === "iosVideo") {
    var _watt3 = parseFloat(newWattInput.value);
    if (isNaN(_watt3) || _watt3 <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    var videoLatencyRaw = typeof videoLatencyInput.value === 'string' ? videoLatencyInput.value.trim() : '';
    var videoLatencyValue = videoLatencyRaw !== '' ? videoLatencyRaw : undefined;
    var videoPowerInputs;
    try {
      videoPowerInputs = invokeCoreFunctionStrict('getVideoPowerInputs', []);
    } catch (powerInputError) {
      if (eventsLogger && typeof eventsLogger.error === 'function') {
        try {
          eventsLogger.error('Failed to collect video power inputs', powerInputError, {
            namespace: 'device-editor'
          });
        } catch (logError) {
          void logError;
        }
      }
      if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error('Failed to collect video power inputs', powerInputError);
      }
      videoPowerInputs = undefined;
    }
    var existingVideoDevice = isEditing && originalDeviceData && _typeof(originalDeviceData) === 'object' ? function () {
      try {
        return JSON.parse(JSON.stringify(originalDeviceData));
      } catch (cloneError) {
        void cloneError;
        return _objectSpread({}, originalDeviceData);
      }
    }() : {};
    var videoDeviceData = existingVideoDevice && _typeof(existingVideoDevice) === 'object' ? existingVideoDevice : {};
    videoDeviceData.powerDrawWatts = _watt3;
    var normalizedInputs = getVideoInputs();
    if (Array.isArray(normalizedInputs) && normalizedInputs.length) {
      videoDeviceData.videoInputs = normalizedInputs;
    } else {
      delete videoDeviceData.videoInputs;
    }
    var normalizedOutputs = getVideoOutputsIO();
    if (Array.isArray(normalizedOutputs) && normalizedOutputs.length) {
      videoDeviceData.videoOutputs = normalizedOutputs;
    } else {
      delete videoDeviceData.videoOutputs;
    }
    var rawFrequency = typeof videoFrequencyInput.value === 'string' ? videoFrequencyInput.value.trim() : '';
    if (rawFrequency) {
      videoDeviceData.frequency = rawFrequency;
    } else {
      delete videoDeviceData.frequency;
    }
    if (typeof videoPowerInputs !== 'undefined') {
      var mergePowerInput = typeof VIDEO_POWER_INPUT_HELPERS.mergePowerInput === 'function' ? VIDEO_POWER_INPUT_HELPERS.mergePowerInput : function (power, input) {
        var base = power && _typeof(power) === 'object' ? _objectSpread({}, power) : {};
        base.input = input;
        return base;
      };
      var mergedPower = mergePowerInput(videoDeviceData.power, videoPowerInputs);
      if (mergedPower && Object.keys(mergedPower).length) {
        videoDeviceData.power = mergedPower;
      } else {
        delete videoDeviceData.power;
      }
    } else {
      delete videoDeviceData.power;
    }
    if (typeof videoLatencyValue !== 'undefined') {
      videoDeviceData.latencyMs = videoLatencyValue;
    } else {
      delete videoDeviceData.latencyMs;
    }
    targetCategory[name] = videoDeviceData;
    applyDynamicFieldsToDevice(targetCategory, name, category, categoryExcludedAttrs[category] || []);
  } else if (category === "fiz.motors") {
    var _watt4 = parseFloat(newWattInput.value);
    if (isNaN(_watt4) || _watt4 <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: _watt4,
      fizConnector: motorConnectorInput.value,
      internalController: motorInternalInput.checked,
      torqueNm: motorTorqueInput.value ? parseFloat(motorTorqueInput.value) : null,
      gearTypes: motorGearInput.value ? motorGearInput.value.split(',').map(function (s) {
        return s.trim();
      }).filter(Boolean) : [],
      notes: motorNotesInput.value
    };
    applyDynamicFieldsToDevice(targetCategory, name, category, categoryExcludedAttrs[category] || []);
  } else if (category === "fiz.controllers") {
    var _watt5 = parseFloat(newWattInput.value);
    if (isNaN(_watt5) || _watt5 <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: _watt5,
      fizConnector: controllerConnectorInput.value,
      powerSource: controllerPowerInput.value,
      batteryType: controllerBatteryInput.value,
      connectivity: controllerConnectivityInput.value,
      notes: controllerNotesInput.value
    };
    applyDynamicFieldsToDevice(targetCategory, name, category, categoryExcludedAttrs[category] || []);
  } else if (category === "fiz.distance") {
    var _watt6 = parseFloat(newWattInput.value);
    if (isNaN(_watt6) || _watt6 <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: _watt6,
      connectionCompatibility: distanceConnectionInput.value,
      measurementMethod: distanceMethodInput.value,
      measurementRange: distanceRangeInput.value,
      accuracy: distanceAccuracyInput.value,
      outputDisplay: distanceOutputInput.value,
      notes: distanceNotesInput.value
    };
    applyDynamicFieldsToDevice(targetCategory, name, category, categoryExcludedAttrs[category] || []);
  } else {
    var _watt7 = parseFloat(newWattInput.value);
    if (isNaN(_watt7) || _watt7 <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    var _existing3 = editingSamePath && originalDeviceData ? _objectSpread({}, originalDeviceData) : {};
    targetCategory[name] = _objectSpread(_objectSpread({}, _existing3), {}, {
      powerDrawWatts: _watt7
    });
    applyDynamicFieldsToDevice(targetCategory, name, category, categoryExcludedAttrs[category] || []);
  }
  if (isEditing) {
    removeOriginalDeviceEntry(storedOriginalCategory, storedOriginalSubcategory, originalName, category, subcategory, name);
    addDeviceBtn.dataset.originalCategory = category;
    if (category === "accessories.cables" && subcategory) {
      addDeviceBtn.dataset.originalSubcategory = subcategory;
    } else {
      delete addDeviceBtn.dataset.originalSubcategory;
    }
    addDeviceBtn.dataset.originalName = name;
  }
  clearDeviceManagerFilterForCategory(category, name);
  resetDeviceForm();
  if (typeof updateGlobalDevicesReference === 'function') {
    updateGlobalDevicesReference(devices);
  }
  storeDevices(devices);
  viewfinderTypeOptions = syncCoreOptionsArray('viewfinderTypeOptions', 'getAllViewfinderTypes', viewfinderTypeOptions);
  viewfinderConnectorOptions = syncCoreOptionsArray('viewfinderConnectorOptions', 'getAllViewfinderConnectors', viewfinderConnectorOptions);
  callEventsCoreFunction('updatePlateTypeOptions');
  callEventsCoreFunction('updatePowerPortOptions');
  callEventsCoreFunction('updatePowerDistTypeOptions');
  callEventsCoreFunction('updatePowerDistVoltageOptions');
  callEventsCoreFunction('updatePowerDistCurrentOptions');
  callEventsCoreFunction('updateRecordingMediaOptions');
  callEventsCoreFunction('updateTimecodeTypeOptions');
  refreshDeviceListsSafe();
  populateSelect(cameraSelect, devices.cameras, true);
  populateMonitorSelect();
  populateSelect(videoSelect, devices.video, true);
  var fiz = devices.fiz || {};
  motorSelects.forEach(function (sel) {
    return populateSelect(sel, fiz.motors, true);
  });
  controllerSelects.forEach(function (sel) {
    return populateSelect(sel, fiz.controllers, true);
  });
  populateSelect(distanceSelect, fiz.distance, true);
  populateSelect(batterySelect, devices.batteries, true);
  updateFizConnectorOptions();
  applyFilters();
  updateCalculations();
  if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function') {
    var normalizedSubcategory = category === "accessories.cables" && subcategory ? subcategory.trim() || null : null;
    var detail = {
      name: name,
      category: category,
      subcategory: normalizedSubcategory
    };
    if (isEditing) {
      detail.original = {
        name: originalName || '',
        category: storedOriginalCategory || '',
        subcategory: storedOriginalCategory === "accessories.cables" ? storedOriginalSubcategory ? storedOriginalSubcategory : null : null
      };
    }
    try {
      document.dispatchEvent(new CustomEvent(isEditing ? 'device-library:update' : 'device-library:add', {
        detail: detail
      }));
    } catch (error) {
      console.warn('Failed to dispatch device library mutation event', error);
    }
  }
  var categoryKey = category.replace(".", "_");
  var categoryDisplay = texts[currentLang]["category_" + categoryKey] || category;
  if (isEditing) {
    alert(texts[currentLang].alertDeviceUpdated.replace("{name}", name).replace("{category}", categoryDisplay));
  } else {
    alert(texts[currentLang].alertDeviceAdded.replace("{name}", name).replace("{category}", categoryDisplay));
  }
});
addSafeEventListener(cancelEditBtn, "click", function () {
  resetDeviceForm();
});
addSafeEventListener(exportBtn, "click", function () {
  if (typeof autoBackup === 'function') {
    try {
      autoBackup({
        suppressSuccess: true,
        triggerAutoSaveNotification: true,
        reason: 'export'
      });
    } catch (error) {
      console.warn('Failed to auto backup before export', error);
    }
  }
  var dataStr = JSON.stringify(devices, null, 2);
  exportOutput.style.display = "block";
  exportOutput.value = dataStr;
  var blob = new Blob([dataStr], {
    type: "application/json"
  });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "device_data_export.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});
var exportAndRevertBtn = document.getElementById('exportAndRevertBtn');
if (exportAndRevertBtn) {
  addSafeEventListener(exportAndRevertBtn, 'click', function () {
    if (confirm(texts[currentLang].confirmExportAndRevert)) {
      if (typeof autoBackup === 'function') {
        try {
          autoBackup({
            suppressSuccess: true,
            triggerAutoSaveNotification: true,
            reason: 'export-revert'
          });
        } catch (error) {
          console.warn('Failed to auto backup before export and revert', error);
        }
      }
      var dataStr = JSON.stringify(devices, null, 2);
      var blob = new Blob([dataStr], {
        type: "application/json"
      });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "device_data_backup_before_revert.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      var revertTimer = setTimeout(function () {
        var clearedVariants = clearAllDeviceStorageVariantsForEvents();
        if (!clearedVariants) {
          try {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
              console.warn('Unable to confirm device storage reset during export & revert');
            }
          } catch (logError) {
            void logError;
          }
        }
        alert(texts[currentLang].alertExportAndRevertSuccess);
        location.reload();
      }, 500);
      if (typeof revertTimer.unref === 'function') {
        revertTimer.unref();
      }
    }
  });
}
addSafeEventListener(importDataBtn, "click", function () {
  importFileInput.click();
});
addSafeEventListener(importFileInput, "change", function (event) {
  var file = event.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  var importFileName = typeof file.name === 'string' && file.name ? file.name : null;
  reader.onload = function (e) {
    try {
      var importedData = JSON.parse(e.target.result);
      var result = parseDeviceDatabaseImport(importedData);
      var importDeviceCounts = buildDeviceCountsSnapshot(devices, result.devices);
      if (!result.devices) {
        var summary = formatDeviceImportErrors(result.errors);
        logDeviceImportEvent('warn', 'Device import validation failed', {
          fileName: importFileName,
          deviceCounts: importDeviceCounts,
          validationErrors: sanitizeImportErrors(result.errors),
          errorCount: Array.isArray(result.errors) ? result.errors.length : 0
        }, {
          action: 'validate'
        });
        console.error('Device import validation failed:', result.errors);
        alert(summary ? "".concat(texts[currentLang].alertImportError, "\n").concat(summary) : texts[currentLang].alertImportError);
        return;
      }
      if (typeof autoBackup === 'function') {
        try {
          autoBackup({
            suppressSuccess: true,
            triggerAutoSaveNotification: true,
            reason: 'import'
          });
        } catch (error) {
          logDeviceImportEvent('warn', 'Auto backup before device import failed', {
            fileName: importFileName,
            deviceCounts: importDeviceCounts,
            error: sanitizeErrorForLogging(error)
          }, {
            action: 'auto-backup'
          });
          console.warn('Failed to auto backup before import', error);
        }
      }
      devices = result.devices;
      if (typeof updateGlobalDevicesReference === 'function') {
        updateGlobalDevicesReference(devices);
      }
      unifyDevices(devices, {
        force: true
      });
      storeDevices(devices);
      viewfinderTypeOptions = syncCoreOptionsArray('viewfinderTypeOptions', 'getAllViewfinderTypes', viewfinderTypeOptions);
      viewfinderConnectorOptions = syncCoreOptionsArray('viewfinderConnectorOptions', 'getAllViewfinderConnectors', viewfinderConnectorOptions);
      refreshDeviceListsSafe();
      populateSelect(cameraSelect, devices.cameras, true);
      populateMonitorSelect();
      populateSelect(videoSelect, devices.video, true);
      motorSelects.forEach(function (sel) {
        return populateSelect(sel, devices.fiz.motors, true);
      });
      controllerSelects.forEach(function (sel) {
        return populateSelect(sel, devices.fiz.controllers, true);
      });
      populateSelect(distanceSelect, devices.fiz.distance, true);
      populateSelect(batterySelect, devices.batteries, true);
      updateFizConnectorOptions();
      updateMotorConnectorOptions();
      updateControllerConnectorOptions();
      updateControllerPowerOptions();
      updateControllerBatteryOptions();
      updateControllerConnectivityOptions();
      updateDistanceConnectionOptions();
      updateDistanceMethodOptions();
      updateDistanceDisplayOptions();
      applyFilters();
      updateCalculations();
      var deviceCount = countDeviceDatabaseEntries(devices);
      alert(texts[currentLang].alertImportSuccess.replace("{num_devices}", deviceCount));
      exportOutput.style.display = "block";
      exportOutput.value = JSON.stringify(devices, null, 2);
    } catch (error) {
      logDeviceImportEvent('error', 'Failed to import device data', {
        fileName: importFileName,
        deviceCounts: buildDeviceCountsSnapshot(devices, null),
        error: sanitizeErrorForLogging(error)
      }, {
        action: 'parse'
      });
      console.error("Error parsing or importing data:", error);
      var errorMessage = error && error.message ? error.message : String(error);
      var _summary = formatDeviceImportErrors([errorMessage]);
      alert(_summary ? "".concat(texts[currentLang].alertImportError, "\n").concat(_summary) : texts[currentLang].alertImportError);
    }
  };
  reader.readAsText(file);
  event.target.value = '';
});