function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = target;
  }
})();