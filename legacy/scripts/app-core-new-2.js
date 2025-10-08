function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _asyncIterator(r) { var n, t, o, e = 2; for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) { if (t && null != (n = r[t])) return n.call(r); if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r)); t = "@@asyncIterator", o = "@@iterator"; } throw new TypeError("Object is not async iterable"); }
function AsyncFromSyncIterator(r) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var n = r.done; return Promise.resolve(r.value).then(function (r) { return { value: r, done: n }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(r) { this.s = r, this.n = r.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, return: function _return(r) { var n = this.s.return; return void 0 === n ? Promise.resolve({ value: r, done: !0 }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); }, throw: function _throw(r) { var n = this.s.return; return void 0 === n ? Promise.reject(r) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(r); }
var CORE_TEMPERATURE_QUEUE_KEY = '__cinePendingTemperatureNote';
var CORE_TEMPERATURE_RENDER_NAME = 'renderTemperatureNote';
var CORE_RUNTIME_CANDIDATE_SCOPES = [typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' ? CORE_GLOBAL_SCOPE : null, typeof globalThis !== 'undefined' && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' ? globalThis : null, typeof window !== 'undefined' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' ? window : null, typeof self !== 'undefined' && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' ? self : null, typeof global !== 'undefined' && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' ? global : null].filter(Boolean);
var CORE_SAFE_FREEZE_REGISTRY = typeof WeakSet === 'function' ? new WeakSet() : [];
function coreSafeFreezeRegistryHas(value) {
  if (!value || !CORE_SAFE_FREEZE_REGISTRY) {
    return false;
  }
  if (typeof CORE_SAFE_FREEZE_REGISTRY.has === 'function') {
    try {
      return CORE_SAFE_FREEZE_REGISTRY.has(value);
    } catch (registryHasError) {
      void registryHasError;
      return false;
    }
  }
  for (var index = 0; index < CORE_SAFE_FREEZE_REGISTRY.length; index += 1) {
    if (CORE_SAFE_FREEZE_REGISTRY[index] === value) {
      return true;
    }
  }
  return false;
}
function coreSafeFreezeRegistryAdd(value) {
  if (!value || !CORE_SAFE_FREEZE_REGISTRY) {
    return;
  }
  if (typeof CORE_SAFE_FREEZE_REGISTRY.add === 'function') {
    try {
      CORE_SAFE_FREEZE_REGISTRY.add(value);
    } catch (registryAddError) {
      void registryAddError;
    }
    return;
  }
  for (var index = 0; index < CORE_SAFE_FREEZE_REGISTRY.length; index += 1) {
    if (CORE_SAFE_FREEZE_REGISTRY[index] === value) {
      return;
    }
  }
  CORE_SAFE_FREEZE_REGISTRY.push(value);
}
function createLocalRuntimeState(candidateScopes) {
  var scopes = [];
  var seenScopes = typeof Set === 'function' ? new Set() : null;
  function registerScope(scope) {
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return;
    }
    if (seenScopes) {
      if (seenScopes.has(scope)) {
        return;
      }
      seenScopes.add(scope);
      scopes.push(scope);
      return;
    }
    if (scopes.indexOf(scope) !== -1) {
      return;
    }
    scopes.push(scope);
  }
  if (Array.isArray(candidateScopes)) {
    for (var initialIndex = 0; initialIndex < candidateScopes.length; initialIndex += 1) {
      try {
        registerScope(candidateScopes[initialIndex]);
      } catch (initialiseScopeError) {
        void initialiseScopeError;
      }
    }
  }
  function withEachScope(callback) {
    if (typeof callback !== 'function') {
      return;
    }
    for (var index = 0; index < scopes.length; index += 1) {
      try {
        callback(scopes[index], index);
      } catch (scopeCallbackError) {
        void scopeCallbackError;
      }
    }
  }
  function getScopes() {
    return scopes.slice();
  }
  function getPrimaryScope() {
    return scopes.length > 0 ? scopes[0] : null;
  }
  function ensureValue(name, fallbackValue) {
    var fallbackProvider = typeof fallbackValue === 'function' ? fallbackValue : function provideStaticFallback() {
      return fallbackValue;
    };
    if (typeof name !== 'string' || !name) {
      try {
        return fallbackProvider();
      } catch (fallbackError) {
        void fallbackError;
        return undefined;
      }
    }
    for (var scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
      var scope = scopes[scopeIndex];
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
        continue;
      }
      try {
        if (typeof scope[name] === 'undefined') {
          scope[name] = fallbackProvider();
        }
        return scope[name];
      } catch (ensureError) {
        void ensureError;
      }
    }
    try {
      return fallbackProvider();
    } catch (fallbackError) {
      void fallbackError;
      return undefined;
    }
  }
  function normaliseValue(name, validator, fallbackValue) {
    var fallbackProvider = typeof fallbackValue === 'function' ? fallbackValue : function provideStaticFallback() {
      return fallbackValue;
    };
    var validate = typeof validator === 'function' ? validator : function alwaysValid() {
      return true;
    };
    withEachScope(function applyNormaliser(scope) {
      try {
        if (!validate(scope[name])) {
          scope[name] = fallbackProvider();
        }
      } catch (normaliseError) {
        void normaliseError;
      }
    });
  }
  function readValue(name) {
    for (var scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
      var scope = scopes[scopeIndex];
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
        continue;
      }
      try {
        if (name in scope) {
          return scope[name];
        }
      } catch (readError) {
        void readError;
      }
    }
    return undefined;
  }
  var assignedTemperatureRenderer = null;
  function assignTemperatureRenderer(renderer) {
    if (typeof renderer !== 'function') {
      return;
    }
    assignedTemperatureRenderer = renderer;
    withEachScope(function applyRenderer(scope) {
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
        return;
      }
      try {
        scope[CORE_TEMPERATURE_RENDER_NAME] = renderer;
        var pending = scope[CORE_TEMPERATURE_QUEUE_KEY];
        if (pending && _typeof(pending) === 'object') {
          if (Object.prototype.hasOwnProperty.call(pending, 'latestHours')) {
            var hours = pending.latestHours;
            if (typeof hours !== 'undefined') {
              try {
                renderer(hours);
              } catch (temperatureRenderError) {
                if (typeof console !== 'undefined' && typeof console.error === 'function') {
                  console.error('Failed to apply pending temperature note render', temperatureRenderError);
                }
              }
            }
          }
          try {
            delete pending.latestHours;
          } catch (clearLatestError) {
            void clearLatestError;
            pending.latestHours = undefined;
          }
        }
      } catch (assignError) {
        void assignError;
      }
    });
  }
  function getAssignedTemperatureRenderer() {
    return assignedTemperatureRenderer;
  }
  var autoGearGuards = {
    isReferenceError: function defaultAutoGearReferenceGuard() {
      return false;
    },
    repair: function defaultAutoGearRepair() {
      return undefined;
    }
  };
  function setAutoGearGuards(nextGuards) {
    if (!nextGuards || _typeof(nextGuards) !== 'object') {
      return;
    }
    if (typeof nextGuards.isReferenceError === 'function') {
      autoGearGuards.isReferenceError = nextGuards.isReferenceError;
    }
    if (typeof nextGuards.repair === 'function') {
      autoGearGuards.repair = nextGuards.repair;
    }
  }
  return {
    registerScope: registerScope,
    withEachScope: withEachScope,
    getScopes: getScopes,
    getPrimaryScope: getPrimaryScope,
    ensureValue: ensureValue,
    normaliseValue: normaliseValue,
    readValue: readValue,
    assignTemperatureRenderer: assignTemperatureRenderer,
    getAssignedTemperatureRenderer: getAssignedTemperatureRenderer,
    autoGearGuards: autoGearGuards,
    setAutoGearGuards: setAutoGearGuards
  };
}
var CORE_RUNTIME_STATE = function resolveCoreRuntimeState() {
  var resolvedState = null;
  for (var index = 0; index < CORE_RUNTIME_CANDIDATE_SCOPES.length; index += 1) {
    var scope = CORE_RUNTIME_CANDIDATE_SCOPES[index];
    if (scope && _typeof(scope.__cineRuntimeState) === 'object') {
      resolvedState = scope.__cineRuntimeState;
      break;
    }
  }
  if (!resolvedState) {
    for (var factoryIndex = 0; factoryIndex < CORE_RUNTIME_CANDIDATE_SCOPES.length; factoryIndex += 1) {
      var factoryScope = CORE_RUNTIME_CANDIDATE_SCOPES[factoryIndex];
      var createRuntimeState = factoryScope && typeof factoryScope.__cineCreateRuntimeState === 'function' ? factoryScope.__cineCreateRuntimeState : null;
      if (typeof createRuntimeState === 'function') {
        try {
          resolvedState = createRuntimeState(CORE_RUNTIME_CANDIDATE_SCOPES);
        } catch (createStateError) {
          resolvedState = null;
          void createStateError;
        }
        if (resolvedState) {
          break;
        }
      }
    }
  }
  if (!resolvedState) {
    resolvedState = createLocalRuntimeState(CORE_RUNTIME_CANDIDATE_SCOPES);
  }
  var primaryScope = CORE_RUNTIME_CANDIDATE_SCOPES.length ? CORE_RUNTIME_CANDIDATE_SCOPES[0] : null;
  if (primaryScope && resolvedState) {
    try {
      Object.defineProperty(primaryScope, '__cineRuntimeState', {
        configurable: true,
        enumerable: false,
        writable: true,
        value: resolvedState
      });
    } catch (defineStateError) {
      try {
        primaryScope.__cineRuntimeState = resolvedState;
      } catch (assignStateError) {
        void assignStateError;
      }
      void defineStateError;
    }
  }
  return resolvedState;
}();
function registerRuntimeScope(scope) {
  if (!CORE_RUNTIME_STATE || typeof CORE_RUNTIME_STATE.registerScope !== 'function') {
    return;
  }
  try {
    CORE_RUNTIME_STATE.registerScope(scope);
  } catch (registerError) {
    void registerError;
  }
}
for (var CORE_RUNTIME_SCOPE_INDEX = 0; CORE_RUNTIME_SCOPE_INDEX < CORE_RUNTIME_CANDIDATE_SCOPES.length; CORE_RUNTIME_SCOPE_INDEX += 1) {
  registerRuntimeScope(CORE_RUNTIME_CANDIDATE_SCOPES[CORE_RUNTIME_SCOPE_INDEX]);
}
function getCoreRuntimeScopesSnapshot() {
  if (CORE_RUNTIME_STATE && typeof CORE_RUNTIME_STATE.getScopes === 'function') {
    try {
      return CORE_RUNTIME_STATE.getScopes();
    } catch (scopeReadError) {
      void scopeReadError;
    }
  }
  return CORE_RUNTIME_CANDIDATE_SCOPES.slice();
}
var CORE_PART2_RUNTIME_SCOPE = CORE_RUNTIME_STATE && typeof CORE_RUNTIME_STATE.getPrimaryScope === 'function' ? CORE_RUNTIME_STATE.getPrimaryScope() : null;
if (!CORE_PART2_RUNTIME_SCOPE) {
  CORE_PART2_RUNTIME_SCOPE = getCoreRuntimeScopesSnapshot().length ? getCoreRuntimeScopesSnapshot()[0] : null;
}
function assignCoreTemperatureNoteRenderer(renderer) {
  if (!CORE_RUNTIME_STATE || typeof CORE_RUNTIME_STATE.assignTemperatureRenderer !== 'function') {
    return;
  }
  CORE_RUNTIME_STATE.assignTemperatureRenderer(renderer);
}
function readGlobalScopeValue(name) {
  if (CORE_RUNTIME_STATE && typeof CORE_RUNTIME_STATE.readValue === 'function') {
    return CORE_RUNTIME_STATE.readValue(name);
  }
  var scopes = getCoreRuntimeScopesSnapshot();
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope || _typeof(scope) !== 'object') {
      continue;
    }
    try {
      if (name in scope) {
        return scope[name];
      }
    } catch (readError) {
      void readError;
    }
  }
  return undefined;
}
function ensureGlobalFallback(name, fallbackValue) {
  if (CORE_RUNTIME_STATE && typeof CORE_RUNTIME_STATE.ensureValue === 'function') {
    return CORE_RUNTIME_STATE.ensureValue(name, fallbackValue);
  }
  var fallbackProvider = typeof fallbackValue === 'function' ? fallbackValue : function provideStaticFallback() {
    return fallbackValue;
  };
  var scopes = getCoreRuntimeScopesSnapshot();
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    try {
      if (typeof scope[name] === 'undefined') {
        scope[name] = fallbackProvider();
      }
      return scope[name];
    } catch (ensureError) {
      void ensureError;
    }
  }
  try {
    return fallbackProvider();
  } catch (fallbackError) {
    void fallbackError;
    return undefined;
  }
}
function normaliseGlobalValue(name, validator, fallbackValue) {
  if (CORE_RUNTIME_STATE && typeof CORE_RUNTIME_STATE.normaliseValue === 'function') {
    CORE_RUNTIME_STATE.normaliseValue(name, validator, fallbackValue);
    return;
  }
  var fallbackProvider = typeof fallbackValue === 'function' ? fallbackValue : function provideStaticFallback() {
    return fallbackValue;
  };
  var scopes = getCoreRuntimeScopesSnapshot();
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    try {
      if (!validator(scope[name])) {
        scope[name] = fallbackProvider();
      }
    } catch (normaliseError) {
      void normaliseError;
    }
  }
}
var AUTO_GEAR_GLOBAL_FALLBACKS = {
  autoGearAutoPresetId: function provideAutoGearAutoPresetId() {
    return '';
  },
  baseAutoGearRules: function provideBaseAutoGearRules() {
    return [];
  },
  autoGearScenarioModeSelect: function provideAutoGearScenarioModeSelect() {
    return null;
  },
  autoGearRuleNameInput: function provideAutoGearRuleNameInput() {
    return null;
  },
  autoGearSummaryFocus: function provideAutoGearSummaryFocus() {
    return 'all';
  },
  autoGearMonitorDefaultControls: function provideAutoGearMonitorDefaultControls() {
    return [];
  },
  safeGenerateConnectorSummary: function provideSafeGenerateConnectorSummary() {
    return createFallbackSafeGenerateConnectorSummary();
  },
  totalPowerElem: function provideTotalPowerElem() {
    return null;
  }
};
var AUTO_GEAR_REFERENCE_NAMES = Object.keys(AUTO_GEAR_GLOBAL_FALLBACKS);
function isAutoGearGlobalReferenceError(error) {
  if (!error || _typeof(error) !== 'object') {
    return false;
  }
  var message = typeof error.message === 'string' ? error.message : '';
  return error.name === 'ReferenceError' && AUTO_GEAR_REFERENCE_NAMES.some(function checkAutoGearReferenceName(name) {
    return message.indexOf(name) !== -1;
  });
}
function ensureAutoGearGlobal(scope, name) {
  var createFallback = AUTO_GEAR_GLOBAL_FALLBACKS[name];
  if (typeof createFallback !== 'function') {
    return;
  }
  var fallbackValue = createFallback();
  if (typeof scope[name] === 'undefined') {
    try {
      scope[name] = fallbackValue;
    } catch (assignmentError) {
      try {
        Object.defineProperty(scope, name, {
          configurable: true,
          writable: true,
          enumerable: false,
          value: fallbackValue
        });
      } catch (defineError) {
        void defineError;
      }
    }
  }
  try {
    var globalFn = scope && scope.Function || Function;
    if (typeof globalFn === 'function') {
      var binder = globalFn('value', 'if (typeof ' + name + " === 'undefined') { var " + name + " = value; } else { " + name + ' = value; }\n           return ' + name + ';');
      var appliedValue = typeof scope[name] === 'undefined' ? fallbackValue : scope[name];
      binder(appliedValue);
    }
  } catch (bindingError) {
    void bindingError;
  }
}
function repairAutoGearGlobals(scope) {
  if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
    return;
  }
  for (var index = 0; index < AUTO_GEAR_REFERENCE_NAMES.length; index += 1) {
    var name = AUTO_GEAR_REFERENCE_NAMES[index];
    try {
      ensureAutoGearGlobal(scope, name);
    } catch (ensureError) {
      void ensureError;
    }
  }
}
if (CORE_RUNTIME_STATE && typeof CORE_RUNTIME_STATE.setAutoGearGuards === 'function') {
  try {
    CORE_RUNTIME_STATE.setAutoGearGuards({
      isReferenceError: isAutoGearGlobalReferenceError,
      repair: repairAutoGearGlobals
    });
  } catch (setAutoGearGuardsError) {
    void setAutoGearGuardsError;
  }
}
ensureGlobalFallback('autoGearAutoPresetId', '');
ensureGlobalFallback('baseAutoGearRules', function () {
  return [];
});
ensureGlobalFallback('autoGearScenarioModeSelect', null);
function createFallbackSafeGenerateConnectorSummary() {
  return function safeGenerateConnectorSummary(device) {
    if (!device || _typeof(device) !== 'object') {
      return '';
    }
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('Using fallback connector summary generator. Core bindings may have failed to initialise.');
    }
    try {
      var keys = Object.keys(device);
      if (!keys.length) {
        return '';
      }
      var primaryKey = keys[0];
      var value = device[primaryKey];
      var label = typeof primaryKey === 'string' ? primaryKey.replace(/_/g, ' ') : 'connector';
      return value ? "".concat(label, ": ").concat(value) : label;
    } catch (fallbackError) {
      void fallbackError;
      return '';
    }
  };
}
ensureGlobalFallback('safeGenerateConnectorSummary', function () {
  return createFallbackSafeGenerateConnectorSummary();
});
normaliseGlobalValue('baseAutoGearRules', function validateBaseAutoGearRules(value) {
  return Array.isArray(value);
}, function provideBaseAutoGearRulesFallback() {
  return [];
});
normaliseGlobalValue('safeGenerateConnectorSummary', function validateSafeGenerateConnectorSummary(value) {
  return typeof value === 'function';
}, function provideSafeGenerateConnectorSummaryFallback() {
  return createFallbackSafeGenerateConnectorSummary();
});
function createFallbackIconFontKeys() {
  return Object.freeze({
    ESSENTIAL: 'essential',
    FILM: 'film',
    GADGET: 'gadget',
    UICONS: 'uicons',
    TEXT: 'text'
  });
}
ensureGlobalFallback('ICON_FONT_KEYS', function () {
  return createFallbackIconFontKeys();
});
ensureGlobalFallback('iconGlyph', function () {
  var iconFontKeys = ensureGlobalFallback('ICON_FONT_KEYS', function () {
    return createFallbackIconFontKeys();
  });
  var fallbackFont = iconFontKeys && typeof iconFontKeys.UICONS === 'string' ? iconFontKeys.UICONS : 'uicons';
  return function fallbackIconGlyph(char, font) {
    var glyphChar = typeof char === 'string' ? char : '';
    var resolvedFont = font && typeof font === 'string' ? font : fallbackFont;
    try {
      return Object.freeze({
        char: glyphChar,
        font: resolvedFont
      });
    } catch (freezeError) {
      void freezeError;
      return {
        char: glyphChar,
        font: resolvedFont
      };
    }
  };
});
var autoGearAutoPresetId;
if (typeof autoGearAutoPresetId === 'undefined') {
  autoGearAutoPresetId = '';
} else if (typeof autoGearAutoPresetId !== 'string') {
  autoGearAutoPresetId = '';
}
var baseAutoGearRules;
if (typeof baseAutoGearRules === 'undefined') {
  baseAutoGearRules = [];
} else if (!Array.isArray(baseAutoGearRules)) {
  baseAutoGearRules = [];
}
var autoGearScenarioModeSelect;
if (typeof autoGearScenarioModeSelect === 'undefined') {
  autoGearScenarioModeSelect = null;
}
var safeGenerateConnectorSummary;
if (typeof safeGenerateConnectorSummary === 'undefined') {
  safeGenerateConnectorSummary = createFallbackSafeGenerateConnectorSummary();
} else if (typeof safeGenerateConnectorSummary !== 'function') {
  safeGenerateConnectorSummary = createFallbackSafeGenerateConnectorSummary();
}
function ensureCorePart2Placeholder(name, fallbackValue) {
  var providers = [CORE_PART2_RUNTIME_SCOPE && _typeof(CORE_PART2_RUNTIME_SCOPE) === 'object' ? CORE_PART2_RUNTIME_SCOPE : null, typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' ? CORE_GLOBAL_SCOPE : null, typeof globalThis !== 'undefined' && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' ? globalThis : null, typeof window !== 'undefined' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' ? window : null, typeof self !== 'undefined' && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' ? self : null, typeof global !== 'undefined' && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' ? global : null].filter(Boolean);
  var fallbackProvider = typeof fallbackValue === 'function' ? fallbackValue : function provideStaticFallback() {
    return fallbackValue;
  };
  for (var index = 0; index < providers.length; index += 1) {
    var scope = providers[index];
    try {
      if (typeof scope[name] === 'undefined') {
        scope[name] = fallbackProvider();
      }
      return scope[name];
    } catch (placeholderError) {
      void placeholderError;
    }
  }
  return fallbackProvider();
}
ensureCorePart2Placeholder('autoGearAutoPresetId', '');
ensureCorePart2Placeholder('baseAutoGearRules', function () {
  return [];
});
ensureCorePart2Placeholder('autoGearScenarioModeSelect', null);
ensureCorePart2Placeholder('safeGenerateConnectorSummary', function () {
  return createFallbackSafeGenerateConnectorSummary();
});
function resolveInitialPart2Value(name) {
  var candidates = [CORE_PART2_RUNTIME_SCOPE && _typeof(CORE_PART2_RUNTIME_SCOPE) === 'object' ? CORE_PART2_RUNTIME_SCOPE : null, typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' ? CORE_GLOBAL_SCOPE : null, typeof globalThis !== 'undefined' && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' ? globalThis : null, typeof window !== 'undefined' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' ? window : null, typeof self !== 'undefined' && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' ? self : null, typeof global !== 'undefined' && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' ? global : null].filter(Boolean);
  for (var index = 0; index < candidates.length; index += 1) {
    var scope = candidates[index];
    if (!scope || _typeof(scope) !== 'object') {
      continue;
    }
    try {
      if (name in scope) {
        var value = scope[name];
        if (typeof value !== 'undefined') {
          return value;
        }
      }
    } catch (readError) {
      void readError;
    }
  }
  return undefined;
}
var autoGearAutoPresetIdSeed = resolveInitialPart2Value('autoGearAutoPresetId');
var autoGearAutoPresetIdState = typeof autoGearAutoPresetIdSeed === 'string' ? autoGearAutoPresetIdSeed : '';
var baseAutoGearRulesSeed = resolveInitialPart2Value('baseAutoGearRules');
var baseAutoGearRulesState = Array.isArray(baseAutoGearRulesSeed) ? baseAutoGearRulesSeed : [];
var autoGearScenarioModeSelectSeed = resolveInitialPart2Value('autoGearScenarioModeSelect');
var autoGearScenarioModeSelectRef = autoGearScenarioModeSelectSeed && _typeof(autoGearScenarioModeSelectSeed) === 'object' ? autoGearScenarioModeSelectSeed : null;
var safeGenerateConnectorSummarySeed = resolveInitialPart2Value('safeGenerateConnectorSummary');
var safeGenerateConnectorSummaryFn = typeof safeGenerateConnectorSummarySeed === 'function' ? safeGenerateConnectorSummarySeed : createFallbackSafeGenerateConnectorSummary();
var connectorSummaryWarningIssued = false;
function generateSafeConnectorSummary(device) {
  var candidates = [];
  if (typeof safeGenerateConnectorSummaryFn === 'function') {
    candidates.push(safeGenerateConnectorSummaryFn);
  }
  var globalSafeSummary = readGlobalScopeValue('safeGenerateConnectorSummary');
  if (typeof globalSafeSummary === 'function') {
    candidates.push(globalSafeSummary);
  }
  if (typeof CORE_SHARED !== 'undefined' && CORE_SHARED && typeof CORE_SHARED.safeGenerateConnectorSummary === 'function') {
    candidates.push(CORE_SHARED.safeGenerateConnectorSummary);
  }
  for (var index = 0; index < candidates.length; index += 1) {
    var generator = candidates[index];
    try {
      var summary = generator(device);
      if (typeof summary === 'string') {
        return summary;
      }
      if (typeof summary === 'undefined' || summary === null) {
        continue;
      }
      return String(summary);
    } catch (error) {
      if (!connectorSummaryWarningIssued) {
        connectorSummaryWarningIssued = true;
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Failed to generate connector summary. Falling back to empty summary.', error);
        }
      }
    }
  }
  return '';
}
if (CORE_PART2_RUNTIME_SCOPE && CORE_PART2_RUNTIME_SCOPE.__cineCorePart2Initialized) {
  if (typeof console !== 'undefined' && typeof console.warn === 'function') {
    console.warn('Cine Power Planner core runtime (part 2) already initialized. Skipping duplicate load.');
  }
} else {
  if (CORE_PART2_RUNTIME_SCOPE) {
    try {
      Object.defineProperty(CORE_PART2_RUNTIME_SCOPE, '__cineCorePart2Initialized', {
        configurable: true,
        writable: true,
        value: true
      });
    } catch (corePart2InitError) {
      CORE_PART2_RUNTIME_SCOPE.__cineCorePart2Initialized = true;
      void corePart2InitError;
    }
  }
  var CORE_PART1_RUNNER = CORE_PART2_RUNTIME_SCOPE && CORE_PART2_RUNTIME_SCOPE.__cineCorePart1Runner;
  function corePart2Runtime() {
    var CORE_SHARED_SCOPE_PART2 = CORE_PART2_RUNTIME_SCOPE;
    function resolveCoreSharedPart2() {
      if (CORE_SHARED_SCOPE_PART2 && CORE_SHARED_SCOPE_PART2.cineCoreShared) {
        return CORE_SHARED_SCOPE_PART2.cineCoreShared;
      }
      if (typeof require === 'function') {
        try {
          return require('./modules/core-shared.js');
        } catch (error) {
          void error;
        }
      }
      return null;
    }
    var CORE_SHARED_LOCAL = typeof CORE_SHARED !== 'undefined' && CORE_SHARED ? CORE_SHARED : resolveCoreSharedPart2() || {};
    function fallbackNormalizeAutoGearWeightOperator(value) {
      if (typeof value !== 'string') return 'greater';
      var normalized = value.trim().toLowerCase();
      if (!normalized) return 'greater';
      if (normalized === '>' || normalized === 'gt' || normalized === 'greaterthan' || normalized === 'above' || normalized === 'over') {
        return 'greater';
      }
      if (normalized === '<' || normalized === 'lt' || normalized === 'lessthan' || normalized === 'below' || normalized === 'under') {
        return 'less';
      }
      if (normalized === '=' || normalized === '==' || normalized === 'equal' || normalized === 'equals' || normalized === 'exactly' || normalized === 'match' || normalized === 'matches') {
        return 'equal';
      }
      return 'greater';
    }
    function fallbackNormalizeAutoGearWeightValue(value) {
      if (typeof value === 'number' && Number.isFinite(value)) {
        var rounded = Math.round(value);
        return rounded >= 0 ? rounded : null;
      }
      if (typeof value === 'string') {
        var trimmed = value.trim();
        if (!trimmed) return null;
        var sanitized = trimmed.replace(/[^0-9.,-]/g, '').replace(/,/g, '.');
        if (!sanitized) return null;
        var parsed = Number.parseFloat(sanitized);
        if (!Number.isFinite(parsed)) return null;
        var _rounded = Math.round(parsed);
        return _rounded >= 0 ? _rounded : null;
      }
      return null;
    }
    function fallbackFormatAutoGearWeight(value) {
      if (!Number.isFinite(value)) return '';
      try {
        if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
          return new Intl.NumberFormat().format(value);
        }
      } catch (error) {
        void error;
      }
      return String(value);
    }
    var normalizeAutoGearWeightOperator = typeof CORE_SHARED_LOCAL.normalizeAutoGearWeightOperator === 'function' ? CORE_SHARED_LOCAL.normalizeAutoGearWeightOperator : fallbackNormalizeAutoGearWeightOperator;
    var normalizeAutoGearWeightValue = typeof CORE_SHARED_LOCAL.normalizeAutoGearWeightValue === 'function' ? CORE_SHARED_LOCAL.normalizeAutoGearWeightValue : fallbackNormalizeAutoGearWeightValue;
    var normalizeAutoGearCameraWeightCondition = typeof CORE_SHARED_LOCAL.normalizeAutoGearCameraWeightCondition === 'function' ? CORE_SHARED_LOCAL.normalizeAutoGearCameraWeightCondition : function normalizeAutoGearCameraWeightCondition() {
      return null;
    };
    var formatAutoGearWeight = typeof CORE_SHARED_LOCAL.formatAutoGearWeight === 'function' ? CORE_SHARED_LOCAL.formatAutoGearWeight : fallbackFormatAutoGearWeight;
    var getAutoGearCameraWeightOperatorLabel = typeof CORE_SHARED_LOCAL.getAutoGearCameraWeightOperatorLabel === 'function' ? CORE_SHARED_LOCAL.getAutoGearCameraWeightOperatorLabel : function getAutoGearCameraWeightOperatorLabel(operator, langTexts) {
      var textsForLang = langTexts || {};
      var fallbackTexts = CORE_GLOBAL_SCOPE && CORE_GLOBAL_SCOPE.texts && CORE_GLOBAL_SCOPE.texts.en || {};
      var normalized = normalizeAutoGearWeightOperator(operator);
      if (normalized === 'less') {
        return textsForLang.autoGearCameraWeightOperatorLess || fallbackTexts.autoGearCameraWeightOperatorLess || 'Lighter than';
      }
      if (normalized === 'equal') {
        return textsForLang.autoGearCameraWeightOperatorEqual || fallbackTexts.autoGearCameraWeightOperatorEqual || 'Exactly';
      }
      return textsForLang.autoGearCameraWeightOperatorGreater || fallbackTexts.autoGearCameraWeightOperatorGreater || 'Heavier than';
    };
    var formatAutoGearCameraWeight = typeof CORE_SHARED_LOCAL.formatAutoGearCameraWeight === 'function' ? CORE_SHARED_LOCAL.formatAutoGearCameraWeight : function formatAutoGearCameraWeight(condition, langTexts) {
      if (!condition || !Number.isFinite(condition.value)) return '';
      var label = getAutoGearCameraWeightOperatorLabel(condition.operator, langTexts);
      var formattedValue = formatAutoGearWeight(condition.value);
      return "".concat(label, " ").concat(formattedValue, " g");
    };
    var CORE_RUNTIME_SCOPE_CANDIDATES = [CORE_PART2_RUNTIME_SCOPE && _typeof(CORE_PART2_RUNTIME_SCOPE) === 'object' ? CORE_PART2_RUNTIME_SCOPE : null, typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' ? CORE_GLOBAL_SCOPE : null, typeof globalThis !== 'undefined' && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' ? globalThis : null, typeof window !== 'undefined' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' ? window : null, typeof self !== 'undefined' && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' ? self : null, typeof global !== 'undefined' && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' ? global : null].filter(Boolean);
    function readCoreScopeValue(name) {
      for (var index = 0; index < CORE_RUNTIME_SCOPE_CANDIDATES.length; index += 1) {
        var scope = CORE_RUNTIME_SCOPE_CANDIDATES[index];
        if (!scope || _typeof(scope) !== 'object') {
          continue;
        }
        try {
          if (name in scope) {
            var value = scope[name];
            if (typeof value !== 'undefined') {
              return value;
            }
          }
        } catch (readError) {
          void readError;
        }
      }
      return undefined;
    }
    function writeCoreScopeValue(name, value) {
      for (var index = 0; index < CORE_RUNTIME_SCOPE_CANDIDATES.length; index += 1) {
        var scope = CORE_RUNTIME_SCOPE_CANDIDATES[index];
        if (!scope || _typeof(scope) !== 'object') {
          continue;
        }
        try {
          scope[name] = value;
          return true;
        } catch (assignError) {
          void assignError;
        }
        try {
          Object.defineProperty(scope, name, {
            configurable: true,
            writable: true,
            value: value
          });
          return true;
        } catch (defineError) {
          void defineError;
        }
      }
      return false;
    }
    function declareCoreFallbackBinding(name, factory) {
      var existing = readCoreScopeValue(name);
      if (typeof existing !== 'undefined') {
        return existing;
      }
      var fallbackValue = typeof factory === 'function' ? factory() : factory;
      writeCoreScopeValue(name, fallbackValue);
      return fallbackValue;
    }
    autoGearAutoPresetIdState = declareCoreFallbackBinding('autoGearAutoPresetId', function () {
      if (typeof loadAutoGearAutoPresetId === 'function') {
        try {
          var storedId = loadAutoGearAutoPresetId();
          return typeof storedId === 'string' ? storedId : '';
        } catch (error) {
          if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error('Failed to recover automatic gear auto preset identifier from storage.', error);
          }
        }
      }
      return '';
    });
    baseAutoGearRulesState = declareCoreFallbackBinding('baseAutoGearRules', function () {
      if (typeof loadAutoGearRules === 'function') {
        try {
          var storedRules = loadAutoGearRules();
          return Array.isArray(storedRules) ? storedRules.slice() : [];
        } catch (error) {
          if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error('Failed to recover automatic gear rules from storage.', error);
          }
        }
      }
      return [];
    });
    autoGearScenarioModeSelectRef = declareCoreFallbackBinding('autoGearScenarioModeSelect', function () {
      return null;
    });
    safeGenerateConnectorSummaryFn = declareCoreFallbackBinding('safeGenerateConnectorSummary', function () {
      return createFallbackSafeGenerateConnectorSummary();
    });
    var currentProjectInfo = null;
    var loadedSetupState = null;
    var loadedSetupStateSignature = '';
    var restoringSession = false;
    var skipNextGearListRefresh = false;
    var defaultProjectInfoSnapshot = null;
    var CORE_BOOT_QUEUE_KEY_PART2 = function resolveBootQueueKeyPart2(scope) {
      if (scope && _typeof(scope) === 'object') {
        var existingPublic = scope.CORE_BOOT_QUEUE_KEY;
        var existingHidden = scope.__cineCoreBootQueueKey;
        if (typeof existingPublic === 'string' && existingPublic) {
          return existingPublic;
        }
        if (typeof existingHidden === 'string' && existingHidden) {
          return existingHidden;
        }
      }
      return '__coreRuntimeBootQueue';
    }(CORE_SHARED_SCOPE_PART2);
    var CORE_BOOT_QUEUE_PART2 = function bootstrapCoreBootQueuePart2(existingQueue) {
      if (Array.isArray(existingQueue)) {
        return existingQueue;
      }
      if (CORE_SHARED_SCOPE_PART2 && _typeof(CORE_SHARED_SCOPE_PART2) === 'object') {
        var shared = CORE_SHARED_SCOPE_PART2.cineCoreShared;
        if (shared && _typeof(shared) === 'object') {
          var sharedQueue = shared[CORE_BOOT_QUEUE_KEY_PART2];
          if (Array.isArray(sharedQueue)) {
            return sharedQueue;
          }
          if (Object.isExtensible(shared)) {
            shared[CORE_BOOT_QUEUE_KEY_PART2] = [];
            return shared[CORE_BOOT_QUEUE_KEY_PART2];
          }
        }
        if (!Array.isArray(CORE_SHARED_SCOPE_PART2.CORE_BOOT_QUEUE)) {
          CORE_SHARED_SCOPE_PART2.CORE_BOOT_QUEUE = [];
        }
        return CORE_SHARED_SCOPE_PART2.CORE_BOOT_QUEUE;
      }
      return [];
    }(CORE_SHARED_SCOPE_PART2 && CORE_SHARED_SCOPE_PART2.CORE_BOOT_QUEUE);
    if (CORE_SHARED_SCOPE_PART2 && CORE_SHARED_SCOPE_PART2.CORE_BOOT_QUEUE !== CORE_BOOT_QUEUE_PART2) {
      CORE_SHARED_SCOPE_PART2.CORE_BOOT_QUEUE = CORE_BOOT_QUEUE_PART2;
    }
    function flushCoreBootQueue() {
      if (!Array.isArray(CORE_BOOT_QUEUE_PART2) || CORE_BOOT_QUEUE_PART2.length === 0) {
        return;
      }
      var pending = CORE_BOOT_QUEUE_PART2.splice(0, CORE_BOOT_QUEUE_PART2.length);
      for (var index = 0; index < pending.length; index += 1) {
        var task = pending[index];
        if (typeof task !== 'function') {
          continue;
        }
        try {
          task();
        } catch (taskError) {
          if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error('Core boot task failed', taskError);
          }
        }
      }
    }
    function fallbackStableStringify(value) {
      if (value === null) return 'null';
      if (value === undefined) return 'undefined';
      if (Array.isArray(value)) {
        return "[".concat(value.map(function (item) {
          return fallbackStableStringify(item);
        }).join(','), "]");
      }
      if (_typeof(value) === 'object') {
        var keys = Object.keys(value).sort();
        var entries = keys.map(function (key) {
          return "".concat(JSON.stringify(key), ":").concat(fallbackStableStringify(value[key]));
        });
        return "{".concat(entries.join(','), "}");
      }
      return JSON.stringify(value);
    }
    var FALLBACK_HUMANIZE_OVERRIDES_PART2 = {
      powerDrawWatts: 'Power (W)',
      capacity: 'Capacity (Wh)',
      pinA: 'Pin A',
      dtapA: 'D-Tap A',
      mount_type: 'Mount',
      screenSizeInches: 'Screen Size (in)',
      brightnessNits: 'Brightness (nits)',
      torqueNm: 'Torque (Nm)',
      internalController: 'Internal Controller',
      powerSource: 'Power Source',
      batteryType: 'Battery Type',
      connectivity: 'Connectivity'
    };
    var AUTO_GEAR_ANY_MOTOR_TOKEN_LOCAL = typeof globalThis !== 'undefined' && globalThis.AUTO_GEAR_ANY_MOTOR_TOKEN ? globalThis.AUTO_GEAR_ANY_MOTOR_TOKEN : '__any__';
    function fallbackHumanizeKey(key) {
      if (key && Object.prototype.hasOwnProperty.call(FALLBACK_HUMANIZE_OVERRIDES_PART2, key)) {
        return FALLBACK_HUMANIZE_OVERRIDES_PART2[key];
      }
      var stringValue = typeof key === 'string' ? key : String(key || '');
      return stringValue.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').replace(/^./, function (c) {
        return c.toUpperCase();
      });
    }
    var coreStableStringify = typeof CORE_SHARED_LOCAL.stableStringify === 'function' ? CORE_SHARED_LOCAL.stableStringify : fallbackStableStringify;
    var coreHumanizeKey = typeof CORE_SHARED_LOCAL.humanizeKey === 'function' ? CORE_SHARED_LOCAL.humanizeKey : fallbackHumanizeKey;
    var sharedDeviceManagerLists = function () {
      var candidates = [CORE_PART2_RUNTIME_SCOPE && _typeof(CORE_PART2_RUNTIME_SCOPE) === 'object' ? CORE_PART2_RUNTIME_SCOPE : null, typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' ? CORE_GLOBAL_SCOPE : null, typeof globalThis !== 'undefined' && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' ? globalThis : null, typeof window !== 'undefined' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' ? window : null, typeof self !== 'undefined' && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' ? self : null, typeof global !== 'undefined' && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' ? global : null].filter(Boolean);
      for (var index = 0; index < candidates.length; index += 1) {
        var scope = candidates[index];
        if (scope && scope.deviceManagerLists instanceof Map) {
          return scope.deviceManagerLists;
        }
      }
      var fallback = new Map();
      var assignTarget = candidates.find(function (scope) {
        return scope && Object.isExtensible(scope);
      });
      if (assignTarget) {
        try {
          assignTarget.deviceManagerLists = fallback;
        } catch (assignError) {
          void assignError;
          try {
            Object.defineProperty(assignTarget, 'deviceManagerLists', {
              configurable: true,
              writable: true,
              value: fallback
            });
          } catch (defineError) {
            void defineError;
          }
        }
      }
      return fallback;
    }();
    var activeDeviceManagerLists = function () {
      var candidateScopes = [CORE_PART2_RUNTIME_SCOPE && _typeof(CORE_PART2_RUNTIME_SCOPE) === 'object' ? CORE_PART2_RUNTIME_SCOPE : null, CORE_SHARED_SCOPE_PART2 && _typeof(CORE_SHARED_SCOPE_PART2) === 'object' ? CORE_SHARED_SCOPE_PART2 : null, typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' ? CORE_GLOBAL_SCOPE : null, typeof globalThis !== 'undefined' && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' ? globalThis : null, typeof window !== 'undefined' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' ? window : null, typeof self !== 'undefined' && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' ? self : null, typeof global !== 'undefined' && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' ? global : null].filter(Boolean);
      for (var index = 0; index < candidateScopes.length; index += 1) {
        var scope = candidateScopes[index];
        var existing = scope && scope.deviceManagerLists;
        if (existing instanceof Map) {
          return existing;
        }
      }
      var fallback = sharedDeviceManagerLists instanceof Map ? sharedDeviceManagerLists : new Map();
      for (var _index = 0; _index < candidateScopes.length; _index += 1) {
        var _scope = candidateScopes[_index];
        if (!_scope) continue;
        var extensible = typeof Object.isExtensible === 'function' ? Object.isExtensible(_scope) : true;
        if (!extensible) continue;
        try {
          _scope.deviceManagerLists = fallback;
        } catch (assignError) {
          void assignError;
          try {
            Object.defineProperty(_scope, 'deviceManagerLists', {
              configurable: true,
              writable: true,
              value: fallback
            });
          } catch (defineError) {
            void defineError;
          }
        }
      }
      return fallback;
    }();
    function callCoreFunctionFromPart2(functionName) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (typeof callCoreFunctionIfAvailable === 'function') {
        return callCoreFunctionIfAvailable(functionName, args, options);
      }
      var scope = CORE_SHARED_SCOPE_PART2 || (typeof globalThis !== 'undefined' ? globalThis : null) || (typeof window !== 'undefined' ? window : null) || (typeof self !== 'undefined' ? self : null) || (typeof global !== 'undefined' ? global : null);
      var target = typeof functionName === 'string' ? scope && scope[functionName] : functionName;
      if (typeof target === 'function') {
        try {
          return target.apply(scope, args);
        } catch (invokeError) {
          if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error("Failed to invoke ".concat(functionName), invokeError);
          }
        }
        return undefined;
      }
      if (options && options.defer === true && Array.isArray(CORE_BOOT_QUEUE_PART2)) {
        CORE_BOOT_QUEUE_PART2.push(function () {
          callCoreFunctionFromPart2(functionName, args, _objectSpread(_objectSpread({}, options), {}, {
            defer: false
          }));
        });
      }
      return options && Object.prototype.hasOwnProperty.call(options, 'defaultValue') ? options.defaultValue : undefined;
    }
    function refreshAutoGearCrewOptions(selectElement, selected, key) {
      if (!selectElement) return;
      var selectedValues = collectAutoGearSelectedValues(selected, key);
      selectElement.innerHTML = '';
      selectElement.multiple = true;
      var entries = getCrewRoleEntries();
      var seen = new Set();
      var appendOption = function appendOption(value, label) {
        if (!value || seen.has(value)) return;
        var option = document.createElement('option');
        option.value = value;
        option.textContent = label;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        selectElement.appendChild(option);
        seen.add(value);
      };
      entries.forEach(function (entry) {
        return appendOption(entry.value, entry.label);
      });
      selectedValues.forEach(function (value) {
        if (!seen.has(value)) {
          appendOption(value, value);
        }
      });
      var selectableOptions = Array.from(selectElement.options || []).filter(function (option) {
        return !option.disabled;
      });
      selectElement.size = computeAutoGearMultiSelectSize(selectableOptions.length, {
        minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS
      });
    }
    function getCrewRoleLabel(value) {
      var _texts$en;
      if (typeof value !== 'string') return '';
      var trimmed = value.trim();
      if (!trimmed) return '';
      var langTexts = texts[currentLang] || texts.en || {};
      var crewRoleMap = langTexts.crewRoles || ((_texts$en = texts.en) === null || _texts$en === void 0 ? void 0 : _texts$en.crewRoles) || {};
      return (crewRoleMap === null || crewRoleMap === void 0 ? void 0 : crewRoleMap[trimmed]) || trimmed;
    }
    function refreshAutoGearCameraOptions(selected) {
      if (!autoGearCameraSelect) return;
      var selectedValues = collectAutoGearSelectedValues(selected, 'camera');
      autoGearCameraSelect.innerHTML = '';
      autoGearCameraSelect.multiple = true;
      var seen = new Set();
      var addOption = function addOption(value) {
        if (!value || seen.has(value)) return;
        var option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearCameraSelect.appendChild(option);
        seen.add(value);
      };
      if (cameraSelect) {
        Array.from(cameraSelect.options || []).forEach(function (opt) {
          if (!opt || !opt.value || opt.value === 'None') return;
          var label = (opt.textContent || opt.value || '').trim();
          if (!label) return;
          addOption(label);
        });
      }
      selectedValues.forEach(function (value) {
        if (!seen.has(value)) addOption(value);
      });
      var visibleCount = Array.from(autoGearCameraSelect.options || []).filter(function (option) {
        return !option.disabled;
      }).length;
      autoGearCameraSelect.size = computeAutoGearMultiSelectSize(visibleCount);
    }
    function refreshAutoGearCameraWeightCondition(selected) {
      var source = function (_autoGearEditorDraft) {
        if (selected && _typeof(selected) === 'object' && !Array.isArray(selected)) {
          return selected;
        }
        if (Array.isArray(selected) && selected.length) {
          if (selected.length >= 2) {
            return {
              operator: selected[0],
              value: selected[1]
            };
          }
          return {
            value: selected[0]
          };
        }
        if ((_autoGearEditorDraft = autoGearEditorDraft) !== null && _autoGearEditorDraft !== void 0 && _autoGearEditorDraft.cameraWeight) {
          return autoGearEditorDraft.cameraWeight;
        }
        return null;
      }();
      var operator = normalizeAutoGearWeightOperator(source === null || source === void 0 ? void 0 : source.operator);
      if (autoGearCameraWeightOperator) {
        autoGearCameraWeightOperator.value = operator;
      }
      var normalized = normalizeAutoGearCameraWeightCondition(source);
      if (autoGearCameraWeightValueInput) {
        if (normalized) {
          autoGearCameraWeightValueInput.value = String(normalized.value);
        } else if (source && typeof (source === null || source === void 0 ? void 0 : source.value) === 'string') {
          autoGearCameraWeightValueInput.value = source.value;
        } else if (source && typeof (source === null || source === void 0 ? void 0 : source.value) === 'number' && Number.isFinite(source.value)) {
          autoGearCameraWeightValueInput.value = String(Math.round(source.value));
        } else {
          autoGearCameraWeightValueInput.value = '';
        }
      }
    }
    function updateAutoGearCameraWeightDraft() {
      if (!autoGearEditorDraft) return;
      if (!isAutoGearConditionActive('cameraWeight')) {
        autoGearEditorDraft.cameraWeight = null;
        return;
      }
      var operatorValue = autoGearCameraWeightOperator ? autoGearCameraWeightOperator.value : '';
      var thresholdValue = autoGearCameraWeightValueInput ? autoGearCameraWeightValueInput.value : '';
      var normalized = normalizeAutoGearCameraWeightCondition({
        operator: operatorValue,
        value: thresholdValue
      });
      if (normalized) {
        autoGearEditorDraft.cameraWeight = _objectSpread({}, normalized);
      } else if (operatorValue) {
        autoGearEditorDraft.cameraWeight = {
          operator: normalizeAutoGearWeightOperator(operatorValue),
          value: null
        };
      } else {
        autoGearEditorDraft.cameraWeight = null;
      }
    }
    function updateAutoGearShootingDaysDraft() {
      if (!autoGearEditorDraft) return;
      if (!isAutoGearConditionActive('shootingDays')) {
        autoGearEditorDraft.shootingDays = null;
        return;
      }
      var modeValue = autoGearShootingDaysMode ? autoGearShootingDaysMode.value : 'minimum';
      var valueSource = autoGearShootingDaysInput ? autoGearShootingDaysInput.value : '';
      var normalized = normalizeAutoGearShootingDaysCondition({
        mode: modeValue,
        value: valueSource
      });
      if (normalized) {
        autoGearEditorDraft.shootingDays = _objectSpread({}, normalized);
        return;
      }
      var fallbackMode = typeof normalizeAutoGearShootingDayMode === 'function' ? normalizeAutoGearShootingDayMode(modeValue) : typeof modeValue === 'string' && modeValue ? modeValue.trim().toLowerCase() : 'minimum';
      if (fallbackMode) {
        autoGearEditorDraft.shootingDays = {
          mode: fallbackMode,
          value: null
        };
      } else {
        autoGearEditorDraft.shootingDays = null;
      }
    }
    function refreshAutoGearMonitorOptions(selected) {
      if (!autoGearMonitorSelect) return;
      var selectedValues = collectAutoGearSelectedValues(selected, 'monitor');
      autoGearMonitorSelect.innerHTML = '';
      autoGearMonitorSelect.multiple = true;
      var seen = new Set();
      var addOption = function addOption(value) {
        if (!value || seen.has(value)) return;
        var option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearMonitorSelect.appendChild(option);
        seen.add(value);
      };
      if (monitorSelect) {
        Array.from(monitorSelect.options || []).forEach(function (opt) {
          if (!opt || !opt.value || opt.value === 'None') return;
          var label = (opt.textContent || opt.value || '').trim();
          if (!label) return;
          addOption(label);
        });
      }
      selectedValues.forEach(function (value) {
        if (!seen.has(value)) addOption(value);
      });
      var visibleCount = Array.from(autoGearMonitorSelect.options || []).filter(function (option) {
        return !option.disabled;
      }).length;
      autoGearMonitorSelect.size = computeAutoGearMultiSelectSize(visibleCount);
    }
    function refreshAutoGearTripodOptions(select, selected, key, placeholderKey, selectorType) {
      var _texts$en2;
      if (!select) return;
      var selectedValues = collectAutoGearSelectedValues(selected, key);
      select.innerHTML = '';
      select.multiple = true;
      var langTexts = texts[currentLang] || texts.en || {};
      var placeholder = langTexts[placeholderKey] || ((_texts$en2 = texts.en) === null || _texts$en2 === void 0 ? void 0 : _texts$en2[placeholderKey]) || 'Select options';
      var entries = collectAutoGearTripodNames(selectorType).map(function (entry) {
        return typeof entry === 'string' ? {
          value: entry,
          label: entry
        } : entry;
      }).filter(Boolean);
      var seen = new Set();
      var addOption = function addOption(value, label) {
        if (typeof value !== 'string') return;
        var trimmed = value.trim();
        if (!trimmed) return;
        var keyValue = trimmed.toLowerCase();
        if (seen.has(keyValue)) return;
        var option = document.createElement('option');
        option.value = trimmed;
        option.textContent = label || formatAutoGearSelectorValue(selectorType, trimmed);
        if (selectedValues.includes(trimmed)) {
          option.selected = true;
        }
        select.appendChild(option);
        seen.add(keyValue);
      };
      entries.forEach(function (entry) {
        if (!entry) return;
        addOption(entry.value, entry.label);
      });
      selectedValues.forEach(function (value) {
        if (!value) return;
        var keyValue = value.trim().toLowerCase();
        if (keyValue && !seen.has(keyValue)) {
          addOption(value, formatAutoGearSelectorValue(selectorType, value));
        }
      });
      if (!select.options.length) {
        var option = document.createElement('option');
        option.value = '';
        option.textContent = placeholder;
        option.disabled = true;
        option.selected = true;
        select.appendChild(option);
      }
      var visibleCount = Array.from(select.options || []).filter(function (option) {
        return !option.disabled;
      }).length;
      select.size = computeAutoGearMultiSelectSize(visibleCount, {
        minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS
      });
    }
    function refreshAutoGearTripodHeadOptions(selected) {
      refreshAutoGearTripodOptions(autoGearTripodHeadBrandSelect, selected, 'tripodHeadBrand', 'autoGearTripodHeadBrandPlaceholder', 'tripodHeadBrand');
    }
    function refreshAutoGearTripodBowlOptions(selected) {
      refreshAutoGearTripodOptions(autoGearTripodBowlSelect, selected, 'tripodBowl', 'autoGearTripodBowlPlaceholder', 'tripodBowl');
    }
    function refreshAutoGearTripodTypesOptions(selected) {
      refreshAutoGearTripodOptions(autoGearTripodTypesSelect, selected, 'tripodTypes', 'autoGearTripodTypesPlaceholder', 'tripodTypes');
    }
    function refreshAutoGearTripodSpreaderOptions(selected) {
      refreshAutoGearTripodOptions(autoGearTripodSpreaderSelect, selected, 'tripodSpreader', 'autoGearTripodSpreaderPlaceholder', 'tripodSpreader');
    }
    function refreshAutoGearWirelessOptions(selected) {
      if (!autoGearWirelessSelect) return;
      var selectedValues = collectAutoGearSelectedValues(selected, 'wireless');
      autoGearWirelessSelect.innerHTML = '';
      autoGearWirelessSelect.multiple = true;
      var seen = new Set();
      var addOption = function addOption(value) {
        if (!value || seen.has(value)) return;
        var option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearWirelessSelect.appendChild(option);
        seen.add(value);
      };
      if (videoSelect) {
        Array.from(videoSelect.options || []).forEach(function (opt) {
          if (!opt || !opt.value || opt.value === 'None') return;
          var label = (opt.textContent || opt.value || '').trim();
          if (!label) return;
          addOption(label);
        });
      }
      selectedValues.forEach(function (value) {
        if (!seen.has(value)) addOption(value);
      });
      var visibleCount = Array.from(autoGearWirelessSelect.options || []).filter(function (option) {
        return !option.disabled;
      }).length;
      autoGearWirelessSelect.size = computeAutoGearMultiSelectSize(visibleCount);
    }
    function refreshAutoGearMotorsOptions(selected) {
      if (!autoGearMotorsSelect) return;
      var selectedValues = collectAutoGearSelectedValues(selected, 'motors');
      var langTexts = texts[currentLang] || texts.en || {};
      autoGearMotorsSelect.innerHTML = '';
      autoGearMotorsSelect.multiple = true;
      var seen = new Set();
      var addOption = function addOption(value) {
        if (!value || seen.has(value)) return;
        var option = document.createElement('option');
        option.value = value;
        option.textContent = formatAutoGearMotorValue(value, langTexts);
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearMotorsSelect.appendChild(option);
        seen.add(value);
      };
      var sourceSelects = Array.isArray(motorSelects) ? motorSelects : [];
      sourceSelects.forEach(function (sel) {
        Array.from((sel === null || sel === void 0 ? void 0 : sel.options) || []).forEach(function (opt) {
          if (!opt || !opt.value || opt.value === 'None') return;
          var label = (opt.textContent || opt.value || '').trim();
          if (!label) return;
          addOption(label);
        });
      });
      selectedValues.forEach(function (value) {
        if (!seen.has(value)) addOption(value);
      });
      var visibleCount = Array.from(autoGearMotorsSelect.options || []).filter(function (option) {
        return !option.disabled;
      }).length;
      autoGearMotorsSelect.size = computeAutoGearMultiSelectSize(visibleCount);
    }
    function refreshAutoGearControllersOptions(selected) {
      if (!autoGearControllersSelect) return;
      var selectedValues = collectAutoGearSelectedValues(selected, 'controllers');
      autoGearControllersSelect.innerHTML = '';
      autoGearControllersSelect.multiple = true;
      var seen = new Set();
      var addOption = function addOption(value) {
        if (!value || seen.has(value)) return;
        var option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearControllersSelect.appendChild(option);
        seen.add(value);
      };
      var sourceSelects = Array.isArray(controllerSelects) ? controllerSelects : [];
      sourceSelects.forEach(function (sel) {
        Array.from((sel === null || sel === void 0 ? void 0 : sel.options) || []).forEach(function (opt) {
          if (!opt || !opt.value || opt.value === 'None') return;
          var label = (opt.textContent || opt.value || '').trim();
          if (!label) return;
          addOption(label);
        });
      });
      selectedValues.forEach(function (value) {
        if (!seen.has(value)) addOption(value);
      });
      var visibleCount = Array.from(autoGearControllersSelect.options || []).filter(function (option) {
        return !option.disabled;
      }).length;
      autoGearControllersSelect.size = computeAutoGearMultiSelectSize(visibleCount);
    }
    function refreshAutoGearDistanceOptions(selected) {
      if (!autoGearDistanceSelect) return;
      var selectedValues = collectAutoGearSelectedValues(selected, 'distance');
      autoGearDistanceSelect.innerHTML = '';
      autoGearDistanceSelect.multiple = true;
      var seen = new Set();
      var addOption = function addOption(value) {
        if (!value || seen.has(value)) return;
        var option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearDistanceSelect.appendChild(option);
        seen.add(value);
      };
      if (distanceSelect) {
        Array.from(distanceSelect.options || []).forEach(function (opt) {
          if (!opt || !opt.value || opt.value === 'None') return;
          var label = (opt.textContent || opt.value || '').trim();
          if (!label) return;
          addOption(label);
        });
      }
      selectedValues.forEach(function (value) {
        if (!seen.has(value)) addOption(value);
      });
      var visibleCount = Array.from(autoGearDistanceSelect.options || []).filter(function (option) {
        return !option.disabled;
      }).length;
      autoGearDistanceSelect.size = computeAutoGearMultiSelectSize(visibleCount, {
        minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS
      });
    }
    function populateAutoGearCategorySelect(select, currentValue) {
      var _texts$currentLang, _texts$en3;
      if (!select) return;
      var current = typeof currentValue === 'string' ? currentValue : '';
      select.innerHTML = '';
      GEAR_LIST_CATEGORIES.forEach(function (cat) {
        var opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        if (current === cat) opt.selected = true;
        select.appendChild(opt);
      });
      var customOpt = document.createElement('option');
      customOpt.value = AUTO_GEAR_CUSTOM_CATEGORY;
      customOpt.textContent = ((_texts$currentLang = texts[currentLang]) === null || _texts$currentLang === void 0 ? void 0 : _texts$currentLang.autoGearCustomCategory) || ((_texts$en3 = texts.en) === null || _texts$en3 === void 0 ? void 0 : _texts$en3.autoGearCustomCategory) || 'Custom Additions';
      if (!current) customOpt.selected = true;
      select.appendChild(customOpt);
    }
    function updateAutoGearCatalogOptions() {
      if (!autoGearItemCatalog) return;
      var names = collectAutoGearCatalogNames();
      autoGearItemCatalog.innerHTML = '';
      names.forEach(function (name) {
        var option = document.createElement('option');
        option.value = name;
        autoGearItemCatalog.appendChild(option);
      });
      updateAutoGearMonitorCatalogOptions();
      updateAutoGearMonitorDefaultOptions();
    }
    function updateAutoGearMonitorDefaultOptions() {
      var targets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : autoGearMonitorDefaultControls;
      var controls = Array.isArray(targets) ? targets : [targets];
      var placeholder = getAutoGearMonitorDefaultPlaceholder();
      controls.forEach(function (control) {
        if (!control || !control.select || !Object.prototype.hasOwnProperty.call(AUTO_GEAR_MONITOR_DEFAULT_TYPES, control.key)) {
          return;
        }
        var select = control.select;
        var type = AUTO_GEAR_MONITOR_DEFAULT_TYPES[control.key];
        var names = collectAutoGearMonitorNames(type === 'directorMonitor' ? 'directorMonitor' : 'monitor');
        var previousValue = select.value || '';
        select.innerHTML = '';
        var placeholderOption = document.createElement('option');
        placeholderOption.value = '';
        placeholderOption.textContent = placeholder;
        select.appendChild(placeholderOption);
        var added = new Set(['']);
        names.forEach(function (name) {
          if (!name) return;
          var key = name.toLowerCase();
          if (added.has(key)) return;
          var option = document.createElement('option');
          option.value = name;
          option.textContent = formatAutoGearSelectorValue(type, name);
          select.appendChild(option);
          added.add(key);
        });
        var currentValue = getAutoGearMonitorDefault(control.key);
        var normalizedValue = '';
        if (currentValue) {
          var match = names.find(function (name) {
            return name.toLowerCase() === currentValue.toLowerCase();
          });
          if (match) {
            normalizedValue = match;
          } else {
            var option = document.createElement('option');
            option.value = currentValue;
            option.textContent = formatAutoGearSelectorValue(type, currentValue);
            select.appendChild(option);
            normalizedValue = currentValue;
          }
        }
        select.value = normalizedValue;
        if (!normalizedValue && previousValue && select.value !== previousValue && select.querySelector("option[value=\"".concat(previousValue, "\"]"))) {
          select.value = previousValue;
        }
        select.disabled = names.length === 0 && !normalizedValue;
      });
    }
    function renderAutoGearMonitorDefaultsControls() {
      autoGearMonitorDefaultControls.forEach(function (control) {
        if (!control || !control.select || !Object.prototype.hasOwnProperty.call(AUTO_GEAR_MONITOR_DEFAULT_TYPES, control.key)) {
          return;
        }
        var select = control.select;
        var type = AUTO_GEAR_MONITOR_DEFAULT_TYPES[control.key];
        var currentValue = getAutoGearMonitorDefault(control.key);
        if (currentValue && !Array.from(select.options || []).some(function (option) {
          return option.value === currentValue;
        })) {
          var option = document.createElement('option');
          option.value = currentValue;
          option.textContent = formatAutoGearSelectorValue(type, currentValue);
          select.appendChild(option);
        }
        var normalizedValue = currentValue || '';
        if (select.value !== normalizedValue) {
          select.value = normalizedValue;
        }
      });
    }
    function formatAutoGearCount(count, singularKey, pluralKey) {
      var _texts$en5;
      var langTexts = texts[currentLang] || texts.en || {};
      if (count === 1) {
        var _texts$en4;
        var _template = langTexts[singularKey] || ((_texts$en4 = texts.en) === null || _texts$en4 === void 0 ? void 0 : _texts$en4[singularKey]);
        return _template ? _template.replace('%s', '1') : '1';
      }
      var template = langTexts[pluralKey] || ((_texts$en5 = texts.en) === null || _texts$en5 === void 0 ? void 0 : _texts$en5[pluralKey]);
      return template ? template.replace('%s', String(count)) : String(count);
    }
    function formatAutoGearItemSummary(item) {
      var _texts$en6;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!item || _typeof(item) !== 'object') return '';
      var normalized = normalizeAutoGearItem(item);
      if (!normalized) return '';
      var quantity = normalized.quantity,
        name = normalized.name,
        category = normalized.category,
        screenSize = normalized.screenSize,
        selectorType = normalized.selectorType,
        selectorDefault = normalized.selectorDefault,
        selectorEnabled = normalized.selectorEnabled,
        notes = normalized.notes;
      var langTexts = texts[currentLang] || texts.en || {};
      var includeSign = !!options.includeSign;
      var listType = options.listType || (options.includeSign ? 'add' : '');
      var includeCategory = options.includeCategory !== false;
      var baseQuantity = normalizeAutoGearQuantity(quantity);
      var signPrefix = includeSign ? listType === 'remove' ? '−' : '+' : '';
      var quantityText = signPrefix ? "".concat(signPrefix).concat(baseQuantity) : String(baseQuantity);
      var nameText = name || '';
      if (!nameText) return quantityText;
      var categoryLabel = category ? category : langTexts.autoGearCustomCategory || ((_texts$en6 = texts.en) === null || _texts$en6 === void 0 ? void 0 : _texts$en6.autoGearCustomCategory) || '';
      var summary;
      if (includeCategory && categoryLabel) {
        var _texts$en7;
        var withCategoryTemplate = langTexts.autoGearItemSummaryWithCategory || ((_texts$en7 = texts.en) === null || _texts$en7 === void 0 ? void 0 : _texts$en7.autoGearItemSummaryWithCategory) || '%s × %s (%s)';
        summary = formatWithPlaceholders(withCategoryTemplate, quantityText, nameText, categoryLabel);
      } else {
        var _texts$en8;
        var baseTemplate = langTexts.autoGearItemSummary || ((_texts$en8 = texts.en) === null || _texts$en8 === void 0 ? void 0 : _texts$en8.autoGearItemSummary) || '%s × %s';
        summary = formatWithPlaceholders(baseTemplate, quantityText, nameText);
      }
      var details = [];
      if (screenSize) {
        details.push(screenSize);
      }
      if (selectorType && selectorType !== 'none') {
        var selectorLabel = getAutoGearSelectorLabel(selectorType);
        var formattedDefault = selectorDefault ? formatAutoGearSelectorValue(selectorType, selectorDefault) : '';
        if (selectorEnabled) {
          var _texts$en9, _texts$en0;
          var selectorTemplate = formattedDefault ? langTexts.autoGearSelectorSummaryWithDefault || ((_texts$en9 = texts.en) === null || _texts$en9 === void 0 ? void 0 : _texts$en9.autoGearSelectorSummaryWithDefault) || '%s selector (default: %s)' : langTexts.autoGearSelectorSummary || ((_texts$en0 = texts.en) === null || _texts$en0 === void 0 ? void 0 : _texts$en0.autoGearSelectorSummary) || '%s selector';
          var selectorText = formattedDefault ? formatWithPlaceholders(selectorTemplate, selectorLabel, formattedDefault) : formatWithPlaceholders(selectorTemplate, selectorLabel);
          details.push(selectorText);
        } else if (formattedDefault) {
          var _texts$en1;
          var defaultTemplate = langTexts.autoGearSelectorSummaryNoSelector || ((_texts$en1 = texts.en) === null || _texts$en1 === void 0 ? void 0 : _texts$en1.autoGearSelectorSummaryNoSelector) || '%s default: %s';
          details.push(formatWithPlaceholders(defaultTemplate, selectorLabel, formattedDefault));
        } else if (selectorLabel) {
          details.push(selectorLabel);
        }
      }
      if (notes) {
        details.push(notes);
      }
      if (details.length) {
        summary += " \u2013 ".concat(details.join(' – '));
      }
      return summary;
    }
    function formatWithPlaceholders(template) {
      for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
      }
      if (typeof template !== 'string') {
        return values.join(' ');
      }
      return values.reduce(function (acc, value) {
        return acc.replace('%s', value);
      }, template);
    }
    function formatAutoGearRuleCount(count) {
      var _texts$en11;
      var langTexts = texts[currentLang] || texts.en || {};
      if (count === 1) {
        var _texts$en10;
        var _template2 = langTexts.autoGearRulesCountOne || ((_texts$en10 = texts.en) === null || _texts$en10 === void 0 ? void 0 : _texts$en10.autoGearRulesCountOne);
        return _template2 ? _template2.replace('%s', '1') : '1';
      }
      var template = langTexts.autoGearRulesCountOther || ((_texts$en11 = texts.en) === null || _texts$en11 === void 0 ? void 0 : _texts$en11.autoGearRulesCountOther);
      return template ? template.replace('%s', String(count)) : String(count);
    }
    function formatAutoGearBackupCount(count) {
      var langTexts = texts[currentLang] || texts.en || {};
      var fallbackTexts = texts.en || {};
      if (count === 1) {
        var _template3 = langTexts.storageAutoBackupsCountOne || fallbackTexts.storageAutoBackupsCountOne;
        if (typeof _template3 === 'string' && _template3.includes('%s')) {
          return _template3.replace('%s', '1');
        }
        return '1 auto backup';
      }
      var template = langTexts.storageAutoBackupsCountOther || fallbackTexts.storageAutoBackupsCountOther;
      if (typeof template === 'string' && template.includes('%s')) {
        return template.replace('%s', String(count));
      }
      return "".concat(count, " auto backups");
    }
    function formatAutoGearBackupTime(isoString) {
      if (typeof isoString !== 'string') return '';
      var date = new Date(isoString);
      if (Number.isNaN(date.valueOf())) return isoString;
      if (autoGearBackupDateFormatter) {
        try {
          return autoGearBackupDateFormatter.format(date);
        } catch (error) {
          console.warn('Failed to format automatic gear backup timestamp', error);
        }
      }
      if (typeof date.toLocaleString === 'function') {
        return date.toLocaleString();
      }
      return date.toISOString();
    }
    function formatAutoGearBackupMeta(backup) {
      var _texts$en12, _texts$en13;
      if (!backup) return '';
      var langTexts = texts[currentLang] || texts.en || {};
      var timeLabel = formatAutoGearBackupTime(backup.createdAt);
      var ruleCount = Array.isArray(backup.rules) ? backup.rules.length : 0;
      var rulesLabel = ruleCount === 0 ? langTexts.autoGearBackupClearsRules || ((_texts$en12 = texts.en) === null || _texts$en12 === void 0 ? void 0 : _texts$en12.autoGearBackupClearsRules) || 'Clears all rules' : formatAutoGearRuleCount(ruleCount);
      var template = langTexts.autoGearBackupMeta || ((_texts$en13 = texts.en) === null || _texts$en13 === void 0 ? void 0 : _texts$en13.autoGearBackupMeta);
      var baseSummary = template && template.includes('%s') ? formatWithPlaceholders(template, timeLabel, rulesLabel) : "".concat(timeLabel, " \xB7 ").concat(rulesLabel);
      var note = typeof backup.note === 'string' ? backup.note.trim() : '';
      if (note) {
        return "".concat(baseSummary, " \u2013 ").concat(note);
      }
      return baseSummary;
    }
    function getAutoGearBackupSelectPlaceholder() {
      var _texts$currentLang2, _texts$en14;
      return ((_texts$currentLang2 = texts[currentLang]) === null || _texts$currentLang2 === void 0 ? void 0 : _texts$currentLang2.autoGearBackupSelectPlaceholder) || ((_texts$en14 = texts.en) === null || _texts$en14 === void 0 ? void 0 : _texts$en14.autoGearBackupSelectPlaceholder) || 'Select a backup to restore';
    }
    function updateAutoGearBackupRestoreButtonState() {
      if (!autoGearBackupRestoreButton) return;
      var hasSelection = Boolean(autoGearBackupSelect && autoGearBackupSelect.value);
      autoGearBackupRestoreButton.disabled = !hasSelection;
    }
    function updateAutoGearBackupRetentionWarning() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      autoGearBackupRetentionWarningText = typeof message === 'string' ? message : '';
      if (!autoGearBackupRetentionWarning) {
        return;
      }
      if (autoGearBackupRetentionWarningText) {
        autoGearBackupRetentionWarning.textContent = autoGearBackupRetentionWarningText;
        autoGearBackupRetentionWarning.hidden = false;
      } else {
        autoGearBackupRetentionWarning.textContent = '';
        autoGearBackupRetentionWarning.hidden = true;
      }
    }
    function renderAutoGearBackupRetentionControls() {
      var limitValue = clampAutoGearBackupRetentionLimit(autoGearBackupRetention);
      if (autoGearBackupRetentionInput) {
        autoGearBackupRetentionInput.setAttribute('min', String(AUTO_GEAR_BACKUP_RETENTION_MIN_VALUE));
        autoGearBackupRetentionInput.setAttribute('max', String(AUTO_GEAR_BACKUP_RETENTION_MAX));
        if (autoGearBackupRetentionInput.value !== String(limitValue)) {
          autoGearBackupRetentionInput.value = String(limitValue);
        }
      }
      if (autoGearBackupRetentionSummary) {
        var _texts$currentLang3, _texts$en15;
        var template = ((_texts$currentLang3 = texts[currentLang]) === null || _texts$currentLang3 === void 0 ? void 0 : _texts$currentLang3.autoGearBackupRetentionSummary) || ((_texts$en15 = texts.en) === null || _texts$en15 === void 0 ? void 0 : _texts$en15.autoGearBackupRetentionSummary) || 'Keeping the latest {limit}. Currently {stored} stored.';
        var limitLabel = formatAutoGearBackupCount(limitValue);
        var storedLabel = formatAutoGearBackupCount(autoGearBackups.length);
        var summary = template.replace('{limit}', limitLabel).replace('{stored}', storedLabel);
        autoGearBackupRetentionSummary.textContent = summary;
      }
      updateAutoGearBackupRetentionWarning(autoGearBackupRetentionWarningText);
    }
    function getAutoGearPresetById(presetId) {
      if (!presetId) return null;
      return autoGearPresets.find(function (preset) {
        return preset.id === presetId;
      }) || null;
    }
    function getAutoGearAutoPresetLabel() {
      var _texts$en16;
      var langTexts = texts[currentLang] || texts.en || {};
      return langTexts.autoGearAutoPresetLabel || ((_texts$en16 = texts.en) === null || _texts$en16 === void 0 ? void 0 : _texts$en16.autoGearAutoPresetLabel) || 'Autosaved rules';
    }
    function setAutoGearAutoPresetId(presetId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var normalized = typeof presetId === 'string' ? presetId : '';
      var persist = options.persist !== false;
      var skipRender = options.skipRender === true;
      if (autoGearAutoPresetIdState === normalized) {
        if (!skipRender) renderAutoGearPresetsControls();
        return;
      }
      autoGearAutoPresetIdState = normalized;
      writeCoreScopeValue('autoGearAutoPresetId', autoGearAutoPresetIdState);
      if (persist) {
        persistAutoGearAutoPresetId(autoGearAutoPresetIdState);
      }
      if (!skipRender) {
        renderAutoGearPresetsControls();
      }
    }
    function reconcileAutoGearAutoPresetState() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!autoGearAutoPresetIdState) {
        if (options.persist !== false) {
          persistAutoGearAutoPresetId('');
        }
        return false;
      }
      var managedExists = autoGearPresets.some(function (preset) {
        return preset.id === autoGearAutoPresetIdState;
      });
      var otherExists = autoGearPresets.some(function (preset) {
        return preset.id !== autoGearAutoPresetIdState;
      });
      if (!managedExists || otherExists) {
        setAutoGearAutoPresetId('', {
          persist: options.persist !== false,
          skipRender: options.skipRender === true
        });
        return true;
      }
      return false;
    }
    function syncAutoGearAutoPreset(rules) {
      var normalizedRules = Array.isArray(rules) ? rules : [];
      reconcileAutoGearAutoPresetState({
        persist: true,
        skipRender: true
      });
      if (!autoGearAutoPresetIdState) {
        if (autoGearPresets.length > 0) {
          return false;
        }
        var label = getAutoGearAutoPresetLabel();
        var normalizedPreset = normalizeAutoGearPreset({
          id: generateAutoGearId('preset'),
          label: label,
          rules: normalizedRules
        });
        if (!normalizedPreset) {
          return false;
        }
        autoGearPresets.push(normalizedPreset);
        autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
        persistAutoGearPresets(autoGearPresets);
        setAutoGearAutoPresetId(normalizedPreset.id, {
          persist: true,
          skipRender: true
        });
        setActiveAutoGearPresetId(normalizedPreset.id, {
          persist: true,
          skipRender: true
        });
        return true;
      }
      var managedIndex = autoGearPresets.findIndex(function (preset) {
        return preset.id === autoGearAutoPresetIdState;
      });
      if (managedIndex === -1) {
        setAutoGearAutoPresetId('', {
          persist: true,
          skipRender: true
        });
        return false;
      }
      if (autoGearPresets.length > 1) {
        setAutoGearAutoPresetId('', {
          persist: true,
          skipRender: true
        });
        return false;
      }
      var managedPreset = autoGearPresets[managedIndex];
      var updatedPreset = normalizeAutoGearPreset({
        id: managedPreset.id,
        label: managedPreset.label,
        rules: normalizedRules
      });
      if (!updatedPreset) {
        autoGearPresets.splice(managedIndex, 1);
        autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
        persistAutoGearPresets(autoGearPresets);
        setAutoGearAutoPresetId('', {
          persist: true,
          skipRender: true
        });
        setActiveAutoGearPresetId('', {
          persist: true,
          skipRender: true
        });
        return true;
      }
      if (managedPreset.fingerprint !== updatedPreset.fingerprint) {
        autoGearPresets[managedIndex] = updatedPreset;
        autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
        persistAutoGearPresets(autoGearPresets);
      }
      setActiveAutoGearPresetId(updatedPreset.id, {
        persist: true,
        skipRender: true
      });
      return managedPreset.fingerprint !== updatedPreset.fingerprint;
    }
    function setActiveAutoGearPresetId(presetId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var normalized = typeof presetId === 'string' ? presetId : '';
      var persist = options.persist !== false;
      var skipRender = options.skipRender === true;
      if (activeAutoGearPresetId === normalized) {
        if (!skipRender) renderAutoGearPresetsControls();
        return;
      }
      activeAutoGearPresetId = normalized;
      if (persist) {
        persistActiveAutoGearPresetId(activeAutoGearPresetId);
      }
      if (!skipRender) {
        renderAutoGearPresetsControls();
      }
    }
    function resolveBaseAutoGearRulesSnapshot() {
      if (Array.isArray(baseAutoGearRulesState)) {
        return baseAutoGearRulesState;
      }
      var resolved = readCoreScopeValue('baseAutoGearRules');
      if (Array.isArray(resolved)) {
        return resolved;
      }
      for (var index = 0; index < CORE_RUNTIME_SCOPE_CANDIDATES.length; index += 1) {
        var scope = CORE_RUNTIME_SCOPE_CANDIDATES[index];
        if (!scope || _typeof(scope) !== 'object') {
          continue;
        }
        try {
          var value = scope.baseAutoGearRules;
          if (Array.isArray(value)) {
            return value;
          }
        } catch (fallbackError) {
          void fallbackError;
        }
      }
      return [];
    }
    function alignActiveAutoGearPreset() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var skipRender = options.skipRender === true;
      var rulesSource = resolveBaseAutoGearRulesSnapshot();
      var fingerprint = createAutoGearRulesFingerprint(rulesSource);
      var matching = autoGearPresets.find(function (preset) {
        return preset.fingerprint === fingerprint;
      }) || null;
      if (matching) {
        setActiveAutoGearPresetId(matching.id, {
          persist: true,
          skipRender: true
        });
      } else if (activeAutoGearPresetId) {
        setActiveAutoGearPresetId('', {
          persist: true,
          skipRender: true
        });
      }
      if (!skipRender) {
        renderAutoGearPresetsControls();
      }
    }
    function renderAutoGearPresetsControls() {
      var _texts$currentLang4, _texts$en17;
      if (!autoGearPresetSelect) return;
      var placeholderText = ((_texts$currentLang4 = texts[currentLang]) === null || _texts$currentLang4 === void 0 ? void 0 : _texts$currentLang4.autoGearPresetPlaceholder) || ((_texts$en17 = texts.en) === null || _texts$en17 === void 0 ? void 0 : _texts$en17.autoGearPresetPlaceholder) || 'Custom rules';
      var presets = sortAutoGearPresets(autoGearPresets.slice());
      autoGearPresets = presets;
      autoGearPresetSelect.innerHTML = '';
      var placeholderOption = document.createElement('option');
      placeholderOption.value = '';
      placeholderOption.textContent = placeholderText;
      autoGearPresetSelect.appendChild(placeholderOption);
      presets.forEach(function (preset) {
        var option = document.createElement('option');
        option.value = preset.id;
        option.textContent = preset.label;
        autoGearPresetSelect.appendChild(option);
      });
      var targetValue = activeAutoGearPresetId || '';
      autoGearPresetSelect.value = targetValue;
      if (!targetValue) {
        placeholderOption.selected = true;
      }
      autoGearPresetSelect.disabled = presets.length === 0;
      autoGearPresetSelect.setAttribute('aria-disabled', presets.length === 0 ? 'true' : 'false');
      if (autoGearDeletePresetButton) {
        autoGearDeletePresetButton.disabled = !activeAutoGearPresetId;
      }
    }
    var autoGearPresetNameDialog = null;
    var autoGearPresetNameForm = null;
    var autoGearPresetNameLabel = null;
    var autoGearPresetNameInput = null;
    var autoGearPresetNameError = null;
    var autoGearPresetNameCancelButton = null;
    var autoGearPresetNameConfirmButton = null;
    var autoGearPresetNamePending = null;
    var autoGearPresetNamePreviousFocus = null;
    var autoGearPresetNameRequiredMessage = '';
    function ensureAutoGearPresetNameDialog() {
      if (autoGearPresetNameDialog) {
        return autoGearPresetNameDialog;
      }
      if (typeof document === 'undefined') {
        return null;
      }
      var panel = document.getElementById('autoGearPresetPanel');
      if (!panel) {
        return null;
      }
      var dialog = document.createElement('div');
      dialog.className = 'auto-gear-preset-name-dialog';
      dialog.hidden = true;
      dialog.setAttribute('aria-hidden', 'true');
      dialog.setAttribute('role', 'dialog');
      dialog.setAttribute('aria-modal', 'true');
      var card = document.createElement('div');
      card.className = 'auto-gear-preset-name-card';
      var form = document.createElement('form');
      form.className = 'auto-gear-preset-name-form';
      var label = document.createElement('label');
      label.className = 'auto-gear-preset-name-label';
      label.id = 'autoGearPresetNamePromptLabel';
      label.setAttribute('for', 'autoGearPresetNameInput');
      var input = document.createElement('input');
      input.type = 'text';
      input.id = 'autoGearPresetNameInput';
      input.className = 'auto-gear-preset-name-input';
      input.autocomplete = 'off';
      input.spellcheck = true;
      var error = document.createElement('p');
      error.id = 'autoGearPresetNameError';
      error.className = 'auto-gear-preset-name-error';
      error.setAttribute('aria-live', 'polite');
      var actions = document.createElement('div');
      actions.className = 'dialog-actions';
      var cancelButton = document.createElement('button');
      cancelButton.type = 'button';
      var confirmButton = document.createElement('button');
      confirmButton.type = 'submit';
      actions.append(cancelButton, confirmButton);
      form.append(label, input, error, actions);
      card.appendChild(form);
      dialog.appendChild(card);
      panel.appendChild(dialog);
      dialog.setAttribute('aria-labelledby', label.id);
      input.setAttribute('aria-describedby', error.id);
      autoGearPresetNameDialog = dialog;
      autoGearPresetNameForm = form;
      autoGearPresetNameLabel = label;
      autoGearPresetNameInput = input;
      autoGearPresetNameError = error;
      autoGearPresetNameCancelButton = cancelButton;
      autoGearPresetNameConfirmButton = confirmButton;
      form.addEventListener('submit', handleAutoGearPresetNameSubmit);
      cancelButton.addEventListener('click', cancelAutoGearPresetNameDialog);
      dialog.addEventListener('keydown', handleAutoGearPresetNameKeydown);
      return autoGearPresetNameDialog;
    }
    function getAutoGearPresetNameFocusTargets() {
      return [autoGearPresetNameInput, autoGearPresetNameCancelButton, autoGearPresetNameConfirmButton].filter(function (element) {
        return element && typeof element.focus === 'function' && !element.disabled;
      });
    }
    function handleAutoGearPresetNameKeydown(event) {
      if (!autoGearPresetNameDialog || autoGearPresetNameDialog.hidden) {
        return;
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        cancelAutoGearPresetNameDialog();
        return;
      }
      if (event.key === 'Tab') {
        var focusable = getAutoGearPresetNameFocusTargets();
        if (!focusable.length) {
          return;
        }
        var active = document.activeElement;
        var currentIndex = focusable.indexOf(active);
        if (currentIndex === -1) {
          currentIndex = 0;
        }
        if (event.shiftKey) {
          currentIndex = (currentIndex - 1 + focusable.length) % focusable.length;
        } else {
          currentIndex = (currentIndex + 1) % focusable.length;
        }
        event.preventDefault();
        var target = focusable[currentIndex];
        if (target) {
          target.focus({
            preventScroll: true
          });
        }
      }
    }
    function handleAutoGearPresetNameSubmit(event) {
      if (event) {
        event.preventDefault();
      }
      if (!autoGearPresetNameInput) {
        return;
      }
      var value = autoGearPresetNameInput.value.trim();
      if (!value) {
        if (autoGearPresetNameError && autoGearPresetNameRequiredMessage) {
          autoGearPresetNameError.textContent = autoGearPresetNameRequiredMessage;
        }
        autoGearPresetNameInput.focus({
          preventScroll: true
        });
        autoGearPresetNameInput.select();
        return;
      }
      closeAutoGearPresetNameDialog(value);
    }
    function closeAutoGearPresetNameDialog(result) {
      if (!autoGearPresetNameDialog) {
        return;
      }
      autoGearPresetNameDialog.classList.remove('is-visible');
      autoGearPresetNameDialog.setAttribute('aria-hidden', 'true');
      autoGearPresetNameDialog.hidden = true;
      if (autoGearPresetNameError) {
        autoGearPresetNameError.textContent = '';
      }
      if (autoGearPresetNameInput) {
        autoGearPresetNameInput.value = '';
      }
      autoGearPresetNameRequiredMessage = '';
      var restoreFocus = autoGearPresetNamePreviousFocus;
      autoGearPresetNamePreviousFocus = null;
      if (typeof restoreFocus === 'function') {
        restoreFocus();
      } else if (autoGearSavePresetButton && typeof autoGearSavePresetButton.focus === 'function') {
        autoGearSavePresetButton.focus({
          preventScroll: true
        });
      }
      if (autoGearPresetNamePending) {
        var _autoGearPresetNamePe = autoGearPresetNamePending,
          resolve = _autoGearPresetNamePe.resolve;
        autoGearPresetNamePending = null;
        resolve(typeof result === 'string' ? result : null);
      }
    }
    function cancelAutoGearPresetNameDialog() {
      closeAutoGearPresetNameDialog(null);
    }
    function requestAutoGearPresetName(promptMessage, defaultName, requiredMessage) {
      var _texts$currentLang5, _texts$en18, _texts$currentLang6, _texts$en19;
      if (typeof window !== 'undefined' && typeof window.prompt === 'function') {
        var promptResponse;
        var promptError = null;
        var promptStartedAt = Date.now();
        try {
          promptResponse = window.prompt(promptMessage, defaultName);
        } catch (error) {
          promptError = error;
        }
        var promptDuration = Date.now() - promptStartedAt;
        if (typeof promptResponse === 'string') {
          return Promise.resolve(promptResponse.trim());
        }
        var promptLikelyBlocked = promptError || promptDuration < 20;
        if (!promptLikelyBlocked && promptResponse === null) {
          return Promise.resolve(null);
        }
        if (promptLikelyBlocked) {
          console.warn('Prompt unavailable, falling back to inline auto gear preset dialog', promptError);
        }
      }
      var dialog = ensureAutoGearPresetNameDialog();
      if (!dialog) {
        return Promise.resolve(defaultName ? defaultName.trim() : '');
      }
      var confirmLabel = ((_texts$currentLang5 = texts[currentLang]) === null || _texts$currentLang5 === void 0 ? void 0 : _texts$currentLang5.autoGearSavePresetButton) || ((_texts$en18 = texts.en) === null || _texts$en18 === void 0 ? void 0 : _texts$en18.autoGearSavePresetButton) || 'Save preset';
      var cancelLabel = ((_texts$currentLang6 = texts[currentLang]) === null || _texts$currentLang6 === void 0 ? void 0 : _texts$currentLang6.autoGearCancelEdit) || ((_texts$en19 = texts.en) === null || _texts$en19 === void 0 ? void 0 : _texts$en19.autoGearCancelEdit) || 'Cancel';
      autoGearPresetNameRequiredMessage = requiredMessage || '';
      if (autoGearPresetNameLabel) {
        autoGearPresetNameLabel.textContent = promptMessage || '';
      }
      if (autoGearPresetNameConfirmButton) {
        autoGearPresetNameConfirmButton.textContent = confirmLabel;
        autoGearPresetNameConfirmButton.setAttribute('aria-label', confirmLabel);
      }
      if (autoGearPresetNameCancelButton) {
        autoGearPresetNameCancelButton.textContent = cancelLabel;
        autoGearPresetNameCancelButton.setAttribute('aria-label', cancelLabel);
      }
      if (autoGearPresetNameError) {
        autoGearPresetNameError.textContent = '';
      }
      if (autoGearPresetNameInput) {
        autoGearPresetNameInput.value = defaultName || '';
      }
      dialog.hidden = false;
      dialog.setAttribute('aria-hidden', 'false');
      dialog.classList.add('is-visible');
      var previouslyFocused = typeof document !== 'undefined' ? document.activeElement : null;
      autoGearPresetNamePreviousFocus = function autoGearPresetNamePreviousFocus() {
        if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
          previouslyFocused.focus({
            preventScroll: true
          });
        } else if (autoGearSavePresetButton && typeof autoGearSavePresetButton.focus === 'function') {
          autoGearSavePresetButton.focus({
            preventScroll: true
          });
        }
      };
      setTimeout(function () {
        if (autoGearPresetNameInput) {
          autoGearPresetNameInput.focus({
            preventScroll: true
          });
          autoGearPresetNameInput.select();
        }
      }, 0);
      return new Promise(function (resolve) {
        autoGearPresetNamePending = {
          resolve: resolve
        };
      });
    }
    function applyAutoGearBackupVisibility() {
      var show = !!autoGearBackupsVisible;
      if (autoGearShowBackupsCheckbox) {
        autoGearShowBackupsCheckbox.checked = show;
        autoGearShowBackupsCheckbox.setAttribute('aria-pressed', show ? 'true' : 'false');
      }
      if (autoGearBackupsSection) {
        autoGearBackupsSection.classList.toggle('auto-gear-backups-collapsed', !show);
        autoGearBackupsSection.setAttribute('aria-expanded', show ? 'true' : 'false');
      }
      if (autoGearBackupControls) {
        autoGearBackupControls.hidden = !show;
        autoGearBackupControls.setAttribute('aria-hidden', show ? 'false' : 'true');
      }
      if (autoGearBackupsHiddenNotice) {
        autoGearBackupsHiddenNotice.hidden = show;
      }
      if (!show) {
        if (autoGearBackupSelect) autoGearBackupSelect.disabled = true;
        if (autoGearBackupRestoreButton) autoGearBackupRestoreButton.disabled = true;
      } else {
        updateAutoGearBackupRestoreButtonState();
      }
    }
    function setAutoGearBackupsVisible(show) {
      var next = !!show;
      if (autoGearBackupsVisible === next) {
        applyAutoGearBackupVisibility();
        return;
      }
      autoGearBackupsVisible = next;
      persistAutoGearBackupVisibility(autoGearBackupsVisible);
      if (autoGearBackupsVisible) {
        renderAutoGearBackupControls();
      } else {
        applyAutoGearBackupVisibility();
      }
    }
    function handleAutoGearPresetSelection(event) {
      var _texts$currentLang7, _texts$en20, _texts$currentLang8, _texts$en21;
      if (!event || !autoGearPresetSelect) return;
      if (sharedImportProjectPresetActive) {
        sharedImportProjectPresetActive = false;
        sharedImportPreviousPresetId = '';
      }
      var presetId = event.target.value;
      if (!presetId) {
        setActiveAutoGearPresetId('', {
          persist: true
        });
        return;
      }
      var preset = getAutoGearPresetById(presetId);
      if (!preset) {
        setActiveAutoGearPresetId('', {
          persist: true
        });
        renderAutoGearPresetsControls();
        return;
      }
      var confirmTemplate = ((_texts$currentLang7 = texts[currentLang]) === null || _texts$currentLang7 === void 0 ? void 0 : _texts$currentLang7.autoGearPresetApplyConfirm) || ((_texts$en20 = texts.en) === null || _texts$en20 === void 0 ? void 0 : _texts$en20.autoGearPresetApplyConfirm) || "Replace your automatic gear rules with the preset \"".concat(preset.label, "\"?");
      var confirmMessage = confirmTemplate.includes('%s') ? formatWithPlaceholders(confirmTemplate, preset.label) : confirmTemplate;
      var confirmed = true;
      if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
        confirmed = window.confirm(confirmMessage);
      }
      if (!confirmed) {
        autoGearPresetSelect.value = activeAutoGearPresetId || '';
        return;
      }
      setAutoGearRules(preset.rules);
      updateAutoGearCatalogOptions();
      renderAutoGearRulesList();
      var appliedMessage = ((_texts$currentLang8 = texts[currentLang]) === null || _texts$currentLang8 === void 0 ? void 0 : _texts$currentLang8.autoGearPresetApplied) || ((_texts$en21 = texts.en) === null || _texts$en21 === void 0 ? void 0 : _texts$en21.autoGearPresetApplied) || 'Preset applied.';
      showNotification('success', appliedMessage);
    }
    function handleAutoGearSavePreset() {
      return _handleAutoGearSavePreset.apply(this, arguments);
    }
    function _handleAutoGearSavePreset() {
      _handleAutoGearSavePreset = _asyncToGenerator(_regenerator().m(function _callee3() {
        var _texts$currentLang75, _texts$en172, _texts$currentLang76, _texts$en173, _texts$currentLang79, _texts$en176;
        var rules, activePreset, previousAutoPresetId, promptTemplate, defaultName, requiredMessage, response, trimmed, normalizedName, existingByName, targetId, _texts$currentLang77, _texts$en174, overwriteTemplate, overwriteMessage, overwriteConfirmed, presetId, normalizedPreset, _texts$currentLang78, _texts$en175, _requiredMessage, existingIndex, autoPresetIndex, savedMessage;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              rules = getAutoGearRules();
              activePreset = getAutoGearPresetById(activeAutoGearPresetId);
              previousAutoPresetId = autoGearAutoPresetIdState;
              promptTemplate = ((_texts$currentLang75 = texts[currentLang]) === null || _texts$currentLang75 === void 0 ? void 0 : _texts$currentLang75.autoGearPresetNamePrompt) || ((_texts$en172 = texts.en) === null || _texts$en172 === void 0 ? void 0 : _texts$en172.autoGearPresetNamePrompt) || 'Name this preset';
              defaultName = activePreset ? activePreset.label : '';
              requiredMessage = ((_texts$currentLang76 = texts[currentLang]) === null || _texts$currentLang76 === void 0 ? void 0 : _texts$currentLang76.autoGearPresetNameRequired) || ((_texts$en173 = texts.en) === null || _texts$en173 === void 0 ? void 0 : _texts$en173.autoGearPresetNameRequired) || 'Enter a preset name to continue.';
              _context3.n = 1;
              return requestAutoGearPresetName(promptTemplate, defaultName, requiredMessage);
            case 1:
              response = _context3.v;
              if (!(response === null)) {
                _context3.n = 2;
                break;
              }
              return _context3.a(2);
            case 2:
              trimmed = typeof response === 'string' ? response.trim() : '';
              if (trimmed) {
                _context3.n = 3;
                break;
              }
              if (typeof window.alert === 'function') {
                window.alert(requiredMessage);
              }
              return _context3.a(2);
            case 3:
              normalizedName = trimmed;
              existingByName = autoGearPresets.find(function (preset) {
                return preset.label.toLowerCase() === normalizedName.toLowerCase();
              });
              targetId = (activePreset === null || activePreset === void 0 ? void 0 : activePreset.id) || '';
              if (!(existingByName && existingByName.id !== targetId)) {
                _context3.n = 5;
                break;
              }
              overwriteTemplate = ((_texts$currentLang77 = texts[currentLang]) === null || _texts$currentLang77 === void 0 ? void 0 : _texts$currentLang77.autoGearPresetOverwriteConfirm) || ((_texts$en174 = texts.en) === null || _texts$en174 === void 0 ? void 0 : _texts$en174.autoGearPresetOverwriteConfirm) || "Replace the existing preset \"".concat(normalizedName, "\"?");
              overwriteMessage = overwriteTemplate.includes('%s') ? formatWithPlaceholders(overwriteTemplate, normalizedName) : overwriteTemplate;
              overwriteConfirmed = true;
              if (typeof window.confirm === 'function') {
                overwriteConfirmed = window.confirm(overwriteMessage);
              }
              if (overwriteConfirmed) {
                _context3.n = 4;
                break;
              }
              return _context3.a(2);
            case 4:
              targetId = existingByName.id;
            case 5:
              presetId = targetId || generateAutoGearId('preset');
              normalizedPreset = normalizeAutoGearPreset({
                id: presetId,
                label: normalizedName,
                rules: rules
              });
              if (normalizedPreset) {
                _context3.n = 6;
                break;
              }
              _requiredMessage = ((_texts$currentLang78 = texts[currentLang]) === null || _texts$currentLang78 === void 0 ? void 0 : _texts$currentLang78.autoGearPresetNameRequired) || ((_texts$en175 = texts.en) === null || _texts$en175 === void 0 ? void 0 : _texts$en175.autoGearPresetNameRequired) || 'Enter a preset name to continue.';
              if (typeof window.alert === 'function') {
                window.alert(_requiredMessage);
              }
              return _context3.a(2);
            case 6:
              if (previousAutoPresetId) {
                setAutoGearAutoPresetId('', {
                  persist: true,
                  skipRender: true
                });
              }
              existingIndex = autoGearPresets.findIndex(function (preset) {
                return preset.id === normalizedPreset.id;
              });
              if (existingIndex >= 0) {
                autoGearPresets[existingIndex] = normalizedPreset;
              } else {
                if (previousAutoPresetId) {
                  autoPresetIndex = autoGearPresets.findIndex(function (preset) {
                    return preset && preset.id === previousAutoPresetId;
                  });
                  if (autoPresetIndex >= 0) {
                    autoGearPresets.splice(autoPresetIndex, 1);
                  }
                }
                autoGearPresets.push(normalizedPreset);
              }
              autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
              persistAutoGearPresets(autoGearPresets);
              setActiveAutoGearPresetId(normalizedPreset.id, {
                persist: true,
                skipRender: true
              });
              renderAutoGearPresetsControls();
              savedMessage = ((_texts$currentLang79 = texts[currentLang]) === null || _texts$currentLang79 === void 0 ? void 0 : _texts$currentLang79.autoGearPresetSaved) || ((_texts$en176 = texts.en) === null || _texts$en176 === void 0 ? void 0 : _texts$en176.autoGearPresetSaved) || 'Automatic gear preset saved.';
              showNotification('success', savedMessage);
            case 7:
              return _context3.a(2);
          }
        }, _callee3);
      }));
      return _handleAutoGearSavePreset.apply(this, arguments);
    }
    function handleAutoGearDeletePreset() {
      var _texts$currentLang9, _texts$en22, _texts$currentLang0, _texts$en23;
      if (!activeAutoGearPresetId) return;
      var preset = getAutoGearPresetById(activeAutoGearPresetId);
      var label = preset ? preset.label : '';
      var confirmTemplate = ((_texts$currentLang9 = texts[currentLang]) === null || _texts$currentLang9 === void 0 ? void 0 : _texts$currentLang9.autoGearPresetDeleteConfirm) || ((_texts$en22 = texts.en) === null || _texts$en22 === void 0 ? void 0 : _texts$en22.autoGearPresetDeleteConfirm) || 'Delete this preset?';
      var confirmMessage = label && confirmTemplate.includes('%s') ? formatWithPlaceholders(confirmTemplate, label) : confirmTemplate;
      var confirmed = true;
      if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
        confirmed = window.confirm(confirmMessage);
      }
      if (!confirmed) return;
      if (autoGearAutoPresetIdState && autoGearAutoPresetIdState === activeAutoGearPresetId) {
        setAutoGearAutoPresetId('', {
          persist: true,
          skipRender: true
        });
      }
      autoGearPresets = autoGearPresets.filter(function (entry) {
        return entry.id !== activeAutoGearPresetId;
      });
      autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
      persistAutoGearPresets(autoGearPresets);
      setActiveAutoGearPresetId('', {
        persist: true,
        skipRender: true
      });
      renderAutoGearPresetsControls();
      var deletedMessage = ((_texts$currentLang0 = texts[currentLang]) === null || _texts$currentLang0 === void 0 ? void 0 : _texts$currentLang0.autoGearPresetDeleted) || ((_texts$en23 = texts.en) === null || _texts$en23 === void 0 ? void 0 : _texts$en23.autoGearPresetDeleted) || 'Automatic gear preset deleted.';
      showNotification('success', deletedMessage);
    }
    function handleAutoGearShowBackupsToggle() {
      if (!autoGearShowBackupsCheckbox) return;
      setAutoGearBackupsVisible(autoGearShowBackupsCheckbox.checked);
    }
    function handleAutoGearBackupRetentionInput() {
      if (!autoGearBackupRetentionInput) return;
      if (autoGearBackupRetentionWarningText) {
        updateAutoGearBackupRetentionWarning('');
      }
    }
    function handleAutoGearBackupRetentionBlur() {
      setTimeout(function () {
        if (!autoGearBackupRetentionWarningText) {
          updateAutoGearBackupRetentionWarning('');
        }
      }, 0);
    }
    function handleAutoGearBackupRetentionChange() {
      var _texts$currentLang19, _texts$en34;
      if (!autoGearBackupRetentionInput) return;
      var rawValue = autoGearBackupRetentionInput.value;
      var parsed = Number(rawValue);
      if (!Number.isFinite(parsed)) {
        autoGearBackupRetentionInput.value = String(autoGearBackupRetention);
        updateAutoGearBackupRetentionWarning('');
        renderAutoGearBackupRetentionControls();
        return;
      }
      var normalized = clampAutoGearBackupRetentionLimit(parsed);
      if (normalized === autoGearBackupRetention) {
        updateAutoGearBackupRetentionWarning('');
        renderAutoGearBackupRetentionControls();
        return;
      }
      var previousLimit = autoGearBackupRetention;
      if (normalized < previousLimit) {
        var _texts$currentLang1, _texts$en24, _texts$currentLang10, _texts$en25, _texts$currentLang11, _texts$en26, _texts$currentLang12, _texts$en27, _texts$currentLang14, _texts$en29, _texts$currentLang16, _texts$en31, _texts$currentLang17, _texts$en32;
        var trimmedEstimate = Math.max(0, autoGearBackups.length - normalized);
        var warningTemplate = ((_texts$currentLang1 = texts[currentLang]) === null || _texts$currentLang1 === void 0 ? void 0 : _texts$currentLang1.autoGearBackupRetentionWarning) || ((_texts$en24 = texts.en) === null || _texts$en24 === void 0 ? void 0 : _texts$en24.autoGearBackupRetentionWarning) || 'Lowering to {limit} will remove {trimmed}. A safety snapshot will be saved first.';
        var warningMessage = warningTemplate.replace('{limit}', formatAutoGearBackupCount(normalized)).replace('{trimmed}', formatAutoGearBackupCount(Math.max(trimmedEstimate, 1)));
        updateAutoGearBackupRetentionWarning(warningMessage);
        var confirmTemplate = ((_texts$currentLang10 = texts[currentLang]) === null || _texts$currentLang10 === void 0 ? void 0 : _texts$currentLang10.autoGearBackupRetentionConfirm) || ((_texts$en25 = texts.en) === null || _texts$en25 === void 0 ? void 0 : _texts$en25.autoGearBackupRetentionConfirm) || 'Save a safety snapshot and trim older backups now?';
        var confirmMessage = confirmTemplate.replace('{limit}', formatAutoGearBackupCount(normalized)).replace('{trimmed}', formatAutoGearBackupCount(Math.max(trimmedEstimate, 1)));
        var confirmed = typeof window !== 'undefined' && typeof window.confirm === 'function' ? window.confirm(confirmMessage) : true;
        if (!confirmed) {
          autoGearBackupRetentionInput.value = String(autoGearBackupRetention);
          updateAutoGearBackupRetentionWarning('');
          renderAutoGearBackupRetentionControls();
          return;
        }
        var safetyBase = ((_texts$currentLang11 = texts[currentLang]) === null || _texts$currentLang11 === void 0 ? void 0 : _texts$currentLang11.autoGearBackupRetentionSafetyNote) || ((_texts$en26 = texts.en) === null || _texts$en26 === void 0 ? void 0 : _texts$en26.autoGearBackupRetentionSafetyNote) || 'Retention lowered to {limit}.';
        var safetyTrimmed = ((_texts$currentLang12 = texts[currentLang]) === null || _texts$currentLang12 === void 0 ? void 0 : _texts$currentLang12.autoGearBackupRetentionSafetyNoteTrimmed) || ((_texts$en27 = texts.en) === null || _texts$en27 === void 0 ? void 0 : _texts$en27.autoGearBackupRetentionSafetyNoteTrimmed) || 'Retention lowered to {limit}. Removed {trimmed} in this change.';
        var safetyTemplate = trimmedEstimate > 0 ? safetyTrimmed : safetyBase;
        var safetyNote = safetyTemplate.replace('{limit}', formatAutoGearBackupCount(normalized)).replace('{trimmed}', formatAutoGearBackupCount(Math.max(trimmedEstimate, 1)));
        var safetyResult = captureAutoGearBackupSnapshot({
          force: true,
          notifySuccess: false,
          note: safetyNote
        });
        if (safetyResult.status !== 'created') {
          var _texts$currentLang13, _texts$en28;
          var failureMessage = ((_texts$currentLang13 = texts[currentLang]) === null || _texts$currentLang13 === void 0 ? void 0 : _texts$currentLang13.autoGearBackupRetentionSafetyFailed) || ((_texts$en28 = texts.en) === null || _texts$en28 === void 0 ? void 0 : _texts$en28.autoGearBackupRetentionSafetyFailed) || 'Safety snapshot failed. Retention was not changed.';
          showNotification('error', failureMessage);
          autoGearBackupRetentionInput.value = String(autoGearBackupRetention);
          updateAutoGearBackupRetentionWarning('');
          renderAutoGearBackupControls();
          renderAutoGearBackupRetentionControls();
          return;
        }
        var safetySavedMessage = ((_texts$currentLang14 = texts[currentLang]) === null || _texts$currentLang14 === void 0 ? void 0 : _texts$currentLang14.autoGearBackupRetentionSafetySaved) || ((_texts$en29 = texts.en) === null || _texts$en29 === void 0 ? void 0 : _texts$en29.autoGearBackupRetentionSafetySaved) || 'Safety snapshot captured before trimming backups.';
        showNotification('success', safetySavedMessage);
        var trimResult = enforceAutoGearBackupRetentionLimit(normalized);
        if (!trimResult.success) {
          var _texts$currentLang15, _texts$en30;
          var _failureMessage = ((_texts$currentLang15 = texts[currentLang]) === null || _texts$currentLang15 === void 0 ? void 0 : _texts$currentLang15.autoGearBackupRetentionUpdateFailed) || ((_texts$en30 = texts.en) === null || _texts$en30 === void 0 ? void 0 : _texts$en30.autoGearBackupRetentionUpdateFailed) || 'Could not apply the new retention limit.';
          showNotification('error', _failureMessage);
          autoGearBackupRetentionInput.value = String(autoGearBackupRetention);
          updateAutoGearBackupRetentionWarning('');
          return;
        }
        var trimmedCount = trimResult.trimmed.length;
        var _successTemplate = trimmedCount > 0 ? ((_texts$currentLang16 = texts[currentLang]) === null || _texts$currentLang16 === void 0 ? void 0 : _texts$currentLang16.autoGearBackupRetentionUpdated) || ((_texts$en31 = texts.en) === null || _texts$en31 === void 0 ? void 0 : _texts$en31.autoGearBackupRetentionUpdated) || 'Retention updated to {limit}. Removed {trimmed}.' : ((_texts$currentLang17 = texts[currentLang]) === null || _texts$currentLang17 === void 0 ? void 0 : _texts$currentLang17.autoGearBackupRetentionUpdatedNoTrim) || ((_texts$en32 = texts.en) === null || _texts$en32 === void 0 ? void 0 : _texts$en32.autoGearBackupRetentionUpdatedNoTrim) || 'Retention updated to {limit}. No backups were removed.';
        var _successMessage = _successTemplate.replace('{limit}', formatAutoGearBackupCount(normalized)).replace('{trimmed}', formatAutoGearBackupCount(Math.max(trimmedCount, 1)));
        showNotification('success', _successMessage);
        updateAutoGearBackupRetentionWarning('');
        return;
      }
      var increaseResult = enforceAutoGearBackupRetentionLimit(normalized);
      if (!increaseResult.success) {
        var _texts$currentLang18, _texts$en33;
        var _failureMessage2 = ((_texts$currentLang18 = texts[currentLang]) === null || _texts$currentLang18 === void 0 ? void 0 : _texts$currentLang18.autoGearBackupRetentionUpdateFailed) || ((_texts$en33 = texts.en) === null || _texts$en33 === void 0 ? void 0 : _texts$en33.autoGearBackupRetentionUpdateFailed) || 'Could not apply the new retention limit.';
        showNotification('error', _failureMessage2);
        autoGearBackupRetentionInput.value = String(autoGearBackupRetention);
        updateAutoGearBackupRetentionWarning('');
        return;
      }
      var successTemplate = ((_texts$currentLang19 = texts[currentLang]) === null || _texts$currentLang19 === void 0 ? void 0 : _texts$currentLang19.autoGearBackupRetentionExpanded) || ((_texts$en34 = texts.en) === null || _texts$en34 === void 0 ? void 0 : _texts$en34.autoGearBackupRetentionExpanded) || 'Retention updated to {limit}.';
      var successMessage = successTemplate.replace('{limit}', formatAutoGearBackupCount(normalized));
      showNotification('success', successMessage);
      updateAutoGearBackupRetentionWarning('');
    }
    function renderAutoGearBackupControls() {
      if (!autoGearBackupSelect || !autoGearBackupEmptyMessage) return;
      var previousValue = autoGearBackupSelect.value;
      var placeholderText = getAutoGearBackupSelectPlaceholder();
      autoGearBackupSelect.innerHTML = '';
      var placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = placeholderText;
      placeholder.disabled = true;
      autoGearBackupSelect.appendChild(placeholder);
      var availableIds = new Set(autoGearBackups.map(function (backup) {
        return backup.id;
      }));
      var retainSelection = previousValue && availableIds.has(previousValue);
      autoGearBackups.forEach(function (backup) {
        var option = document.createElement('option');
        option.value = backup.id;
        option.textContent = formatAutoGearBackupMeta(backup);
        if (backup.createdAt) {
          option.title = backup.createdAt;
        }
        if (retainSelection && backup.id === previousValue) {
          option.selected = true;
        }
        autoGearBackupSelect.appendChild(option);
      });
      if (!autoGearBackups.length) {
        placeholder.selected = true;
        autoGearBackupSelect.value = '';
        autoGearBackupSelect.disabled = true;
        autoGearBackupEmptyMessage.hidden = false;
      } else {
        autoGearBackupSelect.disabled = false;
        autoGearBackupEmptyMessage.hidden = true;
        if (retainSelection) {
          placeholder.selected = false;
          autoGearBackupSelect.value = previousValue;
        } else {
          placeholder.selected = true;
          autoGearBackupSelect.value = '';
        }
      }
      updateAutoGearBackupRestoreButtonState();
      applyAutoGearBackupVisibility();
      renderAutoGearBackupRetentionControls();
    }
    function extractAutoGearTriggers(rule) {
      if (!rule || _typeof(rule) !== 'object') {
        return {
          always: false,
          scenarioLogic: 'all',
          scenarioPrimary: '',
          scenarioMultiplier: 1,
          scenarios: [],
          mattebox: [],
          cameraHandle: [],
          viewfinderExtension: [],
          deliveryResolution: [],
          videoDistribution: [],
          camera: [],
          monitor: [],
          crewPresent: [],
          crewAbsent: [],
          wireless: [],
          motors: [],
          controllers: [],
          distance: [],
          shootingDays: null
        };
      }
      return {
        always: Boolean(rule.always),
        scenarioLogic: normalizeAutoGearScenarioLogic(rule.scenarioLogic),
        scenarioPrimary: normalizeAutoGearScenarioPrimary(rule.scenarioPrimary),
        scenarioMultiplier: normalizeAutoGearScenarioMultiplier(rule.scenarioMultiplier),
        scenarios: Array.isArray(rule.scenarios) ? rule.scenarios.slice() : [],
        mattebox: Array.isArray(rule.mattebox) ? rule.mattebox.slice() : [],
        cameraHandle: Array.isArray(rule.cameraHandle) ? rule.cameraHandle.slice() : [],
        viewfinderExtension: Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension.slice() : [],
        deliveryResolution: Array.isArray(rule.deliveryResolution) ? rule.deliveryResolution.slice() : [],
        videoDistribution: Array.isArray(rule.videoDistribution) ? rule.videoDistribution.slice() : [],
        camera: Array.isArray(rule.camera) ? rule.camera.slice() : [],
        monitor: Array.isArray(rule.monitor) ? rule.monitor.slice() : [],
        crewPresent: Array.isArray(rule.crewPresent) ? rule.crewPresent.slice() : [],
        crewAbsent: Array.isArray(rule.crewAbsent) ? rule.crewAbsent.slice() : [],
        wireless: Array.isArray(rule.wireless) ? rule.wireless.slice() : [],
        motors: Array.isArray(rule.motors) ? rule.motors.slice() : [],
        controllers: Array.isArray(rule.controllers) ? rule.controllers.slice() : [],
        distance: Array.isArray(rule.distance) ? rule.distance.slice() : [],
        shootingDays: rule.shootingDays ? normalizeAutoGearShootingDaysCondition(rule.shootingDays) : null
      };
    }
    function snapshotAutoGearRuleForSummary(rule, index) {
      if (!rule || _typeof(rule) !== 'object') return null;
      var baseIndex = Number.isInteger(index) ? index : 0;
      var id = typeof rule.id === 'string' && rule.id ? rule.id : "rule-".concat(baseIndex + 1);
      var label = typeof rule.label === 'string' ? rule.label : '';
      var triggers = extractAutoGearTriggers(rule);
      var add = Array.isArray(rule.add) ? rule.add.map(autoGearItemSnapshot).filter(Boolean) : [];
      var remove = Array.isArray(rule.remove) ? rule.remove.map(autoGearItemSnapshot).filter(Boolean) : [];
      return _objectSpread({
        id: id,
        label: label,
        index: baseIndex,
        position: baseIndex + 1,
        add: add,
        remove: remove
      }, triggers);
    }
    function createAutoGearRuleReference(rule) {
      if (!rule || _typeof(rule) !== 'object') return null;
      var index = Number.isInteger(rule.index) ? rule.index : 0;
      var position = Number.isInteger(rule.position) ? rule.position : index + 1;
      var id = typeof rule.id === 'string' && rule.id ? rule.id : "rule-".concat(position);
      var label = typeof rule.label === 'string' ? rule.label : '';
      return {
        id: id,
        label: label,
        index: index,
        position: position
      };
    }
    function dedupeAutoGearRuleReferences(refs) {
      var result = [];
      var seen = new Set();
      (Array.isArray(refs) ? refs : []).forEach(function (ref) {
        if (!ref || _typeof(ref) !== 'object') return;
        var key = ref.id || "index-".concat(ref.index);
        if (seen.has(key)) return;
        seen.add(key);
        result.push(_objectSpread({}, ref));
      });
      return result;
    }
    function createAutoGearItemKey(item) {
      var snapshot = autoGearItemSnapshot(item);
      if (!snapshot) return '';
      return coreStableStringify({
        name: snapshot.name || '',
        category: snapshot.category || '',
        quantity: normalizeAutoGearQuantity(snapshot.quantity),
        screenSize: snapshot.screenSize || '',
        selectorType: snapshot.selectorType || 'none',
        selectorDefault: snapshot.selectorDefault || '',
        selectorEnabled: Boolean(snapshot.selectorEnabled),
        notes: snapshot.notes || ''
      });
    }
    function createAutoGearTriggerKeyForSummary(rule) {
      var triggers = extractAutoGearTriggers(rule);
      var sorted = _objectSpread(_objectSpread({}, triggers), {}, {
        scenarios: triggers.scenarios.slice().sort(localeSort),
        mattebox: triggers.mattebox.slice().sort(localeSort),
        cameraHandle: triggers.cameraHandle.slice().sort(localeSort),
        viewfinderExtension: triggers.viewfinderExtension.slice().sort(localeSort),
        deliveryResolution: triggers.deliveryResolution.slice().sort(localeSort),
        videoDistribution: triggers.videoDistribution.slice().sort(localeSort),
        camera: triggers.camera.slice().sort(localeSort),
        monitor: triggers.monitor.slice().sort(localeSort),
        crewPresent: triggers.crewPresent.slice().sort(localeSort),
        crewAbsent: triggers.crewAbsent.slice().sort(localeSort),
        wireless: triggers.wireless.slice().sort(localeSort),
        motors: triggers.motors.slice().sort(localeSort),
        controllers: triggers.controllers.slice().sort(localeSort),
        distance: triggers.distance.slice().sort(localeSort),
        shootingDays: triggers.shootingDays ? {
          mode: triggers.shootingDays.mode,
          value: triggers.shootingDays.value
        } : null
      });
      return coreStableStringify(sorted);
    }
    function collectAutoGearScenarioCatalog() {
      if (typeof document === 'undefined') return [];
      var select = document.getElementById('requiredScenarios');
      if (!select) return [];
      var map = new Map();
      Array.from(select.options || []).forEach(function (option) {
        var value = typeof option.value === 'string' ? option.value.trim() : '';
        if (!value) return;
        var normalized = normalizeAutoGearTriggerValue(value) || value;
        if (map.has(normalized)) return;
        map.set(normalized, {
          value: value,
          label: option.textContent || value,
          normalized: normalized
        });
      });
      return Array.from(map.values()).sort(function (a, b) {
        return localeSort(a.label, b.label);
      });
    }
    function getAutoGearRuleCoverageSummary() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var sourceRules = Array.isArray(options.rules) ? options.rules : getAutoGearRules();
      var snapshots = [];
      (Array.isArray(sourceRules) ? sourceRules : []).forEach(function (rule, index) {
        var snapshot = snapshotAutoGearRuleForSummary(rule, index);
        if (snapshot) {
          snapshots.push(snapshot);
        }
      });
      var summary = {
        generatedAt: new Date().toISOString(),
        totalRules: snapshots.length
      };
      var catalog = collectAutoGearScenarioCatalog();
      if (!snapshots.length) {
        summary.duplicates = {
          totalGroups: 0,
          totalRules: 0,
          groups: []
        };
        summary.conflicts = {
          totalItems: 0,
          totalRules: 0,
          items: []
        };
        summary.net = {
          addItems: 0,
          addQuantity: 0,
          removeItems: 0,
          removeQuantity: 0,
          netQuantity: 0
        };
        summary.scenarios = {
          catalog: catalog,
          coverage: [],
          uncovered: catalog.map(function (entry) {
            return {
              value: entry.value,
              label: entry.label,
              normalized: entry.normalized
            };
          }),
          overlaps: [],
          rulesWithoutScenarios: [],
          total: catalog.length,
          coveredCount: 0
        };
        autoGearSummaryLast = summary;
        return summary;
      }
      var duplicateMap = new Map();
      var duplicateRuleIds = new Set();
      snapshots.forEach(function (snapshot) {
        var key = createAutoGearTriggerKeyForSummary(snapshot);
        if (!duplicateMap.has(key)) {
          duplicateMap.set(key, {
            triggers: extractAutoGearTriggers(snapshot),
            rules: []
          });
        }
        var ref = createAutoGearRuleReference(snapshot);
        if (ref) {
          duplicateMap.get(key).rules.push(ref);
        }
      });
      var duplicateGroups = [];
      duplicateMap.forEach(function (entry) {
        var rules = dedupeAutoGearRuleReferences(entry.rules);
        if (rules.length <= 1) return;
        rules.forEach(function (ref) {
          return duplicateRuleIds.add(ref.id || "index-".concat(ref.index));
        });
        duplicateGroups.push({
          triggers: entry.triggers,
          rules: rules
        });
      });
      summary.duplicates = {
        totalGroups: duplicateGroups.length,
        totalRules: duplicateRuleIds.size,
        groups: duplicateGroups
      };
      var conflictMap = new Map();
      var conflictRuleIds = new Set();
      snapshots.forEach(function (snapshot) {
        var ref = createAutoGearRuleReference(snapshot);
        if (!ref) return;
        snapshot.add.forEach(function (item) {
          var key = createAutoGearItemKey(item);
          if (!key) return;
          if (!conflictMap.has(key)) {
            conflictMap.set(key, {
              item: item,
              adds: [],
              removes: []
            });
          }
          conflictMap.get(key).adds.push(ref);
        });
        snapshot.remove.forEach(function (item) {
          var key = createAutoGearItemKey(item);
          if (!key) return;
          if (!conflictMap.has(key)) {
            conflictMap.set(key, {
              item: item,
              adds: [],
              removes: []
            });
          }
          conflictMap.get(key).removes.push(ref);
        });
      });
      var conflictItems = [];
      conflictMap.forEach(function (entry) {
        var adds = dedupeAutoGearRuleReferences(entry.adds);
        var removes = dedupeAutoGearRuleReferences(entry.removes);
        if (!adds.length || !removes.length) return;
        adds.forEach(function (ref) {
          return conflictRuleIds.add(ref.id || "index-".concat(ref.index));
        });
        removes.forEach(function (ref) {
          return conflictRuleIds.add(ref.id || "index-".concat(ref.index));
        });
        conflictItems.push({
          item: entry.item,
          adds: adds,
          removes: removes
        });
      });
      summary.conflicts = {
        totalItems: conflictItems.length,
        totalRules: conflictRuleIds.size,
        items: conflictItems
      };
      var addItems = 0;
      var addQuantity = 0;
      var removeItems = 0;
      var removeQuantity = 0;
      snapshots.forEach(function (snapshot) {
        snapshot.add.forEach(function (item) {
          addItems += 1;
          addQuantity += normalizeAutoGearQuantity(item.quantity);
        });
        snapshot.remove.forEach(function (item) {
          removeItems += 1;
          removeQuantity += normalizeAutoGearQuantity(item.quantity);
        });
      });
      summary.net = {
        addItems: addItems,
        addQuantity: addQuantity,
        removeItems: removeItems,
        removeQuantity: removeQuantity,
        netQuantity: addQuantity - removeQuantity
      };
      var scenarioLabelMap = new Map();
      catalog.forEach(function (entry) {
        scenarioLabelMap.set(entry.normalized, entry.label);
        scenarioLabelMap.set(entry.value, entry.label);
      });
      var coverageMap = new Map();
      snapshots.forEach(function (snapshot) {
        var ref = createAutoGearRuleReference(snapshot);
        if (!ref) return;
        var list = Array.isArray(snapshot.scenarios) ? snapshot.scenarios : [];
        list.forEach(function (value) {
          if (typeof value !== 'string') return;
          var trimmed = value.trim();
          if (!trimmed) return;
          var normalized = normalizeAutoGearTriggerValue(trimmed) || trimmed;
          if (!coverageMap.has(normalized)) {
            coverageMap.set(normalized, {
              value: trimmed,
              normalized: normalized,
              rules: []
            });
          }
          coverageMap.get(normalized).rules.push(ref);
        });
      });
      var coverage = Array.from(coverageMap.values()).map(function (entry) {
        var rules = dedupeAutoGearRuleReferences(entry.rules);
        return {
          value: entry.value,
          normalized: entry.normalized,
          label: scenarioLabelMap.get(entry.normalized) || scenarioLabelMap.get(entry.value) || entry.value,
          rules: rules
        };
      }).sort(function (a, b) {
        return localeSort(a.label, b.label);
      });
      var coveredKeys = new Set(coverage.map(function (entry) {
        return entry.normalized;
      }));
      var uncovered = catalog.filter(function (entry) {
        return !coveredKeys.has(entry.normalized);
      }).map(function (entry) {
        return {
          value: entry.value,
          label: entry.label,
          normalized: entry.normalized
        };
      });
      uncovered.sort(function (a, b) {
        return localeSort(a.label, b.label);
      });
      var overlaps = coverage.filter(function (entry) {
        return entry.rules.length > 1;
      });
      var rulesWithoutScenarios = dedupeAutoGearRuleReferences(snapshots.filter(function (rule) {
        return !rule.always && (!Array.isArray(rule.scenarios) || !rule.scenarios.length);
      }).map(createAutoGearRuleReference).filter(Boolean));
      summary.scenarios = {
        catalog: catalog,
        coverage: coverage,
        uncovered: uncovered,
        overlaps: overlaps,
        rulesWithoutScenarios: rulesWithoutScenarios,
        total: catalog.length,
        coveredCount: coverage.length
      };
      autoGearSummaryLast = summary;
      return summary;
    }
    function formatAutoGearRuleReference(ref, langTexts) {
      var _texts$en35, _texts$en37;
      if (!ref || _typeof(ref) !== 'object') return '';
      var baseLabel = ref.label || langTexts.autoGearRuleBadgeUnnamed || ((_texts$en35 = texts.en) === null || _texts$en35 === void 0 ? void 0 : _texts$en35.autoGearRuleBadgeUnnamed) || 'Automatic rule';
      var positionText = formatNumberForLang(currentLang, ref.position || 1);
      if (ref.label) {
        var _texts$en36;
        var _template4 = langTexts.autoGearSummaryRuleReference || ((_texts$en36 = texts.en) === null || _texts$en36 === void 0 ? void 0 : _texts$en36.autoGearSummaryRuleReference) || 'Rule {position}: {label}';
        return _template4.replace('{position}', positionText).replace('{label}', baseLabel);
      }
      var template = langTexts.autoGearSummaryRuleReferenceUntitled || ((_texts$en37 = texts.en) === null || _texts$en37 === void 0 ? void 0 : _texts$en37.autoGearSummaryRuleReferenceUntitled) || 'Rule {position}';
      return template.replace('{position}', positionText);
    }
    function getAutoGearAnyMotorLabelForLang(langTexts) {
      var fallbackTexts = texts.en || {};
      var source = langTexts || fallbackTexts;
      return source.autoGearMotorsAny || fallbackTexts.autoGearMotorsAny || 'Any motor selected';
    }
    function formatAutoGearMotorValue(value, langTexts) {
      var normalized = typeof value === 'string' ? value.trim().toLowerCase() : '';
      if (normalized === AUTO_GEAR_ANY_MOTOR_TOKEN_LOCAL) {
        return getAutoGearAnyMotorLabelForLang(langTexts);
      }
      return value;
    }
    function formatAutoGearTriggerDescription(triggers, analysis, langTexts) {
      var _analysis$scenarios, _analysis$scenarios2;
      if (!triggers) return '';
      var parts = [];
      if (triggers.always) {
        var _texts$en38;
        parts.push(langTexts.autoGearAlwaysMeta || ((_texts$en38 = texts.en) === null || _texts$en38 === void 0 ? void 0 : _texts$en38.autoGearAlwaysMeta) || 'Always active');
      }
      var scenarioMap = new Map();
      ((analysis === null || analysis === void 0 || (_analysis$scenarios = analysis.scenarios) === null || _analysis$scenarios === void 0 ? void 0 : _analysis$scenarios.catalog) || []).forEach(function (entry) {
        scenarioMap.set(entry.normalized, entry.label);
        scenarioMap.set(entry.value, entry.label);
      });
      ((analysis === null || analysis === void 0 || (_analysis$scenarios2 = analysis.scenarios) === null || _analysis$scenarios2 === void 0 ? void 0 : _analysis$scenarios2.coverage) || []).forEach(function (entry) {
        scenarioMap.set(entry.normalized, entry.label);
      });
      var formatScenarioLabel = function formatScenarioLabel(value) {
        var normalized = normalizeAutoGearTriggerValue(value) || value;
        return scenarioMap.get(normalized) || value;
      };
      if (Array.isArray(triggers.scenarios) && triggers.scenarios.length) {
        var _texts$en39;
        var scenarioLabels = triggers.scenarios.map(formatScenarioLabel).filter(Boolean);
        var label = langTexts.autoGearScenariosLabel || ((_texts$en39 = texts.en) === null || _texts$en39 === void 0 ? void 0 : _texts$en39.autoGearScenariosLabel) || 'Required scenarios';
        parts.push("".concat(label, ": ").concat(formatListForLang(currentLang, scenarioLabels)));
      }
      var scenarioLogic = normalizeAutoGearScenarioLogic(triggers.scenarioLogic);
      if (scenarioLogic) {
        var _texts$en40, _texts$en41, _texts$en42, _texts$en43;
        var modeLabel = scenarioLogic === 'any' ? langTexts.autoGearScenarioModeAny || ((_texts$en40 = texts.en) === null || _texts$en40 === void 0 ? void 0 : _texts$en40.autoGearScenarioModeAny) || 'Match any selected scenario' : scenarioLogic === 'multiplier' ? langTexts.autoGearScenarioModeMultiplier || ((_texts$en41 = texts.en) === null || _texts$en41 === void 0 ? void 0 : _texts$en41.autoGearScenarioModeMultiplier) || 'Multiply when combined' : langTexts.autoGearScenarioModeAll || ((_texts$en42 = texts.en) === null || _texts$en42 === void 0 ? void 0 : _texts$en42.autoGearScenarioModeAll) || 'Require every selected scenario';
        var modeHeading = langTexts.autoGearScenarioModeLabel || ((_texts$en43 = texts.en) === null || _texts$en43 === void 0 ? void 0 : _texts$en43.autoGearScenarioModeLabel) || 'Scenario matching';
        var detail = modeLabel;
        if (scenarioLogic === 'multiplier') {
          var _texts$en44;
          var factorLabel = langTexts.autoGearScenarioFactorLabel || ((_texts$en44 = texts.en) === null || _texts$en44 === void 0 ? void 0 : _texts$en44.autoGearScenarioFactorLabel) || 'Multiplier factor';
          var multiplier = normalizeAutoGearScenarioMultiplier(triggers.scenarioMultiplier);
          var multiplierText = formatNumberForLang(currentLang, multiplier || 1);
          var baseScenario = triggers.scenarioPrimary ? formatScenarioLabel(triggers.scenarioPrimary) : triggers.scenarios && triggers.scenarios.length ? formatScenarioLabel(triggers.scenarios[0]) : '';
          detail = baseScenario ? "".concat(modeLabel, " (").concat(factorLabel, ": \xD7").concat(multiplierText, ", ").concat(baseScenario, ")") : "".concat(modeLabel, " (\xD7").concat(multiplierText, ")");
        }
        parts.push("".concat(modeHeading, ": ").concat(detail));
      }
      var triggerConfigs = [{
        key: 'mattebox',
        labelKey: 'autoGearMatteboxLabel'
      }, {
        key: 'cameraHandle',
        labelKey: 'autoGearCameraHandleLabel'
      }, {
        key: 'viewfinderExtension',
        labelKey: 'autoGearViewfinderExtensionLabel',
        formatter: getViewfinderFallbackLabel
      }, {
        key: 'deliveryResolution',
        labelKey: 'autoGearDeliveryResolutionLabel'
      }, {
        key: 'videoDistribution',
        labelKey: 'autoGearVideoDistributionLabel',
        formatter: getVideoDistributionFallbackLabel
      }, {
        key: 'camera',
        labelKey: 'autoGearCameraLabel'
      }, {
        key: 'monitor',
        labelKey: 'autoGearMonitorLabel'
      }, {
        key: 'crewPresent',
        labelKey: 'autoGearCrewPresentLabel'
      }, {
        key: 'crewAbsent',
        labelKey: 'autoGearCrewAbsentLabel'
      }, {
        key: 'wireless',
        labelKey: 'autoGearWirelessLabel'
      }, {
        key: 'motors',
        labelKey: 'autoGearMotorsLabel',
        formatter: function formatter(value) {
          return formatAutoGearMotorValue(value, langTexts);
        }
      }, {
        key: 'controllers',
        labelKey: 'autoGearControllersLabel'
      }, {
        key: 'distance',
        labelKey: 'autoGearDistanceLabel'
      }];
      triggerConfigs.forEach(function (config) {
        var _texts$en45;
        var values = Array.isArray(triggers[config.key]) ? triggers[config.key].filter(Boolean) : [];
        if (!values.length) return;
        var label = langTexts[config.labelKey] || ((_texts$en45 = texts.en) === null || _texts$en45 === void 0 ? void 0 : _texts$en45[config.labelKey]) || config.labelKey;
        var formatted = values.map(function (value) {
          if (!config.formatter) return value;
          try {
            return config.formatter(value);
          } catch (error) {
            void error;
            return value;
          }
        }).filter(Boolean);
        if (formatted.length) {
          parts.push("".concat(label, ": ").concat(formatListForLang(currentLang, formatted)));
        }
      });
      if (triggers.shootingDays && triggers.shootingDays.value) {
        var _texts$en46, _texts$en47;
        var _label = langTexts.autoGearShootingDaysLabel || ((_texts$en46 = texts.en) === null || _texts$en46 === void 0 ? void 0 : _texts$en46.autoGearShootingDaysLabel) || 'Shooting days condition';
        var modeKey = triggers.shootingDays.mode === 'maximum' ? 'autoGearShootingDaysModeMaximum' : triggers.shootingDays.mode === 'every' ? 'autoGearShootingDaysModeEvery' : 'autoGearShootingDaysModeMinimum';
        var _modeLabel = langTexts[modeKey] || ((_texts$en47 = texts.en) === null || _texts$en47 === void 0 ? void 0 : _texts$en47[modeKey]) || triggers.shootingDays.mode;
        var valueText = formatNumberForLang(currentLang, triggers.shootingDays.value);
        parts.push("".concat(_label, ": ").concat(_modeLabel, " ").concat(valueText));
      }
      return parts.join('; ');
    }
    function renderAutoGearRuleSummary(analysis) {
      var _texts$en48, _analysis$scenarios3, _analysis$scenarios4, _analysis$scenarios5, _analysis$scenarios6, _analysis$scenarios7, _texts$en54, _texts$en55, _texts$en56, _texts$en57, _texts$en58, _texts$en59, _texts$en60, _texts$en61, _texts$en62, _texts$en63, _texts$en64, _texts$en65, _texts$en66, _texts$en67, _texts$en68, _texts$en69, _texts$en70, _texts$en71, _texts$en72, _texts$en73;
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!autoGearSummarySection || !autoGearSummaryHeadingElem || !autoGearSummaryDescriptionElem || !autoGearSummaryCards || !autoGearSummaryDetails) {
        return;
      }
      var langTexts = texts[currentLang] || texts.en || {};
      var heading = langTexts.autoGearSummaryHeading || ((_texts$en48 = texts.en) === null || _texts$en48 === void 0 ? void 0 : _texts$en48.autoGearSummaryHeading) || autoGearSummaryHeadingElem.textContent || 'Rule coverage overview';
      autoGearSummaryHeadingElem.textContent = heading;
      if (!analysis || typeof analysis.totalRules !== 'number') {
        autoGearSummarySection.hidden = true;
        return;
      }
      autoGearSummarySection.hidden = false;
      autoGearSummaryCards.innerHTML = '';
      autoGearSummaryDetails.innerHTML = '';
      var totalRules = analysis.totalRules;
      var filteredRules = typeof context.filteredRules === 'number' ? context.filteredRules : totalRules;
      var visibleRules = typeof context.visibleRules === 'number' ? context.visibleRules : filteredRules;
      var focus = context.focus || autoGearSummaryFocus || 'all';
      var hasSearchFilters = Boolean(context.hasSearchFilters);
      var focusApplied = Boolean(context.focusApplied);
      var scenarioTotal = typeof ((_analysis$scenarios3 = analysis.scenarios) === null || _analysis$scenarios3 === void 0 ? void 0 : _analysis$scenarios3.total) === 'number' ? analysis.scenarios.total : Array.isArray((_analysis$scenarios4 = analysis.scenarios) === null || _analysis$scenarios4 === void 0 ? void 0 : _analysis$scenarios4.catalog) ? analysis.scenarios.catalog.length : 0;
      var scenarioCovered = typeof ((_analysis$scenarios5 = analysis.scenarios) === null || _analysis$scenarios5 === void 0 ? void 0 : _analysis$scenarios5.coveredCount) === 'number' ? analysis.scenarios.coveredCount : Array.isArray((_analysis$scenarios6 = analysis.scenarios) === null || _analysis$scenarios6 === void 0 ? void 0 : _analysis$scenarios6.coverage) ? analysis.scenarios.coverage.length : 0;
      var overlapCount = Array.isArray((_analysis$scenarios7 = analysis.scenarios) === null || _analysis$scenarios7 === void 0 ? void 0 : _analysis$scenarios7.overlaps) ? analysis.scenarios.overlaps.length : 0;
      var hasScenarioCatalog = scenarioTotal > 0;
      var coveragePercent = hasScenarioCatalog && scenarioTotal ? Math.round(scenarioCovered / scenarioTotal * 100) : 0;
      if (!totalRules) {
        var _texts$en49;
        autoGearSummaryDescriptionElem.textContent = langTexts.autoGearSummaryEmpty || ((_texts$en49 = texts.en) === null || _texts$en49 === void 0 ? void 0 : _texts$en49.autoGearSummaryEmpty) || 'Add a rule to unlock coverage insights.';
        return;
      }
      if (hasSearchFilters || focus !== 'all' && focus !== 'uncovered' || focusApplied) {
        var _texts$en50;
        var template = langTexts.autoGearSummaryFilteredDescription || ((_texts$en50 = texts.en) === null || _texts$en50 === void 0 ? void 0 : _texts$en50.autoGearSummaryFilteredDescription) || 'Showing {visible} of {total} rules after filters.';
        autoGearSummaryDescriptionElem.textContent = template.replace('{visible}', formatNumberForLang(currentLang, visibleRules)).replace('{filtered}', formatNumberForLang(currentLang, filteredRules)).replace('{total}', formatNumberForLang(currentLang, totalRules));
      } else {
        var _texts$en51;
        autoGearSummaryDescriptionElem.textContent = langTexts.autoGearSummaryDescription || ((_texts$en51 = texts.en) === null || _texts$en51 === void 0 ? void 0 : _texts$en51.autoGearSummaryDescription) || 'Review duplicates, coverage gaps and conflicts before exporting or printing.';
      }
      var formatRulesCount = function formatRulesCount(count) {
        var _texts$en52, _texts$en53;
        var template = count === 1 ? langTexts.autoGearRulesCountOne || ((_texts$en52 = texts.en) === null || _texts$en52 === void 0 ? void 0 : _texts$en52.autoGearRulesCountOne) || '%s rule' : langTexts.autoGearRulesCountOther || ((_texts$en53 = texts.en) === null || _texts$en53 === void 0 ? void 0 : _texts$en53.autoGearRulesCountOther) || '%s rules';
        return template.replace('%s', formatNumberForLang(currentLang, count));
      };
      var coverageValue = hasScenarioCatalog ? "".concat(formatNumberForLang(currentLang, coveragePercent), "%") : formatNumberForLang(currentLang, scenarioCovered);
      var coverageDescription = hasScenarioCatalog ? (langTexts.autoGearSummaryCoverageDescription || ((_texts$en54 = texts.en) === null || _texts$en54 === void 0 ? void 0 : _texts$en54.autoGearSummaryCoverageDescription) || '{covered} of {total} scenarios covered').replace('{covered}', formatNumberForLang(currentLang, scenarioCovered)).replace('{total}', formatNumberForLang(currentLang, scenarioTotal)) : langTexts.autoGearSummaryCoverageEmpty || ((_texts$en55 = texts.en) === null || _texts$en55 === void 0 ? void 0 : _texts$en55.autoGearSummaryCoverageEmpty) || 'Add scenarios to measure coverage.';
      var buildCard = function buildCard(config) {
        var label = config.label,
          value = config.value,
          description = config.description,
          focusKey = config.focusKey;
        var isAction = Boolean(focusKey);
        var element = document.createElement(isAction ? 'button' : 'div');
        element.className = 'auto-gear-summary-card';
        if (isAction) {
          element.type = 'button';
          element.classList.add('auto-gear-summary-action');
          element.dataset.focus = focusKey;
          element.setAttribute('aria-pressed', autoGearSummaryFocus === focusKey ? 'true' : 'false');
        }
        var labelElem = document.createElement('p');
        labelElem.className = 'auto-gear-summary-label';
        labelElem.textContent = label;
        var valueElem = document.createElement('p');
        valueElem.className = 'auto-gear-summary-value';
        valueElem.textContent = value;
        element.appendChild(labelElem);
        element.appendChild(valueElem);
        if (description) {
          var descElem = document.createElement('p');
          descElem.className = 'auto-gear-summary-description';
          descElem.textContent = description;
          element.appendChild(descElem);
        }
        autoGearSummaryCards.appendChild(element);
      };
      var netValue = "".concat(formatNumberForLang(currentLang, analysis.net.addQuantity), " / \u2212").concat(formatNumberForLang(currentLang, analysis.net.removeQuantity));
      buildCard({
        label: langTexts.autoGearSummaryTotalLabel || ((_texts$en56 = texts.en) === null || _texts$en56 === void 0 ? void 0 : _texts$en56.autoGearSummaryTotalLabel) || 'Rules',
        value: formatNumberForLang(currentLang, totalRules),
        description: langTexts.autoGearSummaryTotalDescription || ((_texts$en57 = texts.en) === null || _texts$en57 === void 0 ? void 0 : _texts$en57.autoGearSummaryTotalDescription) || 'Saved in this setup'
      });
      buildCard({
        label: langTexts.autoGearSummaryCoverageLabel || ((_texts$en58 = texts.en) === null || _texts$en58 === void 0 ? void 0 : _texts$en58.autoGearSummaryCoverageLabel) || 'Scenario coverage',
        value: coverageValue,
        description: coverageDescription
      });
      buildCard({
        label: langTexts.autoGearSummaryNetLabel || ((_texts$en59 = texts.en) === null || _texts$en59 === void 0 ? void 0 : _texts$en59.autoGearSummaryNetLabel) || 'Net change',
        value: netValue,
        description: (langTexts.autoGearSummaryNetDescription || ((_texts$en60 = texts.en) === null || _texts$en60 === void 0 ? void 0 : _texts$en60.autoGearSummaryNetDescription) || 'Adds {adds} · Removes {removes}').replace('{adds}', formatNumberForLang(currentLang, analysis.net.addItems)).replace('{removes}', formatNumberForLang(currentLang, analysis.net.removeItems))
      });
      buildCard({
        label: langTexts.autoGearSummaryDuplicatesLabel || ((_texts$en61 = texts.en) === null || _texts$en61 === void 0 ? void 0 : _texts$en61.autoGearSummaryDuplicatesLabel) || 'Duplicated triggers',
        value: formatNumberForLang(currentLang, analysis.duplicates.totalGroups),
        description: analysis.duplicates.totalGroups ? (langTexts.autoGearSummaryDuplicatesSome || ((_texts$en62 = texts.en) === null || _texts$en62 === void 0 ? void 0 : _texts$en62.autoGearSummaryDuplicatesSome) || '{rules} across {groups} groups').replace('{rules}', formatRulesCount(analysis.duplicates.totalRules)).replace('{groups}', formatNumberForLang(currentLang, analysis.duplicates.totalGroups)) : langTexts.autoGearSummaryDuplicatesNone || ((_texts$en63 = texts.en) === null || _texts$en63 === void 0 ? void 0 : _texts$en63.autoGearSummaryDuplicatesNone) || 'No duplicate triggers.',
        focusKey: 'duplicates'
      });
      buildCard({
        label: langTexts.autoGearSummaryConflictsLabel || ((_texts$en64 = texts.en) === null || _texts$en64 === void 0 ? void 0 : _texts$en64.autoGearSummaryConflictsLabel) || 'Potential conflicts',
        value: formatNumberForLang(currentLang, analysis.conflicts.totalItems),
        description: analysis.conflicts.totalItems ? (langTexts.autoGearSummaryConflictsSome || ((_texts$en65 = texts.en) === null || _texts$en65 === void 0 ? void 0 : _texts$en65.autoGearSummaryConflictsSome) || '{rules} affected across {items} items').replace('{rules}', formatRulesCount(analysis.conflicts.totalRules)).replace('{items}', formatNumberForLang(currentLang, analysis.conflicts.totalItems)) : langTexts.autoGearSummaryConflictsNone || ((_texts$en66 = texts.en) === null || _texts$en66 === void 0 ? void 0 : _texts$en66.autoGearSummaryConflictsNone) || 'No conflicting adds/removes.',
        focusKey: 'conflicts'
      });
      buildCard({
        label: langTexts.autoGearSummaryOverlapsLabel || ((_texts$en67 = texts.en) === null || _texts$en67 === void 0 ? void 0 : _texts$en67.autoGearSummaryOverlapsLabel) || 'Stacked scenarios',
        value: formatNumberForLang(currentLang, overlapCount),
        description: overlapCount ? (langTexts.autoGearSummaryOverlapsSome || ((_texts$en68 = texts.en) === null || _texts$en68 === void 0 ? void 0 : _texts$en68.autoGearSummaryOverlapsSome) || '{count} scenarios touched by multiple rules').replace('{count}', formatNumberForLang(currentLang, overlapCount)) : langTexts.autoGearSummaryOverlapsNone || ((_texts$en69 = texts.en) === null || _texts$en69 === void 0 ? void 0 : _texts$en69.autoGearSummaryOverlapsNone) || 'No scenarios currently stack multiple rules.',
        focusKey: 'overlaps'
      });
      buildCard({
        label: langTexts.autoGearSummaryUncoveredLabel || ((_texts$en70 = texts.en) === null || _texts$en70 === void 0 ? void 0 : _texts$en70.autoGearSummaryUncoveredLabel) || 'Uncovered scenarios',
        value: formatNumberForLang(currentLang, analysis.scenarios.uncovered.length),
        description: analysis.scenarios.uncovered.length ? (langTexts.autoGearSummaryUncoveredSome || ((_texts$en71 = texts.en) === null || _texts$en71 === void 0 ? void 0 : _texts$en71.autoGearSummaryUncoveredSome) || 'Review {count} scenario gaps').replace('{count}', formatNumberForLang(currentLang, analysis.scenarios.uncovered.length)) : langTexts.autoGearSummaryUncoveredNone || ((_texts$en72 = texts.en) === null || _texts$en72 === void 0 ? void 0 : _texts$en72.autoGearSummaryUncoveredNone) || 'All required scenarios covered.',
        focusKey: 'uncovered'
      });
      var detailsFragment = document.createDocumentFragment();
      var intro = document.createElement('p');
      intro.className = 'auto-gear-summary-detail-text';
      intro.textContent = langTexts.autoGearSummaryDetailsIntro || ((_texts$en73 = texts.en) === null || _texts$en73 === void 0 ? void 0 : _texts$en73.autoGearSummaryDetailsIntro) || 'Use the dashboard to audit coverage, overlaps and conflicts before exporting or printing.';
      detailsFragment.appendChild(intro);
      var appendRuleButtons = function appendRuleButtons(container, rules) {
        var _texts$en74;
        var jumpHelp = langTexts.autoGearSummaryJumpToRule || ((_texts$en74 = texts.en) === null || _texts$en74 === void 0 ? void 0 : _texts$en74.autoGearSummaryJumpToRule) || 'Show rule';
        rules.forEach(function (ref, index) {
          var button = document.createElement('button');
          button.type = 'button';
          button.dataset.autoGearRule = ref.id;
          button.textContent = formatAutoGearRuleReference(ref, langTexts);
          button.setAttribute('title', jumpHelp);
          container.appendChild(button);
          if (index < rules.length - 1) {
            container.appendChild(document.createTextNode(', '));
          }
        });
      };
      if (focus === 'duplicates') {
        var _texts$en75;
        var headingElem = document.createElement('p');
        headingElem.className = 'auto-gear-summary-detail-title';
        headingElem.textContent = langTexts.autoGearSummaryDetailsDuplicatesHeading || ((_texts$en75 = texts.en) === null || _texts$en75 === void 0 ? void 0 : _texts$en75.autoGearSummaryDetailsDuplicatesHeading) || 'Rules sharing the same triggers';
        detailsFragment.appendChild(headingElem);
        if (!analysis.duplicates.groups.length) {
          var _texts$en76;
          var empty = document.createElement('p');
          empty.className = 'auto-gear-summary-detail-text';
          empty.textContent = langTexts.autoGearSummaryDuplicatesNone || ((_texts$en76 = texts.en) === null || _texts$en76 === void 0 ? void 0 : _texts$en76.autoGearSummaryDuplicatesNone) || 'No duplicate triggers.';
          detailsFragment.appendChild(empty);
        } else {
          analysis.duplicates.groups.forEach(function (group) {
            var _texts$en77;
            var description = formatAutoGearTriggerDescription(group.triggers, analysis, langTexts);
            var descriptionElem = document.createElement('p');
            descriptionElem.className = 'auto-gear-summary-detail-text';
            descriptionElem.textContent = (langTexts.autoGearSummaryDuplicateGroupTitle || ((_texts$en77 = texts.en) === null || _texts$en77 === void 0 ? void 0 : _texts$en77.autoGearSummaryDuplicateGroupTitle) || 'Matching triggers') + (description ? " \u2014 ".concat(description) : '');
            detailsFragment.appendChild(descriptionElem);
            if (group.rules.length) {
              var list = document.createElement('ul');
              list.className = 'auto-gear-summary-list';
              var item = document.createElement('li');
              appendRuleButtons(item, group.rules);
              list.appendChild(item);
              detailsFragment.appendChild(list);
            }
          });
        }
      } else if (focus === 'conflicts') {
        var _texts$en78;
        var _headingElem = document.createElement('p');
        _headingElem.className = 'auto-gear-summary-detail-title';
        _headingElem.textContent = langTexts.autoGearSummaryDetailsConflictsHeading || ((_texts$en78 = texts.en) === null || _texts$en78 === void 0 ? void 0 : _texts$en78.autoGearSummaryDetailsConflictsHeading) || 'Gear touched by adds and removes';
        detailsFragment.appendChild(_headingElem);
        if (!analysis.conflicts.items.length) {
          var _texts$en79;
          var _empty = document.createElement('p');
          _empty.className = 'auto-gear-summary-detail-text';
          _empty.textContent = langTexts.autoGearSummaryConflictsNone || ((_texts$en79 = texts.en) === null || _texts$en79 === void 0 ? void 0 : _texts$en79.autoGearSummaryConflictsNone) || 'No conflicting adds/removes.';
          detailsFragment.appendChild(_empty);
        } else {
          analysis.conflicts.items.forEach(function (entry) {
            var _texts$en80, _texts$en81;
            var title = document.createElement('p');
            title.className = 'auto-gear-summary-detail-text';
            title.textContent = formatAutoGearItemSummary(entry.item);
            detailsFragment.appendChild(title);
            var list = document.createElement('ul');
            list.className = 'auto-gear-summary-list';
            var addsItem = document.createElement('li');
            addsItem.textContent = (langTexts.autoGearSummaryConflictAddsLabel || ((_texts$en80 = texts.en) === null || _texts$en80 === void 0 ? void 0 : _texts$en80.autoGearSummaryConflictAddsLabel) || 'Added by') + ': ';
            appendRuleButtons(addsItem, entry.adds);
            list.appendChild(addsItem);
            var removesItem = document.createElement('li');
            removesItem.textContent = (langTexts.autoGearSummaryConflictRemovesLabel || ((_texts$en81 = texts.en) === null || _texts$en81 === void 0 ? void 0 : _texts$en81.autoGearSummaryConflictRemovesLabel) || 'Removed by') + ': ';
            appendRuleButtons(removesItem, entry.removes);
            list.appendChild(removesItem);
            detailsFragment.appendChild(list);
          });
        }
      } else if (focus === 'overlaps') {
        var _texts$en82;
        var _headingElem2 = document.createElement('p');
        _headingElem2.className = 'auto-gear-summary-detail-title';
        _headingElem2.textContent = langTexts.autoGearSummaryDetailsOverlapsHeading || ((_texts$en82 = texts.en) === null || _texts$en82 === void 0 ? void 0 : _texts$en82.autoGearSummaryDetailsOverlapsHeading) || 'Scenarios with stacked rules';
        detailsFragment.appendChild(_headingElem2);
        if (!analysis.scenarios.overlaps.length) {
          var _texts$en83;
          var _empty2 = document.createElement('p');
          _empty2.className = 'auto-gear-summary-detail-text';
          _empty2.textContent = langTexts.autoGearSummaryDetailsOverlapsNone || ((_texts$en83 = texts.en) === null || _texts$en83 === void 0 ? void 0 : _texts$en83.autoGearSummaryDetailsOverlapsNone) || 'No scenarios currently stack multiple rules.';
          detailsFragment.appendChild(_empty2);
        } else {
          var list = document.createElement('ul');
          list.className = 'auto-gear-summary-list';
          analysis.scenarios.overlaps.forEach(function (entry) {
            var _texts$en84;
            var li = document.createElement('li');
            var button = document.createElement('button');
            button.type = 'button';
            button.dataset.autoGearScenario = entry.value;
            button.textContent = "".concat(entry.label, " \u2014 ").concat(formatRulesCount(entry.rules.length));
            button.setAttribute('title', (langTexts.autoGearSummarySetScenarioFilter || ((_texts$en84 = texts.en) === null || _texts$en84 === void 0 ? void 0 : _texts$en84.autoGearSummarySetScenarioFilter) || 'Filter to scenario').replace('{scenario}', entry.label));
            li.appendChild(button);
            if (entry.rules.length) {
              li.appendChild(document.createTextNode(' · '));
              appendRuleButtons(li, entry.rules);
            }
            list.appendChild(li);
          });
          detailsFragment.appendChild(list);
        }
      } else if (focus === 'uncovered') {
        var _texts$en85;
        var _headingElem3 = document.createElement('p');
        _headingElem3.className = 'auto-gear-summary-detail-title';
        _headingElem3.textContent = langTexts.autoGearSummaryDetailsUncoveredHeading || ((_texts$en85 = texts.en) === null || _texts$en85 === void 0 ? void 0 : _texts$en85.autoGearSummaryDetailsUncoveredHeading) || 'Scenarios without dedicated rules';
        detailsFragment.appendChild(_headingElem3);
        if (!analysis.scenarios.uncovered.length) {
          var _texts$en86;
          var _empty3 = document.createElement('p');
          _empty3.className = 'auto-gear-summary-detail-text';
          _empty3.textContent = langTexts.autoGearSummaryUncoveredNone || ((_texts$en86 = texts.en) === null || _texts$en86 === void 0 ? void 0 : _texts$en86.autoGearSummaryUncoveredNone) || 'All required scenarios covered.';
          detailsFragment.appendChild(_empty3);
        } else {
          var _list = document.createElement('ul');
          _list.className = 'auto-gear-summary-list';
          analysis.scenarios.uncovered.forEach(function (entry) {
            var _texts$en87;
            var li = document.createElement('li');
            var button = document.createElement('button');
            button.type = 'button';
            button.dataset.autoGearScenario = entry.value;
            button.textContent = entry.label;
            button.setAttribute('title', (langTexts.autoGearSummarySetScenarioFilter || ((_texts$en87 = texts.en) === null || _texts$en87 === void 0 ? void 0 : _texts$en87.autoGearSummarySetScenarioFilter) || 'Filter to scenario').replace('{scenario}', entry.label));
            li.appendChild(button);
            _list.appendChild(li);
          });
          detailsFragment.appendChild(_list);
        }
      } else {
        if (analysis.scenarios.overlaps.length) {
          var _texts$en88;
          var _headingElem4 = document.createElement('p');
          _headingElem4.className = 'auto-gear-summary-detail-title';
          _headingElem4.textContent = langTexts.autoGearSummaryDetailsOverlapsHeading || ((_texts$en88 = texts.en) === null || _texts$en88 === void 0 ? void 0 : _texts$en88.autoGearSummaryDetailsOverlapsHeading) || 'Scenarios with stacked rules';
          detailsFragment.appendChild(_headingElem4);
          var _list2 = document.createElement('ul');
          _list2.className = 'auto-gear-summary-list';
          analysis.scenarios.overlaps.forEach(function (entry) {
            var _texts$en89;
            var li = document.createElement('li');
            var button = document.createElement('button');
            button.type = 'button';
            button.dataset.autoGearScenario = entry.value;
            button.textContent = "".concat(entry.label, " \u2014 ").concat(formatRulesCount(entry.rules.length));
            button.setAttribute('title', (langTexts.autoGearSummarySetScenarioFilter || ((_texts$en89 = texts.en) === null || _texts$en89 === void 0 ? void 0 : _texts$en89.autoGearSummarySetScenarioFilter) || 'Filter to scenario').replace('{scenario}', entry.label));
            li.appendChild(button);
            if (entry.rules.length) {
              li.appendChild(document.createTextNode(' · '));
              appendRuleButtons(li, entry.rules);
            }
            _list2.appendChild(li);
          });
          detailsFragment.appendChild(_list2);
        } else {
          var _texts$en90;
          var note = document.createElement('p');
          note.className = 'auto-gear-summary-detail-text';
          note.textContent = langTexts.autoGearSummaryDetailsOverlapsNone || ((_texts$en90 = texts.en) === null || _texts$en90 === void 0 ? void 0 : _texts$en90.autoGearSummaryDetailsOverlapsNone) || 'No scenarios currently stack multiple rules.';
          detailsFragment.appendChild(note);
        }
        if (analysis.scenarios.uncovered.length) {
          var _texts$en91;
          var _headingElem5 = document.createElement('p');
          _headingElem5.className = 'auto-gear-summary-detail-title';
          _headingElem5.textContent = langTexts.autoGearSummaryDetailsUncoveredHeading || ((_texts$en91 = texts.en) === null || _texts$en91 === void 0 ? void 0 : _texts$en91.autoGearSummaryDetailsUncoveredHeading) || 'Scenarios without dedicated rules';
          detailsFragment.appendChild(_headingElem5);
          var _list3 = document.createElement('ul');
          _list3.className = 'auto-gear-summary-list';
          analysis.scenarios.uncovered.forEach(function (entry) {
            var _texts$en92;
            var li = document.createElement('li');
            var button = document.createElement('button');
            button.type = 'button';
            button.dataset.autoGearScenario = entry.value;
            button.textContent = entry.label;
            button.setAttribute('title', (langTexts.autoGearSummarySetScenarioFilter || ((_texts$en92 = texts.en) === null || _texts$en92 === void 0 ? void 0 : _texts$en92.autoGearSummarySetScenarioFilter) || 'Filter to scenario').replace('{scenario}', entry.label));
            li.appendChild(button);
            _list3.appendChild(li);
          });
          detailsFragment.appendChild(_list3);
        }
      }
      if (focus !== 'all') {
        var _texts$en93;
        var resetButton = document.createElement('button');
        resetButton.type = 'button';
        resetButton.className = 'auto-gear-summary-reset';
        resetButton.dataset.autoGearSummaryReset = 'true';
        resetButton.textContent = langTexts.autoGearSummaryResetFocus || ((_texts$en93 = texts.en) === null || _texts$en93 === void 0 ? void 0 : _texts$en93.autoGearSummaryResetFocus) || 'Clear dashboard filter';
        detailsFragment.appendChild(resetButton);
      } else if (!analysis.duplicates.groups.length && !analysis.conflicts.items.length && !analysis.scenarios.uncovered.length) {
        var _texts$en94;
        var _empty4 = document.createElement('p');
        _empty4.className = 'auto-gear-summary-detail-text';
        _empty4.textContent = langTexts.autoGearSummaryDetailsFocusEmpty || ((_texts$en94 = texts.en) === null || _texts$en94 === void 0 ? void 0 : _texts$en94.autoGearSummaryDetailsFocusEmpty) || 'Everything looks covered—no overlaps or conflicts detected.';
        detailsFragment.appendChild(_empty4);
      }
      autoGearSummaryDetails.appendChild(detailsFragment);
    }
    function setAutoGearSummaryFocus(value) {
      var allowed = value === 'duplicates' || value === 'conflicts' || value === 'overlaps' || value === 'uncovered' ? value : 'all';
      var next = autoGearSummaryFocus === allowed && allowed !== 'all' ? 'all' : allowed;
      if (autoGearSummaryFocus === next) {
        return;
      }
      autoGearSummaryFocus = next;
      renderAutoGearRulesList();
    }
    function focusAutoGearRuleById(ruleId) {
      if (!ruleId || !autoGearRulesList) return;
      var candidates = Array.from(autoGearRulesList.querySelectorAll('[data-rule-id]'));
      var target = candidates.find(function (element) {
        return element && element.dataset && element.dataset.ruleId === ruleId;
      });
      if (!target) return;
      if (typeof target.scrollIntoView === 'function') {
        try {
          target.scrollIntoView({
            block: 'center',
            behavior: 'smooth'
          });
        } catch (error) {
          void error;
          target.scrollIntoView(true);
        }
      }
      var focusTarget = target.querySelector('.auto-gear-edit') || target.querySelector('button') || target;
      if (focusTarget && typeof focusTarget.focus === 'function') {
        try {
          focusTarget.focus({
            preventScroll: true
          });
        } catch (error) {
          void error;
          focusTarget.focus();
        }
      }
    }
    function renderAutoGearRulesList() {
      if (!autoGearRulesList) return;
      if (autoGearEditor && !autoGearEditor.hidden && !autoGearEditorDraft) {
        closeAutoGearEditor();
      }
      autoGearRulesList.innerHTML = '';
      var rules = getAutoGearRules();
      var analysis = getAutoGearRuleCoverageSummary({
        rules: rules
      });
      var scenarioFilter = refreshAutoGearScenarioFilterOptions(rules);
      var rawSearch = typeof autoGearSearchQuery === 'string' ? autoGearSearchQuery : '';
      var normalizedQuery = rawSearch.trim().toLowerCase();
      var filteredRules = rules.filter(function (rule) {
        return autoGearRuleMatchesScenario(rule, scenarioFilter) && autoGearRuleMatchesSearch(rule, normalizedQuery);
      });
      var ruleIndexByObject = new Map();
      rules.forEach(function (rule, index) {
        if (!rule || _typeof(rule) !== 'object') return;
        ruleIndexByObject.set(rule, index);
      });
      var activeFocus = autoGearSummaryFocus || 'all';
      var focusRuleIds = function (_analysis$duplicates, _analysis$conflicts) {
        if (activeFocus === 'duplicates' && analysis !== null && analysis !== void 0 && (_analysis$duplicates = analysis.duplicates) !== null && _analysis$duplicates !== void 0 && (_analysis$duplicates = _analysis$duplicates.groups) !== null && _analysis$duplicates !== void 0 && _analysis$duplicates.length) {
          var ids = new Set();
          analysis.duplicates.groups.forEach(function (group) {
            (group.rules || []).forEach(function (ref) {
              if (!ref || _typeof(ref) !== 'object') return;
              if (ref.id) ids.add(ref.id);
              ids.add("index-".concat(ref.index));
            });
          });
          return ids.size ? ids : null;
        }
        if (activeFocus === 'conflicts' && analysis !== null && analysis !== void 0 && (_analysis$conflicts = analysis.conflicts) !== null && _analysis$conflicts !== void 0 && (_analysis$conflicts = _analysis$conflicts.items) !== null && _analysis$conflicts !== void 0 && _analysis$conflicts.length) {
          var _ids = new Set();
          analysis.conflicts.items.forEach(function (item) {
            (item.adds || []).forEach(function (ref) {
              if (!ref || _typeof(ref) !== 'object') return;
              if (ref.id) _ids.add(ref.id);
              _ids.add("index-".concat(ref.index));
            });
            (item.removes || []).forEach(function (ref) {
              if (!ref || _typeof(ref) !== 'object') return;
              if (ref.id) _ids.add(ref.id);
              _ids.add("index-".concat(ref.index));
            });
          });
          return _ids.size ? _ids : null;
        }
        if (activeFocus !== 'all' && activeFocus !== 'uncovered') {
          activeFocus = 'all';
        }
        return null;
      }();
      if (autoGearSummaryFocus !== activeFocus) {
        autoGearSummaryFocus = activeFocus;
      }
      var hasFilters = Boolean(normalizedQuery) || scenarioFilter !== 'all' || activeFocus !== 'all';
      var allowSearch = rules.length > 0 || Boolean(rawSearch.trim());
      if (autoGearSearchInput) {
        if (autoGearSearchInput.value !== rawSearch) {
          autoGearSearchInput.value = rawSearch;
        }
        autoGearSearchInput.disabled = !allowSearch;
      }
      if (autoGearFilterScenarioSelect) {
        autoGearFilterScenarioSelect.value = autoGearScenarioFilter;
        if (autoGearFilterScenarioSelect.disabled) {
          autoGearFilterScenarioSelect.setAttribute('aria-disabled', 'true');
        } else {
          autoGearFilterScenarioSelect.removeAttribute('aria-disabled');
        }
      }
      if (autoGearFilterClearButton) {
        autoGearFilterClearButton.hidden = !hasFilters;
        autoGearFilterClearButton.disabled = !hasFilters;
      }
      var visibleRules = focusRuleIds ? filteredRules.filter(function (rule) {
        var id = typeof (rule === null || rule === void 0 ? void 0 : rule.id) === 'string' ? rule.id : '';
        if (id && focusRuleIds.has(id)) return true;
        var index = ruleIndexByObject.get(rule);
        if (typeof index === 'number' && focusRuleIds.has("index-".concat(index))) return true;
        return false;
      }) : filteredRules;
      renderAutoGearRuleSummary(analysis, {
        focus: activeFocus,
        totalRules: rules.length,
        filteredRules: filteredRules.length,
        visibleRules: visibleRules.length,
        hasSearchFilters: Boolean(normalizedQuery) || scenarioFilter !== 'all',
        focusApplied: Boolean(focusRuleIds)
      });
      if (!visibleRules.length) {
        var empty = document.createElement('p');
        empty.className = 'auto-gear-empty';
        if (!rules.length && !hasFilters) {
          var _texts$currentLang20, _texts$en95;
          empty.textContent = ((_texts$currentLang20 = texts[currentLang]) === null || _texts$currentLang20 === void 0 ? void 0 : _texts$currentLang20.autoGearNoRules) || ((_texts$en95 = texts.en) === null || _texts$en95 === void 0 ? void 0 : _texts$en95.autoGearNoRules) || 'No custom rules yet.';
        } else if (focusRuleIds && filteredRules.length) {
          var _texts$currentLang21, _texts$en96;
          empty.textContent = ((_texts$currentLang21 = texts[currentLang]) === null || _texts$currentLang21 === void 0 ? void 0 : _texts$currentLang21.autoGearNoFocusMatches) || ((_texts$en96 = texts.en) === null || _texts$en96 === void 0 ? void 0 : _texts$en96.autoGearNoFocusMatches) || 'No rules match the selected dashboard filter.';
        } else {
          var _texts$currentLang22, _texts$en97;
          empty.textContent = ((_texts$currentLang22 = texts[currentLang]) === null || _texts$currentLang22 === void 0 ? void 0 : _texts$currentLang22.autoGearNoMatches) || ((_texts$en97 = texts.en) === null || _texts$en97 === void 0 ? void 0 : _texts$en97.autoGearNoMatches) || 'No rules match your filters.';
        }
        autoGearRulesList.appendChild(empty);
        return;
      }
      visibleRules.forEach(function (rule) {
        var _texts$currentLang44, _texts$en119, _texts$currentLang45, _texts$en120, _texts$currentLang46, _texts$en121;
        var wrapper = document.createElement('div');
        wrapper.className = 'auto-gear-rule';
        wrapper.dataset.ruleId = rule.id;
        var info = document.createElement('div');
        info.className = 'auto-gear-rule-info';
        var title = document.createElement('p');
        title.className = 'auto-gear-rule-title';
        var scenarioList = Array.isArray(rule.scenarios) ? rule.scenarios : [];
        var matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox : [];
        var cameraHandleList = Array.isArray(rule.cameraHandle) ? rule.cameraHandle : [];
        var rawViewfinderList = Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension : [];
        var viewfinderDisplayList = rawViewfinderList.map(getViewfinderFallbackLabel);
        var videoDistributionList = Array.isArray(rule.videoDistribution) ? rule.videoDistribution : [];
        var videoDistributionDisplayList = videoDistributionList.map(getVideoDistributionFallbackLabel);
        var deliveryResolutionList = Array.isArray(rule.deliveryResolution) ? rule.deliveryResolution : [];
        var cameraList = Array.isArray(rule.camera) ? rule.camera : [];
        var cameraWeightCondition = normalizeAutoGearCameraWeightCondition(rule.cameraWeight);
        var monitorList = Array.isArray(rule.monitor) ? rule.monitor : [];
        var crewPresentList = Array.isArray(rule.crewPresent) ? rule.crewPresent : [];
        var crewAbsentList = Array.isArray(rule.crewAbsent) ? rule.crewAbsent : [];
        var wirelessList = Array.isArray(rule.wireless) ? rule.wireless : [];
        var motorsList = Array.isArray(rule.motors) ? rule.motors : [];
        var langTexts = texts[currentLang] || texts.en || {};
        var motorsDisplayList = motorsList.map(function (value) {
          return formatAutoGearMotorValue(value, langTexts);
        });
        var controllersList = Array.isArray(rule.controllers) ? rule.controllers : [];
        var distanceList = Array.isArray(rule.distance) ? rule.distance : [];
        var shootingCondition = normalizeAutoGearShootingDaysCondition(rule.shootingDays);
        var shootingDaysDisplayList = shootingCondition ? [String(shootingCondition.value)] : [];
        var cameraWeightDisplay = cameraWeightCondition ? formatAutoGearCameraWeight(cameraWeightCondition, langTexts) : '';
        var cameraWeightDisplayList = cameraWeightDisplay ? [cameraWeightDisplay] : [];
        var fallbackCandidates = [cameraList, cameraWeightDisplayList, monitorList, crewPresentList, crewAbsentList, wirelessList, motorsDisplayList, controllersList, distanceList, matteboxList, cameraHandleList, viewfinderDisplayList, deliveryResolutionList, videoDistributionDisplayList, shootingDaysDisplayList];
        var fallbackSource = scenarioList.length ? scenarioList : fallbackCandidates.find(function (list) {
          return Array.isArray(list) && list.length;
        }) || [];
        var fallbackTitle = fallbackSource.length ? fallbackSource.join(' + ') : '';
        title.textContent = rule.label || fallbackTitle;
        info.appendChild(title);
        if (rule.always) {
          var _texts$currentLang23, _texts$en98;
          var alwaysLabel = ((_texts$currentLang23 = texts[currentLang]) === null || _texts$currentLang23 === void 0 ? void 0 : _texts$currentLang23.autoGearAlwaysMeta) || ((_texts$en98 = texts.en) === null || _texts$en98 === void 0 ? void 0 : _texts$en98.autoGearAlwaysMeta) || 'Always active';
          var alwaysMeta = document.createElement('p');
          alwaysMeta.className = 'auto-gear-rule-meta';
          alwaysMeta.textContent = alwaysLabel;
          info.appendChild(alwaysMeta);
        }
        if (scenarioList.length) {
          var _texts$currentLang24, _texts$en99;
          var scenarioLabel = ((_texts$currentLang24 = texts[currentLang]) === null || _texts$currentLang24 === void 0 || (_texts$currentLang24 = _texts$currentLang24.projectFields) === null || _texts$currentLang24 === void 0 ? void 0 : _texts$currentLang24.requiredScenarios) || ((_texts$en99 = texts.en) === null || _texts$en99 === void 0 || (_texts$en99 = _texts$en99.projectFields) === null || _texts$en99 === void 0 ? void 0 : _texts$en99.requiredScenarios) || 'Required Scenarios';
          var scenarioMeta = document.createElement('p');
          scenarioMeta.className = 'auto-gear-rule-meta';
          scenarioMeta.textContent = "".concat(scenarioLabel, ": ").concat(scenarioList.join(' + '));
          info.appendChild(scenarioMeta);
        }
        if (cameraList.length) {
          var _texts$currentLang25, _texts$en100;
          var cameraLabelText = ((_texts$currentLang25 = texts[currentLang]) === null || _texts$currentLang25 === void 0 ? void 0 : _texts$currentLang25.autoGearCameraLabel) || ((_texts$en100 = texts.en) === null || _texts$en100 === void 0 ? void 0 : _texts$en100.autoGearCameraLabel) || 'Camera selection';
          var cameraMeta = document.createElement('p');
          cameraMeta.className = 'auto-gear-rule-meta';
          cameraMeta.textContent = "".concat(cameraLabelText, ": ").concat(cameraList.join(' + '));
          info.appendChild(cameraMeta);
        }
        if (cameraWeightCondition && cameraWeightDisplay) {
          var _texts$currentLang26, _texts$en101;
          var weightLabelText = ((_texts$currentLang26 = texts[currentLang]) === null || _texts$currentLang26 === void 0 ? void 0 : _texts$currentLang26.autoGearCameraWeightLabel) || ((_texts$en101 = texts.en) === null || _texts$en101 === void 0 ? void 0 : _texts$en101.autoGearCameraWeightLabel) || 'Camera weight';
          var weightMeta = document.createElement('p');
          weightMeta.className = 'auto-gear-rule-meta';
          weightMeta.textContent = "".concat(weightLabelText, ": ").concat(cameraWeightDisplay);
          info.appendChild(weightMeta);
        }
        if (monitorList.length) {
          var _texts$currentLang27, _texts$en102;
          var monitorLabelText = ((_texts$currentLang27 = texts[currentLang]) === null || _texts$currentLang27 === void 0 ? void 0 : _texts$currentLang27.autoGearMonitorLabel) || ((_texts$en102 = texts.en) === null || _texts$en102 === void 0 ? void 0 : _texts$en102.autoGearMonitorLabel) || 'Onboard monitors';
          var monitorMeta = document.createElement('p');
          monitorMeta.className = 'auto-gear-rule-meta';
          monitorMeta.textContent = "".concat(monitorLabelText, ": ").concat(monitorList.join(' + '));
          info.appendChild(monitorMeta);
        }
        if (crewPresentList.length) {
          var _texts$currentLang28, _texts$en103;
          var crewPresentLabelText = ((_texts$currentLang28 = texts[currentLang]) === null || _texts$currentLang28 === void 0 ? void 0 : _texts$currentLang28.autoGearCrewPresentLabel) || ((_texts$en103 = texts.en) === null || _texts$en103 === void 0 ? void 0 : _texts$en103.autoGearCrewPresentLabel) || 'Crew present';
          var crewMeta = document.createElement('p');
          crewMeta.className = 'auto-gear-rule-meta';
          var labels = crewPresentList.map(function (value) {
            return getCrewRoleLabel(value);
          }).filter(Boolean);
          crewMeta.textContent = "".concat(crewPresentLabelText, ": ").concat(labels.join(' + '));
          info.appendChild(crewMeta);
        }
        if (crewAbsentList.length) {
          var _texts$currentLang29, _texts$en104;
          var crewAbsentLabelText = ((_texts$currentLang29 = texts[currentLang]) === null || _texts$currentLang29 === void 0 ? void 0 : _texts$currentLang29.autoGearCrewAbsentLabel) || ((_texts$en104 = texts.en) === null || _texts$en104 === void 0 ? void 0 : _texts$en104.autoGearCrewAbsentLabel) || 'Crew absent';
          var crewAbsentMeta = document.createElement('p');
          crewAbsentMeta.className = 'auto-gear-rule-meta';
          var _labels = crewAbsentList.map(function (value) {
            return getCrewRoleLabel(value);
          }).filter(Boolean);
          crewAbsentMeta.textContent = "".concat(crewAbsentLabelText, ": ").concat(_labels.join(' + '));
          info.appendChild(crewAbsentMeta);
        }
        if (wirelessList.length) {
          var _texts$currentLang30, _texts$en105;
          var wirelessLabelText = ((_texts$currentLang30 = texts[currentLang]) === null || _texts$currentLang30 === void 0 ? void 0 : _texts$currentLang30.autoGearWirelessLabel) || ((_texts$en105 = texts.en) === null || _texts$en105 === void 0 ? void 0 : _texts$en105.autoGearWirelessLabel) || 'Wireless transmitters';
          var wirelessMeta = document.createElement('p');
          wirelessMeta.className = 'auto-gear-rule-meta';
          wirelessMeta.textContent = "".concat(wirelessLabelText, ": ").concat(wirelessList.join(' + '));
          info.appendChild(wirelessMeta);
        }
        if (motorsList.length) {
          var _texts$currentLang31, _texts$en106;
          var motorsLabelText = ((_texts$currentLang31 = texts[currentLang]) === null || _texts$currentLang31 === void 0 ? void 0 : _texts$currentLang31.autoGearMotorsLabel) || ((_texts$en106 = texts.en) === null || _texts$en106 === void 0 ? void 0 : _texts$en106.autoGearMotorsLabel) || 'FIZ motors';
          var motorsMeta = document.createElement('p');
          motorsMeta.className = 'auto-gear-rule-meta';
          motorsMeta.textContent = "".concat(motorsLabelText, ": ").concat(motorsDisplayList.join(' + '));
          info.appendChild(motorsMeta);
        }
        if (controllersList.length) {
          var _texts$currentLang32, _texts$en107;
          var controllersLabelText = ((_texts$currentLang32 = texts[currentLang]) === null || _texts$currentLang32 === void 0 ? void 0 : _texts$currentLang32.autoGearControllersLabel) || ((_texts$en107 = texts.en) === null || _texts$en107 === void 0 ? void 0 : _texts$en107.autoGearControllersLabel) || 'FIZ controllers';
          var controllersMeta = document.createElement('p');
          controllersMeta.className = 'auto-gear-rule-meta';
          controllersMeta.textContent = "".concat(controllersLabelText, ": ").concat(controllersList.join(' + '));
          info.appendChild(controllersMeta);
        }
        if (distanceList.length) {
          var _texts$currentLang33, _texts$en108;
          var distanceLabelText = ((_texts$currentLang33 = texts[currentLang]) === null || _texts$currentLang33 === void 0 ? void 0 : _texts$currentLang33.autoGearDistanceLabel) || ((_texts$en108 = texts.en) === null || _texts$en108 === void 0 ? void 0 : _texts$en108.autoGearDistanceLabel) || 'FIZ distance devices';
          var distanceMeta = document.createElement('p');
          distanceMeta.className = 'auto-gear-rule-meta';
          distanceMeta.textContent = "".concat(distanceLabelText, ": ").concat(distanceList.join(' + '));
          info.appendChild(distanceMeta);
        }
        if (shootingCondition) {
          var _texts$currentLang34, _texts$en109, _texts$currentLang35, _texts$en110, _texts$currentLang36, _texts$en111, _texts$currentLang37, _texts$en112;
          var shootingLabelText = ((_texts$currentLang34 = texts[currentLang]) === null || _texts$currentLang34 === void 0 ? void 0 : _texts$currentLang34.autoGearShootingDaysLabel) || ((_texts$en109 = texts.en) === null || _texts$en109 === void 0 ? void 0 : _texts$en109.autoGearShootingDaysLabel) || 'Shooting days condition';
          var minimumLabel = ((_texts$currentLang35 = texts[currentLang]) === null || _texts$currentLang35 === void 0 ? void 0 : _texts$currentLang35.autoGearShootingDaysModeMinimum) || ((_texts$en110 = texts.en) === null || _texts$en110 === void 0 ? void 0 : _texts$en110.autoGearShootingDaysModeMinimum) || 'Minimum';
          var maximumLabel = ((_texts$currentLang36 = texts[currentLang]) === null || _texts$currentLang36 === void 0 ? void 0 : _texts$currentLang36.autoGearShootingDaysModeMaximum) || ((_texts$en111 = texts.en) === null || _texts$en111 === void 0 ? void 0 : _texts$en111.autoGearShootingDaysModeMaximum) || 'Maximum';
          var everyLabel = ((_texts$currentLang37 = texts[currentLang]) === null || _texts$currentLang37 === void 0 ? void 0 : _texts$currentLang37.autoGearShootingDaysModeEvery) || ((_texts$en112 = texts.en) === null || _texts$en112 === void 0 ? void 0 : _texts$en112.autoGearShootingDaysModeEvery) || 'Every';
          var shootingMeta = document.createElement('p');
          shootingMeta.className = 'auto-gear-rule-meta';
          var formattedValue = String(shootingCondition.value);
          if (shootingCondition.mode === 'minimum') {
            formattedValue = "\u2265 ".concat(shootingCondition.value);
            shootingMeta.textContent = "".concat(shootingLabelText, ": ").concat(minimumLabel, " ").concat(formattedValue.replace('≥ ', ''));
          } else if (shootingCondition.mode === 'maximum') {
            formattedValue = "\u2264 ".concat(shootingCondition.value);
            shootingMeta.textContent = "".concat(shootingLabelText, ": ").concat(maximumLabel, " ").concat(formattedValue.replace('≤ ', ''));
          } else if (shootingCondition.mode === 'every') {
            shootingMeta.textContent = "".concat(shootingLabelText, ": ").concat(everyLabel, " ").concat(shootingCondition.value);
          } else {
            shootingMeta.textContent = "".concat(shootingLabelText, ": ").concat(formattedValue);
          }
          info.appendChild(shootingMeta);
        }
        if (matteboxList.length) {
          var _texts$currentLang38, _texts$en113;
          var matteboxLabelText = ((_texts$currentLang38 = texts[currentLang]) === null || _texts$currentLang38 === void 0 ? void 0 : _texts$currentLang38.autoGearMatteboxLabel) || ((_texts$en113 = texts.en) === null || _texts$en113 === void 0 ? void 0 : _texts$en113.autoGearMatteboxLabel) || 'Mattebox options';
          var matteboxMeta = document.createElement('p');
          matteboxMeta.className = 'auto-gear-rule-meta';
          matteboxMeta.textContent = "".concat(matteboxLabelText, ": ").concat(matteboxList.join(' + '));
          info.appendChild(matteboxMeta);
        }
        if (cameraHandleList.length) {
          var _texts$currentLang39, _texts$en114;
          var cameraHandleLabelText = ((_texts$currentLang39 = texts[currentLang]) === null || _texts$currentLang39 === void 0 ? void 0 : _texts$currentLang39.autoGearCameraHandleLabel) || ((_texts$en114 = texts.en) === null || _texts$en114 === void 0 ? void 0 : _texts$en114.autoGearCameraHandleLabel) || 'Camera handles';
          var cameraHandleMeta = document.createElement('p');
          cameraHandleMeta.className = 'auto-gear-rule-meta';
          cameraHandleMeta.textContent = "".concat(cameraHandleLabelText, ": ").concat(cameraHandleList.join(' + '));
          info.appendChild(cameraHandleMeta);
        }
        if (rawViewfinderList.length) {
          var _texts$currentLang40, _texts$en115;
          var viewfinderLabelText = ((_texts$currentLang40 = texts[currentLang]) === null || _texts$currentLang40 === void 0 ? void 0 : _texts$currentLang40.autoGearViewfinderExtensionLabel) || ((_texts$en115 = texts.en) === null || _texts$en115 === void 0 ? void 0 : _texts$en115.autoGearViewfinderExtensionLabel) || 'Viewfinder extension';
          var viewfinderMeta = document.createElement('p');
          viewfinderMeta.className = 'auto-gear-rule-meta';
          viewfinderMeta.textContent = "".concat(viewfinderLabelText, ": ").concat(viewfinderDisplayList.join(' + '));
          info.appendChild(viewfinderMeta);
        }
        if (videoDistributionDisplayList.length) {
          var _texts$currentLang41, _texts$en116;
          var videoDistLabelText = ((_texts$currentLang41 = texts[currentLang]) === null || _texts$currentLang41 === void 0 ? void 0 : _texts$currentLang41.autoGearVideoDistributionLabel) || ((_texts$en116 = texts.en) === null || _texts$en116 === void 0 ? void 0 : _texts$en116.autoGearVideoDistributionLabel) || 'Video distribution';
          var videoDistMeta = document.createElement('p');
          videoDistMeta.className = 'auto-gear-rule-meta';
          videoDistMeta.textContent = "".concat(videoDistLabelText, ": ").concat(videoDistributionDisplayList.join(' + '));
          info.appendChild(videoDistMeta);
        }
        if (deliveryResolutionList.length) {
          var _texts$currentLang42, _texts$en117;
          var deliveryLabelText = ((_texts$currentLang42 = texts[currentLang]) === null || _texts$currentLang42 === void 0 ? void 0 : _texts$currentLang42.autoGearDeliveryResolutionLabel) || ((_texts$en117 = texts.en) === null || _texts$en117 === void 0 ? void 0 : _texts$en117.autoGearDeliveryResolutionLabel) || 'Delivery resolution';
          var deliveryMeta = document.createElement('p');
          deliveryMeta.className = 'auto-gear-rule-meta';
          deliveryMeta.textContent = "".concat(deliveryLabelText, ": ").concat(deliveryResolutionList.join(' + '));
          info.appendChild(deliveryMeta);
        }
        var addSummary = formatAutoGearCount(rule.add.length, 'autoGearAddsCountOne', 'autoGearAddsCountOther');
        var removeSummary = formatAutoGearCount(rule.remove.length, 'autoGearRemovalsCountOne', 'autoGearRemovalsCountOther');
        var countsMeta = document.createElement('p');
        countsMeta.className = 'auto-gear-rule-meta';
        countsMeta.textContent = "".concat(addSummary, " \xB7 ").concat(removeSummary);
        info.appendChild(countsMeta);
        if (rule.add.length) {
          var _texts$currentLang43, _texts$en118;
          var addsLabel = document.createElement('p');
          addsLabel.className = 'auto-gear-rule-meta auto-gear-rule-items-label';
          addsLabel.textContent = ((_texts$currentLang43 = texts[currentLang]) === null || _texts$currentLang43 === void 0 ? void 0 : _texts$currentLang43.autoGearAddsListLabel) || ((_texts$en118 = texts.en) === null || _texts$en118 === void 0 ? void 0 : _texts$en118.autoGearAddsListLabel) || 'Adds';
          info.appendChild(addsLabel);
          var addList = document.createElement('ul');
          addList.className = 'auto-gear-rule-items';
          rule.add.forEach(function (item) {
            var listItem = document.createElement('li');
            listItem.className = 'auto-gear-rule-item';
            listItem.textContent = formatAutoGearItemSummary(item);
            addList.appendChild(listItem);
          });
          info.appendChild(addList);
        }
        wrapper.appendChild(info);
        var actions = document.createElement('div');
        actions.className = 'auto-gear-rule-actions';
        var editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'auto-gear-edit';
        editBtn.dataset.ruleId = rule.id;
        var editLabel = ((_texts$currentLang44 = texts[currentLang]) === null || _texts$currentLang44 === void 0 ? void 0 : _texts$currentLang44.editBtn) || ((_texts$en119 = texts.en) === null || _texts$en119 === void 0 ? void 0 : _texts$en119.editBtn) || 'Edit';
        editBtn.textContent = editLabel;
        editBtn.setAttribute('data-help', editLabel);
        actions.appendChild(editBtn);
        var duplicateBtn = document.createElement('button');
        duplicateBtn.type = 'button';
        duplicateBtn.className = 'auto-gear-duplicate';
        duplicateBtn.dataset.ruleId = rule.id;
        var duplicateLabel = ((_texts$currentLang45 = texts[currentLang]) === null || _texts$currentLang45 === void 0 ? void 0 : _texts$currentLang45.autoGearDuplicateRule) || ((_texts$en120 = texts.en) === null || _texts$en120 === void 0 ? void 0 : _texts$en120.autoGearDuplicateRule) || 'Duplicate';
        duplicateBtn.textContent = duplicateLabel;
        duplicateBtn.setAttribute('data-help', duplicateLabel);
        actions.appendChild(duplicateBtn);
        var deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'auto-gear-delete';
        deleteBtn.dataset.ruleId = rule.id;
        var deleteLabel = ((_texts$currentLang46 = texts[currentLang]) === null || _texts$currentLang46 === void 0 ? void 0 : _texts$currentLang46.autoGearDeleteRule) || ((_texts$en121 = texts.en) === null || _texts$en121 === void 0 ? void 0 : _texts$en121.autoGearDeleteRule) || 'Delete';
        deleteBtn.textContent = deleteLabel;
        deleteBtn.setAttribute('data-help', deleteLabel);
        actions.appendChild(deleteBtn);
        wrapper.appendChild(actions);
        autoGearRulesList.appendChild(wrapper);
      });
    }
    function resetAutoGearDraftInputs(type) {
      var normalizedType = type === 'remove' ? 'remove' : 'add';
      var isAdd = normalizedType === 'add';
      var nameInput = isAdd ? autoGearAddNameInput : autoGearRemoveNameInput;
      var quantityInput = isAdd ? autoGearAddQuantityInput : autoGearRemoveQuantityInput;
      var screenSizeInput = isAdd ? autoGearAddScreenSizeInput : autoGearRemoveScreenSizeInput;
      var selectorTypeSelect = isAdd ? autoGearAddSelectorTypeSelect : autoGearRemoveSelectorTypeSelect;
      var selectorDefaultInput = isAdd ? autoGearAddSelectorDefaultInput : autoGearRemoveSelectorDefaultInput;
      var notesInput = isAdd ? autoGearAddNotesInput : autoGearRemoveNotesInput;
      if (nameInput) nameInput.value = '';
      if (quantityInput) quantityInput.value = '1';
      if (screenSizeInput) screenSizeInput.value = '';
      if (selectorTypeSelect) selectorTypeSelect.value = 'none';
      if (selectorDefaultInput) selectorDefaultInput.value = '';
      if (selectorDefaultInput && Object.prototype.hasOwnProperty.call(selectorDefaultInput.dataset, 'autoGearPreferredDefault')) {
        delete selectorDefaultInput.dataset.autoGearPreferredDefault;
      }
      if (notesInput) notesInput.value = '';
      var selectorTypeValue = selectorTypeSelect ? selectorTypeSelect.value : 'none';
      updateAutoGearMonitorCatalogOptions(selectorTypeValue, selectorDefaultInput);
    }
    function updateAutoGearItemButtonState(type) {
      var _autoGearEditorActive, _texts$en122, _texts$en123;
      var normalizedType = type === 'remove' ? 'remove' : 'add';
      var button = normalizedType === 'remove' ? autoGearRemoveItemButton : autoGearAddItemButton;
      if (!button) return;
      var langTexts = texts[currentLang] || texts.en || {};
      var isEditing = ((_autoGearEditorActive = autoGearEditorActiveItem) === null || _autoGearEditorActive === void 0 ? void 0 : _autoGearEditorActive.listType) === normalizedType;
      var defaultKey = normalizedType === 'remove' ? 'autoGearRemoveItemButton' : 'autoGearAddItemButton';
      var defaultLabel = langTexts[defaultKey] || ((_texts$en122 = texts.en) === null || _texts$en122 === void 0 ? void 0 : _texts$en122[defaultKey]) || button.textContent || '';
      var updateLabel = langTexts.autoGearUpdateItemButton || ((_texts$en123 = texts.en) === null || _texts$en123 === void 0 ? void 0 : _texts$en123.autoGearUpdateItemButton) || defaultLabel;
      var label = isEditing ? updateLabel : defaultLabel;
      var glyph = isEditing ? ICON_GLYPHS.save : normalizedType === 'remove' ? ICON_GLYPHS.minus : ICON_GLYPHS.add;
      setButtonLabelWithIcon(button, label, glyph);
      button.setAttribute('data-help', label);
    }
    function updateAutoGearDraftActionState() {
      updateAutoGearItemButtonState('add');
      updateAutoGearItemButtonState('remove');
    }
    function getAutoGearDraftList(type) {
      if (!autoGearEditorDraft) return null;
      var normalizedType = type === 'remove' ? 'remove' : 'add';
      return normalizedType === 'remove' ? autoGearEditorDraft.remove : autoGearEditorDraft.add;
    }
    function populateAutoGearDraftForm(type, item) {
      if (!item) return;
      var normalizedType = type === 'remove' ? 'remove' : 'add';
      var snapshot = autoGearItemSnapshot(item);
      if (!snapshot) return;
      var isAdd = normalizedType === 'add';
      var nameInput = isAdd ? autoGearAddNameInput : autoGearRemoveNameInput;
      var categorySelect = isAdd ? autoGearAddCategorySelect : autoGearRemoveCategorySelect;
      var quantityInput = isAdd ? autoGearAddQuantityInput : autoGearRemoveQuantityInput;
      var screenSizeInput = isAdd ? autoGearAddScreenSizeInput : autoGearRemoveScreenSizeInput;
      var selectorTypeSelect = isAdd ? autoGearAddSelectorTypeSelect : autoGearRemoveSelectorTypeSelect;
      var selectorDefaultInput = isAdd ? autoGearAddSelectorDefaultInput : autoGearRemoveSelectorDefaultInput;
      var notesInput = isAdd ? autoGearAddNotesInput : autoGearRemoveNotesInput;
      if (nameInput) nameInput.value = snapshot.name || '';
      if (quantityInput) quantityInput.value = String(normalizeAutoGearQuantity(snapshot.quantity));
      if (categorySelect) {
        var targetCategory = snapshot.category || AUTO_GEAR_CUSTOM_CATEGORY;
        var matched = false;
        Array.from(categorySelect.options || []).forEach(function (option) {
          if (option && option.value === targetCategory) {
            matched = true;
          }
        });
        categorySelect.value = matched ? targetCategory : AUTO_GEAR_CUSTOM_CATEGORY;
      }
      var activeCategory = categorySelect ? categorySelect.value : snapshot.category;
      var isMonitoring = isAutoGearMonitoringCategory(activeCategory);
      if (screenSizeInput) {
        screenSizeInput.value = isMonitoring ? snapshot.screenSize || '' : '';
      }
      if (selectorTypeSelect) {
        var selectorValue = isMonitoring ? snapshot.selectorType || 'none' : 'none';
        selectorTypeSelect.value = selectorValue;
        if (selectorDefaultInput) {
          selectorDefaultInput.dataset.autoGearPreferredDefault = isMonitoring ? snapshot.selectorDefault || '' : '';
        }
        updateAutoGearMonitorCatalogOptions(selectorValue, selectorDefaultInput);
        if (selectorDefaultInput) {
          selectorDefaultInput.value = isMonitoring ? snapshot.selectorDefault || '' : '';
        }
      } else if (selectorDefaultInput) {
        selectorDefaultInput.value = isMonitoring ? snapshot.selectorDefault || '' : '';
      }
      if (notesInput) notesInput.value = snapshot.notes || '';
      syncAutoGearMonitorFieldVisibility();
      if (nameInput) {
        try {
          nameInput.focus({
            preventScroll: true
          });
          if (typeof nameInput.select === 'function') {
            nameInput.select();
          }
        } catch (_unused) {
          nameInput.focus();
        }
      }
    }
    function clearAutoGearDraftItemEdit(type) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var normalizedType = type === 'remove' ? 'remove' : 'add';
      var _options$skipRender = options.skipRender,
        skipRender = _options$skipRender === void 0 ? false : _options$skipRender;
      if (autoGearEditorActiveItem && autoGearEditorActiveItem.listType === normalizedType) {
        autoGearEditorActiveItem = null;
      }
      resetAutoGearDraftInputs(normalizedType);
      syncAutoGearMonitorFieldVisibility();
      updateAutoGearDraftActionState();
      if (!skipRender) {
        renderAutoGearDraftLists();
      }
    }
    function beginAutoGearDraftItemEdit(listType, itemId) {
      if (!autoGearEditorDraft || !itemId) return;
      var normalizedType = listType === 'remove' ? 'remove' : 'add';
      var list = getAutoGearDraftList(normalizedType);
      if (!Array.isArray(list)) return;
      if (autoGearEditorActiveItem && autoGearEditorActiveItem.listType === normalizedType && autoGearEditorActiveItem.itemId === itemId) {
        clearAutoGearDraftItemEdit(normalizedType);
        return;
      }
      var target = list.find(function (entry) {
        return entry && entry.id === itemId;
      });
      if (!target) return;
      autoGearEditorActiveItem = {
        listType: normalizedType,
        itemId: itemId
      };
      populateAutoGearDraftForm(normalizedType, target);
      updateAutoGearDraftActionState();
      renderAutoGearDraftLists();
    }
    function getAutoGearItemIdentityData(item) {
      var normalized = normalizeAutoGearItem(item);
      if (!normalized) return null;
      var contexts = Array.isArray(normalized.contextNotes) ? normalized.contextNotes.map(function (value) {
        return typeof value === 'string' ? value.trim() : '';
      }).filter(Boolean).sort(function (a, b) {
        return a.localeCompare(b);
      }) : [];
      var identity = [normalized.name || '', normalized.category || '', normalized.screenSize || '', normalized.selectorType || 'none', normalized.selectorDefault || '', normalized.selectorEnabled ? '1' : '0', normalized.notes || '', contexts.join('|')].join('||');
      return {
        identity: identity,
        item: _objectSpread(_objectSpread({}, normalized), {}, {
          contextNotes: contexts.slice()
        })
      };
    }
    function normalizeAutoGearRuleForPreview(rule) {
      if (!rule || _typeof(rule) !== 'object') return null;
      var add = Array.isArray(rule.add) ? rule.add.map(normalizeAutoGearItem).filter(Boolean) : [];
      var remove = Array.isArray(rule.remove) ? rule.remove.map(normalizeAutoGearItem).filter(Boolean) : [];
      if (!add.length && !remove.length) return null;
      var id = typeof rule.id === 'string' && rule.id ? rule.id : '';
      return {
        id: id,
        add: add,
        remove: remove
      };
    }
    function aggregateAutoGearRuleItems(rules) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var allowDraftPreviewRules = Boolean(options.allowDraftPreviewRules);
      var aggregate = new Map();
      var list = Array.isArray(rules) ? rules : [];
      list.forEach(function (rule) {
        var normalizedRule = normalizeAutoGearRule(rule);
        if (!normalizedRule && allowDraftPreviewRules) {
          normalizedRule = normalizeAutoGearRuleForPreview(rule);
        }
        if (!normalizedRule) return;
        var ruleId = typeof normalizedRule.id === 'string' ? normalizedRule.id : '';
        normalizedRule.add.forEach(function (entry) {
          var identityData = getAutoGearItemIdentityData(entry);
          if (!identityData) return;
          var identity = identityData.identity,
            item = identityData.item;
          var quantity = normalizeAutoGearQuantity(item.quantity);
          if (!Number.isFinite(quantity)) return;
          var existing = aggregate.get(identity) || {
            item: item,
            add: 0,
            remove: 0,
            addRules: new Set(),
            removeRules: new Set()
          };
          existing.add += quantity;
          if (ruleId) existing.addRules.add(ruleId);
          aggregate.set(identity, existing);
        });
        normalizedRule.remove.forEach(function (entry) {
          var identityData = getAutoGearItemIdentityData(entry);
          if (!identityData) return;
          var identity = identityData.identity,
            item = identityData.item;
          var quantity = normalizeAutoGearQuantity(item.quantity);
          if (!Number.isFinite(quantity)) return;
          var existing = aggregate.get(identity) || {
            item: item,
            add: 0,
            remove: 0,
            addRules: new Set(),
            removeRules: new Set()
          };
          existing.remove += quantity;
          if (ruleId) existing.removeRules.add(ruleId);
          aggregate.set(identity, existing);
        });
      });
      return aggregate;
    }
    function computeAutoGearDraftImpactState() {
      if (!autoGearEditorDraft) {
        return {
          available: false,
          entries: [],
          warnings: null
        };
      }
      var baseRules = getAutoGearRules();
      var draftRule = normalizeAutoGearRule(autoGearEditorDraft);
      var previewRule = draftRule;
      var allowDraftPreviewRules = false;
      if (!previewRule) {
        previewRule = normalizeAutoGearRuleForPreview(autoGearEditorDraft);
        allowDraftPreviewRules = Boolean(previewRule);
      }
      if (!previewRule) {
        return {
          available: false,
          entries: [],
          warnings: null
        };
      }
      var previewRules = baseRules.slice();
      var matchIndex = previewRules.findIndex(function (rule) {
        return rule && rule.id === previewRule.id;
      });
      if (matchIndex >= 0) {
        previewRules[matchIndex] = previewRule;
      } else {
        previewRules.push(previewRule);
      }
      var baseAggregate = aggregateAutoGearRuleItems(baseRules);
      var previewAggregate = aggregateAutoGearRuleItems(previewRules, {
        allowDraftPreviewRules: allowDraftPreviewRules
      });
      var keys = new Set([].concat(_toConsumableArray(baseAggregate.keys()), _toConsumableArray(previewAggregate.keys())));
      var entries = [];
      var warnings = {
        critical: [],
        conflict: [],
        redundant: []
      };
      keys.forEach(function (identity) {
        var baseEntry = baseAggregate.get(identity);
        var previewEntry = previewAggregate.get(identity);
        if (!baseEntry && !previewEntry) return;
        var itemSource = (previewEntry === null || previewEntry === void 0 ? void 0 : previewEntry.item) || (baseEntry === null || baseEntry === void 0 ? void 0 : baseEntry.item);
        if (!itemSource) return;
        var item = cloneAutoGearDraftItem(itemSource);
        var baseNet = baseEntry ? baseEntry.add - baseEntry.remove : 0;
        var previewNet = previewEntry ? previewEntry.add - previewEntry.remove : 0;
        var delta = previewNet - baseNet;
        var addRulesCount = previewEntry ? previewEntry.addRules.size : 0;
        var removeRulesCount = previewEntry ? previewEntry.removeRules.size : 0;
        var baseAddRulesCount = baseEntry ? baseEntry.addRules.size : 0;
        var conflict = previewEntry ? previewEntry.add > 0 && previewEntry.remove > 0 : false;
        var stacked = addRulesCount > 1;
        var shouldDisplay = delta !== 0 || stacked || conflict;
        if (!shouldDisplay) return;
        entries.push({
          identity: identity,
          item: item,
          baseNet: baseNet,
          previewNet: previewNet,
          delta: delta,
          addRulesCount: addRulesCount,
          removeRulesCount: removeRulesCount,
          conflict: conflict,
          stacked: stacked
        });
        if (baseNet > 0 && previewNet <= 0) {
          warnings.critical.push({
            item: item,
            baseNet: baseNet,
            previewNet: previewNet
          });
        }
        if (conflict) {
          warnings.conflict.push({
            item: item,
            addRulesCount: addRulesCount,
            removeRulesCount: removeRulesCount
          });
        }
        var newAddRules = addRulesCount - baseAddRulesCount;
        if (newAddRules > 0 && previewNet <= baseNet) {
          warnings.redundant.push({
            item: item,
            addRulesCount: addRulesCount,
            baseAddRulesCount: baseAddRulesCount
          });
        }
      });
      entries.sort(function (a, b) {
        var deltaDiff = Math.abs(b.delta) - Math.abs(a.delta);
        if (deltaDiff !== 0) return deltaDiff;
        var previewDiff = Math.abs(b.previewNet) - Math.abs(a.previewNet);
        if (previewDiff !== 0) return previewDiff;
        return (a.item.name || '').localeCompare(b.item.name || '');
      });
      return {
        available: true,
        entries: entries,
        warnings: warnings
      };
    }
    function formatAutoGearImpactNumber(value) {
      if (!Number.isFinite(value)) return '0';
      var rounded = Math.round(value);
      if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
        try {
          return new Intl.NumberFormat().format(rounded);
        } catch (_unused2) {}
      }
      return String(rounded);
    }
    function formatAutoGearImpactSigned(value) {
      if (!Number.isFinite(value) || value === 0) return '0';
      var rounded = Math.round(value);
      var absValue = Math.abs(rounded);
      var formattedAbs = formatAutoGearImpactNumber(absValue);
      return rounded > 0 ? "+".concat(formattedAbs) : "\u2212".concat(formattedAbs);
    }
    function formatAutoGearDraftItemLabel(item, quantity) {
      var snapshot = autoGearItemSnapshot(item);
      if (!snapshot) return '';
      var normalizedQuantity = Number.isFinite(quantity) && quantity !== 0 ? Math.abs(Math.round(quantity)) : normalizeAutoGearQuantity(snapshot.quantity) || 1;
      var summaryItem = _objectSpread(_objectSpread({}, snapshot), {}, {
        quantity: normalizedQuantity > 0 ? normalizedQuantity : 1
      });
      return formatAutoGearItemSummary(summaryItem, {
        includeSign: false
      });
    }
    function hasAutoGearDraftWarnings(warnings) {
      if (!warnings) return false;
      return Boolean(Array.isArray(warnings.critical) && warnings.critical.length || Array.isArray(warnings.conflict) && warnings.conflict.length || Array.isArray(warnings.redundant) && warnings.redundant.length);
    }
    function buildAutoGearDraftWarningMessages(warnings, langTexts) {
      if (!warnings) return [];
      var messages = [];
      var fallback = texts.en || {};
      var addMessage = function addMessage(key, label) {
        var template = langTexts[key] || fallback[key];
        if (template) {
          messages.push(formatWithPlaceholders(template, label));
        } else if (label) {
          messages.push(label);
        }
      };
      (Array.isArray(warnings.critical) ? warnings.critical : []).forEach(function (entry) {
        var label = formatAutoGearDraftItemLabel(entry.item, entry.baseNet);
        addMessage('autoGearDraftWarningCritical', label);
      });
      (Array.isArray(warnings.conflict) ? warnings.conflict : []).forEach(function (entry) {
        var label = formatAutoGearDraftItemLabel(entry.item, entry.addRulesCount || entry.removeRulesCount || 1);
        addMessage('autoGearDraftWarningConflict', label);
      });
      (Array.isArray(warnings.redundant) ? warnings.redundant : []).forEach(function (entry) {
        var label = formatAutoGearDraftItemLabel(entry.item, entry.addRulesCount || 1);
        addMessage('autoGearDraftWarningRedundant', label);
      });
      return Array.from(new Set(messages));
    }
    function renderAutoGearDraftImpact() {
      if (!autoGearDraftImpactList) return;
      var langTexts = texts[currentLang] || texts.en || {};
      autoGearDraftImpactList.innerHTML = '';
      if (autoGearDraftWarningList) {
        autoGearDraftWarningList.innerHTML = '';
      }
      autoGearDraftPendingWarnings = null;
      if (!autoGearEditorDraft) {
        var _texts$en124;
        var message = langTexts.autoGearDraftImpactUnavailable || ((_texts$en124 = texts.en) === null || _texts$en124 === void 0 ? void 0 : _texts$en124.autoGearDraftImpactUnavailable) || '';
        if (message) {
          var empty = document.createElement('li');
          empty.className = 'auto-gear-impact-empty';
          empty.textContent = message;
          autoGearDraftImpactList.appendChild(empty);
        }
        if (autoGearDraftWarningContainer) {
          autoGearDraftWarningContainer.hidden = true;
        }
        return;
      }
      var impact = computeAutoGearDraftImpactState();
      autoGearDraftPendingWarnings = impact.available ? impact.warnings : null;
      if (!impact.available) {
        var _texts$en125;
        var _message = langTexts.autoGearDraftImpactUnavailable || ((_texts$en125 = texts.en) === null || _texts$en125 === void 0 ? void 0 : _texts$en125.autoGearDraftImpactUnavailable) || '';
        if (_message) {
          var _empty5 = document.createElement('li');
          _empty5.className = 'auto-gear-impact-empty';
          _empty5.textContent = _message;
          autoGearDraftImpactList.appendChild(_empty5);
        }
        if (autoGearDraftWarningContainer) {
          autoGearDraftWarningContainer.hidden = true;
        }
        return;
      }
      if (!impact.entries.length) {
        var _texts$en126;
        var _message2 = langTexts.autoGearDraftImpactEmpty || ((_texts$en126 = texts.en) === null || _texts$en126 === void 0 ? void 0 : _texts$en126.autoGearDraftImpactEmpty) || '';
        if (_message2) {
          var _empty6 = document.createElement('li');
          _empty6.className = 'auto-gear-impact-empty';
          _empty6.textContent = _message2;
          autoGearDraftImpactList.appendChild(_empty6);
        }
      } else {
        var _texts$en127, _texts$en128;
        var totalsTemplate = langTexts.autoGearDraftImpactTotals || ((_texts$en127 = texts.en) === null || _texts$en127 === void 0 ? void 0 : _texts$en127.autoGearDraftImpactTotals) || 'Current total: %s → After save: %s';
        var changeTemplate = langTexts.autoGearDraftImpactChange || ((_texts$en128 = texts.en) === null || _texts$en128 === void 0 ? void 0 : _texts$en128.autoGearDraftImpactChange) || 'Change: %s';
        impact.entries.forEach(function (entry) {
          var li = document.createElement('li');
          li.className = 'auto-gear-impact-item';
          if (entry.delta > 0) {
            li.classList.add('auto-gear-impact-positive');
          } else if (entry.delta < 0) {
            li.classList.add('auto-gear-impact-negative');
          }
          if (entry.stacked) {
            li.classList.add('auto-gear-impact-stacked');
          }
          var summary = document.createElement('div');
          summary.className = 'auto-gear-impact-summary';
          summary.textContent = formatAutoGearDraftItemLabel(entry.item, entry.previewNet || entry.baseNet || entry.delta);
          li.appendChild(summary);
          var totals = document.createElement('div');
          totals.className = 'auto-gear-impact-totals';
          totals.textContent = formatWithPlaceholders(totalsTemplate, formatAutoGearImpactNumber(entry.baseNet), formatAutoGearImpactNumber(entry.previewNet));
          li.appendChild(totals);
          var delta = document.createElement('div');
          delta.className = 'auto-gear-impact-delta';
          delta.textContent = formatWithPlaceholders(changeTemplate, formatAutoGearImpactSigned(entry.delta));
          li.appendChild(delta);
          var metaTexts = [];
          if (entry.stacked) {
            var _texts$en129;
            var stackKey = entry.addRulesCount === 1 ? 'autoGearDraftImpactStackedOne' : 'autoGearDraftImpactStackedOther';
            var stackTemplate = langTexts[stackKey] || ((_texts$en129 = texts.en) === null || _texts$en129 === void 0 ? void 0 : _texts$en129[stackKey]);
            if (stackTemplate) {
              metaTexts.push(formatWithPlaceholders(stackTemplate, formatAutoGearImpactNumber(entry.addRulesCount)));
            }
          }
          if (entry.conflict && entry.removeRulesCount > 0) {
            var _texts$en130;
            var conflictKey = entry.removeRulesCount === 1 ? 'autoGearDraftImpactConflictOne' : 'autoGearDraftImpactConflictOther';
            var conflictTemplate = langTexts[conflictKey] || ((_texts$en130 = texts.en) === null || _texts$en130 === void 0 ? void 0 : _texts$en130[conflictKey]);
            if (conflictTemplate) {
              metaTexts.push(formatWithPlaceholders(conflictTemplate, formatAutoGearImpactNumber(entry.removeRulesCount)));
            }
          }
          if (metaTexts.length) {
            var meta = document.createElement('div');
            meta.className = 'auto-gear-impact-meta';
            meta.textContent = metaTexts.join(' ');
            li.appendChild(meta);
          }
          autoGearDraftImpactList.appendChild(li);
        });
      }
      if (autoGearDraftWarningContainer) {
        var warningMessages = buildAutoGearDraftWarningMessages(autoGearDraftPendingWarnings, langTexts);
        if (warningMessages.length) {
          autoGearDraftWarningContainer.hidden = false;
          if (autoGearDraftWarningList) {
            warningMessages.forEach(function (message) {
              var item = document.createElement('li');
              item.className = 'auto-gear-impact-warning-item';
              item.textContent = message;
              autoGearDraftWarningList.appendChild(item);
            });
          }
        } else {
          autoGearDraftWarningContainer.hidden = true;
        }
      }
    }
    function renderAutoGearDraftLists() {
      updateAutoGearDraftActionState();
      if (!autoGearEditorDraft) {
        if (autoGearAddList) autoGearAddList.innerHTML = '';
        if (autoGearRemoveList) autoGearRemoveList.innerHTML = '';
        renderAutoGearDraftImpact();
        return;
      }
      var renderList = function renderList(element, items, type) {
        if (!element) return;
        element.innerHTML = '';
        if (!items.length) {
          var _texts$currentLang47, _texts$en131;
          var empty = document.createElement('li');
          empty.className = 'auto-gear-empty';
          empty.textContent = ((_texts$currentLang47 = texts[currentLang]) === null || _texts$currentLang47 === void 0 ? void 0 : _texts$currentLang47.autoGearEmptyList) || ((_texts$en131 = texts.en) === null || _texts$en131 === void 0 ? void 0 : _texts$en131.autoGearEmptyList) || 'No items yet.';
          element.appendChild(empty);
          return;
        }
        items.forEach(function (item) {
          var _texts$currentLang48, _texts$en132, _texts$currentLang49, _texts$en133;
          var li = document.createElement('li');
          li.className = 'auto-gear-item';
          if (autoGearEditorActiveItem && autoGearEditorActiveItem.listType === type && autoGearEditorActiveItem.itemId === item.id) {
            li.classList.add('auto-gear-item-editing');
          }
          var span = document.createElement('span');
          span.textContent = formatAutoGearItemSummary(item, {
            includeSign: true,
            listType: type
          });
          li.appendChild(span);
          var actions = document.createElement('span');
          actions.className = 'auto-gear-item-actions';
          var editBtn = document.createElement('button');
          editBtn.type = 'button';
          editBtn.className = 'auto-gear-edit-entry';
          editBtn.dataset.listType = type;
          editBtn.dataset.itemId = item.id;
          var editLabel = ((_texts$currentLang48 = texts[currentLang]) === null || _texts$currentLang48 === void 0 ? void 0 : _texts$currentLang48.autoGearListEdit) || ((_texts$en132 = texts.en) === null || _texts$en132 === void 0 ? void 0 : _texts$en132.autoGearListEdit) || 'Edit';
          editBtn.textContent = editLabel;
          editBtn.setAttribute('data-help', editLabel);
          editBtn.setAttribute('aria-pressed', autoGearEditorActiveItem && autoGearEditorActiveItem.listType === type && autoGearEditorActiveItem.itemId === item.id ? 'true' : 'false');
          actions.appendChild(editBtn);
          var removeBtn = document.createElement('button');
          removeBtn.type = 'button';
          removeBtn.className = 'auto-gear-remove-entry';
          removeBtn.dataset.listType = type;
          removeBtn.dataset.itemId = item.id;
          var removeLabel = ((_texts$currentLang49 = texts[currentLang]) === null || _texts$currentLang49 === void 0 ? void 0 : _texts$currentLang49.autoGearListRemove) || ((_texts$en133 = texts.en) === null || _texts$en133 === void 0 ? void 0 : _texts$en133.autoGearListRemove) || 'Remove';
          removeBtn.textContent = removeLabel;
          removeBtn.setAttribute('data-help', removeLabel);
          actions.appendChild(removeBtn);
          li.appendChild(actions);
          element.appendChild(li);
        });
      };
      renderList(autoGearAddList, autoGearEditorDraft.add, 'add');
      renderList(autoGearRemoveList, autoGearEditorDraft.remove, 'remove');
      renderAutoGearDraftImpact();
    }
    function openAutoGearEditor(ruleId) {
      var _autoGearEditorDraft$, _autoGearEditorDraft$2;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!autoGearEditor) return;
      var initialDraft = options.initialDraft,
        _options$highlightLab = options.highlightLabel,
        highlightLabel = _options$highlightLab === void 0 ? false : _options$highlightLab;
      var rules = getAutoGearRules();
      var source = initialDraft ? initialDraft : ruleId ? rules.find(function (rule) {
        return rule.id === ruleId;
      }) : null;
      autoGearEditorDraft = createAutoGearDraft(source);
      autoGearEditorActiveItem = null;
      autoGearEditor.hidden = false;
      autoGearEditor.setAttribute('aria-hidden', 'false');
      if (autoGearAddRuleBtn) {
        autoGearAddRuleBtn.setAttribute('aria-expanded', 'true');
      }
      if (autoGearRuleNameInput) {
        autoGearRuleNameInput.value = autoGearEditorDraft.label || '';
      }
      initializeAutoGearConditionsFromDraft();
      populateAutoGearCategorySelect(autoGearAddCategorySelect, ((_autoGearEditorDraft$ = autoGearEditorDraft.add[0]) === null || _autoGearEditorDraft$ === void 0 ? void 0 : _autoGearEditorDraft$.category) || '');
      populateAutoGearCategorySelect(autoGearRemoveCategorySelect, ((_autoGearEditorDraft$2 = autoGearEditorDraft.remove[0]) === null || _autoGearEditorDraft$2 === void 0 ? void 0 : _autoGearEditorDraft$2.category) || '');
      resetAutoGearDraftInputs('add');
      resetAutoGearDraftInputs('remove');
      syncAutoGearMonitorFieldVisibility();
      updateAutoGearDraftActionState();
      renderAutoGearDraftLists();
      if (autoGearRuleNameInput) {
        autoGearRuleNameInput.focus();
        if (highlightLabel && typeof autoGearRuleNameInput.select === 'function' && autoGearRuleNameInput.value) {
          try {
            autoGearRuleNameInput.select();
          } catch (_unused3) {}
        }
      }
    }
    function closeAutoGearEditor() {
      if (!autoGearEditor) return;
      autoGearEditor.hidden = true;
      autoGearEditor.setAttribute('aria-hidden', 'true');
      if (autoGearAddRuleBtn) {
        autoGearAddRuleBtn.setAttribute('aria-expanded', 'false');
      }
      autoGearEditorDraft = null;
      autoGearEditorActiveItem = null;
      if (autoGearRuleNameInput) autoGearRuleNameInput.value = '';
      clearAllAutoGearConditions();
      resetAutoGearDraftInputs('add');
      resetAutoGearDraftInputs('remove');
      syncAutoGearMonitorFieldVisibility();
      updateAutoGearDraftActionState();
      renderAutoGearDraftLists();
    }
    function addAutoGearDraftItem(type) {
      if (!autoGearEditorDraft) return;
      var normalizedType = type === 'remove' ? 'remove' : 'add';
      var isAdd = normalizedType === 'add';
      var nameInput = isAdd ? autoGearAddNameInput : autoGearRemoveNameInput;
      var categorySelect = isAdd ? autoGearAddCategorySelect : autoGearRemoveCategorySelect;
      var quantityInput = isAdd ? autoGearAddQuantityInput : autoGearRemoveQuantityInput;
      var screenSizeInput = isAdd ? autoGearAddScreenSizeInput : autoGearRemoveScreenSizeInput;
      var selectorTypeSelect = isAdd ? autoGearAddSelectorTypeSelect : autoGearRemoveSelectorTypeSelect;
      var selectorDefaultInput = isAdd ? autoGearAddSelectorDefaultInput : autoGearRemoveSelectorDefaultInput;
      var notesInput = isAdd ? autoGearAddNotesInput : autoGearRemoveNotesInput;
      if (!nameInput || !categorySelect || !quantityInput) return;
      var parsedNames = parseAutoGearDraftNames(nameInput.value);
      if (!parsedNames.length) {
        var _texts$currentLang50, _texts$en134;
        var message = ((_texts$currentLang50 = texts[currentLang]) === null || _texts$currentLang50 === void 0 ? void 0 : _texts$currentLang50.autoGearItemNameRequired) || ((_texts$en134 = texts.en) === null || _texts$en134 === void 0 ? void 0 : _texts$en134.autoGearItemNameRequired) || 'Enter an item name first.';
        window.alert(message);
        return;
      }
      var baseValues = {
        category: categorySelect.value || '',
        quantity: normalizeAutoGearQuantity(quantityInput.value),
        screenSize: screenSizeInput ? screenSizeInput.value : '',
        selectorType: selectorTypeSelect ? selectorTypeSelect.value : 'none',
        selectorDefault: selectorDefaultInput ? selectorDefaultInput.value : '',
        notes: notesInput ? notesInput.value : ''
      };
      if (isAutoGearMonitoringCategory(baseValues.category)) {
        baseValues.selectorEnabled = baseValues.selectorType !== 'none';
      } else {
        baseValues.screenSize = '';
        baseValues.selectorType = 'none';
        baseValues.selectorDefault = '';
        baseValues.selectorEnabled = false;
      }
      var editingTarget = autoGearEditorActiveItem && autoGearEditorActiveItem.listType === normalizedType ? autoGearEditorActiveItem : null;
      if (editingTarget) {
        if (parsedNames.length !== 1) {
          var _texts$currentLang51, _texts$en135;
          var warning = ((_texts$currentLang51 = texts[currentLang]) === null || _texts$currentLang51 === void 0 ? void 0 : _texts$currentLang51.autoGearEditSingleItemWarning) || ((_texts$en135 = texts.en) === null || _texts$en135 === void 0 ? void 0 : _texts$en135.autoGearEditSingleItemWarning) || 'Edit one item at a time.';
          window.alert(warning);
          return;
        }
        var entry = parsedNames[0];
        var quantity = Object.prototype.hasOwnProperty.call(entry, 'quantity') ? normalizeAutoGearQuantity(entry.quantity) : baseValues.quantity;
        var list = getAutoGearDraftList(normalizedType);
        if (!Array.isArray(list)) return;
        var index = list.findIndex(function (item) {
          return item && item.id === editingTarget.itemId;
        });
        if (index < 0) {
          clearAutoGearDraftItemEdit(normalizedType, {
            skipRender: true
          });
          renderAutoGearDraftLists();
          updateAutoGearCatalogOptions();
          return;
        }
        var itemData = normalizeAutoGearItem({
          id: editingTarget.itemId,
          name: entry.name,
          category: baseValues.category,
          quantity: quantity,
          screenSize: baseValues.screenSize,
          selectorType: baseValues.selectorType,
          selectorDefault: baseValues.selectorDefault,
          selectorEnabled: baseValues.selectorEnabled,
          notes: baseValues.notes
        });
        if (itemData) {
          list[index] = itemData;
        } else {
          list.splice(index, 1);
        }
        clearAutoGearDraftItemEdit(normalizedType, {
          skipRender: true
        });
        renderAutoGearDraftLists();
        updateAutoGearCatalogOptions();
        return;
      }
      parsedNames.forEach(function (entry) {
        var quantity = Object.prototype.hasOwnProperty.call(entry, 'quantity') ? normalizeAutoGearQuantity(entry.quantity) : baseValues.quantity;
        var targetType = entry.listType || (isAdd ? 'add' : 'remove');
        var targetList = targetType === 'remove' ? autoGearEditorDraft.remove : autoGearEditorDraft.add;
        var itemData = normalizeAutoGearItem({
          id: generateAutoGearId('item'),
          name: entry.name,
          category: baseValues.category,
          quantity: quantity,
          screenSize: baseValues.screenSize,
          selectorType: baseValues.selectorType,
          selectorDefault: baseValues.selectorDefault,
          selectorEnabled: baseValues.selectorEnabled,
          notes: baseValues.notes
        });
        if (itemData) {
          targetList.push(itemData);
        }
      });
      resetAutoGearDraftInputs(normalizedType);
      syncAutoGearMonitorFieldVisibility();
      renderAutoGearDraftLists();
      updateAutoGearCatalogOptions();
    }
    function saveAutoGearRuleFromEditor() {
      var _texts$currentLang56, _texts$en141;
      if (!autoGearEditorDraft) return;
      var scenarios = isAutoGearConditionActive('scenarios') && autoGearScenariosSelect ? Array.from(autoGearScenariosSelect.selectedOptions || []).map(function (option) {
        return option.value;
      }).filter(Boolean) : [];
      var rawScenarioMode = autoGearScenarioModeSelectRef ? normalizeAutoGearScenarioLogic(autoGearScenarioModeSelectRef.value) : 'all';
      var multiplierInputValue = autoGearScenarioFactorInput ? autoGearScenarioFactorInput.value : '1';
      var normalizedMultiplier = normalizeAutoGearScenarioMultiplier(multiplierInputValue);
      var scenarioMode = rawScenarioMode;
      if (scenarioMode === 'multiplier' && scenarios.length < 2) {
        scenarioMode = 'all';
      }
      var baseSelection = autoGearScenarioBaseSelect ? autoGearScenarioBaseSelect.value : '';
      var scenarioBase = scenarioMode === 'multiplier' ? normalizeAutoGearScenarioPrimary(baseSelection) : '';
      if (scenarioMode === 'multiplier' && scenarioBase && !scenarios.includes(scenarioBase)) {
        scenarios.push(scenarioBase);
      }
      var matteboxSelections = isAutoGearConditionActive('mattebox') && autoGearMatteboxSelect ? Array.from(autoGearMatteboxSelect.selectedOptions || []).map(function (option) {
        return option.value;
      }).filter(Boolean) : [];
      var cameraHandleSelections = isAutoGearConditionActive('cameraHandle') && autoGearCameraHandleSelect ? Array.from(autoGearCameraHandleSelect.selectedOptions || []).map(function (option) {
        return option.value;
      }).filter(Boolean) : [];
      var viewfinderSelections = isAutoGearConditionActive('viewfinderExtension') && autoGearViewfinderExtensionSelect ? Array.from(autoGearViewfinderExtensionSelect.selectedOptions || []).map(function (option) {
        return option.value;
      }).filter(function (value) {
        return typeof value === 'string' && value.trim();
      }) : [];
      var deliveryResolutionSelections = isAutoGearConditionActive('deliveryResolution') && autoGearDeliveryResolutionSelect ? Array.from(autoGearDeliveryResolutionSelect.selectedOptions || []).map(function (option) {
        return option.value;
      }).filter(function (value) {
        return typeof value === 'string' && value.trim();
      }) : [];
      var videoDistributionSelections = isAutoGearConditionActive('videoDistribution') && autoGearVideoDistributionSelect ? Array.from(autoGearVideoDistributionSelect.selectedOptions || []).map(function (option) {
        return option.value;
      }).filter(Boolean) : [];
      if (videoDistributionSelections.includes('__none__') && videoDistributionSelections.length > 1) {
        videoDistributionSelections = videoDistributionSelections.filter(function (value) {
          return value !== '__none__';
        });
      }
      var cameraSelections = isAutoGearConditionActive('camera') && autoGearCameraSelect ? Array.from(autoGearCameraSelect.selectedOptions || []).map(function (option) {
        return option.value;
      }).filter(function (value) {
        return typeof value === 'string' && value.trim();
      }) : [];
      var cameraWeightCondition = function () {
        if (!isAutoGearConditionActive('cameraWeight')) return null;
        var operatorValue = autoGearCameraWeightOperator ? autoGearCameraWeightOperator.value : '';
        var thresholdValue = autoGearCameraWeightValueInput ? autoGearCameraWeightValueInput.value : '';
        var normalizedCondition = normalizeAutoGearCameraWeightCondition({
          operator: operatorValue,
          value: thresholdValue
        });
        if (normalizedCondition) return normalizedCondition;
        var normalizedOperator = normalizeAutoGearWeightOperator(operatorValue);
        return normalizedOperator ? {
          operator: normalizedOperator,
          value: null
        } : null;
      }();
      var monitorSelections = isAutoGearConditionActive('monitor') && autoGearMonitorSelect ? Array.from(autoGearMonitorSelect.selectedOptions || []).map(function (option) {
        return option.value;
      }).filter(function (value) {
        return typeof value === 'string' && value.trim();
      }) : [];
      var crewPresentSelections = isAutoGearConditionActive('crewPresent') && autoGearCrewPresentSelect ? Array.from(autoGearCrewPresentSelect.selectedOptions || []).map(function (option) {
        return option.value;
      }).filter(function (value) {
        return typeof value === 'string' && value.trim();
      }) : [];
      var crewAbsentSelections = isAutoGearConditionActive('crewAbsent') && autoGearCrewAbsentSelect ? Array.from(autoGearCrewAbsentSelect.selectedOptions || []).map(function (option) {
        return option.value;
      }).filter(function (value) {
        return typeof value === 'string' && value.trim();
      }) : [];
      var wirelessSelections = isAutoGearConditionActive('wireless') && autoGearWirelessSelect ? Array.from(autoGearWirelessSelect.selectedOptions || []).map(function (option) {
        return option.value;
      }).filter(function (value) {
        return typeof value === 'string' && value.trim();
      }) : [];
      var motorSelections = isAutoGearConditionActive('motors') && autoGearMotorsSelect ? Array.from(autoGearMotorsSelect.selectedOptions || []).map(function (option) {
        return option.value;
      }).filter(function (value) {
        return typeof value === 'string' && value.trim();
      }) : [];
      var controllerSelections = isAutoGearConditionActive('controllers') && autoGearControllersSelect ? Array.from(autoGearControllersSelect.selectedOptions || []).map(function (option) {
        return option.value;
      }).filter(function (value) {
        return typeof value === 'string' && value.trim();
      }) : [];
      var distanceSelections = isAutoGearConditionActive('distance') && autoGearDistanceSelect ? Array.from(autoGearDistanceSelect.selectedOptions || []).map(function (option) {
        return option.value;
      }).filter(function (value) {
        return typeof value === 'string' && value.trim();
      }) : [];
      var draftConditionLogic = {};
      if (scenarioMode !== 'all') {
        draftConditionLogic.scenarios = scenarioMode;
      }
      var matteboxLogic = autoGearMatteboxModeSelect ? normalizeAutoGearConditionLogic(autoGearMatteboxModeSelect.value) : 'all';
      var cameraHandleLogic = autoGearCameraHandleModeSelect ? normalizeAutoGearConditionLogic(autoGearCameraHandleModeSelect.value) : 'all';
      var viewfinderLogic = autoGearViewfinderExtensionModeSelect ? normalizeAutoGearConditionLogic(autoGearViewfinderExtensionModeSelect.value) : 'all';
      var deliveryLogic = autoGearDeliveryResolutionModeSelect ? normalizeAutoGearConditionLogic(autoGearDeliveryResolutionModeSelect.value) : 'all';
      var videoDistributionLogic = autoGearVideoDistributionModeSelect ? normalizeAutoGearConditionLogic(autoGearVideoDistributionModeSelect.value) : 'all';
      var cameraLogic = autoGearCameraModeSelect ? normalizeAutoGearConditionLogic(autoGearCameraModeSelect.value) : 'all';
      var monitorLogic = autoGearMonitorModeSelect ? normalizeAutoGearConditionLogic(autoGearMonitorModeSelect.value) : 'all';
      var crewPresentLogic = autoGearCrewPresentModeSelect ? normalizeAutoGearConditionLogic(autoGearCrewPresentModeSelect.value) : 'all';
      var crewAbsentLogic = autoGearCrewAbsentModeSelect ? normalizeAutoGearConditionLogic(autoGearCrewAbsentModeSelect.value) : 'all';
      var wirelessLogic = autoGearWirelessModeSelect ? normalizeAutoGearConditionLogic(autoGearWirelessModeSelect.value) : 'all';
      var motorsLogic = autoGearMotorsModeSelect ? normalizeAutoGearConditionLogic(autoGearMotorsModeSelect.value) : 'all';
      var controllersLogic = autoGearControllersModeSelect ? normalizeAutoGearConditionLogic(autoGearControllersModeSelect.value) : 'all';
      var distanceLogic = autoGearDistanceModeSelect ? normalizeAutoGearConditionLogic(autoGearDistanceModeSelect.value) : 'all';
      if (matteboxLogic !== 'all') draftConditionLogic.mattebox = matteboxLogic;
      if (cameraHandleLogic !== 'all') draftConditionLogic.cameraHandle = cameraHandleLogic;
      if (viewfinderLogic !== 'all') draftConditionLogic.viewfinderExtension = viewfinderLogic;
      if (deliveryLogic !== 'all') draftConditionLogic.deliveryResolution = deliveryLogic;
      if (videoDistributionLogic !== 'all') draftConditionLogic.videoDistribution = videoDistributionLogic;
      if (cameraLogic !== 'all') draftConditionLogic.camera = cameraLogic;
      if (monitorLogic !== 'all') draftConditionLogic.monitor = monitorLogic;
      if (crewPresentLogic !== 'all') draftConditionLogic.crewPresent = crewPresentLogic;
      if (crewAbsentLogic !== 'all') draftConditionLogic.crewAbsent = crewAbsentLogic;
      if (wirelessLogic !== 'all') draftConditionLogic.wireless = wirelessLogic;
      if (motorsLogic !== 'all') draftConditionLogic.motors = motorsLogic;
      if (controllersLogic !== 'all') draftConditionLogic.controllers = controllersLogic;
      if (distanceLogic !== 'all') draftConditionLogic.distance = distanceLogic;
      var shootingDaysRequirement = function () {
        if (!isAutoGearConditionActive('shootingDays')) return null;
        if (!autoGearShootingDaysInput) return null;
        var modeValue = autoGearShootingDaysMode ? autoGearShootingDaysMode.value : 'minimum';
        var rawCondition = {
          mode: modeValue,
          value: autoGearShootingDaysInput.value
        };
        return normalizeAutoGearShootingDaysCondition(rawCondition);
      }();
      var alwaysActive = isAutoGearConditionActive('always');
      if (!alwaysActive && !scenarios.length && !matteboxSelections.length && !cameraHandleSelections.length && !viewfinderSelections.length && !deliveryResolutionSelections.length && !videoDistributionSelections.length && !cameraSelections.length && !cameraWeightCondition && !monitorSelections.length && !crewPresentSelections.length && !crewAbsentSelections.length && !wirelessSelections.length && !motorSelections.length && !controllerSelections.length && !distanceSelections.length && !shootingDaysRequirement) {
        var _texts$currentLang52, _texts$en136, _texts$currentLang53, _texts$en137;
        var message = ((_texts$currentLang52 = texts[currentLang]) === null || _texts$currentLang52 === void 0 ? void 0 : _texts$currentLang52.autoGearRuleConditionRequired) || ((_texts$en136 = texts.en) === null || _texts$en136 === void 0 ? void 0 : _texts$en136.autoGearRuleConditionRequired) || ((_texts$currentLang53 = texts[currentLang]) === null || _texts$currentLang53 === void 0 ? void 0 : _texts$currentLang53.autoGearRuleScenarioRequired) || ((_texts$en137 = texts.en) === null || _texts$en137 === void 0 ? void 0 : _texts$en137.autoGearRuleScenarioRequired) || 'Select at least one scenario, mattebox option, camera handle, viewfinder extension, delivery resolution or video distribution before saving.';
        window.alert(message);
        return;
      }
      if (isAutoGearConditionActive('cameraWeight') && (!cameraWeightCondition || !Number.isFinite(cameraWeightCondition.value))) {
        var _texts$currentLang54, _texts$en138;
        var _message3 = ((_texts$currentLang54 = texts[currentLang]) === null || _texts$currentLang54 === void 0 ? void 0 : _texts$currentLang54.autoGearCameraWeightValueRequired) || ((_texts$en138 = texts.en) === null || _texts$en138 === void 0 ? void 0 : _texts$en138.autoGearCameraWeightValueRequired) || 'Enter a camera weight threshold before saving.';
        window.alert(_message3);
        if (autoGearCameraWeightValueInput) {
          try {
            autoGearCameraWeightValueInput.focus({
              preventScroll: true
            });
          } catch (_unused4) {
            autoGearCameraWeightValueInput.focus();
          }
        }
        return;
      }
      if (autoGearRuleNameInput) {
        autoGearEditorDraft.label = autoGearRuleNameInput.value.trim();
      }
      autoGearEditorDraft.always = alwaysActive ? ['always'] : [];
      autoGearEditorDraft.scenarioLogic = scenarioMode;
      autoGearEditorDraft.scenarioMultiplier = scenarioMode === 'multiplier' ? normalizedMultiplier : 1;
      autoGearEditorDraft.scenarioPrimary = scenarioMode === 'multiplier' ? scenarioBase : '';
      autoGearEditorDraft.scenarios = scenarios;
      autoGearEditorDraft.mattebox = matteboxSelections;
      autoGearEditorDraft.cameraHandle = cameraHandleSelections;
      autoGearEditorDraft.viewfinderExtension = viewfinderSelections;
      autoGearEditorDraft.deliveryResolution = deliveryResolutionSelections;
      autoGearEditorDraft.videoDistribution = videoDistributionSelections;
      autoGearEditorDraft.camera = cameraSelections;
      autoGearEditorDraft.cameraWeight = cameraWeightCondition ? _objectSpread({}, cameraWeightCondition) : null;
      autoGearEditorDraft.monitor = monitorSelections;
      autoGearEditorDraft.crewPresent = crewPresentSelections;
      autoGearEditorDraft.crewAbsent = crewAbsentSelections;
      autoGearEditorDraft.wireless = wirelessSelections;
      autoGearEditorDraft.motors = motorSelections;
      autoGearEditorDraft.controllers = controllerSelections;
      autoGearEditorDraft.distance = distanceSelections;
      autoGearEditorDraft.matteboxLogic = matteboxLogic;
      autoGearEditorDraft.cameraHandleLogic = cameraHandleLogic;
      autoGearEditorDraft.viewfinderExtensionLogic = viewfinderLogic;
      autoGearEditorDraft.deliveryResolutionLogic = deliveryLogic;
      autoGearEditorDraft.videoDistributionLogic = videoDistributionLogic;
      autoGearEditorDraft.cameraLogic = cameraLogic;
      autoGearEditorDraft.monitorLogic = monitorLogic;
      autoGearEditorDraft.crewPresentLogic = crewPresentLogic;
      autoGearEditorDraft.crewAbsentLogic = crewAbsentLogic;
      autoGearEditorDraft.wirelessLogic = wirelessLogic;
      autoGearEditorDraft.motorsLogic = motorsLogic;
      autoGearEditorDraft.controllersLogic = controllersLogic;
      autoGearEditorDraft.distanceLogic = distanceLogic;
      autoGearEditorDraft.conditionLogic = draftConditionLogic;
      autoGearEditorDraft.shootingDays = shootingDaysRequirement;
      if (!autoGearEditorDraft.add.length && !autoGearEditorDraft.remove.length) {
        var _texts$currentLang55, _texts$en139;
        var _message4 = ((_texts$currentLang55 = texts[currentLang]) === null || _texts$currentLang55 === void 0 ? void 0 : _texts$currentLang55.autoGearRuleNeedsItems) || ((_texts$en139 = texts.en) === null || _texts$en139 === void 0 ? void 0 : _texts$en139.autoGearRuleNeedsItems) || 'Add at least one item to add or remove.';
        window.alert(_message4);
        return;
      }
      renderAutoGearDraftImpact();
      var draftRule = normalizeAutoGearRule(autoGearEditorDraft);
      if (!draftRule) return;
      var langTexts = texts[currentLang] || texts.en || {};
      var warningMessages = buildAutoGearDraftWarningMessages(autoGearDraftPendingWarnings, langTexts);
      if (warningMessages.length && typeof window.confirm === 'function') {
        var _texts$en140;
        var confirmBase = langTexts.autoGearDraftWarningConfirm || ((_texts$en140 = texts.en) === null || _texts$en140 === void 0 ? void 0 : _texts$en140.autoGearDraftWarningConfirm) || 'Save anyway? Review the impact warnings below before confirming.';
        var details = warningMessages.map(function (message) {
          return "\u2022 ".concat(message);
        }).join('\n');
        var confirmMessage = "".concat(confirmBase, "\n\n").concat(details);
        if (!window.confirm(confirmMessage)) {
          return;
        }
      }
      var rules = getAutoGearRules();
      var index = rules.findIndex(function (rule) {
        return rule.id === draftRule.id;
      });
      if (index >= 0) {
        rules[index] = draftRule;
      } else {
        rules.push(draftRule);
      }
      setAutoGearRules(rules);
      updateAutoGearCatalogOptions();
      renderAutoGearRulesList();
      var successMessage = ((_texts$currentLang56 = texts[currentLang]) === null || _texts$currentLang56 === void 0 ? void 0 : _texts$currentLang56.autoGearRuleSaved) || ((_texts$en141 = texts.en) === null || _texts$en141 === void 0 ? void 0 : _texts$en141.autoGearRuleSaved) || 'Automatic gear rule saved.';
      showNotification('success', successMessage);
      closeAutoGearEditor();
    }
    function duplicateAutoGearRule(ruleId) {
      var _texts$en142;
      if (!ruleId) return;
      var rules = getAutoGearRules();
      var original = rules.find(function (rule) {
        return rule && rule.id === ruleId;
      });
      if (!original) return;
      var langTexts = texts[currentLang] || texts.en || {};
      var suffixBase = typeof langTexts.autoGearDuplicateSuffix === 'string' ? langTexts.autoGearDuplicateSuffix.trim() : '';
      var fallbackSuffix = typeof ((_texts$en142 = texts.en) === null || _texts$en142 === void 0 ? void 0 : _texts$en142.autoGearDuplicateSuffix) === 'string' ? texts.en.autoGearDuplicateSuffix.trim() : '';
      var suffix = suffixBase || fallbackSuffix || 'Copy';
      var baseLabel = typeof original.label === 'string' ? original.label.trim() : '';
      var existingLabels = new Set(rules.map(function (rule) {
        return typeof (rule === null || rule === void 0 ? void 0 : rule.label) === 'string' ? rule.label.trim().toLowerCase() : '';
      }).filter(Boolean));
      var formatCandidate = function formatCandidate(index) {
        if (baseLabel) {
          return index === 1 ? "".concat(baseLabel, " (").concat(suffix, ")") : "".concat(baseLabel, " (").concat(suffix, " ").concat(index, ")");
        }
        return index === 1 ? suffix : "".concat(suffix, " ").concat(index);
      };
      var attempt = 1;
      var labelCandidate = formatCandidate(attempt);
      while (existingLabels.has(labelCandidate.trim().toLowerCase())) {
        attempt += 1;
        labelCandidate = formatCandidate(attempt);
      }
      var duplicateRule = {
        id: generateAutoGearId('rule'),
        label: labelCandidate,
        scenarioLogic: normalizeAutoGearScenarioLogic(original.scenarioLogic),
        scenarioPrimary: normalizeAutoGearScenarioPrimary(original.scenarioPrimary),
        scenarioMultiplier: normalizeAutoGearScenarioMultiplier(original.scenarioMultiplier),
        scenarios: Array.isArray(original.scenarios) ? original.scenarios.slice() : [],
        mattebox: Array.isArray(original.mattebox) ? original.mattebox.slice() : [],
        cameraHandle: Array.isArray(original.cameraHandle) ? original.cameraHandle.slice() : [],
        viewfinderExtension: Array.isArray(original.viewfinderExtension) ? original.viewfinderExtension.slice() : [],
        videoDistribution: Array.isArray(original.videoDistribution) ? original.videoDistribution.slice() : [],
        camera: Array.isArray(original.camera) ? original.camera.slice() : [],
        cameraWeight: normalizeAutoGearCameraWeightCondition(original.cameraWeight),
        monitor: Array.isArray(original.monitor) ? original.monitor.slice() : [],
        wireless: Array.isArray(original.wireless) ? original.wireless.slice() : [],
        motors: Array.isArray(original.motors) ? original.motors.slice() : [],
        controllers: Array.isArray(original.controllers) ? original.controllers.slice() : [],
        distance: Array.isArray(original.distance) ? original.distance.slice() : [],
        shootingDays: normalizeAutoGearShootingDaysCondition(original.shootingDays),
        add: Array.isArray(original.add) ? original.add.map(function (item) {
          return _objectSpread(_objectSpread({}, item), {}, {
            id: generateAutoGearId('item')
          });
        }) : [],
        remove: Array.isArray(original.remove) ? original.remove.map(function (item) {
          return _objectSpread(_objectSpread({}, item), {}, {
            id: generateAutoGearId('item')
          });
        }) : []
      };
      openAutoGearEditor(null, {
        initialDraft: duplicateRule,
        highlightLabel: true
      });
    }
    function deleteAutoGearRule(ruleId) {
      var _texts$currentLang57, _texts$en143;
      var rules = getAutoGearRules();
      var index = rules.findIndex(function (rule) {
        return rule.id === ruleId;
      });
      if (index < 0) return;
      var confirmation = ((_texts$currentLang57 = texts[currentLang]) === null || _texts$currentLang57 === void 0 ? void 0 : _texts$currentLang57.autoGearDeleteConfirm) || ((_texts$en143 = texts.en) === null || _texts$en143 === void 0 ? void 0 : _texts$en143.autoGearDeleteConfirm) || 'Delete this rule?';
      if (!window.confirm(confirmation)) return;
      var backupName = ensureAutoBackupBeforeDeletion('delete automatic gear rule');
      if (!backupName) return;
      rules.splice(index, 1);
      setAutoGearRules(rules);
      updateAutoGearCatalogOptions();
      renderAutoGearRulesList();
      if (autoGearEditorDraft && autoGearEditorDraft.id === ruleId) {
        closeAutoGearEditor();
      }
    }
    function normalizeAutoGearPayloadMetadata(candidate) {
      if (!candidate || _typeof(candidate) !== 'object') return null;
      var metadata = {};
      var assignIfString = function assignIfString(key, value) {
        if (typeof value !== 'string') return;
        var trimmed = value.trim();
        if (!trimmed) return;
        if (!Object.prototype.hasOwnProperty.call(metadata, key) || !metadata[key]) {
          metadata[key] = trimmed;
        }
      };
      assignIfString('type', candidate.type);
      assignIfString('version', candidate.version);
      var timestampFields = [['createdAt', 'createdAt'], ['created_at', 'createdAt'], ['created', 'createdAt'], ['timestamp', 'timestamp'], ['exportedAt', 'exportedAt'], ['exported_at', 'exportedAt'], ['savedAt', 'savedAt'], ['saved_at', 'savedAt'], ['updatedAt', 'updatedAt'], ['updated_at', 'updatedAt'], ['modifiedAt', 'updatedAt'], ['modified_at', 'updatedAt']];
      timestampFields.forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          prop = _ref2[0],
          target = _ref2[1];
        if (metadata[target]) return;
        assignIfString(target, candidate[prop]);
      });
      if (!metadata.timestamp) {
        var orderedKeys = ['createdAt', 'timestamp', 'exportedAt', 'savedAt', 'updatedAt'];
        for (var i = 0; i < orderedKeys.length; i += 1) {
          var key = orderedKeys[i];
          if (metadata[key]) {
            metadata.timestamp = metadata[key];
            metadata.timestampSource = key;
            break;
          }
        }
      }
      if (metadata.timestamp && !metadata.timestampSource) {
        metadata.timestampSource = 'timestamp';
      }
      return Object.keys(metadata).length ? metadata : null;
    }
    function collectAutoGearPayloadMetadata() {
      var queue = [];
      var visited = new Set();
      var metadata = {};
      var enqueue = function enqueue(value) {
        if (!value || _typeof(value) !== 'object') return;
        if (visited.has(value)) return;
        visited.add(value);
        queue.push(value);
      };
      for (var _len2 = arguments.length, sources = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        sources[_key2] = arguments[_key2];
      }
      sources.forEach(function (source) {
        return enqueue(source);
      });
      var _loop = function _loop() {
        var candidate = queue.shift();
        var normalized = normalizeAutoGearPayloadMetadata(candidate);
        if (normalized) {
          ['type', 'version', 'createdAt', 'exportedAt', 'savedAt', 'updatedAt', 'timestamp', 'timestampSource'].forEach(function (key) {
            if (!normalized[key]) return;
            if (!Object.prototype.hasOwnProperty.call(metadata, key) || !metadata[key]) {
              metadata[key] = normalized[key];
            }
          });
        }
        if (candidate.meta && _typeof(candidate.meta) === 'object') {
          enqueue(candidate.meta);
        }
        if (candidate.metadata && _typeof(candidate.metadata) === 'object') {
          enqueue(candidate.metadata);
        }
      };
      while (queue.length) {
        _loop();
      }
      return Object.keys(metadata).length ? metadata : null;
    }
    function parseAutoGearImportPayload(data) {
      var extractMonitorDefaults = function extractMonitorDefaults(source) {
        if (!source || _typeof(source) !== 'object') return null;
        if (source.monitorDefaults && _typeof(source.monitorDefaults) === 'object') {
          return source.monitorDefaults;
        }
        if (source.autoGearMonitorDefaults && _typeof(source.autoGearMonitorDefaults) === 'object') {
          return source.autoGearMonitorDefaults;
        }
        return null;
      };
      var _resolveValue = function resolveValue(value) {
        if (typeof value !== 'string') return value;
        var trimmed = value.trim();
        if (!trimmed) return value;
        try {
          var parsed = JSON.parse(trimmed);
          if (parsed === value) return parsed;
          return _resolveValue(parsed);
        } catch (_unused5) {
          return value;
        }
      };
      var visited = new Set();
      var queue = [];
      var enqueue = function enqueue(rawValue, parent, root, key) {
        var value = _resolveValue(rawValue);
        if (!value || _typeof(value) !== 'object') {
          return;
        }
        if (visited.has(value)) {
          return;
        }
        visited.add(value);
        queue.push({
          value: value,
          parent: parent && _typeof(parent) === 'object' ? parent : null,
          root: root && _typeof(root) === 'object' ? root : null,
          key: typeof key === 'string' ? key : ''
        });
      };
      var initialValue = _resolveValue(data);
      if (Array.isArray(initialValue)) {
        var metadata = collectAutoGearPayloadMetadata(initialValue);
        return {
          rules: initialValue,
          monitorDefaults: null,
          metadata: metadata
        };
      }
      if (!initialValue || _typeof(initialValue) !== 'object') {
        return null;
      }
      var initialRoot = !Array.isArray(initialValue) ? initialValue : null;
      enqueue(initialValue, null, initialRoot, '');
      var _loop2 = function _loop2() {
          var _queue$shift = queue.shift(),
            value = _queue$shift.value,
            parent = _queue$shift.parent,
            root = _queue$shift.root,
            key = _queue$shift.key;
          var baseRoot = root || (value && _typeof(value) === 'object' && !Array.isArray(value) ? value : null);
          if (Array.isArray(value)) {
            var treatAsRules = !parent || key === 'rules' || key === 'autoGearRules';
            if (treatAsRules) {
              var monitorDefaults = (parent ? extractMonitorDefaults(parent) : null) || (root ? extractMonitorDefaults(root) : null) || null;
              var _metadata = collectAutoGearPayloadMetadata(parent, value, root, baseRoot);
              return {
                v: {
                  rules: value,
                  monitorDefaults: monitorDefaults,
                  metadata: _metadata
                }
              };
            }
            value.forEach(function (item) {
              if (item && _typeof(item) === 'object') {
                enqueue(item, parent, baseRoot, '');
              }
            });
            return 0;
          }
          if (!value || _typeof(value) !== 'object') {
            return 0;
          }
          var monitorDefaultsFromValue = extractMonitorDefaults(value);
          var monitorDefaultsFromParent = parent ? extractMonitorDefaults(parent) : null;
          var monitorDefaultsFromRoot = root ? extractMonitorDefaults(root) : null;
          var fallbackDefaults = monitorDefaultsFromValue || monitorDefaultsFromParent || monitorDefaultsFromRoot || null;
          var rawAutoGearRules = Object.prototype.hasOwnProperty.call(value, 'autoGearRules') ? _resolveValue(value.autoGearRules) : null;
          if (Array.isArray(rawAutoGearRules)) {
            var _metadata2 = collectAutoGearPayloadMetadata(value, parent, root, baseRoot);
            return {
              v: {
                rules: rawAutoGearRules,
                monitorDefaults: fallbackDefaults,
                metadata: _metadata2
              }
            };
          }
          var rawRules = Object.prototype.hasOwnProperty.call(value, 'rules') ? _resolveValue(value.rules) : null;
          if (Array.isArray(rawRules)) {
            var _metadata3 = collectAutoGearPayloadMetadata(value, parent, root, baseRoot);
            return {
              v: {
                rules: rawRules,
                monitorDefaults: fallbackDefaults,
                metadata: _metadata3
              }
            };
          }
          if (rawRules && _typeof(rawRules) === 'object') {
            var nestedAutoGearRules = Object.prototype.hasOwnProperty.call(rawRules, 'autoGearRules') ? _resolveValue(rawRules.autoGearRules) : null;
            if (Array.isArray(nestedAutoGearRules)) {
              var nestedDefaults = extractMonitorDefaults(rawRules) || fallbackDefaults;
              var _metadata4 = collectAutoGearPayloadMetadata(rawRules, value, parent, root, baseRoot);
              return {
                v: {
                  rules: nestedAutoGearRules,
                  monitorDefaults: nestedDefaults,
                  metadata: _metadata4
                }
              };
            }
          }
          var containerEntries = [{
            value: value.data,
            key: 'data'
          }, {
            value: value.payload,
            key: 'payload'
          }, {
            value: value.bundle,
            key: 'bundle'
          }, {
            value: value.project,
            key: 'project'
          }, {
            value: value.config,
            key: 'config'
          }, {
            value: value.settings,
            key: 'settings'
          }, {
            value: value.content,
            key: 'content'
          }, {
            value: value.body,
            key: 'body'
          }, {
            value: value.autoGear,
            key: 'autoGear'
          }, {
            value: value.rules,
            key: 'rules'
          }, {
            value: value.autoGearRules,
            key: 'autoGearRules'
          }, {
            value: value.meta,
            key: 'meta'
          }, {
            value: value.metadata,
            key: 'metadata'
          }];
          containerEntries.forEach(function (entry) {
            if (!entry.value) return;
            enqueue(entry.value, value, baseRoot, entry.key);
          });
          Object.keys(value).forEach(function (prop) {
            if (!Object.prototype.hasOwnProperty.call(value, prop)) return;
            if (prop === 'monitorDefaults' || prop === 'autoGearMonitorDefaults') return;
            if (prop === 'rules' || prop === 'autoGearRules') return;
            var child = value[prop];
            if (!child || typeof child === 'function') return;
            if (_typeof(child) === 'object') {
              enqueue(child, value, baseRoot, prop);
            } else if (typeof child === 'string') {
              var resolvedChild = _resolveValue(child);
              if (resolvedChild && resolvedChild !== child && _typeof(resolvedChild) === 'object') {
                enqueue(resolvedChild, value, baseRoot, prop);
              }
            }
          });
        },
        _ret;
      while (queue.length) {
        _ret = _loop2();
        if (_ret === 0) continue;
        if (_ret) return _ret.v;
      }
      return null;
    }
    function parseSemanticVersion(version) {
      if (typeof version !== 'string') return null;
      var trimmed = version.trim();
      if (!trimmed) return null;
      var match = trimmed.match(/^(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/);
      if (!match) return null;
      return {
        major: Number.parseInt(match[1], 10),
        minor: Number.parseInt(match[2], 10),
        patch: Number.parseInt(match[3], 10),
        raw: trimmed
      };
    }
    function compareSemanticVersions(a, b) {
      if (!a || !b) return null;
      if (a.major !== b.major) {
        return a.major > b.major ? 1 : -1;
      }
      if (a.minor !== b.minor) {
        return a.minor > b.minor ? 1 : -1;
      }
      if (a.patch !== b.patch) {
        return a.patch > b.patch ? 1 : -1;
      }
      return 0;
    }
    function isValidIsoTimestamp(value) {
      if (typeof value !== 'string') return false;
      var trimmed = value.trim();
      if (!trimmed) return false;
      var parsed = Date.parse(trimmed);
      if (Number.isNaN(parsed)) return false;
      return Number.isFinite(parsed);
    }
    function validateAutoGearImportPayload(parsed) {
      var initialMetadata = parsed !== null && parsed !== void 0 && parsed.metadata && _typeof(parsed.metadata) === 'object' ? _objectSpread({}, parsed.metadata) : {};
      var validation = {
        metadata: initialMetadata,
        warnings: [],
        errors: []
      };
      if (!parsed || !Array.isArray(parsed.rules)) {
        validation.errors.push({
          code: 'invalid-rules'
        });
        return validation;
      }
      var metadata = validation.metadata;
      var expectedType = 'camera-power-planner/auto-gear-rules';
      var typeValue = typeof metadata.type === 'string' ? metadata.type.trim() : '';
      if (!typeValue) {
        validation.warnings.push({
          code: 'missing-metadata',
          field: 'type'
        });
      } else if (typeValue !== expectedType) {
        validation.errors.push({
          code: 'type-mismatch',
          expected: expectedType,
          actual: typeValue
        });
      } else {
        metadata.type = typeValue;
      }
      var versionValue = '';
      if (typeof metadata.version === 'string') {
        versionValue = metadata.version.trim();
        if (!versionValue) {
          validation.warnings.push({
            code: 'missing-metadata',
            field: 'version'
          });
        }
      } else if (metadata.version != null) {
        validation.warnings.push({
          code: 'invalid-metadata',
          field: 'version'
        });
      } else {
        validation.warnings.push({
          code: 'missing-metadata',
          field: 'version'
        });
      }
      var parsedVersion = parseSemanticVersion(versionValue);
      if (versionValue && !parsedVersion) {
        validation.warnings.push({
          code: 'invalid-version-format',
          value: versionValue
        });
      }
      metadata.version = versionValue;
      var timestampValue = typeof metadata.timestamp === 'string' ? metadata.timestamp.trim() : '';
      if (!timestampValue) {
        validation.warnings.push({
          code: 'missing-metadata',
          field: 'timestamp'
        });
      } else if (!isValidIsoTimestamp(timestampValue)) {
        validation.warnings.push({
          code: 'invalid-timestamp',
          value: timestampValue
        });
      }
      metadata.timestamp = timestampValue;
      var localVersion = typeof APP_VERSION === 'string' ? parseSemanticVersion(APP_VERSION) : null;
      if (parsedVersion && localVersion) {
        var comparison = compareSemanticVersions(parsedVersion, localVersion);
        if (comparison > 0) {
          validation.warnings.push({
            code: 'newer-version',
            importedVersion: parsedVersion.raw,
            currentVersion: localVersion.raw
          });
        } else if (comparison < 0) {
          validation.warnings.push({
            code: 'older-version',
            importedVersion: parsedVersion.raw,
            currentVersion: localVersion.raw
          });
        }
      }
      if (!metadata.type && !metadata.version && !metadata.timestamp) {
        validation.metadata = null;
      }
      return validation;
    }
    function getAutoGearImportMetadataFieldLabel(field) {
      var localeTexts = getLanguageTexts(currentLang);
      var englishTexts = getLanguageTexts('en');
      var key = field === 'timestamp' ? 'autoGearImportMetadataLabelTimestamp' : field === 'version' ? 'autoGearImportMetadataLabelVersion' : 'autoGearImportMetadataLabelType';
      return (localeTexts === null || localeTexts === void 0 ? void 0 : localeTexts[key]) || (englishTexts === null || englishTexts === void 0 ? void 0 : englishTexts[key]) || field;
    }
    function formatAutoGearImportWarningMessage(warning, metadata) {
      var localeTexts = getLanguageTexts(currentLang);
      var englishTexts = getLanguageTexts('en');
      switch (warning.code) {
        case 'newer-version':
          {
            var template = (localeTexts === null || localeTexts === void 0 ? void 0 : localeTexts.autoGearImportNewerVersionWarning) || (englishTexts === null || englishTexts === void 0 ? void 0 : englishTexts.autoGearImportNewerVersionWarning) || 'Imported rules were created with version {importVersion}, which is newer than this build ({appVersion}).';
            return template.replace('{importVersion}', warning.importedVersion || (metadata === null || metadata === void 0 ? void 0 : metadata.version) || '').replace('{appVersion}', warning.currentVersion || APP_VERSION || '');
          }
        case 'older-version':
          {
            var _template5 = (localeTexts === null || localeTexts === void 0 ? void 0 : localeTexts.autoGearImportOlderVersionWarning) || (englishTexts === null || englishTexts === void 0 ? void 0 : englishTexts.autoGearImportOlderVersionWarning) || 'Imported rules were created with version {importVersion}, which is older than this build ({appVersion}).';
            return _template5.replace('{importVersion}', warning.importedVersion || (metadata === null || metadata === void 0 ? void 0 : metadata.version) || '').replace('{appVersion}', warning.currentVersion || APP_VERSION || '');
          }
        case 'invalid-version-format':
          {
            var _template6 = (localeTexts === null || localeTexts === void 0 ? void 0 : localeTexts.autoGearImportInvalidVersionWarning) || (englishTexts === null || englishTexts === void 0 ? void 0 : englishTexts.autoGearImportInvalidVersionWarning) || 'Imported rules report version "{value}", which is not a valid semantic version string.';
            return _template6.replace('{value}', warning.value || (metadata === null || metadata === void 0 ? void 0 : metadata.version) || '');
          }
        case 'invalid-timestamp':
          {
            var _template7 = (localeTexts === null || localeTexts === void 0 ? void 0 : localeTexts.autoGearImportInvalidTimestampWarning) || (englishTexts === null || englishTexts === void 0 ? void 0 : englishTexts.autoGearImportInvalidTimestampWarning) || 'The import timestamp "{value}" could not be verified.';
            return _template7.replace('{value}', warning.value || (metadata === null || metadata === void 0 ? void 0 : metadata.timestamp) || '');
          }
        default:
          return '';
      }
    }
    function displayAutoGearImportWarnings(warnings, metadata) {
      if (!Array.isArray(warnings) || !warnings.length) return;
      var missingFields = [];
      var invalidFields = [];
      warnings.forEach(function (warning) {
        if (!warning || _typeof(warning) !== 'object') return;
        if (warning.code === 'missing-metadata' && warning.field) {
          if (!missingFields.includes(warning.field)) {
            missingFields.push(warning.field);
          }
        } else if (warning.code === 'invalid-metadata' && warning.field) {
          if (!invalidFields.includes(warning.field)) {
            invalidFields.push(warning.field);
          }
        } else {
          var message = formatAutoGearImportWarningMessage(warning, metadata);
          if (message) {
            showNotification('warning', message);
          }
        }
      });
      var localeTexts = getLanguageTexts(currentLang);
      var englishTexts = getLanguageTexts('en');
      if (missingFields.length) {
        var labels = missingFields.map(function (field) {
          return getAutoGearImportMetadataFieldLabel(field);
        });
        var labelList = formatListForLang(currentLang, labels);
        var template = (localeTexts === null || localeTexts === void 0 ? void 0 : localeTexts.autoGearImportMissingMetadataWarning) || (englishTexts === null || englishTexts === void 0 ? void 0 : englishTexts.autoGearImportMissingMetadataWarning) || 'Imported rules are missing required metadata: {fields}.';
        showNotification('warning', template.replace('{fields}', labelList));
      }
      if (invalidFields.length) {
        var _labels2 = invalidFields.map(function (field) {
          return getAutoGearImportMetadataFieldLabel(field);
        });
        var _labelList = formatListForLang(currentLang, _labels2);
        var _template8 = (localeTexts === null || localeTexts === void 0 ? void 0 : localeTexts.autoGearImportInvalidMetadataWarning) || (englishTexts === null || englishTexts === void 0 ? void 0 : englishTexts.autoGearImportInvalidMetadataWarning) || 'Imported rules include invalid metadata: {fields}.';
        showNotification('warning', _template8.replace('{fields}', _labelList));
      }
    }
    function importAutoGearRulesFromData(data) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var previousRules = getAutoGearRules();
      var previousMonitorDefaults = getAutoGearMonitorDefaultsSnapshot();
      var parsed = parseAutoGearImportPayload(data);
      if (!parsed || !Array.isArray(parsed.rules)) {
        var _texts$currentLang58, _texts$en144;
        var error = new Error('Invalid automatic gear rules import payload');
        error.userMessage = ((_texts$currentLang58 = texts[currentLang]) === null || _texts$currentLang58 === void 0 ? void 0 : _texts$currentLang58.autoGearImportSchemaError) || ((_texts$en144 = texts.en) === null || _texts$en144 === void 0 ? void 0 : _texts$en144.autoGearImportSchemaError) || 'Import failed. The file does not match the automatic gear rules export format.';
        error.validationWarnings = [];
        error.validationMetadata = null;
        throw error;
      }
      var validation = validateAutoGearImportPayload(parsed);
      if (validation.errors.length) {
        var _texts$currentLang59, _texts$en145;
        var message = ((_texts$currentLang59 = texts[currentLang]) === null || _texts$currentLang59 === void 0 ? void 0 : _texts$currentLang59.autoGearImportSchemaError) || ((_texts$en145 = texts.en) === null || _texts$en145 === void 0 ? void 0 : _texts$en145.autoGearImportSchemaError) || 'Import failed. The file does not match the automatic gear rules export format.';
        var _error = new Error(message);
        _error.userMessage = message;
        _error.validationErrors = validation.errors;
        _error.validationWarnings = validation.warnings;
        _error.validationMetadata = validation.metadata;
        throw _error;
      }
      try {
        setAutoGearRules(parsed.rules);
        if (parsed.monitorDefaults && _typeof(parsed.monitorDefaults) === 'object') {
          setAutoGearMonitorDefaults(parsed.monitorDefaults);
        } else {
          updateAutoGearMonitorDefaultOptions();
          renderAutoGearMonitorDefaultsControls();
        }
        closeAutoGearEditor();
        renderAutoGearRulesList();
        updateAutoGearCatalogOptions();
        if (typeof refreshGearListIfVisible === 'function') {
          refreshGearListIfVisible();
        }
      } catch (error) {
        setAutoGearRules(previousRules);
        setAutoGearMonitorDefaults(previousMonitorDefaults, {
          skipRender: true,
          skipRefresh: true
        });
        renderAutoGearRulesList();
        updateAutoGearCatalogOptions();
        renderAutoGearMonitorDefaultsControls();
        if (typeof refreshGearListIfVisible === 'function') {
          refreshGearListIfVisible();
        }
        throw error;
      }
      if (!options.silent) {
        var _texts$currentLang60, _texts$en146;
        var _message5 = ((_texts$currentLang60 = texts[currentLang]) === null || _texts$currentLang60 === void 0 ? void 0 : _texts$currentLang60.autoGearImportSuccess) || ((_texts$en146 = texts.en) === null || _texts$en146 === void 0 ? void 0 : _texts$en146.autoGearImportSuccess) || 'Automatic gear rules imported.';
        showNotification('success', _message5);
      }
      displayAutoGearImportWarnings(validation.warnings, validation.metadata);
      return getAutoGearRules();
    }
    function formatAutoGearExportFilename(date) {
      var _formatFullBackupFile = formatFullBackupFilename(date),
        iso = _formatFullBackupFile.iso;
      var safeIso = iso.replace(/[:]/g, '-');
      return "".concat(safeIso, " auto gear rules.json");
    }
    function exportAutoGearRules() {
      if (typeof document === 'undefined') return null;
      try {
        var _texts$currentLang61, _texts$en147;
        var rules = getBaseAutoGearRules();
        var monitorDefaults = getAutoGearMonitorDefaultsSnapshot();
        var coverage = getAutoGearRuleCoverageSummary({
          rules: rules
        });
        var payload = {
          type: 'camera-power-planner/auto-gear-rules',
          version: APP_VERSION,
          createdAt: new Date().toISOString(),
          rules: rules,
          monitorDefaults: monitorDefaults
        };
        if (coverage) {
          payload.coverage = coverage;
        }
        var json = JSON.stringify(payload, null, 2);
        if (typeof Blob !== 'function' || !URL || typeof URL.createObjectURL !== 'function') {
          throw new Error('Blob or URL APIs unavailable');
        }
        var blob = new Blob([json], {
          type: 'application/json'
        });
        var url = URL.createObjectURL(blob);
        var anchor = document.createElement('a');
        anchor.href = url;
        var fileName = formatAutoGearExportFilename(new Date());
        anchor.download = fileName;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        if (typeof URL.revokeObjectURL === 'function') {
          URL.revokeObjectURL(url);
        }
        var message = ((_texts$currentLang61 = texts[currentLang]) === null || _texts$currentLang61 === void 0 ? void 0 : _texts$currentLang61.autoGearExportSuccess) || ((_texts$en147 = texts.en) === null || _texts$en147 === void 0 ? void 0 : _texts$en147.autoGearExportSuccess) || 'Automatic gear rules downloaded.';
        showNotification('success', message);
        return fileName;
      } catch (error) {
        var _texts$currentLang62, _texts$en148;
        console.warn('Automatic gear rules export failed', error);
        var _message6 = ((_texts$currentLang62 = texts[currentLang]) === null || _texts$currentLang62 === void 0 ? void 0 : _texts$currentLang62.autoGearExportError) || ((_texts$en148 = texts.en) === null || _texts$en148 === void 0 ? void 0 : _texts$en148.autoGearExportError) || 'Automatic gear rules export failed.';
        showNotification('error', _message6);
        return null;
      }
    }
    function captureAutoGearBackupSnapshot() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var config = _typeof(options) === 'object' && options !== null ? options : {};
      var force = config.force === true;
      var notifySuccess = config.notifySuccess !== false;
      var notifyFailure = config.notifyFailure !== false;
      var note = typeof config.note === 'string' ? config.note.trim() : '';
      if (!force && !autoGearRulesDirtySinceBackup) {
        return {
          status: 'skipped',
          reason: 'clean'
        };
      }
      var rules = getBaseAutoGearRules();
      var monitorDefaultsSnapshot = getAutoGearMonitorDefaultsSnapshot();
      var signature = getAutoGearConfigurationSignature(rules, monitorDefaultsSnapshot);
      if (!force && signature === autoGearRulesLastBackupSignature) {
        autoGearRulesDirtySinceBackup = false;
        return {
          status: 'skipped',
          reason: 'unchanged'
        };
      }
      var entry = {
        id: generateAutoGearId('backup'),
        createdAt: new Date().toISOString(),
        rules: rules,
        monitorDefaults: monitorDefaultsSnapshot
      };
      if (note) {
        entry.note = note;
      }
      var retentionLimit = clampAutoGearBackupRetentionLimit(autoGearBackupRetention);
      var effectiveLimit = Math.max(1, retentionLimit);
      var updatedBackups = [entry].concat(_toConsumableArray(autoGearBackups)).slice(0, effectiveLimit);
      try {
        var persistedBackups = persistAutoGearBackups(updatedBackups) || [];
        var finalBackups = Array.isArray(persistedBackups) ? persistedBackups : [];
        autoGearBackups = finalBackups;
        var persistedEntry = finalBackups[0] || entry;
        var persistedSignature = finalBackups.length ? getAutoGearConfigurationSignature(finalBackups[0].rules, finalBackups[0].monitorDefaults) : signature;
        autoGearRulesLastBackupSignature = persistedSignature;
        autoGearRulesLastPersistedSignature = persistedSignature;
        autoGearRulesDirtySinceBackup = false;
        renderAutoGearBackupControls();
        renderAutoGearBackupRetentionControls();
        if (notifySuccess) {
          var _texts$currentLang63, _texts$en149;
          var message = ((_texts$currentLang63 = texts[currentLang]) === null || _texts$currentLang63 === void 0 ? void 0 : _texts$currentLang63.autoGearBackupSaved) || ((_texts$en149 = texts.en) === null || _texts$en149 === void 0 ? void 0 : _texts$en149.autoGearBackupSaved) || 'Automatic gear backup saved.';
          showNotification('success', message);
        }
        return {
          status: 'created',
          entry: persistedEntry
        };
      } catch (error) {
        console.warn('Automatic gear backup failed', error);
        autoGearRulesDirtySinceBackup = true;
        if (notifyFailure) {
          var _texts$currentLang64, _texts$en150;
          var _message7 = ((_texts$currentLang64 = texts[currentLang]) === null || _texts$currentLang64 === void 0 ? void 0 : _texts$currentLang64.autoGearBackupFailed) || ((_texts$en150 = texts.en) === null || _texts$en150 === void 0 ? void 0 : _texts$en150.autoGearBackupFailed) || 'Automatic gear backup failed.';
          showNotification('error', _message7);
        }
        return {
          status: 'error',
          error: error
        };
      }
    }
    function createAutoGearBackup() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var result = captureAutoGearBackupSnapshot(options);
      return result.status === 'created';
    }
    function restoreAutoGearBackup(backupId) {
      var _texts$currentLang65, _texts$en151;
      if (!backupId) return false;
      var backup = autoGearBackups.find(function (entry) {
        return entry.id === backupId;
      });
      if (!backup) return false;
      var confirmation = ((_texts$currentLang65 = texts[currentLang]) === null || _texts$currentLang65 === void 0 ? void 0 : _texts$currentLang65.autoGearBackupRestoreConfirm) || ((_texts$en151 = texts.en) === null || _texts$en151 === void 0 ? void 0 : _texts$en151.autoGearBackupRestoreConfirm) || 'Replace your automatic gear rules with this backup?';
      if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
        if (!window.confirm(confirmation)) return false;
      }
      try {
        var _texts$currentLang66, _texts$en152;
        setAutoGearRules(Array.isArray(backup.rules) ? backup.rules : []);
        if (backup.monitorDefaults) {
          setAutoGearMonitorDefaults(backup.monitorDefaults, {
            skipRefresh: true
          });
        }
        closeAutoGearEditor();
        renderAutoGearRulesList();
        updateAutoGearCatalogOptions();
        renderAutoGearMonitorDefaultsControls();
        if (typeof refreshGearListIfVisible === 'function') {
          refreshGearListIfVisible();
        }
        autoGearRulesLastBackupSignature = getAutoGearConfigurationSignature(backup.rules, backup.monitorDefaults);
        autoGearRulesLastPersistedSignature = autoGearRulesLastBackupSignature;
        autoGearRulesDirtySinceBackup = false;
        var message = ((_texts$currentLang66 = texts[currentLang]) === null || _texts$currentLang66 === void 0 ? void 0 : _texts$currentLang66.autoGearBackupRestoreSuccess) || ((_texts$en152 = texts.en) === null || _texts$en152 === void 0 ? void 0 : _texts$en152.autoGearBackupRestoreSuccess) || 'Automatic gear backup restored.';
        showNotification('success', message);
        return true;
      } catch (error) {
        var _texts$currentLang67, _texts$en153;
        console.warn('Failed to restore automatic gear backup', error);
        var _message8 = ((_texts$currentLang67 = texts[currentLang]) === null || _texts$currentLang67 === void 0 ? void 0 : _texts$currentLang67.autoGearBackupRestoreError) || ((_texts$en153 = texts.en) === null || _texts$en153 === void 0 ? void 0 : _texts$en153.autoGearBackupRestoreError) || 'Automatic gear backup restore failed.';
        showNotification('error', _message8);
        return false;
      }
    }
    function handleAutoGearImportSelection(event) {
      var _texts$currentLang68, _texts$en154;
      var input = event === null || event === void 0 ? void 0 : event.target;
      var file = input && input.files && input.files[0];
      if (!file) return;
      var confirmation = ((_texts$currentLang68 = texts[currentLang]) === null || _texts$currentLang68 === void 0 ? void 0 : _texts$currentLang68.autoGearImportConfirm) || ((_texts$en154 = texts.en) === null || _texts$en154 === void 0 ? void 0 : _texts$en154.autoGearImportConfirm) || 'Replace your automatic gear rules with the imported file?';
      if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
        if (!window.confirm(confirmation)) {
          if (input) input.value = '';
          return;
        }
      }
      if (typeof FileReader === 'undefined') {
        var _texts$currentLang69, _texts$en155;
        var errorMsg = ((_texts$currentLang69 = texts[currentLang]) === null || _texts$currentLang69 === void 0 ? void 0 : _texts$currentLang69.autoGearImportError) || ((_texts$en155 = texts.en) === null || _texts$en155 === void 0 ? void 0 : _texts$en155.autoGearImportError) || 'Import failed. Please choose a valid automatic gear rules file.';
        showNotification('error', errorMsg);
        if (input) input.value = '';
        return;
      }
      var reader = new FileReader();
      reader.onload = function (e) {
        try {
          var _e$target;
          var text = e === null || e === void 0 || (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.result;
          var parsed = JSON.parse(typeof text === 'string' ? text : '');
          importAutoGearRulesFromData(parsed);
        } catch (error) {
          var _texts$currentLang70, _texts$en156;
          console.warn('Automatic gear rules import failed', error);
          if (Array.isArray(error === null || error === void 0 ? void 0 : error.validationWarnings) && error.validationWarnings.length) {
            displayAutoGearImportWarnings(error.validationWarnings, error.validationMetadata || null);
          }
          var fallbackErrorMsg = ((_texts$currentLang70 = texts[currentLang]) === null || _texts$currentLang70 === void 0 ? void 0 : _texts$currentLang70.autoGearImportError) || ((_texts$en156 = texts.en) === null || _texts$en156 === void 0 ? void 0 : _texts$en156.autoGearImportError) || 'Import failed. Please choose a valid automatic gear rules file.';
          var _errorMsg = typeof (error === null || error === void 0 ? void 0 : error.userMessage) === 'string' && error.userMessage.trim() ? error.userMessage : fallbackErrorMsg;
          showNotification('error', _errorMsg);
        } finally {
          if (input) input.value = '';
        }
      };
      reader.onerror = function () {
        var _texts$currentLang71, _texts$en157;
        var errorMsg = ((_texts$currentLang71 = texts[currentLang]) === null || _texts$currentLang71 === void 0 ? void 0 : _texts$currentLang71.autoGearImportError) || ((_texts$en157 = texts.en) === null || _texts$en157 === void 0 ? void 0 : _texts$en157.autoGearImportError) || 'Import failed. Please choose a valid automatic gear rules file.';
        showNotification('error', errorMsg);
        if (input) input.value = '';
      };
      reader.readAsText(file);
    }
    var lastActiveBeforeIosHelp = null;
    var lastActiveBeforeInstallGuide = null;
    var currentInstallGuidePlatform = null;
    function createLocalHelpModuleFallback() {
      function fallbackResolveStorageKey(explicitKey) {
        if (typeof explicitKey === 'string' && explicitKey) {
          return explicitKey;
        }
        if (typeof IOS_PWA_HELP_STORAGE_KEY === 'string' && IOS_PWA_HELP_STORAGE_KEY) {
          return IOS_PWA_HELP_STORAGE_KEY;
        }
        if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis.IOS_PWA_HELP_STORAGE_KEY === 'string' && globalThis.IOS_PWA_HELP_STORAGE_KEY) {
          return globalThis.IOS_PWA_HELP_STORAGE_KEY;
        }
        if (typeof window !== 'undefined' && window && typeof window.IOS_PWA_HELP_STORAGE_KEY === 'string' && window.IOS_PWA_HELP_STORAGE_KEY) {
          return window.IOS_PWA_HELP_STORAGE_KEY;
        }
        return 'iosPwaHelpShown';
      }
      function fallbackIsIosDevice(navigatorOverride) {
        var nav = navigatorOverride || (typeof navigator !== 'undefined' ? navigator : null);
        if (!nav) {
          return false;
        }
        var ua = nav.userAgent || '';
        var platform = nav.platform || '';
        var hasTouch = typeof nav.maxTouchPoints === 'number' && nav.maxTouchPoints > 1;
        return /iphone|ipad|ipod/i.test(ua) || platform === 'MacIntel' && hasTouch;
      }
      function fallbackIsAndroidDevice(navigatorOverride) {
        var nav = navigatorOverride || (typeof navigator !== 'undefined' ? navigator : null);
        if (!nav) {
          return false;
        }
        var ua = nav.userAgent || '';
        var vendor = nav.vendor || '';
        return /android/i.test(ua) || /android/i.test(vendor);
      }
      function fallbackIsStandaloneDisplayMode(windowOverride, navigatorOverride) {
        var win = windowOverride || (typeof window !== 'undefined' ? window : null);
        var nav = navigatorOverride || (typeof navigator !== 'undefined' ? navigator : null);
        if (!win) {
          return false;
        }
        if (typeof win.matchMedia === 'function') {
          try {
            if (win.matchMedia('(display-mode: standalone)').matches) {
              return true;
            }
          } catch (error) {
            if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
              console.warn('matchMedia display-mode check failed', error);
            }
          }
        }
        if (nav && typeof nav.standalone === 'boolean') {
          return nav.standalone;
        }
        return false;
      }
      function fallbackHasDismissedIosPwaHelp(explicitKey) {
        var storageKey = fallbackResolveStorageKey(explicitKey);
        if (typeof localStorage === 'undefined' || !localStorage || typeof localStorage.getItem !== 'function') {
          return false;
        }
        try {
          return localStorage.getItem(storageKey) === '1';
        } catch (error) {
          if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
            console.warn('Could not read iOS PWA help dismissal flag', error);
          }
          return false;
        }
      }
      function fallbackMarkIosPwaHelpDismissed(explicitKey) {
        var storageKey = fallbackResolveStorageKey(explicitKey);
        if (typeof localStorage === 'undefined' || !localStorage || typeof localStorage.setItem !== 'function') {
          return;
        }
        try {
          localStorage.setItem(storageKey, '1');
        } catch (error) {
          if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
            console.warn('Could not store iOS PWA help dismissal', error);
          }
        }
      }
      function fallbackShouldShow(resolveDialog) {
        var dialog = typeof resolveDialog === 'function' ? resolveDialog() : resolveDialog || null;
        if (!dialog) {
          return false;
        }
        if (!fallbackIsIosDevice()) {
          return false;
        }
        if (!fallbackIsStandaloneDisplayMode()) {
          return false;
        }
        if (fallbackHasDismissedIosPwaHelp()) {
          return false;
        }
        return true;
      }
      return {
        resolveIosPwaHelpStorageKey: fallbackResolveStorageKey,
        isIosDevice: fallbackIsIosDevice,
        isAndroidDevice: fallbackIsAndroidDevice,
        isStandaloneDisplayMode: fallbackIsStandaloneDisplayMode,
        hasDismissedIosPwaHelp: fallbackHasDismissedIosPwaHelp,
        markIosPwaHelpDismissed: fallbackMarkIosPwaHelpDismissed,
        shouldShowIosPwaHelp: fallbackShouldShow
      };
    }
    var helpModuleApi = function () {
      if (typeof resolveHelpModuleApi === 'function') {
        try {
          return resolveHelpModuleApi();
        } catch (error) {
          if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
            console.warn('resolveHelpModuleApi() failed in part 2', error);
          }
        }
      }
      var fallback = createLocalHelpModuleFallback();
      try {
        var globalScope = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : null;
        if (globalScope && !globalScope.__cineResolvedHelpModule) {
          globalScope.__cineResolvedHelpModule = fallback;
        }
      } catch (error) {
        void error;
      }
      return fallback;
    }();
    var FEATURE_SEARCH_MODULE_CACHE_KEY = '__cineResolvedFeatureSearchModule';
    function createFeatureSearchFallback() {
      return {
        normalizeSearchValue: function normalizeSearchValue(value) {
          return typeof value === 'string' ? value.trim().toLowerCase() : '';
        },
        sanitizeHighlightTokens: function sanitizeHighlightTokens(tokens) {
          if (!Array.isArray(tokens) || !tokens.length) {
            return [];
          }
          var sanitized = [];
          for (var index = 0; index < tokens.length; index += 1) {
            var token = tokens[index];
            if (typeof token !== 'string') {
              continue;
            }
            var normalized = token.trim().toLowerCase();
            if (!normalized) {
              continue;
            }
            if (sanitized.indexOf(normalized) === -1) {
              sanitized.push(normalized);
            }
          }
          return sanitized;
        },
        collectHighlightRanges: function collectHighlightRanges() {
          return [];
        },
        applyHighlight: function applyHighlight(element, text) {
          if (!element) {
            return;
          }
          var content = typeof text === 'string' ? text : '';
          element.textContent = content;
        },
        normalizeDetail: function normalizeDetail(text) {
          return typeof text === 'string' ? text.trim() : '';
        }
      };
    }
    function resolveFeatureSearchModuleApi() {
      var globalScope = typeof getCoreGlobalObject === 'function' ? getCoreGlobalObject() : typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : null;
      if (globalScope && globalScope[FEATURE_SEARCH_MODULE_CACHE_KEY]) {
        return globalScope[FEATURE_SEARCH_MODULE_CACHE_KEY];
      }
      var moduleBase = (typeof cineModuleBase === "undefined" ? "undefined" : _typeof(cineModuleBase)) === 'object' && cineModuleBase || (globalScope && _typeof(globalScope.cineModuleBase) === 'object' ? globalScope.cineModuleBase : null);
      function logModuleWarning(message, error) {
        if (moduleBase && typeof moduleBase.safeWarn === 'function') {
          try {
            moduleBase.safeWarn(message, error);
            return;
          } catch (warnError) {
            void warnError;
          }
        }
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          try {
            if (typeof error === 'undefined') {
              console.warn(message);
            } else {
              console.warn(message, error);
            }
          } catch (consoleError) {
            void consoleError;
          }
        }
      }
      var candidates = [];
      if (moduleBase && typeof moduleBase.getModuleRegistry === 'function') {
        var registry = null;
        try {
          registry = moduleBase.getModuleRegistry(globalScope);
        } catch (error) {
          logModuleWarning('Unable to resolve cine.features.featureSearch module registry.', error);
        }
        if (registry && typeof registry.get === 'function') {
          try {
            var fromRegistry = registry.get('cine.features.featureSearch');
            if (fromRegistry && candidates.indexOf(fromRegistry) === -1) {
              candidates.push(fromRegistry);
            }
          } catch (error) {
            logModuleWarning('Unable to read cine.features.featureSearch module.', error);
          }
        }
      }
      var scopeCandidates = [];
      if (globalScope && scopeCandidates.indexOf(globalScope) === -1) {
        scopeCandidates.push(globalScope);
      }
      if (typeof globalThis !== 'undefined' && scopeCandidates.indexOf(globalThis) === -1) {
        scopeCandidates.push(globalThis);
      }
      if (typeof window !== 'undefined' && scopeCandidates.indexOf(window) === -1) {
        scopeCandidates.push(window);
      }
      if (typeof self !== 'undefined' && scopeCandidates.indexOf(self) === -1) {
        scopeCandidates.push(self);
      }
      if (typeof global !== 'undefined' && scopeCandidates.indexOf(global) === -1) {
        scopeCandidates.push(global);
      }
      for (var index = 0; index < scopeCandidates.length; index += 1) {
        var scope = scopeCandidates[index];
        if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
          continue;
        }
        try {
          var exposed = scope.cineFeaturesFeatureSearch;
          if (exposed && candidates.indexOf(exposed) === -1) {
            candidates.push(exposed);
          }
        } catch (error) {
          void error;
        }
      }
      var resolvedApi = null;
      for (var _index2 = 0; _index2 < candidates.length; _index2 += 1) {
        var candidate = candidates[_index2];
        if (candidate && _typeof(candidate) === 'object' && typeof candidate.normalizeSearchValue === 'function') {
          resolvedApi = candidate;
          break;
        }
      }
      var api = resolvedApi || createFeatureSearchFallback();
      if (globalScope) {
        try {
          globalScope[FEATURE_SEARCH_MODULE_CACHE_KEY] = api;
        } catch (error) {
          void error;
        }
      }
      return api;
    }
    var featureSearchModuleApi = resolveFeatureSearchModuleApi();
    var fallbackFeatureSearchModuleApi = createFeatureSearchFallback();
    function isIosDevice() {
      try {
        if (helpModuleApi && typeof helpModuleApi.isIosDevice === 'function') {
          return Boolean(helpModuleApi.isIosDevice());
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('isIosDevice() failed', error);
        }
      }
      return false;
    }
    function isAndroidDevice() {
      try {
        if (helpModuleApi && typeof helpModuleApi.isAndroidDevice === 'function') {
          return Boolean(helpModuleApi.isAndroidDevice());
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('isAndroidDevice() failed', error);
        }
      }
      return false;
    }
    function isStandaloneDisplayMode() {
      try {
        if (helpModuleApi && typeof helpModuleApi.isStandaloneDisplayMode === 'function') {
          return Boolean(helpModuleApi.isStandaloneDisplayMode());
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('isStandaloneDisplayMode() failed', error);
        }
      }
      return false;
    }
    function hasDismissedIosPwaHelp() {
      try {
        if (helpModuleApi && typeof helpModuleApi.hasDismissedIosPwaHelp === 'function') {
          return Boolean(helpModuleApi.hasDismissedIosPwaHelp());
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('hasDismissedIosPwaHelp() failed', error);
        }
      }
      return false;
    }
    function markIosPwaHelpDismissed() {
      try {
        if (helpModuleApi && typeof helpModuleApi.markIosPwaHelpDismissed === 'function') {
          helpModuleApi.markIosPwaHelpDismissed();
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('markIosPwaHelpDismissed() failed', error);
        }
      }
    }
    function getInstallBannerGlobalScope() {
      var candidates = [];
      if (typeof resolveInstallBannerGlobalScope === 'function') {
        try {
          var resolved = resolveInstallBannerGlobalScope();
          if (resolved) {
            candidates.push(resolved);
          }
        } catch (error) {
          console.warn('Failed to resolve shared install banner scope', error);
        }
      }
      var runtimeScopes = getCoreRuntimeScopesSnapshot();
      for (var index = 0; index < runtimeScopes.length; index += 1) {
        var scope = runtimeScopes[index];
        if (scope && _typeof(scope) === 'object') {
          candidates.push(scope);
        }
      }
      if (typeof globalThis !== 'undefined' && globalThis && !candidates.includes(globalThis)) {
        candidates.push(globalThis);
      }
      if (typeof window !== 'undefined' && window && !candidates.includes(window)) {
        candidates.push(window);
      }
      if (typeof self !== 'undefined' && self && !candidates.includes(self)) {
        candidates.push(self);
      }
      if (typeof global !== 'undefined' && global && !candidates.includes(global)) {
        candidates.push(global);
      }
      for (var _index3 = 0; _index3 < candidates.length; _index3 += 1) {
        var candidate = candidates[_index3];
        if (candidate && _typeof(candidate) === 'object') {
          return candidate;
        }
      }
      return null;
    }
    function getInstallBannerDismissedInSession() {
      var scope = getInstallBannerGlobalScope();
      if (!scope) {
        return false;
      }
      if (typeof scope.installBannerDismissedInSession !== 'boolean') {
        scope.installBannerDismissedInSession = false;
        return false;
      }
      return scope.installBannerDismissedInSession;
    }
    function setInstallBannerDismissedInSession(value) {
      var scope = getInstallBannerGlobalScope();
      if (!scope) {
        return;
      }
      scope.installBannerDismissedInSession = Boolean(value);
    }
    function hasDismissedInstallBanner() {
      if (getInstallBannerDismissedInSession()) return true;
      if (typeof localStorage === 'undefined') return false;
      try {
        var storedValue = localStorage.getItem(INSTALL_BANNER_DISMISSED_KEY);
        var dismissed = storedValue === '1';
        if (dismissed) {
          setInstallBannerDismissedInSession(true);
        }
        return dismissed;
      } catch (error) {
        console.warn('Could not read install banner dismissal flag', error);
        return getInstallBannerDismissedInSession();
      }
    }
    function markInstallBannerDismissed() {
      setInstallBannerDismissedInSession(true);
      if (typeof localStorage === 'undefined') return;
      try {
        localStorage.setItem(INSTALL_BANNER_DISMISSED_KEY, '1');
      } catch (error) {
        console.warn('Could not store install banner dismissal', error);
      }
    }
    function shouldShowInstallBanner() {
      if (!installPromptBanner) return false;
      if (isStandaloneDisplayMode()) return false;
      if (hasDismissedInstallBanner()) return false;
      return isIosDevice() || isAndroidDevice();
    }
    function updateInstallBannerVisibility() {
      if (!installPromptBanner) return;
      var shouldShow = shouldShowInstallBanner();
      var root = typeof document !== 'undefined' ? document.documentElement : null;
      if (root && typeof root.classList !== 'undefined') {
        root.classList.toggle('install-banner-visible', shouldShow);
      }
      if (shouldShow) {
        installPromptBanner.removeAttribute('hidden');
        updateInstallBannerColors();
        updateInstallBannerPosition();
      } else {
        installPromptBanner.setAttribute('hidden', '');
        setInstallBannerOffset(0);
        installPromptBanner.style.removeProperty('top');
      }
    }
    function updateInstallBannerColors() {
      if (!installPromptBanner) return;
      if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
        return;
      }
      try {
        var root = document.documentElement;
        if (!root) return;
        var computed = window.getComputedStyle(root);
        var accentValue = computed.getPropertyValue('--accent-color').trim();
        if (!accentValue) {
          installPromptBanner.style.removeProperty('--install-banner-text-color');
          return;
        }
        var rgb = parseColorToRgb(accentValue);
        if (!rgb) return;
        var luminance = computeRelativeLuminance(rgb);
        var textColor = luminance > 0.55 ? '#000000' : '#ffffff';
        installPromptBanner.style.setProperty('--install-banner-text-color', textColor);
      } catch (error) {
        console.warn('Unable to update install banner colors', error);
      }
    }
    function renderInstallGuideContent(platform) {
      var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currentLang;
      if (!installGuideDialog) return;
      var fallbackTexts = texts.en || {};
      var langTexts = texts[lang] || fallbackTexts;
      var isIos = platform === 'ios';
      var titleKey = isIos ? 'installHelpTitleIos' : 'installHelpTitleAndroid';
      var introKey = isIos ? 'installHelpIntroIos' : 'installHelpIntroAndroid';
      var stepsKey = isIos ? 'installHelpStepsIos' : 'installHelpStepsAndroid';
      var noteKey = isIos ? 'installHelpNoteIos' : 'installHelpNoteAndroid';
      var title = langTexts[titleKey] || fallbackTexts[titleKey] || '';
      if (installGuideTitle) installGuideTitle.textContent = title;
      var intro = langTexts[introKey] || fallbackTexts[introKey] || '';
      if (installGuideIntro) installGuideIntro.textContent = intro;
      var stepsSource = langTexts[stepsKey];
      var fallbackStepsSource = fallbackTexts[stepsKey];
      var toArray = function toArray(value) {
        if (!value) return [];
        return Array.isArray(value) ? value : [value];
      };
      var steps = toArray(stepsSource);
      var fallbackSteps = toArray(fallbackStepsSource);
      var effectiveSteps = steps.length ? steps : fallbackSteps;
      if (installGuideSteps) {
        installGuideSteps.textContent = '';
        effectiveSteps.forEach(function (step) {
          if (!step) return;
          var li = document.createElement('li');
          li.textContent = step;
          installGuideSteps.appendChild(li);
        });
      }
      var note = langTexts[noteKey] || fallbackTexts[noteKey] || '';
      if (installGuideNote) installGuideNote.textContent = note;
      if (installGuideDialog) {
        installGuideDialog.setAttribute('data-platform', platform);
      }
      if (!installGuideMigration || !installGuideMigrationTitle || !installGuideMigrationIntro || !installGuideMigrationSteps || !installGuideMigrationNote) {
        return;
      }
      if (isIos) {
        installGuideMigration.removeAttribute('hidden');
        var migrationTitle = langTexts.installHelpMigrationTitle || fallbackTexts.installHelpMigrationTitle || '';
        installGuideMigrationTitle.textContent = migrationTitle;
        var migrationIntro = langTexts.iosPwaHelpIntro || fallbackTexts.iosPwaHelpIntro || '';
        installGuideMigrationIntro.textContent = migrationIntro;
        var migrationSteps = [langTexts.iosPwaHelpStep1 || fallbackTexts.iosPwaHelpStep1, langTexts.iosPwaHelpStep2 || fallbackTexts.iosPwaHelpStep2, langTexts.iosPwaHelpStep3 || fallbackTexts.iosPwaHelpStep3, langTexts.iosPwaHelpStep4 || fallbackTexts.iosPwaHelpStep4].filter(Boolean);
        installGuideMigrationSteps.textContent = '';
        migrationSteps.forEach(function (step) {
          var li = document.createElement('li');
          li.textContent = step;
          installGuideMigrationSteps.appendChild(li);
        });
        var migrationNote = langTexts.iosPwaHelpNote || fallbackTexts.iosPwaHelpNote || '';
        installGuideMigrationNote.textContent = migrationNote;
      } else {
        installGuideMigration.setAttribute('hidden', '');
        installGuideMigrationTitle.textContent = '';
        installGuideMigrationIntro.textContent = '';
        installGuideMigrationSteps.textContent = '';
        installGuideMigrationNote.textContent = '';
      }
    }
    function openInstallGuide(platform) {
      if (!installGuideDialog) return;
      currentInstallGuidePlatform = platform;
      lastActiveBeforeInstallGuide = document.activeElement;
      renderInstallGuideContent(platform);
      installGuideDialog.removeAttribute('hidden');
      var focusTarget = installGuideClose || installGuideDialog.querySelector('button, [href], [tabindex]:not([tabindex="-1"])');
      if (focusTarget && typeof focusTarget.focus === 'function') {
        focusTarget.focus();
      }
    }
    function closeInstallGuide() {
      if (!installGuideDialog) return;
      installGuideDialog.setAttribute('hidden', '');
      currentInstallGuidePlatform = null;
      if (lastActiveBeforeInstallGuide && typeof lastActiveBeforeInstallGuide.focus === 'function') {
        lastActiveBeforeInstallGuide.focus();
      }
    }
    function setupInstallBanner() {
      if (!installPromptBanner) return;
      if (installPromptBannerIcon) {
        applyIconGlyph(installPromptBannerIcon, ICON_GLYPHS.installApp);
      }
      if (installPromptBannerAction) {
        installPromptBannerAction.addEventListener('click', function (event) {
          event.preventDefault();
          var platform = isIosDevice() ? 'ios' : 'android';
          openInstallGuide(platform);
        });
      }
      if (installPromptBannerDismiss) {
        installPromptBannerDismiss.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
          markInstallBannerDismissed();
          updateInstallBannerVisibility();
        });
      }
      if (installGuideClose) {
        installGuideClose.addEventListener('click', closeInstallGuide);
      }
      if (installGuideDialog) {
        installGuideDialog.addEventListener('click', function (event) {
          if (event.target === installGuideDialog) {
            closeInstallGuide();
          }
        });
      }
      applyInstallTexts(currentLang);
      updateInstallBannerColors();
      updateInstallBannerVisibility();
      updateInstallBannerPosition();
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', updateInstallBannerPosition);
        window.addEventListener('appinstalled', updateInstallBannerVisibility);
        if (typeof window.matchMedia === 'function') {
          try {
            var media = window.matchMedia('(display-mode: standalone)');
            var handleChange = function handleChange() {
              return updateInstallBannerVisibility();
            };
            if (typeof media.addEventListener === 'function') {
              media.addEventListener('change', handleChange);
            } else if (typeof media.addListener === 'function') {
              media.addListener(handleChange);
            }
          } catch (error) {
            console.warn('matchMedia display-mode listener failed', error);
          }
        }
      }
    }
    function applyInstallTexts(lang) {
      var fallbackTexts = texts.en || {};
      var langTexts = texts[lang] || fallbackTexts;
      var bannerText = langTexts.installBannerText || fallbackTexts.installBannerText;
      if (installPromptBannerText && bannerText) {
        installPromptBannerText.textContent = bannerText;
      }
      if (installPromptBanner) {
        if (bannerText) {
          installPromptBanner.setAttribute('aria-label', bannerText);
          installPromptBanner.setAttribute('title', bannerText);
        } else {
          installPromptBanner.removeAttribute('aria-label');
          installPromptBanner.removeAttribute('title');
        }
      }
      if (installPromptBannerAction) {
        if (bannerText) {
          installPromptBannerAction.setAttribute('aria-label', bannerText);
          installPromptBannerAction.setAttribute('title', bannerText);
        } else {
          installPromptBannerAction.removeAttribute('aria-label');
          installPromptBannerAction.removeAttribute('title');
        }
      }
      var closeLabel = langTexts.installHelpClose || fallbackTexts.installHelpClose;
      var dismissLabel = langTexts.installBannerDismiss || fallbackTexts.installBannerDismiss || closeLabel || '';
      if (installPromptBannerDismiss) {
        var labelText = dismissLabel || '';
        setButtonLabelWithIcon(installPromptBannerDismiss, '', ICON_GLYPHS.circleX);
        if (labelText) {
          installPromptBannerDismiss.setAttribute('aria-label', labelText);
          installPromptBannerDismiss.setAttribute('title', labelText);
          var hiddenLabel = document.createElement('span');
          hiddenLabel.className = 'visually-hidden';
          hiddenLabel.textContent = labelText;
          installPromptBannerDismiss.appendChild(hiddenLabel);
        } else {
          installPromptBannerDismiss.removeAttribute('aria-label');
          installPromptBannerDismiss.removeAttribute('title');
        }
      }
      if (installGuideClose && closeLabel) {
        setButtonLabelWithIcon(installGuideClose, closeLabel, ICON_GLYPHS.circleX);
        installGuideClose.setAttribute('aria-label', closeLabel);
        installGuideClose.setAttribute('title', closeLabel);
      }
      if (installGuideDialog && !installGuideDialog.hasAttribute('hidden') && currentInstallGuidePlatform) {
        renderInstallGuideContent(currentInstallGuidePlatform, lang);
      }
      updateInstallBannerPosition();
    }
    function resolveGlobalElement(name, elementId) {
      if (typeof name !== 'string' || !name) {
        return null;
      }
      var assignResolved = function assignResolved(element) {
        if (!element || _typeof(element) !== 'object') {
          return null;
        }
        try {
          CORE_PART2_RUNTIME_SCOPE[name] = element;
        } catch (assignError) {
          void assignError;
        }
        return element;
      };
      var globalValue = readGlobalScopeValue(name);
      if (globalValue && _typeof(globalValue) === 'object') {
        var resolved = assignResolved(globalValue);
        if (resolved) {
          return resolved;
        }
      }
      if (typeof document !== 'undefined' && document && typeof document.getElementById === 'function') {
        try {
          var lookupId = typeof elementId === 'string' && elementId ? elementId : name;
          var fallback = document.getElementById(lookupId);
          if (fallback && _typeof(fallback) === 'object') {
            var _resolved = assignResolved(fallback);
            if (_resolved) {
              return _resolved;
            }
          }
        } catch (lookupError) {
          void lookupError;
        }
      }
      return null;
    }
    function resolveIosPwaHelpDialog() {
      return resolveGlobalElement('iosPwaHelpDialog', 'iosPwaHelpDialog');
    }
    function resolveIosPwaHelpClose() {
      return resolveGlobalElement('iosPwaHelpClose', 'iosPwaHelpClose');
    }
    var safeExposeCoreRuntimeConstant = typeof exposeCoreRuntimeConstant === 'function' ? exposeCoreRuntimeConstant : function noopExposeCoreRuntimeConstant() {};
    function shouldShowIosPwaHelp() {
      try {
        if (helpModuleApi && typeof helpModuleApi.shouldShowIosPwaHelp === 'function') {
          return Boolean(helpModuleApi.shouldShowIosPwaHelp(resolveIosPwaHelpDialog));
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('shouldShowIosPwaHelp() failed', error);
        }
      }
      return false;
    }
    function openIosPwaHelp() {
      var dialog = resolveIosPwaHelpDialog();
      if (!dialog) return;
      if (!shouldShowIosPwaHelp()) return;
      lastActiveBeforeIosHelp = document.activeElement;
      dialog.removeAttribute('hidden');
      var closeButton = resolveIosPwaHelpClose();
      var focusTarget = closeButton || dialog.querySelector('button, [href], [tabindex]:not([tabindex="-1"])');
      if (focusTarget && typeof focusTarget.focus === 'function') {
        focusTarget.focus();
      }
    }
    function closeIosPwaHelp() {
      var storeDismissal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var dialog = resolveIosPwaHelpDialog();
      if (!dialog) return;
      dialog.setAttribute('hidden', '');
      if (storeDismissal) {
        markIosPwaHelpDismissed();
      }
      if (lastActiveBeforeIosHelp && typeof lastActiveBeforeIosHelp.focus === 'function') {
        lastActiveBeforeIosHelp.focus();
      }
    }
    function maybeShowIosPwaHelp() {
      openIosPwaHelp();
    }
    var iosPwaHelpCloseButton = resolveIosPwaHelpClose();
    if (iosPwaHelpCloseButton) {
      iosPwaHelpCloseButton.addEventListener('click', function () {
        return closeIosPwaHelp(true);
      });
    }
    var iosPwaHelpDialogElement = resolveIosPwaHelpDialog();
    if (iosPwaHelpDialogElement) {
      iosPwaHelpDialogElement.addEventListener('click', function (event) {
        if (event.target === iosPwaHelpDialogElement) {
          closeIosPwaHelp(true);
        }
      });
    }
    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape' && event.key !== 'Esc') return;
      var handled = false;
      var activeIosDialog = resolveIosPwaHelpDialog();
      if (activeIosDialog && !activeIosDialog.hasAttribute('hidden')) {
        closeIosPwaHelp(true);
        handled = true;
      }
      if (installGuideDialog && !installGuideDialog.hasAttribute('hidden')) {
        closeInstallGuide();
        handled = true;
      }
      if (handled) {
        event.preventDefault();
      }
    });
    function renderSettingsLogoPreview(dataUrl) {
      if (!settingsLogoPreview) return;
      if (dataUrl) {
        settingsLogoPreview.textContent = '';
        var img = document.createElement('img');
        img.src = dataUrl;
        img.alt = '';
        settingsLogoPreview.appendChild(img);
        settingsLogoPreview.removeAttribute('hidden');
      } else {
        settingsLogoPreview.textContent = '';
        settingsLogoPreview.setAttribute('hidden', '');
      }
    }
    function loadStoredLogoPreview() {
      if (!settingsLogoPreview || typeof localStorage === 'undefined') return;
      var stored = null;
      try {
        stored = localStorage.getItem('customLogo');
      } catch (e) {
        console.warn('Could not load custom logo preview', e);
      }
      renderSettingsLogoPreview(stored);
    }
    var isPlainObjectValue = function isPlainObjectValue(val) {
      return val !== null && _typeof(val) === 'object' && !Array.isArray(val);
    };
    var REQUIRED_DEVICE_CATEGORIES = ['cameras', 'monitors', 'video', 'viewfinders', 'directorMonitors', 'iosVideo', 'videoAssist', 'media', 'lenses', 'fiz', 'batteries', 'batteryHotswaps', 'wirelessReceivers', 'accessories'];
    var DEFAULT_FIZ_COLLECTIONS = ['motors', 'handUnits', 'controllers', 'distance'];
    var DEFAULT_ACCESSORY_COLLECTIONS = ['chargers', 'cages', 'powerPlates', 'cameraSupport', 'matteboxes', 'filters', 'rigging', 'batteries', 'cables', 'videoAssist', 'media', 'tripodHeads', 'tripods', 'sliders', 'cameraStabiliser', 'grip', 'carts'];
    var MAX_DEVICE_IMPORT_ERRORS = 5;
    function isDeviceEntryObject(value) {
      if (!isPlainObjectValue(value)) {
        return false;
      }
      return Object.values(value).some(function (entry) {
        return entry === null || _typeof(entry) !== 'object' || Array.isArray(entry);
      });
    }
    function countDeviceDatabaseEntries(collection) {
      if (!isPlainObjectValue(collection)) {
        return 0;
      }
      var total = 0;
      for (var _i = 0, _Object$entries = Object.entries(collection); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          name = _Object$entries$_i[0],
          value = _Object$entries$_i[1];
        if (name === 'filterOptions' || name === 'None') {
          continue;
        }
        if (!isPlainObjectValue(value)) {
          continue;
        }
        if (isDeviceEntryObject(value)) {
          total += 1;
        } else {
          total += countDeviceDatabaseEntries(value);
        }
      }
      return total;
    }
    function looksLikeDeviceDatabase(candidate) {
      if (!isPlainObjectValue(candidate)) {
        return false;
      }
      var matched = 0;
      var _iterator2 = _createForOfIteratorHelper(REQUIRED_DEVICE_CATEGORIES),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var key = _step2.value;
          if (Object.prototype.hasOwnProperty.call(candidate, key)) {
            matched += 1;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return matched >= 3;
    }
    function collectReferenceFizKeys() {
      var reference = typeof globalThis !== 'undefined' && isPlainObjectValue(globalThis.defaultDevices) ? globalThis.defaultDevices : typeof globalThis !== 'undefined' && isPlainObjectValue(globalThis.devices) ? globalThis.devices : null;
      if (reference && isPlainObjectValue(reference.fiz)) {
        var keys = Object.keys(reference.fiz).filter(Boolean);
        if (keys.length) {
          return keys;
        }
      }
      return DEFAULT_FIZ_COLLECTIONS;
    }
    function collectReferenceAccessoryKeys() {
      var reference = typeof globalThis !== 'undefined' && isPlainObjectValue(globalThis.defaultDevices) ? globalThis.defaultDevices : typeof globalThis !== 'undefined' && isPlainObjectValue(globalThis.devices) ? globalThis.devices : null;
      if (reference && isPlainObjectValue(reference.accessories)) {
        var keys = Object.keys(reference.accessories).filter(Boolean);
        if (keys.length) {
          return keys;
        }
      }
      return DEFAULT_ACCESSORY_COLLECTIONS;
    }
    function validateDeviceDatabaseStructure(candidate) {
      if (!isPlainObjectValue(candidate)) {
        return {
          devices: null,
          errors: ['Imported data must be a JSON object.']
        };
      }
      var errors = [];
      var missing = [];
      var _iterator3 = _createForOfIteratorHelper(REQUIRED_DEVICE_CATEGORIES),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var category = _step3.value;
          if (category === 'fiz') {
            if (!isPlainObjectValue(candidate.fiz)) {
              missing.push('fiz');
              continue;
            }
            var expectedFizKeys = collectReferenceFizKeys();
            var missingFiz = expectedFizKeys.filter(function (key) {
              return !isPlainObjectValue(candidate.fiz[key]);
            });
            if (missingFiz.length) {
              errors.push("Missing FIZ categories: ".concat(missingFiz.join(', ')));
            }
            continue;
          }
          if (category === 'accessories') {
            if (!isPlainObjectValue(candidate.accessories)) {
              missing.push('accessories');
              continue;
            }
            var expectedAccessoryKeys = collectReferenceAccessoryKeys();
            var missingAccessories = expectedAccessoryKeys.filter(function (key) {
              return !isPlainObjectValue(candidate.accessories[key]);
            });
            if (missingAccessories.length) {
              errors.push("Missing accessory categories: ".concat(missingAccessories.join(', ')));
            }
            continue;
          }
          if (!isPlainObjectValue(candidate[category])) {
            missing.push(category);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      if (missing.length) {
        errors.push("Missing categories: ".concat(missing.join(', ')));
      }
      if (candidate.accessories !== undefined) {
        if (!isPlainObjectValue(candidate.accessories)) {
          errors.push('Accessory collections must be objects.');
        } else {
          for (var _i2 = 0, _Object$entries2 = Object.entries(candidate.accessories); _i2 < _Object$entries2.length; _i2++) {
            var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
              subKey = _Object$entries2$_i[0],
              subValue = _Object$entries2$_i[1];
            if (!isPlainObjectValue(subValue)) {
              errors.push("Accessory category \"".concat(subKey, "\" must be an object."));
            }
          }
        }
      }
      if (candidate.filterOptions !== undefined && !Array.isArray(candidate.filterOptions)) {
        errors.push('Filter options must be provided as an array.');
      }
      if (candidate.fiz && isPlainObjectValue(candidate.fiz)) {
        for (var _i3 = 0, _Object$entries3 = Object.entries(candidate.fiz); _i3 < _Object$entries3.length; _i3++) {
          var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
            _subKey = _Object$entries3$_i[0],
            _subValue = _Object$entries3$_i[1];
          if (_subValue !== undefined && !isPlainObjectValue(_subValue)) {
            errors.push("FIZ category \"".concat(_subKey, "\" must be an object."));
          }
        }
      }
      var structureErrors = [];
      var _inspectCollections = function inspectCollections(collection) {
        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        if (!isPlainObjectValue(collection)) {
          return;
        }
        for (var _i4 = 0, _Object$entries4 = Object.entries(collection); _i4 < _Object$entries4.length; _i4++) {
          var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i4], 2),
            name = _Object$entries4$_i[0],
            value = _Object$entries4$_i[1];
          if (name === 'None' || name === 'filterOptions') {
            continue;
          }
          var nextPath = path.concat(name);
          if (!isPlainObjectValue(value)) {
            if (!Array.isArray(value)) {
              structureErrors.push("".concat(nextPath.join('.'), " must be an object."));
            }
          } else if (!isDeviceEntryObject(value)) {
            _inspectCollections(value, nextPath);
          }
          if (structureErrors.length >= MAX_DEVICE_IMPORT_ERRORS) {
            return;
          }
        }
      };
      _inspectCollections(candidate);
      errors.push.apply(errors, structureErrors);
      var deviceCount = countDeviceDatabaseEntries(candidate);
      if (!deviceCount) {
        errors.push('The imported database does not contain any devices.');
      }
      var uniqueErrors = [];
      for (var _i5 = 0, _errors = errors; _i5 < _errors.length; _i5++) {
        var message = _errors[_i5];
        if (message && !uniqueErrors.includes(message)) {
          uniqueErrors.push(message);
        }
        if (uniqueErrors.length >= MAX_DEVICE_IMPORT_ERRORS) {
          break;
        }
      }
      return {
        devices: uniqueErrors.length ? null : candidate,
        errors: uniqueErrors
      };
    }
    function parseDeviceDatabaseImport(rawData) {
      if (Array.isArray(rawData)) {
        return {
          devices: null,
          errors: ['Import file must contain a JSON object, but found an array.']
        };
      }
      if (!isPlainObjectValue(rawData)) {
        return {
          devices: null,
          errors: ['Import file must contain a JSON object.']
        };
      }
      if (Object.prototype.hasOwnProperty.call(rawData, 'devices') && !isPlainObjectValue(rawData.devices)) {
        return {
          devices: null,
          errors: ['The "devices" property must be an object.']
        };
      }
      var candidate = Object.prototype.hasOwnProperty.call(rawData, 'devices') && isPlainObjectValue(rawData.devices) ? rawData.devices : looksLikeDeviceDatabase(rawData) ? rawData : null;
      if (!candidate) {
        return {
          devices: null,
          errors: ['Could not find a device database in the selected file.']
        };
      }
      return validateDeviceDatabaseStructure(candidate);
    }
    function formatDeviceImportErrors(errors) {
      if (!Array.isArray(errors) || !errors.length) {
        return '';
      }
      var lines = errors.slice(0, MAX_DEVICE_IMPORT_ERRORS).map(function (message) {
        return "- ".concat(message);
      });
      return lines.join('\n');
    }
    function resolveLanguageCode(lang) {
      if (lang && texts && Object.prototype.hasOwnProperty.call(texts, lang)) {
        return lang;
      }
      return 'en';
    }
    function getLanguageTexts(lang) {
      var resolved = resolveLanguageCode(lang);
      return texts && texts[resolved] || texts.en || {};
    }
    var DEFAULT_INTL_CACHE_KEY = '__default__';
    var numberFormatCache = new Map();
    var pluralRulesCache = new Map();
    var listFormatCache = new Map();
    var LIST_FORMAT_OPTIONS = Object.freeze({
      style: 'long',
      type: 'conjunction'
    });
    function serializeIntlOptions(options) {
      if (!options || _typeof(options) !== 'object') {
        return options == null ? DEFAULT_INTL_CACHE_KEY : String(options);
      }
      var entries = [];
      for (var _i6 = 0, _Object$entries5 = Object.entries(options); _i6 < _Object$entries5.length; _i6++) {
        var _Object$entries5$_i = _slicedToArray(_Object$entries5[_i6], 2),
          key = _Object$entries5$_i[0],
          value = _Object$entries5$_i[1];
        if (typeof value === 'undefined') continue;
        var normalizedValue = void 0;
        if (value && _typeof(value) === 'object') {
          normalizedValue = serializeIntlOptions(value);
        } else {
          normalizedValue = String(value);
        }
        entries.push("".concat(key, ":").concat(normalizedValue));
      }
      if (!entries.length) {
        return DEFAULT_INTL_CACHE_KEY;
      }
      return entries.sort().join('|');
    }
    function getCachedIntlObject(cache, locale, options, factory) {
      var key = serializeIntlOptions(options);
      var localeCache = cache.get(locale);
      if (!localeCache) {
        localeCache = new Map();
        cache.set(locale, localeCache);
      }
      if (localeCache.has(key)) {
        return localeCache.get(key);
      }
      try {
        var instance = factory(locale, options);
        localeCache.set(key, instance);
        return instance;
      } catch (error) {
        localeCache.delete(key);
        throw error;
      }
    }
    function getNumberFormatter(locale, options) {
      return getCachedIntlObject(numberFormatCache, locale, options, function (loc, opts) {
        return new Intl.NumberFormat(loc, opts);
      });
    }
    function getPluralRules(locale) {
      return getCachedIntlObject(pluralRulesCache, locale, undefined, function (loc) {
        return new Intl.PluralRules(loc);
      });
    }
    function getListFormatter(locale) {
      return getCachedIntlObject(listFormatCache, locale, LIST_FORMAT_OPTIONS, function (loc) {
        return new Intl.ListFormat(loc, LIST_FORMAT_OPTIONS);
      });
    }
    function formatNumberForLang(lang, value, options) {
      var resolved = resolveLanguageCode(lang);
      try {
        return getNumberFormatter(resolved, options).format(value);
      } catch (firstError) {
        if (resolved !== 'en') {
          try {
            return getNumberFormatter('en', options).format(value);
          } catch (fallbackError) {
            console.warn('Number formatting failed', firstError, fallbackError);
            return String(value);
          }
        }
        console.warn('Number formatting failed', firstError);
        return String(value);
      }
    }
    function formatCountText(lang, langTexts, baseKey, count) {
      var resolved = resolveLanguageCode(lang);
      var localeTexts = langTexts || getLanguageTexts(resolved);
      var englishTexts = getLanguageTexts('en');
      var suffix = 'Other';
      try {
        var plural = getPluralRules(resolved).select(count);
        if (plural === 'one' && (localeTexts["".concat(baseKey, "One")] || englishTexts["".concat(baseKey, "One")])) {
          suffix = 'One';
        }
      } catch (firstError) {
        if (resolved !== 'en') {
          try {
            var fallbackPlural = getPluralRules('en').select(count);
            if (fallbackPlural === 'one' && (localeTexts["".concat(baseKey, "One")] || englishTexts["".concat(baseKey, "One")])) {
              suffix = 'One';
            }
          } catch (fallbackError) {
            console.warn('Plural rules failed', firstError, fallbackError);
            if (count === 1 && (localeTexts["".concat(baseKey, "One")] || englishTexts["".concat(baseKey, "One")])) {
              suffix = 'One';
            }
          }
        } else if (count === 1 && (localeTexts["".concat(baseKey, "One")] || englishTexts["".concat(baseKey, "One")])) {
          suffix = 'One';
        }
      }
      var key = "".concat(baseKey).concat(suffix);
      var template = localeTexts[key] || englishTexts[key] || '%s';
      var formatted = formatNumberForLang(resolved, count);
      return template.replace('%s', formatted);
    }
    function formatListForLang(lang, items) {
      var resolved = resolveLanguageCode(lang);
      if (!Array.isArray(items) || !items.length) return '';
      try {
        return getListFormatter(resolved).format(items);
      } catch (firstError) {
        if (resolved !== 'en') {
          try {
            return getListFormatter('en').format(items);
          } catch (fallbackError) {
            console.warn('List formatting failed', firstError, fallbackError);
            return items.join(', ');
          }
        }
        console.warn('List formatting failed', firstError);
        return items.join(', ');
      }
    }
    function normalizeTemperatureUnit(unit) {
      if (typeof unit === 'string') {
        var normalized = unit.trim().toLowerCase();
        if (normalized === TEMPERATURE_UNITS.fahrenheit) {
          return TEMPERATURE_UNITS.fahrenheit;
        }
        if (normalized === TEMPERATURE_UNITS.celsius) {
          return TEMPERATURE_UNITS.celsius;
        }
      }
      if (unit === TEMPERATURE_UNITS.fahrenheit) {
        return TEMPERATURE_UNITS.fahrenheit;
      }
      return TEMPERATURE_UNITS.celsius;
    }
    function convertCelsiusToUnit(value) {
      var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : temperatureUnit;
      var numeric = Number(value);
      if (!Number.isFinite(numeric)) {
        return Number.NaN;
      }
      var resolvedUnit = normalizeTemperatureUnit(unit);
      if (resolvedUnit === TEMPERATURE_UNITS.fahrenheit) {
        return numeric * 9 / 5 + 32;
      }
      return numeric;
    }
    function getTemperatureUnitSymbolForLang() {
      var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentLang;
      var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : temperatureUnit;
      var resolvedUnit = normalizeTemperatureUnit(unit);
      var textsForLang = getLanguageTexts(lang);
      var fallbackTexts = getLanguageTexts('en');
      var key = resolvedUnit === TEMPERATURE_UNITS.fahrenheit ? 'temperatureUnitSymbolFahrenheit' : 'temperatureUnitSymbolCelsius';
      return textsForLang[key] || fallbackTexts[key] || (resolvedUnit === TEMPERATURE_UNITS.fahrenheit ? '°F' : '°C');
    }
    function getTemperatureUnitLabelForLang() {
      var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentLang;
      var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : temperatureUnit;
      var resolvedUnit = normalizeTemperatureUnit(unit);
      var textsForLang = getLanguageTexts(lang);
      var fallbackTexts = getLanguageTexts('en');
      var key = resolvedUnit === TEMPERATURE_UNITS.fahrenheit ? 'temperatureUnitFahrenheit' : 'temperatureUnitCelsius';
      return textsForLang[key] || fallbackTexts[key] || (resolvedUnit === TEMPERATURE_UNITS.fahrenheit ? 'Fahrenheit (°F)' : 'Celsius (°C)');
    }
    function getTemperatureColumnLabelForLang() {
      var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentLang;
      var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : temperatureUnit;
      var textsForLang = getLanguageTexts(lang);
      var fallbackTexts = getLanguageTexts('en');
      var baseLabel = textsForLang.temperatureLabel || fallbackTexts.temperatureLabel || 'Temperature';
      var symbol = getTemperatureUnitSymbolForLang(lang, unit);
      return "".concat(baseLabel, " (").concat(symbol, ")");
    }
    function formatTemperatureForDisplay(celsius) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _ref3 = options || {},
        _ref3$unit = _ref3.unit,
        unit = _ref3$unit === void 0 ? temperatureUnit : _ref3$unit,
        _ref3$lang = _ref3.lang,
        lang = _ref3$lang === void 0 ? currentLang : _ref3$lang,
        _ref3$includeSign = _ref3.includeSign,
        includeSign = _ref3$includeSign === void 0 ? true : _ref3$includeSign;
      var resolvedUnit = normalizeTemperatureUnit(unit);
      var converted = convertCelsiusToUnit(celsius, resolvedUnit);
      if (!Number.isFinite(converted)) {
        return '';
      }
      if (Math.abs(converted) < 1e-6) {
        converted = 0;
      }
      var isNegative = converted < 0;
      var isPositive = converted > 0;
      var absolute = Math.abs(converted);
      var isInteger = Math.abs(absolute - Math.round(absolute)) < 1e-6;
      var fractionDigits = resolvedUnit === TEMPERATURE_UNITS.fahrenheit && !isInteger ? 1 : 0;
      var formatted = formatNumberForLang(lang, absolute, {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits
      });
      var prefix = '';
      if (includeSign === 'none') {
        prefix = '';
      } else if (includeSign === false || includeSign === 'negative') {
        if (isNegative) {
          prefix = "\u2013";
        }
      } else {
        if (isPositive) {
          prefix = '+';
        } else if (isNegative) {
          prefix = "\u2013";
        }
      }
      var symbol = getTemperatureUnitSymbolForLang(lang, resolvedUnit);
      return "".concat(prefix).concat(formatted, " ").concat(symbol);
    }
    function summarizeCustomDevices() {
      if (typeof getDeviceChanges !== 'function') {
        return {
          total: 0,
          categories: []
        };
      }
      var diff = getDeviceChanges();
      if (!diff || _typeof(diff) !== 'object') {
        return {
          total: 0,
          categories: []
        };
      }
      var categories = [];
      var total = 0;
      Object.entries(diff).forEach(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
          cat = _ref5[0],
          entries = _ref5[1];
        if (!isPlainObjectValue(entries)) return;
        if (cat === 'fiz') {
          Object.entries(entries).forEach(function (_ref6) {
            var _ref7 = _slicedToArray(_ref6, 2),
              sub = _ref7[0],
              subEntries = _ref7[1];
            if (!isPlainObjectValue(subEntries)) return;
            var keys = Object.keys(subEntries);
            if (!keys.length) return;
            categories.push({
              key: "fiz.".concat(sub),
              count: keys.length
            });
            total += keys.length;
          });
        } else {
          var keys = Object.keys(entries);
          if (!keys.length) return;
          categories.push({
            key: cat,
            count: keys.length
          });
          total += keys.length;
        }
      });
      return {
        total: total,
        categories: categories
      };
    }
    function hasGearListContent(entry) {
      if (!entry) return false;
      if (typeof entry === 'string') {
        return entry.trim().length > 0;
      }
      if (!isPlainObjectValue(entry)) {
        return false;
      }
      if (typeof entry.gearList === 'string') {
        return entry.gearList.trim().length > 0;
      }
      if (isPlainObjectValue(entry.gearList)) {
        return Object.values(entry.gearList).some(function (value) {
          return typeof value === 'string' && value.trim().length > 0;
        });
      }
      var legacyProjectHtml = typeof entry.projectHtml === 'string' && entry.projectHtml.trim().length > 0;
      var legacyGearHtml = typeof entry.gearHtml === 'string' && entry.gearHtml.trim().length > 0;
      if (legacyProjectHtml || legacyGearHtml) {
        return true;
      }
      return false;
    }
    function computeGearListCount(projectData, setupsData) {
      var count = 0;
      var countedNames = new Set();
      var addCount = function addCount(name, candidate) {
        if (!hasGearListContent(candidate)) {
          return;
        }
        var normalizedName = typeof name === 'string' ? name : '';
        if (countedNames.has(normalizedName)) {
          return;
        }
        countedNames.add(normalizedName);
        count += 1;
      };
      if (typeof projectData === 'string') {
        addCount('', projectData);
      } else if (Array.isArray(projectData)) {
        projectData.forEach(function (entry, index) {
          var key = isPlainObjectValue(entry) && typeof entry.name === 'string' ? entry.name : "legacy-".concat(index);
          addCount(key, entry);
        });
      } else if (isPlainObjectValue(projectData)) {
        Object.entries(projectData).forEach(function (_ref8) {
          var _ref9 = _slicedToArray(_ref8, 2),
            name = _ref9[0],
            entry = _ref9[1];
          addCount(name, entry);
        });
      } else {
        addCount('', projectData);
      }
      if (isPlainObjectValue(setupsData)) {
        Object.entries(setupsData).forEach(function (_ref0) {
          var _ref1 = _slicedToArray(_ref0, 2),
            name = _ref1[0],
            setup = _ref1[1];
          addCount(name, setup);
        });
      }
      return count;
    }
    function computeFavoritesCount(favorites) {
      if (!isPlainObjectValue(favorites)) return 0;
      return Object.values(favorites).reduce(function (count, entry) {
        if (Array.isArray(entry)) {
          return count + entry.length;
        }
        return count;
      }, 0);
    }
    function computeFeedbackCount(feedback) {
      if (!isPlainObjectValue(feedback)) return 0;
      return Object.values(feedback).reduce(function (count, entry) {
        if (Array.isArray(entry)) {
          return count + entry.length;
        }
        if (isPlainObjectValue(entry) && Array.isArray(entry.entries)) {
          return count + entry.entries.length;
        }
        return count;
      }, 0);
    }
    function pruneValueForImportantBackup(value) {
      if (Array.isArray(value)) {
        var pruned = value.map(function (item) {
          return pruneValueForImportantBackup(item);
        }).filter(function (item) {
          return item !== undefined;
        });
        return pruned.length ? pruned : undefined;
      }
      if (isPlainObjectValue(value)) {
        var result = {};
        Object.entries(value).forEach(function (_ref10) {
          var _ref11 = _slicedToArray(_ref10, 2),
            key = _ref11[0],
            val = _ref11[1];
          var pruned = pruneValueForImportantBackup(val);
          if (pruned !== undefined) {
            result[key] = pruned;
          }
        });
        return Object.keys(result).length ? result : undefined;
      }
      if (value === null || value === undefined) {
        return undefined;
      }
      if (typeof value === 'string') {
        return value.trim() ? value : undefined;
      }
      return value;
    }
    function extractImportantProjectEntry(entry) {
      var _projectSource$projec, _projectSource$gearLi, _projectSource$gearSe, _projectSource$diagra, _projectSource$powerS, _projectSource$autoGe;
      if (entry === null || entry === undefined) {
        return null;
      }
      if (typeof entry === 'string') {
        return entry.trim() ? {
          gearList: entry
        } : null;
      }
      if (Array.isArray(entry)) {
        var prunedArray = pruneValueForImportantBackup(entry);
        return prunedArray !== undefined ? {
          gearList: prunedArray
        } : null;
      }
      if (!isPlainObjectValue(entry)) {
        return null;
      }
      var projectSource = isPlainObjectValue(entry.project) ? entry.project : entry;
      var snapshot = {};
      var projectInfoSource = (_projectSource$projec = projectSource.projectInfo) !== null && _projectSource$projec !== void 0 ? _projectSource$projec : entry.projectInfo;
      var projectInfo = pruneValueForImportantBackup(projectInfoSource);
      if (projectInfo !== undefined) {
        snapshot.projectInfo = projectInfo;
      }
      var gearListSource = (_projectSource$gearLi = projectSource.gearList) !== null && _projectSource$gearLi !== void 0 ? _projectSource$gearLi : entry.gearList;
      if (typeof gearListSource === 'string') {
        if (gearListSource.trim()) {
          snapshot.gearList = gearListSource;
        }
      } else {
        var gearList = pruneValueForImportantBackup(gearListSource);
        if (gearList !== undefined) {
          snapshot.gearList = gearList;
        }
      }
      var gearSelectorsSource = (_projectSource$gearSe = projectSource.gearSelectors) !== null && _projectSource$gearSe !== void 0 ? _projectSource$gearSe : entry.gearSelectors;
      var gearSelectors = pruneValueForImportantBackup(gearSelectorsSource);
      if (gearSelectors !== undefined) {
        snapshot.gearSelectors = gearSelectors;
      }
      var diagramPositionsSource = (_projectSource$diagra = projectSource.diagramPositions) !== null && _projectSource$diagra !== void 0 ? _projectSource$diagra : entry.diagramPositions;
      var diagramPositions = pruneValueForImportantBackup(diagramPositionsSource);
      if (diagramPositions !== undefined) {
        snapshot.diagramPositions = diagramPositions;
      }
      var powerSelectionSource = (_projectSource$powerS = projectSource.powerSelection) !== null && _projectSource$powerS !== void 0 ? _projectSource$powerS : entry.powerSelection;
      var deviceSelection = pruneValueForImportantBackup(powerSelectionSource);
      if (deviceSelection !== undefined) {
        snapshot.powerSelection = deviceSelection;
      }
      var autoGearRulesSource = (_projectSource$autoGe = projectSource.autoGearRules) !== null && _projectSource$autoGe !== void 0 ? _projectSource$autoGe : entry.autoGearRules;
      if (Array.isArray(autoGearRulesSource)) {
        var autoGearRules = pruneValueForImportantBackup(autoGearRulesSource);
        if (autoGearRules !== undefined && autoGearRules.length) {
          snapshot.autoGearRules = autoGearRules;
        }
      }
      return Object.keys(snapshot).length ? snapshot : null;
    }
    function buildImportantProjectMap(collection) {
      if (!isPlainObjectValue(collection)) {
        return undefined;
      }
      var reduced = {};
      Object.entries(collection).forEach(function (_ref12) {
        var _ref13 = _slicedToArray(_ref12, 2),
          name = _ref13[0],
          entry = _ref13[1];
        var important = extractImportantProjectEntry(entry);
        if (important) {
          reduced[name] = important;
        }
      });
      return Object.keys(reduced).length ? reduced : undefined;
    }
    function createImportantProjectData(data) {
      var importantData = {};
      if (isPlainObjectValue(data)) {
        Object.entries(data).forEach(function (_ref14) {
          var _ref15 = _slicedToArray(_ref14, 2),
            key = _ref15[0],
            value = _ref15[1];
          if (key === 'project' || key === 'setups' || key === 'autoGearRules') {
            return;
          }
          var pruned = pruneValueForImportantBackup(value);
          if (pruned !== undefined) {
            importantData[key] = pruned;
          }
        });
      }
      var project = extractImportantProjectEntry(data.project);
      var setups = buildImportantProjectMap(data.setups);
      if (project) {
        importantData.project = project;
      }
      if (setups) {
        importantData.setups = setups;
      }
      if (Array.isArray(data.autoGearRules)) {
        var autoGearRules = pruneValueForImportantBackup(data.autoGearRules);
        if (autoGearRules !== undefined && autoGearRules.length) {
          importantData.autoGearRules = autoGearRules;
        }
      }
      return importantData;
    }
    function estimateBackupSize(data) {
      if (typeof localStorage === 'undefined') return 0;
      try {
        var snapshot = {};
        for (var i = 0; i < localStorage.length; i += 1) {
          var key = localStorage.key(i);
          if (typeof key !== 'string') continue;
          snapshot[key] = localStorage.getItem(key);
        }
        var importantData = isPlainObjectValue(data) ? createImportantProjectData(data) : {};
        var payload = {
          version: typeof APP_VERSION !== 'undefined' ? APP_VERSION : '',
          generatedAt: new Date().toISOString(),
          settings: snapshot,
          data: importantData
        };
        var json = JSON.stringify(payload);
        if (typeof TextEncoder !== 'undefined') {
          return new TextEncoder().encode(json).length;
        }
        return json.length;
      } catch (err) {
        console.warn('Could not calculate backup size preview', err);
        return 0;
      }
    }
    function formatSizeText(lang, langTexts, bytes) {
      var _texts$en159;
      var resolved = resolveLanguageCode(lang);
      if (!Number.isFinite(bytes) || bytes <= 0) {
        var _texts$en158;
        var zero = formatNumberForLang(resolved, 0, {
          maximumFractionDigits: 0
        });
        var _template9 = langTexts.storageTotalSizeValue || ((_texts$en158 = texts.en) === null || _texts$en158 === void 0 ? void 0 : _texts$en158.storageTotalSizeValue) || '~%s KB';
        return _template9.replace('%s', zero);
      }
      var kilobytes = bytes / 1024;
      var options;
      if (kilobytes >= 100) {
        options = {
          maximumFractionDigits: 0
        };
      } else if (kilobytes >= 10) {
        options = {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
        };
      } else {
        options = {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        };
      }
      var formatted = formatNumberForLang(resolved, kilobytes, options);
      var template = langTexts.storageTotalSizeValue || ((_texts$en159 = texts.en) === null || _texts$en159 === void 0 ? void 0 : _texts$en159.storageTotalSizeValue) || '~%s KB';
      return template.replace('%s', formatted);
    }
    function formatDeviceCategories(lang, categories) {
      if (!Array.isArray(categories) || !categories.length) return '';
      var resolved = resolveLanguageCode(lang);
      var lookup = typeof categoryNames !== 'undefined' && categoryNames || {};
      var localized = lookup[resolved] || lookup.en || {};
      var fallback = lookup.en || {};
      var items = categories.map(function (_ref16) {
        var key = _ref16.key,
          count = _ref16.count;
        var label = localized[key] || fallback[key] || key;
        var formattedCount = formatNumberForLang(resolved, count, {
          maximumFractionDigits: 0
        });
        return {
          label: label,
          text: "".concat(label, " (").concat(formattedCount, ")")
        };
      }).sort(function (a, b) {
        return a.label.localeCompare(b.label, resolved, {
          sensitivity: 'base'
        });
      }).map(function (entry) {
        return entry.text;
      });
      return formatListForLang(resolved, items);
    }
    var STORAGE_SUMMARY_AUTO_BACKUP_PREFIX = 'auto-backup-';
    var STORAGE_SUMMARY_AUTO_BACKUP_DELETION_PREFIX = 'auto-backup-before-delete-';
    var STORAGE_TIMESTAMP_KEYS = new Set(['timestamp', 'createdat', 'created_at', 'savedat', 'saved_at', 'updatedat', 'updated_at', 'generatedat', 'generated_at', 'generatedon', 'generated_on', 'exportedat', 'exported_at', 'modifiedat', 'modified_at', 'iso']);
    var ISO_TIMESTAMP_PATTERN = /^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?)?(?:Z|[+-]\d{2}:\d{2})?$/;
    function isAutomaticBackupName(name) {
      if (typeof name !== 'string') return false;
      return name.startsWith(STORAGE_SUMMARY_AUTO_BACKUP_PREFIX) || name.startsWith(STORAGE_SUMMARY_AUTO_BACKUP_DELETION_PREFIX);
    }
    function parseAutoBackupTimestamp(name) {
      if (typeof name !== 'string') return null;
      var remainder = '';
      if (name.startsWith(STORAGE_SUMMARY_AUTO_BACKUP_PREFIX)) {
        remainder = name.slice(STORAGE_SUMMARY_AUTO_BACKUP_PREFIX.length);
      } else if (name.startsWith(STORAGE_SUMMARY_AUTO_BACKUP_DELETION_PREFIX)) {
        remainder = name.slice(STORAGE_SUMMARY_AUTO_BACKUP_DELETION_PREFIX.length);
      } else {
        return null;
      }
      var parts = remainder.split('-');
      if (parts.length < 6) {
        return null;
      }
      var values = parts.slice(0, 6).map(function (part) {
        return parseInt(part, 10);
      });
      if (values.some(function (value) {
        return Number.isNaN(value);
      })) {
        return null;
      }
      var _values = _slicedToArray(values, 6),
        year = _values[0],
        month = _values[1],
        day = _values[2],
        hour = _values[3],
        minute = _values[4],
        second = _values[5];
      var date = new Date(year, month - 1, day, hour, minute, second);
      if (Number.isNaN(date.getTime())) {
        return null;
      }
      return date;
    }
    function extractTimestampFromValue(value) {
      if (!value) return null;
      var visited = new Set();
      var queue = [value];
      var latest = null;
      var considerDate = function considerDate(candidate) {
        if (!(candidate instanceof Date)) return;
        if (Number.isNaN(candidate.getTime())) return;
        if (!latest || candidate > latest) {
          latest = candidate;
        }
      };
      while (queue.length) {
        var current = queue.shift();
        if (current === null || current === undefined) {
          continue;
        }
        if (typeof current === 'string') {
          var trimmed = current.trim();
          if (!trimmed) {
            continue;
          }
          if (ISO_TIMESTAMP_PATTERN.test(trimmed)) {
            considerDate(new Date(trimmed));
          }
          continue;
        }
        if (_typeof(current) !== 'object') {
          continue;
        }
        if (visited.has(current)) {
          continue;
        }
        visited.add(current);
        if (Array.isArray(current)) {
          current.forEach(function (item) {
            if (item && _typeof(item) === 'object') {
              queue.push(item);
            } else if (typeof item === 'string') {
              queue.push(item);
            }
          });
          continue;
        }
        Object.entries(current).forEach(function (_ref17) {
          var _ref18 = _slicedToArray(_ref17, 2),
            key = _ref18[0],
            val = _ref18[1];
          var normalizedKey = typeof key === 'string' ? key.toLowerCase() : '';
          if (typeof val === 'string') {
            var _trimmed = val.trim();
            if (!_trimmed) {
              return;
            }
            if (STORAGE_TIMESTAMP_KEYS.has(normalizedKey) || ISO_TIMESTAMP_PATTERN.test(_trimmed)) {
              considerDate(new Date(_trimmed));
            }
            return;
          }
          if (val && _typeof(val) === 'object') {
            queue.push(val);
          }
        });
      }
      return latest;
    }
    function extractLatestManualSetupInfo(setups) {
      var result = {
        hasAny: false,
        date: null,
        name: ''
      };
      if (!isPlainObjectValue(setups)) {
        return result;
      }
      Object.entries(setups).forEach(function (_ref19) {
        var _ref20 = _slicedToArray(_ref19, 2),
          name = _ref20[0],
          entry = _ref20[1];
        if (!name || typeof name !== 'string') {
          return;
        }
        if (isAutomaticBackupName(name)) {
          return;
        }
        result.hasAny = true;
        var timestamp = extractTimestampFromValue(entry);
        if (timestamp && (!result.date || timestamp > result.date)) {
          result.date = timestamp;
          result.name = name;
        }
      });
      return result;
    }
    function extractLatestAutoBackupInfo(names) {
      var result = {
        hasAny: Array.isArray(names) && names.length > 0,
        date: null,
        name: ''
      };
      if (!Array.isArray(names)) {
        return result;
      }
      names.forEach(function (name) {
        var timestamp = parseAutoBackupTimestamp(name);
        if (timestamp && (!result.date || timestamp > result.date)) {
          result.date = timestamp;
          result.name = name;
        }
      });
      return result;
    }
    function extractLatestFullBackupInfo(entries) {
      var result = {
        hasAny: Array.isArray(entries) && entries.length > 0,
        date: null,
        name: ''
      };
      if (!Array.isArray(entries)) {
        return result;
      }
      entries.forEach(function (entry) {
        if (!entry) {
          return;
        }
        if (typeof entry === 'string') {
          var trimmed = entry.trim();
          if (!trimmed) {
            return;
          }
          var timestamp = new Date(trimmed);
          if (Number.isNaN(timestamp.getTime())) {
            return;
          }
          if (!result.date || timestamp > result.date) {
            result.date = timestamp;
            result.name = trimmed;
          }
          return;
        }
        if (_typeof(entry) === 'object') {
          var _timestamp = extractTimestampFromValue(entry);
          if (!_timestamp) {
            return;
          }
          if (!result.date || _timestamp > result.date) {
            result.date = _timestamp;
            if (typeof entry.fileName === 'string' && entry.fileName.trim()) {
              result.name = entry.fileName.trim();
            } else if (typeof entry.name === 'string' && entry.name.trim()) {
              result.name = entry.name.trim();
            } else if (typeof entry.createdAt === 'string' && entry.createdAt.trim()) {
              result.name = entry.createdAt.trim();
            } else if (typeof entry.iso === 'string' && entry.iso.trim()) {
              result.name = entry.iso.trim();
            } else if (typeof entry.timestamp === 'string' && entry.timestamp.trim()) {
              result.name = entry.timestamp.trim();
            } else {
              result.name = '';
            }
          }
        }
      });
      return result;
    }
    function formatAbsoluteTimestamp(date, lang) {
      if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        return '';
      }
      var resolved = resolveLanguageCode(lang || currentLang);
      if (typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat === 'function') {
        try {
          return new Intl.DateTimeFormat(resolved, {
            dateStyle: 'medium',
            timeStyle: 'short'
          }).format(date);
        } catch (error) {
          console.warn('Failed to format absolute timestamp', error);
        }
      }
      return date.toISOString().replace('T', ' ').replace(/Z$/, ' UTC');
    }
    function formatRelativeTimestamp(date, lang) {
      if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        return '';
      }
      if (typeof Intl === 'undefined' || typeof Intl.RelativeTimeFormat !== 'function') {
        return '';
      }
      var resolved = resolveLanguageCode(lang || currentLang);
      var diffMs = date.getTime() - Date.now();
      var absDiff = Math.abs(diffMs);
      var unit = 'minute';
      var divisor = 60000;
      if (absDiff >= 86400000) {
        unit = 'day';
        divisor = 86400000;
      } else if (absDiff >= 3600000) {
        unit = 'hour';
        divisor = 3600000;
      } else if (absDiff < 60000) {
        unit = 'second';
        divisor = 1000;
      }
      var formatter = new Intl.RelativeTimeFormat(resolved, {
        numeric: 'auto'
      });
      var value = Math.round(diffMs / divisor);
      try {
        return formatter.format(value, unit);
      } catch (error) {
        console.warn('Failed to format relative timestamp', error);
        return '';
      }
    }
    function formatStatusTimestamp(date, lang, langTexts) {
      var _texts$en161;
      if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        return '';
      }
      var absolute = formatAbsoluteTimestamp(date, lang);
      var relative = formatRelativeTimestamp(date, lang);
      if (relative) {
        var _texts$en160;
        var template = langTexts.storageStatusTimestamp || ((_texts$en160 = texts.en) === null || _texts$en160 === void 0 ? void 0 : _texts$en160.storageStatusTimestamp) || '{relative} ({absolute})';
        return template.replace('{relative}', relative).replace('{absolute}', absolute);
      }
      var fallbackTemplate = langTexts.storageStatusTimestampAbsolute || ((_texts$en161 = texts.en) === null || _texts$en161 === void 0 ? void 0 : _texts$en161.storageStatusTimestampAbsolute) || '{absolute}';
      return fallbackTemplate.replace('{absolute}', absolute);
    }
    function applyStorageStatus(element, info, lang, langTexts, hasAny) {
      var _texts$en165;
      if (!element) return;
      if (info && info.date instanceof Date && !Number.isNaN(info.date.getTime())) {
        var _texts$en162;
        var timeText = formatStatusTimestamp(info.date, lang, langTexts);
        var display = info.name ? (langTexts.storageStatusWithName || ((_texts$en162 = texts.en) === null || _texts$en162 === void 0 ? void 0 : _texts$en162.storageStatusWithName) || '{name} — {time}').replace('{name}', info.name).replace('{time}', timeText) : timeText;
        element.textContent = display;
        if (display) {
          element.setAttribute('data-help', display);
        } else {
          element.removeAttribute('data-help');
        }
        var absolute = formatAbsoluteTimestamp(info.date, lang);
        if (absolute) {
          element.setAttribute('title', absolute);
        } else {
          element.removeAttribute('title');
        }
        return;
      }
      if (hasAny) {
        var _texts$en163, _texts$en164;
        var fallback = langTexts.storageStatusStoredWithoutTimestamp || ((_texts$en163 = texts.en) === null || _texts$en163 === void 0 ? void 0 : _texts$en163.storageStatusStoredWithoutTimestamp) || langTexts.storageStatusNever || ((_texts$en164 = texts.en) === null || _texts$en164 === void 0 ? void 0 : _texts$en164.storageStatusNever) || '';
        element.textContent = fallback;
        if (fallback) {
          element.setAttribute('data-help', fallback);
        } else {
          element.removeAttribute('data-help');
        }
        element.removeAttribute('title');
        return;
      }
      var emptyText = langTexts.storageStatusNever || ((_texts$en165 = texts.en) === null || _texts$en165 === void 0 ? void 0 : _texts$en165.storageStatusNever) || '';
      element.textContent = emptyText;
      if (emptyText) {
        element.setAttribute('data-help', emptyText);
      } else {
        element.removeAttribute('data-help');
      }
      element.removeAttribute('title');
    }
    function createSummaryItemElement(item) {
      var li = document.createElement('li');
      li.className = 'storage-summary-item';
      var header = document.createElement('div');
      header.className = 'storage-summary-header';
      var label = document.createElement('span');
      label.className = 'storage-summary-label';
      label.textContent = item.label;
      header.appendChild(label);
      if (item.storageKey) {
        var code = document.createElement('code');
        code.className = 'storage-summary-key';
        code.textContent = item.storageKey;
        header.appendChild(code);
      }
      li.appendChild(header);
      if (item.value) {
        var valueElem = document.createElement('p');
        valueElem.className = 'storage-summary-value';
        valueElem.textContent = item.value;
        li.appendChild(valueElem);
      }
      if (item.description) {
        var desc = document.createElement('p');
        desc.className = 'storage-summary-description';
        desc.textContent = item.description;
        li.appendChild(desc);
      }
      if (item.extra) {
        var extras = Array.isArray(item.extra) ? item.extra : [item.extra];
        extras.filter(Boolean).forEach(function (text) {
          var extraElem = document.createElement('p');
          extraElem.className = 'storage-summary-extra';
          extraElem.textContent = text;
          li.appendChild(extraElem);
        });
      }
      return li;
    }
    function readCriticalStorageGuardResult() {
      var tryInvoke = function tryInvoke(fn) {
        if (typeof fn !== 'function') {
          return null;
        }
        try {
          return fn();
        } catch (invokeError) {
          if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('Unable to read critical storage guard result', invokeError);
          }
          return null;
        }
      };
      var direct = typeof getLastCriticalStorageGuardResult === 'function' ? tryInvoke(function () {
        return getLastCriticalStorageGuardResult();
      }) : null;
      if (direct && _typeof(direct) === 'object') {
        return direct;
      }
      var scopeCandidates = [CORE_SHARED_SCOPE_PART2, CORE_SHARED_LOCAL, typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
      for (var index = 0; index < scopeCandidates.length; index += 1) {
        var scope = scopeCandidates[index];
        if (!scope || _typeof(scope) !== 'object') {
          continue;
        }
        var candidate = scope.__cineCriticalStorageGuard || scope.cineCriticalStorageGuard;
        if (candidate && _typeof(candidate) === 'object') {
          return candidate;
        }
      }
      return null;
    }
    function updateStorageSummary() {
      var _texts$en166, _texts$en167, _texts$en168;
      if (!storageSummaryList) return;
      while (storageSummaryList.firstChild) {
        storageSummaryList.removeChild(storageSummaryList.firstChild);
      }
      var lang = resolveLanguageCode(currentLang);
      var langTexts = getLanguageTexts(lang);
      var exportedData = typeof exportAllData === 'function' ? exportAllData() : null;
      var data = isPlainObjectValue(exportedData) ? exportedData : {};
      var setups = isPlainObjectValue(data.setups) ? data.setups : {};
      var projectNames = Object.keys(setups);
      var totalProjects = projectNames.length;
      var autoBackupNames = projectNames.filter(function (name) {
        return isAutomaticBackupName(name);
      });
      var autoBackups = autoBackupNames.length;
      var manualProjectNames = projectNames.filter(function (name) {
        return typeof name === 'string' && !isAutomaticBackupName(name);
      });
      var gearListCount = computeGearListCount(data.project, setups);
      var favoritesCount = computeFavoritesCount(data.favorites);
      var feedbackCount = computeFeedbackCount(data.feedback);
      var sessionData = data.session;
      var hasSession = Boolean(isPlainObjectValue(sessionData) && Object.keys(sessionData).length || Array.isArray(sessionData) && sessionData.length || typeof sessionData === 'string' && sessionData.trim());
      var deviceSummary = summarizeCustomDevices();
      var approxBytes = estimateBackupSize(data);
      var rawFullBackups = Array.isArray(data.fullBackupHistory) ? data.fullBackupHistory : Array.isArray(data.fullBackups) ? data.fullBackups : [];
      var fullBackupCount = rawFullBackups.reduce(function (count, entry) {
        if (!entry) return count;
        if (typeof entry === 'string') {
          return entry.trim() ? count + 1 : count;
        }
        if (_typeof(entry) === 'object') {
          var createdAt = typeof entry.createdAt === 'string' ? entry.createdAt.trim() : '';
          var iso = typeof entry.iso === 'string' ? entry.iso.trim() : '';
          var timestamp = typeof entry.timestamp === 'string' ? entry.timestamp.trim() : '';
          if (createdAt || iso || timestamp) {
            return count + 1;
          }
        }
        return count;
      }, 0);
      var manualInfo = extractLatestManualSetupInfo(setups);
      var autoInfo = extractLatestAutoBackupInfo(autoBackupNames);
      var fullBackupInfo = extractLatestFullBackupInfo(rawFullBackups);
      var guardResult = readCriticalStorageGuardResult();
      var guardValue = langTexts.storageIntegrityGuardStatus || 'Active';
      if (guardResult && _typeof(guardResult) === 'object') {
        var ensuredCount = Array.isArray(guardResult.ensured) ? guardResult.ensured.length : 0;
        var errorCount = Array.isArray(guardResult.errors) ? guardResult.errors.length : 0;
        var missingCount = Array.isArray(guardResult.skipped) ? guardResult.skipped.filter(function (entry) {
          return entry && entry.reason === 'missing';
        }).length : 0;
        if (errorCount > 0) {
          guardValue = (langTexts.storageIntegrityGuardStatusIssue || '{count} issue(s) — check console').replace('{count}', String(errorCount));
        } else if (ensuredCount > 0) {
          guardValue = (langTexts.storageIntegrityGuardStatusCreated || 'Mirrored {count} key(s) this session').replace('{count}', String(ensuredCount));
        } else if (missingCount > 0) {
          guardValue = (langTexts.storageIntegrityGuardStatusMissing || 'Waiting for first save').replace('{count}', String(missingCount));
        } else if (langTexts.storageIntegrityGuardStatus) {
          guardValue = langTexts.storageIntegrityGuardStatus;
        }
      }
      var items = [{
        storageKey: 'cameraPowerPlanner_setups',
        label: langTexts.storageKeyProjects || 'Saved projects',
        value: formatCountText(lang, langTexts, 'storageProjectsCount', totalProjects),
        description: langTexts.storageKeyProjectsDesc || ''
      }, {
        label: langTexts.storageKeyAutoBackups || 'Auto backups',
        value: formatCountText(lang, langTexts, 'storageAutoBackupsCount', autoBackups),
        description: langTexts.storageKeyAutoBackupsDesc || ''
      }, {
        storageKey: 'cameraPowerPlanner_project',
        label: langTexts.storageKeyGearLists || 'Gear list snapshots',
        value: formatCountText(lang, langTexts, 'storageGearListsCount', gearListCount),
        description: langTexts.storageKeyGearListsDesc || ''
      }, {
        storageKey: 'cameraPowerPlanner_devices',
        label: langTexts.storageKeyDevices || 'Custom or modified devices',
        value: formatCountText(lang, langTexts, 'storageDevicesCount', deviceSummary.total),
        description: langTexts.storageKeyDevicesDesc || '',
        extra: deviceSummary.total > 0 && deviceSummary.categories.length ? (langTexts.storageDeviceCategories || ((_texts$en166 = texts.en) === null || _texts$en166 === void 0 ? void 0 : _texts$en166.storageDeviceCategories) || 'Affected categories: %s').replace('%s', formatDeviceCategories(lang, deviceSummary.categories)) : null
      }, {
        storageKey: 'cameraPowerPlanner_favorites',
        label: langTexts.storageKeyFavorites || 'Pinned favorites',
        value: formatCountText(lang, langTexts, 'storageFavoritesCount', favoritesCount),
        description: langTexts.storageKeyFavoritesDesc || ''
      }, {
        storageKey: 'cameraPowerPlanner_feedback',
        label: langTexts.storageKeyFeedback || 'Runtime feedback',
        value: formatCountText(lang, langTexts, 'storageFeedbackCount', feedbackCount),
        description: langTexts.storageKeyFeedbackDesc || ''
      }, {
        storageKey: 'cameraPowerPlanner_session',
        label: langTexts.storageKeySession || 'Unsaved session',
        value: hasSession ? langTexts.storageSessionStored || ((_texts$en167 = texts.en) === null || _texts$en167 === void 0 ? void 0 : _texts$en167.storageSessionStored) || 'Stored' : langTexts.storageSessionNotStored || ((_texts$en168 = texts.en) === null || _texts$en168 === void 0 ? void 0 : _texts$en168.storageSessionNotStored) || 'Not stored',
        description: langTexts.storageKeySessionDesc || ''
      }, {
        storageKey: 'cameraPowerPlanner_fullBackups',
        label: langTexts.storageKeyFullBackups || 'Full app backups',
        value: formatCountText(lang, langTexts, 'storageFullBackupsCount', fullBackupCount),
        description: langTexts.storageKeyFullBackupsDesc || ''
      }, {
        label: langTexts.storageKeyIntegrityGuard || 'Backup guardian',
        value: guardValue,
        description: langTexts.storageKeyIntegrityGuardDesc || ''
      }, {
        storageKey: 'localStorage',
        label: langTexts.storageKeyTotalSize || 'Approximate backup size',
        value: formatSizeText(lang, langTexts, approxBytes),
        description: langTexts.storageKeyTotalSizeDesc || ''
      }];
      items.forEach(function (item) {
        storageSummaryList.appendChild(createSummaryItemElement(item));
      });
      applyStorageStatus(storageStatusLastProjectValue, manualInfo, lang, langTexts, manualProjectNames.length > 0);
      applyStorageStatus(storageStatusLastAutoBackupValue, autoInfo, lang, langTexts, autoBackupNames.length > 0);
      applyStorageStatus(storageStatusLastFullBackupValue, fullBackupInfo, lang, langTexts, fullBackupCount > 0);
      if (storageSummaryEmpty) {
        var hasData = Boolean(totalProjects || gearListCount || deviceSummary.total || favoritesCount || feedbackCount || hasSession || fullBackupCount);
        if (hasData) {
          storageSummaryEmpty.setAttribute('hidden', '');
        } else {
          storageSummaryEmpty.removeAttribute('hidden');
        }
      }
    }
    var settingsLogoInput = resolveGlobalElement('settingsLogo', 'settingsLogo');
    if (settingsLogoInput) {
      settingsLogoInput.addEventListener('change', function () {
        var file = settingsLogoInput.files && settingsLogoInput.files[0];
        if (!file) {
          loadStoredLogoPreview();
          return;
        }
        if (file.type !== 'image/svg+xml' && !file.name.toLowerCase().endsWith('.svg')) {
          showNotification('error', texts[currentLang].logoFormatError || 'Unsupported logo format');
          settingsLogoInput.value = '';
          loadStoredLogoPreview();
          return;
        }
        var reader = new FileReader();
        reader.onload = function () {
          renderSettingsLogoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      });
    }
    var settingsHighContrast = document.getElementById("settingsHighContrast");
    var settingsReduceMotion = document.getElementById("settingsReduceMotion");
    var settingsRelaxedSpacing = document.getElementById("settingsRelaxedSpacing");
    var backupSettings = document.getElementById("backupSettings");
    var restoreSettings = document.getElementById("restoreSettings");
    var factoryResetButton = document.getElementById("factoryResetButton");
    var restoreSettingsInput = document.getElementById("restoreSettingsInput");
    var restoreRehearsalButton = document.getElementById("restoreRehearsalButton");
    var restoreRehearsalSection = document.getElementById("restoreRehearsalSection");
    var restoreRehearsalHeading = document.getElementById("restoreRehearsalHeading");
    var restoreRehearsalIntro = document.getElementById("restoreRehearsalIntro");
    var restoreRehearsalModeLabel = document.getElementById("restoreRehearsalModeLabel");
    var restoreRehearsalModeBackupText = document.getElementById("restoreRehearsalModeBackupText");
    var restoreRehearsalModeProjectText = document.getElementById("restoreRehearsalModeProjectText");
    var restoreRehearsalFileLabel = document.getElementById("restoreRehearsalFileLabel");
    var restoreRehearsalBrowse = document.getElementById("restoreRehearsalBrowse");
    var restoreRehearsalFileName = document.getElementById("restoreRehearsalFileName");
    var restoreRehearsalStatus = document.getElementById("restoreRehearsalStatus");
    var restoreRehearsalRuleHeading = document.getElementById("restoreRehearsalRuleHeading");
    var restoreRehearsalRuleIntro = document.getElementById("restoreRehearsalRuleIntro");
    var restoreRehearsalRuleEmpty = document.getElementById("restoreRehearsalRuleEmpty");
    var restoreRehearsalProceedButton = document.getElementById("restoreRehearsalProceed");
    var restoreRehearsalAbortButton = document.getElementById("restoreRehearsalAbort");
    var restoreRehearsalTable = document.getElementById("restoreRehearsalTable");
    var restoreRehearsalTableCaption = document.getElementById("restoreRehearsalTableCaption");
    var restoreRehearsalMetricHeader = document.getElementById("restoreRehearsalMetricHeader");
    var restoreRehearsalLiveHeader = document.getElementById("restoreRehearsalLiveHeader");
    var restoreRehearsalSandboxHeader = document.getElementById("restoreRehearsalSandboxHeader");
    var restoreRehearsalDifferenceHeader = document.getElementById("restoreRehearsalDifferenceHeader");
    var restoreRehearsalCloseButton = document.getElementById("restoreRehearsalClose");
    var projectBackupsHeading = document.getElementById("projectBackupsHeading");
    var projectBackupsDescription = document.getElementById("projectBackupsDescription");
    var settingsShowAutoBackups = document.getElementById("settingsShowAutoBackups");
    var backupDiffToggleButton = document.getElementById("backupDiffToggleButton");
    var backupDiffSection = document.getElementById("backupDiffSection");
    var backupDiffHeading = document.getElementById("backupDiffHeading");
    var backupDiffIntro = document.getElementById("backupDiffIntro");
    var backupDiffPrimaryLabel = document.getElementById("backupDiffPrimaryLabel");
    var backupDiffSecondaryLabel = document.getElementById("backupDiffSecondaryLabel");
    var backupDiffPrimarySelect = document.getElementById("backupDiffPrimary");
    var backupDiffSecondarySelect = document.getElementById("backupDiffSecondary");
    var backupDiffEmptyState = document.getElementById("backupDiffEmptyState");
    var backupDiffSummary = document.getElementById("backupDiffSummary");
    var backupDiffList = document.getElementById("backupDiffList");
    var backupDiffListContainer = document.getElementById("backupDiffListContainer");
    var backupDiffNotesLabel = document.getElementById("backupDiffNotesLabel");
    var backupDiffNotes = document.getElementById("backupDiffNotes");
    var backupDiffExportButton = document.getElementById("backupDiffExport");
    var backupDiffCloseButton = document.getElementById("backupDiffClose");
    var aboutVersionElem = document.getElementById("aboutVersion");
    var supportLink = document.getElementById("supportLink");
    var settingsSave = document.getElementById("settingsSave");
    var settingsCancel = document.getElementById("settingsCancel");
    var featureSearch = typeof document !== 'undefined' ? document.getElementById("featureSearch") : null;
    var featureList = typeof document !== 'undefined' ? document.getElementById("featureList") : null;
    var featureSearchDropdown = typeof document !== 'undefined' ? document.getElementById("featureSearchDropdown") : null;
    var featureMap = new Map();
    var featureSearchEntryIndex = new Map();
    var FEATURE_SEARCH_HISTORY_STORAGE_KEY = 'featureSearchHistory';
    var MAX_FEATURE_SEARCH_HISTORY = 50;
    var MAX_FEATURE_SEARCH_RECENTS = 5;
    var featureSearchHistoryLoaded = false;
    var featureSearchHistory = new Map();
    var featureSearchHistorySaveTimer = null;
    var getFeatureSearchHistoryStorage = function getFeatureSearchHistoryStorage() {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          return window.localStorage;
        }
        if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
          return globalThis.localStorage;
        }
      } catch (err) {
        console.warn('Feature search history storage unavailable', err);
      }
      return null;
    };
    var buildFeatureSearchHistoryKey = function buildFeatureSearchHistoryKey(id) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'feature';
      if (!id) return '';
      return "".concat(type, ":").concat(id);
    };
    var scheduleFeatureSearchHistorySave = function scheduleFeatureSearchHistorySave() {
      if (featureSearchHistorySaveTimer != null) {
        return;
      }
      var storage = getFeatureSearchHistoryStorage();
      if (!storage || typeof storage.setItem !== 'function') {
        return;
      }
      featureSearchHistorySaveTimer = setTimeout(function () {
        featureSearchHistorySaveTimer = null;
        try {
          var data = Array.from(featureSearchHistory.values()).slice().sort(function (a, b) {
            return b.lastUsed - a.lastUsed;
          }).map(function (item) {
            return {
              key: item.id,
              type: item.type,
              count: item.count,
              lastUsed: item.lastUsed,
              label: item.label
            };
          });
          storage.setItem(FEATURE_SEARCH_HISTORY_STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
          console.warn('Could not persist feature search history', error);
        }
      }, 200);
    };
    var trimFeatureSearchHistory = function trimFeatureSearchHistory() {
      if (featureSearchHistory.size <= MAX_FEATURE_SEARCH_HISTORY) return;
      var entries = Array.from(featureSearchHistory.entries()).sort(function (a, b) {
        return a[1].lastUsed - b[1].lastUsed;
      });
      var excess = entries.length - MAX_FEATURE_SEARCH_HISTORY;
      for (var i = 0; i < excess; i += 1) {
        featureSearchHistory.delete(entries[i][0]);
      }
    };
    var loadFeatureSearchHistory = function loadFeatureSearchHistory() {
      if (featureSearchHistoryLoaded) return;
      featureSearchHistoryLoaded = true;
      var storage = getFeatureSearchHistoryStorage();
      if (!storage || typeof storage.getItem !== 'function') {
        return;
      }
      var raw = null;
      try {
        raw = storage.getItem(FEATURE_SEARCH_HISTORY_STORAGE_KEY);
      } catch (err) {
        console.warn('Could not read feature search history', err);
        return;
      }
      if (!raw) return;
      var parsed = null;
      try {
        parsed = JSON.parse(raw);
      } catch (err) {
        console.warn('Invalid feature search history payload', err);
        return;
      }
      if (!Array.isArray(parsed)) return;
      parsed.forEach(function (item) {
        if (!item || _typeof(item) !== 'object') return;
        var id = typeof item.id === 'string' ? item.id : typeof item.key === 'string' ? item.key : null;
        var type = typeof item.type === 'string' ? item.type : 'feature';
        var combinedKey = buildFeatureSearchHistoryKey(id, type);
        if (!combinedKey) return;
        var count = Number.isFinite(item.count) && item.count > 0 ? Math.min(Math.floor(item.count), 1000000) : 0;
        var lastUsed = Number.isFinite(item.lastUsed) ? item.lastUsed : 0;
        var label = typeof item.label === 'string' ? item.label : '';
        featureSearchHistory.set(combinedKey, {
          key: combinedKey,
          id: id,
          type: type,
          count: count,
          lastUsed: lastUsed,
          label: label
        });
      });
      trimFeatureSearchHistory();
    };
    var cleanupFeatureSearchHistory = function cleanupFeatureSearchHistory() {
      var changed = false;
      var _iterator4 = _createForOfIteratorHelper(featureSearchHistory.keys()),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var key = _step4.value;
          if (!featureSearchEntryIndex.has(key)) {
            featureSearchHistory.delete(key);
            changed = true;
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      if (changed) {
        scheduleFeatureSearchHistorySave();
      }
    };
    var getFeatureSearchHistoryData = function getFeatureSearchHistoryData(key, type) {
      if (!key) return null;
      loadFeatureSearchHistory();
      var combinedKey = buildFeatureSearchHistoryKey(key, type);
      return featureSearchHistory.get(combinedKey) || null;
    };
    var registerFeatureSearchUsage = function registerFeatureSearchUsage(id) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'feature';
      var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      if (!id) return;
      loadFeatureSearchHistory();
      var normalizedType = typeof type === 'string' && type ? type : 'feature';
      var combinedKey = buildFeatureSearchHistoryKey(id, normalizedType);
      var now = Date.now ? Date.now() : new Date().getTime();
      var existing = featureSearchHistory.get(combinedKey);
      var next = {
        key: combinedKey,
        id: id,
        type: normalizedType,
        count: existing ? Math.min(existing.count + 1, 1000000) : 1,
        lastUsed: now,
        label: label || (existing === null || existing === void 0 ? void 0 : existing.label) || ''
      };
      featureSearchHistory.set(combinedKey, next);
      trimFeatureSearchHistory();
      scheduleFeatureSearchHistorySave();
    };
    var resolveRecentFeatureSearchOptions = function resolveRecentFeatureSearchOptions() {
      loadFeatureSearchHistory();
      if (!featureSearchHistory.size) return [];
      var entries = Array.from(featureSearchHistory.values()).slice().sort(function (a, b) {
        return b.lastUsed - a.lastUsed;
      });
      var options = [];
      var seen = new Set();
      var _iterator5 = _createForOfIteratorHelper(entries),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var item = _step5.value;
          if (!item || !item.key) continue;
          var entry = featureSearchEntryIndex.get(item.key);
          if (!entry) continue;
          var option = buildFeatureSearchOptionData(entry);
          if (!option || !option.value || seen.has(option.value)) continue;
          seen.add(option.value);
          options.push(option);
          if (options.length >= MAX_FEATURE_SEARCH_RECENTS) break;
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      return options;
    };
    var normalizeSearchValue = function normalizeSearchValue(value) {
      try {
        if (featureSearchModuleApi && typeof featureSearchModuleApi.normalizeSearchValue === 'function') {
          return featureSearchModuleApi.normalizeSearchValue(value);
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('normalizeSearchValue() failed', error);
        }
      }
      return typeof value === 'string' ? value.trim().toLowerCase() : '';
    };
    safeExposeCoreRuntimeConstant('normalizeSearchValue', normalizeSearchValue);
    var FEATURE_SEARCH_EXTRA_SELECTOR = '[data-feature-search]';
    var FEATURE_SEARCH_TYPE_LABEL_KEYS = {
      feature: 'featureSearchTypeFeature',
      action: 'featureSearchTypeAction',
      device: 'featureSearchTypeDevice',
      help: 'featureSearchTypeHelp'
    };
    var getFeatureSearchEntryType = function getFeatureSearchEntryType(element) {
      var _element$dataset, _element$getAttribute;
      if (!element) return 'feature';
      var explicit = ((_element$dataset = element.dataset) === null || _element$dataset === void 0 ? void 0 : _element$dataset.featureSearchType) || element.getAttribute('data-feature-search-type');
      if (explicit && explicit.trim()) {
        return explicit.trim().toLowerCase();
      }
      var tagName = element.tagName ? element.tagName.toLowerCase() : '';
      var role = ((_element$getAttribute = element.getAttribute('role')) === null || _element$getAttribute === void 0 ? void 0 : _element$getAttribute.toLowerCase()) || '';
      if (tagName === 'button') return 'action';
      if (tagName === 'a' && element.hasAttribute('href')) return 'action';
      if (tagName === 'input') {
        var _element$getAttribute2;
        var type = (_element$getAttribute2 = element.getAttribute('type')) === null || _element$getAttribute2 === void 0 ? void 0 : _element$getAttribute2.toLowerCase();
        if (type && ['button', 'submit', 'reset', 'image'].includes(type)) {
          return 'action';
        }
      }
      if (role === 'button' || role === 'menuitem') return 'action';
      return 'feature';
    };
    var getFeatureSearchLabel = function getFeatureSearchLabel(element) {
      if (!element) return '';
      var dataset = element.dataset;
      var dataLabel = (dataset === null || dataset === void 0 ? void 0 : dataset.featureSearchLabel) || element.getAttribute('data-feature-search-label');
      if (dataLabel && dataLabel.trim()) return dataLabel.trim();
      var ariaLabel = element.getAttribute('aria-label');
      if (ariaLabel && ariaLabel.trim()) return ariaLabel.trim();
      var title = element.getAttribute('title');
      if (title && title.trim()) return title.trim();
      var text = element.textContent;
      return text && text.trim() ? text.trim() : '';
    };
    var getFeatureSearchKeywords = function getFeatureSearchKeywords(element) {
      if (!element) return '';
      var dataset = element.dataset;
      var dataValue = (dataset === null || dataset === void 0 ? void 0 : dataset.featureSearchKeywords) || element.getAttribute('data-feature-search-keywords');
      return dataValue && dataValue.trim() ? dataValue.trim() : '';
    };
    var updateFeatureSearchValue = function updateFeatureSearchValue(newValue, originalNormalized) {
      if (!featureSearch || typeof newValue !== 'string') return;
      var trimmed = newValue.trim();
      if (!trimmed) {
        featureSearch.value = '';
        restoreFeatureSearchDefaults();
        return;
      }
      if (originalNormalized && trimmed.toLowerCase() === originalNormalized) {
        return;
      }
      featureSearch.value = newValue;
      restoreFeatureSearchDefaults();
    };
    var helpMap = new Map();
    var deviceMap = new Map();
    var runFeatureSearch = function runFeatureSearch() {};
    var featureSearchEntries = [];
    var featureSearchDefaultOptions = [];
    var recordFeatureSearchUsage = function recordFeatureSearchUsage(id, type, label) {
      registerFeatureSearchUsage(id, type, label);
    };
    var featureSearchHighlightTokens = [];
    var sanitizeFeatureSearchHighlightTokens = function sanitizeFeatureSearchHighlightTokens(tokens) {
      try {
        if (featureSearchModuleApi && typeof featureSearchModuleApi.sanitizeHighlightTokens === 'function') {
          return featureSearchModuleApi.sanitizeHighlightTokens(tokens);
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('sanitizeFeatureSearchHighlightTokens() failed', error);
        }
      }
      return fallbackFeatureSearchModuleApi.sanitizeHighlightTokens(tokens);
    };
    var updateFeatureSearchHighlightTokens = function updateFeatureSearchHighlightTokens(tokens) {
      featureSearchHighlightTokens = sanitizeFeatureSearchHighlightTokens(tokens);
    };
    var collectFeatureSearchHighlightRanges = function collectFeatureSearchHighlightRanges(text, tokens) {
      try {
        if (featureSearchModuleApi && typeof featureSearchModuleApi.collectHighlightRanges === 'function') {
          return featureSearchModuleApi.collectHighlightRanges(text, tokens);
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('collectFeatureSearchHighlightRanges() failed', error);
        }
      }
      return fallbackFeatureSearchModuleApi.collectHighlightRanges(text, tokens);
    };
    var applyFeatureSearchHighlight = function applyFeatureSearchHighlight(element, text) {
      var tokens = featureSearchHighlightTokens;
      try {
        if (featureSearchModuleApi && typeof featureSearchModuleApi.applyHighlight === 'function') {
          featureSearchModuleApi.applyHighlight(element, text, tokens);
          return;
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('applyFeatureSearchHighlight() failed', error);
        }
      }
      fallbackFeatureSearchModuleApi.applyHighlight(element, text, tokens);
    };
    var normalizeFeatureSearchDetail = function normalizeFeatureSearchDetail(text) {
      try {
        if (featureSearchModuleApi && typeof featureSearchModuleApi.normalizeDetail === 'function') {
          return featureSearchModuleApi.normalizeDetail(text);
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('normalizeFeatureSearchDetail() failed', error);
        }
      }
      return fallbackFeatureSearchModuleApi.normalizeDetail(text);
    };
    var buildFeatureSearchOptionData = function buildFeatureSearchOptionData(entry) {
      if (!entry) return null;
      var value = typeof entry === 'string' ? entry : entry.display;
      if (!value) return null;
      var baseLabel = typeof entry === 'string' ? entry : entry.optionLabel || entry.display || '';
      var type = typeof entry === 'string' ? 'feature' : entry.type || 'feature';
      var typeKey = FEATURE_SEARCH_TYPE_LABEL_KEYS[type];
      var typeLabel = typeKey ? getLocalizedText(typeKey) : '';
      var detail = _typeof(entry) === 'object' && entry !== null ? normalizeFeatureSearchDetail(entry.detail) : '';
      var label = typeLabel ? "".concat(typeLabel, " \xB7 ").concat(baseLabel) : baseLabel || value;
      if (detail) {
        label = "".concat(label, " \u2014 ").concat(detail);
      }
      if (!label || label === value) {
        return {
          value: value,
          label: label || value
        };
      }
      return {
        value: value,
        label: label
      };
    };
    var normalizeFeatureSearchOption = function normalizeFeatureSearchOption(value) {
      if (!value) return null;
      if (_typeof(value) === 'object') {
        var optionValue = value.value || value.display || '';
        if (!optionValue) return null;
        var optionLabel = value.label || value.optionLabel || optionValue;
        return {
          value: optionValue,
          label: optionLabel
        };
      }
      if (typeof value === 'string') {
        return {
          value: value,
          label: value
        };
      }
      return null;
    };
    var getFeatureSearchContainer = function getFeatureSearchContainer() {
      if (!featureSearchDropdown || typeof featureSearchDropdown.closest !== 'function') {
        return null;
      }
      return featureSearchDropdown.closest('.feature-search');
    };
    var setFeatureSearchDropdownOpenClass = function setFeatureSearchDropdownOpenClass(open) {
      var container = getFeatureSearchContainer();
      if (!container) return;
      if (open) {
        container.classList.add('feature-search-open');
      } else {
        container.classList.remove('feature-search-open');
      }
    };
    var renderFeatureSearchDropdown = function renderFeatureSearchDropdown(options) {
      if (!featureSearchDropdown) return;
      featureSearchDropdown.innerHTML = '';
      if (!Array.isArray(options) || options.length === 0) {
        featureSearchDropdown.dataset.count = '0';
        featureSearchDropdown.dataset.open = 'false';
        featureSearchDropdown.hidden = true;
        featureSearchDropdown.setAttribute('aria-expanded', 'false');
        setFeatureSearchDropdownOpenClass(false);
        return;
      }
      var list = document.createElement('div');
      list.className = 'feature-search-dropdown-list';
      options.forEach(function (option, index) {
        if (!option || !option.value) return;
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'feature-search-option';
        button.setAttribute('role', 'option');
        button.setAttribute('tabindex', index === 0 ? '0' : '-1');
        button.setAttribute('data-value', option.value);
        button.setAttribute('aria-label', option.label || option.value);
        var labelSpan = document.createElement('span');
        labelSpan.className = 'feature-search-option-label';
        var labelText = option.label || option.value;
        applyFeatureSearchHighlight(labelSpan, labelText);
        button.appendChild(labelSpan);
        var normalizedLabel = (labelText || '').trim().toLowerCase();
        var normalizedValue = option.value.trim().toLowerCase();
        if (normalizedValue && normalizedLabel && normalizedValue !== normalizedLabel) {
          var valueSpan = document.createElement('span');
          valueSpan.className = 'feature-search-option-value';
          applyFeatureSearchHighlight(valueSpan, option.value);
          button.appendChild(valueSpan);
        }
        list.appendChild(button);
      });
      featureSearchDropdown.appendChild(list);
      featureSearchDropdown.dataset.count = String(options.length);
      featureSearchDropdown.dataset.activeIndex = '';
      if (featureSearchDropdown.dataset.open === 'true') {
        featureSearchDropdown.hidden = false;
        featureSearchDropdown.setAttribute('aria-expanded', 'true');
        setFeatureSearchDropdownOpenClass(true);
      } else {
        featureSearchDropdown.hidden = true;
        featureSearchDropdown.setAttribute('aria-expanded', 'false');
        setFeatureSearchDropdownOpenClass(false);
      }
    };
    var renderFeatureListOptions = function renderFeatureListOptions(values) {
      if (!Array.isArray(values)) {
        if (featureList) {
          featureList.innerHTML = '';
        }
        renderFeatureSearchDropdown([]);
        return;
      }
      var normalized = [];
      var fragment = featureList ? document.createDocumentFragment() : null;
      var _iterator6 = _createForOfIteratorHelper(values),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var value = _step6.value;
          var optionData = normalizeFeatureSearchOption(value);
          if (!optionData || !optionData.value) continue;
          normalized.push(optionData);
          if (!fragment) continue;
          var option = document.createElement('option');
          option.value = optionData.value;
          var optionLabel = optionData.label || '';
          if (optionLabel) {
            option.label = optionLabel;
            option.textContent = optionLabel;
          } else {
            option.textContent = optionData.value;
          }
          fragment.appendChild(option);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      if (featureList) {
        featureList.innerHTML = '';
        featureList.appendChild(fragment);
      }
      renderFeatureSearchDropdown(normalized);
    };
    var FEATURE_SEARCH_MAX_RESULTS = 40;
    function restoreFeatureSearchDefaults() {
      updateFeatureSearchHighlightTokens([]);
      var values = [];
      var seen = new Set();
      var recentOptions = resolveRecentFeatureSearchOptions();
      var _iterator7 = _createForOfIteratorHelper(recentOptions),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var option = _step7.value;
          if (!option || !option.value || seen.has(option.value)) continue;
          seen.add(option.value);
          values.push(option);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      var _iterator8 = _createForOfIteratorHelper(featureSearchDefaultOptions),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var _option = _step8.value;
          if (!_option || !_option.value || seen.has(_option.value)) continue;
          seen.add(_option.value);
          values.push(_option);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
      renderFeatureListOptions(values.length ? values : featureSearchDefaultOptions);
    }
    var FEATURE_SEARCH_MATCH_PRIORITIES = {
      none: 0,
      fuzzy: 1,
      partial: 2,
      keySubset: 3,
      keyPrefix: 4,
      token: 5,
      exactKey: 6
    };
    var FEATURE_SEARCH_TYPE_PRIORITIES = {
      feature: 3,
      action: 4,
      device: 3,
      help: 1
    };
    var FEATURE_SEARCH_FILTER_ALIASES = new Map([['feature', 'feature'], ['features', 'feature'], ['setting', 'feature'], ['settings', 'feature'], ['action', 'action'], ['actions', 'action'], ['command', 'action'], ['commands', 'action'], ['device', 'device'], ['devices', 'device'], ['gear', 'device'], ['equipment', 'device'], ['help', 'help'], ['doc', 'help'], ['docs', 'help'], ['guide', 'help'], ['guides', 'help'], ['support', 'help']]);
    var FEATURE_SEARCH_FILTER_STRIP_PATTERN = /^[\s:> /=\-?,.]+/;
    var FEATURE_SEARCH_SMART_QUOTE_PATTERN = /[“”„«»]/g;
    var normalizeFeatureSearchQuotes = function normalizeFeatureSearchQuotes(value) {
      return typeof value === 'string' ? value.replace(FEATURE_SEARCH_SMART_QUOTE_PATTERN, '"') : '';
    };
    var extractFeatureSearchQuotedPhrases = function extractFeatureSearchQuotedPhrases(query) {
      if (typeof query !== 'string') {
        return [];
      }
      var normalized = normalizeFeatureSearchQuotes(query);
      if (!normalized) {
        return [];
      }
      var phrases = [];
      var regex = /"([^"]+)"/g;
      var match;
      while (match = regex.exec(normalized)) {
        var phrase = (match[1] || '').trim();
        if (phrase.length < 2) {
          continue;
        }
        phrases.push(phrase);
      }
      return phrases;
    };
    var extractFeatureSearchFilter = function extractFeatureSearchFilter(query) {
      if (typeof query !== 'string') {
        return {
          filterType: null,
          queryText: ''
        };
      }
      var trimmed = query.trim();
      if (!trimmed) {
        return {
          filterType: null,
          queryText: ''
        };
      }
      var match = trimmed.match(/^([a-z]+)/i);
      if (!match) {
        return {
          filterType: null,
          queryText: trimmed
        };
      }
      var alias = match[1].toLowerCase();
      var filterType = FEATURE_SEARCH_FILTER_ALIASES.get(alias) || null;
      if (!filterType) {
        return {
          filterType: null,
          queryText: trimmed
        };
      }
      var remainderRaw = trimmed.slice(match[0].length);
      if (!remainderRaw) {
        return {
          filterType: filterType,
          queryText: ''
        };
      }
      var remainder = remainderRaw.replace(FEATURE_SEARCH_FILTER_STRIP_PATTERN, '').trim();
      return {
        filterType: filterType,
        queryText: remainder
      };
    };
    function scoreFeatureSearchEntry(entry, queryKey, queryTokens, rawQueryText) {
      var quotedPhrases = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
      if (!entry || !entry.key) return null;
      var display = entry.display;
      if (!display) return null;
      var entryKey = entry.key;
      var entryTokens = Array.isArray(entry.tokens) ? entry.tokens : [];
      var primaryTokens = Array.isArray(entry.primaryTokens) ? entry.primaryTokens : [];
      var validQueryTokens = Array.isArray(queryTokens) ? queryTokens.filter(Boolean) : [];
      var tokenDetails = validQueryTokens.length ? computeTokenMatchDetails(entryTokens, validQueryTokens) : {
        score: 0,
        matched: 0
      };
      var primaryTokenDetails = validQueryTokens.length ? computeTokenMatchDetails(primaryTokens, validQueryTokens) : {
        score: 0,
        matched: 0
      };
      var entryType = entry.type || 'feature';
      var history = getFeatureSearchHistoryData(entryKey, entryType);
      var historyCount = (history === null || history === void 0 ? void 0 : history.count) || 0;
      var historyLastUsed = (history === null || history === void 0 ? void 0 : history.lastUsed) || 0;
      var queryTokenCount = validQueryTokens.length;
      var allTokensMatched = queryTokenCount > 0 && tokenDetails.matched >= queryTokenCount;
      var phraseDetails = computePhraseMatchDetails(entry, validQueryTokens, rawQueryText);
      var quotedPhraseDetails = computeQuotedPhraseMatchDetails(entry, quotedPhrases);
      var bestType = 'none';
      var bestPriority = FEATURE_SEARCH_MATCH_PRIORITIES.none;
      var fuzzyDistance = Number.POSITIVE_INFINITY;
      var updateType = function updateType(type) {
        var priority = FEATURE_SEARCH_MATCH_PRIORITIES[type] || FEATURE_SEARCH_MATCH_PRIORITIES.none;
        if (priority > bestPriority) {
          bestType = type;
          bestPriority = priority;
        }
      };
      if (queryKey) {
        if (entryKey === queryKey) {
          updateType('exactKey');
        }
        if (entryKey.startsWith(queryKey)) {
          updateType('keyPrefix');
        }
        if (queryKey.startsWith(entryKey)) {
          updateType('keySubset');
        }
        if (entryKey.includes(queryKey) || queryKey.includes(entryKey)) {
          updateType('partial');
        }
      }
      if (tokenDetails.score > 0) {
        updateType('token');
      }
      if (bestPriority === FEATURE_SEARCH_MATCH_PRIORITIES.none && queryKey && entryKey) {
        var distance = computeLevenshteinDistance(entryKey, queryKey);
        if (isAcceptableFuzzyMatch(entryKey, queryKey, distance)) {
          fuzzyDistance = distance;
          updateType('fuzzy');
        }
      }
      return {
        entry: entry,
        entryType: entryType,
        typePriority: FEATURE_SEARCH_TYPE_PRIORITIES[entryType] || 0,
        allTokensMatched: allTokensMatched,
        matchType: bestType,
        priority: bestPriority,
        tokenScore: tokenDetails.score,
        tokenMatches: tokenDetails.matched,
        primaryTokenScore: primaryTokenDetails.score,
        primaryTokenMatches: primaryTokenDetails.matched,
        phraseScore: phraseDetails.score,
        phraseMatched: phraseDetails.matched,
        fuzzyDistance: fuzzyDistance,
        keyDistance: queryKey ? Math.abs(entryKey.length - queryKey.length) : Number.POSITIVE_INFINITY,
        keyLength: entryKey.length,
        historyCount: historyCount,
        historyLastUsed: historyLastUsed,
        quotedPhraseScore: quotedPhraseDetails.score,
        quotedPhraseMatches: quotedPhraseDetails.matched
      };
    }
    var compareFeatureSearchCandidates = function compareFeatureSearchCandidates(a, b) {
      var _a$entry, _b$entry;
      if (!a && !b) return 0;
      if (!a) return 1;
      if (!b) return -1;
      if (b.priority !== a.priority) return b.priority - a.priority;
      if (Number(b.allTokensMatched) !== Number(a.allTokensMatched)) {
        return Number(b.allTokensMatched) - Number(a.allTokensMatched);
      }
      var aPhraseScore = typeof a.phraseScore === 'number' ? a.phraseScore : 0;
      var bPhraseScore = typeof b.phraseScore === 'number' ? b.phraseScore : 0;
      if (bPhraseScore !== aPhraseScore) {
        return bPhraseScore - aPhraseScore;
      }
      if (Number(b.phraseMatched) !== Number(a.phraseMatched)) {
        return Number(b.phraseMatched) - Number(a.phraseMatched);
      }
      var aQuotedMatches = typeof a.quotedPhraseMatches === 'number' ? a.quotedPhraseMatches : 0;
      var bQuotedMatches = typeof b.quotedPhraseMatches === 'number' ? b.quotedPhraseMatches : 0;
      if (bQuotedMatches !== aQuotedMatches) {
        return bQuotedMatches - aQuotedMatches;
      }
      var aQuotedScore = typeof a.quotedPhraseScore === 'number' ? a.quotedPhraseScore : 0;
      var bQuotedScore = typeof b.quotedPhraseScore === 'number' ? b.quotedPhraseScore : 0;
      if (bQuotedScore !== aQuotedScore) {
        return bQuotedScore - aQuotedScore;
      }
      var aPrimaryScore = typeof a.primaryTokenScore === 'number' ? a.primaryTokenScore : 0;
      var bPrimaryScore = typeof b.primaryTokenScore === 'number' ? b.primaryTokenScore : 0;
      if (bPrimaryScore !== aPrimaryScore) {
        return bPrimaryScore - aPrimaryScore;
      }
      var aPrimaryMatches = typeof a.primaryTokenMatches === 'number' ? a.primaryTokenMatches : 0;
      var bPrimaryMatches = typeof b.primaryTokenMatches === 'number' ? b.primaryTokenMatches : 0;
      if (bPrimaryMatches !== aPrimaryMatches) {
        return bPrimaryMatches - aPrimaryMatches;
      }
      if (b.tokenScore !== a.tokenScore) return b.tokenScore - a.tokenScore;
      if (b.tokenMatches !== a.tokenMatches) return b.tokenMatches - a.tokenMatches;
      if (b.typePriority !== a.typePriority) return b.typePriority - a.typePriority;
      if (b.historyCount !== a.historyCount) return b.historyCount - a.historyCount;
      if (b.historyLastUsed !== a.historyLastUsed) {
        return b.historyLastUsed - a.historyLastUsed;
      }
      if (a.priority === FEATURE_SEARCH_MATCH_PRIORITIES.fuzzy && b.priority === FEATURE_SEARCH_MATCH_PRIORITIES.fuzzy && a.fuzzyDistance !== b.fuzzyDistance) {
        return a.fuzzyDistance - b.fuzzyDistance;
      }
      if (a.keyDistance !== b.keyDistance) return a.keyDistance - b.keyDistance;
      if (a.keyLength !== b.keyLength) return a.keyLength - b.keyLength;
      var aLabel = ((_a$entry = a.entry) === null || _a$entry === void 0 ? void 0 : _a$entry.display) || '';
      var bLabel = ((_b$entry = b.entry) === null || _b$entry === void 0 ? void 0 : _b$entry.display) || '';
      return aLabel.localeCompare(bLabel, undefined, {
        sensitivity: 'base'
      });
    };
    function renderFeatureSearchFilteredDefaults(filterType) {
      if (!filterType) {
        restoreFeatureSearchDefaults();
        return;
      }
      var filteredEntries = featureSearchEntries.filter(function (entry) {
        return ((entry === null || entry === void 0 ? void 0 : entry.type) || 'feature') === filterType;
      });
      if (!filteredEntries.length) {
        renderFeatureListOptions([]);
        return;
      }
      var scored = filteredEntries.map(function (entry) {
        return scoreFeatureSearchEntry(entry, '', [], '');
      }).filter(Boolean).sort(compareFeatureSearchCandidates);
      var values = [];
      var seen = new Set();
      var _iterator9 = _createForOfIteratorHelper(scored),
        _step9;
      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var item = _step9.value;
          if (values.length >= FEATURE_SEARCH_MAX_RESULTS) break;
          var _optionData = buildFeatureSearchOptionData(item.entry);
          if (!_optionData || !_optionData.value || seen.has(_optionData.value)) continue;
          seen.add(_optionData.value);
          values.push(_optionData);
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
      if (values.length === 0) {
        var fallback = filteredEntries.slice().sort(function (a, b) {
          return (a.display || '').localeCompare(b.display || '', undefined, {
            sensitivity: 'base'
          });
        });
        var _iterator0 = _createForOfIteratorHelper(fallback),
          _step0;
        try {
          for (_iterator0.s(); !(_step0 = _iterator0.n()).done;) {
            var entry = _step0.value;
            if (values.length >= FEATURE_SEARCH_MAX_RESULTS) break;
            var optionData = buildFeatureSearchOptionData(entry);
            if (!optionData || !optionData.value || seen.has(optionData.value)) continue;
            seen.add(optionData.value);
            values.push(optionData);
          }
        } catch (err) {
          _iterator0.e(err);
        } finally {
          _iterator0.f();
        }
      }
      renderFeatureListOptions(values);
    }
    function updateFeatureSearchSuggestions(query) {
      var raw = typeof query === 'string' ? query : '';
      var rawTrimmed = raw.trim();
      var _extractFeatureSearch = extractFeatureSearchFilter(rawTrimmed),
        filterType = _extractFeatureSearch.filterType,
        queryText = _extractFeatureSearch.queryText;
      var trimmed = queryText.trim();
      var quotedPhrases = extractFeatureSearchQuotedPhrases(queryText);
      if (!trimmed && !filterType) {
        restoreFeatureSearchDefaults();
        return;
      }
      var highlightSegments = trimmed ? trimmed.split(/[^a-z0-9]+/i).filter(Boolean) : [];
      var queryKey = trimmed ? searchKey(trimmed) : '';
      var queryTokens = trimmed ? searchTokens(trimmed) : [];
      var highlightTokens = [].concat(_toConsumableArray(highlightSegments), _toConsumableArray(queryTokens), _toConsumableArray(quotedPhrases.map(function (phrase) {
        return phrase && phrase.toLowerCase();
      }).filter(Boolean)));
      updateFeatureSearchHighlightTokens(highlightTokens);
      var entries = filterType ? featureSearchEntries.filter(function (entry) {
        return ((entry === null || entry === void 0 ? void 0 : entry.type) || 'feature') === filterType;
      }) : featureSearchEntries;
      if (entries.length === 0) {
        renderFeatureListOptions([]);
        return;
      }
      if (!queryKey && (!Array.isArray(queryTokens) || queryTokens.length === 0) && !filterType) {
        restoreFeatureSearchDefaults();
        return;
      }
      var scored = entries.map(function (entry) {
        return scoreFeatureSearchEntry(entry, queryKey, queryTokens, trimmed, quotedPhrases);
      }).filter(Boolean);
      if (scored.length === 0) {
        if (filterType) {
          renderFeatureSearchFilteredDefaults(filterType);
        } else {
          restoreFeatureSearchDefaults();
        }
        return;
      }
      var meaningful = trimmed ? scored.filter(function (item) {
        return item.priority > FEATURE_SEARCH_MATCH_PRIORITIES.none || item.tokenScore > 0 || item.primaryTokenScore > 0 || item.phraseScore > 0 || item.quotedPhraseScore > 0;
      }) : [];
      var candidates = (meaningful.length > 0 ? meaningful : scored).sort(compareFeatureSearchCandidates);
      var values = [];
      var seen = new Set();
      var _iterator1 = _createForOfIteratorHelper(candidates),
        _step1;
      try {
        for (_iterator1.s(); !(_step1 = _iterator1.n()).done;) {
          var item = _step1.value;
          if (values.length >= FEATURE_SEARCH_MAX_RESULTS) break;
          var optionData = buildFeatureSearchOptionData(item.entry);
          if (!optionData || !optionData.value || seen.has(optionData.value)) continue;
          seen.add(optionData.value);
          values.push(optionData);
        }
      } catch (err) {
        _iterator1.e(err);
      } finally {
        _iterator1.f();
      }
      if (values.length === 0) {
        if (filterType) {
          renderFeatureSearchFilteredDefaults(filterType);
        } else {
          restoreFeatureSearchDefaults();
        }
        return;
      }
      renderFeatureListOptions(values);
    }
    var ROMAN_NUMERAL_VALUES = {
      i: 1,
      v: 5,
      x: 10,
      l: 50,
      c: 100,
      d: 500,
      m: 1000
    };
    var ROMAN_NUMERAL_PATTERN = /^[ivxlcdm]+$/;
    var parseMarkSuffix = function parseMarkSuffix(value) {
      if (!value) {
        return {
          cleaned: '',
          number: null
        };
      }
      var cleaned = value.replace(/[^a-z0-9]+/g, '');
      if (!cleaned) {
        return {
          cleaned: '',
          number: null
        };
      }
      var number = null;
      if (/^\d+$/.test(cleaned)) {
        number = parseInt(cleaned, 10);
      } else if (ROMAN_NUMERAL_PATTERN.test(cleaned)) {
        var total = 0;
        var prev = 0;
        for (var i = cleaned.length - 1; i >= 0; i -= 1) {
          var char = cleaned[i];
          var current = ROMAN_NUMERAL_VALUES[char];
          if (!current) {
            total = 0;
            break;
          }
          if (current < prev) {
            total -= current;
          } else {
            total += current;
            prev = current;
          }
        }
        if (total > 0) {
          number = total;
        }
      }
      return {
        cleaned: cleaned,
        number: number
      };
    };
    var normaliseMarkVariants = function normaliseMarkVariants(str) {
      return str.replace(/\b(mark|mk)[\s-]*(\d+|[ivxlcdm]+)\b/g, function (_match, _prefix, rawValue) {
        var _parseMarkSuffix = parseMarkSuffix(rawValue),
          cleaned = _parseMarkSuffix.cleaned,
          number = _parseMarkSuffix.number;
        if (!cleaned) return 'mk';
        var suffix = number != null ? String(number) : cleaned;
        return "mk".concat(suffix);
      });
    };
    var UNICODE_FRACTIONS = new Map([['¼', '1/4'], ['½', '1/2'], ['¾', '3/4'], ['⅓', '1/3'], ['⅔', '2/3'], ['⅕', '1/5'], ['⅖', '2/5'], ['⅗', '3/5'], ['⅘', '4/5'], ['⅙', '1/6'], ['⅚', '5/6'], ['⅛', '1/8'], ['⅜', '3/8'], ['⅝', '5/8'], ['⅞', '7/8'], ['⅑', '1/9'], ['⅒', '1/10'], ['⅐', '1/7']]);
    var UNICODE_FRACTION_PATTERN = UNICODE_FRACTIONS.size > 0 ? new RegExp("[".concat(Array.from(UNICODE_FRACTIONS.keys()).join(''), "]"), 'g') : null;
    var normalizeUnicodeFractions = function normalizeUnicodeFractions(str) {
      if (!UNICODE_FRACTION_PATTERN || typeof str !== 'string' || !str) {
        return str;
      }
      return str.replace(UNICODE_FRACTION_PATTERN, function (match) {
        return UNICODE_FRACTIONS.get(match) || match;
      });
    };
    var NUMBER_WORD_ONES = new Map([['zero', 0], ['one', 1], ['two', 2], ['three', 3], ['four', 4], ['five', 5], ['six', 6], ['seven', 7], ['eight', 8], ['nine', 9]]);
    var NUMBER_WORD_TEENS = new Map([['ten', 10], ['eleven', 11], ['twelve', 12], ['thirteen', 13], ['fourteen', 14], ['fifteen', 15], ['sixteen', 16], ['seventeen', 17], ['eighteen', 18], ['nineteen', 19]]);
    var NUMBER_WORD_TENS = new Map([['twenty', 20], ['thirty', 30], ['forty', 40], ['fifty', 50], ['sixty', 60], ['seventy', 70], ['eighty', 80], ['ninety', 90]]);
    var NUMBER_WORD_BASE = new Map([].concat(_toConsumableArray(NUMBER_WORD_ONES), _toConsumableArray(NUMBER_WORD_TEENS), _toConsumableArray(NUMBER_WORD_TENS)));
    var NUMBER_WORD_BASE_KEYS = Array.from(NUMBER_WORD_BASE.keys()).sort(function (a, b) {
      return b.length - a.length;
    });
    var NUMBER_WORD_ONES_KEYS = Array.from(NUMBER_WORD_ONES.keys()).sort(function (a, b) {
      return b.length - a.length;
    });
    var NUMBER_WORD_PATTERN = NUMBER_WORD_BASE.size > 0 ? new RegExp("\\b(?:".concat(NUMBER_WORD_BASE_KEYS.join('|'), ")(?:[\\s-](?:").concat(NUMBER_WORD_ONES_KEYS.join('|'), "))?\\b"), 'g') : null;
    var normalizeNumberWords = function normalizeNumberWords(str) {
      if (!NUMBER_WORD_PATTERN || typeof str !== 'string' || !str) {
        return str;
      }
      return str.replace(NUMBER_WORD_PATTERN, function (match) {
        var lower = match.toLowerCase();
        if (NUMBER_WORD_BASE.has(lower)) {
          return String(NUMBER_WORD_BASE.get(lower));
        }
        var parts = lower.split(/[\s-]+/).filter(Boolean);
        if (parts.length === 2) {
          var tens = NUMBER_WORD_TENS.get(parts[0]);
          var ones = NUMBER_WORD_ONES.get(parts[1]);
          if (typeof tens === 'number' && typeof ones === 'number') {
            return String(tens + ones);
          }
        }
        return match;
      });
    };
    var SPELLING_VARIANTS = new Map([['analyse', 'analyze'], ['analysed', 'analyzed'], ['analyses', 'analyzes'], ['analysing', 'analyzing'], ['behaviour', 'behavior'], ['behaviours', 'behaviors'], ['behavioural', 'behavioral'], ['behaviourally', 'behaviorally'], ['centre', 'center'], ['centres', 'centers'], ['colour', 'color'], ['colourful', 'colorful'], ['colouring', 'coloring'], ['colourings', 'colorings'], ['colourless', 'colorless'], ['colours', 'colors'], ['customisation', 'customization'], ['customisations', 'customizations'], ['customise', 'customize'], ['customised', 'customized'], ['customises', 'customizes'], ['customising', 'customizing'], ['defence', 'defense'], ['defences', 'defenses'], ['favour', 'favor'], ['favourable', 'favorable'], ['favourably', 'favorably'], ['favoured', 'favored'], ['favourite', 'favorite'], ['favourites', 'favorites'], ['favouring', 'favoring'], ['favours', 'favors'], ['licence', 'license'], ['licences', 'licenses'], ['localisation', 'localization'], ['localisations', 'localizations'], ['localise', 'localize'], ['localised', 'localized'], ['localises', 'localizes'], ['localising', 'localizing'], ['modelling', 'modeling'], ['modeller', 'modeler'], ['modellers', 'modelers'], ['optimisation', 'optimization'], ['optimisations', 'optimizations'], ['optimise', 'optimize'], ['optimised', 'optimized'], ['optimises', 'optimizes'], ['optimising', 'optimizing'], ['organisation', 'organization'], ['organisations', 'organizations'], ['organise', 'organize'], ['organised', 'organized'], ['organises', 'organizes'], ['organising', 'organizing'], ['personalisation', 'personalization'], ['personalisations', 'personalizations'], ['personalise', 'personalize'], ['personalised', 'personalized'], ['personalises', 'personalizes'], ['personalising', 'personalizing'], ['practise', 'practice'], ['practised', 'practiced'], ['practises', 'practices'], ['practising', 'practicing'], ['theatre', 'theater'], ['theatres', 'theaters'], ['traveller', 'traveler'], ['travellers', 'travelers'], ['travelling', 'traveling']]);
    var SPELLING_VARIANT_PATTERN = SPELLING_VARIANTS.size > 0 ? new RegExp("\\b(".concat(Array.from(SPELLING_VARIANTS.keys()).join('|'), ")\\b"), 'g') : null;
    var normalizeSpellingVariants = function normalizeSpellingVariants(str) {
      if (!SPELLING_VARIANT_PATTERN) return str;
      return str.replace(SPELLING_VARIANT_PATTERN, function (match) {
        return SPELLING_VARIANTS.get(match) || match;
      });
    };
    var applySearchTokenSynonyms = function applySearchTokenSynonyms(tokens, addToken) {
      if (!tokens || typeof addToken !== 'function') {
        return;
      }
      var baseTokens = Array.isArray(tokens) ? tokens : Array.from(tokens);
      if (!Array.isArray(baseTokens) || baseTokens.length === 0) {
        return;
      }
      var tokenSet = new Set(baseTokens);
      var hasAny = function hasAny(values) {
        return values.some(function (value) {
          return tokenSet.has(value);
        });
      };
      var hasAllGroups = function hasAllGroups(groups) {
        return groups.every(function (group) {
          var list = Array.isArray(group) ? group : [group];
          return list.some(function (value) {
            return tokenSet.has(value);
          });
        });
      };
      var addAll = function addAll(values) {
        values.forEach(function (value) {
          addToken(value);
        });
      };
      if (hasAny(['fps', 'framerate', 'framepersecond', 'framespersecond']) || hasAllGroups([['frame', 'frames'], ['per', 'persecond', 'persec'], ['second', 'seconds', 'sec']]) || hasAllGroups([['frame', 'frames'], ['rate']])) {
        addAll(['fps', 'framerate', 'framepersecond', 'framespersecond', 'frame', 'frames', 'second', 'seconds']);
      }
      if (hasAny(['wh', 'watthour', 'watthours'])) {
        addAll(['wh', 'watthour', 'watthours', 'watt', 'watts', 'hour', 'hours']);
      } else if (hasAllGroups([['watt', 'watts'], ['hour', 'hours', 'hr', 'hrs']])) {
        addAll(['wh', 'watthour', 'watthours']);
      }
      if (hasAny(['kwh', 'kilowatthour', 'kilowatthours'])) {
        addAll(['kwh', 'kilowatthour', 'kilowatthours', 'kilowatt', 'kilowatts', 'watt', 'watts', 'hour', 'hours']);
      } else if (hasAllGroups([['kilowatt', 'kilowatts', 'kw'], ['hour', 'hours', 'hr', 'hrs']])) {
        addAll(['kwh', 'kilowatthour', 'kilowatthours']);
      }
      if (hasAny(['ah', 'amphour', 'amphours'])) {
        addAll(['ah', 'amphour', 'amphours', 'amp', 'amps', 'ampere', 'amperes', 'hour', 'hours']);
      } else if (hasAllGroups([['amp', 'amps', 'ampere', 'amperes'], ['hour', 'hours', 'hr', 'hrs']])) {
        addAll(['ah', 'amphour', 'amphours']);
      }
      if (hasAny(['mah', 'milliamphour', 'milliamphours'])) {
        addAll(['mah', 'milliamphour', 'milliamphours', 'milliamp', 'milliamps', 'milliampere', 'milliamperes', 'ma', 'hour', 'hours']);
      } else if (hasAllGroups([['milliamp', 'milliamps', 'milliampere', 'milliamperes', 'ma'], ['hour', 'hours', 'hr', 'hrs']])) {
        addAll(['mah', 'milliamphour', 'milliamphours']);
      }
      if (hasAny(['mp', 'megapixel', 'megapixels'])) {
        addAll(['mp', 'megapixel', 'megapixels']);
      }
      if (hasAny(['mm', 'millimeter', 'millimeters'])) {
        addAll(['mm', 'millimeter', 'millimeters']);
      }
      if (hasAny(['cm', 'centimeter', 'centimeters'])) {
        addAll(['cm', 'centimeter', 'centimeters']);
      }
      if (hasAny(['ev', 'exposurevalue'])) {
        addAll(['ev', 'exposurevalue', 'exposure', 'value']);
      } else if (hasAllGroups([['exposure'], ['value']])) {
        addAll(['ev', 'exposurevalue']);
      }
    };
    var searchKey = function searchKey(str) {
      if (!str) return '';
      var value = String(str);
      var normalized = value.toLowerCase();
      if (typeof normalized.normalize === 'function') {
        normalized = normalized.normalize('NFD');
      }
      normalized = normalized.replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').replace(/æ/g, 'ae').replace(/œ/g, 'oe').replace(/ø/g, 'o').replace(/&/g, 'and').replace(/\+/g, 'plus').replace(/[°º˚]/g, 'deg').replace(/\bdegrees?\b/g, 'deg').replace(/[×✕✖✗✘]/g, 'x');
      normalized = normalizeUnicodeFractions(normalized);
      normalized = normalizeNumberWords(normalized);
      normalized = normalizeSpellingVariants(normalized);
      normalized = normaliseMarkVariants(normalized);
      var simplified = normalized.replace(/[^a-z0-9]+/g, '');
      if (simplified) return simplified;
      return value.toLowerCase().replace(/\s+/g, '');
    };
    var searchTokens = function searchTokens(str) {
      if (!str) return [];
      var normalized = String(str).toLowerCase();
      if (typeof normalized.normalize === 'function') {
        normalized = normalized.normalize('NFD');
      }
      normalized = normalized.replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').replace(/æ/g, 'ae').replace(/œ/g, 'oe').replace(/ø/g, 'o').replace(/&/g, ' and ').replace(/\+/g, ' plus ').replace(/[°º˚]/g, ' deg ').replace(/\bdegrees?\b/g, ' deg ').replace(/[×✕✖✗✘]/g, ' x by ');
      normalized = normalizeUnicodeFractions(normalized);
      var numberNormalized = normalizeNumberWords(normalized);
      var tokens = new Set();
      var initialWords = [];
      var addToken = function addToken(token) {
        if (!token) return;
        var cleaned = token.replace(/[^a-z0-9]+/g, '');
        if (cleaned) tokens.add(cleaned);
      };
      var isAlpha = function isAlpha(value) {
        return /^[a-z]+$/.test(value);
      };
      var isNumeric = function isNumeric(value) {
        return /^\d+$/.test(value);
      };
      var addAlphaNumericVariants = function addAlphaNumericVariants(segment) {
        if (!segment) return;
        var groups = segment.match(/[a-z]+|\d+/g);
        if (!groups || groups.length <= 1) return;
        groups.forEach(function (part) {
          if (isNumeric(part) || part.length > 1) {
            addToken(part);
          }
        });
        for (var index = 0; index < groups.length - 1; index += 1) {
          var current = groups[index];
          var next = groups[index + 1];
          if (!current || !next) continue;
          var combined = "".concat(current).concat(next);
          if (!combined || combined === segment) continue;
          if (isAlpha(current) && isNumeric(next) || isNumeric(current) && isAlpha(next) || current.length > 1 && next.length > 1) {
            addToken(combined);
          }
        }
      };
      var processParts = function processParts(strToProcess) {
        var collectInitials = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        strToProcess.split(/\s+/).forEach(function (part) {
          if (!part) return;
          addToken(part);
          part.split(/[^a-z0-9]+/).filter(Boolean).forEach(function (segment) {
            addToken(segment);
            addAlphaNumericVariants(segment);
            if (collectInitials && /^[a-z]/.test(segment)) {
              initialWords.push(segment);
            }
          });
        });
      };
      processParts(normalized, true);
      if (numberNormalized !== normalized) {
        processParts(numberNormalized);
      }
      var spellingNormalized = normalizeSpellingVariants(numberNormalized);
      if (spellingNormalized !== numberNormalized) {
        processParts(spellingNormalized);
      }
      var markNormalized = normaliseMarkVariants(spellingNormalized);
      if (markNormalized !== spellingNormalized) {
        processParts(markNormalized);
      }
      if (initialWords.length >= 2) {
        var MAX_INITIALISM_LENGTH = 6;
        var initials = initialWords.map(function (word) {
          return word[0];
        }).filter(Boolean);
        var limit = Math.min(initials.length, MAX_INITIALISM_LENGTH);
        for (var start = 0; start < limit; start++) {
          var current = '';
          for (var index = start; index < limit; index++) {
            current += initials[index];
            if (current.length >= 2) {
              addToken(current);
            }
          }
        }
      }
      var markPattern = /\b(mark|mk)[\s-]*(\d+|[ivxlcdm]+)\b/g;
      var match;
      var variantSource = spellingNormalized || normalized;
      while ((match = markPattern.exec(variantSource)) !== null) {
        var prefix = match[1];
        var rawValue = match[2];
        var _parseMarkSuffix2 = parseMarkSuffix(rawValue),
          cleaned = _parseMarkSuffix2.cleaned,
          number = _parseMarkSuffix2.number;
        if (!cleaned) continue;
        var altPrefix = prefix === 'mk' ? 'mark' : 'mk';
        addToken(prefix);
        addToken(altPrefix);
        addToken(cleaned);
        addToken("".concat(prefix).concat(cleaned));
        addToken("".concat(altPrefix).concat(cleaned));
        if (number != null) {
          var numberToken = String(number);
          addToken(numberToken);
          addToken("".concat(prefix).concat(numberToken));
          addToken("".concat(altPrefix).concat(numberToken));
        }
      }
      applySearchTokenSynonyms(tokens, addToken);
      return Array.from(tokens);
    };
    var FEATURE_CONTEXT_LIMIT = 3;
    var toTitleCase = function toTitleCase(str) {
      return str.replace(/\b([a-z])/g, function (_, ch) {
        return ch.toUpperCase();
      });
    };
    var idToContextLabel = function idToContextLabel(id) {
      if (!id) return '';
      var spaced = id.replace(/[-_]+/g, ' ').replace(/([a-z\d])([A-Z])/g, '$1 $2').replace(/\s+/g, ' ').trim();
      if (!spaced) return '';
      return toTitleCase(spaced);
    };
    var addUniqueContext = function addUniqueContext(contexts, seen, value, baseLabelLower) {
      if (!value) return;
      var trimmed = value.trim();
      if (!trimmed) return;
      var normalized = trimmed.toLowerCase();
      if (normalized === baseLabelLower || seen.has(normalized)) return;
      contexts.push(trimmed);
      seen.add(normalized);
    };
    var collectFeatureContexts = function collectFeatureContexts(element, baseLabelLower) {
      if (!element || !element.parentElement) return [];
      var contexts = [];
      var seen = new Set();
      var current = element.parentElement;
      while (current && contexts.length < FEATURE_CONTEXT_LIMIT) {
        var _current$dataset;
        if (typeof ((_current$dataset = current.dataset) === null || _current$dataset === void 0 ? void 0 : _current$dataset.featureContext) === 'string') {
          current.dataset.featureContext.split(',').map(function (part) {
            return part.trim();
          }).filter(Boolean).forEach(function (value) {
            return addUniqueContext(contexts, seen, value, baseLabelLower);
          });
        }
        var labelledBy = current.getAttribute('aria-labelledby');
        if (labelledBy) {
          labelledBy.split(/\s+/).map(function (id) {
            return id && document.getElementById(id);
          }).filter(function (labelEl) {
            return labelEl && labelEl !== element;
          }).forEach(function (labelEl) {
            addUniqueContext(contexts, seen, labelEl.textContent || '', baseLabelLower);
          });
        }
        var heading = current.querySelector(':scope > h1, :scope > h2, :scope > h3, :scope > h4, :scope > legend');
        if (heading && heading !== element) {
          addUniqueContext(contexts, seen, heading.textContent || '', baseLabelLower);
        }
        if (current.id) {
          addUniqueContext(contexts, seen, idToContextLabel(current.id), baseLabelLower);
        }
        current = current.parentElement;
      }
      return contexts.reverse();
    };
    var collectFeatureSearchHelpTexts = function collectFeatureSearchHelpTexts(element) {
      if (!element) return [];
      var texts = new Set();
      var MAX_TEXTS = 4;
      var clean = function clean(value) {
        if (typeof value !== 'string') return '';
        var normalized = value.replace(/\s+/g, ' ').trim();
        if (!normalized) return '';
        if (normalized.length > 160) {
          return normalized.slice(0, 160);
        }
        return normalized;
      };
      var add = function add(value) {
        if (texts.size >= MAX_TEXTS) return;
        var cleaned = clean(value);
        if (cleaned) {
          texts.add(cleaned);
        }
      };
      var addFromElement = function addFromElement(el) {
        if (!el) return;
        add(el.getAttribute('data-help'));
        add(el.getAttribute('aria-description'));
        add(el.getAttribute('title'));
      };
      add(element.getAttribute('data-help'));
      add(element.getAttribute('aria-description'));
      add(element.getAttribute('title'));
      var ownerDoc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
      var processIdRefs = function processIdRefs(attrName, collector) {
        if (!ownerDoc) return;
        var attrValue = element.getAttribute(attrName);
        if (!attrValue) return;
        attrValue.split(/\s+/).map(function (id) {
          return id && ownerDoc.getElementById(id);
        }).filter(Boolean).forEach(collector);
      };
      processIdRefs('aria-describedby', addFromElement);
      processIdRefs('aria-labelledby', addFromElement);
      if (element.labels && _typeof(element.labels) === 'object') {
        Array.from(element.labels).forEach(addFromElement);
      }
      if (typeof element.closest === 'function') {
        var wrappingLabel = element.closest('label');
        if (wrappingLabel) addFromElement(wrappingLabel);
      }
      return Array.from(texts);
    };
    var buildFeatureEntryDetailText = function buildFeatureEntryDetailText(entry) {
      if (!entry || _typeof(entry) !== 'object') return '';
      var base = normalizeFeatureSearchDetail(entry.displayLabel || entry.baseLabel || entry.label || '').toLowerCase();
      var helpCandidates = [];
      if (Array.isArray(entry.helpTexts) && entry.helpTexts.length) {
        helpCandidates.push.apply(helpCandidates, _toConsumableArray(entry.helpTexts));
      }
      if (entry.element) {
        collectFeatureSearchHelpTexts(entry.element).forEach(function (text) {
          helpCandidates.push(text);
        });
      }
      for (var _i7 = 0, _helpCandidates = helpCandidates; _i7 < _helpCandidates.length; _i7++) {
        var candidate = _helpCandidates[_i7];
        var detail = normalizeFeatureSearchDetail(candidate);
        if (detail && (!base || detail.toLowerCase() !== base)) {
          return detail;
        }
      }
      return '';
    };
    var buildHelpSectionDetailText = function buildHelpSectionDetailText(section) {
      if (!section) return '';
      var candidates = [];
      var summaryAttr = section.getAttribute('data-help-summary');
      if (summaryAttr) candidates.push(summaryAttr);
      var summaryEl = section.querySelector('[data-help-summary]');
      if (summaryEl && summaryEl.textContent) {
        candidates.push(summaryEl.textContent);
      }
      var ariaLabel = section.getAttribute('aria-label');
      if (ariaLabel) candidates.push(ariaLabel);
      var firstParagraph = section.querySelector('p');
      if (firstParagraph && firstParagraph.textContent) {
        candidates.push(firstParagraph.textContent);
      }
      if (!firstParagraph) {
        var firstListItem = section.querySelector('li');
        if (firstListItem && firstListItem.textContent) {
          candidates.push(firstListItem.textContent);
        }
      }
      for (var _i8 = 0, _candidates = candidates; _i8 < _candidates.length; _i8++) {
        var candidate = _candidates[_i8];
        var detail = normalizeFeatureSearchDetail(candidate);
        if (detail) return detail;
      }
      return '';
    };
    var buildDeviceEntryDetailText = function buildDeviceEntryDetailText(entry) {
      if (!entry || _typeof(entry) !== 'object') return '';
      var select = entry.select;
      if (!select) return '';
      var base = normalizeFeatureSearchDetail(entry.label || '').toLowerCase();
      var helpTexts = collectFeatureSearchHelpTexts(select);
      var _iterator10 = _createForOfIteratorHelper(helpTexts),
        _step10;
      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var text = _step10.value;
          var detail = normalizeFeatureSearchDetail(text);
          if (detail && (!base || detail.toLowerCase() !== base)) {
            return detail;
          }
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
      var contexts = collectFeatureContexts(select, base);
      if (contexts.length) {
        var contextDetail = normalizeFeatureSearchDetail(contexts.join(' › '));
        if (contextDetail && (!base || contextDetail.toLowerCase() !== base)) {
          return contextDetail;
        }
      }
      return '';
    };
    var buildFeatureSearchEntry = function buildFeatureSearchEntry(element, _ref21) {
      var label = _ref21.label,
        _ref21$keywords = _ref21.keywords,
        keywords = _ref21$keywords === void 0 ? '' : _ref21$keywords;
      if (!element || !label) return null;
      var baseLabel = label.trim();
      if (!baseLabel) return null;
      var baseKey = searchKey(baseLabel);
      if (!baseKey) return null;
      var baseLabelLower = baseLabel.toLowerCase();
      var contextLabels = collectFeatureContexts(element, baseLabelLower);
      var shouldCollectHelp = typeof element.hasAttribute === 'function' && element.hasAttribute('data-feature-search');
      var helpTexts = shouldCollectHelp ? collectFeatureSearchHelpTexts(element) : [];
      var combinedLabel = baseLabel;
      if (contextLabels.length) {
        combinedLabel = "".concat(baseLabel, " (").concat(contextLabels.join(' › '), ")");
      }
      var primaryTokenSource = [baseLabel, contextLabels.join(' ')].filter(Boolean).join(' ');
      var combinedKeywords = [baseLabel, contextLabels.join(' '), keywords, helpTexts.join(' ')].filter(Boolean).join(' ');
      var entryType = getFeatureSearchEntryType(element);
      if (entryType === 'feature') {
        var tagName = typeof element.tagName === 'string' ? element.tagName.toLowerCase() : '';
        if (tagName === 'option') {
          var _ownerSelect$dataset, _ownerSelect$getAttri, _selectType$trim;
          var ownerSelect = typeof element.closest === 'function' ? element.closest('select') : null;
          var selectType = (ownerSelect === null || ownerSelect === void 0 || (_ownerSelect$dataset = ownerSelect.dataset) === null || _ownerSelect$dataset === void 0 ? void 0 : _ownerSelect$dataset.featureSearchType) || (ownerSelect === null || ownerSelect === void 0 || (_ownerSelect$getAttri = ownerSelect.getAttribute) === null || _ownerSelect$getAttri === void 0 ? void 0 : _ownerSelect$getAttri.call(ownerSelect, 'data-feature-search-type'));
          entryType = (selectType === null || selectType === void 0 || (_selectType$trim = selectType.trim()) === null || _selectType$trim === void 0 ? void 0 : _selectType$trim.toLowerCase()) || 'device';
        }
      }
      var primaryTokens = searchTokens(primaryTokenSource);
      var entry = {
        element: element,
        label: baseLabel,
        baseLabel: baseLabel,
        displayLabel: combinedLabel,
        context: contextLabels,
        primaryTokens: primaryTokens,
        tokens: searchTokens(combinedKeywords),
        key: baseKey,
        optionValue: combinedLabel,
        helpTexts: helpTexts,
        entryType: entryType
      };
      var existing = featureMap.get(baseKey);
      if (!existing) {
        featureMap.set(baseKey, entry);
      } else if (Array.isArray(existing)) {
        if (!existing.some(function (item) {
          return item && item.element === element;
        })) {
          existing.push(entry);
        }
      } else if (existing.element !== element) {
        featureMap.set(baseKey, [existing, entry]);
      }
      return entry;
    };
    var computeTokenMatchDetails = function computeTokenMatchDetails() {
      var entryTokens = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var queryTokens = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      if (!Array.isArray(entryTokens) || entryTokens.length === 0) {
        return {
          score: 0,
          matched: 0
        };
      }
      var validQueryTokens = Array.isArray(queryTokens) ? queryTokens.filter(Boolean) : [];
      if (validQueryTokens.length === 0) {
        return {
          score: 0,
          matched: 0
        };
      }
      var total = 0;
      var matched = 0;
      var _iterator11 = _createForOfIteratorHelper(validQueryTokens),
        _step11;
      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var token = _step11.value;
          var best = 0;
          var _iterator12 = _createForOfIteratorHelper(entryTokens),
            _step12;
          try {
            for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
              var entryToken = _step12.value;
              if (!entryToken) continue;
              if (entryToken === token) {
                best = 3;
                break;
              }
              if (entryToken.startsWith(token) || token.startsWith(entryToken)) {
                best = Math.max(best, 2);
              } else if (entryToken.includes(token) || token.includes(entryToken)) {
                best = Math.max(best, 1);
              }
            }
          } catch (err) {
            _iterator12.e(err);
          } finally {
            _iterator12.f();
          }
          if (best > 0) {
            matched += 1;
            total += best;
          }
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }
      if (matched === 0) {
        return {
          score: 0,
          matched: 0
        };
      }
      return {
        score: total,
        matched: matched
      };
    };
    var escapeFeatureSearchRegExp = function escapeFeatureSearchRegExp(value) {
      return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };
    var collectFeatureSearchTexts = function collectFeatureSearchTexts(entry) {
      var texts = [];
      var push = function push(text) {
        if (typeof text !== 'string') return;
        var normalized = text.trim().toLowerCase();
        if (!normalized) return;
        texts.push(normalized);
      };
      if (!entry || _typeof(entry) !== 'object') {
        return texts;
      }
      push(entry.optionLabel);
      if (entry.display && entry.display !== entry.optionLabel) {
        push(entry.display);
      }
      if (entry.detail) {
        push(entry.detail);
      }
      var rawValue = entry.value;
      if (rawValue && _typeof(rawValue) === 'object') {
        push(rawValue.baseLabel);
        push(rawValue.displayLabel);
        if (Array.isArray(rawValue.context) && rawValue.context.length) {
          push(rawValue.context.join(' '));
        }
        if (Array.isArray(rawValue.helpTexts) && rawValue.helpTexts.length) {
          push(rawValue.helpTexts.join(' '));
        }
      }
      return texts;
    };
    var computePhraseMatchDetails = function computePhraseMatchDetails(entry) {
      var queryTokens = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var rawQuery = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var validTokens = Array.isArray(queryTokens) ? queryTokens.map(function (token) {
        return token && token.replace(/[^a-z0-9]+/g, '');
      }).filter(Boolean) : [];
      var normalizedQuery = typeof rawQuery === 'string' ? rawQuery.trim().toLowerCase() : '';
      if (!validTokens.length && !normalizedQuery) {
        return {
          score: 0,
          matched: false
        };
      }
      var texts = collectFeatureSearchTexts(entry);
      if (!texts.length) {
        return {
          score: 0,
          matched: false
        };
      }
      var score = 0;
      var matched = false;
      if (normalizedQuery) {
        var _iterator13 = _createForOfIteratorHelper(texts),
          _step13;
        try {
          for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
            var text = _step13.value;
            if (text.includes(normalizedQuery)) {
              matched = true;
              score = Math.max(score, Math.max(1, normalizedQuery.length));
              break;
            }
          }
        } catch (err) {
          _iterator13.e(err);
        } finally {
          _iterator13.f();
        }
      }
      if (validTokens.length > 1) {
        var pattern = validTokens.map(escapeFeatureSearchRegExp).join('[\\s\\-_/·›>]*');
        if (pattern) {
          var regex = new RegExp("\\b".concat(pattern), 'i');
          var _iterator14 = _createForOfIteratorHelper(texts),
            _step14;
          try {
            for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
              var _text = _step14.value;
              if (regex.test(_text)) {
                matched = true;
                score = Math.max(score, validTokens.length * 6);
                break;
              }
            }
          } catch (err) {
            _iterator14.e(err);
          } finally {
            _iterator14.f();
          }
        }
      }
      return {
        score: score,
        matched: matched
      };
    };
    var computeQuotedPhraseMatchDetails = function computeQuotedPhraseMatchDetails(entry) {
      var phrases = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      if (!Array.isArray(phrases) || phrases.length === 0) {
        return {
          score: 0,
          matched: 0
        };
      }
      var normalizedPhrases = phrases.map(function (phrase) {
        return typeof phrase === 'string' ? phrase.replace(/\s+/g, ' ').trim().toLowerCase() : '';
      }).filter(function (phrase) {
        return phrase.length > 1;
      });
      if (!normalizedPhrases.length) {
        return {
          score: 0,
          matched: 0
        };
      }
      var texts = collectFeatureSearchTexts(entry);
      if (!texts.length) {
        return {
          score: 0,
          matched: 0
        };
      }
      var matched = 0;
      var score = 0;
      normalizedPhrases.forEach(function (phrase) {
        var found = false;
        var _iterator15 = _createForOfIteratorHelper(texts),
          _step15;
        try {
          for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
            var text = _step15.value;
            if (text.includes(phrase)) {
              found = true;
              break;
            }
          }
        } catch (err) {
          _iterator15.e(err);
        } finally {
          _iterator15.f();
        }
        if (found) {
          matched += 1;
          score += Math.max(phrase.length * 4, 24);
        }
      });
      if (matched === 0) {
        return {
          score: 0,
          matched: 0
        };
      }
      return {
        score: score,
        matched: matched
      };
    };
    var computeLevenshteinDistance = function computeLevenshteinDistance(a, b) {
      if (a === b) return 0;
      if (typeof a !== 'string' || typeof b !== 'string') {
        return Number.POSITIVE_INFINITY;
      }
      var aLen = a.length;
      var bLen = b.length;
      if (aLen === 0) return bLen;
      if (bLen === 0) return aLen;
      var prev = new Array(bLen + 1);
      var curr = new Array(bLen + 1);
      for (var j = 0; j <= bLen; j += 1) {
        prev[j] = j;
      }
      for (var i = 1; i <= aLen; i += 1) {
        curr[0] = i;
        var aCode = a.charCodeAt(i - 1);
        for (var _j = 1; _j <= bLen; _j += 1) {
          var cost = aCode === b.charCodeAt(_j - 1) ? 0 : 1;
          var deletion = prev[_j] + 1;
          var insertion = curr[_j - 1] + 1;
          var substitution = prev[_j - 1] + cost;
          curr[_j] = Math.min(deletion, insertion, substitution);
        }
        for (var _j2 = 0; _j2 <= bLen; _j2 += 1) {
          prev[_j2] = curr[_j2];
        }
      }
      return prev[bLen];
    };
    var isAcceptableFuzzyMatch = function isAcceptableFuzzyMatch(entryKey, queryKey, distance) {
      if (!Number.isFinite(distance) || distance <= 0) {
        return false;
      }
      if (typeof entryKey !== 'string' || typeof queryKey !== 'string') {
        return false;
      }
      var maxLength = Math.max(entryKey.length, queryKey.length);
      if (maxLength === 0) return false;
      if (maxLength <= 3) {
        return distance <= 1;
      }
      if (maxLength <= 6) {
        return distance <= 2;
      }
      return distance <= 3 && distance / maxLength <= 0.4;
    };
    function findBestSearchMatch(map, key) {
      var tokens = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var queryTokens = Array.isArray(tokens) ? tokens.filter(Boolean) : [];
      var hasKey = Boolean(key);
      if (!hasKey && queryTokens.length === 0) return null;
      var toResult = function toResult(entryKey, entryValue, matchType) {
        var score = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var matchedCount = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
        var extras = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
        return _objectSpread({
          key: entryKey,
          value: entryValue,
          matchType: matchType,
          score: score,
          matchedCount: matchedCount
        }, extras);
      };
      var flattened = [];
      var _iterator16 = _createForOfIteratorHelper(map.entries()),
        _step16;
      try {
        for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
          var _step16$value = _slicedToArray(_step16.value, 2),
            _entryKey = _step16$value[0],
            _entryValue2 = _step16$value[1];
          if (!_entryValue2) continue;
          if (Array.isArray(_entryValue2)) {
            var _iterator18 = _createForOfIteratorHelper(_entryValue2),
              _step18;
            try {
              for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
                var value = _step18.value;
                if (value) flattened.push([_entryKey, value]);
              }
            } catch (err) {
              _iterator18.e(err);
            } finally {
              _iterator18.f();
            }
          } else {
            flattened.push([_entryKey, _entryValue2]);
          }
        }
      } catch (err) {
        _iterator16.e(err);
      } finally {
        _iterator16.f();
      }
      if (hasKey) {
        var exactCandidates = flattened.filter(function (_ref22) {
          var _ref23 = _slicedToArray(_ref22, 1),
            entryKey = _ref23[0];
          return entryKey === key;
        });
        if (exactCandidates.length) {
          var _bestEntry;
          var bestEntry = exactCandidates[0][1];
          var bestDetails = queryTokens.length > 0 ? computeTokenMatchDetails(((_bestEntry = bestEntry) === null || _bestEntry === void 0 ? void 0 : _bestEntry.tokens) || [], queryTokens) : {
            score: Number.POSITIVE_INFINITY,
            matched: queryTokens.length
          };
          var _iterator17 = _createForOfIteratorHelper(exactCandidates.slice(1)),
            _step17;
          try {
            for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
              var _step17$value = _slicedToArray(_step17.value, 2),
                entryValue = _step17$value[1];
              if (!queryTokens.length) break;
              var details = computeTokenMatchDetails((entryValue === null || entryValue === void 0 ? void 0 : entryValue.tokens) || [], queryTokens);
              if (details.score > bestDetails.score || details.score === bestDetails.score && details.matched > bestDetails.matched) {
                bestDetails = details;
                bestEntry = entryValue;
              }
            }
          } catch (err) {
            _iterator17.e(err);
          } finally {
            _iterator17.f();
          }
          return toResult(key, bestEntry, 'exactKey', bestDetails.score, bestDetails.matched);
        }
      }
      var bestTokenMatch = null;
      var bestTokenScore = 0;
      var bestTokenMatched = 0;
      var bestTokenKeyDistance = Number.POSITIVE_INFINITY;
      var bestPrefixMatch = null;
      var bestPrefixScore = Number.NEGATIVE_INFINITY;
      var bestPrefixMatched = 0;
      var bestPrefixLength = Number.POSITIVE_INFINITY;
      var bestSubsetMatch = null;
      var bestSubsetScore = Number.NEGATIVE_INFINITY;
      var bestSubsetMatched = 0;
      var bestSubsetLength = -1;
      var bestPartialMatch = null;
      var bestPartialScore = Number.NEGATIVE_INFINITY;
      var bestPartialMatched = 0;
      var bestFuzzyMatch = null;
      var bestFuzzyDistance = Number.POSITIVE_INFINITY;
      var bestFuzzyLength = Number.POSITIVE_INFINITY;
      var keyLength = hasKey ? key.length : 0;
      for (var _i9 = 0, _flattened = flattened; _i9 < _flattened.length; _i9++) {
        var _flattened$_i = _slicedToArray(_flattened[_i9], 2),
          entryKey = _flattened$_i[0],
          _entryValue = _flattened$_i[1];
        if (!_entryValue) continue;
        var entryTokens = (_entryValue === null || _entryValue === void 0 ? void 0 : _entryValue.tokens) || [];
        var tokenDetails = queryTokens.length ? computeTokenMatchDetails(entryTokens, queryTokens) : {
          score: 0,
          matched: 0
        };
        if (hasKey && entryKey.startsWith(key)) {
          var score = queryTokens.length > 0 ? tokenDetails.score : Number.POSITIVE_INFINITY;
          var candidate = toResult(entryKey, _entryValue, 'keyPrefix', score, tokenDetails.matched);
          if (!bestPrefixMatch || score > bestPrefixScore || score === bestPrefixScore && (tokenDetails.matched > bestPrefixMatched || tokenDetails.matched === bestPrefixMatched && entryKey.length < bestPrefixLength)) {
            bestPrefixMatch = candidate;
            bestPrefixScore = score;
            bestPrefixMatched = tokenDetails.matched;
            bestPrefixLength = entryKey.length;
          }
        }
        if (queryTokens.length) {
          var distance = hasKey ? Math.abs(entryKey.length - keyLength) : Number.POSITIVE_INFINITY;
          if (tokenDetails.score > bestTokenScore || tokenDetails.score === bestTokenScore && (tokenDetails.matched > bestTokenMatched || tokenDetails.matched === bestTokenMatched && distance < bestTokenKeyDistance)) {
            bestTokenMatch = toResult(entryKey, _entryValue, 'token', tokenDetails.score, tokenDetails.matched);
            bestTokenScore = tokenDetails.score;
            bestTokenMatched = tokenDetails.matched;
            bestTokenKeyDistance = distance;
          }
        }
        if (hasKey && key.startsWith(entryKey)) {
          var _score = queryTokens.length > 0 ? tokenDetails.score : Number.POSITIVE_INFINITY;
          var _candidate = toResult(entryKey, _entryValue, 'keySubset', _score, tokenDetails.matched);
          if (!bestSubsetMatch || _score > bestSubsetScore || _score === bestSubsetScore && (entryKey.length > bestSubsetLength || tokenDetails.matched > bestSubsetMatched)) {
            bestSubsetMatch = _candidate;
            bestSubsetScore = _score;
            bestSubsetMatched = tokenDetails.matched;
            bestSubsetLength = entryKey.length;
          }
        } else if (hasKey && (entryKey.includes(key) || key.includes(entryKey))) {
          var _candidate2 = toResult(entryKey, _entryValue, 'partial', tokenDetails.score, tokenDetails.matched);
          if (!bestPartialMatch || tokenDetails.score > bestPartialScore || tokenDetails.score === bestPartialScore && tokenDetails.matched > bestPartialMatched) {
            bestPartialMatch = _candidate2;
            bestPartialScore = tokenDetails.score;
            bestPartialMatched = tokenDetails.matched;
          }
        }
        if (hasKey && entryKey) {
          var fuzzyDistance = computeLevenshteinDistance(entryKey, key);
          if (isAcceptableFuzzyMatch(entryKey, key, fuzzyDistance)) {
            if (!bestFuzzyMatch || fuzzyDistance < bestFuzzyDistance || fuzzyDistance === bestFuzzyDistance && entryKey.length < bestFuzzyLength) {
              bestFuzzyMatch = toResult(entryKey, _entryValue, 'fuzzy', tokenDetails.score, tokenDetails.matched, {
                fuzzyDistance: fuzzyDistance
              });
              bestFuzzyDistance = fuzzyDistance;
              bestFuzzyLength = entryKey.length;
            }
          }
        }
      }
      if (bestTokenMatch && bestTokenScore > 0) {
        return bestTokenMatch;
      }
      if (bestPrefixMatch) {
        return bestPrefixMatch;
      }
      if (bestSubsetMatch) {
        return bestSubsetMatch;
      }
      if (bestPartialMatch) {
        return bestPartialMatch;
      }
      if (bestFuzzyMatch) {
        return bestFuzzyMatch;
      }
      return null;
    }
    var STRONG_SEARCH_MATCH_TYPES = new Set(['exactKey', 'keyPrefix', 'keySubset']);
    var existingDevicesHeading = document.getElementById("existingDevicesHeading");
    var batteryComparisonSection = document.getElementById("batteryComparison");
    var batteryTableElem = document.getElementById("batteryTable");
    var breakdownListElem = document.getElementById("breakdownList");
    if (breakdownListElem) {
      try {
        safeExposeCoreRuntimeConstant('breakdownListElem', breakdownListElem);
      } catch (exposeError) {
        void exposeError;
      }
    }
    var runtimeFeedbackBtn = document.getElementById("runtimeFeedbackBtn");
    var generateGearListBtn = document.getElementById("generateGearListBtn");
    var deleteGearListProjectBtn = document.getElementById('deleteGearListProjectBtn');
    var gearListOutput = document.getElementById("gearListOutput");
    var projectRequirementsOutput = document.getElementById("projectRequirementsOutput");
    var DEFAULT_ACCENT_COLOR = '#001589';
    var accentColor = DEFAULT_ACCENT_COLOR;
    var prevAccentColor = accentColor;
    var HIGH_CONTRAST_ACCENT_COLOR = '#ffffff';
    var DEFAULT_ACCENT_NORMALIZED = DEFAULT_ACCENT_COLOR.toLowerCase();
    var normalizeAccentValue = function normalizeAccentValue(value) {
      return typeof value === 'string' ? value.trim().toLowerCase() : '';
    };
    var accentColorInputElement = resolveGlobalElement('accentColorInput', 'accentColorInput');
    var accentColorResetButtonElement = resolveGlobalElement('accentColorResetButton', 'accentColorReset');
    var updateAccentColorResetButtonState = function updateAccentColorResetButtonState() {
      if (!accentColorResetButtonElement) return;
      var body = typeof document !== 'undefined' ? document.body : null;
      var pinkModeActive = !!(body && body.classList.contains('pink-mode'));
      var inputDisabled = !accentColorInputElement || accentColorInputElement.disabled;
      var currentValue = accentColorInputElement ? normalizeAccentValue(accentColorInputElement.value || '') : '';
      var isDefaultSelection = !currentValue || currentValue === DEFAULT_ACCENT_NORMALIZED;
      var shouldDisable = pinkModeActive || inputDisabled || isDefaultSelection;
      accentColorResetButtonElement.disabled = shouldDisable;
      if (shouldDisable) {
        accentColorResetButtonElement.setAttribute('aria-disabled', 'true');
      } else {
        accentColorResetButtonElement.removeAttribute('aria-disabled');
      }
    };
    var DARK_MODE_ACCENT_BOOST_CLASS = 'dark-accent-boost';
    var PINK_REFERENCE_COLOR = '#ff69b4';
    var PINK_LUMINANCE_TOLERANCE = 0.06;
    var BRIGHT_ACCENT_LUMINANCE_THRESHOLD = 0.6;
    var BRIGHT_ACCENT_MIN_SATURATION = 0.35;
    function parseRgbComponent(value) {
      var trimmed = value.trim();
      if (!trimmed) return null;
      if (trimmed.endsWith('%')) {
        var percent = Number.parseFloat(trimmed.slice(0, -1));
        if (Number.isNaN(percent)) return null;
        return Math.max(0, Math.min(255, Math.round(percent / 100 * 255)));
      }
      var numeric = Number.parseFloat(trimmed);
      if (Number.isNaN(numeric)) return null;
      return Math.max(0, Math.min(255, Math.round(numeric)));
    }
    function parseColorToRgb(color) {
      if (typeof color !== 'string') return null;
      var trimmed = color.trim();
      if (!trimmed) return null;
      var hexMatch = trimmed.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
      if (hexMatch) {
        var hex = hexMatch[1];
        if (hex.length === 3) {
          return {
            r: Number.parseInt(hex[0] + hex[0], 16),
            g: Number.parseInt(hex[1] + hex[1], 16),
            b: Number.parseInt(hex[2] + hex[2], 16)
          };
        }
        return {
          r: Number.parseInt(hex.slice(0, 2), 16),
          g: Number.parseInt(hex.slice(2, 4), 16),
          b: Number.parseInt(hex.slice(4, 6), 16)
        };
      }
      var rgbMatch = trimmed.match(/^rgba?\(([^)]+)\)$/i);
      if (rgbMatch) {
        var parts = rgbMatch[1].split(',');
        if (parts.length < 3) return null;
        var _parts = _slicedToArray(parts, 3),
          r = _parts[0],
          g = _parts[1],
          b = _parts[2];
        var red = parseRgbComponent(r);
        var green = parseRgbComponent(g);
        var blue = parseRgbComponent(b);
        if ([red, green, blue].some(function (component) {
          return component === null;
        })) return null;
        return {
          r: red,
          g: green,
          b: blue
        };
      }
      return null;
    }
    function computeRelativeLuminance(rgb) {
      if (!rgb || _typeof(rgb) !== 'object') return 0;
      var clamp = function clamp(component) {
        var numeric = Number(component);
        if (!Number.isFinite(numeric)) return 0;
        return Math.min(1, Math.max(0, numeric / 255));
      };
      var transform = function transform(value) {
        return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
      };
      var red = transform(clamp(rgb.r));
      var green = transform(clamp(rgb.g));
      var blue = transform(clamp(rgb.b));
      return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    }
    function computeSaturation(rgb) {
      if (!rgb || _typeof(rgb) !== 'object') return 0;
      var normalize = function normalize(component) {
        var numeric = Number(component);
        if (!Number.isFinite(numeric)) return 0;
        return Math.max(0, Math.min(1, numeric / 255));
      };
      var r = normalize(rgb.r);
      var g = normalize(rgb.g);
      var b = normalize(rgb.b);
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      if (max === 0) return 0;
      if (max === min) return 0;
      return (max - min) / max;
    }
    var PINK_REFERENCE_LUMINANCE = function () {
      var pinkRgb = parseColorToRgb(PINK_REFERENCE_COLOR);
      if (!pinkRgb) return 0.35;
      return computeRelativeLuminance(pinkRgb);
    }();
    function shouldEnableDarkModeAccentBoost() {
      var _ref24 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        color = _ref24.color,
        highContrast = _ref24.highContrast;
      if (typeof document === 'undefined') return false;
      if (!document.body || !document.body.classList.contains('dark-mode')) return false;
      if (document.body.classList.contains('pink-mode')) return false;
      if (highContrast) return false;
      if (typeof color !== 'string' || !color) return false;
      var rgb = parseColorToRgb(color);
      if (!rgb) return false;
      var luminance = computeRelativeLuminance(rgb);
      if (Math.abs(luminance - PINK_REFERENCE_LUMINANCE) <= PINK_LUMINANCE_TOLERANCE) {
        return true;
      }
      var saturation = computeSaturation(rgb);
      return luminance >= BRIGHT_ACCENT_LUMINANCE_THRESHOLD && saturation >= BRIGHT_ACCENT_MIN_SATURATION;
    }
    function refreshDarkModeAccentBoost() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (typeof document === 'undefined' || !document.body) return;
      var shouldEnable = shouldEnableDarkModeAccentBoost(options);
      document.body.classList.toggle(DARK_MODE_ACCENT_BOOST_CLASS, shouldEnable);
      updateInstallBannerColors();
    }
    var isHighContrastActive = function isHighContrastActive() {
      return typeof document !== 'undefined' && (document.documentElement.classList.contains('high-contrast') || document.body && document.body.classList.contains('high-contrast'));
    };
    var hasCustomAccentSelection = function hasCustomAccentSelection() {
      var normalized = normalizeAccentValue(accentColor);
      return normalized && normalized !== DEFAULT_ACCENT_NORMALIZED;
    };
    var shouldPreserveAccentInPinkMode = function shouldPreserveAccentInPinkMode() {
      return false;
    };
    var applyAccentColor = function applyAccentColor(color) {
      var highContrast = isHighContrastActive();
      var accentValue = highContrast ? HIGH_CONTRAST_ACCENT_COLOR : color;
      var rootStyle = document.documentElement.style;
      rootStyle.setProperty('--accent-color', accentValue);
      if (highContrast) {
        rootStyle.removeProperty('--link-color');
      } else {
        rootStyle.setProperty('--link-color', color);
      }
      if (document.body) {
        var bodyStyle = document.body.style;
        bodyStyle.setProperty('--accent-color', accentValue);
        if (highContrast) {
          bodyStyle.removeProperty('--link-color');
        } else {
          bodyStyle.setProperty('--link-color', color);
        }
      }
      refreshDarkModeAccentBoost({
        color: accentValue,
        highContrast: highContrast
      });
    };
    var clearAccentColorOverrides = function clearAccentColorOverrides() {
      var root = document.documentElement;
      var rootStyle = root && root.style;
      if (rootStyle) {
        rootStyle.removeProperty('--accent-color');
        rootStyle.removeProperty('--link-color');
      }
      if (document.body) {
        var bodyStyle = document.body.style;
        bodyStyle.removeProperty('--accent-color');
        bodyStyle.removeProperty('--link-color');
      }
      refreshDarkModeAccentBoost({
        color: null,
        highContrast: isHighContrastActive()
      });
    };
    try {
      var storedAccent = localStorage.getItem('accentColor');
      if (storedAccent) {
        accentColor = storedAccent;
        applyAccentColor(accentColor);
      }
    } catch (e) {
      console.warn('Could not load accent color', e);
    }
    prevAccentColor = accentColor;
    updateAccentColorResetButtonState();
    if (accentColorInputElement) {
      accentColorInputElement.addEventListener('input', function () {
        if (typeof document !== 'undefined' && document.body && document.body.classList.contains('pink-mode')) {
          updateAccentColorResetButtonState();
          return;
        }
        var color = accentColorInputElement.value;
        applyAccentColor(color);
        updateAccentColorResetButtonState();
      });
    }
    if (accentColorResetButtonElement && accentColorInputElement) {
      accentColorResetButtonElement.addEventListener('click', function () {
        if (accentColorResetButtonElement.disabled || accentColorInputElement.disabled) return;
        if (typeof document !== 'undefined' && document.body && document.body.classList.contains('pink-mode')) {
          updateAccentColorResetButtonState();
          return;
        }
        var currentValue = normalizeAccentValue(accentColorInputElement.value || '');
        if (currentValue === DEFAULT_ACCENT_NORMALIZED) {
          updateAccentColorResetButtonState();
          return;
        }
        accentColorInputElement.value = DEFAULT_ACCENT_COLOR;
        var eventHandled = false;
        try {
          var inputEvent = new Event('input', {
            bubbles: true
          });
          eventHandled = accentColorInputElement.dispatchEvent(inputEvent);
        } catch (error) {
          void error;
          if (typeof document !== 'undefined' && document.createEvent) {
            var legacyEvent = document.createEvent('Event');
            legacyEvent.initEvent('input', true, true);
            eventHandled = accentColorInputElement.dispatchEvent(legacyEvent);
          }
        }
        if (!eventHandled) {
          applyAccentColor(DEFAULT_ACCENT_COLOR);
        }
        updateAccentColorResetButtonState();
      });
    }
    var fontSize = '16';
    var fontFamily = "'Ubuntu', sans-serif";
    var uiScaleRoot = document.documentElement;
    var defaultUIScaleValues = {
      '--page-padding': 20,
      '--gap-size': 10,
      '--button-size': 24,
      '--border-radius': 5,
      '--form-label-width': 150,
      '--form-label-min-width': 120,
      '--form-action-width': 110
    };
    var uiScaleProperties = Object.keys(defaultUIScaleValues);
    var baseUIScaleValues = _objectSpread({}, defaultUIScaleValues);
    var baseFontSize = 16;
    if (uiScaleRoot) {
      try {
        var computedStyle = getComputedStyle(uiScaleRoot);
        var computedFontSize = parseFloat(computedStyle.fontSize);
        if (Number.isFinite(computedFontSize) && computedFontSize > 0) {
          baseFontSize = computedFontSize;
        }
        var _iterator19 = _createForOfIteratorHelper(uiScaleProperties),
          _step19;
        try {
          for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
            var prop = _step19.value;
            var value = parseFloat(computedStyle.getPropertyValue(prop));
            if (Number.isFinite(value) && value > 0) {
              baseUIScaleValues[prop] = value;
            }
          }
        } catch (err) {
          _iterator19.e(err);
        } finally {
          _iterator19.f();
        }
      } catch (error) {
        console.warn('Unable to read computed styles for UI scaling', error);
      }
    }
    var customFontStorageKeyName = typeof CUSTOM_FONT_STORAGE_KEY_NAME !== 'undefined' ? CUSTOM_FONT_STORAGE_KEY_NAME : typeof CUSTOM_FONT_STORAGE_KEY !== 'undefined' ? CUSTOM_FONT_STORAGE_KEY : 'cameraPowerPlanner_customFonts';
    var customFontEntries = new Map();
    var SUPPORTED_FONT_TYPES = new Set(['font/ttf', 'font/otf', 'font/woff', 'font/woff2', 'application/font-woff', 'application/font-woff2', 'application/x-font-ttf', 'application/x-font-opentype']);
    var SUPPORTED_FONT_EXTENSIONS = ['.ttf', '.otf', '.ttc', '.woff', '.woff2'];
    function loadCustomFontMetadataFromStorage() {
      if (typeof localStorage === 'undefined') return [];
      try {
        var raw = localStorage.getItem(customFontStorageKeyName);
        if (!raw) return [];
        var parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.map(function (entry) {
          return {
            id: entry && typeof entry.id === 'string' ? entry.id : null,
            name: entry && typeof entry.name === 'string' ? entry.name : '',
            data: entry && typeof entry.data === 'string' ? entry.data : ''
          };
        }).filter(function (entry) {
          return entry.id && entry.name && entry.data;
        });
      } catch (error) {
        console.warn('Failed to load stored custom fonts', error);
        return [];
      }
    }
    function persistCustomFontsToStorage() {
      if (typeof localStorage === 'undefined') return true;
      try {
        var payload = Array.from(customFontEntries.values()).map(function (entry) {
          return {
            id: entry.id,
            name: entry.name,
            data: entry.data
          };
        });
        localStorage.setItem(customFontStorageKeyName, JSON.stringify(payload));
        return true;
      } catch (error) {
        console.warn('Could not save custom fonts', error);
        return false;
      }
    }
    function sanitizeCustomFontName(name) {
      if (!name) return 'Custom Font';
      var trimmed = String(name).trim();
      if (!trimmed) return 'Custom Font';
      return trimmed.replace(/\s+/g, ' ').slice(0, 80);
    }
    function deriveFontNameFromFile(file) {
      if (!file) return 'Custom Font';
      var rawName = typeof file.name === 'string' ? file.name : '';
      if (!rawName) return 'Custom Font';
      var withoutExtension = rawName.replace(/\.[^.]+$/, '');
      var candidate = withoutExtension || rawName;
      return sanitizeCustomFontName(candidate);
    }
    function ensureUniqueCustomFontName(baseName) {
      var sanitizedBase = sanitizeCustomFontName(baseName);
      if (!settingsFontFamily) return sanitizedBase;
      var candidate = sanitizedBase;
      var suffix = 2;
      while (Array.from(settingsFontFamily.options).some(function (opt) {
        return opt.value === buildFontFamilyValue(candidate);
      })) {
        candidate = "".concat(sanitizedBase, " ").concat(suffix);
        suffix += 1;
      }
      return candidate;
    }
    function cssEscapeFontName(name) {
      if (typeof CSS !== 'undefined' && CSS && typeof CSS.escape === 'function') {
        return CSS.escape(name);
      }
      return String(name).replace(/['"\\]/g, function (match) {
        return "\\".concat(match);
      });
    }
    function registerCustomFontSource(_x, _x2, _x3) {
      return _registerCustomFontSource.apply(this, arguments);
    }
    function _registerCustomFontSource() {
      _registerCustomFontSource = _asyncToGenerator(_regenerator().m(function _callee4(name, dataUrl, id) {
        var loaded, fontFace, safeId, styleId, styleElement, escapedName, _t3, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              if (!(!name || !dataUrl || typeof document === 'undefined')) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2, false);
            case 1:
              loaded = false;
              if (!(typeof FontFace === 'function' && document.fonts && typeof document.fonts.add === 'function')) {
                _context4.n = 5;
                break;
              }
              _context4.p = 2;
              fontFace = new FontFace(name, "url(".concat(dataUrl, ")"));
              _context4.n = 3;
              return fontFace.load();
            case 3:
              document.fonts.add(fontFace);
              loaded = true;
              _context4.n = 5;
              break;
            case 4:
              _context4.p = 4;
              _t3 = _context4.v;
              console.warn('Failed to load custom font via FontFace', _t3);
            case 5:
              if (loaded) {
                _context4.n = 8;
                break;
              }
              _context4.p = 6;
              safeId = id || cssEscapeFontName(name).replace(/[^a-z0-9_-]+/gi, '-');
              styleId = "customFontStyle-".concat(safeId);
              styleElement = document.getElementById(styleId);
              if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.id = styleId;
                if (document.head) {
                  document.head.appendChild(styleElement);
                } else {
                  document.body.appendChild(styleElement);
                }
              }
              escapedName = cssEscapeFontName(name);
              styleElement.textContent = "@font-face { font-family: '".concat(escapedName, "'; src: url(").concat(dataUrl, "); font-display: swap; }");
              loaded = true;
              _context4.n = 8;
              break;
            case 7:
              _context4.p = 7;
              _t4 = _context4.v;
              console.warn('Failed to inject custom font style', _t4);
              return _context4.a(2, false);
            case 8:
              return _context4.a(2, loaded);
          }
        }, _callee4, null, [[6, 7], [2, 4]]);
      }));
      return _registerCustomFontSource.apply(this, arguments);
    }
    function applyStoredCustomFont(_x4) {
      return _applyStoredCustomFont.apply(this, arguments);
    }
    function _applyStoredCustomFont() {
      _applyStoredCustomFont = _asyncToGenerator(_regenerator().m(function _callee5(entry) {
        var value, _ensureFontFamilyOpti, option;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              if (!(!entry || !entry.id)) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2, null);
            case 1:
              value = buildFontFamilyValue(entry.name);
              _ensureFontFamilyOpti = ensureFontFamilyOption(value, entry.name, localFontsGroup, 'uploaded'), option = _ensureFontFamilyOpti.option;
              if (option) {
                option.dataset.fontId = entry.id;
              }
              _context5.n = 2;
              return registerCustomFontSource(entry.name, entry.data, entry.id);
            case 2:
              return _context5.a(2, value);
          }
        }, _callee5);
      }));
      return _applyStoredCustomFont.apply(this, arguments);
    }
    function loadStoredCustomFonts() {
      return _loadStoredCustomFonts.apply(this, arguments);
    }
    function _loadStoredCustomFonts() {
      _loadStoredCustomFonts = _asyncToGenerator(_regenerator().m(function _callee6() {
        var stored, _iterator22, _step22, entry, normalized, _t5, _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              stored = loadCustomFontMetadataFromStorage();
              if (stored.length) {
                _context6.n = 1;
                break;
              }
              return _context6.a(2);
            case 1:
              _iterator22 = _createForOfIteratorHelper(stored);
              _context6.p = 2;
              _iterator22.s();
            case 3:
              if ((_step22 = _iterator22.n()).done) {
                _context6.n = 8;
                break;
              }
              entry = _step22.value;
              normalized = {
                id: entry.id,
                name: sanitizeCustomFontName(entry.name),
                data: entry.data
              };
              customFontEntries.set(normalized.id, normalized);
              _context6.p = 4;
              _context6.n = 5;
              return applyStoredCustomFont(normalized);
            case 5:
              _context6.n = 7;
              break;
            case 6:
              _context6.p = 6;
              _t5 = _context6.v;
              console.warn('Failed to restore custom font', normalized.name, _t5);
            case 7:
              _context6.n = 3;
              break;
            case 8:
              _context6.n = 10;
              break;
            case 9:
              _context6.p = 9;
              _t6 = _context6.v;
              _iterator22.e(_t6);
            case 10:
              _context6.p = 10;
              _iterator22.f();
              return _context6.f(10);
            case 11:
              return _context6.a(2);
          }
        }, _callee6, null, [[4, 6], [2, 9, 10, 11]]);
      }));
      return _loadStoredCustomFonts.apply(this, arguments);
    }
    function resetCustomFontsForFactoryReset() {
      var hadEntries = customFontEntries && typeof customFontEntries.size === 'number' ? customFontEntries.size > 0 : false;
      if (customFontEntries && typeof customFontEntries.clear === 'function') {
        customFontEntries.clear();
      }
      var removedUploadedOption = false;
      if (settingsFontFamily && settingsFontFamily.options) {
        var options = Array.from(settingsFontFamily.options || []);
        options.forEach(function (option) {
          if (!option || !option.dataset || option.dataset.source !== 'uploaded') {
            return;
          }
          removedUploadedOption = true;
          var fontId = option.dataset.fontId || '';
          if (option.parentNode && typeof option.parentNode.removeChild === 'function') {
            option.parentNode.removeChild(option);
          } else if (typeof settingsFontFamily.removeChild === 'function') {
            settingsFontFamily.removeChild(option);
          }
          if (fontId && typeof document !== 'undefined') {
            var styleId = "customFontStyle-".concat(fontId);
            var styleNode = document.getElementById(styleId);
            if (styleNode && styleNode.parentNode) {
              styleNode.parentNode.removeChild(styleNode);
            }
          }
        });
        var hasCurrentSelection = options.some(function (option) {
          return option && option.value === settingsFontFamily.value;
        });
        if (!hasCurrentSelection) {
          if (settingsFontFamily.options.length) {
            settingsFontFamily.selectedIndex = 0;
          } else {
            settingsFontFamily.value = '';
          }
        }
      }
      if (typeof document !== 'undefined' && document.querySelectorAll) {
        var inlineStyles = document.querySelectorAll('style[id^="customFontStyle-"]');
        inlineStyles.forEach(function (styleNode) {
          if (styleNode && styleNode.parentNode) {
            styleNode.parentNode.removeChild(styleNode);
          }
        });
      }
      if (typeof setLocalFontsStatus === 'function' && (hadEntries || removedUploadedOption)) {
        setLocalFontsStatus(null);
      }
    }
    function isSupportedFontFile(file) {
      if (!file) return false;
      var type = typeof file.type === 'string' ? file.type.toLowerCase() : '';
      if (type && SUPPORTED_FONT_TYPES.has(type)) {
        return true;
      }
      var name = typeof file.name === 'string' ? file.name.toLowerCase() : '';
      return SUPPORTED_FONT_EXTENSIONS.some(function (ext) {
        return name.endsWith(ext);
      });
    }
    function readFileAsDataURL(file) {
      return new Promise(function (resolve, reject) {
        if (typeof FileReader !== 'function') {
          reject(new Error('FileReader is unavailable'));
          return;
        }
        var reader = new FileReader();
        reader.onload = function () {
          return resolve(reader.result);
        };
        reader.onerror = function () {
          return reject(reader.error || new Error('Failed to read file'));
        };
        try {
          reader.readAsDataURL(file);
        } catch (error) {
          reject(error);
        }
      });
    }
    function addCustomFontFromData(_x5, _x6) {
      return _addCustomFontFromData.apply(this, arguments);
    }
    function _addCustomFontFromData() {
      _addCustomFontFromData = _asyncToGenerator(_regenerator().m(function _callee7(name, dataUrl) {
        var _ref48,
          _ref48$persist,
          persist,
          uniqueName,
          value,
          _ensureFontFamilyOpti2,
          option,
          entryId,
          entry,
          persisted,
          _args7 = arguments;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              _ref48 = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {}, _ref48$persist = _ref48.persist, persist = _ref48$persist === void 0 ? true : _ref48$persist;
              uniqueName = ensureUniqueCustomFontName(name);
              value = buildFontFamilyValue(uniqueName);
              _ensureFontFamilyOpti2 = ensureFontFamilyOption(value, uniqueName, localFontsGroup, 'uploaded'), option = _ensureFontFamilyOpti2.option;
              if (option) {
                _context7.n = 1;
                break;
              }
              return _context7.a(2, {
                name: uniqueName,
                value: value,
                persisted: false
              });
            case 1:
              entryId = option.dataset.fontId;
              if (!entryId) {
                entryId = "custom-font-".concat(Date.now(), "-").concat(Math.random().toString(36).slice(2));
                option.dataset.fontId = entryId;
              }
              entry = {
                id: entryId,
                name: uniqueName,
                data: dataUrl
              };
              customFontEntries.set(entryId, entry);
              _context7.n = 2;
              return registerCustomFontSource(uniqueName, dataUrl, entryId);
            case 2:
              persisted = true;
              if (persist && !persistCustomFontsToStorage()) {
                persisted = false;
              }
              return _context7.a(2, {
                name: uniqueName,
                value: value,
                persisted: persisted
              });
          }
        }, _callee7);
      }));
      return _addCustomFontFromData.apply(this, arguments);
    }
    function handleLocalFontFiles(_x7) {
      return _handleLocalFontFiles.apply(this, arguments);
    }
    function _handleLocalFontFiles() {
      _handleLocalFontFiles = _asyncToGenerator(_regenerator().m(function _callee8(fileList) {
        var added, unsupported, failed, persistFailure, _i10, _Array$from, file, dataUrl, result, message, _message9, _message0, _t7;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              if (!(!fileList || fileList.length === 0)) {
                _context8.n = 1;
                break;
              }
              setLocalFontsStatus('localFontsNoFonts');
              return _context8.a(2);
            case 1:
              if (localFontsButtonElement) {
                localFontsButtonElement.disabled = true;
              }
              added = [];
              unsupported = [];
              failed = [];
              persistFailure = false;
              _i10 = 0, _Array$from = Array.from(fileList);
            case 2:
              if (!(_i10 < _Array$from.length)) {
                _context8.n = 9;
                break;
              }
              file = _Array$from[_i10];
              if (isSupportedFontFile(file)) {
                _context8.n = 3;
                break;
              }
              unsupported.push(file && typeof file.name === 'string' ? file.name : '');
              return _context8.a(3, 8);
            case 3:
              _context8.p = 3;
              _context8.n = 4;
              return readFileAsDataURL(file);
            case 4:
              dataUrl = _context8.v;
              if (dataUrl) {
                _context8.n = 5;
                break;
              }
              failed.push(file && file.name ? file.name : '');
              return _context8.a(3, 8);
            case 5:
              _context8.n = 6;
              return addCustomFontFromData(deriveFontNameFromFile(file), dataUrl);
            case 6:
              result = _context8.v;
              added.push(result);
              if (!result.persisted) {
                persistFailure = true;
              }
              _context8.n = 8;
              break;
            case 7:
              _context8.p = 7;
              _t7 = _context8.v;
              console.warn('Failed to import custom font', _t7);
              failed.push(file && typeof file.name === 'string' ? file.name : '');
            case 8:
              _i10++;
              _context8.n = 2;
              break;
            case 9:
              if (added.length > 0) {
                if (settingsFontFamily) {
                  settingsFontFamily.value = added[0].value;
                }
                setLocalFontsStatus('localFontsAdded', added.map(function (item) {
                  return item.name;
                }).join(', '));
              } else if (unsupported.length > 0) {
                setLocalFontsStatus('localFontsUnsupportedFiles', unsupported.join(', '));
              } else if (failed.length > 0) {
                setLocalFontsStatus('localFontsError');
              } else {
                setLocalFontsStatus('localFontsNoFonts');
              }
              if (persistFailure) {
                message = getLocalizedText('localFontsSaveError');
                if (message) {
                  showNotification('warning', message);
                }
              }
              if (unsupported.length > 0 && added.length > 0) {
                _message9 = getLocalizedText('localFontsUnsupportedFiles');
                if (_message9) {
                  showNotification('warning', _message9.replace('%s', unsupported.join(', ')));
                }
              }
              if (failed.length > 0) {
                _message0 = getLocalizedText('localFontsError');
                if (_message0) {
                  showNotification('error', _message0);
                }
              }
              if (localFontsButtonElement) {
                localFontsButtonElement.disabled = false;
              }
            case 10:
              return _context8.a(2);
          }
        }, _callee8, null, [[3, 7]]);
      }));
      return _handleLocalFontFiles.apply(this, arguments);
    }
    function normalizeFontResults(_x8) {
      return _normalizeFontResults.apply(this, arguments);
    }
    function _normalizeFontResults() {
      _normalizeFontResults = _asyncToGenerator(_regenerator().m(function _callee9(result) {
        var hasSymbol, asyncIteratorSymbol, fonts, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, font, iteratorSymbol, _t8;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              if (result) {
                _context9.n = 1;
                break;
              }
              return _context9.a(2, []);
            case 1:
              if (!Array.isArray(result)) {
                _context9.n = 2;
                break;
              }
              return _context9.a(2, result);
            case 2:
              hasSymbol = typeof Symbol === 'function';
              asyncIteratorSymbol = hasSymbol && Symbol.asyncIterator;
              if (!(asyncIteratorSymbol && typeof result[asyncIteratorSymbol] === 'function')) {
                _context9.n = 15;
                break;
              }
              fonts = [];
              _iteratorAbruptCompletion = false;
              _didIteratorError = false;
              _context9.p = 3;
              _iterator = _asyncIterator(result);
            case 4:
              _context9.n = 5;
              return _iterator.next();
            case 5:
              if (!(_iteratorAbruptCompletion = !(_step = _context9.v).done)) {
                _context9.n = 7;
                break;
              }
              font = _step.value;
              fonts.push(font);
            case 6:
              _iteratorAbruptCompletion = false;
              _context9.n = 4;
              break;
            case 7:
              _context9.n = 9;
              break;
            case 8:
              _context9.p = 8;
              _t8 = _context9.v;
              _didIteratorError = true;
              _iteratorError = _t8;
            case 9:
              _context9.p = 9;
              _context9.p = 10;
              if (!(_iteratorAbruptCompletion && _iterator.return != null)) {
                _context9.n = 11;
                break;
              }
              _context9.n = 11;
              return _iterator.return();
            case 11:
              _context9.p = 11;
              if (!_didIteratorError) {
                _context9.n = 12;
                break;
              }
              throw _iteratorError;
            case 12:
              return _context9.f(11);
            case 13:
              return _context9.f(9);
            case 14:
              return _context9.a(2, fonts);
            case 15:
              iteratorSymbol = hasSymbol && Symbol.iterator;
              if (!(iteratorSymbol && typeof result[iteratorSymbol] === 'function')) {
                _context9.n = 16;
                break;
              }
              return _context9.a(2, Array.from(result));
            case 16:
              return _context9.a(2, []);
          }
        }, _callee9, null, [[10,, 11, 13], [3, 8, 9, 14]]);
      }));
      return _normalizeFontResults.apply(this, arguments);
    }
    var queryAvailableLocalFonts = function () {
      if (typeof window === 'undefined') return null;
      if (typeof window.queryLocalFonts === 'function') {
        return function () {
          var _ref25 = _asyncToGenerator(_regenerator().m(function _callee(options) {
            var _t;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  _t = normalizeFontResults;
                  _context.n = 1;
                  return window.queryLocalFonts(options);
                case 1:
                  return _context.a(2, _t(_context.v));
              }
            }, _callee);
          }));
          return function (_x9) {
            return _ref25.apply(this, arguments);
          };
        }();
      }
      if (typeof navigator !== 'undefined' && navigator && navigator.fonts && typeof navigator.fonts.query === 'function') {
        var _navigator = navigator,
          fonts = _navigator.fonts;
        return function () {
          var _ref26 = _asyncToGenerator(_regenerator().m(function _callee2(options) {
            var _t2;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  _t2 = normalizeFontResults;
                  _context2.n = 1;
                  return fonts.query.call(fonts, options);
                case 1:
                  return _context2.a(2, _t2(_context2.v));
              }
            }, _callee2);
          }));
          return function (_x0) {
            return _ref26.apply(this, arguments);
          };
        }();
      }
      return null;
    }();
    var supportsLocalFonts = typeof queryAvailableLocalFonts === 'function';
    var localFontsButtonElement = resolveGlobalElement('localFontsButton', 'localFontsButton');
    var localFontsInputElement = resolveGlobalElement('localFontsInput', 'localFontsInput');
    var settingsFontFamily = typeof settingsFontFamily !== 'undefined' ? settingsFontFamily : resolveGlobalElement('settingsFontFamily', 'settingsFontFamily');
    var settingsFontSize = typeof settingsFontSize !== 'undefined' ? settingsFontSize : resolveGlobalElement('settingsFontSize', 'settingsFontSize');
    var canUploadFontFiles = !!(localFontsInputElement && typeof window !== 'undefined' && typeof window.FileReader === 'function' && typeof localFontsInputElement.click === 'function');
    function getLocalizedText(key) {
      if (texts[currentLang] && texts[currentLang][key]) return texts[currentLang][key];
      if (texts.en && texts.en[key]) return texts.en[key];
      return '';
    }
    function guessFontFallback(name) {
      if (!name) return 'sans-serif';
      var lower = name.toLowerCase();
      if (/(mono|code|console|courier|menlo|fixed|inconsolata|monaco)/.test(lower)) {
        return 'monospace';
      }
      if (/(serif|times|garamond|georgia|baskerville|roman|palatino|bodoni|bookman)/.test(lower)) {
        return 'serif';
      }
      if (/(script|hand|brush|cursive|callig|marker)/.test(lower)) {
        return 'cursive';
      }
      return 'sans-serif';
    }
    function buildFontFamilyValue(name) {
      if (!name) return fontFamily;
      var escaped = name.replace(/\\/g, '\\').replace(/'/g, "\\'");
      return "'".concat(escaped, "', ").concat(guessFontFallback(name));
    }
    function extractFontLabel(value) {
      if (!value) return '';
      var trimmed = value.trim();
      if (!trimmed) return '';
      var firstChar = trimmed[0];
      if (firstChar === "'" || firstChar === '"') {
        var result = '';
        for (var i = 1; i < trimmed.length; i += 1) {
          var ch = trimmed[i];
          if (ch === '\\') {
            if (i + 1 < trimmed.length) {
              result += trimmed[i + 1];
              i += 1;
            }
          } else if (ch === firstChar) {
            return result;
          } else {
            result += ch;
          }
        }
        return result;
      }
      var commaIdx = trimmed.indexOf(',');
      if (commaIdx !== -1) return trimmed.slice(0, commaIdx).trim();
      return trimmed;
    }
    function ensureFontFamilyOption(value, label, targetGroup, source) {
      if (!settingsFontFamily || !value) {
        return {
          option: null,
          created: false
        };
      }
      var existing = Array.from(settingsFontFamily.options).find(function (opt) {
        return opt.value === value;
      });
      if (existing) {
        if (source) existing.dataset.source = source;
        if (label && !existing.textContent.trim()) existing.textContent = label;
        return {
          option: existing,
          created: false
        };
      }
      var option = document.createElement('option');
      option.value = value;
      option.textContent = label || extractFontLabel(value);
      if (source) option.dataset.source = source;
      var container = targetGroup && typeof targetGroup.appendChild === 'function' ? targetGroup : settingsFontFamily;
      container.appendChild(option);
      return {
        option: option,
        created: true
      };
    }
    function setLocalFontsStatus(key, replacement) {
      if (!localFontsStatus || !key) {
        if (localFontsStatus) {
          localFontsStatus.textContent = '';
          localFontsStatus.setAttribute('hidden', '');
          delete localFontsStatus.dataset.statusKey;
          delete localFontsStatus.dataset.statusArg;
        }
        return;
      }
      var template = getLocalizedText(key);
      var hasReplacement = replacement !== undefined && replacement !== null;
      var message = template;
      if (hasReplacement) {
        var replacementText = String(replacement);
        message = template ? template.replace('%s', replacementText) : replacementText;
        localFontsStatus.dataset.statusArg = replacementText;
      } else {
        delete localFontsStatus.dataset.statusArg;
      }
      localFontsStatus.dataset.statusKey = key;
      localFontsStatus.textContent = message;
      localFontsStatus.removeAttribute('hidden');
    }
    function requestLocalFonts() {
      return _requestLocalFonts.apply(this, arguments);
    }
    function _requestLocalFonts() {
      _requestLocalFonts = _asyncToGenerator(_regenerator().m(function _callee0() {
        var fonts, added, duplicates, seenValues, _iterator23, _step23, font, rawName, name, _value4, _ensureFontFamilyOpti3, option, created, _t9, _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              if (!(!supportsLocalFonts || !localFontsButtonElement || !queryAvailableLocalFonts)) {
                _context0.n = 1;
                break;
              }
              return _context0.a(2);
            case 1:
              localFontsButtonElement.disabled = true;
              _context0.p = 2;
              _context0.n = 3;
              return queryAvailableLocalFonts();
            case 3:
              fonts = _context0.v;
              if (!(!Array.isArray(fonts) || fonts.length === 0)) {
                _context0.n = 4;
                break;
              }
              setLocalFontsStatus('localFontsNoFonts');
              return _context0.a(2);
            case 4:
              added = [];
              duplicates = [];
              seenValues = new Set();
              _iterator23 = _createForOfIteratorHelper(fonts);
              _context0.p = 5;
              _iterator23.s();
            case 6:
              if ((_step23 = _iterator23.n()).done) {
                _context0.n = 11;
                break;
              }
              font = _step23.value;
              rawName = font && (font.family || font.fullName || font.postscriptName);
              name = rawName ? String(rawName).trim() : '';
              if (name) {
                _context0.n = 7;
                break;
              }
              return _context0.a(3, 10);
            case 7:
              _value4 = buildFontFamilyValue(name);
              if (!seenValues.has(_value4)) {
                _context0.n = 8;
                break;
              }
              duplicates.push(name);
              return _context0.a(3, 10);
            case 8:
              _ensureFontFamilyOpti3 = ensureFontFamilyOption(_value4, name, localFontsGroup, 'local'), option = _ensureFontFamilyOpti3.option, created = _ensureFontFamilyOpti3.created;
              if (option) {
                _context0.n = 9;
                break;
              }
              return _context0.a(3, 10);
            case 9:
              seenValues.add(option.value);
              if (created) {
                added.push({
                  name: name,
                  value: option.value
                });
              } else {
                duplicates.push(name);
              }
            case 10:
              _context0.n = 6;
              break;
            case 11:
              _context0.n = 13;
              break;
            case 12:
              _context0.p = 12;
              _t9 = _context0.v;
              _iterator23.e(_t9);
            case 13:
              _context0.p = 13;
              _iterator23.f();
              return _context0.f(13);
            case 14:
              if (added.length > 0) {
                if (settingsFontFamily) {
                  settingsFontFamily.value = added[0].value;
                }
                setLocalFontsStatus('localFontsAdded', added.map(function (item) {
                  return item.name;
                }).join(', '));
              } else if (duplicates.length > 0) {
                setLocalFontsStatus('localFontsAlreadyAdded', duplicates.join(', '));
              } else {
                setLocalFontsStatus('localFontsNoFonts');
              }
              _context0.n = 16;
              break;
            case 15:
              _context0.p = 15;
              _t0 = _context0.v;
              console.error('Could not access local fonts', _t0);
              if (_t0 && (_t0.name === 'NotAllowedError' || _t0.name === 'SecurityError') && canUploadFontFiles) {
                setLocalFontsStatus('localFontsPermissionNeeded');
              } else {
                setLocalFontsStatus('localFontsError');
              }
            case 16:
              _context0.p = 16;
              localFontsButtonElement.disabled = false;
              return _context0.f(16);
            case 17:
              return _context0.a(2);
          }
        }, _callee0, null, [[5, 12, 13, 14], [2, 15, 16, 17]]);
      }));
      return _requestLocalFonts.apply(this, arguments);
    }
    if (localFontsButtonElement) {
      if (supportsLocalFonts || canUploadFontFiles) {
        localFontsButtonElement.removeAttribute('hidden');
        localFontsButtonElement.addEventListener('click', function () {
          if (supportsLocalFonts) {
            requestLocalFonts();
          } else if (canUploadFontFiles && localFontsInputElement) {
            localFontsInputElement.click();
          }
        });
        if (!supportsLocalFonts && canUploadFontFiles) {
          setLocalFontsStatus('localFontsFileFallback');
        }
      } else {
        setLocalFontsStatus('localFontsUnsupported');
      }
    }
    if (localFontsInputElement) {
      localFontsInputElement.addEventListener('change', function () {
        if (localFontsInputElement.files && localFontsInputElement.files.length > 0) {
          handleLocalFontFiles(localFontsInputElement.files);
        } else {
          setLocalFontsStatus('localFontsNoFonts');
        }
        try {
          localFontsInputElement.value = '';
        } catch (_unused6) {}
      });
    }
    loadStoredCustomFonts().catch(function (error) {
      console.warn('Unable to restore stored custom fonts', error);
    });
    function applyFontSize(size) {
      var numericSize = parseFloat(size);
      if (!Number.isFinite(numericSize) || numericSize <= 0) {
        return;
      }
      document.documentElement.style.fontSize = "".concat(numericSize, "px");
      if (!Number.isFinite(baseFontSize) || baseFontSize <= 0) {
        return;
      }
      var scale = numericSize / baseFontSize;
      var _iterator20 = _createForOfIteratorHelper(uiScaleProperties),
        _step20;
      try {
        for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
          var _prop = _step20.value;
          var baseValue = baseUIScaleValues[_prop];
          if (!Number.isFinite(baseValue) || baseValue <= 0) continue;
          document.documentElement.style.setProperty(_prop, "".concat(baseValue * scale, "px"));
        }
      } catch (err) {
        _iterator20.e(err);
      } finally {
        _iterator20.f();
      }
      document.documentElement.style.setProperty('--ui-scale', String(scale));
    }
    function applyFontFamily(family) {
      document.documentElement.style.setProperty('--font-family', family);
    }
    try {
      var storedSize = localStorage.getItem('fontSize');
      if (storedSize) {
        fontSize = storedSize;
        applyFontSize(fontSize);
      }
      var storedFamily = localStorage.getItem('fontFamily');
      if (storedFamily) {
        fontFamily = storedFamily;
        applyFontFamily(fontFamily);
      }
    } catch (e) {
      console.warn('Could not load font preferences', e);
    }
    if (settingsFontSize) settingsFontSize.value = fontSize;
    if (settingsFontFamily) {
      var hasStoredOption = Array.from(settingsFontFamily.options).some(function (opt) {
        return opt.value === fontFamily;
      });
      if (!hasStoredOption && fontFamily) {
        ensureFontFamilyOption(fontFamily, extractFontLabel(fontFamily), localFontsGroup, 'local');
      }
      settingsFontFamily.value = fontFamily;
    }
    var revertAccentColor = function revertAccentColor() {
      if (document.body && document.body.classList.contains('pink-mode')) {
        if (shouldPreserveAccentInPinkMode()) {
          applyAccentColor(prevAccentColor);
        } else {
          clearAccentColorOverrides();
        }
        return;
      }
      applyAccentColor(prevAccentColor);
    };
    function populateFeatureSearch() {
      featureMap.clear();
      helpMap.clear();
      deviceMap.clear();
      featureSearchEntries = [];
      featureSearchDefaultOptions = [];
      featureSearchEntryIndex.clear();
      var defaultOptionValues = new Set();
      var registerOption = function registerOption(entry) {
        var optionData = buildFeatureSearchOptionData(entry);
        if (!optionData || !optionData.value || defaultOptionValues.has(optionData.value)) {
          return;
        }
        defaultOptionValues.add(optionData.value);
        featureSearchDefaultOptions.push(optionData);
      };
      document.querySelectorAll('h2[id], legend[id], h3[id], h4[id]').forEach(function (el) {
        var _el$dataset;
        if (helpDialog && helpDialog.contains(el)) return;
        var name = el.textContent.trim();
        if (!name) return;
        var keywords = ((_el$dataset = el.dataset) === null || _el$dataset === void 0 ? void 0 : _el$dataset.searchKeywords) || el.getAttribute('data-search-keywords') || '';
        var entry = buildFeatureSearchEntry(el, {
          label: name,
          keywords: keywords
        });
        if (!entry || !entry.key) return;
        var display = entry.optionValue || entry.displayLabel || entry.baseLabel;
        if (!display) return;
        var entryData = {
          type: 'feature',
          key: entry.key,
          display: display,
          tokens: Array.isArray(entry.tokens) ? entry.tokens : [],
          primaryTokens: Array.isArray(entry.primaryTokens) ? entry.primaryTokens : [],
          value: entry,
          optionLabel: entry.displayLabel || entry.baseLabel || display,
          detail: buildFeatureEntryDetailText(entry)
        };
        registerOption(entryData);
        featureSearchEntries.push(entryData);
      });
      document.querySelectorAll(FEATURE_SEARCH_EXTRA_SELECTOR).forEach(function (el) {
        if (!el || helpDialog && helpDialog.contains(el)) return;
        var label = getFeatureSearchLabel(el);
        if (!label) return;
        var keywords = getFeatureSearchKeywords(el);
        var entry = buildFeatureSearchEntry(el, {
          label: label,
          keywords: keywords
        });
        if (!entry || !entry.key) return;
        var display = entry.optionValue || entry.displayLabel || entry.baseLabel;
        if (!display) return;
        var entryType = getFeatureSearchEntryType(el);
        var entryData = {
          type: entryType,
          key: entry.key,
          display: display,
          tokens: Array.isArray(entry.tokens) ? entry.tokens : [],
          primaryTokens: Array.isArray(entry.primaryTokens) ? entry.primaryTokens : [],
          value: entry,
          optionLabel: entry.displayLabel || entry.baseLabel || display,
          detail: buildFeatureEntryDetailText(entry)
        };
        registerOption(entryData);
        featureSearchEntries.push(entryData);
      });
      if (helpDialog) {
        helpDialog.querySelectorAll('section[data-help-section]').forEach(function (section) {
          var heading = section.querySelector('h3');
          if (!heading) return;
          var label = heading.textContent.trim();
          if (!label) return;
          var keywords = section.dataset.helpKeywords || '';
          var key = searchKey(label);
          var tokens = searchTokens("".concat(label, " ").concat(keywords).trim());
          var primaryTokens = searchTokens(label);
          var helpEntry = {
            section: section,
            label: label,
            tokens: tokens
          };
          helpMap.set(key, helpEntry);
          var optionValue = "".concat(label, " (help)");
          var helpData = {
            type: 'help',
            key: key,
            display: optionValue,
            tokens: tokens,
            primaryTokens: primaryTokens,
            value: helpEntry,
            optionLabel: label,
            detail: buildHelpSectionDetailText(section)
          };
          registerOption(helpData);
          featureSearchEntries.push(helpData);
        });
      }
      document.querySelectorAll('select').forEach(function (sel) {
        sel.querySelectorAll('option').forEach(function (opt) {
          var name = opt.textContent.trim();
          if (!name || opt.value === 'None') return;
          var key = searchKey(name);
          if (!deviceMap.has(key)) {
            var _opt$dataset, _sel$dataset;
            var keywords = ((_opt$dataset = opt.dataset) === null || _opt$dataset === void 0 ? void 0 : _opt$dataset.searchKeywords) || opt.getAttribute('data-search-keywords') || ((_sel$dataset = sel.dataset) === null || _sel$dataset === void 0 ? void 0 : _sel$dataset.searchKeywords) || sel.getAttribute('data-search-keywords') || '';
            var tokens = searchTokens("".concat(name, " ").concat(keywords).trim());
            var primaryTokens = searchTokens(name);
            var deviceEntry = {
              select: sel,
              value: opt.value,
              label: name,
              tokens: tokens
            };
            deviceMap.set(key, deviceEntry);
            var deviceData = {
              type: 'device',
              key: key,
              display: name,
              tokens: tokens,
              primaryTokens: primaryTokens,
              value: deviceEntry,
              optionLabel: name,
              detail: buildDeviceEntryDetailText(deviceEntry)
            };
            registerOption(deviceData);
            featureSearchEntries.push(deviceData);
          }
        });
      });
      featureSearchEntries.forEach(function (entry) {
        if (!entry || !entry.key) return;
        var type = entry.type || 'feature';
        var mapKey = buildFeatureSearchHistoryKey(entry.key, type);
        featureSearchEntryIndex.set(mapKey, entry);
      });
      loadFeatureSearchHistory();
      cleanupFeatureSearchHistory();
      renderFeatureListOptions(featureSearchDefaultOptions);
      if (featureSearch && featureSearch.value) {
        updateFeatureSearchSuggestions(featureSearch.value);
      }
    }
    function setEditProjectBtnText() {
      var btn = document.getElementById('editProjectBtn');
      if (btn) {
        btn.textContent = texts[currentLang].editProjectBtn;
        btn.setAttribute('title', texts[currentLang].editProjectBtn);
        btn.setAttribute('data-help', texts[currentLang].editProjectBtn);
      }
    }
    function ensureEditProjectButton() {
      var container = null;
      if (projectRequirementsOutput && !projectRequirementsOutput.classList.contains('hidden')) {
        container = projectRequirementsOutput;
      } else if (gearListOutput && !gearListOutput.classList.contains('hidden')) {
        container = gearListOutput;
      }
      if (!container) return;
      var btn = document.getElementById('editProjectBtn');
      if (!btn) {
        btn = document.createElement('button');
        btn.id = 'editProjectBtn';
      }
      var legacyButtonParent = btn.parentElement;
      if (legacyButtonParent && legacyButtonParent !== container && legacyButtonParent.id !== 'editProjectBtn') {
        legacyButtonParent.removeChild(btn);
      }
      if (!btn.dataset.editProjectBound) {
        btn.type = 'button';
        btn.addEventListener('click', function () {
          var infoForDialog = typeof getProjectDialogSeedInfo === 'function' ? getProjectDialogSeedInfo() : currentProjectInfo ? _objectSpread({}, currentProjectInfo) : projectForm ? collectProjectFormData() : {};
          if (typeof openProjectDialogWithInfo === 'function') {
            openProjectDialogWithInfo(infoForDialog);
          } else {
            if (projectForm) {
              populateProjectForm(infoForDialog || {});
            }
            openDialog(projectDialog);
          }
        });
        btn.dataset.editProjectBound = 'true';
      }
      var title = container.querySelector('h2');
      if (title && btn.parentElement !== container) {
        title.insertAdjacentElement('afterend', btn);
      } else if (!title && btn.parentElement !== container) {
        container.prepend(btn);
      }
      btn.type = 'button';
      setEditProjectBtnText();
    }
    function updateGearListButtonVisibility() {
      var hasGear = gearListOutput && !gearListOutput.classList.contains('hidden') && gearListOutput.innerHTML.trim() !== '';
      if (hasGear) {
        generateGearListBtn.classList.add('hidden');
        if (deleteGearListProjectBtn) {
          deleteGearListProjectBtn.classList.remove('hidden');
        }
        ensureEditProjectButton();
      } else {
        generateGearListBtn.classList.remove('hidden');
        if (deleteGearListProjectBtn) {
          deleteGearListProjectBtn.classList.add('hidden');
        }
        var btn = document.getElementById('editProjectBtn');
        if (btn) btn.remove();
      }
    }
    function annotateGearTableCategoryGroups(table) {
      if (!table) return;
      var groups = table.querySelectorAll('tbody.category-group');
      groups.forEach(function (group) {
        var headingCell = group.querySelector('.category-row td');
        if (!headingCell) return;
        var label = headingCell.textContent ? headingCell.textContent.trim() : '';
        if (!label) return;
        if (group.getAttribute('data-gear-table-category') === label) return;
        group.setAttribute('data-gear-table-category', label);
      });
    }
    function ensureGearTableCategoryGrouping(table) {
      if (!table) return;
      var doc = table.ownerDocument || (typeof document !== 'undefined' ? document : null);
      if (!doc) return;
      var existingCategoryGroups = table.querySelectorAll('tbody.category-group');
      if (existingCategoryGroups.length) {
        existingCategoryGroups.forEach(function (group) {
          if (!group.classList.contains('category-group')) {
            group.classList.add('category-group');
          }
        });
        table.querySelectorAll('tbody').forEach(function (group) {
          if (group.querySelector('tr.category-row')) {
            group.classList.add('category-group');
          }
        });
        annotateGearTableCategoryGroups(table);
        return;
      }
      var rows = Array.from(table.rows || []);
      if (!rows.length) return;
      var newGroups = [];
      var currentGroup = null;
      rows.forEach(function (row) {
        if (row.classList.contains('category-row')) {
          currentGroup = doc.createElement('tbody');
          currentGroup.className = 'category-group';
          currentGroup.appendChild(row);
          newGroups.push(currentGroup);
        } else {
          if (!currentGroup) {
            currentGroup = doc.createElement('tbody');
            currentGroup.className = 'category-group';
            newGroups.push(currentGroup);
          }
          currentGroup.appendChild(row);
        }
      });
      Array.from(table.tBodies || []).forEach(function (body) {
        if (!body.rows.length || !body.classList.contains('category-group')) {
          body.remove();
        }
      });
      newGroups.forEach(function (group) {
        if (group.rows.length) table.appendChild(group);
      });
      annotateGearTableCategoryGroups(table);
    }
    var overviewTitleCandidatesCache = null;
    function getOverviewTitleCandidates() {
      if (overviewTitleCandidatesCache && overviewTitleCandidatesCache.length) {
        return overviewTitleCandidatesCache;
      }
      var variants = new Set();
      if ((typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object' && texts !== null) {
        Object.values(texts).forEach(function (lang) {
          var label = lang && typeof lang.overviewTitle === 'string' ? lang.overviewTitle.trim() : '';
          if (label) variants.add(label);
        });
      }
      variants.add('Project Overview and Gear List');
      variants.add('Project Overview');
      overviewTitleCandidatesCache = Array.from(variants).filter(Boolean).sort(function (a, b) {
        return b.length - a.length;
      });
      return overviewTitleCandidatesCache;
    }
    function extractProjectNameFromHeading(titleElement) {
      if (!titleElement) return '';
      if (typeof titleElement.getAttribute === 'function') {
        var attrName = titleElement.getAttribute('data-project-name');
        if (typeof attrName === 'string') {
          var trimmed = attrName.trim();
          if (trimmed) return trimmed;
        }
      }
      var textValue = typeof titleElement.textContent === 'string' ? titleElement.textContent.replace(/\s+/g, ' ').trim() : '';
      if (!textValue) return '';
      var quoteMatch = textValue.match(/[“"']([^“”"']+)[”"']/);
      if (quoteMatch && quoteMatch[1] && quoteMatch[1].trim()) {
        return quoteMatch[1].trim();
      }
      var guillemetMatch = textValue.match(/[«‹]([^»›]+)[»›]/);
      if (guillemetMatch && guillemetMatch[1] && guillemetMatch[1].trim()) {
        return guillemetMatch[1].trim();
      }
      var overviewCandidates = getOverviewTitleCandidates();
      var lowerText = textValue.toLowerCase();
      var _iterator21 = _createForOfIteratorHelper(overviewCandidates),
        _step21;
      try {
        for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
          var label = _step21.value;
          var normalizedLabel = label.trim();
          if (!normalizedLabel) continue;
          var lowerLabel = normalizedLabel.toLowerCase();
          if (lowerText.startsWith(lowerLabel)) {
            var remainder = textValue.slice(normalizedLabel.length).trim();
            if (!remainder) return '';
            remainder = remainder.replace(/^(?:for|pour|für|per|para)\b\s*/i, '').trim();
            remainder = remainder.replace(/^(?:the|le|la|les|den|die|das|el|los|las)\b\s*/i, '').trim();
            remainder = remainder.replace(/^[–—:-]+/, '').trim();
            remainder = remainder.replace(/^["'“”«»‹›]+/, '').replace(/["'“”«»‹›]+$/, '').trim();
            if (remainder) return remainder;
            return '';
          }
        }
      } catch (err) {
        _iterator21.e(err);
      } finally {
        _iterator21.f();
      }
      if (overviewCandidates.some(function (label) {
        return lowerText === label.toLowerCase();
      })) {
        return '';
      }
      var stripped = textValue.replace(/^["'“”«»‹›]+/, '').replace(/["'“”«»‹›]+$/, '').trim();
      if (stripped && stripped !== textValue) {
        return stripped;
      }
      return textValue;
    }
    function splitGearListHtml(html) {
      if (!html) return {
        projectHtml: '',
        gearHtml: ''
      };
      if (_typeof(html) === 'object') {
        var legacyProject = html.projectHtml || html.project || '';
        var legacyGear = html.gearHtml || html.gear || '';
        if (legacyProject || legacyGear) {
          return {
            projectHtml: legacyProject,
            gearHtml: legacyGear
          };
        }
        html = html.gearList || '';
      }
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var title = doc.querySelector('h2');
      var reqGrid = doc.querySelector('.requirements-grid');
      var titleHtml = title ? title.outerHTML : '';
      var headingHtml = '';
      var headingNodeUsed = null;
      if (reqGrid) {
        var isHeadingTag = function isHeadingTag(element) {
          return Boolean(element && /^H[1-6]$/i.test(element.tagName));
        };
        var headingIsProjectTitle = function headingIsProjectTitle(element) {
          return Boolean(title && element && typeof element.isSameNode === 'function' && element.isSameNode(title));
        };
        var headingBeforeGrid = function headingBeforeGrid(element) {
          if (!element || typeof element.compareDocumentPosition !== 'function') return false;
          return Boolean(element.compareDocumentPosition(reqGrid) & Node.DOCUMENT_POSITION_FOLLOWING);
        };
        var headingNode = null;
        var sibling = reqGrid.previousElementSibling;
        while (sibling) {
          if (isHeadingTag(sibling) && !headingIsProjectTitle(sibling) && headingBeforeGrid(sibling)) {
            headingNode = sibling;
            break;
          }
          sibling = sibling.previousElementSibling;
        }
        if (!headingNode) {
          var parent = reqGrid.parentElement;
          if (parent) {
            var candidates = Array.from(parent.querySelectorAll('h1, h2, h3, h4, h5, h6'));
            for (var i = candidates.length - 1; i >= 0; i -= 1) {
              var candidate = candidates[i];
              if (!isHeadingTag(candidate)) continue;
              if (headingIsProjectTitle(candidate)) continue;
              if (headingBeforeGrid(candidate)) {
                headingNode = candidate;
                break;
              }
            }
          }
        }
        if (headingNode) {
          headingNodeUsed = headingNode;
          headingHtml = headingNode.outerHTML;
        } else {
          var fallbackLabel = reqGrid.getAttribute('data-heading') || 'Project Requirements';
          headingHtml = "<h3>".concat(escapeHtml(fallbackLabel), "</h3>");
        }
      }
      var projectHtml = reqGrid ? titleHtml + headingHtml + reqGrid.outerHTML : '';
      var projectName = extractProjectNameFromHeading(title);
      var table = doc.querySelector('.gear-table');
      if (!table) {
        var tables = Array.from(doc.querySelectorAll('table'));
        if (tables.length === 1) {
          table = tables[0];
        } else if (tables.length > 1) {
          var tableAfterGearHeading = tables.find(function (tbl) {
            var prev = tbl.previousElementSibling;
            return prev && prev.matches('h3') && /gear list/i.test(prev.textContent || '');
          });
          table = tableAfterGearHeading || tables[0];
        }
      }
      var gearHeadingHtml = projectName ? "<h2>Gear List: \u201C".concat(escapeHtml(projectName), "\u201D</h2>") : '';
      var gearHtml = '';
      if (table) {
        ensureGearTableCategoryGrouping(table);
        gearHtml = gearHeadingHtml + table.outerHTML;
      }
      if (!gearHtml) {
        var bodyClone = doc.body ? doc.body.cloneNode(true) : null;
        var bodyHtml = doc.body ? doc.body.innerHTML.trim() : '';
        if (bodyClone) {
          if (title) {
            var cloneTitle = bodyClone.querySelector('h2');
            if (cloneTitle) cloneTitle.remove();
          }
          if (headingNodeUsed) {
            var headingTag = headingNodeUsed.tagName ? headingNodeUsed.tagName.toLowerCase() : '';
            var headingText = headingNodeUsed.textContent ? headingNodeUsed.textContent.trim() : '';
            var cloneHeading = headingTag ? bodyClone.querySelector(headingTag) : null;
            if (cloneHeading && (!headingText || (cloneHeading.textContent || '').trim() === headingText)) {
              cloneHeading.remove();
            }
          } else {
            var _cloneHeading = bodyClone.querySelector('h3');
            if (_cloneHeading && /project requirements/i.test(_cloneHeading.textContent || '')) {
              _cloneHeading.remove();
            }
          }
          if (reqGrid) {
            var cloneGrid = bodyClone.querySelector('.requirements-grid');
            if (cloneGrid) cloneGrid.remove();
          }
          var fallbackHtml = bodyClone.innerHTML.trim();
          if (fallbackHtml) {
            gearHtml = fallbackHtml;
          } else if (bodyHtml) {
            gearHtml = bodyHtml;
          }
        } else if (bodyHtml) {
          gearHtml = bodyHtml;
        }
      }
      return {
        projectHtml: projectHtml,
        gearHtml: gearHtml
      };
    }
    registerGearListSplitImplementation(splitGearListHtml);
    function registerGearListSplitImplementation(fn) {
      var candidates = [];
      if ((typeof cineGearList === "undefined" ? "undefined" : _typeof(cineGearList)) === 'object' && cineGearList) {
        candidates.push(cineGearList);
      }
      if (typeof global !== 'undefined' && global && _typeof(global.cineGearList) === 'object' && global.cineGearList) {
        if (candidates.indexOf(global.cineGearList) === -1) {
          candidates.push(global.cineGearList);
        }
      }
      if (typeof require === 'function') {
        try {
          var required = require('./modules/gear-list.js');
          if (required && _typeof(required) === 'object' && candidates.indexOf(required) === -1) {
            candidates.push(required);
          }
        } catch (error) {
          void error;
        }
      }
      for (var index = 0; index < candidates.length; index += 1) {
        var candidate = candidates[index];
        if (!candidate || typeof candidate.setImplementation !== 'function') {
          continue;
        }
        try {
          candidate.setImplementation({
            splitGearListHtml: fn
          }, {
            source: 'app-core-new-2'
          });
          return true;
        } catch (error) {
          if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
            console.warn('Unable to register splitGearListHtml implementation with cineGearList.', error);
          }
        }
      }
      if (typeof global !== 'undefined') {
        global.splitGearListHtml = fn;
      }
      return false;
    }
    function describeRequirement(field, value) {
      var val = value || '';
      var parts = [];
      if (field === 'requiredScenarios') {
        var scenarios = val.split(',').map(function (s) {
          return s.trim();
        });
        if (scenarios.includes('Rain Machine') || scenarios.includes('Extreme rain')) {
          parts.push('Adds rain deflector and cables for rain use.');
        }
        if (scenarios.includes('Trinity') || scenarios.includes('Steadicam')) {
          parts.push('Includes D-Tap splitters and extension cables for Steadicam/Trinity rigs.');
        }
        if (scenarios.includes('Gimbal')) {
          parts.push('Adds gimbal rigging and power accessories.');
        }
      } else if (field === 'mattebox') {
        var v = val.toLowerCase();
        if (v.includes('swing')) {
          parts.push('Adds ARRI LMB 4x5 Pro Set and accessories.');
        } else if (v.includes('rod')) {
          parts.push('Adds ARRI LMB 4x5 15mm LWS Set and accessories.');
        } else if (v.includes('clamp')) {
          parts.push('Adds ARRI LMB 4x5 Clamp-On Set with adapter rings.');
        }
      } else if (field === 'cameraHandle') {
        var selections = val.split(',').map(function (s) {
          return s.trim();
        });
        if (selections.includes('Hand Grips')) {
          parts.push('Adds SHAPE Telescopic Handle kit.');
        }
        if (selections.includes('Handle Extension')) {
          parts.push('Adds ARRI HEX-3 handle extension.');
        }
        if (selections.includes('L-Handle')) {
          parts.push('Adds ARRI Handle Extension Set.');
        }
      } else if (field === 'viewfinderExtension') {
        if (val) parts.push('Adds viewfinder extension to support accessories.');
      } else if (field === 'gimbal') {
        if (val) parts.push('Includes selected gimbal and support accessories.');
      } else if (field === 'easyrig') {
        if (val && val !== 'no further stabilisation') {
          parts.push('Adds selected stabiliser to gear list.');
        }
      } else if (field === 'codec') {
        if (val) parts.push('Notes chosen codec for post-production reference.');
      } else if (field === 'monitoringConfiguration') {
        if (val) parts.push('Adds default monitors and cable sets for each role.');
      } else if (field === 'videoDistribution') {
        if (val) parts.push('Includes distribution hardware for the selected method.');
      }
      return parts.join(' ');
    }
    var GEAR_TABLE_CATEGORY_META = Object.freeze({
      Camera: {
        summary: 'Primary camera body chosen for the current setup.',
        logic: 'Always included so the crew preps the selected camera package.'
      },
      'Camera Support': {
        summary: 'Baseplates, cages and handle accessories for mounting the camera.',
        logic: 'Matched to your camera body, selected handles and any scenario add-ons.'
      },
      Media: {
        summary: 'Recording media that works with the selected camera.',
        logic: 'Picks capacities that cover the camera codecs without running out of space.'
      },
      Lens: {
        summary: 'Optics selected in the project requirements.',
        logic: 'Pulled directly from your lens choices so they travel with the kit.'
      },
      'Lens Support': {
        summary: 'Lens support brackets, rails and rings sized for your glass.',
        logic: 'Added automatically when lenses or matte box setups require additional support.'
      },
      'Matte box + filter': {
        summary: 'Matte boxes, trays and filter packs.',
        logic: 'Generated from your matte box preference and filter selections, including required adapters.'
      },
      'LDS (FIZ)': {
        summary: 'Focus, iris and zoom control hardware.',
        logic: 'Reflects the motors and controllers picked in the wireless FIZ section.'
      },
      'Camera Batteries': {
        summary: 'Batteries dedicated to powering the camera body.',
        logic: 'Sized from the camera power draw, runtime targets and hot-swap rules.'
      },
      'Monitoring Batteries': {
        summary: 'Power for handheld and field monitors.',
        logic: 'Ensures each monitor package includes enough charged batteries for the day.'
      },
      Chargers: {
        summary: 'Charging stations for included battery systems.',
        logic: 'Adds compatible chargers so battery rotations stay balanced during the shoot.'
      },
      Monitoring: {
        summary: 'On-set monitoring packages for the crew.',
        logic: 'Derived from monitoring configuration and distribution preferences in project details.'
      },
      'Monitoring support': {
        summary: 'Stands, brackets, straps and cages supporting monitors.',
        logic: 'Auto-matched to monitor sizes and usage (handheld, stand or cart setups).'
      },
      Rigging: {
        summary: 'Arms, clamps and mounting hardware for accessories.',
        logic: 'Includes core rigging plus extras triggered by scenarios like Steadicam or gimbal use.'
      },
      Power: {
        summary: 'Power distribution cables and adapters.',
        logic: 'Covers how accessories receive power from the main battery ecosystem.'
      },
      Grip: {
        summary: 'Support gear like sliders, stabilisers and Easyrig options.',
        logic: 'Reflects stabilisation preferences and active shooting scenarios.'
      },
      'Carts and Transportation': {
        summary: 'Carts, cases and transport aids for the camera department.',
        logic: 'Included so the crew can move, stage and secure the package efficiently.'
      },
      Miscellaneous: {
        summary: 'Utility items that keep the crew efficient and comfortable.',
        logic: 'Adds weather protection and helpful tools based on scenarios and best practices.'
      },
      Consumables: {
        summary: 'Expendables such as tapes, wipes and covers.',
        logic: 'Scaled to shoot length and weather needs so consumables never run short.'
      }
    });
    var DEFAULT_GEAR_TABLE_CATEGORY_META = Object.freeze({
      summary: 'Automatically generated grouping of related equipment.',
      logic: 'Filled using your project requirements, selections and saved auto gear rules.'
    });
    var getGearTableCategoryMeta = function getGearTableCategoryMeta(category) {
      if (!category) return DEFAULT_GEAR_TABLE_CATEGORY_META;
      return GEAR_TABLE_CATEGORY_META[category] || DEFAULT_GEAR_TABLE_CATEGORY_META;
    };
    var buildGearTableCategoryHelp = function buildGearTableCategoryHelp(category) {
      var meta = getGearTableCategoryMeta(category);
      var parts = [];
      if (category) parts.push("".concat(category, " \u2013 ").concat(meta.summary));else parts.push(meta.summary);
      if (meta.logic) parts.push("Logic: ".concat(meta.logic));
      return parts.join(' ');
    };
    var formatDeviceCategoryLabel = function formatDeviceCategoryLabel(category) {
      if (typeof category !== 'string' || !category.trim()) return '';
      return category.replace(/[_-]+/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').split(/\s+/).filter(Boolean).map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
    };
    var formatDeviceCategoryPath = function formatDeviceCategoryPath(path) {
      if (!Array.isArray(path) || !path.length) return '';
      return path.map(function (part) {
        return formatDeviceCategoryLabel(part);
      }).filter(Boolean).join(' › ');
    };
    var DANGEROUS_SHARED_TAGS = new Set(['script', 'style', 'template', 'iframe', 'object', 'embed', 'link', 'meta', 'base']);
    var DANGEROUS_SHARED_ATTRS = new Set(['formaction', 'action', 'srcdoc']);
    function isSafeSharedUrl(value) {
      if (typeof value !== 'string') {
        return false;
      }
      var trimmed = value.trim();
      if (!trimmed) {
        return true;
      }
      if (trimmed.startsWith('#')) {
        return true;
      }
      if (/^(?:javascript|vbscript|data):/i.test(trimmed)) {
        return false;
      }
      try {
        var base = typeof window !== 'undefined' && window.location ? window.location.href : 'https://localhost';
        var url = new URL(trimmed, base);
        if (/^(?:javascript|vbscript|data):/i.test(url.protocol)) {
          return false;
        }
        if (typeof window !== 'undefined' && window.location && window.location.origin) {
          return url.origin === window.location.origin;
        }
        if (!/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) {
          return true;
        }
      } catch (error) {
        if (!/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) {
          return true;
        }
      }
      return false;
    }
    function sanitizeSharedHtml(html) {
      if (!html) {
        return '';
      }
      if (typeof html !== 'string') {
        return sanitizeSharedHtml(String(html));
      }
      var doc;
      try {
        doc = new DOMParser().parseFromString(html, 'text/html');
      } catch (error) {
        console.warn('Failed to parse shared HTML for sanitization', error);
        return '';
      }
      if (!doc || !doc.body) {
        return '';
      }
      DANGEROUS_SHARED_TAGS.forEach(function (tag) {
        doc.body.querySelectorAll(tag).forEach(function (node) {
          node.remove();
        });
      });
      doc.body.querySelectorAll('*').forEach(function (element) {
        Array.from(element.attributes).forEach(function (attribute) {
          var name = attribute.name.toLowerCase();
          if (name.startsWith('on')) {
            element.removeAttribute(attribute.name);
            return;
          }
          if (name === 'style') {
            element.removeAttribute(attribute.name);
            return;
          }
          if (DANGEROUS_SHARED_ATTRS.has(name)) {
            element.removeAttribute(attribute.name);
            return;
          }
          if (name === 'href' || name === 'xlink:href' || name === 'src' || name === 'srcset') {
            var _value = attribute.value || '';
            var parts = name === 'srcset' ? _value.split(',').map(function (part) {
              return part.trim().split(/\s+/)[0];
            }).filter(Boolean) : [_value];
            if (!parts.every(isSafeSharedUrl)) {
              element.removeAttribute(attribute.name);
            }
            return;
          }
          if (name === 'target') {
            element.removeAttribute(attribute.name);
          }
        });
      });
      return doc.body.innerHTML;
    }
    function displayGearAndRequirements(html) {
      var _splitGearListHtml = splitGearListHtml(html),
        projectHtml = _splitGearListHtml.projectHtml,
        gearHtml = _splitGearListHtml.gearHtml;
      var safeProjectHtml = sanitizeSharedHtml(projectHtml);
      var safeGearHtml = sanitizeSharedHtml(gearHtml);
      if (projectRequirementsOutput) {
        if (safeProjectHtml) {
          projectRequirementsOutput.innerHTML = safeProjectHtml;
          projectRequirementsOutput.classList.remove('hidden');
          projectRequirementsOutput.querySelectorAll('.requirement-box').forEach(function (box) {
            var _box$querySelector, _box$querySelector2;
            var label = ((_box$querySelector = box.querySelector('.req-label')) === null || _box$querySelector === void 0 ? void 0 : _box$querySelector.textContent) || '';
            var value = ((_box$querySelector2 = box.querySelector('.req-value')) === null || _box$querySelector2 === void 0 ? void 0 : _box$querySelector2.textContent) || '';
            var field = box.getAttribute('data-field') || '';
            var baseDesc = value ? "".concat(label, ": ").concat(value) : label;
            var logic = describeRequirement(field, value);
            var desc = logic ? "".concat(baseDesc, " \u2013 ").concat(logic) : baseDesc;
            box.setAttribute('title', desc);
            box.setAttribute('data-help', desc);
            box.querySelectorAll('.req-label, .req-value').forEach(function (el) {
              el.setAttribute('title', desc);
              el.setAttribute('data-help', desc);
            });
          });
          adjustGearListSelectWidths(projectRequirementsOutput);
        } else {
          projectRequirementsOutput.innerHTML = '';
          projectRequirementsOutput.classList.add('hidden');
        }
      }
      if (gearListOutput) {
        if (safeGearHtml) {
          gearListOutput.innerHTML = safeGearHtml;
          gearListOutput.classList.remove('hidden');
          applyFilterSelectionsToGearList();
          renderFilterDetails();
          var findDevice = function findDevice(name) {
            if (typeof name !== 'string' || !name.trim()) {
              return {
                info: null,
                category: '',
                categoryPath: []
              };
            }
            var visited = new Set();
            var _search = function search(node, path) {
              if (!isPlainObjectValue(node) || visited.has(node)) return null;
              visited.add(node);
              if (Object.prototype.hasOwnProperty.call(node, name) && isPlainObjectValue(node[name])) {
                return {
                  info: node[name],
                  categoryPath: path
                };
              }
              for (var _i0 = 0, _Object$entries6 = Object.entries(node); _i0 < _Object$entries6.length; _i0++) {
                var _Object$entries6$_i = _slicedToArray(_Object$entries6[_i0], 2),
                  key = _Object$entries6$_i[0],
                  _value2 = _Object$entries6$_i[1];
                if (!isPlainObjectValue(_value2)) continue;
                var _result = _search(_value2, path.concat(key));
                if (_result) return _result;
              }
              return null;
            };
            var result = _search(devices, []);
            if (result) {
              return {
                info: result.info,
                category: formatDeviceCategoryPath(result.categoryPath),
                categoryPath: result.categoryPath
              };
            }
            return {
              info: null,
              category: '',
              categoryPath: []
            };
          };
          var buildGearItemHelp = function buildGearItemHelp(_ref27) {
            var name = _ref27.name,
              countText = _ref27.countText,
              deviceInfo = _ref27.deviceInfo,
              libraryCategory = _ref27.libraryCategory,
              tableCategory = _ref27.tableCategory;
            var parts = [];
            var label = "".concat(countText || '').concat(name).trim();
            if (label) parts.push(label);
            var meta = getGearTableCategoryMeta(tableCategory);
            var categoryParts = [];
            if (tableCategory) categoryParts.push("Gear list section: ".concat(tableCategory));
            if (meta.summary) categoryParts.push(meta.summary);
            if (meta.logic) categoryParts.push("Logic: ".concat(meta.logic));
            if (!tableCategory && !categoryParts.length) {
              var fallback = getGearTableCategoryMeta('');
              if (fallback.summary) categoryParts.push(fallback.summary);
              if (fallback.logic) categoryParts.push("Logic: ".concat(fallback.logic));
            }
            if (categoryParts.length) parts.push(categoryParts.join(' – '));
            if (libraryCategory) parts.push("Device library category: ".concat(libraryCategory));
            if (deviceInfo) {
              var summary = generateSafeConnectorSummary(deviceInfo);
              summary = summary ? summary.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '';
              if (deviceInfo.notes) summary = summary ? "".concat(summary, "; Notes: ").concat(deviceInfo.notes) : deviceInfo.notes;
              if (summary) parts.push(summary);
            }
            return parts.join(' – ');
          };
          gearListOutput.querySelectorAll('tbody.category-group').forEach(function (group) {
            var headingCell = group.querySelector('.category-row td');
            if (!headingCell) return;
            var tableCategory = headingCell.textContent.trim();
            group.setAttribute('data-gear-table-category', tableCategory);
            var helpText = buildGearTableCategoryHelp(tableCategory);
            headingCell.setAttribute('title', helpText);
            headingCell.setAttribute('data-help', helpText);
          });
          gearListOutput.querySelectorAll('.gear-item').forEach(function (span) {
            var _span$closest;
            var name = span.getAttribute('data-gear-name') || span.textContent.trim();
            var _findDevice = findDevice(name),
              info = _findDevice.info,
              category = _findDevice.category;
            var countMatch = span.textContent.trim().match(/^(\d+)x\s+/);
            var count = countMatch ? "".concat(countMatch[1], "x ") : '';
            var tableCategory = (_span$closest = span.closest('tbody.category-group')) === null || _span$closest === void 0 ? void 0 : _span$closest.getAttribute('data-gear-table-category');
            var desc = buildGearItemHelp({
              name: name,
              countText: count,
              deviceInfo: info,
              libraryCategory: category,
              tableCategory: tableCategory || ''
            });
            span.setAttribute('title', desc);
            span.setAttribute('data-help', desc);
            span.querySelectorAll('select').forEach(function (sel) {
              sel.setAttribute('title', desc);
              sel.setAttribute('data-help', desc);
              initFavoritableSelect(sel);
            });
          });
          gearListOutput.querySelectorAll('select').forEach(function (sel) {
            var _sel$closest;
            if (sel.getAttribute('data-help')) return;
            var selected = sel.selectedOptions && sel.selectedOptions[0];
            var name = selected ? selected.textContent.trim() : sel.value;
            var _findDevice2 = findDevice(name),
              info = _findDevice2.info,
              category = _findDevice2.category;
            var tableCategory = (_sel$closest = sel.closest('tbody.category-group')) === null || _sel$closest === void 0 ? void 0 : _sel$closest.getAttribute('data-gear-table-category');
            var desc = buildGearItemHelp({
              name: name,
              countText: '1x ',
              deviceInfo: info,
              libraryCategory: category,
              tableCategory: tableCategory || ''
            });
            sel.setAttribute('title', desc);
            sel.setAttribute('data-help', desc);
            initFavoritableSelect(sel);
          });
          adjustGearListSelectWidths(gearListOutput);
        } else {
          gearListOutput.innerHTML = '';
          gearListOutput.classList.add('hidden');
        }
        if (typeof ensureGearListActions === 'function') {
          ensureGearListActions();
        } else if (!gearListOutput.querySelector('#gearListActions')) {
          var actions = document.createElement('div');
          actions.id = 'gearListActions';
          var note = document.createElement('p');
          note.id = 'gearListAutosaveNote';
          note.className = 'gear-list-autosave-note';
          note.hidden = true;
          note.setAttribute('hidden', '');
          actions.appendChild(note);
          gearListOutput.appendChild(actions);
        }
      }
      if (loadedSetupState) {
        setSliderBowlValue(loadedSetupState.sliderBowl || '');
        setEasyrigValue(loadedSetupState.easyrig || '');
      }
      var combinedHtmlSnapshot = "".concat(safeProjectHtml || '').concat(safeGearHtml || '').trim();
      if (combinedHtmlSnapshot && typeof globalThis !== 'undefined') {
        globalThis.__cineLastGearListHtml = combinedHtmlSnapshot;
      }
      updateGearListButtonVisibility();
      callCoreFunctionFromPart2('updateAutoGearHighlightToggleButton', [], {
        defer: true
      });
    }
    function getSliderBowlSelect() {
      return gearListOutput ? gearListOutput.querySelector('#gearListSliderBowl') : null;
    }
    function getSliderBowlValue() {
      var sel = getSliderBowlSelect();
      if (sel) return sel.value;
      return loadedSetupState && loadedSetupState.sliderBowl ? loadedSetupState.sliderBowl : '';
    }
    function setSliderBowlValue(val) {
      var sel = getSliderBowlSelect();
      if (sel && val && Array.from(sel.options).some(function (opt) {
        return opt.value === val;
      })) {
        sel.value = val;
        adjustGearListSelectWidth(sel);
      }
    }
    function getEasyrigSelect() {
      return gearListOutput ? gearListOutput.querySelector('#gearListEasyrig') : null;
    }
    function getEasyrigValue() {
      var sel = getEasyrigSelect();
      if (sel) return sel.value;
      return loadedSetupState && loadedSetupState.easyrig ? loadedSetupState.easyrig : '';
    }
    function setEasyrigValue(val) {
      var sel = getEasyrigSelect();
      if (sel && val && Array.from(sel.options).some(function (opt) {
        return opt.value === val;
      })) {
        sel.value = val;
        adjustGearListSelectWidth(sel);
      }
    }
    function sanitizeProjectInfoValue(value) {
      if (value === null || value === undefined) return undefined;
      if (typeof value === 'string') {
        var trimmed = value.trim();
        return trimmed ? trimmed : undefined;
      }
      if (typeof value === 'number') {
        return Number.isNaN(value) ? undefined : value;
      }
      if (typeof value === 'boolean') {
        return value ? value : undefined;
      }
      if (Array.isArray(value)) {
        var sanitized = value.map(function (item) {
          return sanitizeProjectInfoValue(item);
        }).filter(function (item) {
          return item !== undefined;
        });
        return sanitized.length ? sanitized : undefined;
      }
      if (_typeof(value) === 'object') {
        var sanitizedObj = sanitizeProjectInfo(value);
        return sanitizedObj || undefined;
      }
      return undefined;
    }
    function sanitizeProjectInfo(info) {
      if (!info || _typeof(info) !== 'object') return null;
      var result = {};
      Object.entries(info).forEach(function (_ref28) {
        var _ref29 = _slicedToArray(_ref28, 2),
          key = _ref29[0],
          value = _ref29[1];
        var sanitized = sanitizeProjectInfoValue(value);
        if (sanitized !== undefined) {
          result[key] = sanitized;
        }
      });
      return Object.keys(result).length > 0 ? result : null;
    }
    function hasProjectInfoData(value) {
      if (value === null || value === undefined) return false;
      if (typeof value === 'string') {
        return value.trim().length > 0;
      }
      if (typeof value === 'number') {
        return !Number.isNaN(value);
      }
      if (typeof value === 'boolean') {
        return value;
      }
      if (Array.isArray(value)) {
        return value.some(function (item) {
          return hasProjectInfoData(item);
        });
      }
      if (_typeof(value) === 'object') {
        return Object.keys(value).some(function (key) {
          return hasProjectInfoData(value[key]);
        });
      }
      return false;
    }
    function projectInfoEquals(a, b) {
      if (a === b) return true;
      if (!a || !b) return false;
      if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (var i = 0; i < a.length; i += 1) {
          if (!projectInfoEquals(a[i], b[i])) return false;
        }
        return true;
      }
      if (_typeof(a) === 'object' && _typeof(b) === 'object') {
        var aKeys = Object.keys(a);
        var bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length) return false;
        return aKeys.every(function (key) {
          return projectInfoEquals(a[key], b[key]);
        });
      }
      return false;
    }
    function ensureDefaultProjectInfoSnapshot() {
      if (defaultProjectInfoSnapshot !== null) return;
      defaultProjectInfoSnapshot = {};
    }
    function deriveProjectInfo(info) {
      ensureDefaultProjectInfoSnapshot();
      var sanitized = sanitizeProjectInfo(info);
      if (!sanitized) {
        if (hasProjectInfoData(info) && hasProjectInfoData(currentProjectInfo)) {
          return currentProjectInfo;
        }
        return null;
      }
      if (defaultProjectInfoSnapshot && projectInfoEquals(sanitized, defaultProjectInfoSnapshot)) {
        return null;
      }
      return sanitized;
    }
    function setCurrentProjectInfo(info) {
      currentProjectInfo = info;
    }
    function getCurrentProjectInfo() {
      return currentProjectInfo;
    }
    function computeSetupSignature(state) {
      if (!state) return '';
      return [state.camera || '', state.monitor || '', state.video || '', state.cage || '', coreStableStringify(state.motors || []), coreStableStringify(state.controllers || []), state.distance || '', state.batteryPlate || '', state.battery || '', state.batteryHotswap || '', state.sliderBowl || '', state.easyrig || '', coreStableStringify(state.projectInfo || null), coreStableStringify(state.autoGearRules || null), coreStableStringify(state.diagramPositions || null)].join('||');
    }
    function storeLoadedSetupState(state) {
      loadedSetupState = state;
      loadedSetupStateSignature = computeSetupSignature(state);
    }
    function getCurrentSetupState() {
      var info = projectForm ? collectProjectFormData() : {};
      info.sliderBowl = getSliderBowlValue();
      info.easyrig = getEasyrigValue();
      var projectInfo = deriveProjectInfo(info);
      var state = {
        camera: cameraSelect.value,
        monitor: monitorSelect.value,
        video: videoSelect.value,
        cage: cageSelect.value,
        motors: motorSelects.map(function (sel) {
          return sel.value;
        }),
        controllers: controllerSelects.map(function (sel) {
          return sel.value;
        }),
        distance: distanceSelect.value,
        batteryPlate: batteryPlateSelect.value,
        battery: batterySelect.value,
        batteryHotswap: hotswapSelect.value,
        sliderBowl: info.sliderBowl,
        easyrig: info.easyrig,
        projectInfo: projectInfo
      };
      state.batteryPlate = normalizeBatteryPlateValue(state.batteryPlate, state.battery);
      var projectRules = getProjectScopedAutoGearRules();
      if (projectRules && projectRules.length) {
        state.autoGearRules = projectRules;
      }
      var diagramPositions = getDiagramManualPositions();
      if (Object.keys(diagramPositions).length) {
        state.diagramPositions = diagramPositions;
      }
      return state;
    }
    function hasAnyDeviceSelection(state) {
      if (!state) return false;
      var _isMeaningfulSelection = function isMeaningfulSelection(value) {
        if (Array.isArray(value)) {
          return value.some(function (item) {
            return _isMeaningfulSelection(item);
          });
        }
        if (value == null) return false;
        var normalized = typeof value === 'string' ? value.trim() : value;
        if (!normalized) return false;
        if (typeof normalized === 'string' && normalized.toLowerCase() === 'none') {
          return false;
        }
        return true;
      };
      var primarySelections = [state.camera, state.monitor, state.video, state.cage, state.batteryPlate, state.battery, state.batteryHotswap];
      if (primarySelections.some(function (value) {
        return _isMeaningfulSelection(value);
      })) {
        return true;
      }
      if (_isMeaningfulSelection(state.motors)) {
        return true;
      }
      if (_isMeaningfulSelection(state.controllers)) {
        return true;
      }
      return false;
    }
    function checkSetupChanged() {
      if (!saveSetupBtn) return;
      var langTexts = texts[currentLang] || {};
      var fallbackTexts = texts.en || {};
      var saveLabel = langTexts.saveSetupBtn || fallbackTexts.saveSetupBtn || '';
      var updateLabel = langTexts.updateSetupBtn || fallbackTexts.updateSetupBtn || saveLabel;
      var typedName = setupNameInput && typeof setupNameInput.value === 'string' ? setupNameInput.value.trim() : '';
      var selectedName = setupSelect && typeof setupSelect.value === 'string' ? setupSelect.value : '';
      if (selectedName && typedName && typedName !== selectedName) {
        setButtonLabelWithIcon(saveSetupBtn, updateLabel);
        return;
      }
      if (loadedSetupState && selectedName && typedName === selectedName) {
        var currentSignature = computeSetupSignature(getCurrentSetupState());
        if (currentSignature !== loadedSetupStateSignature) {
          setButtonLabelWithIcon(saveSetupBtn, updateLabel);
          return;
        }
      }
      setButtonLabelWithIcon(saveSetupBtn, saveLabel);
    }
    var projectDialog = document.getElementById("projectDialog");
    var projectForm = document.getElementById("projectForm");
    var filterSelectElem = document.getElementById('filter');
    var filterDetailsStorage = document.getElementById('filterDetails');
    var matteboxSelect = document.getElementById('mattebox');
    var projectCancelBtn = document.getElementById("projectCancel");
    var feedbackDialog = document.getElementById("feedbackDialog");
    var feedbackForm = document.getElementById("feedbackForm");
    var feedbackCancelBtn = document.getElementById("fbCancel");
    var feedbackUseLocationBtn = document.getElementById("fbUseLocationBtn");
    var feedbackSubmitBtn = document.getElementById("fbSubmit");
    if (feedbackCancelBtn) {
      var _feedbackCancelBtn$te, _texts$currentLang72, _texts$en169;
      var cancelLabel = ((_feedbackCancelBtn$te = feedbackCancelBtn.textContent) === null || _feedbackCancelBtn$te === void 0 ? void 0 : _feedbackCancelBtn$te.trim()) || ((_texts$currentLang72 = texts[currentLang]) === null || _texts$currentLang72 === void 0 ? void 0 : _texts$currentLang72.cancelEditBtn) || ((_texts$en169 = texts.en) === null || _texts$en169 === void 0 ? void 0 : _texts$en169.cancelEditBtn) || 'Cancel';
      setButtonLabelWithIcon(feedbackCancelBtn, cancelLabel, ICON_GLYPHS.circleX);
    }
    if (feedbackUseLocationBtn) {
      var _feedbackUseLocationB;
      var locationLabel = ((_feedbackUseLocationB = feedbackUseLocationBtn.textContent) === null || _feedbackUseLocationB === void 0 ? void 0 : _feedbackUseLocationB.trim()) || 'Use Current Location';
      setButtonLabelWithIcon(feedbackUseLocationBtn, locationLabel, ICON_GLYPHS.pin);
    }
    if (feedbackSubmitBtn) {
      var _feedbackSubmitBtn$te, _texts$currentLang73, _texts$en170;
      var submitLabel = ((_feedbackSubmitBtn$te = feedbackSubmitBtn.textContent) === null || _feedbackSubmitBtn$te === void 0 ? void 0 : _feedbackSubmitBtn$te.trim()) || ((_texts$currentLang73 = texts[currentLang]) === null || _texts$currentLang73 === void 0 ? void 0 : _texts$currentLang73.feedbackSubmit) || ((_texts$en170 = texts.en) === null || _texts$en170 === void 0 ? void 0 : _texts$en170.feedbackSubmit) || 'Save & Submit';
      setButtonLabelWithIcon(feedbackSubmitBtn, submitLabel, ICON_GLYPHS.paperPlane);
    }
    var loadFeedbackSafe = typeof loadFeedback === 'function' ? loadFeedback : function () {
      return {};
    };
    var saveFeedbackSafe = typeof saveFeedback === 'function' ? saveFeedback : function () {};
    var setupDiagramContainer = document.getElementById("diagramArea");
    var diagramLegend = document.getElementById("diagramLegend");
    var downloadDiagramBtn = document.getElementById("downloadDiagram");
    var zoomInBtn = document.getElementById("zoomIn");
    var zoomOutBtn = document.getElementById("zoomOut");
    var resetViewBtn = document.getElementById("resetView");
    var gridSnapToggleBtn = document.getElementById("gridSnapToggle");
    var diagramHint = document.getElementById("diagramHint");
    var getCurrentGridSnap = function getCurrentGridSnap() {
      try {
        if (typeof getGridSnapState === 'function') {
          return Boolean(getGridSnapState());
        }
      } catch (gridSnapStateError) {
        void gridSnapStateError;
      }
      var scopedValue = readGlobalScopeValue('gridSnap');
      if (typeof scopedValue === 'boolean') {
        return scopedValue;
      }
      if (typeof gridSnap !== 'undefined') {
        try {
          return Boolean(gridSnap);
        } catch (legacyGridSnapReadError) {
          void legacyGridSnapReadError;
        }
      }
      return false;
    };
    var getDiagramManualPositions = function getDiagramManualPositions() {
      return {};
    };
    var setManualDiagramPositions = function setManualDiagramPositions() {};
    var renderSetupDiagram = function renderSetupDiagram() {};
    var enableDiagramInteractions = function enableDiagramInteractions() {};
    var updateDiagramLegend = function updateDiagramLegend() {};
    var getDiagramCss = function getDiagramCss() {
      return '';
    };
    var diagramConnectorIcons = {};
    var overviewSectionIcons = {};
    var DIAGRAM_MONITOR_ICON = null;
    var diagramIcons = {};
    var connectionDiagramModule = (typeof cineFeaturesConnectionDiagram === "undefined" ? "undefined" : _typeof(cineFeaturesConnectionDiagram)) === 'object' && cineFeaturesConnectionDiagram || typeof GLOBAL_SCOPE !== 'undefined' && GLOBAL_SCOPE.cineFeaturesConnectionDiagram || null;
    if (connectionDiagramModule && typeof connectionDiagramModule.createConnectionDiagram === 'function') {
      try {
        var scheduleProjectAutoSaveFn = typeof globalThis !== 'undefined' && typeof globalThis.scheduleProjectAutoSave === 'function' ? globalThis.scheduleProjectAutoSave : null;
        var saveCurrentSessionFn = typeof saveCurrentSession === 'function' ? saveCurrentSession : typeof globalThis !== 'undefined' && typeof globalThis.saveCurrentSession === 'function' ? function () {
          return globalThis.saveCurrentSession.apply(globalThis, arguments);
        } : undefined;
        var connectionDiagram = connectionDiagramModule.createConnectionDiagram({
          document: document,
          window: window,
          navigator: navigator,
          getTexts: function getTexts() {
            return texts;
          },
          getCurrentLang: function getCurrentLang() {
            return currentLang;
          },
          getDevices: function getDevices() {
            return devices;
          },
          getCameraSelect: function getCameraSelect() {
            return cameraSelect;
          },
          getMonitorSelect: function getMonitorSelect() {
            return monitorSelect;
          },
          getVideoSelect: function getVideoSelect() {
            return videoSelect;
          },
          getDistanceSelect: function getDistanceSelect() {
            return distanceSelect;
          },
          getBatterySelect: function getBatterySelect() {
            return batterySelect;
          },
          getMotorSelects: function getMotorSelects() {
            return motorSelects;
          },
          getControllerSelects: function getControllerSelects() {
            return controllerSelects;
          },
          getSetupDiagramContainer: function getSetupDiagramContainer() {
            return setupDiagramContainer;
          },
          getDiagramLegend: function getDiagramLegend() {
            return diagramLegend;
          },
          getDiagramHint: function getDiagramHint() {
            return diagramHint;
          },
          getDownloadDiagramBtn: function getDownloadDiagramBtn() {
            return downloadDiagramBtn;
          },
          getZoomInBtn: function getZoomInBtn() {
            return zoomInBtn;
          },
          getZoomOutBtn: function getZoomOutBtn() {
            return zoomOutBtn;
          },
          getResetViewBtn: function getResetViewBtn() {
            return resetViewBtn;
          },
          getGridSnapToggleBtn: function getGridSnapToggleBtn() {
            return gridSnapToggleBtn;
          },
          getCurrentGridSnap: getCurrentGridSnap,
          scheduleProjectAutoSave: scheduleProjectAutoSaveFn,
          saveCurrentSession: saveCurrentSessionFn,
          checkSetupChanged: checkSetupChanged,
          motorPriority: motorPriority,
          controllerPriority: controllerPriority,
          isArri: isArri,
          isArriOrCmotion: isArriOrCmotion,
          fizNeedsPower: fizNeedsPower,
          fizPowerPort: fizPowerPort,
          controllerDistancePort: controllerDistancePort,
          controllerCamPort: controllerCamPort,
          cameraFizPort: cameraFizPort,
          motorFizPort: motorFizPort,
          getSelectedPlate: getSelectedPlate,
          isSelectedPlateNative: isSelectedPlateNative,
          firstPowerInputType: firstPowerInputType,
          formatConnLabel: formatConnLabel,
          connectionLabel: connectionLabel,
          fizPort: fizPort,
          iconGlyph: iconGlyph,
          ICON_FONT_KEYS: ICON_FONT_KEYS,
          applyIconGlyph: applyIconGlyph,
          resolveIconGlyph: resolveIconGlyph,
          positionSvgMarkup: positionSvgMarkup,
          ensureSvgHasAriaHidden: ensureSvgHasAriaHidden,
          formatSvgCoordinate: formatSvgCoordinate
        });
        if (connectionDiagram && _typeof(connectionDiagram) === 'object') {
          if (typeof connectionDiagram.renderSetupDiagram === 'function') {
            renderSetupDiagram = connectionDiagram.renderSetupDiagram;
          }
          if (typeof connectionDiagram.enableDiagramInteractions === 'function') {
            enableDiagramInteractions = connectionDiagram.enableDiagramInteractions;
          }
          if (typeof connectionDiagram.updateDiagramLegend === 'function') {
            updateDiagramLegend = connectionDiagram.updateDiagramLegend;
          }
          if (typeof connectionDiagram.getDiagramManualPositions === 'function') {
            getDiagramManualPositions = connectionDiagram.getDiagramManualPositions;
          }
          if (typeof connectionDiagram.setManualDiagramPositions === 'function') {
            setManualDiagramPositions = connectionDiagram.setManualDiagramPositions;
          }
          if (typeof connectionDiagram.getDiagramCss === 'function') {
            getDiagramCss = connectionDiagram.getDiagramCss;
          }
          if (connectionDiagram.diagramConnectorIcons) {
            diagramConnectorIcons = connectionDiagram.diagramConnectorIcons;
          }
          if (connectionDiagram.overviewSectionIcons) {
            overviewSectionIcons = connectionDiagram.overviewSectionIcons;
          }
          if (connectionDiagram.diagramIcons) {
            diagramIcons = connectionDiagram.diagramIcons;
          }
          if (connectionDiagram.DIAGRAM_MONITOR_ICON) {
            DIAGRAM_MONITOR_ICON = connectionDiagram.DIAGRAM_MONITOR_ICON;
          }
        }
      } catch (diagramModuleError) {
        console.warn('Unable to initialize connection diagram module', diagramModuleError);
      }
    }
    var cameraProjectLegendIcon = document.getElementById('cameraProjectLegendIcon');
    if (cameraProjectLegendIcon && applyIconGlyph && diagramIcons.camera) {
      applyIconGlyph(cameraProjectLegendIcon, diagramIcons.camera);
    }
    var generateOverviewBtn = document.getElementById('generateOverviewBtn');
    var videoOutputOptions = ['3G-SDI', '6G-SDI', '12G-SDI', 'Mini BNC', 'HDMI', 'Mini HDMI', 'Micro HDMI'];
    function getAllFizConnectorTypes() {
      var types = new Set();
      Object.values(devices.cameras).forEach(function (cam) {
        if (Array.isArray(cam.fizConnectors)) {
          cam.fizConnectors.forEach(function (fc) {
            if (fc && fc.type) types.add(fc.type);
          });
        }
      });
      return Array.from(types).sort(localeSort);
    }
    var fizConnectorOptions = getAllFizConnectorTypes();
    function updateFizConnectorOptions() {
      fizConnectorOptions = getAllFizConnectorTypes();
      document.querySelectorAll('.fiz-connector-select').forEach(function (sel) {
        var current = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        fizConnectorOptions.forEach(function (optVal) {
          var opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          sel.appendChild(opt);
        });
        if (fizConnectorOptions.includes(current)) {
          sel.value = current;
        }
      });
    }
    function getAllMotorConnectorTypes() {
      var _devices$fiz;
      var types = new Set();
      Object.values(((_devices$fiz = devices.fiz) === null || _devices$fiz === void 0 ? void 0 : _devices$fiz.motors) || {}).forEach(function (m) {
        if (m && m.fizConnector) types.add(m.fizConnector);
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }
    var motorConnectorOptions = getAllMotorConnectorTypes();
    function updateMotorConnectorOptions() {
      motorConnectorOptions = getAllMotorConnectorTypes();
      if (motorConnectorInput) {
        var cur = motorConnectorInput.value;
        motorConnectorInput.innerHTML = '';
        addEmptyOption(motorConnectorInput);
        motorConnectorOptions.forEach(function (optVal) {
          var opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          motorConnectorInput.appendChild(opt);
        });
        if (motorConnectorOptions.includes(cur)) motorConnectorInput.value = cur;
      }
    }
    function getAllControllerConnectors() {
      var _devices$fiz2;
      var types = new Set();
      Object.values(((_devices$fiz2 = devices.fiz) === null || _devices$fiz2 === void 0 ? void 0 : _devices$fiz2.controllers) || {}).forEach(function (c) {
        if (c && Array.isArray(c.fizConnectors)) {
          c.fizConnectors.forEach(function (fc) {
            if (fc && fc.type) types.add(fc.type);
          });
        }
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }
    function getAllControllerPowerSources() {
      var _devices$fiz3;
      var types = new Set();
      Object.values(((_devices$fiz3 = devices.fiz) === null || _devices$fiz3 === void 0 ? void 0 : _devices$fiz3.controllers) || {}).forEach(function (c) {
        if (c && c.powerSource) types.add(c.powerSource);
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }
    function getAllControllerBatteryTypes() {
      var _devices$fiz4;
      var types = new Set();
      Object.values(((_devices$fiz4 = devices.fiz) === null || _devices$fiz4 === void 0 ? void 0 : _devices$fiz4.controllers) || {}).forEach(function (c) {
        if (c && c.batteryType) types.add(c.batteryType);
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }
    function getAllControllerConnectivity() {
      var _devices$fiz5;
      var types = new Set();
      Object.values(((_devices$fiz5 = devices.fiz) === null || _devices$fiz5 === void 0 ? void 0 : _devices$fiz5.controllers) || {}).forEach(function (c) {
        if (c && c.connectivity) types.add(c.connectivity);
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }
    var controllerConnectorOptions = getAllControllerConnectors();
    var controllerPowerOptions = getAllControllerPowerSources();
    var controllerBatteryOptions = getAllControllerBatteryTypes();
    var controllerConnectivityOptions = getAllControllerConnectivity();
    function updateControllerConnectorOptions() {
      controllerConnectorOptions = getAllControllerConnectors();
      if (controllerConnectorInput) {
        var cur = controllerConnectorInput.value;
        controllerConnectorInput.innerHTML = '';
        addEmptyOption(controllerConnectorInput);
        controllerConnectorOptions.forEach(function (optVal) {
          var opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          controllerConnectorInput.appendChild(opt);
        });
        if (controllerConnectorOptions.includes(cur)) controllerConnectorInput.value = cur;
      }
    }
    function updateControllerPowerOptions() {
      controllerPowerOptions = getAllControllerPowerSources();
      if (controllerPowerInput) {
        var cur = controllerPowerInput.value;
        controllerPowerInput.innerHTML = '';
        addEmptyOption(controllerPowerInput);
        controllerPowerOptions.forEach(function (optVal) {
          var opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          controllerPowerInput.appendChild(opt);
        });
        if (controllerPowerOptions.includes(cur)) controllerPowerInput.value = cur;
      }
    }
    function updateControllerBatteryOptions() {
      controllerBatteryOptions = getAllControllerBatteryTypes();
      if (controllerBatteryInput) {
        var cur = controllerBatteryInput.value;
        controllerBatteryInput.innerHTML = '';
        addEmptyOption(controllerBatteryInput);
        controllerBatteryOptions.forEach(function (optVal) {
          var opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          controllerBatteryInput.appendChild(opt);
        });
        if (controllerBatteryOptions.includes(cur)) controllerBatteryInput.value = cur;
      }
    }
    function updateControllerConnectivityOptions() {
      controllerConnectivityOptions = getAllControllerConnectivity();
      if (controllerConnectivityInput) {
        var cur = controllerConnectivityInput.value;
        controllerConnectivityInput.innerHTML = '';
        addEmptyOption(controllerConnectivityInput);
        controllerConnectivityOptions.forEach(function (optVal) {
          var opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          controllerConnectivityInput.appendChild(opt);
        });
        if (controllerConnectivityOptions.includes(cur)) controllerConnectivityInput.value = cur;
      }
    }
    function getAllDistanceConnections() {
      var _devices$fiz6;
      var types = new Set();
      Object.values(((_devices$fiz6 = devices.fiz) === null || _devices$fiz6 === void 0 ? void 0 : _devices$fiz6.distance) || {}).forEach(function (d) {
        if (d && d.connectionCompatibility) types.add(d.connectionCompatibility);
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }
    function getAllDistanceMethods() {
      var _devices$fiz7;
      var types = new Set();
      Object.values(((_devices$fiz7 = devices.fiz) === null || _devices$fiz7 === void 0 ? void 0 : _devices$fiz7.distance) || {}).forEach(function (d) {
        if (d && d.measurementMethod) types.add(d.measurementMethod);
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }
    function getAllDistanceDisplays() {
      var _devices$fiz8;
      var types = new Set();
      Object.values(((_devices$fiz8 = devices.fiz) === null || _devices$fiz8 === void 0 ? void 0 : _devices$fiz8.distance) || {}).forEach(function (d) {
        if (d && d.outputDisplay) types.add(d.outputDisplay);
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }
    var distanceConnectionOptions = getAllDistanceConnections();
    var distanceMethodOptions = getAllDistanceMethods();
    var distanceDisplayOptions = getAllDistanceDisplays();
    function updateDistanceConnectionOptions() {
      distanceConnectionOptions = getAllDistanceConnections();
      if (distanceConnectionInput) {
        var cur = distanceConnectionInput.value;
        distanceConnectionInput.innerHTML = '';
        addEmptyOption(distanceConnectionInput);
        distanceConnectionOptions.forEach(function (optVal) {
          var opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          distanceConnectionInput.appendChild(opt);
        });
        if (distanceConnectionOptions.includes(cur)) distanceConnectionInput.value = cur;
      }
    }
    function updateDistanceMethodOptions() {
      distanceMethodOptions = getAllDistanceMethods();
      if (distanceMethodInput) {
        var cur = distanceMethodInput.value;
        distanceMethodInput.innerHTML = '';
        addEmptyOption(distanceMethodInput);
        distanceMethodOptions.forEach(function (optVal) {
          var opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          distanceMethodInput.appendChild(opt);
        });
        if (distanceMethodOptions.includes(cur)) distanceMethodInput.value = cur;
      }
    }
    function updateDistanceDisplayOptions() {
      distanceDisplayOptions = getAllDistanceDisplays();
      if (distanceOutputInput) {
        var cur = distanceOutputInput.value;
        distanceOutputInput.innerHTML = '';
        addEmptyOption(distanceOutputInput);
        distanceDisplayOptions.forEach(function (optVal) {
          var opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          distanceOutputInput.appendChild(opt);
        });
        if (distanceDisplayOptions.includes(cur)) distanceOutputInput.value = cur;
      }
    }
    function createFieldWithLabel(el, label) {
      var wrapper = document.createElement('div');
      wrapper.className = 'field-with-label';
      wrapper.dataset.label = label;
      var fieldId = ensureElementId(el, label);
      var hiddenLabel = createHiddenLabel(fieldId, label);
      wrapper.appendChild(hiddenLabel);
      wrapper.appendChild(el);
      return wrapper;
    }
    function addEmptyOption() {}
    function filterNoneEntries(list) {
      var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'type';
      if (!Array.isArray(list)) return [];
      return list.filter(function (item) {
        if (typeof item === 'string') {
          return item && item !== 'None';
        }
        if (item && Object.prototype.hasOwnProperty.call(item, prop)) {
          var val = item[prop];
          return val !== undefined && val !== null && val !== '' && val !== 'None';
        }
        return true;
      });
    }
    function createVideoOutputRow() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var row = document.createElement('div');
      row.className = 'form-row';
      var select = document.createElement('select');
      select.className = 'video-output-select';
      select.name = 'videoOutput';
      addEmptyOption(select);
      videoOutputOptions.forEach(function (optVal) {
        var opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      var addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['videoOutputsHeading', ['cameraVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', function () {
        row.after(createVideoOutputRow());
      });
      row.appendChild(addBtn);
      var removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['videoOutputsHeading', ['cameraVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', function () {
        if (videoOutputsContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    function setVideoOutputs(list) {
      videoOutputsContainer.innerHTML = '';
      var filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(function (item) {
          var t = typeof item === 'string' ? item : item.type;
          videoOutputsContainer.appendChild(createVideoOutputRow(t));
        });
      } else {
        videoOutputsContainer.appendChild(createVideoOutputRow());
      }
    }
    function getVideoOutputs() {
      return Array.from(videoOutputsContainer.querySelectorAll('select')).map(function (sel) {
        return {
          type: sel.value
        };
      }).filter(function (vo) {
        return vo.type && vo.type !== 'None';
      });
    }
    function clearVideoOutputs() {
      setVideoOutputs([]);
    }
    function createMonitorVideoInputRow() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var row = document.createElement('div');
      row.className = 'form-row';
      var select = document.createElement('select');
      select.className = 'monitor-video-input-select';
      select.name = 'monitorVideoInput';
      addEmptyOption(select);
      videoOutputOptions.forEach(function (optVal) {
        var opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      var addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['monitorVideoInputsHeading', ['monitorVideoInputsLabel']],
        fallbackContext: 'Video Inputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', function () {
        row.after(createMonitorVideoInputRow());
      });
      row.appendChild(addBtn);
      var removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['monitorVideoInputsHeading', ['monitorVideoInputsLabel']],
        fallbackContext: 'Video Inputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', function () {
        if (monitorVideoInputsContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    function setMonitorVideoInputs(list) {
      monitorVideoInputsContainer.innerHTML = '';
      var filtered = filterNoneEntries(list, 'type');
      if (filtered.length) {
        filtered.forEach(function (item) {
          var t = typeof item === 'string' ? item : item.type || item.portType;
          monitorVideoInputsContainer.appendChild(createMonitorVideoInputRow(t));
        });
      } else {
        monitorVideoInputsContainer.appendChild(createMonitorVideoInputRow());
      }
    }
    function getMonitorVideoInputs() {
      return Array.from(monitorVideoInputsContainer.querySelectorAll('select')).map(function (sel) {
        return {
          type: sel.value
        };
      }).filter(function (v) {
        return v.type && v.type !== 'None';
      });
    }
    function clearMonitorVideoInputs() {
      setMonitorVideoInputs([]);
    }
    function createMonitorVideoOutputRow() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var row = document.createElement('div');
      row.className = 'form-row';
      var select = document.createElement('select');
      select.className = 'monitor-video-output-select';
      select.name = 'monitorVideoOutput';
      addEmptyOption(select);
      videoOutputOptions.forEach(function (optVal) {
        var opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      var addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['monitorVideoOutputsHeading', ['monitorVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', function () {
        row.after(createMonitorVideoOutputRow());
      });
      row.appendChild(addBtn);
      var removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['monitorVideoOutputsHeading', ['monitorVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', function () {
        if (monitorVideoOutputsContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    function setMonitorVideoOutputs(list) {
      monitorVideoOutputsContainer.innerHTML = '';
      var filtered = filterNoneEntries(list, 'type');
      if (filtered.length) {
        filtered.forEach(function (item) {
          var t = typeof item === 'string' ? item : item.type || item.portType;
          monitorVideoOutputsContainer.appendChild(createMonitorVideoOutputRow(t));
        });
      } else {
        monitorVideoOutputsContainer.appendChild(createMonitorVideoOutputRow());
      }
    }
    function getMonitorVideoOutputs() {
      return Array.from(monitorVideoOutputsContainer.querySelectorAll('select')).map(function (sel) {
        return {
          type: sel.value
        };
      }).filter(function (v) {
        return v.type && v.type !== 'None';
      });
    }
    function clearMonitorVideoOutputs() {
      setMonitorVideoOutputs([]);
    }
    function createViewfinderVideoInputRow() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var row = document.createElement('div');
      row.className = 'form-row';
      var select = document.createElement('select');
      select.className = 'viewfinder-video-input-select';
      select.name = 'viewfinderVideoInput';
      addEmptyOption(select);
      videoOutputOptions.forEach(function (optVal) {
        var opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      var addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['viewfinderVideoInputsHeading', ['viewfinderVideoInputsLabel']],
        fallbackContext: 'Video Inputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', function () {
        row.after(createViewfinderVideoInputRow());
      });
      row.appendChild(addBtn);
      var removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['viewfinderVideoInputsHeading', ['viewfinderVideoInputsLabel']],
        fallbackContext: 'Video Inputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', function () {
        if (viewfinderVideoInputsContainer && viewfinderVideoInputsContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    function setViewfinderVideoInputs(list) {
      if (!viewfinderVideoInputsContainer) return;
      viewfinderVideoInputsContainer.innerHTML = '';
      var filtered = filterNoneEntries(list, 'type');
      if (filtered.length) {
        filtered.forEach(function (item) {
          var t = typeof item === 'string' ? item : item.type || item.portType;
          viewfinderVideoInputsContainer.appendChild(createViewfinderVideoInputRow(t));
        });
      } else {
        viewfinderVideoInputsContainer.appendChild(createViewfinderVideoInputRow());
      }
    }
    function getViewfinderVideoInputs() {
      if (!viewfinderVideoInputsContainer) return [];
      return Array.from(viewfinderVideoInputsContainer.querySelectorAll('select')).map(function (sel) {
        return {
          type: sel.value
        };
      }).filter(function (v) {
        return v.type && v.type !== 'None';
      });
    }
    function clearViewfinderVideoInputs() {
      setViewfinderVideoInputs([]);
    }
    function createViewfinderVideoOutputRow() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var row = document.createElement('div');
      row.className = 'form-row';
      var select = document.createElement('select');
      select.className = 'viewfinder-video-output-select';
      select.name = 'viewfinderVideoOutput';
      addEmptyOption(select);
      videoOutputOptions.forEach(function (optVal) {
        var opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      var addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['viewfinderVideoOutputsHeading', ['viewfinderVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', function () {
        row.after(createViewfinderVideoOutputRow());
      });
      row.appendChild(addBtn);
      var removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['viewfinderVideoOutputsHeading', ['viewfinderVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', function () {
        if (viewfinderVideoOutputsContainer && viewfinderVideoOutputsContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    function setViewfinderVideoOutputs(list) {
      if (!viewfinderVideoOutputsContainer) return;
      viewfinderVideoOutputsContainer.innerHTML = '';
      var filtered = filterNoneEntries(list, 'type');
      if (filtered.length) {
        filtered.forEach(function (item) {
          var t = typeof item === 'string' ? item : item.type || item.portType;
          viewfinderVideoOutputsContainer.appendChild(createViewfinderVideoOutputRow(t));
        });
      } else {
        viewfinderVideoOutputsContainer.appendChild(createViewfinderVideoOutputRow());
      }
    }
    function getViewfinderVideoOutputs() {
      if (!viewfinderVideoOutputsContainer) return [];
      return Array.from(viewfinderVideoOutputsContainer.querySelectorAll('select')).map(function (sel) {
        return {
          type: sel.value
        };
      }).filter(function (v) {
        return v.type && v.type !== 'None';
      });
    }
    function clearViewfinderVideoOutputs() {
      setViewfinderVideoOutputs([]);
    }
    setViewfinderVideoInputs([]);
    setViewfinderVideoOutputs([]);
    function createVideoInputRow() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var row = document.createElement('div');
      row.className = 'form-row';
      var select = document.createElement('select');
      select.className = 'video-input-select';
      select.name = 'videoInput';
      addEmptyOption(select);
      videoOutputOptions.forEach(function (optVal) {
        var opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      var addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['videoVideoInputsHeading', ['videoVideoInputsLabel']],
        fallbackContext: 'Video Inputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', function () {
        row.after(createVideoInputRow());
      });
      row.appendChild(addBtn);
      var removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['videoVideoInputsHeading', ['videoVideoInputsLabel']],
        fallbackContext: 'Video Inputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', function () {
        if (videoVideoInputsContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    function setVideoInputs(list) {
      videoVideoInputsContainer.innerHTML = '';
      var filtered = filterNoneEntries(list, 'type');
      if (filtered.length) {
        filtered.forEach(function (item) {
          var t = typeof item === 'string' ? item : item.type || item.portType;
          videoVideoInputsContainer.appendChild(createVideoInputRow(t));
        });
      } else {
        videoVideoInputsContainer.appendChild(createVideoInputRow());
      }
    }
    function getVideoInputs() {
      return Array.from(videoVideoInputsContainer.querySelectorAll('select')).map(function (sel) {
        return {
          type: sel.value
        };
      }).filter(function (v) {
        return v.type && v.type !== 'None';
      });
    }
    function clearVideoInputs() {
      setVideoInputs([]);
    }
    function createVideoIOOutputRow() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var row = document.createElement('div');
      row.className = 'form-row';
      var select = document.createElement('select');
      select.className = 'video-output-select-io';
      select.name = 'videoIOOutput';
      addEmptyOption(select);
      videoOutputOptions.forEach(function (optVal) {
        var opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      var addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['videoVideoOutputsHeading', ['videoVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', function () {
        row.after(createVideoIOOutputRow());
      });
      row.appendChild(addBtn);
      var removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['videoVideoOutputsHeading', ['videoVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', function () {
        if (videoVideoOutputsContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    function setVideoOutputsIO(list) {
      videoVideoOutputsContainer.innerHTML = '';
      var filtered = filterNoneEntries(list, 'type');
      if (filtered.length) {
        filtered.forEach(function (item) {
          var t = typeof item === 'string' ? item : item.type || item.portType;
          videoVideoOutputsContainer.appendChild(createVideoIOOutputRow(t));
        });
      } else {
        videoVideoOutputsContainer.appendChild(createVideoIOOutputRow());
      }
    }
    function getVideoOutputsIO() {
      return Array.from(videoVideoOutputsContainer.querySelectorAll('select')).map(function (sel) {
        return {
          type: sel.value
        };
      }).filter(function (v) {
        return v.type && v.type !== 'None';
      });
    }
    function clearVideoOutputsIO() {
      setVideoOutputsIO([]);
    }
    function createFizConnectorRow() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var row = document.createElement('div');
      row.className = 'form-row';
      var select = document.createElement('select');
      select.className = 'fiz-connector-select';
      select.name = 'fizConnector';
      addEmptyOption(select);
      fizConnectorOptions.forEach(function (optVal) {
        var opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      var addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['fizConnectorHeading', ['cameraFIZConnectorLabel']],
        fallbackContext: 'FIZ Connector',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', function () {
        row.after(createFizConnectorRow());
      });
      row.appendChild(addBtn);
      var removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['fizConnectorHeading', ['cameraFIZConnectorLabel']],
        fallbackContext: 'FIZ Connector',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', function () {
        if (fizConnectorContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    function setFizConnectors(list) {
      fizConnectorContainer.innerHTML = '';
      var filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(function (item) {
          var t = typeof item === 'string' ? item : item.type;
          fizConnectorContainer.appendChild(createFizConnectorRow(t));
        });
      } else {
        fizConnectorContainer.appendChild(createFizConnectorRow());
      }
    }
    function getFizConnectors() {
      return Array.from(fizConnectorContainer.querySelectorAll('select')).map(function (sel) {
        return {
          type: sel.value
        };
      }).filter(function (fc) {
        return fc.type && fc.type !== 'None';
      });
    }
    function clearFizConnectors() {
      setFizConnectors([]);
    }
    function getAllRecordingMedia() {
      var media = new Set();
      Object.values(devices.cameras).forEach(function (cam) {
        if (Array.isArray(cam.recordingMedia)) {
          cam.recordingMedia.forEach(function (m) {
            if (m && m.type) media.add(m.type);
          });
        }
      });
      return Array.from(media).sort(localeSort);
    }
    var recordingMediaOptions = getAllRecordingMedia();
    function resolveRecordingMediaPlaceholder() {
      var _texts, _texts2;
      var fallbackProjectForm = ((_texts = texts) === null || _texts === void 0 ? void 0 : _texts.en) && texts.en.projectForm || {};
      var projectFormTexts = ((_texts2 = texts) === null || _texts2 === void 0 ? void 0 : _texts2[currentLang]) && texts[currentLang].projectForm || fallbackProjectForm;
      var placeholder = projectFormTexts.storageTypePlaceholder || fallbackProjectForm.storageTypePlaceholder || 'Select media type';
      var text = typeof placeholder === 'string' ? placeholder.trim() : '';
      return text || 'Select media type';
    }
    function appendRecordingMediaPlaceholder(select) {
      if (!select) return;
      var option = document.createElement('option');
      option.value = '';
      option.textContent = resolveRecordingMediaPlaceholder();
      option.dataset.placeholder = 'true';
      select.appendChild(option);
    }
    function updateRecordingMediaOptions() {
      recordingMediaOptions = getAllRecordingMedia();
      document.querySelectorAll('.recording-media-select').forEach(function (sel) {
        var cur = sel.value;
        sel.innerHTML = '';
        appendRecordingMediaPlaceholder(sel);
        recordingMediaOptions.forEach(function (optVal) {
          var opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          sel.appendChild(opt);
        });
        if (recordingMediaOptions.includes(cur)) {
          sel.value = cur;
        } else if (cur && cur !== 'None') {
          var opt = document.createElement('option');
          opt.value = cur;
          opt.textContent = cur;
          opt.dataset.extraOption = 'true';
          sel.appendChild(opt);
          sel.value = cur;
        } else {
          sel.value = '';
        }
      });
    }
    function createRecordingMediaRow() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var notes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var row = document.createElement('div');
      row.className = 'form-row';
      var select = document.createElement('select');
      select.className = 'recording-media-select';
      select.name = 'recordingMediaType';
      appendRecordingMediaPlaceholder(select);
      recordingMediaOptions.forEach(function (optVal) {
        var opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      if (type) {
        if (!recordingMediaOptions.includes(type)) {
          var opt = document.createElement('option');
          opt.value = type;
          opt.textContent = type;
          select.appendChild(opt);
        }
        select.value = type;
      } else {
        select.value = '';
      }
      row.appendChild(createFieldWithLabel(select, 'Type'));
      var notesInput = document.createElement('input');
      notesInput.type = 'text';
      notesInput.placeholder = 'Notes';
      notesInput.name = 'recordingMediaNotes';
      notesInput.value = notes;
      row.appendChild(createFieldWithLabel(notesInput, 'Notes'));
      var addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['mediaHeading', ['cameraMediaLabel']],
        fallbackContext: 'Recording Media',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', function () {
        row.after(createRecordingMediaRow());
      });
      row.appendChild(addBtn);
      var removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['mediaHeading', ['cameraMediaLabel']],
        fallbackContext: 'Recording Media',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', function () {
        if (cameraMediaContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    var setRecordingMediaLocal = function setRecordingMediaLocal(list) {
      cameraMediaContainer.innerHTML = '';
      var filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(function (item) {
          var _ref30 = item || {},
            _ref30$type = _ref30.type,
            type = _ref30$type === void 0 ? '' : _ref30$type,
            _ref30$notes = _ref30.notes,
            notes = _ref30$notes === void 0 ? '' : _ref30$notes;
          cameraMediaContainer.appendChild(createRecordingMediaRow(type, notes));
        });
      } else {
        cameraMediaContainer.appendChild(createRecordingMediaRow());
      }
    };
    writeCoreScopeValue('setRecordingMedia', setRecordingMediaLocal);
    function getRecordingMedia() {
      return Array.from(cameraMediaContainer.querySelectorAll('.form-row')).map(function (row) {
        var _row$querySelectorAll = row.querySelectorAll('select, input'),
          _row$querySelectorAll2 = _slicedToArray(_row$querySelectorAll, 2),
          sel = _row$querySelectorAll2[0],
          notesInput = _row$querySelectorAll2[1];
        return {
          type: sel.value,
          notes: notesInput.value
        };
      }).filter(function (m) {
        return m.type && m.type !== 'None';
      });
    }
    writeCoreScopeValue('getRecordingMedia', getRecordingMedia);
    function clearRecordingMedia() {
      setRecordingMediaLocal([]);
    }
    function powerInputTypes(dev) {
      var _dev$power;
      var out = [];
      if (!dev) return out;
      var add = function add(t) {
        normalizePowerPortType(t).forEach(function (pt) {
          return out.push(pt);
        });
      };
      if (dev.powerInput) {
        String(dev.powerInput).split('/').forEach(function (t) {
          if (t.trim()) add(t.trim());
        });
      }
      var inp = (_dev$power = dev.power) === null || _dev$power === void 0 ? void 0 : _dev$power.input;
      if (Array.isArray(inp)) {
        inp.forEach(function (i) {
          var typeVal = i && (i.type || i.portType);
          if (typeVal) add(typeVal);
        });
      } else if (inp) {
        var typeVal = inp.type || inp.portType;
        if (typeVal) add(typeVal);
      }
      return out;
    }
    function firstPowerInputType(dev) {
      var list = powerInputTypes(dev);
      return list.length ? list[0] : '';
    }
    function getAllPowerPortTypes() {
      var _devices$fiz9, _devices$fiz0, _devices$fiz1;
      var types = new Set();
      Object.values(devices.cameras).forEach(function (cam) {
        return powerInputTypes(cam).forEach(function (t) {
          return types.add(t);
        });
      });
      Object.values(devices.viewfinders || {}).forEach(function (vf) {
        return powerInputTypes(vf).forEach(function (t) {
          return types.add(t);
        });
      });
      Object.values(devices.monitors || {}).forEach(function (mon) {
        return powerInputTypes(mon).forEach(function (t) {
          return types.add(t);
        });
      });
      Object.values(devices.video || {}).forEach(function (vd) {
        return powerInputTypes(vd).forEach(function (t) {
          return types.add(t);
        });
      });
      Object.values(((_devices$fiz9 = devices.fiz) === null || _devices$fiz9 === void 0 ? void 0 : _devices$fiz9.motors) || {}).forEach(function (m) {
        return powerInputTypes(m).forEach(function (t) {
          return types.add(t);
        });
      });
      Object.values(((_devices$fiz0 = devices.fiz) === null || _devices$fiz0 === void 0 ? void 0 : _devices$fiz0.controllers) || {}).forEach(function (c) {
        return powerInputTypes(c).forEach(function (t) {
          return types.add(t);
        });
      });
      Object.values(((_devices$fiz1 = devices.fiz) === null || _devices$fiz1 === void 0 ? void 0 : _devices$fiz1.distance) || {}).forEach(function (d) {
        return powerInputTypes(d).forEach(function (t) {
          return types.add(t);
        });
      });
      return Array.from(types).sort(localeSort);
    }
    var powerPortOptions = getAllPowerPortTypes();
    function updatePowerPortOptions() {
      powerPortOptions = getAllPowerPortTypes();
      var current = cameraPortTypeInput.value;
      cameraPortTypeInput.innerHTML = '';
      addEmptyOption(cameraPortTypeInput);
      powerPortOptions.forEach(function (optVal) {
        var opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        cameraPortTypeInput.appendChild(opt);
      });
      if (powerPortOptions.includes(current)) cameraPortTypeInput.value = current;
      if (monitorPortTypeInput) {
        var curMon = monitorPortTypeInput.value;
        monitorPortTypeInput.innerHTML = '';
        addEmptyOption(monitorPortTypeInput);
        powerPortOptions.forEach(function (optVal) {
          var opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          monitorPortTypeInput.appendChild(opt);
        });
        if (powerPortOptions.includes(curMon)) monitorPortTypeInput.value = curMon;
      }
    }
    function getAllPlateTypes() {
      var types = new Set();
      Object.values(devices.cameras).forEach(function (cam) {
        var _cam$power;
        var list = (_cam$power = cam.power) === null || _cam$power === void 0 ? void 0 : _cam$power.batteryPlateSupport;
        if (Array.isArray(list)) {
          list.forEach(function (bp) {
            if (bp && bp.type) types.add(bp.type);
          });
        }
      });
      return Array.from(types).sort(localeSort);
    }
    var plateTypeOptions = getAllPlateTypes();
    function updatePlateTypeOptions() {
      plateTypeOptions = getAllPlateTypes();
      document.querySelectorAll('.battery-plate-type-select').forEach(function (sel) {
        var current = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        plateTypeOptions.forEach(function (pt) {
          var opt = document.createElement('option');
          opt.value = pt;
          opt.textContent = pt;
          sel.appendChild(opt);
        });
        if (plateTypeOptions.includes(current)) sel.value = current;
      });
    }
    function createBatteryPlateRow() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var mount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'native';
      var notes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var row = document.createElement('div');
      row.className = 'form-row';
      var typeSelect = document.createElement('select');
      typeSelect.className = 'battery-plate-type-select';
      typeSelect.name = 'batteryPlateType';
      addEmptyOption(typeSelect);
      plateTypeOptions.forEach(function (pt) {
        var opt = document.createElement('option');
        opt.value = pt;
        opt.textContent = pt;
        typeSelect.appendChild(opt);
      });
      if (type && !plateTypeOptions.includes(type)) {
        var opt = document.createElement('option');
        opt.value = type;
        opt.textContent = type;
        typeSelect.appendChild(opt);
      }
      typeSelect.value = type;
      row.appendChild(createFieldWithLabel(typeSelect, 'Type'));
      var mountSelect = document.createElement('select');
      addEmptyOption(mountSelect);
      mountSelect.name = 'batteryPlateMount';
      ['native', 'adapted'].forEach(function (m) {
        var opt = document.createElement('option');
        opt.value = m;
        opt.textContent = m;
        mountSelect.appendChild(opt);
      });
      mountSelect.value = mount || '';
      row.appendChild(createFieldWithLabel(mountSelect, 'Mount'));
      var notesInput = document.createElement('input');
      notesInput.type = 'text';
      notesInput.placeholder = 'Notes';
      notesInput.value = notes;
      notesInput.name = 'batteryPlateNotes';
      row.appendChild(createFieldWithLabel(notesInput, 'Notes'));
      var addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['cameraPlatesLabel', ['powerInputsHeading']],
        fallbackContext: 'Battery Plates',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', function () {
        row.after(createBatteryPlateRow());
      });
      row.appendChild(addBtn);
      var removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['cameraPlatesLabel', ['powerInputsHeading']],
        fallbackContext: 'Battery Plates',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', function () {
        if (batteryPlatesContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    var setBatteryPlatesLocal = function setBatteryPlatesLocal(list) {
      batteryPlatesContainer.innerHTML = '';
      var filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(function (item) {
          var _ref31 = item || {},
            _ref31$type = _ref31.type,
            type = _ref31$type === void 0 ? '' : _ref31$type,
            _ref31$mount = _ref31.mount,
            mount = _ref31$mount === void 0 ? 'native' : _ref31$mount,
            _ref31$notes = _ref31.notes,
            notes = _ref31$notes === void 0 ? '' : _ref31$notes;
          batteryPlatesContainer.appendChild(createBatteryPlateRow(type, mount, notes));
        });
      } else {
        batteryPlatesContainer.appendChild(createBatteryPlateRow());
      }
    };
    writeCoreScopeValue('setBatteryPlates', setBatteryPlatesLocal);
    function getBatteryPlates() {
      return Array.from(batteryPlatesContainer.querySelectorAll('.form-row')).map(function (row) {
        var _row$querySelectorAll3 = row.querySelectorAll('select, input'),
          _row$querySelectorAll4 = _slicedToArray(_row$querySelectorAll3, 3),
          typeSel = _row$querySelectorAll4[0],
          mountSel = _row$querySelectorAll4[1],
          notesInput = _row$querySelectorAll4[2];
        return {
          type: typeSel.value,
          mount: mountSel.value,
          notes: notesInput.value
        };
      }).filter(function (bp) {
        return bp.type && bp.type !== 'None';
      });
    }
    writeCoreScopeValue('getBatteryPlates', getBatteryPlates);
    function clearBatteryPlates() {
      setBatteryPlatesLocal([]);
    }
    function getAllViewfinderTypes() {
      var types = new Set();
      Object.values(devices.cameras).forEach(function (cam) {
        if (Array.isArray(cam.viewfinder)) {
          cam.viewfinder.forEach(function (vf) {
            if (vf && vf.type) types.add(vf.type);
          });
        }
      });
      return Array.from(types).sort(localeSort);
    }
    function getAllViewfinderConnectors() {
      var conns = new Set();
      Object.values(devices.cameras).forEach(function (cam) {
        if (Array.isArray(cam.viewfinder)) {
          cam.viewfinder.forEach(function (vf) {
            if (vf && vf.connector) conns.add(vf.connector);
          });
        }
      });
      return Array.from(conns).filter(function (c) {
        return c;
      }).sort(localeSort);
    }
    var viewfinderTypeOptions = getAllViewfinderTypes();
    var viewfinderConnectorOptions = getAllViewfinderConnectors();
    function createViewfinderRow() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var resolution = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var connector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var notes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      var row = document.createElement('div');
      row.className = 'form-row';
      var typeSelect = document.createElement('select');
      typeSelect.className = 'viewfinder-type-select';
      typeSelect.name = 'viewfinderType';
      addEmptyOption(typeSelect);
      viewfinderTypeOptions.forEach(function (optVal) {
        var opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        typeSelect.appendChild(opt);
      });
      if (type && !viewfinderTypeOptions.includes(type)) {
        var opt = document.createElement('option');
        opt.value = type;
        opt.textContent = type;
        typeSelect.appendChild(opt);
      }
      typeSelect.value = type;
      row.appendChild(createFieldWithLabel(typeSelect, 'Type'));
      var resInput = document.createElement('input');
      resInput.type = 'text';
      resInput.placeholder = 'Resolution';
      resInput.value = resolution;
      resInput.name = 'viewfinderResolution';
      row.appendChild(createFieldWithLabel(resInput, 'Resolution'));
      var connSelect = document.createElement('select');
      connSelect.className = 'viewfinder-connector-select';
      addEmptyOption(connSelect);
      connSelect.name = 'viewfinderConnector';
      viewfinderConnectorOptions.forEach(function (optVal) {
        var opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        connSelect.appendChild(opt);
      });
      if (connector && !viewfinderConnectorOptions.includes(connector)) {
        var _opt = document.createElement('option');
        _opt.value = connector;
        _opt.textContent = connector;
        connSelect.appendChild(_opt);
      }
      connSelect.value = connector;
      row.appendChild(createFieldWithLabel(connSelect, 'Connector'));
      var notesInput = document.createElement('input');
      notesInput.type = 'text';
      notesInput.placeholder = 'Notes';
      notesInput.value = notes;
      notesInput.name = 'viewfinderNotes';
      row.appendChild(createFieldWithLabel(notesInput, 'Notes'));
      var addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['viewfinderHeading', ['cameraViewfinderLabel']],
        fallbackContext: 'Viewfinder',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', function () {
        row.after(createViewfinderRow());
      });
      row.appendChild(addBtn);
      var removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['viewfinderHeading', ['cameraViewfinderLabel']],
        fallbackContext: 'Viewfinder',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', function () {
        if (viewfinderContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    function setViewfinders(list) {
      viewfinderContainer.innerHTML = '';
      var filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(function (item) {
          var _ref32 = item || {},
            _ref32$type = _ref32.type,
            type = _ref32$type === void 0 ? '' : _ref32$type,
            _ref32$resolution = _ref32.resolution,
            resolution = _ref32$resolution === void 0 ? '' : _ref32$resolution,
            _ref32$connector = _ref32.connector,
            connector = _ref32$connector === void 0 ? '' : _ref32$connector,
            _ref32$notes = _ref32.notes,
            notes = _ref32$notes === void 0 ? '' : _ref32$notes;
          viewfinderContainer.appendChild(createViewfinderRow(type, resolution, connector, notes));
        });
      } else {
        viewfinderContainer.appendChild(createViewfinderRow());
      }
    }
    function getViewfinders() {
      return Array.from(viewfinderContainer.querySelectorAll('.form-row')).map(function (row) {
        var _row$querySelectorAll5 = row.querySelectorAll('select, input'),
          _row$querySelectorAll6 = _slicedToArray(_row$querySelectorAll5, 4),
          typeSelect = _row$querySelectorAll6[0],
          resInput = _row$querySelectorAll6[1],
          connSelect = _row$querySelectorAll6[2],
          notesInput = _row$querySelectorAll6[3];
        return {
          type: typeSelect.value,
          resolution: resInput.value,
          connector: connSelect.value,
          notes: notesInput.value
        };
      }).filter(function (vf) {
        return vf.type && vf.type !== 'None';
      });
    }
    function clearViewfinders() {
      setViewfinders([]);
    }
    function getAllMountTypes() {
      var types = new Set();
      Object.values(devices.cameras).forEach(function (cam) {
        if (Array.isArray(cam.lensMount)) {
          cam.lensMount.forEach(function (lm) {
            if (lm && lm.type) types.add(lm.type);
          });
        }
      });
      return Array.from(types).sort(localeSort);
    }
    var mountTypeOptions = getAllMountTypes();
    function updateMountTypeOptions() {
      mountTypeOptions = getAllMountTypes();
      document.querySelectorAll('.lens-mount-type-select').forEach(function (sel) {
        var current = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        mountTypeOptions.forEach(function (optVal) {
          var opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          sel.appendChild(opt);
        });
        if (mountTypeOptions.includes(current)) sel.value = current;
      });
    }
    function createLensMountRow() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var mount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'native';
      var row = document.createElement('div');
      row.className = 'form-row';
      var typeSelect = document.createElement('select');
      typeSelect.className = 'lens-mount-type-select';
      typeSelect.name = 'lensMountType';
      addEmptyOption(typeSelect);
      mountTypeOptions.forEach(function (optVal) {
        var opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        typeSelect.appendChild(opt);
      });
      if (type && !mountTypeOptions.includes(type)) {
        var opt = document.createElement('option');
        opt.value = type;
        opt.textContent = type;
        typeSelect.appendChild(opt);
      }
      typeSelect.value = type;
      row.appendChild(createFieldWithLabel(typeSelect, 'Type'));
      var mountSelect = document.createElement('select');
      addEmptyOption(mountSelect);
      mountSelect.name = 'lensMount';
      ['native', 'adapted'].forEach(function (m) {
        var opt = document.createElement('option');
        opt.value = m;
        opt.textContent = m;
        mountSelect.appendChild(opt);
      });
      mountSelect.value = mount || '';
      row.appendChild(createFieldWithLabel(mountSelect, 'Mount'));
      var addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['lensMountHeading', ['cameraLensMountLabel']],
        fallbackContext: 'Lens Mount',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', function () {
        row.after(createLensMountRow());
      });
      row.appendChild(addBtn);
      var removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['lensMountHeading', ['cameraLensMountLabel']],
        fallbackContext: 'Lens Mount',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', function () {
        if (lensMountContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    function setLensMounts(list) {
      lensMountContainer.innerHTML = '';
      var filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(function (item) {
          var _ref33 = item || {},
            _ref33$type = _ref33.type,
            type = _ref33$type === void 0 ? '' : _ref33$type,
            _ref33$mount = _ref33.mount,
            mount = _ref33$mount === void 0 ? 'native' : _ref33$mount;
          lensMountContainer.appendChild(createLensMountRow(type, mount));
        });
      } else {
        lensMountContainer.appendChild(createLensMountRow());
      }
    }
    function getLensMounts() {
      return Array.from(lensMountContainer.querySelectorAll('.form-row')).map(function (row) {
        var _row$querySelectorAll7 = row.querySelectorAll('select'),
          _row$querySelectorAll8 = _slicedToArray(_row$querySelectorAll7, 2),
          typeSel = _row$querySelectorAll8[0],
          mountSel = _row$querySelectorAll8[1];
        return {
          type: typeSel.value,
          mount: mountSel.value
        };
      }).filter(function (lm) {
        return lm.type && lm.type !== 'None';
      });
    }
    function clearLensMounts() {
      setLensMounts([]);
    }
    function getAllPowerDistTypes() {
      var types = new Set();
      Object.values(devices.cameras).forEach(function (cam) {
        var _cam$power2;
        var list = (_cam$power2 = cam.power) === null || _cam$power2 === void 0 ? void 0 : _cam$power2.powerDistributionOutputs;
        if (Array.isArray(list)) {
          list.forEach(function (pd) {
            if (pd && pd.type) types.add(pd.type);
          });
        }
      });
      return Array.from(types).sort(localeSort);
    }
    var powerDistTypeOptions = getAllPowerDistTypes();
    function getAllPowerDistVoltages() {
      var volts = new Set();
      Object.values(devices.cameras).forEach(function (cam) {
        var _cam$power3;
        var list = (_cam$power3 = cam.power) === null || _cam$power3 === void 0 ? void 0 : _cam$power3.powerDistributionOutputs;
        if (Array.isArray(list)) {
          list.forEach(function (pd) {
            if (pd && pd.voltage) volts.add(pd.voltage);
          });
        }
      });
      return Array.from(volts).filter(function (v) {
        return v;
      }).sort(localeSort);
    }
    function getAllPowerDistCurrents() {
      var currents = new Set();
      Object.values(devices.cameras).forEach(function (cam) {
        var _cam$power4;
        var list = (_cam$power4 = cam.power) === null || _cam$power4 === void 0 ? void 0 : _cam$power4.powerDistributionOutputs;
        if (Array.isArray(list)) {
          list.forEach(function (pd) {
            if (pd && pd.current) currents.add(pd.current);
          });
        }
      });
      return Array.from(currents).filter(function (c) {
        return c;
      }).sort(localeSort);
    }
    var powerDistVoltageOptions = getAllPowerDistVoltages();
    var powerDistCurrentOptions = getAllPowerDistCurrents();
    function updatePowerDistVoltageOptions() {
      powerDistVoltageOptions = getAllPowerDistVoltages();
      document.querySelectorAll('.power-dist-voltage-select').forEach(function (sel) {
        var cur = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        powerDistVoltageOptions.forEach(function (optVal) {
          var opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          sel.appendChild(opt);
        });
        if (powerDistVoltageOptions.includes(cur)) sel.value = cur;
      });
    }
    function updatePowerDistCurrentOptions() {
      powerDistCurrentOptions = getAllPowerDistCurrents();
      document.querySelectorAll('.power-dist-current-select').forEach(function (sel) {
        var cur = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        powerDistCurrentOptions.forEach(function (optVal) {
          var opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          sel.appendChild(opt);
        });
        if (powerDistCurrentOptions.includes(cur)) sel.value = cur;
      });
    }
    function updatePowerDistTypeOptions() {
      powerDistTypeOptions = getAllPowerDistTypes();
      document.querySelectorAll('.power-dist-type-select').forEach(function (sel) {
        var cur = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        powerDistTypeOptions.forEach(function (optVal) {
          var opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          sel.appendChild(opt);
        });
        if (powerDistTypeOptions.includes(cur)) sel.value = cur;
      });
    }
    function createPowerDistRow() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var voltage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var current = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var wattage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      var notes = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
      var row = document.createElement('div');
      row.className = 'form-row';
      var typeSelect = document.createElement('select');
      typeSelect.className = 'power-dist-type-select';
      typeSelect.name = 'powerDistType';
      addEmptyOption(typeSelect);
      powerDistTypeOptions.forEach(function (optVal) {
        var opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        typeSelect.appendChild(opt);
      });
      if (type && !powerDistTypeOptions.includes(type)) {
        var opt = document.createElement('option');
        opt.value = type;
        opt.textContent = type;
        typeSelect.appendChild(opt);
      }
      typeSelect.value = type;
      row.appendChild(createFieldWithLabel(typeSelect, 'Type'));
      var voltSelect = document.createElement('select');
      voltSelect.className = 'power-dist-voltage-select';
      addEmptyOption(voltSelect);
      voltSelect.name = 'powerDistVoltage';
      powerDistVoltageOptions.forEach(function (optVal) {
        var opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        voltSelect.appendChild(opt);
      });
      if (voltage && !powerDistVoltageOptions.includes(voltage)) {
        var _opt2 = document.createElement('option');
        _opt2.value = voltage;
        _opt2.textContent = voltage;
        voltSelect.appendChild(_opt2);
      }
      voltSelect.value = voltage;
      row.appendChild(createFieldWithLabel(voltSelect, 'Voltage'));
      var currSelect = document.createElement('select');
      currSelect.className = 'power-dist-current-select';
      addEmptyOption(currSelect);
      currSelect.name = 'powerDistCurrent';
      powerDistCurrentOptions.forEach(function (optVal) {
        var opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        currSelect.appendChild(opt);
      });
      if (current && !powerDistCurrentOptions.includes(current)) {
        var _opt3 = document.createElement('option');
        _opt3.value = current;
        _opt3.textContent = current;
        currSelect.appendChild(_opt3);
      }
      currSelect.value = current;
      row.appendChild(createFieldWithLabel(currSelect, 'Current'));
      var wattInput = document.createElement('input');
      wattInput.type = 'number';
      wattInput.step = '0.1';
      wattInput.placeholder = 'W';
      wattInput.value = wattage === null || wattage === undefined ? '' : wattage;
      wattInput.name = 'powerDistWatt';
      row.appendChild(createFieldWithLabel(wattInput, 'W'));
      var notesInput = document.createElement('input');
      notesInput.type = 'text';
      notesInput.placeholder = 'Notes';
      notesInput.value = notes;
      notesInput.name = 'powerDistNotes';
      row.appendChild(createFieldWithLabel(notesInput, 'Notes'));
      var addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['powerDistributionHeading', ['cameraPowerDistLabel']],
        fallbackContext: 'Power Distribution',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', function () {
        row.after(createPowerDistRow());
      });
      row.appendChild(addBtn);
      var removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['powerDistributionHeading', ['cameraPowerDistLabel']],
        fallbackContext: 'Power Distribution',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', function () {
        if (powerDistContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    function setPowerDistribution(list) {
      powerDistContainer.innerHTML = '';
      var filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(function (item) {
          var _ref34 = item || {},
            _ref34$type = _ref34.type,
            type = _ref34$type === void 0 ? '' : _ref34$type,
            _ref34$voltage = _ref34.voltage,
            voltage = _ref34$voltage === void 0 ? '' : _ref34$voltage,
            _ref34$current = _ref34.current,
            current = _ref34$current === void 0 ? '' : _ref34$current,
            _ref34$wattage = _ref34.wattage,
            wattage = _ref34$wattage === void 0 ? '' : _ref34$wattage,
            _ref34$notes = _ref34.notes,
            notes = _ref34$notes === void 0 ? '' : _ref34$notes;
          powerDistContainer.appendChild(createPowerDistRow(type, voltage, current, wattage, notes));
        });
      } else {
        powerDistContainer.appendChild(createPowerDistRow());
      }
    }
    function getPowerDistribution() {
      return Array.from(powerDistContainer.querySelectorAll('.form-row')).map(function (row) {
        var _row$querySelectorAll9 = row.querySelectorAll('select, input'),
          _row$querySelectorAll0 = _slicedToArray(_row$querySelectorAll9, 5),
          typeSel = _row$querySelectorAll0[0],
          voltSel = _row$querySelectorAll0[1],
          currSel = _row$querySelectorAll0[2],
          wattInput = _row$querySelectorAll0[3],
          notesInput = _row$querySelectorAll0[4];
        return {
          type: typeSel.value,
          voltage: voltSel.value,
          current: currSel.value,
          wattage: wattInput.value ? parseFloat(wattInput.value) : null,
          notes: notesInput.value
        };
      }).filter(function (pd) {
        return pd.type && pd.type !== 'None';
      });
    }
    function clearPowerDistribution() {
      setPowerDistribution([]);
    }
    function getAllTimecodeTypes() {
      var types = new Set();
      Object.values(devices.cameras).forEach(function (cam) {
        var list = cam.timecode;
        if (Array.isArray(list)) {
          list.forEach(function (tc) {
            if (tc && tc.type) types.add(tc.type);
          });
        }
      });
      return Array.from(types).sort(localeSort);
    }
    var timecodeTypeOptions = getAllTimecodeTypes();
    function updateTimecodeTypeOptions() {
      timecodeTypeOptions = getAllTimecodeTypes();
      document.querySelectorAll('.timecode-type-select').forEach(function (sel) {
        var cur = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        timecodeTypeOptions.forEach(function (optVal) {
          var opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          sel.appendChild(opt);
        });
        if (timecodeTypeOptions.includes(cur)) sel.value = cur;
      });
    }
    function createTimecodeRow() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var notes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var row = document.createElement('div');
      row.className = 'form-row';
      var typeSelect = document.createElement('select');
      typeSelect.className = 'timecode-type-select';
      typeSelect.name = 'timecodeType';
      addEmptyOption(typeSelect);
      timecodeTypeOptions.forEach(function (optVal) {
        var opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        typeSelect.appendChild(opt);
      });
      if (type && !timecodeTypeOptions.includes(type)) {
        var opt = document.createElement('option');
        opt.value = type;
        opt.textContent = type;
        typeSelect.appendChild(opt);
      }
      typeSelect.value = type;
      row.appendChild(createFieldWithLabel(typeSelect, 'Type'));
      var notesInput = document.createElement('input');
      notesInput.type = 'text';
      notesInput.placeholder = 'Notes';
      notesInput.value = notes;
      notesInput.name = 'timecodeNotes';
      row.appendChild(createFieldWithLabel(notesInput, 'Notes'));
      var addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['timecodeHeading', ['cameraTimecodeLabel']],
        fallbackContext: 'Timecode',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', function () {
        row.after(createTimecodeRow());
      });
      row.appendChild(addBtn);
      var removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['timecodeHeading', ['cameraTimecodeLabel']],
        fallbackContext: 'Timecode',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', function () {
        if (timecodeContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    function setTimecodes(list) {
      timecodeContainer.innerHTML = '';
      var filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(function (item) {
          var _ref35 = item || {},
            _ref35$type = _ref35.type,
            type = _ref35$type === void 0 ? '' : _ref35$type,
            _ref35$notes = _ref35.notes,
            notes = _ref35$notes === void 0 ? '' : _ref35$notes;
          timecodeContainer.appendChild(createTimecodeRow(type, notes));
        });
      } else {
        timecodeContainer.appendChild(createTimecodeRow());
      }
    }
    function getTimecodes() {
      return Array.from(timecodeContainer.querySelectorAll('.form-row')).map(function (row) {
        var _row$querySelectorAll1 = row.querySelectorAll('select, input'),
          _row$querySelectorAll10 = _slicedToArray(_row$querySelectorAll1, 2),
          typeSel = _row$querySelectorAll10[0],
          notesInput = _row$querySelectorAll10[1];
        return {
          type: typeSel.value,
          notes: notesInput.value
        };
      }).filter(function (tc) {
        return tc.type && tc.type !== 'None';
      });
    }
    function clearTimecodes() {
      setTimecodes([]);
    }
    function getFavoriteValues(id) {
      var favs = loadFavorites();
      return Array.isArray(favs[id]) ? favs[id] : [];
    }
    var FAVORITE_BUTTON_BY_SELECT = new WeakMap();
    var FAVORITE_CHANGE_LISTENER_BY_SELECT = new WeakMap();
    var FAVORITE_BUTTON_LISTENER = new WeakMap();
    function applyFavoritesToSelect(selectElem) {
      if (!selectElem || !selectElem.id) return;
      var favVals = getFavoriteValues(selectElem.id);
      if (!favVals.length) return;
      var opts = Array.from(selectElem.options);
      var noneOpt = opts.find(function (o) {
        return o.value === 'None';
      });
      var others = opts.filter(function (o) {
        return o !== noneOpt;
      });
      var favOpts = [];
      var restOpts = [];
      others.forEach(function (o) {
        return favVals.includes(o.value) ? favOpts.push(o) : restOpts.push(o);
      });
      favOpts.sort(function (a, b) {
        return localeSort(a.textContent, b.textContent);
      });
      restOpts.sort(function (a, b) {
        return localeSort(a.textContent, b.textContent);
      });
      selectElem.innerHTML = '';
      if (noneOpt) selectElem.appendChild(noneOpt);
      favOpts.forEach(function (o) {
        return selectElem.appendChild(o);
      });
      restOpts.forEach(function (o) {
        return selectElem.appendChild(o);
      });
    }
    function getFavoriteButton(selectElem) {
      var button = FAVORITE_BUTTON_BY_SELECT.get(selectElem);
      if (button && button.isConnected) {
        return button;
      }
      return null;
    }
    function updateFavoriteButton(selectElem) {
      if (!selectElem) return;
      var favoriteButton = getFavoriteButton(selectElem);
      if (!favoriteButton) return;
      var favVals = getFavoriteValues(selectElem.id);
      var val = selectElem.value;
      var isFav = favVals.includes(val);
      favoriteButton.innerHTML = iconMarkup(ICON_GLYPHS.star, 'favorite-icon');
      favoriteButton.classList.toggle('favorited', isFav);
      favoriteButton.disabled = val === 'None';
      favoriteButton.setAttribute('aria-pressed', isFav ? 'true' : 'false');
    }
    function toggleFavorite(selectElem) {
      if (!selectElem || !selectElem.id) return;
      var val = selectElem.value;
      if (val === 'None') return;
      var favs = loadFavorites();
      var list = Array.isArray(favs[selectElem.id]) ? favs[selectElem.id] : [];
      var idx = list.indexOf(val);
      if (idx === -1) list.push(val);else list.splice(idx, 1);
      if (list.length) favs[selectElem.id] = list;else delete favs[selectElem.id];
      saveFavorites(favs);
      applyFavoritesToSelect(selectElem);
      updateFavoriteButton(selectElem);
      adjustGearListSelectWidth(selectElem);
    }
    var selectWidthMeasureElement = null;
    function getSelectWidthMeasureElement() {
      if (selectWidthMeasureElement && selectWidthMeasureElement.isConnected) {
        return selectWidthMeasureElement;
      }
      var span = document.createElement('span');
      span.className = 'gear-select-width-measure';
      Object.assign(span.style, {
        position: 'absolute',
        visibility: 'hidden',
        whiteSpace: 'pre',
        pointerEvents: 'none',
        top: '-9999px',
        left: '-9999px',
        padding: '0',
        margin: '0',
        border: '0'
      });
      var parent = document.body || document.documentElement;
      parent.appendChild(span);
      selectWidthMeasureElement = span;
      return span;
    }
    function measureSelectTextWidth(selectElem, text, styles) {
      var content = text && text.length ? text : "\xA0";
      var computedStyles = styles || window.getComputedStyle(selectElem);
      if (!computedStyles) {
        return content.length * 8;
      }
      var measureElem = getSelectWidthMeasureElement();
      var parent = document.body || document.documentElement;
      if (measureElem.parentElement !== parent) parent.appendChild(measureElem);
      if (computedStyles.font && computedStyles.font !== 'normal normal normal medium/normal serif') {
        measureElem.style.font = computedStyles.font;
      } else {
        measureElem.style.fontStyle = computedStyles.fontStyle || 'normal';
        measureElem.style.fontVariant = computedStyles.fontVariant || 'normal';
        measureElem.style.fontWeight = computedStyles.fontWeight || '400';
        measureElem.style.fontStretch = computedStyles.fontStretch || 'normal';
        measureElem.style.fontSize = computedStyles.fontSize || '16px';
        measureElem.style.fontFamily = computedStyles.fontFamily || 'sans-serif';
        measureElem.style.lineHeight = computedStyles.lineHeight || 'normal';
      }
      measureElem.style.letterSpacing = computedStyles.letterSpacing || 'normal';
      measureElem.style.textTransform = computedStyles.textTransform || 'none';
      measureElem.textContent = content;
      return measureElem.getBoundingClientRect().width;
    }
    function adjustGearListSelectWidth(selectElem) {
      if (!selectElem || selectElem.multiple || selectElem.size > 1) return;
      var container = selectElem.closest('#gearListOutput, #projectRequirementsOutput');
      if (!container) return;
      var styles = window.getComputedStyle(selectElem);
      if (!styles || styles.display === 'none') {
        selectElem.style.removeProperty('--gear-select-width');
        return;
      }
      var selectedOption = selectElem.selectedOptions && selectElem.selectedOptions[0];
      var optionText = selectedOption ? selectedOption.textContent.trim() : selectElem.value || '';
      var textWidth = measureSelectTextWidth(selectElem, optionText, styles);
      var paddingLeft = parseFloat(styles.paddingLeft) || 0;
      var paddingRight = parseFloat(styles.paddingRight) || 0;
      var borderLeft = parseFloat(styles.borderLeftWidth) || 0;
      var borderRight = parseFloat(styles.borderRightWidth) || 0;
      var fontSize = parseFloat(styles.fontSize) || 16;
      var arrowReserve = Math.max(fontSize * 0.5, 10);
      var minWidth = Math.max(fontSize * 4, 56);
      var widthPx = Math.max(Math.ceil(textWidth + paddingLeft + paddingRight + borderLeft + borderRight + arrowReserve), minWidth);
      selectElem.style.setProperty('--gear-select-width', "".concat(widthPx, "px"));
    }
    function adjustGearListSelectWidths(container) {
      if (!container) return;
      container.querySelectorAll('select').forEach(function (selectElem) {
        return adjustGearListSelectWidth(selectElem);
      });
    }
    function ensureSelectWrapper(selectElem) {
      if (!selectElem) return null;
      var wrapper = selectElem.parentElement;
      if (!wrapper || !wrapper.classList.contains('select-wrapper')) {
        if (wrapper && wrapper.tagName === 'LABEL') {
          var label = wrapper;
          wrapper = document.createElement('div');
          wrapper.className = 'select-wrapper';
          label.parentElement.insertBefore(wrapper, label.nextSibling);
          wrapper.appendChild(selectElem);
        } else {
          wrapper = document.createElement('div');
          wrapper.className = 'select-wrapper';
          selectElem.insertAdjacentElement('beforebegin', wrapper);
          wrapper.appendChild(selectElem);
        }
      }
      return wrapper;
    }
    function initFavoritableSelect(selectElem) {
      if (!selectElem || !selectElem.id || selectElem.multiple || selectElem.hidden) return;
      var wrapper = ensureSelectWrapper(selectElem);
      var gearItem = selectElem.closest('.gear-item');
      function cleanupFavoriteButton(btn) {
        var ownerSelect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        if (!btn) return;
        var listener = FAVORITE_BUTTON_LISTENER.get(btn);
        if (listener) {
          btn.removeEventListener('click', listener);
          FAVORITE_BUTTON_LISTENER.delete(btn);
        }
        if (ownerSelect && FAVORITE_BUTTON_BY_SELECT.get(ownerSelect) === btn) {
          FAVORITE_BUTTON_BY_SELECT.delete(ownerSelect);
        }
        btn.remove();
      }
      var favoriteButton = getFavoriteButton(selectElem);
      if (wrapper) {
        var wrapperButtons = Array.from(wrapper.querySelectorAll('.favorite-toggle'));
        if (favoriteButton && !wrapperButtons.includes(favoriteButton)) {
          favoriteButton = null;
        }
        if (!favoriteButton && wrapperButtons.length > 0) {
          favoriteButton = wrapperButtons[0];
        }
        wrapperButtons.forEach(function (btn) {
          if (btn !== favoriteButton) cleanupFavoriteButton(btn, selectElem);
        });
      }
      if (gearItem) {
        Array.from(gearItem.querySelectorAll('.favorite-toggle')).filter(function (btn) {
          return btn !== favoriteButton && btn.getAttribute('data-fav-select-id') === selectElem.id;
        }).forEach(function (btn) {
          return cleanupFavoriteButton(btn);
        });
      }
      if (!favoriteButton) {
        favoriteButton = document.createElement('button');
        if (wrapper) {
          wrapper.appendChild(favoriteButton);
        } else {
          selectElem.after(favoriteButton);
        }
      } else if (wrapper && favoriteButton.parentElement !== wrapper) {
        wrapper.appendChild(favoriteButton);
      }
      var previousListener = FAVORITE_BUTTON_LISTENER.get(favoriteButton);
      if (previousListener) {
        favoriteButton.removeEventListener('click', previousListener);
      }
      favoriteButton.type = 'button';
      favoriteButton.className = 'favorite-toggle';
      favoriteButton.innerHTML = iconMarkup(ICON_GLYPHS.star, 'favorite-icon');
      favoriteButton.setAttribute('aria-pressed', 'false');
      favoriteButton.setAttribute('data-fav-select-id', selectElem.id);
      var clickHandler = function clickHandler() {
        return toggleFavorite(selectElem);
      };
      favoriteButton.addEventListener('click', clickHandler);
      FAVORITE_BUTTON_LISTENER.set(favoriteButton, clickHandler);
      if (!FAVORITE_CHANGE_LISTENER_BY_SELECT.has(selectElem)) {
        var changeListener = function changeListener() {
          return updateFavoriteButton(selectElem);
        };
        selectElem.addEventListener('change', changeListener);
        FAVORITE_CHANGE_LISTENER_BY_SELECT.set(selectElem, changeListener);
      }
      FAVORITE_BUTTON_BY_SELECT.set(selectElem, favoriteButton);
      favoriteButton.setAttribute('data-fav-select-id', selectElem.id);
      favoriteButton.setAttribute('aria-label', texts[currentLang].favoriteToggleLabel);
      favoriteButton.setAttribute('title', texts[currentLang].favoriteToggleLabel);
      favoriteButton.setAttribute('data-help', texts[currentLang].favoriteToggleHelp || texts[currentLang].favoriteToggleLabel);
      applyFavoritesToSelect(selectElem);
      updateFavoriteButton(selectElem);
      adjustGearListSelectWidth(selectElem);
    }
    function populateSelect(selectElem) {
      var optionsObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var includeNone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (!selectElem) return;
      var opts = optionsObj && _typeof(optionsObj) === "object" ? optionsObj : {};
      selectElem.innerHTML = "";
      if (includeNone) {
        var noneOpt = document.createElement("option");
        noneOpt.value = "None";
        var noneMap = {
          de: "Keine Auswahl",
          es: "Ninguno",
          fr: "Aucun"
        };
        noneOpt.textContent = noneMap[currentLang] || "None";
        selectElem.appendChild(noneOpt);
      }
      Object.keys(opts).filter(function (name) {
        return name !== "None";
      }).sort(localeSort).forEach(function (name) {
        var opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name;
        selectElem.appendChild(opt);
      });
      initFavoritableSelect(selectElem);
    }
    function populateMonitorSelect() {
      var filtered = Object.fromEntries(Object.entries(devices.monitors || {}).filter(function (_ref36) {
        var _ref37 = _slicedToArray(_ref36, 2),
          data = _ref37[1];
        return !(data.wirelessRX && !data.wirelessTx);
      }));
      populateSelect(monitorSelect, filtered, true);
    }
    function getCompatibleCagesForCamera(cameraName) {
      var _devices;
      var allCages = ((_devices = devices) === null || _devices === void 0 || (_devices = _devices.accessories) === null || _devices === void 0 ? void 0 : _devices.cages) || {};
      if (!cameraName || cameraName === 'None') {
        return allCages;
      }
      return Object.fromEntries(Object.entries(allCages).filter(function (_ref38) {
        var _ref39 = _slicedToArray(_ref38, 2),
          cage = _ref39[1];
        if (!cage || _typeof(cage) !== 'object') {
          return true;
        }
        var compat = cage.compatible;
        if (Array.isArray(compat)) {
          return compat.includes(cameraName);
        }
        if (typeof compat === 'string' && compat) {
          return compat === cameraName;
        }
        return !compat;
      }));
    }
    function applyCageSelectValue(value) {
      if (!cageSelect) return;
      if (typeof setSelectValue === 'function') {
        setSelectValue(cageSelect, value);
        return;
      }
      if (typeof value === 'string') {
        cageSelect.value = value;
        if (cageSelect.value !== value) {
          if (value === 'None') {
            cageSelect.value = 'None';
          } else {
            cageSelect.selectedIndex = -1;
          }
        }
        return;
      }
      cageSelect.value = '';
    }
    function updateCageSelectOptions(preferredValue) {
      if (!cageSelect) return;
      var cameraName = cameraSelect ? cameraSelect.value : '';
      var compatibleCages = getCompatibleCagesForCamera(cameraName);
      var desiredValue = typeof preferredValue === 'string' ? preferredValue : cageSelect.value;
      populateSelect(cageSelect, compatibleCages, true);
      var hasDesired = desiredValue && desiredValue !== 'None' && Object.prototype.hasOwnProperty.call(compatibleCages, desiredValue);
      if (hasDesired) {
        applyCageSelectValue(desiredValue);
        return;
      }
      var options = Array.from(cageSelect.options || []);
      var noneOption = options.find(function (opt) {
        return opt.value === 'None';
      });
      if (desiredValue === 'None' && noneOption) {
        applyCageSelectValue('None');
        return;
      }
      if (noneOption) {
        applyCageSelectValue('None');
        return;
      }
      var firstOption = options.find(function (opt) {
        return opt.value && opt.value !== 'None';
      });
      applyCageSelectValue(firstOption ? firstOption.value : '');
    }
    function filterSelect(selectElem, filterValue) {
      var text = filterValue.toLowerCase();
      Array.from(selectElem.options).forEach(function (opt) {
        if (opt.value === "None" || text === "" || opt.textContent.toLowerCase().includes(text)) {
          opt.hidden = false;
          opt.disabled = false;
        } else {
          opt.hidden = true;
          opt.disabled = true;
        }
      });
    }
    function filterDeviceList(listElem, filterValue) {
      var text = filterValue.toLowerCase();
      Array.from(listElem.querySelectorAll('li')).forEach(function (li) {
        var nameSpan = li.querySelector('.device-summary span');
        var name = nameSpan ? nameSpan.textContent.toLowerCase() : '';
        if (text === '' || name.includes(text)) {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      });
    }
    function attachSelectSearch(selectElem) {
      var searchStr = "";
      var timer;
      selectElem.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace') {
          searchStr = searchStr.slice(0, -1);
          filterSelect(selectElem, searchStr);
          e.preventDefault();
        } else if (e.key === 'Escape') {
          searchStr = "";
          filterSelect(selectElem, searchStr);
        } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          searchStr += e.key.toLowerCase();
          filterSelect(selectElem, searchStr);
          e.preventDefault();
        } else {
          return;
        }
        clearTimeout(timer);
        timer = setTimeout(function () {
          searchStr = "";
        }, 1000);
        if (typeof timer.unref === 'function') {
          timer.unref();
        }
      });
      selectElem.addEventListener('blur', function () {
        searchStr = "";
        filterSelect(selectElem, "");
      });
    }
    function bindFilterInput(inputElem, callback) {
      if (!inputElem) {
        return;
      }
      inputElem.addEventListener("input", callback);
      inputElem.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          inputElem.value = "";
          callback();
        }
      });
      addInputClearButton(inputElem, callback);
    }
    function addInputClearButton(inputElem, callback) {
      var label = texts[currentLang] && texts[currentLang].clearFilter || "Clear filter";
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "clear-input-btn";
      btn.innerHTML = iconMarkup(ICON_GLYPHS.circleX, 'clear-icon');
      btn.setAttribute("aria-label", label);
      btn.title = label;
      btn.hidden = true;
      btn.addEventListener("click", function () {
        inputElem.value = "";
        callback();
        inputElem.focus();
      });
      inputElem.insertAdjacentElement("afterend", btn);
      var toggle = function toggle() {
        btn.hidden = !inputElem.value;
      };
      inputElem.addEventListener("input", toggle);
      toggle();
    }
    var filterHelperScope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
    if (filterHelperScope) {
      if (typeof filterHelperScope.filterSelect !== 'function') {
        filterHelperScope.filterSelect = filterSelect;
      }
      if (typeof filterHelperScope.filterDeviceList !== 'function') {
        filterHelperScope.filterDeviceList = filterDeviceList;
      }
      if (typeof filterHelperScope.attachSelectSearch !== 'function') {
        filterHelperScope.attachSelectSearch = attachSelectSearch;
      }
      if (typeof filterHelperScope.bindFilterInput !== 'function') {
        filterHelperScope.bindFilterInput = bindFilterInput;
      }
      if (typeof filterHelperScope.addInputClearButton !== 'function') {
        filterHelperScope.addInputClearButton = addInputClearButton;
      }
    }
    function applyFilters() {
      if (!(activeDeviceManagerLists instanceof Map)) return;
      activeDeviceManagerLists.forEach(function (_ref40) {
        var list = _ref40.list,
          filterInput = _ref40.filterInput;
        if (!list) return;
        var value = filterInput ? filterInput.value : '';
        filterDeviceList(list, value);
      });
    }
    if (filterHelperScope && typeof filterHelperScope.applyFilters !== 'function') {
      filterHelperScope.applyFilters = applyFilters;
    }
    populateSelect(cameraSelect, devices.cameras, true);
    populateMonitorSelect();
    populateSelect(videoSelect, devices.video, true);
    updateCageSelectOptions();
    motorSelects.forEach(function (sel) {
      return populateSelect(sel, devices.fiz.motors, true);
    });
    controllerSelects.forEach(function (sel) {
      return populateSelect(sel, devices.fiz.controllers, true);
    });
    populateSelect(distanceSelect, devices.fiz.distance, true);
    populateSelect(batterySelect, devices.batteries, true);
    populateSelect(hotswapSelect, devices.batteryHotswaps || {}, true);
    updateBatteryPlateVisibility();
    updateBatteryOptions();
    [cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, lensSelect].forEach(function (sel) {
      return attachSelectSearch(sel);
    });
    motorSelects.forEach(function (sel) {
      return attachSelectSearch(sel);
    });
    controllerSelects.forEach(function (sel) {
      return attachSelectSearch(sel);
    });
    applyFilters();
    setVideoOutputs([]);
    setMonitorVideoInputs([]);
    setMonitorVideoOutputs([]);
    setViewfinderVideoInputs([]);
    setViewfinderVideoOutputs([]);
    setFizConnectors([]);
    updateFizConnectorOptions();
    updateMotorConnectorOptions();
    updateControllerConnectorOptions();
    updateControllerPowerOptions();
    updateControllerBatteryOptions();
    updateControllerConnectivityOptions();
    updateDistanceConnectionOptions();
    updateDistanceMethodOptions();
    updateDistanceDisplayOptions();
    setViewfinders([]);
    setBatteryPlatesLocal([]);
    setRecordingMediaLocal([]);
    updateRecordingMediaOptions();
    updatePlateTypeOptions();
    setLensMounts([]);
    updateMountTypeOptions();
    updatePowerPortOptions();
    setPowerDistribution([]);
    updatePowerDistTypeOptions();
    updatePowerDistVoltageOptions();
    updatePowerDistCurrentOptions();
    setTimecodes([]);
    updateTimecodeTypeOptions();
    updateDistanceConnectionOptions();
    updateDistanceMethodOptions();
    updateDistanceDisplayOptions();
    var noneCameraOption = Array.from(cameraSelect.options).find(function (opt) {
      return opt.value === "None";
    });
    if (noneCameraOption) {
      cameraSelect.value = "None";
    } else {
      cameraSelect.selectedIndex = 0;
    }
    [monitorSelect, videoSelect, distanceSelect, batterySelect].forEach(function (sel) {
      var noneOption = Array.from(sel.options).find(function (opt) {
        return opt.value === "None";
      });
      if (noneOption) {
        sel.value = "None";
      } else {
        sel.selectedIndex = 0;
      }
    });
    motorSelects.forEach(function (sel) {
      if (sel.options.length) sel.value = "None";
    });
    controllerSelects.forEach(function (sel) {
      if (sel.options.length) sel.value = "None";
    });
    function updateCalculations() {
      var cineResultsModule = (typeof cineResults === "undefined" ? "undefined" : _typeof(cineResults)) === 'object' ? cineResults : null;
      var runModuleUpdate = cineResultsModule && typeof cineResultsModule.updateCalculations === 'function' ? cineResultsModule.updateCalculations : null;
      if (!runModuleUpdate) {
        console.warn('cineResults.updateCalculations not available');
        return;
      }
      try {
        runModuleUpdate({
          document: typeof document !== 'undefined' ? document : null,
          elements: {
            cameraSelect: cameraSelect,
            monitorSelect: monitorSelect,
            videoSelect: videoSelect,
            distanceSelect: distanceSelect,
            batterySelect: batterySelect,
            hotswapSelect: hotswapSelect,
            totalPowerElem: typeof totalPowerElem !== 'undefined' ? totalPowerElem : null,
            breakdownListElem: typeof breakdownListElem !== 'undefined' ? breakdownListElem : null,
            totalCurrent144Elem: typeof totalCurrent144Elem !== 'undefined' ? totalCurrent144Elem : null,
            totalCurrent12Elem: typeof totalCurrent12Elem !== 'undefined' ? totalCurrent12Elem : null,
            batteryLifeElem: typeof batteryLifeElem !== 'undefined' ? batteryLifeElem : null,
            batteryCountElem: typeof batteryCountElem !== 'undefined' ? batteryCountElem : null,
            batteryLifeLabelElem: typeof batteryLifeLabelElem !== 'undefined' ? batteryLifeLabelElem : null,
            runtimeAverageNoteElem: typeof runtimeAverageNoteElem !== 'undefined' ? runtimeAverageNoteElem : null,
            pinWarnElem: typeof pinWarnElem !== 'undefined' ? pinWarnElem : null,
            dtapWarnElem: typeof dtapWarnElem !== 'undefined' ? dtapWarnElem : null,
            hotswapWarnElem: typeof hotswapWarnElem !== 'undefined' ? hotswapWarnElem : null,
            batteryComparisonSection: typeof batteryComparisonSection !== 'undefined' ? batteryComparisonSection : null,
            batteryTableElem: typeof batteryTableElem !== 'undefined' ? batteryTableElem : null,
            setupDiagramContainer: typeof setupDiagramContainer !== 'undefined' ? setupDiagramContainer : null
          },
          motorSelects: motorSelects,
          controllerSelects: controllerSelects,
          getDevices: function getDevices() {
            return devices;
          },
          getTexts: function getTexts() {
            return texts;
          },
          getCurrentLang: function getCurrentLang() {
            return currentLang;
          },
          getCollator: function getCollator() {
            return typeof collator !== 'undefined' ? collator : null;
          },
          getSelectedPlate: typeof getSelectedPlate === 'function' ? getSelectedPlate : null,
          getMountVoltageConfig: typeof getMountVoltageConfig === 'function' ? getMountVoltageConfig : null,
          refreshTotalCurrentLabels: typeof refreshTotalCurrentLabels === 'function' ? refreshTotalCurrentLabels : null,
          updateBatteryOptions: typeof updateBatteryOptions === 'function' ? updateBatteryOptions : null,
          setStatusMessage: typeof setStatusMessage === 'function' ? setStatusMessage : null,
          setStatusLevel: typeof setStatusLevel === 'function' ? setStatusLevel : null,
          closePowerWarningDialog: typeof closePowerWarningDialog === 'function' ? closePowerWarningDialog : null,
          showPowerWarningDialog: typeof showPowerWarningDialog === 'function' ? showPowerWarningDialog : null,
          drawPowerDiagram: typeof drawPowerDiagram === 'function' ? drawPowerDiagram : null,
          renderFeedbackTable: typeof renderFeedbackTable === 'function' ? renderFeedbackTable : null,
          getCurrentSetupKey: typeof getCurrentSetupKey === 'function' ? getCurrentSetupKey : null,
          renderTemperatureNote: typeof renderTemperatureNote === 'function' ? renderTemperatureNote : null,
          checkFizCompatibility: typeof checkFizCompatibility === 'function' ? checkFizCompatibility : null,
          checkFizController: typeof checkFizController === 'function' ? checkFizController : null,
          checkArriCompatibility: typeof checkArriCompatibility === 'function' ? checkArriCompatibility : null,
          renderSetupDiagram: typeof renderSetupDiagram === 'function' ? renderSetupDiagram : null,
          refreshGearListIfVisible: typeof refreshGearListIfVisible === 'function' ? refreshGearListIfVisible : null,
          supportsBMountCamera: typeof supportsBMountCamera === 'function' ? supportsBMountCamera : null,
          supportsGoldMountCamera: typeof supportsGoldMountCamera === 'function' ? supportsGoldMountCamera : null,
          getCssVariableValue: typeof getCssVariableValue === 'function' ? getCssVariableValue : null,
          escapeHtml: typeof escapeHtml === 'function' ? escapeHtml : null,
          getLastRuntimeHours: function getLastRuntimeHours() {
            return lastRuntimeHours;
          },
          setLastRuntimeHours: function setLastRuntimeHours(value) {
            lastRuntimeHours = value;
          }
        });
      } catch (error) {
        console.warn('cineResults.updateCalculations failed', error);
      }
    }
    function getCurrentSetupKey() {
      var safeSelectValue = function safeSelectValue(select) {
        return select && typeof select.value === 'string' ? select.value : '';
      };
      var safeListValues = function safeListValues(list) {
        return Array.isArray(list) ? list.map(function (sel) {
          return safeSelectValue(sel);
        }).filter(function (value) {
          return value && value !== 'None';
        }).sort().join(',') : '';
      };
      var camera = safeSelectValue(cameraSelect);
      var monitor = safeSelectValue(monitorSelect);
      var video = safeSelectValue(videoSelect);
      var cage = safeSelectValue(cageSelect);
      var motors = safeListValues(motorSelects);
      var controllers = safeListValues(controllerSelects);
      var distance = safeSelectValue(distanceSelect);
      var battery = safeSelectValue(batterySelect);
      var hotswap = safeSelectValue(hotswapSelect);
      var plate = typeof getSelectedPlate === 'function' ? getSelectedPlate() || '' : '';
      return [camera, monitor, video, cage, motors, controllers, distance, battery, hotswap, plate].join('|');
    }
    function deleteFeedbackEntry(key, index) {
      var feedbackData = loadFeedbackSafe();
      if (feedbackData[key]) {
        feedbackData[key].splice(index, 1);
        if (!feedbackData[key].length) {
          delete feedbackData[key];
        }
        saveFeedbackSafe(feedbackData);
        updateCalculations();
      }
    }
    function renderFeedbackTable(currentKey) {
      var _devices2, _cameraSelect, _devices3, _monitorSelect, _devices4, _videoSelect, _devices7, _distanceSelect, _devices8, _monitorSelect2, _texts$currentLang74, _texts$en171;
      var container = document.getElementById('feedbackTableContainer');
      var table = document.getElementById('userFeedbackTable');
      var feedbackData = loadFeedbackSafe();
      var entries = (feedbackData[currentKey] || []).map(function (entry) {
        var rest = _objectSpread({}, entry);
        delete rest.location;
        return rest;
      });
      if (!entries.length) {
        if (table) {
          table.innerHTML = '';
          table.classList.add('hidden');
        }
        if (container) container.classList.add('hidden');
        return null;
      }
      var columns = [{
        key: 'username',
        label: 'User'
      }, {
        key: 'date',
        label: 'Date'
      }, {
        key: 'cameraWifi',
        label: 'WIFI'
      }, {
        key: 'resolution',
        label: 'Res'
      }, {
        key: 'codec',
        label: 'Codec'
      }, {
        key: 'framerate',
        label: 'FPS'
      }, {
        key: 'firmware',
        label: 'Firmware'
      }, {
        key: 'batteryAge',
        label: 'Battery Age'
      }, {
        key: 'monitorBrightness',
        label: 'Monitor Brightness'
      }, {
        key: 'temperature',
        label: 'temp'
      }, {
        key: 'charging',
        label: 'Charging'
      }, {
        key: 'runtime',
        label: 'runtime'
      }, {
        key: 'batteriesPerDay',
        label: 'batteries a day'
      }, {
        key: 'weighting',
        label: 'weight'
      }];
      var parseResolution = function parseResolution(str) {
        if (!str) return null;
        var s = String(str).toLowerCase();
        var kMatch = s.match(/(\d+(?:\.\d+)?)\s*k/);
        if (kMatch) return parseFloat(kMatch[1]) * 1000;
        var pMatch = s.match(/(\d{3,4})p/);
        if (pMatch) return parseInt(pMatch[1], 10);
        var xMatch = s.match(/x\s*(\d{3,4})/);
        if (xMatch) return parseInt(xMatch[1], 10);
        var numMatch = s.match(/(\d{3,4})/);
        return numMatch ? parseInt(numMatch[1], 10) : null;
      };
      var parseFramerate = function parseFramerate(str) {
        if (!str) return null;
        var m = String(str).match(/\d+(?:\.\d+)?/);
        return m ? parseFloat(m[0]) : null;
      };
      var tempFactor = function tempFactor(temp) {
        if (Number.isNaN(temp)) return 1;
        if (temp >= 25) return 1;
        if (temp >= 0) return 1 + (25 - temp) * 0.01;
        if (temp >= -10) return 1.25 + -temp * 0.035;
        if (temp >= -20) return 1.6 + (-10 - temp) * 0.04;
        return 2;
      };
      var resolutionWeight = function resolutionWeight(res) {
        if (res >= 12000) return 3;
        if (res >= 8000) return 2;
        if (res >= 4000) return 1.5;
        if (res >= 1080) return 1;
        return res / 1080;
      };
      var codecWeight = function codecWeight(codec) {
        if (!codec) return 1;
        var c = String(codec).toLowerCase();
        if (/(prores\s*raw|braw|arriraw|r3d|redcode|cinema\s*dng|cdng|canon\s*raw|x-ocn|raw)/.test(c)) return 1;
        if (/prores/.test(c)) return 1.1;
        if (/dnx|avid/.test(c)) return 1.2;
        if (/\ball[\s-]?i\b|all\s*intra|intra/.test(c)) return 1.3;
        if (/h265|h\.265|hevc|xavc\s*hs|xhevc/.test(c)) return 1.7;
        if (/h264|h\.264|avc|xavc|avchd|mpeg-4/.test(c)) return 1.5;
        return 1;
      };
      var camPower = ((_devices2 = devices) === null || _devices2 === void 0 || (_devices2 = _devices2.cameras) === null || _devices2 === void 0 || (_devices2 = _devices2[(_cameraSelect = cameraSelect) === null || _cameraSelect === void 0 ? void 0 : _cameraSelect.value]) === null || _devices2 === void 0 ? void 0 : _devices2.powerDrawWatts) || 0;
      var monitorPower = ((_devices3 = devices) === null || _devices3 === void 0 || (_devices3 = _devices3.monitors) === null || _devices3 === void 0 || (_devices3 = _devices3[(_monitorSelect = monitorSelect) === null || _monitorSelect === void 0 ? void 0 : _monitorSelect.value]) === null || _devices3 === void 0 ? void 0 : _devices3.powerDrawWatts) || 0;
      var videoPower = ((_devices4 = devices) === null || _devices4 === void 0 || (_devices4 = _devices4.video) === null || _devices4 === void 0 || (_devices4 = _devices4[(_videoSelect = videoSelect) === null || _videoSelect === void 0 ? void 0 : _videoSelect.value]) === null || _devices4 === void 0 ? void 0 : _devices4.powerDrawWatts) || 0;
      var motorPower = motorSelects.reduce(function (sum, sel) {
        var _devices5;
        return sum + (((_devices5 = devices) === null || _devices5 === void 0 || (_devices5 = _devices5.fiz) === null || _devices5 === void 0 || (_devices5 = _devices5.motors) === null || _devices5 === void 0 || (_devices5 = _devices5[sel.value]) === null || _devices5 === void 0 ? void 0 : _devices5.powerDrawWatts) || 0);
      }, 0);
      var controllerPower = controllerSelects.reduce(function (sum, sel) {
        var _devices6;
        return sum + (((_devices6 = devices) === null || _devices6 === void 0 || (_devices6 = _devices6.fiz) === null || _devices6 === void 0 || (_devices6 = _devices6.controllers) === null || _devices6 === void 0 || (_devices6 = _devices6[sel.value]) === null || _devices6 === void 0 ? void 0 : _devices6.powerDrawWatts) || 0);
      }, 0);
      var distancePower = ((_devices7 = devices) === null || _devices7 === void 0 || (_devices7 = _devices7.fiz) === null || _devices7 === void 0 || (_devices7 = _devices7.distance) === null || _devices7 === void 0 || (_devices7 = _devices7[(_distanceSelect = distanceSelect) === null || _distanceSelect === void 0 ? void 0 : _distanceSelect.value]) === null || _devices7 === void 0 ? void 0 : _devices7.powerDrawWatts) || 0;
      var otherPower = videoPower + motorPower + controllerPower + distancePower;
      var totalPower = camPower + monitorPower + otherPower;
      var specBrightness = (_devices8 = devices) === null || _devices8 === void 0 || (_devices8 = _devices8.monitors) === null || _devices8 === void 0 || (_devices8 = _devices8[(_monitorSelect2 = monitorSelect) === null || _monitorSelect2 === void 0 ? void 0 : _monitorSelect2.value]) === null || _devices8 === void 0 ? void 0 : _devices8.brightnessNits;
      var weightedSum = 0;
      var weightTotal = 0;
      var count = 0;
      var breakdown = entries.map(function (e) {
        var rt = parseFloat(e.runtime);
        if (Number.isNaN(rt)) return null;
        var camFactor = 1;
        var monitorFactor = 1;
        var res = parseResolution(e.resolution);
        if (res) camFactor *= resolutionWeight(res);
        var fps = parseFramerate(e.framerate);
        if (fps) camFactor *= fps / 24;
        var wifi = (e.cameraWifi || '').toLowerCase();
        if (wifi.includes('on')) camFactor *= 1.1;
        var codec = e.codec;
        if (codec) camFactor *= codecWeight(codec);
        var entryBrightness = parseFloat(e.monitorBrightness);
        if (!Number.isNaN(entryBrightness) && specBrightness) {
          var ratio = entryBrightness / specBrightness;
          if (ratio < 1) monitorFactor *= ratio;
        }
        var weight = 1;
        if (totalPower > 0) {
          weight = (camFactor * camPower + monitorFactor * monitorPower + otherPower) / totalPower;
        }
        var temp = parseFloat(e.temperature);
        var tempMul = tempFactor(temp);
        var adjustedRuntime = rt * tempMul;
        weightedSum += adjustedRuntime * weight;
        weightTotal += weight;
        count++;
        return {
          temperature: tempMul,
          resolution: res ? resolutionWeight(res) : 1,
          framerate: fps ? fps / 24 : 1,
          wifi: wifi.includes('on') ? 1.1 : 1,
          codec: codec ? codecWeight(codec) : 1,
          monitor: monitorFactor,
          weight: weight
        };
      });
      var maxWeight = Math.max.apply(Math, _toConsumableArray(breakdown.filter(Boolean).map(function (b) {
        return b.weight;
      })).concat([0]));
      var html = '<tr>' + columns.map(function (c) {
        return "<th>".concat(escapeHtml(c.label), "</th>");
      }).join('') + '<th></th></tr>';
      var deleteFeedbackLabel = ((_texts$currentLang74 = texts[currentLang]) === null || _texts$currentLang74 === void 0 ? void 0 : _texts$currentLang74.deleteSetupBtn) || ((_texts$en171 = texts.en) === null || _texts$en171 === void 0 ? void 0 : _texts$en171.deleteSetupBtn) || 'Delete';
      entries.forEach(function (entry, index) {
        html += '<tr>';
        columns.forEach(function (c) {
          if (c.key === 'weighting') {
            var b = breakdown[index];
            if (b) {
              var percent = maxWeight ? b.weight / maxWeight * 100 : 0;
              var share = b.weight * 100;
              var tooltip = "Temp \xD7".concat(b.temperature.toFixed(2), "\n") + "Res \xD7".concat(b.resolution.toFixed(2), "\n") + "FPS \xD7".concat(b.framerate.toFixed(2), "\n") + "Codec \xD7".concat(b.codec.toFixed(2), "\n") + "Wi-Fi \xD7".concat(b.wifi.toFixed(2), "\n") + "Monitor \xD7".concat(b.monitor.toFixed(2), "\n") + "Share ".concat(share.toFixed(1), "%");
              html += "<td><div class=\"weightingRow\"><div class=\"barContainer\"><div class=\"weightBar\" style=\"width:".concat(percent, "%\" title=\"").concat(escapeHtml(tooltip), "\"></div></div><span class=\"weightingPercent\">").concat(share.toFixed(1), "%</span></div></td>");
            } else {
              html += '<td></td>';
            }
          } else if (c.key === 'date') {
            html += "<td>".concat(escapeHtml(formatDateString(entry[c.key])), "</td>");
          } else {
            html += "<td>".concat(escapeHtml(entry[c.key] || ''), "</td>");
          }
        });
        html += "<td><button data-key=\"".concat(encodeURIComponent(currentKey), "\" data-index=\"").concat(index, "\" class=\"deleteFeedbackBtn\">").concat(iconMarkup(ICON_GLYPHS.trash, 'btn-icon')).concat(escapeHtml(deleteFeedbackLabel), "</button></td>");
        html += '</tr>';
      });
      table.innerHTML = html;
      table.classList.remove('hidden');
      if (container) container.classList.remove('hidden');
      table.querySelectorAll('.deleteFeedbackBtn').forEach(function (btn) {
        btn.setAttribute('aria-label', deleteFeedbackLabel);
        btn.setAttribute('title', deleteFeedbackLabel);
        btn.addEventListener('click', function () {
          var key = decodeURIComponent(btn.dataset.key);
          var idx = parseInt(btn.dataset.index, 10);
          deleteFeedbackEntry(key, idx);
        });
      });
      if (count >= 3 && weightTotal > 0) {
        return {
          runtime: weightedSum / weightTotal,
          count: count,
          weight: weightTotal
        };
      }
      return null;
    }
    function normalizeDeviceValueForComparison(value) {
      if (Array.isArray(value)) {
        return value.map(function (item) {
          return normalizeDeviceValueForComparison(item);
        });
      }
      if (isPlainObjectValue(value)) {
        var normalized = {};
        Object.keys(value).filter(function (key) {
          return value[key] !== undefined;
        }).sort().forEach(function (key) {
          normalized[key] = normalizeDeviceValueForComparison(value[key]);
        });
        return normalized;
      }
      if (value === undefined) {
        return null;
      }
      return value;
    }
    function deviceEntriesEqual(a, b) {
      if (a === b) return true;
      if ((a === null || a === undefined) && (b === null || b === undefined)) {
        return true;
      }
      if (a === null || a === undefined || b === null || b === undefined) {
        return false;
      }
      var normalizedA = normalizeDeviceValueForComparison(a);
      var normalizedB = normalizeDeviceValueForComparison(b);
      return JSON.stringify(normalizedA) === JSON.stringify(normalizedB);
    }
    function getDeviceChanges() {
      if (!window.defaultDevices) return {};
      var diff = {};
      var record = function record(cat, name, val, sub) {
        if (sub) {
          diff.fiz = diff.fiz || {};
          diff.fiz[sub] = diff.fiz[sub] || {};
          diff.fiz[sub][name] = val;
        } else {
          diff[cat] = diff[cat] || {};
          diff[cat][name] = val;
        }
      };
      var compare = function compare(cat, defCat, curCat, sub) {
        Object.keys(curCat).forEach(function (name) {
          var cur = curCat[name];
          var def = defCat[name];
          if (!def || !deviceEntriesEqual(cur, def)) {
            record(cat, name, cur, sub);
          }
        });
        Object.keys(defCat).forEach(function (name) {
          if (!curCat[name]) record(cat, name, null, sub);
        });
      };
      compare('cameras', window.defaultDevices.cameras || {}, devices.cameras || {});
      compare('viewfinders', window.defaultDevices.viewfinders || {}, devices.viewfinders || {});
      compare('monitors', window.defaultDevices.monitors || {}, devices.monitors || {});
      compare('video', window.defaultDevices.video || {}, devices.video || {});
      compare('batteries', window.defaultDevices.batteries || {}, devices.batteries || {});
      compare('batteryHotswaps', window.defaultDevices.batteryHotswaps || {}, devices.batteryHotswaps || {});
      ['motors', 'controllers', 'distance'].forEach(function (sub) {
        var defCat = window.defaultDevices.fiz ? window.defaultDevices.fiz[sub] || {} : {};
        var curCat = devices.fiz ? devices.fiz[sub] || {} : {};
        compare('fiz', defCat, curCat, sub);
        if (diff.fiz && diff.fiz[sub] && !Object.keys(diff.fiz[sub]).length) {
          delete diff.fiz[sub];
        }
      });
      if (diff.fiz && !Object.keys(diff.fiz).length) delete diff.fiz;
      Object.keys(diff).forEach(function (cat) {
        if (cat !== 'fiz' && !Object.keys(diff[cat]).length) delete diff[cat];
      });
      return diff;
    }
    function applyDeviceChanges(changes) {
      if (!changes || _typeof(changes) !== 'object') return;
      var applyToCategory = function applyToCategory(target, delta) {
        Object.keys(delta).forEach(function (name) {
          var val = delta[name];
          if (val === null) {
            delete target[name];
          } else {
            target[name] = val;
          }
        });
      };
      Object.keys(changes).forEach(function (cat) {
        if (cat === 'fiz') {
          Object.keys(changes.fiz || {}).forEach(function (sub) {
            devices.fiz[sub] = devices.fiz[sub] || {};
            applyToCategory(devices.fiz[sub], changes.fiz[sub]);
          });
        } else {
          devices[cat] = devices[cat] || {};
          applyToCategory(devices[cat], changes[cat]);
        }
      });
      unifyDevices(devices);
      storeDevices(devices);
      refreshDeviceLists();
      populateSelect(cameraSelect, devices.cameras, true);
      populateMonitorSelect();
      populateSelect(videoSelect, devices.video, true);
      updateCageSelectOptions();
      motorSelects.forEach(function (sel) {
        return populateSelect(sel, devices.fiz.motors, true);
      });
      controllerSelects.forEach(function (sel) {
        return populateSelect(sel, devices.fiz.controllers, true);
      });
      populateSelect(distanceSelect, devices.fiz.distance, true);
      populateSelect(batterySelect, devices.batteries, true);
      updateFizConnectorOptions();
      updateMotorConnectorOptions();
      updateControllerConnectorOptions();
      updateControllerPowerOptions();
      updateControllerBatteryOptions();
      updateControllerConnectivityOptions();
      updateDistanceConnectionOptions();
      updateDistanceMethodOptions();
      updateDistanceDisplayOptions();
    }
    function formatValue(value) {
      if (Array.isArray(value)) {
        return value.map(function (v) {
          return formatValue(v);
        }).join('; ');
      }
      if (value && _typeof(value) === 'object') {
        var parts = [];
        for (var k in value) {
          if (value[k] === '' || value[k] === null || value[k] === undefined) continue;
          parts.push("".concat(coreHumanizeKey(k), ": ").concat(formatValue(value[k])));
        }
        return "{ ".concat(parts.join(', '), " }");
      }
      if (typeof value === 'boolean') return value ? 'Yes' : 'No';
      return String(value);
    }
    function createDeviceDetailsList(deviceData) {
      var list = document.createElement('ul');
      list.className = 'device-detail-list';
      var appendItem = function appendItem(key, value, parent) {
        if (value === '' || value === null || value === undefined) return;
        var li = document.createElement('li');
        var label = document.createElement('strong');
        label.textContent = coreHumanizeKey(key) + ':';
        li.appendChild(label);
        if (Array.isArray(value)) {
          if (value.length && _typeof(value[0]) === 'object') {
            var subList = document.createElement('ul');
            subList.className = 'device-detail-list';
            value.forEach(function (v) {
              var subLi = document.createElement('li');
              subLi.appendChild(createDeviceDetailsList(v));
              subList.appendChild(subLi);
            });
            li.appendChild(subList);
          } else {
            li.appendChild(document.createTextNode(value.map(function (v) {
              return formatValue(v);
            }).join(', ')));
          }
        } else if (value && _typeof(value) === 'object') {
          li.appendChild(createDeviceDetailsList(value));
        } else {
          li.appendChild(document.createTextNode(formatValue(value)));
        }
        parent.appendChild(li);
      };
      if (_typeof(deviceData) !== 'object') {
        appendItem('powerDrawWatts', deviceData, list);
      } else {
        Object.keys(deviceData).forEach(function (k) {
          return appendItem(k, deviceData[k], list);
        });
      }
      return list;
    }
    function formatDateString(val) {
      if (!val) return '';
      var d = new Date(val);
      if (Number.isNaN(d.getTime())) return String(val);
      return d.toISOString().split('T')[0];
    }
    function renderDeviceList(categoryKey, ulElement) {
      ulElement.innerHTML = "";
      var categoryDevices = devices[categoryKey];
      if (categoryKey.includes('.')) {
        var _categoryKey$split = categoryKey.split('.'),
          _categoryKey$split2 = _slicedToArray(_categoryKey$split, 2),
          mainCat = _categoryKey$split2[0],
          subCat = _categoryKey$split2[1];
        categoryDevices = devices[mainCat] && devices[mainCat][subCat];
      }
      if (!categoryDevices) return;
      var buildItem = function buildItem(name, deviceData, subcategory) {
        if (name === "None") return;
        var li = document.createElement("li");
        var header = document.createElement("div");
        header.className = "device-summary";
        var nameSpan = document.createElement("span");
        nameSpan.textContent = name;
        var summary = generateSafeConnectorSummary(deviceData);
        summary = summary ? summary.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '';
        if (deviceData.notes) {
          summary = summary ? "".concat(summary, "; Notes: ").concat(deviceData.notes) : deviceData.notes;
        }
        if (summary) {
          nameSpan.setAttribute('title', summary);
          nameSpan.setAttribute('data-help', summary);
        }
        header.appendChild(nameSpan);
        var toggleBtn = document.createElement("button");
        toggleBtn.className = "detail-toggle";
        toggleBtn.type = "button";
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.textContent = texts[currentLang].showDetails;
        toggleBtn.setAttribute('data-help', texts[currentLang].showDetails);
        header.appendChild(toggleBtn);
        var editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.dataset.name = name;
        editBtn.dataset.category = categoryKey;
        if (subcategory) editBtn.dataset.subcategory = subcategory;
        editBtn.textContent = texts[currentLang].editBtn;
        editBtn.setAttribute('data-help', texts[currentLang].editBtnHelp || texts[currentLang].editBtn);
        header.appendChild(editBtn);
        var deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.dataset.name = name;
        deleteBtn.dataset.category = categoryKey;
        if (subcategory) deleteBtn.dataset.subcategory = subcategory;
        deleteBtn.textContent = texts[currentLang].deleteDeviceBtn;
        deleteBtn.setAttribute('data-help', texts[currentLang].deleteDeviceBtnHelp || texts[currentLang].deleteDeviceBtn);
        header.appendChild(deleteBtn);
        li.appendChild(header);
        var detailsDiv = document.createElement("div");
        detailsDiv.className = "device-details";
        detailsDiv.style.display = "none";
        detailsDiv.appendChild(createDeviceDetailsList(deviceData));
        li.appendChild(detailsDiv);
        ulElement.appendChild(li);
      };
      if (categoryKey === "accessories.cables") {
        for (var _i1 = 0, _Object$entries7 = Object.entries(categoryDevices); _i1 < _Object$entries7.length; _i1++) {
          var _Object$entries7$_i = _slicedToArray(_Object$entries7[_i1], 2),
            subcat = _Object$entries7$_i[0],
            devs = _Object$entries7$_i[1];
          for (var name in devs) {
            buildItem(name, devs[name], subcat);
          }
        }
      } else {
        for (var _name in categoryDevices) {
          buildItem(_name, categoryDevices[_name]);
        }
      }
    }
    function refreshDeviceLists() {
      syncDeviceManagerCategories();
      if (!(activeDeviceManagerLists instanceof Map)) return;
      activeDeviceManagerLists.forEach(function (_ref41, categoryKey) {
        var list = _ref41.list,
          filterInput = _ref41.filterInput;
        if (!list) return;
        renderDeviceList(categoryKey, list);
        var filterValue = filterInput ? filterInput.value : '';
        filterDeviceList(list, filterValue);
      });
    }
    var CORE_PART2_GLOBAL_EXPORTS = {
      populateSelect: populateSelect,
      refreshDeviceLists: refreshDeviceLists,
      hasAnyDeviceSelection: hasAnyDeviceSelection,
      refreshAutoGearCameraOptions: refreshAutoGearCameraOptions,
      refreshAutoGearCameraWeightCondition: refreshAutoGearCameraWeightCondition,
      refreshAutoGearMonitorOptions: refreshAutoGearMonitorOptions,
      refreshAutoGearTripodHeadOptions: refreshAutoGearTripodHeadOptions,
      refreshAutoGearTripodBowlOptions: refreshAutoGearTripodBowlOptions,
      refreshAutoGearTripodTypesOptions: refreshAutoGearTripodTypesOptions,
      refreshAutoGearTripodSpreaderOptions: refreshAutoGearTripodSpreaderOptions,
      refreshAutoGearWirelessOptions: refreshAutoGearWirelessOptions,
      refreshAutoGearMotorsOptions: refreshAutoGearMotorsOptions,
      refreshAutoGearControllersOptions: refreshAutoGearControllersOptions,
      refreshAutoGearCrewOptions: refreshAutoGearCrewOptions,
      refreshAutoGearDistanceOptions: refreshAutoGearDistanceOptions,
      exportAutoGearRules: exportAutoGearRules,
      updateAutoGearCameraWeightDraft: updateAutoGearCameraWeightDraft,
      updateAutoGearShootingDaysDraft: updateAutoGearShootingDaysDraft,
      checkSetupChanged: checkSetupChanged,
      updateCalculations: updateCalculations,
      feedbackCancelBtn: feedbackCancelBtn,
      alignActiveAutoGearPreset: alignActiveAutoGearPreset,
      closeAutoGearEditor: closeAutoGearEditor,
      reconcileAutoGearAutoPresetState: reconcileAutoGearAutoPresetState,
      renderAutoGearBackupControls: renderAutoGearBackupControls,
      renderAutoGearBackupRetentionControls: renderAutoGearBackupRetentionControls,
      renderAutoGearDraftImpact: renderAutoGearDraftImpact,
      renderAutoGearDraftLists: renderAutoGearDraftLists,
      renderAutoGearMonitorDefaultsControls: renderAutoGearMonitorDefaultsControls,
      renderAutoGearPresetsControls: renderAutoGearPresetsControls,
      renderAutoGearRulesList: renderAutoGearRulesList,
      openAutoGearEditor: openAutoGearEditor,
      overviewSectionIcons: overviewSectionIcons,
      saveAutoGearRuleFromEditor: saveAutoGearRuleFromEditor,
      handleAutoGearImportSelection: handleAutoGearImportSelection,
      handleAutoGearPresetSelection: handleAutoGearPresetSelection,
      handleAutoGearSavePreset: handleAutoGearSavePreset,
      handleAutoGearDeletePreset: handleAutoGearDeletePreset,
      applyAutoGearBackupVisibility: applyAutoGearBackupVisibility,
      setAutoGearBackupsVisible: setAutoGearBackupsVisible,
      setAutoGearAutoPresetId: setAutoGearAutoPresetId,
      syncAutoGearAutoPreset: syncAutoGearAutoPreset,
      updateAutoGearCatalogOptions: updateAutoGearCatalogOptions,
      updateAutoGearItemButtonState: updateAutoGearItemButtonState,
      updateAutoGearMonitorDefaultOptions: updateAutoGearMonitorDefaultOptions,
      applyFavoritesToSelect: applyFavoritesToSelect,
      updateFavoriteButton: updateFavoriteButton,
      toggleFavorite: toggleFavorite,
      accentColor: accentColor,
      loadStoredLogoPreview: loadStoredLogoPreview,
      renderSettingsLogoPreview: renderSettingsLogoPreview,
      normalizeSpellingVariants: normalizeSpellingVariants,
      prevAccentColor: prevAccentColor,
      revertAccentColor: revertAccentColor,
      DEFAULT_ACCENT_COLOR: DEFAULT_ACCENT_COLOR,
      HIGH_CONTRAST_ACCENT_COLOR: HIGH_CONTRAST_ACCENT_COLOR,
      applyAccentColor: applyAccentColor,
      clearAccentColorOverrides: clearAccentColorOverrides,
      updateAccentColorResetButtonState: updateAccentColorResetButtonState,
      restoringSession: restoringSession,
      currentProjectInfo: currentProjectInfo,
      deriveProjectInfo: deriveProjectInfo,
      projectForm: projectForm,
      filterSelectElem: filterSelectElem,
      filterDetailsStorage: filterDetailsStorage,
      loadFeedbackSafe: loadFeedbackSafe,
      saveFeedbackSafe: saveFeedbackSafe,
      ensureDefaultProjectInfoSnapshot: ensureDefaultProjectInfoSnapshot,
      skipNextGearListRefresh: skipNextGearListRefresh,
      refreshDarkModeAccentBoost: refreshDarkModeAccentBoost,
      isHighContrastActive: isHighContrastActive,
      feedbackUseLocationBtn: feedbackUseLocationBtn,
      getSliderBowlValue: getSliderBowlValue,
      getEasyrigValue: getEasyrigValue,
      setEasyrigValue: setEasyrigValue,
      fontSize: fontSize,
      fontFamily: fontFamily,
      normalizeSearchValue: normalizeSearchValue
    };
    var ADDITIONAL_GLOBAL_EXPORT_ENTRIES = [['setBatteryPlates', function () {
      return setBatteryPlatesLocal;
    }], ['getBatteryPlates', function () {
      return getBatteryPlates;
    }], ['setRecordingMedia', function () {
      return setRecordingMediaLocal;
    }], ['getRecordingMedia', function () {
      return getRecordingMedia;
    }], ['applyDarkMode', function () {
      return applyDarkMode;
    }], ['applyPinkMode', function () {
      return applyPinkMode;
    }], ['applyHighContrast', function () {
      return applyHighContrast;
    }], ['setupInstallBanner', function () {
      return setupInstallBanner;
    }], ['generatePrintableOverview', function () {
      return generatePrintableOverview;
    }], ['generateGearListHtml', function () {
      return generateGearListHtml;
    }], ['displayGearAndRequirements', function () {
      return displayGearAndRequirements;
    }], ['updateGearListButtonVisibility', function () {
      return updateGearListButtonVisibility;
    }], ['ensureZoomRemoteSetup', function () {
      return ensureZoomRemoteSetup;
    }], ['encodeSharedSetup', function () {
      return encodeSharedSetup;
    }], ['decodeSharedSetup', function () {
      return decodeSharedSetup;
    }], ['applySharedSetupFromUrl', function () {
      return applySharedSetupFromUrl;
    }], ['applySharedSetup', function () {
      return applySharedSetup;
    }], ['updateBatteryPlateVisibility', function () {
      return updateBatteryPlateVisibility;
    }], ['updateBatteryOptions', function () {
      return updateBatteryOptions;
    }], ['renderSetupDiagram', function () {
      return renderSetupDiagram;
    }], ['enableDiagramInteractions', function () {
      return enableDiagramInteractions;
    }], ['updateDiagramLegend', function () {
      return updateDiagramLegend;
    }], ['cameraFizPort', function () {
      return cameraFizPort;
    }], ['controllerCamPort', function () {
      return controllerCamPort;
    }], ['controllerDistancePort', function () {
      return controllerDistancePort;
    }], ['detectBrand', function () {
      return detectBrand;
    }], ['connectionLabel', function () {
      return connectionLabel;
    }], ['generateConnectorSummary', function () {
      return generateConnectorSummary;
    }], ['diagramConnectorIcons', function () {
      return diagramConnectorIcons;
    }], ['DIAGRAM_MONITOR_ICON', function () {
      return DIAGRAM_MONITOR_ICON;
    }], ['exportDiagramSvg', function () {
      return exportDiagramSvg;
    }], ['fixPowerInput', function () {
      return fixPowerInput;
    }], ['powerInputTypes', function () {
      return powerInputTypes;
    }], ['ensureList', function () {
      return ensureList;
    }], ['normalizeVideoType', function () {
      return normalizeVideoType;
    }], ['normalizeFizConnectorType', function () {
      return normalizeFizConnectorType;
    }], ['normalizeViewfinderType', function () {
      return normalizeViewfinderType;
    }], ['normalizePowerPortType', function () {
      return normalizePowerPortType;
    }], ['setMonitorVideoInputs', function () {
      return setMonitorVideoInputs;
    }], ['clearMonitorVideoInputs', function () {
      return clearMonitorVideoInputs;
    }], ['setMonitorVideoOutputs', function () {
      return setMonitorVideoOutputs;
    }], ['clearMonitorVideoOutputs', function () {
      return clearMonitorVideoOutputs;
    }], ['setVideoInputs', function () {
      return setVideoInputs;
    }], ['getVideoInputs', function () {
      return getVideoInputs;
    }], ['clearVideoInputs', function () {
      return clearVideoInputs;
    }], ['setVideoOutputs', function () {
      return setVideoOutputs;
    }], ['getVideoOutputs', function () {
      return getVideoOutputs;
    }], ['setVideoOutputsIO', function () {
      return setVideoOutputsIO;
    }], ['getVideoOutputsIO', function () {
      return getVideoOutputsIO;
    }], ['clearVideoOutputsIO', function () {
      return clearVideoOutputsIO;
    }], ['setViewfinderVideoInputs', function () {
      return setViewfinderVideoInputs;
    }], ['clearViewfinderVideoInputs', function () {
      return clearViewfinderVideoInputs;
    }], ['setViewfinderVideoOutputs', function () {
      return setViewfinderVideoOutputs;
    }], ['clearViewfinderVideoOutputs', function () {
      return clearViewfinderVideoOutputs;
    }], ['getCurrentSetupKey', function () {
      return getCurrentSetupKey;
    }], ['renderFeedbackTable', function () {
      return renderFeedbackTable;
    }], ['saveCurrentGearList', function () {
      return saveCurrentGearList;
    }], ['getPowerSelectionSnapshot', function () {
      return getPowerSelectionSnapshot;
    }], ['applyStoredPowerSelection', function () {
      return applyStoredPowerSelection;
    }], ['getGearListSelectors', function () {
      return getGearListSelectors;
    }], ['applyGearListSelectors', function () {
      return applyGearListSelectors;
    }], ['scenarioIcons', function () {
      return scenarioIcons;
    }], ['collectProjectFormData', function () {
      return collectProjectFormData;
    }], ['populateProjectForm', function () {
      return populateProjectForm;
    }], ['renderFilterDetails', function () {
      return renderFilterDetails;
    }], ['collectFilterSelections', function () {
      return collectFilterSelections;
    }], ['parseFilterTokens', function () {
      return parseFilterTokens;
    }], ['applyFilterSelectionsToGearList', function () {
      return applyFilterSelectionsToGearList;
    }], ['adjustGearListSelectWidth', function () {
      return adjustGearListSelectWidth;
    }], ['adjustGearListSelectWidths', function () {
      return adjustGearListSelectWidths;
    }], ['getDeviceChanges', function () {
      return getDeviceChanges;
    }], ['applyDeviceChanges', function () {
      return applyDeviceChanges;
    }], ['deviceMap', function () {
      return deviceMap;
    }], ['helpMap', function () {
      return helpMap;
    }], ['featureSearchEntries', function () {
      return featureSearchEntries;
    }], ['featureSearchDefaultOptions', function () {
      return featureSearchDefaultOptions;
    }], ['populateFeatureSearch', function () {
      return populateFeatureSearch;
    }], ['restoreFeatureSearchDefaults', function () {
      return restoreFeatureSearchDefaults;
    }], ['updateFeatureSearchValue', function () {
      return updateFeatureSearchValue;
    }], ['updateFeatureSearchSuggestions', function () {
      return updateFeatureSearchSuggestions;
    }], ['setCurrentProjectInfo', function () {
      return setCurrentProjectInfo;
    }], ['getCurrentProjectInfo', function () {
      return getCurrentProjectInfo;
    }], ['getCurrentSetupState', function () {
      return getCurrentSetupState;
    }], ['setSliderBowlValue', function () {
      return setSliderBowlValue;
    }], ['crewRoles', function () {
      return crewRoles;
    }], ['formatFullBackupFilename', function () {
      return formatFullBackupFilename;
    }], ['computeGearListCount', function () {
      return computeGearListCount;
    }], ['autoBackup', function () {
      return autoBackup;
    }], ['createSettingsBackup', function () {
      return createSettingsBackup;
    }], ['captureStorageSnapshot', function () {
      return captureStorageSnapshot;
    }], ['sanitizeBackupPayload', function () {
      return sanitizeBackupPayload;
    }], ['extractBackupSections', function () {
      return extractBackupSections;
    }], ['searchKey', function () {
      return searchKey;
    }], ['searchTokens', function () {
      return searchTokens;
    }], ['findBestSearchMatch', function () {
      return findBestSearchMatch;
    }], ['runFeatureSearch', function () {
      return runFeatureSearch;
    }], ['collectAutoGearCatalogNames', function () {
      return collectAutoGearCatalogNames;
    }], ['featureMap', function () {
      return featureMap;
    }], ['buildDefaultVideoDistributionAutoGearRules', function () {
      return buildDefaultVideoDistributionAutoGearRules;
    }], ['applyAutoGearRulesToTableHtml', function () {
      return applyAutoGearRulesToTableHtml;
    }], ['importAutoGearRulesFromData', function () {
      return importAutoGearRulesFromData;
    }], ['getAutoGearRuleCoverageSummary', function () {
      return getAutoGearRuleCoverageSummary;
    }], ['createAutoGearBackup', function () {
      return createAutoGearBackup;
    }], ['restoreAutoGearBackup', function () {
      return restoreAutoGearBackup;
    }], ['getAutoGearRules', function () {
      return getAutoGearRules;
    }], ['syncAutoGearRulesFromStorage', function () {
      return syncAutoGearRulesFromStorage;
    }], ['normalizeAutoGearCameraWeightCondition', function () {
      return normalizeAutoGearCameraWeightCondition;
    }], ['updateAutoGearItemButtonState', function () {
      return updateAutoGearItemButtonState;
    }], ['loadStoredLogoPreview', function () {
      return loadStoredLogoPreview;
    }], ['normalizeSpellingVariants', function () {
      return normalizeSpellingVariants;
    }], ['parseDeviceDatabaseImport', function () {
      return parseDeviceDatabaseImport;
    }], ['countDeviceDatabaseEntries', function () {
      return countDeviceDatabaseEntries;
    }], ['sanitizeShareFilename', function () {
      return sanitizeShareFilename;
    }], ['ensureJsonExtension', function () {
      return ensureJsonExtension;
    }], ['getDefaultShareFilename', function () {
      return getDefaultShareFilename;
    }], ['promptForSharedFilename', function () {
      return promptForSharedFilename;
    }], ['downloadSharedProject', function () {
      return downloadSharedProject;
    }], ['clearBatteryPlates', function () {
      return clearBatteryPlates;
    }], ['clearRecordingMedia', function () {
      return clearRecordingMedia;
    }], ['clearLensMounts', function () {
      return clearLensMounts;
    }], ['clearPowerDistribution', function () {
      return clearPowerDistribution;
    }], ['clearVideoOutputs', function () {
      return clearVideoOutputs;
    }], ['clearFizConnectors', function () {
      return clearFizConnectors;
    }], ['clearViewfinders', function () {
      return clearViewfinders;
    }], ['clearTimecodes', function () {
      return clearTimecodes;
    }], ['confirmAutoGearSelection', function () {
      return confirmAutoGearSelection;
    }], ['configureSharedImportOptions', function () {
      return configureSharedImportOptions;
    }], ['resolveSharedImportMode', function () {
      return resolveSharedImportMode;
    }], ['resetPlannerStateAfterFactoryReset', function () {
      return resetPlannerStateAfterFactoryReset;
    }], ['updateStorageSummary', function () {
      return updateStorageSummary;
    }], ['normaliseMarkVariants', function () {
      return normaliseMarkVariants;
    }], ['storeLoadedSetupState', function () {
      return storeLoadedSetupState;
    }]];
    var resolvedAdditionalExports = ADDITIONAL_GLOBAL_EXPORT_ENTRIES.reduce(function (acc, _ref42) {
      var _ref43 = _slicedToArray(_ref42, 2),
        exportName = _ref43[0],
        getter = _ref43[1];
      try {
        var _value3 = getter();
        if (typeof _value3 !== 'undefined') {
          acc[exportName] = _value3;
        }
      } catch (error) {
        void error;
      }
      return acc;
    }, {});
    Object.assign(CORE_PART2_GLOBAL_EXPORTS, resolvedAdditionalExports);
    (function installCoreModuleExports() {
      var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
      if (!scope) {
        return;
      }
      var moduleBase = scope.cineModuleBase;
      var alreadyWrapped = !!(moduleBase && moduleBase.__cineSafeFreezeWrapped) || coreSafeFreezeRegistryHas(moduleBase);
      if (moduleBase && typeof moduleBase.freezeDeep === 'function' && !alreadyWrapped) {
        var originalFreezeDeep = moduleBase.freezeDeep;
        moduleBase.freezeDeep = function safeFreezeDeep(value, seen) {
          try {
            return originalFreezeDeep(value, seen);
          } catch (freezeError) {
            try {
              if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                console.warn('cineModuleBase.freezeDeep fallback triggered for core module export.', freezeError);
              }
            } catch (warnError) {
              void warnError;
            }
            return value;
          }
        };
        coreSafeFreezeRegistryAdd(moduleBase);
        var marked = false;
        var markerKey = '__cineSafeFreezeWrapped';
        var hasExistingMarker = Object.prototype.hasOwnProperty.call(moduleBase, markerKey);
        if (hasExistingMarker) {
          try {
            marked = Boolean(moduleBase[markerKey]);
          } catch (readMarkerError) {
            void readMarkerError;
            marked = true;
          }
        }
        var canAttachMarker = true;
        if (!marked && !hasExistingMarker && typeof Object.isExtensible === 'function') {
          try {
            canAttachMarker = Object.isExtensible(moduleBase);
          } catch (isExtensibleError) {
            void isExtensibleError;
            canAttachMarker = true;
          }
        }
        var shouldAttemptDirectMark = !marked && canAttachMarker;
        if (shouldAttemptDirectMark) {
          try {
            moduleBase[markerKey] = true;
            if (moduleBase[markerKey]) {
              marked = true;
            }
          } catch (assignError) {
            void assignError;
          }
        }
        if (!marked && shouldAttemptDirectMark && typeof Object.isExtensible === 'function') {
          try {
            if (!Object.isExtensible(moduleBase)) {
              canAttachMarker = false;
            }
          } catch (postAssignIsExtensibleError) {
            void postAssignIsExtensibleError;
          }
        }
        if (!marked && canAttachMarker && typeof Object.defineProperty === 'function') {
          try {
            Object.defineProperty(moduleBase, markerKey, {
              configurable: false,
              enumerable: false,
              writable: false,
              value: true
            });
            marked = true;
          } catch (defineError) {
            void defineError;
          }
        }
        if (!marked && !coreSafeFreezeRegistryHas(moduleBase)) {
          coreSafeFreezeRegistryAdd(moduleBase);
        }
      }
      var MODULE_EXPORTS = {
        cineCoreProject: ['deriveProjectInfo', 'updateCalculations', 'checkSetupChanged', 'currentProjectInfo', 'setCurrentProjectInfo', 'getCurrentProjectInfo', 'collectProjectFormData', 'populateProjectForm', 'renderFilterDetails', 'collectFilterSelections', 'collectFilterTokens', 'parseFilterTokens', 'applyFilterSelectionsToGearList', 'normalizeSpellingVariants', 'normalizeSearchValue', 'getPowerSelectionSnapshot', 'applyStoredPowerSelection', 'getGearListSelectors', 'applyGearListSelectors'],
        cineCoreGuard: ['ensureDefaultProjectInfoSnapshot', 'skipNextGearListRefresh', 'alignActiveAutoGearPreset', 'reconcileAutoGearAutoPresetState', 'openAutoGearEditor', 'closeAutoGearEditor', 'saveAutoGearRuleFromEditor', 'handleAutoGearImportSelection', 'handleAutoGearPresetSelection', 'handleAutoGearSavePreset', 'handleAutoGearDeletePreset', 'applyAutoGearBackupVisibility', 'renderAutoGearBackupControls', 'renderAutoGearBackupRetentionControls', 'renderAutoGearDraftImpact', 'renderAutoGearDraftLists', 'renderAutoGearMonitorDefaultsControls', 'renderAutoGearPresetsControls', 'renderAutoGearRulesList', 'updateAutoGearCameraWeightDraft', 'updateAutoGearShootingDaysDraft', 'setAutoGearAutoPresetId', 'syncAutoGearAutoPreset', 'updateAutoGearCatalogOptions', 'updateAutoGearItemButtonState', 'updateAutoGearMonitorDefaultOptions', 'applyFavoritesToSelect', 'updateFavoriteButton', 'toggleFavorite', 'loadStoredLogoPreview', 'renderSettingsLogoPreview', 'loadFeedbackSafe', 'saveFeedbackSafe', 'saveCurrentGearList'],
        cineCoreExperience: ['populateSelect', 'refreshDeviceLists', 'hasAnyDeviceSelection', 'refreshAutoGearCameraOptions', 'refreshAutoGearCameraWeightCondition', 'refreshAutoGearMonitorOptions', 'refreshAutoGearTripodHeadOptions', 'refreshAutoGearTripodBowlOptions', 'refreshAutoGearTripodTypesOptions', 'refreshAutoGearTripodSpreaderOptions', 'refreshAutoGearWirelessOptions', 'refreshAutoGearMotorsOptions', 'refreshAutoGearControllersOptions', 'refreshAutoGearCrewOptions', 'refreshAutoGearDistanceOptions', 'exportAutoGearRules', 'generatePrintableOverview', 'generateGearListHtml', 'displayGearAndRequirements', 'updateGearListButtonVisibility', 'overviewSectionIcons', 'scenarioIcons', 'populateFeatureSearch', 'restoreFeatureSearchDefaults', 'updateFeatureSearchValue', 'updateFeatureSearchSuggestions', 'featureSearchEntries', 'featureSearchDefaultOptions', 'applyAccentColor', 'clearAccentColorOverrides', 'updateAccentColorResetButtonState', 'refreshDarkModeAccentBoost', 'isHighContrastActive', 'accentColor', 'prevAccentColor', 'revertAccentColor', 'DEFAULT_ACCENT_COLOR', 'HIGH_CONTRAST_ACCENT_COLOR', 'fontSize', 'fontFamily', 'applyDarkMode', 'applyPinkMode', 'applyHighContrast', 'setupInstallBanner', 'ensureZoomRemoteSetup', 'generateConnectorSummary', 'diagramConnectorIcons', 'DIAGRAM_MONITOR_ICON']
      };
      Object.entries(MODULE_EXPORTS).forEach(function (_ref44) {
        var _ref45 = _slicedToArray(_ref44, 2),
          moduleName = _ref45[0],
          exportNames = _ref45[1];
        var moduleRef = scope[moduleName];
        if (!moduleRef || typeof moduleRef.install !== 'function') {
          return;
        }
        var payload = {};
        var hasValues = false;
        for (var index = 0; index < exportNames.length; index += 1) {
          var exportName = exportNames[index];
          if (Object.prototype.hasOwnProperty.call(CORE_PART2_GLOBAL_EXPORTS, exportName)) {
            payload[exportName] = CORE_PART2_GLOBAL_EXPORTS[exportName];
            hasValues = true;
          }
        }
        if (!hasValues) {
          return;
        }
        try {
          moduleRef.install(payload);
        } catch (installError) {
          try {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
              console.warn("Failed to install exports for ".concat(moduleName, "."), installError);
            }
          } catch (warnError) {
            void warnError;
          }
        }
      });
    })();
    var CORE_PART2_GLOBAL_SCOPE = CORE_SHARED_SCOPE_PART2 || (typeof globalThis !== 'undefined' ? globalThis : null) || (typeof window !== 'undefined' ? window : null) || (typeof self !== 'undefined' ? self : null) || (typeof global !== 'undefined' ? global : null);
    var CORE_PART2_RUNTIME = function resolvePart2Runtime(scope) {
      if (!scope || _typeof(scope) !== 'object') return null;
      if (scope.cineCoreRuntime && _typeof(scope.cineCoreRuntime) === 'object') {
        return scope.cineCoreRuntime;
      }
      if (Object.isExtensible(scope)) {
        scope.cineCoreRuntime = {};
        return scope.cineCoreRuntime;
      }
      return null;
    }(CORE_PART2_GLOBAL_SCOPE);
    Object.entries(CORE_PART2_GLOBAL_EXPORTS).forEach(function (_ref46) {
      var _ref47 = _slicedToArray(_ref46, 2),
        name = _ref47[0],
        value = _ref47[1];
      if (CORE_PART2_GLOBAL_SCOPE && Object.isExtensible(CORE_PART2_GLOBAL_SCOPE)) {
        CORE_PART2_GLOBAL_SCOPE[name] = value;
      }
      if (CORE_PART2_RUNTIME && Object.isExtensible(CORE_PART2_RUNTIME)) {
        CORE_PART2_RUNTIME[name] = value;
      }
    });
    flushCoreBootQueue();
    refreshDeviceLists();
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = {
        normalizeAutoGearCameraWeightCondition: normalizeAutoGearCameraWeightCondition,
        normalizeAutoGearWeightOperator: normalizeAutoGearWeightOperator,
        formatAutoGearCameraWeight: formatAutoGearCameraWeight,
        getAutoGearCameraWeightOperatorLabel: getAutoGearCameraWeightOperatorLabel
      };
    }
  }
  var corePart2ExecutedViaRunner = typeof CORE_PART1_RUNNER === 'function' ? CORE_PART1_RUNNER(corePart2Runtime) : false;
  if (!corePart2ExecutedViaRunner) {
    corePart2Runtime();
  }
}