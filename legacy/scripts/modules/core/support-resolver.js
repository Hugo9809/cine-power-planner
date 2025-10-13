function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function detectRuntimeScope(primaryScope) {
    var candidates = [];
    if (primaryScope && (_typeof(primaryScope) === 'object' || typeof primaryScope === 'function')) {
      candidates.push(primaryScope);
    }
    if (typeof globalThis !== 'undefined' && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
      candidates.push(globalThis);
    }
    if (typeof window !== 'undefined' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
      candidates.push(window);
    }
    if (typeof self !== 'undefined' && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
      candidates.push(self);
    }
    if (typeof global !== 'undefined' && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
      candidates.push(global);
    }
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (!candidate || _typeof(candidate) !== 'object' && typeof candidate !== 'function') {
        continue;
      }
      return candidate;
    }
    return null;
  }
  function resolveCoreSupportModule(namespaceName, requirePath, primaryScope) {
    if (typeof namespaceName !== 'string' || !namespaceName) {
      return null;
    }
    var runtimeScope = detectRuntimeScope(primaryScope);
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
  var namespace = {
    detectRuntimeScope: detectRuntimeScope,
    resolveCoreSupportModule: resolveCoreSupportModule
  };
  var globalScope = detectRuntimeScope();
  var targetName = 'cineCoreSupportResolver';
  var existing = globalScope && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
  var target = existing;
  for (var _i = 0, _Object$keys = Object.keys(namespace); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    target[key] = namespace[key];
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