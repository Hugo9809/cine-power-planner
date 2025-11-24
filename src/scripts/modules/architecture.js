(function () {
  const DEFAULT_PENDING_QUEUE_KEY = '__cinePendingModuleRegistrations__';

  function baseDetectGlobalScope() {
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

  function fallbackDefineHiddenProperty(target, key, value) {
    if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
      return false;
    }

    try {
      Object.defineProperty(target, key, {
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
      target[key] = value;
      return true;
    } catch (assignmentError) {
      void assignmentError;
    }

    return false;
  }

  function collectCandidateScopesFallback(primary, extras, detect) {
    const detectFn = typeof detect === 'function' ? detect : baseDetectGlobalScope;
    const additionalScopes = Array.isArray(extras) ? extras : null;
    const collector = resolveHelperCollector(detectFn, additionalScopes);
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

    if (primary) {
      pushScope(primary);
    }

    try {
      pushScope(detectFn());
    } catch (detectError) {
      void detectError;
    }

    if (Array.isArray(additionalScopes)) {
      for (let index = 0; index < additionalScopes.length; index += 1) {
        pushScope(additionalScopes[index]);
      }
    }

    if (typeof globalThis !== 'undefined') pushScope(globalThis);
    if (typeof window !== 'undefined') pushScope(window);
    if (typeof self !== 'undefined') pushScope(self);
    if (typeof global !== 'undefined') pushScope(global);

    pushScope(baseDetectGlobalScope());

    return scopes;
  }

  function resolveFromScopesFallback(propertyName, options) {
    const settings = options || {};
    const predicate = typeof settings.predicate === 'function' ? settings.predicate : null;
    const scoped = Array.isArray(settings.scopes) ? settings.scopes.slice() : [];
    const detectFn = typeof settings.detect === 'function' ? settings.detect : baseDetectGlobalScope;
    const extras = Array.isArray(settings.additionalScopes) ? settings.additionalScopes : undefined;
    const primaryScope = settings.primaryScope;
    const collected = collectCandidateScopesFallback(primaryScope, extras, detectFn);

    for (let index = 0; index < collected.length; index += 1) {
      if (scoped.indexOf(collected[index]) === -1) {
        scoped.push(collected[index]);
      }
    }

    for (let index = 0; index < scoped.length; index += 1) {
      const scope = scoped[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      if (predicate) {
        try {
          if (predicate(scope, propertyName)) {
            return scope;
          }
        } catch (predicateError) {
          void predicateError;
        }
      }

      try {
        if (propertyName in scope) {
          return scope;
        }
      } catch (accessError) {
        void accessError;
      }
    }

    return null;
  }

  const LOCAL_SCOPE = baseDetectGlobalScope();

  function resolveScopeUtils(scope) {
    const primaryScope = scope || LOCAL_SCOPE;

    if (typeof require === 'function') {
      try {
        const required = require('./helpers/scope-utils.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    const candidates = [];

    function pushCandidate(candidate) {
      if (!candidate || (typeof candidate !== 'object' && typeof candidate !== 'function')) {
        return;
      }
      if (candidates.indexOf(candidate) === -1) {
        candidates.push(candidate);
      }
    }

    pushCandidate(primaryScope);
    if (typeof globalThis !== 'undefined') pushCandidate(globalThis);
    if (typeof window !== 'undefined') pushCandidate(window);
    if (typeof self !== 'undefined') pushCandidate(self);
    if (typeof global !== 'undefined') pushCandidate(global);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      try {
        const utils = candidate && candidate.cineScopeUtils;
        if (utils && typeof utils === 'object') {
          return utils;
        }
      } catch (scopeError) {
        void scopeError;
      }
    }

    return null;
  }

  const SCOPE_UTILS = resolveScopeUtils(LOCAL_SCOPE);

  const detectGlobalScope =
    SCOPE_UTILS && typeof SCOPE_UTILS.detectGlobalScope === 'function'
      ? function detectWithUtils() {
          try {
            return SCOPE_UTILS.detectGlobalScope();
          } catch (error) {
            void error;
          }
          return baseDetectGlobalScope();
        }
      : baseDetectGlobalScope;

  const tryRequire =
    SCOPE_UTILS && typeof SCOPE_UTILS.tryRequire === 'function'
      ? SCOPE_UTILS.tryRequire
      : fallbackTryRequire;

  const defineHiddenProperty =
    SCOPE_UTILS && typeof SCOPE_UTILS.defineHiddenProperty === 'function'
      ? SCOPE_UTILS.defineHiddenProperty
      : fallbackDefineHiddenProperty;

  const collectCandidateScopes =
    SCOPE_UTILS && typeof SCOPE_UTILS.collectCandidateScopes === 'function'
      ? function collectCandidateScopesWithUtils(primary, extras, detect) {
          const detectFn = typeof detect === 'function' ? detect : detectGlobalScope;
          return SCOPE_UTILS.collectCandidateScopes(primary, extras, detectFn);
        }
      : collectCandidateScopesFallback;

  const resolveFromScopes =
    SCOPE_UTILS && typeof SCOPE_UTILS.resolveFromScopes === 'function'
      ? function resolveWithUtils(propertyName, options) {
          const settings = options ? cloneOptions(options) : {};
          if (!settings.primaryScope) {
            settings.primaryScope = LOCAL_SCOPE;
          }
          if (!settings.detect) {
            settings.detect = detectGlobalScope;
          }
          return SCOPE_UTILS.resolveFromScopes(propertyName, settings) || null;
        }
      : resolveFromScopesFallback;

  function resolveScopeCollector() {
    const required = tryRequire('./helpers/scope-collector.js');
    if (required && typeof required.createCollector === 'function') {
      return required;
    }

    const candidates = collectCandidateScopes(LOCAL_SCOPE, null, detectGlobalScope);

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

  function cloneOptions(source) {
    if (!source || typeof source !== 'object') {
      return {};
    }

    const clone = {};
    const keys = Object.keys(source);
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      clone[key] = source[key];
    }
    return clone;
  }

  function fallbackCreateImmutability() {
    function shouldBypass(value) {
      if (!value || typeof value === 'function' || (typeof value !== 'object' && typeof value !== 'function')) {
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

    function freeze(value, seen = new WeakSet()) {
      if (!value || typeof value === 'function' || (typeof value !== 'object' && typeof value !== 'function')) {
        return value;
      }

      if (shouldBypass(value)) {
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
        if (!child || typeof child === 'function' || (typeof child !== 'object' && typeof child !== 'function')) {
          continue;
        }

        freeze(child, seen);
      }

      try {
        return Object.freeze(value);
      } catch (freezeError) {
        void freezeError;
        return value;
      }
    }

    return {
      shouldBypassDeepFreeze: shouldBypass,
      freezeDeep: freeze,
    };
  }

  const FALLBACK_IMMUTABILITY = fallbackCreateImmutability();

  function fallbackEnsureQueue(scope, key) {
    if (!scope || typeof scope !== 'object') {
      return null;
    }

    const queueKey = typeof key === 'string' && key ? key : DEFAULT_PENDING_QUEUE_KEY;

    let queue = scope[queueKey];
    if (Array.isArray(queue)) {
      return queue;
    }

    if (defineHiddenProperty(scope, queueKey, [])) {
      queue = scope[queueKey];
      if (Array.isArray(queue)) {
        return queue;
      }
    }

    try {
      scope[queueKey] = [];
      queue = scope[queueKey];
      if (Array.isArray(queue)) {
        return queue;
      }
    } catch (error) {
      void error;
    }

    return null;
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

  function resolveArchitectureCore(scope) {
    const required = tryRequire('./architecture-core.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const candidates = collectCandidateScopes(scope, null, detectGlobalScope);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate && typeof candidate.cineModuleArchitectureCore === 'object') {
        return candidate.cineModuleArchitectureCore;
      }
    }

    return null;
  }

  function createFallbackCore(options) {
    const settings = options || {};

    const customPrimaryScope =
      (settings && (settings.primaryScope || settings.scope)) &&
      (typeof settings.primaryScope === 'object' || typeof settings.primaryScope === 'function'
        ? settings.primaryScope
        : typeof settings.scope === 'object' || typeof settings.scope === 'function'
          ? settings.scope
          : null);

    const detectOverride = typeof settings.detectGlobalScope === 'function' ? settings.detectGlobalScope : null;
    const resolveOverride = typeof settings.resolveFromScopes === 'function' ? settings.resolveFromScopes : null;
    const freezeOverride = typeof settings.freezeDeep === 'function' ? settings.freezeDeep : null;
    const warnOverride = typeof settings.safeWarn === 'function' ? settings.safeWarn : null;
    const tryRequireOverride = typeof settings.tryRequire === 'function' ? settings.tryRequire : null;

    const additionalScopes = Array.isArray(settings.additionalScopes)
      ? settings.additionalScopes.filter(function isObjectLike(value) {
          return value && (typeof value === 'object' || typeof value === 'function');
        })
      : [];

    const pendingQueueKey =
      typeof settings.pendingQueueKey === 'string' && settings.pendingQueueKey
        ? settings.pendingQueueKey
        : DEFAULT_PENDING_QUEUE_KEY;

    let cachedPrimaryScope = null;

    function detectPrimaryScope() {
      try {
        if (detectOverride) {
          const detected = detectOverride();
          if (detected) {
            cachedPrimaryScope = detected;
            return detected;
          }
        }
      } catch (error) {
        void error;
      }

      if (cachedPrimaryScope) {
        return cachedPrimaryScope;
      }

      const detected = customPrimaryScope || detectGlobalScope();
      cachedPrimaryScope = detected;
      return detected;
    }

    function getPrimaryScope() {
      return detectPrimaryScope();
    }

    function collectCandidateScopes(primary) {
      const targetPrimary = primary || customPrimaryScope;
      const collector = resolveHelperCollector(detectPrimaryScope, additionalScopes);
      if (collector) {
        return collector(targetPrimary);
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

      pushScope(targetPrimary);
      pushScope(detectPrimaryScope());
      if (typeof globalThis !== 'undefined') pushScope(globalThis);
      if (typeof window !== 'undefined') pushScope(window);
      if (typeof self !== 'undefined') pushScope(self);
      if (typeof global !== 'undefined') pushScope(global);

      for (let index = 0; index < additionalScopes.length; index += 1) {
        pushScope(additionalScopes[index]);
      }

      return scopes;
    }

    const tryRequireImpl = tryRequireOverride
      ? function tryRequireWithOverride(modulePath) {
          try {
            return tryRequireOverride(modulePath);
          } catch (error) {
            void error;
          }
          return tryRequire(modulePath);
        }
      : tryRequire;

    let activeImmutability = null;

    function resolveImmutability(scope) {
      try {
        const required = tryRequireImpl('./immutability.js');
        if (required && typeof required === 'object') {
          activeImmutability = required;
          return required;
        }
      } catch (error) {
        void error;
      }

      const scopes = collectCandidateScopes(scope);
      for (let index = 0; index < scopes.length; index += 1) {
        const candidate = scopes[index];
        if (candidate && typeof candidate.cineModuleImmutability === 'object') {
          activeImmutability = candidate.cineModuleImmutability;
          return activeImmutability;
        }
      }

      return null;
    }

    function getImmutability(scope) {
      if (activeImmutability && activeImmutability !== FALLBACK_IMMUTABILITY) {
        return activeImmutability;
      }

      const resolved = resolveImmutability(scope || getPrimaryScope());
      if (resolved && resolved !== activeImmutability) {
        activeImmutability = resolved;
        return resolved;
      }

      activeImmutability = FALLBACK_IMMUTABILITY;
      return activeImmutability;
    }

    function freezeDeep(value, seen) {
      if (freezeOverride) {
        try {
          return freezeOverride(value, seen);
        } catch (error) {
          void error;
        }
      }

      const provider = getImmutability();
      try {
        return provider.freezeDeep(value, seen);
      } catch (error) {
        void error;
      }

      return FALLBACK_IMMUTABILITY.freezeDeep(value, seen);
    }

    function ensureQueue(scope, key) {
      const queueKey = typeof key === 'string' && key ? key : pendingQueueKey;
      return fallbackEnsureQueue(scope || getPrimaryScope(), queueKey);
    }

    function resolveFromScopesInternal(propertyName, resolveOptions) {
      if (resolveOverride) {
        try {
          return resolveOverride(propertyName, resolveOptions);
        } catch (error) {
          void error;
        }
      }

      const optionsToUse = cloneOptions(resolveOptions);
      if (!optionsToUse.scopes) {
        optionsToUse.scopes = collectCandidateScopes(optionsToUse.primaryScope);
      }
      return resolveFromScopes(propertyName, optionsToUse);
    }

    function safeWarn(message, detail) {
      if (warnOverride) {
        try {
          warnOverride(message, detail);
          return;
        } catch (error) {
          void error;
        }
      }
      fallbackSafeWarn(message, detail);
    }

    return Object.freeze({
      detectGlobalScope: detectPrimaryScope,
      getPrimaryScope,
      collectCandidateScopes,
      tryRequire: tryRequireImpl,
      resolveFromScopes: resolveFromScopesInternal,
      defineHiddenProperty,
      ensureQueue,
      freezeDeep,
      safeWarn,
    });
  }

  const ARCHITECTURE_CORE = resolveArchitectureCore(detectGlobalScope());
  const CORE_FACTORY = ARCHITECTURE_CORE && typeof ARCHITECTURE_CORE.createCore === 'function'
    ? ARCHITECTURE_CORE.createCore
    : createFallbackCore;

  function instantiateCore(options) {
    const fallbackInstance = createFallbackCore(options);

    if (!CORE_FACTORY || typeof CORE_FACTORY !== 'function') {
      return {
        primary: fallbackInstance,
        fallback: fallbackInstance,
      };
    }

    try {
      const instance = CORE_FACTORY(options || {});
      if (instance && typeof instance === 'object') {
        return {
          primary: instance,
          fallback: fallbackInstance,
        };
      }
    } catch (error) {
      fallbackSafeWarn('cineModuleArchitecture: core factory failed; using fallback core.', error);
    }

    return {
      primary: fallbackInstance,
      fallback: fallbackInstance,
    };
  }

  function wrapMethod(primaryCore, fallbackCore, methodName, fallbackImpl, warn) {
    const primaryFn =
      primaryCore && typeof primaryCore[methodName] === 'function' ? primaryCore[methodName] : null;
    const fallbackFn =
      fallbackCore && typeof fallbackCore[methodName] === 'function' ? fallbackCore[methodName] : null;
    const ultimateFallback = typeof fallbackImpl === 'function' ? fallbackImpl : null;

    const shouldSuppressWarning = (error) => {
      if (!error || typeof error.message !== 'string') {
        return false;
      }
      if (error.message.includes('trap returned extra keys but proxy target is non-extensible')) {
        return true;
      }
      if (error.message.includes('Cannot freeze')) {
        return true;
      }
      return false;
    };

    return function wrappedMethod() {
      const args = arguments;

      if (primaryFn) {
        try {
          return primaryFn.apply(primaryCore, args);
        } catch (error) {
          if (typeof warn === 'function') {
            try {
              if (!shouldSuppressWarning(error)) {
                warn('cineModuleArchitecture.' + methodName + ': primary implementation failed, using fallback.', error);
              }
            } catch (warnError) {
              void warnError;
            }
          }
        }
      }

      if (fallbackFn) {
        return fallbackFn.apply(fallbackCore, args);
      }

      if (ultimateFallback) {
        return ultimateFallback.apply(null, args);
      }

      return undefined;
    };
  }

  function createArchitectureInstance(options) {
    const instances = instantiateCore(options || {});
    const primaryCore = instances.primary;
    const fallbackCore = instances.fallback;

    const safeWarn = wrapMethod(primaryCore, fallbackCore, 'safeWarn', fallbackSafeWarn, null);

    function wrap(methodName, fallbackImpl) {
      return wrapMethod(primaryCore, fallbackCore, methodName, fallbackImpl, safeWarn);
    }

    const detectGlobalScopeFn = wrap('detectGlobalScope', baseDetectGlobalScope);
    const getPrimaryScope = wrap('getPrimaryScope', function defaultGetPrimaryScope() {
      return detectGlobalScopeFn();
    });
    const collectCandidateScopesFn = wrap('collectCandidateScopes', function collectWithFallback(primary) {
      const target = primary || getPrimaryScope();
      return collectCandidateScopes(target);
    });
    const tryRequireFn = wrap('tryRequire', tryRequire);
    const resolveFromScopesFn = wrap('resolveFromScopes', function resolveWithFallback(propertyName, resolveOptions) {
      const optionsToUse = cloneOptions(resolveOptions);
      if (!optionsToUse.scopes) {
        optionsToUse.scopes = collectCandidateScopesFn(optionsToUse.primaryScope);
      }
      return resolveFromScopes(propertyName, optionsToUse);
    });
    const defineHiddenPropertyFn = wrap('defineHiddenProperty', defineHiddenProperty);
    const ensureQueueFn = wrap('ensureQueue', function ensureQueueWithFallback(scope, key) {
      const scopeToUse = scope || getPrimaryScope();
      return fallbackEnsureQueue(scopeToUse, key);
    });
    const freezeDeepFn = wrap('freezeDeep', function freezeDeepWithFallback(value, seen) {
      return FALLBACK_IMMUTABILITY.freezeDeep(value, seen);
    });

    return Object.freeze({
      detectGlobalScope: detectGlobalScopeFn,
      getPrimaryScope,
      collectCandidateScopes: collectCandidateScopesFn,
      tryRequire: tryRequireFn,
      resolveFromScopes: resolveFromScopesFn,
      defineHiddenProperty: defineHiddenPropertyFn,
      ensureQueue: ensureQueueFn,
      freezeDeep: freezeDeepFn,
      safeWarn,
    });
  }

  const defaultInstance = createArchitectureInstance({});

  const architecture = Object.freeze({
    detectGlobalScope: defaultInstance.detectGlobalScope,
    collectCandidateScopes: defaultInstance.collectCandidateScopes,
    tryRequire: defaultInstance.tryRequire,
    resolveFromScopes: defaultInstance.resolveFromScopes,
    defineHiddenProperty: defaultInstance.defineHiddenProperty,
    ensureQueue: defaultInstance.ensureQueue,
    freezeDeep: defaultInstance.freezeDeep,
    safeWarn: defaultInstance.safeWarn,
  });

  function createModuleArchitecture(options) {
    const settings = options || {};

    const customPrimaryScope =
      (settings && (settings.primaryScope || settings.scope)) &&
      (typeof settings.primaryScope === 'object' || typeof settings.primaryScope === 'function'
        ? settings.primaryScope
        : typeof settings.scope === 'object' || typeof settings.scope === 'function'
          ? settings.scope
          : null);

    const detectOverride = typeof settings.detectGlobalScope === 'function'
      ? settings.detectGlobalScope
      : function detectOverride() {
          return customPrimaryScope || defaultInstance.detectGlobalScope();
        };

    const additionalScopes = Array.isArray(settings.additionalScopes)
      ? settings.additionalScopes.filter(function isObjectLike(value) {
          return value && (typeof value === 'object' || typeof value === 'function');
        })
      : [];

    const tryRequireOverride = typeof settings.tryRequire === 'function' ? settings.tryRequire : defaultInstance.tryRequire;
    const resolveOverride = typeof settings.resolveFromScopes === 'function' ? settings.resolveFromScopes : null;
    const ensureQueueDefaultKey =
      typeof settings.pendingQueueKey === 'string' && settings.pendingQueueKey
        ? settings.pendingQueueKey
        : DEFAULT_PENDING_QUEUE_KEY;
    const freezeOverride = typeof settings.freezeDeep === 'function' ? settings.freezeDeep : defaultInstance.freezeDeep;
    const warnOverride = typeof settings.safeWarn === 'function' ? settings.safeWarn : defaultInstance.safeWarn;

    const instance = createArchitectureInstance({
      primaryScope: customPrimaryScope,
      detectGlobalScope: detectOverride,
      additionalScopes,
      tryRequire: tryRequireOverride,
      resolveFromScopes: resolveOverride,
      pendingQueueKey: ensureQueueDefaultKey,
      freezeDeep: freezeOverride,
      safeWarn: warnOverride,
    });

    return Object.freeze({
      detectGlobalScope: instance.detectGlobalScope,
      collectCandidateScopes: instance.collectCandidateScopes,
      tryRequire: instance.tryRequire,
      resolveFromScopes: instance.resolveFromScopes,
      defineHiddenProperty: instance.defineHiddenProperty,
      ensureQueue: instance.ensureQueue,
      freezeDeep: instance.freezeDeep,
      safeWarn: instance.safeWarn,
    });
  }

  const architectureWithFactory = Object.freeze({
    ...architecture,
    createModuleArchitecture,
  });

  const globalScope = defaultInstance.getPrimaryScope
    ? defaultInstance.getPrimaryScope()
    : defaultInstance.detectGlobalScope();

  if (globalScope && typeof globalScope === 'object' && !globalScope.cineModuleArchitecture) {
    architecture.defineHiddenProperty(globalScope, 'cineModuleArchitecture', architectureWithFactory);
  }

  if (globalScope && typeof globalScope === 'object' && !globalScope.cineModuleArchitectureFactory) {
    architecture.defineHiddenProperty(globalScope, 'cineModuleArchitectureFactory', Object.freeze({
      createModuleArchitecture,
    }));
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = architectureWithFactory;
  }
})();

