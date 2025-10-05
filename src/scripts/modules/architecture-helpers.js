(function () {
  const DEFAULT_PENDING_QUEUE_KEY = '__cinePendingModuleRegistrations__';

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

  function tryRequireArchitecture(scope) {
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

    const targetScope = scope || LOCAL_SCOPE;
    if (targetScope && typeof targetScope.cineModuleArchitecture === 'object') {
      return targetScope.cineModuleArchitecture;
    }

    return null;
  }

  const ARCHITECTURE = tryRequireArchitecture(LOCAL_SCOPE);

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
    ARCHITECTURE && typeof ARCHITECTURE.detectGlobalScope === 'function'
      ? function detectWithPreferred() {
          try {
            const detected = ARCHITECTURE.detectGlobalScope();
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

  function collectWithArchitecture(primary) {
    const target = primary || PRIMARY_SCOPE;

    if (ARCHITECTURE && typeof ARCHITECTURE.collectCandidateScopes === 'function') {
      try {
        const collected = ARCHITECTURE.collectCandidateScopes(target);
        if (Array.isArray(collected) && collected.length > 0) {
          return collected;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackCollectCandidateScopes(target);
  }

  const collectCandidateScopes = function collect(primary) {
    const target = primary || PRIMARY_SCOPE;
    const collected = collectWithArchitecture(target);
    if (Array.isArray(collected) && collected.length > 0) {
      return collected;
    }
    return fallbackCollectCandidateScopes(target);
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

  function tryRequireWithArchitecture(modulePath) {
    if (ARCHITECTURE && typeof ARCHITECTURE.tryRequire === 'function') {
      try {
        const result = ARCHITECTURE.tryRequire(modulePath);
        if (typeof result !== 'undefined') {
          return result;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackTryRequire(modulePath);
  }

  function resolveImmutability(scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    if (ARCHITECTURE && typeof ARCHITECTURE.tryRequire === 'function') {
      try {
        const required = ARCHITECTURE.tryRequire('./immutability.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    const direct = tryRequireWithArchitecture('./immutability.js');
    if (direct && typeof direct === 'object') {
      return direct;
    }

    const scopes = collectCandidateScopes(targetScope);
    for (let index = 0; index < scopes.length; index += 1) {
      const candidate = scopes[index];
      if (candidate && typeof candidate.cineModuleImmutability === 'object') {
        return candidate.cineModuleImmutability;
      }
    }

    return null;
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

  function defineHiddenProperty(target, name, value) {
    if (ARCHITECTURE && typeof ARCHITECTURE.defineHiddenProperty === 'function') {
      try {
        if (ARCHITECTURE.defineHiddenProperty(target, name, value)) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackDefineHiddenProperty(target, name, value);
  }

  function fallbackEnsureQueue(scope, queueKey) {
    if (!scope || typeof scope !== 'object') {
      return null;
    }

    let queue = null;
    try {
      queue = scope[queueKey];
    } catch (error) {
      void error;
      queue = null;
    }

    if (Array.isArray(queue)) {
      return queue;
    }

    if (defineHiddenProperty(scope, queueKey, [])) {
      queue = scope[queueKey];
      if (Array.isArray(queue)) {
        return queue;
      }
    }

    try {
      scope[queueKey] = [];
      queue = scope[queueKey];
    } catch (error) {
      void error;
      return null;
    }

    return Array.isArray(queue) ? queue : null;
  }

  function ensureQueue(scope, queueKey) {
    const key = typeof queueKey === 'string' && queueKey ? queueKey : DEFAULT_PENDING_QUEUE_KEY;
    const targetScope = scope || PRIMARY_SCOPE;

    if (ARCHITECTURE && typeof ARCHITECTURE.ensureQueue === 'function') {
      try {
        const resolved = ARCHITECTURE.ensureQueue(targetScope, key);
        if (Array.isArray(resolved)) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackEnsureQueue(targetScope, key);
  }

  function createFallbackImmutability() {
    function shouldBypass(value) {
      if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
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

    function freeze(value, seen = new WeakSet()) {
      if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
        return value;
      }

      if (shouldBypass(value)) {
        return value;
      }

      if (seen.has(value)) {
        return value;
      }

      seen.add(value);

      const keys = Object.getOwnPropertyNames(value);
      for (let index = 0; index < keys.length; index += 1) {
        const key = keys[index];
        const descriptor = Object.getOwnPropertyDescriptor(value, key);
        if (!descriptor || ('get' in descriptor) || ('set' in descriptor)) {
          continue;
        }
        freeze(descriptor.value, seen);
      }

      return Object.freeze(value);
    }

    return {
      shouldBypassDeepFreeze: shouldBypass,
      freezeDeep: freeze,
    };
  }

  const FALLBACK_IMMUTABILITY = createFallbackImmutability();
  let activeImmutability = resolveImmutability(PRIMARY_SCOPE) || FALLBACK_IMMUTABILITY;

  function getImmutability() {
    if (activeImmutability !== FALLBACK_IMMUTABILITY) {
      return activeImmutability;
    }

    const resolved = resolveImmutability(PRIMARY_SCOPE);
    if (resolved && resolved !== activeImmutability) {
      activeImmutability = resolved;
    }

    return activeImmutability;
  }

  function freezeDeep(value) {
    const provider = getImmutability();

    try {
      return provider.freezeDeep(value);
    } catch (error) {
      void error;
    }

    return FALLBACK_IMMUTABILITY.freezeDeep(value);
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
    if (ARCHITECTURE && typeof ARCHITECTURE.safeWarn === 'function') {
      try {
        ARCHITECTURE.safeWarn(message, detail);
        return;
      } catch (error) {
        void error;
      }
    }

    fallbackSafeWarn(message, detail);
  }

  function resolveModuleRegistry(scope) {
    const targetScope = scope || PRIMARY_SCOPE;

    const required = tryRequireWithArchitecture('./registry.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const scopes = collectCandidateScopes(targetScope);
    for (let index = 0; index < scopes.length; index += 1) {
      const candidate = scopes[index];
      if (candidate && typeof candidate.cineModules === 'object') {
        return candidate.cineModules;
      }
    }

    return null;
  }

  function queueModuleRegistration(scope, name, api, options) {
    const targetScope = scope || PRIMARY_SCOPE;
    const queue = ensureQueue(targetScope, DEFAULT_PENDING_QUEUE_KEY);
    if (!queue) {
      return false;
    }

    const payload = freezeDeep({
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

  const helpers = freezeDeep({
    architecture: ARCHITECTURE,
    detectGlobalScope,
    getPrimaryScope() {
      return PRIMARY_SCOPE;
    },
    collectCandidateScopes,
    tryRequire: tryRequireWithArchitecture,
    defineHiddenProperty,
    ensureQueue,
    freezeDeep,
    safeWarn,
    resolveModuleRegistry,
    queueModuleRegistration,
    pendingQueueKey: DEFAULT_PENDING_QUEUE_KEY,
    fallbackDetectGlobalScope,
  });

  const registry = resolveModuleRegistry(PRIMARY_SCOPE);
  const registrationOptions = {
    category: 'infrastructure',
    description: 'Shared architecture helpers for scope detection, registry resolution and queue management.',
    replace: true,
  };

  if (registry && typeof registry.register === 'function') {
    try {
      registry.register('cineModuleArchitectureHelpers', helpers, registrationOptions);
    } catch (error) {
      safeWarn('cineModuleArchitectureHelpers: immediate registry registration failed.', error);
      queueModuleRegistration(PRIMARY_SCOPE, 'cineModuleArchitectureHelpers', helpers, registrationOptions);
    }
  } else {
    queueModuleRegistration(PRIMARY_SCOPE, 'cineModuleArchitectureHelpers', helpers, registrationOptions);
  }

  if (PRIMARY_SCOPE && typeof PRIMARY_SCOPE === 'object' && !PRIMARY_SCOPE.cineModuleArchitectureHelpers) {
    defineHiddenProperty(PRIMARY_SCOPE, 'cineModuleArchitectureHelpers', helpers);
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = helpers;
  }
})();
