(function () {
  function detectRuntimeScope(primaryScope) {
    if (
      primaryScope &&
      (typeof primaryScope === 'object' || typeof primaryScope === 'function')
    ) {
      return primaryScope;
    }

    if (typeof globalThis !== 'undefined' && typeof globalThis === 'object') {
      return globalThis;
    }

    if (typeof window !== 'undefined' && typeof window === 'object') {
      return window;
    }

    if (typeof self !== 'undefined' && typeof self === 'object') {
      return self;
    }

    if (typeof global !== 'undefined' && typeof global === 'object') {
      return global;
    }

    return null;
  }

  function resolveSupportResolver(primaryScope) {
    const runtimeScope = detectRuntimeScope(primaryScope);

    if (
      runtimeScope &&
      runtimeScope.cineCoreSupportResolver &&
      typeof runtimeScope.cineCoreSupportResolver === 'object'
    ) {
      return runtimeScope.cineCoreSupportResolver;
    }

    if (typeof require === 'function') {
      try {
        const requiredResolver = require('./support-resolver.js');
        if (requiredResolver && typeof requiredResolver === 'object') {
          return requiredResolver;
        }
      } catch (supportResolverError) {
        void supportResolverError;
      }
    }

    return null;
  }

  function createFallbackResolver(resolverCandidate) {
    if (
      resolverCandidate &&
      typeof resolverCandidate.resolveCoreSupportModule === 'function'
    ) {
      return resolverCandidate.resolveCoreSupportModule;
    }

    return function fallbackResolveCoreSupportModule() {
      return null;
    };
  }

  function createLocalizationFallbackEnvironment(options) {
    const normalizedOptions = options && typeof options === 'object' ? options : {};
    const runtimeScope = normalizedOptions.runtimeScope || null;
    const coreGlobalScope = normalizedOptions.coreGlobalScope || null;
    const requireFn =
      typeof normalizedOptions.requireFn === 'function' ? normalizedOptions.requireFn : null;

    const supportResolver = resolveSupportResolver(runtimeScope);
    const resolveFromResolver = createFallbackResolver(supportResolver);

    const resolveCoreSupportModule =
      typeof normalizedOptions.resolveCoreSupportModule === 'function'
        ? normalizedOptions.resolveCoreSupportModule
        : function resolveCoreSupportModuleProxy(namespaceName, requirePath) {
            const resolved = resolveFromResolver(namespaceName, requirePath, runtimeScope);
            if (resolved) {
              return resolved;
            }

            if (requireFn && typeof requirePath === 'string' && requirePath) {
              try {
                const requiredModule = requireFn(requirePath);
                if (requiredModule && typeof requiredModule === 'object') {
                  return requiredModule;
                }
              } catch (resolveProxyRequireError) {
                void resolveProxyRequireError;
              }
            }

            return null;
          };

    let localizationFallbackBootstrapNamespace =
      normalizedOptions.localizationFallbackBootstrapNamespace ||
      resolveCoreSupportModule(
        'cineCoreLocalizationFallbackBootstrap',
        './modules/core/localization-fallback-bootstrap.js'
      );

    if (
      (!localizationFallbackBootstrapNamespace ||
        typeof localizationFallbackBootstrapNamespace.setupLocalizationFallbacks !== 'function') &&
      requireFn
    ) {
      try {
        const requiredBootstrap = requireFn('./modules/core/localization-fallback-bootstrap.js');
        if (
          requiredBootstrap &&
          typeof requiredBootstrap.setupLocalizationFallbacks === 'function'
        ) {
          localizationFallbackBootstrapNamespace = requiredBootstrap;
        }
      } catch (bootstrapRequireError) {
        void bootstrapRequireError;
      }
    }

    const localizationFallbackBootstrapState =
      localizationFallbackBootstrapNamespace &&
      typeof localizationFallbackBootstrapNamespace.setupLocalizationFallbacks === 'function'
        ? localizationFallbackBootstrapNamespace.setupLocalizationFallbacks({
            primaryRuntimeScope: runtimeScope,
            coreGlobalScope,
            localizationFallbackFactories:
              normalizedOptions.localizationFallbackFactories || null,
            localizationFallbacks: normalizedOptions.localizationFallbacks || null,
            inlineLocalizationFallbacks:
              normalizedOptions.inlineLocalizationFallbacks || null,
            localizationFallbackRegistry:
              normalizedOptions.localizationFallbackRegistry || null,
            localizationFallbackResolution:
              normalizedOptions.localizationFallbackResolution || null,
            localizationFallbackSupportLite:
              normalizedOptions.localizationFallbackSupportLite || null,
            localizationInlineSupport: normalizedOptions.localizationInlineSupport || null,
            resolveCoreSupportModule,
            requireFn,
          })
        : null;

    const localizationFallbackContext =
      localizationFallbackBootstrapState &&
      localizationFallbackBootstrapState.context &&
      typeof localizationFallbackBootstrapState.context === 'object'
        ? localizationFallbackBootstrapState.context
        : null;

    const localizationFallbackSupport =
      (localizationFallbackContext && localizationFallbackContext.support) ||
      (localizationFallbackBootstrapState &&
      typeof localizationFallbackBootstrapState.support !== 'undefined'
        ? localizationFallbackBootstrapState.support
        : null);

    const createBasicLocalizationFallbackResolvers = (function resolveCreateBasicResolvers() {
      if (
        localizationFallbackBootstrapState &&
        typeof localizationFallbackBootstrapState.createBasicLocalizationFallbackResolvers ===
          'function'
      ) {
        return function createBasicLocalizationFallbackResolversProxy(fallbackOptions) {
          try {
            return localizationFallbackBootstrapState.createBasicLocalizationFallbackResolvers(
              fallbackOptions
            );
          } catch (createBasicResolversError) {
            void createBasicResolversError;
          }

          return null;
        };
      }

      if (
        localizationFallbackBootstrapNamespace &&
        typeof localizationFallbackBootstrapNamespace
          .fallbackCreateBasicLocalizationFallbackResolvers === 'function'
      ) {
        return function createBasicLocalizationFallbackResolversProxy(fallbackOptions) {
          try {
            return localizationFallbackBootstrapNamespace
              .fallbackCreateBasicLocalizationFallbackResolvers(fallbackOptions);
          } catch (createFallbackResolversError) {
            void createFallbackResolversError;
          }

          return null;
        };
      }

      return function createBasicLocalizationFallbackResolversProxy() {
        return null;
      };
    })();

    const localizationFallbackRegistry =
      (localizationFallbackContext && localizationFallbackContext.registry) ||
      (localizationFallbackBootstrapState &&
      localizationFallbackBootstrapState.registry &&
      typeof localizationFallbackBootstrapState.registry === 'object'
        ? localizationFallbackBootstrapState.registry
        : normalizedOptions.localizationFallbackRegistry &&
          typeof normalizedOptions.localizationFallbackRegistry.createFallbackResolvers ===
            'function'
        ? normalizedOptions.localizationFallbackRegistry
        : {
            createFallbackResolvers(fallbackOptions) {
              return createBasicLocalizationFallbackResolvers(fallbackOptions);
            },
          });

    const localizationFallbackResolvers =
      (localizationFallbackContext && localizationFallbackContext.resolvers) ||
      (localizationFallbackBootstrapState &&
      localizationFallbackBootstrapState.resolvers &&
      typeof localizationFallbackBootstrapState.resolvers === 'object'
        ? localizationFallbackBootstrapState.resolvers
        : localizationFallbackRegistry &&
          typeof localizationFallbackRegistry.createFallbackResolvers === 'function'
        ? localizationFallbackRegistry.createFallbackResolvers({
            directNamespace: normalizedOptions.localizationFallbacks || null,
            inlineNamespace: normalizedOptions.inlineLocalizationFallbacks || null,
          })
        : createBasicLocalizationFallbackResolvers({
            directNamespace: normalizedOptions.localizationFallbacks || null,
            inlineNamespace: normalizedOptions.inlineLocalizationFallbacks || null,
          }));

    const localizationFallbackNamespace =
      (localizationFallbackContext && localizationFallbackContext.namespace) ||
      (localizationFallbackResolvers &&
      localizationFallbackResolvers.namespace &&
      typeof localizationFallbackResolvers.namespace === 'object'
        ? localizationFallbackResolvers.namespace
        : null);

    const fallbackResolveLocaleModule = (function resolveFallbackResolver() {
      if (
        localizationFallbackBootstrapState &&
        typeof localizationFallbackBootstrapState.fallbackResolveLocaleModule === 'function'
      ) {
        return function fallbackResolveLocaleModuleProxy(scope) {
          try {
            return localizationFallbackBootstrapState.fallbackResolveLocaleModule(scope);
          } catch (fallbackResolveError) {
            void fallbackResolveError;
          }

          return null;
        };
      }

      if (
        localizationFallbackContext &&
        typeof localizationFallbackContext.fallbackResolveLocaleModule === 'function'
      ) {
        return function fallbackResolveLocaleModuleProxy(scope) {
          try {
            return localizationFallbackContext.fallbackResolveLocaleModule(scope);
          } catch (contextFallbackResolveError) {
            void contextFallbackResolveError;
          }

          return null;
        };
      }

      return function fallbackResolveLocaleModuleProxy() {
        return null;
      };
    })();

    const createLocaleFallbacks = (function resolveCreateLocaleFallbacks() {
      if (
        localizationFallbackBootstrapState &&
        typeof localizationFallbackBootstrapState.createLocaleFallbacks === 'function'
      ) {
        return function createLocaleFallbacksProxy(createOptions) {
          try {
            return localizationFallbackBootstrapState.createLocaleFallbacks(createOptions);
          } catch (createLocaleFallbacksError) {
            void createLocaleFallbacksError;
          }

          return null;
        };
      }

      if (
        localizationFallbackContext &&
        typeof localizationFallbackContext.createLocaleFallbacks === 'function'
      ) {
        return function createLocaleFallbacksProxy(createOptions) {
          try {
            return localizationFallbackContext.createLocaleFallbacks(createOptions);
          } catch (contextCreateLocaleFallbacksError) {
            void contextCreateLocaleFallbacksError;
          }

          return null;
        };
      }

      return function createLocaleFallbacksProxy() {
        return null;
      };
    })();

    return {
      localizationFallbackBootstrapNamespace,
      localizationFallbackBootstrapState,
      localizationFallbackContext,
      localizationFallbackSupport,
      createBasicLocalizationFallbackResolvers,
      localizationFallbackRegistry,
      localizationFallbackResolvers,
      localizationFallbackNamespace,
      fallbackResolveLocaleModule,
      createLocaleFallbacks,
    };
  }

  const namespace = {
    createLocalizationFallbackEnvironment,
  };

  const runtimeScope = detectRuntimeScope();
  const targetName = 'cineCoreLocalizationFallbackEnvironment';
  const existing =
    runtimeScope && typeof runtimeScope[targetName] === 'object'
      ? runtimeScope[targetName]
      : {};

  for (const key of Object.keys(namespace)) {
    existing[key] = namespace[key];
  }

  if (runtimeScope && (typeof runtimeScope === 'object' || typeof runtimeScope === 'function')) {
    try {
      runtimeScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
