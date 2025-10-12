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

  function registerCandidateScope(scopes, scope) {
    if (!Array.isArray(scopes)) {
      return;
    }

    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return;
    }

    for (let index = 0; index < scopes.length; index += 1) {
      if (scopes[index] === scope) {
        return;
      }
    }

    scopes.push(scope);
  }

  function collectCandidateScopes(primaryScope, environmentHelpers) {
    const scopes = [];

    if (
      environmentHelpers &&
      typeof environmentHelpers.fallbackCollectCandidateScopes === 'function'
    ) {
      try {
        const collected = environmentHelpers.fallbackCollectCandidateScopes(primaryScope);
        if (Array.isArray(collected)) {
          for (let collectedIndex = 0; collectedIndex < collected.length; collectedIndex += 1) {
            registerCandidateScope(scopes, collected[collectedIndex]);
          }
        }
      } catch (collectError) {
        void collectError;
      }
    }

    registerCandidateScope(scopes, primaryScope);
    registerCandidateScope(scopes, typeof globalThis !== 'undefined' ? globalThis : null);
    registerCandidateScope(scopes, typeof window !== 'undefined' ? window : null);
    registerCandidateScope(scopes, typeof self !== 'undefined' ? self : null);
    registerCandidateScope(scopes, typeof global !== 'undefined' ? global : null);

    let detected = null;

    if (environmentHelpers && typeof environmentHelpers.fallbackDetectGlobalScope === 'function') {
      try {
        detected = environmentHelpers.fallbackDetectGlobalScope();
      } catch (detectError) {
        void detectError;
        detected = null;
      }
    }

    if (!detected) {
      detected = detectScope(primaryScope);
    }

    registerCandidateScope(scopes, detected);

    return scopes;
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

    existing.scopeDetection = namespace;

    try {
      scope[registryName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  const namespace = {
    detectScope,
    registerCandidateScope,
    collectCandidateScopes,
  };

  assignToGlobal(namespace);

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
