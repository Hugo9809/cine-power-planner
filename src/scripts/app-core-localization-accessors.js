/*
 * Extracted from app-core-new-1.js to keep module boundaries manageable.
 * The logic remains identical to protect autosave, offline, and localization behaviours.
 */

function createInlineLocalizationAccessors(options) {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  const runtime =
    options && options.coreLocalizationRuntime &&
    (typeof options.coreLocalizationRuntime === 'object' ||
      typeof options.coreLocalizationRuntime === 'function')
      ? options.coreLocalizationRuntime
      : null;
  const localizationBridge =
    options && options.coreLocalizationBridge &&
    (typeof options.coreLocalizationBridge === 'object' ||
      typeof options.coreLocalizationBridge === 'function')
      ? options.coreLocalizationBridge
      : null;
  const runtimeScope = options && options.corePartRuntimeScope;
  const coreGlobalScope = options && options.coreGlobalScope;
  const fallbackResolveLocaleModule =
    options && typeof options.fallbackResolveLocaleModule === 'function'
      ? options.fallbackResolveLocaleModule
      : null;
  const requireFn =
    options && typeof options.requireFn === 'function'
      ? options.requireFn
      : typeof require === 'function'
      ? require
      : null;
  const translationsRequirePath =
    options && typeof options.translationsRequirePath === 'string' && options.translationsRequirePath
      ? options.translationsRequirePath
      : './translations.js';

  const fallbackScopes = (function collectInlineLocalizationScopes() {
    const scopes = [];
    const seen = typeof Set === 'function' ? new Set() : null;

    function register(scope) {
      if (!isObject(scope)) {
        return;
      }

      if (seen) {
        if (seen.has(scope)) {
          return;
        }

        seen.add(scope);
        scopes.push(scope);
        return;
      }

      if (scopes.indexOf(scope) !== -1) {
        return;
      }

      scopes.push(scope);
    }

    register(runtimeScope);
    register(coreGlobalScope);
    register(typeof globalThis !== 'undefined' ? globalThis : null);
    register(typeof window !== 'undefined' ? window : null);
    register(typeof self !== 'undefined' ? self : null);
    register(typeof global !== 'undefined' ? global : null);

    return scopes;
  })();

  const localeModule =
    (runtime && runtime.localeModule) ||
    (fallbackResolveLocaleModule ? fallbackResolveLocaleModule(runtimeScope) : null);

  const defaultLanguage =
    (runtime && runtime.defaultLanguage) ||
    (localeModule && typeof localeModule.DEFAULT_LANGUAGE === 'string'
      ? localeModule.DEFAULT_LANGUAGE
      : 'en');

  const rtlLanguageCodes =
    (runtime && runtime.rtlLanguageCodes) ||
    (localeModule &&
    Array.isArray(localeModule.RTL_LANGUAGE_CODES) &&
    localeModule.RTL_LANGUAGE_CODES.length > 0
      ? localeModule.RTL_LANGUAGE_CODES
      : ['ar', 'fa', 'he', 'ur']);

  function fallbackNormalizeLanguageCodeProxy(lang) {
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

  const normalizeLanguageCode = runtime &&
    typeof runtime.normalizeLanguageCode === 'function'
      ? function runtimeNormalizeLanguageCodeProxy(lang) {
          try {
            return runtime.normalizeLanguageCode(lang);
          } catch (runtimeNormalizeError) {
            void runtimeNormalizeError;
          }

          return fallbackNormalizeLanguageCodeProxy(lang);
        }
      : localizationBridge &&
        typeof localizationBridge.normalizeLanguageCode === 'function'
      ? function bridgeNormalizeLanguageCodeProxy(lang) {
          try {
            return localizationBridge.normalizeLanguageCode(lang, runtimeScope);
          } catch (bridgeNormalizeError) {
            void bridgeNormalizeError;
          }

          return fallbackNormalizeLanguageCodeProxy(lang);
        }
      : fallbackNormalizeLanguageCodeProxy;

  function fallbackIsRtlLanguageProxy(lang) {
    const normalized = normalizeLanguageCode(lang);
    const base = normalized.split('-')[0];
    return rtlLanguageCodes.indexOf(base) !== -1;
  }

  const isRtlLanguage = runtime && typeof runtime.isRtlLanguage === 'function'
    ? function runtimeIsRtlLanguageProxy(lang) {
        try {
          return runtime.isRtlLanguage(lang);
        } catch (runtimeIsRtlError) {
          void runtimeIsRtlError;
        }

        return fallbackIsRtlLanguageProxy(lang);
      }
    : localizationBridge && typeof localizationBridge.isRtlLanguage === 'function'
    ? function bridgeIsRtlLanguageProxy(lang) {
        try {
          return localizationBridge.isRtlLanguage(lang, runtimeScope);
        } catch (bridgeIsRtlError) {
          void bridgeIsRtlError;
        }

        return fallbackIsRtlLanguageProxy(lang);
      }
    : fallbackIsRtlLanguageProxy;

  function fallbackResolveDocumentDirectionProxy(lang) {
    if (typeof document !== 'undefined' && document && document.documentElement) {
      try {
        const docDir = document.documentElement.getAttribute('dir');
        if (docDir) {
          return docDir;
        }
      } catch (resolveDirectionError) {
        void resolveDirectionError;
      }
    }

    return isRtlLanguage(lang) ? 'rtl' : 'ltr';
  }

  const resolveDocumentDirection = runtime &&
    typeof runtime.resolveDocumentDirection === 'function'
      ? function runtimeResolveDocumentDirectionProxy(lang) {
          try {
            return runtime.resolveDocumentDirection(lang);
          } catch (runtimeResolveDirectionError) {
            void runtimeResolveDirectionError;
          }

          return fallbackResolveDocumentDirectionProxy(lang);
        }
      : localizationBridge &&
        typeof localizationBridge.resolveDocumentDirection === 'function'
      ? function bridgeResolveDocumentDirectionProxy(lang) {
          try {
            return localizationBridge.resolveDocumentDirection(lang, runtimeScope);
          } catch (bridgeResolveDirectionError) {
            void bridgeResolveDirectionError;
          }

          return fallbackResolveDocumentDirectionProxy(lang);
        }
      : fallbackResolveDocumentDirectionProxy;

  function fallbackApplyLocaleMetadataProxy(target, lang, direction) {
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

  const applyLocaleMetadata = runtime &&
    typeof runtime.applyLocaleMetadata === 'function'
      ? function runtimeApplyLocaleMetadataProxy(target, lang, direction) {
          try {
            return runtime.applyLocaleMetadata(target, lang, direction);
          } catch (runtimeApplyLocaleError) {
            void runtimeApplyLocaleError;
          }

          return fallbackApplyLocaleMetadataProxy(target, lang, direction);
        }
      : localizationBridge &&
        typeof localizationBridge.applyLocaleMetadata === 'function'
      ? function bridgeApplyLocaleMetadataProxy(target, lang, direction) {
          try {
            return localizationBridge.applyLocaleMetadata(
              target,
              lang,
              direction,
              runtimeScope
            );
          } catch (bridgeApplyLocaleError) {
            void bridgeApplyLocaleError;
          }

          return fallbackApplyLocaleMetadataProxy(target, lang, direction);
        }
      : fallbackApplyLocaleMetadataProxy;

  function fallbackResolveTranslationDataset() {
    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];
      if (!isObject(scope)) {
        continue;
      }

      const dataset = scope.texts;
      if (isObject(dataset)) {
        return dataset;
      }
    }

    if (typeof requireFn === 'function') {
      try {
        const translationsModule = requireFn(translationsRequirePath);
        if (
          isObject(translationsModule) &&
          isObject(translationsModule.texts)
        ) {
          return translationsModule.texts;
        }
      } catch (translationRequireError) {
        void translationRequireError;
      }
    }

    return {};
  }

  function fallbackGetLanguageTextsProxy(lang) {
    const dataset = fallbackResolveTranslationDataset();
    const fallbackLang = typeof defaultLanguage === 'string' && defaultLanguage
      ? defaultLanguage
      : 'en';

    let normalized = null;
    if (typeof lang === 'string' && lang) {
      try {
        normalized = String(lang).trim().toLowerCase();
      } catch (normalizeError) {
        void normalizeError;
        normalized = null;
      }
    }

    let resolved =
      normalized && Object.prototype.hasOwnProperty.call(dataset, normalized)
        ? normalized
        : '';

    if (!resolved && normalized) {
      const base = normalized.split('-')[0];
      if (base && Object.prototype.hasOwnProperty.call(dataset, base)) {
        resolved = base;
      }
    }

    if (!resolved) {
      resolved = fallbackLang;
    }

    const candidate =
      dataset && resolved && typeof dataset[resolved] === 'object'
        ? dataset[resolved]
        : null;
    if (candidate) {
      return candidate;
    }

    if (resolved !== fallbackLang) {
      const fallbackCandidate =
        dataset && typeof dataset[fallbackLang] === 'object' ? dataset[fallbackLang] : null;
      if (fallbackCandidate) {
        return fallbackCandidate;
      }
    }

    if (dataset && typeof dataset.en === 'object') {
      return dataset.en;
    }

    const languages = dataset ? Object.keys(dataset) : [];
    if (languages.length) {
      const firstLang = languages[0];
      const firstTexts = dataset[firstLang];
      if (firstTexts && typeof firstTexts === 'object') {
        return firstTexts;
      }
    }

    return {};
  }

  const getLanguageTexts = runtime && typeof runtime.getLanguageTexts === 'function'
    ? function runtimeGetLanguageTextsProxy(lang) {
        try {
          return runtime.getLanguageTexts(lang);
        } catch (runtimeGetLanguageTextsError) {
          void runtimeGetLanguageTextsError;
        }

        return fallbackGetLanguageTextsProxy(lang);
      }
    : fallbackGetLanguageTextsProxy;

  function ensureGlobalGetLanguageTextsAvailability(getLanguageTextsFn) {
    if (
      runtime &&
      typeof runtime.ensureGlobalGetLanguageTextsAvailability === 'function'
    ) {
      try {
        runtime.ensureGlobalGetLanguageTextsAvailability();
        return;
      } catch (ensureError) {
        void ensureError;
      }
    }

    const assignableFunction =
      typeof getLanguageTextsFn === 'function' ? getLanguageTextsFn : getLanguageTexts;

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];
      if (!isObject(scope)) {
        continue;
      }

      if (typeof scope.getLanguageTexts !== 'function') {
        try {
          scope.getLanguageTexts = assignableFunction;
        } catch (assignError) {
          void assignError;
        }
      }
    }
  }

  return {
    localeModule: isObject(localeModule) ? localeModule : null,
    defaultLanguage: typeof defaultLanguage === 'string' && defaultLanguage ? defaultLanguage : 'en',
    rtlLanguageCodes:
      Array.isArray(rtlLanguageCodes) && rtlLanguageCodes.length
        ? rtlLanguageCodes
        : ['ar', 'fa', 'he', 'ur'],
    normalizeLanguageCode,
    isRtlLanguage,
    resolveDocumentDirection,
    applyLocaleMetadata,
    getLanguageTexts,
    ensureGlobalGetLanguageTextsAvailability,
    fallbackResolveTranslationDataset,
  };
}

const createLocalizationAccessors =
  (LOCALIZATION_ACCESSORS_TOOLS &&
  typeof LOCALIZATION_ACCESSORS_TOOLS.createLocalizationAccessors === 'function'
    ? LOCALIZATION_ACCESSORS_TOOLS.createLocalizationAccessors
    : null) ||
  (function fallbackResolveLocalizationAccessorsFactory() {
    if (typeof require === 'function') {
      try {
        const required = require('./modules/app-core/localization.js');
        if (
          required &&
          typeof required.createLocalizationAccessors === 'function'
        ) {
          return required.createLocalizationAccessors;
        }
      } catch (localizationAccessorsRequireError) {
        void localizationAccessorsRequireError;
      }
    }

    const fallbackScopes = [
      typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' ? CORE_PART1_RUNTIME_SCOPE : null,
      typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null,
      typeof globalThis !== 'undefined' ? globalThis : null,
      typeof window !== 'undefined' ? window : null,
      typeof self !== 'undefined' ? self : null,
      typeof global !== 'undefined' ? global : null,
    ];

    for (let index = 0; index < fallbackScopes.length; index += 1) {
      const scope = fallbackScopes[index];
      if (!scope || typeof scope !== 'object') {
        continue;
      }

      try {
        const candidate = scope.cineCoreAppLocalizationAccessors;
        if (
          candidate &&
          typeof candidate.createLocalizationAccessors === 'function'
        ) {
          return candidate.createLocalizationAccessors;
        }
      } catch (localizationAccessorsLookupError) {
        void localizationAccessorsLookupError;
      }
    }

    return null;
  })();

var ACTIVE_LOCALIZATION_ACCESSORS =
  (typeof createLocalizationAccessors === 'function'
    ? createLocalizationAccessors({
        coreLocalizationRuntime: CORE_LOCALIZATION_RUNTIME,
        coreLocalizationBridge: CORE_LOCALIZATION_BRIDGE,
        corePartRuntimeScope: CORE_PART1_RUNTIME_SCOPE,
        coreGlobalScope: CORE_PART1_RUNTIME_SCOPE,
        fallbackResolveLocaleModule,
        requireFn: typeof require === 'function' ? require : null,
        translationsRequirePath: './translations.js',
      })
    : null) ||
  createInlineLocalizationAccessors({
    coreLocalizationRuntime: CORE_LOCALIZATION_RUNTIME,
    coreLocalizationBridge: CORE_LOCALIZATION_BRIDGE,
    corePartRuntimeScope: CORE_PART1_RUNTIME_SCOPE,
    coreGlobalScope: CORE_PART1_RUNTIME_SCOPE,
    fallbackResolveLocaleModule,
    requireFn: typeof require === 'function' ? require : null,
    translationsRequirePath: './translations.js',
  });

var LOCALE_MODULE =
  ACTIVE_LOCALIZATION_ACCESSORS && ACTIVE_LOCALIZATION_ACCESSORS.localeModule
    ? ACTIVE_LOCALIZATION_ACCESSORS.localeModule
    : null;

var DEFAULT_LANGUAGE =
  ACTIVE_LOCALIZATION_ACCESSORS && ACTIVE_LOCALIZATION_ACCESSORS.defaultLanguage
    ? ACTIVE_LOCALIZATION_ACCESSORS.defaultLanguage
    : 'en';

var RTL_LANGUAGE_CODES =
  ACTIVE_LOCALIZATION_ACCESSORS &&
  Array.isArray(ACTIVE_LOCALIZATION_ACCESSORS.rtlLanguageCodes) &&
  ACTIVE_LOCALIZATION_ACCESSORS.rtlLanguageCodes.length > 0
    ? ACTIVE_LOCALIZATION_ACCESSORS.rtlLanguageCodes
    : ['ar', 'fa', 'he', 'ur'];

var normalizeLanguageCode =
  ACTIVE_LOCALIZATION_ACCESSORS &&
  typeof ACTIVE_LOCALIZATION_ACCESSORS.normalizeLanguageCode === 'function'
    ? ACTIVE_LOCALIZATION_ACCESSORS.normalizeLanguageCode
    : function fallbackNormalizeLanguageCodeProxy(lang) {
        if (!lang) {
          return DEFAULT_LANGUAGE;
        }

        try {
          const normalized = String(lang).trim().toLowerCase();
          return normalized || DEFAULT_LANGUAGE;
        } catch (languageNormalizeError) {
          void languageNormalizeError;
        }

        return DEFAULT_LANGUAGE;
      };

var isRtlLanguage =
  ACTIVE_LOCALIZATION_ACCESSORS &&
  typeof ACTIVE_LOCALIZATION_ACCESSORS.isRtlLanguage === 'function'
    ? ACTIVE_LOCALIZATION_ACCESSORS.isRtlLanguage
    : function fallbackIsRtlLanguageProxy(lang) {
        const normalized = normalizeLanguageCode(lang);
        const base = normalized.split('-')[0];
        return RTL_LANGUAGE_CODES.indexOf(base) !== -1;
      };

var resolveDocumentDirection =
  ACTIVE_LOCALIZATION_ACCESSORS &&
  typeof ACTIVE_LOCALIZATION_ACCESSORS.resolveDocumentDirection === 'function'
    ? ACTIVE_LOCALIZATION_ACCESSORS.resolveDocumentDirection
    : function fallbackResolveDocumentDirectionProxy(lang) {
        if (typeof document !== 'undefined' && document && document.documentElement) {
          try {
            const docDir = document.documentElement.getAttribute('dir');
            if (docDir) {
              return docDir;
            }
          } catch (resolveDirectionError) {
            void resolveDirectionError;
          }
        }

        return isRtlLanguage(lang) ? 'rtl' : 'ltr';
      };

var applyLocaleMetadata =
  ACTIVE_LOCALIZATION_ACCESSORS &&
  typeof ACTIVE_LOCALIZATION_ACCESSORS.applyLocaleMetadata === 'function'
    ? ACTIVE_LOCALIZATION_ACCESSORS.applyLocaleMetadata
    : function fallbackApplyLocaleMetadataProxy(target, lang, direction) {
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
      };

var existingGetLanguageTexts =
  typeof getLanguageTexts === 'function' ? getLanguageTexts : null;

var resolvedGetLanguageTexts =
  ACTIVE_LOCALIZATION_ACCESSORS &&
  typeof ACTIVE_LOCALIZATION_ACCESSORS.getLanguageTexts === 'function'
    ? ACTIVE_LOCALIZATION_ACCESSORS.getLanguageTexts
    : existingGetLanguageTexts ||
      function fallbackGetLanguageTextsProxy() {
        return {};
      };

try {
  getLanguageTexts = resolvedGetLanguageTexts;
} catch (assignGetLanguageTextsError) {
  void assignGetLanguageTextsError;
}

if (
  ACTIVE_LOCALIZATION_ACCESSORS &&
  typeof ACTIVE_LOCALIZATION_ACCESSORS.ensureGlobalGetLanguageTextsAvailability ===
    'function'
) {
  try {
    ACTIVE_LOCALIZATION_ACCESSORS.ensureGlobalGetLanguageTextsAvailability(
      resolvedGetLanguageTexts
    );
  } catch (ensureGetLanguageTextsAvailabilityError) {
    void ensureGetLanguageTextsAvailabilityError;
  }
}


