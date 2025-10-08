function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
  var FALLBACK_SCOPE = detectGlobalScope();
  function loadModuleEnvironment(scope) {
    if (typeof require === 'function') {
      try {
        return require('./environment.js');
      } catch (error) {
        void error;
      }
    }
    var candidates = [scope];
    if (typeof globalThis !== 'undefined' && candidates.indexOf(globalThis) === -1) candidates.push(globalThis);
    if (typeof window !== 'undefined' && candidates.indexOf(window) === -1) candidates.push(window);
    if (typeof self !== 'undefined' && candidates.indexOf(self) === -1) candidates.push(self);
    if (typeof global !== 'undefined' && candidates.indexOf(global) === -1) candidates.push(global);
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && _typeof(candidate.cineModuleEnvironment) === 'object') {
        return candidate.cineModuleEnvironment;
      }
    }
    return null;
  }
  function loadEnvironmentBridge(scope) {
    if (typeof require === 'function') {
      try {
        return require('./environment-bridge.js');
      } catch (error) {
        void error;
      }
    }
    var candidates = [scope];
    if (typeof globalThis !== 'undefined' && candidates.indexOf(globalThis) === -1) candidates.push(globalThis);
    if (typeof window !== 'undefined' && candidates.indexOf(window) === -1) candidates.push(window);
    if (typeof self !== 'undefined' && candidates.indexOf(self) === -1) candidates.push(self);
    if (typeof global !== 'undefined' && candidates.indexOf(global) === -1) candidates.push(global);
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && _typeof(candidate.cineEnvironmentBridge) === 'object') {
        return candidate.cineEnvironmentBridge;
      }
    }
    return null;
  }
  var MODULE_ENV = loadModuleEnvironment(FALLBACK_SCOPE);
  var ENV_BRIDGE = loadEnvironmentBridge(FALLBACK_SCOPE);
  var GLOBAL_SCOPE = (ENV_BRIDGE && typeof ENV_BRIDGE.getGlobalScope === 'function' ? ENV_BRIDGE.getGlobalScope() : null) || (MODULE_ENV && typeof MODULE_ENV.getGlobalScope === 'function' ? MODULE_ENV.getGlobalScope() : null) || FALLBACK_SCOPE;
  var MODULE_GLOBALS = function resolveModuleGlobals() {
    if (typeof require === 'function') {
      try {
        var required = require('./globals.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    var candidates = [GLOBAL_SCOPE];
    if (typeof globalThis !== 'undefined' && candidates.indexOf(globalThis) === -1) candidates.push(globalThis);
    if (typeof window !== 'undefined' && candidates.indexOf(window) === -1) candidates.push(window);
    if (typeof self !== 'undefined' && candidates.indexOf(self) === -1) candidates.push(self);
    if (typeof global !== 'undefined' && candidates.indexOf(global) === -1) candidates.push(global);
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && _typeof(candidate.cineModuleGlobals) === 'object') {
        return candidate.cineModuleGlobals;
      }
    }
    return null;
  }();
  function informModuleGlobals(name, api) {
    if (!MODULE_GLOBALS || typeof MODULE_GLOBALS.recordModule !== 'function') {
      return;
    }
    try {
      MODULE_GLOBALS.recordModule(name, api);
    } catch (error) {
      void error;
    }
  }
  function fallbackTryRequire(modulePath) {
    if (typeof require !== 'function') {
      return null;
    }
    try {
      return require(modulePath);
    } catch (error) {
      void error;
      return null;
    }
  }
  var tryRequire = function resolveTryRequire() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.tryRequire === 'function') {
      return MODULE_GLOBALS.tryRequire;
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.tryRequire === 'function') {
      return function bridgeTryRequire(modulePath) {
        var result = ENV_BRIDGE.tryRequire(modulePath);
        return typeof result === 'undefined' ? fallbackTryRequire(modulePath) : result;
      };
    }
    if (MODULE_ENV && typeof MODULE_ENV.tryRequire === 'function') {
      return MODULE_ENV.tryRequire;
    }
    return fallbackTryRequire;
  }();
  function resolveModuleRegistry(scope) {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.resolveModuleRegistry === 'function') {
      try {
        var resolved = MODULE_GLOBALS.resolveModuleRegistry(scope || GLOBAL_SCOPE);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.getModuleRegistry === 'function') {
      try {
        var bridged = ENV_BRIDGE.getModuleRegistry(scope || GLOBAL_SCOPE);
        if (bridged) {
          return bridged;
        }
      } catch (error) {
        void error;
      }
    }
    if (MODULE_ENV && typeof MODULE_ENV.resolveModuleRegistry === 'function') {
      try {
        return MODULE_ENV.resolveModuleRegistry(scope || GLOBAL_SCOPE);
      } catch (error) {
        void error;
      }
    }
    var required = tryRequire('./registry.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var scopes = [scope || GLOBAL_SCOPE];
    if (typeof globalThis !== 'undefined' && scopes.indexOf(globalThis) === -1) scopes.push(globalThis);
    if (typeof window !== 'undefined' && scopes.indexOf(window) === -1) scopes.push(window);
    if (typeof self !== 'undefined' && scopes.indexOf(self) === -1) scopes.push(self);
    if (typeof global !== 'undefined' && scopes.indexOf(global) === -1) scopes.push(global);
    for (var index = 0; index < scopes.length; index += 1) {
      var candidate = scopes[index];
      if (candidate && _typeof(candidate.cineModules) === 'object') {
        return candidate.cineModules;
      }
    }
    return null;
  }
  var MODULE_REGISTRY = function () {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.getModuleRegistry === 'function') {
      try {
        var shared = MODULE_GLOBALS.getModuleRegistry(GLOBAL_SCOPE);
        if (shared) {
          return shared;
        }
      } catch (error) {
        void error;
      }
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.getModuleRegistry === 'function') {
      try {
        var bridged = ENV_BRIDGE.getModuleRegistry(GLOBAL_SCOPE);
        if (bridged) {
          return bridged;
        }
      } catch (error) {
        void error;
      }
    }
    if (MODULE_ENV && typeof MODULE_ENV.getModuleRegistry === 'function') {
      try {
        var provided = MODULE_ENV.getModuleRegistry(GLOBAL_SCOPE);
        if (provided) {
          return provided;
        }
      } catch (error) {
        void error;
      }
    }
    return resolveModuleRegistry();
  }();
  var PENDING_QUEUE_KEY = function resolvePendingKey() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.getPendingQueueKey === 'function') {
      try {
        var sharedKey = MODULE_GLOBALS.getPendingQueueKey();
        if (typeof sharedKey === 'string' && sharedKey) {
          return sharedKey;
        }
      } catch (error) {
        void error;
      }
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.getPendingQueueKey === 'function') {
      try {
        var bridgedKey = ENV_BRIDGE.getPendingQueueKey();
        if (typeof bridgedKey === 'string' && bridgedKey) {
          return bridgedKey;
        }
      } catch (error) {
        void error;
      }
    }
    if (MODULE_ENV && typeof MODULE_ENV.PENDING_QUEUE_KEY === 'string') {
      return MODULE_ENV.PENDING_QUEUE_KEY;
    }
    return '__cinePendingModuleRegistrations__';
  }();
  function cloneOptions(options) {
    if (!options || _typeof(options) !== 'object') {
      return {};
    }
    var copy = {};
    var keys = Object.keys(options);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      copy[key] = options[key];
    }
    return copy;
  }
  function fallbackQueueModuleRegistration(name, api, options) {
    if (!GLOBAL_SCOPE || _typeof(GLOBAL_SCOPE) !== 'object') {
      return false;
    }
    var payload = Object.freeze({
      name: name,
      api: api,
      options: Object.freeze(cloneOptions(options))
    });
    var queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
    if (!Array.isArray(queue)) {
      try {
        Object.defineProperty(GLOBAL_SCOPE, PENDING_QUEUE_KEY, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: []
        });
        queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
      } catch (error) {
        void error;
        try {
          if (!Array.isArray(GLOBAL_SCOPE[PENDING_QUEUE_KEY])) {
            GLOBAL_SCOPE[PENDING_QUEUE_KEY] = [];
          }
          queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
        } catch (assignmentError) {
          void assignmentError;
          return false;
        }
      }
    }
    try {
      queue.push(payload);
    } catch (error) {
      void error;
      queue[queue.length] = payload;
    }
    return true;
  }
  function queueModuleRegistration(name, api, options) {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.queueModuleRegistration === 'function') {
      try {
        if (MODULE_GLOBALS.queueModuleRegistration(name, api, options, GLOBAL_SCOPE)) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.queueModuleRegistration === 'function') {
      try {
        var bridged = ENV_BRIDGE.queueModuleRegistration(name, api, options);
        if (bridged) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }
    if (MODULE_ENV && typeof MODULE_ENV.queueModuleRegistration === 'function') {
      return MODULE_ENV.queueModuleRegistration(name, api, options, GLOBAL_SCOPE);
    }
    return fallbackQueueModuleRegistration(name, api, options);
  }
  function fallbackRegisterOrQueue(name, api, options, onError) {
    if (MODULE_REGISTRY && typeof MODULE_REGISTRY.register === 'function') {
      try {
        MODULE_REGISTRY.register(name, api, options);
        return true;
      } catch (error) {
        if (typeof onError === 'function') {
          try {
            onError(error);
          } catch (callbackError) {
            void callbackError;
          }
        } else {
          void error;
        }
      }
    }
    queueModuleRegistration(name, api, options);
    return false;
  }
  var registerOrQueueModule = function resolveRegisterOrQueue() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.registerOrQueueModule === 'function') {
      return function registerOrQueueModule(name, api, options, onError) {
        try {
          var registered = MODULE_GLOBALS.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, MODULE_REGISTRY);
          if (registered) {
            return true;
          }
        } catch (error) {
          void error;
        }
        return fallbackRegisterOrQueue(name, api, options, onError);
      };
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.registerOrQueueModule === 'function') {
      return function registerOrQueueModule(name, api, options, onError) {
        try {
          var bridged = ENV_BRIDGE.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, MODULE_REGISTRY);
          if (bridged) {
            return true;
          }
        } catch (error) {
          void error;
        }
        return fallbackRegisterOrQueue(name, api, options, onError);
      };
    }
    if (MODULE_ENV && typeof MODULE_ENV.registerOrQueueModule === 'function') {
      return function registerOrQueueModule(name, api, options, onError) {
        return MODULE_ENV.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, MODULE_REGISTRY);
      };
    }
    return fallbackRegisterOrQueue;
  }();
  function shouldBypassDeepFreeze(value) {
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
      return false;
    }
    try {
      if (typeof value.pipe === 'function' && typeof value.unpipe === 'function') {
        return true;
      }
      if (typeof value.on === 'function' && typeof value.emit === 'function') {
        if (typeof value.write === 'function' || typeof value.read === 'function') {
          return true;
        }
        var ctorName = value.constructor && value.constructor.name;
        if (ctorName && /Stream|Emitter|Port/i.test(ctorName)) {
          return true;
        }
      }
      if (typeof Symbol !== 'undefined' && value[Symbol.toStringTag]) {
        var tag = value[Symbol.toStringTag];
        if (typeof tag === 'string' && /Stream|Port/i.test(tag)) {
          return true;
        }
      }
    } catch (inspectionError) {
      void inspectionError;
    }
    return false;
  }
  function fallbackFreezeDeep(value) {
    var seen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakSet();
    if (!value || _typeof(value) !== 'object') {
      return value;
    }
    if (shouldBypassDeepFreeze(value)) {
      return value;
    }
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
    var keys = Object.getOwnPropertyNames(value);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      var child = void 0;
      try {
        child = value[key];
      } catch (accessError) {
        void accessError;
        child = undefined;
      }
      if (!child || _typeof(child) !== 'object' && typeof child !== 'function') {
        continue;
      }
      fallbackFreezeDeep(child, seen);
    }
    try {
      return Object.freeze(value);
    } catch (freezeError) {
      void freezeError;
      return value;
    }
  }
  var freezeDeep = function resolveFreezeDeep() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.freezeDeep === 'function') {
      return MODULE_GLOBALS.freezeDeep;
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.freezeDeep === 'function') {
      return function bridgeFreezeDeep(value, seen) {
        try {
          return ENV_BRIDGE.freezeDeep(value, seen);
        } catch (error) {
          void error;
          return fallbackFreezeDeep(value, seen);
        }
      };
    }
    if (MODULE_ENV && typeof MODULE_ENV.freezeDeep === 'function') {
      return MODULE_ENV.freezeDeep;
    }
    return fallbackFreezeDeep;
  }();
  function fallbackSafeWarn(message, detail) {
    if (typeof console === 'undefined' || typeof console.warn !== 'function') {
      return;
    }
    try {
      if (typeof detail === 'undefined') {
        console.warn(message);
      } else {
        console.warn(message, detail);
      }
    } catch (error) {
      void error;
    }
  }
  var safeWarn = function resolveSafeWarn() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.safeWarn === 'function') {
      return MODULE_GLOBALS.safeWarn;
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.safeWarn === 'function') {
      return function bridgeSafeWarn(message, detail) {
        try {
          ENV_BRIDGE.safeWarn(message, detail);
        } catch (error) {
          void error;
          fallbackSafeWarn(message, detail);
        }
      };
    }
    if (MODULE_ENV && typeof MODULE_ENV.safeWarn === 'function') {
      return MODULE_ENV.safeWarn;
    }
    return fallbackSafeWarn;
  }();
  function fallbackExposeGlobal(name, value) {
    if (!GLOBAL_SCOPE || _typeof(GLOBAL_SCOPE) !== 'object') {
      return false;
    }
    try {
      Object.defineProperty(GLOBAL_SCOPE, name, {
        configurable: true,
        enumerable: false,
        value: value,
        writable: false
      });
      return true;
    } catch (error) {
      void error;
      try {
        GLOBAL_SCOPE[name] = value;
        return true;
      } catch (assignmentError) {
        void assignmentError;
        return false;
      }
    }
  }
  var exposeGlobal = function resolveExposeGlobal() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.exposeGlobal === 'function') {
      return function moduleGlobalsExpose(name, value, options) {
        try {
          return MODULE_GLOBALS.exposeGlobal(name, value, options);
        } catch (error) {
          void error;
          return fallbackExposeGlobal(name, value);
        }
      };
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.exposeGlobal === 'function') {
      return function bridgeExposeGlobal(name, value, options) {
        try {
          return ENV_BRIDGE.exposeGlobal(name, value, options);
        } catch (error) {
          void error;
          return fallbackExposeGlobal(name, value);
        }
      };
    }
    if (MODULE_ENV && typeof MODULE_ENV.exposeGlobal === 'function') {
      return function exposeGlobal(name, value, options) {
        return MODULE_ENV.exposeGlobal(name, value, GLOBAL_SCOPE, options);
      };
    }
    return fallbackExposeGlobal;
  }();
  var UI_CACHE_STORAGE_KEYS_FOR_RELOAD = ['cameraPowerPlanner_schemaCache', 'cinePowerPlanner_schemaCache'];
  var UI_CACHE_STORAGE_SUFFIXES_FOR_RELOAD = ['', '__backup', '__legacyMigrationBackup'];
  var uiCacheFallbackWarningKeys = new Set();
  var pendingServiceWorkerRegistration = null;
  function resolveGlobal(name) {
    if (!GLOBAL_SCOPE || _typeof(GLOBAL_SCOPE) !== 'object' && typeof GLOBAL_SCOPE !== 'function') {
      return undefined;
    }
    try {
      return GLOBAL_SCOPE[name];
    } catch (error) {
      void error;
      return undefined;
    }
  }
  function resolveWindow(explicitWindow) {
    if (explicitWindow) {
      return explicitWindow;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    return resolveGlobal('window');
  }
  function resolveNavigator(explicitNavigator) {
    if (explicitNavigator) {
      return explicitNavigator;
    }
    if (typeof navigator !== 'undefined') {
      return navigator;
    }
    var win = resolveWindow();
    if (win && typeof win.navigator !== 'undefined') {
      return win.navigator;
    }
    return resolveGlobal('navigator');
  }
  function resolveCaches(explicitCaches) {
    if (explicitCaches) {
      return explicitCaches;
    }
    if (typeof caches !== 'undefined') {
      return caches;
    }
    var win = resolveWindow();
    if (win && typeof win.caches !== 'undefined') {
      return win.caches;
    }
    return resolveGlobal('caches');
  }
  function registerFallbackStorage(storages, candidate, label) {
    void label;
    if (!candidate || _typeof(candidate) !== 'object' && typeof candidate !== 'function') {
      return;
    }
    var hasRemove = typeof candidate.removeItem === 'function';
    var hasDelete = typeof candidate.delete === 'function';
    if (!hasRemove && !hasDelete) {
      return;
    }
    storages.add(candidate);
  }
  function inspectScopeForStorages(storages, scope, label) {
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return;
    }
    try {
      registerFallbackStorage(storages, scope.SAFE_LOCAL_STORAGE, "".concat(label, ".SAFE_LOCAL_STORAGE"));
    } catch (error) {
      var key = "".concat(label, ".SAFE_LOCAL_STORAGE");
      if (!uiCacheFallbackWarningKeys.has(key)) {
        uiCacheFallbackWarningKeys.add(key);
        safeWarn("Unable to inspect ".concat(key, " while clearing UI caches"), error);
      }
    }
    try {
      registerFallbackStorage(storages, scope.localStorage, "".concat(label, ".localStorage"));
    } catch (error) {
      var _key = "".concat(label, ".localStorage");
      if (!uiCacheFallbackWarningKeys.has(_key)) {
        uiCacheFallbackWarningKeys.add(_key);
        safeWarn("Unable to inspect ".concat(_key, " while clearing UI caches"), error);
      }
    }
    try {
      registerFallbackStorage(storages, scope.sessionStorage, "".concat(label, ".sessionStorage"));
    } catch (error) {
      var _key2 = "".concat(label, ".sessionStorage");
      if (!uiCacheFallbackWarningKeys.has(_key2)) {
        uiCacheFallbackWarningKeys.add(_key2);
        safeWarn("Unable to inspect ".concat(_key2, " while clearing UI caches"), error);
      }
    }
    var nested = null;
    try {
      nested = scope.__cineGlobal;
    } catch (error) {
      var _key3 = "".concat(label, ".__cineGlobal");
      if (!uiCacheFallbackWarningKeys.has(_key3)) {
        uiCacheFallbackWarningKeys.add(_key3);
        safeWarn("Unable to inspect ".concat(_key3, " while clearing UI caches"), error);
      }
    }
    if (nested && nested !== scope) {
      inspectScopeForStorages(storages, nested, "".concat(label, ".__cineGlobal"));
    }
  }
  function collectFallbackUiCacheStorages() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var storages = new Set();
    var resolveSafeLocalStorageFn = typeof options.resolveSafeLocalStorage === 'function' ? options.resolveSafeLocalStorage : typeof resolveGlobal('resolveSafeLocalStorage') === 'function' ? resolveGlobal('resolveSafeLocalStorage') : null;
    var safeLocalStorageInstance = options.safeLocalStorage || resolveGlobal('SAFE_LOCAL_STORAGE');
    try {
      var resolved = resolveSafeLocalStorageFn ? resolveSafeLocalStorageFn() : null;
      registerFallbackStorage(storages, resolved, 'safeLocalStorage');
    } catch (error) {
      safeWarn('resolveSafeLocalStorage() failed while collecting UI cache storages', error);
    }
    if (safeLocalStorageInstance) {
      try {
        registerFallbackStorage(storages, safeLocalStorageInstance, 'SAFE_LOCAL_STORAGE');
      } catch (error) {
        var key = 'SAFE_LOCAL_STORAGE';
        if (!uiCacheFallbackWarningKeys.has(key)) {
          uiCacheFallbackWarningKeys.add(key);
          safeWarn('Unable to inspect SAFE_LOCAL_STORAGE while clearing UI caches', error);
        }
      }
    }
    var candidates = options.scopeCandidates || [{
      scope: resolveGlobal('globalThis'),
      label: 'globalThis'
    }, {
      scope: resolveWindow(options.window),
      label: 'window'
    }, {
      scope: typeof self !== 'undefined' ? self : resolveGlobal('self'),
      label: 'self'
    }, {
      scope: resolveGlobal('global'),
      label: 'global'
    }];
    var cineGlobal = typeof GLOBAL_SCOPE !== 'undefined' ? GLOBAL_SCOPE.__cineGlobal : undefined;
    if (typeof cineGlobal !== 'undefined') {
      candidates.push({
        scope: cineGlobal,
        label: '__cineGlobal'
      });
    }
    candidates.forEach(function (_ref) {
      var scope = _ref.scope,
        label = _ref.label;
      inspectScopeForStorages(storages, scope, label);
    });
    var win = resolveWindow(options.window);
    if (win) {
      try {
        registerFallbackStorage(storages, win.localStorage, 'window.localStorage');
      } catch (error) {
        var _key4 = 'window.localStorage';
        if (!uiCacheFallbackWarningKeys.has(_key4)) {
          uiCacheFallbackWarningKeys.add(_key4);
          safeWarn('Unable to inspect window.localStorage while clearing UI caches', error);
        }
      }
      try {
        registerFallbackStorage(storages, win.sessionStorage, 'window.sessionStorage');
      } catch (error) {
        var _key5 = 'window.sessionStorage';
        if (!uiCacheFallbackWarningKeys.has(_key5)) {
          uiCacheFallbackWarningKeys.add(_key5);
          safeWarn('Unable to inspect window.sessionStorage while clearing UI caches', error);
        }
      }
    }
    return storages;
  }
  function clearUiCacheEntriesFallback() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var storages = options.storages || collectFallbackUiCacheStorages(options);
    if (!storages || !storages.size) {
      return false;
    }
    var clearedAny = false;
    storages.forEach(function (storage) {
      UI_CACHE_STORAGE_KEYS_FOR_RELOAD.forEach(function (baseKey) {
        if (typeof baseKey !== 'string' || !baseKey) {
          return;
        }
        UI_CACHE_STORAGE_SUFFIXES_FOR_RELOAD.forEach(function (suffix) {
          var entryKey = suffix ? "".concat(baseKey).concat(suffix) : baseKey;
          try {
            if (typeof storage.removeItem === 'function') {
              storage.removeItem(entryKey);
              clearedAny = true;
            } else if (typeof storage.delete === 'function') {
              storage.delete(entryKey);
              clearedAny = true;
            }
          } catch (error) {
            safeWarn('Failed to remove UI cache entry', {
              entryKey: entryKey,
              error: error
            });
          }
        });
      });
    });
    return clearedAny;
  }
  function unregisterServiceWorkers(_x) {
    return _unregisterServiceWorkers.apply(this, arguments);
  }
  function _unregisterServiceWorkers() {
    _unregisterServiceWorkers = _asyncToGenerator(_regenerator().m(function _callee(navigatorOverride) {
      var nav, registrations, serviceWorker, regs, reg, readyReg, _t, _t2;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            nav = resolveNavigator(navigatorOverride);
            if (!(!nav || !nav.serviceWorker)) {
              _context.n = 1;
              break;
            }
            return _context.a(2, false);
          case 1:
            registrations = [];
            serviceWorker = nav.serviceWorker;
            _context.p = 2;
            if (!(typeof serviceWorker.getRegistrations === 'function')) {
              _context.n = 4;
              break;
            }
            _context.n = 3;
            return serviceWorker.getRegistrations();
          case 3:
            regs = _context.v;
            if (Array.isArray(regs)) {
              regs.forEach(function (reg) {
                if (reg) {
                  registrations.push(reg);
                }
              });
            }
            _context.n = 10;
            break;
          case 4:
            if (!(typeof serviceWorker.getRegistration === 'function')) {
              _context.n = 6;
              break;
            }
            _context.n = 5;
            return serviceWorker.getRegistration();
          case 5:
            reg = _context.v;
            if (reg) {
              registrations.push(reg);
            }
            _context.n = 10;
            break;
          case 6:
            if (!(serviceWorker.ready && typeof serviceWorker.ready.then === 'function')) {
              _context.n = 10;
              break;
            }
            _context.p = 7;
            _context.n = 8;
            return serviceWorker.ready;
          case 8:
            readyReg = _context.v;
            if (readyReg) {
              registrations.push(readyReg);
            }
            _context.n = 10;
            break;
          case 9:
            _context.p = 9;
            _t = _context.v;
            safeWarn('Failed to await active service worker', _t);
          case 10:
            _context.n = 12;
            break;
          case 11:
            _context.p = 11;
            _t2 = _context.v;
            safeWarn('Failed to query service worker registrations', _t2);
          case 12:
            if (registrations.length) {
              _context.n = 13;
              break;
            }
            return _context.a(2, false);
          case 13:
            _context.n = 14;
            return Promise.all(registrations.map(function (registration) {
              if (!registration || typeof registration.unregister !== 'function') {
                return Promise.resolve(false);
              }
              return registration.unregister().catch(function (error) {
                safeWarn('Service worker unregister failed', error);
                return false;
              });
            }));
          case 14:
            return _context.a(2, true);
        }
      }, _callee, null, [[7, 9], [2, 11]]);
    }));
    return _unregisterServiceWorkers.apply(this, arguments);
  }
  function clearCacheStorage(_x2) {
    return _clearCacheStorage.apply(this, arguments);
  }
  function _clearCacheStorage() {
    _clearCacheStorage = _asyncToGenerator(_regenerator().m(function _callee2(cachesOverride) {
      var cachesInstance, keys, _t3;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            cachesInstance = resolveCaches(cachesOverride);
            if (!(!cachesInstance || typeof cachesInstance.keys !== 'function')) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2, false);
          case 1:
            _context2.p = 1;
            _context2.n = 2;
            return cachesInstance.keys();
          case 2:
            keys = _context2.v;
            if (!(!Array.isArray(keys) || !keys.length)) {
              _context2.n = 3;
              break;
            }
            return _context2.a(2, false);
          case 3:
            _context2.n = 4;
            return Promise.all(keys.map(function (key) {
              if (!key || typeof cachesInstance.delete !== 'function') {
                return Promise.resolve(false);
              }
              return cachesInstance.delete(key).catch(function (error) {
                safeWarn('Failed to delete cache', {
                  key: key,
                  error: error
                });
                return false;
              });
            }));
          case 4:
            return _context2.a(2, true);
          case 5:
            _context2.p = 5;
            _t3 = _context2.v;
            safeWarn('Cache clear failed', _t3);
            return _context2.a(2, false);
        }
      }, _callee2, null, [[1, 5]]);
    }));
    return _clearCacheStorage.apply(this, arguments);
  }
  function readLocationHrefSafe(locationLike) {
    if (!locationLike || _typeof(locationLike) !== 'object') {
      return '';
    }
    try {
      var href = locationLike.href;
      return typeof href === 'string' ? href : '';
    } catch (error) {
      void error;
      return '';
    }
  }
  function normaliseHrefForComparison(value, baseHref) {
    if (typeof value !== 'string') {
      return '';
    }
    var trimmed = value.trim();
    if (!trimmed) {
      return '';
    }
    if (typeof URL === 'function') {
      try {
        return new URL(trimmed).toString();
      } catch (primaryError) {
        void primaryError;
        if (typeof baseHref === 'string' && baseHref) {
          try {
            return new URL(trimmed, baseHref).toString();
          } catch (secondaryError) {
            void secondaryError;
          }
        }
      }
    }
    return trimmed;
  }
  function buildForceReloadUrl(locationLike, paramName) {
    var param = typeof paramName === 'string' && paramName ? paramName : 'forceReload';
    var timestamp = Date.now().toString(36);
    var originalHref = readLocationHrefSafe(locationLike);
    if (!originalHref) {
      return {
        originalHref: originalHref,
        nextHref: originalHref,
        param: param,
        timestamp: timestamp
      };
    }
    if (typeof URL === 'function') {
      try {
        var url = new URL(originalHref);
        url.searchParams.set(param, timestamp);
        return {
          originalHref: originalHref,
          nextHref: url.toString(),
          param: param,
          timestamp: timestamp
        };
      } catch (urlError) {
        void urlError;
        try {
          var derived = new URL(originalHref, originalHref);
          derived.searchParams.set(param, timestamp);
          return {
            originalHref: originalHref,
            nextHref: derived.toString(),
            param: param,
            timestamp: timestamp
          };
        } catch (fallbackError) {
          void fallbackError;
        }
      }
    }
    var href = originalHref;
    var hash = '';
    var hashIndex = href.indexOf('#');
    if (hashIndex !== -1) {
      hash = href.slice(hashIndex);
      href = href.slice(0, hashIndex);
    }
    var pattern = new RegExp("([?&])".concat(param, "=[^&]*"));
    var replacement = "$1".concat(param, "=").concat(timestamp);
    if (pattern.test(href)) {
      href = href.replace(pattern, replacement);
    } else if (href.indexOf('?') !== -1) {
      href += "&".concat(param, "=").concat(timestamp);
    } else if (href) {
      href += "?".concat(param, "=").concat(timestamp);
    }
    return {
      originalHref: originalHref,
      nextHref: href ? href + hash : originalHref,
      param: param,
      timestamp: timestamp
    };
  }
  function attemptForceReloadNavigation(locationLike, nextHref, baseHref, applyFn, description) {
    if (!locationLike || typeof applyFn !== 'function' || typeof nextHref !== 'string' || !nextHref) {
      return false;
    }
    var beforeRaw = readLocationHrefSafe(locationLike);
    var before = normaliseHrefForComparison(beforeRaw, baseHref);
    try {
      applyFn(nextHref);
    } catch (error) {
      safeWarn('Forced reload navigation helper failed', {
        description: description,
        error: error
      });
      return false;
    }
    var afterRaw = readLocationHrefSafe(locationLike);
    var after = normaliseHrefForComparison(afterRaw, baseHref);
    var expected = normaliseHrefForComparison(nextHref, baseHref);
    if (expected && (after === expected || after === "".concat(expected, "#")) || before !== after && after && (!expected || after === expected)) {
      return true;
    }
    safeWarn('Forced reload navigation attempt did not update location', {
      description: description,
      before: before,
      after: after,
      expected: expected
    });
    return false;
  }
  function triggerReload(windowOverride) {
    var win = resolveWindow(windowOverride);
    if (!win || !win.location) {
      return false;
    }
    var location = win.location;
    var hasReplace = location && typeof location.replace === 'function';
    var hasAssign = location && typeof location.assign === 'function';
    var hasReload = location && typeof location.reload === 'function';
    var navigationTriggered = false;
    var forceReloadUrl = buildForceReloadUrl(location, 'forceReload');
    var nextHref = forceReloadUrl.nextHref;
    var originalHref = forceReloadUrl.originalHref;
    var baseHref = normaliseHrefForComparison(originalHref, originalHref) || originalHref;
    if (hasReplace && nextHref) {
      navigationTriggered = attemptForceReloadNavigation(location, nextHref, baseHref, function (url) {
        location.replace(url);
      }, 'location.replace');
    }
    if (hasAssign && !navigationTriggered && nextHref) {
      navigationTriggered = attemptForceReloadNavigation(location, nextHref, baseHref, function (url) {
        location.assign(url);
      }, 'location.assign');
    }
    if (!navigationTriggered && nextHref && nextHref !== originalHref) {
      navigationTriggered = attemptForceReloadNavigation(location, nextHref, baseHref, function (url) {
        location.href = url;
      }, 'location.href assignment');
    }
    if (!navigationTriggered && hasReload) {
      try {
        location.reload();
        navigationTriggered = true;
      } catch (reloadError) {
        safeWarn('Forced reload via location.reload failed', reloadError);
      }
    }
    if (hasReload) {
      try {
        var schedule = typeof win.setTimeout === 'function' ? win.setTimeout : setTimeout;
        if (typeof schedule === 'function') {
          schedule(function () {
            try {
              location.reload();
            } catch (delayedError) {
              safeWarn('Final timed reload attempt failed', delayedError);
            }
          }, 300);
        }
      } catch (timerError) {
        safeWarn('Failed to schedule timed reload fallback', timerError);
      }
    }
    return navigationTriggered;
  }
  function reloadApp() {
    return _reloadApp.apply(this, arguments);
  }
  function _reloadApp() {
    _reloadApp = _asyncToGenerator(_regenerator().m(function _callee5() {
      var options,
        uiCacheCleared,
        clearUiCacheStorageEntriesFn,
        _yield$Promise$all,
        _yield$Promise$all2,
        serviceWorkersUnregistered,
        cachesCleared,
        reloadTriggered,
        reloadFn,
        win,
        _args5 = arguments;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            options = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
            uiCacheCleared = false;
            clearUiCacheStorageEntriesFn = typeof options.clearUiCacheStorageEntries === 'function' ? options.clearUiCacheStorageEntries : typeof resolveGlobal('clearUiCacheStorageEntries') === 'function' ? resolveGlobal('clearUiCacheStorageEntries') : null;
            if (clearUiCacheStorageEntriesFn) {
              try {
                clearUiCacheStorageEntriesFn();
                uiCacheCleared = true;
              } catch (error) {
                safeWarn('Failed to clear UI caches via storage helper', error);
              }
            }
            if (!uiCacheCleared) {
              try {
                uiCacheCleared = clearUiCacheEntriesFallback(options);
              } catch (fallbackError) {
                safeWarn('Fallback UI cache clear failed', fallbackError);
              }
            }
            _context5.n = 1;
            return Promise.all([_asyncToGenerator(_regenerator().m(function _callee3() {
              var _t4;
              return _regenerator().w(function (_context3) {
                while (1) switch (_context3.p = _context3.n) {
                  case 0:
                    _context3.p = 0;
                    _context3.n = 1;
                    return unregisterServiceWorkers(options.navigator);
                  case 1:
                    return _context3.a(2, _context3.v);
                  case 2:
                    _context3.p = 2;
                    _t4 = _context3.v;
                    safeWarn('Service worker cleanup failed', _t4);
                    return _context3.a(2, false);
                }
              }, _callee3, null, [[0, 2]]);
            }))(), _asyncToGenerator(_regenerator().m(function _callee4() {
              var _t5;
              return _regenerator().w(function (_context4) {
                while (1) switch (_context4.p = _context4.n) {
                  case 0:
                    _context4.p = 0;
                    _context4.n = 1;
                    return clearCacheStorage(options.caches);
                  case 1:
                    return _context4.a(2, _context4.v);
                  case 2:
                    _context4.p = 2;
                    _t5 = _context4.v;
                    safeWarn('Cache clear failed', _t5);
                    return _context4.a(2, false);
                }
              }, _callee4, null, [[0, 2]]);
            }))()]);
          case 1:
            _yield$Promise$all = _context5.v;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            serviceWorkersUnregistered = _yield$Promise$all2[0];
            cachesCleared = _yield$Promise$all2[1];
            reloadTriggered = false;
            reloadFn = typeof options.reloadWindow === 'function' ? options.reloadWindow : triggerReload;
            try {
              reloadTriggered = reloadFn(options.window);
            } catch (error) {
              safeWarn('Forced reload handler failed', error);
              reloadTriggered = triggerReload(options.window);
            }
            if (!reloadTriggered) {
              win = resolveWindow(options.window);
              if (win && win.location && typeof win.location.reload === 'function') {
                try {
                  win.location.reload();
                  reloadTriggered = true;
                } catch (finalError) {
                  safeWarn('Final reload attempt failed', finalError);
                }
              }
            }
            return _context5.a(2, {
              uiCacheCleared: uiCacheCleared,
              serviceWorkersUnregistered: serviceWorkersUnregistered,
              cachesCleared: cachesCleared,
              reloadTriggered: reloadTriggered,
              navigationTriggered: reloadTriggered
            });
        }
      }, _callee5);
    }));
    return _reloadApp.apply(this, arguments);
  }
  function shouldRegisterImmediately(win) {
    if (!win || !win.document) {
      return false;
    }
    var document = win.document;
    if (typeof document.readyState === 'string') {
      return document.readyState === 'complete';
    }
    return false;
  }
  function registerServiceWorker() {
    var scriptUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'service-worker.js';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var win = resolveWindow(options.window);
    var nav = resolveNavigator(options.navigator);
    if (!nav || !nav.serviceWorker || typeof nav.serviceWorker.register !== 'function') {
      return Promise.resolve(null);
    }
    var register = function register() {
      try {
        var promise = nav.serviceWorker.register(scriptUrl, options.registrationOptions);
        promise.catch(function (error) {
          safeWarn('Service worker registration failed', error);
        });
        return promise;
      } catch (error) {
        safeWarn('Service worker registration threw an exception', error);
        return Promise.reject(error);
      }
    };
    var finalizePendingRegistration = function finalizePendingRegistration(promise) {
      var tracked = Promise.resolve(promise).finally(function () {
        pendingServiceWorkerRegistration = null;
      });
      pendingServiceWorkerRegistration = tracked;
      return tracked;
    };
    if (!win || typeof win.addEventListener !== 'function') {
      return register();
    }
    if (pendingServiceWorkerRegistration) {
      return pendingServiceWorkerRegistration;
    }
    if (shouldRegisterImmediately(win) || options.immediate === true) {
      return finalizePendingRegistration(Promise.resolve().then(function () {
        return register();
      }));
    }
    var waitForLoad = new Promise(function (resolve, reject) {
      var _handler = function handler() {
        try {
          win.removeEventListener('load', _handler);
        } catch (error) {
          void error;
        }
        try {
          resolve(register());
        } catch (error) {
          reject(error);
        }
      };
      win.addEventListener('load', _handler, {
        once: true
      });
    });
    return finalizePendingRegistration(waitForLoad);
  }
  var offlineAPI = {
    registerServiceWorker: registerServiceWorker,
    reloadApp: reloadApp,
    __internal: {
      collectFallbackUiCacheStorages: collectFallbackUiCacheStorages,
      clearUiCacheEntriesFallback: clearUiCacheEntriesFallback,
      unregisterServiceWorkers: unregisterServiceWorkers,
      clearCacheStorage: clearCacheStorage,
      triggerReload: triggerReload
    }
  };
  freezeDeep(offlineAPI);
  informModuleGlobals('cineOffline', offlineAPI);
  registerOrQueueModule('cineOffline', offlineAPI, {
    category: 'offline',
    description: 'Offline helpers for service worker registration and cache recovery.',
    replace: true,
    connections: ['cineModuleGlobals', 'cineModuleEnvironment', 'cineEnvironmentBridge', 'cineModuleContext']
  }, function (error) {
    safeWarn('Unable to register cineOffline in module registry.', error);
  });
  if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
    var existingOffline = null;
    try {
      existingOffline = GLOBAL_SCOPE.cineOffline || null;
    } catch (error) {
      void error;
      existingOffline = null;
    }
    if (existingOffline !== offlineAPI) {
      var exposed = exposeGlobal('cineOffline', offlineAPI, {
        configurable: true,
        enumerable: false,
        writable: false
      });
      if (!exposed) {
        safeWarn('Unable to expose cineOffline globally.');
      }
    }
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = offlineAPI;
  }
})();