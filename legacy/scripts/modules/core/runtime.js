function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function getModuleDirectory(moduleId) {
    var segments = moduleId.split('/');
    segments.pop();
    return segments.join('/');
  }
  function normalizeFromDir(moduleDir, request) {
    var segments = moduleDir ? moduleDir.split('/') : [];
    var parts = request.split('/');
    for (var index = 0; index < parts.length; index += 1) {
      var segment = parts[index];
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
  var MODULE_FACTORIES = {
    'modules/core/runtime-module-loader.js': function modules_core_runtimeModuleLoaderJs(module, exports, require) {
      (function () {
        var HAS = Object.prototype.hasOwnProperty;
        function isScope(candidate) {
          return !!candidate && (_typeof(candidate) === 'object' || typeof candidate === 'function');
        }
        function collectCandidateScopes(options) {
          var scopes = [];
          function register(scope) {
            if (!isScope(scope)) {
              return;
            }
            if (scopes.indexOf(scope) === -1) {
              scopes.push(scope);
            }
          }
          var primaryScope = options && options.primaryScope;
          var additionalScopes = options && options.candidateScopes;
          register(primaryScope);
          if (Array.isArray(additionalScopes)) {
            for (var index = 0; index < additionalScopes.length; index += 1) {
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
            var _namespace = scope.cineCoreRuntimeModules;
            return _namespace && _typeof(_namespace) === 'object' ? _namespace : null;
          } catch (scopeLookupError) {
            void scopeLookupError;
          }
          return null;
        }
        function tryRequireRuntimeNamespace() {
          if (typeof require !== 'function') {
            return null;
          }
          var candidates = ['./runtime.js'];
          for (var index = 0; index < candidates.length; index += 1) {
            var candidate = candidates[index];
            try {
              var required = require(candidate);
              if (required && _typeof(required) === 'object') {
                return required;
              }
            } catch (runtimeRequireError) {
              void runtimeRequireError;
            }
          }
          return null;
        }
        function resolveCoreRuntimeModulesNamespace(options) {
          if (typeof cineCoreRuntimeModules !== 'undefined' && cineCoreRuntimeModules && (typeof cineCoreRuntimeModules === "undefined" ? "undefined" : _typeof(cineCoreRuntimeModules)) === 'object') {
            return cineCoreRuntimeModules;
          }
          var candidates = collectCandidateScopes(options || {});
          for (var index = 0; index < candidates.length; index += 1) {
            var _namespace2 = readRuntimeNamespaceFromScope(candidates[index]);
            if (_namespace2) {
              return _namespace2;
            }
          }
          return tryRequireRuntimeNamespace();
        }
        function resolveCoreRuntimeModule(moduleId, options) {
          if (typeof moduleId !== 'string' || !moduleId) {
            return null;
          }
          var namespace = resolveCoreRuntimeModulesNamespace(options || {});
          if (!namespace || _typeof(namespace) !== 'object') {
            return null;
          }
          if (HAS.call(namespace, moduleId)) {
            return namespace[moduleId];
          }
          return null;
        }
        var namespace = {
          resolveCoreRuntimeModulesNamespace: resolveCoreRuntimeModulesNamespace,
          resolveCoreRuntimeModule: resolveCoreRuntimeModule
        };
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = namespace;
        }
        var globalScope = function detectGlobalScope() {
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
        }();
        if (globalScope) {
          try {
            globalScope.cineCoreRuntimeModuleLoader = namespace;
          } catch (assignError) {
            void assignError;
          }
        }
      })();
    },
    'modules/core/runtime-candidate-scopes.js': function modules_core_runtimeCandidateScopesJs(module, exports, require) {
      (function () {
        function isValidScope(scope) {
          return !!scope && (_typeof(scope) === 'object' || typeof scope === 'function');
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
          if (runtimeShared && typeof runtimeShared.collectCandidateScopes === 'function') {
            try {
              var sharedScopes = runtimeShared.collectCandidateScopes(primaryScope, environmentHelpers);
              if (Array.isArray(sharedScopes)) {
                return sharedScopes;
              }
            } catch (collectRuntimeScopesError) {
              void collectRuntimeScopesError;
            }
          }
          var scopes = [];
          var seenScopes = typeof Set === 'function' ? new Set() : null;
          registerScope(scopes, seenScopes, primaryScope);
          registerScope(scopes, seenScopes, typeof globalThis !== 'undefined' ? globalThis : null);
          registerScope(scopes, seenScopes, typeof window !== 'undefined' ? window : null);
          registerScope(scopes, seenScopes, typeof self !== 'undefined' ? self : null);
          registerScope(scopes, seenScopes, typeof global !== 'undefined' ? global : null);
          return scopes;
        }
        function resolveCandidateScopes(options) {
          var primaryScope = options && options.primaryScope;
          var runtimeShared = options && options.runtimeShared;
          var environmentHelpers = options && options.environmentHelpers;
          var currentCandidateScopes = options && options.currentCandidateScopes;
          if (isScopeList(currentCandidateScopes)) {
            return currentCandidateScopes;
          }
          var resolvedScopes = null;
          if (runtimeShared && typeof runtimeShared.resolveCandidateScopes === 'function') {
            try {
              resolvedScopes = runtimeShared.resolveCandidateScopes(primaryScope, environmentHelpers);
            } catch (resolveCandidateScopesError) {
              void resolveCandidateScopesError;
              resolvedScopes = null;
            }
          }
          if (!resolvedScopes) {
            resolvedScopes = collectCandidateScopesWithFallback(primaryScope, runtimeShared, environmentHelpers);
          }
          return resolvedScopes;
        }
        function syncCandidateScopes(candidateScopes, options) {
          var runtimeShared = options && options.runtimeShared;
          var environmentHelpers = options && options.environmentHelpers;
          var primaryScope = options && options.primaryScope;
          var globalScope = options && options.globalScope || detectFallbackGlobalScope(primaryScope);
          var assignCurrentCandidateScopes = options && options.assignCurrentCandidateScopes;
          if (runtimeShared && typeof runtimeShared.syncCandidateScopes === 'function') {
            try {
              runtimeShared.syncCandidateScopes(candidateScopes, primaryScope, environmentHelpers);
              return candidateScopes;
            } catch (syncCandidateScopesError) {
              void syncCandidateScopesError;
            }
          }
          if (isValidScope(globalScope) && (!globalScope.CORE_RUNTIME_CANDIDATE_SCOPES || globalScope.CORE_RUNTIME_CANDIDATE_SCOPES !== candidateScopes)) {
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
          var candidateScopes = resolveCandidateScopes(options || {});
          return syncCandidateScopes(candidateScopes, options || {});
        }
        var namespace = {
          collectCandidateScopesWithFallback: collectCandidateScopesWithFallback,
          resolveCandidateScopes: resolveCandidateScopes,
          syncCandidateScopes: syncCandidateScopes,
          ensureCandidateScopes: ensureCandidateScopes
        };
        var globalScope = detectFallbackGlobalScope();
        var targetName = 'cineCoreRuntimeCandidateScopes';
        var existing = globalScope && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
        var target = existing;
        for (var _i = 0, _Object$keys = Object.keys(namespace); _i < _Object$keys.length; _i++) {
          var key = _Object$keys[_i];
          target[key] = namespace[key];
        }
        if (isValidScope(globalScope)) {
          try {
            globalScope[targetName] = target;
          } catch (assignError) {
            void assignError;
          }
        }
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = target;
        }
      })();
    },
    'modules/core/runtime-localization.js': function modules_core_runtimeLocalizationJs(module, exports, require) {
      (function () {
        function isValidScope(scope) {
          return !!scope && (_typeof(scope) === 'object' || typeof scope === 'function');
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
              var normalised = String(lang).trim().toLowerCase();
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
          var configuration = options && _typeof(options) === 'object' ? options : {};
          var runtimeScope = configuration.runtimeScope;
          var coreGlobalScope = configuration.coreGlobalScope;
          var globalScope = detectGlobalScope(coreGlobalScope || runtimeScope);
          var localizationBridge = configuration.localizationBridge && _typeof(configuration.localizationBridge) === 'object' ? configuration.localizationBridge : null;
          var fallbackResolveLocaleModule = typeof configuration.fallbackResolveLocaleModule === 'function' ? configuration.fallbackResolveLocaleModule : function resolveFallbackLocaleModule(scope) {
            void scope;
            return null;
          };
          var createLocaleFallbacks = typeof configuration.createLocaleFallbacks === 'function' ? configuration.createLocaleFallbacks : function createLocaleFallbacksFallback() {
            return null;
          };
          function resolveLocaleModule() {
            if (localizationBridge && typeof localizationBridge.resolveLocaleModule === 'function') {
              try {
                var resolved = localizationBridge.resolveLocaleModule(runtimeScope);
                if (resolved && _typeof(resolved) === 'object') {
                  return resolved;
                }
              } catch (bridgeResolveError) {
                void bridgeResolveError;
              }
            }
            try {
              var fallbackModule = fallbackResolveLocaleModule(runtimeScope);
              if (fallbackModule && _typeof(fallbackModule) === 'object') {
                return fallbackModule;
              }
            } catch (fallbackResolveError) {
              void fallbackResolveError;
            }
            return configuration.localeModule && _typeof(configuration.localeModule) === 'object' ? configuration.localeModule : null;
          }
          var localeModule = resolveLocaleModule();
          var defaultLanguage = function resolveDefaultLanguage() {
            if (localizationBridge && typeof localizationBridge.getDefaultLanguage === 'function') {
              try {
                var resolved = localizationBridge.getDefaultLanguage(runtimeScope);
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
          }();
          var rtlLanguageCodes = function resolveRtlCodes() {
            if (localizationBridge && typeof localizationBridge.getRtlLanguageCodes === 'function') {
              try {
                var resolved = localizationBridge.getRtlLanguageCodes(runtimeScope);
                if (Array.isArray(resolved) && resolved.length > 0) {
                  return resolved;
                }
              } catch (rtlCodesError) {
                void rtlCodesError;
              }
            }
            if (localeModule && Array.isArray(localeModule.RTL_LANGUAGE_CODES) && localeModule.RTL_LANGUAGE_CODES.length > 0) {
              return localeModule.RTL_LANGUAGE_CODES;
            }
            if (Array.isArray(configuration.defaultRtlCodes)) {
              return configuration.defaultRtlCodes;
            }
            return ['ar', 'fa', 'he', 'ur'];
          }();
          var localizationFallbackHelpers = function resolveFallbackHelpers() {
            try {
              return createLocaleFallbacks({
                defaultLanguage: defaultLanguage,
                rtlLanguageCodes: rtlLanguageCodes,
                localizationFallbackNamespace: configuration.localizationFallbackNamespace,
                localizationFallbackSupport: configuration.localizationFallbackSupport,
                localizationFallbacks: configuration.localizationFallbacks,
                inlineLocalizationFallbacks: configuration.inlineLocalizationFallbacks
              });
            } catch (createFallbacksError) {
              void createFallbacksError;
            }
            return null;
          }();
          var fallbackNormalizeLanguageCode = localizationFallbackHelpers && typeof localizationFallbackHelpers.normalizeLanguageCode === 'function' ? function fallbackNormalizeLanguageCode(lang) {
            return localizationFallbackHelpers.normalizeLanguageCode(lang);
          } : function fallbackNormalizeLanguageCode(lang) {
            var normalised = normaliseLanguageInput(lang);
            return normalised || defaultLanguage;
          };
          var fallbackIsRtlLanguage = localizationFallbackHelpers && typeof localizationFallbackHelpers.isRtlLanguage === 'function' ? function fallbackIsRtlLanguage(lang) {
            return localizationFallbackHelpers.isRtlLanguage(lang);
          } : function fallbackIsRtlLanguage(lang) {
            var normalised = fallbackNormalizeLanguageCode(lang);
            var base = normalised.split('-')[0];
            return rtlLanguageCodes.indexOf(base) !== -1;
          };
          var fallbackResolveDocumentDirection = localizationFallbackHelpers && typeof localizationFallbackHelpers.resolveDocumentDirection === 'function' ? function fallbackResolveDocumentDirection(lang) {
            return localizationFallbackHelpers.resolveDocumentDirection(lang);
          } : function fallbackResolveDocumentDirection(lang) {
            if (typeof document !== 'undefined' && document && document.documentElement) {
              try {
                var docDir = document.documentElement.getAttribute('dir');
                if (docDir) {
                  return docDir;
                }
              } catch (documentDirectionError) {
                void documentDirectionError;
              }
            }
            return fallbackIsRtlLanguage(lang) ? 'rtl' : 'ltr';
          };
          var fallbackApplyLocaleMetadata = localizationFallbackHelpers && typeof localizationFallbackHelpers.applyLocaleMetadata === 'function' ? function fallbackApplyLocaleMetadata(target, lang, direction) {
            return localizationFallbackHelpers.applyLocaleMetadata(target, lang, direction);
          } : function fallbackApplyLocaleMetadata(target, lang, direction) {
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
          var normalizeLanguageCode = localizationBridge && typeof localizationBridge.normalizeLanguageCode === 'function' ? function normalizeLanguageCodeProxy(lang) {
            try {
              return localizationBridge.normalizeLanguageCode(lang, runtimeScope);
            } catch (normalizeError) {
              void normalizeError;
            }
            return fallbackNormalizeLanguageCode(lang);
          } : fallbackNormalizeLanguageCode;
          var isRtlLanguage = localizationBridge && typeof localizationBridge.isRtlLanguage === 'function' ? function isRtlLanguageProxy(lang) {
            try {
              return localizationBridge.isRtlLanguage(lang, runtimeScope);
            } catch (isRtlError) {
              void isRtlError;
            }
            return fallbackIsRtlLanguage(lang);
          } : fallbackIsRtlLanguage;
          var resolveDocumentDirection = localizationBridge && typeof localizationBridge.resolveDocumentDirection === 'function' ? function resolveDocumentDirectionProxy(lang) {
            try {
              return localizationBridge.resolveDocumentDirection(lang, runtimeScope);
            } catch (resolveDirectionError) {
              void resolveDirectionError;
            }
            return fallbackResolveDocumentDirection(lang);
          } : fallbackResolveDocumentDirection;
          var applyLocaleMetadata = localizationBridge && typeof localizationBridge.applyLocaleMetadata === 'function' ? function applyLocaleMetadataProxy(target, lang, direction) {
            try {
              return localizationBridge.applyLocaleMetadata(target, lang, direction, runtimeScope);
            } catch (applyMetadataError) {
              void applyMetadataError;
            }
            return fallbackApplyLocaleMetadata(target, lang, direction);
          } : fallbackApplyLocaleMetadata;
          var translationAdditionalScopes = toArray(configuration.translationAdditionalScopes).filter(isValidScope);
          function collectTranslationScopeCandidates() {
            var candidates = [];
            var seen = typeof Set === 'function' ? new Set() : null;
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
            for (var index = 0; index < translationAdditionalScopes.length; index += 1) {
              register(translationAdditionalScopes[index]);
            }
            register(typeof globalThis !== 'undefined' ? globalThis : null);
            register(typeof window !== 'undefined' ? window : null);
            register(typeof self !== 'undefined' ? self : null);
            register(typeof global !== 'undefined' ? global : null);
            return candidates;
          }
          function resolveTranslationDataset() {
            var scopeCandidates = collectTranslationScopeCandidates();
            for (var index = 0; index < scopeCandidates.length; index += 1) {
              var scope = scopeCandidates[index];
              if (!scope || _typeof(scope) !== 'object') {
                continue;
              }
              var dataset = scope.texts;
              if (dataset && _typeof(dataset) === 'object') {
                return dataset;
              }
            }
            var translationsRequirePath = typeof configuration.translationsRequirePath === 'string' && configuration.translationsRequirePath ? configuration.translationsRequirePath : './translations.js';
            if (typeof require === 'function') {
              try {
                var translationsModule = require(translationsRequirePath);
                if (translationsModule && _typeof(translationsModule) === 'object' && translationsModule.texts) {
                  return translationsModule.texts;
                }
              } catch (translationRequireError) {
                void translationRequireError;
              }
            }
            return {};
          }
          function fallbackGetLanguageTexts(lang) {
            var dataset = resolveTranslationDataset();
            var fallbackLang = typeof defaultLanguage === 'string' && defaultLanguage ? defaultLanguage : 'en';
            var normalised = normaliseLanguageInput(lang);
            var resolved = normalised && Object.prototype.hasOwnProperty.call(dataset, normalised) ? normalised : '';
            if (!resolved && normalised) {
              var base = normalised.split('-')[0];
              if (base && Object.prototype.hasOwnProperty.call(dataset, base)) {
                resolved = base;
              }
            }
            if (!resolved) {
              resolved = fallbackLang;
            }
            var candidate = dataset && resolved && _typeof(dataset[resolved]) === 'object' ? dataset[resolved] : null;
            if (candidate) {
              return candidate;
            }
            if (resolved !== fallbackLang) {
              var fallback = dataset && _typeof(dataset[fallbackLang]) === 'object' ? dataset[fallbackLang] : null;
              if (fallback) {
                return fallback;
              }
            }
            if (dataset && _typeof(dataset.en) === 'object') {
              return dataset.en;
            }
            var languages = dataset ? Object.keys(dataset) : [];
            if (languages.length) {
              var firstLang = languages[0];
              var firstTexts = dataset[firstLang];
              if (firstTexts && _typeof(firstTexts) === 'object') {
                return firstTexts;
              }
            }
            return {};
          }
          function resolveExistingGetLanguageTexts() {
            var scopeCandidates = collectTranslationScopeCandidates();
            for (var index = 0; index < scopeCandidates.length; index += 1) {
              var scope = scopeCandidates[index];
              if (!scope || _typeof(scope) !== 'object') {
                continue;
              }
              var helper = scope.getLanguageTexts;
              if (typeof helper === 'function') {
                return helper;
              }
            }
            return null;
          }
          var getLanguageTexts = function initialiseGetLanguageTexts() {
            var existing = resolveExistingGetLanguageTexts();
            if (existing) {
              return function getLanguageTextsProxy(lang) {
                try {
                  var result = existing.call(null, lang);
                  if (result && _typeof(result) === 'object') {
                    return result;
                  }
                } catch (existingError) {
                  if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
                    console.warn('Existing getLanguageTexts helper failed. Falling back to local resolution.', existingError);
                  }
                }
                return fallbackGetLanguageTexts(lang);
              };
            }
            return function getLanguageTextsFallback(lang) {
              return fallbackGetLanguageTexts(lang);
            };
          }();
          function ensureGlobalGetLanguageTextsAvailability() {
            var scopeCandidates = collectTranslationScopeCandidates();
            for (var index = 0; index < scopeCandidates.length; index += 1) {
              var scope = scopeCandidates[index];
              if (!scope || _typeof(scope) !== 'object') {
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
            localeModule: localeModule,
            defaultLanguage: defaultLanguage,
            rtlLanguageCodes: rtlLanguageCodes,
            normalizeLanguageCode: normalizeLanguageCode,
            isRtlLanguage: isRtlLanguage,
            resolveDocumentDirection: resolveDocumentDirection,
            applyLocaleMetadata: applyLocaleMetadata,
            getLanguageTexts: getLanguageTexts,
            fallbackNormalizeLanguageCode: fallbackNormalizeLanguageCode,
            fallbackIsRtlLanguage: fallbackIsRtlLanguage,
            fallbackResolveDocumentDirection: fallbackResolveDocumentDirection,
            fallbackApplyLocaleMetadata: fallbackApplyLocaleMetadata,
            resolveTranslationDataset: resolveTranslationDataset,
            ensureGlobalGetLanguageTextsAvailability: ensureGlobalGetLanguageTextsAvailability
          };
        }
        var namespace = {
          createLocalizationRuntime: createLocalizationRuntime
        };
        var globalScope = detectGlobalScope();
        var targetName = 'cineCoreRuntimeLocalization';
        var existing = globalScope && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
        var target = existing;
        for (var _i2 = 0, _Object$keys2 = Object.keys(namespace); _i2 < _Object$keys2.length; _i2++) {
          var key = _Object$keys2[_i2];
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
    'modules/core/runtime-scope-tools.js': function modules_core_runtimeScopeToolsJs(module, exports, require) {
      (function () {
        function isScopeCandidate(value) {
          return !!value && (_typeof(value) === 'object' || typeof value === 'function');
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
            if (typeof globalThis !== 'undefined' && isScopeCandidate(globalThis) && isScopeCandidate(globalThis.CORE_GLOBAL_SCOPE)) {
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
          var coreScope = readCoreGlobalScope();
          if (isScopeCandidate(coreScope)) {
            return coreScope;
          }
          return null;
        }
        function appendCandidate(target, candidate) {
          if (!isScopeCandidate(candidate)) {
            return;
          }
          for (var index = 0; index < target.length; index += 1) {
            if (target[index] === candidate) {
              return;
            }
          }
          target.push(candidate);
        }
        function readDefaultGlobalScopes() {
          var defaults = [];
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
          var settings = options && _typeof(options) === 'object' ? options : {};
          var primaryCandidate = settings.primaryCandidate,
            _settings$includeCore = settings.includeCoreGlobalScope,
            includeCoreGlobalScope = _settings$includeCore === void 0 ? true : _settings$includeCore,
            _settings$includeDefa = settings.includeDefaultGlobals,
            includeDefaultGlobals = _settings$includeDefa === void 0 ? true : _settings$includeDefa,
            _settings$extraCandid = settings.extraCandidates,
            extraCandidates = _settings$extraCandid === void 0 ? [] : _settings$extraCandid;
          var candidates = [];
          appendCandidate(candidates, typeof primaryCandidate === 'undefined' ? getPrimaryScopeCandidate() : primaryCandidate);
          if (includeCoreGlobalScope) {
            appendCandidate(candidates, readCoreGlobalScope());
          }
          if (includeDefaultGlobals) {
            var defaults = readDefaultGlobalScopes();
            for (var index = 0; index < defaults.length; index += 1) {
              appendCandidate(candidates, defaults[index]);
            }
          }
          var extras = Array.isArray(extraCandidates) ? extraCandidates : [extraCandidates];
          for (var _index = 0; _index < extras.length; _index += 1) {
            appendCandidate(candidates, extras[_index]);
          }
          return candidates;
        }
        function detectFirstAvailableScope(primaryCandidate, options) {
          var candidates = getScopeCandidates({
            primaryCandidate: primaryCandidate,
            includeCoreGlobalScope: true,
            includeDefaultGlobals: true,
            extraCandidates: options && options.extraCandidates
          });
          for (var index = 0; index < candidates.length; index += 1) {
            var candidate = candidates[index];
            if (isScopeCandidate(candidate)) {
              return candidate;
            }
          }
          return null;
        }
        function resolveAttachmentScope() {
          var candidates = getScopeCandidates({
            includeDefaultGlobals: true
          });
          for (var index = 0; index < candidates.length; index += 1) {
            var candidate = candidates[index];
            if (isScopeCandidate(candidate)) {
              return candidate;
            }
          }
          return null;
        }
        var namespace = {
          isScopeCandidate: isScopeCandidate,
          getPrimaryScopeCandidate: getPrimaryScopeCandidate,
          getScopeCandidates: getScopeCandidates,
          detectFirstAvailableScope: detectFirstAvailableScope
        };
        var attachmentScope = resolveAttachmentScope();
        var namespaceName = 'cineCoreRuntimeScopeTools';
        if (attachmentScope && _typeof(attachmentScope) === 'object') {
          var existing = attachmentScope[namespaceName] && _typeof(attachmentScope[namespaceName]) === 'object' ? attachmentScope[namespaceName] : {};
          for (var _i3 = 0, _Object$keys3 = Object.keys(namespace); _i3 < _Object$keys3.length; _i3++) {
            var key = _Object$keys3[_i3];
            existing[key] = namespace[key];
          }
          try {
            attachmentScope[namespaceName] = existing;
          } catch (attachError) {
            void attachError;
          }
        }
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = namespace;
        }
      })();
    },
    'modules/core/runtime-shared.js': function modules_core_runtimeSharedJs(module, exports, require) {
      (function () {
        function detectScope(primary) {
          if (primary && (_typeof(primary) === 'object' || typeof primary === 'function')) {
            return primary;
          }
          if (typeof globalThis !== 'undefined' && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
            return globalThis;
          }
          if (typeof window !== 'undefined' && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
            return window;
          }
          if (typeof self !== 'undefined' && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
            return self;
          }
          if (typeof global !== 'undefined' && global && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
            return global;
          }
          return null;
        }
        function registerCandidateScope(scopes, scope) {
          if (!Array.isArray(scopes)) {
            return;
          }
          if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
            return;
          }
          for (var index = 0; index < scopes.length; index += 1) {
            if (scopes[index] === scope) {
              return;
            }
          }
          scopes.push(scope);
        }
        function collectCandidateScopes(primaryScope, environmentHelpers) {
          var scopes = [];
          if (environmentHelpers && typeof environmentHelpers.fallbackCollectCandidateScopes === 'function') {
            try {
              var collected = environmentHelpers.fallbackCollectCandidateScopes(primaryScope);
              if (Array.isArray(collected)) {
                for (var collectedIndex = 0; collectedIndex < collected.length; collectedIndex += 1) {
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
          var detected = null;
          if (environmentHelpers && typeof environmentHelpers.fallbackDetectGlobalScope === 'function') {
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
          if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
            return null;
          }
          try {
            var candidate = scope.CORE_RUNTIME_CANDIDATE_SCOPES;
            return isScopeList(candidate) ? candidate : null;
          } catch (candidateLookupError) {
            void candidateLookupError;
          }
          return null;
        }
        var cachedCandidateScopes = null;
        function syncCandidateScopes(candidateScopes, primaryScope, environmentHelpers) {
          if (!isScopeList(candidateScopes)) {
            return candidateScopes;
          }
          cachedCandidateScopes = candidateScopes;
          var referenceScope = detectScope(primaryScope);
          var scopes = collectCandidateScopes(referenceScope, environmentHelpers);
          for (var index = 0; index < scopes.length; index += 1) {
            var scope = scopes[index];
            if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
          var referenceScope = detectScope(primaryScope);
          var existing = cachedCandidateScopes || readCandidateScopesFromScope(referenceScope);
          if (isScopeList(existing)) {
            return syncCandidateScopes(existing, referenceScope, environmentHelpers);
          }
          var candidateScopes = collectCandidateScopes(referenceScope, environmentHelpers);
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
          for (var index = 0; index < candidateScopes.length; index += 1) {
            registerScope(runtimeState, candidateScopes[index]);
          }
        }
        function getScopesSnapshot(runtimeState, candidateScopes) {
          if (runtimeState && typeof runtimeState.getScopes === 'function') {
            try {
              var runtimeScopes = runtimeState.getScopes();
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
              var primary = runtimeState.getPrimaryScope();
              if (primary && (_typeof(primary) === 'object' || typeof primary === 'function')) {
                return primary;
              }
            } catch (getPrimaryError) {
              void getPrimaryError;
            }
          }
          if (Array.isArray(candidateScopes)) {
            for (var index = 0; index < candidateScopes.length; index += 1) {
              var candidate = candidateScopes[index];
              if (candidate && (_typeof(candidate) === 'object' || typeof candidate === 'function')) {
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
          var scopes = Array.isArray(candidateScopes) ? candidateScopes : [];
          for (var index = 0; index < scopes.length; index += 1) {
            var scope = scopes[index];
            if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
          var fallbackProvider = typeof fallbackValue === 'function' ? fallbackValue : function provideStaticFallback() {
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
          var scopes = Array.isArray(candidateScopes) ? candidateScopes : [];
          for (var index = 0; index < scopes.length; index += 1) {
            var scope = scopes[index];
            if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
          var validate = typeof validator === 'function' ? validator : function alwaysValid() {
            return true;
          };
          var fallbackProvider = typeof fallbackValue === 'function' ? fallbackValue : function provideStaticFallback() {
            return fallbackValue;
          };
          var scopes = Array.isArray(candidateScopes) ? candidateScopes : [];
          for (var index = 0; index < scopes.length; index += 1) {
            var scope = scopes[index];
            if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
        var namespace = {
          collectCandidateScopes: collectCandidateScopes,
          resolveCandidateScopes: resolveCandidateScopes,
          syncCandidateScopes: syncCandidateScopes,
          registerScope: registerScope,
          registerScopes: registerScopes,
          getScopesSnapshot: getScopesSnapshot,
          ensurePrimaryScope: ensurePrimaryScope,
          assignTemperatureRenderer: assignTemperatureRenderer,
          readValue: readValue,
          ensureValue: ensureValue,
          normaliseValue: normaliseValue
        };
        var globalScope = detectScope();
        var targetName = 'cineCoreRuntimeShared';
        var existing = globalScope && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
        var target = existing;
        for (var _i4 = 0, _Object$keys4 = Object.keys(namespace); _i4 < _Object$keys4.length; _i4++) {
          var key = _Object$keys4[_i4];
          target[key] = namespace[key];
        }
        if (globalScope && _typeof(globalScope) === 'object') {
          try {
            globalScope[targetName] = target;
          } catch (assignError) {
            void assignError;
          }
        }
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = target;
        }
      })();
    },
    'modules/core/runtime-support-bootstrap.js': function modules_core_runtimeSupportBootstrapJs(module, exports, require) {
      (function () {
        function isObject(value) {
          return !!value && (_typeof(value) === 'object' || typeof value === 'function');
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
            var candidate = candidateScope[namespaceName];
            return isObject(candidate) ? candidate : null;
          } catch (resolutionLookupError) {
            void resolutionLookupError;
          }
          return null;
        }
        function loadRuntimeSupportResolution(primaryScope) {
          var namespaceName = 'cineCoreRuntimeSupportResolution';
          var candidates = [primaryScope, detectGlobalScope(), typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
          for (var index = 0; index < candidates.length; index += 1) {
            var resolution = readResolutionFromScope(namespaceName, candidates[index]);
            if (resolution) {
              return resolution;
            }
          }
          if (typeof require === 'function') {
            try {
              var required = require('./runtime-support-resolution.js');
              if (isObject(required)) {
                return required;
              }
            } catch (runtimeSupportResolutionRequireError) {
              void runtimeSupportResolutionRequireError;
            }
          }
          for (var _index2 = 0; _index2 < candidates.length; _index2 += 1) {
            var _resolution = readResolutionFromScope(namespaceName, candidates[_index2]);
            if (_resolution) {
              return _resolution;
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
          if (isObject(resolution) && typeof resolution.fallbackResolveCoreSupportModule === 'function') {
            return resolution.fallbackResolveCoreSupportModule;
          }
          return function fallbackResolveCoreSupportModule(namespaceName, requirePath, primaryScope) {
            if (typeof namespaceName !== 'string' || !namespaceName) {
              return null;
            }
            var runtimeScope = detectRuntimeScope(primaryScope);
            if (isObject(runtimeScope) && isObject(runtimeScope[namespaceName])) {
              return runtimeScope[namespaceName];
            }
            if (typeof require === 'function' && typeof requirePath === 'string' && requirePath) {
              try {
                var required = require(requirePath);
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
          var runtimeSupportResolution = loadRuntimeSupportResolution(primaryScope);
          var fallbackDetect = ensureFallbackDetectRuntimeScope(runtimeSupportResolution);
          var fallbackResolve = ensureFallbackResolveCoreSupportModule(runtimeSupportResolution, fallbackDetect);
          var runtimeSupportResolverTools = isObject(runtimeSupportResolution) && typeof runtimeSupportResolution.readRuntimeSupportResolver === 'function' ? runtimeSupportResolution.readRuntimeSupportResolver(primaryScope) : null;
          var runtimeSupportResolver = isObject(runtimeSupportResolution) && typeof runtimeSupportResolution.ensureCoreSupportResolver === 'function' ? runtimeSupportResolution.ensureCoreSupportResolver(primaryScope) : null;
          var detectRuntimeScope = isObject(runtimeSupportResolverTools) && typeof runtimeSupportResolverTools.detectRuntimeScope === 'function' ? runtimeSupportResolverTools.detectRuntimeScope : fallbackDetect;
          var resolveCoreSupportModule = isObject(runtimeSupportResolverTools) && typeof runtimeSupportResolverTools.resolveCoreSupportModule === 'function' ? runtimeSupportResolverTools.resolveCoreSupportModule : fallbackResolve;
          return {
            runtimeSupportResolution: runtimeSupportResolution,
            runtimeSupportResolverTools: runtimeSupportResolverTools,
            runtimeSupportResolver: runtimeSupportResolver,
            fallbackDetectRuntimeScope: fallbackDetect,
            fallbackResolveCoreSupportModule: fallbackResolve,
            detectRuntimeScope: detectRuntimeScope,
            resolveCoreSupportModule: resolveCoreSupportModule
          };
        }
        function resolveBootstrap(primaryScope) {
          var tools = readRuntimeSupportTools(primaryScope);
          var detectRuntimeScope = function detectScope(candidateScope) {
            return tools.detectRuntimeScope(candidateScope);
          };
          var runtimeScope = detectRuntimeScope(primaryScope);
          function resolveCoreSupportModule(namespaceName, requirePath, candidateScope) {
            var scope = typeof candidateScope === 'undefined' ? runtimeScope : detectRuntimeScope(candidateScope);
            return tools.resolveCoreSupportModule(namespaceName, requirePath, scope);
          }
          function fallbackResolveCoreSupportModule(namespaceName, requirePath, candidateScope) {
            var scope = typeof candidateScope === 'undefined' ? runtimeScope : detectRuntimeScope(candidateScope);
            return tools.fallbackResolveCoreSupportModule(namespaceName, requirePath, scope);
          }
          return Object.freeze({
            runtimeSupportResolution: tools.runtimeSupportResolution,
            runtimeSupportResolverTools: tools.runtimeSupportResolverTools,
            runtimeSupportResolver: tools.runtimeSupportResolver,
            runtimeScope: runtimeScope,
            detectRuntimeScope: detectRuntimeScope,
            resolveCoreSupportModule: resolveCoreSupportModule,
            fallbackDetectRuntimeScope: tools.fallbackDetectRuntimeScope,
            fallbackResolveCoreSupportModule: fallbackResolveCoreSupportModule
          });
        }
        var namespace = {
          detectGlobalScope: detectGlobalScope,
          loadRuntimeSupportResolution: loadRuntimeSupportResolution,
          readRuntimeSupportTools: readRuntimeSupportTools,
          resolveBootstrap: resolveBootstrap
        };
        var globalScope = detectGlobalScope();
        var targetName = 'cineCoreRuntimeSupportBootstrap';
        var existing = isObject(globalScope) && isObject(globalScope[targetName]) ? globalScope[targetName] : {};
        var target = existing;
        for (var _i5 = 0, _Object$keys5 = Object.keys(namespace); _i5 < _Object$keys5.length; _i5++) {
          var key = _Object$keys5[_i5];
          target[key] = namespace[key];
        }
        if (isObject(globalScope)) {
          try {
            globalScope[targetName] = target;
          } catch (assignError) {
            void assignError;
          }
        }
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = target;
        }
      })();
    },
    'modules/core/runtime-support-defaults.js': function modules_core_runtimeSupportDefaultsJs(module, exports, require) {
      (function () {
        function isScopeCandidate(value) {
          return !!value && (_typeof(value) === 'object' || typeof value === 'function');
        }
        function getRuntimeScopeCandidates(primaryScope) {
          var candidates = [];
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
          var resolved = [];
          for (var index = 0; index < candidates.length; index += 1) {
            var candidate = candidates[index];
            if (isScopeCandidate(candidate)) {
              var alreadyPresent = false;
              for (var compareIndex = 0; compareIndex < resolved.length; compareIndex += 1) {
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
          var candidates = getRuntimeScopeCandidates(primaryScope);
          for (var index = 0; index < candidates.length; index += 1) {
            var candidate = candidates[index];
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
          var runtimeScope = fallbackDetectRuntimeScope(primaryScope);
          if (runtimeScope && runtimeScope[namespaceName] && _typeof(runtimeScope[namespaceName]) === 'object') {
            return runtimeScope[namespaceName];
          }
          if (typeof require === 'function' && typeof requirePath === 'string' && requirePath) {
            try {
              var required = require(requirePath);
              if (required && _typeof(required) === 'object') {
                return required;
              }
            } catch (supportModuleError) {
              void supportModuleError;
            }
          }
          return null;
        }
        function readRuntimeSupportResolver(primaryScope) {
          var runtimeScope = fallbackDetectRuntimeScope(primaryScope);
          function detectRuntimeScope(scopeCandidate) {
            return fallbackDetectRuntimeScope(isScopeCandidate(scopeCandidate) ? scopeCandidate : runtimeScope);
          }
          function resolveCoreSupportModule(namespaceName, requirePath, scopeCandidate) {
            var candidateScope = isScopeCandidate(scopeCandidate) ? scopeCandidate : runtimeScope;
            return fallbackResolveCoreSupportModule(namespaceName, requirePath, candidateScope);
          }
          return Object.freeze({
            detectRuntimeScope: detectRuntimeScope,
            resolveCoreSupportModule: resolveCoreSupportModule
          });
        }
        var namespace = {
          fallbackDetectRuntimeScope: fallbackDetectRuntimeScope,
          fallbackResolveCoreSupportModule: fallbackResolveCoreSupportModule,
          readRuntimeSupportResolver: readRuntimeSupportResolver,
          getRuntimeScopeCandidates: getRuntimeScopeCandidates
        };
        var namespaceName = 'cineCoreRuntimeSupportDefaults';
        var attachmentCandidates = getRuntimeScopeCandidates();
        for (var index = 0; index < attachmentCandidates.length; index += 1) {
          var scope = attachmentCandidates[index];
          if (!isScopeCandidate(scope)) {
            continue;
          }
          var existing = scope[namespaceName] && _typeof(scope[namespaceName]) === 'object' ? scope[namespaceName] : {};
          for (var _i6 = 0, _Object$keys6 = Object.keys(namespace); _i6 < _Object$keys6.length; _i6++) {
            var key = _Object$keys6[_i6];
            existing[key] = namespace[key];
          }
          try {
            scope[namespaceName] = existing;
          } catch (assignError) {
            void assignError;
          }
        }
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = namespace;
        }
      })();
    },
    'modules/core/runtime-support-resolution.js': function modules_core_runtimeSupportResolutionJs(module, exports, require) {
      (function () {
        function fallbackDetectRuntimeScope(primaryScope) {
          if (primaryScope && (_typeof(primaryScope) === 'object' || typeof primaryScope === 'function')) {
            return primaryScope;
          }
          if (typeof globalThis !== 'undefined' && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' && globalThis) {
            return globalThis;
          }
          if (typeof window !== 'undefined' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window) {
            return window;
          }
          if (typeof self !== 'undefined' && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' && self) {
            return self;
          }
          if (typeof global !== 'undefined' && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' && global) {
            return global;
          }
          return null;
        }
        function fallbackResolveCoreSupportModule(namespaceName, requirePath, primaryScope) {
          if (typeof namespaceName !== 'string' || !namespaceName) {
            return null;
          }
          var runtimeScope = fallbackDetectRuntimeScope(primaryScope);
          if (runtimeScope && runtimeScope[namespaceName] && _typeof(runtimeScope[namespaceName]) === 'object') {
            return runtimeScope[namespaceName];
          }
          if (typeof require === 'function' && typeof requirePath === 'string' && requirePath) {
            try {
              var required = require(requirePath);
              if (required && _typeof(required) === 'object') {
                return required;
              }
            } catch (supportModuleError) {
              void supportModuleError;
            }
          }
          return null;
        }
        function ensureCoreSupportResolver(primaryScope) {
          var namespaceName = 'cineCoreSupportResolver';
          function readFromScope(candidateScope) {
            if (!candidateScope || _typeof(candidateScope) !== 'object' && typeof candidateScope !== 'function') {
              return null;
            }
            try {
              var resolver = candidateScope[namespaceName];
              return resolver && _typeof(resolver) === 'object' ? resolver : null;
            } catch (resolverLookupError) {
              void resolverLookupError;
            }
            return null;
          }
          var runtimeScope = fallbackDetectRuntimeScope(primaryScope);
          var candidates = [primaryScope, runtimeScope, typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
          for (var index = 0; index < candidates.length; index += 1) {
            var resolver = readFromScope(candidates[index]);
            if (resolver) {
              return resolver;
            }
          }
          if (typeof require === 'function') {
            try {
              var requiredResolver = require('./support-resolver.js');
              if (requiredResolver && _typeof(requiredResolver) === 'object') {
                return requiredResolver;
              }
            } catch (supportResolverRequireError) {
              void supportResolverRequireError;
            }
          }
          for (var _index3 = 0; _index3 < candidates.length; _index3 += 1) {
            var _resolver = readFromScope(candidates[_index3]);
            if (_resolver) {
              return _resolver;
            }
          }
          return null;
        }
        function readRuntimeSupportResolver(primaryScope) {
          var resolver = ensureCoreSupportResolver(primaryScope);
          if (resolver && _typeof(resolver) === 'object') {
            var detect = typeof resolver.detectRuntimeScope === 'function' ? resolver.detectRuntimeScope : fallbackDetectRuntimeScope;
            var resolve = typeof resolver.resolveCoreSupportModule === 'function' ? resolver.resolveCoreSupportModule : fallbackResolveCoreSupportModule;
            return Object.freeze({
              detectRuntimeScope: detect,
              resolveCoreSupportModule: resolve
            });
          }
          return Object.freeze({
            detectRuntimeScope: fallbackDetectRuntimeScope,
            resolveCoreSupportModule: fallbackResolveCoreSupportModule
          });
        }
        var api = {
          fallbackDetectRuntimeScope: fallbackDetectRuntimeScope,
          fallbackResolveCoreSupportModule: fallbackResolveCoreSupportModule,
          ensureCoreSupportResolver: ensureCoreSupportResolver,
          readRuntimeSupportResolver: readRuntimeSupportResolver
        };
        var globalScope = fallbackDetectRuntimeScope();
        var targetName = 'cineCoreRuntimeSupportResolution';
        var existing = globalScope && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
        var target = existing;
        for (var _i7 = 0, _Object$keys7 = Object.keys(api); _i7 < _Object$keys7.length; _i7++) {
          var key = _Object$keys7[_i7];
          target[key] = api[key];
        }
        if (globalScope && _typeof(globalScope) === 'object') {
          try {
            globalScope[targetName] = target;
          } catch (assignError) {
            void assignError;
          }
        }
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = target;
        }
      })();
    },
    'modules/core/runtime-tool-fallbacks.js': function modules_core_runtimeToolFallbacksJs(module, exports, require) {
      (function () {
        function isValidScope(scope) {
          return !!scope && (_typeof(scope) === 'object' || typeof scope === 'function');
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
          var provider = typeof fallbackValue === 'function' ? fallbackValue : function provideStaticFallback() {
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
          var scope = detectScope(primary);
          if (!isValidScope(scope)) {
            return provider();
          }
          var existing;
          try {
            existing = scope[name];
          } catch (readError) {
            existing = undefined;
            void readError;
          }
          if (typeof existing !== 'undefined') {
            return existing;
          }
          var value = provider();
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
              value: value
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
          if (value === null || _typeof(value) !== 'object') {
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
          var scope = detectScope(primary);
          if (scope && typeof scope.structuredClone === 'function') {
            try {
              return scope.structuredClone.bind(scope);
            } catch (bindError) {
              void bindError;
            }
          }
          if (typeof require === 'function') {
            try {
              var nodeUtil = require('node:util');
              if (nodeUtil && typeof nodeUtil.structuredClone === 'function') {
                return nodeUtil.structuredClone.bind(nodeUtil);
              }
            } catch (nodeUtilError) {
              void nodeUtilError;
            }
            try {
              var legacyUtil = require('util');
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
          var structuredCloneImpl = resolveStructuredClone(primary);
          if (!structuredCloneImpl) {
            return jsonDeepClone;
          }
          return function resilientDeepClone(value) {
            if (value === null || _typeof(value) !== 'object') {
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
          var scope = detectScope(primary);
          if (scope && typeof scope.__cineDeepClone === 'function') {
            return scope.__cineDeepClone;
          }
          var clone = createResilientDeepClone(scope);
          if (isValidScope(scope)) {
            try {
              Object.defineProperty(scope, '__cineDeepClone', {
                configurable: true,
                writable: true,
                value: clone
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
          var resolvedScope = detectScope(primary);
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
            getCoreGlobalObject: getCoreGlobalObject,
            ensureCoreGlobalValue: ensureCoreGlobalValue,
            jsonDeepClone: jsonDeepClone,
            resolveStructuredClone: resolveStructuredCloneForScope,
            createResilientDeepClone: createResilientDeepCloneForScope,
            ensureDeepClone: ensureDeepCloneForScope
          };
        }
        var namespace = {
          detectScope: detectScope,
          ensureGlobalValue: ensureGlobalValue,
          jsonDeepClone: jsonDeepClone,
          resolveStructuredClone: resolveStructuredClone,
          createResilientDeepClone: createResilientDeepClone,
          ensureDeepClone: ensureDeepClone,
          createRuntimeToolFallbacks: createRuntimeToolFallbacks
        };
        var globalScope = detectScope();
        var targetName = 'cineCoreRuntimeToolFallbacks';
        var existing = globalScope && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
        for (var _i8 = 0, _Object$keys8 = Object.keys(namespace); _i8 < _Object$keys8.length; _i8++) {
          var key = _Object$keys8[_i8];
          existing[key] = namespace[key];
        }
        if (globalScope && _typeof(globalScope) === 'object') {
          try {
            globalScope[targetName] = existing;
          } catch (assignError) {
            void assignError;
          }
        }
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = existing;
        }
      })();
    },
    'modules/core/runtime-tools.js': function modules_core_runtimeToolsJs(module, exports, require) {
      (function () {
        function detectGlobalScope() {
          if (typeof globalThis !== 'undefined' && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
            return globalThis;
          }
          if (typeof window !== 'undefined' && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
            return window;
          }
          if (typeof self !== 'undefined' && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
            return self;
          }
          if (typeof global !== 'undefined' && global && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
            return global;
          }
          return null;
        }
        function collectEnvironmentHelperScopes(primary) {
          var scopes = [];
          function registerScope(scope) {
            if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
        var CORE_GLOBAL_SCOPE = detectGlobalScope();
        function resolveEnvironmentHelpers() {
          var helpers = null;
          if (typeof cineRuntimeEnvironmentHelpers !== 'undefined' && cineRuntimeEnvironmentHelpers && (typeof cineRuntimeEnvironmentHelpers === "undefined" ? "undefined" : _typeof(cineRuntimeEnvironmentHelpers)) === 'object') {
            helpers = cineRuntimeEnvironmentHelpers;
          }
          if (!helpers && typeof require === 'function') {
            try {
              var requiredHelpers = require('../runtime-environment-helpers.js');
              if (requiredHelpers && _typeof(requiredHelpers) === 'object') {
                helpers = requiredHelpers;
              }
            } catch (helpersRequireError) {
              void helpersRequireError;
            }
          }
          if (helpers) {
            return helpers;
          }
          var candidateScopes = collectEnvironmentHelperScopes(CORE_GLOBAL_SCOPE);
          for (var index = 0; index < candidateScopes.length; index += 1) {
            var candidate = candidateScopes[index];
            try {
              var candidateHelpers = candidate && candidate.cineRuntimeEnvironmentHelpers;
              if (candidateHelpers && _typeof(candidateHelpers) === 'object') {
                return candidateHelpers;
              }
            } catch (candidateLookupError) {
              void candidateLookupError;
            }
          }
          return null;
        }
        var CORE_ENVIRONMENT_HELPERS = resolveEnvironmentHelpers();
        function detectScope(primary) {
          if (primary && (_typeof(primary) === 'object' || typeof primary === 'function')) {
            return primary;
          }
          var detected = null;
          if (CORE_ENVIRONMENT_HELPERS && typeof CORE_ENVIRONMENT_HELPERS.fallbackDetectGlobalScope === 'function') {
            try {
              detected = CORE_ENVIRONMENT_HELPERS.fallbackDetectGlobalScope();
            } catch (detectScopeError) {
              void detectScopeError;
              detected = null;
            }
          }
          if (detected && (_typeof(detected) === 'object' || typeof detected === 'function')) {
            return detected;
          }
          var fallbackScope = CORE_GLOBAL_SCOPE || detectGlobalScope();
          if (fallbackScope && (_typeof(fallbackScope) === 'object' || typeof fallbackScope === 'function')) {
            return fallbackScope;
          }
          return null;
        }
        function jsonDeepClone(value) {
          if (value === null || _typeof(value) !== 'object') {
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
          var scope = detectScope(primary);
          if (scope && typeof scope.structuredClone === 'function') {
            try {
              return scope.structuredClone.bind(scope);
            } catch (bindError) {
              void bindError;
            }
          }
          if (typeof require === 'function') {
            try {
              var nodeUtil = require('node:util');
              if (nodeUtil && typeof nodeUtil.structuredClone === 'function') {
                return nodeUtil.structuredClone.bind(nodeUtil);
              }
            } catch (nodeUtilError) {
              void nodeUtilError;
            }
            try {
              var legacyUtil = require('util');
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
          var structuredCloneImpl = resolveStructuredClone(primary);
          if (!structuredCloneImpl) {
            return jsonDeepClone;
          }
          return function resilientDeepClone(value) {
            if (value === null || _typeof(value) !== 'object') {
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
          var fallbackProvider = typeof fallbackValue === 'function' ? fallbackValue : function provideStaticFallback() {
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
          var scope = detectScope(primary);
          if (!scope || _typeof(scope) !== 'object') {
            return fallbackProvider();
          }
          var existing;
          try {
            existing = scope[name];
          } catch (readError) {
            existing = undefined;
            void readError;
          }
          if (typeof existing !== 'undefined') {
            return existing;
          }
          var value = fallbackProvider();
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
              value: value
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
          var scope = detectScope(primary);
          if (scope && typeof scope.__cineDeepClone === 'function') {
            return scope.__cineDeepClone;
          }
          var clone = createResilientDeepClone(scope);
          if (scope && _typeof(scope) === 'object') {
            try {
              Object.defineProperty(scope, '__cineDeepClone', {
                configurable: true,
                writable: true,
                value: clone
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
        var namespace = {
          detectScope: detectScope,
          jsonDeepClone: jsonDeepClone,
          resolveStructuredClone: resolveStructuredClone,
          createResilientDeepClone: createResilientDeepClone,
          ensureGlobalValue: ensureGlobalValue,
          ensureDeepClone: ensureDeepClone
        };
        var globalScope = detectScope();
        var targetName = 'cineCoreRuntimeTools';
        var existing = globalScope && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
        var target = existing;
        for (var _i9 = 0, _Object$keys9 = Object.keys(namespace); _i9 < _Object$keys9.length; _i9++) {
          var key = _Object$keys9[_i9];
          target[key] = namespace[key];
        }
        if (globalScope && _typeof(globalScope) === 'object') {
          try {
            globalScope[targetName] = target;
          } catch (assignError) {
            void assignError;
          }
        }
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = target;
        }
      })();
    },
    'modules/core/runtime-state.js': function modules_core_runtimeStateJs(module, exports, require) {
      (function () {
        var REGISTRY_NAME = 'cineCoreRuntimeStateModules';
        function detectAmbientScope() {
          if (typeof globalThis !== 'undefined' && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
            return globalThis;
          }
          if (typeof window !== 'undefined' && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
            return window;
          }
          if (typeof self !== 'undefined' && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
            return self;
          }
          if (typeof global !== 'undefined' && global && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
            return global;
          }
          return null;
        }
        function fallbackDetectScope(primary) {
          if (primary && (_typeof(primary) === 'object' || typeof primary === 'function')) {
            return primary;
          }
          return detectAmbientScope();
        }
        function fallbackHasArrayEntry(array, value) {
          if (!Array.isArray(array)) {
            return false;
          }
          for (var index = 0; index < array.length; index += 1) {
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
          var registry = typeof WeakSet === 'function' ? new WeakSet() : [];
          if (Array.isArray(initialValues)) {
            for (var index = 0; index < initialValues.length; index += 1) {
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
          var defaults = {
            queueKey: '__cinePendingTemperatureNote',
            renderName: 'renderTemperatureNote'
          };
          var scope = fallbackDetectScope();
          if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
          var resolveTemperatureKeys = typeof temperatureResolver === 'function' ? temperatureResolver : fallbackResolveTemperatureKeyDefaults;
          var configuration = options && _typeof(options) === 'object' ? options : {};
          var resolvedTemperatureKeys = resolveTemperatureKeys();
          var temperatureQueueKey = typeof configuration.temperatureQueueKey === 'string' ? configuration.temperatureQueueKey : resolvedTemperatureKeys.queueKey;
          var temperatureRenderName = typeof configuration.temperatureRenderName === 'string' ? configuration.temperatureRenderName : resolvedTemperatureKeys.renderName;
          var scopes = [];
          var seenScopes = typeof Set === 'function' ? new Set() : null;
          function registerScope(scope) {
            if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
            for (var initialIndex = 0; initialIndex < candidateScopes.length; initialIndex += 1) {
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
            for (var index = 0; index < scopes.length; index += 1) {
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
            var fallbackProvider = typeof fallbackValue === 'function' ? fallbackValue : function provideStaticFallback() {
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
            for (var scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
              var scope = scopes[scopeIndex];
              if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
            var fallbackProvider = typeof fallbackValue === 'function' ? fallbackValue : function provideStaticFallback() {
              return fallbackValue;
            };
            var validate = typeof validator === 'function' ? validator : function alwaysValid() {
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
            for (var scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
              var scope = scopes[scopeIndex];
              if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
          var assignedTemperatureRenderer = null;
          function assignTemperatureRenderer(renderer) {
            if (typeof renderer !== 'function') {
              return;
            }
            assignedTemperatureRenderer = renderer;
            withEachScope(function applyRenderer(scope) {
              if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
                return;
              }
              try {
                scope[temperatureRenderName] = renderer;
                var pending = scope[temperatureQueueKey];
                if (pending && _typeof(pending) === 'object') {
                  if (Object.prototype.hasOwnProperty.call(pending, 'latestHours')) {
                    var hours = pending.latestHours;
                    if (typeof hours !== 'undefined') {
                      try {
                        renderer(hours);
                      } catch (temperatureRenderError) {
                        if (typeof console !== 'undefined' && typeof console.error === 'function') {
                          console.error('Failed to apply pending temperature note render', temperatureRenderError);
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
          var autoGearGuards = {
            isReferenceError: function defaultAutoGearReferenceGuard() {
              return false;
            },
            repair: function defaultAutoGearRepair() {
              return undefined;
            }
          };
          function setAutoGearGuards(nextGuards) {
            if (!nextGuards || _typeof(nextGuards) !== 'object') {
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
            registerScope: registerScope,
            withEachScope: withEachScope,
            getScopes: getScopes,
            getPrimaryScope: getPrimaryScope,
            ensureValue: ensureValue,
            normaliseValue: normaliseValue,
            readValue: readValue,
            assignTemperatureRenderer: assignTemperatureRenderer,
            getAssignedTemperatureRenderer: getAssignedTemperatureRenderer,
            autoGearGuards: autoGearGuards,
            setAutoGearGuards: setAutoGearGuards
          };
        }
        function loadModuleFromRegistry(name) {
          var scope = detectAmbientScope();
          if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
            return null;
          }
          try {
            var registry = scope[REGISTRY_NAME];
            if (registry && _typeof(registry) === 'object') {
              var _module = registry[name];
              if (_module && _typeof(_module) === 'object') {
                return _module;
              }
            }
          } catch (registryLookupError) {
            void registryLookupError;
          }
          return null;
        }
        function loadModule(name, requirePath) {
          var resolved = null;
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
        var scopeUtilsModule = loadModule('scopeUtils', './runtime-state/scope-utils.js') || {};
        var safeFreezeModule = loadModule('safeFreezeRegistry', './runtime-state/safe-freeze-registry.js') || {};
        var temperatureKeysModule = loadModule('temperatureKeys', './runtime-state/temperature-keys.js') || {};
        var localRuntimeStateModule = loadModule('localRuntimeState', './runtime-state/local-runtime-state.js') || {};
        var detectScope = typeof scopeUtilsModule.detectScope === 'function' ? scopeUtilsModule.detectScope : fallbackDetectScope;
        var registerSafeFreezeEntry = typeof safeFreezeModule.registerSafeFreezeEntry === 'function' ? safeFreezeModule.registerSafeFreezeEntry : fallbackRegisterSafeFreezeEntry;
        var createSafeFreezeRegistry = typeof safeFreezeModule.createSafeFreezeRegistry === 'function' ? safeFreezeModule.createSafeFreezeRegistry : fallbackCreateSafeFreezeRegistry;
        var ensureSafeFreezeRegistry = typeof safeFreezeModule.ensureSafeFreezeRegistry === 'function' ? safeFreezeModule.ensureSafeFreezeRegistry : fallbackEnsureSafeFreezeRegistry;
        var hasSafeFreezeEntry = typeof safeFreezeModule.hasSafeFreezeEntry === 'function' ? safeFreezeModule.hasSafeFreezeEntry : fallbackHasSafeFreezeEntry;
        var resolveTemperatureKeyDefaults = typeof temperatureKeysModule.resolveTemperatureKeyDefaults === 'function' ? temperatureKeysModule.resolveTemperatureKeyDefaults : fallbackResolveTemperatureKeyDefaults;
        var createLocalRuntimeState = typeof localRuntimeStateModule.createLocalRuntimeState === 'function' ? localRuntimeStateModule.createLocalRuntimeState : function fallbackCreateLocalRuntimeStateWrapper(candidateScopes, options) {
          return fallbackCreateLocalRuntimeState(candidateScopes, options, resolveTemperatureKeyDefaults);
        };
        var namespace = {
          detectScope: detectScope,
          createSafeFreezeRegistry: createSafeFreezeRegistry,
          ensureSafeFreezeRegistry: ensureSafeFreezeRegistry,
          hasSafeFreezeEntry: hasSafeFreezeEntry,
          registerSafeFreezeEntry: registerSafeFreezeEntry,
          resolveTemperatureKeyDefaults: resolveTemperatureKeyDefaults,
          createLocalRuntimeState: createLocalRuntimeState
        };
        var globalScope = detectScope();
        var targetName = 'cineCoreRuntimeState';
        var existing = globalScope && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
        var target = existing;
        for (var _i0 = 0, _Object$keys0 = Object.keys(namespace); _i0 < _Object$keys0.length; _i0++) {
          var key = _Object$keys0[_i0];
          target[key] = namespace[key];
        }
        if (globalScope && _typeof(globalScope) === 'object') {
          try {
            globalScope[targetName] = target;
          } catch (assignError) {
            void assignError;
          }
        }
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = target;
        }
      })();
    },
    'modules/core/runtime-state/local-runtime-state.js': function modules_core_runtimeState_localRuntimeStateJs(module, exports, require) {
      (function () {
        function detectAmbientScope() {
          if (typeof globalThis !== 'undefined' && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
            return globalThis;
          }
          if (typeof window !== 'undefined' && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
            return window;
          }
          if (typeof self !== 'undefined' && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
            return self;
          }
          if (typeof global !== 'undefined' && global && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
            return global;
          }
          return null;
        }
        function fallbackDetectScope(primary) {
          if (primary && (_typeof(primary) === 'object' || typeof primary === 'function')) {
            return primary;
          }
          return detectAmbientScope();
        }
        function resolveScopeUtils() {
          var scopeUtils = null;
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
          var scope = detectAmbientScope();
          if (scope && _typeof(scope) === 'object') {
            try {
              var registry = scope.cineCoreRuntimeStateModules;
              if (registry && _typeof(registry) === 'object' && registry.scopeUtils) {
                return registry.scopeUtils;
              }
            } catch (scopeLookupError) {
              void scopeLookupError;
            }
          }
          return null;
        }
        var scopeUtils = resolveScopeUtils();
        var detectScope = scopeUtils && typeof scopeUtils.detectScope === 'function' ? scopeUtils.detectScope : fallbackDetectScope;
        function resolveTemperatureKeysModule() {
          var temperatureKeys = null;
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
          var scope = detectAmbientScope();
          if (scope && _typeof(scope) === 'object') {
            try {
              var registry = scope.cineCoreRuntimeStateModules;
              if (registry && _typeof(registry) === 'object' && registry.temperatureKeys) {
                return registry.temperatureKeys;
              }
            } catch (scopeLookupError) {
              void scopeLookupError;
            }
          }
          return null;
        }
        var temperatureKeysModule = resolveTemperatureKeysModule();
        var resolveTemperatureKeyDefaults = temperatureKeysModule && typeof temperatureKeysModule.resolveTemperatureKeyDefaults === 'function' ? temperatureKeysModule.resolveTemperatureKeyDefaults : function fallbackResolveTemperatureKeyDefaults() {
          var defaults = {
            queueKey: '__cinePendingTemperatureNote',
            renderName: 'renderTemperatureNote'
          };
          var scope = detectScope();
          if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
          var configuration = options && _typeof(options) === 'object' ? options : {};
          var resolvedTemperatureKeys = resolveTemperatureKeyDefaults();
          var temperatureQueueKey = typeof configuration.temperatureQueueKey === 'string' ? configuration.temperatureQueueKey : resolvedTemperatureKeys.queueKey;
          // Prevent prototype pollution keys for temperatureQueueKey
          var pollutedKeys = ['__proto__', 'prototype', 'constructor'];
          if (pollutedKeys.indexOf(temperatureQueueKey) !== -1) {
            throw new Error("Unsafe key for temperatureQueueKey: " + temperatureQueueKey);
          }
          var temperatureRenderName = typeof configuration.temperatureRenderName === 'string' ? configuration.temperatureRenderName : resolvedTemperatureKeys.renderName;
          var scopes = [];
          var seenScopes = typeof Set === 'function' ? new Set() : null;
          function registerScope(scope) {
            if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
            for (var initialIndex = 0; initialIndex < candidateScopes.length; initialIndex += 1) {
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
            for (var index = 0; index < scopes.length; index += 1) {
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
            var fallbackProvider = typeof fallbackValue === 'function' ? fallbackValue : function provideStaticFallback() {
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
            for (var scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
              var scope = scopes[scopeIndex];
              if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
            var fallbackProvider = typeof fallbackValue === 'function' ? fallbackValue : function provideStaticFallback() {
              return fallbackValue;
            };
            var validate = typeof validator === 'function' ? validator : function alwaysValid() {
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
            for (var scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
              var scope = scopes[scopeIndex];
              if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
          var assignedTemperatureRenderer = null;
          function assignTemperatureRenderer(renderer) {
            if (typeof renderer !== 'function') {
              return;
            }
            assignedTemperatureRenderer = renderer;
            withEachScope(function applyRenderer(scope) {
              if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
                return;
              }
              // Defensive: refuse to operate if temperatureQueueKey is a polluted key
              var pollutedKeys = ['__proto__', 'prototype', 'constructor'];
              if (pollutedKeys.indexOf(temperatureQueueKey) !== -1) {
                return;
              }
              try {
                scope[temperatureRenderName] = renderer;
                var pending = scope[temperatureQueueKey];
                if (pending && _typeof(pending) === 'object') {
                  if (Object.prototype.hasOwnProperty.call(pending, 'latestHours')) {
                    var hours = pending.latestHours;
                    if (typeof hours !== 'undefined') {
                      try {
                        renderer(hours);
                      } catch (temperatureRenderError) {
                        if (typeof console !== 'undefined' && typeof console.error === 'function') {
                          console.error('Failed to apply pending temperature note render', temperatureRenderError);
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
          var autoGearGuards = {
            isReferenceError: function defaultAutoGearReferenceGuard() {
              return false;
            },
            repair: function defaultAutoGearRepair() {
              return undefined;
            }
          };
          function setAutoGearGuards(nextGuards) {
            if (!nextGuards || _typeof(nextGuards) !== 'object') {
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
            registerScope: registerScope,
            withEachScope: withEachScope,
            getScopes: getScopes,
            getPrimaryScope: getPrimaryScope,
            ensureValue: ensureValue,
            normaliseValue: normaliseValue,
            readValue: readValue,
            assignTemperatureRenderer: assignTemperatureRenderer,
            getAssignedTemperatureRenderer: getAssignedTemperatureRenderer,
            autoGearGuards: autoGearGuards,
            setAutoGearGuards: setAutoGearGuards
          };
        }
        function assignToGlobal(namespace) {
          var scope = detectAmbientScope();
          if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
            return;
          }
          var registryName = 'cineCoreRuntimeStateModules';
          var existing = scope[registryName] && _typeof(scope[registryName]) === 'object' ? scope[registryName] : {};
          existing.localRuntimeState = namespace;
          try {
            scope[registryName] = existing;
          } catch (assignError) {
            void assignError;
          }
        }
        var namespace = {
          createLocalRuntimeState: createLocalRuntimeState
        };
        assignToGlobal(namespace);
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = namespace;
        }
      })();
    },
    'modules/core/runtime-state/safe-freeze-registry.js': function modules_core_runtimeState_safeFreezeRegistryJs(module, exports, require) {
      (function () {
        function detectAmbientScope() {
          if (typeof globalThis !== 'undefined' && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
            return globalThis;
          }
          if (typeof window !== 'undefined' && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
            return window;
          }
          if (typeof self !== 'undefined' && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
            return self;
          }
          if (typeof global !== 'undefined' && global && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
            return global;
          }
          return null;
        }
        function fallbackHasArrayEntry(array, value) {
          if (!Array.isArray(array)) {
            return false;
          }
          for (var index = 0; index < array.length; index += 1) {
            if (array[index] === value) {
              return true;
            }
          }
          return false;
        }
        function resolveScopeUtils() {
          var scopeUtils = null;
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
          var scope = detectAmbientScope();
          if (scope && _typeof(scope) === 'object') {
            try {
              var registry = scope.cineCoreRuntimeStateModules;
              if (registry && _typeof(registry) === 'object' && registry.scopeUtils) {
                return registry.scopeUtils;
              }
            } catch (scopeLookupError) {
              void scopeLookupError;
            }
          }
          return null;
        }
        var scopeUtils = resolveScopeUtils();
        var hasArrayEntry = scopeUtils && typeof scopeUtils.hasArrayEntry === 'function' ? scopeUtils.hasArrayEntry : fallbackHasArrayEntry;
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
          var registry = typeof WeakSet === 'function' ? new WeakSet() : [];
          if (Array.isArray(initialValues)) {
            for (var index = 0; index < initialValues.length; index += 1) {
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
          var scope = detectAmbientScope();
          if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
            return;
          }
          var registryName = 'cineCoreRuntimeStateModules';
          var existing = scope[registryName] && _typeof(scope[registryName]) === 'object' ? scope[registryName] : {};
          existing.safeFreezeRegistry = namespace;
          try {
            scope[registryName] = existing;
          } catch (assignError) {
            void assignError;
          }
        }
        var namespace = {
          createSafeFreezeRegistry: createSafeFreezeRegistry,
          ensureSafeFreezeRegistry: ensureSafeFreezeRegistry,
          hasSafeFreezeEntry: hasSafeFreezeEntry,
          registerSafeFreezeEntry: registerSafeFreezeEntry
        };
        assignToGlobal(namespace);
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = namespace;
        }
      })();
    },
    'modules/core/runtime-state/scope-utils.js': function modules_core_runtimeState_scopeUtilsJs(module, exports, require) {
      (function () {
        function detectAmbientScope() {
          if (typeof globalThis !== 'undefined' && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
            return globalThis;
          }
          if (typeof window !== 'undefined' && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
            return window;
          }
          if (typeof self !== 'undefined' && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
            return self;
          }
          if (typeof global !== 'undefined' && global && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
            return global;
          }
          return null;
        }
        function detectScope(primary) {
          if (primary && (_typeof(primary) === 'object' || typeof primary === 'function')) {
            return primary;
          }
          return detectAmbientScope();
        }
        function hasArrayEntry(array, value) {
          if (!Array.isArray(array)) {
            return false;
          }
          for (var index = 0; index < array.length; index += 1) {
            if (array[index] === value) {
              return true;
            }
          }
          return false;
        }
        function assignToGlobal(namespace) {
          var scope = detectAmbientScope();
          if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
            return;
          }
          var registryName = 'cineCoreRuntimeStateModules';
          var existing = scope[registryName] && _typeof(scope[registryName]) === 'object' ? scope[registryName] : {};
          existing.scopeUtils = namespace;
          try {
            scope[registryName] = existing;
          } catch (assignError) {
            void assignError;
          }
        }
        var namespace = {
          detectScope: detectScope,
          hasArrayEntry: hasArrayEntry
        };
        assignToGlobal(namespace);
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = namespace;
        }
      })();
    },
    'modules/core/runtime-state/temperature-keys.js': function modules_core_runtimeState_temperatureKeysJs(module, exports, require) {
      (function () {
        function detectAmbientScope() {
          if (typeof globalThis !== 'undefined' && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
            return globalThis;
          }
          if (typeof window !== 'undefined' && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
            return window;
          }
          if (typeof self !== 'undefined' && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
            return self;
          }
          if (typeof global !== 'undefined' && global && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
            return global;
          }
          return null;
        }
        function fallbackDetectScope(primary) {
          if (primary && (_typeof(primary) === 'object' || typeof primary === 'function')) {
            return primary;
          }
          return detectAmbientScope();
        }
        function resolveScopeUtils() {
          var scopeUtils = null;
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
          var scope = detectAmbientScope();
          if (scope && _typeof(scope) === 'object') {
            try {
              var registry = scope.cineCoreRuntimeStateModules;
              if (registry && _typeof(registry) === 'object' && registry.scopeUtils) {
                return registry.scopeUtils;
              }
            } catch (scopeLookupError) {
              void scopeLookupError;
            }
          }
          return null;
        }
        var scopeUtils = resolveScopeUtils();
        var detectScope = scopeUtils && typeof scopeUtils.detectScope === 'function' ? scopeUtils.detectScope : fallbackDetectScope;
        function resolveTemperatureKeyDefaults() {
          var defaults = {
            queueKey: '__cinePendingTemperatureNote',
            renderName: 'renderTemperatureNote'
          };
          var scope = detectScope();
          if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
          var scope = detectAmbientScope();
          if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
            return;
          }
          var registryName = 'cineCoreRuntimeStateModules';
          var existing = scope[registryName] && _typeof(scope[registryName]) === 'object' ? scope[registryName] : {};
          existing.temperatureKeys = namespace;
          try {
            scope[registryName] = existing;
          } catch (assignError) {
            void assignError;
          }
        }
        var namespace = {
          resolveTemperatureKeyDefaults: resolveTemperatureKeyDefaults
        };
        assignToGlobal(namespace);
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = namespace;
        }
      })();
    },
    'modules/core/support-resolver.js': function modules_core_supportResolverJs(module, exports, require) {
      (function () {
        function detectRuntimeScope(primaryScope) {
          var candidates = [];
          if (primaryScope && (_typeof(primaryScope) === 'object' || typeof primaryScope === 'function')) {
            candidates.push(primaryScope);
          }
          if (typeof globalThis !== 'undefined' && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
            candidates.push(globalThis);
          }
          if (typeof window !== 'undefined' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
            candidates.push(window);
          }
          if (typeof self !== 'undefined' && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
            candidates.push(self);
          }
          if (typeof global !== 'undefined' && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
            candidates.push(global);
          }
          for (var index = 0; index < candidates.length; index += 1) {
            var candidate = candidates[index];
            if (!candidate || _typeof(candidate) !== 'object' && typeof candidate !== 'function') {
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
          var runtimeScope = detectRuntimeScope(primaryScope);
          if (runtimeScope && runtimeScope[namespaceName] && _typeof(runtimeScope[namespaceName]) === 'object') {
            return runtimeScope[namespaceName];
          }
          if (typeof require === 'function' && typeof requirePath === 'string' && requirePath) {
            try {
              var required = require(requirePath);
              if (required && _typeof(required) === 'object') {
                return required;
              }
            } catch (supportModuleError) {
              void supportModuleError;
            }
          }
          return null;
        }
        var namespace = {
          detectRuntimeScope: detectRuntimeScope,
          resolveCoreSupportModule: resolveCoreSupportModule
        };
        var globalScope = detectRuntimeScope();
        var targetName = 'cineCoreSupportResolver';
        var existing = globalScope && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
        var target = existing;
        for (var _i1 = 0, _Object$keys1 = Object.keys(namespace); _i1 < _Object$keys1.length; _i1++) {
          var key = _Object$keys1[_i1];
          target[key] = namespace[key];
        }
        if (globalScope && _typeof(globalScope) === 'object') {
          try {
            globalScope[targetName] = target;
          } catch (assignError) {
            void assignError;
          }
        }
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = target;
        }
      })();
    }
  };
  var MODULE_CACHE = Object.create(null);
  function loadModule(moduleId) {
    if (MODULE_CACHE[moduleId]) {
      return MODULE_CACHE[moduleId].exports;
    }
    var factory = MODULE_FACTORIES[moduleId];
    if (typeof factory !== 'function') {
      throw new Error('Unknown runtime module: ' + moduleId);
    }
    var module = {
      exports: {}
    };
    MODULE_CACHE[moduleId] = module;
    var moduleDir = getModuleDirectory(moduleId);
    function localRequire(request) {
      if (typeof request === 'string') {
        var normalized = null;
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
  var exportsMap = {};
  Object.keys(MODULE_FACTORIES).forEach(function (moduleId) {
    exportsMap[moduleId] = loadModule(moduleId);
  });
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = exportsMap;
  }
  var globalScope = (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' && globalThis ? globalThis : (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window ? window : (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' && self ? self : (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' && global ? global : null;
  if (globalScope) {
    var targetName = 'cineCoreRuntimeModules';
    var existing = globalScope[targetName] && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
    Object.keys(exportsMap).forEach(function (key) {
      existing[key] = exportsMap[key];
    });
    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
})();