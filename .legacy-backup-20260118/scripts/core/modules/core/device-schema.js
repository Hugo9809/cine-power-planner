function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined' && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
      return globalThis;
    }
    if (typeof window !== 'undefined' && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
      return window;
    }
    if (typeof self !== 'undefined' && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
      return self;
    }
    if (typeof global !== 'undefined' && global && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
      return global;
    }
    return null;
  }
  var primaryCoreScope = typeof globalThis !== 'undefined' && globalThis && _typeof(globalThis.CORE_GLOBAL_SCOPE) === 'object' ? globalThis.CORE_GLOBAL_SCOPE : null;
  var CORE_SCOPE = primaryCoreScope && _typeof(primaryCoreScope) === 'object' ? primaryCoreScope : detectGlobalScope();
  var DEFAULT_DEVICE_SCHEMA_PATH = 'src/data/schema.json';
  var DEFAULT_DEVICE_SCHEMA_STORAGE_KEY = 'cameraPowerPlanner_schemaCache';
  var DEVICE_SCHEMA_PATH = CORE_SCOPE && _typeof(CORE_SCOPE) === 'object' && typeof CORE_SCOPE.DEVICE_SCHEMA_PATH === 'string' && CORE_SCOPE.DEVICE_SCHEMA_PATH ? CORE_SCOPE.DEVICE_SCHEMA_PATH : DEFAULT_DEVICE_SCHEMA_PATH;
  var DEVICE_SCHEMA_STORAGE_KEY = CORE_SCOPE && _typeof(CORE_SCOPE) === 'object' && typeof CORE_SCOPE.DEVICE_SCHEMA_STORAGE_KEY === 'string' && CORE_SCOPE.DEVICE_SCHEMA_STORAGE_KEY ? CORE_SCOPE.DEVICE_SCHEMA_STORAGE_KEY : DEFAULT_DEVICE_SCHEMA_STORAGE_KEY;
  var schemaStorage = function () {
    if (typeof window === 'undefined') return null;
    try {
      if (!('localStorage' in window)) return null;
      var _window = window,
        localStorage = _window.localStorage;
      var testKey = '__schema_cache__';
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
      return localStorage;
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Device schema cache disabled', error);
      }
      return null;
    }
  }();
  function loadCachedDeviceSchema() {
    if (!schemaStorage) return null;
    try {
      var raw = schemaStorage.getItem(DEVICE_SCHEMA_STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      return parsed && _typeof(parsed) === 'object' && !Array.isArray(parsed) ? parsed : null;
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Failed to read cached device schema', error);
      }
      try {
        schemaStorage.removeItem(DEVICE_SCHEMA_STORAGE_KEY);
      } catch (removeError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Failed to clear invalid cached device schema', removeError);
        }
      }
      return null;
    }
  }
  function persistDeviceSchema(schema) {
    if (!schemaStorage) return;
    try {
      schemaStorage.setItem(DEVICE_SCHEMA_STORAGE_KEY, JSON.stringify(schema));
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Failed to cache device schema', error);
      }
    }
  }
  function isValidDeviceSchema(candidate) {
    return !!candidate && _typeof(candidate) === 'object' && !Array.isArray(candidate);
  }
  function loadDeviceSchemaFromCacheStorage() {
    return _loadDeviceSchemaFromCacheStorage.apply(this, arguments);
  }
  function _loadDeviceSchemaFromCacheStorage() {
    _loadDeviceSchemaFromCacheStorage = _asyncToGenerator(_regenerator().m(function _callee() {
      var path,
        candidates,
        _iterator,
        _step,
        url,
        response,
        _args = arguments,
        _t,
        _t2;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            path = _args.length > 0 && _args[0] !== undefined ? _args[0] : DEVICE_SCHEMA_PATH;
            if (!(typeof caches === 'undefined' || !caches || typeof caches.match !== 'function')) {
              _context.n = 1;
              break;
            }
            return _context.a(2, null);
          case 1:
            candidates = new Set([path]);
            if (typeof path === 'string' && !path.startsWith('./')) {
              candidates.add("./".concat(path));
            }
            if (typeof window !== 'undefined' && window && window.location) {
              try {
                candidates.add(new URL(path, window.location.href).toString());
              } catch (error) {
                if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                  console.warn('Failed to resolve schema.json cache URL', error);
                }
              }
            }
            _iterator = _createForOfIteratorHelper(candidates);
            _context.p = 2;
            _iterator.s();
          case 3:
            if ((_step = _iterator.n()).done) {
              _context.n = 10;
              break;
            }
            url = _step.value;
            _context.p = 4;
            _context.n = 5;
            return caches.match(url, {
              ignoreSearch: true
            });
          case 5:
            response = _context.v;
            if (!response) {
              _context.n = 7;
              break;
            }
            _context.n = 6;
            return response.clone().json();
          case 6:
            return _context.a(2, _context.v);
          case 7:
            _context.n = 9;
            break;
          case 8:
            _context.p = 8;
            _t = _context.v;
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
              console.warn('Failed to read schema.json from cache entry', url, _t);
            }
          case 9:
            _context.n = 3;
            break;
          case 10:
            _context.n = 12;
            break;
          case 11:
            _context.p = 11;
            _t2 = _context.v;
            _iterator.e(_t2);
          case 12:
            _context.p = 12;
            _iterator.f();
            return _context.f(12);
          case 13:
            return _context.a(2, null);
        }
      }, _callee, null, [[4, 8], [2, 11, 12, 13]]);
    }));
    return _loadDeviceSchemaFromCacheStorage.apply(this, arguments);
  }
  function createPopulateScheduler(populateCategoryOptions) {
    return function schedulePopulateCategoryOptions() {
      var triggerPopulate = function triggerPopulate() {
        try {
          populateCategoryOptions();
        } catch (error) {
          if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error('populateCategoryOptions failed during scheduled execution', error);
          }
        }
      };
      if (typeof window !== 'undefined' && window && typeof window.setTimeout === 'function') {
        window.setTimeout(triggerPopulate, 0);
      } else if (typeof setTimeout === 'function') {
        setTimeout(triggerPopulate, 0);
      } else {
        triggerPopulate();
      }
    };
  }
  function createDeviceSchemaManager() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var onSchemaChange = options && typeof options.onSchemaChange === 'function' ? options.onSchemaChange : function () {};
    var populateCategoryOptions = options && typeof options.populateCategoryOptions === 'function' ? options.populateCategoryOptions : function () {
      var scope = detectGlobalScope();
      if (!scope) {
        return;
      }
      var populate = null;
      var preferredKey = options && typeof options.populateCategoryOptionsName === 'string' ? options.populateCategoryOptionsName : 'populateCategoryOptions';
      if (preferredKey && typeof scope[preferredKey] === 'function') {
        populate = scope[preferredKey];
      } else if (typeof scope.populateCategoryOptions === 'function') {
        populate = scope.populateCategoryOptions;
      }
      if (populate) {
        try {
          populate();
        } catch (error) {
          if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error('populateCategoryOptions execution failed', error);
          }
        }
      }
    };
    var cachedSchema = loadCachedDeviceSchema();
    var deviceSchema = cachedSchema && isValidDeviceSchema(cachedSchema) ? cachedSchema : null;
    onSchemaChange(deviceSchema);
    var schedulePopulateCategoryOptions = createPopulateScheduler(populateCategoryOptions);
    function setDeviceSchema(schema) {
      if (isValidDeviceSchema(schema)) {
        deviceSchema = schema;
        cachedSchema = schema;
      } else if (!deviceSchema) {
        deviceSchema = {};
      }
      onSchemaChange(deviceSchema);
      return deviceSchema;
    }
    function finalizeDeviceSchemaLoad(candidate) {
      if (isValidDeviceSchema(candidate)) {
        setDeviceSchema(candidate);
        persistDeviceSchema(candidate);
      } else if (!deviceSchema) {
        setDeviceSchema(cachedSchema || {});
      }
      schedulePopulateCategoryOptions();
    }
    return {
      DEVICE_SCHEMA_PATH: DEVICE_SCHEMA_PATH,
      DEVICE_SCHEMA_STORAGE_KEY: DEVICE_SCHEMA_STORAGE_KEY,
      loadCachedDeviceSchema: loadCachedDeviceSchema,
      persistDeviceSchema: persistDeviceSchema,
      isValidDeviceSchema: isValidDeviceSchema,
      loadDeviceSchemaFromCacheStorage: loadDeviceSchemaFromCacheStorage,
      schedulePopulateCategoryOptions: schedulePopulateCategoryOptions,
      finalizeDeviceSchemaLoad: finalizeDeviceSchemaLoad,
      getCachedDeviceSchema: function getCachedDeviceSchema() {
        return cachedSchema && isValidDeviceSchema(cachedSchema) ? cachedSchema : null;
      },
      getDeviceSchema: function getDeviceSchema() {
        return deviceSchema;
      },
      setDeviceSchema: setDeviceSchema
    };
  }
  var namespace = {
    DEVICE_SCHEMA_PATH: DEVICE_SCHEMA_PATH,
    DEVICE_SCHEMA_STORAGE_KEY: DEVICE_SCHEMA_STORAGE_KEY,
    loadCachedDeviceSchema: loadCachedDeviceSchema,
    persistDeviceSchema: persistDeviceSchema,
    isValidDeviceSchema: isValidDeviceSchema,
    loadDeviceSchemaFromCacheStorage: loadDeviceSchemaFromCacheStorage,
    createDeviceSchemaManager: createDeviceSchemaManager
  };
  var globalScope = detectGlobalScope();
  var targetName = 'cineCoreDeviceSchema';
  var aliasName = 'CORE_DEVICE_SCHEMA';
  var existingAlias = null;
  if (globalScope && (_typeof(globalScope) === 'object' || typeof globalScope === 'function')) {
    try {
      var candidate = globalScope[aliasName];
      if (candidate && _typeof(candidate) === 'object') {
        existingAlias = candidate;
      }
    } catch (readAliasError) {
      void readAliasError;
      existingAlias = null;
    }
  }
  var existing = existingAlias;
  if (!existing || _typeof(existing) !== 'object') {
    if (globalScope && (_typeof(globalScope) === 'object' || typeof globalScope === 'function')) {
      try {
        var _candidate = globalScope[targetName];
        if (_candidate && _typeof(_candidate) === 'object') {
          existing = _candidate;
        }
      } catch (readExistingError) {
        void readExistingError;
        existing = null;
      }
    }
  }
  if (!existing || _typeof(existing) !== 'object') {
    existing = {};
  }
  for (var _i = 0, _Object$keys = Object.keys(namespace); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    existing[key] = namespace[key];
  }
  if (globalScope && (_typeof(globalScope) === 'object' || typeof globalScope === 'function')) {
    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
    try {
      globalScope[aliasName] = existing;
    } catch (assignAliasError) {
      void assignAliasError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();