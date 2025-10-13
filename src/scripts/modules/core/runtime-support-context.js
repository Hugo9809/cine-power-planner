/* global CORE_GLOBAL_SCOPE */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function detectGlobalScope() {
    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && isObject(CORE_GLOBAL_SCOPE)) {
      return CORE_GLOBAL_SCOPE;
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

  function readNamespaceFromScope(namespaceName, candidateScope) {
    if (typeof namespaceName !== 'string' || !namespaceName) {
      return null;
    }

    if (!isObject(candidateScope)) {
      return null;
    }

    try {
      const namespace = candidateScope[namespaceName];
      return isObject(namespace) ? namespace : null;
    } catch (namespaceLookupError) {
      void namespaceLookupError;
    }

    return null;
  }

  function loadRuntimeSupportBootstrap(primaryScopeCandidate) {
    const namespaceName = 'cineCoreRuntimeSupportBootstrap';
    const candidates = [
      primaryScopeCandidate,
      detectGlobalScope(),
      typeof globalThis !== 'undefined' ? globalThis : null,
      typeof window !== 'undefined' ? window : null,
      typeof self !== 'undefined' ? self : null,
      typeof global !== 'undefined' ? global : null,
    ];

    for (let index = 0; index < candidates.length; index += 1) {
      const bootstrap = readNamespaceFromScope(namespaceName, candidates[index]);
      if (bootstrap) {
        return bootstrap;
      }
    }

    if (typeof require === 'function') {
      try {
        const requiredBootstrap = require('./runtime-support-bootstrap.js');
        if (isObject(requiredBootstrap)) {
          return requiredBootstrap;
        }
      } catch (runtimeSupportBootstrapRequireError) {
        void runtimeSupportBootstrapRequireError;
      }
    }

    for (let index = 0; index < candidates.length; index += 1) {
      const bootstrap = readNamespaceFromScope(namespaceName, candidates[index]);
      if (bootstrap) {
        return bootstrap;
      }
    }

    return null;
  }

  function defaultFallbackDetectRuntimeScope(primaryScope) {
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

  function defaultFallbackResolveCoreSupportModule(namespaceName, requirePath, primaryScope) {
    if (typeof namespaceName !== 'string' || !namespaceName) {
      return null;
    }

    const runtimeScope = defaultFallbackDetectRuntimeScope(primaryScope);

    if (isObject(runtimeScope) && isObject(runtimeScope[namespaceName])) {
      return runtimeScope[namespaceName];
    }

    if (typeof require === 'function' && typeof requirePath === 'string' && requirePath) {
      try {
        const required = require(requirePath);
        if (isObject(required)) {
          return required;
        }
      } catch (supportModuleError) {
        void supportModuleError;
      }
    }

    return null;
  }

  function createDefaultRuntimeSupportContext(options) {
    const primaryScopeCandidate =
      options && isObject(options.primaryScopeCandidate)
        ? options.primaryScopeCandidate
        : null;

    const fallbackDetect = defaultFallbackDetectRuntimeScope;
    const runtimeScope = fallbackDetect(primaryScopeCandidate);

    function fallbackResolveCoreSupportModule(namespaceName, requirePath, candidateScope) {
      const scope =
        typeof candidateScope === 'undefined'
          ? runtimeScope
          : fallbackDetect(candidateScope);

      return defaultFallbackResolveCoreSupportModule(namespaceName, requirePath, scope);
    }

    function resolveCoreSupportModule(namespaceName, requirePath, candidateScope) {
      return fallbackResolveCoreSupportModule(namespaceName, requirePath, candidateScope);
    }

    return Object.freeze({
      primaryScopeCandidate,
      bootstrap: null,
      bootstrapTools: null,
      fallbackTools: null,
      runtimeScope,
      detectRuntimeScope: fallbackDetect,
      fallbackDetectRuntimeScope: fallbackDetect,
      fallbackResolveCoreSupportModule,
      resolveCoreSupportModule,
    });
  }

  function createRuntimeSupportContext(options) {
    const primaryScopeCandidate =
      options && isObject(options.primaryScopeCandidate)
        ? options.primaryScopeCandidate
        : null;

    const bootstrap = loadRuntimeSupportBootstrap(primaryScopeCandidate);
    const bootstrapTools =
      bootstrap && typeof bootstrap.resolveBootstrap === 'function'
        ? bootstrap.resolveBootstrap(primaryScopeCandidate)
        : null;

    const fallbackTools =
      !bootstrapTools &&
      bootstrap &&
      typeof bootstrap.readRuntimeSupportTools === 'function'
        ? bootstrap.readRuntimeSupportTools(primaryScopeCandidate)
        : null;

    const fallbackDetect =
      (bootstrapTools &&
        typeof bootstrapTools.fallbackDetectRuntimeScope === 'function' &&
        bootstrapTools.fallbackDetectRuntimeScope) ||
      (fallbackTools &&
        typeof fallbackTools.fallbackDetectRuntimeScope === 'function' &&
        fallbackTools.fallbackDetectRuntimeScope) ||
      defaultFallbackDetectRuntimeScope;

    const detect =
      (bootstrapTools &&
        typeof bootstrapTools.detectRuntimeScope === 'function' &&
        bootstrapTools.detectRuntimeScope) ||
      fallbackDetect;

    const runtimeScope =
      bootstrapTools && isObject(bootstrapTools.runtimeScope)
        ? bootstrapTools.runtimeScope
        : detect(primaryScopeCandidate);

    const fallbackResolve =
      (bootstrapTools &&
        typeof bootstrapTools.fallbackResolveCoreSupportModule === 'function' &&
        bootstrapTools.fallbackResolveCoreSupportModule) ||
      (fallbackTools &&
        typeof fallbackTools.fallbackResolveCoreSupportModule === 'function' &&
        fallbackTools.fallbackResolveCoreSupportModule) ||
      defaultFallbackResolveCoreSupportModule;

    function fallbackResolveCoreSupportModule(namespaceName, requirePath, candidateScope) {
      const scope =
        typeof candidateScope === 'undefined'
          ? runtimeScope
          : detect(candidateScope);

      return fallbackResolve(namespaceName, requirePath, scope);
    }

    function resolveCoreSupportModule(namespaceName, requirePath, candidateScope) {
      if (
        bootstrapTools &&
        typeof bootstrapTools.resolveCoreSupportModule === 'function'
      ) {
        const scope =
          typeof candidateScope === 'undefined'
            ? runtimeScope
            : detect(candidateScope);

        return bootstrapTools.resolveCoreSupportModule(
          namespaceName,
          requirePath,
          scope
        );
      }

      return fallbackResolveCoreSupportModule(namespaceName, requirePath, candidateScope);
    }

    return Object.freeze({
      primaryScopeCandidate,
      bootstrap,
      bootstrapTools,
      fallbackTools,
      runtimeScope,
      detectRuntimeScope: detect,
      fallbackDetectRuntimeScope: fallbackDetect,
      fallbackResolveCoreSupportModule,
      resolveCoreSupportModule,
    });
  }

  let cachedContext = null;
  let cachedCandidate = undefined;

  function readRuntimeSupportContext(options) {
    const candidate =
      options && isObject(options.primaryScopeCandidate)
        ? options.primaryScopeCandidate
        : null;

    if (cachedContext && cachedCandidate === candidate) {
      return cachedContext;
    }

    const runtimeContext = createRuntimeSupportContext({
      primaryScopeCandidate: candidate,
    });

    if (isObject(runtimeContext)) {
      cachedContext = runtimeContext;
      cachedCandidate = candidate;
      return cachedContext;
    }

    const fallbackContext = createDefaultRuntimeSupportContext({
      primaryScopeCandidate: candidate,
    });
    cachedContext = fallbackContext;
    cachedCandidate = candidate;
    return cachedContext;
  }

  const api = {
    isObject,
    detectGlobalScope,
    readNamespaceFromScope,
    loadRuntimeSupportBootstrap,
    defaultFallbackDetectRuntimeScope,
    defaultFallbackResolveCoreSupportModule,
    createDefaultRuntimeSupportContext,
    createRuntimeSupportContext,
    readRuntimeSupportContext,
  };

  const globalScope = detectGlobalScope();
  const targetName = 'cineCoreRuntimeSupportContext';
  const existing =
    isObject(globalScope) && isObject(globalScope[targetName])
      ? globalScope[targetName]
      : {};

  const target = existing;
  for (const key of Object.keys(api)) {
    target[key] = api[key];
  }

  if (isObject(globalScope)) {
    try {
      globalScope[targetName] = target;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = target;
  }
})();
