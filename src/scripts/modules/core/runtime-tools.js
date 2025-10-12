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

  function resolveRuntimeToolsModule(fileName, registryKey) {
    if (typeof require === 'function') {
      try {
        return require('./runtime-tools/' + fileName);
      } catch (moduleRequireError) {
        void moduleRequireError;
      }
    }

    const scope = detectAmbientScope();
    if (scope && typeof scope === 'object') {
      try {
        const registry = scope.cineCoreRuntimeToolsModules;
        if (registry && typeof registry === 'object') {
          const candidate = registry[registryKey];
          if (candidate && typeof candidate === 'object') {
            return candidate;
          }
        }
      } catch (moduleLookupError) {
        void moduleLookupError;
      }
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

  function fallbackJsonDeepClone(value) {
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

  function fallbackResolveStructuredClone(primary, detectScopeFn) {
    if (typeof structuredClone === 'function') {
      return structuredClone;
    }

    const scope = detectScopeFn(primary);
    if (scope && typeof scope.structuredClone === 'function') {
      try {
        return scope.structuredClone.bind(scope);
      } catch (bindError) {
        void bindError;
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

  function fallbackCreateResilientDeepClone(primary, detectScopeFn) {
    const structuredCloneImpl = fallbackResolveStructuredClone(primary, detectScopeFn);

    if (!structuredCloneImpl) {
      return fallbackJsonDeepClone;
    }

    return function fallbackResilientDeepClone(value) {
      if (value === null || typeof value !== 'object') {
        return value;
      }

      try {
        return structuredCloneImpl(value);
      } catch (structuredCloneError) {
        void structuredCloneError;
      }

      return fallbackJsonDeepClone(value);
    };
  }

  function fallbackEnsureGlobalValue(name, fallbackValue) {
    const fallbackProvider =
      typeof fallbackValue === 'function'
        ? fallbackValue
        : function provideStaticFallback() {
            return fallbackValue;
          };

    try {
      return fallbackProvider();
    } catch (fallbackError) {
      void fallbackError;
      return undefined;
    }
  }

  const scopeDetectionModule = resolveRuntimeToolsModule('scope-detection.js', 'scopeDetection');
  const cloneToolsModule = resolveRuntimeToolsModule('clone-tools.js', 'cloneTools');
  const ensureGlobalValueModule = resolveRuntimeToolsModule(
    'ensure-global-value.js',
    'ensureGlobalValue',
  );

  const detectScope =
    scopeDetectionModule && typeof scopeDetectionModule.detectScope === 'function'
      ? scopeDetectionModule.detectScope
      : fallbackDetectScope;

  const jsonDeepClone =
    cloneToolsModule && typeof cloneToolsModule.jsonDeepClone === 'function'
      ? cloneToolsModule.jsonDeepClone
      : fallbackJsonDeepClone;

  const resolveStructuredClone =
    cloneToolsModule && typeof cloneToolsModule.resolveStructuredClone === 'function'
      ? cloneToolsModule.resolveStructuredClone
      : function fallbackResolveStructuredCloneWrapper(primary) {
          return fallbackResolveStructuredClone(primary, detectScope);
        };

  const createResilientDeepClone =
    cloneToolsModule && typeof cloneToolsModule.createResilientDeepClone === 'function'
      ? cloneToolsModule.createResilientDeepClone
      : function fallbackCreateResilientDeepCloneWrapper(primary) {
          return fallbackCreateResilientDeepClone(primary, detectScope);
        };

  const ensureDeepClone =
    cloneToolsModule && typeof cloneToolsModule.ensureDeepClone === 'function'
      ? cloneToolsModule.ensureDeepClone
      : function fallbackEnsureDeepClone(primary) {
          const scope = detectScope(primary);
          if (scope && typeof scope.__cineDeepClone === 'function') {
            return scope.__cineDeepClone;
          }

          const clone = fallbackCreateResilientDeepClone(scope, detectScope);

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
        };

  const ensureGlobalValue =
    ensureGlobalValueModule && typeof ensureGlobalValueModule.ensureGlobalValue === 'function'
      ? ensureGlobalValueModule.ensureGlobalValue
      : fallbackEnsureGlobalValue;

  const namespace = {
    detectScope,
    jsonDeepClone,
    resolveStructuredClone,
    createResilientDeepClone,
    ensureGlobalValue,
    ensureDeepClone,
  };

  const globalScope = detectAmbientScope();
  const targetName = 'cineCoreRuntimeTools';
  const existing = globalScope && typeof globalScope[targetName] === 'object'
    ? globalScope[targetName]
    : {};

  const target = existing;
  for (const key of Object.keys(namespace)) {
    target[key] = namespace[key];
  }

  if (globalScope && typeof globalScope === 'object') {
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
