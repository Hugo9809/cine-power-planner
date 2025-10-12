(function () {
  function detectHelperScope() {
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
    return null;
  }

  function resolveRuntimeEnvironmentHelpers() {
    if (typeof require === 'function') {
      try {
        const required = require('./runtime-environment-helpers.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    const candidates = [];
    function pushCandidate(scope) {
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        return;
      }
      if (candidates.indexOf(scope) === -1) {
        candidates.push(scope);
      }
    }

    const primary = detectHelperScope();
    pushCandidate(primary);
    if (typeof globalThis !== 'undefined') pushCandidate(globalThis);
    if (typeof window !== 'undefined') pushCandidate(window);
    if (typeof self !== 'undefined') pushCandidate(self);
    if (typeof global !== 'undefined') pushCandidate(global);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      try {
        const helpers = candidate && candidate.cineRuntimeEnvironmentHelpers;
        if (helpers && typeof helpers === 'object') {
          return helpers;
        }
      } catch (error) {
        void error;
      }
    }

    return null;
  }

  const RUNTIME_ENVIRONMENT_HELPERS = resolveRuntimeEnvironmentHelpers();

  function invokeEnvironmentHelper(helperName, args, fallback) {
    if (
      RUNTIME_ENVIRONMENT_HELPERS &&
      helperName &&
      typeof RUNTIME_ENVIRONMENT_HELPERS[helperName] === 'function'
    ) {
      try {
        const result = RUNTIME_ENVIRONMENT_HELPERS[helperName].apply(
          RUNTIME_ENVIRONMENT_HELPERS,
          Array.isArray(args) ? args : []
        );
        if (typeof result !== 'undefined') {
          return result;
        }
      } catch (helperInvocationError) {
        void helperInvocationError;
      }
    }

    if (typeof fallback === 'function') {
      return fallback();
    }

    return undefined;
  }

  function fallbackDetectGlobalScope() {
    if (
      RUNTIME_ENVIRONMENT_HELPERS &&
      typeof RUNTIME_ENVIRONMENT_HELPERS.fallbackDetectGlobalScope === 'function'
    ) {
      try {
        const detected = RUNTIME_ENVIRONMENT_HELPERS.fallbackDetectGlobalScope();
        if (detected) {
          return detected;
        }
      } catch (error) {
        void error;
      }
    }
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
    if (
      RUNTIME_ENVIRONMENT_HELPERS &&
      typeof RUNTIME_ENVIRONMENT_HELPERS.fallbackCollectCandidateScopes === 'function'
    ) {
      try {
        const scoped = RUNTIME_ENVIRONMENT_HELPERS.fallbackCollectCandidateScopes(primary);
        if (Array.isArray(scoped)) {
          return scoped;
        }
      } catch (error) {
        void error;
      }
    }
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

  function fallbackLoadModuleEnvironment(scope) {
    return invokeEnvironmentHelper(
      'fallbackLoadModuleEnvironment',
      [scope],
      function localFallback() {
        const required = fallbackTryRequire('./environment.js');
        if (required && typeof required === 'object') {
          return required;
        }

        const candidates = fallbackCollectCandidateScopes(scope);

        for (let index = 0; index < candidates.length; index += 1) {
          const candidate = candidates[index];
          if (candidate && typeof candidate.cineModuleEnvironment === 'object') {
            return candidate.cineModuleEnvironment;
          }
        }

        return null;
      }
    );
  }

  function fallbackLoadEnvironmentBridge(scope) {
    return invokeEnvironmentHelper(
      'fallbackLoadEnvironmentBridge',
      [scope],
      function localFallback() {
        const required = fallbackTryRequire('./environment-bridge.js');
        if (required && typeof required === 'object') {
          return required;
        }

        const candidates = fallbackCollectCandidateScopes(scope);

        for (let index = 0; index < candidates.length; index += 1) {
          const candidate = candidates[index];
          if (candidate && typeof candidate.cineEnvironmentBridge === 'object') {
            return candidate.cineEnvironmentBridge;
          }
        }

        return null;
      }
    );
  }

  function fallbackResolveModuleGlobals(scope) {
    return invokeEnvironmentHelper(
      'fallbackResolveModuleGlobals',
      [scope],
      function localFallback() {
        const required = fallbackTryRequire('./globals.js');
        if (required && typeof required === 'object') {
          return required;
        }

        const candidates = fallbackCollectCandidateScopes(scope);

        for (let index = 0; index < candidates.length; index += 1) {
          const candidate = candidates[index];
          if (candidate && typeof candidate.cineModuleGlobals === 'object') {
            return candidate.cineModuleGlobals;
          }
        }

        return null;
      }
    );
  }

  function fallbackTryRequire(modulePath) {
    return invokeEnvironmentHelper(
      'fallbackTryRequire',
      [modulePath],
      function localFallback() {
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
    );
  }

  function resolveModuleLinker(scope) {
    return invokeEnvironmentHelper(
      'resolveModuleLinker',
      [scope],
      function localFallback() {
        const required = fallbackTryRequire('./helpers/module-linker.js');
        if (required && typeof required === 'object') {
          return required;
        }

        const candidates = fallbackCollectCandidateScopes(scope);

        for (let index = 0; index < candidates.length; index += 1) {
          const candidate = candidates[index];
          try {
            const linker = candidate && candidate.cineModuleLinker;
            if (linker && typeof linker === 'object') {
              return linker;
            }
          } catch (error) {
            void error;
          }
        }

        return null;
      }
    );
  }

  const LOCAL_SCOPE = fallbackDetectGlobalScope();

  const MODULE_LINKER = resolveModuleLinker(LOCAL_SCOPE);

  function resolveModuleSystem(scope) {
    return invokeEnvironmentHelper(
      'resolveModuleSystem',
      [scope],
      function localFallback() {
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
    );
  }

  const MODULE_SYSTEM = resolveModuleSystem(LOCAL_SCOPE);

  function resolveEnvironmentContext(scope) {
    return invokeEnvironmentHelper(
      'resolveEnvironmentContext',
      [scope || LOCAL_SCOPE],
      function localFallback() {
        const targetScope = scope || LOCAL_SCOPE;
        const required = fallbackTryRequire('./environment-context.js');

        if (required && typeof required === 'object') {
          return required;
        }

        if (targetScope && typeof targetScope.cineModuleEnvironmentContext === 'object') {
          return targetScope.cineModuleEnvironmentContext;
        }

        return null;
      }
    );
  }

  const ENVIRONMENT_CONTEXT = resolveEnvironmentContext(LOCAL_SCOPE);

  function detectWithContext() {
    if (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.detectGlobalScope === 'function') {
      try {
        const detected = ENVIRONMENT_CONTEXT.detectGlobalScope();
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
    MODULE_SYSTEM && typeof MODULE_SYSTEM.detectGlobalScope === 'function'
      ? function detectWithSystem() {
          try {
            const detected = MODULE_SYSTEM.detectGlobalScope();
            if (detected) {
              return detected;
            }
          } catch (error) {
            void error;
          }
          return detectWithContext();
        }
      : detectWithContext;

  const PRIMARY_SCOPE =
    (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.getPrimaryScope === 'function'
      ? ENVIRONMENT_CONTEXT.getPrimaryScope()
      : null)
    || detectGlobalScope();

  const GLOBAL_SCOPE = (function resolveGlobalScope() {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.getGlobalScope === 'function') {
      try {
        const resolved = MODULE_SYSTEM.getGlobalScope(PRIMARY_SCOPE);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }

    if (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.getGlobalScope === 'function') {
      try {
        const scoped = ENVIRONMENT_CONTEXT.getGlobalScope(PRIMARY_SCOPE);
        if (scoped) {
          return scoped;
        }
      } catch (error) {
        void error;
      }
    }

    return PRIMARY_SCOPE;
  })();

  const CANDIDATE_SCOPES_CACHE = typeof WeakMap === 'function' ? new WeakMap() : null;

  function collectCandidateScopes(scope) {
    const targetScope = scope || GLOBAL_SCOPE;
    const eligibleForCache =
      !!CANDIDATE_SCOPES_CACHE &&
      targetScope &&
      (typeof targetScope === 'object' || typeof targetScope === 'function');

    if (eligibleForCache) {
      try {
        const cached = CANDIDATE_SCOPES_CACHE.get(targetScope);
        if (cached && Array.isArray(cached) && cached.length > 0) {
          return cached.slice();
        }
      } catch (cacheReadError) {
        void cacheReadError;
      }
    }

    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.collectCandidateScopes === 'function') {
      try {
        const scopes = MODULE_SYSTEM.collectCandidateScopes(targetScope);
        if (Array.isArray(scopes) && scopes.length > 0) {
          const result = scopes.slice();
          if (eligibleForCache) {
            try {
              const toCache = typeof Object.freeze === 'function' ? Object.freeze(result.slice()) : result.slice();
              CANDIDATE_SCOPES_CACHE.set(targetScope, toCache);
            } catch (cacheWriteError) {
              void cacheWriteError;
            }
          }
          return result;
        }
      } catch (error) {
        void error;
      }
    }

    if (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.collectCandidateScopes === 'function') {
      try {
        const fromContext = ENVIRONMENT_CONTEXT.collectCandidateScopes(targetScope);
        if (Array.isArray(fromContext) && fromContext.length > 0) {
          const result = fromContext.slice();
          if (eligibleForCache) {
            try {
              const toCache = typeof Object.freeze === 'function' ? Object.freeze(result.slice()) : result.slice();
              CANDIDATE_SCOPES_CACHE.set(targetScope, toCache);
            } catch (cacheWriteError) {
              void cacheWriteError;
            }
          }
          return result;
        }
      } catch (error) {
        void error;
      }
    }

    const fallbackScopes = fallbackCollectCandidateScopes(targetScope);
    const result = Array.isArray(fallbackScopes) ? fallbackScopes.slice() : [];
    if (eligibleForCache && result.length > 0) {
      try {
        const toCache = typeof Object.freeze === 'function' ? Object.freeze(result.slice()) : result.slice();
        CANDIDATE_SCOPES_CACHE.set(targetScope, toCache);
      } catch (cacheWriteError) {
        void cacheWriteError;
      }
    }
    return result;
  }

  const MODULE_ENV =
    (MODULE_LINKER && typeof MODULE_LINKER.getModuleEnvironment === 'function'
      ? MODULE_LINKER.getModuleEnvironment()
      : null)
    || (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveModuleEnvironment === 'function'
      ? ENVIRONMENT_CONTEXT.resolveModuleEnvironment(GLOBAL_SCOPE)
      : null)
    || fallbackLoadModuleEnvironment(GLOBAL_SCOPE);

  const ENV_BRIDGE =
    (MODULE_LINKER && typeof MODULE_LINKER.getEnvironmentBridge === 'function'
      ? MODULE_LINKER.getEnvironmentBridge()
      : null)
    || (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveEnvironmentBridge === 'function'
      ? ENVIRONMENT_CONTEXT.resolveEnvironmentBridge(GLOBAL_SCOPE)
      : null)
    || fallbackLoadEnvironmentBridge(GLOBAL_SCOPE);

  const MODULE_GLOBALS =
    (MODULE_LINKER && typeof MODULE_LINKER.getModuleGlobals === 'function'
      ? MODULE_LINKER.getModuleGlobals()
      : null)
    || (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveModuleGlobals === 'function'
      ? ENVIRONMENT_CONTEXT.resolveModuleGlobals(GLOBAL_SCOPE)
      : null)
    || fallbackResolveModuleGlobals(GLOBAL_SCOPE);

  function informModuleGlobals(name, api) {
    if (MODULE_LINKER && typeof MODULE_LINKER.recordModule === 'function') {
      MODULE_LINKER.recordModule(name, api);
    }

    if (!MODULE_GLOBALS || typeof MODULE_GLOBALS.recordModule !== 'function') {
      return;
    }

    try {
      MODULE_GLOBALS.recordModule(name, api);
    } catch (error) {
      void error;
    }
  }

  const tryRequire = (function resolveTryRequire() {
    if (MODULE_LINKER && typeof MODULE_LINKER.tryRequire === 'function') {
      return MODULE_LINKER.tryRequire;
    }

    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.tryRequire === 'function') {
      return function tryRequireWithSystem(modulePath) {
        const result = MODULE_SYSTEM.tryRequire(modulePath);
        return typeof result === 'undefined' ? fallbackTryRequire(modulePath) : result;
      };
    }

    if (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.tryRequire === 'function') {
      return function tryRequireThroughContext(modulePath) {
        const result = ENVIRONMENT_CONTEXT.tryRequire(modulePath);
        return typeof result === 'undefined' ? fallbackTryRequire(modulePath) : result;
      };
    }

    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.tryRequire === 'function') {
      return MODULE_GLOBALS.tryRequire;
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.tryRequire === 'function') {
      return function bridgeTryRequire(modulePath) {
        const result = ENV_BRIDGE.tryRequire(modulePath);
        return typeof result === 'undefined' ? fallbackTryRequire(modulePath) : result;
      };
    }

    if (MODULE_ENV && typeof MODULE_ENV.tryRequire === 'function') {
      return MODULE_ENV.tryRequire;
    }

    return fallbackTryRequire;
  })();

  function fallbackResolveModuleRegistry(scope) {
    const targetScope = scope || GLOBAL_SCOPE;

    if (MODULE_LINKER && typeof MODULE_LINKER.getModuleRegistry === 'function') {
      const linked = MODULE_LINKER.getModuleRegistry(targetScope);
      if (linked) {
        return linked;
      }
    }

    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.resolveModuleRegistry === 'function') {
      try {
        const resolved = MODULE_GLOBALS.resolveModuleRegistry(targetScope);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.getModuleRegistry === 'function') {
      try {
        const bridged = ENV_BRIDGE.getModuleRegistry(targetScope);
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

    const required = tryRequire('./registry.js');
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

  function resolveModuleRegistry(scope) {
    const targetScope = scope || GLOBAL_SCOPE;

    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.getModuleRegistry === 'function') {
      try {
        const resolved = MODULE_SYSTEM.getModuleRegistry(targetScope);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }

    if (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveModuleRegistry === 'function') {
      try {
        const resolved = ENVIRONMENT_CONTEXT.resolveModuleRegistry(targetScope);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackResolveModuleRegistry(targetScope);
  }

  const MODULE_REGISTRY = (function () {
    if (MODULE_LINKER && typeof MODULE_LINKER.getModuleRegistry === 'function') {
      const linked = MODULE_LINKER.getModuleRegistry(GLOBAL_SCOPE);
      if (linked) {
        return linked;
      }
    }

    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.getModuleRegistry === 'function') {
      try {
        const viaSystem = MODULE_SYSTEM.getModuleRegistry(GLOBAL_SCOPE);
        if (viaSystem) {
          return viaSystem;
        }
      } catch (error) {
        void error;
      }
    }

    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.getModuleRegistry === 'function') {
      try {
        const shared = MODULE_GLOBALS.getModuleRegistry(GLOBAL_SCOPE);
        if (shared) {
          return shared;
        }
      } catch (error) {
        void error;
      }
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.getModuleRegistry === 'function') {
      try {
        const bridged = ENV_BRIDGE.getModuleRegistry(GLOBAL_SCOPE);
        if (bridged) {
          return bridged;
        }
      } catch (error) {
        void error;
      }
    }

    if (MODULE_ENV && typeof MODULE_ENV.getModuleRegistry === 'function') {
      try {
        const provided = MODULE_ENV.getModuleRegistry(GLOBAL_SCOPE);
        if (provided) {
          return provided;
        }
      } catch (error) {
        void error;
      }
    }
    return resolveModuleRegistry();
  })();

  const PENDING_QUEUE_KEY = (function resolvePendingKey() {
    if (MODULE_LINKER && typeof MODULE_LINKER.getPendingQueueKey === 'function') {
      const linkedKey = MODULE_LINKER.getPendingQueueKey();
      if (typeof linkedKey === 'string' && linkedKey) {
        return linkedKey;
      }
    }

    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.getPendingQueueKey === 'function') {
      try {
        const systemKey = MODULE_SYSTEM.getPendingQueueKey();
        if (typeof systemKey === 'string' && systemKey) {
          return systemKey;
        }
      } catch (error) {
        void error;
      }
    }

    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.getPendingQueueKey === 'function') {
      try {
        const sharedKey = MODULE_GLOBALS.getPendingQueueKey();
        if (typeof sharedKey === 'string' && sharedKey) {
          return sharedKey;
        }
      } catch (error) {
        void error;
      }
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.getPendingQueueKey === 'function') {
      try {
        const bridgedKey = ENV_BRIDGE.getPendingQueueKey();
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
  })();

  function cloneOptions(options) {
    if (!options || typeof options !== 'object') {
      return {};
    }

    const copy = {};
    const keys = Object.keys(options);
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
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
        const bridged = ENV_BRIDGE.queueModuleRegistration(name, api, options);
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

    if (!GLOBAL_SCOPE || typeof GLOBAL_SCOPE !== 'object') {
      return false;
    }

    const payload = Object.freeze({
      name,
      api,
      options: Object.freeze(cloneOptions(options)),
    });

    let queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
    if (!Array.isArray(queue)) {
      try {
        Object.defineProperty(GLOBAL_SCOPE, PENDING_QUEUE_KEY, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: [],
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
      return { ok: false, error: null, reason: 'missing-registry' };
    }

    const moduleName = typeof name === 'string' ? name : '';
    if (!moduleName) {
      return { ok: false, error: new TypeError('cineRuntime expected a module name.'), reason: 'invalid-name' };
    }

    if (typeof MODULE_REGISTRY.has === 'function') {
      try {
        if (MODULE_REGISTRY.has(moduleName)) {
          if (typeof MODULE_REGISTRY.get === 'function') {
            try {
              const existing = MODULE_REGISTRY.get(moduleName);
              if (existing) {
                informModuleGlobals(moduleName, existing);
              }
            } catch (getError) {
              void getError;
            }
          }
          return { ok: true, alreadyRegistered: true };
        }
      } catch (hasError) {
        return { ok: false, error: hasError, reason: 'registry-check-failed' };
      }
    }

    try {
      const registered = MODULE_REGISTRY.register(moduleName, api, options);
      informModuleGlobals(moduleName, registered || api);
      return { ok: true, registered: true };
    } catch (error) {
      return { ok: false, error, reason: 'register-failed' };
    }
  }

  function fallbackRegisterOrQueue(name, api, options, onError) {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.registerModule === 'function') {
      const registered = MODULE_SYSTEM.registerModule(name, api, options, GLOBAL_SCOPE, onError);
      if (registered) {
        informModuleGlobals(name, api);
        return true;
      }
      return false;
    }

    let lastError = null;
    const directAttempt = attemptRegistryRegistration(name, api, options);
    if (directAttempt.ok) {
      return true;
    }

    lastError = directAttempt.error || null;

    const syncResult = synchronizeModuleLinks({ warn: false });
    if (
      syncResult
      && ((syncResult.flushed && syncResult.flushed.processed > 0) || syncResult.ok)
    ) {
      const retryAttempt = attemptRegistryRegistration(name, api, options);
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

  const registerOrQueueModule = (function resolveRegisterOrQueue() {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.registerModule === 'function') {
      return function registerWithSystem(name, api, options, onError) {
        const registered = MODULE_SYSTEM.registerModule(name, api, options, GLOBAL_SCOPE, onError);
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
          const registered = MODULE_GLOBALS.registerOrQueueModule(
            name,
            api,
            options,
            onError,
            GLOBAL_SCOPE,
            MODULE_REGISTRY,
          );
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
          const bridged = ENV_BRIDGE.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, MODULE_REGISTRY);
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
  })();



  function isNodeProcessReference(value) {
    if (!value) {
      return false;
    }

    if (typeof process === 'undefined' || !process) {
      return false;
    }

    if (value === process) {
      return true;
    }

    if (typeof value === 'object') {
      try {
        if (value.constructor && value.constructor.name === 'process') {
          return true;
        }
      } catch (processInspectionError) {
        void processInspectionError;
      }

      if (
        typeof value.pid === 'number' &&
        typeof value.nextTick === 'function' &&
        typeof value.emit === 'function' &&
        typeof value.binding === 'function'
      ) {
        return true;
      }
    }

    if (typeof value === 'function') {
      if (
        value === process.binding ||
        value === process._linkedBinding ||
        value === process.dlopen
      ) {
        return true;
      }

      try {
        const functionName = value.name || '';
        if (functionName && (functionName === 'binding' || functionName === 'dlopen')) {
          const source = Function.prototype.toString.call(value);
          if (source && source.indexOf('[native code]') !== -1) {
            return true;
          }
        }
      } catch (functionInspectionError) {
        void functionInspectionError;
      }
    }

    return false;
  }

  function shouldBypassDeepFreeze(value) {
    if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
      return false;
    }

    if (isNodeProcessReference(value)) {
      return true;
    }

    if (
      typeof process !== 'undefined' &&
      process &&
      process.release &&
      process.release.name === 'node'
    ) {
      return true;
    }

    try {
      if (
        typeof module !== 'undefined' &&
        module &&
        typeof module.constructor === 'function' &&
        value instanceof module.constructor
      ) {
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

  const FULLY_FROZEN_OBJECTS = typeof WeakSet === 'function' ? new WeakSet() : null;

  function fallbackResolveSeenTracker(seen) {
    if (seen && typeof seen.has === 'function' && typeof seen.add === 'function') {
      return seen;
    }

    if (Array.isArray(seen)) {
      return {
        has(value) {
          return seen.indexOf(value) !== -1;
        },
        add(value) {
          if (seen.indexOf(value) === -1) {
            seen.push(value);
          }
        },
      };
    }

    if (typeof WeakSet === 'function') {
      try {
        return new WeakSet();
      } catch (trackerError) {
        void trackerError;
      }
    }

    const tracked = [];
    return {
      has(value) {
        return tracked.indexOf(value) !== -1;
      },
      add(value) {
        if (tracked.indexOf(value) === -1) {
          tracked.push(value);
        }
      },
    };
  }

  function fallbackFreezeDeep(value, seen) {
    if (!value || typeof value !== 'object') {
      return value;
    }

    if (shouldBypassDeepFreeze(value)) {
      return value;
    }

    if (FULLY_FROZEN_OBJECTS && FULLY_FROZEN_OBJECTS.has(value)) {
      return value;
    }

    const tracker = fallbackResolveSeenTracker(seen);

    if (tracker.has(value)) {
      return value;
    }

    tracker.add(value);

    let alreadyFrozen = false;
    if (typeof Object.isFrozen === 'function') {
      try {
        alreadyFrozen = Object.isFrozen(value);
      } catch (inspectionError) {
        void inspectionError;
        alreadyFrozen = false;
      }
    }

    let keys = [];
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
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      if (key === 'web3' && value === GLOBAL_SCOPE) {
        // Touching the deprecated MetaMask web3 shim triggers warning logs; skip it while
        // preserving the freeze behavior for the remaining global properties.
        continue;
      }

      let hasOwn = true;
      try {
        hasOwn = Object.prototype.hasOwnProperty.call(value, key);
      } catch (hasOwnError) {
        void hasOwnError;
        hasOwn = true;
      }
      if (!hasOwn) {
        continue;
      }

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

      try {
      fallbackFreezeDeep(child, tracker);
      } catch (childError) {
        void childError;
      }
    }

    if (alreadyFrozen) {
      if (FULLY_FROZEN_OBJECTS) {
        try {
          FULLY_FROZEN_OBJECTS.add(value);
        } catch (cacheError) {
          void cacheError;
        }
      }
      return value;
    }

    try {
      const frozen = Object.freeze(value);
      if (FULLY_FROZEN_OBJECTS) {
        try {
          FULLY_FROZEN_OBJECTS.add(frozen || value);
        } catch (cacheError) {
          void cacheError;
        }
      }
      return frozen;
    } catch (freezeError) {
      void freezeError;
      return value;
    }
  }

  const freezeDeep = (function resolveFreezeDeep() {
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
  })();

  function enforceShallowFreeze(target) {
    if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
      return target;
    }

    try {
      if (typeof Object.preventExtensions === 'function') {
        Object.preventExtensions(target);
      }
    } catch (preventError) {
      void preventError;
    }

    try {
      if (typeof Object.seal === 'function') {
        Object.seal(target);
      }
    } catch (sealError) {
      void sealError;
    }

    const keys = [];

    try {
      const ownNames = Object.getOwnPropertyNames(target);
      for (let index = 0; index < ownNames.length; index += 1) {
        keys.push(ownNames[index]);
      }
    } catch (nameError) {
      void nameError;
    }

    if (typeof Object.getOwnPropertySymbols === 'function') {
      try {
        const symbols = Object.getOwnPropertySymbols(target);
        for (let index = 0; index < symbols.length; index += 1) {
          keys.push(symbols[index]);
        }
      } catch (symbolError) {
        void symbolError;
      }
    }

    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];

      let descriptor;
      try {
        descriptor = Object.getOwnPropertyDescriptor(target, key);
      } catch (descriptorError) {
        void descriptorError;
        descriptor = null;
      }

      if (!descriptor) {
        continue;
      }

      const requiresLock =
        descriptor.configurable === true ||
        ('writable' in descriptor && descriptor.writable === true);

      if (!requiresLock) {
        continue;
      }

      const nextDescriptor = {
        configurable: false,
        enumerable: !!descriptor.enumerable,
      };

      if (Object.prototype.hasOwnProperty.call(descriptor, 'value')) {
        nextDescriptor.value = descriptor.value;
        nextDescriptor.writable = false;
      } else {
        nextDescriptor.get = descriptor.get;
        nextDescriptor.set = descriptor.set;
      }

      try {
        Object.defineProperty(target, key, nextDescriptor);
      } catch (defineError) {
        void defineError;
      }
    }

    return target;
  }

  function ensureDeepFrozen(value) {
    const frozen = freezeDeep(value);
    if (Object.isFrozen(frozen)) {
      return frozen;
    }

    try {
      const result = Object.freeze(frozen);
      if (Object.isFrozen(result)) {
        return result;
      }
    } catch (error) {
      void error;
    }

    enforceShallowFreeze(frozen);
    return frozen;
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

  const safeWarn = (function resolveSafeWarn() {
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
  })();

  function ensureRegistryBinding(scope, registry) {
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return { ok: false, reason: 'invalid-scope' };
    }

    const targetRegistry = registry || MODULE_REGISTRY;
    if (!targetRegistry) {
      return { ok: false, reason: 'missing-registry' };
    }

    try {
      const existing = scope.cineModules;
      if (existing === targetRegistry) {
        return { ok: true, already: true };
      }

      Object.defineProperty(scope, 'cineModules', {
        configurable: true,
        enumerable: false,
        value: targetRegistry,
        writable: false,
      });
      return { ok: true, updated: true };
    } catch (defineError) {
      void defineError;
      try {
        scope.cineModules = targetRegistry;
        if (scope.cineModules === targetRegistry) {
          return { ok: true, updated: true };
        }
      } catch (assignmentError) {
        void assignmentError;
        return { ok: false, reason: 'expose-failed', error: assignmentError || defineError };
      }
    }

    return { ok: true, updated: true };
  }

  function getPendingQueueFromScope(scope, queueKey) {
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return null;
    }

    try {
      const queue = scope[queueKey];
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

  function flushPendingModuleQueues(options = {}) {
    const registry = options.registry || MODULE_REGISTRY;
    const queueKey = typeof options.queueKey === 'string' && options.queueKey
      ? options.queueKey
      : PENDING_QUEUE_KEY;

    if (!registry || typeof registry.register !== 'function') {
      return ensureDeepFrozen({
        ok: false,
        processed: 0,
        requeued: 0,
        scopes: 0,
        queueKey,
        failures: ensureDeepFrozen([{ reason: 'missing-registry' }]),
      });
    }

    const scopes = Array.isArray(options.scopes) && options.scopes.length > 0
      ? options.scopes.slice()
      : collectCandidateScopes(options.scope || GLOBAL_SCOPE);

    let processed = 0;
    let requeued = 0;
    let touchedScopes = 0;
    const failures = [];

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      const queue = getPendingQueueFromScope(scope, queueKey);
      if (!queue || queue.length === 0) {
        continue;
      }

      touchedScopes += 1;
      const pending = queue.slice();
      queue.length = 0;

      for (let entryIndex = 0; entryIndex < pending.length; entryIndex += 1) {
        const entry = pending[entryIndex];
        if (!entry || typeof entry !== 'object') {
          continue;
        }

        const name = typeof entry.name === 'string' ? entry.name : '';
        if (!name) {
          continue;
        }

        const api = entry.api;
        const entryOptions = cloneOptions(entry.options);

        if (typeof registry.has === 'function') {
          let alreadyRegistered = false;
          try {
            alreadyRegistered = registry.has(name);
          } catch (hasError) {
            failures.push({
              name,
              message: hasError && typeof hasError.message === 'string' ? hasError.message : null,
              reason: 'has-check-failed',
              scopeIndex: index,
            });
          }

          if (alreadyRegistered) {
            processed += 1;
            continue;
          }
        }

        try {
          const registered = registry.register(name, api, entryOptions);
          informModuleGlobals(name, registered || api);
          processed += 1;
        } catch (error) {
          requeued += 1;
          requeuePendingEntry(queue, entry);
          failures.push({
            name,
            message: error && typeof error.message === 'string' ? error.message : null,
            reason: 'register-failed',
            scopeIndex: index,
          });
        }
      }
    }

    if (failures.length > 0 && options.warn) {
      safeWarn(
        'cineRuntime.flushPendingModuleQueues() encountered issues while replaying module registrations.',
        failures,
      );
    }

    return ensureDeepFrozen({
      ok: failures.length === 0,
      processed,
      requeued,
      scopes: touchedScopes,
      queueKey,
      failures: failures.length > 0 ? ensureDeepFrozen(failures) : ensureDeepFrozen([]),
    });
  }

  function synchronizeModuleLinks(options = {}) {
    const registry = options.registry || MODULE_REGISTRY;
    const queueKey = typeof options.queueKey === 'string' && options.queueKey
      ? options.queueKey
      : PENDING_QUEUE_KEY;

    const scopes = Array.isArray(options.scopes) && options.scopes.length > 0
      ? options.scopes.slice()
      : collectCandidateScopes(options.scope || GLOBAL_SCOPE);

    const exposureDetails = [];
    const exposureFailures = [];

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      const exposure = ensureRegistryBinding(scope, registry);
      exposureDetails.push({
        scopeIndex: index,
        ok: !!exposure.ok,
        updated: !!exposure.updated,
        already: !!exposure.already,
        reason: typeof exposure.reason === 'string' ? exposure.reason : null,
      });

      if (!exposure.ok && exposure.reason !== 'missing-registry') {
        exposureFailures.push({
          scopeIndex: index,
          reason: exposure.reason || 'expose-failed',
          message:
            exposure.error && typeof exposure.error.message === 'string'
              ? exposure.error.message
              : null,
        });
      }
    }

    if (exposureFailures.length > 0 && options.warn !== false) {
      safeWarn(
        'cineRuntime.synchronizeModuleLinks() could not expose cineModules on every scope.',
        exposureFailures,
      );
    }

    const flushResult = flushPendingModuleQueues({
      registry,
      queueKey,
      scopes,
      warn: options.warn !== false,
    });

    const combinedFailures = [];
    if (Array.isArray(flushResult.failures)) {
      for (let index = 0; index < flushResult.failures.length; index += 1) {
        combinedFailures.push(flushResult.failures[index]);
      }
    }
    if (exposureFailures.length > 0) {
      for (let index = 0; index < exposureFailures.length; index += 1) {
        combinedFailures.push(exposureFailures[index]);
      }
    }

    const result = {
      ok: flushResult.ok && exposureFailures.length === 0,
      queueKey,
      exposures: exposureDetails,
      flushed: flushResult,
      failures: combinedFailures,
    };

    return ensureDeepFrozen(result);
  }

  const INITIAL_MODULE_LINK_STATE = synchronizeModuleLinks({ warn: false });

  function inspectModuleConnections(options = {}) {
    const registry = options.registry || MODULE_REGISTRY;

    if (!registry || typeof registry.list !== 'function' || typeof registry.describe !== 'function') {
      return ensureDeepFrozen({
        ok: false,
        reason: 'missing-registry',
        modules: [],
        missingConnections: [],
        errors: [],
      });
    }

    let names;
    try {
      names = registry.list();
    } catch (error) {
      return ensureDeepFrozen({
        ok: false,
        reason: 'list-failed',
        modules: [],
        missingConnections: [],
        errors: ensureDeepFrozen([
          {
            type: 'list',
            message: error && typeof error.message === 'string' ? error.message : null,
          },
        ]),
      });
    }

    const moduleNames = Array.isArray(names) ? names.slice() : [];
    const modules = [];
    const missingConnections = [];
    const errors = [];

    const hasConnection = typeof registry.has === 'function'
      ? function hasViaRegistry(name) {
          try {
            return registry.has(name);
          } catch (error) {
            errors.push({
              type: 'has',
              module: name,
              message: error && typeof error.message === 'string' ? error.message : null,
            });
            return moduleNames.indexOf(name) !== -1;
          }
        }
      : function hasViaList(name) {
          return moduleNames.indexOf(name) !== -1;
        };

    for (let index = 0; index < moduleNames.length; index += 1) {
      const name = moduleNames[index];
      let meta = null;

      try {
        meta = registry.describe(name);
      } catch (error) {
        errors.push({
          type: 'describe',
          module: name,
          message: error && typeof error.message === 'string' ? error.message : null,
        });
      }

      const connectionSet = new Set();
      const connectionList = [];
      const missingList = [];

      if (meta && meta.connections && typeof meta.connections[Symbol.iterator] === 'function') {
        for (const connection of meta.connections) {
          if (typeof connection !== 'string') {
            continue;
          }
          const trimmed = connection.trim();
          if (!trimmed || connectionSet.has(trimmed)) {
            continue;
          }

          connectionSet.add(trimmed);
          connectionList.push(trimmed);

          if (!hasConnection(trimmed)) {
            missingList.push(trimmed);
            missingConnections.push({ from: name, to: trimmed });
          }
        }
      }

      modules.push(
        ensureDeepFrozen({
          name,
          connections: connectionList,
          missing: missingList,
          ok: missingList.length === 0,
        }),
      );
    }

    return ensureDeepFrozen({
      ok: missingConnections.length === 0,
      modules,
      missingConnections,
      errors,
    });
  }

  function fallbackExposeGlobal(name, value) {
    if (!GLOBAL_SCOPE || typeof GLOBAL_SCOPE !== 'object') {
      return false;
    }
    try {
      Object.defineProperty(GLOBAL_SCOPE, name, {
        configurable: true,
        enumerable: false,
        value,
        writable: false,
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

  const exposeGlobal = (function resolveExposeGlobal() {
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
  })();

  const MODULE_NAMES = ['cinePersistence', 'cineOffline', 'cineUi'];

  const REQUIRED_PERSISTENCE_FUNCTIONS = [
    'storage.loadDeviceData',
    'storage.saveDeviceData',
    'storage.loadSetups',
    'storage.saveSetups',
    'storage.saveSetup',
    'storage.loadSetup',
    'storage.deleteSetup',
    'storage.renameSetup',
    'storage.loadSessionState',
    'storage.saveSessionState',
    'storage.saveProject',
    'storage.loadProject',
    'storage.deleteProject',
    'storage.exportAllData',
    'storage.importAllData',
    'storage.clearAllData',
    'storage.loadFavorites',
    'storage.saveFavorites',
    'storage.loadFeedback',
    'storage.saveFeedback',
    'storage.loadAutoGearRules',
    'storage.saveAutoGearRules',
    'storage.loadAutoGearBackups',
    'storage.saveAutoGearBackups',
    'storage.loadAutoGearSeedFlag',
    'storage.saveAutoGearSeedFlag',
    'storage.loadAutoGearBackupRetention',
    'storage.saveAutoGearBackupRetention',
    'storage.getAutoGearBackupRetentionDefault',
    'storage.loadAutoGearPresets',
    'storage.saveAutoGearPresets',
    'storage.loadAutoGearActivePresetId',
    'storage.saveAutoGearActivePresetId',
    'storage.loadAutoGearAutoPresetId',
    'storage.saveAutoGearAutoPresetId',
    'storage.loadAutoGearMonitorDefaults',
    'storage.saveAutoGearMonitorDefaults',
    'storage.loadAutoGearBackupVisibility',
    'storage.saveAutoGearBackupVisibility',
    'storage.loadFullBackupHistory',
    'storage.saveFullBackupHistory',
    'storage.recordFullBackupHistoryEntry',
    'storage.requestPersistentStorage',
    'storage.clearUiCacheStorageEntries',
    'storage.ensureCriticalStorageBackups',
    'storage.getLastCriticalStorageGuardResult',
    'autosave.saveSession',
    'autosave.autoSaveSetup',
    'autosave.saveGearList',
    'autosave.restoreSessionState',
    'backups.collectFullBackupData',
    'backups.createSettingsBackup',
    'backups.captureStorageSnapshot',
    'backups.sanitizeBackupPayload',
    'backups.autoBackup',
    'backups.formatFullBackupFilename',
    'backups.downloadPayload',
    'backups.recordFullBackupHistoryEntry',
    'restore.proceed',
    'restore.abort',
    'share.downloadProject',
    'share.encodeSharedSetup',
    'share.decodeSharedSetup',
    'share.applySharedSetup',
    'share.applySharedSetupFromUrl'
  ];

  const REQUIRED_OFFLINE_FUNCTIONS = [
    'registerServiceWorker',
    'reloadApp'
  ];

  const REQUIRED_UI_CONTROLLERS = [
    { name: 'deviceManagerSection', actions: ['show', 'hide', 'toggle'] },
    { name: 'shareDialog', actions: ['open', 'submit', 'cancel', 'dismiss'] },
    { name: 'sharedImportDialog', actions: ['submit', 'cancel', 'dismiss', 'changeMode'] },
    { name: 'backupSettings', actions: ['execute'] },
    { name: 'restoreSettings', actions: ['openPicker', 'processFile'] }
  ];

  const REQUIRED_UI_INTERACTIONS = [
    'saveSetup',
    'deleteSetup',
    'shareOpen',
    'shareSubmit',
    'shareCancel',
    'shareApplyFile',
    'shareInputChange',
    'sharedImportSubmit',
    'sharedImportCancel',
    'performBackup',
    'openRestorePicker',
    'applyRestoreFile'
  ];

  const REQUIRED_UI_HELP_ENTRIES = [
    'saveSetup',
    'autoBackupBeforeDeletion',
    'shareProject',
    'sharedImport',
    'backupSettings',
    'restoreSettings'
  ];

  function resolveModule(name) {
    if (!name || !MODULE_NAMES.includes(name)) {
      throw new TypeError(`cineRuntime cannot resolve unknown module "${name}".`);
    }

    if (MODULE_REGISTRY && typeof MODULE_REGISTRY.get === 'function') {
      try {
        const registered = MODULE_REGISTRY.get(name);
        if (registered) {
          return registered;
        }
      } catch (error) {
        void error;
      }
    }

    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
      try {
        const existing = GLOBAL_SCOPE[name];
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

  function ensureModule(name, options = {}) {
    const resolved = resolveModule(name);
    if (!resolved && options.optional) {
      return null;
    }
    if (!resolved) {
      throw new Error(`cineRuntime could not locate ${name}.`);
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
    const segments = parsePath(path);
    let current = root;
    let traversed = prefix ? `${prefix}` : '';

    for (let index = 0; index < segments.length; index += 1) {
      const segment = segments[index];
      traversed = traversed ? `${traversed}.${segment}` : segment;
      if (!current || (typeof current !== 'object' && typeof current !== 'function')) {
        missing.push(traversed);
        detailMap[traversed] = false;
        return;
      }
      current = current[segment];
    }

    const finalPath = prefix ? `${prefix}.${segments.join('.')}` : segments.join('.');
    const ok = typeof current === 'function';
    if (!ok) {
      missing.push(finalPath);
    }
    detailMap[finalPath] = ok;
  }

  function inspectPersistenceModule(persistenceModule, missing, detailMap) {
    if (!persistenceModule || typeof persistenceModule !== 'object') {
      return;
    }

    for (let index = 0; index < REQUIRED_PERSISTENCE_FUNCTIONS.length; index += 1) {
      inspectFunctionPath(
        persistenceModule,
        REQUIRED_PERSISTENCE_FUNCTIONS[index],
        missing,
        detailMap,
        'cinePersistence',
      );
    }

    const internal = persistenceModule.__internal;
    const inspector = internal && typeof internal.inspectBinding === 'function'
      ? internal.inspectBinding.bind(internal)
      : null;

    if (!inspector) {
      const key = 'cinePersistence.__internal.inspectBinding';
      missing.push(key);
      detailMap[key] = false;
      return;
    }

    for (let index = 0; index < REQUIRED_PERSISTENCE_FUNCTIONS.length; index += 1) {
      const path = REQUIRED_PERSISTENCE_FUNCTIONS[index];
      const segments = parsePath(path);
      const bindingName = segments[segments.length - 1];
      const bindingPath = `cinePersistence.bindings.${bindingName}`;

      let detail = null;
      try {
        detail = inspector(bindingName, { refresh: true });
      } catch (error) {
        void error;
        detail = null;
      }

      const available = !!(detail && detail.available);
      if (!available) {
        missing.push(bindingPath);
      }
      detailMap[bindingPath] = available;
      if (detail) {
        detailMap[`${bindingPath}.provider`] = detail.providerName || null;
      }
    }
  }

  function inspectOfflineFunctions(module, missing, detailMap) {
    for (let index = 0; index < REQUIRED_OFFLINE_FUNCTIONS.length; index += 1) {
      const name = REQUIRED_OFFLINE_FUNCTIONS[index];
      const fn = module ? module[name] : null;
      const path = `cineOffline.${name}`;
      const ok = typeof fn === 'function';
      if (!ok) {
        missing.push(path);
      }
      detailMap[path] = ok;
    }
  }

  function inspectUiControllers(uiModule, missing, detailMap) {
    const controllers = uiModule && uiModule.controllers;
    const getter = controllers && typeof controllers.get === 'function'
      ? controllers.get.bind(controllers)
      : null;

    for (let index = 0; index < REQUIRED_UI_CONTROLLERS.length; index += 1) {
      const descriptor = REQUIRED_UI_CONTROLLERS[index];
      const pathPrefix = `cineUi.controllers.${descriptor.name}`;

      if (!getter) {
        missing.push(pathPrefix);
        detailMap[pathPrefix] = false;
        continue;
      }

      let entry = null;
      try {
        entry = getter(descriptor.name);
      } catch (error) {
        void error;
        entry = null;
      }

      const entryOk = !!entry && typeof entry === 'object';
      if (!entryOk) {
        missing.push(pathPrefix);
        detailMap[pathPrefix] = false;
        continue;
      }

      detailMap[pathPrefix] = true;

      for (let actionIndex = 0; actionIndex < descriptor.actions.length; actionIndex += 1) {
        const actionName = descriptor.actions[actionIndex];
        const actionPath = `${pathPrefix}.${actionName}`;
        const action = entry[actionName];
        const actionOk = typeof action === 'function';
        if (!actionOk) {
          missing.push(actionPath);
        }
        detailMap[actionPath] = actionOk;
      }
    }
  }

  function inspectUiInteractions(uiModule, missing, detailMap) {
    const interactions = uiModule && uiModule.interactions;
    const getter = interactions && typeof interactions.get === 'function'
      ? interactions.get.bind(interactions)
      : null;

    for (let index = 0; index < REQUIRED_UI_INTERACTIONS.length; index += 1) {
      const name = REQUIRED_UI_INTERACTIONS[index];
      const path = `cineUi.interactions.${name}`;

      if (!getter) {
        missing.push(path);
        detailMap[path] = false;
        continue;
      }

      let handler = null;
      try {
        handler = getter(name);
      } catch (error) {
        void error;
        handler = null;
      }

      const ok = typeof handler === 'function';
      if (!ok) {
        missing.push(path);
      }
      detailMap[path] = ok;
    }
  }

  function inspectUiHelp(uiModule, missing, detailMap) {
    const help = uiModule && uiModule.help;
    const resolver = help && typeof help.resolve === 'function'
      ? help.resolve.bind(help)
      : null;

    for (let index = 0; index < REQUIRED_UI_HELP_ENTRIES.length; index += 1) {
      const name = REQUIRED_UI_HELP_ENTRIES[index];
      const path = `cineUi.help.${name}`;

      if (!resolver) {
        missing.push(path);
        detailMap[path] = false;
        continue;
      }

      let value = null;
      try {
        value = resolver(name);
      } catch (error) {
        void error;
        value = null;
      }

      const ok = typeof value === 'string' && !!value.trim();
      if (!ok) {
        missing.push(path);
      }
      detailMap[path] = ok;
    }
  }

  function listCriticalChecks() {
    return ensureDeepFrozen({
      cinePersistence: REQUIRED_PERSISTENCE_FUNCTIONS.slice(),
      cineOffline: REQUIRED_OFFLINE_FUNCTIONS.slice(),
      cineUi: {
        controllers: REQUIRED_UI_CONTROLLERS.map(entry => ({
          name: entry.name,
          actions: entry.actions.slice()
        })),
        interactions: REQUIRED_UI_INTERACTIONS.slice(),
        help: REQUIRED_UI_HELP_ENTRIES.slice(),
      },
    });
  }

  function verifyCriticalFlows(options = {}) {
    const synchronization = synchronizeModuleLinks({ warn: options.warnOnFailure });
    const missing = [];
    const detailMap = {};

    if (synchronization && typeof synchronization === 'object') {
      detailMap['synchronization.ok'] = !!synchronization.ok;
      if (Array.isArray(synchronization.failures) && synchronization.failures.length > 0) {
        detailMap['synchronization.failures'] = synchronization.failures;
      }
      if (!synchronization.ok) {
        missing.push('cineRuntime synchronization');
      }
    }

    let registrySnapshot = null;
    if (MODULE_REGISTRY && typeof MODULE_REGISTRY.assertRegistered === 'function') {
      try {
        registrySnapshot = MODULE_REGISTRY.assertRegistered(MODULE_NAMES);
      } catch (error) {
        safeWarn('cineRuntime.verifyCriticalFlows() could not inspect cineModules registry.', error);
      }
    }

    const persistence = resolveModule('cinePersistence');
    const offline = resolveModule('cineOffline');
    const ui = resolveModule('cineUi');

    const modulePresence = {
      cinePersistence: !!persistence,
      cineOffline: !!offline,
      cineUi: !!ui,
    };

    if (registrySnapshot && registrySnapshot.detail) {
      const registryDetail = {};
      const detailKeys = Object.keys(registrySnapshot.detail);
      for (let index = 0; index < detailKeys.length; index += 1) {
        const key = detailKeys[index];
        const registered = !!registrySnapshot.detail[key];
        registryDetail[key] = registered;
        detailMap[`${key}.registered`] = registered;
        if (!registered) {
          missing.push(`${key} (not registered)`);
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

    const ok = missing.length === 0;
    const result = ensureDeepFrozen({
      ok,
      missing: missing.slice(),
      modules: ensureDeepFrozen(modulePresence),
      details: ensureDeepFrozen(detailMap),
      registry: registrySnapshot ? ensureDeepFrozen(registrySnapshot) : null,
      checks: listCriticalChecks(),
      synchronization,
    });

    if (!ok) {
      if (options.warnOnFailure) {
        safeWarn('cineRuntime.verifyCriticalFlows() detected missing safeguards.', missing);
      }
      if (options.throwOnFailure) {
        const error = new Error('cineRuntime integrity verification failed.');
        error.details = result;
        throw error;
      }
    }

    return result;
  }

  const runtimeAPI = ensureDeepFrozen({
    getPersistence(options) {
      return ensureModule('cinePersistence', options);
    },
    getOffline(options) {
      return ensureModule('cineOffline', options);
    },
    getUi(options) {
      return ensureModule('cineUi', options);
    },
    getModuleRegistry() {
      return MODULE_REGISTRY || null;
    },
    synchronizeModules(options) {
      return synchronizeModuleLinks(options || {});
    },
    inspectModuleConnections(options) {
      return inspectModuleConnections(options || {});
    },
    listCriticalChecks,
    verifyCriticalFlows,
    __internal: ensureDeepFrozen({
      resolveModule,
      ensureModule,
      listCriticalChecks,
      moduleRegistry: MODULE_REGISTRY || null,
      synchronizeModuleLinks,
      flushPendingModuleQueues,
      initialSynchronization: INITIAL_MODULE_LINK_STATE,
      inspectModuleConnections,
    }),
  });
  informModuleGlobals('cineRuntime', runtimeAPI);

  registerOrQueueModule(
    'cineRuntime',
    runtimeAPI,
    {
      category: 'runtime',
      description: 'Runtime orchestrator ensuring persistence, offline, and UI safeguards stay intact.',
      replace: true,
      connections: ['cinePersistence', 'cineOffline', 'cineUi', 'cineModuleGlobals', 'cineModuleContext'],
    },
    (error) => {
      safeWarn('Unable to register cineRuntime module.', error);
    },
  );

  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
    let existingRuntime = null;
    try {
      existingRuntime = GLOBAL_SCOPE.cineRuntime || null;
    } catch (error) {
      void error;
      existingRuntime = null;
    }

    if (existingRuntime !== runtimeAPI) {
      const exposed = exposeGlobal('cineRuntime', runtimeAPI, {
        configurable: true,
        enumerable: false,
        writable: false,
      });

      if (!exposed) {
        safeWarn('Unable to expose cineRuntime globally.');
      }
    }
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    if (
      module.exports
      && module.exports !== runtimeAPI
      && typeof module.exports === 'object'
      && Object.keys(module.exports).length > 0
    ) {
      try {
        if (module.exports.cineRuntime !== runtimeAPI) {
          Object.defineProperty(module.exports, 'cineRuntime', {
            configurable: true,
            enumerable: false,
            value: runtimeAPI,
            writable: false,
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
