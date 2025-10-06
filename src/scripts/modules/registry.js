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
  let registryReference = null;

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

  function normalizeConnections(value) {
    if (value == null) {
      return [];
    }

    const entries = Array.isArray(value)
      ? value
      : typeof value === 'string'
        ? [value]
        : typeof value[Symbol.iterator] === 'function'
          ? Array.from(value)
          : [value];

    const seen = new Set();
    const normalized = [];

    for (let index = 0; index < entries.length; index += 1) {
      const entry = entries[index];
      let raw = null;

      if (typeof entry === 'string') {
        raw = entry;
      } else if (entry && typeof entry.name === 'string') {
        raw = entry.name;
      }

      if (!raw) {
        continue;
      }

      const trimmed = raw.trim();
      if (!trimmed || seen.has(trimmed)) {
        continue;
      }

      seen.add(trimmed);
      normalized.push(trimmed);
    }

    return normalized;
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
      connections: freezeDeep(normalizeConnections(
        options.connections || options.links || options.dependencies || null,
      )),
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
      connections: meta.connections || freezeDeep([]),
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

  function queueRegistrationPayload(scope, payload) {
    const targetScope = scope || GLOBAL_SCOPE;
    if (!targetScope || (typeof targetScope !== 'object' && typeof targetScope !== 'function')) {
      return false;
    }

    let queue = null;
    try {
      queue = targetScope[PENDING_QUEUE_KEY];
    } catch (error) {
      void error;
      queue = null;
    }

    if (!Array.isArray(queue)) {
      queue = [];
      assignHidden(targetScope, PENDING_QUEUE_KEY, queue);
    }

    const record = freezeDeep({
      name: payload && payload.name ? normalizeName(payload.name) : null,
      api: payload ? payload.api : null,
      options: Object.freeze({ ...(payload && payload.options ? payload.options : {}) }),
    });

    try {
      queue.push(record);
    } catch (error) {
      void error;
      queue[queue.length] = record;
    }

    try {
      schedulePendingFlush(targetScope);
    } catch (error) {
      void error;
    }

    return true;
  }

  function createBlueprint(options = {}) {
    const normalizedName = normalizeName(options.name);
    const normalizedCategory = typeof options.category === 'string' ? options.category.trim() : '';
    if (!normalizedCategory) {
      throw new TypeError(`cineModules.createBlueprint("${normalizedName}") expected a non-empty category string.`);
    }

    const normalizedDescription = typeof options.description === 'string' ? options.description.trim() : '';
    if (!normalizedDescription) {
      throw new TypeError(`cineModules.createBlueprint("${normalizedName}") expected a non-empty description.`);
    }

    const freezeByDefault = options.freeze !== false;
    const normalizedConnections = freezeDeep(normalizeConnections(options.connections));

    const factory = typeof options.factory === 'function' ? options.factory : null;
    const staticApi = factory ? null : options.api;

    if (!factory && (!staticApi || (typeof staticApi !== 'object' && typeof staticApi !== 'function'))) {
      throw new TypeError(
        `cineModules.createBlueprint("${normalizedName}") expected an object API or factory function.`,
      );
    }

    const metadata = Object.freeze({
      name: normalizedName,
      category: normalizedCategory,
      description: normalizedDescription,
      connections: normalizedConnections,
      freeze: freezeByDefault,
    });

    let cachedApi = null;
    let instantiated = false;
    let instantiateError = null;

    function buildRegistrationOptions(overrides) {
      const base = {
        category: metadata.category,
        description: metadata.description,
        connections: metadata.connections,
        freeze: metadata.freeze,
      };

      if (!overrides || typeof overrides !== 'object') {
        return Object.freeze({ ...base });
      }

      const normalized = { ...base };

      if (Object.prototype.hasOwnProperty.call(overrides, 'category')) {
        const candidate = typeof overrides.category === 'string' ? overrides.category.trim() : '';
        if (candidate) {
          normalized.category = candidate;
        }
      }

      if (Object.prototype.hasOwnProperty.call(overrides, 'description')) {
        const candidate = typeof overrides.description === 'string' ? overrides.description.trim() : '';
        if (candidate) {
          normalized.description = candidate;
        }
      }

      if (Object.prototype.hasOwnProperty.call(overrides, 'connections')) {
        normalized.connections = freezeDeep(normalizeConnections(overrides.connections));
      }

      if (Object.prototype.hasOwnProperty.call(overrides, 'freeze')) {
        normalized.freeze = overrides.freeze !== false;
      }

      return Object.freeze(normalized);
    }

    function instantiate(context) {
      if (instantiated) {
        if (instantiateError) {
          throw instantiateError;
        }
        return cachedApi;
      }

      instantiated = true;

      let produced = staticApi;
      if (factory) {
        const invocationContext = context && typeof context === 'object' ? { ...context } : {};
        const frozenContext = Object.freeze({
          registry: registryReference || null,
          metadata,
          context: invocationContext,
          freezeDeep,
          normalizeConnections,
        });

        try {
          produced = factory(frozenContext);
        } catch (error) {
          instantiateError = error instanceof Error ? error : new Error(String(error));
          throw instantiateError;
        }
      }

      if (!produced || (typeof produced !== 'object' && typeof produced !== 'function')) {
        const error = new TypeError(
          `cineModules.createBlueprint("${normalizedName}") factory expected an object or function return value.`,
        );
        instantiateError = error;
        throw error;
      }

      cachedApi = freezeByDefault && !Object.isFrozen(produced) ? freezeDeep(produced) : produced;
      return cachedApi;
    }

    function registerBlueprint(options = {}) {
      const resolvedRegistry =
        options && typeof options.registry === 'object' && options.registry
          ? options.registry
          : registryReference;

      const registrationOptions = buildRegistrationOptions(options && options.options);
      const scope = options && options.scope ? options.scope : GLOBAL_SCOPE;
      const deferOnError = options && Object.prototype.hasOwnProperty.call(options, 'defer') ? options.defer !== false : true;
      const onError = options && typeof options.onError === 'function' ? options.onError : null;

      const api = instantiate(options && options.context);

      const targetRegistry =
        resolvedRegistry && typeof resolvedRegistry.register === 'function' ? resolvedRegistry : registryReference;

      if (!targetRegistry || typeof targetRegistry.register !== 'function') {
        throw new TypeError('cineModules.createBlueprint register() requires a registry with a register() function.');
      }

      try {
        return targetRegistry.register(metadata.name, api, registrationOptions);
      } catch (error) {
        if (deferOnError) {
          queueRegistrationPayload(scope, {
            name: metadata.name,
            api,
            options: registrationOptions,
          });
        }

        if (onError) {
          try {
            onError(error);
          } catch (handlerError) {
            void handlerError;
          }
        }

        throw error;
      }
    }

    const blueprint = {
      name: metadata.name,
      category: metadata.category,
      description: metadata.description,
      connections: metadata.connections,
      freeze: metadata.freeze,
      instantiate,
      register: registerBlueprint,
      getMetadata() {
        return metadata;
      },
      createRegistrationOptions: buildRegistrationOptions,
      toJSON() {
        return metadata;
      },
    };

    return Object.freeze(blueprint);
  }

  const registry = Object.freeze({
    register,
    get,
    has,
    list,
    describe,
    assertRegistered,
    createBlueprint,
    __internalResetForTests: resetForTests,
  });

  registryReference = registry;

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
