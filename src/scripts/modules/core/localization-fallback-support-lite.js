(function () {
  function createBasicLocalizationFallbackResolvers(options) {
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

    function resolveRtlCodes(fallbackOptions) {
      if (fallbackOptions && Array.isArray(fallbackOptions.rtlLanguageCodes)) {
        const codes = [];

        for (let index = 0; index < fallbackOptions.rtlLanguageCodes.length; index += 1) {
          const rawCode = fallbackOptions.rtlLanguageCodes[index];
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

    function createLocaleFallbackHelpers(fallbackOptions) {
      const defaultLanguage = normalizeLanguageCodeValue(
        fallbackOptions && fallbackOptions.defaultLanguage,
        'en'
      );
      const rtlLanguageCodes = resolveRtlCodes(fallbackOptions);

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

    const namespace = {
      fallbackResolveLocaleModule() {
        return null;
      },
      createLocaleFallbacks(fallbackOptions) {
        return createLocaleFallbackHelpers(fallbackOptions || options || {});
      },
    };

    return {
      namespace,
      fallbackResolveLocaleModule(scope) {
        void scope;
        return null;
      },
      createLocaleFallbacks(fallbackOptions) {
        return createLocaleFallbackHelpers(fallbackOptions || options || {});
      },
    };
  }

  function createLocalizationFallbackContext(configuration) {
    const config = configuration || {};
    const fallbackResolutionModule = config.fallbackResolutionModule;
    const fallbackRegistryModule = config.fallbackRegistryModule;
    const directNamespace = config.directNamespace;
    const inlineNamespace = config.inlineNamespace;
    const requireFallbackRegistry =
      typeof config.requireLocalizationFallbackRegistry === 'function'
        ? config.requireLocalizationFallbackRegistry
        : function requireLocalizationFallbackRegistryFallback() {
            return null;
          };
    const requireInlineFallbackNamespace =
      typeof config.requireInlineFallbackNamespace === 'function'
        ? config.requireInlineFallbackNamespace
        : function requireInlineFallbackNamespaceFallback() {
            return null;
          };

    const support =
      fallbackResolutionModule &&
      typeof fallbackResolutionModule.createLocalizationFallbackSupport === 'function'
        ? fallbackResolutionModule.createLocalizationFallbackSupport({
            coreRegistry: fallbackRegistryModule,
            directNamespace,
            inlineNamespace,
            requireLocalizationFallbackRegistry: requireFallbackRegistry,
            requireInlineFallbackNamespace,
          })
        : null;

    const inlineFactory =
      fallbackResolutionModule &&
      typeof fallbackResolutionModule.createInlineLocalizationFallbackResolversFallback ===
        'function'
        ? function inlineLocalizationFallbackResolverFactory(options) {
            return fallbackResolutionModule.createInlineLocalizationFallbackResolversFallback(
              options
            );
          }
        : function basicLocalizationFallbackResolverFactory(options) {
            return createBasicLocalizationFallbackResolvers(options);
          };

    const registry =
      (support && support.registry) ||
      (fallbackRegistryModule &&
      typeof fallbackRegistryModule.createFallbackResolvers === 'function'
        ? fallbackRegistryModule
        : null) || {
        createFallbackResolvers(fallbackOptions) {
          return inlineFactory(fallbackOptions);
        },
      };

    const resolvers =
      (support && support.resolvers) ||
      (registry && typeof registry.createFallbackResolvers === 'function'
        ? registry.createFallbackResolvers({
            directNamespace,
            inlineNamespace,
          })
        : inlineFactory({
            directNamespace,
            inlineNamespace,
          }));

    const namespace =
      (support && support.namespace) ||
      (resolvers && resolvers.namespace && typeof resolvers.namespace === 'object'
        ? resolvers.namespace
        : null);

    function createMethodProxy(methodName, fallbackValue) {
      const providers = [];

      if (support && typeof support[methodName] === 'function') {
        providers.push({ fn: support[methodName], target: support });
      }

      if (resolvers && typeof resolvers[methodName] === 'function') {
        providers.push({ fn: resolvers[methodName], target: resolvers });
      }

      if (providers.length === 0) {
        return function fallbackMethodProxy() {
          return fallbackValue;
        };
      }

      return function resilientMethodProxy() {
        const args = arguments;

        for (let index = 0; index < providers.length; index += 1) {
          const provider = providers[index];
          try {
            return provider.fn.apply(provider.target, args);
          } catch (providerError) {
            void providerError;
          }
        }

        return fallbackValue;
      };
    }

    const fallbackResolveLocaleModule = createMethodProxy('fallbackResolveLocaleModule', null);
    const createLocaleFallbacks = createMethodProxy('createLocaleFallbacks', null);

    return {
      support,
      registry,
      resolvers,
      namespace,
      fallbackResolveLocaleModule,
      createLocaleFallbacks,
    };
  }

  const namespace = {
    createBasicLocalizationFallbackResolvers,
    createLocalizationFallbackContext,
  };

  const globalScope =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global) ||
    null;

  if (globalScope && typeof globalScope === 'object') {
    const targetName = 'cineCoreLocalizationFallbackSupportLite';
    const existing =
      (typeof globalScope[targetName] === 'object' && globalScope[targetName]) || {};

    for (const key of Object.keys(namespace)) {
      existing[key] = namespace[key];
    }

    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
