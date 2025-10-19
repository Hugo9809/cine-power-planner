function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var APP_CORE_BOOTSTRAP_TOOLS = resolveCoreSupportModule('cineCoreAppCoreBootstrap', './modules/app-core/bootstrap.js');
var APP_CORE_LOCALIZATION_RUNTIME_TOOLS = resolveCoreSupportModule('cineCoreAppRuntimeLocalization', './modules/app-core/localization.js');
var APP_CORE_LOCALIZATION_SUPPORT_TOOLS = resolveCoreSupportModule('cineCoreAppLocalizationSupport', './modules/app-core/localization.js');
var APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS = resolveCoreSupportModule('cineCoreAppLocalizationBootstrap', './modules/app-core/localization.js');
var APP_CORE_BOOTSTRAP_RESOLVER_DIRECT = resolveCoreSupportModule('cineCoreAppCoreBootstrapResolver', './modules/app-core/bootstrap.js');
var APP_CORE_BOOTSTRAP_FALLBACK_DIRECT = resolveCoreSupportModule('cineCoreAppCoreBootstrapFallbacks', './modules/app-core/bootstrap.js');
var APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS_DIRECT = resolveCoreSupportModule('cineCoreAppCoreBootstrapEnvironment', './modules/app-core/bootstrap.js');
var APP_CORE_BOOTSTRAP_RESULTS_TOOLS_DIRECT = resolveCoreSupportModule('cineCoreAppCoreBootstrapResults', './modules/app-core/bootstrap.js');
var APP_CORE_BOOTSTRAP_SUITE = APP_CORE_BOOTSTRAP_TOOLS && typeof APP_CORE_BOOTSTRAP_TOOLS.createBootstrapSuite === 'function' ? APP_CORE_BOOTSTRAP_TOOLS.createBootstrapSuite({
  directResolverNamespace: APP_CORE_BOOTSTRAP_RESOLVER_DIRECT,
  directBootstrapNamespace: APP_CORE_BOOTSTRAP_TOOLS,
  directBootstrapFallbackNamespace: APP_CORE_BOOTSTRAP_FALLBACK_DIRECT,
  directBootstrapEnvironmentNamespace: APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS_DIRECT,
  directBootstrapResultsNamespace: APP_CORE_BOOTSTRAP_RESULTS_TOOLS_DIRECT,
  resolveCoreSupportModule: resolveCoreSupportModule,
  requireFn: typeof require === 'function' ? require : null,
  runtimeScope: getDefaultRuntimeScope(),
  coreGlobalScope: getDefaultCoreGlobalScope()
}) : null;
var APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS = APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapEnvironmentTools || APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS_DIRECT || null;
var APP_CORE_BOOTSTRAP_RESULTS_TOOLS = APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapResultsTools || APP_CORE_BOOTSTRAP_RESULTS_TOOLS_DIRECT || null;
function getDefaultRuntimeScope() {
  return typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' && CORE_PART1_RUNTIME_SCOPE ? CORE_PART1_RUNTIME_SCOPE : null;
}
function getDefaultCoreGlobalScope() {
  return typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : null;
}
var APP_CORE_BOOTSTRAP_ENVIRONMENT = APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapEnvironment || (APP_CORE_BOOTSTRAP_SUITE && typeof APP_CORE_BOOTSTRAP_SUITE.createBootstrapEnvironment === 'function' ? APP_CORE_BOOTSTRAP_SUITE.createBootstrapEnvironment({
  directResolverNamespace: APP_CORE_BOOTSTRAP_RESOLVER_DIRECT,
  directBootstrapNamespace: APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapTools || APP_CORE_BOOTSTRAP_TOOLS,
  directBootstrapFallbackNamespace: APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapFallbackTools || APP_CORE_BOOTSTRAP_FALLBACK_DIRECT,
  resolveCoreSupportModule: resolveCoreSupportModule,
  requireFn: typeof require === 'function' ? require : null,
  runtimeScope: getDefaultRuntimeScope(),
  coreGlobalScope: getDefaultCoreGlobalScope()
}) : null) || (APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS && typeof APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS.createBootstrapEnvironment === 'function' ? APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS.createBootstrapEnvironment({
  directResolverNamespace: APP_CORE_BOOTSTRAP_RESOLVER_DIRECT,
  directBootstrapNamespace: APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapTools || APP_CORE_BOOTSTRAP_TOOLS,
  directBootstrapFallbackNamespace: APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapFallbackTools || APP_CORE_BOOTSTRAP_FALLBACK_DIRECT,
  resolveCoreSupportModule: resolveCoreSupportModule,
  requireFn: typeof require === 'function' ? require : null,
  runtimeScope: getDefaultRuntimeScope(),
  coreGlobalScope: getDefaultCoreGlobalScope()
}) : null);
var APP_CORE_BOOTSTRAP_RESOLVER_TOOLS = APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapEnvironment && APP_CORE_BOOTSTRAP_SUITE.bootstrapEnvironment.bootstrapResolverTools || APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapResolverTools || APP_CORE_BOOTSTRAP_RESOLVER_DIRECT || null;
var RESOLVED_APP_CORE_BOOTSTRAP_TOOLS = APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapTools || APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapTools || APP_CORE_BOOTSTRAP_TOOLS || null;
var APP_CORE_BOOTSTRAP_FALLBACK_TOOLS = APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapFallbackTools || APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapFallbackTools || APP_CORE_BOOTSTRAP_FALLBACK_DIRECT || null;
function buildBaseBootstrapInvocationOptions() {
  return {
    resolveCoreSupportModule: resolveCoreSupportModule,
    requireFn: typeof require === 'function' ? require : null,
    runtimeScope: getDefaultRuntimeScope(),
    coreGlobalScope: getDefaultCoreGlobalScope(),
    bootstrapSuite: APP_CORE_BOOTSTRAP_SUITE,
    bootstrapEnvironment: APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapEnvironment || APP_CORE_BOOTSTRAP_ENVIRONMENT || null,
    bootstrapEnvironmentTools: APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapEnvironmentTools || APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS || APP_CORE_BOOTSTRAP_ENVIRONMENT || null,
    bootstrapResultsTools: APP_CORE_BOOTSTRAP_RESULTS_TOOLS,
    bootstrapResolverTools: APP_CORE_BOOTSTRAP_RESOLVER_TOOLS,
    bootstrapFallbackTools: APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapFallbackTools || APP_CORE_BOOTSTRAP_FALLBACK_TOOLS || null,
    fallbackTools: APP_CORE_BOOTSTRAP_FALLBACK_TOOLS,
    directBootstrapNamespace: APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapTools || RESOLVED_APP_CORE_BOOTSTRAP_TOOLS || APP_CORE_BOOTSTRAP_TOOLS || null,
    directBootstrapFallbackNamespace: APP_CORE_BOOTSTRAP_FALLBACK_DIRECT,
    directBootstrapEnvironmentNamespace: APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS_DIRECT,
    directBootstrapResultsNamespace: APP_CORE_BOOTSTRAP_RESULTS_TOOLS_DIRECT
  };
}
var BOOTSTRAP_INVOCATION_NORMALIZER = APP_CORE_BOOTSTRAP_TOOLS && typeof APP_CORE_BOOTSTRAP_TOOLS.normalizeBootstrapInvocationOptions === 'function' ? APP_CORE_BOOTSTRAP_TOOLS.normalizeBootstrapInvocationOptions : null;
var BOOTSTRAP_FALLBACK_COLLECTOR = APP_CORE_BOOTSTRAP_TOOLS && typeof APP_CORE_BOOTSTRAP_TOOLS.collectBootstrapFallbackScopes === 'function' ? APP_CORE_BOOTSTRAP_TOOLS.collectBootstrapFallbackScopes : null;
var BOOTSTRAP_INLINE_LOCALIZATION_CREATOR = APP_CORE_BOOTSTRAP_TOOLS && typeof APP_CORE_BOOTSTRAP_TOOLS.createInlineLocalizationFallback === 'function' ? APP_CORE_BOOTSTRAP_TOOLS.createInlineLocalizationFallback : null;
var BOOTSTRAP_INLINE_RUNTIME_CREATOR = APP_CORE_BOOTSTRAP_TOOLS && typeof APP_CORE_BOOTSTRAP_TOOLS.createInlineRuntimeSharedFallback === 'function' ? APP_CORE_BOOTSTRAP_TOOLS.createInlineRuntimeSharedFallback : null;
function normalizeBootstrapInvocationOptions(extraOptions) {
  var baseOptions = buildBaseBootstrapInvocationOptions();
  if (typeof BOOTSTRAP_INVOCATION_NORMALIZER === 'function') {
    try {
      return BOOTSTRAP_INVOCATION_NORMALIZER(baseOptions, extraOptions);
    } catch (bootstrapNormalizeError) {
      void bootstrapNormalizeError;
    }
  }
  var normalized = Object.assign({}, baseOptions);
  normalized.fallbackScopes = [];
  if (Array.isArray(extraOptions)) {
    normalized.fallbackScopes = extraOptions.slice();
    return normalized;
  }
  if (extraOptions && _typeof(extraOptions) === 'object') {
    if (Array.isArray(extraOptions.fallbackScopes)) {
      normalized.fallbackScopes = extraOptions.fallbackScopes.slice();
    } else if (extraOptions.fallbackScopes) {
      normalized.fallbackScopes = [extraOptions.fallbackScopes];
    }
    if (extraOptions.runtimeScope && _typeof(extraOptions.runtimeScope) === 'object') {
      normalized.runtimeScope = extraOptions.runtimeScope;
    }
    if (extraOptions.coreGlobalScope && _typeof(extraOptions.coreGlobalScope) === 'object') {
      normalized.coreGlobalScope = extraOptions.coreGlobalScope;
    }
    var keys = Object.keys(extraOptions);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      if (key === 'fallbackScopes' || key === 'runtimeScope' || key === 'coreGlobalScope') {
        continue;
      }
      normalized[key] = extraOptions[key];
    }
  }
  if (!Array.isArray(normalized.fallbackScopes)) {
    normalized.fallbackScopes = [];
  }
  return normalized;
}
function collectBootstrapFallbackScopes(extraScopes) {
  var invocationOptions = normalizeBootstrapInvocationOptions(extraScopes);
  if (typeof BOOTSTRAP_FALLBACK_COLLECTOR === 'function') {
    try {
      var collected = BOOTSTRAP_FALLBACK_COLLECTOR(invocationOptions);
      if (Array.isArray(collected)) {
        return collected;
      }
    } catch (bootstrapCollectorError) {
      void bootstrapCollectorError;
    }
  }
  if (APP_CORE_BOOTSTRAP_SUITE && typeof APP_CORE_BOOTSTRAP_SUITE.collectBootstrapFallbackScopes === 'function') {
    try {
      var suiteCollected = APP_CORE_BOOTSTRAP_SUITE.collectBootstrapFallbackScopes(invocationOptions);
      if (Array.isArray(suiteCollected)) {
        return suiteCollected;
      }
    } catch (bootstrapSuiteCollectError) {
      void bootstrapSuiteCollectError;
    }
  }
  var bootstrapTools = APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapTools || APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapTools || RESOLVED_APP_CORE_BOOTSTRAP_TOOLS || APP_CORE_BOOTSTRAP_TOOLS || null;
  if (bootstrapTools && typeof bootstrapTools.collectBootstrapFallbackScopes === 'function') {
    try {
      var _collected = bootstrapTools.collectBootstrapFallbackScopes(invocationOptions);
      if (Array.isArray(_collected)) {
        return _collected;
      }
    } catch (bootstrapCollectError) {
      void bootstrapCollectError;
    }
  }
  var fallbackScopes = Array.isArray(invocationOptions.fallbackScopes) ? invocationOptions.fallbackScopes.slice() : [];
  function enqueue(scope) {
    if (!scope || _typeof(scope) !== 'object') {
      return;
    }
    if (fallbackScopes.indexOf(scope) === -1) {
      fallbackScopes.push(scope);
    }
  }
  enqueue(invocationOptions.runtimeScope);
  enqueue(invocationOptions.coreGlobalScope);
  enqueue(typeof globalThis !== 'undefined' ? globalThis : null);
  enqueue(typeof window !== 'undefined' ? window : null);
  enqueue(typeof self !== 'undefined' ? self : null);
  enqueue(typeof global !== 'undefined' ? global : null);
  return fallbackScopes;
}
function createInlineLocalizationFallback(options) {
  var invocationOptions = normalizeBootstrapInvocationOptions(options && _typeof(options) === 'object' ? options : null);
  if (typeof BOOTSTRAP_INLINE_LOCALIZATION_CREATOR === 'function') {
    try {
      var inlineResult = BOOTSTRAP_INLINE_LOCALIZATION_CREATOR(invocationOptions);
      if (inlineResult && _typeof(inlineResult) === 'object') {
        return inlineResult;
      }
    } catch (bootstrapInlineLocalizationError) {
      void bootstrapInlineLocalizationError;
    }
  }
  if (APP_CORE_BOOTSTRAP_SUITE && typeof APP_CORE_BOOTSTRAP_SUITE.createInlineLocalizationFallback === 'function') {
    try {
      var suiteInline = APP_CORE_BOOTSTRAP_SUITE.createInlineLocalizationFallback(invocationOptions);
      if (suiteInline && _typeof(suiteInline) === 'object') {
        return suiteInline;
      }
    } catch (suiteInlineError) {
      void suiteInlineError;
    }
  }
  if (APP_CORE_BOOTSTRAP_ENVIRONMENT && typeof APP_CORE_BOOTSTRAP_ENVIRONMENT.createInlineLocalizationFallback === 'function') {
    try {
      var environmentInline = APP_CORE_BOOTSTRAP_ENVIRONMENT.createInlineLocalizationFallback(invocationOptions);
      if (environmentInline && _typeof(environmentInline) === 'object') {
        return environmentInline;
      }
    } catch (environmentInlineError) {
      void environmentInlineError;
    }
  }
  var bootstrapTools = APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapTools || APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapTools || RESOLVED_APP_CORE_BOOTSTRAP_TOOLS || APP_CORE_BOOTSTRAP_TOOLS || null;
  if (bootstrapTools && typeof bootstrapTools.createInlineLocalizationFallback === 'function') {
    try {
      var bootstrapInline = bootstrapTools.createInlineLocalizationFallback(invocationOptions);
      if (bootstrapInline && _typeof(bootstrapInline) === 'object') {
        return bootstrapInline;
      }
    } catch (bootstrapInlineError) {
      void bootstrapInlineError;
    }
  }
  var fallbackTools = invocationOptions.bootstrapFallbackTools || APP_CORE_BOOTSTRAP_FALLBACK_TOOLS || null;
  if (fallbackTools && typeof fallbackTools.createLocalizationBootstrapFallback === 'function') {
    try {
      var fallbackResult = fallbackTools.createLocalizationBootstrapFallback(invocationOptions);
      if (fallbackResult && _typeof(fallbackResult) === 'object') {
        return fallbackResult;
      }
    } catch (fallbackError) {
      void fallbackError;
    }
  }
  if (APP_CORE_BOOTSTRAP_RESULTS_TOOLS && typeof APP_CORE_BOOTSTRAP_RESULTS_TOOLS.createLocalizationFallbackSkeleton === 'function') {
    try {
      var skeleton = APP_CORE_BOOTSTRAP_RESULTS_TOOLS.createLocalizationFallbackSkeleton();
      if (skeleton && _typeof(skeleton) === 'object') {
        return skeleton;
      }
    } catch (localizationSkeletonError) {
      void localizationSkeletonError;
    }
  }
  if (APP_CORE_BOOTSTRAP_TOOLS && typeof APP_CORE_BOOTSTRAP_TOOLS.createLocalizationBootstrapFallback === 'function') {
    try {
      var bootstrapFallback = APP_CORE_BOOTSTRAP_TOOLS.createLocalizationBootstrapFallback();
      if (bootstrapFallback && _typeof(bootstrapFallback) === 'object') {
        return bootstrapFallback;
      }
    } catch (bootstrapFallbackError) {
      void bootstrapFallbackError;
    }
  }
  return {
    localizationSupport: null,
    localizationRuntimeEnvironment: null,
    localizationBridge: null,
    localizationFallbacks: null,
    inlineLocalizationFallbacks: null,
    localizationFallbackSupport: null,
    createBasicLocalizationFallbackResolvers: function createBasicLocalizationFallbackResolvers() {
      return null;
    },
    localizationFallbackRegistry: {
      createFallbackResolvers: function createFallbackResolvers() {
        return null;
      }
    },
    localizationFallbackResolvers: null,
    localizationFallbackNamespace: null,
    fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
      return null;
    },
    createLocaleFallbacks: function createLocaleFallbacks() {
      return null;
    }
  };
}
function createInlineRuntimeSharedFallback(options) {
  var invocationOptions = normalizeBootstrapInvocationOptions(options && _typeof(options) === 'object' ? options : null);
  if (typeof BOOTSTRAP_INLINE_RUNTIME_CREATOR === 'function') {
    try {
      var inlineResult = BOOTSTRAP_INLINE_RUNTIME_CREATOR(invocationOptions);
      if (inlineResult && _typeof(inlineResult) === 'object') {
        return inlineResult;
      }
    } catch (bootstrapRuntimeInlineError) {
      void bootstrapRuntimeInlineError;
    }
  }
  if (APP_CORE_BOOTSTRAP_SUITE && typeof APP_CORE_BOOTSTRAP_SUITE.createInlineRuntimeSharedFallback === 'function') {
    try {
      var suiteInline = APP_CORE_BOOTSTRAP_SUITE.createInlineRuntimeSharedFallback(invocationOptions);
      if (suiteInline && _typeof(suiteInline) === 'object') {
        return suiteInline;
      }
    } catch (suiteRuntimeSharedInlineError) {
      void suiteRuntimeSharedInlineError;
    }
  }
  if (APP_CORE_BOOTSTRAP_ENVIRONMENT && typeof APP_CORE_BOOTSTRAP_ENVIRONMENT.createInlineRuntimeSharedFallback === 'function') {
    try {
      var environmentInline = APP_CORE_BOOTSTRAP_ENVIRONMENT.createInlineRuntimeSharedFallback(invocationOptions);
      if (environmentInline && _typeof(environmentInline) === 'object') {
        return environmentInline;
      }
    } catch (environmentRuntimeSharedError) {
      void environmentRuntimeSharedError;
    }
  }
  var bootstrapTools = APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapTools || APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapTools || RESOLVED_APP_CORE_BOOTSTRAP_TOOLS || APP_CORE_BOOTSTRAP_TOOLS || null;
  if (bootstrapTools && typeof bootstrapTools.createInlineRuntimeSharedFallback === 'function') {
    try {
      var bootstrapInline = bootstrapTools.createInlineRuntimeSharedFallback(invocationOptions);
      if (bootstrapInline && _typeof(bootstrapInline) === 'object') {
        return bootstrapInline;
      }
    } catch (bootstrapRuntimeSharedError) {
      void bootstrapRuntimeSharedError;
    }
  }
  var fallbackTools = invocationOptions.bootstrapFallbackTools || APP_CORE_BOOTSTRAP_FALLBACK_TOOLS || null;
  if (fallbackTools && typeof fallbackTools.createRuntimeSharedBootstrapFallback === 'function') {
    try {
      var fallbackResult = fallbackTools.createRuntimeSharedBootstrapFallback(invocationOptions);
      if (fallbackResult && _typeof(fallbackResult) === 'object') {
        return fallbackResult;
      }
    } catch (fallbackRuntimeSharedError) {
      void fallbackRuntimeSharedError;
    }
  }
  if (APP_CORE_BOOTSTRAP_RESULTS_TOOLS && typeof APP_CORE_BOOTSTRAP_RESULTS_TOOLS.createRuntimeSharedFallbackSkeleton === 'function') {
    try {
      var skeleton = APP_CORE_BOOTSTRAP_RESULTS_TOOLS.createRuntimeSharedFallbackSkeleton({
        runtimeScope: invocationOptions.runtimeScope,
        coreGlobalScope: invocationOptions.coreGlobalScope,
        fallbackScopes: invocationOptions.fallbackScopes,
        currentRuntimeShared: invocationOptions.currentRuntimeShared && _typeof(invocationOptions.currentRuntimeShared) === 'object' ? invocationOptions.currentRuntimeShared : null
      });
      if (skeleton && _typeof(skeleton) === 'object') {
        return skeleton;
      }
    } catch (runtimeSharedSkeletonError) {
      void runtimeSharedSkeletonError;
    }
  }
  if (APP_CORE_BOOTSTRAP_TOOLS && typeof APP_CORE_BOOTSTRAP_TOOLS.createRuntimeSharedBootstrapFallback === 'function') {
    try {
      var bootstrapFallback = APP_CORE_BOOTSTRAP_TOOLS.createRuntimeSharedBootstrapFallback(invocationOptions);
      if (bootstrapFallback && _typeof(bootstrapFallback) === 'object') {
        return bootstrapFallback;
      }
    } catch (bootstrapRuntimeSharedFallbackError) {
      void bootstrapRuntimeSharedFallbackError;
    }
  }
  var fallbackScopes = Array.isArray(invocationOptions.fallbackScopes) ? invocationOptions.fallbackScopes : [];
  function fallbackResolveRuntimeSharedFromGlobal() {
    for (var index = 0; index < fallbackScopes.length; index += 1) {
      var scope = fallbackScopes[index];
      if (!scope || _typeof(scope) !== 'object') {
        continue;
      }
      try {
        var candidate = scope.cineCoreRuntimeShared;
        if (candidate && _typeof(candidate) === 'object') {
          return candidate;
        }
      } catch (runtimeSharedLookupError) {
        void runtimeSharedLookupError;
      }
    }
    return null;
  }
  var runtimeShared = invocationOptions.currentRuntimeShared && _typeof(invocationOptions.currentRuntimeShared) === 'object' ? invocationOptions.currentRuntimeShared : null;
  if (!runtimeShared) {
    runtimeShared = fallbackResolveRuntimeSharedFromGlobal();
  }
  if (!runtimeShared || _typeof(runtimeShared) !== 'object') {
    try {
      runtimeShared = Object.create(null);
    } catch (runtimeSharedCreationError) {
      void runtimeSharedCreationError;
      runtimeShared = {};
    }
  }
  return {
    runtimeSharedNamespace: null,
    runtimeSharedResolver: null,
    existingRuntimeShared: runtimeShared,
    runtimeShared: runtimeShared,
    fallbackResolveRuntimeSharedFromGlobal: fallbackResolveRuntimeSharedFromGlobal
  };
}
var localizationBootstrapResult = function resolveLocalizationBootstrapResult() {
  var runtimeScope = getDefaultRuntimeScope();
  var coreGlobalScope = getDefaultCoreGlobalScope();
  var requireFn = typeof require === 'function' ? require : null;
  var fallbackScopes = collectBootstrapFallbackScopes({
    fallbackScopes: [],
    runtimeScope: runtimeScope,
    coreGlobalScope: coreGlobalScope
  });
  var bootstrapTools = RESOLVED_APP_CORE_BOOTSTRAP_TOOLS;
  var moduleOptions = {
    bootstrapTools: bootstrapTools,
    bootstrapFallbackTools: APP_CORE_BOOTSTRAP_FALLBACK_TOOLS,
    localizationSupportTools: APP_CORE_LOCALIZATION_SUPPORT_TOOLS,
    localizationBootstrapTools: APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS,
    localizationRuntimeTools: APP_CORE_LOCALIZATION_RUNTIME_TOOLS,
    resolveCoreSupportModule: resolveCoreSupportModule,
    requireFn: requireFn,
    runtimeScope: runtimeScope,
    coreGlobalScope: coreGlobalScope,
    fallbackScopes: fallbackScopes,
    collectFallbackScopes: function collectFallbackScopes(scopes) {
      return collectBootstrapFallbackScopes({
        fallbackScopes: Array.isArray(scopes) ? scopes : [],
        runtimeScope: runtimeScope,
        coreGlobalScope: coreGlobalScope
      });
    },
    createInlineLocalizationFallback: createInlineLocalizationFallback,
    localizationFallbackOptions: null,
    currentLocalization: null
  };
  if (APP_CORE_BOOTSTRAP_SUITE && typeof APP_CORE_BOOTSTRAP_SUITE.createLocalizationBootstrapResult === 'function') {
    try {
      var suiteResolved = APP_CORE_BOOTSTRAP_SUITE.createLocalizationBootstrapResult(moduleOptions);
      if (suiteResolved && _typeof(suiteResolved) === 'object') {
        return suiteResolved;
      }
    } catch (suiteLocalizationBootstrapError) {
      void suiteLocalizationBootstrapError;
    }
  }
  if (APP_CORE_BOOTSTRAP_RESULTS_TOOLS && typeof APP_CORE_BOOTSTRAP_RESULTS_TOOLS.resolveLocalizationBootstrapResult === 'function') {
    try {
      var resolved = APP_CORE_BOOTSTRAP_RESULTS_TOOLS.resolveLocalizationBootstrapResult(moduleOptions);
      if (resolved && _typeof(resolved) === 'object') {
        return resolved;
      }
    } catch (bootstrapResultResolveError) {
      void bootstrapResultResolveError;
    }
  }
  if (bootstrapTools && typeof bootstrapTools.createLocalizationBootstrapResult === 'function') {
    try {
      var _resolved = bootstrapTools.createLocalizationBootstrapResult(moduleOptions);
      if (_resolved && _typeof(_resolved) === 'object') {
        return _resolved;
      }
    } catch (localizationBootstrapError) {
      void localizationBootstrapError;
    }
  }
  if (bootstrapTools && typeof bootstrapTools.createLocalizationBootstrapFallback === 'function') {
    try {
      var fallbackResult = bootstrapTools.createLocalizationBootstrapFallback(moduleOptions);
      if (fallbackResult && _typeof(fallbackResult) === 'object') {
        return fallbackResult;
      }
    } catch (localizationBootstrapFallbackError) {
      void localizationBootstrapFallbackError;
    }
  }
  return createInlineLocalizationFallback(moduleOptions);
}();
function inlineLocalizationBootstrapWiring(bootstrapResult) {
  var localizationSupport = bootstrapResult && bootstrapResult.localizationSupport ? bootstrapResult.localizationSupport : null;
  var localizationRuntimeEnvironment = bootstrapResult && bootstrapResult.localizationRuntimeEnvironment ? bootstrapResult.localizationRuntimeEnvironment : null;
  var localizationBridge = bootstrapResult && bootstrapResult.localizationBridge ? bootstrapResult.localizationBridge : null;
  var localizationFallbacks = bootstrapResult && bootstrapResult.localizationFallbacks ? bootstrapResult.localizationFallbacks : null;
  var inlineLocalizationFallbacks = bootstrapResult && bootstrapResult.inlineLocalizationFallbacks ? bootstrapResult.inlineLocalizationFallbacks : null;
  var localizationFallbackSupport = bootstrapResult && typeof bootstrapResult.localizationFallbackSupport !== 'undefined' ? bootstrapResult.localizationFallbackSupport : null;
  var createBasicLocalizationFallbackResolvers = bootstrapResult && typeof bootstrapResult.createBasicLocalizationFallbackResolvers === 'function' ? bootstrapResult.createBasicLocalizationFallbackResolvers : function createBasicLocalizationFallbackResolversProxy() {
    return null;
  };
  var localizationFallbackRegistry = bootstrapResult && bootstrapResult.localizationFallbackRegistry ? bootstrapResult.localizationFallbackRegistry : {
    createFallbackResolvers: function createFallbackResolvers(fallbackOptions) {
      return createBasicLocalizationFallbackResolvers(fallbackOptions);
    }
  };
  var localizationFallbackResolvers = bootstrapResult && bootstrapResult.localizationFallbackResolvers ? bootstrapResult.localizationFallbackResolvers : localizationFallbackRegistry && typeof localizationFallbackRegistry.createFallbackResolvers === 'function' ? localizationFallbackRegistry.createFallbackResolvers({
    directNamespace: localizationFallbacks,
    inlineNamespace: inlineLocalizationFallbacks
  }) : createBasicLocalizationFallbackResolvers({
    directNamespace: localizationFallbacks,
    inlineNamespace: inlineLocalizationFallbacks
  });
  var localizationFallbackNamespace = bootstrapResult && typeof bootstrapResult.localizationFallbackNamespace !== 'undefined' ? bootstrapResult.localizationFallbackNamespace : null;
  var fallbackResolveLocaleModule = bootstrapResult && typeof bootstrapResult.fallbackResolveLocaleModule === 'function' ? bootstrapResult.fallbackResolveLocaleModule : function fallbackResolveLocaleModuleProxy() {
    return null;
  };
  var createLocaleFallbacks = bootstrapResult && typeof bootstrapResult.createLocaleFallbacks === 'function' ? bootstrapResult.createLocaleFallbacks : function createLocaleFallbacksProxy() {
    return null;
  };
  return {
    localizationBootstrapResult: bootstrapResult && _typeof(bootstrapResult) === 'object' ? bootstrapResult : null,
    localizationSupport: localizationSupport,
    localizationRuntimeEnvironment: localizationRuntimeEnvironment,
    localizationBridge: localizationBridge,
    localizationFallbacks: localizationFallbacks,
    inlineLocalizationFallbacks: inlineLocalizationFallbacks,
    localizationFallbackSupport: localizationFallbackSupport,
    createBasicLocalizationFallbackResolvers: createBasicLocalizationFallbackResolvers,
    localizationFallbackRegistry: localizationFallbackRegistry,
    localizationFallbackResolvers: localizationFallbackResolvers,
    localizationFallbackNamespace: localizationFallbackNamespace,
    fallbackResolveLocaleModule: fallbackResolveLocaleModule,
    createLocaleFallbacks: createLocaleFallbacks
  };
}
var localizationBootstrapWiring = APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS && typeof APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS.createLocalizationBootstrapWiring === 'function' && APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS.createLocalizationBootstrapWiring({
  localizationBootstrapResult: localizationBootstrapResult
}) || inlineLocalizationBootstrapWiring(localizationBootstrapResult);