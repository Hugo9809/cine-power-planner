/*
 * Legacy friendly runtime shared bootstrap helpers matching the modern module.
 *
 * The offline build still expects this defensive loader so we mirror the modern
 * implementation inside the legacy tree to keep both bundles aligned while the
 * refactor progresses.
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
    var scopes = [];
    var seen = typeof Set === 'function' ? new Set() : null;

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
      var namespace = scope.cineCoreAppRuntimeSharedNamespace;
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
    var options = namespaceOptions || {};
    var requireFn = ensureRequireFn(options.requireFn);

    if (typeof requireFn === 'function') {
      try {
        var requiredNamespace = requireFn(
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

    var scopes = Array.isArray(fallbackScopes) ? fallbackScopes : [];

    for (var index = 0; index < scopes.length; index += 1) {
      var namespace = attemptResolveRuntimeSharedNamespaceFromScope(
        scopes[index],
        options
      );
      if (namespace) {
        return namespace;
      }
    }

    function minimalFallbackResolveRuntimeSharedFromGlobal() {
      for (var idx = 0; idx < scopes.length; idx += 1) {
        var scope = scopes[idx];
        if (!isObject(scope)) {
          continue;
        }

        try {
          var candidate = scope.cineCoreRuntimeShared;
          if (isObject(candidate)) {
            return candidate;
          }
        } catch (runtimeSharedLookupError) {
          void runtimeSharedLookupError;
        }
      }

      return null;
    }

    var existingRuntimeShared = isObject(options.currentRuntimeShared)
      ? options.currentRuntimeShared
      : null;
    var resolvedRuntimeShared =
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
    var scopes = Array.isArray(fallbackScopes) ? fallbackScopes : [];

    return function fallbackResolveRuntimeSharedFromGlobal() {
      if (
        runtimeSharedNamespace &&
        typeof runtimeSharedNamespace.fallbackResolveRuntimeSharedFromGlobal ===
          'function'
      ) {
        try {
          var resolved =
            runtimeSharedNamespace.fallbackResolveRuntimeSharedFromGlobal();
          if (isObject(resolved)) {
            return resolved;
          }
        } catch (runtimeSharedFallbackError) {
          void runtimeSharedFallbackError;
        }
      }

      for (var index = 0; index < scopes.length; index += 1) {
        var scope = scopes[index];
        if (!isObject(scope)) {
          continue;
        }

        try {
          var candidate = scope.cineCoreRuntimeShared;
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
    var runtimeSharedNamespaceTools =
      options && options.runtimeSharedNamespaceTools;
    var resolveCoreSupportModule = options && options.resolveCoreSupportModule;
    var requireFn = ensureRequireFn(options && options.requireFn);
    var runtimeScope = isObject(options && options.runtimeScope)
      ? options.runtimeScope
      : null;
    var coreGlobalScope = isObject(options && options.coreGlobalScope)
      ? options.coreGlobalScope
      : null;
    var currentRuntimeShared = isObject(options && options.currentRuntimeShared)
      ? options.currentRuntimeShared
      : null;

    var fallbackScopes = createFallbackScopeList(runtimeScope, coreGlobalScope);

    var namespaceOptions = {
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      currentRuntimeShared: currentRuntimeShared,
    };

    var runtimeSharedNamespace = null;

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

    var runtimeSharedResolver =
      runtimeSharedNamespace &&
      typeof runtimeSharedNamespace.runtimeSharedResolver === 'function'
        ? runtimeSharedNamespace.runtimeSharedResolver
        : null;

    var existingRuntimeShared =
      runtimeSharedNamespace &&
      isObject(runtimeSharedNamespace.existingRuntimeShared)
        ? runtimeSharedNamespace.existingRuntimeShared
        : currentRuntimeShared;

    var fallbackResolveRuntimeSharedFromGlobal =
      createFallbackResolveRuntimeSharedFromGlobal(
        runtimeSharedNamespace,
        fallbackScopes
      );

    var runtimeShared =
      runtimeSharedNamespace &&
      isObject(runtimeSharedNamespace.runtimeShared)
        ? runtimeSharedNamespace.runtimeShared
        : null;

    if (!isObject(runtimeShared) && isObject(existingRuntimeShared)) {
      runtimeShared = existingRuntimeShared;
    }

    if (!isObject(runtimeShared) && typeof runtimeSharedResolver === 'function') {
      try {
        var resolved = runtimeSharedResolver({
          currentShared: existingRuntimeShared,
          resolveCoreSupportModule: resolveCoreSupportModule,
          requireFn: requireFn,
          runtimeScope: runtimeScope,
          coreGlobalScope: coreGlobalScope,
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
      runtimeSharedNamespace: runtimeSharedNamespace,
      runtimeSharedResolver: runtimeSharedResolver,
      existingRuntimeShared: isObject(existingRuntimeShared)
        ? existingRuntimeShared
        : runtimeShared,
      runtimeShared: runtimeShared,
      fallbackResolveRuntimeSharedFromGlobal: fallbackResolveRuntimeSharedFromGlobal,
      fallbackScopes: fallbackScopes,
    };
  }

  var namespace = {
    createRuntimeSharedBootstrap: createRuntimeSharedBootstrap,
  };

  var globalScope =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global) ||
    null;

  var namespaceName = 'cineCoreAppRuntimeSharedBootstrap';

  var existing =
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
