/* global cineLocale */

(function () {
  var FALLBACK_DEFAULT_LANGUAGE = 'en';
  var FALLBACK_RTL_CODES = Object.freeze(['ar', 'fa', 'he', 'ur']);

  function detectGlobalScope() {
    if (typeof globalThis === 'object' && globalThis) {
      return globalThis;
    }
    if (typeof window === 'object' && window) {
      return window;
    }
    if (typeof self === 'object' && self) {
      return self;
    }
    if (typeof global === 'object' && global) {
      return global;
    }
    return null;
  }

  function toLowerCaseSafe(value) {
    if (typeof value !== 'string') {
      return '';
    }

    try {
      return value.trim().toLowerCase();
    } catch (stringError) {
      void stringError;
    }

    return '';
  }

  function normaliseDefaultLanguage(options) {
    var candidate =
      options && typeof options.defaultLanguage === 'string'
        ? toLowerCaseSafe(options.defaultLanguage)
        : '';

    return candidate || FALLBACK_DEFAULT_LANGUAGE;
  }

  function normaliseRtlCodes(options) {
    if (options && Array.isArray(options.rtlLanguageCodes)) {
      var normalised = [];

      for (var index = 0; index < options.rtlLanguageCodes.length; index += 1) {
        var rawCode = options.rtlLanguageCodes[index];
        var code = toLowerCaseSafe(String(rawCode || ''));
        if (code && normalised.indexOf(code) === -1) {
          normalised.push(code);
        }
      }

      if (normalised.length > 0) {
        return normalised;
      }
    }

    return FALLBACK_RTL_CODES.slice();
  }

  function fallbackResolveLocaleModule(scope) {
    if (
      typeof cineLocale !== 'undefined' &&
      cineLocale &&
      typeof cineLocale === 'object'
    ) {
      return cineLocale;
    }

    var candidates = [];
    if (scope && (typeof scope === 'object' || typeof scope === 'function')) {
      candidates.push(scope);
    }
    if (typeof globalThis !== 'undefined') candidates.push(globalThis);
    if (typeof window !== 'undefined') candidates.push(window);
    if (typeof self !== 'undefined') candidates.push(self);
    if (typeof global !== 'undefined') candidates.push(global);

    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (!candidate || (typeof candidate !== 'object' && typeof candidate !== 'function')) {
        continue;
      }

      try {
        var moduleCandidate = candidate.cineLocale;
        if (moduleCandidate && typeof moduleCandidate === 'object') {
          return moduleCandidate;
        }
      } catch (localeLookupError) {
        void localeLookupError;
      }
    }

    if (typeof require === 'function') {
      try {
        var required = require('../localization.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (localeRequireError) {
        void localeRequireError;
      }
    }

    return null;
  }

  function fallbackNormalizeLanguageCode(lang, options) {
    var defaultLanguage = normaliseDefaultLanguage(options);
    if (!lang) {
      return defaultLanguage;
    }

    try {
      var normalised = String(lang).trim().toLowerCase();
      return normalised || defaultLanguage;
    } catch (languageNormalizeError) {
      void languageNormalizeError;
    }

    return defaultLanguage;
  }

  function fallbackIsRtlLanguage(lang, options) {
    var rtlCodes = normaliseRtlCodes(options);
    var normalized = fallbackNormalizeLanguageCode(lang, options);
    var base = normalized.split('-')[0];
    return rtlCodes.indexOf(base) !== -1;
  }

  function fallbackResolveDocumentDirection(lang, options) {
    if (typeof document !== 'undefined' && document && document.documentElement) {
      try {
        var docDir = document.documentElement.getAttribute('dir');
        if (docDir === 'rtl' || docDir === 'ltr') {
          return docDir;
        }
      } catch (documentDirectionError) {
        void documentDirectionError;
      }
    }

    return fallbackIsRtlLanguage(lang, options) ? 'rtl' : 'ltr';
  }

  function fallbackApplyLocaleMetadata(target, lang, direction) {
    if (!target) {
      return;
    }

    if (lang) {
      try {
        target.lang = lang;
      } catch (setLangError) {
        void setLangError;
      }
    }

    if (direction) {
      try {
        target.dir = direction;
      } catch (setDirError) {
        void setDirError;
      }
    }
  }

  function createLocaleFallbacks(options) {
    var defaultLanguage = normaliseDefaultLanguage(options);
    var rtlLanguageCodes = normaliseRtlCodes(options);

    return {
      getDefaultLanguage: function getDefaultLanguage() {
        return defaultLanguage;
      },
      getRtlLanguageCodes: function getRtlLanguageCodes() {
        return rtlLanguageCodes.slice();
      },
      resolveLocaleModule: function resolveLocaleModule(scope) {
        return fallbackResolveLocaleModule(scope);
      },
      normalizeLanguageCode: function normalizeLanguageCode(lang) {
        return fallbackNormalizeLanguageCode(lang, {
          defaultLanguage: defaultLanguage
        });
      },
      isRtlLanguage: function isRtlLanguage(lang) {
        return fallbackIsRtlLanguage(lang, {
          defaultLanguage: defaultLanguage,
          rtlLanguageCodes: rtlLanguageCodes
        });
      },
      resolveDocumentDirection: function resolveDocumentDirection(lang) {
        return fallbackResolveDocumentDirection(lang, {
          defaultLanguage: defaultLanguage,
          rtlLanguageCodes: rtlLanguageCodes
        });
      },
      applyLocaleMetadata: function applyLocaleMetadata(target, lang, direction) {
        fallbackApplyLocaleMetadata(target, lang, direction);
      }
    };
  }

  var namespace = {
    fallbackResolveLocaleModule: fallbackResolveLocaleModule,
    fallbackNormalizeLanguageCode: fallbackNormalizeLanguageCode,
    fallbackIsRtlLanguage: fallbackIsRtlLanguage,
    fallbackResolveDocumentDirection: fallbackResolveDocumentDirection,
    fallbackApplyLocaleMetadata: fallbackApplyLocaleMetadata,
    createLocaleFallbacks: createLocaleFallbacks
  };

  var globalScope = detectGlobalScope();
  var targetName = 'cineCoreLocalizationFallbacks';
  var existing =
    globalScope && typeof globalScope[targetName] === 'object'
      ? globalScope[targetName]
      : {};

  for (var key in namespace) {
    if (Object.prototype.hasOwnProperty.call(namespace, key)) {
      existing[key] = namespace[key];
    }
  }

  if (globalScope) {
    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
