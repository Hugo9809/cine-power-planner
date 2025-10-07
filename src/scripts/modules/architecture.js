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

    if (primary) {
      pushScope(primary);
    }

    pushScope(fallbackDetectGlobalScope());
    if (typeof globalThis !== 'undefined') pushScope(globalThis);
    if (typeof window !== 'undefined') pushScope(window);
    if (typeof self !== 'undefined') pushScope(self);
    if (typeof global !== 'undefined') pushScope(global);

    return scopes;
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

  function fallbackResolveFromScopes(propertyName, options) {
    const settings = options || {};
    const predicate = typeof settings.predicate === 'function' ? settings.predicate : null;
    const scopes = Array.isArray(settings.scopes) ? settings.scopes.slice() : [];

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
      if (candidate && typeof candidate === 'object') {
        return candidate;
      }
    }

    return null;
  }

  function fallbackCreateImmutability() {
    function shouldBypass(value) {
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

    function freeze(value, seen = new WeakSet()) {
      if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
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
        if (!child || (typeof child !== 'object' && typeof child !== 'function')) {
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

    if (fallbackDefineHiddenProperty(scope, queueKey, [])) {
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
    const primary = scope || fallbackDetectGlobalScope();
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

    function detectGlobalScope() {
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

      const detected = customPrimaryScope || fallbackDetectGlobalScope();
      cachedPrimaryScope = detected;
      return detected;
    }

    function getPrimaryScope() {
      return detectGlobalScope();
    }

    function collectCandidateScopes(primary) {
      const scopes = [];

      function pushScope(scope) {
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
          return;
        }
        if (scopes.indexOf(scope) === -1) {
          scopes.push(scope);
        }
      }

      pushScope(primary || customPrimaryScope);
      pushScope(getPrimaryScope());
      if (typeof globalThis !== 'undefined') pushScope(globalThis);
      if (typeof window !== 'undefined') pushScope(window);
      if (typeof self !== 'undefined') pushScope(self);
      if (typeof global !== 'undefined') pushScope(global);

      for (let index = 0; index < additionalScopes.length; index += 1) {
        pushScope(additionalScopes[index]);
      }

      return scopes;
    }

    const tryRequire = tryRequireOverride
      ? function tryRequireWithOverride(modulePath) {
          try {
            return tryRequireOverride(modulePath);
          } catch (error) {
            void error;
          }
          return fallbackTryRequire(modulePath);
        }
      : fallbackTryRequire;

    let activeImmutability = null;

    function resolveImmutability(scope) {
      try {
        const required = tryRequire('./immutability.js');
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

    function resolveFromScopes(propertyName, resolveOptions) {
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
      return fallbackResolveFromScopes(propertyName, optionsToUse);
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
      detectGlobalScope,
      getPrimaryScope,
      collectCandidateScopes,
      tryRequire,
      resolveFromScopes,
      defineHiddenProperty: fallbackDefineHiddenProperty,
      ensureQueue,
      freezeDeep,
      safeWarn,
    });
  }

  const ARCHITECTURE_CORE = resolveArchitectureCore(fallbackDetectGlobalScope());
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

    const detectGlobalScope = wrap('detectGlobalScope', fallbackDetectGlobalScope);
    const getPrimaryScope = wrap('getPrimaryScope', function defaultGetPrimaryScope() {
      return detectGlobalScope();
    });
    const collectCandidateScopes = wrap('collectCandidateScopes', function collectWithFallback(primary) {
      const target = primary || getPrimaryScope();
      return fallbackCollectCandidateScopes(target);
    });
    const tryRequire = wrap('tryRequire', fallbackTryRequire);
    const resolveFromScopes = wrap('resolveFromScopes', function resolveWithFallback(propertyName, resolveOptions) {
      const optionsToUse = cloneOptions(resolveOptions);
      if (!optionsToUse.scopes) {
        optionsToUse.scopes = collectCandidateScopes(optionsToUse.primaryScope);
      }
      return fallbackResolveFromScopes(propertyName, optionsToUse);
    });
    const defineHiddenProperty = wrap('defineHiddenProperty', fallbackDefineHiddenProperty);
    const ensureQueue = wrap('ensureQueue', function ensureQueueWithFallback(scope, key) {
      const scopeToUse = scope || getPrimaryScope();
      return fallbackEnsureQueue(scopeToUse, key);
    });
    const freezeDeep = wrap('freezeDeep', function freezeDeepWithFallback(value, seen) {
      return FALLBACK_IMMUTABILITY.freezeDeep(value, seen);
    });

    return Object.freeze({
      detectGlobalScope,
      getPrimaryScope,
      collectCandidateScopes,
      tryRequire,
      resolveFromScopes,
      defineHiddenProperty,
      ensureQueue,
      freezeDeep,
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

