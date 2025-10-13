/* global CORE_GLOBAL_SCOPE */

(function () {
  function detectScope(primary) {
    if (primary && (typeof primary === 'object' || typeof primary === 'function')) {
      return primary;
    }

    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object') {
      return CORE_GLOBAL_SCOPE;
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

  function resolveLocalizationFallbackRegistryFromScopes(primary) {
    const candidateScopes = [
      primary && (typeof primary === 'object' || typeof primary === 'function') ? primary : null,
      typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object'
        ? CORE_GLOBAL_SCOPE
        : null,
      typeof globalThis !== 'undefined' && typeof globalThis === 'object' ? globalThis : null,
      typeof window !== 'undefined' && typeof window === 'object' ? window : null,
      typeof self !== 'undefined' && typeof self === 'object' ? self : null,
      typeof global !== 'undefined' && typeof global === 'object' ? global : null,
    ];

    for (let index = 0; index < candidateScopes.length; index += 1) {
      const scope = candidateScopes[index];
      if (!scope) {
        continue;
      }

      try {
        const registryCandidate = scope.cineCoreLocalizationFallbackRegistry;
        if (
          registryCandidate &&
          typeof registryCandidate.createFallbackResolvers === 'function'
        ) {
          return registryCandidate;
        }
      } catch (registryLookupError) {
        void registryLookupError;
      }
    }

    return null;
  }

  function createInlineLocalizationFallbackResolversFallback(options) {
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

      function normalizeRtlCodes(fallbackOptions) {
        if (fallbackOptions && Array.isArray(fallbackOptions.rtlLanguageCodes)) {
          const normalized = [];

          for (let index = 0; index < fallbackOptions.rtlLanguageCodes.length; index += 1) {
            const rawCode = fallbackOptions.rtlLanguageCodes[index];
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

      function createLocaleFallbacks(fallbackOptions) {
        const defaultLanguage = normalizeLanguageCodeValue(
          fallbackOptions && fallbackOptions.defaultLanguage,
          'en'
        );
        const rtlLanguageCodes = normalizeRtlCodes(fallbackOptions);

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
      };
    }

    const directNamespace = resolveLocalizationFallbackNamespaceFromCandidate(
      options && options.directNamespace
    );
    const inlineNamespace = directNamespace
      ? null
      : resolveLocalizationFallbackNamespaceFromCandidate(options && options.inlineNamespace);

    const namespace =
      directNamespace ||
      inlineNamespace ||
      resolveLocalizationFallbackNamespaceFromCandidate(
        createMinimalLocalizationFallbackNamespace()
      );

    const safeNamespace = namespace || createMinimalLocalizationFallbackNamespace();

    function fallbackResolveLocaleModuleProxy(scope) {
      if (safeNamespace && typeof safeNamespace.fallbackResolveLocaleModule === 'function') {
        try {
          return safeNamespace.fallbackResolveLocaleModule(scope);
        } catch (fallbackError) {
          void fallbackError;
        }
      }

      return null;
    }

    function createLocaleFallbacksProxy(fallbackOptions) {
      if (safeNamespace && typeof safeNamespace.createLocaleFallbacks === 'function') {
        try {
          return safeNamespace.createLocaleFallbacks(fallbackOptions);
        } catch (createFallbackError) {
          void createFallbackError;
        }
      }

      return null;
    }

    return {
      namespace: safeNamespace,
      fallbackResolveLocaleModule: fallbackResolveLocaleModuleProxy,
      createLocaleFallbacks: createLocaleFallbacksProxy,
    };
  }

  function tryRequireLocalizationFallbackRegistry(options) {
    if (options && typeof options.requireLocalizationFallbackRegistry === 'function') {
      try {
        const required = options.requireLocalizationFallbackRegistry();
        if (required && typeof required.createFallbackResolvers === 'function') {
          return required;
        }
      } catch (registryRequireError) {
        void registryRequireError;
      }
    }

    if (typeof require === 'function') {
      try {
        const required = require('./localization-fallback-registry.js');
        if (required && typeof required.createFallbackResolvers === 'function') {
          return required;
        }
      } catch (fallbackRegistryRequireError) {
        void fallbackRegistryRequireError;
      }
    }

    return null;
  }

  function resolveInlineFallbackNamespace(options) {
    if (options && typeof options.requireInlineFallbackNamespace === 'function') {
      try {
        const required = options.requireInlineFallbackNamespace();
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (inlineRequireError) {
        void inlineRequireError;
      }
    }

    if (typeof require === 'function') {
      try {
        const required = require('./localization-inline-fallbacks.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (requireInlineFallbackError) {
        void requireInlineFallbackError;
      }
    }

    return null;
  }

  function createInlineFallbackRegistry() {
    return {
      createFallbackResolvers(fallbackOptions) {
        return createInlineLocalizationFallbackResolversFallback(fallbackOptions);
      },
    };
  }

  function createLocalizationFallbackSupport(options) {
    const coreRegistry =
      options && options.coreRegistry &&
      typeof options.coreRegistry.createFallbackResolvers === 'function'
        ? options.coreRegistry
        : null;

    const scopedRegistry = resolveLocalizationFallbackRegistryFromScopes(
      options && options.primaryScope
    );

    const requiredRegistry = tryRequireLocalizationFallbackRegistry(options);

    const registry = coreRegistry || scopedRegistry || requiredRegistry || createInlineFallbackRegistry();

    const resolverOptions = {
      directNamespace: options && options.directNamespace,
      inlineNamespace: options && options.inlineNamespace,
      requireInlineFallbackNamespace() {
        return resolveInlineFallbackNamespace(options);
      },
    };

    const resolvers =
      registry && typeof registry.createFallbackResolvers === 'function'
        ? registry.createFallbackResolvers(resolverOptions)
        : createInlineLocalizationFallbackResolversFallback(resolverOptions);

    const namespace =
      resolvers && resolvers.namespace && typeof resolvers.namespace === 'object'
        ? resolvers.namespace
        : null;

    function fallbackResolveLocaleModuleProxy(scope) {
      if (resolvers && typeof resolvers.fallbackResolveLocaleModule === 'function') {
        try {
          return resolvers.fallbackResolveLocaleModule(scope);
        } catch (fallbackError) {
          void fallbackError;
        }
      }

      return null;
    }

    function createLocaleFallbacksProxy(fallbackOptions) {
      if (resolvers && typeof resolvers.createLocaleFallbacks === 'function') {
        try {
          return resolvers.createLocaleFallbacks(fallbackOptions);
        } catch (createFallbackError) {
          void createFallbackError;
        }
      }

      return null;
    }

    return {
      registry,
      resolvers,
      namespace,
      fallbackResolveLocaleModule: fallbackResolveLocaleModuleProxy,
      createLocaleFallbacks: createLocaleFallbacksProxy,
    };
  }

  const namespace = {
    resolveLocalizationFallbackRegistryFromScopes,
    createInlineLocalizationFallbackResolversFallback,
    createLocalizationFallbackSupport,
  };

  const globalScope = detectScope();
  const targetName = 'cineCoreLocalizationFallbackResolution';
  const existing = globalScope && typeof globalScope[targetName] === 'object'
    ? globalScope[targetName]
    : {};

  for (const key of Object.keys(namespace)) {
    existing[key] = namespace[key];
  }

  if (globalScope && typeof globalScope === 'object') {
    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
