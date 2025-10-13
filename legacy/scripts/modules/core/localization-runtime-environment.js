function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function isObject(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
  }
  function safeRequire(requireFn, requirePath) {
    if (typeof requireFn !== 'function' || typeof requirePath !== 'string') {
      return null;
    }
    try {
      var required = requireFn(requirePath);
      return isObject(required) ? required : null;
    } catch (requireError) {
      void requireError;
    }
    return null;
  }
  function readOption(options, key) {
    if (options && _typeof(options) === 'object' && key in options) {
      return options[key];
    }
    return null;
  }
  function resolveModule(resolver, requireFn, namespaceName, requirePath) {
    if (typeof resolver === 'function') {
      try {
        var resolved = resolver(namespaceName, requirePath);
        if (isObject(resolved)) {
          return resolved;
        }
      } catch (resolutionError) {
        void resolutionError;
      }
    }
    if (typeof requirePath === 'string' && requirePath) {
      var required = safeRequire(requireFn, requirePath);
      if (required) {
        return required;
      }
    }
    return null;
  }
  function ensureInlineSupport(options) {
    var inlineSupport = resolveModule(options.resolveCoreSupportModule, options.requireFn, 'cineCoreLocalizationFallbackInlineSupport', './modules/core/localization-fallback-inline-support.js');
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
          requireFn: options.requireFn
        });
      } catch (inlineSupportConfigureError) {
        void inlineSupportConfigureError;
      }
    }
    return inlineSupport;
  }
  function readLocalizationFallbackEnvironment(options) {
    var environmentModule = resolveModule(options.resolveCoreSupportModule, options.requireFn, 'cineCoreLocalizationFallbackEnvironment', './modules/core/localization-fallback-environment.js');
    if (!isObject(environmentModule) || typeof environmentModule.createLocalizationFallbackEnvironment !== 'function') {
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
        localizationInlineSupport: options.localizationInlineSupport
      });
    } catch (environmentCreationError) {
      void environmentCreationError;
    }
    return null;
  }
  function createLocalizationRuntimeEnvironment(untrustedOptions) {
    var options = isObject(untrustedOptions) ? untrustedOptions : {};
    var resolver = typeof options.resolveCoreSupportModule === 'function' ? options.resolveCoreSupportModule : null;
    var requireFn = typeof options.requireFn === 'function' ? options.requireFn : null;
    var runtimeScope = readOption(options, 'runtimeScope');
    var coreGlobalScope = readOption(options, 'coreGlobalScope');
    var localizationFallbacks = resolveModule(resolver, requireFn, 'cineCoreLocalizationFallbacks', './modules/core/localization-fallbacks.js');
    var inlineLocalizationFallbacks = resolveModule(resolver, requireFn, 'cineCoreLocalizationInlineFallbacks', './modules/core/localization-inline-fallbacks.js');
    var localizationFallbackRegistry = resolveModule(resolver, requireFn, 'cineCoreLocalizationFallbackRegistry', './modules/core/localization-fallback-registry.js');
    var localizationFallbackResolution = resolveModule(resolver, requireFn, 'cineCoreLocalizationFallbackResolution', './modules/core/localization-fallback-resolution.js');
    var localizationFallbackSupportLite = resolveModule(resolver, requireFn, 'cineCoreLocalizationFallbackSupportLite', './modules/core/localization-fallback-support-lite.js');
    if (!localizationFallbackSupportLite) {
      localizationFallbackSupportLite = safeRequire(requireFn, './modules/core/localization-fallback-support-lite.js');
    }
    var localizationFallbackFactories = resolveModule(resolver, requireFn, 'cineCoreLocalizationFallbackFactories', './modules/core/localization-fallback-factories.js');
    var inlineSupport = ensureInlineSupport({
      resolveCoreSupportModule: resolver,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      localizationFallbackFactories: localizationFallbackFactories
    });
    var fallbackEnvironment = readLocalizationFallbackEnvironment({
      resolveCoreSupportModule: resolver,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      localizationFallbackFactories: localizationFallbackFactories,
      localizationFallbacks: localizationFallbacks,
      inlineLocalizationFallbacks: inlineLocalizationFallbacks,
      localizationFallbackRegistry: localizationFallbackRegistry,
      localizationFallbackResolution: localizationFallbackResolution,
      localizationFallbackSupportLite: localizationFallbackSupportLite,
      localizationInlineSupport: inlineSupport
    });
    function createBasicLocalizationFallbackResolversProxy(fallbackOptions) {
      void fallbackOptions;
      return null;
    }
    var createBasicLocalizationFallbackResolvers = fallbackEnvironment && typeof fallbackEnvironment.createBasicLocalizationFallbackResolvers === 'function' ? fallbackEnvironment.createBasicLocalizationFallbackResolvers : createBasicLocalizationFallbackResolversProxy;
    var fallbackRegistry = fallbackEnvironment && fallbackEnvironment.localizationFallbackRegistry ? fallbackEnvironment.localizationFallbackRegistry : localizationFallbackRegistry && typeof localizationFallbackRegistry.createFallbackResolvers === 'function' ? localizationFallbackRegistry : {
      createFallbackResolvers: function createFallbackResolvers(fallbackOptions) {
        return createBasicLocalizationFallbackResolvers(fallbackOptions);
      }
    };
    var fallbackResolvers = fallbackEnvironment && fallbackEnvironment.localizationFallbackResolvers ? fallbackEnvironment.localizationFallbackResolvers : fallbackRegistry && typeof fallbackRegistry.createFallbackResolvers === 'function' ? fallbackRegistry.createFallbackResolvers({
      directNamespace: localizationFallbacks,
      inlineNamespace: inlineLocalizationFallbacks
    }) : createBasicLocalizationFallbackResolvers({
      directNamespace: localizationFallbacks,
      inlineNamespace: inlineLocalizationFallbacks
    });
    var fallbackNamespace = fallbackEnvironment && fallbackEnvironment.localizationFallbackNamespace ? fallbackEnvironment.localizationFallbackNamespace : null;
    function fallbackResolveLocaleModuleProxy() {
      return null;
    }
    var fallbackResolveLocaleModule = fallbackEnvironment && typeof fallbackEnvironment.fallbackResolveLocaleModule === 'function' ? fallbackEnvironment.fallbackResolveLocaleModule : fallbackResolveLocaleModuleProxy;
    function createLocaleFallbacksProxy() {
      return null;
    }
    var createLocaleFallbacks = fallbackEnvironment && typeof fallbackEnvironment.createLocaleFallbacks === 'function' ? fallbackEnvironment.createLocaleFallbacks : createLocaleFallbacksProxy;
    var localizationFallbackSupport = fallbackEnvironment && typeof fallbackEnvironment.localizationFallbackSupport !== 'undefined' ? fallbackEnvironment.localizationFallbackSupport : null;
    var coreLocalizationBridge = resolveModule(resolver, requireFn, 'cineCoreLocalizationBridge', './modules/core/localization-bridge.js');
    return {
      coreLocalizationBridge: coreLocalizationBridge,
      coreLocalizationFallbacks: localizationFallbacks,
      coreInlineLocalizationFallbacks: inlineLocalizationFallbacks,
      coreLocalizationFallbackRegistry: localizationFallbackRegistry,
      coreLocalizationFallbackResolution: localizationFallbackResolution,
      coreLocalizationFallbackSupportLite: localizationFallbackSupportLite,
      coreLocalizationFallbackFactories: localizationFallbackFactories,
      localizationInlineSupport: inlineSupport,
      localizationFallbackEnvironment: fallbackEnvironment,
      localizationFallbackSupport: localizationFallbackSupport,
      createBasicLocalizationFallbackResolvers: createBasicLocalizationFallbackResolvers,
      localizationFallbackRegistry: fallbackRegistry,
      localizationFallbackResolvers: fallbackResolvers,
      localizationFallbackNamespace: fallbackNamespace,
      fallbackResolveLocaleModule: fallbackResolveLocaleModule,
      createLocaleFallbacks: createLocaleFallbacks
    };
  }
  var api = {
    createLocalizationRuntimeEnvironment: createLocalizationRuntimeEnvironment
  };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
    return;
  }
  var globalScope = typeof globalThis !== 'undefined' && globalThis || typeof self !== 'undefined' && self || typeof window !== 'undefined' && window || typeof global !== 'undefined' && global || null;
  if (globalScope && !globalScope.cineCoreLocalizationRuntimeEnvironment) {
    globalScope.cineCoreLocalizationRuntimeEnvironment = api;
  }
})();