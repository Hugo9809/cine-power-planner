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
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
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

  function baseTryRequire(modulePath) {
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

  function baseResolveModuleRegistry(scope) {
    var required = baseTryRequire('./registry.js');
    if (required && typeof required === 'object') {
      return required;
    }

    var scopes = collectCandidateScopes(scope || PRIMARY_SCOPE);
    for (var index = 0; index < scopes.length; index += 1) {
      var candidate = scopes[index];
      if (candidate && typeof candidate.cineModules === 'object') {
        return candidate.cineModules;
      }
    }

    return null;
  }

  var cachedModuleRegistry = null;
  var hasResolvedRegistry = false;

  function getModuleRegistry(scope) {
    if (!hasResolvedRegistry || (scope && scope !== PRIMARY_SCOPE)) {
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

  function ensureQueue(scope) {
    if (!scope || typeof scope !== 'object') {
      return null;
    }

    var queue = scope[PENDING_QUEUE_KEY];
    if (Array.isArray(queue)) {
      return queue;
    }

    try {
      Object.defineProperty(scope, PENDING_QUEUE_KEY, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: [],
      });
      queue = scope[PENDING_QUEUE_KEY];
    } catch (error) {
      void error;
      try {
        if (!Array.isArray(scope[PENDING_QUEUE_KEY])) {
          scope[PENDING_QUEUE_KEY] = [];
        }
        queue = scope[PENDING_QUEUE_KEY];
      } catch (assignmentError) {
        void assignmentError;
        return null;
      }
    }

    return queue;
  }

  function queueModuleRegistration(scope, name, api, options) {
    var queue = ensureQueue(scope);
    if (!queue) {
      return false;
    }

    var payload = Object.freeze({
      name: name,
      api: api,
      options: Object.freeze(Object.assign ? Object.assign({}, options || {}) : (function cloneOptions(source) {
        if (!source) return {};
        var target = {};
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
        return target;
      })(options)),
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

    queueModuleRegistration(scope, name, api, options);
    return false;
  }

  function baseFreezeDeep(value, seen) {
    if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
      return value;
    }

    var tracker = seen;
    if (!tracker) {
      tracker = new WeakSet();
    }

    if (tracker.has(value)) {
      return value;
    }

    tracker.add(value);

    var keys = Object.getOwnPropertyNames(value);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      var descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor || ('get' in descriptor) || ('set' in descriptor)) {
        continue;
      }
      baseFreezeDeep(descriptor.value, tracker);
    }

    return Object.freeze(value);
  }

  function baseSafeWarn(message, detail) {
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

  function exposeGlobal(name, value, scope, options) {
    var targetScope = scope || PRIMARY_SCOPE;
    if (!targetScope || typeof targetScope !== 'object') {
      return false;
    }

    var descriptor = {
      configurable: !options || options.configurable !== false,
      enumerable: options && options.enumerable === true,
      value: value,
      writable: options && options.writable === true,
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
    queueModuleRegistration: function queueModuleRegistrationWrapper(name, api, options, scope) {
      return queueModuleRegistration(scope || PRIMARY_SCOPE, name, api, options);
    },
    registerOrQueueModule: function registerOrQueueModuleWrapper(name, api, options, onError, scope, registry) {
      var targetScope = scope || PRIMARY_SCOPE;
      var moduleRegistry = registry || getModuleRegistry(targetScope);
      return baseRegisterOrQueueModule(targetScope, moduleRegistry, name, api, options, onError);
    },
    freezeDeep: baseFreezeDeep,
    safeWarn: baseSafeWarn,
    exposeGlobal: exposeGlobal,
    PENDING_QUEUE_KEY: PENDING_QUEUE_KEY,
  });

  var registry = getModuleRegistry();
  baseRegisterOrQueueModule(
    PRIMARY_SCOPE,
    registry,
    'cineModuleBase',
    baseApi,
    {
      category: 'infrastructure',
      description: 'Shared helpers for module registration, freezing, and safe global exposure.',
      replace: true,
    },
    function (error) {
      baseSafeWarn('Unable to register cineModuleBase.', error);
    }
  );

  exposeGlobal('cineModuleBase', baseApi, PRIMARY_SCOPE, {
    configurable: true,
    enumerable: false,
    writable: false,
  });

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = baseApi;
  }
})();
