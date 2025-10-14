/*
 * Centralises the logic that resolves the runtime shared bootstrap result used
 * by the modern Cine Power Planner runtime. Moving this into a dedicated module
 * keeps the main orchestration file slimmer while preserving all fallbacks that
 * protect offline usage and previously saved user data.
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

    appendUniqueScope(fallbackScopes, typeof globalThis !== 'undefined' ? globalThis : null, seen);
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

  function ensureBootstrapOptions(options, requireFn) {
    const source = isObject(options) ? options : {};
    const bootstrapOptions = Object.assign({}, source);

    if (!('requireFn' in bootstrapOptions)) {
      bootstrapOptions.requireFn = requireFn;
    }

    return bootstrapOptions;
  }

  function attemptResolveWithTools(candidate, context) {
    if (!isObject(candidate)) {
      return null;
    }

    const factory = candidate.createRuntimeSharedBootstrapResult;

    if (typeof factory !== 'function') {
      return null;
    }

    try {
      const result = factory({
        bootstrapOptions: context.bootstrapOptions,
        runtimeSharedBootstrapInlineTools: context.runtimeSharedBootstrapInlineTools,
        requireFn: context.requireFn,
        inlineRequirePath: context.inlineRequirePath,
      });

      return isObject(result) ? result : null;
    } catch (runtimeSharedBootstrapResultError) {
      void runtimeSharedBootstrapResultError;
    }

    return null;
  }

  function ensureFallbackCreator(resultTools, requireFn, resultModulePath) {
    let fallbackCreator =
      resultTools &&
      typeof resultTools.createRuntimeSharedBootstrapInlineFallback === 'function'
        ? resultTools.createRuntimeSharedBootstrapInlineFallback
        : null;

    if (!fallbackCreator && typeof requireFn === 'function') {
      try {
        const requiredModule = requireFn(resultModulePath);
        if (
          isObject(requiredModule) &&
          typeof requiredModule.createRuntimeSharedBootstrapInlineFallback === 'function'
        ) {
          fallbackCreator = requiredModule.createRuntimeSharedBootstrapInlineFallback;
        }
      } catch (runtimeSharedBootstrapFallbackRequireError) {
        void runtimeSharedBootstrapFallbackRequireError;
      }
    }

    return typeof fallbackCreator === 'function' ? fallbackCreator : null;
  }

  function resolveRuntimeSharedBootstrapResult(options) {
    const requireFn = ensureRequireFn(options && options.requireFn);
    const inlineRequirePath =
      options && typeof options.inlineRequirePath === 'string' && options.inlineRequirePath
        ? options.inlineRequirePath
        : './modules/app-core/runtime-shared-bootstrap-inline.js';
    const resultModulePath =
      options && typeof options.resultModulePath === 'string' && options.resultModulePath
        ? options.resultModulePath
        : './modules/app-core/runtime-shared-bootstrap-result.js';

    const bootstrapOptions = ensureBootstrapOptions(options && options.bootstrapOptions, requireFn);
    const runtimeSharedBootstrapInlineTools = isObject(options && options.runtimeSharedBootstrapInlineTools)
      ? options.runtimeSharedBootstrapInlineTools
      : null;
    const resultTools = isObject(options && options.resultTools) ? options.resultTools : null;

    const context = {
      bootstrapOptions,
      runtimeSharedBootstrapInlineTools,
      requireFn,
      inlineRequirePath,
    };

    let result = attemptResolveWithTools(resultTools, context);

    if (!result && typeof requireFn === 'function') {
      try {
        const requiredModule = requireFn(resultModulePath);
        result = attemptResolveWithTools(requiredModule, context);
      } catch (runtimeSharedBootstrapResultRequireError) {
        void runtimeSharedBootstrapResultRequireError;
      }
    }

    if (!result) {
      const fallbackCreator = ensureFallbackCreator(resultTools, requireFn, resultModulePath);

      if (fallbackCreator) {
        try {
          result = fallbackCreator(bootstrapOptions);
        } catch (runtimeSharedBootstrapFallbackError) {
          void runtimeSharedBootstrapFallbackError;
          result = null;
        }
      }
    }

    if (!isObject(result)) {
      result = createRuntimeSharedBootstrapInlineFallback(bootstrapOptions);
    }

    return result;
  }

  const namespace = {
    resolveRuntimeSharedBootstrapResult,
    createRuntimeSharedBootstrapInlineFallback,
  };

  const namespaceName = 'cineCoreAppRuntimeSharedBootstrapLoader';
  const scope = (function detectScope() {
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
  })();

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
