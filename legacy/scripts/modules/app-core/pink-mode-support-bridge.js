/*
 * Legacy bundle mirror for the pink mode support bridge. Matches the modern
 * implementation but keeps to ES5 syntax so older browsers stay supported.
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

    var scope = detectScope(runtimeScope);

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

    var additionalScopes = [
      typeof globalThis !== 'undefined' ? globalThis : null,
      typeof window !== 'undefined' ? window : null,
      typeof self !== 'undefined' ? self : null,
      typeof global !== 'undefined' ? global : null,
    ];

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
        var tools = resolveCoreSupportModule(
          'cineCoreAppPinkModeRuntime',
          './pink-mode-runtime.js'
        );
        if (isObject(tools) && typeof tools.createPinkModeRuntime === 'function') {
          factory = tools.createPinkModeRuntime;
        }
      } catch (pinkModeRuntimeResolveError) {
        void pinkModeRuntimeResolveError;
      }
    }

    if (typeof factory !== 'function' && typeof requireFn === 'function') {
      try {
        var requiredPinkModeRuntime = requireFn('./pink-mode-runtime.js');
        if (
          isObject(requiredPinkModeRuntime) &&
          typeof requiredPinkModeRuntime.createPinkModeRuntime === 'function'
        ) {
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
        if (
          isObject(candidate) &&
          typeof candidate.createPinkModeRuntime === 'function'
        ) {
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
        var tools = resolveCoreSupportModule(
          'cineCoreAppPinkModeFallback',
          './pink-mode-fallback.js'
        );
        if (isObject(tools) && typeof tools.createPinkModeFallbackApi === 'function') {
          factory = tools.createPinkModeFallbackApi;
        }
      } catch (pinkModeFallbackResolveError) {
        void pinkModeFallbackResolveError;
      }
    }

    if (typeof factory !== 'function' && typeof requireFn === 'function') {
      try {
        var requiredPinkModeFallback = requireFn('./pink-mode-fallback.js');
        if (
          isObject(requiredPinkModeFallback) &&
          typeof requiredPinkModeFallback.createPinkModeFallbackApi === 'function'
        ) {
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
        if (
          isObject(candidate) &&
          typeof candidate.createPinkModeFallbackApi === 'function'
        ) {
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
      off: Object.freeze({ className: 'icon-svg pink-mode-icon', markup: '' }),
      onSequence: Object.freeze([]),
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
        },
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
      PINK_MODE_ICON_FALLBACK_MARKUP: Object.freeze([]),
    };
  }

  function callCreatePinkModeRuntime(factory, options) {
    if (typeof factory === 'function') {
      try {
        var api = factory({
          resolveCoreSupportModule: options && options.resolveCoreSupportModule,
          requireFn: options && options.requireFn,
          runtimeScope: options && options.runtimeScope,
          coreGlobalScope: options && options.coreGlobalScope,
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
    var resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );

    var runtimeFactory = resolvePinkModeRuntimeFactory({
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
    });

    var runtimeApi = callCreatePinkModeRuntime(runtimeFactory, {
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
    });

    if (isObject(runtimeApi)) {
      return runtimeApi;
    }

    var fallbackFactory = resolvePinkModeFallbackFactory({
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
    });

    var fallbackApi = callCreatePinkModeFallback(fallbackFactory);
    if (isObject(fallbackApi)) {
      return fallbackApi;
    }

    return createLastResortPinkModeFallbackApi();
  }

  var namespace = {
    createPinkModeSupportBridge: createPinkModeSupportBridge,
  };

  var namespaceName = 'cineCoreAppPinkModeSupportBridge';
  var globalScope = detectScope();
  var existing =
    isObject(globalScope) && isObject(globalScope[namespaceName])
      ? globalScope[namespaceName]
      : {};

  Object.keys(namespace).forEach(function (key) {
    existing[key] = namespace[key];
  });

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
