function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function detectGlobalScope() {
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
  var FALLBACK_SCOPE = detectGlobalScope();
  function resolveModuleBase() {
    if (typeof require === 'function') {
      try {
        return require('./base.js');
      } catch (error) {
        void error;
      }
    }
    var candidates = [FALLBACK_SCOPE];
    if (typeof globalThis !== 'undefined' && candidates.indexOf(globalThis) === -1) candidates.push(globalThis);
    if (typeof window !== 'undefined' && candidates.indexOf(window) === -1) candidates.push(window);
    if (typeof self !== 'undefined' && candidates.indexOf(self) === -1) candidates.push(self);
    if (typeof global !== 'undefined' && candidates.indexOf(global) === -1) candidates.push(global);
    for (var index = 0; index < candidates.length; index += 1) {
      var scope = candidates[index];
      if (scope && _typeof(scope.cineModuleBase) === 'object') {
        return scope.cineModuleBase;
      }
    }
    return null;
  }
  var MODULE_BASE = resolveModuleBase();
  var GLOBAL_SCOPE = MODULE_BASE && typeof MODULE_BASE.getGlobalScope === 'function' ? MODULE_BASE.getGlobalScope() || FALLBACK_SCOPE : FALLBACK_SCOPE;
  var tryRequire = MODULE_BASE && typeof MODULE_BASE.tryRequire === 'function' ? MODULE_BASE.tryRequire : function tryRequire(modulePath) {
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
  var resolveModuleRegistry = MODULE_BASE && typeof MODULE_BASE.resolveModuleRegistry === 'function' ? function resolveModuleRegistry(scope) {
    return MODULE_BASE.resolveModuleRegistry(scope || GLOBAL_SCOPE);
  } : function resolveModuleRegistry() {
    var required = tryRequire('./registry.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var scopes = [GLOBAL_SCOPE];
    if (typeof globalThis !== 'undefined' && scopes.indexOf(globalThis) === -1) scopes.push(globalThis);
    if (typeof window !== 'undefined' && scopes.indexOf(window) === -1) scopes.push(window);
    if (typeof self !== 'undefined' && scopes.indexOf(self) === -1) scopes.push(self);
    if (typeof global !== 'undefined' && scopes.indexOf(global) === -1) scopes.push(global);
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (scope && _typeof(scope.cineModules) === 'object') {
        return scope.cineModules;
      }
    }
    return null;
  };
  var MODULE_REGISTRY = function () {
    var provided = MODULE_BASE && typeof MODULE_BASE.getModuleRegistry === 'function' ? MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE) : null;
    return provided || resolveModuleRegistry();
  }();
  var PENDING_QUEUE_KEY = MODULE_BASE && typeof MODULE_BASE.PENDING_QUEUE_KEY === 'string' ? MODULE_BASE.PENDING_QUEUE_KEY : '__cinePendingModuleRegistrations__';
  function queueModuleRegistration(name, api, options) {
    if (!GLOBAL_SCOPE || _typeof(GLOBAL_SCOPE) !== 'object') {
      return false;
    }
    var payload = Object.freeze({
      name: name,
      api: api,
      options: Object.freeze(_objectSpread({}, options || {}))
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
  var registerOrQueueModule = MODULE_BASE && typeof MODULE_BASE.registerOrQueueModule === 'function' ? function registerOrQueueModule(name, api, options, onError) {
    return MODULE_BASE.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, MODULE_REGISTRY);
  } : function registerOrQueueModule(name, api, options, onError) {
    if (MODULE_REGISTRY && typeof MODULE_REGISTRY.register === 'function') {
      try {
        MODULE_REGISTRY.register(name, api, options);
        return true;
      } catch (error) {
        if (typeof onError === 'function') {
          onError(error);
        } else {
          void error;
        }
      }
    }
    queueModuleRegistration(name, api, options);
    return false;
  };
  var freezeDeep = MODULE_BASE && typeof MODULE_BASE.freezeDeep === 'function' ? MODULE_BASE.freezeDeep : function freezeDeep(value) {
    var seen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakSet();
    if (!value || _typeof(value) !== 'object') {
      return value;
    }
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
    var keys = Object.getOwnPropertyNames(value);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      var descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor || 'get' in descriptor || 'set' in descriptor) {
        continue;
      }
      freezeDeep(descriptor.value, seen);
    }
    return Object.freeze(value);
  };
  var safeWarn = MODULE_BASE && typeof MODULE_BASE.safeWarn === 'function' ? MODULE_BASE.safeWarn : function safeWarn(message, detail) {
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
  };
  var exposeGlobal = MODULE_BASE && typeof MODULE_BASE.exposeGlobal === 'function' ? function exposeGlobal(name, value, options) {
    return MODULE_BASE.exposeGlobal(name, value, GLOBAL_SCOPE, options);
  } : function exposeGlobal(name, value) {
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
  };
  var controllerRegistry = new Map();
  var interactionRegistry = new Map();
  var orchestrationRegistry = new Map();
  var helpRegistry = new Map();
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
  function sanitizeHelpEntry(name, value) {
    if (typeof value === 'string') {
      var text = value.trim();
      if (!text) {
        throw new Error("cineUi help entry \"".concat(name, "\" cannot be empty."));
      }
      return freezeDeep({
        resolver: function resolver() {
          return text;
        }
      });
    }
    if (typeof value === 'function') {
      var resolver = cloneFunction(value);
      return freezeDeep({
        resolver: resolver
      });
    }
    throw new TypeError("cineUi help entry \"".concat(name, "\" must be a string or function."));
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
  var helpAPI = freezeDeep({
    register: function register(name, value) {
      var normalized = normalizeName(name);
      var sanitized = sanitizeHelpEntry(normalized, value);
      if (helpRegistry.has(normalized)) {
        warnDuplicate(normalized, 'help');
      }
      helpRegistry.set(normalized, sanitized);
      return sanitized.resolver;
    },
    get: function get(name) {
      var normalized = normalizeName(name);
      var entry = helpRegistry.get(normalized);
      return entry ? entry.resolver : null;
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
      return listRegistryKeys(helpRegistry);
    }
  });
  function clearRegistries() {
    controllerRegistry.clear();
    interactionRegistry.clear();
    orchestrationRegistry.clear();
    helpRegistry.clear();
    WARNED_NAMES.clear();
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
      helpRegistry: helpRegistry,
      clearRegistries: clearRegistries
    }
  };
  freezeDeep(uiAPI);
  registerOrQueueModule('cineUi', uiAPI, {
    category: 'ui',
    description: 'UI controller registry for dialogs, interactions, orchestration, and help copy.',
    replace: true
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