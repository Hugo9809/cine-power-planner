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

  function fallbackDefineHiddenProperty(target, key, value) {
    if (!target || typeof target !== 'object' && typeof target !== 'function') {
      return false;
    }

    try {
      Object.defineProperty(target, key, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: value,
      });
      return true;
    } catch (error) {
      void error;
    }

    try {
      target[key] = value;
      return true;
    } catch (assignmentError) {
      void assignmentError;
    }

    return false;
  }

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

    if (primary) {
      pushScope(primary);
    }

    pushScope(fallbackDetectGlobalScope());
    if (typeof globalThis !== 'undefined') pushScope(globalThis);
    if (typeof window !== 'undefined') pushScope(window);
    if (typeof self !== 'undefined') pushScope(self);
    if (typeof global !== 'undefined') pushScope(global);

    return scopes;
  }

  function cloneOptions(source) {
    if (!source || typeof source !== 'object') {
      return {};
    }

    var clone = {};
    var keys = Object.keys(source);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      clone[key] = source[key];
    }
    return clone;
  }

  function fallbackResolveFromScopes(propertyName, options) {
    var settings = options || {};
    var predicate = typeof settings.predicate === 'function' ? settings.predicate : null;
    var scopes = Array.isArray(settings.scopes) ? settings.scopes.slice() : [];

    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope || typeof scope !== 'object' && typeof scope !== 'function') {
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

      var candidate = scope[propertyName];
      if (candidate && typeof candidate === 'object') {
        return candidate;
      }
    }

    return null;
  }

  function fallbackCreateImmutability() {
    function shouldBypass(value) {
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

    function freeze(value, seen) {
      var tracker = seen || new WeakSet();

      if (!value || typeof value !== 'object' && typeof value !== 'function') {
        return value;
      }

      if (shouldBypass(value)) {
        return value;
      }

      if (tracker.has(value)) {
        return value;
      }

      tracker.add(value);

      var keys = Object.getOwnPropertyNames(value);
      for (var index = 0; index < keys.length; index += 1) {
        var key = keys[index];
        var descriptor = Object.getOwnPropertyDescriptor(value, key);
        if (!descriptor || 'get' in descriptor || 'set' in descriptor) {
          continue;
        }

        freeze(descriptor.value, tracker);
      }

      return Object.freeze(value);
    }

    return {
      shouldBypassDeepFreeze: shouldBypass,
      freezeDeep: freeze,
    };
  }

  var FALLBACK_IMMUTABILITY = fallbackCreateImmutability();

  function fallbackEnsureQueue(scope, key) {
    if (!scope || typeof scope !== 'object') {
      return null;
    }

    var queueKey = typeof key === 'string' && key ? key : DEFAULT_PENDING_QUEUE_KEY;

    var queue = scope[queueKey];
    if (Array.isArray(queue)) {
      return queue;
    }

    if (fallbackDefineHiddenProperty(scope, queueKey, [])) {
      queue = scope[queueKey];
      if (Array.isArray(queue)) {
        return queue;
      }
    }

    try {
      scope[queueKey] = [];
      queue = scope[queueKey];
      if (Array.isArray(queue)) {
        return queue;
      }
    } catch (error) {
      void error;
    }

    return null;
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

  function resolveArchitectureCore(scope) {
    if (typeof require === 'function') {
      try {
        var required = require('./architecture-core.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    var candidates = [];
    var primary = scope || fallbackDetectGlobalScope();
    if (primary && typeof primary === 'object') {
      candidates.push(primary);
    }
    if (typeof globalThis !== 'undefined' && candidates.indexOf(globalThis) === -1) candidates.push(globalThis);
    if (typeof window !== 'undefined' && candidates.indexOf(window) === -1) candidates.push(window);
    if (typeof self !== 'undefined' && candidates.indexOf(self) === -1) candidates.push(self);
    if (typeof global !== 'undefined' && candidates.indexOf(global) === -1) candidates.push(global);

    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && typeof candidate.cineModuleArchitectureCore === 'object') {
        return candidate.cineModuleArchitectureCore;
      }
    }

    return null;
  }

  function createFallbackCore(options) {
    var settings = options || {};

    var customPrimaryScope = settings && (settings.primaryScope || settings.scope) && (typeof settings.primaryScope === 'object' || typeof settings.primaryScope === 'function'
      ? settings.primaryScope
      : typeof settings.scope === 'object' || typeof settings.scope === 'function'
        ? settings.scope
        : null);

    var detectOverride = typeof settings.detectGlobalScope === 'function' ? settings.detectGlobalScope : null;
    var resolveOverride = typeof settings.resolveFromScopes === 'function' ? settings.resolveFromScopes : null;
    var freezeOverride = typeof settings.freezeDeep === 'function' ? settings.freezeDeep : null;
    var warnOverride = typeof settings.safeWarn === 'function' ? settings.safeWarn : null;
    var tryRequireOverride = typeof settings.tryRequire === 'function' ? settings.tryRequire : null;

    var additionalScopes = [];
    if (Array.isArray(settings.additionalScopes)) {
      for (var index = 0; index < settings.additionalScopes.length; index += 1) {
        var value = settings.additionalScopes[index];
        if (value && (typeof value === 'object' || typeof value === 'function')) {
          additionalScopes.push(value);
        }
      }
    }

    var pendingQueueKey = typeof settings.pendingQueueKey === 'string' && settings.pendingQueueKey
      ? settings.pendingQueueKey
      : DEFAULT_PENDING_QUEUE_KEY;

    var cachedPrimaryScope = null;

    function detectGlobalScope() {
      try {
        if (detectOverride) {
          var detectedOverride = detectOverride();
          if (detectedOverride) {
            cachedPrimaryScope = detectedOverride;
            return detectedOverride;
          }
        }
      } catch (error) {
        void error;
      }

      if (cachedPrimaryScope) {
        return cachedPrimaryScope;
      }

      var detected = customPrimaryScope || fallbackDetectGlobalScope();
      cachedPrimaryScope = detected;
      return detected;
    }

    function getPrimaryScope() {
      return detectGlobalScope();
    }

    function collectCandidateScopes(primary) {
      var scopes = [];

      function pushScope(scope) {
        if (!scope || typeof scope !== 'object' && typeof scope !== 'function') {
          return;
        }
        if (scopes.indexOf(scope) === -1) {
          scopes.push(scope);
        }
      }

      pushScope(primary || customPrimaryScope);
      pushScope(getPrimaryScope());
      if (typeof globalThis !== 'undefined') pushScope(globalThis);
      if (typeof window !== 'undefined') pushScope(window);
      if (typeof self !== 'undefined') pushScope(self);
      if (typeof global !== 'undefined') pushScope(global);

      for (var index = 0; index < additionalScopes.length; index += 1) {
        pushScope(additionalScopes[index]);
      }

      return scopes;
    }

    var tryRequire = tryRequireOverride
      ? function tryRequireWithOverride(modulePath) {
          try {
            return tryRequireOverride(modulePath);
          } catch (error) {
            void error;
          }
          return fallbackTryRequire(modulePath);
        }
      : fallbackTryRequire;

    var activeImmutability = null;

    function resolveImmutability(scope) {
      try {
        var required = tryRequire('./immutability.js');
        if (required && typeof required === 'object') {
          activeImmutability = required;
          return required;
        }
      } catch (error) {
        void error;
      }

      var scopes = collectCandidateScopes(scope);
      for (var index = 0; index < scopes.length; index += 1) {
        var candidate = scopes[index];
        if (candidate && typeof candidate.cineModuleImmutability === 'object') {
          activeImmutability = candidate.cineModuleImmutability;
          return activeImmutability;
        }
      }

      return null;
    }

    function getImmutability(scope) {
      if (activeImmutability && activeImmutability !== FALLBACK_IMMUTABILITY) {
        return activeImmutability;
      }

      var resolved = resolveImmutability(scope || getPrimaryScope());
      if (resolved && resolved !== activeImmutability) {
        activeImmutability = resolved;
        return resolved;
      }

      activeImmutability = FALLBACK_IMMUTABILITY;
      return activeImmutability;
    }

    function freezeDeep(value, seen) {
      if (freezeOverride) {
        try {
          return freezeOverride(value, seen);
        } catch (error) {
          void error;
        }
      }

      var provider = getImmutability();
      try {
        return provider.freezeDeep(value, seen);
      } catch (error) {
        void error;
      }

      return FALLBACK_IMMUTABILITY.freezeDeep(value, seen);
    }

    function ensureQueue(scope, key) {
      var queueKey = typeof key === 'string' && key ? key : pendingQueueKey;
      return fallbackEnsureQueue(scope || getPrimaryScope(), queueKey);
    }

    function resolveFromScopes(propertyName, resolveOptions) {
      if (resolveOverride) {
        try {
          return resolveOverride(propertyName, resolveOptions);
        } catch (error) {
          void error;
        }
      }

      var optionsToUse = cloneOptions(resolveOptions);
      if (!optionsToUse.scopes) {
        optionsToUse.scopes = collectCandidateScopes(optionsToUse.primaryScope);
      }
      return fallbackResolveFromScopes(propertyName, optionsToUse);
    }

    function safeWarn(message, detail) {
      if (warnOverride) {
        try {
          warnOverride(message, detail);
          return;
        } catch (error) {
          void error;
        }
      }
      fallbackSafeWarn(message, detail);
    }

    return Object.freeze({
      detectGlobalScope: detectGlobalScope,
      getPrimaryScope: getPrimaryScope,
      collectCandidateScopes: collectCandidateScopes,
      tryRequire: tryRequire,
      resolveFromScopes: resolveFromScopes,
      defineHiddenProperty: fallbackDefineHiddenProperty,
      ensureQueue: ensureQueue,
      freezeDeep: freezeDeep,
      safeWarn: safeWarn,
    });
  }

  var ARCHITECTURE_CORE = resolveArchitectureCore(fallbackDetectGlobalScope());
  var CORE_FACTORY = ARCHITECTURE_CORE && typeof ARCHITECTURE_CORE.createCore === 'function' ? ARCHITECTURE_CORE.createCore : createFallbackCore;
  var CORE_INSTANCE = CORE_FACTORY({});

  var detectGlobalScope = CORE_INSTANCE && typeof CORE_INSTANCE.detectGlobalScope === 'function' ? CORE_INSTANCE.detectGlobalScope : function detectGlobalScopeFallback() {
    return fallbackDetectGlobalScope();
  };

  var collectCandidateScopes = CORE_INSTANCE && typeof CORE_INSTANCE.collectCandidateScopes === 'function' ? CORE_INSTANCE.collectCandidateScopes : fallbackCollectCandidateScopes;
  var tryRequire = CORE_INSTANCE && typeof CORE_INSTANCE.tryRequire === 'function' ? CORE_INSTANCE.tryRequire : fallbackTryRequire;
  var resolveFromScopes = CORE_INSTANCE && typeof CORE_INSTANCE.resolveFromScopes === 'function' ? CORE_INSTANCE.resolveFromScopes : fallbackResolveFromScopes;
  var defineHiddenProperty = CORE_INSTANCE && typeof CORE_INSTANCE.defineHiddenProperty === 'function' ? CORE_INSTANCE.defineHiddenProperty : fallbackDefineHiddenProperty;
  var ensureQueue = CORE_INSTANCE && typeof CORE_INSTANCE.ensureQueue === 'function' ? CORE_INSTANCE.ensureQueue : fallbackEnsureQueue;
  var freezeDeep = CORE_INSTANCE && typeof CORE_INSTANCE.freezeDeep === 'function' ? CORE_INSTANCE.freezeDeep : function freezeDeepFallback(value, seen) {
    return createFallbackCore({}).freezeDeep(value, seen);
  };
  var safeWarn = CORE_INSTANCE && typeof CORE_INSTANCE.safeWarn === 'function' ? CORE_INSTANCE.safeWarn : fallbackSafeWarn;

  var architecture = Object.freeze({
    detectGlobalScope: detectGlobalScope,
    collectCandidateScopes: collectCandidateScopes,
    tryRequire: tryRequire,
    resolveFromScopes: resolveFromScopes,
    defineHiddenProperty: defineHiddenProperty,
    ensureQueue: ensureQueue,
    freezeDeep: freezeDeep,
    safeWarn: safeWarn,
  });

  function createModuleArchitecture(options) {
    var settings = options || {};

    var customPrimaryScope = settings && (settings.primaryScope || settings.scope) && (typeof settings.primaryScope === 'object' || typeof settings.primaryScope === 'function'
      ? settings.primaryScope
      : typeof settings.scope === 'object' || typeof settings.scope === 'function'
        ? settings.scope
        : null);

    var detectOverride = typeof settings.detectGlobalScope === 'function' ? settings.detectGlobalScope : function detectOverride() {
      return customPrimaryScope || detectGlobalScope();
    };

    var additionalScopes = [];
    if (Array.isArray(settings.additionalScopes)) {
      for (var index = 0; index < settings.additionalScopes.length; index += 1) {
        var value = settings.additionalScopes[index];
        if (value && (typeof value === 'object' || typeof value === 'function')) {
          additionalScopes.push(value);
        }
      }
    }

    var tryRequireOverride = typeof settings.tryRequire === 'function' ? settings.tryRequire : tryRequire;
    var resolveOverride = typeof settings.resolveFromScopes === 'function' ? settings.resolveFromScopes : null;
    var ensureQueueDefaultKey = typeof settings.pendingQueueKey === 'string' && settings.pendingQueueKey ? settings.pendingQueueKey : DEFAULT_PENDING_QUEUE_KEY;
    var freezeOverride = typeof settings.freezeDeep === 'function' ? settings.freezeDeep : freezeDeep;
    var warnOverride = typeof settings.safeWarn === 'function' ? settings.safeWarn : safeWarn;

    var derived = CORE_FACTORY({
      primaryScope: customPrimaryScope,
      detectGlobalScope: detectOverride,
      additionalScopes: additionalScopes,
      tryRequire: tryRequireOverride,
      resolveFromScopes: resolveOverride,
      pendingQueueKey: ensureQueueDefaultKey,
      freezeDeep: freezeOverride,
      safeWarn: warnOverride,
    });

    var derivedDefineHiddenProperty = derived && typeof derived.defineHiddenProperty === 'function' ? derived.defineHiddenProperty : fallbackDefineHiddenProperty;
    var derivedEnsureQueue = derived && typeof derived.ensureQueue === 'function' ? derived.ensureQueue : function ensureQueueWithDefault(scope, key) {
      var queueKey = typeof key === 'string' && key ? key : ensureQueueDefaultKey;
      return fallbackEnsureQueue(scope, queueKey);
    };
    var derivedFreezeDeep = derived && typeof derived.freezeDeep === 'function' ? derived.freezeDeep : function freezeDeepWithDefault(value, seen) {
      return freezeOverride(value, seen);
    };
    var derivedSafeWarn = derived && typeof derived.safeWarn === 'function' ? derived.safeWarn : warnOverride;

    return Object.freeze({
      detectGlobalScope: derived && typeof derived.detectGlobalScope === 'function' ? derived.detectGlobalScope : detectOverride,
      collectCandidateScopes: derived && typeof derived.collectCandidateScopes === 'function' ? derived.collectCandidateScopes : collectCandidateScopes,
      tryRequire: derived && typeof derived.tryRequire === 'function' ? derived.tryRequire : tryRequireOverride,
      resolveFromScopes: derived && typeof derived.resolveFromScopes === 'function' ? derived.resolveFromScopes : resolveOverride || resolveFromScopes,
      defineHiddenProperty: derivedDefineHiddenProperty,
      ensureQueue: derivedEnsureQueue,
      freezeDeep: derivedFreezeDeep,
      safeWarn: derivedSafeWarn,
    });
  }

  var globalScope = detectGlobalScope();
  var architectureWithFactory = Object.freeze({
    detectGlobalScope: architecture.detectGlobalScope,
    collectCandidateScopes: architecture.collectCandidateScopes,
    tryRequire: architecture.tryRequire,
    resolveFromScopes: architecture.resolveFromScopes,
    defineHiddenProperty: architecture.defineHiddenProperty,
    ensureQueue: architecture.ensureQueue,
    freezeDeep: architecture.freezeDeep,
    safeWarn: architecture.safeWarn,
    createModuleArchitecture: createModuleArchitecture,
  });

  if (!globalScope.cineModuleArchitecture) {
    defineHiddenProperty(globalScope, 'cineModuleArchitecture', architectureWithFactory);
  }

  if (!globalScope.cineModuleArchitectureFactory) {
    defineHiddenProperty(globalScope, 'cineModuleArchitectureFactory', Object.freeze({
      createModuleArchitecture: createModuleArchitecture,
    }));
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = architectureWithFactory;
  }
})();

