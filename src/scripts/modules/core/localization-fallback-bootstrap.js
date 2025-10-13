(function () {
  function isScopeCandidate(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function registerScope(scopes, scope) {
    if (!isScopeCandidate(scope)) {
      return;
    }

    if (scopes.indexOf(scope) === -1) {
      scopes.push(scope);
    }
  }

  function collectDefaultGlobalScopes(scopes) {
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
  }

  function fallbackNormalizeLanguageCodeValue(lang, defaultLanguage) {
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

  function fallbackResolveRtlCodes(config) {
    if (config && Array.isArray(config.rtlLanguageCodes)) {
      const codes = [];

      for (let index = 0; index < config.rtlLanguageCodes.length; index += 1) {
        const rawCode = config.rtlLanguageCodes[index];
        const normalized = fallbackNormalizeLanguageCodeValue(String(rawCode || ''), '');

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

  function fallbackCreateLocaleFallbackHelpers(baseOptions) {
    const config = baseOptions || {};
    const defaultLanguage = fallbackNormalizeLanguageCodeValue(
      config.defaultLanguage,
      'en'
    );
    const rtlLanguageCodes = fallbackResolveRtlCodes(config);

    function normalizeLanguageCode(lang) {
      return fallbackNormalizeLanguageCodeValue(lang, defaultLanguage);
    }

    function isRtlLanguage(lang) {
      const normalized = fallbackNormalizeLanguageCodeValue(lang, defaultLanguage);
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

  function fallbackCreateBasicLocalizationFallbackResolvers(options) {
    const baseOptions = options || {};

    return {
      namespace: {
        fallbackResolveLocaleModule() {
          return null;
        },
        createLocaleFallbacks(fallbackOptions) {
          return fallbackCreateLocaleFallbackHelpers(fallbackOptions || baseOptions);
        },
      },
      fallbackResolveLocaleModule() {
        return null;
      },
      createLocaleFallbacks(fallbackOptions) {
        return fallbackCreateLocaleFallbackHelpers(fallbackOptions || baseOptions);
      },
    };
  }

  function fallbackCreateLegacyLocalizationFallbackContext(options) {
    const resolvers = fallbackCreateBasicLocalizationFallbackResolvers(options);
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
          return fallbackCreateBasicLocalizationFallbackResolvers(
            fallbackOptions || options
          );
        },
      },
      resolvers,
      namespace,
      fallbackResolveLocaleModule: namespace.fallbackResolveLocaleModule,
      createLocaleFallbacks: namespace.createLocaleFallbacks,
    };
  }

  function setupLocalizationFallbacks(options) {
    const settings = options && typeof options === 'object' ? options : {};
    const {
      primaryRuntimeScope = null,
      coreGlobalScope = null,
      localizationFallbackFactories = null,
      localizationFallbacks = null,
      inlineLocalizationFallbacks = null,
      localizationFallbackRegistry = null,
      localizationFallbackResolution = null,
      localizationFallbackSupportLite = null,
      localizationInlineSupport = null,
      resolveCoreSupportModule: resolveSupportModule = null,
      requireFn = typeof require === 'function' ? require : null,
    } = settings;

    function fallbackRegisterLocalizationScope(scopes, scope) {
      registerScope(scopes, scope);
    }

    function fallbackCollectLocalizationFactoryScopes(primaryScope) {
      const scopes = [];

      fallbackRegisterLocalizationScope(scopes, primaryScope);
      fallbackRegisterLocalizationScope(scopes, primaryRuntimeScope);
      fallbackRegisterLocalizationScope(scopes, coreGlobalScope);

      collectDefaultGlobalScopes(scopes);

      return scopes;
    }

    function fallbackEnsureLocalizationFallbackFactories(primaryScope) {
      if (localizationFallbackFactories && typeof localizationFallbackFactories === 'object') {
        return localizationFallbackFactories;
      }

      const candidateScopes = fallbackCollectLocalizationFactoryScopes(primaryScope);

      for (let index = 0; index < candidateScopes.length; index += 1) {
        const candidateScope = candidateScopes[index];

        try {
          const candidate =
            candidateScope && candidateScope.cineCoreLocalizationFallbackFactories;
          if (candidate && typeof candidate === 'object') {
            return candidate;
          }
        } catch (candidateLookupError) {
          void candidateLookupError;
        }
      }

      if (typeof resolveSupportModule === 'function') {
        try {
          const resolved = resolveSupportModule(
            'cineCoreLocalizationFallbackFactories',
            './localization-fallback-factories.js'
          );
          if (resolved && typeof resolved === 'object') {
            return resolved;
          }
        } catch (factoriesResolveError) {
          void factoriesResolveError;
        }
      }

      if (typeof requireFn === 'function') {
        try {
          const required = requireFn('./localization-fallback-factories.js');
          if (required && typeof required === 'object') {
            return required;
          }
        } catch (factoriesRequireError) {
          void factoriesRequireError;
        }
      }

      return null;
    }

    function fallbackResolveLocalizationFallbackContextNamespace(primaryScope) {
      const scopeCandidates = fallbackCollectLocalizationFactoryScopes(primaryScope);

      for (let index = 0; index < scopeCandidates.length; index += 1) {
        const candidateScope = scopeCandidates[index];

        try {
          const candidate =
            candidateScope && candidateScope.cineCoreLocalizationFallbackContext;
          if (candidate && typeof candidate === 'object') {
            return candidate;
          }
        } catch (fallbackContextLookupError) {
          void fallbackContextLookupError;
        }
      }

      if (typeof resolveSupportModule === 'function') {
        try {
          const resolved = resolveSupportModule(
            'cineCoreLocalizationFallbackContext',
            './localization-fallback-context.js'
          );
          if (resolved && typeof resolved === 'object') {
            return resolved;
          }
        } catch (fallbackContextResolveError) {
          void fallbackContextResolveError;
        }
      }

      if (typeof requireFn === 'function') {
        try {
          const required = requireFn('./localization-fallback-context.js');
          if (required && typeof required === 'object') {
            return required;
          }
        } catch (fallbackContextRequireError) {
          void fallbackContextRequireError;
        }
      }

      return null;
    }

    function fallbackCreateFallbackFactoryAccessor(methodName, inlineImplementation) {
      return function fallbackFactoryAccessor() {
        const args = arguments;
        const factories = fallbackEnsureLocalizationFallbackFactories(args[0]);

        if (factories && typeof factories[methodName] === 'function') {
          try {
            return factories[methodName].apply(factories, args);
          } catch (factoryInvokeError) {
            void factoryInvokeError;
          }
        }

        try {
          return inlineImplementation.apply(null, args);
        } catch (inlineInvokeError) {
          void inlineInvokeError;
        }

        return null;
      };
    }

    const collectLocalizationFactoryScopes =
      localizationInlineSupport &&
      typeof localizationInlineSupport.collectLocalizationFactoryScopes === 'function'
        ? function collectLocalizationFactoryScopesProxy(primaryScope) {
            return localizationInlineSupport.collectLocalizationFactoryScopes(primaryScope);
          }
        : fallbackCollectLocalizationFactoryScopes;

    const ensureLocalizationFallbackFactories =
      localizationInlineSupport &&
      typeof localizationInlineSupport.ensureLocalizationFallbackFactories === 'function'
        ? function ensureLocalizationFallbackFactoriesProxy(primaryScope) {
            return localizationInlineSupport.ensureLocalizationFallbackFactories(primaryScope);
          }
        : fallbackEnsureLocalizationFallbackFactories;

    const inlineResolveLocalizationFallbackContextNamespace =
      localizationInlineSupport &&
      typeof localizationInlineSupport.inlineResolveLocalizationFallbackContextNamespace ===
        'function'
        ? function inlineResolveLocalizationFallbackContextNamespaceProxy(primaryScope) {
            return localizationInlineSupport.inlineResolveLocalizationFallbackContextNamespace(
              primaryScope
            );
          }
        : fallbackResolveLocalizationFallbackContextNamespace;

    const inlineCreateBasicLocalizationFallbackResolvers =
      localizationInlineSupport &&
      typeof localizationInlineSupport.inlineCreateBasicLocalizationFallbackResolvers ===
        'function'
        ? function inlineCreateBasicLocalizationFallbackResolversProxy(options) {
            return localizationInlineSupport.inlineCreateBasicLocalizationFallbackResolvers(
              options
            );
          }
        : fallbackCreateBasicLocalizationFallbackResolvers;

    const inlineCreateLegacyLocalizationFallbackContext =
      localizationInlineSupport &&
      typeof localizationInlineSupport.inlineCreateLegacyLocalizationFallbackContext ===
        'function'
        ? function inlineCreateLegacyLocalizationFallbackContextProxy(options) {
            return localizationInlineSupport.inlineCreateLegacyLocalizationFallbackContext(
              options
            );
          }
        : fallbackCreateLegacyLocalizationFallbackContext;

    const createFallbackFactoryAccessor =
      localizationInlineSupport &&
      typeof localizationInlineSupport.createFallbackFactoryAccessor === 'function'
        ? function createFallbackFactoryAccessorProxy(methodName, inlineImplementation) {
            return localizationInlineSupport.createFallbackFactoryAccessor(
              methodName,
              inlineImplementation
            );
          }
        : fallbackCreateFallbackFactoryAccessor;

    const resolveLocalizationFallbackContextNamespace = createFallbackFactoryAccessor(
      'resolveLocalizationFallbackContextNamespace',
      inlineResolveLocalizationFallbackContextNamespace
    );

    const createBasicLocalizationFallbackResolversFallback = createFallbackFactoryAccessor(
      'createBasicLocalizationFallbackResolversFallback',
      inlineCreateBasicLocalizationFallbackResolvers
    );

    const createLegacyLocalizationFallbackContextFallback = createFallbackFactoryAccessor(
      'createLegacyLocalizationFallbackContextFallback',
      inlineCreateLegacyLocalizationFallbackContext
    );

    const localizationFallbackContextNamespace = resolveLocalizationFallbackContextNamespace();

    const createLocalizationFallbackRuntimeContext =
      localizationFallbackContextNamespace &&
      typeof localizationFallbackContextNamespace.createLocalizationFallbackRuntimeContext ===
        'function'
        ? localizationFallbackContextNamespace.createLocalizationFallbackRuntimeContext
        : null;

    const createLegacyLocalizationFallbackContext =
      localizationFallbackContextNamespace &&
      typeof localizationFallbackContextNamespace.createLegacyLocalizationFallbackContext ===
        'function'
        ? localizationFallbackContextNamespace.createLegacyLocalizationFallbackContext
        : createLegacyLocalizationFallbackContextFallback;

    const createBasicLocalizationFallbackResolvers =
      localizationFallbackContextNamespace &&
      typeof localizationFallbackContextNamespace.createBasicLocalizationFallbackResolvers ===
        'function'
        ? localizationFallbackContextNamespace.createBasicLocalizationFallbackResolvers
        : createBasicLocalizationFallbackResolversFallback;

    const localizationFallbackContext = (function resolveLocalizationFallbackContext() {
      if (createLocalizationFallbackRuntimeContext) {
        try {
          const context = createLocalizationFallbackRuntimeContext({
            fallbackSupportLite: localizationFallbackSupportLite,
            fallbackResolutionModule: localizationFallbackResolution,
            fallbackRegistryModule: localizationFallbackRegistry,
            directNamespace: localizationFallbacks,
            inlineNamespace: inlineLocalizationFallbacks,
            collectLocalizationFactoryScopes,
            ensureLocalizationFallbackFactories,
            resolveLocalizationFallbackContextNamespace,
          });

          if (context && typeof context === 'object') {
            return context;
          }
        } catch (createLocalizationFallbackContextError) {
          void createLocalizationFallbackContextError;
        }
      }

      const legacyContext = createLegacyLocalizationFallbackContext({
        fallbackSupportLite: localizationFallbackSupportLite,
        fallbackResolutionModule: localizationFallbackResolution,
        fallbackRegistryModule: localizationFallbackRegistry,
        directNamespace: localizationFallbacks,
        inlineNamespace: inlineLocalizationFallbacks,
        collectLocalizationFactoryScopes,
        ensureLocalizationFallbackFactories,
        resolveLocalizationFallbackContextNamespace,
      });

      return legacyContext && typeof legacyContext === 'object' ? legacyContext : null;
    })();

    const localizationFallbackSupport =
      (localizationFallbackContext && localizationFallbackContext.support) || null;

    const localizationFallbackRegistryInstance =
      (localizationFallbackContext && localizationFallbackContext.registry) ||
      (localizationFallbackRegistry &&
      typeof localizationFallbackRegistry.createFallbackResolvers === 'function'
        ? localizationFallbackRegistry
        : {
            createFallbackResolvers(fallbackOptions) {
              return createBasicLocalizationFallbackResolvers(fallbackOptions);
            },
          });

    const localizationFallbackResolvers =
      (localizationFallbackContext && localizationFallbackContext.resolvers) ||
      (localizationFallbackRegistryInstance &&
      typeof localizationFallbackRegistryInstance.createFallbackResolvers === 'function'
        ? localizationFallbackRegistryInstance.createFallbackResolvers({
            directNamespace: localizationFallbacks,
            inlineNamespace: inlineLocalizationFallbacks,
          })
        : createBasicLocalizationFallbackResolvers({
            directNamespace: localizationFallbacks,
            inlineNamespace: inlineLocalizationFallbacks,
          }));

    const localizationFallbackNamespace =
      (localizationFallbackContext && localizationFallbackContext.namespace) ||
      (localizationFallbackResolvers &&
      localizationFallbackResolvers.namespace &&
      typeof localizationFallbackResolvers.namespace === 'object'
        ? localizationFallbackResolvers.namespace
        : null);

    const fallbackResolveLocaleModule =
      localizationFallbackContext &&
      typeof localizationFallbackContext.fallbackResolveLocaleModule === 'function'
        ? function fallbackResolveLocaleModuleProxy(scope) {
            try {
              return localizationFallbackContext.fallbackResolveLocaleModule(scope);
            } catch (fallbackError) {
              void fallbackError;
            }

            return null;
          }
        : function fallbackResolveLocaleModuleProxy() {
            return null;
          };

    const createLocaleFallbacks =
      localizationFallbackContext &&
      typeof localizationFallbackContext.createLocaleFallbacks === 'function'
        ? function createLocaleFallbacksProxy(options) {
            try {
              return localizationFallbackContext.createLocaleFallbacks(options);
            } catch (createFallbackError) {
              void createFallbackError;
            }

            return null;
          }
        : function createLocaleFallbacksProxy() {
            return null;
          };

    return {
      context: localizationFallbackContext,
      support: localizationFallbackSupport,
      registry: localizationFallbackRegistryInstance,
      resolvers: localizationFallbackResolvers,
      namespace: localizationFallbackNamespace,
      fallbackResolveLocaleModule,
      createLocaleFallbacks,
      createBasicLocalizationFallbackResolvers,
    };
  }

  function resolveAttachmentScope() {
    const scopes = [];
    registerScope(scopes, typeof globalThis !== 'undefined' ? globalThis : null);
    registerScope(scopes, typeof window !== 'undefined' ? window : null);
    registerScope(scopes, typeof self !== 'undefined' ? self : null);
    registerScope(scopes, typeof global !== 'undefined' ? global : null);

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (isScopeCandidate(scope)) {
        return scope;
      }
    }

    return null;
  }

  const namespace = {
    setupLocalizationFallbacks,
    fallbackCreateLocaleFallbackHelpers,
    fallbackCreateBasicLocalizationFallbackResolvers,
    fallbackCreateLegacyLocalizationFallbackContext,
  };

  const namespaceName = 'cineCoreLocalizationFallbackBootstrap';
  const attachmentScope = resolveAttachmentScope();

  if (attachmentScope && typeof attachmentScope === 'object') {
    const existing =
      attachmentScope[namespaceName] && typeof attachmentScope[namespaceName] === 'object'
        ? attachmentScope[namespaceName]
        : {};

    for (const key of Object.keys(namespace)) {
      existing[key] = namespace[key];
    }

    try {
      attachmentScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
