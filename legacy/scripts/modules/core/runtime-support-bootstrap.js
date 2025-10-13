function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function isObject(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
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
      var candidate = candidateScope[namespaceName];
      return isObject(candidate) ? candidate : null;
    } catch (resolutionLookupError) {
      void resolutionLookupError;
    }
    return null;
  }
  function loadRuntimeSupportResolution(primaryScope) {
    var namespaceName = 'cineCoreRuntimeSupportResolution';
    var candidates = [primaryScope, detectGlobalScope(), typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
    for (var index = 0; index < candidates.length; index += 1) {
      var resolution = readResolutionFromScope(namespaceName, candidates[index]);
      if (resolution) {
        return resolution;
      }
    }
    if (typeof require === 'function') {
      try {
        var required = require('./runtime-support-resolution.js');
        if (isObject(required)) {
          return required;
        }
      } catch (runtimeSupportResolutionRequireError) {
        void runtimeSupportResolutionRequireError;
      }
    }
    for (var _index = 0; _index < candidates.length; _index += 1) {
      var _resolution = readResolutionFromScope(namespaceName, candidates[_index]);
      if (_resolution) {
        return _resolution;
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
    if (isObject(resolution) && typeof resolution.fallbackResolveCoreSupportModule === 'function') {
      return resolution.fallbackResolveCoreSupportModule;
    }
    return function fallbackResolveCoreSupportModule(namespaceName, requirePath, primaryScope) {
      if (typeof namespaceName !== 'string' || !namespaceName) {
        return null;
      }
      var runtimeScope = detectRuntimeScope(primaryScope);
      if (isObject(runtimeScope) && isObject(runtimeScope[namespaceName])) {
        return runtimeScope[namespaceName];
      }
      if (typeof require === 'function' && typeof requirePath === 'string' && requirePath) {
        try {
          var required = require(requirePath);
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
    var runtimeSupportResolution = loadRuntimeSupportResolution(primaryScope);
    var fallbackDetect = ensureFallbackDetectRuntimeScope(runtimeSupportResolution);
    var fallbackResolve = ensureFallbackResolveCoreSupportModule(runtimeSupportResolution, fallbackDetect);
    var runtimeSupportResolverTools = isObject(runtimeSupportResolution) && typeof runtimeSupportResolution.readRuntimeSupportResolver === 'function' ? runtimeSupportResolution.readRuntimeSupportResolver(primaryScope) : null;
    var runtimeSupportResolver = isObject(runtimeSupportResolution) && typeof runtimeSupportResolution.ensureCoreSupportResolver === 'function' ? runtimeSupportResolution.ensureCoreSupportResolver(primaryScope) : null;
    var detectRuntimeScope = isObject(runtimeSupportResolverTools) && typeof runtimeSupportResolverTools.detectRuntimeScope === 'function' ? runtimeSupportResolverTools.detectRuntimeScope : fallbackDetect;
    var resolveCoreSupportModule = isObject(runtimeSupportResolverTools) && typeof runtimeSupportResolverTools.resolveCoreSupportModule === 'function' ? runtimeSupportResolverTools.resolveCoreSupportModule : fallbackResolve;
    return {
      runtimeSupportResolution: runtimeSupportResolution,
      runtimeSupportResolverTools: runtimeSupportResolverTools,
      runtimeSupportResolver: runtimeSupportResolver,
      fallbackDetectRuntimeScope: fallbackDetect,
      fallbackResolveCoreSupportModule: fallbackResolve,
      detectRuntimeScope: detectRuntimeScope,
      resolveCoreSupportModule: resolveCoreSupportModule
    };
  }
  function resolveBootstrap(primaryScope) {
    var tools = readRuntimeSupportTools(primaryScope);
    var detectRuntimeScope = function detectScope(candidateScope) {
      return tools.detectRuntimeScope(candidateScope);
    };
    var runtimeScope = detectRuntimeScope(primaryScope);
    function resolveCoreSupportModule(namespaceName, requirePath, candidateScope) {
      var scope = typeof candidateScope === 'undefined' ? runtimeScope : detectRuntimeScope(candidateScope);
      return tools.resolveCoreSupportModule(namespaceName, requirePath, scope);
    }
    function fallbackResolveCoreSupportModule(namespaceName, requirePath, candidateScope) {
      var scope = typeof candidateScope === 'undefined' ? runtimeScope : detectRuntimeScope(candidateScope);
      return tools.fallbackResolveCoreSupportModule(namespaceName, requirePath, scope);
    }
    return Object.freeze({
      runtimeSupportResolution: tools.runtimeSupportResolution,
      runtimeSupportResolverTools: tools.runtimeSupportResolverTools,
      runtimeSupportResolver: tools.runtimeSupportResolver,
      runtimeScope: runtimeScope,
      detectRuntimeScope: detectRuntimeScope,
      resolveCoreSupportModule: resolveCoreSupportModule,
      fallbackDetectRuntimeScope: tools.fallbackDetectRuntimeScope,
      fallbackResolveCoreSupportModule: fallbackResolveCoreSupportModule
    });
  }
  var namespace = {
    detectGlobalScope: detectGlobalScope,
    loadRuntimeSupportResolution: loadRuntimeSupportResolution,
    readRuntimeSupportTools: readRuntimeSupportTools,
    resolveBootstrap: resolveBootstrap
  };
  var globalScope = detectGlobalScope();
  var targetName = 'cineCoreRuntimeSupportBootstrap';
  var existing = isObject(globalScope) && isObject(globalScope[targetName]) ? globalScope[targetName] : {};
  var target = existing;
  for (var _i = 0, _Object$keys = Object.keys(namespace); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    target[key] = namespace[key];
  }
  if (isObject(globalScope)) {
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