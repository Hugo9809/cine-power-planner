function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
    for (var _i = 0, _Object$keys = Object.keys(namespace); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      existing[key] = namespace[key];
    }
    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();