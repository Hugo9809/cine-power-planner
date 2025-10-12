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

    const scope = detectAmbientScope();
    if (scope && (typeof scope === 'object' || typeof scope === 'function')) {
      return scope;
    }

    return null;
  }

  function resolveScopeDetectionModule() {
    if (typeof require === 'function') {
      try {
        return require('./scope-detection.js');
      } catch (scopeDetectionRequireError) {
        void scopeDetectionRequireError;
      }
    }

    const scope = detectAmbientScope();
    if (scope && typeof scope === 'object') {
      try {
        const registry = scope.cineCoreRuntimeToolsModules;
        if (registry && typeof registry === 'object' && registry.scopeDetection) {
          return registry.scopeDetection;
        }
      } catch (scopeDetectionLookupError) {
        void scopeDetectionLookupError;
      }
    }

    return null;
  }

  const scopeDetectionModule = resolveScopeDetectionModule();
  const detectScope =
    scopeDetectionModule && typeof scopeDetectionModule.detectScope === 'function'
      ? scopeDetectionModule.detectScope
      : fallbackDetectScope;

  function ensureGlobalValue(name, fallbackValue, primary) {
    const fallbackProvider =
      typeof fallbackValue === 'function'
        ? fallbackValue
        : function provideStaticFallback() {
            return fallbackValue;
          };

    if (typeof name !== 'string' || !name) {
      try {
        return fallbackProvider();
      } catch (fallbackError) {
        void fallbackError;
        return undefined;
      }
    }

    const scope = detectScope(primary);
    if (!scope || typeof scope !== 'object') {
      return fallbackProvider();
    }

    let existing;
    try {
      existing = scope[name];
    } catch (readError) {
      existing = undefined;
      void readError;
    }

    if (typeof existing !== 'undefined') {
      return existing;
    }

    const value = fallbackProvider();

    try {
      scope[name] = value;
      return scope[name];
    } catch (assignError) {
      void assignError;
    }

    try {
      Object.defineProperty(scope, name, {
        configurable: true,
        writable: true,
        value,
      });
    } catch (defineError) {
      void defineError;
    }

    try {
      return scope[name];
    } catch (finalReadError) {
      void finalReadError;
    }

    return value;
  }

  function assignToGlobal(namespace) {
    const scope = detectAmbientScope();
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return;
    }

    const registryName = 'cineCoreRuntimeToolsModules';
    const existing =
      scope[registryName] && typeof scope[registryName] === 'object'
        ? scope[registryName]
        : {};

    existing.ensureGlobalValue = namespace;

    try {
      scope[registryName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  const namespace = {
    ensureGlobalValue,
  };

  assignToGlobal(namespace);

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
