(function () {
  function fallbackDetectRuntimeScope(primaryScope) {
    if (
      primaryScope &&
      (typeof primaryScope === 'object' || typeof primaryScope === 'function')
    ) {
      return primaryScope;
    }

    if (typeof globalThis !== 'undefined' && typeof globalThis === 'object' && globalThis) {
      return globalThis;
    }

    if (typeof window !== 'undefined' && typeof window === 'object' && window) {
      return window;
    }

    if (typeof self !== 'undefined' && typeof self === 'object' && self) {
      return self;
    }

    if (typeof global !== 'undefined' && typeof global === 'object' && global) {
      return global;
    }

    return null;
  }

  function fallbackResolveCoreSupportModule(namespaceName, requirePath, primaryScope) {
    if (typeof namespaceName !== 'string' || !namespaceName) {
      return null;
    }

    const runtimeScope = fallbackDetectRuntimeScope(primaryScope);

    if (
      runtimeScope &&
      runtimeScope[namespaceName] &&
      typeof runtimeScope[namespaceName] === 'object'
    ) {
      return runtimeScope[namespaceName];
    }

    if (typeof require === 'function' && typeof requirePath === 'string' && requirePath) {
      const candidatePaths = [requirePath];

      if (requirePath.startsWith('./modules/')) {
        const normalizedPath = requirePath.slice(2);
        candidatePaths.unshift(`../../${normalizedPath}`);
      }

      for (let index = 0; index < candidatePaths.length; index += 1) {
        const candidatePath = candidatePaths[index];

        try {
          const required = require(candidatePath);
          if (required && typeof required === 'object') {
            return required;
          }
        } catch (supportModuleError) {
          void supportModuleError;
        }
      }
    }

    return null;
  }

  function ensureCoreSupportResolver(primaryScope) {
    const namespaceName = 'cineCoreSupportResolver';

    function readFromScope(candidateScope) {
      if (
        !candidateScope ||
        (typeof candidateScope !== 'object' && typeof candidateScope !== 'function')
      ) {
        return null;
      }

      try {
        const resolver = candidateScope[namespaceName];
        return resolver && typeof resolver === 'object' ? resolver : null;
      } catch (resolverLookupError) {
        void resolverLookupError;
      }

      return null;
    }

    const runtimeScope = fallbackDetectRuntimeScope(primaryScope);
    const candidates = [
      primaryScope,
      runtimeScope,
      typeof globalThis !== 'undefined' ? globalThis : null,
      typeof window !== 'undefined' ? window : null,
      typeof self !== 'undefined' ? self : null,
      typeof global !== 'undefined' ? global : null,
    ];

    for (let index = 0; index < candidates.length; index += 1) {
      const resolver = readFromScope(candidates[index]);
      if (resolver) {
        return resolver;
      }
    }

    if (typeof require === 'function') {
      try {
        const requiredResolver = require('./support-resolver.js');
        if (requiredResolver && typeof requiredResolver === 'object') {
          return requiredResolver;
        }
      } catch (supportResolverRequireError) {
        void supportResolverRequireError;
      }
    }

    for (let index = 0; index < candidates.length; index += 1) {
      const resolver = readFromScope(candidates[index]);
      if (resolver) {
        return resolver;
      }
    }

    return null;
  }

  function readRuntimeSupportResolver(primaryScope) {
    const resolver = ensureCoreSupportResolver(primaryScope);

    if (resolver && typeof resolver === 'object') {
      const detect =
        typeof resolver.detectRuntimeScope === 'function'
          ? resolver.detectRuntimeScope
          : fallbackDetectRuntimeScope;
      const resolve =
        typeof resolver.resolveCoreSupportModule === 'function'
          ? resolver.resolveCoreSupportModule
          : fallbackResolveCoreSupportModule;

      return Object.freeze({
        detectRuntimeScope: detect,
        resolveCoreSupportModule: resolve,
      });
    }

    return Object.freeze({
      detectRuntimeScope: fallbackDetectRuntimeScope,
      resolveCoreSupportModule: fallbackResolveCoreSupportModule,
    });
  }

  const api = {
    fallbackDetectRuntimeScope,
    fallbackResolveCoreSupportModule,
    ensureCoreSupportResolver,
    readRuntimeSupportResolver,
  };

  const globalScope = fallbackDetectRuntimeScope();
  const targetName = 'cineCoreRuntimeSupportResolution';
  const existing =
    globalScope && typeof globalScope[targetName] === 'object'
      ? globalScope[targetName]
      : {};

  const target = existing;
  for (const key of Object.keys(api)) {
    target[key] = api[key];
  }

  if (globalScope && typeof globalScope === 'object') {
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
