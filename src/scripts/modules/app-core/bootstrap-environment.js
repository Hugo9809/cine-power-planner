(function initAppCoreBootstrapEnvironment(globalScope) {
  'use strict';

  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function ensureArray(value) {
    return Array.isArray(value) ? value.slice() : [];
  }

  function registerScope(scopes, scope) {
    if (!isObject(scope)) {
      return;
    }

    if (scopes.indexOf(scope) === -1) {
      scopes.push(scope);
    }
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

  function collectFallbackScopes(options) {
    const runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    const coreGlobalScope = options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    const fallbackScopes = ensureArray(options && options.fallbackScopes);

    registerScope(fallbackScopes, runtimeScope);
    registerScope(fallbackScopes, coreGlobalScope);
    registerScope(fallbackScopes, typeof globalThis !== 'undefined' ? globalThis : null);
    registerScope(fallbackScopes, typeof window !== 'undefined' ? window : null);
    registerScope(fallbackScopes, typeof self !== 'undefined' ? self : null);
    registerScope(fallbackScopes, typeof global !== 'undefined' ? global : null);

    return fallbackScopes;
  }

  function hasBootstrapResolverCapabilities(candidate) {
    return (
      !!candidate &&
      typeof candidate === 'object' &&
      typeof candidate.resolveBootstrapTools === 'function' &&
      typeof candidate.resolveBootstrapFallbackTools === 'function' &&
      typeof candidate.createInlineLocalizationFallback === 'function' &&
      typeof candidate.createInlineRuntimeSharedFallback === 'function'
    );
  }

  function resolveBootstrapResolverTools(options) {
    const directResolverNamespace =
      options && isObject(options.directResolverNamespace)
        ? options.directResolverNamespace
        : null;

    if (hasBootstrapResolverCapabilities(directResolverNamespace)) {
      return directResolverNamespace;
    }

    const resolveCoreSupportModule =
      options && typeof options.resolveCoreSupportModule === 'function'
        ? options.resolveCoreSupportModule
        : null;

    if (resolveCoreSupportModule) {
      try {
        const resolved = resolveCoreSupportModule(
          'cineCoreAppCoreBootstrapResolver',
          './modules/app-core/bootstrap.js'
        );

        if (hasBootstrapResolverCapabilities(resolved)) {
          return resolved;
        }

        if (
          resolved &&
          isObject(resolved.cineCoreAppCoreBootstrapResolver) &&
          hasBootstrapResolverCapabilities(resolved.cineCoreAppCoreBootstrapResolver)
        ) {
          return resolved.cineCoreAppCoreBootstrapResolver;
        }
      } catch (resolveBootstrapResolverError) {
        void resolveBootstrapResolverError;
      }
    }

    const requireFn = ensureRequireFn(options && options.requireFn);

    if (typeof requireFn === 'function') {
      try {
        const requiredResolver = requireFn('./modules/app-core/bootstrap.js');

        if (hasBootstrapResolverCapabilities(requiredResolver)) {
          return requiredResolver;
        }

        if (
          requiredResolver &&
          isObject(requiredResolver.cineCoreAppCoreBootstrapResolver) &&
          hasBootstrapResolverCapabilities(requiredResolver.cineCoreAppCoreBootstrapResolver)
        ) {
          return requiredResolver.cineCoreAppCoreBootstrapResolver;
        }
      } catch (bootstrapResolverRequireError) {
        void bootstrapResolverRequireError;
      }
    }

    const fallbackScopes = collectFallbackScopes(options);

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];

      if (!scope || !isObject(scope)) {
        continue;
      }

      try {
        const resolverCandidate = scope.cineCoreAppCoreBootstrapResolver;

        if (hasBootstrapResolverCapabilities(resolverCandidate)) {
          return resolverCandidate;
        }

        const bootstrapCandidate = scope.cineCoreAppCoreBootstrap;

        if (hasBootstrapResolverCapabilities(bootstrapCandidate)) {
          return bootstrapCandidate;
        }
      } catch (bootstrapResolverLookupError) {
        void bootstrapResolverLookupError;
      }
    }

    return null;
  }

  function resolveBootstrapTools(options) {
    const resolverTools =
      options && isObject(options.bootstrapResolverTools)
        ? options.bootstrapResolverTools
        : null;

    if (resolverTools && typeof resolverTools.resolveBootstrapTools === 'function') {
      try {
        const resolved = resolverTools.resolveBootstrapTools(options);
        if (resolved && isObject(resolved)) {
          return resolved;
        }
      } catch (bootstrapResolveError) {
        void bootstrapResolveError;
      }
    }

    const directBootstrapNamespace =
      options && isObject(options.directBootstrapNamespace)
        ? options.directBootstrapNamespace
        : null;

    if (isObject(directBootstrapNamespace)) {
      return directBootstrapNamespace;
    }

    const resolveCoreSupportModule =
      options && typeof options.resolveCoreSupportModule === 'function'
        ? options.resolveCoreSupportModule
        : null;

    if (resolveCoreSupportModule) {
      try {
        const resolved = resolveCoreSupportModule(
          'cineCoreAppCoreBootstrap',
          './modules/app-core/bootstrap.js'
        );

        if (resolved && isObject(resolved)) {
          return resolved;
        }
      } catch (bootstrapSupportResolveError) {
        void bootstrapSupportResolveError;
      }
    }

    const requireFn = ensureRequireFn(options && options.requireFn);

    if (typeof requireFn === 'function') {
      try {
        const requiredBootstrap = requireFn('./modules/app-core/bootstrap.js');

        if (requiredBootstrap && isObject(requiredBootstrap)) {
          return requiredBootstrap;
        }
      } catch (bootstrapRequireError) {
        void bootstrapRequireError;
      }
    }

    const fallbackScopes = collectFallbackScopes(options);

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];

      if (!scope || !isObject(scope)) {
        continue;
      }

      try {
        const candidate = scope.cineCoreAppCoreBootstrap;

        if (candidate && isObject(candidate)) {
          return candidate;
        }
      } catch (bootstrapLookupError) {
        void bootstrapLookupError;
      }
    }

    return null;
  }

  function resolveBootstrapFallbackTools(options) {
    const resolverTools =
      options && isObject(options.bootstrapResolverTools)
        ? options.bootstrapResolverTools
        : null;

    if (resolverTools && typeof resolverTools.resolveBootstrapFallbackTools === 'function') {
      try {
        const resolved = resolverTools.resolveBootstrapFallbackTools(options);
        if (resolved && isObject(resolved)) {
          return resolved;
        }
      } catch (bootstrapFallbackResolveError) {
        void bootstrapFallbackResolveError;
      }
    }

    const directFallbackNamespace =
      options && isObject(options.directBootstrapFallbackNamespace)
        ? options.directBootstrapFallbackNamespace
        : null;

    if (directFallbackNamespace && isObject(directFallbackNamespace)) {
      return directFallbackNamespace;
    }

    const resolveCoreSupportModule =
      options && typeof options.resolveCoreSupportModule === 'function'
        ? options.resolveCoreSupportModule
        : null;

    if (resolveCoreSupportModule) {
      try {
        const resolved = resolveCoreSupportModule(
          'cineCoreAppCoreBootstrapFallbacks',
          './modules/app-core/bootstrap-fallbacks.js'
        );

        if (resolved && isObject(resolved)) {
          return resolved;
        }
      } catch (bootstrapFallbackSupportResolveError) {
        void bootstrapFallbackSupportResolveError;
      }
    }

    const requireFn = ensureRequireFn(options && options.requireFn);

    if (typeof requireFn === 'function') {
      try {
        const requiredFallback = requireFn('./modules/app-core/bootstrap-fallbacks.js');

        if (requiredFallback && isObject(requiredFallback)) {
          return requiredFallback;
        }
      } catch (bootstrapFallbackRequireError) {
        void bootstrapFallbackRequireError;
      }
    }

    const fallbackScopes = collectFallbackScopes(options);

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];

      if (!scope || !isObject(scope)) {
        continue;
      }

      try {
        const candidate = scope.cineCoreAppCoreBootstrapFallbacks;

        if (candidate && isObject(candidate)) {
          return candidate;
        }
      } catch (bootstrapFallbackLookupError) {
        void bootstrapFallbackLookupError;
      }
    }

    return null;
  }

  function createInlineLocalizationFallback(options) {
    const resolverTools =
      options && isObject(options.bootstrapResolverTools)
        ? options.bootstrapResolverTools
        : null;

    if (resolverTools && typeof resolverTools.createInlineLocalizationFallback === 'function') {
      try {
        const generated = resolverTools.createInlineLocalizationFallback(options);

        if (generated && isObject(generated)) {
          return generated;
        }
      } catch (localizationFallbackResolveError) {
        void localizationFallbackResolveError;
      }
    }

    const fallbackTools = options && isObject(options.fallbackTools) ? options.fallbackTools : null;

    if (
      fallbackTools &&
      typeof fallbackTools.createLocalizationBootstrapFallback === 'function'
    ) {
      try {
        const fallbackResult = fallbackTools.createLocalizationBootstrapFallback(options);

        if (fallbackResult && isObject(fallbackResult)) {
          return fallbackResult;
        }
      } catch (localizationFallbackError) {
        void localizationFallbackError;
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
    const resolverTools =
      options && isObject(options.bootstrapResolverTools)
        ? options.bootstrapResolverTools
        : null;

    if (resolverTools && typeof resolverTools.createInlineRuntimeSharedFallback === 'function') {
      try {
        const generated = resolverTools.createInlineRuntimeSharedFallback(options);

        if (generated && isObject(generated)) {
          return generated;
        }
      } catch (runtimeSharedFallbackResolveError) {
        void runtimeSharedFallbackResolveError;
      }
    }

    const fallbackTools = options && isObject(options.fallbackTools) ? options.fallbackTools : null;

    if (
      fallbackTools &&
      typeof fallbackTools.createRuntimeSharedBootstrapFallback === 'function'
    ) {
      try {
        const moduleFallback = fallbackTools.createRuntimeSharedBootstrapFallback(options);

        if (moduleFallback && isObject(moduleFallback)) {
          return moduleFallback;
        }
      } catch (runtimeSharedFallbackError) {
        void runtimeSharedFallbackError;
      }
    }

    const fallbackScopes = collectFallbackScopes(options);

    function fallbackResolveRuntimeSharedFromGlobal() {
      for (let index = 0; index < fallbackScopes.length; index += 1) {
        const scope = fallbackScopes[index];

        if (!scope || !isObject(scope)) {
          continue;
        }

        try {
          const candidate = scope.cineCoreRuntimeShared;

          if (candidate && isObject(candidate)) {
            return candidate;
          }
        } catch (runtimeSharedLookupError) {
          void runtimeSharedLookupError;
        }
      }

      return null;
    }

    let runtimeShared =
      options && isObject(options.currentRuntimeShared)
        ? options.currentRuntimeShared
        : null;

    if (!runtimeShared) {
      runtimeShared = fallbackResolveRuntimeSharedFromGlobal();
    }

    if (!runtimeShared || !isObject(runtimeShared)) {
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

  function createBootstrapEnvironment(options) {
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    const coreGlobalScope =
      options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    const fallbackScopes = collectFallbackScopes({
      runtimeScope,
      coreGlobalScope,
      fallbackScopes: options && options.fallbackScopes,
    });

    const resolverTools = resolveBootstrapResolverTools({
      directResolverNamespace: options && options.directResolverNamespace,
      resolveCoreSupportModule: options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
      fallbackScopes,
    });

    const bootstrapTools = resolveBootstrapTools({
      directBootstrapNamespace: options && options.directBootstrapNamespace,
      bootstrapResolverTools: resolverTools,
      resolveCoreSupportModule: options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
      fallbackScopes,
    });

    const bootstrapFallbackTools = resolveBootstrapFallbackTools({
      directBootstrapFallbackNamespace: options && options.directBootstrapFallbackNamespace,
      bootstrapResolverTools: resolverTools,
      resolveCoreSupportModule: options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
      fallbackScopes,
    });

    function createInlineLocalizationFallbackWithEnvironment() {
      return createInlineLocalizationFallback({
        bootstrapResolverTools: resolverTools,
        fallbackTools: bootstrapFallbackTools,
        resolveCoreSupportModule: options && options.resolveCoreSupportModule,
        requireFn,
        runtimeScope,
        coreGlobalScope,
        fallbackScopes,
      });
    }

    function createInlineRuntimeSharedFallbackWithEnvironment(runtimeSharedOptions) {
      const runtimeSharedFallbackScopes =
        runtimeSharedOptions && runtimeSharedOptions.fallbackScopes
          ? runtimeSharedOptions.fallbackScopes
          : fallbackScopes;

      return createInlineRuntimeSharedFallback({
        bootstrapResolverTools: resolverTools,
        fallbackTools: bootstrapFallbackTools,
        resolveCoreSupportModule: options && options.resolveCoreSupportModule,
        requireFn,
        runtimeScope,
        coreGlobalScope,
        fallbackScopes: runtimeSharedFallbackScopes,
        currentRuntimeShared:
          runtimeSharedOptions && isObject(runtimeSharedOptions.currentRuntimeShared)
            ? runtimeSharedOptions.currentRuntimeShared
            : null,
      });
    }

    function collectAdditionalFallbackScopes(extraScopes) {
      return collectFallbackScopes({
        runtimeScope,
        coreGlobalScope,
        fallbackScopes: extraScopes,
      });
    }

    return {
      fallbackScopes,
      bootstrapResolverTools: resolverTools,
      bootstrapTools,
      bootstrapFallbackTools,
      createInlineLocalizationFallback: createInlineLocalizationFallbackWithEnvironment,
      createInlineRuntimeSharedFallback: createInlineRuntimeSharedFallbackWithEnvironment,
      collectFallbackScopes: collectAdditionalFallbackScopes,
    };
  }

  const namespace = {
    createBootstrapEnvironment,
    resolveBootstrapResolverTools,
    resolveBootstrapTools,
    resolveBootstrapFallbackTools,
    createInlineLocalizationFallback,
    createInlineRuntimeSharedFallback,
    collectFallbackScopes,
  };

  const namespaceName = 'cineCoreAppCoreBootstrapEnvironment';
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
