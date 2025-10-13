/* global CORE_GLOBAL_SCOPE */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function detectPrimaryScopeCandidate() {
    if (
      typeof CORE_GLOBAL_SCOPE !== 'undefined' &&
      CORE_GLOBAL_SCOPE &&
      typeof CORE_GLOBAL_SCOPE === 'object'
    ) {
      return CORE_GLOBAL_SCOPE;
    }

    return null;
  }

  function fallbackDetectRuntimeScope(primaryScope) {
    if (primaryScope && (typeof primaryScope === 'object' || typeof primaryScope === 'function')) {
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

  function createDefaultFallbackResolveCoreSupportModule(detectScope) {
    const detector = typeof detectScope === 'function' ? detectScope : fallbackDetectRuntimeScope;

    return function defaultFallbackResolveCoreSupportModule(namespaceName, requirePath, primaryScope) {
      if (typeof namespaceName !== 'string' || !namespaceName) {
        return null;
      }

      const runtimeScope = detector(primaryScope);

      if (runtimeScope && isObject(runtimeScope[namespaceName])) {
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
    };
  }

  function ensureRuntimeSupportBootstrap(primaryScopeCandidate) {
    const namespaceName = 'cineCoreRuntimeSupportBootstrap';

    function readFromScope(candidateScope) {
      if (!isObject(candidateScope)) {
        return null;
      }

      try {
        const bootstrapCandidate = candidateScope[namespaceName];
        return isObject(bootstrapCandidate) ? bootstrapCandidate : null;
      } catch (candidateLookupError) {
        void candidateLookupError;
      }

      return null;
    }

    const candidates = [
      primaryScopeCandidate,
      typeof globalThis !== 'undefined' ? globalThis : null,
      typeof window !== 'undefined' ? window : null,
      typeof self !== 'undefined' ? self : null,
      typeof global !== 'undefined' ? global : null,
    ];

    for (let index = 0; index < candidates.length; index += 1) {
      const bootstrap = readFromScope(candidates[index]);
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
      const bootstrap = readFromScope(candidates[index]);
      if (bootstrap) {
        return bootstrap;
      }
    }

    return null;
  }

  function readRuntimeSupportTools(bootstrap, primaryScope) {
    if (bootstrap && typeof bootstrap.readRuntimeSupportTools === 'function') {
      try {
        const tools = bootstrap.readRuntimeSupportTools(primaryScope);
        if (isObject(tools)) {
          return tools;
        }
      } catch (toolsReadError) {
        void toolsReadError;
      }
    }

    return null;
  }

  const primaryScopeCandidate = detectPrimaryScopeCandidate();
  const runtimeSupportBootstrap = ensureRuntimeSupportBootstrap(primaryScopeCandidate);

  const bootstrapTools =
    runtimeSupportBootstrap &&
    typeof runtimeSupportBootstrap.resolveBootstrap === 'function'
      ? runtimeSupportBootstrap.resolveBootstrap(primaryScopeCandidate)
      : null;

  const fallbackTools =
    !bootstrapTools ? readRuntimeSupportTools(runtimeSupportBootstrap, primaryScopeCandidate) : null;

  const fallbackDetectRuntimeScopeImplementation =
    (bootstrapTools &&
      typeof bootstrapTools.fallbackDetectRuntimeScope === 'function' &&
      bootstrapTools.fallbackDetectRuntimeScope) ||
    (fallbackTools &&
      typeof fallbackTools.fallbackDetectRuntimeScope === 'function' &&
      fallbackTools.fallbackDetectRuntimeScope) ||
    fallbackDetectRuntimeScope;

  const detectRuntimeScopeImplementation =
    (bootstrapTools &&
      typeof bootstrapTools.detectRuntimeScope === 'function' &&
      bootstrapTools.detectRuntimeScope) ||
    fallbackDetectRuntimeScopeImplementation;

  const defaultFallbackResolve =
    createDefaultFallbackResolveCoreSupportModule(fallbackDetectRuntimeScopeImplementation);

  const fallbackResolveCoreSupportModuleImplementation =
    (bootstrapTools &&
      typeof bootstrapTools.fallbackResolveCoreSupportModule === 'function' &&
      bootstrapTools.fallbackResolveCoreSupportModule) ||
    (fallbackTools &&
      typeof fallbackTools.fallbackResolveCoreSupportModule === 'function' &&
      fallbackTools.fallbackResolveCoreSupportModule) ||
    defaultFallbackResolve;

  const runtimeScope =
    bootstrapTools && isObject(bootstrapTools.runtimeScope)
      ? bootstrapTools.runtimeScope
      : detectRuntimeScopeImplementation(primaryScopeCandidate);

  function resolveCoreSupportModule(namespaceName, requirePath, primaryScopeOverride) {
    const runtimeScopeOverride =
      typeof primaryScopeOverride === 'undefined' ? runtimeScope : primaryScopeOverride;

    if (bootstrapTools && typeof bootstrapTools.resolveCoreSupportModule === 'function') {
      try {
        return bootstrapTools.resolveCoreSupportModule(
          namespaceName,
          requirePath,
          runtimeScopeOverride,
        );
      } catch (resolveError) {
        void resolveError;
      }
    }

    return fallbackResolveCoreSupportModuleImplementation(
      namespaceName,
      requirePath,
      runtimeScopeOverride,
    );
  }

  const namespace = {
    primaryScopeCandidate,
    runtimeSupportBootstrap,
    bootstrapTools,
    fallbackTools,
    fallbackDetectRuntimeScope: fallbackDetectRuntimeScopeImplementation,
    detectRuntimeScope: detectRuntimeScopeImplementation,
    fallbackResolveCoreSupportModule: fallbackResolveCoreSupportModuleImplementation,
    runtimeScope,
    resolveCoreSupportModule,
    readRuntimeSupportTools: function readRuntimeSupportToolsBridge(primaryScope) {
      return readRuntimeSupportTools(runtimeSupportBootstrap, primaryScope);
    },
    defaultFallbackDetectRuntimeScope: fallbackDetectRuntimeScope,
    createDefaultFallbackResolveCoreSupportModule,
  };

  const ambientScope =
    (isObject(runtimeScope) && runtimeScope) ||
    fallbackDetectRuntimeScope() ||
    (typeof globalThis !== 'undefined' && isObject(globalThis) ? globalThis : null) ||
    (typeof window !== 'undefined' && isObject(window) ? window : null) ||
    (typeof self !== 'undefined' && isObject(self) ? self : null) ||
    (typeof global !== 'undefined' && isObject(global) ? global : null) ||
    null;

  const targetName = 'cineCoreRuntimeBridge';
  const existing = ambientScope && isObject(ambientScope[targetName]) ? ambientScope[targetName] : {};
  const target = existing;

  for (const key of Object.keys(namespace)) {
    target[key] = namespace[key];
  }

  if (ambientScope && isObject(ambientScope)) {
    try {
      ambientScope[targetName] = target;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = target;
  }
})();
