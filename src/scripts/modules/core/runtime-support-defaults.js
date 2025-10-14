(function () {
  function resolveRuntimeModules() {
    if (typeof require === 'function') {
      try {
        return require('./runtime.js');
      } catch (requireError) {
        void requireError;
      }
    }

    var scope =
      (typeof globalThis === 'object' && globalThis) ||
      (typeof window === 'object' && window) ||
      (typeof self === 'object' && self) ||
      (typeof global === 'object' && global) ||
      null;

    if (
      scope &&
      scope.cineCoreRuntimeModules &&
      typeof scope.cineCoreRuntimeModules === 'object'
    ) {
      return scope.cineCoreRuntimeModules;
    }

    return null;
  }

  var runtimeModules = resolveRuntimeModules();
  var namespace =
    runtimeModules &&
    Object.prototype.hasOwnProperty.call(runtimeModules, 'modules/core/runtime-support-defaults.js')
      ? runtimeModules['modules/core/runtime-support-defaults.js']
      : null;

  if (namespace == null) {
    namespace = {};
  }

  var globalScope =
    (typeof globalThis === 'object' && globalThis) ||
    (typeof window === 'object' && window) ||
    (typeof self === 'object' && self) ||
    (typeof global === 'object' && global) ||
    null;

  if (globalScope) {
    var targetName = 'cineCoreRuntimeModules';
    var existing =
      globalScope[targetName] && typeof globalScope[targetName] === 'object'
        ? globalScope[targetName]
        : {};

    existing['modules/core/runtime-support-defaults.js'] = namespace;

    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
