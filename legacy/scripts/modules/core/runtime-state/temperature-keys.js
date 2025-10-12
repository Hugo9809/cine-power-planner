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

  function fallbackDetectScope(primary) {
    if (primary && (_typeof(primary) === 'object' || typeof primary === 'function')) {
      return primary;
    }

    return detectAmbientScope();
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
  var detectScope = scopeUtils && typeof scopeUtils.detectScope === 'function' ? scopeUtils.detectScope : fallbackDetectScope;

  function resolveTemperatureKeyDefaults() {
    var defaults = {
      queueKey: '__cinePendingTemperatureNote',
      renderName: 'renderTemperatureNote'
    };

    var scope = detectScope();
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return defaults;
    }

    try {
      if (typeof scope.CORE_TEMPERATURE_QUEUE_KEY === 'string') {
        defaults.queueKey = scope.CORE_TEMPERATURE_QUEUE_KEY;
      }
    } catch (readQueueKeyError) {
      void readQueueKeyError;
    }

    try {
      if (typeof scope.CORE_TEMPERATURE_RENDER_NAME === 'string') {
        defaults.renderName = scope.CORE_TEMPERATURE_RENDER_NAME;
      }
    } catch (readRenderNameError) {
      void readRenderNameError;
    }

    return defaults;
  }

  function assignToGlobal(namespace) {
    var scope = detectAmbientScope();
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return;
    }

    var registryName = 'cineCoreRuntimeStateModules';
    var existing = scope[registryName] && _typeof(scope[registryName]) === 'object' ? scope[registryName] : {};
    existing.temperatureKeys = namespace;

    try {
      scope[registryName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  var namespace = {
    resolveTemperatureKeyDefaults: resolveTemperatureKeyDefaults
  };

  assignToGlobal(namespace);

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
