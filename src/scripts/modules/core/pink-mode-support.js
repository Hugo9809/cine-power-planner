(function () {
  function detectScope() {
    if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object') {
      return globalThis;
    }

    if (typeof window !== 'undefined' && window && typeof window === 'object') {
      return window;
    }

    if (typeof self !== 'undefined' && self && typeof self === 'object') {
      return self;
    }

    if (typeof global !== 'undefined' && global && typeof global === 'object') {
      return global;
    }

    return null;
  }

  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
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

  function createFallbackSupport() {
    const fallbackIcons = Object.freeze({
      off: Object.freeze({ className: 'icon-svg pink-mode-icon', markup: '' }),
      onSequence: Object.freeze([]),
    });

    const fallbackMarkup = Object.freeze([]);

    function ensureSvgHasAriaHidden(markup) {
      return typeof markup === 'string' ? markup.trim() : '';
    }

    function noop() {}

    function returnFalse() {
      return false;
    }

    function getNull() {
      return null;
    }

    function getZero() {
      return 0;
    }

    return {
      pinkModeIcons: fallbackIcons,
      ensureSvgHasAriaHidden,
      setPinkModeIconSequence: returnFalse,
      loadPinkModeIconsFromFiles() {
        return createSafeResolvedPromise();
      },
      ensurePinkModeLottieRuntime() {
        return createSafeResolvedPromise(null);
      },
      resolvePinkModeLottieRuntime: getNull,
      startPinkModeAnimatedIcons: noop,
      stopPinkModeAnimatedIcons: noop,
      triggerPinkModeIconRain: noop,
      getPinkModeIconRotationTimer: getNull,
      setPinkModeIconRotationTimer: noop,
      getPinkModeIconIndex: getZero,
      setPinkModeIconIndex: noop,
      PINK_MODE_ICON_INTERVAL_MS: 30000,
      PINK_MODE_ICON_ANIMATION_CLASS: 'pink-mode-icon-pop',
      PINK_MODE_ICON_ANIMATION_RESET_DELAY: 450,
      PINK_MODE_ICON_FALLBACK_MARKUP: fallbackMarkup,
    };
  }

  function resolvePinkModeAnimations(scope) {
    if (typeof cineCorePinkModeAnimations !== 'undefined' && isObject(cineCorePinkModeAnimations)) {
      return cineCorePinkModeAnimations;
    }

    if (scope && isObject(scope.cineCorePinkModeAnimations)) {
      return scope.cineCorePinkModeAnimations;
    }

    if (typeof require === 'function') {
      try {
        const required = require('./pink-mode-animations.js');
        if (isObject(required)) {
          return required;
        }
      } catch (pinkModeRequireError) {
        void pinkModeRequireError;
      }
    }

    return null;
  }

  function resolvePinkModeSupport(scope) {
    const fallback = createFallbackSupport();
    const animations = resolvePinkModeAnimations(scope);

    if (!isObject(animations)) {
      return fallback;
    }

    return {
      pinkModeIcons: isObject(animations.pinkModeIcons)
        ? animations.pinkModeIcons
        : fallback.pinkModeIcons,
      ensureSvgHasAriaHidden:
        typeof animations.ensureSvgHasAriaHidden === 'function'
          ? animations.ensureSvgHasAriaHidden
          : fallback.ensureSvgHasAriaHidden,
      setPinkModeIconSequence:
        typeof animations.setPinkModeIconSequence === 'function'
          ? animations.setPinkModeIconSequence
          : fallback.setPinkModeIconSequence,
      loadPinkModeIconsFromFiles:
        typeof animations.loadPinkModeIconsFromFiles === 'function'
          ? animations.loadPinkModeIconsFromFiles
          : fallback.loadPinkModeIconsFromFiles,
      ensurePinkModeLottieRuntime:
        typeof animations.ensurePinkModeLottieRuntime === 'function'
          ? animations.ensurePinkModeLottieRuntime
          : fallback.ensurePinkModeLottieRuntime,
      resolvePinkModeLottieRuntime:
        typeof animations.resolvePinkModeLottieRuntime === 'function'
          ? animations.resolvePinkModeLottieRuntime
          : fallback.resolvePinkModeLottieRuntime,
      startPinkModeAnimatedIcons:
        typeof animations.startPinkModeAnimatedIcons === 'function'
          ? animations.startPinkModeAnimatedIcons
          : fallback.startPinkModeAnimatedIcons,
      stopPinkModeAnimatedIcons:
        typeof animations.stopPinkModeAnimatedIcons === 'function'
          ? animations.stopPinkModeAnimatedIcons
          : fallback.stopPinkModeAnimatedIcons,
      triggerPinkModeIconRain:
        typeof animations.triggerPinkModeIconRain === 'function'
          ? animations.triggerPinkModeIconRain
          : fallback.triggerPinkModeIconRain,
      getPinkModeIconRotationTimer:
        typeof animations.getPinkModeIconRotationTimer === 'function'
          ? animations.getPinkModeIconRotationTimer
          : fallback.getPinkModeIconRotationTimer,
      setPinkModeIconRotationTimer:
        typeof animations.setPinkModeIconRotationTimer === 'function'
          ? animations.setPinkModeIconRotationTimer
          : fallback.setPinkModeIconRotationTimer,
      getPinkModeIconIndex:
        typeof animations.getPinkModeIconIndex === 'function'
          ? animations.getPinkModeIconIndex
          : fallback.getPinkModeIconIndex,
      setPinkModeIconIndex:
        typeof animations.setPinkModeIconIndex === 'function'
          ? animations.setPinkModeIconIndex
          : fallback.setPinkModeIconIndex,
      PINK_MODE_ICON_INTERVAL_MS:
        typeof animations.PINK_MODE_ICON_INTERVAL_MS === 'number'
          ? animations.PINK_MODE_ICON_INTERVAL_MS
          : fallback.PINK_MODE_ICON_INTERVAL_MS,
      PINK_MODE_ICON_ANIMATION_CLASS:
        typeof animations.PINK_MODE_ICON_ANIMATION_CLASS === 'string'
          ? animations.PINK_MODE_ICON_ANIMATION_CLASS
          : fallback.PINK_MODE_ICON_ANIMATION_CLASS,
      PINK_MODE_ICON_ANIMATION_RESET_DELAY:
        typeof animations.PINK_MODE_ICON_ANIMATION_RESET_DELAY === 'number'
          ? animations.PINK_MODE_ICON_ANIMATION_RESET_DELAY
          : fallback.PINK_MODE_ICON_ANIMATION_RESET_DELAY,
      PINK_MODE_ICON_FALLBACK_MARKUP:
        Array.isArray(animations.PINK_MODE_ICON_FALLBACK_MARKUP)
          ? animations.PINK_MODE_ICON_FALLBACK_MARKUP
          : fallback.PINK_MODE_ICON_FALLBACK_MARKUP,
    };
  }

  const scope = detectScope();
  const support = resolvePinkModeSupport(scope);

  const api = {
    resolvePinkModeSupport() {
      return support;
    },
    createFallbackSupport,
    pinkModeIcons: support.pinkModeIcons,
    ensureSvgHasAriaHidden: support.ensureSvgHasAriaHidden,
    setPinkModeIconSequence: support.setPinkModeIconSequence,
    loadPinkModeIconsFromFiles: support.loadPinkModeIconsFromFiles,
    ensurePinkModeLottieRuntime: support.ensurePinkModeLottieRuntime,
    resolvePinkModeLottieRuntime: support.resolvePinkModeLottieRuntime,
    startPinkModeAnimatedIcons: support.startPinkModeAnimatedIcons,
    stopPinkModeAnimatedIcons: support.stopPinkModeAnimatedIcons,
    triggerPinkModeIconRain: support.triggerPinkModeIconRain,
    getPinkModeIconRotationTimer: support.getPinkModeIconRotationTimer,
    setPinkModeIconRotationTimer: support.setPinkModeIconRotationTimer,
    getPinkModeIconIndex: support.getPinkModeIconIndex,
    setPinkModeIconIndex: support.setPinkModeIconIndex,
    PINK_MODE_ICON_INTERVAL_MS: support.PINK_MODE_ICON_INTERVAL_MS,
    PINK_MODE_ICON_ANIMATION_CLASS: support.PINK_MODE_ICON_ANIMATION_CLASS,
    PINK_MODE_ICON_ANIMATION_RESET_DELAY: support.PINK_MODE_ICON_ANIMATION_RESET_DELAY,
    PINK_MODE_ICON_FALLBACK_MARKUP: support.PINK_MODE_ICON_FALLBACK_MARKUP,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  if (scope && isObject(scope)) {
    try {
      const target = scope.cineCorePinkModeSupport || {};
      Object.assign(target, api);
      scope.cineCorePinkModeSupport = target;
    } catch (pinkModeSupportAssignError) {
      void pinkModeSupportAssignError;
    }
  }
})();
