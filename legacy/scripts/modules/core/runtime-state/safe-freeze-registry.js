function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function detectAmbientScope() {
    if (typeof globalThis !== 'undefined' && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
      return globalThis;
    }
    if (typeof window !== 'undefined' && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
      return window;
    }
    if (typeof self !== 'undefined' && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
      return self;
    }
    if (typeof global !== 'undefined' && global && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
      return global;
    }
    return null;
  }
  function fallbackHasArrayEntry(array, value) {
    if (!Array.isArray(array)) {
      return false;
    }
    for (var index = 0; index < array.length; index += 1) {
      if (array[index] === value) {
        return true;
      }
    }
    return false;
  }
  function resolveScopeUtils() {
    var scopeUtils = null;
    if (typeof require === 'function') {
      try {
        scopeUtils = require('./scope-utils.js');
      } catch (scopeUtilsRequireError) {
        void scopeUtilsRequireError;
      }
    }
    if (scopeUtils) {
      return scopeUtils;
    }
    var scope = detectAmbientScope();
    if (scope && _typeof(scope) === 'object') {
      try {
        var registry = scope.cineCoreRuntimeStateModules;
        if (registry && _typeof(registry) === 'object' && registry.scopeUtils) {
          return registry.scopeUtils;
        }
      } catch (scopeLookupError) {
        void scopeLookupError;
      }
    }
    return null;
  }
  var scopeUtils = resolveScopeUtils();
  var hasArrayEntry = scopeUtils && typeof scopeUtils.hasArrayEntry === 'function' ? scopeUtils.hasArrayEntry : fallbackHasArrayEntry;
  function registerSafeFreezeEntry(registry, value) {
    if (!registry || !value) {
      return registry;
    }
    if (typeof registry.add === 'function') {
      try {
        registry.add(value);
      } catch (registryAddError) {
        void registryAddError;
      }
      return registry;
    }
    if (!hasArrayEntry(registry, value) && Array.isArray(registry)) {
      registry.push(value);
    }
    return registry;
  }
  function createSafeFreezeRegistry(initialValues) {
    var registry = typeof WeakSet === 'function' ? new WeakSet() : [];
    if (Array.isArray(initialValues)) {
      for (var index = 0; index < initialValues.length; index += 1) {
        try {
          registerSafeFreezeEntry(registry, initialValues[index]);
        } catch (initialisationError) {
          void initialisationError;
        }
      }
    }
    return registry;
  }
  function ensureSafeFreezeRegistry(registry, initialValues) {
    if (registry && (typeof registry.add === 'function' || Array.isArray(registry))) {
      return registry;
    }
    return createSafeFreezeRegistry(initialValues);
  }
  function hasSafeFreezeEntry(registry, value) {
    if (!registry || !value) {
      return false;
    }
    if (typeof registry.has === 'function') {
      try {
        return registry.has(value);
      } catch (registryHasError) {
        void registryHasError;
        return false;
      }
    }
    return hasArrayEntry(registry, value);
  }
  function assignToGlobal(namespace) {
    var scope = detectAmbientScope();
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return;
    }
    var registryName = 'cineCoreRuntimeStateModules';
    var existing = scope[registryName] && _typeof(scope[registryName]) === 'object' ? scope[registryName] : {};
    existing.safeFreezeRegistry = namespace;
    try {
      scope[registryName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  var namespace = {
    createSafeFreezeRegistry: createSafeFreezeRegistry,
    ensureSafeFreezeRegistry: ensureSafeFreezeRegistry,
    hasSafeFreezeEntry: hasSafeFreezeEntry,
    registerSafeFreezeEntry: registerSafeFreezeEntry
  };
  assignToGlobal(namespace);
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();