/*
 * Moves the pink mode support resolver into a dedicated module. The extraction
 * keeps the comprehensive fallback chain intact so animated icons, offline
 * assets and accessibility helpers continue to behave exactly as before while
 * the main runtime file shrinks.
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

  function createPinkModeSupportLastResortApi() {
    const fallbackIcons = Object.freeze({
      off: Object.freeze({ className: 'icon-svg pink-mode-icon', markup: '' }),
      onSequence: Object.freeze([]),
    });

    function ensureSafePromise(value) {
      if (typeof Promise !== 'undefined' && typeof Promise.resolve === 'function') {
        return Promise.resolve(value);
      }

      const promiseLike = {
        then(callback) {
          if (typeof callback === 'function') {
            try {
              return ensureSafePromise(callback(value));
            } catch (callbackError) {
              void callbackError;
            }
          }

          return promiseLike;
        },
        catch() {
          return promiseLike;
        },
      };

      return promiseLike;
    }

    function noop() {}

    return Object.freeze({
      pinkModeIcons: fallbackIcons,
      ensureSvgHasAriaHidden: noop,
      setPinkModeIconSequence: noop,
      loadPinkModeIconsFromFiles() {
        return ensureSafePromise(fallbackIcons);
      },
      ensurePinkModeLottieRuntime() {
        return ensureSafePromise(null);
      },
      resolvePinkModeLottieRuntime() {
        return ensureSafePromise(null);
      },
      startPinkModeAnimatedIcons: noop,
      stopPinkModeAnimatedIcons: noop,
      triggerPinkModeIconRain: noop,
      getPinkModeIconRotationTimer: noop,
      setPinkModeIconRotationTimer: noop,
      getPinkModeIconIndex: noop,
      setPinkModeIconIndex: noop,
      PINK_MODE_ICON_INTERVAL_MS: 12000,
      PINK_MODE_ICON_ANIMATION_CLASS: 'pink-mode-icon-animation',
      PINK_MODE_ICON_ANIMATION_RESET_DELAY: 90,
      PINK_MODE_ICON_FALLBACK_MARKUP: '',
    });
  }

  function attemptResolvePinkModeSupport(candidate, resolverOptions) {
    if (!isObject(candidate)) {
      return null;
    }

    const resolver =
      typeof candidate.resolvePinkModeSupportApi === 'function'
        ? candidate.resolvePinkModeSupportApi
        : null;

    if (!resolver) {
      return null;
    }

    try {
      const api = resolver(resolverOptions);
      return isObject(api) ? api : null;
    } catch (pinkModeSupportApiError) {
      void pinkModeSupportApiError;
    }

    return null;
  }

  function resolvePinkModeSupportApi(options) {
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

    const resolverOptions = {
      loaderTools: options && options.loaderTools,
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
      fallbackScopes,
      loaderPath: options && options.loaderPath,
      lastResortFactory: options && options.lastResortFactory,
    };

    let api = attemptResolvePinkModeSupport(options && options.apiTools, resolverOptions);

    if (!api && typeof requireFn === 'function') {
      try {
        const requiredApiTools = requireFn(
          options && options.apiRequirePath
            ? options.apiRequirePath
            : './modules/app-core/pink-mode-support-api.js'
        );
        api = attemptResolvePinkModeSupport(requiredApiTools, resolverOptions);
      } catch (pinkModeSupportApiRequireError) {
        void pinkModeSupportApiRequireError;
      }
    }

    if (!api) {
      for (let index = 0; index < fallbackScopes.length; index += 1) {
        const scope = fallbackScopes[index];

        try {
          const candidate = scope && scope.cineCoreAppPinkModeSupportApi;
          api = attemptResolvePinkModeSupport(candidate, resolverOptions);
        } catch (pinkModeSupportApiLookupError) {
          void pinkModeSupportApiLookupError;
        }

        if (api) {
          break;
        }
      }
    }

    if (!isObject(api)) {
      const factory =
        typeof resolverOptions.lastResortFactory === 'function'
          ? resolverOptions.lastResortFactory
          : createPinkModeSupportLastResortApi;
      api = factory();
    }

    return api;
  }

  const namespace = {
    resolvePinkModeSupportApi,
    createPinkModeSupportLastResortApi,
  };

  const globalScope = detectScope();
  const namespaceName = 'cineCoreAppPinkModeSupportResolver';
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
