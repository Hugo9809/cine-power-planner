function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function initializeStorageModule() {
  var GLOBAL_SCOPE = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : null;
  var FORCE_STORAGE_REINITIALIZE = typeof process !== 'undefined' && process && process.env && (process.env.JEST_WORKER_ID || process.env.CINE_FORCE_STORAGE_REINIT);
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
      if (typeof module !== 'undefined' && module.exports && GLOBAL_SCOPE.__cineStorageApi && _typeof(GLOBAL_SCOPE.__cineStorageApi) === 'object') {
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
        value: true
      });
    } catch (storageInitFlagError) {
      GLOBAL_SCOPE.__cineStorageInitialized = true;
      void storageInitFlagError;
    }
  }
  var STORAGE_DEEP_CLONE = GLOBAL_SCOPE && typeof GLOBAL_SCOPE.__cineDeepClone === 'function' ? GLOBAL_SCOPE.__cineDeepClone : function storageFallbackDeepClone(value) {
    if (value === null || _typeof(value) !== 'object') {
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
  var MOUNT_VOLTAGE_STORAGE_KEY_SYMBOL = typeof Symbol === 'function' ? Symbol.for('cinePowerPlanner.mountVoltageKey') : null;
  var STORAGE_CACHE_SYMBOL = typeof Symbol === 'function' ? Symbol.for('cinePowerPlanner.storageCache') : '__cineStorageStateCache';
  var STORAGE_STATE_CACHE_WEAKMAP = typeof WeakMap === 'function' && typeof Map === 'function' ? new WeakMap() : null;
  var COMPRESSION_STRATEGY_CACHE = typeof Map === 'function' ? new Map() : null;
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
      strategies: Array.isArray(strategies) ? strategies.slice() : []
    };
    try {
      COMPRESSION_STRATEGY_CACHE.set(cacheKey, payload);
      pruneCompressionStrategyCache(cacheKey);
    } catch (cacheStoreError) {
      void cacheStoreError;
    }
  }
  function getStorageStateCacheMap(storage, createIfMissing) {
    if (!storage || _typeof(storage) !== 'object' && typeof storage !== 'function') {
      return null;
    }
    var existing = null;
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
    var map = new Map();
    var assigned = false;
    if (STORAGE_CACHE_SYMBOL) {
      try {
        Object.defineProperty(storage, STORAGE_CACHE_SYMBOL, {
          configurable: true,
          writable: true,
          value: map
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
    var map = getStorageStateCacheMap(storage, false);
    if (!map || typeof key !== 'string' || !key) {
      return null;
    }
    return map.get(key) || null;
  }
  function clearCachedStorageEntry(storage, key) {
    var map = getStorageStateCacheMap(storage, false);
    if (!map || typeof key !== 'string' || !key) {
      return;
    }
    if (typeof map.delete === 'function') {
      map.delete(key);
    }
    if (map.size === 0) {
      if (STORAGE_CACHE_SYMBOL) {
        try {
          if (storage && (_typeof(storage) === 'object' || typeof storage === 'function')) {
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
    if (value === null || _typeof(value) !== 'object') {
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
    var value = entry.value;
    if (value === null || _typeof(value) !== 'object') {
      return value;
    }
    return cloneValueForCache(value);
  }
  function cacheStorageValue(storage, key, rawValue, normalizedValue, value) {
    if (typeof key !== 'string' || !key) {
      return;
    }
    if (!storage || _typeof(storage) !== 'object' && typeof storage !== 'function') {
      return;
    }
    var map = getStorageStateCacheMap(storage, true);
    if (!map) {
      return;
    }
    var cachedValue = cloneValueForCache(value);
    var normalized = typeof normalizedValue === 'string' && normalizedValue ? normalizedValue : typeof rawValue === 'string' && rawValue ? rawValue : null;
    var cacheEntry = {
      raw: typeof rawValue === 'string' && rawValue ? rawValue : null,
      normalizedRaw: normalized,
      value: cachedValue
    };
    map.set(key, cacheEntry);
  }
  function tryGetCachedStorageValue(storage, key, primaryRaw, rawStored) {
    var entry = getCachedStorageEntry(storage, key);
    if (!entry) {
      return {
        hit: false
      };
    }
    if (typeof rawStored === 'string' && rawStored) {
      if (entry.raw && entry.raw === rawStored) {
        return {
          hit: true,
          value: cloneCachedEntryValue(entry)
        };
      }
    }
    if (typeof primaryRaw === 'string' && primaryRaw) {
      if (entry.normalizedRaw && entry.normalizedRaw === primaryRaw) {
        return {
          hit: true,
          value: cloneCachedEntryValue(entry)
        };
      }
      if (entry.raw && entry.raw === primaryRaw) {
        return {
          hit: true,
          value: cloneCachedEntryValue(entry)
        };
      }
    }
    return {
      hit: false
    };
  }
  function readGlobalStringValue(scope, key) {
    if (!scope || _typeof(scope) !== 'object') {
      return '';
    }
    var descriptor;
    try {
      descriptor = Object.getOwnPropertyDescriptor(scope, key);
    } catch (descriptorError) {
      descriptor = null;
      void descriptorError;
    }
    if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, 'value') && typeof descriptor.value === 'string' && descriptor.value) {
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
        var symbolValue = scope[MOUNT_VOLTAGE_STORAGE_KEY_SYMBOL];
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
    var descriptor;
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
    if (!GLOBAL_SCOPE || _typeof(GLOBAL_SCOPE) !== 'object') {
      return MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK;
    }
    var existing = readGlobalStringValue(GLOBAL_SCOPE, 'MOUNT_VOLTAGE_STORAGE_KEY');
    if (existing) {
      return existing;
    }
    var exposed = exposeGlobalStringValue(GLOBAL_SCOPE, 'MOUNT_VOLTAGE_STORAGE_KEY', MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK);
    if (exposed) {
      return exposed;
    }
    return MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK;
  }
  var MOUNT_VOLTAGE_STORAGE_KEY_NAME = resolveMountVoltageStorageKeyName();
  function refreshMountVoltageStorageKeyName() {
    var resolved = resolveMountVoltageStorageKeyName();
    if (resolved && resolved !== MOUNT_VOLTAGE_STORAGE_KEY_NAME) {
      MOUNT_VOLTAGE_STORAGE_KEY_NAME = resolved;
      if (GLOBAL_SCOPE) {
        exposeGlobalStringValue(GLOBAL_SCOPE, 'MOUNT_VOLTAGE_STORAGE_KEY', resolved);
      }
      if (typeof RAW_STORAGE_BACKUP_KEYS !== 'undefined' && RAW_STORAGE_BACKUP_KEYS && typeof RAW_STORAGE_BACKUP_KEYS.add === 'function') {
        RAW_STORAGE_BACKUP_KEYS.add(resolved);
        var variants = getStorageKeyVariants(resolved);
        for (var i = 0; i < variants.length; i += 1) {
          var variant = variants[i];
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
    var key = refreshMountVoltageStorageKeyName();
    return key ? "".concat(key, "__backup") : "".concat(MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK, "__backup");
  }
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
  var AUTO_BACKUP_METADATA_PROPERTY = '__cineAutoBackupMetadata';
  var AUTO_BACKUP_SNAPSHOT_PROPERTY = '__cineAutoBackupSnapshot';
  var AUTO_BACKUP_SNAPSHOT_VERSION = 1;
  var AUTO_BACKUP_PAYLOAD_COMPRESSION_FLAG = '__cineAutoBackupCompressedPayload';
  var AUTO_BACKUP_PAYLOAD_COMPRESSION_MIN_LENGTH = 2048;
  function isAutoBackupStorageKey(name) {
    return typeof name === 'string' && (name.startsWith(STORAGE_AUTO_BACKUP_NAME_PREFIX) || name.startsWith(STORAGE_AUTO_BACKUP_DELETION_PREFIX));
  }
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
  var MAX_AUTO_BACKUPS = 240;
  var MAX_DELETION_BACKUPS = 20;
  var MAX_FULL_BACKUP_HISTORY_ENTRIES = 200;
  var AUTO_GEAR_BACKUP_RETENTION_DEFAULT_VALUE = 12;
  var AUTO_GEAR_BACKUP_RETENTION_MIN = 1;
  var AUTO_GEAR_BACKUP_RETENTION_MAX = 120;
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
  function cloneAutoBackupMetadata(metadata) {
    if (!metadata || _typeof(metadata) !== 'object') {
      return null;
    }
    return {
      version: Number.isFinite(metadata.version) ? metadata.version : AUTO_BACKUP_SNAPSHOT_VERSION,
      snapshotType: metadata.snapshotType === 'delta' ? 'delta' : 'full',
      base: typeof metadata.base === 'string' ? metadata.base : null,
      sequence: Number.isFinite(metadata.sequence) ? metadata.sequence : metadata.snapshotType === 'delta' ? 1 : 0,
      createdAt: typeof metadata.createdAt === 'string' ? metadata.createdAt : null,
      changedKeys: Array.isArray(metadata.changedKeys) ? metadata.changedKeys.slice() : [],
      removedKeys: Array.isArray(metadata.removedKeys) ? metadata.removedKeys.slice() : []
    };
  }
  function defineAutoBackupMetadata(target, metadata) {
    if (!target || _typeof(target) !== 'object') {
      return;
    }
    var clonedMetadata = cloneAutoBackupMetadata(metadata);
    try {
      Object.defineProperty(target, AUTO_BACKUP_METADATA_PROPERTY, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: clonedMetadata
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
    if (!value || _typeof(value) !== 'object') {
      return null;
    }
    var metadata = value[AUTO_BACKUP_METADATA_PROPERTY];
    if (!metadata || _typeof(metadata) !== 'object') {
      return null;
    }
    return metadata;
  }
  function copyAutoBackupMetadata(source, target) {
    if (!target || _typeof(target) !== 'object') {
      return;
    }
    var metadata = getAutoBackupMetadata(source);
    if (metadata) {
      defineAutoBackupMetadata(target, metadata);
    }
  }
  function cloneAutoBackupValue(value, options) {
    var opts = options || {};
    if (value === null || _typeof(value) !== 'object') {
      return value;
    }
    if (Array.isArray(value)) {
      return value.map(function (item) {
        return cloneAutoBackupValue(item, opts);
      });
    }
    if (value instanceof Date) {
      return new Date(value.getTime());
    }
    var clone = {};
    Object.keys(value).forEach(function (key) {
      clone[key] = cloneAutoBackupValue(value[key], opts);
    });
    if (!opts.stripMetadata) {
      var metadata = getAutoBackupMetadata(value);
      if (metadata) {
        defineAutoBackupMetadata(clone, metadata);
      }
    }
    return clone;
  }
  function cloneAutoBackupValueWithLegacyNormalization(value, options) {
    var cloned = cloneAutoBackupValue(value, options);
    var normalized = normalizeLegacyLongGopStructure(cloned);
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
    if (!payload || _typeof(payload) !== 'object') {
      return {
        payload: payload,
        compression: null,
        compressed: false
      };
    }
    var serialized;
    try {
      serialized = JSON.stringify(payload);
    } catch (error) {
      console.warn('Unable to serialize auto backup payload before compression', error);
      return {
        payload: payload,
        compression: null,
        compressed: false
      };
    }
    if (typeof serialized !== 'string' || serialized.length < AUTO_BACKUP_PAYLOAD_COMPRESSION_MIN_LENGTH) {
      return {
        payload: payload,
        compression: null,
        compressed: false
      };
    }
    var candidate = createCompressedJsonStorageCandidate(serialized);
    if (!candidate || typeof candidate.serialized !== 'string') {
      return {
        payload: payload,
        compression: null,
        compressed: false
      };
    }
    var savings = candidate.originalLength - candidate.wrappedLength;
    var compressedPayload = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, AUTO_BACKUP_PAYLOAD_COMPRESSION_FLAG, true), "data", candidate.serialized), "originalLength", candidate.originalLength), "compressedLength", candidate.wrappedLength), "compressionVariant", candidate.compressionVariant || null);
    if (typeof console !== 'undefined' && typeof console.warn === 'function' && savings > 0) {
      var label = typeof contextName === 'string' && contextName ? "\"".concat(contextName, "\"") : 'an automatic backup';
      var percent = candidate.originalLength > 0 ? Math.round(savings / candidate.originalLength * 100) : 0;
      console.warn("Stored compressed payload for ".concat(label, " snapshot to reduce storage usage by ").concat(savings, " characters (").concat(percent, "%)."));
    }
    return {
      payload: compressedPayload,
      compression: {
        originalLength: candidate.originalLength,
        compressedLength: candidate.wrappedLength,
        compressionVariant: candidate.compressionVariant || null
      },
      compressed: true
    };
  }
  function restoreAutoBackupSnapshotPayload(snapshot, contextName) {
    if (!snapshot || _typeof(snapshot) !== 'object') {
      return {
        payload: snapshot,
        compressed: false
      };
    }
    var rawPayload = snapshot.payload;
    if (!isCompressedAutoBackupSnapshotPayload(rawPayload)) {
      return {
        payload: rawPayload,
        compressed: false
      };
    }
    var decoded = decodeCompressedJsonStorageValue(rawPayload.data);
    if (!decoded.success || typeof decoded.value !== 'string') {
      var details = decoded && decoded.error ? decoded.error : null;
      console.warn('Unable to decompress automatic backup payload.', contextName, details);
      throw new Error('Failed to decompress automatic backup payload');
    }
    try {
      var parsed = JSON.parse(decoded.value);
      return {
        payload: parsed,
        compressed: true
      };
    } catch (error) {
      console.warn('Unable to parse decompressed automatic backup payload.', contextName, error);
      throw error;
    }
  }
  function deriveAutoBackupCreatedAt(name, fallbackDate) {
    var info = parseAutoBackupKey(name);
    if (info && Number.isFinite(info.timestamp) && info.timestamp > 0) {
      try {
        return new Date(info.timestamp).toISOString();
      } catch (error) {
        void error;
      }
    }
    var sourceDate = fallbackDate instanceof Date ? fallbackDate : new Date();
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
    var result = {};
    var cache = new Map();
    var opts = options || {};
    var isAutoBackupKey = typeof opts.isAutoBackupKey === 'function' ? opts.isAutoBackupKey : isAutoBackupStorageKey;
    var _resolve = function resolve(name, stack) {
      if (cache.has(name)) {
        return cache.get(name);
      }
      var value = container[name];
      if (!isPlainObject(value)) {
        var clonedValue = cloneAutoBackupValue(value);
        cache.set(name, clonedValue);
        return clonedValue;
      }
      var snapshot = value[AUTO_BACKUP_SNAPSHOT_PROPERTY];
      if (snapshot && _typeof(snapshot) === 'object') {
        if (stack.has(name)) {
          console.warn('Detected cyclic auto-backup reference while expanding snapshot', name);
          var fallback = {};
          cache.set(name, fallback);
          return fallback;
        }
        stack.add(name);
        var snapshotType = snapshot.snapshotType === 'delta' ? 'delta' : 'full';
        var baseName = snapshotType === 'delta' && typeof snapshot.base === 'string' ? snapshot.base : null;
        var baseValue = baseName ? cloneAutoBackupValue(_resolve(baseName, stack)) : {};
        var payloadInfo;
        try {
          payloadInfo = restoreAutoBackupSnapshotPayload(snapshot, name);
        } catch (payloadError) {
          console.warn('Failed to restore automatic backup payload while expanding snapshot', name, payloadError);
          throw payloadError;
        }
        var payload = isPlainObject(payloadInfo.payload) ? payloadInfo.payload : {};
        var changedKeys = Array.isArray(snapshot.changedKeys) && snapshot.changedKeys.length ? snapshot.changedKeys : Object.keys(payload);
        var removedKeys = Array.isArray(snapshot.removedKeys) ? snapshot.removedKeys : [];
        var expanded = cloneAutoBackupValue(baseValue);
        changedKeys.forEach(function (key) {
          if (Object.prototype.hasOwnProperty.call(payload, key)) {
            expanded[key] = cloneAutoBackupValue(payload[key]);
          }
        });
        removedKeys.forEach(function (key) {
          if (Object.prototype.hasOwnProperty.call(expanded, key)) {
            delete expanded[key];
          }
        });
        var metadata = {
          version: Number.isFinite(snapshot.version) ? snapshot.version : AUTO_BACKUP_SNAPSHOT_VERSION,
          snapshotType: snapshotType,
          base: snapshotType === 'delta' ? baseName : null,
          sequence: Number.isFinite(snapshot.sequence) ? snapshot.sequence : snapshotType === 'delta' ? 1 : 0,
          createdAt: typeof snapshot.createdAt === 'string' ? snapshot.createdAt : deriveAutoBackupCreatedAt(name),
          changedKeys: changedKeys.slice(),
          removedKeys: removedKeys.slice()
        };
        defineAutoBackupMetadata(expanded, metadata);
        cache.set(name, expanded);
        stack.delete(name);
        return expanded;
      }
      var cloned = cloneAutoBackupValue(value);
      if (isAutoBackupKey(name)) {
        var _metadata = {
          version: AUTO_BACKUP_SNAPSHOT_VERSION,
          snapshotType: 'full',
          base: null,
          sequence: 0,
          createdAt: deriveAutoBackupCreatedAt(name),
          changedKeys: Object.keys(cloned),
          removedKeys: []
        };
        defineAutoBackupMetadata(cloned, _metadata);
      }
      cache.set(name, cloned);
      return cloned;
    };
    Object.keys(container).forEach(function (name) {
      if (!isAutoBackupKey(name)) {
        var value = container[name];
        result[name] = isPlainObject(value) ? cloneAutoBackupValue(value) : value;
        return;
      }
      result[name] = _resolve(name, new Set());
    });
    return result;
  }
  function computeAutoBackupDiff(currentValue, baseValue) {
    var payload = {};
    var changedKeys = [];
    var removedKeys = [];
    var baseKeys = isPlainObject(baseValue) ? Object.keys(baseValue) : [];
    var currentKeys = isPlainObject(currentValue) ? Object.keys(currentValue) : [];
    var allKeys = new Set([].concat(_toConsumableArray(baseKeys), _toConsumableArray(currentKeys)));
    allKeys.forEach(function (key) {
      if (key === AUTO_BACKUP_METADATA_PROPERTY) {
        return;
      }
      var hasCurrent = Object.prototype.hasOwnProperty.call(currentValue || {}, key);
      var hasBase = Object.prototype.hasOwnProperty.call(baseValue || {}, key);
      if (!hasCurrent && hasBase) {
        removedKeys.push(key);
        return;
      }
      if (!hasCurrent) {
        return;
      }
      var currentEntry = currentValue ? currentValue[key] : undefined;
      var baseEntry = hasBase ? baseValue[key] : undefined;
      var currentSignature = createStableValueSignature(currentEntry);
      var baseSignature = createStableValueSignature(baseEntry);
      if (currentSignature !== baseSignature) {
        changedKeys.push(key);
        payload[key] = cloneAutoBackupValue(currentEntry, {
          stripMetadata: true
        });
      }
    });
    return {
      payload: payload,
      changedKeys: changedKeys,
      removedKeys: removedKeys
    };
  }
  function serializeAutoBackupEntries(entries, options) {
    if (!isPlainObject(entries)) {
      return entries;
    }
    var opts = options || {};
    var isAutoBackupKey = typeof opts.isAutoBackupKey === 'function' ? opts.isAutoBackupKey : isAutoBackupStorageKey;
    var serialized = {};
    var entryNames = Object.keys(entries);
    entryNames.forEach(function (name) {
      var value = entries[name];
      var normalizedValue = cloneAutoBackupValueWithLegacyNormalization(value, {
        stripMetadata: true
      });
      if (!isAutoBackupKey(name) || !isPlainObject(normalizedValue)) {
        serialized[name] = normalizedValue;
        return;
      }
      var metadata = getAutoBackupMetadata(value);
      var createdAt = metadata && typeof metadata.createdAt === 'string' ? metadata.createdAt : deriveAutoBackupCreatedAt(name);
      if (!metadata || metadata.snapshotType !== 'delta') {
        serialized[name] = {};
        var _snapshot = {
          version: AUTO_BACKUP_SNAPSHOT_VERSION,
          snapshotType: 'full',
          base: null,
          sequence: 0,
          createdAt: createdAt,
          changedKeys: Object.keys(normalizedValue || {}),
          removedKeys: []
        };
        var _prepared = prepareAutoBackupSnapshotPayloadForStorage(normalizedValue, name);
        _snapshot.payload = _prepared.payload;
        if (_prepared.compression) {
          _snapshot.payloadCompression = _prepared.compression;
        }
        serialized[name][AUTO_BACKUP_SNAPSHOT_PROPERTY] = _snapshot;
        return;
      }
      var baseName = typeof metadata.base === 'string' ? metadata.base : null;
      var baseValue = baseName && Object.prototype.hasOwnProperty.call(entries, baseName) ? entries[baseName] : null;
      if (!baseValue || !isPlainObject(baseValue)) {
        serialized[name] = {};
        var _snapshot2 = {
          version: AUTO_BACKUP_SNAPSHOT_VERSION,
          snapshotType: 'full',
          base: null,
          sequence: 0,
          createdAt: createdAt,
          changedKeys: Object.keys(normalizedValue || {}),
          removedKeys: []
        };
        var _prepared2 = prepareAutoBackupSnapshotPayloadForStorage(normalizedValue, name);
        _snapshot2.payload = _prepared2.payload;
        if (_prepared2.compression) {
          _snapshot2.payloadCompression = _prepared2.compression;
        }
        serialized[name][AUTO_BACKUP_SNAPSHOT_PROPERTY] = _snapshot2;
        return;
      }
      var normalizedBase = cloneAutoBackupValueWithLegacyNormalization(baseValue, {
        stripMetadata: true
      });
      var diff = computeAutoBackupDiff(normalizedValue, normalizedBase);
      serialized[name] = {};
      var snapshot = {
        version: Number.isFinite(metadata.version) ? metadata.version : AUTO_BACKUP_SNAPSHOT_VERSION,
        snapshotType: 'delta',
        base: baseName,
        sequence: Number.isFinite(metadata.sequence) ? metadata.sequence : 1,
        createdAt: createdAt,
        changedKeys: diff.changedKeys,
        removedKeys: diff.removedKeys
      };
      var prepared = prepareAutoBackupSnapshotPayloadForStorage(diff.payload, name);
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
    var variants = new Set([key]);
    if (key.startsWith('cameraPowerPlanner_')) {
      variants.add("cinePowerPlanner_".concat(key.slice('cameraPowerPlanner_'.length)));
    } else if (key.startsWith('cinePowerPlanner_')) {
      variants.add("cameraPowerPlanner_".concat(key.slice('cinePowerPlanner_'.length)));
    }
    return Array.from(variants);
  }
  var STORAGE_BACKUP_SUFFIX = '__backup';
  var MAX_SAVE_ATTEMPTS = 3;
  var MAX_QUOTA_RECOVERY_STEPS = 100;
  var STORAGE_MIGRATION_BACKUP_SUFFIX = '__legacyMigrationBackup';
  var RAW_STORAGE_BACKUP_KEYS = new Set([getCustomFontStorageKeyName(), CUSTOM_LOGO_STORAGE_KEY, DEVICE_SCHEMA_CACHE_KEY, MOUNT_VOLTAGE_STORAGE_KEY_NAME]);
  Array.from(RAW_STORAGE_BACKUP_KEYS).forEach(function (key) {
    getStorageKeyVariants(key).forEach(function (variant) {
      if (typeof variant === 'string' && variant) {
        RAW_STORAGE_BACKUP_KEYS.add(variant);
      }
    });
  });
  var CRITICAL_BACKUP_KEY_PROVIDERS = [function () {
    return {
      key: DEVICE_STORAGE_KEY
    };
  }, function () {
    return {
      key: SETUP_STORAGE_KEY
    };
  }, function () {
    return {
      key: SESSION_STATE_KEY
    };
  }, function () {
    return {
      key: FEEDBACK_STORAGE_KEY
    };
  }, function () {
    return {
      key: PROJECT_STORAGE_KEY
    };
  }, function () {
    return {
      key: FAVORITES_STORAGE_KEY
    };
  }, function () {
    return {
      key: DEVICE_SCHEMA_CACHE_KEY
    };
  }, function () {
    return {
      key: AUTO_GEAR_RULES_STORAGE_KEY
    };
  }, function () {
    return {
      key: AUTO_GEAR_SEEDED_STORAGE_KEY
    };
  }, function () {
    return {
      key: AUTO_GEAR_BACKUPS_STORAGE_KEY
    };
  }, function () {
    return {
      key: AUTO_GEAR_PRESETS_STORAGE_KEY
    };
  }, function () {
    return {
      key: AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY
    };
  }, function () {
    return {
      key: AUTO_GEAR_AUTO_PRESET_STORAGE_KEY
    };
  }, function () {
    return {
      key: AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY
    };
  }, function () {
    return {
      key: AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY
    };
  }, function () {
    return {
      key: AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY
    };
  }, function () {
    return {
      key: FULL_BACKUP_HISTORY_STORAGE_KEY
    };
  }, function () {
    return {
      key: CUSTOM_LOGO_STORAGE_KEY
    };
  }, function () {
    return {
      key: getCustomFontStorageKeyName()
    };
  }, function () {
    return {
      key: 'darkMode'
    };
  }, function () {
    return {
      key: 'pinkMode'
    };
  }, function () {
    return {
      key: 'highContrast'
    };
  }, function () {
    return {
      key: 'reduceMotion'
    };
  }, function () {
    return {
      key: 'relaxedSpacing'
    };
  }, function () {
    return {
      key: 'showAutoBackups'
    };
  }, function () {
    return {
      key: 'accentColor'
    };
  }, function () {
    return {
      key: 'fontSize'
    };
  }, function () {
    return {
      key: 'fontFamily'
    };
  }, function () {
    return {
      key: 'language'
    };
  }, function () {
    return {
      key: 'iosPwaHelpShown'
    };
  }, function () {
    return {
      key: TEMPERATURE_UNIT_STORAGE_KEY_NAME
    };
  }, function () {
    return {
      key: getMountVoltageStorageKeyName(),
      backupKey: getMountVoltageStorageBackupKeyName()
    };
  }];
  function createCriticalStorageEntry(candidate) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!candidate || _typeof(candidate) !== 'object') {
      return null;
    }
    var key = candidate.key,
      backupKey = candidate.backupKey,
      _candidate$storage = candidate.storage,
      storage = _candidate$storage === void 0 ? null : _candidate$storage;
    if (typeof key !== 'string' || !key) {
      return null;
    }
    var resolvedBackupKey = typeof backupKey === 'string' && backupKey ? backupKey : "".concat(key).concat(STORAGE_BACKUP_SUFFIX);
    return {
      key: key,
      backupKey: resolvedBackupKey,
      storage: storage,
      label: typeof options.label === 'string' ? options.label : key
    };
  }
  function gatherCriticalStorageEntries() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var entries = [];
    var seen = new Set();
    var pushEntry = function pushEntry(entry) {
      if (!entry) {
        return;
      }
      var variants = getStorageKeyVariants(entry.key);
      var expectedBaseBackupKey = "".concat(entry.key).concat(STORAGE_BACKUP_SUFFIX);
      for (var index = 0; index < variants.length; index += 1) {
        var variantKey = variants[index];
        if (typeof variantKey !== 'string' || !variantKey) {
          continue;
        }
        var resolvedBackupKey = entry.backupKey;
        if (variantKey !== entry.key) {
          if (entry.backupKey === expectedBaseBackupKey) {
            resolvedBackupKey = "".concat(variantKey).concat(STORAGE_BACKUP_SUFFIX);
          }
        }
        var variantEntry = variantKey === entry.key ? entry : _objectSpread(_objectSpread({}, entry), {}, {
          key: variantKey,
          backupKey: resolvedBackupKey
        });
        var storageId = variantEntry.storage || null;
        var id = "".concat(variantEntry.key, "__").concat(storageId ? String(storageId) : 'default');
        if (seen.has(id)) {
          continue;
        }
        seen.add(id);
        entries.push(variantEntry);
      }
    };
    for (var i = 0; i < CRITICAL_BACKUP_KEY_PROVIDERS.length; i += 1) {
      var provider = CRITICAL_BACKUP_KEY_PROVIDERS[i];
      if (typeof provider !== 'function') {
        continue;
      }
      var result = void 0;
      try {
        result = provider(options);
      } catch (providerError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Critical storage key provider failed', providerError);
        }
        continue;
      }
      var entry = createCriticalStorageEntry(result, options);
      if (entry) {
        pushEntry(entry);
      }
    }
    return entries;
  }
  var lastCriticalStorageGuardResult = null;
  function registerCriticalStorageGuardResult(result) {
    lastCriticalStorageGuardResult = result;
    if (!GLOBAL_SCOPE || _typeof(GLOBAL_SCOPE) !== 'object') {
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
          value: result
        });
      } catch (definitionError) {
        void definitionError;
      }
    }
  }
  function ensureCriticalStorageBackups() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var safeStorage = options && options.storage ? options.storage : null;
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
    var summary = {
      ensured: [],
      skipped: [],
      errors: [],
      timestamp: new Date().toISOString(),
      storageType: safeLocalStorageInfo && safeLocalStorageInfo.type ? safeLocalStorageInfo.type : 'unknown'
    };
    var entries = gatherCriticalStorageEntries(options);
    var targetStorage = safeStorage && typeof safeStorage.getItem === 'function' ? safeStorage : null;
    var _loop = function _loop() {
        var entry = entries[index];
        var storage = entry.storage && typeof entry.storage.getItem === 'function' ? entry.storage : targetStorage;
        if (!storage || typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function') {
          summary.skipped.push({
            key: entry.key,
            reason: 'unavailable-storage'
          });
          return 0;
        }
        var primaryValue;
        try {
          primaryValue = storage.getItem(entry.key);
        } catch (readError) {
          summary.errors.push({
            key: entry.key,
            reason: 'read-failed',
            error: readError
          });
          if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn("Critical storage guard could not inspect ".concat(entry.key), readError);
          }
          return 0;
        }
        if (primaryValue === null || primaryValue === undefined) {
          summary.skipped.push({
            key: entry.key,
            reason: 'missing'
          });
          return 0;
        }
        var backupValue;
        try {
          backupValue = storage.getItem(entry.backupKey);
        } catch (backupReadError) {
          summary.errors.push({
            key: entry.key,
            reason: 'backup-read-failed',
            error: backupReadError
          });
          if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn("Critical storage guard could not read backup for ".concat(entry.key), backupReadError);
          }
          return 0;
        }
        if (typeof backupValue === 'string') {
          summary.skipped.push({
            key: entry.key,
            reason: 'exists'
          });
          return 0;
        }
        var stringPrimaryValue = typeof primaryValue === 'string' ? primaryValue : primaryValue === null || primaryValue === undefined ? '' : String(primaryValue);
        var tryStoreBackup = function tryStoreBackup(candidate) {
          try {
            storage.setItem(entry.backupKey, candidate);
            return {
              success: true,
              error: null
            };
          } catch (error) {
            return {
              success: false,
              error: error
            };
          }
        };
        var recordError = function recordError(error) {
          var reason = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'backup-write-failed';
          summary.errors.push({
            key: entry.key,
            reason: reason,
            error: error
          });
          if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error("Critical storage guard could not mirror ".concat(entry.key), error);
          }
        };
        var shouldAttemptCompression = typeof stringPrimaryValue === 'string' && stringPrimaryValue && !stringPrimaryValue.includes("\"".concat(STORAGE_COMPRESSION_FLAG_KEY, "\":true"));
        var candidateValue = stringPrimaryValue;
        var compressionInfo = null;
        var writeResult = tryStoreBackup(candidateValue);
        if (!writeResult.success && writeResult.error) {
          if (!isQuotaExceededError(writeResult.error)) {
            recordError(writeResult.error);
            return 0;
          }
          if (shouldAttemptCompression) {
            var compressedCandidate = createCompressedJsonStorageCandidate(stringPrimaryValue);
            if (compressedCandidate && typeof compressedCandidate.serialized === 'string' && compressedCandidate.serialized) {
              candidateValue = compressedCandidate.serialized;
              compressionInfo = compressedCandidate;
              writeResult = tryStoreBackup(candidateValue);
            }
          }
          if (!writeResult.success && writeResult.error && isQuotaExceededError(writeResult.error)) {
            var skipKeys = [entry.key, entry.backupKey];
            var sweepResult = attemptStorageCompressionSweep(storage, {
              skipKeys: skipKeys
            });
            if (sweepResult && sweepResult.success) {
              writeResult = tryStoreBackup(candidateValue);
            }
          }
          if (!writeResult.success) {
            recordError(writeResult.error, isQuotaExceededError(writeResult.error) ? 'backup-quota-exceeded' : 'backup-write-failed');
            if (isQuotaExceededError(writeResult.error)) {
              alertStorageError('critical-backup-quota');
            }
            return 0;
          }
        }
        summary.ensured.push({
          key: entry.key,
          backupKey: entry.backupKey,
          compressed: Boolean(compressionInfo)
        });
        if (compressionInfo && typeof console !== 'undefined' && typeof console.warn === 'function' && typeof compressionInfo.originalLength === 'number' && typeof compressionInfo.wrappedLength === 'number') {
          var savings = compressionInfo.originalLength - compressionInfo.wrappedLength;
          var percent = compressionInfo.originalLength > 0 ? Math.round(savings / compressionInfo.originalLength * 100) : 0;
          console.warn("Stored compressed critical backup for ".concat(entry.key, ", reducing storage usage by ").concat(savings, " characters (").concat(percent, "%)."));
        }
      },
      _ret;
    for (var index = 0; index < entries.length; index += 1) {
      _ret = _loop();
      if (_ret === 0) continue;
    }
    registerCriticalStorageGuardResult(summary);
    if (summary.ensured.length && typeof console !== 'undefined' && typeof console.info === 'function') {
      var mirroredDetails = summary.ensured.map(function (entry) {
        return {
          key: entry.key,
          backupKey: entry.backupKey
        };
      });
      console.info('Critical storage guard mirrored backup copies', {
        count: summary.ensured.length,
        entries: mirroredDetails
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
  var MIGRATION_BACKUP_COMPRESSION_VARIANTS = [{
    variant: 'utf16',
    compress: 'compressToUTF16',
    decompress: 'decompressFromUTF16'
  }, {
    variant: 'uri-component',
    compress: 'compressToEncodedURIComponent',
    decompress: 'decompressFromEncodedURIComponent'
  }, {
    variant: 'base64',
    compress: 'compressToBase64',
    decompress: 'decompressFromBase64'
  }];
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
    var lzReference = (typeof LZString === "undefined" ? "undefined" : _typeof(LZString)) === 'object' && LZString ? LZString : null;
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
      var compressFn = typeof lzReference[variant.compress] === 'function' ? lzReference[variant.compress] : null;
      var decompressFn = typeof lzReference[variant.decompress] === 'function' ? lzReference[variant.decompress] : null;
      if (compressFn && decompressFn) {
        available.push({
          variant: variant.variant,
          compress: compressFn,
          decompress: decompressFn
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
      return {
        success: false
      };
    }
    var available = getAvailableLZStringCompressionStrategies(variants);
    if (!available.length) {
      return {
        success: false
      };
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
        console.warn("Compression variant ".concat(preferredVariant, " is unavailable while reading ").concat(contextLabel || 'compressed payload', "."));
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
          return {
            success: true,
            value: decompressed,
            variant: strategy.variant
          };
        }
      } catch (error) {
        lastError = error;
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn("Unable to decompress ".concat(contextLabel || 'compressed payload', " with ").concat(strategy.variant, " variant"), error);
        }
      }
    }
    return {
      success: false,
      error: lastError
    };
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
        console.warn("Unable to compress migration backup payload with ".concat(strategy.variant, " variant"), compressionError);
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
        compressedSize: compressed.length
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
          variant: strategy.variant
        };
      }
    }
    return bestCandidate;
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
        var candidate = null;
        if (typeof parsed.createdAt === 'string') {
          candidate = parsed.createdAt.trim();
        } else if (typeof parsed.createdAt === 'number' && Number.isFinite(parsed.createdAt)) {
          metadata.createdAt = parsed.createdAt;
        }
        if (candidate) {
          var timestamp = Date.parse(candidate);
          if (!Number.isNaN(timestamp)) {
            metadata.createdAt = timestamp;
          }
        } else {
          for (var i = 0; i < MIGRATION_BACKUP_LEGACY_CREATED_AT_KEYS.length; i += 1) {
            var key = MIGRATION_BACKUP_LEGACY_CREATED_AT_KEYS[i];
            if (typeof parsed[key] === 'string') {
              var trimmed = parsed[key].trim();
              if (trimmed) {
                var _timestamp = Date.parse(trimmed);
                if (!Number.isNaN(_timestamp)) {
                  metadata.createdAt = _timestamp;
                  break;
                }
              }
            } else if (typeof parsed[key] === 'number' && Number.isFinite(parsed[key])) {
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
        console.warn('Unable to compress storage payload with '.concat(strategy.variant, ' variant'), compressionError);
        continue;
      }
      if (typeof compressed !== 'string' || !compressed) {
        continue;
      }
      var wrapper = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, STORAGE_COMPRESSION_FLAG_KEY, true), "version", STORAGE_COMPRESSION_VERSION), "algorithm", STORAGE_COMPRESSION_ALGORITHM), "namespace", STORAGE_COMPRESSION_NAMESPACE), "data", compressed), "originalLength", serialized.length), "compressedPayloadLength", compressed.length), "compressionVariant", strategy.variant);
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
          compressionVariant: strategy.variant
        };
      }
    }
    return best;
  }
  function decodeCompressedJsonStorageValue(raw) {
    if (typeof raw !== 'string') {
      return {
        success: false
      };
    }
    if (!raw || raw.charCodeAt(0) !== 123) {
      return {
        success: false
      };
    }
    if (!raw.includes("\"".concat(STORAGE_COMPRESSION_FLAG_KEY, "\":true")) || !raw.includes("\"namespace\":\"".concat(STORAGE_COMPRESSION_NAMESPACE))) {
      return {
        success: false
      };
    }
    var parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (parseError) {
      return {
        success: false,
        error: parseError
      };
    }
    if (!parsed || parsed[STORAGE_COMPRESSION_FLAG_KEY] !== true) {
      return {
        success: false
      };
    }
    if (parsed.namespace !== STORAGE_COMPRESSION_NAMESPACE) {
      return {
        success: false
      };
    }
    if (parsed.version !== STORAGE_COMPRESSION_VERSION) {
      console.warn('Unsupported storage compression version', parsed.version);
      return {
        success: false
      };
    }
    if (parsed.algorithm !== STORAGE_COMPRESSION_ALGORITHM && parsed.algorithm !== LEGACY_STORAGE_COMPRESSION_ALGORITHM) {
      console.warn('Unsupported storage compression algorithm', parsed.algorithm);
      return {
        success: false
      };
    }
    if (typeof parsed.data !== 'string' || !parsed.data) {
      return {
        success: false
      };
    }
    if (!canUseJsonValueCompression()) {
      console.warn('Compressed storage payload detected but compression library is unavailable.');
      return {
        success: false
      };
    }
    var preferredVariant = null;
    if (typeof parsed.compressionVariant === 'string' && parsed.compressionVariant) {
      preferredVariant = parsed.compressionVariant;
    } else if (parsed.algorithm === LEGACY_STORAGE_COMPRESSION_ALGORITHM) {
      preferredVariant = 'utf16';
    }
    var decoded = tryDecompressWithStrategies(parsed.data, STORAGE_COMPRESSION_VARIANTS, preferredVariant, 'storage payload');
    if (!decoded.success) {
      return {
        success: false,
        error: decoded.error
      };
    }
    if (!parsed.compressionVariant && decoded.variant) {
      parsed.compressionVariant = decoded.variant;
    }
    return {
      success: true,
      value: decoded.value,
      metadata: parsed
    };
  }
  function maybeDecompressStoredString(raw, options) {
    if (typeof raw !== 'string') {
      return raw;
    }
    var decoded = decodeCompressedJsonStorageValue(raw);
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
      return {
        success: false,
        compressed: 0,
        freed: 0
      };
    }
    var _ref = options || {},
      _ref$skipKeys = _ref.skipKeys,
      skipKeys = _ref$skipKeys === void 0 ? [] : _ref$skipKeys,
      _ref$limit = _ref.limit,
      limit = _ref$limit === void 0 ? STORAGE_COMPRESSION_SWEEP_LIMIT : _ref$limit,
      _ref$minSavings = _ref.minSavings,
      minSavings = _ref$minSavings === void 0 ? STORAGE_COMPRESSION_SWEEP_MIN_SAVINGS : _ref$minSavings;
    var skipSet = new Set();
    if (Array.isArray(skipKeys)) {
      for (var i = 0; i < skipKeys.length; i += 1) {
        var key = skipKeys[i];
        if (typeof key === 'string' && key) {
          skipSet.add(key);
        }
      }
    }
    var minSavingsThreshold = typeof minSavings === 'number' && minSavings > 0 ? minSavings : 0;
    var total = storage.length;
    var candidates = [];
    for (var index = 0; index < total; index += 1) {
      var _key = void 0;
      try {
        _key = storage.key(index);
      } catch (keyError) {
        void keyError;
        _key = null;
      }
      if (typeof _key !== 'string' || !_key || skipSet.has(_key)) {
        continue;
      }
      var raw = void 0;
      try {
        raw = storage.getItem(_key);
      } catch (readError) {
        void readError;
        continue;
      }
      if (typeof raw !== 'string' || !raw) {
        continue;
      }
      if (raw.includes("\"".concat(STORAGE_COMPRESSION_FLAG_KEY, "\":true"))) {
        continue;
      }
      var candidate = createCompressedJsonStorageCandidate(raw);
      if (!candidate || typeof candidate.serialized !== 'string' || !candidate.serialized) {
        continue;
      }
      var savings = typeof candidate.originalLength === 'number' && typeof candidate.wrappedLength === 'number' ? candidate.originalLength - candidate.wrappedLength : 0;
      if (savings < minSavingsThreshold) {
        continue;
      }
      candidates.push({
        key: _key,
        serialized: candidate.serialized,
        savings: savings > 0 ? savings : 0,
        originalLength: typeof candidate.originalLength === 'number' ? candidate.originalLength : 0
      });
    }
    if (!candidates.length) {
      return {
        success: false,
        compressed: 0,
        freed: 0
      };
    }
    candidates.sort(function (a, b) {
      if (b.savings !== a.savings) {
        return b.savings - a.savings;
      }
      return b.originalLength - a.originalLength;
    });
    var upperLimit = typeof limit === 'number' && limit > 0 ? Math.min(limit, candidates.length) : candidates.length;
    var compressedCount = 0;
    var freedCharacters = 0;
    for (var _index = 0; _index < candidates.length && compressedCount < upperLimit; _index += 1) {
      var entry = candidates[_index];
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
      return {
        success: false,
        compressed: 0,
        freed: 0
      };
    }
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      if (freedCharacters > 0) {
        console.warn("Compressed ".concat(compressedCount, " stored entr").concat(compressedCount === 1 ? 'y' : 'ies', " during quota recovery, freeing approximately ").concat(freedCharacters, " characters."));
      } else {
        console.warn("Compressed ".concat(compressedCount, " stored entr").concat(compressedCount === 1 ? 'y' : 'ies', " during quota recovery."));
      }
    }
    return {
      success: true,
      compressed: compressedCount,
      freed: freedCharacters
    };
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
    if (storageCompressionPatchedStorages && typeof storageCompressionPatchedStorages.has === 'function' && storageCompressionPatchedStorages.has(storage)) {
      return;
    }
    var originalGetItem = storage.getItem;
    var rawGetItem = typeof originalGetItem === 'function' ? function rawStorageGetItem(key) {
      return originalGetItem.call(this, key);
    } : null;
    var patchedGetItem = function patchedStorageGetItem(key) {
      var rawValue = rawGetItem ? rawGetItem.call(this, key) : undefined;
      return maybeDecompressStoredString(rawValue);
    };
    try {
      Object.defineProperty(storage, 'getItem', {
        configurable: true,
        writable: true,
        value: patchedGetItem
      });
    } catch (defineError) {
      var suppressDefineWarning = defineError && typeof defineError.message === 'string' && defineError.message.includes('Cannot redefine property');
      if (!suppressDefineWarning) {
        console.warn('Unable to redefine storage.getItem descriptor for compression support', defineError);
      }
      try {
        storage.getItem = patchedGetItem;
      } catch (assignError) {
        var suppressAssignWarning = assignError && typeof assignError.message === 'string' && assignError.message.includes('Cannot assign to read only property');
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
          value: rawGetItem
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
    if (storageCompressionPatchedStorages && typeof storageCompressionPatchedStorages.add === 'function') {
      try {
        storageCompressionPatchedStorages.add(storage);
      } catch (trackError) {
        void trackError;
      }
    }
  }
  function patchStorageGetItemForCompression() {
    if (typeof Storage === 'undefined') {
      var _candidates = [];
      if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
        if (GLOBAL_SCOPE.localStorage) {
          _candidates.push(GLOBAL_SCOPE.localStorage);
        }
        if (GLOBAL_SCOPE.sessionStorage) {
          _candidates.push(GLOBAL_SCOPE.sessionStorage);
        }
      }
      if (typeof global !== 'undefined' && global && global !== GLOBAL_SCOPE) {
        if (global.localStorage) {
          _candidates.push(global.localStorage);
        }
        if (global.sessionStorage) {
          _candidates.push(global.sessionStorage);
        }
      }
      _candidates.forEach(patchIndividualStorageGetItem);
      return;
    }
    var prototype = Storage.prototype;
    if (!prototype || typeof prototype.getItem !== 'function') {
      return;
    }
    if (prototype.__cineStorageCompressionPatched) {
      return;
    }
    var originalGetItem = prototype.getItem;
    var rawGetItem = function rawStorageGetItem(key) {
      return originalGetItem.call(this, key);
    };
    var patchedGetItem = function patchedStorageGetItem(key) {
      var rawValue = rawGetItem.call(this, key);
      return maybeDecompressStoredString(rawValue);
    };
    try {
      Object.defineProperty(prototype, 'getItem', {
        configurable: true,
        writable: true,
        value: patchedGetItem
      });
    } catch (patchError) {
      console.warn('Unable to patch Storage.getItem for compression support', patchError);
      return;
    }
    try {
      Object.defineProperty(prototype, STORAGE_RAW_GET_ITEM_PROPERTY, {
        configurable: true,
        writable: false,
        value: rawGetItem
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
        value: true
      });
    } catch (flagError) {
      prototype.__cineStorageCompressionPatched = true;
      void flagError;
    }
    var candidates = [];
    if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
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
    if (!storage || _typeof(storage) !== 'object') {
      return null;
    }
    var direct = storage[STORAGE_RAW_GET_ITEM_PROPERTY];
    if (typeof direct === 'function') {
      return direct;
    }
    var prototype = Object.getPrototypeOf(storage);
    if (prototype && typeof prototype[STORAGE_RAW_GET_ITEM_PROPERTY] === 'function') {
      return prototype[STORAGE_RAW_GET_ITEM_PROPERTY];
    }
    return null;
  }
  function readRawStorageValue(storage, key, rawGetterOverride) {
    if (!storage || typeof key !== 'string' || !key) {
      return null;
    }
    var getter = typeof rawGetterOverride === 'function' ? rawGetterOverride : getRawStorageGetter(storage);
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
  var MIGRATION_BACKUP_LEGACY_DATA_KEYS = ['payload', 'value', 'content', 'entries', 'snapshot', 'state', 'record'];
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
    var fallback = typeof fallbackIso === 'string' && fallbackIso ? fallbackIso : null;
    if (typeof value === 'string') {
      var trimmed = value.trim();
      if (!trimmed) {
        return {
          value: fallback || new Date().toISOString(),
          changed: true
        };
      }
      var numeric = Number(trimmed);
      if (!Number.isNaN(numeric) && Number.isFinite(numeric) && String(numeric) === trimmed) {
        try {
          return {
            value: new Date(numeric).toISOString(),
            changed: true
          };
        } catch (error) {
          void error;
          return {
            value: fallback || new Date().toISOString(),
            changed: true
          };
        }
      }
      var timestamp = Date.parse(trimmed);
      if (!Number.isNaN(timestamp)) {
        try {
          var iso = new Date(timestamp).toISOString();
          return {
            value: iso,
            changed: iso !== trimmed
          };
        } catch (error) {
          void error;
          return {
            value: fallback || new Date().toISOString(),
            changed: true
          };
        }
      }
      return {
        value: trimmed,
        changed: trimmed !== value
      };
    }
    if (typeof value === 'number' && Number.isFinite(value)) {
      try {
        return {
          value: new Date(value).toISOString(),
          changed: true
        };
      } catch (error) {
        void error;
        return {
          value: fallback || new Date().toISOString(),
          changed: true
        };
      }
    }
    if (value instanceof Date) {
      var time = value.getTime();
      if (Number.isFinite(time)) {
        try {
          return {
            value: value.toISOString(),
            changed: true
          };
        } catch (error) {
          void error;
          return {
            value: fallback || new Date().toISOString(),
            changed: true
          };
        }
      }
    }
    if (fallback) {
      return {
        value: fallback,
        changed: true
      };
    }
    var generated = new Date().toISOString();
    return {
      value: generated,
      changed: true
    };
  }
  function normalizeLegacyMigrationBackupValue(rawValue, fallbackIso) {
    if (typeof rawValue !== 'string' || !rawValue) {
      return null;
    }
    var fallback = typeof fallbackIso === 'string' && fallbackIso ? fallbackIso : new Date().toISOString();
    var parsed;
    try {
      parsed = JSON.parse(rawValue);
    } catch (parseError) {
      void parseError;
      return trySerializeMigrationBackupValue({
        createdAt: fallback,
        data: rawValue
      });
    }
    if (!parsed || _typeof(parsed) !== 'object') {
      var dataValue = parsed === undefined ? rawValue : parsed;
      return trySerializeMigrationBackupValue({
        createdAt: fallback,
        data: dataValue
      });
    }
    var normalized;
    var changed = false;
    if (Object.prototype.hasOwnProperty.call(parsed, 'data')) {
      normalized = _objectSpread({}, parsed);
    } else {
      var usedKey = null;
      for (var i = 0; i < MIGRATION_BACKUP_LEGACY_DATA_KEYS.length; i += 1) {
        var key = MIGRATION_BACKUP_LEGACY_DATA_KEYS[i];
        if (Object.prototype.hasOwnProperty.call(parsed, key)) {
          usedKey = key;
          break;
        }
      }
      if (usedKey) {
        normalized = _objectSpread({}, parsed);
        normalized.data = parsed[usedKey];
        delete normalized[usedKey];
        changed = true;
      } else {
        normalized = {
          data: parsed
        };
        changed = true;
      }
    }
    var rawCreatedAt = normalized.createdAt;
    var createdAtSourceKey = 'createdAt';
    if (rawCreatedAt === undefined) {
      for (var _i = 0; _i < MIGRATION_BACKUP_LEGACY_CREATED_AT_KEYS.length; _i += 1) {
        var _key2 = MIGRATION_BACKUP_LEGACY_CREATED_AT_KEYS[_i];
        if (Object.prototype.hasOwnProperty.call(parsed, _key2)) {
          rawCreatedAt = parsed[_key2];
          createdAtSourceKey = _key2;
          break;
        }
      }
    }
    var _normalizeLegacyMigra = normalizeLegacyMigrationBackupCreatedAt(rawCreatedAt, fallback),
      createdAt = _normalizeLegacyMigra.value,
      createdAtChanged = _normalizeLegacyMigra.changed;
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
    var normalized = normalizeLegacyMigrationBackupValue(rawValue, fallbackIso);
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
      console.warn("Unable to normalize legacy migration backup for ".concat(backupKey), error);
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
    var backupKey = "".concat(key).concat(STORAGE_MIGRATION_BACKUP_SUFFIX);
    var hasExistingBackup = false;
    if (typeof storage.getItem === 'function') {
      try {
        var existing = storage.getItem(backupKey);
        if (existing !== null && existing !== undefined) {
          hasExistingBackup = true;
          var fallbackCreatedAt = new Date().toISOString();
          upgradeLegacyMigrationBackupEntry(storage, backupKey, existing, fallbackCreatedAt);
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
      var _ref2 = options || {},
        _ref2$logCompression = _ref2.logCompression,
        logCompression = _ref2$logCompression === void 0 ? false : _ref2$logCompression,
        _ref2$info = _ref2.info,
        info = _ref2$info === void 0 ? null : _ref2$info;
      try {
        storage.setItem(backupKey, candidate.serialized);
        if (logCompression && info && !_tryStoreSerialized.compressionLogged) {
          _tryStoreSerialized.compressionLogged = true;
          var storedLength = typeof info.serializedLength === 'number' ? info.serializedLength : info.compressedSize;
          var rawSavings = info.originalSize - storedLength;
          var savings = rawSavings > 0 ? rawSavings : 0;
          var percent = info.originalSize > 0 ? Math.round(savings / info.originalSize * 100) : 0;
          console.warn("Stored compressed migration backup for ".concat(key, " to reduce storage usage by ").concat(savings, " characters (").concat(percent, "%) using ").concat(info.variant || 'unknown', " variant."));
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
  var PRIMARY_STORAGE_KEYS = [DEVICE_STORAGE_KEY, SETUP_STORAGE_KEY, SESSION_STATE_KEY, FEEDBACK_STORAGE_KEY, PROJECT_STORAGE_KEY, FAVORITES_STORAGE_KEY, DEVICE_SCHEMA_CACHE_KEY, AUTO_GEAR_RULES_STORAGE_KEY, AUTO_GEAR_SEEDED_STORAGE_KEY, AUTO_GEAR_BACKUPS_STORAGE_KEY, AUTO_GEAR_PRESETS_STORAGE_KEY, AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY, AUTO_GEAR_AUTO_PRESET_STORAGE_KEY, AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY, AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY, AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY, FULL_BACKUP_HISTORY_STORAGE_KEY];
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
          var variants = getStorageKeyVariants(key);
          for (var j = 0; j < variants.length; j += 1) {
            var candidateKey = variants[j];
            if (storage.getItem(candidateKey) !== null) {
              return true;
            }
            var backupKey = "".concat(candidateKey).concat(STORAGE_BACKUP_SUFFIX);
            if (storage.getItem(backupKey) !== null) {
              return true;
            }
          }
        }
        for (var _i2 = 0; _i2 < SIMPLE_STORAGE_KEYS.length; _i2 += 1) {
          var _key3 = SIMPLE_STORAGE_KEYS[_i2];
          var _variants = getStorageKeyVariants(_key3);
          for (var _j = 0; _j < _variants.length; _j += 1) {
            var _candidateKey = _variants[_j];
            if (storage.getItem(_candidateKey) !== null) {
              return true;
            }
            if (RAW_STORAGE_BACKUP_KEYS.has(_candidateKey)) {
              var _backupKey = "".concat(_candidateKey).concat(STORAGE_BACKUP_SUFFIX);
              if (storage.getItem(_backupKey) !== null) {
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
        if (!Object.prototype.hasOwnProperty.call(memoryStore, key)) {
          return null;
        }
        return maybeDecompressStoredString(memoryStore[key]);
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
    var _ref3 = options || {},
      _ref3$suppressAlerts = _ref3.suppressAlerts,
      suppressAlerts = _ref3$suppressAlerts === void 0 ? false : _ref3$suppressAlerts;
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
  patchStorageGetItemForCompression();
  var persistentStorageRequestPromise = null;
  function requestPersistentStorage() {
    var storageManager = getStorageManager();
    var supportsPersist = storageManager && typeof storageManager.persist === 'function';
    if (!supportsPersist) {
      return Promise.resolve({
        supported: Boolean(storageManager),
        granted: false,
        alreadyGranted: false
      });
    }
    if (persistentStorageRequestPromise) {
      return persistentStorageRequestPromise;
    }
    var requestPromise = _asyncToGenerator(_regenerator().m(function _callee() {
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
    var trackedPromise = requestPromise.then(function (result) {
      if (!result || result.granted !== true) {
        persistentStorageRequestPromise = null;
      }
      return result;
    }, function (error) {
      persistentStorageRequestPromise = null;
      throw error;
    });
    persistentStorageRequestPromise = trackedPromise;
    return trackedPromise;
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
  function isMapLike(value) {
    if (!value || _typeof(value) !== 'object') {
      return false;
    }
    var tag = Object.prototype.toString.call(value);
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
    return typeof value.size === 'number' && typeof value.entries === 'function' && typeof value.forEach === 'function' && typeof value.get === 'function' && typeof value.set === 'function';
  }
  function convertMapLikeKey(key) {
    if (typeof key === 'string') {
      return key;
    }
    if (typeof key === 'number' || typeof key === 'boolean' || typeof key === 'bigint') {
      return String(key);
    }
    if (_typeof(key) === 'symbol') {
      return key.description || key.toString();
    }
    if (key && _typeof(key) === 'object') {
      try {
        var json = JSON.stringify(key);
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
    var snapshot = Object.create(null);
    var assignEntry = function assignEntry(rawKey, value) {
      var key = convertMapLikeKey(rawKey);
      if (key === null || key === undefined) {
        return;
      }
      if (Object.prototype.hasOwnProperty.call(snapshot, key)) {
        return;
      }
      snapshot[key] = value;
    };
    var iterated = false;
    if (typeof mapLike.entries === 'function') {
      try {
        var iterator = mapLike.entries();
        if (iterator && typeof iterator.next === 'function') {
          for (var step = iterator.next(); !step.done; step = iterator.next()) {
            var entry = step && step.value;
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
        mapLike.forEach(function (value, key) {
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
    var trimmed = value.trim();
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
      var changed = false;
      var normalizedArray = value.map(function (item) {
        var normalizedItem = normalizeLegacyLongGopStructure(item);
        if (normalizedItem !== item) {
          changed = true;
        }
        return normalizedItem;
      });
      return changed ? normalizedArray : value;
    }
    if (isPlainObject(value)) {
      var _changed = false;
      var normalizedObject = {};
      Object.keys(value).forEach(function (key) {
        var normalizedKey = normalizeLegacyLongGopKey(key);
        var originalValue = value[key];
        var normalizedValue = normalizeLegacyLongGopStructure(originalValue);
        if (normalizedKey !== key || normalizedValue !== originalValue) {
          _changed = true;
        }
        normalizedObject[normalizedKey] = normalizedValue;
      });
      return _changed ? normalizedObject : value;
    }
    return normalizeLegacyLongGopString(value);
  }
  function normalizeLegacyLongGopBackups(backups) {
    if (!Array.isArray(backups)) {
      return {
        normalized: Array.isArray(backups) ? backups : [],
        changed: false
      };
    }
    var changed = false;
    var normalized = backups.map(function (entry) {
      if (entry === null || entry === undefined) {
        return entry;
      }
      var normalizedEntry = normalizeLegacyLongGopStructure(entry);
      if (normalizedEntry !== entry) {
        changed = true;
      }
      return normalizedEntry;
    });
    return {
      normalized: normalized,
      changed: changed
    };
  }
  function parseAutoBackupKey(name) {
    if (typeof name !== 'string') {
      return {
        timestamp: Number.NEGATIVE_INFINITY,
        label: ''
      };
    }
    var parseWithPrefix = function parseWithPrefix(prefix) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var remainder = name.slice(prefix.length);
      var parts = remainder.split('-');
      if (parts.length < 5) {
        return null;
      }
      var _parts = _slicedToArray(parts, 5),
        yearPart = _parts[0],
        monthPart = _parts[1],
        dayPart = _parts[2],
        hourPart = _parts[3],
        minutePart = _parts[4];
      var year = Number.parseInt(yearPart, 10);
      var month = Number.parseInt(monthPart, 10) - 1;
      var day = Number.parseInt(dayPart, 10);
      var hour = Number.parseInt(hourPart, 10);
      var minute = Number.parseInt(minutePart, 10);
      if ([year, month, day, hour, minute].some(function (value) {
        return Number.isNaN(value);
      })) {
        return null;
      }
      var includeSeconds = false;
      var seconds = 0;
      var labelStartIndex = 5;
      if (parts.length > labelStartIndex) {
        var secondsCandidate = parts[labelStartIndex];
        if (/^[0-9]{1,2}$/.test(secondsCandidate)) {
          includeSeconds = true;
          seconds = Number.parseInt(secondsCandidate, 10);
          labelStartIndex += 1;
        } else if (options.requireSeconds) {
          return null;
        }
      } else if (options.requireSeconds) {
        return null;
      }
      var label = parts.slice(labelStartIndex).join('-').trim();
      var date = new Date(year, month, day, hour, minute, includeSeconds ? seconds : 0, 0);
      var timestamp = date.getTime();
      if (Number.isNaN(timestamp)) {
        return null;
      }
      return {
        timestamp: timestamp,
        label: label
      };
    };
    if (name.startsWith(STORAGE_AUTO_BACKUP_NAME_PREFIX)) {
      var parsed = parseWithPrefix(STORAGE_AUTO_BACKUP_NAME_PREFIX);
      if (parsed) {
        return parsed;
      }
      return {
        timestamp: Number.NEGATIVE_INFINITY,
        label: ''
      };
    }
    if (name.startsWith(STORAGE_AUTO_BACKUP_DELETION_PREFIX)) {
      var _parsed = parseWithPrefix(STORAGE_AUTO_BACKUP_DELETION_PREFIX, {
        requireSeconds: false
      });
      if (_parsed) {
        return _parsed;
      }
      return {
        timestamp: Number.NEGATIVE_INFINITY,
        label: ''
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
    if (typeof entry.label === 'string') {
      var trimmed = entry.label.trim();
      if (trimmed) {
        return trimmed;
      }
    }
    if (typeof entry.key === 'string' && entry.key.trim()) {
      var key = entry.key.trim();
      if (key.startsWith(STORAGE_AUTO_BACKUP_NAME_PREFIX) || key.startsWith(STORAGE_AUTO_BACKUP_DELETION_PREFIX)) {
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
    var value = Object.prototype.hasOwnProperty.call(container, entry.key) ? container[entry.key] : undefined;
    try {
      var preparedValue = value;
      if (isPlainObject(value) && value[AUTO_BACKUP_SNAPSHOT_PROPERTY]) {
        var cloneForSignature = cloneAutoBackupValue(value, {
          stripMetadata: true
        });
        var snapshot = cloneForSignature[AUTO_BACKUP_SNAPSHOT_PROPERTY];
        if (snapshot && _typeof(snapshot) === 'object') {
          try {
            var restored = restoreAutoBackupSnapshotPayload(snapshot, entry.key);
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
      var normalizedValue = cloneAutoBackupValueWithLegacyNormalization(preparedValue, {
        stripMetadata: true
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
      var labelSignatures = seenSignaturesByLabel.get(labelKey);
      if (!labelSignatures) {
        labelSignatures = new Map();
        seenSignaturesByLabel.set(labelKey, labelSignatures);
      }
      var value = Object.prototype.hasOwnProperty.call(container, entry.key) ? container[entry.key] : undefined;
      var signature = createStableValueSignature(value);
      var seen = labelSignatures.get(signature);
      if (seen && typeof seen.key === 'string') {
        delete container[entry.key];
        entries.splice(index, 1);
        if (typeof console !== 'undefined' && typeof console.info === 'function') {
          console.info('Removed duplicate automatic backup while preserving newer copy.', {
            removedKey: entry.key,
            preservedKey: seen.key,
            label: labelKey
          });
        }
        return entry.key;
      }
      labelSignatures.set(signature, {
        key: entry.key,
        signature: signature
      });
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
    var duplicateBuckets = new Map();
    for (var index = 0; index < entries.length; index += 1) {
      var entry = entries[index];
      if (!entry || typeof entry.key !== 'string') {
        continue;
      }
      var labelKey = getAutoBackupLabelKey(entry);
      var signature = getAutoBackupEntrySignature(container, entry);
      var bucketKey = "".concat(labelKey, "__").concat(signature);
      var existing = duplicateBuckets.get(bucketKey);
      if (existing) {
        existing.push(index);
      } else {
        duplicateBuckets.set(bucketKey, [index]);
      }
    }
    var removable = Array.from(duplicateBuckets.values()).filter(function (indexes) {
      return Array.isArray(indexes) && indexes.length > 1;
    }).flatMap(function (indexes) {
      return indexes.slice(0, -1);
    }).sort(function (a, b) {
      return a - b;
    });
    if (!removable.length) {
      if (entries.length > limit) {
        console.warn('Skipped trimming automatic backups because all remaining versions are unique.', {
          limit: limit,
          total: entries.length
        });
      }
      return;
    }
    for (var i = removable.length - 1; i >= 0 && entries.length > limit; i -= 1) {
      var _index2 = removable[i];
      var _entry = entries[_index2];
      if (!_entry || typeof _entry.key !== 'string') {
        continue;
      }
      if (isRenamedAutoBackupEntry(container, _entry.key)) {
        continue;
      }
      delete container[_entry.key];
      entries.splice(_index2, 1);
      removedKeys.push(_entry.key);
    }
    if (entries.length > limit) {
      console.warn('Unable to trim automatic backups down to the configured limit without losing unique data.', {
        limit: limit,
        remaining: entries.length
      });
    }
  }
  function enforceAutoBackupLimits(container) {
    if (!isPlainObject(container)) {
      return [];
    }
    var removed = [];
    var autoBackups = collectAutoBackupEntries(container, STORAGE_AUTO_BACKUP_NAME_PREFIX);
    removed.push.apply(removed, _toConsumableArray(removeDuplicateAutoBackupEntries(container, autoBackups)));
    if (autoBackups.length > MAX_AUTO_BACKUPS) {
      pruneAutoBackupEntries(container, autoBackups, MAX_AUTO_BACKUPS, removed);
    }
    var deletionBackups = collectAutoBackupEntries(container, STORAGE_AUTO_BACKUP_DELETION_PREFIX);
    removed.push.apply(removed, _toConsumableArray(removeDuplicateAutoBackupEntries(container, deletionBackups)));
    if (deletionBackups.length > MAX_DELETION_BACKUPS) {
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
      console.warn('Unable to free space by removing automatic backups because all versions are unique.');
    }
    var deletionBackups = collectAutoBackupEntries(container, STORAGE_AUTO_BACKUP_DELETION_PREFIX);
    var duplicateDeletionBackupKey = removeSingleDuplicateAutoBackupEntry(container, deletionBackups);
    if (duplicateDeletionBackupKey) {
      return duplicateDeletionBackupKey;
    }
    if (deletionBackups.length > 0) {
      console.warn('Unable to free space by removing pre-deletion backups because all versions are unique.');
    }
    return null;
  }
  function describeAutoGearBackupEntry(entry) {
    if (!entry || _typeof(entry) !== 'object') {
      return '';
    }
    if (typeof entry.note === 'string') {
      var trimmedNote = entry.note.trim();
      if (trimmedNote) {
        return trimmedNote;
      }
    }
    if (typeof entry.createdAt === 'string') {
      var trimmedTimestamp = entry.createdAt.trim();
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
    var removeAt = function removeAt(index) {
      var _backups$splice = backups.splice(index, 1),
        _backups$splice2 = _slicedToArray(_backups$splice, 1),
        removed = _backups$splice2[0];
      return {
        removed: removed,
        label: describeAutoGearBackupEntry(removed)
      };
    };
    for (var index = backups.length - 1; index >= 0; index -= 1) {
      var entry = backups[index];
      if (!entry || _typeof(entry) !== 'object') {
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
    var migrationBackupKey = "".concat(AUTO_GEAR_BACKUPS_STORAGE_KEY).concat(STORAGE_MIGRATION_BACKUP_SUFFIX);
    var removedKeys = [];
    try {
      var existing = storage.getItem(migrationBackupKey);
      if (existing !== null && existing !== undefined) {
        storage.removeItem(migrationBackupKey);
        removedKeys.push(migrationBackupKey);
      }
    } catch (error) {
      console.warn('Unable to inspect automatic gear backup migration snapshot while recovering storage quota.', error);
    }
    try {
      var pruned = pruneMigrationBackupEntriesForCleanup(storage, migrationBackupKey);
      if (Array.isArray(pruned) && pruned.length > 0) {
        removedKeys.push.apply(removedKeys, _toConsumableArray(pruned));
      }
    } catch (error) {
      console.warn('Unable to prune migration backups while recovering storage for automatic gear backups.', error);
    }
    if (removedKeys.length > 0) {
      console.warn("Removed ".concat(removedKeys.length, " migration backup").concat(removedKeys.length > 1 ? 's' : '', " while freeing storage for automatic gear backups."), removedKeys);
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
      console.warn('Cleared cached planner data to free up storage space before saving automatic gear backups.');
      return true;
    } catch (error) {
      console.warn('Unable to clear cached planner data while recovering storage for automatic gear backups.', error);
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
    if (!Array.isArray(storages) || storages.length === 0) {
      return [];
    }
    var unique = [];
    var seen = new Set();
    for (var i = 0; i < storages.length; i += 1) {
      var storage = storages[i];
      if (!storage || typeof storage.getItem !== 'function' || seen.has(storage)) {
        continue;
      }
      seen.add(storage);
      unique.push(storage);
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
    mappings.forEach(function (_ref5) {
      var legacy = _ref5.legacy,
        modern = _ref5.modern,
        _ref5$includeSession = _ref5.includeSession,
        includeSession = _ref5$includeSession === void 0 ? false : _ref5$includeSession,
        _ref5$updateFontKey = _ref5.updateFontKey,
        updateFontKey = _ref5$updateFontKey === void 0 ? false : _ref5$updateFontKey;
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
    var _ref6 = options || {},
      _ref6$disableBackup = _ref6.disableBackup,
      disableBackup = _ref6$disableBackup === void 0 ? false : _ref6$disableBackup,
      backupKey = _ref6.backupKey,
      validate = _ref6.validate,
      _ref6$restoreIfMissin = _ref6.restoreIfMissing,
      restoreIfMissing = _ref6$restoreIfMissin === void 0 ? false : _ref6$restoreIfMissin,
      _ref6$alertOnFailure = _ref6.alertOnFailure,
      alertOnFailure = _ref6$alertOnFailure === void 0 ? null : _ref6$alertOnFailure,
      migrationBackupKey = _ref6.migrationBackupKey;
    var fallbackKey = typeof backupKey === 'string' && backupKey ? backupKey : "".concat(key).concat(STORAGE_BACKUP_SUFFIX);
    var useBackup = !disableBackup && fallbackKey && fallbackKey !== key;
    var migrationBackupCandidates = function () {
      var seen = new Set();
      var candidates = [];
      var pushCandidate = function pushCandidate(candidate) {
        if (typeof candidate !== 'string' || !candidate || seen.has(candidate)) {
          return;
        }
        seen.add(candidate);
        candidates.push(candidate);
      };
      if (typeof migrationBackupKey === 'string' && migrationBackupKey) {
        pushCandidate(migrationBackupKey);
      }
      var variants = getStorageKeyVariants(key);
      for (var i = 0; i < variants.length; i += 1) {
        pushCandidate("".concat(variants[i]).concat(STORAGE_MIGRATION_BACKUP_SUFFIX));
      }
      return candidates;
    }();
    var rawGetter = getRawStorageGetter(storage);
    var rawStoredValue = typeof rawGetter === 'function' ? readRawStorageValue(storage, key, rawGetter) : undefined;
    var shouldAlert = false;
    var parseRawValue = function parseRawValue(raw, label) {
      if (raw === null || raw === undefined) {
        return {
          ok: false,
          reason: 'missing'
        };
      }
      var normalizedRaw = typeof raw === 'string' ? maybeDecompressStoredString(raw) : raw;
      try {
        var parsed = JSON.parse(normalizedRaw);
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
          raw: raw,
          normalizedRaw: normalizedRaw
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
    if (typeof rawStoredValue === 'undefined' && typeof rawGetter === 'function') {
      rawStoredValue = readRawStorageValue(storage, key, rawGetter);
    }
    if ((primaryRaw === null || primaryRaw === undefined) && (rawStoredValue === null || rawStoredValue === undefined)) {
      clearCachedStorageEntry(storage, key);
    }
    var cachedPrimary = tryGetCachedStorageValue(storage, key, primaryRaw, rawStoredValue);
    if (cachedPrimary.hit) {
      return cachedPrimary.value;
    }
    var primary = parseRawValue(primaryRaw, '');
    if (primary.ok) {
      var normalizedForCache = typeof primary.normalizedRaw === 'string' && primary.normalizedRaw ? primary.normalizedRaw : typeof primary.raw === 'string' && primary.raw ? primary.raw : null;
      var rawForCache = typeof rawStoredValue === 'string' && rawStoredValue ? rawStoredValue : typeof primary.raw === 'string' && primary.raw ? primary.raw : null;
      cacheStorageValue(storage, key, rawForCache, normalizedForCache, primary.value);
      return primary.value;
    }
    var missingPrimary = !primary.ok && primary.reason === 'missing';
    var attemptMigrationBackupRecovery = function attemptMigrationBackupRecovery() {
      if (!migrationBackupCandidates.length) {
        return {
          success: false,
          shouldAlert: false
        };
      }
      for (var i = 0; i < migrationBackupCandidates.length; i += 1) {
        var candidateKey = migrationBackupCandidates[i];
        var migrationRaw = null;
        var migrationRawStored = void 0;
        try {
          migrationRaw = storage.getItem(candidateKey);
        } catch (migrationReadError) {
          console.error("".concat(errorMessage, " (migration backup read)"), migrationReadError);
          downgradeSafeLocalStorageToMemory('read access', migrationReadError, storage);
          return {
            success: false,
            shouldAlert: true
          };
        }
        if (typeof rawGetter === 'function') {
          migrationRawStored = readRawStorageValue(storage, candidateKey, rawGetter);
        }
        if ((migrationRaw === null || migrationRaw === undefined) && (migrationRawStored === null || migrationRawStored === undefined)) {
          clearCachedStorageEntry(storage, candidateKey);
          continue;
        }
        var rawSource = migrationRaw !== null && migrationRaw !== undefined ? migrationRaw : migrationRawStored;
        var entry = {
          key: candidateKey,
          value: rawSource,
          type: 'migration-backup'
        };
        var extracted = extractSnapshotStoredValue(entry);
        if (typeof extracted === 'undefined') {
          continue;
        }
        var candidateValue = extracted;
        if (typeof candidateValue === 'string') {
          var trimmed = candidateValue.trim();
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
          console.warn("Ignored migration backup for ".concat(key, " because it failed validation."));
          continue;
        }
        var migrationRawForCache = typeof migrationRawStored === 'string' && migrationRawStored ? migrationRawStored : typeof rawSource === 'string' && rawSource ? rawSource : null;
        var normalizedMigrationRaw = typeof rawSource === 'string' && rawSource ? rawSource : typeof migrationRawStored === 'string' && migrationRawStored ? migrationRawStored : null;
        cacheStorageValue(storage, candidateKey, migrationRawForCache, normalizedMigrationRaw, candidateValue);
        var serializedCandidate = null;
        try {
          serializedCandidate = JSON.stringify(candidateValue);
        } catch (serializationError) {
          console.warn("Unable to serialize recovered migration backup for ".concat(key), serializationError);
          serializedCandidate = null;
        }
        var restoredRawValue = null;
        var shouldEscalate = false;
        if (serializedCandidate !== null) {
          var payloadToStore = serializedCandidate;
          var recompressed = typeof serializedCandidate === 'string' ? createCompressedJsonStorageCandidate(serializedCandidate) : null;
          if (recompressed && typeof recompressed.serialized === 'string') {
            payloadToStore = recompressed.serialized;
          }
          try {
            storage.setItem(key, payloadToStore);
            restoredRawValue = payloadToStore;
          } catch (restoreError) {
            console.warn("Unable to restore primary copy for ".concat(key, " from migration backup"), restoreError);
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
        console.warn(restoredRawValue !== null ? "Recovered ".concat(key, " from migration backup copy.") : "Recovered ".concat(key, " from migration backup copy but could not rewrite the primary entry."));
        return {
          success: true,
          value: candidateValue,
          shouldAlert: shouldEscalate
        };
      }
      return {
        success: false,
        shouldAlert: false
      };
    };
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
      var backupRawStored = typeof rawGetter === 'function' ? readRawStorageValue(storage, fallbackKey, rawGetter) : undefined;
      var backup = parseRawValue(backupRaw, 'backup');
      if (backup.ok) {
        if (shouldAlert || missingPrimary) {
          console.warn("Recovered ".concat(key, " from backup copy."));
        }
        if (backup.raw !== null && backup.raw !== undefined) {
          var restoredRawValue = null;
          try {
            if (typeof backup.raw === 'string') {
              var recompressSource = typeof backup.normalizedRaw === 'string' && backup.normalizedRaw ? backup.normalizedRaw : backup.raw;
              var recompressed = createCompressedJsonStorageCandidate(recompressSource);
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
            console.warn("Unable to restore primary copy for ".concat(key, " from backup"), restoreError);
            restoredRawValue = null;
          }
          var normalizedBackup = typeof backup.normalizedRaw === 'string' && backup.normalizedRaw ? backup.normalizedRaw : typeof backup.raw === 'string' && backup.raw ? backup.raw : null;
          var fallbackRawForCache = typeof backupRawStored === 'string' && backupRawStored ? backupRawStored : typeof backup.raw === 'string' && backup.raw ? backup.raw : null;
          cacheStorageValue(storage, fallbackKey, fallbackRawForCache, normalizedBackup, backup.value);
          if (typeof restoredRawValue === 'string' && restoredRawValue) {
            cacheStorageValue(storage, key, restoredRawValue, normalizedBackup, backup.value);
          }
        }
        return backup.value;
      }
    }
    var shouldAttemptMigrationBackup = migrationBackupCandidates.length > 0 && (missingPrimary || restoreIfMissing || shouldAlert);
    if (shouldAttemptMigrationBackup) {
      var migrationRecovery = attemptMigrationBackupRecovery();
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
  function saveJSONToStorage(storage, key, value, errorMessage) {
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    if (!storage) return;
    var _ref7 = options || {},
      _ref7$disableBackup = _ref7.disableBackup,
      disableBackup = _ref7$disableBackup === void 0 ? false : _ref7$disableBackup,
      backupKey = _ref7.backupKey,
      onQuotaExceeded = _ref7.onQuotaExceeded,
      _ref7$enableCompressi = _ref7.enableCompressionSweep,
      enableCompressionSweep = _ref7$enableCompressi === void 0 ? true : _ref7$enableCompressi,
      _ref7$disableCompress = _ref7.disableCompression,
      disableCompression = _ref7$disableCompress === void 0 ? false : _ref7$disableCompress;
    var fallbackKey = typeof backupKey === 'string' && backupKey ? backupKey : "".concat(key).concat(STORAGE_BACKUP_SUFFIX);
    var useBackup = !disableBackup && fallbackKey && fallbackKey !== key;
    var compressionBlocked = Boolean(disableCompression);
    var rawGetter = getRawStorageGetter(storage);
    var loadRawValue = function loadRawValue(targetKey) {
      return readRawStorageValue(storage, targetKey, rawGetter);
    };
    var standardSerializedCache;
    var standardSerializationComputed = false;
    var compressionCandidate;
    var useCompressedSerialization = false;
    var compressionAttempted = false;
    var compressionLogged = false;
    var resetSerializationState = function resetSerializationState() {
      standardSerializedCache = undefined;
      standardSerializationComputed = false;
      compressionCandidate = undefined;
      useCompressedSerialization = false;
      compressionAttempted = false;
      compressionLogged = false;
    };
    var computeStandardSerialized = function computeStandardSerialized() {
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
    var computeCompressedSerialized = function computeCompressedSerialized() {
      if (compressionCandidate !== undefined) {
        return compressionCandidate && typeof compressionCandidate.serialized === 'string' ? compressionCandidate.serialized : null;
      }
      var baseline = computeStandardSerialized();
      if (typeof baseline !== 'string' || !baseline) {
        compressionCandidate = null;
        return null;
      }
      var candidate = createCompressedJsonStorageCandidate(baseline);
      if (!candidate || typeof candidate.serialized !== 'string') {
        compressionCandidate = null;
        return null;
      }
      compressionCandidate = candidate;
      return candidate.serialized;
    };
    var getSerializedForAttempt = function getSerializedForAttempt() {
      if (useCompressedSerialization) {
        var compressed = computeCompressedSerialized();
        if (typeof compressed === 'string') {
          return compressed;
        }
        useCompressedSerialization = false;
      }
      var standard = computeStandardSerialized();
      if (typeof standard === 'string') {
        return standard;
      }
      return null;
    };
    var tryEnableCompression = function tryEnableCompression() {
      if (compressionBlocked) {
        compressionAttempted = true;
        return false;
      }
      if (useCompressedSerialization || compressionAttempted) {
        return false;
      }
      compressionAttempted = true;
      var baseline = computeStandardSerialized();
      if (typeof baseline !== 'string' || !baseline) {
        return false;
      }
      var compressed = computeCompressedSerialized();
      if (typeof compressed !== 'string' || !compressed) {
        return false;
      }
      if (compressed.length >= baseline.length) {
        return false;
      }
      useCompressedSerialization = true;
      return true;
    };
    var logCompressionIfNeeded = function logCompressionIfNeeded() {
      if (!useCompressedSerialization || !compressionCandidate || compressionLogged) {
        return;
      }
      var _compressionCandidate = compressionCandidate,
        originalLength = _compressionCandidate.originalLength,
        wrappedLength = _compressionCandidate.wrappedLength;
      if (typeof originalLength === 'number' && typeof wrappedLength === 'number' && wrappedLength < originalLength && typeof console !== 'undefined' && typeof console.warn === 'function') {
        var savings = originalLength - wrappedLength;
        var percent = originalLength > 0 ? Math.round(savings / originalLength * 100) : 0;
        console.warn("Stored compressed value for ".concat(key, " to reduce storage usage by ").concat(savings, " characters (").concat(percent, "%)."));
      }
      compressionLogged = true;
    };
    var maybeEnableProactiveCompression = function maybeEnableProactiveCompression() {
      if (compressionBlocked) {
        compressionAttempted = true;
        return;
      }
      if (useCompressedSerialization || compressionAttempted) {
        return;
      }
      var baseline = computeStandardSerialized();
      if (typeof baseline !== 'string' || !baseline) {
        return;
      }
      if (baseline.length < STORAGE_PROACTIVE_COMPRESSION_MIN_LENGTH) {
        return;
      }
      var compressed = computeCompressedSerialized();
      if (typeof compressed !== 'string' || !compressed) {
        return;
      }
      var savings = baseline.length - compressed.length;
      if (savings < STORAGE_PROACTIVE_COMPRESSION_MIN_SAVINGS) {
        return;
      }
      var ratio = baseline.length > 0 ? savings / baseline.length : 0;
      if (ratio < STORAGE_PROACTIVE_COMPRESSION_MIN_RATIO) {
        return;
      }
      var rawExisting = loadRawValue(key);
      if (typeof rawExisting === 'string' && rawExisting === compressed) {
        return;
      }
      useCompressedSerialization = true;
      compressionAttempted = true;
    };
    var preservedBackupValue;
    var hasPreservedBackup = false;
    var removedBackupDuringRetry = false;
    var quotaRecoverySteps = 0;
    var quotaRecoveryFailed = false;
    var compressionSweepAttempted = false;
    maybeEnableProactiveCompression();
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
      if (!isQuotaExceededError(error)) {
        return false;
      }
      if (typeof onQuotaExceeded === 'function') {
        try {
          if (onQuotaExceeded(error, _objectSpread({
            storage: storage,
            key: key,
            value: value
          }, context)) === true) {
            return true;
          }
        } catch (handlerError) {
          var scope = context && context.isBackup ? ' (backup)' : '';
          console.error("Error while handling quota exceed for ".concat(key).concat(scope), handlerError);
        }
      }
      if (compressionSweepAttempted || enableCompressionSweep === false) {
        return false;
      }
      compressionSweepAttempted = true;
      var skipKeys = [key];
      if (useBackup && typeof fallbackKey === 'string' && fallbackKey && fallbackKey !== key) {
        skipKeys.push(fallbackKey);
      }
      if (context && typeof context.backupKey === 'string' && context.backupKey) {
        skipKeys.push(context.backupKey);
      }
      var sweepResult = attemptStorageCompressionSweep(storage, {
        skipKeys: skipKeys
      });
      return Boolean(sweepResult && sweepResult.success);
    };
    var attempts = 0;
    var _loop2 = function _loop2() {
        attempts += 1;
        var serialized = getSerializedForAttempt();
        if (typeof serialized !== 'string') {
          return {
            v: void 0
          };
        }
        var normalizedSerialized = computeStandardSerialized();
        var normalizedString = typeof normalizedSerialized === 'string' && normalizedSerialized ? normalizedSerialized : null;
        var skipPrimaryWrite = false;
        var existingBackupValue;
        var hasExistingBackup = false;
        var existingBackupRaw = null;
        var observedPrimaryRawValue = null;
        var observedBackupRawValue = null;
        if (typeof storage.getItem === 'function') {
          try {
            var existingValue = storage.getItem(key);
            if (existingValue === serialized) {
              skipPrimaryWrite = true;
              observedPrimaryRawValue = serialized;
            } else if (useCompressedSerialization) {
              var existingRawValue = loadRawValue(key);
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
            console.warn("Unable to inspect existing value for ".concat(key), inspectError);
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
            console.warn("Unable to inspect existing backup for ".concat(key), inspectError);
          }
        }
        if (!hasPreservedBackup && hasExistingBackup && typeof existingBackupValue === 'string') {
          preservedBackupValue = existingBackupValue;
          hasPreservedBackup = true;
        }
        var backupCandidates = function () {
          if (!useBackup) {
            return [];
          }
          var candidates = [];
          if (useCompressedSerialization) {
            var standardSerialized = computeStandardSerialized();
            if (typeof standardSerialized === 'string' && standardSerialized) {
              candidates.push({
                serialized: standardSerialized,
                compressed: false
              });
            }
            if (typeof serialized === 'string' && serialized && (!candidates.length || candidates[candidates.length - 1].serialized !== serialized)) {
              candidates.push({
                serialized: serialized,
                compressed: true
              });
            }
          } else if (typeof serialized === 'string' && serialized) {
            candidates.push({
              serialized: serialized,
              compressed: false
            });
          }
          return candidates;
        }();
        var preferredBackupCandidate = backupCandidates.length ? backupCandidates[0] : null;
        var backupMatchesPreferred = hasExistingBackup && preferredBackupCandidate && typeof preferredBackupCandidate.serialized === 'string' && (existingBackupValue === preferredBackupCandidate.serialized || typeof existingBackupRaw === 'string' && existingBackupRaw === preferredBackupCandidate.serialized);
        if (skipPrimaryWrite && (!useBackup || backupMatchesPreferred)) {
          if (normalizedString) {
            var rawForCacheUpdate = useCompressedSerialization ? typeof observedPrimaryRawValue === 'string' && observedPrimaryRawValue ? observedPrimaryRawValue : serialized : serialized;
            cacheStorageValue(storage, key, rawForCacheUpdate, normalizedString, value);
            if (useBackup && hasExistingBackup) {
              var backupRawForCache = useCompressedSerialization ? typeof existingBackupRaw === 'string' && existingBackupRaw ? existingBackupRaw : observedBackupRawValue : observedBackupRawValue;
              if (typeof backupRawForCache === 'string' && backupRawForCache) {
                cacheStorageValue(storage, fallbackKey, backupRawForCache, normalizedString, value);
              }
            }
          }
          return {
            v: void 0
          };
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
                return 0;
              }
              if (attempts > 0) {
                attempts -= 1;
              }
              return 1;
            }
            if (!quotaRecoveryFailed && tryEnableCompression()) {
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
        if (backupMatchesPreferred) {
          if (normalizedString && hasExistingBackup) {
            var _backupRawForCache = useCompressedSerialization ? typeof existingBackupRaw === 'string' && existingBackupRaw ? existingBackupRaw : observedBackupRawValue : observedBackupRawValue;
            if (typeof _backupRawForCache === 'string' && _backupRawForCache) {
              cacheStorageValue(storage, fallbackKey, _backupRawForCache, normalizedString, value);
            }
          }
          return {
            v: void 0
          };
        }
        var attemptBackupWrite = function attemptBackupWrite() {
          var candidates = backupCandidates.length ? backupCandidates : [{
            serialized: serialized,
            compressed: useCompressedSerialization
          }];
          var backupError = null;
          var backupRemovedForRetry = false;
          var lastCandidate = null;
          var tryStoreCandidate = function tryStoreCandidate(candidate) {
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
          for (var index = 0; index < candidates.length; index += 1) {
            var candidate = candidates[index];
            lastCandidate = candidate;
            if (tryStoreCandidate(candidate)) {
              if (normalizedString) {
                var normalizedForBackup = candidate.compressed && normalizedString ? normalizedString : candidate.serialized;
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
                    var _normalizedForBackup = candidate.compressed && normalizedString ? normalizedString : candidate.serialized;
                    cacheStorageValue(storage, fallbackKey, candidate.serialized, _normalizedForBackup, value);
                  }
                  return 'success';
                }
              } catch (removeError) {
                console.warn("Unable to remove previous backup for ".concat(key), removeError);
              }
            }
          }
          if (isQuotaExceededError(backupError)) {
            if (attemptHandleQuota(backupError, {
              serialized: lastCandidate && typeof lastCandidate.serialized === 'string' ? lastCandidate.serialized : serialized,
              backupKey: fallbackKey,
              isBackup: true
            })) {
              resetSerializationState();
              if (!registerQuotaRecoveryStep()) {
                return 'failure';
              }
              return 'retry';
            }
            if (!quotaRecoveryFailed && tryEnableCompression()) {
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
              console.warn("Unable to restore previous backup for ".concat(key), restoreError);
            }
          }
          console.warn("Unable to update backup copy for ".concat(key), backupError);
          alertStorageError();
          return 'failure';
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
      _ret2;
    while (attempts < MAX_SAVE_ATTEMPTS) {
      _ret2 = _loop2();
      if (_ret2 === 0) break;
      if (_ret2 === 1) continue;
      if (_ret2) return _ret2.v;
    }
    if (hasPreservedBackup && removedBackupDuringRetry && typeof preservedBackupValue === 'string') {
      try {
        storage.setItem(fallbackKey, preservedBackupValue);
        clearCachedStorageEntry(storage, fallbackKey);
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
    var _ref8 = options || {},
      _ref8$disableBackup = _ref8.disableBackup,
      disableBackup = _ref8$disableBackup === void 0 ? false : _ref8$disableBackup,
      backupKey = _ref8.backupKey;
    var fallbackKey = typeof backupKey === 'string' && backupKey ? backupKey : "".concat(key).concat(STORAGE_BACKUP_SUFFIX);
    var useBackup = !disableBackup && fallbackKey && fallbackKey !== key;
    clearCachedStorageEntry(storage, key);
    if (useBackup) {
      clearCachedStorageEntry(storage, fallbackKey);
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
  function ensureImportedProjectBaseName(rawName) {
    var trimmed = typeof rawName === "string" ? rawName.trim() : "";
    if (!trimmed) {
      return "Project-imported";
    }
    if (trimmed.toLowerCase().endsWith("-imported")) {
      return trimmed;
    }
    return "".concat(trimmed, "-imported");
  }
  function generateImportedProjectName(baseName, usedNames, normalizedNames) {
    var normalized = normalizedNames || new Set(_toConsumableArray(usedNames).map(function (name) {
      return typeof name === "string" ? name.trim().toLowerCase() : "";
    }).filter(function (name) {
      return name;
    }));
    var base = ensureImportedProjectBaseName(baseName);
    var candidate = base.trim();
    if (!candidate) {
      candidate = "Project-imported";
    }
    var normalizedCandidate = candidate.toLowerCase();
    var suffix = 2;
    while (normalizedCandidate && normalized.has(normalizedCandidate)) {
      candidate = "".concat(base, "-").concat(suffix++);
      normalizedCandidate = candidate.trim().toLowerCase();
    }
    usedNames.add(candidate);
    if (normalizedCandidate) {
      normalized.add(normalizedCandidate);
    }
    return candidate;
  }
  function ensureUpdatedProjectBaseName(rawName) {
    var trimmed = typeof rawName === "string" ? rawName.trim() : "";
    if (!trimmed) {
      return "Project-updated";
    }
    if (trimmed.toLowerCase().endsWith("-updated")) {
      return trimmed;
    }
    return "".concat(trimmed, "-updated");
  }
  function generateUpdatedProjectName(baseName, usedNames, normalizedNames) {
    var normalized = normalizedNames || new Set(_toConsumableArray(usedNames).map(function (name) {
      return typeof name === "string" ? name.trim().toLowerCase() : "";
    }).filter(function (name) {
      return name;
    }));
    var base = ensureUpdatedProjectBaseName(baseName);
    var candidate = base;
    var suffix = 2;
    var normalizedCandidate = candidate.trim().toLowerCase();
    while (normalizedCandidate && normalized.has(normalizedCandidate)) {
      candidate = "".concat(base, "-").concat(suffix++);
      normalizedCandidate = candidate.trim().toLowerCase();
    }
    return candidate;
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
    var normalizedState = normalizeLegacyLongGopStructure(state);
    if (normalizedState !== state) {
      return {
        state: normalizedState,
        changed: true
      };
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
    var normalizedState = normalizeLegacyLongGopStructure(state);
    saveJSONToStorage(safeStorage, SESSION_STATE_KEY, normalizedState, "Error saving session state to localStorage:");
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
        var normalizedValue = normalizeLegacyLongGopStructure(value);
        if (normalizedValue !== value) {
          changed = true;
        }
        normalized[name] = normalizedValue;
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
    try {
      return expandAutoBackupEntries(setups, {
        isAutoBackupKey: function isAutoBackupKey(name) {
          return typeof name === 'string' && name.startsWith(STORAGE_AUTO_BACKUP_NAME_PREFIX);
        }
      });
    } catch (error) {
      console.warn('Failed to expand automatic backup entries while loading setups', error);
      return cloneAutoBackupValue(setups);
    }
  }
  function saveSetups(setups) {
    var _normalizeSetups2 = normalizeSetups(setups),
      normalizedSetups = _normalizeSetups2.data;
    enforceAutoBackupLimits(normalizedSetups);
    var serializedSetups = serializeAutoBackupEntries(normalizedSetups, {
      isAutoBackupKey: function isAutoBackupKey(name) {
        return typeof name === 'string' && name.startsWith(STORAGE_AUTO_BACKUP_NAME_PREFIX);
      }
    });
    var safeStorage = getSafeLocalStorage();
    ensurePreWriteMigrationBackup(safeStorage, SETUP_STORAGE_KEY);
    saveJSONToStorage(safeStorage, SETUP_STORAGE_KEY, serializedSetups, "Error saving setups to localStorage:", {
      onQuotaExceeded: function onQuotaExceeded() {
        var removedKey = removeOldestAutoBackupEntry(serializedSetups);
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
    var _ref9 = callback(setups) || {},
      result = _ref9.result,
      _ref9$changed = _ref9.changed,
      changed = _ref9$changed === void 0 ? true : _ref9$changed;
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
    Object.entries(LEGACY_PROJECT_FIELD_LABELS).forEach(function (_ref0) {
      var _ref1 = _slicedToArray(_ref0, 2),
        field = _ref1[0],
        labels = _ref1[1];
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
      Object.entries(value).forEach(function (_ref10) {
        var _ref11 = _slicedToArray(_ref10, 2),
          key = _ref11[0],
          val = _ref11[1];
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
    Object.entries(info).forEach(function (_ref12) {
      var _ref13 = _slicedToArray(_ref12, 2),
        key = _ref13[0],
        raw = _ref13[1];
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
    if (!Object.keys(normalized).length) {
      return null;
    }
    var normalizedWithLegacySupport = normalizeLegacyLongGopStructure(normalized);
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
        return _objectSpread({}, positions);
      }
    }
  }
  function cloneProjectGearSelectors(selectors) {
    if (!isPlainObject(selectors)) {
      return null;
    }
    var clone = {};
    Object.entries(selectors).forEach(function (_ref14) {
      var _ref15 = _slicedToArray(_ref14, 2),
        id = _ref15[0],
        value = _ref15[1];
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
  function normalizeProjectPowerSelection(raw) {
    if (raw == null) {
      return null;
    }
    var normalizeString = function normalizeString(value) {
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
    var normalized = {
      batteryPlate: normalizeString(raw.batteryPlate),
      battery: normalizeString(raw.battery),
      batteryHotswap: normalizeString(raw.batteryHotswap)
    };
    var hasValue = Object.keys(normalized).some(function (key) {
      return normalized[key];
    });
    return hasValue ? normalized : null;
  }
  function cloneProjectPowerSelection(selection) {
    var normalized = normalizeProjectPowerSelection(selection);
    if (!normalized) {
      return null;
    }
    return {
      batteryPlate: normalized.batteryPlate,
      battery: normalized.battery,
      batteryHotswap: normalized.batteryHotswap
    };
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
      return normalizeProject({
        gearList: data,
        projectInfo: null
      });
    }
    if (isMapLike(data)) {
      var converted = convertMapLikeToObject(data);
      if (converted) {
        return normalizeProject(converted);
      }
      return null;
    }
    if (isPlainObject(data)) {
      if (Object.prototype.hasOwnProperty.call(data, "gearList") || Object.prototype.hasOwnProperty.call(data, "projectInfo")) {
        var projectContainer = isMapLike(data.project) ? convertMapLikeToObject(data.project) : data.project;
        var projectInfoSource = data.projectInfo;
        if (isMapLike(projectInfoSource)) {
          projectInfoSource = convertMapLikeToObject(projectInfoSource);
        }
        var normalizedProjectInfo = isPlainObject(projectInfoSource) ? projectInfoSource : null;
        if (!normalizedProjectInfo && typeof projectInfoSource === "string") {
          var parsedInfo = tryParseJSONLike(projectInfoSource);
          if (parsedInfo.success && isPlainObject(parsedInfo.parsed)) {
            normalizedProjectInfo = parsedInfo.parsed;
          }
        }
        if (!normalizedProjectInfo && isPlainObject(projectContainer)) {
          var nestedProjectInfo = projectContainer.projectInfo;
          if (isMapLike(nestedProjectInfo)) {
            nestedProjectInfo = convertMapLikeToObject(nestedProjectInfo);
          }
          if (isPlainObject(nestedProjectInfo)) {
            normalizedProjectInfo = nestedProjectInfo;
          } else if (typeof nestedProjectInfo === "string") {
            var parsedProjectInfo = tryParseJSONLike(nestedProjectInfo);
            if (parsedProjectInfo.success && isPlainObject(parsedProjectInfo.parsed)) {
              normalizedProjectInfo = parsedProjectInfo.parsed;
            }
          }
        }
        var normalizedAutoGearRules = null;
        var assignAutoGearRules = function assignAutoGearRules(source) {
          if (normalizedAutoGearRules && normalizedAutoGearRules.length) {
            return;
          }
          if (source === null || source === undefined) {
            return;
          }
          var candidate = source;
          if (isMapLike(candidate)) {
            var convertedRules = convertMapLikeToObject(candidate);
            if (convertedRules) {
              candidate = Object.values(convertedRules).filter(function (entry) {
                return entry !== null && entry !== undefined;
              });
            }
          }
          if (Array.isArray(candidate) && candidate.length) {
            normalizedAutoGearRules = candidate;
            return;
          }
          if (isPlainObject(candidate)) {
            var values = Object.values(candidate).filter(function (entry) {
              return entry !== null && entry !== undefined;
            });
            if (values.length) {
              normalizedAutoGearRules = values;
              return;
            }
          }
          if (typeof candidate === "string") {
            var parsedRules = tryParseJSONLike(candidate);
            if (parsedRules.success && Array.isArray(parsedRules.parsed) && parsedRules.parsed.length) {
              normalizedAutoGearRules = parsedRules.parsed;
            }
          }
        };
        assignAutoGearRules(data.autoGearRules);
        if (!normalizedAutoGearRules && isPlainObject(projectContainer)) {
          assignAutoGearRules(projectContainer.autoGearRules);
        }
        var gearListSource = isMapLike(data.gearList) ? convertMapLikeToObject(data.gearList) : data.gearList;
        if ((gearListSource === null || gearListSource === undefined || typeof gearListSource === "string" && !gearListSource) && isPlainObject(projectContainer) && Object.prototype.hasOwnProperty.call(projectContainer, "gearList")) {
          gearListSource = projectContainer.gearList;
        }
        if (isMapLike(gearListSource)) {
          var convertedGearList = convertMapLikeToObject(gearListSource);
          if (convertedGearList) {
            gearListSource = convertedGearList;
          }
        }
        var normalizedGearList = typeof gearListSource === "string" || gearListSource && _typeof(gearListSource) === "object" ? gearListSource : "";
        var normalizedGearSelectors = null;
        var gearSelectorsSource = isMapLike(data.gearSelectors) ? convertMapLikeToObject(data.gearSelectors) : data.gearSelectors;
        if (isPlainObject(gearSelectorsSource)) {
          normalizedGearSelectors = cloneProjectGearSelectors(gearSelectorsSource);
        } else if (typeof gearSelectorsSource === "string") {
          var parsedSelectors = tryParseJSONLike(gearSelectorsSource);
          if (parsedSelectors.success && isPlainObject(parsedSelectors.parsed)) {
            normalizedGearSelectors = cloneProjectGearSelectors(parsedSelectors.parsed);
          }
        }
        var powerSelectionSource = isMapLike(data.powerSelection) ? convertMapLikeToObject(data.powerSelection) : data.powerSelection;
        var normalizedPowerSelection = normalizeProjectPowerSelection(powerSelectionSource);
        if (!normalizedPowerSelection && isPlainObject(powerSelectionSource)) {
          normalizedPowerSelection = normalizeProjectPowerSelection(powerSelectionSource);
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
              if (!normalizedPowerSelection && isPlainObject(nested.powerSelection)) {
                normalizedPowerSelection = normalizeProjectPowerSelection(nested.powerSelection);
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
        var diagramSource = isMapLike(data.diagramPositions) ? convertMapLikeToObject(data.diagramPositions) : data.diagramPositions;
        var normalizedDiagramPositions = normalizeDiagramPositions(diagramSource);
        if (Object.keys(normalizedDiagramPositions).length === 0 && isPlainObject(projectContainer)) {
          var nestedDiagramSource = isMapLike(projectContainer.diagramPositions) ? convertMapLikeToObject(projectContainer.diagramPositions) : projectContainer.diagramPositions;
          normalizedDiagramPositions = normalizeDiagramPositions(nestedDiagramSource);
        }
        if (Object.keys(normalizedDiagramPositions).length) {
          _normalized2.diagramPositions = cloneDiagramPositionsForStorage(normalizedDiagramPositions);
        }
        var htmlSources = [];
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
          var nestedSelectorsSource = isMapLike(projectContainer.gearSelectors) ? convertMapLikeToObject(projectContainer.gearSelectors) : projectContainer.gearSelectors;
          if (isPlainObject(nestedSelectorsSource)) {
            normalizedGearSelectors = cloneProjectGearSelectors(nestedSelectorsSource);
          }
        }
        if (!normalizedGearSelectors && isPlainObject(normalizedGearList) && isPlainObject(normalizedGearList.gearSelectors)) {
          normalizedGearSelectors = cloneProjectGearSelectors(normalizedGearList.gearSelectors);
        }
        if (!normalizedPowerSelection && isPlainObject(projectContainer)) {
          var nestedPowerSelection = isMapLike(projectContainer.powerSelection) ? convertMapLikeToObject(projectContainer.powerSelection) : projectContainer.powerSelection;
          if (isPlainObject(nestedPowerSelection)) {
            normalizedPowerSelection = normalizeProjectPowerSelection(nestedPowerSelection);
          }
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
          for (var _i3 = 0; _i3 < htmlSources.length; _i3 += 1) {
            var _recovered = extractProjectInfoFromHtml(htmlSources[_i3]);
            if (_recovered) {
              var recoveredClone = cloneProjectInfo(_recovered) || {};
              var normalizedClone = cloneProjectInfo(normalizedProjectInfo) || {};
              _normalized2.projectInfo = _objectSpread(_objectSpread({}, recoveredClone), normalizedClone);
              break;
            }
          }
        }
        var derivedGenerationFlag = typeof data.gearListAndProjectRequirementsGenerated === 'boolean' ? data.gearListAndProjectRequirementsGenerated : htmlSources.some(function (value) {
          return typeof value === 'string' && value.trim();
        });
        _normalized2.gearListAndProjectRequirementsGenerated = derivedGenerationFlag;
        if (normalizedAutoGearRules && normalizedAutoGearRules.length) {
          _normalized2.autoGearRules = cloneAutoGearRules(normalizedAutoGearRules);
        }
        if (normalizedGearSelectors && Object.keys(normalizedGearSelectors).length) {
          _normalized2.gearSelectors = normalizedGearSelectors;
        }
        if (normalizedPowerSelection) {
          _normalized2.powerSelection = cloneProjectPowerSelection(normalizedPowerSelection);
        }
        copyAutoBackupMetadata(data, _normalized2);
        if (_normalized2.projectInfo) {
          var normalizedInfo = normalizeLegacyLongGopStructure(_normalized2.projectInfo);
          if (normalizedInfo !== _normalized2.projectInfo) {
            _normalized2.projectInfo = normalizedInfo;
          }
        }
        if (_normalized2.autoGearRules) {
          var normalizedRules = normalizeLegacyLongGopStructure(_normalized2.autoGearRules);
          if (normalizedRules !== _normalized2.autoGearRules) {
            _normalized2.autoGearRules = normalizedRules;
          }
        }
        if (_normalized2.gearSelectors) {
          var normalizedSelectors = normalizeLegacyLongGopStructure(_normalized2.gearSelectors);
          if (normalizedSelectors !== _normalized2.gearSelectors) {
            _normalized2.gearSelectors = normalizedSelectors;
          }
        }
        if (_normalized2.diagramPositions) {
          var normalizedDiagram = normalizeLegacyLongGopStructure(_normalized2.diagramPositions);
          if (normalizedDiagram !== _normalized2.diagramPositions) {
            _normalized2.diagramPositions = normalizedDiagram;
          }
        }
        if (_normalized2.powerSelection) {
          var normalizedPower = normalizeLegacyLongGopStructure(_normalized2.powerSelection);
          if (normalizedPower !== _normalized2.powerSelection) {
            _normalized2.powerSelection = normalizedPower;
          }
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
  var LEGACY_PROJECT_ROOT_KEYS = new Set(["gearList", "projectInfo", "projectHtml", "gearHtml", "autoGearRules", "powerSelection", "gearListAndProjectRequirementsGenerated"]);
  var NORMALIZED_PROJECT_KEYS = new Set(["gearList", "projectInfo", "autoGearRules", "diagramPositions", "gearSelectors", "powerSelection", "gearListAndProjectRequirementsGenerated"]);
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
    if (Object.prototype.hasOwnProperty.call(entry, "powerSelection")) {
      var powerSelection = entry.powerSelection;
      if (!isPlainObject(powerSelection)) {
        return false;
      }
    }
    if (Object.prototype.hasOwnProperty.call(entry, "gearListAndProjectRequirementsGenerated") && typeof entry.gearListAndProjectRequirementsGenerated !== "boolean") {
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
  function resolveProjectKey(projects, lookup, name) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    if (!projects || _typeof(projects) !== "object") {
      return null;
    }
    var rawName = typeof name === "string" ? name : "";
    if (Object.prototype.hasOwnProperty.call(projects, rawName)) {
      return rawName;
    }
    var normalizedName = normalizeProjectStorageKey(rawName);
    if (normalizedName && normalizedName !== rawName && Object.prototype.hasOwnProperty.call(projects, normalizedName)) {
      return normalizedName;
    }
    if (!lookup || _typeof(lookup) !== "object") {
      return null;
    }
    var rawMap = lookup.raw,
      normalizedMap = lookup.normalized;
    if (rawMap && typeof rawMap.get === "function" && rawMap.has(rawName)) {
      var candidate = rawMap.get(rawName);
      if (Object.prototype.hasOwnProperty.call(projects, candidate)) {
        return candidate;
      }
    }
    if (normalizedMap && typeof normalizedMap.get === "function" && normalizedMap.has(normalizedName)) {
      var candidates = normalizedMap.get(normalizedName);
      if (Array.isArray(candidates)) {
        if (options && options.preferExact && rawName) {
          var exact = candidates.find(function (candidate) {
            return candidate === rawName && Object.prototype.hasOwnProperty.call(projects, candidate);
          });
          if (exact) {
            return exact;
          }
        }
        var firstExisting = candidates.find(function (candidate) {
          return Object.prototype.hasOwnProperty.call(projects, candidate);
        });
        if (firstExisting) {
          return firstExisting;
        }
      } else if (typeof candidates === "string" && Object.prototype.hasOwnProperty.call(projects, candidates)) {
        return candidates;
      }
    }
    return null;
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
    var expandedParsed = expandAutoBackupEntries(parsed, {
      isAutoBackupKey: isAutoBackupStorageKey
    });
    var projects = {};
    var changed = false;
    var usedProjectNames = new Set();
    var normalizedProjectNames = new Set();
    var markProjectNameUsed = function markProjectNameUsed(name) {
      if (typeof name !== "string") {
        return;
      }
      usedProjectNames.add(name);
      var trimmed = name.trim();
      if (trimmed) {
        normalizedProjectNames.add(trimmed.toLowerCase());
      }
    };
    var rawKeyLookup = new Map();
    var normalizedKeyLookup = new Map();
    var registerLookupKey = function registerLookupKey(rawKey, storedKey) {
      if (typeof rawKey !== "string") {
        return;
      }
      var effectiveKey = typeof storedKey === "string" ? storedKey : rawKey;
      rawKeyLookup.set(rawKey, effectiveKey);
      var normalized = normalizeProjectStorageKey(rawKey);
      if (!normalizedKeyLookup.has(normalized)) {
        normalizedKeyLookup.set(normalized, []);
      }
      normalizedKeyLookup.get(normalized).push(effectiveKey);
    };
    var createLookupSnapshot = function createLookupSnapshot() {
      return {
        raw: rawKeyLookup,
        normalized: normalizedKeyLookup
      };
    };
    if (expandedParsed === null || expandedParsed === undefined) {
      return {
        projects: projects,
        changed: false,
        originalValue: originalValue,
        lookup: createLookupSnapshot()
      };
    }
    if (typeof expandedParsed === "string") {
      var normalized = normalizeProject(expandedParsed);
      if (normalized) {
        var updatedName = generateUpdatedProjectName("", usedProjectNames, normalizedProjectNames);
        projects[updatedName] = normalized;
        registerLookupKey("", updatedName);
        markProjectNameUsed(updatedName);
      }
      return {
        projects: projects,
        changed: true,
        originalValue: originalValue,
        lookup: createLookupSnapshot()
      };
    }
    if (Array.isArray(expandedParsed)) {
      var usedNames = usedProjectNames;
      var normalizedNames = normalizedProjectNames;
      expandedParsed.forEach(function (item, index) {
        var normalized = normalizeProject(item);
        if (!normalized) {
          changed = true;
          return;
        }
        var baseName = isPlainObject(item) && typeof item.name === "string" ? item.name.trim() : "Project ".concat(index + 1);
        var candidate = baseName || "Project ".concat(index + 1);
        var unique = generateUpdatedProjectName(candidate, usedNames, normalizedNames);
        projects[unique] = normalized;
        registerLookupKey(candidate, unique);
        markProjectNameUsed(unique);
      });
      return {
        projects: projects,
        changed: true,
        originalValue: originalValue,
        lookup: createLookupSnapshot()
      };
    }
    if (!isPlainObject(expandedParsed)) {
      return {
        projects: projects,
        changed: true,
        originalValue: originalValue,
        lookup: createLookupSnapshot()
      };
    }
    var keys = Object.keys(expandedParsed);
    var maybeLegacy = keys.length > 0 && keys.every(function (key) {
      return LEGACY_PROJECT_ROOT_KEYS.has(key);
    });
    if (maybeLegacy) {
      var _normalized3 = normalizeProject(expandedParsed);
      if (_normalized3) {
        var _updatedName = generateUpdatedProjectName("", usedProjectNames, normalizedProjectNames);
        projects[_updatedName] = _normalized3;
        registerLookupKey("", _updatedName);
        markProjectNameUsed(_updatedName);
      }
      return {
        projects: projects,
        changed: true,
        originalValue: originalValue,
        lookup: createLookupSnapshot()
      };
    }
    keys.forEach(function (key) {
      if (isNormalizedProjectEntry(expandedParsed[key])) {
        var trimmedKey = typeof key === "string" ? key.trim() : "";
        if (trimmedKey) {
          normalizedProjectNames.add(trimmedKey.toLowerCase());
        }
      }
    });
    keys.forEach(function (key) {
      var normalized = normalizeProject(expandedParsed[key]);
      if (normalized) {
        var originalEntry = expandedParsed[key];
        var needsUpgrade = !isNormalizedProjectEntry(originalEntry);
        var requiresContentUpdate = false;
        if (!needsUpgrade) {
          try {
            var normalizedSignature = createStableValueSignature(normalized);
            var originalSignature = createStableValueSignature(originalEntry);
            if (normalizedSignature !== originalSignature) {
              requiresContentUpdate = true;
            }
          } catch (signatureError) {
            requiresContentUpdate = true;
            console.warn('Unable to compare stored project entry during legacy long-GOP normalization check', signatureError);
          }
        }
        var finalKey = key;
        if (needsUpgrade) {
          finalKey = generateUpdatedProjectName(key, usedProjectNames, normalizedProjectNames);
          changed = true;
        }
        if (finalKey !== key && Object.prototype.hasOwnProperty.call(projects, finalKey)) {
          var adjusted = generateUpdatedProjectName(finalKey, usedProjectNames, normalizedProjectNames);
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
    return {
      projects: projects,
      changed: changed,
      originalValue: originalValue,
      lookup: createLookupSnapshot()
    };
  }
  function persistAllProjects(projects) {
    var safeStorage = getSafeLocalStorage();
    enforceAutoBackupLimits(projects);
    var serializedProjects = serializeAutoBackupEntries(projects, {
      isAutoBackupKey: isAutoBackupStorageKey
    });
    ensurePreWriteMigrationBackup(safeStorage, PROJECT_STORAGE_KEY);
    saveJSONToStorage(safeStorage, PROJECT_STORAGE_KEY, serializedProjects, "Error saving project to localStorage:", {
      disableCompression: true,
      onQuotaExceeded: function onQuotaExceeded() {
        var removedKey = removeOldestAutoBackupEntry(serializedProjects);
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
      originalValue = _readAllProjectsFromS.originalValue,
      lookup = _readAllProjectsFromS.lookup;
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
    var resolvedKey = resolveProjectKey(projects, lookup, name, {
      preferExact: true
    });
    if (resolvedKey !== null && resolvedKey !== undefined && Object.prototype.hasOwnProperty.call(projects, resolvedKey)) {
      return projects[resolvedKey];
    }
    return null;
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
      var cloned = STORAGE_DEEP_CLONE(entry);
      var normalized = normalizeLegacyLongGopStructure(cloned);
      return normalized !== cloned ? normalized : cloned;
    } catch (error) {
      console.warn('Unable to deep clone project for backup', error);
      var fallback = _objectSpread({}, entry);
      var _normalized4 = normalizeLegacyLongGopStructure(fallback);
      return _normalized4 !== fallback ? _normalized4 : fallback;
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
  function generateOverwriteBackupMetadata(projectName, projects) {
    var timestamp = formatAutoBackupTimestamp(new Date());
    var sanitizedName = sanitizeProjectNameForBackup(projectName);
    var baseName = sanitizedName ? "".concat(STORAGE_AUTO_BACKUP_NAME_PREFIX).concat(timestamp, "-").concat(sanitizedName) : "".concat(STORAGE_AUTO_BACKUP_NAME_PREFIX).concat(timestamp);
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
  function maybeCreateProjectOverwriteBackup(projects, key) {
    if (!isPlainObject(projects) || typeof key !== 'string') {
      return {
        status: 'invalid'
      };
    }
    if (!Object.prototype.hasOwnProperty.call(projects, key)) {
      return {
        status: 'missing'
      };
    }
    if (key.startsWith(STORAGE_AUTO_BACKUP_NAME_PREFIX) || key.startsWith(STORAGE_AUTO_BACKUP_DELETION_PREFIX)) {
      return {
        status: 'skipped'
      };
    }
    var backupSource = cloneProjectEntryForBackup(projects[key]);
    if (backupSource === undefined) {
      return {
        status: 'failed'
      };
    }
    var _generateOverwriteBac = generateOverwriteBackupMetadata(key, projects),
      backupName = _generateOverwriteBac.name;
    if (!backupName) {
      return {
        status: 'failed'
      };
    }
    projects[backupName] = backupSource;
    return {
      status: 'created',
      backupName: backupName
    };
  }
  function saveProject(name, project) {
    if (!isPlainObject(project)) return;
    var normalized = normalizeProject(project);
    if (!normalized) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn("Skipped saving project \"".concat(name || '', "\" because the payload could not be normalised."));
      }
      return;
    }
    var _readAllProjectsFromS2 = readAllProjectsFromStorage(),
      projects = _readAllProjectsFromS2.projects,
      changed = _readAllProjectsFromS2.changed,
      originalValue = _readAllProjectsFromS2.originalValue,
      lookup = _readAllProjectsFromS2.lookup;
    if (changed) {
      var safeStorage = getSafeLocalStorage();
      if (safeStorage) {
        createStorageMigrationBackup(safeStorage, PROJECT_STORAGE_KEY, originalValue);
      }
    }
    var requestedKey = typeof name === 'string' ? name : '';
    var preferredKey = normalizeProjectStorageKey(requestedKey);
    var resolvedKey = resolveProjectKey(projects, lookup, requestedKey, {
      preferExact: true
    });
    var storageKey = resolvedKey;
    var renamedFromKey = null;
    if (preferredKey && preferredKey !== resolvedKey && !Object.prototype.hasOwnProperty.call(projects, preferredKey)) {
      storageKey = preferredKey;
      renamedFromKey = resolvedKey;
    }
    if (storageKey === null || storageKey === undefined) {
      storageKey = preferredKey;
    }
    if (!storageKey && storageKey !== '') {
      storageKey = '';
    }
    var existingKey = renamedFromKey !== null && renamedFromKey !== undefined ? renamedFromKey : storageKey;
    var hasExistingEntry = existingKey !== null && existingKey !== undefined && Object.prototype.hasOwnProperty.call(projects, existingKey);
    if (hasExistingEntry) {
      var existingSignature = createStableValueSignature(projects[existingKey]);
      var nextSignature = createStableValueSignature(normalized);
      if (existingSignature !== nextSignature) {
        var backupOutcome = maybeCreateProjectOverwriteBackup(projects, existingKey);
        if (backupOutcome.status === 'failed') {
          console.warn("Automatic backup before overwriting project \"".concat(existingKey, "\" failed. Proceeding with save."));
        }
      }
    }
    if (renamedFromKey !== null && renamedFromKey !== undefined && renamedFromKey !== storageKey) {
      delete projects[renamedFromKey];
    }
    projects[storageKey || ''] = normalized;
    persistAllProjects(projects);
  }
  function deleteProject(name) {
    if (name === undefined) {
      deleteFromStorage(getSafeLocalStorage(), PROJECT_STORAGE_KEY, "Error deleting project from localStorage:");
      return;
    }
    var _readAllProjectsFromS3 = readAllProjectsFromStorage(),
      projects = _readAllProjectsFromS3.projects,
      changed = _readAllProjectsFromS3.changed,
      originalValue = _readAllProjectsFromS3.originalValue,
      lookup = _readAllProjectsFromS3.lookup;
    if (changed) {
      var safeStorage = getSafeLocalStorage();
      if (safeStorage) {
        createStorageMigrationBackup(safeStorage, PROJECT_STORAGE_KEY, originalValue);
      }
    }
    var resolvedKey = resolveProjectKey(projects, lookup, name, {
      preferExact: true
    });
    var key = resolvedKey !== null && resolvedKey !== undefined ? resolvedKey : normalizeProjectStorageKey(name);
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
      var originalHasGenerationFlag = project && _typeof(project) === "object" && Object.prototype.hasOwnProperty.call(project, "gearListAndProjectRequirementsGenerated") && typeof project.gearListAndProjectRequirementsGenerated === "boolean";
      if (!originalHasGenerationFlag && typeof normalizedProject.gearListAndProjectRequirementsGenerated !== 'boolean') {
        normalizedProject.gearListAndProjectRequirementsGenerated = false;
      }
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
      var normalizedBase = typeof baseName === "string" ? baseName.trim().toLowerCase() : "";
      var uniqueName = normalizedBase && normalizedNames.has(normalizedBase) ? generateImportedProjectName(baseName, usedNames, normalizedNames) : generateUniqueName(baseName, usedNames, normalizedNames);
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
      var importProject = ensureImporter();
      importProject("", collection, fallbackLabel);
      return true;
    }
    if (isMapLike(collection)) {
      var converted = convertMapLikeToObject(collection);
      if (converted) {
        return importProjectCollection(Object.entries(converted), ensureImporter, fallbackLabel);
      }
      return false;
    }
    if (Array.isArray(collection)) {
      var entries = collection.map(function (proj) {
        if (proj === null || proj === undefined) {
          return null;
        }
        if (Array.isArray(proj) && proj.length >= 2) {
          return {
            name: proj[0],
            project: proj[1]
          };
        }
        if (isPlainObject(proj) && typeof proj.name === "string") {
          return {
            name: proj.name,
            project: proj
          };
        }
        return {
          name: '',
          project: proj
        };
      }).filter(Boolean);
      if (!entries.length) {
        return true;
      }
      var _importProject = ensureImporter();
      var count = 0;
      entries.forEach(function (_ref16) {
        var name = _ref16.name,
          project = _ref16.project;
        if (project === null || project === undefined) {
          return;
        }
        count += 1;
        var normalizedName = '';
        if (typeof name === 'string') {
          normalizedName = name;
        } else if (typeof name === 'number' || typeof name === 'boolean' || typeof name === 'bigint') {
          normalizedName = String(name);
        } else if (_typeof(name) === 'symbol') {
          normalizedName = name.description || name.toString();
        }
        _importProject(normalizedName, project, "".concat(fallbackLabel, " ").concat(count));
      });
      return true;
    }
    if (isPlainObject(collection)) {
      var _importProject2 = ensureImporter();
      Object.entries(collection).forEach(function (_ref17) {
        var _ref18 = _slicedToArray(_ref17, 2),
          name = _ref18[0],
          proj = _ref18[1];
        var normalizedName = typeof name === 'string' ? name : convertMapLikeKey(name);
        _importProject2(typeof normalizedName === 'string' ? normalizedName : '', proj);
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
    if (isMapLike(value)) {
      var converted = convertMapLikeToObject(value);
      if (converted) {
        return normalizeImportedFullBackupHistory(Object.values(converted));
      }
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
      var _entry2 = normalizeFullBackupHistoryEntry(value);
      if (_entry2) {
        return [_entry2];
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
    var rules = Array.isArray(parsed) ? parsed : [];
    var normalizedRules = Array.isArray(rules) ? normalizeLegacyLongGopStructure(rules) : [];
    if (normalizedRules !== rules) {
      saveAutoGearRules(normalizedRules, {
        skipNormalization: true
      });
    }
    return Array.isArray(normalizedRules) ? normalizedRules : [];
  }
  function saveAutoGearRules(rules) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var opts = options || {};
    var _opts$skipNormalizati = opts.skipNormalization,
      skipNormalization = _opts$skipNormalizati === void 0 ? false : _opts$skipNormalizati;
    var safeRules = Array.isArray(rules) ? rules.slice() : [];
    var normalizedRules = skipNormalization ? safeRules : Array.isArray(safeRules) ? normalizeLegacyLongGopStructure(safeRules) : [];
    var safeStorage = getSafeLocalStorage();
    ensurePreWriteMigrationBackup(safeStorage, AUTO_GEAR_RULES_STORAGE_KEY);
    saveJSONToStorage(safeStorage, AUTO_GEAR_RULES_STORAGE_KEY, normalizedRules, "Error saving automatic gear rules to localStorage:", {
      disableCompression: true
    });
    return normalizedRules;
  }
  function loadAutoGearBackups() {
    applyLegacyStorageMigrations();
    var safeStorage = getSafeLocalStorage();
    var parsed = loadJSONFromStorage(safeStorage, AUTO_GEAR_BACKUPS_STORAGE_KEY, "Error loading automatic gear rule backups from localStorage:", [], {
      validate: function validate(value) {
        return value === null || Array.isArray(value);
      }
    });
    var backups = Array.isArray(parsed) ? parsed : [];
    var _normalizeLegacyLongG = normalizeLegacyLongGopBackups(backups),
      normalizedBackups = _normalizeLegacyLongG.normalized,
      changed = _normalizeLegacyLongG.changed;
    if (changed) {
      saveAutoGearBackups(normalizedBackups, {
        skipNormalization: true
      });
    }
    return normalizedBackups;
  }
  function saveAutoGearBackups(backups) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var opts = options || {};
    var _opts$skipNormalizati2 = opts.skipNormalization,
      skipNormalization = _opts$skipNormalizati2 === void 0 ? false : _opts$skipNormalizati2;
    var safeBackups = Array.isArray(backups) ? backups.slice() : [];
    var _ref19 = skipNormalization ? {
        normalized: safeBackups,
        changed: false
      } : normalizeLegacyLongGopBackups(safeBackups),
      normalizedBackups = _ref19.normalized;
    var safeStorage = getSafeLocalStorage();
    ensurePreWriteMigrationBackup(safeStorage, AUTO_GEAR_BACKUPS_STORAGE_KEY);
    var attemptedMigrationCleanup = false;
    var attemptedCacheCleanup = false;
    saveJSONToStorage(safeStorage, AUTO_GEAR_BACKUPS_STORAGE_KEY, normalizedBackups, "Error saving automatic gear rule backups to localStorage:", {
      onQuotaExceeded: function onQuotaExceeded(error) {
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var removal = removeOldestAutoGearBackupEntry(normalizedBackups);
        if (removal) {
          var label = removal.label;
          if (label) {
            console.warn("Removed automatic gear backup \"".concat(label, "\" to free up storage space before saving gear backups."));
          } else {
            console.warn('Removed oldest automatic gear backup entry to free up storage space before saving gear backups.');
          }
          return true;
        }
        var storage = context && context.storage ? context.storage : safeStorage;
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
      }
    });
    return normalizedBackups;
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
    var presetArray = Array.isArray(presets) ? presets : [];
    var normalized = Array.isArray(presetArray) ? normalizeLegacyLongGopStructure(presetArray) : [];
    if (normalized !== presetArray) {
      saveAutoGearPresets(normalized, {
        skipNormalization: true
      });
    }
    return Array.isArray(normalized) ? normalized : [];
  }
  function saveAutoGearPresets(presets) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var opts = options || {};
    var _opts$skipNormalizati3 = opts.skipNormalization,
      skipNormalization = _opts$skipNormalizati3 === void 0 ? false : _opts$skipNormalizati3;
    var safePresets = Array.isArray(presets) ? presets.slice() : [];
    var normalizedPresets = skipNormalization ? safePresets : Array.isArray(safePresets) ? normalizeLegacyLongGopStructure(safePresets) : [];
    var safeStorage = getSafeLocalStorage();
    ensurePreWriteMigrationBackup(safeStorage, AUTO_GEAR_PRESETS_STORAGE_KEY);
    saveJSONToStorage(safeStorage, AUTO_GEAR_PRESETS_STORAGE_KEY, normalizedPresets, "Error saving automatic gear presets to localStorage:");
    return normalizedPresets;
  }
  function loadAutoGearMonitorDefaults() {
    applyLegacyStorageMigrations();
    var safeStorage = getSafeLocalStorage();
    var defaults = loadJSONFromStorage(safeStorage, AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY, "Error loading automatic gear monitor defaults from localStorage:", {}, {
      validate: function validate(value) {
        return value === null || _typeof(value) === 'object';
      }
    });
    var monitorDefaults = defaults && _typeof(defaults) === 'object' ? defaults : {};
    var normalizedDefaults = isPlainObject(monitorDefaults) ? normalizeLegacyLongGopStructure(monitorDefaults) : {};
    if (normalizedDefaults !== monitorDefaults) {
      saveAutoGearMonitorDefaults(normalizedDefaults, {
        skipNormalization: true
      });
    }
    return normalizedDefaults && _typeof(normalizedDefaults) === 'object' ? normalizedDefaults : {};
  }
  function saveAutoGearMonitorDefaults(defaults) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var opts = options || {};
    var _opts$skipNormalizati4 = opts.skipNormalization,
      skipNormalization = _opts$skipNormalizati4 === void 0 ? false : _opts$skipNormalizati4;
    var safeDefaults = defaults && _typeof(defaults) === 'object' ? _objectSpread({}, defaults) : {};
    var normalizedDefaults = skipNormalization ? safeDefaults : isPlainObject(safeDefaults) ? normalizeLegacyLongGopStructure(safeDefaults) : {};
    var safeStorage = getSafeLocalStorage();
    ensurePreWriteMigrationBackup(safeStorage, AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY);
    saveJSONToStorage(safeStorage, AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY, normalizedDefaults, "Error saving automatic gear monitor defaults to localStorage:");
    return normalizedDefaults;
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
    var normalizedRawPresets = rawPresets;
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
  function getAutoGearBackupRetentionUpperBound() {
    var candidate = typeof AUTO_GEAR_BACKUP_RETENTION_MAX === 'number' ? AUTO_GEAR_BACKUP_RETENTION_MAX : MAX_AUTO_BACKUPS;
    var numeric = Number(candidate);
    if (!Number.isFinite(numeric)) {
      return MAX_AUTO_BACKUPS;
    }
    var rounded = Math.round(numeric);
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
    var upperBound = getAutoGearBackupRetentionUpperBound();
    if (rounded > upperBound) {
      return upperBound;
    }
    return rounded;
  }
  function getAutoGearBackupRetentionDefault() {
    var upperBound = getAutoGearBackupRetentionUpperBound();
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.AUTO_GEAR_BACKUP_RETENTION_DEFAULT === 'number') {
      var candidate = GLOBAL_SCOPE.AUTO_GEAR_BACKUP_RETENTION_DEFAULT;
      if (Number.isFinite(candidate) && candidate >= AUTO_GEAR_BACKUP_RETENTION_MIN) {
        var rounded = Math.round(candidate);
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
    var fallback = Math.round(AUTO_GEAR_BACKUP_RETENTION_DEFAULT_VALUE);
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
        var _candidate = normalizeAutoGearBackupRetentionValue(value[key], null);
        if (typeof _candidate === 'number' && Number.isFinite(_candidate)) {
          return clampAutoGearBackupRetention(_candidate);
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
        var _loop3 = function _loop3() {
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
          _loop3();
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
    var variants = getStorageKeyVariants(key);
    for (var i = 0; i < variants.length; i += 1) {
      var candidateKey = variants[i];
      try {
        var value = storage.getItem(candidateKey);
        if (value === null || value === undefined) {
          if (RAW_STORAGE_BACKUP_KEYS.has(candidateKey)) {
            try {
              var backupValue = storage.getItem("".concat(candidateKey).concat(STORAGE_BACKUP_SUFFIX));
              if (backupValue !== null && backupValue !== undefined) {
                var decodedBackup = decodeStoredValue(backupValue);
                return typeof decodedBackup === 'string' ? decodedBackup : String(backupValue);
              }
            } catch (backupError) {
              console.warn('Unable to read backup key for export', candidateKey, backupError);
              downgradeSafeLocalStorageToMemory('read access', backupError, storage);
            }
          }
        } else {
          var decoded = decodeStoredValue(value);
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
    var normalized = String(value).trim().toLowerCase();
    if (!normalized) {
      return null;
    }
    if (normalized === 'true' || normalized === '1' || normalized === 'yes' || normalized === 'on') {
      return true;
    }
    if (normalized === 'false' || normalized === '0' || normalized === 'no' || normalized === 'off') {
      return false;
    }
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
    var mountVoltageKey = getMountVoltageStorageKeyName();
    var mountVoltages = readLocalStorageValue(mountVoltageKey);
    if (mountVoltages) {
      try {
        preferences.mountVoltages = JSON.parse(mountVoltages);
      } catch (voltageParseError) {
        console.warn('Failed to parse stored mount voltages for backup', voltageParseError);
        preferences.mountVoltages = mountVoltages;
      }
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
        var _normalized5 = normalizeImportedBoolean(value[i]);
        if (_normalized5 !== null) {
          return _normalized5;
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
    if (isMapLike(value)) {
      var converted = convertMapLikeToObject(value);
      if (converted) {
        return normalizeImportedArray(converted, fallbackKeys, filterFn);
      }
      return [];
    }
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
    var rules = normalizeImportedArray(value, ["rules", "items", "entries", "list", "values", "data"], function (entry) {
      return entry !== null && _typeof(entry) === "object";
    });
    if (!Array.isArray(rules)) {
      return [];
    }
    return normalizeLegacyLongGopStructure(rules);
  }
  function normalizeImportedAutoGearBackups(value) {
    var backups = normalizeImportedArray(value, ["backups", "entries", "items", "list", "values", "data"], function (entry) {
      return entry !== null && _typeof(entry) === "object";
    });
    if (!Array.isArray(backups)) {
      return [];
    }
    var _normalizeLegacyLongG2 = normalizeLegacyLongGopBackups(backups),
      normalized = _normalizeLegacyLongG2.normalized;
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
      for (var _i4 = 0; _i4 < candidateKeys.length; _i4 += 1) {
        var key = candidateKeys[_i4];
        if (!Object.prototype.hasOwnProperty.call(value, key)) {
          continue;
        }
        var _candidate2 = normalizeImportedAutoGearBackupRetention(value[key]);
        if (typeof _candidate2 === 'number') {
          return _candidate2;
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
    var presets = normalizeImportedArray(value, ["presets", "entries", "items", "list", "values", "data"], function (entry) {
      return entry !== null && _typeof(entry) === "object";
    });
    if (!Array.isArray(presets)) {
      return [];
    }
    return normalizeLegacyLongGopStructure(presets);
  }
  function normalizeImportedAutoGearMonitorDefaults(value) {
    if (!value || _typeof(value) !== 'object') {
      return {};
    }
    var normalized = {};
    Object.entries(value).forEach(function (_ref20) {
      var _ref21 = _slicedToArray(_ref20, 2),
        key = _ref21[0],
        val = _ref21[1];
      if (typeof val !== 'string') return;
      var trimmed = val.trim();
      if (!trimmed) return;
      normalized[key] = trimmed;
    });
    var legacyNormalized = normalizeLegacyLongGopStructure(normalized);
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
    return getStorageKeyVariants(key);
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
    for (var _i5 = 0; _i5 < variants.length; _i5 += 1) {
      var _candidate3 = "".concat(variants[_i5]).concat(STORAGE_BACKUP_SUFFIX);
      if (Object.prototype.hasOwnProperty.call(snapshot, _candidate3)) {
        return {
          key: _candidate3,
          value: snapshot[_candidate3],
          type: 'backup'
        };
      }
    }
    for (var _i6 = 0; _i6 < variants.length; _i6 += 1) {
      var _candidate4 = "".concat(variants[_i6]).concat(STORAGE_MIGRATION_BACKUP_SUFFIX);
      if (Object.prototype.hasOwnProperty.call(snapshot, _candidate4)) {
        return {
          key: _candidate4,
          value: snapshot[_candidate4],
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
          var compressionToken = typeof parsed.compression === 'string' ? parsed.compression.trim() : '';
          var encodingToken = typeof parsed.encoding === 'string' ? parsed.encoding.trim() : '';
          var isModernCompression = compressionToken === MIGRATION_BACKUP_COMPRESSION_ALGORITHM && encodingToken === MIGRATION_BACKUP_COMPRESSION_ENCODING;
          var isLegacyLongGopCompression = LEGACY_LONG_GOP_TOKEN_REGEX.test(compressionToken) || LEGACY_LONG_GOP_TOKEN_REGEX.test(encodingToken);
          if ((isModernCompression || isLegacyLongGopCompression) && typeof parsed.data === 'string') {
            if (canUseMigrationBackupCompression()) {
              var preferredVariant = typeof parsed.compressionVariant === 'string' && parsed.compressionVariant ? parsed.compressionVariant : null;
              if (!preferredVariant) {
                if (isLegacyLongGopCompression) {
                  preferredVariant = inferLegacyLongGopCompressionVariant(encodingToken) || inferLegacyLongGopCompressionVariant(compressionToken) || 'utf16';
                } else {
                  preferredVariant = 'utf16';
                }
              }
              var decoded = tryDecompressWithStrategies(parsed.data, MIGRATION_BACKUP_COMPRESSION_VARIANTS, preferredVariant, 'migration backup entry');
              if (decoded.success && typeof decoded.value === 'string') {
                try {
                  var payload = JSON.parse(decoded.value);
                  if (payload && _typeof(payload) === 'object' && Object.prototype.hasOwnProperty.call(payload, 'data')) {
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
    var mountVoltageKeyName = getMountVoltageStorageKeyName();
    var simpleSnapshotKeys = new Set([CUSTOM_LOGO_STORAGE_KEY].concat(preferenceKeys, [mountVoltageKeyName]).filter(function (key) {
      return typeof key === 'string' && key;
    }));
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
    var mountVoltageEntry = readSnapshotEntry(snapshot, mountVoltageKeyName);
    if (mountVoltageEntry) {
      markSnapshotEntry(mountVoltageEntry);
      var storedVoltages = parseSnapshotJSONValue(mountVoltageEntry);
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
  function importAllData(allData) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!isPlainObject(allData)) {
      return;
    }
    var _ref22 = options || {},
      _ref22$skipSnapshotCo = _ref22.skipSnapshotConversion,
      skipSnapshotConversion = _ref22$skipSnapshotCo === void 0 ? false : _ref22$skipSnapshotCo;
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
    var mountVoltageKeyName = getMountVoltageStorageKeyName();
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
      if (Object.prototype.hasOwnProperty.call(prefs, 'mountVoltages')) {
        var rawVoltages = prefs.mountVoltages;
        if (rawVoltages && _typeof(rawVoltages) === 'object') {
          try {
            safeSetLocalStorage(mountVoltageKeyName, JSON.stringify(rawVoltages));
          } catch (voltStoreError) {
            console.warn('Unable to store imported mount voltages', voltStoreError);
          }
          if (typeof applyMountVoltagePreferences === 'function') {
            applyMountVoltagePreferences(rawVoltages, {
              persist: false,
              triggerUpdate: true
            });
          }
        } else if (typeof rawVoltages === 'string') {
          safeSetLocalStorage(mountVoltageKeyName, rawVoltages);
          if (typeof parseStoredMountVoltages === 'function') {
            try {
              var parsedVoltages = parseStoredMountVoltages(rawVoltages);
              if (parsedVoltages && typeof applyMountVoltagePreferences === 'function') {
                applyMountVoltagePreferences(parsedVoltages, {
                  persist: false,
                  triggerUpdate: true
                });
              }
            } catch (voltParseError) {
              console.warn('Unable to parse imported mount voltages', voltParseError);
            }
          }
        } else if (rawVoltages === null) {
          safeSetLocalStorage(mountVoltageKeyName, null);
          if (typeof resetMountVoltagePreferences === 'function') {
            resetMountVoltagePreferences({
              persist: false,
              triggerUpdate: true
            });
          }
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
    }
    if (allData.projects) {
      importProjectCollection(allData.projects, ensureProjectImporter);
    } else if (!allData.project && typeof allData.gearList === "string") {
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
    getMountVoltageStorageKeyName: getMountVoltageStorageKeyName,
    getMountVoltageStorageBackupKeyName: getMountVoltageStorageBackupKeyName,
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
    clearUiCacheStorageEntries: clearUiCacheStorageEntries,
    ensureCriticalStorageBackups: ensureCriticalStorageBackups,
    getLastCriticalStorageGuardResult: getLastCriticalStorageGuardResult,
    decodeStoredValue: decodeStoredValue
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
      Object.defineProperty(GLOBAL_SCOPE, '__cineStorageApi', {
        configurable: true,
        writable: true,
        value: STORAGE_API
      });
    } catch (storageApiExposeError) {
      GLOBAL_SCOPE.__cineStorageApi = STORAGE_API;
      void storageApiExposeError;
    }
  }
})();