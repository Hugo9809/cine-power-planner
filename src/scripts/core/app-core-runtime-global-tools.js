/*
 * Cine Power Planner runtime global tool bridge.
 *
 * This module hosts the runtime global helpers that previously lived inside
 * `app-core-new-1.js`. Centralising the fallbacks keeps the resilient
 * autosave, backup, restore, and offline initialisation behaviours in one
 * place so we can share them between the modern and legacy bundles without
 * duplicating logic. The helpers continue to favour the most reliable
 * definitions available in the environment and expose a bridge namespace so
 * future refactors can import them without relying on implicit globals.
 */

const createInlineRuntimeToolFallbacks = (function createInlineRuntimeToolFallbackFactory() {
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

    return function resilientDeepClone(value) {
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

  return function fallbackCreateInlineRuntimeToolFallbacks(primaryScope) {
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
  };
})();

let CORE_RUNTIME_TOOL_FALLBACKS =
  typeof CORE_RUNTIME_TOOL_FALLBACK_FACTORY === 'function'
    ? CORE_RUNTIME_TOOL_FALLBACK_FACTORY(CORE_PART1_RUNTIME_SCOPE)
    : null;

if (
  !CORE_RUNTIME_TOOL_FALLBACKS ||
  typeof CORE_RUNTIME_TOOL_FALLBACKS !== 'object'
) {
  CORE_RUNTIME_TOOL_FALLBACKS = createInlineRuntimeToolFallbacks(
    CORE_PART1_RUNTIME_SCOPE
  );
}

function fallbackGetCoreGlobalObject() {
  if (
    CORE_RUNTIME_TOOL_FALLBACKS &&
    typeof CORE_RUNTIME_TOOL_FALLBACKS.getCoreGlobalObject === 'function'
  ) {
    try {
      const scope = CORE_RUNTIME_TOOL_FALLBACKS.getCoreGlobalObject();
      if (scope) {
        return scope;
      }
    } catch (fallbackScopeError) {
      void fallbackScopeError;
    }
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

function fallbackEnsureCoreGlobalValue(name, fallbackValue) {
  if (
    CORE_RUNTIME_TOOL_FALLBACKS &&
    typeof CORE_RUNTIME_TOOL_FALLBACKS.ensureCoreGlobalValue === 'function'
  ) {
    try {
      return CORE_RUNTIME_TOOL_FALLBACKS.ensureCoreGlobalValue(
        name,
        fallbackValue
      );
    } catch (ensureError) {
      void ensureError;
    }
  }

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

  const scope = fallbackGetCoreGlobalObject();
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

    return scope[name];
  } catch (defineError) {
    void defineError;
  }

  return value;
}

function fallbackJsonDeepClone(value) {
  if (
    CORE_RUNTIME_TOOL_FALLBACKS &&
    typeof CORE_RUNTIME_TOOL_FALLBACKS.jsonDeepClone === 'function'
  ) {
    try {
      return CORE_RUNTIME_TOOL_FALLBACKS.jsonDeepClone(value);
    } catch (jsonCloneError) {
      void jsonCloneError;
    }
  }

  if (value === null || typeof value !== 'object') {
    return value;
  }

  try {
    return JSON.parse(JSON.stringify(value));
  } catch (fallbackJsonCloneError) {
    void fallbackJsonCloneError;
  }

  return value;
}

function fallbackCreateResilientDeepClone(scope) {
  if (
    CORE_RUNTIME_TOOL_FALLBACKS &&
    typeof CORE_RUNTIME_TOOL_FALLBACKS.createResilientDeepClone === 'function'
  ) {
    try {
      return CORE_RUNTIME_TOOL_FALLBACKS.createResilientDeepClone(scope);
    } catch (createDeepCloneError) {
      void createDeepCloneError;
    }
  }

  return function fallbackResilientDeepClone(value) {
    return fallbackJsonDeepClone(value);
  };
}

function fallbackEnsureDeepClone(scope) {
  if (
    CORE_RUNTIME_TOOL_FALLBACKS &&
    typeof CORE_RUNTIME_TOOL_FALLBACKS.ensureDeepClone === 'function'
  ) {
    try {
      return CORE_RUNTIME_TOOL_FALLBACKS.ensureDeepClone(scope);
    } catch (ensureDeepCloneError) {
      void ensureDeepCloneError;
    }
  }

  const targetScope = scope || fallbackGetCoreGlobalObject();
  const clone = fallbackCreateResilientDeepClone(targetScope);

  if (targetScope && typeof targetScope === 'object') {
    try {
      Object.defineProperty(targetScope, '__cineDeepClone', {
        configurable: true,
        writable: true,
        value: clone,
      });
    } catch (defineError) {
      void defineError;

      try {
        targetScope.__cineDeepClone = clone;
      } catch (assignError) {
        void assignError;
      }
    }
  }

  return clone;
}

var CORE_GLOBAL_SCOPE = fallbackGetCoreGlobalObject();

const CORE_RUNTIME_TOOLS_REFERENCE = (function resolveRuntimeToolsReference() {
  var scopes = [];
  if (typeof globalThis !== 'undefined') scopes.push(globalThis);
  if (typeof window !== 'undefined') scopes.push(window);
  if (typeof self !== 'undefined') scopes.push(self);
  if (typeof global !== 'undefined') scopes.push(global);

  for (var i = 0; i < scopes.length; i += 1) {
    var scope = scopes[i];
    if (!scope || typeof scope !== 'object') {
      continue;
    }
    try {
      if (scope.CORE_RUNTIME_TOOLS) {
        return scope.CORE_RUNTIME_TOOLS;
      }
    } catch (runtimeToolResolveError) {
      void runtimeToolResolveError;
    }
  }

  return null;
})();

const getCoreGlobalObject =
  CORE_RUNTIME_TOOLS_REFERENCE && typeof CORE_RUNTIME_TOOLS_REFERENCE.detectScope === 'function'
    ? function getCoreGlobalObjectProxy() {
        try {
          return CORE_RUNTIME_TOOLS_REFERENCE.detectScope(CORE_GLOBAL_SCOPE);
        } catch (detectScopeError) {
          void detectScopeError;
        }

        return fallbackGetCoreGlobalObject();
      }
    : fallbackGetCoreGlobalObject;

const ensureCoreGlobalValue =
  CORE_RUNTIME_TOOLS_REFERENCE && typeof CORE_RUNTIME_TOOLS_REFERENCE.ensureGlobalValue === 'function'
    ? function ensureCoreGlobalValueProxy(name, fallbackValue) {
        return CORE_RUNTIME_TOOLS_REFERENCE.ensureGlobalValue(name, fallbackValue, CORE_GLOBAL_SCOPE);
      }
    : fallbackEnsureCoreGlobalValue;

const coreJsonDeepClone =
  CORE_RUNTIME_TOOLS_REFERENCE && typeof CORE_RUNTIME_TOOLS_REFERENCE.jsonDeepClone === 'function'
    ? function coreJsonDeepCloneProxy(value) {
        try {
          return CORE_RUNTIME_TOOLS_REFERENCE.jsonDeepClone(value);
        } catch (jsonCloneError) {
          void jsonCloneError;
        }

        return fallbackJsonDeepClone(value);
      }
    : fallbackJsonDeepClone;

const coreCreateResilientDeepClone =
  CORE_RUNTIME_TOOLS_REFERENCE && typeof CORE_RUNTIME_TOOLS_REFERENCE.createResilientDeepClone === 'function'
    ? function coreCreateResilientDeepCloneProxy(scope) {
        try {
          return CORE_RUNTIME_TOOLS_REFERENCE.createResilientDeepClone(scope || CORE_GLOBAL_SCOPE);
        } catch (createDeepCloneError) {
          void createDeepCloneError;
        }

        return fallbackCreateResilientDeepClone(scope || CORE_GLOBAL_SCOPE);
      }
    : fallbackCreateResilientDeepClone;

const CORE_DEEP_CLONE =
  CORE_RUNTIME_TOOLS_REFERENCE && typeof CORE_RUNTIME_TOOLS_REFERENCE.ensureDeepClone === 'function'
    ? CORE_RUNTIME_TOOLS_REFERENCE.ensureDeepClone(CORE_GLOBAL_SCOPE)
    : fallbackEnsureDeepClone(CORE_GLOBAL_SCOPE);

if (CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE.__cineDeepClone !== 'function') {
  try {
    CORE_GLOBAL_SCOPE.__cineDeepClone = CORE_DEEP_CLONE;
  } catch (coreDeepCloneError) {
    void coreDeepCloneError;
  }
}

const CORE_RUNTIME_GLOBAL_TOOLS = (function createCoreRuntimeGlobalToolsBridge() {
  const namespace = {};

  function assignNamespaceValue(key, value) {
    try {
      Object.defineProperty(namespace, key, {
        configurable: true,
        enumerable: true,
        get() {
          return value;
        },
      });
    } catch (defineError) {
      void defineError;
      namespace[key] = value;
    }
  }

  assignNamespaceValue('createInlineRuntimeToolFallbacks', createInlineRuntimeToolFallbacks);
  assignNamespaceValue('CORE_RUNTIME_TOOL_FALLBACKS', CORE_RUNTIME_TOOL_FALLBACKS);
  assignNamespaceValue('fallbackGetCoreGlobalObject', fallbackGetCoreGlobalObject);
  assignNamespaceValue('fallbackEnsureCoreGlobalValue', fallbackEnsureCoreGlobalValue);
  assignNamespaceValue('fallbackJsonDeepClone', fallbackJsonDeepClone);
  assignNamespaceValue('fallbackCreateResilientDeepClone', fallbackCreateResilientDeepClone);
  assignNamespaceValue('fallbackEnsureDeepClone', fallbackEnsureDeepClone);
  assignNamespaceValue('CORE_GLOBAL_SCOPE', CORE_GLOBAL_SCOPE);
  assignNamespaceValue('getCoreGlobalObject', getCoreGlobalObject);
  assignNamespaceValue('ensureCoreGlobalValue', ensureCoreGlobalValue);
  assignNamespaceValue('coreJsonDeepClone', coreJsonDeepClone);
  assignNamespaceValue('coreCreateResilientDeepClone', coreCreateResilientDeepClone);
  assignNamespaceValue('CORE_DEEP_CLONE', CORE_DEEP_CLONE);

  const candidateScopes = [];
  try {
    if (CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object') {
      candidateScopes.push(CORE_GLOBAL_SCOPE);
    }
  } catch (coreScopeError) {
    void coreScopeError;
  }

  if (typeof globalThis !== 'undefined' && globalThis) {
    candidateScopes.push(globalThis);
  }

  if (typeof window !== 'undefined' && window) {
    candidateScopes.push(window);
  }

  if (typeof self !== 'undefined' && self) {
    candidateScopes.push(self);
  }

  if (typeof global !== 'undefined' && global) {
    candidateScopes.push(global);
  }

  for (let index = 0; index < candidateScopes.length; index += 1) {
    const scope = candidateScopes[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }

    try {
      if (!scope.cineCoreRuntimeGlobalTools) {
        scope.cineCoreRuntimeGlobalTools = namespace;
      }
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && typeof module.exports === 'object') {
    try {
      module.exports = namespace;
    } catch (moduleExportError) {
      void moduleExportError;
    }
  }

  return namespace;
})();

