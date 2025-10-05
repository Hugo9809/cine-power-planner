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

  const PRIMARY_SCOPE = detectGlobalScope();

  function collectCandidateScopes(primary) {
    const scopes = [];

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
    const required = baseTryRequire('./registry.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const scopes = collectCandidateScopes(scope || PRIMARY_SCOPE);
    for (let index = 0; index < scopes.length; index += 1) {
      const candidate = scopes[index];
      if (candidate && typeof candidate.cineModules === 'object') {
        return candidate.cineModules;
      }
    }

    return null;
  }

  let cachedModuleRegistry = null;
  let hasResolvedRegistry = false;

  function getModuleRegistry(scope) {
    if (!hasResolvedRegistry || (scope && scope !== PRIMARY_SCOPE)) {
      const resolved = baseResolveModuleRegistry(scope);
      if (scope && scope !== PRIMARY_SCOPE) {
        return resolved;
      }
      cachedModuleRegistry = resolved;
      hasResolvedRegistry = true;
    }

    return cachedModuleRegistry;
  }

  const PENDING_QUEUE_KEY = '__cinePendingModuleRegistrations__';

  function ensureQueue(scope) {
    if (!scope || typeof scope !== 'object') {
      return null;
    }

    let queue = scope[PENDING_QUEUE_KEY];
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
    const queue = ensureQueue(scope);
    if (!queue) {
      return false;
    }

    const payload = Object.freeze({
      name,
      api,
      options: Object.freeze({ ...(options || {}) }),
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

  function baseFreezeDeep(value, seen = new WeakSet()) {
    if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
      return value;
    }

    if (seen.has(value)) {
      return value;
    }

    seen.add(value);

    const keys = Object.getOwnPropertyNames(value);
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor || ('get' in descriptor) || ('set' in descriptor)) {
        continue;
      }
      baseFreezeDeep(descriptor.value, seen);
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

  function exposeGlobal(name, value, scope, options = {}) {
    const targetScope = scope || PRIMARY_SCOPE;
    if (!targetScope || typeof targetScope !== 'object') {
      return false;
    }

    const descriptor = {
      configurable: options.configurable !== false,
      enumerable: !!options.enumerable,
      value,
      writable: options.writable === true,
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

  const baseApi = baseFreezeDeep({
    getGlobalScope() {
      return PRIMARY_SCOPE;
    },
    collectCandidateScopes,
    tryRequire: baseTryRequire,
    resolveModuleRegistry: baseResolveModuleRegistry,
    getModuleRegistry,
    queueModuleRegistration(name, api, options, scope) {
      return queueModuleRegistration(scope || PRIMARY_SCOPE, name, api, options);
    },
    registerOrQueueModule(name, api, options, onError, scope, registry) {
      const targetScope = scope || PRIMARY_SCOPE;
      const moduleRegistry = registry || getModuleRegistry(targetScope);
      return baseRegisterOrQueueModule(targetScope, moduleRegistry, name, api, options, onError);
    },
    freezeDeep: baseFreezeDeep,
    safeWarn: baseSafeWarn,
    exposeGlobal,
    PENDING_QUEUE_KEY,
  });

  const registry = getModuleRegistry();
  baseRegisterOrQueueModule(
    PRIMARY_SCOPE,
    registry,
    'cineModuleBase',
    baseApi,
    {
      category: 'infrastructure',
      description: 'Shared helpers for module registration, freezing and safe global exposure.',
      replace: true,
    },
    (error) => {
      baseSafeWarn('Unable to register cineModuleBase.', error);
    },
  );

  exposeGlobal('cineModuleBase', baseApi, PRIMARY_SCOPE, { configurable: true, enumerable: false, writable: false });

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = baseApi;
  }
})();
