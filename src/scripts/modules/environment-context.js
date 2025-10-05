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

  const LOCAL_SCOPE = fallbackDetectGlobalScope();

  function resolveArchitecture(scope) {
    const targetScope = scope || LOCAL_SCOPE;

    if (typeof require === 'function') {
      try {
        const required = require('./architecture.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (targetScope && typeof targetScope.cineModuleArchitecture === 'object') {
      return targetScope.cineModuleArchitecture;
    }

    return null;
  }

  const ARCHITECTURE = resolveArchitecture(LOCAL_SCOPE);

  const detectGlobalScope =
    ARCHITECTURE && typeof ARCHITECTURE.detectGlobalScope === 'function'
      ? function detectWithArchitecture() {
          return ARCHITECTURE.detectGlobalScope();
        }
      : fallbackDetectGlobalScope;

  const PRIMARY_SCOPE = detectGlobalScope();

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

  const collectCandidateScopes =
    ARCHITECTURE && typeof ARCHITECTURE.collectCandidateScopes === 'function'
      ? function collectWithArchitecture(primary) {
          return ARCHITECTURE.collectCandidateScopes(primary || PRIMARY_SCOPE);
        }
      : function collectWithFallback(primary) {
          return fallbackCollectCandidateScopes(primary || PRIMARY_SCOPE);
        };

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

  const tryRequire =
    ARCHITECTURE && typeof ARCHITECTURE.tryRequire === 'function'
      ? function tryRequireWithArchitecture(modulePath) {
          return ARCHITECTURE.tryRequire(modulePath);
        }
      : fallbackTryRequire;

  function fallbackDefineHiddenProperty(target, name, value) {
    try {
      Object.defineProperty(target, name, {
        configurable: true,
        enumerable: false,
        writable: true,
        value,
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

  const defineHiddenProperty =
    ARCHITECTURE && typeof ARCHITECTURE.defineHiddenProperty === 'function'
      ? ARCHITECTURE.defineHiddenProperty
      : fallbackDefineHiddenProperty;

  function fallbackResolveFromScopes(propertyName, options) {
    const settings = options || {};
    const predicate = typeof settings.predicate === 'function' ? settings.predicate : null;
    const scopes = Array.isArray(settings.scopes)
      ? settings.scopes.slice()
      : fallbackCollectCandidateScopes(settings.primaryScope || PRIMARY_SCOPE);

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      if (predicate) {
        try {
          if (predicate(scope, propertyName)) {
            return scope;
          }
        } catch (error) {
          void error;
        }
        continue;
      }

      const candidate = scope[propertyName];
      if (candidate && typeof candidate === 'object') {
        return candidate;
      }
    }

    return null;
  }

  const resolveFromScopes =
    ARCHITECTURE && typeof ARCHITECTURE.resolveFromScopes === 'function'
      ? function resolveWithArchitecture(propertyName, options) {
          const settings = { ...(options || {}) };
          if (!settings.primaryScope) {
            settings.primaryScope = PRIMARY_SCOPE;
          }
          return ARCHITECTURE.resolveFromScopes(propertyName, settings);
        }
      : fallbackResolveFromScopes;

  function resolveModuleEnvironment(scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    const required = tryRequire('./environment.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const resolved = resolveFromScopes('cineModuleEnvironment', {
      primaryScope: targetScope,
      scopes: collectCandidateScopes(targetScope),
    });

    return resolved && typeof resolved === 'object' ? resolved : null;
  }

  function resolveEnvironmentBridge(scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    const required = tryRequire('./environment-bridge.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const resolved = resolveFromScopes('cineEnvironmentBridge', {
      primaryScope: targetScope,
      scopes: collectCandidateScopes(targetScope),
    });

    return resolved && typeof resolved === 'object' ? resolved : null;
  }

  function resolveModuleGlobals(scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    const required = tryRequire('./globals.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const resolved = resolveFromScopes('cineModuleGlobals', {
      primaryScope: targetScope,
      scopes: collectCandidateScopes(targetScope),
    });

    return resolved && typeof resolved === 'object' ? resolved : null;
  }

  function getGlobalScope(scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    const bridge = resolveEnvironmentBridge(targetScope);
    if (bridge && typeof bridge.getGlobalScope === 'function') {
      try {
        const bridged = bridge.getGlobalScope(targetScope);
        if (bridged) {
          return bridged;
        }
      } catch (error) {
        void error;
      }
    }

    const environment = resolveModuleEnvironment(targetScope);
    if (environment && typeof environment.getGlobalScope === 'function') {
      try {
        const provided = environment.getGlobalScope(targetScope);
        if (provided) {
          return provided;
        }
      } catch (error) {
        void error;
      }
    }

    return targetScope || PRIMARY_SCOPE;
  }

  function resolveModuleRegistry(scope) {
    const targetScope = scope || PRIMARY_SCOPE;
    const moduleGlobals = resolveModuleGlobals(targetScope);

    if (moduleGlobals && typeof moduleGlobals.resolveModuleRegistry === 'function') {
      try {
        const resolved = moduleGlobals.resolveModuleRegistry(targetScope);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }

    if (moduleGlobals && typeof moduleGlobals.getModuleRegistry === 'function') {
      try {
        const provided = moduleGlobals.getModuleRegistry(targetScope);
        if (provided) {
          return provided;
        }
      } catch (error) {
        void error;
      }
    }

    const bridge = resolveEnvironmentBridge(targetScope);
    if (bridge && typeof bridge.getModuleRegistry === 'function') {
      try {
        const bridged = bridge.getModuleRegistry(targetScope);
        if (bridged) {
          return bridged;
        }
      } catch (error) {
        void error;
      }
    }

    const environment = resolveModuleEnvironment(targetScope);
    if (environment && typeof environment.resolveModuleRegistry === 'function') {
      try {
        const resolved = environment.resolveModuleRegistry(targetScope);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }

    const required = tryRequire('./registry.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const resolved = resolveFromScopes('cineModules', {
      primaryScope: targetScope,
      scopes: collectCandidateScopes(targetScope),
    });

    return resolved && typeof resolved === 'object' ? resolved : null;
  }

  const context = Object.freeze({
    detectGlobalScope,
    collectCandidateScopes,
    resolveFromScopes,
    tryRequire,
    resolveModuleEnvironment,
    resolveEnvironmentBridge,
    resolveModuleGlobals,
    resolveModuleRegistry,
    getGlobalScope,
    getPrimaryScope() {
      return PRIMARY_SCOPE;
    },
  });

  const globalScope = getGlobalScope(PRIMARY_SCOPE) || PRIMARY_SCOPE;
  if (globalScope && !globalScope.cineModuleEnvironmentContext) {
    defineHiddenProperty(globalScope, 'cineModuleEnvironmentContext', context);
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = context;
  }
})();
