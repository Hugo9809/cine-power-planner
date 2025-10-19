function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function getModuleDirectory(moduleId) {
    var segments = moduleId.split('/');
    segments.pop();
    return segments.join('/');
  }
  function normalizeFromDir(moduleDir, request) {
    var segments = moduleDir ? moduleDir.split('/') : [];
    var parts = request.split('/');
    for (var index = 0; index < parts.length; index += 1) {
      var segment = parts[index];
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
  var MODULE_FACTORIES = {
    'modules/core/localization-bridge.js': function modules_core_localizationBridgeJs(module, exports, require) {
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
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = target;
        }
      })();
    },
    'modules/core/localization-fallback-bootstrap.js': function modules_core_localizationFallbackBootstrapJs(module, exports, require) {
      (function () {
        function isScopeCandidate(value) {
          return !!value && (_typeof(value) === 'object' || typeof value === 'function');
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
            var normalized = String(lang).trim().toLowerCase();
            return normalized || defaultLanguage;
          } catch (normalizeError) {
            void normalizeError;
          }
          return defaultLanguage;
        }
        function fallbackResolveRtlCodes(config) {
          if (config && Array.isArray(config.rtlLanguageCodes)) {
            var codes = [];
            for (var index = 0; index < config.rtlLanguageCodes.length; index += 1) {
              var rawCode = config.rtlLanguageCodes[index];
              var normalized = fallbackNormalizeLanguageCodeValue(String(rawCode || ''), '');
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
          var config = baseOptions || {};
          var defaultLanguage = fallbackNormalizeLanguageCodeValue(config.defaultLanguage, 'en');
          var rtlLanguageCodes = fallbackResolveRtlCodes(config);
          function normalizeLanguageCode(lang) {
            return fallbackNormalizeLanguageCodeValue(lang, defaultLanguage);
          }
          function isRtlLanguage(lang) {
            var normalized = fallbackNormalizeLanguageCodeValue(lang, defaultLanguage);
            var base = normalized.split('-')[0];
            return rtlLanguageCodes.indexOf(base) !== -1;
          }
          function resolveDocumentDirection(lang) {
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
            getDefaultLanguage: function getDefaultLanguage() {
              return defaultLanguage;
            },
            getRtlLanguageCodes: function getRtlLanguageCodes() {
              return rtlLanguageCodes.slice();
            },
            resolveLocaleModule: function resolveLocaleModule() {
              return null;
            },
            normalizeLanguageCode: normalizeLanguageCode,
            isRtlLanguage: isRtlLanguage,
            resolveDocumentDirection: resolveDocumentDirection,
            applyLocaleMetadata: applyLocaleMetadata
          };
        }
        function fallbackCreateBasicLocalizationFallbackResolvers(options) {
          var baseOptions = options || {};
          return {
            namespace: {
              fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
                return null;
              },
              createLocaleFallbacks: function createLocaleFallbacks(fallbackOptions) {
                return fallbackCreateLocaleFallbackHelpers(fallbackOptions || baseOptions);
              }
            },
            fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
              return null;
            },
            createLocaleFallbacks: function createLocaleFallbacks(fallbackOptions) {
              return fallbackCreateLocaleFallbackHelpers(fallbackOptions || baseOptions);
            }
          };
        }
        function fallbackCreateLegacyLocalizationFallbackContext(options) {
          var resolvers = fallbackCreateBasicLocalizationFallbackResolvers(options);
          var namespace = resolvers && resolvers.namespace && _typeof(resolvers.namespace) === 'object' ? resolvers.namespace : {
            fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
              return null;
            },
            createLocaleFallbacks: function createLocaleFallbacks() {
              return null;
            }
          };
          return {
            support: null,
            registry: {
              createFallbackResolvers: function createFallbackResolvers(fallbackOptions) {
                return fallbackCreateBasicLocalizationFallbackResolvers(fallbackOptions || options);
              }
            },
            resolvers: resolvers,
            namespace: namespace,
            fallbackResolveLocaleModule: namespace.fallbackResolveLocaleModule,
            createLocaleFallbacks: namespace.createLocaleFallbacks
          };
        }
        function setupLocalizationFallbacks(options) {
          var settings = options && _typeof(options) === 'object' ? options : {};
          var _settings$primaryRunt = settings.primaryRuntimeScope,
            primaryRuntimeScope = _settings$primaryRunt === void 0 ? null : _settings$primaryRunt,
            _settings$coreGlobalS = settings.coreGlobalScope,
            coreGlobalScope = _settings$coreGlobalS === void 0 ? null : _settings$coreGlobalS,
            _settings$localizatio = settings.localizationFallbackFactories,
            localizationFallbackFactories = _settings$localizatio === void 0 ? null : _settings$localizatio,
            _settings$localizatio2 = settings.localizationFallbacks,
            localizationFallbacks = _settings$localizatio2 === void 0 ? null : _settings$localizatio2,
            _settings$inlineLocal = settings.inlineLocalizationFallbacks,
            inlineLocalizationFallbacks = _settings$inlineLocal === void 0 ? null : _settings$inlineLocal,
            _settings$localizatio3 = settings.localizationFallbackRegistry,
            localizationFallbackRegistry = _settings$localizatio3 === void 0 ? null : _settings$localizatio3,
            _settings$localizatio4 = settings.localizationFallbackResolution,
            localizationFallbackResolution = _settings$localizatio4 === void 0 ? null : _settings$localizatio4,
            _settings$localizatio5 = settings.localizationFallbackSupportLite,
            localizationFallbackSupportLite = _settings$localizatio5 === void 0 ? null : _settings$localizatio5,
            _settings$localizatio6 = settings.localizationInlineSupport,
            localizationInlineSupport = _settings$localizatio6 === void 0 ? null : _settings$localizatio6,
            _settings$resolveCore = settings.resolveCoreSupportModule,
            resolveSupportModule = _settings$resolveCore === void 0 ? null : _settings$resolveCore,
            _settings$requireFn = settings.requireFn,
            requireFn = _settings$requireFn === void 0 ? typeof require === 'function' ? require : null : _settings$requireFn;
          function fallbackRegisterLocalizationScope(scopes, scope) {
            registerScope(scopes, scope);
          }
          function fallbackCollectLocalizationFactoryScopes(primaryScope) {
            var scopes = [];
            fallbackRegisterLocalizationScope(scopes, primaryScope);
            fallbackRegisterLocalizationScope(scopes, primaryRuntimeScope);
            fallbackRegisterLocalizationScope(scopes, coreGlobalScope);
            collectDefaultGlobalScopes(scopes);
            return scopes;
          }
          function fallbackEnsureLocalizationFallbackFactories(primaryScope) {
            if (localizationFallbackFactories && _typeof(localizationFallbackFactories) === 'object') {
              return localizationFallbackFactories;
            }
            var candidateScopes = fallbackCollectLocalizationFactoryScopes(primaryScope);
            for (var index = 0; index < candidateScopes.length; index += 1) {
              var candidateScope = candidateScopes[index];
              try {
                var candidate = candidateScope && candidateScope.cineCoreLocalizationFallbackFactories;
                if (candidate && _typeof(candidate) === 'object') {
                  return candidate;
                }
              } catch (candidateLookupError) {
                void candidateLookupError;
              }
            }
            if (typeof resolveSupportModule === 'function') {
              try {
                var resolved = resolveSupportModule('cineCoreLocalizationFallbackFactories', './modules/core/localization-fallback-factories.js');
                if (resolved && _typeof(resolved) === 'object') {
                  return resolved;
                }
              } catch (factoriesResolveError) {
                void factoriesResolveError;
              }
            }
            if (typeof requireFn === 'function') {
              try {
                var required = requireFn('./modules/core/localization-fallback-factories.js');
                if (required && _typeof(required) === 'object') {
                  return required;
                }
              } catch (factoriesRequireError) {
                void factoriesRequireError;
              }
            }
            return null;
          }
          function fallbackResolveLocalizationFallbackContextNamespace(primaryScope) {
            var scopeCandidates = fallbackCollectLocalizationFactoryScopes(primaryScope);
            for (var index = 0; index < scopeCandidates.length; index += 1) {
              var candidateScope = scopeCandidates[index];
              try {
                var candidate = candidateScope && candidateScope.cineCoreLocalizationFallbackContext;
                if (candidate && _typeof(candidate) === 'object') {
                  return candidate;
                }
              } catch (fallbackContextLookupError) {
                void fallbackContextLookupError;
              }
            }
            if (typeof resolveSupportModule === 'function') {
              try {
                var resolved = resolveSupportModule('cineCoreLocalizationFallbackContext', './modules/core/localization-fallback-context.js');
                if (resolved && _typeof(resolved) === 'object') {
                  return resolved;
                }
              } catch (fallbackContextResolveError) {
                void fallbackContextResolveError;
              }
            }
            if (typeof requireFn === 'function') {
              try {
                var required = requireFn('./modules/core/localization-fallback-context.js');
                if (required && _typeof(required) === 'object') {
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
              var args = arguments;
              var factories = fallbackEnsureLocalizationFallbackFactories(args[0]);
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
          var collectLocalizationFactoryScopes = localizationInlineSupport && typeof localizationInlineSupport.collectLocalizationFactoryScopes === 'function' ? function collectLocalizationFactoryScopesProxy(primaryScope) {
            return localizationInlineSupport.collectLocalizationFactoryScopes(primaryScope);
          } : fallbackCollectLocalizationFactoryScopes;
          var ensureLocalizationFallbackFactories = localizationInlineSupport && typeof localizationInlineSupport.ensureLocalizationFallbackFactories === 'function' ? function ensureLocalizationFallbackFactoriesProxy(primaryScope) {
            return localizationInlineSupport.ensureLocalizationFallbackFactories(primaryScope);
          } : fallbackEnsureLocalizationFallbackFactories;
          var inlineResolveLocalizationFallbackContextNamespace = localizationInlineSupport && typeof localizationInlineSupport.inlineResolveLocalizationFallbackContextNamespace === 'function' ? function inlineResolveLocalizationFallbackContextNamespaceProxy(primaryScope) {
            return localizationInlineSupport.inlineResolveLocalizationFallbackContextNamespace(primaryScope);
          } : fallbackResolveLocalizationFallbackContextNamespace;
          var inlineCreateBasicLocalizationFallbackResolvers = localizationInlineSupport && typeof localizationInlineSupport.inlineCreateBasicLocalizationFallbackResolvers === 'function' ? function inlineCreateBasicLocalizationFallbackResolversProxy(options) {
            return localizationInlineSupport.inlineCreateBasicLocalizationFallbackResolvers(options);
          } : fallbackCreateBasicLocalizationFallbackResolvers;
          var inlineCreateLegacyLocalizationFallbackContext = localizationInlineSupport && typeof localizationInlineSupport.inlineCreateLegacyLocalizationFallbackContext === 'function' ? function inlineCreateLegacyLocalizationFallbackContextProxy(options) {
            return localizationInlineSupport.inlineCreateLegacyLocalizationFallbackContext(options);
          } : fallbackCreateLegacyLocalizationFallbackContext;
          var createFallbackFactoryAccessor = localizationInlineSupport && typeof localizationInlineSupport.createFallbackFactoryAccessor === 'function' ? function createFallbackFactoryAccessorProxy(methodName, inlineImplementation) {
            return localizationInlineSupport.createFallbackFactoryAccessor(methodName, inlineImplementation);
          } : fallbackCreateFallbackFactoryAccessor;
          var resolveLocalizationFallbackContextNamespace = createFallbackFactoryAccessor('resolveLocalizationFallbackContextNamespace', inlineResolveLocalizationFallbackContextNamespace);
          var createBasicLocalizationFallbackResolversFallback = createFallbackFactoryAccessor('createBasicLocalizationFallbackResolversFallback', inlineCreateBasicLocalizationFallbackResolvers);
          var createLegacyLocalizationFallbackContextFallback = createFallbackFactoryAccessor('createLegacyLocalizationFallbackContextFallback', inlineCreateLegacyLocalizationFallbackContext);
          var localizationFallbackContextNamespace = resolveLocalizationFallbackContextNamespace();
          var createLocalizationFallbackRuntimeContext = localizationFallbackContextNamespace && typeof localizationFallbackContextNamespace.createLocalizationFallbackRuntimeContext === 'function' ? localizationFallbackContextNamespace.createLocalizationFallbackRuntimeContext : null;
          var createLegacyLocalizationFallbackContext = localizationFallbackContextNamespace && typeof localizationFallbackContextNamespace.createLegacyLocalizationFallbackContext === 'function' ? localizationFallbackContextNamespace.createLegacyLocalizationFallbackContext : createLegacyLocalizationFallbackContextFallback;
          var createBasicLocalizationFallbackResolvers = localizationFallbackContextNamespace && typeof localizationFallbackContextNamespace.createBasicLocalizationFallbackResolvers === 'function' ? localizationFallbackContextNamespace.createBasicLocalizationFallbackResolvers : createBasicLocalizationFallbackResolversFallback;
          var localizationFallbackContext = function resolveLocalizationFallbackContext() {
            if (createLocalizationFallbackRuntimeContext) {
              try {
                var context = createLocalizationFallbackRuntimeContext({
                  fallbackSupportLite: localizationFallbackSupportLite,
                  fallbackResolutionModule: localizationFallbackResolution,
                  fallbackRegistryModule: localizationFallbackRegistry,
                  directNamespace: localizationFallbacks,
                  inlineNamespace: inlineLocalizationFallbacks,
                  collectLocalizationFactoryScopes: collectLocalizationFactoryScopes,
                  ensureLocalizationFallbackFactories: ensureLocalizationFallbackFactories,
                  resolveLocalizationFallbackContextNamespace: resolveLocalizationFallbackContextNamespace
                });
                if (context && _typeof(context) === 'object') {
                  return context;
                }
              } catch (createLocalizationFallbackContextError) {
                void createLocalizationFallbackContextError;
              }
            }
            var legacyContext = createLegacyLocalizationFallbackContext({
              fallbackSupportLite: localizationFallbackSupportLite,
              fallbackResolutionModule: localizationFallbackResolution,
              fallbackRegistryModule: localizationFallbackRegistry,
              directNamespace: localizationFallbacks,
              inlineNamespace: inlineLocalizationFallbacks,
              collectLocalizationFactoryScopes: collectLocalizationFactoryScopes,
              ensureLocalizationFallbackFactories: ensureLocalizationFallbackFactories,
              resolveLocalizationFallbackContextNamespace: resolveLocalizationFallbackContextNamespace
            });
            return legacyContext && _typeof(legacyContext) === 'object' ? legacyContext : null;
          }();
          var localizationFallbackSupport = localizationFallbackContext && localizationFallbackContext.support || null;
          var localizationFallbackRegistryInstance = localizationFallbackContext && localizationFallbackContext.registry || (localizationFallbackRegistry && typeof localizationFallbackRegistry.createFallbackResolvers === 'function' ? localizationFallbackRegistry : {
            createFallbackResolvers: function createFallbackResolvers(fallbackOptions) {
              return createBasicLocalizationFallbackResolvers(fallbackOptions);
            }
          });
          var localizationFallbackResolvers = localizationFallbackContext && localizationFallbackContext.resolvers || (localizationFallbackRegistryInstance && typeof localizationFallbackRegistryInstance.createFallbackResolvers === 'function' ? localizationFallbackRegistryInstance.createFallbackResolvers({
            directNamespace: localizationFallbacks,
            inlineNamespace: inlineLocalizationFallbacks
          }) : createBasicLocalizationFallbackResolvers({
            directNamespace: localizationFallbacks,
            inlineNamespace: inlineLocalizationFallbacks
          }));
          var localizationFallbackNamespace = localizationFallbackContext && localizationFallbackContext.namespace || (localizationFallbackResolvers && localizationFallbackResolvers.namespace && _typeof(localizationFallbackResolvers.namespace) === 'object' ? localizationFallbackResolvers.namespace : null);
          var fallbackResolveLocaleModule = localizationFallbackContext && typeof localizationFallbackContext.fallbackResolveLocaleModule === 'function' ? function fallbackResolveLocaleModuleProxy(scope) {
            try {
              return localizationFallbackContext.fallbackResolveLocaleModule(scope);
            } catch (fallbackError) {
              void fallbackError;
            }
            return null;
          } : function fallbackResolveLocaleModuleProxy() {
            return null;
          };
          var createLocaleFallbacks = localizationFallbackContext && typeof localizationFallbackContext.createLocaleFallbacks === 'function' ? function createLocaleFallbacksProxy(options) {
            try {
              return localizationFallbackContext.createLocaleFallbacks(options);
            } catch (createFallbackError) {
              void createFallbackError;
            }
            return null;
          } : function createLocaleFallbacksProxy() {
            return null;
          };
          return {
            context: localizationFallbackContext,
            support: localizationFallbackSupport,
            registry: localizationFallbackRegistryInstance,
            resolvers: localizationFallbackResolvers,
            namespace: localizationFallbackNamespace,
            fallbackResolveLocaleModule: fallbackResolveLocaleModule,
            createLocaleFallbacks: createLocaleFallbacks,
            createBasicLocalizationFallbackResolvers: createBasicLocalizationFallbackResolvers
          };
        }
        function resolveAttachmentScope() {
          var scopes = [];
          registerScope(scopes, typeof globalThis !== 'undefined' ? globalThis : null);
          registerScope(scopes, typeof window !== 'undefined' ? window : null);
          registerScope(scopes, typeof self !== 'undefined' ? self : null);
          registerScope(scopes, typeof global !== 'undefined' ? global : null);
          for (var index = 0; index < scopes.length; index += 1) {
            var scope = scopes[index];
            if (isScopeCandidate(scope)) {
              return scope;
            }
          }
          return null;
        }
        var namespace = {
          setupLocalizationFallbacks: setupLocalizationFallbacks,
          fallbackCreateLocaleFallbackHelpers: fallbackCreateLocaleFallbackHelpers,
          fallbackCreateBasicLocalizationFallbackResolvers: fallbackCreateBasicLocalizationFallbackResolvers,
          fallbackCreateLegacyLocalizationFallbackContext: fallbackCreateLegacyLocalizationFallbackContext
        };
        var namespaceName = 'cineCoreLocalizationFallbackBootstrap';
        var attachmentScope = resolveAttachmentScope();
        if (attachmentScope && _typeof(attachmentScope) === 'object') {
          var existing = attachmentScope[namespaceName] && _typeof(attachmentScope[namespaceName]) === 'object' ? attachmentScope[namespaceName] : {};
          for (var _i2 = 0, _Object$keys2 = Object.keys(namespace); _i2 < _Object$keys2.length; _i2++) {
            var key = _Object$keys2[_i2];
            existing[key] = namespace[key];
          }
          try {
            attachmentScope[namespaceName] = existing;
          } catch (assignError) {
            void assignError;
          }
        }
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = namespace;
        }
      })();
    },
    'modules/core/localization-fallback-context.js': function modules_core_localizationFallbackContextJs(module, exports, require) {
      (function () {
        function isObject(value) {
          return !!value && (_typeof(value) === 'object' || typeof value === 'function');
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
            var normalized = String(lang).trim().toLowerCase();
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
            var codes = [];
            for (var index = 0; index < config.rtlLanguageCodes.length; index += 1) {
              var rawCode = config.rtlLanguageCodes[index];
              var normalized = normalizeLanguageCodeValue(String(rawCode || ''), '');
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
          var config = baseOptions || {};
          var defaultLanguage = normalizeLanguageCodeValue(config.defaultLanguage, 'en');
          var rtlLanguageCodes = resolveRtlCodes(config);
          function normalizeLanguageCode(lang) {
            return normalizeLanguageCodeValue(lang, defaultLanguage);
          }
          function isRtlLanguage(lang) {
            var normalized = normalizeLanguageCodeValue(lang, defaultLanguage);
            var base = normalized.split('-')[0];
            return rtlLanguageCodes.indexOf(base) !== -1;
          }
          function resolveDocumentDirection(lang) {
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
            getDefaultLanguage: function getDefaultLanguage() {
              return defaultLanguage;
            },
            getRtlLanguageCodes: function getRtlLanguageCodes() {
              return rtlLanguageCodes.slice();
            },
            resolveLocaleModule: function resolveLocaleModule() {
              return null;
            },
            normalizeLanguageCode: normalizeLanguageCode,
            isRtlLanguage: isRtlLanguage,
            resolveDocumentDirection: resolveDocumentDirection,
            applyLocaleMetadata: applyLocaleMetadata
          };
        }
        function createBasicLocalizationFallbackResolvers(options) {
          return {
            namespace: {
              fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
                return null;
              },
              createLocaleFallbacks: function createLocaleFallbacks(fallbackOptions) {
                return createLocaleFallbackHelpers(fallbackOptions || options || {});
              }
            },
            fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
              return null;
            },
            createLocaleFallbacks: function createLocaleFallbacks(fallbackOptions) {
              return createLocaleFallbackHelpers(fallbackOptions || options || {});
            }
          };
        }
        function createLegacyLocalizationFallbackContext(options) {
          var config = options || {};
          var resolverOptions = {
            directNamespace: config.directNamespace,
            inlineNamespace: config.inlineNamespace
          };
          var inlineResolverFactory = config.fallbackResolutionModule && typeof config.fallbackResolutionModule.createInlineLocalizationFallbackResolversFallback === 'function' ? function inlineLocalizationFallbackResolverFactory(resolverOptionsCandidate) {
            return config.fallbackResolutionModule.createInlineLocalizationFallbackResolversFallback(resolverOptionsCandidate || resolverOptions);
          } : function basicInlineLocalizationFallbackResolverFactory(resolverOptionsCandidate) {
            return createBasicLocalizationFallbackResolvers(resolverOptionsCandidate || options);
          };
          var requireLocalizationFallbackRegistry = ensureRequireLocalizationFallbackRegistry(config.requireLocalizationFallbackRegistry);
          var requireInlineFallbackNamespace = ensureRequireInlineLocalizationFallbackNamespace(config.requireInlineFallbackNamespace);
          var support = config.fallbackResolutionModule && typeof config.fallbackResolutionModule.createLocalizationFallbackSupport === 'function' ? config.fallbackResolutionModule.createLocalizationFallbackSupport({
            coreRegistry: config.fallbackRegistryModule,
            directNamespace: config.directNamespace,
            inlineNamespace: config.inlineNamespace,
            requireLocalizationFallbackRegistry: requireLocalizationFallbackRegistry,
            requireInlineFallbackNamespace: requireInlineFallbackNamespace
          }) : null;
          var registry = support && support.registry || (config.fallbackRegistryModule && typeof config.fallbackRegistryModule.createFallbackResolvers === 'function' ? config.fallbackRegistryModule : {
            createFallbackResolvers: function createFallbackResolvers(fallbackOptions) {
              return inlineResolverFactory(fallbackOptions || resolverOptions);
            }
          });
          var resolvers = support && support.resolvers || (registry && typeof registry.createFallbackResolvers === 'function' ? registry.createFallbackResolvers(resolverOptions) : inlineResolverFactory(resolverOptions));
          var namespace = support && support.namespace || (resolvers && isObject(resolvers.namespace) ? resolvers.namespace : null);
          function createMethodProxy(methodName, fallbackValue) {
            var providers = [];
            if (support && typeof support[methodName] === 'function') {
              providers.push({
                fn: support[methodName],
                target: support
              });
            }
            if (resolvers && typeof resolvers[methodName] === 'function') {
              providers.push({
                fn: resolvers[methodName],
                target: resolvers
              });
            }
            if (providers.length === 0) {
              return function fallbackMethodProxy() {
                return fallbackValue;
              };
            }
            return function resilientMethodProxy() {
              var args = arguments;
              for (var index = 0; index < providers.length; index += 1) {
                var provider = providers[index];
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
            support: support,
            registry: registry,
            resolvers: resolvers,
            namespace: namespace,
            fallbackResolveLocaleModule: createMethodProxy('fallbackResolveLocaleModule', null),
            createLocaleFallbacks: createMethodProxy('createLocaleFallbacks', null)
          };
        }
        function createLocalizationFallbackRuntimeContext(options) {
          var config = options || {};
          var fallbackSupportLite = config.fallbackSupportLite;
          var createContext = fallbackSupportLite && typeof fallbackSupportLite.createLocalizationFallbackContext === 'function' ? fallbackSupportLite.createLocalizationFallbackContext : null;
          if (createContext) {
            try {
              var context = createContext({
                fallbackResolutionModule: config.fallbackResolutionModule,
                fallbackRegistryModule: config.fallbackRegistryModule,
                directNamespace: config.directNamespace,
                inlineNamespace: config.inlineNamespace,
                requireLocalizationFallbackRegistry: ensureRequireLocalizationFallbackRegistry(config.requireLocalizationFallbackRegistry),
                requireInlineFallbackNamespace: ensureRequireInlineLocalizationFallbackNamespace(config.requireInlineFallbackNamespace)
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
        var namespace = Object.freeze({
          createBasicLocalizationFallbackResolvers: createBasicLocalizationFallbackResolvers,
          createLegacyLocalizationFallbackContext: createLegacyLocalizationFallbackContext,
          createLocalizationFallbackRuntimeContext: createLocalizationFallbackRuntimeContext
        });
        var scope = detectGlobalScope();
        if (isObject(scope)) {
          try {
            scope.cineCoreLocalizationFallbackContext = namespace;
          } catch (assignError) {
            void assignError;
          }
        }
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = namespace;
        }
      })();
    },
    'modules/core/localization-fallback-environment.js': function modules_core_localizationFallbackEnvironmentJs(module, exports, require) {
      (function () {
        function detectRuntimeScope(primaryScope) {
          if (primaryScope && (_typeof(primaryScope) === 'object' || typeof primaryScope === 'function')) {
            return primaryScope;
          }
          if (typeof globalThis !== 'undefined' && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
            return globalThis;
          }
          if (typeof window !== 'undefined' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
            return window;
          }
          if (typeof self !== 'undefined' && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
            return self;
          }
          if (typeof global !== 'undefined' && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
            return global;
          }
          return null;
        }
        function resolveRuntimeModuleLoader(scopeCandidate) {
          if (typeof require === 'function') {
            var candidates = ['./runtime-module-loader.js'];
            for (var index = 0; index < candidates.length; index += 1) {
              var candidate = candidates[index];
              try {
                var requiredLoader = require(candidate);
                if (requiredLoader && _typeof(requiredLoader) === 'object') {
                  return requiredLoader;
                }
              } catch (runtimeLoaderError) {
                void runtimeLoaderError;
              }
            }
          }
          if (typeof cineCoreRuntimeModuleLoader !== 'undefined' && cineCoreRuntimeModuleLoader && (typeof cineCoreRuntimeModuleLoader === "undefined" ? "undefined" : _typeof(cineCoreRuntimeModuleLoader)) === 'object') {
            return cineCoreRuntimeModuleLoader;
          }
          var scope = detectRuntimeScope(scopeCandidate);
          if (scope && scope.cineCoreRuntimeModuleLoader && _typeof(scope.cineCoreRuntimeModuleLoader) === 'object') {
            return scope.cineCoreRuntimeModuleLoader;
          }
          return null;
        }
        function requireCoreRuntimeModule(moduleId, options) {
          var loader = resolveRuntimeModuleLoader(options && options.runtimeScope);
          if (loader && typeof loader.resolveCoreRuntimeModule === 'function') {
            try {
              return loader.resolveCoreRuntimeModule(moduleId, options);
            } catch (moduleResolutionError) {
              void moduleResolutionError;
            }
          }
          return null;
        }
        function resolveSupportResolver(primaryScope) {
          var runtimeScope = detectRuntimeScope(primaryScope);
          if (runtimeScope && runtimeScope.cineCoreSupportResolver && _typeof(runtimeScope.cineCoreSupportResolver) === 'object') {
            return runtimeScope.cineCoreSupportResolver;
          }
          var loaderResolver = requireCoreRuntimeModule('modules/core/support-resolver.js', {
            primaryScope: runtimeScope,
            runtimeScope: runtimeScope
          });
          if (loaderResolver && _typeof(loaderResolver) === 'object') {
            return loaderResolver;
          }
          if (typeof require === 'function') {
            try {
              var requiredResolver = require('./support-resolver.js');
              if (requiredResolver && _typeof(requiredResolver) === 'object') {
                return requiredResolver;
              }
            } catch (supportResolverError) {
              void supportResolverError;
            }
          }
          return null;
        }
        function createFallbackResolver(resolverCandidate) {
          if (resolverCandidate && typeof resolverCandidate.resolveCoreSupportModule === 'function') {
            return resolverCandidate.resolveCoreSupportModule;
          }
          return function fallbackResolveCoreSupportModule() {
            return null;
          };
        }
        function createLocalizationFallbackEnvironment(options) {
          var normalizedOptions = options && _typeof(options) === 'object' ? options : {};
          var runtimeScope = normalizedOptions.runtimeScope || null;
          var coreGlobalScope = normalizedOptions.coreGlobalScope || null;
          var requireFn = typeof normalizedOptions.requireFn === 'function' ? normalizedOptions.requireFn : null;
          var supportResolver = resolveSupportResolver(runtimeScope);
          var resolveFromResolver = createFallbackResolver(supportResolver);
          var resolveCoreSupportModule = typeof normalizedOptions.resolveCoreSupportModule === 'function' ? normalizedOptions.resolveCoreSupportModule : function resolveCoreSupportModuleProxy(namespaceName, requirePath) {
            var resolved = resolveFromResolver(namespaceName, requirePath, runtimeScope);
            if (resolved) {
              return resolved;
            }
            if (requireFn && typeof requirePath === 'string' && requirePath) {
              try {
                var requiredModule = requireFn(requirePath);
                if (requiredModule && _typeof(requiredModule) === 'object') {
                  return requiredModule;
                }
              } catch (resolveProxyRequireError) {
                void resolveProxyRequireError;
              }
            }
            return null;
          };
          var localizationFallbackBootstrapNamespace = normalizedOptions.localizationFallbackBootstrapNamespace || resolveCoreSupportModule('cineCoreLocalizationFallbackBootstrap', './modules/core/localization-fallback-bootstrap.js');
          if ((!localizationFallbackBootstrapNamespace || typeof localizationFallbackBootstrapNamespace.setupLocalizationFallbacks !== 'function') && requireFn) {
            try {
              var requiredBootstrap = requireFn('./modules/core/localization-fallback-bootstrap.js');
              if (requiredBootstrap && typeof requiredBootstrap.setupLocalizationFallbacks === 'function') {
                localizationFallbackBootstrapNamespace = requiredBootstrap;
              }
            } catch (bootstrapRequireError) {
              void bootstrapRequireError;
            }
          }
          var localizationFallbackBootstrapState = localizationFallbackBootstrapNamespace && typeof localizationFallbackBootstrapNamespace.setupLocalizationFallbacks === 'function' ? localizationFallbackBootstrapNamespace.setupLocalizationFallbacks({
            primaryRuntimeScope: runtimeScope,
            coreGlobalScope: coreGlobalScope,
            localizationFallbackFactories: normalizedOptions.localizationFallbackFactories || null,
            localizationFallbacks: normalizedOptions.localizationFallbacks || null,
            inlineLocalizationFallbacks: normalizedOptions.inlineLocalizationFallbacks || null,
            localizationFallbackRegistry: normalizedOptions.localizationFallbackRegistry || null,
            localizationFallbackResolution: normalizedOptions.localizationFallbackResolution || null,
            localizationFallbackSupportLite: normalizedOptions.localizationFallbackSupportLite || null,
            localizationInlineSupport: normalizedOptions.localizationInlineSupport || null,
            resolveCoreSupportModule: resolveCoreSupportModule,
            requireFn: requireFn
          }) : null;
          var localizationFallbackContext = localizationFallbackBootstrapState && localizationFallbackBootstrapState.context && _typeof(localizationFallbackBootstrapState.context) === 'object' ? localizationFallbackBootstrapState.context : null;
          var localizationFallbackSupport = localizationFallbackContext && localizationFallbackContext.support || (localizationFallbackBootstrapState && typeof localizationFallbackBootstrapState.support !== 'undefined' ? localizationFallbackBootstrapState.support : null);
          var createBasicLocalizationFallbackResolvers = function resolveCreateBasicResolvers() {
            if (localizationFallbackBootstrapState && typeof localizationFallbackBootstrapState.createBasicLocalizationFallbackResolvers === 'function') {
              return function createBasicLocalizationFallbackResolversProxy(fallbackOptions) {
                try {
                  return localizationFallbackBootstrapState.createBasicLocalizationFallbackResolvers(fallbackOptions);
                } catch (createBasicResolversError) {
                  void createBasicResolversError;
                }
                return null;
              };
            }
            if (localizationFallbackBootstrapNamespace && typeof localizationFallbackBootstrapNamespace.fallbackCreateBasicLocalizationFallbackResolvers === 'function') {
              return function createBasicLocalizationFallbackResolversProxy(fallbackOptions) {
                try {
                  return localizationFallbackBootstrapNamespace.fallbackCreateBasicLocalizationFallbackResolvers(fallbackOptions);
                } catch (createFallbackResolversError) {
                  void createFallbackResolversError;
                }
                return null;
              };
            }
            return function createBasicLocalizationFallbackResolversProxy() {
              return null;
            };
          }();
          var localizationFallbackRegistry = localizationFallbackContext && localizationFallbackContext.registry || (localizationFallbackBootstrapState && localizationFallbackBootstrapState.registry && _typeof(localizationFallbackBootstrapState.registry) === 'object' ? localizationFallbackBootstrapState.registry : normalizedOptions.localizationFallbackRegistry && typeof normalizedOptions.localizationFallbackRegistry.createFallbackResolvers === 'function' ? normalizedOptions.localizationFallbackRegistry : {
            createFallbackResolvers: function createFallbackResolvers(fallbackOptions) {
              return createBasicLocalizationFallbackResolvers(fallbackOptions);
            }
          });
          var localizationFallbackResolvers = localizationFallbackContext && localizationFallbackContext.resolvers || (localizationFallbackBootstrapState && localizationFallbackBootstrapState.resolvers && _typeof(localizationFallbackBootstrapState.resolvers) === 'object' ? localizationFallbackBootstrapState.resolvers : localizationFallbackRegistry && typeof localizationFallbackRegistry.createFallbackResolvers === 'function' ? localizationFallbackRegistry.createFallbackResolvers({
            directNamespace: normalizedOptions.localizationFallbacks || null,
            inlineNamespace: normalizedOptions.inlineLocalizationFallbacks || null
          }) : createBasicLocalizationFallbackResolvers({
            directNamespace: normalizedOptions.localizationFallbacks || null,
            inlineNamespace: normalizedOptions.inlineLocalizationFallbacks || null
          }));
          var localizationFallbackNamespace = localizationFallbackContext && localizationFallbackContext.namespace || (localizationFallbackResolvers && localizationFallbackResolvers.namespace && _typeof(localizationFallbackResolvers.namespace) === 'object' ? localizationFallbackResolvers.namespace : null);
          var fallbackResolveLocaleModule = function resolveFallbackResolver() {
            if (localizationFallbackBootstrapState && typeof localizationFallbackBootstrapState.fallbackResolveLocaleModule === 'function') {
              return function fallbackResolveLocaleModuleProxy(scope) {
                try {
                  return localizationFallbackBootstrapState.fallbackResolveLocaleModule(scope);
                } catch (fallbackResolveError) {
                  void fallbackResolveError;
                }
                return null;
              };
            }
            if (localizationFallbackContext && typeof localizationFallbackContext.fallbackResolveLocaleModule === 'function') {
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
          }();
          var createLocaleFallbacks = function resolveCreateLocaleFallbacks() {
            if (localizationFallbackBootstrapState && typeof localizationFallbackBootstrapState.createLocaleFallbacks === 'function') {
              return function createLocaleFallbacksProxy(createOptions) {
                try {
                  return localizationFallbackBootstrapState.createLocaleFallbacks(createOptions);
                } catch (createLocaleFallbacksError) {
                  void createLocaleFallbacksError;
                }
                return null;
              };
            }
            if (localizationFallbackContext && typeof localizationFallbackContext.createLocaleFallbacks === 'function') {
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
          }();
          return {
            localizationFallbackBootstrapNamespace: localizationFallbackBootstrapNamespace,
            localizationFallbackBootstrapState: localizationFallbackBootstrapState,
            localizationFallbackContext: localizationFallbackContext,
            localizationFallbackSupport: localizationFallbackSupport,
            createBasicLocalizationFallbackResolvers: createBasicLocalizationFallbackResolvers,
            localizationFallbackRegistry: localizationFallbackRegistry,
            localizationFallbackResolvers: localizationFallbackResolvers,
            localizationFallbackNamespace: localizationFallbackNamespace,
            fallbackResolveLocaleModule: fallbackResolveLocaleModule,
            createLocaleFallbacks: createLocaleFallbacks
          };
        }
        var namespace = {
          createLocalizationFallbackEnvironment: createLocalizationFallbackEnvironment
        };
        var runtimeScope = detectRuntimeScope();
        var targetName = 'cineCoreLocalizationFallbackEnvironment';
        var existing = runtimeScope && _typeof(runtimeScope[targetName]) === 'object' ? runtimeScope[targetName] : {};
        for (var _i3 = 0, _Object$keys3 = Object.keys(namespace); _i3 < _Object$keys3.length; _i3++) {
          var key = _Object$keys3[_i3];
          existing[key] = namespace[key];
        }
        if (runtimeScope && (_typeof(runtimeScope) === 'object' || typeof runtimeScope === 'function')) {
          try {
            runtimeScope[targetName] = existing;
          } catch (assignError) {
            void assignError;
          }
        }
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = existing;
        }
      })();
    },
    'modules/core/localization-fallback-factories.js': function modules_core_localizationFallbackFactoriesJs(module, exports, require) {
      (function () {
        function isObject(value) {
          return !!value && (_typeof(value) === 'object' || typeof value === 'function');
        }
        function registerScope(scopes, scope) {
          if (!isObject(scope) || scopes.indexOf(scope) !== -1) {
            return;
          }
          scopes.push(scope);
        }
        function collectScopeCandidates(primaryScope) {
          var scopes = [];
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
          var scopeCandidates = collectScopeCandidates(primaryScope);
          for (var index = 0; index < scopeCandidates.length; index += 1) {
            var candidateScope = scopeCandidates[index];
            try {
              var candidate = candidateScope.cineCoreLocalizationFallbackContext;
              if (isObject(candidate)) {
                return candidate;
              }
            } catch (lookupError) {
              void lookupError;
            }
          }
          if (typeof require === 'function') {
            try {
              var required = require('./localization-fallback-context.js');
              if (isObject(required)) {
                return required;
              }
            } catch (fallbackRequireError) {
              void fallbackRequireError;
            }
          }
          for (var retryIndex = 0; retryIndex < scopeCandidates.length; retryIndex += 1) {
            var retryScope = scopeCandidates[retryIndex];
            try {
              var retryCandidate = retryScope.cineCoreLocalizationFallbackContext;
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
            var normalized = String(lang).trim().toLowerCase();
            return normalized || defaultLanguage;
          } catch (normalizeError) {
            void normalizeError;
          }
          return defaultLanguage;
        }
        function resolveRtlCodes(config) {
          if (config && Array.isArray(config.rtlLanguageCodes)) {
            var codes = [];
            for (var index = 0; index < config.rtlLanguageCodes.length; index += 1) {
              var rawCode = config.rtlLanguageCodes[index];
              var normalized = normalizeLanguageCodeValue(String(rawCode || ''), '');
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
          var config = baseOptions || {};
          var defaultLanguage = normalizeLanguageCodeValue(config.defaultLanguage, 'en');
          var rtlLanguageCodes = resolveRtlCodes(config);
          function normalizeLanguageCode(lang) {
            return normalizeLanguageCodeValue(lang, defaultLanguage);
          }
          function isRtlLanguage(lang) {
            var normalized = normalizeLanguageCodeValue(lang, defaultLanguage);
            var base = normalized.split('-')[0];
            return rtlLanguageCodes.indexOf(base) !== -1;
          }
          function resolveDocumentDirection(lang) {
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
            getDefaultLanguage: function getDefaultLanguage() {
              return defaultLanguage;
            },
            getRtlLanguageCodes: function getRtlLanguageCodes() {
              return rtlLanguageCodes.slice();
            },
            resolveLocaleModule: function resolveLocaleModule() {
              return null;
            },
            normalizeLanguageCode: normalizeLanguageCode,
            isRtlLanguage: isRtlLanguage,
            resolveDocumentDirection: resolveDocumentDirection,
            applyLocaleMetadata: applyLocaleMetadata
          };
        }
        function createBasicLocalizationFallbackResolversFallback(options) {
          var baseOptions = options || {};
          return {
            namespace: {
              fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
                return null;
              },
              createLocaleFallbacks: function createLocaleFallbacks(fallbackOptions) {
                return createLocaleFallbackHelpers(fallbackOptions || baseOptions);
              }
            },
            fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
              return null;
            },
            createLocaleFallbacks: function createLocaleFallbacks(fallbackOptions) {
              return createLocaleFallbackHelpers(fallbackOptions || baseOptions);
            }
          };
        }
        function createLegacyLocalizationFallbackContextFallback(options) {
          var resolvers = createBasicLocalizationFallbackResolversFallback(options);
          var namespace = resolvers && resolvers.namespace && _typeof(resolvers.namespace) === 'object' ? resolvers.namespace : {
            fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
              return null;
            },
            createLocaleFallbacks: function createLocaleFallbacks() {
              return null;
            }
          };
          return {
            support: null,
            registry: {
              createFallbackResolvers: function createFallbackResolvers(fallbackOptions) {
                return createBasicLocalizationFallbackResolversFallback(fallbackOptions || options);
              }
            },
            resolvers: resolvers,
            namespace: namespace,
            fallbackResolveLocaleModule: namespace.fallbackResolveLocaleModule,
            createLocaleFallbacks: namespace.createLocaleFallbacks
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
        var namespace = {
          resolveLocalizationFallbackContextNamespace: resolveLocalizationFallbackContextNamespace,
          createBasicLocalizationFallbackResolversFallback: createBasicLocalizationFallbackResolversFallback,
          createLegacyLocalizationFallbackContextFallback: createLegacyLocalizationFallbackContextFallback
        };
        var globalScope = detectGlobalScope();
        var targetName = 'cineCoreLocalizationFallbackFactories';
        var existing = isObject(globalScope) && isObject(globalScope[targetName]) ? globalScope[targetName] : {};
        var target = existing;
        for (var _i4 = 0, _Object$keys4 = Object.keys(namespace); _i4 < _Object$keys4.length; _i4++) {
          var key = _Object$keys4[_i4];
          target[key] = namespace[key];
        }
        if (isObject(globalScope)) {
          try {
            globalScope[targetName] = target;
          } catch (assignError) {
            void assignError;
          }
        }
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = target;
        }
      })();
    },
    'modules/core/localization-fallback-inline-support.js': function modules_core_localizationFallbackInlineSupportJs(module, exports, require) {
      (function () {
        function isObject(value) {
          return !!value && (_typeof(value) === 'object' || typeof value === 'function');
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
        var state = {
          runtimeScope: null,
          coreGlobalScope: null,
          coreLocalizationFallbackFactories: null,
          localFactoryNamespace: null,
          resolveCoreSupportModule: null,
          requireFn: typeof require === 'function' ? require : null,
          localizationFallbackContextNamespace: null
        };
        function configure(options) {
          if (!state.coreGlobalScope) {
            state.coreGlobalScope = detectGlobalScope(state.runtimeScope);
          }
          if (!options || _typeof(options) !== 'object') {
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
            state.coreLocalizationFallbackFactories = options.coreLocalizationFallbackFactories;
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
          var scopes = [];
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
          var resolver = state.resolveCoreSupportModule;
          if (typeof resolver === 'function') {
            try {
              var resolved = resolver('cineCoreLocalizationFallbackFactories', './modules/core/localization-fallback-factories.js', primaryScope || state.runtimeScope || state.coreGlobalScope);
              if (isObject(resolved)) {
                state.localFactoryNamespace = resolved;
                return state.localFactoryNamespace;
              }
            } catch (resolveError) {
              void resolveError;
            }
          }
          var candidates = collectLocalizationFactoryScopes(primaryScope);
          for (var index = 0; index < candidates.length; index += 1) {
            var candidate = candidates[index];
            try {
              var namespaceCandidate = candidate && candidate.cineCoreLocalizationFallbackFactories;
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
          var resolver = state.resolveCoreSupportModule;
          if (typeof resolver === 'function') {
            try {
              var resolved = resolver('cineCoreLocalizationFallbackContext', './modules/core/localization-fallback-context.js', primaryScope || state.runtimeScope || state.coreGlobalScope);
              if (isObject(resolved)) {
                state.localizationFallbackContextNamespace = resolved;
                return state.localizationFallbackContextNamespace;
              }
            } catch (resolveError) {
              void resolveError;
            }
          }
          var scopeCandidates = collectLocalizationFactoryScopes(primaryScope);
          for (var index = 0; index < scopeCandidates.length; index += 1) {
            var candidateScope = scopeCandidates[index];
            try {
              var candidate = candidateScope && candidateScope.cineCoreLocalizationFallbackContext;
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
              var required = state.requireFn('./modules/core/localization-fallback-context.js');
              if (isObject(required)) {
                state.localizationFallbackContextNamespace = required;
                return state.localizationFallbackContextNamespace;
              }
            } catch (fallbackRequireError) {
              void fallbackRequireError;
            }
          }
          for (var retryIndex = 0; retryIndex < scopeCandidates.length; retryIndex += 1) {
            var retryScope = scopeCandidates[retryIndex];
            try {
              var retryCandidate = retryScope && retryScope.cineCoreLocalizationFallbackContext;
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
            var normalized = String(lang).trim().toLowerCase();
            return normalized || defaultLanguage;
          } catch (normalizeError) {
            void normalizeError;
          }
          return defaultLanguage;
        }
        function inlineResolveRtlCodes(config) {
          if (config && Array.isArray(config.rtlLanguageCodes)) {
            var codes = [];
            for (var index = 0; index < config.rtlLanguageCodes.length; index += 1) {
              var rawCode = config.rtlLanguageCodes[index];
              var normalized = inlineNormalizeLanguageCodeValue(String(rawCode || ''), '');
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
          var config = baseOptions || {};
          var defaultLanguage = inlineNormalizeLanguageCodeValue(config.defaultLanguage, 'en');
          var rtlLanguageCodes = inlineResolveRtlCodes(config);
          function normalizeLanguageCode(lang) {
            return inlineNormalizeLanguageCodeValue(lang, defaultLanguage);
          }
          function isRtlLanguage(lang) {
            var normalized = inlineNormalizeLanguageCodeValue(lang, defaultLanguage);
            var base = normalized.split('-')[0];
            return rtlLanguageCodes.indexOf(base) !== -1;
          }
          function resolveDocumentDirection(lang) {
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
            getDefaultLanguage: function getDefaultLanguage() {
              return defaultLanguage;
            },
            getRtlLanguageCodes: function getRtlLanguageCodes() {
              return rtlLanguageCodes.slice();
            },
            resolveLocaleModule: function resolveLocaleModule() {
              return null;
            },
            normalizeLanguageCode: normalizeLanguageCode,
            isRtlLanguage: isRtlLanguage,
            resolveDocumentDirection: resolveDocumentDirection,
            applyLocaleMetadata: applyLocaleMetadata
          };
        }
        function inlineCreateBasicLocalizationFallbackResolvers(options) {
          var baseOptions = options || {};
          return {
            namespace: {
              fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
                return null;
              },
              createLocaleFallbacks: function createLocaleFallbacks(fallbackOptions) {
                return inlineCreateLocaleFallbackHelpers(fallbackOptions || baseOptions);
              }
            },
            fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
              return null;
            },
            createLocaleFallbacks: function createLocaleFallbacks(fallbackOptions) {
              return inlineCreateLocaleFallbackHelpers(fallbackOptions || baseOptions);
            }
          };
        }
        function inlineCreateLegacyLocalizationFallbackContext(options) {
          var resolvers = inlineCreateBasicLocalizationFallbackResolvers(options);
          var namespace = resolvers && resolvers.namespace && _typeof(resolvers.namespace) === 'object' ? resolvers.namespace : {
            fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
              return null;
            },
            createLocaleFallbacks: function createLocaleFallbacks() {
              return null;
            }
          };
          return {
            support: null,
            registry: {
              createFallbackResolvers: function createFallbackResolvers(fallbackOptions) {
                return inlineCreateBasicLocalizationFallbackResolvers(fallbackOptions || options);
              }
            },
            resolvers: resolvers,
            namespace: namespace,
            fallbackResolveLocaleModule: namespace.fallbackResolveLocaleModule,
            createLocaleFallbacks: namespace.createLocaleFallbacks
          };
        }
        function createFallbackFactoryAccessor(methodName, inlineImplementation) {
          return function fallbackFactoryAccessor() {
            var args = arguments;
            var factories = ensureLocalizationFallbackFactories(args[0]);
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
        var namespace = {
          configure: configure,
          collectLocalizationFactoryScopes: collectLocalizationFactoryScopes,
          ensureLocalizationFallbackFactories: ensureLocalizationFallbackFactories,
          inlineResolveLocalizationFallbackContextNamespace: inlineResolveLocalizationFallbackContextNamespace,
          inlineCreateLocaleFallbackHelpers: inlineCreateLocaleFallbackHelpers,
          inlineCreateBasicLocalizationFallbackResolvers: inlineCreateBasicLocalizationFallbackResolvers,
          inlineCreateLegacyLocalizationFallbackContext: inlineCreateLegacyLocalizationFallbackContext,
          createFallbackFactoryAccessor: createFallbackFactoryAccessor
        };
        var globalScope = detectGlobalScope();
        var targetName = 'cineCoreLocalizationFallbackInlineSupport';
        var existing = isObject(globalScope) && isObject(globalScope[targetName]) ? globalScope[targetName] : {};
        for (var _i5 = 0, _Object$keys5 = Object.keys(namespace); _i5 < _Object$keys5.length; _i5++) {
          var key = _Object$keys5[_i5];
          existing[key] = namespace[key];
        }
        if (isObject(globalScope)) {
          try {
            globalScope[targetName] = existing;
          } catch (assignError) {
            void assignError;
          }
        }
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = existing;
        }
      })();
    },
    'modules/core/localization-fallback-registry.js': function modules_core_localizationFallbackRegistryJs(module, exports, require) {
      (function () {
        function resolveLocalizationFallbackNamespaceFromCandidate(candidate) {
          if (!candidate || _typeof(candidate) !== 'object' && typeof candidate !== 'function') {
            return null;
          }
          if (typeof candidate.createInlineLocalizationFallbackNamespace === 'function') {
            try {
              var generated = candidate.createInlineLocalizationFallbackNamespace();
              if (generated && _typeof(generated) === 'object') {
                return generated;
              }
            } catch (inlineNamespaceError) {
              void inlineNamespaceError;
            }
          }
          if (typeof candidate.createNamespace === 'function') {
            try {
              var created = candidate.createNamespace();
              if (created && _typeof(created) === 'object') {
                return created;
              }
            } catch (namespaceCreateError) {
              void namespaceCreateError;
            }
          }
          if (typeof candidate.fallbackResolveLocaleModule === 'function' && typeof candidate.createLocaleFallbacks === 'function') {
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
              var normalized = String(lang).trim().toLowerCase();
              return normalized || defaultLanguage;
            } catch (languageNormalizeError) {
              void languageNormalizeError;
            }
            return defaultLanguage;
          }
          function normalizeRtlCodes(options) {
            if (options && Array.isArray(options.rtlLanguageCodes)) {
              var normalized = [];
              for (var index = 0; index < options.rtlLanguageCodes.length; index += 1) {
                var rawCode = options.rtlLanguageCodes[index];
                var code = normalizeLanguageCodeValue(String(rawCode || ''), '');
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
            var candidates = [];
            if (scope && (_typeof(scope) === 'object' || typeof scope === 'function')) {
              candidates.push(scope);
            }
            if (typeof globalThis !== 'undefined') candidates.push(globalThis);
            if (typeof window !== 'undefined') candidates.push(window);
            if (typeof self !== 'undefined') candidates.push(self);
            if (typeof global !== 'undefined') candidates.push(global);
            for (var index = 0; index < candidates.length; index += 1) {
              var candidate = candidates[index];
              if (!candidate || _typeof(candidate) !== 'object' && typeof candidate !== 'function') {
                continue;
              }
              try {
                var moduleCandidate = candidate.cineLocale;
                if (moduleCandidate && _typeof(moduleCandidate) === 'object') {
                  return moduleCandidate;
                }
              } catch (localeLookupError) {
                void localeLookupError;
              }
            }
            if (typeof require === 'function') {
              try {
                var required = require('./localization.js');
                if (required && _typeof(required) === 'object') {
                  return required;
                }
              } catch (localeRequireError) {
                void localeRequireError;
              }
            }
            return null;
          }
          function createLocaleFallbacks(options) {
            var defaultLanguage = normalizeLanguageCodeValue(options && options.defaultLanguage, 'en');
            var rtlLanguageCodes = normalizeRtlCodes(options);
            function normalizeLanguageCode(lang) {
              return normalizeLanguageCodeValue(lang, defaultLanguage);
            }
            function isRtlLanguage(lang) {
              var normalized = normalizeLanguageCodeValue(lang, defaultLanguage);
              var base = normalized.split('-')[0];
              return rtlLanguageCodes.indexOf(base) !== -1;
            }
            function resolveDocumentDirection(lang) {
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
              getDefaultLanguage: function getDefaultLanguage() {
                return defaultLanguage;
              },
              getRtlLanguageCodes: function getRtlLanguageCodes() {
                return rtlLanguageCodes.slice();
              },
              resolveLocaleModule: function resolveLocaleModule() {
                return null;
              },
              normalizeLanguageCode: normalizeLanguageCode,
              isRtlLanguage: isRtlLanguage,
              resolveDocumentDirection: resolveDocumentDirection,
              applyLocaleMetadata: applyLocaleMetadata
            };
          }
          return {
            fallbackResolveLocaleModule: fallbackResolveLocaleModule,
            createLocaleFallbacks: createLocaleFallbacks,
            createNamespace: function createNamespace() {
              return this;
            },
            createInlineLocalizationFallbackNamespace: function createInlineLocalizationFallbackNamespace() {
              return this;
            }
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
          var directNamespace = resolveLocalizationFallbackNamespaceFromCandidate(options && options.directNamespace);
          if (directNamespace) {
            return directNamespace;
          }
          var inlineNamespace = resolveLocalizationFallbackNamespaceFromCandidate(options && options.inlineNamespace);
          if (inlineNamespace) {
            return inlineNamespace;
          }
          var requiredInline = resolveLocalizationFallbackNamespaceFromCandidate(resolveInlineFallbackNamespace(options));
          if (requiredInline) {
            return requiredInline;
          }
          var createMinimal = options && typeof options.createMinimalNamespace === 'function' ? options.createMinimalNamespace : createMinimalLocalizationFallbackNamespace;
          return resolveLocalizationFallbackNamespaceFromCandidate(createMinimal());
        }
        function createFallbackResolvers(options) {
          var namespace = resolveLocalizationFallbackNamespace(options);
          function fallbackResolveLocaleModuleProxy(scope) {
            if (namespace && typeof namespace.fallbackResolveLocaleModule === 'function') {
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
            namespace: namespace,
            fallbackResolveLocaleModule: fallbackResolveLocaleModuleProxy,
            createLocaleFallbacks: createLocaleFallbacksProxy
          };
        }
        function detectGlobalScope() {
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
        var namespace = {
          resolveLocalizationFallbackNamespaceFromCandidate: resolveLocalizationFallbackNamespaceFromCandidate,
          createMinimalLocalizationFallbackNamespace: createMinimalLocalizationFallbackNamespace,
          resolveLocalizationFallbackNamespace: resolveLocalizationFallbackNamespace,
          createFallbackResolvers: createFallbackResolvers
        };
        var globalScope = detectGlobalScope();
        var targetName = 'cineCoreLocalizationFallbackRegistry';
        var existing = globalScope && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
        var target = existing;
        for (var _i6 = 0, _Object$keys6 = Object.keys(namespace); _i6 < _Object$keys6.length; _i6++) {
          var key = _Object$keys6[_i6];
          target[key] = namespace[key];
        }
        if (globalScope && _typeof(globalScope) === 'object') {
          try {
            globalScope[targetName] = target;
          } catch (assignError) {
            void assignError;
          }
        }
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = target;
        }
      })();
    },
    'modules/core/localization-fallback-resolution.js': function modules_core_localizationFallbackResolutionJs(module, exports, require) {
      (function () {
        function detectScope(primary) {
          if (primary && (_typeof(primary) === 'object' || typeof primary === 'function')) {
            return primary;
          }
          if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object') {
            return CORE_GLOBAL_SCOPE;
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
        function resolveLocalizationFallbackRegistryFromScopes(primary) {
          var candidateScopes = [primary && (_typeof(primary) === 'object' || typeof primary === 'function') ? primary : null, typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' ? CORE_GLOBAL_SCOPE : null, typeof globalThis !== 'undefined' && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' ? globalThis : null, typeof window !== 'undefined' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' ? window : null, typeof self !== 'undefined' && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' ? self : null, typeof global !== 'undefined' && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' ? global : null];
          for (var index = 0; index < candidateScopes.length; index += 1) {
            var scope = candidateScopes[index];
            if (!scope) {
              continue;
            }
            try {
              var registryCandidate = scope.cineCoreLocalizationFallbackRegistry;
              if (registryCandidate && typeof registryCandidate.createFallbackResolvers === 'function') {
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
            if (!candidate || _typeof(candidate) !== 'object' && typeof candidate !== 'function') {
              return null;
            }
            if (typeof candidate.createInlineLocalizationFallbackNamespace === 'function') {
              try {
                var generated = candidate.createInlineLocalizationFallbackNamespace();
                if (generated && _typeof(generated) === 'object') {
                  return generated;
                }
              } catch (inlineNamespaceError) {
                void inlineNamespaceError;
              }
            }
            if (typeof candidate.createNamespace === 'function') {
              try {
                var created = candidate.createNamespace();
                if (created && _typeof(created) === 'object') {
                  return created;
                }
              } catch (namespaceCreateError) {
                void namespaceCreateError;
              }
            }
            if (typeof candidate.fallbackResolveLocaleModule === 'function' && typeof candidate.createLocaleFallbacks === 'function') {
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
                var normalized = String(lang).trim().toLowerCase();
                return normalized || defaultLanguage;
              } catch (languageNormalizeError) {
                void languageNormalizeError;
              }
              return defaultLanguage;
            }
            function normalizeRtlCodes(fallbackOptions) {
              if (fallbackOptions && Array.isArray(fallbackOptions.rtlLanguageCodes)) {
                var normalized = [];
                for (var index = 0; index < fallbackOptions.rtlLanguageCodes.length; index += 1) {
                  var rawCode = fallbackOptions.rtlLanguageCodes[index];
                  var code = normalizeLanguageCodeValue(String(rawCode || ''), '');
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
              var candidates = [];
              if (scope && (_typeof(scope) === 'object' || typeof scope === 'function')) {
                candidates.push(scope);
              }
              if (typeof globalThis !== 'undefined') candidates.push(globalThis);
              if (typeof window !== 'undefined') candidates.push(window);
              if (typeof self !== 'undefined') candidates.push(self);
              if (typeof global !== 'undefined') candidates.push(global);
              for (var index = 0; index < candidates.length; index += 1) {
                var candidate = candidates[index];
                if (!candidate || _typeof(candidate) !== 'object' && typeof candidate !== 'function') {
                  continue;
                }
                try {
                  var moduleCandidate = candidate.cineLocale;
                  if (moduleCandidate && _typeof(moduleCandidate) === 'object') {
                    return moduleCandidate;
                  }
                } catch (localeLookupError) {
                  void localeLookupError;
                }
              }
              if (typeof require === 'function') {
                try {
                  var required = require('./localization.js');
                  if (required && _typeof(required) === 'object') {
                    return required;
                  }
                } catch (localeRequireError) {
                  void localeRequireError;
                }
              }
              return null;
            }
            function createLocaleFallbacks(fallbackOptions) {
              var defaultLanguage = normalizeLanguageCodeValue(fallbackOptions && fallbackOptions.defaultLanguage, 'en');
              var rtlLanguageCodes = normalizeRtlCodes(fallbackOptions);
              function normalizeLanguageCode(lang) {
                return normalizeLanguageCodeValue(lang, defaultLanguage);
              }
              function isRtlLanguage(lang) {
                var normalized = normalizeLanguageCodeValue(lang, defaultLanguage);
                var base = normalized.split('-')[0];
                return rtlLanguageCodes.indexOf(base) !== -1;
              }
              function resolveDocumentDirection(lang) {
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
                getDefaultLanguage: function getDefaultLanguage() {
                  return defaultLanguage;
                },
                getRtlLanguageCodes: function getRtlLanguageCodes() {
                  return rtlLanguageCodes.slice();
                },
                resolveLocaleModule: function resolveLocaleModule() {
                  return null;
                },
                normalizeLanguageCode: normalizeLanguageCode,
                isRtlLanguage: isRtlLanguage,
                resolveDocumentDirection: resolveDocumentDirection,
                applyLocaleMetadata: applyLocaleMetadata
              };
            }
            return {
              fallbackResolveLocaleModule: fallbackResolveLocaleModule,
              createLocaleFallbacks: createLocaleFallbacks
            };
          }
          var directNamespace = resolveLocalizationFallbackNamespaceFromCandidate(options && options.directNamespace);
          var inlineNamespace = directNamespace ? null : resolveLocalizationFallbackNamespaceFromCandidate(options && options.inlineNamespace);
          var namespace = directNamespace || inlineNamespace || resolveLocalizationFallbackNamespaceFromCandidate(createMinimalLocalizationFallbackNamespace());
          var safeNamespace = namespace || createMinimalLocalizationFallbackNamespace();
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
            createLocaleFallbacks: createLocaleFallbacksProxy
          };
        }
        function tryRequireLocalizationFallbackRegistry(options) {
          if (options && typeof options.requireLocalizationFallbackRegistry === 'function') {
            try {
              var required = options.requireLocalizationFallbackRegistry();
              if (required && typeof required.createFallbackResolvers === 'function') {
                return required;
              }
            } catch (registryRequireError) {
              void registryRequireError;
            }
          }
          if (typeof require === 'function') {
            try {
              var _required = require('./localization-fallback-registry.js');
              if (_required && typeof _required.createFallbackResolvers === 'function') {
                return _required;
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
              var required = options.requireInlineFallbackNamespace();
              if (required && _typeof(required) === 'object') {
                return required;
              }
            } catch (inlineRequireError) {
              void inlineRequireError;
            }
          }
          if (typeof require === 'function') {
            try {
              var _required2 = require('./localization-inline-fallbacks.js');
              if (_required2 && _typeof(_required2) === 'object') {
                return _required2;
              }
            } catch (requireInlineFallbackError) {
              void requireInlineFallbackError;
            }
          }
          return null;
        }
        function createInlineFallbackRegistry() {
          return {
            createFallbackResolvers: function createFallbackResolvers(fallbackOptions) {
              return createInlineLocalizationFallbackResolversFallback(fallbackOptions);
            }
          };
        }
        function createLocalizationFallbackSupport(options) {
          var coreRegistry = options && options.coreRegistry && typeof options.coreRegistry.createFallbackResolvers === 'function' ? options.coreRegistry : null;
          var scopedRegistry = resolveLocalizationFallbackRegistryFromScopes(options && options.primaryScope);
          var requiredRegistry = tryRequireLocalizationFallbackRegistry(options);
          var registry = coreRegistry || scopedRegistry || requiredRegistry || createInlineFallbackRegistry();
          var resolverOptions = {
            directNamespace: options && options.directNamespace,
            inlineNamespace: options && options.inlineNamespace,
            requireInlineFallbackNamespace: function requireInlineFallbackNamespace() {
              return resolveInlineFallbackNamespace(options);
            }
          };
          var resolvers = registry && typeof registry.createFallbackResolvers === 'function' ? registry.createFallbackResolvers(resolverOptions) : createInlineLocalizationFallbackResolversFallback(resolverOptions);
          var namespace = resolvers && resolvers.namespace && _typeof(resolvers.namespace) === 'object' ? resolvers.namespace : null;
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
            registry: registry,
            resolvers: resolvers,
            namespace: namespace,
            fallbackResolveLocaleModule: fallbackResolveLocaleModuleProxy,
            createLocaleFallbacks: createLocaleFallbacksProxy
          };
        }
        var namespace = {
          resolveLocalizationFallbackRegistryFromScopes: resolveLocalizationFallbackRegistryFromScopes,
          createInlineLocalizationFallbackResolversFallback: createInlineLocalizationFallbackResolversFallback,
          createLocalizationFallbackSupport: createLocalizationFallbackSupport
        };
        var globalScope = detectScope();
        var targetName = 'cineCoreLocalizationFallbackResolution';
        var existing = globalScope && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
        for (var _i7 = 0, _Object$keys7 = Object.keys(namespace); _i7 < _Object$keys7.length; _i7++) {
          var key = _Object$keys7[_i7];
          existing[key] = namespace[key];
        }
        if (globalScope && _typeof(globalScope) === 'object') {
          try {
            globalScope[targetName] = existing;
          } catch (assignError) {
            void assignError;
          }
        }
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = existing;
        }
      })();
    },
    'modules/core/localization-fallback-support-lite.js': function modules_core_localizationFallbackSupportLiteJs(module, exports, require) {
      (function () {
        function createBasicLocalizationFallbackResolvers(options) {
          function normalizeLanguageCodeValue(lang, defaultLanguage) {
            if (!lang) {
              return defaultLanguage;
            }
            try {
              var normalized = String(lang).trim().toLowerCase();
              return normalized || defaultLanguage;
            } catch (normalizeError) {
              void normalizeError;
            }
            return defaultLanguage;
          }
          function resolveRtlCodes(fallbackOptions) {
            if (fallbackOptions && Array.isArray(fallbackOptions.rtlLanguageCodes)) {
              var codes = [];
              for (var index = 0; index < fallbackOptions.rtlLanguageCodes.length; index += 1) {
                var rawCode = fallbackOptions.rtlLanguageCodes[index];
                var normalized = normalizeLanguageCodeValue(String(rawCode || ''), '');
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
            var defaultLanguage = normalizeLanguageCodeValue(fallbackOptions && fallbackOptions.defaultLanguage, 'en');
            var rtlLanguageCodes = resolveRtlCodes(fallbackOptions);
            function normalizeLanguageCode(lang) {
              return normalizeLanguageCodeValue(lang, defaultLanguage);
            }
            function isRtlLanguage(lang) {
              var normalized = normalizeLanguageCodeValue(lang, defaultLanguage);
              var base = normalized.split('-')[0];
              return rtlLanguageCodes.indexOf(base) !== -1;
            }
            function resolveDocumentDirection(lang) {
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
              getDefaultLanguage: function getDefaultLanguage() {
                return defaultLanguage;
              },
              getRtlLanguageCodes: function getRtlLanguageCodes() {
                return rtlLanguageCodes.slice();
              },
              resolveLocaleModule: function resolveLocaleModule() {
                return null;
              },
              normalizeLanguageCode: normalizeLanguageCode,
              isRtlLanguage: isRtlLanguage,
              resolveDocumentDirection: resolveDocumentDirection,
              applyLocaleMetadata: applyLocaleMetadata
            };
          }
          var namespace = {
            fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
              return null;
            },
            createLocaleFallbacks: function createLocaleFallbacks(fallbackOptions) {
              return createLocaleFallbackHelpers(fallbackOptions || options || {});
            }
          };
          return {
            namespace: namespace,
            fallbackResolveLocaleModule: function fallbackResolveLocaleModule(scope) {
              void scope;
              return null;
            },
            createLocaleFallbacks: function createLocaleFallbacks(fallbackOptions) {
              return createLocaleFallbackHelpers(fallbackOptions || options || {});
            }
          };
        }
        function createLocalizationFallbackContext(configuration) {
          var config = configuration || {};
          var fallbackResolutionModule = config.fallbackResolutionModule;
          var fallbackRegistryModule = config.fallbackRegistryModule;
          var directNamespace = config.directNamespace;
          var inlineNamespace = config.inlineNamespace;
          var requireFallbackRegistry = typeof config.requireLocalizationFallbackRegistry === 'function' ? config.requireLocalizationFallbackRegistry : function requireLocalizationFallbackRegistryFallback() {
            return null;
          };
          var requireInlineFallbackNamespace = typeof config.requireInlineFallbackNamespace === 'function' ? config.requireInlineFallbackNamespace : function requireInlineFallbackNamespaceFallback() {
            return null;
          };
          var support = fallbackResolutionModule && typeof fallbackResolutionModule.createLocalizationFallbackSupport === 'function' ? fallbackResolutionModule.createLocalizationFallbackSupport({
            coreRegistry: fallbackRegistryModule,
            directNamespace: directNamespace,
            inlineNamespace: inlineNamespace,
            requireLocalizationFallbackRegistry: requireFallbackRegistry,
            requireInlineFallbackNamespace: requireInlineFallbackNamespace
          }) : null;
          var inlineFactory = fallbackResolutionModule && typeof fallbackResolutionModule.createInlineLocalizationFallbackResolversFallback === 'function' ? function inlineLocalizationFallbackResolverFactory(options) {
            return fallbackResolutionModule.createInlineLocalizationFallbackResolversFallback(options);
          } : function basicLocalizationFallbackResolverFactory(options) {
            return createBasicLocalizationFallbackResolvers(options);
          };
          var registry = support && support.registry || (fallbackRegistryModule && typeof fallbackRegistryModule.createFallbackResolvers === 'function' ? fallbackRegistryModule : null) || {
            createFallbackResolvers: function createFallbackResolvers(fallbackOptions) {
              return inlineFactory(fallbackOptions);
            }
          };
          var resolvers = support && support.resolvers || (registry && typeof registry.createFallbackResolvers === 'function' ? registry.createFallbackResolvers({
            directNamespace: directNamespace,
            inlineNamespace: inlineNamespace
          }) : inlineFactory({
            directNamespace: directNamespace,
            inlineNamespace: inlineNamespace
          }));
          var namespace = support && support.namespace || (resolvers && resolvers.namespace && _typeof(resolvers.namespace) === 'object' ? resolvers.namespace : null);
          function createMethodProxy(methodName, fallbackValue) {
            var providers = [];
            if (support && typeof support[methodName] === 'function') {
              providers.push({
                fn: support[methodName],
                target: support
              });
            }
            if (resolvers && typeof resolvers[methodName] === 'function') {
              providers.push({
                fn: resolvers[methodName],
                target: resolvers
              });
            }
            if (providers.length === 0) {
              return function fallbackMethodProxy() {
                return fallbackValue;
              };
            }
            return function resilientMethodProxy() {
              var args = arguments;
              for (var index = 0; index < providers.length; index += 1) {
                var provider = providers[index];
                try {
                  return provider.fn.apply(provider.target, args);
                } catch (providerError) {
                  void providerError;
                }
              }
              return fallbackValue;
            };
          }
          var fallbackResolveLocaleModule = createMethodProxy('fallbackResolveLocaleModule', null);
          var createLocaleFallbacks = createMethodProxy('createLocaleFallbacks', null);
          return {
            support: support,
            registry: registry,
            resolvers: resolvers,
            namespace: namespace,
            fallbackResolveLocaleModule: fallbackResolveLocaleModule,
            createLocaleFallbacks: createLocaleFallbacks
          };
        }
        var namespace = {
          createBasicLocalizationFallbackResolvers: createBasicLocalizationFallbackResolvers,
          createLocalizationFallbackContext: createLocalizationFallbackContext
        };
        var globalScope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
        if (globalScope && _typeof(globalScope) === 'object') {
          var targetName = 'cineCoreLocalizationFallbackSupportLite';
          var existing = _typeof(globalScope[targetName]) === 'object' && globalScope[targetName] || {};
          for (var _i8 = 0, _Object$keys8 = Object.keys(namespace); _i8 < _Object$keys8.length; _i8++) {
            var key = _Object$keys8[_i8];
            existing[key] = namespace[key];
          }
          try {
            globalScope[targetName] = existing;
          } catch (assignError) {
            void assignError;
          }
        }
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = namespace;
        }
      })();
    },
    'modules/core/localization-fallbacks.js': function modules_core_localizationFallbacksJs(module, exports, require) {
      (function () {
        var FALLBACK_DEFAULT_LANGUAGE = 'en';
        var FALLBACK_RTL_CODES = Object.freeze(['ar', 'fa', 'he', 'ur']);
        function detectGlobalScope() {
          if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' && globalThis) {
            return globalThis;
          }
          if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window) {
            return window;
          }
          if ((typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' && self) {
            return self;
          }
          if ((typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' && global) {
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
          var candidate = options && typeof options.defaultLanguage === 'string' ? toLowerCaseSafe(options.defaultLanguage) : '';
          return candidate || FALLBACK_DEFAULT_LANGUAGE;
        }
        function normaliseRtlCodes(options) {
          if (options && Array.isArray(options.rtlLanguageCodes)) {
            var normalised = [];
            for (var index = 0; index < options.rtlLanguageCodes.length; index += 1) {
              var rawCode = options.rtlLanguageCodes[index];
              var code = toLowerCaseSafe(String(rawCode || ''));
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
          if (typeof cineLocale !== 'undefined' && cineLocale && (typeof cineLocale === "undefined" ? "undefined" : _typeof(cineLocale)) === 'object') {
            return cineLocale;
          }
          var candidates = [];
          if (scope && (_typeof(scope) === 'object' || typeof scope === 'function')) {
            candidates.push(scope);
          }
          if (typeof globalThis !== 'undefined') candidates.push(globalThis);
          if (typeof window !== 'undefined') candidates.push(window);
          if (typeof self !== 'undefined') candidates.push(self);
          if (typeof global !== 'undefined') candidates.push(global);
          for (var index = 0; index < candidates.length; index += 1) {
            var candidate = candidates[index];
            if (!candidate || _typeof(candidate) !== 'object' && typeof candidate !== 'function') {
              continue;
            }
            try {
              var moduleCandidate = candidate.cineLocale;
              if (moduleCandidate && _typeof(moduleCandidate) === 'object') {
                return moduleCandidate;
              }
            } catch (localeLookupError) {
              void localeLookupError;
            }
          }
          if (typeof require === 'function') {
            try {
              var required = require('./modules/localization.js');
              if (required && _typeof(required) === 'object') {
                return required;
              }
            } catch (localeRequireError) {
              void localeRequireError;
            }
          }
          return null;
        }
        function fallbackNormalizeLanguageCode(lang, options) {
          var defaultLanguage = normaliseDefaultLanguage(options);
          if (!lang) {
            return defaultLanguage;
          }
          try {
            var normalised = String(lang).trim().toLowerCase();
            return normalised || defaultLanguage;
          } catch (languageNormalizeError) {
            void languageNormalizeError;
          }
          return defaultLanguage;
        }
        function fallbackIsRtlLanguage(lang, options) {
          var rtlCodes = normaliseRtlCodes(options);
          var normalized = fallbackNormalizeLanguageCode(lang, options);
          var base = normalized.split('-')[0];
          return rtlCodes.indexOf(base) !== -1;
        }
        function fallbackResolveDocumentDirection(lang, options) {
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
          var defaultLanguage = normaliseDefaultLanguage(options);
          var rtlLanguageCodes = normaliseRtlCodes(options);
          return {
            getDefaultLanguage: function getDefaultLanguage() {
              return defaultLanguage;
            },
            getRtlLanguageCodes: function getRtlLanguageCodes() {
              return rtlLanguageCodes.slice();
            },
            resolveLocaleModule: function resolveLocaleModule(scope) {
              return fallbackResolveLocaleModule(scope);
            },
            normalizeLanguageCode: function normalizeLanguageCode(lang) {
              return fallbackNormalizeLanguageCode(lang, {
                defaultLanguage: defaultLanguage
              });
            },
            isRtlLanguage: function isRtlLanguage(lang) {
              return fallbackIsRtlLanguage(lang, {
                defaultLanguage: defaultLanguage,
                rtlLanguageCodes: rtlLanguageCodes
              });
            },
            resolveDocumentDirection: function resolveDocumentDirection(lang) {
              return fallbackResolveDocumentDirection(lang, {
                defaultLanguage: defaultLanguage,
                rtlLanguageCodes: rtlLanguageCodes
              });
            },
            applyLocaleMetadata: function applyLocaleMetadata(target, lang, direction) {
              return fallbackApplyLocaleMetadata(target, lang, direction);
            }
          };
        }
        var namespace = {
          fallbackResolveLocaleModule: fallbackResolveLocaleModule,
          fallbackNormalizeLanguageCode: fallbackNormalizeLanguageCode,
          fallbackIsRtlLanguage: fallbackIsRtlLanguage,
          fallbackResolveDocumentDirection: fallbackResolveDocumentDirection,
          fallbackApplyLocaleMetadata: fallbackApplyLocaleMetadata,
          createLocaleFallbacks: createLocaleFallbacks
        };
        var globalScope = detectGlobalScope();
        var targetName = 'cineCoreLocalizationFallbacks';
        var existing = globalScope && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
        for (var _i9 = 0, _Object$keys9 = Object.keys(namespace); _i9 < _Object$keys9.length; _i9++) {
          var key = _Object$keys9[_i9];
          existing[key] = namespace[key];
        }
        if (globalScope) {
          try {
            globalScope[targetName] = existing;
          } catch (assignError) {
            void assignError;
          }
        }
        if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = existing;
        }
      })();
    },
    'modules/core/localization-inline-fallbacks.js': function modules_core_localizationInlineFallbacksJs(module, exports, require) {
      (function () {
        function detectRuntimeScope() {
          if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && ((typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' || typeof CORE_GLOBAL_SCOPE === 'function')) {
            return CORE_GLOBAL_SCOPE;
          }
          if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' && globalThis) {
            return globalThis;
          }
          if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window) {
            return window;
          }
          if ((typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' && self) {
            return self;
          }
          if ((typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' && global) {
            return global;
          }
          return null;
        }
        function createInlineLocalizationFallbackImplementation() {
          function inlineFallbackResolveLocaleModule(scope) {
            if (typeof cineLocale !== 'undefined' && cineLocale && (typeof cineLocale === "undefined" ? "undefined" : _typeof(cineLocale)) === 'object') {
              return cineLocale;
            }
            var candidates = [];
            if (scope && (_typeof(scope) === 'object' || typeof scope === 'function')) {
              candidates.push(scope);
            }
            if (typeof globalThis !== 'undefined') candidates.push(globalThis);
            if (typeof window !== 'undefined') candidates.push(window);
            if (typeof self !== 'undefined') candidates.push(self);
            if (typeof global !== 'undefined') candidates.push(global);
            for (var index = 0; index < candidates.length; index += 1) {
              var candidate = candidates[index];
              if (!candidate || _typeof(candidate) !== 'object' && typeof candidate !== 'function') {
                continue;
              }
              try {
                var moduleCandidate = candidate.cineLocale;
                if (moduleCandidate && _typeof(moduleCandidate) === 'object') {
                  return moduleCandidate;
                }
              } catch (localeLookupError) {
                void localeLookupError;
              }
            }
            if (typeof require === 'function') {
              try {
                var required = require('../localization.js');
                if (required && _typeof(required) === 'object') {
                  return required;
                }
              } catch (localeRequireError) {
                void localeRequireError;
              }
            }
            return null;
          }
          function inlineCreateLocaleFallbacks(options) {
            var defaultLanguage = function resolveDefaultLanguageOption() {
              if (options && typeof options.defaultLanguage === 'string') {
                try {
                  var normalized = options.defaultLanguage.trim().toLowerCase();
                  return normalized || 'en';
                } catch (defaultLanguageNormalizeError) {
                  void defaultLanguageNormalizeError;
                }
              }
              return 'en';
            }();
            var rtlLanguageCodes = function resolveRtlCodesOption() {
              if (options && Array.isArray(options.rtlLanguageCodes)) {
                var collected = [];
                for (var index = 0; index < options.rtlLanguageCodes.length; index += 1) {
                  var rawCode = options.rtlLanguageCodes[index];
                  if (typeof rawCode === 'string') {
                    try {
                      var normalized = rawCode.trim().toLowerCase();
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
            }();
            function inlineNormalizeLanguageCode(lang) {
              if (!lang) {
                return defaultLanguage;
              }
              try {
                var normalized = String(lang).trim().toLowerCase();
                return normalized || defaultLanguage;
              } catch (languageNormalizeError) {
                void languageNormalizeError;
              }
              return defaultLanguage;
            }
            function inlineIsRtlLanguage(lang) {
              var normalized = inlineNormalizeLanguageCode(lang);
              var base = normalized.split('-')[0];
              return rtlLanguageCodes.indexOf(base) !== -1;
            }
            function inlineResolveDocumentDirection(lang) {
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
              getDefaultLanguage: function getDefaultLanguage() {
                return defaultLanguage;
              },
              getRtlLanguageCodes: function getRtlLanguageCodes() {
                return rtlLanguageCodes.slice();
              },
              resolveLocaleModule: function resolveLocaleModule(scope) {
                return inlineFallbackResolveLocaleModule(scope);
              },
              normalizeLanguageCode: function normalizeLanguageCode(lang) {
                return inlineNormalizeLanguageCode(lang);
              },
              isRtlLanguage: function isRtlLanguage(lang) {
                return inlineIsRtlLanguage(lang);
              },
              resolveDocumentDirection: function resolveDocumentDirection(lang) {
                return inlineResolveDocumentDirection(lang);
              },
              applyLocaleMetadata: function applyLocaleMetadata(target, lang, direction) {
                return inlineApplyLocaleMetadata(target, lang, direction);
              }
            };
          }
          return {
            fallbackResolveLocaleModule: inlineFallbackResolveLocaleModule,
            createLocaleFallbacks: inlineCreateLocaleFallbacks
          };
        }
        function resolveFallbackModule() {
          var scope = detectRuntimeScope();
          if (scope && scope.cineCoreLocalizationFallbacks && _typeof(scope.cineCoreLocalizationFallbacks) === 'object') {
            return scope.cineCoreLocalizationFallbacks;
          }
          if (typeof require === 'function') {
            try {
              var requiredFallbacks = require('./localization-fallbacks.js');
              if (requiredFallbacks && _typeof(requiredFallbacks) === 'object') {
                return requiredFallbacks;
              }
            } catch (fallbackRequireError) {
              void fallbackRequireError;
            }
          }
          return null;
        }
        function createInlineLocalizationFallbackNamespace() {
          var fallbackModule = resolveFallbackModule();
          if (fallbackModule && _typeof(fallbackModule) === 'object' && typeof fallbackModule.fallbackResolveLocaleModule === 'function' && typeof fallbackModule.createLocaleFallbacks === 'function') {
            return {
              fallbackResolveLocaleModule: function fallbackResolveLocaleModule(scope) {
                return fallbackModule.fallbackResolveLocaleModule(scope);
              },
              createLocaleFallbacks: function createLocaleFallbacks(options) {
                return fallbackModule.createLocaleFallbacks(options);
              }
            };
          }
          return createInlineLocalizationFallbackImplementation();
        }
        var runtimeScope = detectRuntimeScope();
        var namespace = createInlineLocalizationFallbackNamespace();
        namespace.createInlineLocalizationFallbackNamespace = createInlineLocalizationFallbackNamespace;
        namespace.createNamespace = createInlineLocalizationFallbackNamespace;
        if (runtimeScope && _typeof(runtimeScope) === 'object') {
          var targetName = 'cineCoreLocalizationInlineFallbacks';
          var existing = runtimeScope[targetName] && _typeof(runtimeScope[targetName]) === 'object' ? runtimeScope[targetName] : namespace;
          existing.fallbackResolveLocaleModule = namespace.fallbackResolveLocaleModule;
          existing.createLocaleFallbacks = namespace.createLocaleFallbacks;
          existing.createInlineLocalizationFallbackNamespace = namespace.createInlineLocalizationFallbackNamespace;
          existing.createNamespace = namespace.createNamespace;
          runtimeScope[targetName] = existing;
          if (_typeof(module) === 'object' && module && module.exports) {
            module.exports = existing;
          }
        } else if (_typeof(module) === 'object' && module && module.exports) {
          module.exports = namespace;
        }
      })();
    },
    'modules/core/localization-runtime-environment.js': function modules_core_localizationRuntimeEnvironmentJs(module, exports, require) {
      (function () {
        function isObject(value) {
          return !!value && (_typeof(value) === 'object' || typeof value === 'function');
        }
        function safeRequire(requireFn, requirePath) {
          if (typeof requireFn !== 'function' || typeof requirePath !== 'string') {
            return null;
          }
          try {
            var required = requireFn(requirePath);
            return isObject(required) ? required : null;
          } catch (requireError) {
            void requireError;
          }
          return null;
        }
        function readOption(options, key) {
          if (options && _typeof(options) === 'object' && key in options) {
            return options[key];
          }
          return null;
        }
        function resolveModule(resolver, requireFn, namespaceName, requirePath) {
          if (typeof resolver === 'function') {
            try {
              var resolved = resolver(namespaceName, requirePath);
              if (isObject(resolved)) {
                return resolved;
              }
            } catch (resolutionError) {
              void resolutionError;
            }
          }
          if (typeof requirePath === 'string' && requirePath) {
            var required = safeRequire(requireFn, requirePath);
            if (required) {
              return required;
            }
          }
          return null;
        }
        function ensureInlineSupport(options) {
          var inlineSupport = resolveModule(options.resolveCoreSupportModule, options.requireFn, 'cineCoreLocalizationFallbackInlineSupport', './modules/core/localization-fallback-inline-support.js');
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
                requireFn: options.requireFn
              });
            } catch (inlineSupportConfigureError) {
              void inlineSupportConfigureError;
            }
          }
          return inlineSupport;
        }
        function readLocalizationFallbackEnvironment(options) {
          var environmentModule = resolveModule(options.resolveCoreSupportModule, options.requireFn, 'cineCoreLocalizationFallbackEnvironment', './modules/core/localization-fallback-environment.js');
          if (!isObject(environmentModule) || typeof environmentModule.createLocalizationFallbackEnvironment !== 'function') {
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
              localizationInlineSupport: options.localizationInlineSupport
            });
          } catch (environmentCreationError) {
            void environmentCreationError;
          }
          return null;
        }
        function createLocalizationRuntimeEnvironment(untrustedOptions) {
          var options = isObject(untrustedOptions) ? untrustedOptions : {};
          var resolver = typeof options.resolveCoreSupportModule === 'function' ? options.resolveCoreSupportModule : null;
          var requireFn = typeof options.requireFn === 'function' ? options.requireFn : null;
          var runtimeScope = readOption(options, 'runtimeScope');
          var coreGlobalScope = readOption(options, 'coreGlobalScope');
          var localizationFallbacks = resolveModule(resolver, requireFn, 'cineCoreLocalizationFallbacks', './modules/core/localization-fallbacks.js');
          var inlineLocalizationFallbacks = resolveModule(resolver, requireFn, 'cineCoreLocalizationInlineFallbacks', './modules/core/localization-inline-fallbacks.js');
          var localizationFallbackRegistry = resolveModule(resolver, requireFn, 'cineCoreLocalizationFallbackRegistry', './modules/core/localization-fallback-registry.js');
          var localizationFallbackResolution = resolveModule(resolver, requireFn, 'cineCoreLocalizationFallbackResolution', './modules/core/localization-fallback-resolution.js');
          var localizationFallbackSupportLite = resolveModule(resolver, requireFn, 'cineCoreLocalizationFallbackSupportLite', './modules/core/localization-fallback-support-lite.js');
          if (!localizationFallbackSupportLite) {
            localizationFallbackSupportLite = safeRequire(requireFn, './modules/core/localization-fallback-support-lite.js');
          }
          var localizationFallbackFactories = resolveModule(resolver, requireFn, 'cineCoreLocalizationFallbackFactories', './modules/core/localization-fallback-factories.js');
          var inlineSupport = ensureInlineSupport({
            resolveCoreSupportModule: resolver,
            requireFn: requireFn,
            runtimeScope: runtimeScope,
            coreGlobalScope: coreGlobalScope,
            localizationFallbackFactories: localizationFallbackFactories
          });
          var fallbackEnvironment = readLocalizationFallbackEnvironment({
            resolveCoreSupportModule: resolver,
            requireFn: requireFn,
            runtimeScope: runtimeScope,
            coreGlobalScope: coreGlobalScope,
            localizationFallbackFactories: localizationFallbackFactories,
            localizationFallbacks: localizationFallbacks,
            inlineLocalizationFallbacks: inlineLocalizationFallbacks,
            localizationFallbackRegistry: localizationFallbackRegistry,
            localizationFallbackResolution: localizationFallbackResolution,
            localizationFallbackSupportLite: localizationFallbackSupportLite,
            localizationInlineSupport: inlineSupport
          });
          function createBasicLocalizationFallbackResolversProxy(fallbackOptions) {
            void fallbackOptions;
            return null;
          }
          var createBasicLocalizationFallbackResolvers = fallbackEnvironment && typeof fallbackEnvironment.createBasicLocalizationFallbackResolvers === 'function' ? fallbackEnvironment.createBasicLocalizationFallbackResolvers : createBasicLocalizationFallbackResolversProxy;
          var fallbackRegistry = fallbackEnvironment && fallbackEnvironment.localizationFallbackRegistry ? fallbackEnvironment.localizationFallbackRegistry : localizationFallbackRegistry && typeof localizationFallbackRegistry.createFallbackResolvers === 'function' ? localizationFallbackRegistry : {
            createFallbackResolvers: function createFallbackResolvers(fallbackOptions) {
              return createBasicLocalizationFallbackResolvers(fallbackOptions);
            }
          };
          var fallbackResolvers = fallbackEnvironment && fallbackEnvironment.localizationFallbackResolvers ? fallbackEnvironment.localizationFallbackResolvers : fallbackRegistry && typeof fallbackRegistry.createFallbackResolvers === 'function' ? fallbackRegistry.createFallbackResolvers({
            directNamespace: localizationFallbacks,
            inlineNamespace: inlineLocalizationFallbacks
          }) : createBasicLocalizationFallbackResolvers({
            directNamespace: localizationFallbacks,
            inlineNamespace: inlineLocalizationFallbacks
          });
          var fallbackNamespace = fallbackEnvironment && fallbackEnvironment.localizationFallbackNamespace ? fallbackEnvironment.localizationFallbackNamespace : null;
          function fallbackResolveLocaleModuleProxy() {
            return null;
          }
          var fallbackResolveLocaleModule = fallbackEnvironment && typeof fallbackEnvironment.fallbackResolveLocaleModule === 'function' ? fallbackEnvironment.fallbackResolveLocaleModule : fallbackResolveLocaleModuleProxy;
          function createLocaleFallbacksProxy() {
            return null;
          }
          var createLocaleFallbacks = fallbackEnvironment && typeof fallbackEnvironment.createLocaleFallbacks === 'function' ? fallbackEnvironment.createLocaleFallbacks : createLocaleFallbacksProxy;
          var localizationFallbackSupport = fallbackEnvironment && typeof fallbackEnvironment.localizationFallbackSupport !== 'undefined' ? fallbackEnvironment.localizationFallbackSupport : null;
          var coreLocalizationBridge = resolveModule(resolver, requireFn, 'cineCoreLocalizationBridge', './modules/core/localization-bridge.js');
          return {
            coreLocalizationBridge: coreLocalizationBridge,
            coreLocalizationFallbacks: localizationFallbacks,
            coreInlineLocalizationFallbacks: inlineLocalizationFallbacks,
            coreLocalizationFallbackRegistry: localizationFallbackRegistry,
            coreLocalizationFallbackResolution: localizationFallbackResolution,
            coreLocalizationFallbackSupportLite: localizationFallbackSupportLite,
            coreLocalizationFallbackFactories: localizationFallbackFactories,
            localizationInlineSupport: inlineSupport,
            localizationFallbackEnvironment: fallbackEnvironment,
            localizationFallbackSupport: localizationFallbackSupport,
            createBasicLocalizationFallbackResolvers: createBasicLocalizationFallbackResolvers,
            localizationFallbackRegistry: fallbackRegistry,
            localizationFallbackResolvers: fallbackResolvers,
            localizationFallbackNamespace: fallbackNamespace,
            fallbackResolveLocaleModule: fallbackResolveLocaleModule,
            createLocaleFallbacks: createLocaleFallbacks
          };
        }
        var api = {
          createLocalizationRuntimeEnvironment: createLocalizationRuntimeEnvironment
        };
        if (typeof module !== 'undefined' && module.exports) {
          module.exports = api;
          return;
        }
        var globalScope = typeof globalThis !== 'undefined' && globalThis || typeof self !== 'undefined' && self || typeof window !== 'undefined' && window || typeof global !== 'undefined' && global || null;
        if (globalScope && !globalScope.cineCoreLocalizationRuntimeEnvironment) {
          globalScope.cineCoreLocalizationRuntimeEnvironment = api;
        }
      })();
    }
  };
  var MODULE_CACHE = Object.create(null);
  function loadModule(moduleId) {
    if (MODULE_CACHE[moduleId]) {
      return MODULE_CACHE[moduleId].exports;
    }
    var factory = MODULE_FACTORIES[moduleId];
    if (typeof factory !== 'function') {
      throw new Error('Unknown localization module: ' + moduleId);
    }
    var module = {
      exports: {}
    };
    MODULE_CACHE[moduleId] = module;
    var moduleDir = getModuleDirectory(moduleId);
    function localRequire(request) {
      if (typeof request === 'string') {
        var normalized = null;
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
  var exportsMap = {};
  Object.keys(MODULE_FACTORIES).forEach(function (moduleId) {
    exportsMap[moduleId] = loadModule(moduleId);
  });
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = exportsMap;
  }
  var globalScope = (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' && globalThis ? globalThis : (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window ? window : (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' && self ? self : (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' && global ? global : null;
  if (globalScope) {
    var targetName = 'cineCoreLocalizationModules';
    var existing = globalScope[targetName] && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};
    Object.keys(exportsMap).forEach(function (key) {
      existing[key] = exportsMap[key];
    });
    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
})();