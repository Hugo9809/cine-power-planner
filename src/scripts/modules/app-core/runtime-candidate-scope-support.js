/*
 * Provides runtime candidate scope helpers for the modern app core.
 *
 * The previous monolithic app core embedded an extensive set of helpers
 * that guarded the candidate scope list, synchronised it with the shared
 * runtime namespace and ensured global fallbacks remained available.  The
 * refactor moves that behaviour into this dedicated module so the core
 * bundle can continue to shrink while the split progresses.
 */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function isScopeList(candidate) {
    return !!candidate && typeof candidate.length === 'number';
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

  function ensureScope(candidate, fallback) {
    if (isObject(candidate)) {
      return candidate;
    }

    return detectScope(fallback);
  }

  function ensureRequireFn(candidate) {
    if (typeof candidate === 'function') {
      return candidate;
    }

    if (typeof require === 'function') {
      return require;
    }

    return null;
  }

  function ensureResolveCoreSupportModule(candidate, requireFn, runtimeScope) {
    if (typeof candidate === 'function') {
      return candidate;
    }

    const scope = ensureScope(runtimeScope);

    if (scope && typeof scope.resolveCoreSupportModule === 'function') {
      try {
        return scope.resolveCoreSupportModule.bind(scope);
      } catch (bindError) {
        void bindError;
      }
    }

    if (
      scope &&
      scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS &&
      typeof scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule === 'function'
    ) {
      try {
        return scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule.bind(
          scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS
        );
      } catch (bootstrapBindError) {
        void bootstrapBindError;
      }
    }

    if (typeof requireFn === 'function') {
      return function fallbackResolveCoreSupportModule(namespaceName, requirePath) {
        if (typeof namespaceName !== 'string' || !namespaceName) {
          return null;
        }

        if (typeof requirePath !== 'string' || !requirePath) {
          return null;
        }

        try {
          const required = requireFn(requirePath);
          return isObject(required) ? required : null;
        } catch (supportModuleError) {
          void supportModuleError;
        }

        return null;
      };
    }

    return null;
  }

  function createFallbackRuntimeCandidateScopeSupport(options) {
    const runtimeShared = options && options.runtimeShared;
    const environmentHelpers = options && options.environmentHelpers;

    function registerScope(scopes, seenScopes, scope) {
      if (!Array.isArray(scopes)) {
        return;
      }

      if (!isObject(scope)) {
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
      return (
        detectScope(primaryScope) ||
        (typeof window !== 'undefined' && isObject(window) ? window : null) ||
        (typeof self !== 'undefined' && isObject(self) ? self : null) ||
        (typeof global !== 'undefined' && isObject(global) ? global : null) ||
        null
      );
    }

    function fallbackCollectCandidateScopes(primaryScope) {
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
      registerScope(scopes, seenScopes, typeof globalThis !== 'undefined' ? globalThis : null);
      registerScope(scopes, seenScopes, typeof window !== 'undefined' ? window : null);
      registerScope(scopes, seenScopes, typeof self !== 'undefined' ? self : null);
      registerScope(scopes, seenScopes, typeof global !== 'undefined' ? global : null);

      return scopes;
    }

    function fallbackResolveCandidateScopes(resolveOptions) {
      const options = resolveOptions || {};
      const primaryScope = options.primaryScope;
      const currentCandidateScopes = options.currentCandidateScopes;

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

      if (!isScopeList(resolvedScopes)) {
        resolvedScopes = fallbackCollectCandidateScopes(primaryScope);
      }

      return resolvedScopes;
    }

    function fallbackSyncCandidateScopes(candidateScopes, syncOptions) {
      const options = syncOptions || {};
      const primaryScope = options.primaryScope;
      const globalScope =
        (options && isObject(options.globalScope) ? options.globalScope : null) ||
        detectFallbackGlobalScope(primaryScope);
      const assignCurrentCandidateScopes = options.assignCurrentCandidateScopes;

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
        isObject(globalScope) &&
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

    function fallbackEnsureCandidateScopes(ensureOptions) {
      const resolvedScopes = fallbackResolveCandidateScopes(ensureOptions || {});
      return fallbackSyncCandidateScopes(resolvedScopes, ensureOptions || {});
    }

    return {
      collectCandidateScopes: fallbackCollectCandidateScopes,
      collectCandidateScopesWithFallback: fallbackCollectCandidateScopes,
      resolveCandidateScopes: fallbackResolveCandidateScopes,
      syncCandidateScopes: fallbackSyncCandidateScopes,
      ensureCandidateScopes: fallbackEnsureCandidateScopes,
    };
  }

  function resolveCoreCandidateScopeBridge(
    resolveCoreSupportModule,
    requireFn,
    runtimeScope,
    coreGlobalScope
  ) {
    if (typeof resolveCoreSupportModule === 'function') {
      try {
        const resolved = resolveCoreSupportModule(
          'cineCoreRuntimeCandidateScopes',
          './modules/core/runtime-candidate-scopes.js'
        );
        if (isObject(resolved)) {
          return resolved;
        }
      } catch (candidateScopeResolveError) {
        void candidateScopeResolveError;
      }
    }

    if (typeof requireFn === 'function') {
      try {
        const required = requireFn('./modules/core/runtime-candidate-scopes.js');
        if (isObject(required)) {
          return required;
        }
      } catch (candidateScopeRequireError) {
        void candidateScopeRequireError;
      }
    }

    const candidateScopes = [];
    if (isObject(runtimeScope)) {
      candidateScopes.push(runtimeScope);
    }
    if (isObject(coreGlobalScope) && candidateScopes.indexOf(coreGlobalScope) === -1) {
      candidateScopes.push(coreGlobalScope);
    }
    candidateScopes.push(
      typeof globalThis !== 'undefined' ? globalThis : null,
      typeof window !== 'undefined' ? window : null,
      typeof self !== 'undefined' ? self : null,
      typeof global !== 'undefined' ? global : null
    );

    for (let index = 0; index < candidateScopes.length; index += 1) {
      const scope = candidateScopes[index];
      if (!isObject(scope)) {
        continue;
      }

      try {
        const candidate = scope.cineCoreRuntimeCandidateScopes;
        if (isObject(candidate)) {
          return candidate;
        }
      } catch (candidateScopeLookupError) {
        void candidateScopeLookupError;
      }
    }

    return null;
  }

  function resolveRuntimeCandidateScopeSupport(options) {
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    const runtimeShared = options && options.runtimeShared;
    const environmentHelpers = options && options.environmentHelpers;

    const resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );

    const fallbackSupport = createFallbackRuntimeCandidateScopeSupport({
      runtimeShared,
      environmentHelpers,
    });

    const bridge = resolveCoreCandidateScopeBridge(
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope
    );

    function mergeOptions(baseOptions) {
      const merged = Object.assign({}, baseOptions || {});

      if (typeof merged.runtimeShared === 'undefined') {
        merged.runtimeShared = runtimeShared;
      }

      if (typeof merged.environmentHelpers === 'undefined') {
        merged.environmentHelpers = environmentHelpers;
      }

      return merged;
    }

    function collectCandidateScopes(primaryScope) {
      if (isObject(bridge)) {
        if (typeof bridge.collectCandidateScopesWithFallback === 'function') {
          try {
            const collected = bridge.collectCandidateScopesWithFallback(
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

        if (typeof bridge.collectCandidateScopes === 'function') {
          try {
            const collected = bridge.collectCandidateScopes(
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
      }

      return fallbackSupport.collectCandidateScopes(primaryScope);
    }

    function resolveCandidateScopes(resolveOptions) {
      const optionsWithDefaults = mergeOptions(resolveOptions);

      if (isObject(bridge) && typeof bridge.resolveCandidateScopes === 'function') {
        try {
          const resolved = bridge.resolveCandidateScopes(optionsWithDefaults);
          if (isScopeList(resolved)) {
            return resolved;
          }
        } catch (resolveCandidateScopesError) {
          void resolveCandidateScopesError;
        }
      }

      return fallbackSupport.resolveCandidateScopes(optionsWithDefaults);
    }

    function syncCandidateScopes(candidateScopes, syncOptions) {
      const optionsWithDefaults = mergeOptions(syncOptions);

      if (isObject(bridge) && typeof bridge.syncCandidateScopes === 'function') {
        try {
          const synced = bridge.syncCandidateScopes(
            candidateScopes,
            optionsWithDefaults
          );

          if (isScopeList(synced)) {
            return synced;
          }

          if (typeof synced === 'undefined') {
            return candidateScopes;
          }

          return synced;
        } catch (syncCandidateScopesError) {
          void syncCandidateScopesError;
        }
      }

      return fallbackSupport.syncCandidateScopes(candidateScopes, optionsWithDefaults);
    }

    function ensureCandidateScopes(ensureOptions) {
      const optionsWithDefaults = mergeOptions(ensureOptions);

      if (isObject(bridge) && typeof bridge.ensureCandidateScopes === 'function') {
        try {
          const ensured = bridge.ensureCandidateScopes(optionsWithDefaults);
          if (isScopeList(ensured)) {
            return ensured;
          }
        } catch (ensureCandidateScopesError) {
          void ensureCandidateScopesError;
        }
      }

      const resolved = resolveCandidateScopes(optionsWithDefaults);
      return syncCandidateScopes(resolved, optionsWithDefaults);
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
    resolveRuntimeCandidateScopeSupport,
    createFallbackRuntimeCandidateScopeSupport,
  };

  const globalScope = detectScope();
  const namespaceName = 'cineCoreAppRuntimeCandidateScopeSupport';
  const existing = isObject(globalScope) && isObject(globalScope[namespaceName])
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
