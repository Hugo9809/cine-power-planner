(function () {
  var DEFAULT_PENDING_QUEUE_KEY = '__cinePendingModuleRegistrations__';

  function baseDetectGlobalScope() {
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

  function createUniqueList() {
    var values = [];
    return {
      push: function push(candidate) {
        if (values.indexOf(candidate) === -1) {
          values.push(candidate);
        }
      },
      toArray: function toArray() {
        return values.slice();
      },
    };
  }

  function collectCandidateScopesImpl(primary, detect, extras) {
    var list = createUniqueList();

    function pushScope(scope) {
      if (!scope || typeof scope !== 'object' && typeof scope !== 'function') {
        return;
      }
      list.push(scope);
    }

    if (primary) {
      pushScope(primary);
    }

    var detected = detect();
    pushScope(detected);

    if (typeof globalThis !== 'undefined') pushScope(globalThis);
    if (typeof window !== 'undefined') pushScope(window);
    if (typeof self !== 'undefined') pushScope(self);
    if (typeof global !== 'undefined') pushScope(global);

    if (Array.isArray(extras)) {
      for (var index = 0; index < extras.length; index += 1) {
        pushScope(extras[index]);
      }
    }

    return list.toArray();
  }

  function tryRequireImpl(modulePath) {
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

  function defineHiddenPropertyImpl(target, key, value) {
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

  function ensureQueueImpl(scope, key, defineHiddenProperty) {
    if (!scope || typeof scope !== 'object') {
      return null;
    }

    var queueKey = typeof key === 'string' && key ? key : DEFAULT_PENDING_QUEUE_KEY;

    var queue = scope[queueKey];
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
      if (Array.isArray(queue)) {
        return queue;
      }
    } catch (error) {
      void error;
    }

    return null;
  }

  function safeWarnImpl(message, detail) {
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

  function resolveFromScopesImpl(propertyName, options) {
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

  function resolveImmutabilityImpl(scope, tryRequire, collectCandidateScopes) {
    var targetScope = scope || baseDetectGlobalScope();

    try {
      var required = tryRequire('./immutability.js');
      if (required && typeof required === 'object') {
        return required;
      }
    } catch (error) {
      void error;
    }

    var scopes = collectCandidateScopes(targetScope);
    for (var index = 0; index < scopes.length; index += 1) {
      var candidate = scopes[index];
      if (candidate && typeof candidate.cineModuleImmutability === 'object') {
        return candidate.cineModuleImmutability;
      }
    }

    return null;
  }

  function resolveBuiltinImmutabilityImpl(options) {
    var tryRequire = options && typeof options.tryRequire === 'function' ? options.tryRequire : tryRequireImpl;
    var collectCandidateScopes = options && typeof options.collectCandidateScopes === 'function'
      ? options.collectCandidateScopes
      : function collect() {
          return collectCandidateScopesImpl(null, baseDetectGlobalScope, []);
        };

    try {
      var required = tryRequire('./helpers/immutability-builtins.js');
      if (required && typeof required === 'object') {
        return required;
      }
    } catch (error) {
      void error;
    }

    var registryKey = '__cineBuiltinImmutabilityGuards__';
    var scopes = collectCandidateScopes();

    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope || typeof scope !== 'object' && typeof scope !== 'function') {
        continue;
      }

      try {
        var candidate = scope[registryKey];
        if (candidate && typeof candidate === 'object') {
          return candidate;
        }
      } catch (error) {
        void error;
      }
    }

    return null;
  }

  function createFallbackImmutability(builtin) {
    function shouldBypass(value) {
      if (!value || typeof value !== 'object' && typeof value !== 'function') {
        return false;
      }

      try {
        if (builtin && typeof builtin.isImmutableBuiltin === 'function' && builtin.isImmutableBuiltin(value)) {
          return true;
        }

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

  function cloneOptions(source) {
    var target = {};
    if (!source || typeof source !== 'object') {
      return target;
    }
    var keys = Object.keys(source);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      target[key] = source[key];
    }
    return target;
  }

  function createCore(options) {
    var settings = options || {};

    var customPrimaryScope = settings && (settings.primaryScope || settings.scope) && (typeof settings.primaryScope === 'object' || typeof settings.primaryScope === 'function'
      ? settings.primaryScope
      : typeof settings.scope === 'object' || typeof settings.scope === 'function'
        ? settings.scope
        : null);

    var detectOverride = typeof settings.detectGlobalScope === 'function' ? settings.detectGlobalScope : null;
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

      var detected = customPrimaryScope || baseDetectGlobalScope();
      cachedPrimaryScope = detected;
      return detected;
    }

    function getPrimaryScope() {
      return detectGlobalScope();
    }

    var additionalScopes = [];
    if (Array.isArray(settings.additionalScopes)) {
      for (var index = 0; index < settings.additionalScopes.length; index += 1) {
        var value = settings.additionalScopes[index];
        if (value && (typeof value === 'object' || typeof value === 'function')) {
          additionalScopes.push(value);
        }
      }
    }

    var tryRequire = typeof settings.tryRequire === 'function'
      ? function tryRequireWithOverride(modulePath) {
          try {
            return settings.tryRequire(modulePath);
          } catch (error) {
            void error;
          }
          return tryRequireImpl(modulePath);
        }
      : tryRequireImpl;

    var pendingQueueKey = typeof settings.pendingQueueKey === 'string' && settings.pendingQueueKey
      ? settings.pendingQueueKey
      : DEFAULT_PENDING_QUEUE_KEY;

    var resolveOverride = typeof settings.resolveFromScopes === 'function' ? settings.resolveFromScopes : null;
    var freezeOverride = typeof settings.freezeDeep === 'function' ? settings.freezeDeep : null;
    var warnOverride = typeof settings.safeWarn === 'function' ? settings.safeWarn : null;

    function collectCandidateScopes(primary) {
      return collectCandidateScopesImpl(primary || customPrimaryScope, detectGlobalScope, additionalScopes);
    }

    var builtinImmutability = resolveBuiltinImmutabilityImpl({
      tryRequire: tryRequire,
      collectCandidateScopes: collectCandidateScopes,
    });

    var fallbackImmutability = createFallbackImmutability(builtinImmutability);
    var activeImmutability = null;

    function resolveImmutability(scope) {
      try {
        var resolved = resolveImmutabilityImpl(scope, tryRequire, collectCandidateScopes);
        if (resolved) {
          activeImmutability = resolved;
          return resolved;
        }
      } catch (error) {
        void error;
      }
      return null;
    }

    function getImmutability(scope) {
      if (activeImmutability && activeImmutability !== fallbackImmutability) {
        return activeImmutability;
      }

      var resolved = resolveImmutability(scope || getPrimaryScope());
      if (resolved && resolved !== activeImmutability) {
        activeImmutability = resolved;
        return resolved;
      }

      activeImmutability = fallbackImmutability;
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

      return fallbackImmutability.freezeDeep(value, seen);
    }

    function ensureQueue(scope, key) {
      var queueKey = typeof key === 'string' && key ? key : pendingQueueKey;
      return ensureQueueImpl(scope || getPrimaryScope(), queueKey, defineHiddenProperty);
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
      return resolveFromScopesImpl(propertyName, optionsToUse);
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
      safeWarnImpl(message, detail);
    }

    function defineHiddenProperty(target, key, value) {
      return defineHiddenPropertyImpl(target, key, value);
    }

    return Object.freeze({
      detectGlobalScope: detectGlobalScope,
      getPrimaryScope: getPrimaryScope,
      collectCandidateScopes: collectCandidateScopes,
      tryRequire: tryRequire,
      resolveFromScopes: resolveFromScopes,
      defineHiddenProperty: defineHiddenProperty,
      ensureQueue: ensureQueue,
      freezeDeep: freezeDeep,
      safeWarn: safeWarn,
      resolveImmutability: resolveImmutability,
      getImmutability: getImmutability,
      pendingQueueKey: pendingQueueKey,
      fallbackImmutability: fallbackImmutability,
    });
  }

  var defaultCore = createCore();

  var architectureCore = Object.freeze({
    DEFAULT_PENDING_QUEUE_KEY: DEFAULT_PENDING_QUEUE_KEY,
    createCore: createCore,
    detectGlobalScope: defaultCore.detectGlobalScope,
    getPrimaryScope: defaultCore.getPrimaryScope,
    collectCandidateScopes: defaultCore.collectCandidateScopes,
    tryRequire: defaultCore.tryRequire,
    resolveFromScopes: defaultCore.resolveFromScopes,
    defineHiddenProperty: defaultCore.defineHiddenProperty,
    ensureQueue: defaultCore.ensureQueue,
    freezeDeep: defaultCore.freezeDeep,
    safeWarn: defaultCore.safeWarn,
    resolveImmutability: defaultCore.resolveImmutability,
    getImmutability: defaultCore.getImmutability,
  });

  var globalScope = defaultCore.detectGlobalScope();

  if (globalScope && typeof globalScope === 'object' && !globalScope.cineModuleArchitectureCore) {
    defaultCore.defineHiddenProperty(globalScope, 'cineModuleArchitectureCore', architectureCore);
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = architectureCore;
  }
})();

