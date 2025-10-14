/*
 * Runtime shared bootstrap manager for the Cine Power Planner modern core.
 *
 * This module encapsulates the defensive logic that used to live inside the
 * monolithic app-core bundle. Keeping it here allows the app core to remain
 * readable while preserving the extensive fallbacks that protect offline
 * users, backups and localisation data.
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

  function createFallbackScopeList() {
    const scopes = [];
    const seen = typeof Set === 'function' ? new Set() : null;

    function append(scope) {
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

    for (let index = 0; index < arguments.length; index += 1) {
      append(arguments[index]);
    }

    return scopes;
  }

  function attemptResolveRuntimeSharedBootstrapResult(candidate, loaderOptions) {
    if (!isObject(candidate)) {
      return null;
    }

    const resolver =
      typeof candidate.resolveRuntimeSharedBootstrapResult === 'function'
        ? candidate.resolveRuntimeSharedBootstrapResult
        : null;

    if (!resolver) {
      return null;
    }

    try {
      const result = resolver(loaderOptions);
      return isObject(result) ? result : null;
    } catch (runtimeSharedBootstrapError) {
      void runtimeSharedBootstrapError;
    }

    return null;
  }

  function createInlineFallbackResult(bootstrapOptions) {
    const fallbackScopes = [];
    const seen = typeof Set === 'function' ? new Set() : null;

    function appendScope(scope) {
      if (!isObject(scope)) {
        return;
      }

      if (seen) {
        if (seen.has(scope)) {
          return;
        }

        seen.add(scope);
        fallbackScopes.push(scope);
        return;
      }

      if (fallbackScopes.indexOf(scope) !== -1) {
        return;
      }

      fallbackScopes.push(scope);
    }

    if (bootstrapOptions) {
      appendScope(bootstrapOptions.runtimeScope);
      appendScope(bootstrapOptions.coreGlobalScope);

      const optionFallbackScopes =
        bootstrapOptions && Array.isArray(bootstrapOptions.fallbackScopes)
          ? bootstrapOptions.fallbackScopes
          : null;

      if (optionFallbackScopes) {
        for (let index = 0; index < optionFallbackScopes.length; index += 1) {
          appendScope(optionFallbackScopes[index]);
        }
      }
    }

    appendScope(typeof globalThis !== 'undefined' ? globalThis : null);
    appendScope(typeof window !== 'undefined' ? window : null);
    appendScope(typeof self !== 'undefined' ? self : null);
    appendScope(typeof global !== 'undefined' ? global : null);

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

    const existingRuntimeShared =
      (bootstrapOptions &&
      isObject(bootstrapOptions.currentRuntimeShared)
        ? bootstrapOptions.currentRuntimeShared
        : null) || fallbackResolveRuntimeSharedFromGlobal();

    let runtimeShared = existingRuntimeShared;

    if (!isObject(runtimeShared)) {
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
      existingRuntimeShared: isObject(runtimeShared)
        ? runtimeShared
        : null,
      runtimeShared,
      fallbackResolveRuntimeSharedFromGlobal,
    };
  }

  function createRuntimeSharedBootstrapResult(options) {
    const normalizedOptions = options && typeof options === 'object' ? options : {};
    const bootstrapOptions =
      normalizedOptions.bootstrapOptions &&
      typeof normalizedOptions.bootstrapOptions === 'object'
        ? normalizedOptions.bootstrapOptions
        : {};

    const loaderOptions =
      normalizedOptions.loaderOptions &&
      typeof normalizedOptions.loaderOptions === 'object'
        ? normalizedOptions.loaderOptions
        : {};

    const loaderTools = normalizedOptions.loaderTools || null;
    const inlineTools =
      normalizedOptions.inlineTools || loaderOptions.runtimeSharedBootstrapInlineTools || null;
    const resultTools =
      normalizedOptions.resultTools || loaderOptions.resultTools || null;

    const requireFn = ensureRequireFn(
      normalizedOptions.requireFn ||
        bootstrapOptions.requireFn ||
        loaderOptions.requireFn
    );

    const loaderModulePath =
      typeof normalizedOptions.loaderModulePath === 'string'
        ? normalizedOptions.loaderModulePath
        : typeof loaderOptions.loaderModulePath === 'string'
        ? loaderOptions.loaderModulePath
        : './modules/app-core/runtime-shared-bootstrap-loader.js';

    const resultModulePath =
      typeof normalizedOptions.resultModulePath === 'string'
        ? normalizedOptions.resultModulePath
        : typeof loaderOptions.resultModulePath === 'string'
        ? loaderOptions.resultModulePath
        : './modules/app-core/runtime-shared-bootstrap-result.js';

    const inlineModulePath =
      typeof normalizedOptions.inlineModulePath === 'string'
        ? normalizedOptions.inlineModulePath
        : typeof loaderOptions.inlineRequirePath === 'string'
        ? loaderOptions.inlineRequirePath
        : './modules/app-core/runtime-shared-bootstrap-inline.js';

    const fallbackScopes = Array.isArray(normalizedOptions.fallbackScopes)
      ? normalizedOptions.fallbackScopes
      : createFallbackScopeList(
          bootstrapOptions.runtimeScope,
          bootstrapOptions.coreGlobalScope,
          typeof globalThis !== 'undefined' ? globalThis : null,
          typeof window !== 'undefined' ? window : null,
          typeof self !== 'undefined' ? self : null,
          typeof global !== 'undefined' ? global : null
        );

    const loaderNamespaceCandidates = Array.isArray(
      normalizedOptions.loaderNamespaceCandidates
    )
      ? normalizedOptions.loaderNamespaceCandidates
      : fallbackScopes;

    const effectiveLoaderOptions = Object.assign(
      {
        bootstrapOptions,
        runtimeSharedBootstrapInlineTools: inlineTools,
        resultTools,
        inlineRequirePath: inlineModulePath,
        resultModulePath,
        requireFn,
      },
      loaderOptions
    );

    function requireModule(modulePath) {
      if (typeof requireFn !== 'function') {
        return null;
      }

      try {
        return requireFn(modulePath);
      } catch (requireError) {
        void requireError;
      }

      return null;
    }

    let result = attemptResolveRuntimeSharedBootstrapResult(
      loaderTools,
      effectiveLoaderOptions
    );

    if (!result) {
      const requiredLoader = requireModule(loaderModulePath);
      result = attemptResolveRuntimeSharedBootstrapResult(
        requiredLoader,
        effectiveLoaderOptions
      );
    }

    if (!result) {
      for (let index = 0; index < loaderNamespaceCandidates.length; index += 1) {
        const scope = loaderNamespaceCandidates[index];

        if (!isObject(scope)) {
          continue;
        }

        try {
          const candidate = scope.cineCoreAppRuntimeSharedBootstrapLoader;
          result = attemptResolveRuntimeSharedBootstrapResult(
            candidate,
            effectiveLoaderOptions
          );
        } catch (runtimeSharedBootstrapLoaderLookupError) {
          void runtimeSharedBootstrapLoaderLookupError;
        }

        if (result) {
          break;
        }
      }
    }

    if (!isObject(result)) {
      const fallbackCreator =
        (isObject(loaderTools) &&
        typeof loaderTools.createRuntimeSharedBootstrapInlineFallback === 'function'
          ? loaderTools.createRuntimeSharedBootstrapInlineFallback
          : null) ||
        (isObject(resultTools) &&
        typeof resultTools.createRuntimeSharedBootstrapInlineFallback === 'function'
          ? resultTools.createRuntimeSharedBootstrapInlineFallback
          : null);

      if (typeof fallbackCreator === 'function') {
        try {
          result = fallbackCreator(bootstrapOptions);
        } catch (runtimeSharedBootstrapInlineFallbackError) {
          void runtimeSharedBootstrapInlineFallbackError;
          result = null;
        }
      }
    }

    if (!isObject(result)) {
      const requiredLoader = requireModule(loaderModulePath);

      if (
        isObject(requiredLoader) &&
        typeof requiredLoader.createRuntimeSharedBootstrapInlineFallback === 'function'
      ) {
        try {
          result = requiredLoader.createRuntimeSharedBootstrapInlineFallback(
            bootstrapOptions
          );
        } catch (runtimeSharedBootstrapLoaderFallbackRequireError) {
          void runtimeSharedBootstrapLoaderFallbackRequireError;
        }
      }
    }

    if (!isObject(result)) {
      const requiredResultModule = requireModule(resultModulePath);

      if (
        isObject(requiredResultModule) &&
        typeof requiredResultModule.createRuntimeSharedBootstrapInlineFallback === 'function'
      ) {
        try {
          result = requiredResultModule.createRuntimeSharedBootstrapInlineFallback(
            bootstrapOptions
          );
        } catch (runtimeSharedBootstrapResultFallbackRequireError) {
          void runtimeSharedBootstrapResultFallbackRequireError;
        }
      }
    }

    if (!isObject(result)) {
      const requiredInlineModule = requireModule(inlineModulePath);

      if (
        isObject(requiredInlineModule) &&
        typeof requiredInlineModule.createRuntimeSharedBootstrapInlineFallback ===
          'function'
      ) {
        try {
          result = requiredInlineModule.createRuntimeSharedBootstrapInlineFallback(
            bootstrapOptions
          );
        } catch (runtimeSharedBootstrapInlineModuleError) {
          void runtimeSharedBootstrapInlineModuleError;
        }
      }
    }

    if (!isObject(result)) {
      result = createInlineFallbackResult(bootstrapOptions);
    }

    return result;
  }

  const namespace = {
    createRuntimeSharedBootstrapResult,
  };

  const globalScope =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global) ||
    null;

  const namespaceName = 'cineCoreAppRuntimeSharedBootstrapManager';

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
