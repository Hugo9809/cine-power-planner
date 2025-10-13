function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined' && globalThis && _typeof(globalThis) === 'object') {
      return globalThis;
    }

    if (typeof window !== 'undefined' && window && _typeof(window) === 'object') {
      return window;
    }

    if (typeof self !== 'undefined' && self && _typeof(self) === 'object') {
      return self;
    }

    if (typeof global !== 'undefined' && global && _typeof(global) === 'object') {
      return global;
    }

    return null;
  }

  function isObjectLike(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
  }

  function recordModule(targetScope, namespaceName, moduleApi) {
    if (!targetScope || !isObjectLike(targetScope) || !namespaceName || !isObjectLike(moduleApi)) {
      return;
    }

    try {
      var registry = targetScope.cineCoreSupportModuleResolver || {};
      var modules = registry.modules || {};

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
        var moduleApi = scope[namespaceName];
        recordModule(scope, namespaceName, moduleApi);
        return moduleApi;
      }

      if (typeof namespaceName === 'string' && namespaceName && scope && isObjectLike(scope)) {
        try {
          var candidate = scope && scope.cineCoreSupportModuleResolver;
          if (candidate && isObjectLike(candidate.modules) && isObjectLike(candidate.modules[namespaceName])) {
            return candidate.modules[namespaceName];
          }
        } catch (resolverLookupError) {
          void resolverLookupError;
        }
      }

      if (typeof requirePath === 'string' && requirePath) {
        var required = tryRequire(requirePath);
        if (isObjectLike(required)) {
          recordModule(scope, namespaceName, required);
          return required;
        }
      }

      return null;
    };
  }

  var globalScope = detectGlobalScope();
  var resolver = createResolver(globalScope);

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

      var registry = globalScope.cineCoreSupportModuleResolver || {};
      var modules = registry.modules || {};

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
