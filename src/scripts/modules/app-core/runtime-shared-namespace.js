/* global CORE_GLOBAL_SCOPE */

(function initRuntimeSharedNamespaceModule(rootScope) {
  'use strict';

  function safeArrayMerge(primary, secondary) {
    const result = [];
    const seen = new Set();

    function appendValues(list) {
      if (!Array.isArray(list)) {
        return;
      }

      for (let index = 0; index < list.length; index += 1) {
        const value = list[index];
        if (value && typeof value === 'object' && !seen.has(value)) {
          seen.add(value);
          result.push(value);
        }
      }
    }

    appendValues(primary);
    appendValues(secondary);

    return result;
  }

  function collectFallbackScopes(options) {
    const fallbackScopes = [];

    const runtimeScope = options && options.runtimeScope ? options.runtimeScope : null;
    const coreGlobalScope = options && options.coreGlobalScope ? options.coreGlobalScope : null;

    const candidates = [
      runtimeScope,
      coreGlobalScope,
      rootScope && typeof rootScope === 'object' ? rootScope : null,
      typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object'
        ? globalThis
        : null,
      typeof window !== 'undefined' && window && typeof window === 'object' ? window : null,
      typeof self !== 'undefined' && self && typeof self === 'object' ? self : null,
      typeof global !== 'undefined' && global && typeof global === 'object' ? global : null,
    ];

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate && typeof candidate === 'object' && fallbackScopes.indexOf(candidate) === -1) {
        fallbackScopes.push(candidate);
      }
    }

    if (options && Array.isArray(options.additionalScopes)) {
      return safeArrayMerge(fallbackScopes, options.additionalScopes);
    }

    return fallbackScopes;
  }

  function fallbackResolveRuntimeSharedFromScopes(scopes) {
    const scopeList = Array.isArray(scopes) ? scopes : [];

    for (let index = 0; index < scopeList.length; index += 1) {
      const scope = scopeList[index];
      if (!scope || typeof scope !== 'object') {
        continue;
      }

      try {
        const candidate = scope.cineCoreRuntimeShared;
        if (candidate && typeof candidate === 'object') {
          return candidate;
        }
      } catch (runtimeSharedLookupError) {
        void runtimeSharedLookupError;
      }
    }

    return null;
  }

  function attemptResolveSupportModule(identifier, fallbackPath, options) {
    const resolveCoreSupportModule =
      options && typeof options.resolveCoreSupportModule === 'function'
        ? options.resolveCoreSupportModule
        : null;
    const requireFn = options && typeof options.requireFn === 'function' ? options.requireFn : null;

    if (resolveCoreSupportModule) {
      try {
        const resolved = resolveCoreSupportModule(identifier, fallbackPath);
        if (resolved && typeof resolved === 'object') {
          return resolved;
        }
      } catch (moduleResolutionError) {
        void moduleResolutionError;
      }
    }

    if (requireFn) {
      try {
        const required = requireFn(fallbackPath);
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (moduleRequireError) {
        void moduleRequireError;
      }
    }

    return null;
  }

  function createMinimalRuntimeSharedNamespace(options, fallbackScopes) {
    const scopeList = Array.isArray(fallbackScopes) ? fallbackScopes.slice() : [];
    const existingRuntimeShared =
      options && options.currentRuntimeShared ? options.currentRuntimeShared : null;

    function resolveFromScopes() {
      return fallbackResolveRuntimeSharedFromScopes(scopeList);
    }

    const resolvedRuntimeShared = existingRuntimeShared || resolveFromScopes();

    return {
      runtimeShared:
        resolvedRuntimeShared && typeof resolvedRuntimeShared === 'object'
          ? resolvedRuntimeShared
          : Object.create(null),
      existingRuntimeShared:
        resolvedRuntimeShared && typeof resolvedRuntimeShared === 'object'
          ? resolvedRuntimeShared
          : existingRuntimeShared,
      runtimeSharedResolver: null,
      fallbackResolveRuntimeSharedFromGlobal: resolveFromScopes,
    };
  }

  function createRuntimeSharedNamespace(options) {
    const safeOptions = Object.assign(
      {
        resolveCoreSupportModule: null,
        requireFn: null,
        runtimeScope: null,
        coreGlobalScope: null,
        currentRuntimeShared: null,
        additionalScopes: null,
      },
      options || {}
    );

    const runtimeSharedTools = attemptResolveSupportModule(
      'cineCoreAppRuntimeShared',
      './runtime-shared.js',
      safeOptions
    );

    let runtimeSharedResolver = null;

    if (
      runtimeSharedTools &&
      typeof runtimeSharedTools.resolveRuntimeShared === 'function'
    ) {
      runtimeSharedResolver = runtimeSharedTools.resolveRuntimeShared;
    } else if (safeOptions && typeof safeOptions.requireFn === 'function') {
      try {
        const requiredRuntimeSharedTools = safeOptions.requireFn('./runtime-shared.js');
        if (
          requiredRuntimeSharedTools &&
          typeof requiredRuntimeSharedTools.resolveRuntimeShared === 'function'
        ) {
          runtimeSharedResolver = requiredRuntimeSharedTools.resolveRuntimeShared;
        }
      } catch (runtimeSharedToolsRequireError) {
        void runtimeSharedToolsRequireError;
      }
    }

    const fallbackScopes = collectFallbackScopes(safeOptions);
    const fallbackRuntimeShared = fallbackResolveRuntimeSharedFromScopes(fallbackScopes);

    const runtimeShared =
      safeOptions.currentRuntimeShared ||
      (runtimeSharedResolver
        ? runtimeSharedResolver({
            currentShared: safeOptions.currentRuntimeShared,
            resolveCoreSupportModule: safeOptions.resolveCoreSupportModule,
            requireFn: safeOptions.requireFn,
            runtimeScope: safeOptions.runtimeScope,
            coreGlobalScope: safeOptions.coreGlobalScope,
          })
        : fallbackRuntimeShared);

    if (!runtimeShared || typeof runtimeShared !== 'object') {
      return createMinimalRuntimeSharedNamespace(safeOptions, fallbackScopes);
    }

    if (
      runtimeShared &&
      typeof runtimeShared === 'object' &&
      typeof runtimeShared.attachRuntimeSharedNamespace === 'function'
    ) {
      try {
        runtimeShared.attachRuntimeSharedNamespace({
          fallbackResolveRuntimeSharedFromGlobal() {
            return fallbackResolveRuntimeSharedFromScopes(fallbackScopes);
          },
        });
      } catch (runtimeSharedAttachError) {
        void runtimeSharedAttachError;
      }
    }

    return {
      runtimeShared,
      existingRuntimeShared: safeOptions.currentRuntimeShared,
      runtimeSharedResolver,
      fallbackResolveRuntimeSharedFromGlobal() {
        return fallbackResolveRuntimeSharedFromScopes(fallbackScopes);
      },
    };
  }

  const runtimeSharedNamespaceApi = {
    createRuntimeSharedNamespace,
  };

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = runtimeSharedNamespaceApi;
  }

  const globalTargets = safeArrayMerge(
    [
      rootScope && typeof rootScope === 'object' ? rootScope : null,
      typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object'
        ? globalThis
        : null,
      typeof window !== 'undefined' && window && typeof window === 'object' ? window : null,
      typeof self !== 'undefined' && self && typeof self === 'object' ? self : null,
    ],
    null
  );

  for (let index = 0; index < globalTargets.length; index += 1) {
    const target = globalTargets[index];
    if (!target || typeof target !== 'object') {
      continue;
    }

    if (!target.cineCoreAppRuntimeSharedNamespace) {
      try {
        Object.defineProperty(target, 'cineCoreAppRuntimeSharedNamespace', {
          configurable: true,
          enumerable: false,
          writable: true,
          value: runtimeSharedNamespaceApi,
        });
      } catch (defineError) {
        void defineError;
        try {
          target.cineCoreAppRuntimeSharedNamespace = runtimeSharedNamespaceApi;
        } catch (assignError) {
          void assignError;
        }
      }
    }
  }
})(typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : void 0);
