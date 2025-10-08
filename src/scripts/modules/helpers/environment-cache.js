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

  function isObjectLike(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function pushUnique(target, value) {
    if (!isObjectLike(value)) {
      return;
    }
    if (target.indexOf(value) === -1) {
      target.push(value);
    }
  }

  function safeFreeze(array) {
    if (!array) {
      return array;
    }
    if (typeof Object.freeze !== 'function') {
      return array;
    }
    try {
      return Object.freeze(array);
    } catch (error) {
      void error;
    }
    return array;
  }

  function safeClone(array) {
    if (!Array.isArray(array)) {
      return [];
    }
    try {
      return Array.prototype.slice.call(array);
    } catch (error) {
      void error;
    }
    const clone = [];
    for (let index = 0; index < array.length; index += 1) {
      clone[index] = array[index];
    }
    return clone;
  }

  function resolveScopeCollector() {
    if (typeof require === 'function') {
      try {
        const required = require('./scope-collector.js');
        if (required && typeof required.createCollector === 'function') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    const candidates = [];

    function pushCandidate(scope) {
      if (!isObjectLike(scope)) {
        return;
      }
      if (candidates.indexOf(scope) === -1) {
        candidates.push(scope);
      }
    }

    const detected = fallbackDetectGlobalScope();
    pushCandidate(detected);
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
  const createCollector =
    SCOPE_COLLECTOR && typeof SCOPE_COLLECTOR.createCollector === 'function'
      ? SCOPE_COLLECTOR.createCollector
      : null;

  const BASE_SCOPES = (function buildBaseScopes() {
    const scopes = [];
    pushUnique(scopes, typeof globalThis !== 'undefined' ? globalThis : null);
    pushUnique(scopes, typeof window !== 'undefined' ? window : null);
    pushUnique(scopes, typeof self !== 'undefined' ? self : null);
    pushUnique(scopes, typeof global !== 'undefined' ? global : null);
    return safeFreeze(scopes);
  })();

  const EMPTY_EXTRAS = safeFreeze([]);
  const DEFAULT_EXTRAS_KEY = { key: 'defaultExtras' };
  const HELPER_COLLECTOR_CACHE = [];
  const SUPPORTS_WEAKMAP = typeof WeakMap === 'function';
  const FALLBACK_CACHE = SUPPORTS_WEAKMAP
    ? {
        byDetect: new WeakMap(),
      }
    : null;

  function sanitizeExtras(extras) {
    if (!Array.isArray(extras) || extras.length === 0) {
      return { list: EMPTY_EXTRAS, key: DEFAULT_EXTRAS_KEY };
    }

    const sanitized = [];
    for (let index = 0; index < extras.length; index += 1) {
      pushUnique(sanitized, extras[index]);
    }

    if (sanitized.length === 0) {
      return { list: EMPTY_EXTRAS, key: DEFAULT_EXTRAS_KEY };
    }

    const frozen = safeFreeze(sanitized.slice());
    return { list: frozen, key: frozen };
  }

  function resolveHelperCollector(detectFn, extrasInfo) {
    const extrasKey = extrasInfo ? extrasInfo.key : DEFAULT_EXTRAS_KEY;

    for (let index = 0; index < HELPER_COLLECTOR_CACHE.length; index += 1) {
      const entry = HELPER_COLLECTOR_CACHE[index];
      if (entry.detect === detectFn && entry.extras === extrasKey) {
        return entry.collector;
      }
    }

    if (!createCollector) {
      return null;
    }

    const collector = createCollector({
      detectGlobalScope: detectFn,
      additionalScopes: extrasInfo && extrasInfo.list !== EMPTY_EXTRAS ? extrasInfo.list : undefined,
    });

    if (collector) {
      HELPER_COLLECTOR_CACHE.push({ detect: detectFn, extras: extrasKey, collector });
      return collector;
    }

    return null;
  }

  function peekFallbackCacheEntry(detectFn, extrasKey) {
    if (!FALLBACK_CACHE) {
      return null;
    }

    const detectCache = FALLBACK_CACHE.byDetect.get(detectFn);
    if (!detectCache) {
      return null;
    }

    return detectCache.get(extrasKey) || null;
  }

  function ensureFallbackCacheEntry(detectFn, extrasKey) {
    if (!FALLBACK_CACHE) {
      return null;
    }

    let detectCache = FALLBACK_CACHE.byDetect.get(detectFn);
    if (!detectCache) {
      detectCache = new Map();
      FALLBACK_CACHE.byDetect.set(detectFn, detectCache);
    }

    let extrasCache = detectCache.get(extrasKey);
    if (!extrasCache) {
      extrasCache = {
        objects: new WeakMap(),
        primitives: Object.create(null),
        empty: null,
      };
      detectCache.set(extrasKey, extrasCache);
    }

    return extrasCache;
  }

  function readFromFallbackCache(cacheEntry, primary) {
    if (!cacheEntry) {
      return null;
    }

    if (isObjectLike(primary)) {
      if (cacheEntry.objects.has(primary)) {
        return safeClone(cacheEntry.objects.get(primary));
      }
      return null;
    }

    if (typeof primary === 'undefined') {
      return cacheEntry.empty ? safeClone(cacheEntry.empty) : null;
    }

    const primitiveKey = typeof primary + ':' + String(primary);
    if (Object.prototype.hasOwnProperty.call(cacheEntry.primitives, primitiveKey)) {
      return safeClone(cacheEntry.primitives[primitiveKey]);
    }

    return null;
  }

  function storeInFallbackCache(cacheEntry, primary, value) {
    if (!cacheEntry) {
      return;
    }

    if (isObjectLike(primary)) {
      cacheEntry.objects.set(primary, value);
      return;
    }

    if (typeof primary === 'undefined') {
      cacheEntry.empty = value;
      return;
    }

    const primitiveKey = typeof primary + ':' + String(primary);
    cacheEntry.primitives[primitiveKey] = value;
  }

  function fallbackCollectCandidateScopes(primary, detectFn, extrasInfo) {
    const extrasKey = extrasInfo ? extrasInfo.key : DEFAULT_EXTRAS_KEY;
    const cacheEntry = peekFallbackCacheEntry(detectFn, extrasKey);
    const cached = readFromFallbackCache(cacheEntry, primary);
    if (cached) {
      return cached;
    }

    const scopes = [];

    function pushScope(scope) {
      if (!isObjectLike(scope)) {
        return;
      }
      if (scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }

    pushScope(primary);

    let detected = null;
    if (typeof detectFn === 'function') {
      try {
        detected = detectFn();
      } catch (error) {
        void error;
        detected = null;
      }
    }
    pushScope(detected);

    for (let index = 0; index < BASE_SCOPES.length; index += 1) {
      pushScope(BASE_SCOPES[index]);
    }

    if (extrasInfo && Array.isArray(extrasInfo.list)) {
      for (let index = 0; index < extrasInfo.list.length; index += 1) {
        pushScope(extrasInfo.list[index]);
      }
    }

    const cloned = safeClone(scopes);
    const writableCache = cacheEntry || ensureFallbackCacheEntry(detectFn, extrasKey);
    storeInFallbackCache(writableCache, primary, cloned);

    return cloned;
  }

  function collectCandidateScopes(primary, detect, extras) {
    const detectFn = typeof detect === 'function' ? detect : fallbackDetectGlobalScope;
    const extrasInfo = sanitizeExtras(extras);
    const collector = resolveHelperCollector(detectFn, extrasInfo);

    if (collector) {
      return collector(primary);
    }

    return fallbackCollectCandidateScopes(primary, detectFn, extrasInfo);
  }

  const TRY_REQUIRE_CACHE = {};

  function tryRequire(modulePath) {
    if (typeof modulePath !== 'string' || !modulePath) {
      return null;
    }

    if (Object.prototype.hasOwnProperty.call(TRY_REQUIRE_CACHE, modulePath)) {
      return TRY_REQUIRE_CACHE[modulePath];
    }

    if (typeof require !== 'function') {
      TRY_REQUIRE_CACHE[modulePath] = null;
      return null;
    }

    try {
      const required = require(modulePath);
      TRY_REQUIRE_CACHE[modulePath] = typeof required === 'undefined' ? null : required;
      return TRY_REQUIRE_CACHE[modulePath];
    } catch (error) {
      void error;
    }

    TRY_REQUIRE_CACHE[modulePath] = null;
    return null;
  }

  let cachedGlobalScope = null;
  let hasCachedGlobalScope = false;

  function detectGlobalScope() {
    if (hasCachedGlobalScope) {
      return cachedGlobalScope;
    }

    const detected = fallbackDetectGlobalScope();
    cachedGlobalScope = detected;
    hasCachedGlobalScope = true;
    return cachedGlobalScope;
  }

  function resolveFromScopes(primary, detect, extras, resolver) {
    if (typeof resolver !== 'function') {
      return null;
    }

    const scopes = collectCandidateScopes(primary, detect, extras);

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!isObjectLike(scope)) {
        continue;
      }

      try {
        const result = resolver(scope, index);
        if (typeof result !== 'undefined' && result !== null) {
          return result;
        }
      } catch (error) {
        void error;
      }
    }

    return null;
  }

  const exportsObject = {
    detectGlobalScope,
    collectCandidateScopes,
    tryRequire,
    resolveFromScopes,
    getScopeCollector() {
      return SCOPE_COLLECTOR || null;
    },
    getBaseScopes() {
      return safeClone(BASE_SCOPES);
    },
  };

  const GLOBAL_SCOPE = detectGlobalScope();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exportsObject;
  }

  if (GLOBAL_SCOPE && !GLOBAL_SCOPE.__cineEnvironmentHelpers) {
    try {
      Object.defineProperty(GLOBAL_SCOPE, '__cineEnvironmentHelpers', {
        configurable: true,
        enumerable: false,
        writable: true,
        value: exportsObject,
      });
    } catch (error) {
      void error;
      GLOBAL_SCOPE.__cineEnvironmentHelpers = exportsObject;
    }
  }
})();
