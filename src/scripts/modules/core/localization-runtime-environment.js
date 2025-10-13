(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function safeRequire(requireFn, requirePath) {
    if (typeof requireFn !== 'function' || typeof requirePath !== 'string') {
      return null;
    }

    try {
      const required = requireFn(requirePath);
      return isObject(required) ? required : null;
    } catch (requireError) {
      void requireError;
    }

    return null;
  }

  function readOption(options, key) {
    if (options && typeof options === 'object' && key in options) {
      return options[key];
    }

    return null;
  }

  function resolveModule(resolver, requireFn, namespaceName, requirePath) {
    if (typeof resolver === 'function') {
      try {
        const resolved = resolver(namespaceName, requirePath);
        if (isObject(resolved)) {
          return resolved;
        }
      } catch (resolutionError) {
        void resolutionError;
      }
    }

    if (typeof requirePath === 'string' && requirePath) {
      const required = safeRequire(requireFn, requirePath);
      if (required) {
        return required;
      }
    }

    return null;
  }

  function ensureInlineSupport(options) {
    const inlineSupport = resolveModule(
      options.resolveCoreSupportModule,
      options.requireFn,
      'cineCoreLocalizationFallbackInlineSupport',
      './modules/core/localization-fallback-inline-support.js'
    );

    if (!isObject(inlineSupport)) {
      return null;
    }

    if (typeof inlineSupport.configure === 'function') {
      try {
        inlineSupport.configure({
          runtimeScope: options.runtimeScope,
          coreGlobalScope: options.coreGlobalScope,
          coreLocalizationFallbackFactories: options.localizationFallbackFactories,
          resolveCoreSupportModule: options.resolveCoreSupportModule,
          requireFn: options.requireFn,
        });
      } catch (inlineSupportConfigureError) {
        void inlineSupportConfigureError;
      }
    }

    return inlineSupport;
  }

  function readLocalizationFallbackEnvironment(options) {
    const environmentModule = resolveModule(
      options.resolveCoreSupportModule,
      options.requireFn,
      'cineCoreLocalizationFallbackEnvironment',
      './modules/core/localization-fallback-environment.js'
    );

    if (
      !isObject(environmentModule) ||
      typeof environmentModule.createLocalizationFallbackEnvironment !== 'function'
    ) {
      return null;
    }

    try {
      return environmentModule.createLocalizationFallbackEnvironment({
        runtimeScope: options.runtimeScope,
        coreGlobalScope: options.coreGlobalScope,
        resolveCoreSupportModule: options.resolveCoreSupportModule,
        requireFn: options.requireFn,
        localizationFallbackFactories: options.localizationFallbackFactories,
        localizationFallbacks: options.localizationFallbacks,
        inlineLocalizationFallbacks: options.inlineLocalizationFallbacks,
        localizationFallbackRegistry: options.localizationFallbackRegistry,
        localizationFallbackResolution: options.localizationFallbackResolution,
        localizationFallbackSupportLite: options.localizationFallbackSupportLite,
        localizationInlineSupport: options.localizationInlineSupport,
      });
    } catch (environmentCreationError) {
      void environmentCreationError;
    }

    return null;
  }

  function createLocalizationRuntimeEnvironment(untrustedOptions) {
    const options = isObject(untrustedOptions) ? untrustedOptions : {};

    const resolver =
      typeof options.resolveCoreSupportModule === 'function'
        ? options.resolveCoreSupportModule
        : null;

    const requireFn = typeof options.requireFn === 'function' ? options.requireFn : null;

    const runtimeScope = readOption(options, 'runtimeScope');
    const coreGlobalScope = readOption(options, 'coreGlobalScope');

    const localizationFallbacks = resolveModule(
      resolver,
      requireFn,
      'cineCoreLocalizationFallbacks',
      './modules/core/localization-fallbacks.js'
    );

    const inlineLocalizationFallbacks = resolveModule(
      resolver,
      requireFn,
      'cineCoreLocalizationInlineFallbacks',
      './modules/core/localization-inline-fallbacks.js'
    );

    const localizationFallbackRegistry = resolveModule(
      resolver,
      requireFn,
      'cineCoreLocalizationFallbackRegistry',
      './modules/core/localization-fallback-registry.js'
    );

    const localizationFallbackResolution = resolveModule(
      resolver,
      requireFn,
      'cineCoreLocalizationFallbackResolution',
      './modules/core/localization-fallback-resolution.js'
    );

    let localizationFallbackSupportLite = resolveModule(
      resolver,
      requireFn,
      'cineCoreLocalizationFallbackSupportLite',
      './modules/core/localization-fallback-support-lite.js'
    );

    if (!localizationFallbackSupportLite) {
      localizationFallbackSupportLite = safeRequire(
        requireFn,
        './modules/core/localization-fallback-support-lite.js'
      );
    }

    const localizationFallbackFactories = resolveModule(
      resolver,
      requireFn,
      'cineCoreLocalizationFallbackFactories',
      './modules/core/localization-fallback-factories.js'
    );

    const inlineSupport = ensureInlineSupport({
      resolveCoreSupportModule: resolver,
      requireFn,
      runtimeScope,
      coreGlobalScope,
      localizationFallbackFactories,
    });

    const fallbackEnvironment = readLocalizationFallbackEnvironment({
      resolveCoreSupportModule: resolver,
      requireFn,
      runtimeScope,
      coreGlobalScope,
      localizationFallbackFactories,
      localizationFallbacks,
      inlineLocalizationFallbacks,
      localizationFallbackRegistry,
      localizationFallbackResolution,
      localizationFallbackSupportLite,
      localizationInlineSupport: inlineSupport,
    });

    function createBasicLocalizationFallbackResolversProxy(fallbackOptions) {
      void fallbackOptions;
      return null;
    }

    const createBasicLocalizationFallbackResolvers =
      fallbackEnvironment &&
      typeof fallbackEnvironment.createBasicLocalizationFallbackResolvers === 'function'
        ? fallbackEnvironment.createBasicLocalizationFallbackResolvers
        : createBasicLocalizationFallbackResolversProxy;

    const fallbackRegistry = fallbackEnvironment && fallbackEnvironment.localizationFallbackRegistry
      ? fallbackEnvironment.localizationFallbackRegistry
      : localizationFallbackRegistry &&
        typeof localizationFallbackRegistry.createFallbackResolvers === 'function'
      ? localizationFallbackRegistry
      : {
          createFallbackResolvers(fallbackOptions) {
            return createBasicLocalizationFallbackResolvers(fallbackOptions);
          },
        };

    const fallbackResolvers = fallbackEnvironment && fallbackEnvironment.localizationFallbackResolvers
      ? fallbackEnvironment.localizationFallbackResolvers
      : fallbackRegistry && typeof fallbackRegistry.createFallbackResolvers === 'function'
      ? fallbackRegistry.createFallbackResolvers({
          directNamespace: localizationFallbacks,
          inlineNamespace: inlineLocalizationFallbacks,
        })
      : createBasicLocalizationFallbackResolvers({
          directNamespace: localizationFallbacks,
          inlineNamespace: inlineLocalizationFallbacks,
        });

    const fallbackNamespace = fallbackEnvironment && fallbackEnvironment.localizationFallbackNamespace
      ? fallbackEnvironment.localizationFallbackNamespace
      : null;

    function fallbackResolveLocaleModuleProxy() {
      return null;
    }

    const fallbackResolveLocaleModule = fallbackEnvironment &&
      typeof fallbackEnvironment.fallbackResolveLocaleModule === 'function'
        ? fallbackEnvironment.fallbackResolveLocaleModule
        : fallbackResolveLocaleModuleProxy;

    function createLocaleFallbacksProxy() {
      return null;
    }

    const createLocaleFallbacks = fallbackEnvironment &&
      typeof fallbackEnvironment.createLocaleFallbacks === 'function'
        ? fallbackEnvironment.createLocaleFallbacks
        : createLocaleFallbacksProxy;

    const localizationFallbackSupport = fallbackEnvironment &&
      typeof fallbackEnvironment.localizationFallbackSupport !== 'undefined'
        ? fallbackEnvironment.localizationFallbackSupport
        : null;

    const coreLocalizationBridge = resolveModule(
      resolver,
      requireFn,
      'cineCoreLocalizationBridge',
      './modules/core/localization-bridge.js'
    );

    return {
      coreLocalizationBridge,
      coreLocalizationFallbacks: localizationFallbacks,
      coreInlineLocalizationFallbacks: inlineLocalizationFallbacks,
      coreLocalizationFallbackRegistry: localizationFallbackRegistry,
      coreLocalizationFallbackResolution: localizationFallbackResolution,
      coreLocalizationFallbackSupportLite: localizationFallbackSupportLite,
      coreLocalizationFallbackFactories: localizationFallbackFactories,
      localizationInlineSupport: inlineSupport,
      localizationFallbackEnvironment: fallbackEnvironment,
      localizationFallbackSupport,
      createBasicLocalizationFallbackResolvers,
      localizationFallbackRegistry: fallbackRegistry,
      localizationFallbackResolvers: fallbackResolvers,
      localizationFallbackNamespace: fallbackNamespace,
      fallbackResolveLocaleModule,
      createLocaleFallbacks,
    };
  }

  const api = {
    createLocalizationRuntimeEnvironment,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
    return;
  }

  const globalScope =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof self !== 'undefined' && self) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    null;

  if (globalScope && !globalScope.cineCoreLocalizationRuntimeEnvironment) {
    globalScope.cineCoreLocalizationRuntimeEnvironment = api;
  }
})();
