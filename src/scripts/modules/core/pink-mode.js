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

        const HORSE_SVG_MARKUP = '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="m1 40c0-8 3-17 3-17a4.84 4.84 0 0 0-1.829-3.064 1 1 0 0 1 .45-1.716 19.438 19.438 0 0 1 4.379-.22c.579-2.317-1.19-3.963-2.782-4.938a1 1 0 0 1 .393-1.85 14.128 14.128 0 0 1 6.389.788c0-.958-1.147-2.145-2.342-3.122a1 1 0 0 1 .708-1.773 40.655 40.655 0 0 1 6.634.895 3.723 3.723 0 0 0-1.049-2.264 1 1 0 0 1 .823-1.652c6.151.378 9.226 1.916 9.226 1.916l10-1s8.472-2.311 15.954.5a1 1 0 0 1-.084 1.9c-1.455.394-2.87 1.143-2.87 2.6 0 0 4.426.738 5.675 4.114a1 1 0 0 1-1.228 1.317c-1.64-.48-4.273-.88-6.447.569Z" fill="#805333" /><path d="m30.18 42.82c1.073 2.7 2.6 9.993 3.357 13.8a2 2 0 0 1-1.964 2.38h-28.573a2 2 0 0 1-2-2v-18c0-2.55 10.03-22.11 23.99-23.87Z" fill="#a56a43" /><path d="m55.67 48.46-6.34 2.97a6 6 0 0 1-7.98-2.88l-.25-.54-.76-1.6a4.956 4.956 0 0 0-4.68-2.87c-.22.01-.44.02-.66.02a16.019 16.019 0 0 1-8.28-29.66c-1.81-2.97-3.45-8.03 2.03-12.49a2.1 2.1 0 0 1 2.5 0c4.23 3.45 4.21 7.25 3.16 10.17a16 16 0 0 1 15.91 11.36l5.31 11.31 2.92 6.22a6.008 6.008 0 0 1-2.88 7.99Z" fill="#cb8252" /><circle cx="42" cy="26" r="3" fill="#2c2f38" /><circle cx="54" cy="43" r="1" fill="#805333" /><path d="m58.55 40.47-2.92-6.22-14.53 13.76.25.54a6 6 0 0 0 7.98 2.88l6.34-2.97a6.008 6.008 0 0 0 2.88-7.99Zm-4.55 3.53a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z" fill="#cf976a" /><circle cx="41" cy="25" r="1.25" fill="#ecf0f1" /></svg>';

        // Create pink/unicorn variants by replacing brown colors with pink/purple shades and adding a horn
        const HORN_MARKUP = '<path d="M44 19 L56 5 L49 22 Z" fill="#ffd700" />';
        const UNICORN_BASE_MARKUP = HORSE_SVG_MARKUP.replace('</svg>', HORN_MARKUP + '</svg>');

        const UNICORN_1_MARKUP = UNICORN_BASE_MARKUP
          .replace(/#805333/g, '#d63384') // Deep pink
          .replace(/#a56a43/g, '#e83e8c') // Pink
          .replace(/#cb8252/g, '#fd7e14') // Orange-pink
          .replace(/#cf976a/g, '#ffc0cb'); // Light pink

        const UNICORN_2_MARKUP = UNICORN_BASE_MARKUP
          .replace(/#805333/g, '#6f42c1') // Purple
          .replace(/#a56a43/g, '#d63384') // Deep pink
          .replace(/#cb8252/g, '#e83e8c') // Pink
          .replace(/#cf976a/g, '#e0cffc'); // Light purple

        const UNICORN_3_MARKUP = UNICORN_BASE_MARKUP
          .replace(/#805333/g, '#0dcaf0') // Cyan/Blueish for variety
          .replace(/#a56a43/g, '#6f42c1') // Purple
          .replace(/#cb8252/g, '#d63384') // Deep pink
          .replace(/#cf976a/g, '#9ec5fe'); // Light blue

        const PINK_MODE_TOGGLE_SEQUENCE = [
          { className: 'icon-svg pink-mode-icon', markup: UNICORN_1_MARKUP, lottiePath: 'src/animations/horn.json' },
          { className: 'icon-svg pink-mode-icon', markup: UNICORN_2_MARKUP, lottiePath: 'src/animations/unicorn.json' },
          { className: 'icon-svg pink-mode-icon', markup: UNICORN_3_MARKUP, lottiePath: 'src/animations/rainbow.json' }
        ];

        // Export interface expected by pink-mode-support.js
        exports.pinkModeIcons = {
          off: { className: 'icon-svg pink-mode-icon', markup: HORSE_SVG_MARKUP },
          onSequence: PINK_MODE_TOGGLE_SEQUENCE
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
            off: Object.freeze({ className: 'icon-svg pink-mode-icon', markup: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="m1 40c0-8 3-17 3-17a4.84 4.84 0 0 0-1.829-3.064 1 1 0 0 1 .45-1.716 19.438 19.438 0 0 1 4.379-.22c.579-2.317-1.19-3.963-2.782-4.938a1 1 0 0 1 .393-1.85 14.128 14.128 0 0 1 6.389.788c0-.958-1.147-2.145-2.342-3.122a1 1 0 0 1 .708-1.773 40.655 40.655 0 0 1 6.634.895 3.723 3.723 0 0 0-1.049-2.264 1 1 0 0 1 .823-1.652c6.151.378 9.226 1.916 9.226 1.916l10-1s8.472-2.311 15.954.5a1 1 0 0 1-.084 1.9c-1.455.394-2.87 1.143-2.87 2.6 0 0 4.426.738 5.675 4.114a1 1 0 0 1-1.228 1.317c-1.64-.48-4.273-.88-6.447.569Z" fill="#805333" /><path d="m30.18 42.82c1.073 2.7 2.6 9.993 3.357 13.8a2 2 0 0 1-1.964 2.38h-28.573a2 2 0 0 1-2-2v-18c0-2.55 10.03-22.11 23.99-23.87Z" fill="#a56a43" /><path d="m55.67 48.46-6.34 2.97a6 6 0 0 1-7.98-2.88l-.25-.54-.76-1.6a4.956 4.956 0 0 0-4.68-2.87c-.22.01-.44.02-.66.02a16.019 16.019 0 0 1-8.28-29.66c-1.81-2.97-3.45-8.03 2.03-12.49a2.1 2.1 0 0 1 2.5 0c4.23 3.45 4.21 7.25 3.16 10.17a16 16 0 0 1 15.91 11.36l5.31 11.31 2.92 6.22a6.008 6.008 0 0 1-2.88 7.99Z" fill="#cb8252" /><circle cx="42" cy="26" r="3" fill="#2c2f38" /><circle cx="54" cy="43" r="1" fill="#805333" /><path d="m58.55 40.47-2.92-6.22-14.53 13.76.25.54a6 6 0 0 0 7.98 2.88l6.34-2.97a6.008 6.008 0 0 0 2.88-7.99Zm-4.55 3.53a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z" fill="#cf976a" /><circle cx="41" cy="25" r="1.25" fill="#ecf0f1" /></svg>' }),
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

            // Expose legacy globals expected by app-core-new-1.js
            const legacyGlobals = [
              'setPinkModeIconSequence',
              'loadPinkModeIconsFromFiles',
              'pinkModeIcons',
              'ensureSvgHasAriaHidden',
              'ensurePinkModeLottieRuntime',
              'resolvePinkModeLottieRuntime',
              'startPinkModeAnimatedIcons',
              'stopPinkModeAnimatedIcons',
              'triggerPinkModeIconRain',
              'startPinkModeIconPreload',
              'PINK_MODE_ICON_FALLBACK_MARKUP'
            ];

            legacyGlobals.forEach(key => {
              if (api[key] !== undefined) {
                scope[key] = api[key];
              }
            });
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
        if (MODULE_FACTORIES[request]) {
          return loadModule(request);
        }

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

      if (typeof require === 'function') {
        return require(request);
      }
      return null;
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
