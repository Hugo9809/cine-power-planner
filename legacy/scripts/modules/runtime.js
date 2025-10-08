function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function fallbackDetectGlobalScope() {
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
  function fallbackCollectCandidateScopes(primary) {
    var scopes = [];
    function pushScope(scope) {
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
        return;
      }
      if (scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }
    pushScope(primary);
    if (typeof globalThis !== 'undefined') pushScope(globalThis);
    if (typeof window !== 'undefined') pushScope(window);
    if (typeof self !== 'undefined') pushScope(self);
    if (typeof global !== 'undefined') pushScope(global);
    return scopes;
  }
  function fallbackLoadModuleEnvironment(scope) {
    if (typeof require === 'function') {
      try {
        return require('./environment.js');
      } catch (error) {
        void error;
      }
    }
    var candidates = fallbackCollectCandidateScopes(scope);
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && _typeof(candidate.cineModuleEnvironment) === 'object') {
        return candidate.cineModuleEnvironment;
      }
    }
    return null;
  }
  function fallbackLoadEnvironmentBridge(scope) {
    if (typeof require === 'function') {
      try {
        return require('./environment-bridge.js');
      } catch (error) {
        void error;
      }
    }
    var candidates = fallbackCollectCandidateScopes(scope);
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && _typeof(candidate.cineEnvironmentBridge) === 'object') {
        return candidate.cineEnvironmentBridge;
      }
    }
    return null;
  }
  function fallbackResolveModuleGlobals(scope) {
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
    var candidates = fallbackCollectCandidateScopes(scope);
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && _typeof(candidate.cineModuleGlobals) === 'object') {
        return candidate.cineModuleGlobals;
      }
    }
    return null;
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
  var LOCAL_SCOPE = fallbackDetectGlobalScope();
  function resolveModuleSystem(scope) {
    var targetScope = scope || LOCAL_SCOPE;
    if (typeof require === 'function') {
      try {
        var required = require('./system.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    if (targetScope && _typeof(targetScope.cineModuleSystem) === 'object') {
      return targetScope.cineModuleSystem;
    }
    return null;
  }
  var MODULE_SYSTEM = resolveModuleSystem(LOCAL_SCOPE);
  function resolveEnvironmentContext(scope) {
    var targetScope = scope || LOCAL_SCOPE;
    if (typeof require === 'function') {
      try {
        var required = require('./environment-context.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    if (targetScope && _typeof(targetScope.cineModuleEnvironmentContext) === 'object') {
      return targetScope.cineModuleEnvironmentContext;
    }
    return null;
  }
  var ENVIRONMENT_CONTEXT = resolveEnvironmentContext(LOCAL_SCOPE);
  function detectWithContext() {
    if (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.detectGlobalScope === 'function') {
      try {
        var detected = ENVIRONMENT_CONTEXT.detectGlobalScope();
        if (detected) {
          return detected;
        }
      } catch (error) {
        void error;
      }
    }
    return fallbackDetectGlobalScope();
  }
  var detectGlobalScope = MODULE_SYSTEM && typeof MODULE_SYSTEM.detectGlobalScope === 'function' ? function detectWithSystem() {
    try {
      var detected = MODULE_SYSTEM.detectGlobalScope();
      if (detected) {
        return detected;
      }
    } catch (error) {
      void error;
    }
    return detectWithContext();
  } : detectWithContext;
  var PRIMARY_SCOPE = (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.getPrimaryScope === 'function' ? ENVIRONMENT_CONTEXT.getPrimaryScope() : null) || detectGlobalScope();
  var GLOBAL_SCOPE = function resolveGlobalScope() {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.getGlobalScope === 'function') {
      try {
        var resolved = MODULE_SYSTEM.getGlobalScope(PRIMARY_SCOPE);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }
    if (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.getGlobalScope === 'function') {
      try {
        var scoped = ENVIRONMENT_CONTEXT.getGlobalScope(PRIMARY_SCOPE);
        if (scoped) {
          return scoped;
        }
      } catch (error) {
        void error;
      }
    }
    return PRIMARY_SCOPE;
  }();
  function collectCandidateScopes(scope) {
    var targetScope = scope || GLOBAL_SCOPE;
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.collectCandidateScopes === 'function') {
      try {
        var scopes = MODULE_SYSTEM.collectCandidateScopes(targetScope);
        if (Array.isArray(scopes) && scopes.length > 0) {
          return scopes;
        }
      } catch (error) {
        void error;
      }
    }
    if (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.collectCandidateScopes === 'function') {
      try {
        var fromContext = ENVIRONMENT_CONTEXT.collectCandidateScopes(targetScope);
        if (Array.isArray(fromContext) && fromContext.length > 0) {
          return fromContext;
        }
      } catch (error) {
        void error;
      }
    }
    return fallbackCollectCandidateScopes(targetScope);
  }
  var MODULE_ENV = (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveModuleEnvironment === 'function' ? ENVIRONMENT_CONTEXT.resolveModuleEnvironment(GLOBAL_SCOPE) : null) || fallbackLoadModuleEnvironment(GLOBAL_SCOPE);
  var ENV_BRIDGE = (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveEnvironmentBridge === 'function' ? ENVIRONMENT_CONTEXT.resolveEnvironmentBridge(GLOBAL_SCOPE) : null) || fallbackLoadEnvironmentBridge(GLOBAL_SCOPE);
  var MODULE_GLOBALS = (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveModuleGlobals === 'function' ? ENVIRONMENT_CONTEXT.resolveModuleGlobals(GLOBAL_SCOPE) : null) || fallbackResolveModuleGlobals(GLOBAL_SCOPE);
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
  var tryRequire = function resolveTryRequire() {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.tryRequire === 'function') {
      return function tryRequireWithSystem(modulePath) {
        var result = MODULE_SYSTEM.tryRequire(modulePath);
        return typeof result === 'undefined' ? fallbackTryRequire(modulePath) : result;
      };
    }
    if (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.tryRequire === 'function') {
      return function tryRequireThroughContext(modulePath) {
        var result = ENVIRONMENT_CONTEXT.tryRequire(modulePath);
        return typeof result === 'undefined' ? fallbackTryRequire(modulePath) : result;
      };
    }
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
  function fallbackResolveModuleRegistry(scope) {
    var targetScope = scope || GLOBAL_SCOPE;
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.resolveModuleRegistry === 'function') {
      try {
        var resolved = MODULE_GLOBALS.resolveModuleRegistry(targetScope);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.getModuleRegistry === 'function') {
      try {
        var bridged = ENV_BRIDGE.getModuleRegistry(targetScope);
        if (bridged) {
          return bridged;
        }
      } catch (error) {
        void error;
      }
    }
    if (MODULE_ENV && typeof MODULE_ENV.resolveModuleRegistry === 'function') {
      try {
        return MODULE_ENV.resolveModuleRegistry(targetScope);
      } catch (error) {
        void error;
      }
    }
    var required = tryRequire('./registry.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var scopes = collectCandidateScopes(targetScope);
    for (var index = 0; index < scopes.length; index += 1) {
      var candidate = scopes[index];
      if (candidate && _typeof(candidate.cineModules) === 'object') {
        return candidate.cineModules;
      }
    }
    return null;
  }
  function resolveModuleRegistry(scope) {
    var targetScope = scope || GLOBAL_SCOPE;
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.getModuleRegistry === 'function') {
      try {
        var resolved = MODULE_SYSTEM.getModuleRegistry(targetScope);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }
    if (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveModuleRegistry === 'function') {
      try {
        var _resolved = ENVIRONMENT_CONTEXT.resolveModuleRegistry(targetScope);
        if (_resolved) {
          return _resolved;
        }
      } catch (error) {
        void error;
      }
    }
    return fallbackResolveModuleRegistry(targetScope);
  }
  var MODULE_REGISTRY = function () {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.getModuleRegistry === 'function') {
      try {
        var viaSystem = MODULE_SYSTEM.getModuleRegistry(GLOBAL_SCOPE);
        if (viaSystem) {
          return viaSystem;
        }
      } catch (error) {
        void error;
      }
    }
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
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.getPendingQueueKey === 'function') {
      try {
        var systemKey = MODULE_SYSTEM.getPendingQueueKey();
        if (typeof systemKey === 'string' && systemKey) {
          return systemKey;
        }
      } catch (error) {
        void error;
      }
    }
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
  function queueModuleRegistration(name, api, options) {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.queueModuleRegistration === 'function') {
      try {
        if (MODULE_SYSTEM.queueModuleRegistration(name, api, options, GLOBAL_SCOPE)) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }
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
  function attemptRegistryRegistration(name, api, options) {
    if (!MODULE_REGISTRY || typeof MODULE_REGISTRY.register !== 'function') {
      return {
        ok: false,
        error: null,
        reason: 'missing-registry'
      };
    }
    var moduleName = typeof name === 'string' ? name : '';
    if (!moduleName) {
      return {
        ok: false,
        error: new TypeError('cineRuntime expected a module name.'),
        reason: 'invalid-name'
      };
    }
    if (typeof MODULE_REGISTRY.has === 'function') {
      try {
        if (MODULE_REGISTRY.has(moduleName)) {
          if (typeof MODULE_REGISTRY.get === 'function') {
            try {
              var existing = MODULE_REGISTRY.get(moduleName);
              if (existing) {
                informModuleGlobals(moduleName, existing);
              }
            } catch (getError) {
              void getError;
            }
          }
          return {
            ok: true,
            alreadyRegistered: true
          };
        }
      } catch (hasError) {
        return {
          ok: false,
          error: hasError,
          reason: 'registry-check-failed'
        };
      }
    }
    try {
      var registered = MODULE_REGISTRY.register(moduleName, api, options);
      informModuleGlobals(moduleName, registered || api);
      return {
        ok: true,
        registered: true
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
        reason: 'register-failed'
      };
    }
  }
  function fallbackRegisterOrQueue(name, api, options, onError) {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.registerModule === 'function') {
      var registered = MODULE_SYSTEM.registerModule(name, api, options, GLOBAL_SCOPE, onError);
      if (registered) {
        informModuleGlobals(name, api);
        return true;
      }
      return false;
    }
    var lastError = null;
    var directAttempt = attemptRegistryRegistration(name, api, options);
    if (directAttempt.ok) {
      return true;
    }
    lastError = directAttempt.error || null;
    var syncResult = synchronizeModuleLinks({
      warn: false
    });
    if (syncResult && (syncResult.flushed && syncResult.flushed.processed > 0 || syncResult.ok)) {
      var retryAttempt = attemptRegistryRegistration(name, api, options);
      if (retryAttempt.ok) {
        return true;
      }
      if (retryAttempt.error) {
        lastError = retryAttempt.error;
      }
    }
    if (lastError) {
      if (typeof onError === 'function') {
        try {
          onError(lastError);
        } catch (callbackError) {
          void callbackError;
        }
      } else {
        void lastError;
      }
    }
    queueModuleRegistration(name, api, options);
    return false;
  }
  var registerOrQueueModule = function resolveRegisterOrQueue() {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.registerModule === 'function') {
      return function registerWithSystem(name, api, options, onError) {
        var registered = MODULE_SYSTEM.registerModule(name, api, options, GLOBAL_SCOPE, onError);
        if (registered) {
          informModuleGlobals(name, api);
          return true;
        }
        return false;
      };
    }
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
      if (typeof module !== 'undefined' && module && typeof module.constructor === 'function' && value instanceof module.constructor) {
        return true;
      }
    } catch (moduleCheckError) {
      void moduleCheckError;
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
    var keys = [];
    try {
      keys = Object.getOwnPropertyNames(value);
    } catch (inspectionError) {
      void inspectionError;
      if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
        try {
          keys = Reflect.ownKeys(value).filter(function filterStringKeys(key) {
            return typeof key === 'string';
          });
        } catch (reflectError) {
          void reflectError;
          keys = [];
        }
      }
    }
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      if (key === 'web3' && value === GLOBAL_SCOPE) {
        continue;
      }
      var hasOwn = true;
      try {
        hasOwn = Object.prototype.hasOwnProperty.call(value, key);
      } catch (hasOwnError) {
        void hasOwnError;
        hasOwn = true;
      }
      if (!hasOwn) {
        continue;
      }
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
      try {
        fallbackFreezeDeep(child, seen);
      } catch (childError) {
        void childError;
      }
    }
    try {
      return Object.freeze(value);
    } catch (freezeError) {
      void freezeError;
      return value;
    }
  }
  var freezeDeep = function resolveFreezeDeep() {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.freezeDeep === 'function') {
      return MODULE_SYSTEM.freezeDeep;
    }
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
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.safeWarn === 'function') {
      return MODULE_SYSTEM.safeWarn;
    }
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
  function ensureRegistryBinding(scope, registry) {
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return {
        ok: false,
        reason: 'invalid-scope'
      };
    }
    var targetRegistry = registry || MODULE_REGISTRY;
    if (!targetRegistry) {
      return {
        ok: false,
        reason: 'missing-registry'
      };
    }
    try {
      var existing = scope.cineModules;
      if (existing === targetRegistry) {
        return {
          ok: true,
          already: true
        };
      }
      Object.defineProperty(scope, 'cineModules', {
        configurable: true,
        enumerable: false,
        value: targetRegistry,
        writable: false
      });
      return {
        ok: true,
        updated: true
      };
    } catch (defineError) {
      void defineError;
      try {
        scope.cineModules = targetRegistry;
        if (scope.cineModules === targetRegistry) {
          return {
            ok: true,
            updated: true
          };
        }
      } catch (assignmentError) {
        void assignmentError;
        return {
          ok: false,
          reason: 'expose-failed',
          error: assignmentError || defineError
        };
      }
    }
    return {
      ok: true,
      updated: true
    };
  }
  function getPendingQueueFromScope(scope, queueKey) {
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return null;
    }
    try {
      var queue = scope[queueKey];
      return Array.isArray(queue) ? queue : null;
    } catch (error) {
      void error;
      return null;
    }
  }
  function requeuePendingEntry(queue, entry) {
    if (!Array.isArray(queue)) {
      return;
    }
    try {
      queue.push(entry);
    } catch (error) {
      void error;
      queue[queue.length] = entry;
    }
  }
  function flushPendingModuleQueues() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var registry = options.registry || MODULE_REGISTRY;
    var queueKey = typeof options.queueKey === 'string' && options.queueKey ? options.queueKey : PENDING_QUEUE_KEY;
    if (!registry || typeof registry.register !== 'function') {
      return freezeDeep({
        ok: false,
        processed: 0,
        requeued: 0,
        scopes: 0,
        queueKey: queueKey,
        failures: freezeDeep([{
          reason: 'missing-registry'
        }])
      });
    }
    var scopes = Array.isArray(options.scopes) && options.scopes.length > 0 ? options.scopes.slice() : collectCandidateScopes(options.scope || GLOBAL_SCOPE);
    var processed = 0;
    var requeued = 0;
    var touchedScopes = 0;
    var failures = [];
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      var queue = getPendingQueueFromScope(scope, queueKey);
      if (!queue || queue.length === 0) {
        continue;
      }
      touchedScopes += 1;
      var pending = queue.slice();
      queue.length = 0;
      for (var entryIndex = 0; entryIndex < pending.length; entryIndex += 1) {
        var entry = pending[entryIndex];
        if (!entry || _typeof(entry) !== 'object') {
          continue;
        }
        var name = typeof entry.name === 'string' ? entry.name : '';
        if (!name) {
          continue;
        }
        var api = entry.api;
        var entryOptions = cloneOptions(entry.options);
        if (typeof registry.has === 'function') {
          var alreadyRegistered = false;
          try {
            alreadyRegistered = registry.has(name);
          } catch (hasError) {
            failures.push({
              name: name,
              message: hasError && typeof hasError.message === 'string' ? hasError.message : null,
              reason: 'has-check-failed',
              scopeIndex: index
            });
          }
          if (alreadyRegistered) {
            processed += 1;
            continue;
          }
        }
        try {
          var registered = registry.register(name, api, entryOptions);
          informModuleGlobals(name, registered || api);
          processed += 1;
        } catch (error) {
          requeued += 1;
          requeuePendingEntry(queue, entry);
          failures.push({
            name: name,
            message: error && typeof error.message === 'string' ? error.message : null,
            reason: 'register-failed',
            scopeIndex: index
          });
        }
      }
    }
    if (failures.length > 0 && options.warn) {
      safeWarn('cineRuntime.flushPendingModuleQueues() encountered issues while replaying module registrations.', failures);
    }
    return freezeDeep({
      ok: failures.length === 0,
      processed: processed,
      requeued: requeued,
      scopes: touchedScopes,
      queueKey: queueKey,
      failures: failures.length > 0 ? freezeDeep(failures) : freezeDeep([])
    });
  }
  function synchronizeModuleLinks() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var registry = options.registry || MODULE_REGISTRY;
    var queueKey = typeof options.queueKey === 'string' && options.queueKey ? options.queueKey : PENDING_QUEUE_KEY;
    var scopes = Array.isArray(options.scopes) && options.scopes.length > 0 ? options.scopes.slice() : collectCandidateScopes(options.scope || GLOBAL_SCOPE);
    var exposureDetails = [];
    var exposureFailures = [];
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      var exposure = ensureRegistryBinding(scope, registry);
      exposureDetails.push({
        scopeIndex: index,
        ok: !!exposure.ok,
        updated: !!exposure.updated,
        already: !!exposure.already,
        reason: typeof exposure.reason === 'string' ? exposure.reason : null
      });
      if (!exposure.ok && exposure.reason !== 'missing-registry') {
        exposureFailures.push({
          scopeIndex: index,
          reason: exposure.reason || 'expose-failed',
          message: exposure.error && typeof exposure.error.message === 'string' ? exposure.error.message : null
        });
      }
    }
    if (exposureFailures.length > 0 && options.warn !== false) {
      safeWarn('cineRuntime.synchronizeModuleLinks() could not expose cineModules on every scope.', exposureFailures);
    }
    var flushResult = flushPendingModuleQueues({
      registry: registry,
      queueKey: queueKey,
      scopes: scopes,
      warn: options.warn !== false
    });
    var combinedFailures = [];
    if (Array.isArray(flushResult.failures)) {
      for (var _index = 0; _index < flushResult.failures.length; _index += 1) {
        combinedFailures.push(flushResult.failures[_index]);
      }
    }
    if (exposureFailures.length > 0) {
      for (var _index2 = 0; _index2 < exposureFailures.length; _index2 += 1) {
        combinedFailures.push(exposureFailures[_index2]);
      }
    }
    var result = {
      ok: flushResult.ok && exposureFailures.length === 0,
      queueKey: queueKey,
      exposures: exposureDetails,
      flushed: flushResult,
      failures: combinedFailures
    };
    return freezeDeep(result);
  }
  var INITIAL_MODULE_LINK_STATE = synchronizeModuleLinks({
    warn: false
  });
  function _inspectModuleConnections() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var registry = options.registry || MODULE_REGISTRY;
    if (!registry || typeof registry.list !== 'function' || typeof registry.describe !== 'function') {
      return freezeDeep({
        ok: false,
        reason: 'missing-registry',
        modules: [],
        missingConnections: [],
        errors: []
      });
    }
    var names;
    try {
      names = registry.list();
    } catch (error) {
      return freezeDeep({
        ok: false,
        reason: 'list-failed',
        modules: [],
        missingConnections: [],
        errors: freezeDeep([{
          type: 'list',
          message: error && typeof error.message === 'string' ? error.message : null
        }])
      });
    }
    var moduleNames = Array.isArray(names) ? names.slice() : [];
    var modules = [];
    var missingConnections = [];
    var errors = [];
    var hasConnection = typeof registry.has === 'function' ? function hasViaRegistry(name) {
      try {
        return registry.has(name);
      } catch (error) {
        errors.push({
          type: 'has',
          module: name,
          message: error && typeof error.message === 'string' ? error.message : null
        });
        return moduleNames.indexOf(name) !== -1;
      }
    } : function hasViaList(name) {
      return moduleNames.indexOf(name) !== -1;
    };
    for (var index = 0; index < moduleNames.length; index += 1) {
      var name = moduleNames[index];
      var meta = null;
      try {
        meta = registry.describe(name);
      } catch (error) {
        errors.push({
          type: 'describe',
          module: name,
          message: error && typeof error.message === 'string' ? error.message : null
        });
      }
      var connectionSet = new Set();
      var connectionList = [];
      var missingList = [];
      if (meta && meta.connections && typeof meta.connections[Symbol.iterator] === 'function') {
        var _iterator = _createForOfIteratorHelper(meta.connections),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var connection = _step.value;
            if (typeof connection !== 'string') {
              continue;
            }
            var trimmed = connection.trim();
            if (!trimmed || connectionSet.has(trimmed)) {
              continue;
            }
            connectionSet.add(trimmed);
            connectionList.push(trimmed);
            if (!hasConnection(trimmed)) {
              missingList.push(trimmed);
              missingConnections.push({
                from: name,
                to: trimmed
              });
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      modules.push(freezeDeep({
        name: name,
        connections: connectionList,
        missing: missingList,
        ok: missingList.length === 0
      }));
    }
    return freezeDeep({
      ok: missingConnections.length === 0,
      modules: modules,
      missingConnections: missingConnections,
      errors: errors
    });
  }
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
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.exposeGlobal === 'function') {
      return function exposeWithSystem(name, value, options) {
        try {
          return MODULE_SYSTEM.exposeGlobal(name, value, GLOBAL_SCOPE, options);
        } catch (error) {
          void error;
          return fallbackExposeGlobal(name, value);
        }
      };
    }
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
  var MODULE_NAMES = ['cinePersistence', 'cineOffline', 'cineUi'];
  var REQUIRED_PERSISTENCE_FUNCTIONS = ['storage.loadDeviceData', 'storage.saveDeviceData', 'storage.loadSetups', 'storage.saveSetups', 'storage.saveSetup', 'storage.loadSetup', 'storage.deleteSetup', 'storage.renameSetup', 'storage.loadSessionState', 'storage.saveSessionState', 'storage.saveProject', 'storage.loadProject', 'storage.deleteProject', 'storage.exportAllData', 'storage.importAllData', 'storage.clearAllData', 'storage.loadFavorites', 'storage.saveFavorites', 'storage.loadFeedback', 'storage.saveFeedback', 'storage.loadAutoGearRules', 'storage.saveAutoGearRules', 'storage.loadAutoGearBackups', 'storage.saveAutoGearBackups', 'storage.loadAutoGearSeedFlag', 'storage.saveAutoGearSeedFlag', 'storage.loadAutoGearBackupRetention', 'storage.saveAutoGearBackupRetention', 'storage.getAutoGearBackupRetentionDefault', 'storage.loadAutoGearPresets', 'storage.saveAutoGearPresets', 'storage.loadAutoGearActivePresetId', 'storage.saveAutoGearActivePresetId', 'storage.loadAutoGearAutoPresetId', 'storage.saveAutoGearAutoPresetId', 'storage.loadAutoGearMonitorDefaults', 'storage.saveAutoGearMonitorDefaults', 'storage.loadAutoGearBackupVisibility', 'storage.saveAutoGearBackupVisibility', 'storage.loadFullBackupHistory', 'storage.saveFullBackupHistory', 'storage.recordFullBackupHistoryEntry', 'storage.requestPersistentStorage', 'storage.clearUiCacheStorageEntries', 'storage.ensureCriticalStorageBackups', 'storage.getLastCriticalStorageGuardResult', 'autosave.saveSession', 'autosave.autoSaveSetup', 'autosave.saveGearList', 'autosave.restoreSessionState', 'backups.collectFullBackupData', 'backups.createSettingsBackup', 'backups.captureStorageSnapshot', 'backups.sanitizeBackupPayload', 'backups.autoBackup', 'backups.formatFullBackupFilename', 'backups.downloadPayload', 'backups.recordFullBackupHistoryEntry', 'restore.proceed', 'restore.abort', 'share.downloadProject', 'share.encodeSharedSetup', 'share.decodeSharedSetup', 'share.applySharedSetup', 'share.applySharedSetupFromUrl'];
  var REQUIRED_OFFLINE_FUNCTIONS = ['registerServiceWorker', 'reloadApp'];
  var REQUIRED_UI_CONTROLLERS = [{
    name: 'deviceManagerSection',
    actions: ['show', 'hide', 'toggle']
  }, {
    name: 'shareDialog',
    actions: ['open', 'submit', 'cancel', 'dismiss']
  }, {
    name: 'sharedImportDialog',
    actions: ['submit', 'cancel', 'dismiss', 'changeMode']
  }, {
    name: 'backupSettings',
    actions: ['execute']
  }, {
    name: 'restoreSettings',
    actions: ['openPicker', 'processFile']
  }];
  var REQUIRED_UI_INTERACTIONS = ['saveSetup', 'deleteSetup', 'shareOpen', 'shareSubmit', 'shareCancel', 'shareApplyFile', 'shareInputChange', 'sharedImportSubmit', 'sharedImportCancel', 'performBackup', 'openRestorePicker', 'applyRestoreFile'];
  var REQUIRED_UI_HELP_ENTRIES = ['saveSetup', 'autoBackupBeforeDeletion', 'shareProject', 'sharedImport', 'backupSettings', 'restoreSettings'];
  function resolveModule(name) {
    if (!name || !MODULE_NAMES.includes(name)) {
      throw new TypeError("cineRuntime cannot resolve unknown module \"".concat(name, "\"."));
    }
    if (MODULE_REGISTRY && typeof MODULE_REGISTRY.get === 'function') {
      try {
        var registered = MODULE_REGISTRY.get(name);
        if (registered) {
          return registered;
        }
      } catch (error) {
        void error;
      }
    }
    if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
      try {
        var existing = GLOBAL_SCOPE[name];
        if (existing) {
          return existing;
        }
      } catch (error) {
        void error;
      }
    }
    switch (name) {
      case 'cinePersistence':
        return tryRequire('./persistence.js');
      case 'cineOffline':
        return tryRequire('./offline.js');
      case 'cineUi':
        return tryRequire('./ui.js');
      default:
        return null;
    }
  }
  function ensureModule(name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var resolved = resolveModule(name);
    if (!resolved && options.optional) {
      return null;
    }
    if (!resolved) {
      throw new Error("cineRuntime could not locate ".concat(name, "."));
    }
    return resolved;
  }
  function parsePath(path) {
    if (Array.isArray(path)) {
      return path.slice();
    }
    if (typeof path === 'string' && path.trim()) {
      return path.split('.');
    }
    throw new TypeError('cineRuntime expected check paths to be strings or arrays.');
  }
  function inspectFunctionPath(root, path, missing, detailMap, prefix) {
    var segments = parsePath(path);
    var current = root;
    var traversed = prefix ? "".concat(prefix) : '';
    for (var index = 0; index < segments.length; index += 1) {
      var segment = segments[index];
      traversed = traversed ? "".concat(traversed, ".").concat(segment) : segment;
      if (!current || _typeof(current) !== 'object' && typeof current !== 'function') {
        missing.push(traversed);
        detailMap[traversed] = false;
        return;
      }
      current = current[segment];
    }
    var finalPath = prefix ? "".concat(prefix, ".").concat(segments.join('.')) : segments.join('.');
    var ok = typeof current === 'function';
    if (!ok) {
      missing.push(finalPath);
    }
    detailMap[finalPath] = ok;
  }
  function inspectPersistenceModule(persistenceModule, missing, detailMap) {
    if (!persistenceModule || _typeof(persistenceModule) !== 'object') {
      return;
    }
    for (var index = 0; index < REQUIRED_PERSISTENCE_FUNCTIONS.length; index += 1) {
      inspectFunctionPath(persistenceModule, REQUIRED_PERSISTENCE_FUNCTIONS[index], missing, detailMap, 'cinePersistence');
    }
    var internal = persistenceModule.__internal;
    var inspector = internal && typeof internal.inspectBinding === 'function' ? internal.inspectBinding.bind(internal) : null;
    if (!inspector) {
      var key = 'cinePersistence.__internal.inspectBinding';
      missing.push(key);
      detailMap[key] = false;
      return;
    }
    for (var _index3 = 0; _index3 < REQUIRED_PERSISTENCE_FUNCTIONS.length; _index3 += 1) {
      var path = REQUIRED_PERSISTENCE_FUNCTIONS[_index3];
      var segments = parsePath(path);
      var bindingName = segments[segments.length - 1];
      var bindingPath = "cinePersistence.bindings.".concat(bindingName);
      var detail = null;
      try {
        detail = inspector(bindingName, {
          refresh: true
        });
      } catch (error) {
        void error;
        detail = null;
      }
      var available = !!(detail && detail.available);
      if (!available) {
        missing.push(bindingPath);
      }
      detailMap[bindingPath] = available;
      if (detail) {
        detailMap["".concat(bindingPath, ".provider")] = detail.providerName || null;
      }
    }
  }
  function inspectOfflineFunctions(module, missing, detailMap) {
    for (var index = 0; index < REQUIRED_OFFLINE_FUNCTIONS.length; index += 1) {
      var name = REQUIRED_OFFLINE_FUNCTIONS[index];
      var fn = module ? module[name] : null;
      var path = "cineOffline.".concat(name);
      var ok = typeof fn === 'function';
      if (!ok) {
        missing.push(path);
      }
      detailMap[path] = ok;
    }
  }
  function inspectUiControllers(uiModule, missing, detailMap) {
    var controllers = uiModule && uiModule.controllers;
    var getter = controllers && typeof controllers.get === 'function' ? controllers.get.bind(controllers) : null;
    for (var index = 0; index < REQUIRED_UI_CONTROLLERS.length; index += 1) {
      var descriptor = REQUIRED_UI_CONTROLLERS[index];
      var pathPrefix = "cineUi.controllers.".concat(descriptor.name);
      if (!getter) {
        missing.push(pathPrefix);
        detailMap[pathPrefix] = false;
        continue;
      }
      var entry = null;
      try {
        entry = getter(descriptor.name);
      } catch (error) {
        void error;
        entry = null;
      }
      var entryOk = !!entry && _typeof(entry) === 'object';
      if (!entryOk) {
        missing.push(pathPrefix);
        detailMap[pathPrefix] = false;
        continue;
      }
      detailMap[pathPrefix] = true;
      for (var actionIndex = 0; actionIndex < descriptor.actions.length; actionIndex += 1) {
        var actionName = descriptor.actions[actionIndex];
        var actionPath = "".concat(pathPrefix, ".").concat(actionName);
        var action = entry[actionName];
        var actionOk = typeof action === 'function';
        if (!actionOk) {
          missing.push(actionPath);
        }
        detailMap[actionPath] = actionOk;
      }
    }
  }
  function inspectUiInteractions(uiModule, missing, detailMap) {
    var interactions = uiModule && uiModule.interactions;
    var getter = interactions && typeof interactions.get === 'function' ? interactions.get.bind(interactions) : null;
    for (var index = 0; index < REQUIRED_UI_INTERACTIONS.length; index += 1) {
      var name = REQUIRED_UI_INTERACTIONS[index];
      var path = "cineUi.interactions.".concat(name);
      if (!getter) {
        missing.push(path);
        detailMap[path] = false;
        continue;
      }
      var handler = null;
      try {
        handler = getter(name);
      } catch (error) {
        void error;
        handler = null;
      }
      var ok = typeof handler === 'function';
      if (!ok) {
        missing.push(path);
      }
      detailMap[path] = ok;
    }
  }
  function inspectUiHelp(uiModule, missing, detailMap) {
    var help = uiModule && uiModule.help;
    var resolver = help && typeof help.resolve === 'function' ? help.resolve.bind(help) : null;
    for (var index = 0; index < REQUIRED_UI_HELP_ENTRIES.length; index += 1) {
      var name = REQUIRED_UI_HELP_ENTRIES[index];
      var path = "cineUi.help.".concat(name);
      if (!resolver) {
        missing.push(path);
        detailMap[path] = false;
        continue;
      }
      var value = null;
      try {
        value = resolver(name);
      } catch (error) {
        void error;
        value = null;
      }
      var ok = typeof value === 'string' && !!value.trim();
      if (!ok) {
        missing.push(path);
      }
      detailMap[path] = ok;
    }
  }
  function listCriticalChecks() {
    return freezeDeep({
      cinePersistence: REQUIRED_PERSISTENCE_FUNCTIONS.slice(),
      cineOffline: REQUIRED_OFFLINE_FUNCTIONS.slice(),
      cineUi: {
        controllers: REQUIRED_UI_CONTROLLERS.map(function (entry) {
          return {
            name: entry.name,
            actions: entry.actions.slice()
          };
        }),
        interactions: REQUIRED_UI_INTERACTIONS.slice(),
        help: REQUIRED_UI_HELP_ENTRIES.slice()
      }
    });
  }
  function verifyCriticalFlows() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var synchronization = synchronizeModuleLinks({
      warn: options.warnOnFailure
    });
    var missing = [];
    var detailMap = {};
    if (synchronization && _typeof(synchronization) === 'object') {
      detailMap['synchronization.ok'] = !!synchronization.ok;
      if (Array.isArray(synchronization.failures) && synchronization.failures.length > 0) {
        detailMap['synchronization.failures'] = synchronization.failures;
      }
      if (!synchronization.ok) {
        missing.push('cineRuntime synchronization');
      }
    }
    var registrySnapshot = null;
    if (MODULE_REGISTRY && typeof MODULE_REGISTRY.assertRegistered === 'function') {
      try {
        registrySnapshot = MODULE_REGISTRY.assertRegistered(MODULE_NAMES);
      } catch (error) {
        safeWarn('cineRuntime.verifyCriticalFlows() could not inspect cineModules registry.', error);
      }
    }
    var persistence = resolveModule('cinePersistence');
    var offline = resolveModule('cineOffline');
    var ui = resolveModule('cineUi');
    var modulePresence = {
      cinePersistence: !!persistence,
      cineOffline: !!offline,
      cineUi: !!ui
    };
    if (registrySnapshot && registrySnapshot.detail) {
      var registryDetail = {};
      var detailKeys = Object.keys(registrySnapshot.detail);
      for (var index = 0; index < detailKeys.length; index += 1) {
        var key = detailKeys[index];
        var registered = !!registrySnapshot.detail[key];
        registryDetail[key] = registered;
        detailMap["".concat(key, ".registered")] = registered;
        if (!registered) {
          missing.push("".concat(key, " (not registered)"));
        }
      }
      modulePresence.registry = registryDetail;
    }
    if (!persistence) {
      missing.push('cinePersistence');
      detailMap.cinePersistence = false;
    } else {
      detailMap.cinePersistence = true;
      if (!Object.isFrozen(persistence)) {
        missing.push('cinePersistence (not frozen)');
        detailMap['cinePersistence.frozen'] = false;
      } else {
        detailMap['cinePersistence.frozen'] = true;
      }
      inspectPersistenceModule(persistence, missing, detailMap);
    }
    if (!offline) {
      missing.push('cineOffline');
      detailMap.cineOffline = false;
    } else {
      detailMap.cineOffline = true;
      if (!Object.isFrozen(offline)) {
        missing.push('cineOffline (not frozen)');
        detailMap['cineOffline.frozen'] = false;
      } else {
        detailMap['cineOffline.frozen'] = true;
      }
      inspectOfflineFunctions(offline, missing, detailMap);
    }
    if (!ui) {
      missing.push('cineUi');
      detailMap.cineUi = false;
    } else {
      detailMap.cineUi = true;
      if (!Object.isFrozen(ui)) {
        missing.push('cineUi (not frozen)');
        detailMap['cineUi.frozen'] = false;
      } else {
        detailMap['cineUi.frozen'] = true;
      }
      inspectUiControllers(ui, missing, detailMap);
      inspectUiInteractions(ui, missing, detailMap);
      inspectUiHelp(ui, missing, detailMap);
    }
    var ok = missing.length === 0;
    var result = freezeDeep({
      ok: ok,
      missing: missing.slice(),
      modules: freezeDeep(modulePresence),
      details: freezeDeep(detailMap),
      registry: registrySnapshot ? freezeDeep(registrySnapshot) : null,
      checks: listCriticalChecks(),
      synchronization: synchronization
    });
    if (!ok) {
      if (options.warnOnFailure) {
        safeWarn('cineRuntime.verifyCriticalFlows() detected missing safeguards.', missing);
      }
      if (options.throwOnFailure) {
        var error = new Error('cineRuntime integrity verification failed.');
        error.details = result;
        throw error;
      }
    }
    return result;
  }
  var runtimeAPI = freezeDeep({
    getPersistence: function getPersistence(options) {
      return ensureModule('cinePersistence', options);
    },
    getOffline: function getOffline(options) {
      return ensureModule('cineOffline', options);
    },
    getUi: function getUi(options) {
      return ensureModule('cineUi', options);
    },
    getModuleRegistry: function getModuleRegistry() {
      return MODULE_REGISTRY || null;
    },
    synchronizeModules: function synchronizeModules(options) {
      return synchronizeModuleLinks(options || {});
    },
    inspectModuleConnections: function inspectModuleConnections(options) {
      return _inspectModuleConnections(options || {});
    },
    listCriticalChecks: listCriticalChecks,
    verifyCriticalFlows: verifyCriticalFlows,
    __internal: freezeDeep({
      resolveModule: resolveModule,
      ensureModule: ensureModule,
      listCriticalChecks: listCriticalChecks,
      moduleRegistry: MODULE_REGISTRY || null,
      synchronizeModuleLinks: synchronizeModuleLinks,
      flushPendingModuleQueues: flushPendingModuleQueues,
      initialSynchronization: INITIAL_MODULE_LINK_STATE,
      inspectModuleConnections: _inspectModuleConnections
    })
  });
  informModuleGlobals('cineRuntime', runtimeAPI);
  registerOrQueueModule('cineRuntime', runtimeAPI, {
    category: 'runtime',
    description: 'Runtime orchestrator ensuring persistence, offline, and UI safeguards stay intact.',
    replace: true,
    connections: ['cinePersistence', 'cineOffline', 'cineUi', 'cineModuleGlobals', 'cineModuleContext']
  }, function (error) {
    safeWarn('Unable to register cineRuntime module.', error);
  });
  if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
    var existingRuntime = null;
    try {
      existingRuntime = GLOBAL_SCOPE.cineRuntime || null;
    } catch (error) {
      void error;
      existingRuntime = null;
    }
    if (existingRuntime !== runtimeAPI) {
      var exposed = exposeGlobal('cineRuntime', runtimeAPI, {
        configurable: true,
        enumerable: false,
        writable: false
      });
      if (!exposed) {
        safeWarn('Unable to expose cineRuntime globally.');
      }
    }
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    if (module.exports && module.exports !== runtimeAPI && _typeof(module.exports) === 'object' && Object.keys(module.exports).length > 0) {
      try {
        if (module.exports.cineRuntime !== runtimeAPI) {
          Object.defineProperty(module.exports, 'cineRuntime', {
            configurable: true,
            enumerable: false,
            value: runtimeAPI,
            writable: false
          });
        }
      } catch (attachmentError) {
        safeWarn('Unable to attach cineRuntime to existing module.exports.', attachmentError);
      }
    } else {
      module.exports = runtimeAPI;
    }
  }
})();