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

  function resolveArchitectureCore(scope) {
    if (typeof require === 'function') {
      try {
        const required = require('./architecture-core.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    const candidates = [];
    const primary = scope || LOCAL_SCOPE;
    if (primary && typeof primary === 'object') {
      candidates.push(primary);
    }
    if (typeof globalThis !== 'undefined' && candidates.indexOf(globalThis) === -1) candidates.push(globalThis);
    if (typeof window !== 'undefined' && candidates.indexOf(window) === -1) candidates.push(window);
    if (typeof self !== 'undefined' && candidates.indexOf(self) === -1) candidates.push(self);
    if (typeof global !== 'undefined' && candidates.indexOf(global) === -1) candidates.push(global);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate && typeof candidate.cineModuleArchitectureCore === 'object') {
        return candidate.cineModuleArchitectureCore;
      }
    }

    return null;
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
  const ARCHITECTURE_CORE = resolveArchitectureCore(LOCAL_SCOPE);
  const CORE_INSTANCE =
    ARCHITECTURE_CORE && typeof ARCHITECTURE_CORE.createCore === 'function'
      ? ARCHITECTURE_CORE.createCore({
          primaryScope: LOCAL_SCOPE,
          pendingQueueKey: DEFAULT_PENDING_QUEUE_KEY,
        })
      : null;

  function resolveScopeCollector() {
    if (typeof require === 'function') {
      try {
        const required = require('./helpers/scope-collector.js');
        if (required && typeof required.createCollector === 'function') {
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

    pushCandidate(LOCAL_SCOPE);
    if (typeof globalThis !== 'undefined') pushCandidate(globalThis);
    if (typeof window !== 'undefined') pushCandidate(window);
    if (typeof self !== 'undefined') pushCandidate(self);
    if (typeof global !== 'undefined') pushCandidate(global);

    for (let index = 0; index < candidates.length; index += 1) {
      const scope = candidates[index];
      try {
        const collector = scope && scope.__cineScopeCollector;
        if (collector && typeof collector.createCollector === 'function') {
          return collector;
        }
      } catch (error) {
        void error;
      }
    }

    return null;
  }

  const SCOPE_COLLECTOR = resolveScopeCollector();
  const createScopeCollector =
    SCOPE_COLLECTOR && typeof SCOPE_COLLECTOR.createCollector === 'function'
      ? SCOPE_COLLECTOR.createCollector
      : null;
  const DEFAULT_EXTRAS_KEY = { key: 'defaultExtras' };
  const HELPER_COLLECTOR_CACHE = [];

  function resolveHelperCollector(detectFn, extras) {
    if (!createScopeCollector) {
      return null;
    }

    const extrasKey = Array.isArray(extras) ? extras : DEFAULT_EXTRAS_KEY;

    for (let index = 0; index < HELPER_COLLECTOR_CACHE.length; index += 1) {
      const entry = HELPER_COLLECTOR_CACHE[index];
      if (entry.detect === detectFn && entry.extras === extrasKey) {
        return entry.collector;
      }
    }

    const collector = createScopeCollector({
      detectGlobalScope: detectFn,
      additionalScopes: Array.isArray(extras) ? extras : undefined,
    });

    if (collector) {
      HELPER_COLLECTOR_CACHE.push({ detect: detectFn, extras: extrasKey, collector });
      return collector;
    }

    return null;
  }

  function fallbackCollectCandidateScopes(primary) {
    const collector = resolveHelperCollector(fallbackDetectGlobalScope, null);
    if (collector) {
      return collector(primary);
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

  function isEthereumProviderCandidate(value) {
    if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
      return false;
    }

    if (PRIMARY_SCOPE && typeof PRIMARY_SCOPE === 'object') {
      try {
        if (value === PRIMARY_SCOPE.ethereum) {
          return true;
        }
      } catch (error) {
        void error;
        return true;
      }
    }

    try {
      if (value.isMetaMask === true) {
        return true;
      }
    } catch (inspectionError) {
      if (inspectionError && typeof inspectionError.message === 'string' && /metamask/i.test(inspectionError.message)) {
        return true;
      }
    }

    try {
      if (typeof value.request === 'function' && typeof value.on === 'function') {
        if (typeof value.removeListener === 'function' || typeof value.removeEventListener === 'function') {
          return true;
        }

        const ctorName = value.constructor && value.constructor.name;
        if (ctorName && /Ethereum|MetaMask|Provider/i.test(ctorName)) {
          return true;
        }
      }
    } catch (accessError) {
      void accessError;
      return true;
    }

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

    if (shouldBypassDeepFreeze(value) || isEthereumProviderCandidate(value)) {
      return value;
    }

    if (seen.has(value)) {
      return value;
    }

    seen.add(value);

    const keys = Object.getOwnPropertyNames(value);
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];

      let descriptor;
      try {
        descriptor = Object.getOwnPropertyDescriptor(value, key);
      } catch (descriptorError) {
        void descriptorError;
        descriptor = null;
      }

      if (
        descriptor &&
        (typeof descriptor.get === 'function' || typeof descriptor.set === 'function')
      ) {
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

      if (shouldBypassDeepFreeze(child) || isEthereumProviderCandidate(child)) {
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

  function preferFunction(coreFn, helperFn, architectureFn, fallbackFn) {
    return function applyPreferred() {
      const args = arguments;

      const candidates = [coreFn, helperFn, architectureFn];
      for (let index = 0; index < candidates.length; index += 1) {
        const candidate = candidates[index];
        if (typeof candidate !== 'function') {
          continue;
        }

        try {
          const result = candidate.apply(null, args);
          if (typeof result !== 'undefined' && result !== null) {
            return result;
          }
        } catch (error) {
          void error;
        }
      }

      return fallbackFn.apply(null, args);
    };
  }

  const detectGlobalScope = preferFunction(
    CORE_INSTANCE && CORE_INSTANCE.detectGlobalScope,
    ARCHITECTURE_HELPERS && ARCHITECTURE_HELPERS.detectGlobalScope,
    ARCHITECTURE && ARCHITECTURE.detectGlobalScope,
    fallbackDetectGlobalScope,
  );

  const PRIMARY_SCOPE = detectGlobalScope();

  function fallbackCollectWithPrimary(primary) {
    return fallbackCollectCandidateScopes(primary || PRIMARY_SCOPE);
  }

  const baseCollectCandidateScopes = preferFunction(
    CORE_INSTANCE && CORE_INSTANCE.collectCandidateScopes,
    ARCHITECTURE_HELPERS && ARCHITECTURE_HELPERS.collectCandidateScopes,
    ARCHITECTURE && ARCHITECTURE.collectCandidateScopes,
    fallbackCollectWithPrimary,
  );

  function collectCandidateScopes(primary) {
    return baseCollectCandidateScopes(primary || PRIMARY_SCOPE);
  }

  const tryRequire = preferFunction(
    CORE_INSTANCE && CORE_INSTANCE.tryRequire,
    ARCHITECTURE_HELPERS && ARCHITECTURE_HELPERS.tryRequire,
    ARCHITECTURE && ARCHITECTURE.tryRequire,
    fallbackTryRequire,
  );

  const defineHiddenProperty = preferFunction(
    CORE_INSTANCE && CORE_INSTANCE.defineHiddenProperty,
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

  const baseFreezeDeep = preferFunction(
    CORE_INSTANCE && CORE_INSTANCE.freezeDeep,
    ARCHITECTURE_HELPERS && ARCHITECTURE_HELPERS.freezeDeep,
    ARCHITECTURE && ARCHITECTURE.freezeDeep,
    fallbackFreezeDeep,
  );

  function freezeDeep(value, seen) {
    if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
      return value;
    }

    if (shouldBypassDeepFreeze(value) || isEthereumProviderCandidate(value)) {
      return value;
    }

    return baseFreezeDeep(value, seen);
  }

  const safeWarn = preferFunction(
    CORE_INSTANCE && CORE_INSTANCE.safeWarn,
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

    return preferFunction(
      CORE_INSTANCE && CORE_INSTANCE.resolveModuleRegistry,
      null,
      ARCHITECTURE && ARCHITECTURE.resolveModuleRegistry,
      fallbackResolveModuleRegistry,
    )(targetScope);
  }

  const baseResolveFromScopes = preferFunction(
    CORE_INSTANCE && CORE_INSTANCE.resolveFromScopes,
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
    architectureCore: ARCHITECTURE_CORE || null,
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
    connections: ['cineModuleArchitectureHelpers', 'cineModuleArchitectureCore'],
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

