/*
 * Resolves the runtime shared bootstrap payload for the modern Cine Power Planner app core.
 *
 * The previous implementation lived inside the monolithic app-core module. Extracting it keeps
 * the entry file leaner while preserving the layered fallbacks that guarantee offline safety and
 * data integrity across all runtime combinations.
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

  function normalizeScope(value) {
    return typeof value !== 'undefined' ? value : null;
  }

  function createFallbackResolveRuntimeSharedFromGlobal(scopes) {
    return function fallbackResolveRuntimeSharedFromGlobal() {
      for (let index = 0; index < scopes.length; index += 1) {
        const scope = scopes[index];

        if (!isObject(scope)) {
          continue;
        }

        try {
          const candidate = scope.cineCoreRuntimeShared;

          if (candidate && typeof candidate === 'object') {
            return candidate;
          }
        } catch (runtimeSharedLookupError) {
          void runtimeSharedLookupError;
        }
      }

      return null;
    };
  }

  function attemptResolveWithManager(candidate, managerOptions) {
    if (!isObject(candidate)) {
      return null;
    }

    const creator =
      typeof candidate.createRuntimeSharedBootstrapResult === 'function'
        ? candidate.createRuntimeSharedBootstrapResult
        : null;

    if (!creator) {
      return null;
    }

    try {
      const result = creator(managerOptions);
      return result && typeof result === 'object' ? result : null;
    } catch (runtimeSharedBootstrapManagerError) {
      void runtimeSharedBootstrapManagerError;
    }

    return null;
  }

  function createInlineFallbackResult(bootstrapOptions) {
    const fallbackScopes = [];
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
        fallbackScopes.push(scope);
        return;
      }

      if (fallbackScopes.indexOf(scope) !== -1) {
        return;
      }

      fallbackScopes.push(scope);
    }

    append(bootstrapOptions.runtimeScope);
    append(bootstrapOptions.coreGlobalScope);

    if (Array.isArray(bootstrapOptions.fallbackScopes)) {
      for (let index = 0; index < bootstrapOptions.fallbackScopes.length; index += 1) {
        append(bootstrapOptions.fallbackScopes[index]);
      }
    }

    append(typeof globalThis !== 'undefined' ? globalThis : null);
    append(typeof window !== 'undefined' ? window : null);
    append(typeof self !== 'undefined' ? self : null);
    append(typeof global !== 'undefined' ? global : null);

    const fallbackResolveRuntimeSharedFromGlobal =
      createFallbackResolveRuntimeSharedFromGlobal(fallbackScopes);

    const existingRuntimeShared =
      (bootstrapOptions.currentRuntimeShared &&
      typeof bootstrapOptions.currentRuntimeShared === 'object'
        ? bootstrapOptions.currentRuntimeShared
        : null) || fallbackResolveRuntimeSharedFromGlobal();

    let runtimeShared = existingRuntimeShared;

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
    const opts = options || {};

    const runtimeScope = normalizeScope(opts.runtimeScope);
    const coreGlobalScope = normalizeScope(opts.coreGlobalScope);

    const fallbackScopes = Array.isArray(opts.fallbackScopes)
      ? opts.fallbackScopes.slice()
      : [];

    const requireFn = ensureRequireFn(opts.requireFn);

    const bootstrapOptions = {
      runtimeSharedBootstrapTools: opts.runtimeSharedBootstrapTools || null,
      runtimeSharedNamespaceTools: opts.runtimeSharedNamespaceTools || null,
      resolveCoreSupportModule: opts.resolveCoreSupportModule || null,
      requireFn,
      runtimeScope,
      coreGlobalScope,
      currentRuntimeShared: opts.currentRuntimeShared || null,
      fallbackScopes: [runtimeScope, coreGlobalScope].concat(fallbackScopes),
    };

    const loaderOptions = {
      bootstrapOptions,
      runtimeSharedBootstrapInlineTools: opts.runtimeSharedBootstrapInlineTools || null,
      resultTools: opts.runtimeSharedBootstrapResultTools || null,
      inlineRequirePath: './modules/app-core/runtime-shared-bootstrap-inline.js',
      resultModulePath: './modules/app-core/runtime-shared-bootstrap-result.js',
      requireFn,
    };

    const loaderNamespaceCandidates = [
      runtimeScope,
      coreGlobalScope,
      typeof globalThis !== 'undefined' ? globalThis : null,
      typeof window !== 'undefined' ? window : null,
      typeof self !== 'undefined' ? self : null,
      typeof global !== 'undefined' ? global : null,
    ];

    const managerOptions = {
      bootstrapOptions,
      loaderOptions,
      loaderTools: opts.runtimeSharedBootstrapLoaderTools || null,
      inlineTools: opts.runtimeSharedBootstrapInlineTools || null,
      resultTools: opts.runtimeSharedBootstrapResultTools || null,
      requireFn,
      loaderModulePath: './modules/app-core/runtime-shared-bootstrap-loader.js',
      resultModulePath: './modules/app-core/runtime-shared-bootstrap-result.js',
      inlineModulePath: './modules/app-core/runtime-shared-bootstrap-inline.js',
      fallbackScopes: loaderNamespaceCandidates,
      loaderNamespaceCandidates,
    };

    const managerCandidates = [];

    if (opts.runtimeSharedBootstrapManagerTools) {
      managerCandidates.push(opts.runtimeSharedBootstrapManagerTools);
    }

    if (typeof requireFn === 'function') {
      try {
        const requiredManager = requireFn(
          './modules/app-core/runtime-shared-bootstrap-manager.js'
        );

        if (requiredManager) {
          managerCandidates.push(requiredManager);
        }
      } catch (runtimeSharedBootstrapManagerRequireError) {
        void runtimeSharedBootstrapManagerRequireError;
      }
    }

    for (let index = 0; index < loaderNamespaceCandidates.length; index += 1) {
      const scope = loaderNamespaceCandidates[index];

      if (!isObject(scope)) {
        continue;
      }

      try {
        const candidate = scope.cineCoreAppRuntimeSharedBootstrapManager;

        if (candidate) {
          managerCandidates.push(candidate);
        }
      } catch (runtimeSharedBootstrapManagerLookupError) {
        void runtimeSharedBootstrapManagerLookupError;
      }
    }

    for (let index = 0; index < managerCandidates.length; index += 1) {
      const candidate = managerCandidates[index];
      const resolved = attemptResolveWithManager(candidate, managerOptions);

      if (resolved && typeof resolved === 'object') {
        return resolved;
      }
    }

    return attemptResolveWithManager(
      {
        createRuntimeSharedBootstrapResult: function createRuntimeSharedBootstrapFallback() {
          return createInlineFallbackResult(bootstrapOptions);
        },
      },
      managerOptions
    );
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

  const namespaceName = 'cineCoreAppRuntimeSharedBootstrapResolver';

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
