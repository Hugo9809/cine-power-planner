(function () {
  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object') {
      return globalThis;
    }

    if (typeof window !== 'undefined' && window && typeof window === 'object') {
      return window;
    }

    if (typeof self !== 'undefined' && self && typeof self === 'object') {
      return self;
    }

    if (typeof global !== 'undefined' && global && typeof global === 'object') {
      return global;
    }

    return null;
  }

  function isObjectLike(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function recordModule(targetScope, namespaceName, moduleApi) {
    if (!targetScope || !isObjectLike(targetScope) || !namespaceName || !isObjectLike(moduleApi)) {
      return;
    }

    try {
      const registry = targetScope.cineCoreSupportModuleResolver || {};
      const modules = registry.modules || {};

      modules[namespaceName] = moduleApi;
      registry.modules = modules;

      if (!isObjectLike(registry.resolveCoreSupportModule)) {
        registry.resolveCoreSupportModule = null;
      }

      targetScope.cineCoreSupportModuleResolver = registry;
    } catch (registryError) {
      void registryError;
    }
  }

  function tryRequire(modulePath) {
    if (typeof require !== 'function') {
      return null;
    }

    try {
      return require(modulePath);
    } catch (error) {
      void error;
      return null;
    }
  }

  function createResolver(scope) {
    return function resolveCoreSupportModule(namespaceName, requirePath) {
      if (scope && isObjectLike(scope) && namespaceName && isObjectLike(scope[namespaceName])) {
        const moduleApi = scope[namespaceName];
        recordModule(scope, namespaceName, moduleApi);
        return moduleApi;
      }

      if (typeof namespaceName === 'string' && namespaceName && scope && isObjectLike(scope)) {
        try {
          const candidate = scope && scope.cineCoreSupportModuleResolver;
          if (candidate && isObjectLike(candidate.modules) && isObjectLike(candidate.modules[namespaceName])) {
            return candidate.modules[namespaceName];
          }
        } catch (resolverLookupError) {
          void resolverLookupError;
        }
      }

      if (typeof requirePath === 'string' && requirePath) {
        const required = tryRequire(requirePath);
        if (isObjectLike(required)) {
          recordModule(scope, namespaceName, required);
          return required;
        }
      }

      return null;
    };
  }

  const globalScope = detectGlobalScope();
  const resolver = createResolver(globalScope);

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = resolver;
    module.exports.resolveCoreSupportModule = resolver;
    module.exports.detectGlobalScope = detectGlobalScope;
    module.exports.createResolver = createResolver;
  }

  if (globalScope && isObjectLike(globalScope)) {
    try {
      if (typeof globalScope.resolveCoreSupportModule !== 'function') {
        globalScope.resolveCoreSupportModule = resolver;
      }

      const registry = globalScope.cineCoreSupportModuleResolver || {};
      const modules = registry.modules || {};

      registry.resolveCoreSupportModule = resolver;
      registry.detectGlobalScope = detectGlobalScope;
      registry.createResolver = createResolver;
      registry.modules = modules;

      if (!modules.resolveCoreSupportModule) {
        modules.resolveCoreSupportModule = resolver;
      }

      globalScope.cineCoreSupportModuleResolver = registry;
    } catch (registryAssignError) {
      void registryAssignError;
    }
  }
})();
