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

  function createScopeRegistry(initial) {
    if (typeof Set === 'function') {
      const registry = new Set();
      if (initial) {
        try {
          registry.add(initial);
        } catch (registryInitialiseError) {
          void registryInitialiseError;
        }
      }

      return {
        has(value) {
          try {
            return registry.has(value);
          } catch (registryHasError) {
            void registryHasError;
            return false;
          }
        },
        add(value) {
          try {
            registry.add(value);
          } catch (registryAddError) {
            void registryAddError;
          }
        },
        values() {
          try {
            return Array.from(registry.values());
          } catch (registryValuesError) {
            void registryValuesError;
            return [];
          }
        },
      };
    }

    const list = [];
    if (initial && list.indexOf(initial) === -1) {
      list.push(initial);
    }

    return {
      has(value) {
        return list.indexOf(value) !== -1;
      },
      add(value) {
        if (list.indexOf(value) === -1) {
          list.push(value);
        }
      },
      values() {
        return list.slice();
      },
    };
  }

  function collectCandidateScopes(primary) {
    const registry = createScopeRegistry();

    function registerScope(scope) {
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        return;
      }

      if (!registry.has(scope)) {
        registry.add(scope);
      }
    }

    registerScope(primary);
    registerScope(typeof globalThis !== 'undefined' ? globalThis : null);
    registerScope(typeof window !== 'undefined' ? window : null);
    registerScope(typeof self !== 'undefined' ? self : null);
    registerScope(typeof global !== 'undefined' ? global : null);

    return registry.values();
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

    existing.ambientScope = namespace;

    try {
      scope[registryName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  const namespace = {
    detectAmbientScope,
    collectCandidateScopes,
  };

  assignToGlobal(namespace);

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
