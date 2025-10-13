(function () {
  function detectRuntimeScope(primaryScope) {
    var candidates = [];

    if (
      primaryScope &&
      (typeof primaryScope === 'object' || typeof primaryScope === 'function')
    ) {
      candidates.push(primaryScope);
    }

    if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object') {
      candidates.push(globalThis);
    }

    if (typeof window !== 'undefined' && window && typeof window === 'object') {
      candidates.push(window);
    }

    if (typeof self !== 'undefined' && self && typeof self === 'object') {
      candidates.push(self);
    }

    if (typeof global !== 'undefined' && global && typeof global === 'object') {
      candidates.push(global);
    }

    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (!candidate || typeof candidate !== 'object' && typeof candidate !== 'function') {
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

    if (
      runtimeScope &&
      runtimeScope[namespaceName] &&
      typeof runtimeScope[namespaceName] === 'object'
    ) {
      return runtimeScope[namespaceName];
    }

    if (typeof require === 'function' && typeof requirePath === 'string' && requirePath) {
      try {
        var required = require(requirePath);
        if (required && typeof required === 'object') {
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
    resolveCoreSupportModule: resolveCoreSupportModule,
  };

  var globalScope = detectRuntimeScope();
  var targetName = 'cineCoreSupportResolver';
  var existing =
    globalScope && typeof globalScope[targetName] === 'object'
      ? globalScope[targetName]
      : {};

  var target = existing;
  var keys = Object.keys(namespace);
  for (var keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
    var key = keys[keyIndex];
    target[key] = namespace[key];
  }

  if (globalScope && (typeof globalScope === 'object' || typeof globalScope === 'function')) {
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
