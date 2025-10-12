(function () {
  function detectAmbientScope() {
    if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object') {
      return globalThis;
    }

    if (typeof window !== 'undefined' && window && typeof window === 'object') {
      return window;
    }

    if (typeof self !== 'undefined' && self && typeof self === 'object') {
      return self;
    }

    if (typeof global !== 'undefined' && global && typeof global === 'object') {
      return global;
    }

    return null;
  }

  function fallbackDetectScope(primary) {
    if (primary && (typeof primary === 'object' || typeof primary === 'function')) {
      return primary;
    }

    return detectAmbientScope();
  }

  function resolveScopeUtils() {
    let scopeUtils = null;

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

    const scope = detectAmbientScope();
    if (scope && typeof scope === 'object') {
      try {
        const registry = scope.cineCoreRuntimeStateModules;
        if (registry && typeof registry === 'object' && registry.scopeUtils) {
          return registry.scopeUtils;
        }
      } catch (scopeLookupError) {
        void scopeLookupError;
      }
    }

    return null;
  }

  const scopeUtils = resolveScopeUtils();
  const detectScope =
    scopeUtils && typeof scopeUtils.detectScope === 'function'
      ? scopeUtils.detectScope
      : fallbackDetectScope;

  function resolveTemperatureKeyDefaults() {
    const defaults = {
      queueKey: '__cinePendingTemperatureNote',
      renderName: 'renderTemperatureNote',
    };

    const scope = detectScope();
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
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
    const scope = detectAmbientScope();
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return;
    }

    const registryName = 'cineCoreRuntimeStateModules';
    const existing =
      scope[registryName] && typeof scope[registryName] === 'object'
        ? scope[registryName]
        : {};

    existing.temperatureKeys = namespace;

    try {
      scope[registryName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  const namespace = {
    resolveTemperatureKeyDefaults,
  };

  assignToGlobal(namespace);

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
