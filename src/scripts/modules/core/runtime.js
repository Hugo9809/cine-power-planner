/* global cineCoreRuntimeModules */
(function () {
  function getModuleDirectory(moduleId) {
    const segments = moduleId.split('/');
    segments.pop();
    return segments.join('/');
  }

  function normalizeFromDir(moduleDir, request) {
    const segments = moduleDir ? moduleDir.split('/') : [];
    const parts = request.split('/');
    for (let index = 0; index < parts.length; index += 1) {
      const segment = parts[index];
      if (!segment || segment === '.') {
        continue;
      }
      if (segment === '..') {
        if (segments.length) {
          segments.pop();
        }
        continue;
      }
      segments.push(segment);
    }
    return segments.join('/');
  }

  /* eslint-disable no-redeclare, no-unused-vars */
  const MODULE_FACTORIES = {
  'modules/core/runtime-module-loader.js': function (module, exports, require) {
    (function () {
      const HAS = Object.prototype.hasOwnProperty;

      function isScope(candidate) {
        return !!candidate && (typeof candidate === 'object' || typeof candidate === 'function');
      }

      function collectCandidateScopes(options) {
        const scopes = [];

        function register(scope) {
          if (!isScope(scope)) {
            return;
          }

          if (scopes.indexOf(scope) === -1) {
            scopes.push(scope);
          }
        }

        const primaryScope = options && options.primaryScope;
        const additionalScopes = options && options.candidateScopes;

        register(primaryScope);

        if (Array.isArray(additionalScopes)) {
          for (let index = 0; index < additionalScopes.length; index += 1) {
            register(additionalScopes[index]);
          }
        }

        if (typeof globalThis !== 'undefined') {
          register(globalThis);
        }

        if (typeof window !== 'undefined') {
          register(window);
        }

        if (typeof self !== 'undefined') {
          register(self);
        }

        if (typeof global !== 'undefined') {
          register(global);
        }

        return scopes;
      }

      function readRuntimeNamespaceFromScope(scope) {
        if (!isScope(scope)) {
          return null;
        }

        try {
          const namespace = scope.cineCoreRuntimeModules;
          return namespace && typeof namespace === 'object' ? namespace : null;
        } catch (scopeLookupError) {
          void scopeLookupError;
        }

        return null;
      }

      function tryRequireRuntimeNamespace() {
        if (typeof require !== 'function') {
          return null;
        }

        const candidates = ['./runtime.js'];

        for (let index = 0; index < candidates.length; index += 1) {
          const candidate = candidates[index];
          try {
            const required = require(candidate);
            if (required && typeof required === 'object') {
              return required;
            }
          } catch (runtimeRequireError) {
            void runtimeRequireError;
          }
        }

        return null;
      }

      function resolveCoreRuntimeModulesNamespace(options) {
        if (
          typeof cineCoreRuntimeModules !== 'undefined' &&
          cineCoreRuntimeModules &&
          typeof cineCoreRuntimeModules === 'object'
        ) {
          return cineCoreRuntimeModules;
        }

        const candidates = collectCandidateScopes(options || {});

        for (let index = 0; index < candidates.length; index += 1) {
          const namespace = readRuntimeNamespaceFromScope(candidates[index]);
          if (namespace) {
            return namespace;
          }
        }

        return tryRequireRuntimeNamespace();
      }

      function resolveCoreRuntimeModule(moduleId, options) {
        if (typeof moduleId !== 'string' || !moduleId) {
          return null;
        }

        const namespace = resolveCoreRuntimeModulesNamespace(options || {});
        if (!namespace || typeof namespace !== 'object') {
          return null;
        }

        if (HAS.call(namespace, moduleId)) {
          return namespace[moduleId];
        }

        return null;
      }

      const namespace = {
        resolveCoreRuntimeModulesNamespace,
        resolveCoreRuntimeModule,
      };

      if (typeof module === 'object' && module && module.exports) {
        module.exports = namespace;
      }

      const globalScope = (function detectGlobalScope() {
        if (typeof globalThis !== 'undefined' && isScope(globalThis)) {
          return globalThis;
        }

        if (typeof window !== 'undefined' && isScope(window)) {
          return window;
        }

        if (typeof self !== 'undefined' && isScope(self)) {
          return self;
        }

        if (typeof global !== 'undefined' && isScope(global)) {
          return global;
        }

        return null;
      })();

      if (globalScope) {
        try {
          globalScope.cineCoreRuntimeModuleLoader = namespace;
        } catch (assignError) {
          void assignError;
        }
      }
    })();

  },
  'modules/core/runtime-candidate-scopes.js': function (module, exports, require) {
    (function () {
      function isValidScope(scope) {
        return !!scope && (typeof scope === 'object' || typeof scope === 'function');
      }

      function isScopeList(candidate) {
        return !!candidate && typeof candidate.length === 'number';
      }

      function registerScope(scopes, seenScopes, scope) {
        if (!Array.isArray(scopes)) {
          return;
        }

        if (!isValidScope(scope)) {
          return;
        }

        if (seenScopes) {
          if (seenScopes.has(scope)) {
            return;
          }

          seenScopes.add(scope);
          scopes.push(scope);
          return;
        }

        if (scopes.indexOf(scope) !== -1) {
          return;
        }

        scopes.push(scope);
      }

      function detectFallbackGlobalScope(primaryScope) {
        if (isValidScope(primaryScope)) {
          return primaryScope;
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

      function collectCandidateScopesWithFallback(primaryScope, runtimeShared, environmentHelpers) {
        if (
          runtimeShared &&
          typeof runtimeShared.collectCandidateScopes === 'function'
        ) {
          try {
            const sharedScopes = runtimeShared.collectCandidateScopes(
              primaryScope,
              environmentHelpers
            );
            if (Array.isArray(sharedScopes)) {
              return sharedScopes;
            }
          } catch (collectRuntimeScopesError) {
            void collectRuntimeScopesError;
          }
        }

        const scopes = [];
        const seenScopes = typeof Set === 'function' ? new Set() : null;

        registerScope(scopes, seenScopes, primaryScope);
        registerScope(
          scopes,
          seenScopes,
          typeof globalThis !== 'undefined' ? globalThis : null
        );
        registerScope(scopes, seenScopes, typeof window !== 'undefined' ? window : null);
        registerScope(scopes, seenScopes, typeof self !== 'undefined' ? self : null);
        registerScope(scopes, seenScopes, typeof global !== 'undefined' ? global : null);

        return scopes;
      }

      function resolveCandidateScopes(options) {
        const primaryScope = options && options.primaryScope;
        const runtimeShared = options && options.runtimeShared;
        const environmentHelpers = options && options.environmentHelpers;
        const currentCandidateScopes = options && options.currentCandidateScopes;

        if (isScopeList(currentCandidateScopes)) {
          return currentCandidateScopes;
        }

        let resolvedScopes = null;

        if (
          runtimeShared &&
          typeof runtimeShared.resolveCandidateScopes === 'function'
        ) {
          try {
            resolvedScopes = runtimeShared.resolveCandidateScopes(
              primaryScope,
              environmentHelpers
            );
          } catch (resolveCandidateScopesError) {
            void resolveCandidateScopesError;
            resolvedScopes = null;
          }
        }

        if (!resolvedScopes) {
          resolvedScopes = collectCandidateScopesWithFallback(
            primaryScope,
            runtimeShared,
            environmentHelpers
          );
        }

        return resolvedScopes;
      }

      function syncCandidateScopes(candidateScopes, options) {
        const runtimeShared = options && options.runtimeShared;
        const environmentHelpers = options && options.environmentHelpers;
        const primaryScope = options && options.primaryScope;
        const globalScope =
          (options && options.globalScope) || detectFallbackGlobalScope(primaryScope);
        const assignCurrentCandidateScopes =
          options && options.assignCurrentCandidateScopes;

        if (
          runtimeShared &&
          typeof runtimeShared.syncCandidateScopes === 'function'
        ) {
          try {
            runtimeShared.syncCandidateScopes(
              candidateScopes,
              primaryScope,
              environmentHelpers
            );
            return candidateScopes;
          } catch (syncCandidateScopesError) {
            void syncCandidateScopesError;
          }
        }

        if (
          isValidScope(globalScope) &&
          (!globalScope.CORE_RUNTIME_CANDIDATE_SCOPES ||
            globalScope.CORE_RUNTIME_CANDIDATE_SCOPES !== candidateScopes)
        ) {
          try {
            globalScope.CORE_RUNTIME_CANDIDATE_SCOPES = candidateScopes;
          } catch (assignError) {
            void assignError;
          }
        }

        if (typeof assignCurrentCandidateScopes === 'function') {
          try {
            assignCurrentCandidateScopes(candidateScopes);
          } catch (candidateAssignError) {
            void candidateAssignError;
          }
        }

        return candidateScopes;
      }

      function ensureCandidateScopes(options) {
        const candidateScopes = resolveCandidateScopes(options || {});
        return syncCandidateScopes(candidateScopes, options || {});
      }

      const namespace = {
        collectCandidateScopesWithFallback,
        resolveCandidateScopes,
        syncCandidateScopes,
        ensureCandidateScopes,
      };

      const globalScope = detectFallbackGlobalScope();
      const targetName = 'cineCoreRuntimeCandidateScopes';
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

      if (typeof module === 'object' && module && module.exports) {
        module.exports = target;
      }
    })();

  },

  'modules/core/runtime-localization.js': function (module, exports, require) {
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
              : './translations.js';

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

  },

  'modules/core/runtime-scope-tools.js': function (module, exports, require) {
    /* global CORE_GLOBAL_SCOPE */

    (function () {
      function isScopeCandidate(value) {
        return !!value && (typeof value === 'object' || typeof value === 'function');
      }

      function readCoreGlobalScope() {
        try {
          if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && isScopeCandidate(CORE_GLOBAL_SCOPE)) {
            return CORE_GLOBAL_SCOPE;
          }
        } catch (coreGlobalScopeLookupError) {
          void coreGlobalScopeLookupError;
        }

        try {
          if (
            typeof globalThis !== 'undefined' &&
            isScopeCandidate(globalThis) &&
            isScopeCandidate(globalThis.CORE_GLOBAL_SCOPE)
          ) {
            return globalThis.CORE_GLOBAL_SCOPE;
          }
        } catch (globalThisLookupError) {
          void globalThisLookupError;
        }

        return null;
      }

      function getPrimaryScopeCandidate(explicitCandidate) {
        if (isScopeCandidate(explicitCandidate)) {
          return explicitCandidate;
        }

        const coreScope = readCoreGlobalScope();
        if (isScopeCandidate(coreScope)) {
          return coreScope;
        }

        return null;
      }

      function appendCandidate(target, candidate) {
        if (!isScopeCandidate(candidate)) {
          return;
        }

        for (let index = 0; index < target.length; index += 1) {
          if (target[index] === candidate) {
            return;
          }
        }

        target.push(candidate);
      }

      function readDefaultGlobalScopes() {
        const defaults = [];

        if (typeof globalThis !== 'undefined') {
          appendCandidate(defaults, globalThis);
        }

        if (typeof window !== 'undefined') {
          appendCandidate(defaults, window);
        }

        if (typeof self !== 'undefined') {
          appendCandidate(defaults, self);
        }

        if (typeof global !== 'undefined') {
          appendCandidate(defaults, global);
        }

        return defaults;
      }

      function getScopeCandidates(options) {
        const settings = options && typeof options === 'object' ? options : {};
        const {
          primaryCandidate,
          includeCoreGlobalScope = true,
          includeDefaultGlobals = true,
          extraCandidates = [],
        } = settings;

        const candidates = [];

        appendCandidate(
          candidates,
          typeof primaryCandidate === 'undefined'
            ? getPrimaryScopeCandidate()
            : primaryCandidate
        );

        if (includeCoreGlobalScope) {
          appendCandidate(candidates, readCoreGlobalScope());
        }

        if (includeDefaultGlobals) {
          const defaults = readDefaultGlobalScopes();
          for (let index = 0; index < defaults.length; index += 1) {
            appendCandidate(candidates, defaults[index]);
          }
        }

        const extras = Array.isArray(extraCandidates) ? extraCandidates : [extraCandidates];
        for (let index = 0; index < extras.length; index += 1) {
          appendCandidate(candidates, extras[index]);
        }

        return candidates;
      }

      function detectFirstAvailableScope(primaryCandidate, options) {
        const candidates = getScopeCandidates({
          primaryCandidate,
          includeCoreGlobalScope: true,
          includeDefaultGlobals: true,
          extraCandidates: options && options.extraCandidates,
        });

        for (let index = 0; index < candidates.length; index += 1) {
          const candidate = candidates[index];
          if (isScopeCandidate(candidate)) {
            return candidate;
          }
        }

        return null;
      }

      function resolveAttachmentScope() {
        const candidates = getScopeCandidates({ includeDefaultGlobals: true });
        for (let index = 0; index < candidates.length; index += 1) {
          const candidate = candidates[index];
          if (isScopeCandidate(candidate)) {
            return candidate;
          }
        }

        return null;
      }

      const namespace = {
        isScopeCandidate,
        getPrimaryScopeCandidate,
        getScopeCandidates,
        detectFirstAvailableScope,
      };

      const attachmentScope = resolveAttachmentScope();
      const namespaceName = 'cineCoreRuntimeScopeTools';

      if (attachmentScope && typeof attachmentScope === 'object') {
        const existing =
          attachmentScope[namespaceName] && typeof attachmentScope[namespaceName] === 'object'
            ? attachmentScope[namespaceName]
            : {};

        for (const key of Object.keys(namespace)) {
          existing[key] = namespace[key];
        }

        try {
          attachmentScope[namespaceName] = existing;
        } catch (attachError) {
          void attachError;
        }
      }

      if (typeof module === 'object' && module && module.exports) {
        module.exports = namespace;
      }
    })();

  },

  'modules/core/runtime-shared.js': function (module, exports, require) {
    (function () {
      function detectScope(primary) {
        if (primary && (typeof primary === 'object' || typeof primary === 'function')) {
          return primary;
        }

        if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object') {
          return globalThis;
        }

        if (typeof window !== 'undefined' && window && typeof window === 'object') {
          return window;
        }

        if (typeof self !== 'undefined' && self && typeof self === 'object') {
          return self;
        }

        if (typeof global !== 'undefined' && global && typeof global === 'object') {
          return global;
        }

        return null;
      }

      function registerCandidateScope(scopes, scope) {
        if (!Array.isArray(scopes)) {
          return;
        }

        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
          return;
        }

        for (let index = 0; index < scopes.length; index += 1) {
          if (scopes[index] === scope) {
            return;
          }
        }

        scopes.push(scope);
      }

      function collectCandidateScopes(primaryScope, environmentHelpers) {
        const scopes = [];

        if (
          environmentHelpers &&
          typeof environmentHelpers.fallbackCollectCandidateScopes === 'function'
        ) {
          try {
            const collected = environmentHelpers.fallbackCollectCandidateScopes(primaryScope);
            if (Array.isArray(collected)) {
              for (let collectedIndex = 0; collectedIndex < collected.length; collectedIndex += 1) {
                registerCandidateScope(scopes, collected[collectedIndex]);
              }
            }
          } catch (collectError) {
            void collectError;
          }
        }

        registerCandidateScope(scopes, primaryScope);
        registerCandidateScope(scopes, typeof globalThis !== 'undefined' ? globalThis : null);
        registerCandidateScope(scopes, typeof window !== 'undefined' ? window : null);
        registerCandidateScope(scopes, typeof self !== 'undefined' ? self : null);
        registerCandidateScope(scopes, typeof global !== 'undefined' ? global : null);

        let detected = null;

        if (
          environmentHelpers &&
          typeof environmentHelpers.fallbackDetectGlobalScope === 'function'
        ) {
          try {
            detected = environmentHelpers.fallbackDetectGlobalScope();
          } catch (detectError) {
            void detectError;
            detected = null;
          }
        }

        if (!detected) {
          detected = detectScope(primaryScope);
        }

        registerCandidateScope(scopes, detected);

        return scopes;
      }

      function isScopeList(candidate) {
        return !!candidate && typeof candidate.length === 'number';
      }

      function readCandidateScopesFromScope(scope) {
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
          return null;
        }

        try {
          const candidate = scope.CORE_RUNTIME_CANDIDATE_SCOPES;
          return isScopeList(candidate) ? candidate : null;
        } catch (candidateLookupError) {
          void candidateLookupError;
        }

        return null;
      }

      let cachedCandidateScopes = null;

      function syncCandidateScopes(candidateScopes, primaryScope, environmentHelpers) {
        if (!isScopeList(candidateScopes)) {
          return candidateScopes;
        }

        cachedCandidateScopes = candidateScopes;

        const referenceScope = detectScope(primaryScope);
        const scopes = collectCandidateScopes(referenceScope, environmentHelpers);

        for (let index = 0; index < scopes.length; index += 1) {
          const scope = scopes[index];
          if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
            continue;
          }

          try {
            if (scope.CORE_RUNTIME_CANDIDATE_SCOPES !== candidateScopes) {
              scope.CORE_RUNTIME_CANDIDATE_SCOPES = candidateScopes;
            }
          } catch (assignCandidateError) {
            void assignCandidateError;
          }
        }

        return candidateScopes;
      }

      function resolveCandidateScopes(primaryScope, environmentHelpers) {
        const referenceScope = detectScope(primaryScope);

        const existing =
          cachedCandidateScopes || readCandidateScopesFromScope(referenceScope);

        if (isScopeList(existing)) {
          return syncCandidateScopes(existing, referenceScope, environmentHelpers);
        }

        const candidateScopes = collectCandidateScopes(
          referenceScope,
          environmentHelpers
        );

        return syncCandidateScopes(candidateScopes, referenceScope, environmentHelpers);
      }

      function registerScope(runtimeState, scope) {
        if (!runtimeState || typeof runtimeState.registerScope !== 'function') {
          return;
        }

        try {
          runtimeState.registerScope(scope);
        } catch (registerError) {
          void registerError;
        }
      }

      function registerScopes(runtimeState, candidateScopes) {
        if (!Array.isArray(candidateScopes)) {
          return;
        }

        for (let index = 0; index < candidateScopes.length; index += 1) {
          registerScope(runtimeState, candidateScopes[index]);
        }
      }

      function getScopesSnapshot(runtimeState, candidateScopes) {
        if (runtimeState && typeof runtimeState.getScopes === 'function') {
          try {
            const runtimeScopes = runtimeState.getScopes();
            if (Array.isArray(runtimeScopes)) {
              return runtimeScopes.slice();
            }
          } catch (getScopesError) {
            void getScopesError;
          }
        }

        if (Array.isArray(candidateScopes)) {
          return candidateScopes.slice();
        }

        return [];
      }

      function ensurePrimaryScope(runtimeState, candidateScopes) {
        if (runtimeState && typeof runtimeState.getPrimaryScope === 'function') {
          try {
            const primary = runtimeState.getPrimaryScope();
            if (primary && (typeof primary === 'object' || typeof primary === 'function')) {
              return primary;
            }
          } catch (getPrimaryError) {
            void getPrimaryError;
          }
        }

        if (Array.isArray(candidateScopes)) {
          for (let index = 0; index < candidateScopes.length; index += 1) {
            const candidate = candidateScopes[index];
            if (candidate && (typeof candidate === 'object' || typeof candidate === 'function')) {
              return candidate;
            }
          }
        }

        return null;
      }

      function assignTemperatureRenderer(runtimeState, renderer) {
        if (typeof renderer !== 'function') {
          return;
        }

        if (!runtimeState || typeof runtimeState.assignTemperatureRenderer !== 'function') {
          return;
        }

        try {
          runtimeState.assignTemperatureRenderer(renderer);
        } catch (assignRendererError) {
          void assignRendererError;
        }
      }

      function readValue(runtimeState, name, candidateScopes) {
        if (runtimeState && typeof runtimeState.readValue === 'function') {
          try {
            return runtimeState.readValue(name);
          } catch (readValueError) {
            void readValueError;
          }
        }

        const scopes = Array.isArray(candidateScopes) ? candidateScopes : [];

        for (let index = 0; index < scopes.length; index += 1) {
          const scope = scopes[index];
          if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
            continue;
          }

          try {
            if (name in scope) {
              return scope[name];
            }
          } catch (lookupError) {
            void lookupError;
          }
        }

        return undefined;
      }

      function ensureValue(runtimeState, name, fallbackValue, candidateScopes) {
        if (runtimeState && typeof runtimeState.ensureValue === 'function') {
          try {
            return runtimeState.ensureValue(name, fallbackValue);
          } catch (ensureValueError) {
            void ensureValueError;
          }
        }

        const fallbackProvider =
          typeof fallbackValue === 'function'
            ? fallbackValue
            : function provideStaticFallback() {
                return fallbackValue;
              };

        if (typeof name !== 'string' || !name) {
          try {
            return fallbackProvider();
          } catch (fallbackError) {
            void fallbackError;
            return undefined;
          }
        }

        const scopes = Array.isArray(candidateScopes) ? candidateScopes : [];

        for (let index = 0; index < scopes.length; index += 1) {
          const scope = scopes[index];
          if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
            continue;
          }

          try {
            if (typeof scope[name] === 'undefined') {
              scope[name] = fallbackProvider();
            }
            return scope[name];
          } catch (ensureError) {
            void ensureError;
          }
        }

        try {
          return fallbackProvider();
        } catch (fallbackProviderError) {
          void fallbackProviderError;
          return undefined;
        }
      }

      function normaliseValue(runtimeState, name, validator, fallbackValue, candidateScopes) {
        if (runtimeState && typeof runtimeState.normaliseValue === 'function') {
          try {
            runtimeState.normaliseValue(name, validator, fallbackValue);
            return;
          } catch (normaliseValueError) {
            void normaliseValueError;
          }
        }

        const validate =
          typeof validator === 'function'
            ? validator
            : function alwaysValid() {
                return true;
              };

        const fallbackProvider =
          typeof fallbackValue === 'function'
            ? fallbackValue
            : function provideStaticFallback() {
                return fallbackValue;
              };

        const scopes = Array.isArray(candidateScopes) ? candidateScopes : [];

        for (let index = 0; index < scopes.length; index += 1) {
          const scope = scopes[index];
          if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
            continue;
          }

          try {
            if (!validate(scope[name])) {
              scope[name] = fallbackProvider();
            }
          } catch (normaliseError) {
            void normaliseError;
          }
        }
      }

      const namespace = {
        collectCandidateScopes,
        resolveCandidateScopes,
        syncCandidateScopes,
        registerScope,
        registerScopes,
        getScopesSnapshot,
        ensurePrimaryScope,
        assignTemperatureRenderer,
        readValue,
        ensureValue,
        normaliseValue,
      };

      const globalScope = detectScope();
      const targetName = 'cineCoreRuntimeShared';
      const existing = globalScope && typeof globalScope[targetName] === 'object'
        ? globalScope[targetName]
        : {};

      const target = existing;
      for (const key of Object.keys(namespace)) {
        target[key] = namespace[key];
      }

      if (globalScope && typeof globalScope === 'object') {
        try {
          globalScope[targetName] = target;
        } catch (assignError) {
          void assignError;
        }
      }

      if (typeof module === 'object' && module && module.exports) {
        module.exports = target;
      }
    })();

  },

  'modules/core/runtime-support-bootstrap.js': function (module, exports, require) {
    /* global CORE_GLOBAL_SCOPE */

    (function () {
      function isObject(value) {
        return !!value && (typeof value === 'object' || typeof value === 'function');
      }

      function detectGlobalScope() {
        if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && isObject(CORE_GLOBAL_SCOPE)) {
          return CORE_GLOBAL_SCOPE;
        }

        if (typeof globalThis !== 'undefined' && isObject(globalThis)) {
          return globalThis;
        }

        if (typeof window !== 'undefined' && isObject(window)) {
          return window;
        }

        if (typeof self !== 'undefined' && isObject(self)) {
          return self;
        }

        if (typeof global !== 'undefined' && isObject(global)) {
          return global;
        }

        return null;
      }

      function readResolutionFromScope(namespaceName, candidateScope) {
        if (!isObject(candidateScope)) {
          return null;
        }

        try {
          const candidate = candidateScope[namespaceName];
          return isObject(candidate) ? candidate : null;
        } catch (resolutionLookupError) {
          void resolutionLookupError;
        }

        return null;
      }

      function loadRuntimeSupportResolution(primaryScope) {
        const namespaceName = 'cineCoreRuntimeSupportResolution';
        const candidates = [
          primaryScope,
          detectGlobalScope(),
          typeof globalThis !== 'undefined' ? globalThis : null,
          typeof window !== 'undefined' ? window : null,
          typeof self !== 'undefined' ? self : null,
          typeof global !== 'undefined' ? global : null,
        ];

        for (let index = 0; index < candidates.length; index += 1) {
          const resolution = readResolutionFromScope(namespaceName, candidates[index]);
          if (resolution) {
            return resolution;
          }
        }

        if (typeof require === 'function') {
          try {
            const required = require('./runtime-support-resolution.js');
            if (isObject(required)) {
              return required;
            }
          } catch (runtimeSupportResolutionRequireError) {
            void runtimeSupportResolutionRequireError;
          }
        }

        for (let index = 0; index < candidates.length; index += 1) {
          const resolution = readResolutionFromScope(namespaceName, candidates[index]);
          if (resolution) {
            return resolution;
          }
        }

        return null;
      }

      function ensureFallbackDetectRuntimeScope(resolution) {
        if (isObject(resolution) && typeof resolution.fallbackDetectRuntimeScope === 'function') {
          return resolution.fallbackDetectRuntimeScope;
        }

        return function fallbackDetectRuntimeScope(primaryScope) {
          if (isObject(primaryScope)) {
            return primaryScope;
          }

          if (typeof globalThis !== 'undefined' && isObject(globalThis)) {
            return globalThis;
          }

          if (typeof window !== 'undefined' && isObject(window)) {
            return window;
          }

          if (typeof self !== 'undefined' && isObject(self)) {
            return self;
          }

          if (typeof global !== 'undefined' && isObject(global)) {
            return global;
          }

          return null;
        };
      }

      function ensureFallbackResolveCoreSupportModule(resolution, detectRuntimeScope) {
        if (
          isObject(resolution) &&
          typeof resolution.fallbackResolveCoreSupportModule === 'function'
        ) {
          return resolution.fallbackResolveCoreSupportModule;
        }

        return function fallbackResolveCoreSupportModule(namespaceName, requirePath, primaryScope) {
          if (typeof namespaceName !== 'string' || !namespaceName) {
            return null;
          }

          const runtimeScope = detectRuntimeScope(primaryScope);

          if (isObject(runtimeScope) && isObject(runtimeScope[namespaceName])) {
            return runtimeScope[namespaceName];
          }

          if (typeof require === 'function' && typeof requirePath === 'string' && requirePath) {
            try {
              const required = require(requirePath);
              if (isObject(required)) {
                return required;
              }
            } catch (supportModuleError) {
              void supportModuleError;
            }
          }

          return null;
        };
      }

      function readRuntimeSupportTools(primaryScope) {
        const runtimeSupportResolution = loadRuntimeSupportResolution(primaryScope);
        const fallbackDetect = ensureFallbackDetectRuntimeScope(runtimeSupportResolution);
        const fallbackResolve = ensureFallbackResolveCoreSupportModule(
          runtimeSupportResolution,
          fallbackDetect
        );

        const runtimeSupportResolverTools =
          isObject(runtimeSupportResolution) &&
          typeof runtimeSupportResolution.readRuntimeSupportResolver === 'function'
            ? runtimeSupportResolution.readRuntimeSupportResolver(primaryScope)
            : null;

        const runtimeSupportResolver =
          isObject(runtimeSupportResolution) &&
          typeof runtimeSupportResolution.ensureCoreSupportResolver === 'function'
            ? runtimeSupportResolution.ensureCoreSupportResolver(primaryScope)
            : null;

        const detectRuntimeScope =
          isObject(runtimeSupportResolverTools) &&
          typeof runtimeSupportResolverTools.detectRuntimeScope === 'function'
            ? runtimeSupportResolverTools.detectRuntimeScope
            : fallbackDetect;

        const resolveCoreSupportModule =
          isObject(runtimeSupportResolverTools) &&
          typeof runtimeSupportResolverTools.resolveCoreSupportModule === 'function'
            ? runtimeSupportResolverTools.resolveCoreSupportModule
            : fallbackResolve;

        return {
          runtimeSupportResolution,
          runtimeSupportResolverTools,
          runtimeSupportResolver,
          fallbackDetectRuntimeScope: fallbackDetect,
          fallbackResolveCoreSupportModule: fallbackResolve,
          detectRuntimeScope,
          resolveCoreSupportModule,
        };
      }

      function resolveBootstrap(primaryScope) {
        const tools = readRuntimeSupportTools(primaryScope);
        const detectRuntimeScope = function detectScope(candidateScope) {
          return tools.detectRuntimeScope(candidateScope);
        };

        const runtimeScope = detectRuntimeScope(primaryScope);

        function resolveCoreSupportModule(namespaceName, requirePath, candidateScope) {
          const scope =
            typeof candidateScope === 'undefined'
              ? runtimeScope
              : detectRuntimeScope(candidateScope);

          return tools.resolveCoreSupportModule(namespaceName, requirePath, scope);
        }

        function fallbackResolveCoreSupportModule(namespaceName, requirePath, candidateScope) {
          const scope =
            typeof candidateScope === 'undefined'
              ? runtimeScope
              : detectRuntimeScope(candidateScope);

          return tools.fallbackResolveCoreSupportModule(namespaceName, requirePath, scope);
        }

        return Object.freeze({
          runtimeSupportResolution: tools.runtimeSupportResolution,
          runtimeSupportResolverTools: tools.runtimeSupportResolverTools,
          runtimeSupportResolver: tools.runtimeSupportResolver,
          runtimeScope,
          detectRuntimeScope,
          resolveCoreSupportModule,
          fallbackDetectRuntimeScope: tools.fallbackDetectRuntimeScope,
          fallbackResolveCoreSupportModule,
        });
      }

      const namespace = {
        detectGlobalScope,
        loadRuntimeSupportResolution,
        readRuntimeSupportTools,
        resolveBootstrap,
      };

      const globalScope = detectGlobalScope();
      const targetName = 'cineCoreRuntimeSupportBootstrap';
      const existing = isObject(globalScope) && isObject(globalScope[targetName])
        ? globalScope[targetName]
        : {};

      const target = existing;
      for (const key of Object.keys(namespace)) {
        target[key] = namespace[key];
      }

      if (isObject(globalScope)) {
        try {
          globalScope[targetName] = target;
        } catch (assignError) {
          void assignError;
        }
      }

      if (typeof module === 'object' && module && module.exports) {
        module.exports = target;
      }
    })();

  },

  'modules/core/runtime-support-defaults.js': function (module, exports, require) {
    (function () {
      function isScopeCandidate(value) {
        return !!value && (typeof value === 'object' || typeof value === 'function');
      }

      function getRuntimeScopeCandidates(primaryScope) {
        const candidates = [];

        if (isScopeCandidate(primaryScope)) {
          candidates.push(primaryScope);
        }

        if (typeof globalThis !== 'undefined') {
          candidates.push(globalThis);
        }

        if (typeof window !== 'undefined') {
          candidates.push(window);
        }

        if (typeof self !== 'undefined') {
          candidates.push(self);
        }

        if (typeof global !== 'undefined') {
          candidates.push(global);
        }

        const resolved = [];
        for (let index = 0; index < candidates.length; index += 1) {
          const candidate = candidates[index];
          if (isScopeCandidate(candidate)) {
            let alreadyPresent = false;
            for (let compareIndex = 0; compareIndex < resolved.length; compareIndex += 1) {
              if (resolved[compareIndex] === candidate) {
                alreadyPresent = true;
                break;
              }
            }
            if (!alreadyPresent) {
              resolved.push(candidate);
            }
          }
        }

        return resolved;
      }

      function fallbackDetectRuntimeScope(primaryScope) {
        const candidates = getRuntimeScopeCandidates(primaryScope);

        for (let index = 0; index < candidates.length; index += 1) {
          const candidate = candidates[index];
          if (isScopeCandidate(candidate)) {
            return candidate;
          }
        }

        return null;
      }

      function fallbackResolveCoreSupportModule(namespaceName, requirePath, primaryScope) {
        if (typeof namespaceName !== 'string' || !namespaceName) {
          return null;
        }

        const runtimeScope = fallbackDetectRuntimeScope(primaryScope);

        if (
          runtimeScope &&
          runtimeScope[namespaceName] &&
          typeof runtimeScope[namespaceName] === 'object'
        ) {
          return runtimeScope[namespaceName];
        }

        if (typeof require === 'function' && typeof requirePath === 'string' && requirePath) {
          try {
            const required = require(requirePath);
            if (required && typeof required === 'object') {
              return required;
            }
          } catch (supportModuleError) {
            void supportModuleError;
          }
        }

        return null;
      }

      function readRuntimeSupportResolver(primaryScope) {
        const runtimeScope = fallbackDetectRuntimeScope(primaryScope);

        function detectRuntimeScope(scopeCandidate) {
          return fallbackDetectRuntimeScope(
            isScopeCandidate(scopeCandidate) ? scopeCandidate : runtimeScope
          );
        }

        function resolveCoreSupportModule(namespaceName, requirePath, scopeCandidate) {
          const candidateScope = isScopeCandidate(scopeCandidate) ? scopeCandidate : runtimeScope;
          return fallbackResolveCoreSupportModule(namespaceName, requirePath, candidateScope);
        }

        return Object.freeze({
          detectRuntimeScope,
          resolveCoreSupportModule,
        });
      }

      const namespace = {
        fallbackDetectRuntimeScope,
        fallbackResolveCoreSupportModule,
        readRuntimeSupportResolver,
        getRuntimeScopeCandidates,
      };

      const namespaceName = 'cineCoreRuntimeSupportDefaults';
      const attachmentCandidates = getRuntimeScopeCandidates();

      for (let index = 0; index < attachmentCandidates.length; index += 1) {
        const scope = attachmentCandidates[index];
        if (!isScopeCandidate(scope)) {
          continue;
        }

        const existing =
          scope[namespaceName] && typeof scope[namespaceName] === 'object'
            ? scope[namespaceName]
            : {};

        for (const key of Object.keys(namespace)) {
          existing[key] = namespace[key];
        }

        try {
          scope[namespaceName] = existing;
        } catch (assignError) {
          void assignError;
        }
      }

      if (typeof module === 'object' && module && module.exports) {
        module.exports = namespace;
      }
    })();

  },

  'modules/core/runtime-support-resolution.js': function (module, exports, require) {
    (function () {
      function fallbackDetectRuntimeScope(primaryScope) {
        if (
          primaryScope &&
          (typeof primaryScope === 'object' || typeof primaryScope === 'function')
        ) {
          return primaryScope;
        }

        if (typeof globalThis !== 'undefined' && typeof globalThis === 'object' && globalThis) {
          return globalThis;
        }

        if (typeof window !== 'undefined' && typeof window === 'object' && window) {
          return window;
        }

        if (typeof self !== 'undefined' && typeof self === 'object' && self) {
          return self;
        }

        if (typeof global !== 'undefined' && typeof global === 'object' && global) {
          return global;
        }

        return null;
      }

      function fallbackResolveCoreSupportModule(namespaceName, requirePath, primaryScope) {
        if (typeof namespaceName !== 'string' || !namespaceName) {
          return null;
        }

        const runtimeScope = fallbackDetectRuntimeScope(primaryScope);

        if (
          runtimeScope &&
          runtimeScope[namespaceName] &&
          typeof runtimeScope[namespaceName] === 'object'
        ) {
          return runtimeScope[namespaceName];
        }

        if (typeof require === 'function' && typeof requirePath === 'string' && requirePath) {
          try {
            const required = require(requirePath);
            if (required && typeof required === 'object') {
              return required;
            }
          } catch (supportModuleError) {
            void supportModuleError;
          }
        }

        return null;
      }

      function ensureCoreSupportResolver(primaryScope) {
        const namespaceName = 'cineCoreSupportResolver';

        function readFromScope(candidateScope) {
          if (
            !candidateScope ||
            (typeof candidateScope !== 'object' && typeof candidateScope !== 'function')
          ) {
            return null;
          }

          try {
            const resolver = candidateScope[namespaceName];
            return resolver && typeof resolver === 'object' ? resolver : null;
          } catch (resolverLookupError) {
            void resolverLookupError;
          }

          return null;
        }

        const runtimeScope = fallbackDetectRuntimeScope(primaryScope);
        const candidates = [
          primaryScope,
          runtimeScope,
          typeof globalThis !== 'undefined' ? globalThis : null,
          typeof window !== 'undefined' ? window : null,
          typeof self !== 'undefined' ? self : null,
          typeof global !== 'undefined' ? global : null,
        ];

        for (let index = 0; index < candidates.length; index += 1) {
          const resolver = readFromScope(candidates[index]);
          if (resolver) {
            return resolver;
          }
        }

        if (typeof require === 'function') {
          try {
            const requiredResolver = require('./support-resolver.js');
            if (requiredResolver && typeof requiredResolver === 'object') {
              return requiredResolver;
            }
          } catch (supportResolverRequireError) {
            void supportResolverRequireError;
          }
        }

        for (let index = 0; index < candidates.length; index += 1) {
          const resolver = readFromScope(candidates[index]);
          if (resolver) {
            return resolver;
          }
        }

        return null;
      }

      function readRuntimeSupportResolver(primaryScope) {
        const resolver = ensureCoreSupportResolver(primaryScope);

        if (resolver && typeof resolver === 'object') {
          const detect =
            typeof resolver.detectRuntimeScope === 'function'
              ? resolver.detectRuntimeScope
              : fallbackDetectRuntimeScope;
          const resolve =
            typeof resolver.resolveCoreSupportModule === 'function'
              ? resolver.resolveCoreSupportModule
              : fallbackResolveCoreSupportModule;

          return Object.freeze({
            detectRuntimeScope: detect,
            resolveCoreSupportModule: resolve,
          });
        }

        return Object.freeze({
          detectRuntimeScope: fallbackDetectRuntimeScope,
          resolveCoreSupportModule: fallbackResolveCoreSupportModule,
        });
      }

      const api = {
        fallbackDetectRuntimeScope,
        fallbackResolveCoreSupportModule,
        ensureCoreSupportResolver,
        readRuntimeSupportResolver,
      };

      const globalScope = fallbackDetectRuntimeScope();
      const targetName = 'cineCoreRuntimeSupportResolution';
      const existing =
        globalScope && typeof globalScope[targetName] === 'object'
          ? globalScope[targetName]
          : {};

      const target = existing;
      for (const key of Object.keys(api)) {
        target[key] = api[key];
      }

      if (globalScope && typeof globalScope === 'object') {
        try {
          globalScope[targetName] = target;
        } catch (assignError) {
          void assignError;
        }
      }

      if (typeof module === 'object' && module && module.exports) {
        module.exports = target;
      }
    })();

  },

  'modules/core/runtime-tool-fallbacks.js': function (module, exports, require) {
    (function () {
      function isValidScope(scope) {
        return !!scope && (typeof scope === 'object' || typeof scope === 'function');
      }

      function detectScope(primary) {
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

      function ensureGlobalValue(name, fallbackValue, primary) {
        const provider =
          typeof fallbackValue === 'function'
            ? fallbackValue
            : function provideStaticFallback() {
                return fallbackValue;
              };

        if (typeof name !== 'string' || !name) {
          try {
            return provider();
          } catch (fallbackError) {
            void fallbackError;
            return undefined;
          }
        }

        const scope = detectScope(primary);
        if (!isValidScope(scope)) {
          return provider();
        }

        let existing;
        try {
          existing = scope[name];
        } catch (readError) {
          existing = undefined;
          void readError;
        }

        if (typeof existing !== 'undefined') {
          return existing;
        }

        const value = provider();

        try {
          scope[name] = value;
          return scope[name];
        } catch (assignError) {
          void assignError;
        }

        try {
          Object.defineProperty(scope, name, {
            configurable: true,
            writable: true,
            value,
          });
        } catch (defineError) {
          void defineError;
        }

        try {
          return scope[name];
        } catch (finalReadError) {
          void finalReadError;
        }

        return value;
      }

      function jsonDeepClone(value) {
        if (value === null || typeof value !== 'object') {
          return value;
        }

        try {
          return JSON.parse(JSON.stringify(value));
        } catch (jsonCloneError) {
          void jsonCloneError;
        }

        return value;
      }

      function resolveStructuredClone(primary) {
        if (typeof structuredClone === 'function') {
          return structuredClone;
        }

        const scope = detectScope(primary);
        if (scope && typeof scope.structuredClone === 'function') {
          try {
            return scope.structuredClone.bind(scope);
          } catch (bindError) {
            void bindError;
          }
        }

        if (typeof require === 'function') {
          try {
            const nodeUtil = require('node:util');
            if (nodeUtil && typeof nodeUtil.structuredClone === 'function') {
              return nodeUtil.structuredClone.bind(nodeUtil);
            }
          } catch (nodeUtilError) {
            void nodeUtilError;
          }

          try {
            const legacyUtil = require('util');
            if (legacyUtil && typeof legacyUtil.structuredClone === 'function') {
              return legacyUtil.structuredClone.bind(legacyUtil);
            }
          } catch (legacyUtilError) {
            void legacyUtilError;
          }
        }

        return null;
      }

      function createResilientDeepClone(primary) {
        const structuredCloneImpl = resolveStructuredClone(primary);

        if (!structuredCloneImpl) {
          return jsonDeepClone;
        }

        return function resilientDeepClone(value) {
          if (value === null || typeof value !== 'object') {
            return value;
          }

          try {
            return structuredCloneImpl(value);
          } catch (structuredCloneError) {
            void structuredCloneError;
          }

          return jsonDeepClone(value);
        };
      }

      function ensureDeepClone(primary) {
        const scope = detectScope(primary);
        if (scope && typeof scope.__cineDeepClone === 'function') {
          return scope.__cineDeepClone;
        }

        const clone = createResilientDeepClone(scope);

        if (isValidScope(scope)) {
          try {
            Object.defineProperty(scope, '__cineDeepClone', {
              configurable: true,
              writable: true,
              value: clone,
            });
          } catch (defineError) {
            void defineError;

            try {
              scope.__cineDeepClone = clone;
            } catch (assignError) {
              void assignError;
            }
          }
        }

        return clone;
      }

      function createRuntimeToolFallbacks(primary) {
        const resolvedScope = detectScope(primary);

        function getCoreGlobalObject() {
          return detectScope(resolvedScope);
        }

        function ensureCoreGlobalValue(name, fallbackValue) {
          return ensureGlobalValue(name, fallbackValue, resolvedScope);
        }

        function resolveStructuredCloneForScope(scope) {
          return resolveStructuredClone(scope || resolvedScope);
        }

        function createResilientDeepCloneForScope(scope) {
          return createResilientDeepClone(scope || resolvedScope);
        }

        function ensureDeepCloneForScope(scope) {
          return ensureDeepClone(scope || resolvedScope);
        }

        return {
          getCoreGlobalObject,
          ensureCoreGlobalValue,
          jsonDeepClone,
          resolveStructuredClone: resolveStructuredCloneForScope,
          createResilientDeepClone: createResilientDeepCloneForScope,
          ensureDeepClone: ensureDeepCloneForScope,
        };
      }

      const namespace = {
        detectScope,
        ensureGlobalValue,
        jsonDeepClone,
        resolveStructuredClone,
        createResilientDeepClone,
        ensureDeepClone,
        createRuntimeToolFallbacks,
      };

      const globalScope = detectScope();
      const targetName = 'cineCoreRuntimeToolFallbacks';
      const existing =
        globalScope && typeof globalScope[targetName] === 'object'
          ? globalScope[targetName]
          : {};

      for (const key of Object.keys(namespace)) {
        existing[key] = namespace[key];
      }

      if (globalScope && typeof globalScope === 'object') {
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

  },

  'modules/core/runtime-tools.js': function (module, exports, require) {
    /* global cineRuntimeEnvironmentHelpers */

    (function () {
      function detectGlobalScope() {
        if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object') {
          return globalThis;
        }
        if (typeof window !== 'undefined' && window && typeof window === 'object') {
          return window;
        }
        if (typeof self !== 'undefined' && self && typeof self === 'object') {
          return self;
        }
        if (typeof global !== 'undefined' && global && typeof global === 'object') {
          return global;
        }

        return null;
      }

      function collectEnvironmentHelperScopes(primary) {
        const scopes = [];

        function registerScope(scope) {
          if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
            return;
          }

          if (scopes.indexOf(scope) === -1) {
            scopes.push(scope);
          }
        }

        registerScope(primary);
        if (typeof globalThis !== 'undefined') registerScope(globalThis);
        if (typeof window !== 'undefined') registerScope(window);
        if (typeof self !== 'undefined') registerScope(self);
        if (typeof global !== 'undefined') registerScope(global);

        return scopes;
      }

      const CORE_GLOBAL_SCOPE = detectGlobalScope();

      function resolveEnvironmentHelpers() {
        let helpers = null;

        if (
          typeof cineRuntimeEnvironmentHelpers !== 'undefined' &&
          cineRuntimeEnvironmentHelpers &&
          typeof cineRuntimeEnvironmentHelpers === 'object'
        ) {
          helpers = cineRuntimeEnvironmentHelpers;
        }

        if (!helpers && typeof require === 'function') {
          try {
            const requiredHelpers = require('../runtime-environment-helpers.js');
            if (requiredHelpers && typeof requiredHelpers === 'object') {
              helpers = requiredHelpers;
            }
          } catch (helpersRequireError) {
            void helpersRequireError;
          }
        }

        if (helpers) {
          return helpers;
        }

        const candidateScopes = collectEnvironmentHelperScopes(CORE_GLOBAL_SCOPE);

        for (let index = 0; index < candidateScopes.length; index += 1) {
          const candidate = candidateScopes[index];
          try {
            const candidateHelpers =
              candidate && candidate.cineRuntimeEnvironmentHelpers;
            if (candidateHelpers && typeof candidateHelpers === 'object') {
              return candidateHelpers;
            }
          } catch (candidateLookupError) {
            void candidateLookupError;
          }
        }

        return null;
      }

      const CORE_ENVIRONMENT_HELPERS = resolveEnvironmentHelpers();

      function detectScope(primary) {
        if (primary && (typeof primary === 'object' || typeof primary === 'function')) {
          return primary;
        }

        let detected = null;

        if (
          CORE_ENVIRONMENT_HELPERS &&
          typeof CORE_ENVIRONMENT_HELPERS.fallbackDetectGlobalScope === 'function'
        ) {
          try {
            detected = CORE_ENVIRONMENT_HELPERS.fallbackDetectGlobalScope();
          } catch (detectScopeError) {
            void detectScopeError;
            detected = null;
          }
        }

        if (detected && (typeof detected === 'object' || typeof detected === 'function')) {
          return detected;
        }

        const fallbackScope = CORE_GLOBAL_SCOPE || detectGlobalScope();
        if (fallbackScope && (typeof fallbackScope === 'object' || typeof fallbackScope === 'function')) {
          return fallbackScope;
        }

        return null;
      }

      function jsonDeepClone(value) {
        if (value === null || typeof value !== 'object') {
          return value;
        }

        try {
          return JSON.parse(JSON.stringify(value));
        } catch (jsonCloneError) {
          void jsonCloneError;
        }

        return value;
      }

      function resolveStructuredClone(primary) {
        if (typeof structuredClone === 'function') {
          return structuredClone;
        }

        const scope = detectScope(primary);
        if (scope && typeof scope.structuredClone === 'function') {
          try {
            return scope.structuredClone.bind(scope);
          } catch (bindError) {
            void bindError;
          }
        }

        if (typeof require === 'function') {
          try {
            const nodeUtil = require('node:util');
            if (nodeUtil && typeof nodeUtil.structuredClone === 'function') {
              return nodeUtil.structuredClone.bind(nodeUtil);
            }
          } catch (nodeUtilError) {
            void nodeUtilError;
          }

          try {
            const legacyUtil = require('util');
            if (legacyUtil && typeof legacyUtil.structuredClone === 'function') {
              return legacyUtil.structuredClone.bind(legacyUtil);
            }
          } catch (legacyUtilError) {
            void legacyUtilError;
          }
        }

        return null;
      }

      function createResilientDeepClone(primary) {
        const structuredCloneImpl = resolveStructuredClone(primary);

        if (!structuredCloneImpl) {
          return jsonDeepClone;
        }

        return function resilientDeepClone(value) {
          if (value === null || typeof value !== 'object') {
            return value;
          }

          try {
            return structuredCloneImpl(value);
          } catch (structuredCloneError) {
            void structuredCloneError;
          }

          return jsonDeepClone(value);
        };
      }

      function ensureGlobalValue(name, fallbackValue, primary) {
        const fallbackProvider =
          typeof fallbackValue === 'function' ? fallbackValue : function provideStaticFallback() {
            return fallbackValue;
          };

        if (typeof name !== 'string' || !name) {
          try {
            return fallbackProvider();
          } catch (fallbackError) {
            void fallbackError;
            return undefined;
          }
        }

        const scope = detectScope(primary);
        if (!scope || typeof scope !== 'object') {
          return fallbackProvider();
        }

        let existing;
        try {
          existing = scope[name];
        } catch (readError) {
          existing = undefined;
          void readError;
        }

        if (typeof existing !== 'undefined') {
          return existing;
        }

        const value = fallbackProvider();

        try {
          scope[name] = value;
          return scope[name];
        } catch (assignError) {
          void assignError;
        }

        try {
          Object.defineProperty(scope, name, {
            configurable: true,
            writable: true,
            value,
          });
        } catch (defineError) {
          void defineError;
        }

        try {
          return scope[name];
        } catch (finalReadError) {
          void finalReadError;
        }

        return value;
      }

      function ensureDeepClone(primary) {
        const scope = detectScope(primary);
        if (scope && typeof scope.__cineDeepClone === 'function') {
          return scope.__cineDeepClone;
        }

        const clone = createResilientDeepClone(scope);

        if (scope && typeof scope === 'object') {
          try {
            Object.defineProperty(scope, '__cineDeepClone', {
              configurable: true,
              writable: true,
              value: clone,
            });
          } catch (defineError) {
            void defineError;

            try {
              scope.__cineDeepClone = clone;
            } catch (assignError) {
              void assignError;
            }
          }
        }

        return clone;
      }

      const namespace = {
        detectScope,
        jsonDeepClone,
        resolveStructuredClone,
        createResilientDeepClone,
        ensureGlobalValue,
        ensureDeepClone,
      };

      const globalScope = detectScope();
      const targetName = 'cineCoreRuntimeTools';
      const existing = globalScope && typeof globalScope[targetName] === 'object'
        ? globalScope[targetName]
        : {};

      const target = existing;
      for (const key of Object.keys(namespace)) {
        target[key] = namespace[key];
      }

      if (globalScope && typeof globalScope === 'object') {
        try {
          globalScope[targetName] = target;
        } catch (assignError) {
          void assignError;
        }
      }

      if (typeof module === 'object' && module && module.exports) {
        module.exports = target;
      }
    })();

  },

  'modules/core/runtime-state.js': function (module, exports, require) {
    (function () {
      const REGISTRY_NAME = 'cineCoreRuntimeStateModules';

      function detectAmbientScope() {
        if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object') {
          return globalThis;
        }

        if (typeof window !== 'undefined' && window && typeof window === 'object') {
          return window;
        }

        if (typeof self !== 'undefined' && self && typeof self === 'object') {
          return self;
        }

        if (typeof global !== 'undefined' && global && typeof global === 'object') {
          return global;
        }

        return null;
      }

      function fallbackDetectScope(primary) {
        if (primary && (typeof primary === 'object' || typeof primary === 'function')) {
          return primary;
        }

        return detectAmbientScope();
      }

      function fallbackHasArrayEntry(array, value) {
        if (!Array.isArray(array)) {
          return false;
        }

        for (let index = 0; index < array.length; index += 1) {
          if (array[index] === value) {
            return true;
          }
        }

        return false;
      }

      function fallbackRegisterSafeFreezeEntry(registry, value) {
        if (!registry || !value) {
          return registry;
        }

        if (typeof registry.add === 'function') {
          try {
            registry.add(value);
          } catch (registryAddError) {
            void registryAddError;
          }
          return registry;
        }

        if (!fallbackHasArrayEntry(registry, value) && Array.isArray(registry)) {
          registry.push(value);
        }

        return registry;
      }

      function fallbackCreateSafeFreezeRegistry(initialValues) {
        const registry = typeof WeakSet === 'function' ? new WeakSet() : [];

        if (Array.isArray(initialValues)) {
          for (let index = 0; index < initialValues.length; index += 1) {
            try {
              fallbackRegisterSafeFreezeEntry(registry, initialValues[index]);
            } catch (initialisationError) {
              void initialisationError;
            }
          }
        }

        return registry;
      }

      function fallbackEnsureSafeFreezeRegistry(registry, initialValues) {
        if (registry && (typeof registry.add === 'function' || Array.isArray(registry))) {
          return registry;
        }

        return fallbackCreateSafeFreezeRegistry(initialValues);
      }

      function fallbackHasSafeFreezeEntry(registry, value) {
        if (!registry || !value) {
          return false;
        }

        if (typeof registry.has === 'function') {
          try {
            return registry.has(value);
          } catch (registryHasError) {
            void registryHasError;
            return false;
          }
        }

        return fallbackHasArrayEntry(registry, value);
      }

      function fallbackResolveTemperatureKeyDefaults() {
        const defaults = {
          queueKey: '__cinePendingTemperatureNote',
          renderName: 'renderTemperatureNote',
        };

        const scope = fallbackDetectScope();
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
          return defaults;
        }

        try {
          if (typeof scope.CORE_TEMPERATURE_QUEUE_KEY === 'string') {
            defaults.queueKey = scope.CORE_TEMPERATURE_QUEUE_KEY;
          }
        } catch (readQueueKeyError) {
          void readQueueKeyError;
        }

        try {
          if (typeof scope.CORE_TEMPERATURE_RENDER_NAME === 'string') {
            defaults.renderName = scope.CORE_TEMPERATURE_RENDER_NAME;
          }
        } catch (readRenderNameError) {
          void readRenderNameError;
        }

        return defaults;
      }

      function fallbackCreateLocalRuntimeState(candidateScopes, options, temperatureResolver) {
        const resolveTemperatureKeys =
          typeof temperatureResolver === 'function'
            ? temperatureResolver
            : fallbackResolveTemperatureKeyDefaults;

        const configuration = options && typeof options === 'object' ? options : {};
        const resolvedTemperatureKeys = resolveTemperatureKeys();
        const temperatureQueueKey =
          typeof configuration.temperatureQueueKey === 'string'
            ? configuration.temperatureQueueKey
            : resolvedTemperatureKeys.queueKey;
        const temperatureRenderName =
          typeof configuration.temperatureRenderName === 'string'
            ? configuration.temperatureRenderName
            : resolvedTemperatureKeys.renderName;

        const scopes = [];
        const seenScopes = typeof Set === 'function' ? new Set() : null;

        function registerScope(scope) {
          if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
            return;
          }

          if (seenScopes) {
            if (seenScopes.has(scope)) {
              return;
            }
            seenScopes.add(scope);
            scopes.push(scope);
            return;
          }

          if (scopes.indexOf(scope) !== -1) {
            return;
          }

          scopes.push(scope);
        }

        if (Array.isArray(candidateScopes)) {
          for (let initialIndex = 0; initialIndex < candidateScopes.length; initialIndex += 1) {
            try {
              registerScope(candidateScopes[initialIndex]);
            } catch (initialiseScopeError) {
              void initialiseScopeError;
            }
          }
        }

        function withEachScope(callback) {
          if (typeof callback !== 'function') {
            return;
          }

          for (let index = 0; index < scopes.length; index += 1) {
            try {
              callback(scopes[index], index);
            } catch (scopeCallbackError) {
              void scopeCallbackError;
            }
          }
        }

        function getScopes() {
          return scopes.slice();
        }

        function getPrimaryScope() {
          return scopes.length > 0 ? scopes[0] : null;
        }

        function ensureValue(name, fallbackValue) {
          const fallbackProvider =
            typeof fallbackValue === 'function'
              ? fallbackValue
              : function provideStaticFallback() {
                  return fallbackValue;
                };

          if (typeof name !== 'string' || !name) {
            try {
              return fallbackProvider();
            } catch (fallbackError) {
              void fallbackError;
              return undefined;
            }
          }

          for (let scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
            const scope = scopes[scopeIndex];
            if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
              continue;
            }

            try {
              if (typeof scope[name] === 'undefined') {
                scope[name] = fallbackProvider();
              }
              return scope[name];
            } catch (ensureError) {
              void ensureError;
            }
          }

          try {
            return fallbackProvider();
          } catch (fallbackError) {
            void fallbackError;
            return undefined;
          }
        }

        function normaliseValue(name, validator, fallbackValue) {
          const fallbackProvider =
            typeof fallbackValue === 'function'
              ? fallbackValue
              : function provideStaticFallback() {
                  return fallbackValue;
                };

          const validate =
            typeof validator === 'function'
              ? validator
              : function alwaysValid() {
                  return true;
                };

          withEachScope(function applyNormaliser(scope) {
            try {
              if (!validate(scope[name])) {
                scope[name] = fallbackProvider();
              }
            } catch (normaliseError) {
              void normaliseError;
            }
          });
        }

        function readValue(name) {
          for (let scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
            const scope = scopes[scopeIndex];
            if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
              continue;
            }

            try {
              if (name in scope) {
                return scope[name];
              }
            } catch (readError) {
              void readError;
            }
          }

          return undefined;
        }

        let assignedTemperatureRenderer = null;

        function assignTemperatureRenderer(renderer) {
          if (typeof renderer !== 'function') {
            return;
          }

          assignedTemperatureRenderer = renderer;

          withEachScope(function applyRenderer(scope) {
            if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
              return;
            }

            try {
              scope[temperatureRenderName] = renderer;
              const pending = scope[temperatureQueueKey];

              if (pending && typeof pending === 'object') {
                if (Object.prototype.hasOwnProperty.call(pending, 'latestHours')) {
                  const hours = pending.latestHours;
                  if (typeof hours !== 'undefined') {
                    try {
                      renderer(hours);
                    } catch (temperatureRenderError) {
                      if (
                        typeof console !== 'undefined' &&
                        typeof console.error === 'function'
                      ) {
                        console.error(
                          'Failed to apply pending temperature note render',
                          temperatureRenderError,
                        );
                      }
                    }
                  }
                }

                if (Object.prototype.hasOwnProperty.call(pending, 'latestHours')) {
                  try {
                    delete pending.latestHours;
                  } catch (clearLatestError) {
                    void clearLatestError;
                    pending.latestHours = undefined;
                  }
                }
              }
            } catch (assignError) {
              void assignError;
            }
          });
        }

        function getAssignedTemperatureRenderer() {
          return assignedTemperatureRenderer;
        }

        const autoGearGuards = {
          isReferenceError: function defaultAutoGearReferenceGuard() {
            return false;
          },
          repair: function defaultAutoGearRepair() {
            return undefined;
          },
        };

        function setAutoGearGuards(nextGuards) {
          if (!nextGuards || typeof nextGuards !== 'object') {
            return;
          }

          if (typeof nextGuards.isReferenceError === 'function') {
            autoGearGuards.isReferenceError = nextGuards.isReferenceError;
          }

          if (typeof nextGuards.repair === 'function') {
            autoGearGuards.repair = nextGuards.repair;
          }
        }

        return {
          registerScope,
          withEachScope,
          getScopes,
          getPrimaryScope,
          ensureValue,
          normaliseValue,
          readValue,
          assignTemperatureRenderer,
          getAssignedTemperatureRenderer,
          autoGearGuards,
          setAutoGearGuards,
        };
      }

      function loadModuleFromRegistry(name) {
        const scope = detectAmbientScope();
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
          return null;
        }

        try {
          const registry = scope[REGISTRY_NAME];
          if (registry && typeof registry === 'object') {
            const module = registry[name];
            if (module && typeof module === 'object') {
              return module;
            }
          }
        } catch (registryLookupError) {
          void registryLookupError;
        }

        return null;
      }

      function loadModule(name, requirePath) {
        let resolved = null;

        if (typeof require === 'function') {
          try {
            resolved = require(requirePath);
          } catch (moduleRequireError) {
            void moduleRequireError;
          }
        }

        if (!resolved) {
          resolved = loadModuleFromRegistry(name);
        }

        return resolved || null;
      }

      const scopeUtilsModule = loadModule('scopeUtils', './runtime-state/scope-utils.js') || {};
      const safeFreezeModule = loadModule('safeFreezeRegistry', './runtime-state/safe-freeze-registry.js') || {};
      const temperatureKeysModule = loadModule('temperatureKeys', './runtime-state/temperature-keys.js') || {};
      const localRuntimeStateModule = loadModule('localRuntimeState', './runtime-state/local-runtime-state.js') || {};

      const detectScope =
        typeof scopeUtilsModule.detectScope === 'function'
          ? scopeUtilsModule.detectScope
          : fallbackDetectScope;

      const registerSafeFreezeEntry =
        typeof safeFreezeModule.registerSafeFreezeEntry === 'function'
          ? safeFreezeModule.registerSafeFreezeEntry
          : fallbackRegisterSafeFreezeEntry;

      const createSafeFreezeRegistry =
        typeof safeFreezeModule.createSafeFreezeRegistry === 'function'
          ? safeFreezeModule.createSafeFreezeRegistry
          : fallbackCreateSafeFreezeRegistry;

      const ensureSafeFreezeRegistry =
        typeof safeFreezeModule.ensureSafeFreezeRegistry === 'function'
          ? safeFreezeModule.ensureSafeFreezeRegistry
          : fallbackEnsureSafeFreezeRegistry;

      const hasSafeFreezeEntry =
        typeof safeFreezeModule.hasSafeFreezeEntry === 'function'
          ? safeFreezeModule.hasSafeFreezeEntry
          : fallbackHasSafeFreezeEntry;

      const resolveTemperatureKeyDefaults =
        typeof temperatureKeysModule.resolveTemperatureKeyDefaults === 'function'
          ? temperatureKeysModule.resolveTemperatureKeyDefaults
          : fallbackResolveTemperatureKeyDefaults;

      const createLocalRuntimeState =
        typeof localRuntimeStateModule.createLocalRuntimeState === 'function'
          ? localRuntimeStateModule.createLocalRuntimeState
          : function fallbackCreateLocalRuntimeStateWrapper(candidateScopes, options) {
              return fallbackCreateLocalRuntimeState(
                candidateScopes,
                options,
                resolveTemperatureKeyDefaults,
              );
            };

      const namespace = {
        detectScope,
        createSafeFreezeRegistry,
        ensureSafeFreezeRegistry,
        hasSafeFreezeEntry,
        registerSafeFreezeEntry,
        resolveTemperatureKeyDefaults,
        createLocalRuntimeState,
      };

      const globalScope = detectScope();
      const targetName = 'cineCoreRuntimeState';
      const existing =
        globalScope && typeof globalScope[targetName] === 'object'
          ? globalScope[targetName]
          : {};

      const target = existing;
      for (const key of Object.keys(namespace)) {
        target[key] = namespace[key];
      }

      if (globalScope && typeof globalScope === 'object') {
        try {
          globalScope[targetName] = target;
        } catch (assignError) {
          void assignError;
        }
      }

      if (typeof module === 'object' && module && module.exports) {
        module.exports = target;
      }
    })();

  },

  'modules/core/runtime-state/local-runtime-state.js': function (module, exports, require) {
    (function () {
      function detectAmbientScope() {
        if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object') {
          return globalThis;
        }

        if (typeof window !== 'undefined' && window && typeof window === 'object') {
          return window;
        }

        if (typeof self !== 'undefined' && self && typeof self === 'object') {
          return self;
        }

        if (typeof global !== 'undefined' && global && typeof global === 'object') {
          return global;
        }

        return null;
      }

      function fallbackDetectScope(primary) {
        if (primary && (typeof primary === 'object' || typeof primary === 'function')) {
          return primary;
        }

        return detectAmbientScope();
      }

      function resolveScopeUtils() {
        let scopeUtils = null;

        if (typeof require === 'function') {
          try {
            scopeUtils = require('./scope-utils.js');
          } catch (scopeUtilsRequireError) {
            void scopeUtilsRequireError;
          }
        }

        if (scopeUtils) {
          return scopeUtils;
        }

        const scope = detectAmbientScope();
        if (scope && typeof scope === 'object') {
          try {
            const registry = scope.cineCoreRuntimeStateModules;
            if (registry && typeof registry === 'object' && registry.scopeUtils) {
              return registry.scopeUtils;
            }
          } catch (scopeLookupError) {
            void scopeLookupError;
          }
        }

        return null;
      }

      const scopeUtils = resolveScopeUtils();
      const detectScope =
        scopeUtils && typeof scopeUtils.detectScope === 'function'
          ? scopeUtils.detectScope
          : fallbackDetectScope;

      function resolveTemperatureKeysModule() {
        let temperatureKeys = null;

        if (typeof require === 'function') {
          try {
            temperatureKeys = require('./temperature-keys.js');
          } catch (temperatureKeysRequireError) {
            void temperatureKeysRequireError;
          }
        }

        if (temperatureKeys) {
          return temperatureKeys;
        }

        const scope = detectAmbientScope();
        if (scope && typeof scope === 'object') {
          try {
            const registry = scope.cineCoreRuntimeStateModules;
            if (registry && typeof registry === 'object' && registry.temperatureKeys) {
              return registry.temperatureKeys;
            }
          } catch (scopeLookupError) {
            void scopeLookupError;
          }
        }

        return null;
      }

      const temperatureKeysModule = resolveTemperatureKeysModule();
      const resolveTemperatureKeyDefaults =
        temperatureKeysModule && typeof temperatureKeysModule.resolveTemperatureKeyDefaults === 'function'
          ? temperatureKeysModule.resolveTemperatureKeyDefaults
          : function fallbackResolveTemperatureKeyDefaults() {
              const defaults = {
                queueKey: '__cinePendingTemperatureNote',
                renderName: 'renderTemperatureNote',
              };

              const scope = detectScope();
              if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
                return defaults;
              }

              try {
                if (typeof scope.CORE_TEMPERATURE_QUEUE_KEY === 'string') {
                  defaults.queueKey = scope.CORE_TEMPERATURE_QUEUE_KEY;
                }
              } catch (readQueueKeyError) {
                void readQueueKeyError;
              }

              try {
                if (typeof scope.CORE_TEMPERATURE_RENDER_NAME === 'string') {
                  defaults.renderName = scope.CORE_TEMPERATURE_RENDER_NAME;
                }
              } catch (readRenderNameError) {
                void readRenderNameError;
              }

              return defaults;
            };

      function createLocalRuntimeState(candidateScopes, options) {
        const configuration = options && typeof options === 'object' ? options : {};
        const resolvedTemperatureKeys = resolveTemperatureKeyDefaults();
        const temperatureQueueKey =
          typeof configuration.temperatureQueueKey === 'string'
            ? configuration.temperatureQueueKey
            : resolvedTemperatureKeys.queueKey;
        const temperatureRenderName =
          typeof configuration.temperatureRenderName === 'string'
            ? configuration.temperatureRenderName
            : resolvedTemperatureKeys.renderName;

        const scopes = [];
        const seenScopes = typeof Set === 'function' ? new Set() : null;

        function registerScope(scope) {
          if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
            return;
          }

          if (seenScopes) {
            if (seenScopes.has(scope)) {
              return;
            }
            seenScopes.add(scope);
            scopes.push(scope);
            return;
          }

          if (scopes.indexOf(scope) !== -1) {
            return;
          }

          scopes.push(scope);
        }

        if (Array.isArray(candidateScopes)) {
          for (let initialIndex = 0; initialIndex < candidateScopes.length; initialIndex += 1) {
            try {
              registerScope(candidateScopes[initialIndex]);
            } catch (initialiseScopeError) {
              void initialiseScopeError;
            }
          }
        }

        function withEachScope(callback) {
          if (typeof callback !== 'function') {
            return;
          }

          for (let index = 0; index < scopes.length; index += 1) {
            try {
              callback(scopes[index], index);
            } catch (scopeCallbackError) {
              void scopeCallbackError;
            }
          }
        }

        function getScopes() {
          return scopes.slice();
        }

        function getPrimaryScope() {
          return scopes.length > 0 ? scopes[0] : null;
        }

        function ensureValue(name, fallbackValue) {
          const fallbackProvider =
            typeof fallbackValue === 'function'
              ? fallbackValue
              : function provideStaticFallback() {
                  return fallbackValue;
                };

          if (typeof name !== 'string' || !name) {
            try {
              return fallbackProvider();
            } catch (fallbackError) {
              void fallbackError;
              return undefined;
            }
          }

          for (let scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
            const scope = scopes[scopeIndex];
            if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
              continue;
            }

            try {
              if (typeof scope[name] === 'undefined') {
                scope[name] = fallbackProvider();
              }
              return scope[name];
            } catch (ensureError) {
              void ensureError;
            }
          }

          try {
            return fallbackProvider();
          } catch (fallbackError) {
            void fallbackError;
            return undefined;
          }
        }

        function normaliseValue(name, validator, fallbackValue) {
          const fallbackProvider =
            typeof fallbackValue === 'function'
              ? fallbackValue
              : function provideStaticFallback() {
                  return fallbackValue;
                };

          const validate =
            typeof validator === 'function'
              ? validator
              : function alwaysValid() {
                  return true;
                };

          withEachScope(function applyNormaliser(scope) {
            try {
              if (!validate(scope[name])) {
                scope[name] = fallbackProvider();
              }
            } catch (normaliseError) {
              void normaliseError;
            }
          });
        }

        function readValue(name) {
          for (let scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
            const scope = scopes[scopeIndex];
            if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
              continue;
            }

            try {
              if (name in scope) {
                return scope[name];
              }
            } catch (readError) {
              void readError;
            }
          }

          return undefined;
        }

        let assignedTemperatureRenderer = null;

        function assignTemperatureRenderer(renderer) {
          if (typeof renderer !== 'function') {
            return;
          }

          assignedTemperatureRenderer = renderer;

          withEachScope(function applyRenderer(scope) {
            if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
              return;
            }

            try {
              scope[temperatureRenderName] = renderer;
              const pending = scope[temperatureQueueKey];

              if (pending && typeof pending === 'object') {
                if (Object.prototype.hasOwnProperty.call(pending, 'latestHours')) {
                  const hours = pending.latestHours;
                  if (typeof hours !== 'undefined') {
                    try {
                      renderer(hours);
                    } catch (temperatureRenderError) {
                      if (
                        typeof console !== 'undefined' &&
                        typeof console.error === 'function'
                      ) {
                        console.error(
                          'Failed to apply pending temperature note render',
                          temperatureRenderError,
                        );
                      }
                    }
                  }
                }

                if (Object.prototype.hasOwnProperty.call(pending, 'latestHours')) {
                  try {
                    delete pending.latestHours;
                  } catch (clearLatestError) {
                    void clearLatestError;
                    pending.latestHours = undefined;
                  }
                }
              }
            } catch (assignError) {
              void assignError;
            }
          });
        }

        function getAssignedTemperatureRenderer() {
          return assignedTemperatureRenderer;
        }

        const autoGearGuards = {
          isReferenceError: function defaultAutoGearReferenceGuard() {
            return false;
          },
          repair: function defaultAutoGearRepair() {
            return undefined;
          },
        };

        function setAutoGearGuards(nextGuards) {
          if (!nextGuards || typeof nextGuards !== 'object') {
            return;
          }

          if (typeof nextGuards.isReferenceError === 'function') {
            autoGearGuards.isReferenceError = nextGuards.isReferenceError;
          }

          if (typeof nextGuards.repair === 'function') {
            autoGearGuards.repair = nextGuards.repair;
          }
        }

        return {
          registerScope,
          withEachScope,
          getScopes,
          getPrimaryScope,
          ensureValue,
          normaliseValue,
          readValue,
          assignTemperatureRenderer,
          getAssignedTemperatureRenderer,
          autoGearGuards,
          setAutoGearGuards,
        };
      }

      function assignToGlobal(namespace) {
        const scope = detectAmbientScope();
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
          return;
        }

        const registryName = 'cineCoreRuntimeStateModules';
        const existing =
          scope[registryName] && typeof scope[registryName] === 'object'
            ? scope[registryName]
            : {};

        existing.localRuntimeState = namespace;

        try {
          scope[registryName] = existing;
        } catch (assignError) {
          void assignError;
        }
      }

      const namespace = {
        createLocalRuntimeState,
      };

      assignToGlobal(namespace);

      if (typeof module === 'object' && module && module.exports) {
        module.exports = namespace;
      }
    })();

  },

  'modules/core/runtime-state/safe-freeze-registry.js': function (module, exports, require) {
    (function () {
      function detectAmbientScope() {
        if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object') {
          return globalThis;
        }

        if (typeof window !== 'undefined' && window && typeof window === 'object') {
          return window;
        }

        if (typeof self !== 'undefined' && self && typeof self === 'object') {
          return self;
        }

        if (typeof global !== 'undefined' && global && typeof global === 'object') {
          return global;
        }

        return null;
      }

      function fallbackHasArrayEntry(array, value) {
        if (!Array.isArray(array)) {
          return false;
        }

        for (let index = 0; index < array.length; index += 1) {
          if (array[index] === value) {
            return true;
          }
        }

        return false;
      }

      function resolveScopeUtils() {
        let scopeUtils = null;

        if (typeof require === 'function') {
          try {
            scopeUtils = require('./scope-utils.js');
          } catch (scopeUtilsRequireError) {
            void scopeUtilsRequireError;
          }
        }

        if (scopeUtils) {
          return scopeUtils;
        }

        const scope = detectAmbientScope();
        if (scope && typeof scope === 'object') {
          try {
            const registry = scope.cineCoreRuntimeStateModules;
            if (registry && typeof registry === 'object' && registry.scopeUtils) {
              return registry.scopeUtils;
            }
          } catch (scopeLookupError) {
            void scopeLookupError;
          }
        }

        return null;
      }

      const scopeUtils = resolveScopeUtils();
      const hasArrayEntry =
        scopeUtils && typeof scopeUtils.hasArrayEntry === 'function'
          ? scopeUtils.hasArrayEntry
          : fallbackHasArrayEntry;

      function registerSafeFreezeEntry(registry, value) {
        if (!registry || !value) {
          return registry;
        }

        if (typeof registry.add === 'function') {
          try {
            registry.add(value);
          } catch (registryAddError) {
            void registryAddError;
          }
          return registry;
        }

        if (!hasArrayEntry(registry, value) && Array.isArray(registry)) {
          registry.push(value);
        }

        return registry;
      }

      function createSafeFreezeRegistry(initialValues) {
        const registry = typeof WeakSet === 'function' ? new WeakSet() : [];

        if (Array.isArray(initialValues)) {
          for (let index = 0; index < initialValues.length; index += 1) {
            try {
              registerSafeFreezeEntry(registry, initialValues[index]);
            } catch (initialisationError) {
              void initialisationError;
            }
          }
        }

        return registry;
      }

      function ensureSafeFreezeRegistry(registry, initialValues) {
        if (registry && (typeof registry.add === 'function' || Array.isArray(registry))) {
          return registry;
        }

        return createSafeFreezeRegistry(initialValues);
      }

      function hasSafeFreezeEntry(registry, value) {
        if (!registry || !value) {
          return false;
        }

        if (typeof registry.has === 'function') {
          try {
            return registry.has(value);
          } catch (registryHasError) {
            void registryHasError;
            return false;
          }
        }

        return hasArrayEntry(registry, value);
      }

      function assignToGlobal(namespace) {
        const scope = detectAmbientScope();
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
          return;
        }

        const registryName = 'cineCoreRuntimeStateModules';
        const existing =
          scope[registryName] && typeof scope[registryName] === 'object'
            ? scope[registryName]
            : {};

        existing.safeFreezeRegistry = namespace;

        try {
          scope[registryName] = existing;
        } catch (assignError) {
          void assignError;
        }
      }

      const namespace = {
        createSafeFreezeRegistry,
        ensureSafeFreezeRegistry,
        hasSafeFreezeEntry,
        registerSafeFreezeEntry,
      };

      assignToGlobal(namespace);

      if (typeof module === 'object' && module && module.exports) {
        module.exports = namespace;
      }
    })();

  },

  'modules/core/runtime-state/scope-utils.js': function (module, exports, require) {
    (function () {
      function detectAmbientScope() {
        if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object') {
          return globalThis;
        }

        if (typeof window !== 'undefined' && window && typeof window === 'object') {
          return window;
        }

        if (typeof self !== 'undefined' && self && typeof self === 'object') {
          return self;
        }

        if (typeof global !== 'undefined' && global && typeof global === 'object') {
          return global;
        }

        return null;
      }

      function detectScope(primary) {
        if (primary && (typeof primary === 'object' || typeof primary === 'function')) {
          return primary;
        }

        return detectAmbientScope();
      }

      function hasArrayEntry(array, value) {
        if (!Array.isArray(array)) {
          return false;
        }

        for (let index = 0; index < array.length; index += 1) {
          if (array[index] === value) {
            return true;
          }
        }

        return false;
      }

      function assignToGlobal(namespace) {
        const scope = detectAmbientScope();
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
          return;
        }

        const registryName = 'cineCoreRuntimeStateModules';
        const existing =
          scope[registryName] && typeof scope[registryName] === 'object'
            ? scope[registryName]
            : {};

        existing.scopeUtils = namespace;

        try {
          scope[registryName] = existing;
        } catch (assignError) {
          void assignError;
        }
      }

      const namespace = {
        detectScope,
        hasArrayEntry,
      };

      assignToGlobal(namespace);

      if (typeof module === 'object' && module && module.exports) {
        module.exports = namespace;
      }
    })();

  },

  'modules/core/runtime-state/temperature-keys.js': function (module, exports, require) {
    (function () {
      function detectAmbientScope() {
        if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object') {
          return globalThis;
        }

        if (typeof window !== 'undefined' && window && typeof window === 'object') {
          return window;
        }

        if (typeof self !== 'undefined' && self && typeof self === 'object') {
          return self;
        }

        if (typeof global !== 'undefined' && global && typeof global === 'object') {
          return global;
        }

        return null;
      }

      function fallbackDetectScope(primary) {
        if (primary && (typeof primary === 'object' || typeof primary === 'function')) {
          return primary;
        }

        return detectAmbientScope();
      }

      function resolveScopeUtils() {
        let scopeUtils = null;

        if (typeof require === 'function') {
          try {
            scopeUtils = require('./scope-utils.js');
          } catch (scopeUtilsRequireError) {
            void scopeUtilsRequireError;
          }
        }

        if (scopeUtils) {
          return scopeUtils;
        }

        const scope = detectAmbientScope();
        if (scope && typeof scope === 'object') {
          try {
            const registry = scope.cineCoreRuntimeStateModules;
            if (registry && typeof registry === 'object' && registry.scopeUtils) {
              return registry.scopeUtils;
            }
          } catch (scopeLookupError) {
            void scopeLookupError;
          }
        }

        return null;
      }

      const scopeUtils = resolveScopeUtils();
      const detectScope =
        scopeUtils && typeof scopeUtils.detectScope === 'function'
          ? scopeUtils.detectScope
          : fallbackDetectScope;

      function resolveTemperatureKeyDefaults() {
        const defaults = {
          queueKey: '__cinePendingTemperatureNote',
          renderName: 'renderTemperatureNote',
        };

        const scope = detectScope();
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
          return defaults;
        }

        try {
          if (typeof scope.CORE_TEMPERATURE_QUEUE_KEY === 'string') {
            defaults.queueKey = scope.CORE_TEMPERATURE_QUEUE_KEY;
          }
        } catch (readQueueKeyError) {
          void readQueueKeyError;
        }

        try {
          if (typeof scope.CORE_TEMPERATURE_RENDER_NAME === 'string') {
            defaults.renderName = scope.CORE_TEMPERATURE_RENDER_NAME;
          }
        } catch (readRenderNameError) {
          void readRenderNameError;
        }

        return defaults;
      }

      function assignToGlobal(namespace) {
        const scope = detectAmbientScope();
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
          return;
        }

        const registryName = 'cineCoreRuntimeStateModules';
        const existing =
          scope[registryName] && typeof scope[registryName] === 'object'
            ? scope[registryName]
            : {};

        existing.temperatureKeys = namespace;

        try {
          scope[registryName] = existing;
        } catch (assignError) {
          void assignError;
        }
      }

      const namespace = {
        resolveTemperatureKeyDefaults,
      };

      assignToGlobal(namespace);

      if (typeof module === 'object' && module && module.exports) {
        module.exports = namespace;
      }
    })();

  },

  'modules/core/support-resolver.js': function (module, exports, require) {
    (function () {
      function detectRuntimeScope(primaryScope) {
        const candidates = [];

        if (
          primaryScope &&
          (typeof primaryScope === 'object' || typeof primaryScope === 'function')
        ) {
          candidates.push(primaryScope);
        }

        if (typeof globalThis !== 'undefined' && typeof globalThis === 'object') {
          candidates.push(globalThis);
        }

        if (typeof window !== 'undefined' && typeof window === 'object') {
          candidates.push(window);
        }

        if (typeof self !== 'undefined' && typeof self === 'object') {
          candidates.push(self);
        }

        if (typeof global !== 'undefined' && typeof global === 'object') {
          candidates.push(global);
        }

        for (let index = 0; index < candidates.length; index += 1) {
          const candidate = candidates[index];
          if (!candidate || (typeof candidate !== 'object' && typeof candidate !== 'function')) {
            continue;
          }

          return candidate;
        }

        return null;
      }

      function resolveCoreSupportModule(namespaceName, requirePath, primaryScope) {
        if (typeof namespaceName !== 'string' || !namespaceName) {
          return null;
        }

        const runtimeScope = detectRuntimeScope(primaryScope);

        if (
          runtimeScope &&
          runtimeScope[namespaceName] &&
          typeof runtimeScope[namespaceName] === 'object'
        ) {
          return runtimeScope[namespaceName];
        }

        if (typeof require === 'function' && typeof requirePath === 'string' && requirePath) {
          try {
            const required = require(requirePath);
            if (required && typeof required === 'object') {
              return required;
            }
          } catch (supportModuleError) {
            void supportModuleError;
          }
        }

        return null;
      }

      const namespace = {
        detectRuntimeScope,
        resolveCoreSupportModule,
      };

      const globalScope = detectRuntimeScope();
      const targetName = 'cineCoreSupportResolver';
      const existing =
        globalScope && typeof globalScope[targetName] === 'object'
          ? globalScope[targetName]
          : {};

      const target = existing;
      for (const key of Object.keys(namespace)) {
        target[key] = namespace[key];
      }

      if (globalScope && typeof globalScope === 'object') {
        try {
          globalScope[targetName] = target;
        } catch (assignError) {
          void assignError;
        }
      }

      if (typeof module === 'object' && module && module.exports) {
        module.exports = target;
      }
    })();

  }
  };
  /* eslint-enable no-redeclare, no-unused-vars */


  const MODULE_CACHE = Object.create(null);

  function loadModule(moduleId) {
    if (MODULE_CACHE[moduleId]) {
      return MODULE_CACHE[moduleId].exports;
    }

    const factory = MODULE_FACTORIES[moduleId];
    if (typeof factory !== 'function') {
      throw new Error('Unknown runtime module: ' + moduleId);
    }

    const module = { exports: {} };
    MODULE_CACHE[moduleId] = module;

    const moduleDir = getModuleDirectory(moduleId);

    function localRequire(request) {
      if (typeof request === 'string') {
        let normalized = null;
        if (request.startsWith('./modules/core/')) {
          normalized = request.slice(2);
        } else if (request.startsWith('../core/')) {
          normalized = 'modules/core/' + request.slice(8);
        } else if (request.startsWith('./') || request.startsWith('../')) {
          normalized = normalizeFromDir(moduleDir, request);
        }
        if (normalized && MODULE_FACTORIES[normalized]) {
          return loadModule(normalized);
        }
      }
      return require(request);
    }

    factory(module, module.exports, localRequire);

    return module.exports;
  }

  const exportsMap = {};
  Object.keys(MODULE_FACTORIES).forEach(moduleId => {
    exportsMap[moduleId] = loadModule(moduleId);
  });

  if (typeof module === 'object' && module && module.exports) {
    module.exports = exportsMap;
  }

  const globalScope = typeof globalThis === 'object' && globalThis
    ? globalThis
    : typeof window === 'object' && window
    ? window
    : typeof self === 'object' && self
    ? self
    : typeof global === 'object' && global
    ? global
    : null;

  if (globalScope) {
    const targetName = 'cineCoreRuntimeModules';
    const existing = globalScope[targetName] && typeof globalScope[targetName] === 'object'
      ? globalScope[targetName]
      : {};
    Object.keys(exportsMap).forEach(key => {
      existing[key] = exportsMap[key];
    });
    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
})();
