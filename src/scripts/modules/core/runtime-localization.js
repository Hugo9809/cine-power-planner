(function () {
  function isValidScope(scope) {
    return !!scope && (typeof scope === 'object' || typeof scope === 'function');
  }

  function detectGlobalScope(primary) {
    if (isValidScope(primary)) {
      return primary;
    }

    if (typeof globalThis !== 'undefined' && isValidScope(globalThis)) {
      return globalThis;
    }

    if (typeof window !== 'undefined' && isValidScope(window)) {
      return window;
    }

    if (typeof self !== 'undefined' && isValidScope(self)) {
      return self;
    }

    if (typeof global !== 'undefined' && isValidScope(global)) {
      return global;
    }

    return null;
  }

  function toArray(value) {
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  }

  function normaliseLanguageInput(lang) {
    if (typeof lang === 'string' && lang) {
      try {
        const normalised = String(lang).trim().toLowerCase();
        if (normalised) {
          return normalised;
        }
      } catch (normaliseError) {
        void normaliseError;
      }
    }

    return '';
  }

  function createLocalizationRuntime(options) {
    const configuration = options && typeof options === 'object' ? options : {};
    const runtimeScope = configuration.runtimeScope;
    const coreGlobalScope = configuration.coreGlobalScope;
    const globalScope = detectGlobalScope(coreGlobalScope || runtimeScope);
    const localizationBridge =
      configuration.localizationBridge &&
      typeof configuration.localizationBridge === 'object'
        ? configuration.localizationBridge
        : null;
    const fallbackResolveLocaleModule =
      typeof configuration.fallbackResolveLocaleModule === 'function'
        ? configuration.fallbackResolveLocaleModule
        : function resolveFallbackLocaleModule(scope) {
            void scope;
            return null;
          };
    const createLocaleFallbacks =
      typeof configuration.createLocaleFallbacks === 'function'
        ? configuration.createLocaleFallbacks
        : function createLocaleFallbacksFallback() {
            return null;
          };

    function resolveLocaleModule() {
      if (
        localizationBridge &&
        typeof localizationBridge.resolveLocaleModule === 'function'
      ) {
        try {
          const resolved = localizationBridge.resolveLocaleModule(runtimeScope);
          if (resolved && typeof resolved === 'object') {
            return resolved;
          }
        } catch (bridgeResolveError) {
          void bridgeResolveError;
        }
      }

      try {
        const fallbackModule = fallbackResolveLocaleModule(runtimeScope);
        if (fallbackModule && typeof fallbackModule === 'object') {
          return fallbackModule;
        }
      } catch (fallbackResolveError) {
        void fallbackResolveError;
      }

      return configuration.localeModule &&
        typeof configuration.localeModule === 'object'
        ? configuration.localeModule
        : null;
    }

    const localeModule = resolveLocaleModule();

    const defaultLanguage = (function resolveDefaultLanguage() {
      if (
        localizationBridge &&
        typeof localizationBridge.getDefaultLanguage === 'function'
      ) {
        try {
          const resolved = localizationBridge.getDefaultLanguage(runtimeScope);
          if (typeof resolved === 'string' && resolved) {
            return resolved;
          }
        } catch (defaultLanguageError) {
          void defaultLanguageError;
        }
      }

      if (localeModule && typeof localeModule.DEFAULT_LANGUAGE === 'string') {
        return localeModule.DEFAULT_LANGUAGE;
      }

      if (typeof configuration.defaultLanguage === 'string') {
        return configuration.defaultLanguage;
      }

      return 'en';
    })();

    const rtlLanguageCodes = (function resolveRtlCodes() {
      if (
        localizationBridge &&
        typeof localizationBridge.getRtlLanguageCodes === 'function'
      ) {
        try {
          const resolved = localizationBridge.getRtlLanguageCodes(runtimeScope);
          if (Array.isArray(resolved) && resolved.length > 0) {
            return resolved;
          }
        } catch (rtlCodesError) {
          void rtlCodesError;
        }
      }

      if (
        localeModule &&
        Array.isArray(localeModule.RTL_LANGUAGE_CODES) &&
        localeModule.RTL_LANGUAGE_CODES.length > 0
      ) {
        return localeModule.RTL_LANGUAGE_CODES;
      }

      if (Array.isArray(configuration.defaultRtlCodes)) {
        return configuration.defaultRtlCodes;
      }

      return ['ar', 'fa', 'he', 'ur'];
    })();

    const localizationFallbackHelpers = (function resolveFallbackHelpers() {
      try {
        return createLocaleFallbacks({
          defaultLanguage,
          rtlLanguageCodes,
          localizationFallbackNamespace:
            configuration.localizationFallbackNamespace,
          localizationFallbackSupport:
            configuration.localizationFallbackSupport,
          localizationFallbacks: configuration.localizationFallbacks,
          inlineLocalizationFallbacks:
            configuration.inlineLocalizationFallbacks,
        });
      } catch (createFallbacksError) {
        void createFallbacksError;
      }

      return null;
    })();

    const fallbackNormalizeLanguageCode =
      localizationFallbackHelpers &&
      typeof localizationFallbackHelpers.normalizeLanguageCode === 'function'
        ? function fallbackNormalizeLanguageCode(lang) {
            return localizationFallbackHelpers.normalizeLanguageCode(lang);
          }
        : function fallbackNormalizeLanguageCode(lang) {
            const normalised = normaliseLanguageInput(lang);
            return normalised || defaultLanguage;
          };

    const fallbackIsRtlLanguage =
      localizationFallbackHelpers &&
      typeof localizationFallbackHelpers.isRtlLanguage === 'function'
        ? function fallbackIsRtlLanguage(lang) {
            return localizationFallbackHelpers.isRtlLanguage(lang);
          }
        : function fallbackIsRtlLanguage(lang) {
            const normalised = fallbackNormalizeLanguageCode(lang);
            const base = normalised.split('-')[0];
            return rtlLanguageCodes.indexOf(base) !== -1;
          };

    const fallbackResolveDocumentDirection =
      localizationFallbackHelpers &&
      typeof localizationFallbackHelpers.resolveDocumentDirection === 'function'
        ? function fallbackResolveDocumentDirection(lang) {
            return localizationFallbackHelpers.resolveDocumentDirection(lang);
          }
        : function fallbackResolveDocumentDirection(lang) {
            if (
              typeof document !== 'undefined' &&
              document &&
              document.documentElement
            ) {
              try {
                const docDir = document.documentElement.getAttribute('dir');
                if (docDir) {
                  return docDir;
                }
              } catch (documentDirectionError) {
                void documentDirectionError;
              }
            }

            return fallbackIsRtlLanguage(lang) ? 'rtl' : 'ltr';
          };

    const fallbackApplyLocaleMetadata =
      localizationFallbackHelpers &&
      typeof localizationFallbackHelpers.applyLocaleMetadata === 'function'
        ? function fallbackApplyLocaleMetadata(target, lang, direction) {
            return localizationFallbackHelpers.applyLocaleMetadata(
              target,
              lang,
              direction
            );
          }
        : function fallbackApplyLocaleMetadata(target, lang, direction) {
            if (!target) {
              return;
            }

            if (lang) {
              try {
                target.lang = lang;
              } catch (assignLangError) {
                void assignLangError;
              }
            }

            if (direction) {
              try {
                target.dir = direction;
              } catch (assignDirError) {
                void assignDirError;
              }
            }
          };

    const normalizeLanguageCode =
      localizationBridge &&
      typeof localizationBridge.normalizeLanguageCode === 'function'
        ? function normalizeLanguageCodeProxy(lang) {
            try {
              return localizationBridge.normalizeLanguageCode(
                lang,
                runtimeScope
              );
            } catch (normalizeError) {
              void normalizeError;
            }

            return fallbackNormalizeLanguageCode(lang);
          }
        : fallbackNormalizeLanguageCode;

    const isRtlLanguage =
      localizationBridge &&
      typeof localizationBridge.isRtlLanguage === 'function'
        ? function isRtlLanguageProxy(lang) {
            try {
              return localizationBridge.isRtlLanguage(lang, runtimeScope);
            } catch (isRtlError) {
              void isRtlError;
            }

            return fallbackIsRtlLanguage(lang);
          }
        : fallbackIsRtlLanguage;

    const resolveDocumentDirection =
      localizationBridge &&
      typeof localizationBridge.resolveDocumentDirection === 'function'
        ? function resolveDocumentDirectionProxy(lang) {
            try {
              return localizationBridge.resolveDocumentDirection(
                lang,
                runtimeScope
              );
            } catch (resolveDirectionError) {
              void resolveDirectionError;
            }

            return fallbackResolveDocumentDirection(lang);
          }
        : fallbackResolveDocumentDirection;

    const applyLocaleMetadata =
      localizationBridge &&
      typeof localizationBridge.applyLocaleMetadata === 'function'
        ? function applyLocaleMetadataProxy(target, lang, direction) {
            try {
              return localizationBridge.applyLocaleMetadata(
                target,
                lang,
                direction,
                runtimeScope
              );
            } catch (applyMetadataError) {
              void applyMetadataError;
            }

            return fallbackApplyLocaleMetadata(target, lang, direction);
          }
        : fallbackApplyLocaleMetadata;

    const translationAdditionalScopes = toArray(
      configuration.translationAdditionalScopes
    ).filter(isValidScope);

    function collectTranslationScopeCandidates() {
      const candidates = [];
      const seen = typeof Set === 'function' ? new Set() : null;

      function register(scope) {
        if (!isValidScope(scope)) {
          return;
        }

        if (seen) {
          if (seen.has(scope)) {
            return;
          }

          seen.add(scope);
          candidates.push(scope);
          return;
        }

        if (candidates.indexOf(scope) !== -1) {
          return;
        }

        candidates.push(scope);
      }

      register(runtimeScope);
      register(globalScope);
      register(configuration.localizationFallbackNamespace);
      register(configuration.localizationFallbackSupport);

      for (let index = 0; index < translationAdditionalScopes.length; index += 1) {
        register(translationAdditionalScopes[index]);
      }

      register(typeof globalThis !== 'undefined' ? globalThis : null);
      register(typeof window !== 'undefined' ? window : null);
      register(typeof self !== 'undefined' ? self : null);
      register(typeof global !== 'undefined' ? global : null);

      return candidates;
    }

    function resolveTranslationDataset() {
      const scopeCandidates = collectTranslationScopeCandidates();
      for (let index = 0; index < scopeCandidates.length; index += 1) {
        const scope = scopeCandidates[index];
        if (!scope || typeof scope !== 'object') {
          continue;
        }

        const dataset = scope.texts;
        if (dataset && typeof dataset === 'object') {
          return dataset;
        }
      }

      const translationsRequirePath =
        typeof configuration.translationsRequirePath === 'string' &&
        configuration.translationsRequirePath
          ? configuration.translationsRequirePath
          : '../translations.js';

      if (typeof require === 'function') {
        try {
          const translationsModule = require(translationsRequirePath);
          if (
            translationsModule &&
            typeof translationsModule === 'object' &&
            translationsModule.texts
          ) {
            return translationsModule.texts;
          }
        } catch (translationRequireError) {
          void translationRequireError;
        }
      }

      return {};
    }

    function fallbackGetLanguageTexts(lang) {
      const dataset = resolveTranslationDataset();
      const fallbackLang =
        typeof defaultLanguage === 'string' && defaultLanguage
          ? defaultLanguage
          : 'en';

      const normalised = normaliseLanguageInput(lang);
      let resolved =
        normalised &&
        Object.prototype.hasOwnProperty.call(dataset, normalised)
          ? normalised
          : '';

      if (!resolved && normalised) {
        const base = normalised.split('-')[0];
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
        const fallback =
          dataset && typeof dataset[fallbackLang] === 'object'
            ? dataset[fallbackLang]
            : null;
        if (fallback) {
          return fallback;
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

    function resolveExistingGetLanguageTexts() {
      const scopeCandidates = collectTranslationScopeCandidates();
      for (let index = 0; index < scopeCandidates.length; index += 1) {
        const scope = scopeCandidates[index];
        if (!scope || typeof scope !== 'object') {
          continue;
        }

        const helper = scope.getLanguageTexts;
        if (typeof helper === 'function') {
          return helper;
        }
      }

      return null;
    }

    const getLanguageTexts = (function initialiseGetLanguageTexts() {
      const existing = resolveExistingGetLanguageTexts();
      if (existing) {
        return function getLanguageTextsProxy(lang) {
          try {
            const result = existing.call(null, lang);
            if (result && typeof result === 'object') {
              return result;
            }
          } catch (existingError) {
            if (
              typeof console !== 'undefined' &&
              console &&
              typeof console.warn === 'function'
            ) {
              console.warn(
                'Existing getLanguageTexts helper failed. Falling back to local resolution.',
                existingError
              );
            }
          }

          return fallbackGetLanguageTexts(lang);
        };
      }

      return function getLanguageTextsFallback(lang) {
        return fallbackGetLanguageTexts(lang);
      };
    })();

    function ensureGlobalGetLanguageTextsAvailability() {
      const scopeCandidates = collectTranslationScopeCandidates();
      for (let index = 0; index < scopeCandidates.length; index += 1) {
        const scope = scopeCandidates[index];
        if (!scope || typeof scope !== 'object') {
          continue;
        }

        if (typeof scope.getLanguageTexts !== 'function') {
          try {
            scope.getLanguageTexts = getLanguageTexts;
          } catch (assignError) {
            void assignError;
          }
        }
      }
    }

    ensureGlobalGetLanguageTextsAvailability();

    return {
      localeModule,
      defaultLanguage,
      rtlLanguageCodes,
      normalizeLanguageCode,
      isRtlLanguage,
      resolveDocumentDirection,
      applyLocaleMetadata,
      getLanguageTexts,
      fallbackNormalizeLanguageCode,
      fallbackIsRtlLanguage,
      fallbackResolveDocumentDirection,
      fallbackApplyLocaleMetadata,
      resolveTranslationDataset,
      ensureGlobalGetLanguageTextsAvailability,
    };
  }

  const namespace = {
    createLocalizationRuntime,
  };

  const globalScope = detectGlobalScope();
  const targetName = 'cineCoreRuntimeLocalization';
  const existing =
    globalScope && typeof globalScope[targetName] === 'object'
      ? globalScope[targetName]
      : {};

  const target = existing;
  for (const key of Object.keys(namespace)) {
    target[key] = namespace[key];
  }

  if (isValidScope(globalScope)) {
    try {
      globalScope[targetName] = target;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = target;
  }
})();
