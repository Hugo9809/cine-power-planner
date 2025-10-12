/* global cineRuntimeEnvironmentHelpers */

(function () {
  function detectAmbientScope() {
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

  function resolveAmbientModule() {
    if (typeof require === 'function') {
      try {
        return require('./ambient-scope.js');
      } catch (ambientRequireError) {
        void ambientRequireError;
      }
    }

    const scope = detectAmbientScope();
    if (scope && typeof scope === 'object') {
      try {
        const registry = scope.cineCoreRuntimeToolsModules;
        if (registry && typeof registry === 'object' && registry.ambientScope) {
          return registry.ambientScope;
        }
      } catch (ambientLookupError) {
        void ambientLookupError;
      }
    }

    return null;
  }

  const ambientModule = resolveAmbientModule();
  const detectGlobalScope =
    ambientModule && typeof ambientModule.detectAmbientScope === 'function'
      ? ambientModule.detectAmbientScope
      : detectAmbientScope;

  const collectCandidateScopes =
    ambientModule && typeof ambientModule.collectCandidateScopes === 'function'
      ? ambientModule.collectCandidateScopes
      : function collectCandidateScopesWithFallback(primary) {
          const scopes = [];

          function register(scope) {
            if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
              return;
            }

            if (scopes.indexOf(scope) === -1) {
              scopes.push(scope);
            }
          }

          register(primary);
          register(typeof globalThis !== 'undefined' ? globalThis : null);
          register(typeof window !== 'undefined' ? window : null);
          register(typeof self !== 'undefined' ? self : null);
          register(typeof global !== 'undefined' ? global : null);

          return scopes;
        };

  function resolveEnvironmentHelpers() {
    let helpers = null;

    if (
      typeof cineRuntimeEnvironmentHelpers !== 'undefined' &&
      cineRuntimeEnvironmentHelpers &&
      typeof cineRuntimeEnvironmentHelpers === 'object'
    ) {
      helpers = cineRuntimeEnvironmentHelpers;
    }

    if (!helpers && typeof require === 'function') {
      try {
        const requiredHelpers = require('../runtime-environment-helpers.js');
        if (requiredHelpers && typeof requiredHelpers === 'object') {
          helpers = requiredHelpers;
        }
      } catch (helpersRequireError) {
        void helpersRequireError;
      }
    }

    if (helpers) {
      return helpers;
    }

    const candidateScopes = collectCandidateScopes(detectGlobalScope());

    for (let index = 0; index < candidateScopes.length; index += 1) {
      const candidate = candidateScopes[index];
      try {
        const candidateHelpers = candidate && candidate.cineRuntimeEnvironmentHelpers;
        if (candidateHelpers && typeof candidateHelpers === 'object') {
          return candidateHelpers;
        }
      } catch (candidateLookupError) {
        void candidateLookupError;
      }
    }

    return null;
  }

  function assignToGlobal(namespace) {
    const scope = detectGlobalScope();
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return;
    }

    const registryName = 'cineCoreRuntimeToolsModules';
    const existing =
      scope[registryName] && typeof scope[registryName] === 'object'
        ? scope[registryName]
        : {};

    existing.environmentHelpers = namespace;

    try {
      scope[registryName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  const namespace = {
    resolveEnvironmentHelpers,
  };

  assignToGlobal(namespace);

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
