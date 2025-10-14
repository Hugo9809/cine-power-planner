/*
 * Provides localisation helper accessors for the modern Cine Power Planner runtime.
 *
 * The logic used to live directly in the monolithic app core file. Extracting it
 * into this dedicated helper keeps the orchestration lean while preserving every
 * fallback that protects offline usage, localisation data and translation safety.
 */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function ensureRequireFn(candidate) {
    if (typeof candidate === 'function') {
      return candidate;
    }

    if (typeof require === 'function') {
      return require;
    }

    return null;
  }

  function collectFallbackScopes(primaryScope, secondaryScope, additionalScopes) {
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

    register(primaryScope);
    register(secondaryScope);

    if (Array.isArray(additionalScopes)) {
      for (let index = 0; index < additionalScopes.length; index += 1) {
        register(additionalScopes[index]);
      }
    }

    register(typeof globalThis !== 'undefined' ? globalThis : null);
    register(typeof window !== 'undefined' ? window : null);
    register(typeof self !== 'undefined' ? self : null);
    register(typeof global !== 'undefined' ? global : null);

    return scopes;
  }

  function fallbackNormalizeLanguageCodeFactory(defaultLanguage) {
    const fallbackLang =
      typeof defaultLanguage === 'string' && defaultLanguage ? defaultLanguage : 'en';

    return function fallbackNormalizeLanguageCodeProxy(lang) {
      if (!lang) {
        return fallbackLang;
      }

      try {
        const normalized = String(lang).trim().toLowerCase();
        return normalized || fallbackLang;
      } catch (languageNormalizeError) {
        void languageNormalizeError;
      }

      return fallbackLang;
    };
  }

  function fallbackIsRtlLanguageFactory(rtlLanguageCodes, normalizeLanguageCode) {
    const rtlCodes =
      Array.isArray(rtlLanguageCodes) && rtlLanguageCodes.length
        ? rtlLanguageCodes
        : ['ar', 'fa', 'he', 'ur'];

    return function fallbackIsRtlLanguageProxy(lang) {
      const normalized = normalizeLanguageCode(lang);
      const base = normalized.split('-')[0];
      return rtlCodes.indexOf(base) !== -1;
    };
  }

  function fallbackResolveDocumentDirectionFactory(normalizeLanguageCode, isRtlLanguage) {
    return function fallbackResolveDocumentDirectionProxy(lang) {
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
  }

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

  function fallbackResolveTranslationDatasetFactory(
    fallbackScopes,
    requireFn,
    translationsRequirePath
  ) {
    return function fallbackResolveTranslationDataset() {
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
    };
  }

  function fallbackGetLanguageTextsFactory(datasetResolver, defaultLanguage) {
    const fallbackLang =
      typeof defaultLanguage === 'string' && defaultLanguage ? defaultLanguage : 'en';

    return function fallbackGetLanguageTextsProxy(lang) {
      const dataset = datasetResolver();

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
        dataset && resolved && isObject(dataset[resolved]) ? dataset[resolved] : null;
      if (candidate) {
        return candidate;
      }

      if (resolved !== fallbackLang) {
        const fallbackCandidate =
          dataset && isObject(dataset[fallbackLang]) ? dataset[fallbackLang] : null;
        if (fallbackCandidate) {
          return fallbackCandidate;
        }
      }

      if (dataset && isObject(dataset.en)) {
        return dataset.en;
      }

      const languages = dataset ? Object.keys(dataset) : [];
      if (languages.length) {
        const firstLang = languages[0];
        const firstTexts = dataset[firstLang];
        if (isObject(firstTexts)) {
          return firstTexts;
        }
      }

      return {};
    };
  }

  function createEnsureGlobalGetLanguageTextsAvailability(runtime, fallbackScopes) {
    return function ensureGlobalGetLanguageTextsAvailability(getLanguageTextsFn) {
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
        typeof getLanguageTextsFn === 'function'
          ? getLanguageTextsFn
          : function defaultGetLanguageTexts() {
              return {};
            };

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
    };
  }

  function createLocalizationAccessors(options) {
    const runtime = isObject(options && options.coreLocalizationRuntime)
      ? options.coreLocalizationRuntime
      : null;
    const localizationBridge = isObject(options && options.coreLocalizationBridge)
      ? options.coreLocalizationBridge
      : null;
    const runtimeScope = options && options.corePartRuntimeScope;
    const coreGlobalScope = options && options.coreGlobalScope;
    const additionalScopes = options && options.additionalLocalizationScopes;
    const fallbackResolveLocaleModule =
      options && typeof options.fallbackResolveLocaleModule === 'function'
        ? options.fallbackResolveLocaleModule
        : null;
    const requireFn = ensureRequireFn(options && options.requireFn);
    const translationsRequirePath =
      options && typeof options.translationsRequirePath === 'string' && options.translationsRequirePath
        ? options.translationsRequirePath
        : './translations.js';

    const fallbackScopes = collectFallbackScopes(
      runtimeScope,
      coreGlobalScope,
      additionalScopes
    );

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

    const fallbackNormalizeLanguageCode = fallbackNormalizeLanguageCodeFactory(
      defaultLanguage
    );

    const normalizeLanguageCode = runtime &&
      typeof runtime.normalizeLanguageCode === 'function'
        ? function runtimeNormalizeLanguageCode(lang) {
            try {
              return runtime.normalizeLanguageCode(lang);
            } catch (runtimeNormalizeError) {
              void runtimeNormalizeError;
            }

            return fallbackNormalizeLanguageCode(lang);
          }
        : localizationBridge &&
          typeof localizationBridge.normalizeLanguageCode === 'function'
        ? function bridgeNormalizeLanguageCode(lang) {
            try {
              return localizationBridge.normalizeLanguageCode(lang, runtimeScope);
            } catch (bridgeNormalizeError) {
              void bridgeNormalizeError;
            }

            return fallbackNormalizeLanguageCode(lang);
          }
        : fallbackNormalizeLanguageCode;

    const fallbackIsRtlLanguage = fallbackIsRtlLanguageFactory(
      rtlLanguageCodes,
      normalizeLanguageCode
    );

    const isRtlLanguage = runtime && typeof runtime.isRtlLanguage === 'function'
      ? function runtimeIsRtlLanguage(lang) {
          try {
            return runtime.isRtlLanguage(lang);
          } catch (runtimeIsRtlError) {
            void runtimeIsRtlError;
          }

          return fallbackIsRtlLanguage(lang);
        }
      : localizationBridge && typeof localizationBridge.isRtlLanguage === 'function'
      ? function bridgeIsRtlLanguage(lang) {
          try {
            return localizationBridge.isRtlLanguage(lang, runtimeScope);
          } catch (bridgeIsRtlError) {
            void bridgeIsRtlError;
          }

          return fallbackIsRtlLanguage(lang);
        }
      : fallbackIsRtlLanguage;

    const fallbackResolveDocumentDirection =
      fallbackResolveDocumentDirectionFactory(normalizeLanguageCode, isRtlLanguage);

    const resolveDocumentDirection = runtime &&
      typeof runtime.resolveDocumentDirection === 'function'
        ? function runtimeResolveDocumentDirection(lang) {
            try {
              return runtime.resolveDocumentDirection(lang);
            } catch (runtimeResolveDirectionError) {
              void runtimeResolveDirectionError;
            }

            return fallbackResolveDocumentDirection(lang);
          }
        : localizationBridge &&
          typeof localizationBridge.resolveDocumentDirection === 'function'
        ? function bridgeResolveDocumentDirection(lang) {
            try {
              return localizationBridge.resolveDocumentDirection(
                lang,
                runtimeScope
              );
            } catch (bridgeResolveDirectionError) {
              void bridgeResolveDirectionError;
            }

            return fallbackResolveDocumentDirection(lang);
          }
        : fallbackResolveDocumentDirection;

    const applyLocaleMetadata = runtime &&
      typeof runtime.applyLocaleMetadata === 'function'
        ? function runtimeApplyLocaleMetadata(target, lang, direction) {
            try {
              return runtime.applyLocaleMetadata(target, lang, direction);
            } catch (runtimeApplyLocaleError) {
              void runtimeApplyLocaleError;
            }

            return fallbackApplyLocaleMetadataProxy(target, lang, direction);
          }
        : localizationBridge &&
          typeof localizationBridge.applyLocaleMetadata === 'function'
        ? function bridgeApplyLocaleMetadata(target, lang, direction) {
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

    const datasetResolver = fallbackResolveTranslationDatasetFactory(
      fallbackScopes,
      requireFn,
      translationsRequirePath
    );

    const fallbackGetLanguageTexts = fallbackGetLanguageTextsFactory(
      datasetResolver,
      defaultLanguage
    );

    const getLanguageTexts = runtime && typeof runtime.getLanguageTexts === 'function'
      ? function runtimeGetLanguageTexts(lang) {
          try {
            return runtime.getLanguageTexts(lang);
          } catch (runtimeGetLanguageTextsError) {
            void runtimeGetLanguageTextsError;
          }

          return fallbackGetLanguageTexts(lang);
        }
      : fallbackGetLanguageTexts;

    const ensureGlobalGetLanguageTextsAvailability =
      createEnsureGlobalGetLanguageTextsAvailability(runtime, fallbackScopes);

    return {
      localeModule: isObject(localeModule) ? localeModule : null,
      defaultLanguage:
        typeof defaultLanguage === 'string' && defaultLanguage
          ? defaultLanguage
          : 'en',
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
      fallbackResolveTranslationDataset: datasetResolver,
    };
  }

  const namespace = {
    createLocalizationAccessors,
  };

  const globalScope =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global) ||
    null;

  const namespaceName = 'cineCoreAppLocalizationAccessors';
  const existing =
    isObject(globalScope) && isObject(globalScope[namespaceName])
      ? globalScope[namespaceName]
      : {};

  Object.assign(existing, namespace);

  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
