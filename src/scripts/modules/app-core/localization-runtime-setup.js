/*
 * Provides a high level factory that resolves the localisation runtime bridge
 * used by the modern app core bundle. The logic previously lived directly
 * inside app-core-new-1.js and was responsible for carefully falling back to
 * offline friendly defaults whenever the helper modules are unavailable. This
 * module keeps that behaviour intact while letting the runtime file focus on
 * orchestration.
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

  function ensureScope(candidate, fallbackScope) {
    if (isObject(candidate)) {
      return candidate;
    }

    return detectScope(fallbackScope);
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

    const scope = detectScope(runtimeScope);

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

  function collectCandidateScopes(primaryScope, secondaryScope) {
    const scopes = [];

    if (isObject(primaryScope) && scopes.indexOf(primaryScope) === -1) {
      scopes.push(primaryScope);
    }

    if (isObject(secondaryScope) && scopes.indexOf(secondaryScope) === -1) {
      scopes.push(secondaryScope);
    }

    const additionalScopes = [
      typeof globalThis !== 'undefined' ? globalThis : null,
      typeof window !== 'undefined' ? window : null,
      typeof self !== 'undefined' ? self : null,
      typeof global !== 'undefined' ? global : null,
    ];

    for (let index = 0; index < additionalScopes.length; index += 1) {
      const scope = additionalScopes[index];
      if (isObject(scope) && scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }

    return scopes;
  }

  function resolveLocalizationRuntimeBridgeTools(options) {
    const resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    const requireFn = options && options.requireFn;
    const runtimeScope = options && options.runtimeScope;
    const coreGlobalScope = options && options.coreGlobalScope;

    let tools = null;

    if (typeof resolveCoreSupportModule === 'function') {
      try {
        tools = resolveCoreSupportModule(
          'cineCoreAppLocalizationRuntimeBridge',
          './modules/app-core/localization-runtime-bridge.js'
        );
      } catch (localizationBridgeResolveError) {
        void localizationBridgeResolveError;
        tools = null;
      }
    }

    if (!isObject(tools) && typeof requireFn === 'function') {
      try {
        const required = requireFn('./modules/app-core/localization-runtime-bridge.js');
        if (isObject(required)) {
          tools = required;
        }
      } catch (localizationBridgeRequireError) {
        void localizationBridgeRequireError;
      }
    }

    if (isObject(tools)) {
      return tools;
    }

    const fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];

      try {
        const candidate = scope && scope.cineCoreAppLocalizationRuntimeBridge;
        if (isObject(candidate)) {
          return candidate;
        }
      } catch (localizationBridgeLookupError) {
        void localizationBridgeLookupError;
      }
    }

    return null;
  }

  function callCreateAppLocalizationSupport(tools, options) {
    if (isObject(tools) && typeof tools.createAppLocalizationSupport === 'function') {
      try {
        return tools.createAppLocalizationSupport(options);
      } catch (createAppLocalizationSupportError) {
        void createAppLocalizationSupportError;
      }
    }

    return null;
  }

  function createFallbackLocalizationBridge(options) {
    const resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    const requireFn = options && options.requireFn;
    const runtimeScope = options && options.runtimeScope;
    const coreGlobalScope = options && options.coreGlobalScope;

    let localizationSupportTools = null;

    if (typeof resolveCoreSupportModule === 'function') {
      try {
        localizationSupportTools = resolveCoreSupportModule(
          'cineCoreAppLocalizationSupport',
          '../app-core/localization-support.js'
        );
      } catch (localizationSupportResolveError) {
        void localizationSupportResolveError;
        localizationSupportTools = null;
      }
    }

    if (!isObject(localizationSupportTools) && typeof requireFn === 'function') {
      try {
        const requiredLocalizationSupport = requireFn('../app-core/localization-support.js');
        if (isObject(requiredLocalizationSupport)) {
          localizationSupportTools = requiredLocalizationSupport;
        }
      } catch (localizationSupportRequireError) {
        void localizationSupportRequireError;
      }
    }

    if (!isObject(localizationSupportTools)) {
      const fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);

      for (let index = 0; index < fallbackScopes.length; index += 1) {
        const scope = fallbackScopes[index];

        try {
          const candidate = scope && scope.cineCoreAppLocalizationSupport;
          if (isObject(candidate)) {
            localizationSupportTools = candidate;
            break;
          }
        } catch (localizationSupportLookupError) {
          void localizationSupportLookupError;
        }
      }
    }

    const localizationBridge = callCreateAppLocalizationSupport(localizationSupportTools, {
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
    });

    if (isObject(localizationBridge)) {
      return localizationBridge;
    }

    function createBasicLocalizationFallbackResolversProxy() {
      return null;
    }

    const localizationFallbackRegistry = {
      createFallbackResolvers(fallbackOptions) {
        return createBasicLocalizationFallbackResolversProxy(fallbackOptions);
      },
    };

    function fallbackResolveLocaleModuleProxy() {
      return null;
    }

    function createLocaleFallbacksProxy() {
      return null;
    }

    return {
      localizationRuntimeEnvironment: null,
      localizationBridge: null,
      localizationFallbacks: null,
      inlineLocalizationFallbacks: null,
      localizationFallbackSupport: null,
      createBasicLocalizationFallbackResolvers: createBasicLocalizationFallbackResolversProxy,
      localizationFallbackRegistry,
      localizationFallbackResolvers: null,
      localizationFallbackNamespace: null,
      fallbackResolveLocaleModule: fallbackResolveLocaleModuleProxy,
      createLocaleFallbacks: createLocaleFallbacksProxy,
    };
  }

  function ensureBridgeFactory(options) {
    const requireFn = options && options.requireFn;
    const runtimeScope = options && options.runtimeScope;
    const coreGlobalScope = options && options.coreGlobalScope;

    const tools = resolveLocalizationRuntimeBridgeTools(options);

    if (isObject(tools) && typeof tools.createLocalizationRuntimeBridge === 'function') {
      return tools.createLocalizationRuntimeBridge;
    }

    if (typeof requireFn === 'function') {
      try {
        const required = requireFn('./modules/app-core/localization-runtime-bridge.js');
        if (
          isObject(required) &&
          typeof required.createLocalizationRuntimeBridge === 'function'
        ) {
          return required.createLocalizationRuntimeBridge;
        }
      } catch (localizationBridgeRequireError) {
        void localizationBridgeRequireError;
      }
    }

    const fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];

      try {
        const candidate = scope && scope.cineCoreAppLocalizationRuntimeBridge;
        if (
          isObject(candidate) &&
          typeof candidate.createLocalizationRuntimeBridge === 'function'
        ) {
          return candidate.createLocalizationRuntimeBridge;
        }
      } catch (localizationBridgeLookupError) {
        void localizationBridgeLookupError;
      }
    }

    return function fallbackCreateLocalizationRuntimeBridge(fallbackOptions) {
      return createFallbackLocalizationBridge(fallbackOptions);
    };
  }

  function normalizeLocalizationRuntimeBridge(bridge, fallbackOptions) {
    const resolvedBridge = isObject(bridge)
      ? bridge
      : createFallbackLocalizationBridge(fallbackOptions);

    const localizationRuntimeEnvironment = isObject(
      resolvedBridge.localizationRuntimeEnvironment
    )
      ? resolvedBridge.localizationRuntimeEnvironment
      : null;

    const localizationBridge = isObject(resolvedBridge.localizationBridge)
      ? resolvedBridge.localizationBridge
      : null;

    const localizationFallbacks = isObject(resolvedBridge.localizationFallbacks)
      ? resolvedBridge.localizationFallbacks
      : null;

    const inlineLocalizationFallbacks = isObject(
      resolvedBridge.inlineLocalizationFallbacks
    )
      ? resolvedBridge.inlineLocalizationFallbacks
      : null;

    const localizationFallbackSupport =
      typeof resolvedBridge.localizationFallbackSupport !== 'undefined'
        ? resolvedBridge.localizationFallbackSupport
        : null;

    const createBasicLocalizationFallbackResolvers =
      typeof resolvedBridge.createBasicLocalizationFallbackResolvers === 'function'
        ? resolvedBridge.createBasicLocalizationFallbackResolvers
        : function createBasicLocalizationFallbackResolversProxy() {
            return null;
          };

    const localizationFallbackRegistry = isObject(
      resolvedBridge.localizationFallbackRegistry
    )
      ? resolvedBridge.localizationFallbackRegistry
      : {
          createFallbackResolvers(fallbackOptions) {
            return createBasicLocalizationFallbackResolvers(fallbackOptions);
          },
        };

    const fallbackResolveLocaleModule =
      typeof resolvedBridge.fallbackResolveLocaleModule === 'function'
        ? resolvedBridge.fallbackResolveLocaleModule
        : function fallbackResolveLocaleModuleProxy() {
            return null;
          };

    const createLocaleFallbacks =
      typeof resolvedBridge.createLocaleFallbacks === 'function'
        ? resolvedBridge.createLocaleFallbacks
        : function createLocaleFallbacksProxy() {
            return null;
          };

    const localizationFallbackNamespace =
      typeof resolvedBridge.localizationFallbackNamespace !== 'undefined'
        ? resolvedBridge.localizationFallbackNamespace
        : null;

    const localizationFallbackResolvers = resolvedBridge.localizationFallbackResolvers
      ? resolvedBridge.localizationFallbackResolvers
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

  function createLocalizationRuntimeSetup(options) {
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    const resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );

    const createLocalizationRuntimeBridge = ensureBridgeFactory({
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
    });

    const localizationRuntimeBridge = createLocalizationRuntimeBridge({
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
    });

    return normalizeLocalizationRuntimeBridge(localizationRuntimeBridge, {
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
    });
  }

  const namespace = {
    createLocalizationRuntimeSetup,
  };

  const namespaceName = 'cineCoreAppLocalizationRuntimeSetup';
  const globalScope = detectScope();
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
