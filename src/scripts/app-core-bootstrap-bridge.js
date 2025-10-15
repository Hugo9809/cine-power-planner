/* global resolveCoreSupportModule, CORE_PART1_RUNTIME_SCOPE, CORE_GLOBAL_SCOPE */
/*
 * Cine Power Planner app core bootstrap bridge.
 *
 * This helper lifts the bootstrap, resolver, and fallback plumbing out of
 * `app-core-new-1.js` so autosave, backup, restore, and localisation
 * routines keep their carefully layered fallbacks while the monolith is
 * decomposed. The behaviour mirrors the historical inline logic exactly,
 * keeping runtime scope detection and offline safety nets intact.
 */

const APP_CORE_BOOTSTRAP_TOOLS =
  typeof resolveCoreSupportModule === 'function'
    ? resolveCoreSupportModule('cineCoreAppCoreBootstrap', './modules/app-core/bootstrap.js')
    : null;

const APP_CORE_LOCALIZATION_RUNTIME_TOOLS =
  typeof resolveCoreSupportModule === 'function'
    ? resolveCoreSupportModule('cineCoreAppRuntimeLocalization', './modules/app-core/localization.js')
    : null;

const APP_CORE_LOCALIZATION_SUPPORT_TOOLS =
  typeof resolveCoreSupportModule === 'function'
    ? resolveCoreSupportModule('cineCoreAppLocalizationSupport', './modules/app-core/localization.js')
    : null;

const APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS =
  typeof resolveCoreSupportModule === 'function'
    ? resolveCoreSupportModule('cineCoreAppLocalizationBootstrap', './modules/app-core/localization.js')
    : null;

const APP_CORE_BOOTSTRAP_RESOLVER_DIRECT =
  typeof resolveCoreSupportModule === 'function'
    ? resolveCoreSupportModule('cineCoreAppCoreBootstrapResolver', './modules/app-core/bootstrap.js')
    : null;

const APP_CORE_BOOTSTRAP_FALLBACK_DIRECT =
  typeof resolveCoreSupportModule === 'function'
    ? resolveCoreSupportModule('cineCoreAppCoreBootstrapFallbacks', './modules/app-core/bootstrap-fallbacks.js')
    : null;

const APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS =
  typeof resolveCoreSupportModule === 'function'
    ? resolveCoreSupportModule('cineCoreAppCoreBootstrapEnvironment', './modules/app-core/bootstrap-environment.js')
    : null;

const APP_CORE_BOOTSTRAP_RESULTS_TOOLS =
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

const APP_CORE_BOOTSTRAP_ENVIRONMENT =
  APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS &&
  typeof APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS.createBootstrapEnvironment === 'function'
    ? APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS.createBootstrapEnvironment({
        directResolverNamespace: APP_CORE_BOOTSTRAP_RESOLVER_DIRECT,
        directBootstrapNamespace: APP_CORE_BOOTSTRAP_TOOLS,
        directBootstrapFallbackNamespace: APP_CORE_BOOTSTRAP_FALLBACK_DIRECT,
        resolveCoreSupportModule,
        requireFn: typeof require === 'function' ? require : null,
        runtimeScope: getDefaultRuntimeScope(),
        coreGlobalScope: getDefaultCoreGlobalScope(),
      })
    : null;

const APP_CORE_BOOTSTRAP_RESOLVER_TOOLS =
  (APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapResolverTools) ||
  APP_CORE_BOOTSTRAP_RESOLVER_DIRECT ||
  null;

const RESOLVED_APP_CORE_BOOTSTRAP_TOOLS =
  (APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapTools) ||
  APP_CORE_BOOTSTRAP_TOOLS ||
  null;

const APP_CORE_BOOTSTRAP_FALLBACK_TOOLS =
  (APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapFallbackTools) ||
  APP_CORE_BOOTSTRAP_FALLBACK_DIRECT ||
  null;

function collectBootstrapFallbackScopes(extraScopes) {
  const hasOptionsObject = extraScopes && typeof extraScopes === 'object' && !Array.isArray(extraScopes);
  const runtimeScopeOverride =
    hasOptionsObject && extraScopes.runtimeScope && typeof extraScopes.runtimeScope === 'object'
      ? extraScopes.runtimeScope
      : null;
  const coreGlobalScopeOverride =
    hasOptionsObject && extraScopes.coreGlobalScope && typeof extraScopes.coreGlobalScope === 'object'
      ? extraScopes.coreGlobalScope
      : null;
  const fallbackScopeList = Array.isArray(extraScopes)
    ? extraScopes
    : hasOptionsObject && Array.isArray(extraScopes.fallbackScopes)
    ? extraScopes.fallbackScopes
    : [];

  const runtimeScope = runtimeScopeOverride || getDefaultRuntimeScope();
  const coreGlobalScope = coreGlobalScopeOverride || getDefaultCoreGlobalScope();

  if (
    APP_CORE_BOOTSTRAP_RESULTS_TOOLS &&
    typeof APP_CORE_BOOTSTRAP_RESULTS_TOOLS.collectBootstrapFallbackScopes === 'function'
  ) {
    try {
      const collected = APP_CORE_BOOTSTRAP_RESULTS_TOOLS.collectBootstrapFallbackScopes({
        runtimeScope,
        coreGlobalScope,
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
      const environmentScopes = APP_CORE_BOOTSTRAP_ENVIRONMENT.collectFallbackScopes(fallbackScopeList);

      if (Array.isArray(environmentScopes)) {
        return environmentScopes;
      }
    } catch (environmentCollectError) {
      void environmentCollectError;
    }
  }

  const fallbackScopes = Array.isArray(fallbackScopeList) ? fallbackScopeList.slice() : [];

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

const createInlineLocalizationFallback =
  (APP_CORE_BOOTSTRAP_ENVIRONMENT &&
    typeof APP_CORE_BOOTSTRAP_ENVIRONMENT.createInlineLocalizationFallback === 'function'
      ? APP_CORE_BOOTSTRAP_ENVIRONMENT.createInlineLocalizationFallback
      : null) ||
  function fallbackCreateInlineLocalizationFallback(fallbackOptions) {
    const runtimeScope =
      fallbackOptions && fallbackOptions.runtimeScope && typeof fallbackOptions.runtimeScope === 'object'
        ? fallbackOptions.runtimeScope
        : getDefaultRuntimeScope();
    const coreGlobalScope =
      fallbackOptions && fallbackOptions.coreGlobalScope && typeof fallbackOptions.coreGlobalScope === 'object'
        ? fallbackOptions.coreGlobalScope
        : getDefaultCoreGlobalScope();
    const fallbackScopes = collectBootstrapFallbackScopes({
      fallbackScopes:
        fallbackOptions && Array.isArray(fallbackOptions.fallbackScopes)
          ? fallbackOptions.fallbackScopes
          : [],
      runtimeScope,
      coreGlobalScope,
    });
    const localizationFallbackOptions =
      fallbackOptions && fallbackOptions.localizationFallbackOptions
        ? fallbackOptions.localizationFallbackOptions
        : null;

    if (
      APP_CORE_BOOTSTRAP_RESOLVER_TOOLS &&
      typeof APP_CORE_BOOTSTRAP_RESOLVER_TOOLS.createInlineLocalizationFallback === 'function'
    ) {
      try {
        const generated = APP_CORE_BOOTSTRAP_RESOLVER_TOOLS.createInlineLocalizationFallback({
          fallbackTools: APP_CORE_BOOTSTRAP_FALLBACK_TOOLS,
          resolveCoreSupportModule,
          requireFn: typeof require === 'function' ? require : null,
          runtimeScope,
          coreGlobalScope,
          fallbackScopes,
          localizationFallbackOptions,
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
        const fallbackResult = APP_CORE_BOOTSTRAP_FALLBACK_TOOLS.createLocalizationBootstrapFallback({
          resolveCoreSupportModule,
          requireFn: typeof require === 'function' ? require : null,
          runtimeScope,
          coreGlobalScope,
          fallbackScopes,
          localizationFallbackOptions,
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
        const skeleton = APP_CORE_BOOTSTRAP_RESULTS_TOOLS.createLocalizationFallbackSkeleton();
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
      createBasicLocalizationFallbackResolvers() {
        return null;
      },
      localizationFallbackRegistry: {
        createFallbackResolvers() {
          return null;
        },
      },
      localizationFallbackResolvers: null,
      localizationFallbackNamespace: null,
      fallbackResolveLocaleModule() {
        return null;
      },
      createLocaleFallbacks() {
        return null;
      },
    };
  };

const createInlineRuntimeSharedFallback =
  (APP_CORE_BOOTSTRAP_ENVIRONMENT &&
    typeof APP_CORE_BOOTSTRAP_ENVIRONMENT.createInlineRuntimeSharedFallback === 'function'
      ? APP_CORE_BOOTSTRAP_ENVIRONMENT.createInlineRuntimeSharedFallback
      : null) ||
  function fallbackCreateInlineRuntimeSharedFallback(fallbackOptions) {
    const runtimeScopeCandidate =
      fallbackOptions && typeof fallbackOptions.runtimeScope === 'object' ? fallbackOptions.runtimeScope : null;
    const coreGlobalScopeCandidate =
      fallbackOptions && typeof fallbackOptions.coreGlobalScope === 'object' ? fallbackOptions.coreGlobalScope : null;
    const runtimeScope = runtimeScopeCandidate || getDefaultRuntimeScope();
    const coreGlobalScope = coreGlobalScopeCandidate || getDefaultCoreGlobalScope();
    const fallbackScopes = collectBootstrapFallbackScopes({
      fallbackScopes:
        fallbackOptions && fallbackOptions.fallbackScopes ? fallbackOptions.fallbackScopes : [],
      runtimeScope,
      coreGlobalScope,
    });
    const currentRuntimeSharedCandidate =
      fallbackOptions && typeof fallbackOptions.currentRuntimeShared === 'object'
        ? fallbackOptions.currentRuntimeShared
        : null;

    if (
      APP_CORE_BOOTSTRAP_RESOLVER_TOOLS &&
      typeof APP_CORE_BOOTSTRAP_RESOLVER_TOOLS.createInlineRuntimeSharedFallback === 'function'
    ) {
      try {
        const generated = APP_CORE_BOOTSTRAP_RESOLVER_TOOLS.createInlineRuntimeSharedFallback({
          fallbackTools: APP_CORE_BOOTSTRAP_FALLBACK_TOOLS,
          resolveCoreSupportModule,
          requireFn: typeof require === 'function' ? require : null,
          runtimeScope,
          coreGlobalScope,
          fallbackScopes,
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
        const moduleFallback = APP_CORE_BOOTSTRAP_FALLBACK_TOOLS.createRuntimeSharedBootstrapFallback({
          resolveCoreSupportModule,
          requireFn: typeof require === 'function' ? require : null,
          runtimeScope,
          coreGlobalScope,
          fallbackScopes,
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
      for (let index = 0; index < fallbackScopes.length; index += 1) {
        const scope = fallbackScopes[index];

        if (!scope || typeof scope !== 'object') {
          continue;
        }

        try {
          const candidate = scope.cineCoreRuntimeShared;

          if (candidate && typeof candidate === 'object') {
            return candidate;
          }
        } catch (runtimeSharedLookupError) {
          void runtimeSharedLookupError;
        }
      }

      return null;
    }

    let runtimeShared = currentRuntimeSharedCandidate;

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
        const skeleton = APP_CORE_BOOTSTRAP_RESULTS_TOOLS.createRuntimeSharedFallbackSkeleton({
          runtimeScope,
          coreGlobalScope,
          fallbackScopes,
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
      runtimeShared,
      fallbackResolveRuntimeSharedFromGlobal,
    };
  };

const bridgeExports = {
  APP_CORE_BOOTSTRAP_ENVIRONMENT,
  APP_CORE_BOOTSTRAP_RESOLVER_TOOLS,
  RESOLVED_APP_CORE_BOOTSTRAP_TOOLS,
  APP_CORE_BOOTSTRAP_FALLBACK_TOOLS,
  APP_CORE_BOOTSTRAP_RESULTS_TOOLS,
  APP_CORE_LOCALIZATION_RUNTIME_TOOLS,
  APP_CORE_LOCALIZATION_SUPPORT_TOOLS,
  APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS,
  collectBootstrapFallbackScopes,
  createInlineLocalizationFallback,
  createInlineRuntimeSharedFallback,
  getDefaultRuntimeScope,
  getDefaultCoreGlobalScope,
};

if (typeof module !== 'undefined' && module && module.exports) {
  module.exports = bridgeExports;
}

const globalScope =
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
