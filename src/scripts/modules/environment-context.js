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

  function fallbackDefineHiddenProperty(target, name, value) {
    if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
      return false;
    }

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

  function fallbackResolveFromScopes(propertyName, options) {
    const settings = options || {};
    const predicate = typeof settings.predicate === 'function' ? settings.predicate : null;
    const scopes = Array.isArray(settings.scopes)
      ? settings.scopes.slice()
      : fallbackCollectCandidateScopes(settings.primaryScope);

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

  const LOCAL_SCOPE = fallbackDetectGlobalScope();

  function resolveArchitecture(scope) {
    const targetScope = scope || LOCAL_SCOPE;

    const required = fallbackTryRequire('./architecture.js');
    if (required && typeof required === 'object') {
      return required;
    }

    if (targetScope && typeof targetScope.cineModuleArchitecture === 'object') {
      return targetScope.cineModuleArchitecture;
    }

    return null;
  }

  function resolveModuleSystem(scope) {
    const targetScope = scope || LOCAL_SCOPE;

    const required = fallbackTryRequire('./system.js');
    if (required && typeof required === 'object') {
      return required;
    }

    if (targetScope && typeof targetScope.cineModuleSystem === 'object') {
      return targetScope.cineModuleSystem;
    }

    return null;
  }

  function resolveModuleContext(scope) {
    const targetScope = scope || LOCAL_SCOPE;

    const required = fallbackTryRequire('./context.js');
    if (required && typeof required === 'object') {
      return required;
    }

    if (targetScope && typeof targetScope.cineModuleContext === 'object') {
      return targetScope.cineModuleContext;
    }

    return null;
  }

  const MODULE_CONTEXT = resolveModuleContext(LOCAL_SCOPE);

  const MODULE_SYSTEM =
    (MODULE_CONTEXT && typeof MODULE_CONTEXT.getModuleSystem === 'function'
      ? MODULE_CONTEXT.getModuleSystem()
      : null)
    || resolveModuleSystem(LOCAL_SCOPE);

  const ARCHITECTURE =
    (MODULE_CONTEXT && typeof MODULE_CONTEXT.getArchitecture === 'function'
      ? MODULE_CONTEXT.getArchitecture()
      : null)
    || (MODULE_SYSTEM && typeof MODULE_SYSTEM.getArchitecture === 'function'
      ? MODULE_SYSTEM.getArchitecture()
      : null)
    || resolveArchitecture(LOCAL_SCOPE);

  const CONTEXT_INSTANCE =
    MODULE_CONTEXT && typeof MODULE_CONTEXT.createModuleContext === 'function'
      ? MODULE_CONTEXT.createModuleContext({ scope: LOCAL_SCOPE })
      : null;

  function detectWithoutContext() {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.detectGlobalScope === 'function') {
      try {
        const detected = MODULE_SYSTEM.detectGlobalScope();
        if (detected) {
          return detected;
        }
      } catch (error) {
        void error;
      }
    }

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

  const PRIMARY_SCOPE =
    (CONTEXT_INSTANCE && typeof CONTEXT_INSTANCE.getScope === 'function'
      ? CONTEXT_INSTANCE.getScope()
      : null)
    || detectWithoutContext();

  const detectGlobalScope =
    CONTEXT_INSTANCE && typeof CONTEXT_INSTANCE.detectGlobalScope === 'function'
      ? function detectWithContext(primary) {
          try {
            const detected = CONTEXT_INSTANCE.detectGlobalScope(primary);
            if (detected) {
              return detected;
            }
          } catch (error) {
            void error;
          }
          return detectWithoutContext();
        }
      : function detectWithFallback(primary) {
          void primary;
          return detectWithoutContext();
        };

  function collectWithoutContext(primary) {
    const target = primary || PRIMARY_SCOPE;

    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.collectCandidateScopes === 'function') {
      try {
        const scopes = MODULE_SYSTEM.collectCandidateScopes(target);
        if (Array.isArray(scopes) && scopes.length > 0) {
          return scopes;
        }
      } catch (error) {
        void error;
      }
    }

    if (ARCHITECTURE && typeof ARCHITECTURE.collectCandidateScopes === 'function') {
      try {
        return ARCHITECTURE.collectCandidateScopes(target);
      } catch (error) {
        void error;
      }
    }

    return fallbackCollectCandidateScopes(target);
  }

  const collectCandidateScopes =
    CONTEXT_INSTANCE && typeof CONTEXT_INSTANCE.collectCandidateScopes === 'function'
      ? function collectWithContext(primary) {
          try {
            const scopes = CONTEXT_INSTANCE.collectCandidateScopes(primary || PRIMARY_SCOPE);
            if (Array.isArray(scopes) && scopes.length > 0) {
              return scopes;
            }
          } catch (error) {
            void error;
          }
          return collectWithoutContext(primary);
        }
      : collectWithoutContext;

  function tryRequireWithoutContext(modulePath) {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.tryRequire === 'function') {
      const result = MODULE_SYSTEM.tryRequire(modulePath);
      if (typeof result !== 'undefined') {
        return result;
      }
    }

    if (ARCHITECTURE && typeof ARCHITECTURE.tryRequire === 'function') {
      return ARCHITECTURE.tryRequire(modulePath);
    }

    return fallbackTryRequire(modulePath);
  }

  const tryRequire =
    CONTEXT_INSTANCE && typeof CONTEXT_INSTANCE.tryRequire === 'function'
      ? function tryRequireWithContext(modulePath) {
          const result = CONTEXT_INSTANCE.tryRequire(modulePath);
          return typeof result === 'undefined' ? tryRequireWithoutContext(modulePath) : result;
        }
      : tryRequireWithoutContext;

  const defineHiddenProperty =
    CONTEXT_INSTANCE && typeof CONTEXT_INSTANCE.defineHiddenProperty === 'function'
      ? function defineWithContext(target, name, value) {
          return CONTEXT_INSTANCE.defineHiddenProperty(target, name, value);
        }
      : MODULE_SYSTEM && typeof MODULE_SYSTEM.defineHiddenProperty === 'function'
        ? MODULE_SYSTEM.defineHiddenProperty
        : ARCHITECTURE && typeof ARCHITECTURE.defineHiddenProperty === 'function'
          ? ARCHITECTURE.defineHiddenProperty
          : fallbackDefineHiddenProperty;

  function resolveFromScopesWithoutContext(propertyName, options) {
    const settings = { ...(options || {}) };
    if (!settings.primaryScope) {
      settings.primaryScope = PRIMARY_SCOPE;
    }
    if (!settings.scopes) {
      settings.scopes = collectWithoutContext(settings.primaryScope);
    }

    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.resolveFromScopes === 'function') {
      try {
        return MODULE_SYSTEM.resolveFromScopes(propertyName, settings);
      } catch (error) {
        void error;
      }
    }

    if (ARCHITECTURE && typeof ARCHITECTURE.resolveFromScopes === 'function') {
      try {
        return ARCHITECTURE.resolveFromScopes(propertyName, settings);
      } catch (error) {
        void error;
      }
    }

    return fallbackResolveFromScopes(propertyName, settings);
  }

  const resolveFromScopes =
    CONTEXT_INSTANCE && typeof CONTEXT_INSTANCE.resolveFromScopes === 'function'
      ? function resolveWithContext(propertyName, options) {
          try {
            return CONTEXT_INSTANCE.resolveFromScopes(propertyName, options);
          } catch (error) {
            void error;
          }
          return resolveFromScopesWithoutContext(propertyName, options);
        }
      : resolveFromScopesWithoutContext;

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

  function resolveModuleRegistry(scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    if (CONTEXT_INSTANCE && typeof CONTEXT_INSTANCE.getModuleRegistry === 'function') {
      try {
        const provided = CONTEXT_INSTANCE.getModuleRegistry();
        if (provided && typeof provided === 'object') {
          return provided;
        }
      } catch (error) {
        void error;
      }
    }

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
    const define =
      CONTEXT_INSTANCE && typeof CONTEXT_INSTANCE.defineHiddenProperty === 'function'
        ? CONTEXT_INSTANCE.defineHiddenProperty
        : defineHiddenProperty;
    define(globalScope, 'cineModuleEnvironmentContext', context);
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = context;
  }
})();
