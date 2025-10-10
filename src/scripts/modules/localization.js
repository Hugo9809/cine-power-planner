/* global cineModuleBase */

(function () {
  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    return {};
  }

  const GLOBAL_SCOPE = detectGlobalScope();

  function resolveModuleBase(scope) {
    if (typeof cineModuleBase === 'object' && cineModuleBase) {
      return cineModuleBase;
    }

    if (typeof require === 'function') {
      try {
        const required = require('./base.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (scope && typeof scope.cineModuleBase === 'object') {
      return scope.cineModuleBase;
    }

    return null;
  }

  const MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }

  const moduleRegistry = typeof MODULE_BASE.getModuleRegistry === 'function'
    ? MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE)
    : null;

  const freezeDeep = typeof MODULE_BASE.freezeDeep === 'function'
    ? function freezeWithBase(value) {
        try {
          return MODULE_BASE.freezeDeep(value);
        } catch (error) {
          void error;
        }
        return value;
      }
    : function identity(value) {
        return value;
      };

  const exposeGlobal = typeof MODULE_BASE.exposeGlobal === 'function'
    ? function expose(name, value, options) {
        return MODULE_BASE.exposeGlobal(name, value, GLOBAL_SCOPE, options || {});
      }
    : function fallbackExpose(name, value) {
        try {
          GLOBAL_SCOPE[name] = value;
          return true;
        } catch (error) {
          void error;
        }
        return false;
      };

  const registerOrQueueModule = typeof MODULE_BASE.registerOrQueueModule === 'function'
    ? function register(name, api, options, onError) {
        return MODULE_BASE.registerOrQueueModule(
          name,
          api,
          options,
          onError,
          GLOBAL_SCOPE,
          moduleRegistry,
        );
      }
    : function fallbackRegister() {
        return false;
      };

  const safeWarn = typeof MODULE_BASE.safeWarn === 'function'
    ? function warn(message, detail) {
        try {
          MODULE_BASE.safeWarn(message, detail);
        } catch (error) {
          void error;
        }
      }
    : function fallbackWarn(message, detail) {
        if (typeof console === 'undefined' || !console || typeof console.warn !== 'function') {
          return;
        }
        try {
          if (typeof detail === 'undefined') {
            console.warn(message);
          } else {
            console.warn(message, detail);
          }
        } catch (error) {
          void error;
        }
      };

  const DEFAULT_LANGUAGE = 'en';
  const RTL_LANGUAGE_CODES = ['ar', 'fa', 'he', 'ur'];

  function normalizeLanguageCode(lang) {
    if (!lang) return DEFAULT_LANGUAGE;
    try {
      return String(lang).trim().toLowerCase();
    } catch (languageNormalizeError) {
      void languageNormalizeError;
    }
    return DEFAULT_LANGUAGE;
  }

  function isRtlLanguage(lang) {
    const normalized = normalizeLanguageCode(lang);
    const base = normalized.split('-')[0];
    return RTL_LANGUAGE_CODES.indexOf(base) !== -1;
  }

  function resolveDocumentDirection(lang, doc) {
    const targetDocument = doc || (typeof document !== 'undefined' ? document : null);
    if (targetDocument && targetDocument.documentElement) {
      try {
        const docDir = targetDocument.documentElement.getAttribute('dir');
        if (docDir === 'rtl' || docDir === 'ltr') {
          return docDir;
        }
      } catch (error) {
        void error;
      }
    }
    return isRtlLanguage(lang) ? 'rtl' : 'ltr';
  }

  function applyLocaleMetadata(target, lang, direction) {
    if (!target) return;
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

  const localeAPI = {
    DEFAULT_LANGUAGE,
    RTL_LANGUAGE_CODES: freezeDeep([].concat(RTL_LANGUAGE_CODES)),
    normalizeLanguageCode,
    isRtlLanguage,
    resolveDocumentDirection,
    applyLocaleMetadata,
  };

  freezeDeep(localeAPI);

  registerOrQueueModule('cineLocale', localeAPI, {
    category: 'localisation',
    description: 'Language helpers shared between the runtime core and UI modules.',
    replace: true,
  }, function (error) {
    safeWarn('Unable to register cineLocale module.', error);
  });

  exposeGlobal('cineLocale', localeAPI, {
    configurable: true,
    enumerable: false,
    writable: false,
  });

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = localeAPI;
  }
})();
