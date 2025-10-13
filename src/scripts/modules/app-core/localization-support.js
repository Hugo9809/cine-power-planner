/*
 * Centralises the localisation bootstrap logic used by the modern runtime.
 *
 * The previous monolithic app core contained a large block of setup code that
 * resolved the localisation runtime environment, fallbacks and helper
 * factories. As part of the ongoing refactor we expose that logic as a
 * dedicated helper module so the main runtime file can stay leaner while the
 * behaviour remains identical.
 */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
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

    const globalScope = detectGlobalScope(runtimeScope);

    if (
      isObject(globalScope) &&
      typeof globalScope.resolveCoreSupportModule === 'function'
    ) {
      try {
        return globalScope.resolveCoreSupportModule.bind(globalScope);
      } catch (bindError) {
        void bindError;
      }
    }

    if (
      isObject(globalScope) &&
      globalScope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS &&
      typeof globalScope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS
        .resolveCoreSupportModule === 'function'
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
          const required = requireFn(requirePath);
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
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    const resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );

    const localizationRuntimeEnvironmentTools = resolveCoreSupportModule(
      'cineCoreLocalizationRuntimeEnvironment',
      '../core/localization-runtime-environment.js'
    );

    const localizationRuntimeEnvironment =
      localizationRuntimeEnvironmentTools &&
      typeof localizationRuntimeEnvironmentTools.createLocalizationRuntimeEnvironment ===
        'function'
        ? localizationRuntimeEnvironmentTools.createLocalizationRuntimeEnvironment({
            resolveCoreSupportModule,
            requireFn,
            runtimeScope,
            coreGlobalScope,
          })
        : null;

    const localizationBridge =
      localizationRuntimeEnvironment &&
      isObject(localizationRuntimeEnvironment.coreLocalizationBridge)
        ? localizationRuntimeEnvironment.coreLocalizationBridge
        : null;

    const localizationFallbacks =
      localizationRuntimeEnvironment &&
      isObject(localizationRuntimeEnvironment.coreLocalizationFallbacks)
        ? localizationRuntimeEnvironment.coreLocalizationFallbacks
        : null;

    const inlineLocalizationFallbacks =
      localizationRuntimeEnvironment &&
      isObject(localizationRuntimeEnvironment.coreInlineLocalizationFallbacks)
        ? localizationRuntimeEnvironment.coreInlineLocalizationFallbacks
        : null;

    const localizationFallbackSupport =
      localizationRuntimeEnvironment &&
      typeof localizationRuntimeEnvironment.localizationFallbackSupport !== 'undefined'
        ? localizationRuntimeEnvironment.localizationFallbackSupport
        : null;

    const createBasicLocalizationFallbackResolvers =
      localizationRuntimeEnvironment &&
      typeof localizationRuntimeEnvironment.createBasicLocalizationFallbackResolvers ===
        'function'
        ? localizationRuntimeEnvironment.createBasicLocalizationFallbackResolvers
        : function createBasicLocalizationFallbackResolversProxy() {
            return null;
          };

    const localizationFallbackRegistry =
      localizationRuntimeEnvironment &&
      isObject(localizationRuntimeEnvironment.localizationFallbackRegistry)
        ? localizationRuntimeEnvironment.localizationFallbackRegistry
        : {
            createFallbackResolvers(fallbackOptions) {
              return createBasicLocalizationFallbackResolvers(fallbackOptions);
            },
          };

    const localizationFallbackResolvers =
      localizationRuntimeEnvironment &&
      isObject(localizationRuntimeEnvironment.localizationFallbackResolvers)
        ? localizationRuntimeEnvironment.localizationFallbackResolvers
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
      localizationRuntimeEnvironment &&
      typeof localizationRuntimeEnvironment.localizationFallbackNamespace !== 'undefined'
        ? localizationRuntimeEnvironment.localizationFallbackNamespace
        : null;

    const fallbackResolveLocaleModule =
      localizationRuntimeEnvironment &&
      typeof localizationRuntimeEnvironment.fallbackResolveLocaleModule === 'function'
        ? localizationRuntimeEnvironment.fallbackResolveLocaleModule
        : function fallbackResolveLocaleModuleProxy() {
            return null;
          };

    const createLocaleFallbacks =
      localizationRuntimeEnvironment &&
      typeof localizationRuntimeEnvironment.createLocaleFallbacks === 'function'
        ? localizationRuntimeEnvironment.createLocaleFallbacks
        : function createLocaleFallbacksProxy() {
            return null;
          };

    return {
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

  const namespace = {
    createAppLocalizationSupport,
  };

  const globalScope = detectGlobalScope();
  const namespaceName = 'cineCoreAppLocalizationSupport';
  const existing = isObject(globalScope) && isObject(globalScope[namespaceName])
    ? globalScope[namespaceName]
    : {};

  for (const key of Object.keys(namespace)) {
    existing[key] = namespace[key];
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
