// (function () {
function isScope(candidate) {
  return !!candidate && (typeof candidate === 'object' || typeof candidate === 'function');
}



function readRuntimeModulesThroughRequire() {
  if (typeof require !== 'function') {
    return null;
  }

  try {
    const runtimeModules = require('./runtime.js');
    if (runtimeModules && typeof runtimeModules === 'object') {
      return runtimeModules;
    }
  } catch (runtimeRequireError) {
    void runtimeRequireError;
  }

  return null;
}

function readRuntimeModulesFromScopes() {


  const candidates = [
    typeof globalThis !== 'undefined' ? globalThis : null,
    typeof window !== 'undefined' ? window : null,
    typeof self !== 'undefined' ? self : null,
    typeof global !== 'undefined' ? global : null,
  ];

  for (let index = 0; index < candidates.length; index += 1) {
    const scope = candidates[index];
    if (!isScope(scope)) {
      continue;
    }

    try {
      const namespace = scope.cineCoreRuntimeModules;
      if (namespace && typeof namespace === 'object') {
        return namespace;
      }
    } catch (namespaceLookupError) {
      void namespaceLookupError;
    }
  }

  return null;
}

function readLoaderFromNamespace(namespace) {
  if (!namespace || typeof namespace !== 'object') {
    return null;
  }

  const candidate = namespace['modules/core/runtime-module-loader.js'];
  if (candidate && typeof candidate === 'object') {
    return candidate;
  }

  return null;
}

function createFallbackLoader() {
  const HAS = Object.prototype.hasOwnProperty;

  function collectCandidateScopes(options) {
    const scopes = [];

    function register(scope) {
      if (!isScope(scope)) {
        return;
      }

      if (scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }

    const primaryScope = options && options.primaryScope;
    const additionalScopes = options && options.candidateScopes;

    register(primaryScope);

    if (Array.isArray(additionalScopes)) {
      for (let index = 0; index < additionalScopes.length; index += 1) {
        register(additionalScopes[index]);
      }
    }

    if (typeof globalThis !== 'undefined') {
      register(globalThis);
    }

    if (typeof window !== 'undefined') {
      register(window);
    }

    if (typeof self !== 'undefined') {
      register(self);
    }

    if (typeof global !== 'undefined') {
      register(global);
    }

    return scopes;
  }

  function readRuntimeNamespaceFromScope(scope) {
    if (!isScope(scope)) {
      return null;
    }

    try {
      const namespace = scope.cineCoreRuntimeModules;
      return namespace && typeof namespace === 'object' ? namespace : null;
    } catch (scopeLookupError) {
      void scopeLookupError;
    }

    return null;
  }

  function tryRequireRuntimeNamespace() {
    if (typeof require !== 'function') {
      return null;
    }

    const candidates = ['./runtime.js'];

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      try {
        const required = require(candidate);
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (runtimeRequireError) {
        void runtimeRequireError;
      }
    }

    return null;
  }

  function resolveCoreRuntimeModulesNamespace(options) {


    const candidates = collectCandidateScopes(options || {});

    for (let index = 0; index < candidates.length; index += 1) {
      const namespace = readRuntimeNamespaceFromScope(candidates[index]);
      if (namespace) {
        return namespace;
      }
    }

    return tryRequireRuntimeNamespace();
  }

  function resolveCoreRuntimeModule(moduleId, options) {
    if (typeof moduleId !== 'string' || !moduleId) {
      return null;
    }

    const namespace = resolveCoreRuntimeModulesNamespace(options || {});
    if (!namespace || typeof namespace !== 'object') {
      return null;
    }

    if (HAS.call(namespace, moduleId)) {
      return namespace[moduleId];
    }

    return null;
  }

  return {
    resolveCoreRuntimeModulesNamespace,
    resolveCoreRuntimeModule,
  };
}

let loader =
  readLoaderFromNamespace(readRuntimeModulesThroughRequire()) ||
  readLoaderFromNamespace(readRuntimeModulesFromScopes());

// Safe access to prevent TDZ error - cineCoreRuntimeModuleLoader might refer to global, not our export
try {
  if (
    !loader &&
    typeof window !== 'undefined' &&
    window.cineCoreRuntimeModuleLoader &&
    typeof window.cineCoreRuntimeModuleLoader === 'object'
  ) {
    loader = window.cineCoreRuntimeModuleLoader;
  }
} catch (loaderAccessError) {
  // cineCoreRuntimeModuleLoader not available yet, will use fallback
  void loaderAccessError;
}

if (!loader) {
  loader = createFallbackLoader();
}

// })();

export const cineCoreRuntimeModuleLoader = loader;
