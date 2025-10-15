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

  function collectBootstrapFallbackScopes(options) {
    const runtimeScope =
      options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    const coreGlobalScope =
      options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;

    return appendFallbackScopes(
      ensureArray(options && options.fallbackScopes),
      runtimeScope,
      coreGlobalScope
    );
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
      './modules/app-core/bootstrap-fallbacks.js',
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
      './modules/app-core/bootstrap-environment.js',
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
      './modules/app-core/bootstrap-results.js',
      resolverOptions
    );
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

  function createInlineLocalizationFallback(options) {
    const fallbackTools = resolveBootstrapFallbackTools({
      directNamespace: options && options.fallbackTools,
      resolveCoreSupportModule: options && options.resolveCoreSupportModule,
      requireFn: options && options.requireFn,
      runtimeScope: options && options.runtimeScope,
      coreGlobalScope: options && options.coreGlobalScope,
      fallbackScopes: options && options.fallbackScopes,
    });

    if (
      fallbackTools &&
      typeof fallbackTools.createLocalizationBootstrapFallback === 'function'
    ) {
      try {
        const generated = fallbackTools.createLocalizationBootstrapFallback(
          options && options.localizationFallbackOptions
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
    const fallbackTools = resolveBootstrapFallbackTools({
      directNamespace: options && options.fallbackTools,
      resolveCoreSupportModule: options && options.resolveCoreSupportModule,
      requireFn: options && options.requireFn,
      runtimeScope: options && options.runtimeScope,
      coreGlobalScope: options && options.coreGlobalScope,
      fallbackScopes: options && options.fallbackScopes,
    });

    if (
      fallbackTools &&
      typeof fallbackTools.createRuntimeSharedBootstrapFallback === 'function'
    ) {
      try {
        const generated = fallbackTools.createRuntimeSharedBootstrapFallback(options);
        if (generated && isObject(generated)) {
          return generated;
        }
      } catch (runtimeSharedFallbackError) {
        void runtimeSharedFallbackError;
      }
    }

    return createRuntimeSharedBootstrapFallback(options);
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
    resolveBootstrapTools,
    resolveBootstrapFallbackTools,
    resolveBootstrapEnvironmentTools,
    resolveBootstrapResultsTools,
    createInlineLocalizationFallback,
    createInlineRuntimeSharedFallback,
    createBootstrapSuite,
  };

  const namespaceName = 'cineCoreAppCoreBootstrap';
  const existing = isObject(globalScope) && isObject(globalScope[namespaceName])
    ? globalScope[namespaceName]
    : {};

  Object.assign(existing, namespace);

  const resolverNamespace = {
    resolveBootstrapTools,
    resolveBootstrapFallbackTools,
    resolveBootstrapEnvironmentTools,
    resolveBootstrapResultsTools,
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
