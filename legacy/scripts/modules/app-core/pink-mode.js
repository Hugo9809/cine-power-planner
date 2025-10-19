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
    return {
      pinkModeIcons: fallbackIcons,
      ensureSvgHasAriaHidden: trimMarkup,
      setPinkModeIconSequence: returnFalse,
      loadPinkModeIconsFromFiles: function loadPinkModeIconsFromFiles() {
        return ensureSafePromise();
      },
      ensurePinkModeLottieRuntime: function ensurePinkModeLottieRuntime() {
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
    var fallbackIcons = Object.freeze({
      off: Object.freeze({
        className: 'icon-svg pink-mode-icon',
        markup: ''
      }),
      onSequence: Object.freeze([])
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
        markup: ''
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