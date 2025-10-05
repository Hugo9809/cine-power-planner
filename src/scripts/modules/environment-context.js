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

  function resolveModuleSystem(scope) {
    const targetScope = scope || LOCAL_SCOPE;

    if (typeof require === 'function') {
      try {
        const required = require('./system.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (targetScope && typeof targetScope.cineModuleSystem === 'object') {
      return targetScope.cineModuleSystem;
    }

    return null;
  }

  const MODULE_SYSTEM = resolveModuleSystem(LOCAL_SCOPE);

  const ARCHITECTURE =
    (MODULE_SYSTEM && typeof MODULE_SYSTEM.getArchitecture === 'function'
      ? MODULE_SYSTEM.getArchitecture()
      : null)
    || resolveArchitecture(LOCAL_SCOPE);

  function detectWithArchitecture() {
    if (ARCHITECTURE && typeof ARCHITECTURE.detectGlobalScope === 'function') {
      try {
        const detected = ARCHITECTURE.detectGlobalScope();
        if (detected) {
          return detected;
        }
      } catch (error) {
        void error;
      }
    }
    return fallbackDetectGlobalScope();
  }

  const detectGlobalScope =
    MODULE_SYSTEM && typeof MODULE_SYSTEM.detectGlobalScope === 'function'
      ? function detectWithSystem() {
          try {
            const detected = MODULE_SYSTEM.detectGlobalScope();
            if (detected) {
              return detected;
            }
          } catch (error) {
            void error;
          }
          return detectWithArchitecture();
        }
      : detectWithArchitecture;

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

  function collectWithArchitecture(primary) {
    if (ARCHITECTURE && typeof ARCHITECTURE.collectCandidateScopes === 'function') {
      try {
        return ARCHITECTURE.collectCandidateScopes(primary || PRIMARY_SCOPE);
      } catch (error) {
        void error;
      }
    }
    return fallbackCollectCandidateScopes(primary || PRIMARY_SCOPE);
  }

  const collectCandidateScopes =
    MODULE_SYSTEM && typeof MODULE_SYSTEM.collectCandidateScopes === 'function'
      ? function collectWithSystem(primary) {
          const target = primary || PRIMARY_SCOPE;
          try {
            const scopes = MODULE_SYSTEM.collectCandidateScopes(target);
            if (Array.isArray(scopes) && scopes.length > 0) {
              return scopes;
            }
          } catch (error) {
            void error;
          }
          return collectWithArchitecture(target);
        }
      : collectWithArchitecture;

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
    MODULE_SYSTEM && typeof MODULE_SYSTEM.tryRequire === 'function'
      ? function tryRequireWithSystem(modulePath) {
          const result = MODULE_SYSTEM.tryRequire(modulePath);
          return typeof result === 'undefined' ? fallbackTryRequire(modulePath) : result;
        }
      : ARCHITECTURE && typeof ARCHITECTURE.tryRequire === 'function'
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
    MODULE_SYSTEM && typeof MODULE_SYSTEM.defineHiddenProperty === 'function'
      ? MODULE_SYSTEM.defineHiddenProperty
      : ARCHITECTURE && typeof ARCHITECTURE.defineHiddenProperty === 'function'
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
    MODULE_SYSTEM && typeof MODULE_SYSTEM.resolveFromScopes === 'function'
      ? function resolveWithSystem(propertyName, options) {
          const settings = { ...(options || {}) };
          if (!settings.primaryScope) {
            settings.primaryScope = PRIMARY_SCOPE;
          }
          if (!settings.scopes) {
            settings.scopes = collectCandidateScopes(settings.primaryScope);
          }
          return MODULE_SYSTEM.resolveFromScopes(propertyName, settings);
        }
      : ARCHITECTURE && typeof ARCHITECTURE.resolveFromScopes === 'function'
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
