/*
 * Resolves the localisation runtime helpers for the modern app core.
 * Moving this heavy bootstrap logic into a standalone module keeps the
 * primary runtime bundle smaller while the refactor progresses.
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

  function ensureScope(candidate, fallback) {
    if (isObject(candidate)) {
      return candidate;
    }

    return detectScope(fallback);
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

    return null;
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

  function createInlineFallbackLocalizationRuntimeSetup() {
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

  function createLocalizationModuleLoader(requireFn) {
    let attempted = false;
    let cachedModule = null;

    return function loadLocalizationModule() {
      if (attempted) {
        return cachedModule;
      }

      attempted = true;

      if (typeof requireFn !== 'function') {
        return cachedModule;
      }

      try {
        const required = requireFn('./modules/app-core/runtime-localization.js');
        if (isObject(required)) {
          cachedModule = required;
        }
      } catch (localizationRequireError) {
        void localizationRequireError;
      }

      return cachedModule;
    };
  }

  function resolveRuntimeLocalizationTools(
    resolveCoreSupportModule,
    candidateScopes,
    loadLocalizationModule
  ) {
    let tools = null;

    if (typeof resolveCoreSupportModule === 'function') {
      try {
        tools = resolveCoreSupportModule(
          'cineCoreAppRuntimeLocalization',
          './modules/app-core/runtime-localization.js'
        );
      } catch (localizationResolveError) {
        void localizationResolveError;
        tools = null;
      }
    }

    if (!isObject(tools)) {
      tools = loadLocalizationModule();
    }

    if (isObject(tools)) {
      return tools;
    }

    for (let index = 0; index < candidateScopes.length; index += 1) {
      const scope = candidateScopes[index];

      try {
        const candidate = scope && scope.cineCoreAppRuntimeLocalization;
        if (isObject(candidate)) {
          return candidate;
        }
      } catch (localizationLookupError) {
        void localizationLookupError;
      }
    }

    return null;
  }

  function resolveLocalizationMethod(methodName, tools, candidateScopes, loadLocalizationModule) {
    if (isObject(tools) && typeof tools[methodName] === 'function') {
      return tools[methodName];
    }

    const required = loadLocalizationModule();
    if (isObject(required) && typeof required[methodName] === 'function') {
      return required[methodName];
    }

    for (let index = 0; index < candidateScopes.length; index += 1) {
      const scope = candidateScopes[index];

      try {
        const candidate = scope && scope.cineCoreAppRuntimeLocalization;
        if (isObject(candidate) && typeof candidate[methodName] === 'function') {
          return candidate[methodName];
        }
      } catch (localizationMethodLookupError) {
        void localizationMethodLookupError;
      }
    }

    return null;
  }

  function resolveLocalizationRuntimeSetup(options) {
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    const resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );

    const candidateScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);
    const loadLocalizationModule = createLocalizationModuleLoader(requireFn);
    const runtimeLocalizationTools = resolveRuntimeLocalizationTools(
      resolveCoreSupportModule,
      candidateScopes,
      loadLocalizationModule
    );

    const resolveRuntimeLocalization = resolveLocalizationMethod(
      'resolveRuntimeLocalization',
      runtimeLocalizationTools,
      candidateScopes,
      loadLocalizationModule
    );

    const createFallbackLocalizationRuntimeSetup =
      resolveLocalizationMethod(
        'createFallbackLocalizationRuntimeSetup',
        runtimeLocalizationTools,
        candidateScopes,
        loadLocalizationModule
      ) || createInlineFallbackLocalizationRuntimeSetup;

    const setup =
      (typeof resolveRuntimeLocalization === 'function'
        ? resolveRuntimeLocalization({
            resolveCoreSupportModule,
            requireFn,
            runtimeScope,
            coreGlobalScope,
          })
        : null) ||
      (typeof createFallbackLocalizationRuntimeSetup === 'function'
        ? createFallbackLocalizationRuntimeSetup()
        : createInlineFallbackLocalizationRuntimeSetup());

    return setup || createInlineFallbackLocalizationRuntimeSetup();
  }

  const namespace = {
    resolveLocalizationRuntimeSetup,
    createInlineFallbackLocalizationRuntimeSetup,
  };

  const globalScope = detectScope();
  const namespaceName = 'cineCoreAppRuntimeLocalizationResolver';
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
