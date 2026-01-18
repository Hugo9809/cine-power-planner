function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
    return null;
  }
  var GLOBAL_SCOPE = detectGlobalScope();
  function dispatchOwnGearChanged(scope) {
    var target = scope || GLOBAL_SCOPE;
    if (!target || typeof target.document === 'undefined') {
      return;
    }
    var document = target.document;
    if (!document || typeof document.dispatchEvent !== 'function') {
      return;
    }
    try {
      if (typeof target.CustomEvent === 'function') {
        document.dispatchEvent(new target.CustomEvent('own-gear-data-changed'));
      }
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('cine.ownGear.store could not dispatch change event.', error);
      }
    }
  }
  function createIdGenerator(scope) {
    return function generateOwnGearId() {
      var targetScope = scope || GLOBAL_SCOPE;
      try {
        if (targetScope && targetScope.crypto && typeof targetScope.crypto.randomUUID === 'function') {
          return targetScope.crypto.randomUUID();
        }
      } catch (error) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('cine.ownGear.store could not use crypto.randomUUID.', error);
        }
      }
      var timePart = Date.now().toString(36);
      var randomPart = Math.floor(Math.random() * 1e8).toString(36);
      return "own-".concat(timePart, "-").concat(randomPart);
    };
  }
  function createNormalizer(generateId) {
    return function normalizeOwnGearRecord(entry) {
      if (!entry || _typeof(entry) !== 'object') {
        return null;
      }
      var rawName = typeof entry.name === 'string' ? entry.name.trim() : '';
      if (!rawName) {
        return null;
      }
      var normalized = {
        id: typeof entry.id === 'string' && entry.id.trim() ? entry.id.trim() : generateId(),
        name: rawName
      };
      if (typeof entry.quantity === 'string' && entry.quantity.trim()) {
        normalized.quantity = entry.quantity.trim();
      } else if (typeof entry.quantity === 'number' && Number.isFinite(entry.quantity)) {
        normalized.quantity = String(entry.quantity);
      }
      if (typeof entry.notes === 'string' && entry.notes.trim()) {
        normalized.notes = entry.notes.trim();
      }
      if (typeof entry.source === 'string' && entry.source.trim()) {
        normalized.source = entry.source.trim();
      }
      return normalized;
    };
  }
  function sanitizeItems(items, normalize) {
    if (!Array.isArray(items)) {
      return [];
    }
    var seenIds = new Set();
    var normalized = [];
    for (var index = 0; index < items.length; index += 1) {
      var entry = normalize(items[index]);
      if (!entry || seenIds.has(entry.id)) {
        continue;
      }
      seenIds.add(entry.id);
      normalized.push(entry);
    }
    return normalized;
  }
  function buildCache(items) {
    var normalized = Array.isArray(items) ? items.slice() : [];
    var map = new Map();
    normalized.forEach(function (item) {
      if (item && typeof item.id === 'string' && !map.has(item.id)) {
        map.set(item.id, item);
      }
    });
    return {
      items: normalized,
      map: map
    };
  }
  function createOwnGearStore() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var scope = options.scope || GLOBAL_SCOPE;
    var loadOwnGear = typeof options.loadOwnGear === 'function' ? options.loadOwnGear : scope && typeof scope.loadOwnGear === 'function' ? scope.loadOwnGear.bind(scope) : null;
    var saveOwnGear = typeof options.saveOwnGear === 'function' ? options.saveOwnGear : scope && typeof scope.saveOwnGear === 'function' ? scope.saveOwnGear.bind(scope) : null;
    var dispatchChange = typeof options.dispatchOwnGearChange === 'function' ? options.dispatchOwnGearChange : function () {
      return dispatchOwnGearChanged(scope);
    };
    var generateOwnGearId = createIdGenerator(scope);
    var normalizeOwnGearRecord = createNormalizer(generateOwnGearId);
    var autoGearCache = buildCache(Array.isArray(options.initialItems) ? options.initialItems : []);
    function loadStoredOwnGearItems() {
      if (!loadOwnGear) {
        return [];
      }
      try {
        var stored = loadOwnGear();
        if (!Array.isArray(stored)) {
          return [];
        }
        return sanitizeItems(stored, normalizeOwnGearRecord);
      } catch (error) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('cine.ownGear.store could not load own gear items.', error);
        }
        return [];
      }
    }
    function persistOwnGearItems(items) {
      var payload = sanitizeItems(items, normalizeOwnGearRecord).map(function (item) {
        var entry = {
          id: item.id,
          name: item.name
        };
        if (item.quantity) {
          entry.quantity = item.quantity;
        }
        if (item.notes) {
          entry.notes = item.notes;
        }
        if (item.source) {
          entry.source = item.source;
        }
        return entry;
      });
      if (!saveOwnGear) {
        return false;
      }
      try {
        saveOwnGear(payload);
        dispatchChange();
        invalidateCache();
        return true;
      } catch (error) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('cine.ownGear.store could not persist own gear items.', error);
        }
        return false;
      }
    }
    function invalidateCache() {
      autoGearCache = {
        items: [],
        map: new Map()
      };
    }
    function snapshotFromCache() {
      return {
        items: autoGearCache.items.slice(),
        map: autoGearCache.map
      };
    }
    function refreshCache() {
      var normalized = loadStoredOwnGearItems();
      autoGearCache = buildCache(normalized);
      return snapshotFromCache();
    }
    function getCacheSnapshot() {
      if (!autoGearCache.items.length && !autoGearCache.map.size) {
        return refreshCache();
      }
      return snapshotFromCache();
    }
    function getCachedItems() {
      return getCacheSnapshot().items.map(function (item) {
        return _objectSpread({}, item);
      });
    }
    function findCachedById(id) {
      if (!id) {
        return null;
      }
      var snapshot = getCacheSnapshot();
      var match = snapshot.map.get(id) || null;
      return match ? _objectSpread({}, match) : null;
    }
    return {
      generateOwnGearId: generateOwnGearId,
      normalizeOwnGearRecord: normalizeOwnGearRecord,
      loadStoredOwnGearItems: loadStoredOwnGearItems,
      persistOwnGearItems: persistOwnGearItems,
      invalidateCache: invalidateCache,
      refreshCache: refreshCache,
      getCacheSnapshot: getCacheSnapshot,
      getCachedItems: getCachedItems,
      findCachedById: findCachedById
    };
  }
  var ownGearStoreApi = {
    createOwnGearStore: createOwnGearStore
  };
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = ownGearStoreApi;
  }
  if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
    try {
      GLOBAL_SCOPE.cineOwnGearStore = ownGearStoreApi;
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('cine.ownGear.store could not expose global api.', error);
      }
    }
  }
})();