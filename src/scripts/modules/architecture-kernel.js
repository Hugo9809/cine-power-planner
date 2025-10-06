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

  const LOCAL_SCOPE = fallbackDetectGlobalScope();

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

  const ARCHITECTURE = resolveArchitecture(LOCAL_SCOPE);
  const ARCHITECTURE_HELPERS = resolveArchitectureHelpers(LOCAL_SCOPE);

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

  function fallbackEnsureQueue(scope, key) {
    const targetScope = scope || LOCAL_SCOPE;
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
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor || ('get' in descriptor) || ('set' in descriptor)) {
        continue;
      }

      fallbackFreezeDeep(descriptor.value, seen);
    }

    return Object.freeze(value);
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

  function fallbackResolveModuleRegistry(scope) {
    const targetScope = scope || LOCAL_SCOPE;

    const required = fallbackTryRequire('./registry.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const scopes = fallbackCollectCandidateScopes(targetScope);
    for (let index = 0; index < scopes.length; index += 1) {
      const candidate = scopes[index];
      if (candidate && typeof candidate.cineModules === 'object') {
        return candidate.cineModules;
      }
    }

    return null;
  }

  function fallbackQueueModuleRegistration(scope, name, api, options) {
    const targetScope = scope || LOCAL_SCOPE;
    const queue = fallbackEnsureQueue(targetScope, DEFAULT_PENDING_QUEUE_KEY);
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

  function fallbackResolveFromScopes(propertyName, options) {
    const settings = options || {};
    const predicate = typeof settings.predicate === 'function' ? settings.predicate : null;
    const scopes = Array.isArray(settings.scopes)
      ? settings.scopes.slice()
      : fallbackCollectCandidateScopes(settings.primaryScope || LOCAL_SCOPE);

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

  function preferFunction(helperFn, architectureFn, fallbackFn) {
    return function applyPreferred() {
      const args = arguments;

      if (typeof helperFn === 'function') {
        try {
          const helperResult = helperFn.apply(null, args);
          if (typeof helperResult !== 'undefined' && helperResult !== null) {
            return helperResult;
          }
        } catch (error) {
          void error;
        }
      }

      if (typeof architectureFn === 'function') {
        try {
          const architectureResult = architectureFn.apply(null, args);
          if (typeof architectureResult !== 'undefined' && architectureResult !== null) {
            return architectureResult;
          }
        } catch (error) {
          void error;
        }
      }

      return fallbackFn.apply(null, args);
    };
  }

  const detectGlobalScope = preferFunction(
    ARCHITECTURE_HELPERS && ARCHITECTURE_HELPERS.detectGlobalScope,
    ARCHITECTURE && ARCHITECTURE.detectGlobalScope,
    fallbackDetectGlobalScope,
  );

  const PRIMARY_SCOPE = detectGlobalScope();

  function fallbackCollectWithPrimary(primary) {
    return fallbackCollectCandidateScopes(primary || PRIMARY_SCOPE);
  }

  const baseCollectCandidateScopes = preferFunction(
    ARCHITECTURE_HELPERS && ARCHITECTURE_HELPERS.collectCandidateScopes,
    ARCHITECTURE && ARCHITECTURE.collectCandidateScopes,
    fallbackCollectWithPrimary,
  );

  function collectCandidateScopes(primary) {
    return baseCollectCandidateScopes(primary || PRIMARY_SCOPE);
  }

  const tryRequire = preferFunction(
    ARCHITECTURE_HELPERS && ARCHITECTURE_HELPERS.tryRequire,
    ARCHITECTURE && ARCHITECTURE.tryRequire,
    fallbackTryRequire,
  );

  const defineHiddenProperty = preferFunction(
    ARCHITECTURE_HELPERS && ARCHITECTURE_HELPERS.defineHiddenProperty,
    ARCHITECTURE && ARCHITECTURE.defineHiddenProperty,
    fallbackDefineHiddenProperty,
  );

  function ensureQueue(scope, key) {
    const resolvedScope = scope || PRIMARY_SCOPE;
    const resolvedKey = typeof key === 'string' && key ? key : getPendingQueueKey();

    const helperFn = ARCHITECTURE_HELPERS && ARCHITECTURE_HELPERS.ensureQueue;
    if (typeof helperFn === 'function') {
      try {
        const helperQueue = helperFn(resolvedScope, resolvedKey);
        if (Array.isArray(helperQueue)) {
          return helperQueue;
        }
      } catch (error) {
        void error;
      }
    }

    const architectureFn = ARCHITECTURE && ARCHITECTURE.ensureQueue;
    if (typeof architectureFn === 'function') {
      try {
        const architectureQueue = architectureFn(resolvedScope, resolvedKey);
        if (Array.isArray(architectureQueue)) {
          return architectureQueue;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackEnsureQueue(resolvedScope, resolvedKey);
  }

  const freezeDeep = preferFunction(
    ARCHITECTURE_HELPERS && ARCHITECTURE_HELPERS.freezeDeep,
    ARCHITECTURE && ARCHITECTURE.freezeDeep,
    fallbackFreezeDeep,
  );

  const safeWarn = preferFunction(
    ARCHITECTURE_HELPERS && ARCHITECTURE_HELPERS.safeWarn,
    ARCHITECTURE && ARCHITECTURE.safeWarn,
    fallbackSafeWarn,
  );

  function resolveModuleRegistry(scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    if (ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.resolveModuleRegistry === 'function') {
      try {
        const resolved = ARCHITECTURE_HELPERS.resolveModuleRegistry(targetScope);
        if (resolved && typeof resolved === 'object') {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }

    return preferFunction(null, ARCHITECTURE && ARCHITECTURE.resolveModuleRegistry, fallbackResolveModuleRegistry)(
      targetScope,
    );
  }

  const baseResolveFromScopes = preferFunction(
    ARCHITECTURE_HELPERS && ARCHITECTURE_HELPERS.resolveFromScopes,
    ARCHITECTURE && ARCHITECTURE.resolveFromScopes,
    fallbackResolveFromScopes,
  );

  function resolveFromScopes(propertyName, options) {
    const settings = options ? { ...options } : {};
    if (!settings.primaryScope) {
      settings.primaryScope = PRIMARY_SCOPE;
    }
    return baseResolveFromScopes(propertyName, settings);
  }

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

    return fallbackQueueModuleRegistration(targetScope, name, api, options);
  }

  function getPendingQueueKey() {
    if (ARCHITECTURE_HELPERS && typeof ARCHITECTURE_HELPERS.pendingQueueKey === 'string' && ARCHITECTURE_HELPERS.pendingQueueKey) {
      return ARCHITECTURE_HELPERS.pendingQueueKey;
    }
    return DEFAULT_PENDING_QUEUE_KEY;
  }

  const kernel = Object.freeze({
    architecture: ARCHITECTURE || null,
    helpers: ARCHITECTURE_HELPERS || null,
    detectGlobalScope,
    getGlobalScope() {
      return PRIMARY_SCOPE;
    },
    collectCandidateScopes,
    tryRequire,
    defineHiddenProperty,
    ensureQueue,
    freezeDeep,
    safeWarn,
    resolveModuleRegistry,
    resolveFromScopes,
    queueModuleRegistration,
    getPendingQueueKey,
  });

  const registry = resolveModuleRegistry(PRIMARY_SCOPE);
  const registrationOptions = {
    category: 'infrastructure',
    description: 'Unified kernel for module detection, registry resolution and queue management.',
    replace: true,
    connections: ['cineModuleArchitectureHelpers'],
  };

  if (registry && typeof registry.register === 'function') {
    try {
      registry.register('cineModuleArchitectureKernel', kernel, registrationOptions);
    } catch (error) {
      safeWarn('cineModuleArchitectureKernel: immediate registry registration failed.', error);
      queueModuleRegistration(PRIMARY_SCOPE, 'cineModuleArchitectureKernel', kernel, registrationOptions);
    }
  } else {
    queueModuleRegistration(PRIMARY_SCOPE, 'cineModuleArchitectureKernel', kernel, registrationOptions);
  }

  if (PRIMARY_SCOPE && typeof PRIMARY_SCOPE === 'object' && !PRIMARY_SCOPE.cineModuleArchitectureKernel) {
    defineHiddenProperty(PRIMARY_SCOPE, 'cineModuleArchitectureKernel', kernel);
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = kernel;
  }
})();

