(function initAppCoreBootstrapModule(globalScope) {
  'use strict';

  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function ensureRequireFn(candidate) {
    if (typeof candidate === 'function') {
      return candidate;
    }

    if (typeof require === 'function') {
      return require;
    }

    return null;
  }

  function ensureArray(value) {
    return Array.isArray(value) ? value.slice() : [];
  }

  function appendFallbackScopes(scopes, runtimeScope, coreGlobalScope) {
    if (!Array.isArray(scopes)) {
      return [];
    }

    const list = scopes.slice();

    if (runtimeScope && isObject(runtimeScope) && list.indexOf(runtimeScope) === -1) {
      list.push(runtimeScope);
    }

    if (coreGlobalScope && isObject(coreGlobalScope) && list.indexOf(coreGlobalScope) === -1) {
      list.push(coreGlobalScope);
    }

    const globalCandidates = [
      typeof globalThis !== 'undefined' ? globalThis : null,
      typeof window !== 'undefined' ? window : null,
      typeof self !== 'undefined' ? self : null,
      typeof global !== 'undefined' ? global : null,
    ];

    for (let index = 0; index < globalCandidates.length; index += 1) {
      const scope = globalCandidates[index];

      if (!scope || !isObject(scope)) {
        continue;
      }

      if (list.indexOf(scope) === -1) {
        list.push(scope);
      }
    }

    return list;
  }

  function createLocalizationBootstrapFallback() {
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

  function createLocalizationBootstrapResult(options) {
    const localizationSupportTools =
      options && isObject(options.localizationSupportTools)
        ? options.localizationSupportTools
        : null;
    const localizationBootstrapTools =
      options && isObject(options.localizationBootstrapTools)
        ? options.localizationBootstrapTools
        : null;
    const localizationRuntimeTools =
      options && isObject(options.localizationRuntimeTools)
        ? options.localizationRuntimeTools
        : null;
    const resolveCoreSupportModule =
      options && typeof options.resolveCoreSupportModule === 'function'
        ? options.resolveCoreSupportModule
        : null;
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    const coreGlobalScope =
      options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    const fallbackScopes = appendFallbackScopes(
      ensureArray(options && options.fallbackScopes),
      runtimeScope,
      coreGlobalScope
    );

    function attempt(factory, factoryOptions) {
      if (typeof factory !== 'function') {
        return null;
      }

      try {
        const result = factory(factoryOptions);
        return result && typeof result === 'object' ? result : null;
      } catch (error) {
        void error;
      }

      return null;
    }

    const resolverOptions = {
      localizationSupportTools,
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
      fallbackScopes,
    };

    let result = attempt(
      localizationBootstrapTools &&
        localizationBootstrapTools.createLocalizationBootstrapResult,
      resolverOptions
    );

    if (!result) {
      result = attempt(localizationRuntimeTools && localizationRuntimeTools.resolveRuntimeLocalization, {
        currentLocalization: options && options.currentLocalization,
        resolveCoreSupportModule,
        requireFn,
        runtimeScope,
        coreGlobalScope,
        fallbackScopes,
      });
    }

    if (!result) {
      result = attempt(
        localizationRuntimeTools &&
          localizationRuntimeTools.createFallbackLocalizationRuntimeSetup,
        {
          currentLocalization: options && options.currentLocalization,
          resolveCoreSupportModule,
          requireFn,
          runtimeScope,
          coreGlobalScope,
          fallbackScopes,
        }
      );
    }

    if (!result) {
      result = createLocalizationBootstrapFallback();
    }

    return result;
  }

  function createRuntimeSharedBootstrapFallback(options) {
    const runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    const coreGlobalScope =
      options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    const fallbackScopes = appendFallbackScopes(
      ensureArray(options && options.fallbackScopes),
      runtimeScope,
      coreGlobalScope
    );
    const currentRuntimeShared =
      options && isObject(options.currentRuntimeShared)
        ? options.currentRuntimeShared
        : null;

    function fallbackResolveRuntimeSharedFromGlobal() {
      for (let index = 0; index < fallbackScopes.length; index += 1) {
        const scope = fallbackScopes[index];

        if (!scope || !isObject(scope)) {
          continue;
        }

        try {
          const candidate = scope.cineCoreRuntimeShared;
          if (candidate && typeof candidate === 'object') {
            return candidate;
          }
        } catch (lookupError) {
          void lookupError;
        }
      }

      return null;
    }

    let runtimeShared = currentRuntimeShared;

    if (!runtimeShared || typeof runtimeShared !== 'object') {
      runtimeShared = fallbackResolveRuntimeSharedFromGlobal();
    }

    if (!runtimeShared || typeof runtimeShared !== 'object') {
      try {
        runtimeShared = Object.create(null);
      } catch (creationError) {
        void creationError;
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

  function createRuntimeSharedBootstrapResult(options) {
    const runtimeSharedBootstrapResolverTools =
      options && isObject(options.runtimeSharedBootstrapResolverTools)
        ? options.runtimeSharedBootstrapResolverTools
        : null;
    const runtimeSharedBootstrapTools =
      options && isObject(options.runtimeSharedBootstrapTools)
        ? options.runtimeSharedBootstrapTools
        : null;
    const runtimeSharedNamespaceTools =
      options && isObject(options.runtimeSharedNamespaceTools)
        ? options.runtimeSharedNamespaceTools
        : null;
    const runtimeSharedBootstrapInlineTools =
      options && isObject(options.runtimeSharedBootstrapInlineTools)
        ? options.runtimeSharedBootstrapInlineTools
        : null;
    const runtimeSharedBootstrapResultTools =
      options && isObject(options.runtimeSharedBootstrapResultTools)
        ? options.runtimeSharedBootstrapResultTools
        : null;
    const runtimeSharedBootstrapLoaderTools =
      options && isObject(options.runtimeSharedBootstrapLoaderTools)
        ? options.runtimeSharedBootstrapLoaderTools
        : null;
    const runtimeSharedBootstrapManagerTools =
      options && isObject(options.runtimeSharedBootstrapManagerTools)
        ? options.runtimeSharedBootstrapManagerTools
        : null;
    const resolveCoreSupportModule =
      options && typeof options.resolveCoreSupportModule === 'function'
        ? options.resolveCoreSupportModule
        : null;
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    const coreGlobalScope =
      options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    const fallbackScopes = appendFallbackScopes(
      ensureArray(options && options.fallbackScopes),
      runtimeScope,
      coreGlobalScope
    );
    const currentRuntimeShared =
      options && isObject(options.currentRuntimeShared)
        ? options.currentRuntimeShared
        : null;

    function attempt(factory, factoryOptions) {
      if (typeof factory !== 'function') {
        return null;
      }

      try {
        const result = factory(factoryOptions);
        return result && typeof result === 'object' ? result : null;
      } catch (error) {
        void error;
      }

      return null;
    }

    const resolverOptions = {
      runtimeSharedBootstrapTools,
      runtimeSharedNamespaceTools,
      runtimeSharedBootstrapInlineTools,
      runtimeSharedBootstrapResultTools,
      runtimeSharedBootstrapLoaderTools,
      runtimeSharedBootstrapManagerTools,
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
      currentRuntimeShared,
      fallbackScopes,
    };

    let result = attempt(
      runtimeSharedBootstrapResolverTools &&
        runtimeSharedBootstrapResolverTools.createRuntimeSharedBootstrapResult,
      resolverOptions
    );

    if (!result) {
      result = attempt(
        runtimeSharedBootstrapLoaderTools &&
          runtimeSharedBootstrapLoaderTools.resolveRuntimeSharedBootstrapResult,
        {
          bootstrapOptions: resolverOptions,
          runtimeSharedBootstrapInlineTools,
          resultTools: runtimeSharedBootstrapResultTools,
          requireFn,
          inlineRequirePath: options && options.runtimeSharedBootstrapInlineRequirePath,
          resultModulePath: options && options.runtimeSharedBootstrapResultRequirePath,
        }
      );
    }

    if (!result) {
      result = attempt(
        runtimeSharedBootstrapResultTools &&
          runtimeSharedBootstrapResultTools.createRuntimeSharedBootstrapResult,
        {
          bootstrapOptions: {
            runtimeSharedBootstrapTools,
            runtimeSharedNamespaceTools,
            resolveCoreSupportModule,
            requireFn,
            runtimeScope,
            coreGlobalScope,
            currentRuntimeShared,
            fallbackScopes,
          },
          runtimeSharedBootstrapInlineTools,
          requireFn,
          inlineRequirePath: options && options.runtimeSharedBootstrapInlineRequirePath,
        }
      );
    }

    if (!result && runtimeSharedBootstrapResultTools) {
      result = attempt(
        runtimeSharedBootstrapResultTools.createRuntimeSharedBootstrapInlineFallback,
        {
          runtimeScope,
          coreGlobalScope,
          fallbackScopes,
          currentRuntimeShared,
        }
      );
    }

    if (!result) {
      result = createRuntimeSharedBootstrapFallback({
        runtimeScope,
        coreGlobalScope,
        fallbackScopes,
        currentRuntimeShared,
      });
    }

    return result;
  }

  const namespace = {
    createLocalizationBootstrapResult,
    createLocalizationBootstrapFallback,
    createRuntimeSharedBootstrapResult,
    createRuntimeSharedBootstrapFallback,
  };

  const namespaceName = 'cineCoreAppCoreBootstrap';
  const existing = isObject(globalScope) && isObject(globalScope[namespaceName])
    ? globalScope[namespaceName]
    : {};

  Object.assign(existing, namespace);

  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = existing;
  }
})(
  (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof self !== 'undefined' && self) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    null
);
