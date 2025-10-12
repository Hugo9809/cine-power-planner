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

  function readValue(runtimeState, name, candidateScopes) {
    if (runtimeState && typeof runtimeState.readValue === 'function') {
      try {
        return runtimeState.readValue(name);
      } catch (readValueError) {
        void readValueError;
      }
    }

    const scopes = Array.isArray(candidateScopes) ? candidateScopes : [];

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      try {
        if (name in scope) {
          return scope[name];
        }
      } catch (lookupError) {
        void lookupError;
      }
    }

    return undefined;
  }

  function ensureValue(runtimeState, name, fallbackValue, candidateScopes) {
    if (runtimeState && typeof runtimeState.ensureValue === 'function') {
      try {
        return runtimeState.ensureValue(name, fallbackValue);
      } catch (ensureValueError) {
        void ensureValueError;
      }
    }

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

    const scopes = Array.isArray(candidateScopes) ? candidateScopes : [];

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      try {
        if (typeof scope[name] === 'undefined') {
          scope[name] = fallbackProvider();
        }
        return scope[name];
      } catch (ensureError) {
        void ensureError;
      }
    }

    try {
      return fallbackProvider();
    } catch (fallbackProviderError) {
      void fallbackProviderError;
      return undefined;
    }
  }

  function normaliseValue(runtimeState, name, validator, fallbackValue, candidateScopes) {
    if (runtimeState && typeof runtimeState.normaliseValue === 'function') {
      try {
        runtimeState.normaliseValue(name, validator, fallbackValue);
        return;
      } catch (normaliseValueError) {
        void normaliseValueError;
      }
    }

    const validate =
      typeof validator === 'function'
        ? validator
        : function alwaysValid() {
            return true;
          };

    const fallbackProvider =
      typeof fallbackValue === 'function'
        ? fallbackValue
        : function provideStaticFallback() {
            return fallbackValue;
          };

    const scopes = Array.isArray(candidateScopes) ? candidateScopes : [];

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      try {
        if (!validate(scope[name])) {
          scope[name] = fallbackProvider();
        }
      } catch (normaliseError) {
        void normaliseError;
      }
    }
  }

  function assignToGlobal(namespace) {
    const scope = detectAmbientScope();
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return;
    }

    const registryName = 'cineCoreRuntimeSharedModules';
    const existing =
      scope[registryName] && typeof scope[registryName] === 'object'
        ? scope[registryName]
        : {};

    existing.valueAccess = namespace;

    try {
      scope[registryName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  const namespace = {
    readValue,
    ensureValue,
    normaliseValue,
  };

  assignToGlobal(namespace);

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
