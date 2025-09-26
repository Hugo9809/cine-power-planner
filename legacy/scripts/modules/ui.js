function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var GLOBAL_SCOPE = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : {};
  var controllerRegistry = new Map();
  var interactionRegistry = new Map();
  var orchestrationRegistry = new Map();
  var helpRegistry = new Map();
  var WARNED_NAMES = new Set();
  function safeWarn(message, detail) {
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
  function freezeDeep(value) {
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
  }
  function sanitizeDescriptor(name, descriptor) {
    if (!descriptor || _typeof(descriptor) !== 'object') {
      throw new TypeError("cineUi controller \"".concat(name, "\" requires a descriptor object."));
    }
    var entries = {};
    var propNames = Object.getOwnPropertyNames(descriptor);
    for (var index = 0; index < propNames.length; index += 1) {
      var prop = propNames[index];
      var value = descriptor[prop];
      if (typeof value === 'function') {
        entries[prop] = cloneFunction(value);
      }
    }
    if (!Object.keys(entries).length) {
      throw new Error("cineUi controller \"".concat(name, "\" did not provide any callable actions."));
    }
    return freezeDeep(entries);
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
  if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
    try {
      if (GLOBAL_SCOPE.cineUi !== uiAPI) {
        Object.defineProperty(GLOBAL_SCOPE, 'cineUi', {
          configurable: true,
          enumerable: false,
          value: uiAPI,
          writable: false
        });
      }
    } catch (error) {
      safeWarn('Unable to expose cineUi globally.', error);
    }
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = uiAPI;
  }
})();