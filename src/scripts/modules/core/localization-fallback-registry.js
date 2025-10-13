(function () {
  function resolveLocalizationFallbackNamespaceFromCandidate(candidate) {
    if (!candidate || (typeof candidate !== 'object' && typeof candidate !== 'function')) {
      return null;
    }

    if (typeof candidate.createInlineLocalizationFallbackNamespace === 'function') {
      try {
        const generated = candidate.createInlineLocalizationFallbackNamespace();
        if (generated && typeof generated === 'object') {
          return generated;
        }
      } catch (inlineNamespaceError) {
        void inlineNamespaceError;
      }
    }

    if (typeof candidate.createNamespace === 'function') {
      try {
        const created = candidate.createNamespace();
        if (created && typeof created === 'object') {
          return created;
        }
      } catch (namespaceCreateError) {
        void namespaceCreateError;
      }
    }

    if (
      typeof candidate.fallbackResolveLocaleModule === 'function' &&
      typeof candidate.createLocaleFallbacks === 'function'
    ) {
      return candidate;
    }

    return null;
  }

  function createMinimalLocalizationFallbackNamespace() {
    function normalizeLanguageCodeValue(lang, defaultLanguage) {
      if (!lang) {
        return defaultLanguage;
      }

      try {
        const normalized = String(lang).trim().toLowerCase();
        return normalized || defaultLanguage;
      } catch (languageNormalizeError) {
        void languageNormalizeError;
      }

      return defaultLanguage;
    }

    function normalizeRtlCodes(options) {
      if (options && Array.isArray(options.rtlLanguageCodes)) {
        const normalized = [];

        for (let index = 0; index < options.rtlLanguageCodes.length; index += 1) {
          const rawCode = options.rtlLanguageCodes[index];
          const code = normalizeLanguageCodeValue(String(rawCode || ''), '');
          if (code && normalized.indexOf(code) === -1) {
            normalized.push(code);
          }
        }

        if (normalized.length > 0) {
          return normalized;
        }
      }

      return ['ar', 'fa', 'he', 'ur'];
    }

    function fallbackResolveLocaleModule(scope) {
      const candidates = [];

      if (scope && (typeof scope === 'object' || typeof scope === 'function')) {
        candidates.push(scope);
      }
      if (typeof globalThis !== 'undefined') candidates.push(globalThis);
      if (typeof window !== 'undefined') candidates.push(window);
      if (typeof self !== 'undefined') candidates.push(self);
      if (typeof global !== 'undefined') candidates.push(global);

      for (let index = 0; index < candidates.length; index += 1) {
        const candidate = candidates[index];
        if (!candidate || (typeof candidate !== 'object' && typeof candidate !== 'function')) {
          continue;
        }

        try {
          const moduleCandidate = candidate.cineLocale;
          if (moduleCandidate && typeof moduleCandidate === 'object') {
            return moduleCandidate;
          }
        } catch (localeLookupError) {
          void localeLookupError;
        }
      }

      if (typeof require === 'function') {
        try {
          const required = require('./localization.js');
          if (required && typeof required === 'object') {
            return required;
          }
        } catch (localeRequireError) {
          void localeRequireError;
        }
      }

      return null;
    }

    function createLocaleFallbacks(options) {
      const defaultLanguage = normalizeLanguageCodeValue(
        options && options.defaultLanguage,
        'en'
      );
      const rtlLanguageCodes = normalizeRtlCodes(options);

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

    return {
      fallbackResolveLocaleModule,
      createLocaleFallbacks,
      createNamespace() {
        return this;
      },
      createInlineLocalizationFallbackNamespace() {
        return this;
      },
    };
  }

  function resolveInlineFallbackNamespace(options) {
    if (options && typeof options.requireInlineFallbackNamespace === 'function') {
      try {
        return options.requireInlineFallbackNamespace();
      } catch (inlineRequireError) {
        void inlineRequireError;
      }
    }

    if (typeof require === 'function') {
      try {
        return require('./localization-inline-fallbacks.js');
      } catch (inlineRequireError) {
        void inlineRequireError;
      }
    }

    return null;
  }

  function resolveLocalizationFallbackNamespace(options) {
    const directNamespace = resolveLocalizationFallbackNamespaceFromCandidate(
      options && options.directNamespace
    );
    if (directNamespace) {
      return directNamespace;
    }

    const inlineNamespace = resolveLocalizationFallbackNamespaceFromCandidate(
      options && options.inlineNamespace
    );
    if (inlineNamespace) {
      return inlineNamespace;
    }

    const requiredInline = resolveLocalizationFallbackNamespaceFromCandidate(
      resolveInlineFallbackNamespace(options)
    );
    if (requiredInline) {
      return requiredInline;
    }

    const createMinimal =
      options && typeof options.createMinimalNamespace === 'function'
        ? options.createMinimalNamespace
        : createMinimalLocalizationFallbackNamespace;

    return resolveLocalizationFallbackNamespaceFromCandidate(createMinimal());
  }

  function createFallbackResolvers(options) {
    const namespace = resolveLocalizationFallbackNamespace(options);

    function fallbackResolveLocaleModuleProxy(scope) {
      if (
        namespace &&
        typeof namespace.fallbackResolveLocaleModule === 'function'
      ) {
        try {
          return namespace.fallbackResolveLocaleModule(scope);
        } catch (fallbackError) {
          void fallbackError;
        }
      }

      return null;
    }

    function createLocaleFallbacksProxy(fallbackOptions) {
      if (namespace && typeof namespace.createLocaleFallbacks === 'function') {
        try {
          return namespace.createLocaleFallbacks(fallbackOptions);
        } catch (createFallbackError) {
          void createFallbackError;
        }
      }

      return null;
    }

    return {
      namespace,
      fallbackResolveLocaleModule: fallbackResolveLocaleModuleProxy,
      createLocaleFallbacks: createLocaleFallbacksProxy,
    };
  }

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

  const namespace = {
    resolveLocalizationFallbackNamespaceFromCandidate,
    createMinimalLocalizationFallbackNamespace,
    resolveLocalizationFallbackNamespace,
    createFallbackResolvers,
  };

  const globalScope = detectGlobalScope();
  const targetName = 'cineCoreLocalizationFallbackRegistry';
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
