function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  'use strict';

  function detectScope(primary) {
    if (primary && (_typeof(primary) === 'object' || typeof primary === 'function')) {
      return primary;
    }
    if (typeof globalThis !== 'undefined' && globalThis && ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' || typeof globalThis === 'function')) {
      return globalThis;
    }
    if (typeof window !== 'undefined' && window && ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' || typeof window === 'function')) {
      return window;
    }
    if (typeof self !== 'undefined' && self && ((typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' || typeof self === 'function')) {
      return self;
    }
    if (typeof global !== 'undefined' && global && ((typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' || typeof global === 'function')) {
      return global;
    }
    return null;
  }
  function collectCandidateScopes(primary) {
    var scopes = [];
    var seen = typeof Set === 'function' ? new Set() : null;
    function push(scope) {
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
        return;
      }
      if (seen) {
        if (seen.has(scope)) {
          return;
        }
        seen.add(scope);
      } else if (scopes.indexOf(scope) !== -1) {
        return;
      }
      scopes.push(scope);
    }
    push(primary);
    push(typeof globalThis !== 'undefined' ? globalThis : null);
    push(typeof window !== 'undefined' ? window : null);
    push(typeof self !== 'undefined' ? self : null);
    push(typeof global !== 'undefined' ? global : null);
    return scopes;
  }
  function tryRequireLocaleModule() {
    if (typeof require !== 'function') {
      return null;
    }
    try {
      var required = require('../localization.js');
      return required && _typeof(required) === 'object' ? required : null;
    } catch (requireError) {
      void requireError;
    }
    return null;
  }
  function fallbackResolveLocaleModule(primary) {
    if (typeof cineLocale !== 'undefined' && cineLocale && (typeof cineLocale === "undefined" ? "undefined" : _typeof(cineLocale)) === 'object') {
      return cineLocale;
    }
    var candidateScopes = collectCandidateScopes(primary);
    for (var index = 0; index < candidateScopes.length; index += 1) {
      var scope = candidateScopes[index];
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
        continue;
      }
      try {
        var moduleCandidate = scope.cineLocale;
        if (moduleCandidate && _typeof(moduleCandidate) === 'object') {
          return moduleCandidate;
        }
      } catch (localeLookupError) {
        void localeLookupError;
      }
    }
    var required = tryRequireLocaleModule();
    if (required) {
      return required;
    }
    return null;
  }
  function fallbackNormalizeLanguageCode(lang, defaultLanguage) {
    if (!lang) {
      return defaultLanguage || 'en';
    }
    try {
      return String(lang).trim().toLowerCase();
    } catch (normalizeError) {
      void normalizeError;
    }
    return defaultLanguage || 'en';
  }
  function fallbackIsRtlLanguage(lang, rtlCodes, defaultLanguage) {
    var normalized = fallbackNormalizeLanguageCode(lang, defaultLanguage);
    var base = normalized.split('-')[0];
    var codes = Array.isArray(rtlCodes) && rtlCodes.length > 0 ? rtlCodes : DEFAULT_RTL_CODES;
    return codes.indexOf(base) !== -1;
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
  function createBridgeInvoker(bridge, runtimeScope) {
    if (!bridge || _typeof(bridge) !== 'object') {
      return function noopInvoke() {
        return {
          invoked: false,
          value: undefined
        };
      };
    }
    return function invokeBridge(methodName) {
      if (!methodName || typeof bridge[methodName] !== 'function') {
        return {
          invoked: false,
          value: undefined
        };
      }
      var args = [];
      for (var index = 1; index < arguments.length; index += 1) {
        args.push(arguments[index]);
      }
      args.push(runtimeScope);
      try {
        return {
          invoked: true,
          value: bridge[methodName].apply(bridge, args)
        };
      } catch (bridgeError) {
        void bridgeError;
      }
      return {
        invoked: true,
        value: undefined
      };
    };
  }
  function ensureFrozenArray(values, fallback) {
    if (!Array.isArray(values) || values.length === 0) {
      return fallback || DEFAULT_RTL_CODES;
    }
    var clone = values.slice();
    return Object.freeze(clone);
  }
  var DEFAULT_RTL_CODES = Object.freeze(['ar', 'fa', 'he', 'ur']);
  function resolveRuntimeLocale(options) {
    var runtimeScopeCandidate = options && _typeof(options) === 'object' ? options.runtimeScope : null;
    var bridgeCandidate = options && _typeof(options) === 'object' ? options.localizationBridge : null;
    var runtimeScope = detectScope(runtimeScopeCandidate);
    var callBridge = createBridgeInvoker(bridgeCandidate, runtimeScope);
    var localeModuleResult = callBridge('resolveLocaleModule');
    var fallbackLocaleModule = fallbackResolveLocaleModule(runtimeScope);
    var localeModule = localeModuleResult.invoked && localeModuleResult.value && _typeof(localeModuleResult.value) === 'object' ? localeModuleResult.value : fallbackLocaleModule;
    var defaultLanguage = function resolveDefaultLanguage() {
      var bridged = callBridge('getDefaultLanguage');
      if (bridged.invoked && typeof bridged.value === 'string' && bridged.value) {
        return bridged.value;
      }
      if (localeModule && typeof localeModule.DEFAULT_LANGUAGE === 'string' && localeModule.DEFAULT_LANGUAGE) {
        return localeModule.DEFAULT_LANGUAGE;
      }
      return 'en';
    }();
    var rtlLanguageCodes = function resolveRtlLanguageCodes() {
      var bridged = callBridge('getRtlLanguageCodes');
      if (bridged.invoked && Array.isArray(bridged.value) && bridged.value.length > 0) {
        return ensureFrozenArray(bridged.value);
      }
      if (localeModule && Array.isArray(localeModule.RTL_LANGUAGE_CODES) && localeModule.RTL_LANGUAGE_CODES.length > 0) {
        return ensureFrozenArray(localeModule.RTL_LANGUAGE_CODES);
      }
      return DEFAULT_RTL_CODES;
    }();
    function normalizeLanguageCode(lang) {
      var bridged = callBridge('normalizeLanguageCode', lang);
      if (bridged.invoked && typeof bridged.value === 'string' && bridged.value) {
        return bridged.value;
      }
      return fallbackNormalizeLanguageCode(lang, defaultLanguage);
    }
    function isRtlLanguage(lang) {
      var bridged = callBridge('isRtlLanguage', lang);
      if (bridged.invoked && typeof bridged.value === 'boolean') {
        return bridged.value;
      }
      return fallbackIsRtlLanguage(lang, rtlLanguageCodes, defaultLanguage);
    }
    function resolveDocumentDirection(lang) {
      var bridged = callBridge('resolveDocumentDirection', lang);
      if (bridged.invoked && (bridged.value === 'rtl' || bridged.value === 'ltr')) {
        return bridged.value;
      }
      if (typeof document !== 'undefined' && document && document.documentElement) {
        try {
          var docDir = document.documentElement.getAttribute('dir');
          if (docDir === 'rtl' || docDir === 'ltr') {
            return docDir;
          }
        } catch (documentDirectionError) {
          void documentDirectionError;
        }
      }
      return isRtlLanguage(lang) ? 'rtl' : 'ltr';
    }
    function applyLocaleMetadata(target, lang, direction) {
      var bridged = callBridge('applyLocaleMetadata', target, lang, direction);
      if (bridged.invoked) {
        return bridged.value;
      }
      return fallbackApplyLocaleMetadata(target, lang, direction);
    }
    function resolveLocaleModule() {
      return localeModule;
    }
    return Object.freeze({
      resolveLocaleModule: resolveLocaleModule,
      DEFAULT_LANGUAGE: defaultLanguage,
      RTL_LANGUAGE_CODES: rtlLanguageCodes,
      normalizeLanguageCode: normalizeLanguageCode,
      isRtlLanguage: isRtlLanguage,
      resolveDocumentDirection: resolveDocumentDirection,
      applyLocaleMetadata: applyLocaleMetadata
    });
  }
  var namespace = {
    resolveRuntimeLocale: resolveRuntimeLocale
  };
  var globalScope = detectScope();
  var targetName = 'cineCoreRuntimeLocale';
  var existing = globalScope && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
  for (var _i = 0, _Object$keys = Object.keys(namespace); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    existing[key] = namespace[key];
  }
  if (globalScope && (_typeof(globalScope) === 'object' || typeof globalScope === 'function')) {
    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && _typeof(module.exports) === 'object') {
    module.exports = existing;
  }
})();