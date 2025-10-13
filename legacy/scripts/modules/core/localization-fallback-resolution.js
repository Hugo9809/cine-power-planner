function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
  for (var _i = 0, _Object$keys = Object.keys(namespace); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    existing[key] = namespace[key];
  }
  if (globalScope && _typeof(globalScope) === 'object') {
    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();