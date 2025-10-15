/* global CORE_PART1_RUNTIME_SCOPE, CORE_GLOBAL_SCOPE, resolveCoreSupportModule */
/*
 * Cine Power Planner localisation bridge.
 *
 * The localisation bootstrap previously lived inline inside
 * `app-core-new-1.js`. Moving it here keeps the runtime orchestration file
 * focused on wiring while this module faithfully reproduces the bootstrap
 * resolution sequence, including all fallbacks that protect offline autosave,
 * sharing, and backup/restore flows.
 */

let bootstrapBridge = null;

if (typeof require === 'function') {
  try {
    bootstrapBridge = require('./app-core-bootstrap-bridge.js');
  } catch (bootstrapBridgeRequireError) {
    void bootstrapBridgeRequireError;
  }
}

if (!bootstrapBridge) {
  const scope =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global) ||
    null;

  if (scope && scope.CINE_CORE_APP_CORE_BOOTSTRAP_BRIDGE) {
    bootstrapBridge = scope.CINE_CORE_APP_CORE_BOOTSTRAP_BRIDGE;
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
  const collect = bootstrapBridge && typeof bootstrapBridge.collectBootstrapFallbackScopes === 'function'
    ? bootstrapBridge.collectBootstrapFallbackScopes
    : null;

  if (collect) {
    return collect(options);
  }

  const fallbackScopes = [];
  if (options && Array.isArray(options.fallbackScopes)) {
    for (let index = 0; index < options.fallbackScopes.length; index += 1) {
      fallbackScopes.push(options.fallbackScopes[index]);
    }
  }

  const runtimeScope = options && options.runtimeScope ? options.runtimeScope : defaultGetDefaultRuntimeScope();
  const coreGlobalScope = options && options.coreGlobalScope ? options.coreGlobalScope : defaultGetDefaultCoreGlobalScope();

  if (runtimeScope && fallbackScopes.indexOf(runtimeScope) === -1) {
    fallbackScopes.push(runtimeScope);
  }

  if (coreGlobalScope && fallbackScopes.indexOf(coreGlobalScope) === -1) {
    fallbackScopes.push(coreGlobalScope);
  }

  const scopeCandidates = [
    typeof globalThis !== 'undefined' ? globalThis : null,
    typeof window !== 'undefined' ? window : null,
    typeof self !== 'undefined' ? self : null,
    typeof global !== 'undefined' ? global : null,
  ];

  for (let index = 0; index < scopeCandidates.length; index += 1) {
    const candidate = scopeCandidates[index];

    if (candidate && fallbackScopes.indexOf(candidate) === -1) {
      fallbackScopes.push(candidate);
    }
  }

  return fallbackScopes;
}

function resolveLocalizationBootstrapResult(settings) {
  const options = settings && typeof settings === 'object' ? settings : {};
  const getRuntimeScope =
    typeof options.getDefaultRuntimeScope === 'function'
      ? options.getDefaultRuntimeScope
      : bootstrapBridge && typeof bootstrapBridge.getDefaultRuntimeScope === 'function'
      ? bootstrapBridge.getDefaultRuntimeScope
      : defaultGetDefaultRuntimeScope;
  const getCoreGlobalScope =
    typeof options.getDefaultCoreGlobalScope === 'function'
      ? options.getDefaultCoreGlobalScope
      : bootstrapBridge && typeof bootstrapBridge.getDefaultCoreGlobalScope === 'function'
      ? bootstrapBridge.getDefaultCoreGlobalScope
      : defaultGetDefaultCoreGlobalScope;
  const collectFallbackScopesFn =
    typeof options.collectBootstrapFallbackScopes === 'function'
      ? options.collectBootstrapFallbackScopes
      : defaultCollectBootstrapFallbackScopes;
  const createInlineLocalizationFallbackFn =
    typeof options.createInlineLocalizationFallback === 'function'
      ? options.createInlineLocalizationFallback
      : bootstrapBridge && typeof bootstrapBridge.createInlineLocalizationFallback === 'function'
      ? bootstrapBridge.createInlineLocalizationFallback
      : function createInlineLocalizationFallbackProxy(fallbackOptions) {
          const fallbackRuntimeScope =
            fallbackOptions && fallbackOptions.runtimeScope
              ? fallbackOptions.runtimeScope
              : getRuntimeScope();
          const fallbackCoreGlobalScope =
            fallbackOptions && fallbackOptions.coreGlobalScope
              ? fallbackOptions.coreGlobalScope
              : getCoreGlobalScope();
          collectFallbackScopesFn({
            fallbackScopes:
              fallbackOptions && Array.isArray(fallbackOptions.fallbackScopes)
                ? fallbackOptions.fallbackScopes
                : [],
            runtimeScope: fallbackRuntimeScope,
            coreGlobalScope: fallbackCoreGlobalScope,
          });

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

  const runtimeScope = getRuntimeScope();
  const coreGlobalScope = getCoreGlobalScope();
  const requireFn = typeof require === 'function' ? require : null;
  const fallbackScopes = collectFallbackScopesFn({
    fallbackScopes: [],
    runtimeScope,
    coreGlobalScope,
  });

  const bootstrapTools = options.RESOLVED_APP_CORE_BOOTSTRAP_TOOLS ||
    (bootstrapBridge && bootstrapBridge.RESOLVED_APP_CORE_BOOTSTRAP_TOOLS) ||
    null;

  const moduleOptions = {
    bootstrapTools,
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
    requireFn,
    runtimeScope,
    coreGlobalScope,
    fallbackScopes,
    collectFallbackScopes(scopes) {
      return collectFallbackScopesFn({
        fallbackScopes: Array.isArray(scopes) ? scopes : [],
        runtimeScope,
        coreGlobalScope,
      });
    },
    createInlineLocalizationFallback: createInlineLocalizationFallbackFn,
    localizationFallbackOptions: null,
    currentLocalization: null,
  };

  const bootstrapResultsTools =
    options.APP_CORE_BOOTSTRAP_RESULTS_TOOLS ||
    (bootstrapBridge && bootstrapBridge.APP_CORE_BOOTSTRAP_RESULTS_TOOLS) ||
    null;

  if (bootstrapResultsTools && typeof bootstrapResultsTools.resolveLocalizationBootstrapResult === 'function') {
    try {
      const resolved = bootstrapResultsTools.resolveLocalizationBootstrapResult(moduleOptions);

      if (resolved && typeof resolved === 'object') {
        return resolved;
      }
    } catch (bootstrapResultResolveError) {
      void bootstrapResultResolveError;
    }
  }

  if (bootstrapTools && typeof bootstrapTools.createLocalizationBootstrapResult === 'function') {
    try {
      const resolved = bootstrapTools.createLocalizationBootstrapResult(moduleOptions);

      if (resolved && typeof resolved === 'object') {
        return resolved;
      }
    } catch (localizationBootstrapError) {
      void localizationBootstrapError;
    }
  }

  if (bootstrapTools && typeof bootstrapTools.createLocalizationBootstrapFallback === 'function') {
    try {
      const fallbackResult = bootstrapTools.createLocalizationBootstrapFallback(moduleOptions);

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
  const bootstrapResult = localizationBootstrapResult && typeof localizationBootstrapResult === 'object'
    ? localizationBootstrapResult
    : null;

  const localizationSupport = bootstrapResult && bootstrapResult.localizationSupport
    ? bootstrapResult.localizationSupport
    : null;

  const localizationRuntimeEnvironment =
    bootstrapResult && bootstrapResult.localizationRuntimeEnvironment
      ? bootstrapResult.localizationRuntimeEnvironment
      : null;

  const localizationBridge = bootstrapResult && bootstrapResult.localizationBridge
    ? bootstrapResult.localizationBridge
    : null;

  const localizationFallbacks = bootstrapResult && bootstrapResult.localizationFallbacks
    ? bootstrapResult.localizationFallbacks
    : null;

  const inlineLocalizationFallbacks =
    bootstrapResult && bootstrapResult.inlineLocalizationFallbacks
      ? bootstrapResult.inlineLocalizationFallbacks
      : null;

  const localizationFallbackSupport =
    bootstrapResult && typeof bootstrapResult.localizationFallbackSupport !== 'undefined'
      ? bootstrapResult.localizationFallbackSupport
      : null;

  const createBasicLocalizationFallbackResolvers =
    bootstrapResult && typeof bootstrapResult.createBasicLocalizationFallbackResolvers === 'function'
      ? bootstrapResult.createBasicLocalizationFallbackResolvers
      : function createBasicLocalizationFallbackResolversProxy() {
          return null;
        };

  const localizationFallbackRegistry =
    bootstrapResult && bootstrapResult.localizationFallbackRegistry
      ? bootstrapResult.localizationFallbackRegistry
      : {
          createFallbackResolvers(fallbackOptions) {
            return createBasicLocalizationFallbackResolvers(fallbackOptions);
          },
        };

  const localizationFallbackResolvers =
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

  const localizationFallbackNamespace =
    bootstrapResult && typeof bootstrapResult.localizationFallbackNamespace !== 'undefined'
      ? bootstrapResult.localizationFallbackNamespace
      : null;

  const fallbackResolveLocaleModule =
    bootstrapResult && typeof bootstrapResult.fallbackResolveLocaleModule === 'function'
      ? bootstrapResult.fallbackResolveLocaleModule
      : function fallbackResolveLocaleModuleProxy() {
          return null;
        };

  const createLocaleFallbacks =
    bootstrapResult && typeof bootstrapResult.createLocaleFallbacks === 'function'
      ? bootstrapResult.createLocaleFallbacks
      : function createLocaleFallbacksProxy() {
          return null;
        };

  return {
    localizationBootstrapResult: bootstrapResult,
    localizationSupport,
    localizationRuntimeEnvironment,
    localizationBridge,
    localizationFallbacks,
    inlineLocalizationFallbacks,
    localizationFallbackSupport,
    createBasicLocalizationFallbackResolvers,
    localizationFallbackRegistry,
    localizationFallbackResolvers,
    localizationFallbackNamespace,
    fallbackResolveLocaleModule,
    createLocaleFallbacks,
  };
}

function createLocalizationBridge(options) {
  const bootstrapResult = resolveLocalizationBootstrapResult(options);
  return normaliseLocalisationOutputs(bootstrapResult);
}

const localisationBridgeExports = {
  createLocalizationBridge,
  resolveLocalizationBootstrapResult,
  normaliseLocalisationOutputs,
};

if (typeof module !== 'undefined' && module && module.exports) {
  module.exports = localisationBridgeExports;
}

const localisationGlobalScope =
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
