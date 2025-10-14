/*
 * Provides runtime shared bootstrap helpers for the modern Cine Power Planner app core.
 *
 * The original runtime used to bundle this logic inside the monolithic app core file.
 * Extracting it keeps the core leaner while preserving the defensive loading logic
 * that protects offline users and existing data caches.
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

  function createFallbackScopeList(runtimeScope, coreGlobalScope) {
    const scopes = [];
    const seen = typeof Set === 'function' ? new Set() : null;

    function push(scope) {
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

    push(runtimeScope);
    push(coreGlobalScope);
    push(typeof globalThis !== 'undefined' ? globalThis : null);
    push(typeof window !== 'undefined' ? window : null);
    push(typeof self !== 'undefined' ? self : null);
    push(typeof global !== 'undefined' ? global : null);

    return scopes;
  }

  function attemptResolveRuntimeSharedNamespaceFromScope(scope, namespaceOptions) {
    if (!isObject(scope)) {
      return null;
    }

    try {
      const namespace = scope.cineCoreAppRuntimeSharedNamespace;
      if (
        isObject(namespace) &&
        typeof namespace.createRuntimeSharedNamespace === 'function'
      ) {
        return namespace.createRuntimeSharedNamespace(namespaceOptions);
      }
    } catch (namespaceLookupError) {
      void namespaceLookupError;
    }

    return null;
  }

  function createInlineRuntimeSharedNamespace(namespaceOptions, fallbackScopes) {
    const options = namespaceOptions || {};
    const requireFn = ensureRequireFn(options.requireFn);

    if (typeof requireFn === 'function') {
      try {
        const requiredNamespace = requireFn(
          './modules/app-core/runtime-shared-namespace.js'
        );
        if (
          isObject(requiredNamespace) &&
          typeof requiredNamespace.createRuntimeSharedNamespace === 'function'
        ) {
          return requiredNamespace.createRuntimeSharedNamespace(options);
        }
      } catch (runtimeSharedNamespaceRequireError) {
        void runtimeSharedNamespaceRequireError;
      }
    }

    const scopes = Array.isArray(fallbackScopes) ? fallbackScopes : [];

    for (let index = 0; index < scopes.length; index += 1) {
      const namespace = attemptResolveRuntimeSharedNamespaceFromScope(
        scopes[index],
        options
      );
      if (namespace) {
        return namespace;
      }
    }

    function minimalFallbackResolveRuntimeSharedFromGlobal() {
      for (let index = 0; index < scopes.length; index += 1) {
        const scope = scopes[index];
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

    const existingRuntimeShared = isObject(options.currentRuntimeShared)
      ? options.currentRuntimeShared
      : null;
    const resolvedRuntimeShared =
      existingRuntimeShared || minimalFallbackResolveRuntimeSharedFromGlobal();

    return {
      runtimeShared: isObject(resolvedRuntimeShared)
        ? resolvedRuntimeShared
        : Object.create(null),
      existingRuntimeShared: isObject(resolvedRuntimeShared)
        ? resolvedRuntimeShared
        : existingRuntimeShared,
      runtimeSharedResolver: null,
      fallbackResolveRuntimeSharedFromGlobal: minimalFallbackResolveRuntimeSharedFromGlobal,
    };
  }

  function createFallbackResolveRuntimeSharedFromGlobal(
    runtimeSharedNamespace,
    fallbackScopes
  ) {
    const scopes = Array.isArray(fallbackScopes) ? fallbackScopes : [];

    return function fallbackResolveRuntimeSharedFromGlobal() {
      if (
        runtimeSharedNamespace &&
        typeof runtimeSharedNamespace.fallbackResolveRuntimeSharedFromGlobal ===
          'function'
      ) {
        try {
          const resolved =
            runtimeSharedNamespace.fallbackResolveRuntimeSharedFromGlobal();
          if (isObject(resolved)) {
            return resolved;
          }
        } catch (runtimeSharedFallbackError) {
          void runtimeSharedFallbackError;
        }
      }

      for (let index = 0; index < scopes.length; index += 1) {
        const scope = scopes[index];
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
    };
  }

  function createRuntimeSharedBootstrap(options) {
    const runtimeSharedNamespaceTools =
      options && options.runtimeSharedNamespaceTools;
    const resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = isObject(options && options.runtimeScope)
      ? options.runtimeScope
      : null;
    const coreGlobalScope = isObject(options && options.coreGlobalScope)
      ? options.coreGlobalScope
      : null;
    const currentRuntimeShared = isObject(options && options.currentRuntimeShared)
      ? options.currentRuntimeShared
      : null;

    const fallbackScopes = createFallbackScopeList(runtimeScope, coreGlobalScope);

    const namespaceOptions = {
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
      currentRuntimeShared,
    };

    let runtimeSharedNamespace = null;

    if (
      runtimeSharedNamespaceTools &&
      typeof runtimeSharedNamespaceTools.createRuntimeSharedNamespace === 'function'
    ) {
      try {
        runtimeSharedNamespace =
          runtimeSharedNamespaceTools.createRuntimeSharedNamespace(
            namespaceOptions
          );
      } catch (namespaceCreationError) {
        void namespaceCreationError;
        runtimeSharedNamespace = null;
      }
    }

    if (!runtimeSharedNamespace) {
      runtimeSharedNamespace = createInlineRuntimeSharedNamespace(
        namespaceOptions,
        fallbackScopes
      );
    }

    const runtimeSharedResolver =
      runtimeSharedNamespace &&
      typeof runtimeSharedNamespace.runtimeSharedResolver === 'function'
        ? runtimeSharedNamespace.runtimeSharedResolver
        : null;

    const existingRuntimeShared =
      runtimeSharedNamespace &&
      isObject(runtimeSharedNamespace.existingRuntimeShared)
        ? runtimeSharedNamespace.existingRuntimeShared
        : currentRuntimeShared;

    const fallbackResolveRuntimeSharedFromGlobal =
      createFallbackResolveRuntimeSharedFromGlobal(
        runtimeSharedNamespace,
        fallbackScopes
      );

    let runtimeShared =
      runtimeSharedNamespace &&
      isObject(runtimeSharedNamespace.runtimeShared)
        ? runtimeSharedNamespace.runtimeShared
        : null;

    if (!isObject(runtimeShared) && isObject(existingRuntimeShared)) {
      runtimeShared = existingRuntimeShared;
    }

    if (!isObject(runtimeShared) && typeof runtimeSharedResolver === 'function') {
      try {
        const resolved = runtimeSharedResolver({
          currentShared: existingRuntimeShared,
          resolveCoreSupportModule,
          requireFn,
          runtimeScope,
          coreGlobalScope,
        });
        if (isObject(resolved)) {
          runtimeShared = resolved;
        }
      } catch (resolveError) {
        void resolveError;
      }
    }

    if (!isObject(runtimeShared)) {
      runtimeShared = fallbackResolveRuntimeSharedFromGlobal();
      if (!isObject(runtimeShared)) {
        runtimeShared = Object.create(null);
      }
    }

    return {
      runtimeSharedNamespace,
      runtimeSharedResolver,
      existingRuntimeShared: isObject(existingRuntimeShared)
        ? existingRuntimeShared
        : runtimeShared,
      runtimeShared,
      fallbackResolveRuntimeSharedFromGlobal,
      fallbackScopes,
    };
  }

  const namespace = {
    createRuntimeSharedBootstrap,
  };

  const globalScope =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global) ||
    null;

  const namespaceName = 'cineCoreAppRuntimeSharedBootstrap';

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
