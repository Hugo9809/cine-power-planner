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

  function resolveArchitecture(scope) {
    const targetScope = scope || LOCAL_SCOPE;

    if (typeof require === 'function') {
      try {
        const required = require('./architecture.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (targetScope && typeof targetScope.cineModuleArchitecture === 'object') {
      return targetScope.cineModuleArchitecture;
    }

    return null;
  }

  function resolveArchitectureHelpers(scope) {
    const targetScope = scope || LOCAL_SCOPE;

    if (typeof require === 'function') {
      try {
        const required = require('./architecture-helpers.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (targetScope && typeof targetScope.cineModuleArchitectureHelpers === 'object') {
      return targetScope.cineModuleArchitectureHelpers;
    }

    return null;
  }

  const ARCHITECTURE = resolveArchitecture(LOCAL_SCOPE);
  const ARCHITECTURE_HELPERS = resolveArchitectureHelpers(LOCAL_SCOPE);

  function detectWithArchitecture() {
    if (ARCHITECTURE && typeof ARCHITECTURE.detectGlobalScope === 'function') {
      try {
        const detected = ARCHITECTURE.detectGlobalScope();
        if (detected) {
          return detected;
        }
      } catch (error) {
        void error;
      }
    }
    return fallbackDetectGlobalScope();
  }

  const detectGlobalScope =
    ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.detectGlobalScope === 'function'
      ? function detectWithHelpers() {
          try {
            const detected = ARCHITECTURE_HELPERS.detectGlobalScope();
            if (detected) {
              return detected;
            }
          } catch (error) {
            void error;
          }
          return detectWithArchitecture();
        }
      : detectWithArchitecture;

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

  function collectWithArchitecture(primary) {
    const target = primary || PRIMARY_SCOPE;

    if (ARCHITECTURE && typeof ARCHITECTURE.collectCandidateScopes === 'function') {
      try {
        const collected = ARCHITECTURE.collectCandidateScopes(target);
        if (Array.isArray(collected) && collected.length > 0) {
          return collected;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackCollectCandidateScopes(target);
  }

  const collectCandidateScopes =
    ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.collectCandidateScopes === 'function'
      ? function (primary) {
          const target = primary || PRIMARY_SCOPE;
          try {
            const collected = ARCHITECTURE_HELPERS.collectCandidateScopes(target);
            if (Array.isArray(collected) && collected.length > 0) {
              return collected;
            }
          } catch (error) {
            void error;
          }
          return collectWithArchitecture(target);
        }
      : collectWithArchitecture;

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

  function tryRequireWithArchitecture(modulePath) {
    if (ARCHITECTURE && typeof ARCHITECTURE.tryRequire === 'function') {
      try {
        const result = ARCHITECTURE.tryRequire(modulePath);
        if (typeof result !== 'undefined') {
          return result;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackTryRequire(modulePath);
  }

  const baseTryRequire =
    ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.tryRequire === 'function'
      ? function (modulePath) {
          const result = ARCHITECTURE_HELPERS.tryRequire(modulePath);
          return typeof result === 'undefined' ? tryRequireWithArchitecture(modulePath) : result;
        }
      : tryRequireWithArchitecture;

  function baseResolveModuleRegistry(scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    if (ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.resolveModuleRegistry === 'function') {
      try {
        const helpersResolved = ARCHITECTURE_HELPERS.resolveModuleRegistry(targetScope);
        if (helpersResolved && typeof helpersResolved === 'object') {
          return helpersResolved;
        }
      } catch (error) {
        void error;
      }
    }

    const required = baseTryRequire('./registry.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const scopes = collectCandidateScopes(targetScope);
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

  const PENDING_QUEUE_KEY =
    ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.pendingQueueKey === 'string'
      ? ARCHITECTURE_HELPERS.pendingQueueKey
      : '__cinePendingModuleRegistrations__';

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

  function defineHiddenPropertyWithArchitecture(target, name, value) {
    if (ARCHITECTURE && typeof ARCHITECTURE.defineHiddenProperty === 'function') {
      try {
        if (ARCHITECTURE.defineHiddenProperty(target, name, value)) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackDefineHiddenProperty(target, name, value);
  }

  const defineHiddenProperty =
    ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.defineHiddenProperty === 'function'
      ? function (target, name, value) {
          try {
            if (ARCHITECTURE_HELPERS.defineHiddenProperty(target, name, value)) {
              return true;
            }
          } catch (error) {
            void error;
          }
          return defineHiddenPropertyWithArchitecture(target, name, value);
        }
      : defineHiddenPropertyWithArchitecture;

  function ensureQueueWithArchitecture(scope) {
    const targetScope = scope || PRIMARY_SCOPE;
    if (ARCHITECTURE && typeof ARCHITECTURE.ensureQueue === 'function') {
      try {
        const queue = ARCHITECTURE.ensureQueue(targetScope, PENDING_QUEUE_KEY);
        if (Array.isArray(queue)) {
          return queue;
        }
      } catch (error) {
        void error;
      }
    }

    if (!targetScope || typeof targetScope !== 'object') {
      return null;
    }

    let queue = targetScope[PENDING_QUEUE_KEY];
    if (Array.isArray(queue)) {
      return queue;
    }

    if (!defineHiddenProperty(targetScope, PENDING_QUEUE_KEY, [])) {
      return null;
    }

    queue = targetScope[PENDING_QUEUE_KEY];
    if (!Array.isArray(queue)) {
      return null;
    }

    return queue;
  }

  const ensureQueue =
    ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.ensureQueue === 'function'
      ? function (scope) {
          try {
            const queue = ARCHITECTURE_HELPERS.ensureQueue(scope || PRIMARY_SCOPE, PENDING_QUEUE_KEY);
            if (Array.isArray(queue)) {
              return queue;
            }
          } catch (error) {
            void error;
          }
          return ensureQueueWithArchitecture(scope);
        }
      : ensureQueueWithArchitecture;

  function queueModuleRegistration(scope, name, api, options) {
    const targetScope = scope || PRIMARY_SCOPE;

    if (ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.queueModuleRegistration === 'function') {
      try {
        if (ARCHITECTURE_HELPERS.queueModuleRegistration(targetScope, name, api, options)) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }

    const queue = ensureQueue(targetScope);
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

  function shouldBypassDeepFreeze(value) {
    if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
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

        const ctorName = value.constructor && value.constructor.name;
        if (ctorName && /Stream|Emitter|Port/i.test(ctorName)) {
          return true;
        }
      }

      if (typeof Symbol !== 'undefined' && value[Symbol.toStringTag]) {
        const tag = value[Symbol.toStringTag];
        if (typeof tag === 'string' && /Stream|Port/i.test(tag)) {
          return true;
        }
      }
    } catch (inspectionError) {
      void inspectionError;
    }

    return false;
  }

  function fallbackFreezeDeep(value, seen = new WeakSet()) {
    if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
      return value;
    }

    if (shouldBypassDeepFreeze(value)) {
      return value;
    }

    if (seen.has(value)) {
      return value;
    }

    seen.add(value);

    let keys;
    try {
      keys = Object.getOwnPropertyNames(value);
    } catch (error) {
      void error;
      return value;
    }
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

  function freezeWithArchitecture(value) {
    if (ARCHITECTURE && typeof ARCHITECTURE.freezeDeep === 'function') {
      try {
        return ARCHITECTURE.freezeDeep(value);
      } catch (error) {
        void error;
      }
    }

    return fallbackFreezeDeep(value);
  }

  const baseFreezeDeep =
    ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.freezeDeep === 'function'
      ? function (value) {
          try {
            return ARCHITECTURE_HELPERS.freezeDeep(value);
          } catch (error) {
            void error;
          }
          return freezeWithArchitecture(value);
        }
      : freezeWithArchitecture;

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

  function safeWarnWithArchitecture(message, detail) {
    if (ARCHITECTURE && typeof ARCHITECTURE.safeWarn === 'function') {
      try {
        ARCHITECTURE.safeWarn(message, detail);
        return;
      } catch (error) {
        void error;
      }
    }

    fallbackSafeWarn(message, detail);
  }

  const baseSafeWarn =
    ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.safeWarn === 'function'
      ? function (message, detail) {
          try {
            ARCHITECTURE_HELPERS.safeWarn(message, detail);
            return;
          } catch (error) {
            void error;
          }
          safeWarnWithArchitecture(message, detail);
        }
      : safeWarnWithArchitecture;

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
