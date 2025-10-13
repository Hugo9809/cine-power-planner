/* global cineLocale, CORE_GLOBAL_SCOPE */

(function () {
  function detectRuntimeScope() {
    if (
      typeof CORE_GLOBAL_SCOPE !== 'undefined' &&
      CORE_GLOBAL_SCOPE &&
      (typeof CORE_GLOBAL_SCOPE === 'object' || typeof CORE_GLOBAL_SCOPE === 'function')
    ) {
      return CORE_GLOBAL_SCOPE;
    }

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

  function createInlineLocalizationFallbackImplementation() {
    function inlineFallbackResolveLocaleModule(scope) {
      if (
        typeof cineLocale !== 'undefined' &&
        cineLocale &&
        typeof cineLocale === 'object'
      ) {
        return cineLocale;
      }

      const candidates = [];
      if (scope && (typeof scope === 'object' || typeof scope === 'function')) {
        candidates.push(scope);
      }
      if (typeof globalThis !== 'undefined') candidates.push(globalThis);
      if (typeof window !== 'undefined') candidates.push(window);
      if (typeof self !== 'undefined') candidates.push(self);
      if (typeof global !== 'undefined') candidates.push(global);

      for (let index = 0; index < candidates.length; index += 1) {
        const candidate = candidates[index];
        if (!candidate || (typeof candidate !== 'object' && typeof candidate !== 'function')) {
          continue;
        }

        try {
          const moduleCandidate = candidate.cineLocale;
          if (moduleCandidate && typeof moduleCandidate === 'object') {
            return moduleCandidate;
          }
        } catch (localeLookupError) {
          void localeLookupError;
        }
      }

      if (typeof require === 'function') {
        try {
          const required = require('../localization.js');
          if (required && typeof required === 'object') {
            return required;
          }
        } catch (localeRequireError) {
          void localeRequireError;
        }
      }

      return null;
    }

    function inlineCreateLocaleFallbacks(options) {
      const defaultLanguage = (function resolveDefaultLanguageOption() {
        if (options && typeof options.defaultLanguage === 'string') {
          try {
            const normalized = options.defaultLanguage.trim().toLowerCase();
            return normalized || 'en';
          } catch (defaultLanguageNormalizeError) {
            void defaultLanguageNormalizeError;
          }
        }
        return 'en';
      })();

      const rtlLanguageCodes = (function resolveRtlCodesOption() {
        if (options && Array.isArray(options.rtlLanguageCodes)) {
          const collected = [];
          for (let index = 0; index < options.rtlLanguageCodes.length; index += 1) {
            const rawCode = options.rtlLanguageCodes[index];
            if (typeof rawCode === 'string') {
              try {
                const normalized = rawCode.trim().toLowerCase();
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
      })();

      function inlineNormalizeLanguageCode(lang) {
        if (!lang) {
          return defaultLanguage;
        }

        try {
          const normalized = String(lang).trim().toLowerCase();
          return normalized || defaultLanguage;
        } catch (languageNormalizeError) {
          void languageNormalizeError;
        }

        return defaultLanguage;
      }

      function inlineIsRtlLanguage(lang) {
        const normalized = inlineNormalizeLanguageCode(lang);
        const base = normalized.split('-')[0];
        return rtlLanguageCodes.indexOf(base) !== -1;
      }

      function inlineResolveDocumentDirection(lang) {
        if (typeof document !== 'undefined' && document && document.documentElement) {
          try {
            const docDir = document.documentElement.getAttribute('dir');
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
        getDefaultLanguage() {
          return defaultLanguage;
        },
        getRtlLanguageCodes() {
          return rtlLanguageCodes.slice();
        },
        resolveLocaleModule(scope) {
          return inlineFallbackResolveLocaleModule(scope);
        },
        normalizeLanguageCode(lang) {
          return inlineNormalizeLanguageCode(lang);
        },
        isRtlLanguage(lang) {
          return inlineIsRtlLanguage(lang);
        },
        resolveDocumentDirection(lang) {
          return inlineResolveDocumentDirection(lang);
        },
        applyLocaleMetadata(target, lang, direction) {
          return inlineApplyLocaleMetadata(target, lang, direction);
        },
      };
    }

    return {
      fallbackResolveLocaleModule: inlineFallbackResolveLocaleModule,
      createLocaleFallbacks: inlineCreateLocaleFallbacks,
    };
  }

  function resolveFallbackModule() {
    const scope = detectRuntimeScope();
    if (
      scope &&
      scope.cineCoreLocalizationFallbacks &&
      typeof scope.cineCoreLocalizationFallbacks === 'object'
    ) {
      return scope.cineCoreLocalizationFallbacks;
    }

    if (typeof require === 'function') {
      try {
        const requiredFallbacks = require('./localization-fallbacks.js');
        if (requiredFallbacks && typeof requiredFallbacks === 'object') {
          return requiredFallbacks;
        }
      } catch (fallbackRequireError) {
        void fallbackRequireError;
      }
    }

    return null;
  }

  function createInlineLocalizationFallbackNamespace() {
    const fallbackModule = resolveFallbackModule();
    if (
      fallbackModule &&
      typeof fallbackModule === 'object' &&
      typeof fallbackModule.fallbackResolveLocaleModule === 'function' &&
      typeof fallbackModule.createLocaleFallbacks === 'function'
    ) {
      return {
        fallbackResolveLocaleModule(scope) {
          return fallbackModule.fallbackResolveLocaleModule(scope);
        },
        createLocaleFallbacks(options) {
          return fallbackModule.createLocaleFallbacks(options);
        },
      };
    }

    return createInlineLocalizationFallbackImplementation();
  }

  const runtimeScope = detectRuntimeScope();
  const namespace = createInlineLocalizationFallbackNamespace();
  namespace.createInlineLocalizationFallbackNamespace = createInlineLocalizationFallbackNamespace;
  namespace.createNamespace = createInlineLocalizationFallbackNamespace;

  if (runtimeScope && typeof runtimeScope === 'object') {
    const targetName = 'cineCoreLocalizationInlineFallbacks';
    const existing =
      runtimeScope[targetName] && typeof runtimeScope[targetName] === 'object'
        ? runtimeScope[targetName]
        : namespace;

    existing.fallbackResolveLocaleModule = namespace.fallbackResolveLocaleModule;
    existing.createLocaleFallbacks = namespace.createLocaleFallbacks;
    existing.createInlineLocalizationFallbackNamespace =
      namespace.createInlineLocalizationFallbackNamespace;
    existing.createNamespace = namespace.createNamespace;

    runtimeScope[targetName] = existing;

    if (typeof module === 'object' && module && module.exports) {
      module.exports = existing;
    }
  } else if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
