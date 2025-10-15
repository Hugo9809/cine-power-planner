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

  function registerScope(scopes, scope) {
    if (!scope || !isObject(scope)) {
      return;
    }

    if (Array.isArray(scopes) && scopes.indexOf(scope) === -1) {
      scopes.push(scope);
    }
  }

  function attemptFactory(factory, factoryOptions) {
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

  function collectBootstrapFallbackScopes(options) {
    const runtimeScope =
      options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    const coreGlobalScope =
      options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    const fallbackScopeList = ensureArray(options && options.fallbackScopes);
    const bootstrapEnvironmentTools = getBootstrapEnvironmentTools(options);
    const bootstrapResultsTools = getBootstrapResultsTools(options);

    if (
      bootstrapResultsTools &&
      typeof bootstrapResultsTools.collectBootstrapFallbackScopes === 'function'
    ) {
      const collectAdditionalFallbackScopes =
        bootstrapEnvironmentTools &&
        typeof bootstrapEnvironmentTools.collectFallbackScopes === 'function'
          ? function collectAdditionalFallbackScopes(scopes) {
              try {
                const collected = bootstrapEnvironmentTools.collectFallbackScopes({
                  fallbackScopes: Array.isArray(scopes) ? scopes : ensureArray(scopes),
                  runtimeScope,
                  coreGlobalScope,
                });

                if (Array.isArray(collected)) {
                  return collected;
                }
              } catch (environmentCollectError) {
                void environmentCollectError;
              }

              if (Array.isArray(scopes)) {
                try {
                  const legacyCollected = bootstrapEnvironmentTools.collectFallbackScopes(scopes);

                  if (Array.isArray(legacyCollected)) {
                    return legacyCollected;
                  }
                } catch (legacyEnvironmentCollectError) {
                  void legacyEnvironmentCollectError;
                }
              }

              return null;
            }
          : null;

      try {
        const collected = bootstrapResultsTools.collectBootstrapFallbackScopes({
          fallbackScopes: fallbackScopeList,
          runtimeScope,
          coreGlobalScope,
          collectFallbackScopes: collectAdditionalFallbackScopes,
        });

        if (Array.isArray(collected)) {
          return collected;
        }
      } catch (resultsCollectError) {
        void resultsCollectError;
      }
    }

    if (
      bootstrapEnvironmentTools &&
      typeof bootstrapEnvironmentTools.collectFallbackScopes === 'function'
    ) {
      try {
        const environmentCollected = bootstrapEnvironmentTools.collectFallbackScopes({
          fallbackScopes: fallbackScopeList,
          runtimeScope,
          coreGlobalScope,
        });

        if (Array.isArray(environmentCollected)) {
          return environmentCollected;
        }
      } catch (environmentCollectError) {
        void environmentCollectError;
      }

      if (Array.isArray(fallbackScopeList)) {
        try {
          const legacyEnvironmentCollected =
            bootstrapEnvironmentTools.collectFallbackScopes(fallbackScopeList);

          if (Array.isArray(legacyEnvironmentCollected)) {
            return legacyEnvironmentCollected;
          }
        } catch (legacyEnvironmentCollectError) {
          void legacyEnvironmentCollectError;
        }
      }
    }

    return appendFallbackScopes(fallbackScopeList, runtimeScope, coreGlobalScope);
  }

  function getBootstrapEnvironmentTools(options) {
    if (options && isObject(options.bootstrapEnvironmentTools)) {
      return options.bootstrapEnvironmentTools;
    }

    if (options && isObject(options.bootstrapEnvironment)) {
      return options.bootstrapEnvironment;
    }

    return resolveBootstrapEnvironmentTools(options);
  }

  function getBootstrapResultsTools(options) {
    if (options && isObject(options.bootstrapResultsTools)) {
      return options.bootstrapResultsTools;
    }

    if (options && isObject(options.resultsTools)) {
      return options.resultsTools;
    }

    return resolveBootstrapResultsTools(options);
  }

  function getBootstrapFallbackTools(options) {
    if (options && isObject(options.bootstrapFallbackTools)) {
      return options.bootstrapFallbackTools;
    }

    if (options && isObject(options.fallbackTools)) {
      return options.fallbackTools;
    }

    return resolveBootstrapFallbackTools(options);
  }

  function getBootstrapResolverTools(options) {
    if (
      options &&
      isObject(options.bootstrapResolverTools) &&
      hasBootstrapResolverCapabilities(options.bootstrapResolverTools)
    ) {
      return options.bootstrapResolverTools;
    }

    return resolveBootstrapResolverTools(options);
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

  function resolveNamespace(namespaceName, requirePath, options) {
    const directNamespace =
      options && isObject(options.directNamespace) ? options.directNamespace : null;

    if (directNamespace) {
      return directNamespace;
    }

    const resolveCoreSupportModule =
      options && typeof options.resolveCoreSupportModule === 'function'
        ? options.resolveCoreSupportModule
        : null;

    if (resolveCoreSupportModule) {
      try {
        const resolved = resolveCoreSupportModule(namespaceName, requirePath);
        if (resolved && isObject(resolved)) {
          return resolved;
        }
      } catch (resolveError) {
        void resolveError;
      }
    }

    const requireFn = ensureRequireFn(options && options.requireFn);

    if (typeof requireFn === 'function' && requirePath) {
      try {
        const required = requireFn(requirePath);
        if (required && isObject(required)) {
          return required;
        }
      } catch (requireError) {
        void requireError;
      }
    }

    const fallbackScopes = collectBootstrapFallbackScopes(options);

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];

      if (!scope || !isObject(scope)) {
        continue;
      }

      try {
        const candidate = scope[namespaceName];
        if (candidate && isObject(candidate)) {
          return candidate;
        }
      } catch (lookupError) {
        void lookupError;
      }
    }

    return null;
  }

  function resolveBootstrapTools(options) {
    return resolveNamespace('cineCoreAppCoreBootstrap', './modules/app-core/bootstrap.js', options);
  }

  function resolveBootstrapFallbackTools(options) {
    return resolveNamespace(
      'cineCoreAppCoreBootstrapFallbacks',
      './modules/app-core/bootstrap.js',
      options
    );
  }

  function cloneResolverOptions(options, directNamespace) {
    const resolverOptions =
      options && typeof options === 'object' && !Array.isArray(options) ? Object.assign({}, options) : {};

    if (!resolverOptions.directNamespace && directNamespace && isObject(directNamespace)) {
      resolverOptions.directNamespace = directNamespace;
    }

    return resolverOptions;
  }

  function resolveBootstrapEnvironmentTools(options) {
    const resolverOptions = cloneResolverOptions(
      options,
      options && isObject(options.directBootstrapEnvironmentNamespace)
        ? options.directBootstrapEnvironmentNamespace
        : null
    );

    return resolveNamespace(
      'cineCoreAppCoreBootstrapEnvironment',
      './modules/app-core/bootstrap.js',
      resolverOptions
    );
  }

  function resolveBootstrapResultsTools(options) {
    const resolverOptions = cloneResolverOptions(
      options,
      options && isObject(options.directBootstrapResultsNamespace)
        ? options.directBootstrapResultsNamespace
        : null
    );

    return resolveNamespace(
      'cineCoreAppCoreBootstrapResults',
      './modules/app-core/bootstrap.js',
      resolverOptions
    );
  }

  function collectEnvironmentFallbackScopes(options) {
    const runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    const coreGlobalScope = options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;

    return appendFallbackScopes(
      ensureArray(options && options.fallbackScopes),
      runtimeScope,
      coreGlobalScope
    );
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

    const resolverOptions = {
      resolveCoreSupportModule:
        options && typeof options.resolveCoreSupportModule === 'function'
          ? options.resolveCoreSupportModule
          : null,
      requireFn: ensureRequireFn(options && options.requireFn),
      runtimeScope: options && isObject(options.runtimeScope) ? options.runtimeScope : null,
      coreGlobalScope:
        options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null,
      fallbackScopes: ensureArray(options && options.fallbackScopes),
    };

    const resolvedNamespace = resolveNamespace(
      'cineCoreAppCoreBootstrapResolver',
      './modules/app-core/bootstrap.js',
      Object.assign({}, resolverOptions, { directNamespace: directResolverNamespace })
    );

    if (hasBootstrapResolverCapabilities(resolvedNamespace)) {
      return resolvedNamespace;
    }

    if (
      resolvedNamespace &&
      isObject(resolvedNamespace.cineCoreAppCoreBootstrapResolver) &&
      hasBootstrapResolverCapabilities(resolvedNamespace.cineCoreAppCoreBootstrapResolver)
    ) {
      return resolvedNamespace.cineCoreAppCoreBootstrapResolver;
    }

    if (
      resolvedNamespace &&
      isObject(resolvedNamespace.cineCoreAppCoreBootstrap) &&
      hasBootstrapResolverCapabilities(resolvedNamespace.cineCoreAppCoreBootstrap)
    ) {
      return resolvedNamespace.cineCoreAppCoreBootstrap;
    }

    const fallbackScopes = collectBootstrapFallbackScopes(resolverOptions);

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
      } catch (resolverLookupError) {
        void resolverLookupError;
      }
    }

    return null;
  }

  function resolveBootstrapToolsWithResolver(options) {
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

    if (directBootstrapNamespace && isObject(directBootstrapNamespace)) {
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

    const fallbackScopes = collectEnvironmentFallbackScopes(options);

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

  function resolveBootstrapFallbackToolsWithResolver(options) {
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
          './modules/app-core/bootstrap.js'
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
        const requiredFallback = requireFn('./modules/app-core/bootstrap.js');

        if (requiredFallback && isObject(requiredFallback.cineCoreAppCoreBootstrapFallbacks)) {
          return requiredFallback.cineCoreAppCoreBootstrapFallbacks;
        }

        if (requiredFallback && isObject(requiredFallback)) {
          return requiredFallback;
        }
      } catch (bootstrapFallbackRequireError) {
        void bootstrapFallbackRequireError;
      }
    }

    const fallbackScopes = collectEnvironmentFallbackScopes(options);

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

  function createInlineLocalizationFallbackWithResolver(options) {
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

    return createLocalizationBootstrapFallback();
  }

  function createInlineRuntimeSharedFallbackWithResolver(options) {
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

    const fallbackScopes = collectEnvironmentFallbackScopes(options);

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

  function createBootstrapEnvironment(options) {
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    const coreGlobalScope =
      options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    const fallbackScopes = collectEnvironmentFallbackScopes({
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

    const bootstrapTools = resolveBootstrapToolsWithResolver({
      directBootstrapNamespace: options && options.directBootstrapNamespace,
      bootstrapResolverTools: resolverTools,
      resolveCoreSupportModule: options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
      fallbackScopes,
    });

    const bootstrapFallbackTools = resolveBootstrapFallbackToolsWithResolver({
      directBootstrapFallbackNamespace: options && options.directBootstrapFallbackNamespace,
      bootstrapResolverTools: resolverTools,
      resolveCoreSupportModule: options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
      fallbackScopes,
    });

    function createInlineLocalizationFallbackWithEnvironment() {
      return createInlineLocalizationFallbackWithResolver({
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

      return createInlineRuntimeSharedFallbackWithResolver({
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
      return collectEnvironmentFallbackScopes({
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

  function collectResultsFallbackScopes(options) {
    const runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    const coreGlobalScope = options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    const fallbackScopesInput = options ? options.fallbackScopes : null;

    if (options && typeof options.collectFallbackScopes === 'function') {
      try {
        const collected = options.collectFallbackScopes(fallbackScopesInput);

        if (Array.isArray(collected)) {
          const list = ensureArray(collected);
          registerScope(list, runtimeScope);
          registerScope(list, coreGlobalScope);
          registerScope(list, typeof globalThis !== 'undefined' ? globalThis : null);
          registerScope(list, typeof window !== 'undefined' ? window : null);
          registerScope(list, typeof self !== 'undefined' ? self : null);
          registerScope(list, typeof global !== 'undefined' ? global : null);
          return list;
        }
      } catch (collectorError) {
        void collectorError;
      }
    }

    const fallbackScopes = ensureArray(fallbackScopesInput);
    registerScope(fallbackScopes, runtimeScope);
    registerScope(fallbackScopes, coreGlobalScope);
    registerScope(fallbackScopes, typeof globalThis !== 'undefined' ? globalThis : null);
    registerScope(fallbackScopes, typeof window !== 'undefined' ? window : null);
    registerScope(fallbackScopes, typeof self !== 'undefined' ? self : null);
    registerScope(fallbackScopes, typeof global !== 'undefined' ? global : null);
    return fallbackScopes;
  }

  function createLocalizationFallbackSkeleton() {
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

  function createRuntimeSharedFallbackSkeleton(options) {
    const fallbackScopes = collectResultsFallbackScopes(options || null);
    const currentRuntimeShared =
      options && isObject(options.currentRuntimeShared) ? options.currentRuntimeShared : null;

    function fallbackResolveRuntimeSharedFromGlobal() {
      for (let index = 0; index < fallbackScopes.length; index += 1) {
        const scope = fallbackScopes[index];

        if (!isObject(scope)) {
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

  function resolveLocalizationBootstrapResult(options) {
    const runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    const coreGlobalScope = options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    const fallbackScopes = collectResultsFallbackScopes({
      runtimeScope,
      coreGlobalScope,
      fallbackScopes: options && options.fallbackScopes,
      collectFallbackScopes: options && options.collectFallbackScopes,
    });
    const requireFn = ensureRequireFn(options && options.requireFn);
    const resolveCoreSupportModule =
      options && typeof options.resolveCoreSupportModule === 'function'
        ? options.resolveCoreSupportModule
        : null;

    const bootstrapOptions = {
      localizationSupportTools:
        options && isObject(options.localizationSupportTools)
          ? options.localizationSupportTools
          : null,
      localizationBootstrapTools:
        options && isObject(options.localizationBootstrapTools)
          ? options.localizationBootstrapTools
          : null,
      localizationRuntimeTools:
        options && isObject(options.localizationRuntimeTools)
          ? options.localizationRuntimeTools
          : null,
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
      fallbackScopes,
      currentLocalization:
        options && isObject(options.currentLocalization) ? options.currentLocalization : null,
    };

    const bootstrapTools =
      options && isObject(options.bootstrapTools) ? options.bootstrapTools : null;

    let result = attemptFactory(
      bootstrapTools && bootstrapTools.createLocalizationBootstrapResult,
      bootstrapOptions
    );

    if (!result) {
      result = attemptFactory(
        bootstrapTools && bootstrapTools.createLocalizationBootstrapFallback,
        bootstrapOptions
      );
    }

    if (!result) {
      const inlineFactory =
        options && typeof options.createInlineLocalizationFallback === 'function'
          ? options.createInlineLocalizationFallback
          : null;

      result = attemptFactory(inlineFactory, {
        fallbackTools:
          options && isObject(options.bootstrapFallbackTools)
            ? options.bootstrapFallbackTools
            : null,
        resolveCoreSupportModule,
        requireFn,
        runtimeScope,
        coreGlobalScope,
        fallbackScopes,
        localizationFallbackOptions:
          options && options.localizationFallbackOptions
            ? options.localizationFallbackOptions
            : null,
      });
    }

    if (!result) {
      result = createLocalizationFallbackSkeleton();
    }

    return result;
  }

  function resolveRuntimeSharedBootstrapResult(options) {
    const runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    const coreGlobalScope = options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    const fallbackScopes = collectResultsFallbackScopes({
      runtimeScope,
      coreGlobalScope,
      fallbackScopes: options && options.fallbackScopes,
      collectFallbackScopes: options && options.collectFallbackScopes,
    });
    const requireFn = ensureRequireFn(options && options.requireFn);
    const resolveCoreSupportModule =
      options && typeof options.resolveCoreSupportModule === 'function'
        ? options.resolveCoreSupportModule
        : null;

    const bootstrapOptions = {
      runtimeSharedBootstrapResolverTools:
        options && isObject(options.runtimeSharedBootstrapResolverTools)
          ? options.runtimeSharedBootstrapResolverTools
          : null,
      runtimeSharedBootstrapTools:
        options && isObject(options.runtimeSharedBootstrapTools)
          ? options.runtimeSharedBootstrapTools
          : null,
      runtimeSharedNamespaceTools:
        options && isObject(options.runtimeSharedNamespaceTools)
          ? options.runtimeSharedNamespaceTools
          : null,
      runtimeSharedBootstrapInlineTools:
        options && isObject(options.runtimeSharedBootstrapInlineTools)
          ? options.runtimeSharedBootstrapInlineTools
          : null,
      runtimeSharedBootstrapResultTools:
        options && isObject(options.runtimeSharedBootstrapResultTools)
          ? options.runtimeSharedBootstrapResultTools
          : null,
      runtimeSharedBootstrapLoaderTools:
        options && isObject(options.runtimeSharedBootstrapLoaderTools)
          ? options.runtimeSharedBootstrapLoaderTools
          : null,
      runtimeSharedBootstrapManagerTools:
        options && isObject(options.runtimeSharedBootstrapManagerTools)
          ? options.runtimeSharedBootstrapManagerTools
          : null,
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
      currentRuntimeShared:
        options && isObject(options.currentRuntimeShared) ? options.currentRuntimeShared : null,
      fallbackScopes,
      runtimeSharedBootstrapInlineRequirePath:
        options && options.runtimeSharedBootstrapInlineRequirePath
          ? options.runtimeSharedBootstrapInlineRequirePath
          : null,
      runtimeSharedBootstrapResultRequirePath:
        options && options.runtimeSharedBootstrapResultRequirePath
          ? options.runtimeSharedBootstrapResultRequirePath
          : null,
    };

    const bootstrapTools =
      options && isObject(options.bootstrapTools) ? options.bootstrapTools : null;

    let result = attemptFactory(
      bootstrapTools && bootstrapTools.createRuntimeSharedBootstrapResult,
      bootstrapOptions
    );

    if (!result) {
      result = attemptFactory(
        bootstrapTools && bootstrapTools.createRuntimeSharedBootstrapFallback,
        bootstrapOptions
      );
    }

    if (!result) {
      const inlineFactory =
        options && typeof options.createInlineRuntimeSharedFallback === 'function'
          ? options.createInlineRuntimeSharedFallback
          : null;

      result = attemptFactory(inlineFactory, {
        fallbackTools:
          options && isObject(options.bootstrapFallbackTools)
            ? options.bootstrapFallbackTools
            : null,
        resolveCoreSupportModule,
        requireFn,
        runtimeScope,
        coreGlobalScope,
        fallbackScopes,
        currentRuntimeShared:
          options && isObject(options.currentRuntimeShared)
            ? options.currentRuntimeShared
            : null,
      });
    }

    if (!result) {
      result = createRuntimeSharedFallbackSkeleton({
        runtimeScope,
        coreGlobalScope,
        fallbackScopes,
        currentRuntimeShared:
          options && isObject(options.currentRuntimeShared)
            ? options.currentRuntimeShared
            : null,
      });
    }

    return result;
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

    const resolverOptions = {
      localizationSupportTools,
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
      fallbackScopes,
    };

    let result = attemptFactory(
      localizationBootstrapTools &&
        localizationBootstrapTools.createLocalizationBootstrapResult,
      resolverOptions
    );

    if (!result) {
      result = attemptFactory(localizationRuntimeTools && localizationRuntimeTools.resolveRuntimeLocalization, {
        currentLocalization: options && options.currentLocalization,
        resolveCoreSupportModule,
        requireFn,
        runtimeScope,
        coreGlobalScope,
        fallbackScopes,
      });
    }

    if (!result) {
      result = attemptFactory(
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

  function createInlineLocalizationFallback(options) {
    const runtimeScope =
      options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    const coreGlobalScope =
      options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    const requireFn = ensureRequireFn(options && options.requireFn);
    const bootstrapEnvironmentTools = getBootstrapEnvironmentTools(options);
    const bootstrapResultsTools = getBootstrapResultsTools(options);
    const fallbackScopes = collectBootstrapFallbackScopes({
      fallbackScopes: options && options.fallbackScopes,
      runtimeScope,
      coreGlobalScope,
      bootstrapEnvironmentTools,
      bootstrapEnvironment: bootstrapEnvironmentTools,
      bootstrapResultsTools,
      resolveCoreSupportModule: options && options.resolveCoreSupportModule,
      requireFn,
    });
    const resolverOptions = Object.assign({}, options, {
      runtimeScope,
      coreGlobalScope,
      fallbackScopes,
      requireFn,
      bootstrapEnvironmentTools,
      bootstrapEnvironment: bootstrapEnvironmentTools,
      bootstrapResultsTools,
    });
    const bootstrapResolverTools = getBootstrapResolverTools(resolverOptions);
    const fallbackTools = getBootstrapFallbackTools(resolverOptions);
    const bootstrapSuite =
      options && isObject(options.bootstrapSuite) ? options.bootstrapSuite : null;
    const localizationFallbackOptions =
      options && options.localizationFallbackOptions
        ? options.localizationFallbackOptions
        : null;

    if (
      bootstrapResolverTools &&
      typeof bootstrapResolverTools.createInlineLocalizationFallback === 'function'
    ) {
      try {
        const generated = bootstrapResolverTools.createInlineLocalizationFallback({
          fallbackTools,
          resolveCoreSupportModule: options && options.resolveCoreSupportModule,
          requireFn,
          runtimeScope,
          coreGlobalScope,
          fallbackScopes,
          localizationFallbackOptions,
        });

        if (generated && isObject(generated)) {
          return generated;
        }
      } catch (localizationFallbackResolveError) {
        void localizationFallbackResolveError;
      }
    }

    if (
      bootstrapSuite &&
      typeof bootstrapSuite.createLocalizationBootstrapFallback === 'function'
    ) {
      try {
        const suiteFallback = bootstrapSuite.createLocalizationBootstrapFallback({
          fallbackScopes,
          runtimeScope,
          coreGlobalScope,
          localizationFallbackOptions,
        });

        if (suiteFallback && isObject(suiteFallback)) {
          return suiteFallback;
        }
      } catch (suiteLocalizationFallbackError) {
        void suiteLocalizationFallbackError;
      }
    }

    if (fallbackTools && typeof fallbackTools.createLocalizationBootstrapFallback === 'function') {
      try {
        const fallbackResult = fallbackTools.createLocalizationBootstrapFallback({
          resolveCoreSupportModule: options && options.resolveCoreSupportModule,
          requireFn,
          runtimeScope,
          coreGlobalScope,
          fallbackScopes,
          localizationFallbackOptions,
        });

        if (fallbackResult && isObject(fallbackResult)) {
          return fallbackResult;
        }
      } catch (localizationFallbackError) {
        void localizationFallbackError;
      }
    }

    if (
      bootstrapResultsTools &&
      typeof bootstrapResultsTools.createLocalizationFallbackSkeleton === 'function'
    ) {
      try {
        const skeleton = bootstrapResultsTools.createLocalizationFallbackSkeleton();
        if (skeleton && isObject(skeleton)) {
          return skeleton;
        }
      } catch (localizationSkeletonError) {
        void localizationSkeletonError;
      }
    }

    return createLocalizationBootstrapFallback();
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

  function createInlineRuntimeSharedFallback(options) {
    const runtimeScope =
      options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    const coreGlobalScope =
      options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    const requireFn = ensureRequireFn(options && options.requireFn);
    const bootstrapEnvironmentTools = getBootstrapEnvironmentTools(options);
    const bootstrapResultsTools = getBootstrapResultsTools(options);
    const fallbackScopes = collectBootstrapFallbackScopes({
      fallbackScopes: options && options.fallbackScopes,
      runtimeScope,
      coreGlobalScope,
      bootstrapEnvironmentTools,
      bootstrapEnvironment: bootstrapEnvironmentTools,
      bootstrapResultsTools,
      resolveCoreSupportModule: options && options.resolveCoreSupportModule,
      requireFn,
    });
    const currentRuntimeShared =
      options && isObject(options.currentRuntimeShared)
        ? options.currentRuntimeShared
        : null;
    const resolverOptions = Object.assign({}, options, {
      runtimeScope,
      coreGlobalScope,
      fallbackScopes,
      currentRuntimeShared,
      requireFn,
      bootstrapEnvironmentTools,
      bootstrapEnvironment: bootstrapEnvironmentTools,
      bootstrapResultsTools,
    });
    const bootstrapResolverTools = getBootstrapResolverTools(resolverOptions);
    const fallbackTools = getBootstrapFallbackTools(resolverOptions);
    const bootstrapSuite =
      options && isObject(options.bootstrapSuite) ? options.bootstrapSuite : null;

    if (
      bootstrapResolverTools &&
      typeof bootstrapResolverTools.createInlineRuntimeSharedFallback === 'function'
    ) {
      try {
        const generated = bootstrapResolverTools.createInlineRuntimeSharedFallback({
          fallbackTools,
          resolveCoreSupportModule: options && options.resolveCoreSupportModule,
          requireFn,
          runtimeScope,
          coreGlobalScope,
          fallbackScopes,
          currentRuntimeShared,
        });

        if (generated && isObject(generated)) {
          return generated;
        }
      } catch (runtimeSharedFallbackResolveError) {
        void runtimeSharedFallbackResolveError;
      }
    }

    if (
      bootstrapSuite &&
      typeof bootstrapSuite.createRuntimeSharedBootstrapFallback === 'function'
    ) {
      try {
        const suiteFallback = bootstrapSuite.createRuntimeSharedBootstrapFallback({
          fallbackScopes,
          runtimeScope,
          coreGlobalScope,
          currentRuntimeShared,
        });

        if (suiteFallback && isObject(suiteFallback)) {
          return suiteFallback;
        }
      } catch (suiteRuntimeSharedFallbackError) {
        void suiteRuntimeSharedFallbackError;
      }
    }

    if (
      fallbackTools &&
      typeof fallbackTools.createRuntimeSharedBootstrapFallback === 'function'
    ) {
      try {
        const moduleFallback = fallbackTools.createRuntimeSharedBootstrapFallback({
          resolveCoreSupportModule: options && options.resolveCoreSupportModule,
          requireFn,
          runtimeScope,
          coreGlobalScope,
          fallbackScopes,
          currentRuntimeShared,
        });

        if (moduleFallback && isObject(moduleFallback)) {
          return moduleFallback;
        }
      } catch (runtimeSharedFallbackError) {
        void runtimeSharedFallbackError;
      }
    }

    if (
      bootstrapResultsTools &&
      typeof bootstrapResultsTools.createRuntimeSharedFallbackSkeleton === 'function'
    ) {
      try {
        const skeleton = bootstrapResultsTools.createRuntimeSharedFallbackSkeleton({
          runtimeScope,
          coreGlobalScope,
          fallbackScopes,
          currentRuntimeShared,
        });

        if (skeleton && isObject(skeleton)) {
          return skeleton;
        }
      } catch (runtimeSharedSkeletonError) {
        void runtimeSharedSkeletonError;
      }
    }

    return createRuntimeSharedFallbackSkeleton({
      runtimeScope,
      coreGlobalScope,
      fallbackScopes,
      currentRuntimeShared,
    });
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

    let result = attemptFactory(
      runtimeSharedBootstrapResolverTools &&
        runtimeSharedBootstrapResolverTools.createRuntimeSharedBootstrapResult,
      resolverOptions
    );

    if (!result) {
      result = attemptFactory(
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
      result = attemptFactory(
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
      result = attemptFactory(
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

  function createBootstrapSuite(options) {
    const normalizedOptions = options && typeof options === 'object' && !Array.isArray(options) ? options : {};
    const baseRequireFn = ensureRequireFn(normalizedOptions.requireFn);

    const bootstrapTools =
      resolveBootstrapTools(
        cloneResolverOptions(normalizedOptions, normalizedOptions.directBootstrapNamespace || null)
      ) || null;

    const bootstrapFallbackTools =
      resolveBootstrapFallbackTools(
        cloneResolverOptions(normalizedOptions, normalizedOptions.directBootstrapFallbackNamespace || null)
      ) || null;

    const bootstrapEnvironmentTools =
      resolveBootstrapEnvironmentTools(
        cloneResolverOptions(normalizedOptions, normalizedOptions.directBootstrapEnvironmentNamespace || null)
      ) || null;

    const bootstrapResultsTools =
      resolveBootstrapResultsTools(
        cloneResolverOptions(normalizedOptions, normalizedOptions.directBootstrapResultsNamespace || null)
      ) || null;

    function mergeOptions(overrides) {
      const merged = {
        resolveCoreSupportModule:
          normalizedOptions && typeof normalizedOptions.resolveCoreSupportModule === 'function'
            ? normalizedOptions.resolveCoreSupportModule
            : null,
        requireFn: baseRequireFn,
        runtimeScope: normalizedOptions && isObject(normalizedOptions.runtimeScope)
          ? normalizedOptions.runtimeScope
          : null,
        coreGlobalScope: normalizedOptions && isObject(normalizedOptions.coreGlobalScope)
          ? normalizedOptions.coreGlobalScope
          : null,
      };

      const fallbackScopes = [];

      if (Array.isArray(normalizedOptions.fallbackScopes)) {
        for (let index = 0; index < normalizedOptions.fallbackScopes.length; index += 1) {
          fallbackScopes.push(normalizedOptions.fallbackScopes[index]);
        }
      }

      if (overrides && typeof overrides === 'object') {
        const keys = Object.keys(overrides);
        for (let index = 0; index < keys.length; index += 1) {
          const key = keys[index];

          if (key === 'fallbackScopes') {
            const overrideScopes = overrides[key];

            if (Array.isArray(overrideScopes)) {
              for (let fallbackIndex = 0; fallbackIndex < overrideScopes.length; fallbackIndex += 1) {
                fallbackScopes.push(overrideScopes[fallbackIndex]);
              }
            } else if (overrideScopes && isObject(overrideScopes)) {
              fallbackScopes.push(overrideScopes);
            }

            continue;
          }

          merged[key] = overrides[key];
        }
      }

      merged.fallbackScopes = fallbackScopes;

      return merged;
    }

    function collectSuiteFallbackScopes(overrides) {
      const merged = mergeOptions(overrides);
      const fallbackScopes = ensureArray(merged.fallbackScopes);
      const runtimeScope = merged.runtimeScope;
      const coreGlobalScope = merged.coreGlobalScope;

      if (
        bootstrapResultsTools &&
        typeof bootstrapResultsTools.collectBootstrapFallbackScopes === 'function'
      ) {
        const collectAdditionalFallbackScopes =
          bootstrapEnvironmentTools &&
          typeof bootstrapEnvironmentTools.collectFallbackScopes === 'function'
            ? function collectAdditional(scopes) {
                return bootstrapEnvironmentTools.collectFallbackScopes({
                  fallbackScopes: Array.isArray(scopes) ? scopes : ensureArray(scopes),
                  runtimeScope,
                  coreGlobalScope,
                });
              }
            : null;

        try {
          const collected = bootstrapResultsTools.collectBootstrapFallbackScopes({
            fallbackScopes,
            runtimeScope,
            coreGlobalScope,
            collectFallbackScopes: collectAdditionalFallbackScopes,
          });

          if (Array.isArray(collected)) {
            return collected;
          }
        } catch (suiteCollectError) {
          void suiteCollectError;
        }
      }

      return collectBootstrapFallbackScopes({
        runtimeScope,
        coreGlobalScope,
        fallbackScopes,
      });
    }

    function createBootstrapEnvironmentWithSuite(environmentOptions) {
      if (
        bootstrapEnvironmentTools &&
        typeof bootstrapEnvironmentTools.createBootstrapEnvironment === 'function'
      ) {
        const invocationOptions = mergeOptions(environmentOptions);

        if (!invocationOptions.directResolverNamespace && normalizedOptions.directResolverNamespace) {
          invocationOptions.directResolverNamespace = normalizedOptions.directResolverNamespace;
        }

        if (!invocationOptions.directBootstrapNamespace && bootstrapTools) {
          invocationOptions.directBootstrapNamespace = bootstrapTools;
        }

        if (!invocationOptions.directBootstrapFallbackNamespace && bootstrapFallbackTools) {
          invocationOptions.directBootstrapFallbackNamespace = bootstrapFallbackTools;
        }

        try {
          return bootstrapEnvironmentTools.createBootstrapEnvironment(invocationOptions);
        } catch (environmentCreationError) {
          void environmentCreationError;
        }
      }

      return null;
    }

    function createLocalizationBootstrapResultWithSuite(resultOptions) {
      const invocationOptions = mergeOptions(resultOptions);
      invocationOptions.fallbackScopes = collectSuiteFallbackScopes(resultOptions);

      if (!invocationOptions.bootstrapTools && bootstrapTools) {
        invocationOptions.bootstrapTools = bootstrapTools;
      }

      if (!invocationOptions.bootstrapFallbackTools && bootstrapFallbackTools) {
        invocationOptions.bootstrapFallbackTools = bootstrapFallbackTools;
      }

      if (!invocationOptions.createInlineLocalizationFallback) {
        invocationOptions.createInlineLocalizationFallback =
          (bootstrapEnvironmentTools &&
            typeof bootstrapEnvironmentTools.createInlineLocalizationFallback === 'function'
            ? bootstrapEnvironmentTools.createInlineLocalizationFallback
            : null) ||
          (bootstrapTools && typeof bootstrapTools.createInlineLocalizationFallback === 'function'
            ? bootstrapTools.createInlineLocalizationFallback
            : createInlineLocalizationFallback);
      }

      if (
        bootstrapResultsTools &&
        typeof bootstrapResultsTools.resolveLocalizationBootstrapResult === 'function'
      ) {
        try {
          const resolved = bootstrapResultsTools.resolveLocalizationBootstrapResult(invocationOptions);

          if (resolved && isObject(resolved)) {
            return resolved;
          }
        } catch (localizationResolveError) {
          void localizationResolveError;
        }
      }

      return createLocalizationBootstrapResult(invocationOptions);
    }

    function createLocalizationBootstrapFallbackWithSuite(fallbackOptions) {
      const invocationOptions = mergeOptions(fallbackOptions);
      invocationOptions.fallbackScopes = collectSuiteFallbackScopes(fallbackOptions);

      if (!invocationOptions.fallbackTools && bootstrapFallbackTools) {
        invocationOptions.fallbackTools = bootstrapFallbackTools;
      }

      if (
        bootstrapResultsTools &&
        typeof bootstrapResultsTools.createLocalizationFallbackSkeleton === 'function'
      ) {
        try {
          const skeleton = bootstrapResultsTools.createLocalizationFallbackSkeleton(invocationOptions);

          if (skeleton && isObject(skeleton)) {
            return skeleton;
          }
        } catch (localizationFallbackSkeletonError) {
          void localizationFallbackSkeletonError;
        }
      }

      if (
        bootstrapFallbackTools &&
        typeof bootstrapFallbackTools.createLocalizationBootstrapFallback === 'function'
      ) {
        try {
          const generated = bootstrapFallbackTools.createLocalizationBootstrapFallback(
            invocationOptions.localizationFallbackOptions || null
          );

          if (generated && isObject(generated)) {
            return generated;
          }
        } catch (localizationFallbackError) {
          void localizationFallbackError;
        }
      }

      return createLocalizationBootstrapFallback();
    }

    function createRuntimeSharedBootstrapResultWithSuite(resultOptions) {
      const invocationOptions = mergeOptions(resultOptions);
      invocationOptions.fallbackScopes = collectSuiteFallbackScopes(resultOptions);

      if (!invocationOptions.bootstrapTools && bootstrapTools) {
        invocationOptions.bootstrapTools = bootstrapTools;
      }

      if (!invocationOptions.bootstrapFallbackTools && bootstrapFallbackTools) {
        invocationOptions.bootstrapFallbackTools = bootstrapFallbackTools;
      }

      if (!invocationOptions.createInlineRuntimeSharedFallback) {
        invocationOptions.createInlineRuntimeSharedFallback =
          (bootstrapEnvironmentTools &&
            typeof bootstrapEnvironmentTools.createInlineRuntimeSharedFallback === 'function'
            ? bootstrapEnvironmentTools.createInlineRuntimeSharedFallback
            : null) ||
          (bootstrapTools && typeof bootstrapTools.createInlineRuntimeSharedFallback === 'function'
            ? bootstrapTools.createInlineRuntimeSharedFallback
            : createInlineRuntimeSharedFallback);
      }

      if (
        bootstrapResultsTools &&
        typeof bootstrapResultsTools.resolveRuntimeSharedBootstrapResult === 'function'
      ) {
        try {
          const resolved = bootstrapResultsTools.resolveRuntimeSharedBootstrapResult(invocationOptions);

          if (resolved && isObject(resolved)) {
            return resolved;
          }
        } catch (runtimeSharedResolveError) {
          void runtimeSharedResolveError;
        }
      }

      return createRuntimeSharedBootstrapResult(invocationOptions);
    }

    function createRuntimeSharedBootstrapFallbackWithSuite(fallbackOptions) {
      const invocationOptions = mergeOptions(fallbackOptions);
      invocationOptions.fallbackScopes = collectSuiteFallbackScopes(fallbackOptions);

      if (
        bootstrapResultsTools &&
        typeof bootstrapResultsTools.createRuntimeSharedFallbackSkeleton === 'function'
      ) {
        try {
          const skeleton = bootstrapResultsTools.createRuntimeSharedFallbackSkeleton(invocationOptions);

          if (skeleton && isObject(skeleton)) {
            return skeleton;
          }
        } catch (runtimeSharedFallbackSkeletonError) {
          void runtimeSharedFallbackSkeletonError;
        }
      }

      if (
        bootstrapFallbackTools &&
        typeof bootstrapFallbackTools.createRuntimeSharedBootstrapFallback === 'function'
      ) {
        try {
          const generated = bootstrapFallbackTools.createRuntimeSharedBootstrapFallback(invocationOptions);

          if (generated && isObject(generated)) {
            return generated;
          }
        } catch (runtimeSharedFallbackError) {
          void runtimeSharedFallbackError;
        }
      }

      return createRuntimeSharedBootstrapFallback(invocationOptions);
    }

    function createInlineLocalizationFallbackWithSuite(options) {
      const invocationOptions = mergeOptions(options);
      invocationOptions.fallbackScopes = collectSuiteFallbackScopes(options);

      if (!invocationOptions.fallbackTools && bootstrapFallbackTools) {
        invocationOptions.fallbackTools = bootstrapFallbackTools;
      }

      return createInlineLocalizationFallback(invocationOptions);
    }

    function createInlineRuntimeSharedFallbackWithSuite(options) {
      const invocationOptions = mergeOptions(options);
      invocationOptions.fallbackScopes = collectSuiteFallbackScopes(options);

      if (!invocationOptions.fallbackTools && bootstrapFallbackTools) {
        invocationOptions.fallbackTools = bootstrapFallbackTools;
      }

      return createInlineRuntimeSharedFallback(invocationOptions);
    }

    const suite = {
      bootstrapTools,
      bootstrapFallbackTools,
      bootstrapEnvironmentTools,
      bootstrapResultsTools,
      collectBootstrapFallbackScopes: collectSuiteFallbackScopes,
      createBootstrapEnvironment: createBootstrapEnvironmentWithSuite,
      createLocalizationBootstrapResult: createLocalizationBootstrapResultWithSuite,
      createLocalizationBootstrapFallback: createLocalizationBootstrapFallbackWithSuite,
      createRuntimeSharedBootstrapResult: createRuntimeSharedBootstrapResultWithSuite,
      createRuntimeSharedBootstrapFallback: createRuntimeSharedBootstrapFallbackWithSuite,
      createInlineLocalizationFallback: createInlineLocalizationFallbackWithSuite,
      createInlineRuntimeSharedFallback: createInlineRuntimeSharedFallbackWithSuite,
      resolveBootstrapTools,
      resolveBootstrapFallbackTools,
      resolveBootstrapEnvironmentTools,
      resolveBootstrapResultsTools,
    };

    try {
      suite.bootstrapEnvironment = createBootstrapEnvironmentWithSuite(
        normalizedOptions.bootstrapEnvironmentOptions || null
      );
    } catch (bootstrapEnvironmentError) {
      void bootstrapEnvironmentError;
      suite.bootstrapEnvironment = null;
    }

    return suite;
  }

  const namespace = {
    createLocalizationBootstrapResult,
    createLocalizationBootstrapFallback,
    createRuntimeSharedBootstrapResult,
    createRuntimeSharedBootstrapFallback,
    collectBootstrapFallbackScopes,
    resolveBootstrapTools,
    resolveBootstrapFallbackTools,
    resolveBootstrapEnvironmentTools,
    resolveBootstrapResultsTools,
    createInlineLocalizationFallback,
    createInlineRuntimeSharedFallback,
    createBootstrapSuite,
    resolveBootstrapResolverTools,
    createBootstrapEnvironment,
  };

  const fallbackNamespace = {
    createLocalizationBootstrapFallback,
    createRuntimeSharedBootstrapFallback,
  };

  const environmentNamespace = {
    createBootstrapEnvironment,
    resolveBootstrapResolverTools,
    resolveBootstrapTools: resolveBootstrapToolsWithResolver,
    resolveBootstrapFallbackTools: resolveBootstrapFallbackToolsWithResolver,
    createInlineLocalizationFallback: createInlineLocalizationFallbackWithResolver,
    createInlineRuntimeSharedFallback: createInlineRuntimeSharedFallbackWithResolver,
    collectFallbackScopes: collectEnvironmentFallbackScopes,
  };

  const resultsNamespace = {
    resolveLocalizationBootstrapResult,
    resolveRuntimeSharedBootstrapResult,
    collectBootstrapFallbackScopes(options) {
      return collectResultsFallbackScopes(options || null);
    },
    createLocalizationFallbackSkeleton,
    createRuntimeSharedFallbackSkeleton,
  };

  const namespaceName = 'cineCoreAppCoreBootstrap';
  const existing = isObject(globalScope) && isObject(globalScope[namespaceName])
    ? globalScope[namespaceName]
    : {};

  Object.assign(existing, namespace);

  const fallbackNamespaceName = 'cineCoreAppCoreBootstrapFallbacks';
  const existingFallbacks =
    isObject(globalScope) && isObject(globalScope[fallbackNamespaceName])
      ? globalScope[fallbackNamespaceName]
      : {};
  Object.assign(existingFallbacks, fallbackNamespace);

  const environmentNamespaceName = 'cineCoreAppCoreBootstrapEnvironment';
  const existingEnvironment =
    isObject(globalScope) && isObject(globalScope[environmentNamespaceName])
      ? globalScope[environmentNamespaceName]
      : {};
  Object.assign(existingEnvironment, environmentNamespace);

  const resultsNamespaceName = 'cineCoreAppCoreBootstrapResults';
  const existingResults =
    isObject(globalScope) && isObject(globalScope[resultsNamespaceName])
      ? globalScope[resultsNamespaceName]
      : {};
  Object.assign(existingResults, resultsNamespace);

  const resolverNamespace = {
    resolveBootstrapTools,
    resolveBootstrapFallbackTools,
    resolveBootstrapEnvironmentTools,
    resolveBootstrapResultsTools,
    resolveBootstrapResolverTools,
    createInlineLocalizationFallback,
    createInlineRuntimeSharedFallback,
    createBootstrapSuite,
  };

  const resolverNamespaceName = 'cineCoreAppCoreBootstrapResolver';
  const existingResolver =
    isObject(globalScope) && isObject(globalScope[resolverNamespaceName])
      ? globalScope[resolverNamespaceName]
      : existing;

  Object.assign(existingResolver, resolverNamespace);

  if (isObject(existing)) {
    existing.fallbacks =
      isObject(existing.fallbacks)
        ? Object.assign(existing.fallbacks, fallbackNamespace)
        : existingFallbacks;
    existing.environment =
      isObject(existing.environment)
        ? Object.assign(existing.environment, environmentNamespace)
        : existingEnvironment;
    existing.results =
      isObject(existing.results)
        ? Object.assign(existing.results, resultsNamespace)
        : existingResults;
    existing.resolver =
      isObject(existing.resolver)
        ? Object.assign(existing.resolver, resolverNamespace)
        : existingResolver;
  }

  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }

    try {
      globalScope[resolverNamespaceName] = existingResolver;
    } catch (resolverAssignError) {
      void resolverAssignError;
    }

    try {
      globalScope[fallbackNamespaceName] = existingFallbacks;
    } catch (fallbackAssignError) {
      void fallbackAssignError;
    }

    try {
      globalScope[environmentNamespaceName] = existingEnvironment;
    } catch (environmentAssignError) {
      void environmentAssignError;
    }

    try {
      globalScope[resultsNamespaceName] = existingResults;
    } catch (resultsAssignError) {
      void resultsAssignError;
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
