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
        : './modules/app-core/pink-mode-support-loader.js';

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
