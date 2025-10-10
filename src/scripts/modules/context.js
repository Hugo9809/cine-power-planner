/*
 * context.js
 * ----------
 * Exposes utilities that co-ordinate shared runtime context across the
 * planner. Many of these helpers provide "fallback" implementations so that the
 * application keeps functioning flawlessly even when specific browser features
 * are unavailable or when code executes from a cached offline bundle. The
 * additional comments explain the intent behind each defensive branch to make
 * auditing easier for anyone safeguarding user data flows.
 */

(function () {
  const DEFAULT_PENDING_QUEUE_KEY = '__cinePendingModuleRegistrations__';

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

  // Build an ordered list of potential scopes to inspect. The primary scope is
  // evaluated first so the active window remains preferred over shared worker
  // contexts where session storage might behave differently.
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

  // Lightweight require wrapper that mirrors the behaviour of try/catch blocks
  // used throughout the runtime. Returning null rather than throwing keeps the
  // bootstrap sequence deterministic.
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

  // Define a property without exposing it during iteration. If defineProperty
  // is unavailable we gracefully assign the property to keep the runtime alive
  // on legacy browsers.
  function fallbackDefineHiddenProperty(target, name, value) {
    if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
      return false;
    }

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

  // Deeply freeze complex objects while tolerating environments that lack
  // Object.freeze. The WeakSet guards against cyclical references.
  function fallbackFreezeDeep(value, seen = new WeakSet()) {
    if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
      return value;
    }

    if (seen.has(value)) {
      return value;
    }

    seen.add(value);

    let keys = [];
    try {
      keys = Object.getOwnPropertyNames(value);
    } catch (error) {
      void error;
    }

    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      let child;
      try {
        child = value[key];
      } catch (accessError) {
        void accessError;
        child = undefined;
      }

      if (!child || (typeof child !== 'object' && typeof child !== 'function')) {
        continue;
      }

      fallbackFreezeDeep(child, seen);
    }

    try {
      try {
        return Object.freeze(value);
      } catch (freezeError) {
        void freezeError;
        return value;
      }
    } catch (freezeError) {
      void freezeError;
      return value;
    }
  }

  // Provide a safe logging helper that never throws when console access is
  // restricted (which occasionally happens inside headless test runners).
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

  // Locate a property from any of the candidate scopes. The predicate allows
  // callers to define custom matching logic without exposing implementation
  // details to each lookup site.
  function fallbackResolveFromScopes(propertyName, options) {
    const settings = options || {};
    const predicate = typeof settings.predicate === 'function' ? settings.predicate : null;
    const scopes = Array.isArray(settings.scopes)
      ? settings.scopes.slice()
      : fallbackCollectCandidateScopes(settings.primaryScope);

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      if (predicate) {
        try {
          if (predicate(scope, propertyName)) {
            return scope;
          }
        } catch (error) {
          void error;
        }
        continue;
      }

      const candidate = scope[propertyName];
      if (typeof candidate !== 'undefined') {
        return candidate;
      }
    }

    return null;
  }

  function fallbackEnsureQueue(scope, queueKey) {
    if (!scope || typeof scope !== 'object') {
      return null;
    }

    let queue = null;
    try {
      queue = scope[queueKey];
    } catch (error) {
      void error;
      queue = null;
    }

    if (Array.isArray(queue)) {
      return queue;
    }

    try {
      Object.defineProperty(scope, queueKey, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: [],
      });
      queue = scope[queueKey];
      if (Array.isArray(queue)) {
        return queue;
      }
    } catch (defineError) {
      void defineError;
    }

    try {
      scope[queueKey] = [];
      queue = scope[queueKey];
    } catch (assignmentError) {
      void assignmentError;
      return null;
    }

    return Array.isArray(queue) ? queue : null;
  }

  const LOCAL_SCOPE = fallbackDetectGlobalScope();

  function resolveArchitecture(scope) {
    const targetScope = scope || LOCAL_SCOPE;

    const required = fallbackTryRequire('./architecture.js');
    if (required && typeof required === 'object') {
      return required;
    }

    if (targetScope && typeof targetScope.cineModuleArchitecture === 'object') {
      return targetScope.cineModuleArchitecture;
    }

    return null;
  }

  function resolveArchitectureHelpers(scope) {
    const targetScope = scope || LOCAL_SCOPE;

    const required = fallbackTryRequire('./architecture-helpers.js');
    if (required && typeof required === 'object') {
      return required;
    }

    if (targetScope && typeof targetScope.cineModuleArchitectureHelpers === 'object') {
      return targetScope.cineModuleArchitectureHelpers;
    }

    return null;
  }

  function resolveModuleSystem(scope) {
    const targetScope = scope || LOCAL_SCOPE;

    const required = fallbackTryRequire('./system.js');
    if (required && typeof required === 'object') {
      return required;
    }

    if (targetScope && typeof targetScope.cineModuleSystem === 'object') {
      return targetScope.cineModuleSystem;
    }

    return null;
  }

  const ARCHITECTURE_HELPERS = resolveArchitectureHelpers(LOCAL_SCOPE);

  let pendingQueueKey =
    ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.pendingQueueKey === 'string'
      ? ARCHITECTURE_HELPERS.pendingQueueKey
      : DEFAULT_PENDING_QUEUE_KEY;

  function updatePendingQueueKey(source) {
    if (!source || (typeof source !== 'object' && typeof source !== 'function')) {
      return;
    }

    try {
      if (typeof source.getPendingQueueKey === 'function') {
        const provided = source.getPendingQueueKey();
        if (typeof provided === 'string' && provided) {
          pendingQueueKey = provided;
          return;
        }
      }
    } catch (error) {
      void error;
    }

    if (typeof source.PENDING_QUEUE_KEY === 'string' && source.PENDING_QUEUE_KEY) {
      pendingQueueKey = source.PENDING_QUEUE_KEY;
    }
  }

  const MODULE_SYSTEM = resolveModuleSystem(LOCAL_SCOPE);
  if (MODULE_SYSTEM) {
    updatePendingQueueKey(MODULE_SYSTEM);
  }

  const ARCHITECTURE =
    (MODULE_SYSTEM && typeof MODULE_SYSTEM.getArchitecture === 'function'
      ? MODULE_SYSTEM.getArchitecture()
      : null)
    || resolveArchitecture(LOCAL_SCOPE);

  function detectWithFallbackChain() {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.detectGlobalScope === 'function') {
      try {
        const detected = MODULE_SYSTEM.detectGlobalScope();
        if (detected) {
          return detected;
        }
      } catch (error) {
        void error;
      }

      if (ARCHITECTURE && typeof ARCHITECTURE.detectGlobalScope === 'function') {
        try {
          const architectureDetected = ARCHITECTURE.detectGlobalScope();
          if (architectureDetected) {
            return architectureDetected;
          }
        } catch (architectureError) {
          void architectureError;
        }
      }

      return fallbackDetectGlobalScope();
    }

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
          return detectWithFallbackChain();
        }
      : detectWithFallbackChain;

  const PRIMARY_SCOPE = detectGlobalScope();

  function collectWithFallbackChain(primary) {
    const target = primary || PRIMARY_SCOPE;

    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.collectCandidateScopes === 'function') {
      try {
        const scopes = MODULE_SYSTEM.collectCandidateScopes(target);
        if (Array.isArray(scopes) && scopes.length > 0) {
          return scopes;
        }
      } catch (error) {
        void error;
      }

      if (ARCHITECTURE && typeof ARCHITECTURE.collectCandidateScopes === 'function') {
        try {
          const architectureScopes = ARCHITECTURE.collectCandidateScopes(target);
          if (Array.isArray(architectureScopes) && architectureScopes.length > 0) {
            return architectureScopes;
          }
        } catch (architectureError) {
          void architectureError;
        }
      }

      return fallbackCollectCandidateScopes(target);
    }

    if (ARCHITECTURE && typeof ARCHITECTURE.collectCandidateScopes === 'function') {
      try {
        const architectureScopes = ARCHITECTURE.collectCandidateScopes(target);
        if (Array.isArray(architectureScopes) && architectureScopes.length > 0) {
          return architectureScopes;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackCollectCandidateScopes(target);
  }

  const collectCandidateScopes =
    ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.collectCandidateScopes === 'function'
      ? function collectWithHelpers(primary) {
          const target = primary || PRIMARY_SCOPE;
          try {
            const scopes = ARCHITECTURE_HELPERS.collectCandidateScopes(target);
            if (Array.isArray(scopes) && scopes.length > 0) {
              return scopes;
            }
          } catch (error) {
            void error;
          }
          return collectWithFallbackChain(target);
        }
      : collectWithFallbackChain;

  function tryRequireWithFallback(modulePath) {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.tryRequire === 'function') {
      try {
        const result = MODULE_SYSTEM.tryRequire(modulePath);
        if (typeof result !== 'undefined') {
          return result;
        }
      } catch (error) {
        void error;
      }
    }

    if (ARCHITECTURE && typeof ARCHITECTURE.tryRequire === 'function') {
      try {
        const result = ARCHITECTURE.tryRequire(modulePath);
        if (typeof result !== 'undefined') {
          return result;
        }
      } catch (architectureError) {
        void architectureError;
      }
    }

    return fallbackTryRequire(modulePath);
  }

  const tryRequire =
    ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.tryRequire === 'function'
      ? function tryRequireWithHelpers(modulePath) {
          const result = ARCHITECTURE_HELPERS.tryRequire(modulePath);
          return typeof result === 'undefined' ? tryRequireWithFallback(modulePath) : result;
        }
      : tryRequireWithFallback;

  function defineHiddenPropertyWithFallback(target, name, value) {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.defineHiddenProperty === 'function') {
      try {
        if (MODULE_SYSTEM.defineHiddenProperty(target, name, value)) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }

    if (ARCHITECTURE && typeof ARCHITECTURE.defineHiddenProperty === 'function') {
      try {
        if (ARCHITECTURE.defineHiddenProperty(target, name, value)) {
          return true;
        }
      } catch (architectureError) {
        void architectureError;
      }
    }

    return fallbackDefineHiddenProperty(target, name, value);
  }

  const defineHiddenProperty =
    ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.defineHiddenProperty === 'function'
      ? function defineWithHelpers(target, name, value) {
          try {
            if (ARCHITECTURE_HELPERS.defineHiddenProperty(target, name, value)) {
              return true;
            }
          } catch (error) {
            void error;
          }
          return defineHiddenPropertyWithFallback(target, name, value);
        }
      : defineHiddenPropertyWithFallback;

  function freezeDeepWithFallback(value) {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.freezeDeep === 'function') {
      try {
        return MODULE_SYSTEM.freezeDeep(value);
      } catch (error) {
        void error;
      }
    }

    if (ARCHITECTURE && typeof ARCHITECTURE.freezeDeep === 'function') {
      try {
        return ARCHITECTURE.freezeDeep(value);
      } catch (architectureError) {
        void architectureError;
      }
    }

    return fallbackFreezeDeep(value);
  }

  const freezeDeep =
    ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.freezeDeep === 'function'
      ? function freezeWithHelpers(value) {
          try {
            return ARCHITECTURE_HELPERS.freezeDeep(value);
          } catch (error) {
            void error;
          }
          return freezeDeepWithFallback(value);
        }
      : freezeDeepWithFallback;

  function safeWarnWithFallback(message, detail) {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.safeWarn === 'function') {
      try {
        MODULE_SYSTEM.safeWarn(message, detail);
        return;
      } catch (error) {
        void error;
      }
    }

    if (ARCHITECTURE && typeof ARCHITECTURE.safeWarn === 'function') {
      try {
        ARCHITECTURE.safeWarn(message, detail);
        return;
      } catch (architectureError) {
        void architectureError;
      }
    }

    fallbackSafeWarn(message, detail);
  }

  const safeWarn =
    ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.safeWarn === 'function'
      ? function warnWithHelpers(message, detail) {
          try {
            ARCHITECTURE_HELPERS.safeWarn(message, detail);
            return;
          } catch (error) {
            void error;
          }
          safeWarnWithFallback(message, detail);
        }
      : safeWarnWithFallback;

  const resolveFromScopes =
    MODULE_SYSTEM && typeof MODULE_SYSTEM.resolveFromScopes === 'function'
      ? function resolveWithSystem(propertyName, options) {
          const settings = { ...(options || {}) };
          if (!settings.primaryScope) {
            settings.primaryScope = PRIMARY_SCOPE;
          }
          if (!settings.scopes) {
            settings.scopes = collectCandidateScopes(settings.primaryScope);
          }
          return MODULE_SYSTEM.resolveFromScopes(propertyName, settings);
        }
      : ARCHITECTURE && typeof ARCHITECTURE.resolveFromScopes === 'function'
        ? function resolveWithArchitecture(propertyName, options) {
            const settings = { ...(options || {}) };
            if (!settings.primaryScope) {
              settings.primaryScope = PRIMARY_SCOPE;
            }
            if (!settings.scopes) {
              settings.scopes = collectCandidateScopes(settings.primaryScope);
            }
            return ARCHITECTURE.resolveFromScopes(propertyName, settings);
          }
        : function resolveWithFallback(propertyName, options) {
            const settings = { ...(options || {}) };
            if (!settings.primaryScope) {
              settings.primaryScope = PRIMARY_SCOPE;
            }
            if (!settings.scopes) {
              settings.scopes = fallbackCollectCandidateScopes(settings.primaryScope);
            }
            return fallbackResolveFromScopes(propertyName, settings);
          };

  function resolveModuleBase(scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.getModuleBase === 'function') {
      try {
        const baseFromSystem = MODULE_SYSTEM.getModuleBase(targetScope);
        if (baseFromSystem && typeof baseFromSystem === 'object') {
          updatePendingQueueKey(baseFromSystem);
          return baseFromSystem;
        }
      } catch (error) {
        safeWarn('cineModuleContext: Unable to resolve module base through module system.', error);
      }
    }

    const required = tryRequire('./base.js');
    if (required && typeof required === 'object') {
      updatePendingQueueKey(required);
      return required;
    }

    const resolved = resolveFromScopes('cineModuleBase', {
      primaryScope: targetScope,
      scopes: collectCandidateScopes(targetScope),
    });

    if (resolved && typeof resolved === 'object') {
      updatePendingQueueKey(resolved);
      return resolved;
    }

    return null;
  }

  function ensureQueue(scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    if (ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.ensureQueue === 'function') {
      try {
        const queueFromHelpers = ARCHITECTURE_HELPERS.ensureQueue(targetScope, pendingQueueKey);
        if (Array.isArray(queueFromHelpers)) {
          return queueFromHelpers;
        }
      } catch (error) {
        safeWarn('cineModuleContext: Unable to access pending queue via architecture helpers.', error);
      }
    }

    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.getPendingQueue === 'function') {
      try {
        const queueFromSystem = MODULE_SYSTEM.getPendingQueue(targetScope);
        if (Array.isArray(queueFromSystem)) {
          return queueFromSystem;
        }
      } catch (error) {
        safeWarn('cineModuleContext: Unable to access pending queue via module system.', error);
      }
    }

    if (ARCHITECTURE && typeof ARCHITECTURE.ensureQueue === 'function') {
      try {
        const queued = ARCHITECTURE.ensureQueue(targetScope, pendingQueueKey);
        if (Array.isArray(queued)) {
          return queued;
        }
      } catch (error) {
        safeWarn('cineModuleContext: Unable to access pending queue via architecture.', error);
      }
    }

    return fallbackEnsureQueue(targetScope, pendingQueueKey);
  }

  function queueModuleRegistration(name, api, options, scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    if (ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.queueModuleRegistration === 'function') {
      try {
        if (ARCHITECTURE_HELPERS.queueModuleRegistration(targetScope, name, api, options)) {
          return true;
        }
      } catch (error) {
        safeWarn('cineModuleContext: Architecture helpers queueModuleRegistration failed.', error);
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

  function resolveModuleRegistry(scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    if (ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.resolveModuleRegistry === 'function') {
      try {
        const resolvedByHelpers = ARCHITECTURE_HELPERS.resolveModuleRegistry(targetScope);
        if (resolvedByHelpers && typeof resolvedByHelpers === 'object') {
          return resolvedByHelpers;
        }
      } catch (error) {
        safeWarn('cineModuleContext: Architecture helpers resolveModuleRegistry failed.', error);
      }
    }

    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.getModuleRegistry === 'function') {
      try {
        const registryFromSystem = MODULE_SYSTEM.getModuleRegistry(targetScope);
        if (registryFromSystem && typeof registryFromSystem === 'object') {
          return registryFromSystem;
        }
      } catch (error) {
        safeWarn('cineModuleContext: Unable to resolve module registry via module system.', error);
      }
    }

    const base = resolveModuleBase(targetScope);
    if (base && typeof base === 'object') {
      if (typeof base.getModuleRegistry === 'function') {
        try {
          const provided = base.getModuleRegistry(targetScope);
          if (provided && typeof provided === 'object') {
            return provided;
          }
        } catch (error) {
          safeWarn('cineModuleContext: Module base getModuleRegistry failed.', error);
        }
      }

      if (typeof base.resolveModuleRegistry === 'function') {
        try {
          const resolved = base.resolveModuleRegistry(targetScope);
          if (resolved && typeof resolved === 'object') {
            return resolved;
          }
        } catch (error) {
          safeWarn('cineModuleContext: Module base resolveModuleRegistry failed.', error);
        }
      }
    }

    const required = tryRequire('./registry.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const resolved = resolveFromScopes('cineModules', {
      primaryScope: targetScope,
      scopes: collectCandidateScopes(targetScope),
    });

    return resolved && typeof resolved === 'object' ? resolved : null;
  }

  function registerOrQueue(name, api, options, scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.registerModule === 'function') {
      try {
        if (MODULE_SYSTEM.registerModule(name, api, options || {}, targetScope)) {
          return true;
        }
      } catch (error) {
        safeWarn('cineModuleContext: Module system failed to register module.', error);
      }
    }

    const registry = resolveModuleRegistry(targetScope);
    const base = resolveModuleBase(targetScope);

    if (base && typeof base.registerOrQueueModule === 'function') {
      try {
        const result = base.registerOrQueueModule(
          name,
          api,
          options || {},
          (error) => {
            safeWarn('cineModuleContext: Module base failed to register module.', error);
          },
          targetScope,
          registry,
        );
        if (result) {
          return true;
        }
      } catch (error) {
        safeWarn('cineModuleContext: Module base threw while registering module.', error);
      }
    }

    if (registry && typeof registry.register === 'function') {
      try {
        registry.register(name, api, options || {});
        return true;
      } catch (error) {
        safeWarn('cineModuleContext: Registry registration failed.', error);
      }
    }

    return queueModuleRegistration(name, api, options, targetScope);
  }

  function exposeGlobal(name, value, scope, options = {}) {
    const targetScope = scope || PRIMARY_SCOPE;
    if (!targetScope || typeof targetScope !== 'object') {
      return false;
    }

    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.exposeGlobal === 'function') {
      try {
        return MODULE_SYSTEM.exposeGlobal(name, value, targetScope, options || {});
      } catch (error) {
        safeWarn('cineModuleContext: Module system failed to expose global.', error);
      }
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
    }

    try {
      targetScope[name] = value;
      return true;
    } catch (assignmentError) {
      void assignmentError;
    }

    return false;
  }

  function createModuleContext(options = {}) {
    const targetScope = options.scope || PRIMARY_SCOPE;
    const base = resolveModuleBase(targetScope);
    const registry = resolveModuleRegistry(targetScope);

    const context = {
      getArchitecture() {
        return ARCHITECTURE || null;
      },
      getSystem() {
        return MODULE_SYSTEM || null;
      },
      getScope() {
        return targetScope;
      },
      detectGlobalScope(scopeCandidate) {
        const target = scopeCandidate || targetScope;
        try {
          if (MODULE_SYSTEM && typeof MODULE_SYSTEM.detectGlobalScope === 'function') {
            const detected = MODULE_SYSTEM.detectGlobalScope(target);
            if (detected) {
              return detected;
            }
          }
        } catch (error) {
          safeWarn('cineModuleContext: detectGlobalScope via system failed.', error);
        }

        if (ARCHITECTURE && typeof ARCHITECTURE.detectGlobalScope === 'function') {
          try {
            const detected = ARCHITECTURE.detectGlobalScope(target);
            if (detected) {
              return detected;
            }
          } catch (error) {
            safeWarn('cineModuleContext: detectGlobalScope via architecture failed.', error);
          }
        }

        return fallbackDetectGlobalScope();
      },
      collectCandidateScopes(primary) {
        return collectCandidateScopes(primary || targetScope);
      },
      tryRequire(modulePath) {
        return tryRequire(modulePath);
      },
      resolveFromScopes(propertyName, settings) {
        const optionsWithScope = { ...(settings || {}) };
        if (!optionsWithScope.primaryScope) {
          optionsWithScope.primaryScope = targetScope;
        }
        if (!optionsWithScope.scopes) {
          optionsWithScope.scopes = collectCandidateScopes(optionsWithScope.primaryScope);
        }
        return resolveFromScopes(propertyName, optionsWithScope);
      },
      defineHiddenProperty(target, name, value) {
        return defineHiddenProperty(target, name, value);
      },
      freezeDeep(value) {
        return freezeDeep(value);
      },
      safeWarn(message, detail) {
        safeWarn(message, detail);
      },
      ensureQueue(scopeCandidate) {
        return ensureQueue(scopeCandidate || targetScope);
      },
      getModuleBase() {
        return base;
      },
      getModuleRegistry() {
        return registry;
      },
      queueModuleRegistration(name, api, moduleOptions, scopeCandidate) {
        return queueModuleRegistration(name, api, moduleOptions, scopeCandidate || targetScope);
      },
      registerModule(name, api, moduleOptions, scopeCandidate) {
        return registerOrQueue(name, api, moduleOptions, scopeCandidate || targetScope);
      },
      exposeGlobal(name, value, scopeCandidate, exposeOptions) {
        return exposeGlobal(name, value, scopeCandidate || targetScope, exposeOptions || {});
      },
    };

    return Object.freeze(context);
  }

  const contextApi = freezeDeep({
    getArchitecture() {
      return ARCHITECTURE;
    },
    getModuleSystem() {
      return MODULE_SYSTEM;
    },
    detectGlobalScope,
    collectCandidateScopes,
    tryRequire,
    resolveFromScopes,
    defineHiddenProperty,
    freezeDeep,
    safeWarn,
    ensureQueue,
    resolveModuleBase,
    resolveModuleRegistry,
    queueModuleRegistration,
    registerOrQueue,
    exposeGlobal,
    createModuleContext,
    getPrimaryScope() {
      return PRIMARY_SCOPE;
    },
  });

  registerOrQueue(
    'cineModuleContext',
    contextApi,
    {
      category: 'infrastructure',
      description: 'Shared context helpers that unify architecture, system and registry lookups.',
      freeze: false,
      connections: ['cineModuleBase', 'cineModuleGlobals', 'cineModuleEnvironment', 'cineModuleArchitectureKernel'],
    },
    PRIMARY_SCOPE,
  );

  exposeGlobal('cineModuleContext', contextApi, PRIMARY_SCOPE, { configurable: true, enumerable: false, writable: false });

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = contextApi;
  }
})();
