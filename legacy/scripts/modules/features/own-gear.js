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
  var GLOBAL_SCOPE = detectGlobalScope();
  var MODULE_BASE = (typeof cineModuleBase === "undefined" ? "undefined" : _typeof(cineModuleBase)) === 'object' && cineModuleBase || (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE.cineModuleBase) === 'object' ? GLOBAL_SCOPE.cineModuleBase : null);
  var safeWarn = MODULE_BASE && typeof MODULE_BASE.safeWarn === 'function' ? MODULE_BASE.safeWarn : function fallbackWarn(message, error) {
    if (typeof console === 'undefined' || !console || typeof console.warn !== 'function') {
      return;
    }
    try {
      if (typeof error === 'undefined') {
        console.warn(message);
      } else {
        console.warn(message, error);
      }
    } catch (consoleError) {
      void consoleError;
    }
  };
  function dispatchOwnGearChanged(scope) {
    var target = scope || GLOBAL_SCOPE;
    if (!target || typeof target.document === 'undefined') {
      return;
    }
    var document = target.document;
    if (!document) {
      return;
    }
    try {
      if (typeof document.dispatchEvent === 'function' && typeof target.CustomEvent === 'function') {
        document.dispatchEvent(new target.CustomEvent('own-gear-data-changed'));
      }
    } catch (error) {
      safeWarn('cine.features.ownGear could not dispatch own gear change event.', error);
    }
  }
  function generateOwnGearId() {
    try {
      if (_typeof(GLOBAL_SCOPE.crypto) === 'object' && GLOBAL_SCOPE.crypto && typeof GLOBAL_SCOPE.crypto.randomUUID === 'function') {
        return GLOBAL_SCOPE.crypto.randomUUID();
      }
    } catch (error) {
      safeWarn('cine.features.ownGear could not use crypto.randomUUID.', error);
    }
    var timePart = Date.now().toString(36);
    var randomPart = Math.floor(Math.random() * 1e8).toString(36);
    return "own-".concat(timePart, "-").concat(randomPart);
  }
  function normalizeOwnGearRecord(entry) {
    if (!entry || _typeof(entry) !== 'object') {
      return null;
    }
    var rawName = typeof entry.name === 'string' ? entry.name.trim() : '';
    if (!rawName) {
      return null;
    }
    var normalized = {
      id: typeof entry.id === 'string' && entry.id.trim() ? entry.id.trim() : generateOwnGearId(),
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
  }
  function loadStoredOwnGearItems() {
    if (typeof GLOBAL_SCOPE.loadOwnGear !== 'function') {
      return [];
    }
    try {
      var stored = GLOBAL_SCOPE.loadOwnGear();
      if (!Array.isArray(stored)) {
        return [];
      }
      var seenIds = new Set();
      return stored.map(normalizeOwnGearRecord).filter(function (item) {
        if (!item) {
          return false;
        }
        if (seenIds.has(item.id)) {
          return false;
        }
        seenIds.add(item.id);
        return true;
      });
    } catch (error) {
      safeWarn('cine.features.ownGear could not load own gear items.', error);
      return [];
    }
  }
  function persistOwnGearItems(items) {
    if (typeof GLOBAL_SCOPE.saveOwnGear !== 'function') {
      return false;
    }
    var payload = Array.isArray(items) ? items.filter(function (item) {
      return item && _typeof(item) === 'object';
    }).map(function (item) {
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
    }) : [];
    try {
      GLOBAL_SCOPE.saveOwnGear(payload);
      dispatchOwnGearChanged(GLOBAL_SCOPE);
      return true;
    } catch (error) {
      safeWarn('cine.features.ownGear could not persist own gear items.', error);
      return false;
    }
  }
  var moduleApi = Object.freeze({
    generateOwnGearId: generateOwnGearId,
    normalizeOwnGearRecord: normalizeOwnGearRecord,
    loadStoredOwnGearItems: loadStoredOwnGearItems,
    persistOwnGearItems: persistOwnGearItems
  });
  if (MODULE_BASE && typeof MODULE_BASE.registerOrQueueModule === 'function') {
    try {
      MODULE_BASE.registerOrQueueModule('cine.features.ownGear', moduleApi, {
        category: 'features',
        description: 'Shared helpers for personal gear persistence.',
        replace: true,
        connections: ['cineModuleBase', 'cineModuleGlobals', 'cinePersistence']
      }, function (error) {
        return safeWarn('Unable to register cine.features.ownGear module.', error);
      }, GLOBAL_SCOPE, MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE));
    } catch (error) {
      safeWarn('cine.features.ownGear registration failed.', error);
    }
  }
  if (MODULE_BASE && typeof MODULE_BASE.exposeGlobal === 'function') {
    try {
      MODULE_BASE.exposeGlobal('cineFeaturesOwnGear', moduleApi, GLOBAL_SCOPE, {
        configurable: true,
        enumerable: false,
        writable: false
      });
      return;
    } catch (error) {
      safeWarn('cine.features.ownGear could not expose global api.', error);
    }
  }
  try {
    GLOBAL_SCOPE.cineFeaturesOwnGear = moduleApi;
  } catch (error) {
    safeWarn('cine.features.ownGear could not assign global api.', error);
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = moduleApi;
  }
})();