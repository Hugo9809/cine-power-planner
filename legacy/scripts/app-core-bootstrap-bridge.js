/* global resolveCoreSupportModule, CORE_PART1_RUNTIME_SCOPE, CORE_GLOBAL_SCOPE */
/*
 * Cine Power Planner app core bootstrap bridge (legacy bundle).
 *
 * Mirrors the modern bridge with ES5-compatible syntax so the legacy build
 * keeps the same bootstrap, resolver, and fallback behaviour while we refactor
 * the runtime.
 */

var APP_CORE_BOOTSTRAP_TOOLS =
  typeof resolveCoreSupportModule === 'function'
    ? resolveCoreSupportModule('cineCoreAppCoreBootstrap', './modules/app-core/bootstrap.js')
    : null;

var APP_CORE_LOCALIZATION_RUNTIME_TOOLS =
  typeof resolveCoreSupportModule === 'function'
    ? resolveCoreSupportModule('cineCoreAppRuntimeLocalization', './modules/app-core/localization.js')
    : null;

var APP_CORE_LOCALIZATION_SUPPORT_TOOLS =
  typeof resolveCoreSupportModule === 'function'
    ? resolveCoreSupportModule('cineCoreAppLocalizationSupport', './modules/app-core/localization.js')
    : null;

var APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS =
  typeof resolveCoreSupportModule === 'function'
    ? resolveCoreSupportModule('cineCoreAppLocalizationBootstrap', './modules/app-core/localization.js')
    : null;

var APP_CORE_BOOTSTRAP_RESOLVER_DIRECT =
  typeof resolveCoreSupportModule === 'function'
    ? resolveCoreSupportModule('cineCoreAppCoreBootstrapResolver', './modules/app-core/bootstrap.js')
    : null;

var APP_CORE_BOOTSTRAP_FALLBACK_DIRECT =
  typeof resolveCoreSupportModule === 'function'
    ? resolveCoreSupportModule('cineCoreAppCoreBootstrapFallbacks', './modules/app-core/bootstrap-fallbacks.js')
    : null;

var APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS =
  typeof resolveCoreSupportModule === 'function'
    ? resolveCoreSupportModule('cineCoreAppCoreBootstrapEnvironment', './modules/app-core/bootstrap-environment.js')
    : null;

var APP_CORE_BOOTSTRAP_RESULTS_TOOLS =
  typeof resolveCoreSupportModule === 'function'
    ? resolveCoreSupportModule('cineCoreAppCoreBootstrapResults', './modules/app-core/bootstrap-results.js')
    : null;

function getDefaultRuntimeScope() {
  return typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' && CORE_PART1_RUNTIME_SCOPE
    ? CORE_PART1_RUNTIME_SCOPE
    : null;
}

function getDefaultCoreGlobalScope() {
  return typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : null;
}

var APP_CORE_BOOTSTRAP_ENVIRONMENT =
  APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS &&
  typeof APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS.createBootstrapEnvironment === 'function'
    ? APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS.createBootstrapEnvironment({
        directResolverNamespace: APP_CORE_BOOTSTRAP_RESOLVER_DIRECT,
        directBootstrapNamespace: APP_CORE_BOOTSTRAP_TOOLS,
        directBootstrapFallbackNamespace: APP_CORE_BOOTSTRAP_FALLBACK_DIRECT,
        resolveCoreSupportModule: resolveCoreSupportModule,
        requireFn: typeof require === 'function' ? require : null,
        runtimeScope: getDefaultRuntimeScope(),
        coreGlobalScope: getDefaultCoreGlobalScope(),
      })
    : null;

var APP_CORE_BOOTSTRAP_RESOLVER_TOOLS =
  (APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapResolverTools) ||
  APP_CORE_BOOTSTRAP_RESOLVER_DIRECT ||
  null;

var RESOLVED_APP_CORE_BOOTSTRAP_TOOLS =
  (APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapTools) ||
  APP_CORE_BOOTSTRAP_TOOLS ||
  null;

var APP_CORE_BOOTSTRAP_FALLBACK_TOOLS =
  (APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapFallbackTools) ||
  APP_CORE_BOOTSTRAP_FALLBACK_DIRECT ||
  null;

function collectBootstrapFallbackScopes(extraScopes) {
  var hasOptionsObject = extraScopes && typeof extraScopes === 'object' && !Array.isArray(extraScopes);
  var runtimeScopeOverride =
    hasOptionsObject && extraScopes.runtimeScope && typeof extraScopes.runtimeScope === 'object'
      ? extraScopes.runtimeScope
      : null;
  var coreGlobalScopeOverride =
    hasOptionsObject && extraScopes.coreGlobalScope && typeof extraScopes.coreGlobalScope === 'object'
      ? extraScopes.coreGlobalScope
      : null;
  var fallbackScopeList = Array.isArray(extraScopes)
    ? extraScopes
    : hasOptionsObject && Array.isArray(extraScopes.fallbackScopes)
    ? extraScopes.fallbackScopes
    : [];

  var runtimeScope = runtimeScopeOverride || getDefaultRuntimeScope();
  var coreGlobalScope = coreGlobalScopeOverride || getDefaultCoreGlobalScope();

  if (
    APP_CORE_BOOTSTRAP_RESULTS_TOOLS &&
    typeof APP_CORE_BOOTSTRAP_RESULTS_TOOLS.collectBootstrapFallbackScopes === 'function'
  ) {
    try {
      var collected = APP_CORE_BOOTSTRAP_RESULTS_TOOLS.collectBootstrapFallbackScopes({
        runtimeScope: runtimeScope,
        coreGlobalScope: coreGlobalScope,
        fallbackScopes: fallbackScopeList,
        collectFallbackScopes:
          APP_CORE_BOOTSTRAP_ENVIRONMENT &&
          typeof APP_CORE_BOOTSTRAP_ENVIRONMENT.collectFallbackScopes === 'function'
            ? function collectWithEnvironment(scopes) {
                return APP_CORE_BOOTSTRAP_ENVIRONMENT.collectFallbackScopes(
                  Array.isArray(scopes) ? scopes : fallbackScopeList
                );
              }
            : null,
      });

      if (Array.isArray(collected)) {
        return collected;
      }
    } catch (bootstrapResultsCollectError) {
      void bootstrapResultsCollectError;
    }
  }

  if (
    APP_CORE_BOOTSTRAP_ENVIRONMENT &&
    typeof APP_CORE_BOOTSTRAP_ENVIRONMENT.collectFallbackScopes === 'function'
  ) {
    try {
      var environmentScopes = APP_CORE_BOOTSTRAP_ENVIRONMENT.collectFallbackScopes(
        fallbackScopeList
      );

      if (Array.isArray(environmentScopes)) {
        return environmentScopes;
      }
    } catch (environmentCollectError) {
      void environmentCollectError;
    }
  }

  var fallbackScopes = Array.isArray(fallbackScopeList) ? fallbackScopeList.slice() : [];

  function enqueue(scope) {
    if (!scope || typeof scope !== 'object') {
      return;
    }

    if (fallbackScopes.indexOf(scope) === -1) {
      fallbackScopes.push(scope);
    }
  }

  enqueue(runtimeScope);
  enqueue(coreGlobalScope);
  enqueue(typeof globalThis !== 'undefined' ? globalThis : null);
  enqueue(typeof window !== 'undefined' ? window : null);
  enqueue(typeof self !== 'undefined' ? self : null);
  enqueue(typeof global !== 'undefined' ? global : null);

  return fallbackScopes;
}

var createInlineLocalizationFallback =
  (APP_CORE_BOOTSTRAP_ENVIRONMENT &&
    typeof APP_CORE_BOOTSTRAP_ENVIRONMENT.createInlineLocalizationFallback === 'function'
      ? APP_CORE_BOOTSTRAP_ENVIRONMENT.createInlineLocalizationFallback
      : null) ||
  function fallbackCreateInlineLocalizationFallback(fallbackOptions) {
    var runtimeScope =
      fallbackOptions && fallbackOptions.runtimeScope && typeof fallbackOptions.runtimeScope === 'object'
        ? fallbackOptions.runtimeScope
        : getDefaultRuntimeScope();
    var coreGlobalScope =
      fallbackOptions &&
      fallbackOptions.coreGlobalScope &&
      typeof fallbackOptions.coreGlobalScope === 'object'
        ? fallbackOptions.coreGlobalScope
        : getDefaultCoreGlobalScope();
    var fallbackScopes = collectBootstrapFallbackScopes({
      fallbackScopes:
        fallbackOptions && Array.isArray(fallbackOptions.fallbackScopes)
          ? fallbackOptions.fallbackScopes
          : [],
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
    });
    var localizationFallbackOptions =
      fallbackOptions && fallbackOptions.localizationFallbackOptions
        ? fallbackOptions.localizationFallbackOptions
        : null;

    if (
      APP_CORE_BOOTSTRAP_RESOLVER_TOOLS &&
      typeof APP_CORE_BOOTSTRAP_RESOLVER_TOOLS.createInlineLocalizationFallback === 'function'
    ) {
      try {
        var generated = APP_CORE_BOOTSTRAP_RESOLVER_TOOLS.createInlineLocalizationFallback({
          fallbackTools: APP_CORE_BOOTSTRAP_FALLBACK_TOOLS,
          resolveCoreSupportModule: resolveCoreSupportModule,
          requireFn: typeof require === 'function' ? require : null,
          runtimeScope: runtimeScope,
          coreGlobalScope: coreGlobalScope,
          fallbackScopes: fallbackScopes,
          localizationFallbackOptions: localizationFallbackOptions,
        });

        if (generated && typeof generated === 'object') {
          return generated;
        }
      } catch (localizationFallbackResolveError) {
        void localizationFallbackResolveError;
      }
    }

    if (
      APP_CORE_BOOTSTRAP_FALLBACK_TOOLS &&
      typeof APP_CORE_BOOTSTRAP_FALLBACK_TOOLS.createLocalizationBootstrapFallback === 'function'
    ) {
      try {
        var fallbackResult = APP_CORE_BOOTSTRAP_FALLBACK_TOOLS.createLocalizationBootstrapFallback({
          resolveCoreSupportModule: resolveCoreSupportModule,
          requireFn: typeof require === 'function' ? require : null,
          runtimeScope: runtimeScope,
          coreGlobalScope: coreGlobalScope,
          fallbackScopes: fallbackScopes,
          localizationFallbackOptions: localizationFallbackOptions,
        });

        if (fallbackResult && typeof fallbackResult === 'object') {
          return fallbackResult;
        }
      } catch (localizationFallbackError) {
        void localizationFallbackError;
      }
    }

    if (
      APP_CORE_BOOTSTRAP_RESULTS_TOOLS &&
      typeof APP_CORE_BOOTSTRAP_RESULTS_TOOLS.createLocalizationFallbackSkeleton === 'function'
    ) {
      try {
        var skeleton = APP_CORE_BOOTSTRAP_RESULTS_TOOLS.createLocalizationFallbackSkeleton();
        if (skeleton && typeof skeleton === 'object') {
          return skeleton;
        }
      } catch (localizationSkeletonError) {
        void localizationSkeletonError;
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
  };

var createInlineRuntimeSharedFallback =
  (APP_CORE_BOOTSTRAP_ENVIRONMENT &&
    typeof APP_CORE_BOOTSTRAP_ENVIRONMENT.createInlineRuntimeSharedFallback === 'function'
      ? APP_CORE_BOOTSTRAP_ENVIRONMENT.createInlineRuntimeSharedFallback
      : null) ||
  function fallbackCreateInlineRuntimeSharedFallback(fallbackOptions) {
    var runtimeScopeCandidate =
      fallbackOptions && typeof fallbackOptions.runtimeScope === 'object'
        ? fallbackOptions.runtimeScope
        : null;
    var coreGlobalScopeCandidate =
      fallbackOptions && typeof fallbackOptions.coreGlobalScope === 'object'
        ? fallbackOptions.coreGlobalScope
        : null;
    var runtimeScope = runtimeScopeCandidate || getDefaultRuntimeScope();
    var coreGlobalScope = coreGlobalScopeCandidate || getDefaultCoreGlobalScope();
    var fallbackScopes = collectBootstrapFallbackScopes({
      fallbackScopes:
        fallbackOptions && fallbackOptions.fallbackScopes
          ? fallbackOptions.fallbackScopes
          : [],
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
    });
    var currentRuntimeSharedCandidate =
      fallbackOptions && typeof fallbackOptions.currentRuntimeShared === 'object'
        ? fallbackOptions.currentRuntimeShared
        : null;

    if (
      APP_CORE_BOOTSTRAP_RESOLVER_TOOLS &&
      typeof APP_CORE_BOOTSTRAP_RESOLVER_TOOLS.createInlineRuntimeSharedFallback === 'function'
    ) {
      try {
        var generated = APP_CORE_BOOTSTRAP_RESOLVER_TOOLS.createInlineRuntimeSharedFallback({
          fallbackTools: APP_CORE_BOOTSTRAP_FALLBACK_TOOLS,
          resolveCoreSupportModule: resolveCoreSupportModule,
          requireFn: typeof require === 'function' ? require : null,
          runtimeScope: runtimeScope,
          coreGlobalScope: coreGlobalScope,
          fallbackScopes: fallbackScopes,
          currentRuntimeShared: currentRuntimeSharedCandidate,
        });

        if (generated && typeof generated === 'object') {
          return generated;
        }
      } catch (runtimeSharedFallbackResolveError) {
        void runtimeSharedFallbackResolveError;
      }
    }

    if (
      APP_CORE_BOOTSTRAP_FALLBACK_TOOLS &&
      typeof APP_CORE_BOOTSTRAP_FALLBACK_TOOLS.createRuntimeSharedBootstrapFallback === 'function'
    ) {
      try {
        var moduleFallback =
          APP_CORE_BOOTSTRAP_FALLBACK_TOOLS.createRuntimeSharedBootstrapFallback({
            resolveCoreSupportModule: resolveCoreSupportModule,
            requireFn: typeof require === 'function' ? require : null,
            runtimeScope: runtimeScope,
            coreGlobalScope: coreGlobalScope,
            fallbackScopes: fallbackScopes,
            currentRuntimeShared: currentRuntimeSharedCandidate,
          });

        if (moduleFallback && typeof moduleFallback === 'object') {
          return moduleFallback;
        }
      } catch (runtimeSharedFallbackError) {
        void runtimeSharedFallbackError;
      }
    }

    function fallbackResolveRuntimeSharedFromGlobal() {
      for (var index = 0; index < fallbackScopes.length; index += 1) {
        var scope = fallbackScopes[index];

        if (!scope || typeof scope !== 'object') {
          continue;
        }

        try {
          var candidate = scope.cineCoreRuntimeShared;

          if (candidate && typeof candidate === 'object') {
            return candidate;
          }
        } catch (runtimeSharedLookupError) {
          void runtimeSharedLookupError;
        }
      }

      return null;
    }

    var runtimeShared = currentRuntimeSharedCandidate;

    if (!runtimeShared) {
      runtimeShared = fallbackResolveRuntimeSharedFromGlobal();
    }

    if (!runtimeShared || typeof runtimeShared !== 'object') {
      try {
        runtimeShared = Object.create(null);
      } catch (runtimeSharedCreationError) {
        void runtimeSharedCreationError;
        runtimeShared = {};
      }
    }

    if (
      APP_CORE_BOOTSTRAP_RESULTS_TOOLS &&
      typeof APP_CORE_BOOTSTRAP_RESULTS_TOOLS.createRuntimeSharedFallbackSkeleton === 'function'
    ) {
      try {
        var skeleton = APP_CORE_BOOTSTRAP_RESULTS_TOOLS.createRuntimeSharedFallbackSkeleton({
          runtimeScope: runtimeScope,
          coreGlobalScope: coreGlobalScope,
          fallbackScopes: fallbackScopes,
          currentRuntimeShared: runtimeShared,
        });

        if (skeleton && typeof skeleton === 'object') {
          return skeleton;
        }
      } catch (runtimeSharedSkeletonError) {
        void runtimeSharedSkeletonError;
      }
    }

    return {
      runtimeSharedNamespace: null,
      runtimeSharedResolver: null,
      existingRuntimeShared: runtimeShared,
      runtimeShared: runtimeShared,
      fallbackResolveRuntimeSharedFromGlobal: fallbackResolveRuntimeSharedFromGlobal,
    };
  };

var bridgeExports = {
  APP_CORE_BOOTSTRAP_ENVIRONMENT: APP_CORE_BOOTSTRAP_ENVIRONMENT,
  APP_CORE_BOOTSTRAP_RESOLVER_TOOLS: APP_CORE_BOOTSTRAP_RESOLVER_TOOLS,
  RESOLVED_APP_CORE_BOOTSTRAP_TOOLS: RESOLVED_APP_CORE_BOOTSTRAP_TOOLS,
  APP_CORE_BOOTSTRAP_FALLBACK_TOOLS: APP_CORE_BOOTSTRAP_FALLBACK_TOOLS,
  APP_CORE_BOOTSTRAP_RESULTS_TOOLS: APP_CORE_BOOTSTRAP_RESULTS_TOOLS,
  APP_CORE_LOCALIZATION_RUNTIME_TOOLS: APP_CORE_LOCALIZATION_RUNTIME_TOOLS,
  APP_CORE_LOCALIZATION_SUPPORT_TOOLS: APP_CORE_LOCALIZATION_SUPPORT_TOOLS,
  APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS: APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS,
  collectBootstrapFallbackScopes: collectBootstrapFallbackScopes,
  createInlineLocalizationFallback: createInlineLocalizationFallback,
  createInlineRuntimeSharedFallback: createInlineRuntimeSharedFallback,
  getDefaultRuntimeScope: getDefaultRuntimeScope,
  getDefaultCoreGlobalScope: getDefaultCoreGlobalScope,
};

if (typeof module !== 'undefined' && module && module.exports) {
  module.exports = bridgeExports;
}

var globalScope =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof window !== 'undefined' && window) ||
  (typeof self !== 'undefined' && self) ||
  (typeof global !== 'undefined' && global) ||
  null;

if (globalScope) {
  try {
    if (!globalScope.CINE_CORE_APP_CORE_BOOTSTRAP_BRIDGE) {
      Object.defineProperty(globalScope, 'CINE_CORE_APP_CORE_BOOTSTRAP_BRIDGE', {
        value: bridgeExports,
        configurable: true,
        enumerable: false,
        writable: true,
      });
    }
  } catch (bootstrapBridgeDefineError) {
    void bootstrapBridgeDefineError;
    try {
      globalScope.CINE_CORE_APP_CORE_BOOTSTRAP_BRIDGE = bridgeExports;
    } catch (bootstrapBridgeAssignError) {
      void bootstrapBridgeAssignError;
    }
  }
}
