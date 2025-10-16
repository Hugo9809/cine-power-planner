/*
 * Extracted from app-core-new-1.js to keep module boundaries manageable.
 * The logic remains identical to protect autosave, offline, and localization behaviours.
 */

const PINK_MODE_SUPPORT_LOADER_TOOLS = resolveCoreSupportModule(
  'cineCoreAppPinkModeSupportLoader',
  './modules/app-core/pink-mode.js'
);

const PINK_MODE_SUPPORT_API_TOOLS = resolveCoreSupportModule(
  'cineCoreAppPinkModeSupportApi',
  './modules/app-core/pink-mode.js'
);

const PINK_MODE_SUPPORT_RESOLVER_TOOLS = resolveCoreSupportModule(
  'cineCoreAppPinkModeSupportResolver',
  './modules/app-core/pink-mode.js'
);

const PINK_MODE_SUPPORT_API = (function resolvePinkModeSupportApi() {
  const requireFn = typeof require === 'function' ? require : null;

  function createInlinePinkModeLastResortApi() {
    if (
      PINK_MODE_SUPPORT_RESOLVER_TOOLS &&
      typeof PINK_MODE_SUPPORT_RESOLVER_TOOLS.createPinkModeSupportLastResortApi === 'function'
    ) {
      try {
        const api = PINK_MODE_SUPPORT_RESOLVER_TOOLS.createPinkModeSupportLastResortApi();
        if (api && typeof api === 'object') {
          return api;
        }
      } catch (pinkModeLastResortError) {
        void pinkModeLastResortError;
      }
    }

    if (typeof requireFn === 'function') {
      try {
        const requiredResolverTools = requireFn(
          './modules/app-core/pink-mode.js'
        );
        if (
          requiredResolverTools &&
          typeof requiredResolverTools.createPinkModeSupportLastResortApi === 'function'
        ) {
          const api = requiredResolverTools.createPinkModeSupportLastResortApi();
          if (api && typeof api === 'object') {
            return api;
          }
        }
      } catch (pinkModeSupportInlineFallbackError) {
        void pinkModeSupportInlineFallbackError;
      }
    }

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

  const resolverOptions = {
    loaderTools: PINK_MODE_SUPPORT_LOADER_TOOLS,
    apiTools: PINK_MODE_SUPPORT_API_TOOLS,
    resolveCoreSupportModule,
    requireFn,
    runtimeScope: typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' ? CORE_PART1_RUNTIME_SCOPE : null,
    coreGlobalScope: typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null,
    fallbackScopes: [
      typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' ? CORE_PART1_RUNTIME_SCOPE : null,
      typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null,
    ],
    loaderPath: './modules/app-core/pink-mode.js',
    apiRequirePath: './modules/app-core/pink-mode.js',
    lastResortFactory: createInlinePinkModeLastResortApi,
  };

  function attemptResolve(candidate) {
    if (!candidate || typeof candidate !== 'object') {
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
      return api && typeof api === 'object' ? api : null;
    } catch (pinkModeSupportResolverError) {
      void pinkModeSupportResolverError;
    }

    return null;
  }

  let api = attemptResolve(PINK_MODE_SUPPORT_RESOLVER_TOOLS);

  if (!api && typeof requireFn === 'function') {
    try {
      const requiredResolverTools = requireFn(
        './modules/app-core/pink-mode.js'
      );
      api = attemptResolve(requiredResolverTools);
    } catch (pinkModeSupportResolverRequireError) {
      void pinkModeSupportResolverRequireError;
    }
  }

  if (!api) {
    const fallbackScopes = [
      typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' ? CORE_PART1_RUNTIME_SCOPE : null,
      typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null,
      typeof globalThis !== 'undefined' ? globalThis : null,
      typeof window !== 'undefined' ? window : null,
      typeof self !== 'undefined' ? self : null,
      typeof global !== 'undefined' ? global : null,
    ];

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];

      if (!scope || typeof scope !== 'object') {
        continue;
      }

      try {
        const candidate = scope.cineCoreAppPinkModeSupportResolver;
        api = attemptResolve(candidate);
      } catch (pinkModeSupportResolverLookupError) {
        void pinkModeSupportResolverLookupError;
      }

      if (api) {
        break;
      }
    }
  }

  if (!api || typeof api !== 'object') {
    api = createInlinePinkModeLastResortApi();
  }

  return api;
})();


