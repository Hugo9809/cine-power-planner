/* global cineRuntimeEnvironmentHelpers */

(function () {
  function detectGlobalScope() {
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

  function collectEnvironmentHelperScopes(primary) {
    const scopes = [];

    function registerScope(scope) {
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        return;
      }

      if (scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }

    registerScope(primary);
    if (typeof globalThis !== 'undefined') registerScope(globalThis);
    if (typeof window !== 'undefined') registerScope(window);
    if (typeof self !== 'undefined') registerScope(self);
    if (typeof global !== 'undefined') registerScope(global);

    return scopes;
  }

  const CORE_GLOBAL_SCOPE = detectGlobalScope();

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

    const candidateScopes = collectEnvironmentHelperScopes(CORE_GLOBAL_SCOPE);

    for (let index = 0; index < candidateScopes.length; index += 1) {
      const candidate = candidateScopes[index];
      try {
        const candidateHelpers =
          candidate && candidate.cineRuntimeEnvironmentHelpers;
        if (candidateHelpers && typeof candidateHelpers === 'object') {
          return candidateHelpers;
        }
      } catch (candidateLookupError) {
        void candidateLookupError;
      }
    }

    return null;
  }

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

    const fallbackScope = CORE_GLOBAL_SCOPE || detectGlobalScope();
    if (fallbackScope && (typeof fallbackScope === 'object' || typeof fallbackScope === 'function')) {
      return fallbackScope;
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
