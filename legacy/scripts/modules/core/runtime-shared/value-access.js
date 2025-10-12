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

  function readValue(runtimeState, name, candidateScopes) {
    if (runtimeState && typeof runtimeState.readValue === 'function') {
      try {
        return runtimeState.readValue(name);
      } catch (readValueError) {
        void readValueError;
      }
    }

    var scopes = Array.isArray(candidateScopes) ? candidateScopes : [];

    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope || (_typeof(scope) !== 'object' && typeof scope !== 'function')) {
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

    var fallbackProvider =
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

    var scopes = Array.isArray(candidateScopes) ? candidateScopes : [];

    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope || (_typeof(scope) !== 'object' && typeof scope !== 'function')) {
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

    var validate =
      typeof validator === 'function'
        ? validator
        : function alwaysValid() {
            return true;
          };

    var fallbackProvider =
      typeof fallbackValue === 'function'
        ? fallbackValue
        : function provideStaticFallback() {
            return fallbackValue;
          };

    var scopes = Array.isArray(candidateScopes) ? candidateScopes : [];

    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope || (_typeof(scope) !== 'object' && typeof scope !== 'function')) {
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
    var scope = detectAmbientScope();
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return;
    }

    var registryName = 'cineCoreRuntimeSharedModules';
    var existing = scope[registryName] && _typeof(scope[registryName]) === 'object' ? scope[registryName] : {};
    existing.valueAccess = namespace;

    try {
      scope[registryName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  var namespace = {
    readValue: readValue,
    ensureValue: ensureValue,
    normaliseValue: normaliseValue
  };

  assignToGlobal(namespace);

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
