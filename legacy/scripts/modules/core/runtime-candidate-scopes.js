(function () {
  function isValidScope(scope) {
    return !!scope && (typeof scope === 'object' || typeof scope === 'function');
  }

  function isScopeList(candidate) {
    return !!candidate && typeof candidate.length === 'number';
  }

  function registerScope(scopes, seenScopes, scope) {
    if (!scopes || typeof scopes.length !== 'number') {
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

    for (var index = 0; index < scopes.length; index += 1) {
      if (scopes[index] === scope) {
        return;
      }
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
        var sharedScopes = runtimeShared.collectCandidateScopes(primaryScope, environmentHelpers);
        if (Array.isArray(sharedScopes)) {
          return sharedScopes;
        }
      } catch (collectRuntimeScopesError) {
        void collectRuntimeScopesError;
      }
    }

    var scopes = [];
    var seenScopes = typeof Set === 'function' ? new Set() : null;

    registerScope(scopes, seenScopes, primaryScope);
    registerScope(scopes, seenScopes, typeof globalThis !== 'undefined' ? globalThis : null);
    registerScope(scopes, seenScopes, typeof window !== 'undefined' ? window : null);
    registerScope(scopes, seenScopes, typeof self !== 'undefined' ? self : null);
    registerScope(scopes, seenScopes, typeof global !== 'undefined' ? global : null);

    return scopes;
  }

  function resolveCandidateScopes(options) {
    var primaryScope = options && options.primaryScope;
    var runtimeShared = options && options.runtimeShared;
    var environmentHelpers = options && options.environmentHelpers;
    var currentCandidateScopes = options && options.currentCandidateScopes;

    if (isScopeList(currentCandidateScopes)) {
      return currentCandidateScopes;
    }

    var resolvedScopes = null;

    if (
      runtimeShared &&
      typeof runtimeShared.resolveCandidateScopes === 'function'
    ) {
      try {
        resolvedScopes = runtimeShared.resolveCandidateScopes(primaryScope, environmentHelpers);
      } catch (resolveCandidateScopesError) {
        void resolveCandidateScopesError;
        resolvedScopes = null;
      }
    }

    if (!resolvedScopes) {
      resolvedScopes = collectCandidateScopesWithFallback(primaryScope, runtimeShared, environmentHelpers);
    }

    return resolvedScopes;
  }

  function syncCandidateScopes(candidateScopes, options) {
    var runtimeShared = options && options.runtimeShared;
    var environmentHelpers = options && options.environmentHelpers;
    var primaryScope = options && options.primaryScope;
    var globalScope = options && options.globalScope ? options.globalScope : detectFallbackGlobalScope(primaryScope);
    var assignCurrentCandidateScopes = options && options.assignCurrentCandidateScopes;

    if (
      runtimeShared &&
      typeof runtimeShared.syncCandidateScopes === 'function'
    ) {
      try {
        runtimeShared.syncCandidateScopes(candidateScopes, primaryScope, environmentHelpers);
        return candidateScopes;
      } catch (syncCandidateScopesError) {
        void syncCandidateScopesError;
      }
    }

    if (
      isValidScope(globalScope) &&
      (!globalScope.CORE_RUNTIME_CANDIDATE_SCOPES || globalScope.CORE_RUNTIME_CANDIDATE_SCOPES !== candidateScopes)
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
    var candidateScopes = resolveCandidateScopes(options || {});
    return syncCandidateScopes(candidateScopes, options || {});
  }

  var namespace = {
    collectCandidateScopesWithFallback: collectCandidateScopesWithFallback,
    resolveCandidateScopes: resolveCandidateScopes,
    syncCandidateScopes: syncCandidateScopes,
    ensureCandidateScopes: ensureCandidateScopes,
  };

  var globalScope = detectFallbackGlobalScope();
  var targetName = 'cineCoreRuntimeCandidateScopes';
  var existing =
    globalScope && typeof globalScope[targetName] === 'object'
      ? globalScope[targetName]
      : {};

  var target = existing;
  var keys = Object.keys(namespace);
  for (var keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
    var key = keys[keyIndex];
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
