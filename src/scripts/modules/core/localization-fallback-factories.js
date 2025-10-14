(function () {
  function resolveLocalizationModules() {
    if (typeof require === 'function') {
      try {
        return require('./localization.js');
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
      scope.cineCoreLocalizationModules &&
      typeof scope.cineCoreLocalizationModules === 'object'
    ) {
      return scope.cineCoreLocalizationModules;
    }

    return null;
  }

  var localizationModules = resolveLocalizationModules();
  var namespace =
    localizationModules &&
    Object.prototype.hasOwnProperty.call(localizationModules, 'modules/core/localization-fallback-factories.js')
      ? localizationModules['modules/core/localization-fallback-factories.js']
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
    var targetName = 'cineCoreLocalizationModules';
    var existing =
      globalScope[targetName] && typeof globalScope[targetName] === 'object'
        ? globalScope[targetName]
        : {};

    existing['modules/core/localization-fallback-factories.js'] = namespace;

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
