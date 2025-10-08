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
  var PRIMARY_SCOPE = detectGlobalScope();
  function collectCandidateScopes(primary) {
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
  function tryRequireLocal(modulePath) {
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
  function locateModuleEnvironment(scope) {
    var required = tryRequireLocal('./environment.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var candidates = collectCandidateScopes(scope || PRIMARY_SCOPE);
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && _typeof(candidate.cineModuleEnvironment) === 'object') {
        return candidate.cineModuleEnvironment;
      }
    }
    return null;
  }
  function shouldBypassDeepFreeze(value) {
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
      return false;
    }
    if (isEthereumProviderCandidate(value)) {
      return true;
    }
    if (value === PRIMARY_SCOPE) {
      return true;
    }
    if (typeof console !== 'undefined') {
      try {
        if (value === console) {
          return true;
        }
      } catch (consoleError) {
        void consoleError;
        return true;
      }
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
  function fallbackFreezeDeep(value, seen) {
    var localSeen = seen;
    if (!localSeen) {
      if (typeof WeakSet === 'function') {
        localSeen = new WeakSet();
      } else {
        var seenValues = [];
        localSeen = {
          add: function add(item) {
            seenValues.push(item);
          },
          has: function has(item) {
            return seenValues.indexOf(item) !== -1;
          }
        };
      }
    }
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
      return value;
    }
    if (shouldBypassDeepFreeze(value)) {
      return value;
    }
    if (isEthereumProviderCandidate(value)) {
      return value;
    }
    if (typeof localSeen.has === 'function' && localSeen.has(value)) {
      return value;
    }
    if (typeof localSeen.add === 'function') {
      localSeen.add(value);
    }
    var keys;
    try {
      keys = Object.getOwnPropertyNames(value);
    } catch (error) {
      void error;
      keys = [];
    }
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];

      if (key === 'web3' && value === PRIMARY_SCOPE) {
        continue;
      }

      var descriptor;
      try {
        descriptor = Object.getOwnPropertyDescriptor(value, key);
      } catch (descriptorError) {
        void descriptorError;
        descriptor = null;
      }
      if (!descriptor || descriptor.get || descriptor.set) {
        continue;
      }

      var child = descriptor.value;

      if (!child || _typeof(child) !== 'object' && typeof child !== 'function') {
        continue;
      }

      fallbackFreezeDeep(child, localSeen);
    }
    if (value === PRIMARY_SCOPE) {
      return value;
    }
    try {
      return Object.freeze(value);
    } catch (freezeError) {
      void freezeError;
      return value;
    }
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
  function fallbackExposeGlobal(name, value, scope, options) {
    if (!scope || _typeof(scope) !== 'object') {
      return false;
    }
    var descriptor = {
      configurable: !options || options.configurable !== false,
      enumerable: !!(options && options.enumerable),
      value: value,
      writable: !!(options && options.writable === true)
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
  function ensureQueue(scope, key) {
    if (!scope || _typeof(scope) !== 'object') {
      return null;
    }
    var queue = null;
    try {
      queue = scope[key];
    } catch (readError) {
      void readError;
      queue = null;
    }
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
  function shallowCopyOptions(options) {
    if (!options || _typeof(options) !== 'object') {
      return {};
    }
    var copy = {};
    var keys = [];
    try {
      keys = Object.keys(options);
    } catch (error) {
      void error;
      keys = [];
    }
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      try {
        copy[key] = options[key];
      } catch (readError) {
        void readError;
      }
    }
    return copy;
  }
  function createFallbackEnvironment(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    var pendingKey = '__cinePendingModuleRegistrations__';
    var registryCache = null;
    var hasRegistry = false;
    function resolveModuleRegistryForScope(candidateScope) {
      var required = tryRequireLocal('./registry.js');
      if (required && _typeof(required) === 'object') {
        return required;
      }
      var scopes = collectCandidateScopes(candidateScope);
      for (var index = 0; index < scopes.length; index += 1) {
        var candidate = scopes[index];
        if (candidate && _typeof(candidate.cineModules) === 'object') {
          return candidate.cineModules;
        }
      }
      return null;
    }
    function getModuleRegistry() {
      if (!hasRegistry) {
        registryCache = resolveModuleRegistryForScope(targetScope);
        hasRegistry = true;
      }
      return registryCache;
    }
    function queueModuleRegistration(name, api, options) {
      var queue = ensureQueue(targetScope, pendingKey);
      if (!queue) {
        return false;
      }
      var payloadOptions = Object.freeze(shallowCopyOptions(options));
      var payload = Object.freeze({
        name: name,
        api: api,
        options: payloadOptions
      });
      try {
        queue.push(payload);
      } catch (error) {
        void error;
        queue[queue.length] = payload;
      }
      return true;
    }
    function registerOrQueueModule(name, api, options, onError) {
      var registry = getModuleRegistry();
      if (registry && typeof registry.register === 'function') {
        try {
          registry.register(name, api, options || {});
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
      return queueModuleRegistration(name, api, options);
    }
    function collectScopesCopy() {
      var scopes = collectCandidateScopes(targetScope);
      return scopes.slice();
    }
    return {
      scope: targetScope,
      registry: getModuleRegistry(),
      tryRequire: function tryRequire(modulePath) {
        return tryRequireLocal(modulePath);
      },
      queueModuleRegistration: function queueModuleRegistrationBridge(name, api, options) {
        return queueModuleRegistration(name, api, options);
      },
      registerOrQueueModule: function registerOrQueueModuleBridge(name, api, options, onError) {
        return registerOrQueueModule(name, api, options, onError);
      },
      freezeDeep: function freezeDeepBridge(value, seen) {
        return fallbackFreezeDeep(value, seen);
      },
      safeWarn: function safeWarnBridge(message, detail) {
        fallbackSafeWarn(message, detail);
      },
      exposeGlobal: function exposeGlobalBridge(name, value, options) {
        return fallbackExposeGlobal(name, value, targetScope, options || {});
      },
      collectCandidateScopes: function collectCandidateScopesBridge() {
        return Object.freeze(collectScopesCopy());
      },
      PENDING_QUEUE_KEY: pendingKey
    };
  }
  function buildDescriptor(scope) {
    var targetScope = scope || PRIMARY_SCOPE;
    var moduleEnv = locateModuleEnvironment(targetScope);
    if (moduleEnv && typeof moduleEnv.createScopedEnvironment === 'function') {
      try {
        var scoped = moduleEnv.createScopedEnvironment({
          scope: targetScope
        });
        if (scoped && _typeof(scoped) === 'object') {
          return {
            scope: scoped.scope || targetScope,
            moduleEnv: moduleEnv,
            environment: scoped
          };
        }
      } catch (error) {
        void error;
      }
    }
    var fallbackEnvironment = createFallbackEnvironment(targetScope);
    return {
      scope: fallbackEnvironment.scope || targetScope,
      moduleEnv: moduleEnv || null,
      environment: fallbackEnvironment
    };
  }
  var cachedDescriptor = null;
  function ensureDescriptor() {
    if (!cachedDescriptor) {
      cachedDescriptor = buildDescriptor(PRIMARY_SCOPE);
    }
    return cachedDescriptor;
  }
  function refreshDescriptor(options) {
    var nextScope = options && options.scope ? options.scope : PRIMARY_SCOPE;
    cachedDescriptor = buildDescriptor(nextScope);
    return cachedDescriptor;
  }
  function safeInvoke(fn, fallback) {
    try {
      return fn();
    } catch (error) {
      void error;
      return fallback;
    }
  }
  function getGlobalScope() {
    return ensureDescriptor().scope;
  }
  function getEnvironment() {
    return ensureDescriptor().environment;
  }
  function getModuleEnvironment() {
    return ensureDescriptor().moduleEnv;
  }
  function getModuleRegistry(scope) {
    if (scope && scope !== getGlobalScope()) {
      var moduleEnv = getModuleEnvironment();
      if (moduleEnv && typeof moduleEnv.getModuleRegistry === 'function') {
        return safeInvoke(function () {
          return moduleEnv.getModuleRegistry(scope);
        }, null);
      }
      var refreshed = buildDescriptor(scope);
      return refreshed.environment && refreshed.environment.registry ? refreshed.environment.registry : null;
    }
    var descriptor = ensureDescriptor();
    if (descriptor.environment && descriptor.environment.registry) {
      return descriptor.environment.registry;
    }
    var targetModuleEnv = descriptor.moduleEnv;
    if (targetModuleEnv && typeof targetModuleEnv.getModuleRegistry === 'function') {
      return safeInvoke(function () {
        return targetModuleEnv.getModuleRegistry(descriptor.scope);
      }, null);
    }
    return null;
  }
  function tryRequire(modulePath) {
    var environment = getEnvironment();
    if (environment && typeof environment.tryRequire === 'function') {
      var envResult = safeInvoke(function () {
        return environment.tryRequire(modulePath);
      }, undefined);
      if (typeof envResult !== 'undefined') {
        return envResult;
      }
    }
    var moduleEnv = getModuleEnvironment();
    if (moduleEnv && typeof moduleEnv.tryRequire === 'function') {
      var moduleResult = safeInvoke(function () {
        return moduleEnv.tryRequire(modulePath);
      }, undefined);
      if (typeof moduleResult !== 'undefined') {
        return moduleResult;
      }
    }
    return tryRequireLocal(modulePath);
  }
  function queueModuleRegistration(name, api, options) {
    var environment = getEnvironment();
    if (environment && typeof environment.queueModuleRegistration === 'function') {
      return safeInvoke(function () {
        return environment.queueModuleRegistration(name, api, options);
      }, false);
    }
    var fallback = createFallbackEnvironment(getGlobalScope());
    return fallback.queueModuleRegistration(name, api, options);
  }
  function registerOrQueueModule(name, api, options, onError, scope) {
    var environment = getEnvironment();
    if (environment && typeof environment.registerOrQueueModule === 'function') {
      return safeInvoke(function () {
        return environment.registerOrQueueModule(name, api, options, onError);
      }, false);
    }
    var targetScope = scope || getGlobalScope();
    var fallback = createFallbackEnvironment(targetScope);
    return fallback.registerOrQueueModule(name, api, options, onError);
  }
  function freezeDeep(value, seen) {
    var environment = getEnvironment();
    if (environment && typeof environment.freezeDeep === 'function') {
      return safeInvoke(function () {
        return environment.freezeDeep(value, seen);
      }, value);
    }
    return fallbackFreezeDeep(value, seen);
  }
  function safeWarn(message, detail) {
    var environment = getEnvironment();
    if (environment && typeof environment.safeWarn === 'function') {
      safeInvoke(function () {
        environment.safeWarn(message, detail);
      }, undefined);
      return;
    }
    fallbackSafeWarn(message, detail);
  }
  function exposeGlobal(name, value, scope, options) {
    var environment = getEnvironment();
    if (environment && typeof environment.exposeGlobal === 'function') {
      return safeInvoke(function () {
        return environment.exposeGlobal(name, value, options);
      }, false);
    }
    return fallbackExposeGlobal(name, value, scope || getGlobalScope(), options || {});
  }
  function collectCandidateScopesFor(scope) {
    var environment = getEnvironment();
    if (environment && typeof environment.collectCandidateScopes === 'function') {
      var result = safeInvoke(function () {
        return environment.collectCandidateScopes(scope);
      }, []);
      if (Array.isArray(result)) {
        return result.slice();
      }
    }
    return collectCandidateScopes(scope || getGlobalScope());
  }
  function getPendingQueueKey() {
    var environment = getEnvironment();
    if (environment && typeof environment.PENDING_QUEUE_KEY === 'string') {
      return environment.PENDING_QUEUE_KEY;
    }
    var moduleEnv = getModuleEnvironment();
    if (moduleEnv && typeof moduleEnv.PENDING_QUEUE_KEY === 'string') {
      return moduleEnv.PENDING_QUEUE_KEY;
    }
    return '__cinePendingModuleRegistrations__';
  }
  var bridge = Object.freeze({
    getGlobalScope: getGlobalScope,
    getEnvironment: getEnvironment,
    getModuleEnvironment: getModuleEnvironment,
    getModuleRegistry: getModuleRegistry,
    tryRequire: tryRequire,
    queueModuleRegistration: queueModuleRegistration,
    registerOrQueueModule: registerOrQueueModule,
    freezeDeep: freezeDeep,
    safeWarn: safeWarn,
    exposeGlobal: function exposeGlobalDefault(name, value, options) {
      return exposeGlobal(name, value, getGlobalScope(), options || {});
    },
    exposeGlobalScoped: function exposeGlobalScoped(name, value, scope, options) {
      return exposeGlobal(name, value, scope || getGlobalScope(), options || {});
    },
    collectCandidateScopes: function collectCandidateScopesDefault(scope) {
      return Object.freeze(collectCandidateScopesFor(scope));
    },
    getPendingQueueKey: getPendingQueueKey,
    refresh: function refresh(options) {
      return Object.freeze(refreshDescriptor(options || {}));
    }
  });
  var globalScope = getGlobalScope();
  if (globalScope && _typeof(globalScope) === 'object') {
    try {
      Object.defineProperty(globalScope, 'cineEnvironmentBridge', {
        configurable: true,
        enumerable: false,
        writable: false,
        value: bridge
      });
    } catch (error) {
      void error;
      try {
        globalScope.cineEnvironmentBridge = bridge;
      } catch (assignmentError) {
        void assignmentError;
      }
    }
  }
  var registry = getModuleRegistry();
  if (registry && typeof registry.register === 'function') {
    try {
      registry.register('cineEnvironmentBridge', bridge, {
        category: 'infrastructure',
        description: 'Provides consistent global environment access between Cine modules.',
        replace: true,
        connections: ['cineModuleEnvironment', 'cineModuleGlobals']
      });
    } catch (error) {
      safeWarn('Unable to register cineEnvironmentBridge.', error);
    }
  } else {
    queueModuleRegistration('cineEnvironmentBridge', bridge, {
      category: 'infrastructure',
      description: 'Provides consistent global environment access between Cine modules.',
      replace: true,
      connections: ['cineModuleEnvironment', 'cineModuleGlobals']
    });
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = bridge;
  }
})();