function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
  var LOCAL_SCOPE = fallbackDetectGlobalScope();
  function resolveArchitecture(scope) {
    var targetScope = scope || LOCAL_SCOPE;
    if (typeof require === 'function') {
      try {
        var required = require('./architecture.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    if (targetScope && _typeof(targetScope.cineModuleArchitecture) === 'object') {
      return targetScope.cineModuleArchitecture;
    }
    return null;
  }
  var ARCHITECTURE = resolveArchitecture(LOCAL_SCOPE);
  var detectGlobalScope = ARCHITECTURE && typeof ARCHITECTURE.detectGlobalScope === 'function' ? ARCHITECTURE.detectGlobalScope : fallbackDetectGlobalScope;
  var PRIMARY_SCOPE = detectGlobalScope();
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
  var collectCandidateScopes = ARCHITECTURE && typeof ARCHITECTURE.collectCandidateScopes === 'function' ? function (primary) {
    return ARCHITECTURE.collectCandidateScopes(primary || PRIMARY_SCOPE);
  } : function (primary) {
    return fallbackCollectCandidateScopes(primary || PRIMARY_SCOPE);
  };
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
  var baseTryRequire = ARCHITECTURE && typeof ARCHITECTURE.tryRequire === 'function' ? function (modulePath) {
    return ARCHITECTURE.tryRequire(modulePath);
  } : fallbackTryRequire;
  function baseResolveModuleRegistry(scope) {
    var required = baseTryRequire('./registry.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var scopes = collectCandidateScopes(scope || PRIMARY_SCOPE);
    for (var index = 0; index < scopes.length; index += 1) {
      var candidate = scopes[index];
      if (candidate && _typeof(candidate.cineModules) === 'object') {
        return candidate.cineModules;
      }
    }
    return null;
  }
  var cachedModuleRegistry = null;
  var hasResolvedRegistry = false;
  function getModuleRegistry(scope) {
    if (!hasResolvedRegistry || scope && scope !== PRIMARY_SCOPE) {
      var resolved = baseResolveModuleRegistry(scope);
      if (scope && scope !== PRIMARY_SCOPE) {
        return resolved;
      }
      cachedModuleRegistry = resolved;
      hasResolvedRegistry = true;
    }
    return cachedModuleRegistry;
  }
  var PENDING_QUEUE_KEY = '__cinePendingModuleRegistrations__';
  function fallbackDefineHiddenProperty(target, name, value) {
    try {
      Object.defineProperty(target, name, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: value
      });
      return true;
    } catch (error) {
      void error;
    }
    try {
      target[name] = value;
      return true;
    } catch (assignmentError) {
      void assignmentError;
    }
    return false;
  }
  var defineHiddenProperty = ARCHITECTURE && typeof ARCHITECTURE.defineHiddenProperty === 'function' ? ARCHITECTURE.defineHiddenProperty : fallbackDefineHiddenProperty;
  var ensureQueue = ARCHITECTURE && typeof ARCHITECTURE.ensureQueue === 'function' ? function (scope) {
    return ARCHITECTURE.ensureQueue(scope, PENDING_QUEUE_KEY);
  } : function (scope) {
    if (!scope || _typeof(scope) !== 'object') {
      return null;
    }
    var queue = scope[PENDING_QUEUE_KEY];
    if (Array.isArray(queue)) {
      return queue;
    }
    if (!defineHiddenProperty(scope, PENDING_QUEUE_KEY, [])) {
      return null;
    }
    queue = scope[PENDING_QUEUE_KEY];
    if (!Array.isArray(queue)) {
      return null;
    }
    return queue;
  };
  function _queueModuleRegistration(scope, name, api, options) {
    var queue = ensureQueue(scope);
    if (!queue) {
      return false;
    }
    var payload = Object.freeze({
      name: name,
      api: api,
      options: Object.freeze(_objectSpread({}, options || {}))
    });
    try {
      queue.push(payload);
    } catch (error) {
      void error;
      queue[queue.length] = payload;
    }
    return true;
  }
  function baseRegisterOrQueueModule(scope, registry, name, api, options, onError) {
    if (registry && typeof registry.register === 'function') {
      try {
        registry.register(name, api, options);
        return true;
      } catch (error) {
        if (typeof onError === 'function') {
          onError(error);
        } else {
          void error;
        }
      }
    }
    _queueModuleRegistration(scope, name, api, options);
    return false;
  }
  function fallbackFreezeDeep(value) {
    var seen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakSet();
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
      return value;
    }
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
    var keys = Object.getOwnPropertyNames(value);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      var descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor || 'get' in descriptor || 'set' in descriptor) {
        continue;
      }
      fallbackFreezeDeep(descriptor.value, seen);
    }
    return Object.freeze(value);
  }
  var baseFreezeDeep = ARCHITECTURE && typeof ARCHITECTURE.freezeDeep === 'function' ? function (value) {
    return ARCHITECTURE.freezeDeep(value);
  } : fallbackFreezeDeep;
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
  var baseSafeWarn = ARCHITECTURE && typeof ARCHITECTURE.safeWarn === 'function' ? ARCHITECTURE.safeWarn : fallbackSafeWarn;
  function exposeGlobal(name, value, scope) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var targetScope = scope || PRIMARY_SCOPE;
    if (!targetScope || _typeof(targetScope) !== 'object') {
      return false;
    }
    var descriptor = {
      configurable: options.configurable !== false,
      enumerable: !!options.enumerable,
      value: value,
      writable: options.writable === true
    };
    try {
      Object.defineProperty(targetScope, name, descriptor);
      return true;
    } catch (error) {
      void error;
      try {
        targetScope[name] = value;
        return true;
      } catch (assignmentError) {
        void assignmentError;
        return false;
      }
    }
  }
  var baseApi = baseFreezeDeep({
    getGlobalScope: function getGlobalScope() {
      return PRIMARY_SCOPE;
    },
    collectCandidateScopes: collectCandidateScopes,
    tryRequire: baseTryRequire,
    resolveModuleRegistry: baseResolveModuleRegistry,
    getModuleRegistry: getModuleRegistry,
    queueModuleRegistration: function queueModuleRegistration(name, api, options, scope) {
      return _queueModuleRegistration(scope || PRIMARY_SCOPE, name, api, options);
    },
    registerOrQueueModule: function registerOrQueueModule(name, api, options, onError, scope, registry) {
      var targetScope = scope || PRIMARY_SCOPE;
      var moduleRegistry = registry || getModuleRegistry(targetScope);
      return baseRegisterOrQueueModule(targetScope, moduleRegistry, name, api, options, onError);
    },
    freezeDeep: baseFreezeDeep,
    safeWarn: baseSafeWarn,
    exposeGlobal: exposeGlobal,
    PENDING_QUEUE_KEY: PENDING_QUEUE_KEY
  });
  var registry = getModuleRegistry();
  baseRegisterOrQueueModule(PRIMARY_SCOPE, registry, 'cineModuleBase', baseApi, {
    category: 'infrastructure',
    description: 'Shared helpers for module registration, freezing and safe global exposure.',
    replace: true
  }, function (error) {
    baseSafeWarn('Unable to register cineModuleBase.', error);
  });
  exposeGlobal('cineModuleBase', baseApi, PRIMARY_SCOPE, {
    configurable: true,
    enumerable: false,
    writable: false
  });
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = baseApi;
  }
})();