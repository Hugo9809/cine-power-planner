/* global resolveCoreSupportModule, CORE_PART1_RUNTIME_SCOPE,
          CORE_GLOBAL_SCOPE */
/* exported createInlineRuntimeSharedFallback, localizationBootstrapWiring */

/*
 * Extracted from app-core-new-1.js to keep module boundaries manageable.
 * The logic remains identical to protect autosave, offline, and localization behaviours.
 */

const APP_CORE_BOOTSTRAP_TOOLS = resolveCoreSupportModule(
  'cineCoreAppCoreBootstrap',
  './modules/app-core/bootstrap.js'
);

const APP_CORE_LOCALIZATION_RUNTIME_TOOLS = resolveCoreSupportModule(
  'cineCoreAppRuntimeLocalization',
  './modules/app-core/localization.js'
);

const APP_CORE_LOCALIZATION_SUPPORT_TOOLS = resolveCoreSupportModule(
  'cineCoreAppLocalizationSupport',
  './modules/app-core/localization.js'
);

const APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS = resolveCoreSupportModule(
  'cineCoreAppLocalizationBootstrap',
  './modules/app-core/localization.js'
);

const APP_CORE_BOOTSTRAP_RESOLVER_DIRECT = resolveCoreSupportModule(
  'cineCoreAppCoreBootstrapResolver',
  './modules/app-core/bootstrap.js'
);

const APP_CORE_BOOTSTRAP_FALLBACK_DIRECT = resolveCoreSupportModule(
  'cineCoreAppCoreBootstrapFallbacks',
  './modules/app-core/bootstrap.js'
);

const APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS_DIRECT = resolveCoreSupportModule(
  'cineCoreAppCoreBootstrapEnvironment',
  './modules/app-core/bootstrap.js'
);

const APP_CORE_BOOTSTRAP_RESULTS_TOOLS_DIRECT = resolveCoreSupportModule(
  'cineCoreAppCoreBootstrapResults',
  './modules/app-core/bootstrap.js'
);

const APP_CORE_BOOTSTRAP_SUITE =
  APP_CORE_BOOTSTRAP_TOOLS && typeof APP_CORE_BOOTSTRAP_TOOLS.createBootstrapSuite === 'function'
    ? APP_CORE_BOOTSTRAP_TOOLS.createBootstrapSuite({
        directResolverNamespace: APP_CORE_BOOTSTRAP_RESOLVER_DIRECT,
        directBootstrapNamespace: APP_CORE_BOOTSTRAP_TOOLS,
        directBootstrapFallbackNamespace: APP_CORE_BOOTSTRAP_FALLBACK_DIRECT,
        directBootstrapEnvironmentNamespace: APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS_DIRECT,
        directBootstrapResultsNamespace: APP_CORE_BOOTSTRAP_RESULTS_TOOLS_DIRECT,
        resolveCoreSupportModule,
        requireFn: typeof require === 'function' ? require : null,
        runtimeScope: getDefaultRuntimeScope(),
        coreGlobalScope: getDefaultCoreGlobalScope(),
      })
    : null;

const APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS =
  (APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapEnvironmentTools) ||
  APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS_DIRECT ||
  null;

const APP_CORE_BOOTSTRAP_RESULTS_TOOLS =
  (APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapResultsTools) ||
  APP_CORE_BOOTSTRAP_RESULTS_TOOLS_DIRECT ||
  null;

function getDefaultRuntimeScope() {
  return typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' && CORE_PART1_RUNTIME_SCOPE
    ? CORE_PART1_RUNTIME_SCOPE
    : null;
}

function getDefaultCoreGlobalScope() {
  return typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE
    ? CORE_GLOBAL_SCOPE
    : null;
}

const APP_CORE_BOOTSTRAP_ENVIRONMENT =
  (APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapEnvironment) ||
  (APP_CORE_BOOTSTRAP_SUITE &&
    typeof APP_CORE_BOOTSTRAP_SUITE.createBootstrapEnvironment === 'function'
    ? APP_CORE_BOOTSTRAP_SUITE.createBootstrapEnvironment({
        directResolverNamespace: APP_CORE_BOOTSTRAP_RESOLVER_DIRECT,
        directBootstrapNamespace:
          (APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapTools) ||
          APP_CORE_BOOTSTRAP_TOOLS,
        directBootstrapFallbackNamespace:
          (APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapFallbackTools) ||
          APP_CORE_BOOTSTRAP_FALLBACK_DIRECT,
        resolveCoreSupportModule,
        requireFn: typeof require === 'function' ? require : null,
        runtimeScope: getDefaultRuntimeScope(),
        coreGlobalScope: getDefaultCoreGlobalScope(),
      })
    : null) ||
  (APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS &&
    typeof APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS.createBootstrapEnvironment === 'function'
    ? APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS.createBootstrapEnvironment({
        directResolverNamespace: APP_CORE_BOOTSTRAP_RESOLVER_DIRECT,
        directBootstrapNamespace:
          (APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapTools) ||
          APP_CORE_BOOTSTRAP_TOOLS,
        directBootstrapFallbackNamespace:
          (APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapFallbackTools) ||
          APP_CORE_BOOTSTRAP_FALLBACK_DIRECT,
        resolveCoreSupportModule,
        requireFn: typeof require === 'function' ? require : null,
        runtimeScope: getDefaultRuntimeScope(),
        coreGlobalScope: getDefaultCoreGlobalScope(),
      })
    : null);

const APP_CORE_BOOTSTRAP_RESOLVER_TOOLS =
  (APP_CORE_BOOTSTRAP_SUITE &&
    APP_CORE_BOOTSTRAP_SUITE.bootstrapEnvironment &&
    APP_CORE_BOOTSTRAP_SUITE.bootstrapEnvironment.bootstrapResolverTools) ||
  (APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapResolverTools) ||
  APP_CORE_BOOTSTRAP_RESOLVER_DIRECT ||
  null;

const RESOLVED_APP_CORE_BOOTSTRAP_TOOLS =
  (APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapTools) ||
  (APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapTools) ||
  APP_CORE_BOOTSTRAP_TOOLS ||
  null;

const APP_CORE_BOOTSTRAP_FALLBACK_TOOLS =
  (APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapFallbackTools) ||
  (APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapFallbackTools) ||
  APP_CORE_BOOTSTRAP_FALLBACK_DIRECT ||
  null;

function buildBaseBootstrapInvocationOptions() {
  return {
    resolveCoreSupportModule,
    requireFn: typeof require === 'function' ? require : null,
    runtimeScope: getDefaultRuntimeScope(),
    coreGlobalScope: getDefaultCoreGlobalScope(),
    bootstrapSuite: APP_CORE_BOOTSTRAP_SUITE,
    bootstrapEnvironment:
      (APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapEnvironment) ||
      APP_CORE_BOOTSTRAP_ENVIRONMENT ||
      null,
    bootstrapEnvironmentTools:
      (APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapEnvironmentTools) ||
      APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS ||
      APP_CORE_BOOTSTRAP_ENVIRONMENT ||
      null,
    bootstrapResultsTools: APP_CORE_BOOTSTRAP_RESULTS_TOOLS,
    bootstrapResolverTools: APP_CORE_BOOTSTRAP_RESOLVER_TOOLS,
    bootstrapFallbackTools:
      (APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapFallbackTools) ||
      APP_CORE_BOOTSTRAP_FALLBACK_TOOLS ||
      null,
    fallbackTools: APP_CORE_BOOTSTRAP_FALLBACK_TOOLS,
    directBootstrapNamespace:
      (APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapTools) ||
      RESOLVED_APP_CORE_BOOTSTRAP_TOOLS ||
      APP_CORE_BOOTSTRAP_TOOLS ||
      null,
    directBootstrapFallbackNamespace: APP_CORE_BOOTSTRAP_FALLBACK_DIRECT,
    directBootstrapEnvironmentNamespace: APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS_DIRECT,
    directBootstrapResultsNamespace: APP_CORE_BOOTSTRAP_RESULTS_TOOLS_DIRECT,
  };
}

const BOOTSTRAP_INVOCATION_NORMALIZER =
  APP_CORE_BOOTSTRAP_TOOLS &&
  typeof APP_CORE_BOOTSTRAP_TOOLS.normalizeBootstrapInvocationOptions === 'function'
    ? APP_CORE_BOOTSTRAP_TOOLS.normalizeBootstrapInvocationOptions
    : null;

const BOOTSTRAP_FALLBACK_COLLECTOR =
  APP_CORE_BOOTSTRAP_TOOLS &&
  typeof APP_CORE_BOOTSTRAP_TOOLS.collectBootstrapFallbackScopes === 'function'
    ? APP_CORE_BOOTSTRAP_TOOLS.collectBootstrapFallbackScopes
    : null;

const BOOTSTRAP_INLINE_LOCALIZATION_CREATOR =
  APP_CORE_BOOTSTRAP_TOOLS &&
  typeof APP_CORE_BOOTSTRAP_TOOLS.createInlineLocalizationFallback === 'function'
    ? APP_CORE_BOOTSTRAP_TOOLS.createInlineLocalizationFallback
    : null;

const BOOTSTRAP_INLINE_RUNTIME_CREATOR =
  APP_CORE_BOOTSTRAP_TOOLS &&
  typeof APP_CORE_BOOTSTRAP_TOOLS.createInlineRuntimeSharedFallback === 'function'
    ? APP_CORE_BOOTSTRAP_TOOLS.createInlineRuntimeSharedFallback
    : null;

function normalizeBootstrapInvocationOptions(extraOptions) {
  const baseOptions = buildBaseBootstrapInvocationOptions();

  if (typeof BOOTSTRAP_INVOCATION_NORMALIZER === 'function') {
    try {
      return BOOTSTRAP_INVOCATION_NORMALIZER(baseOptions, extraOptions);
    } catch (bootstrapNormalizeError) {
      void bootstrapNormalizeError;
    }
  }

  const normalized = Object.assign({}, baseOptions);
  normalized.fallbackScopes = [];

  if (Array.isArray(extraOptions)) {
    normalized.fallbackScopes = extraOptions.slice();
    return normalized;
  }

  if (extraOptions && typeof extraOptions === 'object') {
    if (Array.isArray(extraOptions.fallbackScopes)) {
      normalized.fallbackScopes = extraOptions.fallbackScopes.slice();
    } else if (extraOptions.fallbackScopes) {
      normalized.fallbackScopes = [extraOptions.fallbackScopes];
    }

    if (extraOptions.runtimeScope && typeof extraOptions.runtimeScope === 'object') {
      normalized.runtimeScope = extraOptions.runtimeScope;
    }

    if (extraOptions.coreGlobalScope && typeof extraOptions.coreGlobalScope === 'object') {
      normalized.coreGlobalScope = extraOptions.coreGlobalScope;
    }

    const keys = Object.keys(extraOptions);
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];

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
  const invocationOptions = normalizeBootstrapInvocationOptions(extraScopes);

  if (typeof BOOTSTRAP_FALLBACK_COLLECTOR === 'function') {
    try {
      const collected = BOOTSTRAP_FALLBACK_COLLECTOR(invocationOptions);

      if (Array.isArray(collected)) {
        return collected;
      }
    } catch (bootstrapCollectorError) {
      void bootstrapCollectorError;
    }
  }

  if (
    APP_CORE_BOOTSTRAP_SUITE &&
    typeof APP_CORE_BOOTSTRAP_SUITE.collectBootstrapFallbackScopes === 'function'
  ) {
    try {
      const suiteCollected =
        APP_CORE_BOOTSTRAP_SUITE.collectBootstrapFallbackScopes(invocationOptions);

      if (Array.isArray(suiteCollected)) {
        return suiteCollected;
      }
    } catch (bootstrapSuiteCollectError) {
      void bootstrapSuiteCollectError;
    }
  }

  const bootstrapTools =
    (APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapTools) ||
    (APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapTools) ||
    RESOLVED_APP_CORE_BOOTSTRAP_TOOLS ||
    APP_CORE_BOOTSTRAP_TOOLS ||
    null;

  if (
    bootstrapTools &&
    typeof bootstrapTools.collectBootstrapFallbackScopes === 'function'
  ) {
    try {
      const collected = bootstrapTools.collectBootstrapFallbackScopes(invocationOptions);

      if (Array.isArray(collected)) {
        return collected;
      }
    } catch (bootstrapCollectError) {
      void bootstrapCollectError;
    }
  }

  const fallbackScopes = Array.isArray(invocationOptions.fallbackScopes)
    ? invocationOptions.fallbackScopes.slice()
    : [];

  function enqueue(scope) {
    if (!scope || typeof scope !== 'object') {
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
  const invocationOptions = normalizeBootstrapInvocationOptions(
    options && typeof options === 'object' ? options : null
  );

  if (typeof BOOTSTRAP_INLINE_LOCALIZATION_CREATOR === 'function') {
    try {
      const inlineResult = BOOTSTRAP_INLINE_LOCALIZATION_CREATOR(invocationOptions);

      if (inlineResult && typeof inlineResult === 'object') {
        return inlineResult;
      }
    } catch (bootstrapInlineLocalizationError) {
      void bootstrapInlineLocalizationError;
    }
  }

  if (
    APP_CORE_BOOTSTRAP_SUITE &&
    typeof APP_CORE_BOOTSTRAP_SUITE.createInlineLocalizationFallback === 'function'
  ) {
    try {
      const suiteInline =
        APP_CORE_BOOTSTRAP_SUITE.createInlineLocalizationFallback(invocationOptions);

      if (suiteInline && typeof suiteInline === 'object') {
        return suiteInline;
      }
    } catch (suiteInlineError) {
      void suiteInlineError;
    }
  }

  if (
    APP_CORE_BOOTSTRAP_ENVIRONMENT &&
    typeof APP_CORE_BOOTSTRAP_ENVIRONMENT.createInlineLocalizationFallback === 'function'
  ) {
    try {
      const environmentInline =
        APP_CORE_BOOTSTRAP_ENVIRONMENT.createInlineLocalizationFallback(invocationOptions);

      if (environmentInline && typeof environmentInline === 'object') {
        return environmentInline;
      }
    } catch (environmentInlineError) {
      void environmentInlineError;
    }
  }

  const bootstrapTools =
    (APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapTools) ||
    (APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapTools) ||
    RESOLVED_APP_CORE_BOOTSTRAP_TOOLS ||
    APP_CORE_BOOTSTRAP_TOOLS ||
    null;

  if (
    bootstrapTools &&
    typeof bootstrapTools.createInlineLocalizationFallback === 'function'
  ) {
    try {
      const bootstrapInline =
        bootstrapTools.createInlineLocalizationFallback(invocationOptions);

      if (bootstrapInline && typeof bootstrapInline === 'object') {
        return bootstrapInline;
      }
    } catch (bootstrapInlineError) {
      void bootstrapInlineError;
    }
  }

  const fallbackTools =
    invocationOptions.bootstrapFallbackTools ||
    APP_CORE_BOOTSTRAP_FALLBACK_TOOLS ||
    null;

  if (
    fallbackTools &&
    typeof fallbackTools.createLocalizationBootstrapFallback === 'function'
  ) {
    try {
      const fallbackResult = fallbackTools.createLocalizationBootstrapFallback(invocationOptions);

      if (fallbackResult && typeof fallbackResult === 'object') {
        return fallbackResult;
      }
    } catch (fallbackError) {
      void fallbackError;
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

  if (
    APP_CORE_BOOTSTRAP_TOOLS &&
    typeof APP_CORE_BOOTSTRAP_TOOLS.createLocalizationBootstrapFallback === 'function'
  ) {
    try {
      const bootstrapFallback = APP_CORE_BOOTSTRAP_TOOLS.createLocalizationBootstrapFallback();

      if (bootstrapFallback && typeof bootstrapFallback === 'object') {
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
}

function createInlineRuntimeSharedFallback(options) {
  const invocationOptions = normalizeBootstrapInvocationOptions(
    options && typeof options === 'object' ? options : null
  );

  if (typeof BOOTSTRAP_INLINE_RUNTIME_CREATOR === 'function') {
    try {
      const inlineResult = BOOTSTRAP_INLINE_RUNTIME_CREATOR(invocationOptions);

      if (inlineResult && typeof inlineResult === 'object') {
        return inlineResult;
      }
    } catch (bootstrapRuntimeInlineError) {
      void bootstrapRuntimeInlineError;
    }
  }

  if (
    APP_CORE_BOOTSTRAP_SUITE &&
    typeof APP_CORE_BOOTSTRAP_SUITE.createInlineRuntimeSharedFallback === 'function'
  ) {
    try {
      const suiteInline =
        APP_CORE_BOOTSTRAP_SUITE.createInlineRuntimeSharedFallback(invocationOptions);

      if (suiteInline && typeof suiteInline === 'object') {
        return suiteInline;
      }
    } catch (suiteRuntimeSharedInlineError) {
      void suiteRuntimeSharedInlineError;
    }
  }

  if (
    APP_CORE_BOOTSTRAP_ENVIRONMENT &&
    typeof APP_CORE_BOOTSTRAP_ENVIRONMENT.createInlineRuntimeSharedFallback === 'function'
  ) {
    try {
      const environmentInline =
        APP_CORE_BOOTSTRAP_ENVIRONMENT.createInlineRuntimeSharedFallback(invocationOptions);

      if (environmentInline && typeof environmentInline === 'object') {
        return environmentInline;
      }
    } catch (environmentRuntimeSharedError) {
      void environmentRuntimeSharedError;
    }
  }

  const bootstrapTools =
    (APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapTools) ||
    (APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapTools) ||
    RESOLVED_APP_CORE_BOOTSTRAP_TOOLS ||
    APP_CORE_BOOTSTRAP_TOOLS ||
    null;

  if (
    bootstrapTools &&
    typeof bootstrapTools.createInlineRuntimeSharedFallback === 'function'
  ) {
    try {
      const bootstrapInline =
        bootstrapTools.createInlineRuntimeSharedFallback(invocationOptions);

      if (bootstrapInline && typeof bootstrapInline === 'object') {
        return bootstrapInline;
      }
    } catch (bootstrapRuntimeSharedError) {
      void bootstrapRuntimeSharedError;
    }
  }

  const fallbackTools =
    invocationOptions.bootstrapFallbackTools ||
    APP_CORE_BOOTSTRAP_FALLBACK_TOOLS ||
    null;

  if (
    fallbackTools &&
    typeof fallbackTools.createRuntimeSharedBootstrapFallback === 'function'
  ) {
    try {
      const fallbackResult = fallbackTools.createRuntimeSharedBootstrapFallback(
        invocationOptions
      );

      if (fallbackResult && typeof fallbackResult === 'object') {
        return fallbackResult;
      }
    } catch (fallbackRuntimeSharedError) {
      void fallbackRuntimeSharedError;
    }
  }

  if (
    APP_CORE_BOOTSTRAP_RESULTS_TOOLS &&
    typeof APP_CORE_BOOTSTRAP_RESULTS_TOOLS.createRuntimeSharedFallbackSkeleton === 'function'
  ) {
    try {
      const skeleton = APP_CORE_BOOTSTRAP_RESULTS_TOOLS.createRuntimeSharedFallbackSkeleton({
        runtimeScope: invocationOptions.runtimeScope,
        coreGlobalScope: invocationOptions.coreGlobalScope,
        fallbackScopes: invocationOptions.fallbackScopes,
        currentRuntimeShared:
          invocationOptions.currentRuntimeShared &&
          typeof invocationOptions.currentRuntimeShared === 'object'
            ? invocationOptions.currentRuntimeShared
            : null,
      });

      if (skeleton && typeof skeleton === 'object') {
        return skeleton;
      }
    } catch (runtimeSharedSkeletonError) {
      void runtimeSharedSkeletonError;
    }
  }

  if (
    APP_CORE_BOOTSTRAP_TOOLS &&
    typeof APP_CORE_BOOTSTRAP_TOOLS.createRuntimeSharedBootstrapFallback === 'function'
  ) {
    try {
      const bootstrapFallback =
        APP_CORE_BOOTSTRAP_TOOLS.createRuntimeSharedBootstrapFallback(invocationOptions);

      if (bootstrapFallback && typeof bootstrapFallback === 'object') {
        return bootstrapFallback;
      }
    } catch (bootstrapRuntimeSharedFallbackError) {
      void bootstrapRuntimeSharedFallbackError;
    }
  }

  const fallbackScopes = Array.isArray(invocationOptions.fallbackScopes)
    ? invocationOptions.fallbackScopes
    : [];

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

  let runtimeShared =
    invocationOptions.currentRuntimeShared &&
    typeof invocationOptions.currentRuntimeShared === 'object'
      ? invocationOptions.currentRuntimeShared
      : null;

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

  return {
    runtimeSharedNamespace: null,
    runtimeSharedResolver: null,
    existingRuntimeShared: runtimeShared,
    runtimeShared,
    fallbackResolveRuntimeSharedFromGlobal,
  };
}

const localizationBootstrapResult = (function resolveLocalizationBootstrapResult() {
  const runtimeScope = getDefaultRuntimeScope();
  const coreGlobalScope = getDefaultCoreGlobalScope();
  const requireFn = typeof require === 'function' ? require : null;
  const fallbackScopes = collectBootstrapFallbackScopes({
    fallbackScopes: [],
    runtimeScope,
    coreGlobalScope,
  });

  const bootstrapTools = RESOLVED_APP_CORE_BOOTSTRAP_TOOLS;

  const moduleOptions = {
    bootstrapTools,
    bootstrapFallbackTools: APP_CORE_BOOTSTRAP_FALLBACK_TOOLS,
    localizationSupportTools: APP_CORE_LOCALIZATION_SUPPORT_TOOLS,
    localizationBootstrapTools: APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS,
    localizationRuntimeTools: APP_CORE_LOCALIZATION_RUNTIME_TOOLS,
    resolveCoreSupportModule,
    requireFn,
    runtimeScope,
    coreGlobalScope,
    fallbackScopes,
    collectFallbackScopes(scopes) {
      return collectBootstrapFallbackScopes({
        fallbackScopes: Array.isArray(scopes) ? scopes : [],
        runtimeScope,
        coreGlobalScope,
      });
    },
    createInlineLocalizationFallback,
    localizationFallbackOptions: null,
    currentLocalization: null,
  };

  if (
    APP_CORE_BOOTSTRAP_SUITE &&
    typeof APP_CORE_BOOTSTRAP_SUITE.createLocalizationBootstrapResult === 'function'
  ) {
    try {
      const suiteResolved = APP_CORE_BOOTSTRAP_SUITE.createLocalizationBootstrapResult(moduleOptions);

      if (suiteResolved && typeof suiteResolved === 'object') {
        return suiteResolved;
      }
    } catch (suiteLocalizationBootstrapError) {
      void suiteLocalizationBootstrapError;
    }
  }

  if (
    APP_CORE_BOOTSTRAP_RESULTS_TOOLS &&
    typeof APP_CORE_BOOTSTRAP_RESULTS_TOOLS.resolveLocalizationBootstrapResult === 'function'
  ) {
    try {
      const resolved = APP_CORE_BOOTSTRAP_RESULTS_TOOLS.resolveLocalizationBootstrapResult(
        moduleOptions
      );

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

  return createInlineLocalizationFallback(moduleOptions);
})();

function inlineLocalizationBootstrapWiring(bootstrapResult) {
  const localizationSupport =
    bootstrapResult && bootstrapResult.localizationSupport
      ? bootstrapResult.localizationSupport
      : null;

  const localizationRuntimeEnvironment =
    bootstrapResult && bootstrapResult.localizationRuntimeEnvironment
      ? bootstrapResult.localizationRuntimeEnvironment
      : null;

  const localizationBridge =
    bootstrapResult && bootstrapResult.localizationBridge
      ? bootstrapResult.localizationBridge
      : null;

  const localizationFallbacks =
    bootstrapResult && bootstrapResult.localizationFallbacks
      ? bootstrapResult.localizationFallbacks
      : null;

  const inlineLocalizationFallbacks =
    bootstrapResult && bootstrapResult.inlineLocalizationFallbacks
      ? bootstrapResult.inlineLocalizationFallbacks
      : null;

  const localizationFallbackSupport =
    bootstrapResult &&
    typeof bootstrapResult.localizationFallbackSupport !== 'undefined'
      ? bootstrapResult.localizationFallbackSupport
      : null;

  const createBasicLocalizationFallbackResolvers =
    bootstrapResult &&
    typeof bootstrapResult.createBasicLocalizationFallbackResolvers === 'function'
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
      : localizationFallbackRegistry &&
          typeof localizationFallbackRegistry.createFallbackResolvers === 'function'
        ? localizationFallbackRegistry.createFallbackResolvers({
            directNamespace: localizationFallbacks,
            inlineNamespace: inlineLocalizationFallbacks,
          })
        : createBasicLocalizationFallbackResolvers({
            directNamespace: localizationFallbacks,
            inlineNamespace: inlineLocalizationFallbacks,
          });

  const localizationFallbackNamespace =
    bootstrapResult &&
    typeof bootstrapResult.localizationFallbackNamespace !== 'undefined'
      ? bootstrapResult.localizationFallbackNamespace
      : null;

  const fallbackResolveLocaleModule =
    bootstrapResult &&
    typeof bootstrapResult.fallbackResolveLocaleModule === 'function'
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
    localizationBootstrapResult:
      bootstrapResult && typeof bootstrapResult === 'object' ? bootstrapResult : null,
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

const localizationBootstrapWiring =
  (APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS &&
    typeof APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS.createLocalizationBootstrapWiring === 'function' &&
    APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS.createLocalizationBootstrapWiring({
      localizationBootstrapResult,
    })) ||
  inlineLocalizationBootstrapWiring(localizationBootstrapResult);
