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

  function readResolutionFromScope(namespaceName, candidateScope) {
    if (!isObject(candidateScope)) {
      return null;
    }

    try {
      const candidate = candidateScope[namespaceName];
      return isObject(candidate) ? candidate : null;
    } catch (resolutionLookupError) {
      void resolutionLookupError;
    }

    return null;
  }

  function loadRuntimeSupportResolution(primaryScope) {
    const namespaceName = 'cineCoreRuntimeSupportResolution';
    const candidates = [
      primaryScope,
      detectGlobalScope(),
      typeof globalThis !== 'undefined' ? globalThis : null,
      typeof window !== 'undefined' ? window : null,
      typeof self !== 'undefined' ? self : null,
      typeof global !== 'undefined' ? global : null,
    ];

    for (let index = 0; index < candidates.length; index += 1) {
      const resolution = readResolutionFromScope(namespaceName, candidates[index]);
      if (resolution) {
        return resolution;
      }
    }

    if (typeof require === 'function') {
      try {
        const required = require('./runtime-support-resolution.js');
        if (isObject(required)) {
          return required;
        }
      } catch (runtimeSupportResolutionRequireError) {
        void runtimeSupportResolutionRequireError;
      }
    }

    for (let index = 0; index < candidates.length; index += 1) {
      const resolution = readResolutionFromScope(namespaceName, candidates[index]);
      if (resolution) {
        return resolution;
      }
    }

    return null;
  }

  function ensureFallbackDetectRuntimeScope(resolution) {
    if (isObject(resolution) && typeof resolution.fallbackDetectRuntimeScope === 'function') {
      return resolution.fallbackDetectRuntimeScope;
    }

    return function fallbackDetectRuntimeScope(primaryScope) {
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
    };
  }

  function ensureFallbackResolveCoreSupportModule(resolution, detectRuntimeScope) {
    if (
      isObject(resolution) &&
      typeof resolution.fallbackResolveCoreSupportModule === 'function'
    ) {
      return resolution.fallbackResolveCoreSupportModule;
    }

    return function fallbackResolveCoreSupportModule(namespaceName, requirePath, primaryScope) {
      if (typeof namespaceName !== 'string' || !namespaceName) {
        return null;
      }

      const runtimeScope = detectRuntimeScope(primaryScope);

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
    };
  }

  function readRuntimeSupportTools(primaryScope) {
    const runtimeSupportResolution = loadRuntimeSupportResolution(primaryScope);
    const fallbackDetect = ensureFallbackDetectRuntimeScope(runtimeSupportResolution);
    const fallbackResolve = ensureFallbackResolveCoreSupportModule(
      runtimeSupportResolution,
      fallbackDetect
    );

    const runtimeSupportResolverTools =
      isObject(runtimeSupportResolution) &&
      typeof runtimeSupportResolution.readRuntimeSupportResolver === 'function'
        ? runtimeSupportResolution.readRuntimeSupportResolver(primaryScope)
        : null;

    const runtimeSupportResolver =
      isObject(runtimeSupportResolution) &&
      typeof runtimeSupportResolution.ensureCoreSupportResolver === 'function'
        ? runtimeSupportResolution.ensureCoreSupportResolver(primaryScope)
        : null;

    const detectRuntimeScope =
      isObject(runtimeSupportResolverTools) &&
      typeof runtimeSupportResolverTools.detectRuntimeScope === 'function'
        ? runtimeSupportResolverTools.detectRuntimeScope
        : fallbackDetect;

    const resolveCoreSupportModule =
      isObject(runtimeSupportResolverTools) &&
      typeof runtimeSupportResolverTools.resolveCoreSupportModule === 'function'
        ? runtimeSupportResolverTools.resolveCoreSupportModule
        : fallbackResolve;

    return {
      runtimeSupportResolution,
      runtimeSupportResolverTools,
      runtimeSupportResolver,
      fallbackDetectRuntimeScope: fallbackDetect,
      fallbackResolveCoreSupportModule: fallbackResolve,
      detectRuntimeScope,
      resolveCoreSupportModule,
    };
  }

  function resolveBootstrap(primaryScope) {
    const tools = readRuntimeSupportTools(primaryScope);
    const detectRuntimeScope = function detectScope(candidateScope) {
      return tools.detectRuntimeScope(candidateScope);
    };

    const runtimeScope = detectRuntimeScope(primaryScope);

    function resolveCoreSupportModule(namespaceName, requirePath, candidateScope) {
      const scope =
        typeof candidateScope === 'undefined'
          ? runtimeScope
          : detectRuntimeScope(candidateScope);

      return tools.resolveCoreSupportModule(namespaceName, requirePath, scope);
    }

    function fallbackResolveCoreSupportModule(namespaceName, requirePath, candidateScope) {
      const scope =
        typeof candidateScope === 'undefined'
          ? runtimeScope
          : detectRuntimeScope(candidateScope);

      return tools.fallbackResolveCoreSupportModule(namespaceName, requirePath, scope);
    }

    return Object.freeze({
      runtimeSupportResolution: tools.runtimeSupportResolution,
      runtimeSupportResolverTools: tools.runtimeSupportResolverTools,
      runtimeSupportResolver: tools.runtimeSupportResolver,
      runtimeScope,
      detectRuntimeScope,
      resolveCoreSupportModule,
      fallbackDetectRuntimeScope: tools.fallbackDetectRuntimeScope,
      fallbackResolveCoreSupportModule,
    });
  }

  const namespace = {
    detectGlobalScope,
    loadRuntimeSupportResolution,
    readRuntimeSupportTools,
    resolveBootstrap,
  };

  const globalScope = detectGlobalScope();
  const targetName = 'cineCoreRuntimeSupportBootstrap';
  const existing = isObject(globalScope) && isObject(globalScope[targetName])
    ? globalScope[targetName]
    : {};

  const target = existing;
  for (const key of Object.keys(namespace)) {
    target[key] = namespace[key];
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
