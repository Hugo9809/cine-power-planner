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
      off: Object.freeze({ className: 'icon-svg pink-mode-icon', markup: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="m1 40c0-8 3-17 3-17a4.84 4.84 0 0 0-1.829-3.064 1 1 0 0 1 .45-1.716 19.438 19.438 0 0 1 4.379-.22c.579-2.317-1.19-3.963-2.782-4.938a1 1 0 0 1 .393-1.85 14.128 14.128 0 0 1 6.389.788c0-.958-1.147-2.145-2.342-3.122a1 1 0 0 1 .708-1.773 40.655 40.655 0 0 1 6.634.895 3.723 3.723 0 0 0-1.049-2.264 1 1 0 0 1 .823-1.652c6.151.378 9.226 1.916 9.226 1.916l10-1s8.472-2.311 15.954.5a1 1 0 0 1-.084 1.9c-1.455.394-2.87 1.143-2.87 2.6 0 0 4.426.738 5.675 4.114a1 1 0 0 1-1.228 1.317c-1.64-.48-4.273-.88-6.447.569Z" fill="#805333" /><path d="m30.18 42.82c1.073 2.7 2.6 9.993 3.357 13.8a2 2 0 0 1-1.964 2.38h-28.573a2 2 0 0 1-2-2v-18c0-2.55 10.03-22.11 23.99-23.87Z" fill="#a56a43" /><path d="m55.67 48.46-6.34 2.97a6 6 0 0 1-7.98-2.88l-.25-.54-.76-1.6a4.956 4.956 0 0 0-4.68-2.87c-.22.01-.44.02-.66.02a16.019 16.019 0 0 1-8.28-29.66c-1.81-2.97-3.45-8.03 2.03-12.49a2.1 2.1 0 0 1 2.5 0c4.23 3.45 4.21 7.25 3.16 10.17a16 16 0 0 1 15.91 11.36l5.31 11.31 2.92 6.22a6.008 6.008 0 0 1-2.88 7.99Z" fill="#cb8252" /><circle cx="42" cy="26" r="3" fill="#2c2f38" /><circle cx="54" cy="43" r="1" fill="#805333" /><path d="m58.55 40.47-2.92-6.22-14.53 13.76.25.54a6 6 0 0 0 7.98 2.88l6.34-2.97a6.008 6.008 0 0 0 2.88-7.99Zm-4.55 3.53a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z" fill="#cf976a" /><circle cx="41" cy="25" r="1.25" fill="#ecf0f1" /></svg>' }),
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

    function noop() { }

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

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PINK_MODE_SUPPORT_API,
  };
}

if (typeof globalThis !== 'undefined') {
  globalThis.PINK_MODE_SUPPORT_API = PINK_MODE_SUPPORT_API;
} else if (typeof window !== 'undefined') {
  window.PINK_MODE_SUPPORT_API = PINK_MODE_SUPPORT_API;
} else if (typeof self !== 'undefined') {
  self.PINK_MODE_SUPPORT_API = PINK_MODE_SUPPORT_API;
} else if (typeof global !== 'undefined') {
  global.PINK_MODE_SUPPORT_API = PINK_MODE_SUPPORT_API;
}


