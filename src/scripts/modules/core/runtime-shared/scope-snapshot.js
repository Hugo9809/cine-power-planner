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

  function getScopesSnapshot(runtimeState, candidateScopes) {
    if (runtimeState && typeof runtimeState.getScopes === 'function') {
      try {
        const runtimeScopes = runtimeState.getScopes();
        if (Array.isArray(runtimeScopes)) {
          return runtimeScopes.slice();
        }
      } catch (getScopesError) {
        void getScopesError;
      }
    }

    if (Array.isArray(candidateScopes)) {
      return candidateScopes.slice();
    }

    return [];
  }

  function ensurePrimaryScope(runtimeState, candidateScopes) {
    if (runtimeState && typeof runtimeState.getPrimaryScope === 'function') {
      try {
        const primary = runtimeState.getPrimaryScope();
        if (primary && (typeof primary === 'object' || typeof primary === 'function')) {
          return primary;
        }
      } catch (getPrimaryError) {
        void getPrimaryError;
      }
    }

    if (Array.isArray(candidateScopes)) {
      for (let index = 0; index < candidateScopes.length; index += 1) {
        const candidate = candidateScopes[index];
        if (candidate && (typeof candidate === 'object' || typeof candidate === 'function')) {
          return candidate;
        }
      }
    }

    return null;
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

    existing.scopeSnapshot = namespace;

    try {
      scope[registryName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  const namespace = {
    getScopesSnapshot,
    ensurePrimaryScope,
  };

  assignToGlobal(namespace);

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
