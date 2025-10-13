(function () {
  function isValidScope(scope) {
    return !!scope && (typeof scope === 'object' || typeof scope === 'function');
  }

  function detectScope(primary) {
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

    const scope = detectScope(primary);
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

  function ensureDeepClone(primary) {
    const scope = detectScope(primary);
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

  function createRuntimeToolFallbacks(primary) {
    const resolvedScope = detectScope(primary);

    function getCoreGlobalObject() {
      return detectScope(resolvedScope);
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

  const namespace = {
    detectScope,
    ensureGlobalValue,
    jsonDeepClone,
    resolveStructuredClone,
    createResilientDeepClone,
    ensureDeepClone,
    createRuntimeToolFallbacks,
  };

  const globalScope = detectScope();
  const targetName = 'cineCoreRuntimeToolFallbacks';
  const existing =
    globalScope && typeof globalScope[targetName] === 'object'
      ? globalScope[targetName]
      : {};

  for (const key of Object.keys(namespace)) {
    existing[key] = namespace[key];
  }

  if (globalScope && typeof globalScope === 'object') {
    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
