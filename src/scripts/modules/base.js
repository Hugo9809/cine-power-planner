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

  const LOCAL_SCOPE = fallbackDetectGlobalScope();

  function resolveArchitectureAccess(scope) {
    const targetScope = scope || LOCAL_SCOPE;

    if (typeof require === 'function') {
      try {
        const required = require('./architecture-access.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (targetScope && typeof targetScope.cineModuleArchitectureAccess === 'object') {
      return targetScope.cineModuleArchitectureAccess;
    }

    return null;
  }

  const ARCHITECTURE_ACCESS = resolveArchitectureAccess(LOCAL_SCOPE);
  const ARCHITECTURE_BRIDGE =
    ARCHITECTURE_ACCESS && typeof ARCHITECTURE_ACCESS.createScopedBridge === 'function'
      ? ARCHITECTURE_ACCESS.createScopedBridge({ scope: LOCAL_SCOPE })
      : null;

  const detectGlobalScope =
    ARCHITECTURE_BRIDGE && typeof ARCHITECTURE_BRIDGE.detectGlobalScope === 'function'
      ? function detectWithBridge() {
          const detected = ARCHITECTURE_BRIDGE.detectGlobalScope();
          return detected || fallbackDetectGlobalScope();
        }
      : fallbackDetectGlobalScope;

  const PRIMARY_SCOPE = detectGlobalScope();

  function fallbackCollectCandidateScopes(primary) {
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

  const collectCandidateScopes =
    ARCHITECTURE_BRIDGE && typeof ARCHITECTURE_BRIDGE.collectCandidateScopes === 'function'
      ? function collectWithBridge(primary) {
          return ARCHITECTURE_BRIDGE.collectCandidateScopes(primary || PRIMARY_SCOPE);
        }
      : function collectWithFallback(primary) {
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

  const baseTryRequire =
    ARCHITECTURE_BRIDGE && typeof ARCHITECTURE_BRIDGE.tryRequire === 'function'
      ? function tryRequireWithBridge(modulePath) {
          const result = ARCHITECTURE_BRIDGE.tryRequire(modulePath);
          return typeof result === 'undefined' ? fallbackTryRequire(modulePath) : result;
        }
      : fallbackTryRequire;

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

  function fallbackDefineHiddenProperty(target, name, value) {
    try {
      Object.defineProperty(target, name, {
        configurable: true,
        enumerable: false,
        writable: true,
        value,
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

  const defineHiddenProperty =
    ARCHITECTURE_BRIDGE && typeof ARCHITECTURE_BRIDGE.defineHiddenProperty === 'function'
      ? ARCHITECTURE_BRIDGE.defineHiddenProperty
      : fallbackDefineHiddenProperty;

  function fallbackEnsureQueue(scope, key) {
    if (!scope || typeof scope !== 'object') {
      return null;
    }

    let queue = scope[key];
    if (Array.isArray(queue)) {
      return queue;
    }

    if (!defineHiddenProperty(scope, key, [])) {
      return null;
    }

    queue = scope[key];
    if (!Array.isArray(queue)) {
      return null;
    }

    return queue;
  }

  const ensureQueue =
    ARCHITECTURE_BRIDGE && typeof ARCHITECTURE_BRIDGE.ensureQueue === 'function'
      ? function ensureQueueWithBridge(scope) {
          return ARCHITECTURE_BRIDGE.ensureQueue(scope || PRIMARY_SCOPE, PENDING_QUEUE_KEY);
        }
      : function ensureQueueWithFallback(scope) {
          return fallbackEnsureQueue(scope || PRIMARY_SCOPE, PENDING_QUEUE_KEY);
        };

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

  function fallbackFreezeDeep(value, seen = new WeakSet()) {
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
      fallbackFreezeDeep(descriptor.value, seen);
    }

    return Object.freeze(value);
  }

  const baseFreezeDeep =
    ARCHITECTURE_BRIDGE && typeof ARCHITECTURE_BRIDGE.freezeDeep === 'function'
      ? function freezeWithBridge(value) {
          return ARCHITECTURE_BRIDGE.freezeDeep(value);
        }
      : fallbackFreezeDeep;

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

  const baseSafeWarn =
    ARCHITECTURE_BRIDGE && typeof ARCHITECTURE_BRIDGE.safeWarn === 'function'
      ? ARCHITECTURE_BRIDGE.safeWarn
      : fallbackSafeWarn;

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
