function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function isObject(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
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
  function ensureFunction(candidate, fallback) {
    if (typeof candidate === 'function') {
      return candidate;
    }
    return fallback;
  }
  function detectScope(primary) {
    if (isObject(primary)) {
      return primary;
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
  function appendUniqueScope(scopes, scope, seen) {
    if (!Array.isArray(scopes)) {
      return;
    }
    if (!isObject(scope)) {
      return;
    }
    if (seen) {
      if (seen.has(scope)) {
        return;
      }
      seen.add(scope);
      scopes.push(scope);
      return;
    }
    if (scopes.indexOf(scope) !== -1) {
      return;
    }
    scopes.push(scope);
  }
  function collectFallbackScopes(options) {
    var scopes = [];
    var seen = typeof Set === 'function' ? new Set() : null;
    appendUniqueScope(scopes, options && options.runtimeScope, seen);
    appendUniqueScope(scopes, options && options.coreGlobalScope, seen);
    if (Array.isArray(options && options.fallbackScopes)) {
      for (var index = 0; index < options.fallbackScopes.length; index += 1) {
        appendUniqueScope(scopes, options.fallbackScopes[index], seen);
      }
    }
    appendUniqueScope(scopes, typeof globalThis !== 'undefined' ? globalThis : null, seen);
    appendUniqueScope(scopes, typeof window !== 'undefined' ? window : null, seen);
    appendUniqueScope(scopes, typeof self !== 'undefined' ? self : null, seen);
    appendUniqueScope(scopes, typeof global !== 'undefined' ? global : null, seen);
    return scopes;
  }
  function findLoaderFactory(methodName, context) {
    var requireFn = context.requireFn;
    var loaderPath = context.loaderPath;
    var fallbackScopes = context.fallbackScopes;
    var candidates = [];
    var seen = typeof Set === 'function' ? new Set() : null;
    function addCandidate(candidate) {
      if (!isObject(candidate)) {
        return;
      }
      if (seen) {
        if (seen.has(candidate)) {
          return;
        }
        seen.add(candidate);
        candidates.push(candidate);
        return;
      }
      if (candidates.indexOf(candidate) !== -1) {
        return;
      }
      candidates.push(candidate);
    }
    addCandidate(context.loaderTools);
    if (typeof requireFn === 'function') {
      try {
        addCandidate(requireFn(loaderPath));
      } catch (pinkModeLoaderRequireError) {
        void pinkModeLoaderRequireError;
      }
    }
    for (var index = 0; index < fallbackScopes.length; index += 1) {
      var _scope = fallbackScopes[index];
      if (!isObject(_scope)) {
        continue;
      }
      try {
        addCandidate(_scope.cineCoreAppPinkModeSupportLoader);
      } catch (pinkModeLoaderLookupError) {
        void pinkModeLoaderLookupError;
      }
    }
    for (var _index = 0; _index < candidates.length; _index += 1) {
      var candidate = candidates[_index];
      if (!isObject(candidate)) {
        continue;
      }
      var method = candidate[methodName];
      if (typeof method === 'function') {
        try {
          return method.bind(candidate);
        } catch (bindError) {
          void bindError;
          return method;
        }
      }
    }
    return null;
  }
  function createDefaultLastResortApi() {
    var fallbackIcons = Object.freeze({
      off: Object.freeze({
        className: 'icon-svg pink-mode-icon',
        markup: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="m1 40c0-8 3-17 3-17a4.84 4.84 0 0 0-1.829-3.064 1 1 0 0 1 .45-1.716 19.438 19.438 0 0 1 4.379-.22c.579-2.317-1.19-3.963-2.782-4.938a1 1 0 0 1 .393-1.85 14.128 14.128 0 0 1 6.389.788c0-.958-1.147-2.145-2.342-3.122a1 1 0 0 1 .708-1.773 40.655 40.655 0 0 1 6.634.895 3.723 3.723 0 0 0-1.049-2.264 1 1 0 0 1 .823-1.652c6.151.378 9.226 1.916 9.226 1.916l10-1s8.472-2.311 15.954.5a1 1 0 0 1-.084 1.9c-1.455.394-2.87 1.143-2.87 2.6 0 0 4.426.738 5.675 4.114a1 1 0 0 1-1.228 1.317c-1.64-.48-4.273-.88-6.447.569Z" fill="#805333" /><path d="m30.18 42.82c1.073 2.7 2.6 9.993 3.357 13.8a2 2 0 0 1-1.964 2.38h-28.573a2 2 0 0 1-2-2v-18c0-2.55 10.03-22.11 23.99-23.87Z" fill="#a56a43" /><path d="m55.67 48.46-6.34 2.97a6 6 0 0 1-7.98-2.88l-.25-.54-.76-1.6a4.956 4.956 0 0 0-4.68-2.87c-.22.01-.44.02-.66.02a16.019 16.019 0 0 1-8.28-29.66c-1.81-2.97-3.45-8.03 2.03-12.49a2.1 2.1 0 0 1 2.5 0c4.23 3.45 4.21 7.25 3.16 10.17a16 16 0 0 1 15.91 11.36l5.31 11.31 2.92 6.22a6.008 6.008 0 0 1-2.88 7.99Z" fill="#cb8252" /><circle cx="42" cy="26" r="3" fill="#2c2f38" /><circle cx="54" cy="43" r="1" fill="#805333" /><path d="m58.55 40.47-2.92-6.22-14.53 13.76.25.54a6 6 0 0 0 7.98 2.88l6.34-2.97a6.008 6.008 0 0 0 2.88-7.99Zm-4.55 3.53a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z" fill="#cf976a" /><circle cx="41" cy="25" r="1.25" fill="#ecf0f1" /></svg>'
      }),
      onSequence: Object.freeze([])
    });
    function ensureSafePromise(value) {
      if (typeof Promise !== 'undefined' && typeof Promise.resolve === 'function') {
        return Promise.resolve(value);
      }
      var promiseLike = {
        then: function then(callback) {
          if (typeof callback === 'function') {
            try {
              return ensureSafePromise(callback(value));
            } catch (callbackError) {
              void callbackError;
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
    function noop() {}
    function trimMarkup(markup) {
      return typeof markup === 'string' ? markup.trim() : '';
    }
    return {
      pinkModeIcons: fallbackIcons,
      ensureSvgHasAriaHidden: trimMarkup,
      setPinkModeIconSequence: function setPinkModeIconSequence() {
        return false;
      },
      loadPinkModeIconsFromFiles: function loadPinkModeIconsFromFiles() {
        return ensureSafePromise();
      },
      ensurePinkModeLottieRuntime: function ensurePinkModeLottieRuntime() {
        return ensureSafePromise(null);
      },
      resolvePinkModeLottieRuntime: function resolvePinkModeLottieRuntime() {
        return null;
      },
      startPinkModeAnimatedIcons: noop,
      stopPinkModeAnimatedIcons: noop,
      triggerPinkModeIconRain: noop,
      getPinkModeIconRotationTimer: function getPinkModeIconRotationTimer() {
        return null;
      },
      setPinkModeIconRotationTimer: noop,
      getPinkModeIconIndex: function getPinkModeIconIndex() {
        return 0;
      },
      setPinkModeIconIndex: noop,
      PINK_MODE_ICON_INTERVAL_MS: 30000,
      PINK_MODE_ICON_ANIMATION_CLASS: 'pink-mode-icon-pop',
      PINK_MODE_ICON_ANIMATION_RESET_DELAY: 450,
      PINK_MODE_ICON_FALLBACK_MARKUP: Object.freeze([])
    };
  }
  function resolvePinkModeSupportApi(options) {
    var requireFn = ensureRequireFn(options && options.requireFn);
    var loaderPath = options && typeof options.loaderPath === 'string' && options.loaderPath ? options.loaderPath : './modules/app-core/pink-mode.js';
    var fallbackScopes = collectFallbackScopes(options);
    var loaderTools = options && options.loaderTools;
    var loaderFactory = findLoaderFactory('createPinkModeSupportApi', {
      loaderTools: loaderTools,
      requireFn: requireFn,
      loaderPath: loaderPath,
      fallbackScopes: fallbackScopes
    });
    var fallbackFactory = findLoaderFactory('createInlinePinkModeFallbackApi', {
      loaderTools: loaderTools,
      requireFn: requireFn,
      loaderPath: loaderPath,
      fallbackScopes: fallbackScopes
    });
    var lastResortFactory = ensureFunction(options && options.lastResortFactory, createDefaultLastResortApi);
    var runtimeScope = detectScope(options && options.runtimeScope);
    var coreGlobalScope = detectScope(options && options.coreGlobalScope);
    var factoryOptions = {
      resolveCoreSupportModule: options && typeof options.resolveCoreSupportModule === 'function' ? options.resolveCoreSupportModule : null,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope
    };
    var api = null;
    if (typeof loaderFactory === 'function') {
      try {
        api = loaderFactory(factoryOptions);
      } catch (pinkModeLoaderFactoryError) {
        void pinkModeLoaderFactoryError;
        api = null;
      }
    }
    if (!isObject(api) && typeof fallbackFactory === 'function') {
      try {
        api = fallbackFactory();
      } catch (pinkModeFallbackFactoryError) {
        void pinkModeFallbackFactoryError;
        api = null;
      }
    }
    if (!isObject(api)) {
      api = lastResortFactory();
    }
    return api;
  }
  var namespace = {
    resolvePinkModeSupportApi: resolvePinkModeSupportApi,
    createPinkModeSupportLastResortApi: createDefaultLastResortApi
  };
  var namespaceName = 'cineCoreAppPinkModeSupportApi';
  var scope = detectScope();
  var existing = isObject(scope) && isObject(scope[namespaceName]) ? scope[namespaceName] : {};
  Object.assign(existing, namespace);
  if (isObject(scope)) {
    try {
      scope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
(function () {
  function isObject(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
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
    var scopes = Array.isArray(candidateScopes) ? candidateScopes.slice() : [];
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
    var scope = ensureScope(runtimeScope);
    if (scope && typeof scope.resolveCoreSupportModule === 'function') {
      try {
        return scope.resolveCoreSupportModule.bind(scope);
      } catch (bindError) {
        void bindError;
      }
    }
    if (scope && scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS && typeof scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule === 'function') {
      try {
        return scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule.bind(scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS);
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
          var required = requireFn(requirePath);
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
    var HORSE_SVG_MARKUP = '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="m1 40c0-8 3-17 3-17a4.84 4.84 0 0 0-1.829-3.064 1 1 0 0 1 .45-1.716 19.438 19.438 0 0 1 4.379-.22c.579-2.317-1.19-3.963-2.782-4.938a1 1 0 0 1 .393-1.85 14.128 14.128 0 0 1 6.389.788c0-.958-1.147-2.145-2.342-3.122a1 1 0 0 1 .708-1.773 40.655 40.655 0 0 1 6.634.895 3.723 3.723 0 0 0-1.049-2.264 1 1 0 0 1 .823-1.652c6.151.378 9.226 1.916 9.226 1.916l10-1s8.472-2.311 15.954.5a1 1 0 0 1-.084 1.9c-1.455.394-2.87 1.143-2.87 2.6 0 0 4.426.738 5.675 4.114a1 1 0 0 1-1.228 1.317c-1.64-.48-4.273-.88-6.447.569Z" fill="#805333" /><path d="m30.18 42.82c1.073 2.7 2.6 9.993 3.357 13.8a2 2 0 0 1-1.964 2.38h-28.573a2 2 0 0 1-2-2v-18c0-2.55 10.03-22.11 23.99-23.87Z" fill="#a56a43" /><path d="m55.67 48.46-6.34 2.97a6 6 0 0 1-7.98-2.88l-.25-.54-.76-1.6a4.956 4.956 0 0 0-4.68-2.87c-.22.01-.44.02-.66.02a16.019 16.019 0 0 1-8.28-29.66c-1.81-2.97-3.45-8.03 2.03-12.49a2.1 2.1 0 0 1 2.5 0c4.23 3.45 4.21 7.25 3.16 10.17a16 16 0 0 1 15.91 11.36l5.31 11.31 2.92 6.22a6.008 6.008 0 0 1-2.88 7.99Z" fill="#cb8252" /><circle cx="42" cy="26" r="3" fill="#2c2f38" /><circle cx="54" cy="43" r="1" fill="#805333" /><path d="m58.55 40.47-2.92-6.22-14.53 13.76.25.54a6 6 0 0 0 7.98 2.88l6.34-2.97a6.008 6.008 0 0 0 2.88-7.99Zm-4.55 3.53a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z" fill="#cf976a" /><circle cx="41" cy="25" r="1.25" fill="#ecf0f1" /></svg>';
    var HORN_MARKUP = '<path d="M44 19 L56 5 L49 22 Z" fill="#ffd700" />';
    var UNICORN_BASE_MARKUP = HORSE_SVG_MARKUP.replace('</svg>', HORN_MARKUP + '</svg>');
    var UNICORN_1_MARKUP = UNICORN_BASE_MARKUP.replace(/#805333/g, '#d63384').replace(/#a56a43/g, '#e83e8c').replace(/#cb8252/g, '#fd7e14').replace(/#cf976a/g, '#ffc0cb');
    var UNICORN_2_MARKUP = UNICORN_BASE_MARKUP.replace(/#805333/g, '#6f42c1').replace(/#a56a43/g, '#d63384').replace(/#cb8252/g, '#e83e8c').replace(/#cf976a/g, '#e0cffc');
    var UNICORN_3_MARKUP = UNICORN_BASE_MARKUP.replace(/#805333/g, '#0dcaf0').replace(/#a56a43/g, '#6f42c1').replace(/#cb8252/g, '#d63384').replace(/#cf976a/g, '#9ec5fe');
    var PINK_MODE_TOGGLE_SEQUENCE = [{
      className: 'icon-svg pink-mode-icon',
      markup: UNICORN_1_MARKUP,
      lottiePath: 'src/animations/horn.json'
    }, {
      className: 'icon-svg pink-mode-icon',
      markup: UNICORN_2_MARKUP,
      lottiePath: 'src/animations/unicorn.json'
    }, {
      className: 'icon-svg pink-mode-icon',
      markup: UNICORN_3_MARKUP,
      lottiePath: 'src/animations/rainbow.json'
    }];
    var fallbackIcons = Object.freeze({
      off: Object.freeze({
        className: 'icon-svg pink-mode-icon',
        markup: HORSE_SVG_MARKUP
      }),
      onSequence: Object.freeze(PINK_MODE_TOGGLE_SEQUENCE)
    });
    function ensureSafePromise(value) {
      if (typeof Promise !== 'undefined' && typeof Promise.resolve === 'function') {
        return Promise.resolve(value);
      }
      var promiseLike = {
        then: function then(callback) {
          if (typeof callback === 'function') {
            try {
              return ensureSafePromise(callback(value));
            } catch (callbackError) {
              void callbackError;
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
    function noop() {}
    function ensurePinkModeLottieRuntime() {
      var GLOBAL_SCOPE = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : global;
      if (GLOBAL_SCOPE && GLOBAL_SCOPE.lottie) return ensureSafePromise(GLOBAL_SCOPE.lottie);
      if (GLOBAL_SCOPE && GLOBAL_SCOPE.bodymovin) return ensureSafePromise(GLOBAL_SCOPE.bodymovin);
      if (typeof document === 'undefined') return ensureSafePromise(null);
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
      return new Promise(function (resolve) {
        var script = document.createElement('script');
        script.src = 'src/vendor/lottie.min.js';
        script.async = true;
        script.setAttribute('data-loader', 'pink-mode-lottie');
        script.onload = function () {
          script.dataset.loaded = 'true';
          resolve(GLOBAL_SCOPE.lottie);
        };
        script.onerror = function () {
          resolve(null);
        };
        document.head.appendChild(script);
      });
    }
    return Object.freeze({
      pinkModeIcons: fallbackIcons,
      ensureSvgHasAriaHidden: noop,
      setPinkModeIconSequence: noop,
      loadPinkModeIconsFromFiles: function loadPinkModeIconsFromFiles() {
        return ensureSafePromise(fallbackIcons);
      },
      ensurePinkModeLottieRuntime: ensurePinkModeLottieRuntime,
      resolvePinkModeLottieRuntime: function resolvePinkModeLottieRuntime() {
        return ensurePinkModeLottieRuntime();
      },
      startPinkModeAnimatedIcons: noop,
      stopPinkModeAnimatedIcons: noop,
      triggerPinkModeIconRain: noop,
      getPinkModeIconRotationTimer: noop,
      setPinkModeIconRotationTimer: noop,
      getPinkModeIconIndex: noop,
      setPinkModeIconIndex: noop,
      PINK_MODE_ICON_INTERVAL_MS: 30000,
      PINK_MODE_ICON_ANIMATION_CLASS: 'pink-mode-icon-animation',
      PINK_MODE_ICON_ANIMATION_RESET_DELAY: 90,
      PINK_MODE_ICON_FALLBACK_MARKUP: ''
    });
  }
  function attemptResolvePinkModeSupport(candidate, resolverOptions) {
    if (!isObject(candidate)) {
      return null;
    }
    var resolver = typeof candidate.resolvePinkModeSupportApi === 'function' ? candidate.resolvePinkModeSupportApi : null;
    if (!resolver) {
      return null;
    }
    try {
      var api = resolver(resolverOptions);
      return isObject(api) ? api : null;
    } catch (pinkModeSupportApiError) {
      void pinkModeSupportApiError;
    }
    return null;
  }
  function resolvePinkModeSupportApi(options) {
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = ensureScope(options && options.runtimeScope);
    var coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    var resolveCoreSupportModule = ensureResolveCoreSupportModule(options && options.resolveCoreSupportModule, requireFn, runtimeScope || coreGlobalScope);
    var fallbackScopes = ensureFallbackScopes(options && options.fallbackScopes, runtimeScope, coreGlobalScope);
    var resolverOptions = {
      loaderTools: options && options.loaderTools,
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      fallbackScopes: fallbackScopes,
      loaderPath: options && options.loaderPath,
      lastResortFactory: options && options.lastResortFactory
    };
    var api = attemptResolvePinkModeSupport(options && options.apiTools, resolverOptions);
    if (!api && typeof requireFn === 'function') {
      try {
        var requiredApiTools = requireFn(options && options.apiRequirePath ? options.apiRequirePath : './modules/app-core/pink-mode.js');
        api = attemptResolvePinkModeSupport(requiredApiTools, resolverOptions);
      } catch (pinkModeSupportApiRequireError) {
        void pinkModeSupportApiRequireError;
      }
    }
    if (!api) {
      for (var index = 0; index < fallbackScopes.length; index += 1) {
        var scope = fallbackScopes[index];
        try {
          var candidate = scope && scope.cineCoreAppPinkModeSupportApi;
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
      var factory = typeof resolverOptions.lastResortFactory === 'function' ? resolverOptions.lastResortFactory : createPinkModeSupportLastResortApi;
      api = factory();
    }
    return api;
  }
  var namespace = {
    resolvePinkModeSupportApi: resolvePinkModeSupportApi,
    createPinkModeSupportLastResortApi: createPinkModeSupportLastResortApi
  };
  var globalScope = detectScope();
  var namespaceName = 'cineCoreAppPinkModeSupportResolver';
  var existing = isObject(globalScope) && isObject(globalScope[namespaceName]) ? globalScope[namespaceName] : {};
  Object.assign(existing, namespace);
  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
(function () {
  function isObject(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
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
    var scope = detectScope(runtimeScope);
    if (scope && typeof scope.resolveCoreSupportModule === 'function') {
      try {
        return scope.resolveCoreSupportModule.bind(scope);
      } catch (bindError) {
        void bindError;
      }
    }
    if (scope && scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS && typeof scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule === 'function') {
      try {
        return scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule.bind(scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS);
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
          var required = requireFn(requirePath);
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
    var scopes = [];
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
    var HORSE_SVG_MARKUP = '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="m1 40c0-8 3-17 3-17a4.84 4.84 0 0 0-1.829-3.064 1 1 0 0 1 .45-1.716 19.438 19.438 0 0 1 4.379-.22c.579-2.317-1.19-3.963-2.782-4.938a1 1 0 0 1 .393-1.85 14.128 14.128 0 0 1 6.389.788c0-.958-1.147-2.145-2.342-3.122a1 1 0 0 1 .708-1.773 40.655 40.655 0 0 1 6.634.895 3.723 3.723 0 0 0-1.049-2.264 1 1 0 0 1 .823-1.652c6.151.378 9.226 1.916 9.226 1.916l10-1s8.472-2.311 15.954.5a1 1 0 0 1-.084 1.9c-1.455.394-2.87 1.143-2.87 2.6 0 0 4.426.738 5.675 4.114a1 1 0 0 1-1.228 1.317c-1.64-.48-4.273-.88-6.447.569Z" fill="#805333" /><path d="m30.18 42.82c1.073 2.7 2.6 9.993 3.357 13.8a2 2 0 0 1-1.964 2.38h-28.573a2 2 0 0 1-2-2v-18c0-2.55 10.03-22.11 23.99-23.87Z" fill="#a56a43" /><path d="m55.67 48.46-6.34 2.97a6 6 0 0 1-7.98-2.88l-.25-.54-.76-1.6a4.956 4.956 0 0 0-4.68-2.87c-.22.01-.44.02-.66.02a16.019 16.019 0 0 1-8.28-29.66c-1.81-2.97-3.45-8.03 2.03-12.49a2.1 2.1 0 0 1 2.5 0c4.23 3.45 4.21 7.25 3.16 10.17a16 16 0 0 1 15.91 11.36l5.31 11.31 2.92 6.22a6.008 6.008 0 0 1-2.88 7.99Z" fill="#cb8252" /><circle cx="42" cy="26" r="3" fill="#2c2f38" /><circle cx="54" cy="43" r="1" fill="#805333" /><path d="m58.55 40.47-2.92-6.22-14.53 13.76.25.54a6 6 0 0 0 7.98 2.88l6.34-2.97a6.008 6.008 0 0 0 2.88-7.99Zm-4.55 3.53a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z" fill="#cf976a" /><circle cx="41" cy="25" r="1.25" fill="#ecf0f1" /></svg>';
    var HORN_MARKUP = '<path d="M44 19 L56 5 L49 22 Z" fill="#ffd700" />';
    var UNICORN_BASE_MARKUP = HORSE_SVG_MARKUP.replace('</svg>', HORN_MARKUP + '</svg>');
    var UNICORN_1_MARKUP = UNICORN_BASE_MARKUP.replace(/#805333/g, '#d63384').replace(/#a56a43/g, '#e83e8c').replace(/#cb8252/g, '#fd7e14').replace(/#cf976a/g, '#ffc0cb');
    var UNICORN_2_MARKUP = UNICORN_BASE_MARKUP.replace(/#805333/g, '#6f42c1').replace(/#a56a43/g, '#d63384').replace(/#cb8252/g, '#e83e8c').replace(/#cf976a/g, '#e0cffc');
    var UNICORN_3_MARKUP = UNICORN_BASE_MARKUP.replace(/#805333/g, '#0dcaf0').replace(/#a56a43/g, '#6f42c1').replace(/#cb8252/g, '#d63384').replace(/#cf976a/g, '#9ec5fe');
    var PINK_MODE_TOGGLE_SEQUENCE = [{
      className: 'icon-svg pink-mode-icon',
      markup: UNICORN_1_MARKUP,
      lottiePath: 'src/animations/horn.json'
    }, {
      className: 'icon-svg pink-mode-icon',
      markup: UNICORN_2_MARKUP,
      lottiePath: 'src/animations/unicorn.json'
    }, {
      className: 'icon-svg pink-mode-icon',
      markup: UNICORN_3_MARKUP,
      lottiePath: 'src/animations/rainbow.json'
    }];
    var fallbackIcons = Object.freeze({
      off: Object.freeze({
        className: 'icon-svg pink-mode-icon',
        markup: HORSE_SVG_MARKUP
      }),
      onSequence: Object.freeze(PINK_MODE_TOGGLE_SEQUENCE)
    });
    function ensureSafePromise(value) {
      if (typeof Promise !== 'undefined' && typeof Promise.resolve === 'function') {
        return Promise.resolve(value);
      }
      var promiseLike = {
        then: function then(callback) {
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
        catch: function _catch() {
          return promiseLike;
        }
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
    function ensurePinkModeLottieRuntime() {
      var GLOBAL_SCOPE = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : global;
      if (GLOBAL_SCOPE && GLOBAL_SCOPE.lottie) return ensureSafePromise(GLOBAL_SCOPE.lottie);
      if (GLOBAL_SCOPE && GLOBAL_SCOPE.bodymovin) return ensureSafePromise(GLOBAL_SCOPE.bodymovin);
      if (typeof document === 'undefined') return ensureSafePromise(null);
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
      return new Promise(function (resolve) {
        var script = document.createElement('script');
        script.src = 'src/vendor/lottie.min.js';
        script.async = true;
        script.setAttribute('data-loader', 'pink-mode-lottie');
        script.onload = function () {
          script.dataset.loaded = 'true';
          resolve(GLOBAL_SCOPE.lottie);
        };
        script.onerror = function () {
          resolve(null);
        };
        document.head.appendChild(script);
      });
    }
    return {
      pinkModeIcons: fallbackIcons,
      ensureSvgHasAriaHidden: trimMarkup,
      setPinkModeIconSequence: returnFalse,
      loadPinkModeIconsFromFiles: function loadPinkModeIconsFromFiles() {
        return ensureSafePromise(fallbackIcons);
      },
      ensurePinkModeLottieRuntime: ensurePinkModeLottieRuntime,
      resolvePinkModeLottieRuntime: function resolvePinkModeLottieRuntime() {
        return ensurePinkModeLottieRuntime();
      },
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
      PINK_MODE_ICON_FALLBACK_MARKUP: Object.freeze([])
    };
  }
  function resolvePinkModeSupportBridgeFactory(options) {
    var resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = ensureScope(options && options.runtimeScope);
    var coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    var factory = null;
    if (typeof resolveCoreSupportModule === 'function') {
      try {
        var tools = resolveCoreSupportModule('cineCoreAppPinkModeSupportBridge', './pink-mode.js');
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
        var requiredBridge = requireFn('./pink-mode.js');
        if (isObject(requiredBridge) && typeof requiredBridge.createPinkModeSupportBridge === 'function') {
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
    var fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);
    for (var index = 0; index < fallbackScopes.length; index += 1) {
      var scope = fallbackScopes[index];
      if (!isObject(scope)) {
        continue;
      }
      try {
        var candidate = scope.cineCoreAppPinkModeSupportBridge;
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
    var resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = ensureScope(options && options.runtimeScope);
    var coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    var factory = null;
    if (typeof resolveCoreSupportModule === 'function') {
      try {
        var tools = resolveCoreSupportModule('cineCoreAppPinkModeFallback', './pink-mode.js');
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
        var requiredFallback = requireFn('./pink-mode.js');
        if (isObject(requiredFallback) && typeof requiredFallback.createPinkModeFallbackApi === 'function') {
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
    var fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);
    for (var index = 0; index < fallbackScopes.length; index += 1) {
      var scope = fallbackScopes[index];
      if (!isObject(scope)) {
        continue;
      }
      try {
        var candidate = scope.cineCoreAppPinkModeFallback;
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
      var api = factory({
        resolveCoreSupportModule: options && options.resolveCoreSupportModule,
        requireFn: options && options.requireFn,
        runtimeScope: options && options.runtimeScope,
        coreGlobalScope: options && options.coreGlobalScope
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
      var api = factory({
        resolveCoreSupportModule: options && options.resolveCoreSupportModule,
        requireFn: options && options.requireFn,
        runtimeScope: options && options.runtimeScope,
        coreGlobalScope: options && options.coreGlobalScope
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
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = ensureScope(options && options.runtimeScope);
    var coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    var resolveCoreSupportModule = ensureResolveCoreSupportModule(options && options.resolveCoreSupportModule, requireFn, runtimeScope || coreGlobalScope);
    var bridgeApi = callCreateBridge(resolvePinkModeSupportBridgeFactory({
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope
    }), {
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope
    });
    if (isObject(bridgeApi)) {
      return bridgeApi;
    }
    var fallbackApi = callCreateFallback(resolvePinkModeFallbackFactory({
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope
    }), {
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope
    });
    if (isObject(fallbackApi)) {
      return fallbackApi;
    }
    return createInlinePinkModeFallbackApi();
  }
  var namespace = {
    createPinkModeSupportApi: createPinkModeSupportApi,
    createInlinePinkModeFallbackApi: createInlinePinkModeFallbackApi
  };
  var namespaceName = 'cineCoreAppPinkModeSupportLoader';
  var globalScope = detectScope();
  var existing = isObject(globalScope) && isObject(globalScope[namespaceName]) ? globalScope[namespaceName] : {};
  Object.assign(existing, namespace);
  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
(function () {
  function isObject(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
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
    var scope = ensureScope(runtimeScope);
    if (scope && typeof scope.resolveCoreSupportModule === 'function') {
      try {
        return scope.resolveCoreSupportModule.bind(scope);
      } catch (bindError) {
        void bindError;
      }
    }
    if (scope && scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS && typeof scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule === 'function') {
      try {
        return scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule.bind(scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS);
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
          var required = requireFn(requirePath);
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
  var PINK_MODE_SUPPORT_MODULE_ID = 'modules/core/pink-mode-support.js';
  function hasOwn(source, key) {
    if (!source) {
      return false;
    }
    return Object.prototype.hasOwnProperty.call(source, key);
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
  function createPinkModeFallback() {
    var HORSE_SVG_MARKUP = '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="m1 40c0-8 3-17 3-17a4.84 4.84 0 0 0-1.829-3.064 1 1 0 0 1 .45-1.716 19.438 19.438 0 0 1 4.379-.22c.579-2.317-1.19-3.963-2.782-4.938a1 1 0 0 1 .393-1.85 14.128 14.128 0 0 1 6.389.788c0-.958-1.147-2.145-2.342-3.122a1 1 0 0 1 .708-1.773 40.655 40.655 0 0 1 6.634.895 3.723 3.723 0 0 0-1.049-2.264 1 1 0 0 1 .823-1.652c6.151.378 9.226 1.916 9.226 1.916l10-1s8.472-2.311 15.954.5a1 1 0 0 1-.084 1.9c-1.455.394-2.87 1.143-2.87 2.6 0 0 4.426.738 5.675 4.114a1 1 0 0 1-1.228 1.317c-1.64-.48-4.273-.88-6.447.569Z" fill="#805333" /><path d="m30.18 42.82c1.073 2.7 2.6 9.993 3.357 13.8a2 2 0 0 1-1.964 2.38h-28.573a2 2 0 0 1-2-2v-18c0-2.55 10.03-22.11 23.99-23.87Z" fill="#a56a43" /><path d="m55.67 48.46-6.34 2.97a6 6 0 0 1-7.98-2.88l-.25-.54-.76-1.6a4.956 4.956 0 0 0-4.68-2.87c-.22.01-.44.02-.66.02a16.019 16.019 0 0 1-8.28-29.66c-1.81-2.97-3.45-8.03 2.03-12.49a2.1 2.1 0 0 1 2.5 0c4.23 3.45 4.21 7.25 3.16 10.17a16 16 0 0 1 15.91 11.36l5.31 11.31 2.92 6.22a6.008 6.008 0 0 1-2.88 7.99Z" fill="#cb8252" /><circle cx="42" cy="26" r="3" fill="#2c2f38" /><circle cx="54" cy="43" r="1" fill="#805333" /><path d="m58.55 40.47-2.92-6.22-14.53 13.76.25.54a6 6 0 0 0 7.98 2.88l6.34-2.97a6.008 6.008 0 0 0 2.88-7.99Zm-4.55 3.53a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z" fill="#cf976a" /><circle cx="41" cy="25" r="1.25" fill="#ecf0f1" /></svg>';
    var HORN_MARKUP = '<path d="M44 19 L56 5 L49 22 Z" fill="#ffd700" />';
    var UNICORN_BASE_MARKUP = HORSE_SVG_MARKUP.replace('</svg>', HORN_MARKUP + '</svg>');
    var UNICORN_1_MARKUP = UNICORN_BASE_MARKUP.replace(/#805333/g, '#d63384').replace(/#a56a43/g, '#e83e8c').replace(/#cb8252/g, '#fd7e14').replace(/#cf976a/g, '#ffc0cb');
    var UNICORN_2_MARKUP = UNICORN_BASE_MARKUP.replace(/#805333/g, '#6f42c1').replace(/#a56a43/g, '#d63384').replace(/#cb8252/g, '#e83e8c').replace(/#cf976a/g, '#e0cffc');
    var UNICORN_3_MARKUP = UNICORN_BASE_MARKUP.replace(/#805333/g, '#0dcaf0').replace(/#a56a43/g, '#6f42c1').replace(/#cb8252/g, '#d63384').replace(/#cf976a/g, '#9ec5fe');
    var PINK_MODE_TOGGLE_SEQUENCE = [{
      className: 'icon-svg pink-mode-icon',
      markup: UNICORN_1_MARKUP,
      lottiePath: 'src/animations/horn.json'
    }, {
      className: 'icon-svg pink-mode-icon',
      markup: UNICORN_2_MARKUP,
      lottiePath: 'src/animations/unicorn.json'
    }, {
      className: 'icon-svg pink-mode-icon',
      markup: UNICORN_3_MARKUP,
      lottiePath: 'src/animations/rainbow.json'
    }];
    var fallbackIcons = Object.freeze({
      off: Object.freeze({
        className: 'icon-svg pink-mode-icon',
        markup: HORSE_SVG_MARKUP
      }),
      onSequence: Object.freeze(PINK_MODE_TOGGLE_SEQUENCE)
    });
    var fallbackMarkup = Object.freeze([]);
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
    function ensurePinkModeLottieRuntime() {
      var GLOBAL_SCOPE = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : global;
      if (GLOBAL_SCOPE && GLOBAL_SCOPE.lottie) return createSafeResolvedPromise(GLOBAL_SCOPE.lottie);
      if (GLOBAL_SCOPE && GLOBAL_SCOPE.bodymovin) return createSafeResolvedPromise(GLOBAL_SCOPE.bodymovin);
      if (typeof document === 'undefined') return createSafeResolvedPromise(null);
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
      return new Promise(function (resolve) {
        var script = document.createElement('script');
        script.src = 'src/vendor/lottie.min.js';
        script.async = true;
        script.setAttribute('data-loader', 'pink-mode-lottie');
        script.onload = function () {
          script.dataset.loaded = 'true';
          resolve(GLOBAL_SCOPE.lottie);
        };
        script.onerror = function () {
          resolve(null);
        };
        document.head.appendChild(script);
      });
    }
    return {
      pinkModeIcons: fallbackIcons,
      ensureSvgHasAriaHidden: trimMarkup,
      setPinkModeIconSequence: returnFalse,
      loadPinkModeIconsFromFiles: function loadPinkModeIconsFromFiles() {
        return createSafeResolvedPromise();
      },
      ensurePinkModeLottieRuntime: ensurePinkModeLottieRuntime,
      resolvePinkModeLottieRuntime: function resolvePinkModeLottieRuntime() {
        return ensurePinkModeLottieRuntime();
      },
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
      PINK_MODE_ICON_FALLBACK_MARKUP: fallbackMarkup
    };
  }
  function collectSupportCandidates(primaryScope, secondaryScope) {
    var scopes = [];
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
  function extractPinkModeSupportModule(candidate) {
    if (!isObject(candidate)) {
      return null;
    }
    if (typeof candidate.resolvePinkModeSupport === 'function') {
      return candidate;
    }
    if (hasOwn(candidate, PINK_MODE_SUPPORT_MODULE_ID) && isObject(candidate[PINK_MODE_SUPPORT_MODULE_ID])) {
      return candidate[PINK_MODE_SUPPORT_MODULE_ID];
    }
    if (hasOwn(candidate, 'modules') && isObject(candidate.modules) && hasOwn(candidate.modules, PINK_MODE_SUPPORT_MODULE_ID) && isObject(candidate.modules[PINK_MODE_SUPPORT_MODULE_ID])) {
      return candidate.modules[PINK_MODE_SUPPORT_MODULE_ID];
    }
    return null;
  }
  function resolveSupportModule(options, fallbackSupport) {
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = ensureScope(options && options.runtimeScope);
    var coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    var resolveCoreSupportModule = ensureResolveCoreSupportModule(options && options.resolveCoreSupportModule, requireFn, runtimeScope || coreGlobalScope);
    var support = null;
    if (resolveCoreSupportModule) {
      try {
        support = extractPinkModeSupportModule(resolveCoreSupportModule('cineCorePinkModeSupport', './modules/core/pink-mode.js'));
      } catch (pinkModeSupportResolveError) {
        void pinkModeSupportResolveError;
        support = null;
      }
    }
    if (!isObject(support) && typeof requireFn === 'function') {
      try {
        var requiredSupport = extractPinkModeSupportModule(requireFn('./modules/core/pink-mode.js'));
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
    var fallbackScopes = collectSupportCandidates(runtimeScope, coreGlobalScope);
    for (var index = 0; index < fallbackScopes.length; index += 1) {
      var scope = fallbackScopes[index];
      try {
        var candidate = scope && scope.cineCorePinkModeSupport;
        if (isObject(candidate)) {
          return candidate;
        }
        if (scope && isObject(scope.cineCorePinkModeModules) && isObject(scope.cineCorePinkModeModules[PINK_MODE_SUPPORT_MODULE_ID])) {
          return scope.cineCorePinkModeModules[PINK_MODE_SUPPORT_MODULE_ID];
        }
      } catch (pinkModeSupportLookupError) {
        void pinkModeSupportLookupError;
      }
    }
    return {
      resolvePinkModeSupport: function resolvePinkModeSupport() {
        return fallbackSupport;
      },
      createFallbackSupport: function createFallbackSupport() {
        return fallbackSupport;
      }
    };
  }
  function createPinkModeRuntime(options) {
    var fallbackSupport = createPinkModeFallback();
    var supportModule = resolveSupportModule(options, fallbackSupport);
    var resolvedSupport = null;
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
    var activeSupport = isObject(resolvedSupport) ? resolvedSupport : fallbackSupport;
    function withFallback(candidate, fallback) {
      return typeof candidate === 'function' ? candidate : fallback;
    }
    return {
      pinkModeIcons: isObject(activeSupport.pinkModeIcons) ? activeSupport.pinkModeIcons : fallbackSupport.pinkModeIcons,
      ensureSvgHasAriaHidden: withFallback(activeSupport.ensureSvgHasAriaHidden, fallbackSupport.ensureSvgHasAriaHidden),
      setPinkModeIconSequence: withFallback(activeSupport.setPinkModeIconSequence, fallbackSupport.setPinkModeIconSequence),
      loadPinkModeIconsFromFiles: withFallback(activeSupport.loadPinkModeIconsFromFiles, fallbackSupport.loadPinkModeIconsFromFiles),
      ensurePinkModeLottieRuntime: withFallback(activeSupport.ensurePinkModeLottieRuntime, fallbackSupport.ensurePinkModeLottieRuntime),
      resolvePinkModeLottieRuntime: withFallback(activeSupport.resolvePinkModeLottieRuntime, fallbackSupport.resolvePinkModeLottieRuntime),
      startPinkModeAnimatedIcons: withFallback(activeSupport.startPinkModeAnimatedIcons, fallbackSupport.startPinkModeAnimatedIcons),
      stopPinkModeAnimatedIcons: withFallback(activeSupport.stopPinkModeAnimatedIcons, fallbackSupport.stopPinkModeAnimatedIcons),
      triggerPinkModeIconRain: withFallback(activeSupport.triggerPinkModeIconRain, fallbackSupport.triggerPinkModeIconRain),
      getPinkModeIconRotationTimer: withFallback(activeSupport.getPinkModeIconRotationTimer, fallbackSupport.getPinkModeIconRotationTimer),
      setPinkModeIconRotationTimer: withFallback(activeSupport.setPinkModeIconRotationTimer, fallbackSupport.setPinkModeIconRotationTimer),
      getPinkModeIconIndex: withFallback(activeSupport.getPinkModeIconIndex, fallbackSupport.getPinkModeIconIndex),
      setPinkModeIconIndex: withFallback(activeSupport.setPinkModeIconIndex, fallbackSupport.setPinkModeIconIndex),
      PINK_MODE_ICON_INTERVAL_MS: typeof activeSupport.PINK_MODE_ICON_INTERVAL_MS === 'number' ? activeSupport.PINK_MODE_ICON_INTERVAL_MS : fallbackSupport.PINK_MODE_ICON_INTERVAL_MS,
      PINK_MODE_ICON_ANIMATION_CLASS: typeof activeSupport.PINK_MODE_ICON_ANIMATION_CLASS === 'string' ? activeSupport.PINK_MODE_ICON_ANIMATION_CLASS : fallbackSupport.PINK_MODE_ICON_ANIMATION_CLASS,
      PINK_MODE_ICON_ANIMATION_RESET_DELAY: typeof activeSupport.PINK_MODE_ICON_ANIMATION_RESET_DELAY === 'number' ? activeSupport.PINK_MODE_ICON_ANIMATION_RESET_DELAY : fallbackSupport.PINK_MODE_ICON_ANIMATION_RESET_DELAY,
      PINK_MODE_ICON_FALLBACK_MARKUP: Array.isArray(activeSupport.PINK_MODE_ICON_FALLBACK_MARKUP) ? activeSupport.PINK_MODE_ICON_FALLBACK_MARKUP : fallbackSupport.PINK_MODE_ICON_FALLBACK_MARKUP
    };
  }
  var namespace = {
    createPinkModeRuntime: createPinkModeRuntime,
    createPinkModeFallback: createPinkModeFallback
  };
  var globalScope = detectScope();
  var namespaceName = 'cineCoreAppPinkModeRuntime';
  var existing = isObject(globalScope) && isObject(globalScope[namespaceName]) ? globalScope[namespaceName] : {};
  Object.assign(existing, namespace);
  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
(function () {
  function isObject(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
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
    var fallbackIcons = Object.freeze({
      off: Object.freeze({
        className: 'icon-svg pink-mode-icon',
        markup: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="m1 40c0-8 3-17 3-17a4.84 4.84 0 0 0-1.829-3.064 1 1 0 0 1 .45-1.716 19.438 19.438 0 0 1 4.379-.22c.579-2.317-1.19-3.963-2.782-4.938a1 1 0 0 1 .393-1.85 14.128 14.128 0 0 1 6.389.788c0-.958-1.147-2.145-2.342-3.122a1 1 0 0 1 .708-1.773 40.655 40.655 0 0 1 6.634.895 3.723 3.723 0 0 0-1.049-2.264 1 1 0 0 1 .823-1.652c6.151.378 9.226 1.916 9.226 1.916l10-1s8.472-2.311 15.954.5a1 1 0 0 1-.084 1.9c-1.455.394-2.87 1.143-2.87 2.6 0 0 4.426.738 5.675 4.114a1 1 0 0 1-1.228 1.317c-1.64-.48-4.273-.88-6.447.569Z" fill="#805333" /><path d="m30.18 42.82c1.073 2.7 2.6 9.993 3.357 13.8a2 2 0 0 1-1.964 2.38h-28.573a2 2 0 0 1-2-2v-18c0-2.55 10.03-22.11 23.99-23.87Z" fill="#a56a43" /><path d="m55.67 48.46-6.34 2.97a6 6 0 0 1-7.98-2.88l-.25-.54-.76-1.6a4.956 4.956 0 0 0-4.68-2.87c-.22.01-.44.02-.66.02a16.019 16.019 0 0 1-8.28-29.66c-1.81-2.97-3.45-8.03 2.03-12.49a2.1 2.1 0 0 1 2.5 0c4.23 3.45 4.21 7.25 3.16 10.17a16 16 0 0 1 15.91 11.36l5.31 11.31 2.92 6.22a6.008 6.008 0 0 1-2.88 7.99Z" fill="#cb8252" /><circle cx="42" cy="26" r="3" fill="#2c2f38" /><circle cx="54" cy="43" r="1" fill="#805333" /><path d="m58.55 40.47-2.92-6.22-14.53 13.76.25.54a6 6 0 0 0 7.98 2.88l6.34-2.97a6.008 6.008 0 0 0 2.88-7.99Zm-4.55 3.53a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z" fill="#cf976a" /><circle cx="41" cy="25" r="1.25" fill="#ecf0f1" /></svg>'
      }),
      onSequence: Object.freeze([])
    });
    return {
      pinkModeIcons: fallbackIcons,
      ensureSvgHasAriaHidden: trimMarkup,
      setPinkModeIconSequence: returnFalse,
      loadPinkModeIconsFromFiles: function loadPinkModeIconsFromFiles() {
        return createSafeResolvedPromise();
      },
      ensurePinkModeLottieRuntime: function ensurePinkModeLottieRuntime() {
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
      PINK_MODE_ICON_FALLBACK_MARKUP: Object.freeze([])
    };
  }
  var namespace = {
    createPinkModeFallbackApi: createPinkModeFallbackApi
  };
  var globalScope = detectScope();
  var namespaceName = 'cineCoreAppPinkModeFallback';
  var existing = isObject(globalScope) && isObject(globalScope[namespaceName]) ? globalScope[namespaceName] : {};
  Object.assign(existing, namespace);
  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
(function () {
  function isObject(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
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
    var scope = detectScope(runtimeScope);
    if (scope && typeof scope.resolveCoreSupportModule === 'function') {
      try {
        return scope.resolveCoreSupportModule.bind(scope);
      } catch (bindError) {
        void bindError;
      }
    }
    if (scope && scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS && typeof scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule === 'function') {
      try {
        return scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule.bind(scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS);
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
          var required = requireFn(requirePath);
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
    var scopes = [];
    if (isObject(primaryScope) && scopes.indexOf(primaryScope) === -1) {
      scopes.push(primaryScope);
    }
    if (isObject(secondaryScope) && scopes.indexOf(secondaryScope) === -1) {
      scopes.push(secondaryScope);
    }
    var additionalScopes = [typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
    for (var index = 0; index < additionalScopes.length; index += 1) {
      var scope = additionalScopes[index];
      if (isObject(scope) && scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }
    return scopes;
  }
  function resolvePinkModeRuntimeFactory(options) {
    var resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    var requireFn = options && options.requireFn;
    var runtimeScope = options && options.runtimeScope;
    var coreGlobalScope = options && options.coreGlobalScope;
    var factory = null;
    if (typeof resolveCoreSupportModule === 'function') {
      try {
        var tools = resolveCoreSupportModule('cineCoreAppPinkModeRuntime', './pink-mode.js');
        if (isObject(tools) && typeof tools.createPinkModeRuntime === 'function') {
          factory = tools.createPinkModeRuntime;
        }
      } catch (pinkModeRuntimeResolveError) {
        void pinkModeRuntimeResolveError;
      }
    }
    if (typeof factory !== 'function' && typeof requireFn === 'function') {
      try {
        var requiredPinkModeRuntime = requireFn('./pink-mode.js');
        if (isObject(requiredPinkModeRuntime) && typeof requiredPinkModeRuntime.createPinkModeRuntime === 'function') {
          factory = requiredPinkModeRuntime.createPinkModeRuntime;
        }
      } catch (pinkModeRuntimeRequireError) {
        void pinkModeRuntimeRequireError;
      }
    }
    if (typeof factory === 'function') {
      return factory;
    }
    var fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);
    for (var index = 0; index < fallbackScopes.length; index += 1) {
      var scope = fallbackScopes[index];
      if (!isObject(scope)) {
        continue;
      }
      try {
        var candidate = scope.cineCoreAppPinkModeRuntime;
        if (isObject(candidate) && typeof candidate.createPinkModeRuntime === 'function') {
          return candidate.createPinkModeRuntime;
        }
        if (typeof candidate === 'function') {
          return candidate;
        }
      } catch (pinkModeRuntimeLookupError) {
        void pinkModeRuntimeLookupError;
      }
    }
    return null;
  }
  function resolvePinkModeFallbackFactory(options) {
    var resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    var requireFn = options && options.requireFn;
    var runtimeScope = options && options.runtimeScope;
    var coreGlobalScope = options && options.coreGlobalScope;
    var factory = null;
    if (typeof resolveCoreSupportModule === 'function') {
      try {
        var tools = resolveCoreSupportModule('cineCoreAppPinkModeFallback', './pink-mode.js');
        if (isObject(tools) && typeof tools.createPinkModeFallbackApi === 'function') {
          factory = tools.createPinkModeFallbackApi;
        }
      } catch (pinkModeFallbackResolveError) {
        void pinkModeFallbackResolveError;
      }
    }
    if (typeof factory !== 'function' && typeof requireFn === 'function') {
      try {
        var requiredPinkModeFallback = requireFn('./pink-mode.js');
        if (isObject(requiredPinkModeFallback) && typeof requiredPinkModeFallback.createPinkModeFallbackApi === 'function') {
          factory = requiredPinkModeFallback.createPinkModeFallbackApi;
        }
      } catch (pinkModeFallbackRequireError) {
        void pinkModeFallbackRequireError;
      }
    }
    if (typeof factory === 'function') {
      return factory;
    }
    var fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);
    for (var index = 0; index < fallbackScopes.length; index += 1) {
      var scope = fallbackScopes[index];
      if (!isObject(scope)) {
        continue;
      }
      try {
        var candidate = scope.cineCoreAppPinkModeFallback;
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
  function createLastResortPinkModeFallbackApi() {
    var fallbackIcons = Object.freeze({
      off: Object.freeze({
        className: 'icon-svg pink-mode-icon',
        markup: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="m1 40c0-8 3-17 3-17a4.84 4.84 0 0 0-1.829-3.064 1 1 0 0 1 .45-1.716 19.438 19.438 0 0 1 4.379-.22c.579-2.317-1.19-3.963-2.782-4.938a1 1 0 0 1 .393-1.85 14.128 14.128 0 0 1 6.389.788c0-.958-1.147-2.145-2.342-3.122a1 1 0 0 1 .708-1.773 40.655 40.655 0 0 1 6.634.895 3.723 3.723 0 0 0-1.049-2.264 1 1 0 0 1 .823-1.652c6.151.378 9.226 1.916 9.226 1.916l10-1s8.472-2.311 15.954.5a1 1 0 0 1-.084 1.9c-1.455.394-2.87 1.143-2.87 2.6 0 0 4.426.738 5.675 4.114a1 1 0 0 1-1.228 1.317c-1.64-.48-4.273-.88-6.447.569Z" fill="#805333" /><path d="m30.18 42.82c1.073 2.7 2.6 9.993 3.357 13.8a2 2 0 0 1-1.964 2.38h-28.573a2 2 0 0 1-2-2v-18c0-2.55 10.03-22.11 23.99-23.87Z" fill="#a56a43" /><path d="m55.67 48.46-6.34 2.97a6 6 0 0 1-7.98-2.88l-.25-.54-.76-1.6a4.956 4.956 0 0 0-4.68-2.87c-.22.01-.44.02-.66.02a16.019 16.019 0 0 1-8.28-29.66c-1.81-2.97-3.45-8.03 2.03-12.49a2.1 2.1 0 0 1 2.5 0c4.23 3.45 4.21 7.25 3.16 10.17a16 16 0 0 1 15.91 11.36l5.31 11.31 2.92 6.22a6.008 6.008 0 0 1-2.88 7.99Z" fill="#cb8252" /><circle cx="42" cy="26" r="3" fill="#2c2f38" /><circle cx="54" cy="43" r="1" fill="#805333" /><path d="m58.55 40.47-2.92-6.22-14.53 13.76.25.54a6 6 0 0 0 7.98 2.88l6.34-2.97a6.008 6.008 0 0 0 2.88-7.99Zm-4.55 3.53a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z" fill="#cf976a" /><circle cx="41" cy="25" r="1.25" fill="#ecf0f1" /></svg>'
      }),
      onSequence: Object.freeze([])
    });
    function ensureSafePromise(value) {
      if (typeof Promise !== 'undefined' && typeof Promise.resolve === 'function') {
        return Promise.resolve(value);
      }
      var promiseLike = {
        then: function then(callback) {
          if (typeof callback === 'function') {
            try {
              return ensureSafePromise(callback(value));
            } catch (callbackError) {
              void callbackError;
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
    function trimMarkup(markup) {
      return typeof markup === 'string' ? markup.trim() : '';
    }
    function noop() {}
    return {
      pinkModeIcons: fallbackIcons,
      ensureSvgHasAriaHidden: trimMarkup,
      setPinkModeIconSequence: function setPinkModeIconSequence() {
        return false;
      },
      loadPinkModeIconsFromFiles: function loadPinkModeIconsFromFiles() {
        return ensureSafePromise();
      },
      ensurePinkModeLottieRuntime: function ensurePinkModeLottieRuntime() {
        return ensureSafePromise(null);
      },
      resolvePinkModeLottieRuntime: function resolvePinkModeLottieRuntime() {
        return null;
      },
      startPinkModeAnimatedIcons: noop,
      stopPinkModeAnimatedIcons: noop,
      triggerPinkModeIconRain: noop,
      getPinkModeIconRotationTimer: function getPinkModeIconRotationTimer() {
        return null;
      },
      setPinkModeIconRotationTimer: noop,
      getPinkModeIconIndex: function getPinkModeIconIndex() {
        return 0;
      },
      setPinkModeIconIndex: noop,
      PINK_MODE_ICON_INTERVAL_MS: 30000,
      PINK_MODE_ICON_ANIMATION_CLASS: 'pink-mode-icon-pop',
      PINK_MODE_ICON_ANIMATION_RESET_DELAY: 450,
      PINK_MODE_ICON_FALLBACK_MARKUP: Object.freeze([])
    };
  }
  function callCreatePinkModeRuntime(factory, options) {
    if (typeof factory === 'function') {
      try {
        var api = factory({
          resolveCoreSupportModule: options && options.resolveCoreSupportModule,
          requireFn: options && options.requireFn,
          runtimeScope: options && options.runtimeScope,
          coreGlobalScope: options && options.coreGlobalScope
        });
        if (isObject(api)) {
          return api;
        }
      } catch (pinkModeRuntimeFactoryError) {
        void pinkModeRuntimeFactoryError;
      }
    }
    return null;
  }
  function callCreatePinkModeFallback(factory) {
    if (typeof factory === 'function') {
      try {
        var api = factory();
        if (isObject(api)) {
          return api;
        }
      } catch (pinkModeFallbackFactoryError) {
        void pinkModeFallbackFactoryError;
      }
    }
    return null;
  }
  function createPinkModeSupportBridge(options) {
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = ensureScope(options && options.runtimeScope);
    var coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    var resolveCoreSupportModule = ensureResolveCoreSupportModule(options && options.resolveCoreSupportModule, requireFn, runtimeScope || coreGlobalScope);
    var runtimeFactory = resolvePinkModeRuntimeFactory({
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope
    });
    var runtimeApi = callCreatePinkModeRuntime(runtimeFactory, {
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope
    });
    if (isObject(runtimeApi)) {
      return runtimeApi;
    }
    var fallbackFactory = resolvePinkModeFallbackFactory({
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope
    });
    var fallbackApi = callCreatePinkModeFallback(fallbackFactory);
    if (isObject(fallbackApi)) {
      return fallbackApi;
    }
    return createLastResortPinkModeFallbackApi();
  }
  var namespace = {
    createPinkModeSupportBridge: createPinkModeSupportBridge
  };
  var namespaceName = 'cineCoreAppPinkModeSupportBridge';
  var globalScope = detectScope();
  var existing = isObject(globalScope) && isObject(globalScope[namespaceName]) ? globalScope[namespaceName] : {};
  for (var _i = 0, _Object$keys = Object.keys(namespace); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    existing[key] = namespace[key];
  }
  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();