function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
    for (var _i = 0, _Object$keys = Object.keys(namespace); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      existing[key] = namespace[key];
    }
    try {
      attachmentScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();