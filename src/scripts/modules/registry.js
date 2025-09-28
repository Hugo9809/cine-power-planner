(function () {
  const GLOBAL_SCOPE =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof window !== 'undefined'
        ? window
        : typeof self !== 'undefined'
          ? self
          : typeof global !== 'undefined'
            ? global
            : {};

  let moduleMap = Object.create(null);
  let metadataMap = Object.create(null);

  function freezeDeep(value, seen = new WeakSet()) {
    if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
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
      freezeDeep(descriptor.value, seen);
    }

    return Object.freeze(value);
  }

  function normalizeName(name) {
    if (typeof name === 'string') {
      const trimmed = name.trim();
      if (trimmed) {
        return trimmed;
      }
    }
    throw new TypeError('cineModules.register expected a non-empty string name.');
  }

  function register(name, moduleApi, options = {}) {
    const normalizedName = normalizeName(name);

    if (!moduleApi || (typeof moduleApi !== 'object' && typeof moduleApi !== 'function')) {
      throw new TypeError(`cineModules.register("${normalizedName}") expected an object or function.`);
    }

    const freeze = options.freeze !== false;
    const descriptor = freeze && !Object.isFrozen(moduleApi)
      ? freezeDeep(moduleApi)
      : moduleApi;

    if (Object.prototype.hasOwnProperty.call(moduleMap, normalizedName)) {
      const existing = moduleMap[normalizedName];
      if (existing === descriptor) {
        return existing;
      }

      if (!options.replace) {
        throw new Error(`Module "${normalizedName}" is already registered.`);
      }
    }

    moduleMap[normalizedName] = descriptor;
    metadataMap[normalizedName] = {
      description: typeof options.description === 'string' ? options.description.trim() : '',
      category: typeof options.category === 'string' ? options.category.trim() : '',
      registeredAt: Date.now(),
      frozen: freeze,
    };

    return descriptor;
  }

  function get(name) {
    const normalizedName = normalizeName(name);
    return Object.prototype.hasOwnProperty.call(moduleMap, normalizedName)
      ? moduleMap[normalizedName]
      : null;
  }

  function has(name) {
    const normalizedName = normalizeName(name);
    return Object.prototype.hasOwnProperty.call(moduleMap, normalizedName);
  }

  function list() {
    return Object.freeze(Object.keys(moduleMap).sort());
  }

  function describe(name) {
    const normalizedName = normalizeName(name);
    const meta = metadataMap[normalizedName];
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

  function assertRegistered(names) {
    const entries = Array.isArray(names) ? names.slice() : [names];
    const detail = {};
    const missing = [];

    for (let index = 0; index < entries.length; index += 1) {
      const name = normalizeName(entries[index]);
      const present = has(name);
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

  function resetForTests(options = {}) {
    const isTestEnvironment =
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

  const registry = Object.freeze({
    register,
    get,
    has,
    list,
    describe,
    assertRegistered,
    __internalResetForTests: resetForTests,
  });

  const scopes = [GLOBAL_SCOPE];
  if (typeof globalThis !== 'undefined' && globalThis !== GLOBAL_SCOPE) scopes.push(globalThis);
  if (typeof window !== 'undefined' && scopes.indexOf(window) === -1) scopes.push(window);
  if (typeof self !== 'undefined' && scopes.indexOf(self) === -1) scopes.push(self);
  if (typeof global !== 'undefined' && scopes.indexOf(global) === -1) scopes.push(global);

  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope || typeof scope !== 'object') {
      continue;
    }

    const existing = scope.cineModules;
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
      void error;
      scope.cineModules = registry;
    }
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = registry;
  }
})();
