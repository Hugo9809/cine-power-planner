(function () {
  function fallbackDetectGlobalScope() {
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    return {};
  }

  function fallbackCollectCandidateScopes(primary) {
    const scopes = [];

    function pushScope(scope) {
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        return;
      }
      if (scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }

    pushScope(primary);
    if (typeof globalThis !== 'undefined') pushScope(globalThis);
    if (typeof window !== 'undefined') pushScope(window);
    if (typeof self !== 'undefined') pushScope(self);
    if (typeof global !== 'undefined') pushScope(global);

    return scopes;
  }

  function fallbackTryRequire(modulePath) {
    if (typeof require !== 'function') {
      return null;
    }

    try {
      return require(modulePath);
    } catch (error) {
      void error;
      return null;
    }
  }

  function fallbackLoadModuleEnvironment(scope) {
    const required = fallbackTryRequire('./environment.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const candidates = fallbackCollectCandidateScopes(scope);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate && typeof candidate.cineModuleEnvironment === 'object') {
        return candidate.cineModuleEnvironment;
      }
    }

    return null;
  }

  function fallbackLoadEnvironmentBridge(scope) {
    const required = fallbackTryRequire('./environment-bridge.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const candidates = fallbackCollectCandidateScopes(scope);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate && typeof candidate.cineEnvironmentBridge === 'object') {
        return candidate.cineEnvironmentBridge;
      }
    }

    return null;
  }

  function fallbackResolveModuleGlobals(scope) {
    const required = fallbackTryRequire('./globals.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const candidates = fallbackCollectCandidateScopes(scope);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate && typeof candidate.cineModuleGlobals === 'object') {
        return candidate.cineModuleGlobals;
      }
    }

    return null;
  }

  function resolveModuleLinker(scope) {
    const required = fallbackTryRequire('./helpers/module-linker.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const candidates = fallbackCollectCandidateScopes(scope);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      try {
        const linker = candidate && candidate.cineModuleLinker;
        if (linker && typeof linker === 'object') {
          return linker;
        }
      } catch (error) {
        void error;
      }
    }

    return null;
  }

  function resolveModuleSystem(scope, detectScope) {
    const targetScope = scope || (typeof detectScope === 'function' ? detectScope() : fallbackDetectGlobalScope());

    const required = fallbackTryRequire('./system.js');
    if (required && typeof required === 'object') {
      return required;
    }

    if (targetScope && typeof targetScope.cineModuleSystem === 'object') {
      return targetScope.cineModuleSystem;
    }

    return null;
  }

  function defineHiddenProperty(target, name, value) {
    if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
      return false;
    }

    try {
      Object.defineProperty(target, name, {
        configurable: true,
        enumerable: false,
        value,
        writable: true,
      });
      return true;
    } catch (error) {
      void error;
    }

    try {
      target[name] = value;
      return true;
    } catch (assignmentError) {
      void assignmentError;
    }

    return false;
  }

  const helpers = {
    fallbackCollectCandidateScopes,
    fallbackDetectGlobalScope,
    fallbackLoadEnvironmentBridge,
    fallbackLoadModuleEnvironment,
    fallbackResolveModuleGlobals,
    fallbackTryRequire,
    resolveModuleLinker,
    resolveModuleSystem,
  };

  const globalScope = fallbackDetectGlobalScope();

  if (typeof module !== 'undefined' && module && module.exports) {
    if (
      module.exports &&
      module.exports !== helpers &&
      typeof module.exports === 'object' &&
      Object.keys(module.exports).length > 0
    ) {
      try {
        defineHiddenProperty(module.exports, 'cineRuntimeEnvironmentHelpers', helpers);
      } catch (attachmentError) {
        void attachmentError;
      }
    } else {
      module.exports = helpers;
    }
  }

  if (globalScope && typeof globalScope === 'object') {
    if (globalScope.cineRuntimeEnvironmentHelpers !== helpers) {
      defineHiddenProperty(globalScope, 'cineRuntimeEnvironmentHelpers', helpers);
    }
  }
})();
