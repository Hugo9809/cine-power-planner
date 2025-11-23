(function () {
    var localizationModules = null;
    if (typeof require === 'function' && typeof module !== 'undefined' && module.exports) {
        try {
            localizationModules = require('./localization.js');
        } catch { // Ignore
        }

        if (!localizationModules) {
            var globalScope =
                typeof globalThis !== 'undefined'
                    ? globalThis
                    : typeof window !== 'undefined'
                        ? window
                        : typeof self !== 'undefined'
                            ? self
                            : typeof global !== 'undefined'
                                ? global
                                : {};
            localizationModules = globalScope.cineCoreLocalizationModules;
        }

        var moduleExports = localizationModules
            ? localizationModules['modules/core/localization-runtime-environment.js']
            : null;

        if (typeof module !== 'undefined' && module.exports) {
            module.exports = moduleExports;
        }
    }) ();
