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

  const ARCHITECTURE = resolveArchitecture(LOCAL_SCOPE);

  const detectGlobalScope =
    ARCHITECTURE && typeof ARCHITECTURE.detectGlobalScope === 'function'
      ? function detectWithArchitecture() {
          try {
            const detected = ARCHITECTURE.detectGlobalScope();
            if (detected) {
              return detected;
            }
          } catch (error) {
            void error;
          }
          return fallbackDetectGlobalScope();
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

  function collectScopes(primary) {
    const targetScope = primary || PRIMARY_SCOPE;

    if (ARCHITECTURE && typeof ARCHITECTURE.collectCandidateScopes === 'function') {
      try {
        const collected = ARCHITECTURE.collectCandidateScopes(targetScope);
        if (Array.isArray(collected) && collected.length > 0) {
          return collected;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackCollectCandidateScopes(targetScope);
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

  const baseTryRequire =
    ARCHITECTURE && typeof ARCHITECTURE.tryRequire === 'function'
      ? function tryRequireWithArchitecture(modulePath) {
          const result = ARCHITECTURE.tryRequire(modulePath);
          return typeof result === 'undefined' ? fallbackTryRequire(modulePath) : result;
        }
      : fallbackTryRequire;

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

  const defineHiddenProperty =
    ARCHITECTURE && typeof ARCHITECTURE.defineHiddenProperty === 'function'
      ? ARCHITECTURE.defineHiddenProperty
      : fallbackDefineHiddenProperty;

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
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor || ('get' in descriptor) || ('set' in descriptor)) {
        continue;
      }

      fallbackFreezeDeep(descriptor.value, seen);
    }

    return Object.freeze(value);
  }

  const freezeDeep =
    ARCHITECTURE && typeof ARCHITECTURE.freezeDeep === 'function'
      ? ARCHITECTURE.freezeDeep
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

  const safeWarn =
    ARCHITECTURE && typeof ARCHITECTURE.safeWarn === 'function'
      ? ARCHITECTURE.safeWarn
      : fallbackSafeWarn;

  function fallbackResolveFromScopes(propertyName, options) {
    const settings = options || {};
    const predicate = typeof settings.predicate === 'function' ? settings.predicate : null;
    const scopes = Array.isArray(settings.scopes)
      ? settings.scopes.slice()
      : collectScopes(settings.primaryScope || PRIMARY_SCOPE);

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

  const resolveFromScopes =
    ARCHITECTURE && typeof ARCHITECTURE.resolveFromScopes === 'function'
      ? function resolveWithArchitecture(propertyName, options) {
          const settings = { ...(options || {}) };
          if (!settings.primaryScope) {
            settings.primaryScope = PRIMARY_SCOPE;
          }
          if (!settings.scopes) {
            settings.scopes = collectScopes(settings.primaryScope);
          }
          return ARCHITECTURE.resolveFromScopes(propertyName, settings);
        }
      : fallbackResolveFromScopes;

  let cachedModuleBase = null;
  let hasResolvedModuleBase = false;

  function updateQueueKeyFromBase(base) {
    if (base && typeof base.PENDING_QUEUE_KEY === 'string' && base.PENDING_QUEUE_KEY) {
      pendingQueueKey = base.PENDING_QUEUE_KEY;
    }
  }

  function loadModuleBase(scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    const required = baseTryRequire('./base.js');
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

    const required = baseTryRequire('./registry.js');
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
    const base = getModuleBase(targetScope);

    if (base && typeof base.resolveModuleRegistry === 'function') {
      try {
        const resolved = base.resolveModuleRegistry(targetScope);
        if (resolved && typeof resolved === 'object') {
          return resolved;
        }
      } catch (error) {
        safeWarn('cineModuleSystem: Unable to resolve module registry through base.', error);
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

  const DEFAULT_PENDING_QUEUE_KEY = '__cinePendingModuleRegistrations__';
  let pendingQueueKey = DEFAULT_PENDING_QUEUE_KEY;

  function fallbackEnsureQueue(scope) {
    const targetScope = scope || PRIMARY_SCOPE;
    if (!targetScope || typeof targetScope !== 'object') {
      return null;
    }

    let queue = targetScope[pendingQueueKey];
    if (Array.isArray(queue)) {
      return queue;
    }

    if (defineHiddenProperty(targetScope, pendingQueueKey, [])) {
      queue = targetScope[pendingQueueKey];
      if (Array.isArray(queue)) {
        return queue;
      }
    }

    try {
      targetScope[pendingQueueKey] = [];
      queue = targetScope[pendingQueueKey];
    } catch (error) {
      safeWarn('cineModuleSystem: Unable to create pending registration queue.', error);
      return null;
    }

    return Array.isArray(queue) ? queue : null;
  }

  const ensureRegistrationQueue =
    ARCHITECTURE && typeof ARCHITECTURE.ensureQueue === 'function'
      ? function ensureWithArchitecture(scope) {
          const targetScope = scope || PRIMARY_SCOPE;
          const queue = ARCHITECTURE.ensureQueue(targetScope, pendingQueueKey);
          if (Array.isArray(queue)) {
            return queue;
          }
          return fallbackEnsureQueue(targetScope);
        }
      : fallbackEnsureQueue;

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

    const queue = ensureRegistrationQueue(targetScope);
    if (!queue) {
      safeWarn('cineModuleSystem: Unable to queue module registration.', { name });
      return false;
    }

    const normalizedName = (() => {
      try {
        return normalizeName(name);
      } catch (error) {
        safeWarn('cineModuleSystem: Ignoring registration with invalid name.', error);
        return null;
      }
    })();

    if (!normalizedName) {
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
    const scopes = Array.isArray(options.scopes) && options.scopes.length > 0
      ? options.scopes
      : collectScopes(targetScope);

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
      return ARCHITECTURE;
    },
    detectGlobalScope,
    getGlobalScope,
    collectCandidateScopes: collectScopes,
    tryRequire: baseTryRequire,
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
