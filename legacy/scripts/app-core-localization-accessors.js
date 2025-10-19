function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function createInlineLocalizationAccessors(options) {
  function isObject(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
  }
  var runtime = options && options.coreLocalizationRuntime && (_typeof(options.coreLocalizationRuntime) === 'object' || typeof options.coreLocalizationRuntime === 'function') ? options.coreLocalizationRuntime : null;
  var localizationBridge = options && options.coreLocalizationBridge && (_typeof(options.coreLocalizationBridge) === 'object' || typeof options.coreLocalizationBridge === 'function') ? options.coreLocalizationBridge : null;
  var runtimeScope = options && options.corePartRuntimeScope;
  var coreGlobalScope = options && options.coreGlobalScope;
  var fallbackResolveLocaleModule = options && typeof options.fallbackResolveLocaleModule === 'function' ? options.fallbackResolveLocaleModule : null;
  var requireFn = options && typeof options.requireFn === 'function' ? options.requireFn : typeof require === 'function' ? require : null;
  var translationsRequirePath = options && typeof options.translationsRequirePath === 'string' && options.translationsRequirePath ? options.translationsRequirePath : './translations.js';
  var fallbackScopes = function collectInlineLocalizationScopes() {
    var scopes = [];
    var seen = typeof Set === 'function' ? new Set() : null;
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
  }();
  var localeModule = runtime && runtime.localeModule || (fallbackResolveLocaleModule ? fallbackResolveLocaleModule(runtimeScope) : null);
  var defaultLanguage = runtime && runtime.defaultLanguage || (localeModule && typeof localeModule.DEFAULT_LANGUAGE === 'string' ? localeModule.DEFAULT_LANGUAGE : 'en');
  var rtlLanguageCodes = runtime && runtime.rtlLanguageCodes || (localeModule && Array.isArray(localeModule.RTL_LANGUAGE_CODES) && localeModule.RTL_LANGUAGE_CODES.length > 0 ? localeModule.RTL_LANGUAGE_CODES : ['ar', 'fa', 'he', 'ur']);
  function fallbackNormalizeLanguageCodeProxy(lang) {
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
  var normalizeLanguageCode = runtime && typeof runtime.normalizeLanguageCode === 'function' ? function runtimeNormalizeLanguageCodeProxy(lang) {
    try {
      return runtime.normalizeLanguageCode(lang);
    } catch (runtimeNormalizeError) {
      void runtimeNormalizeError;
    }
    return fallbackNormalizeLanguageCodeProxy(lang);
  } : localizationBridge && typeof localizationBridge.normalizeLanguageCode === 'function' ? function bridgeNormalizeLanguageCodeProxy(lang) {
    try {
      return localizationBridge.normalizeLanguageCode(lang, runtimeScope);
    } catch (bridgeNormalizeError) {
      void bridgeNormalizeError;
    }
    return fallbackNormalizeLanguageCodeProxy(lang);
  } : fallbackNormalizeLanguageCodeProxy;
  function fallbackIsRtlLanguageProxy(lang) {
    var normalized = normalizeLanguageCode(lang);
    var base = normalized.split('-')[0];
    return rtlLanguageCodes.indexOf(base) !== -1;
  }
  var isRtlLanguage = runtime && typeof runtime.isRtlLanguage === 'function' ? function runtimeIsRtlLanguageProxy(lang) {
    try {
      return runtime.isRtlLanguage(lang);
    } catch (runtimeIsRtlError) {
      void runtimeIsRtlError;
    }
    return fallbackIsRtlLanguageProxy(lang);
  } : localizationBridge && typeof localizationBridge.isRtlLanguage === 'function' ? function bridgeIsRtlLanguageProxy(lang) {
    try {
      return localizationBridge.isRtlLanguage(lang, runtimeScope);
    } catch (bridgeIsRtlError) {
      void bridgeIsRtlError;
    }
    return fallbackIsRtlLanguageProxy(lang);
  } : fallbackIsRtlLanguageProxy;
  function fallbackResolveDocumentDirectionProxy(lang) {
    if (typeof document !== 'undefined' && document && document.documentElement) {
      try {
        var docDir = document.documentElement.getAttribute('dir');
        if (docDir) {
          return docDir;
        }
      } catch (resolveDirectionError) {
        void resolveDirectionError;
      }
    }
    return isRtlLanguage(lang) ? 'rtl' : 'ltr';
  }
  var resolveDocumentDirection = runtime && typeof runtime.resolveDocumentDirection === 'function' ? function runtimeResolveDocumentDirectionProxy(lang) {
    try {
      return runtime.resolveDocumentDirection(lang);
    } catch (runtimeResolveDirectionError) {
      void runtimeResolveDirectionError;
    }
    return fallbackResolveDocumentDirectionProxy(lang);
  } : localizationBridge && typeof localizationBridge.resolveDocumentDirection === 'function' ? function bridgeResolveDocumentDirectionProxy(lang) {
    try {
      return localizationBridge.resolveDocumentDirection(lang, runtimeScope);
    } catch (bridgeResolveDirectionError) {
      void bridgeResolveDirectionError;
    }
    return fallbackResolveDocumentDirectionProxy(lang);
  } : fallbackResolveDocumentDirectionProxy;
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
  var applyLocaleMetadata = runtime && typeof runtime.applyLocaleMetadata === 'function' ? function runtimeApplyLocaleMetadataProxy(target, lang, direction) {
    try {
      return runtime.applyLocaleMetadata(target, lang, direction);
    } catch (runtimeApplyLocaleError) {
      void runtimeApplyLocaleError;
    }
    return fallbackApplyLocaleMetadataProxy(target, lang, direction);
  } : localizationBridge && typeof localizationBridge.applyLocaleMetadata === 'function' ? function bridgeApplyLocaleMetadataProxy(target, lang, direction) {
    try {
      return localizationBridge.applyLocaleMetadata(target, lang, direction, runtimeScope);
    } catch (bridgeApplyLocaleError) {
      void bridgeApplyLocaleError;
    }
    return fallbackApplyLocaleMetadataProxy(target, lang, direction);
  } : fallbackApplyLocaleMetadataProxy;
  function fallbackResolveTranslationDataset() {
    for (var index = 0; index < fallbackScopes.length; index += 1) {
      var scope = fallbackScopes[index];
      if (!isObject(scope)) {
        continue;
      }
      var dataset = scope.texts;
      if (isObject(dataset)) {
        return dataset;
      }
    }
    if (typeof requireFn === 'function') {
      try {
        var translationsModule = requireFn(translationsRequirePath);
        if (isObject(translationsModule) && isObject(translationsModule.texts)) {
          return translationsModule.texts;
        }
      } catch (translationRequireError) {
        void translationRequireError;
      }
    }
    return {};
  }
  function fallbackGetLanguageTextsProxy(lang) {
    var dataset = fallbackResolveTranslationDataset();
    var fallbackLang = typeof defaultLanguage === 'string' && defaultLanguage ? defaultLanguage : 'en';
    var normalized = null;
    if (typeof lang === 'string' && lang) {
      try {
        normalized = String(lang).trim().toLowerCase();
      } catch (normalizeError) {
        void normalizeError;
        normalized = null;
      }
    }
    var resolved = normalized && Object.prototype.hasOwnProperty.call(dataset, normalized) ? normalized : '';
    if (!resolved && normalized) {
      var base = normalized.split('-')[0];
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
      var fallbackCandidate = dataset && _typeof(dataset[fallbackLang]) === 'object' ? dataset[fallbackLang] : null;
      if (fallbackCandidate) {
        return fallbackCandidate;
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
  var getLanguageTexts = runtime && typeof runtime.getLanguageTexts === 'function' ? function runtimeGetLanguageTextsProxy(lang) {
    try {
      return runtime.getLanguageTexts(lang);
    } catch (runtimeGetLanguageTextsError) {
      void runtimeGetLanguageTextsError;
    }
    return fallbackGetLanguageTextsProxy(lang);
  } : fallbackGetLanguageTextsProxy;
  function ensureGlobalGetLanguageTextsAvailability(getLanguageTextsFn) {
    if (runtime && typeof runtime.ensureGlobalGetLanguageTextsAvailability === 'function') {
      try {
        runtime.ensureGlobalGetLanguageTextsAvailability();
        return;
      } catch (ensureError) {
        void ensureError;
      }
    }
    var assignableFunction = typeof getLanguageTextsFn === 'function' ? getLanguageTextsFn : getLanguageTexts;
    for (var index = 0; index < fallbackScopes.length; index += 1) {
      var scope = fallbackScopes[index];
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
    rtlLanguageCodes: Array.isArray(rtlLanguageCodes) && rtlLanguageCodes.length ? rtlLanguageCodes : ['ar', 'fa', 'he', 'ur'],
    normalizeLanguageCode: normalizeLanguageCode,
    isRtlLanguage: isRtlLanguage,
    resolveDocumentDirection: resolveDocumentDirection,
    applyLocaleMetadata: applyLocaleMetadata,
    getLanguageTexts: getLanguageTexts,
    ensureGlobalGetLanguageTextsAvailability: ensureGlobalGetLanguageTextsAvailability,
    fallbackResolveTranslationDataset: fallbackResolveTranslationDataset
  };
}
var LOCALIZATION_ACCESSORS_TOOLS_GLOBAL = typeof LOCALIZATION_ACCESSORS_TOOLS !== 'undefined' && LOCALIZATION_ACCESSORS_TOOLS ? LOCALIZATION_ACCESSORS_TOOLS : null;
var CORE_LOCALIZATION_RUNTIME_GLOBAL = typeof CORE_LOCALIZATION_RUNTIME !== 'undefined' && CORE_LOCALIZATION_RUNTIME ? CORE_LOCALIZATION_RUNTIME : null;
var CORE_LOCALIZATION_BRIDGE_GLOBAL = typeof CORE_LOCALIZATION_BRIDGE !== 'undefined' && CORE_LOCALIZATION_BRIDGE ? CORE_LOCALIZATION_BRIDGE : null;
var CORE_PART_RUNTIME_SCOPE_GLOBAL = typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' && CORE_PART1_RUNTIME_SCOPE ? CORE_PART1_RUNTIME_SCOPE : null;
var CORE_GLOBAL_SCOPE_GLOBAL = typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : CORE_PART_RUNTIME_SCOPE_GLOBAL;
var FALLBACK_RESOLVE_LOCALE_MODULE_GLOBAL = typeof fallbackResolveLocaleModule === 'function' ? fallbackResolveLocaleModule : null;
var createLocalizationAccessors = (LOCALIZATION_ACCESSORS_TOOLS_GLOBAL && typeof LOCALIZATION_ACCESSORS_TOOLS_GLOBAL.createLocalizationAccessors === 'function' ? LOCALIZATION_ACCESSORS_TOOLS_GLOBAL.createLocalizationAccessors : null) || function fallbackResolveLocalizationAccessorsFactory() {
  if (typeof require === 'function') {
    try {
      var required = require('./modules/app-core/localization.js');
      if (required && typeof required.createLocalizationAccessors === 'function') {
        return required.createLocalizationAccessors;
      }
    } catch (localizationAccessorsRequireError) {
      void localizationAccessorsRequireError;
    }
  }
  var fallbackScopes = [CORE_PART_RUNTIME_SCOPE_GLOBAL, CORE_GLOBAL_SCOPE_GLOBAL, typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
  for (var index = 0; index < fallbackScopes.length; index += 1) {
    var scope = fallbackScopes[index];
    if (!scope || _typeof(scope) !== 'object') {
      continue;
    }
    try {
      var candidate = scope.cineCoreAppLocalizationAccessors;
      if (candidate && typeof candidate.createLocalizationAccessors === 'function') {
        return candidate.createLocalizationAccessors;
      }
    } catch (localizationAccessorsLookupError) {
      void localizationAccessorsLookupError;
    }
  }
  return null;
}();
var ACTIVE_LOCALIZATION_ACCESSORS = null;
if (typeof createLocalizationAccessors === 'function') {
  try {
    var resolved = createLocalizationAccessors({
      coreLocalizationRuntime: CORE_LOCALIZATION_RUNTIME_GLOBAL,
      coreLocalizationBridge: CORE_LOCALIZATION_BRIDGE_GLOBAL,
      corePartRuntimeScope: CORE_PART_RUNTIME_SCOPE_GLOBAL,
      coreGlobalScope: CORE_GLOBAL_SCOPE_GLOBAL,
      fallbackResolveLocaleModule: FALLBACK_RESOLVE_LOCALE_MODULE_GLOBAL,
      requireFn: typeof require === 'function' ? require : null,
      translationsRequirePath: './translations.js'
    });
    if (resolved && _typeof(resolved) === 'object') {
      ACTIVE_LOCALIZATION_ACCESSORS = resolved;
    }
  } catch (resolveActiveLocalizationAccessorsError) {
    void resolveActiveLocalizationAccessorsError;
    ACTIVE_LOCALIZATION_ACCESSORS = null;
  }
}
if (!ACTIVE_LOCALIZATION_ACCESSORS) {
  try {
    var fallbackAccessors = createInlineLocalizationAccessors({
      coreLocalizationRuntime: CORE_LOCALIZATION_RUNTIME_GLOBAL,
      coreLocalizationBridge: CORE_LOCALIZATION_BRIDGE_GLOBAL,
      corePartRuntimeScope: CORE_PART_RUNTIME_SCOPE_GLOBAL,
      coreGlobalScope: CORE_GLOBAL_SCOPE_GLOBAL,
      fallbackResolveLocaleModule: FALLBACK_RESOLVE_LOCALE_MODULE_GLOBAL,
      requireFn: typeof require === 'function' ? require : null,
      translationsRequirePath: './translations.js'
    });
    if (fallbackAccessors && _typeof(fallbackAccessors) === 'object') {
      ACTIVE_LOCALIZATION_ACCESSORS = fallbackAccessors;
    }
  } catch (createInlineLocalizationAccessorsError) {
    void createInlineLocalizationAccessorsError;
    ACTIVE_LOCALIZATION_ACCESSORS = null;
  }
}
var LOCALE_MODULE = ACTIVE_LOCALIZATION_ACCESSORS && ACTIVE_LOCALIZATION_ACCESSORS.localeModule ? ACTIVE_LOCALIZATION_ACCESSORS.localeModule : null;
var DEFAULT_LANGUAGE = ACTIVE_LOCALIZATION_ACCESSORS && ACTIVE_LOCALIZATION_ACCESSORS.defaultLanguage ? ACTIVE_LOCALIZATION_ACCESSORS.defaultLanguage : 'en';
var GLOBAL_LOCALIZATION_SCOPE = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
if (GLOBAL_LOCALIZATION_SCOPE && _typeof(GLOBAL_LOCALIZATION_SCOPE) === 'object') {
  try {
    if (typeof GLOBAL_LOCALIZATION_SCOPE.CPP_DEFAULT_LANGUAGE_SAFE !== 'string' || !GLOBAL_LOCALIZATION_SCOPE.CPP_DEFAULT_LANGUAGE_SAFE) {
      GLOBAL_LOCALIZATION_SCOPE.CPP_DEFAULT_LANGUAGE_SAFE = DEFAULT_LANGUAGE;
    }
  } catch (assignDefaultLanguageSafeError) {
    void assignDefaultLanguageSafeError;
  }
  try {
    if (typeof GLOBAL_LOCALIZATION_SCOPE.DEFAULT_LANGUAGE !== 'string' || !GLOBAL_LOCALIZATION_SCOPE.DEFAULT_LANGUAGE) {
      GLOBAL_LOCALIZATION_SCOPE.DEFAULT_LANGUAGE = DEFAULT_LANGUAGE;
    }
  } catch (assignDefaultLanguagePropertyError) {
    void assignDefaultLanguagePropertyError;
  }
}
var RTL_LANGUAGE_CODES = ACTIVE_LOCALIZATION_ACCESSORS && Array.isArray(ACTIVE_LOCALIZATION_ACCESSORS.rtlLanguageCodes) && ACTIVE_LOCALIZATION_ACCESSORS.rtlLanguageCodes.length > 0 ? ACTIVE_LOCALIZATION_ACCESSORS.rtlLanguageCodes : ['ar', 'fa', 'he', 'ur'];
var normalizeLanguageCode = ACTIVE_LOCALIZATION_ACCESSORS && typeof ACTIVE_LOCALIZATION_ACCESSORS.normalizeLanguageCode === 'function' ? ACTIVE_LOCALIZATION_ACCESSORS.normalizeLanguageCode : function fallbackNormalizeLanguageCodeProxy(lang) {
  if (!lang) {
    return DEFAULT_LANGUAGE;
  }
  try {
    var normalized = String(lang).trim().toLowerCase();
    return normalized || DEFAULT_LANGUAGE;
  } catch (languageNormalizeError) {
    void languageNormalizeError;
  }
  return DEFAULT_LANGUAGE;
};
var isRtlLanguage = ACTIVE_LOCALIZATION_ACCESSORS && typeof ACTIVE_LOCALIZATION_ACCESSORS.isRtlLanguage === 'function' ? ACTIVE_LOCALIZATION_ACCESSORS.isRtlLanguage : function fallbackIsRtlLanguageProxy(lang) {
  var normalized = normalizeLanguageCode(lang);
  var base = normalized.split('-')[0];
  return RTL_LANGUAGE_CODES.indexOf(base) !== -1;
};
var resolveDocumentDirection = ACTIVE_LOCALIZATION_ACCESSORS && typeof ACTIVE_LOCALIZATION_ACCESSORS.resolveDocumentDirection === 'function' ? ACTIVE_LOCALIZATION_ACCESSORS.resolveDocumentDirection : function fallbackResolveDocumentDirectionProxy(lang) {
  if (typeof document !== 'undefined' && document && document.documentElement) {
    try {
      var docDir = document.documentElement.getAttribute('dir');
      if (docDir) {
        return docDir;
      }
    } catch (resolveDirectionError) {
      void resolveDirectionError;
    }
  }
  return isRtlLanguage(lang) ? 'rtl' : 'ltr';
};
var applyLocaleMetadata = ACTIVE_LOCALIZATION_ACCESSORS && typeof ACTIVE_LOCALIZATION_ACCESSORS.applyLocaleMetadata === 'function' ? ACTIVE_LOCALIZATION_ACCESSORS.applyLocaleMetadata : function fallbackApplyLocaleMetadataProxy(target, lang, direction) {
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
var existingGetLanguageTexts = typeof getLanguageTexts === 'function' ? getLanguageTexts : null;
var resolvedGetLanguageTexts = ACTIVE_LOCALIZATION_ACCESSORS && typeof ACTIVE_LOCALIZATION_ACCESSORS.getLanguageTexts === 'function' ? ACTIVE_LOCALIZATION_ACCESSORS.getLanguageTexts : existingGetLanguageTexts || function fallbackGetLanguageTextsProxy() {
  return {};
};
try {
  getLanguageTexts = resolvedGetLanguageTexts;
} catch (assignGetLanguageTextsError) {
  void assignGetLanguageTextsError;
}
if (ACTIVE_LOCALIZATION_ACCESSORS && typeof ACTIVE_LOCALIZATION_ACCESSORS.ensureGlobalGetLanguageTextsAvailability === 'function') {
  try {
    ACTIVE_LOCALIZATION_ACCESSORS.ensureGlobalGetLanguageTextsAvailability(resolvedGetLanguageTexts);
  } catch (ensureGetLanguageTextsAvailabilityError) {
    void ensureGetLanguageTextsAvailabilityError;
  }
}