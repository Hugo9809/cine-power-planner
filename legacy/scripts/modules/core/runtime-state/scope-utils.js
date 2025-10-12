function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function detectAmbientScope() {
    if (typeof globalThis !== 'undefined' && globalThis && _typeof(globalThis) === 'object') {
      return globalThis;
    }

    if (typeof window !== 'undefined' && window && _typeof(window) === 'object') {
      return window;
    }

    if (typeof self !== 'undefined' && self && _typeof(self) === 'object') {
      return self;
    }

    if (typeof global !== 'undefined' && global && _typeof(global) === 'object') {
      return global;
    }

    return null;
  }

  function detectScope(primary) {
    if (primary && (_typeof(primary) === 'object' || typeof primary === 'function')) {
      return primary;
    }

    return detectAmbientScope();
  }

  function hasArrayEntry(array, value) {
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

  function assignToGlobal(namespace) {
    var scope = detectAmbientScope();
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return;
    }

    var registryName = 'cineCoreRuntimeStateModules';
    var existing = scope[registryName] && _typeof(scope[registryName]) === 'object' ? scope[registryName] : {};
    existing.scopeUtils = namespace;

    try {
      scope[registryName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  var namespace = {
    detectScope: detectScope,
    hasArrayEntry: hasArrayEntry
  };

  assignToGlobal(namespace);

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
