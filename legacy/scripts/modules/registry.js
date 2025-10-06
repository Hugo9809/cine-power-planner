function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var GLOBAL_SCOPE = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : {};
  var PENDING_QUEUE_KEY = '__cinePendingModuleRegistrations__';
  var QUEUE_FLUSH_TIMER_KEY = '__cinePendingModuleRegistrationsTimer__';
  var moduleMap = Object.create(null);
  var metadataMap = Object.create(null);
  var registryReference = null;
  function resolveImmutability(scope) {
    var targetScope = scope || GLOBAL_SCOPE;
    if (typeof require === 'function') {
      try {
        var required = require('./immutability.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    var scopes = [targetScope];
    if (typeof globalThis !== 'undefined' && scopes.indexOf(globalThis) === -1) scopes.push(globalThis);
    if (typeof window !== 'undefined' && scopes.indexOf(window) === -1) scopes.push(window);
    if (typeof self !== 'undefined' && scopes.indexOf(self) === -1) scopes.push(self);
    if (typeof global !== 'undefined' && scopes.indexOf(global) === -1) scopes.push(global);
    for (var index = 0; index < scopes.length; index += 1) {
      var candidate = scopes[index];
      if (candidate && _typeof(candidate.cineModuleImmutability) === 'object') {
        return candidate.cineModuleImmutability;
      }
    }
    return null;
  }
  var BUILTIN_IMMUTABILITY = function resolveBuiltinImmutability() {
    var registryKey = '__cineBuiltinImmutabilityGuards__';
    var scopes = [GLOBAL_SCOPE];
    if (typeof globalThis !== 'undefined' && globalThis !== GLOBAL_SCOPE) scopes.push(globalThis);
    if (typeof window !== 'undefined') scopes.push(window);
    if (typeof self !== 'undefined') scopes.push(self);
    if (typeof global !== 'undefined') scopes.push(global);
    if (typeof require === 'function') {
      try {
        var required = require('./helpers/immutability-builtins.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
        continue;
      }
      try {
        var candidate = scope[registryKey];
        if (candidate && _typeof(candidate) === 'object') {
          return candidate;
        }
      } catch (error) {
        void error;
      }
    }
    return null;
  }();
  function createFallbackImmutability() {
    function shouldBypass(value) {
      if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
        return false;
      }
      try {
        if (BUILTIN_IMMUTABILITY && typeof BUILTIN_IMMUTABILITY.isImmutableBuiltin === 'function' && BUILTIN_IMMUTABILITY.isImmutableBuiltin(value)) {
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
    function freeze(value) {
      var seen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakSet();
      if (!value || _typeof(value) !== 'object' && typeof value !== 'function') {
        return value;
      }
      if (shouldBypass(value)) {
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
        freeze(descriptor.value, seen);
      }
      return Object.freeze(value);
    }
    return {
      shouldBypassDeepFreeze: shouldBypass,
      freezeDeep: freeze
    };
  }
  var FALLBACK_IMMUTABILITY = createFallbackImmutability();
  var activeImmutability = resolveImmutability(GLOBAL_SCOPE) || FALLBACK_IMMUTABILITY;
  function getImmutability() {
    if (activeImmutability !== FALLBACK_IMMUTABILITY) {
      return activeImmutability;
    }
    var resolved = resolveImmutability(GLOBAL_SCOPE);
    if (resolved && resolved !== activeImmutability) {
      activeImmutability = resolved;
    }
    return activeImmutability;
  }
  function freezeDeep(value, seen) {
    var provider = getImmutability();
    try {
      return provider.freezeDeep(value, seen);
    } catch (error) {
      void error;
    }
    return FALLBACK_IMMUTABILITY.freezeDeep(value, seen);
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
  function normalizeConnections(value) {
    if (value == null) {
      return [];
    }
    var entries = Array.isArray(value) ? value : typeof value === 'string' ? [value] : typeof value[Symbol.iterator] === 'function' ? Array.from(value) : [value];
    var seen = new Set();
    var normalized = [];
    for (var index = 0; index < entries.length; index += 1) {
      var entry = entries[index];
      var raw = null;
      if (typeof entry === 'string') {
        raw = entry;
      } else if (entry && typeof entry.name === 'string') {
        raw = entry.name;
      }
      if (!raw) {
        continue;
      }
      var trimmed = raw.trim();
      if (!trimmed || seen.has(trimmed)) {
        continue;
      }
      seen.add(trimmed);
      normalized.push(trimmed);
    }
    return normalized;
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
      frozen: freeze,
      connections: freezeDeep(normalizeConnections(options.connections || options.links || options.dependencies || null))
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
      frozen: meta.frozen,
      connections: meta.connections || freezeDeep([])
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
  function getTimerDescriptor(scope) {
    if (!scope || _typeof(scope) !== 'object') {
      return null;
    }
    var descriptor = scope[QUEUE_FLUSH_TIMER_KEY];
    return descriptor && _typeof(descriptor) === 'object' ? descriptor : null;
  }
  function assignHidden(scope, key, value) {
    if (!scope || _typeof(scope) !== 'object') {
      return;
    }
    try {
      Object.defineProperty(scope, key, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: value
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
    var descriptor = getTimerDescriptor(scope);
    if (!descriptor) {
      return;
    }
    var clearTimer = descriptor && typeof descriptor.clear === 'function' ? descriptor.clear : null;
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
    if (!scope || _typeof(scope) !== 'object') {
      return;
    }
    var queue = scope[PENDING_QUEUE_KEY];
    if (!Array.isArray(queue) || queue.length === 0) {
      cancelPendingFlush(scope);
      return;
    }
    if (getTimerDescriptor(scope)) {
      return;
    }
    var scheduleFromScope = typeof scope.setTimeout === 'function' && scope.setTimeout.bind(scope) || typeof GLOBAL_SCOPE.setTimeout === 'function' && GLOBAL_SCOPE.setTimeout.bind(GLOBAL_SCOPE) || (typeof setTimeout === 'function' ? setTimeout : null);
    if (typeof scheduleFromScope !== 'function') {
      return;
    }
    var clearFromScope = typeof scope.clearTimeout === 'function' && scope.clearTimeout.bind(scope) || typeof GLOBAL_SCOPE.clearTimeout === 'function' && GLOBAL_SCOPE.clearTimeout.bind(GLOBAL_SCOPE) || (typeof clearTimeout === 'function' ? clearTimeout : null);
    var timerId = scheduleFromScope(function retryFlush() {
      cancelPendingFlush(scope);
      flushPendingRegistrations(scope);
    }, 0);
    assignHidden(scope, QUEUE_FLUSH_TIMER_KEY, {
      id: timerId,
      clear: typeof clearFromScope === 'function' ? clearFromScope : null
    });
  }
  function flushPendingRegistrations(scope) {
    if (!scope || _typeof(scope) !== 'object') {
      return;
    }
    var queue = scope[PENDING_QUEUE_KEY];
    if (!Array.isArray(queue) || queue.length === 0) {
      cancelPendingFlush(scope);
      return;
    }
    var pending = queue.slice();
    queue.length = 0;
    var requiresReschedule = false;
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
    var targetScope = scope || GLOBAL_SCOPE;
    if (!targetScope || _typeof(targetScope) !== 'object' && typeof targetScope !== 'function') {
      return false;
    }

    var queue = null;
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

    var optionsClone = payload && payload.options ? cloneObject(payload.options) : {};
    var record = freezeDeep({
      name: payload && payload.name ? normalizeName(payload.name) : null,
      api: payload ? payload.api : null,
      options: Object.freeze(optionsClone)
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
  function cloneObject(source) {
    var copy = {};
    if (!source || _typeof(source) !== 'object') {
      return copy;
    }

    var keys = Object.keys(source);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      copy[key] = source[key];
    }

    return copy;
  }
  function createBlueprint(options) {
    if (!options) {
      options = {};
    }

    var normalizedName = normalizeName(options.name);
    var normalizedCategory = typeof options.category === 'string' ? options.category.trim() : '';
    if (!normalizedCategory) {
      throw new TypeError('cineModules.createBlueprint("' + normalizedName + '") expected a non-empty category string.');
    }

    var normalizedDescription = typeof options.description === 'string' ? options.description.trim() : '';
    if (!normalizedDescription) {
      throw new TypeError('cineModules.createBlueprint("' + normalizedName + '") expected a non-empty description.');
    }

    var freezeByDefault = options.freeze !== false;
    var normalizedConnections = freezeDeep(normalizeConnections(options.connections));

    var factory = typeof options.factory === 'function' ? options.factory : null;
    var staticApi = factory ? null : options.api;

    if (!factory && (!staticApi || _typeof(staticApi) !== 'object' && typeof staticApi !== 'function')) {
      throw new TypeError('cineModules.createBlueprint("' + normalizedName + '") expected an object API or factory function.');
    }

    var metadata = Object.freeze({
      name: normalizedName,
      category: normalizedCategory,
      description: normalizedDescription,
      connections: normalizedConnections,
      freeze: freezeByDefault
    });

    var cachedApi = null;
    var instantiated = false;
    var instantiateError = null;

    function buildRegistrationOptions(overrides) {
      var base = {
        category: metadata.category,
        description: metadata.description,
        connections: metadata.connections,
        freeze: metadata.freeze
      };

      if (!overrides || _typeof(overrides) !== 'object') {
        var baseCopy = cloneObject(base);
        return Object.freeze(baseCopy);
      }

      var normalized = cloneObject(base);

      if (Object.prototype.hasOwnProperty.call(overrides, 'category')) {
        var candidateCategory = typeof overrides.category === 'string' ? overrides.category.trim() : '';
        if (candidateCategory) {
          normalized.category = candidateCategory;
        }
      }

      if (Object.prototype.hasOwnProperty.call(overrides, 'description')) {
        var candidateDescription = typeof overrides.description === 'string' ? overrides.description.trim() : '';
        if (candidateDescription) {
          normalized.description = candidateDescription;
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

      var produced = staticApi;
      if (factory) {
        var invocationContext = context && _typeof(context) === 'object' ? cloneObject(context) : {};
        var frozenContext = Object.freeze({
          registry: registryReference || null,
          metadata: metadata,
          context: invocationContext,
          freezeDeep: freezeDeep,
          normalizeConnections: normalizeConnections
        });

        try {
          produced = factory(frozenContext);
        } catch (error) {
          instantiateError = error instanceof Error ? error : new Error(String(error));
          throw instantiateError;
        }
      }

      if (!produced || _typeof(produced) !== 'object' && typeof produced !== 'function') {
        var failure = new TypeError('cineModules.createBlueprint("' + normalizedName + '") factory expected an object or function return value.');
        instantiateError = failure;
        throw failure;
      }

      cachedApi = freezeByDefault && !Object.isFrozen(produced) ? freezeDeep(produced) : produced;
      return cachedApi;
    }

    function registerBlueprint(options) {
      if (!options) {
        options = {};
      }

      var resolvedRegistry = options && _typeof(options.registry) === 'object' && options.registry ? options.registry : registryReference;
      var registrationOptions = buildRegistrationOptions(options && options.options);
      var scope = options && options.scope ? options.scope : GLOBAL_SCOPE;
      var deferOnError = Object.prototype.hasOwnProperty.call(options, 'defer') ? options.defer !== false : true;
      var onError = options && typeof options.onError === 'function' ? options.onError : null;

      var api = instantiate(options && options.context);

      var targetRegistry = resolvedRegistry && typeof resolvedRegistry.register === 'function' ? resolvedRegistry : registryReference;

      if (!targetRegistry || typeof targetRegistry.register !== 'function') {
        throw new TypeError('cineModules.createBlueprint register() requires a registry with a register() function.');
      }

      try {
        return targetRegistry.register(metadata.name, api, registrationOptions);
      } catch (error) {
        if (deferOnError) {
          queueRegistrationPayload(scope, {
            name: metadata.name,
            api: api,
            options: registrationOptions
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

    var blueprint = {
      name: metadata.name,
      category: metadata.category,
      description: metadata.description,
      connections: metadata.connections,
      freeze: metadata.freeze,
      instantiate: instantiate,
      register: registerBlueprint,
      getMetadata: function getMetadata() {
        return metadata;
      },
      createRegistrationOptions: buildRegistrationOptions,
      toJSON: function toJSON() {
        return metadata;
      }
    };

    return Object.freeze(blueprint);
  }
  var registry = Object.freeze({
    register: register,
    get: get,
    has: has,
    list: list,
    describe: describe,
    assertRegistered: assertRegistered,
    createBlueprint: createBlueprint,
    __internalResetForTests: resetForTests
  });
  registryReference = registry;
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
