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
    var scopes = [];

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
    var required = fallbackTryRequire('./environment.js');
    if (required && typeof required === 'object') {
      return required;
    }

    var candidates = fallbackCollectCandidateScopes(scope);

    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && typeof candidate.cineModuleEnvironment === 'object') {
        return candidate.cineModuleEnvironment;
      }
    }

    return null;
  }

  function fallbackLoadEnvironmentBridge(scope) {
    var required = fallbackTryRequire('./environment-bridge.js');
    if (required && typeof required === 'object') {
      return required;
    }

    var candidates = fallbackCollectCandidateScopes(scope);

    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && typeof candidate.cineEnvironmentBridge === 'object') {
        return candidate.cineEnvironmentBridge;
      }
    }

    return null;
  }

  function fallbackResolveModuleGlobals(scope) {
    var required = fallbackTryRequire('./globals.js');
    if (required && typeof required === 'object') {
      return required;
    }

    var candidates = fallbackCollectCandidateScopes(scope);

    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && typeof candidate.cineModuleGlobals === 'object') {
        return candidate.cineModuleGlobals;
      }
    }

    return null;
  }

  function resolveModuleLinker(scope) {
    var required = fallbackTryRequire('./helpers/module-linker.js');
    if (required && typeof required === 'object') {
      return required;
    }

    var candidates = fallbackCollectCandidateScopes(scope);

    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      try {
        var linker = candidate && candidate.cineModuleLinker;
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
    var targetScope = scope || (typeof detectScope === 'function' ? detectScope() : fallbackDetectGlobalScope());

    var required = fallbackTryRequire('./system.js');
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
        value: value,
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

  var helpers = {
    fallbackCollectCandidateScopes: fallbackCollectCandidateScopes,
    fallbackDetectGlobalScope: fallbackDetectGlobalScope,
    fallbackLoadEnvironmentBridge: fallbackLoadEnvironmentBridge,
    fallbackLoadModuleEnvironment: fallbackLoadModuleEnvironment,
    fallbackResolveModuleGlobals: fallbackResolveModuleGlobals,
    fallbackTryRequire: fallbackTryRequire,
    resolveModuleLinker: resolveModuleLinker,
    resolveModuleSystem: resolveModuleSystem,
  };

  var globalScope = fallbackDetectGlobalScope();

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
