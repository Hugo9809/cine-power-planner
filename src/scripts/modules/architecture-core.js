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

    pushCandidate(baseDetectGlobalScope());
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
    const extrasKey = Array.isArray(extras) ? extras : DEFAULT_EXTRAS_KEY;

    for (let index = 0; index < HELPER_COLLECTOR_CACHE.length; index += 1) {
      const entry = HELPER_COLLECTOR_CACHE[index];
      if (entry.detect === detectFn && entry.extras === extrasKey) {
        return entry.collector;
      }
    }

    const collector = createScopeCollector
      ? createScopeCollector({
          detectGlobalScope: detectFn,
          additionalScopes: Array.isArray(extras) ? extras : undefined,
        })
      : null;

    if (collector) {
      HELPER_COLLECTOR_CACHE.push({ detect: detectFn, extras: extrasKey, collector });
      return collector;
    }

    return null;
  }

  function collectCandidateScopesImpl(primary, detect, extras) {
    const detectFn = typeof detect === 'function' ? detect : baseDetectGlobalScope;

    if (createScopeCollector) {
      const collector = resolveHelperCollector(detectFn, extras);
      if (collector) {
        return collector(primary);
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

    try {
      const detected = detectFn();
      pushScope(detected);
    } catch (error) {
      void error;
    }

    if (typeof globalThis !== 'undefined') pushScope(globalThis);
    if (typeof window !== 'undefined') pushScope(window);
    if (typeof self !== 'undefined') pushScope(self);
    if (typeof global !== 'undefined') pushScope(global);

    if (Array.isArray(extras)) {
      for (let index = 0; index < extras.length; index += 1) {
        pushScope(extras[index]);
      }
    }

    return scopes.slice();
  }

  function tryRequireImpl(modulePath) {
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

  function defineHiddenPropertyImpl(target, key, value) {
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

  function ensureQueueImpl(scope, key, defineHiddenProperty) {
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

  function safeWarnImpl(message, detail) {
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

  function resolveFromScopesImpl(propertyName, options) {
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

  function resolveImmutabilityImpl(scope, tryRequire, collectCandidateScopes) {
    const targetScope = scope || baseDetectGlobalScope();

    try {
      const required = tryRequire('./immutability.js');
      if (required && typeof required === 'object') {
        return required;
      }
    } catch (error) {
      void error;
    }

    const scopes = collectCandidateScopes(targetScope);
    for (let index = 0; index < scopes.length; index += 1) {
      const candidate = scopes[index];
      if (candidate && typeof candidate.cineModuleImmutability === 'object') {
        return candidate.cineModuleImmutability;
      }
    }

    return null;
  }

  function resolveBuiltinImmutabilityImpl(options) {
    const tryRequire = options && typeof options.tryRequire === 'function' ? options.tryRequire : tryRequireImpl;
    const collectCandidateScopes =
      options && typeof options.collectCandidateScopes === 'function'
        ? options.collectCandidateScopes
        : function collect() {
            return collectCandidateScopesImpl(null, baseDetectGlobalScope, []);
          };

    try {
      const required = tryRequire('./helpers/immutability-builtins.js');
      if (required && typeof required === 'object') {
        return required;
      }
    } catch (error) {
      void error;
    }

    const registryKey = '__cineBuiltinImmutabilityGuards__';
    const scopes = collectCandidateScopes();

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
  }

  function createFallbackImmutability(builtin) {
    function shouldBypass(value) {
      if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
        return false;
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

        if (
          builtin &&
          typeof builtin.isImmutableBuiltin === 'function' &&
          builtin.isImmutableBuiltin(value)
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
          freeze(child, seen);
        } catch (childError) {
          void childError;
        }
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

  function createCore(options) {
    const settings = options || {};

    const customPrimaryScope =
      (settings && (settings.primaryScope || settings.scope)) &&
      (typeof settings.primaryScope === 'object' || typeof settings.primaryScope === 'function'
        ? settings.primaryScope
        : typeof settings.scope === 'object' || typeof settings.scope === 'function'
          ? settings.scope
          : null);

    const detectOverride = typeof settings.detectGlobalScope === 'function' ? settings.detectGlobalScope : null;

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

      const detected = customPrimaryScope || baseDetectGlobalScope();
      cachedPrimaryScope = detected;
      return detected;
    }

    function getPrimaryScope() {
      return detectGlobalScope();
    }

    const additionalScopes = Array.isArray(settings.additionalScopes)
      ? settings.additionalScopes.filter(function isObjectLike(value) {
          return value && (typeof value === 'object' || typeof value === 'function');
        })
      : [];

    const tryRequire = typeof settings.tryRequire === 'function'
      ? function tryRequireWithOverride(modulePath) {
          try {
            return settings.tryRequire(modulePath);
          } catch (error) {
            void error;
          }
          return tryRequireImpl(modulePath);
        }
      : tryRequireImpl;

    const pendingQueueKey =
      typeof settings.pendingQueueKey === 'string' && settings.pendingQueueKey
        ? settings.pendingQueueKey
        : DEFAULT_PENDING_QUEUE_KEY;

    const resolveOverride = typeof settings.resolveFromScopes === 'function' ? settings.resolveFromScopes : null;
    const freezeOverride = typeof settings.freezeDeep === 'function' ? settings.freezeDeep : null;
    const warnOverride = typeof settings.safeWarn === 'function' ? settings.safeWarn : null;

    function collectCandidateScopes(primary) {
      return collectCandidateScopesImpl(primary || customPrimaryScope, detectGlobalScope, additionalScopes);
    }

    const builtinImmutability = resolveBuiltinImmutabilityImpl({
      tryRequire,
      collectCandidateScopes,
    });

    const fallbackImmutability = createFallbackImmutability(builtinImmutability);
    let activeImmutability = null;

    function resolveImmutability(scope) {
      try {
        const resolved = resolveImmutabilityImpl(scope, tryRequire, collectCandidateScopes);
        if (resolved) {
          activeImmutability = resolved;
          return resolved;
        }
      } catch (error) {
        void error;
      }
      return null;
    }

    function getImmutability(scope) {
      if (activeImmutability && activeImmutability !== fallbackImmutability) {
        return activeImmutability;
      }

      const resolved = resolveImmutability(scope || getPrimaryScope());
      if (resolved && resolved !== activeImmutability) {
        activeImmutability = resolved;
        return resolved;
      }

      activeImmutability = fallbackImmutability;
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

      return fallbackImmutability.freezeDeep(value, seen);
    }

    function ensureQueue(scope, key) {
      const queueKey = typeof key === 'string' && key ? key : pendingQueueKey;
      return ensureQueueImpl(scope || getPrimaryScope(), queueKey, defineHiddenProperty);
    }

    function resolveFromScopes(propertyName, resolveOptions) {
      if (resolveOverride) {
        try {
          return resolveOverride(propertyName, resolveOptions);
        } catch (error) {
          void error;
        }
      }

      const optionsToUse = resolveOptions ? { ...resolveOptions } : {};
      if (!optionsToUse.scopes) {
        optionsToUse.scopes = collectCandidateScopes(optionsToUse.primaryScope);
      }
      return resolveFromScopesImpl(propertyName, optionsToUse);
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
      safeWarnImpl(message, detail);
    }

    const defineHiddenProperty = function defineHiddenPropertyBound(target, key, value) {
      return defineHiddenPropertyImpl(target, key, value);
    };

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
      resolveImmutability,
      getImmutability,
      pendingQueueKey,
      fallbackImmutability,
    });
  }

  const defaultCore = createCore();

  const architectureCore = Object.freeze({
    DEFAULT_PENDING_QUEUE_KEY,
    createCore,
    detectGlobalScope: defaultCore.detectGlobalScope,
    getPrimaryScope: defaultCore.getPrimaryScope,
    collectCandidateScopes: defaultCore.collectCandidateScopes,
    tryRequire: defaultCore.tryRequire,
    resolveFromScopes: defaultCore.resolveFromScopes,
    defineHiddenProperty: defaultCore.defineHiddenProperty,
    ensureQueue: defaultCore.ensureQueue,
    freezeDeep: defaultCore.freezeDeep,
    safeWarn: defaultCore.safeWarn,
    resolveImmutability: defaultCore.resolveImmutability,
    getImmutability: defaultCore.getImmutability,
  });

  const globalScope = defaultCore.detectGlobalScope();

  if (globalScope && typeof globalScope === 'object' && !globalScope.cineModuleArchitectureCore) {
    defaultCore.defineHiddenProperty(globalScope, 'cineModuleArchitectureCore', architectureCore);
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = architectureCore;
  }
})();

