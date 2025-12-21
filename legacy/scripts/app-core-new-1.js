var _localAutoGearConditi, _localAutoGearConditi2, _localAutoGearConditi3, _localAutoGearConditi4, _localAutoGearConditi5, _localAutoGearConditi6, _localAutoGearConditi7, _localAutoGearConditi8, _localAutoGearConditi9, _localAutoGearConditi0, _localAutoGearConditi1, _localAutoGearConditi10, _localAutoGearConditi11, _localAutoGearConditi12, _localAutoGearConditi13, _localAutoGearConditi14, _localAutoGearConditi15, _localAutoGearConditi16, _localAutoGearConditi17, _localAutoGearConditi18, _localAutoGearConditi19, _localAutoGearConditi20, _localAutoGearConditi21, _localAutoGearConditi22, _localAutoGearConditi23, _localAutoGearConditi24, _localAutoGearConditi25, _localAutoGearConditi26, _localAutoGearConditi27, _localAutoGearConditi28, _localAutoGearConditi29, _localAutoGearConditi30, _localAutoGearConditi31, _localAutoGearConditi32, _localAutoGearConditi33, _localAutoGearConditi34, _localAutoGearConditi35, _localAutoGearConditi36, _localAutoGearConditi37, _localAutoGearConditi38, _localAutoGearConditi39, _localAutoGearConditi40, _localAutoGearConditi41, _localAutoGearConditi42, _settingsButton$query;
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var localResolveDocumentDirection = typeof cineLocale !== 'undefined' && cineLocale && typeof cineLocale.resolveDocumentDirection === 'function' ? cineLocale.resolveDocumentDirection : function fallbackResolveDocumentDirection(lang) {
  return 'ltr';
};
var localApplyLocaleMetadata = typeof cineLocale !== 'undefined' && cineLocale && typeof cineLocale.applyLocaleMetadata === 'function' ? cineLocale.applyLocaleMetadata : function fallbackApplyLocaleMetadata(target, lang, direction) {};
var runtimeBootstrapExports = function resolveRuntimeBootstrapExports() {
  if (typeof require === 'function') {
    try {
      var requiredBootstrap = require('./runtime/bootstrap.js');
      if (requiredBootstrap && _typeof(requiredBootstrap) === 'object') {
        return requiredBootstrap;
      }
    } catch (runtimeBootstrapError) {
      void runtimeBootstrapError;
    }
  }
  var scopes = [];
  function pushScope(scope) {
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return;
    }
    if (scopes.indexOf(scope) === -1) {
      scopes.push(scope);
    }
  }
  pushScope((typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : null);
  if (typeof globalThis !== 'undefined') pushScope(globalThis);
  if (typeof window !== 'undefined') pushScope(window);
  if (typeof self !== 'undefined') pushScope(self);
  if (typeof global !== 'undefined') pushScope(global);
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    try {
      var namespace = scope && scope.cineRuntimeBootstrapExports;
      if (namespace && _typeof(namespace) === 'object') {
        return namespace;
      }
    } catch (scopeLookupError) {
      void scopeLookupError;
    }
  }
  return null;
}();
var defaultCoreBootQueue = [];
var _ref = runtimeBootstrapExports || {},
  _ref$fallbackResolveR = _ref.fallbackResolveRuntimeModuleLoader,
  fallbackResolveRuntimeModuleLoader = _ref$fallbackResolveR === void 0 ? function fallbackResolveRuntimeModuleLoaderMissing() {
    return null;
  } : _ref$fallbackResolveR,
  _ref$fallbackRequireC = _ref.fallbackRequireCoreRuntimeModule,
  fallbackRequireCoreRuntimeModule = _ref$fallbackRequireC === void 0 ? function fallbackRequireCoreRuntimeModuleMissing() {
    return null;
  } : _ref$fallbackRequireC,
  _ref$exposeCoreRuntim = _ref.exposeCoreRuntimeConstant,
  exposeCoreRuntimeConstant = _ref$exposeCoreRuntim === void 0 ? function fallbackExposeCoreRuntimeConstant(name, value) {
    if (typeof window !== 'undefined') window[name] = value;
    if (typeof globalThis !== 'undefined') globalThis[name] = value;
  } : _ref$exposeCoreRuntim,
  _ref$exposeCoreRuntim2 = _ref.exposeCoreRuntimeConstants,
  exposeCoreRuntimeConstants = _ref$exposeCoreRuntim2 === void 0 ? function noopExposeCoreRuntimeConstants() {} : _ref$exposeCoreRuntim2,
  _ref$CORE_BOOT_QUEUE_ = _ref.CORE_BOOT_QUEUE_KEY,
  CORE_BOOT_QUEUE_KEY = _ref$CORE_BOOT_QUEUE_ === void 0 ? '__coreRuntimeBootQueue' : _ref$CORE_BOOT_QUEUE_,
  _ref$CORE_BOOT_QUEUE = _ref.CORE_BOOT_QUEUE,
  resolvedCoreBootQueue = _ref$CORE_BOOT_QUEUE === void 0 ? defaultCoreBootQueue : _ref$CORE_BOOT_QUEUE,
  resolvedEnqueueCoreBootTask = _ref.enqueueCoreBootTask,
  _ref$getGridSnapState = _ref.getGridSnapState,
  getGridSnapState = _ref$getGridSnapState === void 0 ? function fallbackGetGridSnapState() {
    return 'normal';
  } : _ref$getGridSnapState,
  resolvedSetGridSnapState = _ref.setGridSnapState,
  resolvedApplyLegacyGridSnapValue = _ref.applyLegacyGridSnapValue;
var CORE_BOOT_QUEUE = resolvedCoreBootQueue;
var enqueueCoreBootTask = typeof resolvedEnqueueCoreBootTask === 'function' ? resolvedEnqueueCoreBootTask : function fallbackEnqueueCoreBootTask(task) {
  if (typeof task === 'function') {
    try {
      CORE_BOOT_QUEUE.push(task);
    } catch (queueError) {
      void queueError;
      try {
        task();
      } catch (taskError) {
        void taskError;
      }
    }
  }
  return CORE_BOOT_QUEUE.length;
};
var setGridSnapState = typeof resolvedSetGridSnapState === 'function' ? resolvedSetGridSnapState : function fallbackSetGridSnapState(value) {
  return typeof value === 'undefined' ? getGridSnapState() : value;
};
var applyLegacyGridSnapValue = typeof resolvedApplyLegacyGridSnapValue === 'function' ? resolvedApplyLegacyGridSnapValue : function fallbackApplyLegacyGridSnapValue(value) {
  return typeof value === 'undefined' ? getGridSnapState() : value;
};
var TEMPERATURE_SCOPE_CANDIDATES = [(typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' && CORE_GLOBAL_SCOPE, typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null].filter(function (scope) {
  return scope && (_typeof(scope) === 'object' || typeof scope === 'function');
});
var TEMPERATURE_UNITS_FALLBACK = Object.freeze({
  fahrenheit: 'fahrenheit',
  celsius: 'celsius'
});
var _ref2 = typeof cineDeviceNormalization !== 'undefined' ? cineDeviceNormalization : typeof globalThis !== 'undefined' && globalThis.cineDeviceNormalization || {},
  normalizeVideoType = _ref2.normalizeVideoType,
  normalizeFizConnectorType = _ref2.normalizeFizConnectorType,
  normalizeViewfinderType = _ref2.normalizeViewfinderType,
  normalizePowerPortType = _ref2.normalizePowerPortType,
  fixPowerInput = _ref2.fixPowerInput,
  applyFixPowerInput = _ref2.applyFixPowerInput,
  ensureList = _ref2.ensureList,
  markDevicesNormalized = _ref2.markDevicesNormalized,
  hasNormalizedDevicesMarker = _ref2.hasNormalizedDevicesMarker,
  unifyDevices = _ref2.unifyDevices,
  normalizeDevicesForPersistence = _ref2.normalizeDevicesForPersistence;
if (typeof window !== 'undefined') {
  window.normalizeDevicesForPersistence = normalizeDevicesForPersistence;
}
var CORE_TEMPERATURE_UNITS = function resolveTemperatureUnits() {
  var candidateScopes = TEMPERATURE_SCOPE_CANDIDATES;
  for (var index = 0; index < candidateScopes.length; index += 1) {
    var scope = candidateScopes[index];
    try {
      var candidate = scope.TEMPERATURE_UNITS;
      if (candidate && _typeof(candidate) === 'object' && typeof candidate.fahrenheit === 'string' && typeof candidate.celsius === 'string') {
        return candidate;
      }
    } catch (temperatureUnitsError) {
      void temperatureUnitsError;
    }
  }
  candidateScopes.forEach(function (scope) {
    try {
      if (!scope.TEMPERATURE_UNITS) {
        scope.TEMPERATURE_UNITS = TEMPERATURE_UNITS_FALLBACK;
      }
    } catch (assignError) {
      void assignError;
    }
  });
  return TEMPERATURE_UNITS_FALLBACK;
}();
var TEMPERATURE_SCENARIOS = function resolveTemperatureScenarios() {
  var candidateScopes = TEMPERATURE_SCOPE_CANDIDATES;
  for (var index = 0; index < candidateScopes.length; index += 1) {
    var scope = candidateScopes[index];
    try {
      if (Array.isArray(scope.TEMPERATURE_SCENARIOS)) {
        return scope.TEMPERATURE_SCENARIOS;
      }
    } catch (temperatureScenarioError) {
      void temperatureScenarioError;
    }
  }
  candidateScopes.forEach(function (scope) {
    try {
      if (!Array.isArray(scope.TEMPERATURE_SCENARIOS)) {
        scope.TEMPERATURE_SCENARIOS = [];
      }
    } catch (assignError) {
      void assignError;
    }
  });
  return [];
}();
var FOCUS_SCALE_VALUES_FALLBACK = Object.freeze(['metric', 'imperial']);
var focusScaleValues = function resolveFocusScaleValues() {
  var candidateScopes = TEMPERATURE_SCOPE_CANDIDATES;
  for (var index = 0; index < candidateScopes.length; index += 1) {
    var scope = candidateScopes[index];
    try {
      if (Array.isArray(scope.FOCUS_SCALE_VALUES) && scope.FOCUS_SCALE_VALUES.length) {
        return scope.FOCUS_SCALE_VALUES;
      }
    } catch (focusScaleError) {
      void focusScaleError;
    }
  }
  candidateScopes.forEach(function (scope) {
    try {
      if (!Array.isArray(scope.FOCUS_SCALE_VALUES) || !scope.FOCUS_SCALE_VALUES.length) {
        scope.FOCUS_SCALE_VALUES = FOCUS_SCALE_VALUES_FALLBACK;
      }
    } catch (assignError) {
      void assignError;
    }
  });
  return FOCUS_SCALE_VALUES_FALLBACK;
}();
function resolveFeedbackTemperatureBound(boundKey, fallbackValue) {
  var candidateScopes = TEMPERATURE_SCOPE_CANDIDATES;
  for (var index = 0; index < candidateScopes.length; index += 1) {
    var scope = candidateScopes[index];
    try {
      var candidate = scope && scope[boundKey];
      if (typeof candidate === 'number' && Number.isFinite(candidate)) {
        return candidate;
      }
    } catch (feedbackBoundError) {
      void feedbackBoundError;
    }
  }
  candidateScopes.forEach(function (scope) {
    try {
      var scopedValue = scope && scope[boundKey];
      if (typeof scopedValue !== 'number' || !Number.isFinite(scopedValue)) {
        scope[boundKey] = fallbackValue;
      }
    } catch (assignError) {
      void assignError;
    }
  });
  return fallbackValue;
}
globalThis.FEEDBACK_TEMPERATURE_MIN_VALUE = resolveFeedbackTemperatureBound('FEEDBACK_TEMPERATURE_MIN', -20);
globalThis.FEEDBACK_TEMPERATURE_MAX_VALUE = resolveFeedbackTemperatureBound('FEEDBACK_TEMPERATURE_MAX_LIMIT', 50);
globalThis.INSTALL_BANNER_DISMISSED_KEY = 'cine_install_banner_dismissed';
globalThis.AUTO_GEAR_BACKUP_RETENTION_MIN_VALUE = 1;
var CORE_RUNTIME_SUPPORT_EXPORT_NAMESPACE = function resolveRuntimeSupportExportNamespace() {
  var namespaces = [];
  try {
    if ((typeof CORE_RUNTIME_SUPPORT_EXPORTS === "undefined" ? "undefined" : _typeof(CORE_RUNTIME_SUPPORT_EXPORTS)) === 'object' && CORE_RUNTIME_SUPPORT_EXPORTS) {
      namespaces.push(CORE_RUNTIME_SUPPORT_EXPORTS);
    }
  } catch (coreRuntimeSupportExportsError) {
    void coreRuntimeSupportExportsError;
  }
  try {
    if (typeof cineCoreRuntimeSupportExports !== 'undefined' && cineCoreRuntimeSupportExports && (typeof cineCoreRuntimeSupportExports === "undefined" ? "undefined" : _typeof(cineCoreRuntimeSupportExports)) === 'object') {
      namespaces.push(cineCoreRuntimeSupportExports);
    }
  } catch (legacyRuntimeSupportExportsError) {
    void legacyRuntimeSupportExportsError;
  }
  for (var index = 0; index < namespaces.length; index += 1) {
    var namespace = namespaces[index];
    if (namespace && _typeof(namespace) === 'object') {
      return namespace;
    }
  }
  return null;
}();
var resolveRuntimeModuleLoaderNamespaceResolver = CORE_RUNTIME_SUPPORT_EXPORT_NAMESPACE && typeof CORE_RUNTIME_SUPPORT_EXPORT_NAMESPACE.resolveRuntimeModuleLoader === 'function' ? function resolveRuntimeModuleLoaderProxy() {
  return CORE_RUNTIME_SUPPORT_EXPORT_NAMESPACE.resolveRuntimeModuleLoader();
} : fallbackResolveRuntimeModuleLoader;
var resolvedRuntimeModuleLoader = (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' && globalThis && typeof globalThis.resolveRuntimeModuleLoader === 'function' ? globalThis.resolveRuntimeModuleLoader : resolveRuntimeModuleLoaderNamespaceResolver;
if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' && globalThis && typeof globalThis.resolveRuntimeModuleLoader !== 'function') {
  globalThis.resolveRuntimeModuleLoader = resolvedRuntimeModuleLoader;
}
var requireCoreRuntimeModuleNamespaceResolver = CORE_RUNTIME_SUPPORT_EXPORT_NAMESPACE && typeof CORE_RUNTIME_SUPPORT_EXPORT_NAMESPACE.requireCoreRuntimeModule === 'function' ? function requireCoreRuntimeModuleProxy(moduleId, options) {
  return CORE_RUNTIME_SUPPORT_EXPORT_NAMESPACE.requireCoreRuntimeModule(moduleId, options);
} : fallbackRequireCoreRuntimeModule;
var resolvedRequireCoreRuntimeModule = (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' && globalThis && typeof globalThis.requireCoreRuntimeModule === 'function' ? globalThis.requireCoreRuntimeModule : requireCoreRuntimeModuleNamespaceResolver;
if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' && globalThis && typeof globalThis.requireCoreRuntimeModule !== 'function') {
  globalThis.requireCoreRuntimeModule = resolvedRequireCoreRuntimeModule;
}
if (typeof resolveCoreSupportModule === 'undefined') {
  global.resolveCoreSupportModule = function (name, path) {
    if (typeof require === 'function') {
      try {
        return require(path);
      } catch (e) {
        return null;
      }
    }
    return null;
  };
}
var localizationBootstrapWiringRef = typeof localizationBootstrapWiring !== 'undefined' ? localizationBootstrapWiring : null;
if (!localizationBootstrapWiringRef && typeof require === 'function') {
  try {
    var bootstrapModule = require('./app-core-bootstrap.js');
    localizationBootstrapWiringRef = bootstrapModule.localizationBootstrapWiring;
  } catch (e) {}
}
var _ref3 = localizationBootstrapWiringRef || {},
  APP_CORE_LOCALIZATION_SUPPORT = _ref3.localizationSupport,
  localizationRuntimeEnvironment = _ref3.localizationRuntimeEnvironment,
  CORE_LOCALIZATION_BRIDGE = _ref3.localizationBridge,
  CORE_LOCALIZATION_FALLBACKS = _ref3.localizationFallbacks,
  CORE_INLINE_LOCALIZATION_FALLBACKS = _ref3.inlineLocalizationFallbacks,
  LOCALIZATION_FALLBACK_SUPPORT = _ref3.localizationFallbackSupport,
  createBasicLocalizationFallbackResolvers = _ref3.createBasicLocalizationFallbackResolvers,
  LOCALIZATION_FALLBACK_REGISTRY = _ref3.localizationFallbackRegistry,
  LOCALIZATION_FALLBACK_RESOLVERS = _ref3.localizationFallbackResolvers,
  LOCALIZATION_FALLBACK_NAMESPACE = _ref3.localizationFallbackNamespace,
  fallbackResolveLocaleModule = _ref3.fallbackResolveLocaleModule,
  createLocaleFallbacks = _ref3.createLocaleFallbacks;
var CORE_RUNTIME_TOOLS = resolveCoreSupportModule('cineCoreRuntimeTools', './modules/core/runtime-tools.js');
var CORE_RUNTIME_TOOL_FALLBACK_NAMESPACE = resolveCoreSupportModule('cineCoreRuntimeToolFallbacks', './modules/core/runtime-tool-fallbacks.js');
var RUNTIME_TOOL_INLINE_FALLBACK_TOOLS = resolveCoreSupportModule('cineCoreAppRuntimeToolInlineFallbacks', './modules/app-core/runtime.js');
var SETTINGS_DOCUMENTATION_TRACKER_TOOLS = resolveCoreSupportModule('cineCoreAppSettingsDocumentationTracker', './modules/app-core/settings-documentation-tracker.js');
var pinkModeSupportApiRef = typeof PINK_MODE_SUPPORT_API !== 'undefined' ? PINK_MODE_SUPPORT_API : null;
if (!pinkModeSupportApiRef && typeof require === 'function') {
  try {
    var pinkModeModule = require('./app-core-pink-mode.js');
    pinkModeSupportApiRef = pinkModeModule.PINK_MODE_SUPPORT_API;
  } catch (e) {}
}
var _ref4 = pinkModeSupportApiRef || {},
  pinkModeIcons = _ref4.pinkModeIcons,
  ensureSvgHasAriaHidden = _ref4.ensureSvgHasAriaHidden,
  setPinkModeIconSequence = _ref4.setPinkModeIconSequence,
  loadPinkModeIconsFromFiles = _ref4.loadPinkModeIconsFromFiles,
  ensurePinkModeLottieRuntime = _ref4.ensurePinkModeLottieRuntime,
  resolvePinkModeLottieRuntime = _ref4.resolvePinkModeLottieRuntime,
  startPinkModeAnimatedIcons = _ref4.startPinkModeAnimatedIcons,
  stopPinkModeAnimatedIcons = _ref4.stopPinkModeAnimatedIcons,
  triggerPinkModeIconRain = _ref4.triggerPinkModeIconRain,
  getPinkModeIconRotationTimer = _ref4.getPinkModeIconRotationTimer,
  setPinkModeIconRotationTimer = _ref4.setPinkModeIconRotationTimer,
  getPinkModeIconIndex = _ref4.getPinkModeIconIndex,
  setPinkModeIconIndex = _ref4.setPinkModeIconIndex,
  PINK_MODE_ICON_INTERVAL_MS = _ref4.PINK_MODE_ICON_INTERVAL_MS,
  PINK_MODE_ICON_ANIMATION_CLASS = _ref4.PINK_MODE_ICON_ANIMATION_CLASS,
  PINK_MODE_ICON_ANIMATION_RESET_DELAY = _ref4.PINK_MODE_ICON_ANIMATION_RESET_DELAY,
  PINK_MODE_ICON_FALLBACK_MARKUP = _ref4.PINK_MODE_ICON_FALLBACK_MARKUP;
function iconMarkup(glyph) {
  var classNameOrOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info-icon';
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  if (!glyph) return '';
  var opts = {};
  var resolvedClassName = 'info-icon';
  if (typeof classNameOrOptions === 'string' || classNameOrOptions === null) {
    resolvedClassName = classNameOrOptions || '';
    if (options && _typeof(options) === 'object') {
      opts = options;
    }
  } else if (classNameOrOptions && _typeof(classNameOrOptions) === 'object') {
    opts = classNameOrOptions;
    resolvedClassName = classNameOrOptions.className || 'info-icon';
  }
  if (typeof opts.className === 'string') {
    resolvedClassName = opts.className;
  }
  var styleParts = [];
  if (typeof opts.size === 'string' && opts.size.trim()) {
    styleParts.push("--icon-size: ".concat(opts.size.trim()));
  }
  if (typeof opts.scale === 'string' && opts.scale.trim()) {
    styleParts.push("--icon-scale: ".concat(opts.scale.trim()));
  }
  if (typeof opts.style === 'string' && opts.style.trim()) {
    styleParts.push(opts.style.trim());
  }
  var styleAttr = styleParts.length ? " style=\"".concat(styleParts.join(';'), "\"") : '';
  var resolved = resolveIconGlyph(glyph);
  var classes = ['icon-glyph'];
  if (resolvedClassName) classes.unshift(resolvedClassName);
  if (resolved.markup) {
    if (resolved.className) {
      resolved.className.split(/\s+/).filter(Boolean).forEach(function (cls) {
        return classes.push(cls);
      });
    }
    var markup = ensureSvgHasAriaHidden(resolved.markup);
    return "<span class=\"".concat(classes.join(' '), "\"").concat(styleAttr, " aria-hidden=\"true\">").concat(markup, "</span>");
  }
  var char = resolved.char || '';
  if (!char) return '';
  return "<span class=\"".concat(classes.join(' '), "\"").concat(styleAttr, " data-icon-font=\"").concat(resolved.font, "\" aria-hidden=\"true\">").concat(char, "</span>");
}
var PRODUCTION_COMPANY_ICON = iconGlyph("\uE2D5", ICON_FONT_KEYS.UICONS);
var RENTAL_HOUSE_ICON = iconGlyph("\uEA09", ICON_FONT_KEYS.UICONS);
var ASPECT_RATIO_ICON = iconGlyph("\uE86E", ICON_FONT_KEYS.UICONS);
var REQUIRED_SCENARIOS_ICON = iconGlyph("\uF4D4", ICON_FONT_KEYS.UICONS);
var MONITORING_SUPPORT_ICON = iconGlyph("\uEFFC", ICON_FONT_KEYS.UICONS);
exposeCoreRuntimeConstant('iconGlyph', iconGlyph);
exposeCoreRuntimeConstant('resolveIconGlyph', resolveIconGlyph);
exposeCoreRuntimeConstant('applyIconGlyph', applyIconGlyph);
exposeCoreRuntimeConstant('formatSvgCoordinate', formatSvgCoordinate);
exposeCoreRuntimeConstant('positionSvgMarkup', positionSvgMarkup);
exposeCoreRuntimeConstant('iconMarkup', iconMarkup);
exposeCoreRuntimeConstant('ICON_GLYPHS', ICON_GLYPHS);
var CORE_RUNTIME_STATE_SUPPORT = function resolveCoreRuntimeStateSupport() {
  var resolvedSupport = null;
  if (typeof resolveCoreSupportModule === 'function') {
    try {
      resolvedSupport = resolveCoreSupportModule('cineCoreRuntimeState', './modules/core/runtime-state.js');
    } catch (runtimeStateResolveError) {
      void runtimeStateResolveError;
      resolvedSupport = null;
    }
  }
  if (!resolvedSupport) {
    var loaderRuntimeState = resolvedRequireCoreRuntimeModule('modules/core/runtime-state.js');
    if (loaderRuntimeState && _typeof(loaderRuntimeState) === 'object') {
      resolvedSupport = loaderRuntimeState;
    }
  }
  if (resolvedSupport) {
    return resolvedSupport;
  }
  var fallbackScopes = resolvedCollectCoreRuntimeCandidateScopes((typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' ? CORE_GLOBAL_SCOPE : null);
  for (var index = 0; index < fallbackScopes.length; index += 1) {
    var candidateScope = fallbackScopes[index];
    if (!candidateScope || _typeof(candidateScope) !== 'object') {
      continue;
    }
    try {
      var candidate = candidateScope.cineCoreRuntimeState;
      if (candidate && _typeof(candidate) === 'object') {
        return candidate;
      }
    } catch (runtimeStateLookupError) {
      void runtimeStateLookupError;
    }
  }
  return null;
}();
var CORE_RUNTIME_LOCALIZATION = function resolveCoreRuntimeLocalization() {
  if (typeof resolveCoreSupportModule === 'function') {
    try {
      var resolved = resolveCoreSupportModule('cineCoreRuntimeLocalization', './modules/core/runtime-localization.js');
      if (resolved && _typeof(resolved) === 'object') {
        return resolved;
      }
    } catch (coreRuntimeLocalizationResolveError) {
      void coreRuntimeLocalizationResolveError;
    }
  }
  var scopeCandidates = [CORE_PART1_RUNTIME_SCOPE && (typeof CORE_PART1_RUNTIME_SCOPE === "undefined" ? "undefined" : _typeof(CORE_PART1_RUNTIME_SCOPE)) === 'object' ? CORE_PART1_RUNTIME_SCOPE : null, typeof globalThis !== 'undefined' && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' ? globalThis : null, typeof window !== 'undefined' && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' ? window : null, typeof self !== 'undefined' && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' ? self : null, typeof global !== 'undefined' && global && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' ? global : null];
  for (var index = 0; index < scopeCandidates.length; index += 1) {
    var scope = scopeCandidates[index];
    if (!scope || _typeof(scope) !== 'object') {
      continue;
    }
    try {
      var candidate = scope.cineCoreRuntimeLocalization;
      if (candidate && _typeof(candidate) === 'object') {
        return candidate;
      }
    } catch (coreRuntimeLocalizationLookupError) {
      void coreRuntimeLocalizationLookupError;
    }
  }
  var loaderLocalization = resolvedRequireCoreRuntimeModule('modules/core/runtime-localization.js', {
    primaryScope: CORE_PART1_RUNTIME_SCOPE
  });
  if (loaderLocalization && _typeof(loaderLocalization) === 'object') {
    return loaderLocalization;
  }
  return null;
}();
var CORE_LOCALIZATION_RUNTIME = CORE_RUNTIME_LOCALIZATION && typeof CORE_RUNTIME_LOCALIZATION.createLocalizationRuntime === 'function' ? CORE_RUNTIME_LOCALIZATION.createLocalizationRuntime({
  runtimeScope: CORE_PART1_RUNTIME_SCOPE,
  coreGlobalScope: CORE_PART1_RUNTIME_SCOPE,
  localizationBridge: CORE_LOCALIZATION_BRIDGE,
  localizationFallbacks: CORE_LOCALIZATION_FALLBACKS,
  inlineLocalizationFallbacks: CORE_INLINE_LOCALIZATION_FALLBACKS,
  localizationFallbackNamespace: LOCALIZATION_FALLBACK_NAMESPACE,
  localizationFallbackSupport: LOCALIZATION_FALLBACK_SUPPORT,
  localizationFallbackRegistry: LOCALIZATION_FALLBACK_REGISTRY,
  localizationFallbackResolvers: LOCALIZATION_FALLBACK_RESOLVERS,
  fallbackResolveLocaleModule: fallbackResolveLocaleModule,
  createLocaleFallbacks: createLocaleFallbacks,
  translationsRequirePath: './translations.js'
}) : null;
if (CORE_PART1_RUNTIME_SCOPE && CORE_PART1_RUNTIME_SCOPE.__cineCorePart1Initialized) {
  if (typeof console !== 'undefined' && typeof console.warn === 'function') {
    console.warn('Cine Power Planner core runtime (part 1) already initialized. Skipping duplicate load.');
  }
} else {
  if (CORE_PART1_RUNTIME_SCOPE) {
    try {
      Object.defineProperty(CORE_PART1_RUNTIME_SCOPE, '__cineCorePart1Initialized', {
        configurable: true,
        writable: true,
        value: true
      });
    } catch (corePart1InitError) {
      CORE_PART1_RUNTIME_SCOPE.__cineCorePart1Initialized = true;
      void corePart1InitError;
    }
  }
}
var localAutoGearConditionSections = {
  always: document.getElementById('autoGearCondition-always'),
  scenarios: document.getElementById('autoGearCondition-scenarios'),
  shootingDays: document.getElementById('autoGearCondition-shootingDays'),
  mattebox: document.getElementById('autoGearCondition-mattebox'),
  cameraHandle: document.getElementById('autoGearCondition-cameraHandle'),
  viewfinderExtension: document.getElementById('autoGearCondition-viewfinderExtension'),
  deliveryResolution: document.getElementById('autoGearCondition-deliveryResolution'),
  videoDistribution: document.getElementById('autoGearCondition-videoDistribution'),
  camera: document.getElementById('autoGearCondition-camera'),
  ownGear: document.getElementById('autoGearCondition-ownGear'),
  cameraWeight: document.getElementById('autoGearCondition-cameraWeight'),
  monitor: document.getElementById('autoGearCondition-monitor'),
  tripodHeadBrand: document.getElementById('autoGearCondition-tripodHeadBrand'),
  tripodBowl: document.getElementById('autoGearCondition-tripodBowl'),
  tripodTypes: document.getElementById('autoGearCondition-tripodTypes'),
  tripodSpreader: document.getElementById('autoGearCondition-tripodSpreader'),
  crewPresent: document.getElementById('autoGearCondition-crewPresent'),
  crewAbsent: document.getElementById('autoGearCondition-crewAbsent'),
  wireless: document.getElementById('autoGearCondition-wireless'),
  motors: document.getElementById('autoGearCondition-motors'),
  controllers: document.getElementById('autoGearCondition-controllers'),
  distance: document.getElementById('autoGearCondition-distance')
};
var CORE_RUNTIME_TOOL_FALLBACK_FACTORY = CORE_RUNTIME_TOOL_FALLBACK_NAMESPACE && typeof CORE_RUNTIME_TOOL_FALLBACK_NAMESPACE.createRuntimeToolFallbacks === 'function' ? CORE_RUNTIME_TOOL_FALLBACK_NAMESPACE.createRuntimeToolFallbacks : null;
if (!CORE_RUNTIME_TOOL_FALLBACK_FACTORY) {
  var runtimeToolFallbacks = resolvedRequireCoreRuntimeModule('modules/core/runtime-tool-fallbacks.js', {
    primaryScope: CORE_PART1_RUNTIME_SCOPE
  });
  if (runtimeToolFallbacks && typeof runtimeToolFallbacks.createRuntimeToolFallbacks === 'function') {
    CORE_RUNTIME_TOOL_FALLBACK_FACTORY = runtimeToolFallbacks.createRuntimeToolFallbacks;
  }
}
var CORE_RUNTIME_GLOBAL_TOOLS_BRIDGE = (typeof CORE_RUNTIME_GLOBAL_TOOLS === "undefined" ? "undefined" : _typeof(CORE_RUNTIME_GLOBAL_TOOLS)) === 'object' && CORE_RUNTIME_GLOBAL_TOOLS || (typeof cineCoreRuntimeGlobalTools === "undefined" ? "undefined" : _typeof(cineCoreRuntimeGlobalTools)) === 'object' && cineCoreRuntimeGlobalTools || null;
if (CORE_RUNTIME_GLOBAL_TOOLS_BRIDGE && CORE_RUNTIME_GLOBAL_TOOLS_BRIDGE.CORE_RUNTIME_TOOL_FALLBACKS && typeof CORE_RUNTIME_TOOL_FALLBACKS !== 'undefined' && CORE_RUNTIME_GLOBAL_TOOLS_BRIDGE.CORE_RUNTIME_TOOL_FALLBACKS !== CORE_RUNTIME_TOOL_FALLBACKS) {
  CORE_RUNTIME_TOOL_FALLBACKS = CORE_RUNTIME_GLOBAL_TOOLS_BRIDGE.CORE_RUNTIME_TOOL_FALLBACKS;
}
var CORE_TEMPERATURE_QUEUE_KEY = '__cinePendingTemperatureNote';
var CORE_TEMPERATURE_RENDER_NAME = 'renderTemperatureNote';
var CORE_TEMPERATURE_KEY_DEFAULTS = function resolveCoreTemperatureKeyDefaults() {
  var defaults = {
    queueKey: CORE_TEMPERATURE_QUEUE_KEY,
    renderName: CORE_TEMPERATURE_RENDER_NAME
  };
  if (CORE_RUNTIME_STATE_SUPPORT && typeof CORE_RUNTIME_STATE_SUPPORT.resolveTemperatureKeyDefaults === 'function') {
    try {
      var resolvedDefaults = CORE_RUNTIME_STATE_SUPPORT.resolveTemperatureKeyDefaults();
      if (resolvedDefaults && _typeof(resolvedDefaults) === 'object') {
        if (typeof resolvedDefaults.queueKey === 'string' && resolvedDefaults.queueKey) {
          defaults.queueKey = resolvedDefaults.queueKey;
        }
        if (typeof resolvedDefaults.renderName === 'string' && resolvedDefaults.renderName) {
          defaults.renderName = resolvedDefaults.renderName;
        }
      }
    } catch (resolveTemperatureDefaultsError) {
      void resolveTemperatureDefaultsError;
    }
  }
  if (typeof defaults.queueKey !== 'string' || !defaults.queueKey) {
    defaults.queueKey = '__cinePendingTemperatureNote';
  }
  if (typeof defaults.renderName !== 'string' || !defaults.renderName) {
    defaults.renderName = 'renderTemperatureNote';
  }
  return defaults;
}();
CORE_TEMPERATURE_QUEUE_KEY = CORE_TEMPERATURE_KEY_DEFAULTS.queueKey;
CORE_TEMPERATURE_RENDER_NAME = CORE_TEMPERATURE_KEY_DEFAULTS.renderName;
var CORE_RUNTIME_UI_BRIDGE = function resolveCoreRuntimeUiBridge() {
  var candidates = [];
  if (typeof require === 'function') {
    try {
      var requiredBridge = require('./app-core-runtime-ui.js');
      if (requiredBridge && _typeof(requiredBridge) === 'object') {
        candidates.push(requiredBridge);
      }
    } catch (bridgeError) {
      void bridgeError;
    }
  }
  var scopes = [];
  try {
    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
      scopes.push(CORE_GLOBAL_SCOPE);
    }
  } catch (coreScopeError) {
    void coreScopeError;
  }
  if (typeof globalThis !== 'undefined' && globalThis) {
    scopes.push(globalThis);
  }
  if (typeof window !== 'undefined' && window) {
    scopes.push(window);
  }
  if (typeof self !== 'undefined' && self) {
    scopes.push(self);
  }
  if (typeof global !== 'undefined' && global) {
    scopes.push(global);
  }
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope) {
      continue;
    }
    try {
      var bridge = scope.cineCoreRuntimeUiBridge;
      if (bridge && _typeof(bridge) === 'object') {
        candidates.push(bridge);
      }
    } catch (scopeLookupError) {
      void scopeLookupError;
    }
  }
  for (var _index = 0; _index < candidates.length; _index += 1) {
    var candidate = candidates[_index];
    if (candidate && _typeof(candidate) === 'object') {
      return candidate;
    }
  }
  return {};
}();
var escapeHtml = typeof CORE_RUNTIME_UI_BRIDGE.escapeHtml === 'function' ? CORE_RUNTIME_UI_BRIDGE.escapeHtml : function escapeHtmlFallback(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
};
var escapeButtonLabelSafelyHelper = typeof CORE_RUNTIME_UI_BRIDGE.escapeButtonLabelSafely === 'function' ? CORE_RUNTIME_UI_BRIDGE.escapeButtonLabelSafely : function escapeButtonLabelSafelyFallback(text) {
  if (typeof text !== 'string' || text === '') {
    return '';
  }
  return escapeHtml(text);
};
var resolveButtonIconMarkupHelper = typeof CORE_RUNTIME_UI_BRIDGE.resolveButtonIconMarkup === 'function' ? CORE_RUNTIME_UI_BRIDGE.resolveButtonIconMarkup : function resolveButtonIconMarkupFallback() {
  return '';
};
var setButtonLabelWithIconBinding = ensureCoreGlobalValue('setButtonLabelWithIcon', function resolveSetButtonLabelWithIconValue() {
  if (typeof CORE_RUNTIME_UI_BRIDGE.setButtonLabelWithIcon === 'function') {
    return CORE_RUNTIME_UI_BRIDGE.setButtonLabelWithIcon;
  }
  return function setButtonLabelWithIconFallback(button, label, glyph) {
    if (!button) {
      return;
    }
    var resolvedGlyph = glyph;
    if (typeof resolvedGlyph === 'undefined') {
      try {
        if ((typeof ICON_GLYPHS === "undefined" ? "undefined" : _typeof(ICON_GLYPHS)) === 'object' && ICON_GLYPHS && ICON_GLYPHS.save) {
          resolvedGlyph = ICON_GLYPHS.save;
        }
      } catch (glyphError) {
        void glyphError;
      }
    }
    var iconHtml = resolveButtonIconMarkupHelper(resolvedGlyph);
    var safeLabel = escapeButtonLabelSafelyHelper(typeof label === 'string' ? label : '');
    try {
      button.innerHTML = "".concat(iconHtml).concat(safeLabel);
    } catch (assignError) {
      void assignError;
    }
  };
});
if (CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object') {
  try {
    CORE_GLOBAL_SCOPE.setButtonLabelWithIcon = setButtonLabelWithIconBinding;
  } catch (setButtonAssignError) {
    CORE_GLOBAL_SCOPE.setButtonLabelWithIcon = setButtonLabelWithIconBinding;
    void setButtonAssignError;
  }
}
function dispatchTemperatureNoteRender(hours) {
  var scope = getCoreGlobalObject();
  var renderer = null;
  if (!renderer && CORE_RUNTIME_STATE && typeof CORE_RUNTIME_STATE.getAssignedTemperatureRenderer === 'function') {
    try {
      renderer = CORE_RUNTIME_STATE.getAssignedTemperatureRenderer();
    } catch (stateRendererError) {
      void stateRendererError;
    }
  }
  try {
    if (typeof renderTemperatureNote === "function") {
      renderer = renderTemperatureNote;
    }
  } catch (referenceError) {
    var isReferenceError = referenceError && (referenceError.name === "ReferenceError" || /is not defined|Cannot access uninitialized/i.test(String(referenceError && referenceError.message)));
    if (!isReferenceError) {
      throw referenceError;
    }
  }
  if (!renderer && scope && _typeof(scope) === "object") {
    try {
      var scopedRenderer = scope[CORE_TEMPERATURE_RENDER_NAME];
      if (typeof scopedRenderer === "function") {
        renderer = scopedRenderer;
      }
    } catch (readError) {
      void readError;
    }
  }
  if (typeof renderer === "function") {
    try {
      renderer(hours);
    } catch (renderError) {
      if (typeof console !== "undefined" && typeof console.error === "function") {
        console.error("Temperature note renderer failed", renderError);
      }
    }
    return;
  }
  if (!scope || _typeof(scope) !== "object") {
    return;
  }
  var pending = scope[CORE_TEMPERATURE_QUEUE_KEY];
  if (!pending || _typeof(pending) !== "object") {
    pending = {};
  }
  pending.latestHours = hours;
  try {
    pending.updatedAt = Date.now ? Date.now() : new Date().getTime();
  } catch (timestampError) {
    void timestampError;
    pending.updatedAt = 0;
  }
  scope[CORE_TEMPERATURE_QUEUE_KEY] = pending;
}
function exposeCoreRuntimeBindings(bindings) {
  if (!bindings || _typeof(bindings) !== 'object') {
    return;
  }
  var scope = CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' ? CORE_GLOBAL_SCOPE : typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : null;
  if (!scope || _typeof(scope) !== 'object') {
    return;
  }
  Object.entries(bindings).forEach(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      name = _ref6[0],
      descriptor = _ref6[1];
    if (typeof name !== 'string' || !name) {
      return;
    }
    var getter = descriptor && typeof descriptor.get === 'function' ? descriptor.get : null;
    var setter = descriptor && typeof descriptor.set === 'function' ? descriptor.set : null;
    if (!getter) {
      return;
    }
    try {
      Object.defineProperty(scope, name, {
        configurable: true,
        enumerable: false,
        get: getter,
        set: setter || undefined
      });
      return;
    } catch (defineError) {
      void defineError;
    }
    try {
      scope[name] = getter();
    } catch (assignError) {
      void assignError;
    }
  });
}
var CORE_PART1_VALID_IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
function runCoreRuntimeSegment(executor) {
  if (typeof executor !== 'function') {
    return false;
  }
  var scope = CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' ? CORE_GLOBAL_SCOPE : typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : null;
  try {
    executor.call(scope || this);
    return true;
  } catch (executionError) {
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error('Cine Power Planner core runtime segment failed to evaluate.', executionError);
    }
  }
  return false;
}
if (CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object') {
  try {
    Object.defineProperty(CORE_GLOBAL_SCOPE, '__cineCorePart1Runner', {
      configurable: true,
      enumerable: false,
      writable: true,
      value: runCoreRuntimeSegment
    });
  } catch (runnerDefineError) {
    CORE_GLOBAL_SCOPE.__cineCorePart1Runner = runCoreRuntimeSegment;
    void runnerDefineError;
  }
}
function resolveCoreShared() {
  if (CORE_GLOBAL_SCOPE && CORE_GLOBAL_SCOPE.cineCoreShared) {
    return CORE_GLOBAL_SCOPE.cineCoreShared;
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
var CORE_SHARED = resolveCoreShared() || {};
function resolveCoreRuntimeHelpers() {
  var candidates = [];
  if (typeof CORE_PART2_RUNTIME_HELPERS !== 'undefined' && CORE_PART2_RUNTIME_HELPERS) {
    candidates.push(CORE_PART2_RUNTIME_HELPERS);
  }
  if (CORE_SHARED && _typeof(CORE_SHARED.cineCoreRuntimeHelpers) === 'object') {
    candidates.push(CORE_SHARED.cineCoreRuntimeHelpers);
  }
  if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && _typeof(CORE_GLOBAL_SCOPE.cineCoreRuntimeHelpers) === 'object') {
    candidates.push(CORE_GLOBAL_SCOPE.cineCoreRuntimeHelpers);
  }
  if (typeof CORE_SHARED_SCOPE_PART2 !== 'undefined' && CORE_SHARED_SCOPE_PART2 && _typeof(CORE_SHARED_SCOPE_PART2.cineCoreRuntimeHelpers) === 'object') {
    candidates.push(CORE_SHARED_SCOPE_PART2.cineCoreRuntimeHelpers);
  }
  if (typeof globalThis !== 'undefined' && globalThis && _typeof(globalThis.cineCoreRuntimeHelpers) === 'object') {
    candidates.push(globalThis.cineCoreRuntimeHelpers);
  }
  if (typeof window !== 'undefined' && window && _typeof(window.cineCoreRuntimeHelpers) === 'object') {
    candidates.push(window.cineCoreRuntimeHelpers);
  }
  if (typeof self !== 'undefined' && self && _typeof(self.cineCoreRuntimeHelpers) === 'object') {
    candidates.push(self.cineCoreRuntimeHelpers);
  }
  if (typeof global !== 'undefined' && global && _typeof(global.cineCoreRuntimeHelpers) === 'object') {
    candidates.push(global.cineCoreRuntimeHelpers);
  }
  if (typeof require === 'function') {
    try {
      var required = require('./app-core-runtime-helpers.js');
      if (required && _typeof(required) === 'object') {
        candidates.push(required);
      }
    } catch (runtimeHelpersError) {
      void runtimeHelpersError;
    }
  }
  for (var index = 0; index < candidates.length; index += 1) {
    var candidate = candidates[index];
    if (candidate && _typeof(candidate) === 'object') {
      return candidate;
    }
  }
  return null;
}
var CORE_RUNTIME_HELPERS = resolveCoreRuntimeHelpers();
var CORE_RUNTIME_FALLBACKS = CORE_RUNTIME_HELPERS && _typeof(CORE_RUNTIME_HELPERS) === 'object' ? CORE_RUNTIME_HELPERS : {};
function createCoreRuntimeStateFallback(candidateScopes) {
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
    for (var index = 0; index < candidateScopes.length; index += 1) {
      try {
        registerScope(candidateScopes[index]);
      } catch (initialiseScopeError) {
        void initialiseScopeError;
      }
    }
  }
  function withEachScope(callback) {
    if (typeof callback !== 'function') {
      return;
    }
    for (var _index2 = 0; _index2 < scopes.length; _index2 += 1) {
      try {
        callback(scopes[_index2], _index2);
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
    for (var _index3 = 0; _index3 < scopes.length; _index3 += 1) {
      var scope = scopes[_index3];
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
    withEachScope(function (scope) {
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
    for (var _index4 = 0; _index4 < scopes.length; _index4 += 1) {
      var scope = scopes[_index4];
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
    withEachScope(function (scope) {
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
    isReferenceError: function isReferenceError() {
      return false;
    },
    repair: function repair() {
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
function createCoreRuntimeState(candidateScopes) {
  if (CORE_RUNTIME_STATE_SUPPORT && typeof CORE_RUNTIME_STATE_SUPPORT.createLocalRuntimeState === 'function') {
    try {
      return CORE_RUNTIME_STATE_SUPPORT.createLocalRuntimeState(candidateScopes, {
        temperatureQueueKey: CORE_TEMPERATURE_QUEUE_KEY,
        temperatureRenderName: CORE_TEMPERATURE_RENDER_NAME
      });
    } catch (coreRuntimeStateError) {
      void coreRuntimeStateError;
    }
  }
  return createCoreRuntimeStateFallback(candidateScopes);
}
var CORE_RUNTIME_STATE = ensureCoreGlobalValue('__cineRuntimeState', function () {
  var candidateScopes = CORE_RUNTIME_CANDIDATE_SCOPES_RESOLVED.length ? CORE_RUNTIME_CANDIDATE_SCOPES_RESOLVED : resolvedCollectCoreRuntimeCandidateScopes((typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' ? CORE_GLOBAL_SCOPE : null);
  return createCoreRuntimeState(candidateScopes);
});
if (CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object') {
  try {
    Object.defineProperty(CORE_GLOBAL_SCOPE, '__cineCreateRuntimeState', {
      configurable: true,
      enumerable: false,
      writable: true,
      value: createCoreRuntimeState
    });
  } catch (exposeCreateStateError) {
    try {
      CORE_GLOBAL_SCOPE.__cineCreateRuntimeState = createCoreRuntimeState;
    } catch (assignCreateStateError) {
      void assignCreateStateError;
    }
    void exposeCreateStateError;
  }
}
function isAutoGearGlobalReferenceError(error) {
  if (!CORE_RUNTIME_STATE || !CORE_RUNTIME_STATE.autoGearGuards) {
    return false;
  }
  var guard = CORE_RUNTIME_STATE.autoGearGuards.isReferenceError;
  if (typeof guard !== 'function') {
    return false;
  }
  try {
    return guard(error) === true;
  } catch (guardError) {
    void guardError;
  }
  return false;
}
function repairAutoGearGlobals(scope) {
  if (!CORE_RUNTIME_STATE || !CORE_RUNTIME_STATE.autoGearGuards) {
    return;
  }
  var repair = CORE_RUNTIME_STATE.autoGearGuards.repair;
  if (typeof repair !== 'function') {
    return;
  }
  try {
    repair(scope);
  } catch (repairError) {
    void repairError;
  }
}
function callCoreFunctionIfAvailable(functionName) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var scope = CORE_GLOBAL_SCOPE || (typeof globalThis !== 'undefined' ? globalThis : null) || (typeof window !== 'undefined' ? window : null) || (typeof self !== 'undefined' ? self : null) || (typeof global !== 'undefined' ? global : null);
  var target = typeof functionName === 'string' ? scope && scope[functionName] : functionName;
  if (typeof target === 'function') {
    if (target.__cineSessionProxy__ === true) {
      var optionsObject = options && _typeof(options) === 'object' ? options : {};
      var attemptCount = typeof optionsObject.attempts === 'number' && Number.isFinite(optionsObject.attempts) ? optionsObject.attempts : 0;
      if (typeof enqueueCoreBootTask === 'function' && attemptCount < 3) {
        var nextOptions = _objectSpread(_objectSpread({}, optionsObject), {}, {
          defer: false,
          attempts: attemptCount + 1
        });
        enqueueCoreBootTask(function () {
          callCoreFunctionIfAvailable(functionName, args, nextOptions);
        });
      }
      if (Object.prototype.hasOwnProperty.call(optionsObject, 'defaultValue')) {
        return optionsObject.defaultValue;
      }
      return undefined;
    }
    if (target.__cineDeferredPlaceholder__ === true) {
      var _optionsObject = options && _typeof(options) === 'object' ? options : {};
      var _attemptCount = typeof _optionsObject.attempts === 'number' && Number.isFinite(_optionsObject.attempts) ? _optionsObject.attempts : 0;
      if (typeof enqueueCoreBootTask === 'function' && _attemptCount < 3) {
        var _nextOptions = _objectSpread(_objectSpread({}, _optionsObject), {}, {
          defer: false,
          attempts: _attemptCount + 1
        });
        enqueueCoreBootTask(function () {
          callCoreFunctionIfAvailable(functionName, args, _nextOptions);
        });
      }
      return undefined;
    }
    var attempt = 0;
    while (attempt < 2) {
      try {
        return target.apply(scope, args);
      } catch (invokeError) {
        if (attempt === 0 && isAutoGearGlobalReferenceError(invokeError)) {
          repairAutoGearGlobals(scope);
          attempt += 1;
          continue;
        }
        if (typeof console !== 'undefined' && typeof console.error === 'function') {
          console.error("Failed to invoke ".concat(functionName), invokeError);
        }
        break;
      }
    }
    return undefined;
  }
  if (options && options.defer === true) {
    enqueueCoreBootTask(function () {
      callCoreFunctionIfAvailable(functionName, args, _objectSpread(_objectSpread({}, options), {}, {
        defer: false
      }));
    });
  }
  return typeof options !== 'undefined' && Object.prototype.hasOwnProperty.call(options, 'defaultValue') ? options.defaultValue : undefined;
}
exposeCoreRuntimeConstant('applyLegacyGridSnapValue', applyLegacyGridSnapValue);
function safeFormatAutoGearItemSummary(item) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (typeof formatAutoGearItemSummary === 'function') {
    try {
      return formatAutoGearItemSummary(item, options);
    } catch (formatError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Failed to format automatic gear item summary via direct formatter.', formatError);
      }
    }
  }
  var fallback = callCoreFunctionIfAvailable('formatAutoGearItemSummary', [item, options], {
    defaultValue: ''
  });
  if (typeof fallback === 'string') {
    return fallback;
  }
  if (fallback === null || typeof fallback === 'undefined') {
    return '';
  }
  try {
    return String(fallback);
  } catch (coerceError) {
    void coerceError;
    return '';
  }
}
function formatWithPlaceholdersSafe(template) {
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }
  if (typeof formatWithPlaceholders === 'function') {
    try {
      return formatWithPlaceholders.apply(void 0, [template].concat(values));
    } catch (formatError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Failed to format placeholder template via direct formatter.', formatError);
      }
    }
  }
  var fallback = callCoreFunctionIfAvailable('formatWithPlaceholders', [template].concat(values), {
    defaultValue: null
  });
  if (typeof fallback === 'string' && fallback) {
    return fallback;
  }
  var formatted = typeof template === 'string' ? template : String(template || '');
  for (var index = 0; index < values.length; index += 1) {
    var value = values[index];
    formatted = formatted.replace('%s', value);
  }
  return formatted;
}
(function ensureCoreRuntimePlaceholders() {
  var scope = CORE_GLOBAL_SCOPE || (typeof globalThis !== 'undefined' ? globalThis : null) || (typeof window !== 'undefined' ? window : null) || (typeof self !== 'undefined' ? self : null) || (typeof global !== 'undefined' ? global : null);
  if (!scope || _typeof(scope) !== 'object') {
    return;
  }
  if (typeof scope.populateSelect !== 'function') {
    var placeholder = function populateSelectPlaceholder(selectElem) {
      var optionsObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var includeNone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (!selectElem) {
        return;
      }
      var opts = optionsObj && _typeof(optionsObj) === 'object' ? optionsObj : {};
      try {
        selectElem.innerHTML = '';
        if (includeNone) {
          var noneOpt = document.createElement('option');
          noneOpt.value = 'None';
          var noneMap = {
            de: 'Keine Auswahl',
            es: 'Ninguno',
            fr: 'Aucun'
          };
          var lang = typeof currentLang === 'string' ? currentLang : 'en';
          noneOpt.textContent = noneMap[lang] || 'None';
          selectElem.appendChild(noneOpt);
        }
        Object.keys(opts).filter(function (name) {
          return name !== 'None';
        }).sort(typeof localeSort === 'function' ? localeSort : undefined).forEach(function (name) {
          var opt = document.createElement('option');
          opt.value = name;
          opt.textContent = name;
          selectElem.appendChild(opt);
        });
      } catch (populateError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('populateSelect placeholder failed to render options immediately', populateError);
        }
      }
      enqueueCoreBootTask(function () {
        var realPopulate = scope && typeof scope.populateSelect === 'function' && scope.populateSelect !== placeholder ? scope.populateSelect : null;
        if (realPopulate) {
          realPopulate(selectElem, optionsObj, includeNone);
        }
      });
    };
    placeholder.__cineDeferredPlaceholder__ = true;
    try {
      scope.populateSelect = placeholder;
    } catch (assignError) {
      void assignError;
    }
  }
  var ensureFunctionPlaceholder = function ensureFunctionPlaceholder(name) {
    if (typeof name !== 'string' || !name) {
      return;
    }
    if (typeof scope[name] === 'function') {
      return;
    }
    var placeholder = function coreDeferredFunctionPlaceholder() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return callCoreFunctionIfAvailable(name, args, {
        defer: true,
        attempts: 0
      });
    };
    placeholder.__cineDeferredPlaceholder__ = true;
    try {
      scope[name] = placeholder;
    } catch (assignError) {
      void assignError;
    }
  };
  ensureFunctionPlaceholder('checkSetupChanged');
  ensureFunctionPlaceholder('updateCalculations');
  if (typeof scope.feedbackCancelBtn === 'undefined') {
    try {
      scope.feedbackCancelBtn = null;
    } catch (assignError) {
      void assignError;
    }
  }
})();
var stableStringify = typeof CORE_SHARED.stableStringify === 'function' ? CORE_SHARED.stableStringify : typeof CORE_SHARED.fallbackStableStringify === 'function' ? CORE_SHARED.fallbackStableStringify : typeof CORE_RUNTIME_FALLBACKS.fallbackStableStringify === 'function' ? CORE_RUNTIME_FALLBACKS.fallbackStableStringify : function fallbackStableStringifyProxy(value) {
  try {
    return JSON.stringify(value);
  } catch (serializationError) {
    void serializationError;
  }
  return String(value);
};
var humanizeKey = typeof CORE_SHARED.humanizeKey === 'function' ? CORE_SHARED.humanizeKey : typeof CORE_SHARED.fallbackHumanizeKey === 'function' ? CORE_SHARED.fallbackHumanizeKey : typeof CORE_RUNTIME_FALLBACKS.fallbackHumanizeKey === 'function' ? CORE_RUNTIME_FALLBACKS.fallbackHumanizeKey : function fallbackHumanizeKeyProxy(key) {
  var stringValue = typeof key === 'string' ? key : String(key || '');
  return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
};
function fallbackResolveConnectorSummaryGenerator() {
  var scopes = [];
  if (typeof globalThis !== 'undefined') scopes.push(globalThis);
  if (typeof window !== 'undefined') scopes.push(window);
  if (typeof global !== 'undefined') scopes.push(global);
  if (typeof self !== 'undefined') scopes.push(self);
  for (var _i = 0, _scopes = scopes; _i < _scopes.length; _i++) {
    var scope = _scopes[_i];
    if (scope && typeof scope.generateConnectorSummary === 'function') {
      return scope.generateConnectorSummary;
    }
  }
  return null;
}
var resolveConnectorSummaryGenerator = typeof CORE_SHARED.resolveConnectorSummaryGenerator === 'function' ? CORE_SHARED.resolveConnectorSummaryGenerator : fallbackResolveConnectorSummaryGenerator;
var sessionSafeGenerateConnectorSummary = typeof CORE_SHARED.safeGenerateConnectorSummary === 'function' ? CORE_SHARED.safeGenerateConnectorSummary : function safeGenerateConnectorSummary(device) {
  if (!device) {
    return '';
  }
  var generator = resolveConnectorSummaryGenerator();
  if (typeof generator !== 'function') {
    return '';
  }
  try {
    var summary = generator(device);
    return summary || '';
  } catch (error) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('Unable to generate connector summary', error);
    }
    return '';
  }
};
var normalizeAutoGearWeightOperator = typeof CORE_SHARED.normalizeAutoGearWeightOperator === 'function' ? CORE_SHARED.normalizeAutoGearWeightOperator : typeof CORE_RUNTIME_FALLBACKS.fallbackNormalizeAutoGearWeightOperator === 'function' ? CORE_RUNTIME_FALLBACKS.fallbackNormalizeAutoGearWeightOperator : function normalizeAutoGearWeightOperatorFallback() {
  return 'greater';
};
var normalizeAutoGearWeightValue = typeof CORE_SHARED.normalizeAutoGearWeightValue === 'function' ? CORE_SHARED.normalizeAutoGearWeightValue : typeof CORE_RUNTIME_FALLBACKS.fallbackNormalizeAutoGearWeightValue === 'function' ? CORE_RUNTIME_FALLBACKS.fallbackNormalizeAutoGearWeightValue : function normalizeAutoGearWeightValueFallback() {
  return null;
};
var normalizeAutoGearCameraWeightCondition = typeof CORE_SHARED.normalizeAutoGearCameraWeightCondition === 'function' ? CORE_SHARED.normalizeAutoGearCameraWeightCondition : typeof CORE_RUNTIME_FALLBACKS.fallbackNormalizeAutoGearCameraWeightCondition === 'function' ? CORE_RUNTIME_FALLBACKS.fallbackNormalizeAutoGearCameraWeightCondition : function normalizeAutoGearCameraWeightConditionFallback() {
  return null;
};
var formatAutoGearWeight = typeof CORE_SHARED.formatAutoGearWeight === 'function' ? CORE_SHARED.formatAutoGearWeight : typeof CORE_RUNTIME_FALLBACKS.fallbackFormatAutoGearWeight === 'function' ? CORE_RUNTIME_FALLBACKS.fallbackFormatAutoGearWeight : function formatAutoGearWeightFallback(value) {
  return Number.isFinite(value) ? String(value) : '';
};
var fallbackGetAutoGearCameraWeightOperatorLabel = typeof CORE_RUNTIME_FALLBACKS.fallbackGetAutoGearCameraWeightOperatorLabel === 'function' ? CORE_RUNTIME_FALLBACKS.fallbackGetAutoGearCameraWeightOperatorLabel : function getAutoGearCameraWeightOperatorLabelFallback(operator, langTexts) {
  var textsForLang = langTexts || {};
  var normalized = normalizeAutoGearWeightOperator(operator);
  if (normalized === 'less') {
    return textsForLang.autoGearCameraWeightOperatorLess || 'Lighter than';
  }
  if (normalized === 'equal') {
    return textsForLang.autoGearCameraWeightOperatorEqual || 'Exactly';
  }
  return textsForLang.autoGearCameraWeightOperatorGreater || 'Heavier than';
};
var getAutoGearCameraWeightOperatorLabel = typeof CORE_SHARED.getAutoGearCameraWeightOperatorLabel === 'function' ? CORE_SHARED.getAutoGearCameraWeightOperatorLabel : fallbackGetAutoGearCameraWeightOperatorLabel;
var fallbackFormatAutoGearCameraWeight = typeof CORE_RUNTIME_FALLBACKS.fallbackFormatAutoGearCameraWeight === 'function' ? CORE_RUNTIME_FALLBACKS.fallbackFormatAutoGearCameraWeight : function formatAutoGearCameraWeightFallback(condition, langTexts) {
  if (!condition || !Number.isFinite(condition.value)) return '';
  var label = getAutoGearCameraWeightOperatorLabel(condition.operator, langTexts);
  var formattedValue = formatAutoGearWeight(condition.value);
  return label ? "".concat(label, " ").concat(formattedValue, " g") : "".concat(formattedValue, " g");
};
var formatAutoGearCameraWeight = typeof CORE_SHARED.formatAutoGearCameraWeight === 'function' ? CORE_SHARED.formatAutoGearCameraWeight : fallbackFormatAutoGearCameraWeight;
var LZString = CORE_SHARED.LZString;
if (!LZString && typeof CORE_SHARED.getLZString === 'function') {
  LZString = CORE_SHARED.getLZString();
}
if (!LZString) {
  LZString = {
    compressToEncodedURIComponent: function compressToEncodedURIComponent(s) {
      return s;
    },
    decompressFromEncodedURIComponent: function decompressFromEncodedURIComponent(s) {
      return s;
    }
  };
}
var generatePrintableOverview;
try {
  var _require = require('./overview.js');
  generatePrintableOverview = _require.generatePrintableOverview;
} catch (_unused) {}
function resolveAppVersionScope() {
  if (typeof globalThis !== 'undefined' && globalThis) {
    return globalThis;
  }
  if (typeof window !== 'undefined' && window) {
    return window;
  }
  if (typeof self !== 'undefined' && self) {
    return self;
  }
  if (typeof global !== 'undefined' && global) {
    return global;
  }
  return null;
}
function extractAppVersion(candidate) {
  if (!candidate) {
    return null;
  }
  if (typeof candidate === 'string') {
    return candidate;
  }
  if (typeof candidate.APP_VERSION === 'string') {
    return candidate.APP_VERSION;
  }
  if (typeof candidate.default === 'string') {
    return candidate.default;
  }
  if (typeof candidate.version === 'string') {
    return candidate.version;
  }
  return null;
}
function resolveAppVersionValue() {
  if (typeof CORE_SHARED.APP_VERSION === 'string' && CORE_SHARED.APP_VERSION) {
    return CORE_SHARED.APP_VERSION;
  }
  var scope = resolveAppVersionScope();
  if (scope && typeof scope.CPP_APP_VERSION === 'string' && scope.CPP_APP_VERSION) {
    return scope.CPP_APP_VERSION;
  }
  if (scope && typeof scope.APP_VERSION === 'string' && scope.APP_VERSION) {
    return scope.APP_VERSION;
  }
  if (typeof require === 'function') {
    try {
      var moduleCandidate = require('../../app-version.js');
      var resolvedCandidate = extractAppVersion(moduleCandidate);
      if (resolvedCandidate) {
        return resolvedCandidate;
      }
    } catch (appVersionError) {
      void appVersionError;
    }
  }
  return '0.0.0';
}
var APP_VERSION = resolveAppVersionValue();
resolvePinkModeLottieRuntime();
var IOS_PWA_HELP_STORAGE_KEY = 'iosPwaHelpShown';
var INSTALL_BANNER_DISMISSED_KEY = 'installPromptDismissed';
function resolveInstallBannerGlobalScope() {
  if (typeof globalThis !== 'undefined' && globalThis) {
    return globalThis;
  }
  if (typeof window !== 'undefined' && window) {
    return window;
  }
  if (typeof self !== 'undefined' && self) {
    return self;
  }
  if (typeof global !== 'undefined' && global) {
    return global;
  }
  return null;
}
var installBannerGlobalScope = resolveInstallBannerGlobalScope();
if (installBannerGlobalScope && typeof installBannerGlobalScope.installBannerDismissedInSession !== 'boolean') {
  installBannerGlobalScope.installBannerDismissedInSession = false;
}
var HELP_MODULE_CACHE_KEY = '__cineResolvedHelpModule';
function createHelpModuleFallback() {
  return {
    resolveIosPwaHelpStorageKey: function resolveIosPwaHelpStorageKey(explicitKey) {
      if (typeof explicitKey === 'string' && explicitKey) {
        return explicitKey;
      }
      if (typeof IOS_PWA_HELP_STORAGE_KEY === 'string' && IOS_PWA_HELP_STORAGE_KEY) {
        return IOS_PWA_HELP_STORAGE_KEY;
      }
      return 'iosPwaHelpShown';
    },
    isIosDevice: function isIosDevice() {
      return false;
    },
    isAndroidDevice: function isAndroidDevice() {
      return false;
    },
    isStandaloneDisplayMode: function isStandaloneDisplayMode() {
      return false;
    },
    hasDismissedIosPwaHelp: function hasDismissedIosPwaHelp() {
      return false;
    },
    markIosPwaHelpDismissed: function markIosPwaHelpDismissed() {},
    shouldShowIosPwaHelp: function shouldShowIosPwaHelp() {
      return false;
    }
  };
}
function resolveHelpModuleApi() {
  var globalScope = getCoreGlobalObject();
  if (globalScope && globalScope[HELP_MODULE_CACHE_KEY]) {
    return globalScope[HELP_MODULE_CACHE_KEY];
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
      logModuleWarning('Unable to resolve cine.features.help module registry.', error);
    }
    if (registry && typeof registry.get === 'function') {
      try {
        var fromRegistry = registry.get('cine.features.help');
        if (fromRegistry && candidates.indexOf(fromRegistry) === -1) {
          candidates.push(fromRegistry);
        }
      } catch (error) {
        logModuleWarning('Unable to read cine.features.help module.', error);
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
      var exposed = scope.cineFeaturesHelp;
      if (exposed && candidates.indexOf(exposed) === -1) {
        candidates.push(exposed);
      }
    } catch (error) {
      void error;
    }
    try {
      var moduleNamespace = scope.cineHelpModule;
      if (moduleNamespace && _typeof(moduleNamespace) === 'object' && moduleNamespace && _typeof(moduleNamespace.help) === 'object' && candidates.indexOf(moduleNamespace.help) === -1) {
        candidates.push(moduleNamespace.help);
      }
    } catch (error) {
      void error;
    }
    if (typeof scope.__cineCreateHelpModule === 'function') {
      try {
        var created = scope.__cineCreateHelpModule();
        if (created && _typeof(created) === 'object') {
          if (_typeof(created.help) === 'object' && candidates.indexOf(created.help) === -1) {
            candidates.push(created.help);
          } else if (candidates.indexOf(created) === -1) {
            candidates.push(created);
          }
        }
      } catch (error) {
        logModuleWarning('Unable to instantiate cine.features.help module.', error);
      }
    }
  }
  var resolvedApi = null;
  for (var _index5 = 0; _index5 < candidates.length; _index5 += 1) {
    var candidate = candidates[_index5];
    if (candidate && _typeof(candidate) === 'object' && typeof candidate.isIosDevice === 'function') {
      resolvedApi = candidate;
      break;
    }
    if (candidate && _typeof(candidate) === 'object' && _typeof(candidate.help) === 'object' && typeof candidate.help.isIosDevice === 'function') {
      resolvedApi = candidate.help;
      break;
    }
  }
  var api = resolvedApi || createHelpModuleFallback();
  if (globalScope) {
    try {
      globalScope[HELP_MODULE_CACHE_KEY] = api;
    } catch (error) {
      void error;
    }
  }
  return api;
}
var CONTACTS_MODULE_CACHE_KEY = '__cineContactsModuleCache__';
var OWN_GEAR_MODULE_CACHE_KEY = '__cineOwnGearModuleCache__';
var LEGACY_CONTACTS_OWN_GEAR_MODULE_CACHE_KEY = '__cineContactsOwnGearModuleCache__';
function cacheFeatureModule(globalScope, cacheKey, moduleApi) {
  try {
    Object.defineProperty(globalScope, cacheKey, {
      configurable: true,
      enumerable: false,
      writable: true,
      value: moduleApi
    });
    return;
  } catch (defineError) {
    void defineError;
  }
  try {
    globalScope[cacheKey] = moduleApi;
  } catch (assignError) {
    void assignError;
  }
}
function resolveLegacyContactsOwnGearModule() {
  var globalScope = getCoreGlobalObject();
  if (!globalScope || _typeof(globalScope) !== 'object' && typeof globalScope !== 'function') {
    return null;
  }
  if (Object.prototype.hasOwnProperty.call(globalScope, LEGACY_CONTACTS_OWN_GEAR_MODULE_CACHE_KEY)) {
    return globalScope[LEGACY_CONTACTS_OWN_GEAR_MODULE_CACHE_KEY];
  }
  var candidates = [];
  var moduleBase = (typeof cineModuleBase === "undefined" ? "undefined" : _typeof(cineModuleBase)) === 'object' && cineModuleBase || (globalScope && _typeof(globalScope.cineModuleBase) === 'object' ? globalScope.cineModuleBase : null);
  if (moduleBase && typeof moduleBase.getModuleRegistry === 'function') {
    try {
      var registry = moduleBase.getModuleRegistry(globalScope);
      if (registry && typeof registry.get === 'function') {
        var fromRegistry = registry.get('cine.features.contactsOwnGear');
        if (fromRegistry && candidates.indexOf(fromRegistry) === -1) {
          candidates.push(fromRegistry);
        }
      }
    } catch (error) {
      void error;
    }
  }
  var scopeCandidates = [];
  if (scopeCandidates.indexOf(globalScope) === -1) scopeCandidates.push(globalScope);
  if (typeof globalThis !== 'undefined' && scopeCandidates.indexOf(globalThis) === -1) scopeCandidates.push(globalThis);
  if (typeof window !== 'undefined' && scopeCandidates.indexOf(window) === -1) scopeCandidates.push(window);
  if (typeof self !== 'undefined' && scopeCandidates.indexOf(self) === -1) scopeCandidates.push(self);
  if (typeof global !== 'undefined' && scopeCandidates.indexOf(global) === -1) scopeCandidates.push(global);
  for (var index = 0; index < scopeCandidates.length; index += 1) {
    var scope = scopeCandidates[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      var exposed = scope.cineFeaturesContactsOwnGear;
      if (exposed && _typeof(exposed) === 'object' && candidates.indexOf(exposed) === -1) {
        candidates.push(exposed);
      }
    } catch (error) {
      void error;
    }
  }
  var moduleApi = candidates.find(function (candidate) {
    return candidate && _typeof(candidate) === 'object';
  }) || null;
  cacheFeatureModule(globalScope, LEGACY_CONTACTS_OWN_GEAR_MODULE_CACHE_KEY, moduleApi);
  return moduleApi;
}
function resolveContactsModule() {
  var globalScope = getCoreGlobalObject();
  if (!globalScope || _typeof(globalScope) !== 'object' && typeof globalScope !== 'function') {
    return null;
  }
  if (Object.prototype.hasOwnProperty.call(globalScope, CONTACTS_MODULE_CACHE_KEY)) {
    return globalScope[CONTACTS_MODULE_CACHE_KEY];
  }
  var candidates = [];
  var moduleBase = (typeof cineModuleBase === "undefined" ? "undefined" : _typeof(cineModuleBase)) === 'object' && cineModuleBase || (globalScope && _typeof(globalScope.cineModuleBase) === 'object' ? globalScope.cineModuleBase : null);
  if (moduleBase && typeof moduleBase.getModuleRegistry === 'function') {
    try {
      var registry = moduleBase.getModuleRegistry(globalScope);
      if (registry && typeof registry.get === 'function') {
        var fromRegistry = registry.get('cine.features.contacts');
        if (fromRegistry && candidates.indexOf(fromRegistry) === -1) {
          candidates.push(fromRegistry);
        }
      }
    } catch (error) {
      void error;
    }
  }
  var scopeCandidates = [];
  if (scopeCandidates.indexOf(globalScope) === -1) scopeCandidates.push(globalScope);
  if (typeof globalThis !== 'undefined' && scopeCandidates.indexOf(globalThis) === -1) scopeCandidates.push(globalThis);
  if (typeof window !== 'undefined' && scopeCandidates.indexOf(window) === -1) scopeCandidates.push(window);
  if (typeof self !== 'undefined' && scopeCandidates.indexOf(self) === -1) scopeCandidates.push(self);
  if (typeof global !== 'undefined' && scopeCandidates.indexOf(global) === -1) scopeCandidates.push(global);
  for (var index = 0; index < scopeCandidates.length; index += 1) {
    var scope = scopeCandidates[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      var exposed = scope.cineFeaturesContacts;
      if (exposed && _typeof(exposed) === 'object' && candidates.indexOf(exposed) === -1) {
        candidates.push(exposed);
      }
    } catch (error) {
      void error;
    }
  }
  var moduleApi = candidates.find(function (candidate) {
    return candidate && _typeof(candidate) === 'object';
  }) || resolveLegacyContactsOwnGearModule() || null;
  cacheFeatureModule(globalScope, CONTACTS_MODULE_CACHE_KEY, moduleApi);
  return moduleApi;
}
function resolveOwnGearModule() {
  var globalScope = getCoreGlobalObject();
  if (!globalScope || _typeof(globalScope) !== 'object' && typeof globalScope !== 'function') {
    return null;
  }
  if (Object.prototype.hasOwnProperty.call(globalScope, OWN_GEAR_MODULE_CACHE_KEY)) {
    return globalScope[OWN_GEAR_MODULE_CACHE_KEY];
  }
  var candidates = [];
  var moduleBase = (typeof cineModuleBase === "undefined" ? "undefined" : _typeof(cineModuleBase)) === 'object' && cineModuleBase || (globalScope && _typeof(globalScope.cineModuleBase) === 'object' ? globalScope.cineModuleBase : null);
  if (moduleBase && typeof moduleBase.getModuleRegistry === 'function') {
    try {
      var registry = moduleBase.getModuleRegistry(globalScope);
      if (registry && typeof registry.get === 'function') {
        var fromRegistry = registry.get('cine.features.ownGear');
        if (fromRegistry && candidates.indexOf(fromRegistry) === -1) {
          candidates.push(fromRegistry);
        }
      }
    } catch (error) {
      void error;
    }
  }
  var scopeCandidates = [];
  if (scopeCandidates.indexOf(globalScope) === -1) scopeCandidates.push(globalScope);
  if (typeof globalThis !== 'undefined' && scopeCandidates.indexOf(globalThis) === -1) scopeCandidates.push(globalThis);
  if (typeof window !== 'undefined' && scopeCandidates.indexOf(window) === -1) scopeCandidates.push(window);
  if (typeof self !== 'undefined' && scopeCandidates.indexOf(self) === -1) scopeCandidates.push(self);
  if (typeof global !== 'undefined' && scopeCandidates.indexOf(global) === -1) scopeCandidates.push(global);
  for (var index = 0; index < scopeCandidates.length; index += 1) {
    var scope = scopeCandidates[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      var exposed = scope.cineFeaturesOwnGear;
      if (exposed && _typeof(exposed) === 'object' && candidates.indexOf(exposed) === -1) {
        candidates.push(exposed);
      }
    } catch (error) {
      void error;
    }
  }
  var moduleApi = candidates.find(function (candidate) {
    return candidate && _typeof(candidate) === 'object';
  }) || resolveLegacyContactsOwnGearModule() || null;
  cacheFeatureModule(globalScope, OWN_GEAR_MODULE_CACHE_KEY, moduleApi);
  return moduleApi;
}
var helpModuleApi = resolveHelpModuleApi();
globalThis.helpModuleApi = helpModuleApi;
var deviceSchema = null;
function resolveCoreDeviceSchema() {
  var scopeCandidates = [];
  if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object') {
    scopeCandidates.push(CORE_GLOBAL_SCOPE);
  }
  if (typeof globalThis !== 'undefined' && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
    scopeCandidates.push(globalThis);
  }
  if (typeof window !== 'undefined' && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
    scopeCandidates.push(window);
  }
  if (typeof self !== 'undefined' && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
    scopeCandidates.push(self);
  }
  if (typeof global !== 'undefined' && global && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
    scopeCandidates.push(global);
  }
  for (var index = 0; index < scopeCandidates.length; index += 1) {
    var scope = scopeCandidates[index];
    if (!scope || _typeof(scope) !== 'object') {
      continue;
    }
    if (scope.CORE_DEVICE_SCHEMA && _typeof(scope.CORE_DEVICE_SCHEMA) === 'object') {
      return scope.CORE_DEVICE_SCHEMA;
    }
    if (scope.cineCoreDeviceSchema && _typeof(scope.cineCoreDeviceSchema) === 'object') {
      return scope.cineCoreDeviceSchema;
    }
  }
  return null;
}
var deviceSchemaManager = function initializeDeviceSchemaManager() {
  var coreDeviceSchema = resolveCoreDeviceSchema();
  if (coreDeviceSchema && typeof coreDeviceSchema.createDeviceSchemaManager === 'function') {
    try {
      return coreDeviceSchema.createDeviceSchemaManager({
        onSchemaChange: function onSchemaChange(schema) {
          deviceSchema = schema;
        },
        populateCategoryOptions: function populateCategoryOptions() {
          try {
            _populateCategoryOptions();
          } catch (error) {
            console.error('populateCategoryOptions failed during scheduled execution', error);
          }
        }
      });
    } catch (deviceSchemaManagerError) {
      console.warn('Failed to initialize device schema manager from core module', deviceSchemaManagerError);
    }
  }
  return null;
}();
var DEVICE_SCHEMA_PATH = deviceSchemaManager && deviceSchemaManager.DEVICE_SCHEMA_PATH || 'src/data/schema.json';
var loadDeviceSchemaFromCacheStorage = deviceSchemaManager && typeof deviceSchemaManager.loadDeviceSchemaFromCacheStorage === 'function' ? deviceSchemaManager.loadDeviceSchemaFromCacheStorage : _asyncToGenerator(_regenerator().m(function _callee() {
  return _regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        return _context.a(2, null);
    }
  }, _callee);
}));
var finalizeDeviceSchemaLoad = deviceSchemaManager && typeof deviceSchemaManager.finalizeDeviceSchemaLoad === 'function' ? deviceSchemaManager.finalizeDeviceSchemaLoad : function () {};
var isValidDeviceSchema = deviceSchemaManager && typeof deviceSchemaManager.isValidDeviceSchema === 'function' ? deviceSchemaManager.isValidDeviceSchema : function (candidate) {
  return candidate && _typeof(candidate) === 'object' && !Array.isArray(candidate);
};
var cachedDeviceSchema = deviceSchemaManager && typeof deviceSchemaManager.getCachedDeviceSchema === 'function' ? deviceSchemaManager.getCachedDeviceSchema() : null;
if (deviceSchemaManager && typeof deviceSchemaManager.getDeviceSchema === 'function') {
  var initialSchema = deviceSchemaManager.getDeviceSchema();
  if (initialSchema) {
    deviceSchema = initialSchema;
  }
}
var applyDeviceSchema = deviceSchemaManager && typeof deviceSchemaManager.setDeviceSchema === 'function' ? function (schema) {
  return deviceSchemaManager.setDeviceSchema(schema);
} : function (schema) {
  if (isValidDeviceSchema(schema)) {
    deviceSchema = schema;
  } else if (!deviceSchema) {
    deviceSchema = {};
  }
  return deviceSchema;
};
var bundledSchema = null;
var contactsProfileModule = null;
var contactsListModule = null;
var CONTACTS_PROFILE_GLOBAL_KEY = 'CINE_CONTACTS_PROFILE_MODULE';
var CONTACTS_LIST_GLOBAL_KEY = 'CINE_CONTACTS_LIST_MODULE';
var canRequireModule = typeof require === 'function';
if (canRequireModule) {
  try {
    bundledSchema = require('../data/schema.json');
  } catch (schemaRequireError) {
    void schemaRequireError;
  }
  try {
    contactsProfileModule = require('./contacts/profile.js');
  } catch (profileModuleError) {
    console.warn('Failed to load contacts profile module', profileModuleError);
  }
  try {
    contactsListModule = require('./contacts/list.js');
  } catch (contactsListModuleError) {
    console.warn('Failed to load contacts list module', contactsListModuleError);
  }
}
var contactsModuleGlobalScope = typeof globalThis !== 'undefined' && globalThis || typeof self !== 'undefined' && self || typeof window !== 'undefined' && window || typeof global !== 'undefined' && global || null;
var readContactsModuleFromGlobal = function readContactsModuleFromGlobal(key) {
  if (!contactsModuleGlobalScope || !key) {
    return null;
  }
  try {
    var candidate = contactsModuleGlobalScope[key];
    return candidate || null;
  } catch (contactsModuleError) {
    console.warn('Failed to read contacts module from global scope', contactsModuleError);
    return null;
  }
};
if (!contactsProfileModule) {
  contactsProfileModule = readContactsModuleFromGlobal(CONTACTS_PROFILE_GLOBAL_KEY);
}
if (!contactsListModule) {
  contactsListModule = readContactsModuleFromGlobal(CONTACTS_LIST_GLOBAL_KEY);
}
if (!contactsProfileModule || !contactsListModule) {
  console.warn('Module loader is not available in this environment. Contacts features limited.');
}
var fallbackSanitizeContactValue = function fallbackSanitizeContactValue(value) {
  return typeof value === 'string' ? value.trim() : '';
};
var fallbackNormalizeContactEntry = function fallbackNormalizeContactEntry(entry) {
  return {
    id: fallbackSanitizeContactValue(entry && entry.id) || "contact-".concat(Date.now().toString(36)),
    name: fallbackSanitizeContactValue(entry && entry.name),
    role: fallbackSanitizeContactValue(entry && entry.role),
    phone: fallbackSanitizeContactValue(entry && entry.phone),
    email: fallbackSanitizeContactValue(entry && entry.email),
    website: fallbackSanitizeContactValue(entry && entry.website),
    avatar: typeof (entry === null || entry === void 0 ? void 0 : entry.avatar) === 'string' ? entry.avatar : '',
    createdAt: Number.isFinite(entry === null || entry === void 0 ? void 0 : entry.createdAt) ? entry.createdAt : Date.now(),
    updatedAt: Number.isFinite(entry === null || entry === void 0 ? void 0 : entry.updatedAt) ? entry.updatedAt : Date.now()
  };
};
function createFallbackProfileController() {
  var state = {
    name: '',
    role: '',
    avatar: '',
    phone: '',
    email: ''
  };
  var listeners = new Set();
  var snapshot = function snapshot() {
    return _objectSpread({}, state);
  };
  var emit = function emit() {
    var current = snapshot();
    listeners.forEach(function (listener) {
      try {
        listener(current);
      } catch (listenerError) {
        console.warn('Profile listener failed in fallback controller', listenerError);
      }
    });
    return current;
  };
  return {
    assignUserProfileState: function assignUserProfileState() {
      var updates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Object.assign(state, updates);
      return emit();
    },
    getUserProfileSnapshot: snapshot,
    handleFieldInput: function handleFieldInput(field, rawValue) {
      if (!field) return false;
      state[field] = typeof rawValue === 'string' ? rawValue : '';
      emit();
      return true;
    },
    handleFieldBlur: function handleFieldBlur() {
      return undefined;
    },
    load: function load(newState) {
      if (newState && _typeof(newState) === 'object') {
        Object.assign(state, newState);
      }
      return emit();
    },
    setAvatar: function setAvatar(value) {
      state.avatar = typeof value === 'string' ? value : '';
      emit();
    },
    clearAvatar: function clearAvatar() {
      if (!state.avatar) return false;
      state.avatar = '';
      emit();
      return true;
    },
    onChange: function onChange(listener) {
      if (typeof listener !== 'function') return function () {
        return undefined;
      };
      listeners.add(listener);
      return function () {
        return listeners.delete(listener);
      };
    },
    schedulePersist: function schedulePersist() {
      return undefined;
    },
    markDirty: function markDirty() {
      return undefined;
    },
    setPendingAnnouncement: function setPendingAnnouncement() {
      return undefined;
    }
  };
}
var _ref8 = contactsProfileModule || {},
  _ref8$CONTACT_AVATAR_ = _ref8.CONTACT_AVATAR_MAX_BYTES,
  resolvedContactAvatarMaxBytes = _ref8$CONTACT_AVATAR_ === void 0 ? 300 * 1024 : _ref8$CONTACT_AVATAR_,
  _ref8$CONTACT_AVATAR_2 = _ref8.CONTACT_AVATAR_MAX_SOURCE_BYTES,
  resolvedContactAvatarMaxSourceBytes = _ref8$CONTACT_AVATAR_2 === void 0 ? 6 * 1024 * 1024 : _ref8$CONTACT_AVATAR_2,
  _ref8$CONTACT_AVATAR_3 = _ref8.CONTACT_AVATAR_MAX_DIMENSION,
  resolvedContactAvatarMaxDimension = _ref8$CONTACT_AVATAR_3 === void 0 ? 256 : _ref8$CONTACT_AVATAR_3,
  _ref8$CONTACT_AVATAR_4 = _ref8.CONTACT_AVATAR_JPEG_QUALITY,
  resolvedContactAvatarJpegQuality = _ref8$CONTACT_AVATAR_4 === void 0 ? 0.85 : _ref8$CONTACT_AVATAR_4,
  _ref8$CONTACT_AVATAR_5 = _ref8.CONTACT_AVATAR_JPEG_MIN_QUALITY,
  resolvedContactAvatarJpegMinQuality = _ref8$CONTACT_AVATAR_5 === void 0 ? 0.55 : _ref8$CONTACT_AVATAR_5,
  resolvedCreateProfileController = _ref8.createProfileController,
  resolvedEstimateDataUrlSize = _ref8.estimateDataUrlSize,
  resolvedOptimiseAvatarDataUrl = _ref8.optimiseAvatarDataUrl,
  resolvedReadAvatarFile = _ref8.readAvatarFile,
  resolvedIsSafeImageUrl = _ref8.isSafeImageUrl;
var _ref7 = contactsListModule || {},
  resolvedSanitizeContactValue = _ref7.sanitizeContactValue,
  resolvedNormalizeContactEntry = _ref7.normalizeContactEntry,
  resolvedSortContacts = _ref7.sortContacts,
  resolvedParseVCardEntries = _ref7.parseVCard,
  resolvedMergeImportedContacts = _ref7.mergeImportedContacts,
  resolvedCreateCrewRowSync = _ref7.createCrewRowSync;
var localCreateProfileController = typeof resolvedCreateProfileController === 'function' ? resolvedCreateProfileController : createFallbackProfileController;
var localEstimateDataUrlSize = typeof resolvedEstimateDataUrlSize === 'function' ? resolvedEstimateDataUrlSize : function (dataUrl) {
  return typeof dataUrl === 'string' ? dataUrl.length : 0;
};
var localOptimiseAvatarDataUrl = typeof resolvedOptimiseAvatarDataUrl === 'function' ? resolvedOptimiseAvatarDataUrl : function (dataUrl, _mime, onSuccess) {
  if (typeof onSuccess === 'function') {
    onSuccess(typeof dataUrl === 'string' ? dataUrl : '');
  }
  return Promise.resolve(typeof dataUrl === 'string' ? dataUrl : '');
};
var localReadAvatarFile = typeof resolvedReadAvatarFile === 'function' ? resolvedReadAvatarFile : function () {
  return Promise.reject(new Error('Avatar file reader unavailable'));
};
var localIsSafeImageUrl = typeof resolvedIsSafeImageUrl === 'function' ? resolvedIsSafeImageUrl : function () {
  return false;
};
var sanitizeContactValueHelper = typeof resolvedSanitizeContactValue === 'function' ? resolvedSanitizeContactValue : fallbackSanitizeContactValue;
var normalizeContactEntryHelper = typeof resolvedNormalizeContactEntry === 'function' ? resolvedNormalizeContactEntry : fallbackNormalizeContactEntry;
var sortContactsHelper = typeof resolvedSortContacts === 'function' ? resolvedSortContacts : function (list) {
  return Array.isArray(list) ? list.slice() : [];
};
var parseVCardEntries = typeof resolvedParseVCardEntries === 'function' ? resolvedParseVCardEntries : function () {
  return [];
};
var mergeImportedContactEntries = typeof resolvedMergeImportedContacts === 'function' ? resolvedMergeImportedContacts : function (options) {
  return {
    contacts: sortContactsHelper([].concat(_toConsumableArray((options === null || options === void 0 ? void 0 : options.existing) || []), _toConsumableArray((options === null || options === void 0 ? void 0 : options.imported) || []))),
    added: Array.isArray(options === null || options === void 0 ? void 0 : options.imported) ? options.imported.length : 0,
    updated: 0
  };
};
var localCreateCrewRowSync = typeof resolvedCreateCrewRowSync === 'function' ? resolvedCreateCrewRowSync : function () {
  var rowState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var contact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _objectSpread(_objectSpread({}, rowState), contact);
};
try {
  var appliedSchema = applyDeviceSchema(bundledSchema);
  if (appliedSchema) {
    deviceSchema = appliedSchema;
  }
} catch (requireError) {
  void requireError;
  if (!deviceSchema && cachedDeviceSchema) {
    var appliedCachedSchema = applyDeviceSchema(cachedDeviceSchema);
    if (appliedCachedSchema) {
      deviceSchema = appliedCachedSchema;
    }
  }
  if (typeof fetch === 'function') {
    fetch(DEVICE_SCHEMA_PATH).then(function (response) {
      if (!response || !response.ok) {
        throw new Error("Unexpected response when loading schema.json: ".concat(response ? response.status : 'no response'));
      }
      return response.json();
    }).then(function (candidate) {
      finalizeDeviceSchemaLoad(candidate);
    }).catch(function (error) {
      console.warn('Failed to fetch schema.json', error);
      loadDeviceSchemaFromCacheStorage().then(function (schemaFromCache) {
        if (isValidDeviceSchema(schemaFromCache)) {
          finalizeDeviceSchemaLoad(schemaFromCache);
        } else {
          finalizeDeviceSchemaLoad(deviceSchema);
        }
      }).catch(function (cacheError) {
        console.warn('Failed to load schema.json from cache storage', cacheError);
        finalizeDeviceSchemaLoad(deviceSchema);
      });
    });
  } else {
    finalizeDeviceSchemaLoad(deviceSchema);
  }
}
var LEGAL_LINKS = {
  de: {
    imprint: "legal/impressum.html",
    privacy: "legal/datenschutz.html"
  },
  en: {
    imprint: "legal/impressum-en.html",
    privacy: "legal/datenschutz-en.html"
  },
  es: {
    imprint: "legal/impressum-es.html",
    privacy: "legal/datenschutz-es.html"
  },
  fr: {
    imprint: "legal/impressum-fr.html",
    privacy: "legal/datenschutz-fr.html"
  },
  it: {
    imprint: "legal/impressum-it.html",
    privacy: "legal/datenschutz-it.html"
  }
};
function resolveAutoGearStorageKey(symbolName, fallbackValue) {
  var candidate = readGlobalAutoGearValue(symbolName);
  if (typeof candidate === 'string' && candidate) {
    return candidate;
  }
  return fallbackValue;
}
var AUTO_GEAR_RULES_KEY = resolveAutoGearStorageKey('AUTO_GEAR_RULES_STORAGE_KEY', 'cameraPowerPlanner_autoGearRules');
var AUTO_GEAR_ANY_MOTOR_TOKEN = '__any__';
if (typeof globalThis !== 'undefined') {
  globalThis.AUTO_GEAR_ANY_MOTOR_TOKEN = AUTO_GEAR_ANY_MOTOR_TOKEN;
}
var AUTO_GEAR_SEEDED_KEY = resolveAutoGearStorageKey('AUTO_GEAR_SEEDED_STORAGE_KEY', 'cameraPowerPlanner_autoGearSeeded');
var AUTO_GEAR_RETENTION_DEFAULT_FALLBACK = 36;
var AUTO_GEAR_RETENTION_MIN_FALLBACK = 1;
var AUTO_GEAR_RETENTION_MAX_FALLBACK = 50;
var AUTO_GEAR_BACKUP_RETENTION_MAX = 50;
function readGlobalAutoGearValue(propertyName) {
  var scopes = [CORE_PART1_RUNTIME_SCOPE && (typeof CORE_PART1_RUNTIME_SCOPE === "undefined" ? "undefined" : _typeof(CORE_PART1_RUNTIME_SCOPE)) === 'object' ? CORE_PART1_RUNTIME_SCOPE : null, CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE && ((typeof CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE === "undefined" ? "undefined" : _typeof(CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE)) === 'object' || typeof CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE === 'function') ? CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE : null, typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      var value = scope[propertyName];
      if (typeof value !== 'undefined') {
        return value;
      }
    } catch (globalLookupError) {
      void globalLookupError;
    }
  }
  return undefined;
}
function resolveAutoGearBackupRetentionMin() {
  var candidates = [];
  var declaredMinCandidate = readGlobalAutoGearValue('AUTO_GEAR_BACKUP_RETENTION_MIN');
  if (typeof declaredMinCandidate !== 'undefined') {
    candidates.push(declaredMinCandidate);
  }
  for (var index = 0; index < candidates.length; index += 1) {
    var numeric = Number(candidates[index]);
    if (!Number.isFinite(numeric)) {
      continue;
    }
    var rounded = Math.round(numeric);
    if (rounded >= AUTO_GEAR_RETENTION_MIN_FALLBACK) {
      return rounded;
    }
  }
  return AUTO_GEAR_RETENTION_MIN_FALLBACK;
}
function resolveAutoGearBackupRetentionDefault() {
  var minValue = resolveAutoGearBackupRetentionMin();
  var globalScope = typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : null;
  var existingMax = globalScope && typeof globalScope.AUTO_GEAR_BACKUP_RETENTION_MAX !== 'undefined' ? globalScope.AUTO_GEAR_BACKUP_RETENTION_MAX : undefined;
  var globalMaxCandidate = typeof existingMax !== 'undefined' ? existingMax : readGlobalAutoGearValue('AUTO_GEAR_BACKUP_RETENTION_MAX');
  var parsedMax = Number(globalMaxCandidate);
  var maxValue = Number.isFinite(parsedMax) && parsedMax >= minValue ? Math.min(Math.round(parsedMax), AUTO_GEAR_RETENTION_MAX_FALLBACK) : AUTO_GEAR_RETENTION_MAX_FALLBACK;
  var normalize = function normalize(value) {
    var numeric = Number(value);
    if (!Number.isFinite(numeric)) {
      return null;
    }
    var rounded = Math.round(numeric);
    if (rounded < minValue) {
      return minValue;
    }
    if (rounded > maxValue) {
      return maxValue;
    }
    return rounded;
  };
  var candidates = [];
  var existingDefault = globalScope && typeof globalScope.AUTO_GEAR_BACKUP_RETENTION_DEFAULT !== 'undefined' ? globalScope.AUTO_GEAR_BACKUP_RETENTION_DEFAULT : undefined;
  if (typeof existingDefault !== 'undefined') {
    candidates.push(existingDefault);
  }
  var globalCandidate = readGlobalAutoGearValue('AUTO_GEAR_BACKUP_RETENTION_DEFAULT');
  if (typeof globalCandidate !== 'undefined') {
    candidates.push(globalCandidate);
  }
  if (typeof getAutoGearBackupRetentionDefault === 'function') {
    try {
      candidates.push(getAutoGearBackupRetentionDefault());
    } catch (autoGearDefaultError) {
      void autoGearDefaultError;
    }
  }
  for (var index = 0; index < candidates.length; index += 1) {
    var normalized = normalize(candidates[index]);
    if (normalized !== null) {
      return normalized;
    }
  }
  var fallbackNormalized = normalize(AUTO_GEAR_RETENTION_DEFAULT_FALLBACK);
  return fallbackNormalized === null ? minValue : fallbackNormalized;
}
var localeSortCollator = null;
function localeSort(a, b) {
  var stringA = typeof a === 'string' ? a : a && typeof a.toString === 'function' ? a.toString() : '';
  var stringB = typeof b === 'string' ? b : b && typeof b.toString === 'function' ? b.toString() : '';
  if (!localeSortCollator) {
    try {
      localeSortCollator = typeof Intl !== 'undefined' && typeof Intl.Collator === 'function' ? new Intl.Collator(undefined, {
        sensitivity: 'base',
        numeric: false
      }) : false;
    } catch (collatorError) {
      localeSortCollator = false;
      void collatorError;
    }
  }
  if (localeSortCollator && typeof localeSortCollator.compare === 'function') {
    return localeSortCollator.compare(stringA, stringB);
  }
  try {
    return stringA.localeCompare(stringB, undefined, {
      sensitivity: 'base'
    });
  } catch (localeCompareError) {
    void localeCompareError;
  }
  if (stringA < stringB) return -1;
  if (stringA > stringB) return 1;
  return 0;
}
var AUTO_GEAR_BACKUPS_KEY = resolveAutoGearStorageKey('AUTO_GEAR_BACKUPS_STORAGE_KEY', 'cameraPowerPlanner_autoGearBackups');
var AUTO_GEAR_PRESETS_KEY = resolveAutoGearStorageKey('AUTO_GEAR_PRESETS_STORAGE_KEY', 'cameraPowerPlanner_autoGearPresets');
var AUTO_GEAR_ACTIVE_PRESET_KEY = resolveAutoGearStorageKey('AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY', 'cameraPowerPlanner_autoGearActivePreset');
var AUTO_GEAR_AUTO_PRESET_KEY = resolveAutoGearStorageKey('AUTO_GEAR_AUTO_PRESET_STORAGE_KEY', 'cameraPowerPlanner_autoGearAutoPreset');
var AUTO_GEAR_BACKUP_VISIBILITY_KEY = resolveAutoGearStorageKey('AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY', 'cameraPowerPlanner_autoGearShowBackups');
var AUTO_GEAR_BACKUP_RETENTION_KEY = resolveAutoGearStorageKey('AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY', 'cameraPowerPlanner_autoGearBackupRetention');
var AUTO_GEAR_MONITOR_DEFAULTS_KEY = resolveAutoGearStorageKey('AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY', 'cameraPowerPlanner_autoGearMonitorDefaults');
var AUTO_GEAR_BACKUP_INTERVAL_MS = 10 * 60 * 1000;
var AUTO_GEAR_BACKUP_RETENTION_MIN_VALUE = resolveAutoGearBackupRetentionMin();
var AUTO_GEAR_BACKUP_RETENTION_DEFAULT = resolveAutoGearBackupRetentionDefault();
var AUTO_GEAR_MULTI_SELECT_MIN_ROWS = 8;
var AUTO_GEAR_MULTI_SELECT_MAX_ROWS = 12;
var AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS = 1;
var AUTO_GEAR_CUSTOM_CATEGORY = '';
var GEAR_LIST_CATEGORIES = ['Camera', 'Camera Support', 'Media', 'Lens', 'Lens Support', 'Matte box + filter', 'LDS (FIZ)', 'Camera Batteries', 'Monitoring Batteries', 'Chargers', 'Monitoring', 'Monitoring support', 'Rigging', 'Power', 'Grip', 'Carts and Transportation', 'Miscellaneous', 'Consumables'];
var AUTO_GEAR_SELECTOR_TYPES = ['none', 'monitor', 'directorMonitor', 'tripodHeadBrand', 'tripodBowl', 'tripodTypes', 'tripodSpreader', 'fizHandUnit'];
var AUTO_GEAR_SELECTOR_TYPE_MAP = AUTO_GEAR_SELECTOR_TYPES.reduce(function (map, type) {
  map[type.toLowerCase()] = type;
  return map;
}, Object.create(null));
var AUTO_GEAR_SELECTOR_TYPE_SET = new Set(Object.keys(AUTO_GEAR_SELECTOR_TYPE_MAP));
var AUTO_GEAR_MONITOR_FALLBACKS = ['SmallHD Ultra 7', 'SmallHD Focus', 'SmallHD Cine 7'];
var AUTO_GEAR_TRIPOD_SELECTOR_TYPES = new Set(['tripodHeadBrand', 'tripodBowl', 'tripodTypes', 'tripodSpreader']);
var AUTO_GEAR_TRIPOD_FIELD_IDS = {
  tripodHeadBrand: 'tripodHeadBrand',
  tripodBowl: 'tripodBowl',
  tripodTypes: 'tripodTypes',
  tripodSpreader: 'tripodSpreader'
};
exposeCoreRuntimeConstant('AUTO_GEAR_SELECTOR_TYPE_MAP', AUTO_GEAR_SELECTOR_TYPE_MAP);
exposeCoreRuntimeConstant('AUTO_GEAR_SELECTOR_TYPE_SET', AUTO_GEAR_SELECTOR_TYPE_SET);
exposeCoreRuntimeConstant('AUTO_GEAR_TRIPOD_SELECTOR_TYPES', AUTO_GEAR_TRIPOD_SELECTOR_TYPES);
exposeCoreRuntimeConstant('AUTO_GEAR_TRIPOD_FIELD_IDS', AUTO_GEAR_TRIPOD_FIELD_IDS);
exposeCoreRuntimeConstant('AUTO_GEAR_CUSTOM_CATEGORY', AUTO_GEAR_CUSTOM_CATEGORY);
exposeCoreRuntimeConstant('GEAR_LIST_CATEGORIES', GEAR_LIST_CATEGORIES);
var AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUP_DATA = Object.freeze([{
  key: 'tilta-nucleus-m',
  label: 'Tilta Nucleus ecosystem (M / M II)',
  motors: Object.freeze(['Tilta Nucleus M', 'Tilta Nucleus M II']),
  options: Object.freeze(['Tilta Nucleus-M FIZ Hand Unit', 'Tilta Nucleus-M II FIZ Hand Unit', 'Tilta Nucleus Nano II Hand Controller']),
  defaultOption: 'Tilta Nucleus-M FIZ Hand Unit'
}, {
  key: 'tilta-nucleus-nano',
  label: 'Tilta Nucleus Nano ecosystem',
  motors: Object.freeze(['Tilta Nucleus Nano (Original)', 'Tilta Nucleus Nano II']),
  options: Object.freeze(['Tilta Nucleus Nano Hand Wheel Controller', 'Tilta Nucleus Nano II Hand Controller']),
  defaultOption: 'Tilta Nucleus Nano Hand Wheel Controller'
}, {
  key: 'arri-lbus',
  label: 'ARRI / cmotion LBUS ecosystem',
  motors: Object.freeze(['Arri Cforce Mini', 'Arri Cforce Plus', 'Arri CLM-3', 'Arri CLM-4 (K2.72114.0)', 'Arri CLM-5 (K2.0006361)', 'Arri cforce mini RF (KK.0040345)', 'Cmotion cPRO']),
  options: Object.freeze(['Arri Hi-5', 'Arri WCU-4', 'Arri SXU-1', 'cmotion cPRO hand unit']),
  defaultOption: 'Arri Hi-5'
}, {
  key: 'teradek-rt',
  label: 'Teradek RT ecosystem',
  motors: Object.freeze(['Teradek RT Motion FIZ (MOTR.S)']),
  options: Object.freeze(['Teradek RT CTRL.3']),
  defaultOption: 'Teradek RT CTRL.3'
}, {
  key: 'preston',
  label: 'Preston ecosystem',
  motors: Object.freeze(['Preston DM1X', 'Preston DM2', 'Preston DM2X', 'Preston DM-A', 'Preston DM-C']),
  options: Object.freeze(['Preston Hand Unit 4 (HU4)']),
  defaultOption: 'Preston Hand Unit 4 (HU4)'
}, {
  key: 'chrosziel',
  label: 'Chrosziel MagNum ecosystem',
  motors: Object.freeze(['Chrosziel CDM-100 Digital', 'Chrosziel CDM-M (Universal Zoom Servo Drive)']),
  options: Object.freeze(['Chrosziel MagNum Hand Unit (MN-100R)']),
  defaultOption: 'Chrosziel MagNum Hand Unit (MN-100R)'
}, {
  key: 'dji-focus',
  label: 'DJI Focus ecosystem',
  motors: Object.freeze(['DJI Focus (Original)']),
  options: Object.freeze(['DJI Focus Hand Unit']),
  defaultOption: 'DJI Focus Hand Unit'
}, {
  key: 'dji-focus-pro',
  label: 'DJI Focus Pro ecosystem',
  motors: Object.freeze(['DJI RS Focus (2022)', 'DJI Focus Pro Motor']),
  options: Object.freeze(['DJI RS Focus Wheel (2022)', 'DJI Focus Pro Hand Unit']),
  defaultOption: 'DJI Focus Pro Hand Unit'
}, {
  key: 'smallrig-magicfiz',
  label: 'SmallRig MagicFIZ ecosystem',
  motors: Object.freeze(['SmallRig Wireless Follow Focus']),
  options: Object.freeze(['SmallRig MagicFIZ Wireless Handgrip']),
  defaultOption: 'SmallRig MagicFIZ Wireless Handgrip'
}, {
  key: 'redrock-microremote',
  label: 'Redrock microRemote ecosystem',
  motors: Object.freeze(['Redrock MicroRemote Torque']),
  options: Object.freeze(['Redrock microRemote Hand Controller']),
  defaultOption: 'Redrock microRemote Hand Controller'
}]);
var AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS = function () {
  var groups = Object.create(null);
  AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUP_DATA.forEach(function (entry) {
    if (!entry || !entry.key || !Array.isArray(entry.options) || !entry.options.length) {
      return;
    }
    var groupKey = entry.key;
    var uniqueOptions = Array.from(new Set(entry.options.filter(Boolean)));
    if (!uniqueOptions.length) return;
    groups[groupKey] = Object.freeze({
      key: groupKey,
      label: entry.label || '',
      motors: entry.motors || [],
      options: Object.freeze(uniqueOptions),
      defaultOption: uniqueOptions.includes(entry.defaultOption) ? entry.defaultOption : uniqueOptions[0]
    });
  });
  return Object.freeze(groups);
}();
var AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP = function () {
  var map = Object.create(null);
  Object.values(AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS).forEach(function (group) {
    if (!group || !Array.isArray(group.motors)) return;
    group.motors.forEach(function (name) {
      var normalized = normalizeAutoGearTriggerValue(name);
      if (!normalized || Object.prototype.hasOwnProperty.call(map, normalized)) {
        return;
      }
      map[normalized] = group.key;
    });
  });
  return Object.freeze(map);
}();
if (typeof globalThis !== 'undefined') {
  globalThis.AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS = AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS;
  globalThis.AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP = AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP;
}
var autoGearRules = readAutoGearRulesFromStorage();
var baseAutoGearRulesState = autoGearRules.slice();
var projectScopedAutoGearRules = null;
var autoGearBackupRetention = readAutoGearBackupRetentionFromStorage();
var autoGearBackups = readAutoGearBackupsFromStorage(autoGearBackupRetention);
var autoGearPresets = readAutoGearPresetsFromStorage();
var activeAutoGearPresetId = readActiveAutoGearPresetIdFromStorage();
var autoGearAutoPresetIdState = readAutoGearAutoPresetIdFromStorage();
var autoGearBackupsVisible = readAutoGearBackupVisibilityFromStorage();
var autoGearMonitorDefaults = readAutoGearMonitorDefaultsFromStorage();
persistAutoGearBackupRetention(autoGearBackupRetention);
var autoGearBackupRetentionWarningText = '';
var autoGearEditorDraft = null;
var autoGearEditorActiveItem = null;
var autoGearDraftPendingWarnings = null;
var autoGearSearchQuery = '';
var autoGearSummaryFocus = 'all';
var autoGearSummaryLast = null;
var autoGearScenarioFilter = 'all';
function updateAutoGearItemButtonState(type) {
  var normalizedType = type === 'remove' ? 'remove' : 'add';
  var button = normalizedType === 'remove' ? autoGearRemoveItemButton : autoGearAddItemButton;
  if (!button) return;
  var langTexts = getLanguageTexts(currentLang);
  var fallbackTexts = getLanguageTexts(DEFAULT_LANGUAGE_SAFE);
  var isEditing = (autoGearEditorActiveItem === null || autoGearEditorActiveItem === void 0 ? void 0 : autoGearEditorActiveItem.listType) === normalizedType;
  var defaultKey = normalizedType === 'remove' ? 'autoGearRemoveItemButton' : 'autoGearAddItemButton';
  var defaultLabel = langTexts[defaultKey] || fallbackTexts[defaultKey] || button.textContent || '';
  var updateLabel = langTexts.autoGearUpdateItemButton || fallbackTexts.autoGearUpdateItemButton || defaultLabel;
  var label = isEditing ? updateLabel : defaultLabel;
  var glyph = isEditing ? ICON_GLYPHS.save : normalizedType === 'remove' ? ICON_GLYPHS.minus : ICON_GLYPHS.add;
  setButtonLabelWithIconBinding(button, label, glyph);
  button.setAttribute('data-help', label);
}
function getAutoGearBackupEntrySignature(entry) {
  if (!entry || _typeof(entry) !== 'object') return '';
  return stableStringify({
    rules: Array.isArray(entry.rules) ? entry.rules : [],
    monitorDefaults: normalizeAutoGearMonitorDefaults(entry.monitorDefaults),
    note: typeof entry.note === 'string' ? entry.note : ''
  });
}
function getAutoGearConfigurationSignature() {
  var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : baseAutoGearRulesState;
  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : autoGearMonitorDefaults;
  return stableStringify({
    rules: Array.isArray(rules) ? rules : [],
    monitorDefaults: normalizeAutoGearMonitorDefaults(defaults)
  });
}
function getAutoGearMonitorDefaultsSnapshot() {
  return normalizeAutoGearMonitorDefaults(autoGearMonitorDefaults);
}
var initialAutoGearRulesSignature = getAutoGearConfigurationSignature(autoGearRules, autoGearMonitorDefaults);
var autoGearRulesLastBackupSignature = autoGearBackups.length ? getAutoGearConfigurationSignature(autoGearBackups[0].rules, autoGearBackups[0].monitorDefaults) : initialAutoGearRulesSignature;
var autoGearRulesLastPersistedSignature = initialAutoGearRulesSignature;
var autoGearRulesDirtySinceBackup = autoGearRulesLastPersistedSignature !== autoGearRulesLastBackupSignature;
enqueueCoreBootTask(function () {
  callCoreFunctionIfAvailable('reconcileAutoGearAutoPresetState', [{
    persist: true,
    skipRender: true
  }], {
    defer: true
  });
  callCoreFunctionIfAvailable('alignActiveAutoGearPreset', [{
    skipRender: true
  }], {
    defer: true
  });
});
function assignAutoGearRules(rules) {
  autoGearRules = Array.isArray(rules) ? rules.map(normalizeAutoGearRule).filter(Boolean) : [];
  return autoGearRules;
}
function syncBaseAutoGearRulesState() {
  var signature = getAutoGearConfigurationSignature();
  autoGearRulesLastPersistedSignature = signature;
  autoGearRulesDirtySinceBackup = signature !== autoGearRulesLastBackupSignature;
}
function persistAutoGearRules() {
  if (typeof saveAutoGearRules !== 'undefined' && typeof saveAutoGearRules === 'function') {
    try {
      saveAutoGearRules(autoGearRules);
      return;
    } catch (error) {
      console.warn('Failed to save automatic gear rules', error);
    }
  }
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(AUTO_GEAR_RULES_KEY, JSON.stringify(autoGearRules));
  } catch (error) {
    console.warn('Failed to save automatic gear rules', error);
  }
}
function getAutoGearMonitorDefault(key) {
  if (!Object.prototype.hasOwnProperty.call(AUTO_GEAR_MONITOR_DEFAULT_TYPES, key)) {
    return '';
  }
  return normalizeAutoGearSelectorDefault(AUTO_GEAR_MONITOR_DEFAULT_TYPES[key], autoGearMonitorDefaults[key]);
}
function getAutoGearMonitorDefaults() {
  return _objectSpread({}, autoGearMonitorDefaults);
}
function setAutoGearMonitorDefaults(defaults) {
  var _ref9 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref9$skipRender = _ref9.skipRender,
    skipRender = _ref9$skipRender === void 0 ? false : _ref9$skipRender,
    _ref9$skipRefresh = _ref9.skipRefresh,
    skipRefresh = _ref9$skipRefresh === void 0 ? false : _ref9$skipRefresh;
  var normalized = normalizeAutoGearMonitorDefaults(defaults);
  var changed = false;
  Object.keys(AUTO_GEAR_MONITOR_DEFAULT_TYPES).forEach(function (key) {
    var existing = autoGearMonitorDefaults[key] || '';
    var next = normalized[key] || '';
    if (existing !== next) {
      changed = true;
    }
  });
  if (!changed) {
    if (!skipRender) {
      callCoreFunctionIfAvailable('updateAutoGearMonitorDefaultOptions', [], {
        defer: true
      });
      callCoreFunctionIfAvailable('renderAutoGearMonitorDefaultsControls', [], {
        defer: true
      });
    }
    return autoGearMonitorDefaults;
  }
  autoGearMonitorDefaults = persistAutoGearMonitorDefaults(normalized);
  syncBaseAutoGearRulesState();
  if (!skipRender) {
    callCoreFunctionIfAvailable('updateAutoGearMonitorDefaultOptions', [], {
      defer: true
    });
    callCoreFunctionIfAvailable('renderAutoGearMonitorDefaultsControls', [], {
      defer: true
    });
  }
  if (!skipRefresh && typeof refreshGearListIfVisible === 'function') {
    refreshGearListIfVisible();
  }
  return autoGearMonitorDefaults;
}
function setAutoGearMonitorDefault(key, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!Object.prototype.hasOwnProperty.call(AUTO_GEAR_MONITOR_DEFAULT_TYPES, key)) {
    return getAutoGearMonitorDefault(key);
  }
  var current = autoGearMonitorDefaults[key] || '';
  var normalizedValue = normalizeAutoGearSelectorDefault(AUTO_GEAR_MONITOR_DEFAULT_TYPES[key], value);
  if (current === normalizedValue) {
    if (!options.skipRender) {
      callCoreFunctionIfAvailable('updateAutoGearMonitorDefaultOptions', [], {
        defer: true
      });
      callCoreFunctionIfAvailable('renderAutoGearMonitorDefaultsControls', [], {
        defer: true
      });
    }
    return normalizedValue;
  }
  var nextDefaults = _objectSpread(_objectSpread({}, autoGearMonitorDefaults), {}, _defineProperty({}, key, normalizedValue));
  setAutoGearMonitorDefaults(nextDefaults, options);
  return normalizedValue;
}
function setAutoGearRules(rules) {
  var normalized = assignAutoGearRules(rules);
  baseAutoGearRulesState = normalized.slice();
  projectScopedAutoGearRules = null;
  persistAutoGearRules();
  syncBaseAutoGearRulesState();
  callCoreFunctionIfAvailable('alignActiveAutoGearPreset', [{
    skipRender: true
  }], {
    defer: true
  });
  callCoreFunctionIfAvailable('syncAutoGearAutoPreset', [normalized], {
    defer: true
  });
  callCoreFunctionIfAvailable('renderAutoGearPresetsControls', [], {
    defer: true
  });
}
function getAutoGearRules() {
  return autoGearRules.slice();
}
function getEnabledAutoGearRules() {
  return autoGearRules.filter(function (rule) {
    return !rule || rule.enabled !== false;
  });
}
function syncAutoGearRulesFromStorage(rules) {
  if (Array.isArray(rules)) {
    setAutoGearRules(rules);
  } else {
    baseAutoGearRulesState = readAutoGearRulesFromStorage();
    projectScopedAutoGearRules = null;
    assignAutoGearRules(baseAutoGearRulesState);
    syncBaseAutoGearRulesState();
  }
  autoGearBackupRetention = readAutoGearBackupRetentionFromStorage();
  autoGearBackups = readAutoGearBackupsFromStorage(autoGearBackupRetention);
  autoGearPresets = readAutoGearPresetsFromStorage();
  activeAutoGearPresetId = readActiveAutoGearPresetIdFromStorage();
  autoGearAutoPresetIdState = readAutoGearAutoPresetIdFromStorage();
  autoGearBackupsVisible = readAutoGearBackupVisibilityFromStorage();
  autoGearMonitorDefaults = readAutoGearMonitorDefaultsFromStorage();
  autoGearRulesLastBackupSignature = autoGearBackups.length ? getAutoGearConfigurationSignature(autoGearBackups[0].rules, autoGearBackups[0].monitorDefaults) : getAutoGearConfigurationSignature();
  autoGearRulesLastPersistedSignature = getAutoGearConfigurationSignature();
  autoGearRulesDirtySinceBackup = autoGearRulesLastPersistedSignature !== autoGearRulesLastBackupSignature;
  callCoreFunctionIfAvailable('reconcileAutoGearAutoPresetState', [{
    persist: true,
    skipRender: true
  }], {
    defer: true
  });
  callCoreFunctionIfAvailable('syncAutoGearAutoPreset', [baseAutoGearRulesState], {
    defer: true
  });
  callCoreFunctionIfAvailable('alignActiveAutoGearPreset', [{
    skipRender: true
  }], {
    defer: true
  });
  callCoreFunctionIfAvailable('renderAutoGearBackupControls', [], {
    defer: true
  });
  callCoreFunctionIfAvailable('renderAutoGearPresetsControls', [], {
    defer: true
  });
  callCoreFunctionIfAvailable('closeAutoGearEditor', [], {
    defer: true
  });
  callCoreFunctionIfAvailable('renderAutoGearRulesList', [], {
    defer: true
  });
  callCoreFunctionIfAvailable('updateAutoGearCatalogOptions', [], {
    defer: true
  });
  callCoreFunctionIfAvailable('renderAutoGearMonitorDefaultsControls', [], {
    defer: true
  });
}
function useProjectAutoGearRules(rules) {
  if (Array.isArray(rules) && rules.length) {
    projectScopedAutoGearRules = assignAutoGearRules(rules).slice();
  } else {
    projectScopedAutoGearRules = null;
    assignAutoGearRules(baseAutoGearRulesState);
  }
}
function clearProjectAutoGearRules() {
  if (!projectScopedAutoGearRules || !projectScopedAutoGearRules.length) {
    projectScopedAutoGearRules = null;
    assignAutoGearRules(baseAutoGearRulesState);
    return;
  }
  projectScopedAutoGearRules = null;
  assignAutoGearRules(baseAutoGearRulesState);
}
function getProjectScopedAutoGearRules() {
  return projectScopedAutoGearRules ? projectScopedAutoGearRules.slice() : null;
}
function usingProjectAutoGearRules() {
  return Array.isArray(projectScopedAutoGearRules) && projectScopedAutoGearRules.length > 0;
}
function getBaseAutoGearRules() {
  return baseAutoGearRulesState.slice();
}
function autoGearRuleSignature(rule) {
  var snapshot = snapshotAutoGearRuleForFingerprint(rule);
  if (!snapshot) return '';
  return stableStringify(snapshot);
}
function mergeAutoGearRules(existing, incoming) {
  var normalizedExisting = Array.isArray(existing) ? existing.map(normalizeAutoGearRule).filter(Boolean) : [];
  var seen = new Set(normalizedExisting.map(autoGearRuleSignature));
  (Array.isArray(incoming) ? incoming : []).forEach(function (rule) {
    var normalized = normalizeAutoGearRule(rule);
    if (!normalized) return;
    var signature = autoGearRuleSignature(normalized);
    if (seen.has(signature)) return;
    normalizedExisting.push(normalized);
    seen.add(signature);
  });
  return normalizedExisting;
}
function looksLikeGearName(name) {
  return typeof name === 'string' && name !== 'None' && (/[A-Z]/.test(name) || /\d/.test(name) || name.includes(' '));
}
function hasSeededAutoGearDefaults() {
  if (typeof loadAutoGearSeedFlag !== 'undefined' && typeof loadAutoGearSeedFlag === 'function') {
    try {
      return !!loadAutoGearSeedFlag();
    } catch (error) {
      console.warn('Failed to read automatic gear seed flag', error);
      return false;
    }
  }
  if (typeof localStorage === 'undefined') return false;
  try {
    return localStorage.getItem(AUTO_GEAR_SEEDED_KEY) === '1';
  } catch (error) {
    console.warn('Failed to read automatic gear seed flag', error);
    return false;
  }
}
function markAutoGearDefaultsSeeded() {
  if (typeof saveAutoGearSeedFlag !== 'undefined' && typeof saveAutoGearSeedFlag === 'function') {
    try {
      saveAutoGearSeedFlag(true);
      return;
    } catch (error) {
      console.warn('Failed to persist automatic gear seed flag', error);
    }
  }
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(AUTO_GEAR_SEEDED_KEY, '1');
  } catch (error) {
    console.warn('Failed to persist automatic gear seed flag', error);
  }
}
function clearAutoGearDefaultsSeeded() {
  if (typeof saveAutoGearSeedFlag !== 'undefined' && typeof saveAutoGearSeedFlag === 'function') {
    try {
      saveAutoGearSeedFlag(false);
      return;
    } catch (error) {
      console.warn('Failed to clear automatic gear seed flag', error);
    }
  }
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(AUTO_GEAR_SEEDED_KEY);
  } catch (error) {
    console.warn('Failed to clear automatic gear seed flag', error);
  }
}
function parseGearTableForAutoRules(html) {
  if (!html || typeof DOMParser !== 'function') return null;
  var doc;
  try {
    doc = new DOMParser().parseFromString(html, 'text/html');
  } catch (error) {
    console.warn('Failed to parse gear table for automatic rule seeding', error);
    return null;
  }
  var table = doc.querySelector('.gear-table');
  if (!table) return null;
  var categoryMaps = new Map();
  table.querySelectorAll('tbody.category-group').forEach(function (group) {
    var header = group.querySelector('.category-row td');
    if (!header) return;
    var category = header.textContent ? header.textContent.trim() : '';
    if (!category) return;
    var items = categoryMaps.get(category) || new Map();
    group.querySelectorAll('.gear-item').forEach(function (span) {
      var name = span.getAttribute('data-gear-name');
      if (!looksLikeGearName(name)) return;
      var text = span.textContent ? span.textContent.trim() : '';
      var match = text.match(/^(\d+)x\s+/);
      var quantity = match ? parseInt(match[1], 10) : 1;
      if (!Number.isFinite(quantity) || quantity <= 0) return;
      items.set(name, (items.get(name) || 0) + quantity);
    });
    if (items.size) categoryMaps.set(category, items);
  });
  return categoryMaps;
}
function diffGearTableMaps(baseMap, variantMap) {
  if (!baseMap || !variantMap) return {
    add: [],
    remove: []
  };
  var add = [];
  var remove = [];
  var categories = new Set([].concat(_toConsumableArray(baseMap.keys()), _toConsumableArray(variantMap.keys())));
  categories.forEach(function (category) {
    var baseItems = baseMap.get(category) || new Map();
    var variantItems = variantMap.get(category) || new Map();
    var names = new Set([].concat(_toConsumableArray(baseItems.keys()), _toConsumableArray(variantItems.keys())));
    names.forEach(function (name) {
      var baseQty = baseItems.get(name) || 0;
      var variantQty = variantItems.get(name) || 0;
      if (variantQty > baseQty) {
        add.push({
          name: name,
          category: category,
          quantity: variantQty - baseQty
        });
      } else if (variantQty < baseQty) {
        remove.push({
          name: name,
          category: category,
          quantity: baseQty - variantQty
        });
      }
    });
  });
  return {
    add: add,
    remove: remove
  };
}
function collectAutoGearCatalogNames() {
  var names = new Set();
  var addName = function addName(name) {
    if (looksLikeGearName(name)) names.add(name);
  };
  var seen = typeof WeakSet === 'function' ? new WeakSet() : null;
  var _visit = function visit(obj) {
    if (!obj || _typeof(obj) !== 'object') return;
    if (seen) {
      if (seen.has(obj)) return;
      seen.add(obj);
    }
    Object.entries(obj).forEach(function (_ref0) {
      var _ref1 = _slicedToArray(_ref0, 2),
        key = _ref1[0],
        value = _ref1[1];
      if (!value || _typeof(value) !== 'object' || Array.isArray(value)) return;
      addName(key);
      _visit(value);
    });
  };
  if ((typeof devices === "undefined" ? "undefined" : _typeof(devices)) === 'object' && devices) {
    _visit(devices);
  }
  getAutoGearOwnGearItems().forEach(function (item) {
    if (item && typeof item.name === 'string') addName(item.name);
  });
  autoGearRules.forEach(function (rule) {
    [].concat(_toConsumableArray(rule.add), _toConsumableArray(rule.remove)).forEach(function (item) {
      return addName(item.name);
    });
  });
  return Array.from(names).sort(function (a, b) {
    return a.localeCompare(b, undefined, {
      sensitivity: 'base'
    });
  });
}
function normalizeAutoGearMonitorCatalogMode(value) {
  var normalized = normalizeAutoGearSelectorType(value);
  if (normalized === 'monitor' || normalized === 'directorMonitor') return normalized;
  if (AUTO_GEAR_TRIPOD_SELECTOR_TYPES.has(normalized)) return normalized;
  return 'none';
}
var autoGearMonitorCatalogMode = 'none';
var autoGearMonitorDefaultGroups = [];
var autoGearAddMonitorFieldGroup = null;
var autoGearRemoveMonitorFieldGroup = null;
function collectAutoGearMonitorNames() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : autoGearMonitorCatalogMode;
  var mode = normalizeAutoGearMonitorCatalogMode(type);
  if (mode === 'none') return [];
  var includeMonitor = mode === 'monitor';
  var includeDirectorMonitor = mode === 'directorMonitor';
  var acceptedTypes = new Set();
  if (includeMonitor) acceptedTypes.add('monitor');
  if (includeDirectorMonitor) acceptedTypes.add('directorMonitor');
  var names = new Set();
  var addName = function addName(name) {
    if (typeof name === 'string') {
      var trimmed = name.trim();
      if (trimmed) names.add(trimmed);
    }
  };
  if (includeMonitor) {
    var monitorDb = devices && devices.monitors ? devices.monitors : null;
    if (monitorDb && _typeof(monitorDb) === 'object') {
      Object.keys(monitorDb).forEach(addName);
    }
  }
  if (includeDirectorMonitor) {
    var directorDb = devices && devices.directorMonitors ? devices.directorMonitors : null;
    if (directorDb && _typeof(directorDb) === 'object') {
      Object.keys(directorDb).filter(function (name) {
        return name && name !== 'None';
      }).forEach(addName);
    }
  }
  autoGearRules.forEach(function (rule) {
    var processItem = function processItem(item) {
      if (!item || _typeof(item) !== 'object') return;
      var selectorDefault = item.selectorDefault;
      if (!selectorDefault) return;
      var selectorType = normalizeAutoGearSelectorType(item.selectorType);
      if (acceptedTypes.has(selectorType)) addName(selectorDefault);
    };
    (rule.add || []).forEach(processItem);
    (rule.remove || []).forEach(processItem);
  });
  AUTO_GEAR_MONITOR_FALLBACKS.forEach(addName);
  return Array.from(names).sort(localeSort);
}
function collectAutoGearSelectorValuesFromRules(type) {
  var normalized = normalizeAutoGearSelectorType(type);
  if (normalized === 'none') return [];
  var values = new Set();
  var addValue = function addValue(value) {
    if (typeof value !== 'string') return;
    var trimmed = value.trim();
    if (!trimmed) return;
    values.add(trimmed);
  };
  autoGearRules.forEach(function (rule) {
    var processItem = function processItem(item) {
      if (!item || _typeof(item) !== 'object') return;
      if (normalizeAutoGearSelectorType(item.selectorType) !== normalized) return;
      addValue(item.selectorDefault);
    };
    (rule.add || []).forEach(processItem);
    (rule.remove || []).forEach(processItem);
  });
  return Array.from(values);
}
function collectAutoGearTripodNames(type) {
  if (!AUTO_GEAR_TRIPOD_SELECTOR_TYPES.has(type)) return [];
  var baseOptions = collectTripodPreferenceOptions(type);
  var seen = new Set();
  var results = [];
  baseOptions.forEach(function (option) {
    if (!option || !option.value) return;
    var key = option.value.trim().toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    results.push({
      value: option.value.trim(),
      label: option.label || option.value.trim()
    });
  });
  var extras = collectAutoGearSelectorValuesFromRules(type).map(function (value) {
    return value.trim();
  }).filter(Boolean).sort(localeSort);
  extras.forEach(function (value) {
    var key = value.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    results.push({
      value: value,
      label: value
    });
  });
  return results;
}
function collectAutoGearSelectorDefaultEntries(type) {
  var mode = normalizeAutoGearMonitorCatalogMode(type);
  if (mode === 'none') return [];
  if (mode === 'monitor' || mode === 'directorMonitor') {
    return collectAutoGearMonitorNames(mode).map(function (name) {
      return {
        value: name,
        label: formatAutoGearSelectorValue(mode, name)
      };
    });
  }
  if (AUTO_GEAR_TRIPOD_SELECTOR_TYPES.has(mode)) {
    return collectAutoGearTripodNames(mode);
  }
  return [];
}
function updateAutoGearMonitorCatalogOptions() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : autoGearMonitorCatalogMode;
  var targetElements = arguments.length > 1 ? arguments[1] : undefined;
  autoGearMonitorCatalogMode = normalizeAutoGearMonitorCatalogMode(type);
  var targets = function () {
    if (Array.isArray(targetElements)) {
      return targetElements.filter(Boolean);
    }
    if (targetElements) return [targetElements];
    return autoGearMonitorDefaultGroups.map(function (group) {
      return group.selectorDefaultInput;
    }).filter(Boolean);
  }();
  targets.forEach(function (select) {
    var relatedGroup = autoGearMonitorDefaultGroups.find(function (group) {
      return group.selectorDefaultInput === select;
    });
    var selectorType = relatedGroup !== null && relatedGroup !== void 0 && relatedGroup.selectorTypeSelect ? relatedGroup.selectorTypeSelect.value : autoGearMonitorCatalogMode;
    var mode = normalizeAutoGearMonitorCatalogMode(selectorType);
    var entries = mode === 'none' ? [] : collectAutoGearSelectorDefaultEntries(mode);
    var previousValue = select.value || '';
    var preferredValue = typeof select.dataset.autoGearPreferredDefault === 'string' ? select.dataset.autoGearPreferredDefault : '';
    if (Object.prototype.hasOwnProperty.call(select.dataset, 'autoGearPreferredDefault')) {
      delete select.dataset.autoGearPreferredDefault;
    }
    var placeholder = getAutoGearSelectorDefaultPlaceholder();
    select.innerHTML = '';
    var placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = placeholder;
    select.appendChild(placeholderOption);
    var added = new Set(['']);
    var addOption = function addOption(value, label) {
      var trimmedValue = typeof value === 'string' ? value.trim() : '';
      if (!trimmedValue) return;
      var key = trimmedValue.toLowerCase();
      if (added.has(key)) return;
      var option = document.createElement('option');
      option.value = trimmedValue;
      option.textContent = label || formatAutoGearSelectorValue(mode, trimmedValue);
      select.appendChild(option);
      added.add(key);
    };
    entries.forEach(function (entry) {
      if (entry && _typeof(entry) === 'object') {
        addOption(entry.value, entry.label);
      } else {
        addOption(entry);
      }
    });
    var desiredValue = preferredValue || previousValue;
    var desiredKey = desiredValue ? desiredValue.trim().toLowerCase() : '';
    var previousKey = previousValue ? previousValue.trim().toLowerCase() : '';
    if (desiredValue && !added.has(desiredKey)) {
      addOption(desiredValue);
    } else if (!desiredValue && previousValue && !added.has(previousKey)) {
      addOption(previousValue);
    }
    if (desiredValue && added.has(desiredKey)) {
      select.value = desiredValue;
    } else if (previousValue && added.has(previousKey)) {
      select.value = previousValue;
    } else {
      select.value = '';
    }
    var enableSelection = mode !== 'none' && select.options.length > 1;
    select.disabled = !enableSelection;
    var scrollHint = getAutoGearSelectorScrollHint();
    if (enableSelection && entries.length > 10) {
      select.setAttribute('title', scrollHint);
      select.setAttribute('data-help', scrollHint);
    } else {
      select.removeAttribute('title');
      select.removeAttribute('data-help');
    }
  });
}
var getCssVariableValue = function getCssVariableValue(name) {
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  if (typeof document === 'undefined') return fallback;
  var root = document.documentElement;
  if (!root) return fallback;
  var computed = typeof window !== 'undefined' && typeof window.getComputedStyle === 'function' ? window.getComputedStyle(root).getPropertyValue(name).trim() : '';
  if (computed) return computed;
  var inline = root.style.getPropertyValue(name).trim();
  return inline || fallback;
};
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    var offlineModule = typeof globalThis !== 'undefined' && globalThis && globalThis.cineOffline || typeof window !== 'undefined' && window && window.cineOffline || null;
    if (offlineModule && typeof offlineModule.registerServiceWorker === 'function') {
      offlineModule.registerServiceWorker('service-worker.js', {
        immediate: true,
        window: window,
        navigator: navigator
      });
      return;
    }
    try {
      navigator.serviceWorker.register('service-worker.js');
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Service worker registration failed via fallback path.', error);
      }
    }
  });
}
function getElementHeight(element) {
  if (!element) return 0;
  var rect = typeof element.getBoundingClientRect === 'function' ? element.getBoundingClientRect() : null;
  if (rect && typeof rect.height === 'number' && rect.height > 0) {
    return rect.height;
  }
  return element.offsetHeight || 0;
}
function setInstallBannerOffset(offset) {
  if (typeof document === 'undefined') return;
  var root = document.documentElement;
  if (!root) return;
  if (offset > 0) {
    root.style.setProperty('--install-banner-offset', "".concat(Math.ceil(offset), "px"));
  } else {
    root.style.removeProperty('--install-banner-offset');
  }
}
var pendingInstallBannerPositionUpdate = false;
var LOCAL_FORCE_RELOAD_OFFLINE_NOTICE_FALLBACK = 'Force reload requires an internet connection. Try again once you are back online.';
function scheduleInstallBannerPositionUpdate() {
  if (pendingInstallBannerPositionUpdate) return;
  if (typeof window === 'undefined') return;
  var scheduler = typeof window.requestAnimationFrame === 'function' && window.requestAnimationFrame.bind(window) || typeof window.setTimeout === 'function' && function (callback) {
    return window.setTimeout(callback, 0);
  };
  if (!scheduler) return;
  pendingInstallBannerPositionUpdate = true;
  scheduler(function () {
    pendingInstallBannerPositionUpdate = false;
    updateInstallBannerPosition();
  });
}
function updateInstallBannerPosition() {
  if (typeof document === 'undefined') return;
  var installBanner = document.getElementById('installPromptBanner');
  if (!installBanner) {
    setInstallBannerOffset(0);
    return;
  }
  var offlineIndicator = document.getElementById('offlineIndicator');
  var offlineVisible = Boolean(offlineIndicator && !offlineIndicator.hasAttribute('hidden'));
  var offlineHeight = offlineVisible ? getElementHeight(offlineIndicator) : 0;
  if (offlineHeight > 0) {
    installBanner.style.top = "".concat(offlineHeight, "px");
  } else {
    installBanner.style.removeProperty('top');
  }
  var bannerVisible = !installBanner.hasAttribute('hidden');
  var bannerHeight = bannerVisible ? getElementHeight(installBanner) : 0;
  var totalOffset = offlineHeight + bannerHeight;
  setInstallBannerOffset(totalOffset);
  if (bannerVisible && !bannerHeight) {
    scheduleInstallBannerPositionUpdate();
  }
}
function setupOfflineIndicator() {
  if (typeof document === 'undefined' || typeof document.getElementById !== 'function' || typeof navigator === 'undefined') {
    return;
  }
  var offlineIndicator = document.getElementById('offlineIndicator');
  if (!offlineIndicator) return;
  var reloadButton = document.getElementById('reloadButton');
  var dataset = offlineIndicator.dataset || {};
  var currentLabel = typeof offlineIndicator.textContent === 'string' && offlineIndicator.textContent.trim() ? offlineIndicator.textContent.trim() : 'Offline';
  if (offlineIndicator.dataset) {
    if (!dataset.baseLabel || !dataset.baseLabel.trim()) {
      offlineIndicator.dataset.baseLabel = currentLabel;
    }
    var currentHelp = typeof offlineIndicator.getAttribute === 'function' ? offlineIndicator.getAttribute('data-help') : null;
    if (!offlineIndicator.dataset.baseHelp || !offlineIndicator.dataset.baseHelp.trim()) {
      if (typeof currentHelp === 'string' && currentHelp.trim()) {
        offlineIndicator.dataset.baseHelp = currentHelp.trim();
      } else {
        offlineIndicator.dataset.baseHelp = offlineIndicator.dataset.baseLabel || currentLabel;
      }
    }
    if (!offlineIndicator.dataset.forceReloadNotice || !offlineIndicator.dataset.forceReloadNotice.trim()) {
      offlineIndicator.dataset.forceReloadNotice = LOCAL_FORCE_RELOAD_OFFLINE_NOTICE_FALLBACK;
    }
    if (!offlineIndicator.dataset.degradedLabel || !offlineIndicator.dataset.degradedLabel.trim()) {
      offlineIndicator.dataset.degradedLabel = offlineIndicator.dataset.forceReloadNotice || LOCAL_FORCE_RELOAD_OFFLINE_NOTICE_FALLBACK;
    }
    if (!offlineIndicator.dataset.degradedHelp || !offlineIndicator.dataset.degradedHelp.trim()) {
      offlineIndicator.dataset.degradedHelp = offlineIndicator.dataset.baseHelp || currentLabel;
    }
    if (!offlineIndicator.dataset.reasonCacheFallback || !offlineIndicator.dataset.reasonCacheFallback.trim()) {
      offlineIndicator.dataset.reasonCacheFallback = offlineIndicator.dataset.forceReloadNotice || LOCAL_FORCE_RELOAD_OFFLINE_NOTICE_FALLBACK;
    }
    if (!offlineIndicator.dataset.reasonGetFailed || !offlineIndicator.dataset.reasonGetFailed.trim()) {
      offlineIndicator.dataset.reasonGetFailed = offlineIndicator.dataset.reasonCacheFallback;
    }
    if (!offlineIndicator.dataset.reasonTimeout || !offlineIndicator.dataset.reasonTimeout.trim()) {
      offlineIndicator.dataset.reasonTimeout = offlineIndicator.dataset.reasonCacheFallback;
    }
    if (!offlineIndicator.dataset.reasonUnreachable || !offlineIndicator.dataset.reasonUnreachable.trim()) {
      offlineIndicator.dataset.reasonUnreachable = offlineIndicator.dataset.reasonCacheFallback;
    }
    if (!offlineIndicator.dataset.reasonReloadBlocked || !offlineIndicator.dataset.reasonReloadBlocked.trim()) {
      offlineIndicator.dataset.reasonReloadBlocked = offlineIndicator.dataset.forceReloadNotice || LOCAL_FORCE_RELOAD_OFFLINE_NOTICE_FALLBACK;
    }
    if (!offlineIndicator.dataset.reasonUnknown || !offlineIndicator.dataset.reasonUnknown.trim()) {
      offlineIndicator.dataset.reasonUnknown = offlineIndicator.dataset.degradedHelp || currentLabel;
    }
  }
  var CONNECTIVITY_STATUS_MESSAGE_TYPE = 'cine-sw:connectivity-status';
  var SERVICE_WORKER_LOG_CHANNEL = 'cine-sw-logs';
  var lastConnectivityState = null;
  var connectivityChannel = null;
  var connectivityChannelFailed = false;
  var unsubscribeConnectivity = null;
  var resolveOfflineNotice = function resolveOfflineNotice() {
    var _offlineIndicator$dat, _reloadButton$dataset;
    var indicatorNotice = (_offlineIndicator$dat = offlineIndicator.dataset) === null || _offlineIndicator$dat === void 0 ? void 0 : _offlineIndicator$dat.forceReloadNotice;
    if (typeof indicatorNotice === 'string' && indicatorNotice.trim()) {
      return indicatorNotice.trim();
    }
    var buttonNotice = reloadButton === null || reloadButton === void 0 || (_reloadButton$dataset = reloadButton.dataset) === null || _reloadButton$dataset === void 0 ? void 0 : _reloadButton$dataset.offlineNotice;
    if (typeof buttonNotice === 'string' && buttonNotice.trim()) {
      return buttonNotice.trim();
    }
    return LOCAL_FORCE_RELOAD_OFFLINE_NOTICE_FALLBACK;
  };
  var getNavigatorOnline = function getNavigatorOnline() {
    return typeof navigator.onLine === 'boolean' ? navigator.onLine !== false : true;
  };
  var getBaseLabel = function getBaseLabel() {
    var _offlineIndicator$dat2;
    return (_offlineIndicator$dat2 = offlineIndicator.dataset) !== null && _offlineIndicator$dat2 !== void 0 && _offlineIndicator$dat2.baseLabel && offlineIndicator.dataset.baseLabel.trim() ? offlineIndicator.dataset.baseLabel.trim() : currentLabel;
  };
  var getBaseHelp = function getBaseHelp() {
    var _offlineIndicator$dat3;
    return (_offlineIndicator$dat3 = offlineIndicator.dataset) !== null && _offlineIndicator$dat3 !== void 0 && _offlineIndicator$dat3.baseHelp && offlineIndicator.dataset.baseHelp.trim() ? offlineIndicator.dataset.baseHelp.trim() : getBaseLabel();
  };
  var getDegradedLabel = function getDegradedLabel() {
    var _offlineIndicator$dat4;
    return (_offlineIndicator$dat4 = offlineIndicator.dataset) !== null && _offlineIndicator$dat4 !== void 0 && _offlineIndicator$dat4.degradedLabel && offlineIndicator.dataset.degradedLabel.trim() ? offlineIndicator.dataset.degradedLabel.trim() : resolveOfflineNotice();
  };
  var getDegradedHelp = function getDegradedHelp() {
    var _offlineIndicator$dat5;
    return (_offlineIndicator$dat5 = offlineIndicator.dataset) !== null && _offlineIndicator$dat5 !== void 0 && _offlineIndicator$dat5.degradedHelp && offlineIndicator.dataset.degradedHelp.trim() ? offlineIndicator.dataset.degradedHelp.trim() : getDegradedLabel();
  };
  var CONNECTIVITY_REASON_KEYS = {
    'cache-fallback': 'reasonCacheFallback',
    'get-failed': 'reasonGetFailed',
    timeout: 'reasonTimeout',
    unreachable: 'reasonUnreachable',
    'reload-blocked': 'reasonReloadBlocked',
    offline: 'forceReloadNotice'
  };
  var resolveReasonText = function resolveReasonText(reason) {
    var _offlineIndicator$dat7;
    if (!reason) {
      var _offlineIndicator$dat6;
      var fallback = (_offlineIndicator$dat6 = offlineIndicator.dataset) === null || _offlineIndicator$dat6 === void 0 ? void 0 : _offlineIndicator$dat6.reasonUnknown;
      return typeof fallback === 'string' && fallback.trim() ? fallback.trim() : '';
    }
    if (reason === 'navigator-offline') {
      return resolveOfflineNotice();
    }
    var key = CONNECTIVITY_REASON_KEYS[reason] || 'reasonUnknown';
    var value = (_offlineIndicator$dat7 = offlineIndicator.dataset) === null || _offlineIndicator$dat7 === void 0 ? void 0 : _offlineIndicator$dat7[key];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
    if (key !== 'reasonUnknown') {
      var _offlineIndicator$dat8;
      var unknown = (_offlineIndicator$dat8 = offlineIndicator.dataset) === null || _offlineIndicator$dat8 === void 0 ? void 0 : _offlineIndicator$dat8.reasonUnknown;
      if (typeof unknown === 'string' && unknown.trim()) {
        return unknown.trim();
      }
    }
    return '';
  };
  var _describeConnectivityDetail = function describeConnectivityDetail(detail) {
    if (!detail) {
      return '';
    }
    if (typeof detail === 'string') {
      return detail.trim();
    }
    if (_typeof(detail) !== 'object') {
      return '';
    }
    var parts = [];
    if (typeof detail.status === 'number' && Number.isFinite(detail.status)) {
      parts.push("HTTP ".concat(detail.status));
    }
    if (typeof detail.statusText === 'string' && detail.statusText.trim()) {
      parts.push(detail.statusText.trim());
    }
    if (typeof detail.message === 'string' && detail.message.trim()) {
      parts.push(detail.message.trim());
    }
    if (typeof detail.error === 'string' && detail.error.trim()) {
      parts.push(detail.error.trim());
    }
    if (!parts.length && detail.error && _typeof(detail.error) === 'object') {
      var nested = _describeConnectivityDetail(detail.error);
      if (nested) {
        parts.push(nested);
      }
    }
    if (!parts.length && detail.reason && typeof detail.reason === 'string') {
      parts.push(detail.reason.trim());
    }
    return parts.join(' ').trim();
  };
  var updateReloadButtonState = function updateReloadButtonState(status, offlineNotice) {
    if (!reloadButton) {
      return;
    }
    var noticeText = typeof offlineNotice === 'string' && offlineNotice.trim() ? offlineNotice.trim() : resolveOfflineNotice();
    if (reloadButton.dataset) {
      if (!reloadButton.dataset.onlineTitle || !reloadButton.dataset.onlineTitle.trim()) {
        var currentTitle = reloadButton.getAttribute('title');
        if (typeof currentTitle === 'string' && currentTitle.trim()) {
          reloadButton.dataset.onlineTitle = currentTitle.trim();
        } else {
          reloadButton.dataset.onlineTitle = 'Force reload';
        }
      }
      if (!reloadButton.dataset.onlineHelp || !reloadButton.dataset.onlineHelp.trim()) {
        var _currentHelp = reloadButton.getAttribute('data-help');
        if (typeof _currentHelp === 'string' && _currentHelp.trim()) {
          reloadButton.dataset.onlineHelp = _currentHelp.trim();
        } else {
          reloadButton.dataset.onlineHelp = reloadButton.dataset.onlineTitle;
        }
      }
      if (!reloadButton.dataset.onlineAriaLabel || !reloadButton.dataset.onlineAriaLabel.trim()) {
        var ariaLabel = reloadButton.getAttribute('aria-label');
        if (typeof ariaLabel === 'string' && ariaLabel.trim()) {
          reloadButton.dataset.onlineAriaLabel = ariaLabel.trim();
        } else {
          reloadButton.dataset.onlineAriaLabel = reloadButton.dataset.onlineTitle;
        }
      }
      if (!reloadButton.dataset.offlineNotice || !reloadButton.dataset.offlineNotice.trim()) {
        reloadButton.dataset.offlineNotice = noticeText;
      }
    }
    if (status === 'online') {
      var _reloadButton$dataset2, _reloadButton$dataset3, _reloadButton$dataset4;
      reloadButton.removeAttribute('disabled');
      reloadButton.removeAttribute('aria-disabled');
      var title = ((_reloadButton$dataset2 = reloadButton.dataset) === null || _reloadButton$dataset2 === void 0 ? void 0 : _reloadButton$dataset2.onlineTitle) || 'Force reload';
      var help = ((_reloadButton$dataset3 = reloadButton.dataset) === null || _reloadButton$dataset3 === void 0 ? void 0 : _reloadButton$dataset3.onlineHelp) || title;
      reloadButton.setAttribute('title', title);
      reloadButton.setAttribute('data-help', help);
      var _ariaLabel = ((_reloadButton$dataset4 = reloadButton.dataset) === null || _reloadButton$dataset4 === void 0 ? void 0 : _reloadButton$dataset4.onlineAriaLabel) || title;
      reloadButton.setAttribute('aria-label', _ariaLabel);
    } else {
      reloadButton.setAttribute('disabled', 'disabled');
      reloadButton.setAttribute('aria-disabled', 'true');
      reloadButton.setAttribute('title', noticeText);
      reloadButton.setAttribute('data-help', noticeText);
      reloadButton.setAttribute('aria-label', noticeText);
      if (reloadButton.dataset) {
        reloadButton.dataset.offlineNotice = noticeText;
        reloadButton.dataset.degradedNotice = noticeText;
      }
    }
  };
  var sanitizeConnectivityState = function sanitizeConnectivityState(state) {
    if (!state || _typeof(state) !== 'object') {
      return null;
    }
    var status = typeof state.status === 'string' && state.status ? state.status : 'unknown';
    var reason = typeof state.reason === 'string' && state.reason ? state.reason : null;
    var timestamp = typeof state.timestamp === 'number' && Number.isFinite(state.timestamp) ? state.timestamp : Date.now();
    var detail = null;
    if (state.detail && _typeof(state.detail) === 'object') {
      detail = state.detail;
    } else if (typeof state.detail === 'string' && state.detail.trim()) {
      detail = state.detail.trim();
    }
    return {
      status: status,
      reason: reason,
      detail: detail,
      timestamp: timestamp
    };
  };
  var refreshOfflineIndicator = function refreshOfflineIndicator() {
    var navigatorOnline = getNavigatorOnline();
    var effectiveStatus = navigatorOnline ? 'online' : 'offline';
    var effectiveReason = navigatorOnline ? null : 'navigator-offline';
    var effectiveDetail = null;
    var effectiveTimestamp = null;
    if (lastConnectivityState) {
      var stateStatus = lastConnectivityState.status;
      if (stateStatus === 'offline') {
        effectiveStatus = 'offline';
        effectiveReason = lastConnectivityState.reason || effectiveReason || 'offline';
        effectiveDetail = lastConnectivityState.detail || null;
        effectiveTimestamp = lastConnectivityState.timestamp || null;
      } else if (stateStatus === 'degraded' && effectiveStatus !== 'offline') {
        effectiveStatus = 'degraded';
        effectiveReason = lastConnectivityState.reason || 'unknown';
        effectiveDetail = lastConnectivityState.detail || null;
        effectiveTimestamp = lastConnectivityState.timestamp || null;
      } else if (stateStatus === 'online' && navigatorOnline) {
        effectiveStatus = 'online';
        effectiveReason = lastConnectivityState.reason || null;
        effectiveDetail = lastConnectivityState.detail || null;
        effectiveTimestamp = lastConnectivityState.timestamp || null;
      }
    }
    if (offlineIndicator.dataset) {
      offlineIndicator.dataset.connectivityStatus = effectiveStatus;
      if (effectiveReason) {
        offlineIndicator.dataset.connectivityReason = effectiveReason;
      } else if (offlineIndicator.dataset.connectivityReason) {
        delete offlineIndicator.dataset.connectivityReason;
      }
      if (effectiveTimestamp) {
        offlineIndicator.dataset.connectivityTimestamp = String(effectiveTimestamp);
      } else if (offlineIndicator.dataset.connectivityTimestamp) {
        delete offlineIndicator.dataset.connectivityTimestamp;
      }
    }
    if (effectiveStatus === 'online') {
      var baseLabel = getBaseLabel();
      var baseHelp = getBaseHelp();
      if (typeof offlineIndicator.textContent === 'string' || _typeof(offlineIndicator.textContent) === 'object') {
        offlineIndicator.textContent = baseLabel;
      }
      offlineIndicator.setAttribute('data-help', baseHelp);
      offlineIndicator.setAttribute('role', 'status');
      offlineIndicator.setAttribute('aria-live', 'polite');
      if (!offlineIndicator.hasAttribute('hidden')) {
        offlineIndicator.setAttribute('hidden', '');
      }
      updateReloadButtonState('online', resolveOfflineNotice());
    } else if (effectiveStatus === 'offline') {
      var offlineNotice = resolveOfflineNotice();
      if (offlineIndicator.dataset) {
        offlineIndicator.dataset.forceReloadNotice = offlineNotice;
        offlineIndicator.dataset.reloadNotice = offlineNotice;
      }
      if (typeof offlineIndicator.textContent === 'string' || _typeof(offlineIndicator.textContent) === 'object') {
        offlineIndicator.textContent = offlineNotice;
      }
      offlineIndicator.setAttribute('data-help', offlineNotice);
      offlineIndicator.setAttribute('role', 'status');
      offlineIndicator.setAttribute('aria-live', 'polite');
      offlineIndicator.removeAttribute('hidden');
      updateReloadButtonState('offline', offlineNotice);
    } else {
      var degradedLabel = getDegradedLabel();
      var reasonText = resolveReasonText(effectiveReason);
      var detailText = _describeConnectivityDetail(effectiveDetail);
      var summaryParts = [];
      if (reasonText) summaryParts.push(reasonText);
      if (detailText && detailText !== reasonText) summaryParts.push(detailText);
      var summary = summaryParts.join(' ').trim();
      var displayText = summary ? "".concat(degradedLabel, " \u2014 ").concat(summary) : degradedLabel;
      var degradedHelp = getDegradedHelp();
      var helpParts = [];
      if (summary) {
        helpParts.push(summary);
      }
      if (degradedHelp && (!summary || degradedHelp.indexOf(summary) === -1)) {
        helpParts.push(degradedHelp);
      }
      var helpText = helpParts.join(' ').trim() || degradedHelp || displayText;
      if (offlineIndicator.dataset) {
        offlineIndicator.dataset.forceReloadNotice = displayText;
        offlineIndicator.dataset.reloadNotice = displayText;
      }
      if (typeof offlineIndicator.textContent === 'string' || _typeof(offlineIndicator.textContent) === 'object') {
        offlineIndicator.textContent = displayText;
      }
      offlineIndicator.setAttribute('data-help', helpText);
      offlineIndicator.setAttribute('role', 'status');
      offlineIndicator.setAttribute('aria-live', 'polite');
      offlineIndicator.removeAttribute('hidden');
      updateReloadButtonState('degraded', displayText);
    }
    if (typeof updateInstallBannerPosition === 'function') {
      updateInstallBannerPosition();
    }
  };
  var applyConnectivityState = function applyConnectivityState(state) {
    var sanitized = sanitizeConnectivityState(state);
    if (!sanitized) {
      return;
    }
    if (lastConnectivityState && lastConnectivityState.status === sanitized.status && lastConnectivityState.reason === sanitized.reason && lastConnectivityState.timestamp === sanitized.timestamp) {
      return;
    }
    lastConnectivityState = sanitized;
    refreshOfflineIndicator();
    if (typeof callCoreFunctionIfAvailable === 'function') {
      callCoreFunctionIfAvailable('updateStorageSummary', [], {
        defer: true
      });
    }
  };
  var handleConnectivityBroadcast = function handleConnectivityBroadcast(event) {
    if (!event) {
      return;
    }
    var data = null;
    try {
      data = event.data || null;
    } catch (error) {
      void error;
      data = null;
    }
    if (!data || _typeof(data) !== 'object') {
      return;
    }
    if (data.type === CONNECTIVITY_STATUS_MESSAGE_TYPE) {
      var state = data.state && _typeof(data.state) === 'object' ? data.state : null;
      if (state) {
        applyConnectivityState(state);
      }
    }
  };
  var ensureConnectivityBroadcast = function ensureConnectivityBroadcast() {
    if (connectivityChannel || connectivityChannelFailed) {
      return;
    }
    if (typeof BroadcastChannel !== 'function') {
      connectivityChannelFailed = true;
      return;
    }
    try {
      connectivityChannel = new BroadcastChannel(SERVICE_WORKER_LOG_CHANNEL);
      connectivityChannel.addEventListener('message', handleConnectivityBroadcast);
    } catch (error) {
      connectivityChannelFailed = true;
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('setupOfflineIndicator: Unable to listen for connectivity updates', error);
      }
    }
  };
  var resolveOfflineModule = function resolveOfflineModule() {
    try {
      if (typeof cineOffline !== 'undefined' && cineOffline) {
        return cineOffline;
      }
    } catch (error) {
      void error;
    }
    var candidates = [typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && _typeof(candidate.cineOffline) === 'object') {
        return candidate.cineOffline;
      }
    }
    return null;
  };
  var offlineModule = resolveOfflineModule();
  if (offlineModule && typeof offlineModule.subscribeConnectivityStatus === 'function') {
    try {
      unsubscribeConnectivity = offlineModule.subscribeConnectivityStatus(applyConnectivityState);
    } catch (error) {
      void error;
      unsubscribeConnectivity = null;
    }
  }
  var initialState = offlineModule && typeof offlineModule.getConnectivityState === 'function' ? offlineModule.getConnectivityState() : typeof window !== 'undefined' && window && _typeof(window.cineConnectivityStatus) === 'object' ? window.cineConnectivityStatus : null;
  if (initialState) {
    applyConnectivityState(initialState);
  }
  ensureConnectivityBroadcast();
  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('online', refreshOfflineIndicator);
    window.addEventListener('offline', refreshOfflineIndicator);
  }
  refreshOfflineIndicator();
  return unsubscribeConnectivity;
}
if (typeof window !== 'undefined') {
  setupOfflineIndicator();
}
function closeSideMenu() {
  var _toggle$dataset, _toggle$dataset2;
  var menu = document.getElementById('sideMenu');
  var overlay = document.getElementById('menuOverlay');
  var toggle = document.getElementById('menuToggle');
  var body = typeof document !== 'undefined' ? document.body : null;
  if (!menu || !overlay || !toggle) return;
  menu.classList.remove('open');
  menu.scrollTop = 0;
  menu.setAttribute('hidden', '');
  var menuLabel = ((_toggle$dataset = toggle.dataset) === null || _toggle$dataset === void 0 ? void 0 : _toggle$dataset.menuLabel) || 'Menu';
  var menuHelp = ((_toggle$dataset2 = toggle.dataset) === null || _toggle$dataset2 === void 0 ? void 0 : _toggle$dataset2.menuHelp) || menuLabel;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', menuLabel);
  toggle.setAttribute('title', menuLabel);
  toggle.setAttribute('data-help', menuHelp);
  body === null || body === void 0 || body.classList.remove('menu-open');
}
function openSideMenu() {
  var _toggle$dataset3, _toggle$dataset4;
  var menu = document.getElementById('sideMenu');
  var overlay = document.getElementById('menuOverlay');
  var toggle = document.getElementById('menuToggle');
  var closeButton = document.getElementById('closeMenuButton');
  var body = typeof document !== 'undefined' ? document.body : null;
  if (!menu || !overlay || !toggle) return;
  if (menu.classList.contains('open')) return;
  menu.classList.add('open');
  menu.removeAttribute('hidden');
  toggle.setAttribute('aria-expanded', 'true');
  var closeLabel = ((_toggle$dataset3 = toggle.dataset) === null || _toggle$dataset3 === void 0 ? void 0 : _toggle$dataset3.closeLabel) || (closeButton === null || closeButton === void 0 ? void 0 : closeButton.getAttribute('aria-label')) || 'Close menu';
  var closeHelp = ((_toggle$dataset4 = toggle.dataset) === null || _toggle$dataset4 === void 0 ? void 0 : _toggle$dataset4.closeHelp) || (closeButton === null || closeButton === void 0 ? void 0 : closeButton.getAttribute('data-help')) || closeLabel;
  toggle.setAttribute('aria-label', closeLabel);
  toggle.setAttribute('title', closeLabel);
  toggle.setAttribute('data-help', closeHelp);
  body === null || body === void 0 || body.classList.add('menu-open');
}
function setupSideMenu() {
  var toggle = document.getElementById('menuToggle');
  var menu = document.getElementById('sideMenu');
  var overlay = document.getElementById('menuOverlay');
  var closeButton = document.getElementById('closeMenuButton');
  if (!toggle || !menu || !overlay) return;
  toggle.addEventListener('click', function () {
    if (menu.classList.contains('open')) {
      closeSideMenu();
    } else {
      openSideMenu();
    }
  });
  overlay.addEventListener('click', closeSideMenu);
  closeButton === null || closeButton === void 0 || closeButton.addEventListener('click', function () {
    closeSideMenu();
    toggle.focus();
  });
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    var mobileQuery = window.matchMedia('(max-width: 768px)');
    mobileQuery.addEventListener('change', function (event) {
      if (!event.matches && menu.classList.contains('open')) {
        closeSideMenu();
      }
    });
  }
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.classList.contains('open')) {
      closeSideMenu();
      toggle.focus();
    }
  });
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var hash = link.getAttribute('href');
      if (hash && hash.startsWith('#')) {
        var _document$querySelect;
        event.preventDefault();
        (_document$querySelect = document.querySelector(hash)) === null || _document$querySelect === void 0 || _document$querySelect.scrollIntoView();
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      closeSideMenu();
    });
  });
  var triggerSidebarAction = function triggerSidebarAction(action) {
    if (!action) return;
    if (action === 'open-settings') {
      var _document$getElementB;
      (_document$getElementB = document.getElementById('settingsButton')) === null || _document$getElementB === void 0 || _document$getElementB.click();
    } else if (action === 'open-help') {
      var _document$getElementB2;
      (_document$getElementB2 = document.getElementById('helpButton')) === null || _document$getElementB2 === void 0 || _document$getElementB2.click();
    } else if (action === 'open-own-gear') {
      if (typeof openOwnGearDialog === 'function') {
        openOwnGearDialog();
      }
    } else if (action === 'open-contacts') {
      initializeContactsModule();
      openDialog(contactsDialog);
    }
  };
  menu.querySelectorAll('[data-sidebar-action]').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      triggerSidebarAction(button.dataset.sidebarAction);
      closeSideMenu();
    });
  });
}
function setupResponsiveControls() {
  var topBar = document.getElementById('topBar');
  var featureSearch = topBar === null || topBar === void 0 ? void 0 : topBar.querySelector('.feature-search');
  var controls = topBar === null || topBar === void 0 ? void 0 : topBar.querySelector('.controls');
  var sidebarControls = document.querySelector('#sideMenu .sidebar-controls');
  if (!topBar || !featureSearch || !controls || !sidebarControls || typeof window.matchMedia !== 'function') return;
  var mql = window.matchMedia('(max-width: 768px)');
  var relocate = function relocate() {
    if (mql.matches) {
      sidebarControls.appendChild(featureSearch);
      sidebarControls.appendChild(controls);
    } else {
      topBar.appendChild(featureSearch);
      topBar.appendChild(controls);
    }
  };
  mql.addEventListener('change', relocate);
  relocate();
}
var OWN_GEAR_SOURCE_CATALOG = 'catalog';
var OWN_GEAR_SOURCE_CUSTOM = 'custom';
var ownGearStoreModuleCache = null;
var ownGearStoreInstance = null;
var ownGearViewModuleCache = null;
var ownGearViewInstance = null;
var fallbackAutoGearCache = {
  items: [],
  map: new Map()
};
function detectOwnGearGlobalScope() {
  if ((typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' && CORE_GLOBAL_SCOPE) {
    return CORE_GLOBAL_SCOPE;
  }
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
  return null;
}
function resolveOwnGearStoreModule() {
  if (ownGearStoreModuleCache) {
    return ownGearStoreModuleCache;
  }
  if (typeof require === 'function') {
    try {
      var required = require('./own-gear/store.js');
      if (required && typeof required.createOwnGearStore === 'function') {
        ownGearStoreModuleCache = required;
        return ownGearStoreModuleCache;
      }
    } catch (error) {
      void error;
    }
  }
  var scope = detectOwnGearGlobalScope();
  if (scope && _typeof(scope.cineOwnGearStore) === 'object' && scope.cineOwnGearStore) {
    ownGearStoreModuleCache = scope.cineOwnGearStore;
    return ownGearStoreModuleCache;
  }
  if ((typeof cineOwnGearStore === "undefined" ? "undefined" : _typeof(cineOwnGearStore)) === 'object' && cineOwnGearStore) {
    ownGearStoreModuleCache = cineOwnGearStore;
    return ownGearStoreModuleCache;
  }
  return null;
}
function getOwnGearStore() {
  if (ownGearStoreInstance) {
    return ownGearStoreInstance;
  }
  var storeModule = resolveOwnGearStoreModule();
  if (storeModule && typeof storeModule.createOwnGearStore === 'function') {
    try {
      ownGearStoreInstance = storeModule.createOwnGearStore();
      return ownGearStoreInstance;
    } catch (error) {
      void error;
    }
  }
  return null;
}
function resolveOwnGearViewModule() {
  if (ownGearViewModuleCache) {
    return ownGearViewModuleCache;
  }
  if (typeof require === 'function') {
    try {
      var required = require('./own-gear/view.js');
      if (required && typeof required.createOwnGearView === 'function') {
        ownGearViewModuleCache = required;
        return ownGearViewModuleCache;
      }
    } catch (error) {
      void error;
    }
  }
  var scope = detectOwnGearGlobalScope();
  if (scope && _typeof(scope.cineOwnGearView) === 'object' && scope.cineOwnGearView) {
    ownGearViewModuleCache = scope.cineOwnGearView;
    return ownGearViewModuleCache;
  }
  if ((typeof cineOwnGearView === "undefined" ? "undefined" : _typeof(cineOwnGearView)) === 'object' && cineOwnGearView) {
    ownGearViewModuleCache = cineOwnGearView;
    return ownGearViewModuleCache;
  }
  return null;
}
function resolveOwnGearViewOptions() {
  var scope = detectOwnGearGlobalScope() || {};
  return {
    scope: scope,
    document: typeof document !== 'undefined' ? document : null,
    getLanguageTexts: getLanguageTexts,
    defaultLanguage: DEFAULT_LANGUAGE_SAFE,
    getCurrentLanguage: function getCurrentLanguage() {
      return currentLang;
    },
    formatWithPlaceholders: formatWithPlaceholdersSafe,
    setButtonLabelWithIconBinding: setButtonLabelWithIconBinding,
    iconMarkup: iconMarkup,
    iconGlyphs: ICON_GLYPHS,
    openDialog: openDialog,
    closeDialog: closeDialog,
    formatQuantityText: formatOwnGearQuantityText,
    devices: devices,
    gearItemTranslations: gearItemTranslations,
    looksLikeGearName: looksLikeGearName
  };
}
function getOwnGearView() {
  if (ownGearViewInstance) {
    return ownGearViewInstance;
  }
  var viewModule = resolveOwnGearViewModule();
  var store = getOwnGearStore();
  if (!viewModule || typeof viewModule.createOwnGearView !== 'function' || !store) {
    return null;
  }
  try {
    ownGearViewInstance = viewModule.createOwnGearView(store, resolveOwnGearViewOptions());
    return ownGearViewInstance;
  } catch (error) {
    void error;
  }
  return null;
}
function invalidateAutoGearOwnGearCache() {
  var store = getOwnGearStore();
  if (store && typeof store.invalidateCache === 'function') {
    try {
      store.invalidateCache();
      return;
    } catch (error) {
      void error;
    }
  }
  fallbackAutoGearCache = {
    items: [],
    map: new Map()
  };
}
function refreshAutoGearOwnGearCache() {
  var store = getOwnGearStore();
  if (store && typeof store.refreshCache === 'function') {
    try {
      var snapshot = store.refreshCache();
      return {
        items: Array.isArray(snapshot.items) ? snapshot.items.slice() : [],
        map: snapshot.map instanceof Map ? snapshot.map : new Map()
      };
    } catch (error) {
      void error;
    }
  }
  var moduleApi = resolveOwnGearModule();
  var items = [];
  if (moduleApi && typeof moduleApi.loadStoredOwnGearItems === 'function') {
    try {
      items = moduleApi.loadStoredOwnGearItems();
    } catch (error) {
      console.warn('Unable to load own gear items for automatic gear rules via module.', error);
    }
  }
  if (!Array.isArray(items) || !items.length) {
    items = loadStoredOwnGearItems();
  }
  var normalized = Array.isArray(items) ? items.map(normalizeOwnGearRecord).filter(Boolean) : [];
  var map = new Map();
  normalized.forEach(function (item) {
    if (!item || !item.id) return;
    map.set(item.id, item);
  });
  fallbackAutoGearCache = {
    items: normalized,
    map: map
  };
  return fallbackAutoGearCache;
}
function getAutoGearOwnGearCache() {
  var store = getOwnGearStore();
  if (store && typeof store.getCacheSnapshot === 'function') {
    try {
      var snapshot = store.getCacheSnapshot();
      return {
        items: Array.isArray(snapshot.items) ? snapshot.items.slice() : [],
        map: snapshot.map instanceof Map ? snapshot.map : new Map()
      };
    } catch (error) {
      void error;
    }
  }
  if (fallbackAutoGearCache && Array.isArray(fallbackAutoGearCache.items) && fallbackAutoGearCache.items.length) {
    return fallbackAutoGearCache;
  }
  return refreshAutoGearOwnGearCache();
}
function getAutoGearOwnGearItems() {
  return getAutoGearOwnGearCache().items.slice();
}
function findAutoGearOwnGearById(id) {
  if (!id) return null;
  var store = getOwnGearStore();
  if (store && typeof store.findCachedById === 'function') {
    try {
      return store.findCachedById(id);
    } catch (error) {
      void error;
    }
  }
  var cache = getAutoGearOwnGearCache();
  return cache.map.get(id) || null;
}
function generateOwnGearId() {
  var store = getOwnGearStore();
  if (store && typeof store.generateOwnGearId === 'function') {
    try {
      return store.generateOwnGearId();
    } catch (error) {
      void error;
    }
  }
  var moduleApi = resolveOwnGearModule();
  if (moduleApi && typeof moduleApi.generateOwnGearId === 'function') {
    try {
      return moduleApi.generateOwnGearId();
    } catch (error) {
      console.warn('Unable to generate own gear id via module.', error);
    }
  }
  if (typeof crypto !== 'undefined' && crypto && typeof crypto.randomUUID === 'function') {
    try {
      return crypto.randomUUID();
    } catch (error) {
      void error;
    }
  }
  var timePart = Date.now().toString(36);
  var randomPart = Math.floor(Math.random() * 1e8).toString(36);
  return "own-".concat(timePart, "-").concat(randomPart);
}
function normalizeOwnGearRecord(entry) {
  var store = getOwnGearStore();
  if (store && typeof store.normalizeOwnGearRecord === 'function') {
    try {
      return store.normalizeOwnGearRecord(entry);
    } catch (error) {
      void error;
    }
  }
  var moduleApi = resolveOwnGearModule();
  if (moduleApi && typeof moduleApi.normalizeOwnGearRecord === 'function') {
    try {
      return moduleApi.normalizeOwnGearRecord(entry);
    } catch (error) {
      console.warn('Unable to normalize own gear entry via module.', error);
    }
  }
  if (!entry || _typeof(entry) !== 'object') {
    return null;
  }
  var rawName = typeof entry.name === 'string' ? entry.name.trim() : '';
  if (!rawName) {
    return null;
  }
  var normalized = {
    id: typeof entry.id === 'string' && entry.id.trim() ? entry.id.trim() : generateOwnGearId(),
    name: rawName
  };
  if (typeof entry.quantity === 'string' && entry.quantity.trim()) {
    normalized.quantity = entry.quantity.trim();
  } else if (typeof entry.quantity === 'number' && Number.isFinite(entry.quantity)) {
    normalized.quantity = String(entry.quantity);
  }
  if (typeof entry.notes === 'string' && entry.notes.trim()) {
    normalized.notes = entry.notes.trim();
  }
  if (typeof entry.source === 'string' && entry.source.trim()) {
    normalized.source = entry.source.trim();
  }
  return normalized;
}
function loadStoredOwnGearItems() {
  var store = getOwnGearStore();
  if (store && typeof store.loadStoredOwnGearItems === 'function') {
    try {
      return store.loadStoredOwnGearItems();
    } catch (error) {
      void error;
    }
  }
  var moduleApi = resolveOwnGearModule();
  if (moduleApi && typeof moduleApi.loadStoredOwnGearItems === 'function') {
    try {
      return moduleApi.loadStoredOwnGearItems();
    } catch (error) {
      console.warn('Unable to load own gear items via module.', error);
    }
  }
  if (typeof loadOwnGear !== 'function') {
    return [];
  }
  try {
    var stored = loadOwnGear();
    if (!Array.isArray(stored)) {
      return [];
    }
    var seenIds = new Set();
    return stored.map(normalizeOwnGearRecord).filter(function (item) {
      if (!item) return false;
      if (seenIds.has(item.id)) {
        return false;
      }
      seenIds.add(item.id);
      return true;
    });
  } catch (error) {
    console.warn('Failed to load own gear items from storage', error);
    return [];
  }
}
function persistOwnGearItems() {
  var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var store = getOwnGearStore();
  if (store && typeof store.persistOwnGearItems === 'function') {
    try {
      return store.persistOwnGearItems(items);
    } catch (error) {
      void error;
    }
  }
  var moduleApi = resolveOwnGearModule();
  if (moduleApi && typeof moduleApi.persistOwnGearItems === 'function') {
    try {
      moduleApi.persistOwnGearItems(items);
      return true;
    } catch (error) {
      console.warn('Unable to persist own gear items via module.', error);
    }
  }
  if (typeof saveOwnGear !== 'function') {
    return false;
  }
  var payload = items.map(function (item) {
    var entry = {
      id: item.id,
      name: item.name
    };
    if (item.quantity) {
      entry.quantity = item.quantity;
    }
    if (item.notes) {
      entry.notes = item.notes;
    }
    if (item.source) {
      entry.source = item.source;
    }
    return entry;
  });
  try {
    saveOwnGear(payload);
    if (typeof document !== 'undefined' && typeof CustomEvent === 'function') {
      document.dispatchEvent(new CustomEvent('own-gear-data-changed'));
    }
    return true;
  } catch (error) {
    console.warn('Failed to save own gear items', error);
  }
  return false;
}
function formatOwnGearQuantityText(quantity) {
  if (typeof quantity !== 'string') {
    return '';
  }
  var trimmed = quantity.trim();
  if (!trimmed) {
    return '';
  }
  var numeric = Number(trimmed.replace(',', '.'));
  if (!Number.isNaN(numeric) && Number.isFinite(numeric)) {
    var fixed = Math.round(numeric * 1000) / 1000;
    return String(fixed).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  }
  return trimmed;
}
function openOwnGearDialog() {
  var view = getOwnGearView();
  if (view && typeof view.openDialog === 'function') {
    try {
      view.openDialog();
    } catch (error) {
      void error;
    }
  }
}
function applyOwnGearLocalization(lang) {
  var view = getOwnGearView();
  if (view && typeof view.applyLocalization === 'function') {
    try {
      view.applyLocalization(lang);
    } catch (error) {
      void error;
    }
  }
}
function initializeLayoutControls() {
  setupSideMenu();
  setupResponsiveControls();
}
function initializeOwnGearManager() {
  var view = getOwnGearView();
  if (!view) {
    return;
  }
  try {
    view.initialize();
  } catch (error) {
    void error;
  }
  try {
    exposeCoreRuntimeConstant('openOwnGearDialog', openOwnGearDialog);
  } catch (error) {
    void error;
    var scope = detectOwnGearGlobalScope();
    if (scope) {
      scope.openOwnGearDialog = openOwnGearDialog;
    }
  }
}
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  var runLayoutInitialization = function runLayoutInitialization() {
    initializeLayoutControls();
    initializeOwnGearManager();
    initializeContactsModule();
  };
  var scheduleLayoutInitialization = function scheduleLayoutInitialization() {
    var invoke = function invoke() {
      if (typeof window !== 'undefined' && typeof window.setTimeout === 'function') {
        window.setTimeout(runLayoutInitialization, 0);
      } else {
        runLayoutInitialization();
      }
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', invoke, {
        once: true
      });
    } else {
      invoke();
    }
  };
}
var VIDEO_OUTPUT_TYPES = new Set(['3G-SDI', '6G-SDI', '12G-SDI', 'Mini BNC', 'HDMI', 'Mini HDMI', 'Micro HDMI', 'DisplayPort']);
var CORE_NORMALIZED_FLAG_KEY = '__normalized';
var DEFAULT_FILTER_SIZE = '4x5.65';
var CORE_AUTO_BACKUP_NAMESPACE = function () {
  if (typeof require === 'function') {
    try {
      return require('./app-core-auto-backup.js');
    } catch (autoBackupRequireError) {
      void autoBackupRequireError;
    }
  }
  var loaderNamespace = null;
  if (typeof fallbackRequireCoreRuntimeModule === 'function') {
    loaderNamespace = fallbackRequireCoreRuntimeModule('./app-core-auto-backup.js');
  } else if ((typeof cineRuntimeBootstrapExports === "undefined" ? "undefined" : _typeof(cineRuntimeBootstrapExports)) === 'object' && cineRuntimeBootstrapExports && typeof cineRuntimeBootstrapExports.fallbackRequireCoreRuntimeModule === 'function') {
    loaderNamespace = cineRuntimeBootstrapExports.fallbackRequireCoreRuntimeModule('./app-core-auto-backup.js');
  } else {
    var _globalScope = (typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null) || (typeof globalThis !== 'undefined' ? globalThis : null) || (typeof window !== 'undefined' ? window : null) || (typeof self !== 'undefined' ? self : null) || (typeof global !== 'undefined' ? global : null);
    if (_globalScope && typeof _globalScope.fallbackRequireCoreRuntimeModule === 'function') {
      loaderNamespace = _globalScope.fallbackRequireCoreRuntimeModule('./app-core-auto-backup.js');
    }
  }
  if (loaderNamespace && _typeof(loaderNamespace) === 'object') {
    return loaderNamespace;
  }
  var candidateScopes = [typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null, typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
  for (var index = 0; index < candidateScopes.length; index += 1) {
    var scope = candidateScopes[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      if (scope.CORE_AUTO_BACKUP && _typeof(scope.CORE_AUTO_BACKUP) === 'object') {
        return scope.CORE_AUTO_BACKUP;
      }
    } catch (lookupError) {
      void lookupError;
    }
  }
  return null;
}();
var AUTO_BACKUP_NAME_PREFIX = CORE_AUTO_BACKUP_NAMESPACE && typeof CORE_AUTO_BACKUP_NAMESPACE.AUTO_BACKUP_NAME_PREFIX === 'string' ? CORE_AUTO_BACKUP_NAMESPACE.AUTO_BACKUP_NAME_PREFIX : 'auto-backup-';
var AUTO_BACKUP_DELETION_PREFIX = CORE_AUTO_BACKUP_NAMESPACE && typeof CORE_AUTO_BACKUP_NAMESPACE.AUTO_BACKUP_DELETION_PREFIX === 'string' ? CORE_AUTO_BACKUP_NAMESPACE.AUTO_BACKUP_DELETION_PREFIX : 'auto-backup-before-delete-';
var localLogAutoBackupEvent = CORE_AUTO_BACKUP_NAMESPACE && typeof CORE_AUTO_BACKUP_NAMESPACE.logAutoBackupEvent === 'function' ? CORE_AUTO_BACKUP_NAMESPACE.logAutoBackupEvent : function fallbackLogAutoBackupEvent(level, message, detail, meta) {
  var normalizedLevel = typeof level === 'string' && level ? level.toLowerCase() : 'info';
  var normalizedMessage = typeof message === 'string' && message ? message : 'Auto backup event';
  if (typeof console === 'undefined' || !console) {
    return;
  }
  var fallback = null;
  if (normalizedLevel === 'error' && typeof console.error === 'function') {
    fallback = console.error;
  } else if (normalizedLevel === 'warn' && typeof console.warn === 'function') {
    fallback = console.warn;
  } else if (normalizedLevel === 'info' && typeof console.info === 'function') {
    fallback = console.info;
  } else if (normalizedLevel === 'debug' && typeof console.debug === 'function') {
    fallback = console.debug;
  } else if (typeof console.log === 'function') {
    fallback = console.log;
  }
  if (typeof fallback === 'function') {
    try {
      fallback.call(console, "[auto-backup] ".concat(normalizedMessage), detail || null, meta || null);
    } catch (fallbackError) {
      void fallbackError;
    }
  }
};
var rawCloneProjectEntryForSetup = CORE_AUTO_BACKUP_NAMESPACE && typeof CORE_AUTO_BACKUP_NAMESPACE.cloneProjectEntryForSetup === 'function' ? CORE_AUTO_BACKUP_NAMESPACE.cloneProjectEntryForSetup : null;
var rawEnsureAutoBackupsFromProjects = CORE_AUTO_BACKUP_NAMESPACE && typeof CORE_AUTO_BACKUP_NAMESPACE.ensureAutoBackupsFromProjects === 'function' ? CORE_AUTO_BACKUP_NAMESPACE.ensureAutoBackupsFromProjects : null;
var showAutoBackups = false;
try {
  if (typeof localStorage !== 'undefined') {
    showAutoBackups = localStorage.getItem('showAutoBackups') === 'true';
  }
} catch (e) {
  localLogAutoBackupEvent('warn', 'Could not load auto backup visibility preference', e);
}
function cloneProjectEntryForSetup(projectEntry) {
  if (rawCloneProjectEntryForSetup) {
    return rawCloneProjectEntryForSetup(projectEntry, {
      deepClone: CORE_DEEP_CLONE,
      log: localLogAutoBackupEvent
    });
  }
  if (!projectEntry || _typeof(projectEntry) !== 'object') {
    return {};
  }
  try {
    return CORE_DEEP_CLONE(projectEntry);
  } catch (cloneError) {
    localLogAutoBackupEvent('warn', 'Fallback auto backup project clone failed', cloneError);
    var snapshot = {};
    for (var key in projectEntry) {
      if (Object.prototype.hasOwnProperty.call(projectEntry, key)) {
        snapshot[key] = projectEntry[key];
      }
    }
    return snapshot;
  }
}
function ensureAutoBackupsFromProjects() {
  if (!rawEnsureAutoBackupsFromProjects) {
    return false;
  }
  return rawEnsureAutoBackupsFromProjects({
    loadProject: typeof loadProject === 'function' ? loadProject : null,
    getSetups: getSetups,
    storeSetups: storeSetups,
    log: localLogAutoBackupEvent,
    cloneProjectEntry: function cloneProjectEntry(entry) {
      return cloneProjectEntryForSetup(entry);
    },
    autoBackupNamePrefix: AUTO_BACKUP_NAME_PREFIX,
    autoBackupDeletionPrefix: AUTO_BACKUP_DELETION_PREFIX
  });
}
if (showAutoBackups) {
  try {
    ensureAutoBackupsFromProjects();
  } catch (error) {
    localLogAutoBackupEvent('warn', 'Failed to prepare auto backups from project storage', error);
  }
}
function getSetups() {
  return loadSetups();
}
exposeCoreRuntimeConstant('getSetups', getSetups);
function storeSetups(setups) {
  saveSetups(setups);
}
exposeCoreRuntimeConstant('storeSetups', storeSetups);
function storeDevices(deviceData) {
  saveDeviceData(deviceData);
}
function loadSession() {
  return typeof loadSessionState === 'function' ? loadSessionState() : null;
}
exposeCoreRuntimeConstant('loadSession', loadSession);
function storeSession(state) {
  if (typeof saveSessionState === 'function') {
    saveSessionState(state);
  }
}
exposeCoreRuntimeConstant('storeSession', storeSession);
function toggleDialog(dialog, shouldOpen) {
  if (!dialog) return;
  if (shouldOpen) {
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  } else if (typeof dialog.close === 'function') {
    dialog.close();
  } else {
    dialog.removeAttribute('open');
  }
}
function openDialog(dialog) {
  toggleDialog(dialog, true);
}
function closeDialog(dialog) {
  toggleDialog(dialog, false);
}
function isDialogOpen(dialog) {
  if (!dialog) return false;
  if (typeof dialog.open === 'boolean') {
    if (dialog.open) {
      return true;
    }
    if (typeof dialog.hasAttribute === 'function' && dialog.hasAttribute('open')) {
      return true;
    }
    return false;
  }
  return typeof dialog.hasAttribute === 'function' && dialog.hasAttribute('open');
}
exposeCoreRuntimeConstant('normalizeDevicesForPersistence', normalizeDevicesForPersistence);
function resolveUpdateDevicesReferenceFunction() {
  var directReference = null;
  try {
    directReference = typeof updateGlobalDevicesReference === 'function' ? updateGlobalDevicesReference : null;
  } catch (referenceError) {
    void referenceError;
    directReference = null;
  }
  if (directReference) {
    return directReference;
  }
  var candidates = [];
  var registerCandidate = function registerCandidate(scope) {
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return;
    }
    if (candidates.indexOf(scope) !== -1) {
      return;
    }
    candidates.push(scope);
  };
  try {
    registerCandidate(typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' ? CORE_PART1_RUNTIME_SCOPE : null);
  } catch (corePart1ScopeError) {
    void corePart1ScopeError;
  }
  try {
    registerCandidate(typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null);
  } catch (coreGlobalScopeError) {
    void coreGlobalScopeError;
  }
  try {
    registerCandidate(typeof DEVICE_GLOBAL_SCOPE !== 'undefined' ? DEVICE_GLOBAL_SCOPE : null);
  } catch (deviceScopeError) {
    void deviceScopeError;
  }
  try {
    registerCandidate(typeof CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE !== 'undefined' ? CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE : null);
  } catch (runtimeCandidateError) {
    void runtimeCandidateError;
  }
  registerCandidate(typeof globalThis !== 'undefined' ? globalThis : null);
  registerCandidate(typeof window !== 'undefined' ? window : null);
  registerCandidate(typeof self !== 'undefined' ? self : null);
  registerCandidate(typeof global !== 'undefined' ? global : null);
  for (var index = 0; index < candidates.length; index += 1) {
    var scope = candidates[index];
    try {
      var candidate = scope && scope.updateGlobalDevicesReference;
      if (typeof candidate === 'function') {
        return candidate;
      }
    } catch (scopeError) {
      void scopeError;
    }
  }
  return null;
}
if (window.defaultDevices === undefined) {
  window.defaultDevices = CORE_DEEP_CLONE(devices);
  markDevicesNormalized(window.defaultDevices);
  unifyDevices(window.defaultDevices);
}
var storedDevices = loadDeviceData();
if (storedDevices) {
  var merged = CORE_DEEP_CLONE(window.defaultDevices);
  for (var _i2 = 0, _Object$entries = Object.entries(storedDevices); _i2 < _Object$entries.length; _i2++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
      key = _Object$entries$_i[0],
      value = _Object$entries$_i[1];
    if (key === 'fiz' && value && _typeof(value) === 'object') {
      merged.fiz = merged.fiz || {};
      for (var _i3 = 0, _Object$entries2 = Object.entries(value); _i3 < _Object$entries2.length; _i3++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2),
          sub = _Object$entries2$_i[0],
          subVal = _Object$entries2$_i[1];
        merged.fiz[sub] = _objectSpread(_objectSpread({}, merged.fiz[sub] || {}), subVal || {});
      }
    } else if (merged[key] && _typeof(merged[key]) === 'object') {
      merged[key] = _objectSpread(_objectSpread({}, merged[key]), value || {});
    } else {
      merged[key] = value;
    }
  }
  devices = merged;
  var updateDevicesReferenceFn = resolveUpdateDevicesReferenceFunction();
  if (typeof updateDevicesReferenceFn === 'function') {
    try {
      updateDevicesReferenceFn(devices);
    } catch (updateDevicesReferenceError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Failed to update global devices reference during initialization', updateDevicesReferenceError);
      }
    }
  }
}
unifyDevices(devices, {
  force: true
});
function getBatteryPlateSupport(name) {
  var cam = devices.cameras && devices.cameras[name];
  if (!cam || !cam.power || !Array.isArray(cam.power.batteryPlateSupport)) return [];
  return cam.power.batteryPlateSupport.filter(Boolean).map(function (bp) {
    if (!bp || _typeof(bp) !== 'object') return bp;
    if (bp.type === 'Gold Mount') {
      return _objectSpread(_objectSpread({}, bp), {}, {
        type: 'Gold-Mount'
      });
    }
    return bp;
  });
}
function getSupportedBatteryPlates(name) {
  return getBatteryPlateSupport(name).map(function (bp) {
    return bp.type;
  }).filter(Boolean);
}
function getAvailableBatteryPlates(name) {
  var support = getBatteryPlateSupport(name);
  if (!support.length) return [];
  var nativeTypes = new Set(support.filter(function (bp) {
    return bp.mount === 'native' && bp.type;
  }).map(function (bp) {
    return bp.type;
  }));
  if (nativeTypes.size === 1 && nativeTypes.has('B-Mount')) {
    return ['B-Mount'];
  }
  return _toConsumableArray(new Set(getSupportedBatteryPlates(name)));
}
function supportsMountCamera(name, mountType) {
  return getAvailableBatteryPlates(name).includes(mountType);
}
function supportsBMountCamera(name) {
  return supportsMountCamera(name, 'B-Mount');
}
function supportsGoldMountCamera(name) {
  return supportsMountCamera(name, 'Gold-Mount');
}
function getBatteriesByMount(mountType) {
  var out = {};
  for (var _i4 = 0, _Object$entries3 = Object.entries(((_devices = devices) === null || _devices === void 0 ? void 0 : _devices.batteries) || {}); _i4 < _Object$entries3.length; _i4++) {
    var _devices;
    var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i4], 2),
      name = _Object$entries3$_i[0],
      info = _Object$entries3$_i[1];
    if (info && info.mount_type === mountType) out[name] = info;
  }
  return out;
}
function getHotswapsByMount(mountType) {
  var out = {};
  for (var _i5 = 0, _Object$entries4 = Object.entries(devices.batteryHotswaps || {}); _i5 < _Object$entries4.length; _i5++) {
    var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i5], 2),
      name = _Object$entries4$_i[0],
      info = _Object$entries4$_i[1];
    if (info && info.mount_type === mountType) out[name] = info;
  }
  return out;
}
function getBatteryMountType(batteryName) {
  var _devices2;
  if (!batteryName || batteryName === 'None') {
    return '';
  }
  var info = (_devices2 = devices) === null || _devices2 === void 0 || (_devices2 = _devices2.batteries) === null || _devices2 === void 0 ? void 0 : _devices2[batteryName];
  var mount = info && typeof info.mount_type === 'string' ? info.mount_type : '';
  return mount || '';
}
var batteryPlateRow;
var batteryPlateSelect;
function normalizeBatteryPlateValue(plateValue, batteryName) {
  var normalizedPlate = typeof plateValue === 'string' ? plateValue.trim() : '';
  var derivedMount = getBatteryMountType(batteryName);
  if (!derivedMount) {
    return normalizedPlate;
  }
  if (!normalizedPlate || normalizedPlate !== derivedMount) {
    return derivedMount;
  }
  return normalizedPlate;
}
function ensureBatteryPlateElements() {
  if (typeof document === 'undefined') {
    if (typeof batteryPlateRow === 'undefined') batteryPlateRow = null;
    if (typeof batteryPlateSelect === 'undefined') batteryPlateSelect = null;
    return;
  }
  batteryPlateRow = document.getElementById('batteryPlateRow');
  batteryPlateSelect = document.getElementById('batteryPlateSelect');
}
function applyBatteryPlateSelectionFromBattery(batteryName, currentPlateValue) {
  ensureBatteryPlateElements();
  var normalizedPlate = typeof currentPlateValue === 'string' ? currentPlateValue.trim() : '';
  var desiredPlate = normalizeBatteryPlateValue(normalizedPlate, batteryName);
  if (!batteryPlateSelect || !desiredPlate) {
    return desiredPlate || normalizedPlate;
  }
  var options = Array.from(batteryPlateSelect.options || []);
  var hasDesiredOption = options.some(function (option) {
    return option && option.value === desiredPlate;
  });
  if (!hasDesiredOption) {
    return normalizedPlate;
  }
  if (batteryPlateSelect.value !== desiredPlate) {
    batteryPlateSelect.value = desiredPlate;
  }
  return desiredPlate;
}
function getSelectedPlate() {
  var _batteryPlateSelect;
  ensureBatteryPlateElements();
  var camName = typeof (cameraSelect === null || cameraSelect === void 0 ? void 0 : cameraSelect.value) === 'string' ? cameraSelect.value : '';
  var plates = typeof getAvailableBatteryPlates === 'function' ? getAvailableBatteryPlates(camName) : [];
  if (!Array.isArray(plates) || !plates.length) return null;
  var plateValue = typeof ((_batteryPlateSelect = batteryPlateSelect) === null || _batteryPlateSelect === void 0 ? void 0 : _batteryPlateSelect.value) === 'string' ? batteryPlateSelect.value : '';
  if (plateValue) {
    return plateValue;
  }
  if (plates.includes('V-Mount')) {
    return 'V-Mount';
  }
  return plates[0];
}
function isSelectedPlateNative(camName) {
  var plate = getSelectedPlate();
  var cam = (devices.cameras || {})[camName];
  if (!plate || !cam || !cam.power || !Array.isArray(cam.power.batteryPlateSupport)) return false;
  return cam.power.batteryPlateSupport.some(function (bp) {
    return bp.type === plate && bp.mount === 'native';
  });
}
function shortConnLabel(type) {
  if (!type) return '';
  return String(type).replace(/\(.*?\)/, '').trim();
}
function formatConnLabel(from, to) {
  var a = shortConnLabel(from);
  var b = shortConnLabel(to);
  if (!a) return b || '';
  if (!b || a.toLowerCase() === b.toLowerCase()) return a;
  return "".concat(a, " to ").concat(b);
}
var hasCamConnector = function hasCamConnector(str) {
  return /CAM/i.test(str);
};
var hasLemo7PinConnector = function hasLemo7PinConnector(str) {
  return /7-pin/i.test(str);
};
function getFizConnectorTypes(device) {
  if (!device) return [];
  if (Array.isArray(device.fizConnectors)) {
    return device.fizConnectors.map(function (fc) {
      return fc.type;
    });
  }
  return device.fizConnector ? [device.fizConnector] : [];
}
function controllerCamPort(name) {
  var _devices$fiz, _devices$fiz2;
  var isRf = /cforce.*rf/i.test(name) || /RIA-1/i.test(name);
  if (isRf) return 'Cam';
  var c = (_devices$fiz = devices.fiz) === null || _devices$fiz === void 0 || (_devices$fiz = _devices$fiz.controllers) === null || _devices$fiz === void 0 ? void 0 : _devices$fiz[name];
  if (c) {
    if (/UMC-4/i.test(name)) return '3-Pin R/S';
    var connStr = getFizConnectorTypes(c).join(', ');
    if (hasCamConnector(connStr)) return 'Cam';
    if (hasLemo7PinConnector(connStr)) return 'LEMO 7-pin';
  }
  var m = (_devices$fiz2 = devices.fiz) === null || _devices$fiz2 === void 0 || (_devices$fiz2 = _devices$fiz2.motors) === null || _devices$fiz2 === void 0 ? void 0 : _devices$fiz2[name];
  if (m) {
    var _connStr = getFizConnectorTypes(m).join(', ');
    if (hasCamConnector(_connStr)) return 'Cam';
    if (hasLemo7PinConnector(_connStr)) return 'LEMO 7-pin';
  }
  if (isArriOrCmotion(name) && !isRf) return 'LBUS';
  return 'FIZ Port';
}
function controllerDistancePort(name) {
  var _devices$fiz3;
  var c = (_devices$fiz3 = devices.fiz) === null || _devices$fiz3 === void 0 || (_devices$fiz3 = _devices$fiz3.controllers) === null || _devices$fiz3 === void 0 ? void 0 : _devices$fiz3[name];
  if (/RIA-1/i.test(name) || /UMC-4/i.test(name)) return 'Serial';
  if (getFizConnectorTypes(c).some(function (type) {
    return /SERIAL/i.test(type);
  })) return 'Serial';
  return 'LBUS';
}
function controllerPriority(name) {
  if (/cforce.*rf/i.test(name) || /RIA-1/i.test(name) || /UMC-4/i.test(name)) return 0;
  if (/Master Grip/i.test(name) || /ZMU-4/i.test(name) || /OCU-1/i.test(name)) return 1;
  return 2;
}
function motorPriority(name) {
  var _devices$fiz4;
  var m = (_devices$fiz4 = devices.fiz) === null || _devices$fiz4 === void 0 || (_devices$fiz4 = _devices$fiz4.motors) === null || _devices$fiz4 === void 0 ? void 0 : _devices$fiz4[name];
  if (m && m.internalController && /CAM/i.test(m.fizConnector || '')) return 0;
  return 1;
}
function isArriOrCmotion(name) {
  return /^(ARRI|Arri)/i.test(name) || /cmotion/i.test(name);
}
function isArri(name) {
  return /arri/i.test(name);
}
function fizNeedsPower(name) {
  var _devices$fiz5, _devices$fiz6;
  var d = ((_devices$fiz5 = devices.fiz) === null || _devices$fiz5 === void 0 || (_devices$fiz5 = _devices$fiz5.controllers) === null || _devices$fiz5 === void 0 ? void 0 : _devices$fiz5[name]) || ((_devices$fiz6 = devices.fiz) === null || _devices$fiz6 === void 0 || (_devices$fiz6 = _devices$fiz6.motors) === null || _devices$fiz6 === void 0 ? void 0 : _devices$fiz6[name]);
  if (!d) return false;
  var ps = String(d.powerSource || '').toLowerCase();
  if (ps.includes('internal battery') && !ps.includes('external')) return false;
  return true;
}
function firstConnector(str) {
  if (!str) return '';
  return str.split(',')[0].trim();
}
function getFizPort(device) {
  var _connectors$;
  var preferredMatchers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (!device) return '';
  var connectors = Array.isArray(device.fizConnectors) ? device.fizConnectors : [];
  var _iterator = _createForOfIteratorHelper(preferredMatchers),
    _step;
  try {
    var _loop = function _loop() {
        var matcher = _step.value;
        var match = connectors.find(function (fc) {
          return matcher.test(fc.type);
        });
        if (match) return {
          v: firstConnector(match.type)
        };
      },
      _ret;
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _ret = _loop();
      if (_ret) return _ret.v;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var portStr = device.fizConnector || ((_connectors$ = connectors[0]) === null || _connectors$ === void 0 ? void 0 : _connectors$.type);
  return firstConnector(portStr);
}
function cameraFizPort(camName, controllerPort) {
  var deviceName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var cam = (devices.cameras || {})[camName];
  if (!cam || !Array.isArray(cam.fizConnectors) || cam.fizConnectors.length === 0) return 'LBUS';
  if (!controllerPort) return cam.fizConnectors[0].type;
  if (isArri(camName) && deviceName && !isArri(deviceName)) {
    var ext = cam.fizConnectors.find(function (fc) {
      return /ext/i.test(fc.type);
    });
    if (ext) return ext.type;
  }
  var norm = shortConnLabel(firstConnector(controllerPort)).toLowerCase();
  var match = cam.fizConnectors.find(function (fc) {
    return shortConnLabel(fc.type).toLowerCase() === norm;
  });
  return match ? match.type : cam.fizConnectors[0].type;
}
function controllerFizPort(name) {
  var _devices$fiz7;
  var c = (_devices$fiz7 = devices.fiz) === null || _devices$fiz7 === void 0 || (_devices$fiz7 = _devices$fiz7.controllers) === null || _devices$fiz7 === void 0 ? void 0 : _devices$fiz7[name];
  if (/UMC-4/i.test(name)) {
    return getFizPort(c, [/LCS/i]) || 'LCS (LEMO 7-pin)';
  }
  var port = getFizPort(c);
  return port || (isArriOrCmotion(name) ? 'LBUS' : 'Proprietary');
}
function motorFizPort(name) {
  var _devices$fiz8;
  var m = (_devices$fiz8 = devices.fiz) === null || _devices$fiz8 === void 0 || (_devices$fiz8 = _devices$fiz8.motors) === null || _devices$fiz8 === void 0 ? void 0 : _devices$fiz8[name];
  var port = getFizPort(m);
  return port || (isArriOrCmotion(name) ? 'LBUS' : 'Proprietary');
}
function distanceFizPort(name) {
  var _devices$fiz9;
  var d = (_devices$fiz9 = devices.fiz) === null || _devices$fiz9 === void 0 || (_devices$fiz9 = _devices$fiz9.distance) === null || _devices$fiz9 === void 0 ? void 0 : _devices$fiz9[name];
  if (!d) return 'LBUS';
  var port = getFizPort(d, [/LBUS/i, /SERIAL/i]);
  if (port) return port;
  return /preston/i.test(name) ? 'Serial' : 'LBUS';
}
function fizPort(name) {
  var _devices$fiz0, _devices$fiz1, _devices$fiz10;
  if ((_devices$fiz0 = devices.fiz) !== null && _devices$fiz0 !== void 0 && (_devices$fiz0 = _devices$fiz0.controllers) !== null && _devices$fiz0 !== void 0 && _devices$fiz0[name]) return controllerFizPort(name);
  if ((_devices$fiz1 = devices.fiz) !== null && _devices$fiz1 !== void 0 && (_devices$fiz1 = _devices$fiz1.motors) !== null && _devices$fiz1 !== void 0 && _devices$fiz1[name]) return motorFizPort(name);
  if ((_devices$fiz10 = devices.fiz) !== null && _devices$fiz10 !== void 0 && (_devices$fiz10 = _devices$fiz10.distance) !== null && _devices$fiz10 !== void 0 && _devices$fiz10[name]) return distanceFizPort(name);
  return 'LBUS';
}
function fizPowerPort(name) {
  if (/cforce.*rf/i.test(name) || /RIA-1/i.test(name)) return 'Cam';
  return fizPort(name);
}
function sdiRate(type) {
  var m = /([\d.]+)G-SDI/i.exec(type || '');
  if (m) return parseFloat(m[1]);
  return /SDI/i.test(type || '') ? 1 : null;
}
function connectionLabel(outType, inType) {
  if (!outType || !inType) return "";
  if (/HDMI/i.test(outType) && /HDMI/i.test(inType)) return "HDMI";
  if (/SDI/i.test(outType) && /SDI/i.test(inType)) {
    var rate = Math.min(sdiRate(outType) || 0, sdiRate(inType) || 0) || sdiRate(outType) || sdiRate(inType) || 0;
    if (rate >= 12) return "12G-SDI";
    if (rate >= 6) return "6G-SDI";
    if (rate >= 3) return "3G-SDI";
    if (rate >= 1.5) return "1.5G-SDI";
    return "SDI";
  }
  if (/HDMI/i.test(outType)) return "HDMI";
  if (/SDI/i.test(outType)) return "SDI";
  return "";
}
function updateBatteryPlateVisibility() {
  ensureBatteryPlateElements();
  var camName = typeof (cameraSelect === null || cameraSelect === void 0 ? void 0 : cameraSelect.value) === 'string' ? cameraSelect.value : '';
  var plates = typeof getAvailableBatteryPlates === 'function' ? getAvailableBatteryPlates(camName) : [];
  var applyDependentUpdates = function applyDependentUpdates() {
    updateViewfinderSettingsVisibility();
    updateViewfinderExtensionVisibility();
    updateMonitoringConfigurationOptions();
  };
  if (!batteryPlateSelect || !batteryPlateRow) {
    if (batteryPlateRow && typeof batteryPlateRow.style !== 'undefined') {
      batteryPlateRow.style.display = 'none';
    }
    if (batteryPlateSelect) {
      batteryPlateSelect.value = '';
    }
    applyDependentUpdates();
    return;
  }
  var current = typeof batteryPlateSelect.value === 'string' ? batteryPlateSelect.value : '';
  batteryPlateSelect.innerHTML = '';
  if (Array.isArray(plates) && plates.length) {
    plates.forEach(function (pt) {
      var opt = document.createElement('option');
      opt.value = pt;
      opt.textContent = pt;
      batteryPlateSelect.appendChild(opt);
    });
    var def = current;
    if (!plates.includes(def)) {
      def = plates.includes('V-Mount') ? 'V-Mount' : plates[0];
    }
    batteryPlateSelect.value = def;
    batteryPlateRow.style.display = '';
  } else {
    batteryPlateRow.style.display = 'none';
    batteryPlateSelect.value = '';
  }
  applyDependentUpdates();
}
function updateViewfinderSettingsVisibility() {
  var _devices3;
  var cam = (_devices3 = devices) === null || _devices3 === void 0 || (_devices3 = _devices3.cameras) === null || _devices3 === void 0 ? void 0 : _devices3[cameraSelect === null || cameraSelect === void 0 ? void 0 : cameraSelect.value];
  var hasViewfinder = Array.isArray(cam === null || cam === void 0 ? void 0 : cam.viewfinder) && cam.viewfinder.length > 0;
  var config = monitoringConfigurationSelect === null || monitoringConfigurationSelect === void 0 ? void 0 : monitoringConfigurationSelect.value;
  var show = hasViewfinder && (config === 'Viewfinder only' || config === 'Viewfinder and Onboard');
  if (viewfinderSettingsRow) {
    if (show) {
      viewfinderSettingsRow.classList.remove('hidden');
    } else {
      viewfinderSettingsRow.classList.add('hidden');
      var vfSelect = document.getElementById('viewfinderSettings');
      if (vfSelect) {
        Array.from(vfSelect.options).forEach(function (o) {
          o.selected = false;
        });
      }
    }
  }
}
function updateMonitoringConfigurationOptions() {
  var _devices4;
  if (!monitoringConfigurationSelect) return;
  var cam = (_devices4 = devices) === null || _devices4 === void 0 || (_devices4 = _devices4.cameras) === null || _devices4 === void 0 ? void 0 : _devices4[cameraSelect === null || cameraSelect === void 0 ? void 0 : cameraSelect.value];
  var hasViewfinder = Array.isArray(cam === null || cam === void 0 ? void 0 : cam.viewfinder) && cam.viewfinder.length > 0;
  var monitorSelected = monitorSelect && monitorSelect.value && monitorSelect.value !== 'None';
  var vfOnlyOption = Array.from(monitoringConfigurationSelect.options || []).find(function (o) {
    return o.value === 'Viewfinder only';
  });
  if (!vfOnlyOption) return;
  var show = hasViewfinder && !monitorSelected;
  vfOnlyOption.hidden = !show;
  if (monitoringConfigurationUserChanged) {
    if (!show && monitoringConfigurationSelect.value === 'Viewfinder only') {
      monitoringConfigurationSelect.value = hasViewfinder ? 'Viewfinder and Onboard' : 'Onboard Only';
    }
    updateViewfinderSettingsVisibility();
    return;
  }
  if (monitorSelected) {
    monitoringConfigurationSelect.value = hasViewfinder ? 'Viewfinder and Onboard' : 'Onboard Only';
  } else if (!hasViewfinder) {
    monitoringConfigurationSelect.value = 'Onboard Only';
  } else {
    monitoringConfigurationSelect.value = 'Viewfinder only';
  }
  updateViewfinderSettingsVisibility();
}
function updateViewfinderExtensionVisibility() {
  var _devices5;
  var cam = (_devices5 = devices) === null || _devices5 === void 0 || (_devices5 = _devices5.cameras) === null || _devices5 === void 0 ? void 0 : _devices5[cameraSelect === null || cameraSelect === void 0 ? void 0 : cameraSelect.value];
  var hasViewfinder = Array.isArray(cam === null || cam === void 0 ? void 0 : cam.viewfinder) && cam.viewfinder.length > 0;
  if (viewfinderExtensionRow) {
    if (hasViewfinder) {
      viewfinderExtensionRow.classList.remove('hidden');
    } else {
      viewfinderExtensionRow.classList.add('hidden');
      var vfExtSel = document.getElementById('viewfinderExtension');
      if (vfExtSel) {
        vfExtSel.value = '';
      }
    }
  }
}
function updateBatteryLabel() {
  var label = document.getElementById('batteryLabel');
  if (!label) return;
  var langTexts = getLanguageTexts(currentLang);
  var fallbackTexts = getLanguageTexts(DEFAULT_LANGUAGE_SAFE);
  var helpText = resolveTextEntryInternal(langTexts, fallbackTexts, 'batterySelectHelp', '');
  if (helpText) {
    label.setAttribute('data-help', helpText);
  } else {
    label.removeAttribute('data-help');
  }
  if (getSelectedPlate() === 'B-Mount') {
    label.textContent = resolveTextEntryInternal(langTexts, fallbackTexts, 'batteryBMountLabel', 'B-Mount Battery:');
  } else {
    label.textContent = resolveTextEntryInternal(langTexts, fallbackTexts, 'batteryLabel', 'Battery:');
  }
}
var localParseBatteryCurrentLimit = function localParseBatteryCurrentLimit(value) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value === 'string') {
    var trimmed = value.trim();
    if (!trimmed) {
      return null;
    }
    var normalized = trimmed.replace(/,/g, '.');
    var parsed = parseFloat(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};
function updateBatteryOptions() {
  var current = batterySelect.value;
  var currentSwap = hotswapSelect.value;
  var plate = getSelectedPlate();
  var camName = cameraSelect.value;
  var supportsB = supportsBMountCamera(camName);
  var supportsGold = supportsGoldMountCamera(camName);
  var swaps;
  if (plate === 'B-Mount') {
    populateSelect(batterySelect, getBatteriesByMount('B-Mount'), true);
    swaps = getHotswapsByMount('B-Mount');
  } else if (plate === 'V-Mount') {
    populateSelect(batterySelect, getBatteriesByMount('V-Mount'), true);
    swaps = getHotswapsByMount('V-Mount');
  } else if (plate === 'Gold-Mount') {
    populateSelect(batterySelect, getBatteriesByMount('Gold-Mount'), true);
    swaps = getHotswapsByMount('Gold-Mount');
  } else {
    var bats = devices.batteries || {};
    if (!supportsB) {
      bats = Object.fromEntries(Object.entries(bats).filter(function (_ref10) {
        var _ref11 = _slicedToArray(_ref10, 2),
          b = _ref11[1];
        return b.mount_type !== 'B-Mount';
      }));
    }
    if (!supportsGold) {
      bats = Object.fromEntries(Object.entries(bats).filter(function (_ref12) {
        var _ref13 = _slicedToArray(_ref12, 2),
          b = _ref13[1];
        return b.mount_type !== 'Gold-Mount';
      }));
    }
    populateSelect(batterySelect, bats, true);
    swaps = devices.batteryHotswaps || {};
    if (!supportsB) {
      swaps = Object.fromEntries(Object.entries(swaps).filter(function (_ref14) {
        var _ref15 = _slicedToArray(_ref14, 2),
          b = _ref15[1];
        return b.mount_type !== 'B-Mount';
      }));
    }
    if (!supportsGold) {
      swaps = Object.fromEntries(Object.entries(swaps).filter(function (_ref16) {
        var _ref17 = _slicedToArray(_ref16, 2),
          b = _ref17[1];
        return b.mount_type !== 'Gold-Mount';
      }));
    }
  }
  if (!/FXLion Nano/i.test(current)) {
    swaps = Object.fromEntries(Object.entries(swaps).filter(function (_ref18) {
      var _ref19 = _slicedToArray(_ref18, 1),
        name = _ref19[0];
      return name !== 'FX-Lion NANO Dual V-Mount Hot-Swap Plate';
    }));
  }
  var totalCurrentLow = totalCurrent12Elem && typeof totalCurrent12Elem.textContent === 'string' ? parseFloat(totalCurrent12Elem.textContent) : 0;
  if (isFinite(totalCurrentLow) && totalCurrentLow > 0) {
    swaps = Object.fromEntries(Object.entries(swaps).filter(function (_ref20) {
      var _ref21 = _slicedToArray(_ref20, 2),
        info = _ref21[1];
      var pinLimit = localParseBatteryCurrentLimit(info && info.pinA);
      return !Number.isFinite(pinLimit) || pinLimit >= totalCurrentLow;
    }));
  }
  populateSelect(hotswapSelect, swaps, true);
  if (Array.from(batterySelect.options).some(function (o) {
    return o.value === current;
  })) {
    batterySelect.value = current;
  }
  if (typeof updateFavoriteButton === 'function') {
    updateFavoriteButton(batterySelect);
  } else if (typeof enqueueCoreBootTask === 'function') {
    enqueueCoreBootTask(function () {
      if (typeof updateFavoriteButton === 'function') {
        updateFavoriteButton(batterySelect);
      }
    });
  }
  if (Array.from(hotswapSelect.options).some(function (o) {
    return o.value === currentSwap;
  })) {
    hotswapSelect.value = currentSwap;
  }
  if (typeof updateFavoriteButton === 'function') {
    updateFavoriteButton(hotswapSelect);
  } else if (typeof enqueueCoreBootTask === 'function') {
    enqueueCoreBootTask(function () {
      if (typeof updateFavoriteButton === 'function') {
        updateFavoriteButton(hotswapSelect);
      }
    });
  }
  updateBatteryLabel();
}
var BRAND_KEYWORDS = {
  arri: 'arri',
  cmotion: 'cmotion',
  focusbug: 'focusbug',
  tilta: 'tilta',
  preston: 'preston',
  chrosziel: 'chrosziel',
  smallrig: 'smallrig',
  dji: 'dji',
  redrock: 'redrock',
  teradek: 'teradek'
};
function detectBrand(name) {
  if (!name) return null;
  var n = String(name).trim().toLowerCase();
  if (n === 'none') return null;
  for (var _i6 = 0, _Object$entries5 = Object.entries(BRAND_KEYWORDS); _i6 < _Object$entries5.length; _i6++) {
    var _Object$entries5$_i = _slicedToArray(_Object$entries5[_i6], 2),
      keyword = _Object$entries5$_i[0],
      brand = _Object$entries5$_i[1];
    if (n.includes(keyword)) return brand;
  }
  return 'other';
}
var STATUS_CLASS_BY_LEVEL = {
  info: 'status-message--info',
  success: 'status-message--success',
  note: 'status-message--note',
  warning: 'status-message--warning',
  danger: 'status-message--danger'
};
function setStatusLevel(element, level) {
  if (!element) return;
  var severityClasses = Object.values(STATUS_CLASS_BY_LEVEL);
  if (element.classList) {
    severityClasses.forEach(function (cls) {
      return element.classList.remove(cls);
    });
  } else if (typeof element.className === 'string') {
    var remaining = element.className.split(/\s+/).filter(Boolean).filter(function (cls) {
      return !severityClasses.includes(cls);
    });
    element.className = remaining.join(' ');
  }
  var normalized = level && STATUS_CLASS_BY_LEVEL[level] ? level : null;
  if (normalized) {
    var severityClass = STATUS_CLASS_BY_LEVEL[normalized];
    if (element.classList) {
      if (!element.classList.contains('status-message')) {
        element.classList.add('status-message');
      }
      element.classList.add(severityClass);
    } else if (typeof element.className === 'string') {
      var classes = element.className.split(/\s+/).filter(Boolean);
      if (!classes.includes('status-message')) {
        classes.push('status-message');
      }
      classes.push(severityClass);
      element.className = Array.from(new Set(classes)).join(' ');
    }
    if (element.dataset) {
      element.dataset.statusLevel = normalized;
    } else if (element.setAttribute) {
      element.setAttribute('data-status-level', normalized);
    }
  } else if (element.dataset && 'statusLevel' in element.dataset) {
    delete element.dataset.statusLevel;
  } else if (element.removeAttribute) {
    element.removeAttribute('data-status-level');
  }
}
function formatStatusMessage(message) {
  if (typeof message !== 'string' || message.length === 0) {
    return '';
  }
  var match = message.match(/^([A-Z\xC0-\xD6\xD8-\xDD]+(?:[\t-\r \x2D\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF][A-Z\xC0-\xD6\xD8-\xDD]+)*)([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*:)([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*)/);
  if (match) {
    var _match = _slicedToArray(match, 4),
      label = _match[1],
      colonPart = _match[2],
      trailingSpace = _match[3];
    var rest = message.slice(match[0].length);
    return "<strong>".concat(escapeHtml(label)).concat(escapeHtml(colonPart), "</strong>").concat(escapeHtml(trailingSpace)).concat(escapeHtml(rest));
  }
  return escapeHtml(message);
}
function setStatusMessage(element, message) {
  if (!element) return;
  if (!message) {
    element.textContent = '';
    return;
  }
  element.innerHTML = formatStatusMessage(message);
}
function formatCurrentValue(value) {
  if (!Number.isFinite(value)) return '0';
  var rounded = Number.parseFloat(value.toFixed(2));
  if (Number.isNaN(rounded)) return '0';
  return rounded.toString();
}
function checkFizCompatibility() {
  var brands = new Set();
  motorSelects.forEach(function (sel) {
    var b = detectBrand(sel.value);
    if (b) brands.add(b);
  });
  controllerSelects.forEach(function (sel) {
    var b = detectBrand(sel.value);
    if (b) brands.add(b);
  });
  var distB = detectBrand(distanceSelect.value);
  if (distB) brands.add(distB);
  var cameraBrand = detectBrand(cameraSelect.value);
  var compatElem = document.getElementById('compatWarning');
  if (!compatElem) return;
  var langTexts = getLanguageTexts(currentLang);
  var fallbackTexts = getLanguageTexts(DEFAULT_LANGUAGE_SAFE);
  var incompatible = false;
  var arr = Array.from(brands);
  if (cameraBrand === 'dji' && arr.some(function (b) {
    return b && b !== 'dji';
  })) {
    incompatible = true;
  } else if (arr.length > 1) {
    var allowed = ['arri', 'cmotion', 'focusbug'];
    if (arr.every(function (b) {
      return allowed.includes(b);
    })) {
      incompatible = false;
    } else {
      var filtered = arr.filter(function (b) {
        return b !== 'other';
      });
      var distinct = new Set(filtered);
      if (distinct.size > 1) incompatible = true;
    }
  }
  if (incompatible) {
    var warning = resolveTextEntryInternal(langTexts, fallbackTexts, 'incompatibleFIZWarning', '');
    setStatusMessage(compatElem, warning);
    setStatusLevel(compatElem, 'danger');
  } else {
    setStatusMessage(compatElem, '');
    setStatusLevel(compatElem, null);
  }
}
function checkFizController() {
  var compatElem = document.getElementById('compatWarning');
  if (!compatElem) return;
  var motors = motorSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  });
  if (!motors.length) return;
  var controllers = controllerSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  });
  var camName = cameraSelect.value;
  var cam = (devices.cameras || {})[camName];
  var isAmira = /Arri Amira/i.test(camName);
  var onlyCforceMiniPlus = motors.length > 0 && motors.every(function (n) {
    var lower = n.toLowerCase();
    return lower.includes('cforce mini') && !lower.includes('rf') || lower.includes('cforce plus');
  });
  var hasRemoteController = controllers.some(function (n) {
    return /ria-1|umc-4|cforce.*rf/i.test(n);
  }) || motors.some(function (n) {
    return /cforce.*rf/i.test(n);
  });
  if (isAmira && onlyCforceMiniPlus && !hasRemoteController) {
    var langTexts = getLanguageTexts(currentLang);
    var fallbackTexts = getLanguageTexts(DEFAULT_LANGUAGE_SAFE);
    var warning = resolveTextEntryInternal(langTexts, fallbackTexts, 'amiraCforceRemoteWarning', '');
    setStatusMessage(compatElem, warning);
    setStatusLevel(compatElem, 'danger');
    return;
  }
  var cameraHasLBUS = Array.isArray(cam === null || cam === void 0 ? void 0 : cam.fizConnectors) && cam.fizConnectors.some(function (fc) {
    return /LBUS/i.test(fc.type);
  });
  var hasController = cameraHasLBUS && /arri/i.test(camName);
  controllers.forEach(function (name) {
    var c = devices.fiz.controllers[name];
    if (!c) return;
    var connStr = (c.fizConnectors || []).map(function (fc) {
      return fc.type;
    }).join(', ');
    if (/CAM|SERIAL|Motor/i.test(connStr)) hasController = true;
    if (c.internalController) hasController = true;
  });
  motors.forEach(function (name) {
    var m = devices.fiz.motors[name];
    if (m && m.internalController) hasController = true;
  });
  var needController = motors.some(function (name) {
    var m = devices.fiz.motors[name];
    return m && m.internalController === false;
  });
  if (needController && !hasController) {
    var _langTexts = getLanguageTexts(currentLang);
    var _fallbackTexts = getLanguageTexts(DEFAULT_LANGUAGE_SAFE);
    var _warning = resolveTextEntryInternal(_langTexts, _fallbackTexts, 'missingFIZControllerWarning', '');
    setStatusMessage(compatElem, _warning);
    setStatusLevel(compatElem, 'danger');
  }
}
function checkArriCompatibility() {
  var compatElem = document.getElementById('compatWarning');
  if (!compatElem || compatElem.textContent) return;
  var motors = motorSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  });
  motors.sort(function (a, b) {
    return motorPriority(a) - motorPriority(b);
  });
  var internalIdx = motors.findIndex(function (name) {
    var _devices$fiz11;
    return (_devices$fiz11 = devices.fiz) === null || _devices$fiz11 === void 0 || (_devices$fiz11 = _devices$fiz11.motors) === null || _devices$fiz11 === void 0 || (_devices$fiz11 = _devices$fiz11[name]) === null || _devices$fiz11 === void 0 ? void 0 : _devices$fiz11.internalController;
  });
  var hasInternalMotor = internalIdx !== -1;
  if (hasInternalMotor && internalIdx > 0) {
    var _motors$splice = motors.splice(internalIdx, 1),
      _motors$splice2 = _slicedToArray(_motors$splice, 1),
      m = _motors$splice2[0];
    motors.unshift(m);
  }
  var controllers = controllerSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  });
  controllers.sort(function (a, b) {
    return controllerPriority(a) - controllerPriority(b);
  });
  var distance = distanceSelect.value;
  var camName = cameraSelect.value;
  var cam = (devices.cameras || {})[camName];
  var cameraHasLBUS = Array.isArray(cam === null || cam === void 0 ? void 0 : cam.fizConnectors) && cam.fizConnectors.some(function (fc) {
    return /LBUS/i.test(fc.type);
  });
  var builtInController = cameraHasLBUS && /arri/i.test(camName);
  var usesUMC4 = controllers.some(function (n) {
    return /UMC-4/i.test(n);
  });
  var usesRIA1 = controllers.some(function (n) {
    return /RIA-1/i.test(n);
  });
  var usesRF = controllers.some(function (n) {
    return /cforce.*rf/i.test(n);
  }) || motors.some(function (m) {
    return /cforce.*rf/i.test(m);
  });
  var camCounts = /(Alexa Mini LF|Alexa Mini|Alexa 35)/i.test(camName);
  var onlyMasterGrip = controllers.length > 0 && controllers.every(function (n) {
    return /Master Grip/i.test(n);
  }) && !camCounts;
  var msg = '';
  var clmRegex = /CLM-[345]/i;
  var hasCLM = motors.some(function (m) {
    return clmRegex.test(m);
  });
  if (hasCLM && !usesUMC4) {
    msg = resolveTextEntryInternal(getLanguageTexts(currentLang), getLanguageTexts(DEFAULT_LANGUAGE_SAFE), 'arriCLMNoUMC4Warning', '');
  } else if (usesUMC4 && motors.some(function (m) {
    return !clmRegex.test(m);
  })) {
    msg = resolveTextEntryInternal(getLanguageTexts(currentLang), getLanguageTexts(DEFAULT_LANGUAGE_SAFE), 'arriUMC4Warning', '');
  } else if ((usesRIA1 || usesRF) && motors.some(function (m) {
    return clmRegex.test(m);
  })) {
    msg = resolveTextEntryInternal(getLanguageTexts(currentLang), getLanguageTexts(DEFAULT_LANGUAGE_SAFE), 'arriRIA1Warning', '');
  } else if (distance && distance !== 'None' && !/DJI LiDAR/i.test(distance) && !(usesUMC4 || usesRIA1 || usesRF || builtInController)) {
    msg = resolveTextEntryInternal(getLanguageTexts(currentLang), getLanguageTexts(DEFAULT_LANGUAGE_SAFE), 'distanceControllerWarning', '');
  } else if (onlyMasterGrip && !usesRF) {
    msg = resolveTextEntryInternal(getLanguageTexts(currentLang), getLanguageTexts(DEFAULT_LANGUAGE_SAFE), 'masterGripWirelessWarning', '');
  }
  if (msg) {
    setStatusMessage(compatElem, msg);
    var langTexts = getLanguageTexts(currentLang);
    var fallbackTexts = getLanguageTexts(DEFAULT_LANGUAGE_SAFE);
    var umcWarning = resolveTextEntryInternal(langTexts, fallbackTexts, 'arriUMC4Warning', '');
    if (msg === umcWarning && umcWarning) {
      setStatusLevel(compatElem, 'warning');
    } else {
      setStatusLevel(compatElem, 'danger');
    }
  }
}
var gearItemTranslations = {};
function resolveTranslationsRuntime() {
  var candidateScopes = [];
  function resolveGlobalScopeForTranslations() {
    if (typeof globalThis !== 'undefined' && globalThis) {
      return globalThis;
    }
    if (typeof window !== 'undefined' && window) {
      return window;
    }
    if (typeof self !== 'undefined' && self) {
      return self;
    }
    if (typeof global !== 'undefined' && global) {
      return global;
    }
    return null;
  }
  try {
    candidateScopes.push(typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null);
  } catch (coreScopeError) {
    void coreScopeError;
  }
  candidateScopes.push(resolveGlobalScopeForTranslations());
  for (var index = 0; index < candidateScopes.length; index += 1) {
    var scope = candidateScopes[index];
    if (!scope || _typeof(scope) !== 'object') {
      continue;
    }
    try {
      var runtime = scope.translations;
      if (runtime && typeof runtime.loadLanguage === 'function') {
        return runtime;
      }
    } catch (scopeError) {
      void scopeError;
    }
  }
  if (typeof translations !== 'undefined' && translations && typeof translations.loadLanguage === 'function') {
    return translations;
  }
  if (typeof require === 'function') {
    try {
      var requiredTranslations = require('./translations.js');
      if (requiredTranslations && typeof requiredTranslations.loadLanguage === 'function') {
        return requiredTranslations;
      }
    } catch (runtimeRequireError) {
      console.warn('Failed to resolve translations runtime via require', runtimeRequireError);
    }
  }
  return null;
}
var translationsRuntime = resolveTranslationsRuntime();
if (typeof texts === 'undefined') {
  var translations = null;
  var globalScope = function resolveGlobalScopeFallback() {
    if (typeof globalThis !== 'undefined' && globalThis) {
      return globalThis;
    }
    if (typeof window !== 'undefined' && window) {
      return window;
    }
    if (typeof self !== 'undefined' && self) {
      return self;
    }
    if (typeof global !== 'undefined' && global) {
      return global;
    }
    return null;
  }();
  if (translationsRuntime && translationsRuntime.texts && translationsRuntime.categoryNames && translationsRuntime.gearItems) {
    translations = {
      texts: translationsRuntime.texts,
      categoryNames: translationsRuntime.categoryNames,
      gearItems: translationsRuntime.gearItems
    };
  } else if (globalScope && globalScope.texts && globalScope.categoryNames && globalScope.gearItems) {
    translations = {
      texts: globalScope.texts,
      categoryNames: globalScope.categoryNames,
      gearItems: globalScope.gearItems
    };
  }
  if (translations) {
    if (globalScope) {
      if (!globalScope.texts && translations.texts) {
        globalScope.texts = translations.texts;
      }
      if (!globalScope.categoryNames && translations.categoryNames) {
        globalScope.categoryNames = translations.categoryNames;
      }
      if (!globalScope.gearItems && translations.gearItems) {
        globalScope.gearItems = translations.gearItems;
      }
    }
    gearItemTranslations = translations.gearItems || {};
  } else {
    gearItemTranslations = {};
  }
} else {
  gearItemTranslations = typeof gearItems !== 'undefined' ? gearItems : {};
}
var autoGearHeadingElem = document.getElementById('autoGearHeading');
var autoGearDescriptionElem = document.getElementById('autoGearDescription');
var autoGearMonitorDefaultsSection = document.getElementById('autoGearMonitorDefaultsSection');
var autoGearMonitorDefaultsHeading = document.getElementById('autoGearMonitorDefaultsHeading');
var autoGearMonitorDefaultsDescription = document.getElementById('autoGearMonitorDefaultsDescription');
var autoGearDefaultFocusMonitorSelect = document.getElementById('autoGearDefaultFocusMonitor');
var autoGearDefaultHandheldMonitorSelect = document.getElementById('autoGearDefaultHandheldMonitor');
var autoGearDefaultComboMonitorSelect = document.getElementById('autoGearDefaultComboMonitor');
var autoGearDefaultDirectorMonitorSelect = document.getElementById('autoGearDefaultDirectorMonitor');
var autoGearDefaultFocusMonitorLabel = document.getElementById('autoGearDefaultFocusMonitorLabel');
var autoGearDefaultHandheldMonitorLabel = document.getElementById('autoGearDefaultHandheldMonitorLabel');
var autoGearDefaultComboMonitorLabel = document.getElementById('autoGearDefaultComboMonitorLabel');
var autoGearDefaultDirectorMonitorLabel = document.getElementById('autoGearDefaultDirectorMonitorLabel');
var autoGearMonitorDefaultControls = [{
  key: 'focus',
  select: autoGearDefaultFocusMonitorSelect,
  label: autoGearDefaultFocusMonitorLabel
}, {
  key: 'handheld7',
  select: autoGearDefaultHandheldMonitorSelect,
  label: autoGearDefaultHandheldMonitorLabel
}, {
  key: 'combo15',
  select: autoGearDefaultComboMonitorSelect,
  label: autoGearDefaultComboMonitorLabel
}, {
  key: 'director15',
  select: autoGearDefaultDirectorMonitorSelect,
  label: autoGearDefaultDirectorMonitorLabel
}];
autoGearMonitorDefaultControls.forEach(function (control) {
  if (!control || !control.select) return;
  control.select.addEventListener('change', function (event) {
    setAutoGearMonitorDefault(control.key, event.target.value);
  });
});
var autoGearSearchInput = document.getElementById('autoGearSearch');
var autoGearSearchLabel = document.getElementById('autoGearSearchLabel');
var autoGearFilterScenarioLabel = document.getElementById('autoGearFilterScenarioLabel');
var autoGearFilterScenarioSelect = document.getElementById('autoGearFilterScenario');
var autoGearFilterClearButton = document.getElementById('autoGearFilterClear');
var autoGearSummarySection = document.getElementById('autoGearSummary');
var autoGearSummaryHeadingElem = document.getElementById('autoGearSummaryHeading');
var autoGearSummaryDescriptionElem = document.getElementById('autoGearSummaryDescription');
var autoGearSummaryCards = document.getElementById('autoGearSummaryCards');
var autoGearSummaryDetails = document.getElementById('autoGearSummaryDetails');
var autoGearRulesList = document.getElementById('autoGearRulesList');
var autoGearPresetDescription = document.getElementById('autoGearPresetDescription');
var autoGearPresetLabel = document.getElementById('autoGearPresetLabel');
var autoGearPresetSelect = document.getElementById('autoGearPresetSelect');
var autoGearSavePresetButton = document.getElementById('autoGearSavePreset');
var autoGearDeletePresetButton = document.getElementById('autoGearDeletePreset');
var autoGearAddRuleBtn = document.getElementById('autoGearAddRule');
var autoGearResetFactoryButton = document.getElementById('autoGearResetFactory');
var autoGearEditor = document.getElementById('autoGearEditor');
var autoGearConditionControls = document.getElementById('autoGearConditionControls');
var autoGearConditionSelectLabel = document.getElementById('autoGearConditionSelectLabel');
var autoGearConditionSelect = document.getElementById('autoGearConditionSelect');
var autoGearConditionAddButton = document.getElementById('autoGearConditionAdd');
var autoGearConditionList = document.getElementById('autoGearConditionList');
var autoGearAlwaysLabel = document.getElementById('autoGearAlwaysLabel');
var autoGearAlwaysHelp = document.getElementById('autoGearAlwaysHelp');
var autoGearCameraWeightSection = document.getElementById('autoGearCondition-cameraWeight');
var autoGearConditionAddShortcuts = {
  always: ((_localAutoGearConditi = localAutoGearConditionSections.always) === null || _localAutoGearConditi === void 0 ? void 0 : _localAutoGearConditi.querySelector('.auto-gear-condition-add')) || null,
  scenarios: ((_localAutoGearConditi2 = localAutoGearConditionSections.scenarios) === null || _localAutoGearConditi2 === void 0 ? void 0 : _localAutoGearConditi2.querySelector('.auto-gear-condition-add')) || null,
  shootingDays: ((_localAutoGearConditi3 = localAutoGearConditionSections.shootingDays) === null || _localAutoGearConditi3 === void 0 ? void 0 : _localAutoGearConditi3.querySelector('.auto-gear-condition-add')) || null,
  mattebox: ((_localAutoGearConditi4 = localAutoGearConditionSections.mattebox) === null || _localAutoGearConditi4 === void 0 ? void 0 : _localAutoGearConditi4.querySelector('.auto-gear-condition-add')) || null,
  cameraHandle: ((_localAutoGearConditi5 = localAutoGearConditionSections.cameraHandle) === null || _localAutoGearConditi5 === void 0 ? void 0 : _localAutoGearConditi5.querySelector('.auto-gear-condition-add')) || null,
  viewfinderExtension: ((_localAutoGearConditi6 = localAutoGearConditionSections.viewfinderExtension) === null || _localAutoGearConditi6 === void 0 ? void 0 : _localAutoGearConditi6.querySelector('.auto-gear-condition-add')) || null,
  deliveryResolution: ((_localAutoGearConditi7 = localAutoGearConditionSections.deliveryResolution) === null || _localAutoGearConditi7 === void 0 ? void 0 : _localAutoGearConditi7.querySelector('.auto-gear-condition-add')) || null,
  videoDistribution: ((_localAutoGearConditi8 = localAutoGearConditionSections.videoDistribution) === null || _localAutoGearConditi8 === void 0 ? void 0 : _localAutoGearConditi8.querySelector('.auto-gear-condition-add')) || null,
  camera: ((_localAutoGearConditi9 = localAutoGearConditionSections.camera) === null || _localAutoGearConditi9 === void 0 ? void 0 : _localAutoGearConditi9.querySelector('.auto-gear-condition-add')) || null,
  ownGear: ((_localAutoGearConditi0 = localAutoGearConditionSections.ownGear) === null || _localAutoGearConditi0 === void 0 ? void 0 : _localAutoGearConditi0.querySelector('.auto-gear-condition-add')) || null,
  cameraWeight: ((_localAutoGearConditi1 = localAutoGearConditionSections.cameraWeight) === null || _localAutoGearConditi1 === void 0 ? void 0 : _localAutoGearConditi1.querySelector('.auto-gear-condition-add')) || null,
  monitor: ((_localAutoGearConditi10 = localAutoGearConditionSections.monitor) === null || _localAutoGearConditi10 === void 0 ? void 0 : _localAutoGearConditi10.querySelector('.auto-gear-condition-add')) || null,
  tripodHeadBrand: ((_localAutoGearConditi11 = localAutoGearConditionSections.tripodHeadBrand) === null || _localAutoGearConditi11 === void 0 ? void 0 : _localAutoGearConditi11.querySelector('.auto-gear-condition-add')) || null,
  tripodBowl: ((_localAutoGearConditi12 = localAutoGearConditionSections.tripodBowl) === null || _localAutoGearConditi12 === void 0 ? void 0 : _localAutoGearConditi12.querySelector('.auto-gear-condition-add')) || null,
  tripodTypes: ((_localAutoGearConditi13 = localAutoGearConditionSections.tripodTypes) === null || _localAutoGearConditi13 === void 0 ? void 0 : _localAutoGearConditi13.querySelector('.auto-gear-condition-add')) || null,
  tripodSpreader: ((_localAutoGearConditi14 = localAutoGearConditionSections.tripodSpreader) === null || _localAutoGearConditi14 === void 0 ? void 0 : _localAutoGearConditi14.querySelector('.auto-gear-condition-add')) || null,
  crewPresent: ((_localAutoGearConditi15 = localAutoGearConditionSections.crewPresent) === null || _localAutoGearConditi15 === void 0 ? void 0 : _localAutoGearConditi15.querySelector('.auto-gear-condition-add')) || null,
  crewAbsent: ((_localAutoGearConditi16 = localAutoGearConditionSections.crewAbsent) === null || _localAutoGearConditi16 === void 0 ? void 0 : _localAutoGearConditi16.querySelector('.auto-gear-condition-add')) || null,
  wireless: ((_localAutoGearConditi17 = localAutoGearConditionSections.wireless) === null || _localAutoGearConditi17 === void 0 ? void 0 : _localAutoGearConditi17.querySelector('.auto-gear-condition-add')) || null,
  motors: ((_localAutoGearConditi18 = localAutoGearConditionSections.motors) === null || _localAutoGearConditi18 === void 0 ? void 0 : _localAutoGearConditi18.querySelector('.auto-gear-condition-add')) || null,
  controllers: ((_localAutoGearConditi19 = localAutoGearConditionSections.controllers) === null || _localAutoGearConditi19 === void 0 ? void 0 : _localAutoGearConditi19.querySelector('.auto-gear-condition-add')) || null,
  distance: ((_localAutoGearConditi20 = localAutoGearConditionSections.distance) === null || _localAutoGearConditi20 === void 0 ? void 0 : _localAutoGearConditi20.querySelector('.auto-gear-condition-add')) || null
};
var autoGearConditionRemoveButtons = {
  always: ((_localAutoGearConditi21 = localAutoGearConditionSections.always) === null || _localAutoGearConditi21 === void 0 ? void 0 : _localAutoGearConditi21.querySelector('.auto-gear-condition-remove')) || null,
  scenarios: ((_localAutoGearConditi22 = localAutoGearConditionSections.scenarios) === null || _localAutoGearConditi22 === void 0 ? void 0 : _localAutoGearConditi22.querySelector('.auto-gear-condition-remove')) || null,
  shootingDays: ((_localAutoGearConditi23 = localAutoGearConditionSections.shootingDays) === null || _localAutoGearConditi23 === void 0 ? void 0 : _localAutoGearConditi23.querySelector('.auto-gear-condition-remove')) || null,
  mattebox: ((_localAutoGearConditi24 = localAutoGearConditionSections.mattebox) === null || _localAutoGearConditi24 === void 0 ? void 0 : _localAutoGearConditi24.querySelector('.auto-gear-condition-remove')) || null,
  cameraHandle: ((_localAutoGearConditi25 = localAutoGearConditionSections.cameraHandle) === null || _localAutoGearConditi25 === void 0 ? void 0 : _localAutoGearConditi25.querySelector('.auto-gear-condition-remove')) || null,
  viewfinderExtension: ((_localAutoGearConditi26 = localAutoGearConditionSections.viewfinderExtension) === null || _localAutoGearConditi26 === void 0 ? void 0 : _localAutoGearConditi26.querySelector('.auto-gear-condition-remove')) || null,
  deliveryResolution: ((_localAutoGearConditi27 = localAutoGearConditionSections.deliveryResolution) === null || _localAutoGearConditi27 === void 0 ? void 0 : _localAutoGearConditi27.querySelector('.auto-gear-condition-remove')) || null,
  videoDistribution: ((_localAutoGearConditi28 = localAutoGearConditionSections.videoDistribution) === null || _localAutoGearConditi28 === void 0 ? void 0 : _localAutoGearConditi28.querySelector('.auto-gear-condition-remove')) || null,
  camera: ((_localAutoGearConditi29 = localAutoGearConditionSections.camera) === null || _localAutoGearConditi29 === void 0 ? void 0 : _localAutoGearConditi29.querySelector('.auto-gear-condition-remove')) || null,
  ownGear: ((_localAutoGearConditi30 = localAutoGearConditionSections.ownGear) === null || _localAutoGearConditi30 === void 0 ? void 0 : _localAutoGearConditi30.querySelector('.auto-gear-condition-remove')) || null,
  cameraWeight: ((_localAutoGearConditi31 = localAutoGearConditionSections.cameraWeight) === null || _localAutoGearConditi31 === void 0 ? void 0 : _localAutoGearConditi31.querySelector('.auto-gear-condition-remove')) || null,
  monitor: ((_localAutoGearConditi32 = localAutoGearConditionSections.monitor) === null || _localAutoGearConditi32 === void 0 ? void 0 : _localAutoGearConditi32.querySelector('.auto-gear-condition-remove')) || null,
  tripodHeadBrand: ((_localAutoGearConditi33 = localAutoGearConditionSections.tripodHeadBrand) === null || _localAutoGearConditi33 === void 0 ? void 0 : _localAutoGearConditi33.querySelector('.auto-gear-condition-remove')) || null,
  tripodBowl: ((_localAutoGearConditi34 = localAutoGearConditionSections.tripodBowl) === null || _localAutoGearConditi34 === void 0 ? void 0 : _localAutoGearConditi34.querySelector('.auto-gear-condition-remove')) || null,
  tripodTypes: ((_localAutoGearConditi35 = localAutoGearConditionSections.tripodTypes) === null || _localAutoGearConditi35 === void 0 ? void 0 : _localAutoGearConditi35.querySelector('.auto-gear-condition-remove')) || null,
  tripodSpreader: ((_localAutoGearConditi36 = localAutoGearConditionSections.tripodSpreader) === null || _localAutoGearConditi36 === void 0 ? void 0 : _localAutoGearConditi36.querySelector('.auto-gear-condition-remove')) || null,
  crewPresent: ((_localAutoGearConditi37 = localAutoGearConditionSections.crewPresent) === null || _localAutoGearConditi37 === void 0 ? void 0 : _localAutoGearConditi37.querySelector('.auto-gear-condition-remove')) || null,
  crewAbsent: ((_localAutoGearConditi38 = localAutoGearConditionSections.crewAbsent) === null || _localAutoGearConditi38 === void 0 ? void 0 : _localAutoGearConditi38.querySelector('.auto-gear-condition-remove')) || null,
  wireless: ((_localAutoGearConditi39 = localAutoGearConditionSections.wireless) === null || _localAutoGearConditi39 === void 0 ? void 0 : _localAutoGearConditi39.querySelector('.auto-gear-condition-remove')) || null,
  motors: ((_localAutoGearConditi40 = localAutoGearConditionSections.motors) === null || _localAutoGearConditi40 === void 0 ? void 0 : _localAutoGearConditi40.querySelector('.auto-gear-condition-remove')) || null,
  controllers: ((_localAutoGearConditi41 = localAutoGearConditionSections.controllers) === null || _localAutoGearConditi41 === void 0 ? void 0 : _localAutoGearConditi41.querySelector('.auto-gear-condition-remove')) || null,
  distance: ((_localAutoGearConditi42 = localAutoGearConditionSections.distance) === null || _localAutoGearConditi42 === void 0 ? void 0 : _localAutoGearConditi42.querySelector('.auto-gear-condition-remove')) || null
};
if (autoGearAddRuleBtn) {
  autoGearAddRuleBtn.setAttribute('aria-controls', 'autoGearEditor');
  autoGearAddRuleBtn.setAttribute('aria-expanded', autoGearEditor && !autoGearEditor.hidden ? 'true' : 'false');
}
if (autoGearEditor) {
  autoGearEditor.setAttribute('aria-hidden', autoGearEditor.hidden ? 'true' : 'false');
}
var AUTO_GEAR_UI_EXPORTS = function resolveAutoGearUiExports() {
  if (typeof resolveCoreSupportModule === 'function') {
    try {
      var resolved = resolveCoreSupportModule('cineCoreAutoGearUi', './app-core-auto-gear-ui.js');
      if (resolved && _typeof(resolved) === 'object') {
        return resolved;
      }
    } catch (autoGearUiResolutionError) {
      void autoGearUiResolutionError;
    }
  }
  try {
    if ((typeof cineCoreAutoGearUi === "undefined" ? "undefined" : _typeof(cineCoreAutoGearUi)) === 'object' && cineCoreAutoGearUi) {
      return cineCoreAutoGearUi;
    }
  } catch (cineCoreAutoGearUiError) {
    void cineCoreAutoGearUiError;
  }
  try {
    var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
    if (scope && _typeof(scope.cineCoreAutoGearUi) === 'object' && scope.cineCoreAutoGearUi) {
      return scope.cineCoreAutoGearUi;
    }
  } catch (autoGearUiScopeError) {
    void autoGearUiScopeError;
  }
  return {};
}();
var autoGearRuleNameInput = AUTO_GEAR_UI_EXPORTS.autoGearRuleNameInput !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearRuleNameInput : null;
var autoGearRuleNameLabel = AUTO_GEAR_UI_EXPORTS.autoGearRuleNameLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearRuleNameLabel : null;
var autoGearScenariosSelect = AUTO_GEAR_UI_EXPORTS.autoGearScenariosSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearScenariosSelect : null;
var autoGearScenariosLabel = AUTO_GEAR_UI_EXPORTS.autoGearScenariosLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearScenariosLabel : null;
var autoGearScenarioModeLabel = AUTO_GEAR_UI_EXPORTS.autoGearScenarioModeLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearScenarioModeLabel : null;
var autoGearScenarioMultiplierContainer = AUTO_GEAR_UI_EXPORTS.autoGearScenarioMultiplierContainer !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearScenarioMultiplierContainer : null;
var autoGearScenarioBaseSelect = AUTO_GEAR_UI_EXPORTS.autoGearScenarioBaseSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearScenarioBaseSelect : null;
var autoGearScenarioBaseLabel = AUTO_GEAR_UI_EXPORTS.autoGearScenarioBaseLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearScenarioBaseLabel : null;
var autoGearScenarioFactorInput = AUTO_GEAR_UI_EXPORTS.autoGearScenarioFactorInput !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearScenarioFactorInput : null;
var autoGearScenarioFactorLabel = AUTO_GEAR_UI_EXPORTS.autoGearScenarioFactorLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearScenarioFactorLabel : null;
var autoGearShootingDaysMode = AUTO_GEAR_UI_EXPORTS.autoGearShootingDaysMode !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearShootingDaysMode : null;
var autoGearShootingDaysInput = AUTO_GEAR_UI_EXPORTS.autoGearShootingDaysInput !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearShootingDaysInput : null;
var autoGearShootingDaysLabel = AUTO_GEAR_UI_EXPORTS.autoGearShootingDaysLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearShootingDaysLabel : null;
var autoGearShootingDaysHelp = AUTO_GEAR_UI_EXPORTS.autoGearShootingDaysHelp !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearShootingDaysHelp : null;
var autoGearShootingDaysValueLabel = AUTO_GEAR_UI_EXPORTS.autoGearShootingDaysValueLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearShootingDaysValueLabel : null;
var autoGearMatteboxSelect = AUTO_GEAR_UI_EXPORTS.autoGearMatteboxSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearMatteboxSelect : null;
var autoGearMatteboxLabel = AUTO_GEAR_UI_EXPORTS.autoGearMatteboxLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearMatteboxLabel : null;
var autoGearMatteboxModeLabel = AUTO_GEAR_UI_EXPORTS.autoGearMatteboxModeLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearMatteboxModeLabel : null;
var autoGearMatteboxModeSelect = AUTO_GEAR_UI_EXPORTS.autoGearMatteboxModeSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearMatteboxModeSelect : null;
var autoGearCameraHandleSelect = AUTO_GEAR_UI_EXPORTS.autoGearCameraHandleSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCameraHandleSelect : null;
var autoGearCameraHandleLabel = AUTO_GEAR_UI_EXPORTS.autoGearCameraHandleLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCameraHandleLabel : null;
var autoGearCameraHandleModeLabel = AUTO_GEAR_UI_EXPORTS.autoGearCameraHandleModeLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCameraHandleModeLabel : null;
var autoGearCameraHandleModeSelect = AUTO_GEAR_UI_EXPORTS.autoGearCameraHandleModeSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCameraHandleModeSelect : null;
var autoGearViewfinderExtensionSelect = AUTO_GEAR_UI_EXPORTS.autoGearViewfinderExtensionSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearViewfinderExtensionSelect : null;
var autoGearViewfinderExtensionLabel = AUTO_GEAR_UI_EXPORTS.autoGearViewfinderExtensionLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearViewfinderExtensionLabel : null;
var autoGearViewfinderExtensionModeLabel = AUTO_GEAR_UI_EXPORTS.autoGearViewfinderExtensionModeLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearViewfinderExtensionModeLabel : null;
var autoGearViewfinderExtensionModeSelect = AUTO_GEAR_UI_EXPORTS.autoGearViewfinderExtensionModeSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearViewfinderExtensionModeSelect : null;
var autoGearDeliveryResolutionSelect = AUTO_GEAR_UI_EXPORTS.autoGearDeliveryResolutionSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearDeliveryResolutionSelect : null;
var autoGearDeliveryResolutionLabel = AUTO_GEAR_UI_EXPORTS.autoGearDeliveryResolutionLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearDeliveryResolutionLabel : null;
var autoGearDeliveryResolutionModeLabel = AUTO_GEAR_UI_EXPORTS.autoGearDeliveryResolutionModeLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearDeliveryResolutionModeLabel : null;
var autoGearDeliveryResolutionModeSelect = AUTO_GEAR_UI_EXPORTS.autoGearDeliveryResolutionModeSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearDeliveryResolutionModeSelect : null;
var autoGearVideoDistributionSelect = AUTO_GEAR_UI_EXPORTS.autoGearVideoDistributionSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearVideoDistributionSelect : null;
var autoGearVideoDistributionLabel = AUTO_GEAR_UI_EXPORTS.autoGearVideoDistributionLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearVideoDistributionLabel : null;
var autoGearVideoDistributionModeLabel = AUTO_GEAR_UI_EXPORTS.autoGearVideoDistributionModeLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearVideoDistributionModeLabel : null;
var autoGearVideoDistributionModeSelect = AUTO_GEAR_UI_EXPORTS.autoGearVideoDistributionModeSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearVideoDistributionModeSelect : null;
var autoGearCameraSelect = AUTO_GEAR_UI_EXPORTS.autoGearCameraSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCameraSelect : null;
var autoGearCameraLabel = AUTO_GEAR_UI_EXPORTS.autoGearCameraLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCameraLabel : null;
var autoGearCameraModeLabel = AUTO_GEAR_UI_EXPORTS.autoGearCameraModeLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCameraModeLabel : null;
var autoGearCameraModeSelect = AUTO_GEAR_UI_EXPORTS.autoGearCameraModeSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCameraModeSelect : null;
var autoGearOwnGearLabel = AUTO_GEAR_UI_EXPORTS.autoGearOwnGearLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearOwnGearLabel : null;
var autoGearOwnGearModeLabel = AUTO_GEAR_UI_EXPORTS.autoGearOwnGearModeLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearOwnGearModeLabel : null;
var autoGearOwnGearModeSelect = AUTO_GEAR_UI_EXPORTS.autoGearOwnGearModeSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearOwnGearModeSelect : null;
var autoGearOwnGearSelect = AUTO_GEAR_UI_EXPORTS.autoGearOwnGearSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearOwnGearSelect : null;
var autoGearCameraWeightLabel = AUTO_GEAR_UI_EXPORTS.autoGearCameraWeightLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCameraWeightLabel : null;
var autoGearCameraWeightOperator = AUTO_GEAR_UI_EXPORTS.autoGearCameraWeightOperator !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCameraWeightOperator : null;
var autoGearCameraWeightOperatorLabel = AUTO_GEAR_UI_EXPORTS.autoGearCameraWeightOperatorLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCameraWeightOperatorLabel : null;
var autoGearCameraWeightValueInput = AUTO_GEAR_UI_EXPORTS.autoGearCameraWeightValueInput !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCameraWeightValueInput : null;
var autoGearCameraWeightValueLabel = AUTO_GEAR_UI_EXPORTS.autoGearCameraWeightValueLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCameraWeightValueLabel : null;
var autoGearCameraWeightHelp = AUTO_GEAR_UI_EXPORTS.autoGearCameraWeightHelp !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCameraWeightHelp : null;
var autoGearMonitorSelect = AUTO_GEAR_UI_EXPORTS.autoGearMonitorSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearMonitorSelect : null;
var autoGearMonitorLabel = AUTO_GEAR_UI_EXPORTS.autoGearMonitorLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearMonitorLabel : null;
var autoGearMonitorModeLabel = AUTO_GEAR_UI_EXPORTS.autoGearMonitorModeLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearMonitorModeLabel : null;
var autoGearMonitorModeSelect = AUTO_GEAR_UI_EXPORTS.autoGearMonitorModeSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearMonitorModeSelect : null;
var autoGearTripodHeadBrandSelect = AUTO_GEAR_UI_EXPORTS.autoGearTripodHeadBrandSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearTripodHeadBrandSelect : null;
var autoGearTripodHeadBrandLabel = AUTO_GEAR_UI_EXPORTS.autoGearTripodHeadBrandLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearTripodHeadBrandLabel : null;
var autoGearTripodHeadBrandModeLabel = AUTO_GEAR_UI_EXPORTS.autoGearTripodHeadBrandModeLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearTripodHeadBrandModeLabel : null;
var autoGearTripodHeadBrandModeSelect = AUTO_GEAR_UI_EXPORTS.autoGearTripodHeadBrandModeSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearTripodHeadBrandModeSelect : null;
var autoGearTripodBowlSelect = AUTO_GEAR_UI_EXPORTS.autoGearTripodBowlSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearTripodBowlSelect : null;
var autoGearTripodBowlLabel = AUTO_GEAR_UI_EXPORTS.autoGearTripodBowlLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearTripodBowlLabel : null;
var autoGearTripodBowlModeLabel = AUTO_GEAR_UI_EXPORTS.autoGearTripodBowlModeLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearTripodBowlModeLabel : null;
var autoGearTripodBowlModeSelect = AUTO_GEAR_UI_EXPORTS.autoGearTripodBowlModeSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearTripodBowlModeSelect : null;
var autoGearTripodTypesSelect = AUTO_GEAR_UI_EXPORTS.autoGearTripodTypesSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearTripodTypesSelect : null;
var autoGearTripodTypesLabel = AUTO_GEAR_UI_EXPORTS.autoGearTripodTypesLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearTripodTypesLabel : null;
var autoGearTripodTypesModeLabel = AUTO_GEAR_UI_EXPORTS.autoGearTripodTypesModeLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearTripodTypesModeLabel : null;
var autoGearTripodTypesModeSelect = AUTO_GEAR_UI_EXPORTS.autoGearTripodTypesModeSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearTripodTypesModeSelect : null;
var autoGearTripodSpreaderSelect = AUTO_GEAR_UI_EXPORTS.autoGearTripodSpreaderSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearTripodSpreaderSelect : null;
var autoGearTripodSpreaderLabel = AUTO_GEAR_UI_EXPORTS.autoGearTripodSpreaderLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearTripodSpreaderLabel : null;
var autoGearTripodSpreaderModeLabel = AUTO_GEAR_UI_EXPORTS.autoGearTripodSpreaderModeLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearTripodSpreaderModeLabel : null;
var autoGearTripodSpreaderModeSelect = AUTO_GEAR_UI_EXPORTS.autoGearTripodSpreaderModeSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearTripodSpreaderModeSelect : null;
var autoGearCrewPresentSelect = AUTO_GEAR_UI_EXPORTS.autoGearCrewPresentSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCrewPresentSelect : null;
var autoGearCrewPresentLabel = AUTO_GEAR_UI_EXPORTS.autoGearCrewPresentLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCrewPresentLabel : null;
var autoGearCrewPresentModeLabel = AUTO_GEAR_UI_EXPORTS.autoGearCrewPresentModeLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCrewPresentModeLabel : null;
var autoGearCrewPresentModeSelect = AUTO_GEAR_UI_EXPORTS.autoGearCrewPresentModeSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCrewPresentModeSelect : null;
var autoGearCrewAbsentSelect = AUTO_GEAR_UI_EXPORTS.autoGearCrewAbsentSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCrewAbsentSelect : null;
var autoGearCrewAbsentLabel = AUTO_GEAR_UI_EXPORTS.autoGearCrewAbsentLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCrewAbsentLabel : null;
var autoGearCrewAbsentModeLabel = AUTO_GEAR_UI_EXPORTS.autoGearCrewAbsentModeLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCrewAbsentModeLabel : null;
var autoGearCrewAbsentModeSelect = AUTO_GEAR_UI_EXPORTS.autoGearCrewAbsentModeSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearCrewAbsentModeSelect : null;
var autoGearWirelessSelect = AUTO_GEAR_UI_EXPORTS.autoGearWirelessSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearWirelessSelect : null;
var autoGearWirelessLabel = AUTO_GEAR_UI_EXPORTS.autoGearWirelessLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearWirelessLabel : null;
var autoGearWirelessModeLabel = AUTO_GEAR_UI_EXPORTS.autoGearWirelessModeLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearWirelessModeLabel : null;
var autoGearWirelessModeSelect = AUTO_GEAR_UI_EXPORTS.autoGearWirelessModeSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearWirelessModeSelect : null;
var autoGearMotorsSelect = AUTO_GEAR_UI_EXPORTS.autoGearMotorsSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearMotorsSelect : null;
var autoGearMotorsLabel = AUTO_GEAR_UI_EXPORTS.autoGearMotorsLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearMotorsLabel : null;
var autoGearMotorsModeLabel = AUTO_GEAR_UI_EXPORTS.autoGearMotorsModeLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearMotorsModeLabel : null;
var autoGearMotorsModeSelect = AUTO_GEAR_UI_EXPORTS.autoGearMotorsModeSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearMotorsModeSelect : null;
var autoGearControllersSelect = AUTO_GEAR_UI_EXPORTS.autoGearControllersSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearControllersSelect : null;
var autoGearControllersLabel = AUTO_GEAR_UI_EXPORTS.autoGearControllersLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearControllersLabel : null;
var autoGearControllersModeLabel = AUTO_GEAR_UI_EXPORTS.autoGearControllersModeLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearControllersModeLabel : null;
var autoGearControllersModeSelect = AUTO_GEAR_UI_EXPORTS.autoGearControllersModeSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearControllersModeSelect : null;
var autoGearDistanceSelect = AUTO_GEAR_UI_EXPORTS.autoGearDistanceSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearDistanceSelect : null;
var autoGearDistanceLabel = AUTO_GEAR_UI_EXPORTS.autoGearDistanceLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearDistanceLabel : null;
var autoGearDistanceModeLabel = AUTO_GEAR_UI_EXPORTS.autoGearDistanceModeLabel !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearDistanceModeLabel : null;
var autoGearDistanceModeSelect = AUTO_GEAR_UI_EXPORTS.autoGearDistanceModeSelect !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearDistanceModeSelect : null;
var autoGearConditionLabels = AUTO_GEAR_UI_EXPORTS.autoGearConditionLabels !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearConditionLabels : {};
var autoGearConditionSelects = AUTO_GEAR_UI_EXPORTS.autoGearConditionSelects !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearConditionSelects : {};
var autoGearConditionLogicLabels = AUTO_GEAR_UI_EXPORTS.autoGearConditionLogicLabels !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearConditionLogicLabels : {};
var autoGearConditionLogicSelects = AUTO_GEAR_UI_EXPORTS.autoGearConditionLogicSelects !== undefined ? AUTO_GEAR_UI_EXPORTS.autoGearConditionLogicSelects : {};
var getAutoGearScenarioModeSelectElementRef = typeof AUTO_GEAR_UI_EXPORTS.getAutoGearScenarioModeSelectElement === 'function' ? AUTO_GEAR_UI_EXPORTS.getAutoGearScenarioModeSelectElement : function () {
  return AUTO_GEAR_UI_EXPORTS.autoGearScenarioModeSelectElement || null;
};
var setAutoGearScenarioModeSelectElementRef = typeof AUTO_GEAR_UI_EXPORTS.setAutoGearScenarioModeSelectElement === 'function' ? AUTO_GEAR_UI_EXPORTS.setAutoGearScenarioModeSelectElement : function (value) {
  AUTO_GEAR_UI_EXPORTS.autoGearScenarioModeSelectElement = value || null;
};
var autoGearScenarioModeSelectElement = getAutoGearScenarioModeSelectElementRef();
setAutoGearScenarioModeSelectElementRef(autoGearScenarioModeSelectElement);
var AUTO_GEAR_CONDITION_KEYS = Array.isArray(AUTO_GEAR_UI_EXPORTS.AUTO_GEAR_CONDITION_KEYS) ? AUTO_GEAR_UI_EXPORTS.AUTO_GEAR_CONDITION_KEYS : ['always', 'scenarios', 'shootingDays', 'mattebox', 'cameraHandle', 'viewfinderExtension', 'deliveryResolution', 'videoDistribution', 'camera', 'ownGear', 'cameraWeight', 'monitor', 'tripodHeadBrand', 'tripodBowl', 'tripodTypes', 'tripodSpreader', 'crewPresent', 'crewAbsent', 'wireless', 'motors', 'controllers', 'distance'];
var AUTO_GEAR_REPEATABLE_CONDITIONS = AUTO_GEAR_UI_EXPORTS.AUTO_GEAR_REPEATABLE_CONDITIONS instanceof Set ? AUTO_GEAR_UI_EXPORTS.AUTO_GEAR_REPEATABLE_CONDITIONS : new Set(['scenarios', 'mattebox', 'cameraHandle', 'viewfinderExtension', 'deliveryResolution', 'videoDistribution', 'camera', 'ownGear', 'monitor', 'tripodHeadBrand', 'tripodBowl', 'tripodTypes', 'tripodSpreader', 'crewPresent', 'crewAbsent', 'wireless', 'motors', 'controllers', 'distance']);
var AUTO_GEAR_CONDITION_FALLBACK_LABELS = AUTO_GEAR_UI_EXPORTS.AUTO_GEAR_CONDITION_FALLBACK_LABELS || {
  always: 'Always include',
  scenarios: 'Required scenarios',
  shootingDays: 'Shooting days condition',
  mattebox: 'Mattebox options',
  cameraHandle: 'Camera handles',
  viewfinderExtension: 'Viewfinder extension',
  deliveryResolution: 'Delivery resolution',
  videoDistribution: 'Video distribution',
  camera: 'Camera',
  ownGear: 'Own gear items',
  cameraWeight: 'Camera weight',
  monitor: 'Onboard monitor',
  tripodHeadBrand: 'Tripod head brand',
  tripodBowl: 'Tripod bowl size',
  tripodTypes: 'Tripod types',
  tripodSpreader: 'Tripod spreader',
  crewPresent: 'Crew present',
  crewAbsent: 'Crew absent',
  wireless: 'Wireless transmitter',
  motors: 'FIZ motors',
  controllers: 'FIZ controllers',
  distance: 'FIZ distance devices'
};
function resolveFocusScalePreference() {
  if (typeof resolveGlobalFocusScalePreference === 'function') {
    try {
      var resolved = resolveGlobalFocusScalePreference();
      if (resolved === 'imperial' || resolved === 'metric') {
        return resolved;
      }
      if (typeof resolved === 'string') {
        var trimmedResolved = resolved.trim().toLowerCase();
        if (trimmedResolved === 'imperial' || trimmedResolved === 'metric') {
          return trimmedResolved;
        }
      }
    } catch (focusScaleNormalizeError) {
      console.warn('resolveGlobalFocusScalePreference helper threw an error while resolving a focus scale label', focusScaleNormalizeError);
    }
  }
  if (typeof focusScalePreference === 'string') {
    var trimmedPreference = focusScalePreference.trim().toLowerCase();
    if (trimmedPreference === 'imperial' || trimmedPreference === 'metric') {
      return trimmedPreference;
    }
  }
  return '';
}
function normalizeFocusScaleForLabel(value) {
  var attemptNormalize = function attemptNormalize(candidate) {
    if (typeof normalizeFocusScale === 'function') {
      try {
        var normalized = normalizeFocusScale(candidate);
        if (normalized === 'imperial' || normalized === 'metric') {
          return normalized;
        }
        if (normalized === '' || normalized === null) {
          return '';
        }
      } catch (normalizeError) {
        console.warn('normalizeFocusScale helper threw an error while resolving a focus scale label', normalizeError);
      }
    }
    if (typeof candidate === 'string') {
      var trimmed = candidate.trim().toLowerCase();
      if (trimmed === 'imperial') {
        return 'imperial';
      }
      if (trimmed === 'metric') {
        return 'metric';
      }
      if (!trimmed) {
        return '';
      }
    }
    return '';
  };
  var directNormalized = attemptNormalize(value);
  if (directNormalized === '' && (typeof value === 'undefined' || value === null || typeof value === 'string' && !value.trim())) {
    var preference = resolveFocusScalePreference();
    var normalizedPreference = attemptNormalize(preference);
    if (normalizedPreference === 'imperial' || normalizedPreference === 'metric') {
      return normalizedPreference;
    }
  }
  return directNormalized;
}
function getFocusScaleLabelForLang() {
  var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentLang;
  var scale = arguments.length > 1 ? arguments[1] : undefined;
  var normalized = normalizeFocusScaleForLabel(scale);
  var textsForLang = getLanguageTexts(lang) || {};
  var fallbackTexts = getLanguageTexts('en') || {};
  var metricLabel = textsForLang.focusScaleMetric || fallbackTexts.focusScaleMetric || textsForLang.focusScaleSetting || fallbackTexts.focusScaleSetting || 'Metric';
  var imperialLabel = textsForLang.focusScaleImperial || fallbackTexts.focusScaleImperial || textsForLang.focusScaleSetting || fallbackTexts.focusScaleSetting || 'Imperial';
  if (normalized === 'imperial') {
    return imperialLabel;
  }
  if (normalized === 'metric') {
    return metricLabel;
  }
  if (typeof scale === 'string') {
    var trimmed = scale.trim();
    if (trimmed) {
      return trimmed;
    }
  }
  return textsForLang.focusScaleSetting || textsForLang.lensFocusScaleLabel || fallbackTexts.focusScaleSetting || fallbackTexts.lensFocusScaleLabel || metricLabel;
}
var DEFAULT_LANGUAGE_SAFE = function resolveDefaultLanguageSafe() {
  var candidateResolvers = [function resolveFromLexicalBinding() {
    try {
      if (typeof DEFAULT_LANGUAGE === 'string' && DEFAULT_LANGUAGE) {
        return DEFAULT_LANGUAGE;
      }
    } catch (defaultLanguageLookupError) {
      void defaultLanguageLookupError;
    }
    return null;
  }, function resolveFromLocaleModule() {
    try {
      if ((typeof LOCALE_MODULE === "undefined" ? "undefined" : _typeof(LOCALE_MODULE)) === 'object' && LOCALE_MODULE && typeof LOCALE_MODULE.DEFAULT_LANGUAGE === 'string' && LOCALE_MODULE.DEFAULT_LANGUAGE) {
        return LOCALE_MODULE.DEFAULT_LANGUAGE;
      }
    } catch (localeModuleResolutionError) {
      void localeModuleResolutionError;
    }
    return null;
  }, function resolveFromLocalizationAccessors() {
    try {
      if ((typeof ACTIVE_LOCALIZATION_ACCESSORS === "undefined" ? "undefined" : _typeof(ACTIVE_LOCALIZATION_ACCESSORS)) === 'object' && ACTIVE_LOCALIZATION_ACCESSORS && typeof ACTIVE_LOCALIZATION_ACCESSORS.defaultLanguage === 'string' && ACTIVE_LOCALIZATION_ACCESSORS.defaultLanguage) {
        return ACTIVE_LOCALIZATION_ACCESSORS.defaultLanguage;
      }
    } catch (accessorResolutionError) {
      void accessorResolutionError;
    }
    return null;
  }, function resolveFromGlobalScope() {
    try {
      var _globalScope2 = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
      if (_globalScope2 && typeof _globalScope2.DEFAULT_LANGUAGE === 'string' && _globalScope2.DEFAULT_LANGUAGE) {
        return _globalScope2.DEFAULT_LANGUAGE;
      }
      if (_globalScope2 && typeof _globalScope2.CPP_DEFAULT_LANGUAGE_SAFE === 'string' && _globalScope2.CPP_DEFAULT_LANGUAGE_SAFE) {
        return _globalScope2.CPP_DEFAULT_LANGUAGE_SAFE;
      }
    } catch (globalScopeResolutionError) {
      void globalScopeResolutionError;
    }
    return null;
  }];
  for (var index = 0; index < candidateResolvers.length; index += 1) {
    var resolved = candidateResolvers[index]();
    if (typeof resolved === 'string' && resolved) {
      return resolved;
    }
  }
  return 'en';
}();
if (translationsRuntime && typeof translationsRuntime.loadLanguage === 'function') {
  try {
    var runtimeLoadResult = translationsRuntime.loadLanguage(DEFAULT_LANGUAGE_SAFE);
    if (runtimeLoadResult && typeof runtimeLoadResult.then === 'function') {
      runtimeLoadResult.catch(function handleDefaultLanguageLoadError(error) {
        console.warn('Failed to eagerly load default translations', error);
      });
    }
  } catch (defaultRuntimeError) {
    console.warn('Failed to trigger default translation load', defaultRuntimeError);
  }
}
var SUPPORTED_LANGUAGES = function () {
  var known = new Set();
  var addLanguage = function addLanguage(value) {
    if (typeof value !== 'string') {
      return;
    }
    var normalized = value.trim().toLowerCase();
    if (!normalized) {
      return;
    }
    known.add(normalized);
    var short = normalized.slice(0, 2);
    if (short && short !== normalized) {
      known.add(short);
    }
  };
  if ((typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object' && texts !== null) {
    Object.keys(texts).forEach(addLanguage);
  }
  if (translationsRuntime && _typeof(translationsRuntime) === 'object') {
    if (translationsRuntime.texts && _typeof(translationsRuntime.texts) === 'object') {
      Object.keys(translationsRuntime.texts).forEach(addLanguage);
    }
    if (typeof translationsRuntime.getAvailableLanguages === 'function') {
      try {
        var runtimeLanguages = translationsRuntime.getAvailableLanguages();
        if (Array.isArray(runtimeLanguages)) {
          runtimeLanguages.forEach(addLanguage);
        }
      } catch (availableLanguagesError) {
        console.warn('Failed to read available languages from translations runtime', availableLanguagesError);
      }
    }
  }
  addLanguage(DEFAULT_LANGUAGE_SAFE);
  return Array.from(known);
}();
function resolveLanguagePreference(candidate) {
  if (!candidate) {
    return {
      language: DEFAULT_LANGUAGE_SAFE,
      matched: false
    };
  }
  var normalized = String(candidate).toLowerCase();
  if (SUPPORTED_LANGUAGES.includes(normalized)) {
    return {
      language: normalized,
      matched: true
    };
  }
  var short = normalized.slice(0, 2);
  if (SUPPORTED_LANGUAGES.includes(short)) {
    return {
      language: short,
      matched: true
    };
  }
  return {
    language: DEFAULT_LANGUAGE_SAFE,
    matched: false
  };
}
try {
  var _globalScope3 = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  if (_globalScope3 && _typeof(_globalScope3) === 'object') {
    if (typeof _globalScope3.CPP_DEFAULT_LANGUAGE_SAFE !== 'string' || !_globalScope3.CPP_DEFAULT_LANGUAGE_SAFE) {
      _globalScope3.CPP_DEFAULT_LANGUAGE_SAFE = DEFAULT_LANGUAGE_SAFE;
    }
    if (typeof _globalScope3.DEFAULT_LANGUAGE !== 'string' || !_globalScope3.DEFAULT_LANGUAGE) {
      _globalScope3.DEFAULT_LANGUAGE = DEFAULT_LANGUAGE_SAFE;
    }
  }
} catch (assignDefaultLanguageScopeError) {
  void assignDefaultLanguageScopeError;
}
var currentLang = DEFAULT_LANGUAGE_SAFE;
var updateHelpQuickLinksForLanguage;
var updateHelpResultsSummaryText;
var lastRuntimeHours = null;
try {
  var savedLang = localStorage.getItem("language");
  var resolvedSaved = resolveLanguagePreference(savedLang);
  if (savedLang && resolvedSaved.matched) {
    currentLang = resolvedSaved.language;
  }
} catch (e) {
  console.warn("Could not load language from localStorage", e);
}
try {
  if (typeof document !== "undefined" && document && document.documentElement) {
    document.documentElement.lang = currentLang;
  }
} catch (setLangError) {
  void setLangError;
}
function setLanguage(_x) {
  return _setLanguage.apply(this, arguments);
}
function _setLanguage() {
  _setLanguage = _asyncToGenerator(_regenerator().m(function _callee2(lang) {
    var _texts$en54, _texts$en55, _texts$en56, _texts$en57, _texts$en58, _texts$en59, _texts$en60, _texts$en61, _texts$en62, _texts$en63, _texts$en64, _texts$en65, _texts$en66, _texts$en67, _texts$en68, _texts$en69, _texts$en70, _texts$en71, _texts$en72, _texts$en73, _texts$en75, _texts$en180, _texts$en181, _texts$lang, _texts$en182, _texts$lang2, _texts$en183, _texts$lang3, _texts$en184, _texts$lang4, _texts$en185, _texts$en247;
    var requested, resolved, normalizedLang, loadResult, translationSource, previousLang, shouldDispatchLanguageChange, dispatchLanguageChange, doc, runtimeScope, attemptRefreshDeviceLists, retryRefresh, fallbackLocale, normalizeTemperatureUnitSafe, FALLBACK_NORMALIZE_FOCUS_SCALE, ensureNormalizeFocusScaleHelper, normalizeFocusScaleSafe, resolveFocusScalePreference, resolveLocaleString, applyTextContent, createHelpLink, applySuggestionTemplate, applySuggestionText, resolveRuntimeValue, registerResolvedElement, resolveElement, settingsShowAutoBackupsEl, backupSettingsButton, backupDiffToggleButtonEl, backupDiffHeadingEl, backupDiffIntroEl, backupDiffPrimaryLabelEl, backupDiffPrimarySelectEl, backupDiffSecondaryLabelEl, backupDiffSecondarySelectEl, backupDiffEmptyStateEl, backupDiffNotesLabelEl, backupDiffNotesEl, backupDiffExportButtonEl, backupDiffCloseButtonEl, restoreRehearsalButton, restoreRehearsalHeading, restoreRehearsalIntro, restoreRehearsalModeLabel, restoreRehearsalModeBackupText, restoreRehearsalModeProjectText, restoreRehearsalFileLabel, restoreRehearsalBrowse, restoreRehearsalFileName, restoreRehearsalStatus, restoreRehearsalRuleHeading, restoreRehearsalRuleIntro, restoreRehearsalRuleEmpty, restoreRehearsalTableCaption, restoreRehearsalMetricHeader, restoreRehearsalLiveHeader, restoreRehearsalSandboxHeader, restoreRehearsalDifferenceHeader, restoreRehearsalCloseButton, restoreRehearsalProceedButton, restoreRehearsalAbortButton, offlineElem, offlineLabel, offlineNotice, offlineHelp, isExplicitlyOffline, legalLinks, impressumElem, privacyElem, setupManageHeadingElem, deviceSelectionHeadingElem, resultsHeadingElem, deviceManagerHeadingElem, batteryComparisonHeadingElem, batteryComparisonDescriptionElem, batteryTableElem, setupDiagramHeadingElem, sideMenuLinks, savedSetupsLabelElem, setupNameLabelElem, sharedLinkLabelElem, deleteGearListHelp, editProjectBtnElem, addExtraGearBtnElem, _texts$en27, extraLabel, _texts$en28, heading, _texts$en29, filenameLabel, _texts$en30, confirmLabel, _texts$en31, cancelLabel, _texts$en32, _texts$en33, label, help, _texts$en34, _texts$en35, _label3, _help2, sharedImportLegendText, _texts$en36, title, _texts$en37, message, _texts$en38, _label4, _texts$en39, _label5, _texts$en40, legend, _texts$en41, _texts$en42, _label6, _help3, _texts$en43, _texts$en44, _label7, _help4, _texts$en45, _texts$en46, _label8, _help5, cameraLabelElem, monitorLabelElem, videoLabelElem, cageLabelElem, distanceLabelElem, batteryPlateLabelElem, batteryHotswapLabelElem, fizLegendElem, fizMotorsLabelElem, fizControllersLabelElem, cineResultsModule, resultsLocalizationApplied, batteryComparisonLocalized, resultsPlainSummaryElem, resultsPlainSummaryTitleElem, resultsPlainSummaryTextElem, resultsPlainSummaryNoteElem, breakdownListTarget, totalPowerLabelElem, batteryCountLabelElem, unitElem, fb, _label9, userNote, idx, tempNoteElem, lensDeviceMountHeadingElem, lensDeviceMountLabelElem, lensFocusScaleLabelElem, focusScaleLabel, focusScaleHelp, monitorLatencyLabelElem, monitorLatencyHelpText, viewfinderLatencyLabelElem, viewfinderLatencyHelpText, videoPowerHeadingElem, videoPowerLabelElem, powerHelp, addDeviceLabel, updateDeviceLabel, noneMap, existingDevicesHeading, settingsTitleElem, _texts$en47, sectionsLabel, getSettingsTabLabelText, summarizeSettingsTabHelp, applySettingsTabLabel, _texts$en48, _texts$en49, generalLabel, generalHelp, _texts$en50, sectionHeading, _texts$en51, _sectionHeading, _texts$en52, _sectionHeading2, _texts$en53, _sectionHeading3, settingsLanguageLabel, languageHelp, settingsDarkLabel, darkModeHelp, settingsPinkLabel, pinkModeHelp, accentLabel, accentHelp, _texts$en74, description, cameraColorHelpTemplate, cameraColorLabelEntries, accentResetLabel, accentResetHelp, settingsTemperatureUnitLabel, tempUnitHelp, settingsFocusScaleLabel, _focusScaleHelp, fontSizeLabel, sizeHelp, fontFamilyLabel, familyHelp, localFontsHelp, builtInLabel, localLabel, localFontsLabel, statusKey, arg, template, settingsLogoLabel, logoHelp, _texts$en77, _texts$en78, headingHelp, _texts$en79, _texts$en80, _heading, _texts$en81, _description, _texts$en83, _texts$en84, _texts$en85, _label0, _help6, _texts$en86, _label1, _texts$en87, _label10, _texts$en88, _texts$en89, _label11, _help7, _texts$en90, _texts$en91, _label12, _help8, _texts$en92, _texts$en93, _label13, _help9, _texts$en94, _texts$en95, _label14, _help0, _texts$en96, _texts$en97, _label15, _help1, _texts$en98, placeholder, _texts$en99, _texts$en100, _label16, _help10, _texts$en101, _label17, _texts$en102, _texts$en103, _description2, _texts$en104, _texts$en105, _label18, _help11, _texts$en106, hiddenText, _texts$en107, _texts$en108, _label19, _help12, _texts$en109, _label20, _texts$en110, _label21, _texts$en111, emptyText, _texts$en112, _texts$en113, _label22, _help13, _texts$en114, _texts$en115, _label23, _help14, _texts$en116, _label24, _texts$en117, _texts$en118, _label25, _help15, _texts$en119, _texts$en120, _label26, _help16, _texts$en121, _texts$en122, modeLabel, modeHelp, _texts$en123, _texts$en124, baseLabel, baseHelp, _texts$en125, _texts$en126, factorLabel, factorHelp, _texts$en127, _texts$en128, _texts$en129, _texts$en130, _texts$en131, _texts$en132, _label27, _help17, minimumLabel, maximumLabel, everyLabel, valueLabel, _texts$en133, _texts$en134, _label28, _help18, _texts$en135, _texts$en136, _label29, _help19, _texts$en137, _texts$en138, _label30, _help20, _texts$en139, _texts$en140, _label31, _help21, _texts$en141, _texts$en142, _label32, _help22, _texts$en143, _texts$en144, _label33, _help23, _texts$en145, _texts$en146, _texts$en147, _texts$en148, _label34, _help24, _texts$en149, _texts$en150, _label35, _help25, _texts$en151, _label36, _texts$en152, _texts$en153, _texts$en154, greaterLabel, lessLabel, equalLabel, _texts$en155, _texts$en156, _label37, _help26, _texts$en157, _help27, _texts$en158, _texts$en159, _label38, _help28, _texts$en160, _texts$en161, _label39, _help29, _texts$en162, _texts$en163, _label40, _help30, _texts$en164, _texts$en165, _label41, _help31, _texts$en166, _texts$en167, _label42, _help32, _texts$en168, _texts$en169, _label43, _help33, _texts$en170, _texts$en171, _label44, _help34, _texts$en172, _texts$en173, _label45, _help35, _texts$en174, _texts$en175, _label46, _help36, _texts$en176, _texts$en177, _label47, _help37, _texts$en178, _texts$en179, _label48, _help38, logicLabelText, logicHelpText, logicOptionTexts, _texts$en186, _texts$en187, _texts$en188, _texts$en189, _label49, _help39, _placeholder, _texts$en190, _texts$en191, _label50, hint, helpText, _texts$en192, _label51, _texts$en193, _label52, _texts$en194, _label53, _texts$en195, _label54, _texts$en196, _texts$en197, _texts$en198, _texts$en199, _texts$en200, _texts$en201, _texts$en202, noneLabel, monitorLabel, directorLabel, tripodHeadLabel, _tripodBowlLabel, _tripodTypesLabel, _tripodSpreaderLabel, selectorLabels, _texts$en203, _label55, _texts$en204, _label56, _texts$en205, _texts$en206, _texts$en207, _texts$en208, _label57, _help40, _placeholder2, _texts$en209, _texts$en210, _label58, _hint, _helpText, _texts$en211, _label59, _texts$en212, _label60, _texts$en213, _label61, _texts$en214, _label62, _texts$en215, _texts$en216, _texts$en217, _texts$en218, _texts$en219, _texts$en220, _texts$en221, _noneLabel, _monitorLabel, _directorLabel, _tripodHeadLabel, _tripodBowlLabel2, _tripodTypesLabel2, _tripodSpreaderLabel2, _selectorLabels, _texts$en222, _label63, _texts$en223, _label64, _texts$en224, _heading2, _texts$en225, _description3, _texts$en226, _heading3, _texts$en227, _label65, _texts$en228, _label66, contrastLabel, contrastHelp, accessibilityHeading, backupHeading, projectBackupsHeading, headingText, descriptionText, projectBackupsDescription, _descriptionText, dataHelp, _texts$en229, _texts$en230, _headingText, _headingHelp, _texts$en231, _texts$en232, _texts$en233, requestLabel, requestHelp, _texts$en234, idleText, _texts$en235, _texts$en236, _headingText2, _headingHelp2, _texts$en237, _texts$en238, _texts$en239, backupLabel, backupHelp, _texts$en240, _texts$en241, openLabel, openHelp, _texts$en242, _texts$en243, statusHeading, statusHelp, _texts$en244, _texts$en245, _texts$en246, statusDefaultText, _texts$en248, sectionHelp, _texts$en249, _texts$en250, _headingText3, _headingHelp3, _texts$en251, _texts$en252, _filterLabel, _texts$en253, _texts$en254, _texts$en255, _texts$en256, _texts$en257, optionTexts, filterHelp, _texts$en258, namespaceLabel, _texts$en259, _texts$en260, _placeholder3, namespaceHelp, _texts$en261, historyLabel, _texts$en262, historyHelp, _texts$en263, _texts$en264, limitHelp, limitAria, _texts$en265, consoleLabel, _texts$en266, consoleHelp, _texts$en267, consoleCaptureLabel, _texts$en268, consoleCaptureHelp, _texts$en269, captureLabel, _texts$en270, captureHelp, _texts$en271, persistLabel, _texts$en272, persistHelp, _texts$en273, exportLabel, _texts$en274, exportHelp, _texts$en275, statusText, _texts$en276, _emptyText, _texts$en277, showAutoBackupsLabel, autoBackupsHelp, compareLabel, compareHelp, primaryLabel, compareLabelText, _placeholder4, _exportLabel, _exportHelp, closeLabel, _backupLabel, _backupHelp, restoreLabel, restoreHelp, rehearsalLabel, rehearsalHelp, browseLabel, _texts$en278, _texts$en279, _texts$en280, resolvedRestoreRehearsalCloseButton, _closeLabel, _texts$en281, _texts$en282, proceedLabel, proceedHelp, _texts$en283, _texts$en284, abortLabel, abortHelp, resetLabel, resetHelp, aboutHeading, aboutVersionElem, supportLinkConfigs, langTexts, fallbackTexts, _texts$en285, _label67, saveHelp, _texts$en286, _cancelLabel, cancelHelp, menuToggle, _texts$en287, _texts$en288, menuLabel, _closeLabel2, closeHelp, menuHelp, sideMenu, sideMenuHelp, sideMenuTitle, _texts$en289, titleLabel, titleHelp, closeMenuButton, closeMenuLabel, _texts$en290, _closeLabel3, _closeHelp, reloadLabel, reloadHelp, _offlineNotice, helpShortcutList, helpAriaShortcuts, quickStartHeading, fallback, onboardingCopyElement, fallbackCopy, dataSafetyHeading, _fallback, restoreDrillHeading, _fallback2, restoreDrillNote, _fallback3, _fallback4, _fallback5, exportRevert, downloadDiagramButton, snapActive, resetViewBtn, zoomInBtn, zoomOutBtn, diagramHint, fallbackProjectForm, projectFormTexts, _texts$en291, _texts$lang5, setLabelText, setPlaceholder, setOptionText, crewLabelText, rangeTemplate, defaultHint, legendText, slowRangeTemplate, slowDefaultHint, seriesEmptyText, optionsEmptyText, removeTemplate, mountLabelText, _noneLabel2, yesLabel, projectCancelButton, cancelText, submitText, crewPlaceholders, crewRoleLabels, fallbackContacts, contactsTexts, profileSnapshot, stripTrailingPunctuation, addEntryLabel, crewLabel, _label68, prepLabel, _label69, shootLabel, _label70, returnLabel, _label71, closeText, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          requested = typeof lang === "string" ? lang : "";
          resolved = resolveLanguagePreference(requested);
          normalizedLang = resolved.language;
          if (translationsRuntime && typeof translationsRuntime.resolveLocaleKey === 'function') {
            try {
              normalizedLang = translationsRuntime.resolveLocaleKey(normalizedLang);
            } catch (resolveError) {
              console.warn('Failed to normalize language via runtime', resolveError);
            }
          }
          if (!(translationsRuntime && typeof translationsRuntime.loadLanguage === 'function')) {
            _context2.n = 5;
            break;
          }
          _context2.p = 1;
          if (typeof translationsRuntime.showLoadingState === 'function') {
            translationsRuntime.showLoadingState(normalizedLang);
          }
          loadResult = translationsRuntime.loadLanguage(normalizedLang);
          if (!(loadResult && typeof loadResult.then === 'function')) {
            _context2.n = 2;
            break;
          }
          _context2.n = 2;
          return loadResult;
        case 2:
          _context2.n = 4;
          break;
        case 3:
          _context2.p = 3;
          _t = _context2.v;
          console.warn("Failed to load translations for \"".concat(normalizedLang, "\""), _t);
        case 4:
          _context2.p = 4;
          if (typeof translationsRuntime.clearLoadingState === 'function') {
            translationsRuntime.clearLoadingState();
          }
          return _context2.f(4);
        case 5:
          translationSource = (typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object' && texts || translationsRuntime && translationsRuntime.texts || {};
          if (!translationSource[normalizedLang]) {
            console.warn("Missing translation bundle for \"".concat(normalizedLang, "\". Falling back to ").concat(DEFAULT_LANGUAGE_SAFE, "."));
            normalizedLang = DEFAULT_LANGUAGE_SAFE;
          }
          if (requested && normalizedLang === DEFAULT_LANGUAGE_SAFE && !resolved.matched && requested.slice(0, 2).toLowerCase() !== DEFAULT_LANGUAGE_SAFE) {
            console.warn("Unsupported language preference \"".concat(requested, "\". Falling back to ").concat(DEFAULT_LANGUAGE_SAFE, "."));
          }
          lang = normalizedLang;
          if (!translationSource[lang] && translationSource[DEFAULT_LANGUAGE_SAFE]) {
            translationSource[lang] = translationSource[DEFAULT_LANGUAGE_SAFE];
          }
          previousLang = currentLang;
          currentLang = lang;
          ensureInstallPromptElements();
          shouldDispatchLanguageChange = previousLang !== lang;
          dispatchLanguageChange = function dispatchLanguageChange() {
            if (typeof window !== "undefined" && typeof window.dispatchEvent === "function" && typeof Event === "function") {
              try {
                window.dispatchEvent(new Event("languagechange"));
              } catch (dispatchError) {
                console.warn("Failed to dispatch languagechange event", dispatchError);
              }
            }
          };
          if (shouldDispatchLanguageChange) {
            if (typeof queueMicrotask === "function") {
              queueMicrotask(dispatchLanguageChange);
            } else if (typeof setTimeout === "function") {
              setTimeout(dispatchLanguageChange, 0);
            } else {
              dispatchLanguageChange();
            }
          }
          try {
            localStorage.setItem("language", lang);
          } catch (e) {
            console.warn("Could not save language to localStorage", e);
          }
          if (languageSelect) {
            languageSelect.value = lang;
          }
          if (settingsLanguage) {
            settingsLanguage.value = lang;
          }
          document.documentElement.lang = lang;
          document.title = translationSource[lang].appTitle;
          document.getElementById("mainTitle").textContent = translationSource[lang].appTitle;
          document.getElementById("tagline").textContent = translationSource[lang].tagline;
          doc = typeof document !== "undefined" ? document : null;
          runtimeScope = getCoreGlobalObject();
          attemptRefreshDeviceLists = function attemptRefreshDeviceLists() {
            var refreshFn = null;
            if (typeof refreshDeviceLists === 'function') {
              refreshFn = refreshDeviceLists;
            } else if (runtimeScope && typeof runtimeScope.refreshDeviceLists === 'function') {
              refreshFn = runtimeScope.refreshDeviceLists.bind(runtimeScope);
            }
            if (typeof refreshFn !== 'function') {
              return false;
            }
            try {
              refreshFn();
            } catch (refreshError) {
              console.warn('setLanguage: refreshDeviceLists execution failed', refreshError);
            }
            return true;
          };
          if (!attemptRefreshDeviceLists()) {
            retryRefresh = function retryRefresh() {
              attemptRefreshDeviceLists();
            };
            if (typeof queueMicrotask === 'function') {
              queueMicrotask(retryRefresh);
            } else if (typeof setTimeout === 'function') {
              setTimeout(retryRefresh, 0);
            }
          }
          fallbackLocale = translationSource[DEFAULT_LANGUAGE_SAFE] || {};
          normalizeTemperatureUnitSafe = function normalizeTemperatureUnitSafe(unit) {
            if (typeof normalizeTemperatureUnit === "function") {
              try {
                return normalizeTemperatureUnit(unit);
              } catch (normalizeError) {
                console.warn("normalizeTemperatureUnit helper threw an error; falling back to safe normalization", normalizeError);
              }
            }
            if (typeof unit === "string") {
              var trimmed = unit.trim().toLowerCase();
              if (trimmed === (CORE_TEMPERATURE_UNITS === null || CORE_TEMPERATURE_UNITS === void 0 ? void 0 : CORE_TEMPERATURE_UNITS.fahrenheit) || trimmed === "fahrenheit" || trimmed === "f") {
                return (CORE_TEMPERATURE_UNITS === null || CORE_TEMPERATURE_UNITS === void 0 ? void 0 : CORE_TEMPERATURE_UNITS.fahrenheit) || "fahrenheit";
              }
              if (trimmed === (CORE_TEMPERATURE_UNITS === null || CORE_TEMPERATURE_UNITS === void 0 ? void 0 : CORE_TEMPERATURE_UNITS.celsius) || trimmed === "celsius" || trimmed === "c") {
                return (CORE_TEMPERATURE_UNITS === null || CORE_TEMPERATURE_UNITS === void 0 ? void 0 : CORE_TEMPERATURE_UNITS.celsius) || "celsius";
              }
            }
            return (CORE_TEMPERATURE_UNITS === null || CORE_TEMPERATURE_UNITS === void 0 ? void 0 : CORE_TEMPERATURE_UNITS.celsius) || "celsius";
          };
          FALLBACK_NORMALIZE_FOCUS_SCALE = function FALLBACK_NORMALIZE_FOCUS_SCALE(value) {
            if (typeof value === "string") {
              var trimmed = value.trim().toLowerCase();
              if (trimmed === "imperial" || trimmed === "feet" || trimmed === "ft") {
                return "imperial";
              }
              if (trimmed === "metric" || trimmed === "metre" || trimmed === "meter" || trimmed === "m") {
                return "metric";
              }
            }
            return "metric";
          };
          ensureNormalizeFocusScaleHelper = function ensureNormalizeFocusScaleHelper() {
            if (typeof normalizeFocusScale === "function") {
              return normalizeFocusScale;
            }
            var scope = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : null;
            if (scope && typeof scope.normalizeFocusScale === "function") {
              return scope.normalizeFocusScale;
            }
            if (scope) {
              try {
                Object.defineProperty(scope, "normalizeFocusScale", {
                  value: FALLBACK_NORMALIZE_FOCUS_SCALE,
                  writable: true,
                  configurable: true
                });
              } catch (defineError) {
                scope.normalizeFocusScale = FALLBACK_NORMALIZE_FOCUS_SCALE;
              }
            }
            return FALLBACK_NORMALIZE_FOCUS_SCALE;
          };
          ensureNormalizeFocusScaleHelper();
          normalizeFocusScaleSafe = function normalizeFocusScaleSafe(value) {
            if (typeof normalizeFocusScale === "function") {
              try {
                var normalized = normalizeFocusScale(value);
                if (normalized === "imperial" || normalized === "metric") {
                  return normalized;
                }
              } catch (normalizeError) {
                console.warn("normalizeFocusScale helper threw an error; falling back to safe normalization", normalizeError);
              }
            }
            return FALLBACK_NORMALIZE_FOCUS_SCALE(value);
          };
          resolveFocusScalePreference = function resolveFocusScalePreference() {
            var tryNormalize = function tryNormalize(candidate) {
              if (typeof candidate === "string" && candidate) {
                return normalizeFocusScaleSafe(candidate);
              }
              return null;
            };
            var sources = [function () {
              return typeof focusScalePreference !== "undefined" ? focusScalePreference : null;
            }, function () {
              return typeof sessionFocusScale !== "undefined" ? sessionFocusScale : null;
            }, function () {
              try {
                var getter = runtimeScope && runtimeScope.preferences && typeof runtimeScope.preferences.getFocusScale === "function" ? runtimeScope.preferences.getFocusScale : null;
                if (getter) {
                  return getter();
                }
              } catch (focusScaleError) {
                console.warn("Failed to resolve focus scale preference from runtime scope; using fallback", focusScaleError);
              }
              return null;
            }];
            for (var _i12 = 0, _sources = sources; _i12 < _sources.length; _i12++) {
              var getSource = _sources[_i12];
              var _resolved = tryNormalize(getSource());
              if (_resolved) {
                return _resolved;
              }
            }
            return "metric";
          };
          resolveLocaleString = function resolveLocaleString(key) {
            if (!key) return "";
            var bundle = texts[lang];
            var value = bundle && typeof bundle[key] === "string" ? bundle[key] : null;
            if (value && value.trim()) {
              return value;
            }
            var fallbackValue = typeof fallbackLocale[key] === "string" ? fallbackLocale[key] : "";
            return fallbackValue;
          };
          applyTextContent = function applyTextContent(element, key) {
            var fallbackValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
            if (!element) return;
            var text = resolveLocaleString(key) || fallbackValue;
            element.textContent = text;
          };
          createHelpLink = function createHelpLink(href, text) {
            var _ref68 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
              target = _ref68.target,
              highlight = _ref68.highlight,
              _ref68$isButton = _ref68.isButton,
              isButton = _ref68$isButton === void 0 ? true : _ref68$isButton;
            if (!doc) {
              return null;
            }
            var link = doc.createElement("a");
            link.className = isButton ? "help-link button-link" : "help-link";
            link.href = href;
            if (target) {
              link.setAttribute("data-help-target", target);
            }
            if (highlight) {
              link.setAttribute("data-help-highlight", highlight);
            }
            link.textContent = text;
            return link;
          };
          applySuggestionTemplate = function applySuggestionTemplate(element, key) {
            var builders = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
            if (!element || !doc) return;
            var template = resolveLocaleString(key);
            element.innerHTML = "";
            if (!template) {
              element.setAttribute("hidden", "");
              return;
            }
            element.removeAttribute("hidden");
            var fragment = doc.createDocumentFragment();
            var regex = /%(?:(\d+)\$)?s/g;
            var lastIndex = 0;
            var autoIndex = 0;
            var match;
            while ((match = regex.exec(template)) !== null) {
              var start = match.index;
              if (start > lastIndex) {
                fragment.appendChild(doc.createTextNode(template.slice(lastIndex, start)));
              }
              var index = typeof match[1] === "string" ? Math.max(parseInt(match[1], 10) - 1, 0) : autoIndex++;
              var builder = builders[index];
              if (typeof builder === "function") {
                var node = builder();
                if (node) {
                  fragment.appendChild(node);
                }
              }
              lastIndex = regex.lastIndex;
            }
            if (lastIndex < template.length) {
              fragment.appendChild(doc.createTextNode(template.slice(lastIndex)));
            }
            element.appendChild(fragment);
          };
          applySuggestionText = function applySuggestionText(element, key) {
            if (!element) return;
            var text = resolveLocaleString(key);
            element.textContent = text;
            if (!text) {
              element.setAttribute("hidden", "");
            } else {
              element.removeAttribute("hidden");
            }
          };
          resolveRuntimeValue = function resolveRuntimeValue(name) {
            if (!name) return undefined;
            if (runtimeScope && _typeof(runtimeScope) === "object") {
              try {
                if (name in runtimeScope) {
                  return runtimeScope[name];
                }
              } catch (scopeError) {
                void scopeError;
              }
            }
            if (typeof globalThis !== "undefined" && globalThis !== runtimeScope) {
              try {
                if (name in globalThis) {
                  return globalThis[name];
                }
              } catch (globalError) {
                void globalError;
              }
            }
            return undefined;
          };
          registerResolvedElement = function registerResolvedElement(globalName, element) {
            if (!globalName || !element) {
              return element;
            }
            try {
              exposeCoreRuntimeConstant(globalName, element);
            } catch (exposeError) {
              void exposeError;
            }
            return element;
          };
          resolveElement = function resolveElement(globalName, elementId) {
            var existing = null;
            try {
              existing = resolveRuntimeValue(globalName);
            } catch (resolveError) {
              console.warn("Failed to resolve runtime value for \"".concat(globalName, "\""), resolveError);
              existing = null;
            }
            if (existing && _typeof(existing) === "object") {
              return existing;
            }
            if (doc && typeof doc.getElementById === "function" && elementId) {
              try {
                var element = doc.getElementById(elementId);
                return registerResolvedElement(globalName, element);
              } catch (resolveDomError) {
                console.warn("Failed to resolve document element \"".concat(elementId, "\""), resolveDomError);
                return null;
              }
            }
            return null;
          };
          settingsShowAutoBackupsEl = resolveElement("settingsShowAutoBackups", "settingsShowAutoBackups");
          backupSettingsButton = resolveElement("backupSettings", "backupSettings");
          backupDiffToggleButtonEl = resolveElement("backupDiffToggleButton", "backupDiffToggleButton");
          backupDiffHeadingEl = resolveElement("backupDiffHeading", "backupDiffHeading");
          backupDiffIntroEl = resolveElement("backupDiffIntro", "backupDiffIntro");
          backupDiffPrimaryLabelEl = resolveElement("backupDiffPrimaryLabel", "backupDiffPrimaryLabel");
          backupDiffPrimarySelectEl = resolveElement("backupDiffPrimarySelect", "backupDiffPrimary");
          backupDiffSecondaryLabelEl = resolveElement("backupDiffSecondaryLabel", "backupDiffSecondaryLabel");
          backupDiffSecondarySelectEl = resolveElement("backupDiffSecondarySelect", "backupDiffSecondary");
          backupDiffEmptyStateEl = resolveElement("backupDiffEmptyState", "backupDiffEmptyState");
          backupDiffNotesLabelEl = resolveElement("backupDiffNotesLabel", "backupDiffNotesLabel");
          backupDiffNotesEl = resolveElement("backupDiffNotes", "backupDiffNotes");
          backupDiffExportButtonEl = resolveElement("backupDiffExportButton", "backupDiffExport");
          backupDiffCloseButtonEl = resolveElement("backupDiffCloseButton", "backupDiffClose");
          restoreRehearsalButton = resolveElement("restoreRehearsalButton", "restoreRehearsalButton");
          restoreRehearsalHeading = resolveElement("restoreRehearsalHeading", "restoreRehearsalHeading");
          restoreRehearsalIntro = resolveElement("restoreRehearsalIntro", "restoreRehearsalIntro");
          restoreRehearsalModeLabel = resolveElement("restoreRehearsalModeLabel", "restoreRehearsalModeLabel");
          restoreRehearsalModeBackupText = resolveElement("restoreRehearsalModeBackupText", "restoreRehearsalModeBackupText");
          restoreRehearsalModeProjectText = resolveElement("restoreRehearsalModeProjectText", "restoreRehearsalModeProjectText");
          restoreRehearsalFileLabel = resolveElement("restoreRehearsalFileLabel", "restoreRehearsalFileLabel");
          restoreRehearsalBrowse = resolveElement("restoreRehearsalBrowse", "restoreRehearsalBrowse");
          restoreRehearsalFileName = resolveElement("restoreRehearsalFileName", "restoreRehearsalFileName");
          restoreRehearsalStatus = resolveElement("restoreRehearsalStatus", "restoreRehearsalStatus");
          restoreRehearsalRuleHeading = resolveElement("restoreRehearsalRuleHeading", "restoreRehearsalRuleHeading");
          restoreRehearsalRuleIntro = resolveElement("restoreRehearsalRuleIntro", "restoreRehearsalRuleIntro");
          restoreRehearsalRuleEmpty = resolveElement("restoreRehearsalRuleEmpty", "restoreRehearsalRuleEmpty");
          restoreRehearsalTableCaption = resolveElement("restoreRehearsalTableCaption", "restoreRehearsalTableCaption");
          restoreRehearsalMetricHeader = resolveElement("restoreRehearsalMetricHeader", "restoreRehearsalMetricHeader");
          restoreRehearsalLiveHeader = resolveElement("restoreRehearsalLiveHeader", "restoreRehearsalLiveHeader");
          restoreRehearsalSandboxHeader = resolveElement("restoreRehearsalSandboxHeader", "restoreRehearsalSandboxHeader");
          restoreRehearsalDifferenceHeader = resolveElement("restoreRehearsalDifferenceHeader", "restoreRehearsalDifferenceHeader");
          restoreRehearsalCloseButton = resolveElement("restoreRehearsalCloseButton", "restoreRehearsalClose");
          restoreRehearsalProceedButton = resolveElement("restoreRehearsalProceedButton", "restoreRehearsalProceed");
          restoreRehearsalAbortButton = resolveElement("restoreRehearsalAbortButton", "restoreRehearsalAbort");
          if (skipLink) skipLink.textContent = texts[lang].skipToContent;
          offlineElem = document.getElementById("offlineIndicator");
          if (offlineElem) {
            offlineLabel = texts[lang].offlineIndicator;
            offlineNotice = texts[lang].reloadAppOfflineNotice || offlineLabel;
            offlineHelp = texts[lang].offlineIndicatorHelp || offlineNotice;
            isExplicitlyOffline = typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' ? navigator.onLine === false : false;
            if (offlineElem.dataset) {
              offlineElem.dataset.baseLabel = offlineLabel;
              offlineElem.dataset.baseHelp = offlineHelp;
              offlineElem.dataset.forceReloadNotice = offlineNotice;
              offlineElem.dataset.degradedLabel = texts[lang].offlineIndicatorDegraded || offlineNotice;
              offlineElem.dataset.degradedHelp = texts[lang].offlineIndicatorDegradedHelp || offlineHelp;
              offlineElem.dataset.reasonCacheFallback = texts[lang].offlineIndicatorReasonCacheFallback || offlineNotice;
              offlineElem.dataset.reasonGetFailed = texts[lang].offlineIndicatorReasonGetFailed || offlineNotice;
              offlineElem.dataset.reasonTimeout = texts[lang].offlineIndicatorReasonTimeout || offlineNotice;
              offlineElem.dataset.reasonUnreachable = texts[lang].offlineIndicatorReasonUnreachable || offlineNotice;
              offlineElem.dataset.reasonReloadBlocked = texts[lang].offlineIndicatorReasonReloadBlocked || offlineNotice;
              offlineElem.dataset.reasonUnknown = texts[lang].offlineIndicatorReasonUnknown || offlineHelp;
            }
            if (isExplicitlyOffline) {
              offlineElem.textContent = offlineNotice;
              offlineElem.setAttribute('data-help', offlineNotice);
              offlineElem.removeAttribute('hidden');
            } else {
              offlineElem.textContent = offlineLabel;
              offlineElem.setAttribute('data-help', offlineHelp);
            }
          }
          applyInstallTexts(lang);
          legalLinks = LEGAL_LINKS[lang] || LEGAL_LINKS.en;
          impressumElem = document.getElementById("impressumLink");
          if (impressumElem) {
            impressumElem.textContent = texts[lang].impressum;
            if (legalLinks !== null && legalLinks !== void 0 && legalLinks.imprint) {
              impressumElem.setAttribute("href", legalLinks.imprint);
            }
          }
          privacyElem = document.getElementById("privacyLink");
          if (privacyElem) {
            privacyElem.textContent = texts[lang].privacy;
            if (legalLinks !== null && legalLinks !== void 0 && legalLinks.privacy) {
              privacyElem.setAttribute("href", legalLinks.privacy);
            }
          }
          setupManageHeadingElem = document.getElementById("setupManageHeading");
          setupManageHeadingElem.textContent = texts[lang].setupManageHeading;
          setupManageHeadingElem.setAttribute("data-help", texts[lang].setupManageHeadingHelp);
          deviceSelectionHeadingElem = document.getElementById("deviceSelectionHeading");
          deviceSelectionHeadingElem.textContent = texts[lang].deviceSelectionHeading;
          deviceSelectionHeadingElem.setAttribute("data-help", texts[lang].deviceSelectionHeadingHelp);
          resultsHeadingElem = document.getElementById("resultsHeading");
          resultsHeadingElem.textContent = texts[lang].resultsHeading;
          resultsHeadingElem.setAttribute("data-help", texts[lang].resultsHeadingHelp);
          deviceManagerHeadingElem = document.getElementById("deviceManagerHeading");
          deviceManagerHeadingElem.textContent = texts[lang].deviceManagerHeading;
          deviceManagerHeadingElem.setAttribute("data-help", texts[lang].deviceManagerHeadingHelp);
          batteryComparisonHeadingElem = document.getElementById("batteryComparisonHeading");
          batteryComparisonDescriptionElem = document.getElementById("batteryComparisonDescription");
          batteryTableElem = document.getElementById("batteryTable");
          setupDiagramHeadingElem = document.getElementById("setupDiagramHeading");
          setupDiagramHeadingElem.textContent = texts[lang].setupDiagramHeading;
          setupDiagramHeadingElem.setAttribute("data-help", texts[lang].setupDiagramHeadingHelp);
          sideMenuLinks = document.querySelectorAll("#sideMenu [data-nav-key]");
          sideMenuLinks.forEach(function (link) {
            var navKey = link.dataset.navKey;
            if (!navKey) {
              return;
            }
            var label = texts[lang][navKey];
            if (label) {
              if (navKey === 'contactsNav' && typeof setButtonLabelWithIconBinding === 'function' && (link === null || link === void 0 ? void 0 : link.tagName) === 'BUTTON') {
                setButtonLabelWithIconBinding(link, label, (typeof ICON_GLYPHS === "undefined" ? "undefined" : _typeof(ICON_GLYPHS)) === 'object' && ICON_GLYPHS && ICON_GLYPHS.contacts ? ICON_GLYPHS.contacts : iconGlyph("\\uF404", ICON_FONT_KEYS.UICONS));
              } else {
                link.textContent = label;
              }
              link.setAttribute("aria-label", label);
            }
            var helpKey = "".concat(navKey, "Help");
            var helpText = texts[lang][helpKey];
            if (helpText) {
              link.setAttribute("title", helpText);
              link.setAttribute("data-help", helpText);
            } else {
              if (navKey === 'projectRequirementsNav') {
                console.warn("[Cine Power Planner] Missing help text for ".concat(navKey, " in lang ").concat(lang));
              }
              link.removeAttribute("title");
              link.removeAttribute("data-help");
            }
          });
          applyOwnGearLocalization(lang);
          savedSetupsLabelElem = document.getElementById("savedSetupsLabel");
          savedSetupsLabelElem.textContent = texts[lang].savedSetupsLabel;
          savedSetupsLabelElem.setAttribute("data-help", texts[lang].setupSelectHelp);
          setupNameLabelElem = document.getElementById("setupNameLabel");
          setupNameLabelElem.textContent = texts[lang].setupNameLabel;
          setupNameLabelElem.setAttribute("data-help", texts[lang].setupNameHelp);
          setButtonLabelWithIconBinding(deleteSetupBtn, texts[lang].deleteSetupBtn, ICON_GLYPHS.trash);
          sharedLinkLabelElem = document.getElementById("sharedLinkLabel");
          sharedLinkLabelElem.textContent = texts[lang].sharedLinkLabel;
          sharedLinkLabelElem.setAttribute("data-help", texts[lang].sharedLinkHelp);
          setButtonLabelWithIconBinding(applySharedLinkBtn, texts[lang].loadSharedLinkBtn, ICON_GLYPHS.fileImport);
          setupSelect.setAttribute("data-help", texts[lang].setupSelectHelp);
          setupNameInput.setAttribute("data-help", texts[lang].setupNameHelp);
          deleteSetupBtn.setAttribute("title", texts[lang].deleteSetupHelp);
          deleteSetupBtn.setAttribute("aria-label", texts[lang].deleteSetupHelp);
          deleteSetupBtn.setAttribute("data-help", texts[lang].deleteSetupHelp);
          saveSetupBtn.setAttribute("title", texts[lang].saveSetupHelp);
          saveSetupBtn.setAttribute("aria-label", texts[lang].saveSetupHelp);
          saveSetupBtn.setAttribute("data-help", texts[lang].saveSetupHelp);
          generateOverviewBtn.setAttribute("title", texts[lang].generateOverviewBtn);
          generateOverviewBtn.setAttribute("data-help", texts[lang].generateOverviewHelp);
          generateGearListBtn.setAttribute("title", texts[lang].generateGearListBtn);
          generateGearListBtn.setAttribute("data-help", texts[lang].generateGearListHelp);
          deleteGearListHelp = texts[lang].deleteGearListBtnHelp || texts[lang].deleteGearListBtn;
          if (deleteGearListProjectBtn) {
            setButtonLabelWithIconBinding(deleteGearListProjectBtn, texts[lang].deleteGearListBtn, ICON_GLYPHS.trash);
            deleteGearListProjectBtn.setAttribute("title", deleteGearListHelp);
            deleteGearListProjectBtn.setAttribute("data-help", deleteGearListHelp);
            deleteGearListProjectBtn.setAttribute("aria-label", deleteGearListHelp);
          }
          editProjectBtnElem = document.getElementById("editProjectBtn");
          if (editProjectBtnElem) {
            editProjectBtnElem.textContent = texts[lang].editProjectBtn;
            editProjectBtnElem.setAttribute("title", texts[lang].editProjectBtn);
            editProjectBtnElem.setAttribute("data-help", texts[lang].editProjectBtn);
          }
          addExtraGearBtnElem = document.getElementById("addExtraGearBtn");
          if (addExtraGearBtnElem) {
            extraLabel = texts[lang].addExtraGearBtn || ((_texts$en27 = texts.en) === null || _texts$en27 === void 0 ? void 0 : _texts$en27.addExtraGearBtn) || "Add temporary extra gear";
            addExtraGearBtnElem.textContent = extraLabel;
            addExtraGearBtnElem.setAttribute("title", extraLabel);
            addExtraGearBtnElem.setAttribute("data-help", extraLabel);
          }
          shareSetupBtn.setAttribute("title", texts[lang].shareSetupBtn);
          shareSetupBtn.setAttribute("data-help", texts[lang].shareSetupHelp);
          if (shareDialogHeadingElem) {
            heading = texts[lang].shareDialogTitle || ((_texts$en28 = texts.en) === null || _texts$en28 === void 0 ? void 0 : _texts$en28.shareDialogTitle) || shareDialogHeadingElem.textContent;
            shareDialogHeadingElem.textContent = heading;
          }
          if (shareFilenameLabelElem) {
            filenameLabel = texts[lang].shareFilenameLabel || ((_texts$en29 = texts.en) === null || _texts$en29 === void 0 ? void 0 : _texts$en29.shareFilenameLabel) || shareFilenameLabelElem.textContent;
            shareFilenameLabelElem.textContent = filenameLabel;
          }
          if (shareConfirmBtn) {
            confirmLabel = texts[lang].shareDialogConfirm || ((_texts$en30 = texts.en) === null || _texts$en30 === void 0 ? void 0 : _texts$en30.shareDialogConfirm) || shareConfirmBtn.textContent;
            setButtonLabelWithIconBinding(shareConfirmBtn, confirmLabel, ICON_GLYPHS.fileExport);
            shareConfirmBtn.setAttribute('title', confirmLabel);
            shareConfirmBtn.setAttribute('aria-label', confirmLabel);
            shareConfirmBtn.setAttribute('data-help', texts[lang].shareSetupHelp);
          }
          if (shareCancelBtn) {
            cancelLabel = texts[lang].shareDialogCancel || ((_texts$en31 = texts.en) === null || _texts$en31 === void 0 ? void 0 : _texts$en31.shareDialogCancel) || shareCancelBtn.textContent;
            setButtonLabelWithIconBinding(shareCancelBtn, cancelLabel, ICON_GLYPHS.circleX);
            shareCancelBtn.setAttribute('title', cancelLabel);
            shareCancelBtn.setAttribute('aria-label', cancelLabel);
          }
          if (shareIncludeAutoGearText) {
            label = texts[lang].shareIncludeAutoGearLabel || ((_texts$en32 = texts.en) === null || _texts$en32 === void 0 ? void 0 : _texts$en32.shareIncludeAutoGearLabel) || shareIncludeAutoGearText.textContent;
            shareIncludeAutoGearText.textContent = label;
            help = texts[lang].shareIncludeAutoGearHelp || ((_texts$en33 = texts.en) === null || _texts$en33 === void 0 ? void 0 : _texts$en33.shareIncludeAutoGearHelp) || label;
            if (shareIncludeAutoGearLabelElem) {
              shareIncludeAutoGearLabelElem.setAttribute('data-help', help);
            }
            if (shareIncludeAutoGearCheckbox) {
              shareIncludeAutoGearCheckbox.setAttribute('aria-label', label);
            }
          }
          if (shareIncludeOwnedGearText) {
            _label3 = texts[lang].shareIncludeOwnedGearLabel || ((_texts$en34 = texts.en) === null || _texts$en34 === void 0 ? void 0 : _texts$en34.shareIncludeOwnedGearLabel) || shareIncludeOwnedGearText.textContent;
            shareIncludeOwnedGearText.textContent = _label3;
            _help2 = texts[lang].shareIncludeOwnedGearHelp || ((_texts$en35 = texts.en) === null || _texts$en35 === void 0 ? void 0 : _texts$en35.shareIncludeOwnedGearHelp) || _label3;
            if (shareIncludeOwnedGearLabelElem) {
              shareIncludeOwnedGearLabelElem.setAttribute('data-help', _help2);
            }
            if (shareIncludeOwnedGearCheckbox) {
              shareIncludeOwnedGearCheckbox.setAttribute('aria-label', _label3);
            }
          }
          sharedImportLegendText = sharedImportLegend ? sharedImportLegend.textContent : '';
          if (sharedImportDialogHeading) {
            title = texts[lang].sharedImportDialogTitle || ((_texts$en36 = texts.en) === null || _texts$en36 === void 0 ? void 0 : _texts$en36.sharedImportDialogTitle) || sharedImportDialogHeading.textContent;
            sharedImportDialogHeading.textContent = title;
          }
          if (sharedImportDialogMessage) {
            message = texts[lang].sharedImportDialogMessage || ((_texts$en37 = texts.en) === null || _texts$en37 === void 0 ? void 0 : _texts$en37.sharedImportDialogMessage) || sharedImportDialogMessage.textContent;
            sharedImportDialogMessage.textContent = message;
            sharedImportDialogMessage.setAttribute('data-help', message);
          }
          if (sharedImportConfirmBtn) {
            _label4 = texts[lang].sharedImportDialogConfirm || ((_texts$en38 = texts.en) === null || _texts$en38 === void 0 ? void 0 : _texts$en38.sharedImportDialogConfirm) || sharedImportConfirmBtn.textContent;
            setButtonLabelWithIconBinding(sharedImportConfirmBtn, _label4, ICON_GLYPHS.check);
            sharedImportConfirmBtn.setAttribute('data-help', _label4);
          }
          if (sharedImportCancelBtn) {
            _label5 = texts[lang].sharedImportDialogCancel || ((_texts$en39 = texts.en) === null || _texts$en39 === void 0 ? void 0 : _texts$en39.sharedImportDialogCancel) || sharedImportCancelBtn.textContent;
            setButtonLabelWithIconBinding(sharedImportCancelBtn, _label5, ICON_GLYPHS.circleX);
            sharedImportCancelBtn.setAttribute('data-help', _label5);
          }
          if (sharedImportLegend) {
            legend = texts[lang].sharedImportAutoGearLabel || ((_texts$en40 = texts.en) === null || _texts$en40 === void 0 ? void 0 : _texts$en40.sharedImportAutoGearLabel) || sharedImportLegend.textContent;
            sharedImportLegend.textContent = legend;
            sharedImportLegendText = legend;
            if (sharedImportOptions) {
              sharedImportOptions.setAttribute('data-help', legend);
            }
          }
          if (sharedImportModeSelect && sharedImportLegendText) {
            sharedImportModeSelect.setAttribute('aria-label', sharedImportLegendText);
            sharedImportModeSelect.setAttribute('data-help', sharedImportLegendText);
          }
          if (sharedImportModeNoneOption) {
            _label6 = texts[lang].sharedImportAutoGearNone || ((_texts$en41 = texts.en) === null || _texts$en41 === void 0 ? void 0 : _texts$en41.sharedImportAutoGearNone) || sharedImportModeNoneOption.textContent;
            sharedImportModeNoneOption.textContent = _label6;
            _help3 = texts[lang].sharedImportAutoGearNoneHelp || ((_texts$en42 = texts.en) === null || _texts$en42 === void 0 ? void 0 : _texts$en42.sharedImportAutoGearNoneHelp) || _label6;
            sharedImportModeNoneOption.setAttribute('data-help', _help3);
            sharedImportModeNoneOption.setAttribute('title', _help3);
            sharedImportModeNoneOption.setAttribute('aria-label', _label6);
          }
          if (sharedImportModeProjectOption) {
            _label7 = texts[lang].sharedImportAutoGearProject || ((_texts$en43 = texts.en) === null || _texts$en43 === void 0 ? void 0 : _texts$en43.sharedImportAutoGearProject) || sharedImportModeProjectOption.textContent;
            sharedImportModeProjectOption.textContent = _label7;
            _help4 = texts[lang].sharedImportAutoGearProjectHelp || ((_texts$en44 = texts.en) === null || _texts$en44 === void 0 ? void 0 : _texts$en44.sharedImportAutoGearProjectHelp) || _label7;
            sharedImportModeProjectOption.setAttribute('data-help', _help4);
            sharedImportModeProjectOption.setAttribute('title', _help4);
            sharedImportModeProjectOption.setAttribute('aria-label', _label7);
          }
          if (sharedImportModeGlobalOption) {
            _label8 = texts[lang].sharedImportAutoGearGlobal || ((_texts$en45 = texts.en) === null || _texts$en45 === void 0 ? void 0 : _texts$en45.sharedImportAutoGearGlobal) || sharedImportModeGlobalOption.textContent;
            sharedImportModeGlobalOption.textContent = _label8;
            _help5 = texts[lang].sharedImportAutoGearGlobalHelp || ((_texts$en46 = texts.en) === null || _texts$en46 === void 0 ? void 0 : _texts$en46.sharedImportAutoGearGlobalHelp) || _label8;
            sharedImportModeGlobalOption.setAttribute('data-help', _help5);
            sharedImportModeGlobalOption.setAttribute('title', _help5);
            sharedImportModeGlobalOption.setAttribute('aria-label', _label8);
          }
          applySharedLinkBtn.setAttribute("title", texts[lang].loadSharedLinkBtn);
          applySharedLinkBtn.setAttribute("data-help", texts[lang].applySharedLinkHelp);
          runtimeFeedbackBtn.setAttribute("title", texts[lang].runtimeFeedbackBtn);
          runtimeFeedbackBtn.setAttribute("data-help", texts[lang].runtimeFeedbackBtnHelp);
          setButtonLabelWithIconBinding(runtimeFeedbackBtn, texts[lang].runtimeFeedbackBtn, ICON_GLYPHS.feedback);
          if (setupSelect.options.length > 0) {
            setupSelect.options[0].textContent = texts[lang].newSetupOption;
          }
          checkSetupChanged();
          cameraLabelElem = document.getElementById("cameraLabel");
          cameraLabelElem.textContent = texts[lang].cameraLabel;
          cameraLabelElem.setAttribute("data-help", texts[lang].cameraSelectHelp);
          monitorLabelElem = document.getElementById("monitorLabel");
          monitorLabelElem.textContent = texts[lang].monitorLabel;
          monitorLabelElem.setAttribute("data-help", texts[lang].monitorSelectHelp);
          videoLabelElem = document.getElementById("videoLabel");
          videoLabelElem.textContent = texts[lang].videoLabel;
          videoLabelElem.setAttribute("data-help", texts[lang].videoSelectHelp);
          cageLabelElem = document.getElementById("cageLabel");
          if (cageLabelElem) {
            cageLabelElem.textContent = texts[lang].cageLabel;
            cageLabelElem.setAttribute("data-help", texts[lang].cageSelectHelp);
          }
          distanceLabelElem = document.getElementById("distanceLabel");
          distanceLabelElem.textContent = texts[lang].distanceLabel;
          distanceLabelElem.setAttribute("data-help", texts[lang].distanceSelectHelp);
          batteryPlateLabelElem = document.getElementById("batteryPlateLabel");
          batteryPlateLabelElem.textContent = texts[lang].batteryPlateLabel;
          batteryPlateLabelElem.setAttribute("data-help", texts[lang].batteryPlateSelectHelp);
          batteryHotswapLabelElem = document.getElementById("batteryHotswapLabel");
          if (batteryHotswapLabelElem) {
            batteryHotswapLabelElem.textContent = texts[lang].batteryHotswapLabel;
            batteryHotswapLabelElem.setAttribute("data-help", texts[lang].batteryHotswapSelectHelp);
          }
          updateBatteryLabel();
          fizLegendElem = document.getElementById("fizLegend");
          if (fizLegendElem) {
            fizLegendElem.textContent = texts[lang].fizLegend;
            fizLegendElem.setAttribute("data-help", texts[lang].fizLegendHelp);
          }
          fizMotorsLabelElem = document.getElementById("fizMotorsLabel");
          if (fizMotorsLabelElem) {
            fizMotorsLabelElem.textContent = texts[lang].fizMotorsLabel;
            fizMotorsLabelElem.setAttribute("data-help", texts[lang].fizMotorsHelp);
          }
          fizControllersLabelElem = document.getElementById("fizControllersLabel");
          if (fizControllersLabelElem) {
            fizControllersLabelElem.textContent = texts[lang].fizControllersLabel;
            fizControllersLabelElem.setAttribute("data-help", texts[lang].fizControllersHelp);
          }
          document.querySelectorAll('#motorNotesLabel,#controllerNotesLabel,#distanceNotesLabel').forEach(function (el) {
            el.textContent = texts[lang].notesLabel;
          });
          cineResultsModule = (typeof cineResults === "undefined" ? "undefined" : _typeof(cineResults)) === 'object' ? cineResults : null;
          resultsLocalizationApplied = false;
          if (cineResultsModule && typeof cineResultsModule.localizeResultsSection === 'function') {
            try {
              resultsLocalizationApplied = cineResultsModule.localizeResultsSection({
                lang: lang,
                langTexts: texts[lang] || {},
                fallbackTexts: texts.en || {},
                document: document,
                breakdownListElem: typeof breakdownListElem !== 'undefined' && breakdownListElem ? breakdownListElem : null,
                elements: {
                  totalPowerLabel: document.getElementById('totalPowerLabel'),
                  batteryCountLabel: document.getElementById('batteryCountLabel'),
                  pinWarning: typeof pinWarnElem !== 'undefined' ? pinWarnElem : null,
                  dtapWarning: typeof dtapWarnElem !== 'undefined' ? dtapWarnElem : null,
                  hotswapWarning: typeof hotswapWarnElem !== 'undefined' ? hotswapWarnElem : null,
                  powerWarningTitle: typeof powerWarningTitleElem !== 'undefined' ? powerWarningTitleElem : null,
                  powerWarningLimitsHeading: typeof powerWarningLimitsHeadingElem !== 'undefined' ? powerWarningLimitsHeadingElem : null,
                  powerWarningAdvice: typeof powerWarningAdviceElem !== 'undefined' ? powerWarningAdviceElem : null,
                  powerWarningCloseBtn: typeof powerWarningCloseBtn !== 'undefined' ? powerWarningCloseBtn : null,
                  batteryLifeUnit: document.getElementById('batteryLifeUnit'),
                  batteryLifeLabel: typeof batteryLifeLabelElem !== 'undefined' ? batteryLifeLabelElem : document.getElementById('batteryLifeLabel'),
                  runtimeAverageNote: typeof runtimeAverageNoteElem !== 'undefined' ? runtimeAverageNoteElem : document.getElementById('runtimeAverageNote'),
                  tempNote: document.getElementById('temperatureNote')
                },
                refreshTotalCurrentLabels: typeof refreshTotalCurrentLabels === 'function' ? refreshTotalCurrentLabels : null,
                updateMountVoltageSettingLabels: typeof updateMountVoltageSettingLabels === 'function' ? updateMountVoltageSettingLabels : null,
                getCurrentSetupKey: typeof getCurrentSetupKey === 'function' ? getCurrentSetupKey : null,
                renderFeedbackTable: typeof renderFeedbackTable === 'function' ? renderFeedbackTable : null,
                dispatchTemperatureNoteRender: typeof dispatchTemperatureNoteRender === 'function' ? dispatchTemperatureNoteRender : null,
                refreshFeedbackTemperatureLabel: typeof refreshFeedbackTemperatureLabel === 'function' ? refreshFeedbackTemperatureLabel : null,
                updateFeedbackTemperatureOptions: typeof updateFeedbackTemperatureOptions === 'function' ? updateFeedbackTemperatureOptions : null,
                lastRuntimeHours: typeof lastRuntimeHours !== 'undefined' ? lastRuntimeHours : null,
                temperatureUnit: typeof temperatureUnit !== 'undefined' ? temperatureUnit : null,
                setButtonLabelWithIcon: typeof setButtonLabelWithIconBinding === 'function' ? setButtonLabelWithIconBinding : null,
                iconGlyphs: typeof ICON_GLYPHS !== 'undefined' ? ICON_GLYPHS : null
              });
            } catch (cineResultsError) {
              console.warn('cineResults.localizeResultsSection failed', cineResultsError);
              resultsLocalizationApplied = false;
            }
          }
          batteryComparisonLocalized = false;
          if (cineResultsModule && typeof cineResultsModule.localizeBatteryComparisonSection === "function") {
            try {
              batteryComparisonLocalized = cineResultsModule.localizeBatteryComparisonSection({
                lang: lang,
                langTexts: texts[lang] || {},
                fallbackTexts: texts.en || {},
                document: document,
                batteryComparisonHeading: batteryComparisonHeadingElem,
                batteryComparisonDescription: batteryComparisonDescriptionElem,
                batteryComparisonTable: batteryTableElem
              });
            } catch (cineResultsError) {
              console.warn("cineResults.localizeBatteryComparisonSection failed", cineResultsError);
              batteryComparisonLocalized = false;
            }
          }
          if (!batteryComparisonLocalized) {
            if (batteryComparisonHeadingElem) {
              batteryComparisonHeadingElem.textContent = texts[lang].batteryComparisonHeading;
              batteryComparisonHeadingElem.setAttribute("data-help", texts[lang].batteryComparisonHeadingHelp);
            }
            if (batteryComparisonDescriptionElem) {
              batteryComparisonDescriptionElem.textContent = texts[lang].batteryComparisonDescription;
              if (texts[lang].batteryComparisonDescriptionHelp) {
                batteryComparisonDescriptionElem.setAttribute("data-help", texts[lang].batteryComparisonDescriptionHelp);
              } else {
                batteryComparisonDescriptionElem.removeAttribute("data-help");
              }
            }
            if (batteryTableElem) {
              if (texts[lang].batteryComparisonTableHelp) {
                batteryTableElem.setAttribute("data-help", texts[lang].batteryComparisonTableHelp);
              } else {
                batteryTableElem.removeAttribute("data-help");
              }
            }
          }
          if (!resultsLocalizationApplied) {
            resultsPlainSummaryElem = document.getElementById("resultsPlainSummary");
            if (resultsPlainSummaryElem) {
              resultsPlainSummaryElem.setAttribute("data-help", texts[lang].resultsPlainSummaryHelp);
            }
            resultsPlainSummaryTitleElem = document.getElementById("resultsPlainSummaryTitle");
            if (resultsPlainSummaryTitleElem) {
              resultsPlainSummaryTitleElem.textContent = texts[lang].resultsPlainSummaryTitle;
            }
            resultsPlainSummaryTextElem = document.getElementById("resultsPlainSummaryText");
            if (resultsPlainSummaryTextElem) {
              resultsPlainSummaryTextElem.textContent = texts[lang].resultsPlainSummaryPrompt;
            }
            resultsPlainSummaryNoteElem = document.getElementById("resultsPlainSummaryNote");
            if (resultsPlainSummaryNoteElem) {
              resultsPlainSummaryNoteElem.textContent = texts[lang].resultsPlainSummaryNote;
            }
            breakdownListTarget = typeof breakdownListElem !== "undefined" && breakdownListElem ? breakdownListElem : document.getElementById('breakdownList');
            if (breakdownListTarget) {
              breakdownListTarget.setAttribute("data-help", texts[lang].breakdownListHelp);
            }
            totalPowerLabelElem = document.getElementById("totalPowerLabel");
            if (totalPowerLabelElem && texts[lang]) {
              totalPowerLabelElem.textContent = texts[lang].totalPowerLabel;
              totalPowerLabelElem.setAttribute("data-help", texts[lang].totalPowerHelp);
            }
            if (typeof refreshTotalCurrentLabels === 'function') {
              refreshTotalCurrentLabels(lang);
            }
            updateMountVoltageSettingLabels(lang);
            batteryCountLabelElem = document.getElementById("batteryCountLabel");
            if (batteryCountLabelElem) {
              batteryCountLabelElem.textContent = texts[lang].batteryCountLabel;
              batteryCountLabelElem.setAttribute("data-help", texts[lang].batteryCountHelp);
            }
            if (pinWarnElem) pinWarnElem.setAttribute("data-help", texts[lang].pinWarningHelp);
            if (dtapWarnElem) dtapWarnElem.setAttribute("data-help", texts[lang].dtapWarningHelp);
            if (hotswapWarnElem) hotswapWarnElem.setAttribute("data-help", texts[lang].hotswapWarningHelp);
            if (powerWarningTitleElem) powerWarningTitleElem.textContent = texts[lang].powerWarningTitle;
            if (powerWarningLimitsHeadingElem) powerWarningLimitsHeadingElem.textContent = texts[lang].powerWarningLimitsHeading;
            if (powerWarningAdviceElem) powerWarningAdviceElem.textContent = texts[lang].powerWarningAdvice;
            if (powerWarningCloseBtn) setButtonLabelWithIconBinding(powerWarningCloseBtn, texts[lang].powerWarningClose, ICON_GLYPHS.check);
            unitElem = document.getElementById("batteryLifeUnit");
            if (unitElem) unitElem.textContent = texts[lang].batteryLifeUnit;
            fb = renderFeedbackTable(getCurrentSetupKey());
            if (batteryLifeLabelElem) {
              _label9 = texts[lang].batteryLifeLabel;
              if (fb) {
                userNote = texts[lang].runtimeUserCountNote.replace('{count}', fb.count);
                idx = _label9.indexOf(')');
                if (idx !== -1) {
                  _label9 = "".concat(_label9.slice(0, idx), ", ").concat(userNote).concat(_label9.slice(idx));
                }
              }
              batteryLifeLabelElem.textContent = _label9;
              batteryLifeLabelElem.setAttribute("data-help", texts[lang].batteryLifeHelp);
            }
            if (runtimeAverageNoteElem) {
              runtimeAverageNoteElem.textContent = fb && fb.count > 4 ? texts[lang].runtimeAverageNote : '';
            }
            dispatchTemperatureNoteRender(lastRuntimeHours);
            if (typeof refreshFeedbackTemperatureLabel === 'function') {
              refreshFeedbackTemperatureLabel(lang, temperatureUnit);
            }
            updateFeedbackTemperatureOptions(lang, temperatureUnit);
            tempNoteElem = document.getElementById("temperatureNote");
            if (tempNoteElem) tempNoteElem.setAttribute("data-help", texts[lang].temperatureNoteHelp);
          }
          document.getElementById("addDeviceHeading").textContent = texts[lang].addDeviceHeading;
          document.getElementById("categoryLabel").textContent = texts[lang].categoryLabel;
          document.getElementById("subcategoryLabel").textContent = texts[lang].subcategoryLabel;
          document.getElementById("deviceNameLabel").textContent = texts[lang].deviceNameLabel;
          document.getElementById("consumptionLabel").textContent = texts[lang].consumptionLabel;
          document.getElementById("capacityLabel").textContent = texts[lang].capacityLabel;
          document.getElementById("pinLabel").textContent = texts[lang].pinLabel;
          document.getElementById("dtapLabel").textContent = texts[lang].dtapLabel;
          document.getElementById("cameraWattLabel").textContent = texts[lang].cameraWattLabel;
          document.getElementById("cameraVoltageLabel").textContent = texts[lang].cameraVoltageLabel;
          document.getElementById("cameraPortTypeLabel").textContent = texts[lang].cameraPortTypeLabel;
          document.getElementById("cameraPlatesLabel").textContent = texts[lang].cameraPlatesLabel;
          document.getElementById("cameraMediaLabel").textContent = texts[lang].cameraMediaLabel;
          document.getElementById("cameraLensMountLabel").textContent = texts[lang].cameraLensMountLabel;
          document.getElementById("cameraPowerDistLabel").textContent = texts[lang].powerDistributionLabel;
          document.getElementById("cameraVideoOutputsLabel").textContent = texts[lang].videoOutputsLabel;
          document.getElementById("cameraFIZConnectorLabel").textContent = texts[lang].fizConnectorLabel;
          document.getElementById("cameraViewfinderLabel").textContent = texts[lang].viewfinderLabel;
          document.getElementById("cameraTimecodeLabel").textContent = texts[lang].timecodeLabel;
          document.getElementById("powerInputsHeading").textContent = texts[lang].powerInputsHeading;
          document.getElementById("powerDistributionHeading").textContent = texts[lang].powerDistributionHeading;
          document.getElementById("videoOutputsHeading").textContent = texts[lang].videoOutputsHeading;
          document.getElementById("fizConnectorHeading").textContent = texts[lang].fizConnectorHeading;
          document.getElementById("mediaHeading").textContent = texts[lang].mediaHeading;
          document.getElementById("viewfinderHeading").textContent = texts[lang].viewfinderHeading;
          document.getElementById("lensMountHeading").textContent = texts[lang].lensMountHeading;
          lensDeviceMountHeadingElem = document.getElementById("lensDeviceMountHeading");
          if (lensDeviceMountHeadingElem) {
            lensDeviceMountHeadingElem.textContent = texts[lang].lensDeviceMountHeading;
          }
          lensDeviceMountLabelElem = document.getElementById("lensDeviceMountLabel");
          if (lensDeviceMountLabelElem) {
            lensDeviceMountLabelElem.textContent = texts[lang].lensDeviceMountLabel;
            lensDeviceMountLabelElem.setAttribute('data-help', texts[lang].lensDeviceMountHelp);
          }
          lensFocusScaleLabelElem = document.getElementById("lensFocusScaleUnitLabel");
          if (lensFocusScaleLabelElem) {
            focusScaleLabel = texts[lang].lensFocusScaleLabel || texts[lang].focusScaleSetting;
            focusScaleHelp = texts[lang].lensFocusScaleHelp || texts[lang].lensFocusScaleLabel || texts[lang].focusScaleSettingHelp || focusScaleLabel;
            lensFocusScaleLabelElem.textContent = focusScaleLabel;
            lensFocusScaleLabelElem.setAttribute('data-help', focusScaleHelp);
            if (lensFocusScaleSelect) {
              lensFocusScaleSelect.setAttribute('data-help', focusScaleHelp);
              lensFocusScaleSelect.setAttribute('aria-label', focusScaleLabel);
            }
          }
          updateLensFocusScaleSelectOptions(lang);
          document.getElementById("timecodeHeading").textContent = texts[lang].timecodeHeading;
          document.getElementById("monitorScreenSizeLabel").textContent = texts[lang].monitorScreenSizeLabel;
          document.getElementById("monitorBrightnessLabel").textContent = texts[lang].monitorBrightnessLabel;
          document.getElementById("monitorWattLabel").textContent = texts[lang].monitorWattLabel;
          document.getElementById("monitorVoltageLabel").textContent = texts[lang].monitorVoltageLabel;
          document.getElementById("monitorPortTypeLabel").textContent = texts[lang].monitorPortTypeLabel;
          document.getElementById("monitorVideoInputsHeading").textContent = texts[lang].monitorVideoInputsHeading;
          document.getElementById("monitorVideoOutputsHeading").textContent = texts[lang].monitorVideoOutputsHeading;
          document.getElementById("monitorVideoInputsLabel").textContent = texts[lang].monitorVideoInputsLabel;
          document.getElementById("monitorVideoOutputsLabel").textContent = texts[lang].monitorVideoOutputsLabel;
          document.getElementById("monitorWirelessTxLabel").textContent = texts[lang].monitorWirelessTxLabel;
          monitorLatencyLabelElem = document.getElementById("monitorLatencyLabel");
          if (monitorLatencyLabelElem) {
            monitorLatencyLabelElem.textContent = texts[lang].monitorLatencyLabel;
            monitorLatencyHelpText = texts[lang].monitorLatencyHelp;
            if (monitorLatencyHelpText) {
              monitorLatencyLabelElem.setAttribute('data-help', monitorLatencyHelpText);
              monitorLatencyLabelElem.setAttribute('title', monitorLatencyHelpText);
              if (monitorLatencyInput) {
                monitorLatencyInput.setAttribute('data-help', monitorLatencyHelpText);
                monitorLatencyInput.setAttribute('title', monitorLatencyHelpText);
              }
            } else {
              monitorLatencyLabelElem.removeAttribute('data-help');
              monitorLatencyLabelElem.removeAttribute('title');
              if (monitorLatencyInput) {
                monitorLatencyInput.removeAttribute('data-help');
                monitorLatencyInput.removeAttribute('title');
              }
            }
          }
          document.getElementById("monitorAudioOutputLabel").textContent = texts[lang].monitorAudioOutputLabel;
          document.getElementById("viewfinderDetailsHeading").textContent = texts[lang].viewfinderDetailsHeading;
          document.getElementById("viewfinderScreenSizeLabel").textContent = texts[lang].viewfinderScreenSizeLabel;
          document.getElementById("viewfinderBrightnessLabel").textContent = texts[lang].viewfinderBrightnessLabel;
          document.getElementById("viewfinderWattLabel").textContent = texts[lang].viewfinderWattLabel;
          document.getElementById("viewfinderVoltageLabel").textContent = texts[lang].viewfinderVoltageLabel;
          document.getElementById("viewfinderPortTypeLabel").textContent = texts[lang].viewfinderPortTypeLabel;
          document.getElementById("viewfinderVideoInputsHeading").textContent = texts[lang].viewfinderVideoInputsHeading;
          document.getElementById("viewfinderVideoOutputsHeading").textContent = texts[lang].viewfinderVideoOutputsHeading;
          document.getElementById("viewfinderVideoInputsLabel").textContent = texts[lang].viewfinderVideoInputsLabel;
          document.getElementById("viewfinderVideoOutputsLabel").textContent = texts[lang].viewfinderVideoOutputsLabel;
          document.getElementById("viewfinderWirelessTxLabel").textContent = texts[lang].viewfinderWirelessTxLabel;
          viewfinderLatencyLabelElem = document.getElementById("viewfinderLatencyLabel");
          if (viewfinderLatencyLabelElem) {
            viewfinderLatencyLabelElem.textContent = texts[lang].viewfinderLatencyLabel;
            viewfinderLatencyHelpText = texts[lang].viewfinderLatencyHelp;
            if (viewfinderLatencyHelpText) {
              viewfinderLatencyLabelElem.setAttribute('data-help', viewfinderLatencyHelpText);
              viewfinderLatencyLabelElem.setAttribute('title', viewfinderLatencyHelpText);
              if (viewfinderLatencyInput) {
                viewfinderLatencyInput.setAttribute('data-help', viewfinderLatencyHelpText);
                viewfinderLatencyInput.setAttribute('title', viewfinderLatencyHelpText);
              }
            } else {
              viewfinderLatencyLabelElem.removeAttribute('data-help');
              viewfinderLatencyLabelElem.removeAttribute('title');
              if (viewfinderLatencyInput) {
                viewfinderLatencyInput.removeAttribute('data-help');
                viewfinderLatencyInput.removeAttribute('title');
              }
            }
          }
          videoPowerHeadingElem = document.getElementById("videoPowerInputsHeading");
          if (videoPowerHeadingElem) {
            videoPowerHeadingElem.textContent = texts[lang].videoPowerInputsHeading || texts[lang].powerInputsHeading || 'Power Inputs';
          }
          videoPowerLabelElem = document.getElementById("videoPowerInputLabel");
          if (videoPowerLabelElem) {
            videoPowerLabelElem.textContent = texts[lang].videoPowerInputLabel || texts[lang].powerInputsHeading;
            powerHelp = texts[lang].videoPowerInputHelp || '';
            if (powerHelp) {
              videoPowerLabelElem.setAttribute('data-help', powerHelp);
              videoPowerLabelElem.setAttribute('title', powerHelp);
            } else {
              videoPowerLabelElem.removeAttribute('data-help');
              videoPowerLabelElem.removeAttribute('title');
            }
          }
          document.getElementById("videoVideoInputsHeading").textContent = texts[lang].videoVideoInputsHeading;
          document.getElementById("videoVideoInputsLabel").textContent = texts[lang].videoVideoInputsLabel;
          document.getElementById("videoVideoOutputsHeading").textContent = texts[lang].videoVideoOutputsHeading;
          document.getElementById("videoVideoOutputsLabel").textContent = texts[lang].videoVideoOutputsLabel;
          document.getElementById("monitorDetailsHeading").textContent = texts[lang].monitorDetailsHeading;
          document.getElementById("monitorPowerHeading").textContent = texts[lang].monitorPowerHeading;
          addDeviceLabel = texts[lang].addDeviceBtn;
          updateDeviceLabel = texts[lang].updateDeviceBtn;
          if (addDeviceBtn.dataset.mode === "edit") {
            setButtonLabelWithIconBinding(addDeviceBtn, updateDeviceLabel, ICON_GLYPHS.save);
            addDeviceBtn.setAttribute('data-help', texts[lang].updateDeviceBtnHelp);
          } else {
            setButtonLabelWithIconBinding(addDeviceBtn, addDeviceLabel, ICON_GLYPHS.add);
            addDeviceBtn.setAttribute('data-help', texts[lang].addDeviceBtnHelp);
          }
          setButtonLabelWithIconBinding(cancelEditBtn, texts[lang].cancelEditBtn, ICON_GLYPHS.circleX);
          cancelEditBtn.setAttribute('data-help', texts[lang].cancelEditBtnHelp);
          setButtonLabelWithIconBinding(exportBtn, texts[lang].exportDataBtn, ICON_GLYPHS.fileExport);
          exportBtn.setAttribute('data-help', texts[lang].exportDataBtnHelp);
          setButtonLabelWithIconBinding(importDataBtn, texts[lang].importDataBtn, ICON_GLYPHS.fileImport);
          importDataBtn.setAttribute('data-help', texts[lang].importDataBtnHelp);
          setupNameInput.placeholder = texts[lang].setupNameLabel.replace(":", "");
          newNameInput.placeholder = texts[lang].placeholder_deviceName;
          newWattInput.placeholder = texts[lang].placeholder_watt;
          newCapacityInput.placeholder = texts[lang].placeholder_capacity;
          newPinAInput.placeholder = texts[lang].placeholder_pin;
          newDtapAInput.placeholder = texts[lang].placeholder_dtap;
          cameraVoltageInput.placeholder = texts[lang].placeholder_voltage;
          monitorVoltageInput.placeholder = texts[lang].placeholder_voltage;
          updateDeviceManagerLocalization(lang);
          if (deviceManagerSection.classList.contains('hidden')) {
            setButtonLabelWithIconBinding(toggleDeviceBtn, texts[lang].toggleDeviceManager, ICON_GLYPHS.gears);
            toggleDeviceBtn.setAttribute("title", texts[lang].toggleDeviceManager);
            toggleDeviceBtn.setAttribute("data-help", texts[lang].toggleDeviceManagerHelp);
            toggleDeviceBtn.setAttribute("aria-expanded", "false");
          } else {
            setButtonLabelWithIconBinding(toggleDeviceBtn, texts[lang].hideDeviceManager, ICON_GLYPHS.minus);
            toggleDeviceBtn.setAttribute("title", texts[lang].hideDeviceManager);
            toggleDeviceBtn.setAttribute("data-help", texts[lang].hideDeviceManagerHelp);
            toggleDeviceBtn.setAttribute("aria-expanded", "true");
          }
          Array.from(newCategorySelect.options).forEach(function (opt) {
            opt.textContent = getCategoryLabel(opt.value, lang);
          });
          noneMap = {
            de: "Keine Auswahl",
            es: "Ninguno",
            fr: "Aucun"
          };
          document.querySelectorAll('select option[value="None"]').forEach(function (opt) {
            opt.textContent = noneMap[lang] || "None";
          });
          try {
            localStorage.setItem("language", lang);
          } catch (e) {
            console.warn("Could not save language to localStorage", e);
          }
          if (typeof refreshDeviceLists === 'function') {
            refreshDeviceLists();
          } else if (typeof window !== 'undefined' && typeof window.refreshDeviceLists === 'function') {
            window.refreshDeviceLists();
          }
          applyFilters();
          updateCalculations();
          existingDevicesHeading = typeof document !== 'undefined' ? document.getElementById('existingDevicesHeading') : null;
          if (existingDevicesHeading) {
            existingDevicesHeading.textContent = texts[lang].existingDevicesHeading;
          }
          if (darkModeToggle) {
            darkModeToggle.setAttribute("title", texts[lang].darkModeLabel);
            darkModeToggle.setAttribute("aria-label", texts[lang].darkModeLabel);
            darkModeToggle.setAttribute("data-help", texts[lang].darkModeHelp || texts[lang].darkModeLabel);
          }
          if (pinkModeToggle) {
            pinkModeToggle.setAttribute("title", texts[lang].pinkModeLabel);
            pinkModeToggle.setAttribute("aria-label", texts[lang].pinkModeLabel);
            pinkModeToggle.setAttribute("data-help", texts[lang].pinkModeHelp || texts[lang].pinkModeLabel);
          }
          if (settingsButton) {
            settingsButton.setAttribute("title", texts[lang].settingsButton);
            settingsButton.setAttribute("aria-label", texts[lang].settingsButton);
            settingsButton.setAttribute("data-help", texts[lang].settingsButtonHelp || texts[lang].settingsButton);
          }
          settingsTitleElem = document.getElementById("settingsTitle");
          if (settingsTitleElem) {
            settingsTitleElem.textContent = texts[lang].settingsHeading;
            settingsTitleElem.setAttribute("data-help", texts[lang].settingsHeadingHelp || texts[lang].settingsHeading);
          }
          if (settingsTablist) {
            sectionsLabel = texts[lang].settingsSectionsLabel || ((_texts$en47 = texts.en) === null || _texts$en47 === void 0 ? void 0 : _texts$en47.settingsSectionsLabel) || settingsTablist.getAttribute('aria-label') || texts[lang].settingsHeading || 'Settings sections';
            settingsTablist.setAttribute('aria-label', sectionsLabel);
          }
          getSettingsTabLabelText = function getSettingsTabLabelText(button) {
            var _button$querySelector2;
            if (!button || _typeof(button) !== 'object') return '';
            var labelNode = (_button$querySelector2 = button.querySelector) === null || _button$querySelector2 === void 0 ? void 0 : _button$querySelector2.call(button, '.settings-tab-label');
            if (labelNode && typeof labelNode.textContent === 'string') {
              var trimmed = labelNode.textContent.trim();
              if (trimmed) return trimmed;
            }
            return typeof button.textContent === 'string' ? button.textContent.trim() : '';
          };
          summarizeSettingsTabHelp = function summarizeSettingsTabHelp(helpText) {
            if (typeof helpText !== 'string') return '';
            var trimmed = helpText.trim();
            if (!trimmed) return '';
            var sentenceMatch = trimmed.match(/^(?:[\0- "-\x2D\/->@-\u3001\u3003-\uD7FF\uE000-\uFF00\uFF02-\uFF1E\uFF20-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*[!\.\?\u3002\uFF01\uFF1F]/);
            if (sentenceMatch && sentenceMatch[0]) {
              var sentence = sentenceMatch[0].trim();
              if (sentence.length >= 24 || trimmed.length <= 90) {
                return sentence;
              }
            }
            if (trimmed.length <= 90) return trimmed;
            var truncated = trimmed.slice(0, 90);
            var cutIndex = truncated.length;
            while (cutIndex > 0 && truncated[cutIndex - 1] && truncated[cutIndex - 1].trim() !== '') {
              cutIndex -= 1;
            }
            var safeCut = cutIndex > 0 ? truncated.slice(0, cutIndex).trimEnd() : '';
            return "".concat(safeCut || truncated.trim(), "\u2026");
          };
          applySettingsTabLabel = function applySettingsTabLabel(button, labelValue, helpValue) {
            var _button$querySelector3, _button$querySelector4;
            if (!button) return;
            var label = (labelValue || getSettingsTabLabelText(button) || '').trim();
            var labelElement = (_button$querySelector3 = button.querySelector) === null || _button$querySelector3 === void 0 ? void 0 : _button$querySelector3.call(button, '.settings-tab-label');
            if (labelElement) {
              labelElement.textContent = label;
            } else {
              button.textContent = label;
            }
            if (label) {
              button.setAttribute('aria-label', label);
            } else {
              button.removeAttribute('aria-label');
            }
            var help = (helpValue || label || '').trim();
            if (help) {
              button.setAttribute('data-help', help);
              button.setAttribute('title', help);
            } else {
              button.removeAttribute('data-help');
              button.removeAttribute('title');
            }
            var summary = summarizeSettingsTabHelp(help);
            if (summary) {
              button.setAttribute('data-summary', summary);
            } else {
              button.removeAttribute('data-summary');
            }
            var captionElement = (_button$querySelector4 = button.querySelector) === null || _button$querySelector4 === void 0 ? void 0 : _button$querySelector4.call(button, '.settings-tab-caption');
            if (captionElement) {
              var captionText = summary || label;
              captionElement.textContent = captionText;
              if (captionText) {
                captionElement.removeAttribute('hidden');
              } else {
                captionElement.setAttribute('hidden', '');
              }
            }
          };
          if (settingsTabGeneral) {
            generalLabel = texts[lang].settingsTabGeneral || ((_texts$en48 = texts.en) === null || _texts$en48 === void 0 ? void 0 : _texts$en48.settingsTabGeneral) || getSettingsTabLabelText(settingsTabGeneral) || 'General';
            generalHelp = texts[lang].settingsTabGeneralHelp || ((_texts$en49 = texts.en) === null || _texts$en49 === void 0 ? void 0 : _texts$en49.settingsTabGeneralHelp) || texts[lang].settingsHeadingHelp || generalLabel;
            applySettingsTabLabel(settingsTabGeneral, generalLabel, generalHelp);
            if (generalSettingsHeading) {
              generalSettingsHeading.textContent = generalLabel;
              generalSettingsHeading.setAttribute('data-help', generalHelp);
            }
            if (generalLanguageHeading) {
              sectionHeading = texts[lang].generalSectionLanguageHeading || ((_texts$en50 = texts.en) === null || _texts$en50 === void 0 ? void 0 : _texts$en50.generalSectionLanguageHeading) || generalLanguageHeading.textContent;
              generalLanguageHeading.textContent = sectionHeading;
            }
            if (generalAppearanceHeading) {
              _sectionHeading = texts[lang].generalSectionAppearanceHeading || ((_texts$en51 = texts.en) === null || _texts$en51 === void 0 ? void 0 : _texts$en51.generalSectionAppearanceHeading) || generalAppearanceHeading.textContent;
              generalAppearanceHeading.textContent = _sectionHeading;
            }
            if (generalTypographyHeading) {
              _sectionHeading2 = texts[lang].generalSectionTypographyHeading || ((_texts$en52 = texts.en) === null || _texts$en52 === void 0 ? void 0 : _texts$en52.generalSectionTypographyHeading) || generalTypographyHeading.textContent;
              generalTypographyHeading.textContent = _sectionHeading2;
            }
            if (generalBrandingHeading) {
              _sectionHeading3 = texts[lang].generalSectionBrandingHeading || ((_texts$en53 = texts.en) === null || _texts$en53 === void 0 ? void 0 : _texts$en53.generalSectionBrandingHeading) || generalBrandingHeading.textContent;
              generalBrandingHeading.textContent = _sectionHeading3;
            }
            documentationTrackerController.updateLocalization({
              language: lang,
              texts: texts[lang] || {},
              fallbackTexts: texts[DEFAULT_LANGUAGE_SAFE] || texts.en || {}
            });
            if (documentationTrackerController.isInitialized()) {
              documentationTrackerController.render();
            }
          }
          applySettingsTabLabel(settingsTabAutoGear, texts[lang].settingsTabAutoGear || ((_texts$en54 = texts.en) === null || _texts$en54 === void 0 ? void 0 : _texts$en54.settingsTabAutoGear) || texts[lang].autoGearHeading || ((_texts$en55 = texts.en) === null || _texts$en55 === void 0 ? void 0 : _texts$en55.autoGearHeading), texts[lang].settingsTabAutoGearHelp || ((_texts$en56 = texts.en) === null || _texts$en56 === void 0 ? void 0 : _texts$en56.settingsTabAutoGearHelp) || texts[lang].autoGearHeadingHelp || ((_texts$en57 = texts.en) === null || _texts$en57 === void 0 ? void 0 : _texts$en57.autoGearHeadingHelp));
          applySettingsTabLabel(settingsTabAccessibility, texts[lang].settingsTabAccessibility || ((_texts$en58 = texts.en) === null || _texts$en58 === void 0 ? void 0 : _texts$en58.settingsTabAccessibility) || texts[lang].accessibilityHeading || ((_texts$en59 = texts.en) === null || _texts$en59 === void 0 ? void 0 : _texts$en59.accessibilityHeading), texts[lang].settingsTabAccessibilityHelp || ((_texts$en60 = texts.en) === null || _texts$en60 === void 0 ? void 0 : _texts$en60.settingsTabAccessibilityHelp) || texts[lang].accessibilityHeadingHelp || ((_texts$en61 = texts.en) === null || _texts$en61 === void 0 ? void 0 : _texts$en61.accessibilityHeadingHelp));
          applySettingsTabLabel(settingsTabBackup, texts[lang].settingsTabBackup || ((_texts$en62 = texts.en) === null || _texts$en62 === void 0 ? void 0 : _texts$en62.settingsTabBackup) || texts[lang].backupHeading || ((_texts$en63 = texts.en) === null || _texts$en63 === void 0 ? void 0 : _texts$en63.backupHeading), texts[lang].settingsTabBackupHelp || ((_texts$en64 = texts.en) === null || _texts$en64 === void 0 ? void 0 : _texts$en64.settingsTabBackupHelp) || texts[lang].backupHeadingHelp || ((_texts$en65 = texts.en) === null || _texts$en65 === void 0 ? void 0 : _texts$en65.backupHeadingHelp));
          applySettingsTabLabel(settingsTabData, texts[lang].settingsTabData || ((_texts$en66 = texts.en) === null || _texts$en66 === void 0 ? void 0 : _texts$en66.settingsTabData) || texts[lang].dataHeading || ((_texts$en67 = texts.en) === null || _texts$en67 === void 0 ? void 0 : _texts$en67.dataHeading), texts[lang].settingsTabDataHelp || ((_texts$en68 = texts.en) === null || _texts$en68 === void 0 ? void 0 : _texts$en68.settingsTabDataHelp) || texts[lang].dataHeadingHelp || ((_texts$en69 = texts.en) === null || _texts$en69 === void 0 ? void 0 : _texts$en69.dataHeadingHelp));
          applySettingsTabLabel(settingsTabAbout, texts[lang].settingsTabAbout || ((_texts$en70 = texts.en) === null || _texts$en70 === void 0 ? void 0 : _texts$en70.settingsTabAbout) || texts[lang].aboutHeading || ((_texts$en71 = texts.en) === null || _texts$en71 === void 0 ? void 0 : _texts$en71.aboutHeading), texts[lang].settingsTabAboutHelp || ((_texts$en72 = texts.en) === null || _texts$en72 === void 0 ? void 0 : _texts$en72.settingsTabAboutHelp) || texts[lang].aboutHeadingHelp || ((_texts$en73 = texts.en) === null || _texts$en73 === void 0 ? void 0 : _texts$en73.aboutHeadingHelp));
          settingsLanguageLabel = document.getElementById("settingsLanguageLabel");
          if (settingsLanguageLabel) {
            settingsLanguageLabel.textContent = texts[lang].languageSetting;
            languageHelp = texts[lang].settingsLanguageHelp || texts[lang].languageSetting;
            settingsLanguageLabel.setAttribute("data-help", languageHelp);
            if (settingsLanguage) {
              settingsLanguage.setAttribute("data-help", languageHelp);
              settingsLanguage.setAttribute("aria-label", texts[lang].languageSetting);
            }
          }
          settingsDarkLabel = document.getElementById("settingsDarkModeLabel");
          if (settingsDarkLabel) {
            settingsDarkLabel.textContent = texts[lang].darkModeSetting;
            darkModeHelp = texts[lang].settingsDarkModeHelp || texts[lang].darkModeSetting;
            settingsDarkLabel.setAttribute("data-help", darkModeHelp);
            if (settingsDarkMode) {
              settingsDarkMode.setAttribute("data-help", darkModeHelp);
              settingsDarkMode.setAttribute("aria-label", texts[lang].darkModeSetting);
            }
          }
          settingsPinkLabel = document.getElementById("settingsPinkModeLabel");
          if (settingsPinkLabel) {
            settingsPinkLabel.textContent = texts[lang].pinkModeSetting;
            pinkModeHelp = texts[lang].settingsPinkModeHelp || texts[lang].pinkModeSetting;
            settingsPinkLabel.setAttribute("data-help", pinkModeHelp);
            if (settingsPinkMode) {
              settingsPinkMode.setAttribute("data-help", pinkModeHelp);
              settingsPinkMode.setAttribute("aria-label", texts[lang].pinkModeSetting);
            }
          }
          accentLabel = document.getElementById("accentColorLabel");
          accentHelp = texts[lang].accentColorHelp || texts[lang].accentColorSetting;
          if (accentLabel) {
            accentLabel.textContent = texts[lang].accentColorSetting;
            accentLabel.setAttribute("data-help", accentHelp);
          }
          if (accentColorInput) {
            accentColorInput.setAttribute("data-help", accentHelp);
            accentColorInput.setAttribute("aria-label", texts[lang].accentColorSetting);
          }
          if (cameraColorsDescription) {
            description = texts[lang].cameraColorSettingDescription || ((_texts$en74 = texts.en) === null || _texts$en74 === void 0 ? void 0 : _texts$en74.cameraColorSettingDescription) || cameraColorsDescription.textContent;
            cameraColorsDescription.textContent = description;
          }
          cameraColorHelpTemplate = texts[lang].cameraColorInputHelp || ((_texts$en75 = texts.en) === null || _texts$en75 === void 0 ? void 0 : _texts$en75.cameraColorInputHelp) || '';
          cameraColorLabelEntries = [['A', cameraColorALabel, cameraColorA], ['B', cameraColorBLabel, cameraColorB], ['C', cameraColorCLabel, cameraColorC], ['D', cameraColorDLabel, cameraColorD], ['E', cameraColorELabel, cameraColorE]];
          cameraColorLabelEntries.forEach(function (_ref69) {
            var _texts$en76;
            var _ref70 = _slicedToArray(_ref69, 3),
              letter = _ref70[0],
              labelElement = _ref70[1],
              inputElement = _ref70[2];
            if (!labelElement) {
              return;
            }
            var key = "cameraColor".concat(letter, "Label");
            var labelText = texts[lang][key] || ((_texts$en76 = texts.en) === null || _texts$en76 === void 0 ? void 0 : _texts$en76[key]) || labelElement.textContent;
            labelElement.textContent = labelText;
            var helpText = cameraColorHelpTemplate ? cameraColorHelpTemplate.replace('%s', letter) : '';
            if (helpText) {
              labelElement.setAttribute('data-help', helpText);
            } else {
              labelElement.removeAttribute('data-help');
            }
            if (inputElement) {
              if (helpText) {
                inputElement.setAttribute('data-help', helpText);
                inputElement.setAttribute('aria-label', helpText);
              } else {
                inputElement.removeAttribute('data-help');
                inputElement.setAttribute('aria-label', labelText);
              }
            }
          });
          if (accentColorResetButton) {
            accentResetLabel = texts[lang] && texts[lang].accentColorReset || texts.en && texts.en.accentColorReset || accentColorResetButton.textContent || 'Reset to default';
            accentResetHelp = texts[lang] && texts[lang].accentColorResetHelp || accentHelp;
            accentColorResetButton.textContent = accentResetLabel;
            accentColorResetButton.setAttribute('data-help', accentResetHelp);
            accentColorResetButton.setAttribute('aria-label', accentResetHelp);
            accentColorResetButton.setAttribute('title', accentResetHelp);
          }
          settingsTemperatureUnitLabel = document.getElementById('settingsTemperatureUnitLabel');
          if (settingsTemperatureUnitLabel) {
            settingsTemperatureUnitLabel.textContent = texts[lang].temperatureUnitSetting;
            tempUnitHelp = texts[lang].temperatureUnitSettingHelp || texts[lang].temperatureUnitSetting;
            settingsTemperatureUnitLabel.setAttribute('data-help', tempUnitHelp);
            if (typeof settingsTemperatureUnit !== 'undefined' && settingsTemperatureUnit) {
              settingsTemperatureUnit.setAttribute('data-help', tempUnitHelp);
              settingsTemperatureUnit.setAttribute('aria-label', texts[lang].temperatureUnitSetting);
              Array.from(settingsTemperatureUnit.options || []).forEach(function (option) {
                if (!option) return;
                var normalized = normalizeTemperatureUnitSafe(option.value);
                option.textContent = getTemperatureUnitLabelForLang(lang, normalized);
              });
              settingsTemperatureUnit.value = temperatureUnit;
            }
          }
          settingsFocusScaleLabel = document.getElementById('settingsFocusScaleLabel');
          if (settingsFocusScaleLabel) {
            settingsFocusScaleLabel.textContent = texts[lang].focusScaleSetting;
            _focusScaleHelp = texts[lang].focusScaleSettingHelp || texts[lang].focusScaleSetting;
            settingsFocusScaleLabel.setAttribute('data-help', _focusScaleHelp);
            if (typeof settingsFocusScale !== 'undefined' && settingsFocusScale) {
              settingsFocusScale.setAttribute('data-help', _focusScaleHelp);
              settingsFocusScale.setAttribute('aria-label', texts[lang].focusScaleSetting);
              Array.from(settingsFocusScale.options || []).forEach(function (option) {
                if (!option) return;
                var normalized = normalizeFocusScaleSafe(option.value);
                option.textContent = getFocusScaleLabelForLang(lang, normalized);
              });
              settingsFocusScale.value = resolveFocusScalePreference();
            }
          }
          fontSizeLabel = document.getElementById("settingsFontSizeLabel");
          if (fontSizeLabel) {
            fontSizeLabel.textContent = texts[lang].fontSizeSetting;
            sizeHelp = texts[lang].fontSizeSettingHelp || texts[lang].fontSizeSetting;
            fontSizeLabel.setAttribute("data-help", sizeHelp);
            if (settingsFontSize) {
              settingsFontSize.setAttribute("data-help", sizeHelp);
              settingsFontSize.setAttribute("aria-label", texts[lang].fontSizeSetting);
            }
          }
          fontFamilyLabel = document.getElementById("settingsFontFamilyLabel");
          if (fontFamilyLabel) {
            fontFamilyLabel.textContent = texts[lang].fontFamilySetting;
            familyHelp = texts[lang].fontFamilySettingHelp || texts[lang].fontFamilySetting;
            fontFamilyLabel.setAttribute("data-help", familyHelp);
            if (settingsFontFamily) {
              settingsFontFamily.setAttribute("data-help", familyHelp);
              settingsFontFamily.setAttribute("aria-label", texts[lang].fontFamilySetting);
            }
          }
          if (localFontsButton) {
            localFontsHelp = texts[lang].localFontsButtonHelp || localFontsButton.textContent;
            localFontsButton.setAttribute("data-help", localFontsHelp);
            localFontsButton.setAttribute("title", localFontsHelp);
            localFontsButton.setAttribute("aria-label", localFontsHelp);
          }
          if (bundledFontGroup) {
            builtInLabel = texts[lang] && texts[lang].bundledFontsGroup || texts.en && texts.en.bundledFontsGroup || bundledFontGroup.label;
            if (builtInLabel) bundledFontGroup.label = builtInLabel;
          }
          if (localFontsGroup) {
            localLabel = texts[lang] && texts[lang].localFontsGroup || texts.en && texts.en.localFontsGroup || localFontsGroup.label;
            if (localLabel) localFontsGroup.label = localLabel;
          }
          if (localFontsButton) {
            localFontsLabel = texts[lang] && texts[lang].localFontsButton || texts.en && texts.en.localFontsButton || localFontsButton.textContent;
            if (localFontsLabel) {
              setButtonLabelWithIconBinding(localFontsButton, localFontsLabel, ICON_GLYPHS.add);
              localFontsButton.setAttribute('aria-label', localFontsLabel);
              localFontsButton.setAttribute('title', localFontsLabel);
            }
          }
          if (localFontsStatus && localFontsStatus.dataset.statusKey) {
            statusKey = localFontsStatus.dataset.statusKey;
            arg = localFontsStatus.dataset.statusArg;
            template = texts[lang] && texts[lang][statusKey] || texts.en && texts.en[statusKey] || '';
            if (template && arg !== undefined && arg !== null) {
              template = template.replace('%s', arg);
            } else if (!template && arg !== undefined && arg !== null) {
              template = arg;
            }
            localFontsStatus.textContent = template;
          }
          settingsLogoLabel = document.getElementById("settingsLogoLabel");
          if (settingsLogoLabel) {
            settingsLogoLabel.textContent = texts[lang].logoSetting;
            logoHelp = texts[lang].logoSettingHelp || texts[lang].logoSetting;
            settingsLogoLabel.setAttribute("data-help", logoHelp);
            if (settingsLogo) {
              settingsLogo.setAttribute("data-help", logoHelp);
              settingsLogo.setAttribute("aria-label", texts[lang].logoSetting);
            }
          }
          if (autoGearHeadingElem) {
            autoGearHeadingElem.textContent = texts[lang].autoGearHeading || ((_texts$en77 = texts.en) === null || _texts$en77 === void 0 ? void 0 : _texts$en77.autoGearHeading) || 'Automatic Gear Rules';
            headingHelp = texts[lang].autoGearHeadingHelp || ((_texts$en78 = texts.en) === null || _texts$en78 === void 0 ? void 0 : _texts$en78.autoGearHeadingHelp);
            if (headingHelp) autoGearHeadingElem.setAttribute('data-help', headingHelp);
          }
          if (autoGearDescriptionElem) {
            autoGearDescriptionElem.textContent = texts[lang].autoGearDescription || ((_texts$en79 = texts.en) === null || _texts$en79 === void 0 ? void 0 : _texts$en79.autoGearDescription) || '';
          }
          if (autoGearMonitorDefaultsHeading) {
            _heading = texts[lang].autoGearMonitorDefaultsHeading || ((_texts$en80 = texts.en) === null || _texts$en80 === void 0 ? void 0 : _texts$en80.autoGearMonitorDefaultsHeading) || autoGearMonitorDefaultsHeading.textContent;
            autoGearMonitorDefaultsHeading.textContent = _heading;
          }
          if (autoGearMonitorDefaultsDescription) {
            _description = texts[lang].autoGearMonitorDefaultsDescription || ((_texts$en81 = texts.en) === null || _texts$en81 === void 0 ? void 0 : _texts$en81.autoGearMonitorDefaultsDescription) || autoGearMonitorDefaultsDescription.textContent;
            autoGearMonitorDefaultsDescription.textContent = _description;
          }
          autoGearMonitorDefaultControls.forEach(function (control) {
            var _texts$en82, _control$label, _control$label2;
            if (!control) return;
            var labelKey = AUTO_GEAR_MONITOR_DEFAULT_LABEL_KEYS[control.key];
            var labelText = labelKey ? texts[lang][labelKey] || ((_texts$en82 = texts.en) === null || _texts$en82 === void 0 ? void 0 : _texts$en82[labelKey]) || ((_control$label = control.label) === null || _control$label === void 0 ? void 0 : _control$label.textContent) : (_control$label2 = control.label) === null || _control$label2 === void 0 ? void 0 : _control$label2.textContent;
            if (control.label && labelText) {
              control.label.textContent = labelText;
              control.label.setAttribute('data-help', labelText);
            }
            if (control.select && labelText) {
              control.select.setAttribute('aria-label', labelText);
              control.select.setAttribute('data-help', labelText);
            }
          });
          callCoreFunctionIfAvailable('updateAutoGearMonitorDefaultOptions', [], {
            defer: true
          });
          callCoreFunctionIfAvailable('renderAutoGearMonitorDefaultsControls', [], {
            defer: true
          });
          if (autoGearPresetDescription) {
            autoGearPresetDescription.textContent = texts[lang].autoGearPresetDescription || ((_texts$en83 = texts.en) === null || _texts$en83 === void 0 ? void 0 : _texts$en83.autoGearPresetDescription) || '';
          }
          if (autoGearPresetLabel) {
            _label0 = texts[lang].autoGearPresetLabel || ((_texts$en84 = texts.en) === null || _texts$en84 === void 0 ? void 0 : _texts$en84.autoGearPresetLabel) || autoGearPresetLabel.textContent;
            _help6 = texts[lang].autoGearPresetDescription || ((_texts$en85 = texts.en) === null || _texts$en85 === void 0 ? void 0 : _texts$en85.autoGearPresetDescription) || _label0;
            autoGearPresetLabel.textContent = _label0;
            autoGearPresetLabel.setAttribute('data-help', _help6);
            if (autoGearPresetSelect) {
              autoGearPresetSelect.setAttribute('aria-label', _label0);
              autoGearPresetSelect.setAttribute('data-help', _help6);
            }
          }
          if (autoGearSavePresetButton) {
            _label1 = texts[lang].autoGearSavePresetButton || ((_texts$en86 = texts.en) === null || _texts$en86 === void 0 ? void 0 : _texts$en86.autoGearSavePresetButton) || autoGearSavePresetButton.textContent;
            setButtonLabelWithIconBinding(autoGearSavePresetButton, _label1, ICON_GLYPHS.save);
            autoGearSavePresetButton.setAttribute('data-help', _label1);
            autoGearSavePresetButton.setAttribute('aria-label', _label1);
          }
          if (autoGearDeletePresetButton) {
            _label10 = texts[lang].autoGearDeletePresetButton || ((_texts$en87 = texts.en) === null || _texts$en87 === void 0 ? void 0 : _texts$en87.autoGearDeletePresetButton) || autoGearDeletePresetButton.textContent;
            setButtonLabelWithIconBinding(autoGearDeletePresetButton, _label10, ICON_GLYPHS.trash);
            autoGearDeletePresetButton.setAttribute('data-help', _label10);
            autoGearDeletePresetButton.setAttribute('aria-label', _label10);
          }
          if (autoGearAddRuleBtn) {
            _label11 = texts[lang].autoGearAddRule || ((_texts$en88 = texts.en) === null || _texts$en88 === void 0 ? void 0 : _texts$en88.autoGearAddRule) || autoGearAddRuleBtn.textContent;
            setButtonLabelWithIconBinding(autoGearAddRuleBtn, _label11, ICON_GLYPHS.add);
            _help7 = texts[lang].autoGearHeadingHelp || ((_texts$en89 = texts.en) === null || _texts$en89 === void 0 ? void 0 : _texts$en89.autoGearHeadingHelp) || _label11;
            autoGearAddRuleBtn.setAttribute('data-help', _help7);
          }
          if (autoGearResetFactoryButton) {
            _label12 = texts[lang].autoGearResetFactoryButton || ((_texts$en90 = texts.en) === null || _texts$en90 === void 0 ? void 0 : _texts$en90.autoGearResetFactoryButton) || autoGearResetFactoryButton.textContent;
            _help8 = texts[lang].autoGearResetFactoryHelp || ((_texts$en91 = texts.en) === null || _texts$en91 === void 0 ? void 0 : _texts$en91.autoGearResetFactoryHelp) || _label12;
            setButtonLabelWithIconBinding(autoGearResetFactoryButton, _label12, ICON_GLYPHS.reload);
            autoGearResetFactoryButton.setAttribute('data-help', _help8);
            autoGearResetFactoryButton.setAttribute('title', _help8);
            autoGearResetFactoryButton.setAttribute('aria-label', _label12);
          }
          if (autoGearExportButton) {
            _label13 = texts[lang].autoGearExportButton || ((_texts$en92 = texts.en) === null || _texts$en92 === void 0 ? void 0 : _texts$en92.autoGearExportButton) || autoGearExportButton.textContent;
            _help9 = texts[lang].autoGearExportHelp || ((_texts$en93 = texts.en) === null || _texts$en93 === void 0 ? void 0 : _texts$en93.autoGearExportHelp) || _label13;
            setButtonLabelWithIconBinding(autoGearExportButton, _label13, ICON_GLYPHS.fileExport);
            autoGearExportButton.setAttribute('data-help', _help9);
            autoGearExportButton.setAttribute('title', _help9);
            autoGearExportButton.setAttribute('aria-label', _label13);
          }
          if (autoGearImportButton) {
            _label14 = texts[lang].autoGearImportButton || ((_texts$en94 = texts.en) === null || _texts$en94 === void 0 ? void 0 : _texts$en94.autoGearImportButton) || autoGearImportButton.textContent;
            _help0 = texts[lang].autoGearImportHelp || ((_texts$en95 = texts.en) === null || _texts$en95 === void 0 ? void 0 : _texts$en95.autoGearImportHelp) || _label14;
            setButtonLabelWithIconBinding(autoGearImportButton, _label14, ICON_GLYPHS.fileImport);
            autoGearImportButton.setAttribute('data-help', _help0);
            autoGearImportButton.setAttribute('title', _help0);
            autoGearImportButton.setAttribute('aria-label', _label14);
          }
          if (autoGearSearchLabel) {
            _label15 = texts[lang].autoGearSearchLabel || ((_texts$en96 = texts.en) === null || _texts$en96 === void 0 ? void 0 : _texts$en96.autoGearSearchLabel) || autoGearSearchLabel.textContent;
            _help1 = texts[lang].autoGearSearchHelp || ((_texts$en97 = texts.en) === null || _texts$en97 === void 0 ? void 0 : _texts$en97.autoGearSearchHelp) || _label15;
            autoGearSearchLabel.textContent = _label15;
            autoGearSearchLabel.setAttribute('data-help', _help1);
            if (autoGearSearchInput) {
              placeholder = texts[lang].autoGearSearchPlaceholder || ((_texts$en98 = texts.en) === null || _texts$en98 === void 0 ? void 0 : _texts$en98.autoGearSearchPlaceholder) || autoGearSearchInput.getAttribute('placeholder') || '';
              autoGearSearchInput.setAttribute('placeholder', placeholder);
              autoGearSearchInput.setAttribute('aria-label', _label15);
              autoGearSearchInput.setAttribute('data-help', _help1);
            }
          }
          if (autoGearFilterScenarioLabel) {
            _label16 = texts[lang].autoGearFilterScenarioLabel || ((_texts$en99 = texts.en) === null || _texts$en99 === void 0 ? void 0 : _texts$en99.autoGearFilterScenarioLabel) || autoGearFilterScenarioLabel.textContent;
            _help10 = texts[lang].autoGearFilterScenarioHelp || ((_texts$en100 = texts.en) === null || _texts$en100 === void 0 ? void 0 : _texts$en100.autoGearFilterScenarioHelp) || _label16;
            autoGearFilterScenarioLabel.textContent = _label16;
            autoGearFilterScenarioLabel.setAttribute('data-help', _help10);
            if (autoGearFilterScenarioSelect) {
              autoGearFilterScenarioSelect.setAttribute('aria-label', _label16);
              autoGearFilterScenarioSelect.setAttribute('data-help', _help10);
            }
          }
          if (autoGearFilterClearButton) {
            _label17 = texts[lang].autoGearFilterClear || ((_texts$en101 = texts.en) === null || _texts$en101 === void 0 ? void 0 : _texts$en101.autoGearFilterClear) || autoGearFilterClearButton.textContent;
            setButtonLabelWithIconBinding(autoGearFilterClearButton, _label17, ICON_GLYPHS.circleX);
            autoGearFilterClearButton.setAttribute('data-help', _label17);
            autoGearFilterClearButton.setAttribute('aria-label', _label17);
          }
          refreshAutoGearScenarioFilterOptions(getAutoGearRules());
          if (autoGearBackupsHeading) {
            autoGearBackupsHeading.textContent = texts[lang].autoGearBackupsHeading || ((_texts$en102 = texts.en) === null || _texts$en102 === void 0 ? void 0 : _texts$en102.autoGearBackupsHeading) || autoGearBackupsHeading.textContent;
          }
          if (autoGearBackupsDescription) {
            _description2 = texts[lang].autoGearBackupsDescription || ((_texts$en103 = texts.en) === null || _texts$en103 === void 0 ? void 0 : _texts$en103.autoGearBackupsDescription) || '';
            autoGearBackupsDescription.textContent = _description2;
            if (_description2) {
              autoGearBackupsDescription.setAttribute('data-help', _description2);
            }
          }
          if (autoGearShowBackupsLabel) {
            _label18 = texts[lang].autoGearShowBackupsLabel || ((_texts$en104 = texts.en) === null || _texts$en104 === void 0 ? void 0 : _texts$en104.autoGearShowBackupsLabel) || autoGearShowBackupsLabel.textContent;
            _help11 = texts[lang].autoGearShowBackupsHelp || ((_texts$en105 = texts.en) === null || _texts$en105 === void 0 ? void 0 : _texts$en105.autoGearShowBackupsHelp) || _label18;
            autoGearShowBackupsLabel.textContent = _label18;
            autoGearShowBackupsLabel.setAttribute('data-help', _help11);
            if (autoGearShowBackupsCheckbox) {
              autoGearShowBackupsCheckbox.setAttribute('aria-label', _label18);
              autoGearShowBackupsCheckbox.setAttribute('data-help', _help11);
            }
          }
          if (autoGearBackupsHiddenNotice) {
            hiddenText = texts[lang].autoGearBackupsHidden || ((_texts$en106 = texts.en) === null || _texts$en106 === void 0 ? void 0 : _texts$en106.autoGearBackupsHidden) || autoGearBackupsHiddenNotice.textContent;
            autoGearBackupsHiddenNotice.textContent = hiddenText;
          }
          if (autoGearBackupRetentionLabel) {
            _label19 = texts[lang].autoGearBackupRetentionLabel || ((_texts$en107 = texts.en) === null || _texts$en107 === void 0 ? void 0 : _texts$en107.autoGearBackupRetentionLabel) || autoGearBackupRetentionLabel.textContent;
            _help12 = texts[lang].autoGearBackupRetentionHelp || ((_texts$en108 = texts.en) === null || _texts$en108 === void 0 ? void 0 : _texts$en108.autoGearBackupRetentionHelp) || _label19;
            autoGearBackupRetentionLabel.textContent = _label19;
            autoGearBackupRetentionLabel.setAttribute('data-help', _help12);
            if (autoGearBackupRetentionInput) {
              autoGearBackupRetentionInput.setAttribute('aria-label', _label19);
              autoGearBackupRetentionInput.setAttribute('title', _label19);
            }
          }
          if (autoGearBackupRetentionSummary) {
            callCoreFunctionIfAvailable('renderAutoGearBackupRetentionControls', [], {
              defer: true
            });
          }
          if (autoGearBackupSelectLabel) {
            _label20 = texts[lang].autoGearBackupSelectLabel || ((_texts$en109 = texts.en) === null || _texts$en109 === void 0 ? void 0 : _texts$en109.autoGearBackupSelectLabel) || autoGearBackupSelectLabel.textContent;
            autoGearBackupSelectLabel.textContent = _label20;
            if (autoGearBackupSelect) {
              autoGearBackupSelect.setAttribute('aria-label', _label20);
              autoGearBackupSelect.setAttribute('title', _label20);
            }
          }
          if (autoGearBackupRestoreButton) {
            _label21 = texts[lang].autoGearBackupRestore || ((_texts$en110 = texts.en) === null || _texts$en110 === void 0 ? void 0 : _texts$en110.autoGearBackupRestore) || autoGearBackupRestoreButton.textContent;
            setButtonLabelWithIconBinding(autoGearBackupRestoreButton, _label21, ICON_GLYPHS.fileImport);
            autoGearBackupRestoreButton.setAttribute('aria-label', _label21);
            autoGearBackupRestoreButton.setAttribute('title', _label21);
          }
          if (autoGearBackupEmptyMessage) {
            emptyText = texts[lang].autoGearBackupEmpty || ((_texts$en111 = texts.en) === null || _texts$en111 === void 0 ? void 0 : _texts$en111.autoGearBackupEmpty) || autoGearBackupEmptyMessage.textContent;
            autoGearBackupEmptyMessage.textContent = emptyText;
          }
          if (autoGearBackupSelect) {
            callCoreFunctionIfAvailable('renderAutoGearBackupControls', [], {
              defer: true
            });
          }
          if (autoGearRuleNameLabel) {
            _label22 = texts[lang].autoGearRuleNameLabel || ((_texts$en112 = texts.en) === null || _texts$en112 === void 0 ? void 0 : _texts$en112.autoGearRuleNameLabel) || autoGearRuleNameLabel.textContent;
            autoGearRuleNameLabel.textContent = _label22;
            _help13 = texts[lang].autoGearRuleNameHelp || ((_texts$en113 = texts.en) === null || _texts$en113 === void 0 ? void 0 : _texts$en113.autoGearRuleNameHelp) || _label22;
            autoGearRuleNameLabel.setAttribute('data-help', _help13);
            if (autoGearRuleNameInput) {
              autoGearRuleNameInput.setAttribute('data-help', _help13);
              autoGearRuleNameInput.setAttribute('aria-label', _label22);
            }
          }
          if (autoGearConditionSelectLabel) {
            _label23 = texts[lang].autoGearConditionSelectLabel || ((_texts$en114 = texts.en) === null || _texts$en114 === void 0 ? void 0 : _texts$en114.autoGearConditionSelectLabel) || autoGearConditionSelectLabel.textContent || 'Add a condition';
            _help14 = texts[lang].autoGearConditionSelectHelp || ((_texts$en115 = texts.en) === null || _texts$en115 === void 0 ? void 0 : _texts$en115.autoGearConditionSelectHelp) || _label23;
            autoGearConditionSelectLabel.textContent = _label23;
            autoGearConditionSelectLabel.setAttribute('data-help', _help14);
            if (autoGearConditionSelect) {
              autoGearConditionSelect.setAttribute('aria-label', _label23);
              autoGearConditionSelect.setAttribute('data-help', _help14);
            }
          }
          if (autoGearConditionAddButton) {
            _label24 = texts[lang].autoGearAddCondition || ((_texts$en116 = texts.en) === null || _texts$en116 === void 0 ? void 0 : _texts$en116.autoGearAddCondition) || autoGearConditionAddButton.textContent || 'Add condition';
            setButtonLabelWithIconBinding(autoGearConditionAddButton, _label24, ICON_GLYPHS.add);
            autoGearConditionAddButton.setAttribute('aria-label', _label24);
            autoGearConditionAddButton.setAttribute('data-help', _label24);
          }
          if (autoGearAlwaysLabel) {
            _label25 = texts[lang].autoGearAlwaysLabel || ((_texts$en117 = texts.en) === null || _texts$en117 === void 0 ? void 0 : _texts$en117.autoGearAlwaysLabel) || autoGearAlwaysLabel.textContent || 'Always include';
            _help15 = texts[lang].autoGearAlwaysHelp || ((_texts$en118 = texts.en) === null || _texts$en118 === void 0 ? void 0 : _texts$en118.autoGearAlwaysHelp) || _label25;
            autoGearAlwaysLabel.textContent = _label25;
            autoGearAlwaysLabel.setAttribute('data-help', _help15);
            if (autoGearAlwaysHelp) {
              autoGearAlwaysHelp.textContent = _help15;
              autoGearAlwaysHelp.setAttribute('data-help', _help15);
            }
          }
          configureAutoGearConditionButtons();
          refreshAutoGearConditionPicker();
          updateAutoGearConditionAddButtonState();
          if (autoGearScenariosLabel) {
            _label26 = texts[lang].autoGearScenariosLabel || ((_texts$en119 = texts.en) === null || _texts$en119 === void 0 ? void 0 : _texts$en119.autoGearScenariosLabel) || autoGearScenariosLabel.textContent;
            autoGearScenariosLabel.textContent = _label26;
            _help16 = texts[lang].autoGearScenariosHelp || ((_texts$en120 = texts.en) === null || _texts$en120 === void 0 ? void 0 : _texts$en120.autoGearScenariosHelp) || _label26;
            autoGearScenariosLabel.setAttribute('data-help', _help16);
            if (autoGearScenariosSelect) {
              autoGearScenariosSelect.setAttribute('data-help', _help16);
              autoGearScenariosSelect.setAttribute('aria-label', _label26);
            }
            if (autoGearScenarioModeLabel) {
              modeLabel = texts[lang].autoGearScenarioModeLabel || ((_texts$en121 = texts.en) === null || _texts$en121 === void 0 ? void 0 : _texts$en121.autoGearScenarioModeLabel) || autoGearScenarioModeLabel.textContent || 'Scenario matching';
              modeHelp = texts[lang].autoGearScenarioModeHelp || ((_texts$en122 = texts.en) === null || _texts$en122 === void 0 ? void 0 : _texts$en122.autoGearScenarioModeHelp) || modeLabel;
              autoGearScenarioModeLabel.textContent = modeLabel;
              autoGearScenarioModeLabel.setAttribute('data-help', modeHelp);
              if (autoGearScenarioModeSelectElement) {
                autoGearScenarioModeSelectElement.setAttribute('data-help', modeHelp);
                autoGearScenarioModeSelectElement.setAttribute('aria-label', modeLabel);
              }
            }
            if (autoGearScenarioBaseLabel) {
              baseLabel = texts[lang].autoGearScenarioBaseLabel || ((_texts$en123 = texts.en) === null || _texts$en123 === void 0 ? void 0 : _texts$en123.autoGearScenarioBaseLabel) || autoGearScenarioBaseLabel.textContent || 'Base scenario';
              baseHelp = texts[lang].autoGearScenarioBaseHelp || ((_texts$en124 = texts.en) === null || _texts$en124 === void 0 ? void 0 : _texts$en124.autoGearScenarioBaseHelp) || baseLabel;
              autoGearScenarioBaseLabel.textContent = baseLabel;
              autoGearScenarioBaseLabel.setAttribute('data-help', baseHelp);
              if (autoGearScenarioBaseSelect) {
                autoGearScenarioBaseSelect.setAttribute('data-help', baseHelp);
                autoGearScenarioBaseSelect.setAttribute('aria-label', baseLabel);
              }
            }
            if (autoGearScenarioFactorLabel) {
              factorLabel = texts[lang].autoGearScenarioFactorLabel || ((_texts$en125 = texts.en) === null || _texts$en125 === void 0 ? void 0 : _texts$en125.autoGearScenarioFactorLabel) || autoGearScenarioFactorLabel.textContent || 'Multiplier factor';
              factorHelp = texts[lang].autoGearScenarioFactorHelp || ((_texts$en126 = texts.en) === null || _texts$en126 === void 0 ? void 0 : _texts$en126.autoGearScenarioFactorHelp) || factorLabel;
              autoGearScenarioFactorLabel.textContent = factorLabel;
              autoGearScenarioFactorLabel.setAttribute('data-help', factorHelp);
              if (autoGearScenarioFactorInput) {
                autoGearScenarioFactorInput.setAttribute('data-help', factorHelp);
                autoGearScenarioFactorInput.setAttribute('aria-label', factorLabel);
              }
            }
          }
          if (autoGearShootingDaysLabel) {
            _label27 = texts[lang].autoGearShootingDaysLabel || ((_texts$en127 = texts.en) === null || _texts$en127 === void 0 ? void 0 : _texts$en127.autoGearShootingDaysLabel) || autoGearShootingDaysLabel.textContent || 'Shooting days condition';
            _help17 = texts[lang].autoGearShootingDaysHelp || ((_texts$en128 = texts.en) === null || _texts$en128 === void 0 ? void 0 : _texts$en128.autoGearShootingDaysHelp) || _label27;
            minimumLabel = texts[lang].autoGearShootingDaysModeMinimum || ((_texts$en129 = texts.en) === null || _texts$en129 === void 0 ? void 0 : _texts$en129.autoGearShootingDaysModeMinimum) || 'Minimum';
            maximumLabel = texts[lang].autoGearShootingDaysModeMaximum || ((_texts$en130 = texts.en) === null || _texts$en130 === void 0 ? void 0 : _texts$en130.autoGearShootingDaysModeMaximum) || 'Maximum';
            everyLabel = texts[lang].autoGearShootingDaysModeEvery || ((_texts$en131 = texts.en) === null || _texts$en131 === void 0 ? void 0 : _texts$en131.autoGearShootingDaysModeEvery) || 'Every';
            valueLabel = texts[lang].autoGearShootingDaysValueLabel || ((_texts$en132 = texts.en) === null || _texts$en132 === void 0 ? void 0 : _texts$en132.autoGearShootingDaysValueLabel) || 'Shooting days value';
            autoGearShootingDaysLabel.textContent = _label27;
            autoGearShootingDaysLabel.setAttribute('data-help', _help17);
            if (autoGearShootingDaysMode) {
              autoGearShootingDaysMode.setAttribute('data-help', _help17);
              autoGearShootingDaysMode.setAttribute('aria-label', _label27);
              Array.from(autoGearShootingDaysMode.options || []).forEach(function (option) {
                if (!option || typeof option.value !== 'string') return;
                if (option.value === 'minimum') {
                  option.textContent = minimumLabel;
                } else if (option.value === 'maximum') {
                  option.textContent = maximumLabel;
                } else if (option.value === 'every') {
                  option.textContent = everyLabel;
                }
              });
            }
            if (autoGearShootingDaysValueLabel) {
              autoGearShootingDaysValueLabel.textContent = valueLabel;
              autoGearShootingDaysValueLabel.setAttribute('data-help', _help17);
            }
            if (autoGearShootingDaysInput) {
              autoGearShootingDaysInput.setAttribute('data-help', _help17);
              autoGearShootingDaysInput.setAttribute('aria-label', valueLabel || _label27);
            }
            if (autoGearShootingDaysHelp) {
              autoGearShootingDaysHelp.textContent = _help17;
              autoGearShootingDaysHelp.setAttribute('data-help', _help17);
            }
          }
          if (autoGearMatteboxLabel) {
            _label28 = texts[lang].autoGearMatteboxLabel || ((_texts$en133 = texts.en) === null || _texts$en133 === void 0 ? void 0 : _texts$en133.autoGearMatteboxLabel) || autoGearMatteboxLabel.textContent;
            autoGearMatteboxLabel.textContent = _label28;
            _help18 = texts[lang].autoGearMatteboxHelp || ((_texts$en134 = texts.en) === null || _texts$en134 === void 0 ? void 0 : _texts$en134.autoGearMatteboxHelp) || _label28;
            autoGearMatteboxLabel.setAttribute('data-help', _help18);
            if (autoGearMatteboxSelect) {
              autoGearMatteboxSelect.setAttribute('data-help', _help18);
              autoGearMatteboxSelect.setAttribute('aria-label', _label28);
            }
          }
          if (autoGearCameraHandleLabel) {
            _label29 = texts[lang].autoGearCameraHandleLabel || ((_texts$en135 = texts.en) === null || _texts$en135 === void 0 ? void 0 : _texts$en135.autoGearCameraHandleLabel) || autoGearCameraHandleLabel.textContent;
            autoGearCameraHandleLabel.textContent = _label29;
            _help19 = texts[lang].autoGearCameraHandleHelp || ((_texts$en136 = texts.en) === null || _texts$en136 === void 0 ? void 0 : _texts$en136.autoGearCameraHandleHelp) || _label29;
            autoGearCameraHandleLabel.setAttribute('data-help', _help19);
            if (autoGearCameraHandleSelect) {
              autoGearCameraHandleSelect.setAttribute('data-help', _help19);
              autoGearCameraHandleSelect.setAttribute('aria-label', _label29);
            }
          }
          if (autoGearViewfinderExtensionLabel) {
            _label30 = texts[lang].autoGearViewfinderExtensionLabel || ((_texts$en137 = texts.en) === null || _texts$en137 === void 0 ? void 0 : _texts$en137.autoGearViewfinderExtensionLabel) || autoGearViewfinderExtensionLabel.textContent;
            autoGearViewfinderExtensionLabel.textContent = _label30;
            _help20 = texts[lang].autoGearViewfinderExtensionHelp || ((_texts$en138 = texts.en) === null || _texts$en138 === void 0 ? void 0 : _texts$en138.autoGearViewfinderExtensionHelp) || _label30;
            autoGearViewfinderExtensionLabel.setAttribute('data-help', _help20);
            if (autoGearViewfinderExtensionSelect) {
              autoGearViewfinderExtensionSelect.setAttribute('data-help', _help20);
              autoGearViewfinderExtensionSelect.setAttribute('aria-label', _label30);
            }
          }
          if (autoGearDeliveryResolutionLabel) {
            _label31 = texts[lang].autoGearDeliveryResolutionLabel || ((_texts$en139 = texts.en) === null || _texts$en139 === void 0 ? void 0 : _texts$en139.autoGearDeliveryResolutionLabel) || autoGearDeliveryResolutionLabel.textContent;
            autoGearDeliveryResolutionLabel.textContent = _label31;
            _help21 = texts[lang].autoGearDeliveryResolutionHelp || ((_texts$en140 = texts.en) === null || _texts$en140 === void 0 ? void 0 : _texts$en140.autoGearDeliveryResolutionHelp) || _label31;
            autoGearDeliveryResolutionLabel.setAttribute('data-help', _help21);
            if (autoGearDeliveryResolutionSelect) {
              autoGearDeliveryResolutionSelect.setAttribute('data-help', _help21);
              autoGearDeliveryResolutionSelect.setAttribute('aria-label', _label31);
            }
          }
          if (autoGearVideoDistributionLabel) {
            _label32 = texts[lang].autoGearVideoDistributionLabel || ((_texts$en141 = texts.en) === null || _texts$en141 === void 0 ? void 0 : _texts$en141.autoGearVideoDistributionLabel) || autoGearVideoDistributionLabel.textContent;
            autoGearVideoDistributionLabel.textContent = _label32;
            _help22 = texts[lang].autoGearVideoDistributionHelp || ((_texts$en142 = texts.en) === null || _texts$en142 === void 0 ? void 0 : _texts$en142.autoGearVideoDistributionHelp) || _label32;
            autoGearVideoDistributionLabel.setAttribute('data-help', _help22);
            if (autoGearVideoDistributionSelect) {
              autoGearVideoDistributionSelect.setAttribute('data-help', _help22);
              autoGearVideoDistributionSelect.setAttribute('aria-label', _label32);
            }
          }
          if (autoGearCameraLabel) {
            _label33 = texts[lang].autoGearCameraLabel || ((_texts$en143 = texts.en) === null || _texts$en143 === void 0 ? void 0 : _texts$en143.autoGearCameraLabel) || autoGearCameraLabel.textContent;
            autoGearCameraLabel.textContent = _label33;
            _help23 = texts[lang].autoGearCameraHelp || ((_texts$en144 = texts.en) === null || _texts$en144 === void 0 ? void 0 : _texts$en144.autoGearCameraHelp) || _label33;
            autoGearCameraLabel.setAttribute('data-help', _help23);
            if (autoGearCameraSelect) {
              autoGearCameraSelect.setAttribute('data-help', _help23);
              autoGearCameraSelect.setAttribute('aria-label', _label33);
            }
          }
          if (autoGearOwnGearLabel) {
            _label34 = texts[lang].autoGearConditionOwnGearLabel || texts[lang].autoGearOwnGearLabel || ((_texts$en145 = texts.en) === null || _texts$en145 === void 0 ? void 0 : _texts$en145.autoGearConditionOwnGearLabel) || ((_texts$en146 = texts.en) === null || _texts$en146 === void 0 ? void 0 : _texts$en146.autoGearOwnGearLabel) || autoGearOwnGearLabel.textContent;
            _help24 = texts[lang].autoGearConditionOwnGearHelp || ((_texts$en147 = texts.en) === null || _texts$en147 === void 0 ? void 0 : _texts$en147.autoGearConditionOwnGearHelp) || texts[lang].autoGearOwnGearHelp || ((_texts$en148 = texts.en) === null || _texts$en148 === void 0 ? void 0 : _texts$en148.autoGearOwnGearHelp) || _label34;
            autoGearOwnGearLabel.textContent = _label34;
            autoGearOwnGearLabel.setAttribute('data-help', _help24);
            if (autoGearOwnGearSelect) {
              autoGearOwnGearSelect.setAttribute('data-help', _help24);
              autoGearOwnGearSelect.setAttribute('aria-label', _label34);
            }
          }
          if (autoGearCameraWeightLabel) {
            _label35 = texts[lang].autoGearCameraWeightLabel || ((_texts$en149 = texts.en) === null || _texts$en149 === void 0 ? void 0 : _texts$en149.autoGearCameraWeightLabel) || autoGearCameraWeightLabel.textContent || 'Camera weight';
            _help25 = texts[lang].autoGearCameraWeightHelp || ((_texts$en150 = texts.en) === null || _texts$en150 === void 0 ? void 0 : _texts$en150.autoGearCameraWeightHelp) || _label35;
            autoGearCameraWeightLabel.textContent = _label35;
            autoGearCameraWeightLabel.setAttribute('data-help', _help25);
          }
          if (autoGearCameraWeightOperatorLabel) {
            _label36 = texts[lang].autoGearCameraWeightOperatorLabel || ((_texts$en151 = texts.en) === null || _texts$en151 === void 0 ? void 0 : _texts$en151.autoGearCameraWeightOperatorLabel) || autoGearCameraWeightOperatorLabel.textContent || 'Weight comparison';
            autoGearCameraWeightOperatorLabel.textContent = _label36;
            autoGearCameraWeightOperatorLabel.setAttribute('data-help', _label36);
            if (autoGearCameraWeightOperator) {
              autoGearCameraWeightOperator.setAttribute('data-help', _label36);
              autoGearCameraWeightOperator.setAttribute('aria-label', _label36);
              greaterLabel = texts[lang].autoGearCameraWeightOperatorGreater || ((_texts$en152 = texts.en) === null || _texts$en152 === void 0 ? void 0 : _texts$en152.autoGearCameraWeightOperatorGreater) || 'Heavier than';
              lessLabel = texts[lang].autoGearCameraWeightOperatorLess || ((_texts$en153 = texts.en) === null || _texts$en153 === void 0 ? void 0 : _texts$en153.autoGearCameraWeightOperatorLess) || 'Lighter than';
              equalLabel = texts[lang].autoGearCameraWeightOperatorEqual || ((_texts$en154 = texts.en) === null || _texts$en154 === void 0 ? void 0 : _texts$en154.autoGearCameraWeightOperatorEqual) || 'Exactly';
              Array.from(autoGearCameraWeightOperator.options || []).forEach(function (option) {
                if (!option) return;
                if (option.value === 'greater') {
                  option.textContent = greaterLabel;
                } else if (option.value === 'less') {
                  option.textContent = lessLabel;
                } else if (option.value === 'equal') {
                  option.textContent = equalLabel;
                }
              });
            }
          }
          if (autoGearCameraWeightValueLabel) {
            _label37 = texts[lang].autoGearCameraWeightValueLabel || ((_texts$en155 = texts.en) === null || _texts$en155 === void 0 ? void 0 : _texts$en155.autoGearCameraWeightValueLabel) || autoGearCameraWeightValueLabel.textContent || 'Weight threshold (grams)';
            _help26 = texts[lang].autoGearCameraWeightHelp || ((_texts$en156 = texts.en) === null || _texts$en156 === void 0 ? void 0 : _texts$en156.autoGearCameraWeightHelp) || _label37;
            autoGearCameraWeightValueLabel.textContent = _label37;
            autoGearCameraWeightValueLabel.setAttribute('data-help', _help26);
            if (autoGearCameraWeightValueInput) {
              autoGearCameraWeightValueInput.setAttribute('data-help', _help26);
              autoGearCameraWeightValueInput.setAttribute('aria-label', _label37);
            }
          }
          if (autoGearCameraWeightHelp) {
            _help27 = texts[lang].autoGearCameraWeightHelp || ((_texts$en157 = texts.en) === null || _texts$en157 === void 0 ? void 0 : _texts$en157.autoGearCameraWeightHelp) || autoGearCameraWeightHelp.textContent || '';
            autoGearCameraWeightHelp.textContent = _help27;
            if (_help27) {
              autoGearCameraWeightHelp.setAttribute('data-help', _help27);
            }
          }
          if (autoGearMonitorLabel) {
            _label38 = texts[lang].autoGearMonitorLabel || ((_texts$en158 = texts.en) === null || _texts$en158 === void 0 ? void 0 : _texts$en158.autoGearMonitorLabel) || autoGearMonitorLabel.textContent;
            autoGearMonitorLabel.textContent = _label38;
            _help28 = texts[lang].autoGearMonitorHelp || ((_texts$en159 = texts.en) === null || _texts$en159 === void 0 ? void 0 : _texts$en159.autoGearMonitorHelp) || _label38;
            autoGearMonitorLabel.setAttribute('data-help', _help28);
            if (autoGearMonitorSelect) {
              autoGearMonitorSelect.setAttribute('data-help', _help28);
              autoGearMonitorSelect.setAttribute('aria-label', _label38);
            }
          }
          if (autoGearTripodHeadBrandLabel) {
            _label39 = texts[lang].autoGearTripodHeadBrandLabel || ((_texts$en160 = texts.en) === null || _texts$en160 === void 0 ? void 0 : _texts$en160.autoGearTripodHeadBrandLabel) || autoGearTripodHeadBrandLabel.textContent;
            autoGearTripodHeadBrandLabel.textContent = _label39;
            _help29 = texts[lang].autoGearTripodHeadBrandHelp || ((_texts$en161 = texts.en) === null || _texts$en161 === void 0 ? void 0 : _texts$en161.autoGearTripodHeadBrandHelp) || _label39;
            autoGearTripodHeadBrandLabel.setAttribute('data-help', _help29);
            if (autoGearTripodHeadBrandSelect) {
              autoGearTripodHeadBrandSelect.setAttribute('data-help', _help29);
              autoGearTripodHeadBrandSelect.setAttribute('aria-label', _label39);
            }
          }
          if (autoGearTripodBowlLabel) {
            _label40 = texts[lang].autoGearTripodBowlLabel || ((_texts$en162 = texts.en) === null || _texts$en162 === void 0 ? void 0 : _texts$en162.autoGearTripodBowlLabel) || autoGearTripodBowlLabel.textContent;
            autoGearTripodBowlLabel.textContent = _label40;
            _help30 = texts[lang].autoGearTripodBowlHelp || ((_texts$en163 = texts.en) === null || _texts$en163 === void 0 ? void 0 : _texts$en163.autoGearTripodBowlHelp) || _label40;
            autoGearTripodBowlLabel.setAttribute('data-help', _help30);
            if (autoGearTripodBowlSelect) {
              autoGearTripodBowlSelect.setAttribute('data-help', _help30);
              autoGearTripodBowlSelect.setAttribute('aria-label', _label40);
            }
          }
          if (autoGearTripodTypesLabel) {
            _label41 = texts[lang].autoGearTripodTypesLabel || ((_texts$en164 = texts.en) === null || _texts$en164 === void 0 ? void 0 : _texts$en164.autoGearTripodTypesLabel) || autoGearTripodTypesLabel.textContent;
            autoGearTripodTypesLabel.textContent = _label41;
            _help31 = texts[lang].autoGearTripodTypesHelp || ((_texts$en165 = texts.en) === null || _texts$en165 === void 0 ? void 0 : _texts$en165.autoGearTripodTypesHelp) || _label41;
            autoGearTripodTypesLabel.setAttribute('data-help', _help31);
            if (autoGearTripodTypesSelect) {
              autoGearTripodTypesSelect.setAttribute('data-help', _help31);
              autoGearTripodTypesSelect.setAttribute('aria-label', _label41);
            }
          }
          if (autoGearTripodSpreaderLabel) {
            _label42 = texts[lang].autoGearTripodSpreaderLabel || ((_texts$en166 = texts.en) === null || _texts$en166 === void 0 ? void 0 : _texts$en166.autoGearTripodSpreaderLabel) || autoGearTripodSpreaderLabel.textContent;
            autoGearTripodSpreaderLabel.textContent = _label42;
            _help32 = texts[lang].autoGearTripodSpreaderHelp || ((_texts$en167 = texts.en) === null || _texts$en167 === void 0 ? void 0 : _texts$en167.autoGearTripodSpreaderHelp) || _label42;
            autoGearTripodSpreaderLabel.setAttribute('data-help', _help32);
            if (autoGearTripodSpreaderSelect) {
              autoGearTripodSpreaderSelect.setAttribute('data-help', _help32);
              autoGearTripodSpreaderSelect.setAttribute('aria-label', _label42);
            }
          }
          if (autoGearCrewPresentLabel) {
            _label43 = texts[lang].autoGearCrewPresentLabel || ((_texts$en168 = texts.en) === null || _texts$en168 === void 0 ? void 0 : _texts$en168.autoGearCrewPresentLabel) || autoGearCrewPresentLabel.textContent;
            autoGearCrewPresentLabel.textContent = _label43;
            _help33 = texts[lang].autoGearCrewPresentHelp || ((_texts$en169 = texts.en) === null || _texts$en169 === void 0 ? void 0 : _texts$en169.autoGearCrewPresentHelp) || _label43;
            autoGearCrewPresentLabel.setAttribute('data-help', _help33);
            if (autoGearCrewPresentSelect) {
              autoGearCrewPresentSelect.setAttribute('data-help', _help33);
              autoGearCrewPresentSelect.setAttribute('aria-label', _label43);
            }
          }
          if (autoGearCrewAbsentLabel) {
            _label44 = texts[lang].autoGearCrewAbsentLabel || ((_texts$en170 = texts.en) === null || _texts$en170 === void 0 ? void 0 : _texts$en170.autoGearCrewAbsentLabel) || autoGearCrewAbsentLabel.textContent;
            autoGearCrewAbsentLabel.textContent = _label44;
            _help34 = texts[lang].autoGearCrewAbsentHelp || ((_texts$en171 = texts.en) === null || _texts$en171 === void 0 ? void 0 : _texts$en171.autoGearCrewAbsentHelp) || _label44;
            autoGearCrewAbsentLabel.setAttribute('data-help', _help34);
            if (autoGearCrewAbsentSelect) {
              autoGearCrewAbsentSelect.setAttribute('data-help', _help34);
              autoGearCrewAbsentSelect.setAttribute('aria-label', _label44);
            }
          }
          if (autoGearWirelessLabel) {
            _label45 = texts[lang].autoGearWirelessLabel || ((_texts$en172 = texts.en) === null || _texts$en172 === void 0 ? void 0 : _texts$en172.autoGearWirelessLabel) || autoGearWirelessLabel.textContent;
            autoGearWirelessLabel.textContent = _label45;
            _help35 = texts[lang].autoGearWirelessHelp || ((_texts$en173 = texts.en) === null || _texts$en173 === void 0 ? void 0 : _texts$en173.autoGearWirelessHelp) || _label45;
            autoGearWirelessLabel.setAttribute('data-help', _help35);
            if (autoGearWirelessSelect) {
              autoGearWirelessSelect.setAttribute('data-help', _help35);
              autoGearWirelessSelect.setAttribute('aria-label', _label45);
            }
          }
          if (autoGearMotorsLabel) {
            _label46 = texts[lang].autoGearMotorsLabel || ((_texts$en174 = texts.en) === null || _texts$en174 === void 0 ? void 0 : _texts$en174.autoGearMotorsLabel) || autoGearMotorsLabel.textContent;
            autoGearMotorsLabel.textContent = _label46;
            _help36 = texts[lang].autoGearMotorsHelp || ((_texts$en175 = texts.en) === null || _texts$en175 === void 0 ? void 0 : _texts$en175.autoGearMotorsHelp) || _label46;
            autoGearMotorsLabel.setAttribute('data-help', _help36);
            if (autoGearMotorsSelect) {
              autoGearMotorsSelect.setAttribute('data-help', _help36);
              autoGearMotorsSelect.setAttribute('aria-label', _label46);
            }
          }
          if (autoGearControllersLabel) {
            _label47 = texts[lang].autoGearControllersLabel || ((_texts$en176 = texts.en) === null || _texts$en176 === void 0 ? void 0 : _texts$en176.autoGearControllersLabel) || autoGearControllersLabel.textContent;
            autoGearControllersLabel.textContent = _label47;
            _help37 = texts[lang].autoGearControllersHelp || ((_texts$en177 = texts.en) === null || _texts$en177 === void 0 ? void 0 : _texts$en177.autoGearControllersHelp) || _label47;
            autoGearControllersLabel.setAttribute('data-help', _help37);
            if (autoGearControllersSelect) {
              autoGearControllersSelect.setAttribute('data-help', _help37);
              autoGearControllersSelect.setAttribute('aria-label', _label47);
            }
          }
          if (autoGearDistanceLabel) {
            _label48 = texts[lang].autoGearDistanceLabel || ((_texts$en178 = texts.en) === null || _texts$en178 === void 0 ? void 0 : _texts$en178.autoGearDistanceLabel) || autoGearDistanceLabel.textContent;
            autoGearDistanceLabel.textContent = _label48;
            _help38 = texts[lang].autoGearDistanceHelp || ((_texts$en179 = texts.en) === null || _texts$en179 === void 0 ? void 0 : _texts$en179.autoGearDistanceHelp) || _label48;
            autoGearDistanceLabel.setAttribute('data-help', _help38);
            if (autoGearDistanceSelect) {
              autoGearDistanceSelect.setAttribute('data-help', _help38);
              autoGearDistanceSelect.setAttribute('aria-label', _label48);
            }
          }
          logicLabelText = texts[lang].autoGearConditionLogicLabel || ((_texts$en180 = texts.en) === null || _texts$en180 === void 0 ? void 0 : _texts$en180.autoGearConditionLogicLabel) || 'Match behavior';
          logicHelpText = texts[lang].autoGearConditionLogicHelp || ((_texts$en181 = texts.en) === null || _texts$en181 === void 0 ? void 0 : _texts$en181.autoGearConditionLogicHelp) || logicLabelText;
          logicOptionTexts = {
            all: ((_texts$lang = texts[lang]) === null || _texts$lang === void 0 ? void 0 : _texts$lang.autoGearConditionLogicAll) || ((_texts$en182 = texts.en) === null || _texts$en182 === void 0 ? void 0 : _texts$en182.autoGearConditionLogicAll) || 'Require every selected value',
            any: ((_texts$lang2 = texts[lang]) === null || _texts$lang2 === void 0 ? void 0 : _texts$lang2.autoGearConditionLogicAny) || ((_texts$en183 = texts.en) === null || _texts$en183 === void 0 ? void 0 : _texts$en183.autoGearConditionLogicAny) || 'Match any selected value',
            none: ((_texts$lang3 = texts[lang]) === null || _texts$lang3 === void 0 ? void 0 : _texts$lang3.autoGearConditionLogicNone) || ((_texts$en184 = texts.en) === null || _texts$en184 === void 0 ? void 0 : _texts$en184.autoGearConditionLogicNone) || 'Require none of the selected values',
            multiplier: ((_texts$lang4 = texts[lang]) === null || _texts$lang4 === void 0 ? void 0 : _texts$lang4.autoGearConditionLogicMultiplier) || ((_texts$en185 = texts.en) === null || _texts$en185 === void 0 ? void 0 : _texts$en185.autoGearConditionLogicMultiplier) || 'Multiply by matched values'
          };
          Object.entries(autoGearConditionLogicSelects).forEach(function (_ref71) {
            var _ref72 = _slicedToArray(_ref71, 2),
              key = _ref72[0],
              select = _ref72[1];
            var label = autoGearConditionLogicLabels[key];
            if (label) {
              label.textContent = logicLabelText;
              label.setAttribute('data-help', logicHelpText);
            }
            if (select) {
              select.setAttribute('aria-label', logicLabelText);
              select.setAttribute('data-help', logicHelpText);
              select.setAttribute('title', logicHelpText);
              Array.from(select.options || []).forEach(function (option) {
                if (!option) return;
                var optionText = logicOptionTexts[option.value];
                if (optionText) option.textContent = optionText;
              });
            }
          });
          if (autoGearAddItemsHeading) {
            autoGearAddItemsHeading.textContent = texts[lang].autoGearAddItemsHeading || ((_texts$en186 = texts.en) === null || _texts$en186 === void 0 ? void 0 : _texts$en186.autoGearAddItemsHeading) || autoGearAddItemsHeading.textContent;
          }
          if (autoGearAddOwnGearLabel) {
            _label49 = texts[lang].autoGearOwnGearLabel || ((_texts$en187 = texts.en) === null || _texts$en187 === void 0 ? void 0 : _texts$en187.autoGearOwnGearLabel) || autoGearAddOwnGearLabel.textContent;
            _help39 = texts[lang].autoGearOwnGearHelp || ((_texts$en188 = texts.en) === null || _texts$en188 === void 0 ? void 0 : _texts$en188.autoGearOwnGearHelp) || _label49;
            _placeholder = texts[lang].autoGearOwnGearPlaceholder || ((_texts$en189 = texts.en) === null || _texts$en189 === void 0 ? void 0 : _texts$en189.autoGearOwnGearPlaceholder) || '';
            autoGearAddOwnGearLabel.textContent = _label49;
            autoGearAddOwnGearLabel.setAttribute('data-help', _help39);
            if (autoGearAddOwnGearSelect) {
              autoGearAddOwnGearSelect.setAttribute('aria-label', _label49);
              autoGearAddOwnGearSelect.setAttribute('data-help', _help39);
              if (_placeholder) {
                autoGearAddOwnGearSelect.setAttribute('data-placeholder', _placeholder);
              } else {
                autoGearAddOwnGearSelect.removeAttribute('data-placeholder');
              }
            }
          }
          if (autoGearAddItemLabel) {
            _label50 = texts[lang].autoGearAddItemLabel || ((_texts$en190 = texts.en) === null || _texts$en190 === void 0 ? void 0 : _texts$en190.autoGearAddItemLabel) || autoGearAddItemLabel.textContent;
            hint = texts[lang].autoGearAddMultipleHint || ((_texts$en191 = texts.en) === null || _texts$en191 === void 0 ? void 0 : _texts$en191.autoGearAddMultipleHint) || '';
            helpText = hint ? "".concat(_label50, " \u2013 ").concat(hint) : _label50;
            autoGearAddItemLabel.textContent = _label50;
            autoGearAddItemLabel.setAttribute('data-help', helpText);
            if (autoGearAddNameInput) {
              autoGearAddNameInput.setAttribute('aria-label', _label50);
              autoGearAddNameInput.setAttribute('data-help', helpText);
              if (hint) {
                autoGearAddNameInput.setAttribute('placeholder', hint);
              } else {
                autoGearAddNameInput.removeAttribute('placeholder');
              }
            }
          }
          if (autoGearAddCategoryLabel) {
            _label51 = texts[lang].autoGearAddCategoryLabel || ((_texts$en192 = texts.en) === null || _texts$en192 === void 0 ? void 0 : _texts$en192.autoGearAddCategoryLabel) || autoGearAddCategoryLabel.textContent;
            autoGearAddCategoryLabel.textContent = _label51;
            if (autoGearAddCategorySelect) {
              autoGearAddCategorySelect.setAttribute('aria-label', _label51);
            }
          }
          if (autoGearAddQuantityLabel) {
            _label52 = texts[lang].autoGearAddQuantityLabel || ((_texts$en193 = texts.en) === null || _texts$en193 === void 0 ? void 0 : _texts$en193.autoGearAddQuantityLabel) || autoGearAddQuantityLabel.textContent;
            autoGearAddQuantityLabel.textContent = _label52;
            if (autoGearAddQuantityInput) {
              autoGearAddQuantityInput.setAttribute('aria-label', _label52);
            }
          }
          if (autoGearAddScreenSizeLabel) {
            _label53 = texts[lang].autoGearAddScreenSizeLabel || ((_texts$en194 = texts.en) === null || _texts$en194 === void 0 ? void 0 : _texts$en194.autoGearAddScreenSizeLabel) || autoGearAddScreenSizeLabel.textContent;
            autoGearAddScreenSizeLabel.textContent = _label53;
            if (autoGearAddScreenSizeInput) {
              autoGearAddScreenSizeInput.setAttribute('aria-label', _label53);
            }
          }
          if (autoGearAddSelectorTypeLabel) {
            _label54 = texts[lang].autoGearAddSelectorTypeLabel || ((_texts$en195 = texts.en) === null || _texts$en195 === void 0 ? void 0 : _texts$en195.autoGearAddSelectorTypeLabel) || autoGearAddSelectorTypeLabel.textContent;
            autoGearAddSelectorTypeLabel.textContent = _label54;
            if (autoGearAddSelectorTypeSelect) {
              autoGearAddSelectorTypeSelect.setAttribute('aria-label', _label54);
              noneLabel = texts[lang].autoGearSelectorNoneOption || ((_texts$en196 = texts.en) === null || _texts$en196 === void 0 ? void 0 : _texts$en196.autoGearSelectorNoneOption) || 'No selector';
              monitorLabel = texts[lang].autoGearSelectorMonitorOption || ((_texts$en197 = texts.en) === null || _texts$en197 === void 0 ? void 0 : _texts$en197.autoGearSelectorMonitorOption) || 'Monitor selector';
              directorLabel = texts[lang].autoGearSelectorDirectorOption || ((_texts$en198 = texts.en) === null || _texts$en198 === void 0 ? void 0 : _texts$en198.autoGearSelectorDirectorOption) || 'Director monitor selector';
              tripodHeadLabel = texts[lang].autoGearSelectorTripodHeadOption || ((_texts$en199 = texts.en) === null || _texts$en199 === void 0 ? void 0 : _texts$en199.autoGearSelectorTripodHeadOption) || 'Tripod head selector';
              _tripodBowlLabel = texts[lang].autoGearSelectorTripodBowlOption || ((_texts$en200 = texts.en) === null || _texts$en200 === void 0 ? void 0 : _texts$en200.autoGearSelectorTripodBowlOption) || 'Tripod bowl selector';
              _tripodTypesLabel = texts[lang].autoGearSelectorTripodTypesOption || ((_texts$en201 = texts.en) === null || _texts$en201 === void 0 ? void 0 : _texts$en201.autoGearSelectorTripodTypesOption) || 'Tripod type selector';
              _tripodSpreaderLabel = texts[lang].autoGearSelectorTripodSpreaderOption || ((_texts$en202 = texts.en) === null || _texts$en202 === void 0 ? void 0 : _texts$en202.autoGearSelectorTripodSpreaderOption) || 'Tripod spreader selector';
              selectorLabels = new Map([['none', noneLabel], ['monitor', monitorLabel], ['directorMonitor', directorLabel], ['tripodHeadBrand', tripodHeadLabel], ['tripodBowl', _tripodBowlLabel], ['tripodTypes', _tripodTypesLabel], ['tripodSpreader', _tripodSpreaderLabel]]);
              Array.from(autoGearAddSelectorTypeSelect.options || []).forEach(function (opt) {
                var text = selectorLabels.get(opt.value);
                if (text) opt.textContent = text;
              });
            }
          }
          if (autoGearAddSelectorDefaultLabel) {
            _label55 = texts[lang].autoGearAddSelectorDefaultLabel || ((_texts$en203 = texts.en) === null || _texts$en203 === void 0 ? void 0 : _texts$en203.autoGearAddSelectorDefaultLabel) || autoGearAddSelectorDefaultLabel.textContent;
            autoGearAddSelectorDefaultLabel.textContent = _label55;
            if (autoGearAddSelectorDefaultInput) {
              autoGearAddSelectorDefaultInput.setAttribute('aria-label', _label55);
            }
          }
          if (autoGearAddNotesLabel) {
            _label56 = texts[lang].autoGearAddNotesLabel || ((_texts$en204 = texts.en) === null || _texts$en204 === void 0 ? void 0 : _texts$en204.autoGearAddNotesLabel) || autoGearAddNotesLabel.textContent;
            autoGearAddNotesLabel.textContent = _label56;
            if (autoGearAddNotesInput) {
              autoGearAddNotesInput.setAttribute('aria-label', _label56);
            }
          }
          if (autoGearAddItemButton) {
            if (typeof updateAutoGearItemButtonState === 'function') {
              updateAutoGearItemButtonState('add');
            }
          }
          if (autoGearRemoveItemsHeading) {
            autoGearRemoveItemsHeading.textContent = texts[lang].autoGearRemoveItemsHeading || ((_texts$en205 = texts.en) === null || _texts$en205 === void 0 ? void 0 : _texts$en205.autoGearRemoveItemsHeading) || autoGearRemoveItemsHeading.textContent;
          }
          if (autoGearRemoveOwnGearLabel) {
            _label57 = texts[lang].autoGearOwnGearLabel || ((_texts$en206 = texts.en) === null || _texts$en206 === void 0 ? void 0 : _texts$en206.autoGearOwnGearLabel) || autoGearRemoveOwnGearLabel.textContent;
            _help40 = texts[lang].autoGearOwnGearHelp || ((_texts$en207 = texts.en) === null || _texts$en207 === void 0 ? void 0 : _texts$en207.autoGearOwnGearHelp) || _label57;
            _placeholder2 = texts[lang].autoGearOwnGearPlaceholder || ((_texts$en208 = texts.en) === null || _texts$en208 === void 0 ? void 0 : _texts$en208.autoGearOwnGearPlaceholder) || '';
            autoGearRemoveOwnGearLabel.textContent = _label57;
            autoGearRemoveOwnGearLabel.setAttribute('data-help', _help40);
            if (autoGearRemoveOwnGearSelect) {
              autoGearRemoveOwnGearSelect.setAttribute('aria-label', _label57);
              autoGearRemoveOwnGearSelect.setAttribute('data-help', _help40);
              if (_placeholder2) {
                autoGearRemoveOwnGearSelect.setAttribute('data-placeholder', _placeholder2);
              } else {
                autoGearRemoveOwnGearSelect.removeAttribute('data-placeholder');
              }
            }
          }
          if (autoGearRemoveItemLabel) {
            _label58 = texts[lang].autoGearRemoveItemLabel || ((_texts$en209 = texts.en) === null || _texts$en209 === void 0 ? void 0 : _texts$en209.autoGearRemoveItemLabel) || autoGearRemoveItemLabel.textContent;
            _hint = texts[lang].autoGearRemoveMultipleHint || ((_texts$en210 = texts.en) === null || _texts$en210 === void 0 ? void 0 : _texts$en210.autoGearRemoveMultipleHint) || '';
            _helpText = _hint ? "".concat(_label58, " \u2013 ").concat(_hint) : _label58;
            autoGearRemoveItemLabel.textContent = _label58;
            autoGearRemoveItemLabel.setAttribute('data-help', _helpText);
            if (autoGearRemoveNameInput) {
              autoGearRemoveNameInput.setAttribute('aria-label', _label58);
              autoGearRemoveNameInput.setAttribute('data-help', _helpText);
              if (_hint) {
                autoGearRemoveNameInput.setAttribute('placeholder', _hint);
              } else {
                autoGearRemoveNameInput.removeAttribute('placeholder');
              }
            }
          }
          if (autoGearRemoveCategoryLabel) {
            _label59 = texts[lang].autoGearRemoveCategoryLabel || ((_texts$en211 = texts.en) === null || _texts$en211 === void 0 ? void 0 : _texts$en211.autoGearRemoveCategoryLabel) || autoGearRemoveCategoryLabel.textContent;
            autoGearRemoveCategoryLabel.textContent = _label59;
            if (autoGearRemoveCategorySelect) {
              autoGearRemoveCategorySelect.setAttribute('aria-label', _label59);
            }
          }
          if (autoGearRemoveQuantityLabel) {
            _label60 = texts[lang].autoGearRemoveQuantityLabel || ((_texts$en212 = texts.en) === null || _texts$en212 === void 0 ? void 0 : _texts$en212.autoGearRemoveQuantityLabel) || autoGearRemoveQuantityLabel.textContent;
            autoGearRemoveQuantityLabel.textContent = _label60;
            if (autoGearRemoveQuantityInput) {
              autoGearRemoveQuantityInput.setAttribute('aria-label', _label60);
            }
          }
          if (autoGearRemoveScreenSizeLabel) {
            _label61 = texts[lang].autoGearRemoveScreenSizeLabel || ((_texts$en213 = texts.en) === null || _texts$en213 === void 0 ? void 0 : _texts$en213.autoGearRemoveScreenSizeLabel) || autoGearRemoveScreenSizeLabel.textContent;
            autoGearRemoveScreenSizeLabel.textContent = _label61;
            if (autoGearRemoveScreenSizeInput) {
              autoGearRemoveScreenSizeInput.setAttribute('aria-label', _label61);
            }
          }
          if (autoGearRemoveSelectorTypeLabel) {
            _label62 = texts[lang].autoGearRemoveSelectorTypeLabel || ((_texts$en214 = texts.en) === null || _texts$en214 === void 0 ? void 0 : _texts$en214.autoGearRemoveSelectorTypeLabel) || autoGearRemoveSelectorTypeLabel.textContent;
            autoGearRemoveSelectorTypeLabel.textContent = _label62;
            if (autoGearRemoveSelectorTypeSelect) {
              autoGearRemoveSelectorTypeSelect.setAttribute('aria-label', _label62);
              _noneLabel = texts[lang].autoGearSelectorNoneOption || ((_texts$en215 = texts.en) === null || _texts$en215 === void 0 ? void 0 : _texts$en215.autoGearSelectorNoneOption) || 'No selector';
              _monitorLabel = texts[lang].autoGearSelectorMonitorOption || ((_texts$en216 = texts.en) === null || _texts$en216 === void 0 ? void 0 : _texts$en216.autoGearSelectorMonitorOption) || 'Monitor selector';
              _directorLabel = texts[lang].autoGearSelectorDirectorOption || ((_texts$en217 = texts.en) === null || _texts$en217 === void 0 ? void 0 : _texts$en217.autoGearSelectorDirectorOption) || 'Director monitor selector';
              _tripodHeadLabel = texts[lang].autoGearSelectorTripodHeadOption || ((_texts$en218 = texts.en) === null || _texts$en218 === void 0 ? void 0 : _texts$en218.autoGearSelectorTripodHeadOption) || 'Tripod head selector';
              _tripodBowlLabel2 = texts[lang].autoGearSelectorTripodBowlOption || ((_texts$en219 = texts.en) === null || _texts$en219 === void 0 ? void 0 : _texts$en219.autoGearSelectorTripodBowlOption) || 'Tripod bowl selector';
              _tripodTypesLabel2 = texts[lang].autoGearSelectorTripodTypesOption || ((_texts$en220 = texts.en) === null || _texts$en220 === void 0 ? void 0 : _texts$en220.autoGearSelectorTripodTypesOption) || 'Tripod type selector';
              _tripodSpreaderLabel2 = texts[lang].autoGearSelectorTripodSpreaderOption || ((_texts$en221 = texts.en) === null || _texts$en221 === void 0 ? void 0 : _texts$en221.autoGearSelectorTripodSpreaderOption) || 'Tripod spreader selector';
              _selectorLabels = new Map([['none', _noneLabel], ['monitor', _monitorLabel], ['directorMonitor', _directorLabel], ['tripodHeadBrand', _tripodHeadLabel], ['tripodBowl', _tripodBowlLabel2], ['tripodTypes', _tripodTypesLabel2], ['tripodSpreader', _tripodSpreaderLabel2]]);
              Array.from(autoGearRemoveSelectorTypeSelect.options || []).forEach(function (opt) {
                var text = _selectorLabels.get(opt.value);
                if (text) opt.textContent = text;
              });
            }
          }
          if (autoGearRemoveSelectorDefaultLabel) {
            _label63 = texts[lang].autoGearRemoveSelectorDefaultLabel || ((_texts$en222 = texts.en) === null || _texts$en222 === void 0 ? void 0 : _texts$en222.autoGearRemoveSelectorDefaultLabel) || autoGearRemoveSelectorDefaultLabel.textContent;
            autoGearRemoveSelectorDefaultLabel.textContent = _label63;
            if (autoGearRemoveSelectorDefaultInput) {
              autoGearRemoveSelectorDefaultInput.setAttribute('aria-label', _label63);
            }
          }
          if (autoGearRemoveNotesLabel) {
            _label64 = texts[lang].autoGearRemoveNotesLabel || ((_texts$en223 = texts.en) === null || _texts$en223 === void 0 ? void 0 : _texts$en223.autoGearRemoveNotesLabel) || autoGearRemoveNotesLabel.textContent;
            autoGearRemoveNotesLabel.textContent = _label64;
            if (autoGearRemoveNotesInput) {
              autoGearRemoveNotesInput.setAttribute('aria-label', _label64);
            }
          }
          updateAutoGearOwnGearOptions();
          if (autoGearDraftImpactHeading) {
            _heading2 = texts[lang].autoGearDraftImpactHeading || ((_texts$en224 = texts.en) === null || _texts$en224 === void 0 ? void 0 : _texts$en224.autoGearDraftImpactHeading) || autoGearDraftImpactHeading.textContent;
            autoGearDraftImpactHeading.textContent = _heading2;
          }
          if (autoGearDraftImpactDescription) {
            _description3 = texts[lang].autoGearDraftImpactDescription || ((_texts$en225 = texts.en) === null || _texts$en225 === void 0 ? void 0 : _texts$en225.autoGearDraftImpactDescription) || autoGearDraftImpactDescription.textContent;
            autoGearDraftImpactDescription.textContent = _description3;
            if (autoGearDraftImpactHeading) {
              autoGearDraftImpactHeading.setAttribute('data-help', _description3);
            }
            if (autoGearDraftImpactContainer) {
              autoGearDraftImpactContainer.setAttribute('data-help', _description3);
            }
          }
          if (autoGearDraftWarningHeading) {
            _heading3 = texts[lang].autoGearDraftWarningHeading || ((_texts$en226 = texts.en) === null || _texts$en226 === void 0 ? void 0 : _texts$en226.autoGearDraftWarningHeading) || autoGearDraftWarningHeading.textContent;
            autoGearDraftWarningHeading.textContent = _heading3;
          }
          if (autoGearRemoveItemButton) {
            if (typeof updateAutoGearItemButtonState === 'function') {
              updateAutoGearItemButtonState('remove');
            }
          }
          if (autoGearSaveRuleButton) {
            _label65 = texts[lang].autoGearSaveRule || ((_texts$en227 = texts.en) === null || _texts$en227 === void 0 ? void 0 : _texts$en227.autoGearSaveRule) || autoGearSaveRuleButton.textContent;
            setButtonLabelWithIconBinding(autoGearSaveRuleButton, _label65);
            autoGearSaveRuleButton.setAttribute('data-help', _label65);
          }
          if (autoGearCancelEditButton) {
            _label66 = texts[lang].autoGearCancelEdit || ((_texts$en228 = texts.en) === null || _texts$en228 === void 0 ? void 0 : _texts$en228.autoGearCancelEdit) || autoGearCancelEditButton.textContent;
            setButtonLabelWithIconBinding(autoGearCancelEditButton, _label66, ICON_GLYPHS.circleX);
            autoGearCancelEditButton.setAttribute('data-help', _label66);
          }
          if (autoGearAddCategorySelect) {
            populateAutoGearCategorySelect(autoGearAddCategorySelect, autoGearAddCategorySelect.value);
          }
          if (autoGearRemoveCategorySelect) {
            populateAutoGearCategorySelect(autoGearRemoveCategorySelect, autoGearRemoveCategorySelect.value);
          }
          syncAutoGearMonitorFieldVisibility();
          if (autoGearScenariosSelect) {
            refreshAutoGearScenarioOptions(autoGearEditorDraft === null || autoGearEditorDraft === void 0 ? void 0 : autoGearEditorDraft.scenarios);
          }
          if (autoGearMatteboxSelect) {
            refreshAutoGearMatteboxOptions(autoGearEditorDraft === null || autoGearEditorDraft === void 0 ? void 0 : autoGearEditorDraft.mattebox);
          }
          if (autoGearCameraHandleSelect) {
            refreshAutoGearCameraHandleOptions(autoGearEditorDraft === null || autoGearEditorDraft === void 0 ? void 0 : autoGearEditorDraft.cameraHandle);
          }
          if (autoGearViewfinderExtensionSelect) {
            refreshAutoGearViewfinderExtensionOptions(autoGearEditorDraft === null || autoGearEditorDraft === void 0 ? void 0 : autoGearEditorDraft.viewfinderExtension);
          }
          if (autoGearDeliveryResolutionSelect) {
            refreshAutoGearDeliveryResolutionOptions(autoGearEditorDraft === null || autoGearEditorDraft === void 0 ? void 0 : autoGearEditorDraft.deliveryResolution);
          }
          if (autoGearVideoDistributionSelect) {
            refreshAutoGearVideoDistributionOptions(autoGearEditorDraft === null || autoGearEditorDraft === void 0 ? void 0 : autoGearEditorDraft.videoDistribution);
          }
          callCoreFunctionIfAvailable('seedAutoGearRulesFromCurrentProject', [], {
            defer: true
          });
          callCoreFunctionIfAvailable('renderAutoGearRulesList', [], {
            defer: true
          });
          callCoreFunctionIfAvailable('renderAutoGearDraftLists', [], {
            defer: true
          });
          callCoreFunctionIfAvailable('updateAutoGearCatalogOptions', [], {
            defer: true
          });
          callCoreFunctionIfAvailable('renderAutoGearPresetsControls', [], {
            defer: true
          });
          callCoreFunctionIfAvailable('applyAutoGearBackupVisibility', [], {
            defer: true
          });
          contrastLabel = document.getElementById("settingsHighContrastLabel");
          if (contrastLabel) {
            contrastLabel.textContent = texts[lang].highContrastSetting;
            contrastHelp = texts[lang].highContrastSettingHelp || texts[lang].highContrastSetting;
            contrastLabel.setAttribute("data-help", contrastHelp);
            if (settingsHighContrast) {
              settingsHighContrast.setAttribute("data-help", contrastHelp);
              settingsHighContrast.setAttribute("aria-label", texts[lang].highContrastSetting);
            }
          }
          accessibilityHeading = document.getElementById("accessibilityHeading");
          if (accessibilityHeading) {
            accessibilityHeading.textContent = texts[lang].accessibilityHeading;
            accessibilityHeading.setAttribute("data-help", texts[lang].accessibilityHeadingHelp || texts[lang].accessibilityHeading);
          }
          backupHeading = document.getElementById("backupHeading");
          if (backupHeading) {
            backupHeading.textContent = texts[lang].backupHeading;
            backupHeading.setAttribute("data-help", texts[lang].backupHeadingHelp || texts[lang].backupHeading);
          }
          projectBackupsHeading = typeof document !== 'undefined' ? document.getElementById('projectBackupsHeading') : null;
          if (projectBackupsHeading) {
            headingText = texts[lang].projectBackupsHeading || "Project Backups";
            projectBackupsHeading.textContent = headingText;
            descriptionText = texts[lang].projectBackupsDescription || "";
            if (descriptionText) {
              projectBackupsHeading.setAttribute("data-help", descriptionText);
            } else {
              projectBackupsHeading.removeAttribute("data-help");
            }
          }
          projectBackupsDescription = typeof document !== 'undefined' ? document.getElementById('projectBackupsDescription') : null;
          if (projectBackupsDescription) {
            _descriptionText = texts[lang].projectBackupsDescription || "";
            if (_descriptionText) {
              projectBackupsDescription.textContent = _descriptionText;
              projectBackupsDescription.hidden = false;
            } else {
              projectBackupsDescription.textContent = "";
              projectBackupsDescription.hidden = true;
            }
          }
          if (dataHeading) {
            dataHeading.textContent = texts[lang].dataHeading;
            dataHelp = texts[lang].dataHeadingHelp || texts[lang].dataHeading;
            dataHeading.setAttribute("data-help", dataHelp);
          }
          if (storageSummaryIntro) {
            storageSummaryIntro.textContent = texts[lang].storageSummaryIntro;
          }
          if (storageSummaryFootnote) {
            storageSummaryFootnote.textContent = texts[lang].storageSummaryFootnote;
          }
          if (storageSummaryEmpty) {
            storageSummaryEmpty.textContent = texts[lang].storageSummaryEmpty;
          }
          if (storagePersistenceHeading) {
            _headingText = texts[lang].storagePersistenceHeading || ((_texts$en229 = texts.en) === null || _texts$en229 === void 0 ? void 0 : _texts$en229.storagePersistenceHeading) || storagePersistenceHeading.textContent;
            storagePersistenceHeading.textContent = _headingText;
            _headingHelp = texts[lang].storagePersistenceHeadingHelp || ((_texts$en230 = texts.en) === null || _texts$en230 === void 0 ? void 0 : _texts$en230.storagePersistenceHeadingHelp) || _headingText;
            storagePersistenceHeading.setAttribute('data-help', _headingHelp);
          }
          if (storagePersistenceIntro) {
            storagePersistenceIntro.textContent = texts[lang].storagePersistenceIntro || ((_texts$en231 = texts.en) === null || _texts$en231 === void 0 ? void 0 : _texts$en231.storagePersistenceIntro) || storagePersistenceIntro.textContent;
          }
          if (storagePersistenceRequestButton) {
            requestLabel = texts[lang].storagePersistenceRequest || ((_texts$en232 = texts.en) === null || _texts$en232 === void 0 ? void 0 : _texts$en232.storagePersistenceRequest) || storagePersistenceRequestButton.textContent;
            setButtonLabelWithIconBinding(storagePersistenceRequestButton, requestLabel, ICON_GLYPHS.save);
            storagePersistenceRequestButton.dataset.defaultLabel = requestLabel;
            requestHelp = texts[lang].storagePersistenceRequestHelp || ((_texts$en233 = texts.en) === null || _texts$en233 === void 0 ? void 0 : _texts$en233.storagePersistenceRequestHelp) || requestLabel;
            storagePersistenceRequestButton.setAttribute('data-help', requestHelp);
            storagePersistenceRequestButton.setAttribute('title', requestHelp);
            storagePersistenceRequestButton.setAttribute('aria-label', requestHelp);
          }
          if (storagePersistenceStatus) {
            idleText = texts[lang].storagePersistenceStatusIdle || ((_texts$en234 = texts.en) === null || _texts$en234 === void 0 ? void 0 : _texts$en234.storagePersistenceStatusIdle) || storagePersistenceStatus.textContent;
            storagePersistenceStatus.textContent = idleText;
            storagePersistenceStatus.setAttribute('data-help', idleText);
          }
          callCoreFunctionIfAvailable('renderStoragePersistenceStatus', [], {
            defer: true
          });
          if (storageActionsHeading) {
            _headingText2 = texts[lang].storageActionsHeading || ((_texts$en235 = texts.en) === null || _texts$en235 === void 0 ? void 0 : _texts$en235.storageActionsHeading) || storageActionsHeading.textContent;
            storageActionsHeading.textContent = _headingText2;
            _headingHelp2 = texts[lang].storageActionsHeadingHelp || ((_texts$en236 = texts.en) === null || _texts$en236 === void 0 ? void 0 : _texts$en236.storageActionsHeadingHelp) || _headingText2;
            storageActionsHeading.setAttribute('data-help', _headingHelp2);
          }
          if (storageActionsIntro) {
            storageActionsIntro.textContent = texts[lang].storageActionsIntro || ((_texts$en237 = texts.en) === null || _texts$en237 === void 0 ? void 0 : _texts$en237.storageActionsIntro) || storageActionsIntro.textContent;
          }
          if (storageBackupNowButton) {
            backupLabel = texts[lang].storageBackupNow || ((_texts$en238 = texts.en) === null || _texts$en238 === void 0 ? void 0 : _texts$en238.storageBackupNow) || storageBackupNowButton.textContent;
            setButtonLabelWithIconBinding(storageBackupNowButton, backupLabel, ICON_GLYPHS.fileExport);
            backupHelp = texts[lang].storageBackupNowHelp || ((_texts$en239 = texts.en) === null || _texts$en239 === void 0 ? void 0 : _texts$en239.storageBackupNowHelp) || backupLabel;
            storageBackupNowButton.setAttribute('data-help', backupHelp);
            storageBackupNowButton.setAttribute('title', backupHelp);
          }
          if (storageOpenBackupTabButton) {
            openLabel = texts[lang].storageOpenBackupTab || ((_texts$en240 = texts.en) === null || _texts$en240 === void 0 ? void 0 : _texts$en240.storageOpenBackupTab) || storageOpenBackupTabButton.textContent;
            setButtonLabelWithIconBinding(storageOpenBackupTabButton, openLabel, ICON_GLYPHS.settingsBackup);
            openHelp = texts[lang].storageOpenBackupTabHelp || ((_texts$en241 = texts.en) === null || _texts$en241 === void 0 ? void 0 : _texts$en241.storageOpenBackupTabHelp) || openLabel;
            storageOpenBackupTabButton.setAttribute('data-help', openHelp);
            storageOpenBackupTabButton.setAttribute('title', openHelp);
          }
          if (storageStatusHeading) {
            statusHeading = texts[lang].storageStatusHeading || ((_texts$en242 = texts.en) === null || _texts$en242 === void 0 ? void 0 : _texts$en242.storageStatusHeading) || storageStatusHeading.textContent;
            storageStatusHeading.textContent = statusHeading;
            statusHelp = texts[lang].storageStatusHeadingHelp || ((_texts$en243 = texts.en) === null || _texts$en243 === void 0 ? void 0 : _texts$en243.storageStatusHeadingHelp) || statusHeading;
            storageStatusHeading.setAttribute('data-help', statusHelp);
          }
          if (storageStatusLastProjectLabel) {
            storageStatusLastProjectLabel.textContent = texts[lang].storageStatusLastProjectLabel || ((_texts$en244 = texts.en) === null || _texts$en244 === void 0 ? void 0 : _texts$en244.storageStatusLastProjectLabel) || storageStatusLastProjectLabel.textContent;
          }
          if (storageStatusLastAutoBackupLabel) {
            storageStatusLastAutoBackupLabel.textContent = texts[lang].storageStatusLastAutoBackupLabel || ((_texts$en245 = texts.en) === null || _texts$en245 === void 0 ? void 0 : _texts$en245.storageStatusLastAutoBackupLabel) || storageStatusLastAutoBackupLabel.textContent;
          }
          if (storageStatusLastFullBackupLabel) {
            storageStatusLastFullBackupLabel.textContent = texts[lang].storageStatusLastFullBackupLabel || ((_texts$en246 = texts.en) === null || _texts$en246 === void 0 ? void 0 : _texts$en246.storageStatusLastFullBackupLabel) || storageStatusLastFullBackupLabel.textContent;
          }
          statusDefaultText = texts[lang].storageStatusNever || ((_texts$en247 = texts.en) === null || _texts$en247 === void 0 ? void 0 : _texts$en247.storageStatusNever) || (storageStatusLastProjectValue ? storageStatusLastProjectValue.textContent : '');
          if (storageStatusLastProjectValue) {
            storageStatusLastProjectValue.textContent = statusDefaultText;
          }
          if (storageStatusLastAutoBackupValue) {
            storageStatusLastAutoBackupValue.textContent = statusDefaultText;
          }
          if (storageStatusLastFullBackupValue) {
            storageStatusLastFullBackupValue.textContent = statusDefaultText;
          }
          if (storageStatusReminder) {
            storageStatusReminder.textContent = '';
            storageStatusReminder.setAttribute('hidden', '');
            storageStatusReminder.classList.remove('storage-status-reminder--warning', 'storage-status-reminder--ok');
            storageStatusReminder.removeAttribute('data-help');
          }
          if (loggingSection) {
            sectionHelp = texts[lang].loggingSectionHelp || texts[lang].loggingHeadingHelp || ((_texts$en248 = texts.en) === null || _texts$en248 === void 0 ? void 0 : _texts$en248.loggingHeadingHelp) || '';
            if (sectionHelp) {
              loggingSection.setAttribute('data-help', sectionHelp);
            } else {
              loggingSection.removeAttribute('data-help');
            }
          }
          if (loggingHeading) {
            _headingText3 = texts[lang].loggingHeading || ((_texts$en249 = texts.en) === null || _texts$en249 === void 0 ? void 0 : _texts$en249.loggingHeading) || loggingHeading.textContent || 'Diagnostics log';
            loggingHeading.textContent = _headingText3;
            _headingHelp3 = texts[lang].loggingHeadingHelp || ((_texts$en250 = texts.en) === null || _texts$en250 === void 0 ? void 0 : _texts$en250.loggingHeadingHelp) || _headingText3;
            loggingHeading.setAttribute('data-help', _headingHelp3);
          }
          if (loggingIntro) {
            loggingIntro.textContent = texts[lang].loggingIntro || ((_texts$en251 = texts.en) === null || _texts$en251 === void 0 ? void 0 : _texts$en251.loggingIntro) || loggingIntro.textContent;
          }
          if (loggingLevelFilterLabel) {
            _filterLabel = texts[lang].loggingLevelFilterLabel || ((_texts$en252 = texts.en) === null || _texts$en252 === void 0 ? void 0 : _texts$en252.loggingLevelFilterLabel) || loggingLevelFilterLabel.textContent;
            loggingLevelFilterLabel.textContent = _filterLabel;
            loggingLevelFilterLabel.setAttribute('data-help', _filterLabel);
          }
          if (loggingLevelFilter) {
            optionTexts = {
              all: texts[lang].loggingLevelFilterAll || ((_texts$en253 = texts.en) === null || _texts$en253 === void 0 ? void 0 : _texts$en253.loggingLevelFilterAll) || 'All levels',
              info: texts[lang].loggingLevelFilterInfo || ((_texts$en254 = texts.en) === null || _texts$en254 === void 0 ? void 0 : _texts$en254.loggingLevelFilterInfo) || 'Info and above',
              warn: texts[lang].loggingLevelFilterWarn || ((_texts$en255 = texts.en) === null || _texts$en255 === void 0 ? void 0 : _texts$en255.loggingLevelFilterWarn) || 'Warnings and errors',
              error: texts[lang].loggingLevelFilterError || ((_texts$en256 = texts.en) === null || _texts$en256 === void 0 ? void 0 : _texts$en256.loggingLevelFilterError) || 'Errors only'
            };
            Array.from(loggingLevelFilter.options || []).forEach(function (option) {
              if (!option || typeof option.value !== 'string') return;
              var key = option.value;
              if (Object.prototype.hasOwnProperty.call(optionTexts, key)) {
                option.textContent = optionTexts[key];
              }
            });
            filterHelp = texts[lang].loggingLevelFilterHelp || ((_texts$en257 = texts.en) === null || _texts$en257 === void 0 ? void 0 : _texts$en257.loggingLevelFilterHelp) || '';
            if (filterHelp) {
              loggingLevelFilter.setAttribute('data-help', filterHelp);
            } else {
              loggingLevelFilter.removeAttribute('data-help');
            }
          }
          if (loggingNamespaceFilterLabel) {
            namespaceLabel = texts[lang].loggingNamespaceFilterLabel || ((_texts$en258 = texts.en) === null || _texts$en258 === void 0 ? void 0 : _texts$en258.loggingNamespaceFilterLabel) || loggingNamespaceFilterLabel.textContent;
            loggingNamespaceFilterLabel.textContent = namespaceLabel;
          }
          if (loggingNamespaceFilter) {
            _placeholder3 = texts[lang].loggingNamespaceFilterPlaceholder || ((_texts$en259 = texts.en) === null || _texts$en259 === void 0 ? void 0 : _texts$en259.loggingNamespaceFilterPlaceholder) || '';
            if (_placeholder3) {
              loggingNamespaceFilter.setAttribute('placeholder', _placeholder3);
            }
            namespaceHelp = texts[lang].loggingNamespaceFilterHelp || ((_texts$en260 = texts.en) === null || _texts$en260 === void 0 ? void 0 : _texts$en260.loggingNamespaceFilterHelp) || _placeholder3;
            if (namespaceHelp) {
              loggingNamespaceFilter.setAttribute('data-help', namespaceHelp);
              if (loggingNamespaceFilterLabel) {
                loggingNamespaceFilterLabel.setAttribute('data-help', namespaceHelp);
              }
            }
            if (loggingNamespaceFilterHelp) {
              loggingNamespaceFilterHelp.textContent = namespaceHelp;
              if (namespaceHelp) {
                loggingNamespaceFilterHelp.removeAttribute('hidden');
              } else {
                loggingNamespaceFilterHelp.setAttribute('hidden', '');
              }
            }
          }
          if (loggingHistoryLimitLabel) {
            historyLabel = texts[lang].loggingHistoryLimitLabel || ((_texts$en261 = texts.en) === null || _texts$en261 === void 0 ? void 0 : _texts$en261.loggingHistoryLimitLabel) || loggingHistoryLimitLabel.textContent;
            loggingHistoryLimitLabel.textContent = historyLabel;
          }
          if (loggingHistoryLimitHelp) {
            historyHelp = texts[lang].loggingHistoryLimitHelp || ((_texts$en262 = texts.en) === null || _texts$en262 === void 0 ? void 0 : _texts$en262.loggingHistoryLimitHelp) || loggingHistoryLimitHelp.textContent;
            loggingHistoryLimitHelp.textContent = historyHelp;
          }
          if (loggingHistoryLimit) {
            limitHelp = texts[lang].loggingHistoryLimitHelp || ((_texts$en263 = texts.en) === null || _texts$en263 === void 0 ? void 0 : _texts$en263.loggingHistoryLimitHelp) || '';
            if (limitHelp) {
              loggingHistoryLimit.setAttribute('data-help', limitHelp);
            } else {
              loggingHistoryLimit.removeAttribute('data-help');
            }
            limitAria = texts[lang].loggingHistoryLimitAria || ((_texts$en264 = texts.en) === null || _texts$en264 === void 0 ? void 0 : _texts$en264.loggingHistoryLimitAria) || '';
            if (limitAria) {
              loggingHistoryLimit.setAttribute('aria-label', limitAria);
            }
          }
          if (loggingConsoleOutputLabel) {
            consoleLabel = texts[lang].loggingConsoleOutputLabel || ((_texts$en265 = texts.en) === null || _texts$en265 === void 0 ? void 0 : _texts$en265.loggingConsoleOutputLabel) || loggingConsoleOutputLabel.textContent;
            loggingConsoleOutputLabel.textContent = consoleLabel;
          }
          if (loggingConsoleOutputHelp) {
            consoleHelp = texts[lang].loggingConsoleOutputHelp || ((_texts$en266 = texts.en) === null || _texts$en266 === void 0 ? void 0 : _texts$en266.loggingConsoleOutputHelp) || loggingConsoleOutputHelp.textContent;
            loggingConsoleOutputHelp.textContent = consoleHelp;
          }
          if (loggingCaptureConsoleLabel) {
            consoleCaptureLabel = texts[lang].loggingCaptureConsoleLabel || ((_texts$en267 = texts.en) === null || _texts$en267 === void 0 ? void 0 : _texts$en267.loggingCaptureConsoleLabel) || loggingCaptureConsoleLabel.textContent;
            loggingCaptureConsoleLabel.textContent = consoleCaptureLabel;
          }
          if (loggingCaptureConsoleHelp) {
            consoleCaptureHelp = texts[lang].loggingCaptureConsoleHelp || ((_texts$en268 = texts.en) === null || _texts$en268 === void 0 ? void 0 : _texts$en268.loggingCaptureConsoleHelp) || loggingCaptureConsoleHelp.textContent;
            loggingCaptureConsoleHelp.textContent = consoleCaptureHelp;
          }
          if (loggingCaptureErrorsLabel) {
            captureLabel = texts[lang].loggingCaptureErrorsLabel || ((_texts$en269 = texts.en) === null || _texts$en269 === void 0 ? void 0 : _texts$en269.loggingCaptureErrorsLabel) || loggingCaptureErrorsLabel.textContent;
            loggingCaptureErrorsLabel.textContent = captureLabel;
          }
          if (loggingCaptureErrorsHelp) {
            captureHelp = texts[lang].loggingCaptureErrorsHelp || ((_texts$en270 = texts.en) === null || _texts$en270 === void 0 ? void 0 : _texts$en270.loggingCaptureErrorsHelp) || loggingCaptureErrorsHelp.textContent;
            loggingCaptureErrorsHelp.textContent = captureHelp;
          }
          if (loggingPersistSessionLabel) {
            persistLabel = texts[lang].loggingPersistSessionLabel || ((_texts$en271 = texts.en) === null || _texts$en271 === void 0 ? void 0 : _texts$en271.loggingPersistSessionLabel) || loggingPersistSessionLabel.textContent;
            loggingPersistSessionLabel.textContent = persistLabel;
          }
          if (loggingPersistSessionHelp) {
            persistHelp = texts[lang].loggingPersistSessionHelp || ((_texts$en272 = texts.en) === null || _texts$en272 === void 0 ? void 0 : _texts$en272.loggingPersistSessionHelp) || loggingPersistSessionHelp.textContent;
            loggingPersistSessionHelp.textContent = persistHelp;
          }
          if (loggingExportButton) {
            exportLabel = texts[lang].loggingExportButton || ((_texts$en273 = texts.en) === null || _texts$en273 === void 0 ? void 0 : _texts$en273.loggingExportButton) || loggingExportButton.textContent;
            setButtonLabelWithIconBinding(loggingExportButton, exportLabel, ICON_GLYPHS.fileExport);
            loggingExportButton.setAttribute('data-help', exportLabel);
            loggingExportButton.setAttribute('title', exportLabel);
            loggingExportButton.setAttribute('aria-label', exportLabel);
          }
          if (loggingExportHelp) {
            exportHelp = texts[lang].loggingExportHelp || ((_texts$en274 = texts.en) === null || _texts$en274 === void 0 ? void 0 : _texts$en274.loggingExportHelp) || loggingExportHelp.textContent;
            loggingExportHelp.textContent = exportHelp;
            loggingExportHelp.setAttribute('data-help', exportHelp);
          }
          if (loggingStatus) {
            statusText = texts[lang].loggingStatusIdle || ((_texts$en275 = texts.en) === null || _texts$en275 === void 0 ? void 0 : _texts$en275.loggingStatusIdle) || '';
            loggingStatus.textContent = statusText;
            if (statusText) {
              loggingStatus.setAttribute('data-help', statusText);
            }
          }
          if (loggingEmpty) {
            _emptyText = texts[lang].loggingEmptyState || ((_texts$en276 = texts.en) === null || _texts$en276 === void 0 ? void 0 : _texts$en276.loggingEmptyState) || loggingEmpty.textContent;
            loggingEmpty.textContent = _emptyText;
            if (_emptyText) {
              loggingEmpty.setAttribute('data-help', _emptyText);
            }
          }
          if (loggingUnavailable) {
            loggingUnavailable.textContent = texts[lang].loggingUnavailable || ((_texts$en277 = texts.en) === null || _texts$en277 === void 0 ? void 0 : _texts$en277.loggingUnavailable) || loggingUnavailable.textContent;
          }
          showAutoBackupsLabel = document.getElementById("settingsShowAutoBackupsLabel");
          if (showAutoBackupsLabel) {
            showAutoBackupsLabel.textContent = texts[lang].showAutoBackupsSetting;
            autoBackupsHelp = texts[lang].showAutoBackupsHelp || texts[lang].showAutoBackupsSetting;
            showAutoBackupsLabel.setAttribute("data-help", autoBackupsHelp);
            if (settingsShowAutoBackupsEl) {
              settingsShowAutoBackupsEl.setAttribute("data-help", autoBackupsHelp);
              settingsShowAutoBackupsEl.setAttribute("aria-label", texts[lang].showAutoBackupsSetting);
            }
          }
          if (backupDiffToggleButtonEl) {
            compareLabel = texts[lang].versionCompareButton || 'Compare versions';
            setButtonLabelWithIconBinding(backupDiffToggleButtonEl, compareLabel, ICON_GLYPHS.note);
            compareHelp = texts[lang].versionCompareButtonHelp || compareLabel;
            backupDiffToggleButtonEl.setAttribute('data-help', compareHelp);
            backupDiffToggleButtonEl.setAttribute('title', compareHelp);
          }
          if (backupDiffHeadingEl) {
            backupDiffHeadingEl.textContent = texts[lang].versionCompareHeading || 'Version comparison';
          }
          if (backupDiffIntroEl) {
            backupDiffIntroEl.textContent = texts[lang].versionCompareIntro || '';
          }
          if (backupDiffPrimaryLabelEl) {
            primaryLabel = texts[lang].versionComparePrimaryLabel || 'Baseline version';
            backupDiffPrimaryLabelEl.textContent = primaryLabel;
            if (backupDiffPrimarySelectEl) {
              backupDiffPrimarySelectEl.setAttribute('aria-label', primaryLabel);
            }
          }
          if (backupDiffSecondaryLabelEl) {
            compareLabelText = texts[lang].versionCompareSecondaryLabel || 'Comparison version';
            backupDiffSecondaryLabelEl.textContent = compareLabelText;
            if (backupDiffSecondarySelectEl) {
              backupDiffSecondarySelectEl.setAttribute('aria-label', compareLabelText);
            }
          }
          if (backupDiffEmptyStateEl) {
            backupDiffEmptyStateEl.textContent = texts[lang].versionCompareEmpty || 'Save a project or wait for auto-backups to start comparing versions.';
          }
          if (backupDiffNotesLabelEl) {
            backupDiffNotesLabelEl.textContent = texts[lang].versionCompareNotesLabel || 'Incident notes';
          }
          if (backupDiffNotesEl) {
            _placeholder4 = texts[lang].versionCompareNotesPlaceholder || 'Record context, on-set observations, or required follow-up.';
            backupDiffNotesEl.placeholder = _placeholder4;
          }
          if (backupDiffExportButtonEl) {
            _exportLabel = texts[lang].versionCompareExport || 'Export log';
            setButtonLabelWithIconBinding(backupDiffExportButtonEl, _exportLabel, ICON_GLYPHS.fileExport);
            _exportHelp = texts[lang].versionCompareExportHelp || _exportLabel;
            backupDiffExportButtonEl.setAttribute('data-help', _exportHelp);
            backupDiffExportButtonEl.setAttribute('title', _exportHelp);
          }
          if (backupDiffCloseButtonEl) {
            closeLabel = texts[lang].versionCompareClose || texts[lang].cancelSettings || 'Close';
            setButtonLabelWithIconBinding(backupDiffCloseButtonEl, closeLabel, ICON_GLYPHS.circleX);
          }
          if (backupSettingsButton) {
            _backupLabel = texts[lang].backupSettings;
            setButtonLabelWithIconBinding(backupSettingsButton, _backupLabel, ICON_GLYPHS.fileExport);
            _backupHelp = texts[lang].backupSettingsHelp || _backupLabel;
            backupSettingsButton.setAttribute("data-help", _backupHelp);
            backupSettingsButton.setAttribute("title", _backupHelp);
            backupSettingsButton.setAttribute("aria-label", _backupHelp);
          }
          if (restoreSettings) {
            restoreLabel = texts[lang].restoreSettings;
            setButtonLabelWithIconBinding(restoreSettings, restoreLabel, ICON_GLYPHS.fileImport);
            restoreHelp = texts[lang].restoreSettingsHelp || restoreLabel;
            restoreSettings.setAttribute("data-help", restoreHelp);
            restoreSettings.setAttribute("title", restoreHelp);
            restoreSettings.setAttribute("aria-label", restoreHelp);
          }
          if (restoreRehearsalButton) {
            rehearsalLabel = texts[lang].restoreRehearsalButton || 'Restore rehearsal';
            setButtonLabelWithIconBinding(restoreRehearsalButton, rehearsalLabel, ICON_GLYPHS.load);
            rehearsalHelp = texts[lang].restoreRehearsalButtonHelp || rehearsalLabel;
            restoreRehearsalButton.setAttribute('data-help', rehearsalHelp);
            restoreRehearsalButton.setAttribute('title', rehearsalHelp);
            restoreRehearsalButton.setAttribute('aria-label', rehearsalHelp);
          }
          if (restoreRehearsalHeading) {
            restoreRehearsalHeading.textContent = texts[lang].restoreRehearsalHeading || restoreRehearsalHeading.textContent;
          }
          if (restoreRehearsalIntro) {
            restoreRehearsalIntro.textContent = texts[lang].restoreRehearsalIntro || restoreRehearsalIntro.textContent;
          }
          if (restoreRehearsalModeLabel) {
            restoreRehearsalModeLabel.textContent = texts[lang].restoreRehearsalModeLabel || restoreRehearsalModeLabel.textContent;
          }
          if (restoreRehearsalModeBackupText) {
            restoreRehearsalModeBackupText.textContent = texts[lang].restoreRehearsalModeBackup || restoreRehearsalModeBackupText.textContent;
          }
          if (restoreRehearsalModeProjectText) {
            restoreRehearsalModeProjectText.textContent = texts[lang].restoreRehearsalModeProject || restoreRehearsalModeProjectText.textContent;
          }
          if (restoreRehearsalFileLabel) {
            restoreRehearsalFileLabel.textContent = texts[lang].restoreRehearsalFileLabel || restoreRehearsalFileLabel.textContent;
          }
          if (restoreRehearsalBrowse) {
            browseLabel = texts[lang].restoreRehearsalFileButton || 'Choose file';
            setButtonLabelWithIconBinding(restoreRehearsalBrowse, browseLabel, ICON_GLYPHS.fileImport);
            restoreRehearsalBrowse.setAttribute('data-help', browseLabel);
            restoreRehearsalBrowse.setAttribute('title', browseLabel);
            restoreRehearsalBrowse.setAttribute('aria-label', browseLabel);
          }
          if (restoreRehearsalFileName) {
            restoreRehearsalFileName.textContent = texts[lang].restoreRehearsalNoFile || restoreRehearsalFileName.textContent;
          }
          if (restoreRehearsalStatus) {
            restoreRehearsalStatus.textContent = texts[lang].restoreRehearsalReady || '';
          }
          if (restoreRehearsalRuleHeading) {
            restoreRehearsalRuleHeading.textContent = texts[lang].restoreRehearsalRuleHeading || ((_texts$en278 = texts.en) === null || _texts$en278 === void 0 ? void 0 : _texts$en278.restoreRehearsalRuleHeading) || restoreRehearsalRuleHeading.textContent;
          }
          if (restoreRehearsalRuleIntro) {
            restoreRehearsalRuleIntro.textContent = texts[lang].restoreRehearsalRuleIntro || ((_texts$en279 = texts.en) === null || _texts$en279 === void 0 ? void 0 : _texts$en279.restoreRehearsalRuleIntro) || restoreRehearsalRuleIntro.textContent;
          }
          if (restoreRehearsalRuleEmpty) {
            restoreRehearsalRuleEmpty.textContent = texts[lang].restoreRehearsalRuleEmpty || ((_texts$en280 = texts.en) === null || _texts$en280 === void 0 ? void 0 : _texts$en280.restoreRehearsalRuleEmpty) || restoreRehearsalRuleEmpty.textContent;
          }
          if (restoreRehearsalTableCaption) {
            restoreRehearsalTableCaption.textContent = texts[lang].restoreRehearsalTableCaption || restoreRehearsalTableCaption.textContent;
          }
          if (restoreRehearsalMetricHeader) {
            restoreRehearsalMetricHeader.textContent = texts[lang].restoreRehearsalMetricColumn || restoreRehearsalMetricHeader.textContent;
          }
          if (restoreRehearsalLiveHeader) {
            restoreRehearsalLiveHeader.textContent = texts[lang].restoreRehearsalLiveColumn || restoreRehearsalLiveHeader.textContent;
          }
          if (restoreRehearsalSandboxHeader) {
            restoreRehearsalSandboxHeader.textContent = texts[lang].restoreRehearsalSandboxColumn || restoreRehearsalSandboxHeader.textContent;
          }
          if (restoreRehearsalDifferenceHeader) {
            restoreRehearsalDifferenceHeader.textContent = texts[lang].restoreRehearsalDifferenceColumn || restoreRehearsalDifferenceHeader.textContent;
          }
          resolvedRestoreRehearsalCloseButton = typeof restoreRehearsalCloseButton !== 'undefined' ? restoreRehearsalCloseButton : resolveElement('restoreRehearsalCloseButton', 'restoreRehearsalClose');
          if (resolvedRestoreRehearsalCloseButton) {
            _closeLabel = texts[lang].restoreRehearsalClose || texts[lang].cancelSettings || 'Close';
            setButtonLabelWithIconBinding(resolvedRestoreRehearsalCloseButton, _closeLabel, ICON_GLYPHS.circleX);
            resolvedRestoreRehearsalCloseButton.setAttribute('title', _closeLabel);
            resolvedRestoreRehearsalCloseButton.setAttribute('aria-label', _closeLabel);
          }
          if (restoreRehearsalProceedButton) {
            proceedLabel = texts[lang].restoreRehearsalProceed || ((_texts$en281 = texts.en) === null || _texts$en281 === void 0 ? void 0 : _texts$en281.restoreRehearsalProceed) || 'Resume restore rehearsal';
            proceedHelp = texts[lang].restoreRehearsalProceedHelp || ((_texts$en282 = texts.en) === null || _texts$en282 === void 0 ? void 0 : _texts$en282.restoreRehearsalProceedHelp) || proceedLabel;
            setButtonLabelWithIconBinding(restoreRehearsalProceedButton, proceedLabel, ICON_GLYPHS.check);
            restoreRehearsalProceedButton.setAttribute('data-help', proceedHelp);
            restoreRehearsalProceedButton.setAttribute('title', proceedHelp);
            restoreRehearsalProceedButton.setAttribute('aria-label', proceedHelp);
          }
          if (restoreRehearsalAbortButton) {
            abortLabel = texts[lang].restoreRehearsalAbort || ((_texts$en283 = texts.en) === null || _texts$en283 === void 0 ? void 0 : _texts$en283.restoreRehearsalAbort) || 'Abort rehearsal';
            abortHelp = texts[lang].restoreRehearsalAbortHelp || ((_texts$en284 = texts.en) === null || _texts$en284 === void 0 ? void 0 : _texts$en284.restoreRehearsalAbortHelp) || abortLabel;
            setButtonLabelWithIconBinding(restoreRehearsalAbortButton, abortLabel, ICON_GLYPHS.circleX);
            restoreRehearsalAbortButton.setAttribute('data-help', abortHelp);
            restoreRehearsalAbortButton.setAttribute('title', abortHelp);
            restoreRehearsalAbortButton.setAttribute('aria-label', abortHelp);
          }
          if (factoryResetButton) {
            resetLabel = texts[lang].factoryResetButton || "Factory reset";
            resetHelp = texts[lang].factoryResetButtonHelp || resetLabel;
            setButtonLabelWithIconBinding(factoryResetButton, resetLabel, ICON_GLYPHS.reload);
            factoryResetButton.setAttribute("data-help", resetHelp);
            factoryResetButton.setAttribute("title", resetHelp);
            factoryResetButton.setAttribute("aria-label", resetHelp);
          }
          aboutHeading = document.getElementById("aboutHeading");
          if (aboutHeading) {
            aboutHeading.textContent = texts[lang].aboutHeading;
            aboutHeading.setAttribute("data-help", texts[lang].aboutHeadingHelp || texts[lang].aboutHeading);
          }
          aboutVersionElem = typeof document !== 'undefined' ? document.getElementById('aboutVersion') : null;
          if (aboutVersionElem) aboutVersionElem.textContent = "".concat(texts[lang].versionLabel, " ").concat(APP_VERSION);
          supportLinkConfigs = [{
            id: 'supportLink',
            textKey: 'supportLink',
            helpKey: 'supportLinkHelp'
          }, {
            id: 'reportBugLink',
            textKey: 'reportBugLink',
            helpKey: 'reportBugLinkHelp'
          }, {
            id: 'suggestFeatureLink',
            textKey: 'suggestFeatureLink',
            helpKey: 'suggestFeatureLinkHelp'
          }];
          langTexts = texts && texts[lang] || {};
          fallbackTexts = texts && texts.en || {};
          supportLinkConfigs.forEach(function (config) {
            var link = typeof document !== 'undefined' ? document.getElementById(config.id) : null;
            if (!link) {
              return;
            }
            var label = typeof langTexts[config.textKey] === 'string' && langTexts[config.textKey] || typeof fallbackTexts[config.textKey] === 'string' && fallbackTexts[config.textKey] || link.textContent;
            link.textContent = label;
            var help = typeof langTexts[config.helpKey] === 'string' && langTexts[config.helpKey] || typeof fallbackTexts[config.helpKey] === 'string' && fallbackTexts[config.helpKey] || label;
            link.setAttribute('data-help', help);
            link.setAttribute('title', help);
            link.setAttribute('aria-label', help);
          });
          if (settingsSave) {
            _label67 = texts[lang].saveSettings || ((_texts$en285 = texts.en) === null || _texts$en285 === void 0 ? void 0 : _texts$en285.saveSettings) || settingsSave.textContent;
            setButtonLabelWithIconBinding(settingsSave, _label67);
            saveHelp = texts[lang].saveSettingsHelp || texts[lang].saveSettings || _label67;
            settingsSave.setAttribute("data-help", saveHelp);
            settingsSave.setAttribute("title", saveHelp);
            settingsSave.setAttribute("aria-label", saveHelp);
          }
          if (settingsCancel) {
            _cancelLabel = texts[lang].cancelSettings || ((_texts$en286 = texts.en) === null || _texts$en286 === void 0 ? void 0 : _texts$en286.cancelSettings) || settingsCancel.textContent;
            setButtonLabelWithIconBinding(settingsCancel, _cancelLabel, ICON_GLYPHS.circleX);
            cancelHelp = texts[lang].cancelSettingsHelp || texts[lang].cancelSettings || _cancelLabel;
            settingsCancel.setAttribute("data-help", cancelHelp);
            settingsCancel.setAttribute("title", cancelHelp);
            settingsCancel.setAttribute("aria-label", cancelHelp);
          }
          menuToggle = document.getElementById("menuToggle");
          if (menuToggle) {
            menuLabel = texts[lang].menuToggleLabel || ((_texts$en287 = texts.en) === null || _texts$en287 === void 0 ? void 0 : _texts$en287.menuToggleLabel) || menuToggle.getAttribute("aria-label") || "Menu";
            _closeLabel2 = texts[lang].sideMenuClose || ((_texts$en288 = texts.en) === null || _texts$en288 === void 0 ? void 0 : _texts$en288.sideMenuClose) || menuToggle.dataset.closeLabel || "Close menu";
            closeHelp = texts[lang].sideMenuCloseHelp || _closeLabel2;
            menuToggle.setAttribute("title", menuLabel);
            menuToggle.setAttribute("aria-label", menuLabel);
            menuHelp = texts[lang].menuToggleHelp || menuLabel;
            menuToggle.setAttribute("data-help", menuHelp);
            menuToggle.dataset.menuLabel = menuLabel;
            menuToggle.dataset.menuHelp = menuHelp;
            menuToggle.dataset.closeLabel = _closeLabel2;
            menuToggle.dataset.closeHelp = closeHelp;
          }
          sideMenu = document.getElementById("sideMenu");
          if (sideMenu) {
            sideMenuHelp = texts[lang].sideMenuHelp;
            if (sideMenuHelp) {
              sideMenu.setAttribute("data-help", sideMenuHelp);
            } else {
              sideMenu.removeAttribute("data-help");
            }
          }
          sideMenuTitle = document.getElementById("sideMenuTitle");
          if (sideMenuTitle) {
            titleLabel = texts[lang].sideMenuTitle || ((_texts$en289 = texts.en) === null || _texts$en289 === void 0 ? void 0 : _texts$en289.sideMenuTitle) || sideMenuTitle.textContent;
            sideMenuTitle.textContent = titleLabel;
            titleHelp = texts[lang].sideMenuTitleHelp || texts[lang].sideMenuHelp || titleLabel;
            sideMenuTitle.setAttribute("data-help", titleHelp);
          }
          closeMenuButton = document.getElementById("closeMenuButton");
          closeMenuLabel = document.getElementById("closeMenuLabel");
          if (closeMenuButton) {
            _closeLabel3 = texts[lang].sideMenuClose || ((_texts$en290 = texts.en) === null || _texts$en290 === void 0 ? void 0 : _texts$en290.sideMenuClose) || closeMenuButton.getAttribute("aria-label") || "Close menu";
            _closeHelp = texts[lang].sideMenuCloseHelp || _closeLabel3;
            closeMenuButton.setAttribute("aria-label", _closeLabel3);
            closeMenuButton.setAttribute("title", _closeHelp);
            closeMenuButton.setAttribute("data-help", _closeHelp);
            if (closeMenuLabel) {
              closeMenuLabel.textContent = _closeLabel3;
            }
          }
          if (reloadButton) {
            reloadLabel = texts[lang].reloadAppLabel;
            reloadHelp = texts[lang].reloadAppHelp || reloadLabel;
            _offlineNotice = texts[lang].reloadAppOfflineNotice || reloadLabel;
            reloadButton.setAttribute('title', reloadLabel);
            reloadButton.setAttribute('aria-label', reloadLabel);
            reloadButton.setAttribute('data-help', reloadHelp);
            if (reloadButton.dataset) {
              reloadButton.dataset.onlineTitle = reloadLabel;
              reloadButton.dataset.onlineHelp = reloadHelp;
              reloadButton.dataset.offlineNotice = _offlineNotice;
            }
            if (reloadButton.hasAttribute('aria-disabled')) {
              reloadButton.setAttribute('title', _offlineNotice);
              reloadButton.setAttribute('data-help', _offlineNotice);
            }
          }
          if (featureSearch) {
            featureSearch.setAttribute("placeholder", texts[lang].featureSearchPlaceholder);
            featureSearch.setAttribute("aria-label", texts[lang].featureSearchLabel);
            featureSearch.setAttribute("data-help", texts[lang].featureSearchHelp || texts[lang].featureSearchLabel);
          }
          if (helpButton) {
            helpButton.setAttribute("title", texts[lang].helpButtonTitle || texts[lang].helpButtonLabel);
            helpButton.setAttribute("aria-label", texts[lang].helpButtonLabel);
            helpButton.setAttribute("data-help", texts[lang].helpButtonHelp || texts[lang].helpButtonTitle || texts[lang].helpButtonLabel);
            helpShortcutList = texts[lang].helpButtonShortcuts;
            if (typeof helpShortcutList === 'string' && helpShortcutList.trim()) {
              helpButton.setAttribute('data-shortcuts', helpShortcutList);
            } else {
              helpButton.removeAttribute('data-shortcuts');
            }
            helpAriaShortcuts = texts[lang].helpButtonAriaShortcuts || 'F1 Control+Slash Meta+Slash Shift+Slash KeyH';
            if (typeof helpAriaShortcuts === 'string' && helpAriaShortcuts.trim()) {
              helpButton.setAttribute('aria-keyshortcuts', helpAriaShortcuts);
            } else {
              helpButton.removeAttribute('aria-keyshortcuts');
            }
            if (hoverHelpButton) {
              setButtonLabelWithIconBinding(hoverHelpButton, texts[lang].hoverHelpButtonLabel, ICON_GLYPHS.note);
              hoverHelpButton.setAttribute("aria-label", texts[lang].hoverHelpButtonLabel);
              hoverHelpButton.setAttribute("data-help", texts[lang].hoverHelpButtonHelp || texts[lang].hoverHelpButtonLabel);
            }
            if (helpSearch) {
              helpSearch.setAttribute("placeholder", texts[lang].helpSearchPlaceholder);
              helpSearch.setAttribute("aria-label", texts[lang].helpSearchLabel);
              helpSearch.setAttribute("data-help", texts[lang].helpSearchHelp || texts[lang].helpSearchLabel);
            }
            if (helpSearchClear) {
              helpSearchClear.setAttribute("title", texts[lang].helpSearchClear);
              helpSearchClear.setAttribute("aria-label", texts[lang].helpSearchClear);
              helpSearchClear.setAttribute("data-help", texts[lang].helpSearchClearHelp || texts[lang].helpSearchClear);
            }
            if (closeHelpBtn) {
              setButtonLabelWithIconBinding(closeHelpBtn, texts[lang].helpClose, ICON_GLYPHS.circleX);
              closeHelpBtn.setAttribute("title", texts[lang].helpClose);
              closeHelpBtn.setAttribute("aria-label", texts[lang].helpClose);
              closeHelpBtn.setAttribute("data-help", texts[lang].helpCloseHelp || texts[lang].helpClose);
            }
            if (document.getElementById("helpTitle")) {
              document.getElementById("helpTitle").textContent = texts[lang].helpTitle;
            }
            if (helpNoResults) {
              applyTextContent(helpNoResults, "helpNoResults", "No help topics match your search. Try shorter keywords, synonyms or clear the field to browse everything.");
            }
            if (helpNoResultsSuggestionsHeading) {
              applyTextContent(helpNoResultsSuggestionsHeading, "helpNoResultsSuggestionsHeading", "Need a different result?");
            }
            if (helpNoResultsSuggestionsIntro) {
              applyTextContent(helpNoResultsSuggestionsIntro, "helpNoResultsSuggestionsIntro", "Try these steps to get back on track while keeping your data safe:");
            }
            quickStartHeading = doc && doc.querySelector ? doc.querySelector("#helpQuickStartGuide h4") : null;
            if (quickStartHeading) {
              fallback = quickStartHeading.textContent || "Quick start checklist";
              applyTextContent(quickStartHeading, "helpQuickStartChecklistTitle", fallback);
            }
            onboardingCopyElement = doc ? doc.getElementById("helpOnboardingTutorialCopy") : null;
            if (onboardingCopyElement) {
              fallbackCopy = onboardingCopyElement.textContent || "to walk through every workflow before configuring your first project.";
              applyTextContent(onboardingCopyElement, "helpOnboardingTutorialCopy", fallbackCopy);
            }
            dataSafetyHeading = doc && doc.querySelector ? doc.querySelector("#helpDataSafety h4") : null;
            if (dataSafetyHeading) {
              _fallback = dataSafetyHeading.textContent || "Protect your work";
              applyTextContent(dataSafetyHeading, "helpDataSafetyTitle", _fallback);
            }
            restoreDrillHeading = doc ? doc.getElementById("helpRestoreDrillHeading") : null;
            if (restoreDrillHeading) {
              _fallback2 = restoreDrillHeading.textContent || "Restore rehearsal drill";
              applyTextContent(restoreDrillHeading, "helpRestoreDrillTitle", _fallback2);
            }
            restoreDrillNote = doc ? doc.getElementById("helpRestoreDrillNote") : null;
            if (restoreDrillNote) {
              _fallback3 = restoreDrillNote.textContent || "Record the filename, timestamp and verification results in your backup log before closing the rehearsal so every drill leaves behind a documented recovery point.";
              applyTextContent(restoreDrillNote, "helpRestoreDrillNote", _fallback3);
            }
            if (helpDataAuditHeading) {
              _fallback4 = helpDataAuditHeading.textContent || "Monthly data health check";
              applyTextContent(helpDataAuditHeading, "helpDataAuditTitle", _fallback4);
            }
            applySuggestionTemplate(helpDataAuditStep1, "helpDataAuditStep1", [function () {
              return createHelpLink("#settingsButton", resolveLocaleString("settingsButton") || "Settings", {
                target: "#settingsButton"
              });
            }, function () {
              return createHelpLink("#dataHeading", resolveLocaleString("dataHeading") || "Data & Storage", {
                target: "#dataHeading",
                highlight: "#settingsDialog"
              });
            }, function () {
              return createHelpLink("#storageBackupNow", resolveLocaleString("storageBackupNow") || "Download full backup", {
                target: "#storageBackupNow",
                highlight: "#storageActions"
              });
            }, function () {
              return createHelpLink("#storageActionsHeading", resolveLocaleString("storageActionsHeading") || "Quick safeguards", {
                target: "#storageActionsHeading",
                highlight: "#storageActions",
                isButton: false
              });
            }]);
            applySuggestionTemplate(helpDataAuditStep2, "helpDataAuditStep2", [function () {
              return createHelpLink("#shareSetupBtn", resolveLocaleString("shareSetupBtn") || "Export Project", {
                target: "#shareSetupBtn",
                highlight: "#setup-manager"
              });
            }]);
            applySuggestionTemplate(helpDataAuditStep3, "helpDataAuditStep3", [function () {
              return createHelpLink("#reloadButton", resolveLocaleString("reloadAppLabel") || "Force reload", {
                target: "#reloadButton"
              });
            }, function () {
              return createHelpLink("#offlineIndicator", resolveLocaleString("offlineIndicator") || "Offline", {
                target: "#offlineIndicator"
              });
            }, function () {
              return createHelpLink("#applySharedLinkBtn", resolveLocaleString("loadSharedLinkBtn") || "Import Project", {
                target: "#applySharedLinkBtn",
                highlight: "#setup-manager"
              });
            }]);
            applySuggestionTemplate(helpDataAuditStep4, "helpDataAuditStep4", [function () {
              return createHelpLink("#restoreRehearsalButton", resolveLocaleString("restoreRehearsalButton") || "Restore rehearsal", {
                target: "#restoreRehearsalButton",
                highlight: "#restoreRehearsalSection"
              });
            }, function () {
              var code = doc.createElement("code");
              code.textContent = "window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })";
              return code;
            }]);
            if (helpDataAuditNote) {
              _fallback5 = helpDataAuditNote.textContent || "Log the results in your backup rotation checklist so you always know which copies were verified offline.";
              applyTextContent(helpDataAuditNote, "helpDataAuditNote", _fallback5);
            }
            applySuggestionTemplate(helpNoResultsSuggestionClear, "helpNoResultsSuggestionClear", [function () {
              return createHelpLink("#helpSearchClear", resolveLocaleString("helpSearchClear") || "Clear search", {
                target: "#helpSearchClear",
                highlight: "#helpSearchContainer"
              });
            }]);
            applySuggestionText(helpNoResultsSuggestionSynonyms, "helpNoResultsSuggestionSynonyms");
            applySuggestionTemplate(helpNoResultsSuggestionQuickStart, "helpNoResultsSuggestionQuickStart", [function () {
              return createHelpLink("#helpQuickStartGuide", resolveLocaleString("helpQuickStartChecklistTitle") || "Quick start checklist", {
                target: "#helpQuickStartGuide",
                highlight: "#helpQuickStartGuide"
              });
            }]);
            applySuggestionTemplate(helpNoResultsSuggestionBackup, "helpNoResultsSuggestionBackup", [function () {
              return createHelpLink("#helpDataSafety", resolveLocaleString("helpDataSafetyTitle") || "Protect your work", {
                target: "#helpDataSafety",
                highlight: "#helpDataSafety"
              });
            }, function () {
              return createHelpLink("#helpRestoreDrillHeading", resolveLocaleString("helpRestoreDrillTitle") || "Restore rehearsal drill", {
                target: "#helpRestoreDrillHeading",
                highlight: "#helpDataSafety",
                isButton: false
              });
            }]);
            if (typeof updateHelpResultsSummaryText === 'function') {
              updateHelpResultsSummaryText();
            }
            if (typeof updateHelpQuickLinksForLanguage === 'function') {
              updateHelpQuickLinksForLanguage(lang);
            }
          }
          setButtonLabelWithIconBinding(document.getElementById("generateOverviewBtn"), texts[lang].generateOverviewBtn, ICON_GLYPHS.overview);
          setButtonLabelWithIconBinding(document.getElementById("generateGearListBtn"), texts[lang].generateGearListBtn, ICON_GLYPHS.gearList);
          setButtonLabelWithIconBinding(document.getElementById("shareSetupBtn"), texts[lang].shareSetupBtn, ICON_GLYPHS.fileExport);
          exportRevert = document.getElementById("exportAndRevertBtn");
          if (exportRevert) {
            setButtonLabelWithIconBinding(exportRevert, texts[lang].exportAndRevertBtn, ICON_GLYPHS.reload);
            exportRevert.setAttribute('data-help', texts[lang].exportAndRevertBtnHelp);
          }
          downloadDiagramButton = typeof downloadDiagramBtn !== 'undefined' && downloadDiagramBtn || (typeof document !== 'undefined' && document && typeof document.getElementById === 'function' ? document.getElementById('downloadDiagram') : null);
          if (downloadDiagramButton) {
            downloadDiagramButton.textContent = texts[lang].downloadDiagramBtn;
            downloadDiagramButton.setAttribute("title", texts[lang].downloadDiagramBtn);
            downloadDiagramButton.setAttribute("aria-label", texts[lang].downloadDiagramBtn);
            downloadDiagramButton.setAttribute("data-help", texts[lang].downloadDiagramHelp);
          }
          if (gridSnapToggleBtn) {
            setButtonLabelWithIconBinding(gridSnapToggleBtn, texts[lang].gridSnapToggle, ICON_GLYPHS.magnet);
            gridSnapToggleBtn.setAttribute("title", texts[lang].gridSnapToggle);
            gridSnapToggleBtn.setAttribute("aria-label", texts[lang].gridSnapToggle);
            gridSnapToggleBtn.setAttribute("data-help", texts[lang].gridSnapToggleHelp);
            snapActive = false;
            try {
              snapActive = Boolean(getGridSnapState());
            } catch (gridSnapReadError) {
              void gridSnapReadError;
              try {
                snapActive = Boolean(gridSnap);
              } catch (legacyGridSnapError) {
                void legacyGridSnapError;
              }
            }
            gridSnapToggleBtn.setAttribute('aria-pressed', snapActive ? 'true' : 'false');
          }
          resetViewBtn = typeof document !== 'undefined' ? document.getElementById('resetView') : null;
          if (resetViewBtn) {
            setButtonLabelWithIconBinding(resetViewBtn, texts[lang].resetViewBtn, ICON_GLYPHS.resetView);
            resetViewBtn.setAttribute("title", texts[lang].resetViewBtn);
            resetViewBtn.setAttribute("aria-label", texts[lang].resetViewBtn);
            resetViewBtn.setAttribute("data-help", texts[lang].resetViewHelp);
          }
          zoomInBtn = typeof document !== 'undefined' ? document.getElementById('zoomIn') : null;
          if (zoomInBtn) {
            setButtonLabelWithIconBinding(zoomInBtn, '', ICON_GLYPHS.add);
            zoomInBtn.setAttribute("title", texts[lang].zoomInLabel);
            zoomInBtn.setAttribute("aria-label", texts[lang].zoomInLabel);
            zoomInBtn.setAttribute("data-help", texts[lang].zoomInHelp);
          }
          zoomOutBtn = typeof document !== 'undefined' ? document.getElementById('zoomOut') : null;
          if (zoomOutBtn) {
            setButtonLabelWithIconBinding(zoomOutBtn, '', ICON_GLYPHS.minus);
            zoomOutBtn.setAttribute("title", texts[lang].zoomOutLabel);
            zoomOutBtn.setAttribute("aria-label", texts[lang].zoomOutLabel);
            zoomOutBtn.setAttribute("data-help", texts[lang].zoomOutHelp);
          }
          diagramHint = typeof document !== 'undefined' ? document.getElementById('diagramHint') : null;
          if (diagramHint) {
            diagramHint.textContent = texts[lang].diagramMoveHint;
          }
          fallbackProjectForm = texts.en && texts.en.projectForm ? texts.en.projectForm : {};
          projectFormTexts = texts[lang].projectForm || fallbackProjectForm;
          if (projectFormTexts) {
            resolveContactsDomRefs();
            setLabelText = function setLabelText(element, key) {
              if (!element) return;
              var value = projectFormTexts[key] || fallbackProjectForm[key];
              if (value) element.textContent = value;
            };
            setPlaceholder = function setPlaceholder(element, key) {
              if (!element) return;
              var value = projectFormTexts[key] || fallbackProjectForm[key];
              if (value) element.setAttribute('placeholder', value);
            };
            setOptionText = function setOptionText(element, key) {
              if (!element) return;
              var value = projectFormTexts[key] || fallbackProjectForm[key];
              if (value) element.textContent = value;
            };
            setLabelText(projectDialogHeading, 'heading');
            setLabelText(projectNameLabel, 'projectName');
            setLabelText(productionCompanyLabel, 'productionCompany');
            setLabelText(productionCompanyAddressLabel, 'productionCompanyAddress');
            setLabelText(productionCompanyStreetLabel, 'productionCompanyStreet');
            setLabelText(productionCompanyStreet2Label, 'productionCompanyStreet2');
            setLabelText(productionCompanyCityLabel, 'productionCompanyCity');
            setLabelText(productionCompanyRegionLabel, 'productionCompanyRegion');
            setLabelText(productionCompanyPostalCodeLabel, 'productionCompanyPostalCode');
            setLabelText(productionCompanyCountryLabel, 'productionCompanyCountry');
            setPlaceholder(productionCompanyStreetInput, 'productionCompanyStreetPlaceholder');
            setPlaceholder(productionCompanyStreet2Input, 'productionCompanyStreet2Placeholder');
            setPlaceholder(productionCompanyCityInput, 'productionCompanyCityPlaceholder');
            setPlaceholder(productionCompanyRegionInput, 'productionCompanyRegionPlaceholder');
            setPlaceholder(productionCompanyPostalCodeInput, 'productionCompanyPostalCodePlaceholder');
            setPlaceholder(productionCompanyCountryInput, 'productionCompanyCountryPlaceholder');
            setLabelText(rentalHouseLabel, 'rentalHouse');
            setLabelText(crewHeadingElem, 'crewHeading');
            if (crewLabelElem) {
              crewLabelText = projectFormTexts.crewHeading || fallbackProjectForm.crewHeading;
              if (crewLabelText) {
                crewLabelElem.textContent = "".concat(crewLabelText, ":");
              }
            }
            setLabelText(prepLabelElem, 'prepLabel');
            setLabelText(shootLabelElem, 'shootLabel');
            setLabelText(returnLabelElem, 'returnLabel');
            setLabelText(deliveryResolutionLabel, 'deliveryResolution');
            setLabelText(recordingResolutionLabel, 'recordingResolution');
            setLabelText(sensorModeLabel, 'sensorMode');
            setLabelText(aspectRatioLabel, 'aspectRatio');
            setLabelText(codecLabel, 'codec');
            setLabelText(baseFrameRateLabel, 'baseFrameRate');
            setLabelText(recordingFrameRateLabel, 'recordingFrameRate');
            if (recordingFrameRateHintElem) {
              rangeTemplate = projectFormTexts.recordingFrameRateRangeHint || fallbackProjectForm.recordingFrameRateRangeHint || '';
              defaultHint = projectFormTexts.recordingFrameRateDefaultHint || fallbackProjectForm.recordingFrameRateDefaultHint || '';
              if (rangeTemplate) {
                recordingFrameRateHintElem.setAttribute('data-range-template', rangeTemplate);
              } else {
                recordingFrameRateHintElem.removeAttribute('data-range-template');
              }
              if (defaultHint) {
                recordingFrameRateHintElem.setAttribute('data-default-message', defaultHint);
                recordingFrameRateHintElem.textContent = defaultHint;
                recordingFrameRateHintElem.hidden = false;
              } else {
                recordingFrameRateHintElem.removeAttribute('data-default-message');
                recordingFrameRateHintElem.textContent = '';
                recordingFrameRateHintElem.hidden = true;
              }
            }
            if (slowMotionLegendElem) {
              legendText = projectFormTexts.slowMotionHeading || fallbackProjectForm.slowMotionHeading;
              if (legendText) slowMotionLegendElem.textContent = legendText;
            }
            setLabelText(slowMotionRecordingResolutionLabel, 'slowMotionRecordingResolution');
            setLabelText(slowMotionSensorModeLabel, 'slowMotionSensorMode');
            setLabelText(slowMotionAspectRatioLabel, 'slowMotionAspectRatio');
            setLabelText(slowMotionBaseFrameRateLabel, 'slowMotionBaseFrameRate');
            setLabelText(slowMotionRecordingFrameRateLabel, 'slowMotionRecordingFrameRate');
            if (slowMotionRecordingFrameRateHintElem) {
              slowRangeTemplate = projectFormTexts.slowMotionRecordingFrameRateRangeHint || fallbackProjectForm.slowMotionRecordingFrameRateRangeHint || '';
              slowDefaultHint = projectFormTexts.slowMotionRecordingFrameRateDefaultHint || fallbackProjectForm.slowMotionRecordingFrameRateDefaultHint || '';
              if (slowRangeTemplate) {
                slowMotionRecordingFrameRateHintElem.setAttribute('data-range-template', slowRangeTemplate);
              } else {
                slowMotionRecordingFrameRateHintElem.removeAttribute('data-range-template');
              }
              if (slowDefaultHint) {
                slowMotionRecordingFrameRateHintElem.setAttribute('data-default-message', slowDefaultHint);
                slowMotionRecordingFrameRateHintElem.textContent = slowDefaultHint;
                slowMotionRecordingFrameRateHintElem.hidden = false;
              } else {
                slowMotionRecordingFrameRateHintElem.removeAttribute('data-default-message');
                slowMotionRecordingFrameRateHintElem.textContent = '';
                slowMotionRecordingFrameRateHintElem.hidden = true;
              }
            }
            setLabelText(lensesHeadingElem, 'lensesHeading');
            setLabelText(lensManufacturerLabel, 'lensManufacturerStep');
            setLabelText(lensSeriesLabel, 'lensSeriesStep');
            setLabelText(lensesLabelElem, 'lensesLabel');
            setLabelText(lensSelectionsHeadingElem, 'lensSelectionsLabel');
            setLabelText(lensSelectionsHintElem, 'lensSelectionsHint');
            setOptionText(lensManufacturerPlaceholderOption, 'lensManufacturerPlaceholder');
            setOptionText(lensSeriesPlaceholderOption, 'lensSeriesPlaceholder');
            if (lensSeriesEmptyElem) {
              seriesEmptyText = projectFormTexts.lensSeriesEmpty || fallbackProjectForm.lensSeriesEmpty;
              if (seriesEmptyText) lensSeriesEmptyElem.textContent = seriesEmptyText;
            }
            if (lensOptionsEmptyElem) {
              optionsEmptyText = projectFormTexts.lensOptionsEmpty || fallbackProjectForm.lensOptionsEmpty;
              if (optionsEmptyText) lensOptionsEmptyElem.textContent = optionsEmptyText;
            }
            if (lensSelectionChipsElem) {
              removeTemplate = projectFormTexts.lensRemoveLabel || fallbackProjectForm.lensRemoveLabel;
              mountLabelText = projectFormTexts.lensMountLabel || fallbackProjectForm.lensMountLabel;
              if (removeTemplate) lensSelectionChipsElem.setAttribute('data-remove-template', removeTemplate);
              if (mountLabelText) lensSelectionChipsElem.setAttribute('data-mount-label', mountLabelText);
            }
            if (lensSelectionManager && typeof lensSelectionManager.refreshCatalog === 'function') {
              try {
                lensSelectionManager.refreshCatalog({
                  preserveSelections: true,
                  skipEvent: true,
                  skipDirty: true
                });
              } catch (catalogRefreshError) {
                void catalogRefreshError;
              }
            }
            setLabelText(riggingHeadingElem, 'riggingHeading');
            setLabelText(requiredScenariosLabel, 'requiredScenarios');
            updateRequiredScenariosTranslations(lang);
            setLabelText(cameraHandleLabel, 'cameraHandle');
            setLabelText(viewfinderExtensionLabel, 'viewfinderExtension');
            setLabelText(matteboxFilterHeadingElem, 'matteboxFilterHeading');
            setLabelText(matteboxLabel, 'mattebox');
            setLabelText(filterLabel, 'filter');
            setLabelText(storageHeading, 'storageHeading');
            setLabelText(storageNeedsLabel, 'storageNeedsLabel');
            updateStorageRequirementTranslations(projectFormTexts, fallbackProjectForm);
            updateStorageRequirementTypeOptions();
            setLabelText(monitoringHeadingElem, 'monitoringHeading');
            setLabelText(monitoringConfigurationLabel, 'monitoringConfiguration');
            setLabelText(viewfinderSettingsLabel, 'viewfinderSettings');
            setLabelText(frameGuidesLabel, 'frameGuides');
            setLabelText(aspectMaskOpacityLabel, 'aspectMaskOpacity');
            setLabelText(videoDistributionLabel, 'videoDistribution');
            setLabelText(monitorUserButtonsLabel, 'monitorUserButtons');
            setLabelText(cameraUserButtonsLabel, 'cameraUserButtons');
            setLabelText(viewfinderUserButtonsLabel, 'viewfinderUserButtons');
            setLabelText(tripodPreferencesHeading, 'tripodPreferencesHeading');
            setLabelText(tripodHeadBrandLabel, 'tripodHeadBrand');
            setLabelText(tripodBowlLabel, 'tripodBowl');
            setLabelText(tripodTypesLabel, 'tripodTypes');
            setLabelText(tripodSpreaderLabel, 'tripodSpreader');
            if (viewfinderExtensionSelect && viewfinderExtensionSelect.options.length >= 2) {
              _noneLabel2 = projectFormTexts.viewfinderExtensionNone || fallbackProjectForm.viewfinderExtensionNone;
              yesLabel = projectFormTexts.viewfinderExtensionYes || fallbackProjectForm.viewfinderExtensionYes;
              if (_noneLabel2) viewfinderExtensionSelect.options[0].textContent = _noneLabel2;
              if (yesLabel) viewfinderExtensionSelect.options[1].textContent = yesLabel;
            }
            projectCancelButton = typeof document !== 'undefined' ? document.getElementById('projectCancel') : null;
            cancelText = projectFormTexts.cancel || fallbackProjectForm.cancel || (projectCancelButton ? projectCancelButton.textContent : projectDialogCloseBtn === null || projectDialogCloseBtn === void 0 ? void 0 : projectDialogCloseBtn.getAttribute('aria-label')) || 'Cancel';
            if (projectCancelButton) {
              setButtonLabelWithIconBinding(projectCancelButton, cancelText, ICON_GLYPHS.circleX);
            }
            if (projectDialogCloseBtn) {
              projectDialogCloseBtn.innerHTML = iconMarkup(ICON_GLYPHS.circleX, 'btn-icon');
              projectDialogCloseBtn.setAttribute('aria-label', cancelText);
              projectDialogCloseBtn.setAttribute('title', cancelText);
              projectDialogCloseBtn.setAttribute('data-help', cancelText);
            }
            if (projectSubmitBtn) {
              submitText = projectFormTexts.submit || fallbackProjectForm.submit;
              if (submitText) {
                setButtonLabelWithIconBinding(projectSubmitBtn, submitText, ICON_GLYPHS.check);
                projectSubmitBtn.setAttribute('aria-label', submitText);
              }
            }
            crewPlaceholders = {
              name: projectFormTexts.crewNamePlaceholder || fallbackProjectForm.crewNamePlaceholder,
              phone: projectFormTexts.crewPhonePlaceholder || fallbackProjectForm.crewPhonePlaceholder,
              email: projectFormTexts.crewEmailPlaceholder || fallbackProjectForm.crewEmailPlaceholder,
              website: projectFormTexts.crewWebsitePlaceholder || fallbackProjectForm.crewWebsitePlaceholder
            };
            crewRoleLabels = texts[lang].crewRoles || texts.en && texts.en.crewRoles || {};
            fallbackContacts = ((_texts$en291 = texts.en) === null || _texts$en291 === void 0 ? void 0 : _texts$en291.contacts) || {};
            contactsTexts = ((_texts$lang5 = texts[lang]) === null || _texts$lang5 === void 0 ? void 0 : _texts$lang5.contacts) || fallbackContacts;
            if (contactsDialogHeading && contactsTexts.heading) {
              contactsDialogHeading.textContent = contactsTexts.heading;
            }
            if (contactsDialogDescription && contactsTexts.description) {
              contactsDialogDescription.textContent = contactsTexts.description;
            }
            if (contactsAddButtonLabel && contactsTexts.addContactButton) {
              contactsAddButtonLabel.textContent = contactsTexts.addContactButton;
            }
            if (contactsAddButton && contactsTexts.addContactButton) {
              contactsAddButton.setAttribute('aria-label', contactsTexts.addContactButton);
              contactsAddButton.setAttribute('data-help', contactsTexts.addContactButton);
            }
            if (contactsImportButtonLabel && contactsTexts.importButton) {
              contactsImportButtonLabel.textContent = contactsTexts.importButton;
            }
            if (contactsImportButton && contactsTexts.importButton) {
              contactsImportButton.setAttribute('aria-label', contactsTexts.importButton);
              contactsImportButton.setAttribute('data-help', contactsTexts.importButton);
            }
            if (contactsImportHint && contactsTexts.importHint) {
              contactsImportHint.textContent = contactsTexts.importHint;
            }
            if (contactsEmptyState && contactsTexts.emptyState) {
              contactsEmptyState.textContent = contactsTexts.emptyState;
            }
            if (userProfileHeading && contactsTexts.userProfileHeading) {
              userProfileHeading.textContent = contactsTexts.userProfileHeading;
            }
            if (userProfileDescription && contactsTexts.userProfileDescription) {
              userProfileDescription.textContent = contactsTexts.userProfileDescription;
            }
            if (userProfileNameLabel && contactsTexts.userProfileNameLabel) {
              userProfileNameLabel.textContent = contactsTexts.userProfileNameLabel;
            }
            if (userProfileNameInput && contactsTexts.userProfileNamePlaceholder) {
              userProfileNameInput.setAttribute('placeholder', contactsTexts.userProfileNamePlaceholder);
            }
            if (userProfileRoleLabel && contactsTexts.userProfileRoleLabel) {
              userProfileRoleLabel.textContent = contactsTexts.userProfileRoleLabel;
            }
            if (userProfileRoleInput) {
              profileSnapshot = profileController !== null && profileController !== void 0 && profileController.getUserProfileSnapshot ? profileController.getUserProfileSnapshot() : {
                role: ''
              };
              populateUserProfileRoleSelect({
                selected: profileSnapshot.role || ''
              });
            }
            if (userProfilePhoneLabel && contactsTexts.userProfilePhoneLabel) {
              userProfilePhoneLabel.textContent = contactsTexts.userProfilePhoneLabel;
            }
            if (userProfilePhoneInput && contactsTexts.userProfilePhonePlaceholder) {
              userProfilePhoneInput.setAttribute('placeholder', contactsTexts.userProfilePhonePlaceholder);
            }
            if (userProfileEmailLabel && contactsTexts.userProfileEmailLabel) {
              userProfileEmailLabel.textContent = contactsTexts.userProfileEmailLabel;
            }
            if (userProfileEmailInput && contactsTexts.userProfileEmailPlaceholder) {
              userProfileEmailInput.setAttribute('placeholder', contactsTexts.userProfileEmailPlaceholder);
            }
            if (userProfileHint && contactsTexts.userProfileHint) {
              userProfileHint.textContent = contactsTexts.userProfileHint;
            }
            if (userProfileAvatarButtonLabel && contactsTexts.userProfileAvatarButton) {
              userProfileAvatarButtonLabel.textContent = contactsTexts.userProfileAvatarButton;
            }
            if (userProfileAvatarButton && contactsTexts.userProfileAvatarButton) {
              userProfileAvatarButton.setAttribute('aria-label', contactsTexts.userProfileAvatarButton);
              userProfileAvatarButton.removeAttribute('data-help');
              userProfileAvatarButton.removeAttribute('title');
            }
            if (userProfileAvatarClearButton && contactsTexts.userProfileAvatarRemove) {
              userProfileAvatarClearButton.textContent = contactsTexts.userProfileAvatarRemove;
              userProfileAvatarClearButton.setAttribute('aria-label', contactsTexts.userProfileAvatarRemove);
            }
            if (avatarOptionsTitleElem && contactsTexts.avatarOptionsTitle) {
              avatarOptionsTitleElem.textContent = contactsTexts.avatarOptionsTitle;
            }
            if (avatarOptionsDescriptionElem && contactsTexts.avatarOptionsDescription) {
              avatarOptionsDescriptionElem.textContent = contactsTexts.avatarOptionsDescription;
            }
            if (avatarOptionsCloseLabel && contactsTexts.avatarOptionsClose) {
              avatarOptionsCloseLabel.textContent = contactsTexts.avatarOptionsClose;
            }
            if (avatarOptionsCloseButton && contactsTexts.avatarOptionsClose) {
              avatarOptionsCloseButton.setAttribute('aria-label', contactsTexts.avatarOptionsClose);
              avatarOptionsCloseButton.setAttribute('title', contactsTexts.avatarOptionsClose);
              avatarOptionsCloseButton.setAttribute('data-help', contactsTexts.avatarOptionsClose);
            }
            if (avatarOptionsDeleteButton && contactsTexts.avatarDelete) {
              setButtonLabelWithIconBinding(avatarOptionsDeleteButton, contactsTexts.avatarDelete, ICON_GLYPHS.trash);
              avatarOptionsDeleteButton.setAttribute('aria-label', contactsTexts.avatarDelete);
              avatarOptionsDeleteButton.setAttribute('title', contactsTexts.avatarDelete);
              avatarOptionsDeleteButton.setAttribute('data-help', contactsTexts.avatarDelete);
            }
            if (avatarOptionsEditButton && contactsTexts.avatarEditAction) {
              setButtonLabelWithIconBinding(avatarOptionsEditButton, contactsTexts.avatarEditAction, ICON_GLYPHS.sliders);
              avatarOptionsEditButton.setAttribute('aria-label', contactsTexts.avatarEditAction);
              avatarOptionsEditButton.setAttribute('title', contactsTexts.avatarEditAction);
              avatarOptionsEditButton.setAttribute('data-help', contactsTexts.avatarEditAction);
            }
            if (avatarOptionsChangeButton && contactsTexts.avatarChange) {
              setButtonLabelWithIconBinding(avatarOptionsChangeButton, contactsTexts.avatarChange, ICON_GLYPHS.camera);
              avatarOptionsChangeButton.setAttribute('aria-label', contactsTexts.avatarChange);
              avatarOptionsChangeButton.setAttribute('title', contactsTexts.avatarChange);
              avatarOptionsChangeButton.setAttribute('data-help', contactsTexts.avatarChange);
            }
            if (avatarEditZoomLabelElem && contactsTexts.avatarEditZoomLabel) {
              avatarEditZoomLabelElem.textContent = contactsTexts.avatarEditZoomLabel;
            }
            if (contactsCloseButton && contactsTexts.close) {
              contactsCloseButton.textContent = contactsTexts.close;
            }
            renderContactsList();
            document.querySelectorAll('#crewContainer .person-row').forEach(function (row) {
              var roleSelect = row.querySelector('select');
              if (roleSelect) {
                var currentValue = roleSelect.value;
                Array.from(roleSelect.options).forEach(function (opt) {
                  var roleKey = opt.value;
                  opt.textContent = crewRoleLabels[roleKey] || roleKey;
                });
                roleSelect.value = currentValue;
              }
              var nameInput = row.querySelector('.person-name');
              if (nameInput && crewPlaceholders.name) nameInput.placeholder = crewPlaceholders.name;
              var phoneInput = row.querySelector('.person-phone');
              if (phoneInput && crewPlaceholders.phone) phoneInput.placeholder = crewPlaceholders.phone;
              var emailInput = row.querySelector('.person-email');
              if (emailInput && crewPlaceholders.email) emailInput.placeholder = crewPlaceholders.email;
              var websiteInput = row.querySelector('.person-website');
              if (websiteInput && crewPlaceholders.website) websiteInput.placeholder = crewPlaceholders.website;
              var contactSelect = row.querySelector('.person-contact-select');
              if (contactSelect) {
                setContactSelectOptions(contactSelect, contactSelect.value);
              }
              var saveButton = row.querySelector('.person-save-contact');
              if (saveButton) {
                setButtonLabelWithIconBinding(saveButton, getContactsText('saveContact', 'Save to contacts'), ICON_GLYPHS.save);
              }
              var manageButton = row.querySelector('.person-manage-contacts');
              if (manageButton) {
                setButtonLabelWithIconBinding(manageButton, getContactsText('openManager', 'Open contacts'), ICON_GLYPHS.gears);
              }
              updateRowLinkedBadge(row);
            });
            stripTrailingPunctuation = function stripTrailingPunctuation(value) {
              return typeof value === 'string' ? value.replace(/[\s\u00a0]*[:：]\s*$/, '') : value;
            };
            addEntryLabel = projectFormTexts.addEntry || fallbackProjectForm.addEntry || 'Add';
            if (addPersonBtn) {
              crewLabel = stripTrailingPunctuation(projectFormTexts.crewHeading || fallbackProjectForm.crewHeading || 'Crew');
              _label68 = "".concat(addEntryLabel, " ").concat(crewLabel).trim();
              setButtonLabelWithIconBinding(addPersonBtn, _label68, ICON_GLYPHS.add);
              addPersonBtn.setAttribute('aria-label', _label68);
              addPersonBtn.setAttribute('data-help', _label68);
            }
            if (addPrepBtn) {
              prepLabel = stripTrailingPunctuation(projectFormTexts.prepLabel || fallbackProjectForm.prepLabel || 'Prep');
              _label69 = "".concat(addEntryLabel, " ").concat(prepLabel).trim();
              setButtonLabelWithIconBinding(addPrepBtn, _label69, ICON_GLYPHS.add);
              addPrepBtn.setAttribute('aria-label', _label69);
              addPrepBtn.setAttribute('data-help', _label69);
            }
            if (addShootBtn) {
              shootLabel = stripTrailingPunctuation(projectFormTexts.shootLabel || fallbackProjectForm.shootLabel || 'Shoot');
              _label70 = "".concat(addEntryLabel, " ").concat(shootLabel).trim();
              setButtonLabelWithIconBinding(addShootBtn, _label70, ICON_GLYPHS.add);
              addShootBtn.setAttribute('aria-label', _label70);
              addShootBtn.setAttribute('data-help', _label70);
            }
            if (addReturnBtn) {
              returnLabel = stripTrailingPunctuation(projectFormTexts.returnLabel || fallbackProjectForm.returnLabel || 'Return Day');
              _label71 = "".concat(addEntryLabel, " ").concat(returnLabel).trim();
              setButtonLabelWithIconBinding(addReturnBtn, _label71, ICON_GLYPHS.add);
              addReturnBtn.setAttribute('aria-label', _label71);
              addReturnBtn.setAttribute('data-help', _label71);
            }
          }
          if (iosPwaHelpTitle) iosPwaHelpTitle.textContent = texts[lang].iosPwaHelpTitle;
          if (iosPwaHelpIntro) iosPwaHelpIntro.textContent = texts[lang].iosPwaHelpIntro;
          if (iosPwaHelpStep1) iosPwaHelpStep1.textContent = texts[lang].iosPwaHelpStep1;
          if (iosPwaHelpStep2) iosPwaHelpStep2.textContent = texts[lang].iosPwaHelpStep2;
          if (iosPwaHelpStep3) iosPwaHelpStep3.textContent = texts[lang].iosPwaHelpStep3;
          if (iosPwaHelpStep4) iosPwaHelpStep4.textContent = texts[lang].iosPwaHelpStep4;
          if (iosPwaHelpNote) iosPwaHelpNote.textContent = texts[lang].iosPwaHelpNote;
          if (iosPwaHelpClose) {
            closeText = texts[lang].iosPwaHelpClose;
            setButtonLabelWithIconBinding(iosPwaHelpClose, closeText, ICON_GLYPHS.check);
            iosPwaHelpClose.setAttribute('aria-label', closeText);
          }
          document.querySelectorAll('.favorite-toggle').forEach(function (btn) {
            btn.setAttribute('aria-label', texts[lang].favoriteToggleLabel);
            btn.setAttribute('title', texts[lang].favoriteToggleLabel);
            btn.setAttribute('data-help', texts[lang].favoriteToggleHelp || texts[lang].favoriteToggleLabel);
          });
          ensureGearListActions();
          updateDiagramLegend();
          updateStorageSummary();
          callCoreFunctionIfAvailable('populateFeatureSearch', [], {
            defer: true
          });
        case 6:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 3, 4, 5]]);
  }));
  return _setLanguage.apply(this, arguments);
}
var cameraSelect = document.getElementById("cameraSelect");
if (typeof window !== 'undefined') window.cameraSelect = cameraSelect;
var monitorSelect = document.getElementById("monitorSelect");
if (typeof window !== 'undefined') window.monitorSelect = monitorSelect;
var videoSelect = document.getElementById("videoSelect");
if (typeof window !== 'undefined') window.videoSelect = videoSelect;
var videoDistributionSelect = document.getElementById("videoDistribution");
if (typeof window !== 'undefined') window.videoDistributionSelect = videoDistributionSelect;
var cageSelect = document.getElementById("cageSelect");
if (typeof window !== 'undefined') window.cageSelect = cageSelect;
var motorSelects = [document.getElementById("motor1Select"), document.getElementById("motor2Select"), document.getElementById("motor3Select"), document.getElementById("motor4Select")];
if (typeof window !== 'undefined') window.motorSelects = motorSelects;
var controllerSelects = [document.getElementById("controller1Select"), document.getElementById("controller2Select"), document.getElementById("controller3Select"), document.getElementById("controller4Select")];
if (typeof window !== 'undefined') window.controllerSelects = controllerSelects;
var distanceSelect = document.getElementById("distanceSelect");
if (typeof window !== 'undefined') window.distanceSelect = distanceSelect;
var batterySelect = document.getElementById("batterySelect");
if (typeof window !== 'undefined') window.batterySelect = batterySelect;
var hotswapSelect = document.getElementById("batteryHotswapSelect");
if (typeof window !== 'undefined') window.hotswapSelect = hotswapSelect;
var lensSelect = document.getElementById("lenses");
if (typeof window !== 'undefined') window.lensSelect = lensSelect;
var requiredScenariosSelect = document.getElementById("requiredScenarios");
var requiredScenariosSummary = document.getElementById("requiredScenariosSummary");
var remoteHeadOption = requiredScenariosSelect ? requiredScenariosSelect.querySelector('option[value="Remote Head"]') : null;
var tripodPreferencesSection = document.getElementById("tripodPreferencesSection");
var tripodPreferencesRow = document.getElementById("tripodPreferencesRow");
var tripodPreferencesHeading = document.getElementById("tripodPreferencesHeading");
var tripodHeadBrandSelect = document.getElementById("tripodHeadBrand");
var tripodBowlSelect = document.getElementById("tripodBowl");
var tripodTypesSelect = document.getElementById("tripodTypes");
var tripodSpreaderSelect = document.getElementById("tripodSpreader");
var monitoringConfigurationSelect = document.getElementById("monitoringConfiguration");
var viewfinderSettingsRow = document.getElementById("viewfinderSettingsRow");
var viewfinderExtensionRow = document.getElementById("viewfinderExtensionRow");
var projectDialogHeading = document.getElementById("projectDialogHeading");
var projectDialogCloseBtn = document.getElementById("projectDialogClose");
var projectNameLabel = document.getElementById("projectNameLabel");
var productionCompanyLabel = document.getElementById("productionCompanyLabel");
var productionCompanyAddressLabel = document.getElementById("productionCompanyAddressLabel");
var productionCompanyStreetLabel = document.getElementById("productionCompanyStreetLabel");
var productionCompanyStreet2Label = document.getElementById("productionCompanyStreet2Label");
var productionCompanyCityLabel = document.getElementById("productionCompanyCityLabel");
var productionCompanyRegionLabel = document.getElementById("productionCompanyRegionLabel");
var productionCompanyPostalCodeLabel = document.getElementById("productionCompanyPostalCodeLabel");
var productionCompanyCountryLabel = document.getElementById("productionCompanyCountryLabel");
var productionCompanyStreetInput = document.getElementById("productionCompanyStreet");
var productionCompanyStreet2Input = document.getElementById("productionCompanyStreet2");
var productionCompanyCityInput = document.getElementById("productionCompanyCity");
var productionCompanyRegionInput = document.getElementById("productionCompanyRegion");
var productionCompanyPostalCodeInput = document.getElementById("productionCompanyPostalCode");
var productionCompanyCountryInput = document.getElementById("productionCompanyCountry");
var rentalHouseLabel = document.getElementById("rentalHouseLabel");
var crewHeadingElem = document.getElementById("crewHeading");
var crewLabelElem = document.getElementById("crewLabel");
var prepLabelElem = document.getElementById("prepLabel");
var shootLabelElem = document.getElementById("shootLabel");
var returnLabelElem = document.getElementById("returnLabel");
var deliveryResolutionLabel = document.getElementById("deliveryResolutionLabel");
var deliveryResolutionSelect = document.getElementById("deliveryResolution");
var recordingResolutionLabel = document.getElementById("recordingResolutionLabel");
var recordingFrameRateLabel = document.getElementById("recordingFrameRateLabel");
var recordingFrameRateHintElem = document.getElementById("recordingFrameRateHint");
var slowMotionLegendElem = document.getElementById("slowMotionFrameRateLegend");
var slowMotionRecordingResolutionLabel = document.getElementById("slowMotionRecordingResolutionLabel");
var slowMotionSensorModeLabel = document.getElementById("slowMotionSensorModeLabel");
var slowMotionAspectRatioLabel = document.getElementById("slowMotionAspectRatioLabel");
var slowMotionBaseFrameRateLabel = document.getElementById("slowMotionBaseFrameRateLabel");
var slowMotionRecordingFrameRateLabel = document.getElementById("slowMotionRecordingFrameRateLabel");
var slowMotionRecordingFrameRateHintElem = document.getElementById("slowMotionRecordingFrameRateHint");
var sensorModeLabel = document.getElementById("sensorModeLabel");
var aspectRatioLabel = document.getElementById("aspectRatioLabel");
var codecLabel = document.getElementById("codecLabel");
var baseFrameRateLabel = document.getElementById("baseFrameRateLabel");
var lensManufacturerLabel = document.getElementById("lensManufacturerLabel");
var lensManufacturerPlaceholderOption = document.getElementById("lensManufacturerPlaceholder");
var lensSeriesLabel = document.getElementById("lensSeriesLabel");
var lensSeriesPlaceholderOption = document.getElementById("lensSeriesPlaceholder");
var lensSeriesEmptyElem = document.getElementById("lensSeriesEmpty");
var lensOptionsEmptyElem = document.getElementById("lensOptionsEmpty");
var lensesHeadingElem = document.getElementById("lensesHeading");
var lensesLabelElem = document.getElementById("lensesLabel");
var lensSelectionsHeadingElem = document.getElementById("lensSelectionsLabel");
var lensSelectionsHintElem = document.getElementById("lensSelectionsHint");
var lensSelectionChipsElem = document.getElementById("lensSelectionChips");
var riggingHeadingElem = document.getElementById("riggingHeading");
var requiredScenariosLabel = document.getElementById("requiredScenariosLabel");
var cameraHandleLabel = document.getElementById("cameraHandleLabel");
var viewfinderExtensionLabel = document.getElementById("viewfinderExtensionLabel");
var viewfinderExtensionSelect = document.getElementById("viewfinderExtension");
var matteboxFilterHeadingElem = document.getElementById("matteboxFilterHeading");
var matteboxLabel = document.getElementById("matteboxLabel");
var filterLabel = document.getElementById("filterLabel");
var storageHeading = document.getElementById("storageHeading");
var storageNeedsLabel = document.getElementById("storageNeedsLabel");
var monitoringHeadingElem = document.getElementById("monitoringHeading");
var monitoringConfigurationLabel = document.getElementById("monitoringConfigurationLabel");
var viewfinderSettingsLabel = document.getElementById("viewfinderSettingsLabel");
var frameGuidesLabel = document.getElementById("frameGuidesLabel");
var aspectMaskOpacityLabel = document.getElementById("aspectMaskOpacityLabel");
var videoDistributionLabel = document.getElementById("videoDistributionLabel");
var monitorUserButtonsLabel = document.getElementById("monitorUserButtonsLabel");
var cameraUserButtonsLabel = document.getElementById("cameraUserButtonsLabel");
var viewfinderUserButtonsLabel = document.getElementById("viewfinderUserButtonsLabel");
var tripodHeadBrandLabel = document.getElementById("tripodHeadBrandLabel");
var tripodBowlLabel = document.getElementById("tripodBowlLabel");
var tripodTypesLabel = document.getElementById("tripodTypesLabel");
var tripodSpreaderLabel = document.getElementById("tripodSpreaderLabel");
var projectSubmitBtn = document.getElementById("projectSubmit");
var crewContainer = document.getElementById("crewContainer");
var addPersonBtn = document.getElementById("addPersonBtn");
var prepContainer = document.getElementById("prepContainer");
var addPrepBtn = document.getElementById("addPrepBtn");
var shootContainer = document.getElementById("shootContainer");
var addShootBtn = document.getElementById("addShootBtn");
var returnContainer = document.getElementById("returnContainer");
var addReturnBtn = document.getElementById("addReturnBtn");
var storageNeedsContainer = document.getElementById("storageNeedsContainer");
var contactsDialog = null;
var contactsForm = null;
var contactsDialogHeading = null;
var contactsDialogDescription = null;
var contactsAddButton = null;
var contactsAddButtonLabel = null;
var contactsImportButton = null;
var contactsImportButtonLabel = null;
var contactsImportInput = null;
var contactsImportHint = null;
var contactsList = null;
var contactsEmptyState = null;
var contactsCloseButton = null;
var contactsAnnouncement = null;
var openContactsBtn = null;
var userProfileSection = null;
var userProfileHeading = null;
var userProfileDescription = null;
var userProfileNameInput = null;
var userProfileNameLabel = null;
var userProfileRoleInput = null;
var userProfileRoleLabel = null;
var userProfilePhoneInput = null;
var userProfilePhoneLabel = null;
var userProfileEmailInput = null;
var userProfileEmailLabel = null;
var userProfileHint = null;
var userProfileAvatarContainer = null;
var userProfileAvatarButton = null;
var userProfileAvatarButtonLabel = null;
var userProfileAvatarInput = null;
var userProfileAvatarClearButton = null;
var avatarOptionsDialog = null;
var avatarOptionsForm = null;
var avatarOptionsTitleElem = null;
var avatarOptionsDescriptionElem = null;
var avatarOptionsCloseButton = null;
var avatarOptionsCloseLabel = null;
var avatarOptionsPreview = null;
var avatarOptionsDeleteButton = null;
var avatarOptionsEditButton = null;
var avatarOptionsChangeButton = null;
var avatarEditViewport = null;
var avatarEditImage = null;
var avatarPlaceholder = null;
var avatarControls = null;
var avatarEditZoomInput = null;
var avatarEditZoomLabelElem = null;
var avatarOptionsContext = null;
var avatarEditState = null;
var avatarEditLastViewportSize = 0;
var avatarUploadInput = null;
var avatarSaveButton = null;
var avatarCancelButton = null;
function resolveContactsDomRefs() {
  if (typeof document === 'undefined') return;
  contactsDialog = contactsDialog || document.getElementById('contactsDialog');
  contactsForm = contactsForm || document.getElementById('contactsForm');
  contactsDialogHeading = contactsDialogHeading || document.getElementById('contactsDialogHeading');
  contactsDialogDescription = contactsDialogDescription || document.getElementById('contactsDialogDescription');
  contactsAddButton = contactsAddButton || document.getElementById('contactsAddButton');
  contactsAddButtonLabel = contactsAddButtonLabel || document.getElementById('contactsAddButtonLabel');
  contactsImportButton = contactsImportButton || document.getElementById('contactsImportButton');
  contactsImportButtonLabel = contactsImportButtonLabel || document.getElementById('contactsImportButtonLabel');
  contactsImportInput = contactsImportInput || document.getElementById('contactsImportInput');
  contactsImportHint = contactsImportHint || document.getElementById('contactsImportHint');
  contactsList = contactsList || document.getElementById('contactsList');
  contactsEmptyState = contactsEmptyState || document.getElementById('contactsEmptyState');
  contactsCloseButton = contactsCloseButton || document.getElementById('contactsCloseButton');
  contactsAnnouncement = contactsAnnouncement || document.getElementById('contactsAnnouncement');
  openContactsBtn = openContactsBtn || document.getElementById('openContactsBtn');
  userProfileSection = userProfileSection || document.getElementById('contactsUserProfile');
  userProfileHeading = userProfileHeading || document.getElementById('contactsUserProfileHeading');
  userProfileDescription = userProfileDescription || document.getElementById('contactsUserProfileDescription');
  userProfileNameInput = userProfileNameInput || document.getElementById('userProfileName');
  userProfileNameLabel = userProfileNameLabel || document.getElementById('userProfileNameLabel');
  userProfileRoleInput = userProfileRoleInput || document.getElementById('userProfileRole');
  userProfileRoleLabel = userProfileRoleLabel || document.getElementById('userProfileRoleLabel');
  userProfilePhoneInput = userProfilePhoneInput || document.getElementById('userProfilePhone');
  userProfilePhoneLabel = userProfilePhoneLabel || document.getElementById('userProfilePhoneLabel');
  userProfileEmailInput = userProfileEmailInput || document.getElementById('userProfileEmail');
  userProfileEmailLabel = userProfileEmailLabel || document.getElementById('userProfileEmailLabel');
  userProfileHint = userProfileHint || document.getElementById('userProfileHint');
  userProfileAvatarContainer = userProfileAvatarContainer || document.getElementById('userProfileAvatar');
  userProfileAvatarButton = userProfileAvatarButton || document.getElementById('userProfileAvatarButton');
  userProfileAvatarButtonLabel = userProfileAvatarButtonLabel || document.getElementById('userProfileAvatarButtonLabel');
  userProfileAvatarInput = userProfileAvatarInput || document.getElementById('userProfileAvatarInput');
  userProfileAvatarClearButton = userProfileAvatarClearButton || document.getElementById('userProfileAvatarClear');
  avatarOptionsDialog = avatarOptionsDialog || document.getElementById('avatarOptionsDialog');
  avatarOptionsForm = avatarOptionsForm || document.getElementById('avatarOptionsForm');
  avatarOptionsTitleElem = avatarOptionsTitleElem || document.getElementById('avatarOptionsTitle');
  avatarOptionsDescriptionElem = avatarOptionsDescriptionElem || document.getElementById('avatarOptionsDescription');
  avatarOptionsCloseButton = avatarOptionsCloseButton || document.getElementById('avatarOptionsClose');
  avatarOptionsCloseLabel = avatarOptionsCloseLabel || document.getElementById('avatarOptionsCloseLabel');
  avatarEditViewport = avatarEditViewport || document.getElementById('avatarEditViewport');
  avatarEditImage = avatarEditImage || document.getElementById('avatarEditImage');
  avatarPlaceholder = avatarPlaceholder || document.getElementById('avatarPlaceholder');
  avatarControls = avatarControls || document.getElementById('avatarControls');
  avatarEditZoomInput = avatarEditZoomInput || document.getElementById('avatarEditZoom');
  avatarEditZoomLabelElem = avatarEditZoomLabelElem || document.getElementById('avatarEditZoomLabel');
  avatarUploadInput = avatarUploadInput || document.getElementById('avatarUploadInput');
  avatarOptionsDeleteButton = avatarOptionsDeleteButton || document.getElementById('avatarDeleteButton');
  avatarSaveButton = avatarSaveButton || document.getElementById('avatarSaveButton');
  avatarCancelButton = avatarCancelButton || document.getElementById('avatarCancelButton');
}
var monitoringConfigurationUserChanged = false;
var crewRoles = ['DoP', 'Steadicam Operator', 'Camera Operator', 'B-Camera Operator', 'Drone Operator', 'DIT', '1st AC', '2nd AC', 'Video Operator', 'Key Grip', 'Dolly Grip', 'Best Boy Grip', 'Rigging Grip', 'Grip', 'Key Gaffer', 'Gaffer', 'Rigging Gaffer', 'Best Boy Electric', 'Electrician', 'Director', 'Assistant Director', 'Producer', 'Production Manager', 'Production Assistant'];
function getCrewRoleLabels() {
  var _texts, _texts2;
  var lang = typeof currentLang === 'string' ? currentLang : 'en';
  return ((_texts = texts) === null || _texts === void 0 || (_texts = _texts[lang]) === null || _texts === void 0 ? void 0 : _texts.crewRoles) || ((_texts2 = texts) === null || _texts2 === void 0 || (_texts2 = _texts2.en) === null || _texts2 === void 0 ? void 0 : _texts2.crewRoles) || {};
}
function populateUserProfileRoleSelect() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  resolveContactsDomRefs();
  if (!userProfileRoleInput) return;
  var doc = userProfileRoleInput.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return;
  var roleLabels = getCrewRoleLabels();
  var placeholderDefault = getContactsText('rolePlaceholder', 'Select role');
  var placeholderText = getContactsText('userProfileRolePlaceholder', placeholderDefault) || placeholderDefault;
  var selectedValue = options && typeof options.selected === 'string' ? options.selected : profileController !== null && profileController !== void 0 && profileController.getUserProfileSnapshot ? profileController.getUserProfileSnapshot().role : '';
  var previousScrollTop = userProfileRoleInput.scrollTop;
  userProfileRoleInput.textContent = '';
  var placeholderOption = doc.createElement('option');
  placeholderOption.value = '';
  placeholderOption.textContent = placeholderText;
  userProfileRoleInput.appendChild(placeholderOption);
  crewRoles.forEach(function (roleKey) {
    var opt = doc.createElement('option');
    opt.value = roleKey;
    opt.textContent = roleLabels[roleKey] || roleKey;
    userProfileRoleInput.appendChild(opt);
  });
  var normalizedValue = typeof selectedValue === 'string' ? selectedValue.trim() : '';
  if (normalizedValue && !crewRoles.includes(normalizedValue)) {
    var extraOption = doc.createElement('option');
    extraOption.value = normalizedValue;
    extraOption.textContent = roleLabels[normalizedValue] || normalizedValue;
    userProfileRoleInput.appendChild(extraOption);
  }
  userProfileRoleInput.value = normalizedValue || '';
  userProfileRoleInput.scrollTop = previousScrollTop;
}
function ensureUserProfileRoleOption(roleValue) {
  resolveContactsDomRefs();
  if (!userProfileRoleInput) return;
  var normalized = typeof roleValue === 'string' ? roleValue.trim() : '';
  if (!normalized) return;
  var hasOption = Array.from(userProfileRoleInput.options || []).some(function (opt) {
    return opt.value === normalized;
  });
  if (hasOption) return;
  var doc = userProfileRoleInput.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return;
  var roleLabels = getCrewRoleLabels();
  var opt = doc.createElement('option');
  opt.value = normalized;
  opt.textContent = roleLabels[normalized] || normalized;
  userProfileRoleInput.appendChild(opt);
}
var projectFieldIcons = {
  productionCompany: PRODUCTION_COMPANY_ICON,
  productionCompanyAddress: ICON_GLYPHS.pin,
  rentalHouse: RENTAL_HOUSE_ICON,
  crew: iconGlyph("\uF404", ICON_FONT_KEYS.UICONS),
  prepDays: iconGlyph("\uE312", ICON_FONT_KEYS.UICONS),
  returnDays: iconGlyph("\uE312", ICON_FONT_KEYS.UICONS),
  shootingDays: iconGlyph("\uE311", ICON_FONT_KEYS.UICONS),
  deliveryResolution: iconGlyph("\uEF69", ICON_FONT_KEYS.UICONS),
  recordingResolution: ICON_GLYPHS.camera,
  recordingFrameRate: iconGlyph("\uE46F", ICON_FONT_KEYS.UICONS),
  slowMotionRecordingResolution: ICON_GLYPHS.camera,
  slowMotionRecordingFrameRate: iconGlyph("\uE46F", ICON_FONT_KEYS.UICONS),
  aspectRatio: ASPECT_RATIO_ICON,
  codec: ICON_GLYPHS.codec,
  baseFrameRate: iconGlyph("\uE46F", ICON_FONT_KEYS.UICONS),
  slowMotionBaseFrameRate: iconGlyph("\uE46F", ICON_FONT_KEYS.UICONS),
  sensorMode: ICON_GLYPHS.sensor,
  slowMotionSensorMode: ICON_GLYPHS.sensor,
  slowMotionAspectRatio: ASPECT_RATIO_ICON,
  requiredScenarios: REQUIRED_SCENARIOS_ICON,
  lenses: iconGlyph("\uE0A3", ICON_FONT_KEYS.UICONS),
  cameraHandle: iconGlyph("\uF2DC", ICON_FONT_KEYS.UICONS),
  viewfinderExtension: iconGlyph("\uE338", ICON_FONT_KEYS.UICONS),
  gimbal: iconGlyph("\uEA9C", ICON_FONT_KEYS.UICONS),
  monitoringSupport: MONITORING_SUPPORT_ICON,
  monitoringConfiguration: iconGlyph("\uF0D0", ICON_FONT_KEYS.UICONS),
  monitorUserButtons: iconGlyph("\uF0D1", ICON_FONT_KEYS.UICONS),
  cameraUserButtons: iconGlyph("\uF0D1", ICON_FONT_KEYS.UICONS),
  viewfinderUserButtons: iconGlyph("\uF0D1", ICON_FONT_KEYS.UICONS),
  storageRequirements: ICON_GLYPHS.save
};
function updateSelectIconBoxes(sel) {
  if (!sel) return;
  var multiSelected = sel.multiple ? Array.from(sel.selectedOptions || []) : [];
  var hasValue = sel.multiple ? multiSelected.some(function (opt) {
    return typeof opt.value === 'string' ? opt.value.trim() !== '' : !!opt.value;
  }) : typeof sel.value === 'string' ? sel.value.trim() !== '' : sel.value !== null && sel.value !== undefined && String(sel.value).trim() !== '';
  sel.classList.toggle('select-placeholder', !hasValue);
  if (sel.id === 'requiredScenarios') {
    return;
  }
  var parent = sel.parentNode;
  if (!parent || typeof parent.querySelector !== 'function') {
    return;
  }
  var container = parent.querySelector('.icon-box-summary');
  if (!container) {
    container = document.createElement('div');
    container.className = 'icon-box-summary';
    parent.insertBefore(container, sel.nextSibling);
  }
  container.innerHTML = '';
  var opts = sel.multiple ? multiSelected : hasValue && sel.selectedIndex >= 0 ? [sel.options[sel.selectedIndex]] : [];
  opts.forEach(function (opt) {
    var box = document.createElement('span');
    box.className = 'icon-box';
    var iconSpan = document.createElement('span');
    iconSpan.className = 'icon icon-glyph';
    var glyph = projectFieldIcons[sel.name] || ICON_GLYPHS.pin;
    if (opt.dataset.icon) {
      glyph = iconGlyph(opt.dataset.icon, opt.dataset.iconFont || ICON_FONT_KEYS.UICONS);
    }
    applyIconGlyph(iconSpan, glyph);
    box.appendChild(iconSpan);
    box.appendChild(document.createTextNode(opt.value));
    container.appendChild(box);
  });
}
try {
  if (typeof globalThis !== 'undefined' && typeof globalThis.updateSelectIconBoxes !== 'function') {
    globalThis.updateSelectIconBoxes = updateSelectIconBoxes;
  }
} catch (assignSelectIconError) {
  console.warn('Failed to expose updateSelectIconBoxes globally', assignSelectIconError);
}
function getLocalizedPathText(path) {
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  if (!path) return fallback;
  var keys = Array.isArray(path) ? path : typeof path === 'string' ? [path] : [];
  if (!keys.length) return fallback;
  var langTexts = texts && texts[currentLang] || {};
  var fallbackTexts = texts && texts.en || {};
  var resolve = function resolve(source) {
    return keys.reduce(function (acc, key) {
      if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
        return acc[key];
      }
      return undefined;
    }, source);
  };
  var localized = resolve(langTexts);
  if (localized !== undefined && localized !== null && localized !== '') {
    return String(localized);
  }
  var fallbackValue = resolve(fallbackTexts);
  if (fallbackValue !== undefined && fallbackValue !== null && fallbackValue !== '') {
    return String(fallbackValue);
  }
  return fallback;
}
function configureIconOnlyButton(button, glyph) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!button) return;
  var _ref22 = options || {},
    _ref22$contextPaths = _ref22.contextPaths,
    contextPaths = _ref22$contextPaths === void 0 ? [] : _ref22$contextPaths,
    _ref22$fallbackContex = _ref22.fallbackContext,
    fallbackContext = _ref22$fallbackContex === void 0 ? '' : _ref22$fallbackContex,
    _ref22$actionKey = _ref22.actionKey,
    actionKey = _ref22$actionKey === void 0 ? 'addEntry' : _ref22$actionKey;
  setButtonLabelWithIconBinding(button, '', glyph || ICON_GLYPHS.add);
  var actionLabel = getLocalizedPathText(['projectForm', actionKey], actionKey === 'removeEntry' ? 'Remove' : 'Add');
  var paths = Array.isArray(contextPaths) ? contextPaths : [contextPaths];
  var contextLabel = '';
  var _iterator2 = _createForOfIteratorHelper(paths),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var path = _step2.value;
      if (!path) continue;
      var resolved = getLocalizedPathText(path, '');
      if (resolved) {
        contextLabel = resolved;
        break;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  if (!contextLabel && typeof fallbackContext === 'string') {
    contextLabel = fallbackContext;
  }
  var normalizedContext = contextLabel ? contextLabel.replace(/[:：]\s*$/, '').trim() : '';
  var combinedLabel = [actionLabel, normalizedContext].filter(Boolean).join(' ').trim();
  if (combinedLabel) {
    button.setAttribute('aria-label', combinedLabel);
    button.setAttribute('title', combinedLabel);
  }
}
exposeCoreRuntimeConstant('configureIconOnlyButton', configureIconOnlyButton);
var generatedFieldIdCounter = 0;
function sanitizeForId(value) {
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'field';
  if (value === undefined || value === null) return fallback;
  var normalized = String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return normalized || fallback;
}
function ensureElementId(element) {
  var baseText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'field';
  if (!element) return '';
  if (element.id) return element.id;
  var base = sanitizeForId(baseText, 'field');
  var id = '';
  do {
    generatedFieldIdCounter += 1;
    id = "".concat(base, "-").concat(generatedFieldIdCounter);
  } while (document.getElementById(id));
  element.id = id;
  return id;
}
function createHiddenLabel(forId, text) {
  var label = document.createElement('label');
  label.className = 'visually-hidden';
  label.setAttribute('for', forId);
  label.textContent = typeof text === 'string' ? text : '';
  return label;
}
try {
  if (typeof globalThis !== 'undefined') {
    if (typeof globalThis.ensureElementId !== 'function') {
      globalThis.ensureElementId = ensureElementId;
    }
    if (typeof globalThis.createHiddenLabel !== 'function') {
      globalThis.createHiddenLabel = createHiddenLabel;
    }
  }
} catch (globalAssignError) {
  console.warn('Failed to expose accessibility helpers globally', globalAssignError);
}
function getProjectFormText(key) {
  var _texts3, _texts4;
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var fallbackProjectForm = ((_texts3 = texts) === null || _texts3 === void 0 || (_texts3 = _texts3.en) === null || _texts3 === void 0 ? void 0 : _texts3.projectForm) || {};
  var projectFormTexts = ((_texts4 = texts) === null || _texts4 === void 0 || (_texts4 = _texts4[currentLang]) === null || _texts4 === void 0 ? void 0 : _texts4.projectForm) || fallbackProjectForm;
  var localized = projectFormTexts && typeof projectFormTexts[key] === 'string' ? projectFormTexts[key].trim() : '';
  if (localized) return localized;
  var fallback = fallbackProjectForm && typeof fallbackProjectForm[key] === 'string' ? fallbackProjectForm[key].trim() : '';
  return fallback || defaultValue;
}
var CONTACTS_STORAGE_KEY_DEFAULT = 'cameraPowerPlanner_contacts';
function resolveContactsStorageKey() {
  try {
    var moduleApi = resolveContactsModule();
    if (moduleApi && typeof moduleApi.CONTACTS_STORAGE_KEY === 'string' && moduleApi.CONTACTS_STORAGE_KEY) {
      return moduleApi.CONTACTS_STORAGE_KEY;
    }
  } catch (error) {
    console.warn('Failed to resolve contacts storage key via module.', error);
  }
  return CONTACTS_STORAGE_KEY_DEFAULT;
}
var contactsCache = [];
var contactsInitialized = false;
var profileController = localCreateProfileController({
  loadProfile: function loadProfile() {
    try {
      return typeof loadUserProfile === 'function' ? loadUserProfile() : null;
    } catch (loadError) {
      console.warn('Failed to resolve stored user profile', loadError);
      return null;
    }
  },
  saveProfile: function saveProfile(profile) {
    if (typeof saveUserProfile === 'function') {
      try {
        saveUserProfile(profile);
      } catch (saveError) {
        console.warn('Failed to persist user profile', saveError);
      }
    }
  },
  announce: function announce(message) {
    return announceContactsMessage(message);
  },
  getText: getContactsText,
  dispatchChange: function dispatchChange() {
    return dispatchGearProviderDataChanged('user-profile');
  }
});
function getContactsText(key) {
  var _texts5, _texts6;
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var fallbackContacts = ((_texts5 = texts) === null || _texts5 === void 0 || (_texts5 = _texts5.en) === null || _texts5 === void 0 ? void 0 : _texts5.contacts) || {};
  var contactsTexts = ((_texts6 = texts) === null || _texts6 === void 0 || (_texts6 = _texts6[currentLang]) === null || _texts6 === void 0 ? void 0 : _texts6.contacts) || fallbackContacts;
  var localized = contactsTexts && typeof contactsTexts[key] === 'string' ? contactsTexts[key].trim() : '';
  if (localized) return localized;
  var fallback = fallbackContacts && typeof fallbackContacts[key] === 'string' ? fallbackContacts[key].trim() : '';
  return fallback || defaultValue;
}
function generateContactId() {
  var moduleApi = resolveContactsModule();
  if (moduleApi && typeof moduleApi.generateContactId === 'function') {
    try {
      return moduleApi.generateContactId();
    } catch (error) {
      console.warn('Unable to generate contact id via module.', error);
    }
  }
  return "contact-".concat(Date.now().toString(36), "-").concat(Math.random().toString(36).slice(2, 8));
}
function sanitizeContactValue(value) {
  return sanitizeContactValueHelper(value);
}
function normalizeContactEntry(entry) {
  return normalizeContactEntryHelper(entry);
}
function sortContacts(list) {
  return sortContactsHelper(list);
}
function loadStoredContacts() {
  var moduleApi = resolveContactsModule();
  if (moduleApi && typeof moduleApi.loadStoredContacts === 'function') {
    try {
      return moduleApi.loadStoredContacts();
    } catch (error) {
      console.warn('Unable to load contacts via module.', error);
    }
  }
  if (typeof localStorage === 'undefined') return [];
  try {
    var storageKey = resolveContactsStorageKey();
    var raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    var parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return sortContacts(parsed);
  } catch (error) {
    console.warn('Failed to load contacts from storage', error);
    return [];
  }
}
function saveContactsToStorage(contacts) {
  var moduleApi = resolveContactsModule();
  if (moduleApi && typeof moduleApi.saveContactsToStorage === 'function') {
    try {
      moduleApi.saveContactsToStorage(contacts);
      return;
    } catch (error) {
      console.warn('Unable to save contacts via module.', error);
    }
  }
  if (typeof localStorage === 'undefined') return;
  try {
    var storageKey = resolveContactsStorageKey();
    localStorage.setItem(storageKey, JSON.stringify(contacts));
  } catch (error) {
    console.warn('Failed to save contacts to storage', error);
  }
}
function getContactById(id) {
  if (!id) return null;
  return contactsCache.find(function (contact) {
    return contact.id === id;
  }) || null;
}
function getContactDisplayLabel(contact) {
  var _texts7, _texts8;
  if (!contact) return '';
  var roleLabels = ((_texts7 = texts) === null || _texts7 === void 0 || (_texts7 = _texts7[currentLang]) === null || _texts7 === void 0 ? void 0 : _texts7.crewRoles) || ((_texts8 = texts) === null || _texts8 === void 0 || (_texts8 = _texts8.en) === null || _texts8 === void 0 ? void 0 : _texts8.crewRoles) || {};
  var base = contact.name || contact.email || contact.phone || contact.website || contact.role || contact.id;
  var roleLabel = contact.role ? roleLabels[contact.role] || contact.role : '';
  if (base && roleLabel && roleLabel !== base) {
    return "".concat(base, " \u2014 ").concat(roleLabel);
  }
  return base || roleLabel || contact.id;
}
function ensureContactForImportedOwner(ownerName) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var contactOptions = options && _typeof(options) === 'object' ? options : {};
  var primaryName = typeof sanitizeContactValue === 'function' ? sanitizeContactValue(ownerName) : typeof ownerName === 'string' ? ownerName.trim() : '';
  var fallbackLabel = typeof sanitizeContactValue === 'function' ? sanitizeContactValue(contactOptions.fallbackLabel) : typeof contactOptions.fallbackLabel === 'string' ? contactOptions.fallbackLabel.trim() : '';
  var roleValue = typeof sanitizeContactValue === 'function' ? sanitizeContactValue(contactOptions.role) : typeof contactOptions.role === 'string' ? contactOptions.role.trim() : '';
  var baseName = primaryName || fallbackLabel;
  if (!baseName) {
    return null;
  }
  var existing = null;
  if (contactOptions.contactId) {
    existing = getContactById(contactOptions.contactId);
  }
  if (!existing) {
    var targetName = baseName.toLowerCase();
    existing = contactsCache.find(function (contact) {
      if (!contact) return false;
      var contactName = (contact.name || '').trim().toLowerCase();
      if (contactName && contactName === targetName) {
        return true;
      }
      if (typeof getContactDisplayLabel === 'function') {
        var display = (getContactDisplayLabel(contact) || '').trim().toLowerCase();
        if (display && display === targetName) {
          return true;
        }
      }
      return false;
    }) || null;
  }
  if (existing) {
    var _label = typeof getContactDisplayLabel === 'function' ? getContactDisplayLabel(existing) || baseName : existing.name || baseName;
    return {
      value: "contact:".concat(existing.id),
      label: _label,
      contact: existing
    };
  }
  var now = Date.now();
  var contact = normalizeContactEntry({
    id: generateContactId(),
    name: baseName,
    role: roleValue,
    phone: '',
    email: '',
    website: '',
    avatar: '',
    createdAt: now,
    updatedAt: now
  });
  contactsCache.push(contact);
  contactsCache = sortContacts(contactsCache);
  saveContactsToStorage(contactsCache);
  if (typeof renderContactsList === 'function') {
    renderContactsList();
  }
  if (typeof updateContactPickers === 'function') {
    updateContactPickers();
  }
  var label = typeof getContactDisplayLabel === 'function' ? getContactDisplayLabel(contact) || baseName : baseName;
  return {
    value: "contact:".concat(contact.id),
    label: label,
    contact: contact
  };
}
function setContactSelectOptions(select, selectedId) {
  if (!select) return;
  var currentValue = typeof selectedId === 'string' ? selectedId : select.value;
  var optionLang = select.lang;
  if (!optionLang && typeof document !== 'undefined' && document && document.documentElement) {
    optionLang = document.documentElement.lang || '';
  }
  if (!optionLang) {
    optionLang = currentLang || DEFAULT_LANGUAGE_SAFE;
  }
  var optionDirection = select.dir || localResolveDocumentDirection(optionLang || currentLang || DEFAULT_LANGUAGE_SAFE);
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }
  var placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = getContactsText('selectPlaceholder', 'Select contact');
  localApplyLocaleMetadata(placeholder, optionLang, optionDirection);
  select.appendChild(placeholder);
  contactsCache.forEach(function (contact) {
    var option = document.createElement('option');
    option.value = contact.id;
    option.textContent = getContactDisplayLabel(contact);
    localApplyLocaleMetadata(option, optionLang, optionDirection);
    if (contact.id === currentValue) {
      option.selected = true;
    }
    select.appendChild(option);
  });
  if (currentValue && !contactsCache.some(function (contact) {
    return contact.id === currentValue;
  })) {
    var fallback = document.createElement('option');
    fallback.value = currentValue;
    fallback.textContent = getContactsText('missingContactFallback', 'Saved contact');
    fallback.selected = true;
    localApplyLocaleMetadata(fallback, optionLang, optionDirection);
    select.appendChild(fallback);
  }
}
function updateContactPickers() {
  if (!crewContainer) return;
  var selects = crewContainer.querySelectorAll('.person-contact-select');
  selects.forEach(function (select) {
    return setContactSelectOptions(select);
  });
  dispatchGearProviderDataChanged('contacts');
}
function getAvatarInitial(value) {
  if (typeof value === 'string') {
    var trimmed = value.trim();
    if (trimmed) return trimmed.charAt(0).toUpperCase();
  }
  return '•';
}
function updateAvatarVisual(container, avatarValue, fallbackName, initialClass) {
  if (!container) return;
  var visual = container.querySelector('.person-avatar-visual, .contact-card-avatar-visual');
  if (!visual) return;
  while (visual.firstChild) {
    visual.removeChild(visual.firstChild);
  }
  if (avatarValue && localIsSafeImageUrl(avatarValue)) {
    var img = document.createElement('img');
    img.src = avatarValue;
    img.alt = '';
    visual.appendChild(img);
  } else {
    var span = document.createElement('span');
    span.className = initialClass;
    span.textContent = getAvatarInitial(fallbackName);
    visual.appendChild(span);
  }
}
function setRowAvatar(row, avatarValue) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!row) return;
  var dataInput = row.querySelector('.person-avatar-data');
  if (dataInput) {
    dataInput.value = avatarValue || '';
  }
  var nameInput = row.querySelector('.person-name');
  var fallbackName = options && Object.prototype.hasOwnProperty.call(options, 'name') ? options.name : nameInput === null || nameInput === void 0 ? void 0 : nameInput.value;
  var avatarContainer = row.querySelector('.person-avatar');
  updateAvatarVisual(avatarContainer, avatarValue, fallbackName, 'person-avatar-initial');
}
function parseDataUrlMimeType(dataUrl) {
  if (typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) return '';
  var separatorIndex = dataUrl.indexOf(';');
  if (separatorIndex === -1) return '';
  return dataUrl.slice('data:'.length, separatorIndex).trim();
}
function updateAvatarOptionsPreview(avatarValue, fallbackName) {
  resolveContactsDomRefs();
  if (!avatarOptionsPreview) return;
  updateAvatarVisual(avatarOptionsPreview, avatarValue || '', fallbackName || '', 'contact-card-avatar-initial');
}
function refreshAvatarOptionsActions() {
  var _avatarOptionsContext;
  var avatarValue = typeof ((_avatarOptionsContext = avatarOptionsContext) === null || _avatarOptionsContext === void 0 ? void 0 : _avatarOptionsContext.getAvatar) === 'function' ? avatarOptionsContext.getAvatar() : '';
  var hasAvatar = Boolean(avatarValue);
  var editingActive = Boolean(avatarEditState && avatarEditState.active);
  var setState = function setState(button, disabled) {
    if (!button) return;
    button.disabled = disabled;
    button.setAttribute('aria-disabled', disabled ? 'true' : 'false');
  };
  setState(avatarOptionsDeleteButton, !hasAvatar || editingActive);
  setState(avatarOptionsEditButton, !hasAvatar || editingActive);
  setState(avatarOptionsChangeButton, editingActive);
}
function stopAvatarEditing() {
  var _avatarOptionsContext2, _avatarOptionsContext3;
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref23 = options || {},
    _ref23$restoreFocus = _ref23.restoreFocus,
    restoreFocus = _ref23$restoreFocus === void 0 ? false : _ref23$restoreFocus;
  if (avatarControls) {
    avatarControls.classList.add('hidden');
  }
  if (avatarEditViewport) {
    try {
      var _avatarEditState$poin, _avatarEditState;
      avatarEditViewport.releasePointerCapture((_avatarEditState$poin = (_avatarEditState = avatarEditState) === null || _avatarEditState === void 0 ? void 0 : _avatarEditState.pointerId) !== null && _avatarEditState$poin !== void 0 ? _avatarEditState$poin : -1);
    } catch (error) {
      void error;
    }
    if (restoreFocus) {
      avatarEditViewport.blur();
    }
  }
  if (avatarEditImage) {
    avatarEditImage.removeAttribute('style');
  }
  avatarEditState = null;
  var currentAvatar = typeof ((_avatarOptionsContext2 = avatarOptionsContext) === null || _avatarOptionsContext2 === void 0 ? void 0 : _avatarOptionsContext2.getAvatar) === 'function' ? avatarOptionsContext.getAvatar() : '';
  var fallbackName = typeof ((_avatarOptionsContext3 = avatarOptionsContext) === null || _avatarOptionsContext3 === void 0 ? void 0 : _avatarOptionsContext3.getName) === 'function' ? avatarOptionsContext.getName() : '';
  updateAvatarOptionsPreview(currentAvatar, fallbackName);
  updateAvatarOptionsPreview(currentAvatar, fallbackName);
}
function closeAvatarOptionsDialog() {
  if (!avatarOptionsDialog) return;
  stopAvatarEditing();
  avatarOptionsContext = null;
  closeDialog(avatarOptionsDialog);
}
function handleAvatarOptionsDialogClosed() {
  stopAvatarEditing();
  avatarOptionsContext = null;
}
function openAvatarOptionsDialog() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  console.log('openAvatarOptionsDialog called', context);
  resolveContactsDomRefs();
  console.log('avatarOptionsDialog ref:', avatarOptionsDialog);
  if (!avatarOptionsDialog) return;
  avatarOptionsContext = context || null;
  var avatarValue = typeof (context === null || context === void 0 ? void 0 : context.getAvatar) === 'function' ? context.getAvatar() : '';
  var fallbackName = typeof (context === null || context === void 0 ? void 0 : context.getName) === 'function' ? context.getName() : '';
  updateAvatarOptionsPreview(avatarValue, fallbackName);
  stopAvatarEditing();
  stopAvatarEditing();
  openDialog(avatarOptionsDialog);
  if (avatarOptionsChangeButton && !avatarOptionsChangeButton.disabled) {
    try {
      avatarOptionsChangeButton.focus();
    } catch (error) {
      void error;
    }
  }
}
function clampAvatarEditOffsets(state) {
  if (!state) return;
  var minX = Math.min(0, state.viewportSize - state.displayWidth);
  var minY = Math.min(0, state.viewportSize - state.displayHeight);
  state.offsetX = Math.max(minX, Math.min(0, state.offsetX));
  state.offsetY = Math.max(minY, Math.min(0, state.offsetY));
}
function updateAvatarEditMetrics(state) {
  if (!state || !state.image) return;
  var width = state.image.naturalWidth || state.image.width || 0;
  var height = state.image.naturalHeight || state.image.height || 0;
  var displayWidth = width * state.baseScale * state.zoom;
  var displayHeight = height * state.baseScale * state.zoom;
  state.displayWidth = displayWidth;
  state.displayHeight = displayHeight;
  clampAvatarEditOffsets(state);
  if (avatarEditImage) {
    avatarEditImage.style.width = "".concat(displayWidth, "px");
    avatarEditImage.style.height = "".concat(displayHeight, "px");
    avatarEditImage.style.transform = "translate(".concat(state.offsetX, "px, ").concat(state.offsetY, "px)");
  }
}
function measureAvatarEditViewportSize() {
  resolveContactsDomRefs();
  if (!avatarEditViewport) return 0;
  var restoreHidden = false;
  var previousVisibility = '';
  var previousPointerEvents = '';
  if (avatarEditViewport && avatarEditViewport.classList.contains('hidden')) {
    restoreHidden = true;
    previousVisibility = avatarEditViewport.style.visibility || '';
    previousPointerEvents = avatarEditViewport.style.pointerEvents || '';
    avatarEditViewport.style.visibility = 'hidden';
    avatarEditViewport.style.pointerEvents = 'none';
    avatarEditViewport.classList.remove('hidden');
  }
  var viewportSize = 0;
  try {
    var viewportRect = avatarEditViewport.getBoundingClientRect();
    viewportSize = Math.round(Math.max(avatarEditViewport.offsetWidth || 0, viewportRect.width || 0, viewportRect.height || 0));
  } finally {
    if (restoreHidden && avatarEditViewport) {
      avatarEditViewport.classList.add('hidden');
      avatarEditViewport.style.visibility = previousVisibility;
      avatarEditViewport.style.pointerEvents = previousPointerEvents;
    }
  }
  if (!viewportSize && avatarEditLastViewportSize) {
    return avatarEditLastViewportSize;
  }
  if (viewportSize) {
    avatarEditLastViewportSize = viewportSize;
  }
  return viewportSize;
}
function initializeAvatarEditState(dataUrl) {
  resolveContactsDomRefs();
  if (!avatarEditViewport || !avatarEditImage) return;
  if (!dataUrl) {
    announceContactsMessage(getContactsText('avatarMissingImage', 'Add a photo before editing.'));
    return;
  }
  var viewportSize = measureAvatarEditViewportSize();
  if (!viewportSize) {
    announceContactsMessage(getContactsText('avatarEditUnavailable', 'Photo editor unavailable.'));
    return;
  }
  var image = new Image();
  image.decoding = 'async';
  var mime = parseDataUrlMimeType(dataUrl);
  image.onload = function () {
    if (!image.naturalWidth || !image.naturalHeight) {
      announceContactsMessage(getContactsText('avatarReadError', 'Could not read the selected image.'));
      return;
    }
    var baseScale = Math.max(viewportSize / image.naturalWidth, viewportSize / image.naturalHeight);
    avatarEditState = {
      active: true,
      dataUrl: dataUrl,
      image: image,
      mime: mime,
      viewportSize: viewportSize,
      baseScale: baseScale,
      zoom: 1,
      offsetX: (viewportSize - image.naturalWidth * baseScale) / 2,
      offsetY: (viewportSize - image.naturalHeight * baseScale) / 2,
      pointerId: null,
      pointerStartX: 0,
      pointerStartY: 0,
      offsetStartX: 0,
      offsetStartY: 0,
      displayWidth: 0,
      displayHeight: 0
    };
    avatarEditImage.src = dataUrl;
    if (avatarEditViewport) avatarEditViewport.classList.add('has-image');
    if (avatarControls) avatarControls.classList.remove('hidden');
    if (avatarEditZoomInput) {
      avatarEditZoomInput.value = '100';
    }
    updateAvatarEditMetrics(avatarEditState);
    try {
      avatarEditViewport.focus();
    } catch (error) {
      void error;
    }
  };
  image.onerror = function () {
    announceContactsMessage(getContactsText('avatarReadError', 'Could not read the selected image.'));
  };
  image.src = dataUrl;
}
function startAvatarEditing() {
  var _avatarOptionsContext4;
  var avatarValue = typeof ((_avatarOptionsContext4 = avatarOptionsContext) === null || _avatarOptionsContext4 === void 0 ? void 0 : _avatarOptionsContext4.getAvatar) === 'function' ? avatarOptionsContext.getAvatar() : '';
  resolveContactsDomRefs();
  if (avatarEditViewport) avatarEditViewport.classList.remove('has-image');
  if (avatarControls) avatarControls.classList.add('hidden');
  if (avatarEditImage) {
    avatarEditImage.src = '';
    avatarEditImage.removeAttribute('style');
  }
  if (!avatarValue) {
    return;
  }
  initializeAvatarEditState(avatarValue);
}
function handleAvatarEditZoomInputChange(event) {
  var _event$target;
  if (!avatarEditState || !avatarEditState.active) return;
  var value = Number(event === null || event === void 0 || (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value) || 100;
  var normalized = Math.max(50, value) / 100;
  var prevWidth = avatarEditState.displayWidth || 1;
  var prevHeight = avatarEditState.displayHeight || 1;
  var centerX = -avatarEditState.offsetX + avatarEditState.viewportSize / 2;
  var centerY = -avatarEditState.offsetY + avatarEditState.viewportSize / 2;
  var ratioX = centerX / prevWidth;
  var ratioY = centerY / prevHeight;
  avatarEditState.zoom = normalized;
  updateAvatarEditMetrics(avatarEditState);
  var targetCenterX = avatarEditState.displayWidth * ratioX;
  var targetCenterY = avatarEditState.displayHeight * ratioY;
  avatarEditState.offsetX = -(targetCenterX - avatarEditState.viewportSize / 2);
  avatarEditState.offsetY = -(targetCenterY - avatarEditState.viewportSize / 2);
  clampAvatarEditOffsets(avatarEditState);
  updateAvatarEditMetrics(avatarEditState);
}
function handleAvatarEditPointerDown(event) {
  if (!avatarEditState || !avatarEditState.active || !avatarEditViewport) return;
  if (avatarEditState.pointerId !== null) return;
  avatarEditState.pointerId = event.pointerId;
  avatarEditState.pointerStartX = event.clientX;
  avatarEditState.pointerStartY = event.clientY;
  avatarEditState.offsetStartX = avatarEditState.offsetX;
  avatarEditState.offsetStartY = avatarEditState.offsetY;
  try {
    avatarEditViewport.setPointerCapture(event.pointerId);
  } catch (error) {
    void error;
  }
  event.preventDefault();
}
function handleAvatarEditPointerMove(event) {
  if (!avatarEditState || !avatarEditState.active) return;
  if (avatarEditState.pointerId !== event.pointerId) return;
  var deltaX = event.clientX - avatarEditState.pointerStartX;
  var deltaY = event.clientY - avatarEditState.pointerStartY;
  avatarEditState.offsetX = avatarEditState.offsetStartX + deltaX;
  avatarEditState.offsetY = avatarEditState.offsetStartY + deltaY;
  clampAvatarEditOffsets(avatarEditState);
  updateAvatarEditMetrics(avatarEditState);
  event.preventDefault();
}
function clearAvatarEditPointerState() {
  if (!avatarEditState) return;
  avatarEditState.pointerId = null;
}
function handleAvatarEditPointerUp(event) {
  if (!avatarEditState || !avatarEditState.active) return;
  if (avatarEditState.pointerId !== event.pointerId) return;
  clearAvatarEditPointerState();
  if (avatarEditViewport) {
    try {
      avatarEditViewport.releasePointerCapture(event.pointerId);
    } catch (error) {
      void error;
    }
  }
  event.preventDefault();
}
function handleAvatarEditPointerCancel(event) {
  if (!avatarEditState || !avatarEditState.active) return;
  if (avatarEditState.pointerId !== event.pointerId) return;
  clearAvatarEditPointerState();
  if (avatarEditViewport) {
    try {
      avatarEditViewport.releasePointerCapture(event.pointerId);
    } catch (error) {
      void error;
    }
  }
}
function handleAvatarEditKeyDown(event) {
  if (!avatarEditState || !avatarEditState.active) return;
  var step = event.shiftKey ? 10 : 2;
  var moved = false;
  switch (event.key) {
    case 'ArrowUp':
      avatarEditState.offsetY -= step;
      moved = true;
      break;
    case 'ArrowDown':
      avatarEditState.offsetY += step;
      moved = true;
      break;
    case 'ArrowLeft':
      avatarEditState.offsetX -= step;
      moved = true;
      break;
    case 'ArrowRight':
      avatarEditState.offsetX += step;
      moved = true;
      break;
    default:
      break;
  }
  if (moved) {
    clampAvatarEditOffsets(avatarEditState);
    updateAvatarEditMetrics(avatarEditState);
    event.preventDefault();
  }
}
function exportAvatarEditResult() {
  if (!avatarEditState || !avatarEditState.image) return '';
  var scale = avatarEditState.baseScale * avatarEditState.zoom;
  if (!scale) return '';
  var cropSize = avatarEditState.viewportSize / scale;
  var sourceX = Math.max(0, Math.min(avatarEditState.image.naturalWidth - cropSize, -avatarEditState.offsetX / scale));
  var sourceY = Math.max(0, Math.min(avatarEditState.image.naturalHeight - cropSize, -avatarEditState.offsetY / scale));
  var canvas = document.createElement('canvas');
  canvas.width = CONTACT_AVATAR_MAX_DIMENSION;
  canvas.height = CONTACT_AVATAR_MAX_DIMENSION;
  var ctx = canvas.getContext('2d');
  if (!ctx) return '';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(avatarEditState.image, sourceX, sourceY, cropSize, cropSize, 0, 0, canvas.width, canvas.height);
  var mime = avatarEditState.mime && avatarEditState.mime.startsWith('image/') ? avatarEditState.mime : 'image/png';
  try {
    return canvas.toDataURL(mime);
  } catch (error) {
    void error;
    try {
      return canvas.toDataURL('image/png');
    } catch (fallbackError) {
      void fallbackError;
      return '';
    }
  }
}
function applyAvatarEditChanges() {
  var _avatarOptionsContext5, _avatarOptionsContext6;
  if (!avatarEditState || !avatarEditState.active) return;
  var dataUrl = exportAvatarEditResult();
  if (!dataUrl) {
    announceContactsMessage(getContactsText('avatarEditFailed', 'Could not update the photo framing.'));
    return;
  }
  if (typeof ((_avatarOptionsContext5 = avatarOptionsContext) === null || _avatarOptionsContext5 === void 0 ? void 0 : _avatarOptionsContext5.onEditSave) === 'function') {
    avatarOptionsContext.onEditSave(dataUrl);
  }
  var fallbackName = typeof ((_avatarOptionsContext6 = avatarOptionsContext) === null || _avatarOptionsContext6 === void 0 ? void 0 : _avatarOptionsContext6.getName) === 'function' ? avatarOptionsContext.getName() : '';
  updateAvatarOptionsPreview(dataUrl, fallbackName);
  stopAvatarEditing({
    restoreFocus: true
  });
  closeAvatarOptionsDialog();
}
function handleAvatarDeleteAction() {
  var _avatarOptionsContext7, _avatarOptionsContext8, _avatarOptionsContext9;
  if (typeof ((_avatarOptionsContext7 = avatarOptionsContext) === null || _avatarOptionsContext7 === void 0 ? void 0 : _avatarOptionsContext7.onDelete) === 'function') {
    avatarOptionsContext.onDelete();
  }
  var avatarValue = typeof ((_avatarOptionsContext8 = avatarOptionsContext) === null || _avatarOptionsContext8 === void 0 ? void 0 : _avatarOptionsContext8.getAvatar) === 'function' ? avatarOptionsContext.getAvatar() : '';
  var fallbackName = typeof ((_avatarOptionsContext9 = avatarOptionsContext) === null || _avatarOptionsContext9 === void 0 ? void 0 : _avatarOptionsContext9.getName) === 'function' ? avatarOptionsContext.getName() : '';
  updateAvatarOptionsPreview(avatarValue, fallbackName);
  updateAvatarOptionsPreview(avatarValue, fallbackName);
  if (!avatarValue) {
    closeAvatarOptionsDialog();
  }
}
function handleAvatarChangeAction() {
  var _avatarOptionsContext0;
  if (typeof ((_avatarOptionsContext0 = avatarOptionsContext) === null || _avatarOptionsContext0 === void 0 ? void 0 : _avatarOptionsContext0.onChange) === 'function') {
    avatarOptionsContext.onChange();
  }
}
function handleAvatarEditAction() {
  startAvatarEditing();
}
function handleAvatarEditCancel() {
  stopAvatarEditing({
    restoreFocus: true
  });
}
function handleAvatarDrop(event) {
  if (!event) return;
  event.preventDefault();
  event.stopPropagation();
  if (avatarEditViewport) avatarEditViewport.classList.remove('drag-over');
  var file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
  if (file) {
    processAvatarFile(file);
  }
}
function handleAvatarDragOver(event) {
  if (!event) return;
  event.preventDefault();
  event.stopPropagation();
  if (avatarEditViewport) avatarEditViewport.classList.add('drag-over');
}
function handleAvatarDragLeave(event) {
  if (!event) return;
  event.preventDefault();
  event.stopPropagation();
  if (avatarEditViewport) avatarEditViewport.classList.remove('drag-over');
}
function handleAvatarUpload(event) {
  var file = event.target && event.target.files && event.target.files[0];
  if (file) {
    processAvatarFile(file);
  }
  if (event.target) event.target.value = '';
}
function processAvatarFile(file) {
  localReadAvatarFile(file, function (dataUrl) {
    var _avatarOptionsContext1;
    var fallbackName = typeof ((_avatarOptionsContext1 = avatarOptionsContext) === null || _avatarOptionsContext1 === void 0 ? void 0 : _avatarOptionsContext1.getName) === 'function' ? avatarOptionsContext.getName() : '';
    updateAvatarOptionsPreview(dataUrl, fallbackName);
    initializeAvatarEditState(dataUrl);
  }, function (reason) {
    announceContactsMessage(getContactsText('avatarReadError', 'Could not read image.'));
  });
}
function handleAvatarSave() {
  if (avatarEditState && avatarEditState.active) {
    var _avatarOptionsContext10;
    var dataUrl = exportAvatarEditResult();
    if (dataUrl && typeof ((_avatarOptionsContext10 = avatarOptionsContext) === null || _avatarOptionsContext10 === void 0 ? void 0 : _avatarOptionsContext10.onEditSave) === 'function') {
      avatarOptionsContext.onEditSave(dataUrl);
    }
  } else {}
  closeAvatarOptionsDialog();
}
function handleAvatarOptionsDialogPointerDown(event) {
  if (!avatarOptionsDialog || !isDialogOpen(avatarOptionsDialog)) return;
  if (event && typeof event.button === 'number' && event.button !== 0) return;
  var target = (event === null || event === void 0 ? void 0 : event.target) || null;
  var elementTarget = typeof Element !== 'undefined' && target instanceof Element ? target : null;
  var path = typeof (event === null || event === void 0 ? void 0 : event.composedPath) === 'function' ? event.composedPath() : null;
  if (avatarOptionsForm) {
    if (elementTarget && avatarOptionsForm.contains(elementTarget)) {
      return;
    }
    if (Array.isArray(path) && path.includes(avatarOptionsForm)) {
      return;
    }
  }
  if (avatarEditState && avatarEditState.active) {
    applyAvatarEditChanges();
    return;
  }
  closeAvatarOptionsDialog();
}
function dispatchGearProviderDataChanged(reason) {
  if (typeof document === 'undefined') return;
  try {
    document.dispatchEvent(new CustomEvent('gear-provider-data-changed', {
      detail: {
        reason: reason
      }
    }));
  } catch (error) {
    void error;
  }
}
function getContactsSnapshot() {
  return contactsCache.map(function (contact) {
    if (!contact || _typeof(contact) !== 'object') {
      return null;
    }
    var createdAt = Number.isFinite(contact.createdAt) ? contact.createdAt : Date.now();
    var updatedAt = Number.isFinite(contact.updatedAt) ? contact.updatedAt : createdAt;
    var snapshot = {
      id: contact.id,
      name: contact.name || '',
      role: contact.role || '',
      phone: contact.phone || '',
      email: contact.email || '',
      website: contact.website || '',
      notes: contact.notes || '',
      avatar: contact.avatar || '',
      createdAt: createdAt,
      updatedAt: updatedAt
    };
    var label = typeof getContactDisplayLabel === 'function' ? getContactDisplayLabel(contact) : contact.label || snapshot.name || snapshot.email || snapshot.phone || snapshot.id || '';
    if (label) {
      snapshot.label = label;
    }
    return snapshot;
  }).filter(Boolean);
}
function assignUserProfileState() {
  var updates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!profileController || typeof profileController.assignUserProfileState !== 'function') return;
  profileController.assignUserProfileState(updates);
}
function getUserProfileSnapshot() {
  if (!profileController || typeof profileController.getUserProfileSnapshot !== 'function') {
    return {
      name: '',
      role: '',
      avatar: '',
      phone: '',
      email: ''
    };
  }
  return profileController.getUserProfileSnapshot();
}
function applyUserProfileToDom() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  resolveContactsDomRefs();
  var profile = getUserProfileSnapshot();
  var preserveTarget = options && options.preserveSelectionTarget ? options.preserveSelectionTarget : options && options.preserveSelection ? document.activeElement : null;
  if (userProfileNameInput) {
    if (preserveTarget === userProfileNameInput) {
      var start = userProfileNameInput.selectionStart;
      var end = userProfileNameInput.selectionEnd;
      userProfileNameInput.value = profile.name;
      try {
        userProfileNameInput.setSelectionRange(start, end);
      } catch (error) {
        void error;
      }
    } else {
      userProfileNameInput.value = profile.name;
    }
  }
  if (userProfileRoleInput) {
    ensureUserProfileRoleOption(profile.role);
    if (preserveTarget !== userProfileRoleInput) {
      userProfileRoleInput.value = profile.role || '';
    }
  }
  if (userProfilePhoneInput) {
    if (preserveTarget === userProfilePhoneInput) {
      var _start = userProfilePhoneInput.selectionStart;
      var _end = userProfilePhoneInput.selectionEnd;
      userProfilePhoneInput.value = profile.phone;
      try {
        userProfilePhoneInput.setSelectionRange(_start, _end);
      } catch (error) {
        void error;
      }
    } else {
      userProfilePhoneInput.value = profile.phone;
    }
  }
  if (userProfileEmailInput) {
    if (preserveTarget === userProfileEmailInput) {
      var _start2 = userProfileEmailInput.selectionStart;
      var _end2 = userProfileEmailInput.selectionEnd;
      userProfileEmailInput.value = profile.email;
      try {
        userProfileEmailInput.setSelectionRange(_start2, _end2);
      } catch (error) {
        void error;
      }
    } else {
      userProfileEmailInput.value = profile.email;
    }
  }
  if (userProfileAvatarContainer) {
    updateAvatarVisual(userProfileAvatarContainer, profile.avatar || '', profile.name, 'contact-card-avatar-initial');
  }
  if (userProfileAvatarClearButton) {
    var hasAvatar = Boolean(profile.avatar);
    userProfileAvatarClearButton.disabled = !hasAvatar;
    userProfileAvatarClearButton.setAttribute('aria-disabled', hasAvatar ? 'false' : 'true');
  }
}
function loadUserProfileState() {
  if (!profileController || typeof profileController.load !== 'function') {
    applyUserProfileToDom();
    return;
  }
  profileController.load();
  applyUserProfileToDom();
}
function persistUserProfileState() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!profileController || typeof profileController.schedulePersist !== 'function') {
    return;
  }
  var activeElement = typeof document !== 'undefined' ? document.activeElement : null;
  var preserveTarget = activeElement === userProfileNameInput || activeElement === userProfileRoleInput || activeElement === userProfilePhoneInput || activeElement === userProfileEmailInput ? activeElement : null;
  profileController.schedulePersist({
    announce: Boolean(options && options.announce)
  });
  applyUserProfileToDom({
    preserveSelectionTarget: preserveTarget
  });
}
function handleUserProfileNameInput() {
  if (!userProfileNameInput) return;
  var rawValue = typeof userProfileNameInput.value === 'string' ? userProfileNameInput.value : '';
  var profile = getUserProfileSnapshot();
  if (rawValue.trim() === profile.name.trim()) {
    return;
  }
  if (profileController && typeof profileController.handleFieldInput === 'function') {
    profileController.handleFieldInput('name', rawValue);
  } else {
    assignUserProfileState({
      name: rawValue
    });
  }
  persistUserProfileState();
}
function handleUserProfileRoleInput() {
  if (!userProfileRoleInput) return;
  var rawValue = typeof userProfileRoleInput.value === 'string' ? userProfileRoleInput.value : '';
  var normalizedValue = rawValue.trim();
  var profile = getUserProfileSnapshot();
  if (normalizedValue === profile.role.trim()) {
    return;
  }
  ensureUserProfileRoleOption(normalizedValue);
  if (profileController && typeof profileController.handleFieldInput === 'function') {
    profileController.handleFieldInput('role', normalizedValue);
  } else {
    assignUserProfileState({
      role: normalizedValue
    });
  }
  persistUserProfileState();
}
function handleUserProfilePhoneInput() {
  if (!userProfilePhoneInput) return;
  var rawValue = typeof userProfilePhoneInput.value === 'string' ? userProfilePhoneInput.value : '';
  var profile = getUserProfileSnapshot();
  if (rawValue.trim() === profile.phone.trim()) {
    return;
  }
  if (profileController && typeof profileController.handleFieldInput === 'function') {
    profileController.handleFieldInput('phone', rawValue);
  } else {
    assignUserProfileState({
      phone: rawValue
    });
  }
  persistUserProfileState();
}
function handleUserProfileEmailInput() {
  if (!userProfileEmailInput) return;
  var rawValue = typeof userProfileEmailInput.value === 'string' ? userProfileEmailInput.value : '';
  var profile = getUserProfileSnapshot();
  if (rawValue.trim() === profile.email.trim()) {
    return;
  }
  if (profileController && typeof profileController.handleFieldInput === 'function') {
    profileController.handleFieldInput('email', rawValue);
  } else {
    assignUserProfileState({
      email: rawValue
    });
  }
  persistUserProfileState();
}
function handleUserProfileFieldBlur() {
  if (profileController && typeof profileController.handleFieldBlur === 'function') {
    profileController.handleFieldBlur();
  }
}
function handleUserProfileAvatarCleared() {
  var profile = getUserProfileSnapshot();
  if (!profile.avatar) {
    return;
  }
  assignUserProfileState({
    avatar: ''
  });
  persistUserProfileState();
  announceContactsMessage(getContactsText('avatarCleared', 'Profile photo removed.'));
  if (isDialogOpen(avatarOptionsDialog)) {
    closeAvatarOptionsDialog();
  }
}
function handleUserProfileAvatarButtonClick() {
  var profile = getUserProfileSnapshot();
  var hasAvatar = Boolean(profile && profile.avatar);
  console.log('handleUserProfileAvatarButtonClick', {
    hasAvatar: hasAvatar,
    profile: profile
  });
  if (!hasAvatar && userProfileAvatarInput && typeof userProfileAvatarInput.click === 'function') {
    try {
      userProfileAvatarInput.click();
      return;
    } catch (error) {
      void error;
    }
  }
  openAvatarOptionsDialog({
    getAvatar: function getAvatar() {
      return getUserProfileSnapshot().avatar || '';
    },
    getName: function getName() {
      var _userProfileNameInput;
      return getUserProfileSnapshot().name || ((_userProfileNameInput = userProfileNameInput) === null || _userProfileNameInput === void 0 ? void 0 : _userProfileNameInput.value) || '';
    },
    onDelete: function onDelete() {
      handleUserProfileAvatarCleared();
    },
    onChange: function onChange() {
      if (userProfileAvatarInput && typeof userProfileAvatarInput.click === 'function') {
        try {
          userProfileAvatarInput.click();
        } catch (error) {
          void error;
        }
      }
    },
    onEditSave: function onEditSave(dataUrl) {
      var _userProfileNameInput2;
      if (!dataUrl) return;
      assignUserProfileState({
        name: getUserProfileSnapshot().name || ((_userProfileNameInput2 = userProfileNameInput) === null || _userProfileNameInput2 === void 0 ? void 0 : _userProfileNameInput2.value) || '',
        avatar: dataUrl
      });
      persistUserProfileState();
      announceContactsMessage(getContactsText('avatarUpdated', 'Profile photo updated.'));
      closeAvatarOptionsDialog();
    }
  });
}
function handleUserProfileAvatarInputChange() {
  if (!userProfileAvatarInput) return;
  var _ref24 = userProfileAvatarInput.files || [],
    _ref25 = _slicedToArray(_ref24, 1),
    file = _ref25[0];
  if (!file) {
    return;
  }
  localReadAvatarFile(file, function (dataUrl) {
    var profile = getUserProfileSnapshot();
    assignUserProfileState({
      name: profile.name || '',
      avatar: dataUrl
    });
    persistUserProfileState();
    announceContactsMessage(getContactsText('avatarUpdated', 'Profile photo updated.'));
    if (isDialogOpen(avatarOptionsDialog)) {
      closeAvatarOptionsDialog();
    }
  }, function (reason) {
    if (reason === 'tooLarge') {
      announceContactsMessage(getContactsText('avatarTooLarge', 'Choose an image under 300 KB.'));
    } else {
      announceContactsMessage(getContactsText('avatarReadError', 'Could not read the selected image.'));
    }
  });
  userProfileAvatarInput.value = '';
}
function refreshRowAvatarInitial(row) {
  if (!row) return;
  var dataInput = row.querySelector('.person-avatar-data');
  if (dataInput && dataInput.value) return;
  var nameInput = row.querySelector('.person-name');
  var avatarContainer = row.querySelector('.person-avatar');
  updateAvatarVisual(avatarContainer, '', nameInput ? nameInput.value : '', 'person-avatar-initial');
}
function detachCrewRowContact(row) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!row) return;
  var _ref26 = options || {},
    _ref26$preserveSelect = _ref26.preserveSelect,
    preserveSelect = _ref26$preserveSelect === void 0 ? false : _ref26$preserveSelect;
  delete row.dataset.contactId;
  if (!preserveSelect) {
    var contactSelect = row.querySelector('.person-contact-select');
    if (contactSelect) contactSelect.value = '';
  }
  updateRowLinkedBadge(row);
}
function updateRowLinkedBadge(row) {
  if (!row) return;
  var badge = row.querySelector('.person-linked-badge');
  if (!badge) return;
  var contactId = row.dataset.contactId;
  var isUserProfileLinked = row.dataset.userProfileLinked === '1';
  if (contactId) {
    var contact = getContactById(contactId);
    var baseLabel = getContactsText('linkedBadge', 'Linked to contact');
    if (contact && contact.name) {
      badge.textContent = "".concat(baseLabel, ": ").concat(contact.name);
    } else {
      badge.textContent = baseLabel;
    }
    badge.hidden = false;
    return;
  }
  if (isUserProfileLinked) {
    badge.textContent = getContactsText('linkedProfileBadge', 'Linked to user profile');
    badge.hidden = false;
    return;
  }
  badge.textContent = getContactsText('linkedBadge', 'Linked to contact');
  badge.hidden = true;
}
function handleCrewRowManualChange(row) {
  if (!row || row.dataset.syncingContact === '1') return;
  var wasLinked = Boolean(row.dataset.contactId);
  if (wasLinked) {
    detachCrewRowContact(row);
    announceContactsMessage(getContactsText('contactDetached', 'Crew row disconnected from saved contact.'));
  }
  refreshRowAvatarInitial(row);
  if (typeof markProjectFormDataDirty === 'function') {
    markProjectFormDataDirty();
  }
  scheduleProjectAutoSave(true);
}
function handleAvatarFileSelection(row, file) {
  localReadAvatarFile(file, function (dataUrl) {
    setRowAvatar(row, dataUrl);
    if (row.dataset.contactId) {
      detachCrewRowContact(row);
    }
    if (typeof markProjectFormDataDirty === 'function') {
      markProjectFormDataDirty();
    }
    scheduleProjectAutoSave(true);
    announceContactsMessage(getContactsText('avatarUpdated', 'Profile photo updated.'));
    if (isDialogOpen(avatarOptionsDialog)) {
      closeAvatarOptionsDialog();
    }
  }, function (reason) {
    if (reason === 'tooLarge') {
      announceContactsMessage(getContactsText('avatarTooLarge', 'Choose an image under 300 KB.'));
    } else {
      announceContactsMessage(getContactsText('avatarReadError', 'Could not read the selected image.'));
    }
  });
}
function announceContactsMessage(message) {
  resolveContactsDomRefs();
  if (!contactsAnnouncement) return;
  contactsAnnouncement.textContent = message || '';
}
function applyContactToCrewRow(row, contact) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!row || !contact) return;
  var _ref27 = options || {},
    _ref27$skipDirty = _ref27.skipDirty,
    skipDirty = _ref27$skipDirty === void 0 ? false : _ref27$skipDirty,
    _ref27$skipAnnounceme = _ref27.skipAnnouncement,
    skipAnnouncement = _ref27$skipAnnounceme === void 0 ? false : _ref27$skipAnnounceme;
  var snapshot = getCrewRowSnapshot(row) || {};
  var merged = typeof localCreateCrewRowSync === 'function' ? localCreateCrewRowSync(snapshot, contact) : {
    role: contact.role || '',
    name: contact.name || '',
    phone: contact.phone || '',
    email: contact.email || '',
    website: contact.website || '',
    avatar: contact.avatar || '',
    contactId: contact.id || ''
  };
  row.dataset.syncingContact = '1';
  try {
    var roleSel = row.querySelector('select[name="crewRole"]');
    if (roleSel) {
      if (merged.role && !Array.from(roleSel.options).some(function (opt) {
        return opt.value === merged.role;
      })) {
        var _texts9, _texts0;
        var opt = document.createElement('option');
        opt.value = merged.role;
        var roleLabels = ((_texts9 = texts) === null || _texts9 === void 0 || (_texts9 = _texts9[currentLang]) === null || _texts9 === void 0 ? void 0 : _texts9.crewRoles) || ((_texts0 = texts) === null || _texts0 === void 0 || (_texts0 = _texts0.en) === null || _texts0 === void 0 ? void 0 : _texts0.crewRoles) || {};
        opt.textContent = roleLabels[merged.role] || merged.role;
        roleSel.appendChild(opt);
      }
      if (merged.role) {
        roleSel.value = merged.role;
      }
    }
    var nameInput = row.querySelector('.person-name');
    if (nameInput) nameInput.value = merged.name || '';
    var phoneInput = row.querySelector('.person-phone');
    if (phoneInput) phoneInput.value = merged.phone || '';
    var emailInput = row.querySelector('.person-email');
    if (emailInput) emailInput.value = merged.email || '';
    var websiteInput = row.querySelector('.person-website');
    if (websiteInput) websiteInput.value = merged.website || '';
    setRowAvatar(row, merged.avatar || '', {
      name: merged.name
    });
    row.dataset.contactId = merged.contactId || contact.id;
    var contactSelect = row.querySelector('.person-contact-select');
    if (contactSelect) {
      setContactSelectOptions(contactSelect, merged.contactId || contact.id);
    }
  } finally {
    delete row.dataset.syncingContact;
  }
  updateRowLinkedBadge(row);
  if (!skipDirty && typeof markProjectFormDataDirty === 'function') {
    markProjectFormDataDirty();
  }
  if (!skipDirty) {
    scheduleProjectAutoSave(true);
  }
  if (!skipAnnouncement) {
    announceContactsMessage(getContactsText('contactApplied', 'Crew row updated from contact.'));
  }
}
function updateCrewRowsForContact(contact) {
  if (!crewContainer || !contact) return;
  var rows = crewContainer.querySelectorAll('.person-row');
  rows.forEach(function (row) {
    if (row.dataset.contactId === contact.id) {
      applyContactToCrewRow(row, contact, {
        skipAnnouncement: true
      });
    }
  });
}
function getCrewRowSnapshot(row) {
  if (!row) return null;
  var roleSel = row.querySelector('select[name="crewRole"]');
  var nameInput = row.querySelector('.person-name');
  var phoneInput = row.querySelector('.person-phone');
  var emailInput = row.querySelector('.person-email');
  var websiteInput = row.querySelector('.person-website');
  var avatarInput = row.querySelector('.person-avatar-data');
  return {
    role: sanitizeContactValue((roleSel === null || roleSel === void 0 ? void 0 : roleSel.value) || ''),
    name: sanitizeContactValue((nameInput === null || nameInput === void 0 ? void 0 : nameInput.value) || ''),
    phone: sanitizeContactValue((phoneInput === null || phoneInput === void 0 ? void 0 : phoneInput.value) || ''),
    email: sanitizeContactValue((emailInput === null || emailInput === void 0 ? void 0 : emailInput.value) || ''),
    website: sanitizeContactValue((websiteInput === null || websiteInput === void 0 ? void 0 : websiteInput.value) || ''),
    avatar: sanitizeContactValue((avatarInput === null || avatarInput === void 0 ? void 0 : avatarInput.value) || ''),
    contactId: sanitizeContactValue(row.dataset.contactId || '')
  };
}
function deleteContact(contactId) {
  if (!contactId) return;
  var index = contactsCache.findIndex(function (contact) {
    return contact.id === contactId;
  });
  if (index === -1) return;
  contactsCache.splice(index, 1);
  contactsCache = sortContacts(contactsCache);
  saveContactsToStorage(contactsCache);
  renderContactsList();
  updateContactPickers();
  if (crewContainer) {
    var rows = crewContainer.querySelectorAll('.person-row');
    rows.forEach(function (row) {
      if (row.dataset.contactId === contactId) {
        detachCrewRowContact(row);
      }
    });
  }
  announceContactsMessage(getContactsText('contactDeleted', 'Contact removed. Project rows keep their details.'));
}
function saveCrewRowAsContact(row) {
  var snapshot = getCrewRowSnapshot(row);
  if (!snapshot) return;
  if (!snapshot.name && !snapshot.email && !snapshot.phone && !snapshot.website) {
    announceContactsMessage(getContactsText('contactMissingDetails', 'Enter a name, email, phone number or website before saving this contact.'));
    return;
  }
  var now = Date.now();
  if (snapshot.contactId) {
    var existing = getContactById(snapshot.contactId);
    if (existing) {
      existing.name = snapshot.name || existing.name;
      existing.role = snapshot.role || existing.role;
      existing.phone = snapshot.phone || existing.phone;
      existing.email = snapshot.email || existing.email;
      existing.website = snapshot.website || existing.website;
      if (snapshot.avatar) {
        existing.avatar = snapshot.avatar;
      } else if (!existing.avatar) {
        delete existing.avatar;
      }
      existing.updatedAt = now;
      contactsCache = sortContacts(contactsCache);
      saveContactsToStorage(contactsCache);
      renderContactsList({
        focusContactId: existing.id
      });
      updateContactPickers();
      updateCrewRowsForContact(existing);
      announceContactsMessage(getContactsText('contactUpdated', 'Contact updated.'));
      return;
    }
  }
  var newContact = normalizeContactEntry({
    id: snapshot.contactId || generateContactId(),
    name: snapshot.name,
    role: snapshot.role,
    phone: snapshot.phone,
    email: snapshot.email,
    website: snapshot.website,
    avatar: snapshot.avatar,
    createdAt: now,
    updatedAt: now
  });
  contactsCache.push(newContact);
  contactsCache = sortContacts(contactsCache);
  saveContactsToStorage(contactsCache);
  renderContactsList({
    focusContactId: newContact.id
  });
  updateContactPickers();
  applyContactToCrewRow(row, newContact, {
    skipAnnouncement: true
  });
  announceContactsMessage(getContactsText('contactSaved', 'Contact saved for future projects.'));
}
function parseVCard(text) {
  return parseVCardEntries(text, {
    sanitize: sanitizeContactValue
  });
}
function mergeImportedContacts(imported) {
  if (!Array.isArray(imported) || !imported.length) {
    announceContactsMessage(getContactsText('importNone', 'No new contacts found in the file.'));
    return {
      added: 0,
      updated: 0
    };
  }
  var result = mergeImportedContactEntries({
    existing: contactsCache,
    imported: imported,
    now: function now() {
      return Date.now();
    },
    generateContactId: generateContactId
  });
  var contacts = result.contacts,
    _result$added = result.added,
    added = _result$added === void 0 ? 0 : _result$added,
    _result$updated = result.updated,
    updated = _result$updated === void 0 ? 0 : _result$updated;
  contactsCache = Array.isArray(contacts) ? contacts : contactsCache;
  saveContactsToStorage(contactsCache);
  renderContactsList();
  updateContactPickers();
  if (Array.isArray(contacts)) {
    contacts.forEach(function (contact) {
      return updateCrewRowsForContact(contact);
    });
  }
  if (added || updated) {
    var template = getContactsText('importSummary', '{added} added, {updated} updated.');
    announceContactsMessage(template.replace('{added}', added).replace('{updated}', updated));
  } else {
    announceContactsMessage(getContactsText('importNone', 'No new contacts found in the file.'));
  }
  return {
    added: added,
    updated: updated
  };
}
function createContactCard(contact) {
  var _texts1, _texts10;
  var card = document.createElement('article');
  card.className = 'contact-card';
  card.setAttribute('role', 'listitem');
  card.dataset.contactId = contact.id;
  var header = document.createElement('div');
  header.className = 'contact-card-header';
  var avatarContainer = document.createElement('div');
  avatarContainer.className = 'contact-card-avatar';
  var avatarVisual = document.createElement('div');
  avatarVisual.className = 'contact-card-avatar-visual';
  avatarContainer.appendChild(avatarVisual);
  updateAvatarVisual(avatarContainer, contact.avatar || '', contact.name, 'contact-card-avatar-initial');
  var avatarButton = document.createElement('button');
  avatarButton.type = 'button';
  var avatarLabel = getContactsText('avatarChange', 'Change photo');
  avatarButton.setAttribute('aria-label', avatarLabel);
  avatarButton.removeAttribute('title');
  avatarButton.removeAttribute('data-help');
  avatarButton.innerHTML = '';
  avatarContainer.appendChild(avatarButton);
  var avatarInput = document.createElement('input');
  avatarInput.type = 'file';
  avatarInput.accept = 'image/*';
  avatarInput.className = 'visually-hidden';
  avatarInput.tabIndex = -1;
  avatarContainer.appendChild(avatarInput);
  header.appendChild(avatarContainer);
  var title = document.createElement('strong');
  title.textContent = contact.name || getContactsText('contactFallbackName', 'Crew contact');
  header.appendChild(title);
  card.appendChild(header);
  var fields = document.createElement('div');
  fields.className = 'contact-card-fields';
  var roleLabels = ((_texts1 = texts) === null || _texts1 === void 0 || (_texts1 = _texts1[currentLang]) === null || _texts1 === void 0 ? void 0 : _texts1.crewRoles) || ((_texts10 = texts) === null || _texts10 === void 0 || (_texts10 = _texts10.en) === null || _texts10 === void 0 ? void 0 : _texts10.crewRoles) || {};
  var nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.value = contact.name || '';
  var nameFieldId = ensureElementId(nameInput, "".concat(contact.id, "-name"));
  var nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', nameFieldId);
  nameLabel.textContent = getContactsText('nameLabel', 'Name');
  var nameWrapper = document.createElement('div');
  nameWrapper.className = 'contact-field';
  nameWrapper.append(nameLabel, nameInput);
  fields.appendChild(nameWrapper);
  var roleSelect = document.createElement('select');
  var roleFieldId = ensureElementId(roleSelect, "".concat(contact.id, "-role"));
  var rolePlaceholder = document.createElement('option');
  rolePlaceholder.value = '';
  rolePlaceholder.textContent = getContactsText('rolePlaceholder', 'Select role');
  roleSelect.appendChild(rolePlaceholder);
  crewRoles.forEach(function (role) {
    var option = document.createElement('option');
    option.value = role;
    option.textContent = roleLabels[role] || role;
    roleSelect.appendChild(option);
  });
  if (contact.role && !crewRoles.includes(contact.role)) {
    var extraOption = document.createElement('option');
    extraOption.value = contact.role;
    extraOption.textContent = roleLabels[contact.role] || contact.role;
    roleSelect.appendChild(extraOption);
  }
  roleSelect.value = contact.role || '';
  var roleLabelElem = document.createElement('label');
  roleLabelElem.setAttribute('for', roleFieldId);
  roleLabelElem.textContent = getContactsText('roleLabel', 'Crew role');
  var roleWrapper = document.createElement('div');
  roleWrapper.className = 'contact-field';
  roleWrapper.append(roleLabelElem, roleSelect);
  fields.appendChild(roleWrapper);
  var phoneInput = document.createElement('input');
  phoneInput.type = 'tel';
  phoneInput.value = contact.phone || '';
  var phoneFieldId = ensureElementId(phoneInput, "".concat(contact.id, "-phone"));
  var phoneLabelElem = document.createElement('label');
  phoneLabelElem.setAttribute('for', phoneFieldId);
  phoneLabelElem.textContent = getContactsText('phoneLabel', 'Phone');
  var phoneWrapper = document.createElement('div');
  phoneWrapper.className = 'contact-field';
  phoneWrapper.append(phoneLabelElem, phoneInput);
  fields.appendChild(phoneWrapper);
  var emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.value = contact.email || '';
  var emailFieldId = ensureElementId(emailInput, "".concat(contact.id, "-email"));
  var emailLabelElem = document.createElement('label');
  emailLabelElem.setAttribute('for', emailFieldId);
  emailLabelElem.textContent = getContactsText('emailLabel', 'Email');
  var emailWrapper = document.createElement('div');
  emailWrapper.className = 'contact-field';
  emailWrapper.append(emailLabelElem, emailInput);
  fields.appendChild(emailWrapper);
  var websiteInput = document.createElement('input');
  websiteInput.type = 'url';
  websiteInput.inputMode = 'url';
  websiteInput.autocomplete = 'url';
  websiteInput.value = contact.website || '';
  websiteInput.placeholder = getContactsText('websitePlaceholder', 'https://example.com');
  var websiteFieldId = ensureElementId(websiteInput, "".concat(contact.id, "-website"));
  var websiteLabelElem = document.createElement('label');
  websiteLabelElem.setAttribute('for', websiteFieldId);
  websiteLabelElem.textContent = getContactsText('websiteLabel', 'Website');
  var websiteWrapper = document.createElement('div');
  websiteWrapper.className = 'contact-field';
  websiteWrapper.append(websiteLabelElem, websiteInput);
  fields.appendChild(websiteWrapper);
  card.appendChild(fields);
  var actions = document.createElement('div');
  actions.className = 'contact-card-actions';
  var useButton = document.createElement('button');
  useButton.type = 'button';
  setButtonLabelWithIconBinding(useButton, getContactsText('useInProject', 'Add to project crew'), ICON_GLYPHS.add);
  useButton.addEventListener('click', function () {
    createCrewRow(_objectSpread(_objectSpread({}, contact), {}, {
      contactId: contact.id
    }));
    closeDialog(contactsDialog);
    announceContactsMessage(getContactsText('contactAddedToProject', 'Contact added to the current project.'));
  });
  actions.appendChild(useButton);
  var deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  setButtonLabelWithIconBinding(deleteButton, getContactsText('deleteContact', 'Delete contact'), ICON_GLYPHS.trash);
  deleteButton.addEventListener('click', function () {
    var confirmMessage = getContactsText('deleteConfirm', 'Remove this contact? Project rows will keep their details.');
    if (typeof window !== 'undefined' && !window.confirm(confirmMessage)) return;
    deleteContact(contact.id);
  });
  actions.appendChild(deleteButton);
  card.appendChild(actions);
  var persist = function persist() {
    var resort = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    contact.updatedAt = Date.now();
    saveContactsToStorage(contactsCache);
    updateContactPickers();
    updateCrewRowsForContact(contact);
    if (resort) {
      contactsCache = sortContacts(contactsCache);
      renderContactsList({
        focusContactId: contact.id
      });
    }
  };
  nameInput.addEventListener('input', function () {
    contact.name = sanitizeContactValue(nameInput.value);
    title.textContent = contact.name || getContactsText('contactFallbackName', 'Crew contact');
    updateAvatarVisual(avatarContainer, contact.avatar || '', contact.name, 'contact-card-avatar-initial');
    persist();
  });
  nameInput.addEventListener('blur', function (event) {
    var nextActive = (event === null || event === void 0 ? void 0 : event.relatedTarget) || (typeof document !== 'undefined' ? document.activeElement : null);
    if (nextActive && nextActive !== nameInput && card.contains(nextActive)) {
      persist();
      return;
    }
    persist(true);
  });
  roleSelect.addEventListener('change', function () {
    contact.role = sanitizeContactValue(roleSelect.value);
    persist();
  });
  phoneInput.addEventListener('input', function () {
    contact.phone = sanitizeContactValue(phoneInput.value);
    persist();
  });
  emailInput.addEventListener('input', function () {
    contact.email = sanitizeContactValue(emailInput.value);
    persist();
  });
  websiteInput.addEventListener('input', function () {
    contact.website = sanitizeContactValue(websiteInput.value);
    persist();
  });
  avatarButton.addEventListener('click', function () {
    if (!contact.avatar && avatarInput && typeof avatarInput.click === 'function') {
      try {
        avatarInput.click();
        return;
      } catch (error) {
        void error;
      }
    }
    openAvatarOptionsDialog({
      getAvatar: function getAvatar() {
        return contact.avatar || '';
      },
      getName: function getName() {
        return contact.name || '';
      },
      onDelete: function onDelete() {
        if (!contact.avatar) return;
        contact.avatar = '';
        updateAvatarVisual(avatarContainer, '', contact.name, 'contact-card-avatar-initial');
        persist();
        announceContactsMessage(getContactsText('avatarCleared', 'Profile photo removed.'));
      },
      onChange: function onChange() {
        if (avatarInput && typeof avatarInput.click === 'function') {
          try {
            avatarInput.click();
          } catch (error) {
            void error;
          }
        }
      },
      onEditSave: function onEditSave(dataUrl) {
        if (!dataUrl) return;
        contact.avatar = dataUrl;
        updateAvatarVisual(avatarContainer, dataUrl, contact.name, 'contact-card-avatar-initial');
        persist();
        announceContactsMessage(getContactsText('avatarUpdated', 'Profile photo updated.'));
      }
    });
  });
  avatarInput.addEventListener('change', function () {
    var _ref28 = avatarInput.files || [],
      _ref29 = _slicedToArray(_ref28, 1),
      file = _ref29[0];
    if (!file) return;
    localReadAvatarFile(file, function (dataUrl) {
      contact.avatar = dataUrl;
      updateAvatarVisual(avatarContainer, dataUrl, contact.name, 'contact-card-avatar-initial');
      persist();
      announceContactsMessage(getContactsText('avatarUpdated', 'Profile photo updated.'));
      if (isDialogOpen(avatarOptionsDialog)) {
        closeAvatarOptionsDialog();
      }
    }, function (reason) {
      if (reason === 'tooLarge') {
        announceContactsMessage(getContactsText('avatarTooLarge', 'Choose an image under 300 KB.'));
      } else {
        announceContactsMessage(getContactsText('avatarReadError', 'Could not read the selected image.'));
      }
    });
    avatarInput.value = '';
  });
  return {
    card: card,
    focusTarget: nameInput
  };
}
function renderContactsList() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  resolveContactsDomRefs();
  if (!contactsList) return;
  var _ref30 = options || {},
    _ref30$focusContactId = _ref30.focusContactId,
    focusContactId = _ref30$focusContactId === void 0 ? null : _ref30$focusContactId;
  while (contactsList.firstChild) {
    contactsList.removeChild(contactsList.firstChild);
  }
  if (!contactsCache.length) {
    if (contactsEmptyState) contactsEmptyState.hidden = false;
    return;
  }
  if (contactsEmptyState) contactsEmptyState.hidden = true;
  var focusTarget = null;
  contactsCache.forEach(function (contact) {
    var _createContactCard = createContactCard(contact),
      card = _createContactCard.card,
      target = _createContactCard.focusTarget;
    contactsList.appendChild(card);
    if (focusContactId && contact.id === focusContactId) {
      focusTarget = target;
    }
  });
  if (focusTarget) {
    requestAnimationFrame(function () {
      return focusTarget.focus();
    });
  }
}
function enableAvatarDragAndDrop(container, onFile) {
  if (!container) return;
  var handleDragOver = function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    container.classList.add('avatar-drag-over');
  };
  var handleDragLeave = function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    container.classList.remove('avatar-drag-over');
  };
  var handleDrop = function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    container.classList.remove('avatar-drag-over');
    var file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
    if (file) {
      onFile(file);
    }
  };
  container.addEventListener('dragenter', handleDragOver);
  container.addEventListener('dragover', handleDragOver);
  container.addEventListener('dragleave', handleDragLeave);
  container.addEventListener('drop', handleDrop);
}
function initializeContactsModule() {
  var _avatarOptionsCloseBu, _avatarOptionsForm, _avatarOptionsDialog, _avatarOptionsDialog2, _avatarOptionsDialog3, _avatarOptionsDialog4, _avatarUploadInput, _avatarSaveButton, _avatarCancelButton, _avatarEditZoomInput, _avatarEditZoomInput2, _contactsCloseButton, _contactsForm, _contactsDialog, _contactsDialog2, _openContactsBtn;
  console.log('initializeContactsModule called');
  resolveContactsDomRefs();
  if (contactsInitialized && contactsList && userProfileAvatarButton) {
    return;
  }
  console.log('initializeContactsModule running (re-init or first run)');
  contactsCache = loadStoredContacts();
  loadUserProfileState();
  populateUserProfileRoleSelect();
  renderContactsList();
  updateContactPickers();
  applyUserProfileToDom();
  console.log('userProfileAvatarButton found (first-run):', !!userProfileAvatarButton);
  if (userProfileNameInput) {
    userProfileNameInput.addEventListener('input', handleUserProfileNameInput);
    userProfileNameInput.addEventListener('blur', handleUserProfileFieldBlur);
  }
  if (userProfileRoleInput) {
    userProfileRoleInput.addEventListener('input', handleUserProfileRoleInput);
    userProfileRoleInput.addEventListener('change', handleUserProfileRoleInput);
    userProfileRoleInput.addEventListener('blur', handleUserProfileFieldBlur);
  }
  if (userProfilePhoneInput) {
    userProfilePhoneInput.addEventListener('input', handleUserProfilePhoneInput);
    userProfilePhoneInput.addEventListener('blur', handleUserProfileFieldBlur);
  }
  if (userProfileEmailInput) {
    userProfileEmailInput.addEventListener('input', handleUserProfileEmailInput);
    userProfileEmailInput.addEventListener('blur', handleUserProfileFieldBlur);
  }
  if (userProfileAvatarButton) {
    userProfileAvatarButton.addEventListener('click', handleUserProfileAvatarButtonClick);
  }
  if (userProfileAvatarClearButton) {
    userProfileAvatarClearButton.addEventListener('click', handleUserProfileAvatarCleared);
  }
  if (userProfileAvatarInput) {
    userProfileAvatarInput.addEventListener('change', handleUserProfileAvatarInputChange);
  }
  if (userProfileAvatarContainer) {
    enableAvatarDragAndDrop(userProfileAvatarContainer, function (file) {
      localReadAvatarFile(file, function (dataUrl) {
        var profile = getUserProfileSnapshot();
        assignUserProfileState({
          name: profile.name || '',
          avatar: dataUrl
        });
        persistUserProfileState();
        announceContactsMessage(getContactsText('avatarUpdated', 'Profile photo updated.'));
        if (isDialogOpen(avatarOptionsDialog)) {
          closeAvatarOptionsDialog();
        }
      }, function (reason) {
        if (reason === 'tooLarge') {
          announceContactsMessage(getContactsText('avatarTooLarge', 'Choose an image under 300 KB.'));
        } else {
          announceContactsMessage(getContactsText('avatarReadError', 'Could not read the selected image.'));
        }
      });
    });
  }
  if (contactsAddButton) {
    contactsAddButton.addEventListener('click', function () {
      var newContact = normalizeContactEntry({
        id: generateContactId(),
        name: '',
        role: '',
        phone: '',
        email: '',
        avatar: '',
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      contactsCache.push(newContact);
      renderContactsList({
        focusContactId: newContact.id
      });
      saveContactsToStorage(contactsCache);
      updateContactPickers();
      announceContactsMessage(getContactsText('contactDraftCreated', 'New contact ready. Fill in the details.'));
    });
  }
  if (contactsImportButton && contactsImportInput) {
    contactsImportButton.addEventListener('click', function () {
      return contactsImportInput.click();
    });
    contactsImportInput.addEventListener('change', function () {
      var _ref31 = contactsImportInput.files || [],
        _ref32 = _slicedToArray(_ref31, 1),
        file = _ref32[0];
      if (!file) return;
      file.text().then(function (text) {
        return mergeImportedContacts(parseVCard(text));
      }).catch(function () {
        announceContactsMessage(getContactsText('importError', 'Could not import the selected file.'));
      }).finally(function () {
        contactsImportInput.value = '';
      });
    });
  }
  (_avatarOptionsCloseBu = avatarOptionsCloseButton) === null || _avatarOptionsCloseBu === void 0 || _avatarOptionsCloseBu.addEventListener('click', function () {
    return closeAvatarOptionsDialog();
  });
  (_avatarOptionsForm = avatarOptionsForm) === null || _avatarOptionsForm === void 0 || _avatarOptionsForm.addEventListener('submit', function (event) {
    return event.preventDefault();
  });
  (_avatarOptionsDialog = avatarOptionsDialog) === null || _avatarOptionsDialog === void 0 || _avatarOptionsDialog.addEventListener('cancel', function (event) {
    event.preventDefault();
    closeAvatarOptionsDialog();
  });
  (_avatarOptionsDialog2 = avatarOptionsDialog) === null || _avatarOptionsDialog2 === void 0 || _avatarOptionsDialog2.addEventListener('close', handleAvatarOptionsDialogClosed);
  (_avatarOptionsDialog3 = avatarOptionsDialog) === null || _avatarOptionsDialog3 === void 0 || _avatarOptionsDialog3.addEventListener('pointerdown', handleAvatarOptionsDialogPointerDown);
  (_avatarOptionsDialog4 = avatarOptionsDialog) === null || _avatarOptionsDialog4 === void 0 || _avatarOptionsDialog4.addEventListener('pointerdown', handleAvatarOptionsDialogPointerDown);
  if (avatarEditViewport) {
    avatarEditViewport.addEventListener('dragenter', handleAvatarDragOver);
    avatarEditViewport.addEventListener('dragover', handleAvatarDragOver);
    avatarEditViewport.addEventListener('dragleave', handleAvatarDragLeave);
    avatarEditViewport.addEventListener('drop', handleAvatarDrop);
    avatarEditViewport.addEventListener('click', function () {
      return avatarUploadInput && avatarUploadInput.click();
    });
    avatarEditViewport.addEventListener('pointerdown', handleAvatarEditPointerDown);
    avatarEditViewport.addEventListener('pointermove', handleAvatarEditPointerMove);
    avatarEditViewport.addEventListener('pointerup', handleAvatarEditPointerUp);
    avatarEditViewport.addEventListener('pointercancel', handleAvatarEditPointerCancel);
    avatarEditViewport.addEventListener('keydown', handleAvatarEditKeyDown);
  }
  (_avatarUploadInput = avatarUploadInput) === null || _avatarUploadInput === void 0 || _avatarUploadInput.addEventListener('change', handleAvatarUpload);
  (_avatarSaveButton = avatarSaveButton) === null || _avatarSaveButton === void 0 || _avatarSaveButton.addEventListener('click', handleAvatarSave);
  (_avatarCancelButton = avatarCancelButton) === null || _avatarCancelButton === void 0 || _avatarCancelButton.addEventListener('click', function () {
    return closeAvatarOptionsDialog();
  });
  (_avatarEditZoomInput = avatarEditZoomInput) === null || _avatarEditZoomInput === void 0 || _avatarEditZoomInput.addEventListener('input', handleAvatarEditZoomInputChange);
  (_avatarEditZoomInput2 = avatarEditZoomInput) === null || _avatarEditZoomInput2 === void 0 || _avatarEditZoomInput2.addEventListener('change', handleAvatarEditZoomInputChange);
  (_contactsCloseButton = contactsCloseButton) === null || _contactsCloseButton === void 0 || _contactsCloseButton.addEventListener('click', function () {
    return closeDialog(contactsDialog);
  });
  (_contactsForm = contactsForm) === null || _contactsForm === void 0 || _contactsForm.addEventListener('submit', function (event) {
    event.preventDefault();
    closeDialog(contactsDialog);
  });
  (_contactsDialog = contactsDialog) === null || _contactsDialog === void 0 || _contactsDialog.addEventListener('cancel', function (event) {
    event.preventDefault();
    closeDialog(contactsDialog);
  });
  (_contactsDialog2 = contactsDialog) === null || _contactsDialog2 === void 0 || _contactsDialog2.addEventListener('click', function (event) {
    if (event.target === contactsDialog) {
      closeDialog(contactsDialog);
    }
  });
  (_openContactsBtn = openContactsBtn) === null || _openContactsBtn === void 0 || _openContactsBtn.addEventListener('click', function (event) {
    event.preventDefault();
    openDialog(contactsDialog);
  });
  if (contactsList && userProfileAvatarButton) {
    contactsInitialized = true;
  }
}
function createCrewRow() {
  var _texts$en, _texts$currentLang, _texts$currentLang2, _texts$en2, _texts$currentLang3, _texts$en3, _texts$currentLang4, _texts$en4;
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!crewContainer) return;
  var row = document.createElement('div');
  row.className = 'person-row';
  if (data.userProfileLinked) {
    row.dataset.userProfileLinked = '1';
  }
  var documentLang = '';
  if (typeof document !== 'undefined' && document && document.documentElement) {
    documentLang = document.documentElement.lang || '';
  }
  var rowLanguage = documentLang || currentLang || DEFAULT_LANGUAGE_SAFE;
  var rowDirection = localResolveDocumentDirection(rowLanguage);
  localApplyLocaleMetadata(row, rowLanguage, rowDirection);
  var fallbackProjectForm = ((_texts$en = texts.en) === null || _texts$en === void 0 ? void 0 : _texts$en.projectForm) || {};
  var projectFormTexts = ((_texts$currentLang = texts[currentLang]) === null || _texts$currentLang === void 0 ? void 0 : _texts$currentLang.projectForm) || fallbackProjectForm;
  var roleLabels = ((_texts$currentLang2 = texts[currentLang]) === null || _texts$currentLang2 === void 0 ? void 0 : _texts$currentLang2.crewRoles) || ((_texts$en2 = texts.en) === null || _texts$en2 === void 0 ? void 0 : _texts$en2.crewRoles) || {};
  var crewRoleLabelText = projectFormTexts.crewRoleLabel || fallbackProjectForm.crewRoleLabel || 'Crew role';
  var crewNameLabelText = projectFormTexts.crewNameLabel || fallbackProjectForm.crewNameLabel || 'Crew member name';
  var crewPhoneLabelText = projectFormTexts.crewPhoneLabel || fallbackProjectForm.crewPhoneLabel || 'Crew member phone';
  var crewEmailLabelText = projectFormTexts.crewEmailLabel || fallbackProjectForm.crewEmailLabel || 'Crew member email';
  var crewWebsiteLabelText = projectFormTexts.crewWebsiteLabel || fallbackProjectForm.crewWebsiteLabel || 'Crew member website';
  var crewContactLabelText = getContactsText('selectLabel', 'Saved contacts');
  var avatarChangeLabel = getContactsText('avatarChange', 'Change photo');
  var avatarDataInput = document.createElement('input');
  avatarDataInput.type = 'hidden';
  avatarDataInput.className = 'person-avatar-data';
  avatarDataInput.value = typeof data.avatar === 'string' ? data.avatar : '';
  row.appendChild(avatarDataInput);
  var avatarContainer = document.createElement('div');
  avatarContainer.className = 'person-avatar';
  var avatarVisual = document.createElement('div');
  avatarVisual.className = 'person-avatar-visual';
  avatarContainer.appendChild(avatarVisual);
  var avatarButton = document.createElement('button');
  avatarButton.type = 'button';
  avatarButton.setAttribute('aria-label', avatarChangeLabel);
  avatarButton.removeAttribute('title');
  avatarButton.removeAttribute('data-help');
  avatarButton.innerHTML = '';
  avatarContainer.appendChild(avatarButton);
  var avatarFileInput = document.createElement('input');
  avatarFileInput.type = 'file';
  avatarFileInput.accept = 'image/*';
  avatarFileInput.className = 'visually-hidden';
  avatarFileInput.tabIndex = -1;
  avatarContainer.appendChild(avatarFileInput);
  enableAvatarDragAndDrop(avatarContainer, function (file) {
    handleAvatarFileSelection(row, file);
  });
  var roleSel = document.createElement('select');
  roleSel.name = 'crewRole';
  roleSel.className = 'person-role-select';
  localApplyLocaleMetadata(roleSel, rowLanguage, rowDirection);
  crewRoles.forEach(function (r) {
    var opt = document.createElement('option');
    opt.value = r;
    opt.textContent = roleLabels[r] || r;
    localApplyLocaleMetadata(opt, rowLanguage, rowDirection);
    roleSel.appendChild(opt);
  });
  if (data.role && !crewRoles.includes(data.role)) {
    var opt = document.createElement('option');
    opt.value = data.role;
    opt.textContent = roleLabels[data.role] || data.role;
    localApplyLocaleMetadata(opt, rowLanguage, rowDirection);
    roleSel.appendChild(opt);
  }
  if (data.role) roleSel.value = data.role;
  var nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'crewName';
  nameInput.className = 'person-name';
  nameInput.placeholder = projectFormTexts.crewNamePlaceholder || fallbackProjectForm.crewNamePlaceholder || 'Name';
  nameInput.value = data.name || '';
  localApplyLocaleMetadata(nameInput, rowLanguage, rowDirection);
  var phoneInput = document.createElement('input');
  phoneInput.type = 'tel';
  phoneInput.name = 'crewPhone';
  phoneInput.className = 'person-phone';
  phoneInput.placeholder = projectFormTexts.crewPhonePlaceholder || fallbackProjectForm.crewPhonePlaceholder || 'Phone';
  phoneInput.value = data.phone || '';
  localApplyLocaleMetadata(phoneInput, rowLanguage, rowDirection);
  var emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.name = 'crewEmail';
  emailInput.className = 'person-email';
  emailInput.placeholder = projectFormTexts.crewEmailPlaceholder || fallbackProjectForm.crewEmailPlaceholder || 'Email';
  emailInput.value = data.email || '';
  localApplyLocaleMetadata(emailInput, rowLanguage, rowDirection);
  var websiteInput = document.createElement('input');
  websiteInput.type = 'text';
  websiteInput.inputMode = 'url';
  websiteInput.autocomplete = 'url';
  websiteInput.name = 'crewWebsite';
  websiteInput.className = 'person-website';
  websiteInput.placeholder = projectFormTexts.crewWebsitePlaceholder || fallbackProjectForm.crewWebsitePlaceholder || 'Website';
  websiteInput.value = data.website || '';
  localApplyLocaleMetadata(websiteInput, rowLanguage, rowDirection);
  var contactSelect = document.createElement('select');
  contactSelect.className = 'person-contact-select';
  localApplyLocaleMetadata(contactSelect, rowLanguage, rowDirection);
  setContactSelectOptions(contactSelect, data.contactId);
  var roleLabel = createHiddenLabel(ensureElementId(roleSel, crewRoleLabelText), crewRoleLabelText);
  var nameLabel = createHiddenLabel(ensureElementId(nameInput, crewNameLabelText), crewNameLabelText);
  var phoneLabel = createHiddenLabel(ensureElementId(phoneInput, crewPhoneLabelText), crewPhoneLabelText);
  var emailLabel = createHiddenLabel(ensureElementId(emailInput, crewEmailLabelText), crewEmailLabelText);
  var websiteLabel = createHiddenLabel(ensureElementId(websiteInput, crewWebsiteLabelText), crewWebsiteLabelText);
  var contactLabel = createHiddenLabel(ensureElementId(contactSelect, crewContactLabelText), crewContactLabelText);
  var linkedBadge = document.createElement('span');
  linkedBadge.className = 'person-linked-badge';
  if (data.userProfileLinked) {
    linkedBadge.textContent = getContactsText('linkedProfileBadge', 'Linked to user profile');
    linkedBadge.hidden = false;
  } else {
    linkedBadge.textContent = getContactsText('linkedBadge', 'Linked to contact');
    linkedBadge.hidden = true;
  }
  var saveContactBtn = document.createElement('button');
  saveContactBtn.type = 'button';
  saveContactBtn.className = 'person-save-contact';
  setButtonLabelWithIconBinding(saveContactBtn, getContactsText('saveContact', 'Save to contacts'), ICON_GLYPHS.save);
  saveContactBtn.addEventListener('click', function () {
    return saveCrewRowAsContact(row);
  });
  var manageContactsBtn = document.createElement('button');
  manageContactsBtn.type = 'button';
  manageContactsBtn.className = 'person-manage-contacts';
  setButtonLabelWithIconBinding(manageContactsBtn, getContactsText('openManager', 'Open contacts'), ICON_GLYPHS.gears);
  manageContactsBtn.addEventListener('click', function () {
    return openDialog(contactsDialog);
  });
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'person-remove-btn';
  var removeBase = ((_texts$currentLang3 = texts[currentLang]) === null || _texts$currentLang3 === void 0 || (_texts$currentLang3 = _texts$currentLang3.projectForm) === null || _texts$currentLang3 === void 0 ? void 0 : _texts$currentLang3.removeEntry) || ((_texts$en3 = texts.en) === null || _texts$en3 === void 0 || (_texts$en3 = _texts$en3.projectForm) === null || _texts$en3 === void 0 ? void 0 : _texts$en3.removeEntry) || 'Remove';
  var crewHeading = ((_texts$currentLang4 = texts[currentLang]) === null || _texts$currentLang4 === void 0 || (_texts$currentLang4 = _texts$currentLang4.projectForm) === null || _texts$currentLang4 === void 0 ? void 0 : _texts$currentLang4.crewHeading) || ((_texts$en4 = texts.en) === null || _texts$en4 === void 0 || (_texts$en4 = _texts$en4.projectForm) === null || _texts$en4 === void 0 ? void 0 : _texts$en4.crewHeading) || 'Crew';
  var removeCrewLabel = "".concat(removeBase, " ").concat(crewHeading).trim();
  removeBtn.innerHTML = iconMarkup(ICON_GLYPHS.minus, 'btn-icon');
  removeBtn.setAttribute('aria-label', removeCrewLabel);
  removeBtn.setAttribute('title', removeCrewLabel);
  removeBtn.setAttribute('data-help', removeCrewLabel);
  removeBtn.addEventListener('click', function () {
    row.remove();
    if (typeof markProjectFormDataDirty === 'function') {
      markProjectFormDataDirty();
    }
    scheduleProjectAutoSave(true);
  });
  var actions = document.createElement('div');
  actions.className = 'person-actions';
  actions.append(saveContactBtn, manageContactsBtn, removeBtn);
  [roleLabel, nameLabel, phoneLabel, emailLabel, websiteLabel, contactLabel].forEach(function (label) {
    return row.appendChild(label);
  });
  row.appendChild(avatarContainer);
  row.appendChild(contactSelect);
  row.appendChild(linkedBadge);
  row.appendChild(roleSel);
  row.appendChild(nameInput);
  row.appendChild(phoneInput);
  row.appendChild(emailInput);
  row.appendChild(websiteInput);
  row.appendChild(actions);
  if (data.contactId) {
    row.dataset.contactId = data.contactId;
  }
  setRowAvatar(row, avatarDataInput.value, {
    name: data.name
  });
  updateRowLinkedBadge(row);
  avatarButton.addEventListener('click', function () {
    if (!avatarDataInput.value && avatarFileInput && typeof avatarFileInput.click === 'function') {
      try {
        avatarFileInput.click();
        return;
      } catch (error) {
        void error;
      }
    }
    openAvatarOptionsDialog({
      getAvatar: function getAvatar() {
        return avatarDataInput.value || '';
      },
      getName: function getName() {
        return nameInput.value || '';
      },
      onDelete: function onDelete() {
        if (!avatarDataInput.value) return;
        setRowAvatar(row, '');
        handleCrewRowManualChange(row);
        announceContactsMessage(getContactsText('avatarCleared', 'Profile photo removed.'));
      },
      onChange: function onChange() {
        if (avatarFileInput && typeof avatarFileInput.click === 'function') {
          try {
            avatarFileInput.click();
          } catch (error) {
            void error;
          }
        }
      },
      onEditSave: function onEditSave(dataUrl) {
        if (!dataUrl) return;
        setRowAvatar(row, dataUrl, {
          name: nameInput.value
        });
        if (row.dataset.contactId) {
          detachCrewRowContact(row);
        }
        handleCrewRowManualChange(row);
        announceContactsMessage(getContactsText('avatarUpdated', 'Profile photo updated.'));
      }
    });
  });
  avatarFileInput.addEventListener('change', function () {
    var _ref33 = avatarFileInput.files || [],
      _ref34 = _slicedToArray(_ref33, 1),
      file = _ref34[0];
    if (file) {
      handleAvatarFileSelection(row, file);
    }
    avatarFileInput.value = '';
  });
  roleSel.addEventListener('change', function () {
    return handleCrewRowManualChange(row);
  });
  nameInput.addEventListener('input', function () {
    refreshRowAvatarInitial(row);
    handleCrewRowManualChange(row);
  });
  phoneInput.addEventListener('input', function () {
    return handleCrewRowManualChange(row);
  });
  emailInput.addEventListener('input', function () {
    return handleCrewRowManualChange(row);
  });
  websiteInput.addEventListener('input', function () {
    return handleCrewRowManualChange(row);
  });
  contactSelect.addEventListener('change', function () {
    var selectedId = contactSelect.value;
    if (!selectedId) {
      detachCrewRowContact(row, {
        preserveSelect: true
      });
      handleCrewRowManualChange(row);
      return;
    }
    var contact = getContactById(selectedId);
    if (contact) {
      applyContactToCrewRow(row, contact);
    } else {
      announceContactsMessage(getContactsText('contactMissingDetails', 'Saved contact not available.'));
      detachCrewRowContact(row, {
        preserveSelect: true
      });
    }
  });
  crewContainer.appendChild(row);
  if (typeof markProjectFormDataDirty === 'function') {
    markProjectFormDataDirty();
  }
}
function createPrepRow() {
  var _texts$currentLang5, _texts$en5, _texts$currentLang6, _texts$en6;
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!prepContainer) return;
  var row = document.createElement('div');
  row.className = 'period-row';
  var start = document.createElement('input');
  start.type = 'date';
  start.name = 'prepStart';
  start.className = 'prep-start';
  start.value = data.start || '';
  start.setAttribute('aria-labelledby', 'prepLabel');
  var span = document.createElement('span');
  span.textContent = 'to';
  var end = document.createElement('input');
  end.type = 'date';
  end.name = 'prepEnd';
  end.className = 'prep-end';
  end.value = data.end || '';
  end.setAttribute('aria-labelledby', 'prepLabel');
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  var removeBase = ((_texts$currentLang5 = texts[currentLang]) === null || _texts$currentLang5 === void 0 || (_texts$currentLang5 = _texts$currentLang5.projectForm) === null || _texts$currentLang5 === void 0 ? void 0 : _texts$currentLang5.removeEntry) || ((_texts$en5 = texts.en) === null || _texts$en5 === void 0 || (_texts$en5 = _texts$en5.projectForm) === null || _texts$en5 === void 0 ? void 0 : _texts$en5.removeEntry) || 'Remove';
  var prepLabelText = ((_texts$currentLang6 = texts[currentLang]) === null || _texts$currentLang6 === void 0 || (_texts$currentLang6 = _texts$currentLang6.projectForm) === null || _texts$currentLang6 === void 0 ? void 0 : _texts$currentLang6.prepLabel) || ((_texts$en6 = texts.en) === null || _texts$en6 === void 0 || (_texts$en6 = _texts$en6.projectForm) === null || _texts$en6 === void 0 ? void 0 : _texts$en6.prepLabel) || 'Prep';
  var removePrepLabel = "".concat(removeBase, " ").concat(prepLabelText).trim();
  removeBtn.innerHTML = iconMarkup(ICON_GLYPHS.minus, 'btn-icon');
  removeBtn.setAttribute('aria-label', removePrepLabel);
  removeBtn.setAttribute('title', removePrepLabel);
  removeBtn.setAttribute('data-help', removePrepLabel);
  removeBtn.addEventListener('click', function () {
    row.remove();
    if (typeof markProjectFormDataDirty === 'function') {
      markProjectFormDataDirty();
    }
    scheduleProjectAutoSave(true);
  });
  row.append(start, span, end, removeBtn);
  prepContainer.appendChild(row);
  if (typeof markProjectFormDataDirty === 'function') {
    markProjectFormDataDirty();
  }
}
function createShootRow() {
  var _texts$currentLang7, _texts$en7, _texts$currentLang8, _texts$en8;
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!shootContainer) return;
  var row = document.createElement('div');
  row.className = 'period-row';
  var start = document.createElement('input');
  start.type = 'date';
  start.name = 'shootStart';
  start.className = 'shoot-start';
  start.value = data.start || '';
  start.setAttribute('aria-labelledby', 'shootLabel');
  var span = document.createElement('span');
  span.textContent = 'to';
  var end = document.createElement('input');
  end.type = 'date';
  end.name = 'shootEnd';
  end.className = 'shoot-end';
  end.value = data.end || '';
  end.setAttribute('aria-labelledby', 'shootLabel');
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  var removeBase = ((_texts$currentLang7 = texts[currentLang]) === null || _texts$currentLang7 === void 0 || (_texts$currentLang7 = _texts$currentLang7.projectForm) === null || _texts$currentLang7 === void 0 ? void 0 : _texts$currentLang7.removeEntry) || ((_texts$en7 = texts.en) === null || _texts$en7 === void 0 || (_texts$en7 = _texts$en7.projectForm) === null || _texts$en7 === void 0 ? void 0 : _texts$en7.removeEntry) || 'Remove';
  var shootLabelText = ((_texts$currentLang8 = texts[currentLang]) === null || _texts$currentLang8 === void 0 || (_texts$currentLang8 = _texts$currentLang8.projectForm) === null || _texts$currentLang8 === void 0 ? void 0 : _texts$currentLang8.shootLabel) || ((_texts$en8 = texts.en) === null || _texts$en8 === void 0 || (_texts$en8 = _texts$en8.projectForm) === null || _texts$en8 === void 0 ? void 0 : _texts$en8.shootLabel) || 'Shoot';
  var removeShootLabel = "".concat(removeBase, " ").concat(shootLabelText).trim();
  removeBtn.innerHTML = iconMarkup(ICON_GLYPHS.minus, 'btn-icon');
  removeBtn.setAttribute('aria-label', removeShootLabel);
  removeBtn.setAttribute('title', removeShootLabel);
  removeBtn.setAttribute('data-help', removeShootLabel);
  removeBtn.addEventListener('click', function () {
    row.remove();
    if (typeof markProjectFormDataDirty === 'function') {
      markProjectFormDataDirty();
    }
    scheduleProjectAutoSave(true);
  });
  row.append(start, span, end, removeBtn);
  shootContainer.appendChild(row);
  if (typeof markProjectFormDataDirty === 'function') {
    markProjectFormDataDirty();
  }
}
function createReturnRow() {
  var _texts$currentLang9, _texts$en9, _texts$currentLang0, _texts$en0;
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!returnContainer) return;
  var row = document.createElement('div');
  row.className = 'period-row';
  var start = document.createElement('input');
  start.type = 'date';
  start.name = 'returnStart';
  start.className = 'return-start';
  start.value = data.start || '';
  start.setAttribute('aria-labelledby', 'returnLabel');
  var span = document.createElement('span');
  span.textContent = 'to';
  var end = document.createElement('input');
  end.type = 'date';
  end.name = 'returnEnd';
  end.className = 'return-end';
  end.value = data.end || '';
  end.setAttribute('aria-labelledby', 'returnLabel');
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  var removeBase = ((_texts$currentLang9 = texts[currentLang]) === null || _texts$currentLang9 === void 0 || (_texts$currentLang9 = _texts$currentLang9.projectForm) === null || _texts$currentLang9 === void 0 ? void 0 : _texts$currentLang9.removeEntry) || ((_texts$en9 = texts.en) === null || _texts$en9 === void 0 || (_texts$en9 = _texts$en9.projectForm) === null || _texts$en9 === void 0 ? void 0 : _texts$en9.removeEntry) || 'Remove';
  var returnLabelText = ((_texts$currentLang0 = texts[currentLang]) === null || _texts$currentLang0 === void 0 || (_texts$currentLang0 = _texts$currentLang0.projectForm) === null || _texts$currentLang0 === void 0 ? void 0 : _texts$currentLang0.returnLabel) || ((_texts$en0 = texts.en) === null || _texts$en0 === void 0 || (_texts$en0 = _texts$en0.projectForm) === null || _texts$en0 === void 0 ? void 0 : _texts$en0.returnLabel) || 'Return Day';
  var removeReturnLabel = "".concat(removeBase, " ").concat(returnLabelText).trim();
  removeBtn.innerHTML = iconMarkup(ICON_GLYPHS.minus, 'btn-icon');
  removeBtn.setAttribute('aria-label', removeReturnLabel);
  removeBtn.setAttribute('title', removeReturnLabel);
  removeBtn.setAttribute('data-help', removeReturnLabel);
  removeBtn.addEventListener('click', function () {
    row.remove();
    if (typeof markProjectFormDataDirty === 'function') {
      markProjectFormDataDirty();
    }
    scheduleProjectAutoSave(true);
  });
  row.append(start, span, end, removeBtn);
  returnContainer.appendChild(row);
  if (typeof markProjectFormDataDirty === 'function') {
    markProjectFormDataDirty();
  }
}
function formatCapacity(value, unit) {
  var num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return '';
  var formatted = Number.isInteger(num) ? String(num) : num.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  });
  return "".concat(formatted, " ").concat(unit);
}
function gatherMediaEntriesForType(type) {
  var _devices6;
  var entries = [];
  if (!type) return entries;
  var cameraDb = ((_devices6 = devices) === null || _devices6 === void 0 ? void 0 : _devices6.cameras) || {};
  var selectedName = typeof (cameraSelect === null || cameraSelect === void 0 ? void 0 : cameraSelect.value) === 'string' ? cameraSelect.value : '';
  var addEntries = function addEntries(cam) {
    if (!cam || !Array.isArray(cam.recordingMedia)) return;
    cam.recordingMedia.forEach(function (media) {
      if (media && media.type === type) {
        entries.push(media);
      }
    });
  };
  if (selectedName && cameraDb[selectedName]) {
    addEntries(cameraDb[selectedName]);
  }
  Object.keys(cameraDb).forEach(function (name) {
    if (name === selectedName) return;
    addEntries(cameraDb[name]);
  });
  return entries;
}
function getAvailableStorageMediaTypes() {
  var _devices7, _devices8;
  var cameraDb = ((_devices7 = devices) === null || _devices7 === void 0 ? void 0 : _devices7.cameras) || {};
  var mediaDb = ((_devices8 = devices) === null || _devices8 === void 0 || (_devices8 = _devices8.gearList) === null || _devices8 === void 0 ? void 0 : _devices8.media) || {};
  var typeOrder = [];
  var normalizedTypes = new Set();
  var addType = function addType(value) {
    if (!value || typeof value !== 'string') return;
    var trimmed = value.trim();
    if (!trimmed) return;
    var normalized = trimmed.toLowerCase();
    if (normalizedTypes.has(normalized)) return;
    normalizedTypes.add(normalized);
    typeOrder.push(trimmed);
  };
  var addCameraTypes = function addCameraTypes(cam) {
    if (!cam) return;
    (cam.recordingMedia || []).forEach(function (media) {
      if (media && media.type) {
        addType(media.type);
      }
    });
  };
  var selectedName = typeof (cameraSelect === null || cameraSelect === void 0 ? void 0 : cameraSelect.value) === 'string' ? cameraSelect.value : '';
  if (selectedName && cameraDb[selectedName]) {
    addCameraTypes(cameraDb[selectedName]);
  }
  Object.entries(cameraDb).forEach(function (_ref35) {
    var _ref36 = _slicedToArray(_ref35, 2),
      name = _ref36[0],
      cam = _ref36[1];
    if (name === selectedName) return;
    addCameraTypes(cam);
  });
  Object.values(mediaDb).forEach(function (info) {
    var interfaceStr = typeof (info === null || info === void 0 ? void 0 : info.interface) === 'string' ? info.interface.trim() : '';
    if (interfaceStr) {
      addType(interfaceStr);
      var canonical = interfaceStr.replace(/\s*\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
      if (canonical && canonical !== interfaceStr) {
        addType(canonical);
      }
    }
    if (Array.isArray(info === null || info === void 0 ? void 0 : info.supportedMedia)) {
      info.supportedMedia.forEach(function (mediaType) {
        return addType(mediaType);
      });
    }
    var variantHint = typeof (info === null || info === void 0 ? void 0 : info.model) === 'string' ? info.model : '';
    var match = variantHint.match(/(CFexpress Type [AB](?: \(v\d(?:\.\d)?\))?|CFast 2\.0|microSDXC UHS-I|SDXC UHS-II|SDXC UHS-I|XQD|RED MINI-MAG|Codex Compact Drive)/i);
    if (match) {
      addType(match[0].replace(/\s+/g, ' ').trim());
    }
  });
  return typeOrder.sort(localeSort);
}
function getStorageVariantOptions(type) {
  var _devices9;
  var variants = [];
  if (!type) return variants;
  var normalizedType = type.toLowerCase();
  var mediaDb = ((_devices9 = devices) === null || _devices9 === void 0 || (_devices9 = _devices9.gearList) === null || _devices9 === void 0 ? void 0 : _devices9.media) || {};
  var seen = new Set();
  var addVariant = function addVariant(value, label) {
    if (!value || seen.has(value)) return;
    variants.push({
      value: value,
      label: label || value
    });
    seen.add(value);
  };
  Object.entries(mediaDb).forEach(function (_ref37) {
    var _ref38 = _slicedToArray(_ref37, 2),
      name = _ref38[0],
      info = _ref38[1];
    if (!name) return;
    var fields = [name, info === null || info === void 0 ? void 0 : info.model, info === null || info === void 0 ? void 0 : info.interface];
    var matches = fields.some(function (field) {
      return typeof field === 'string' && field.toLowerCase().includes(normalizedType);
    });
    if (!matches) return;
    var parts = [];
    if (info !== null && info !== void 0 && info.brand) parts.push(info.brand);
    var model = (info === null || info === void 0 ? void 0 : info.model) || '';
    if (model && (!info.brand || model.toLowerCase() !== info.brand.toLowerCase())) {
      parts.push(model);
    }
    var capacityGb = Number(info === null || info === void 0 ? void 0 : info.capacityGb);
    var capacityTb = Number(info === null || info === void 0 ? void 0 : info.capacityTb);
    var capacityLabel = '';
    if (Number.isFinite(capacityGb) && capacityGb > 0) {
      if (capacityGb >= 1000 && Number.isFinite(capacityTb) && capacityTb > 0) {
        capacityLabel = formatCapacity(capacityTb, 'TB');
      } else {
        capacityLabel = formatCapacity(capacityGb, 'GB');
      }
    } else if (Number.isFinite(capacityTb) && capacityTb > 0) {
      capacityLabel = formatCapacity(capacityTb, 'TB');
    }
    if (capacityLabel) parts.push(capacityLabel);
    addVariant(name, parts.length ? parts.join(' • ') : name);
  });
  var noteVariants = new Set();
  gatherMediaEntriesForType(type).forEach(function (media) {
    var notes = typeof (media === null || media === void 0 ? void 0 : media.notes) === 'string' ? media.notes : '';
    if (!notes) return;
    notes.split(/[,;/]/).forEach(function (part) {
      var trimmed = part.trim();
      if (trimmed) noteVariants.add(trimmed);
    });
  });
  noteVariants.forEach(function (note) {
    var value = "".concat(type, " ").concat(note).trim();
    addVariant(value, note);
  });
  if (!variants.length) {
    addVariant(type, type);
  }
  return variants.sort(function (a, b) {
    return localeSort(a.label, b.label);
  });
}
function updateStorageVariantOptions(select, type, selectedValue) {
  if (!select) return;
  var options = getStorageVariantOptions(type);
  var placeholder = getProjectFormText('storageVariantPlaceholder', 'Select brand & size');
  var previous = selectedValue !== undefined ? selectedValue : select.value;
  select.innerHTML = '';
  var blank = document.createElement('option');
  blank.value = '';
  blank.textContent = placeholder;
  select.appendChild(blank);
  options.forEach(function (opt) {
    var option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.label;
    select.appendChild(option);
  });
  if (previous) {
    var hasMatch = Array.from(select.options).some(function (opt) {
      return opt.value === previous;
    });
    if (!hasMatch) {
      var fallback = document.createElement('option');
      fallback.value = previous;
      fallback.textContent = previous;
      fallback.dataset.extraOption = 'true';
      select.appendChild(fallback);
    }
    select.value = previous;
  } else {
    select.value = '';
  }
}
function updateStorageRequirementTypeOptions() {
  if (!storageNeedsContainer) return;
  var types = getAvailableStorageMediaTypes();
  var placeholder = getProjectFormText('storageTypePlaceholder', 'Select media type');
  Array.from(storageNeedsContainer.querySelectorAll('.storage-row')).forEach(function (row) {
    var typeSelect = row.querySelector('.storage-type');
    var variantSelect = row.querySelector('.storage-variant');
    if (!typeSelect) return;
    var previous = typeSelect.value;
    var previousVariant = variantSelect ? variantSelect.value : '';
    typeSelect.innerHTML = '';
    var blank = document.createElement('option');
    blank.value = '';
    blank.textContent = placeholder;
    typeSelect.appendChild(blank);
    types.forEach(function (typeOption) {
      var option = document.createElement('option');
      option.value = typeOption;
      option.textContent = typeOption;
      typeSelect.appendChild(option);
    });
    if (previous) {
      var hasMatch = types.includes(previous);
      if (!hasMatch) {
        var fallback = document.createElement('option');
        fallback.value = previous;
        fallback.textContent = previous;
        fallback.dataset.extraOption = 'true';
        typeSelect.appendChild(fallback);
      }
      typeSelect.value = previous;
    } else {
      typeSelect.value = '';
    }
    updateStorageVariantOptions(variantSelect, typeSelect.value, previousVariant);
  });
}
function createStorageRequirementRow() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!storageNeedsContainer) return null;
  var row = document.createElement('div');
  row.className = 'storage-row form-row';
  var quantityInput = document.createElement('input');
  quantityInput.type = 'number';
  quantityInput.min = '1';
  quantityInput.step = '1';
  quantityInput.name = 'storageQuantity';
  quantityInput.className = 'storage-quantity';
  var quantityValue = Number(data.quantity);
  if (Number.isFinite(quantityValue) && quantityValue > 0) {
    quantityInput.value = quantityValue;
  }
  var quantityLabelText = getProjectFormText('storageQuantityLabel', 'Quantity');
  var quantityId = ensureElementId(quantityInput, quantityLabelText);
  var quantityLabel = document.createElement('label');
  quantityLabel.className = 'form-row-label storage-quantity-label';
  quantityLabel.setAttribute('for', quantityId);
  quantityLabel.textContent = quantityLabelText;
  quantityLabel.dataset.storageLabelKey = 'storageQuantityLabel';
  quantityInput.addEventListener('input', function () {
    return scheduleProjectAutoSave(true);
  });
  quantityInput.addEventListener('change', function () {
    return scheduleProjectAutoSave(true);
  });
  var typeSelect = document.createElement('select');
  typeSelect.name = 'storageMediaType';
  typeSelect.className = 'storage-type';
  typeSelect.value = typeof data.type === 'string' ? data.type : '';
  var typeLabelText = getProjectFormText('storageTypeLabel', 'Media type');
  var typeLabel = createHiddenLabel(ensureElementId(typeSelect, typeLabelText), typeLabelText);
  typeLabel.dataset.storageLabelKey = 'storageTypeLabel';
  var variantSelect = document.createElement('select');
  variantSelect.name = 'storageMediaVariant';
  variantSelect.className = 'storage-variant';
  variantSelect.value = typeof data.variant === 'string' ? data.variant : '';
  var variantLabelText = getProjectFormText('storageVariantLabel', 'Brand & capacity');
  var variantLabel = createHiddenLabel(ensureElementId(variantSelect, variantLabelText), variantLabelText);
  variantLabel.dataset.storageLabelKey = 'storageVariantLabel';
  variantSelect.addEventListener('change', function () {
    return scheduleProjectAutoSave(true);
  });
  var notesInput = document.createElement('input');
  notesInput.type = 'text';
  notesInput.name = 'storageMediaNotes';
  notesInput.className = 'storage-notes';
  notesInput.value = typeof data.notes === 'string' ? data.notes : '';
  notesInput.placeholder = getProjectFormText('storageNotesPlaceholder', '');
  var notesLabelText = getProjectFormText('storageNotesLabel', 'Notes');
  var notesLabel = createHiddenLabel(ensureElementId(notesInput, notesLabelText), notesLabelText);
  notesLabel.dataset.storageLabelKey = 'storageNotesLabel';
  notesInput.addEventListener('input', function () {
    return scheduleProjectAutoSave(true);
  });
  notesInput.addEventListener('change', function () {
    return scheduleProjectAutoSave(true);
  });
  typeSelect.addEventListener('change', function () {
    updateStorageVariantOptions(variantSelect, typeSelect.value);
    scheduleProjectAutoSave(true);
  });
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  var removeBase = getProjectFormText('removeEntry', 'Remove');
  var storageLabel = getProjectFormText('storageNeedsLabel', 'Recording media needs');
  var removeLabel = "".concat(removeBase, " ").concat(storageLabel).trim();
  removeBtn.innerHTML = iconMarkup(ICON_GLYPHS.minus, 'btn-icon');
  removeBtn.setAttribute('aria-label', removeLabel);
  removeBtn.setAttribute('title', removeLabel);
  removeBtn.setAttribute('data-help', removeLabel);
  removeBtn.dataset.storageActionKey = 'storageRemoveEntry';
  removeBtn.addEventListener('click', function () {
    row.remove();
    if (!storageNeedsContainer.querySelector('.storage-row')) {
      createStorageRequirementRow();
    } else {
      updateStorageRequirementTypeOptions();
    }
    if (typeof markProjectFormDataDirty === 'function') {
      markProjectFormDataDirty();
    }
    scheduleProjectAutoSave(true);
  });
  var duplicateBtn = document.createElement('button');
  duplicateBtn.type = 'button';
  duplicateBtn.className = 'storage-duplicate-btn';
  duplicateBtn.innerHTML = iconMarkup(ICON_GLYPHS.add, 'btn-icon');
  duplicateBtn.dataset.storageActionKey = 'storageDuplicateEntry';
  var duplicateLabel = getProjectFormText('storageDuplicateEntry', 'Duplicate media row');
  duplicateBtn.setAttribute('aria-label', duplicateLabel);
  duplicateBtn.setAttribute('title', duplicateLabel);
  duplicateBtn.setAttribute('data-help', duplicateLabel);
  duplicateBtn.addEventListener('click', function () {
    var entry = {
      quantity: quantityInput ? quantityInput.value : '',
      type: typeSelect ? typeSelect.value : '',
      variant: variantSelect ? variantSelect.value : '',
      notes: notesInput ? notesInput.value : ''
    };
    var newRow = createStorageRequirementRow(entry);
    if (newRow && typeof (storageNeedsContainer === null || storageNeedsContainer === void 0 ? void 0 : storageNeedsContainer.insertBefore) === 'function') {
      storageNeedsContainer.insertBefore(newRow, row.nextSibling);
      var focusField = newRow.querySelector('.storage-quantity');
      if (focusField) {
        focusField.focus();
        if (typeof focusField.select === 'function') {
          focusField.select();
        }
      }
    }
    scheduleProjectAutoSave(true);
  });
  var actionContainer = document.createElement('div');
  actionContainer.className = 'storage-row-actions';
  actionContainer.append(duplicateBtn, removeBtn);
  row.append(quantityLabel, quantityInput, typeLabel, typeSelect, variantLabel, variantSelect, notesLabel, notesInput, actionContainer);
  storageNeedsContainer.appendChild(row);
  updateStorageRequirementTypeOptions();
  if (typeof markProjectFormDataDirty === 'function') {
    markProjectFormDataDirty();
  }
  return row;
}
function updateRequiredScenariosTranslations(lang) {
  var select = document.getElementById("requiredScenarios");
  if (!select) return;
  var currentTexts = texts[lang] || {};
  var scenarios = currentTexts.scenarios || {};
  var fallback = texts.en && texts.en.scenarios ? texts.en.scenarios : {};
  Array.from(select.options).forEach(function (option) {
    var key = option.value;
    var translated = scenarios[key] || fallback[key] || option.value;
    option.textContent = translated;
  });
}
function updateStorageRequirementTranslations(projectFormTexts, fallbackProjectForm) {
  var headingText = projectFormTexts.storageHeading || fallbackProjectForm.storageHeading || 'Storage & Media';
  if (storageHeading) storageHeading.textContent = headingText;
  var labelText = projectFormTexts.storageNeedsLabel || fallbackProjectForm.storageNeedsLabel || 'Recording media needs:';
  if (storageNeedsLabel) storageNeedsLabel.textContent = labelText;
  var updateLabel = function updateLabel(key) {
    var text = projectFormTexts[key] || fallbackProjectForm[key];
    if (!text) return;
    document.querySelectorAll("#storageNeedsContainer [data-storage-label-key=\"".concat(key, "\"]")).forEach(function (label) {
      label.textContent = text;
    });
  };
  ['storageQuantityLabel', 'storageTypeLabel', 'storageVariantLabel', 'storageNotesLabel'].forEach(updateLabel);
  var typePlaceholder = projectFormTexts.storageTypePlaceholder || fallbackProjectForm.storageTypePlaceholder || 'Select media type';
  var variantPlaceholder = projectFormTexts.storageVariantPlaceholder || fallbackProjectForm.storageVariantPlaceholder || 'Select brand & size';
  var notesPlaceholder = projectFormTexts.storageNotesPlaceholder || fallbackProjectForm.storageNotesPlaceholder || '';
  var duplicateActionLabel = projectFormTexts.storageDuplicateEntry || fallbackProjectForm.storageDuplicateEntry || 'Duplicate media row';
  var removeBase = projectFormTexts.removeEntry || fallbackProjectForm.removeEntry || 'Remove';
  document.querySelectorAll('#storageNeedsContainer .storage-type').forEach(function (select) {
    var firstOption = select.options[0];
    if (firstOption) firstOption.textContent = typePlaceholder;
  });
  document.querySelectorAll('#storageNeedsContainer .storage-variant').forEach(function (select) {
    var firstOption = select.options[0];
    if (firstOption) firstOption.textContent = variantPlaceholder;
  });
  document.querySelectorAll('#storageNeedsContainer .storage-notes').forEach(function (input) {
    input.placeholder = notesPlaceholder;
  });
  document.querySelectorAll('#storageNeedsContainer [data-storage-action-key="storageDuplicateEntry"]').forEach(function (button) {
    button.setAttribute('aria-label', duplicateActionLabel);
    button.setAttribute('title', duplicateActionLabel);
    button.setAttribute('data-help', duplicateActionLabel);
  });
  var storageRemoveLabel = "".concat(removeBase, " ").concat(labelText).trim();
  document.querySelectorAll('#storageNeedsContainer [data-storage-action-key="storageRemoveEntry"]').forEach(function (button) {
    button.setAttribute('aria-label', storageRemoveLabel);
    button.setAttribute('title', storageRemoveLabel);
    button.setAttribute('data-help', storageRemoveLabel);
  });
}
if (addPersonBtn) {
  addPersonBtn.addEventListener('click', function () {
    return createCrewRow();
  });
}
if (addPrepBtn) {
  addPrepBtn.addEventListener('click', function () {
    return createPrepRow();
  });
}
if (addShootBtn) {
  addShootBtn.addEventListener('click', function () {
    return createShootRow();
  });
}
if (addReturnBtn) {
  addReturnBtn.addEventListener('click', function () {
    return createReturnRow();
  });
}
function updateTripodOptions() {
  var headBrand = tripodHeadBrandSelect ? tripodHeadBrandSelect.value : '';
  var bowl = tripodBowlSelect ? tripodBowlSelect.value : '';
  var headOpts = tripodHeadBrandSelect ? Array.from(tripodHeadBrandSelect.options) : [];
  var bowlOpts = tripodBowlSelect ? Array.from(tripodBowlSelect.options) : [];
  headOpts.forEach(function (o) {
    o.hidden = false;
  });
  bowlOpts.forEach(function (o) {
    o.hidden = false;
  });
  if (headBrand === 'OConnor') {
    var opt = bowlOpts.find(function (o) {
      return o.value === '75mm bowl';
    });
    if (opt) opt.hidden = true;
    if (tripodBowlSelect.value === '75mm bowl') tripodBowlSelect.value = '';
  }
  if (headBrand === 'Sachtler') {
    var _opt = bowlOpts.find(function (o) {
      return o.value === 'Mitchell Mount';
    });
    if (_opt) _opt.hidden = true;
    if (tripodBowlSelect.value === 'Mitchell Mount') tripodBowlSelect.value = '';
  }
  if (bowl === '75mm bowl') {
    var _opt2 = headOpts.find(function (o) {
      return o.value === 'OConnor';
    });
    if (_opt2) _opt2.hidden = true;
    if (tripodHeadBrandSelect.value === 'OConnor') tripodHeadBrandSelect.value = '';
  }
  if (bowl === 'Mitchell Mount') {
    var _opt3 = headOpts.find(function (o) {
      return o.value === 'Sachtler';
    });
    if (_opt3) _opt3.hidden = true;
    if (tripodHeadBrandSelect.value === 'Sachtler') tripodHeadBrandSelect.value = '';
  }
}
var totalPowerElem = document.getElementById("totalPower") || document.getElementById("heroTotalDraw");
var totalCurrent144Elem = document.getElementById("totalCurrent144") || document.getElementById("heroCurrent144");
var totalCurrent12Elem = document.getElementById("totalCurrent12") || document.getElementById("heroCurrent12");
var batteryLifeElem = document.getElementById("batteryLife") || document.getElementById("heroRuntime");
var batteryLifeLabelElem = document.getElementById("batteryLifeLabel");
var runtimeAverageNoteElem = document.getElementById("runtimeAverageNote");
var batteryCountElem = document.getElementById("batteryCount") || document.getElementById("heroBatteryCount");
var pinWarnElem = document.getElementById("pinWarning");
var dtapWarnElem = document.getElementById("dtapWarning");
var hotswapWarnElem = document.getElementById("hotswapWarning");
var powerWarningDialog = document.getElementById("powerWarningDialog");
var powerWarningTitleElem = document.getElementById("powerWarningTitle");
var powerWarningMessageElem = document.getElementById("powerWarningMessage");
var powerWarningLimitsHeadingElem = document.getElementById("powerWarningLimitsHeading");
var powerWarningPinsDetailElem = document.getElementById("powerWarningPinsDetail");
var powerWarningDtapDetailElem = document.getElementById("powerWarningDtapDetail");
var powerWarningAdviceElem = document.getElementById("powerWarningAdvice");
var powerWarningCloseBtn = document.getElementById("powerWarningCloseBtn");
var heroCard = document.getElementById("heroCard");
var heroTotalDraw = document.getElementById("heroTotalDraw");
var heroAvailablePower = document.getElementById("heroAvailablePower");
var heroBatteryLabel = document.getElementById("heroBatteryLabel");
var heroRuntime = document.getElementById("heroRuntime");
var heroCurrent144 = document.getElementById("heroCurrent144");
var heroCurrent12 = document.getElementById("heroCurrent12");
var heroBatteryCount = document.getElementById("heroBatteryCount");
var powerDiagramElem = document.getElementById("powerDiagram");
var powerDiagramBarElem = document.getElementById("powerDiagramBar");
var maxPowerTextElem = document.getElementById("maxPowerText");
var powerDiagramLegendElem = document.getElementById("powerDiagramLegend");
var currentPowerWarningKey = '';
var dismissedPowerWarningKey = '';
function updatePowerSummary() {}
function closePowerWarningDialog() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!powerWarningDialog) return;
  if (isDialogOpen(powerWarningDialog)) {
    closeDialog(powerWarningDialog);
  } else if (powerWarningDialog.removeAttribute) {
    powerWarningDialog.removeAttribute('open');
  }
  currentPowerWarningKey = '';
  if (!options.keepDismissed) {
    dismissedPowerWarningKey = '';
  }
}
function dismissPowerWarningDialog() {
  if (!powerWarningDialog) return;
  if (currentPowerWarningKey) {
    dismissedPowerWarningKey = currentPowerWarningKey;
  }
  closePowerWarningDialog({
    keepDismissed: true
  });
}
function showPowerWarningDialog(context) {
  var _texts$en1, _texts$en10, _texts$en11;
  if (!powerWarningDialog) return;
  var _ref39 = context || {},
    batteryName = _ref39.batteryName,
    current = _ref39.current,
    hasPinLimit = _ref39.hasPinLimit,
    pinLimit = _ref39.pinLimit,
    hasDtapRating = _ref39.hasDtapRating,
    dtapLimit = _ref39.dtapLimit,
    dtapAllowed = _ref39.dtapAllowed;
  var safeBatteryName = batteryName && batteryName.trim() ? batteryName.trim() : (batterySelect === null || batterySelect === void 0 ? void 0 : batterySelect.value) || '';
  var formattedCurrent = formatCurrentValue(Number(current) || 0);
  var langTexts = texts[currentLang] || texts.en || {};
  var messageTemplate = langTexts.powerWarningMessage || ((_texts$en1 = texts.en) === null || _texts$en1 === void 0 ? void 0 : _texts$en1.powerWarningMessage) || '';
  var message = messageTemplate ? messageTemplate.replace(/\{battery\}/g, safeBatteryName).replace(/\{current\}/g, formattedCurrent) : "".concat(safeBatteryName, " exceeds every available output (").concat(formattedCurrent, "A).");
  if (powerWarningMessageElem) {
    powerWarningMessageElem.textContent = message;
  }
  var pinsDetail = hasPinLimit ? (langTexts.powerWarningPinsDetail || ((_texts$en10 = texts.en) === null || _texts$en10 === void 0 ? void 0 : _texts$en10.powerWarningPinsDetail) || 'Pins limit: {max}A').replace(/\{max\}/g, formatCurrentValue(Number(pinLimit) || 0)) : langTexts.powerWarningPinsUnavailable || ((_texts$en11 = texts.en) === null || _texts$en11 === void 0 ? void 0 : _texts$en11.powerWarningPinsUnavailable) || 'Pins limit unavailable.';
  if (powerWarningPinsDetailElem) {
    powerWarningPinsDetailElem.textContent = pinsDetail;
  }
  var dtapDetail = '';
  if (hasDtapRating && dtapAllowed) {
    var _texts$en12;
    dtapDetail = (langTexts.powerWarningDtapDetail || ((_texts$en12 = texts.en) === null || _texts$en12 === void 0 ? void 0 : _texts$en12.powerWarningDtapDetail) || 'D-Tap limit: {max}A').replace(/\{max\}/g, formatCurrentValue(Number(dtapLimit) || 0));
  } else if (hasDtapRating && !dtapAllowed) {
    var _texts$en13;
    dtapDetail = langTexts.powerWarningDtapBlocked || ((_texts$en13 = texts.en) === null || _texts$en13 === void 0 ? void 0 : _texts$en13.powerWarningDtapBlocked) || 'D-Tap cannot be used with the current configuration.';
  } else {
    var _texts$en14;
    dtapDetail = langTexts.powerWarningDtapUnavailable || ((_texts$en14 = texts.en) === null || _texts$en14 === void 0 ? void 0 : _texts$en14.powerWarningDtapUnavailable) || 'No D-Tap output is available.';
  }
  if (powerWarningDtapDetailElem) {
    powerWarningDtapDetailElem.textContent = dtapDetail;
  }
  var keyParts = [safeBatteryName, formattedCurrent, hasPinLimit ? formatCurrentValue(Number(pinLimit) || 0) : 'no-pin', hasDtapRating ? formatCurrentValue(Number(dtapLimit) || 0) : 'no-dtap', dtapAllowed ? 'dtap-allowed' : 'dtap-blocked'];
  var nextKey = keyParts.join('|');
  if (dismissedPowerWarningKey && dismissedPowerWarningKey !== nextKey) {
    dismissedPowerWarningKey = '';
  }
  currentPowerWarningKey = nextKey;
  if (dismissedPowerWarningKey === nextKey) {
    return;
  }
  if (!isDialogOpen(powerWarningDialog)) {
    openDialog(powerWarningDialog);
  }
}
if (powerWarningCloseBtn) {
  powerWarningCloseBtn.addEventListener('click', dismissPowerWarningDialog);
}
if (powerWarningDialog) {
  powerWarningDialog.addEventListener('cancel', function (event) {
    event.preventDefault();
    dismissPowerWarningDialog();
  });
}
function drawPowerDiagram(availableWatt, segments, maxPinA) {
  if (!heroCard) return;
  if (!availableWatt || availableWatt <= 0) {
    heroCard.classList.add("hidden");
    if (powerDiagramElem) powerDiagramElem.classList.add("hidden");
    if (powerDiagramBarElem) powerDiagramBarElem.innerHTML = "";
    if (powerDiagramLegendElem) powerDiagramLegendElem.innerHTML = "";
    if (maxPowerTextElem) {
      maxPowerTextElem.textContent = "";
      setStatusLevel(maxPowerTextElem, null);
    }
    return;
  }
  heroCard.classList.remove("hidden");
  if (powerDiagramElem) powerDiagramElem.classList.remove("hidden");
  if (powerDiagramBarElem) powerDiagramBarElem.innerHTML = "";
  if (powerDiagramLegendElem) powerDiagramLegendElem.innerHTML = "";
  var total = segments.reduce(function (sum, s) {
    return sum + s.power;
  }, 0);
  var ratio = total / availableWatt;
  if (heroTotalDraw) {
    heroTotalDraw.textContent = "".concat(total.toFixed(0), " W");
    heroTotalDraw.classList.remove('glow-safe', 'glow-warning', 'glow-danger');
    if (ratio > 1.0) {
      heroTotalDraw.classList.add('glow-danger');
    } else if (ratio >= 0.8) {
      heroTotalDraw.classList.add('glow-warning');
    } else {
      heroTotalDraw.classList.add('glow-safe');
    }
  }
  if (heroAvailablePower) {
    heroAvailablePower.textContent = "".concat(availableWatt.toFixed(0), " W");
  }
  if (heroBatteryLabel && batterySelect) {
    var selectedOption = batterySelect.options[batterySelect.selectedIndex];
    var batteryName = selectedOption ? selectedOption.text : '';
    heroBatteryLabel.textContent = "Camera Setup draws ".concat(total.toFixed(0), "W from the ").concat(availableWatt.toFixed(0), "W available on the ").concat(batteryName);
  }
  if (powerDiagramBarElem && powerDiagramLegendElem) {
    var MAX_WIDTH = 100;
    var scale = 100 / Math.max(availableWatt, total);
    var limitPos = availableWatt * scale;
    var barInner = document.createElement("div");
    barInner.className = "power-bar-inner";
    powerDiagramBarElem.appendChild(barInner);
    segments.forEach(function (seg) {
      var widthPercent = seg.power * scale;
      if (widthPercent <= 0) return;
      var div = document.createElement("div");
      div.className = "segment ".concat(seg.className);
      div.style.width = "".concat(widthPercent, "%");
      div.setAttribute("title", "".concat(seg.label, " ").concat(seg.power.toFixed(1), " W"));
      barInner.appendChild(div);
      var legendItem = document.createElement("span");
      var swatch = document.createElement("span");
      swatch.className = "swatch ".concat(seg.className);
      legendItem.appendChild(swatch);
      legendItem.appendChild(document.createTextNode(seg.label.replace(/:$/, "")));
      powerDiagramLegendElem.appendChild(legendItem);
    });
    if (total > availableWatt) {
      var over = document.createElement("div");
      over.className = "over-usage";
      over.style.left = "".concat(limitPos, "%");
      over.style.right = '0';
      barInner.appendChild(over);
    }
    var limit = document.createElement("div");
    limit.className = "limit-line";
    limit.style.left = "".concat(limitPos, "%");
    if (typeof maxPinA === 'number' && maxPinA > 0) {
      var label = document.createElement("span");
      label.className = "limit-label";
      label.textContent = "".concat(texts[currentLang].pinLabel, " ").concat(maxPinA, " A");
      limit.appendChild(label);
    }
    powerDiagramBarElem.appendChild(limit);
    if (powerDiagramElem) {
      powerDiagramElem.classList.toggle("over", total > availableWatt);
    }
  }
  if (maxPowerTextElem) {
    maxPowerTextElem.textContent = "";
  }
}
var setupSelect = document.getElementById("setupSelect");
var setupNameInput = document.getElementById("setupName");
var saveSetupBtn = document.getElementById("saveSetupBtn");
var deleteSetupBtn = document.getElementById("deleteSetupBtn");
var shareSetupBtn = document.getElementById("shareSetupBtn");
var sharedLinkRow = document.getElementById("sharedLinkRow");
var sharedLinkInput = document.getElementById("sharedLinkInput");
var shareLinkMessage = document.getElementById("shareLinkMessage");
function sanitizeShareFilename(name) {
  if (!name) return '';
  var trimmed = String(name).trim();
  if (!trimmed) return '';
  var sanitized = trimmed.replace(/[\\/:*?"<>|]+/g, '_').replace(/\s+/g, ' ').replace(/^\.+/, '').replace(/\.+$/, '').trim();
  return sanitized;
}
function ensureJsonExtension(filename) {
  if (!filename) return '';
  return /\.json$/i.test(filename) ? filename : "".concat(filename, ".json");
}
function getDefaultShareFilename(setupName) {
  var sanitized = sanitizeShareFilename(setupName);
  return sanitized || 'project';
}
function promptForSharedFilename(setupName) {
  var defaultName = getDefaultShareFilename(setupName);
  var template = getLocalizedText('shareFilenamePrompt') || '';
  var promptMessage = template.includes('{defaultName}') ? template.replace('{defaultName}', defaultName) : template || 'Enter a name for the exported project file:';
  if (typeof window !== 'undefined' && typeof window.prompt === 'function') {
    var response = window.prompt(promptMessage, defaultName);
    if (response === null) {
      return null;
    }
    var sanitized = sanitizeShareFilename(response);
    if (!sanitized) {
      var invalidMessage = getLocalizedText('shareFilenameInvalid') || 'Please enter a valid file name to continue.';
      if (typeof window.alert === 'function') {
        window.alert(invalidMessage);
      }
      return null;
    }
    return ensureJsonExtension(sanitized);
  }
  return ensureJsonExtension(defaultName);
}
function confirmAutoGearSelection(defaultInclude) {
  var confirmMessage = getLocalizedText('shareIncludeAutoGearConfirm') || 'Include automatic gear rules in the shared file? Select OK to include them or Cancel to skip.';
  if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
    return window.confirm(confirmMessage);
  }
  return !!defaultInclude;
}
var shareDialog = document.getElementById("shareDialog");
var shareForm = document.getElementById("shareForm");
var shareDialogHeadingElem = document.getElementById("shareDialogHeading");
var shareFilenameInput = document.getElementById("shareFilename");
var shareFilenameLabelElem = document.getElementById("shareFilenameLabel");
var shareFilenameMessage = document.getElementById("shareFilenameMessage");
var shareCancelBtn = document.getElementById("shareCancelBtn");
var shareConfirmBtn = document.getElementById("shareConfirmBtn");
var shareIncludeAutoGearText = document.getElementById("shareIncludeAutoGearText");
var shareIncludeAutoGearLabelElem = document.getElementById("shareIncludeAutoGearLabel");
var shareIncludeOwnedGearText = document.getElementById("shareIncludeOwnedGearText");
var shareIncludeOwnedGearLabelElem = document.getElementById("shareIncludeOwnedGearLabel");
var shareIncludeAutoGearCheckbox = document.getElementById("shareIncludeAutoGear");
var shareIncludeOwnedGearCheckbox = document.getElementById("shareIncludeOwnedGear");
if (shareFilenameInput && shareFilenameMessage) {
  shareFilenameInput.setAttribute('aria-describedby', 'shareFilenameMessage');
}
var sharedImportDialog = document.getElementById("sharedImportDialog");
var sharedImportForm = document.getElementById("sharedImportForm");
var sharedImportDialogHeading = document.getElementById("sharedImportDialogHeading");
var sharedImportDialogMessage = document.getElementById("sharedImportDialogMessage");
var sharedImportMetadata = document.getElementById("sharedImportMetadata");
var sharedImportOptions = document.getElementById("sharedImportOptions");
var sharedImportLegend = document.getElementById("sharedImportLegend");
var sharedImportModeSelect = document.getElementById("sharedImportModeSelect");
var sharedImportModeNoneOption = document.getElementById("sharedImportModeNoneOption");
var sharedImportModeProjectOption = document.getElementById("sharedImportModeProjectOption");
var sharedImportModeGlobalOption = document.getElementById("sharedImportModeGlobalOption");
var sharedImportConfirmBtn = document.getElementById("sharedImportConfirmBtn");
var sharedImportCancelBtn = document.getElementById("sharedImportCancelBtn");
if (sharedImportModeSelect) {
  Array.from(sharedImportModeSelect.options || []).forEach(function (option) {
    if (option.value === "none") return;
    option.disabled = true;
  });
}
var sharedImportPromptActive = false;
var pendingSharedLinkListener = null;
var lastSetupName = setupSelect ? setupSelect.value : '';
var applySharedLinkBtn = document.getElementById("applySharedLinkBtn");
var sharedKeyMap = {
  setupName: "s",
  camera: "c",
  monitor: "m",
  video: "v",
  cage: "g",
  motors: "o",
  controllers: "r",
  distance: "d",
  batteryPlate: "p",
  battery: "b",
  batteryHotswap: "h",
  powerSelection: "w",
  projectInfo: "i",
  projectHtml: "q",
  gearSelectors: "e",
  gearList: "l",
  ownedGearMarkers: "u",
  changedDevices: "x",
  feedback: "f",
  autoGearRules: "a",
  autoGearCoverage: "z",
  diagramPositions: "y",
  metadata: "t",
  contacts: "n"
};
var sharedKeyMapKeys = Object.keys(sharedKeyMap);
var sharedHasOwn = Object.prototype.hasOwnProperty;
var lastSharedSetupData = null;
var lastSharedAutoGearRules = null;
var sharedImportPreviousPresetId = '';
var sharedImportProjectPresetActive = false;
var sharedImportPreparedForImport = false;
function resolveSharedImportLocalVersion() {
  if (typeof ACTIVE_APP_VERSION === 'string') {
    var trimmedActive = ACTIVE_APP_VERSION.trim();
    if (trimmedActive) {
      return trimmedActive;
    }
  }
  if (typeof APP_VERSION === 'string') {
    var trimmed = APP_VERSION.trim();
    if (trimmed) {
      return trimmed;
    }
  }
  return '';
}
function formatSharedImportTimestamp(timestamp) {
  if (typeof timestamp !== 'string') {
    return '';
  }
  var normalized = timestamp.trim();
  if (!normalized) {
    return '';
  }
  var parsed = new Date(normalized);
  if (Number.isNaN(parsed.valueOf())) {
    return normalized;
  }
  try {
    return parsed.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.warn('Unable to format shared import timestamp.', error);
    return normalized;
  }
}
function formatSharedImportMetadataSummary(metadata) {
  if (!metadata || _typeof(metadata) !== 'object') {
    return '';
  }
  var localeTexts = texts[currentLang] || texts.en || {};
  var englishTexts = texts.en || {};
  var parts = [];
  if (typeof metadata.exportedAt === 'string' && metadata.exportedAt.trim()) {
    var formattedTimestamp = formatSharedImportTimestamp(metadata.exportedAt);
    var timestampTemplate = localeTexts.sharedImportMetadataTimestamp || englishTexts.sharedImportMetadataTimestamp || 'Exported {timestamp}';
    parts.push(timestampTemplate.replace('{timestamp}', formattedTimestamp));
  }
  var metadataVersion = typeof metadata.version === 'string' ? metadata.version.trim() : '';
  if (metadataVersion) {
    var localVersion = resolveSharedImportLocalVersion();
    if (localVersion && localVersion !== metadataVersion) {
      var mismatchTemplate = localeTexts.sharedImportMetadataVersionMismatch || englishTexts.sharedImportMetadataVersionMismatch || 'Planner version {importVersion} (current build {appVersion})';
      parts.push(mismatchTemplate.replace('{importVersion}', metadataVersion).replace('{appVersion}', localVersion));
    } else {
      var versionTemplate = localeTexts.sharedImportMetadataVersion || englishTexts.sharedImportMetadataVersion || 'Planner version {version}';
      parts.push(versionTemplate.replace('{version}', metadataVersion));
    }
  }
  if (metadata.includesAutoGearRules) {
    var autoGearText = localeTexts.sharedImportMetadataIncludesAutoGear || englishTexts.sharedImportMetadataIncludesAutoGear || 'Includes automatic gear rules';
    parts.push(autoGearText);
  }
  if (metadata.includesOwnedGearMarkers) {
    var ownedGearText = localeTexts.sharedImportMetadataIncludesOwnedGear || englishTexts.sharedImportMetadataIncludesOwnedGear || 'Marks owned gear items';
    parts.push(ownedGearText);
  }
  return parts.join(' • ');
}
function updateSharedImportMetadataSummary(metadata) {
  if (!sharedImportMetadata) {
    return;
  }
  var summary = formatSharedImportMetadataSummary(metadata);
  if (summary) {
    sharedImportMetadata.textContent = summary;
    sharedImportMetadata.classList.remove('hidden');
  } else {
    sharedImportMetadata.textContent = '';
    sharedImportMetadata.classList.add('hidden');
  }
}
function cloneSharedImportValue(value) {
  if (value == null) return null;
  try {
    return CORE_DEEP_CLONE(value);
  } catch (error) {
    console.warn('Failed to clone shared import value', error);
    return null;
  }
}
function storeSharedImportData(data, rules) {
  lastSharedSetupData = cloneSharedImportValue(data);
  lastSharedAutoGearRules = cloneSharedImportValue(rules);
}
function clearStoredSharedImportData() {
  lastSharedSetupData = null;
  lastSharedAutoGearRules = null;
  sharedImportPreparedForImport = false;
  updateSharedImportMetadataSummary(null);
}
function resetSharedImportStateForFactoryReset() {
  clearStoredSharedImportData();
  sharedImportPromptActive = false;
  if (sharedImportDialog) {
    closeDialog(sharedImportDialog);
  }
  if (typeof configureSharedImportOptions === 'function') {
    configureSharedImportOptions([]);
  }
  if (sharedLinkInput) {
    if (pendingSharedLinkListener && typeof sharedLinkInput.removeEventListener === 'function') {
      sharedLinkInput.removeEventListener('change', pendingSharedLinkListener);
    }
    sharedLinkInput.value = '';
  }
  pendingSharedLinkListener = null;
  sharedImportPreviousPresetId = '';
  sharedImportProjectPresetActive = false;
}
function deactivateSharedImportProjectPreset() {
  if (!sharedImportProjectPresetActive) return;
  var targetPresetId = sharedImportPreviousPresetId || '';
  callCoreFunctionIfAvailable('setActiveAutoGearPresetId', [targetPresetId, {
    persist: false,
    skipRender: true
  }], {
    defer: true
  });
  sharedImportProjectPresetActive = false;
  sharedImportPreviousPresetId = '';
  callCoreFunctionIfAvailable('renderAutoGearPresetsControls', [], {
    defer: true
  });
}
function activateSharedImportProjectPreset(presetId) {
  if (!presetId) return;
  if (!sharedImportProjectPresetActive) {
    sharedImportPreviousPresetId = activeAutoGearPresetId || '';
  }
  sharedImportProjectPresetActive = true;
  callCoreFunctionIfAvailable('setActiveAutoGearPresetId', [presetId, {
    persist: false,
    skipRender: true
  }], {
    defer: true
  });
  callCoreFunctionIfAvailable('renderAutoGearPresetsControls', [], {
    defer: true
  });
}
function getSharedImportProjectName(sharedData) {
  if (!sharedData || _typeof(sharedData) !== 'object') return '';
  var projectName = sharedData.projectInfo && typeof sharedData.projectInfo.projectName === 'string' ? sharedData.projectInfo.projectName.trim() : '';
  if (projectName) return projectName;
  if (typeof sharedData.setupName === 'string') {
    var normalized = sharedData.setupName.trim();
    if (normalized) return normalized;
  }
  return '';
}
function getSharedImportPresetLabel(sharedData) {
  var _texts$en15, _texts$en16;
  var langTexts = texts[currentLang] || texts.en || {};
  var fallback = langTexts.sharedImportAutoGearPresetFallback || ((_texts$en15 = texts.en) === null || _texts$en15 === void 0 ? void 0 : _texts$en15.sharedImportAutoGearPresetFallback) || 'Shared automatic gear rules';
  var projectName = getSharedImportProjectName(sharedData);
  if (!projectName) {
    return fallback;
  }
  var template = langTexts.sharedImportAutoGearPresetName || ((_texts$en16 = texts.en) === null || _texts$en16 === void 0 ? void 0 : _texts$en16.sharedImportAutoGearPresetName) || '%s';
  if (template.includes('%s')) {
    return formatWithPlaceholdersSafe(template, projectName);
  }
  return "".concat(template, " ").concat(projectName).trim();
}
function ensureSharedAutoGearPreset(rules, sharedData) {
  var _texts$currentLang1, _texts$en17;
  var normalizedRules = Array.isArray(rules) ? rules.map(normalizeAutoGearRule).filter(Boolean) : [];
  if (!normalizedRules.length) return null;
  var label = getSharedImportPresetLabel(sharedData);
  var fingerprint = createAutoGearRulesFingerprint(normalizedRules);
  var preset = autoGearPresets.find(function (entry) {
    return entry.fingerprint === fingerprint;
  }) || null;
  var fallback = ((_texts$currentLang1 = texts[currentLang]) === null || _texts$currentLang1 === void 0 ? void 0 : _texts$currentLang1.sharedImportAutoGearPresetFallback) || ((_texts$en17 = texts.en) === null || _texts$en17 === void 0 ? void 0 : _texts$en17.sharedImportAutoGearPresetFallback) || 'Shared automatic gear rules';
  if (preset) {
    if (label && preset.label !== label && preset.label === fallback) {
      preset = _objectSpread(_objectSpread({}, preset), {}, {
        label: label
      });
      autoGearPresets = autoGearPresets.map(function (entry) {
        return entry.id === preset.id ? preset : entry;
      });
      autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
      persistAutoGearPresets(autoGearPresets);
      callCoreFunctionIfAvailable('renderAutoGearPresetsControls', [], {
        defer: true
      });
    }
    return preset;
  }
  var normalizedPreset = normalizeAutoGearPreset({
    id: generateAutoGearId('preset'),
    label: label,
    rules: normalizedRules
  });
  if (!normalizedPreset) return null;
  autoGearPresets.push(normalizedPreset);
  autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
  persistAutoGearPresets(autoGearPresets);
  if (autoGearAutoPresetIdState) {
    callCoreFunctionIfAvailable('setAutoGearAutoPresetId', ['', {
      persist: true,
      skipRender: true
    }], {
      defer: true
    });
  }
  callCoreFunctionIfAvailable('renderAutoGearPresetsControls', [], {
    defer: true
  });
  return normalizedPreset;
}
function configureSharedImportOptions(sharedRules) {
  if (!sharedImportModeSelect) {
    return Array.isArray(sharedRules) && sharedRules.length > 0;
  }
  var hasRules = Array.isArray(sharedRules) && sharedRules.length > 0;
  var options = Array.from(sharedImportModeSelect.options || []);
  options.forEach(function (option) {
    if (option.value === 'none') {
      option.disabled = false;
      option.selected = !hasRules;
    } else {
      option.disabled = !hasRules;
      option.selected = hasRules && option.value === 'project';
    }
  });
  return hasRules;
}
function sharedImportRulesDiffer(sharedRules) {
  if (!Array.isArray(sharedRules) || !sharedRules.length) return false;
  if (typeof getAutoGearRules !== 'function') return true;
  try {
    var currentRules = getAutoGearRules();
    return stableStringify(sharedRules) !== stableStringify(currentRules || []);
  } catch (error) {
    console.warn('Failed to compare automatic gear rules', error);
    return true;
  }
}
function applyStoredSharedImport() {
  if (lastSharedSetupData === null) return;
  reapplySharedImportSelection();
}
function finalizeSharedImportPrompt() {
  sharedImportPromptActive = false;
  if (sharedImportDialog) closeDialog(sharedImportDialog);
}
function openSharedImportPrompt() {
  if (!sharedImportDialog) return;
  sharedImportPromptActive = true;
  openDialog(sharedImportDialog);
  var focusTarget = sharedImportModeSelect || sharedImportConfirmBtn || sharedImportCancelBtn;
  if (focusTarget && typeof focusTarget.focus === 'function') {
    focusTarget.focus();
  }
}
function processSharedProjectData(data) {
  try {
    sharedImportPromptActive = false;
    var parsed = typeof data === 'string' ? JSON.parse(data) : data;
    var sharedRules = Array.isArray(parsed.autoGearRules) ? parsed.autoGearRules : null;
    sharedImportPreparedForImport = false;
    prepareSharedImportContext();
    storeSharedImportData(parsed, sharedRules);
    updateSharedImportMetadataSummary(parsed && parsed.metadata);
    var hasRules = configureSharedImportOptions(sharedRules);
    var shouldPrompt = hasRules && sharedImportRulesDiffer(sharedRules) && !!sharedImportDialog;
    if (shouldPrompt) {
      openSharedImportPrompt();
      return;
    }
    applyStoredSharedImport();
  } catch (error) {
    clearStoredSharedImportData();
    console.error('Failed to parse shared project', error);
    alert(texts[currentLang].invalidSharedLink);
  }
}
function readSharedProjectFile(file) {
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function () {
    processSharedProjectData(reader.result);
  };
  reader.onerror = function () {
    console.error('Failed to load shared project file', reader.error);
    clearStoredSharedImportData();
    alert(texts[currentLang].invalidSharedLink);
  };
  reader.readAsText(file);
}
function prepareSharedImportContext() {
  if (sharedImportPreparedForImport) {
    return;
  }
  sharedImportPreparedForImport = true;
  try {
    if (typeof scheduleProjectAutoSave === 'function') {
      scheduleProjectAutoSave(true);
    } else if (typeof saveCurrentSession === 'function') {
      saveCurrentSession();
      if (typeof saveCurrentGearList === 'function') {
        saveCurrentGearList();
      }
    }
  } catch (error) {
    console.warn('Failed to persist current project before shared import', error);
  }
  var selectionCleared = false;
  if (setupSelect && typeof setupSelect.dispatchEvent === 'function') {
    try {
      var currentValue = typeof setupSelect.value === 'string' ? setupSelect.value : '';
      var typedName = setupNameInput && typeof setupNameInput.value === 'string' ? setupNameInput.value.trim() : '';
      var previousSelection = typeof lastSetupName === 'string' ? lastSetupName : '';
      var shouldDispatch = Boolean(currentValue || previousSelection || typedName);
      setupSelect.value = '';
      if (shouldDispatch) {
        setupSelect.dispatchEvent(new Event('change'));
      }
      selectionCleared = true;
    } catch (error) {
      console.warn('Failed to reset setup selection before shared import', error);
    }
  }
  if (selectionCleared && setupNameInput) {
    try {
      if (setupNameInput.value) {
        setupNameInput.value = '';
        setupNameInput.dispatchEvent(new Event('input'));
      }
    } catch (error) {
      console.warn('Failed to reset setup name before shared import', error);
    }
  }
}
function reapplySharedImportSelection() {
  if (lastSharedSetupData === null) return;
  var storedData = cloneSharedImportValue(lastSharedSetupData);
  if (!storedData) return;
  var storedRules = cloneSharedImportValue(lastSharedAutoGearRules);
  var mode = resolveSharedImportMode(storedRules);
  applySharedSetup(storedData, {
    autoGearMode: mode,
    sharedAutoGearRules: storedRules
  });
  updateCalculations();
}
function resolveSharedImportMode(sharedRules) {
  var hasRules = Array.isArray(sharedRules) && sharedRules.length > 0;
  if (!sharedImportModeSelect) {
    return hasRules ? 'project' : 'none';
  }
  var selectedValues = Array.from(sharedImportModeSelect.selectedOptions || []).map(function (option) {
    return option.value;
  }).filter(function (value) {
    return value === 'none' || value === 'project' || value === 'global';
  });
  if (!hasRules) {
    return 'none';
  }
  var modes = Array.from(new Set(selectedValues));
  if (!modes.length) {
    return 'project';
  }
  if (modes.length > 1 && modes.includes('none')) {
    modes = modes.filter(function (value) {
      return value !== 'none';
    });
  }
  if (!modes.length) {
    return 'project';
  }
  if (modes.length === 1) {
    return modes[0];
  }
  return modes;
}
function encodeSharedSetup(setup) {
  if (!setup || _typeof(setup) !== 'object') {
    return {};
  }
  var out = {};
  for (var index = 0; index < sharedKeyMapKeys.length; index += 1) {
    var _key3 = sharedKeyMapKeys[index];
    if (_key3 === 'gearList' || _key3 === 'projectHtml') {
      continue;
    }
    var _value = setup[_key3];
    if (_value != null) {
      out[sharedKeyMap[_key3]] = _value;
    }
  }
  return out;
}
function decodeSharedSetup(setup) {
  if (!setup || _typeof(setup) !== 'object') return {};
  var hasLongKeys = false;
  var hasShortKeys = false;
  var pendingKeys = [];
  for (var index = 0; index < sharedKeyMapKeys.length; index += 1) {
    var _key4 = sharedKeyMapKeys[index];
    var short = sharedKeyMap[_key4];
    var longPresent = sharedHasOwn.call(setup, _key4);
    var shortPresent = sharedHasOwn.call(setup, short);
    if (longPresent) {
      hasLongKeys = true;
    }
    if (shortPresent) {
      hasShortKeys = true;
      if (!longPresent && setup[short] != null) {
        pendingKeys.push(_key4);
      }
    }
  }
  if (!hasLongKeys && !hasShortKeys) {
    return {};
  }
  if (!hasLongKeys) {
    var expanded = {};
    for (var _index6 = 0; _index6 < sharedKeyMapKeys.length; _index6 += 1) {
      var _key5 = sharedKeyMapKeys[_index6];
      var _short = sharedKeyMap[_key5];
      var _value2 = setup[_short];
      if (_value2 != null) {
        expanded[_key5] = _value2;
      }
    }
    return expanded;
  }
  if (!pendingKeys.length) {
    return setup;
  }
  var merged = _objectSpread({}, setup);
  for (var _index7 = 0; _index7 < pendingKeys.length; _index7 += 1) {
    var _key6 = pendingKeys[_index7];
    if (!sharedHasOwn.call(merged, _key6)) {
      var _short2 = sharedKeyMap[_key6];
      var _value3 = setup[_short2];
      if (_value3 != null) {
        merged[_key6] = _value3;
      }
    }
  }
  return merged;
}
var deviceManagerSection = document.getElementById("device-manager");
var toggleDeviceBtn = document.getElementById("toggleDeviceManager");
var deviceListContainerRef = null;
function resolveDeviceListContainer() {
  if (typeof document === 'undefined' || !document || typeof document.getElementById !== 'function') {
    return deviceListContainerRef;
  }
  var container = document.getElementById('deviceListContainer');
  if (container) {
    deviceListContainerRef = container;
    return container;
  }
  return deviceListContainerRef;
}
var deviceManagerLists = function () {
  var globalScope = typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : typeof globalThis !== 'undefined' && globalThis ? globalThis : typeof window !== 'undefined' && window ? window : typeof self !== 'undefined' && self ? self : typeof global !== 'undefined' && global ? global : null;
  if (globalScope && globalScope.deviceManagerLists && globalScope.deviceManagerLists instanceof Map) {
    return globalScope.deviceManagerLists;
  }
  var created = new Map();
  if (globalScope && _typeof(globalScope) === 'object') {
    try {
      globalScope.deviceManagerLists = created;
    } catch (assignError) {
      void assignError;
      globalScope.deviceManagerLists = created;
    }
  }
  return created;
}();
var filterHelperScope = function () {
  if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) return CORE_GLOBAL_SCOPE;
  if (typeof globalThis !== 'undefined' && globalThis) return globalThis;
  if (typeof window !== 'undefined' && window) return window;
  if (typeof self !== 'undefined' && self) return self;
  if (typeof global !== 'undefined' && global) return global;
  return null;
}();
function fallbackFilterSelect(selectElem, filterValue) {
  if (!selectElem || _typeof(selectElem) !== "object") {
    return;
  }
  var text = (filterValue || "").toLowerCase();
  Array.from(selectElem.options || []).forEach(function (option) {
    if (!option || _typeof(option) !== "object") return;
    var isMatch = option.value === "None" || text === "" || (option.textContent || "").toLowerCase().includes(text);
    option.hidden = !isMatch;
    option.disabled = !isMatch;
  });
}
function fallbackFilterDeviceList(listElem, filterValue) {
  if (!listElem || _typeof(listElem) !== "object") {
    return;
  }
  var text = (filterValue || "").toLowerCase();
  Array.from(listElem.querySelectorAll ? listElem.querySelectorAll("li") : []).forEach(function (item) {
    if (!item || _typeof(item) !== "object") return;
    var summary = item.querySelector ? item.querySelector(".device-summary span") : null;
    var content = summary && typeof summary.textContent === "string" ? summary.textContent.toLowerCase() : "";
    item.style.display = text === "" || content.includes(text) ? "" : "none";
  });
}
function fallbackAddInputClearButton(inputElem, callback) {
  if (!inputElem || _typeof(inputElem) !== "object" || typeof inputElem.insertAdjacentElement !== "function") {
    return;
  }
  var translationSource = (typeof texts === "undefined" ? "undefined" : _typeof(texts)) === "object" && texts || typeof window !== "undefined" && _typeof(window.texts) === "object" && window.texts || null;
  var clearLabel = translationSource && translationSource[currentLang] && translationSource[currentLang].clearFilter || "Clear filter";
  var clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.className = "clear-input-btn";
  clearBtn.innerHTML = iconMarkup(ICON_GLYPHS.circleX, "clear-icon");
  clearBtn.setAttribute("aria-label", clearLabel);
  clearBtn.title = clearLabel;
  clearBtn.hidden = true;
  clearBtn.addEventListener("click", function () {
    inputElem.value = "";
    if (typeof callback === "function") {
      callback();
    }
    if (typeof inputElem.focus === "function") {
      inputElem.focus();
    }
  });
  inputElem.insertAdjacentElement("afterend", clearBtn);
  var toggle = function toggle() {
    clearBtn.hidden = !inputElem.value;
  };
  inputElem.addEventListener("input", toggle);
  toggle();
}
function fallbackBindFilterInput(inputElem, callback) {
  if (!inputElem || _typeof(inputElem) !== "object") {
    return;
  }
  var handler = typeof callback === "function" ? callback : function () {};
  inputElem.addEventListener("input", handler);
  inputElem.addEventListener("keydown", function (event) {
    if (event && event.key === "Escape") {
      inputElem.value = "";
      handler();
    }
  });
  fallbackAddInputClearButton(inputElem, handler);
}
function ensureFilterHelpers() {
  var scope = filterHelperScope && _typeof(filterHelperScope) === "object" ? filterHelperScope : {};
  var attachHelper = function attachHelper(key, fn) {
    if (typeof scope[key] === "function") {
      return;
    }
    try {
      scope[key] = fn;
    } catch (assignError) {
      try {
        Object.defineProperty(scope, key, {
          configurable: true,
          writable: true,
          value: fn
        });
      } catch (defineError) {
        void defineError;
      }
    }
  };
  attachHelper("filterSelect", fallbackFilterSelect);
  attachHelper("filterDeviceList", fallbackFilterDeviceList);
  attachHelper("bindFilterInput", fallbackBindFilterInput);
  attachHelper("addInputClearButton", fallbackAddInputClearButton);
  return scope;
}
ensureFilterHelpers();
function applyFilters() {
  var helpers = ensureFilterHelpers();
  var filterFn = typeof helpers.filterDeviceList === "function" ? helpers.filterDeviceList : fallbackFilterDeviceList;
  if (!(deviceManagerLists instanceof Map)) {
    return;
  }
  deviceManagerLists.forEach(function (entry) {
    if (!entry || _typeof(entry) !== "object") {
      return;
    }
    var list = entry.list,
      filterInput = entry.filterInput;
    if (!list || _typeof(list) !== "object") {
      return;
    }
    var value = filterInput && typeof filterInput.value === "string" ? filterInput.value : "";
    try {
      filterFn(list, value);
    } catch (filterError) {
      console.warn("Failed to apply device manager filters", filterError);
    }
  });
}
var DEVICE_MANAGER_DEFAULT_ORDER = Object.freeze(["cameras", "viewfinders", "monitors", "video", "wirelessReceivers", "directorMonitors", "iosVideo", "lenses", "fiz.motors", "fiz.controllers", "fiz.handUnits", "fiz.distance", "batteries", "batteryHotswaps", "accessories.batteries", "accessories.powerPlates", "accessories.cables", "accessories.cages", "accessories.cameraSupport", "accessories.cameraStabiliser", "accessories.chargers", "accessories.videoAssist", "accessories.media", "accessories.cardReaders", "accessories.filters", "accessories.matteboxes", "accessories.rigging", "accessories.grip", "accessories.sliders", "accessories.tripodHeads", "accessories.tripods", "accessories.carts"]);
function getDeviceManagerPreferredOrder() {
  var scopeCandidate = filterHelperScope;
  var scopedOrder = scopeCandidate && Array.isArray(scopeCandidate.deviceManagerPreferredOrder) ? scopeCandidate.deviceManagerPreferredOrder : null;
  if (scopedOrder && scopedOrder.every(function (entry) {
    return typeof entry === 'string' && entry;
  })) {
    return scopedOrder;
  }
  return DEVICE_MANAGER_DEFAULT_ORDER;
}
function normalizeCategoryKey(key) {
  var _devices0, _devices1, _devices10;
  if (!key) return null;
  if (key === "accessories" || key === "fiz" || key === "filterOptions") return null;
  if (key.startsWith("accessories.cables.")) return "accessories.cables";
  if (key === "videoAssist" && (_devices0 = devices) !== null && _devices0 !== void 0 && (_devices0 = _devices0.accessories) !== null && _devices0 !== void 0 && _devices0.videoAssist) return "accessories.videoAssist";
  if (key === "media" && (_devices1 = devices) !== null && _devices1 !== void 0 && (_devices1 = _devices1.accessories) !== null && _devices1 !== void 0 && _devices1.media) return "accessories.media";
  if (key === "cardReaders" && (_devices10 = devices) !== null && _devices10 !== void 0 && (_devices10 = _devices10.accessories) !== null && _devices10 !== void 0 && _devices10.cardReaders) return "accessories.cardReaders";
  return key;
}
function getCategoryLabel(categoryKey) {
  var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currentLang;
  if (!categoryKey) return "";
  var langNames = (typeof categoryNames === "undefined" ? "undefined" : _typeof(categoryNames)) === "object" && categoryNames && categoryNames[lang] || {};
  if (langNames[categoryKey]) return langNames[categoryKey];
  var fallbackNames = (typeof categoryNames === "undefined" ? "undefined" : _typeof(categoryNames)) === "object" && categoryNames && categoryNames.en || {};
  if (fallbackNames[categoryKey]) return fallbackNames[categoryKey];
  var parts = categoryKey.split('.');
  if (parts[0] === "accessories" && parts.length > 1) {
    var rest = parts.slice(1).map(function (part) {
      return humanizeKey(part);
    });
    return "".concat(humanizeKey('accessory'), " ").concat(rest.join(' ')).trim();
  }
  if (parts[0] === "fiz" && parts.length > 1) {
    var _rest = parts.slice(1).map(function (part) {
      return humanizeKey(part);
    });
    return "FIZ ".concat(_rest.join(' ')).trim();
  }
  return parts.map(function (part) {
    return humanizeKey(part);
  }).join(' ');
}
function collectDeviceManagerCategories() {
  var categories = new Set();
  var addCategory = function addCategory(key) {
    var normalized = normalizeCategoryKey(key);
    if (!normalized) return;
    categories.add(normalized);
  };
  var _traverseSchema = function traverseSchema(node) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    if (!node || _typeof(node) !== 'object') {
      return;
    }
    if (Array.isArray(node.attributes)) {
      var depth = path.length;
      var topLevelKey = path[0];
      if (depth === 1 || depth > 1 && (topLevelKey === 'accessories' || topLevelKey === 'fiz')) {
        addCategory(path.join('.'));
      }
    }
    Object.entries(node).forEach(function (_ref40) {
      var _ref41 = _slicedToArray(_ref40, 2),
        childKey = _ref41[0],
        value = _ref41[1];
      if (childKey === 'attributes') {
        return;
      }
      if (value && _typeof(value) === 'object') {
        _traverseSchema(value, path.concat(childKey));
      }
    });
  };
  if (deviceSchema) {
    _traverseSchema(deviceSchema, []);
  }
  var addFromData = function addFromData(data) {
    if (!data || _typeof(data) !== 'object' || Array.isArray(data)) return;
    Object.entries(data).forEach(function (_ref42) {
      var _ref43 = _slicedToArray(_ref42, 2),
        key = _ref43[0],
        value = _ref43[1];
      if (key === 'accessories') {
        if (value && _typeof(value) === 'object') {
          Object.entries(value).forEach(function (_ref44) {
            var _ref45 = _slicedToArray(_ref44, 2),
              subKey = _ref45[0],
              subValue = _ref45[1];
            if (subValue && _typeof(subValue) === 'object' && !Array.isArray(subValue)) {
              addCategory("accessories.".concat(subKey));
            }
          });
        }
      } else if (key === 'fiz') {
        if (value && _typeof(value) === 'object') {
          Object.entries(value).forEach(function (_ref46) {
            var _ref47 = _slicedToArray(_ref46, 2),
              subKey = _ref47[0],
              subValue = _ref47[1];
            if (subValue && _typeof(subValue) === 'object' && !Array.isArray(subValue)) {
              addCategory("fiz.".concat(subKey));
            }
          });
        }
      } else if (value && _typeof(value) === 'object' && !Array.isArray(value)) {
        addCategory(key);
      }
    });
  };
  addFromData(devices);
  var sorted = Array.from(categories);
  var preferredOrder = getDeviceManagerPreferredOrder();
  var orderMap = new Map(preferredOrder.map(function (key, index) {
    return [key, index];
  }));
  sorted.sort(function (a, b) {
    var idxA = orderMap.has(a) ? orderMap.get(a) : preferredOrder.length;
    var idxB = orderMap.has(b) ? orderMap.get(b) : preferredOrder.length;
    if (idxA !== idxB) return idxA - idxB;
    return a.localeCompare(b);
  });
  return sorted;
}
function createDeviceCategorySection(categoryKey) {
  var container = resolveDeviceListContainer();
  if (!container || deviceManagerLists.has(categoryKey)) return deviceManagerLists.get(categoryKey) || null;
  var section = document.createElement('div');
  section.className = 'device-category';
  var sanitizedId = categoryKey.replace(/[^a-z0-9]+/gi, '_');
  var heading = document.createElement('h4');
  heading.id = "category_".concat(sanitizedId);
  heading.dataset.categoryKey = categoryKey;
  section.appendChild(heading);
  var filterInput = document.createElement('input');
  filterInput.type = 'search';
  filterInput.className = 'list-filter';
  filterInput.id = "".concat(sanitizedId, "ListFilter");
  filterInput.dataset.categoryKey = categoryKey;
  var filterLabel = createHiddenLabel(ensureElementId(filterInput, "".concat(sanitizedId, "-list-filter")), "Filter ".concat(categoryKey));
  section.appendChild(filterLabel);
  section.appendChild(filterInput);
  var list = document.createElement('ul');
  list.className = 'device-ul';
  var listId = sanitizedId === 'cameras' ? 'cameraList' : "".concat(sanitizedId, "List");
  list.id = listId;
  if (sanitizedId === 'cameras') {
    list.setAttribute('data-current-id', 'camerasList');
  }
  section.appendChild(list);
  container.appendChild(section);
  var resolveFilterScope = function resolveFilterScope() {
    if (typeof globalThis !== 'undefined') return globalThis;
    if (typeof window !== 'undefined') return window;
    if (typeof self !== 'undefined') return self;
    if (typeof global !== 'undefined') return global;
    return null;
  };
  var attachFilterBinding = function attachFilterBinding() {
    var scope = resolveFilterScope();
    var bindFn = scope && scope.bindFilterInput;
    var filterFn = scope && scope.filterDeviceList;
    if (typeof bindFn !== 'function' || typeof filterFn !== 'function') {
      return false;
    }
    bindFn(filterInput, function () {
      return filterFn(list, filterInput.value);
    });
    return true;
  };
  if (!attachFilterBinding()) {
    enqueueCoreBootTask(function () {
      attachFilterBinding();
    });
  }
  var entry = {
    section: section,
    heading: heading,
    filterInput: filterInput,
    filterLabel: filterLabel,
    list: list,
    sanitizedId: sanitizedId
  };
  deviceManagerLists.set(categoryKey, entry);
  return entry;
}
function updateDeviceManagerLocalization() {
  var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentLang;
  if (!deviceManagerLists.size) return;
  var placeholderTemplate = texts[lang] && texts[lang].placeholder_filter || 'Filter {item}...';
  var clearLabel = texts[lang] && texts[lang].clearFilter || 'Clear filter';
  var librarySearchInput = document.getElementById('deviceLibrarySearch');
  var librarySearchLabel = document.getElementById('deviceLibrarySearchLabel');
  var librarySearchHelp = texts[lang] && texts[lang].deviceLibrarySearchHelp || 'Filter all categories and press Enter to jump to the best match.';
  var librarySearchPlaceholder = texts[lang] && texts[lang].deviceLibrarySearchPlaceholder || 'Search all device categories…';
  var librarySearchLabelText = texts[lang] && texts[lang].deviceLibrarySearchLabel || 'Search entire library';
  if (librarySearchLabel) {
    librarySearchLabel.textContent = librarySearchLabelText;
  }
  if (librarySearchInput) {
    librarySearchInput.placeholder = librarySearchPlaceholder;
    librarySearchInput.setAttribute('aria-label', librarySearchPlaceholder);
    librarySearchInput.setAttribute('data-help', librarySearchHelp);
    librarySearchInput.setAttribute('autocomplete', 'off');
    librarySearchInput.setAttribute('autocorrect', 'off');
    librarySearchInput.setAttribute('autocapitalize', 'off');
    librarySearchInput.setAttribute('spellcheck', 'false');
  }
  deviceManagerLists.forEach(function (entry, categoryKey) {
    var label = getCategoryLabel(categoryKey, lang);
    if (entry.heading) {
      entry.heading.textContent = label;
    }
    if (entry.filterInput) {
      var placeholder = placeholderTemplate.replace('{item}', label.toLowerCase());
      entry.filterInput.placeholder = placeholder;
      entry.filterInput.setAttribute('aria-label', placeholder);
      entry.filterInput.setAttribute('autocomplete', 'off');
      entry.filterInput.setAttribute('autocorrect', 'off');
      entry.filterInput.setAttribute('autocapitalize', 'off');
      entry.filterInput.setAttribute('spellcheck', 'false');
      entry.filterInput.setAttribute('inputmode', 'search');
      if (entry.filterLabel) {
        var labelText = placeholder.replace(/\s*(?:\.{3}|\u2026)$/, '');
        entry.filterLabel.textContent = labelText;
      }
      var clearBtn = entry.filterInput.nextElementSibling;
      if (clearBtn && clearBtn.classList.contains('clear-input-btn')) {
        clearBtn.setAttribute('aria-label', clearLabel);
        clearBtn.title = clearLabel;
      }
    }
  });
  var applyLibraryLocalization = filterHelperScope && typeof filterHelperScope.updateDeviceLibrarySearchLocalization === 'function' ? filterHelperScope.updateDeviceLibrarySearchLocalization : null;
  if (applyLibraryLocalization) {
    applyLibraryLocalization();
  }
}
function syncDeviceManagerCategories() {
  var container = resolveDeviceListContainer();
  if (!container) return;
  var categories = collectDeviceManagerCategories();
  var desiredSet = new Set(categories);
  var existingKeys = Array.from(deviceManagerLists.keys());
  categories.forEach(function (categoryKey) {
    if (!deviceManagerLists.has(categoryKey)) {
      createDeviceCategorySection(categoryKey);
    }
  });
  existingKeys.forEach(function (categoryKey) {
    if (!desiredSet.has(categoryKey)) {
      var entry = deviceManagerLists.get(categoryKey);
      if (entry && entry.section && entry.section.parentNode) {
        entry.section.parentNode.removeChild(entry.section);
      }
      deviceManagerLists.delete(categoryKey);
    }
  });
  categories.forEach(function (categoryKey) {
    var entry = deviceManagerLists.get(categoryKey);
    if (entry && entry.section) {
      container.appendChild(entry.section);
    }
  });
  updateDeviceManagerLocalization(currentLang);
}
function getCurrentProjectName() {
  var typedName = (setupNameInput && typeof setupNameInput.value === 'string' ? setupNameInput.value.trim() : '') || '';
  if (typedName) {
    return typedName;
  }
  return setupSelect && setupSelect.value || '';
}
exposeCoreRuntimeConstant('getCurrentProjectName', getCurrentProjectName);
function normalizeSetupName(value) {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim();
}
function getSetupNameState() {
  var rawTyped = setupNameInput && typeof setupNameInput.value === 'string' ? setupNameInput.value : '';
  var rawSelected = setupSelect && typeof setupSelect.value === 'string' ? setupSelect.value : '';
  var typedName = normalizeSetupName(rawTyped);
  var selectedName = normalizeSetupName(rawSelected);
  var typedNameHasTrailingWhitespace = Boolean(typedName && typeof rawTyped === 'string' && /\s$/.test(rawTyped));
  var renameInProgress = Boolean(selectedName && typedName && typedName !== selectedName);
  var storageKey = selectedName || typedName || '';
  return {
    typedName: typedName,
    selectedName: selectedName,
    renameInProgress: renameInProgress,
    storageKey: storageKey,
    typedNameHasTrailingWhitespace: typedNameHasTrailingWhitespace
  };
}
function createProjectInfoSnapshotForStorage(baseInfo) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (baseInfo == null || _typeof(baseInfo) !== 'object') {
    return baseInfo == null ? null : baseInfo;
  }
  var projectNameOverride = options.projectNameOverride;
  if (typeof projectNameOverride !== 'string' || !projectNameOverride) {
    return baseInfo;
  }
  if (typeof baseInfo.projectName === 'string' && normalizeSetupName(baseInfo.projectName) === projectNameOverride) {
    return baseInfo;
  }
  return _objectSpread(_objectSpread({}, baseInfo), {}, {
    projectName: projectNameOverride
  });
}
function getCurrentProjectStorageKey() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var typedName = setupNameInput && typeof setupNameInput.value === 'string' ? setupNameInput.value.trim() : '';
  var selectedName = setupSelect && typeof setupSelect.value === 'string' ? setupSelect.value.trim() : '';
  if (options.allowTyped && typedName) {
    return typedName;
  }
  if (selectedName) {
    return selectedName;
  }
  if (!setupSelect) {
    return '';
  }
  if (typedName && Array.from(setupSelect && setupSelect.options || []).some(function (option) {
    return option && option.value === typedName;
  })) {
    return typedName;
  }
  return '';
}
var newCategorySelect = document.getElementById("newCategory");
var newSubcategorySelect = document.getElementById("newSubcategory");
var subcategoryFieldDiv = document.getElementById("subcategoryField");
var newNameInput = document.getElementById("newName");
var newWattInput = document.getElementById("newWatt");
var wattFieldDiv = document.getElementById("wattField");
var dynamicFieldsDiv = document.getElementById("dynamicFields");
var cameraFieldsDiv = document.getElementById("cameraFields");
var cameraWattInput = document.getElementById("cameraWatt");
var cameraVoltageInput = document.getElementById("cameraVoltage");
var cameraPortTypeInput = document.getElementById("cameraPortType");
var monitorFieldsDiv = document.getElementById("monitorFields");
var monitorScreenSizeInput = document.getElementById("monitorScreenSize");
var monitorBrightnessInput = document.getElementById("monitorBrightness");
var monitorWattInput = document.getElementById("monitorWatt");
var monitorVoltageInput = document.getElementById("monitorVoltage");
var monitorPortTypeInput = document.getElementById("monitorPortType");
var monitorVideoInputsContainer = document.getElementById("monitorVideoInputsContainer");
var lensFieldsDiv = document.getElementById("lensFields");
var lensMountOptionsContainer = document.getElementById("lensMountOptionsContainer");
function _populateCategoryOptions() {
  if (!newCategorySelect && typeof document !== 'undefined') {
    newCategorySelect = document.getElementById('newCategory');
  }
  if (!newCategorySelect) return;
  newCategorySelect.innerHTML = '';
  var addOpt = function addOpt(val) {
    var opt = document.createElement('option');
    opt.value = val;
    opt.textContent = getCategoryLabel(val, currentLang);
    newCategorySelect.appendChild(opt);
  };
  if (deviceSchema) {
    if (deviceSchema.accessories) {
      for (var _i7 = 0, _Object$entries6 = Object.entries(deviceSchema.accessories); _i7 < _Object$entries6.length; _i7++) {
        var _Object$entries6$_i = _slicedToArray(_Object$entries6[_i7], 2),
          _sub = _Object$entries6$_i[0],
          obj = _Object$entries6$_i[1];
        if (_sub === 'cables') {
          addOpt('accessories.cables');
        } else if (obj && obj.attributes) {
          addOpt("accessories.".concat(_sub));
        }
      }
    }
    for (var _i8 = 0, _Object$entries7 = Object.entries(deviceSchema); _i8 < _Object$entries7.length; _i8++) {
      var _Object$entries7$_i = _slicedToArray(_Object$entries7[_i8], 2),
        _key7 = _Object$entries7$_i[0],
        _obj = _Object$entries7$_i[1];
      if (_key7 === 'accessories' || _key7 === 'fiz') continue;
      if (_obj && _obj.attributes) addOpt(_key7);
    }
    if (deviceSchema.fiz) {
      for (var _i9 = 0, _Object$entries8 = Object.entries(deviceSchema.fiz); _i9 < _Object$entries8.length; _i9++) {
        var _Object$entries8$_i = _slicedToArray(_Object$entries8[_i9], 2),
          _sub2 = _Object$entries8$_i[0],
          _obj2 = _Object$entries8$_i[1];
        if (_obj2 && _obj2.attributes) addOpt("fiz.".concat(_sub2));
      }
    }
  }
  if ((typeof devices === "undefined" ? "undefined" : _typeof(devices)) === 'object') {
    var existing = new Set(Array.from(newCategorySelect.options).map(function (o) {
      return o.value;
    }));
    var addIfMissing = function addIfMissing(val) {
      if (!existing.has(val)) {
        addOpt(val);
        existing.add(val);
      }
    };
    for (var _i0 = 0, _Object$entries9 = Object.entries(devices); _i0 < _Object$entries9.length; _i0++) {
      var _Object$entries9$_i = _slicedToArray(_Object$entries9[_i0], 2),
        _key8 = _Object$entries9$_i[0],
        _obj3 = _Object$entries9$_i[1];
      if (_key8 === 'accessories') {
        for (var _i1 = 0, _Object$keys = Object.keys(_obj3 || {}); _i1 < _Object$keys.length; _i1++) {
          var _sub3 = _Object$keys[_i1];
          addIfMissing("accessories.".concat(_sub3));
        }
      } else if (_key8 === 'fiz') {
        for (var _i10 = 0, _Object$keys2 = Object.keys(_obj3 || {}); _i10 < _Object$keys2.length; _i10++) {
          var _sub4 = _Object$keys2[_i10];
          addIfMissing("fiz.".concat(_sub4));
        }
      } else if (_obj3 && _typeof(_obj3) === 'object' && !Array.isArray(_obj3)) {
        addIfMissing(_key8);
      }
    }
  }
  syncDeviceManagerCategories();
}
_populateCategoryOptions();
function getCategoryContainer(categoryKey, subcategory) {
  var _ref48 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref48$create = _ref48.create,
    create = _ref48$create === void 0 ? false : _ref48$create;
  if (!categoryKey) {
    return null;
  }
  if (categoryKey === 'accessories.cables') {
    if (!subcategory) {
      return null;
    }
    if (!devices.accessories) {
      if (!create) return null;
      devices.accessories = {};
    }
    if (!devices.accessories.cables) {
      if (!create) return null;
      devices.accessories.cables = {};
    }
    if (!devices.accessories.cables[subcategory]) {
      if (!create) return null;
      devices.accessories.cables[subcategory] = {};
    }
    return devices.accessories.cables[subcategory];
  }
  if (categoryKey.includes('.')) {
    var _categoryKey$split = categoryKey.split('.'),
      _categoryKey$split2 = _slicedToArray(_categoryKey$split, 2),
      mainCat = _categoryKey$split2[0],
      subCat = _categoryKey$split2[1];
    if (!devices[mainCat]) {
      if (!create) return null;
      devices[mainCat] = {};
    }
    if (!devices[mainCat][subCat]) {
      if (!create) return null;
      devices[mainCat][subCat] = {};
    }
    return devices[mainCat][subCat];
  }
  if (!devices[categoryKey]) {
    if (!create) return null;
    devices[categoryKey] = {};
  }
  return devices[categoryKey];
}
function removeOriginalDeviceEntry(originalCategory, originalSubcategory, originalName, newCategory, newSubcategory, newName) {
  var _devices$accessories;
  if (!originalCategory || !originalName) {
    return;
  }
  var movedCategory = originalCategory !== newCategory;
  var movedSubcategory = originalCategory === 'accessories.cables' && originalSubcategory !== newSubcategory;
  var renamed = originalName !== newName;
  if (!movedCategory && !movedSubcategory && !renamed) {
    return;
  }
  var container = getCategoryContainer(originalCategory, originalCategory === 'accessories.cables' ? originalSubcategory : null, {
    create: false
  });
  if (!container || !Object.prototype.hasOwnProperty.call(container, originalName)) {
    return;
  }
  delete container[originalName];
  if (originalCategory === 'accessories.cables' && originalSubcategory && (_devices$accessories = devices.accessories) !== null && _devices$accessories !== void 0 && _devices$accessories.cables) {
    var existing = devices.accessories.cables[originalSubcategory];
    if (!existing || _typeof(existing) !== 'object') {
      devices.accessories.cables[originalSubcategory] = {};
    }
  }
}
var monitorVideoOutputsContainer = document.getElementById("monitorVideoOutputsContainer");
var monitorWirelessTxInput = document.getElementById("monitorWirelessTx");
var monitorLatencyInput = document.getElementById("monitorLatency");
var monitorAudioOutputInput = document.getElementById("monitorAudioOutput");
var viewfinderFieldsDiv = document.getElementById("viewfinderFields");
var viewfinderScreenSizeInput = document.getElementById("viewfinderScreenSize");
var viewfinderBrightnessInput = document.getElementById("viewfinderBrightness");
var viewfinderWattInput = document.getElementById("viewfinderWatt");
var viewfinderVoltageInput = document.getElementById("viewfinderVoltage");
var viewfinderPortTypeInput = document.getElementById("viewfinderPortType");
var viewfinderVideoInputsContainer = document.getElementById("viewfinderVideoInputsContainer");
var viewfinderVideoOutputsContainer = document.getElementById("viewfinderVideoOutputsContainer");
var viewfinderWirelessTxInput = document.getElementById("viewfinderWirelessTx");
var viewfinderLatencyInput = document.getElementById("viewfinderLatency");
var videoFieldsDiv = document.getElementById("videoFields");
var videoPowerInputsContainer = document.getElementById("videoPowerInputsContainer");
var videoVideoInputsContainer = document.getElementById("videoVideoInputsContainer");
var videoVideoOutputsContainer = document.getElementById("videoVideoOutputsContainer");
var videoFrequencyInput = document.getElementById("videoFrequency");
var videoLatencyInput = document.getElementById("videoLatency");
function normalizeTemperatureUnit(unit) {
  if (typeof unit === 'string') {
    var normalized = unit.trim().toLowerCase();
    if (normalized === CORE_TEMPERATURE_UNITS.fahrenheit) {
      return CORE_TEMPERATURE_UNITS.fahrenheit;
    }
    if (normalized === CORE_TEMPERATURE_UNITS.celsius) {
      return CORE_TEMPERATURE_UNITS.celsius;
    }
  }
  if (unit === CORE_TEMPERATURE_UNITS.fahrenheit) {
    return CORE_TEMPERATURE_UNITS.fahrenheit;
  }
  return CORE_TEMPERATURE_UNITS.celsius;
}
function getRuntimeTemperatureUnit() {
  var fallbackUnitCandidates = [];
  if (typeof temperatureUnit !== 'undefined') {
    fallbackUnitCandidates.push(temperatureUnit);
  }
  if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object') {
    fallbackUnitCandidates.push(CORE_GLOBAL_SCOPE.temperatureUnit);
  }
  if (typeof globalThis !== 'undefined' && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
    fallbackUnitCandidates.push(globalThis.temperatureUnit);
  }
  if (typeof window !== 'undefined' && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
    fallbackUnitCandidates.push(window.temperatureUnit);
  }
  if (typeof self !== 'undefined' && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
    fallbackUnitCandidates.push(self.temperatureUnit);
  }
  if (typeof global !== 'undefined' && global && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
    fallbackUnitCandidates.push(global.temperatureUnit);
  }
  for (var index = 0; index < fallbackUnitCandidates.length; index += 1) {
    var candidate = fallbackUnitCandidates[index];
    if (typeof candidate === 'string' && candidate) {
      return candidate;
    }
  }
  return CORE_TEMPERATURE_UNITS.celsius;
}
function convertCelsiusToUnit(value, unit) {
  var numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return Number.NaN;
  }
  var resolvedUnit = normalizeTemperatureUnit(typeof unit === 'undefined' ? getRuntimeTemperatureUnit() : unit);
  if (resolvedUnit === CORE_TEMPERATURE_UNITS.fahrenheit) {
    return numeric * 9 / 5 + 32;
  }
  return numeric;
}
function getTemperatureUnitSymbolForLang() {
  var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentLang;
  var unit = arguments.length > 1 ? arguments[1] : undefined;
  var resolvedUnit = normalizeTemperatureUnit(typeof unit === 'undefined' ? getRuntimeTemperatureUnit() : unit);
  var textsForLang = getLanguageTexts(lang);
  var fallbackTexts = getLanguageTexts('en');
  var key = resolvedUnit === CORE_TEMPERATURE_UNITS.fahrenheit ? 'temperatureUnitSymbolFahrenheit' : 'temperatureUnitSymbolCelsius';
  return textsForLang[key] || fallbackTexts[key] || (resolvedUnit === CORE_TEMPERATURE_UNITS.fahrenheit ? '°F' : '°C');
}
function getTemperatureUnitLabelForLang() {
  var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentLang;
  var unit = arguments.length > 1 ? arguments[1] : undefined;
  var resolvedUnit = normalizeTemperatureUnit(typeof unit === 'undefined' ? getRuntimeTemperatureUnit() : unit);
  var textsForLang = getLanguageTexts(lang);
  var fallbackTexts = getLanguageTexts('en');
  var key = resolvedUnit === CORE_TEMPERATURE_UNITS.fahrenheit ? 'temperatureUnitFahrenheit' : 'temperatureUnitCelsius';
  return textsForLang[key] || fallbackTexts[key] || (resolvedUnit === CORE_TEMPERATURE_UNITS.fahrenheit ? 'Fahrenheit (°F)' : 'Celsius (°C)');
}
function getTemperatureColumnLabelForLang() {
  var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentLang;
  var unit = arguments.length > 1 ? arguments[1] : undefined;
  var textsForLang = getLanguageTexts(lang);
  var fallbackTexts = getLanguageTexts('en');
  var baseLabel = textsForLang.temperatureLabel || fallbackTexts.temperatureLabel || 'Temperature';
  var symbol = getTemperatureUnitSymbolForLang(lang, typeof unit === 'undefined' ? getRuntimeTemperatureUnit() : unit);
  return "".concat(baseLabel, " (").concat(symbol, ")");
}
function formatTemperatureForDisplay(celsius) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _ref49 = options || {},
    unit = _ref49.unit,
    _ref49$lang = _ref49.lang,
    lang = _ref49$lang === void 0 ? currentLang : _ref49$lang,
    _ref49$includeSign = _ref49.includeSign,
    includeSign = _ref49$includeSign === void 0 ? true : _ref49$includeSign;
  var resolvedUnit = normalizeTemperatureUnit(typeof unit === 'undefined' ? getRuntimeTemperatureUnit() : unit);
  var converted = convertCelsiusToUnit(celsius, resolvedUnit);
  if (!Number.isFinite(converted)) {
    return '';
  }
  var textsForLang = getLanguageTexts(lang);
  var fallbackTexts = getLanguageTexts('en');
  var formatter = resolvedUnit === CORE_TEMPERATURE_UNITS.fahrenheit ? textsForLang.temperatureFormatterFahrenheit || fallbackTexts.temperatureFormatterFahrenheit : textsForLang.temperatureFormatterCelsius || fallbackTexts.temperatureFormatterCelsius;
  if (typeof formatter === 'function') {
    return formatter(converted, {
      includeSign: includeSign
    });
  }
  var rounded = Math.round(converted * 10) / 10;
  var formatted = includeSign && rounded > 0 ? "+".concat(rounded) : String(rounded);
  var symbol = getTemperatureUnitSymbolForLang(lang, resolvedUnit);
  return "".concat(formatted, " ").concat(symbol).trim();
}
(function installViewfinderFallbacks() {
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || {};
  var hasDocument = typeof document !== 'undefined' && !!document && typeof document.createElement === 'function';
  var ensureFunction = function ensureFunction(name, factory) {
    if (typeof scope[name] === 'function') {
      return scope[name];
    }
    var created = typeof factory === 'function' ? factory() : factory;
    if (typeof created === 'function') {
      try {
        scope[name] = created;
      } catch (assignError) {
        void assignError;
      }
    }
    return created;
  };
  var ensureArrayBinding = function ensureArrayBinding(name, values) {
    if (Array.isArray(scope[name])) {
      return scope[name];
    }
    var copy = Array.isArray(values) ? values.slice() : [];
    try {
      scope[name] = copy;
    } catch (assignError) {
      void assignError;
      scope[name] = copy;
    }
    return scope[name];
  };
  var defaultVideoPortOptions = ['3G-SDI', '6G-SDI', '12G-SDI', 'Mini BNC', 'HDMI', 'Mini HDMI', 'Micro HDMI'];
  var defaultViewfinderTypes = ['Electronic Viewfinder', 'Optical Viewfinder', 'LCD Monitor', 'OLED Viewfinder'];
  var defaultViewfinderConnectors = ['BNC', 'Mini BNC', 'HDMI', 'Mini HDMI', 'Micro HDMI'];
  var safeLocaleSort = typeof localeSort === 'function' ? localeSort : function (a, b) {
    return String(a || '').localeCompare(String(b || ''), undefined, {
      sensitivity: 'base'
    });
  };
  var readDevices = function readDevices() {
    return typeof devices !== 'undefined' && devices && (typeof devices === "undefined" ? "undefined" : _typeof(devices)) === 'object' ? devices : {};
  };
  var collectValues = function collectValues(defaults, collector) {
    var values = new Set((defaults || []).filter(Boolean));
    try {
      collector(values);
    } catch (collectionError) {
      void collectionError;
    }
    return Array.from(values).filter(Boolean).sort(safeLocaleSort);
  };
  var collectViewfinderTypes = function collectViewfinderTypes() {
    var result = collectValues(defaultViewfinderTypes, function (valueSet) {
      var data = readDevices();
      Object.values(data.cameras || {}).forEach(function (camera) {
        if (!camera) return;
        var list = Array.isArray(camera.viewfinder) ? camera.viewfinder : [];
        list.forEach(function (entry) {
          var type = typeof (entry === null || entry === void 0 ? void 0 : entry.type) === 'string' ? entry.type.trim() : '';
          if (type) valueSet.add(type);
        });
      });
    });
    ensureArrayBinding('viewfinderTypeOptions', result);
    return result;
  };
  var collectViewfinderConnectors = function collectViewfinderConnectors() {
    var result = collectValues(defaultViewfinderConnectors, function (valueSet) {
      var data = readDevices();
      Object.values(data.cameras || {}).forEach(function (camera) {
        if (!camera) return;
        var list = Array.isArray(camera.viewfinder) ? camera.viewfinder : [];
        list.forEach(function (entry) {
          var connector = typeof (entry === null || entry === void 0 ? void 0 : entry.connector) === 'string' ? entry.connector.trim() : '';
          if (connector) valueSet.add(connector);
        });
      });
    });
    ensureArrayBinding('viewfinderConnectorOptions', result);
    return result;
  };
  var collectVideoPortOptions = function collectVideoPortOptions() {
    var result = collectValues(defaultVideoPortOptions, function (valueSet) {
      var data = readDevices();
      var appendPorts = function appendPorts(list) {
        if (!Array.isArray(list)) return;
        list.forEach(function (entry) {
          if (typeof entry === 'string') {
            var normalized = entry.trim();
            if (normalized) valueSet.add(normalized);
            return;
          }
          var type = typeof (entry === null || entry === void 0 ? void 0 : entry.type) === 'string' ? entry.type.trim() : '';
          if (type) valueSet.add(type);
          var portType = typeof (entry === null || entry === void 0 ? void 0 : entry.portType) === 'string' ? entry.portType.trim() : '';
          if (portType) valueSet.add(portType);
        });
      };
      Object.values(data.cameras || {}).forEach(function (camera) {
        if (!camera) return;
        appendPorts(camera.videoInputs);
        appendPorts(camera.videoOutputs);
      });
      Object.values(data.monitors || {}).forEach(function (monitor) {
        if (!monitor) return;
        appendPorts(monitor.videoInputs);
        appendPorts(monitor.videoOutputs);
      });
    });
    return result;
  };
  ensureFunction('getAllViewfinderTypes', function () {
    return collectViewfinderTypes;
  });
  ensureFunction('getAllViewfinderConnectors', function () {
    return collectViewfinderConnectors;
  });
  if (!hasDocument) {
    ensureFunction('setViewfinders', function () {
      return function noopSetViewfinders() {};
    });
    ensureFunction('getViewfinders', function () {
      return function noopGetViewfinders() {
        return [];
      };
    });
    ensureFunction('clearViewfinders', function () {
      return function noopClearViewfinders() {};
    });
    ensureFunction('setViewfinderVideoInputs', function () {
      return function noopSetViewfinderVideoInputs() {};
    });
    ensureFunction('getViewfinderVideoInputs', function () {
      return function noopGetViewfinderVideoInputs() {
        return [];
      };
    });
    ensureFunction('clearViewfinderVideoInputs', function () {
      return function noopClearViewfinderVideoInputs() {};
    });
    ensureFunction('setViewfinderVideoOutputs', function () {
      return function noopSetViewfinderVideoOutputs() {};
    });
    ensureFunction('getViewfinderVideoOutputs', function () {
      return function noopGetViewfinderVideoOutputs() {
        return [];
      };
    });
    ensureFunction('clearViewfinderVideoOutputs', function () {
      return function noopClearViewfinderVideoOutputs() {};
    });
    return;
  }
  var resolveContainer = function resolveContainer(id) {
    var _document;
    if (!hasDocument || typeof ((_document = document) === null || _document === void 0 ? void 0 : _document.getElementById) !== 'function') {
      return null;
    }
    try {
      return document.getElementById(id);
    } catch (resolveError) {
      void resolveError;
      return null;
    }
  };
  var viewfinderContainerEl = resolveContainer('viewfinderContainer');
  var viewfinderInputsContainerEl = resolveContainer('viewfinderVideoInputsContainer');
  var viewfinderOutputsContainerEl = resolveContainer('viewfinderVideoOutputsContainer');
  var ensureContainers = [['setViewfinders', viewfinderContainerEl], ['getViewfinders', viewfinderContainerEl], ['clearViewfinders', viewfinderContainerEl]];
  var missingRequiredContainer = ensureContainers.some(function (_ref50) {
    var _ref51 = _slicedToArray(_ref50, 2),
      name = _ref51[0],
      container = _ref51[1];
    if (container) {
      return false;
    }
    ensureFunction(name, function () {
      return name === 'getViewfinders' ? function () {
        return [];
      } : function () {};
    });
    return true;
  });
  if (missingRequiredContainer) {
    return;
  }
  var fallbackIdCounter = 0;
  var ensureElementId = function ensureElementId(element, baseText) {
    if (!element) {
      return '';
    }
    if (element.id) {
      return element.id;
    }
    var base = typeof baseText === 'string' && baseText ? baseText : 'field';
    fallbackIdCounter += 1;
    var candidate = "".concat(base.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'field', "-").concat(fallbackIdCounter);
    try {
      element.id = candidate;
    } catch (assignError) {
      void assignError;
    }
    return element.id || candidate;
  };
  var createHiddenLabel = function createHiddenLabel(id, text) {
    var label = document.createElement('label');
    label.className = 'visually-hidden';
    if (id) {
      label.setAttribute('for', id);
    }
    label.textContent = typeof text === 'string' ? text : '';
    return label;
  };
  var createFieldWithLabel = function createFieldWithLabel(field, labelText) {
    var wrapper = document.createElement('div');
    wrapper.className = 'field-with-label';
    wrapper.dataset.label = labelText;
    var fieldId = ensureElementId(field, labelText);
    wrapper.appendChild(createHiddenLabel(fieldId, labelText));
    wrapper.appendChild(field);
    return wrapper;
  };
  var populateSelectOptions = function populateSelectOptions(select, options, value) {
    if (!select) {
      return;
    }
    var seen = new Set();
    select.innerHTML = '';
    var addOption = function addOption(val, label) {
      if (seen.has(val)) {
        return;
      }
      var option = document.createElement('option');
      option.value = val;
      option.textContent = typeof label === 'string' ? label : val;
      select.appendChild(option);
      seen.add(val);
    };
    addOption('', '');
    options.forEach(function (optVal) {
      if (typeof optVal !== 'string') {
        return;
      }
      var trimmed = optVal.trim();
      if (!trimmed) {
        return;
      }
      addOption(trimmed, trimmed);
    });
    if (typeof value === 'string' && value && !seen.has(value)) {
      addOption(value, value);
    }
    select.value = typeof value === 'string' ? value : '';
  };
  var _createViewfinderRow = function createViewfinderRow() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var resolution = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var connector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var notes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var row = document.createElement('div');
    row.className = 'form-row';
    var typeSelect = document.createElement('select');
    typeSelect.className = 'viewfinder-type-select';
    typeSelect.name = 'viewfinderType';
    populateSelectOptions(typeSelect, collectViewfinderTypes(), typeof type === 'string' ? type.trim() : '');
    row.appendChild(createFieldWithLabel(typeSelect, 'Type'));
    var resolutionInput = document.createElement('input');
    resolutionInput.type = 'text';
    resolutionInput.name = 'viewfinderResolution';
    resolutionInput.placeholder = 'Resolution';
    resolutionInput.value = typeof resolution === 'string' ? resolution : '';
    row.appendChild(createFieldWithLabel(resolutionInput, 'Resolution'));
    var connectorSelect = document.createElement('select');
    connectorSelect.className = 'viewfinder-connector-select';
    connectorSelect.name = 'viewfinderConnector';
    populateSelectOptions(connectorSelect, collectViewfinderConnectors(), typeof connector === 'string' ? connector.trim() : '');
    row.appendChild(createFieldWithLabel(connectorSelect, 'Connector'));
    var notesInput = document.createElement('input');
    notesInput.type = 'text';
    notesInput.name = 'viewfinderNotes';
    notesInput.placeholder = 'Notes';
    notesInput.value = typeof notes === 'string' ? notes : '';
    row.appendChild(createFieldWithLabel(notesInput, 'Notes'));
    var addBtn = document.createElement('button');
    addBtn.type = 'button';
    configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
      contextPaths: ['viewfinderHeading', ['cameraViewfinderLabel']],
      fallbackContext: 'Viewfinder',
      actionKey: 'addEntry'
    });
    addBtn.addEventListener('click', function () {
      row.after(_createViewfinderRow());
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
      if (viewfinderContainerEl && viewfinderContainerEl.children.length > 1) {
        row.remove();
      } else {
        Array.from(row.querySelectorAll('select, input')).forEach(function (field) {
          if (field) {
            field.value = '';
          }
        });
      }
    });
    row.appendChild(removeBtn);
    return row;
  };
  var _createViewfinderVideoRow = function createViewfinderVideoRow(container, name, contextHeadingId, contextLabelId, fallbackContext) {
    var value = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
    if (!container) {
      return null;
    }
    var row = document.createElement('div');
    row.className = 'form-row';
    var select = document.createElement('select');
    select.name = name;
    select.className = "".concat(name, "-select");
    populateSelectOptions(select, collectVideoPortOptions(), typeof value === 'string' ? value.trim() : '');
    row.appendChild(createFieldWithLabel(select, 'Type'));
    var addBtn = document.createElement('button');
    addBtn.type = 'button';
    configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
      contextPaths: [contextHeadingId, [contextLabelId]],
      fallbackContext: fallbackContext,
      actionKey: 'addEntry'
    });
    addBtn.addEventListener('click', function () {
      row.after(_createViewfinderVideoRow(container, name, contextHeadingId, contextLabelId, fallbackContext));
    });
    row.appendChild(addBtn);
    var removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
      contextPaths: [contextHeadingId, [contextLabelId]],
      fallbackContext: fallbackContext,
      actionKey: 'removeEntry'
    });
    removeBtn.addEventListener('click', function () {
      if (container.children.length > 1) {
        row.remove();
      } else {
        select.value = '';
      }
    });
    row.appendChild(removeBtn);
    return row;
  };
  var setViewfindersFallback = function setViewfindersFallback(list) {
    if (!viewfinderContainerEl) {
      return;
    }
    viewfinderContainerEl.innerHTML = '';
    var entries = Array.isArray(list) ? list : [];
    if (!entries.length) {
      viewfinderContainerEl.appendChild(_createViewfinderRow());
      return;
    }
    entries.forEach(function (entry) {
      var type = typeof (entry === null || entry === void 0 ? void 0 : entry.type) === 'string' ? entry.type : '';
      var resolution = typeof (entry === null || entry === void 0 ? void 0 : entry.resolution) === 'string' ? entry.resolution : '';
      var connector = typeof (entry === null || entry === void 0 ? void 0 : entry.connector) === 'string' ? entry.connector : '';
      var notes = typeof (entry === null || entry === void 0 ? void 0 : entry.notes) === 'string' ? entry.notes : '';
      viewfinderContainerEl.appendChild(_createViewfinderRow(type, resolution, connector, notes));
    });
  };
  var getViewfindersFallback = function getViewfindersFallback() {
    if (!viewfinderContainerEl) {
      return [];
    }
    return Array.from(viewfinderContainerEl.querySelectorAll('.form-row')).map(function (row) {
      var _row$querySelectorAll = row.querySelectorAll('select, input'),
        _row$querySelectorAll2 = _slicedToArray(_row$querySelectorAll, 4),
        typeSelect = _row$querySelectorAll2[0],
        resolutionInput = _row$querySelectorAll2[1],
        connectorSelect = _row$querySelectorAll2[2],
        notesInput = _row$querySelectorAll2[3];
      return {
        type: typeSelect ? typeSelect.value : '',
        resolution: resolutionInput ? resolutionInput.value : '',
        connector: connectorSelect ? connectorSelect.value : '',
        notes: notesInput ? notesInput.value : ''
      };
    }).filter(function (entry) {
      return entry.type;
    });
  };
  var clearViewfindersFallback = function clearViewfindersFallback() {
    setViewfindersFallback([]);
  };
  var setViewfinderVideoInputsFallback = function setViewfinderVideoInputsFallback(list) {
    if (!viewfinderInputsContainerEl) {
      return;
    }
    viewfinderInputsContainerEl.innerHTML = '';
    var entries = Array.isArray(list) ? list : [];
    if (!entries.length) {
      var row = _createViewfinderVideoRow(viewfinderInputsContainerEl, 'viewfinderVideoInput', 'viewfinderVideoInputsHeading', 'viewfinderVideoInputsLabel', 'Video Inputs');
      if (row) {
        viewfinderInputsContainerEl.appendChild(row);
      }
      return;
    }
    entries.forEach(function (entry) {
      var value = typeof entry === 'string' ? entry : typeof (entry === null || entry === void 0 ? void 0 : entry.type) === 'string' ? entry.type : '';
      var row = _createViewfinderVideoRow(viewfinderInputsContainerEl, 'viewfinderVideoInput', 'viewfinderVideoInputsHeading', 'viewfinderVideoInputsLabel', 'Video Inputs', value);
      if (row) {
        viewfinderInputsContainerEl.appendChild(row);
      }
    });
  };
  var getViewfinderVideoInputsFallback = function getViewfinderVideoInputsFallback() {
    if (!viewfinderInputsContainerEl) {
      return [];
    }
    return Array.from(viewfinderInputsContainerEl.querySelectorAll('select')).map(function (select) {
      return {
        type: select.value
      };
    }).filter(function (entry) {
      return entry.type;
    });
  };
  var clearViewfinderVideoInputsFallback = function clearViewfinderVideoInputsFallback() {
    setViewfinderVideoInputsFallback([]);
  };
  var setViewfinderVideoOutputsFallback = function setViewfinderVideoOutputsFallback(list) {
    if (!viewfinderOutputsContainerEl) {
      return;
    }
    viewfinderOutputsContainerEl.innerHTML = '';
    var entries = Array.isArray(list) ? list : [];
    if (!entries.length) {
      var row = _createViewfinderVideoRow(viewfinderOutputsContainerEl, 'viewfinderVideoOutput', 'viewfinderVideoOutputsHeading', 'viewfinderVideoOutputsLabel', 'Video Outputs');
      if (row) {
        viewfinderOutputsContainerEl.appendChild(row);
      }
      return;
    }
    entries.forEach(function (entry) {
      var value = typeof entry === 'string' ? entry : typeof (entry === null || entry === void 0 ? void 0 : entry.type) === 'string' ? entry.type : '';
      var row = _createViewfinderVideoRow(viewfinderOutputsContainerEl, 'viewfinderVideoOutput', 'viewfinderVideoOutputsHeading', 'viewfinderVideoOutputsLabel', 'Video Outputs', value);
      if (row) {
        viewfinderOutputsContainerEl.appendChild(row);
      }
    });
  };
  var getViewfinderVideoOutputsFallback = function getViewfinderVideoOutputsFallback() {
    if (!viewfinderOutputsContainerEl) {
      return [];
    }
    return Array.from(viewfinderOutputsContainerEl.querySelectorAll('select')).map(function (select) {
      return {
        type: select.value
      };
    }).filter(function (entry) {
      return entry.type;
    });
  };
  var clearViewfinderVideoOutputsFallback = function clearViewfinderVideoOutputsFallback() {
    setViewfinderVideoOutputsFallback([]);
  };
  ensureFunction('setViewfinders', function () {
    return setViewfindersFallback;
  });
  ensureFunction('getViewfinders', function () {
    return getViewfindersFallback;
  });
  ensureFunction('clearViewfinders', function () {
    return clearViewfindersFallback;
  });
  ensureFunction('setViewfinderVideoInputs', function () {
    return setViewfinderVideoInputsFallback;
  });
  ensureFunction('getViewfinderVideoInputs', function () {
    return getViewfinderVideoInputsFallback;
  });
  ensureFunction('clearViewfinderVideoInputs', function () {
    return clearViewfinderVideoInputsFallback;
  });
  ensureFunction('setViewfinderVideoOutputs', function () {
    return setViewfinderVideoOutputsFallback;
  });
  ensureFunction('getViewfinderVideoOutputs', function () {
    return getViewfinderVideoOutputsFallback;
  });
  ensureFunction('clearViewfinderVideoOutputs', function () {
    return clearViewfinderVideoOutputsFallback;
  });
  if (viewfinderContainerEl && !viewfinderContainerEl.children.length) {
    setViewfindersFallback([]);
  }
  if (viewfinderInputsContainerEl && !viewfinderInputsContainerEl.children.length) {
    setViewfinderVideoInputsFallback([]);
  }
  if (viewfinderOutputsContainerEl && !viewfinderOutputsContainerEl.children.length) {
    setViewfinderVideoOutputsFallback([]);
  }
})();
function showFormSection(section) {
  if (!section) return;
  section.classList.remove('hidden');
  if (typeof section.removeAttribute === 'function') {
    section.removeAttribute('hidden');
  }
  section.hidden = false;
  section.style.display = '';
}
function hideFormSection(section) {
  if (!section) return;
  section.classList.add('hidden');
  if (typeof section.setAttribute === 'function') {
    section.setAttribute('hidden', '');
  }
  section.hidden = true;
  section.style.display = 'none';
}
var addDeviceForm = wattFieldDiv ? wattFieldDiv.parentNode : null;
function placeWattField(category, data) {
  if (!wattFieldDiv || !addDeviceForm) return;
  var isVideoLike = category === "video" || category === "wirelessReceivers" || category === "iosVideo";
  if (isVideoLike && typeof videoFieldsDiv !== 'undefined' && videoFieldsDiv) {
    addDeviceForm.insertBefore(wattFieldDiv, videoFieldsDiv);
  } else {
    addDeviceForm.insertBefore(wattFieldDiv, cameraFieldsDiv);
  }
}
try {
  exposeCoreRuntimeConstant('placeWattField', placeWattField);
} catch (error) {
  void error;
  if (typeof window !== 'undefined') window.placeWattField = placeWattField;
}
var motorFieldsDiv = document.getElementById("motorFields");
var motorConnectorInput = document.getElementById("motorConnector");
var motorInternalInput = document.getElementById("motorInternal");
var motorTorqueInput = document.getElementById("motorTorque");
var motorGearInput = document.getElementById("motorGearTypes");
var motorNotesInput = document.getElementById("motorNotes");
var controllerFieldsDiv = document.getElementById("controllerFields");
var controllerConnectorInput = document.getElementById("controllerConnector");
var controllerPowerInput = document.getElementById("controllerPower");
var controllerBatteryInput = document.getElementById("controllerBattery");
var controllerConnectivityInput = document.getElementById("controllerConnectivity");
var controllerNotesInput = document.getElementById("controllerNotes");
var distanceFieldsDiv = document.getElementById("distanceFields");
var distanceConnectionInput = document.getElementById("distanceConnection");
var distanceMethodInput = document.getElementById("distanceMethod");
var distanceRangeInput = document.getElementById("distanceRange");
var distanceAccuracyInput = document.getElementById("distanceAccuracy");
var distanceOutputInput = document.getElementById("distanceOutput");
var distanceNotesInput = document.getElementById("distanceNotes");
var batteryPlatesContainer = document.getElementById("batteryPlatesContainer");
var cameraMediaContainer = document.getElementById("cameraMediaContainer");
var lensMountContainer = document.getElementById("lensMountContainer");
var lensFocusScaleSelect = document.getElementById("lensFocusScaleUnit");
var powerDistContainer = document.getElementById("powerDistContainer");
var videoOutputsContainer = document.getElementById("videoOutputsContainer");
var fizConnectorContainer = document.getElementById("fizConnectorContainer");
var viewfinderContainer = document.getElementById("viewfinderContainer");
var timecodeContainer = document.getElementById("timecodeContainer");
var batteryFieldsDiv = document.getElementById("batteryFields");
var newCapacityInput = document.getElementById("newCapacity");
var newPinAInput = document.getElementById("newPinA");
var newDtapAInput = document.getElementById("newDtapA");
var dtapRow = newDtapAInput ? newDtapAInput.parentElement : null;
var addDeviceBtn = document.getElementById("addDeviceBtn");
var cancelEditBtn = document.getElementById("cancelEditBtn");
var exportBtn = document.getElementById("exportDataBtn");
var exportOutput = document.getElementById("exportOutput");
var importFileInput = document.getElementById("importFileInput");
var importDataBtn = document.getElementById("importDataBtn");
var skipLink = document.getElementById("skipLink");
function resolveGlobalFocusScalePreference() {
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  var scopePreference = scope && typeof scope.focusScalePreference === 'string' ? scope.focusScalePreference : null;
  var rawPreference = scopePreference || (typeof focusScalePreference === 'string' ? focusScalePreference : null) || 'metric';
  if (typeof normalizeFocusScale === 'function') {
    try {
      var _normalized = normalizeFocusScale(rawPreference);
      if (_normalized === 'imperial' || _normalized === 'metric') {
        return _normalized;
      }
    } catch (focusScaleNormalizeError) {
      void focusScaleNormalizeError;
    }
  }
  var normalized = typeof rawPreference === 'string' ? rawPreference.trim().toLowerCase() : '';
  return normalized === 'imperial' ? 'imperial' : 'metric';
}
var monitorExcludedAttributes = ["screenSizeInches", "brightnessNits", "power", "powerDrawWatts", "videoInputs", "videoOutputs", "wirelessTx", "latencyMs", "audioOutput"];
var categoryExcludedAttrs = {
  batteries: ["capacity", "pinA", "dtapA"],
  batteryHotswaps: ["capacity", "pinA"],
  "accessories.batteries": ["capacity", "pinA"],
  cameras: ["powerDrawWatts", "power", "recordingMedia", "lensMount", "videoOutputs", "fizConnectors", "viewfinder", "timecode"],
  lenses: ["mount", "mountOptions", "focusScale"],
  monitors: monitorExcludedAttributes,
  directorMonitors: monitorExcludedAttributes,
  viewfinders: ["screenSizeInches", "brightnessNits", "power", "powerDrawWatts", "videoInputs", "videoOutputs", "wirelessTx", "latencyMs"],
  video: ["powerDrawWatts", "power", "videoInputs", "videoOutputs", "frequency", "latencyMs"],
  wirelessReceivers: ["powerDrawWatts", "power", "videoInputs", "videoOutputs", "frequency", "latencyMs"],
  iosVideo: ["powerDrawWatts", "power", "videoInputs", "videoOutputs", "frequency", "latencyMs"],
  "fiz.motors": ["fizConnectors", "gearTypes", "internalController", "notes", "powerDrawWatts", "torqueNm"],
  "fiz.controllers": ["batteryType", "connectivity", "fizConnectors", "internalController", "notes", "powerDrawWatts", "powerSource"],
  "fiz.distance": ["accuracy", "connectionCompatibility", "measurementMethod", "measurementRange", "notes", "outputDisplay", "powerDrawWatts"]
};
function updateLensFocusScaleSelectOptions() {
  var _texts11;
  var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentLang;
  var _ref52 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref52$preserveValue = _ref52.preserveValue,
    preserveValue = _ref52$preserveValue === void 0 ? true : _ref52$preserveValue;
  if (!lensFocusScaleSelect) {
    return;
  }
  var previousValue = preserveValue ? lensFocusScaleSelect.value : '';
  var language = typeof lang === 'string' ? lang : currentLang;
  var languageTexts = texts && language && texts[language] ? texts[language] : ((_texts11 = texts) === null || _texts11 === void 0 ? void 0 : _texts11.en) || {};
  var defaultLabelBase = languageTexts.lensFocusScaleDefault || languageTexts.focusScaleSetting || 'Use global focus scale';
  var metricLabel = languageTexts.focusScaleMetric || 'Metric';
  var imperialLabel = languageTexts.focusScaleImperial || 'Imperial';
  var globalPreference = resolveGlobalFocusScalePreference();
  var defaultLabel = globalPreference === 'imperial' ? "".concat(defaultLabelBase, " (").concat(imperialLabel, ")") : "".concat(defaultLabelBase, " (").concat(metricLabel, ")");
  var desiredValue = previousValue && (previousValue === 'metric' || previousValue === 'imperial') ? previousValue : '';
  lensFocusScaleSelect.innerHTML = '';
  var addOption = function addOption(value, label) {
    var option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    lensFocusScaleSelect.appendChild(option);
  };
  addOption('', defaultLabel);
  addOption('metric', metricLabel);
  addOption('imperial', imperialLabel);
  lensFocusScaleSelect.value = desiredValue;
}
var schemaFieldConfigs = {
  '*': {
    brand: {
      type: 'text',
      placeholder: 'ARRI'
    },
    model: {
      type: 'text',
      placeholder: 'Mini LF'
    },
    notes: {
      type: 'textarea',
      rows: 3,
      placeholder: 'Additional notes'
    }
  },
  batteries: {
    mount_type: {
      type: 'text',
      placeholder: 'V-Mount'
    },
    pinV: {
      type: 'number',
      step: '0.1',
      suffix: 'V'
    },
    weight_g: {
      type: 'number',
      step: '1',
      suffix: 'g'
    }
  },
  'accessories.batteries': {
    mount_type: {
      type: 'text',
      placeholder: 'V-Mount'
    },
    pinV: {
      type: 'number',
      step: '0.1',
      suffix: 'V'
    },
    weight_g: {
      type: 'number',
      step: '1',
      suffix: 'g'
    }
  },
  batteryHotswaps: {
    mount_type: {
      type: 'text',
      placeholder: 'Gold Mount'
    },
    pinV: {
      type: 'number',
      step: '0.1',
      suffix: 'V'
    },
    weight_g: {
      type: 'number',
      step: '1',
      suffix: 'g'
    }
  },
  cameras: {
    recordingCodecs: {
      type: 'list',
      placeholder: 'ProRes 422 HQ'
    },
    frameRates: {
      type: 'list',
      placeholder: '4K 120 fps'
    },
    resolutions: {
      type: 'list',
      placeholder: '4.5K Open Gate'
    },
    sensorModes: {
      type: 'list',
      placeholder: 'LF Open Gate'
    },
    viewfinder: {
      type: 'json',
      rows: 4
    },
    timecode: {
      type: 'json',
      rows: 3
    },
    weight_g: {
      type: 'number',
      step: '1',
      suffix: 'g'
    }
  },
  monitors: {
    audioInput: {
      type: 'text',
      placeholder: '3.5mm stereo'
    },
    audioIo: {
      type: 'text',
      placeholder: 'SDI / HDMI'
    },
    audioOutput: {
      type: 'text',
      placeholder: '3.5mm stereo'
    },
    bluetooth: {
      type: 'boolean'
    },
    latencyMs: {
      type: 'text',
      placeholder: '< 1ms'
    },
    wireless: {
      type: 'text',
      placeholder: 'Bolt 6'
    },
    wirelessRX: {
      type: 'boolean'
    },
    wirelessTx: {
      type: 'boolean'
    }
  },
  directorMonitors: {
    audioInput: {
      type: 'text',
      placeholder: '3.5mm stereo'
    },
    audioIo: {
      type: 'text',
      placeholder: 'SDI / HDMI'
    },
    audioOutput: {
      type: 'text',
      placeholder: '3.5mm stereo'
    },
    bluetooth: {
      type: 'boolean'
    },
    latencyMs: {
      type: 'text',
      placeholder: '< 1ms'
    },
    wireless: {
      type: 'text',
      placeholder: 'Bolt 6'
    },
    wirelessRX: {
      type: 'boolean'
    },
    wirelessTx: {
      type: 'boolean'
    }
  },
  video: {
    frequency: {
      type: 'text',
      placeholder: '5 GHz'
    },
    latencyMs: {
      type: 'text',
      placeholder: '1 ms'
    }
  },
  wirelessReceivers: {
    frequency: {
      type: 'text',
      placeholder: '5 GHz'
    },
    latencyMs: {
      type: 'text',
      placeholder: '1 ms'
    }
  },
  iosVideo: {
    frequency: {
      type: 'text',
      placeholder: '5 GHz'
    },
    latencyMs: {
      type: 'text',
      placeholder: '1 ms'
    }
  },
  'fiz.motors': {
    gearTypes: {
      type: 'list',
      placeholder: '0.8 MOD'
    },
    internalController: {
      type: 'boolean'
    }
  },
  'fiz.controllers': {
    connectivity: {
      type: 'text',
      placeholder: '2.4 GHz'
    },
    internalController: {
      type: 'boolean'
    }
  },
  'fiz.distance': {
    accuracy: {
      type: 'text',
      placeholder: '± 1"'
    }
  }
};
function formatAttributeLabel(attr) {
  return attr.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/^./, function (ch) {
    return ch.toUpperCase();
  }).trim();
}
function resolveSchemaFieldConfig(category, attr) {
  if (!category) return schemaFieldConfigs['*'][attr] || null;
  var parts = category.split('.');
  while (parts.length) {
    var _key9 = parts.join('.');
    if (schemaFieldConfigs[_key9] && schemaFieldConfigs[_key9][attr]) {
      return schemaFieldConfigs[_key9][attr];
    }
    parts.pop();
  }
  return schemaFieldConfigs['*'][attr] || null;
}
function autoRows(text) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  if (!text) return min;
  var lines = text.split('\n').length + 1;
  return Math.max(min, Math.min(max, lines));
}
function normalizeSchemaListValues(value) {
  if (Array.isArray(value)) {
    return value.map(function (item) {
      return item === null || item === undefined ? '' : String(item).trim();
    }).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value.split(/\r?\n/).map(function (item) {
      return item.trim();
    }).filter(Boolean);
  }
  return [];
}
function createSchemaListControl(options) {
  var _ref53 = options || {},
    attrId = _ref53.attrId,
    labelText = _ref53.labelText,
    _ref53$values = _ref53.values,
    values = _ref53$values === void 0 ? [] : _ref53$values,
    _ref53$placeholder = _ref53.placeholder,
    placeholder = _ref53$placeholder === void 0 ? '' : _ref53$placeholder;
  var ensureId = typeof ensureElementId === 'function' ? ensureElementId : function (element, baseText) {
    if (!element) return '';
    if (element.id) return element.id;
    var base = (baseText || 'field').toString().toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'field';
    var counter = 0;
    var candidate = '';
    do {
      counter += 1;
      candidate = "".concat(base, "-").concat(counter);
    } while (typeof document !== 'undefined' && document.getElementById(candidate));
    try {
      element.id = candidate;
    } catch (assignError) {
      void assignError;
    }
    return element.id || candidate;
  };
  var createLabel = typeof createHiddenLabel === 'function' ? createHiddenLabel : function (forId, text) {
    var label = document.createElement('label');
    label.className = 'visually-hidden';
    if (forId) label.setAttribute('for', forId);
    label.textContent = typeof text === 'string' ? text : '';
    return label;
  };
  var container = document.createElement('div');
  container.className = 'schema-list-control';
  container.id = attrId;
  container.dataset.attrType = 'list';
  var listBody = document.createElement('div');
  listBody.className = 'schema-list-body';
  var normalizedValues = normalizeSchemaListValues(values);
  var normalizedPlaceholder = typeof placeholder === 'string' ? placeholder : '';
  var fallbackContext = typeof labelText === 'string' && labelText ? labelText : attrId || '';
  var _createRow = function createRow() {
    var initialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var row = document.createElement('div');
    row.className = 'schema-list-row';
    var inputWrapper = document.createElement('div');
    inputWrapper.className = 'schema-list-row-input';
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'schema-input schema-list-input';
    input.dataset.listItem = 'true';
    if (normalizedPlaceholder) {
      input.placeholder = normalizedPlaceholder;
    }
    input.value = initialValue === null || initialValue === undefined ? '' : String(initialValue);
    var inputId = ensureId(input, "".concat(attrId || 'list', "-item"));
    inputWrapper.appendChild(createLabel(inputId, labelText));
    inputWrapper.appendChild(input);
    var actions = document.createElement('div');
    actions.className = 'schema-list-row-actions';
    var addBtn = document.createElement('button');
    addBtn.type = 'button';
    if (typeof configureIconOnlyButton === 'function' && typeof ICON_GLYPHS !== 'undefined') {
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        fallbackContext: fallbackContext,
        actionKey: 'addEntry'
      });
    } else {
      addBtn.textContent = '+';
      addBtn.setAttribute('aria-label', 'Add');
    }
    addBtn.addEventListener('click', function () {
      var newRow = _createRow('');
      row.after(newRow);
      var nextInput = newRow.querySelector('[data-list-item="true"]');
      if (nextInput && typeof nextInput.focus === 'function') {
        nextInput.focus();
      }
    });
    var removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    if (typeof configureIconOnlyButton === 'function' && typeof ICON_GLYPHS !== 'undefined') {
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        fallbackContext: fallbackContext,
        actionKey: 'removeEntry'
      });
    } else {
      removeBtn.textContent = '−';
      removeBtn.setAttribute('aria-label', 'Remove');
    }
    removeBtn.addEventListener('click', function () {
      var rows = Array.from(listBody.querySelectorAll('.schema-list-row'));
      if (rows.length > 1) {
        row.remove();
        return;
      }
      input.value = '';
      if (typeof input.focus === 'function') {
        input.focus();
      }
    });
    actions.appendChild(addBtn);
    actions.appendChild(removeBtn);
    row.appendChild(inputWrapper);
    row.appendChild(actions);
    return row;
  };
  if (normalizedValues.length) {
    normalizedValues.forEach(function (val) {
      listBody.appendChild(_createRow(val));
    });
  } else {
    listBody.appendChild(_createRow(''));
  }
  container.appendChild(listBody);
  return container;
}
function createSchemaField(category, attr, value) {
  var config = resolveSchemaFieldConfig(category, attr) || {};
  var attrId = "attr-".concat(attr);
  var labelText = config.label || formatAttributeLabel(attr);
  var inputType = config.type;
  if (!inputType) {
    if (Array.isArray(value)) {
      inputType = value.every(function (item) {
        return typeof item === 'string';
      }) ? 'list' : 'json';
    } else if (typeof value === 'number') {
      inputType = 'number';
    } else if (typeof value === 'boolean') {
      inputType = 'boolean';
    } else if (value && _typeof(value) === 'object') {
      inputType = 'json';
    } else {
      inputType = 'text';
    }
  }
  if (inputType === 'boolean') {
    var _row = document.createElement('div');
    _row.className = 'form-row schema-form-row';
    var _label2 = document.createElement('label');
    _label2.setAttribute('for', attrId);
    _label2.textContent = labelText;
    _row.appendChild(_label2);
    var _controlContainer = document.createElement('div');
    _controlContainer.className = 'schema-control schema-control--checkbox';
    var _inlineWrap = document.createElement('div');
    _inlineWrap.className = 'schema-control-inline';
    var input = document.createElement('input');
    input.type = 'checkbox';
    input.id = attrId;
    input.className = 'schema-input schema-input--checkbox';
    input.dataset.attrType = 'boolean';
    input.checked = value === undefined ? !!config.default : !!value;
    _inlineWrap.appendChild(input);
    _controlContainer.appendChild(_inlineWrap);
    if (config.help) {
      var help = document.createElement('p');
      help.className = 'schema-field-help';
      help.textContent = config.help;
      _controlContainer.appendChild(help);
    }
    _row.appendChild(_controlContainer);
    return _row;
  }
  var row = document.createElement('div');
  row.className = 'form-row schema-form-row';
  var label = document.createElement('label');
  label.setAttribute('for', attrId);
  label.textContent = labelText;
  row.appendChild(label);
  var control;
  if (inputType === 'list') {
    control = createSchemaListControl({
      attrId: attrId,
      labelText: labelText,
      values: value,
      placeholder: config.placeholder
    });
  } else if (inputType === 'json' || inputType === 'textarea') {
    control = document.createElement('textarea');
    control.className = 'schema-input schema-input--textarea';
    control.id = attrId;
    var textValue = value === undefined || value === null ? '' : inputType === 'list' && Array.isArray(value) ? value.join('\n') : typeof value === 'string' ? value : JSON.stringify(value, null, 2);
    control.value = textValue;
    control.rows = config.rows || autoRows(control.value);
  } else {
    control = document.createElement('input');
    control.className = 'schema-input';
    control.id = attrId;
    control.type = inputType === 'number' ? 'number' : 'text';
    if (inputType === 'number') {
      if (config.step) control.step = config.step;
    }
    if (value !== undefined && value !== null) {
      control.value = value;
    }
  }
  if (control && control.dataset) {
    control.dataset.attrType = inputType;
  }
  if (config.placeholder && !control.value) {
    control.placeholder = config.placeholder;
  }
  var controlContainer = document.createElement('div');
  controlContainer.className = 'schema-control';
  var inlineWrap = document.createElement('div');
  inlineWrap.className = 'schema-control-inline';
  inlineWrap.appendChild(control);
  if (config.suffix) {
    var suffix = document.createElement('span');
    suffix.className = 'schema-field-suffix';
    suffix.textContent = config.suffix;
    inlineWrap.appendChild(suffix);
  }
  controlContainer.appendChild(inlineWrap);
  if (config.help) {
    var _help = document.createElement('p');
    _help.className = 'schema-field-help';
    _help.textContent = config.help;
    controlContainer.appendChild(_help);
  }
  row.appendChild(controlContainer);
  return row;
}
function getSchemaAttributesForCategory(category) {
  if (!deviceSchema) return [];
  var parts = category.split('.');
  var node = deviceSchema;
  var _iterator3 = _createForOfIteratorHelper(parts),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var p = _step3.value;
      node = node && node[p];
      if (!node) return [];
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return Array.isArray(node.attributes) ? node.attributes : [];
}
function getCombinedCategoryAttributes(category) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var seen = new Set();
  var attrs = [];
  var skip = function skip(attr) {
    return !attr || exclude.includes(attr) || seen.has(attr);
  };
  var _iterator4 = _createForOfIteratorHelper(getSchemaAttributesForCategory(category)),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var attr = _step4.value;
      if (skip(attr)) continue;
      seen.add(attr);
      attrs.push(attr);
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  if (data && _typeof(data) === 'object' && !Array.isArray(data)) {
    for (var _i11 = 0, _Object$keys3 = Object.keys(data); _i11 < _Object$keys3.length; _i11++) {
      var _key0 = _Object$keys3[_i11];
      if (skip(_key0)) continue;
      seen.add(_key0);
      attrs.push(_key0);
    }
  }
  return attrs;
}
function clearDynamicFields() {
  if (!dynamicFieldsDiv) return;
  dynamicFieldsDiv.innerHTML = '';
  dynamicFieldsDiv.hidden = true;
  if (dynamicFieldsDiv.dataset) {
    delete dynamicFieldsDiv.dataset.attrs;
  }
}
function buildDynamicFields(category) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  if (!dynamicFieldsDiv) return;
  var attrs = getCombinedCategoryAttributes(category, data, exclude);
  dynamicFieldsDiv.innerHTML = '';
  if (!attrs.length) {
    dynamicFieldsDiv.hidden = true;
    if (dynamicFieldsDiv.dataset) {
      delete dynamicFieldsDiv.dataset.attrs;
    }
    return;
  }
  dynamicFieldsDiv.hidden = false;
  if (dynamicFieldsDiv.dataset) {
    dynamicFieldsDiv.dataset.attrs = JSON.stringify(attrs);
  }
  var list = document.createElement('div');
  list.className = 'schema-attribute-list';
  var _iterator5 = _createForOfIteratorHelper(attrs),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var attr = _step5.value;
      var _value4 = data && data[attr] !== undefined ? data[attr] : undefined;
      list.appendChild(createSchemaField(category, attr, _value4));
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  dynamicFieldsDiv.appendChild(list);
}
var COLLECTED_DYNAMIC_ATTRS_SYMBOL = typeof Symbol === 'function' ? Symbol('collectedDynamicAttrs') : '__collectedDynamicAttrs';
function markCollectedDynamicAttributes(target, attrs) {
  if (!target || !Array.isArray(attrs)) {
    return;
  }
  try {
    Object.defineProperty(target, COLLECTED_DYNAMIC_ATTRS_SYMBOL, {
      configurable: true,
      enumerable: false,
      value: attrs.slice()
    });
  } catch (error) {
    void error;
  }
}
function getCollectedDynamicAttributes(source) {
  if (!source || _typeof(source) !== 'object') {
    return [];
  }
  var attrs = source[COLLECTED_DYNAMIC_ATTRS_SYMBOL];
  return Array.isArray(attrs) ? attrs : [];
}
function removeClearedDynamicAttributes(target, attrs, values) {
  if (!target || !Array.isArray(attrs)) {
    return;
  }
  attrs.forEach(function (attr) {
    if (Object.prototype.hasOwnProperty.call(target, attr) && !Object.prototype.hasOwnProperty.call(values, attr)) {
      delete target[attr];
    }
  });
}
function collectDynamicFieldValues(category) {
  var exclude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var attrs = [];
  var rawDynamicFieldAttrs = '';
  var excludeSnapshot = Array.isArray(exclude) ? exclude.slice() : exclude;
  if (dynamicFieldsDiv && dynamicFieldsDiv.dataset && dynamicFieldsDiv.dataset.attrs) {
    rawDynamicFieldAttrs = String(dynamicFieldsDiv.dataset.attrs);
    try {
      var parsed = JSON.parse(rawDynamicFieldAttrs);
      if (Array.isArray(parsed)) {
        attrs = parsed;
      }
    } catch (err) {
      var LOG_ATTR_SNIPPET_LIMIT = 500;
      var rawAttrsSnippet = rawDynamicFieldAttrs.slice(0, LOG_ATTR_SNIPPET_LIMIT);
      console.warn('Failed to parse dynamic field attributes', {
        error: err,
        rawAttrsSnippet: rawAttrsSnippet,
        rawAttrsTruncated: rawDynamicFieldAttrs.length > LOG_ATTR_SNIPPET_LIMIT,
        category: category,
        exclude: excludeSnapshot
      });
    }
  }
  if (!attrs.length) {
    attrs = getCombinedCategoryAttributes(category, {}, exclude);
  }
  var filteredAttrs = attrs.filter(function (attr) {
    return !exclude.includes(attr);
  });
  var result = {};
  var _iterator6 = _createForOfIteratorHelper(filteredAttrs),
    _step6;
  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var attr = _step6.value;
      var el = document.getElementById("attr-".concat(attr));
      if (!el) {
        continue;
      }
      var type = el.dataset.attrType || el.type;
      if (type === 'boolean') {
        result[attr] = el.checked;
        continue;
      }
      if (type === 'list') {
        var listInputs = Array.from(el.querySelectorAll('[data-list-item="true"]'));
        var list = [];
        if (listInputs.length) {
          list = listInputs.map(function (input) {
            return typeof input.value === 'string' ? input.value.trim() : '';
          }).filter(Boolean);
        } else if (typeof el.value === 'string') {
          list = el.value.split('\n').map(function (item) {
            return item.trim();
          }).filter(Boolean);
        }
        if (list.length) {
          result[attr] = list;
        }
        continue;
      }
      if (type === 'json') {
        var raw = el.value.trim();
        if (raw) {
          try {
            result[attr] = JSON.parse(raw);
          } catch (_unused2) {
            result[attr] = raw;
          }
        }
        continue;
      }
      if (type === 'number') {
        var num = parseFloat(el.value);
        if (!isNaN(num)) {
          result[attr] = num;
        }
        continue;
      }
      if (el.value !== '') {
        result[attr] = el.value;
      }
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
  markCollectedDynamicAttributes(result, filteredAttrs);
  return result;
}
function cloneDynamicFieldTarget(target) {
  var clone = {};
  if (typeof Object.getPrototypeOf === 'function' && typeof Object.setPrototypeOf === 'function') {
    try {
      Object.setPrototypeOf(clone, Object.getPrototypeOf(target));
    } catch (protoError) {
      void protoError;
    }
  }
  var keys = typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function' ? Reflect.ownKeys(target) : Object.getOwnPropertyNames(target);
  for (var index = 0; index < keys.length; index += 1) {
    var _key1 = keys[index];
    var descriptor = void 0;
    try {
      descriptor = Object.getOwnPropertyDescriptor(target, _key1);
    } catch (descError) {
      descriptor = null;
    }
    if (!descriptor) {
      continue;
    }
    var nextDescriptor = {
      configurable: true,
      enumerable: !!descriptor.enumerable
    };
    if (Object.prototype.hasOwnProperty.call(descriptor, 'value')) {
      nextDescriptor.value = descriptor.value;
      nextDescriptor.writable = true;
    } else {
      nextDescriptor.get = descriptor.get;
      nextDescriptor.set = descriptor.set;
    }
    try {
      Object.defineProperty(clone, _key1, nextDescriptor);
    } catch (defineError) {
      void defineError;
      clone[_key1] = descriptor.value;
    }
  }
  return clone;
}
function ensureWritableDynamicFieldTarget(target, attrs) {
  if (!target || _typeof(target) !== 'object') {
    return {};
  }
  var requiresClone = false;
  try {
    if (typeof Object.isExtensible === 'function' && !Object.isExtensible(target)) {
      requiresClone = true;
    }
  } catch (extensibleError) {
    void extensibleError;
  }
  if (!requiresClone && Array.isArray(attrs)) {
    for (var index = 0; index < attrs.length; index += 1) {
      var attr = attrs[index];
      var descriptor = void 0;
      try {
        descriptor = Object.getOwnPropertyDescriptor(target, attr);
      } catch (descriptorError) {
        descriptor = null;
      }
      if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, 'writable') && descriptor.writable === false && descriptor.configurable === false) {
        requiresClone = true;
        break;
      }
    }
  }
  if (!requiresClone) {
    return target;
  }
  return cloneDynamicFieldTarget(target);
}
function applyDynamicFieldValues(target, category) {
  var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var values = collectDynamicFieldValues(category, exclude);
  var attrs = getCollectedDynamicAttributes(values);
  var writableTarget = ensureWritableDynamicFieldTarget(target, attrs);
  try {
    Object.assign(writableTarget, values);
  } catch (assignError) {
    var fallbackTarget = cloneDynamicFieldTarget(writableTarget);
    try {
      Object.assign(fallbackTarget, values);
      writableTarget = fallbackTarget;
    } catch (fallbackError) {
      console.error('Failed to apply dynamic field values', fallbackError);
    }
  }
  removeClearedDynamicAttributes(writableTarget, attrs, values);
  return writableTarget;
}
var languageSelect = document.getElementById("languageSelect");
var pinkModeToggle = document.getElementById("pinkModeToggle");
var pinkModeHelpIcon = document.getElementById("pinkModeHelpIcon");
var darkModeToggle = document.getElementById("darkModeToggle");
var helpButton = document.getElementById("helpButton");
var reloadButton = document.getElementById("reloadButton");
var helpDialog = document.getElementById("helpDialog");
var closeHelpBtn = document.getElementById("closeHelp");
var helpSearch = document.getElementById("helpSearch");
var helpNoResults = document.getElementById("helpNoResults");
var helpNoResultsSuggestions = document.getElementById("helpNoResultsSuggestions");
var helpNoResultsSuggestionsHeading = document.getElementById("helpNoResultsSuggestionsHeading");
var helpNoResultsSuggestionsIntro = document.getElementById("helpNoResultsSuggestionsIntro");
var helpNoResultsSuggestionClear = document.getElementById("helpNoResultsSuggestionClear");
var helpNoResultsSuggestionSynonyms = document.getElementById("helpNoResultsSuggestionSynonyms");
var helpNoResultsSuggestionQuickStart = document.getElementById("helpNoResultsSuggestionQuickStart");
var helpNoResultsSuggestionBackup = document.getElementById("helpNoResultsSuggestionBackup");
var helpDataAuditHeading = document.getElementById("helpDataAuditHeading");
var helpDataAuditStep1 = document.getElementById("helpDataAuditStep1");
var helpDataAuditStep2 = document.getElementById("helpDataAuditStep2");
var helpDataAuditStep3 = document.getElementById("helpDataAuditStep3");
var helpDataAuditStep4 = document.getElementById("helpDataAuditStep4");
var helpDataAuditNote = document.getElementById("helpDataAuditNote");
var helpResultsSummary = document.getElementById("helpResultsSummary");
var helpResultsAssist = document.getElementById("helpResultsAssist");
var helpSearchClear = document.getElementById("helpSearchClear");
var helpSectionsContainer = document.getElementById("helpSections");
var helpQuickLinksNav = document.getElementById("helpQuickLinks");
var helpQuickLinksHeading = document.getElementById("helpQuickLinksHeading");
var helpQuickLinksList = document.getElementById("helpQuickLinksList");
var installPromptBanner;
var installPromptBannerText;
var installPromptBannerAction;
var installPromptBannerIcon;
var installPromptBannerDismiss;
var installGuideDialog;
var installGuideTitle;
var installGuideIntro;
var installGuideSteps;
var installGuideNote;
var installGuideMigration;
var installGuideMigrationTitle;
var installGuideMigrationIntro;
var installGuideMigrationSteps;
var installGuideMigrationNote;
var installGuideClose;
var iosPwaHelpDialog = document.getElementById("iosPwaHelpDialog");
var iosPwaHelpTitle;
var iosPwaHelpIntro;
var iosPwaHelpStep1;
var installPromptElementsInitialized = false;
function ensureInstallPromptElements() {
  if (installPromptElementsInitialized && installPromptBanner) {
    return;
  }
  if (typeof document === 'undefined') {
    installPromptElementsInitialized = true;
    installPromptBanner = installPromptBanner || null;
    installPromptBannerText = installPromptBannerText || null;
    installPromptBannerAction = installPromptBannerAction || null;
    installPromptBannerIcon = installPromptBannerIcon || null;
    installPromptBannerDismiss = installPromptBannerDismiss || null;
    installGuideDialog = installGuideDialog || null;
    installGuideTitle = installGuideTitle || null;
    installGuideIntro = installGuideIntro || null;
    installGuideSteps = installGuideSteps || null;
    installGuideNote = installGuideNote || null;
    installGuideMigration = installGuideMigration || null;
    installGuideMigrationTitle = installGuideMigrationTitle || null;
    installGuideMigrationIntro = installGuideMigrationIntro || null;
    installGuideMigrationSteps = installGuideMigrationSteps || null;
    installGuideMigrationNote = installGuideMigrationNote || null;
    installGuideClose = installGuideClose || null;
    iosPwaHelpTitle = iosPwaHelpTitle || null;
    iosPwaHelpIntro = iosPwaHelpIntro || null;
    iosPwaHelpStep1 = iosPwaHelpStep1 || null;
    return;
  }
  installPromptBanner = document.getElementById('installPromptBanner');
  installPromptBannerText = document.getElementById('installPromptBannerText');
  installPromptBannerAction = document.getElementById('installPromptBannerAction');
  installPromptBannerIcon = document.getElementById('installPromptBannerIcon');
  installPromptBannerDismiss = document.getElementById('installPromptBannerDismiss');
  installGuideDialog = document.getElementById('installGuideDialog');
  installGuideTitle = document.getElementById('installGuideTitle');
  installGuideIntro = document.getElementById('installGuideIntro');
  installGuideSteps = document.getElementById('installGuideSteps');
  installGuideNote = document.getElementById('installGuideNote');
  installGuideMigration = document.getElementById('installGuideMigration');
  installGuideMigrationTitle = document.getElementById('installGuideMigrationTitle');
  installGuideMigrationIntro = document.getElementById('installGuideMigrationIntro');
  installGuideMigrationSteps = document.getElementById('installGuideMigrationSteps');
  installGuideMigrationNote = document.getElementById('installGuideMigrationNote');
  installGuideClose = document.getElementById('installGuideClose');
  iosPwaHelpTitle = document.getElementById('iosPwaHelpTitle');
  iosPwaHelpIntro = document.getElementById('iosPwaHelpIntro');
  iosPwaHelpStep1 = document.getElementById('iosPwaHelpStep1');
  installPromptElementsInitialized = true;
}
var syncResetButtonGlobal = (typeof globalThis !== 'undefined' && globalThis && typeof globalThis.syncMountVoltageResetButtonGlobal === 'function' ? globalThis.syncMountVoltageResetButtonGlobal : null) || (typeof syncMountVoltageResetButtonGlobal === 'function' ? syncMountVoltageResetButtonGlobal : function noopSyncMountVoltageResetButtonGlobal() {});
var mountVoltageSectionElem = document.getElementById('mountVoltageSettings');
var mountVoltageHeadingElem = document.getElementById('mountVoltageHeading');
var mountVoltageDescriptionElem = document.getElementById('mountVoltageDescription');
var mountVoltageNoteElem = document.getElementById('mountVoltageNote');
var mountVoltageResetButton = document.getElementById('mountVoltageReset');
syncResetButtonGlobal(mountVoltageResetButton);
var mountVoltageTitleElems = {
  V: document.getElementById('mountVoltageVTitle'),
  Gold: document.getElementById('mountVoltageGoldTitle'),
  B: document.getElementById('mountVoltageBTitle')
};
var mountVoltageInputs = {
  'V-Mount': {
    high: document.getElementById('mountVoltageVHigh'),
    low: document.getElementById('mountVoltageVLow'),
    highLabel: document.getElementById('mountVoltageVHighLabel'),
    lowLabel: document.getElementById('mountVoltageVLowLabel')
  },
  'Gold-Mount': {
    high: document.getElementById('mountVoltageGoldHigh'),
    low: document.getElementById('mountVoltageGoldLow'),
    highLabel: document.getElementById('mountVoltageGoldHighLabel'),
    lowLabel: document.getElementById('mountVoltageGoldLowLabel')
  },
  'B-Mount': {
    high: document.getElementById('mountVoltageBHigh'),
    low: document.getElementById('mountVoltageBLow'),
    highLabel: document.getElementById('mountVoltageBHighLabel'),
    lowLabel: document.getElementById('mountVoltageBLowLabel')
  }
};
var mountVoltageNamespace = typeof setMountVoltageDomReferences === 'function' ? {
  setDomReferences: setMountVoltageDomReferences
} : CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' && CORE_GLOBAL_SCOPE.cineCoreMountVoltage && typeof CORE_GLOBAL_SCOPE.cineCoreMountVoltage.setMountVoltageDomReferences === 'function' ? {
  setDomReferences: CORE_GLOBAL_SCOPE.cineCoreMountVoltage.setMountVoltageDomReferences
} : null;
if (mountVoltageNamespace && typeof mountVoltageNamespace.setDomReferences === 'function') {
  mountVoltageNamespace.setDomReferences({
    section: mountVoltageSectionElem,
    heading: mountVoltageHeadingElem,
    description: mountVoltageDescriptionElem,
    note: mountVoltageNoteElem,
    resetButton: mountVoltageResetButton,
    titles: mountVoltageTitleElems,
    inputs: mountVoltageInputs
  });
} else if (CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object') {
  try {
    CORE_GLOBAL_SCOPE.mountVoltageInputs = mountVoltageInputs;
  } catch (mountVoltageInputsAssignError) {
    void mountVoltageInputsAssignError;
  }
}
if (typeof updateMountVoltageInputsFromState === 'function') {
  updateMountVoltageInputsFromState();
}
if (typeof updateMountVoltageSettingLabels === 'function') {
  updateMountVoltageSettingLabels(currentLang);
}
var iosPwaHelpStep2 = document.getElementById("iosPwaHelpStep2");
var iosPwaHelpStep3 = document.getElementById("iosPwaHelpStep3");
setPinkModeIconSequence(PINK_MODE_ICON_FALLBACK_MARKUP);
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  loadPinkModeIconsFromFiles().catch(function () {});
}
var iosPwaHelpStep4 = document.getElementById("iosPwaHelpStep4");
var iosPwaHelpNote = document.getElementById("iosPwaHelpNote");
var iosPwaHelpClose = document.getElementById("iosPwaHelpClose");
var installBannerSetupComplete = false;
var currentInstallGuidePlatform = null;
var lastActiveBeforeInstallGuide = null;
var lastActiveBeforeIosHelp = null;
function parseRgbComponent(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.max(0, Math.min(255, Math.round(value)));
  }
  if (typeof value !== 'string') return null;
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
function getInstallBannerDismissedInSession() {
  if (!installBannerGlobalScope || _typeof(installBannerGlobalScope) !== 'object') {
    return false;
  }
  if (typeof installBannerGlobalScope.installBannerDismissedInSession !== 'boolean') {
    installBannerGlobalScope.installBannerDismissedInSession = false;
    return false;
  }
  return installBannerGlobalScope.installBannerDismissedInSession;
}
function setInstallBannerDismissedInSession(value) {
  if (!installBannerGlobalScope || _typeof(installBannerGlobalScope) !== 'object') {
    return;
  }
  installBannerGlobalScope.installBannerDismissedInSession = Boolean(value);
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
  ensureInstallPromptElements();
  if (!installPromptBanner) return false;
  if (isStandaloneDisplayMode()) return false;
  if (hasDismissedInstallBanner()) return false;
  return isIosDevice() || isAndroidDevice();
}
function updateInstallBannerVisibility() {
  ensureInstallPromptElements();
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
  ensureInstallPromptElements();
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
  ensureInstallPromptElements();
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
  installGuideDialog.setAttribute('data-platform', platform);
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
  ensureInstallPromptElements();
  if (!installGuideDialog) return;
  currentInstallGuidePlatform = platform;
  lastActiveBeforeInstallGuide = document.activeElement;
  renderInstallGuideContent(platform);
  installGuideDialog.removeAttribute('hidden');
  var focusTarget = installGuideClose || installGuideDialog.querySelector('button, [href], [tabindex]:not([tabindex="-1"])');
  if (focusTarget && typeof focusTarget.focus === 'function') {
    try {
      focusTarget.focus();
    } catch (_unused3) {
      focusTarget.focus();
    }
  }
}
function closeInstallGuide() {
  ensureInstallPromptElements();
  if (!installGuideDialog) return;
  installGuideDialog.setAttribute('hidden', '');
  currentInstallGuidePlatform = null;
  if (lastActiveBeforeInstallGuide && typeof lastActiveBeforeInstallGuide.focus === 'function') {
    try {
      lastActiveBeforeInstallGuide.focus();
    } catch (_unused4) {
      lastActiveBeforeInstallGuide.focus();
    }
  }
}
function setupInstallBanner() {
  ensureInstallPromptElements();
  if (!installPromptBanner) return false;
  if (installBannerSetupComplete) {
    applyInstallTexts(currentLang);
    updateInstallBannerColors();
    updateInstallBannerVisibility();
    updateInstallBannerPosition();
    return true;
  }
  installBannerSetupComplete = true;
  if (installPromptBannerIcon && typeof applyIconGlyph === 'function') {
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
    installGuideClose.addEventListener('click', function () {
      closeInstallGuide();
    });
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
  return true;
}
function applyInstallTexts(lang) {
  ensureInstallPromptElements();
  var fallbackTexts = texts.en || {};
  var langTexts = texts[lang] || fallbackTexts;
  var bannerText = langTexts.installBannerText || fallbackTexts.installBannerText || '';
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
  var closeLabel = langTexts.installHelpClose || fallbackTexts.installHelpClose || '';
  var dismissLabel = langTexts.installBannerDismiss || fallbackTexts.installBannerDismiss || closeLabel || '';
  if (installPromptBannerDismiss) {
    var labelText = dismissLabel || '';
    if (typeof setButtonLabelWithIconBinding === 'function') {
      setButtonLabelWithIconBinding(installPromptBannerDismiss, '', ICON_GLYPHS.circleX);
    }
    Array.from(installPromptBannerDismiss.querySelectorAll('.visually-hidden')).forEach(function (node) {
      if (node && node.parentNode === installPromptBannerDismiss) {
        installPromptBannerDismiss.removeChild(node);
      }
    });
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
  if (installGuideClose) {
    if (closeLabel && typeof setButtonLabelWithIconBinding === 'function') {
      setButtonLabelWithIconBinding(installGuideClose, closeLabel, ICON_GLYPHS.circleX);
      installGuideClose.setAttribute('aria-label', closeLabel);
      installGuideClose.setAttribute('title', closeLabel);
    } else if (!closeLabel) {
      installGuideClose.removeAttribute('aria-label');
      installGuideClose.removeAttribute('title');
    }
  }
  if (installGuideDialog && !installGuideDialog.hasAttribute('hidden') && currentInstallGuidePlatform) {
    renderInstallGuideContent(currentInstallGuidePlatform, lang);
  }
  updateInstallBannerPosition();
  updateInstallBannerColors();
}
function shouldShowIosPwaHelp() {
  try {
    if (helpModuleApi && typeof helpModuleApi.shouldShowIosPwaHelp === 'function') {
      return Boolean(helpModuleApi.shouldShowIosPwaHelp(function () {
        return iosPwaHelpDialog;
      }));
    }
  } catch (error) {
    if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
      console.warn('shouldShowIosPwaHelp() failed', error);
    }
  }
  return false;
}
function openIosPwaHelp() {
  if (!iosPwaHelpDialog) return;
  if (!shouldShowIosPwaHelp()) return;
  lastActiveBeforeIosHelp = document.activeElement;
  iosPwaHelpDialog.removeAttribute('hidden');
  var focusTarget = iosPwaHelpClose || iosPwaHelpDialog.querySelector('button, [href], [tabindex]:not([tabindex="-1"])');
  if (focusTarget && typeof focusTarget.focus === 'function') {
    try {
      focusTarget.focus();
    } catch (_unused5) {
      focusTarget.focus();
    }
  }
}
function closeIosPwaHelp() {
  var storeDismissal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (!iosPwaHelpDialog) return;
  iosPwaHelpDialog.setAttribute('hidden', '');
  if (storeDismissal) {
    markIosPwaHelpDismissed();
  }
  if (lastActiveBeforeIosHelp && typeof lastActiveBeforeIosHelp.focus === 'function') {
    try {
      lastActiveBeforeIosHelp.focus();
    } catch (_unused6) {
      lastActiveBeforeIosHelp.focus();
    }
  }
}
function maybeShowIosPwaHelp() {
  openIosPwaHelp();
}
if (iosPwaHelpClose) {
  iosPwaHelpClose.addEventListener('click', function () {
    return closeIosPwaHelp(true);
  });
}
if (iosPwaHelpDialog) {
  iosPwaHelpDialog.addEventListener('click', function (event) {
    if (event.target === iosPwaHelpDialog) {
      closeIosPwaHelp(true);
    }
  });
}
document.addEventListener('keydown', function (event) {
  if (event.key !== 'Escape' && event.key !== 'Esc') return;
  var handled = false;
  if (iosPwaHelpDialog && !iosPwaHelpDialog.hasAttribute('hidden')) {
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
var hoverHelpButton = document.getElementById("hoverHelpButton");
var settingsButton = document.getElementById("settingsButton");
var settingsButtonIcon = settingsButton === null || settingsButton === void 0 || (_settingsButton$query = settingsButton.querySelector) === null || _settingsButton$query === void 0 ? void 0 : _settingsButton$query.call(settingsButton, '.settings-button-icon');
var settingsDialog = document.getElementById("settingsDialog");
if (settingsButton) {
  settingsButton.setAttribute('data-allow-hover-help', '');
}
if (settingsButtonIcon) {
  applyIconGlyph(settingsButtonIcon, ICON_GLYPHS.gears);
  settingsButtonIcon.setAttribute('aria-hidden', 'true');
}
if (settingsDialog) {
  settingsDialog.setAttribute('data-allow-hover-help', '');
}
var settingsTablist = document.getElementById('settingsTablist');
var settingsTabButtons = settingsTablist ? Array.from(settingsTablist.querySelectorAll('[role="tab"]')) : [];
var settingsTabsContainer = settingsTablist ? settingsTablist.closest('.settings-tabs-container') || settingsTablist : null;
var settingsTabsScrollPrev = document.getElementById('settingsTabsScrollPrev');
var settingsTabsScrollNext = document.getElementById('settingsTabsScrollNext');
var settingsTabsOverflowFrame = 0;
var SETTINGS_TABS_SIDEBAR_QUERY = '(max-width: 720px)';
var settingsTabsOrientationQuery = typeof window !== 'undefined' && typeof window.matchMedia === 'function' ? window.matchMedia(SETTINGS_TABS_SIDEBAR_QUERY) : null;
function applySettingsTabsOrientation(matches) {
  if (!settingsTablist) return;
  settingsTablist.setAttribute('aria-orientation', matches ? 'vertical' : 'horizontal');
  scheduleSettingsTabsOverflowUpdate();
}
if (settingsTabsOrientationQuery) {
  try {
    applySettingsTabsOrientation(settingsTabsOrientationQuery.matches);
    var handleSettingsTabsOrientationChange = function handleSettingsTabsOrientationChange(event) {
      applySettingsTabsOrientation(event.matches);
    };
    if (typeof settingsTabsOrientationQuery.addEventListener === 'function') {
      settingsTabsOrientationQuery.addEventListener('change', handleSettingsTabsOrientationChange);
    } else if (typeof settingsTabsOrientationQuery.addListener === 'function') {
      settingsTabsOrientationQuery.addListener(handleSettingsTabsOrientationChange);
    }
  } catch (_unused7) {
    applySettingsTabsOrientation(false);
  }
} else if (settingsTablist) {
  settingsTablist.setAttribute('aria-orientation', 'horizontal');
}
function updateSettingsTabsOverflowIndicators() {
  if (!settingsTablist || !settingsTabsContainer) {
    if (settingsTabsScrollPrev) {
      settingsTabsScrollPrev.hidden = true;
    }
    if (settingsTabsScrollNext) {
      settingsTabsScrollNext.hidden = true;
    }
    return;
  }
  var scrollWidth = typeof settingsTablist.scrollWidth === 'number' ? settingsTablist.scrollWidth : 0;
  var clientWidth = typeof settingsTablist.clientWidth === 'number' ? settingsTablist.clientWidth : 0;
  var rawScrollLeft = typeof settingsTablist.scrollLeft === 'number' ? settingsTablist.scrollLeft : Number(settingsTablist.scrollLeft) || 0;
  var maxScrollLeft = Math.max(0, scrollWidth - clientWidth);
  var scrollLeft = Math.min(maxScrollLeft, Math.max(0, rawScrollLeft));
  var canScroll = scrollWidth > clientWidth + 4;
  var atStart = !canScroll || scrollLeft <= 1;
  var atEnd = !canScroll || Math.abs(scrollWidth - clientWidth - scrollLeft) <= 1;
  settingsTabsContainer.classList.toggle('is-scrollable', canScroll);
  settingsTabsContainer.classList.toggle('is-at-start', atStart);
  settingsTabsContainer.classList.toggle('is-at-end', atEnd);
  if (settingsTabsScrollPrev) {
    settingsTabsScrollPrev.hidden = !canScroll;
    settingsTabsScrollPrev.disabled = atStart;
  }
  if (settingsTabsScrollNext) {
    settingsTabsScrollNext.hidden = !canScroll;
    settingsTabsScrollNext.disabled = atEnd;
  }
}
function scheduleSettingsTabsOverflowUpdate() {
  if (!settingsTablist) return;
  if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
    if (settingsTabsOverflowFrame) {
      if (typeof window.cancelAnimationFrame === 'function') {
        window.cancelAnimationFrame(settingsTabsOverflowFrame);
      }
      settingsTabsOverflowFrame = 0;
    }
    settingsTabsOverflowFrame = window.requestAnimationFrame(function () {
      settingsTabsOverflowFrame = 0;
      updateSettingsTabsOverflowIndicators();
    });
  } else {
    updateSettingsTabsOverflowIndicators();
  }
}
function scrollSettingsTabs(direction) {
  if (!settingsTablist) return;
  var distance = settingsTablist.clientWidth ? settingsTablist.clientWidth * 0.75 : 200;
  var amount = direction * distance;
  if (typeof settingsTablist.scrollBy === 'function') {
    try {
      settingsTablist.scrollBy({
        left: amount,
        behavior: 'smooth'
      });
    } catch (_unused8) {
      settingsTablist.scrollLeft += amount;
    }
  } else {
    settingsTablist.scrollLeft += amount;
  }
  scheduleSettingsTabsOverflowUpdate();
}
if (settingsTabsScrollPrev) {
  settingsTabsScrollPrev.addEventListener('click', function () {
    scrollSettingsTabs(-1);
  });
}
if (settingsTabsScrollNext) {
  settingsTabsScrollNext.addEventListener('click', function () {
    scrollSettingsTabs(1);
  });
}
if (settingsTablist) {
  var settingsTabsPassiveOptions = false;
  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    try {
      var passiveTestHandler = function passiveTestHandler() {};
      var passiveTestOptions = Object.defineProperty({}, 'passive', {
        get: function get() {
          settingsTabsPassiveOptions = {
            passive: true
          };
          return false;
        }
      });
      window.addEventListener('testPassive', passiveTestHandler, passiveTestOptions);
      window.removeEventListener('testPassive', passiveTestHandler, passiveTestOptions);
    } catch (_unused9) {
      settingsTabsPassiveOptions = false;
    }
  }
  settingsTablist.addEventListener('scroll', function () {
    scheduleSettingsTabsOverflowUpdate();
  }, settingsTabsPassiveOptions);
  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('resize', scheduleSettingsTabsOverflowUpdate, settingsTabsPassiveOptions);
  }
}
var settingsTabPanels = settingsDialog ? Array.from(settingsDialog.querySelectorAll('.settings-panel')) : [];
var settingsTabGeneral = document.getElementById('settingsTab-general');
var settingsTabAutoGear = document.getElementById('settingsTab-autoGear');
var settingsTabAccessibility = document.getElementById('settingsTab-accessibility');
var settingsTabBackup = document.getElementById('settingsTab-backup');
var settingsTabData = document.getElementById('settingsTab-data');
var settingsTabAbout = document.getElementById('settingsTab-about');
var settingsTabIconAssignments = [[settingsTabGeneral, ICON_GLYPHS.settingsGeneral], [settingsTabAutoGear, ICON_GLYPHS.settingsAutoGear], [settingsTabAccessibility, ICON_GLYPHS.settingsAccessibility], [settingsTabBackup, ICON_GLYPHS.settingsBackup], [settingsTabData, ICON_GLYPHS.settingsData], [settingsTabAbout, ICON_GLYPHS.settingsAbout]];
settingsTabIconAssignments.forEach(function (_ref54) {
  var _button$querySelector;
  var _ref55 = _slicedToArray(_ref54, 2),
    button = _ref55[0],
    glyph = _ref55[1];
  if (!button || !glyph) return;
  var iconElement = (_button$querySelector = button.querySelector) === null || _button$querySelector === void 0 ? void 0 : _button$querySelector.call(button, '.settings-tab-icon');
  if (!iconElement) return;
  applyIconGlyph(iconElement, glyph);
  iconElement.setAttribute('aria-hidden', 'true');
});
var generalSettingsHeading = document.getElementById('generalSettingsHeading');
var generalLanguageHeading = document.getElementById('generalLanguageHeading');
var generalAppearanceHeading = document.getElementById('generalAppearanceHeading');
var generalTypographyHeading = document.getElementById('generalTypographyHeading');
var generalBrandingHeading = document.getElementById('generalBrandingHeading');
var generalCameraColorsHeading = document.getElementById('generalCameraColorsHeading');
var cameraColorsDescription = document.getElementById('cameraColorsDescription');
var cameraColorALabel = document.getElementById('cameraColorALabel');
var cameraColorBLabel = document.getElementById('cameraColorBLabel');
var cameraColorCLabel = document.getElementById('cameraColorCLabel');
var cameraColorDLabel = document.getElementById('cameraColorDLabel');
var cameraColorELabel = document.getElementById('cameraColorELabel');
var cameraColorA = document.getElementById('cameraColorA');
var cameraColorB = document.getElementById('cameraColorB');
var cameraColorC = document.getElementById('cameraColorC');
var cameraColorD = document.getElementById('cameraColorD');
var cameraColorE = document.getElementById('cameraColorE');
var settingsLanguage = document.getElementById("settingsLanguage");
var settingsDarkMode = document.getElementById("settingsDarkMode");
var settingsPinkMode = document.getElementById("settingsPinkMode");
var accentColorInput = document.getElementById("accentColorInput");
var accentColorResetButton = document.getElementById("accentColorReset");
var settingsTemperatureUnit = document.getElementById('settingsTemperatureUnit');
var settingsFocusScale = document.getElementById('settingsFocusScale');
var settingsFontSize = document.getElementById("settingsFontSize");
var settingsFontFamily = document.getElementById("settingsFontFamily");
var localFontsButton = document.getElementById("localFontsButton");
var localFontsInput = document.getElementById("localFontsInput");
var localFontsStatus = document.getElementById("localFontsStatus");
var localFontsGroup = document.getElementById("localFontsGroup");
var bundledFontGroup = document.getElementById("bundledFontOptions");
var settingsLogo = document.getElementById("settingsLogo");
var settingsLogoPreview = document.getElementById("settingsLogoPreview");
var documentationTrackerController = function () {
  var manager = SETTINGS_DOCUMENTATION_TRACKER_TOOLS && typeof SETTINGS_DOCUMENTATION_TRACKER_TOOLS.createDocumentationTrackerManager === 'function' ? function () {
    try {
      return SETTINGS_DOCUMENTATION_TRACKER_TOOLS.createDocumentationTrackerManager({
        document: typeof document !== 'undefined' ? document : null
      });
    } catch (documentationTrackerCreateError) {
      console.warn('Failed to create documentation tracker manager', documentationTrackerCreateError);
      return null;
    }
  }() : null;
  if (manager) {
    return {
      initialize: function initialize() {
        try {
          manager.initialize();
        } catch (documentationTrackerInitError) {
          console.warn('Failed to initialise documentation tracker', documentationTrackerInitError);
        }
      },
      updateLocalization: function updateLocalization(localization) {
        try {
          manager.updateLocalization(localization);
        } catch (documentationTrackerLocaleError) {
          console.warn('Failed to update documentation tracker localisation', documentationTrackerLocaleError);
        }
      },
      render: function render() {
        try {
          manager.render();
        } catch (documentationTrackerRenderError) {
          console.warn('Failed to render documentation tracker', documentationTrackerRenderError);
        }
      },
      isInitialized: function isInitialized() {
        try {
          return typeof manager.isInitialized === 'function' ? manager.isInitialized() === true : false;
        } catch (documentationTrackerStateError) {
          void documentationTrackerStateError;
        }
        return false;
      }
    };
  }
  var noop = function noop() {};
  return {
    initialize: noop,
    updateLocalization: noop,
    render: noop,
    isInitialized: function isInitialized() {
      return false;
    }
  };
}();
var activeSettingsTabId = '';
if (settingsTabButtons.length) {
  var initiallySelected = settingsTabButtons.find(function (button) {
    return button.getAttribute('aria-selected') === 'true';
  });
  activeSettingsTabId = (initiallySelected === null || initiallySelected === void 0 ? void 0 : initiallySelected.id) || settingsTabButtons[0].id;
  try {
    var storedTab = localStorage.getItem('settingsActiveTab');
    if (storedTab && settingsTabButtons.some(function (button) {
      return button.id === storedTab;
    })) {
      activeSettingsTabId = storedTab;
    }
  } catch (e) {
    console.warn('Could not load settings tab preference', e);
  }
}
function activateSettingsTab(tabId) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!settingsTabButtons.length) return;
  var _ref56 = options || {},
    _ref56$focusTab = _ref56.focusTab,
    focusTab = _ref56$focusTab === void 0 ? false : _ref56$focusTab;
  var target = settingsTabButtons.find(function (button) {
    return button.id === tabId;
  });
  if (!target) {
    target = settingsTabButtons[0];
  }
  if (!target) return;
  settingsTabButtons.forEach(function (button) {
    var selected = button === target;
    button.setAttribute('aria-selected', selected ? 'true' : 'false');
    button.tabIndex = selected ? 0 : -1;
    if (selected && focusTab) {
      try {
        button.focus({
          preventScroll: true
        });
      } catch (_unused0) {
        button.focus();
      }
    }
    button.classList.toggle('active', selected);
  });
  settingsTabPanels.forEach(function (panel) {
    if (!panel) return;
    var labelledBy = panel.getAttribute('aria-labelledby') || '';
    var labelledIds = labelledBy.split(/\s+/).map(function (id) {
      return id.trim();
    }).filter(Boolean);
    if (labelledIds.includes(target.id)) {
      panel.removeAttribute('hidden');
    } else {
      panel.setAttribute('hidden', '');
    }
  });
  if (settingsTablist && typeof settingsTablist.scrollWidth === 'number' && typeof settingsTablist.clientWidth === 'number' && settingsTablist.scrollWidth > settingsTablist.clientWidth + 4 && typeof target.scrollIntoView === 'function') {
    try {
      target.scrollIntoView({
        block: 'nearest',
        inline: 'center',
        behavior: 'smooth'
      });
    } catch (_unused1) {
      target.scrollIntoView();
    }
  }
  scheduleSettingsTabsOverflowUpdate();
  activeSettingsTabId = target.id;
  try {
    localStorage.setItem('settingsActiveTab', activeSettingsTabId);
  } catch (e) {
    console.warn('Could not save settings tab preference', e);
  }
}
documentationTrackerController.initialize();
if (settingsTabButtons.length) {
  activateSettingsTab(activeSettingsTabId);
  settingsTabButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      activateSettingsTab(button.id);
    });
    button.addEventListener('keydown', function (event) {
      var key = event.key;
      if (!key) return;
      if (!['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'Home', 'End'].includes(key)) {
        return;
      }
      event.preventDefault();
      var currentIndex = settingsTabButtons.indexOf(button);
      if (currentIndex === -1) return;
      var nextIndex = currentIndex;
      if (key === 'ArrowLeft' || key === 'ArrowUp') {
        nextIndex = (currentIndex - 1 + settingsTabButtons.length) % settingsTabButtons.length;
      } else if (key === 'ArrowRight' || key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % settingsTabButtons.length;
      } else if (key === 'Home') {
        nextIndex = 0;
      } else if (key === 'End') {
        nextIndex = settingsTabButtons.length - 1;
      }
      var nextTab = settingsTabButtons[nextIndex];
      if (nextTab) {
        activateSettingsTab(nextTab.id, {
          focusTab: true
        });
      }
    });
  });
}
if (storageOpenBackupTabButton) {
  storageOpenBackupTabButton.addEventListener('click', function () {
    activateSettingsTab('settingsTab-backup', {
      focusTab: true
    });
    var backupButton = document.getElementById('backupSettings');
    if (backupButton && typeof backupButton.focus === 'function') {
      try {
        backupButton.focus({
          preventScroll: true
        });
      } catch (_unused10) {
        backupButton.focus();
      }
    }
  });
}
var autoGearConditionConfigs = AUTO_GEAR_CONDITION_KEYS.reduce(function (acc, key) {
  var section = localAutoGearConditionSections[key] || null;
  acc[key] = {
    key: key,
    section: section,
    label: autoGearConditionLabels[key] || null,
    select: autoGearConditionSelects[key] || null,
    addShortcut: autoGearConditionAddShortcuts[key] || null,
    removeButton: autoGearConditionRemoveButtons[key] || null,
    logicLabel: autoGearConditionLogicLabels[key] || null,
    logicSelect: autoGearConditionLogicSelects[key] || null
  };
  if (section) {
    section.setAttribute('aria-hidden', section.hidden ? 'true' : 'false');
  }
  return acc;
}, {});
var autoGearExports = typeof AUTO_GEAR_UI_EXPORTS !== 'undefined' ? AUTO_GEAR_UI_EXPORTS : globalThis.AUTO_GEAR_UI_EXPORTS || {};
var refreshAutoGearShootingDaysValue = typeof autoGearExports.refreshAutoGearShootingDaysValue === 'function' ? autoGearExports.refreshAutoGearShootingDaysValue : function refreshAutoGearShootingDaysValue() {};
var refreshAutoGearScenarioOptions = typeof autoGearExports.refreshAutoGearScenarioOptions === 'function' ? autoGearExports.refreshAutoGearScenarioOptions : function refreshAutoGearScenarioOptions() {};
var refreshAutoGearScenarioBaseSelect = typeof autoGearExports.refreshAutoGearScenarioBaseSelect === 'function' ? autoGearExports.refreshAutoGearScenarioBaseSelect : function refreshAutoGearScenarioBaseSelect() {};
var refreshAutoGearMatteboxOptions = typeof autoGearExports.refreshAutoGearMatteboxOptions === 'function' ? autoGearExports.refreshAutoGearMatteboxOptions : function refreshAutoGearMatteboxOptions() {};
var refreshAutoGearCameraHandleOptions = typeof autoGearExports.refreshAutoGearCameraHandleOptions === 'function' ? autoGearExports.refreshAutoGearCameraHandleOptions : function refreshAutoGearCameraHandleOptions() {};
var refreshAutoGearViewfinderExtensionOptions = typeof autoGearExports.refreshAutoGearViewfinderExtensionOptions === 'function' ? autoGearExports.refreshAutoGearViewfinderExtensionOptions : function refreshAutoGearViewfinderExtensionOptions() {};
var refreshAutoGearDeliveryResolutionOptions = typeof autoGearExports.refreshAutoGearDeliveryResolutionOptions === 'function' ? autoGearExports.refreshAutoGearDeliveryResolutionOptions : function refreshAutoGearDeliveryResolutionOptions() {};
var refreshAutoGearVideoDistributionOptions = typeof autoGearExports.refreshAutoGearVideoDistributionOptions === 'function' ? autoGearExports.refreshAutoGearVideoDistributionOptions : function refreshAutoGearVideoDistributionOptions() {};
var collectAutoGearSelectedValues = typeof autoGearExports.collectAutoGearSelectedValues === 'function' ? autoGearExports.collectAutoGearSelectedValues : function collectAutoGearSelectedValues() {
  return [];
};
var autoGearConditionRefreshers = {
  always: null,
  scenarios: refreshAutoGearScenarioOptions,
  shootingDays: refreshAutoGearShootingDaysValue,
  mattebox: refreshAutoGearMatteboxOptions,
  cameraHandle: refreshAutoGearCameraHandleOptions,
  viewfinderExtension: refreshAutoGearViewfinderExtensionOptions,
  deliveryResolution: refreshAutoGearDeliveryResolutionOptions,
  videoDistribution: refreshAutoGearVideoDistributionOptions,
  camera: createDeferredAutoGearRefresher('refreshAutoGearCameraOptions'),
  ownGear: refreshAutoGearOwnGearConditionOptions,
  cameraWeight: createDeferredAutoGearRefresher('refreshAutoGearCameraWeightCondition'),
  monitor: createDeferredAutoGearRefresher('refreshAutoGearMonitorOptions'),
  tripodHeadBrand: createDeferredAutoGearRefresher('refreshAutoGearTripodHeadOptions'),
  tripodBowl: createDeferredAutoGearRefresher('refreshAutoGearTripodBowlOptions'),
  tripodTypes: createDeferredAutoGearRefresher('refreshAutoGearTripodTypesOptions'),
  tripodSpreader: createDeferredAutoGearRefresher('refreshAutoGearTripodSpreaderOptions'),
  crewPresent: function crewPresent(selected) {
    return callCoreFunctionIfAvailable('refreshAutoGearCrewOptions', [autoGearCrewPresentSelect, selected, 'crewPresent'], {
      defer: true
    });
  },
  crewAbsent: function crewAbsent(selected) {
    return callCoreFunctionIfAvailable('refreshAutoGearCrewOptions', [autoGearCrewAbsentSelect, selected, 'crewAbsent'], {
      defer: true
    });
  },
  wireless: createDeferredAutoGearRefresher('refreshAutoGearWirelessOptions'),
  motors: createDeferredAutoGearRefresher('refreshAutoGearMotorsOptions'),
  controllers: createDeferredAutoGearRefresher('refreshAutoGearControllersOptions'),
  distance: createDeferredAutoGearRefresher('refreshAutoGearDistanceOptions')
};
var autoGearActiveConditions = new Set();
function getAutoGearConditionConfig(key) {
  if (!key) return null;
  if (Object.prototype.hasOwnProperty.call(autoGearConditionConfigs, key)) {
    return autoGearConditionConfigs[key];
  }
  return null;
}
var AUTO_GEAR_CONDITION_FALLBACK_LABELS = {
  always: 'Always include',
  scenarios: 'Required scenarios',
  shootingDays: 'Shooting days condition',
  mattebox: 'Mattebox options',
  cameraHandle: 'Camera handles',
  viewfinderExtension: 'Viewfinder extension',
  deliveryResolution: 'Delivery resolution',
  videoDistribution: 'Video distribution',
  camera: 'Camera',
  ownGear: 'Own gear items',
  cameraWeight: 'Camera weight',
  monitor: 'Onboard monitor',
  tripodHeadBrand: 'Tripod head brand',
  tripodBowl: 'Tripod bowl size',
  tripodTypes: 'Tripod types',
  tripodSpreader: 'Tripod spreader',
  crewPresent: 'Crew present',
  crewAbsent: 'Crew absent',
  wireless: 'Wireless transmitter',
  motors: 'FIZ motors',
  controllers: 'FIZ controllers',
  distance: 'FIZ distance devices'
};
function getAutoGearConditionLabel(key) {
  var config = getAutoGearConditionConfig(key);
  if (config && config.label && typeof config.label.textContent === 'string') {
    var text = config.label.textContent.trim();
    if (text) return text;
  }
  var fallback = AUTO_GEAR_CONDITION_FALLBACK_LABELS[key];
  if (typeof fallback === 'string' && fallback) {
    return fallback;
  }
  if (typeof key === 'string' && key) {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, function (char) {
      return char.toUpperCase();
    });
  }
  return '';
}
function isAutoGearConditionActive(key) {
  return autoGearActiveConditions.has(key);
}
function refreshAutoGearConditionPicker() {
  var _texts$currentLang10, _texts$en18;
  if (!autoGearConditionSelect) return;
  var previousValue = autoGearConditionSelect.value || '';
  var placeholderLabel = ((_texts$currentLang10 = texts[currentLang]) === null || _texts$currentLang10 === void 0 ? void 0 : _texts$currentLang10.autoGearConditionPlaceholder) || ((_texts$en18 = texts.en) === null || _texts$en18 === void 0 ? void 0 : _texts$en18.autoGearConditionPlaceholder) || 'Choose a condition';
  autoGearConditionSelect.innerHTML = '';
  var placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = placeholderLabel;
  autoGearConditionSelect.appendChild(placeholder);
  var available = AUTO_GEAR_CONDITION_KEYS.filter(function (key) {
    if (!autoGearActiveConditions.has(key)) {
      return true;
    }
    return AUTO_GEAR_REPEATABLE_CONDITIONS.has(key);
  });
  available.forEach(function (key) {
    var option = document.createElement('option');
    option.value = key;
    option.textContent = getAutoGearConditionLabel(key);
    autoGearConditionSelect.appendChild(option);
  });
  if (previousValue && available.includes(previousValue)) {
    autoGearConditionSelect.value = previousValue;
  } else {
    autoGearConditionSelect.value = '';
  }
  autoGearConditionSelect.disabled = available.length === 0;
}
function updateAutoGearConditionAddButtonState() {
  var hasSelection = autoGearConditionSelect && autoGearConditionSelect.value;
  var disabledPicker = autoGearConditionSelect ? autoGearConditionSelect.disabled : true;
  if (autoGearConditionAddButton) {
    autoGearConditionAddButton.disabled = !hasSelection || disabledPicker;
  }
  var hasAvailable = AUTO_GEAR_CONDITION_KEYS.some(function (key) {
    if (!autoGearActiveConditions.has(key)) {
      return true;
    }
    return AUTO_GEAR_REPEATABLE_CONDITIONS.has(key);
  });
  AUTO_GEAR_CONDITION_KEYS.forEach(function (key) {
    var shortcut = autoGearConditionAddShortcuts[key];
    if (shortcut) {
      shortcut.disabled = !hasAvailable;
    }
  });
}
function focusAutoGearConditionSection(key) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = getAutoGearConditionConfig(key);
  if (!config || !config.section) {
    return;
  }
  var section = config.section,
    select = config.select;
  var _ref57 = options || {},
    _ref57$flash = _ref57.flash,
    flash = _ref57$flash === void 0 ? false : _ref57$flash;
  if (section.hidden) {
    section.hidden = false;
    section.setAttribute('aria-hidden', 'false');
  }
  if (flash && section.classList) {
    section.classList.add('auto-gear-condition-flash');
    var schedule = typeof window !== 'undefined' && typeof window.setTimeout === 'function' ? window.setTimeout : setTimeout;
    schedule(function () {
      section.classList.remove('auto-gear-condition-flash');
    }, 1200);
  }
  var target = select || section.querySelector('select, input, button');
  if (!target) return;
  try {
    target.focus({
      preventScroll: true
    });
  } catch (_unused11) {
    target.focus();
  }
}
function notifyAutoGearConditionRepeat(key) {
  var _texts$currentLang11, _texts$en19;
  if (typeof showNotification !== 'function') {
    return;
  }
  var template = ((_texts$currentLang11 = texts[currentLang]) === null || _texts$currentLang11 === void 0 ? void 0 : _texts$currentLang11.autoGearConditionRepeatHint) || ((_texts$en19 = texts.en) === null || _texts$en19 === void 0 ? void 0 : _texts$en19.autoGearConditionRepeatHint) || '';
  if (!template) return;
  var label = getAutoGearConditionLabel(key);
  var message;
  if (label) {
    message = template.replace('{condition}', label);
  } else if (template.includes(' {condition}')) {
    message = template.replace(' {condition}', '');
  } else {
    message = template.replace('{condition}', '');
  }
  if (message) {
    showNotification('info', message);
  }
}
function handleAutoGearConditionShortcut() {
  if (!autoGearConditionSelect) {
    focusAutoGearConditionPicker();
    return;
  }
  if (autoGearConditionSelect.disabled) {
    focusAutoGearConditionPicker();
    return;
  }
  var availableOptions = Array.from(autoGearConditionSelect.options || []).filter(function (option) {
    return option.value;
  });
  if (availableOptions.length === 1) {
    autoGearConditionSelect.value = availableOptions[0].value;
    addAutoGearConditionFromPicker();
    return;
  }
  focusAutoGearConditionPicker();
}
function addAutoGearCondition(key) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = getAutoGearConditionConfig(key);
  if (!config) return false;
  if (autoGearActiveConditions.has(key)) {
    if (AUTO_GEAR_REPEATABLE_CONDITIONS.has(key)) {
      focusAutoGearConditionSection(key, {
        flash: true
      });
      notifyAutoGearConditionRepeat(key);
      return true;
    }
    if (options.focus !== false && config.select) {
      try {
        config.select.focus({
          preventScroll: true
        });
      } catch (_unused12) {
        config.select.focus();
      }
    }
    return false;
  }
  autoGearActiveConditions.add(key);
  if (config.section) {
    config.section.hidden = false;
    config.section.setAttribute('aria-hidden', 'false');
  }
  if (autoGearEditorDraft) {
    if (key === 'always') {
      autoGearEditorDraft.always = ['always'];
    } else if (key === 'shootingDays') {
      if (!autoGearEditorDraft.shootingDays) {
        autoGearEditorDraft.shootingDays = null;
      }
    } else if (!Array.isArray(autoGearEditorDraft[key])) {
      autoGearEditorDraft[key] = [];
    }
  }
  var values;
  if (key === 'always') {
    values = ['always'];
  } else if (key === 'shootingDays') {
    if (options.initialValues) {
      values = options.initialValues;
    } else if (autoGearEditorDraft !== null && autoGearEditorDraft !== void 0 && autoGearEditorDraft.shootingDays) {
      values = autoGearEditorDraft.shootingDays;
    } else {
      values = null;
    }
  } else {
    values = Array.isArray(options.initialValues) ? options.initialValues : Array.isArray(autoGearEditorDraft === null || autoGearEditorDraft === void 0 ? void 0 : autoGearEditorDraft[key]) ? autoGearEditorDraft[key] : [];
  }
  var refresher = autoGearConditionRefreshers[key];
  if (typeof refresher === 'function') {
    refresher(values);
  }
  if (config.logicSelect) {
    var property = AUTO_GEAR_CONDITION_LOGIC_FIELDS[key];
    var stored = property && autoGearEditorDraft ? normalizeAutoGearConditionLogic(autoGearEditorDraft[property]) : 'all';
    config.logicSelect.value = stored;
    config.logicSelect.disabled = false;
  }
  if (autoGearConditionSelect) {
    autoGearConditionSelect.value = '';
  }
  refreshAutoGearConditionPicker();
  updateAutoGearConditionAddButtonState();
  if (options.focus !== false && config.select) {
    try {
      config.select.focus({
        preventScroll: true
      });
    } catch (_unused13) {
      config.select.focus();
    }
  }
  return true;
}
function addAutoGearConditionFromPicker() {
  if (!autoGearConditionSelect) return false;
  var key = autoGearConditionSelect.value;
  if (!key) {
    focusAutoGearConditionPicker();
    return false;
  }
  var result = addAutoGearCondition(key, {
    focus: true
  });
  if (result && autoGearConditionSelect) {
    autoGearConditionSelect.value = '';
  }
  updateAutoGearConditionAddButtonState();
  return result;
}
function removeAutoGearCondition(key) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = getAutoGearConditionConfig(key);
  if (!config) return false;
  if (!autoGearActiveConditions.has(key)) return false;
  autoGearActiveConditions.delete(key);
  if (config.section) {
    config.section.hidden = true;
    config.section.setAttribute('aria-hidden', 'true');
  }
  if (config.logicSelect) {
    config.logicSelect.value = 'all';
    config.logicSelect.disabled = true;
  }
  if (!options.preserveDraft && autoGearEditorDraft) {
    if (key === 'always') {
      autoGearEditorDraft.always = [];
    } else if (key === 'shootingDays') {
      autoGearEditorDraft.shootingDays = null;
    } else if (key === 'cameraWeight') {
      autoGearEditorDraft.cameraWeight = null;
    } else if (Array.isArray(autoGearEditorDraft[key])) {
      autoGearEditorDraft[key] = [];
    }
    var property = AUTO_GEAR_CONDITION_LOGIC_FIELDS[key];
    if (property) {
      autoGearEditorDraft[property] = 'all';
      if (autoGearEditorDraft.conditionLogic && _typeof(autoGearEditorDraft.conditionLogic) === 'object') {
        delete autoGearEditorDraft.conditionLogic[key];
      }
    }
  }
  if (config.select) {
    Array.from(config.select.options || []).forEach(function (option) {
      option.selected = false;
    });
    config.select.value = '';
  }
  if (key === 'cameraWeight') {
    if (autoGearCameraWeightOperator) {
      autoGearCameraWeightOperator.value = 'greater';
    }
    if (autoGearCameraWeightValueInput) {
      autoGearCameraWeightValueInput.value = '';
    }
  }
  if (key === 'shootingDays') {
    if (autoGearShootingDaysMode) {
      autoGearShootingDaysMode.value = 'minimum';
    }
    if (autoGearShootingDaysInput) {
      autoGearShootingDaysInput.value = '';
    }
  }
  var refresher = autoGearConditionRefreshers[key];
  if (typeof refresher === 'function') {
    if (key === 'shootingDays') {
      refresher(null);
    } else {
      refresher([]);
    }
  }
  refreshAutoGearConditionPicker();
  updateAutoGearConditionAddButtonState();
  if (options.focusPicker) {
    focusAutoGearConditionPicker();
  }
  return true;
}
function clearAllAutoGearConditions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref58 = options || {},
    _ref58$preserveDraft = _ref58.preserveDraft,
    preserveDraft = _ref58$preserveDraft === void 0 ? false : _ref58$preserveDraft;
  Array.from(autoGearActiveConditions).forEach(function (key) {
    removeAutoGearCondition(key, {
      preserveDraft: preserveDraft,
      focusPicker: false
    });
  });
  AUTO_GEAR_CONDITION_KEYS.forEach(function (key) {
    if (autoGearActiveConditions.has(key)) return;
    var config = getAutoGearConditionConfig(key);
    if (!config) return;
    if (config.section) {
      config.section.hidden = true;
      config.section.setAttribute('aria-hidden', 'true');
    }
    if (!preserveDraft && autoGearEditorDraft) {
      if (key === 'always') {
        autoGearEditorDraft.always = [];
      } else if (key === 'shootingDays') {
        autoGearEditorDraft.shootingDays = null;
      } else if (key === 'cameraWeight') {
        autoGearEditorDraft.cameraWeight = null;
      } else if (Array.isArray(autoGearEditorDraft[key])) {
        autoGearEditorDraft[key] = [];
      }
      var property = AUTO_GEAR_CONDITION_LOGIC_FIELDS[key];
      if (property) {
        autoGearEditorDraft[property] = 'all';
        if (autoGearEditorDraft.conditionLogic && _typeof(autoGearEditorDraft.conditionLogic) === 'object') {
          delete autoGearEditorDraft.conditionLogic[key];
        }
      }
    }
    if (config.select) {
      Array.from(config.select.options || []).forEach(function (option) {
        option.selected = false;
      });
      config.select.value = '';
    }
    if (config.logicSelect) {
      config.logicSelect.value = 'all';
      config.logicSelect.disabled = true;
    }
    if (key === 'cameraWeight') {
      if (autoGearCameraWeightOperator) {
        autoGearCameraWeightOperator.value = 'greater';
      }
      if (autoGearCameraWeightValueInput) {
        autoGearCameraWeightValueInput.value = '';
      }
    }
    if (key === 'shootingDays') {
      if (autoGearShootingDaysMode) {
        autoGearShootingDaysMode.value = 'minimum';
      }
      if (autoGearShootingDaysInput) {
        autoGearShootingDaysInput.value = '';
      }
    }
    var refresher = autoGearConditionRefreshers[key];
    if (typeof refresher === 'function') {
      if (key === 'shootingDays') {
        var source = preserveDraft ? autoGearEditorDraft === null || autoGearEditorDraft === void 0 ? void 0 : autoGearEditorDraft.shootingDays : null;
        refresher(source || null);
      } else {
        refresher(preserveDraft ? autoGearEditorDraft === null || autoGearEditorDraft === void 0 ? void 0 : autoGearEditorDraft[key] : []);
      }
    }
  });
  autoGearActiveConditions.clear();
  refreshAutoGearConditionPicker();
  updateAutoGearConditionAddButtonState();
}
function initializeAutoGearConditionsFromDraft() {
  clearAllAutoGearConditions({
    preserveDraft: true
  });
  AUTO_GEAR_CONDITION_KEYS.forEach(function (key) {
    var hasValue = false;
    var values = [];
    if (key === 'always') {
      values = autoGearEditorDraft !== null && autoGearEditorDraft !== void 0 && autoGearEditorDraft.always && autoGearEditorDraft.always.length ? ['always'] : [];
      hasValue = values.length > 0;
    } else if (key === 'shootingDays') {
      var condition = autoGearEditorDraft !== null && autoGearEditorDraft !== void 0 && autoGearEditorDraft.shootingDays ? normalizeAutoGearShootingDaysCondition(autoGearEditorDraft.shootingDays) : null;
      if (condition) {
        values = condition;
        hasValue = true;
      }
    } else if (key === 'cameraWeight') {
      var _condition = (autoGearEditorDraft === null || autoGearEditorDraft === void 0 ? void 0 : autoGearEditorDraft.cameraWeight) || null;
      if (_condition && _typeof(_condition) === 'object') {
        values = _condition;
        hasValue = true;
      }
    } else if (Array.isArray(autoGearEditorDraft === null || autoGearEditorDraft === void 0 ? void 0 : autoGearEditorDraft[key])) {
      values = autoGearEditorDraft[key].filter(function (value) {
        if (typeof value === 'number') {
          return Number.isFinite(value) && value > 0;
        }
        if (typeof value === 'string') {
          return value.trim();
        }
        return false;
      });
      hasValue = values.length > 0;
    }
    if (hasValue) {
      addAutoGearCondition(key, {
        focus: false,
        initialValues: values
      });
    } else {
      var refresher = autoGearConditionRefreshers[key];
      if (typeof refresher === 'function') {
        if (key === 'shootingDays') {
          refresher(null);
        } else {
          refresher([]);
        }
      }
      var config = getAutoGearConditionConfig(key);
      if (config) {
        if (config.section) {
          config.section.hidden = true;
          config.section.setAttribute('aria-hidden', 'true');
        }
        if (config.select) {
          config.select.value = '';
        }
        if (key === 'shootingDays') {
          if (autoGearShootingDaysMode) {
            autoGearShootingDaysMode.value = 'minimum';
          }
          if (autoGearShootingDaysInput) {
            autoGearShootingDaysInput.value = '';
          }
        }
      }
    }
  });
  refreshAutoGearConditionPicker();
  updateAutoGearConditionAddButtonState();
  if (autoGearScenarioModeSelectElement && autoGearEditorDraft) {
    autoGearScenarioModeSelectElement.value = normalizeAutoGearScenarioLogic(autoGearEditorDraft.scenarioLogic);
  }
  if (autoGearScenarioFactorInput) {
    var storedMultiplier = autoGearEditorDraft ? normalizeAutoGearScenarioMultiplier(autoGearEditorDraft.scenarioMultiplier) : 1;
    autoGearScenarioFactorInput.value = String(storedMultiplier);
  }
  applyAutoGearScenarioSettings(getAutoGearScenarioSelectedValues());
}
refreshAutoGearConditionPicker();
updateAutoGearConditionAddButtonState();
configureAutoGearConditionButtons();
if (autoGearShootingDaysMode) {
  var handleShootingDaysModeChange = function handleShootingDaysModeChange() {
    updateAutoGearShootingDaysDraft();
    callCoreFunctionIfAvailable('renderAutoGearDraftImpact', [], {
      defer: true
    });
  };
  autoGearShootingDaysMode.addEventListener('input', handleShootingDaysModeChange);
  autoGearShootingDaysMode.addEventListener('change', handleShootingDaysModeChange);
}
if (autoGearShootingDaysInput) {
  var handleShootingDaysValueInput = function handleShootingDaysValueInput() {
    updateAutoGearShootingDaysDraft();
    callCoreFunctionIfAvailable('renderAutoGearDraftImpact', [], {
      defer: true
    });
  };
  autoGearShootingDaysInput.addEventListener('input', handleShootingDaysValueInput);
  autoGearShootingDaysInput.addEventListener('change', handleShootingDaysValueInput);
  autoGearShootingDaysInput.addEventListener('blur', handleShootingDaysValueInput);
}
Object.entries(autoGearConditionLogicSelects).forEach(function (_ref59) {
  var _ref60 = _slicedToArray(_ref59, 2),
    key = _ref60[0],
    select = _ref60[1];
  if (!select) return;
  var property = AUTO_GEAR_CONDITION_LOGIC_FIELDS[key];
  var handleLogicChange = function handleLogicChange() {
    var normalized = normalizeAutoGearConditionLogic(select.value);
    select.value = normalized;
    if (autoGearEditorDraft && property) {
      autoGearEditorDraft[property] = normalized;
      if (!autoGearEditorDraft.conditionLogic || _typeof(autoGearEditorDraft.conditionLogic) !== 'object') {
        autoGearEditorDraft.conditionLogic = {};
      }
      if (normalized === 'all') {
        delete autoGearEditorDraft.conditionLogic[key];
      } else {
        autoGearEditorDraft.conditionLogic[key] = normalized;
      }
    }
    callCoreFunctionIfAvailable('renderAutoGearDraftImpact', [], {
      defer: true
    });
  };
  select.addEventListener('input', handleLogicChange);
  select.addEventListener('change', handleLogicChange);
});
if (autoGearCameraWeightOperator) {
  var handleCameraWeightOperatorChange = function handleCameraWeightOperatorChange() {
    updateAutoGearCameraWeightDraft();
    callCoreFunctionIfAvailable('renderAutoGearDraftImpact', [], {
      defer: true
    });
  };
  autoGearCameraWeightOperator.addEventListener('input', handleCameraWeightOperatorChange);
  autoGearCameraWeightOperator.addEventListener('change', handleCameraWeightOperatorChange);
}
if (autoGearCameraWeightValueInput) {
  var handleCameraWeightValueInput = function handleCameraWeightValueInput() {
    updateAutoGearCameraWeightDraft();
    callCoreFunctionIfAvailable('renderAutoGearDraftImpact', [], {
      defer: true
    });
  };
  autoGearCameraWeightValueInput.addEventListener('input', handleCameraWeightValueInput);
  autoGearCameraWeightValueInput.addEventListener('change', handleCameraWeightValueInput);
  autoGearCameraWeightValueInput.addEventListener('blur', handleCameraWeightValueInput);
}
var autoGearAddItemsHeading = document.getElementById('autoGearAddItemsHeading');
var autoGearAddOwnGearLabel = document.getElementById('autoGearAddOwnGearLabel');
var autoGearAddItemLabel = document.getElementById('autoGearAddItemLabel');
var autoGearAddCategoryLabel = document.getElementById('autoGearAddCategoryLabel');
var autoGearAddQuantityLabel = document.getElementById('autoGearAddQuantityLabel');
var autoGearAddScreenSizeLabel = document.getElementById('autoGearAddScreenSizeLabel');
var autoGearAddSelectorTypeLabel = document.getElementById('autoGearAddSelectorTypeLabel');
var autoGearAddSelectorDefaultLabel = document.getElementById('autoGearAddSelectorDefaultLabel');
var autoGearAddNotesLabel = document.getElementById('autoGearAddNotesLabel');
var autoGearAddOwnGearSelect = document.getElementById('autoGearAddOwnGear');
var autoGearAddNameInput = document.getElementById('autoGearAddName');
var autoGearAddCategorySelect = document.getElementById('autoGearAddCategory');
var autoGearAddQuantityInput = document.getElementById('autoGearAddQuantity');
var autoGearAddScreenSizeInput = document.getElementById('autoGearAddScreenSize');
var autoGearAddSelectorTypeSelect = document.getElementById('autoGearAddSelectorType');
var autoGearAddSelectorDefaultInput = document.getElementById('autoGearAddSelectorDefault');
var autoGearAddNotesInput = document.getElementById('autoGearAddNotes');
var autoGearAddItemButton = document.getElementById('autoGearAddItemButton');
var autoGearAddList = document.getElementById('autoGearAddList');
var autoGearRemoveItemsHeading = document.getElementById('autoGearRemoveItemsHeading');
var autoGearRemoveOwnGearLabel = document.getElementById('autoGearRemoveOwnGearLabel');
var autoGearRemoveItemLabel = document.getElementById('autoGearRemoveItemLabel');
var autoGearRemoveCategoryLabel = document.getElementById('autoGearRemoveCategoryLabel');
var autoGearRemoveQuantityLabel = document.getElementById('autoGearRemoveQuantityLabel');
var autoGearRemoveScreenSizeLabel = document.getElementById('autoGearRemoveScreenSizeLabel');
var autoGearRemoveSelectorTypeLabel = document.getElementById('autoGearRemoveSelectorTypeLabel');
var autoGearRemoveSelectorDefaultLabel = document.getElementById('autoGearRemoveSelectorDefaultLabel');
var autoGearRemoveNotesLabel = document.getElementById('autoGearRemoveNotesLabel');
var autoGearRemoveOwnGearSelect = document.getElementById('autoGearRemoveOwnGear');
var autoGearRemoveNameInput = document.getElementById('autoGearRemoveName');
var autoGearRemoveCategorySelect = document.getElementById('autoGearRemoveCategory');
var autoGearRemoveQuantityInput = document.getElementById('autoGearRemoveQuantity');
var autoGearRemoveScreenSizeInput = document.getElementById('autoGearRemoveScreenSize');
var autoGearRemoveSelectorTypeSelect = document.getElementById('autoGearRemoveSelectorType');
var autoGearRemoveSelectorDefaultInput = document.getElementById('autoGearRemoveSelectorDefault');
var autoGearRemoveNotesInput = document.getElementById('autoGearRemoveNotes');
var autoGearRemoveItemButton = document.getElementById('autoGearRemoveItemButton');
var autoGearRemoveList = document.getElementById('autoGearRemoveList');
var autoGearDraftImpactContainer = document.getElementById('autoGearDraftImpact');
var autoGearDraftImpactHeading = document.getElementById('autoGearDraftImpactHeading');
var autoGearDraftImpactDescription = document.getElementById('autoGearDraftImpactDescription');
var autoGearDraftImpactList = document.getElementById('autoGearDraftImpactList');
var autoGearDraftWarningContainer = document.getElementById('autoGearDraftWarningContainer');
var autoGearDraftWarningHeading = document.getElementById('autoGearDraftWarningHeading');
var autoGearDraftWarningList = document.getElementById('autoGearDraftWarningList');
var autoGearSaveRuleButton = document.getElementById('autoGearSaveRule');
var autoGearCancelEditButton = document.getElementById('autoGearCancelEdit');
var autoGearItemCatalog = document.getElementById('autoGearItemCatalog');
updateAutoGearOwnGearOptions();
if (typeof document !== 'undefined' && document) {
  document.addEventListener('own-gear-data-changed', function () {
    invalidateAutoGearOwnGearCache();
    updateAutoGearOwnGearOptions();
    updateAutoGearCatalogOptions();
  });
}
function enableAutoGearMultiSelectToggle(select) {
  if (!select || !select.multiple) return;
  var handlePointerToggle = function handlePointerToggle(event) {
    if (!select.multiple || event.defaultPrevented) return;
    var isPointerEvent = typeof PointerEvent !== 'undefined' && event instanceof PointerEvent;
    if (isPointerEvent && event.pointerType && event.pointerType !== 'mouse') {
      return;
    }
    if (typeof event.button === 'number' && event.button !== 0) {
      return;
    }
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }
    var option = event.target instanceof HTMLOptionElement ? event.target : null;
    if (!option || option.disabled) {
      return;
    }
    event.preventDefault();
    option.selected = !option.selected;
    var dispatchEvent = function dispatchEvent(type) {
      try {
        var evt = new Event(type, {
          bubbles: true
        });
        select.dispatchEvent(evt);
      } catch (_unused14) {
        var _evt = document.createEvent('Event');
        _evt.initEvent(type, true, true);
        select.dispatchEvent(_evt);
      }
    };
    dispatchEvent('input');
    dispatchEvent('change');
    if (typeof select.focus === 'function') {
      try {
        select.focus({
          preventScroll: true
        });
      } catch (_unused15) {
        select.focus();
      }
    }
  };
  if (typeof window !== 'undefined' && typeof window.PointerEvent !== 'undefined') {
    select.addEventListener('pointerdown', handlePointerToggle);
  } else {
    select.addEventListener('mousedown', handlePointerToggle);
  }
}
[autoGearScenariosSelect, autoGearMatteboxSelect, autoGearCameraHandleSelect, autoGearViewfinderExtensionSelect, autoGearVideoDistributionSelect, autoGearCameraSelect, autoGearOwnGearSelect, autoGearMonitorSelect, autoGearCrewPresentSelect, autoGearCrewAbsentSelect, autoGearWirelessSelect, autoGearMotorsSelect, autoGearControllersSelect, autoGearDistanceSelect].forEach(enableAutoGearMultiSelectToggle);
var autoGearAddScreenSizeField = (autoGearAddScreenSizeInput === null || autoGearAddScreenSizeInput === void 0 ? void 0 : autoGearAddScreenSizeInput.closest('.auto-gear-field')) || (autoGearAddScreenSizeLabel === null || autoGearAddScreenSizeLabel === void 0 ? void 0 : autoGearAddScreenSizeLabel.closest('.auto-gear-field')) || null;
var autoGearAddSelectorTypeField = (autoGearAddSelectorTypeSelect === null || autoGearAddSelectorTypeSelect === void 0 ? void 0 : autoGearAddSelectorTypeSelect.closest('.auto-gear-field')) || (autoGearAddSelectorTypeLabel === null || autoGearAddSelectorTypeLabel === void 0 ? void 0 : autoGearAddSelectorTypeLabel.closest('.auto-gear-field')) || null;
var autoGearAddSelectorDefaultField = (autoGearAddSelectorDefaultInput === null || autoGearAddSelectorDefaultInput === void 0 ? void 0 : autoGearAddSelectorDefaultInput.closest('.auto-gear-field')) || (autoGearAddSelectorDefaultLabel === null || autoGearAddSelectorDefaultLabel === void 0 ? void 0 : autoGearAddSelectorDefaultLabel.closest('.auto-gear-field')) || null;
var autoGearRemoveScreenSizeField = (autoGearRemoveScreenSizeInput === null || autoGearRemoveScreenSizeInput === void 0 ? void 0 : autoGearRemoveScreenSizeInput.closest('.auto-gear-field')) || (autoGearRemoveScreenSizeLabel === null || autoGearRemoveScreenSizeLabel === void 0 ? void 0 : autoGearRemoveScreenSizeLabel.closest('.auto-gear-field')) || null;
var autoGearRemoveSelectorTypeField = (autoGearRemoveSelectorTypeSelect === null || autoGearRemoveSelectorTypeSelect === void 0 ? void 0 : autoGearRemoveSelectorTypeSelect.closest('.auto-gear-field')) || (autoGearRemoveSelectorTypeLabel === null || autoGearRemoveSelectorTypeLabel === void 0 ? void 0 : autoGearRemoveSelectorTypeLabel.closest('.auto-gear-field')) || null;
var autoGearRemoveSelectorDefaultField = (autoGearRemoveSelectorDefaultInput === null || autoGearRemoveSelectorDefaultInput === void 0 ? void 0 : autoGearRemoveSelectorDefaultInput.closest('.auto-gear-field')) || (autoGearRemoveSelectorDefaultLabel === null || autoGearRemoveSelectorDefaultLabel === void 0 ? void 0 : autoGearRemoveSelectorDefaultLabel.closest('.auto-gear-field')) || null;
autoGearAddMonitorFieldGroup = {
  select: autoGearAddCategorySelect,
  screenSizeField: autoGearAddScreenSizeField,
  screenSizeInput: autoGearAddScreenSizeInput,
  selectorTypeField: autoGearAddSelectorTypeField,
  selectorTypeSelect: autoGearAddSelectorTypeSelect,
  selectorDefaultField: autoGearAddSelectorDefaultField,
  selectorDefaultInput: autoGearAddSelectorDefaultInput
};
autoGearRemoveMonitorFieldGroup = {
  select: autoGearRemoveCategorySelect,
  screenSizeField: autoGearRemoveScreenSizeField,
  screenSizeInput: autoGearRemoveScreenSizeInput,
  selectorTypeField: autoGearRemoveSelectorTypeField,
  selectorTypeSelect: autoGearRemoveSelectorTypeSelect,
  selectorDefaultField: autoGearRemoveSelectorDefaultField,
  selectorDefaultInput: autoGearRemoveSelectorDefaultInput
};
autoGearMonitorDefaultGroups = [{
  selectorTypeSelect: autoGearAddSelectorTypeSelect,
  selectorDefaultInput: autoGearAddSelectorDefaultInput
}, {
  selectorTypeSelect: autoGearRemoveSelectorTypeSelect,
  selectorDefaultInput: autoGearRemoveSelectorDefaultInput
}].filter(function (group) {
  return group.selectorDefaultInput;
});
function syncAutoGearMonitorFieldVisibility() {
  if (autoGearAddMonitorFieldGroup) {
    updateAutoGearMonitorFieldGroup(autoGearAddMonitorFieldGroup);
  }
  if (autoGearRemoveMonitorFieldGroup) {
    updateAutoGearMonitorFieldGroup(autoGearRemoveMonitorFieldGroup);
  }
}
exposeCoreRuntimeConstant('syncAutoGearMonitorFieldVisibility', syncAutoGearMonitorFieldVisibility);
var autoGearExportButton = document.getElementById('autoGearExport');
var autoGearImportButton = document.getElementById('autoGearImport');
var autoGearImportInput = document.getElementById('autoGearImportInput');
var autoGearBackupsSection = document.getElementById('autoGearBackupsSection');
var autoGearBackupsHeading = document.getElementById('autoGearBackupsHeading');
var autoGearBackupsDescription = document.getElementById('autoGearBackupsDescription');
var autoGearBackupSelectLabel = document.getElementById('autoGearBackupSelectLabel');
var autoGearBackupSelect = document.getElementById('autoGearBackupSelect');
var autoGearBackupRestoreButton = document.getElementById('autoGearBackupRestore');
var autoGearBackupControls = document.getElementById('autoGearBackupControls');
var autoGearBackupEmptyMessage = document.getElementById('autoGearBackupEmpty');
var autoGearBackupRetentionLabel = document.getElementById('autoGearBackupRetentionLabel');
var autoGearBackupRetentionInput = document.getElementById('autoGearBackupRetention');
var autoGearBackupRetentionSummary = document.getElementById('autoGearBackupRetentionSummary');
var autoGearBackupRetentionWarning = document.getElementById('autoGearBackupRetentionWarning');
var autoGearShowBackupsCheckbox = document.getElementById('autoGearShowBackups');
var autoGearShowBackupsLabel = document.getElementById('autoGearShowBackupsLabel');
var autoGearBackupsHiddenNotice = document.getElementById('autoGearBackupsHidden');
var dataHeading = document.getElementById("dataHeading");
var storageSummaryIntro = document.getElementById("storageSummaryIntro");
var storageSummaryList = document.getElementById("storageSummaryList");
if (typeof globalThis !== 'undefined') {
  globalThis.storageSummaryList = storageSummaryList;
}
var storageSummaryEmpty = document.getElementById("storageSummaryEmpty");
var storageSummaryFootnote = document.getElementById("storageSummaryFootnote");
var storagePersistenceSection = document.getElementById("storagePersistence");
var storagePersistenceHeading = document.getElementById("storagePersistenceHeading");
var storagePersistenceIntro = document.getElementById("storagePersistenceIntro");
var storagePersistenceRequestButton = document.getElementById("storagePersistenceRequest");
var storagePersistenceStatus = document.getElementById("storagePersistenceStatus");
var storageActionsHeading = document.getElementById('storageActionsHeading');
var storageActionsIntro = document.getElementById('storageActionsIntro');
var storageBackupNowButton = document.getElementById('storageBackupNow');
var storageOpenBackupTabButton = document.getElementById('storageOpenBackupTab');
var storageStatusHeading = document.getElementById('storageStatusHeading');
var storageStatusLastProjectLabel = document.getElementById('storageStatusLastProjectLabel');
var storageStatusLastProjectValue = document.getElementById('storageStatusLastProjectValue');
var storageStatusLastAutoBackupLabel = document.getElementById('storageStatusLastAutoBackupLabel');
var storageStatusLastAutoBackupValue = document.getElementById('storageStatusLastAutoBackupValue');
var storageStatusLastFullBackupLabel = document.getElementById('storageStatusLastFullBackupLabel');
var storageStatusLastFullBackupValue = document.getElementById('storageStatusLastFullBackupValue');
var storageStatusReminder = document.getElementById('storageStatusReminder');
var loggingSection = document.getElementById('loggingSection');
var loggingHeading = document.getElementById('loggingHeading');
var loggingIntro = document.getElementById('loggingIntro');
var loggingLevelFilterLabel = document.getElementById('loggingLevelFilterLabel');
var loggingLevelFilter = document.getElementById('loggingLevelFilter');
var loggingNamespaceFilterLabel = document.getElementById('loggingNamespaceFilterLabel');
var loggingNamespaceFilter = document.getElementById('loggingNamespaceFilter');
var loggingNamespaceFilterHelp = document.getElementById('loggingNamespaceFilterHelp');
var loggingHistoryLimitLabel = document.getElementById('loggingHistoryLimitLabel');
var loggingHistoryLimit = document.getElementById('loggingHistoryLimit');
var loggingHistoryLimitHelp = document.getElementById('loggingHistoryLimitHelp');
var loggingConsoleOutputLabel = document.getElementById('loggingConsoleOutputLabel');
var loggingConsoleOutputHelp = document.getElementById('loggingConsoleOutputHelp');
var loggingCaptureConsoleLabel = document.getElementById('loggingCaptureConsoleLabel');
var loggingCaptureConsoleHelp = document.getElementById('loggingCaptureConsoleHelp');
var loggingCaptureErrorsLabel = document.getElementById('loggingCaptureErrorsLabel');
var loggingCaptureErrorsHelp = document.getElementById('loggingCaptureErrorsHelp');
var loggingPersistSessionLabel = document.getElementById('loggingPersistSessionLabel');
var loggingPersistSessionHelp = document.getElementById('loggingPersistSessionHelp');
var loggingExportButton = document.getElementById('loggingExportBtn');
var loggingExportHelp = document.getElementById('loggingExportHelp');
var loggingStatus = document.getElementById('loggingStatus');
var loggingEmpty = document.getElementById('loggingEmpty');
var loggingUnavailable = document.getElementById('loggingUnavailable');
if (autoGearBackupRetentionInput) {
  var queueAutoGearRetentionHandler = function queueAutoGearRetentionHandler(handlerName) {
    callCoreFunctionIfAvailable(handlerName, [], {
      defer: true
    });
  };
  autoGearBackupRetentionInput.addEventListener('input', function () {
    queueAutoGearRetentionHandler('handleAutoGearBackupRetentionInput');
  });
  autoGearBackupRetentionInput.addEventListener('blur', function () {
    queueAutoGearRetentionHandler('handleAutoGearBackupRetentionBlur');
  });
  autoGearBackupRetentionInput.addEventListener('change', function () {
    queueAutoGearRetentionHandler('handleAutoGearBackupRetentionChange');
  });
}
function computeAutoGearMultiSelectSize(optionCount) {
  var _ref61 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    fallback = _ref61.fallback,
    _ref61$minRows = _ref61.minRows,
    minRows = _ref61$minRows === void 0 ? AUTO_GEAR_MULTI_SELECT_MIN_ROWS : _ref61$minRows,
    _ref61$maxRows = _ref61.maxRows,
    maxRows = _ref61$maxRows === void 0 ? AUTO_GEAR_MULTI_SELECT_MAX_ROWS : _ref61$maxRows;
  var effectiveFallback = Number.isFinite(fallback) && fallback >= minRows ? fallback : minRows;
  if (!Number.isFinite(optionCount) || optionCount <= 0) {
    return effectiveFallback;
  }
  var boundedMax = Number.isFinite(maxRows) && maxRows >= minRows ? maxRows : minRows;
  return Math.max(minRows, Math.min(optionCount, boundedMax));
}
function setAutoGearSearchQuery(value) {
  var nextValue = typeof value === 'string' ? value : '';
  if (autoGearSearchQuery === nextValue) return;
  autoGearSearchQuery = nextValue;
  callCoreFunctionIfAvailable('renderAutoGearRulesList', [], {
    defer: true
  });
}
function setAutoGearScenarioFilter(value) {
  var nextValue = typeof value === 'string' && value !== 'all' ? value : 'all';
  if (autoGearScenarioFilter === nextValue) return;
  autoGearScenarioFilter = nextValue;
  callCoreFunctionIfAvailable('renderAutoGearRulesList', [], {
    defer: true
  });
}
function clearAutoGearFilters() {
  autoGearSearchQuery = '';
  autoGearScenarioFilter = 'all';
  autoGearSummaryFocus = 'all';
  if (autoGearSearchInput && autoGearSearchInput.value !== '') {
    autoGearSearchInput.value = '';
  }
  if (autoGearFilterScenarioSelect && autoGearFilterScenarioSelect.value !== 'all') {
    autoGearFilterScenarioSelect.value = 'all';
  }
  callCoreFunctionIfAvailable('renderAutoGearRulesList', [], {
    defer: true
  });
  if (autoGearSearchInput && typeof autoGearSearchInput.focus === 'function') {
    try {
      autoGearSearchInput.focus({
        preventScroll: true
      });
    } catch (_unused16) {
      autoGearSearchInput.focus();
    }
  }
}
function autoGearRuleMatchesScenario(rule, scenarioValue) {
  if (!scenarioValue || scenarioValue === 'all') return true;
  if (!rule || !Array.isArray(rule.scenarios)) return false;
  return rule.scenarios.some(function (value) {
    return value === scenarioValue;
  });
}
function autoGearRuleMatchesSearch(rule, query) {
  var normalizedQuery = typeof query === 'string' ? query.trim().toLowerCase() : '';
  if (!normalizedQuery) return true;
  var haystack = [];
  var pushValues = function pushValues(values) {
    if (!Array.isArray(values)) return;
    values.forEach(function (value) {
      if (typeof value === 'string' && value) {
        haystack.push(value);
      }
    });
  };
  if (rule && typeof rule.label === 'string') {
    haystack.push(rule.label);
  }
  if (rule && rule.always) {
    var _texts$currentLang12, _texts$en20;
    haystack.push('always');
    var alwaysText = ((_texts$currentLang12 = texts[currentLang]) === null || _texts$currentLang12 === void 0 ? void 0 : _texts$currentLang12.autoGearAlwaysMeta) || ((_texts$en20 = texts.en) === null || _texts$en20 === void 0 ? void 0 : _texts$en20.autoGearAlwaysMeta) || 'Always active';
    if (alwaysText) {
      haystack.push(alwaysText);
    }
  }
  pushValues(rule === null || rule === void 0 ? void 0 : rule.scenarios);
  pushValues(rule === null || rule === void 0 ? void 0 : rule.mattebox);
  pushValues(rule === null || rule === void 0 ? void 0 : rule.cameraHandle);
  pushValues(rule === null || rule === void 0 ? void 0 : rule.viewfinderExtension);
  pushValues(rule === null || rule === void 0 ? void 0 : rule.deliveryResolution);
  pushValues(rule === null || rule === void 0 ? void 0 : rule.videoDistribution);
  pushValues(rule === null || rule === void 0 ? void 0 : rule.camera);
  pushValues(rule === null || rule === void 0 ? void 0 : rule.monitor);
  pushValues(rule === null || rule === void 0 ? void 0 : rule.crewPresent);
  pushValues(rule === null || rule === void 0 ? void 0 : rule.crewAbsent);
  pushValues(rule === null || rule === void 0 ? void 0 : rule.wireless);
  pushValues(rule === null || rule === void 0 ? void 0 : rule.motors);
  pushValues(rule === null || rule === void 0 ? void 0 : rule.controllers);
  pushValues(rule === null || rule === void 0 ? void 0 : rule.distance);
  var shootingCondition = normalizeAutoGearShootingDaysCondition(rule === null || rule === void 0 ? void 0 : rule.shootingDays);
  if (shootingCondition) {
    var _texts$currentLang13, _texts$en21, _texts$currentLang14, _texts$en22, _texts$currentLang15, _texts$en23, _texts$currentLang16, _texts$en24;
    var shootingLabel = ((_texts$currentLang13 = texts[currentLang]) === null || _texts$currentLang13 === void 0 ? void 0 : _texts$currentLang13.autoGearShootingDaysLabel) || ((_texts$en21 = texts.en) === null || _texts$en21 === void 0 ? void 0 : _texts$en21.autoGearShootingDaysLabel) || 'Shooting days condition';
    var minimumLabel = ((_texts$currentLang14 = texts[currentLang]) === null || _texts$currentLang14 === void 0 ? void 0 : _texts$currentLang14.autoGearShootingDaysModeMinimum) || ((_texts$en22 = texts.en) === null || _texts$en22 === void 0 ? void 0 : _texts$en22.autoGearShootingDaysModeMinimum) || 'Minimum';
    var maximumLabel = ((_texts$currentLang15 = texts[currentLang]) === null || _texts$currentLang15 === void 0 ? void 0 : _texts$currentLang15.autoGearShootingDaysModeMaximum) || ((_texts$en23 = texts.en) === null || _texts$en23 === void 0 ? void 0 : _texts$en23.autoGearShootingDaysModeMaximum) || 'Maximum';
    var everyLabel = ((_texts$currentLang16 = texts[currentLang]) === null || _texts$currentLang16 === void 0 ? void 0 : _texts$currentLang16.autoGearShootingDaysModeEvery) || ((_texts$en24 = texts.en) === null || _texts$en24 === void 0 ? void 0 : _texts$en24.autoGearShootingDaysModeEvery) || 'Every';
    if (shootingLabel) {
      haystack.push(shootingLabel);
    }
    haystack.push(String(shootingCondition.value));
    if (shootingCondition.mode === 'minimum') {
      haystack.push(minimumLabel);
    } else if (shootingCondition.mode === 'maximum') {
      haystack.push(maximumLabel);
    } else if (shootingCondition.mode === 'every') {
      haystack.push(everyLabel);
    }
  }
  var collectItems = function collectItems(items) {
    if (!Array.isArray(items)) return;
    items.forEach(function (item) {
      if (!item || _typeof(item) !== 'object') return;
      if (typeof item.name === 'string' && item.name) {
        haystack.push(item.name);
      }
      if (typeof item.notes === 'string' && item.notes) {
        haystack.push(item.notes);
      }
      if (typeof item.category === 'string' && item.category) {
        haystack.push(item.category);
      }
      if (typeof item.screenSize === 'string' && item.screenSize) {
        haystack.push(item.screenSize);
      }
      if (item.selector && _typeof(item.selector) === 'object') {
        if (typeof item.selector.type === 'string' && item.selector.type) {
          haystack.push(item.selector.type);
        }
        if (typeof item.selector.default === 'string' && item.selector.default) {
          haystack.push(item.selector.default);
        }
      }
      haystack.push(safeFormatAutoGearItemSummary(item));
    });
  };
  collectItems(rule === null || rule === void 0 ? void 0 : rule.add);
  collectItems(rule === null || rule === void 0 ? void 0 : rule.remove);
  return haystack.some(function (value) {
    return typeof value === 'string' && value.toLowerCase().includes(normalizedQuery);
  });
}
var AUTO_GEAR_SCENARIO_FALLBACK_VALUES = Object.freeze(['Indoor', 'Outdoor', 'Studio', 'Tripod', 'Handheld', 'Easyrig', 'Cine Saddle', 'Steadybag', 'Dolly', 'Slider', 'Steadicam', 'Gimbal', 'Trinity', 'Rollcage', 'Car Mount', 'Jib', 'Undersling mode', 'Crane', 'Remote Head', 'Extreme cold (snow)', 'Extreme rain', 'Extreme heat', 'Rain Machine', 'Slow Motion', 'Battery Belt']);
function getAutoGearScenarioFallbackOptions() {
  var normalizeEntry = function normalizeEntry(entry) {
    if (!entry || _typeof(entry) !== 'object') {
      return null;
    }
    var value = entry.value,
      label = entry.label;
    if (typeof value !== 'string') {
      return null;
    }
    var trimmedValue = value.trim();
    if (!trimmedValue) {
      return null;
    }
    var displayLabel = typeof label === 'string' && label.trim() ? label.trim() : trimmedValue;
    return {
      value: trimmedValue,
      label: displayLabel
    };
  };
  var resolveFromSession = function resolveFromSession() {
    var sessionEntries = callCoreFunctionIfAvailable('getRequiredScenarioOptionEntries', [], {
      defaultValue: null
    });
    if (Array.isArray(sessionEntries) && sessionEntries.length) {
      var normalized = sessionEntries.map(normalizeEntry).filter(Boolean);
      if (normalized.length) {
        return normalized;
      }
    }
    return null;
  };
  var resolveFromScenarioIcons = function resolveFromScenarioIcons() {
    var scope = getCoreGlobalObject();
    var scenarioIcons = scope && scope.scenarioIcons;
    if (!scenarioIcons || _typeof(scenarioIcons) !== 'object') {
      return null;
    }
    var entries = Object.keys(scenarioIcons).filter(function (key) {
      return typeof key === 'string';
    }).map(function (key) {
      return key.trim();
    }).filter(Boolean).map(function (value) {
      return {
        value: value,
        label: value
      };
    });
    return entries.length ? entries : null;
  };
  var resolveFromFallbackValues = function resolveFromFallbackValues() {
    return AUTO_GEAR_SCENARIO_FALLBACK_VALUES.map(function (value) {
      return {
        value: value,
        label: value
      };
    });
  };
  return (resolveFromSession() || resolveFromScenarioIcons() || resolveFromFallbackValues()).sort(function (a, b) {
    return localeSort(a.label, b.label);
  });
}
function collectAutoGearScenarioFilterOptions(rules) {
  var options = new Map();
  var source = document.getElementById('requiredScenarios');
  if (source) {
    Array.from(source.options || []).forEach(function (option) {
      var value = typeof option.value === 'string' ? option.value.trim() : '';
      if (!value) return;
      var label = option.textContent || value;
      if (!options.has(value)) {
        options.set(value, label);
      }
    });
  }
  if (Array.isArray(rules)) {
    rules.forEach(function (rule) {
      if (!rule || !Array.isArray(rule.scenarios)) return;
      rule.scenarios.forEach(function (value) {
        if (typeof value !== 'string') return;
        var trimmed = value.trim();
        if (!trimmed) return;
        if (!options.has(trimmed)) {
          options.set(trimmed, trimmed);
        }
      });
    });
  }
  if (!options.size) {
    getAutoGearScenarioFallbackOptions().forEach(function (_ref62) {
      var value = _ref62.value,
        label = _ref62.label;
      if (!options.has(value)) {
        options.set(value, label);
      }
    });
  }
  return Array.from(options.entries()).map(function (_ref63) {
    var _ref64 = _slicedToArray(_ref63, 2),
      value = _ref64[0],
      label = _ref64[1];
    return {
      value: value,
      label: label
    };
  }).sort(function (a, b) {
    return localeSort(a.label, b.label);
  });
}
function refreshAutoGearScenarioFilterOptions(rules) {
  var _texts$currentLang17, _texts$en25;
  if (!autoGearFilterScenarioSelect) return autoGearScenarioFilter;
  var options = collectAutoGearScenarioFilterOptions(rules);
  var anyLabel = ((_texts$currentLang17 = texts[currentLang]) === null || _texts$currentLang17 === void 0 ? void 0 : _texts$currentLang17.autoGearFilterScenarioAny) || ((_texts$en25 = texts.en) === null || _texts$en25 === void 0 ? void 0 : _texts$en25.autoGearFilterScenarioAny) || 'All scenarios';
  autoGearFilterScenarioSelect.innerHTML = '';
  var anyOption = document.createElement('option');
  anyOption.value = 'all';
  anyOption.textContent = anyLabel;
  autoGearFilterScenarioSelect.appendChild(anyOption);
  options.forEach(function (_ref65) {
    var value = _ref65.value,
      label = _ref65.label;
    var option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    if (value === autoGearScenarioFilter) {
      option.selected = true;
    }
    autoGearFilterScenarioSelect.appendChild(option);
  });
  var optionsAvailable = options.length > 0;
  autoGearFilterScenarioSelect.disabled = !optionsAvailable;
  if (!optionsAvailable && autoGearScenarioFilter !== 'all') {
    autoGearScenarioFilter = 'all';
  } else if (autoGearScenarioFilter !== 'all' && !options.some(function (option) {
    return option.value === autoGearScenarioFilter;
  })) {
    autoGearScenarioFilter = 'all';
  }
  autoGearFilterScenarioSelect.value = autoGearScenarioFilter;
  return autoGearScenarioFilter;
}
function cloneAutoGearDraftItem(item) {
  var normalized = normalizeAutoGearItem(item);
  if (normalized) return normalized;
  return {
    id: generateAutoGearId('item'),
    name: '',
    category: '',
    quantity: 1,
    screenSize: '',
    selectorType: 'none',
    selectorDefault: '',
    selectorEnabled: false,
    notes: '',
    ownGearId: '',
    ownGearLabel: ''
  };
}
function createAutoGearDraft(rule) {
  if (rule) {
    var scenarioLogic = normalizeAutoGearScenarioLogic(rule.scenarioLogic);
    var matteboxLogic = readAutoGearConditionLogic(rule, 'mattebox');
    var cameraHandleLogic = readAutoGearConditionLogic(rule, 'cameraHandle');
    var viewfinderExtensionLogic = readAutoGearConditionLogic(rule, 'viewfinderExtension');
    var deliveryResolutionLogic = readAutoGearConditionLogic(rule, 'deliveryResolution');
    var videoDistributionLogic = readAutoGearConditionLogic(rule, 'videoDistribution');
    var cameraLogic = readAutoGearConditionLogic(rule, 'camera');
    var ownGearLogic = readAutoGearConditionLogic(rule, 'ownGear');
    var monitorLogic = readAutoGearConditionLogic(rule, 'monitor');
    var crewPresentLogic = readAutoGearConditionLogic(rule, 'crewPresent');
    var crewAbsentLogic = readAutoGearConditionLogic(rule, 'crewAbsent');
    var wirelessLogic = readAutoGearConditionLogic(rule, 'wireless');
    var motorsLogic = readAutoGearConditionLogic(rule, 'motors');
    var controllersLogic = readAutoGearConditionLogic(rule, 'controllers');
    var distanceLogic = readAutoGearConditionLogic(rule, 'distance');
    var draftConditionLogic = {};
    if (scenarioLogic !== 'all') draftConditionLogic.scenarios = scenarioLogic;
    if (matteboxLogic !== 'all') draftConditionLogic.mattebox = matteboxLogic;
    if (cameraHandleLogic !== 'all') draftConditionLogic.cameraHandle = cameraHandleLogic;
    if (viewfinderExtensionLogic !== 'all') draftConditionLogic.viewfinderExtension = viewfinderExtensionLogic;
    if (deliveryResolutionLogic !== 'all') draftConditionLogic.deliveryResolution = deliveryResolutionLogic;
    if (videoDistributionLogic !== 'all') draftConditionLogic.videoDistribution = videoDistributionLogic;
    if (cameraLogic !== 'all') draftConditionLogic.camera = cameraLogic;
    if (ownGearLogic !== 'all') draftConditionLogic.ownGear = ownGearLogic;
    if (monitorLogic !== 'all') draftConditionLogic.monitor = monitorLogic;
    if (crewPresentLogic !== 'all') draftConditionLogic.crewPresent = crewPresentLogic;
    if (crewAbsentLogic !== 'all') draftConditionLogic.crewAbsent = crewAbsentLogic;
    if (wirelessLogic !== 'all') draftConditionLogic.wireless = wirelessLogic;
    if (motorsLogic !== 'all') draftConditionLogic.motors = motorsLogic;
    if (controllersLogic !== 'all') draftConditionLogic.controllers = controllersLogic;
    if (distanceLogic !== 'all') draftConditionLogic.distance = distanceLogic;
    return {
      id: rule.id,
      label: rule.label || '',
      always: rule.always ? ['always'] : [],
      scenarioLogic: scenarioLogic,
      scenarioPrimary: normalizeAutoGearScenarioPrimary(rule.scenarioPrimary),
      scenarioMultiplier: normalizeAutoGearScenarioMultiplier(rule.scenarioMultiplier),
      scenarios: Array.isArray(rule.scenarios) ? rule.scenarios.slice() : [],
      mattebox: Array.isArray(rule.mattebox) ? rule.mattebox.slice() : [],
      cameraHandle: Array.isArray(rule.cameraHandle) ? rule.cameraHandle.slice() : [],
      viewfinderExtension: Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension.slice() : [],
      deliveryResolution: Array.isArray(rule.deliveryResolution) ? rule.deliveryResolution.slice() : [],
      videoDistribution: Array.isArray(rule.videoDistribution) ? rule.videoDistribution.slice() : [],
      camera: Array.isArray(rule.camera) ? rule.camera.slice() : [],
      ownGear: Array.isArray(rule.ownGear) ? rule.ownGear.slice() : [],
      cameraWeight: rule.cameraWeight ? normalizeAutoGearCameraWeightCondition(rule.cameraWeight) || null : null,
      monitor: Array.isArray(rule.monitor) ? rule.monitor.slice() : [],
      crewPresent: Array.isArray(rule.crewPresent) ? rule.crewPresent.slice() : [],
      crewAbsent: Array.isArray(rule.crewAbsent) ? rule.crewAbsent.slice() : [],
      wireless: Array.isArray(rule.wireless) ? rule.wireless.slice() : [],
      motors: Array.isArray(rule.motors) ? rule.motors.slice() : [],
      controllers: Array.isArray(rule.controllers) ? rule.controllers.slice() : [],
      distance: Array.isArray(rule.distance) ? rule.distance.slice() : [],
      shootingDays: normalizeAutoGearShootingDaysCondition(rule.shootingDays),
      add: Array.isArray(rule.add) ? rule.add.map(cloneAutoGearDraftItem) : [],
      remove: Array.isArray(rule.remove) ? rule.remove.map(cloneAutoGearDraftItem) : [],
      matteboxLogic: matteboxLogic,
      cameraHandleLogic: cameraHandleLogic,
      viewfinderExtensionLogic: viewfinderExtensionLogic,
      deliveryResolutionLogic: deliveryResolutionLogic,
      videoDistributionLogic: videoDistributionLogic,
      cameraLogic: cameraLogic,
      ownGearLogic: ownGearLogic,
      monitorLogic: monitorLogic,
      crewPresentLogic: crewPresentLogic,
      crewAbsentLogic: crewAbsentLogic,
      wirelessLogic: wirelessLogic,
      motorsLogic: motorsLogic,
      controllersLogic: controllersLogic,
      distanceLogic: distanceLogic,
      conditionLogic: draftConditionLogic
    };
  }
  return {
    id: generateAutoGearId('rule'),
    label: '',
    always: [],
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
    ownGear: [],
    cameraWeight: null,
    monitor: [],
    crewPresent: [],
    crewAbsent: [],
    wireless: [],
    motors: [],
    controllers: [],
    distance: [],
    shootingDays: null,
    add: [],
    remove: [],
    matteboxLogic: 'all',
    cameraHandleLogic: 'all',
    viewfinderExtensionLogic: 'all',
    deliveryResolutionLogic: 'all',
    videoDistributionLogic: 'all',
    cameraLogic: 'all',
    ownGearLogic: 'all',
    monitorLogic: 'all',
    crewPresentLogic: 'all',
    crewAbsentLogic: 'all',
    wirelessLogic: 'all',
    motorsLogic: 'all',
    controllersLogic: 'all',
    distanceLogic: 'all',
    conditionLogic: {}
  };
}
function getCrewRoleEntries() {
  var _texts$en26;
  var langTexts = texts[currentLang] || texts.en || {};
  var crewRoleMap = langTexts.crewRoles || ((_texts$en26 = texts.en) === null || _texts$en26 === void 0 ? void 0 : _texts$en26.crewRoles) || {};
  var seen = new Set();
  var entries = [];
  Object.entries(crewRoleMap).forEach(function (_ref66) {
    var _ref67 = _slicedToArray(_ref66, 2),
      value = _ref67[0],
      label = _ref67[1];
    if (typeof value !== 'string') return;
    var trimmedValue = value.trim();
    if (!trimmedValue) return;
    var key = trimmedValue.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    var displayLabel = typeof label === 'string' && label.trim() ? label.trim() : trimmedValue;
    entries.push({
      value: trimmedValue,
      label: displayLabel
    });
  });
  return entries.sort(function (a, b) {
    return a.label.localeCompare(b.label, undefined, {
      sensitivity: 'base'
    });
  });
}
exposeCoreRuntimeConstant('setupInstallBanner', setupInstallBanner);
exposeCoreRuntimeConstant('maybeShowIosPwaHelp', maybeShowIosPwaHelp);
exposeCoreRuntimeConstant('updateSelectIconBoxes', updateSelectIconBoxes);
exposeCoreRuntimeConstant('updateGlobalDevicesReference', updateGlobalDevicesReference);
exposeCoreRuntimeConstant('setLanguage', setLanguage);
exposeCoreRuntimeConstant('configureIconOnlyButton', configureIconOnlyButton);
exposeCoreRuntimeConstant('encodeSharedSetup', encodeSharedSetup);
exposeCoreRuntimeConstant('decodeSharedSetup', decodeSharedSetup);
exposeCoreRuntimeConstant('iconMarkup', iconMarkup);
exposeCoreRuntimeConstant('ICON_GLYPHS', ICON_GLYPHS);
exposeCoreRuntimeConstant('iconGlyph', iconGlyph);
exposeCoreRuntimeConstant('resolveIconGlyph', resolveIconGlyph);
exposeCoreRuntimeConstant('applyIconGlyph', applyIconGlyph);
exposeCoreRuntimeConstant('positionSvgMarkup', positionSvgMarkup);
exposeCoreRuntimeConstant('formatSvgCoordinate', formatSvgCoordinate);
var CORE_RUNTIME_CONSTANTS = {
  CORE_GLOBAL_SCOPE: CORE_GLOBAL_SCOPE,
  CORE_BOOT_QUEUE_KEY: CORE_BOOT_QUEUE_KEY,
  CORE_BOOT_QUEUE: CORE_BOOT_QUEUE,
  CORE_SHARED: CORE_SHARED,
  INSTALL_BANNER_DISMISSED_KEY: INSTALL_BANNER_DISMISSED_KEY,
  AUTO_GEAR_ANY_MOTOR_TOKEN: AUTO_GEAR_ANY_MOTOR_TOKEN,
  AUTO_GEAR_BACKUP_RETENTION_MIN_VALUE: AUTO_GEAR_BACKUP_RETENTION_MIN_VALUE,
  AUTO_GEAR_BACKUP_RETENTION_MAX: AUTO_GEAR_BACKUP_RETENTION_MAX,
  AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS,
  AUTO_GEAR_MONITOR_DEFAULT_TYPES: AUTO_GEAR_MONITOR_DEFAULT_TYPES,
  GEAR_LIST_CATEGORIES: GEAR_LIST_CATEGORIES,
  TEMPERATURE_STORAGE_KEY: CORE_TEMPERATURE_STORAGE_KEY,
  TEMPERATURE_UNITS: CORE_TEMPERATURE_UNITS,
  TEMPERATURE_SCENARIOS: TEMPERATURE_SCENARIOS,
  FOCUS_SCALE_STORAGE_KEY: FOCUS_SCALE_STORAGE_KEY,
  FOCUS_SCALE_VALUES: focusScaleValues,
  FEEDBACK_TEMPERATURE_MIN: globalThis.FEEDBACK_TEMPERATURE_MIN_VALUE,
  FEEDBACK_TEMPERATURE_MAX: globalThis.FEEDBACK_TEMPERATURE_MAX_VALUE
};
Object.assign(CORE_RUNTIME_CONSTANTS, MOUNT_VOLTAGE_RUNTIME_EXPORTS);
exposeCoreRuntimeConstants(CORE_RUNTIME_CONSTANTS);
exposeCoreRuntimeBindings({
  updatePowerSummary: updatePowerSummary,
  drawPowerDiagram: drawPowerDiagram,
  safeGenerateConnectorSummary: {
    get: function get() {
      return sessionSafeGenerateConnectorSummary;
    },
    set: function set(value) {
      if (typeof value === 'function') {
        sessionSafeGenerateConnectorSummary = value;
      }
    }
  },
  baseAutoGearRules: {
    get: function get() {
      return baseAutoGearRulesState;
    },
    set: function set(value) {
      if (Array.isArray(value)) {
        baseAutoGearRulesState = value;
      }
    }
  },
  autoGearAutoPresetId: {
    get: function get() {
      return autoGearAutoPresetIdState;
    },
    set: function set(value) {
      if (typeof value === 'string') {
        autoGearAutoPresetIdState = value;
      } else if (value === null || typeof value === 'undefined') {
        autoGearAutoPresetIdState = '';
      }
    }
  },
  autoGearScenarioModeSelect: {
    get: function get() {
      return autoGearScenarioModeSelectElement;
    },
    set: function set(value) {
      autoGearScenarioModeSelectElement = value || null;
      setAutoGearScenarioModeSelectElementRef(autoGearScenarioModeSelectElement);
    }
  },
  pinkModeIconRotationTimer: {
    get: function get() {
      return typeof getPinkModeIconRotationTimer === 'function' ? getPinkModeIconRotationTimer() : null;
    },
    set: function set(value) {
      if (typeof setPinkModeIconRotationTimer === 'function') {
        setPinkModeIconRotationTimer(value);
      }
    }
  },
  pinkModeIconIndex: {
    get: function get() {
      return typeof getPinkModeIconIndex === 'function' ? getPinkModeIconIndex() : 0;
    },
    set: function set(value) {
      if (typeof setPinkModeIconIndex === 'function') {
        setPinkModeIconIndex(value);
      }
    }
  }
});
var scheduleLayoutInitialization = function scheduleLayoutInitialization() {
  if (typeof initializeLayoutControls === 'function') {
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(initializeLayoutControls);
    } else {
      setTimeout(initializeLayoutControls, 0);
    }
  }
};
scheduleLayoutInitialization();
if (typeof globalThis !== 'undefined') {
  globalThis.encodeSharedSetup = encodeSharedSetup;
  globalThis.decodeSharedSetup = decodeSharedSetup;
}