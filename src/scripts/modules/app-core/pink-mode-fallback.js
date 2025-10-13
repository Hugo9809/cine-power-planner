/*
 * Provides a shared fallback implementation for the pink mode runtime. During
 * the ongoing refactor the main app core file is being decomposed into smaller
 * modules. Moving the inline fallback here keeps the behaviour identical while
 * reducing the size of the orchestrating bundle.
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

  function createPinkModeFallbackApi() {
    const fallbackIcons = Object.freeze({
      off: Object.freeze({ className: 'icon-svg pink-mode-icon', markup: '' }),
      onSequence: Object.freeze([]),
    });

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
      PINK_MODE_ICON_FALLBACK_MARKUP: Object.freeze([]),
    };
  }

  const namespace = {
    createPinkModeFallbackApi,
  };

  const globalScope = detectScope();
  const namespaceName = 'cineCoreAppPinkModeFallback';
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
