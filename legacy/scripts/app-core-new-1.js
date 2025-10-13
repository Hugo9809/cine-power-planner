var CORE_RUNTIME_SCOPE_SUPPORT = function () {
  var resolvedSupport = null;

  if (typeof resolveCoreSupportModule === 'function') {
    try {
      resolvedSupport = resolveCoreSupportModule('cineCoreRuntimeStateScopes', './modules/core/runtime-state/runtime-scopes.js');
    } catch (runtimeScopeResolveError) {
      void runtimeScopeResolveError;
      resolvedSupport = null;
    }
  }

  if (!resolvedSupport && typeof require === 'function') {
    try {
      var requiredRuntimeScopes = require('./modules/core/runtime-state/runtime-scopes.js');
      if (requiredRuntimeScopes && _typeof(requiredRuntimeScopes) === 'object') {
        resolvedSupport = requiredRuntimeScopes;
      }
    } catch (runtimeScopeRequireError) {
      void runtimeScopeRequireError;
    }
  }

  if (resolvedSupport) {
    return resolvedSupport;
  }

  var fallbackScopes = [
    typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && _typeof(CORE_GLOBAL_SCOPE) === 'object' ? CORE_GLOBAL_SCOPE : null,
    typeof globalThis !== 'undefined' && _typeof(globalThis) === 'object' ? globalThis : null,
    typeof window !== 'undefined' && _typeof(window) === 'object' ? window : null,
    typeof self !== 'undefined' && _typeof(self) === 'object' ? self : null,
    typeof global !== 'undefined' && _typeof(global) === 'object' ? global : null,
  ];

  for (var index = 0; index < fallbackScopes.length; index += 1) {
    var scope = fallbackScopes[index];
    if (!scope || _typeof(scope) !== 'object') {
      continue;
    }

    try {
      var candidate = scope.cineCoreRuntimeStateScopes;
      if (candidate && _typeof(candidate) === 'object') {
        return candidate;
      }
    } catch (runtimeScopeLookupError) {
      void runtimeScopeLookupError;
    }
  }

  return null;
}();
  if (
    CORE_RUNTIME_SHARED &&
    typeof CORE_RUNTIME_SHARED.collectCandidateScopes === 'function'
  ) {
    try {
      var sharedScopes = CORE_RUNTIME_SHARED.collectCandidateScopes(
        primaryScope,
        CORE_ENVIRONMENT_HELPERS
      );
      if (Array.isArray(sharedScopes)) {
        return sharedScopes;
      }
    } catch (collectRuntimeScopesError) {
      void collectRuntimeScopesError;
    }
  }

  if (
    CORE_RUNTIME_SCOPE_SUPPORT &&
    typeof CORE_RUNTIME_SCOPE_SUPPORT.collectCandidateScopes === 'function'
  ) {
    try {
      var fallbackScopes = CORE_RUNTIME_SCOPE_SUPPORT.collectCandidateScopes(
        primaryScope,
        CORE_ENVIRONMENT_HELPERS
      );
      if (Array.isArray(fallbackScopes)) {
        return fallbackScopes;
      }
    } catch (collectScopeSupportError) {
      void collectScopeSupportError;
    }
  }

  var resolvedScopes = null;
  if (
    CORE_RUNTIME_SHARED &&
    typeof CORE_RUNTIME_SHARED.resolveCandidateScopes === 'function'
  ) {
      resolvedScopes = CORE_RUNTIME_SHARED.resolveCandidateScopes(
        _typeof(CORE_GLOBAL_SCOPE) === 'object' ? CORE_GLOBAL_SCOPE : null,
        CORE_ENVIRONMENT_HELPERS
      );
    } catch (resolveCandidateScopesError) {
      void resolveCandidateScopesError;
      resolvedScopes = null;
  if (!resolvedScopes) {
    if (
      CORE_RUNTIME_SCOPE_SUPPORT &&
      typeof CORE_RUNTIME_SCOPE_SUPPORT.resolveCandidateScopes === 'function'
    ) {
      try {
        var supportedScopes = CORE_RUNTIME_SCOPE_SUPPORT.resolveCandidateScopes(
          _typeof(CORE_GLOBAL_SCOPE) === 'object' ? CORE_GLOBAL_SCOPE : null,
          CORE_ENVIRONMENT_HELPERS
        );
        if (Array.isArray(supportedScopes)) {
          resolvedScopes = supportedScopes;
        }
      } catch (resolveScopeSupportError) {
        void resolveScopeSupportError;
        resolvedScopes = null;
      }

  if (!resolvedScopes) {
    resolvedScopes = collectCoreRuntimeCandidateScopes(
      _typeof(CORE_GLOBAL_SCOPE) === 'object' ? CORE_GLOBAL_SCOPE : null
    );
  }

  if (
    CORE_RUNTIME_SHARED &&
    typeof CORE_RUNTIME_SHARED.syncCandidateScopes === 'function'
  ) {
    try {
      CORE_RUNTIME_SHARED.syncCandidateScopes(
        resolvedScopes,
        _typeof(CORE_GLOBAL_SCOPE) === 'object' ? CORE_GLOBAL_SCOPE : null,
        CORE_ENVIRONMENT_HELPERS
      );
    } catch (syncCandidateScopesError) {
      void syncCandidateScopesError;
    }
  } else if (
    CORE_RUNTIME_SCOPE_SUPPORT &&
    typeof CORE_RUNTIME_SCOPE_SUPPORT.syncCandidateScopes === 'function'
  ) {
    try {
      CORE_RUNTIME_SCOPE_SUPPORT.syncCandidateScopes(
        resolvedScopes,
        _typeof(CORE_GLOBAL_SCOPE) === 'object' ? CORE_GLOBAL_SCOPE : null,
        CORE_ENVIRONMENT_HELPERS
      );
    } catch (syncScopeSupportError) {
      void syncScopeSupportError;
    }
  } else {
    var scope = (typeof globalThis !== 'undefined' && globalThis) || (typeof window !== 'undefined' && window) || (typeof self !== 'undefined' && self) || (typeof global !== 'undefined' && global) || null;

    if (scope && (!scope.CORE_RUNTIME_CANDIDATE_SCOPES || scope.CORE_RUNTIME_CANDIDATE_SCOPES !== resolvedScopes)) {
      try {
        scope.CORE_RUNTIME_CANDIDATE_SCOPES = resolvedScopes;
      } catch (assignError) {
        void assignError;
      }
    }

    try {
      if (typeof CORE_RUNTIME_CANDIDATE_SCOPES === 'undefined' || CORE_RUNTIME_CANDIDATE_SCOPES !== resolvedScopes) {
        CORE_RUNTIME_CANDIDATE_SCOPES = resolvedScopes;
      }
    } catch (candidateAssignError) {
      void candidateAssignError;
    }
  }

  return resolvedScopes;
}();
