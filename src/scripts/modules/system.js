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

  function fallbackCollectCandidateScopes(primary, baseScope) {
    const scopes = [];

    function pushScope(scope) {
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        return;
      }
      if (scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }

    pushScope(primary || baseScope);
    if (typeof globalThis !== 'undefined') pushScope(globalThis);
    if (typeof window !== 'undefined') pushScope(window);
    if (typeof self !== 'undefined') pushScope(self);
    if (typeof global !== 'undefined') pushScope(global);

    return scopes;
  }

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

  function fallbackEnsureQueue(scope, key, baseScope) {
    const targetScope = scope || baseScope;
    const queueKey = typeof key === 'string' && key ? key : DEFAULT_PENDING_QUEUE_KEY;

    if (!targetScope || typeof targetScope !== 'object') {
      return null;
    }

    let queue = targetScope[queueKey];
    if (Array.isArray(queue)) {
      return queue;
    }

    if (!fallbackDefineHiddenProperty(targetScope, queueKey, [])) {
      return null;
    }

    queue = targetScope[queueKey];
    if (!Array.isArray(queue)) {
      return null;
    }

    return queue;
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

    const keys = Object.getOwnPropertyNames(value);
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

  function fallbackResolveFromScopes(propertyName, options, baseScope) {
    const settings = options || {};
    const predicate = typeof settings.predicate === 'function' ? settings.predicate : null;
    const scopes = Array.isArray(settings.scopes)
      ? settings.scopes.slice()
      : fallbackCollectCandidateScopes(settings.primaryScope || baseScope, baseScope);

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

  function fallbackQueueModuleRegistration(scope, name, api, options, baseScope, queueKey) {
    const targetScope = scope || baseScope;
    const queue = fallbackEnsureQueue(targetScope, queueKey || DEFAULT_PENDING_QUEUE_KEY, baseScope);
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
      return true;
    } catch (error) {
      void error;
    }

    try {
      queue[queue.length] = payload;
      return true;
    } catch (assignmentError) {
      void assignmentError;
    }

    return false;
  }

  function createFallbackKernel(primaryScope) {
    const baseScope = primaryScope || fallbackDetectGlobalScope();

    return {
      detectGlobalScope: fallbackDetectGlobalScope,
      getGlobalScope() {
        return baseScope;
      },
      collectCandidateScopes(primary) {
        return fallbackCollectCandidateScopes(primary || baseScope, baseScope);
      },
      tryRequire: fallbackTryRequire,
      defineHiddenProperty: fallbackDefineHiddenProperty,
      ensureQueue(scope, key) {
        return fallbackEnsureQueue(scope || baseScope, key, baseScope);
      },
      freezeDeep: fallbackFreezeDeep,
      safeWarn: fallbackSafeWarn,
      resolveFromScopes(propertyName, options) {
        return fallbackResolveFromScopes(propertyName, options, baseScope);
      },
      queueModuleRegistration(scope, name, api, options) {
        return fallbackQueueModuleRegistration(scope || baseScope, name, api, options, baseScope, DEFAULT_PENDING_QUEUE_KEY);
      },
      getPendingQueueKey() {
        return DEFAULT_PENDING_QUEUE_KEY;
      },
      resolveModuleRegistry(scope) {
        const targetScope = scope || baseScope;
        const required = fallbackTryRequire('./registry.js');
        if (required && typeof required === 'object') {
          return required;
        }
        const scopes = fallbackCollectCandidateScopes(targetScope, baseScope);
        for (let index = 0; index < scopes.length; index += 1) {
          const candidate = scopes[index];
          if (candidate && typeof candidate.cineModules === 'object') {
            return candidate.cineModules;
          }
        }
        return null;
      },
    };
  }

  function resolveArchitectureKernel(scope) {
    const targetScope = scope || fallbackDetectGlobalScope();

    if (typeof require === 'function') {
      try {
        const required = require('./architecture-kernel.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (targetScope && typeof targetScope.cineModuleArchitectureKernel === 'object') {
      return targetScope.cineModuleArchitectureKernel;
    }

    return null;
  }

  const LOCAL_SCOPE = fallbackDetectGlobalScope();
  const RESOLVED_KERNEL = resolveArchitectureKernel(LOCAL_SCOPE);
  const ACTIVE_KERNEL = RESOLVED_KERNEL || createFallbackKernel(LOCAL_SCOPE);

  function detectGlobalScope() {
    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.detectGlobalScope === 'function') {
      try {
        const detected = ACTIVE_KERNEL.detectGlobalScope();
        if (detected) {
          return detected;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackDetectGlobalScope();
  }

  const PRIMARY_SCOPE =
    ACTIVE_KERNEL && typeof ACTIVE_KERNEL.getGlobalScope === 'function'
      ? (function resolvePrimaryScope() {
          try {
            const scoped = ACTIVE_KERNEL.getGlobalScope();
            if (scoped) {
              return scoped;
            }
          } catch (error) {
            void error;
          }
          return detectGlobalScope();
        })()
      : detectGlobalScope();

  let pendingQueueKey =
    ACTIVE_KERNEL && typeof ACTIVE_KERNEL.getPendingQueueKey === 'function'
      ? ACTIVE_KERNEL.getPendingQueueKey()
      : DEFAULT_PENDING_QUEUE_KEY;

  function collectCandidateScopes(primary) {
    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.collectCandidateScopes === 'function') {
      try {
        const collected = ACTIVE_KERNEL.collectCandidateScopes(primary || PRIMARY_SCOPE);
        if (Array.isArray(collected) && collected.length > 0) {
          return collected;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackCollectCandidateScopes(primary || PRIMARY_SCOPE, PRIMARY_SCOPE);
  }

  function collectScopes(primary) {
    const scopes = collectCandidateScopes(primary || PRIMARY_SCOPE);
    return Array.isArray(scopes) ? scopes : [];
  }

  function tryRequire(modulePath) {
    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.tryRequire === 'function') {
      try {
        const result = ACTIVE_KERNEL.tryRequire(modulePath);
        if (typeof result !== 'undefined') {
          return result;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackTryRequire(modulePath);
  }

  function defineHiddenProperty(target, name, value) {
    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.defineHiddenProperty === 'function') {
      try {
        if (ACTIVE_KERNEL.defineHiddenProperty(target, name, value)) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackDefineHiddenProperty(target, name, value);
  }

  function freezeDeep(value) {
    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.freezeDeep === 'function') {
      try {
        return ACTIVE_KERNEL.freezeDeep(value);
      } catch (error) {
        void error;
      }
    }

    return fallbackFreezeDeep(value);
  }

  function safeWarn(message, detail) {
    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.safeWarn === 'function') {
      try {
        ACTIVE_KERNEL.safeWarn(message, detail);
        return;
      } catch (error) {
        void error;
      }
    }

    fallbackSafeWarn(message, detail);
  }

  function resolveFromScopes(propertyName, options) {
    const settings = options ? { ...options } : {};
    if (!settings.primaryScope) {
      settings.primaryScope = PRIMARY_SCOPE;
    }
    if (!settings.scopes) {
      settings.scopes = collectScopes(settings.primaryScope);
    }

    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.resolveFromScopes === 'function') {
      try {
        const resolved = ACTIVE_KERNEL.resolveFromScopes(propertyName, settings);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        safeWarn(`cineModuleSystem: resolveFromScopes failed for "${propertyName}".`, error);
      }
    }

    return fallbackResolveFromScopes(propertyName, settings, PRIMARY_SCOPE);
  }

  let cachedModuleBase = null;
  let hasResolvedModuleBase = false;

  function updateQueueKeyFromBase(base) {
    if (base && typeof base.PENDING_QUEUE_KEY === 'string' && base.PENDING_QUEUE_KEY) {
      pendingQueueKey = base.PENDING_QUEUE_KEY;
    }
  }

  function loadModuleBase(scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    const required = tryRequire('./base.js');
    if (required && typeof required === 'object') {
      updateQueueKeyFromBase(required);
      return required;
    }

    const resolved = resolveFromScopes('cineModuleBase', {
      primaryScope: targetScope,
      scopes: collectScopes(targetScope),
    });

    if (resolved && typeof resolved === 'object') {
      updateQueueKeyFromBase(resolved);
      return resolved;
    }

    return null;
  }

  function getModuleBase(scope) {
    if (scope && scope !== PRIMARY_SCOPE) {
      return loadModuleBase(scope);
    }

    if (!hasResolvedModuleBase) {
      cachedModuleBase = loadModuleBase(PRIMARY_SCOPE);
      hasResolvedModuleBase = true;
    }

    return cachedModuleBase;
  }

  function fallbackResolveModuleRegistry(scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    const required = tryRequire('./registry.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const resolved = resolveFromScopes('cineModules', {
      primaryScope: targetScope,
      scopes: collectScopes(targetScope),
    });

    if (resolved && typeof resolved === 'object') {
      return resolved;
    }

    return null;
  }

  let cachedModuleRegistry = null;
  let hasResolvedModuleRegistry = false;

  function resolveModuleRegistry(scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.resolveModuleRegistry === 'function') {
      try {
        const resolvedByKernel = ACTIVE_KERNEL.resolveModuleRegistry(targetScope);
        if (resolvedByKernel && typeof resolvedByKernel === 'object') {
          return resolvedByKernel;
        }
      } catch (error) {
        safeWarn('cineModuleSystem: Kernel resolveModuleRegistry failed.', error);
      }
    }

    const base = getModuleBase(targetScope);
    if (base && typeof base.resolveModuleRegistry === 'function') {
      try {
        const resolved = base.resolveModuleRegistry(targetScope);
        if (resolved && typeof resolved === 'object') {
          return resolved;
        }
      } catch (error) {
        safeWarn('cineModuleSystem: Base resolveModuleRegistry failed.', error);
      }
    }

    return fallbackResolveModuleRegistry(targetScope);
  }

  function getModuleRegistry(scope) {
    if (scope && scope !== PRIMARY_SCOPE) {
      return resolveModuleRegistry(scope);
    }

    if (!hasResolvedModuleRegistry) {
      cachedModuleRegistry = resolveModuleRegistry(PRIMARY_SCOPE);
      hasResolvedModuleRegistry = true;
    }

    return cachedModuleRegistry;
  }

  function fallbackExposeGlobal(name, value, scope, options = {}) {
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
    }

    try {
      targetScope[name] = value;
      return true;
    } catch (assignmentError) {
      void assignmentError;
    }

    return false;
  }

  function exposeGlobal(name, value, scope, options) {
    const targetScope = scope || PRIMARY_SCOPE;
    const base = getModuleBase(targetScope);

    if (base && typeof base.exposeGlobal === 'function') {
      try {
        return base.exposeGlobal(name, value, targetScope, options || {});
      } catch (error) {
        safeWarn(`cineModuleSystem: Failed to expose "${name}" through module base.`, error);
      }
    }

    return fallbackExposeGlobal(name, value, targetScope, options || {});
  }

  function ensureRegistrationQueue(scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.ensureQueue === 'function') {
      try {
        const queue = ACTIVE_KERNEL.ensureQueue(targetScope, pendingQueueKey);
        if (Array.isArray(queue)) {
          return queue;
        }
      } catch (error) {
        safeWarn('cineModuleSystem: ensureQueue failed via kernel.', error);
      }
    }

    return fallbackEnsureQueue(targetScope, pendingQueueKey, PRIMARY_SCOPE);
  }

  function normalizeName(name) {
    if (typeof name === 'string' && name.trim()) {
      return name.trim();
    }
    if (typeof name === 'number' && Number.isFinite(name)) {
      return String(name);
    }
    throw new TypeError('cineModuleSystem expected module name to be a non-empty string.');
  }

  function queueModuleRegistration(name, api, options, scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.queueModuleRegistration === 'function') {
      try {
        if (ACTIVE_KERNEL.queueModuleRegistration(targetScope, name, api, options)) {
          return true;
        }
      } catch (error) {
        safeWarn('cineModuleSystem: queueModuleRegistration failed via kernel.', error);
      }
    }

    const queue = ensureRegistrationQueue(targetScope);
    if (!queue) {
      safeWarn('cineModuleSystem: Unable to queue module registration.', { name });
      return false;
    }

    let normalizedName;
    try {
      normalizedName = normalizeName(name);
    } catch (error) {
      safeWarn('cineModuleSystem: Ignoring registration with invalid name.', error);
      return false;
    }

    const payload = Object.freeze({
      name: normalizedName,
      api,
      options: Object.freeze({ ...(options || {}) }),
    });

    try {
      queue.push(payload);
    } catch (error) {
      void error;
      try {
        queue[queue.length] = payload;
      } catch (assignmentError) {
        safeWarn('cineModuleSystem: Failed to record pending module registration.', assignmentError);
        return false;
      }
    }

    return true;
  }

  function registerModule(name, api, options, scope, onError) {
    const targetScope = scope || PRIMARY_SCOPE;
    const registry = getModuleRegistry(targetScope);

    if (registry && typeof registry.register === 'function') {
      try {
        registry.register(name, api, options || {});
        return true;
      } catch (error) {
        if (typeof onError === 'function') {
          try {
            onError(error);
          } catch (handlerError) {
            safeWarn('cineModuleSystem: Error handler threw while processing registration failure.', handlerError);
          }
        } else {
          safeWarn(`cineModuleSystem: Unable to register module "${name}".`, error);
        }
      }
    }

    queueModuleRegistration(name, api, options, targetScope);
    return false;
  }

  function getGlobalScope(scope) {
    const targetScope = scope || PRIMARY_SCOPE;
    const base = getModuleBase(targetScope);

    if (base && typeof base.getGlobalScope === 'function') {
      try {
        const resolved = base.getGlobalScope();
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        safeWarn('cineModuleSystem: Unable to obtain global scope from module base.', error);
      }
    }

    return targetScope;
  }

  function resolveModule(name, options = {}) {
    const normalizedName = normalizeName(name);
    const targetScope = options.scope || PRIMARY_SCOPE;
    const registry = getModuleRegistry(targetScope);

    if (registry && typeof registry.get === 'function') {
      try {
        const registered = registry.get(normalizedName);
        if (registered) {
          return registered;
        }
      } catch (error) {
        safeWarn('cineModuleSystem: Registry lookup failed.', error);
      }
    }

    const propertyName = options.propertyName || normalizedName;
    const scopes = Array.isArray(options.scopes) && options.scopes.length > 0 ? options.scopes : collectScopes(targetScope);

    const resolved = resolveFromScopes(propertyName, {
      primaryScope: targetScope,
      scopes,
      predicate: options.predicate,
    });

    if (resolved) {
      return resolved;
    }

    if (typeof options.fallback === 'function') {
      try {
        return options.fallback();
      } catch (error) {
        safeWarn('cineModuleSystem: Fallback resolver threw while resolving module.', error);
      }
    }

    return null;
  }

  function registerAndExpose(name, api, registrationOptions, scope, exposeOptions) {
    const targetScope = scope || PRIMARY_SCOPE;
    const registered = registerModule(name, api, registrationOptions, targetScope);
    if (!registered) {
      return false;
    }

    return exposeGlobal(name, api, targetScope, exposeOptions || {});
  }

  function getPendingQueue(scope) {
    return ensureRegistrationQueue(scope || PRIMARY_SCOPE);
  }

  const systemApi = {
    getArchitecture() {
      return (ACTIVE_KERNEL && ACTIVE_KERNEL.architecture) || null;
    },
    detectGlobalScope,
    getGlobalScope,
    collectCandidateScopes: collectScopes,
    tryRequire,
    resolveFromScopes,
    getModuleBase,
    getModuleRegistry,
    queueModuleRegistration,
    registerModule,
    registerAndExpose,
    resolveModule,
    exposeGlobal,
    defineHiddenProperty,
    freezeDeep,
    safeWarn,
    getPendingQueue,
    getPendingQueueKey() {
      return pendingQueueKey;
    },
  };

  Object.defineProperty(systemApi, 'PENDING_QUEUE_KEY', {
    configurable: false,
    enumerable: true,
    get() {
      return pendingQueueKey;
    },
  });

  const frozenApi = Object.freeze(systemApi);

  if (PRIMARY_SCOPE && typeof PRIMARY_SCOPE === 'object' && !PRIMARY_SCOPE.cineModuleSystem) {
    defineHiddenProperty(PRIMARY_SCOPE, 'cineModuleSystem', frozenApi);
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = frozenApi;
  }
})();

