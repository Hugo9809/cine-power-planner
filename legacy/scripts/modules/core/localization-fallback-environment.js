function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
  function resolveSupportResolver(primaryScope) {
    var runtimeScope = detectRuntimeScope(primaryScope);
    if (runtimeScope && runtimeScope.cineCoreSupportResolver && _typeof(runtimeScope.cineCoreSupportResolver) === 'object') {
      return runtimeScope.cineCoreSupportResolver;
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
  for (var _i = 0, _Object$keys = Object.keys(namespace); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    existing[key] = namespace[key];
  }
  if (runtimeScope && (_typeof(runtimeScope) === 'object' || typeof runtimeScope === 'function')) {
    try {
      runtimeScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();