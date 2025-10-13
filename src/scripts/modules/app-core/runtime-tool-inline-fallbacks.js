/*
 * Runtime tool inline fallbacks extracted from the main app core bundle.
 *
 * The original monolithic runtime relied on a large inline helper to provide
 * resilient deep clone helpers and global scope guards when the structured
 * runtime toolkit was unavailable. Moving it into its own module keeps the
 * behaviour identical while helping the ongoing refactor towards smaller
 * files. The logic is intentionally verbose because the storage, autosave and
 * backup flows depend on these helpers for safe cloning.
 */

(function () {
  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function detectScope(primaryScope) {
    if (isObject(primaryScope)) {
      return primaryScope;
    }

    if (typeof globalThis !== 'undefined' && isObject(globalThis)) {
      return globalThis;
    }

    if (typeof window !== 'undefined' && isObject(window)) {
      return window;
    }

    if (typeof self !== 'undefined' && isObject(self)) {
      return self;
    }

    if (typeof global !== 'undefined' && isObject(global)) {
      return global;
    }

    return null;
  }

  function createInlineRuntimeToolFallbacks(primaryScope) {
    function isValidScope(scope) {
      return !!scope && (typeof scope === 'object' || typeof scope === 'function');
    }

    function detectScopeLocal(primary) {
      if (isValidScope(primary)) {
        return primary;
      }

      if (typeof globalThis !== 'undefined' && isValidScope(globalThis)) {
        return globalThis;
      }

      if (typeof window !== 'undefined' && isValidScope(window)) {
        return window;
      }

      if (typeof self !== 'undefined' && isValidScope(self)) {
        return self;
      }

      if (typeof global !== 'undefined' && isValidScope(global)) {
        return global;
      }

      return null;
    }

    function ensureGlobalValue(name, fallbackValue, primary) {
      const provider =
        typeof fallbackValue === 'function'
          ? fallbackValue
          : function provideStaticFallback() {
              return fallbackValue;
            };

      if (typeof name !== 'string' || !name) {
        try {
          return provider();
        } catch (fallbackError) {
          void fallbackError;
          return undefined;
        }
      }

      const scope = detectScopeLocal(primary);
      if (!isValidScope(scope)) {
        return provider();
      }

      let existing;
      try {
        existing = scope[name];
      } catch (readError) {
        existing = undefined;
        void readError;
      }

      if (typeof existing !== 'undefined') {
        return existing;
      }

      const value = provider();

      try {
        scope[name] = value;
        return scope[name];
      } catch (assignError) {
        void assignError;
      }

      try {
        Object.defineProperty(scope, name, {
          configurable: true,
          writable: true,
          value,
        });
      } catch (defineError) {
        void defineError;
      }

      try {
        return scope[name];
      } catch (finalReadError) {
        void finalReadError;
      }

      return value;
    }

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

      const scope = detectScopeLocal(primary);
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
      const scope = detectScopeLocal(primary);
      if (scope && typeof scope.__cineDeepClone === 'function') {
        return scope.__cineDeepClone;
      }

      const clone = createResilientDeepClone(scope);

      if (isValidScope(scope)) {
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

    const resolvedScope = detectScopeLocal(primaryScope);

    function getCoreGlobalObject() {
      return detectScopeLocal(resolvedScope);
    }

    function ensureCoreGlobalValue(name, fallbackValue) {
      return ensureGlobalValue(name, fallbackValue, resolvedScope);
    }

    function resolveStructuredCloneForScope(scope) {
      return resolveStructuredClone(scope || resolvedScope);
    }

    function createResilientDeepCloneForScope(scope) {
      return createResilientDeepClone(scope || resolvedScope);
    }

    function ensureDeepCloneForScope(scope) {
      return ensureDeepClone(scope || resolvedScope);
    }

    return {
      getCoreGlobalObject,
      ensureCoreGlobalValue,
      jsonDeepClone,
      resolveStructuredClone: resolveStructuredCloneForScope,
      createResilientDeepClone: createResilientDeepCloneForScope,
      ensureDeepClone: ensureDeepCloneForScope,
    };
  }

  const namespace = { createInlineRuntimeToolFallbacks };
  const namespaceName = 'cineCoreAppRuntimeToolInlineFallbacks';
  const globalScope = detectScope();
  const existing =
    isObject(globalScope) && isObject(globalScope[namespaceName])
      ? globalScope[namespaceName]
      : {};

  Object.assign(existing, namespace);

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
})();
