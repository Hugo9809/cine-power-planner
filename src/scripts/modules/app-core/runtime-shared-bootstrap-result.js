/*
 * Provides a dedicated module for resolving the runtime shared bootstrap
 * result used by the modern Cine Power Planner app core. Extracting this logic
 * from the monolithic runtime keeps the main bundle leaner while retaining the
 * extensive fallback paths that protect offline usage and stored user data.
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

  function createRuntimeSharedBootstrapInlineFallback(options) {
    const fallbackScopes = [];
    const seen = typeof Set === 'function' ? new Set() : null;

    appendUniqueScope(fallbackScopes, options && options.runtimeScope, seen);
    appendUniqueScope(fallbackScopes, options && options.coreGlobalScope, seen);

    if (Array.isArray(options && options.fallbackScopes)) {
      for (let index = 0; index < options.fallbackScopes.length; index += 1) {
        appendUniqueScope(fallbackScopes, options.fallbackScopes[index], seen);
      }
    }

    appendUniqueScope(
      fallbackScopes,
      typeof globalThis !== 'undefined' ? globalThis : null,
      seen
    );
    appendUniqueScope(fallbackScopes, typeof window !== 'undefined' ? window : null, seen);
    appendUniqueScope(fallbackScopes, typeof self !== 'undefined' ? self : null, seen);
    appendUniqueScope(fallbackScopes, typeof global !== 'undefined' ? global : null, seen);

    function fallbackResolveRuntimeSharedFromGlobal() {
      for (let index = 0; index < fallbackScopes.length; index += 1) {
        const scope = fallbackScopes[index];

        if (!isObject(scope)) {
          continue;
        }

        try {
          const candidate = scope.cineCoreRuntimeShared;
          if (isObject(candidate)) {
            return candidate;
          }
        } catch (runtimeSharedLookupError) {
          void runtimeSharedLookupError;
        }
      }

      return null;
    }

    const existingRuntimeShared = isObject(options && options.currentRuntimeShared)
      ? options.currentRuntimeShared
      : fallbackResolveRuntimeSharedFromGlobal();

    let runtimeShared = isObject(existingRuntimeShared) ? existingRuntimeShared : null;

    if (!runtimeShared) {
      try {
        runtimeShared = Object.create(null);
      } catch (runtimeSharedCreationError) {
        void runtimeSharedCreationError;
        runtimeShared = {};
      }
    }

    return {
      runtimeSharedNamespace: null,
      runtimeSharedResolver: null,
      existingRuntimeShared: runtimeShared,
      runtimeShared,
      fallbackResolveRuntimeSharedFromGlobal,
    };
  }

  function createRuntimeSharedBootstrapResult(options) {
    const bootstrapOptions =
      options && isObject(options.bootstrapOptions) ? options.bootstrapOptions : {};
    const runtimeSharedBootstrapInlineTools =
      options && isObject(options.runtimeSharedBootstrapInlineTools)
        ? options.runtimeSharedBootstrapInlineTools
        : null;
    const requireFn = ensureRequireFn(options && options.requireFn);
    const inlineRequirePath =
      options && typeof options.inlineRequirePath === 'string' && options.inlineRequirePath
        ? options.inlineRequirePath
        : './modules/app-core/runtime-shared-bootstrap-inline.js';

    if (
      runtimeSharedBootstrapInlineTools &&
      typeof runtimeSharedBootstrapInlineTools.createRuntimeSharedBootstrapResult ===
        'function'
    ) {
      try {
        const inlineResult =
          runtimeSharedBootstrapInlineTools.createRuntimeSharedBootstrapResult(
            bootstrapOptions
          );

        if (isObject(inlineResult)) {
          return inlineResult;
        }
      } catch (runtimeSharedBootstrapInlineError) {
        void runtimeSharedBootstrapInlineError;
      }
    }

    if (typeof requireFn === 'function') {
      try {
        const requiredInline = requireFn(inlineRequirePath);

        if (
          isObject(requiredInline) &&
          typeof requiredInline.createRuntimeSharedBootstrapResult === 'function'
        ) {
          const requiredInlineResult =
            requiredInline.createRuntimeSharedBootstrapResult(bootstrapOptions);

          if (isObject(requiredInlineResult)) {
            return requiredInlineResult;
          }
        }
      } catch (runtimeSharedBootstrapInlineRequireError) {
        void runtimeSharedBootstrapInlineRequireError;
      }
    }

    return createRuntimeSharedBootstrapInlineFallback(bootstrapOptions);
  }

  const namespace = {
    createRuntimeSharedBootstrapResult,
    createRuntimeSharedBootstrapInlineFallback,
  };

  const namespaceName = 'cineCoreAppRuntimeSharedBootstrapResult';
  const scope = detectScope();
  const existing =
    isObject(scope) && isObject(scope[namespaceName]) ? scope[namespaceName] : {};

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
