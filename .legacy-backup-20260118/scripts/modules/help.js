function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
  function fallbackExposeGlobal(scope, name, value, options) {
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return false;
    }
    var descriptor = {
      configurable: !options || options.configurable !== false,
      enumerable: !!(options && options.enumerable),
      value: value,
      writable: !!(options && options.writable)
    };
    try {
      Object.defineProperty(scope, name, descriptor);
      return true;
    } catch (error) {
      void error;
    }
    try {
      scope[name] = value;
      return true;
    } catch (assignmentError) {
      void assignmentError;
      return false;
    }
  }
  var GLOBAL_SCOPE = detectGlobalScope();
  function resolveModuleBase(scope) {
    if ((typeof cineModuleBase === "undefined" ? "undefined" : _typeof(cineModuleBase)) === 'object' && cineModuleBase) {
      return cineModuleBase;
    }
    if (typeof require === 'function') {
      try {
        var required = require('./base.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    if (scope && _typeof(scope.cineModuleBase) === 'object') {
      return scope.cineModuleBase;
    }
    return null;
  }
  var MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }
  var freezeDeep = typeof MODULE_BASE.freezeDeep === 'function' ? function freezeWithBase(value) {
    try {
      return MODULE_BASE.freezeDeep(value);
    } catch (error) {
      void error;
    }
    return value;
  } : function identity(value) {
    return value;
  };
  var safeWarn = typeof MODULE_BASE.safeWarn === 'function' ? function warnWithBase(message, detail) {
    try {
      MODULE_BASE.safeWarn(message, detail);
    } catch (error) {
      void error;
    }
  } : function fallbackSafeWarn(message, detail) {
    if (typeof console === 'undefined' || !console || typeof console.warn !== 'function') {
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
  var exposeGlobal = typeof MODULE_BASE.exposeGlobal === 'function' ? function exposeWithBase(name, value, scope, options) {
    var targetScope = scope || GLOBAL_SCOPE;
    try {
      return MODULE_BASE.exposeGlobal(name, value, targetScope, options);
    } catch (error) {
      void error;
    }
    return fallbackExposeGlobal(targetScope, name, value, options);
  } : function exposeFallback(name, value, scope, options) {
    return fallbackExposeGlobal(scope || GLOBAL_SCOPE, name, value, options);
  };
  var collectCandidateScopes = typeof MODULE_BASE.collectCandidateScopes === 'function' ? function collectScopes(primary) {
    try {
      return MODULE_BASE.collectCandidateScopes(primary || GLOBAL_SCOPE) || [];
    } catch (error) {
      void error;
    }
    return [];
  } : function fallbackCollectScopes(primary) {
    var scopes = [];
    var seed = primary || GLOBAL_SCOPE;
    if (seed && scopes.indexOf(seed) === -1) scopes.push(seed);
    if (typeof globalThis !== 'undefined' && scopes.indexOf(globalThis) === -1) scopes.push(globalThis);
    if (typeof window !== 'undefined' && scopes.indexOf(window) === -1) scopes.push(window);
    if (typeof self !== 'undefined' && scopes.indexOf(self) === -1) scopes.push(self);
    if (typeof global !== 'undefined' && scopes.indexOf(global) === -1) scopes.push(global);
    return scopes.filter(Boolean);
  };
  function safeNormalizeSeedName(name) {
    if (typeof name !== 'string') {
      return '';
    }
    var trimmed = name.trim();
    return trimmed && trimmed.length ? trimmed : '';
  }
  function recordSeedEntry(target, name, value) {
    if (!target || typeof target.set !== 'function') {
      return;
    }
    var normalized = safeNormalizeSeedName(name);
    if (!normalized) {
      return;
    }
    if (typeof value === 'function') {
      target.set(normalized, value);
      return;
    }
    if (typeof value === 'string') {
      var text = value.trim();
      if (!text) {
        return;
      }
      target.set(normalized, text);
    }
  }
  function adoptEntriesFromRegistry(storage, registry) {
    if (!storage || !registry) {
      return;
    }
    if (typeof registry.forEach === 'function') {
      try {
        registry.forEach(function (entry, key) {
          if (!entry) {
            return;
          }
          var resolver = typeof entry.resolver === 'function' ? entry.resolver : entry;
          recordSeedEntry(storage, key, resolver);
        });
        return;
      } catch (error) {
        void error;
      }
    }
    if (typeof registry.entries === 'function') {
      try {
        var iterator = registry.entries();
        if (iterator && typeof iterator[Symbol.iterator] === 'function') {
          var _iterator = _createForOfIteratorHelper(iterator),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var pair = _step.value;
              if (!Array.isArray(pair) || pair.length < 2) {
                continue;
              }
              var _pair = _slicedToArray(pair, 2),
                key = _pair[0],
                entry = _pair[1];
              if (!entry) {
                continue;
              }
              var resolver = typeof entry.resolver === 'function' ? entry.resolver : entry;
              recordSeedEntry(storage, key, resolver);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      } catch (error) {
        void error;
      }
    }
  }
  function adoptEntriesFromHelpApi(storage, api) {
    if (!storage || !api || _typeof(api) !== 'object') {
      return;
    }
    if (typeof api.list !== 'function' || typeof api.get !== 'function') {
      return;
    }
    var names = [];
    try {
      names = api.list();
    } catch (error) {
      void error;
      names = [];
    }
    if (!Array.isArray(names) || !names.length) {
      return;
    }
    for (var index = 0; index < names.length; index += 1) {
      var name = names[index];
      var resolver = null;
      try {
        resolver = api.get(name);
      } catch (error) {
        void error;
        resolver = null;
      }
      if (typeof resolver === 'function') {
        recordSeedEntry(storage, name, resolver);
      }
    }
  }
  function adoptEntriesFromHelpModule(storage, moduleCandidate) {
    if (!storage || !moduleCandidate || _typeof(moduleCandidate) !== 'object') {
      return;
    }
    try {
      var internals = moduleCandidate.__internal;
      if (internals && internals.helpRegistry) {
        adoptEntriesFromRegistry(storage, internals.helpRegistry);
      }
    } catch (error) {
      void error;
    }
    try {
      var helpApi = moduleCandidate.help || moduleCandidate;
      adoptEntriesFromHelpApi(storage, helpApi);
    } catch (error) {
      void error;
    }
  }
  function collectExistingHelpEntries(scope) {
    var seeds = new Map();
    var scopes = collectCandidateScopes(scope || GLOBAL_SCOPE);
    var seenScopes = new Set();
    for (var index = 0; index < scopes.length; index += 1) {
      var candidateScope = scopes[index];
      if (!candidateScope || seenScopes.has(candidateScope)) {
        continue;
      }
      seenScopes.add(candidateScope);
      try {
        adoptEntriesFromHelpModule(seeds, candidateScope.cineHelpModule);
      } catch (error) {
        void error;
      }
      try {
        adoptEntriesFromHelpApi(seeds, candidateScope.cineHelp);
      } catch (error) {
        void error;
      }
      try {
        var uiCandidate = candidateScope.cineUi;
        if (uiCandidate && _typeof(uiCandidate) === 'object') {
          if (uiCandidate.__internal && uiCandidate.__internal.helpRegistry) {
            adoptEntriesFromRegistry(seeds, uiCandidate.__internal.helpRegistry);
          }
          adoptEntriesFromHelpApi(seeds, uiCandidate.help);
        }
      } catch (error) {
        void error;
      }
    }
    var entries = [];
    seeds.forEach(function (value, name) {
      entries.push({
        name: name,
        value: value
      });
    });
    return entries;
  }
  function createHelpModule(overrides) {
    var freeze = overrides && typeof overrides.freezeDeep === 'function' ? overrides.freezeDeep : freezeDeep;
    var warn = overrides && typeof overrides.safeWarn === 'function' ? overrides.safeWarn : safeWarn;
    var seeds = overrides && Array.isArray(overrides.seedEntries) ? overrides.seedEntries.slice() : collectExistingHelpEntries(GLOBAL_SCOPE);
    var helpRegistry = new Map();
    var warnedNames = new Set();
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
      return function clonedHelpFunction() {
        return fn.apply(this, arguments);
      };
    }
    function sanitizeHelpEntry(name, value) {
      if (typeof value === 'string') {
        var text = value.trim();
        if (!text) {
          throw new Error("cineUi help entry \"".concat(name, "\" cannot be empty."));
        }
        return freeze({
          resolver: function resolver() {
            return text;
          }
        });
      }
      if (typeof value === 'function') {
        var resolver = cloneFunction(value);
        return freeze({
          resolver: resolver
        });
      }
      throw new TypeError("cineUi help entry \"".concat(name, "\" must be a string or function."));
    }
    function warnDuplicate(name) {
      if (warnedNames.has(name)) {
        return;
      }
      warnedNames.add(name);
      warn("cineUi help \"".concat(name, "\" was replaced. Using the latest registration."));
    }
    function listRegistryKeys() {
      return Array.from(helpRegistry.keys()).sort();
    }
    var helpAPI = freeze({
      register: function register(name, value) {
        var normalized = normalizeName(name);
        var sanitized = sanitizeHelpEntry(normalized, value);
        if (helpRegistry.has(normalized)) {
          warnDuplicate(normalized);
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
        return resolver.apply(null, Array.prototype.slice.call(arguments, 1));
      },
      list: function list() {
        return listRegistryKeys();
      }
    });
    if (Array.isArray(seeds) && seeds.length) {
      for (var index = 0; index < seeds.length; index += 1) {
        var entry = seeds[index];
        if (!entry || typeof entry.name !== 'string') {
          continue;
        }
        var normalized = safeNormalizeSeedName(entry.name);
        if (!normalized) {
          continue;
        }
        var seedValue = entry.value;
        if (typeof seedValue !== 'function' && typeof seedValue !== 'string') {
          continue;
        }
        try {
          helpAPI.register(normalized, seedValue);
        } catch (error) {
          warn("cineHelp could not migrate entry \"".concat(normalized, "\"."), error);
        }
      }
    }
    function clearRegistries() {
      helpRegistry.clear();
      warnedNames.clear();
    }
    var internal = freeze({
      helpRegistry: helpRegistry,
      warnedNames: warnedNames,
      clearRegistries: clearRegistries,
      normalizeName: normalizeName,
      sanitizeHelpEntry: sanitizeHelpEntry
    });
    return freeze({
      help: helpAPI,
      __internal: internal
    });
  }
  function exposeCreationFactory(factory) {
    var scopes = collectCandidateScopes(GLOBAL_SCOPE);
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
        continue;
      }
      var descriptor = {
        configurable: true,
        enumerable: false,
        writable: false,
        value: factory
      };
      try {
        if (!scope.__cineCreateHelpModule) {
          Object.defineProperty(scope, '__cineCreateHelpModule', descriptor);
        }
      } catch (error) {
        void error;
        try {
          if (!scope.__cineCreateHelpModule) {
            scope.__cineCreateHelpModule = factory;
          }
        } catch (assignmentError) {
          void assignmentError;
        }
      }
    }
  }
  var moduleApi = createHelpModule();
  MODULE_BASE.registerOrQueueModule('cineHelp', moduleApi, {
    category: 'ui',
    description: 'Shared registry for in-app help entries and resolvers.',
    replace: true,
    connections: ['cineModuleBase']
  }, function onError(error) {
    safeWarn('Unable to register cineHelp module.', error);
  }, GLOBAL_SCOPE, MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE));
  exposeGlobal('cineHelp', moduleApi.help, GLOBAL_SCOPE, {
    configurable: true,
    enumerable: false,
    writable: false
  });
  exposeGlobal('cineHelpModule', moduleApi, GLOBAL_SCOPE, {
    configurable: true,
    enumerable: false,
    writable: false
  });
  exposeCreationFactory(createHelpModule);
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = moduleApi;
  }
})();