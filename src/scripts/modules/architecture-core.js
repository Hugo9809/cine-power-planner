/*
 * architecture-core.js
 * ---------------------
 * Centralises the low-level bootstrapping logic that wires the modular runtime
 * together. The helpers in this file are intentionally defensive because the
 * planner must continue to operate in browsers, service workers, offline
 * contexts and automated test environments without ever risking user data.
 *
 * The primary responsibilities covered here are:
 *   • Detecting whichever global scope is available so modules can exchange
 *     shared state without depending on window-specific globals.
 *   • Resolving helper utilities (such as scope collectors) even when the
 *     bundler changes how modules are packaged.
 *   • Providing safe fallbacks when optional helpers are missing so loading the
 *     planner never interrupts saving, backups or restore flows.
 *
 * Adding the rationale up front makes it easier for future maintainers to
 * understand why the orchestration code looks verbose and how it preserves the
 * offline-first guarantees that protect user projects.
 */

(function () {
  // Key under which pending module registrations are cached before the full
  // registry boots. We keep this constant local so tests can stub it without
  // leaking additional globals.
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

  const LOCAL_SCOPE = baseDetectGlobalScope();

  // Attempt to locate helper utilities that know how to work with multiple
  // execution contexts. When running in environments that do not bundle the
  // helpers we still succeed by probing the known global scopes.
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
      : tryRequireFallback;

  const defineHiddenProperty =
    SCOPE_UTILS && typeof SCOPE_UTILS.defineHiddenProperty === 'function'
      ? SCOPE_UTILS.defineHiddenProperty
      : defineHiddenPropertyFallback;

  // The collector keeps track of all discovered scopes. That makes it possible
  // to attach shared runtime services (such as persistence guards) exactly once
  // even when multiple script bundles execute in different orders.
  function resolveScopeCollector() {
    const required = tryRequire('./helpers/scope-collector.js');
    if (required && typeof required.createCollector === 'function') {
      return required;
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

    try {
      pushCandidate(detectGlobalScope());
    } catch (error) {
      void error;
    }

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

  // Helper collectors are cached to avoid repeatedly scanning the entire
  // environment. A cache entry captures the detection strategy and optional
  // extra scopes so that each unique combination reuses the same collector.
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
    if (SCOPE_UTILS && typeof SCOPE_UTILS.collectCandidateScopes === 'function') {
      const detectFn = typeof detect === 'function' ? detect : detectGlobalScope;
      return SCOPE_UTILS.collectCandidateScopes(primary, extras, detectFn);
    }

    const detectFn = typeof detect === 'function' ? detect : detectGlobalScope;

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

  function tryRequireFallback(modulePath) {
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

  function defineHiddenPropertyFallback(target, key, value) {
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
    const tryRequireFn = options && typeof options.tryRequire === 'function' ? options.tryRequire : tryRequire;
    const collectCandidateScopes =
      options && typeof options.collectCandidateScopes === 'function'
        ? options.collectCandidateScopes
        : function collect() {
          return collectCandidateScopesImpl(null, detectGlobalScope, []);
        };

    try {
      const required = tryRequireFn('./helpers/immutability-builtins.js');
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
      if (!value || typeof value === 'function' || (typeof value !== 'object' && typeof value !== 'function')) {
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

        if (!child || typeof child === 'function' || (typeof child !== 'object' && typeof child !== 'function')) {
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

  /**
   * Core Architecture Factory
   *
   * Creates the foundational services used to bootstrap the application.
   * This design uses a "Factory Pattern" to allow for testable instances of the core
   * logic that don't pollute the global scope during unit tests.
   *
   * @param {object} options - Configuration overrides (e.g. custom primaryScope for testing).
   */
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

    /**
     * Scope Probing Logic
     *
     * The `collectCandidateScopes` function is crucial for the "islands of automation" architecture.
     * It gathers ALL potential global contexts (window, self, globalThis, etc.) where modules might have been
     * attached. This ensures that even if different parts of the app are bundled separately (e.g. webpack vs. legacy scripts),
     * they can still discover each other's services via these shared scopes.
     */
    const additionalScopes = Array.isArray(settings.additionalScopes)
      ? settings.additionalScopes.filter(function isObjectLike(value) {
        return value && (typeof value === 'object' || typeof value === 'function');
      })
      : [];

    const tryRequireFn = typeof settings.tryRequire === 'function'
      ? function tryRequireWithOverride(modulePath) {
        try {
          return settings.tryRequire(modulePath);
        } catch (error) {
          void error;
        }
        return tryRequire(modulePath);
      }
      : tryRequire;

    const pendingQueueKey =
      typeof settings.pendingQueueKey === 'string' && settings.pendingQueueKey
        ? settings.pendingQueueKey
        : DEFAULT_PENDING_QUEUE_KEY;

    const resolveOverride = typeof settings.resolveFromScopes === 'function' ? settings.resolveFromScopes : null;
    const freezeOverride = typeof settings.freezeDeep === 'function' ? settings.freezeDeep : null;
    const warnOverride = typeof settings.safeWarn === 'function' ? settings.safeWarn : null;

    function collectCandidateScopes(primary) {
      return collectCandidateScopesImpl(primary || customPrimaryScope, detectPrimaryScope, additionalScopes);
    }

    const builtinImmutability = resolveBuiltinImmutabilityImpl({
      tryRequire: tryRequireFn,
      collectCandidateScopes,
    });

    const fallbackImmutability = createFallbackImmutability(builtinImmutability);
    let activeImmutability = null;

    function resolveImmutability(scope) {
      try {
        const resolved = resolveImmutabilityImpl(scope, tryRequireFn, collectCandidateScopes);
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

    const defineHiddenPropertyFn = function defineHiddenPropertyBound(target, key, value) {
      return defineHiddenProperty(target, key, value);
    };

    return Object.freeze({
      detectGlobalScope,
      getPrimaryScope,
      collectCandidateScopes,
      tryRequire,
      resolveFromScopes,
      defineHiddenProperty: defineHiddenPropertyFn,
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

