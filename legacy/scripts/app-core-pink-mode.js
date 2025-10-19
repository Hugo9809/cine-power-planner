function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var PINK_MODE_SUPPORT_LOADER_TOOLS = resolveCoreSupportModule('cineCoreAppPinkModeSupportLoader', './modules/app-core/pink-mode.js');
var PINK_MODE_SUPPORT_API_TOOLS = resolveCoreSupportModule('cineCoreAppPinkModeSupportApi', './modules/app-core/pink-mode.js');
var PINK_MODE_SUPPORT_RESOLVER_TOOLS = resolveCoreSupportModule('cineCoreAppPinkModeSupportResolver', './modules/app-core/pink-mode.js');
var PINK_MODE_SUPPORT_API = function resolvePinkModeSupportApi() {
  var requireFn = typeof require === 'function' ? require : null;
  function createInlinePinkModeLastResortApi() {
    if (PINK_MODE_SUPPORT_RESOLVER_TOOLS && typeof PINK_MODE_SUPPORT_RESOLVER_TOOLS.createPinkModeSupportLastResortApi === 'function') {
      try {
        var _api = PINK_MODE_SUPPORT_RESOLVER_TOOLS.createPinkModeSupportLastResortApi();
        if (_api && _typeof(_api) === 'object') {
          return _api;
        }
      } catch (pinkModeLastResortError) {
        void pinkModeLastResortError;
      }
    }
    if (typeof requireFn === 'function') {
      try {
        var requiredResolverTools = requireFn('./modules/app-core/pink-mode.js');
        if (requiredResolverTools && typeof requiredResolverTools.createPinkModeSupportLastResortApi === 'function') {
          var _api2 = requiredResolverTools.createPinkModeSupportLastResortApi();
          if (_api2 && _typeof(_api2) === 'object') {
            return _api2;
          }
        }
      } catch (pinkModeSupportInlineFallbackError) {
        void pinkModeSupportInlineFallbackError;
      }
    }
    var fallbackIcons = Object.freeze({
      off: Object.freeze({
        className: 'icon-svg pink-mode-icon',
        markup: ''
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
    return Object.freeze({
      pinkModeIcons: fallbackIcons,
      ensureSvgHasAriaHidden: noop,
      setPinkModeIconSequence: noop,
      loadPinkModeIconsFromFiles: function loadPinkModeIconsFromFiles() {
        return ensureSafePromise(fallbackIcons);
      },
      ensurePinkModeLottieRuntime: function ensurePinkModeLottieRuntime() {
        return ensureSafePromise(null);
      },
      resolvePinkModeLottieRuntime: function resolvePinkModeLottieRuntime() {
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
      PINK_MODE_ICON_FALLBACK_MARKUP: ''
    });
  }
  var resolverOptions = {
    loaderTools: PINK_MODE_SUPPORT_LOADER_TOOLS,
    apiTools: PINK_MODE_SUPPORT_API_TOOLS,
    resolveCoreSupportModule: resolveCoreSupportModule,
    requireFn: requireFn,
    runtimeScope: typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' ? CORE_PART1_RUNTIME_SCOPE : null,
    coreGlobalScope: typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null,
    fallbackScopes: [typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' ? CORE_PART1_RUNTIME_SCOPE : null, typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null],
    loaderPath: './modules/app-core/pink-mode.js',
    apiRequirePath: './modules/app-core/pink-mode.js',
    lastResortFactory: createInlinePinkModeLastResortApi
  };
  function attemptResolve(candidate) {
    if (!candidate || _typeof(candidate) !== 'object') {
      return null;
    }
    var resolver = typeof candidate.resolvePinkModeSupportApi === 'function' ? candidate.resolvePinkModeSupportApi : null;
    if (!resolver) {
      return null;
    }
    try {
      var _api3 = resolver(resolverOptions);
      return _api3 && _typeof(_api3) === 'object' ? _api3 : null;
    } catch (pinkModeSupportResolverError) {
      void pinkModeSupportResolverError;
    }
    return null;
  }
  var api = attemptResolve(PINK_MODE_SUPPORT_RESOLVER_TOOLS);
  if (!api && typeof requireFn === 'function') {
    try {
      var requiredResolverTools = requireFn('./modules/app-core/pink-mode.js');
      api = attemptResolve(requiredResolverTools);
    } catch (pinkModeSupportResolverRequireError) {
      void pinkModeSupportResolverRequireError;
    }
  }
  if (!api) {
    var fallbackScopes = [typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' ? CORE_PART1_RUNTIME_SCOPE : null, typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null, typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
    for (var index = 0; index < fallbackScopes.length; index += 1) {
      var scope = fallbackScopes[index];
      if (!scope || _typeof(scope) !== 'object') {
        continue;
      }
      try {
        var candidate = scope.cineCoreAppPinkModeSupportResolver;
        api = attemptResolve(candidate);
      } catch (pinkModeSupportResolverLookupError) {
        void pinkModeSupportResolverLookupError;
      }
      if (api) {
        break;
      }
    }
  }
  if (!api || _typeof(api) !== 'object') {
    api = createInlinePinkModeLastResortApi();
  }
  return api;
}();