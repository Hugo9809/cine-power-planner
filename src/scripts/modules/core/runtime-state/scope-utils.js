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

  function detectScope(primary) {
    if (primary && (typeof primary === 'object' || typeof primary === 'function')) {
      return primary;
    }

    return detectAmbientScope();
  }

  function hasArrayEntry(array, value) {
    if (!Array.isArray(array)) {
      return false;
    }

    for (let index = 0; index < array.length; index += 1) {
      if (array[index] === value) {
        return true;
      }
    }

    return false;
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

    existing.scopeUtils = namespace;

    try {
      scope[registryName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  const namespace = {
    detectScope,
    hasArrayEntry,
  };

  assignToGlobal(namespace);

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
