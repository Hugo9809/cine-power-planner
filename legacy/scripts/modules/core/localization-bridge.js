function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
  function resolveLocaleModule(primary) {
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
  function getDefaultLanguage(primary) {
    var module = resolveLocaleModule(primary);
    if (module && typeof module.DEFAULT_LANGUAGE === 'string' && module.DEFAULT_LANGUAGE) {
      return module.DEFAULT_LANGUAGE;
    }
    return 'en';
  }
  function getRtlLanguageCodes(primary) {
    var module = resolveLocaleModule(primary);
    if (module && Array.isArray(module.RTL_LANGUAGE_CODES) && module.RTL_LANGUAGE_CODES.length > 0) {
      return module.RTL_LANGUAGE_CODES.slice();
    }
    return ['ar', 'fa', 'he', 'ur'];
  }
  function normalizeLanguageCode(lang, primary) {
    var module = resolveLocaleModule(primary);
    var defaultLanguage = getDefaultLanguage(primary);
    if (module && typeof module.normalizeLanguageCode === 'function') {
      try {
        return module.normalizeLanguageCode(lang);
      } catch (normalizeError) {
        void normalizeError;
      }
    }
    return fallbackNormalizeLanguageCode(lang, defaultLanguage);
  }
  function isRtlLanguage(lang, primary) {
    var normalized = normalizeLanguageCode(lang, primary);
    var base = normalized.split('-')[0];
    var rtlCodes = getRtlLanguageCodes(primary);
    return rtlCodes.indexOf(base) !== -1;
  }
  function resolveDocumentDirection(lang, primary) {
    var module = resolveLocaleModule(primary);
    if (module && typeof module.resolveDocumentDirection === 'function') {
      try {
        return module.resolveDocumentDirection(lang);
      } catch (resolveDirectionError) {
        void resolveDirectionError;
      }
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
    return isRtlLanguage(lang, primary) ? 'rtl' : 'ltr';
  }
  function applyLocaleMetadata(target, lang, direction, primary) {
    var module = resolveLocaleModule(primary);
    if (module && typeof module.applyLocaleMetadata === 'function') {
      try {
        return module.applyLocaleMetadata(target, lang, direction);
      } catch (applyLocaleError) {
        void applyLocaleError;
      }
    }
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
  var namespace = {
    resolveLocaleModule: resolveLocaleModule,
    normalizeLanguageCode: normalizeLanguageCode,
    isRtlLanguage: isRtlLanguage,
    resolveDocumentDirection: resolveDocumentDirection,
    applyLocaleMetadata: applyLocaleMetadata,
    getDefaultLanguage: getDefaultLanguage,
    getRtlLanguageCodes: getRtlLanguageCodes
  };
  var globalScope = detectScope();
  var targetName = 'cineCoreLocalizationBridge';
  var existing = globalScope && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
  var target = existing;
  for (var _i = 0, _Object$keys = Object.keys(namespace); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    target[key] = namespace[key];
  }
  if (globalScope && _typeof(globalScope) === 'object') {
    try {
      globalScope[targetName] = target;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = target;
  }
})();