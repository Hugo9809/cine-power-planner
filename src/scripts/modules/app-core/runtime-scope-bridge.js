/*
 * Provides a shared bridge for accessing and mutating the global runtime
 * scopes used by the Cine Power Planner core runtime. The original
 * monolithic bundle duplicated the logic for collecting candidate scopes,
 * reading values and writing fallbacks across multiple files. Extracting
 * the behaviour into this module lets the ongoing refactor shrink the core
 * runtime files without losing any of the defensive checks that keep
 * autosave, backup and restore features safe.
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
    const registryOptions = options || {};
    const seen = typeof Set === 'function' ? new Set() : null;
    const candidates = [];

    function registerCandidate(candidate) {
      const scope = isObject(candidate) ? candidate : detectScope(candidate);
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
      for (let index = 0; index < registryOptions.additionalScopes.length; index += 1) {
        registerCandidate(registryOptions.additionalScopes[index]);
      }
    }

    if (Array.isArray(registryOptions.extraCandidates)) {
      for (let index = 0; index < registryOptions.extraCandidates.length; index += 1) {
        registerCandidate(registryOptions.extraCandidates[index]);
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
      candidates,
      registerCandidate,
    };
  }

  function createRuntimeScopeBridge(options) {
    const registry = createCandidateRegistry(options);
    const candidates = registry.candidates;

    function readValue(name) {
      if (typeof name !== 'string' || !name) {
        return undefined;
      }

      for (let index = 0; index < candidates.length; index += 1) {
        const scope = candidates[index];
        if (!isObject(scope)) {
          continue;
        }

        try {
          if (name in scope) {
            const value = scope[name];
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

      for (let index = 0; index < candidates.length; index += 1) {
        const scope = candidates[index];
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
            value,
          });
          return true;
        } catch (defineError) {
          void defineError;
        }
      }

      return false;
    }

    function declareFallbackBinding(name, factory) {
      const existing = readValue(name);
      if (typeof existing !== 'undefined') {
        return existing;
      }

      const fallbackValue = typeof factory === 'function' ? factory() : factory;
      writeValue(name, fallbackValue);
      return fallbackValue;
    }

    return {
      candidates,
      readValue,
      writeValue,
      declareFallbackBinding,
      registerScope: registry.registerCandidate,
    };
  }

  const namespace = {
    createRuntimeScopeBridge,
  };

  const globalScope = detectScope();

  if (isObject(globalScope)) {
    const existing = isObject(globalScope.cineCoreAppRuntimeScopeBridge)
      ? globalScope.cineCoreAppRuntimeScopeBridge
      : {};

    if (typeof Object.assign === 'function') {
      Object.assign(existing, namespace);
    } else {
      for (const key in namespace) {
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

