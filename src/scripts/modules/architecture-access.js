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
    const baseScope = primary || fallbackDetectGlobalScope();
    const scopes = [];

    function pushScope(scope) {
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        return;
      }
      if (scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }

    pushScope(baseScope);
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

  function fallbackEnsureQueue(scope, key) {
    const targetScope = scope || fallbackDetectGlobalScope();
    if (!targetScope || typeof targetScope !== 'object' || typeof key !== 'string' || !key) {
      return null;
    }

    let queue = targetScope[key];
    if (Array.isArray(queue)) {
      return queue;
    }

    if (!fallbackDefineHiddenProperty(targetScope, key, [])) {
      try {
        targetScope[key] = [];
      } catch (error) {
        void error;
        return null;
      }
    }

    queue = targetScope[key];
    return Array.isArray(queue) ? queue : null;
  }

  function fallbackFreezeDeep(value, seen) {
    if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
      return value;
    }

    const tracker = seen || new WeakSet();
    if (tracker.has(value)) {
      return value;
    }

    tracker.add(value);

    const keys = Object.getOwnPropertyNames(value);
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor || 'get' in descriptor || 'set' in descriptor) {
        continue;
      }

      fallbackFreezeDeep(descriptor.value, tracker);
    }

    return Object.freeze(value);
  }

  function fallbackSafeWarn(message, detail) {
    if (typeof console === 'undefined' || typeof console.warn !== 'function') {
      return;
    }

    try {
      if (typeof detail === 'undefined') {
        console.warn(message);
      } else {
        console.warn(message, detail);
      }
    } catch (error) {
      void error;
    }
  }

  function fallbackResolveFromScopes(propertyName, options) {
    const settings = options || {};
    const predicate = typeof settings.predicate === 'function' ? settings.predicate : null;
    const primaryScope = settings.primaryScope || fallbackDetectGlobalScope();
    const scopes = Array.isArray(settings.scopes)
      ? settings.scopes.slice()
      : fallbackCollectCandidateScopes(primaryScope);

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
      if (typeof candidate !== 'undefined') {
        return candidate;
      }
    }

    return null;
  }

  function resolveArchitecture(scope) {
    const targetScope = scope || fallbackDetectGlobalScope();

    const required = fallbackTryRequire('./architecture.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const candidates = fallbackCollectCandidateScopes(targetScope);
    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate && typeof candidate.cineModuleArchitecture === 'object') {
        return candidate.cineModuleArchitecture;
      }
    }

    return null;
  }

  const ARCHITECTURE_CACHE = typeof WeakMap !== 'undefined' ? new WeakMap() : null;

  function getArchitecture(scope) {
    const targetScope = scope || fallbackDetectGlobalScope();

    if (ARCHITECTURE_CACHE && ARCHITECTURE_CACHE.has(targetScope)) {
      return ARCHITECTURE_CACHE.get(targetScope);
    }

    const resolved = resolveArchitecture(targetScope);

    if (ARCHITECTURE_CACHE) {
      try {
        ARCHITECTURE_CACHE.set(targetScope, resolved);
      } catch (error) {
        void error;
      }
    }

    return resolved;
  }

  const BRIDGE_CACHE = typeof WeakMap !== 'undefined' ? new WeakMap() : null;

  function createBridge(primaryScope) {
    const baseScope = primaryScope || fallbackDetectGlobalScope();
    const architecture = getArchitecture(baseScope);

    function detectGlobalScope() {
      if (architecture && typeof architecture.detectGlobalScope === 'function') {
        try {
          const detected = architecture.detectGlobalScope();
          if (detected) {
            return detected;
          }
        } catch (error) {
          fallbackSafeWarn('cineModuleArchitectureAccess: detectGlobalScope failed.', error);
        }
      }

      return fallbackDetectGlobalScope();
    }

    function collectCandidateScopes(primary) {
      const initial = primary || baseScope || fallbackDetectGlobalScope();

      if (architecture && typeof architecture.collectCandidateScopes === 'function') {
        try {
          const collected = architecture.collectCandidateScopes(initial);
          if (Array.isArray(collected) && collected.length > 0) {
            return collected;
          }
        } catch (error) {
          fallbackSafeWarn('cineModuleArchitectureAccess: collectCandidateScopes failed.', error);
        }
      }

      return fallbackCollectCandidateScopes(initial);
    }

    function tryRequire(modulePath) {
      if (architecture && typeof architecture.tryRequire === 'function') {
        try {
          const result = architecture.tryRequire(modulePath);
          if (typeof result !== 'undefined') {
            return result;
          }
        } catch (error) {
          fallbackSafeWarn('cineModuleArchitectureAccess: tryRequire failed.', error);
        }
      }

      return fallbackTryRequire(modulePath);
    }

    function defineHiddenProperty(target, name, value) {
      if (architecture && typeof architecture.defineHiddenProperty === 'function') {
        try {
          return architecture.defineHiddenProperty(target, name, value);
        } catch (error) {
          fallbackSafeWarn('cineModuleArchitectureAccess: defineHiddenProperty failed.', error);
        }
      }

      return fallbackDefineHiddenProperty(target, name, value);
    }

    function ensureQueue(scope, key) {
      const targetScope = scope || baseScope;
      if (!targetScope) {
        return null;
      }

      if (architecture && typeof architecture.ensureQueue === 'function') {
        try {
          const queue = architecture.ensureQueue(targetScope, key);
          if (Array.isArray(queue)) {
            return queue;
          }
        } catch (error) {
          fallbackSafeWarn('cineModuleArchitectureAccess: ensureQueue failed.', error);
        }
      }

      return fallbackEnsureQueue(targetScope, key);
    }

    function freezeDeep(value) {
      if (architecture && typeof architecture.freezeDeep === 'function') {
        try {
          return architecture.freezeDeep(value);
        } catch (error) {
          fallbackSafeWarn('cineModuleArchitectureAccess: freezeDeep failed.', error);
        }
      }

      return fallbackFreezeDeep(value);
    }

    function safeWarn(message, detail) {
      if (architecture && typeof architecture.safeWarn === 'function') {
        try {
          architecture.safeWarn(message, detail);
          return;
        } catch (error) {
          fallbackSafeWarn('cineModuleArchitectureAccess: safeWarn failed.', error);
        }
      }

      fallbackSafeWarn(message, detail);
    }

    function resolveFromScopes(propertyName, options) {
      const settings = { ...(options || {}) };
      if (!settings.primaryScope) {
        settings.primaryScope = baseScope;
      }
      if (!settings.scopes) {
        settings.scopes = collectCandidateScopes(settings.primaryScope);
      }

      if (architecture && typeof architecture.resolveFromScopes === 'function') {
        try {
          return architecture.resolveFromScopes(propertyName, settings);
        } catch (error) {
          fallbackSafeWarn('cineModuleArchitectureAccess: resolveFromScopes failed.', error);
        }
      }

      return fallbackResolveFromScopes(propertyName, settings);
    }

    return Object.freeze({
      getArchitecture() {
        return architecture;
      },
      getPrimaryScope() {
        return baseScope;
      },
      detectGlobalScope,
      collectCandidateScopes,
      tryRequire,
      defineHiddenProperty,
      ensureQueue,
      freezeDeep,
      safeWarn,
      resolveFromScopes,
    });
  }

  function createScopedBridge(options) {
    const settings = options || {};
    const primaryScope = settings.scope || fallbackDetectGlobalScope();

    if (BRIDGE_CACHE && BRIDGE_CACHE.has(primaryScope)) {
      return BRIDGE_CACHE.get(primaryScope);
    }

    const bridge = createBridge(primaryScope);

    if (BRIDGE_CACHE) {
      try {
        BRIDGE_CACHE.set(primaryScope, bridge);
      } catch (error) {
        void error;
      }
    }

    return bridge;
  }

  const architectureAccess = Object.freeze({
    resolveArchitecture,
    getArchitecture,
    createScopedBridge,
    detectGlobalScope(scope) {
      return createScopedBridge({ scope }).detectGlobalScope();
    },
    collectCandidateScopes(primary, scope) {
      return createScopedBridge({ scope }).collectCandidateScopes(primary);
    },
    tryRequire(modulePath, scope) {
      return createScopedBridge({ scope }).tryRequire(modulePath);
    },
    defineHiddenProperty(target, name, value, scope) {
      return createScopedBridge({ scope }).defineHiddenProperty(target, name, value);
    },
    ensureQueue(scope, key, accessScope) {
      return createScopedBridge({ scope: accessScope }).ensureQueue(scope, key);
    },
    freezeDeep(value, scope) {
      return createScopedBridge({ scope }).freezeDeep(value);
    },
    safeWarn(message, detail, scope) {
      createScopedBridge({ scope }).safeWarn(message, detail);
    },
    resolveFromScopes(propertyName, options, scope) {
      return createScopedBridge({ scope }).resolveFromScopes(propertyName, options);
    },
    fallbacks: Object.freeze({
      detectGlobalScope: fallbackDetectGlobalScope,
      collectCandidateScopes: fallbackCollectCandidateScopes,
      tryRequire: fallbackTryRequire,
      defineHiddenProperty: fallbackDefineHiddenProperty,
      ensureQueue: fallbackEnsureQueue,
      freezeDeep: fallbackFreezeDeep,
      safeWarn: fallbackSafeWarn,
      resolveFromScopes: fallbackResolveFromScopes,
    }),
  });

  const globalScope = fallbackDetectGlobalScope();
  if (!globalScope.cineModuleArchitectureAccess) {
    fallbackDefineHiddenProperty(globalScope, 'cineModuleArchitectureAccess', architectureAccess);
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = architectureAccess;
  }
})();

