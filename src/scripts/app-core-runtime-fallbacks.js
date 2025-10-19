/*
 * Cine Power Planner core runtime fallback helpers.
 *
 * This module centralises the inline fallback helpers that previously lived in
 * `app-core-new-1.js`. Extracting them keeps the main runtime split lean while
 * preserving the resilient behaviours that protect autosave, backup, restore
 * and offline cache flows. The helpers remain defensive and side-effect free so
 * browser environments without module loaders can keep reusing them via the
 * exposed global namespace.
 */

function fallbackDetectScope(scopeCandidate) {
  if (
    scopeCandidate &&
    (typeof scopeCandidate === 'object' || typeof scopeCandidate === 'function')
  ) {
    return scopeCandidate;
  }

  if (
    typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' &&
    CORE_PART1_RUNTIME_SCOPE &&
    typeof CORE_PART1_RUNTIME_SCOPE === 'object'
  ) {
    return CORE_PART1_RUNTIME_SCOPE;
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

function fallbackEnsureCoreGlobalValue(name, fallbackValue, scopeCandidate) {
  const provider =
    typeof fallbackValue === 'function'
      ? fallbackValue
      : function provideStaticFallback() {
          return fallbackValue;
        };

  const scope = fallbackDetectScope(scopeCandidate);

  if (!scope || typeof name !== 'string' || !name) {
    try {
      return provider();
    } catch (fallbackError) {
      void fallbackError;
      return undefined;
    }
  }

  try {
    if (typeof scope[name] !== 'undefined') {
      return scope[name];
    }
  } catch (readError) {
    void readError;
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

    return scope[name];
  } catch (defineError) {
    void defineError;
  }

  return value;
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

function fallbackResolveStructuredClone(scopeCandidate) {
  if (typeof structuredClone === 'function') {
    return structuredClone;
  }

  const scope = fallbackDetectScope(scopeCandidate);
  if (scope && typeof scope.structuredClone === 'function') {
    try {
      return scope.structuredClone.bind(scope);
    } catch (bindError) {
      void bindError;
    }
  }

  return null;
}

function fallbackCreateResilientDeepClone(scopeCandidate) {
  const structuredCloneImpl = fallbackResolveStructuredClone(scopeCandidate);

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

function fallbackEnsureDeepClone(scopeCandidate) {
  const scope = fallbackDetectScope(scopeCandidate);

  if (scope && typeof scope.__cineDeepClone === 'function') {
    return scope.__cineDeepClone;
  }

  const clone = fallbackCreateResilientDeepClone(scope);

  if (scope && typeof scope === 'object') {
    try {
      Object.defineProperty(scope, '__cineDeepClone', {
        configurable: true,
        writable: true,
        value: clone,
      });
    } catch (defineError) {
      void defineError;
    }

    try {
      if (typeof scope.__cineDeepClone !== 'function') {
        scope.__cineDeepClone = clone;
      }
    } catch (assignError) {
      void assignError;
    }
  }

  return clone;
}

function createInlineRuntimeToolFallbacks(primaryScope) {
  const resolvedScope = fallbackDetectScope(primaryScope);

  return {
    getCoreGlobalObject() {
      return fallbackDetectScope(resolvedScope);
    },
    ensureCoreGlobalValue(name, fallbackValue) {
      return fallbackEnsureCoreGlobalValue(name, fallbackValue, resolvedScope);
    },
    jsonDeepClone: fallbackJsonDeepClone,
    resolveStructuredClone(scope) {
      return fallbackResolveStructuredClone(scope || resolvedScope);
    },
    createResilientDeepClone(scope) {
      return fallbackCreateResilientDeepClone(scope || resolvedScope);
    },
    ensureDeepClone(scope) {
      return fallbackEnsureDeepClone(scope || resolvedScope);
    },
  };
}

const namespace = {
  fallbackDetectScope,
  fallbackEnsureCoreGlobalValue,
  fallbackJsonDeepClone,
  fallbackResolveStructuredClone,
  fallbackCreateResilientDeepClone,
  fallbackEnsureDeepClone,
  createInlineRuntimeToolFallbacks,
};

const namespaceName = 'cineCoreRuntimeFallbacks';

function assignExport(target, key, value) {
  if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
    return;
  }

  try {
    target[key] = value;
    if (target[key] === value) {
      return;
    }
  } catch (assignError) {
    void assignError;
  }

  try {
    Object.defineProperty(target, key, {
      configurable: true,
      writable: true,
      value,
    });
  } catch (defineError) {
    void defineError;
  }
}

const candidateScopes = [];

if (
  typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' &&
  CORE_PART1_RUNTIME_SCOPE &&
  (typeof CORE_PART1_RUNTIME_SCOPE === 'object' || typeof CORE_PART1_RUNTIME_SCOPE === 'function')
) {
  candidateScopes.push(CORE_PART1_RUNTIME_SCOPE);
}

candidateScopes.push(
  typeof globalThis !== 'undefined' ? globalThis : null,
  typeof window !== 'undefined' ? window : null,
  typeof self !== 'undefined' ? self : null,
  typeof global !== 'undefined' ? global : null,
);

for (let index = 0; index < candidateScopes.length; index += 1) {
  const scope = candidateScopes[index];
  if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
    continue;
  }

  assignExport(scope, namespaceName, namespace);
}

if (typeof module === 'object' && module && typeof module.exports === 'object') {
  try {
    module.exports = namespace;
  } catch (moduleExportError) {
    void moduleExportError;
  }
}

module.exports = namespace;
