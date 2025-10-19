function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var CORE_RUNTIME_CANDIDATE_SCOPE_BRIDGE = resolveCoreSupportModule('cineCoreRuntimeCandidateScopes', './modules/core/runtime-candidate-scopes.js');
var CORE_RUNTIME_CANDIDATE_SCOPE_SUPPORT_TOOLS = resolveCoreSupportModule('cineCoreAppRuntimeCandidateScopeSupport', './modules/app-core/runtime.js');
var resolveRuntimeCandidateScopeSupport = (CORE_RUNTIME_CANDIDATE_SCOPE_SUPPORT_TOOLS && typeof CORE_RUNTIME_CANDIDATE_SCOPE_SUPPORT_TOOLS.resolveRuntimeCandidateScopeSupport === 'function' ? CORE_RUNTIME_CANDIDATE_SCOPE_SUPPORT_TOOLS.resolveRuntimeCandidateScopeSupport : null) || function fallbackResolveRuntimeCandidateScopeSupport() {
  if (typeof require === 'function') {
    try {
      var required = require('./modules/app-core/runtime.js');
      if (required && typeof required.resolveRuntimeCandidateScopeSupport === 'function') {
        return required.resolveRuntimeCandidateScopeSupport;
      }
    } catch (runtimeCandidateScopeSupportError) {
      void runtimeCandidateScopeSupportError;
    }
  }
  var fallbackScopes = [typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' ? CORE_PART1_RUNTIME_SCOPE : null, typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null, typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
  for (var index = 0; index < fallbackScopes.length; index += 1) {
    var scope = fallbackScopes[index];
    if (!scope || _typeof(scope) !== 'object') {
      continue;
    }
    try {
      var candidate = scope.cineCoreAppRuntimeCandidateScopeSupport;
      if (candidate && typeof candidate.resolveRuntimeCandidateScopeSupport === 'function') {
        return candidate.resolveRuntimeCandidateScopeSupport;
      }
    } catch (candidateScopeSupportLookupError) {
      void candidateScopeSupportLookupError;
    }
  }
  return null;
}();
var createFallbackRuntimeCandidateScopeSupport = (CORE_RUNTIME_CANDIDATE_SCOPE_SUPPORT_TOOLS && typeof CORE_RUNTIME_CANDIDATE_SCOPE_SUPPORT_TOOLS.createFallbackRuntimeCandidateScopeSupport === 'function' ? CORE_RUNTIME_CANDIDATE_SCOPE_SUPPORT_TOOLS.createFallbackRuntimeCandidateScopeSupport : null) || function fallbackCreateRuntimeCandidateScopeSupport() {
  if (typeof require === 'function') {
    try {
      var required = require('./modules/app-core/runtime.js');
      if (required && typeof required.createFallbackRuntimeCandidateScopeSupport === 'function') {
        return required.createFallbackRuntimeCandidateScopeSupport;
      }
    } catch (runtimeCandidateScopeFallbackError) {
      void runtimeCandidateScopeFallbackError;
    }
  }
  var fallbackScopes = [typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' ? CORE_PART1_RUNTIME_SCOPE : null, typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null, typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
  for (var index = 0; index < fallbackScopes.length; index += 1) {
    var scope = fallbackScopes[index];
    if (!scope || _typeof(scope) !== 'object') {
      continue;
    }
    try {
      var candidate = scope.cineCoreAppRuntimeCandidateScopeSupport;
      if (candidate && typeof candidate.createFallbackRuntimeCandidateScopeSupport === 'function') {
        return candidate.createFallbackRuntimeCandidateScopeSupport;
      }
    } catch (candidateScopeFallbackLookupError) {
      void candidateScopeFallbackLookupError;
    }
  }
  return null;
}();
var RUNTIME_CANDIDATE_SCOPE_FALLBACK_TOOLS = resolveCoreSupportModule('cineCoreAppRuntimeCandidateScopeFallback', './modules/app-core/runtime.js');
var createRuntimeCandidateScopeSupportFallback = RUNTIME_CANDIDATE_SCOPE_FALLBACK_TOOLS && typeof RUNTIME_CANDIDATE_SCOPE_FALLBACK_TOOLS.createRuntimeCandidateScopeSupportFallback === 'function' ? RUNTIME_CANDIDATE_SCOPE_FALLBACK_TOOLS.createRuntimeCandidateScopeSupportFallback : function resolveRuntimeCandidateScopeFallbackFactory() {
  if (typeof require === 'function') {
    try {
      var requiredRuntimeCandidateScopeFallback = require('./modules/app-core/runtime.js');
      if (requiredRuntimeCandidateScopeFallback && typeof requiredRuntimeCandidateScopeFallback.createRuntimeCandidateScopeSupportFallback === 'function') {
        return requiredRuntimeCandidateScopeFallback.createRuntimeCandidateScopeSupportFallback;
      }
    } catch (runtimeCandidateScopeFallbackRequireError) {
      void runtimeCandidateScopeFallbackRequireError;
    }
  }
  return function runtimeCandidateScopeSupportFallbackFactory(options) {
    var fallbackSupport = {
      collectCandidateScopes: function collectCandidateScopes() {
        return [];
      },
      collectCandidateScopesWithFallback: function collectCandidateScopesWithFallback() {
        return [];
      },
      resolveCandidateScopes: function resolveCandidateScopes(resolveOptions) {
        var provided = resolveOptions && Array.isArray(resolveOptions.currentCandidateScopes) ? resolveOptions.currentCandidateScopes : null;
        return provided || [];
      },
      syncCandidateScopes: function syncCandidateScopes(candidateScopes, syncOptions) {
        var list = Array.isArray(candidateScopes) ? candidateScopes : [];
        var assignCandidateScopes = syncOptions && typeof syncOptions.assignCurrentCandidateScopes === 'function' ? syncOptions.assignCurrentCandidateScopes : options && typeof options.assignCurrentCandidateScopes === 'function' ? options.assignCurrentCandidateScopes : null;
        if (assignCandidateScopes) {
          try {
            assignCandidateScopes(list);
          } catch (assignCandidateScopesError) {
            void assignCandidateScopesError;
          }
        }
        return list;
      },
      ensureCandidateScopes: function ensureCandidateScopes(ensureOptions) {
        var ensureOptionsWithDefaults = ensureOptions || {};
        var resolved = fallbackSupport.resolveCandidateScopes(ensureOptionsWithDefaults);
        return fallbackSupport.syncCandidateScopes(resolved, ensureOptionsWithDefaults);
      }
    };
    return fallbackSupport;
  };
}();
var FALLBACK_RUNTIME_CANDIDATE_SCOPE_SUPPORT = typeof createFallbackRuntimeCandidateScopeSupport === 'function' ? createFallbackRuntimeCandidateScopeSupport({
  runtimeShared: CORE_RUNTIME_SHARED,
  environmentHelpers: CORE_ENVIRONMENT_HELPERS
}) : createRuntimeCandidateScopeSupportFallback({
  runtimeShared: CORE_RUNTIME_SHARED,
  environmentHelpers: CORE_ENVIRONMENT_HELPERS,
  candidateScopeBridge: CORE_RUNTIME_CANDIDATE_SCOPE_BRIDGE,
  corePartRuntimeScope: typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' ? CORE_PART1_RUNTIME_SCOPE : null,
  coreGlobalScope: typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null,
  assignCurrentCandidateScopes: function assignCurrentCandidateScopes(value) {
    try {
      CORE_RUNTIME_CANDIDATE_SCOPES = value;
    } catch (candidateAssignError) {
      void candidateAssignError;
    }
  }
});
var CORE_RUNTIME_CANDIDATE_SCOPE_SUPPORT = (typeof resolveRuntimeCandidateScopeSupport === 'function' ? resolveRuntimeCandidateScopeSupport({
  resolveCoreSupportModule: resolveCoreSupportModule,
  requireFn: typeof require === 'function' ? require : null,
  runtimeScope: typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' ? CORE_PART1_RUNTIME_SCOPE : null,
  coreGlobalScope: typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null,
  runtimeShared: CORE_RUNTIME_SHARED,
  environmentHelpers: CORE_ENVIRONMENT_HELPERS
}) : null) || FALLBACK_RUNTIME_CANDIDATE_SCOPE_SUPPORT;
var RUNTIME_CANDIDATE_SCOPE_RESOLVER_TOOLS = resolveCoreSupportModule('cineCoreAppRuntimeCandidateScopeResolvers', './modules/app-core/runtime.js');
var createRuntimeCandidateScopeResolvers = RUNTIME_CANDIDATE_SCOPE_RESOLVER_TOOLS && typeof RUNTIME_CANDIDATE_SCOPE_RESOLVER_TOOLS.createRuntimeCandidateScopeResolvers === 'function' ? RUNTIME_CANDIDATE_SCOPE_RESOLVER_TOOLS.createRuntimeCandidateScopeResolvers : function resolveRuntimeCandidateScopeResolversFactory() {
  if (typeof require === 'function') {
    try {
      var requiredRuntimeCandidateScopeResolvers = require('./modules/app-core/runtime.js');
      if (requiredRuntimeCandidateScopeResolvers && typeof requiredRuntimeCandidateScopeResolvers.createRuntimeCandidateScopeResolvers === 'function') {
        return requiredRuntimeCandidateScopeResolvers.createRuntimeCandidateScopeResolvers;
      }
    } catch (runtimeCandidateScopeResolversRequireError) {
      void runtimeCandidateScopeResolversRequireError;
    }
  }
  return null;
}();
function createInlineRuntimeCandidateScopeResolvers(resolverOptions) {
  var runtimeSupport = resolverOptions && resolverOptions.runtimeCandidateScopeSupport ? resolverOptions.runtimeCandidateScopeSupport : null;
  var fallbackSupport = resolverOptions && resolverOptions.fallbackRuntimeCandidateScopeSupport ? resolverOptions.fallbackRuntimeCandidateScopeSupport : null;
  function tryCollectWithSupport(support, primaryScope) {
    if (!support || typeof support.collectCandidateScopes !== 'function') {
      return null;
    }
    try {
      var collected = support.collectCandidateScopes(primaryScope);
      return Array.isArray(collected) ? collected : null;
    } catch (collectCandidateScopesError) {
      void collectCandidateScopesError;
    }
    return null;
  }
  function tryEnsureWithSupport(support, options) {
    if (!support || typeof support.ensureCandidateScopes !== 'function') {
      return null;
    }
    try {
      var ensured = support.ensureCandidateScopes(options);
      return Array.isArray(ensured) ? ensured : null;
    } catch (ensureCandidateScopesError) {
      void ensureCandidateScopesError;
    }
    return null;
  }
  function inlineCollectCoreRuntimeCandidateScopes(primaryScope) {
    var collected = tryCollectWithSupport(runtimeSupport, primaryScope);
    if (collected) {
      return collected;
    }
    var fallbackCollected = tryCollectWithSupport(fallbackSupport, primaryScope);
    if (fallbackCollected) {
      return fallbackCollected;
    }
    return [];
  }
  function inlineEnsureCoreRuntimeCandidateScopes(ensureOptions) {
    var options = ensureOptions && _typeof(ensureOptions) === 'object' ? ensureOptions : {};
    var ensured = tryEnsureWithSupport(runtimeSupport, options);
    if (ensured && ensured.length) {
      return ensured;
    }
    var fallbackEnsured = tryEnsureWithSupport(fallbackSupport, options);
    if (fallbackEnsured && fallbackEnsured.length) {
      return fallbackEnsured;
    }
    return inlineCollectCoreRuntimeCandidateScopes(options.primaryScope);
  }
  return {
    collectCoreRuntimeCandidateScopes: inlineCollectCoreRuntimeCandidateScopes,
    ensureCoreRuntimeCandidateScopes: inlineEnsureCoreRuntimeCandidateScopes
  };
}
var runtimeCandidateScopeResolvers = (typeof createRuntimeCandidateScopeResolvers === 'function' ? createRuntimeCandidateScopeResolvers({
  runtimeCandidateScopeSupport: CORE_RUNTIME_CANDIDATE_SCOPE_SUPPORT,
  fallbackRuntimeCandidateScopeSupport: FALLBACK_RUNTIME_CANDIDATE_SCOPE_SUPPORT
}) : null) || createInlineRuntimeCandidateScopeResolvers({
  runtimeCandidateScopeSupport: CORE_RUNTIME_CANDIDATE_SCOPE_SUPPORT,
  fallbackRuntimeCandidateScopeSupport: FALLBACK_RUNTIME_CANDIDATE_SCOPE_SUPPORT
});
var COLLECT_RUNTIME_CANDIDATE_SCOPES_GLOBAL_SCOPE = (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' && CORE_GLOBAL_SCOPE || typeof globalThis !== 'undefined' && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' && globalThis || typeof window !== 'undefined' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window || typeof self !== 'undefined' && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' && self || typeof global !== 'undefined' && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' && global || null;
var collectRuntimeCandidateScopesFromResolvers = runtimeCandidateScopeResolvers && typeof runtimeCandidateScopeResolvers.collectCoreRuntimeCandidateScopes === 'function' ? runtimeCandidateScopeResolvers.collectCoreRuntimeCandidateScopes : inlineCollectCoreRuntimeCandidateScopes;
var collectRuntimeCandidateScopesFromGlobal = COLLECT_RUNTIME_CANDIDATE_SCOPES_GLOBAL_SCOPE && typeof COLLECT_RUNTIME_CANDIDATE_SCOPES_GLOBAL_SCOPE.collectCoreRuntimeCandidateScopes === 'function' ? COLLECT_RUNTIME_CANDIDATE_SCOPES_GLOBAL_SCOPE.collectCoreRuntimeCandidateScopes : null;
var resolvedCollectCoreRuntimeCandidateScopes = collectRuntimeCandidateScopesFromGlobal || collectRuntimeCandidateScopesFromResolvers;
if (COLLECT_RUNTIME_CANDIDATE_SCOPES_GLOBAL_SCOPE && typeof COLLECT_RUNTIME_CANDIDATE_SCOPES_GLOBAL_SCOPE.collectCoreRuntimeCandidateScopes !== 'function') {
  COLLECT_RUNTIME_CANDIDATE_SCOPES_GLOBAL_SCOPE.collectCoreRuntimeCandidateScopes = resolvedCollectCoreRuntimeCandidateScopes;
}
var CORE_RUNTIME_CANDIDATE_SCOPES_RESOLVED = function ensureCoreRuntimeCandidateScopes() {
  var primaryScope = (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' ? CORE_GLOBAL_SCOPE : null;
  var ensureFn = runtimeCandidateScopeResolvers && typeof runtimeCandidateScopeResolvers.ensureCoreRuntimeCandidateScopes === 'function' ? runtimeCandidateScopeResolvers.ensureCoreRuntimeCandidateScopes : null;
  var ensureOptions = {
    primaryScope: primaryScope,
    currentCandidateScopes: typeof CORE_RUNTIME_CANDIDATE_SCOPES !== 'undefined' && CORE_RUNTIME_CANDIDATE_SCOPES && typeof CORE_RUNTIME_CANDIDATE_SCOPES.length === 'number' ? CORE_RUNTIME_CANDIDATE_SCOPES : null,
    globalScope: typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null,
    assignCurrentCandidateScopes: function assignCurrentCandidateScopes(value) {
      try {
        CORE_RUNTIME_CANDIDATE_SCOPES = value;
      } catch (candidateAssignError) {
        void candidateAssignError;
      }
    }
  };
  if (typeof ensureFn === 'function') {
    try {
      var ensuredScopes = ensureFn(ensureOptions);
      if (Array.isArray(ensuredScopes)) {
        return ensuredScopes;
      }
    } catch (ensureCandidateScopesError) {
      void ensureCandidateScopesError;
    }
  }
  return resolvedCollectCoreRuntimeCandidateScopes(primaryScope);
}();