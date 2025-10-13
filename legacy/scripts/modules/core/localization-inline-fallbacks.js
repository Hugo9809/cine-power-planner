function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function detectRuntimeScope() {
    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && ((typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' || typeof CORE_GLOBAL_SCOPE === 'function')) {
      return CORE_GLOBAL_SCOPE;
    }
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
  function createInlineLocalizationFallbackImplementation() {
    function inlineFallbackResolveLocaleModule(scope) {
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
          var required = require('../localization.js');
          if (required && _typeof(required) === 'object') {
            return required;
          }
        } catch (localeRequireError) {
          void localeRequireError;
        }
      }
      return null;
    }
    function inlineCreateLocaleFallbacks(options) {
      var defaultLanguage = function resolveDefaultLanguageOption() {
        if (options && typeof options.defaultLanguage === 'string') {
          try {
            var normalized = options.defaultLanguage.trim().toLowerCase();
            return normalized || 'en';
          } catch (defaultLanguageNormalizeError) {
            void defaultLanguageNormalizeError;
          }
        }
        return 'en';
      }();
      var rtlLanguageCodes = function resolveRtlCodesOption() {
        if (options && Array.isArray(options.rtlLanguageCodes)) {
          var collected = [];
          for (var index = 0; index < options.rtlLanguageCodes.length; index += 1) {
            var rawCode = options.rtlLanguageCodes[index];
            if (typeof rawCode === 'string') {
              try {
                var normalized = rawCode.trim().toLowerCase();
                if (normalized && collected.indexOf(normalized) === -1) {
                  collected.push(normalized);
                }
              } catch (rtlNormalizeError) {
                void rtlNormalizeError;
              }
            }
          }
          if (collected.length > 0) {
            return collected;
          }
        }
        return ['ar', 'fa', 'he', 'ur'];
      }();
      function inlineNormalizeLanguageCode(lang) {
        if (!lang) {
          return defaultLanguage;
        }
        try {
          var normalized = String(lang).trim().toLowerCase();
          return normalized || defaultLanguage;
        } catch (languageNormalizeError) {
          void languageNormalizeError;
        }
        return defaultLanguage;
      }
      function inlineIsRtlLanguage(lang) {
        var normalized = inlineNormalizeLanguageCode(lang);
        var base = normalized.split('-')[0];
        return rtlLanguageCodes.indexOf(base) !== -1;
      }
      function inlineResolveDocumentDirection(lang) {
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
        return inlineIsRtlLanguage(lang) ? 'rtl' : 'ltr';
      }
      function inlineApplyLocaleMetadata(target, lang, direction) {
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
      return {
        getDefaultLanguage: function getDefaultLanguage() {
          return defaultLanguage;
        },
        getRtlLanguageCodes: function getRtlLanguageCodes() {
          return rtlLanguageCodes.slice();
        },
        resolveLocaleModule: function resolveLocaleModule(scope) {
          return inlineFallbackResolveLocaleModule(scope);
        },
        normalizeLanguageCode: function normalizeLanguageCode(lang) {
          return inlineNormalizeLanguageCode(lang);
        },
        isRtlLanguage: function isRtlLanguage(lang) {
          return inlineIsRtlLanguage(lang);
        },
        resolveDocumentDirection: function resolveDocumentDirection(lang) {
          return inlineResolveDocumentDirection(lang);
        },
        applyLocaleMetadata: function applyLocaleMetadata(target, lang, direction) {
          return inlineApplyLocaleMetadata(target, lang, direction);
        }
      };
    }
    return {
      fallbackResolveLocaleModule: inlineFallbackResolveLocaleModule,
      createLocaleFallbacks: inlineCreateLocaleFallbacks
    };
  }
  function resolveFallbackModule() {
    var scope = detectRuntimeScope();
    if (scope && scope.cineCoreLocalizationFallbacks && _typeof(scope.cineCoreLocalizationFallbacks) === 'object') {
      return scope.cineCoreLocalizationFallbacks;
    }
    if (typeof require === 'function') {
      try {
        var requiredFallbacks = require('./localization-fallbacks.js');
        if (requiredFallbacks && _typeof(requiredFallbacks) === 'object') {
          return requiredFallbacks;
        }
      } catch (fallbackRequireError) {
        void fallbackRequireError;
      }
    }
    return null;
  }
  function createInlineLocalizationFallbackNamespace() {
    var fallbackModule = resolveFallbackModule();
    if (fallbackModule && _typeof(fallbackModule) === 'object' && typeof fallbackModule.fallbackResolveLocaleModule === 'function' && typeof fallbackModule.createLocaleFallbacks === 'function') {
      return {
        fallbackResolveLocaleModule: function fallbackResolveLocaleModule(scope) {
          return fallbackModule.fallbackResolveLocaleModule(scope);
        },
        createLocaleFallbacks: function createLocaleFallbacks(options) {
          return fallbackModule.createLocaleFallbacks(options);
        }
      };
    }
    return createInlineLocalizationFallbackImplementation();
  }
  var runtimeScope = detectRuntimeScope();
  var namespace = createInlineLocalizationFallbackNamespace();
  namespace.createInlineLocalizationFallbackNamespace = createInlineLocalizationFallbackNamespace;
  namespace.createNamespace = createInlineLocalizationFallbackNamespace;
  if (runtimeScope && _typeof(runtimeScope) === 'object') {
    var targetName = 'cineCoreLocalizationInlineFallbacks';
    var existing = runtimeScope[targetName] && _typeof(runtimeScope[targetName]) === 'object' ? runtimeScope[targetName] : namespace;
    existing.fallbackResolveLocaleModule = namespace.fallbackResolveLocaleModule;
    existing.createLocaleFallbacks = namespace.createLocaleFallbacks;
    existing.createInlineLocalizationFallbackNamespace = namespace.createInlineLocalizationFallbackNamespace;
    existing.createNamespace = namespace.createNamespace;
    runtimeScope[targetName] = existing;
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
      module.exports = existing;
    }
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();