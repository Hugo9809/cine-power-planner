function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function fallbackDetectRuntimeScope(primaryScope) {
    if (primaryScope && (_typeof(primaryScope) === 'object' || typeof primaryScope === 'function')) {
      return primaryScope;
    }
    if (typeof globalThis !== 'undefined' && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' && globalThis) {
      return globalThis;
    }
    if (typeof window !== 'undefined' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window) {
      return window;
    }
    if (typeof self !== 'undefined' && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' && self) {
      return self;
    }
    if (typeof global !== 'undefined' && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' && global) {
      return global;
    }
    return null;
  }
  function fallbackResolveCoreSupportModule(namespaceName, requirePath, primaryScope) {
    if (typeof namespaceName !== 'string' || !namespaceName) {
      return null;
    }
    var runtimeScope = fallbackDetectRuntimeScope(primaryScope);
    if (runtimeScope && runtimeScope[namespaceName] && _typeof(runtimeScope[namespaceName]) === 'object') {
      return runtimeScope[namespaceName];
    }
    if (typeof require === 'function' && typeof requirePath === 'string' && requirePath) {
      try {
        var required = require(requirePath);
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (supportModuleError) {
        void supportModuleError;
      }
    }
    return null;
  }
  function ensureCoreSupportResolver(primaryScope) {
    var namespaceName = 'cineCoreSupportResolver';
    function readFromScope(candidateScope) {
      if (!candidateScope || _typeof(candidateScope) !== 'object' && typeof candidateScope !== 'function') {
        return null;
      }
      try {
        var resolver = candidateScope[namespaceName];
        return resolver && _typeof(resolver) === 'object' ? resolver : null;
      } catch (resolverLookupError) {
        void resolverLookupError;
      }
      return null;
    }
    var runtimeScope = fallbackDetectRuntimeScope(primaryScope);
    var candidates = [primaryScope, runtimeScope, typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
    for (var index = 0; index < candidates.length; index += 1) {
      var resolver = readFromScope(candidates[index]);
      if (resolver) {
        return resolver;
      }
    }
    if (typeof require === 'function') {
      try {
        var requiredResolver = require('./support-resolver.js');
        if (requiredResolver && _typeof(requiredResolver) === 'object') {
          return requiredResolver;
        }
      } catch (supportResolverRequireError) {
        void supportResolverRequireError;
      }
    }
    for (var _index = 0; _index < candidates.length; _index += 1) {
      var _resolver = readFromScope(candidates[_index]);
      if (_resolver) {
        return _resolver;
      }
    }
    return null;
  }
  function readRuntimeSupportResolver(primaryScope) {
    var resolver = ensureCoreSupportResolver(primaryScope);
    if (resolver && _typeof(resolver) === 'object') {
      var detect = typeof resolver.detectRuntimeScope === 'function' ? resolver.detectRuntimeScope : fallbackDetectRuntimeScope;
      var resolve = typeof resolver.resolveCoreSupportModule === 'function' ? resolver.resolveCoreSupportModule : fallbackResolveCoreSupportModule;
      return Object.freeze({
        detectRuntimeScope: detect,
        resolveCoreSupportModule: resolve
      });
    }
    return Object.freeze({
      detectRuntimeScope: fallbackDetectRuntimeScope,
      resolveCoreSupportModule: fallbackResolveCoreSupportModule
    });
  }
  var api = {
    fallbackDetectRuntimeScope: fallbackDetectRuntimeScope,
    fallbackResolveCoreSupportModule: fallbackResolveCoreSupportModule,
    ensureCoreSupportResolver: ensureCoreSupportResolver,
    readRuntimeSupportResolver: readRuntimeSupportResolver
  };
  var globalScope = fallbackDetectRuntimeScope();
  var targetName = 'cineCoreRuntimeSupportResolution';
  var existing = globalScope && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
  var target = existing;
  for (var _i = 0, _Object$keys = Object.keys(api); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    target[key] = api[key];
  }
  if (globalScope && _typeof(globalScope) === 'object') {
    try {
      globalScope[targetName] = target;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = target;
  }
})();