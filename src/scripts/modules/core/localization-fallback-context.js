/* global CORE_GLOBAL_SCOPE */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
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

  function ensureRequireLocalizationFallbackRegistry(candidate) {
    if (typeof candidate === 'function') {
      return candidate;
    }

    return function requireLocalizationFallbackRegistry() {
      if (typeof require === 'function') {
        try {
          return require('./localization-fallback-registry.js');
        } catch (fallbackRegistryRequireError) {
          void fallbackRegistryRequireError;
        }
      }

      return null;
    };
  }

  function ensureRequireInlineLocalizationFallbackNamespace(candidate) {
    if (typeof candidate === 'function') {
      return candidate;
    }

    return function requireInlineLocalizationFallbackNamespace() {
      if (typeof require === 'function') {
        try {
          return require('./localization-inline-fallbacks.js');
        } catch (inlineRequireError) {
          void inlineRequireError;
        }
      }

      return null;
    };
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

  function createBasicLocalizationFallbackResolvers(options) {
    return {
      namespace: {
        fallbackResolveLocaleModule() {
          return null;
        },
        createLocaleFallbacks(fallbackOptions) {
          return createLocaleFallbackHelpers(fallbackOptions || options || {});
        },
      },
      fallbackResolveLocaleModule() {
        return null;
      },
      createLocaleFallbacks(fallbackOptions) {
        return createLocaleFallbackHelpers(fallbackOptions || options || {});
      },
    };
  }

  function createLegacyLocalizationFallbackContext(options) {
    const config = options || {};
    const resolverOptions = {
      directNamespace: config.directNamespace,
      inlineNamespace: config.inlineNamespace,
    };

    const inlineResolverFactory =
      config.fallbackResolutionModule &&
      typeof config.fallbackResolutionModule
        .createInlineLocalizationFallbackResolversFallback === 'function'
        ? function inlineLocalizationFallbackResolverFactory(resolverOptionsCandidate) {
            return config.fallbackResolutionModule.createInlineLocalizationFallbackResolversFallback(
              resolverOptionsCandidate || resolverOptions
            );
          }
        : function basicInlineLocalizationFallbackResolverFactory(resolverOptionsCandidate) {
            return createBasicLocalizationFallbackResolvers(
              resolverOptionsCandidate || options
            );
          };

    const requireLocalizationFallbackRegistry = ensureRequireLocalizationFallbackRegistry(
      config.requireLocalizationFallbackRegistry
    );
    const requireInlineFallbackNamespace = ensureRequireInlineLocalizationFallbackNamespace(
      config.requireInlineFallbackNamespace
    );

    const support =
      config.fallbackResolutionModule &&
      typeof config.fallbackResolutionModule.createLocalizationFallbackSupport === 'function'
        ? config.fallbackResolutionModule.createLocalizationFallbackSupport({
            coreRegistry: config.fallbackRegistryModule,
            directNamespace: config.directNamespace,
            inlineNamespace: config.inlineNamespace,
            requireLocalizationFallbackRegistry,
            requireInlineFallbackNamespace,
          })
        : null;

    const registry =
      (support && support.registry) ||
      (config.fallbackRegistryModule &&
      typeof config.fallbackRegistryModule.createFallbackResolvers === 'function'
        ? config.fallbackRegistryModule
        : {
            createFallbackResolvers(fallbackOptions) {
              return inlineResolverFactory(fallbackOptions || resolverOptions);
            },
          });

    const resolvers =
      (support && support.resolvers) ||
      (registry && typeof registry.createFallbackResolvers === 'function'
        ? registry.createFallbackResolvers(resolverOptions)
        : inlineResolverFactory(resolverOptions));

    const namespace =
      (support && support.namespace) ||
      (resolvers && isObject(resolvers.namespace) ? resolvers.namespace : null);

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
          } catch (proxyError) {
            void proxyError;
          }
        }

        return fallbackValue;
      };
    }

    return {
      support,
      registry,
      resolvers,
      namespace,
      fallbackResolveLocaleModule: createMethodProxy('fallbackResolveLocaleModule', null),
      createLocaleFallbacks: createMethodProxy('createLocaleFallbacks', null),
    };
  }

  function createLocalizationFallbackRuntimeContext(options) {
    const config = options || {};
    const fallbackSupportLite = config.fallbackSupportLite;
    const createContext =
      fallbackSupportLite &&
      typeof fallbackSupportLite.createLocalizationFallbackContext === 'function'
        ? fallbackSupportLite.createLocalizationFallbackContext
        : null;

    if (createContext) {
      try {
        const context = createContext({
          fallbackResolutionModule: config.fallbackResolutionModule,
          fallbackRegistryModule: config.fallbackRegistryModule,
          directNamespace: config.directNamespace,
          inlineNamespace: config.inlineNamespace,
          requireLocalizationFallbackRegistry: ensureRequireLocalizationFallbackRegistry(
            config.requireLocalizationFallbackRegistry
          ),
          requireInlineFallbackNamespace: ensureRequireInlineLocalizationFallbackNamespace(
            config.requireInlineFallbackNamespace
          ),
        });

        if (isObject(context)) {
          return context;
        }
      } catch (createLocalizationFallbackContextError) {
        void createLocalizationFallbackContextError;
      }
    }

    return createLegacyLocalizationFallbackContext(config);
  }

  const namespace = Object.freeze({
    createBasicLocalizationFallbackResolvers,
    createLegacyLocalizationFallbackContext,
    createLocalizationFallbackRuntimeContext,
  });

  const scope = detectGlobalScope();

  if (isObject(scope)) {
    try {
      scope.cineCoreLocalizationFallbackContext = namespace;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
