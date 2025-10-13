/*
 * Exposes a bridge that bundles all localisation helpers required by the app
 * core runtime. The logic originally lived directly inside the modern runtime
 * bundle. Moving it into this helper keeps the runtime leaner while preserving
 * the fault tolerant behaviour that protects user data, offline flows and the
 * translation system.
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

  function resolveLocalizationSupportTools(options) {
    const resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    const requireFn = options && options.requireFn;
    const runtimeScope = options && options.runtimeScope;
    const coreGlobalScope = options && options.coreGlobalScope;

    let tools = null;

    if (typeof resolveCoreSupportModule === 'function') {
      try {
        tools = resolveCoreSupportModule(
          'cineCoreAppLocalizationSupport',
          '../app-core/localization-support.js'
        );
      } catch (localizationSupportResolveError) {
        void localizationSupportResolveError;
        tools = null;
      }
    }

    if (!isObject(tools) && typeof requireFn === 'function') {
      try {
        const requiredLocalizationSupport = requireFn('../app-core/localization-support.js');
        if (isObject(requiredLocalizationSupport)) {
          tools = requiredLocalizationSupport;
        }
      } catch (localizationSupportRequireError) {
        void localizationSupportRequireError;
      }
    }

    if (isObject(tools)) {
      return tools;
    }

    const fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);

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

  function createFallbackLocalizationBridge() {
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

  function createLocalizationRuntimeBridge(options) {
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    const resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );

    const localizationSupportTools = resolveLocalizationSupportTools({
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
    });

    const localizationBridge = callCreateAppLocalizationSupport(localizationSupportTools, {
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
    });

    if (isObject(localizationBridge)) {
      return localizationBridge;
    }

    return createFallbackLocalizationBridge();
  }

  const namespace = {
    createLocalizationRuntimeBridge,
  };

  const namespaceName = 'cineCoreAppLocalizationRuntimeBridge';
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
