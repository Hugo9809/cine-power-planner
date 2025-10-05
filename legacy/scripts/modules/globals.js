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
  function resolveFromScopes(propertyName) {
    var scopes = collectCandidateScopes(PRIMARY_SCOPE);
    for (var index = 0; index < scopes.length; index += 1) {
      var candidate = scopes[index];
      if (candidate && _typeof(candidate[propertyName]) === 'object') {
        return candidate[propertyName];
      }
    }
    return null;
  }
  var MODULE_BASE = function resolveModuleBase() {
    var required = tryRequireLocal('./base.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    return resolveFromScopes('cineModuleBase');
  }();
  var MODULE_ENV = function resolveModuleEnvironment() {
    var required = tryRequireLocal('./environment.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    return resolveFromScopes('cineModuleEnvironment');
  }();
  var ENV_BRIDGE = function resolveEnvironmentBridge() {
    var required = tryRequireLocal('./environment-bridge.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    return resolveFromScopes('cineEnvironmentBridge');
  }();
  var GLOBAL_SCOPE = (ENV_BRIDGE && typeof ENV_BRIDGE.getGlobalScope === 'function' ? ENV_BRIDGE.getGlobalScope() : null) || (MODULE_ENV && typeof MODULE_ENV.getGlobalScope === 'function' ? MODULE_ENV.getGlobalScope() : null) || (MODULE_BASE && typeof MODULE_BASE.getGlobalScope === 'function' ? MODULE_BASE.getGlobalScope() : null) || PRIMARY_SCOPE;
  var PENDING_QUEUE_KEY = function resolvePendingKey() {
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
    if (MODULE_ENV && typeof MODULE_ENV.PENDING_QUEUE_KEY === 'string' && MODULE_ENV.PENDING_QUEUE_KEY) {
      return MODULE_ENV.PENDING_QUEUE_KEY;
    }
    if (MODULE_BASE && typeof MODULE_BASE.PENDING_QUEUE_KEY === 'string' && MODULE_BASE.PENDING_QUEUE_KEY) {
      return MODULE_BASE.PENDING_QUEUE_KEY;
    }
    return '__cinePendingModuleRegistrations__';
  }();
  function ensureQueue(scope) {
    var targetScope = scope || GLOBAL_SCOPE;
    if (!targetScope || _typeof(targetScope) !== 'object') {
      return null;
    }
    var queue = null;
    try {
      queue = targetScope[PENDING_QUEUE_KEY];
    } catch (readError) {
      void readError;
      queue = null;
    }
    if (Array.isArray(queue)) {
      return queue;
    }
    try {
      Object.defineProperty(targetScope, PENDING_QUEUE_KEY, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: []
      });
      queue = targetScope[PENDING_QUEUE_KEY];
    } catch (defineError) {
      void defineError;
      try {
        if (!Array.isArray(targetScope[PENDING_QUEUE_KEY])) {
          targetScope[PENDING_QUEUE_KEY] = [];
        }
        queue = targetScope[PENDING_QUEUE_KEY];
      } catch (assignmentError) {
        void assignmentError;
        return null;
      }
    }
    return queue;
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
    try {
      if (typeof localSeen.has === 'function' && localSeen.has(value)) {
        return value;
      }
    } catch (seenError) {
      void seenError;
    }
    try {
      if (typeof localSeen.add === 'function') {
        localSeen.add(value);
      }
    } catch (addError) {
      void addError;
    }
    var keys;
    try {
      keys = Object.getOwnPropertyNames(value);
    } catch (keysError) {
      void keysError;
      keys = [];
    }
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
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
      fallbackFreezeDeep(descriptor.value, localSeen);
    }
    try {
      return Object.freeze(value);
    } catch (freezeError) {
      void freezeError;
      return value;
    }
  }
  var freezeDeep = function resolveFreezeDeep() {
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
    if (MODULE_BASE && typeof MODULE_BASE.freezeDeep === 'function') {
      return MODULE_BASE.freezeDeep;
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
    if (MODULE_BASE && typeof MODULE_BASE.safeWarn === 'function') {
      return MODULE_BASE.safeWarn;
    }
    return fallbackSafeWarn;
  }();
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
  function exposeGlobalInternal(name, value, scope, options) {
    var targetScope = scope || GLOBAL_SCOPE;
    if (ENV_BRIDGE && typeof ENV_BRIDGE.exposeGlobalScoped === 'function') {
      try {
        var bridged = ENV_BRIDGE.exposeGlobalScoped(name, value, targetScope, options || {});
        if (typeof bridged !== 'undefined') {
          return bridged;
        }
      } catch (error) {
        void error;
      }
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.exposeGlobal === 'function') {
      try {
        return ENV_BRIDGE.exposeGlobal(name, value, options || {});
      } catch (bridgeError) {
        void bridgeError;
      }
    }
    if (MODULE_ENV && typeof MODULE_ENV.exposeGlobal === 'function') {
      try {
        return MODULE_ENV.exposeGlobal(name, value, targetScope, options || {});
      } catch (envError) {
        void envError;
      }
    }
    if (MODULE_BASE && typeof MODULE_BASE.exposeGlobal === 'function') {
      try {
        return MODULE_BASE.exposeGlobal(name, value, targetScope, options || {});
      } catch (baseError) {
        void baseError;
      }
    }
    return fallbackExposeGlobal(name, value, targetScope, options);
  }
  var tryRequire = function resolveTryRequire() {
    if (ENV_BRIDGE && typeof ENV_BRIDGE.tryRequire === 'function') {
      return function bridgeTryRequire(modulePath) {
        var result = ENV_BRIDGE.tryRequire(modulePath);
        return typeof result === 'undefined' ? tryRequireLocal(modulePath) : result;
      };
    }
    if (MODULE_ENV && typeof MODULE_ENV.tryRequire === 'function') {
      return MODULE_ENV.tryRequire;
    }
    if (MODULE_BASE && typeof MODULE_BASE.tryRequire === 'function') {
      return MODULE_BASE.tryRequire;
    }
    return tryRequireLocal;
  }();
  function resolveModuleRegistry(scope) {
    var targetScope = scope || GLOBAL_SCOPE;
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
    if (MODULE_ENV && typeof MODULE_ENV.getModuleRegistry === 'function') {
      try {
        var envRegistry = MODULE_ENV.getModuleRegistry(targetScope);
        if (envRegistry) {
          return envRegistry;
        }
      } catch (envError) {
        void envError;
      }
    }
    if (MODULE_BASE && typeof MODULE_BASE.getModuleRegistry === 'function') {
      try {
        var baseRegistry = MODULE_BASE.getModuleRegistry(targetScope);
        if (baseRegistry) {
          return baseRegistry;
        }
      } catch (baseError) {
        void baseError;
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
  var cachedRegistry = null;
  var hasCachedRegistry = false;
  function getModuleRegistry(scope) {
    if (scope && scope !== GLOBAL_SCOPE) {
      return resolveModuleRegistry(scope);
    }
    if (!hasCachedRegistry) {
      cachedRegistry = resolveModuleRegistry(GLOBAL_SCOPE);
      hasCachedRegistry = true;
    }
    return cachedRegistry;
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
  function queueModuleRegistration(name, api, options, scope) {
    if (ENV_BRIDGE && typeof ENV_BRIDGE.queueModuleRegistration === 'function') {
      try {
        var bridged = ENV_BRIDGE.queueModuleRegistration(name, api, options);
        if (typeof bridged !== 'undefined') {
          return bridged;
        }
      } catch (bridgeError) {
        void bridgeError;
      }
    }
    if (MODULE_ENV && typeof MODULE_ENV.queueModuleRegistration === 'function') {
      try {
        return MODULE_ENV.queueModuleRegistration(name, api, options, scope || GLOBAL_SCOPE);
      } catch (envError) {
        void envError;
      }
    }
    if (MODULE_BASE && typeof MODULE_BASE.queueModuleRegistration === 'function') {
      try {
        return MODULE_BASE.queueModuleRegistration(name, api, options, scope || GLOBAL_SCOPE);
      } catch (baseError) {
        void baseError;
      }
    }
    var queue = ensureQueue(scope || GLOBAL_SCOPE);
    if (!queue) {
      return false;
    }
    var payload = Object.freeze({
      name: name,
      api: api,
      options: Object.freeze(shallowCopyOptions(options))
    });
    try {
      queue.push(payload);
    } catch (error) {
      void error;
      queue[queue.length] = payload;
    }
    return true;
  }
  function registerOrQueueModule(name, api, options, onError, scope, registry) {
    var targetScope = scope || GLOBAL_SCOPE;
    var effectiveRegistry = registry || getModuleRegistry(targetScope);
    if (MODULE_BASE && typeof MODULE_BASE.registerOrQueueModule === 'function') {
      try {
        var baseRegistered = MODULE_BASE.registerOrQueueModule(name, api, options, onError, targetScope, effectiveRegistry);
        if (baseRegistered) {
          recordModule(name, api);
          return true;
        }
      } catch (baseError) {
        void baseError;
      }
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.registerOrQueueModule === 'function') {
      try {
        var bridged = ENV_BRIDGE.registerOrQueueModule(name, api, options, onError, targetScope, effectiveRegistry);
        if (bridged) {
          recordModule(name, api);
          return true;
        }
      } catch (bridgeError) {
        void bridgeError;
      }
    }
    if (MODULE_ENV && typeof MODULE_ENV.registerOrQueueModule === 'function') {
      try {
        var envRegistered = MODULE_ENV.registerOrQueueModule(name, api, options, onError, targetScope, effectiveRegistry);
        if (envRegistered) {
          recordModule(name, api);
          return true;
        }
      } catch (envError) {
        void envError;
      }
    }
    if (effectiveRegistry && typeof effectiveRegistry.register === 'function') {
      try {
        effectiveRegistry.register(name, api, options || {});
        recordModule(name, api);
        return true;
      } catch (registryError) {
        if (typeof onError === 'function') {
          try {
            onError(registryError);
          } catch (callbackError) {
            void callbackError;
          }
        } else {
          void registryError;
        }
      }
    }
    var queued = queueModuleRegistration(name, api, options, targetScope);
    if (queued) {
      recordModule(name, api);
    }
    return queued;
  }
  var localModuleMap = Object.create(null);
  var waitersMap = Object.create(null);
  function notifyWaiters(name, api) {
    if (!waitersMap[name]) {
      return;
    }
    var waiters = waitersMap[name].slice();
    waitersMap[name].length = 0;
    for (var index = 0; index < waiters.length; index += 1) {
      var waiter = waiters[index];
      try {
        waiter(api);
      } catch (error) {
        void error;
      }
    }
  }
  function recordModule(name, api) {
    if (typeof name !== 'string' || !name || !api) {
      return false;
    }
    localModuleMap[name] = api;
    notifyWaiters(name, api);
    return true;
  }
  function getModule(name, options) {
    if (typeof name !== 'string' || !name) {
      return null;
    }
    if (Object.prototype.hasOwnProperty.call(localModuleMap, name)) {
      return localModuleMap[name];
    }
    var targetScope = options && options.scope ? options.scope : GLOBAL_SCOPE;
    try {
      if (targetScope && _typeof(targetScope) === 'object' && typeof targetScope[name] !== 'undefined') {
        return targetScope[name];
      }
    } catch (error) {
      void error;
    }
    var registry = getModuleRegistry(targetScope);
    if (registry && typeof registry.get === 'function') {
      try {
        var resolved = registry.get(name);
        if (resolved) {
          return resolved;
        }
      } catch (registryError) {
        void registryError;
      }
    }
    return null;
  }
  function whenModuleAvailable(name, callback) {
    if (typeof name !== 'string' || !name || typeof callback !== 'function') {
      return false;
    }
    var existing = getModule(name);
    if (existing) {
      try {
        callback(existing);
      } catch (error) {
        void error;
      }
      return true;
    }
    if (!waitersMap[name]) {
      waitersMap[name] = [];
    }
    waitersMap[name].push(callback);
    return true;
  }
  function listRecordedModules() {
    return Object.freeze(Object.keys(localModuleMap));
  }
  function primeKnownModules() {
    var descriptors = [{
      name: 'cineModuleBase',
      value: MODULE_BASE
    }, {
      name: 'cineModuleEnvironment',
      value: MODULE_ENV
    }, {
      name: 'cineEnvironmentBridge',
      value: ENV_BRIDGE
    }, {
      name: 'cineModules',
      value: getModuleRegistry(GLOBAL_SCOPE)
    }];
    for (var index = 0; index < descriptors.length; index += 1) {
      var descriptor = descriptors[index];
      if (descriptor.value) {
        recordModule(descriptor.name, descriptor.value);
      }
    }
  }
  primeKnownModules();
  var globalApi = {
    scope: GLOBAL_SCOPE,
    moduleBase: MODULE_BASE,
    moduleEnvironment: MODULE_ENV,
    environmentBridge: ENV_BRIDGE,
    getModuleRegistry: getModuleRegistry,
    resolveModuleRegistry: resolveModuleRegistry,
    queueModuleRegistration: queueModuleRegistration,
    registerOrQueueModule: registerOrQueueModule,
    freezeDeep: freezeDeep,
    safeWarn: safeWarn,
    exposeGlobal: function exposeGlobal(name, value, options) {
      return exposeGlobalInternal(name, value, GLOBAL_SCOPE, options || {});
    },
    exposeGlobalScoped: function exposeGlobalScoped(name, value, scope, options) {
      return exposeGlobalInternal(name, value, scope || GLOBAL_SCOPE, options || {});
    },
    tryRequire: tryRequire,
    collectCandidateScopes: function collectCandidateScopesShared(scope) {
      var scopes = collectCandidateScopes(scope || GLOBAL_SCOPE);
      return Object.freeze(scopes.slice());
    },
    getPendingQueueKey: function getPendingQueueKey() {
      return PENDING_QUEUE_KEY;
    },
    ensureQueue: function ensureQueueShared(scope) {
      return ensureQueue(scope || GLOBAL_SCOPE);
    },
    recordModule: recordModule,
    getModule: getModule,
    whenModuleAvailable: whenModuleAvailable,
    listRecordedModules: listRecordedModules
  };
  var existing = null;
  var candidateScopes = collectCandidateScopes(GLOBAL_SCOPE);
  for (var index = 0; index < candidateScopes.length; index += 1) {
    var scope = candidateScopes[index];
    if (scope && _typeof(scope.cineModuleGlobals) === 'object') {
      existing = scope.cineModuleGlobals;
      break;
    }
  }
  if (existing && existing !== globalApi) {
    try {
      var existingKeys = Object.getOwnPropertyNames(existing);
      for (var mergeIndex = 0; mergeIndex < existingKeys.length; mergeIndex += 1) {
        var key = existingKeys[mergeIndex];
        if (typeof globalApi[key] === 'undefined') {
          globalApi[key] = existing[key];
        }
      }
    } catch (mergeError) {
      void mergeError;
    }
    if (typeof existing.listRecordedModules === 'function') {
      try {
        var names = existing.listRecordedModules();
        if (Array.isArray(names)) {
          for (var nameIndex = 0; nameIndex < names.length; nameIndex += 1) {
            var moduleName = names[nameIndex];
            if (!localModuleMap[moduleName] && typeof existing.getModule === 'function') {
              var moduleValue = existing.getModule(moduleName);
              if (moduleValue) {
                recordModule(moduleName, moduleValue);
              }
            }
          }
        }
      } catch (syncError) {
        void syncError;
      }
    }
  }
  var frozenApi = freezeDeep(globalApi);
  recordModule('cineModuleGlobals', frozenApi);
  var registered = registerOrQueueModule('cineModuleGlobals', frozenApi, {
    category: 'infrastructure',
    description: 'Shared module globals for cross-script coordination.',
    replace: true
  }, function (error) {
    safeWarn('Unable to register cineModuleGlobals module.', error);
  }, GLOBAL_SCOPE, getModuleRegistry(GLOBAL_SCOPE));
  if (!registered) {
    queueModuleRegistration('cineModuleGlobals', frozenApi, {
      category: 'infrastructure',
      description: 'Shared module globals for cross-script coordination.',
      replace: true
    }, GLOBAL_SCOPE);
  }
  var exposed = exposeGlobalInternal('cineModuleGlobals', frozenApi, GLOBAL_SCOPE, {
    configurable: true,
    enumerable: false,
    writable: false
  });
  if (!exposed) {
    safeWarn('Unable to expose cineModuleGlobals globally.');
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = frozenApi;
  }
})();