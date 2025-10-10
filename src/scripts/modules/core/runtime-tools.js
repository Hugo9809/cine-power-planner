(function () {
  function detectScope(primary) {
    if (primary && (typeof primary === 'object' || typeof primary === 'function')) {
      return primary;
    }

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

  function ensureGlobalValue(name, fallbackValue, primary) {
    const fallbackProvider =
      typeof fallbackValue === 'function' ? fallbackValue : function provideStaticFallback() {
        return fallbackValue;
      };

    if (typeof name !== 'string' || !name) {
      try {
        return fallbackProvider();
      } catch (fallbackError) {
        void fallbackError;
        return undefined;
      }
    }

    const scope = detectScope(primary);
    if (!scope || typeof scope !== 'object') {
      return fallbackProvider();
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

    const value = fallbackProvider();

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

  const namespace = {
    detectScope,
    jsonDeepClone,
    resolveStructuredClone,
    createResilientDeepClone,
    ensureGlobalValue,
    ensureDeepClone,
  };

  const globalScope = detectScope();
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
