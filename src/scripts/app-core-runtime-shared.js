/*
 * Extracted from app-core-new-1.js to keep module boundaries manageable.
 * The logic remains identical to protect autosave, offline, and localization behaviours.
 */

const CORE_RUNTIME_SHARED_NAMESPACE_TOOLS = (function resolveRuntimeSharedNamespaceTools() {
  const runtimeScope =
    typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' && CORE_PART1_RUNTIME_SCOPE
      ? CORE_PART1_RUNTIME_SCOPE
      : null;
  const globalScope =
    typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : null;

  const fallbacks = [
    runtimeScope,
    globalScope,
    typeof globalThis !== 'undefined' ? globalThis : null,
    typeof window !== 'undefined' ? window : null,
    typeof self !== 'undefined' ? self : null,
    typeof global !== 'undefined' ? global : null,
  ];

  for (let index = 0; index < fallbacks.length; index += 1) {
    const scope = fallbacks[index];

    if (!scope || typeof scope !== 'object') {
      continue;
    }

    try {
      const existing = scope.CORE_RUNTIME_SHARED_NAMESPACE_TOOLS;
      if (existing && typeof existing === 'object') {
        return existing;
      }
    } catch (namespaceLookupError) {
      void namespaceLookupError;
    }
  }

  const resolved = resolveCoreSupportModule(
    'cineCoreAppRuntimeSharedNamespace',
    './modules/app-core/runtime.js'
  );

  const targets = [runtimeScope, globalScope];
  for (let index = 0; index < targets.length; index += 1) {
    const target = targets[index];
    if (!target || typeof target !== 'object') {
      continue;
    }

    try {
      if (typeof target.CORE_RUNTIME_SHARED_NAMESPACE_TOOLS === 'undefined') {
        Object.defineProperty(target, 'CORE_RUNTIME_SHARED_NAMESPACE_TOOLS', {
          configurable: true,
          writable: true,
          value: resolved,
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
})();

const RUNTIME_SHARED_BOOTSTRAP_TOOLS = resolveCoreSupportModule(
  'cineCoreAppRuntimeSharedBootstrap',
  './modules/app-core/runtime.js'
);

const LOCALIZATION_ACCESSORS_TOOLS = resolveCoreSupportModule(
  'cineCoreAppLocalizationAccessors',
  './modules/app-core/localization.js'
);

const RUNTIME_SHARED_BOOTSTRAP_INLINE_TOOLS = resolveCoreSupportModule(
  'cineCoreAppRuntimeSharedBootstrapInline',
  './modules/app-core/runtime.js'
);

const RUNTIME_SHARED_BOOTSTRAP_RESULT_TOOLS = resolveCoreSupportModule(
  'cineCoreAppRuntimeSharedBootstrapResult',
  './modules/app-core/runtime.js'
);

const RUNTIME_SHARED_BOOTSTRAP_LOADER_TOOLS = resolveCoreSupportModule(
  'cineCoreAppRuntimeSharedBootstrapLoader',
  './modules/app-core/runtime.js'
);

const RUNTIME_SHARED_BOOTSTRAP_MANAGER_TOOLS = resolveCoreSupportModule(
  'cineCoreAppRuntimeSharedBootstrapManager',
  './modules/app-core/runtime.js'
);

const RUNTIME_SHARED_BOOTSTRAP_RESOLVER_TOOLS = resolveCoreSupportModule(
  'cineCoreAppRuntimeSharedBootstrapResolver',
  './modules/app-core/runtime.js'
);

const RUNTIME_SHARED_BOOTSTRAP_CONTEXT_TOOLS = resolveCoreSupportModule(
  'cineCoreAppRuntimeSharedBootstrapContext',
  './modules/app-core/runtime.js'
);

const runtimeSharedBootstrapResult = (function resolveRuntimeSharedBootstrapResult() {
  const runtimeScope = getDefaultRuntimeScope();
  const coreGlobalScope = getDefaultCoreGlobalScope();
  const requireFn = typeof require === 'function' ? require : null;
  const currentRuntimeShared =
    typeof CORE_RUNTIME_SHARED !== 'undefined' && CORE_RUNTIME_SHARED ? CORE_RUNTIME_SHARED : null;
  const fallbackScopes = collectBootstrapFallbackScopes({
    fallbackScopes: [],
    runtimeScope,
    coreGlobalScope,
  });

  const bootstrapTools = RESOLVED_APP_CORE_BOOTSTRAP_TOOLS;

  const moduleOptions = {
    bootstrapTools,
    bootstrapFallbackTools: APP_CORE_BOOTSTRAP_FALLBACK_TOOLS,
    runtimeSharedBootstrapResolverTools: RUNTIME_SHARED_BOOTSTRAP_RESOLVER_TOOLS,
    runtimeSharedBootstrapTools: RUNTIME_SHARED_BOOTSTRAP_TOOLS,
    runtimeSharedNamespaceTools: CORE_RUNTIME_SHARED_NAMESPACE_TOOLS,
    runtimeSharedBootstrapInlineTools: RUNTIME_SHARED_BOOTSTRAP_INLINE_TOOLS,
    runtimeSharedBootstrapResultTools: RUNTIME_SHARED_BOOTSTRAP_RESULT_TOOLS,
    runtimeSharedBootstrapLoaderTools: RUNTIME_SHARED_BOOTSTRAP_LOADER_TOOLS,
    runtimeSharedBootstrapManagerTools: RUNTIME_SHARED_BOOTSTRAP_MANAGER_TOOLS,
    resolveCoreSupportModule,
    requireFn,
    runtimeScope,
    coreGlobalScope,
    currentRuntimeShared,
    fallbackScopes,
    collectFallbackScopes(scopes) {
      return collectBootstrapFallbackScopes({
        fallbackScopes: Array.isArray(scopes) ? scopes : [],
        runtimeScope,
        coreGlobalScope,
      });
    },
    createInlineRuntimeSharedFallback,
    runtimeSharedBootstrapInlineRequirePath: null,
    runtimeSharedBootstrapResultRequirePath: null,
  };

  if (
    APP_CORE_BOOTSTRAP_SUITE &&
    typeof APP_CORE_BOOTSTRAP_SUITE.createRuntimeSharedBootstrapResult === 'function'
  ) {
    try {
      const suiteResolved = APP_CORE_BOOTSTRAP_SUITE.createRuntimeSharedBootstrapResult(moduleOptions);

      if (suiteResolved && typeof suiteResolved === 'object') {
        return suiteResolved;
      }
    } catch (suiteRuntimeSharedResultError) {
      void suiteRuntimeSharedResultError;
    }
  }

  if (
    APP_CORE_BOOTSTRAP_RESULTS_TOOLS &&
    typeof APP_CORE_BOOTSTRAP_RESULTS_TOOLS.resolveRuntimeSharedBootstrapResult === 'function'
  ) {
    try {
      const resolved = APP_CORE_BOOTSTRAP_RESULTS_TOOLS.resolveRuntimeSharedBootstrapResult(
        moduleOptions
      );

      if (resolved && typeof resolved === 'object') {
        return resolved;
      }
    } catch (runtimeSharedBootstrapResultResolveError) {
      void runtimeSharedBootstrapResultResolveError;
    }
  }

  if (bootstrapTools && typeof bootstrapTools.createRuntimeSharedBootstrapResult === 'function') {
    try {
      const resolved = bootstrapTools.createRuntimeSharedBootstrapResult(moduleOptions);

      if (resolved && typeof resolved === 'object') {
        return resolved;
      }
    } catch (runtimeSharedBootstrapError) {
      void runtimeSharedBootstrapError;
    }
  }

  if (bootstrapTools && typeof bootstrapTools.createRuntimeSharedBootstrapFallback === 'function') {
    try {
      const fallbackResult = bootstrapTools.createRuntimeSharedBootstrapFallback(moduleOptions);

      if (fallbackResult && typeof fallbackResult === 'object') {
        return fallbackResult;
      }
    } catch (runtimeSharedBootstrapFallbackError) {
      void runtimeSharedBootstrapFallbackError;
    }
  }

  return createInlineRuntimeSharedFallback(moduleOptions);
})();

const CORE_RUNTIME_SHARED_NAMESPACE =
  runtimeSharedBootstrapResult && runtimeSharedBootstrapResult.runtimeSharedNamespace
    ? runtimeSharedBootstrapResult.runtimeSharedNamespace
    : null;

const CORE_RUNTIME_SHARED_RESOLVER =
  runtimeSharedBootstrapResult &&
  typeof runtimeSharedBootstrapResult.runtimeSharedResolver === 'function'
    ? runtimeSharedBootstrapResult.runtimeSharedResolver
    : null;

const EXISTING_CORE_RUNTIME_SHARED =
  (runtimeSharedBootstrapResult &&
  runtimeSharedBootstrapResult.existingRuntimeShared &&
  typeof runtimeSharedBootstrapResult.existingRuntimeShared === 'object'
    ? runtimeSharedBootstrapResult.existingRuntimeShared
    : null) ||
  (typeof CORE_RUNTIME_SHARED !== 'undefined' && CORE_RUNTIME_SHARED
    ? CORE_RUNTIME_SHARED
    : null);

const fallbackResolveRuntimeSharedFromGlobal =
  runtimeSharedBootstrapResult &&
  typeof runtimeSharedBootstrapResult.fallbackResolveRuntimeSharedFromGlobal ===
    'function'
    ? runtimeSharedBootstrapResult.fallbackResolveRuntimeSharedFromGlobal
    : function fallbackResolveRuntimeSharedFromGlobal() {
        return null;
      };

var CORE_RUNTIME_SHARED =
  (runtimeSharedBootstrapResult &&
  runtimeSharedBootstrapResult.runtimeShared &&
  typeof runtimeSharedBootstrapResult.runtimeShared === 'object'
    ? runtimeSharedBootstrapResult.runtimeShared
    : null) ||
  (EXISTING_CORE_RUNTIME_SHARED && typeof EXISTING_CORE_RUNTIME_SHARED === 'object'
    ? EXISTING_CORE_RUNTIME_SHARED
    : null) ||
  (CORE_RUNTIME_SHARED_RESOLVER
    ? (function resolveRuntimeSharedWithResolver() {
        try {
          const resolved = CORE_RUNTIME_SHARED_RESOLVER({
            currentShared: EXISTING_CORE_RUNTIME_SHARED,
            resolveCoreSupportModule,
            requireFn: typeof require === 'function' ? require : null,
            runtimeScope:
              typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' ? CORE_PART1_RUNTIME_SCOPE : null,
            coreGlobalScope: typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null,
          });

          if (resolved && typeof resolved === 'object') {
            return resolved;
          }
        } catch (runtimeSharedResolverError) {
          void runtimeSharedResolverError;
        }

        return null;
      })()
    : null) ||
  fallbackResolveRuntimeSharedFromGlobal() ||
  Object.create(null);


