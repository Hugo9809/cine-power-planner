/*
 * Encapsulates the inline runtime shared bootstrap logic that previously lived
 * in the monolithic app core bundle. By exposing the behaviour through this
 * helper the main runtime stays leaner while the fallbacks that protect
 * autosave, backup and localisation data remain untouched. The module mirrors
 * the previous implementation, including the conservative error handling that
 * keeps offline usage resilient.
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

  function attemptRuntimeSharedBootstrap(tools, runtimeOptions) {
    if (!isObject(tools)) {
      return null;
    }

    const createRuntimeSharedBootstrap = tools.createRuntimeSharedBootstrap;

    if (typeof createRuntimeSharedBootstrap !== 'function') {
      return null;
    }

    try {
      return createRuntimeSharedBootstrap(runtimeOptions);
    } catch (runtimeSharedBootstrapError) {
      void runtimeSharedBootstrapError;
    }

    return null;
  }

  function attemptRuntimeSharedBootstrapWithRequire(requireFn, runtimeOptions, candidatePaths) {
    if (typeof requireFn !== 'function') {
      return null;
    }

    const paths = Array.isArray(candidatePaths) && candidatePaths.length
      ? candidatePaths
      : [
          './modules/app-core/runtime-shared-bootstrap.js',
          './runtime-shared-bootstrap.js',
        ];

    for (let index = 0; index < paths.length; index += 1) {
      const path = paths[index];

      if (typeof path !== 'string' || !path) {
        continue;
      }

      try {
        const required = requireFn(path);

        if (isObject(required) && typeof required.createRuntimeSharedBootstrap === 'function') {
          return required.createRuntimeSharedBootstrap(runtimeOptions);
        }
      } catch (runtimeSharedBootstrapRequireError) {
        void runtimeSharedBootstrapRequireError;
      }
    }

    return null;
  }

  function appendScope(scopes, scope) {
    if (!Array.isArray(scopes)) {
      return;
    }

    if (!isObject(scope)) {
      return;
    }

    if (scopes.indexOf(scope) !== -1) {
      return;
    }

    scopes.push(scope);
  }

  function gatherFallbackScopes(options) {
    const scopes = [];

    appendScope(scopes, options && options.runtimeScope);
    appendScope(scopes, options && options.coreGlobalScope);

    const optionFallbacks = options && options.fallbackScopes;

    if (Array.isArray(optionFallbacks)) {
      for (let index = 0; index < optionFallbacks.length; index += 1) {
        appendScope(scopes, optionFallbacks[index]);
      }
    }

    appendScope(scopes, typeof globalThis !== 'undefined' ? globalThis : null);
    appendScope(scopes, typeof window !== 'undefined' ? window : null);
    appendScope(scopes, typeof self !== 'undefined' ? self : null);
    appendScope(scopes, typeof global !== 'undefined' ? global : null);

    return scopes;
  }

  function createScopedRuntimeSharedResolver(scopes) {
    return function fallbackResolveRuntimeSharedFromGlobal() {
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

  function ensureRuntimeShared(candidate, fallbackResolve) {
    if (isObject(candidate)) {
      return candidate;
    }

    const fallbackCandidate = typeof fallbackResolve === 'function'
      ? fallbackResolve()
      : null;

    if (isObject(fallbackCandidate)) {
      return fallbackCandidate;
    }

    try {
      return Object.create(null);
    } catch (createError) {
      void createError;
    }

    return {};
  }

  function detectGlobalScope(primaryScope) {
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

    return detectGlobalScope(fallbackScope);
  }

  function createRuntimeSharedBootstrapResult(options) {
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);

    const runtimeOptions = {
      runtimeSharedNamespaceTools: options && options.runtimeSharedNamespaceTools,
      resolveCoreSupportModule: options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope,
      currentRuntimeShared: options && options.currentRuntimeShared,
    };

    const runtimeSharedBootstrapTools = options && options.runtimeSharedBootstrapTools;

    const runtimeSharedBootstrapResult =
      attemptRuntimeSharedBootstrap(runtimeSharedBootstrapTools, runtimeOptions) ||
      attemptRuntimeSharedBootstrapWithRequire(requireFn, runtimeOptions, options && options.requirePaths);

    if (runtimeSharedBootstrapResult) {
      return runtimeSharedBootstrapResult;
    }

    const fallbackScopes = gatherFallbackScopes({
      runtimeScope,
      coreGlobalScope,
      fallbackScopes: options && options.fallbackScopes,
    });

    const fallbackResolve = createScopedRuntimeSharedResolver(fallbackScopes);
    const runtimeShared = ensureRuntimeShared(options && options.currentRuntimeShared, fallbackResolve);

    return {
      runtimeSharedNamespace: null,
      runtimeSharedResolver: null,
      existingRuntimeShared: runtimeShared,
      runtimeShared,
      fallbackResolveRuntimeSharedFromGlobal: fallbackResolve,
    };
  }

  const namespace = {
    createRuntimeSharedBootstrapResult,
  };

  const globalScope = detectGlobalScope();
  const namespaceName = 'cineCoreAppRuntimeSharedBootstrapInline';
  const existing = isObject(globalScope) && isObject(globalScope[namespaceName])
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
