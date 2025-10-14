/*
 * Centralises the logic that resolves the localisation runtime used by the
 * modern Cine Power Planner bundle. The orchestration file previously contained
 * the helper discovery logic directly; moving it here keeps the core runtime
 * lean while preserving all offline-first fallbacks.
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

  function registerScope(scopes, scope) {
    if (!isObject(scope)) {
      return;
    }

    if (scopes.indexOf(scope) === -1) {
      scopes.push(scope);
    }
  }

  function collectCandidateScopes(primaryScope, secondaryScope) {
    const scopes = [];
    registerScope(scopes, primaryScope);
    registerScope(scopes, secondaryScope);
    registerScope(scopes, typeof globalThis !== 'undefined' ? globalThis : null);
    registerScope(scopes, typeof window !== 'undefined' ? window : null);
    registerScope(scopes, typeof self !== 'undefined' ? self : null);
    registerScope(scopes, typeof global !== 'undefined' ? global : null);
    return scopes;
  }

  function createFallbackLocalizationRuntimeSetup() {
    return {
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

  function ensureCreateLocalizationRuntimeSetup(options) {
    const resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    const requireFn = options && options.requireFn;
    const runtimeScope = options && options.runtimeScope;
    const coreGlobalScope = options && options.coreGlobalScope;

    let tools = null;

    if (typeof resolveCoreSupportModule === 'function') {
      try {
        tools = resolveCoreSupportModule(
          'cineCoreAppLocalizationRuntimeSetup',
          './modules/app-core/localization-runtime-setup.js'
        );
      } catch (localizationRuntimeSetupResolveError) {
        void localizationRuntimeSetupResolveError;
        tools = null;
      }
    }

    if (!isObject(tools) && typeof requireFn === 'function') {
      try {
        const required = requireFn('./modules/app-core/localization-runtime-setup.js');
        if (isObject(required)) {
          tools = required;
        }
      } catch (localizationRuntimeSetupRequireError) {
        void localizationRuntimeSetupRequireError;
      }
    }

    if (!isObject(tools)) {
      const fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);

      for (let index = 0; index < fallbackScopes.length; index += 1) {
        const scope = fallbackScopes[index];
        if (!isObject(scope)) {
          continue;
        }

        try {
          const candidate = scope.cineCoreAppLocalizationRuntimeSetup;
          if (isObject(candidate)) {
            tools = candidate;
            break;
          }
        } catch (localizationRuntimeSetupLookupError) {
          void localizationRuntimeSetupLookupError;
        }
      }
    }

    if (isObject(tools) && typeof tools.createLocalizationRuntimeSetup === 'function') {
      return tools.createLocalizationRuntimeSetup;
    }

    return null;
  }

  function ensureFunction(value, fallback) {
    if (typeof value === 'function') {
      return value;
    }

    return fallback;
  }

  function normalizeLocalizationRuntimeSetup(candidate) {
    const fallback = createFallbackLocalizationRuntimeSetup();
    const normalizedCandidate = isObject(candidate) ? candidate : {};

    const localizationRuntimeEnvironment = isObject(
      normalizedCandidate.localizationRuntimeEnvironment
    )
      ? normalizedCandidate.localizationRuntimeEnvironment
      : fallback.localizationRuntimeEnvironment;

    const localizationBridge = isObject(normalizedCandidate.localizationBridge)
      ? normalizedCandidate.localizationBridge
      : fallback.localizationBridge;

    const localizationFallbacks = isObject(normalizedCandidate.localizationFallbacks)
      ? normalizedCandidate.localizationFallbacks
      : fallback.localizationFallbacks;

    const inlineLocalizationFallbacks = isObject(
      normalizedCandidate.inlineLocalizationFallbacks
    )
      ? normalizedCandidate.inlineLocalizationFallbacks
      : fallback.inlineLocalizationFallbacks;

    const localizationFallbackSupport = Object.prototype.hasOwnProperty.call(
      normalizedCandidate,
      'localizationFallbackSupport'
    )
      ? normalizedCandidate.localizationFallbackSupport
      : fallback.localizationFallbackSupport;

    const createBasicLocalizationFallbackResolvers = ensureFunction(
      normalizedCandidate.createBasicLocalizationFallbackResolvers,
      fallback.createBasicLocalizationFallbackResolvers
    );

    const localizationFallbackRegistry = isObject(
      normalizedCandidate.localizationFallbackRegistry
    )
      ? normalizedCandidate.localizationFallbackRegistry
      : {
          createFallbackResolvers(fallbackOptions) {
            return createBasicLocalizationFallbackResolvers(fallbackOptions);
          },
        };

    let localizationFallbackResolvers = normalizedCandidate.localizationFallbackResolvers;

    if (!localizationFallbackResolvers && localizationFallbackRegistry) {
      const createFallbackResolvers = ensureFunction(
        localizationFallbackRegistry.createFallbackResolvers,
        null
      );

      if (createFallbackResolvers) {
        try {
          localizationFallbackResolvers = createFallbackResolvers({
            directNamespace: localizationFallbacks,
            inlineNamespace: inlineLocalizationFallbacks,
          });
        } catch (createFallbackResolversError) {
          void createFallbackResolversError;
          localizationFallbackResolvers = null;
        }
      }
    }

    if (
      !localizationFallbackResolvers &&
      typeof createBasicLocalizationFallbackResolvers === 'function'
    ) {
      try {
        localizationFallbackResolvers = createBasicLocalizationFallbackResolvers({
          directNamespace: localizationFallbacks,
          inlineNamespace: inlineLocalizationFallbacks,
        });
      } catch (createBasicResolversError) {
        void createBasicResolversError;
        localizationFallbackResolvers = null;
      }
    }

    if (!localizationFallbackResolvers) {
      localizationFallbackResolvers = fallback.localizationFallbackResolvers;
    }

    const localizationFallbackNamespace = Object.prototype.hasOwnProperty.call(
      normalizedCandidate,
      'localizationFallbackNamespace'
    )
      ? normalizedCandidate.localizationFallbackNamespace
      : fallback.localizationFallbackNamespace;

    const fallbackResolveLocaleModule = ensureFunction(
      normalizedCandidate.fallbackResolveLocaleModule,
      fallback.fallbackResolveLocaleModule
    );

    const createLocaleFallbacks = ensureFunction(
      normalizedCandidate.createLocaleFallbacks,
      fallback.createLocaleFallbacks
    );

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

  function resolveRuntimeLocalization(options) {
    const currentLocalization = options && options.currentLocalization;

    if (isObject(currentLocalization)) {
      return normalizeLocalizationRuntimeSetup(currentLocalization);
    }

    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    const resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );

    const createLocalizationRuntimeSetup = ensureCreateLocalizationRuntimeSetup({
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
    });

    if (typeof createLocalizationRuntimeSetup === 'function') {
      try {
        const setup = createLocalizationRuntimeSetup({
          resolveCoreSupportModule,
          requireFn,
          runtimeScope,
          coreGlobalScope,
        });

        return normalizeLocalizationRuntimeSetup(setup);
      } catch (createLocalizationRuntimeSetupError) {
        void createLocalizationRuntimeSetupError;
      }
    }

    return createFallbackLocalizationRuntimeSetup();
  }

  const namespace = {
    resolveRuntimeLocalization,
    createFallbackLocalizationRuntimeSetup,
  };

  const namespaceName = 'cineCoreAppRuntimeLocalization';
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
