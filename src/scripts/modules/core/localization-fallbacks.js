/* global cineLocale */

(function () {
  const FALLBACK_DEFAULT_LANGUAGE = 'en';
  const FALLBACK_RTL_CODES = Object.freeze(['ar', 'fa', 'he', 'ur']);

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
    const candidate =
      options && typeof options.defaultLanguage === 'string'
        ? toLowerCaseSafe(options.defaultLanguage)
        : '';

    return candidate || FALLBACK_DEFAULT_LANGUAGE;
  }

  function normaliseRtlCodes(options) {
    if (options && Array.isArray(options.rtlLanguageCodes)) {
      const normalised = [];

      for (let index = 0; index < options.rtlLanguageCodes.length; index += 1) {
        const rawCode = options.rtlLanguageCodes[index];
        const code = toLowerCaseSafe(String(rawCode || ''));
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
        const required = require('./modules/localization.js');
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
    const defaultLanguage = normaliseDefaultLanguage(options);
    if (!lang) {
      return defaultLanguage;
    }

    try {
      const normalised = String(lang).trim().toLowerCase();
      return normalised || defaultLanguage;
    } catch (languageNormalizeError) {
      void languageNormalizeError;
    }

    return defaultLanguage;
  }

  function fallbackIsRtlLanguage(lang, options) {
    const rtlCodes = normaliseRtlCodes(options);
    const normalized = fallbackNormalizeLanguageCode(lang, options);
    const base = normalized.split('-')[0];
    return rtlCodes.indexOf(base) !== -1;
  }

  function fallbackResolveDocumentDirection(lang, options) {
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
    const defaultLanguage = normaliseDefaultLanguage(options);
    const rtlLanguageCodes = normaliseRtlCodes(options);

    return {
      getDefaultLanguage() {
        return defaultLanguage;
      },
      getRtlLanguageCodes() {
        return rtlLanguageCodes.slice();
      },
      resolveLocaleModule(scope) {
        return fallbackResolveLocaleModule(scope);
      },
      normalizeLanguageCode(lang) {
        return fallbackNormalizeLanguageCode(lang, {
          defaultLanguage,
        });
      },
      isRtlLanguage(lang) {
        return fallbackIsRtlLanguage(lang, {
          defaultLanguage,
          rtlLanguageCodes,
        });
      },
      resolveDocumentDirection(lang) {
        return fallbackResolveDocumentDirection(lang, {
          defaultLanguage,
          rtlLanguageCodes,
        });
      },
      applyLocaleMetadata(target, lang, direction) {
        return fallbackApplyLocaleMetadata(target, lang, direction);
      },
    };
  }

  const namespace = {
    fallbackResolveLocaleModule,
    fallbackNormalizeLanguageCode,
    fallbackIsRtlLanguage,
    fallbackResolveDocumentDirection,
    fallbackApplyLocaleMetadata,
    createLocaleFallbacks,
  };

  const globalScope = detectGlobalScope();
  const targetName = 'cineCoreLocalizationFallbacks';
  const existing =
    globalScope && typeof globalScope[targetName] === 'object'
      ? globalScope[targetName]
      : {};

  for (const key of Object.keys(namespace)) {
    existing[key] = namespace[key];
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
