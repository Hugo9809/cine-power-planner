function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function resolveLocalizationFallbackNamespaceFromCandidate(candidate) {
    if (!candidate || (_typeof(candidate) !== 'object' && typeof candidate !== 'function')) {
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
        if (!candidate || (_typeof(candidate) !== 'object' && typeof candidate !== 'function')) {
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
    if (typeof globalThis !== 'undefined' && globalThis && _typeof(globalThis) === 'object') {
      return globalThis;
    }
    if (typeof window !== 'undefined' && window && _typeof(window) === 'object') {
      return window;
    }
    if (typeof self !== 'undefined' && self && _typeof(self) === 'object') {
      return self;
    }
    if (typeof global !== 'undefined' && global && _typeof(global) === 'object') {
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
  var keys = Object.keys(namespace);
  for (var index = 0; index < keys.length; index += 1) {
    var key = keys[index];
    target[key] = namespace[key];
  }

  if (globalScope && _typeof(globalScope) === 'object') {
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
