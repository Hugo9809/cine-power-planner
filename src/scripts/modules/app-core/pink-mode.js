/*
 * Bundles the modern app core pink mode helpers into a single module.
 *
 * Keeping the animations, runtime API, resolver and fallbacks together prevents
 * regressions while we continue slicing the rest of the app core into
 * maintainable sections. The logic remains untouched; we simply sequence the
 * previous files so the UI polish and accessibility safeguards keep working
 * across offline sessions and restores.
 */
/*
 * Moves the pink mode support orchestration into a standalone helper so the
 * main app core bundle stays lean. The helper keeps the resilient fallback
 * paths that guarantee offline usability and preserve saved user data.
 */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
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
    const scopes = [];
    const seen = typeof Set === 'function' ? new Set() : null;

    appendUniqueScope(scopes, options && options.runtimeScope, seen);
    appendUniqueScope(scopes, options && options.coreGlobalScope, seen);

    if (Array.isArray(options && options.fallbackScopes)) {
      for (let index = 0; index < options.fallbackScopes.length; index += 1) {
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
    const requireFn = context.requireFn;
    const loaderPath = context.loaderPath;
    const fallbackScopes = context.fallbackScopes;
    const candidates = [];
    const seen = typeof Set === 'function' ? new Set() : null;

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

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];

      if (!isObject(scope)) {
        continue;
      }

      try {
        addCandidate(scope.cineCoreAppPinkModeSupportLoader);
      } catch (pinkModeLoaderLookupError) {
        void pinkModeLoaderLookupError;
      }
    }

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];

      if (!isObject(candidate)) {
        continue;
      }

      const method = candidate[methodName];

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
    const fallbackIcons = Object.freeze({
      off: Object.freeze({ className: 'icon-svg pink-mode-icon', markup: '' }),
      onSequence: Object.freeze([]),
    });

    function ensureSafePromise(value) {
      if (typeof Promise !== 'undefined' && typeof Promise.resolve === 'function') {
        return Promise.resolve(value);
      }

      const promiseLike = {
        then(callback) {
          if (typeof callback === 'function') {
            try {
              return ensureSafePromise(callback(value));
            } catch (callbackError) {
              void callbackError;
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

    function noop() {}

    function trimMarkup(markup) {
      return typeof markup === 'string' ? markup.trim() : '';
    }

    return {
      pinkModeIcons: fallbackIcons,
      ensureSvgHasAriaHidden: trimMarkup,
      setPinkModeIconSequence() {
        return false;
      },
      loadPinkModeIconsFromFiles() {
        return ensureSafePromise();
      },
      ensurePinkModeLottieRuntime() {
        return ensureSafePromise(null);
      },
      resolvePinkModeLottieRuntime() {
        return null;
      },
      startPinkModeAnimatedIcons: noop,
      stopPinkModeAnimatedIcons: noop,
      triggerPinkModeIconRain: noop,
      getPinkModeIconRotationTimer() {
        return null;
      },
      setPinkModeIconRotationTimer: noop,
      getPinkModeIconIndex() {
        return 0;
      },
      setPinkModeIconIndex: noop,
      PINK_MODE_ICON_INTERVAL_MS: 30000,
      PINK_MODE_ICON_ANIMATION_CLASS: 'pink-mode-icon-pop',
      PINK_MODE_ICON_ANIMATION_RESET_DELAY: 450,
      PINK_MODE_ICON_FALLBACK_MARKUP: Object.freeze([]),
    };
  }

  function resolvePinkModeSupportApi(options) {
    const requireFn = ensureRequireFn(options && options.requireFn);
    const loaderPath =
      options && typeof options.loaderPath === 'string' && options.loaderPath
        ? options.loaderPath
        : './modules/app-core/pink-mode.js';

    const fallbackScopes = collectFallbackScopes(options);
    const loaderTools = options && options.loaderTools;

    const loaderFactory = findLoaderFactory('createPinkModeSupportApi', {
      loaderTools,
      requireFn,
      loaderPath,
      fallbackScopes,
    });

    const fallbackFactory = findLoaderFactory('createInlinePinkModeFallbackApi', {
      loaderTools,
      requireFn,
      loaderPath,
      fallbackScopes,
    });

    const lastResortFactory = ensureFunction(
      options && options.lastResortFactory,
      createDefaultLastResortApi
    );

    const runtimeScope = detectScope(options && options.runtimeScope);
    const coreGlobalScope = detectScope(options && options.coreGlobalScope);

    const factoryOptions = {
      resolveCoreSupportModule:
        options && typeof options.resolveCoreSupportModule === 'function'
          ? options.resolveCoreSupportModule
          : null,
      requireFn,
      runtimeScope,
      coreGlobalScope,
    };

    let api = null;

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

  const namespace = {
    resolvePinkModeSupportApi,
    createPinkModeSupportLastResortApi: createDefaultLastResortApi,
  };

  const namespaceName = 'cineCoreAppPinkModeSupportApi';
  const scope = detectScope();
  const existing = isObject(scope) && isObject(scope[namespaceName]) ? scope[namespaceName] : {};

  Object.assign(existing, namespace);

  if (isObject(scope)) {
    try {
      scope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
/*
 * Moves the pink mode support resolver into a dedicated module. The extraction
 * keeps the comprehensive fallback chain intact so animated icons, offline
 * assets and accessibility helpers continue to behave exactly as before while
 * the main runtime file shrinks.
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

  function registerScope(scopes, scope) {
    if (!isObject(scope)) {
      return;
    }

    if (scopes.indexOf(scope) === -1) {
      scopes.push(scope);
    }
  }

  function ensureFallbackScopes(candidateScopes, runtimeScope, coreGlobalScope) {
    const scopes = Array.isArray(candidateScopes) ? candidateScopes.slice() : [];
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

  function createPinkModeSupportLastResortApi() {
    const fallbackIcons = Object.freeze({
      off: Object.freeze({ className: 'icon-svg pink-mode-icon', markup: '' }),
      onSequence: Object.freeze([]),
    });

    function ensureSafePromise(value) {
      if (typeof Promise !== 'undefined' && typeof Promise.resolve === 'function') {
        return Promise.resolve(value);
      }

      const promiseLike = {
        then(callback) {
          if (typeof callback === 'function') {
            try {
              return ensureSafePromise(callback(value));
            } catch (callbackError) {
              void callbackError;
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

    function noop() {}

    return Object.freeze({
      pinkModeIcons: fallbackIcons,
      ensureSvgHasAriaHidden: noop,
      setPinkModeIconSequence: noop,
      loadPinkModeIconsFromFiles() {
        return ensureSafePromise(fallbackIcons);
      },
      ensurePinkModeLottieRuntime() {
        return ensureSafePromise(null);
      },
      resolvePinkModeLottieRuntime() {
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
      PINK_MODE_ICON_FALLBACK_MARKUP: '',
    });
  }

  function attemptResolvePinkModeSupport(candidate, resolverOptions) {
    if (!isObject(candidate)) {
      return null;
    }

    const resolver =
      typeof candidate.resolvePinkModeSupportApi === 'function'
        ? candidate.resolvePinkModeSupportApi
        : null;

    if (!resolver) {
      return null;
    }

    try {
      const api = resolver(resolverOptions);
      return isObject(api) ? api : null;
    } catch (pinkModeSupportApiError) {
      void pinkModeSupportApiError;
    }

    return null;
  }

  function resolvePinkModeSupportApi(options) {
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    const resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );
    const fallbackScopes = ensureFallbackScopes(
      options && options.fallbackScopes,
      runtimeScope,
      coreGlobalScope
    );

    const resolverOptions = {
      loaderTools: options && options.loaderTools,
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
      fallbackScopes,
      loaderPath: options && options.loaderPath,
      lastResortFactory: options && options.lastResortFactory,
    };

    let api = attemptResolvePinkModeSupport(options && options.apiTools, resolverOptions);

    if (!api && typeof requireFn === 'function') {
      try {
        const requiredApiTools = requireFn(
          options && options.apiRequirePath
            ? options.apiRequirePath
            : './modules/app-core/pink-mode.js'
        );
        api = attemptResolvePinkModeSupport(requiredApiTools, resolverOptions);
      } catch (pinkModeSupportApiRequireError) {
        void pinkModeSupportApiRequireError;
      }
    }

    if (!api) {
      for (let index = 0; index < fallbackScopes.length; index += 1) {
        const scope = fallbackScopes[index];

        try {
          const candidate = scope && scope.cineCoreAppPinkModeSupportApi;
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
      const factory =
        typeof resolverOptions.lastResortFactory === 'function'
          ? resolverOptions.lastResortFactory
          : createPinkModeSupportLastResortApi;
      api = factory();
    }

    return api;
  }

  const namespace = {
    resolvePinkModeSupportApi,
    createPinkModeSupportLastResortApi,
  };

  const globalScope = detectScope();
  const namespaceName = 'cineCoreAppPinkModeSupportResolver';
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
/*
 * Provides a loader that resolves the pink mode support API for the modern app
 * core. The logic previously lived inline inside the main runtime bundle. By
 * moving it into a shared helper we keep behaviour identical while continuing
 * the long-running refactor that splits the monolithic file into maintainable
 * modules. The loader keeps the extensive fallback chain that guarantees offline
 * usage, saving, autosaving, and restore routines keep their icon resources
 * without data loss.
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

    const scope = detectScope(runtimeScope);

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
      typeof scope.CORE_RUNTIME_SUPPORT_BOOTSTRAP_TOOLS.resolveCoreSupportModule ===
        'function'
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

  function collectCandidateScopes(primaryScope, secondaryScope) {
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

  function createInlinePinkModeFallbackApi() {
    const fallbackIcons = Object.freeze({
      off: Object.freeze({ className: 'icon-svg pink-mode-icon', markup: '' }),
      onSequence: Object.freeze([]),
    });

    function ensureSafePromise(value) {
      if (typeof Promise !== 'undefined' && typeof Promise.resolve === 'function') {
        return Promise.resolve(value);
      }

      const promiseLike = {
        then(callback) {
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

    return {
      pinkModeIcons: fallbackIcons,
      ensureSvgHasAriaHidden: trimMarkup,
      setPinkModeIconSequence: returnFalse,
      loadPinkModeIconsFromFiles() {
        return ensureSafePromise();
      },
      ensurePinkModeLottieRuntime() {
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
      PINK_MODE_ICON_FALLBACK_MARKUP: Object.freeze([]),
    };
  }

  function resolvePinkModeSupportBridgeFactory(options) {
    const resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);

    let factory = null;

    if (typeof resolveCoreSupportModule === 'function') {
      try {
        const tools = resolveCoreSupportModule(
          'cineCoreAppPinkModeSupportBridge',
          './pink-mode.js'
        );
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
        const requiredBridge = requireFn('./pink-mode.js');
        if (
          isObject(requiredBridge) &&
          typeof requiredBridge.createPinkModeSupportBridge === 'function'
        ) {
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

    const fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];
      if (!isObject(scope)) {
        continue;
      }

      try {
        const candidate = scope.cineCoreAppPinkModeSupportBridge;
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
    const resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);

    let factory = null;

    if (typeof resolveCoreSupportModule === 'function') {
      try {
        const tools = resolveCoreSupportModule(
          'cineCoreAppPinkModeFallback',
          './pink-mode.js'
        );
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
        const requiredFallback = requireFn('./pink-mode.js');
        if (
          isObject(requiredFallback) &&
          typeof requiredFallback.createPinkModeFallbackApi === 'function'
        ) {
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

    const fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];
      if (!isObject(scope)) {
        continue;
      }

      try {
        const candidate = scope.cineCoreAppPinkModeFallback;
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
      const api = factory({
        resolveCoreSupportModule: options && options.resolveCoreSupportModule,
        requireFn: options && options.requireFn,
        runtimeScope: options && options.runtimeScope,
        coreGlobalScope: options && options.coreGlobalScope,
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
      const api = factory({
        resolveCoreSupportModule: options && options.resolveCoreSupportModule,
        requireFn: options && options.requireFn,
        runtimeScope: options && options.runtimeScope,
        coreGlobalScope: options && options.coreGlobalScope,
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
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    const resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );

    const bridgeApi = callCreateBridge(
      resolvePinkModeSupportBridgeFactory({
        resolveCoreSupportModule,
        requireFn,
        runtimeScope,
        coreGlobalScope,
      }),
      {
        resolveCoreSupportModule,
        requireFn,
        runtimeScope,
        coreGlobalScope,
      }
    );

    if (isObject(bridgeApi)) {
      return bridgeApi;
    }

    const fallbackApi = callCreateFallback(
      resolvePinkModeFallbackFactory({
        resolveCoreSupportModule,
        requireFn,
        runtimeScope,
        coreGlobalScope,
      }),
      {
        resolveCoreSupportModule,
        requireFn,
        runtimeScope,
        coreGlobalScope,
      }
    );

    if (isObject(fallbackApi)) {
      return fallbackApi;
    }

    return createInlinePinkModeFallbackApi();
  }

  const namespace = {
    createPinkModeSupportApi,
    createInlinePinkModeFallbackApi,
  };

  const namespaceName = 'cineCoreAppPinkModeSupportLoader';
  const globalScope = detectScope();
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
/*
 * Provides a bridge that resolves the pink mode runtime helpers while keeping
 * the legacy inline fallback available. Extracting this orchestration from the
 * main app core bundle keeps the refactor moving without altering behaviour.
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

    const scope = detectScope(runtimeScope);

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

  function collectCandidateScopes(primaryScope, secondaryScope) {
    const scopes = [];

    if (isObject(primaryScope) && scopes.indexOf(primaryScope) === -1) {
      scopes.push(primaryScope);
    }

    if (isObject(secondaryScope) && scopes.indexOf(secondaryScope) === -1) {
      scopes.push(secondaryScope);
    }

    const additionalScopes = [
      typeof globalThis !== 'undefined' ? globalThis : null,
      typeof window !== 'undefined' ? window : null,
      typeof self !== 'undefined' ? self : null,
      typeof global !== 'undefined' ? global : null,
    ];

    for (let index = 0; index < additionalScopes.length; index += 1) {
      const scope = additionalScopes[index];
      if (isObject(scope) && scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }

    return scopes;
  }

  function resolvePinkModeRuntimeFactory(options) {
    const resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    const requireFn = options && options.requireFn;
    const runtimeScope = options && options.runtimeScope;
    const coreGlobalScope = options && options.coreGlobalScope;

    let factory = null;

    if (typeof resolveCoreSupportModule === 'function') {
      try {
        const tools = resolveCoreSupportModule(
          'cineCoreAppPinkModeRuntime',
          './pink-mode.js'
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
        const requiredPinkModeRuntime = requireFn('./pink-mode.js');
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

    const fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];
      if (!isObject(scope)) {
        continue;
      }

      try {
        const candidate = scope.cineCoreAppPinkModeRuntime;
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
    const resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    const requireFn = options && options.requireFn;
    const runtimeScope = options && options.runtimeScope;
    const coreGlobalScope = options && options.coreGlobalScope;

    let factory = null;

    if (typeof resolveCoreSupportModule === 'function') {
      try {
        const tools = resolveCoreSupportModule(
          'cineCoreAppPinkModeFallback',
          './pink-mode.js'
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
        const requiredPinkModeFallback = requireFn('./pink-mode.js');
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

    const fallbackScopes = collectCandidateScopes(runtimeScope, coreGlobalScope);

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];
      if (!isObject(scope)) {
        continue;
      }

      try {
        const candidate = scope.cineCoreAppPinkModeFallback;
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
    const fallbackIcons = Object.freeze({
      off: Object.freeze({ className: 'icon-svg pink-mode-icon', markup: '' }),
      onSequence: Object.freeze([]),
    });

    function ensureSafePromise(value) {
      if (typeof Promise !== 'undefined' && typeof Promise.resolve === 'function') {
        return Promise.resolve(value);
      }

      const promiseLike = {
        then(callback) {
          if (typeof callback === 'function') {
            try {
              return ensureSafePromise(callback(value));
            } catch (callbackError) {
              void callbackError;
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

    return {
      pinkModeIcons: fallbackIcons,
      ensureSvgHasAriaHidden: trimMarkup,
      setPinkModeIconSequence() {
        return false;
      },
      loadPinkModeIconsFromFiles() {
        return ensureSafePromise();
      },
      ensurePinkModeLottieRuntime() {
        return ensureSafePromise(null);
      },
      resolvePinkModeLottieRuntime() {
        return null;
      },
      startPinkModeAnimatedIcons: noop,
      stopPinkModeAnimatedIcons: noop,
      triggerPinkModeIconRain: noop,
      getPinkModeIconRotationTimer() {
        return null;
      },
      setPinkModeIconRotationTimer: noop,
      getPinkModeIconIndex() {
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
        const api = factory({
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
        const api = factory();
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
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    const resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );

    const runtimeFactory = resolvePinkModeRuntimeFactory({
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
    });

    const runtimeApi = callCreatePinkModeRuntime(runtimeFactory, {
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
    });

    if (isObject(runtimeApi)) {
      return runtimeApi;
    }

    const fallbackFactory = resolvePinkModeFallbackFactory({
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
    });

    const fallbackApi = callCreatePinkModeFallback(fallbackFactory);
    if (isObject(fallbackApi)) {
      return fallbackApi;
    }

    return createLastResortPinkModeFallbackApi();
  }

  const namespace = {
    createPinkModeSupportBridge,
  };

  const namespaceName = 'cineCoreAppPinkModeSupportBridge';
  const globalScope = detectScope();
  const existing =
    isObject(globalScope) && isObject(globalScope[namespaceName])
      ? globalScope[namespaceName]
      : {};

  for (const key of Object.keys(namespace)) {
    existing[key] = namespace[key];
  }

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
