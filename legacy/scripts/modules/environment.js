function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function fallbackDetectPrimaryScope() {
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
  var LOCAL_SCOPE = fallbackDetectPrimaryScope();
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
  var detectPrimaryScope = ARCHITECTURE && typeof ARCHITECTURE.detectGlobalScope === 'function' ? ARCHITECTURE.detectGlobalScope : fallbackDetectPrimaryScope;
  var PRIMARY_SCOPE = detectPrimaryScope();
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
  var tryRequire = ARCHITECTURE && typeof ARCHITECTURE.tryRequire === 'function' ? ARCHITECTURE.tryRequire : function (modulePath) {
    if (typeof require !== 'function') {
      return null;
    }
    try {
      return require(modulePath);
    } catch (error) {
      void error;
      return null;
    }
  };
  var resolvedModuleBase;
  var hasResolvedModuleBase = false;
  function resolveModuleBase() {
    var required = tryRequire('./base.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var scopes = collectCandidateScopes(PRIMARY_SCOPE);
    if (ARCHITECTURE && typeof ARCHITECTURE.resolveFromScopes === 'function') {
      var resolved = ARCHITECTURE.resolveFromScopes('cineModuleBase', {
        scopes: scopes
      });
      if (resolved && _typeof(resolved) === 'object') {
        return resolved;
      }
    }
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (scope && _typeof(scope.cineModuleBase) === 'object') {
        return scope.cineModuleBase;
      }
    }
    return null;
  }
  function getModuleBase() {
    if (!hasResolvedModuleBase) {
      resolvedModuleBase = resolveModuleBase();
      hasResolvedModuleBase = true;
    }
    return resolvedModuleBase;
  }
  var resolvedGlobalScope;
  var hasResolvedGlobalScope = false;
  function getGlobalScope() {
    if (!hasResolvedGlobalScope) {
      var moduleBase = getModuleBase();
      if (moduleBase && typeof moduleBase.getGlobalScope === 'function') {
        try {
          var scope = moduleBase.getGlobalScope();
          resolvedGlobalScope = scope || PRIMARY_SCOPE;
        } catch (error) {
          void error;
          resolvedGlobalScope = PRIMARY_SCOPE;
        }
      } else {
        resolvedGlobalScope = PRIMARY_SCOPE;
      }
      hasResolvedGlobalScope = true;
    }
    return resolvedGlobalScope;
  }
  function getCandidateScopes(scope) {
    var base = getModuleBase();
    if (base && typeof base.collectCandidateScopes === 'function') {
      try {
        var scoped = base.collectCandidateScopes(scope || getGlobalScope());
        if (Array.isArray(scoped)) {
          return scoped;
        }
      } catch (error) {
        void error;
      }
    }
    return collectCandidateScopes(scope || getGlobalScope());
  }
  function getTryRequire() {
    var base = getModuleBase();
    if (base && typeof base.tryRequire === 'function') {
      return base.tryRequire;
    }
    return tryRequire;
  }
  function resolveModuleRegistry(scope) {
    var base = getModuleBase();
    var targetScope = scope || getGlobalScope();
    if (base && typeof base.resolveModuleRegistry === 'function') {
      try {
        return base.resolveModuleRegistry(targetScope);
      } catch (error) {
        void error;
      }
    }
    var required = getTryRequire()('./registry.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var scopes = getCandidateScopes(targetScope);
    if (ARCHITECTURE && typeof ARCHITECTURE.resolveFromScopes === 'function') {
      var resolved = ARCHITECTURE.resolveFromScopes('cineModules', {
        scopes: scopes
      });
      if (resolved && _typeof(resolved) === 'object') {
        return resolved;
      }
    }
    for (var index = 0; index < scopes.length; index += 1) {
      var candidate = scopes[index];
      if (candidate && _typeof(candidate.cineModules) === 'object') {
        return candidate.cineModules;
      }
    }
    return null;
  }
  var resolvedRegistry;
  var hasResolvedRegistry = false;
  function getModuleRegistry(scope) {
    if (scope && scope !== getGlobalScope()) {
      return resolveModuleRegistry(scope);
    }
    if (!hasResolvedRegistry) {
      resolvedRegistry = resolveModuleRegistry(getGlobalScope());
      hasResolvedRegistry = true;
    }
    return resolvedRegistry;
  }
  function getPendingQueueKey() {
    var base = getModuleBase();
    if (base && typeof base.PENDING_QUEUE_KEY === 'string') {
      return base.PENDING_QUEUE_KEY;
    }
    return '__cinePendingModuleRegistrations__';
  }
  function ensureQueue(scope) {
    if (!scope || _typeof(scope) !== 'object') {
      return null;
    }
    var key = getPendingQueueKey();
    var queue = scope[key];
    if (Array.isArray(queue)) {
      return queue;
    }
    try {
      Object.defineProperty(scope, key, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: []
      });
      queue = scope[key];
    } catch (error) {
      void error;
      try {
        if (!Array.isArray(scope[key])) {
          scope[key] = [];
        }
        queue = scope[key];
      } catch (assignmentError) {
        void assignmentError;
        return null;
      }
    }
    return queue;
  }
  function queueModuleRegistrationForScope(scope, name, api, options) {
    var base = getModuleBase();
    var targetScope = scope || getGlobalScope();
    if (base && typeof base.queueModuleRegistration === 'function') {
      try {
        return base.queueModuleRegistration(name, api, options, targetScope);
      } catch (error) {
        void error;
      }
    }
    var queue = ensureQueue(targetScope);
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
  function registerOrQueueForScope(scope, registry, name, api, options, onError) {
    var base = getModuleBase();
    var targetScope = scope || getGlobalScope();
    var targetRegistry = registry || getModuleRegistry(targetScope);
    if (base && typeof base.registerOrQueueModule === 'function') {
      try {
        return base.registerOrQueueModule(name, api, options, onError, targetScope, targetRegistry);
      } catch (error) {
        void error;
      }
    }
    if (targetRegistry && typeof targetRegistry.register === 'function') {
      try {
        targetRegistry.register(name, api, options);
        return true;
      } catch (error) {
        if (typeof onError === 'function') {
          onError(error);
        } else {
          void error;
        }
      }
    }
    queueModuleRegistrationForScope(targetScope, name, api, options);
    return false;
  }
  function isConsoleCandidate(value) {
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
      return false;
    }
    try {
      var globalConsole = null;
      try {
        if (typeof console !== 'undefined' && console) {
          globalConsole = console;
        }
      } catch (accessError) {
        void accessError;
      }
      if (globalConsole) {
        if (value === globalConsole) {
          return true;
        }
        try {
          if (value.__cameraPowerPlannerOriginal && value.__cameraPowerPlannerOriginal === globalConsole) {
            return true;
          }
        } catch (proxyCheckError) {
          void proxyCheckError;
        }
      }
      try {
        if (typeof value.log === 'function' && typeof value.warn === 'function' && typeof value.error === 'function') {
          var ctorName = value.constructor && value.constructor.name;
          if (ctorName && /Console/i.test(ctorName)) {
            return true;
          }
          if (typeof Symbol !== 'undefined' && value[Symbol.toStringTag]) {
            var tag = value[Symbol.toStringTag];
            if (typeof tag === 'string' && /Console/i.test(tag)) {
              return true;
            }
          }
        }
      } catch (inspectionError) {
        void inspectionError;
      }
    } catch (error) {
      void error;
      return false;
    }
    return false;
  }
  function isNodeModuleCandidate(value) {
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
      return false;
    }
    try {
      if (typeof value.require === 'function' && typeof value.loaded === 'boolean') {
        if (Array.isArray ? Array.isArray(value.children) : Object.prototype.toString.call(value.children) === '[object Array]') {
          return true;
        }
        if (typeof value.paths !== 'undefined') {
          return true;
        }
      }
    } catch (inspectionError) {
      void inspectionError;
    }
    return false;
  }
  function isEthereumProviderCandidate(value) {
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
      return false;
    }
    if (PRIMARY_SCOPE && _typeof(PRIMARY_SCOPE) === 'object') {
      try {
        if (value === PRIMARY_SCOPE.ethereum) {
          return true;
        }
      } catch (error) {
        void error;
        return true;
      }
    }
    try {
      if (value.isMetaMask === true) {
        return true;
      }
    } catch (inspectionError) {
      if (inspectionError && typeof inspectionError.message === 'string' && /metamask/i.test(inspectionError.message)) {
        return true;
      }
    }
    try {
      if (typeof value.request === 'function' && typeof value.on === 'function') {
        if (typeof value.removeListener === 'function' || typeof value.removeEventListener === 'function') {
          return true;
        }
        var ctorName = value.constructor && value.constructor.name;
        if (ctorName && /Ethereum|MetaMask|Provider/i.test(ctorName)) {
          return true;
        }
      }
    } catch (accessError) {
      void accessError;
      return true;
    }
    return false;
  }
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
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
      return value;
    }
    if (shouldBypassDeepFreeze(value) || isEthereumProviderCandidate(value) || isConsoleCandidate(value) || isNodeModuleCandidate(value)) {
      return value;
    }
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
    var keys = Object.getOwnPropertyNames(value);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      var descriptor = void 0;
      try {
        descriptor = Object.getOwnPropertyDescriptor(value, key);
      } catch (descriptorError) {
        void descriptorError;
        descriptor = null;
      }
      if (descriptor && (typeof descriptor.get === 'function' || typeof descriptor.set === 'function')) {
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
      if (shouldBypassDeepFreeze(child) || isEthereumProviderCandidate(child) || isConsoleCandidate(child) || isNodeModuleCandidate(child)) {
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
  function freezeDeep(value, seen) {
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
      return value;
    }
    if (shouldBypassDeepFreeze(value) || isEthereumProviderCandidate(value) || isConsoleCandidate(value) || isNodeModuleCandidate(value)) {
      return value;
    }
    var base = getModuleBase();
    var freeze = base && typeof base.freezeDeep === 'function' ? base.freezeDeep : fallbackFreezeDeep;
    return freeze(value, seen);
  }
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
  function safeWarn(message, detail) {
    var base = getModuleBase();
    var warn = base && typeof base.safeWarn === 'function' ? base.safeWarn : fallbackSafeWarn;
    warn(message, detail);
  }
  function fallbackExposeGlobal(name, value, scope) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    if (!scope || _typeof(scope) !== 'object') {
      return false;
    }
    var descriptor = {
      configurable: options.configurable !== false,
      enumerable: !!options.enumerable,
      value: value,
      writable: options.writable === true
    };
    try {
      Object.defineProperty(scope, name, descriptor);
      return true;
    } catch (error) {
      void error;
      try {
        scope[name] = value;
        return true;
      } catch (assignmentError) {
        void assignmentError;
        return false;
      }
    }
  }
  function _exposeGlobal(name, value, scope, options) {
    var targetScope = scope || getGlobalScope();
    var base = getModuleBase();
    if (base && typeof base.exposeGlobal === 'function') {
      return base.exposeGlobal(name, value, targetScope, options);
    }
    return fallbackExposeGlobal(name, value, targetScope, options);
  }
  function createScopedEnvironment() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var scope = options && _typeof(options.scope) === 'object' ? options.scope : getGlobalScope();
    var registry = options && options.registry ? options.registry : getModuleRegistry(scope);
    var environment = {
      tryRequire: function tryRequire(modulePath) {
        return getTryRequire()(modulePath);
      },
      queueModuleRegistration: function queueModuleRegistration(name, api, queueOptions) {
        return queueModuleRegistrationForScope(scope, name, api, queueOptions);
      },
      registerOrQueueModule: function registerOrQueueModule(name, api, registerOptions, onError) {
        return registerOrQueueForScope(scope, registry, name, api, registerOptions, onError);
      },
      freezeDeep: freezeDeep,
      safeWarn: safeWarn,
      exposeGlobal: function exposeGlobal(name, value, exposeOptions) {
        return _exposeGlobal(name, value, scope, exposeOptions);
      },
      collectCandidateScopes: function collectCandidateScopes() {
        return Object.freeze(getCandidateScopes(scope).slice());
      },
      PENDING_QUEUE_KEY: getPendingQueueKey()
    };
    Object.defineProperties(environment, {
      scope: {
        configurable: false,
        enumerable: true,
        get: function get() {
          return scope;
        }
      },
      registry: {
        configurable: false,
        enumerable: true,
        get: function get() {
          return registry;
        }
      }
    });
    return freezeDeep(environment);
  }
  var moduleEnvironment = freezeDeep({
    getModuleBase: getModuleBase,
    getGlobalScope: getGlobalScope,
    getModuleRegistry: getModuleRegistry,
    resolveModuleRegistry: resolveModuleRegistry,
    collectCandidateScopes: getCandidateScopes,
    tryRequire: function tryRequire(modulePath) {
      return getTryRequire()(modulePath);
    },
    queueModuleRegistration: function queueModuleRegistration(name, api, options, scope) {
      return queueModuleRegistrationForScope(scope || getGlobalScope(), name, api, options);
    },
    registerOrQueueModule: function registerOrQueueModule(name, api, options, onError, scope, registry) {
      return registerOrQueueForScope(scope || getGlobalScope(), registry, name, api, options, onError);
    },
    freezeDeep: freezeDeep,
    safeWarn: safeWarn,
    exposeGlobal: function exposeGlobal(name, value, scope, options) {
      return _exposeGlobal(name, value, scope || getGlobalScope(), options);
    },
    PENDING_QUEUE_KEY: getPendingQueueKey(),
    createScopedEnvironment: createScopedEnvironment
  });
  registerOrQueueForScope(getGlobalScope(), getModuleRegistry(), 'cineModuleEnvironment', moduleEnvironment, {
    category: 'infrastructure',
    description: 'Shared environment bootstrap that harmonizes module communication across bundles.',
    replace: true,
    connections: ['cineModuleBase', 'cineModuleGlobals', 'cineEnvironmentBridge']
  }, function (error) {
    safeWarn('Unable to register cineModuleEnvironment.', error);
  });
  _exposeGlobal('cineModuleEnvironment', moduleEnvironment, getGlobalScope(), {
    configurable: true,
    enumerable: false,
    writable: false
  });
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = moduleEnvironment;
  }
})();