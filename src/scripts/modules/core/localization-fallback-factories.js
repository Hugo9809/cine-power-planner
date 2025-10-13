/* global CORE_PART1_RUNTIME_SCOPE, CORE_GLOBAL_SCOPE */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function registerScope(scopes, scope) {
    if (!isObject(scope) || scopes.indexOf(scope) !== -1) {
      return;
    }

    scopes.push(scope);
  }

  function collectScopeCandidates(primaryScope) {
    const scopes = [];

    registerScope(scopes, primaryScope);

    if (typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined') {
      registerScope(scopes, CORE_PART1_RUNTIME_SCOPE);
    }

    if (typeof CORE_GLOBAL_SCOPE !== 'undefined') {
      registerScope(scopes, CORE_GLOBAL_SCOPE);
    }

    if (typeof globalThis !== 'undefined') {
      registerScope(scopes, globalThis);
    }

    if (typeof window !== 'undefined') {
      registerScope(scopes, window);
    }

    if (typeof self !== 'undefined') {
      registerScope(scopes, self);
    }

    if (typeof global !== 'undefined') {
      registerScope(scopes, global);
    }

    return scopes;
  }

  function resolveLocalizationFallbackContextNamespace(primaryScope) {
    const scopeCandidates = collectScopeCandidates(primaryScope);

    for (let index = 0; index < scopeCandidates.length; index += 1) {
      const candidateScope = scopeCandidates[index];

      try {
        const candidate = candidateScope.cineCoreLocalizationFallbackContext;
        if (isObject(candidate)) {
          return candidate;
        }
      } catch (lookupError) {
        void lookupError;
      }
    }

    if (typeof require === 'function') {
      try {
        const required = require('./localization-fallback-context.js');
        if (isObject(required)) {
          return required;
        }
      } catch (fallbackRequireError) {
        void fallbackRequireError;
      }
    }

    for (let retryIndex = 0; retryIndex < scopeCandidates.length; retryIndex += 1) {
      const retryScope = scopeCandidates[retryIndex];

      try {
        const retryCandidate = retryScope.cineCoreLocalizationFallbackContext;
        if (isObject(retryCandidate)) {
          return retryCandidate;
        }
      } catch (retryLookupError) {
        void retryLookupError;
      }
    }

    return null;
  }

  function normalizeLanguageCodeValue(lang, defaultLanguage) {
    if (!lang) {
      return defaultLanguage;
    }

    try {
      const normalized = String(lang).trim().toLowerCase();
      return normalized || defaultLanguage;
    } catch (normalizeError) {
      void normalizeError;
    }

    return defaultLanguage;
  }

  function resolveRtlCodes(config) {
    if (config && Array.isArray(config.rtlLanguageCodes)) {
      const codes = [];

      for (let index = 0; index < config.rtlLanguageCodes.length; index += 1) {
        const rawCode = config.rtlLanguageCodes[index];
        const normalized = normalizeLanguageCodeValue(String(rawCode || ''), '');
        if (normalized && codes.indexOf(normalized) === -1) {
          codes.push(normalized);
        }
      }

      if (codes.length > 0) {
        return codes;
      }
    }

    return ['ar', 'fa', 'he', 'ur'];
  }

  function createLocaleFallbackHelpers(baseOptions) {
    const config = baseOptions || {};
    const defaultLanguage = normalizeLanguageCodeValue(config.defaultLanguage, 'en');
    const rtlLanguageCodes = resolveRtlCodes(config);

    function normalizeLanguageCode(lang) {
      return normalizeLanguageCodeValue(lang, defaultLanguage);
    }

    function isRtlLanguage(lang) {
      const normalized = normalizeLanguageCodeValue(lang, defaultLanguage);
      const base = normalized.split('-')[0];
      return rtlLanguageCodes.indexOf(base) !== -1;
    }

    function resolveDocumentDirection(lang) {
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

      return isRtlLanguage(lang) ? 'rtl' : 'ltr';
    }

    function applyLocaleMetadata(target, lang, direction) {
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

    return {
      getDefaultLanguage() {
        return defaultLanguage;
      },
      getRtlLanguageCodes() {
        return rtlLanguageCodes.slice();
      },
      resolveLocaleModule() {
        return null;
      },
      normalizeLanguageCode,
      isRtlLanguage,
      resolveDocumentDirection,
      applyLocaleMetadata,
    };
  }

  function createBasicLocalizationFallbackResolversFallback(options) {
    const baseOptions = options || {};

    return {
      namespace: {
        fallbackResolveLocaleModule() {
          return null;
        },
        createLocaleFallbacks(fallbackOptions) {
          return createLocaleFallbackHelpers(fallbackOptions || baseOptions);
        },
      },
      fallbackResolveLocaleModule() {
        return null;
      },
      createLocaleFallbacks(fallbackOptions) {
        return createLocaleFallbackHelpers(fallbackOptions || baseOptions);
      },
    };
  }

  function createLegacyLocalizationFallbackContextFallback(options) {
    const resolvers = createBasicLocalizationFallbackResolversFallback(options);
    const namespace =
      resolvers && resolvers.namespace && typeof resolvers.namespace === 'object'
        ? resolvers.namespace
        : {
            fallbackResolveLocaleModule() {
              return null;
            },
            createLocaleFallbacks() {
              return null;
            },
          };

    return {
      support: null,
      registry: {
        createFallbackResolvers(fallbackOptions) {
          return createBasicLocalizationFallbackResolversFallback(fallbackOptions || options);
        },
      },
      resolvers,
      namespace,
      fallbackResolveLocaleModule: namespace.fallbackResolveLocaleModule,
      createLocaleFallbacks: namespace.createLocaleFallbacks,
    };
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

  const namespace = {
    resolveLocalizationFallbackContextNamespace,
    createBasicLocalizationFallbackResolversFallback,
    createLegacyLocalizationFallbackContextFallback,
  };

  const globalScope = detectGlobalScope();
  const targetName = 'cineCoreLocalizationFallbackFactories';
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
