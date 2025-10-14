function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function initAppCoreBootstrapResultsModule(globalScope) {
  'use strict';

  function isObject(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function');
  }

  function ensureArray(value) {
    return Array.isArray(value) ? value.slice() : [];
  }

  function ensureRequireFn(candidate) {
    if (typeof candidate === 'function') {
      return candidate;
    }

    if (typeof require === 'function') {
      return require;
    }

    return null;
  }

  function registerScope(scopes, scope) {
    if (!isObject(scope)) {
      return;
    }

    if (scopes.indexOf(scope) === -1) {
      scopes.push(scope);
    }
  }

  function collectFallbackScopesWithDefaults(options) {
    var runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    var coreGlobalScope = options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    var fallbackScopesInput = options ? options.fallbackScopes : null;

    if (options && typeof options.collectFallbackScopes === 'function') {
      try {
        var collected = options.collectFallbackScopes(fallbackScopesInput);

        if (Array.isArray(collected)) {
          var list = ensureArray(collected);
          registerScope(list, runtimeScope);
          registerScope(list, coreGlobalScope);
          registerScope(list, typeof globalThis !== 'undefined' ? globalThis : null);
          registerScope(list, typeof window !== 'undefined' ? window : null);
          registerScope(list, typeof self !== 'undefined' ? self : null);
          registerScope(list, typeof global !== 'undefined' ? global : null);
          return list;
        }
      } catch (collectorError) {
        void collectorError;
      }
    }

    var fallbackScopes = ensureArray(fallbackScopesInput);
    registerScope(fallbackScopes, runtimeScope);
    registerScope(fallbackScopes, coreGlobalScope);
    registerScope(fallbackScopes, typeof globalThis !== 'undefined' ? globalThis : null);
    registerScope(fallbackScopes, typeof window !== 'undefined' ? window : null);
    registerScope(fallbackScopes, typeof self !== 'undefined' ? self : null);
    registerScope(fallbackScopes, typeof global !== 'undefined' ? global : null);
    return fallbackScopes;
  }

  function attempt(factory, factoryOptions) {
    if (typeof factory !== 'function') {
      return null;
    }

    try {
      var result = factory(factoryOptions);
      return isObject(result) ? result : null;
    } catch (error) {
      void error;
    }

    return null;
  }

  function createLocalizationFallbackSkeleton() {
    return {
      localizationSupport: null,
      localizationRuntimeEnvironment: null,
      localizationBridge: null,
      localizationFallbacks: null,
      inlineLocalizationFallbacks: null,
      localizationFallbackSupport: null,
      createBasicLocalizationFallbackResolvers: function createBasicLocalizationFallbackResolvers() {
        return null;
      },
      localizationFallbackRegistry: {
        createFallbackResolvers: function createFallbackResolvers() {
          return null;
        }
      },
      localizationFallbackResolvers: null,
      localizationFallbackNamespace: null,
      fallbackResolveLocaleModule: function fallbackResolveLocaleModule() {
        return null;
      },
      createLocaleFallbacks: function createLocaleFallbacks() {
        return null;
      }
    };
  }

  function createRuntimeSharedFallbackSkeleton(options) {
    var fallbackScopes = collectFallbackScopesWithDefaults(options || null);
    var currentRuntimeShared = options && isObject(options.currentRuntimeShared) ? options.currentRuntimeShared : null;

    function fallbackResolveRuntimeSharedFromGlobal() {
      for (var index = 0; index < fallbackScopes.length; index += 1) {
        var scope = fallbackScopes[index];

        if (!isObject(scope)) {
          continue;
        }

        try {
          var candidate = scope.cineCoreRuntimeShared;
          if (candidate && _typeof(candidate) === 'object') {
            return candidate;
          }
        } catch (lookupError) {
          void lookupError;
        }
      }

      return null;
    }

    var runtimeShared = currentRuntimeShared;

    if (!runtimeShared || _typeof(runtimeShared) !== 'object') {
      runtimeShared = fallbackResolveRuntimeSharedFromGlobal();
    }

    if (!runtimeShared || _typeof(runtimeShared) !== 'object') {
      try {
        runtimeShared = Object.create(null);
      } catch (creationError) {
        void creationError;
        runtimeShared = {};
      }
    }

    return {
      runtimeSharedNamespace: null,
      runtimeSharedResolver: null,
      existingRuntimeShared: runtimeShared,
      runtimeShared: runtimeShared,
      fallbackResolveRuntimeSharedFromGlobal: fallbackResolveRuntimeSharedFromGlobal
    };
  }

  function resolveLocalizationBootstrapResult(options) {
    var runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    var coreGlobalScope = options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    var fallbackScopes = collectFallbackScopesWithDefaults({
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      fallbackScopes: options && options.fallbackScopes,
      collectFallbackScopes: options && options.collectFallbackScopes
    });
    var requireFn = ensureRequireFn(options && options.requireFn);
    var resolveCoreSupportModule = options && typeof options.resolveCoreSupportModule === 'function' ? options.resolveCoreSupportModule : null;

    var bootstrapOptions = {
      localizationSupportTools: options && isObject(options.localizationSupportTools) ? options.localizationSupportTools : null,
      localizationBootstrapTools: options && isObject(options.localizationBootstrapTools) ? options.localizationBootstrapTools : null,
      localizationRuntimeTools: options && isObject(options.localizationRuntimeTools) ? options.localizationRuntimeTools : null,
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      fallbackScopes: fallbackScopes,
      currentLocalization: options && isObject(options.currentLocalization) ? options.currentLocalization : null
    };

    var bootstrapTools = options && isObject(options.bootstrapTools) ? options.bootstrapTools : null;

    var result = attempt(bootstrapTools && bootstrapTools.createLocalizationBootstrapResult, bootstrapOptions);

    if (!result) {
      result = attempt(bootstrapTools && bootstrapTools.createLocalizationBootstrapFallback, bootstrapOptions);
    }

    if (!result) {
      var inlineFactory = options && typeof options.createInlineLocalizationFallback === 'function' ? options.createInlineLocalizationFallback : null;

      result = attempt(inlineFactory, {
        fallbackTools: options && isObject(options.bootstrapFallbackTools) ? options.bootstrapFallbackTools : null,
        resolveCoreSupportModule: resolveCoreSupportModule,
        requireFn: requireFn,
        runtimeScope: runtimeScope,
        coreGlobalScope: coreGlobalScope,
        fallbackScopes: fallbackScopes,
        localizationFallbackOptions: options && options.localizationFallbackOptions ? options.localizationFallbackOptions : null
      });
    }

    if (!result) {
      result = createLocalizationFallbackSkeleton();
    }

    return result;
  }

  function resolveRuntimeSharedBootstrapResult(options) {
    var runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    var coreGlobalScope = options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    var fallbackScopes = collectFallbackScopesWithDefaults({
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      fallbackScopes: options && options.fallbackScopes,
      collectFallbackScopes: options && options.collectFallbackScopes
    });
    var requireFn = ensureRequireFn(options && options.requireFn);
    var resolveCoreSupportModule = options && typeof options.resolveCoreSupportModule === 'function' ? options.resolveCoreSupportModule : null;

    var bootstrapOptions = {
      runtimeSharedBootstrapResolverTools: options && isObject(options.runtimeSharedBootstrapResolverTools) ? options.runtimeSharedBootstrapResolverTools : null,
      runtimeSharedBootstrapTools: options && isObject(options.runtimeSharedBootstrapTools) ? options.runtimeSharedBootstrapTools : null,
      runtimeSharedNamespaceTools: options && isObject(options.runtimeSharedNamespaceTools) ? options.runtimeSharedNamespaceTools : null,
      runtimeSharedBootstrapInlineTools: options && isObject(options.runtimeSharedBootstrapInlineTools) ? options.runtimeSharedBootstrapInlineTools : null,
      runtimeSharedBootstrapResultTools: options && isObject(options.runtimeSharedBootstrapResultTools) ? options.runtimeSharedBootstrapResultTools : null,
      runtimeSharedBootstrapLoaderTools: options && isObject(options.runtimeSharedBootstrapLoaderTools) ? options.runtimeSharedBootstrapLoaderTools : null,
      runtimeSharedBootstrapManagerTools: options && isObject(options.runtimeSharedBootstrapManagerTools) ? options.runtimeSharedBootstrapManagerTools : null,
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: requireFn,
      runtimeScope: runtimeScope,
      coreGlobalScope: coreGlobalScope,
      currentRuntimeShared: options && isObject(options.currentRuntimeShared) ? options.currentRuntimeShared : null,
      fallbackScopes: fallbackScopes,
      runtimeSharedBootstrapInlineRequirePath: options && options.runtimeSharedBootstrapInlineRequirePath ? options.runtimeSharedBootstrapInlineRequirePath : null,
      runtimeSharedBootstrapResultRequirePath: options && options.runtimeSharedBootstrapResultRequirePath ? options.runtimeSharedBootstrapResultRequirePath : null
    };

    var bootstrapTools = options && isObject(options.bootstrapTools) ? options.bootstrapTools : null;

    var result = attempt(bootstrapTools && bootstrapTools.createRuntimeSharedBootstrapResult, bootstrapOptions);

    if (!result) {
      result = attempt(bootstrapTools && bootstrapTools.createRuntimeSharedBootstrapFallback, bootstrapOptions);
    }

    if (!result) {
      var inlineFactory = options && typeof options.createInlineRuntimeSharedFallback === 'function' ? options.createInlineRuntimeSharedFallback : null;

      result = attempt(inlineFactory, {
        fallbackTools: options && isObject(options.bootstrapFallbackTools) ? options.bootstrapFallbackTools : null,
        resolveCoreSupportModule: resolveCoreSupportModule,
        requireFn: requireFn,
        runtimeScope: runtimeScope,
        coreGlobalScope: coreGlobalScope,
        fallbackScopes: fallbackScopes,
        currentRuntimeShared: options && isObject(options.currentRuntimeShared) ? options.currentRuntimeShared : null
      });
    }

    if (!result) {
      result = createRuntimeSharedFallbackSkeleton({
        runtimeScope: runtimeScope,
        coreGlobalScope: coreGlobalScope,
        fallbackScopes: fallbackScopes,
        currentRuntimeShared: options && isObject(options.currentRuntimeShared) ? options.currentRuntimeShared : null
      });
    }

    return result;
  }

  var namespace = {
    resolveLocalizationBootstrapResult: resolveLocalizationBootstrapResult,
    resolveRuntimeSharedBootstrapResult: resolveRuntimeSharedBootstrapResult,
    collectBootstrapFallbackScopes: function collectBootstrapFallbackScopes(options) {
      return collectFallbackScopesWithDefaults(options || null);
    },
    createLocalizationFallbackSkeleton: createLocalizationFallbackSkeleton,
    createRuntimeSharedFallbackSkeleton: createRuntimeSharedFallbackSkeleton
  };

  var namespaceName = 'cineCoreAppCoreBootstrapResults';
  var existing = isObject(globalScope) && isObject(globalScope[namespaceName]) ? globalScope[namespaceName] : {};

  if (typeof Object.assign === 'function') {
    Object.assign(existing, namespace);
  } else {
    for (var key in namespace) {
      if (Object.prototype.hasOwnProperty.call(namespace, key)) {
        existing[key] = namespace[key];
      }
    }
  }

  if (isObject(globalScope)) {
    try {
      globalScope[namespaceName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = existing;
  }
})(typeof globalThis !== 'undefined' && globalThis || typeof self !== 'undefined' && self || typeof window !== 'undefined' && window || typeof global !== 'undefined' && global || null);
