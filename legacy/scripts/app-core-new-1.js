function fallbackDetectRuntimeScope(primaryScope) {
  if (primaryScope && (_typeof(primaryScope) === 'object' || typeof primaryScope === 'function')) {
    return primaryScope;
  }

  if (typeof globalThis !== 'undefined' && globalThis && _typeof(globalThis) === 'object') {
    return globalThis;
  }

  if (typeof window !== 'undefined' && window && _typeof(window) === 'object') {
    return window;
  }

  if (typeof self !== 'undefined' && self && _typeof(self) === 'object') {
    return self;
  }

  if (typeof global !== 'undefined' && global && _typeof(global) === 'object') {
    return global;
  }

  return null;
}

function fallbackResolveCoreSupportModule(namespaceName, requirePath, primaryScope) {
  if (typeof namespaceName !== 'string' || !namespaceName) {
    return null;
  }

  var runtimeScope = fallbackDetectRuntimeScope(primaryScope);

  if (runtimeScope && runtimeScope[namespaceName] && _typeof(runtimeScope[namespaceName]) === 'object') {
    return runtimeScope[namespaceName];
  }

  if (typeof require === 'function' && typeof requirePath === 'string' && requirePath) {
    try {
      var required = require(requirePath);
      if (required && _typeof(required) === 'object') {
        return required;
      }
    } catch (supportModuleError) {
      void supportModuleError;
    }
  }

  return null;
}
var CORE_SUPPORT_RESOLVER = function ensureCoreSupportResolver() {
  var namespaceName = 'cineCoreSupportResolver';
  function readFromScope(candidateScope) {
    if (!candidateScope || _typeof(candidateScope) !== 'object' && typeof candidateScope !== 'function') {
      return null;
    }
    try {
      var resolver = candidateScope[namespaceName];
      return resolver && _typeof(resolver) === 'object' ? resolver : null;
    } catch (resolverLookupError) {
      void resolverLookupError;
    }
    return null;
  }
  var primaryScope = typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && _typeof(CORE_GLOBAL_SCOPE) === 'object' ? CORE_GLOBAL_SCOPE : null;
  var candidates = [primaryScope];
  if (typeof globalThis !== 'undefined') candidates.push(globalThis);
  if (typeof window !== 'undefined') candidates.push(window);
  if (typeof self !== 'undefined') candidates.push(self);
  if (typeof global !== 'undefined') candidates.push(global);
  for (var index = 0; index < candidates.length; index += 1) {
    var resolver = readFromScope(candidates[index]);
    if (resolver) {
      return resolver;
    }
  }
  if (typeof require === 'function') {
    try {
      var requiredResolver = require('./modules/core/support-resolver.js');
      if (requiredResolver && _typeof(requiredResolver) === 'object') {
        return requiredResolver;
      }
    } catch (supportResolverRequireError) {
      void supportResolverRequireError;
    }
  }
  for (var secondIndex = 0; secondIndex < candidates.length; secondIndex += 1) {
    var resolverCandidate = readFromScope(candidates[secondIndex]);
    if (resolverCandidate) {
      return resolverCandidate;
    }
  }
  return null;
}();
var detectRuntimeScope = CORE_SUPPORT_RESOLVER && typeof CORE_SUPPORT_RESOLVER.detectRuntimeScope === 'function' ? CORE_SUPPORT_RESOLVER.detectRuntimeScope : fallbackDetectRuntimeScope;
var resolveSupportModuleFromResolver = CORE_SUPPORT_RESOLVER && typeof CORE_SUPPORT_RESOLVER.resolveCoreSupportModule === 'function' ? CORE_SUPPORT_RESOLVER.resolveCoreSupportModule : fallbackResolveCoreSupportModule;
var CORE_PART1_RUNTIME_SCOPE = detectRuntimeScope(typeof CORE_GLOBAL_SCOPE !== 'undefined' && _typeof(CORE_GLOBAL_SCOPE) === 'object' ? CORE_GLOBAL_SCOPE : null);
function resolveCoreSupportModule(namespaceName, requirePath) {
  return resolveSupportModuleFromResolver(namespaceName, requirePath, CORE_PART1_RUNTIME_SCOPE);
}
var CORE_RUNTIME_CANDIDATE_SCOPE_BRIDGE = resolveCoreSupportModule('cineCoreRuntimeCandidateScopes', './modules/core/runtime-candidate-scopes.js');
function fallbackCollectRuntimeCandidateScopes(primaryScope) {
  if (
    CORE_RUNTIME_SHARED &&
    typeof CORE_RUNTIME_SHARED.collectCandidateScopes === 'function'
  ) {
    try {
      var sharedScopes = CORE_RUNTIME_SHARED.collectCandidateScopes(primaryScope, CORE_ENVIRONMENT_HELPERS);
      if (Array.isArray(sharedScopes)) {
        return sharedScopes;
      }
    } catch (collectRuntimeScopesError) {
      void collectRuntimeScopesError;
    }
  }







function collectCoreRuntimeCandidateScopes(primaryScope) {
  if (
    CORE_RUNTIME_CANDIDATE_SCOPE_BRIDGE &&
    typeof CORE_RUNTIME_CANDIDATE_SCOPE_BRIDGE.collectCandidateScopesWithFallback === 'function'
  ) {
    try {
      return CORE_RUNTIME_CANDIDATE_SCOPE_BRIDGE.collectCandidateScopesWithFallback(primaryScope, CORE_RUNTIME_SHARED, CORE_ENVIRONMENT_HELPERS);
    } catch (collectCandidateScopesError) {
      void collectCandidateScopesError;
    }
  }

  return fallbackCollectRuntimeCandidateScopes(primaryScope);
}
  var primaryScope = typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && _typeof(CORE_GLOBAL_SCOPE) === 'object' ? CORE_GLOBAL_SCOPE : null;

  if (
    CORE_RUNTIME_CANDIDATE_SCOPE_BRIDGE &&
    typeof CORE_RUNTIME_CANDIDATE_SCOPE_BRIDGE.ensureCandidateScopes === 'function'
  ) {
    var options = {
      primaryScope: primaryScope,
      runtimeShared: CORE_RUNTIME_SHARED,
      environmentHelpers: CORE_ENVIRONMENT_HELPERS,
      currentCandidateScopes: typeof CORE_RUNTIME_CANDIDATE_SCOPES !== 'undefined' && CORE_RUNTIME_CANDIDATE_SCOPES && typeof CORE_RUNTIME_CANDIDATE_SCOPES.length === 'number' ? CORE_RUNTIME_CANDIDATE_SCOPES : null,
      globalScope: (typeof globalThis !== 'undefined' && globalThis) || (typeof window !== 'undefined' && window) || (typeof self !== 'undefined' && self) || (typeof global !== 'undefined' && global) || null,
      assignCurrentCandidateScopes: function assignCurrentCandidateScopes(value) {
        try {
          CORE_RUNTIME_CANDIDATE_SCOPES = value;
        } catch (candidateAssignError) {
          void candidateAssignError;
        }
      },
    };

    try {
      var ensuredScopes = CORE_RUNTIME_CANDIDATE_SCOPE_BRIDGE.ensureCandidateScopes(options);
      if (Array.isArray(ensuredScopes)) {
        return ensuredScopes;
      }
    } catch (ensureCandidateScopesError) {
      void ensureCandidateScopesError;
    }
  var resolvedScopes = null;

  if (
    CORE_RUNTIME_SHARED &&
    typeof CORE_RUNTIME_SHARED.resolveCandidateScopes === 'function'
  ) {
    try {
      resolvedScopes = CORE_RUNTIME_SHARED.resolveCandidateScopes(primaryScope, CORE_ENVIRONMENT_HELPERS);
    } catch (resolveCandidateScopesError) {
      void resolveCandidateScopesError;
      resolvedScopes = null;
    }
  }

  if (!resolvedScopes) {
    resolvedScopes = fallbackCollectRuntimeCandidateScopes(primaryScope);
  }

  if (
    CORE_RUNTIME_SHARED &&
    typeof CORE_RUNTIME_SHARED.syncCandidateScopes === 'function'
  ) {
    try {
      CORE_RUNTIME_SHARED.syncCandidateScopes(resolvedScopes, primaryScope, CORE_ENVIRONMENT_HELPERS);
      return resolvedScopes;
    } catch (syncCandidateScopesError) {
      void syncCandidateScopesError;
    }
  }

  return resolvedScopes;
}();
