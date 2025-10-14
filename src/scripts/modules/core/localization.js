(function () {
  function getModuleDirectory(moduleId) {
    const segments = moduleId.split('/');
    segments.pop();
    return segments.join('/');
  }

  function normalizeFromDir(moduleDir, request) {
    const segments = moduleDir ? moduleDir.split('/') : [];
    const parts = request.split('/');
    for (let index = 0; index < parts.length; index += 1) {
      const segment = parts[index];
      if (!segment || segment === '.') {
        continue;
      }
      if (segment === '..') {
        if (segments.length) {
          segments.pop();
        }
        continue;
      }
      segments.push(segment);
    }
    return segments.join('/');
  }

  /* eslint-disable no-redeclare, no-unused-vars */
  const MODULE_FACTORIES = {
  'modules/core/localization-bridge.js': function (module, exports, require) {
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

  },

  'modules/core/localization-fallback-bootstrap.js': function (module, exports, require) {
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
                './modules/core/localization-fallback-factories.js'
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
              const required = requireFn('./modules/core/localization-fallback-factories.js');
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
                './modules/core/localization-fallback-context.js'
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
              const required = requireFn('./modules/core/localization-fallback-context.js');
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

  },

  'modules/core/localization-fallback-context.js': function (module, exports, require) {
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

  },

  'modules/core/localization-fallback-environment.js': function (module, exports, require) {
    (function () {
      function detectRuntimeScope(primaryScope) {
        if (
          primaryScope &&
          (typeof primaryScope === 'object' || typeof primaryScope === 'function')
        ) {
          return primaryScope;
        }

        if (typeof globalThis !== 'undefined' && typeof globalThis === 'object') {
          return globalThis;
        }

        if (typeof window !== 'undefined' && typeof window === 'object') {
          return window;
        }

        if (typeof self !== 'undefined' && typeof self === 'object') {
          return self;
        }

        if (typeof global !== 'undefined' && typeof global === 'object') {
          return global;
        }

        return null;
      }

      function resolveSupportResolver(primaryScope) {
        const runtimeScope = detectRuntimeScope(primaryScope);

        if (
          runtimeScope &&
          runtimeScope.cineCoreSupportResolver &&
          typeof runtimeScope.cineCoreSupportResolver === 'object'
        ) {
          return runtimeScope.cineCoreSupportResolver;
        }

        if (typeof require === 'function') {
          try {
            const requiredResolver = require('./support-resolver.js');
            if (requiredResolver && typeof requiredResolver === 'object') {
              return requiredResolver;
            }
          } catch (supportResolverError) {
            void supportResolverError;
          }
        }

        return null;
      }

      function createFallbackResolver(resolverCandidate) {
        if (
          resolverCandidate &&
          typeof resolverCandidate.resolveCoreSupportModule === 'function'
        ) {
          return resolverCandidate.resolveCoreSupportModule;
        }

        return function fallbackResolveCoreSupportModule() {
          return null;
        };
      }

      function createLocalizationFallbackEnvironment(options) {
        const normalizedOptions = options && typeof options === 'object' ? options : {};
        const runtimeScope = normalizedOptions.runtimeScope || null;
        const coreGlobalScope = normalizedOptions.coreGlobalScope || null;
        const requireFn =
          typeof normalizedOptions.requireFn === 'function' ? normalizedOptions.requireFn : null;

        const supportResolver = resolveSupportResolver(runtimeScope);
        const resolveFromResolver = createFallbackResolver(supportResolver);

        const resolveCoreSupportModule =
          typeof normalizedOptions.resolveCoreSupportModule === 'function'
            ? normalizedOptions.resolveCoreSupportModule
            : function resolveCoreSupportModuleProxy(namespaceName, requirePath) {
                const resolved = resolveFromResolver(namespaceName, requirePath, runtimeScope);
                if (resolved) {
                  return resolved;
                }

                if (requireFn && typeof requirePath === 'string' && requirePath) {
                  try {
                    const requiredModule = requireFn(requirePath);
                    if (requiredModule && typeof requiredModule === 'object') {
                      return requiredModule;
                    }
                  } catch (resolveProxyRequireError) {
                    void resolveProxyRequireError;
                  }
                }

                return null;
              };

        let localizationFallbackBootstrapNamespace =
          normalizedOptions.localizationFallbackBootstrapNamespace ||
          resolveCoreSupportModule(
            'cineCoreLocalizationFallbackBootstrap',
            './modules/core/localization-fallback-bootstrap.js'
          );

        if (
          (!localizationFallbackBootstrapNamespace ||
            typeof localizationFallbackBootstrapNamespace.setupLocalizationFallbacks !== 'function') &&
          requireFn
        ) {
          try {
            const requiredBootstrap = requireFn('./modules/core/localization-fallback-bootstrap.js');
            if (
              requiredBootstrap &&
              typeof requiredBootstrap.setupLocalizationFallbacks === 'function'
            ) {
              localizationFallbackBootstrapNamespace = requiredBootstrap;
            }
          } catch (bootstrapRequireError) {
            void bootstrapRequireError;
          }
        }

        const localizationFallbackBootstrapState =
          localizationFallbackBootstrapNamespace &&
          typeof localizationFallbackBootstrapNamespace.setupLocalizationFallbacks === 'function'
            ? localizationFallbackBootstrapNamespace.setupLocalizationFallbacks({
                primaryRuntimeScope: runtimeScope,
                coreGlobalScope,
                localizationFallbackFactories:
                  normalizedOptions.localizationFallbackFactories || null,
                localizationFallbacks: normalizedOptions.localizationFallbacks || null,
                inlineLocalizationFallbacks:
                  normalizedOptions.inlineLocalizationFallbacks || null,
                localizationFallbackRegistry:
                  normalizedOptions.localizationFallbackRegistry || null,
                localizationFallbackResolution:
                  normalizedOptions.localizationFallbackResolution || null,
                localizationFallbackSupportLite:
                  normalizedOptions.localizationFallbackSupportLite || null,
                localizationInlineSupport: normalizedOptions.localizationInlineSupport || null,
                resolveCoreSupportModule,
                requireFn,
              })
            : null;

        const localizationFallbackContext =
          localizationFallbackBootstrapState &&
          localizationFallbackBootstrapState.context &&
          typeof localizationFallbackBootstrapState.context === 'object'
            ? localizationFallbackBootstrapState.context
            : null;

        const localizationFallbackSupport =
          (localizationFallbackContext && localizationFallbackContext.support) ||
          (localizationFallbackBootstrapState &&
          typeof localizationFallbackBootstrapState.support !== 'undefined'
            ? localizationFallbackBootstrapState.support
            : null);

        const createBasicLocalizationFallbackResolvers = (function resolveCreateBasicResolvers() {
          if (
            localizationFallbackBootstrapState &&
            typeof localizationFallbackBootstrapState.createBasicLocalizationFallbackResolvers ===
              'function'
          ) {
            return function createBasicLocalizationFallbackResolversProxy(fallbackOptions) {
              try {
                return localizationFallbackBootstrapState.createBasicLocalizationFallbackResolvers(
                  fallbackOptions
                );
              } catch (createBasicResolversError) {
                void createBasicResolversError;
              }

              return null;
            };
          }

          if (
            localizationFallbackBootstrapNamespace &&
            typeof localizationFallbackBootstrapNamespace
              .fallbackCreateBasicLocalizationFallbackResolvers === 'function'
          ) {
            return function createBasicLocalizationFallbackResolversProxy(fallbackOptions) {
              try {
                return localizationFallbackBootstrapNamespace
                  .fallbackCreateBasicLocalizationFallbackResolvers(fallbackOptions);
              } catch (createFallbackResolversError) {
                void createFallbackResolversError;
              }

              return null;
            };
          }

          return function createBasicLocalizationFallbackResolversProxy() {
            return null;
          };
        })();

        const localizationFallbackRegistry =
          (localizationFallbackContext && localizationFallbackContext.registry) ||
          (localizationFallbackBootstrapState &&
          localizationFallbackBootstrapState.registry &&
          typeof localizationFallbackBootstrapState.registry === 'object'
            ? localizationFallbackBootstrapState.registry
            : normalizedOptions.localizationFallbackRegistry &&
              typeof normalizedOptions.localizationFallbackRegistry.createFallbackResolvers ===
                'function'
            ? normalizedOptions.localizationFallbackRegistry
            : {
                createFallbackResolvers(fallbackOptions) {
                  return createBasicLocalizationFallbackResolvers(fallbackOptions);
                },
              });

        const localizationFallbackResolvers =
          (localizationFallbackContext && localizationFallbackContext.resolvers) ||
          (localizationFallbackBootstrapState &&
          localizationFallbackBootstrapState.resolvers &&
          typeof localizationFallbackBootstrapState.resolvers === 'object'
            ? localizationFallbackBootstrapState.resolvers
            : localizationFallbackRegistry &&
              typeof localizationFallbackRegistry.createFallbackResolvers === 'function'
            ? localizationFallbackRegistry.createFallbackResolvers({
                directNamespace: normalizedOptions.localizationFallbacks || null,
                inlineNamespace: normalizedOptions.inlineLocalizationFallbacks || null,
              })
            : createBasicLocalizationFallbackResolvers({
                directNamespace: normalizedOptions.localizationFallbacks || null,
                inlineNamespace: normalizedOptions.inlineLocalizationFallbacks || null,
              }));

        const localizationFallbackNamespace =
          (localizationFallbackContext && localizationFallbackContext.namespace) ||
          (localizationFallbackResolvers &&
          localizationFallbackResolvers.namespace &&
          typeof localizationFallbackResolvers.namespace === 'object'
            ? localizationFallbackResolvers.namespace
            : null);

        const fallbackResolveLocaleModule = (function resolveFallbackResolver() {
          if (
            localizationFallbackBootstrapState &&
            typeof localizationFallbackBootstrapState.fallbackResolveLocaleModule === 'function'
          ) {
            return function fallbackResolveLocaleModuleProxy(scope) {
              try {
                return localizationFallbackBootstrapState.fallbackResolveLocaleModule(scope);
              } catch (fallbackResolveError) {
                void fallbackResolveError;
              }

              return null;
            };
          }

          if (
            localizationFallbackContext &&
            typeof localizationFallbackContext.fallbackResolveLocaleModule === 'function'
          ) {
            return function fallbackResolveLocaleModuleProxy(scope) {
              try {
                return localizationFallbackContext.fallbackResolveLocaleModule(scope);
              } catch (contextFallbackResolveError) {
                void contextFallbackResolveError;
              }

              return null;
            };
          }

          return function fallbackResolveLocaleModuleProxy() {
            return null;
          };
        })();

        const createLocaleFallbacks = (function resolveCreateLocaleFallbacks() {
          if (
            localizationFallbackBootstrapState &&
            typeof localizationFallbackBootstrapState.createLocaleFallbacks === 'function'
          ) {
            return function createLocaleFallbacksProxy(createOptions) {
              try {
                return localizationFallbackBootstrapState.createLocaleFallbacks(createOptions);
              } catch (createLocaleFallbacksError) {
                void createLocaleFallbacksError;
              }

              return null;
            };
          }

          if (
            localizationFallbackContext &&
            typeof localizationFallbackContext.createLocaleFallbacks === 'function'
          ) {
            return function createLocaleFallbacksProxy(createOptions) {
              try {
                return localizationFallbackContext.createLocaleFallbacks(createOptions);
              } catch (contextCreateLocaleFallbacksError) {
                void contextCreateLocaleFallbacksError;
              }

              return null;
            };
          }

          return function createLocaleFallbacksProxy() {
            return null;
          };
        })();

        return {
          localizationFallbackBootstrapNamespace,
          localizationFallbackBootstrapState,
          localizationFallbackContext,
          localizationFallbackSupport,
          createBasicLocalizationFallbackResolvers,
          localizationFallbackRegistry,
          localizationFallbackResolvers,
          localizationFallbackNamespace,
          fallbackResolveLocaleModule,
          createLocaleFallbacks,
        };
      }

      const namespace = {
        createLocalizationFallbackEnvironment,
      };

      const runtimeScope = detectRuntimeScope();
      const targetName = 'cineCoreLocalizationFallbackEnvironment';
      const existing =
        runtimeScope && typeof runtimeScope[targetName] === 'object'
          ? runtimeScope[targetName]
          : {};

      for (const key of Object.keys(namespace)) {
        existing[key] = namespace[key];
      }

      if (runtimeScope && (typeof runtimeScope === 'object' || typeof runtimeScope === 'function')) {
        try {
          runtimeScope[targetName] = existing;
        } catch (assignError) {
          void assignError;
        }
      }

      if (typeof module === 'object' && module && module.exports) {
        module.exports = existing;
      }
    })();

  },

  'modules/core/localization-fallback-factories.js': function (module, exports, require) {
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

  },

  'modules/core/localization-fallback-inline-support.js': function (module, exports, require) {
    /* global CORE_GLOBAL_SCOPE */

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

      function detectGlobalScope(primaryCandidate) {
        if (isObject(primaryCandidate)) {
          return primaryCandidate;
        }

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

      const state = {
        runtimeScope: null,
        coreGlobalScope: null,
        coreLocalizationFallbackFactories: null,
        localFactoryNamespace: null,
        resolveCoreSupportModule: null,
        requireFn: typeof require === 'function' ? require : null,
        localizationFallbackContextNamespace: null,
      };

      function configure(options) {
        if (!state.coreGlobalScope) {
          state.coreGlobalScope = detectGlobalScope(state.runtimeScope);
        }

        if (!options || typeof options !== 'object') {
          return;
        }

        if (isObject(options.runtimeScope)) {
          state.runtimeScope = options.runtimeScope;
        }

        if (isObject(options.coreGlobalScope)) {
          state.coreGlobalScope = options.coreGlobalScope;
        } else if (!state.coreGlobalScope) {
          state.coreGlobalScope = detectGlobalScope(options.runtimeScope);
        }

        if (isObject(options.coreLocalizationFallbackFactories)) {
          state.coreLocalizationFallbackFactories =
            options.coreLocalizationFallbackFactories;
          state.localFactoryNamespace = options.coreLocalizationFallbackFactories;
        }

        if (typeof options.resolveCoreSupportModule === 'function') {
          state.resolveCoreSupportModule = options.resolveCoreSupportModule;
        }

        if (typeof options.requireFn === 'function') {
          state.requireFn = options.requireFn;
        }
      }

      configure({});

      function collectLocalizationFactoryScopes(primaryScope) {
        const scopes = [];

        registerScope(scopes, primaryScope);
        registerScope(scopes, state.runtimeScope);
        registerScope(scopes, state.coreGlobalScope);

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

      function ensureLocalizationFallbackFactories(primaryScope) {
        if (isObject(state.localFactoryNamespace)) {
          return state.localFactoryNamespace;
        }

        if (isObject(state.coreLocalizationFallbackFactories)) {
          state.localFactoryNamespace = state.coreLocalizationFallbackFactories;
          return state.localFactoryNamespace;
        }

        const resolver = state.resolveCoreSupportModule;
        if (typeof resolver === 'function') {
          try {
            const resolved = resolver(
              'cineCoreLocalizationFallbackFactories',
              './modules/core/localization-fallback-factories.js',
              primaryScope || state.runtimeScope || state.coreGlobalScope
            );

            if (isObject(resolved)) {
              state.localFactoryNamespace = resolved;
              return state.localFactoryNamespace;
            }
          } catch (resolveError) {
            void resolveError;
          }
        }

        const candidates = collectLocalizationFactoryScopes(primaryScope);

        for (let index = 0; index < candidates.length; index += 1) {
          const candidate = candidates[index];

          try {
            const namespaceCandidate =
              candidate && candidate.cineCoreLocalizationFallbackFactories;
            if (isObject(namespaceCandidate)) {
              state.localFactoryNamespace = namespaceCandidate;
              return state.localFactoryNamespace;
            }
          } catch (candidateError) {
            void candidateError;
          }
        }

        return state.localFactoryNamespace || null;
      }

      function inlineResolveLocalizationFallbackContextNamespace(primaryScope) {
        if (isObject(state.localizationFallbackContextNamespace)) {
          return state.localizationFallbackContextNamespace;
        }

        const resolver = state.resolveCoreSupportModule;
        if (typeof resolver === 'function') {
          try {
            const resolved = resolver(
              'cineCoreLocalizationFallbackContext',
              './modules/core/localization-fallback-context.js',
              primaryScope || state.runtimeScope || state.coreGlobalScope
            );

            if (isObject(resolved)) {
              state.localizationFallbackContextNamespace = resolved;
              return state.localizationFallbackContextNamespace;
            }
          } catch (resolveError) {
            void resolveError;
          }
        }

        const scopeCandidates = collectLocalizationFactoryScopes(primaryScope);

        for (let index = 0; index < scopeCandidates.length; index += 1) {
          const candidateScope = scopeCandidates[index];

          try {
            const candidate =
              candidateScope && candidateScope.cineCoreLocalizationFallbackContext;
            if (isObject(candidate)) {
              state.localizationFallbackContextNamespace = candidate;
              return state.localizationFallbackContextNamespace;
            }
          } catch (lookupError) {
            void lookupError;
          }
        }

        if (typeof state.requireFn === 'function') {
          try {
            const required = state.requireFn(
              './modules/core/localization-fallback-context.js'
            );
            if (isObject(required)) {
              state.localizationFallbackContextNamespace = required;
              return state.localizationFallbackContextNamespace;
            }
          } catch (fallbackRequireError) {
            void fallbackRequireError;
          }
        }

        for (let retryIndex = 0; retryIndex < scopeCandidates.length; retryIndex += 1) {
          const retryScope = scopeCandidates[retryIndex];

          try {
            const retryCandidate =
              retryScope && retryScope.cineCoreLocalizationFallbackContext;
            if (isObject(retryCandidate)) {
              state.localizationFallbackContextNamespace = retryCandidate;
              return state.localizationFallbackContextNamespace;
            }
          } catch (retryError) {
            void retryError;
          }
        }

        return state.localizationFallbackContextNamespace || null;
      }

      function inlineNormalizeLanguageCodeValue(lang, defaultLanguage) {
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

      function inlineResolveRtlCodes(config) {
        if (config && Array.isArray(config.rtlLanguageCodes)) {
          const codes = [];

          for (let index = 0; index < config.rtlLanguageCodes.length; index += 1) {
            const rawCode = config.rtlLanguageCodes[index];
            const normalized = inlineNormalizeLanguageCodeValue(
              String(rawCode || ''),
              ''
            );
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

      function inlineCreateLocaleFallbackHelpers(baseOptions) {
        const config = baseOptions || {};
        const defaultLanguage = inlineNormalizeLanguageCodeValue(
          config.defaultLanguage,
          'en'
        );
        const rtlLanguageCodes = inlineResolveRtlCodes(config);

        function normalizeLanguageCode(lang) {
          return inlineNormalizeLanguageCodeValue(lang, defaultLanguage);
        }

        function isRtlLanguage(lang) {
          const normalized = inlineNormalizeLanguageCodeValue(lang, defaultLanguage);
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

      function inlineCreateBasicLocalizationFallbackResolvers(options) {
        const baseOptions = options || {};

        return {
          namespace: {
            fallbackResolveLocaleModule() {
              return null;
            },
            createLocaleFallbacks(fallbackOptions) {
              return inlineCreateLocaleFallbackHelpers(fallbackOptions || baseOptions);
            },
          },
          fallbackResolveLocaleModule() {
            return null;
          },
          createLocaleFallbacks(fallbackOptions) {
            return inlineCreateLocaleFallbackHelpers(fallbackOptions || baseOptions);
          },
        };
      }

      function inlineCreateLegacyLocalizationFallbackContext(options) {
        const resolvers = inlineCreateBasicLocalizationFallbackResolvers(options);
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
              return inlineCreateBasicLocalizationFallbackResolvers(
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

      function createFallbackFactoryAccessor(methodName, inlineImplementation) {
        return function fallbackFactoryAccessor() {
          const args = arguments;
          const factories = ensureLocalizationFallbackFactories(args[0]);

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

      const namespace = {
        configure,
        collectLocalizationFactoryScopes,
        ensureLocalizationFallbackFactories,
        inlineResolveLocalizationFallbackContextNamespace,
        inlineCreateLocaleFallbackHelpers,
        inlineCreateBasicLocalizationFallbackResolvers,
        inlineCreateLegacyLocalizationFallbackContext,
        createFallbackFactoryAccessor,
      };

      const globalScope = detectGlobalScope();

      const targetName = 'cineCoreLocalizationFallbackInlineSupport';
      const existing = isObject(globalScope) && isObject(globalScope[targetName])
        ? globalScope[targetName]
        : {};

      for (const key of Object.keys(namespace)) {
        existing[key] = namespace[key];
      }

      if (isObject(globalScope)) {
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

  },

  'modules/core/localization-fallback-registry.js': function (module, exports, require) {
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

  },

  'modules/core/localization-fallback-resolution.js': function (module, exports, require) {
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

  },

  'modules/core/localization-fallback-support-lite.js': function (module, exports, require) {
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

  },

  'modules/core/localization-fallbacks.js': function (module, exports, require) {
    /* global cineLocale */

    (function () {
      const FALLBACK_DEFAULT_LANGUAGE = 'en';
      const FALLBACK_RTL_CODES = Object.freeze(['ar', 'fa', 'he', 'ur']);

      function detectGlobalScope() {
        if (typeof globalThis === 'object' && globalThis) {
          return globalThis;
        }
        if (typeof window === 'object' && window) {
          return window;
        }
        if (typeof self === 'object' && self) {
          return self;
        }
        if (typeof global === 'object' && global) {
          return global;
        }
        return null;
      }

      function toLowerCaseSafe(value) {
        if (typeof value !== 'string') {
          return '';
        }

        try {
          return value.trim().toLowerCase();
        } catch (stringError) {
          void stringError;
        }

        return '';
      }

      function normaliseDefaultLanguage(options) {
        const candidate =
          options && typeof options.defaultLanguage === 'string'
            ? toLowerCaseSafe(options.defaultLanguage)
            : '';

        return candidate || FALLBACK_DEFAULT_LANGUAGE;
      }

      function normaliseRtlCodes(options) {
        if (options && Array.isArray(options.rtlLanguageCodes)) {
          const normalised = [];

          for (let index = 0; index < options.rtlLanguageCodes.length; index += 1) {
            const rawCode = options.rtlLanguageCodes[index];
            const code = toLowerCaseSafe(String(rawCode || ''));
            if (code && normalised.indexOf(code) === -1) {
              normalised.push(code);
            }
          }

          if (normalised.length > 0) {
            return normalised;
          }
        }

        return FALLBACK_RTL_CODES.slice();
      }

      function fallbackResolveLocaleModule(scope) {
        if (
          typeof cineLocale !== 'undefined' &&
          cineLocale &&
          typeof cineLocale === 'object'
        ) {
          return cineLocale;
        }

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
            const required = require('./modules/localization.js');
            if (required && typeof required === 'object') {
              return required;
            }
          } catch (localeRequireError) {
            void localeRequireError;
          }
        }

        return null;
      }

      function fallbackNormalizeLanguageCode(lang, options) {
        const defaultLanguage = normaliseDefaultLanguage(options);
        if (!lang) {
          return defaultLanguage;
        }

        try {
          const normalised = String(lang).trim().toLowerCase();
          return normalised || defaultLanguage;
        } catch (languageNormalizeError) {
          void languageNormalizeError;
        }

        return defaultLanguage;
      }

      function fallbackIsRtlLanguage(lang, options) {
        const rtlCodes = normaliseRtlCodes(options);
        const normalized = fallbackNormalizeLanguageCode(lang, options);
        const base = normalized.split('-')[0];
        return rtlCodes.indexOf(base) !== -1;
      }

      function fallbackResolveDocumentDirection(lang, options) {
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

        return fallbackIsRtlLanguage(lang, options) ? 'rtl' : 'ltr';
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

      function createLocaleFallbacks(options) {
        const defaultLanguage = normaliseDefaultLanguage(options);
        const rtlLanguageCodes = normaliseRtlCodes(options);

        return {
          getDefaultLanguage() {
            return defaultLanguage;
          },
          getRtlLanguageCodes() {
            return rtlLanguageCodes.slice();
          },
          resolveLocaleModule(scope) {
            return fallbackResolveLocaleModule(scope);
          },
          normalizeLanguageCode(lang) {
            return fallbackNormalizeLanguageCode(lang, {
              defaultLanguage,
            });
          },
          isRtlLanguage(lang) {
            return fallbackIsRtlLanguage(lang, {
              defaultLanguage,
              rtlLanguageCodes,
            });
          },
          resolveDocumentDirection(lang) {
            return fallbackResolveDocumentDirection(lang, {
              defaultLanguage,
              rtlLanguageCodes,
            });
          },
          applyLocaleMetadata(target, lang, direction) {
            return fallbackApplyLocaleMetadata(target, lang, direction);
          },
        };
      }

      const namespace = {
        fallbackResolveLocaleModule,
        fallbackNormalizeLanguageCode,
        fallbackIsRtlLanguage,
        fallbackResolveDocumentDirection,
        fallbackApplyLocaleMetadata,
        createLocaleFallbacks,
      };

      const globalScope = detectGlobalScope();
      const targetName = 'cineCoreLocalizationFallbacks';
      const existing =
        globalScope && typeof globalScope[targetName] === 'object'
          ? globalScope[targetName]
          : {};

      for (const key of Object.keys(namespace)) {
        existing[key] = namespace[key];
      }

      if (globalScope) {
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

  },

  'modules/core/localization-inline-fallbacks.js': function (module, exports, require) {
    /* global cineLocale, CORE_GLOBAL_SCOPE */

    (function () {
      function detectRuntimeScope() {
        if (
          typeof CORE_GLOBAL_SCOPE !== 'undefined' &&
          CORE_GLOBAL_SCOPE &&
          (typeof CORE_GLOBAL_SCOPE === 'object' || typeof CORE_GLOBAL_SCOPE === 'function')
        ) {
          return CORE_GLOBAL_SCOPE;
        }

        if (typeof globalThis === 'object' && globalThis) {
          return globalThis;
        }

        if (typeof window === 'object' && window) {
          return window;
        }

        if (typeof self === 'object' && self) {
          return self;
        }

        if (typeof global === 'object' && global) {
          return global;
        }

        return null;
      }

      function createInlineLocalizationFallbackImplementation() {
        function inlineFallbackResolveLocaleModule(scope) {
          if (
            typeof cineLocale !== 'undefined' &&
            cineLocale &&
            typeof cineLocale === 'object'
          ) {
            return cineLocale;
          }

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
              const required = require('../localization.js');
              if (required && typeof required === 'object') {
                return required;
              }
            } catch (localeRequireError) {
              void localeRequireError;
            }
          }

          return null;
        }

        function inlineCreateLocaleFallbacks(options) {
          const defaultLanguage = (function resolveDefaultLanguageOption() {
            if (options && typeof options.defaultLanguage === 'string') {
              try {
                const normalized = options.defaultLanguage.trim().toLowerCase();
                return normalized || 'en';
              } catch (defaultLanguageNormalizeError) {
                void defaultLanguageNormalizeError;
              }
            }
            return 'en';
          })();

          const rtlLanguageCodes = (function resolveRtlCodesOption() {
            if (options && Array.isArray(options.rtlLanguageCodes)) {
              const collected = [];
              for (let index = 0; index < options.rtlLanguageCodes.length; index += 1) {
                const rawCode = options.rtlLanguageCodes[index];
                if (typeof rawCode === 'string') {
                  try {
                    const normalized = rawCode.trim().toLowerCase();
                    if (normalized && collected.indexOf(normalized) === -1) {
                      collected.push(normalized);
                    }
                  } catch (rtlNormalizeError) {
                    void rtlNormalizeError;
                  }
                }
              }
              if (collected.length > 0) {
                return collected;
              }
            }
            return ['ar', 'fa', 'he', 'ur'];
          })();

          function inlineNormalizeLanguageCode(lang) {
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

          function inlineIsRtlLanguage(lang) {
            const normalized = inlineNormalizeLanguageCode(lang);
            const base = normalized.split('-')[0];
            return rtlLanguageCodes.indexOf(base) !== -1;
          }

          function inlineResolveDocumentDirection(lang) {
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

            return inlineIsRtlLanguage(lang) ? 'rtl' : 'ltr';
          }

          function inlineApplyLocaleMetadata(target, lang, direction) {
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
            resolveLocaleModule(scope) {
              return inlineFallbackResolveLocaleModule(scope);
            },
            normalizeLanguageCode(lang) {
              return inlineNormalizeLanguageCode(lang);
            },
            isRtlLanguage(lang) {
              return inlineIsRtlLanguage(lang);
            },
            resolveDocumentDirection(lang) {
              return inlineResolveDocumentDirection(lang);
            },
            applyLocaleMetadata(target, lang, direction) {
              return inlineApplyLocaleMetadata(target, lang, direction);
            },
          };
        }

        return {
          fallbackResolveLocaleModule: inlineFallbackResolveLocaleModule,
          createLocaleFallbacks: inlineCreateLocaleFallbacks,
        };
      }

      function resolveFallbackModule() {
        const scope = detectRuntimeScope();
        if (
          scope &&
          scope.cineCoreLocalizationFallbacks &&
          typeof scope.cineCoreLocalizationFallbacks === 'object'
        ) {
          return scope.cineCoreLocalizationFallbacks;
        }

        if (typeof require === 'function') {
          try {
            const requiredFallbacks = require('./localization-fallbacks.js');
            if (requiredFallbacks && typeof requiredFallbacks === 'object') {
              return requiredFallbacks;
            }
          } catch (fallbackRequireError) {
            void fallbackRequireError;
          }
        }

        return null;
      }

      function createInlineLocalizationFallbackNamespace() {
        const fallbackModule = resolveFallbackModule();
        if (
          fallbackModule &&
          typeof fallbackModule === 'object' &&
          typeof fallbackModule.fallbackResolveLocaleModule === 'function' &&
          typeof fallbackModule.createLocaleFallbacks === 'function'
        ) {
          return {
            fallbackResolveLocaleModule(scope) {
              return fallbackModule.fallbackResolveLocaleModule(scope);
            },
            createLocaleFallbacks(options) {
              return fallbackModule.createLocaleFallbacks(options);
            },
          };
        }

        return createInlineLocalizationFallbackImplementation();
      }

      const runtimeScope = detectRuntimeScope();
      const namespace = createInlineLocalizationFallbackNamespace();
      namespace.createInlineLocalizationFallbackNamespace = createInlineLocalizationFallbackNamespace;
      namespace.createNamespace = createInlineLocalizationFallbackNamespace;

      if (runtimeScope && typeof runtimeScope === 'object') {
        const targetName = 'cineCoreLocalizationInlineFallbacks';
        const existing =
          runtimeScope[targetName] && typeof runtimeScope[targetName] === 'object'
            ? runtimeScope[targetName]
            : namespace;

        existing.fallbackResolveLocaleModule = namespace.fallbackResolveLocaleModule;
        existing.createLocaleFallbacks = namespace.createLocaleFallbacks;
        existing.createInlineLocalizationFallbackNamespace =
          namespace.createInlineLocalizationFallbackNamespace;
        existing.createNamespace = namespace.createNamespace;

        runtimeScope[targetName] = existing;

        if (typeof module === 'object' && module && module.exports) {
          module.exports = existing;
        }
      } else if (typeof module === 'object' && module && module.exports) {
        module.exports = namespace;
      }
    })();

  },

  'modules/core/localization-runtime-environment.js': function (module, exports, require) {
    (function () {
      function isObject(value) {
        return !!value && (typeof value === 'object' || typeof value === 'function');
      }

      function safeRequire(requireFn, requirePath) {
        if (typeof requireFn !== 'function' || typeof requirePath !== 'string') {
          return null;
        }

        try {
          const required = requireFn(requirePath);
          return isObject(required) ? required : null;
        } catch (requireError) {
          void requireError;
        }

        return null;
      }

      function readOption(options, key) {
        if (options && typeof options === 'object' && key in options) {
          return options[key];
        }

        return null;
      }

      function resolveModule(resolver, requireFn, namespaceName, requirePath) {
        if (typeof resolver === 'function') {
          try {
            const resolved = resolver(namespaceName, requirePath);
            if (isObject(resolved)) {
              return resolved;
            }
          } catch (resolutionError) {
            void resolutionError;
          }
        }

        if (typeof requirePath === 'string' && requirePath) {
          const required = safeRequire(requireFn, requirePath);
          if (required) {
            return required;
          }
        }

        return null;
      }

      function ensureInlineSupport(options) {
        const inlineSupport = resolveModule(
          options.resolveCoreSupportModule,
          options.requireFn,
          'cineCoreLocalizationFallbackInlineSupport',
          './modules/core/localization-fallback-inline-support.js'
        );

        if (!isObject(inlineSupport)) {
          return null;
        }

        if (typeof inlineSupport.configure === 'function') {
          try {
            inlineSupport.configure({
              runtimeScope: options.runtimeScope,
              coreGlobalScope: options.coreGlobalScope,
              coreLocalizationFallbackFactories: options.localizationFallbackFactories,
              resolveCoreSupportModule: options.resolveCoreSupportModule,
              requireFn: options.requireFn,
            });
          } catch (inlineSupportConfigureError) {
            void inlineSupportConfigureError;
          }
        }

        return inlineSupport;
      }

      function readLocalizationFallbackEnvironment(options) {
        const environmentModule = resolveModule(
          options.resolveCoreSupportModule,
          options.requireFn,
          'cineCoreLocalizationFallbackEnvironment',
          './modules/core/localization-fallback-environment.js'
        );

        if (
          !isObject(environmentModule) ||
          typeof environmentModule.createLocalizationFallbackEnvironment !== 'function'
        ) {
          return null;
        }

        try {
          return environmentModule.createLocalizationFallbackEnvironment({
            runtimeScope: options.runtimeScope,
            coreGlobalScope: options.coreGlobalScope,
            resolveCoreSupportModule: options.resolveCoreSupportModule,
            requireFn: options.requireFn,
            localizationFallbackFactories: options.localizationFallbackFactories,
            localizationFallbacks: options.localizationFallbacks,
            inlineLocalizationFallbacks: options.inlineLocalizationFallbacks,
            localizationFallbackRegistry: options.localizationFallbackRegistry,
            localizationFallbackResolution: options.localizationFallbackResolution,
            localizationFallbackSupportLite: options.localizationFallbackSupportLite,
            localizationInlineSupport: options.localizationInlineSupport,
          });
        } catch (environmentCreationError) {
          void environmentCreationError;
        }

        return null;
      }

      function createLocalizationRuntimeEnvironment(untrustedOptions) {
        const options = isObject(untrustedOptions) ? untrustedOptions : {};

        const resolver =
          typeof options.resolveCoreSupportModule === 'function'
            ? options.resolveCoreSupportModule
            : null;

        const requireFn = typeof options.requireFn === 'function' ? options.requireFn : null;

        const runtimeScope = readOption(options, 'runtimeScope');
        const coreGlobalScope = readOption(options, 'coreGlobalScope');

        const localizationFallbacks = resolveModule(
          resolver,
          requireFn,
          'cineCoreLocalizationFallbacks',
          './modules/core/localization-fallbacks.js'
        );

        const inlineLocalizationFallbacks = resolveModule(
          resolver,
          requireFn,
          'cineCoreLocalizationInlineFallbacks',
          './modules/core/localization-inline-fallbacks.js'
        );

        const localizationFallbackRegistry = resolveModule(
          resolver,
          requireFn,
          'cineCoreLocalizationFallbackRegistry',
          './modules/core/localization-fallback-registry.js'
        );

        const localizationFallbackResolution = resolveModule(
          resolver,
          requireFn,
          'cineCoreLocalizationFallbackResolution',
          './modules/core/localization-fallback-resolution.js'
        );

        let localizationFallbackSupportLite = resolveModule(
          resolver,
          requireFn,
          'cineCoreLocalizationFallbackSupportLite',
          './modules/core/localization-fallback-support-lite.js'
        );

        if (!localizationFallbackSupportLite) {
          localizationFallbackSupportLite = safeRequire(
            requireFn,
            './modules/core/localization-fallback-support-lite.js'
          );
        }

        const localizationFallbackFactories = resolveModule(
          resolver,
          requireFn,
          'cineCoreLocalizationFallbackFactories',
          './modules/core/localization-fallback-factories.js'
        );

        const inlineSupport = ensureInlineSupport({
          resolveCoreSupportModule: resolver,
          requireFn,
          runtimeScope,
          coreGlobalScope,
          localizationFallbackFactories,
        });

        const fallbackEnvironment = readLocalizationFallbackEnvironment({
          resolveCoreSupportModule: resolver,
          requireFn,
          runtimeScope,
          coreGlobalScope,
          localizationFallbackFactories,
          localizationFallbacks,
          inlineLocalizationFallbacks,
          localizationFallbackRegistry,
          localizationFallbackResolution,
          localizationFallbackSupportLite,
          localizationInlineSupport: inlineSupport,
        });

        function createBasicLocalizationFallbackResolversProxy(fallbackOptions) {
          void fallbackOptions;
          return null;
        }

        const createBasicLocalizationFallbackResolvers =
          fallbackEnvironment &&
          typeof fallbackEnvironment.createBasicLocalizationFallbackResolvers === 'function'
            ? fallbackEnvironment.createBasicLocalizationFallbackResolvers
            : createBasicLocalizationFallbackResolversProxy;

        const fallbackRegistry = fallbackEnvironment && fallbackEnvironment.localizationFallbackRegistry
          ? fallbackEnvironment.localizationFallbackRegistry
          : localizationFallbackRegistry &&
            typeof localizationFallbackRegistry.createFallbackResolvers === 'function'
          ? localizationFallbackRegistry
          : {
              createFallbackResolvers(fallbackOptions) {
                return createBasicLocalizationFallbackResolvers(fallbackOptions);
              },
            };

        const fallbackResolvers = fallbackEnvironment && fallbackEnvironment.localizationFallbackResolvers
          ? fallbackEnvironment.localizationFallbackResolvers
          : fallbackRegistry && typeof fallbackRegistry.createFallbackResolvers === 'function'
          ? fallbackRegistry.createFallbackResolvers({
              directNamespace: localizationFallbacks,
              inlineNamespace: inlineLocalizationFallbacks,
            })
          : createBasicLocalizationFallbackResolvers({
              directNamespace: localizationFallbacks,
              inlineNamespace: inlineLocalizationFallbacks,
            });

        const fallbackNamespace = fallbackEnvironment && fallbackEnvironment.localizationFallbackNamespace
          ? fallbackEnvironment.localizationFallbackNamespace
          : null;

        function fallbackResolveLocaleModuleProxy() {
          return null;
        }

        const fallbackResolveLocaleModule = fallbackEnvironment &&
          typeof fallbackEnvironment.fallbackResolveLocaleModule === 'function'
            ? fallbackEnvironment.fallbackResolveLocaleModule
            : fallbackResolveLocaleModuleProxy;

        function createLocaleFallbacksProxy() {
          return null;
        }

        const createLocaleFallbacks = fallbackEnvironment &&
          typeof fallbackEnvironment.createLocaleFallbacks === 'function'
            ? fallbackEnvironment.createLocaleFallbacks
            : createLocaleFallbacksProxy;

        const localizationFallbackSupport = fallbackEnvironment &&
          typeof fallbackEnvironment.localizationFallbackSupport !== 'undefined'
            ? fallbackEnvironment.localizationFallbackSupport
            : null;

        const coreLocalizationBridge = resolveModule(
          resolver,
          requireFn,
          'cineCoreLocalizationBridge',
          './modules/core/localization-bridge.js'
        );

        return {
          coreLocalizationBridge,
          coreLocalizationFallbacks: localizationFallbacks,
          coreInlineLocalizationFallbacks: inlineLocalizationFallbacks,
          coreLocalizationFallbackRegistry: localizationFallbackRegistry,
          coreLocalizationFallbackResolution: localizationFallbackResolution,
          coreLocalizationFallbackSupportLite: localizationFallbackSupportLite,
          coreLocalizationFallbackFactories: localizationFallbackFactories,
          localizationInlineSupport: inlineSupport,
          localizationFallbackEnvironment: fallbackEnvironment,
          localizationFallbackSupport,
          createBasicLocalizationFallbackResolvers,
          localizationFallbackRegistry: fallbackRegistry,
          localizationFallbackResolvers: fallbackResolvers,
          localizationFallbackNamespace: fallbackNamespace,
          fallbackResolveLocaleModule,
          createLocaleFallbacks,
        };
      }

      const api = {
        createLocalizationRuntimeEnvironment,
      };

      if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
        return;
      }

      const globalScope =
        (typeof globalThis !== 'undefined' && globalThis) ||
        (typeof self !== 'undefined' && self) ||
        (typeof window !== 'undefined' && window) ||
        (typeof global !== 'undefined' && global) ||
        null;

      if (globalScope && !globalScope.cineCoreLocalizationRuntimeEnvironment) {
        globalScope.cineCoreLocalizationRuntimeEnvironment = api;
      }
    })();

  }
  };
  /* eslint-enable no-redeclare, no-unused-vars */


  const MODULE_CACHE = Object.create(null);

  function loadModule(moduleId) {
    if (MODULE_CACHE[moduleId]) {
      return MODULE_CACHE[moduleId].exports;
    }

    const factory = MODULE_FACTORIES[moduleId];
    if (typeof factory !== 'function') {
      throw new Error('Unknown localization module: ' + moduleId);
    }

    const module = { exports: {} };
    MODULE_CACHE[moduleId] = module;

    const moduleDir = getModuleDirectory(moduleId);

    function localRequire(request) {
      if (typeof request === 'string') {
        let normalized = null;
        if (request.startsWith('./modules/core/')) {
          normalized = request.slice(2);
        } else if (request.startsWith('../core/')) {
          normalized = 'modules/core/' + request.slice(8);
        } else if (request.startsWith('./') || request.startsWith('../')) {
          normalized = normalizeFromDir(moduleDir, request);
        }
        if (normalized && MODULE_FACTORIES[normalized]) {
          return loadModule(normalized);
        }
      }
      return require(request);
    }

    factory(module, module.exports, localRequire);

    return module.exports;
  }

  const exportsMap = {};
  Object.keys(MODULE_FACTORIES).forEach(moduleId => {
    exportsMap[moduleId] = loadModule(moduleId);
  });

  if (typeof module === 'object' && module && module.exports) {
    module.exports = exportsMap;
  }

  const globalScope = typeof globalThis === 'object' && globalThis
    ? globalThis
    : typeof window === 'object' && window
    ? window
    : typeof self === 'object' && self
    ? self
    : typeof global === 'object' && global
    ? global
    : null;

  if (globalScope) {
    const targetName = 'cineCoreLocalizationModules';
    const existing = globalScope[targetName] && typeof globalScope[targetName] === 'object'
      ? globalScope[targetName]
      : {};
    Object.keys(exportsMap).forEach(key => {
      existing[key] = exportsMap[key];
    });
    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
})();
