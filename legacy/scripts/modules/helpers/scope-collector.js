function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
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
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
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
    var clone = [];
    for (var index = 0; index < array.length; index += 1) {
      clone[index] = array[index];
    }
    return clone;
  }
  function createPrimaryCache() {
    return {
      objects: typeof WeakMap === 'function' ? new WeakMap() : null,
      primitives: Object.create(null),
      empty: null
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
      var _entry = cache.objects.get(primary);
      if (!_entry) {
        _entry = {
          cached: false,
          value: null
        };
        cache.objects.set(primary, _entry);
      }
      return _entry;
    }
    var key = _typeof(primary) + ':' + String(primary);
    var entry = cache.primitives[key];
    if (!entry) {
      entry = {
        cached: false,
        value: null
      };
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
  var BASE_SCOPES = function buildBaseScopes() {
    var scopes = [];
    pushUnique(scopes, typeof globalThis !== 'undefined' ? globalThis : null);
    pushUnique(scopes, typeof window !== 'undefined' ? window : null);
    pushUnique(scopes, typeof self !== 'undefined' ? self : null);
    pushUnique(scopes, typeof global !== 'undefined' ? global : null);
    return freezeArray(scopes);
  }();
  var EMPTY_EXTRAS = freezeArray([]);
  var SUPPORTS_WEAKMAP = typeof WeakMap === 'function';
  var DETECT_CACHE = SUPPORTS_WEAKMAP ? new WeakMap() : null;
  function sanitizeExtras(extras) {
    if (!Array.isArray(extras) || extras.length === 0) {
      return EMPTY_EXTRAS;
    }
    var sanitized = [];
    for (var index = 0; index < extras.length; index += 1) {
      pushUnique(sanitized, extras[index]);
    }
    if (sanitized.length === 0) {
      return EMPTY_EXTRAS;
    }
    return freezeArray(sanitized);
  }
  function computeCandidateScopes(primary, detectFn, extrasList) {
    var scopes = [];
    pushUnique(scopes, primary);
    var detected = null;
    if (typeof detectFn === 'function') {
      try {
        detected = detectFn();
      } catch (error) {
        void error;
        detected = null;
      }
    }
    pushUnique(scopes, detected);
    for (var index = 0; index < BASE_SCOPES.length; index += 1) {
      pushUnique(scopes, BASE_SCOPES[index]);
    }
    if (Array.isArray(extrasList)) {
      for (var _index = 0; _index < extrasList.length; _index += 1) {
        pushUnique(scopes, extrasList[_index]);
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
    var extrasEntry = detectEntry.extras.get(extrasList);
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
    var entry = DETECT_CACHE.get(detectFn);
    if (!entry) {
      entry = {
        empty: null,
        extras: null
      };
      DETECT_CACHE.set(detectFn, entry);
    }
    return entry;
  }
  function collectInternal(primary, detectFn, extrasList, cacheEntry) {
    if (cacheEntry) {
      var primaryEntry = getPrimaryCacheEntry(cacheEntry, primary);
      if (primaryEntry) {
        if (primaryEntry.cached) {
          return cloneArray(primaryEntry.value);
        }
        var computed = computeCandidateScopes(primary, detectFn, extrasList);
        primaryEntry.value = computed;
        primaryEntry.cached = true;
        return cloneArray(computed);
      }
    }
    var computedFallback = computeCandidateScopes(primary, detectFn, extrasList);
    return cloneArray(computedFallback);
  }
  function createCollector(options) {
    var detectFn = options && typeof options.detectGlobalScope === 'function' ? options.detectGlobalScope : detectGlobalScope;
    var extrasList = sanitizeExtras(options && options.additionalScopes);
    var detectEntry = getDetectEntry(detectFn);
    var cacheEntry = getExtrasCache(detectEntry, extrasList);
    return function collectWithPreset(primary) {
      return collectInternal(primary, detectFn, extrasList, cacheEntry);
    };
  }
  function collectCandidateScopes(primary, options) {
    var collector = createCollector(options || {});
    return collector(primary);
  }
  var exportsObject = {
    collectCandidateScopes: collectCandidateScopes,
    createCollector: createCollector,
    getBaseScopes: function getBaseScopes() {
      return cloneArray(BASE_SCOPES);
    }
  };
  var GLOBAL_SCOPE = detectGlobalScope();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exportsObject;
  }
  if (GLOBAL_SCOPE && !GLOBAL_SCOPE.__cineScopeCollector) {
    GLOBAL_SCOPE.__cineScopeCollector = exportsObject;
  }
})();