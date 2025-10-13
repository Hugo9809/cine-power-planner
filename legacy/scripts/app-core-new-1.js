var CORE_RUNTIME_LOCALE_SUPPORT = function resolveCoreRuntimeLocaleSupport() {
  var resolved = null;

  if (typeof resolveCoreSupportModule === 'function') {
      resolved = resolveCoreSupportModule('cineCoreRuntimeLocale', './modules/core/runtime-locale.js');
    } catch (runtimeLocaleResolveError) {
      void runtimeLocaleResolveError;
      resolved = null;

  if (!resolved && typeof require === 'function') {
      var requiredRuntimeLocale = require('./modules/core/runtime-locale.js');
      if (requiredRuntimeLocale && _typeof(requiredRuntimeLocale) === 'object') {
        resolved = requiredRuntimeLocale;
    } catch (runtimeLocaleRequireError) {
      void runtimeLocaleRequireError;

  return resolved;
}();

var CORE_RUNTIME_LOCALE_API = CORE_RUNTIME_LOCALE_SUPPORT && typeof CORE_RUNTIME_LOCALE_SUPPORT.resolveRuntimeLocale === 'function' ? CORE_RUNTIME_LOCALE_SUPPORT.resolveRuntimeLocale({
  runtimeScope: CORE_PART1_RUNTIME_SCOPE,
  localizationBridge: CORE_LOCALIZATION_BRIDGE
}) : function createInlineRuntimeLocaleFallback() {
  var bridge = CORE_LOCALIZATION_BRIDGE && _typeof(CORE_LOCALIZATION_BRIDGE) === 'object' ? CORE_LOCALIZATION_BRIDGE : null;

  var fallbackDefaultLanguage = function resolveFallbackDefaultLanguage() {
    if (bridge && typeof bridge.getDefaultLanguage === 'function') {
      try {
        var resolved = bridge.getDefaultLanguage(CORE_PART1_RUNTIME_SCOPE);
        if (typeof resolved === 'string' && resolved) {
          return resolved;
        }
      } catch (fallbackDefaultLanguageError) {
        void fallbackDefaultLanguageError;

    return 'en';
  }();

  var fallbackRtlCodes = function resolveFallbackRtlCodes() {
    if (bridge && typeof bridge.getRtlLanguageCodes === 'function') {
      try {
        var resolved = bridge.getRtlLanguageCodes(CORE_PART1_RUNTIME_SCOPE);
        if (Array.isArray(resolved) && resolved.length > 0) {
          return Object.freeze(resolved.slice());
        }
      } catch (fallbackRtlCodesError) {
        void fallbackRtlCodesError;
      }

    return Object.freeze(['ar', 'fa', 'he', 'ur']);
  }();

  function normalizeLanguageCodeFallback(lang) {
    if (bridge && typeof bridge.normalizeLanguageCode === 'function') {
      try {
        var normalized = bridge.normalizeLanguageCode(lang, CORE_PART1_RUNTIME_SCOPE);
        if (typeof normalized === 'string' && normalized) {
          return normalized;
        }
      } catch (normalizeLanguageFallbackError) {
        void normalizeLanguageFallbackError;
      }
    }

    if (!lang) {
      return fallbackDefaultLanguage;
    }

      return String(lang).trim().toLowerCase();
    } catch (normalizeStringFallbackError) {
      void normalizeStringFallbackError;

    return fallbackDefaultLanguage;

  function isRtlLanguageFallback(lang) {
    if (bridge && typeof bridge.isRtlLanguage === 'function') {
      try {
        var resolved = bridge.isRtlLanguage(lang, CORE_PART1_RUNTIME_SCOPE);
        if (typeof resolved === 'boolean') {
          return resolved;
        }
      } catch (isRtlFallbackError) {
        void isRtlFallbackError;
      }
    }

    var normalized = normalizeLanguageCodeFallback(lang);
    var base = normalized.split('-')[0];
    return fallbackRtlCodes.indexOf(base) !== -1;

  function resolveDocumentDirectionFallback(lang) {
    if (bridge && typeof bridge.resolveDocumentDirection === 'function') {
      try {
        var resolved = bridge.resolveDocumentDirection(lang, CORE_PART1_RUNTIME_SCOPE);
        if (resolved === 'rtl' || resolved === 'ltr') {
          return resolved;
        }
      } catch (resolveDocumentDirectionFallbackError) {
        void resolveDocumentDirectionFallbackError;
      }
    }

    if (typeof document !== 'undefined' && document && document.documentElement) {
      try {
        var docDir = document.documentElement.getAttribute('dir');
        if (docDir === 'rtl' || docDir === 'ltr') {
          return docDir;
        }
      } catch (documentDirectionFallbackError) {
        void documentDirectionFallbackError;
      }
    }

    return isRtlLanguageFallback(lang) ? 'rtl' : 'ltr';

  function applyLocaleMetadataFallback(target, lang, direction) {
    if (bridge && typeof bridge.applyLocaleMetadata === 'function') {
      try {
        bridge.applyLocaleMetadata(target, lang, direction, CORE_PART1_RUNTIME_SCOPE);
        return;
      } catch (applyLocaleMetadataFallbackError) {
        void applyLocaleMetadataFallbackError;
      }
    }

    if (!target) {
      return;
    }

    if (lang) {
      try {
        target.lang = lang;
      } catch (setFallbackLangError) {
        void setFallbackLangError;
      }
    }

    if (direction) {
      try {
        target.dir = direction;
      } catch (setFallbackDirectionError) {
        void setFallbackDirectionError;
      }
    }

  return Object.freeze({
    resolveLocaleModule: function resolveLocaleModuleFallback() {
      if (bridge && typeof bridge.resolveLocaleModule === 'function') {
        try {
          var resolved = bridge.resolveLocaleModule(CORE_PART1_RUNTIME_SCOPE);
          if (resolved && _typeof(resolved) === 'object') {
            return resolved;
          }
        } catch (resolveLocaleModuleFallbackError) {
          void resolveLocaleModuleFallbackError;
        }
      }

      return null;
    },
    DEFAULT_LANGUAGE: fallbackDefaultLanguage,
    RTL_LANGUAGE_CODES: fallbackRtlCodes,
    normalizeLanguageCode: normalizeLanguageCodeFallback,
    isRtlLanguage: isRtlLanguageFallback,
    resolveDocumentDirection: resolveDocumentDirectionFallback,
    applyLocaleMetadata: applyLocaleMetadataFallback
  });
}();

var DEFAULT_LANGUAGE = CORE_RUNTIME_LOCALE_API.DEFAULT_LANGUAGE;
var RTL_LANGUAGE_CODES = CORE_RUNTIME_LOCALE_API.RTL_LANGUAGE_CODES;
var normalizeLanguageCode = CORE_RUNTIME_LOCALE_API.normalizeLanguageCode;
var isRtlLanguage = CORE_RUNTIME_LOCALE_API.isRtlLanguage;
var resolveDocumentDirection = CORE_RUNTIME_LOCALE_API.resolveDocumentDirection;
var applyLocaleMetadata = CORE_RUNTIME_LOCALE_API.applyLocaleMetadata;
