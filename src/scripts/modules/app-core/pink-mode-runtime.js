/*
 * Centralises the pink mode runtime helpers. The modern app core used to carry
 * a large inline fallback block for animated icons which made the file harder
 * to read. Moving it into this module keeps the behaviour identical while the
 * refactor towards smaller files continues.
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

  function createSafeResolvedPromise(value) {
    if (typeof Promise !== 'undefined' && typeof Promise.resolve === 'function') {
      return Promise.resolve(value);
    }

    const promiseLike = {
      then(callback) {
        if (typeof callback === 'function') {
          try {
            return createSafeResolvedPromise(callback(value));
          } catch (callbackError) {
            void callbackError;
            return createSafeResolvedPromise(undefined);
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

  function createPinkModeFallback() {
    const fallbackIcons = Object.freeze({
      off: Object.freeze({ className: 'icon-svg pink-mode-icon', markup: '' }),
      onSequence: Object.freeze([]),
    });

    const fallbackMarkup = Object.freeze([]);

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
        return createSafeResolvedPromise();
      },
      ensurePinkModeLottieRuntime() {
        return createSafeResolvedPromise(null);
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
      PINK_MODE_ICON_FALLBACK_MARKUP: fallbackMarkup,
    };
  }

  function collectSupportCandidates(primaryScope, secondaryScope) {
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

  function resolveSupportModule(options, fallbackSupport) {
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    const resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );

    let support = null;

    if (resolveCoreSupportModule) {
      try {
        support = resolveCoreSupportModule(
          'cineCorePinkModeSupport',
          './modules/core/pink-mode-support.js'
        );
      } catch (pinkModeSupportResolveError) {
        void pinkModeSupportResolveError;
        support = null;
      }
    }

    if (!isObject(support) && typeof requireFn === 'function') {
      try {
        const requiredSupport = requireFn('./modules/core/pink-mode-support.js');
        if (isObject(requiredSupport)) {
          support = requiredSupport;
        }
      } catch (pinkModeSupportRequireError) {
        void pinkModeSupportRequireError;
      }
    }

    if (isObject(support)) {
      return support;
    }

    const fallbackScopes = collectSupportCandidates(runtimeScope, coreGlobalScope);

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];
      try {
        const candidate = scope && scope.cineCorePinkModeSupport;
        if (isObject(candidate)) {
          return candidate;
        }
      } catch (pinkModeSupportLookupError) {
        void pinkModeSupportLookupError;
      }
    }

    return {
      resolvePinkModeSupport() {
        return fallbackSupport;
      },
      createFallbackSupport() {
        return fallbackSupport;
      },
    };
  }

  function createPinkModeRuntime(options) {
    const fallbackSupport = createPinkModeFallback();
    const supportModule = resolveSupportModule(options, fallbackSupport);

    let resolvedSupport = null;

    if (isObject(supportModule) && typeof supportModule.resolvePinkModeSupport === 'function') {
      try {
        resolvedSupport = supportModule.resolvePinkModeSupport();
      } catch (pinkModeResolveError) {
        void pinkModeResolveError;
        resolvedSupport = null;
      }
    }

    if (!isObject(resolvedSupport) && typeof supportModule.createFallbackSupport === 'function') {
      try {
        resolvedSupport = supportModule.createFallbackSupport();
      } catch (pinkModeFallbackError) {
        void pinkModeFallbackError;
        resolvedSupport = null;
      }
    }

    const activeSupport = isObject(resolvedSupport) ? resolvedSupport : fallbackSupport;

    function withFallback(candidate, fallback) {
      return typeof candidate === 'function' ? candidate : fallback;
    }

    return {
      pinkModeIcons: isObject(activeSupport.pinkModeIcons)
        ? activeSupport.pinkModeIcons
        : fallbackSupport.pinkModeIcons,
      ensureSvgHasAriaHidden: withFallback(
        activeSupport.ensureSvgHasAriaHidden,
        fallbackSupport.ensureSvgHasAriaHidden
      ),
      setPinkModeIconSequence: withFallback(
        activeSupport.setPinkModeIconSequence,
        fallbackSupport.setPinkModeIconSequence
      ),
      loadPinkModeIconsFromFiles: withFallback(
        activeSupport.loadPinkModeIconsFromFiles,
        fallbackSupport.loadPinkModeIconsFromFiles
      ),
      ensurePinkModeLottieRuntime: withFallback(
        activeSupport.ensurePinkModeLottieRuntime,
        fallbackSupport.ensurePinkModeLottieRuntime
      ),
      resolvePinkModeLottieRuntime: withFallback(
        activeSupport.resolvePinkModeLottieRuntime,
        fallbackSupport.resolvePinkModeLottieRuntime
      ),
      startPinkModeAnimatedIcons: withFallback(
        activeSupport.startPinkModeAnimatedIcons,
        fallbackSupport.startPinkModeAnimatedIcons
      ),
      stopPinkModeAnimatedIcons: withFallback(
        activeSupport.stopPinkModeAnimatedIcons,
        fallbackSupport.stopPinkModeAnimatedIcons
      ),
      triggerPinkModeIconRain: withFallback(
        activeSupport.triggerPinkModeIconRain,
        fallbackSupport.triggerPinkModeIconRain
      ),
      getPinkModeIconRotationTimer: withFallback(
        activeSupport.getPinkModeIconRotationTimer,
        fallbackSupport.getPinkModeIconRotationTimer
      ),
      setPinkModeIconRotationTimer: withFallback(
        activeSupport.setPinkModeIconRotationTimer,
        fallbackSupport.setPinkModeIconRotationTimer
      ),
      getPinkModeIconIndex: withFallback(
        activeSupport.getPinkModeIconIndex,
        fallbackSupport.getPinkModeIconIndex
      ),
      setPinkModeIconIndex: withFallback(
        activeSupport.setPinkModeIconIndex,
        fallbackSupport.setPinkModeIconIndex
      ),
      PINK_MODE_ICON_INTERVAL_MS:
        typeof activeSupport.PINK_MODE_ICON_INTERVAL_MS === 'number'
          ? activeSupport.PINK_MODE_ICON_INTERVAL_MS
          : fallbackSupport.PINK_MODE_ICON_INTERVAL_MS,
      PINK_MODE_ICON_ANIMATION_CLASS:
        typeof activeSupport.PINK_MODE_ICON_ANIMATION_CLASS === 'string'
          ? activeSupport.PINK_MODE_ICON_ANIMATION_CLASS
          : fallbackSupport.PINK_MODE_ICON_ANIMATION_CLASS,
      PINK_MODE_ICON_ANIMATION_RESET_DELAY:
        typeof activeSupport.PINK_MODE_ICON_ANIMATION_RESET_DELAY === 'number'
          ? activeSupport.PINK_MODE_ICON_ANIMATION_RESET_DELAY
          : fallbackSupport.PINK_MODE_ICON_ANIMATION_RESET_DELAY,
      PINK_MODE_ICON_FALLBACK_MARKUP: Array.isArray(activeSupport.PINK_MODE_ICON_FALLBACK_MARKUP)
        ? activeSupport.PINK_MODE_ICON_FALLBACK_MARKUP
        : fallbackSupport.PINK_MODE_ICON_FALLBACK_MARKUP,
    };
  }

  const namespace = {
    createPinkModeRuntime,
    createPinkModeFallback,
  };

  const globalScope = detectScope();
  const namespaceName = 'cineCoreAppPinkModeRuntime';
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
