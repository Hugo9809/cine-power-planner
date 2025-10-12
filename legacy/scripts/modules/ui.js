function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
  function fallbackLoadModuleEnvironment(scope) {
    if (typeof require === 'function') {
      try {
        return require('./environment.js');
      } catch (error) {
        void error;
      }
    }
    var candidates = fallbackCollectCandidateScopes(scope);
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && _typeof(candidate.cineModuleEnvironment) === 'object') {
        return candidate.cineModuleEnvironment;
      }
    }
    return null;
  }
  function fallbackLoadEnvironmentBridge(scope) {
    if (typeof require === 'function') {
      try {
        return require('./environment-bridge.js');
      } catch (error) {
        void error;
      }
    }
    var candidates = fallbackCollectCandidateScopes(scope);
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && _typeof(candidate.cineEnvironmentBridge) === 'object') {
        return candidate.cineEnvironmentBridge;
      }
    }
    return null;
  }
  function fallbackResolveModuleGlobals(scope) {
    if (typeof require === 'function') {
      try {
        var required = require('./globals.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    var candidates = fallbackCollectCandidateScopes(scope);
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && _typeof(candidate.cineModuleGlobals) === 'object') {
        return candidate.cineModuleGlobals;
      }
    }
    return null;
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
  var LOCAL_SCOPE = fallbackDetectGlobalScope();
  function resolveEnvironmentContext(scope) {
    var targetScope = scope || LOCAL_SCOPE;
    if (typeof require === 'function') {
      try {
        var required = require('./environment-context.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    if (targetScope && _typeof(targetScope.cineModuleEnvironmentContext) === 'object') {
      return targetScope.cineModuleEnvironmentContext;
    }
    return null;
  }
  var ENVIRONMENT_CONTEXT = resolveEnvironmentContext(LOCAL_SCOPE);
  var detectGlobalScope = ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.detectGlobalScope === 'function' ? function detectWithContext() {
    try {
      return ENVIRONMENT_CONTEXT.detectGlobalScope();
    } catch (error) {
      void error;
    }
    return fallbackDetectGlobalScope();
  } : fallbackDetectGlobalScope;
  var PRIMARY_SCOPE = ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.getPrimaryScope === 'function' ? ENVIRONMENT_CONTEXT.getPrimaryScope() : detectGlobalScope();
  var GLOBAL_SCOPE = (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.getGlobalScope === 'function' ? ENVIRONMENT_CONTEXT.getGlobalScope(PRIMARY_SCOPE) : null) || PRIMARY_SCOPE;
  var MODULE_ENV = (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveModuleEnvironment === 'function' ? ENVIRONMENT_CONTEXT.resolveModuleEnvironment(GLOBAL_SCOPE) : null) || fallbackLoadModuleEnvironment(GLOBAL_SCOPE);
  var ENV_BRIDGE = (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveEnvironmentBridge === 'function' ? ENVIRONMENT_CONTEXT.resolveEnvironmentBridge(GLOBAL_SCOPE) : null) || fallbackLoadEnvironmentBridge(GLOBAL_SCOPE);
  var MODULE_GLOBALS = (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveModuleGlobals === 'function' ? ENVIRONMENT_CONTEXT.resolveModuleGlobals(GLOBAL_SCOPE) : null) || fallbackResolveModuleGlobals(GLOBAL_SCOPE);
  function informModuleGlobals(name, api) {
    if (!MODULE_GLOBALS || typeof MODULE_GLOBALS.recordModule !== 'function') {
      return;
    }
    try {
      MODULE_GLOBALS.recordModule(name, api);
    } catch (error) {
      void error;
    }
  }
  var tryRequire = function resolveTryRequire() {
    if (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.tryRequire === 'function') {
      return function tryRequireThroughContext(modulePath) {
        var result = ENVIRONMENT_CONTEXT.tryRequire(modulePath);
        return typeof result === 'undefined' ? fallbackTryRequire(modulePath) : result;
      };
    }
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.tryRequire === 'function') {
      return MODULE_GLOBALS.tryRequire;
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.tryRequire === 'function') {
      return function bridgeTryRequire(modulePath) {
        var result = ENV_BRIDGE.tryRequire(modulePath);
        return typeof result === 'undefined' ? fallbackTryRequire(modulePath) : result;
      };
    }
    if (MODULE_ENV && typeof MODULE_ENV.tryRequire === 'function') {
      return MODULE_ENV.tryRequire;
    }
    return fallbackTryRequire;
  }();
  function fallbackResolveModuleRegistry(scope) {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.resolveModuleRegistry === 'function') {
      try {
        var resolved = MODULE_GLOBALS.resolveModuleRegistry(scope || GLOBAL_SCOPE);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.getModuleRegistry === 'function') {
      try {
        var bridged = ENV_BRIDGE.getModuleRegistry(scope || GLOBAL_SCOPE);
        if (bridged) {
          return bridged;
        }
      } catch (error) {
        void error;
      }
    }
    if (MODULE_ENV && typeof MODULE_ENV.resolveModuleRegistry === 'function') {
      try {
        return MODULE_ENV.resolveModuleRegistry(scope || GLOBAL_SCOPE);
      } catch (error) {
        void error;
      }
    }
    var required = tryRequire('./registry.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var scopes = fallbackCollectCandidateScopes(scope || GLOBAL_SCOPE);
    for (var index = 0; index < scopes.length; index += 1) {
      var candidate = scopes[index];
      if (candidate && _typeof(candidate.cineModules) === 'object') {
        return candidate.cineModules;
      }
    }
    return null;
  }
  function resolveModuleRegistry(scope) {
    if (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveModuleRegistry === 'function') {
      try {
        var resolved = ENVIRONMENT_CONTEXT.resolveModuleRegistry(scope || GLOBAL_SCOPE);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }
    return fallbackResolveModuleRegistry(scope);
  }
  var MODULE_REGISTRY = function () {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.getModuleRegistry === 'function') {
      try {
        var shared = MODULE_GLOBALS.getModuleRegistry(GLOBAL_SCOPE);
        if (shared) {
          return shared;
        }
      } catch (error) {
        void error;
      }
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.getModuleRegistry === 'function') {
      try {
        var bridged = ENV_BRIDGE.getModuleRegistry(GLOBAL_SCOPE);
        if (bridged) {
          return bridged;
        }
      } catch (error) {
        void error;
      }
    }
    if (MODULE_ENV && typeof MODULE_ENV.getModuleRegistry === 'function') {
      try {
        var provided = MODULE_ENV.getModuleRegistry(GLOBAL_SCOPE);
        if (provided) {
          return provided;
        }
      } catch (error) {
        void error;
      }
    }
    return resolveModuleRegistry();
  }();
  var PENDING_QUEUE_KEY = function resolvePendingKey() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.getPendingQueueKey === 'function') {
      try {
        var sharedKey = MODULE_GLOBALS.getPendingQueueKey();
        if (typeof sharedKey === 'string' && sharedKey) {
          return sharedKey;
        }
      } catch (error) {
        void error;
      }
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.getPendingQueueKey === 'function') {
      try {
        var bridgedKey = ENV_BRIDGE.getPendingQueueKey();
        if (typeof bridgedKey === 'string' && bridgedKey) {
          return bridgedKey;
        }
      } catch (error) {
        void error;
      }
    }
    if (MODULE_ENV && typeof MODULE_ENV.PENDING_QUEUE_KEY === 'string') {
      return MODULE_ENV.PENDING_QUEUE_KEY;
    }
    return '__cinePendingModuleRegistrations__';
  }();
  function cloneOptions(options) {
    if (!options || _typeof(options) !== 'object') {
      return {};
    }
    var copy = {};
    var keys = Object.keys(options);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      copy[key] = options[key];
    }
    return copy;
  }
  function fallbackQueueModuleRegistration(name, api, options) {
    if (!GLOBAL_SCOPE || _typeof(GLOBAL_SCOPE) !== 'object') {
      return false;
    }
    var payload = Object.freeze({
      name: name,
      api: api,
      options: Object.freeze(cloneOptions(options))
    });
    var queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
    if (!Array.isArray(queue)) {
      try {
        Object.defineProperty(GLOBAL_SCOPE, PENDING_QUEUE_KEY, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: []
        });
        queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
      } catch (error) {
        void error;
        try {
          if (!Array.isArray(GLOBAL_SCOPE[PENDING_QUEUE_KEY])) {
            GLOBAL_SCOPE[PENDING_QUEUE_KEY] = [];
          }
          queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
        } catch (assignmentError) {
          void assignmentError;
          return false;
        }
      }
    }
    try {
      queue.push(payload);
    } catch (error) {
      void error;
      queue[queue.length] = payload;
    }
    return true;
  }
  function queueModuleRegistration(name, api, options) {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.queueModuleRegistration === 'function') {
      try {
        if (MODULE_GLOBALS.queueModuleRegistration(name, api, options, GLOBAL_SCOPE)) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.queueModuleRegistration === 'function') {
      try {
        var bridged = ENV_BRIDGE.queueModuleRegistration(name, api, options);
        if (bridged) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }
    if (MODULE_ENV && typeof MODULE_ENV.queueModuleRegistration === 'function') {
      return MODULE_ENV.queueModuleRegistration(name, api, options, GLOBAL_SCOPE);
    }
    return fallbackQueueModuleRegistration(name, api, options);
  }
  function fallbackRegisterOrQueue(name, api, options, onError) {
    if (MODULE_REGISTRY && typeof MODULE_REGISTRY.register === 'function') {
      try {
        MODULE_REGISTRY.register(name, api, options);
        return true;
      } catch (error) {
        if (typeof onError === 'function') {
          try {
            onError(error);
          } catch (callbackError) {
            void callbackError;
          }
        } else {
          void error;
        }
      }
    }
    queueModuleRegistration(name, api, options);
    return false;
  }
  var registerOrQueueModule = function resolveRegisterOrQueue() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.registerOrQueueModule === 'function') {
      return function registerOrQueueModule(name, api, options, onError) {
        try {
          var registered = MODULE_GLOBALS.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, MODULE_REGISTRY);
          if (registered) {
            return true;
          }
        } catch (error) {
          void error;
        }
        return fallbackRegisterOrQueue(name, api, options, onError);
      };
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.registerOrQueueModule === 'function') {
      return function registerOrQueueModule(name, api, options, onError) {
        try {
          var bridged = ENV_BRIDGE.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, MODULE_REGISTRY);
          if (bridged) {
            return true;
          }
        } catch (error) {
          void error;
        }
        return fallbackRegisterOrQueue(name, api, options, onError);
      };
    }
    if (MODULE_ENV && typeof MODULE_ENV.registerOrQueueModule === 'function') {
      return function registerOrQueueModule(name, api, options, onError) {
        return MODULE_ENV.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, MODULE_REGISTRY);
      };
    }
    return fallbackRegisterOrQueue;
  }();
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
    if (_typeof(value) === 'object') {
      try {
        if (value.constructor && value.constructor.name === 'process') {
          return true;
        }
      } catch (processInspectionError) {
        void processInspectionError;
      }
      if (typeof value.pid === 'number' && typeof value.nextTick === 'function' && typeof value.emit === 'function' && typeof value.binding === 'function') {
        return true;
      }
    }
    if (typeof value === 'function') {
      if (value === process.binding || value === process._linkedBinding || value === process.dlopen) {
        return true;
      }
      try {
        var functionName = value.name || '';
        if (functionName && (functionName === 'binding' || functionName === 'dlopen')) {
          var source = Function.prototype.toString.call(value);
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
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
      return false;
    }
    if (isNodeProcessReference(value)) {
      return true;
    }
    if (typeof process !== 'undefined' && process && process.release && process.release.name === 'node') {
      return true;
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
  function fallbackResolveSeenTracker(seen) {
    if (seen && typeof seen.has === 'function' && typeof seen.add === 'function') {
      return seen;
    }
    if (Array.isArray(seen)) {
      return {
        has: function has(value) {
          return seen.indexOf(value) !== -1;
        },
        add: function add(value) {
          if (seen.indexOf(value) === -1) {
            seen.push(value);
          }
        }
      };
    }
    if (typeof WeakSet === 'function') {
      try {
        return new WeakSet();
      } catch (trackerError) {
        void trackerError;
      }
    }
    var tracked = [];
    return {
      has: function has(value) {
        return tracked.indexOf(value) !== -1;
      },
      add: function add(value) {
        if (tracked.indexOf(value) === -1) {
          tracked.push(value);
        }
      }
    };
  }
  function fallbackFreezeDeep(value, seen) {
    if (!value || _typeof(value) !== 'object') {
      return value;
    }
    if (shouldBypassDeepFreeze(value)) {
      return value;
    }
    var tracker = fallbackResolveSeenTracker(seen);
    if (tracker.has(value)) {
      return value;
    }
    tracker.add(value);
    var keys = Object.getOwnPropertyNames(value);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      var child = void 0;
      try {
        child = value[key];
      } catch (accessError) {
        void accessError;
        child = undefined;
      }
      if (!child || _typeof(child) !== 'object' && typeof child !== 'function') {
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
  var freezeDeep = function resolveFreezeDeep() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.freezeDeep === 'function') {
      return MODULE_GLOBALS.freezeDeep;
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.freezeDeep === 'function') {
      return function bridgeFreezeDeep(value, seen) {
        try {
          return ENV_BRIDGE.freezeDeep(value, seen);
        } catch (error) {
          void error;
          return fallbackFreezeDeep(value, seen);
        }
      };
    }
    if (MODULE_ENV && typeof MODULE_ENV.freezeDeep === 'function') {
      return MODULE_ENV.freezeDeep;
    }
    return fallbackFreezeDeep;
  }();
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
  var safeWarn = function resolveSafeWarn() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.safeWarn === 'function') {
      return MODULE_GLOBALS.safeWarn;
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.safeWarn === 'function') {
      return function bridgeSafeWarn(message, detail) {
        try {
          ENV_BRIDGE.safeWarn(message, detail);
        } catch (error) {
          void error;
          fallbackSafeWarn(message, detail);
        }
      };
    }
    if (MODULE_ENV && typeof MODULE_ENV.safeWarn === 'function') {
      return MODULE_ENV.safeWarn;
    }
    return fallbackSafeWarn;
  }();
  function fallbackExposeGlobal(name, value) {
    if (!GLOBAL_SCOPE || _typeof(GLOBAL_SCOPE) !== 'object') {
      return false;
    }
    try {
      Object.defineProperty(GLOBAL_SCOPE, name, {
        configurable: true,
        enumerable: false,
        value: value,
        writable: false
      });
      return true;
    } catch (error) {
      void error;
      try {
        GLOBAL_SCOPE[name] = value;
        return true;
      } catch (assignmentError) {
        void assignmentError;
        return false;
      }
    }
  }
  var exposeGlobal = function resolveExposeGlobal() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.exposeGlobal === 'function') {
      return function moduleGlobalsExpose(name, value, options) {
        try {
          return MODULE_GLOBALS.exposeGlobal(name, value, options);
        } catch (error) {
          void error;
          return fallbackExposeGlobal(name, value);
        }
      };
    }
    if (ENV_BRIDGE && typeof ENV_BRIDGE.exposeGlobal === 'function') {
      return function bridgeExposeGlobal(name, value, options) {
        try {
          return ENV_BRIDGE.exposeGlobal(name, value, options);
        } catch (error) {
          void error;
          return fallbackExposeGlobal(name, value);
        }
      };
    }
    if (MODULE_ENV && typeof MODULE_ENV.exposeGlobal === 'function') {
      return function exposeGlobal(name, value, options) {
        return MODULE_ENV.exposeGlobal(name, value, GLOBAL_SCOPE, options);
      };
    }
    return fallbackExposeGlobal;
  }();
  var controllerRegistry = new Map();
  var interactionRegistry = new Map();
  var orchestrationRegistry = new Map();
  var WARNED_NAMES = new Set();
  function normalizeName(name) {
    if (typeof name === 'string' && name.trim()) {
      return name.trim();
    }
    throw new TypeError('cineUi registry names must be non-empty strings.');
  }
  function cloneFunction(fn) {
    if (typeof fn !== 'function') {
      return null;
    }
    return function uiWrapper() {
      return fn.apply(this, arguments);
    };
  }
  function sanitizeDescriptor(name, descriptor) {
    if (!descriptor || _typeof(descriptor) !== 'object') {
      throw new TypeError("cineUi controller \"".concat(name, "\" requires a descriptor object."));
    }
    var actions = {};
    var contextValues = {};
    var propNames = Object.getOwnPropertyNames(descriptor);
    for (var index = 0; index < propNames.length; index += 1) {
      var prop = propNames[index];
      var value = descriptor[prop];
      if (typeof value === 'function') {
        actions[prop] = cloneFunction(value);
        continue;
      }
      if (prop === 'context' && value && _typeof(value) === 'object') {
        var _contextKeys = Object.getOwnPropertyNames(value);
        for (var contextIndex = 0; contextIndex < _contextKeys.length; contextIndex += 1) {
          var contextKey = _contextKeys[contextIndex];
          contextValues[contextKey] = value[contextKey];
        }
        continue;
      }
      contextValues[prop] = value;
    }
    var actionNames = Object.getOwnPropertyNames(actions);
    if (!actionNames.length) {
      throw new Error("cineUi controller \"".concat(name, "\" did not provide any callable actions."));
    }
    var contextObject = Object.create(null);
    var contextKeys = Object.getOwnPropertyNames(contextValues);
    for (var _contextIndex = 0; _contextIndex < contextKeys.length; _contextIndex += 1) {
      var key = contextKeys[_contextIndex];
      contextObject[key] = contextValues[key];
    }
    Object.freeze(contextObject);
    var controller = {};
    Object.defineProperty(controller, 'context', {
      configurable: false,
      enumerable: true,
      get: function get() {
        return contextObject;
      }
    });
    var _loop = function _loop() {
      var actionName = actionNames[_index];
      var action = actions[actionName];
      controller[actionName] = function controllerAction() {
        return action.apply(controller, arguments);
      };
    };
    for (var _index = 0; _index < actionNames.length; _index += 1) {
      _loop();
    }
    return freezeDeep(controller);
  }
  function sanitizeInteraction(name, handler) {
    var fn = cloneFunction(handler);
    if (!fn) {
      throw new TypeError("cineUi interaction \"".concat(name, "\" must be a function."));
    }
    return freezeDeep({
      handler: fn
    });
  }
  function sanitizeInitializer(name, initializer) {
    var fn = cloneFunction(initializer);
    if (!fn) {
      throw new TypeError("cineUi initializer \"".concat(name, "\" must be a function."));
    }
    return freezeDeep({
      initializer: fn
    });
  }
  function warnDuplicate(name, type) {
    var key = "".concat(type, ":").concat(name);
    if (WARNED_NAMES.has(key)) {
      return;
    }
    WARNED_NAMES.add(key);
    safeWarn("cineUi ".concat(type, " \"").concat(name, "\" was replaced. Using the latest registration."));
  }
  function listRegistryKeys(registry) {
    return Array.from(registry.keys()).sort();
  }
  var controllersAPI = freezeDeep({
    register: function register(name, descriptor) {
      var normalized = normalizeName(name);
      var sanitized = sanitizeDescriptor(normalized, descriptor);
      if (controllerRegistry.has(normalized)) {
        warnDuplicate(normalized, 'controller');
      }
      controllerRegistry.set(normalized, sanitized);
      return sanitized;
    },
    get: function get(name) {
      var normalized = normalizeName(name);
      return controllerRegistry.get(normalized) || null;
    },
    invoke: function invoke(name, action) {
      var controller = this.get(name);
      if (!controller) {
        throw new Error("cineUi controller \"".concat(name, "\" is not registered."));
      }
      var operation = controller[action];
      if (typeof operation !== 'function') {
        throw new Error("cineUi controller \"".concat(name, "\" does not expose \"").concat(action, "\"."));
      }
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }
      return operation.apply(controller, args);
    },
    list: function list() {
      return listRegistryKeys(controllerRegistry);
    }
  });
  var interactionsAPI = freezeDeep({
    register: function register(name, handler) {
      var normalized = normalizeName(name);
      var sanitized = sanitizeInteraction(normalized, handler);
      if (interactionRegistry.has(normalized)) {
        warnDuplicate(normalized, 'interaction');
      }
      interactionRegistry.set(normalized, sanitized);
      return sanitized.handler;
    },
    get: function get(name) {
      var normalized = normalizeName(name);
      var entry = interactionRegistry.get(normalized);
      return entry ? entry.handler : null;
    },
    trigger: function trigger(name) {
      var handler = this.get(name);
      if (typeof handler !== 'function') {
        throw new Error("cineUi interaction \"".concat(name, "\" is not registered."));
      }
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      return handler.apply(null, args);
    },
    list: function list() {
      return listRegistryKeys(interactionRegistry);
    }
  });
  var orchestrationAPI = freezeDeep({
    register: function register(name, initializer) {
      var normalized = normalizeName(name);
      var sanitized = sanitizeInitializer(normalized, initializer);
      if (orchestrationRegistry.has(normalized)) {
        warnDuplicate(normalized, 'initializer');
      }
      orchestrationRegistry.set(normalized, sanitized);
      return sanitized.initializer;
    },
    get: function get(name) {
      var normalized = normalizeName(name);
      var entry = orchestrationRegistry.get(normalized);
      return entry ? entry.initializer : null;
    },
    run: function run(name) {
      var initializer = this.get(name);
      if (typeof initializer !== 'function') {
        throw new Error("cineUi initializer \"".concat(name, "\" is not registered."));
      }
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      return initializer.apply(null, args);
    },
    list: function list() {
      return listRegistryKeys(orchestrationRegistry);
    }
  });
  function resolveHelpModule(scope) {
    var modules = [];
    if (typeof tryRequire === 'function') {
      var required = tryRequire('./help.js');
      if (required && _typeof(required) === 'object') {
        modules.push(required);
      }
    }
    var scopes = fallbackCollectCandidateScopes(scope);
    for (var index = 0; index < scopes.length; index += 1) {
      var candidateScope = scopes[index];
      if (!candidateScope) {
        continue;
      }
      try {
        var moduleCandidate = candidateScope.cineHelpModule;
        if (moduleCandidate && modules.indexOf(moduleCandidate) === -1) {
          modules.push(moduleCandidate);
        }
      } catch (error) {
        void error;
      }
      try {
        var apiCandidate = candidateScope.cineHelp;
        if (apiCandidate) {
          var exists = false;
          for (var checkIndex = 0; checkIndex < modules.length; checkIndex += 1) {
            var existing = modules[checkIndex];
            if (existing === apiCandidate || existing && existing.help === apiCandidate) {
              exists = true;
              break;
            }
          }
          if (!exists) {
            modules.push({
              help: apiCandidate,
              __internal: null
            });
          }
        }
      } catch (error) {
        void error;
      }
    }
    for (var moduleIndex = 0; moduleIndex < modules.length; moduleIndex += 1) {
      var candidate = modules[moduleIndex];
      if (!candidate) {
        continue;
      }
      var api = candidate.help || candidate;
      if (!api) {
        continue;
      }
      if (typeof api.register === 'function' && typeof api.get === 'function' && typeof api.resolve === 'function' && typeof api.list === 'function') {
        if (!candidate.help && api) {
          return {
            help: api,
            __internal: candidate.__internal || null
          };
        }
        return candidate;
      }
    }
    for (var _index2 = 0; _index2 < scopes.length; _index2 += 1) {
      var _candidateScope = scopes[_index2];
      if (!_candidateScope) {
        continue;
      }
      try {
        var factory = _candidateScope.__cineCreateHelpModule;
        if (typeof factory === 'function') {
          var created = factory({
            freezeDeep: freezeDeep,
            safeWarn: safeWarn
          });
          if (created && _typeof(created) === 'object') {
            return created;
          }
        }
      } catch (error) {
        safeWarn('cineUi: Failed to create help module from factory.', error);
      }
    }
    return null;
  }
  var resolvedHelpModule = resolveHelpModule(GLOBAL_SCOPE);
  var fallbackHelpRegistry = new Map();
  var helpAPI = resolvedHelpModule && resolvedHelpModule.help ? resolvedHelpModule.help : freezeDeep({
    register: function register(name, value) {
      var normalized = typeof name === 'string' ? name.trim() : '';
      if (!normalized) {
        throw new TypeError('cineUi registry names must be non-empty strings.');
      }
      if (typeof value === 'function') {
        fallbackHelpRegistry.set(normalized, value);
        return value;
      }
      if (typeof value !== 'string') {
        throw new TypeError("cineUi help entry \"".concat(normalized, "\" must be a string or function."));
      }
      var text = value.trim();
      if (!text) {
        throw new Error("cineUi help entry \"".concat(normalized, "\" cannot be empty."));
      }
      var resolver = function helpStringResolver() {
        return text;
      };
      fallbackHelpRegistry.set(normalized, resolver);
      return resolver;
    },
    get: function get(name) {
      var normalized = typeof name === 'string' ? name.trim() : '';
      if (!normalized) {
        throw new TypeError('cineUi registry names must be non-empty strings.');
      }
      return fallbackHelpRegistry.get(normalized) || null;
    },
    resolve: function resolve(name) {
      var resolver = this.get(name);
      if (typeof resolver !== 'function') {
        throw new Error("cineUi help entry \"".concat(name, "\" is not registered."));
      }
      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }
      return resolver.apply(null, args);
    },
    list: function list() {
      return Array.from(fallbackHelpRegistry.keys()).sort();
    }
  });
  var helpModuleInternals = resolvedHelpModule && resolvedHelpModule.__internal ? resolvedHelpModule.__internal : freezeDeep({
    helpRegistry: fallbackHelpRegistry,
    clearRegistries: function clearRegistries() {
      fallbackHelpRegistry.clear();
    }
  });
  function clearRegistries() {
    controllerRegistry.clear();
    interactionRegistry.clear();
    orchestrationRegistry.clear();
    WARNED_NAMES.clear();
    if (helpModuleInternals && typeof helpModuleInternals.clearRegistries === 'function') {
      try {
        helpModuleInternals.clearRegistries();
      } catch (error) {
        safeWarn('cineUi: Unable to clear help registry.', error);
      }
    } else if (helpModuleInternals && helpModuleInternals.helpRegistry && typeof helpModuleInternals.helpRegistry.clear === 'function') {
      helpModuleInternals.helpRegistry.clear();
    }
  }
  var uiAPI = {
    controllers: controllersAPI,
    interactions: interactionsAPI,
    orchestration: orchestrationAPI,
    help: helpAPI,
    __internal: {
      controllerRegistry: controllerRegistry,
      interactionRegistry: interactionRegistry,
      orchestrationRegistry: orchestrationRegistry,
      helpRegistry: helpModuleInternals && helpModuleInternals.helpRegistry ? helpModuleInternals.helpRegistry : fallbackHelpRegistry,
      clearRegistries: clearRegistries
    }
  };
  freezeDeep(uiAPI);
  informModuleGlobals('cineUi', uiAPI);
  registerOrQueueModule('cineUi', uiAPI, {
    category: 'ui',
    description: 'UI controller registry for dialogs, interactions, orchestration, and help copy.',
    replace: true,
    connections: ['cineModuleGlobals', 'cineModuleEnvironment', 'cineHelp', 'cineModuleContext']
  }, function (error) {
    safeWarn('Unable to register cineUi module.', error);
  });
  if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
    var existingUi = null;
    try {
      existingUi = GLOBAL_SCOPE.cineUi || null;
    } catch (error) {
      void error;
      existingUi = null;
    }
    if (existingUi !== uiAPI) {
      var exposed = exposeGlobal('cineUi', uiAPI, {
        configurable: true,
        enumerable: false,
        writable: false
      });
      if (!exposed) {
        safeWarn('Unable to expose cineUi globally.');
      }
    }
  }
  function flushRegistrationQueue() {
    if (!GLOBAL_SCOPE || _typeof(GLOBAL_SCOPE) !== 'object') {
      return;
    }
    var queueKey = '__cineUiReadyQueue';
    var queueRef = Array.isArray(GLOBAL_SCOPE[queueKey]) ? GLOBAL_SCOPE[queueKey] : null;
    if (!queueRef || queueRef.length === 0) {
      return;
    }
    var queue = queueRef.slice();
    queueRef.length = 0;
    for (var index = 0; index < queue.length; index += 1) {
      var entry = queue[index];
      if (typeof entry !== 'function') {
        continue;
      }
      try {
        entry(uiAPI);
      } catch (callbackError) {
        safeWarn('cineUi registration callback failed.', callbackError);
      }
    }
  }
  flushRegistrationQueue();
  function dispatchReadyEvent() {
    var targets = [];
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.dispatchEvent === 'function') {
      targets.push(GLOBAL_SCOPE);
    }
    if (typeof window !== 'undefined' && window && typeof window.dispatchEvent === 'function' && targets.indexOf(window) === -1) {
      targets.push(window);
    }
    if (!targets.length) {
      return;
    }
    for (var index = 0; index < targets.length; index += 1) {
      var target = targets[index];
      var readyEvent = null;
      if (typeof Event === 'function') {
        try {
          readyEvent = new Event('cine-ui-ready');
        } catch (eventError) {
          void eventError;
          readyEvent = null;
        }
      }
      if (!readyEvent) {
        var doc = target && target.document;
        if (doc && typeof doc.createEvent === 'function') {
          try {
            var legacyEvent = doc.createEvent('Event');
            legacyEvent.initEvent('cine-ui-ready', false, false);
            readyEvent = legacyEvent;
          } catch (legacyError) {
            void legacyError;
            readyEvent = null;
          }
        }
      }
      if (!readyEvent) {
        continue;
      }
      try {
        target.dispatchEvent(readyEvent);
      } catch (dispatchError) {
        safeWarn('Unable to dispatch cine-ui-ready event.', dispatchError);
      }
    }
  }
  dispatchReadyEvent();
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = uiAPI;
  }
})();