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

  function registerScope(runtimeState, scope) {
    if (!runtimeState || typeof runtimeState.registerScope !== 'function') {
      return;
    }

    try {
      runtimeState.registerScope(scope);
    } catch (registerError) {
      void registerError;
    }
  }

  function registerScopes(runtimeState, candidateScopes) {
    if (!Array.isArray(candidateScopes)) {
      return;
    }

    for (let index = 0; index < candidateScopes.length; index += 1) {
      registerScope(runtimeState, candidateScopes[index]);
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

    existing.scopeRegistration = namespace;

    try {
      scope[registryName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  const namespace = {
    registerScope,
    registerScopes,
  };

  assignToGlobal(namespace);

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
