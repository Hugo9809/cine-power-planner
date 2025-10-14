/*
 * Exposes the runtime candidate scope fallback helpers that previously lived
 * inside the large modern app core bundle. Moving the implementation here keeps
 * the orchestrator leaner while ensuring offline capability, backup routines
 * and user data protections remain untouched.
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

  function createRuntimeCandidateScopeSupportFallback(options) {
    const runtimeShared = options && options.runtimeShared;
    const environmentHelpers = options && options.environmentHelpers;
    const candidateScopeBridge = options && options.candidateScopeBridge;
    const corePartRuntimeScope = options && options.corePartRuntimeScope;
    const coreGlobalScope = options && options.coreGlobalScope;

    function isValidScope(scope) {
      return !!scope && (typeof scope === 'object' || typeof scope === 'function');
    }

    function ensureScopes(primaryScope) {
      const scopes = [];
      const seen = typeof Set === 'function' ? new Set() : null;

      function register(scope) {
        if (!isValidScope(scope)) {
          return;
        }

        if (seen) {
          if (seen.has(scope)) {
            return;
          }

          seen.add(scope);
          scopes.push(scope);
          return;
        }

        if (scopes.indexOf(scope) !== -1) {
          return;
        }

        scopes.push(scope);
      }

      register(primaryScope);
      register(corePartRuntimeScope);
      register(coreGlobalScope);
      register(typeof globalThis !== 'undefined' ? globalThis : null);
      register(typeof window !== 'undefined' ? window : null);
      register(typeof self !== 'undefined' ? self : null);
      register(typeof global !== 'undefined' ? global : null);

      return scopes;
    }

    function collectCandidateScopes(primaryScope) {
      if (
        candidateScopeBridge &&
        typeof candidateScopeBridge.collectCandidateScopesWithFallback === 'function'
      ) {
        try {
          const collected =
            candidateScopeBridge.collectCandidateScopesWithFallback(
              primaryScope,
              runtimeShared,
              environmentHelpers
            );
          if (Array.isArray(collected)) {
            return collected;
          }
        } catch (collectCandidateScopesError) {
          void collectCandidateScopesError;
        }
      }

      if (
        candidateScopeBridge &&
        typeof candidateScopeBridge.collectCandidateScopes === 'function'
      ) {
        try {
          const collected = candidateScopeBridge.collectCandidateScopes(
            primaryScope,
            runtimeShared,
            environmentHelpers
          );
          if (Array.isArray(collected)) {
            return collected;
          }
        } catch (collectCandidateScopesFallbackError) {
          void collectCandidateScopesFallbackError;
        }
      }

      if (runtimeShared && typeof runtimeShared.collectCandidateScopes === 'function') {
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

      return ensureScopes(primaryScope);
    }

    function resolveCandidateScopes(resolveOptions) {
      const optionsWithDefaults = resolveOptions || {};
      const currentCandidateScopes = optionsWithDefaults.currentCandidateScopes;

      if (Array.isArray(currentCandidateScopes)) {
        return currentCandidateScopes;
      }

      if (
        candidateScopeBridge &&
        typeof candidateScopeBridge.resolveCandidateScopes === 'function'
      ) {
        try {
          const resolved = candidateScopeBridge.resolveCandidateScopes(optionsWithDefaults);
          if (Array.isArray(resolved)) {
            return resolved;
          }
        } catch (resolveCandidateScopesError) {
          void resolveCandidateScopesError;
        }
      }

      if (runtimeShared && typeof runtimeShared.resolveCandidateScopes === 'function') {
        try {
          const resolved = runtimeShared.resolveCandidateScopes(
            optionsWithDefaults.primaryScope,
            environmentHelpers
          );
          if (Array.isArray(resolved)) {
            return resolved;
          }
        } catch (resolveRuntimeCandidateScopesError) {
          void resolveRuntimeCandidateScopesError;
        }
      }

      return collectCandidateScopes(optionsWithDefaults.primaryScope);
    }

    function syncCandidateScopes(candidateScopes, syncOptions) {
      const optionsWithDefaults = syncOptions || {};
      const primaryScope = optionsWithDefaults.primaryScope;
      const candidateList = Array.isArray(candidateScopes) ? candidateScopes : [];
      const providedGlobalScope = optionsWithDefaults.globalScope;

      if (
        candidateScopeBridge &&
        typeof candidateScopeBridge.syncCandidateScopes === 'function'
      ) {
        try {
          const synced = candidateScopeBridge.syncCandidateScopes(
            candidateList,
            optionsWithDefaults
          );
          if (Array.isArray(synced)) {
            return synced;
          }
          if (typeof synced === 'undefined') {
            return candidateList;
          }
          return synced;
        } catch (syncCandidateScopesError) {
          void syncCandidateScopesError;
        }
      }

      if (runtimeShared && typeof runtimeShared.syncCandidateScopes === 'function') {
        try {
          runtimeShared.syncCandidateScopes(
            candidateList,
            primaryScope,
            environmentHelpers
          );
          return candidateList;
        } catch (syncRuntimeCandidateScopesError) {
          void syncRuntimeCandidateScopesError;
        }
      }

      const globalScope =
        (isValidScope(providedGlobalScope) ? providedGlobalScope : null) ||
        (isValidScope(primaryScope) ? primaryScope : null) ||
        (typeof globalThis !== 'undefined' && isValidScope(globalThis) ? globalThis : null) ||
        (typeof window !== 'undefined' && isValidScope(window) ? window : null) ||
        (typeof self !== 'undefined' && isValidScope(self) ? self : null) ||
        (typeof global !== 'undefined' && isValidScope(global) ? global : null);

      if (isValidScope(globalScope)) {
        try {
          globalScope.CORE_RUNTIME_CANDIDATE_SCOPES = candidateList;
        } catch (assignError) {
          void assignError;
        }
      }

      if (typeof optionsWithDefaults.assignCurrentCandidateScopes === 'function') {
        try {
          optionsWithDefaults.assignCurrentCandidateScopes(candidateList);
        } catch (candidateAssignError) {
          void candidateAssignError;
        }
      }

      return candidateList;
    }

    function ensureCandidateScopes(ensureOptions) {
      const resolved = resolveCandidateScopes(ensureOptions || {});
      return syncCandidateScopes(resolved, ensureOptions || {});
    }

    return {
      collectCandidateScopes,
      collectCandidateScopesWithFallback: collectCandidateScopes,
      resolveCandidateScopes,
      syncCandidateScopes,
      ensureCandidateScopes,
    };
  }

  const namespace = {
    createRuntimeCandidateScopeSupportFallback,
  };

  const globalScope = detectScope();
  const namespaceName = 'cineCoreAppRuntimeCandidateScopeFallback';
  const existing =
    isObject(globalScope) && isObject(globalScope[namespaceName])
      ? globalScope[namespaceName]
      : {};

  Object.assign(existing, namespace);

  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();

