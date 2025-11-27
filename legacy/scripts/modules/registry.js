function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var GLOBAL_SCOPE = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : {};
  var ensureConsoleMethodsWritable = null;
  if (typeof require === 'function') {
    try {
      var consoleHelpers = require('../console-helpers.js');
      if (consoleHelpers && typeof consoleHelpers.ensureConsoleMethodsWritable === 'function') {
        ensureConsoleMethodsWritable = consoleHelpers.ensureConsoleMethodsWritable;
      }
    } catch (consoleHelpersError) {
      void consoleHelpersError;
    }
  }
  if (!ensureConsoleMethodsWritable && GLOBAL_SCOPE && typeof GLOBAL_SCOPE.__cineEnsureConsoleMethodsWritable === 'function') {
    ensureConsoleMethodsWritable = GLOBAL_SCOPE.__cineEnsureConsoleMethodsWritable;
  }
  if (typeof ensureConsoleMethodsWritable === 'function') {
    ensureConsoleMethodsWritable(['warn', 'info']);
  }
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
      if (!value || typeof value === 'function' || _typeof(value) !== 'object' && typeof value !== 'function') {
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
      if (!value || typeof value === 'function' || _typeof(value) !== 'object' && typeof value !== 'function') {
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
        var child = void 0;
        try {
          child = value[key];
        } catch (accessError) {
          void accessError;
          child = undefined;
        }
        if (!child || typeof child === 'function' || _typeof(child) !== 'object' && typeof child !== 'function') {
          continue;
        }
        freeze(child, seen);
      }
      try {
        return Object.freeze(value);
      } catch (freezeError) {
        void freezeError;
        return value;
      }
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
  function mergeMetadata(normalizedName, freeze, options) {
    var existingMeta = metadataMap[normalizedName];
    if (!existingMeta) {
      return;
    }
    var mergedConnections = normalizeConnections([].concat(_toConsumableArray(Array.isArray(existingMeta.connections) ? existingMeta.connections : []), _toConsumableArray(options.connections || options.links || options.dependencies || [])));
    metadataMap[normalizedName] = {
      description: typeof options.description === 'string' && options.description.trim() ? options.description.trim() : existingMeta.description,
      category: typeof options.category === 'string' && options.category.trim() ? options.category.trim() : existingMeta.category,
      registeredAt: existingMeta.registeredAt,
      frozen: existingMeta.frozen,
      connections: freezeDeep(mergedConnections)
    };
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
        mergeMetadata(normalizedName, freeze, options || {});
        return existing;
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
  function normalizeNameCollection(value) {
    if (value == null) {
      return null;
    }
    var entries = Array.isArray(value) ? value : typeof value === 'string' ? [value] : typeof value[Symbol.iterator] === 'function' ? Array.from(value) : [value];
    var normalized = [];
    var seen = new Set();
    for (var index = 0; index < entries.length; index += 1) {
      var entry = entries[index];
      try {
        var normalizedName = normalizeName(entry);
        if (!seen.has(normalizedName)) {
          seen.add(normalizedName);
          normalized.push(normalizedName);
        }
      } catch (error) {
        void error;
      }
    }
    return normalized.length > 0 ? normalized : null;
  }
  function normalizeCategoryCollection(value) {
    if (value == null) {
      return null;
    }
    var entries = Array.isArray(value) ? value : typeof value === 'string' ? [value] : typeof value[Symbol.iterator] === 'function' ? Array.from(value) : [value];
    var normalized = [];
    var seen = new Set();
    for (var index = 0; index < entries.length; index += 1) {
      var entry = entries[index];
      if (typeof entry !== 'string') {
        continue;
      }
      var trimmed = entry.trim();
      if (!trimmed || seen.has(trimmed)) {
        continue;
      }
      seen.add(trimmed);
      normalized.push(trimmed);
    }
    return normalized.length > 0 ? normalized : null;
  }
  function describeAll() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var normalizedNames = normalizeNameCollection(options && options.names);
    var normalizedCategories = normalizeCategoryCollection(options && (options.categories || options.category || null));
    var namesFilter = normalizedNames ? new Set(normalizedNames) : null;
    var categoryFilter = normalizedCategories ? new Set(normalizedCategories) : null;
    var snapshot = [];
    var sourceNames = namesFilter ? normalizedNames : Object.keys(metadataMap);
    for (var index = 0; index < sourceNames.length; index += 1) {
      var name = sourceNames[index];
      var meta = metadataMap[name];
      if (!meta) {
        continue;
      }
      if (categoryFilter && !categoryFilter.has(meta.category)) {
        continue;
      }
      snapshot.push({
        name: name,
        description: meta.description,
        category: meta.category,
        registeredAt: meta.registeredAt,
        frozen: meta.frozen,
        connections: meta.connections || freezeDeep([])
      });
    }
    if (!namesFilter) {
      var shouldSort = !options || options.sort !== false;
      if (shouldSort) {
        snapshot.sort(function (left, right) {
          return left.name.localeCompare(right.name);
        });
      }
    }
    return freezeDeep(snapshot);
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
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return false;
    }
    try {
      Object.defineProperty(scope, key, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: value
      });
      return true;
    } catch (error) {
      void error;
    }
    try {
      scope[key] = value;
      return true;
    } catch (assignmentError) {
      void assignmentError;
    }
    return false;
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
  function collectQueueScopes(preferredScope) {
    var scopes = [];
    function pushScope(candidate) {
      if (!candidate || _typeof(candidate) !== 'object' && typeof candidate !== 'function') {
        return;
      }
      if (scopes.indexOf(candidate) === -1) {
        scopes.push(candidate);
      }
    }
    pushScope(preferredScope);
    pushScope(GLOBAL_SCOPE);
    if (typeof globalThis !== 'undefined') pushScope(globalThis);
    if (typeof window !== 'undefined') pushScope(window);
    if (typeof self !== 'undefined') pushScope(self);
    if (typeof global !== 'undefined') pushScope(global);
    return scopes;
  }
  function readQueueFromScope(scope) {
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return null;
    }
    try {
      var queue = scope[PENDING_QUEUE_KEY];
      return Array.isArray(queue) ? queue : null;
    } catch (error) {
      void error;
      return null;
    }
  }
  function ensureQueueOnScope(scope) {
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return null;
    }
    var queue = readQueueFromScope(scope);
    if (queue) {
      return queue;
    }
    if (assignHidden(scope, PENDING_QUEUE_KEY, [])) {
      queue = readQueueFromScope(scope);
      if (queue) {
        return queue;
      }
    }
    try {
      scope[PENDING_QUEUE_KEY] = [];
      queue = readQueueFromScope(scope);
      if (queue) {
        return queue;
      }
    } catch (error) {
      void error;
    }
    return null;
  }
  function resolveQueueDescriptor(preferredScope) {
    var scopes = collectQueueScopes(preferredScope);
    for (var index = 0; index < scopes.length; index += 1) {
      var candidate = scopes[index];
      var queue = ensureQueueOnScope(candidate);
      if (queue) {
        return {
          queue: queue,
          scope: candidate
        };
      }
    }
    return null;
  }
  function queueRegistrationPayload(scope, payload) {
    var descriptor = resolveQueueDescriptor(scope || GLOBAL_SCOPE);
    if (!descriptor || !descriptor.queue) {
      return false;
    }
    var record = freezeDeep({
      name: payload && payload.name ? normalizeName(payload.name) : null,
      api: payload ? payload.api : null,
      options: Object.freeze(_objectSpread({}, payload && payload.options ? payload.options : {}))
    });
    var queue = descriptor.queue,
      queueScope = descriptor.scope;
    try {
      queue.push(record);
    } catch (error) {
      void error;
      queue[queue.length] = record;
    }
    try {
      schedulePendingFlush(queueScope);
    } catch (error) {
      void error;
    }
    return true;
  }
  function createBlueprint() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var normalizedName = normalizeName(options.name);
    var normalizedCategory = typeof options.category === 'string' ? options.category.trim() : '';
    if (!normalizedCategory) {
      throw new TypeError("cineModules.createBlueprint(\"".concat(normalizedName, "\") expected a non-empty category string."));
    }
    var normalizedDescription = typeof options.description === 'string' ? options.description.trim() : '';
    if (!normalizedDescription) {
      throw new TypeError("cineModules.createBlueprint(\"".concat(normalizedName, "\") expected a non-empty description."));
    }
    var freezeByDefault = options.freeze !== false;
    var normalizedConnections = freezeDeep(normalizeConnections(options.connections));
    var factory = typeof options.factory === 'function' ? options.factory : null;
    var staticApi = factory ? null : options.api;
    if (!factory && (!staticApi || _typeof(staticApi) !== 'object' && typeof staticApi !== 'function')) {
      throw new TypeError("cineModules.createBlueprint(\"".concat(normalizedName, "\") expected an object API or factory function."));
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
        return Object.freeze(_objectSpread({}, base));
      }
      var normalized = _objectSpread({}, base);
      if (Object.prototype.hasOwnProperty.call(overrides, 'category')) {
        var candidate = typeof overrides.category === 'string' ? overrides.category.trim() : '';
        if (candidate) {
          normalized.category = candidate;
        }
      }
      if (Object.prototype.hasOwnProperty.call(overrides, 'description')) {
        var _candidate = typeof overrides.description === 'string' ? overrides.description.trim() : '';
        if (_candidate) {
          normalized.description = _candidate;
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
        var invocationContext = context && _typeof(context) === 'object' ? _objectSpread({}, context) : {};
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
        var error = new TypeError("cineModules.createBlueprint(\"".concat(normalizedName, "\") factory expected an object or function return value."));
        instantiateError = error;
        throw error;
      }
      cachedApi = freezeByDefault && !Object.isFrozen(produced) ? freezeDeep(produced) : produced;
      return cachedApi;
    }
    function registerBlueprint() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var resolvedRegistry = options && _typeof(options.registry) === 'object' && options.registry ? options.registry : registryReference;
      var registrationOptions = buildRegistrationOptions(options && options.options);
      var scope = options && options.scope ? options.scope : GLOBAL_SCOPE;
      var deferOnError = options && Object.prototype.hasOwnProperty.call(options, 'defer') ? options.defer !== false : true;
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
    describeAll: describeAll,
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