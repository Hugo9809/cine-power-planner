/* global cineLocale */

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

  function collectCandidateScopes(primary) {
    const scopes = [];
    const seen = typeof Set === 'function' ? new Set() : null;

    function push(scope) {
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
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
      const required = require('../localization.js');
      return required && typeof required === 'object' ? required : null;
    } catch (requireError) {
      void requireError;
    }

    return null;
  }

  function resolveLocaleModule(primary) {
    if (typeof cineLocale !== 'undefined' && cineLocale && typeof cineLocale === 'object') {
      return cineLocale;
    }

    const candidateScopes = collectCandidateScopes(primary);

    for (let index = 0; index < candidateScopes.length; index += 1) {
      const scope = candidateScopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      try {
        const moduleCandidate = scope.cineLocale;
        if (moduleCandidate && typeof moduleCandidate === 'object') {
          return moduleCandidate;
        }
      } catch (localeLookupError) {
        void localeLookupError;
      }
    }

    const required = tryRequireLocaleModule();
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
    const module = resolveLocaleModule(primary);

    if (module && typeof module.DEFAULT_LANGUAGE === 'string' && module.DEFAULT_LANGUAGE) {
      return module.DEFAULT_LANGUAGE;
    }

    return 'en';
  }

  function getRtlLanguageCodes(primary) {
    const module = resolveLocaleModule(primary);

    if (
      module &&
      Array.isArray(module.RTL_LANGUAGE_CODES) &&
      module.RTL_LANGUAGE_CODES.length > 0
    ) {
      return module.RTL_LANGUAGE_CODES.slice();
    }

    return ['ar', 'fa', 'he', 'ur'];
  }

  function normalizeLanguageCode(lang, primary) {
    const module = resolveLocaleModule(primary);
    const defaultLanguage = getDefaultLanguage(primary);

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
    const normalized = normalizeLanguageCode(lang, primary);
    const base = normalized.split('-')[0];
    const rtlCodes = getRtlLanguageCodes(primary);

    return rtlCodes.indexOf(base) !== -1;
  }

  function resolveDocumentDirection(lang, primary) {
    const module = resolveLocaleModule(primary);

    if (module && typeof module.resolveDocumentDirection === 'function') {
      try {
        return module.resolveDocumentDirection(lang);
      } catch (resolveDirectionError) {
        void resolveDirectionError;
      }
    }

    if (typeof document !== 'undefined' && document && document.documentElement) {
      try {
        const docDir = document.documentElement.getAttribute('dir');
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
    const module = resolveLocaleModule(primary);

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

  const namespace = {
    resolveLocaleModule,
    normalizeLanguageCode,
    isRtlLanguage,
    resolveDocumentDirection,
    applyLocaleMetadata,
    getDefaultLanguage,
    getRtlLanguageCodes,
  };

  const globalScope = detectScope();
  const targetName = 'cineCoreLocalizationBridge';
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
