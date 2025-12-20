(function () {
  function getModuleDirectory(moduleId) {
    const segments = moduleId.split('/');
    segments.pop();
    return segments.join('/');
  }

  function normalizeFromDir(moduleDir, request) {
    const segments = moduleDir ? moduleDir.split('/') : [];
    const parts = request.split('/');
    for (let index = 0; index < parts.length; index += 1) {
      const segment = parts[index];
      if (!segment || segment === '.') {
        continue;
      }
      if (segment === '..') {
        if (segments.length) {
          segments.pop();
        }
        continue;
      }
      segments.push(segment);
    }
    return segments.join('/');
  }

  /* eslint-disable no-unused-vars */
  const MODULE_FACTORIES = {
    'modules/core/pink-mode-animations.js': function (module, exports, require) {
      /* global cinePinkModeAnimatedIconData */

      (function () {
        const GLOBAL_SCOPE = (typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : global)));

        const PINK_MODE_ANIMATED_ICON_FILES = Object.freeze([
          'src/animations/pink-mode/camera.json',
          'src/animations/pink-mode/director-chair.json',
          'src/animations/pink-mode/dog.json',
          'src/animations/pink-mode/fox-2.json',
          'src/animations/pink-mode/fox-3.json',
          'src/animations/pink-mode/fox.json',
          'src/animations/pink-mode/horse.json',
          'src/animations/pink-mode/mountains.json',
          'src/animations/pink-mode/movie-camera.json',
          'src/animations/pink-mode/pinata.json',
          'src/animations/pink-mode/script.json',
          'src/animations/pink-mode/video-camera.json'
        ]);

        function ensurePinkModeLottieRuntime() {
          if (GLOBAL_SCOPE.lottie) return Promise.resolve(GLOBAL_SCOPE.lottie);
          if (GLOBAL_SCOPE.bodymovin) return Promise.resolve(GLOBAL_SCOPE.bodymovin);

          if (document.querySelector('script[data-loader="pink-mode-lottie"]')) {
            // Already loading
            return new Promise(resolve => {
              const s = document.querySelector('script[data-loader="pink-mode-lottie"]');
              if (s.dataset.loaded === 'true') resolve(GLOBAL_SCOPE.lottie);
              else s.addEventListener('load', () => resolve(GLOBAL_SCOPE.lottie), { once: true });
            });
          }

          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'src/vendor/lottie.min.js';
            script.async = true;
            script.setAttribute('data-loader', 'pink-mode-lottie');
            script.onload = () => {
              script.dataset.loaded = 'true';
              resolve(GLOBAL_SCOPE.lottie);
            };
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        class FloatingIcon {
          constructor(manager, x, y, iconData) {
            this.manager = manager;
            this.element = document.createElement('div');
            this.element.className = 'pink-mode-floating-icon';
            this.element.style.left = x + 'px';
            this.element.style.top = y + 'px';
            this.element.style.position = 'fixed';
            this.element.style.width = '100px';
            this.element.style.height = '100px';
            this.element.style.pointerEvents = 'none';
            this.element.style.zIndex = '10000';

            document.body.appendChild(this.element);

            ensurePinkModeLottieRuntime().then(lottie => {
              this.anim = lottie.loadAnimation({
                container: this.element,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: iconData
              });
            });

            // Simple fall animation
            this.posY = y;
            this.speed = 1 + Math.random() * 2;
            this.tick = this.tick.bind(this);
            requestAnimationFrame(this.tick);
          }

          tick() {
            if (!this.element.parentNode) return;
            this.posY += this.speed;
            this.element.style.top = this.posY + 'px';
            if (this.posY > window.innerHeight) {
              this.destroy();
            } else {
              requestAnimationFrame(this.tick);
            }
          }

          destroy() {
            if (this.element.parentNode) {
              this.element.parentNode.removeChild(this.element);
            }
            if (this.anim) {
              this.anim.destroy();
            }
          }
        }

        class PinkModeManager {
          constructor() {
            this.active = false;
            this.icons = [];
            this.combo = 0;
          }

          activate() {
            this.active = true;
            document.body.classList.add('pink-mode-active');
          }

          deactivate() {
            this.active = false;
            document.body.classList.remove('pink-mode-active');
            this.icons.forEach(i => i.destroy());
            this.icons = [];
          }

          triggerRain() {
            // TODO: Implement proper rain
            console.log('Rain triggered!');
            for (let i = 0; i < 20; i++) {
              setTimeout(() => {
                this.spawnRandomIcon();
              }, i * 200);
            }
          }

          spawnRandomIcon() {
            const iconFile = PINK_MODE_ANIMATED_ICON_FILES[Math.floor(Math.random() * PINK_MODE_ANIMATED_ICON_FILES.length)];
            let iconData = null;
            if (GLOBAL_SCOPE.cinePinkModeAnimatedIconData && GLOBAL_SCOPE.cinePinkModeAnimatedIconData[iconFile]) {
              iconData = JSON.parse(GLOBAL_SCOPE.cinePinkModeAnimatedIconData[iconFile]);
            }
            if (!iconData) return;

            const x = Math.random() * window.innerWidth;
            const y = -150;
            const icon = new FloatingIcon(this, x, y, iconData);
            this.icons.push(icon);
          }
        }

        const manager = new PinkModeManager();

        // Export interface expected by pink-mode-support.js
        exports.pinkModeIcons = {
          off: { className: 'icon-svg pink-mode-icon', markup: '' },
          onSequence: PINK_MODE_ANIMATED_ICON_FILES
        };
        exports.ensureSvgHasAriaHidden = (markup) => markup; // Stub
        exports.setPinkModeIconSequence = () => { }; // Stub
        exports.loadPinkModeIconsFromFiles = () => Promise.resolve(); // Stub
        exports.ensurePinkModeLottieRuntime = ensurePinkModeLottieRuntime;
        exports.resolvePinkModeLottieRuntime = () => GLOBAL_SCOPE.lottie;
        exports.startPinkModeAnimatedIcons = () => manager.activate();
        exports.stopPinkModeAnimatedIcons = () => manager.deactivate();
        exports.triggerPinkModeIconRain = () => manager.triggerRain();
        exports.startPinkModeIconPreload = () => { };
        exports.PINK_MODE_ICON_INTERVAL_MS = 30000;
        exports.PINK_MODE_ICON_ANIMATION_CLASS = 'pink-mode-icon-pop';
        exports.PINK_MODE_ICON_ANIMATION_RESET_DELAY = 450;
        exports.PINK_MODE_ICON_FALLBACK_MARKUP = [];

        // Expose class for debugging
        exports.PinkModeManager = PinkModeManager;
        exports.PINK_MODE_ANIMATED_ICON_FILES = PINK_MODE_ANIMATED_ICON_FILES;

      })();
    },

    'modules/core/pink-mode-support.js': function (module, exports, require) {
      /* global cineCorePinkModeAnimations */

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

        function createFallbackSupport() {
          const fallbackIcons = Object.freeze({
            off: Object.freeze({ className: 'icon-svg pink-mode-icon', markup: '' }),
            onSequence: Object.freeze([]),
          });

          const fallbackMarkup = Object.freeze([]);

          function ensureSvgHasAriaHidden(markup) {
            return typeof markup === 'string' ? markup.trim() : '';
          }

          function noop() { }

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
            startPinkModeIconPreload: noop,
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
              const required = require('modules/core/pink-mode-animations.js');
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
            startPinkModeIconPreload:
              typeof animations.startPinkModeIconPreload === 'function'
                ? animations.startPinkModeIconPreload
                : fallback.startPinkModeIconPreload,
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
          startPinkModeIconPreload: support.startPinkModeIconPreload || function () { },
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

    }
  };
  /* eslint-enable no-unused-vars */


  const MODULE_CACHE = Object.create(null);

  function loadModule(moduleId) {
    if (MODULE_CACHE[moduleId]) {
      return MODULE_CACHE[moduleId].exports;
    }

    const factory = MODULE_FACTORIES[moduleId];
    if (typeof factory !== 'function') {
      throw new Error('Unknown pink mode module: ' + moduleId);
    }

    const module = { exports: {} };
    MODULE_CACHE[moduleId] = module;

    const moduleDir = getModuleDirectory(moduleId);

    function localRequire(request) {
      if (typeof request === 'string') {
        let normalized = null;
        if (request.startsWith('./modules/core/')) {
          normalized = request.slice(2);
        } else if (request.startsWith('../core/')) {
          normalized = 'modules/core/' + request.slice(8);
        } else if (request.startsWith('./') || request.startsWith('../')) {
          normalized = normalizeFromDir(moduleDir, request);
        }
        if (normalized && MODULE_FACTORIES[normalized]) {
          return loadModule(normalized);
        }
      }
      return require(request);
    }

    factory(module, module.exports, localRequire);

    return module.exports;
  }

  const exportsMap = {};
  Object.keys(MODULE_FACTORIES).forEach(moduleId => {
    exportsMap[moduleId] = loadModule(moduleId);
  });

  if (typeof module === 'object' && module && module.exports) {
    module.exports = exportsMap;
  }

  const globalScope = typeof globalThis === 'object' && globalThis
    ? globalThis
    : typeof window === 'object' && window
      ? window
      : typeof self === 'object' && self
        ? self
        : typeof global === 'object' && global
          ? global
          : null;

  if (globalScope) {
    const targetName = 'cineCorePinkModeModules';
    const existing = globalScope[targetName] && typeof globalScope[targetName] === 'object'
      ? globalScope[targetName]
      : {};
    Object.keys(exportsMap).forEach(key => {
      existing[key] = exportsMap[key];
    });
    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }

    // Start preloading icons in the background (non-blocking)
    if (exportsMap['modules/core/pink-mode-support.js'] &&
      exportsMap['modules/core/pink-mode-support.js'].startPinkModeIconPreload) {
      try {
        exportsMap['modules/core/pink-mode-support.js'].startPinkModeIconPreload();
      } catch (preloadError) {
        console.warn('[PinkMode] Could not start icon preload', preloadError);
      }
    }
  }
})();
