(function () {
  function detectAmbientScope(primary) {
    if (primary && (typeof primary === 'object' || typeof primary === 'function')) {
      return primary;
    }

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
    const referenceScope = detectAmbientScope(primaryScope);
    const scopes = [];

    if (
      environmentHelpers &&
      typeof environmentHelpers.fallbackCollectCandidateScopes === 'function'
    ) {
      try {
        const collected = environmentHelpers.fallbackCollectCandidateScopes(referenceScope);
        if (Array.isArray(collected)) {
          for (let collectedIndex = 0; collectedIndex < collected.length; collectedIndex += 1) {
            registerCandidateScope(scopes, collected[collectedIndex]);
          }
        }
      } catch (collectError) {
        void collectError;
      }
    }

    registerCandidateScope(scopes, referenceScope);
    registerCandidateScope(scopes, typeof globalThis !== 'undefined' ? globalThis : null);
    registerCandidateScope(scopes, typeof window !== 'undefined' ? window : null);
    registerCandidateScope(scopes, typeof self !== 'undefined' ? self : null);
    registerCandidateScope(scopes, typeof global !== 'undefined' ? global : null);

    let detected = null;

    if (
      environmentHelpers &&
      typeof environmentHelpers.fallbackDetectGlobalScope === 'function'
    ) {
      try {
        detected = environmentHelpers.fallbackDetectGlobalScope();
      } catch (detectError) {
        void detectError;
        detected = null;
      }
    }

    if (!detected) {
      detected = detectAmbientScope(referenceScope);
    }

    registerCandidateScope(scopes, detected);

    return scopes;
  }

  function syncCandidateScopes(candidateScopes, primaryScope, environmentHelpers) {
    if (!Array.isArray(candidateScopes)) {
      return [];
    }

    const referenceScope = detectAmbientScope(primaryScope);
    const scopes = collectCandidateScopes(referenceScope, environmentHelpers);

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      try {
        if (scope.CORE_RUNTIME_CANDIDATE_SCOPES !== candidateScopes) {
          scope.CORE_RUNTIME_CANDIDATE_SCOPES = candidateScopes;
        }
      } catch (assignError) {
        void assignError;
      }
    }

    return candidateScopes;
  }

  function resolveCandidateScopes(primaryScope, environmentHelpers) {
    const referenceScope = detectAmbientScope(primaryScope);

    if (referenceScope && typeof referenceScope === 'object') {
      try {
        const existing = referenceScope.CORE_RUNTIME_CANDIDATE_SCOPES;
        if (Array.isArray(existing)) {
          return syncCandidateScopes(existing, referenceScope, environmentHelpers);
        }
      } catch (lookupError) {
        void lookupError;
      }
    }

    const candidateScopes = collectCandidateScopes(referenceScope, environmentHelpers);
    return syncCandidateScopes(candidateScopes, referenceScope, environmentHelpers);
  }

  function assignToGlobal(namespace) {
    const scope = detectAmbientScope();
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return;
    }

    const registryName = 'cineCoreRuntimeStateScopes';

    try {
      scope[registryName] = namespace;
    } catch (assignError) {
      void assignError;
    }
  }

  const namespace = {
    collectCandidateScopes,
    resolveCandidateScopes,
    syncCandidateScopes,
  };

  assignToGlobal(namespace);

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
