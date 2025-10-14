/*
 * Centralises the localisation bootstrap wiring for the modern runtime. The
 * original app-core file contained an enormous sequence of guards and
 * fallbacks; this module now owns that logic so the core orchestrator can stay
 * readable while we continue the multi-step refactor. The resolver keeps every
 * existing safeguard intact so localisation continues to function offline and
 * during backup restores.
 */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function detectScope(primaryScope) {
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

  function ensureScope(candidate, fallback) {
    if (isObject(candidate)) {
      return candidate;
    }

    return detectScope(fallback);
  }

  function ensureResolveCoreSupportModule(candidate, requireFn, runtimeScope) {
    if (typeof candidate === 'function') {
      return candidate;
    }

    const scope = ensureScope(runtimeScope);

    if (scope && typeof scope.resolveCoreSupportModule === 'function') {
      try {
        return scope.resolveCoreSupportModule.bind(scope);
      } catch (bindError) {
        void bindError;
      }
    }

    if (
      scope &&
      scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS &&
      typeof scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule === 'function'
    ) {
      try {
        return scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule.bind(
          scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS
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

  function registerScope(scopes, scope) {
    if (!isObject(scope)) {
      return;
    }

    if (scopes.indexOf(scope) === -1) {
      scopes.push(scope);
    }
  }

  function ensureFallbackScopes(candidateScopes, runtimeScope, coreGlobalScope) {
    const scopes = Array.isArray(candidateScopes) ? candidateScopes.slice() : [];
    registerScope(scopes, runtimeScope);
    registerScope(scopes, coreGlobalScope);
    registerScope(scopes, typeof globalThis !== 'undefined' ? globalThis : null);
    registerScope(scopes, typeof window !== 'undefined' ? window : null);
    registerScope(scopes, typeof self !== 'undefined' ? self : null);
    registerScope(scopes, typeof global !== 'undefined' ? global : null);
    return scopes;
  }

  function resolveLocalizationSupportTools(options) {
    if (options && isObject(options.localizationSupportTools)) {
      return options.localizationSupportTools;
    }

    const resolveCoreSupportModule =
      options && typeof options.resolveCoreSupportModule === 'function'
        ? options.resolveCoreSupportModule
        : null;

    if (resolveCoreSupportModule) {
      try {
        const resolved = resolveCoreSupportModule(
          'cineCoreAppLocalizationSupport',
          './modules/app-core/localization-support.js'
        );
        if (isObject(resolved)) {
          return resolved;
        }
      } catch (localizationSupportResolveError) {
        void localizationSupportResolveError;
      }
    }

    const requireFn = ensureRequireFn(options && options.requireFn);

    if (typeof requireFn === 'function') {
      try {
        const required = requireFn('./modules/app-core/localization-support.js');
        if (isObject(required)) {
          return required;
        }
      } catch (localizationSupportRequireError) {
        void localizationSupportRequireError;
      }
    }

    const fallbackScopes = ensureFallbackScopes(
      options && options.fallbackScopes,
      options && options.runtimeScope,
      options && options.coreGlobalScope
    );

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];

      try {
        const candidate = scope && scope.cineCoreAppLocalizationSupport;
        if (isObject(candidate)) {
          return candidate;
        }
      } catch (localizationSupportLookupError) {
        void localizationSupportLookupError;
      }
    }

    return null;
  }

  function createLocalizationSupport(options) {
    const supportTools = resolveLocalizationSupportTools(options);

    if (
      supportTools &&
      typeof supportTools.createAppLocalizationSupport === 'function'
    ) {
      try {
        return supportTools.createAppLocalizationSupport({
          resolveCoreSupportModule: options && options.resolveCoreSupportModule,
          requireFn: options && options.requireFn,
          runtimeScope: options && options.runtimeScope,
          coreGlobalScope: options && options.coreGlobalScope,
        });
      } catch (localizationSupportError) {
        void localizationSupportError;
      }
    }

    return null;
  }

  function createLocalizationBootstrapResult(options) {
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    const resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );

    const fallbackScopes = ensureFallbackScopes(
      options && options.fallbackScopes,
      runtimeScope,
      coreGlobalScope
    );

    const localizationSupport = createLocalizationSupport({
      localizationSupportTools: options && options.localizationSupportTools,
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
      fallbackScopes,
    });

    const localizationRuntimeEnvironment =
      localizationSupport && localizationSupport.localizationRuntimeEnvironment
        ? localizationSupport.localizationRuntimeEnvironment
        : null;

    const localizationBridge =
      localizationSupport && localizationSupport.localizationBridge
        ? localizationSupport.localizationBridge
        : null;

    const localizationFallbacks =
      localizationSupport && localizationSupport.localizationFallbacks
        ? localizationSupport.localizationFallbacks
        : null;

    const inlineLocalizationFallbacks =
      localizationSupport && localizationSupport.inlineLocalizationFallbacks
        ? localizationSupport.inlineLocalizationFallbacks
        : null;

    const localizationFallbackSupport =
      localizationSupport &&
      typeof localizationSupport.localizationFallbackSupport !== 'undefined'
        ? localizationSupport.localizationFallbackSupport
        : null;

    const createBasicLocalizationFallbackResolvers =
      localizationSupport &&
      typeof localizationSupport.createBasicLocalizationFallbackResolvers === 'function'
        ? localizationSupport.createBasicLocalizationFallbackResolvers
        : function createBasicLocalizationFallbackResolversProxy() {
            return null;
          };

    const localizationFallbackRegistry =
      localizationSupport && localizationSupport.localizationFallbackRegistry
        ? localizationSupport.localizationFallbackRegistry
        : {
            createFallbackResolvers(fallbackOptions) {
              return createBasicLocalizationFallbackResolvers(fallbackOptions);
            },
          };

    const localizationFallbackResolvers =
      localizationSupport && localizationSupport.localizationFallbackResolvers
        ? localizationSupport.localizationFallbackResolvers
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
      localizationSupport &&
      typeof localizationSupport.localizationFallbackNamespace !== 'undefined'
        ? localizationSupport.localizationFallbackNamespace
        : null;

    const fallbackResolveLocaleModule =
      localizationSupport &&
      typeof localizationSupport.fallbackResolveLocaleModule === 'function'
        ? localizationSupport.fallbackResolveLocaleModule
        : function fallbackResolveLocaleModuleProxy() {
            return null;
          };

    const createLocaleFallbacks =
      localizationSupport &&
      typeof localizationSupport.createLocaleFallbacks === 'function'
        ? localizationSupport.createLocaleFallbacks
        : function createLocaleFallbacksProxy() {
            return null;
          };

    return {
      localizationSupport,
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
    createLocalizationBootstrapResult,
  };

  const globalScope = detectScope();
  const namespaceName = 'cineCoreAppLocalizationBootstrap';
  const existing =
    isObject(globalScope) && isObject(globalScope[namespaceName])
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
})();
