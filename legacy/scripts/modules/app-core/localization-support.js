function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function isObject(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
  }

  function detectGlobalScope(primaryScope) {
    if (isObject(primaryScope)) {
      return primaryScope;
    }

    if (typeof globalThis !== 'undefined' && isObject(globalThis)) {
      return globalThis;
    }

    if (typeof window !== 'undefined' && isObject(window)) {
      return window;
    }

    if (typeof self !== 'undefined' && isObject(self)) {
      return self;
    }

    if (typeof global !== 'undefined' && isObject(global)) {
      return global;
    }

    return null;
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

  function ensureResolveCoreSupportModule(candidate, requireFn, runtimeScope) {
    if (typeof candidate === 'function') {
      return candidate;
    }

    var globalScope = detectGlobalScope(runtimeScope);

    if (isObject(globalScope) && typeof globalScope.resolveCoreSupportModule === 'function') {
      try {
        return globalScope.resolveCoreSupportModule.bind(globalScope);
      } catch (bindError) {
        void bindError;
      }
    }

    if (
      isObject(globalScope) &&
      globalScope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS &&
      typeof globalScope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule === 'function'
    ) {
      try {
        return globalScope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule.bind(
          globalScope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS
        );
      } catch (bootstrapBindError) {
        void bootstrapBindError;
      }
    }

    if (typeof requireFn === 'function') {
      return function fallbackResolveCoreSupportModule(namespaceName, requirePath) {
        if (typeof namespaceName !== 'string' || !namespaceName) {
          return null;
        }

        if (typeof requirePath !== 'string' || !requirePath) {
          return null;
        }

        try {
          var required = requireFn(requirePath);
          return isObject(required) ? required : null;
        } catch (supportModuleError) {
          void supportModuleError;
        }

        return null;
      };
    }

    return function unresolvedSupportModule() {
      return null;
    };
  }

  function ensureScope(candidate, fallbackScope) {
    if (isObject(candidate)) {
      return candidate;
    }

    return detectGlobalScope(fallbackScope);
  }

  function createAppLocalizationSupport(options) {
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = ensureScope(options && options.runtimeScope);
    var coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    var resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );

    var localizationRuntimeEnvironmentTools = resolveCoreSupportModule(
      'cineCoreLocalizationRuntimeEnvironment',
      '../core/localization-runtime-environment.js'
    );

    var localizationRuntimeEnvironment =
      localizationRuntimeEnvironmentTools &&
      typeof localizationRuntimeEnvironmentTools.createLocalizationRuntimeEnvironment === 'function'
        ? localizationRuntimeEnvironmentTools.createLocalizationRuntimeEnvironment({
            resolveCoreSupportModule: resolveCoreSupportModule,
            requireFn: requireFn,
            runtimeScope: runtimeScope,
            coreGlobalScope: coreGlobalScope
          })
        : null;

    var localizationBridge =
      localizationRuntimeEnvironment &&
      isObject(localizationRuntimeEnvironment.coreLocalizationBridge)
        ? localizationRuntimeEnvironment.coreLocalizationBridge
        : null;

    var localizationFallbacks =
      localizationRuntimeEnvironment &&
      isObject(localizationRuntimeEnvironment.coreLocalizationFallbacks)
        ? localizationRuntimeEnvironment.coreLocalizationFallbacks
        : null;

    var inlineLocalizationFallbacks =
      localizationRuntimeEnvironment &&
      isObject(localizationRuntimeEnvironment.coreInlineLocalizationFallbacks)
        ? localizationRuntimeEnvironment.coreInlineLocalizationFallbacks
        : null;

    var localizationFallbackSupport =
      localizationRuntimeEnvironment &&
      typeof localizationRuntimeEnvironment.localizationFallbackSupport !== 'undefined'
        ? localizationRuntimeEnvironment.localizationFallbackSupport
        : null;

    var createBasicLocalizationFallbackResolvers =
      localizationRuntimeEnvironment &&
      typeof localizationRuntimeEnvironment.createBasicLocalizationFallbackResolvers === 'function'
        ? localizationRuntimeEnvironment.createBasicLocalizationFallbackResolvers
        : function createBasicLocalizationFallbackResolversProxy() {
            return null;
          };

    var localizationFallbackRegistry =
      localizationRuntimeEnvironment &&
      isObject(localizationRuntimeEnvironment.localizationFallbackRegistry)
        ? localizationRuntimeEnvironment.localizationFallbackRegistry
        : {
            createFallbackResolvers: function createFallbackResolvers(fallbackOptions) {
              return createBasicLocalizationFallbackResolvers(fallbackOptions);
            }
          };

    var localizationFallbackResolvers =
      localizationRuntimeEnvironment &&
      isObject(localizationRuntimeEnvironment.localizationFallbackResolvers)
        ? localizationRuntimeEnvironment.localizationFallbackResolvers
        : localizationFallbackRegistry &&
          typeof localizationFallbackRegistry.createFallbackResolvers === 'function'
        ? localizationFallbackRegistry.createFallbackResolvers({
            directNamespace: localizationFallbacks,
            inlineNamespace: inlineLocalizationFallbacks
          })
        : createBasicLocalizationFallbackResolvers({
            directNamespace: localizationFallbacks,
            inlineNamespace: inlineLocalizationFallbacks
          });

    var localizationFallbackNamespace =
      localizationRuntimeEnvironment &&
      typeof localizationRuntimeEnvironment.localizationFallbackNamespace !== 'undefined'
        ? localizationRuntimeEnvironment.localizationFallbackNamespace
        : null;

    var fallbackResolveLocaleModule =
      localizationRuntimeEnvironment &&
      typeof localizationRuntimeEnvironment.fallbackResolveLocaleModule === 'function'
        ? localizationRuntimeEnvironment.fallbackResolveLocaleModule
        : function fallbackResolveLocaleModuleProxy() {
            return null;
          };

    var createLocaleFallbacks =
      localizationRuntimeEnvironment &&
      typeof localizationRuntimeEnvironment.createLocaleFallbacks === 'function'
        ? localizationRuntimeEnvironment.createLocaleFallbacks
        : function createLocaleFallbacksProxy() {
            return null;
          };

    return {
      localizationRuntimeEnvironment: localizationRuntimeEnvironment,
      localizationBridge: localizationBridge,
      localizationFallbacks: localizationFallbacks,
      inlineLocalizationFallbacks: inlineLocalizationFallbacks,
      localizationFallbackSupport: localizationFallbackSupport,
      createBasicLocalizationFallbackResolvers: createBasicLocalizationFallbackResolvers,
      localizationFallbackRegistry: localizationFallbackRegistry,
      localizationFallbackResolvers: localizationFallbackResolvers,
      localizationFallbackNamespace: localizationFallbackNamespace,
      fallbackResolveLocaleModule: fallbackResolveLocaleModule,
      createLocaleFallbacks: createLocaleFallbacks
    };
  }

  var namespace = {
    createAppLocalizationSupport: createAppLocalizationSupport
  };

  var globalScope = detectGlobalScope();
  var namespaceName = 'cineCoreAppLocalizationSupport';
  var existing = isObject(globalScope) && isObject(globalScope[namespaceName]) ? globalScope[namespaceName] : {};

  for (var key in namespace) {
    if (Object.prototype.hasOwnProperty.call(namespace, key)) {
      existing[key] = namespace[key];
    }
  }

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
})();
