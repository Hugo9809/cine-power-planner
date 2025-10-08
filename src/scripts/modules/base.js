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

    pushCandidate(fallbackDetectGlobalScope());
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
  const BASE_SCOPE_EXTRAS_CACHE = typeof WeakMap === 'function' ? new WeakMap() : [];

  function resolveExtrasForBaseScope(baseScope) {
    if (!baseScope || (typeof baseScope !== 'object' && typeof baseScope !== 'function')) {
      return undefined;
    }

    if (BASE_SCOPE_EXTRAS_CACHE && typeof BASE_SCOPE_EXTRAS_CACHE.get === 'function') {
      let extras = BASE_SCOPE_EXTRAS_CACHE.get(baseScope);
      if (!extras) {
        extras = [baseScope];
        BASE_SCOPE_EXTRAS_CACHE.set(baseScope, extras);
      }
      return extras;
    }

    for (let index = 0; index < BASE_SCOPE_EXTRAS_CACHE.length; index += 1) {
      const entry = BASE_SCOPE_EXTRAS_CACHE[index];
      if (entry.scope === baseScope) {
        return entry.extras;
      }
    }

    const extras = [baseScope];
    BASE_SCOPE_EXTRAS_CACHE.push({ scope: baseScope, extras });
    return extras;
  }

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

  function fallbackCollectCandidateScopes(primary, baseScope) {
    const resolvedBaseScope = baseScope || fallbackDetectGlobalScope();
    const extras = resolveExtrasForBaseScope(resolvedBaseScope);
    const collector = resolveHelperCollector(fallbackDetectGlobalScope, extras);
    if (collector) {
      return collector(primary || resolvedBaseScope);
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

    pushScope(primary || resolvedBaseScope);
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

  const BUILTIN_IMMUTABILITY = (function resolveBuiltinImmutability() {
    const registryKey = '__cineBuiltinImmutabilityGuards__';
    const scopes = fallbackCollectCandidateScopes(null, fallbackDetectGlobalScope());

    if (typeof require === 'function') {
      try {
        const required = require('./helpers/immutability-builtins.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      try {
        const candidate = scope[registryKey];
        if (candidate && typeof candidate === 'object') {
          return candidate;
        }
      } catch (error) {
        void error;
      }
    }

    return null;
  })();

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
      if (
        BUILTIN_IMMUTABILITY &&
        typeof BUILTIN_IMMUTABILITY.isImmutableBuiltin === 'function' &&
        BUILTIN_IMMUTABILITY.isImmutableBuiltin(value)
      ) {
        return true;
      }

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

    let keys;
    try {
      keys = Object.getOwnPropertyNames(value);
    } catch (error) {
      void error;
      return value;
    }
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

  function fallbackResolveModuleRegistry(scope, baseScope) {
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
  }

  function fallbackQueueModuleRegistration(scope, name, api, options, baseScope) {
    const targetScope = scope || baseScope;
    const queue = fallbackEnsureQueue(targetScope, DEFAULT_PENDING_QUEUE_KEY, baseScope);
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
      resolveModuleRegistry(scope) {
        return fallbackResolveModuleRegistry(scope || baseScope, baseScope);
      },
      queueModuleRegistration(scope, name, api, options) {
        return fallbackQueueModuleRegistration(scope || baseScope, name, api, options, baseScope);
      },
      getPendingQueueKey() {
        return DEFAULT_PENDING_QUEUE_KEY;
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

  const PENDING_QUEUE_KEY =
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

  function baseTryRequire(modulePath) {
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

  function baseResolveModuleRegistry(scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.resolveModuleRegistry === 'function') {
      try {
        const resolved = ACTIVE_KERNEL.resolveModuleRegistry(targetScope);
        if (resolved && typeof resolved === 'object') {
          return resolved;
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

  function ensureQueue(scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.ensureQueue === 'function') {
      try {
        const queue = ACTIVE_KERNEL.ensureQueue(targetScope, PENDING_QUEUE_KEY);
        if (Array.isArray(queue)) {
          return queue;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackEnsureQueue(targetScope, PENDING_QUEUE_KEY, PRIMARY_SCOPE);
  }

  function queueModuleRegistration(scope, name, api, options) {
    const targetScope = scope || PRIMARY_SCOPE;

    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.queueModuleRegistration === 'function') {
      try {
        if (ACTIVE_KERNEL.queueModuleRegistration(targetScope, name, api, options)) {
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

  function baseFreezeDeep(value) {
    if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
      return value;
    }

    if (shouldBypassDeepFreeze(value) || isEthereumProviderCandidate(value)) {
      return value;
    }

    if (ACTIVE_KERNEL && typeof ACTIVE_KERNEL.freezeDeep === 'function') {
      try {
        return ACTIVE_KERNEL.freezeDeep(value);
      } catch (error) {
        void error;
      }
    }

    return fallbackFreezeDeep(value);
  }

  function baseSafeWarn(message, detail) {
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
      connections: ['cineModuleArchitectureKernel', 'cineModuleArchitectureHelpers'],
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

