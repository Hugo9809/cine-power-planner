function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var GLOBAL_SCOPE = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : {};
  var PENDING_QUEUE_KEY = '__cinePendingModuleRegistrations__';
  var moduleMap = Object.create(null);
  var metadataMap = Object.create(null);
  function freezeDeep(value) {
    var seen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakSet();
    if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
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
  function normalizeName(name) {
    if (typeof name === 'string') {
      var trimmed = name.trim();
      if (trimmed) {
        return trimmed;
      }
    }
    throw new TypeError('cineModules.register expected a non-empty string name.');
  }
  function register(name, moduleApi) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var normalizedName = normalizeName(name);
    if (!moduleApi || _typeof(moduleApi) !== 'object' && typeof moduleApi !== 'function') {
      throw new TypeError("cineModules.register(\"".concat(normalizedName, "\") expected an object or function."));
    }
    var freeze = options.freeze !== false;
    var descriptor = freeze && !Object.isFrozen(moduleApi) ? freezeDeep(moduleApi) : moduleApi;
    if (Object.prototype.hasOwnProperty.call(moduleMap, normalizedName)) {
      var existing = moduleMap[normalizedName];
      if (existing === descriptor) {
        return existing;
      }
      if (!options.replace) {
        throw new Error("Module \"".concat(normalizedName, "\" is already registered."));
      }
    }
    moduleMap[normalizedName] = descriptor;
    metadataMap[normalizedName] = {
      description: typeof options.description === 'string' ? options.description.trim() : '',
      category: typeof options.category === 'string' ? options.category.trim() : '',
      registeredAt: Date.now(),
      frozen: freeze
    };
    return descriptor;
  }
  function get(name) {
    var normalizedName = normalizeName(name);
    return Object.prototype.hasOwnProperty.call(moduleMap, normalizedName) ? moduleMap[normalizedName] : null;
  }
  function has(name) {
    var normalizedName = normalizeName(name);
    return Object.prototype.hasOwnProperty.call(moduleMap, normalizedName);
  }
  function list() {
    return Object.freeze(Object.keys(moduleMap).sort());
  }
  function describe(name) {
    var normalizedName = normalizeName(name);
    var meta = metadataMap[normalizedName];
    if (!meta) {
      return null;
    }
    return Object.freeze({
      name: normalizedName,
      description: meta.description,
      category: meta.category,
      registeredAt: meta.registeredAt,
      frozen: meta.frozen
    });
  }
  function assertRegistered(names) {
    var entries = Array.isArray(names) ? names.slice() : [names];
    var detail = {};
    var missing = [];
    for (var index = 0; index < entries.length; index += 1) {
      var name = normalizeName(entries[index]);
      var present = has(name);
      detail[name] = present;
      if (!present) {
        missing.push(name);
      }
    }
    return Object.freeze({
      ok: missing.length === 0,
      missing: Object.freeze(missing),
      detail: Object.freeze(detail)
    });
  }
  function resetForTests() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var isTestEnvironment = typeof process !== 'undefined' && process && process.env && process.env.NODE_ENV === 'test';
    if (!isTestEnvironment) {
      throw new Error('cineModules.__internalResetForTests() is restricted to test environments.');
    }
    if (!options || options.force !== true) {
      throw new Error('cineModules.__internalResetForTests() requires { force: true }.');
    }
    moduleMap = Object.create(null);
    metadataMap = Object.create(null);
    return true;
  }
  function flushPendingRegistrations(scope) {
    if (!scope || _typeof(scope) !== 'object') {
      return;
    }
    var queue = scope[PENDING_QUEUE_KEY];
    if (!Array.isArray(queue) || queue.length === 0) {
      return;
    }
    var pending = queue.slice();
    queue.length = 0;
    for (var index = 0; index < pending.length; index += 1) {
      var entry = pending[index];
      if (!entry || _typeof(entry) !== 'object') {
        continue;
      }
      var name = entry.name;
      var api = entry.api;
      var options = entry.options || {};
      try {
        registry.register(name, api, options);
      } catch (error) {
        void error;
        queue.push(entry);
      }
    }
  }
  var registry = Object.freeze({
    register: register,
    get: get,
    has: has,
    list: list,
    describe: describe,
    assertRegistered: assertRegistered,
    __internalResetForTests: resetForTests
  });
  var scopes = [GLOBAL_SCOPE];
  if (typeof globalThis !== 'undefined' && globalThis !== GLOBAL_SCOPE) scopes.push(globalThis);
  if (typeof window !== 'undefined' && scopes.indexOf(window) === -1) scopes.push(window);
  if (typeof self !== 'undefined' && scopes.indexOf(self) === -1) scopes.push(self);
  if (typeof global !== 'undefined' && scopes.indexOf(global) === -1) scopes.push(global);
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope || _typeof(scope) !== 'object') {
      continue;
    }
    var existing = scope.cineModules;
    if (existing !== registry) {
      try {
        Object.defineProperty(scope, 'cineModules', {
          configurable: false,
          enumerable: false,
          value: registry,
          writable: false
        });
      } catch (error) {
        void error;
        try {
          scope.cineModules = registry;
        } catch (assignmentError) {
          void assignmentError;
        }
      }
    }
    flushPendingRegistrations(scope);
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = registry;
  }
})();