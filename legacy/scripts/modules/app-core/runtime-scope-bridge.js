/*
 * Legacy compatible runtime scope bridge that mirrors the modern module.
 * The helpers wrap access to the loosely shared global namespaces so the
 * refactored core runtime can share the same defensive behaviour across
 * both bundles. This keeps data critical features such as autosave and
 * backup/restores stable while the refactor progresses.
 */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function detectScope(primaryScope) {
    if (isObject(primaryScope)) {
      return primaryScope;
    }

    if (typeof globalThis !== 'undefined' && isObject(globalThis)) {
      return globalThis;
    }

    if (typeof window !== 'undefined' && isObject(window)) {
      return window;
    }

    if (typeof self !== 'undefined' && isObject(self)) {
      return self;
    }

    if (typeof global !== 'undefined' && isObject(global)) {
      return global;
    }

    return null;
  }

  function createCandidateRegistry(options) {
    var registryOptions = options || {};
    var seen = typeof Set === 'function' ? new Set() : null;
    var candidates = [];

    function registerCandidate(candidate) {
      var scope = isObject(candidate) ? candidate : detectScope(candidate);
      if (!isObject(scope)) {
        return;
      }

      if (seen) {
        if (seen.has(scope)) {
          return;
        }
        seen.add(scope);
      } else if (candidates.indexOf(scope) !== -1) {
        return;
      }

      candidates.push(scope);
    }

    registerCandidate(registryOptions.primaryScope);

    if (Array.isArray(registryOptions.additionalScopes)) {
      for (var index = 0; index < registryOptions.additionalScopes.length; index += 1) {
        registerCandidate(registryOptions.additionalScopes[index]);
      }
    }

    if (Array.isArray(registryOptions.extraCandidates)) {
      for (var extraIndex = 0; extraIndex < registryOptions.extraCandidates.length; extraIndex += 1) {
        registerCandidate(registryOptions.extraCandidates[extraIndex]);
      }
    }

    if (registryOptions.includeGlobalCandidates !== false) {
      registerCandidate(typeof globalThis !== 'undefined' ? globalThis : null);
      registerCandidate(typeof window !== 'undefined' ? window : null);
      registerCandidate(typeof self !== 'undefined' ? self : null);
      registerCandidate(typeof global !== 'undefined' ? global : null);
    }

    if (candidates.length === 0) {
      registerCandidate(detectScope());
    }

    return {
      candidates: candidates,
      registerCandidate: registerCandidate,
    };
  }

  function createRuntimeScopeBridge(options) {
    var registry = createCandidateRegistry(options);
    var candidates = registry.candidates;

    function readValue(name) {
      if (typeof name !== 'string' || !name) {
        return undefined;
      }

      for (var index = 0; index < candidates.length; index += 1) {
        var scope = candidates[index];
        if (!isObject(scope)) {
          continue;
        }

        try {
          if (name in scope) {
            var value = scope[name];
            if (typeof value !== 'undefined') {
              return value;
            }
          }
        } catch (readError) {
          void readError;
        }
      }

      return undefined;
    }

    function writeValue(name, value) {
      if (typeof name !== 'string' || !name) {
        return false;
      }

      for (var index = 0; index < candidates.length; index += 1) {
        var scope = candidates[index];
        if (!isObject(scope)) {
          continue;
        }

        try {
          scope[name] = value;
          return true;
        } catch (assignError) {
          void assignError;
        }

        try {
          Object.defineProperty(scope, name, {
            configurable: true,
            writable: true,
            value: value,
          });
          return true;
        } catch (defineError) {
          void defineError;
        }
      }

      return false;
    }

    function declareFallbackBinding(name, factory) {
      var existing = readValue(name);
      if (typeof existing !== 'undefined') {
        return existing;
      }

      var fallbackValue = typeof factory === 'function' ? factory() : factory;
      writeValue(name, fallbackValue);
      return fallbackValue;
    }

    return {
      candidates: candidates,
      readValue: readValue,
      writeValue: writeValue,
      declareFallbackBinding: declareFallbackBinding,
      registerScope: registry.registerCandidate,
    };
  }

  var namespace = {
    createRuntimeScopeBridge: createRuntimeScopeBridge,
  };

  var globalScope = detectScope();

  if (isObject(globalScope)) {
    var existing = isObject(globalScope.cineCoreAppRuntimeScopeBridge)
      ? globalScope.cineCoreAppRuntimeScopeBridge
      : {};

    if (typeof Object.assign === 'function') {
      Object.assign(existing, namespace);
    } else {
      for (var key in namespace) {
        if (Object.prototype.hasOwnProperty.call(namespace, key)) {
          existing[key] = namespace[key];
        }
      }
    }

    try {
      globalScope.cineCoreAppRuntimeScopeBridge = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();

