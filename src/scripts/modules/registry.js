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

  const PENDING_QUEUE_KEY = '__cinePendingModuleRegistrations__';
  const QUEUE_FLUSH_TIMER_KEY = '__cinePendingModuleRegistrationsTimer__';

  let moduleMap = Object.create(null);
  let metadataMap = Object.create(null);

  function resolveImmutability(scope) {
    const targetScope = scope || GLOBAL_SCOPE;

    if (typeof require === 'function') {
      try {
        const required = require('./immutability.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    const scopes = [targetScope];
    if (typeof globalThis !== 'undefined' && scopes.indexOf(globalThis) === -1) scopes.push(globalThis);
    if (typeof window !== 'undefined' && scopes.indexOf(window) === -1) scopes.push(window);
    if (typeof self !== 'undefined' && scopes.indexOf(self) === -1) scopes.push(self);
    if (typeof global !== 'undefined' && scopes.indexOf(global) === -1) scopes.push(global);

    for (let index = 0; index < scopes.length; index += 1) {
      const candidate = scopes[index];
      if (candidate && typeof candidate.cineModuleImmutability === 'object') {
        return candidate.cineModuleImmutability;
      }
    }

    return null;
  }

  const BUILTIN_IMMUTABILITY = (function resolveBuiltinImmutability() {
    const registryKey = '__cineBuiltinImmutabilityGuards__';
    const scopes = [GLOBAL_SCOPE];
    if (typeof globalThis !== 'undefined' && globalThis !== GLOBAL_SCOPE) scopes.push(globalThis);
    if (typeof window !== 'undefined') scopes.push(window);
    if (typeof self !== 'undefined') scopes.push(self);
    if (typeof global !== 'undefined') scopes.push(global);

    if (typeof require === 'function') {
      try {
        const required = require('./helpers/immutability-builtins.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      try {
        const candidate = scope[registryKey];
        if (candidate && typeof candidate === 'object') {
          return candidate;
        }
      } catch (error) {
        void error;
      }
    }

    return null;
  })();

  function createFallbackImmutability() {
    function shouldBypass(value) {
      if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
        return false;
      }

      try {
        if (
          BUILTIN_IMMUTABILITY &&
          typeof BUILTIN_IMMUTABILITY.isImmutableBuiltin === 'function' &&
          BUILTIN_IMMUTABILITY.isImmutableBuiltin(value)
        ) {
          return true;
        }

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
  let activeImmutability = resolveImmutability(GLOBAL_SCOPE) || FALLBACK_IMMUTABILITY;

  function getImmutability() {
    if (activeImmutability !== FALLBACK_IMMUTABILITY) {
      return activeImmutability;
    }

    const resolved = resolveImmutability(GLOBAL_SCOPE);
    if (resolved && resolved !== activeImmutability) {
      activeImmutability = resolved;
    }

    return activeImmutability;
  }

  function freezeDeep(value, seen) {
    const provider = getImmutability();

    try {
      return provider.freezeDeep(value, seen);
    } catch (error) {
      void error;
    }

    return FALLBACK_IMMUTABILITY.freezeDeep(value, seen);
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

  function getTimerDescriptor(scope) {
    if (!scope || typeof scope !== 'object') {
      return null;
    }

    const descriptor = scope[QUEUE_FLUSH_TIMER_KEY];
    return descriptor && typeof descriptor === 'object' ? descriptor : null;
  }

  function assignHidden(scope, key, value) {
    if (!scope || typeof scope !== 'object') {
      return;
    }

    try {
      Object.defineProperty(scope, key, {
        configurable: true,
        enumerable: false,
        writable: true,
        value,
      });
    } catch (error) {
      void error;
      try {
        scope[key] = value;
      } catch (assignmentError) {
        void assignmentError;
      }
    }
  }

  function cancelPendingFlush(scope) {
    const descriptor = getTimerDescriptor(scope);
    if (!descriptor) {
      return;
    }

    const clearTimer = descriptor && typeof descriptor.clear === 'function' ? descriptor.clear : null;
    if (clearTimer && Object.prototype.hasOwnProperty.call(descriptor, 'id')) {
      try {
        clearTimer(descriptor.id);
      } catch (error) {
        void error;
      }
    }

    assignHidden(scope, QUEUE_FLUSH_TIMER_KEY, null);
  }

  function schedulePendingFlush(scope) {
    if (!scope || typeof scope !== 'object') {
      return;
    }

    const queue = scope[PENDING_QUEUE_KEY];
    if (!Array.isArray(queue) || queue.length === 0) {
      cancelPendingFlush(scope);
      return;
    }

    if (getTimerDescriptor(scope)) {
      return;
    }

    const scheduleFromScope =
      (typeof scope.setTimeout === 'function' && scope.setTimeout.bind(scope)) ||
      (typeof GLOBAL_SCOPE.setTimeout === 'function' && GLOBAL_SCOPE.setTimeout.bind(GLOBAL_SCOPE)) ||
      (typeof setTimeout === 'function' ? setTimeout : null);

    if (typeof scheduleFromScope !== 'function') {
      return;
    }

    const clearFromScope =
      (typeof scope.clearTimeout === 'function' && scope.clearTimeout.bind(scope)) ||
      (typeof GLOBAL_SCOPE.clearTimeout === 'function' && GLOBAL_SCOPE.clearTimeout.bind(GLOBAL_SCOPE)) ||
      (typeof clearTimeout === 'function' ? clearTimeout : null);

    const timerId = scheduleFromScope(function retryFlush() {
      cancelPendingFlush(scope);
      flushPendingRegistrations(scope);
    }, 0);

    assignHidden(scope, QUEUE_FLUSH_TIMER_KEY, {
      id: timerId,
      clear: typeof clearFromScope === 'function' ? clearFromScope : null,
    });
  }

  function flushPendingRegistrations(scope) {
    if (!scope || typeof scope !== 'object') {
      return;
    }

    const queue = scope[PENDING_QUEUE_KEY];
    if (!Array.isArray(queue) || queue.length === 0) {
      cancelPendingFlush(scope);
      return;
    }

    const pending = queue.slice();
    queue.length = 0;

    let requiresReschedule = false;

    for (let index = 0; index < pending.length; index += 1) {
      const entry = pending[index];
      if (!entry || typeof entry !== 'object') {
        continue;
      }

      const name = entry.name;
      const api = entry.api;
      const options = entry.options || {};

      try {
        registry.register(name, api, options);
      } catch (error) {
        void error;
        requiresReschedule = true;
        queue.push(entry);
      }
    }

    if (requiresReschedule || queue.length > 0) {
      schedulePendingFlush(scope);
    } else {
      cancelPendingFlush(scope);
    }
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
    if (existing !== registry) {
      try {
        Object.defineProperty(scope, 'cineModules', {
          configurable: false,
          enumerable: false,
          value: registry,
          writable: false,
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
