(function () {
  var DEFAULT_PENDING_QUEUE_KEY = '__cinePendingModuleRegistrations__';

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

  var LOCAL_SCOPE = fallbackDetectGlobalScope();

  function tryRequireArchitecture(scope) {
    if (typeof require === 'function') {
      try {
        var required = require('./architecture.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    var targetScope = scope || LOCAL_SCOPE;
    if (targetScope && typeof targetScope.cineModuleArchitecture === 'object') {
      return targetScope.cineModuleArchitecture;
    }

    return null;
  }

  var ARCHITECTURE = tryRequireArchitecture(LOCAL_SCOPE);

  function fallbackCollectCandidateScopes(primary) {
    var scopes = [];

    function pushScope(scope) {
      if (!scope || typeof scope !== 'object' && typeof scope !== 'function') {
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
        var detected = ARCHITECTURE.detectGlobalScope();
        if (detected) {
          return detected;
        }
      } catch (error) {
        void error;
      }
    }
    return fallbackDetectGlobalScope();
  }

  var detectGlobalScope = ARCHITECTURE && typeof ARCHITECTURE.detectGlobalScope === 'function'
    ? function detectWithPreferred() {
        try {
          var detected = ARCHITECTURE.detectGlobalScope();
          if (detected) {
            return detected;
          }
        } catch (error) {
          void error;
        }
        return fallbackDetectGlobalScope();
      }
    : fallbackDetectGlobalScope;

  var PRIMARY_SCOPE = detectGlobalScope();

  function collectWithArchitecture(primary) {
    var target = primary || PRIMARY_SCOPE;

    if (ARCHITECTURE && typeof ARCHITECTURE.collectCandidateScopes === 'function') {
      try {
        var collected = ARCHITECTURE.collectCandidateScopes(target);
        if (Array.isArray(collected) && collected.length > 0) {
          return collected;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackCollectCandidateScopes(target);
  }

  function collectCandidateScopes(primary) {
    var target = primary || PRIMARY_SCOPE;
    var collected = collectWithArchitecture(target);
    if (Array.isArray(collected) && collected.length > 0) {
      return collected;
    }
    return fallbackCollectCandidateScopes(target);
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

  function tryRequireWithArchitecture(modulePath) {
    if (ARCHITECTURE && typeof ARCHITECTURE.tryRequire === 'function') {
      try {
        var result = ARCHITECTURE.tryRequire(modulePath);
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
    var targetScope = scope || PRIMARY_SCOPE;

    if (ARCHITECTURE && typeof ARCHITECTURE.tryRequire === 'function') {
      try {
        var required = ARCHITECTURE.tryRequire('./immutability.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    var direct = tryRequireWithArchitecture('./immutability.js');
    if (direct && _typeof(direct) === 'object') {
      return direct;
    }

    var scopes = collectCandidateScopes(targetScope);
    for (var index = 0; index < scopes.length; index += 1) {
      var candidate = scopes[index];
      if (candidate && _typeof(candidate.cineModuleImmutability) === 'object') {
        return candidate.cineModuleImmutability;
      }
    }

    return null;
  }

  function fallbackDefineHiddenProperty(target, name, value) {
    if (!target || typeof target !== 'object' && typeof target !== 'function') {
      return false;
    }

    try {
      Object.defineProperty(target, name, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: value
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

    var queue = null;
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
    var key = typeof queueKey === 'string' && queueKey ? queueKey : DEFAULT_PENDING_QUEUE_KEY;
    var targetScope = scope || PRIMARY_SCOPE;

    if (ARCHITECTURE && typeof ARCHITECTURE.ensureQueue === 'function') {
      try {
        var resolved = ARCHITECTURE.ensureQueue(targetScope, key);
        if (Array.isArray(resolved)) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackEnsureQueue(targetScope, key);
  }

  function shouldBypassDeepFreeze(value) {
    if (!value || typeof value !== 'object' && typeof value !== 'function') {
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

        var ctorName = value.constructor && value.constructor.name;
        if (ctorName && /Stream|Emitter|Port/i.test(ctorName)) {
          return true;
        }
      }

      if (typeof Symbol !== 'undefined' && value[Symbol.toStringTag]) {
        var tag = value[Symbol.toStringTag];
        if (typeof tag === 'string' && /Stream|Port/i.test(tag)) {
          return true;
        }
      }
    } catch (inspectionError) {
      void inspectionError;
    }

    return false;
  }

  function fallbackFreezeDeep(value, seen) {
    var tracker = seen || (typeof WeakSet === 'function' ? new WeakSet() : null);
    if (!value || typeof value !== 'object' && typeof value !== 'function') {
      return value;
    }

    if (shouldBypassDeepFreeze(value)) {
      return value;
    }

    if (tracker) {
      if (typeof tracker.has === 'function' && tracker.has(value)) {
        return value;
      }
      if (typeof tracker.add === 'function') {
        tracker.add(value);
      }
    }

    var keys;
    try {
      keys = Object.getOwnPropertyNames(value);
    } catch (error) {
      void error;
      keys = [];
    }

    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      var descriptor;
      try {
        descriptor = Object.getOwnPropertyDescriptor(value, key);
      } catch (descriptorError) {
        void descriptorError;
        descriptor = null;
      }
      if (!descriptor || descriptor.get || descriptor.set) {
        continue;
      }
      fallbackFreezeDeep(descriptor.value, tracker);
    }

    try {
      return Object.freeze(value);
    } catch (freezeError) {
      void freezeError;
      return value;
    }
  }

  function freezeDeep(value) {
    if (ARCHITECTURE && typeof ARCHITECTURE.freezeDeep === 'function') {
      try {
        return ARCHITECTURE.freezeDeep(value);
      } catch (error) {
        void error;
      }
    }

    return fallbackFreezeDeep(value);
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
    var targetScope = scope || PRIMARY_SCOPE;

    var required = tryRequireWithArchitecture('./registry.js');
    if (required && typeof required === 'object') {
      return required;
    }

    var scopes = collectCandidateScopes(targetScope);
    for (var index = 0; index < scopes.length; index += 1) {
      var candidate = scopes[index];
      if (candidate && typeof candidate.cineModules === 'object') {
        return candidate.cineModules;
      }
    }

    return null;
  }

  function queueModuleRegistration(scope, name, api, options) {
    var targetScope = scope || PRIMARY_SCOPE;
    var queue = ensureQueue(targetScope, DEFAULT_PENDING_QUEUE_KEY);
    if (!queue) {
      return false;
    }

    var normalizedOptions = {};
    if (options && typeof options === 'object') {
      for (var key in options) {
        if (Object.prototype.hasOwnProperty.call(options, key)) {
          normalizedOptions[key] = options[key];
        }
      }
    }

    var payload = freezeDeep({
      name: name,
      api: api,
      options: Object.freeze(normalizedOptions),
    });

    try {
      queue.push(payload);
    } catch (error) {
      void error;
      queue[queue.length] = payload;
    }

    return true;
  }

  var helpers = freezeDeep({
    architecture: ARCHITECTURE,
    detectGlobalScope: detectGlobalScope,
    getPrimaryScope: function getPrimaryScope() {
      return PRIMARY_SCOPE;
    },
    collectCandidateScopes: collectCandidateScopes,
    tryRequire: tryRequireWithArchitecture,
    defineHiddenProperty: defineHiddenProperty,
    ensureQueue: ensureQueue,
    freezeDeep: freezeDeep,
    safeWarn: safeWarn,
    resolveModuleRegistry: resolveModuleRegistry,
    queueModuleRegistration: queueModuleRegistration,
    pendingQueueKey: DEFAULT_PENDING_QUEUE_KEY,
    fallbackDetectGlobalScope: fallbackDetectGlobalScope,
  });

  var registry = resolveModuleRegistry(PRIMARY_SCOPE);
  var registrationOptions = {
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
