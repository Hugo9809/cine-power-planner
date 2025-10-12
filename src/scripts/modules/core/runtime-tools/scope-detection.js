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

  function fallbackDetectScope(primary) {
    if (primary && (typeof primary === 'object' || typeof primary === 'function')) {
      return primary;
    }

    const scope = detectAmbientScope();
    if (scope && (typeof scope === 'object' || typeof scope === 'function')) {
      return scope;
    }

    return null;
  }

  function resolveEnvironmentHelpersModule() {
    if (typeof require === 'function') {
      try {
        return require('./environment-helpers.js');
      } catch (environmentHelpersRequireError) {
        void environmentHelpersRequireError;
      }
    }

    const scope = detectAmbientScope();
    if (scope && typeof scope === 'object') {
      try {
        const registry = scope.cineCoreRuntimeToolsModules;
        if (registry && typeof registry === 'object' && registry.environmentHelpers) {
          return registry.environmentHelpers;
        }
      } catch (environmentLookupError) {
        void environmentLookupError;
      }
    }

    return null;
  }

  const environmentHelpersModule = resolveEnvironmentHelpersModule();
  const resolveEnvironmentHelpers =
    environmentHelpersModule && typeof environmentHelpersModule.resolveEnvironmentHelpers === 'function'
      ? environmentHelpersModule.resolveEnvironmentHelpers
      : function resolveEnvironmentHelpersFallback() {
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

          const fallbackScope = detectAmbientScope();
          if (fallbackScope && typeof fallbackScope === 'object') {
            try {
              const candidate = fallbackScope.cineRuntimeEnvironmentHelpers;
              if (candidate && typeof candidate === 'object') {
                return candidate;
              }
            } catch (candidateLookupError) {
              void candidateLookupError;
            }
          }

          return null;
        };

  const CORE_ENVIRONMENT_HELPERS = resolveEnvironmentHelpers();

  function detectScope(primary) {
    if (primary && (typeof primary === 'object' || typeof primary === 'function')) {
      return primary;
    }

    let detected = null;

    if (
      CORE_ENVIRONMENT_HELPERS &&
      typeof CORE_ENVIRONMENT_HELPERS.fallbackDetectGlobalScope === 'function'
    ) {
      try {
        detected = CORE_ENVIRONMENT_HELPERS.fallbackDetectGlobalScope();
      } catch (detectScopeError) {
        void detectScopeError;
        detected = null;
      }
    }

    if (detected && (typeof detected === 'object' || typeof detected === 'function')) {
      return detected;
    }

    return fallbackDetectScope(primary);
  }

  function assignToGlobal(namespace) {
    const scope = detectAmbientScope();
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return;
    }

    const registryName = 'cineCoreRuntimeToolsModules';
    const existing =
      scope[registryName] && typeof scope[registryName] === 'object'
        ? scope[registryName]
        : {};

    existing.scopeDetection = namespace;

    try {
      scope[registryName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  const namespace = {
    detectScope,
    getEnvironmentHelpers() {
      return CORE_ENVIRONMENT_HELPERS;
    },
  };

  assignToGlobal(namespace);

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
