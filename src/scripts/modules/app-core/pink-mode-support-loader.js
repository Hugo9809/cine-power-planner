/*
 * Provides a loader that resolves the pink mode support API for the modern app
 * core. The logic previously lived inline inside the main runtime bundle. By
 * moving it into a shared helper we keep behaviour identical while continuing
 * the long-running refactor that splits the monolithic file into maintainable
 * modules. The loader keeps the extensive fallback chain that guarantees offline
 * usage, saving, autosaving, and restore routines keep their icon resources
 * without data loss.
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
      typeof scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule ===
        'function'
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

    function register(scope) {
      if (isObject(scope) && scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }

    register(primaryScope);
    register(secondaryScope);
    register(typeof globalThis !== 'undefined' ? globalThis : null);
    register(typeof window !== 'undefined' ? window : null);
    register(typeof self !== 'undefined' ? self : null);
    register(typeof global !== 'undefined' ? global : null);

    return scopes;
  }

  function createInlinePinkModeFallbackApi() {
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
              return ensureSafePromise(undefined);
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

    function trimMarkup(markup) {
      return typeof markup === 'string' ? markup.trim() : '';
    }

    function noop() {}

    function returnFalse() {
      return false;
    }

    function returnNull() {
      return null;
    }

    function returnZero() {
      return 0;
    }

    return {
      pinkModeIcons: fallbackIcons,
      ensureSvgHasAriaHidden: trimMarkup,
      setPinkModeIconSequence: returnFalse,
      loadPinkModeIconsFromFiles() {
        return ensureSafePromise();
      },
      ensurePinkModeLottieRuntime() {
        return ensureSafePromise(null);
      },
      resolvePinkModeLottieRuntime: returnNull,
      startPinkModeAnimatedIcons: noop,
      stopPinkModeAnimatedIcons: noop,
      triggerPinkModeIconRain: noop,
      getPinkModeIconRotationTimer: returnNull,
      setPinkModeIconRotationTimer: noop,
      getPinkModeIconIndex: returnZero,
      setPinkModeIconIndex: noop,
      PINK_MODE_ICON_INTERVAL_MS: 30000,
      PINK_MODE_ICON_ANIMATION_CLASS: 'pink-mode-icon-pop',
      PINK_MODE_ICON_ANIMATION_RESET_DELAY: 450,
      PINK_MODE_ICON_FALLBACK_MARKUP: Object.freeze([]),
    };
  }

  function resolvePinkModeSupportBridgeFactory(options) {
    const resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);

    let factory = null;

    if (typeof resolveCoreSupportModule === 'function') {
      try {
        const tools = resolveCoreSupportModule(
          'cineCoreAppPinkModeSupportBridge',
          './modules/app-core/pink-mode-support-bridge.js'
        );
        if (isObject(tools) && typeof tools.createPinkModeSupportBridge === 'function') {
          factory = tools.createPinkModeSupportBridge;
        } else if (typeof tools === 'function') {
          factory = tools;
        }
      } catch (pinkModeSupportBridgeResolveError) {
        void pinkModeSupportBridgeResolveError;
      }
    }

    if (typeof factory !== 'function' && typeof requireFn === 'function') {
      try {
        const requiredBridge = requireFn('./pink-mode-support-bridge.js');
        if (
          isObject(requiredBridge) &&
          typeof requiredBridge.createPinkModeSupportBridge === 'function'
        ) {
          factory = requiredBridge.createPinkModeSupportBridge;
        } else if (typeof requiredBridge === 'function') {
          factory = requiredBridge;
        }
      } catch (pinkModeSupportBridgeRequireError) {
        void pinkModeSupportBridgeRequireError;
      }
    }

    if (typeof factory === 'function') {
      return factory;
    }

    const fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];
      if (!isObject(scope)) {
        continue;
      }

      try {
        const candidate = scope.cineCoreAppPinkModeSupportBridge;
        if (isObject(candidate) && typeof candidate.createPinkModeSupportBridge === 'function') {
          return candidate.createPinkModeSupportBridge;
        }

        if (typeof candidate === 'function') {
          return candidate;
        }
      } catch (pinkModeSupportBridgeLookupError) {
        void pinkModeSupportBridgeLookupError;
      }
    }

    return null;
  }

  function resolvePinkModeFallbackFactory(options) {
    const resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);

    let factory = null;

    if (typeof resolveCoreSupportModule === 'function') {
      try {
        const tools = resolveCoreSupportModule(
          'cineCoreAppPinkModeFallback',
          './modules/app-core/pink-mode-fallback.js'
        );
        if (isObject(tools) && typeof tools.createPinkModeFallbackApi === 'function') {
          factory = tools.createPinkModeFallbackApi;
        } else if (typeof tools === 'function') {
          factory = tools;
        }
      } catch (pinkModeFallbackResolveError) {
        void pinkModeFallbackResolveError;
      }
    }

    if (typeof factory !== 'function' && typeof requireFn === 'function') {
      try {
        const requiredFallback = requireFn('./pink-mode-fallback.js');
        if (
          isObject(requiredFallback) &&
          typeof requiredFallback.createPinkModeFallbackApi === 'function'
        ) {
          factory = requiredFallback.createPinkModeFallbackApi;
        } else if (typeof requiredFallback === 'function') {
          factory = requiredFallback;
        }
      } catch (pinkModeFallbackRequireError) {
        void pinkModeFallbackRequireError;
      }
    }

    if (typeof factory === 'function') {
      return factory;
    }

    const fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];
      if (!isObject(scope)) {
        continue;
      }

      try {
        const candidate = scope.cineCoreAppPinkModeFallback;
        if (isObject(candidate) && typeof candidate.createPinkModeFallbackApi === 'function') {
          return candidate.createPinkModeFallbackApi;
        }

        if (typeof candidate === 'function') {
          return candidate;
        }
      } catch (pinkModeFallbackLookupError) {
        void pinkModeFallbackLookupError;
      }
    }

    return null;
  }

  function callCreateBridge(factory, options) {
    if (typeof factory !== 'function') {
      return null;
    }

    try {
      const api = factory({
        resolveCoreSupportModule: options && options.resolveCoreSupportModule,
        requireFn: options && options.requireFn,
        runtimeScope: options && options.runtimeScope,
        coreGlobalScope: options && options.coreGlobalScope,
      });

      if (isObject(api)) {
        return api;
      }
    } catch (pinkModeBridgeFactoryError) {
      void pinkModeBridgeFactoryError;
    }

    return null;
  }

  function callCreateFallback(factory, options) {
    if (typeof factory !== 'function') {
      return null;
    }

    try {
      const api = factory({
        resolveCoreSupportModule: options && options.resolveCoreSupportModule,
        requireFn: options && options.requireFn,
        runtimeScope: options && options.runtimeScope,
        coreGlobalScope: options && options.coreGlobalScope,
      });

      if (isObject(api)) {
        return api;
      }
    } catch (pinkModeFallbackFactoryError) {
      void pinkModeFallbackFactoryError;
    }

    return null;
  }

  function createPinkModeSupportApi(options) {
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    const resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );

    const bridgeApi = callCreateBridge(
      resolvePinkModeSupportBridgeFactory({
        resolveCoreSupportModule,
        requireFn,
        runtimeScope,
        coreGlobalScope,
      }),
      {
        resolveCoreSupportModule,
        requireFn,
        runtimeScope,
        coreGlobalScope,
      }
    );

    if (isObject(bridgeApi)) {
      return bridgeApi;
    }

    const fallbackApi = callCreateFallback(
      resolvePinkModeFallbackFactory({
        resolveCoreSupportModule,
        requireFn,
        runtimeScope,
        coreGlobalScope,
      }),
      {
        resolveCoreSupportModule,
        requireFn,
        runtimeScope,
        coreGlobalScope,
      }
    );

    if (isObject(fallbackApi)) {
      return fallbackApi;
    }

    return createInlinePinkModeFallbackApi();
  }

  const namespace = {
    createPinkModeSupportApi,
    createInlinePinkModeFallbackApi,
  };

  const namespaceName = 'cineCoreAppPinkModeSupportLoader';
  const globalScope = detectScope();
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
