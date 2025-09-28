(function () {
  var GLOBAL_SCOPE =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof window !== 'undefined'
        ? window
        : typeof self !== 'undefined'
          ? self
          : typeof global !== 'undefined'
            ? global
            : {};

  var moduleMap = Object.create(null);
  var metadataMap = Object.create(null);

  function hasSeen(seen, value) {
    if (!seen) {
      return false;
    }

    if (typeof WeakSet === 'function' && seen instanceof WeakSet) {
      return seen.has(value);
    }

    for (var index = 0; index < seen.length; index += 1) {
      if (seen[index] === value) {
        return true;
      }
    }

    return false;
  }

  function addSeen(seen, value) {
    if (typeof WeakSet === 'function' && seen instanceof WeakSet) {
      seen.add(value);
      return seen;
    }

    if (!seen) {
      seen = [];
    }

    seen.push(value);
    return seen;
  }

  function freezeDeep(value, seen) {
    if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
      return value;
    }

    if (!seen) {
      seen = typeof WeakSet === 'function' ? new WeakSet() : [];
    }

    if (hasSeen(seen, value)) {
      return value;
    }

    seen = addSeen(seen, value);

    var keys = Object.getOwnPropertyNames(value);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      var descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor || ('get' in descriptor) || ('set' in descriptor)) {
        continue;
      }
      freezeDeep(descriptor.value, seen);
    }

    try {
      return Object.freeze(value);
    } catch (error) {
      return value;
    }
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

  function register(name, moduleApi, options) {
    var normalizedName = normalizeName(name);
    var moduleOptions = options || {};

    if (!moduleApi || (typeof moduleApi !== 'object' && typeof moduleApi !== 'function')) {
      throw new TypeError('cineModules.register("' + normalizedName + '") expected an object or function.');
    }

    var freeze = moduleOptions.freeze !== false;
    var descriptor = freeze && !Object.isFrozen(moduleApi)
      ? freezeDeep(moduleApi)
      : moduleApi;

    if (Object.prototype.hasOwnProperty.call(moduleMap, normalizedName)) {
      var existing = moduleMap[normalizedName];
      if (existing === descriptor) {
        return existing;
      }

      if (!moduleOptions.replace) {
        throw new Error('Module "' + normalizedName + '" is already registered.');
      }
    }

    moduleMap[normalizedName] = descriptor;
    metadataMap[normalizedName] = {
      description: typeof moduleOptions.description === 'string' ? moduleOptions.description.trim() : '',
      category: typeof moduleOptions.category === 'string' ? moduleOptions.category.trim() : '',
      registeredAt: Date.now(),
      frozen: freeze,
    };

    return descriptor;
  }

  function get(name) {
    var normalizedName = normalizeName(name);
    return Object.prototype.hasOwnProperty.call(moduleMap, normalizedName)
      ? moduleMap[normalizedName]
      : null;
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
      frozen: meta.frozen,
    });
  }

  function toArray(value) {
    if (Array.isArray) {
      return Array.isArray(value) ? value.slice() : [value];
    }

    if (Object.prototype.toString.call(value) === '[object Array]') {
      return value.slice();
    }

    return [value];
  }

  function assertRegistered(names) {
    var entries = toArray(names);
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
      detail: Object.freeze(detail),
    });
  }

  function resetForTests(options) {
    var isTestEnvironment =
      typeof process !== 'undefined' &&
      process &&
      process.env &&
      process.env.NODE_ENV === 'test';

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

  var registry = Object.freeze({
    register: register,
    get: get,
    has: has,
    list: list,
    describe: describe,
    assertRegistered: assertRegistered,
    __internalResetForTests: resetForTests,
  });

  var scopes = [GLOBAL_SCOPE];
  if (typeof globalThis !== 'undefined' && globalThis !== GLOBAL_SCOPE) scopes.push(globalThis);
  if (typeof window !== 'undefined' && scopes.indexOf(window) === -1) scopes.push(window);
  if (typeof self !== 'undefined' && scopes.indexOf(self) === -1) scopes.push(self);
  if (typeof global !== 'undefined' && scopes.indexOf(global) === -1) scopes.push(global);

  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope || typeof scope !== 'object') {
      continue;
    }

    var existing = scope.cineModules;
    if (existing === registry) {
      continue;
    }

    try {
      Object.defineProperty(scope, 'cineModules', {
        configurable: false,
        enumerable: false,
        value: registry,
        writable: false,
      });
    } catch (error) {
      scope.cineModules = registry;
    }
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = registry;
  }
})();
