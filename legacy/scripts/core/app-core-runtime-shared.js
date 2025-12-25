function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var CORE_RUNTIME_SHARED_NAMESPACE_TOOLS = function resolveRuntimeSharedNamespaceTools() {
  var runtimeScope = typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' && CORE_PART1_RUNTIME_SCOPE ? CORE_PART1_RUNTIME_SCOPE : null;
  var globalScope = typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : null;
  var fallbacks = [runtimeScope, globalScope, typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
  for (var index = 0; index < fallbacks.length; index += 1) {
    var scope = fallbacks[index];
    if (!scope || _typeof(scope) !== 'object') {
      continue;
    }
    try {
      var existing = scope.CORE_RUNTIME_SHARED_NAMESPACE_TOOLS;
      if (existing && _typeof(existing) === 'object') {
        return existing;
      }
    } catch (namespaceLookupError) {
      void namespaceLookupError;
    }
  }
  var resolved = resolveCoreSupportModule('cineCoreAppRuntimeSharedNamespace', './modules/app-core/runtime.js');
  var targets = [runtimeScope, globalScope];
  for (var _index = 0; _index < targets.length; _index += 1) {
    var target = targets[_index];
    if (!target || _typeof(target) !== 'object') {
      continue;
    }
    try {
      if (typeof target.CORE_RUNTIME_SHARED_NAMESPACE_TOOLS === 'undefined') {
        Object.defineProperty(target, 'CORE_RUNTIME_SHARED_NAMESPACE_TOOLS', {
          configurable: true,
          writable: true,
          value: resolved
        });
      }
    } catch (assignError) {
      try {
        target.CORE_RUNTIME_SHARED_NAMESPACE_TOOLS = resolved;
      } catch (fallbackAssignError) {
        void fallbackAssignError;
      }
      void assignError;
    }
  }
  return resolved;
}();
var RUNTIME_SHARED_BOOTSTRAP_TOOLS = resolveCoreSupportModule('cineCoreAppRuntimeSharedBootstrap', './modules/app-core/runtime.js');
var LOCALIZATION_ACCESSORS_TOOLS = resolveCoreSupportModule('cineCoreAppLocalizationAccessors', './modules/app-core/localization.js');
var RUNTIME_SHARED_BOOTSTRAP_INLINE_TOOLS = resolveCoreSupportModule('cineCoreAppRuntimeSharedBootstrapInline', './modules/app-core/runtime.js');
var RUNTIME_SHARED_BOOTSTRAP_RESULT_TOOLS = resolveCoreSupportModule('cineCoreAppRuntimeSharedBootstrapResult', './modules/app-core/runtime.js');
var RUNTIME_SHARED_BOOTSTRAP_LOADER_TOOLS = resolveCoreSupportModule('cineCoreAppRuntimeSharedBootstrapLoader', './modules/app-core/runtime.js');
var RUNTIME_SHARED_BOOTSTRAP_MANAGER_TOOLS = resolveCoreSupportModule('cineCoreAppRuntimeSharedBootstrapManager', './modules/app-core/runtime.js');
var RUNTIME_SHARED_BOOTSTRAP_RESOLVER_TOOLS = resolveCoreSupportModule('cineCoreAppRuntimeSharedBootstrapResolver', './modules/app-core/runtime.js');
var RUNTIME_SHARED_BOOTSTRAP_CONTEXT_TOOLS = resolveCoreSupportModule('cineCoreAppRuntimeSharedBootstrapContext', './modules/app-core/runtime.js');
var runtimeSharedBootstrapResult = function resolveRuntimeSharedBootstrapResult() {
  var runtimeScope = getDefaultRuntimeScope();
  var coreGlobalScope = getDefaultCoreGlobalScope();
  var requireFn = typeof require === 'function' ? require : null;
  var currentRuntimeShared = typeof CORE_RUNTIME_SHARED !== 'undefined' && CORE_RUNTIME_SHARED ? CORE_RUNTIME_SHARED : null;
  var fallbackScopes = collectBootstrapFallbackScopes({
    fallbackScopes: [],
    runtimeScope: runtimeScope,
    coreGlobalScope: coreGlobalScope
  });
  var bootstrapTools = RESOLVED_APP_CORE_BOOTSTRAP_TOOLS;
  var moduleOptions = {
    bootstrapTools: bootstrapTools,
    bootstrapFallbackTools: APP_CORE_BOOTSTRAP_FALLBACK_TOOLS,
    runtimeSharedBootstrapResolverTools: RUNTIME_SHARED_BOOTSTRAP_RESOLVER_TOOLS,
    runtimeSharedBootstrapTools: RUNTIME_SHARED_BOOTSTRAP_TOOLS,
    runtimeSharedNamespaceTools: CORE_RUNTIME_SHARED_NAMESPACE_TOOLS,
    runtimeSharedBootstrapInlineTools: RUNTIME_SHARED_BOOTSTRAP_INLINE_TOOLS,
    runtimeSharedBootstrapResultTools: RUNTIME_SHARED_BOOTSTRAP_RESULT_TOOLS,
    runtimeSharedBootstrapLoaderTools: RUNTIME_SHARED_BOOTSTRAP_LOADER_TOOLS,
    runtimeSharedBootstrapManagerTools: RUNTIME_SHARED_BOOTSTRAP_MANAGER_TOOLS,
    resolveCoreSupportModule: resolveCoreSupportModule,
    requireFn: requireFn,
    runtimeScope: runtimeScope,
    coreGlobalScope: coreGlobalScope,
    currentRuntimeShared: currentRuntimeShared,
    fallbackScopes: fallbackScopes,
    collectFallbackScopes: function collectFallbackScopes(scopes) {
      return collectBootstrapFallbackScopes({
        fallbackScopes: Array.isArray(scopes) ? scopes : [],
        runtimeScope: runtimeScope,
        coreGlobalScope: coreGlobalScope
      });
    },
    createInlineRuntimeSharedFallback: createInlineRuntimeSharedFallback,
    runtimeSharedBootstrapInlineRequirePath: null,
    runtimeSharedBootstrapResultRequirePath: null
  };
  if (APP_CORE_BOOTSTRAP_SUITE && typeof APP_CORE_BOOTSTRAP_SUITE.createRuntimeSharedBootstrapResult === 'function') {
    try {
      var suiteResolved = APP_CORE_BOOTSTRAP_SUITE.createRuntimeSharedBootstrapResult(moduleOptions);
      if (suiteResolved && _typeof(suiteResolved) === 'object') {
        return suiteResolved;
      }
    } catch (suiteRuntimeSharedResultError) {
      void suiteRuntimeSharedResultError;
    }
  }
  if (APP_CORE_BOOTSTRAP_RESULTS_TOOLS && typeof APP_CORE_BOOTSTRAP_RESULTS_TOOLS.resolveRuntimeSharedBootstrapResult === 'function') {
    try {
      var resolved = APP_CORE_BOOTSTRAP_RESULTS_TOOLS.resolveRuntimeSharedBootstrapResult(moduleOptions);
      if (resolved && _typeof(resolved) === 'object') {
        return resolved;
      }
    } catch (runtimeSharedBootstrapResultResolveError) {
      void runtimeSharedBootstrapResultResolveError;
    }
  }
  if (bootstrapTools && typeof bootstrapTools.createRuntimeSharedBootstrapResult === 'function') {
    try {
      var _resolved = bootstrapTools.createRuntimeSharedBootstrapResult(moduleOptions);
      if (_resolved && _typeof(_resolved) === 'object') {
        return _resolved;
      }
    } catch (runtimeSharedBootstrapError) {
      void runtimeSharedBootstrapError;
    }
  }
  if (bootstrapTools && typeof bootstrapTools.createRuntimeSharedBootstrapFallback === 'function') {
    try {
      var fallbackResult = bootstrapTools.createRuntimeSharedBootstrapFallback(moduleOptions);
      if (fallbackResult && _typeof(fallbackResult) === 'object') {
        return fallbackResult;
      }
    } catch (runtimeSharedBootstrapFallbackError) {
      void runtimeSharedBootstrapFallbackError;
    }
  }
  return createInlineRuntimeSharedFallback(moduleOptions);
}();
var CORE_RUNTIME_SHARED_NAMESPACE = runtimeSharedBootstrapResult && runtimeSharedBootstrapResult.runtimeSharedNamespace ? runtimeSharedBootstrapResult.runtimeSharedNamespace : null;
var CORE_RUNTIME_SHARED_RESOLVER = runtimeSharedBootstrapResult && typeof runtimeSharedBootstrapResult.runtimeSharedResolver === 'function' ? runtimeSharedBootstrapResult.runtimeSharedResolver : null;
var EXISTING_CORE_RUNTIME_SHARED = (runtimeSharedBootstrapResult && runtimeSharedBootstrapResult.existingRuntimeShared && _typeof(runtimeSharedBootstrapResult.existingRuntimeShared) === 'object' ? runtimeSharedBootstrapResult.existingRuntimeShared : null) || (typeof CORE_RUNTIME_SHARED !== 'undefined' && CORE_RUNTIME_SHARED ? CORE_RUNTIME_SHARED : null);
var fallbackResolveRuntimeSharedFromGlobal = runtimeSharedBootstrapResult && typeof runtimeSharedBootstrapResult.fallbackResolveRuntimeSharedFromGlobal === 'function' ? runtimeSharedBootstrapResult.fallbackResolveRuntimeSharedFromGlobal : function fallbackResolveRuntimeSharedFromGlobal() {
  return null;
};
var CORE_RUNTIME_SHARED = (runtimeSharedBootstrapResult && runtimeSharedBootstrapResult.runtimeShared && _typeof(runtimeSharedBootstrapResult.runtimeShared) === 'object' ? runtimeSharedBootstrapResult.runtimeShared : null) || (EXISTING_CORE_RUNTIME_SHARED && _typeof(EXISTING_CORE_RUNTIME_SHARED) === 'object' ? EXISTING_CORE_RUNTIME_SHARED : null) || (CORE_RUNTIME_SHARED_RESOLVER ? function resolveRuntimeSharedWithResolver() {
  try {
    var resolved = CORE_RUNTIME_SHARED_RESOLVER({
      currentShared: EXISTING_CORE_RUNTIME_SHARED,
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: typeof require === 'function' ? require : null,
      runtimeScope: typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' ? CORE_PART1_RUNTIME_SCOPE : null,
      coreGlobalScope: typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null
    });
    if (resolved && _typeof(resolved) === 'object') {
      return resolved;
    }
  } catch (runtimeSharedResolverError) {
    void runtimeSharedResolverError;
  }
  return null;
}() : null) || fallbackResolveRuntimeSharedFromGlobal() || Object.create(null);