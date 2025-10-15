/* global CORE_PART1_RUNTIME_SCOPE, CORE_GLOBAL_SCOPE, resolveCoreSupportModule */
/*
 * Cine Power Planner localisation bridge (legacy bundle).
 *
 * Provides the same localisation bootstrap orchestration as the modern bridge
 * using ES5 syntax for the legacy distribution.
 */

var bootstrapBridge = null;

if (typeof require === 'function') {
  try {
    bootstrapBridge = require('./app-core-bootstrap-bridge.js');
  } catch (bootstrapBridgeRequireError) {
    void bootstrapBridgeRequireError;
  }
}

if (!bootstrapBridge) {
  var scopeCandidate =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global) ||
    null;

  if (scopeCandidate && scopeCandidate.CINE_CORE_APP_CORE_BOOTSTRAP_BRIDGE) {
    bootstrapBridge = scopeCandidate.CINE_CORE_APP_CORE_BOOTSTRAP_BRIDGE;
  }
}

function defaultGetDefaultRuntimeScope() {
  return typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' && CORE_PART1_RUNTIME_SCOPE
    ? CORE_PART1_RUNTIME_SCOPE
    : null;
}

function defaultGetDefaultCoreGlobalScope() {
  return typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : null;
}

function defaultCollectBootstrapFallbackScopes(options) {
  var collect = bootstrapBridge && typeof bootstrapBridge.collectBootstrapFallbackScopes === 'function'
    ? bootstrapBridge.collectBootstrapFallbackScopes
    : null;

  if (collect) {
    return collect(options);
  }

  var fallbackScopes = [];

  if (options && Array.isArray(options.fallbackScopes)) {
    for (var index = 0; index < options.fallbackScopes.length; index += 1) {
      fallbackScopes.push(options.fallbackScopes[index]);
    }
  }

  var runtimeScope = options && options.runtimeScope ? options.runtimeScope : defaultGetDefaultRuntimeScope();
  var coreGlobalScope = options && options.coreGlobalScope ? options.coreGlobalScope : defaultGetDefaultCoreGlobalScope();

  if (runtimeScope && fallbackScopes.indexOf(runtimeScope) === -1) {
    fallbackScopes.push(runtimeScope);
  }

  if (coreGlobalScope && fallbackScopes.indexOf(coreGlobalScope) === -1) {
    fallbackScopes.push(coreGlobalScope);
  }

  var scopeCandidates = [
    typeof globalThis !== 'undefined' ? globalThis : null,
    typeof window !== 'undefined' ? window : null,
    typeof self !== 'undefined' ? self : null,
    typeof global !== 'undefined' ? global : null,
  ];

  for (var candidateIndex = 0; candidateIndex < scopeCandidates.length; candidateIndex += 1) {
    var candidateScope = scopeCandidates[candidateIndex];

    if (candidateScope && fallbackScopes.indexOf(candidateScope) === -1) {
      fallbackScopes.push(candidateScope);
    }
  }

  return fallbackScopes;
}

function createLocalizationFallbackSkeleton() {
  return {
    localizationBootstrapResult: null,
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
      },
    },
    localizationFallbackResolvers: null,
    localizationFallbackNamespace: null,
    fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
      return null;
    },
    createLocaleFallbacks: function createLocaleFallbacks() {
      return null;
    },
  };
}

function resolveLocalizationBootstrapResult(settings) {
  var options = settings && typeof settings === 'object' ? settings : {};
  var getRuntimeScope =
    typeof options.getDefaultRuntimeScope === 'function'
      ? options.getDefaultRuntimeScope
      : bootstrapBridge && typeof bootstrapBridge.getDefaultRuntimeScope === 'function'
      ? bootstrapBridge.getDefaultRuntimeScope
      : defaultGetDefaultRuntimeScope;
  var getCoreGlobalScope =
    typeof options.getDefaultCoreGlobalScope === 'function'
      ? options.getDefaultCoreGlobalScope
      : bootstrapBridge && typeof bootstrapBridge.getDefaultCoreGlobalScope === 'function'
      ? bootstrapBridge.getDefaultCoreGlobalScope
      : defaultGetDefaultCoreGlobalScope;
  var collectFallbackScopesFn =
    typeof options.collectBootstrapFallbackScopes === 'function'
      ? options.collectBootstrapFallbackScopes
      : defaultCollectBootstrapFallbackScopes;
  var createInlineLocalizationFallbackFn =
    typeof options.createInlineLocalizationFallback === 'function'
      ? options.createInlineLocalizationFallback
      : bootstrapBridge && typeof bootstrapBridge.createInlineLocalizationFallback === 'function'
      ? bootstrapBridge.createInlineLocalizationFallback
      : function createInlineLocalizationFallbackProxy(fallbackOptions) {
          return createLocalizationFallbackSkeleton();
        };

  var runtimeScope = getRuntimeScope();
  var coreGlobalScope = getCoreGlobalScope();
  var requireFn = typeof require === 'function' ? require : null;
  var fallbackScopes = collectFallbackScopesFn({
    fallbackScopes: [],
    runtimeScope: runtimeScope,
    coreGlobalScope: coreGlobalScope,
  });

  var bootstrapTools = options.RESOLVED_APP_CORE_BOOTSTRAP_TOOLS ||
    (bootstrapBridge && bootstrapBridge.RESOLVED_APP_CORE_BOOTSTRAP_TOOLS) ||
    null;

  var moduleOptions = {
    bootstrapTools: bootstrapTools,
    bootstrapFallbackTools:
      options.APP_CORE_BOOTSTRAP_FALLBACK_TOOLS ||
      (bootstrapBridge && bootstrapBridge.APP_CORE_BOOTSTRAP_FALLBACK_TOOLS) ||
      null,
    localizationSupportTools:
      options.APP_CORE_LOCALIZATION_SUPPORT_TOOLS ||
      (bootstrapBridge && bootstrapBridge.APP_CORE_LOCALIZATION_SUPPORT_TOOLS) ||
      null,
    localizationBootstrapTools:
      options.APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS ||
      (bootstrapBridge && bootstrapBridge.APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS) ||
      null,
    localizationRuntimeTools:
      options.APP_CORE_LOCALIZATION_RUNTIME_TOOLS ||
      (bootstrapBridge && bootstrapBridge.APP_CORE_LOCALIZATION_RUNTIME_TOOLS) ||
      null,
    resolveCoreSupportModule:
      options.resolveCoreSupportModule ||
      (typeof resolveCoreSupportModule === 'function' ? resolveCoreSupportModule : null),
    requireFn: requireFn,
    runtimeScope: runtimeScope,
    coreGlobalScope: coreGlobalScope,
    fallbackScopes: fallbackScopes,
    collectFallbackScopes: function collectFallbackScopes(scopes) {
      return collectFallbackScopesFn({
        fallbackScopes: Array.isArray(scopes) ? scopes : [],
        runtimeScope: runtimeScope,
        coreGlobalScope: coreGlobalScope,
      });
    },
    createInlineLocalizationFallback: createInlineLocalizationFallbackFn,
    localizationFallbackOptions: null,
    currentLocalization: null,
  };

  var bootstrapResultsTools =
    options.APP_CORE_BOOTSTRAP_RESULTS_TOOLS ||
    (bootstrapBridge && bootstrapBridge.APP_CORE_BOOTSTRAP_RESULTS_TOOLS) ||
    null;

  if (bootstrapResultsTools && typeof bootstrapResultsTools.resolveLocalizationBootstrapResult === 'function') {
    try {
      var resolved = bootstrapResultsTools.resolveLocalizationBootstrapResult(moduleOptions);

      if (resolved && typeof resolved === 'object') {
        return resolved;
      }
    } catch (bootstrapResultResolveError) {
      void bootstrapResultResolveError;
    }
  }

  if (bootstrapTools && typeof bootstrapTools.createLocalizationBootstrapResult === 'function') {
    try {
      var resolvedResult = bootstrapTools.createLocalizationBootstrapResult(moduleOptions);

      if (resolvedResult && typeof resolvedResult === 'object') {
        return resolvedResult;
      }
    } catch (localizationBootstrapError) {
      void localizationBootstrapError;
    }
  }

  if (bootstrapTools && typeof bootstrapTools.createLocalizationBootstrapFallback === 'function') {
    try {
      var fallbackResult = bootstrapTools.createLocalizationBootstrapFallback(moduleOptions);

      if (fallbackResult && typeof fallbackResult === 'object') {
        return fallbackResult;
      }
    } catch (localizationBootstrapFallbackError) {
      void localizationBootstrapFallbackError;
    }
  }

  return createInlineLocalizationFallbackFn(moduleOptions);
}

function normaliseLocalisationOutputs(localizationBootstrapResult) {
  var bootstrapResult = localizationBootstrapResult && typeof localizationBootstrapResult === 'object'
    ? localizationBootstrapResult
    : null;

  var localizationSupport = bootstrapResult && bootstrapResult.localizationSupport
    ? bootstrapResult.localizationSupport
    : null;

  var localizationRuntimeEnvironment =
    bootstrapResult && bootstrapResult.localizationRuntimeEnvironment
      ? bootstrapResult.localizationRuntimeEnvironment
      : null;

  var localizationBridge = bootstrapResult && bootstrapResult.localizationBridge
    ? bootstrapResult.localizationBridge
    : null;

  var localizationFallbacks = bootstrapResult && bootstrapResult.localizationFallbacks
    ? bootstrapResult.localizationFallbacks
    : null;

  var inlineLocalizationFallbacks =
    bootstrapResult && bootstrapResult.inlineLocalizationFallbacks
      ? bootstrapResult.inlineLocalizationFallbacks
      : null;

  var localizationFallbackSupport =
    bootstrapResult && typeof bootstrapResult.localizationFallbackSupport !== 'undefined'
      ? bootstrapResult.localizationFallbackSupport
      : null;

  var createBasicLocalizationFallbackResolvers =
    bootstrapResult && typeof bootstrapResult.createBasicLocalizationFallbackResolvers === 'function'
      ? bootstrapResult.createBasicLocalizationFallbackResolvers
      : function createBasicLocalizationFallbackResolversProxy() {
          return null;
        };

  var localizationFallbackRegistry =
    bootstrapResult && bootstrapResult.localizationFallbackRegistry
      ? bootstrapResult.localizationFallbackRegistry
      : {
          createFallbackResolvers: function createFallbackResolvers(fallbackOptions) {
            return createBasicLocalizationFallbackResolvers(fallbackOptions);
          },
        };

  var localizationFallbackResolvers =
    bootstrapResult && bootstrapResult.localizationFallbackResolvers
      ? bootstrapResult.localizationFallbackResolvers
      : localizationFallbackRegistry && typeof localizationFallbackRegistry.createFallbackResolvers === 'function'
      ? localizationFallbackRegistry.createFallbackResolvers({
          directNamespace: localizationFallbacks,
          inlineNamespace: inlineLocalizationFallbacks,
        })
      : createBasicLocalizationFallbackResolvers({
          directNamespace: localizationFallbacks,
          inlineNamespace: inlineLocalizationFallbacks,
        });

  var localizationFallbackNamespace =
    bootstrapResult && typeof bootstrapResult.localizationFallbackNamespace !== 'undefined'
      ? bootstrapResult.localizationFallbackNamespace
      : null;

  var fallbackResolveLocaleModule =
    bootstrapResult && typeof bootstrapResult.fallbackResolveLocaleModule === 'function'
      ? bootstrapResult.fallbackResolveLocaleModule
      : function fallbackResolveLocaleModuleProxy() {
          return null;
        };

  var createLocaleFallbacks =
    bootstrapResult && typeof bootstrapResult.createLocaleFallbacks === 'function'
      ? bootstrapResult.createLocaleFallbacks
      : function createLocaleFallbacksProxy() {
          return null;
        };

  return {
    localizationBootstrapResult: bootstrapResult,
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
    createLocaleFallbacks: createLocaleFallbacks,
  };
}

function createLocalizationBridge(options) {
  var bootstrapResult = resolveLocalizationBootstrapResult(options);
  return normaliseLocalisationOutputs(bootstrapResult);
}

var localisationBridgeExports = {
  createLocalizationBridge: createLocalizationBridge,
  resolveLocalizationBootstrapResult: resolveLocalizationBootstrapResult,
  normaliseLocalisationOutputs: normaliseLocalisationOutputs,
};

if (typeof module !== 'undefined' && module && module.exports) {
  module.exports = localisationBridgeExports;
}

var localisationGlobalScope =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof window !== 'undefined' && window) ||
  (typeof self !== 'undefined' && self) ||
  (typeof global !== 'undefined' && global) ||
  null;

if (localisationGlobalScope) {
  try {
    if (!localisationGlobalScope.CINE_CORE_APP_CORE_LOCALIZATION_BRIDGE) {
      Object.defineProperty(localisationGlobalScope, 'CINE_CORE_APP_CORE_LOCALIZATION_BRIDGE', {
        value: localisationBridgeExports,
        configurable: true,
        enumerable: false,
        writable: true,
      });
    }
  } catch (localizationBridgeDefineError) {
    void localizationBridgeDefineError;
    try {
      localisationGlobalScope.CINE_CORE_APP_CORE_LOCALIZATION_BRIDGE = localisationBridgeExports;
    } catch (localizationBridgeAssignError) {
      void localizationBridgeAssignError;
    }
  }
}
