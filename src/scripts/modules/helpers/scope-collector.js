function detectGlobalScope() {
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

function freezeArray(array) {
  if (typeof Object.freeze === 'function') {
    try {
      return Object.freeze(array);
    } catch (error) {
      void error;
    }
  }
  return array;
}

function cloneArray(array) {
  if (!array) {
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

function createPrimaryCache() {
  return {
    objects: typeof WeakMap === 'function' ? new WeakMap() : null,
    primitives: Object.create(null),
    empty: null,
  };
}

function getPrimaryCacheEntry(cache, primary) {
  if (!cache) {
    return null;
  }

  if (isObjectLike(primary)) {
    if (!cache.objects) {
      return null;
    }
    let entry = cache.objects.get(primary);
    if (!entry) {
      entry = { cached: false, value: null };
      cache.objects.set(primary, entry);
    }
    return entry;
  }

  const key = typeof primary + ':' + String(primary);
  let entry = cache.primitives[key];
  if (!entry) {
    entry = { cached: false, value: null };
    cache.primitives[key] = entry;
  }
  return entry;
}

function pushUnique(target, value) {
  if (!isObjectLike(value)) {
    return;
  }
  if (target.indexOf(value) === -1) {
    target.push(value);
  }
}

const BASE_SCOPES = (function buildBaseScopes() {
  const scopes = [];
  pushUnique(scopes, typeof globalThis !== 'undefined' ? globalThis : null);
  pushUnique(scopes, typeof window !== 'undefined' ? window : null);
  pushUnique(scopes, typeof self !== 'undefined' ? self : null);
  pushUnique(scopes, typeof global !== 'undefined' ? global : null);
  return freezeArray(scopes);
})();

const EMPTY_EXTRAS = freezeArray([]);
const SUPPORTS_WEAKMAP = typeof WeakMap === 'function';
const DETECT_CACHE = SUPPORTS_WEAKMAP ? new WeakMap() : null;

function sanitizeExtras(extras) {
  if (!Array.isArray(extras) || extras.length === 0) {
    return EMPTY_EXTRAS;
  }

  const sanitized = [];
  for (let index = 0; index < extras.length; index += 1) {
    pushUnique(sanitized, extras[index]);
  }

  if (sanitized.length === 0) {
    return EMPTY_EXTRAS;
  }

  return freezeArray(sanitized);
}

function computeCandidateScopes(primary, detectFn, extrasList) {
  const scopes = [];
  pushUnique(scopes, primary);

  let detected = null;
  if (typeof detectFn === 'function') {
    try {
      detected = detectFn();
    } catch (error) {
      void error;
      detected = null;
    }
  }
  pushUnique(scopes, detected);

  for (let index = 0; index < BASE_SCOPES.length; index += 1) {
    pushUnique(scopes, BASE_SCOPES[index]);
  }

  if (Array.isArray(extrasList)) {
    for (let index = 0; index < extrasList.length; index += 1) {
      pushUnique(scopes, extrasList[index]);
    }
  }

  return freezeArray(scopes);
}

function getExtrasCache(detectEntry, extrasList) {
  if (!detectEntry) {
    return null;
  }

  if (extrasList === EMPTY_EXTRAS) {
    if (!detectEntry.empty) {
      detectEntry.empty = createPrimaryCache();
    }
    return detectEntry.empty;
  }

  if (!detectEntry.extras) {
    if (!SUPPORTS_WEAKMAP) {
      return null;
    }
    detectEntry.extras = new WeakMap();
  }

  let extrasEntry = detectEntry.extras.get(extrasList);
  if (!extrasEntry) {
    extrasEntry = createPrimaryCache();
    detectEntry.extras.set(extrasList, extrasEntry);
  }
  return extrasEntry;
}

function getDetectEntry(detectFn) {
  if (!DETECT_CACHE) {
    return null;
  }

  let entry = DETECT_CACHE.get(detectFn);
  if (!entry) {
    entry = { empty: null, extras: null };
    DETECT_CACHE.set(detectFn, entry);
  }
  return entry;
}

function collectInternal(primary, detectFn, extrasList, cacheEntry) {
  if (cacheEntry) {
    const primaryEntry = getPrimaryCacheEntry(cacheEntry, primary);
    if (primaryEntry) {
      if (primaryEntry.cached) {
        return cloneArray(primaryEntry.value);
      }
      const computed = computeCandidateScopes(primary, detectFn, extrasList);
      primaryEntry.value = computed;
      primaryEntry.cached = true;
      return cloneArray(computed);
    }
  }

  const computedFallback = computeCandidateScopes(primary, detectFn, extrasList);
  return cloneArray(computedFallback);
}

export function createCollector(options) {
  const detectFn = options && typeof options.detectGlobalScope === 'function'
    ? options.detectGlobalScope
    : detectGlobalScope;
  const extrasList = sanitizeExtras(options && options.additionalScopes);
  const detectEntry = getDetectEntry(detectFn);
  const cacheEntry = getExtrasCache(detectEntry, extrasList);

  return function collectWithPreset(primary) {
    return collectInternal(primary, detectFn, extrasList, cacheEntry);
  };
}

export function collectCandidateScopes(primary, options) {
  const collector = createCollector(options || {});
  return collector(primary);
}

export function getBaseScopes() {
  return cloneArray(BASE_SCOPES);
}

// Global Assignment for Legacy Compatibility
const GLOBAL_SCOPE = detectGlobalScope();

if (GLOBAL_SCOPE && !GLOBAL_SCOPE.__cineScopeCollector) {
  GLOBAL_SCOPE.__cineScopeCollector = {
    collectCandidateScopes,
    createCollector,
    getBaseScopes,
  };
}
