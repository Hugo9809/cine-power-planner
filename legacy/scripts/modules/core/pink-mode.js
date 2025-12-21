function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function () {
  function getModuleDirectory(moduleId) {
    var segments = moduleId.split('/');
    segments.pop();
    return segments.join('/');
  }
  function normalizeFromDir(moduleDir, request) {
    var segments = moduleDir ? moduleDir.split('/') : [];
    var parts = request.split('/');
    for (var index = 0; index < parts.length; index += 1) {
      var segment = parts[index];
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
  var MODULE_FACTORIES = {
    'modules/core/pink-mode-animations.js': function modules_core_pinkModeAnimationsJs(module, exports, require) {
      (function () {
        var GLOBAL_SCOPE = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : global;
        var PINK_MODE_ANIMATED_ICON_FILES = Object.freeze(['src/animations/pink-mode/camera.json', 'src/animations/pink-mode/director-chair.json', 'src/animations/pink-mode/dog.json', 'src/animations/pink-mode/fox-2.json', 'src/animations/pink-mode/fox-3.json', 'src/animations/pink-mode/fox.json', 'src/animations/pink-mode/horse.json', 'src/animations/pink-mode/mountains.json', 'src/animations/pink-mode/movie-camera.json', 'src/animations/pink-mode/pinata.json', 'src/animations/pink-mode/script.json', 'src/animations/pink-mode/video-camera.json']);
        function ensurePinkModeLottieRuntime() {
          if (GLOBAL_SCOPE.lottie) return Promise.resolve(GLOBAL_SCOPE.lottie);
          if (GLOBAL_SCOPE.bodymovin) return Promise.resolve(GLOBAL_SCOPE.bodymovin);
          if (document.querySelector('script[data-loader="pink-mode-lottie"]')) {
            return new Promise(function (resolve) {
              var s = document.querySelector('script[data-loader="pink-mode-lottie"]');
              if (s.dataset.loaded === 'true') resolve(GLOBAL_SCOPE.lottie);else s.addEventListener('load', function () {
                return resolve(GLOBAL_SCOPE.lottie);
              }, {
                once: true
              });
            });
          }
          return new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            script.src = 'src/vendor/lottie.min.js';
            script.async = true;
            script.setAttribute('data-loader', 'pink-mode-lottie');
            script.onload = function () {
              script.dataset.loaded = 'true';
              resolve(GLOBAL_SCOPE.lottie);
            };
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }
        var FloatingIcon = function () {
          function FloatingIcon(manager, x, y, iconData) {
            var _this = this;
            _classCallCheck(this, FloatingIcon);
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
            ensurePinkModeLottieRuntime().then(function (lottie) {
              _this.anim = lottie.loadAnimation({
                container: _this.element,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: iconData
              });
            });
            this.posY = y;
            this.speed = 1 + Math.random() * 2;
            this.tick = this.tick.bind(this);
            requestAnimationFrame(this.tick);
          }
          return _createClass(FloatingIcon, [{
            key: "tick",
            value: function tick() {
              if (!this.element.parentNode) return;
              this.posY += this.speed;
              this.element.style.top = this.posY + 'px';
              if (this.posY > window.innerHeight) {
                this.destroy();
              } else {
                requestAnimationFrame(this.tick);
              }
            }
          }, {
            key: "destroy",
            value: function destroy() {
              if (this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
              }
              if (this.anim) {
                this.anim.destroy();
              }
            }
          }]);
        }();
        var PinkModeManager = function () {
          function PinkModeManager() {
            _classCallCheck(this, PinkModeManager);
            this.active = false;
            this.icons = [];
            this.combo = 0;
          }
          return _createClass(PinkModeManager, [{
            key: "activate",
            value: function activate() {
              this.active = true;
              document.body.classList.add('pink-mode-active');
            }
          }, {
            key: "deactivate",
            value: function deactivate() {
              this.active = false;
              document.body.classList.remove('pink-mode-active');
              this.icons.forEach(function (i) {
                return i.destroy();
              });
              this.icons = [];
            }
          }, {
            key: "triggerRain",
            value: function triggerRain() {
              var _this2 = this;
              console.log('Rain triggered!');
              for (var i = 0; i < 20; i++) {
                setTimeout(function () {
                  _this2.spawnRandomIcon();
                }, i * 200);
              }
            }
          }, {
            key: "spawnRandomIcon",
            value: function spawnRandomIcon() {
              var iconFile = PINK_MODE_ANIMATED_ICON_FILES[Math.floor(Math.random() * PINK_MODE_ANIMATED_ICON_FILES.length)];
              var iconData = null;
              if (GLOBAL_SCOPE.cinePinkModeAnimatedIconData && GLOBAL_SCOPE.cinePinkModeAnimatedIconData[iconFile]) {
                iconData = JSON.parse(GLOBAL_SCOPE.cinePinkModeAnimatedIconData[iconFile]);
              }
              if (!iconData) return;
              var x = Math.random() * window.innerWidth;
              var y = -150;
              var icon = new FloatingIcon(this, x, y, iconData);
              this.icons.push(icon);
            }
          }]);
        }();
        var manager = new PinkModeManager();
        exports.pinkModeIcons = {
          off: {
            className: 'icon-svg pink-mode-icon',
            markup: ''
          },
          onSequence: PINK_MODE_ANIMATED_ICON_FILES
        };
        exports.ensureSvgHasAriaHidden = function (markup) {
          return markup;
        };
        exports.setPinkModeIconSequence = function () {};
        exports.loadPinkModeIconsFromFiles = function () {
          return Promise.resolve();
        };
        exports.ensurePinkModeLottieRuntime = ensurePinkModeLottieRuntime;
        exports.resolvePinkModeLottieRuntime = function () {
          return GLOBAL_SCOPE.lottie;
        };
        exports.startPinkModeAnimatedIcons = function () {
          return manager.activate();
        };
        exports.stopPinkModeAnimatedIcons = function () {
          return manager.deactivate();
        };
        exports.triggerPinkModeIconRain = function () {
          return manager.triggerRain();
        };
        exports.startPinkModeIconPreload = function () {};
        exports.PINK_MODE_ICON_INTERVAL_MS = 30000;
        exports.PINK_MODE_ICON_ANIMATION_CLASS = 'pink-mode-icon-pop';
        exports.PINK_MODE_ICON_ANIMATION_RESET_DELAY = 450;
        exports.PINK_MODE_ICON_FALLBACK_MARKUP = [];
        exports.PinkModeManager = PinkModeManager;
        exports.PINK_MODE_ANIMATED_ICON_FILES = PINK_MODE_ANIMATED_ICON_FILES;
      })();
    },
    'modules/core/pink-mode-support.js': function modules_core_pinkModeSupportJs(module, exports, require) {
      (function () {
        function detectScope() {
          if (typeof globalThis !== 'undefined' && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
            return globalThis;
          }
          if (typeof window !== 'undefined' && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
            return window;
          }
          if (typeof self !== 'undefined' && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
            return self;
          }
          if (typeof global !== 'undefined' && global && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
            return global;
          }
          return null;
        }
        function isObject(value) {
          return !!value && (_typeof(value) === 'object' || typeof value === 'function');
        }
        function createSafeResolvedPromise(value) {
          if (typeof Promise !== 'undefined' && typeof Promise.resolve === 'function') {
            return Promise.resolve(value);
          }
          var promiseLike = {
            then: function then(callback) {
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
            catch: function _catch() {
              return promiseLike;
            }
          };
          return promiseLike;
        }
        function createFallbackSupport() {
          var fallbackIcons = Object.freeze({
            off: Object.freeze({
              className: 'icon-svg pink-mode-icon',
              markup: ''
            }),
            onSequence: Object.freeze([])
          });
          var fallbackMarkup = Object.freeze([]);
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
            ensureSvgHasAriaHidden: ensureSvgHasAriaHidden,
            setPinkModeIconSequence: returnFalse,
            loadPinkModeIconsFromFiles: function loadPinkModeIconsFromFiles() {
              return createSafeResolvedPromise();
            },
            ensurePinkModeLottieRuntime: function ensurePinkModeLottieRuntime() {
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
            PINK_MODE_ICON_FALLBACK_MARKUP: fallbackMarkup
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
              var required = require('modules/core/pink-mode-animations.js');
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
          var fallback = createFallbackSupport();
          var animations = resolvePinkModeAnimations(scope);
          if (!isObject(animations)) {
            return fallback;
          }
          return {
            pinkModeIcons: isObject(animations.pinkModeIcons) ? animations.pinkModeIcons : fallback.pinkModeIcons,
            ensureSvgHasAriaHidden: typeof animations.ensureSvgHasAriaHidden === 'function' ? animations.ensureSvgHasAriaHidden : fallback.ensureSvgHasAriaHidden,
            setPinkModeIconSequence: typeof animations.setPinkModeIconSequence === 'function' ? animations.setPinkModeIconSequence : fallback.setPinkModeIconSequence,
            loadPinkModeIconsFromFiles: typeof animations.loadPinkModeIconsFromFiles === 'function' ? animations.loadPinkModeIconsFromFiles : fallback.loadPinkModeIconsFromFiles,
            ensurePinkModeLottieRuntime: typeof animations.ensurePinkModeLottieRuntime === 'function' ? animations.ensurePinkModeLottieRuntime : fallback.ensurePinkModeLottieRuntime,
            resolvePinkModeLottieRuntime: typeof animations.resolvePinkModeLottieRuntime === 'function' ? animations.resolvePinkModeLottieRuntime : fallback.resolvePinkModeLottieRuntime,
            startPinkModeAnimatedIcons: typeof animations.startPinkModeAnimatedIcons === 'function' ? animations.startPinkModeAnimatedIcons : fallback.startPinkModeAnimatedIcons,
            stopPinkModeAnimatedIcons: typeof animations.stopPinkModeAnimatedIcons === 'function' ? animations.stopPinkModeAnimatedIcons : fallback.stopPinkModeAnimatedIcons,
            triggerPinkModeIconRain: typeof animations.triggerPinkModeIconRain === 'function' ? animations.triggerPinkModeIconRain : fallback.triggerPinkModeIconRain,
            startPinkModeIconPreload: typeof animations.startPinkModeIconPreload === 'function' ? animations.startPinkModeIconPreload : fallback.startPinkModeIconPreload,
            getPinkModeIconRotationTimer: typeof animations.getPinkModeIconRotationTimer === 'function' ? animations.getPinkModeIconRotationTimer : fallback.getPinkModeIconRotationTimer,
            setPinkModeIconRotationTimer: typeof animations.setPinkModeIconRotationTimer === 'function' ? animations.setPinkModeIconRotationTimer : fallback.setPinkModeIconRotationTimer,
            getPinkModeIconIndex: typeof animations.getPinkModeIconIndex === 'function' ? animations.getPinkModeIconIndex : fallback.getPinkModeIconIndex,
            setPinkModeIconIndex: typeof animations.setPinkModeIconIndex === 'function' ? animations.setPinkModeIconIndex : fallback.setPinkModeIconIndex,
            PINK_MODE_ICON_INTERVAL_MS: typeof animations.PINK_MODE_ICON_INTERVAL_MS === 'number' ? animations.PINK_MODE_ICON_INTERVAL_MS : fallback.PINK_MODE_ICON_INTERVAL_MS,
            PINK_MODE_ICON_ANIMATION_CLASS: typeof animations.PINK_MODE_ICON_ANIMATION_CLASS === 'string' ? animations.PINK_MODE_ICON_ANIMATION_CLASS : fallback.PINK_MODE_ICON_ANIMATION_CLASS,
            PINK_MODE_ICON_ANIMATION_RESET_DELAY: typeof animations.PINK_MODE_ICON_ANIMATION_RESET_DELAY === 'number' ? animations.PINK_MODE_ICON_ANIMATION_RESET_DELAY : fallback.PINK_MODE_ICON_ANIMATION_RESET_DELAY,
            PINK_MODE_ICON_FALLBACK_MARKUP: Array.isArray(animations.PINK_MODE_ICON_FALLBACK_MARKUP) ? animations.PINK_MODE_ICON_FALLBACK_MARKUP : fallback.PINK_MODE_ICON_FALLBACK_MARKUP
          };
        }
        var scope = detectScope();
        var support = resolvePinkModeSupport(scope);
        var api = {
          resolvePinkModeSupport: function resolvePinkModeSupport() {
            return support;
          },
          createFallbackSupport: createFallbackSupport,
          pinkModeIcons: support.pinkModeIcons,
          ensureSvgHasAriaHidden: support.ensureSvgHasAriaHidden,
          setPinkModeIconSequence: support.setPinkModeIconSequence,
          loadPinkModeIconsFromFiles: support.loadPinkModeIconsFromFiles,
          ensurePinkModeLottieRuntime: support.ensurePinkModeLottieRuntime,
          resolvePinkModeLottieRuntime: support.resolvePinkModeLottieRuntime,
          startPinkModeAnimatedIcons: support.startPinkModeAnimatedIcons,
          stopPinkModeAnimatedIcons: support.stopPinkModeAnimatedIcons,
          triggerPinkModeIconRain: support.triggerPinkModeIconRain,
          startPinkModeIconPreload: support.startPinkModeIconPreload || function () {},
          getPinkModeIconRotationTimer: support.getPinkModeIconRotationTimer,
          setPinkModeIconRotationTimer: support.setPinkModeIconRotationTimer,
          getPinkModeIconIndex: support.getPinkModeIconIndex,
          setPinkModeIconIndex: support.setPinkModeIconIndex,
          PINK_MODE_ICON_INTERVAL_MS: support.PINK_MODE_ICON_INTERVAL_MS,
          PINK_MODE_ICON_ANIMATION_CLASS: support.PINK_MODE_ICON_ANIMATION_CLASS,
          PINK_MODE_ICON_ANIMATION_RESET_DELAY: support.PINK_MODE_ICON_ANIMATION_RESET_DELAY,
          PINK_MODE_ICON_FALLBACK_MARKUP: support.PINK_MODE_ICON_FALLBACK_MARKUP
        };
        if (typeof module !== 'undefined' && module.exports) {
          module.exports = api;
        }
        if (scope && isObject(scope)) {
          try {
            var target = scope.cineCorePinkModeSupport || {};
            Object.assign(target, api);
            scope.cineCorePinkModeSupport = target;
          } catch (pinkModeSupportAssignError) {
            void pinkModeSupportAssignError;
          }
        }
      })();
    }
  };
  var MODULE_CACHE = Object.create(null);
  function loadModule(moduleId) {
    if (MODULE_CACHE[moduleId]) {
      return MODULE_CACHE[moduleId].exports;
    }
    var factory = MODULE_FACTORIES[moduleId];
    if (typeof factory !== 'function') {
      throw new Error('Unknown pink mode module: ' + moduleId);
    }
    var module = {
      exports: {}
    };
    MODULE_CACHE[moduleId] = module;
    var moduleDir = getModuleDirectory(moduleId);
    function localRequire(request) {
      if (typeof request === 'string') {
        var normalized = null;
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
  var exportsMap = {};
  Object.keys(MODULE_FACTORIES).forEach(function (moduleId) {
    exportsMap[moduleId] = loadModule(moduleId);
  });
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = exportsMap;
  }
  var globalScope = (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' && globalThis ? globalThis : (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window ? window : (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' && self ? self : (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' && global ? global : null;
  if (globalScope) {
    var targetName = 'cineCorePinkModeModules';
    var existing = globalScope[targetName] && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
    Object.keys(exportsMap).forEach(function (key) {
      existing[key] = exportsMap[key];
    });
    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
    if (exportsMap['modules/core/pink-mode-support.js'] && exportsMap['modules/core/pink-mode-support.js'].startPinkModeIconPreload) {
      try {
        exportsMap['modules/core/pink-mode-support.js'].startPinkModeIconPreload();
      } catch (preloadError) {
        console.warn('[PinkMode] Could not start icon preload', preloadError);
      }
    }
  }
})();