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

  function fallbackHasArrayEntry(array, value) {
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
  const hasArrayEntry =
    scopeUtils && typeof scopeUtils.hasArrayEntry === 'function'
      ? scopeUtils.hasArrayEntry
      : fallbackHasArrayEntry;

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
    const registry = typeof WeakSet === 'function' ? new WeakSet() : [];

    if (Array.isArray(initialValues)) {
      for (let index = 0; index < initialValues.length; index += 1) {
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
    const scope = detectAmbientScope();
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return;
    }

    const registryName = 'cineCoreRuntimeStateModules';
    const existing =
      scope[registryName] && typeof scope[registryName] === 'object'
        ? scope[registryName]
        : {};

    existing.safeFreezeRegistry = namespace;

    try {
      scope[registryName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  const namespace = {
    createSafeFreezeRegistry,
    ensureSafeFreezeRegistry,
    hasSafeFreezeEntry,
    registerSafeFreezeEntry,
  };

  assignToGlobal(namespace);

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
