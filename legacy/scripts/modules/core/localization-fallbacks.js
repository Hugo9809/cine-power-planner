function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var FALLBACK_DEFAULT_LANGUAGE = 'en';
  var FALLBACK_RTL_CODES = Object.freeze(['ar', 'fa', 'he', 'ur']);
  function detectGlobalScope() {
    if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' && globalThis) {
      return globalThis;
    }
    if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window) {
      return window;
    }
    if ((typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' && self) {
      return self;
    }
    if ((typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' && global) {
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
    var candidate = options && typeof options.defaultLanguage === 'string' ? toLowerCaseSafe(options.defaultLanguage) : '';
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
    if (typeof cineLocale !== 'undefined' && cineLocale && (typeof cineLocale === "undefined" ? "undefined" : _typeof(cineLocale)) === 'object') {
      return cineLocale;
    }
    var candidates = [];
    if (scope && (_typeof(scope) === 'object' || typeof scope === 'function')) {
      candidates.push(scope);
    }
    if (typeof globalThis !== 'undefined') candidates.push(globalThis);
    if (typeof window !== 'undefined') candidates.push(window);
    if (typeof self !== 'undefined') candidates.push(self);
    if (typeof global !== 'undefined') candidates.push(global);
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (!candidate || _typeof(candidate) !== 'object' && typeof candidate !== 'function') {
        continue;
      }
      try {
        var moduleCandidate = candidate.cineLocale;
        if (moduleCandidate && _typeof(moduleCandidate) === 'object') {
          return moduleCandidate;
        }
      } catch (localeLookupError) {
        void localeLookupError;
      }
    }
    if (typeof require === 'function') {
      try {
        var required = require('./modules/localization.js');
        if (required && _typeof(required) === 'object') {
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
        return fallbackApplyLocaleMetadata(target, lang, direction);
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
  var existing = globalScope && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
  for (var _i = 0, _Object$keys = Object.keys(namespace); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    existing[key] = namespace[key];
  }
  if (globalScope) {
    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();