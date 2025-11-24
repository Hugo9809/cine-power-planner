(function () {
  function fallbackDetectPrimaryScope() {
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

  const LOCAL_SCOPE = fallbackDetectPrimaryScope();

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

  const detectPrimaryScope =
    ARCHITECTURE && typeof ARCHITECTURE.detectGlobalScope === 'function'
      ? ARCHITECTURE.detectGlobalScope
      : fallbackDetectPrimaryScope;

  const PRIMARY_SCOPE = detectPrimaryScope();

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
      ? function (primary) {
          return ARCHITECTURE.collectCandidateScopes(primary || PRIMARY_SCOPE);
        }
      : function (primary) {
          return fallbackCollectCandidateScopes(primary || PRIMARY_SCOPE);
        };

  const tryRequire =
    ARCHITECTURE && typeof ARCHITECTURE.tryRequire === 'function'
      ? ARCHITECTURE.tryRequire
      : function (modulePath) {
          if (typeof require !== 'function') {
            return null;
          }

          try {
            return require(modulePath);
          } catch (error) {
            void error;
            return null;
          }
        };

  let resolvedModuleBase;
  let hasResolvedModuleBase = false;

  function resolveModuleBase() {
    const required = tryRequire('./base.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const scopes = collectCandidateScopes(PRIMARY_SCOPE);
    if (ARCHITECTURE && typeof ARCHITECTURE.resolveFromScopes === 'function') {
      const resolved = ARCHITECTURE.resolveFromScopes('cineModuleBase', { scopes });
      if (resolved && typeof resolved === 'object') {
        return resolved;
      }
    }

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (scope && typeof scope.cineModuleBase === 'object') {
        return scope.cineModuleBase;
      }
    }

    return null;
  }

  function getModuleBase() {
    if (!hasResolvedModuleBase) {
      resolvedModuleBase = resolveModuleBase();
      hasResolvedModuleBase = true;
    }
    return resolvedModuleBase;
  }

  let resolvedGlobalScope;
  let hasResolvedGlobalScope = false;

  function getGlobalScope() {
    if (!hasResolvedGlobalScope) {
      const moduleBase = getModuleBase();
      if (moduleBase && typeof moduleBase.getGlobalScope === 'function') {
        try {
          const scope = moduleBase.getGlobalScope();
          resolvedGlobalScope = scope || PRIMARY_SCOPE;
        } catch (error) {
          void error;
          resolvedGlobalScope = PRIMARY_SCOPE;
        }
      } else {
        resolvedGlobalScope = PRIMARY_SCOPE;
      }
      hasResolvedGlobalScope = true;
    }
    return resolvedGlobalScope;
  }

  function getCandidateScopes(scope) {
    const base = getModuleBase();
    if (base && typeof base.collectCandidateScopes === 'function') {
      try {
        const scoped = base.collectCandidateScopes(scope || getGlobalScope());
        if (Array.isArray(scoped)) {
          return scoped;
        }
      } catch (error) {
        void error;
      }
    }

    return collectCandidateScopes(scope || getGlobalScope());
  }

  function getTryRequire() {
    const base = getModuleBase();
    if (base && typeof base.tryRequire === 'function') {
      return base.tryRequire;
    }
    return tryRequire;
  }

  function resolveModuleRegistry(scope) {
    const base = getModuleBase();
    const targetScope = scope || getGlobalScope();

    if (base && typeof base.resolveModuleRegistry === 'function') {
      try {
        return base.resolveModuleRegistry(targetScope);
      } catch (error) {
        void error;
      }
    }

    const required = getTryRequire()('./registry.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const scopes = getCandidateScopes(targetScope);
    if (ARCHITECTURE && typeof ARCHITECTURE.resolveFromScopes === 'function') {
      const resolved = ARCHITECTURE.resolveFromScopes('cineModules', { scopes });
      if (resolved && typeof resolved === 'object') {
        return resolved;
      }
    }

    for (let index = 0; index < scopes.length; index += 1) {
      const candidate = scopes[index];
      if (candidate && typeof candidate.cineModules === 'object') {
        return candidate.cineModules;
      }
    }

    return null;
  }

  let resolvedRegistry;
  let hasResolvedRegistry = false;

  function getModuleRegistry(scope) {
    if (scope && scope !== getGlobalScope()) {
      return resolveModuleRegistry(scope);
    }

    if (!hasResolvedRegistry) {
      resolvedRegistry = resolveModuleRegistry(getGlobalScope());
      hasResolvedRegistry = true;
    }

    return resolvedRegistry;
  }

  function getPendingQueueKey() {
    const base = getModuleBase();
    if (base && typeof base.PENDING_QUEUE_KEY === 'string') {
      return base.PENDING_QUEUE_KEY;
    }
    return '__cinePendingModuleRegistrations__';
  }

  function ensureQueue(scope) {
    if (!scope || typeof scope !== 'object') {
      return null;
    }

    const key = getPendingQueueKey();
    let queue = scope[key];
    if (Array.isArray(queue)) {
      return queue;
    }

    try {
      Object.defineProperty(scope, key, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: [],
      });
      queue = scope[key];
    } catch (error) {
      void error;
      try {
        if (!Array.isArray(scope[key])) {
          scope[key] = [];
        }
        queue = scope[key];
      } catch (assignmentError) {
        void assignmentError;
        return null;
      }
    }

    return queue;
  }

  function queueModuleRegistrationForScope(scope, name, api, options) {
    const base = getModuleBase();
    const targetScope = scope || getGlobalScope();

    if (base && typeof base.queueModuleRegistration === 'function') {
      try {
        return base.queueModuleRegistration(name, api, options, targetScope);
      } catch (error) {
        void error;
      }
    }

    const queue = ensureQueue(targetScope);
    if (!queue) {
      return false;
    }

    const payload = Object.freeze({
      name,
      api,
      options: Object.freeze({ ...(options || {}) }),
    });

    try {
      queue.push(payload);
    } catch (error) {
      void error;
      queue[queue.length] = payload;
    }

    return true;
  }

  function registerOrQueueForScope(scope, registry, name, api, options, onError) {
    const base = getModuleBase();
    const targetScope = scope || getGlobalScope();
    const targetRegistry = registry || getModuleRegistry(targetScope);

    if (base && typeof base.registerOrQueueModule === 'function') {
      try {
        return base.registerOrQueueModule(name, api, options, onError, targetScope, targetRegistry);
      } catch (error) {
        void error;
      }
    }

    if (targetRegistry && typeof targetRegistry.register === 'function') {
      try {
        targetRegistry.register(name, api, options);
        return true;
      } catch (error) {
        if (typeof onError === 'function') {
          onError(error);
        } else {
          void error;
        }
      }
    }

    queueModuleRegistrationForScope(targetScope, name, api, options);
    return false;
  }

  function isConsoleCandidate(value) {
    if (!value || typeof value === 'function' || (typeof value !== 'object' && typeof value !== 'function')) {
      return false;
    }

    if (isNodeProcessReference(value)) {
      return true;
    }

    if (
      typeof process !== 'undefined' &&
      process &&
      process.release &&
      process.release.name === 'node'
    ) {
      return true;
    }

    try {
      let globalConsole = null;
      try {
        if (typeof console !== 'undefined' && console) {
          globalConsole = console;
        }
      } catch (accessError) {
        void accessError;
      }

      if (globalConsole) {
        if (value === globalConsole) {
          return true;
        }
        try {
          if (
            value.__cameraPowerPlannerOriginal
            && value.__cameraPowerPlannerOriginal === globalConsole
          ) {
            return true;
          }
        } catch (proxyCheckError) {
          void proxyCheckError;
        }
      }

      try {
        if (
          typeof value.log === 'function'
          && typeof value.warn === 'function'
          && typeof value.error === 'function'
        ) {
          const ctorName = value.constructor && value.constructor.name;
          if (ctorName && /Console/i.test(ctorName)) {
            return true;
          }
          if (typeof Symbol !== 'undefined' && value[Symbol.toStringTag]) {
            const tag = value[Symbol.toStringTag];
            if (typeof tag === 'string' && /Console/i.test(tag)) {
              return true;
            }
          }
        }
      } catch (inspectionError) {
        void inspectionError;
      }
    } catch (error) {
      void error;
      return false;
    }

    return false;
  }

  function isNodeModuleCandidate(value) {
    if (!value || typeof value === 'function' || (typeof value !== 'object' && typeof value !== 'function')) {
      return false;
    }

    try {
      if (typeof value.require === 'function' && typeof value.loaded === 'boolean') {
        if (Array.isArray ? Array.isArray(value.children) : Object.prototype.toString.call(value.children) === '[object Array]') {
          return true;
        }
        if (typeof value.paths !== 'undefined') {
          return true;
        }
      }
    } catch (inspectionError) {
      void inspectionError;
    }

    return false;
  }

  function isEthereumProviderCandidate(value) {
    if (!value || typeof value === 'function' || (typeof value !== 'object' && typeof value !== 'function')) {
      return false;
    }

    if (PRIMARY_SCOPE && typeof PRIMARY_SCOPE === 'object') {
      try {
        if (value === PRIMARY_SCOPE.ethereum) {
          return true;
        }
      } catch (error) {
        void error;
        return true;
      }
    }

    try {
      if (value.isMetaMask === true) {
        return true;
      }
    } catch (inspectionError) {
      if (inspectionError && typeof inspectionError.message === 'string' && /metamask/i.test(inspectionError.message)) {
        return true;
      }
    }

    try {
      if (typeof value.request === 'function' && typeof value.on === 'function') {
        if (typeof value.removeListener === 'function' || typeof value.removeEventListener === 'function') {
          return true;
        }

        const ctorName = value.constructor && value.constructor.name;
        if (ctorName && /Ethereum|MetaMask|Provider/i.test(ctorName)) {
          return true;
        }
      }
    } catch (accessError) {
      void accessError;
      return true;
    }

    return false;
  }



  function isNodeProcessReference(value) {
    if (!value) {
      return false;
    }

    if (typeof process === 'undefined' || !process) {
      return false;
    }

    if (value === process) {
      return true;
    }

    if (typeof value === 'object') {
      try {
        if (value.constructor && value.constructor.name === 'process') {
          return true;
        }
      } catch (processInspectionError) {
        void processInspectionError;
      }

      if (
        typeof value.pid === 'number' &&
        typeof value.nextTick === 'function' &&
        typeof value.emit === 'function' &&
        typeof value.binding === 'function'
      ) {
        return true;
      }
    }

    if (typeof value === 'function') {
      if (
        value === process.binding ||
        value === process._linkedBinding ||
        value === process.dlopen
      ) {
        return true;
      }

      try {
        const functionName = value.name || '';
        if (functionName && (functionName === 'binding' || functionName === 'dlopen')) {
          const source = Function.prototype.toString.call(value);
          if (source && source.indexOf('[native code]') !== -1) {
            return true;
          }
        }
      } catch (functionInspectionError) {
        void functionInspectionError;
      }
    }

    return false;
  }

  function shouldBypassDeepFreeze(value) {
    if (!value || typeof value === 'function' || (typeof value !== 'object' && typeof value !== 'function')) {
      return false;
    }

    try {
      if (typeof value.pipe === 'function' && typeof value.unpipe === 'function') {
        return true;
      }

      if (typeof value.on === 'function' && typeof value.emit === 'function') {
        if (typeof value.write === 'function' || typeof value.read === 'function') {
          return true;
        }

        const ctorName = value.constructor && value.constructor.name;
        if (ctorName && /Stream|Emitter|Port/i.test(ctorName)) {
          return true;
        }
      }

      if (typeof Symbol !== 'undefined' && value[Symbol.toStringTag]) {
        const tag = value[Symbol.toStringTag];
        if (typeof tag === 'string' && /Stream|Port/i.test(tag)) {
          return true;
        }
      }
    } catch (inspectionError) {
      void inspectionError;
    }

    return false;
  }

  function fallbackResolveSeenTracker(seen) {
    if (seen && typeof seen.has === 'function' && typeof seen.add === 'function') {
      return seen;
    }

    if (Array.isArray(seen)) {
      return {
        has(value) {
          return seen.indexOf(value) !== -1;
        },
        add(value) {
          if (seen.indexOf(value) === -1) {
            seen.push(value);
          }
        },
      };
    }

    if (typeof WeakSet === 'function') {
      try {
        return new WeakSet();
      } catch (trackerError) {
        void trackerError;
      }
    }

    const tracked = [];
    return {
      has(value) {
        return tracked.indexOf(value) !== -1;
      },
      add(value) {
        if (tracked.indexOf(value) === -1) {
          tracked.push(value);
        }
      },
    };
  }

  function fallbackFreezeDeep(value, seen) {
    if (!value || typeof value === 'function' || (typeof value !== 'object' && typeof value !== 'function')) {
      return value;
    }

    if (
      shouldBypassDeepFreeze(value)
      || isEthereumProviderCandidate(value)
      || isConsoleCandidate(value)
      || isNodeModuleCandidate(value)
    ) {
      return value;
    }

    const tracker = fallbackResolveSeenTracker(seen);

    if (tracker.has(value)) {
      return value;
    }

    tracker.add(value);

    const keys = Object.getOwnPropertyNames(value);
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];

      let descriptor;
      try {
        descriptor = Object.getOwnPropertyDescriptor(value, key);
      } catch (descriptorError) {
        void descriptorError;
        descriptor = null;
      }

      if (
        descriptor &&
        (typeof descriptor.get === 'function' || typeof descriptor.set === 'function')
      ) {
        continue;
      }

      let child;
      try {
        child = value[key];
      } catch (accessError) {
        void accessError;
        child = undefined;
      }
      if (!child || typeof child === 'function' || (typeof child !== 'object' && typeof child !== 'function')) {
        continue;
      }

      if (
        shouldBypassDeepFreeze(child)
        || isEthereumProviderCandidate(child)
        || isConsoleCandidate(child)
        || isNodeModuleCandidate(child)
      ) {
        continue;
      }

      fallbackFreezeDeep(child, tracker);
    }

    try {
      return Object.freeze(value);
    } catch (freezeError) {
      void freezeError;
      return value;
    }
  }

  function freezeDeep(value, seen) {
    if (!value || typeof value === 'function' || (typeof value !== 'object' && typeof value !== 'function')) {
      return value;
    }

    if (
      shouldBypassDeepFreeze(value)
      || isEthereumProviderCandidate(value)
      || isConsoleCandidate(value)
      || isNodeModuleCandidate(value)
    ) {
      return value;
    }

    const base = getModuleBase();
    const freeze = base && typeof base.freezeDeep === 'function' ? base.freezeDeep : fallbackFreezeDeep;
    return freeze(value, seen);
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

  function safeWarn(message, detail) {
    const base = getModuleBase();
    const warn = base && typeof base.safeWarn === 'function' ? base.safeWarn : fallbackSafeWarn;
    warn(message, detail);
  }

  function fallbackExposeGlobal(name, value, scope, options = {}) {
    if (!scope || typeof scope !== 'object') {
      return false;
    }

    const descriptor = {
      configurable: options.configurable !== false,
      enumerable: !!options.enumerable,
      value,
      writable: options.writable === true,
    };

    try {
      Object.defineProperty(scope, name, descriptor);
      return true;
    } catch (error) {
      void error;
      try {
        scope[name] = value;
        return true;
      } catch (assignmentError) {
        void assignmentError;
        return false;
      }
    }
  }

  function exposeGlobal(name, value, scope, options) {
    const targetScope = scope || getGlobalScope();
    const base = getModuleBase();
    if (base && typeof base.exposeGlobal === 'function') {
      return base.exposeGlobal(name, value, targetScope, options);
    }
    return fallbackExposeGlobal(name, value, targetScope, options);
  }

  function createScopedEnvironment(options = {}) {
    const scope = options && typeof options.scope === 'object' ? options.scope : getGlobalScope();
    const registry = options && options.registry ? options.registry : getModuleRegistry(scope);

    const environment = {
      tryRequire(modulePath) {
        return getTryRequire()(modulePath);
      },
      queueModuleRegistration(name, api, queueOptions) {
        return queueModuleRegistrationForScope(scope, name, api, queueOptions);
      },
      registerOrQueueModule(name, api, registerOptions, onError) {
        return registerOrQueueForScope(scope, registry, name, api, registerOptions, onError);
      },
      freezeDeep,
      safeWarn,
      exposeGlobal(name, value, exposeOptions) {
        return exposeGlobal(name, value, scope, exposeOptions);
      },
      collectCandidateScopes() {
        return Object.freeze(getCandidateScopes(scope).slice());
      },
      PENDING_QUEUE_KEY: getPendingQueueKey(),
    };

    Object.defineProperties(environment, {
      scope: {
        configurable: false,
        enumerable: true,
        get() {
          return scope;
        },
      },
      registry: {
        configurable: false,
        enumerable: true,
        get() {
          return registry;
        },
      },
    });

    return freezeDeep(environment);
  }

  const moduleEnvironment = freezeDeep({
    getModuleBase,
    getGlobalScope,
    getModuleRegistry,
    resolveModuleRegistry,
    collectCandidateScopes: getCandidateScopes,
    tryRequire(modulePath) {
      return getTryRequire()(modulePath);
    },
    queueModuleRegistration(name, api, options, scope) {
      return queueModuleRegistrationForScope(scope || getGlobalScope(), name, api, options);
    },
    registerOrQueueModule(name, api, options, onError, scope, registry) {
      return registerOrQueueForScope(scope || getGlobalScope(), registry, name, api, options, onError);
    },
    freezeDeep,
    safeWarn,
    exposeGlobal(name, value, scope, options) {
      return exposeGlobal(name, value, scope || getGlobalScope(), options);
    },
    PENDING_QUEUE_KEY: getPendingQueueKey(),
    createScopedEnvironment,
  });

  registerOrQueueForScope(
    getGlobalScope(),
    getModuleRegistry(),
    'cineModuleEnvironment',
    moduleEnvironment,
    {
      category: 'infrastructure',
      description: 'Shared environment bootstrap that harmonizes module communication across bundles.',
      replace: true,
      connections: ['cineModuleBase', 'cineModuleGlobals', 'cineEnvironmentBridge'],
    },
    (error) => {
      safeWarn('Unable to register cineModuleEnvironment.', error);
    },
  );

  exposeGlobal('cineModuleEnvironment', moduleEnvironment, getGlobalScope(), {
    configurable: true,
    enumerable: false,
    writable: false,
  });

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = moduleEnvironment;
  }
})();
