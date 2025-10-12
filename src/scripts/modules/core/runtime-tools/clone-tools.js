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

  function resolveScopeDetectionModule() {
    if (typeof require === 'function') {
      try {
        return require('./scope-detection.js');
      } catch (scopeDetectionRequireError) {
        void scopeDetectionRequireError;
      }
    }

    const scope = detectAmbientScope();
    if (scope && typeof scope === 'object') {
      try {
        const registry = scope.cineCoreRuntimeToolsModules;
        if (registry && typeof registry === 'object' && registry.scopeDetection) {
          return registry.scopeDetection;
        }
      } catch (scopeDetectionLookupError) {
        void scopeDetectionLookupError;
      }
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
      } catch (environmentHelpersLookupError) {
        void environmentHelpersLookupError;
      }
    }

    return null;
  }

  const scopeDetectionModule = resolveScopeDetectionModule();
  const environmentHelpersModule = resolveEnvironmentHelpersModule();

  const detectScope =
    scopeDetectionModule && typeof scopeDetectionModule.detectScope === 'function'
      ? scopeDetectionModule.detectScope
      : fallbackDetectScope;

  const environmentHelpers =
    scopeDetectionModule && typeof scopeDetectionModule.getEnvironmentHelpers === 'function'
      ? scopeDetectionModule.getEnvironmentHelpers()
      : null;

  const resolveEnvironmentHelpers =
    environmentHelpersModule && typeof environmentHelpersModule.resolveEnvironmentHelpers === 'function'
      ? environmentHelpersModule.resolveEnvironmentHelpers
      : function resolveEnvironmentHelpersFallback() {
          return environmentHelpers || null;
        };

  const CORE_ENVIRONMENT_HELPERS = environmentHelpers || resolveEnvironmentHelpers();

  function jsonDeepClone(value) {
    if (value === null || typeof value !== 'object') {
      return value;
    }

    try {
      return JSON.parse(JSON.stringify(value));
    } catch (jsonCloneError) {
      void jsonCloneError;
    }

    return value;
  }

  function resolveStructuredClone(primary) {
    if (typeof structuredClone === 'function') {
      return structuredClone;
    }

    const scope = detectScope(primary);
    if (scope && typeof scope.structuredClone === 'function') {
      try {
        return scope.structuredClone.bind(scope);
      } catch (bindError) {
        void bindError;
      }
    }

    if (
      CORE_ENVIRONMENT_HELPERS &&
      typeof CORE_ENVIRONMENT_HELPERS.resolveNodeStructuredClone === 'function'
    ) {
      try {
        const nodeClone = CORE_ENVIRONMENT_HELPERS.resolveNodeStructuredClone();
        if (typeof nodeClone === 'function') {
          return nodeClone;
        }
      } catch (nodeCloneError) {
        void nodeCloneError;
      }
    }

    if (typeof require === 'function') {
      try {
        const nodeUtil = require('node:util');
        if (nodeUtil && typeof nodeUtil.structuredClone === 'function') {
          return nodeUtil.structuredClone.bind(nodeUtil);
        }
      } catch (nodeUtilError) {
        void nodeUtilError;
      }

      try {
        const legacyUtil = require('util');
        if (legacyUtil && typeof legacyUtil.structuredClone === 'function') {
          return legacyUtil.structuredClone.bind(legacyUtil);
        }
      } catch (legacyUtilError) {
        void legacyUtilError;
      }
    }

    return null;
  }

  function createResilientDeepClone(primary) {
    const structuredCloneImpl = resolveStructuredClone(primary);

    if (!structuredCloneImpl) {
      return jsonDeepClone;
    }

    return function resilientDeepClone(value) {
      if (value === null || typeof value !== 'object') {
        return value;
      }

      try {
        return structuredCloneImpl(value);
      } catch (structuredCloneError) {
        void structuredCloneError;
      }

      return jsonDeepClone(value);
    };
  }

  function ensureDeepClone(primary) {
    const scope = detectScope(primary);
    if (scope && typeof scope.__cineDeepClone === 'function') {
      return scope.__cineDeepClone;
    }

    const clone = createResilientDeepClone(scope);

    if (scope && typeof scope === 'object') {
      try {
        Object.defineProperty(scope, '__cineDeepClone', {
          configurable: true,
          writable: true,
          value: clone,
        });
      } catch (defineError) {
        void defineError;

        try {
          scope.__cineDeepClone = clone;
        } catch (assignError) {
          void assignError;
        }
      }
    }

    return clone;
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

    existing.cloneTools = namespace;

    try {
      scope[registryName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  const namespace = {
    jsonDeepClone,
    resolveStructuredClone,
    createResilientDeepClone,
    ensureDeepClone,
  };

  assignToGlobal(namespace);

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
