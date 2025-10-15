/*
 * Consolidates the modern app core runtime helper modules into one file.
 *
 * The refactor originally exploded the runtime section into many pieces so we
 * could track incremental changes. We now merge them back together to make the
 * ongoing cleanup easier to manage while keeping the runtime behaviour
 * identical. Each previous runtime helper is appended verbatim to preserve every
 * safeguard around backups, autosave, offline usage and global scope detection.
 */
/* global cineCoreRuntimeModuleLoader, requireCoreRuntimeModule */
/*
 * Consolidates the logic that resolves the shared runtime helpers used by the
 * modern app core. Moving this resolver into its own module keeps the main
 * runtime file smaller while we continue the long term refactor.
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

  function resolveRuntimeModuleLoader() {
    if (typeof require === 'function') {
      try {
        const requiredLoader = require('../core/runtime-module-loader.js');
        if (requiredLoader && typeof requiredLoader === 'object') {
          return requiredLoader;
        }
      } catch (runtimeLoaderError) {
        void runtimeLoaderError;
      }
    }

    if (
      typeof cineCoreRuntimeModuleLoader !== 'undefined' &&
      cineCoreRuntimeModuleLoader &&
      typeof cineCoreRuntimeModuleLoader === 'object'
    ) {
      return cineCoreRuntimeModuleLoader;
    }

    const scope = detectScope();
    if (
      scope &&
      typeof scope.cineCoreRuntimeModuleLoader === 'object' &&
      scope.cineCoreRuntimeModuleLoader
    ) {
      return scope.cineCoreRuntimeModuleLoader;
    }

    return null;
  }

  function requireCoreRuntimeModule(moduleId, options) {
    const loader = resolveRuntimeModuleLoader();
    if (
      loader &&
      typeof loader.resolveCoreRuntimeModule === 'function'
    ) {
      try {
        return loader.resolveCoreRuntimeModule(moduleId, options);
      } catch (moduleResolutionError) {
        void moduleResolutionError;
      }
    }

    return null;
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

  function registerScope(scopes, scope) {
    if (!isObject(scope)) {
      return;
    }

    if (scopes.indexOf(scope) === -1) {
      scopes.push(scope);
    }
  }

  function collectCandidateScopes(primaryScope, secondaryScope) {
    const scopes = [];
    registerScope(scopes, primaryScope);
    registerScope(scopes, secondaryScope);
    registerScope(scopes, typeof globalThis !== 'undefined' ? globalThis : null);
    registerScope(scopes, typeof window !== 'undefined' ? window : null);
    registerScope(scopes, typeof self !== 'undefined' ? self : null);
    registerScope(scopes, typeof global !== 'undefined' ? global : null);
    return scopes;
  }

  function resolveRuntimeShared(options) {
    const currentShared =
      options && isObject(options.currentShared) ? options.currentShared : null;

    if (currentShared) {
      return currentShared;
    }

    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(
      options && options.coreGlobalScope,
      runtimeScope
    );
    const resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );

    let shared = null;

    if (resolveCoreSupportModule) {
      try {
        shared = resolveCoreSupportModule(
          'cineCoreRuntimeShared',
          './modules/core/runtime-shared.js'
        );
      } catch (runtimeSharedResolveError) {
        void runtimeSharedResolveError;
        shared = null;
      }
    }

    if (!isObject(shared)) {
      const loaderShared = requireCoreRuntimeModule(
        'modules/core/runtime-shared.js',
        { primaryScope: runtimeScope || coreGlobalScope }
      );
      if (isObject(loaderShared)) {
        shared = loaderShared;
      }
    }

    if (isObject(shared)) {
      return shared;
    }

    const fallbackScopes = collectCandidateScopes(coreGlobalScope, runtimeScope);

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];

      try {
        const candidate = scope && scope.cineCoreRuntimeShared;
        if (isObject(candidate)) {
          return candidate;
        }
      } catch (runtimeSharedLookupError) {
        void runtimeSharedLookupError;
      }
    }

    return null;
  }

  const namespace = {
    resolveRuntimeShared,
  };

  const globalScope = detectScope();
  const namespaceName = 'cineCoreAppRuntimeShared';
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
          './modules/app-core/runtime.js'
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
          './modules/app-core/runtime.js',
          './runtime.js',
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
        : './modules/app-core/runtime.js';
    const resultModulePath =
      options && typeof options.resultModulePath === 'string' && options.resultModulePath
        ? options.resultModulePath
        : './modules/app-core/runtime.js';

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
        : './modules/app-core/runtime.js';

    const resultModulePath =
      typeof normalizedOptions.resultModulePath === 'string'
        ? normalizedOptions.resultModulePath
        : typeof loaderOptions.resultModulePath === 'string'
        ? loaderOptions.resultModulePath
        : './modules/app-core/runtime.js';

    const inlineModulePath =
      typeof normalizedOptions.inlineModulePath === 'string'
        ? normalizedOptions.inlineModulePath
        : typeof loaderOptions.inlineRequirePath === 'string'
        ? loaderOptions.inlineRequirePath
        : './modules/app-core/runtime.js';

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
      inlineRequirePath: './modules/app-core/runtime.js',
      resultModulePath: './modules/app-core/runtime.js',
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
      loaderModulePath: './modules/app-core/runtime.js',
      resultModulePath: './modules/app-core/runtime.js',
      inlineModulePath: './modules/app-core/runtime.js',
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
          './modules/app-core/runtime.js'
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
        : './modules/app-core/runtime.js';

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
/* global CORE_GLOBAL_SCOPE */

(function initRuntimeSharedNamespaceModule(rootScope) {
  'use strict';

  function safeArrayMerge(primary, secondary) {
    const result = [];
    const seen = new Set();

    function appendValues(list) {
      if (!Array.isArray(list)) {
        return;
      }

      for (let index = 0; index < list.length; index += 1) {
        const value = list[index];
        if (value && typeof value === 'object' && !seen.has(value)) {
          seen.add(value);
          result.push(value);
        }
      }
    }

    appendValues(primary);
    appendValues(secondary);

    return result;
  }

  function collectFallbackScopes(options) {
    const fallbackScopes = [];

    const runtimeScope = options && options.runtimeScope ? options.runtimeScope : null;
    const coreGlobalScope = options && options.coreGlobalScope ? options.coreGlobalScope : null;

    const candidates = [
      runtimeScope,
      coreGlobalScope,
      rootScope && typeof rootScope === 'object' ? rootScope : null,
      typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object'
        ? globalThis
        : null,
      typeof window !== 'undefined' && window && typeof window === 'object' ? window : null,
      typeof self !== 'undefined' && self && typeof self === 'object' ? self : null,
      typeof global !== 'undefined' && global && typeof global === 'object' ? global : null,
    ];

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate && typeof candidate === 'object' && fallbackScopes.indexOf(candidate) === -1) {
        fallbackScopes.push(candidate);
      }
    }

    if (options && Array.isArray(options.additionalScopes)) {
      return safeArrayMerge(fallbackScopes, options.additionalScopes);
    }

    return fallbackScopes;
  }

  function fallbackResolveRuntimeSharedFromScopes(scopes) {
    const scopeList = Array.isArray(scopes) ? scopes : [];

    for (let index = 0; index < scopeList.length; index += 1) {
      const scope = scopeList[index];
      if (!scope || typeof scope !== 'object') {
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
  }

  function attemptResolveSupportModule(identifier, fallbackPath, options) {
    const resolveCoreSupportModule =
      options && typeof options.resolveCoreSupportModule === 'function'
        ? options.resolveCoreSupportModule
        : null;
    const requireFn = options && typeof options.requireFn === 'function' ? options.requireFn : null;

    if (resolveCoreSupportModule) {
      try {
        const resolved = resolveCoreSupportModule(identifier, fallbackPath);
        if (resolved && typeof resolved === 'object') {
          return resolved;
        }
      } catch (moduleResolutionError) {
        void moduleResolutionError;
      }
    }

    if (requireFn) {
      try {
        const required = requireFn(fallbackPath);
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (moduleRequireError) {
        void moduleRequireError;
      }
    }

    return null;
  }

  function createMinimalRuntimeSharedNamespace(options, fallbackScopes) {
    const scopeList = Array.isArray(fallbackScopes) ? fallbackScopes.slice() : [];
    const existingRuntimeShared =
      options && options.currentRuntimeShared ? options.currentRuntimeShared : null;

    function resolveFromScopes() {
      return fallbackResolveRuntimeSharedFromScopes(scopeList);
    }

    const resolvedRuntimeShared = existingRuntimeShared || resolveFromScopes();

    return {
      runtimeShared:
        resolvedRuntimeShared && typeof resolvedRuntimeShared === 'object'
          ? resolvedRuntimeShared
          : Object.create(null),
      existingRuntimeShared:
        resolvedRuntimeShared && typeof resolvedRuntimeShared === 'object'
          ? resolvedRuntimeShared
          : existingRuntimeShared,
      runtimeSharedResolver: null,
      fallbackResolveRuntimeSharedFromGlobal: resolveFromScopes,
    };
  }

  function createRuntimeSharedNamespace(options) {
    const safeOptions = Object.assign(
      {
        resolveCoreSupportModule: null,
        requireFn: null,
        runtimeScope: null,
        coreGlobalScope: null,
        currentRuntimeShared: null,
        additionalScopes: null,
      },
      options || {}
    );

    const runtimeSharedTools = attemptResolveSupportModule(
      'cineCoreAppRuntimeShared',
      './runtime.js',
      safeOptions
    );

    let runtimeSharedResolver = null;

    if (
      runtimeSharedTools &&
      typeof runtimeSharedTools.resolveRuntimeShared === 'function'
    ) {
      runtimeSharedResolver = runtimeSharedTools.resolveRuntimeShared;
    } else if (safeOptions && typeof safeOptions.requireFn === 'function') {
      try {
        const requiredRuntimeSharedTools = safeOptions.requireFn('./runtime.js');
        if (
          requiredRuntimeSharedTools &&
          typeof requiredRuntimeSharedTools.resolveRuntimeShared === 'function'
        ) {
          runtimeSharedResolver = requiredRuntimeSharedTools.resolveRuntimeShared;
        }
      } catch (runtimeSharedToolsRequireError) {
        void runtimeSharedToolsRequireError;
      }
    }

    const fallbackScopes = collectFallbackScopes(safeOptions);
    const fallbackRuntimeShared = fallbackResolveRuntimeSharedFromScopes(fallbackScopes);

    const runtimeShared =
      safeOptions.currentRuntimeShared ||
      (runtimeSharedResolver
        ? runtimeSharedResolver({
            currentShared: safeOptions.currentRuntimeShared,
            resolveCoreSupportModule: safeOptions.resolveCoreSupportModule,
            requireFn: safeOptions.requireFn,
            runtimeScope: safeOptions.runtimeScope,
            coreGlobalScope: safeOptions.coreGlobalScope,
          })
        : fallbackRuntimeShared);

    if (!runtimeShared || typeof runtimeShared !== 'object') {
      return createMinimalRuntimeSharedNamespace(safeOptions, fallbackScopes);
    }

    if (
      runtimeShared &&
      typeof runtimeShared === 'object' &&
      typeof runtimeShared.attachRuntimeSharedNamespace === 'function'
    ) {
      try {
        runtimeShared.attachRuntimeSharedNamespace({
          fallbackResolveRuntimeSharedFromGlobal() {
            return fallbackResolveRuntimeSharedFromScopes(fallbackScopes);
          },
        });
      } catch (runtimeSharedAttachError) {
        void runtimeSharedAttachError;
      }
    }

    return {
      runtimeShared,
      existingRuntimeShared: safeOptions.currentRuntimeShared,
      runtimeSharedResolver,
      fallbackResolveRuntimeSharedFromGlobal() {
        return fallbackResolveRuntimeSharedFromScopes(fallbackScopes);
      },
    };
  }

  const runtimeSharedNamespaceApi = {
    createRuntimeSharedNamespace,
  };

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = runtimeSharedNamespaceApi;
  }

  const globalTargets = safeArrayMerge(
    [
      rootScope && typeof rootScope === 'object' ? rootScope : null,
      typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object'
        ? globalThis
        : null,
      typeof window !== 'undefined' && window && typeof window === 'object' ? window : null,
      typeof self !== 'undefined' && self && typeof self === 'object' ? self : null,
    ],
    null
  );

  for (let index = 0; index < globalTargets.length; index += 1) {
    const target = globalTargets[index];
    if (!target || typeof target !== 'object') {
      continue;
    }

    if (!target.cineCoreAppRuntimeSharedNamespace) {
      try {
        Object.defineProperty(target, 'cineCoreAppRuntimeSharedNamespace', {
          configurable: true,
          enumerable: false,
          writable: true,
          value: runtimeSharedNamespaceApi,
        });
      } catch (defineError) {
        void defineError;
        try {
          target.cineCoreAppRuntimeSharedNamespace = runtimeSharedNamespaceApi;
        } catch (assignError) {
          void assignError;
        }
      }
    }
  }
})(typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : void 0);
/*
 * Crew selector helpers extracted from the monolithic app core runtime.
 *
 * This module encapsulates the DOM-heavy logic that populates and formats the
 * Auto Gear crew multiselect so that the main runtime bundle can continue to
 * shrink without sacrificing behaviour. The helpers accept their dependencies
 * through an options object which keeps the code flexible during the ongoing
 * refactor while still supporting the legacy global execution environment.
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

  function ensureDocument(candidate) {
    if (candidate && typeof candidate.createElement === 'function') {
      return candidate;
    }

    if (typeof document !== 'undefined' && document && typeof document.createElement === 'function') {
      return document;
    }

    return null;
  }

  function defaultCollectSelectedValues() {
    return [];
  }

  function defaultComputeMultiSelectSize(optionCount) {
    if (!Number.isFinite(optionCount) || optionCount <= 0) {
      return 1;
    }
    return Math.max(1, Math.min(optionCount, 10));
  }

  function defaultGetCrewRoleEntries() {
    return [];
  }

  function defaultGetLocalizedTexts() {
    return {};
  }

  function defaultGetDefaultLanguageTexts() {
    return {};
  }

  function createAutoGearCrewOptionHelpers(options) {
    const documentRef = ensureDocument(options && options.documentRef);
    const collectSelectedValues =
      (options && typeof options.collectSelectedValues === 'function'
        ? options.collectSelectedValues
        : defaultCollectSelectedValues);
    const computeMultiSelectSize =
      (options && typeof options.computeMultiSelectSize === 'function'
        ? options.computeMultiSelectSize
        : defaultComputeMultiSelectSize);
    const getCrewRoleEntries =
      (options && typeof options.getCrewRoleEntries === 'function'
        ? options.getCrewRoleEntries
        : defaultGetCrewRoleEntries);
    const minRows =
      options && Number.isFinite(options.autoGearFlexMinRows) && options.autoGearFlexMinRows > 0
        ? options.autoGearFlexMinRows
        : 1;
    const getLocalizedTexts =
      (options && typeof options.getLocalizedTexts === 'function'
        ? options.getLocalizedTexts
        : defaultGetLocalizedTexts);
    const getDefaultLanguageTexts =
      (options && typeof options.getDefaultLanguageTexts === 'function'
        ? options.getDefaultLanguageTexts
        : defaultGetDefaultLanguageTexts);

    function refreshCrewOptions(selectElement, selected, key) {
      if (!selectElement || !documentRef) {
        return;
      }

      const selectedValues = collectSelectedValues(selected, key);

      selectElement.innerHTML = '';
      selectElement.multiple = true;

      const entries = getCrewRoleEntries();
      const seen = new Set();

      const appendOption = (value, label) => {
        if (!value || seen.has(value)) {
          return;
        }
        const option = documentRef.createElement('option');
        option.value = value;
        option.textContent = label;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        selectElement.appendChild(option);
        seen.add(value);
      };

      (Array.isArray(entries) ? entries : []).forEach(entry => {
        if (!entry) return;
        appendOption(entry.value, entry.label);
      });

      selectedValues.forEach(value => {
        if (!seen.has(value)) {
          appendOption(value, value);
        }
      });

      const selectableOptions = Array.from(selectElement.options || []).filter(option => !option.disabled);
      selectElement.size = computeMultiSelectSize(selectableOptions.length, { minRows });
    }

    function getCrewRoleLabel(value) {
      if (typeof value !== 'string') {
        return '';
      }
      const trimmed = value.trim();
      if (!trimmed) {
        return '';
      }

      const langTexts = getLocalizedTexts() || {};
      const fallbackTexts = getDefaultLanguageTexts() || {};
      const crewRoleMap = langTexts.crewRoles || fallbackTexts.crewRoles || {};
      return crewRoleMap[trimmed] || trimmed;
    }

    return {
      refreshCrewOptions,
      getCrewRoleLabel,
    };
  }

  const namespace = {
    createAutoGearCrewOptionHelpers,
  };

  const globalScope = detectScope();

  if (isObject(globalScope)) {
    const existing =
      isObject(globalScope.cineCoreAppRuntimeAutoGearCrew)
        ? globalScope.cineCoreAppRuntimeAutoGearCrew
        : {};

    Object.assign(existing, namespace);

    try {
      globalScope.cineCoreAppRuntimeAutoGearCrew = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();

/*
 * Provides runtime candidate scope helpers for the modern app core.
 *
 * The previous monolithic app core embedded an extensive set of helpers
 * that guarded the candidate scope list, synchronised it with the shared
 * runtime namespace and ensured global fallbacks remained available.  The
 * refactor moves that behaviour into this dedicated module so the core
 * bundle can continue to shrink while the split progresses.
 */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function isScopeList(candidate) {
    return !!candidate && typeof candidate.length === 'number';
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

  function ensureScope(candidate, fallback) {
    if (isObject(candidate)) {
      return candidate;
    }

    return detectScope(fallback);
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

    return null;
  }

  function createFallbackRuntimeCandidateScopeSupport(options) {
    const runtimeShared = options && options.runtimeShared;
    const environmentHelpers = options && options.environmentHelpers;

    function registerScope(scopes, seenScopes, scope) {
      if (!Array.isArray(scopes)) {
        return;
      }

      if (!isObject(scope)) {
        return;
      }

      if (seenScopes) {
        if (seenScopes.has(scope)) {
          return;
        }

        seenScopes.add(scope);
        scopes.push(scope);
        return;
      }

      if (scopes.indexOf(scope) !== -1) {
        return;
      }

      scopes.push(scope);
    }

    function detectFallbackGlobalScope(primaryScope) {
      return (
        detectScope(primaryScope) ||
        (typeof window !== 'undefined' && isObject(window) ? window : null) ||
        (typeof self !== 'undefined' && isObject(self) ? self : null) ||
        (typeof global !== 'undefined' && isObject(global) ? global : null) ||
        null
      );
    }

    function fallbackCollectCandidateScopes(primaryScope) {
      if (
        runtimeShared &&
        typeof runtimeShared.collectCandidateScopes === 'function'
      ) {
        try {
          const sharedScopes = runtimeShared.collectCandidateScopes(
            primaryScope,
            environmentHelpers
          );
          if (Array.isArray(sharedScopes)) {
            return sharedScopes;
          }
        } catch (collectRuntimeScopesError) {
          void collectRuntimeScopesError;
        }
      }

      const scopes = [];
      const seenScopes = typeof Set === 'function' ? new Set() : null;

      registerScope(scopes, seenScopes, primaryScope);
      registerScope(scopes, seenScopes, typeof globalThis !== 'undefined' ? globalThis : null);
      registerScope(scopes, seenScopes, typeof window !== 'undefined' ? window : null);
      registerScope(scopes, seenScopes, typeof self !== 'undefined' ? self : null);
      registerScope(scopes, seenScopes, typeof global !== 'undefined' ? global : null);

      return scopes;
    }

    function fallbackResolveCandidateScopes(resolveOptions) {
      const options = resolveOptions || {};
      const primaryScope = options.primaryScope;
      const currentCandidateScopes = options.currentCandidateScopes;

      if (isScopeList(currentCandidateScopes)) {
        return currentCandidateScopes;
      }

      let resolvedScopes = null;

      if (
        runtimeShared &&
        typeof runtimeShared.resolveCandidateScopes === 'function'
      ) {
        try {
          resolvedScopes = runtimeShared.resolveCandidateScopes(
            primaryScope,
            environmentHelpers
          );
        } catch (resolveCandidateScopesError) {
          void resolveCandidateScopesError;
          resolvedScopes = null;
        }
      }

      if (!isScopeList(resolvedScopes)) {
        resolvedScopes = fallbackCollectCandidateScopes(primaryScope);
      }

      return resolvedScopes;
    }

    function fallbackSyncCandidateScopes(candidateScopes, syncOptions) {
      const options = syncOptions || {};
      const primaryScope = options.primaryScope;
      const globalScope =
        (options && isObject(options.globalScope) ? options.globalScope : null) ||
        detectFallbackGlobalScope(primaryScope);
      const assignCurrentCandidateScopes = options.assignCurrentCandidateScopes;

      if (
        runtimeShared &&
        typeof runtimeShared.syncCandidateScopes === 'function'
      ) {
        try {
          runtimeShared.syncCandidateScopes(
            candidateScopes,
            primaryScope,
            environmentHelpers
          );
          return candidateScopes;
        } catch (syncCandidateScopesError) {
          void syncCandidateScopesError;
        }
      }

      if (
        isObject(globalScope) &&
        (!globalScope.CORE_RUNTIME_CANDIDATE_SCOPES ||
          globalScope.CORE_RUNTIME_CANDIDATE_SCOPES !== candidateScopes)
      ) {
        try {
          globalScope.CORE_RUNTIME_CANDIDATE_SCOPES = candidateScopes;
        } catch (assignError) {
          void assignError;
        }
      }

      if (typeof assignCurrentCandidateScopes === 'function') {
        try {
          assignCurrentCandidateScopes(candidateScopes);
        } catch (candidateAssignError) {
          void candidateAssignError;
        }
      }

      return candidateScopes;
    }

    function fallbackEnsureCandidateScopes(ensureOptions) {
      const resolvedScopes = fallbackResolveCandidateScopes(ensureOptions || {});
      return fallbackSyncCandidateScopes(resolvedScopes, ensureOptions || {});
    }

    return {
      collectCandidateScopes: fallbackCollectCandidateScopes,
      collectCandidateScopesWithFallback: fallbackCollectCandidateScopes,
      resolveCandidateScopes: fallbackResolveCandidateScopes,
      syncCandidateScopes: fallbackSyncCandidateScopes,
      ensureCandidateScopes: fallbackEnsureCandidateScopes,
    };
  }

  function resolveCoreCandidateScopeBridge(
    resolveCoreSupportModule,
    requireFn,
    runtimeScope,
    coreGlobalScope
  ) {
    if (typeof resolveCoreSupportModule === 'function') {
      try {
        const resolved = resolveCoreSupportModule(
          'cineCoreRuntimeCandidateScopes',
          './modules/core/runtime-candidate-scopes.js'
        );
        if (isObject(resolved)) {
          return resolved;
        }
      } catch (candidateScopeResolveError) {
        void candidateScopeResolveError;
      }
    }

    const loaderCandidateScopes = requireCoreRuntimeModule(
      'modules/core/runtime-candidate-scopes.js',
      { primaryScope: runtimeScope || coreGlobalScope }
    );
    if (isObject(loaderCandidateScopes)) {
      return loaderCandidateScopes;
    }

    const candidateScopes = [];
    if (isObject(runtimeScope)) {
      candidateScopes.push(runtimeScope);
    }
    if (isObject(coreGlobalScope) && candidateScopes.indexOf(coreGlobalScope) === -1) {
      candidateScopes.push(coreGlobalScope);
    }
    candidateScopes.push(
      typeof globalThis !== 'undefined' ? globalThis : null,
      typeof window !== 'undefined' ? window : null,
      typeof self !== 'undefined' ? self : null,
      typeof global !== 'undefined' ? global : null
    );

    for (let index = 0; index < candidateScopes.length; index += 1) {
      const scope = candidateScopes[index];
      if (!isObject(scope)) {
        continue;
      }

      try {
        const candidate = scope.cineCoreRuntimeCandidateScopes;
        if (isObject(candidate)) {
          return candidate;
        }
      } catch (candidateScopeLookupError) {
        void candidateScopeLookupError;
      }
    }

    return null;
  }

  function resolveRuntimeCandidateScopeSupport(options) {
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = ensureScope(options && options.runtimeScope);
    const coreGlobalScope = ensureScope(options && options.coreGlobalScope, runtimeScope);
    const runtimeShared = options && options.runtimeShared;
    const environmentHelpers = options && options.environmentHelpers;

    const resolveCoreSupportModule = ensureResolveCoreSupportModule(
      options && options.resolveCoreSupportModule,
      requireFn,
      runtimeScope || coreGlobalScope
    );

    const fallbackSupport = createFallbackRuntimeCandidateScopeSupport({
      runtimeShared,
      environmentHelpers,
    });

    const bridge = resolveCoreCandidateScopeBridge(
      resolveCoreSupportModule,
      requireFn,
      runtimeScope,
      coreGlobalScope
    );

    function mergeOptions(baseOptions) {
      const merged = Object.assign({}, baseOptions || {});

      if (typeof merged.runtimeShared === 'undefined') {
        merged.runtimeShared = runtimeShared;
      }

      if (typeof merged.environmentHelpers === 'undefined') {
        merged.environmentHelpers = environmentHelpers;
      }

      return merged;
    }

    function collectCandidateScopes(primaryScope) {
      if (isObject(bridge)) {
        if (typeof bridge.collectCandidateScopesWithFallback === 'function') {
          try {
            const collected = bridge.collectCandidateScopesWithFallback(
              primaryScope,
              runtimeShared,
              environmentHelpers
            );
            if (Array.isArray(collected)) {
              return collected;
            }
          } catch (collectCandidateScopesError) {
            void collectCandidateScopesError;
          }
        }

        if (typeof bridge.collectCandidateScopes === 'function') {
          try {
            const collected = bridge.collectCandidateScopes(
              primaryScope,
              runtimeShared,
              environmentHelpers
            );
            if (Array.isArray(collected)) {
              return collected;
            }
          } catch (collectCandidateScopesFallbackError) {
            void collectCandidateScopesFallbackError;
          }
        }
      }

      return fallbackSupport.collectCandidateScopes(primaryScope);
    }

    function resolveCandidateScopes(resolveOptions) {
      const optionsWithDefaults = mergeOptions(resolveOptions);

      if (isObject(bridge) && typeof bridge.resolveCandidateScopes === 'function') {
        try {
          const resolved = bridge.resolveCandidateScopes(optionsWithDefaults);
          if (isScopeList(resolved)) {
            return resolved;
          }
        } catch (resolveCandidateScopesError) {
          void resolveCandidateScopesError;
        }
      }

      return fallbackSupport.resolveCandidateScopes(optionsWithDefaults);
    }

    function syncCandidateScopes(candidateScopes, syncOptions) {
      const optionsWithDefaults = mergeOptions(syncOptions);

      if (isObject(bridge) && typeof bridge.syncCandidateScopes === 'function') {
        try {
          const synced = bridge.syncCandidateScopes(
            candidateScopes,
            optionsWithDefaults
          );

          if (isScopeList(synced)) {
            return synced;
          }

          if (typeof synced === 'undefined') {
            return candidateScopes;
          }

          return synced;
        } catch (syncCandidateScopesError) {
          void syncCandidateScopesError;
        }
      }

      return fallbackSupport.syncCandidateScopes(candidateScopes, optionsWithDefaults);
    }

    function ensureCandidateScopes(ensureOptions) {
      const optionsWithDefaults = mergeOptions(ensureOptions);

      if (isObject(bridge) && typeof bridge.ensureCandidateScopes === 'function') {
        try {
          const ensured = bridge.ensureCandidateScopes(optionsWithDefaults);
          if (isScopeList(ensured)) {
            return ensured;
          }
        } catch (ensureCandidateScopesError) {
          void ensureCandidateScopesError;
        }
      }

      const resolved = resolveCandidateScopes(optionsWithDefaults);
      return syncCandidateScopes(resolved, optionsWithDefaults);
    }

    return {
      collectCandidateScopes,
      collectCandidateScopesWithFallback: collectCandidateScopes,
      resolveCandidateScopes,
      syncCandidateScopes,
      ensureCandidateScopes,
    };
  }

  const namespace = {
    resolveRuntimeCandidateScopeSupport,
    createFallbackRuntimeCandidateScopeSupport,
  };

  const globalScope = detectScope();
  const namespaceName = 'cineCoreAppRuntimeCandidateScopeSupport';
  const existing = isObject(globalScope) && isObject(globalScope[namespaceName])
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
 * Provides light-weight wrappers that coordinate the runtime candidate scope
 * helpers. Moving this coordination logic out of the app core keeps the
 * orchestrating bundle smaller while retaining the protective fallbacks that
 * guard offline usage, autosave and restoration flows.
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

  function tryCollectWithSupport(support, primaryScope) {
    if (!isObject(support)) {
      return null;
    }

    if (typeof support.collectCandidateScopes !== 'function') {
      return null;
    }

    try {
      const collected = support.collectCandidateScopes(primaryScope);
      return Array.isArray(collected) ? collected : null;
    } catch (collectError) {
      void collectError;
    }

    return null;
  }

  function tryEnsureWithSupport(support, options) {
    if (!isObject(support)) {
      return null;
    }

    if (typeof support.ensureCandidateScopes !== 'function') {
      return null;
    }

    try {
      const ensured = support.ensureCandidateScopes(options);
      return Array.isArray(ensured) ? ensured : null;
    } catch (ensureError) {
      void ensureError;
    }

    return null;
  }

  function createRuntimeCandidateScopeResolvers(options) {
    const runtimeSupport =
      options && options.runtimeCandidateScopeSupport
        ? options.runtimeCandidateScopeSupport
        : null;
    const fallbackSupport =
      options && options.fallbackRuntimeCandidateScopeSupport
        ? options.fallbackRuntimeCandidateScopeSupport
        : null;

    function inlineCollectCoreRuntimeCandidateScopes(primaryScope) {
      const collected = tryCollectWithSupport(runtimeSupport, primaryScope);
      if (collected) {
        return collected;
      }

      const fallbackCollected = tryCollectWithSupport(fallbackSupport, primaryScope);
      if (fallbackCollected) {
        return fallbackCollected;
      }

      return [];
    }

    function inlineEnsureCoreRuntimeCandidateScopes(ensureOptions) {
      const options = ensureOptions && typeof ensureOptions === 'object' ? ensureOptions : {};

      const ensured = tryEnsureWithSupport(runtimeSupport, options);
      if (ensured && ensured.length) {
        return ensured;
      }

      const fallbackEnsured = tryEnsureWithSupport(fallbackSupport, options);
      if (fallbackEnsured && fallbackEnsured.length) {
        return fallbackEnsured;
      }

      return inlineCollectCoreRuntimeCandidateScopes(options.primaryScope);
    }

    return {
      collectCoreRuntimeCandidateScopes: inlineCollectCoreRuntimeCandidateScopes,
      ensureCoreRuntimeCandidateScopes: inlineEnsureCoreRuntimeCandidateScopes,
    };
  }

  const namespace = {
    createRuntimeCandidateScopeResolvers,
  };

  const namespaceName = 'cineCoreAppRuntimeCandidateScopeResolvers';
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
/*
 * Exposes the runtime candidate scope fallback helpers that previously lived
 * inside the large modern app core bundle. Moving the implementation here keeps
 * the orchestrator leaner while ensuring offline capability, backup routines
 * and user data protections remain untouched.
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

  function createRuntimeCandidateScopeSupportFallback(options) {
    const runtimeShared = options && options.runtimeShared;
    const environmentHelpers = options && options.environmentHelpers;
    const candidateScopeBridge = options && options.candidateScopeBridge;
    const corePartRuntimeScope = options && options.corePartRuntimeScope;
    const coreGlobalScope = options && options.coreGlobalScope;

    function isValidScope(scope) {
      return !!scope && (typeof scope === 'object' || typeof scope === 'function');
    }

    function ensureScopes(primaryScope) {
      const scopes = [];
      const seen = typeof Set === 'function' ? new Set() : null;

      function register(scope) {
        if (!isValidScope(scope)) {
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

      register(primaryScope);
      register(corePartRuntimeScope);
      register(coreGlobalScope);
      register(typeof globalThis !== 'undefined' ? globalThis : null);
      register(typeof window !== 'undefined' ? window : null);
      register(typeof self !== 'undefined' ? self : null);
      register(typeof global !== 'undefined' ? global : null);

      return scopes;
    }

    function collectCandidateScopes(primaryScope) {
      if (
        candidateScopeBridge &&
        typeof candidateScopeBridge.collectCandidateScopesWithFallback === 'function'
      ) {
        try {
          const collected =
            candidateScopeBridge.collectCandidateScopesWithFallback(
              primaryScope,
              runtimeShared,
              environmentHelpers
            );
          if (Array.isArray(collected)) {
            return collected;
          }
        } catch (collectCandidateScopesError) {
          void collectCandidateScopesError;
        }
      }

      if (
        candidateScopeBridge &&
        typeof candidateScopeBridge.collectCandidateScopes === 'function'
      ) {
        try {
          const collected = candidateScopeBridge.collectCandidateScopes(
            primaryScope,
            runtimeShared,
            environmentHelpers
          );
          if (Array.isArray(collected)) {
            return collected;
          }
        } catch (collectCandidateScopesFallbackError) {
          void collectCandidateScopesFallbackError;
        }
      }

      if (runtimeShared && typeof runtimeShared.collectCandidateScopes === 'function') {
        try {
          const sharedScopes = runtimeShared.collectCandidateScopes(
            primaryScope,
            environmentHelpers
          );
          if (Array.isArray(sharedScopes)) {
            return sharedScopes;
          }
        } catch (collectRuntimeScopesError) {
          void collectRuntimeScopesError;
        }
      }

      return ensureScopes(primaryScope);
    }

    function resolveCandidateScopes(resolveOptions) {
      const optionsWithDefaults = resolveOptions || {};
      const currentCandidateScopes = optionsWithDefaults.currentCandidateScopes;

      if (Array.isArray(currentCandidateScopes)) {
        return currentCandidateScopes;
      }

      if (
        candidateScopeBridge &&
        typeof candidateScopeBridge.resolveCandidateScopes === 'function'
      ) {
        try {
          const resolved = candidateScopeBridge.resolveCandidateScopes(optionsWithDefaults);
          if (Array.isArray(resolved)) {
            return resolved;
          }
        } catch (resolveCandidateScopesError) {
          void resolveCandidateScopesError;
        }
      }

      if (runtimeShared && typeof runtimeShared.resolveCandidateScopes === 'function') {
        try {
          const resolved = runtimeShared.resolveCandidateScopes(
            optionsWithDefaults.primaryScope,
            environmentHelpers
          );
          if (Array.isArray(resolved)) {
            return resolved;
          }
        } catch (resolveRuntimeCandidateScopesError) {
          void resolveRuntimeCandidateScopesError;
        }
      }

      return collectCandidateScopes(optionsWithDefaults.primaryScope);
    }

    function syncCandidateScopes(candidateScopes, syncOptions) {
      const optionsWithDefaults = syncOptions || {};
      const primaryScope = optionsWithDefaults.primaryScope;
      const candidateList = Array.isArray(candidateScopes) ? candidateScopes : [];
      const providedGlobalScope = optionsWithDefaults.globalScope;

      if (
        candidateScopeBridge &&
        typeof candidateScopeBridge.syncCandidateScopes === 'function'
      ) {
        try {
          const synced = candidateScopeBridge.syncCandidateScopes(
            candidateList,
            optionsWithDefaults
          );
          if (Array.isArray(synced)) {
            return synced;
          }
          if (typeof synced === 'undefined') {
            return candidateList;
          }
          return synced;
        } catch (syncCandidateScopesError) {
          void syncCandidateScopesError;
        }
      }

      if (runtimeShared && typeof runtimeShared.syncCandidateScopes === 'function') {
        try {
          runtimeShared.syncCandidateScopes(
            candidateList,
            primaryScope,
            environmentHelpers
          );
          return candidateList;
        } catch (syncRuntimeCandidateScopesError) {
          void syncRuntimeCandidateScopesError;
        }
      }

      const globalScope =
        (isValidScope(providedGlobalScope) ? providedGlobalScope : null) ||
        (isValidScope(primaryScope) ? primaryScope : null) ||
        (typeof globalThis !== 'undefined' && isValidScope(globalThis) ? globalThis : null) ||
        (typeof window !== 'undefined' && isValidScope(window) ? window : null) ||
        (typeof self !== 'undefined' && isValidScope(self) ? self : null) ||
        (typeof global !== 'undefined' && isValidScope(global) ? global : null);

      if (isValidScope(globalScope)) {
        try {
          globalScope.CORE_RUNTIME_CANDIDATE_SCOPES = candidateList;
        } catch (assignError) {
          void assignError;
        }
      }

      if (typeof optionsWithDefaults.assignCurrentCandidateScopes === 'function') {
        try {
          optionsWithDefaults.assignCurrentCandidateScopes(candidateList);
        } catch (candidateAssignError) {
          void candidateAssignError;
        }
      }

      return candidateList;
    }

    function ensureCandidateScopes(ensureOptions) {
      const resolved = resolveCandidateScopes(ensureOptions || {});
      return syncCandidateScopes(resolved, ensureOptions || {});
    }

    return {
      collectCandidateScopes,
      collectCandidateScopesWithFallback: collectCandidateScopes,
      resolveCandidateScopes,
      syncCandidateScopes,
      ensureCandidateScopes,
    };
  }

  const namespace = {
    createRuntimeCandidateScopeSupportFallback,
  };

  const globalScope = detectScope();
  const namespaceName = 'cineCoreAppRuntimeCandidateScopeFallback';
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
 * Provides a shared bridge for accessing and mutating the global runtime
 * scopes used by the Cine Power Planner core runtime. The original
 * monolithic bundle duplicated the logic for collecting candidate scopes,
 * reading values and writing fallbacks across multiple files. Extracting
 * the behaviour into this module lets the ongoing refactor shrink the core
 * runtime files without losing any of the defensive checks that keep
 * autosave, backup and restore features safe.
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

  function createCandidateRegistry(options) {
    const registryOptions = options || {};
    const seen = typeof Set === 'function' ? new Set() : null;
    const candidates = [];

    function registerCandidate(candidate) {
      const scope = isObject(candidate) ? candidate : detectScope(candidate);
      if (!isObject(scope)) {
        return;
      }

      if (seen) {
        if (seen.has(scope)) {
          return;
        }
        seen.add(scope);
      } else if (candidates.indexOf(scope) !== -1) {
        return;
      }

      candidates.push(scope);
    }

    registerCandidate(registryOptions.primaryScope);

    if (Array.isArray(registryOptions.additionalScopes)) {
      for (let index = 0; index < registryOptions.additionalScopes.length; index += 1) {
        registerCandidate(registryOptions.additionalScopes[index]);
      }
    }

    if (Array.isArray(registryOptions.extraCandidates)) {
      for (let index = 0; index < registryOptions.extraCandidates.length; index += 1) {
        registerCandidate(registryOptions.extraCandidates[index]);
      }
    }

    if (registryOptions.includeGlobalCandidates !== false) {
      registerCandidate(typeof globalThis !== 'undefined' ? globalThis : null);
      registerCandidate(typeof window !== 'undefined' ? window : null);
      registerCandidate(typeof self !== 'undefined' ? self : null);
      registerCandidate(typeof global !== 'undefined' ? global : null);
    }

    if (candidates.length === 0) {
      registerCandidate(detectScope());
    }

    return {
      candidates,
      registerCandidate,
    };
  }

  function createRuntimeScopeBridge(options) {
    const registry = createCandidateRegistry(options);
    const candidates = registry.candidates;

    function readValue(name) {
      if (typeof name !== 'string' || !name) {
        return undefined;
      }

      for (let index = 0; index < candidates.length; index += 1) {
        const scope = candidates[index];
        if (!isObject(scope)) {
          continue;
        }

        try {
          if (name in scope) {
            const value = scope[name];
            if (typeof value !== 'undefined') {
              return value;
            }
          }
        } catch (readError) {
          void readError;
        }
      }

      return undefined;
    }

    function writeValue(name, value) {
      if (typeof name !== 'string' || !name) {
        return false;
      }

      for (let index = 0; index < candidates.length; index += 1) {
        const scope = candidates[index];
        if (!isObject(scope)) {
          continue;
        }

        try {
          scope[name] = value;
          return true;
        } catch (assignError) {
          void assignError;
        }

        try {
          Object.defineProperty(scope, name, {
            configurable: true,
            writable: true,
            value,
          });
          return true;
        } catch (defineError) {
          void defineError;
        }
      }

      return false;
    }

    function declareFallbackBinding(name, factory) {
      const existing = readValue(name);
      if (typeof existing !== 'undefined') {
        return existing;
      }

      const fallbackValue = typeof factory === 'function' ? factory() : factory;
      writeValue(name, fallbackValue);
      return fallbackValue;
    }

    return {
      candidates,
      readValue,
      writeValue,
      declareFallbackBinding,
      registerScope: registry.registerCandidate,
    };
  }

  const namespace = {
    createRuntimeScopeBridge,
  };

  const globalScope = detectScope();

  if (isObject(globalScope)) {
    const existing = isObject(globalScope.cineCoreAppRuntimeScopeBridge)
      ? globalScope.cineCoreAppRuntimeScopeBridge
      : {};

    if (typeof Object.assign === 'function') {
      Object.assign(existing, namespace);
    } else {
      for (const key in namespace) {
        if (Object.prototype.hasOwnProperty.call(namespace, key)) {
          existing[key] = namespace[key];
        }
      }
    }

    try {
      globalScope.cineCoreAppRuntimeScopeBridge = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();

/*
 * Runtime tool inline fallbacks extracted from the main app core bundle.
 *
 * The original monolithic runtime relied on a large inline helper to provide
 * resilient deep clone helpers and global scope guards when the structured
 * runtime toolkit was unavailable. Moving it into its own module keeps the
 * behaviour identical while helping the ongoing refactor towards smaller
 * files. The logic is intentionally verbose because the storage, autosave and
 * backup flows depend on these helpers for safe cloning.
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

  function createInlineRuntimeToolFallbacks(primaryScope) {
    function isValidScope(scope) {
      return !!scope && (typeof scope === 'object' || typeof scope === 'function');
    }

    function detectScopeLocal(primary) {
      if (isValidScope(primary)) {
        return primary;
      }

      if (typeof globalThis !== 'undefined' && isValidScope(globalThis)) {
        return globalThis;
      }

      if (typeof window !== 'undefined' && isValidScope(window)) {
        return window;
      }

      if (typeof self !== 'undefined' && isValidScope(self)) {
        return self;
      }

      if (typeof global !== 'undefined' && isValidScope(global)) {
        return global;
      }

      return null;
    }

    function ensureGlobalValue(name, fallbackValue, primary) {
      const provider =
        typeof fallbackValue === 'function'
          ? fallbackValue
          : function provideStaticFallback() {
              return fallbackValue;
            };

      if (typeof name !== 'string' || !name) {
        try {
          return provider();
        } catch (fallbackError) {
          void fallbackError;
          return undefined;
        }
      }

      const scope = detectScopeLocal(primary);
      if (!isValidScope(scope)) {
        return provider();
      }

      let existing;
      try {
        existing = scope[name];
      } catch (readError) {
        existing = undefined;
        void readError;
      }

      if (typeof existing !== 'undefined') {
        return existing;
      }

      const value = provider();

      try {
        scope[name] = value;
        return scope[name];
      } catch (assignError) {
        void assignError;
      }

      try {
        Object.defineProperty(scope, name, {
          configurable: true,
          writable: true,
          value,
        });
      } catch (defineError) {
        void defineError;
      }

      try {
        return scope[name];
      } catch (finalReadError) {
        void finalReadError;
      }

      return value;
    }

    function jsonDeepClone(value) {
      if (value === null || typeof value !== 'object') {
        return value;
      }

      try {
        return JSON.parse(JSON.stringify(value));
      } catch (jsonCloneError) {
        void jsonCloneError;
      }

      return value;
    }

    function resolveStructuredClone(primary) {
      if (typeof structuredClone === 'function') {
        return structuredClone;
      }

      const scope = detectScopeLocal(primary);
      if (scope && typeof scope.structuredClone === 'function') {
        try {
          return scope.structuredClone.bind(scope);
        } catch (bindError) {
          void bindError;
        }
      }

      if (typeof require === 'function') {
        try {
          const nodeUtil = require('node:util');
          if (nodeUtil && typeof nodeUtil.structuredClone === 'function') {
            return nodeUtil.structuredClone.bind(nodeUtil);
          }
        } catch (nodeUtilError) {
          void nodeUtilError;
        }

        try {
          const legacyUtil = require('util');
          if (legacyUtil && typeof legacyUtil.structuredClone === 'function') {
            return legacyUtil.structuredClone.bind(legacyUtil);
          }
        } catch (legacyUtilError) {
          void legacyUtilError;
        }
      }

      return null;
    }

    function createResilientDeepClone(primary) {
      const structuredCloneImpl = resolveStructuredClone(primary);

      if (!structuredCloneImpl) {
        return jsonDeepClone;
      }

      return function resilientDeepClone(value) {
        if (value === null || typeof value !== 'object') {
          return value;
        }

        try {
          return structuredCloneImpl(value);
        } catch (structuredCloneError) {
          void structuredCloneError;
        }

        return jsonDeepClone(value);
      };
    }

    function ensureDeepClone(primary) {
      const scope = detectScopeLocal(primary);
      if (scope && typeof scope.__cineDeepClone === 'function') {
        return scope.__cineDeepClone;
      }

      const clone = createResilientDeepClone(scope);

      if (isValidScope(scope)) {
        try {
          Object.defineProperty(scope, '__cineDeepClone', {
            configurable: true,
            writable: true,
            value: clone,
          });
        } catch (defineError) {
          void defineError;

          try {
            scope.__cineDeepClone = clone;
          } catch (assignError) {
            void assignError;
          }
        }
      }

      return clone;
    }

    const resolvedScope = detectScopeLocal(primaryScope);

    function getCoreGlobalObject() {
      return detectScopeLocal(resolvedScope);
    }

    function ensureCoreGlobalValue(name, fallbackValue) {
      return ensureGlobalValue(name, fallbackValue, resolvedScope);
    }

    function resolveStructuredCloneForScope(scope) {
      return resolveStructuredClone(scope || resolvedScope);
    }

    function createResilientDeepCloneForScope(scope) {
      return createResilientDeepClone(scope || resolvedScope);
    }

    function ensureDeepCloneForScope(scope) {
      return ensureDeepClone(scope || resolvedScope);
    }

    return {
      getCoreGlobalObject,
      ensureCoreGlobalValue,
      jsonDeepClone,
      resolveStructuredClone: resolveStructuredCloneForScope,
      createResilientDeepClone: createResilientDeepCloneForScope,
      ensureDeepClone: ensureDeepCloneForScope,
    };
  }

  const namespace = { createInlineRuntimeToolFallbacks };
  const namespaceName = 'cineCoreAppRuntimeToolInlineFallbacks';
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
