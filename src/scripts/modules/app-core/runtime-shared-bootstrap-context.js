/*
 * Extracts the runtime shared bootstrap orchestration into a standalone
 * resolver. The logic mirrors the previous inline implementation but now lives
 * in a dedicated module so the core runtime file can continue shrinking without
 * sacrificing any of the defensive guards that protect offline access and
 * stored sessions.
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

  function fallbackResolveRuntimeSharedFromGlobal(scopes) {
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

  function ensureRuntimeSharedBootstrapResolver(tools) {
    if (tools && typeof tools.createRuntimeSharedBootstrapResult === 'function') {
      return tools.createRuntimeSharedBootstrapResult;
    }

    return null;
  }

  function createRuntimeSharedBootstrapContext(options) {
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

    const createRuntimeSharedBootstrapResult = ensureRuntimeSharedBootstrapResolver(
      options && options.runtimeSharedBootstrapResolverTools
    );

    const existingRuntimeSharedCandidate = isObject(options && options.currentRuntimeShared)
      ? options.currentRuntimeShared
      : null;

    let runtimeSharedBootstrapResult = null;

    if (createRuntimeSharedBootstrapResult) {
      try {
        runtimeSharedBootstrapResult = createRuntimeSharedBootstrapResult({
          runtimeSharedBootstrapTools: options && options.runtimeSharedBootstrapTools,
          runtimeSharedNamespaceTools: options && options.runtimeSharedNamespaceTools,
          runtimeSharedBootstrapInlineTools: options && options.runtimeSharedBootstrapInlineTools,
          runtimeSharedBootstrapResultTools: options && options.runtimeSharedBootstrapResultTools,
          runtimeSharedBootstrapLoaderTools: options && options.runtimeSharedBootstrapLoaderTools,
          runtimeSharedBootstrapManagerTools: options && options.runtimeSharedBootstrapManagerTools,
          resolveCoreSupportModule,
          requireFn,
          runtimeScope,
          coreGlobalScope,
          currentRuntimeShared: existingRuntimeSharedCandidate,
          fallbackScopes,
        });
      } catch (runtimeSharedBootstrapResolverError) {
        void runtimeSharedBootstrapResolverError;
      }
    }

    const runtimeSharedNamespace =
      runtimeSharedBootstrapResult && runtimeSharedBootstrapResult.runtimeSharedNamespace
        ? runtimeSharedBootstrapResult.runtimeSharedNamespace
        : null;

    const runtimeSharedResolver =
      runtimeSharedBootstrapResult &&
      typeof runtimeSharedBootstrapResult.runtimeSharedResolver === 'function'
        ? runtimeSharedBootstrapResult.runtimeSharedResolver
        : null;

    const existingRuntimeShared =
      (runtimeSharedBootstrapResult &&
      isObject(runtimeSharedBootstrapResult.existingRuntimeShared)
        ? runtimeSharedBootstrapResult.existingRuntimeShared
        : null) || existingRuntimeSharedCandidate;

    const resolveRuntimeSharedFromGlobal =
      runtimeSharedBootstrapResult &&
      typeof runtimeSharedBootstrapResult.fallbackResolveRuntimeSharedFromGlobal === 'function'
        ? runtimeSharedBootstrapResult.fallbackResolveRuntimeSharedFromGlobal
        : function fallbackRuntimeSharedResolver() {
            return fallbackResolveRuntimeSharedFromGlobal(fallbackScopes);
          };

    let runtimeShared =
      runtimeSharedBootstrapResult && isObject(runtimeSharedBootstrapResult.runtimeShared)
        ? runtimeSharedBootstrapResult.runtimeShared
        : null;

    if (!runtimeShared && isObject(existingRuntimeShared)) {
      runtimeShared = existingRuntimeShared;
    }

    if (!runtimeShared && runtimeSharedResolver) {
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
      } catch (runtimeSharedResolverError) {
        void runtimeSharedResolverError;
      }
    }

    if (!runtimeShared) {
      runtimeShared = resolveRuntimeSharedFromGlobal();
    }

    if (!isObject(runtimeShared)) {
      try {
        runtimeShared = Object.create(null);
      } catch (runtimeSharedCreationError) {
        void runtimeSharedCreationError;
        runtimeShared = {};
      }
    }

    return {
      runtimeSharedNamespace,
      runtimeSharedResolver,
      existingRuntimeShared,
      runtimeShared,
      fallbackResolveRuntimeSharedFromGlobal: resolveRuntimeSharedFromGlobal,
    };
  }

  const namespace = {
    createRuntimeSharedBootstrapContext,
  };

  const globalScope = detectScope();
  const namespaceName = 'cineCoreAppRuntimeSharedBootstrapContext';
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
