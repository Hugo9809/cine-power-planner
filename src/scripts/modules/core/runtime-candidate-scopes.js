(function () {
  function isValidScope(scope) {
    return !!scope && (typeof scope === 'object' || typeof scope === 'function');
  }

  function isScopeList(candidate) {
    return !!candidate && typeof candidate.length === 'number';
  }

  function registerScope(scopes, seenScopes, scope) {
    if (!Array.isArray(scopes)) {
      return;
    }

    if (!isValidScope(scope)) {
      return;
    }

    if (seenScopes) {
      if (seenScopes.has(scope)) {
        return;
      }

      seenScopes.add(scope);
      scopes.push(scope);
      return;
    }

    if (scopes.indexOf(scope) !== -1) {
      return;
    }

    scopes.push(scope);
  }

  function detectFallbackGlobalScope(primaryScope) {
    if (isValidScope(primaryScope)) {
      return primaryScope;
    }

    if (typeof globalThis !== 'undefined' && isValidScope(globalThis)) {
      return globalThis;
    }

    if (typeof window !== 'undefined' && isValidScope(window)) {
      return window;
    }

    if (typeof self !== 'undefined' && isValidScope(self)) {
      return self;
    }

    if (typeof global !== 'undefined' && isValidScope(global)) {
      return global;
    }

    return null;
  }

  function collectCandidateScopesWithFallback(primaryScope, runtimeShared, environmentHelpers) {
    if (
      runtimeShared &&
      typeof runtimeShared.collectCandidateScopes === 'function'
    ) {
      try {
        const sharedScopes = runtimeShared.collectCandidateScopes(
          primaryScope,
          environmentHelpers
        );
        if (Array.isArray(sharedScopes)) {
          return sharedScopes;
        }
      } catch (collectRuntimeScopesError) {
        void collectRuntimeScopesError;
      }
    }

    const scopes = [];
    const seenScopes = typeof Set === 'function' ? new Set() : null;

    registerScope(scopes, seenScopes, primaryScope);
    registerScope(
      scopes,
      seenScopes,
      typeof globalThis !== 'undefined' ? globalThis : null
    );
    registerScope(scopes, seenScopes, typeof window !== 'undefined' ? window : null);
    registerScope(scopes, seenScopes, typeof self !== 'undefined' ? self : null);
    registerScope(scopes, seenScopes, typeof global !== 'undefined' ? global : null);

    return scopes;
  }

  function resolveCandidateScopes(options) {
    const primaryScope = options && options.primaryScope;
    const runtimeShared = options && options.runtimeShared;
    const environmentHelpers = options && options.environmentHelpers;
    const currentCandidateScopes = options && options.currentCandidateScopes;

    if (isScopeList(currentCandidateScopes)) {
      return currentCandidateScopes;
    }

    let resolvedScopes = null;

    if (
      runtimeShared &&
      typeof runtimeShared.resolveCandidateScopes === 'function'
    ) {
      try {
        resolvedScopes = runtimeShared.resolveCandidateScopes(
          primaryScope,
          environmentHelpers
        );
      } catch (resolveCandidateScopesError) {
        void resolveCandidateScopesError;
        resolvedScopes = null;
      }
    }

    if (!resolvedScopes) {
      resolvedScopes = collectCandidateScopesWithFallback(
        primaryScope,
        runtimeShared,
        environmentHelpers
      );
    }

    return resolvedScopes;
  }

  function syncCandidateScopes(candidateScopes, options) {
    const runtimeShared = options && options.runtimeShared;
    const environmentHelpers = options && options.environmentHelpers;
    const primaryScope = options && options.primaryScope;
    const globalScope =
      (options && options.globalScope) || detectFallbackGlobalScope(primaryScope);
    const assignCurrentCandidateScopes =
      options && options.assignCurrentCandidateScopes;

    if (
      runtimeShared &&
      typeof runtimeShared.syncCandidateScopes === 'function'
    ) {
      try {
        runtimeShared.syncCandidateScopes(
          candidateScopes,
          primaryScope,
          environmentHelpers
        );
        return candidateScopes;
      } catch (syncCandidateScopesError) {
        void syncCandidateScopesError;
      }
    }

    if (
      isValidScope(globalScope) &&
      (!globalScope.CORE_RUNTIME_CANDIDATE_SCOPES ||
        globalScope.CORE_RUNTIME_CANDIDATE_SCOPES !== candidateScopes)
    ) {
      try {
        globalScope.CORE_RUNTIME_CANDIDATE_SCOPES = candidateScopes;
      } catch (assignError) {
        void assignError;
      }
    }

    if (typeof assignCurrentCandidateScopes === 'function') {
      try {
        assignCurrentCandidateScopes(candidateScopes);
      } catch (candidateAssignError) {
        void candidateAssignError;
      }
    }

    return candidateScopes;
  }

  function ensureCandidateScopes(options) {
    const candidateScopes = resolveCandidateScopes(options || {});
    return syncCandidateScopes(candidateScopes, options || {});
  }

  const namespace = {
    collectCandidateScopesWithFallback,
    resolveCandidateScopes,
    syncCandidateScopes,
    ensureCandidateScopes,
  };

  const globalScope = detectFallbackGlobalScope();
  const targetName = 'cineCoreRuntimeCandidateScopes';
  const existing =
    globalScope && typeof globalScope[targetName] === 'object'
      ? globalScope[targetName]
      : {};

  const target = existing;
  for (const key of Object.keys(namespace)) {
    target[key] = namespace[key];
  }

  if (isValidScope(globalScope)) {
    try {
      globalScope[targetName] = target;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = target;
  }
})();
