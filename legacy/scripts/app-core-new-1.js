var _excluded = ["portType", "type"],
  _excluded2 = ["count"],
  _excluded3 = ["type"],
  _excluded4 = ["type"];
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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
var CORE_PART1_RUNTIME_SCOPE = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : null;
function resolveCoreSupportModule(namespaceName, requirePath) {
  if (CORE_PART1_RUNTIME_SCOPE && _typeof(CORE_PART1_RUNTIME_SCOPE) === 'object' && CORE_PART1_RUNTIME_SCOPE[namespaceName] && _typeof(CORE_PART1_RUNTIME_SCOPE[namespaceName]) === 'object') {
    return CORE_PART1_RUNTIME_SCOPE[namespaceName];
  }
  if (typeof require === 'function') {
    try {
      var required = require(requirePath);
      if (required && _typeof(required) === 'object') {
        return required;
      }
    } catch (supportModuleError) {
      void supportModuleError;
    }
  }
  return null;
}
var CORE_LOCALIZATION_BRIDGE = resolveCoreSupportModule('cineCoreLocalizationBridge', './modules/core/localization-bridge.js');
var CORE_RUNTIME_TOOLS = resolveCoreSupportModule('cineCoreRuntimeTools', './modules/core/runtime-tools.js');
function fallbackResolveLocaleModule(scope) {
  if (typeof cineLocale !== 'undefined' && cineLocale && (typeof cineLocale === "undefined" ? "undefined" : _typeof(cineLocale)) === 'object') {
    return cineLocale;
  }
  var candidates = [scope];
  if (typeof globalThis !== 'undefined') candidates.push(globalThis);
  if (typeof window !== 'undefined') candidates.push(window);
  if (typeof self !== 'undefined') candidates.push(self);
  if (typeof global !== 'undefined') candidates.push(global);
  for (var index = 0; index < candidates.length; index += 1) {
    var candidate = candidates[index];
    if (!candidate || _typeof(candidate) !== 'object' && typeof candidate !== 'function') {
      continue;
    }
    try {
      var moduleCandidate = candidate.cineLocale;
      if (moduleCandidate && _typeof(moduleCandidate) === 'object') {
        return moduleCandidate;
      }
    } catch (localeLookupError) {
      void localeLookupError;
    }
  }
  if (typeof require === 'function') {
    try {
      var required = require('./modules/localization.js');
      if (required && _typeof(required) === 'object') {
        return required;
      }
    } catch (localeRequireError) {
      void localeRequireError;
    }
  }
  return null;
}
function fallbackNormalizeLanguageCode(lang) {
  if (!lang) {
    return DEFAULT_LANGUAGE;
  }
  try {
    return String(lang).trim().toLowerCase();
  } catch (languageNormalizeError) {
    void languageNormalizeError;
  }
  return DEFAULT_LANGUAGE;
}
function fallbackIsRtlLanguage(lang) {
  var normalized = fallbackNormalizeLanguageCode(lang);
  var base = normalized.split('-')[0];
  return RTL_LANGUAGE_CODES.indexOf(base) !== -1;
}
function fallbackResolveDocumentDirection(lang) {
  if (typeof document !== 'undefined' && document && document.documentElement) {
    try {
      var docDir = document.documentElement.getAttribute('dir');
      if (docDir === 'rtl' || docDir === 'ltr') {
        return docDir;
      }
    } catch (documentDirectionError) {
      void documentDirectionError;
    }
  }
  return fallbackIsRtlLanguage(lang) ? 'rtl' : 'ltr';
}
function fallbackApplyLocaleMetadata(target, lang, direction) {
  if (!target) {
    return;
  }
  if (lang) {
    try {
      target.lang = lang;
    } catch (setLangError) {
      void setLangError;
    }
  }
  if (direction) {
    try {
      target.dir = direction;
    } catch (setDirError) {
      void setDirError;
    }
  }
}
var LOCALE_MODULE = CORE_LOCALIZATION_BRIDGE && typeof CORE_LOCALIZATION_BRIDGE.resolveLocaleModule === 'function' ? function resolveLocaleWithBridge() {
  try {
    return CORE_LOCALIZATION_BRIDGE.resolveLocaleModule(CORE_PART1_RUNTIME_SCOPE);
  } catch (bridgeResolveError) {
    void bridgeResolveError;
  }
  return fallbackResolveLocaleModule(CORE_PART1_RUNTIME_SCOPE);
}() : fallbackResolveLocaleModule(CORE_PART1_RUNTIME_SCOPE);
var DEFAULT_LANGUAGE = CORE_LOCALIZATION_BRIDGE && typeof CORE_LOCALIZATION_BRIDGE.getDefaultLanguage === 'function' ? function resolveDefaultLanguage() {
  try {
    return CORE_LOCALIZATION_BRIDGE.getDefaultLanguage(CORE_PART1_RUNTIME_SCOPE);
  } catch (resolveDefaultLanguageError) {
    void resolveDefaultLanguageError;
  }
  return LOCALE_MODULE && typeof LOCALE_MODULE.DEFAULT_LANGUAGE === 'string' ? LOCALE_MODULE.DEFAULT_LANGUAGE : 'en';
}() : LOCALE_MODULE && typeof LOCALE_MODULE.DEFAULT_LANGUAGE === 'string' ? LOCALE_MODULE.DEFAULT_LANGUAGE : 'en';
var RTL_LANGUAGE_CODES = CORE_LOCALIZATION_BRIDGE && typeof CORE_LOCALIZATION_BRIDGE.getRtlLanguageCodes === 'function' ? function resolveRtlCodes() {
  try {
    var codes = CORE_LOCALIZATION_BRIDGE.getRtlLanguageCodes(CORE_PART1_RUNTIME_SCOPE);
    return Array.isArray(codes) && codes.length > 0 ? codes : ['ar', 'fa', 'he', 'ur'];
  } catch (resolveRtlCodesError) {
    void resolveRtlCodesError;
  }
  return LOCALE_MODULE && Array.isArray(LOCALE_MODULE.RTL_LANGUAGE_CODES) && LOCALE_MODULE.RTL_LANGUAGE_CODES.length > 0 ? LOCALE_MODULE.RTL_LANGUAGE_CODES : ['ar', 'fa', 'he', 'ur'];
}() : LOCALE_MODULE && Array.isArray(LOCALE_MODULE.RTL_LANGUAGE_CODES) && LOCALE_MODULE.RTL_LANGUAGE_CODES.length > 0 ? LOCALE_MODULE.RTL_LANGUAGE_CODES : ['ar', 'fa', 'he', 'ur'];
var normalizeLanguageCode = CORE_LOCALIZATION_BRIDGE && typeof CORE_LOCALIZATION_BRIDGE.normalizeLanguageCode === 'function' ? function normalizeLanguageCodeProxy(lang) {
  try {
    return CORE_LOCALIZATION_BRIDGE.normalizeLanguageCode(lang, CORE_PART1_RUNTIME_SCOPE);
  } catch (normalizeError) {
    void normalizeError;
  }
  return fallbackNormalizeLanguageCode(lang);
} : fallbackNormalizeLanguageCode;
var isRtlLanguage = CORE_LOCALIZATION_BRIDGE && typeof CORE_LOCALIZATION_BRIDGE.isRtlLanguage === 'function' ? function isRtlLanguageProxy(lang) {
  try {
    return CORE_LOCALIZATION_BRIDGE.isRtlLanguage(lang, CORE_PART1_RUNTIME_SCOPE);
  } catch (isRtlError) {
    void isRtlError;
  }
  return fallbackIsRtlLanguage(lang);
} : fallbackIsRtlLanguage;
var resolveDocumentDirection = CORE_LOCALIZATION_BRIDGE && typeof CORE_LOCALIZATION_BRIDGE.resolveDocumentDirection === 'function' ? function resolveDocumentDirectionProxy(lang) {
  try {
    return CORE_LOCALIZATION_BRIDGE.resolveDocumentDirection(lang, CORE_PART1_RUNTIME_SCOPE);
  } catch (resolveDirectionError) {
    void resolveDirectionError;
  }
  return fallbackResolveDocumentDirection(lang);
} : fallbackResolveDocumentDirection;
var applyLocaleMetadata = CORE_LOCALIZATION_BRIDGE && typeof CORE_LOCALIZATION_BRIDGE.applyLocaleMetadata === 'function' ? function applyLocaleMetadataProxy(target, lang, direction) {
  try {
    return CORE_LOCALIZATION_BRIDGE.applyLocaleMetadata(target, lang, direction, CORE_PART1_RUNTIME_SCOPE);
  } catch (applyLocaleError) {
    void applyLocaleError;
  }
  return fallbackApplyLocaleMetadata(target, lang, direction);
} : fallbackApplyLocaleMetadata;
if (CORE_PART1_RUNTIME_SCOPE && CORE_PART1_RUNTIME_SCOPE.__cineCorePart1Initialized) {
  if (typeof console !== 'undefined' && typeof console.warn === 'function') {
    console.warn('Cine Power Planner core runtime (part 1) already initialized. Skipping duplicate load.');
  }
} else {
  var _autoGearConditionSec, _autoGearConditionSec2, _autoGearConditionSec3, _autoGearConditionSec4, _autoGearConditionSec5, _autoGearConditionSec6, _autoGearConditionSec7, _autoGearConditionSec8, _autoGearConditionSec9, _autoGearConditionSec0, _autoGearConditionSec1, _autoGearConditionSec10, _autoGearConditionSec11, _autoGearConditionSec12, _autoGearConditionSec13, _autoGearConditionSec14, _autoGearConditionSec15, _autoGearConditionSec16, _autoGearConditionSec17, _autoGearConditionSec18, _autoGearConditionSec19, _autoGearConditionSec20, _autoGearConditionSec21, _autoGearConditionSec22, _autoGearConditionSec23, _autoGearConditionSec24, _autoGearConditionSec25, _autoGearConditionSec26, _autoGearConditionSec27, _autoGearConditionSec28, _autoGearConditionSec29, _autoGearConditionSec30, _autoGearConditionSec31, _autoGearConditionSec32, _autoGearConditionSec33, _autoGearConditionSec34, _autoGearConditionSec35, _autoGearConditionSec36, _autoGearConditionSec37, _autoGearConditionSec38, _autoGearConditionSec39, _autoGearConditionSec40, _autoGearConditionSec41, _autoGearConditionSec42, _settingsButton$query;
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
  var CORE_GLOBAL_SCOPE = CORE_PART1_RUNTIME_SCOPE;
  function fallbackGetCoreGlobalObject() {
    if (CORE_GLOBAL_SCOPE && _typeof(CORE_GLOBAL_SCOPE) === 'object') {
      return CORE_GLOBAL_SCOPE;
    }
    if (typeof globalThis !== 'undefined' && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
      return globalThis;
    }
    if (typeof window !== 'undefined' && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
      return window;
    }
    if (typeof self !== 'undefined' && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
      return self;
    }
    if (typeof global !== 'undefined' && global && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
      return global;
    }
    return null;
  }
  function fallbackEnsureCoreGlobalValue(name, fallbackValue) {
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
    var scope = fallbackGetCoreGlobalObject();
    if (!scope || _typeof(scope) !== 'object') {
      return fallbackProvider();
    }
    var existing;
    try {
      existing = scope[name];
    } catch (readError) {
      existing = undefined;
      void readError;
    }
    if (typeof existing !== 'undefined') {
      return existing;
    }
    var value = fallbackProvider();
    try {
      scope[name] = value;
      return scope[name];
    } catch (assignError) {
      void assignError;
    }
    try {
      Object.defineProperty(scope, name, {
        configurable: true,
        writable: true,
        value: value
      });
    } catch (defineError) {
      void defineError;
    }
    try {
      return scope[name];
    } catch (finalReadError) {
      void finalReadError;
    }
    return value;
  }
  function fallbackJsonDeepClone(value) {
    if (value === null || _typeof(value) !== 'object') {
      return value;
    }
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (jsonCloneError) {
      void jsonCloneError;
    }
    return value;
  }
  function fallbackResolveStructuredClone(scope) {
    if (typeof structuredClone === 'function') {
      return structuredClone;
    }
    var targetScope = scope || fallbackGetCoreGlobalObject();
    if (targetScope && typeof targetScope.structuredClone === 'function') {
      try {
        return targetScope.structuredClone.bind(targetScope);
      } catch (bindError) {
        void bindError;
      }
    }
    if (typeof require === 'function') {
      try {
        var nodeUtil = require('node:util');
        if (nodeUtil && typeof nodeUtil.structuredClone === 'function') {
          return nodeUtil.structuredClone.bind(nodeUtil);
        }
      } catch (nodeUtilError) {
        void nodeUtilError;
      }
      try {
        var legacyUtil = require('util');
        if (legacyUtil && typeof legacyUtil.structuredClone === 'function') {
          return legacyUtil.structuredClone.bind(legacyUtil);
        }
      } catch (legacyUtilError) {
        void legacyUtilError;
      }
    }
    return null;
  }
  function fallbackCreateResilientDeepClone(scope) {
    var structuredCloneImpl = fallbackResolveStructuredClone(scope);
    if (!structuredCloneImpl) {
      return fallbackJsonDeepClone;
    }
    return function fallbackResilientDeepClone(value) {
      if (value === null || _typeof(value) !== 'object') {
        return value;
      }
      try {
        return structuredCloneImpl(value);
      } catch (structuredCloneError) {
        void structuredCloneError;
      }
      return fallbackJsonDeepClone(value);
    };
  }
  function fallbackEnsureDeepClone(scope) {
    var targetScope = scope || fallbackGetCoreGlobalObject();
    var clone = fallbackCreateResilientDeepClone(targetScope);
    if (targetScope && _typeof(targetScope) === 'object') {
      try {
        Object.defineProperty(targetScope, '__cineDeepClone', {
          configurable: true,
          writable: true,
          value: clone
        });
      } catch (defineError) {
        void defineError;
        try {
          targetScope.__cineDeepClone = clone;
        } catch (assignError) {
          void assignError;
        }
      }
    }
    return clone;
  }
  var getCoreGlobalObject = CORE_RUNTIME_TOOLS && typeof CORE_RUNTIME_TOOLS.detectScope === 'function' ? function getCoreGlobalObjectProxy() {
    try {
      return CORE_RUNTIME_TOOLS.detectScope(CORE_GLOBAL_SCOPE);
    } catch (detectScopeError) {
      void detectScopeError;
    }
    return fallbackGetCoreGlobalObject();
  } : fallbackGetCoreGlobalObject;
  var ensureCoreGlobalValue = CORE_RUNTIME_TOOLS && typeof CORE_RUNTIME_TOOLS.ensureGlobalValue === 'function' ? function ensureCoreGlobalValueProxy(name, fallbackValue) {
    return CORE_RUNTIME_TOOLS.ensureGlobalValue(name, fallbackValue, CORE_GLOBAL_SCOPE);
  } : fallbackEnsureCoreGlobalValue;
  var coreJsonDeepClone = CORE_RUNTIME_TOOLS && typeof CORE_RUNTIME_TOOLS.jsonDeepClone === 'function' ? function coreJsonDeepCloneProxy(value) {
    try {
      return CORE_RUNTIME_TOOLS.jsonDeepClone(value);
    } catch (jsonCloneError) {
      void jsonCloneError;
    }
    return fallbackJsonDeepClone(value);
  } : fallbackJsonDeepClone;
  var coreCreateResilientDeepClone = CORE_RUNTIME_TOOLS && typeof CORE_RUNTIME_TOOLS.createResilientDeepClone === 'function' ? function coreCreateResilientDeepCloneProxy(scope) {
    try {
      return CORE_RUNTIME_TOOLS.createResilientDeepClone(scope || CORE_GLOBAL_SCOPE);
    } catch (createDeepCloneError) {
      void createDeepCloneError;
    }
    return fallbackCreateResilientDeepClone(scope || CORE_GLOBAL_SCOPE);
  } : fallbackCreateResilientDeepClone;
  var CORE_DEEP_CLONE = CORE_RUNTIME_TOOLS && typeof CORE_RUNTIME_TOOLS.ensureDeepClone === 'function' ? CORE_RUNTIME_TOOLS.ensureDeepClone(CORE_GLOBAL_SCOPE) : fallbackEnsureDeepClone(CORE_GLOBAL_SCOPE);
  if (CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE.__cineDeepClone !== 'function') {
    try {
      CORE_GLOBAL_SCOPE.__cineDeepClone = CORE_DEEP_CLONE;
    } catch (coreDeepCloneError) {
      void coreDeepCloneError;
    }
  }
  var CORE_TEMPERATURE_QUEUE_KEY = '__cinePendingTemperatureNote';
  var CORE_TEMPERATURE_RENDER_NAME = 'renderTemperatureNote';
  function getEscapeHtmlFunction() {
    try {
      return typeof escapeHtml === 'function' ? escapeHtml : null;
    } catch (maybeReferenceError) {
      if (maybeReferenceError && maybeReferenceError.name === 'ReferenceError') {
        return null;
      }
      throw maybeReferenceError;
    }
  }
  function escapeButtonLabelSafely(text) {
    if (typeof text !== 'string' || text === '') {
      return '';
    }
    var escapeFn = getEscapeHtmlFunction();
    if (escapeFn) {
      try {
        return escapeFn(text);
      } catch (escapeError) {
        void escapeError;
      }
    }
    return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function getIconMarkupFunction() {
    try {
      if (typeof iconMarkup === 'function') {
        return iconMarkup;
      }
    } catch (maybeReferenceError) {
      if (!(maybeReferenceError && maybeReferenceError.name === 'ReferenceError')) {
        throw maybeReferenceError;
      }
    }
    if (CORE_GLOBAL_SCOPE && _typeof(CORE_GLOBAL_SCOPE) === 'object' && typeof CORE_GLOBAL_SCOPE.iconMarkup === 'function') {
      return CORE_GLOBAL_SCOPE.iconMarkup;
    }
    return null;
  }
  function resolveButtonIconMarkup(glyph) {
    if (!glyph) {
      return '';
    }
    var iconFactory = getIconMarkupFunction();
    if (!iconFactory) {
      return '';
    }
    try {
      return iconFactory(glyph, 'btn-icon');
    } catch (iconError) {
      void iconError;
    }
    return '';
  }
  var setButtonLabelWithIcon = CORE_GLOBAL_SCOPE && _typeof(CORE_GLOBAL_SCOPE) === 'object' && typeof CORE_GLOBAL_SCOPE.setButtonLabelWithIcon === 'function' ? CORE_GLOBAL_SCOPE.setButtonLabelWithIcon : function setButtonLabelWithIcon(button, label, glyph) {
    if (!button) {
      return;
    }
    var resolvedGlyph = glyph;
    if (resolvedGlyph === undefined && typeof ICON_GLYPHS !== 'undefined' && ICON_GLYPHS && ICON_GLYPHS.save) {
      resolvedGlyph = ICON_GLYPHS.save;
    }
    var iconHtml = resolveButtonIconMarkup(resolvedGlyph);
    var safeLabel = escapeButtonLabelSafely(typeof label === 'string' ? label : '');
    button.innerHTML = "".concat(iconHtml).concat(safeLabel);
  };
  if (CORE_GLOBAL_SCOPE && _typeof(CORE_GLOBAL_SCOPE) === 'object' && typeof CORE_GLOBAL_SCOPE.setButtonLabelWithIcon !== 'function') {
    try {
      CORE_GLOBAL_SCOPE.setButtonLabelWithIcon = setButtonLabelWithIcon;
    } catch (setButtonAssignError) {
      CORE_GLOBAL_SCOPE.setButtonLabelWithIcon = setButtonLabelWithIcon;
      void setButtonAssignError;
    }
  }
  var gridSnap = ensureCoreGlobalValue('gridSnap', function () {
    return false;
  });
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
  function exposeCoreRuntimeConstant(name, value) {
    if (typeof name !== 'string' || !name) {
      return;
    }
    var scope = CORE_GLOBAL_SCOPE && _typeof(CORE_GLOBAL_SCOPE) === 'object' ? CORE_GLOBAL_SCOPE : typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : null;
    if (!scope || _typeof(scope) !== 'object') {
      return;
    }
    var descriptor = null;
    try {
      descriptor = Object.getOwnPropertyDescriptor(scope, name);
    } catch (descriptorError) {
      descriptor = null;
      void descriptorError;
    }
    if (descriptor && descriptor.configurable === false && descriptor.writable === false) {
      return;
    }
    try {
      scope[name] = value;
      return;
    } catch (assignError) {
      void assignError;
    }
    try {
      Object.defineProperty(scope, name, {
        configurable: true,
        writable: true,
        value: value
      });
    } catch (defineError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn("Unable to expose ".concat(name, " globally"), defineError);
      }
    }
  }
  function exposeCoreRuntimeConstants(constants) {
    if (!constants || _typeof(constants) !== 'object') {
      return;
    }
    Object.keys(constants).forEach(function (key) {
      exposeCoreRuntimeConstant(key, constants[key]);
    });
  }
  function exposeCoreRuntimeBindings(bindings) {
    if (!bindings || _typeof(bindings) !== 'object') {
      return;
    }
    var scope = CORE_GLOBAL_SCOPE && _typeof(CORE_GLOBAL_SCOPE) === 'object' ? CORE_GLOBAL_SCOPE : typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : null;
    if (!scope || _typeof(scope) !== 'object') {
      return;
    }
    Object.entries(bindings).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        descriptor = _ref2[1];
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
    var scope = CORE_GLOBAL_SCOPE && _typeof(CORE_GLOBAL_SCOPE) === 'object' ? CORE_GLOBAL_SCOPE : typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : null;
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
  if (CORE_GLOBAL_SCOPE && _typeof(CORE_GLOBAL_SCOPE) === 'object') {
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
  function createCoreRuntimeState(initialScopes) {
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
    if (Array.isArray(initialScopes)) {
      for (var index = 0; index < initialScopes.length; index += 1) {
        try {
          registerScope(initialScopes[index]);
        } catch (initialiseScopeError) {
          void initialiseScopeError;
        }
      }
    }
    function withEachScope(callback) {
      if (typeof callback !== 'function') {
        return;
      }
      for (var _index = 0; _index < scopes.length; _index += 1) {
        try {
          callback(scopes[_index], _index);
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
      for (var _index2 = 0; _index2 < scopes.length; _index2 += 1) {
        var scope = scopes[_index2];
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
      for (var _index3 = 0; _index3 < scopes.length; _index3 += 1) {
        var scope = scopes[_index3];
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
  var CORE_RUNTIME_STATE = ensureCoreGlobalValue('__cineRuntimeState', function () {
    var initialScopes = [CORE_GLOBAL_SCOPE && _typeof(CORE_GLOBAL_SCOPE) === 'object' ? CORE_GLOBAL_SCOPE : null, typeof globalThis !== 'undefined' && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' ? globalThis : null, typeof window !== 'undefined' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' ? window : null, typeof self !== 'undefined' && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' ? self : null, typeof global !== 'undefined' && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' ? global : null].filter(Boolean);
    return createCoreRuntimeState(initialScopes);
  });
  if (CORE_GLOBAL_SCOPE && _typeof(CORE_GLOBAL_SCOPE) === 'object') {
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
  var CORE_BOOT_QUEUE_KEY = function resolveCoreBootQueueKey(scope) {
    var fallbackKey = '__coreRuntimeBootQueue';
    if (scope && _typeof(scope) === 'object') {
      var existingHidden = scope.__cineCoreBootQueueKey;
      var existingPublic = scope.CORE_BOOT_QUEUE_KEY;
      if (typeof existingPublic === 'string' && existingPublic) {
        try {
          scope.__cineCoreBootQueueKey = existingPublic;
        } catch (syncError) {
          void syncError;
          scope.__cineCoreBootQueueKey = existingPublic;
        }
        return existingPublic;
      }
      if (typeof existingHidden === 'string' && existingHidden) {
        if (typeof scope.CORE_BOOT_QUEUE_KEY !== 'string' || !scope.CORE_BOOT_QUEUE_KEY) {
          try {
            scope.CORE_BOOT_QUEUE_KEY = existingHidden;
          } catch (shadowError) {
            void shadowError;
            scope.CORE_BOOT_QUEUE_KEY = existingHidden;
          }
        }
        return existingHidden;
      }
    }
    var resolvedKey = fallbackKey;
    if (scope && _typeof(scope) === 'object') {
      try {
        scope.__cineCoreBootQueueKey = resolvedKey;
      } catch (hiddenAssignError) {
        void hiddenAssignError;
        scope.__cineCoreBootQueueKey = resolvedKey;
      }
      if (typeof scope.CORE_BOOT_QUEUE_KEY !== 'string' || !scope.CORE_BOOT_QUEUE_KEY) {
        try {
          scope.CORE_BOOT_QUEUE_KEY = resolvedKey;
        } catch (publicAssignError) {
          void publicAssignError;
          scope.CORE_BOOT_QUEUE_KEY = resolvedKey;
        }
      }
    }
    return resolvedKey;
  }(CORE_GLOBAL_SCOPE);
  var CORE_BOOT_QUEUE = function bootstrapCoreBootQueue(existingQueue) {
    if (Array.isArray(existingQueue)) {
      return existingQueue;
    }
    if (CORE_GLOBAL_SCOPE && _typeof(CORE_GLOBAL_SCOPE) === 'object') {
      var shared = CORE_GLOBAL_SCOPE.cineCoreShared;
      if (shared && _typeof(shared) === 'object') {
        var sharedQueue = shared[CORE_BOOT_QUEUE_KEY];
        if (Array.isArray(sharedQueue)) {
          return sharedQueue;
        }
        if (Object.isExtensible(shared)) {
          shared[CORE_BOOT_QUEUE_KEY] = [];
          return shared[CORE_BOOT_QUEUE_KEY];
        }
      }
      if (!Array.isArray(CORE_GLOBAL_SCOPE.CORE_BOOT_QUEUE)) {
        CORE_GLOBAL_SCOPE.CORE_BOOT_QUEUE = [];
      }
      return CORE_GLOBAL_SCOPE.CORE_BOOT_QUEUE;
    }
    return [];
  }(CORE_GLOBAL_SCOPE && CORE_GLOBAL_SCOPE.CORE_BOOT_QUEUE);
  if (CORE_GLOBAL_SCOPE && CORE_GLOBAL_SCOPE.CORE_BOOT_QUEUE !== CORE_BOOT_QUEUE) {
    CORE_GLOBAL_SCOPE.CORE_BOOT_QUEUE = CORE_BOOT_QUEUE;
  }
  function enqueueCoreBootTask(task) {
    if (typeof task === 'function') {
      CORE_BOOT_QUEUE.push(task);
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
      if (target.__cineDeferredPlaceholder__ === true) {
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
  var GRID_SNAP_STATE_STORAGE_KEY = '__cineGridSnapState';
  function getGridSnapStateScopes() {
    if (CORE_RUNTIME_STATE && typeof CORE_RUNTIME_STATE.getScopes === 'function') {
      try {
        return CORE_RUNTIME_STATE.getScopes();
      } catch (scopeReadError) {
        void scopeReadError;
      }
    }
    var fallbackScopes = [];
    var candidates = [CORE_GLOBAL_SCOPE && _typeof(CORE_GLOBAL_SCOPE) === 'object' ? CORE_GLOBAL_SCOPE : null, typeof globalThis !== 'undefined' && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' ? globalThis : null, typeof window !== 'undefined' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' ? window : null, typeof self !== 'undefined' && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' ? self : null, typeof global !== 'undefined' && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' ? global : null];
    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && fallbackScopes.indexOf(candidate) === -1) {
        fallbackScopes.push(candidate);
      }
    }
    return fallbackScopes;
  }
  function normaliseGridSnapPreference(value) {
    var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (value === true || value === false) {
      return value === true;
    }
    if (typeof value === 'string') {
      var normalized = value.trim().toLowerCase();
      if (!normalized) {
        return fallback;
      }
      if (['true', '1', 'yes', 'on', 'enabled', 'enable'].includes(normalized)) {
        return true;
      }
      if (['false', '0', 'no', 'off', 'disabled', 'disable'].includes(normalized)) {
        return false;
      }
      return fallback;
    }
    if (typeof value === 'number') {
      if (!Number.isFinite(value)) {
        return fallback;
      }
      return value > 0;
    }
    if (value && _typeof(value) === 'object') {
      if (Object.prototype.hasOwnProperty.call(value, 'enabled')) {
        return normaliseGridSnapPreference(value.enabled, fallback);
      }
      if (Object.prototype.hasOwnProperty.call(value, 'value')) {
        return normaliseGridSnapPreference(value.value, fallback);
      }
    }
    return fallback;
  }
  function readInitialGridSnapPreference() {
    var scopes = getGridSnapStateScopes();
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope || _typeof(scope) !== 'object') {
        continue;
      }
      try {
        if (Object.prototype.hasOwnProperty.call(scope, GRID_SNAP_STATE_STORAGE_KEY)) {
          var stored = scope[GRID_SNAP_STATE_STORAGE_KEY];
          var normalized = normaliseGridSnapPreference(stored, undefined);
          if (typeof normalized === 'boolean') {
            return normalized;
          }
        }
      } catch (storageReadError) {
        void storageReadError;
      }
      try {
        if (Object.prototype.hasOwnProperty.call(scope, 'gridSnap')) {
          var legacy = scope.gridSnap;
          var normalizedLegacy = normaliseGridSnapPreference(legacy, undefined);
          if (typeof normalizedLegacy === 'boolean') {
            return normalizedLegacy;
          }
        }
      } catch (legacyReadError) {
        void legacyReadError;
      }
    }
    return undefined;
  }
  var gridSnapState = normaliseGridSnapPreference(readInitialGridSnapPreference(), false);
  gridSnap = gridSnapState;
  function syncGridSnapStateToScopes(value) {
    var originScope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var scopes = getGridSnapStateScopes();
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope || _typeof(scope) !== 'object') {
        continue;
      }
      try {
        scope[GRID_SNAP_STATE_STORAGE_KEY] = value;
      } catch (assignStorageError) {
        try {
          Object.defineProperty(scope, GRID_SNAP_STATE_STORAGE_KEY, {
            configurable: true,
            writable: true,
            value: value
          });
        } catch (defineStorageError) {
          void defineStorageError;
        }
      }
      if (originScope === scope) {
        continue;
      }
      try {
        scope.gridSnap = value;
      } catch (assignLegacyError) {
        try {
          Object.defineProperty(scope, 'gridSnap', {
            configurable: true,
            writable: true,
            value: value
          });
        } catch (defineLegacyError) {
          void defineLegacyError;
        }
      }
    }
    gridSnap = value;
    return value;
  }
  function getGridSnapState() {
    return gridSnapState;
  }
  function setGridSnapState(value) {
    var normalized = normaliseGridSnapPreference(value, gridSnapState);
    gridSnapState = normalized;
    syncGridSnapStateToScopes(normalized);
    return gridSnapState;
  }
  function applyLegacyGridSnapValue(value) {
    var normalized = normaliseGridSnapPreference(value, gridSnapState);
    gridSnapState = normalized;
    gridSnap = normalized;
    return gridSnapState;
  }
  exposeCoreRuntimeConstant('applyLegacyGridSnapValue', applyLegacyGridSnapValue);
  syncGridSnapStateToScopes(gridSnapState);
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
  function fallbackStableStringify(value) {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (Array.isArray(value)) {
      var serialized = '[';
      for (var index = 0; index < value.length; index += 1) {
        if (index > 0) {
          serialized += ',';
        }
        serialized += fallbackStableStringify(value[index]);
      }
      serialized += ']';
      return serialized;
    }
    if (_typeof(value) === 'object') {
      var keys = Object.keys(value).sort();
      var _serialized = '{';
      for (var _index4 = 0; _index4 < keys.length; _index4 += 1) {
        var key = keys[_index4];
        if (_index4 > 0) {
          _serialized += ',';
        }
        _serialized += "".concat(JSON.stringify(key), ":").concat(fallbackStableStringify(value[key]));
      }
      _serialized += '}';
      return _serialized;
    }
    return JSON.stringify(value);
  }
  var FALLBACK_HUMANIZE_OVERRIDES_PART1 = {
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
  function fallbackHumanizeKey(key) {
    if (key && Object.prototype.hasOwnProperty.call(FALLBACK_HUMANIZE_OVERRIDES_PART1, key)) {
      return FALLBACK_HUMANIZE_OVERRIDES_PART1[key];
    }
    var stringValue = typeof key === 'string' ? key : String(key || '');
    return stringValue.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').replace(/^./, function (c) {
      return c.toUpperCase();
    });
  }
  var stableStringify = typeof CORE_SHARED.stableStringify === 'function' ? CORE_SHARED.stableStringify : fallbackStableStringify;
  var humanizeKey = typeof CORE_SHARED.humanizeKey === 'function' ? CORE_SHARED.humanizeKey : fallbackHumanizeKey;
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
  var normalizeAutoGearWeightOperator = typeof CORE_SHARED.normalizeAutoGearWeightOperator === 'function' ? CORE_SHARED.normalizeAutoGearWeightOperator : fallbackNormalizeAutoGearWeightOperator;
  var normalizeAutoGearWeightValue = typeof CORE_SHARED.normalizeAutoGearWeightValue === 'function' ? CORE_SHARED.normalizeAutoGearWeightValue : function normalizeAutoGearWeightValue(value) {
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
  };
  var normalizeAutoGearCameraWeightCondition = typeof CORE_SHARED.normalizeAutoGearCameraWeightCondition === 'function' ? CORE_SHARED.normalizeAutoGearCameraWeightCondition : function normalizeAutoGearCameraWeightCondition() {
    return null;
  };
  var formatAutoGearWeight = typeof CORE_SHARED.formatAutoGearWeight === 'function' ? CORE_SHARED.formatAutoGearWeight : function formatAutoGearWeight(value) {
    if (!Number.isFinite(value)) return '';
    try {
      if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
        return new Intl.NumberFormat().format(value);
      }
    } catch (error) {
      void error;
    }
    return String(value);
  };
  var getAutoGearCameraWeightOperatorLabel = typeof CORE_SHARED.getAutoGearCameraWeightOperatorLabel === 'function' ? CORE_SHARED.getAutoGearCameraWeightOperatorLabel : function getAutoGearCameraWeightOperatorLabel(operator, langTexts) {
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
  var formatAutoGearCameraWeight = typeof CORE_SHARED.formatAutoGearCameraWeight === 'function' ? CORE_SHARED.formatAutoGearCameraWeight : function formatAutoGearCameraWeight(condition, langTexts) {
    if (!condition || !Number.isFinite(condition.value)) return '';
    var label = getAutoGearCameraWeightOperatorLabel(condition.operator, langTexts);
    var formattedValue = formatAutoGearWeight(condition.value);
    return "".concat(label, " ").concat(formattedValue, " g");
  };
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
  var pinkModeLottieRuntime = null;
  var pinkModeLottiePromise = null;
  function disablePinkModeLottieWebWorkers(instance) {
    if (!instance || typeof instance.useWebWorker !== 'function') {
      return;
    }
    try {
      instance.useWebWorker(false);
    } catch (error) {
      console.warn('Unable to disable Lottie web workers', error);
    }
  }
  function resolvePinkModeLottieRuntime() {
    if (pinkModeLottieRuntime && typeof pinkModeLottieRuntime.loadAnimation === 'function') {
      return pinkModeLottieRuntime;
    }
    if (typeof window !== 'undefined' && window && window.lottie && typeof window.lottie.loadAnimation === 'function') {
      pinkModeLottieRuntime = window.lottie;
      disablePinkModeLottieWebWorkers(pinkModeLottieRuntime);
      return pinkModeLottieRuntime;
    }
    return null;
  }
  function ensurePinkModeLottieRuntime() {
    var existing = resolvePinkModeLottieRuntime();
    if (existing) {
      return Promise.resolve(existing);
    }
    if (typeof document === 'undefined') {
      return Promise.resolve(null);
    }
    if (pinkModeLottiePromise) {
      return pinkModeLottiePromise;
    }
    var loaderPromise = new Promise(function (resolve, reject) {
      var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
      if (!head) {
        reject(new Error('Unable to resolve document head for pink mode animations.'));
        return;
      }
      var existingScript = document.querySelector('script[data-loader="pink-mode-lottie"]');
      if (existingScript) {
        var _markLoaded = function markLoaded() {
          existingScript.removeEventListener('load', _markLoaded);
          existingScript.removeEventListener('error', _markFailed);
          existingScript.setAttribute('data-loaded', 'true');
          resolve(resolvePinkModeLottieRuntime());
        };
        var _markFailed = function markFailed(event) {
          existingScript.removeEventListener('load', _markLoaded);
          existingScript.removeEventListener('error', _markFailed);
          var error = new Error('Failed to load pink mode animation runtime.');
          error.event = event;
          reject(error);
        };
        if (existingScript.getAttribute('data-loaded') === 'true' || existingScript.readyState === 'complete') {
          resolve(resolvePinkModeLottieRuntime());
          return;
        }
        existingScript.addEventListener('load', _markLoaded, {
          once: true
        });
        existingScript.addEventListener('error', _markFailed, {
          once: true
        });
        return;
      }
      var script = document.createElement('script');
      script.src = 'src/vendor/lottie-light.min.js';
      script.async = true;
      script.setAttribute('data-loader', 'pink-mode-lottie');
      var _handleLoad = function handleLoad() {
        script.removeEventListener('load', _handleLoad);
        script.removeEventListener('error', _handleError);
        script.setAttribute('data-loaded', 'true');
        resolve(resolvePinkModeLottieRuntime());
      };
      var _handleError = function handleError(event) {
        script.removeEventListener('load', _handleLoad);
        script.removeEventListener('error', _handleError);
        var error = new Error('Failed to load pink mode animation runtime.');
        error.event = event;
        reject(error);
      };
      script.addEventListener('load', _handleLoad, {
        once: true
      });
      script.addEventListener('error', _handleError, {
        once: true
      });
      head.appendChild(script);
    });
    pinkModeLottiePromise = loaderPromise.then(function (instance) {
      if (instance && typeof instance.loadAnimation === 'function') {
        return instance;
      }
      return resolvePinkModeLottieRuntime();
    }).catch(function (error) {
      console.warn('Unable to load pink mode animations', error);
      return null;
    }).then(function (runtime) {
      if (!runtime || typeof runtime.loadAnimation !== 'function') {
        pinkModeLottiePromise = null;
        pinkModeLottieRuntime = null;
        return null;
      }
      pinkModeLottieRuntime = runtime;
      disablePinkModeLottieWebWorkers(runtime);
      pinkModeLottiePromise = Promise.resolve(runtime);
      return runtime;
    });
    return pinkModeLottiePromise;
  }
  var generatePrintableOverview;
  try {
    var _require = require('./overview.js');
    generatePrintableOverview = _require.generatePrintableOverview;
  } catch (_unused) {}
  var APP_VERSION = typeof CORE_SHARED.APP_VERSION === 'string' ? CORE_SHARED.APP_VERSION : '1.0.20';
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
  var DEVICE_SCHEMA_PATH = 'src/data/schema.json';
  var DEVICE_SCHEMA_STORAGE_KEY = 'cameraPowerPlanner_schemaCache';
  var AUTO_GEAR_RULES_KEY = typeof AUTO_GEAR_RULES_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_RULES_STORAGE_KEY : 'cameraPowerPlanner_autoGearRules';
  var AUTO_GEAR_ANY_MOTOR_TOKEN = '__any__';
  if (typeof globalThis !== 'undefined') {
    globalThis.AUTO_GEAR_ANY_MOTOR_TOKEN = AUTO_GEAR_ANY_MOTOR_TOKEN;
  }
  var AUTO_GEAR_SEEDED_KEY = typeof AUTO_GEAR_SEEDED_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_SEEDED_STORAGE_KEY : 'cameraPowerPlanner_autoGearSeeded';
  var AUTO_GEAR_BACKUPS_KEY = typeof AUTO_GEAR_BACKUPS_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_BACKUPS_STORAGE_KEY : 'cameraPowerPlanner_autoGearBackups';
  var AUTO_GEAR_PRESETS_KEY = typeof AUTO_GEAR_PRESETS_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_PRESETS_STORAGE_KEY : 'cameraPowerPlanner_autoGearPresets';
  var AUTO_GEAR_ACTIVE_PRESET_KEY = typeof AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY : 'cameraPowerPlanner_autoGearActivePreset';
  var AUTO_GEAR_AUTO_PRESET_KEY = typeof AUTO_GEAR_AUTO_PRESET_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_AUTO_PRESET_STORAGE_KEY : 'cameraPowerPlanner_autoGearAutoPreset';
  var AUTO_GEAR_BACKUP_VISIBILITY_KEY = typeof AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY : 'cameraPowerPlanner_autoGearShowBackups';
  var AUTO_GEAR_BACKUP_RETENTION_KEY = typeof AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY : 'cameraPowerPlanner_autoGearBackupRetention';
  var AUTO_GEAR_MONITOR_DEFAULTS_KEY = typeof AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY : 'cameraPowerPlanner_autoGearMonitorDefaults';
  var AUTO_GEAR_BACKUP_INTERVAL_MS = 10 * 60 * 1000;
  var AUTO_GEAR_BACKUP_RETENTION_MIN_VALUE = resolveAutoGearBackupRetentionMin();
  var AUTO_GEAR_BACKUP_RETENTION_DEFAULT = resolveAutoGearBackupRetentionDefault();
  var AUTO_GEAR_BACKUP_RETENTION_MAX = 50;
  var AUTO_GEAR_MULTI_SELECT_MIN_ROWS = 8;
  var AUTO_GEAR_MULTI_SELECT_MAX_ROWS = 12;
  var AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS = 1;
  function resolveAutoGearBackupRetentionMin() {
    var fallback = 1;
    var scopeCandidates = [];
    if (typeof globalThis !== 'undefined') scopeCandidates.push(globalThis);
    if (typeof window !== 'undefined') scopeCandidates.push(window);
    if (typeof global !== 'undefined') scopeCandidates.push(global);
    if (typeof self !== 'undefined') scopeCandidates.push(self);
    for (var _i2 = 0, _scopeCandidates = scopeCandidates; _i2 < _scopeCandidates.length; _i2++) {
      var scope = _scopeCandidates[_i2];
      if (scope && typeof scope.AUTO_GEAR_BACKUP_RETENTION_MIN === 'number') {
        return scope.AUTO_GEAR_BACKUP_RETENTION_MIN;
      }
    }
    for (var _i3 = 0, _scopeCandidates2 = scopeCandidates; _i3 < _scopeCandidates2.length; _i3++) {
      var _scope = _scopeCandidates2[_i3];
      if (!_scope) continue;
      try {
        _scope.AUTO_GEAR_BACKUP_RETENTION_MIN = fallback;
        return fallback;
      } catch (error) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Unable to persist auto gear backup retention minimum to scope.', error);
        }
      }
    }
    return fallback;
  }
  function resolveAutoGearBackupRetentionDefault() {
    var fallback = 12;
    var min = AUTO_GEAR_BACKUP_RETENTION_MIN_VALUE || 1;
    var max = 50;
    var normalizedFallback = Math.min(Math.max(Math.round(fallback), min), max);
    var scopeCandidates = [];
    if (typeof globalThis !== 'undefined') scopeCandidates.push(globalThis);
    if (typeof window !== 'undefined') scopeCandidates.push(window);
    if (typeof global !== 'undefined') scopeCandidates.push(global);
    if (typeof self !== 'undefined') scopeCandidates.push(self);
    for (var _i4 = 0, _scopeCandidates3 = scopeCandidates; _i4 < _scopeCandidates3.length; _i4++) {
      var scope = _scopeCandidates3[_i4];
      if (!scope || typeof scope.AUTO_GEAR_BACKUP_RETENTION_DEFAULT !== 'number') {
        continue;
      }
      var candidate = scope.AUTO_GEAR_BACKUP_RETENTION_DEFAULT;
      if (!Number.isFinite(candidate)) {
        continue;
      }
      var normalized = Math.min(Math.max(Math.round(candidate), min), max);
      if (normalized !== candidate) {
        try {
          scope.AUTO_GEAR_BACKUP_RETENTION_DEFAULT = normalized;
        } catch (error) {
          if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('Unable to normalize auto gear backup retention default globally.', error);
          }
        }
      }
      return normalized;
    }
    for (var _i5 = 0, _scopeCandidates4 = scopeCandidates; _i5 < _scopeCandidates4.length; _i5++) {
      var _scope2 = _scopeCandidates4[_i5];
      if (!_scope2) {
        continue;
      }
      try {
        _scope2.AUTO_GEAR_BACKUP_RETENTION_DEFAULT = normalizedFallback;
        return normalizedFallback;
      } catch (error) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Unable to persist auto gear backup retention default to scope.', error);
        }
      }
    }
    return normalizedFallback;
  }
  function resolveTemperatureStorageKey() {
    var scope = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : undefined;
    var fallback = 'cameraPowerPlanner_temperatureUnit';
    var existing = scope && typeof scope.TEMPERATURE_UNIT_STORAGE_KEY === 'string' ? scope.TEMPERATURE_UNIT_STORAGE_KEY : fallback;
    if (scope && typeof scope.TEMPERATURE_UNIT_STORAGE_KEY !== 'string') {
      try {
        scope.TEMPERATURE_UNIT_STORAGE_KEY = existing;
      } catch (error) {
        void error;
      }
    }
    return existing;
  }
  var TEMPERATURE_STORAGE_KEY = resolveTemperatureStorageKey();
  var FOCUS_SCALE_STORAGE_KEY_FALLBACK = 'cameraPowerPlanner_focusScale';
  function resolveFocusScaleStorageKey() {
    var scope = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : undefined;
    var fallback = FOCUS_SCALE_STORAGE_KEY_FALLBACK;
    var existing = scope && typeof scope.FOCUS_SCALE_STORAGE_KEY === 'string' ? scope.FOCUS_SCALE_STORAGE_KEY : fallback;
    if (scope && typeof scope.FOCUS_SCALE_STORAGE_KEY !== 'string') {
      try {
        scope.FOCUS_SCALE_STORAGE_KEY = existing;
      } catch (error) {
        void error;
      }
    }
    if (scope && typeof scope.FOCUS_SCALE_STORAGE_KEY_NAME !== 'string') {
      try {
        scope.FOCUS_SCALE_STORAGE_KEY_NAME = existing;
      } catch (error) {
        void error;
      }
    }
    return existing;
  }
  var FOCUS_SCALE_STORAGE_KEY = resolveFocusScaleStorageKey();
  var TEMPERATURE_UNITS = {
    celsius: 'celsius',
    fahrenheit: 'fahrenheit'
  };
  var TEMPERATURE_SCENARIOS = [{
    celsius: 40,
    factor: 1.0,
    color: '#d9534f'
  }, {
    celsius: 25,
    factor: 1.0,
    color: '#5cb85c'
  }, {
    celsius: 0,
    factor: 0.8,
    color: '#f0ad4e'
  }, {
    celsius: -10,
    factor: 0.625,
    color: '#5bc0de'
  }, {
    celsius: -20,
    factor: 0.5,
    color: '#0275d8'
  }];
  var FOCUS_SCALE_VALUES = Object.freeze({
    metric: 'metric',
    imperial: 'imperial'
  });
  function normalizeFocusScale(value) {
    var normalized = typeof value === 'string' ? value.trim().toLowerCase() : '';
    if (normalized === FOCUS_SCALE_VALUES.imperial) {
      return FOCUS_SCALE_VALUES.imperial;
    }
    return FOCUS_SCALE_VALUES.metric;
  }
  function getFocusScalePreference() {
    return focusScalePreference;
  }
  function getFocusScaleLabelForLang() {
    var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentLang;
    var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : focusScalePreference;
    var normalized = normalizeFocusScale(scale);
    var langTexts = getLanguageTexts(lang);
    var fallbackTexts = getLanguageTexts(DEFAULT_LANGUAGE);
    var key = normalized === FOCUS_SCALE_VALUES.imperial ? 'focusScaleImperial' : 'focusScaleMetric';
    var valueFromLang = langTexts && typeof langTexts[key] === 'string' ? langTexts[key].trim() : '';
    if (valueFromLang) {
      return valueFromLang;
    }
    var valueFromFallback = fallbackTexts && typeof fallbackTexts[key] === 'string' ? fallbackTexts[key].trim() : '';
    if (valueFromFallback) {
      return valueFromFallback;
    }
    return normalized === FOCUS_SCALE_VALUES.imperial ? 'Imperial' : 'Metric';
  }
  function resolveLanguageCode(lang) {
    if (typeof lang === 'string' && lang.trim()) {
      return lang.trim();
    }
    if (typeof currentLang === 'string' && currentLang.trim()) {
      return currentLang;
    }
    return 'en';
  }
  function getAllTranslations() {
    if (typeof texts !== 'undefined' && texts && (typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object') {
      return texts;
    }
    if (CORE_GLOBAL_SCOPE && _typeof(CORE_GLOBAL_SCOPE.texts) === 'object' && CORE_GLOBAL_SCOPE.texts) {
      return CORE_GLOBAL_SCOPE.texts;
    }
    if (typeof window !== 'undefined' && _typeof(window.texts) === 'object' && window.texts) {
      return window.texts;
    }
    return {};
  }
  function getLanguageTexts(lang) {
    var resolved = resolveLanguageCode(lang);
    var allTexts = getAllTranslations();
    if (allTexts && _typeof(allTexts[resolved]) === 'object') {
      return allTexts[resolved] || {};
    }
    if (allTexts && _typeof(allTexts.en) === 'object') {
      return allTexts.en || {};
    }
    return {};
  }
  function resolveTextEntry(langTexts, fallbackTexts, key) {
    var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    if (langTexts && typeof langTexts[key] === 'string' && langTexts[key]) {
      return langTexts[key];
    }
    if (fallbackTexts && typeof fallbackTexts[key] === 'string' && fallbackTexts[key]) {
      return fallbackTexts[key];
    }
    return defaultValue;
  }
  function formatNumberForLang(lang, value, options) {
    var resolved = resolveLanguageCode(lang);
    try {
      return new Intl.NumberFormat(resolved, options).format(value);
    } catch (firstError) {
      try {
        return new Intl.NumberFormat('en', options).format(value);
      } catch (fallbackError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Number formatting failed', firstError, fallbackError);
        }
        return String(value);
      }
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
    var langTexts = getLanguageTexts(lang);
    var fallbackTexts = getLanguageTexts('en');
    var key = resolvedUnit === TEMPERATURE_UNITS.fahrenheit ? 'temperatureUnitSymbolFahrenheit' : 'temperatureUnitSymbolCelsius';
    return langTexts[key] || fallbackTexts[key] || (resolvedUnit === TEMPERATURE_UNITS.fahrenheit ? '°F' : '°C');
  }
  function getTemperatureUnitLabelForLang() {
    var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentLang;
    var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : temperatureUnit;
    var resolvedUnit = normalizeTemperatureUnit(unit);
    var langTexts = getLanguageTexts(lang);
    var fallbackTexts = getLanguageTexts('en');
    var key = resolvedUnit === TEMPERATURE_UNITS.fahrenheit ? 'temperatureUnitFahrenheit' : 'temperatureUnitCelsius';
    return langTexts[key] || fallbackTexts[key] || (resolvedUnit === TEMPERATURE_UNITS.fahrenheit ? 'Fahrenheit (°F)' : 'Celsius (°C)');
  }
  function getTemperatureColumnLabelForLang() {
    var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentLang;
    var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : temperatureUnit;
    var langTexts = getLanguageTexts(lang);
    var fallbackTexts = getLanguageTexts('en');
    var baseLabel = langTexts.temperatureLabel || fallbackTexts.temperatureLabel || 'Temperature';
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
        prefix = '–';
      }
    } else if (isPositive) {
      prefix = '+';
    } else if (isNegative) {
      prefix = '–';
    }
    var symbol = getTemperatureUnitSymbolForLang(lang, resolvedUnit);
    return "".concat(prefix).concat(formatted, " ").concat(symbol);
  }
  function renderTemperatureNote(baseHours) {
    if (typeof document === 'undefined') {
      return;
    }
    var container = document.getElementById('temperatureNote');
    if (!container) {
      return;
    }
    var langTexts = getLanguageTexts(currentLang);
    var fallbackTexts = getLanguageTexts('en');
    var heading = langTexts.temperatureNoteHeading || fallbackTexts.temperatureNoteHeading || '';
    var html = heading ? "<p>".concat(heading, "</p>") : '';
    if (!baseHours || !Number.isFinite(baseHours)) {
      container.innerHTML = html;
      return;
    }
    var temperatureHeader = getTemperatureColumnLabelForLang(currentLang, temperatureUnit);
    var runtimeHeader = langTexts.runtimeLabel || fallbackTexts.runtimeLabel || 'Runtime';
    var batteryHeader = langTexts.batteryCountTempLabel || fallbackTexts.batteryCountTempLabel || 'Batteries';
    html += "<table><tr><th>".concat(temperatureHeader, "</th><th>").concat(runtimeHeader, "</th><th>").concat(batteryHeader, "</th></tr>");
    TEMPERATURE_SCENARIOS.forEach(function (scenario) {
      var runtime = baseHours * scenario.factor;
      var runtimeCell = Number.isFinite(runtime) ? runtime.toFixed(2) : '0.00';
      var batteries = '–';
      if (Number.isFinite(runtime) && runtime > 0) {
        batteries = String(Math.ceil(10 / runtime));
      }
      var temperatureCell = formatTemperatureForDisplay(scenario.celsius);
      html += "<tr><td style=\"color:".concat(scenario.color, "\">").concat(temperatureCell, "</td><td>").concat(runtimeCell, "</td><td>").concat(batteries, "</td></tr>");
    });
    html += '</table>';
    container.innerHTML = html;
  }
  function ensureFeedbackTemperatureOptions(select) {
    if (!select) return;
    var expectedOptions = FEEDBACK_TEMPERATURE_MAX - FEEDBACK_TEMPERATURE_MIN + 2;
    if (select.options.length === expectedOptions) {
      return;
    }
    var previousValue = select.value;
    select.innerHTML = '';
    var emptyOpt = document.createElement('option');
    emptyOpt.value = '';
    emptyOpt.textContent = '';
    select.appendChild(emptyOpt);
    for (var temp = FEEDBACK_TEMPERATURE_MIN; temp <= FEEDBACK_TEMPERATURE_MAX; temp += 1) {
      var opt = document.createElement('option');
      opt.value = String(temp);
      select.appendChild(opt);
    }
    if (previousValue) {
      select.value = previousValue;
    }
  }
  function updateFeedbackTemperatureOptions() {
    var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentLang;
    var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : temperatureUnit;
    if (typeof document === 'undefined') {
      return;
    }
    var tempSelect = document.getElementById('fbTemperature');
    if (!tempSelect) return;
    ensureFeedbackTemperatureOptions(tempSelect);
    Array.from(tempSelect.options).forEach(function (option) {
      if (!option) return;
      if (option.value === '') {
        option.textContent = '';
        return;
      }
      var celsiusValue = Number(option.value);
      if (!Number.isFinite(celsiusValue)) return;
      option.textContent = formatTemperatureForDisplay(celsiusValue, {
        lang: lang,
        unit: unit,
        includeSign: 'negative'
      });
    });
  }
  function updateFeedbackTemperatureLabel() {
    var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentLang;
    var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : temperatureUnit;
    if (typeof document === 'undefined') {
      return;
    }
    var labelTextElem = document.getElementById('fbTemperatureLabelText');
    var labelElem = document.getElementById('fbTemperatureLabel');
    var label = "".concat(getTemperatureColumnLabelForLang(lang, unit), ":");
    if (labelTextElem) {
      labelTextElem.textContent = label;
    } else if (labelElem) {
      labelElem.textContent = label;
    }
  }
  function refreshFeedbackTemperatureLabel() {
    var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentLang;
    var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : temperatureUnit;
    var handled = false;
    try {
      if (typeof updateFeedbackTemperatureLabel === 'function') {
        updateFeedbackTemperatureLabel(lang, unit);
        handled = true;
      }
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Fallback applied while updating feedback temperature label', error);
      }
    }
    if (handled) {
      return;
    }
    var labelTextElem = typeof document !== 'undefined' ? document.getElementById('fbTemperatureLabelText') : null;
    var labelElem = typeof document !== 'undefined' ? document.getElementById('fbTemperatureLabel') : null;
    if (!labelTextElem && !labelElem) {
      return;
    }
    var label = "".concat(getTemperatureColumnLabelForLang(lang, unit), ":");
    if (labelTextElem) {
      labelTextElem.textContent = label;
    } else if (labelElem) {
      labelElem.textContent = label;
    }
  }
  function applyTemperatureUnitPreference(unit) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var normalized = normalizeTemperatureUnit(unit);
    var _ref4 = options || {},
      _ref4$persist = _ref4.persist,
      persist = _ref4$persist === void 0 ? true : _ref4$persist,
      _ref4$reRender = _ref4.reRender,
      reRender = _ref4$reRender === void 0 ? true : _ref4$reRender,
      _ref4$forceUpdate = _ref4.forceUpdate,
      forceUpdate = _ref4$forceUpdate === void 0 ? false : _ref4$forceUpdate;
    if (!forceUpdate && temperatureUnit === normalized) {
      return;
    }
    temperatureUnit = normalized;
    if (persist && typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(TEMPERATURE_STORAGE_KEY, temperatureUnit);
      } catch (error) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Could not save temperature unit preference', error);
        }
      }
    }
    if (typeof settingsTemperatureUnit !== 'undefined' && settingsTemperatureUnit) {
      settingsTemperatureUnit.value = temperatureUnit;
    }
    if (reRender) {
      refreshFeedbackTemperatureLabel();
      updateFeedbackTemperatureOptions();
      renderTemperatureNote(lastRuntimeHours);
    }
  }
  function applyFocusScalePreference(scale) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var normalized = normalizeFocusScale(scale);
    var _ref5 = options || {},
      _ref5$persist = _ref5.persist,
      persist = _ref5$persist === void 0 ? true : _ref5$persist,
      _ref5$forceUpdate = _ref5.forceUpdate,
      forceUpdate = _ref5$forceUpdate === void 0 ? false : _ref5$forceUpdate,
      _ref5$reRender = _ref5.reRender,
      reRender = _ref5$reRender === void 0 ? true : _ref5$reRender;
    if (!forceUpdate && focusScalePreference === normalized) {
      return;
    }
    focusScalePreference = normalized;
    updateGlobalFocusScalePreference(focusScalePreference);
    if (persist && typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(FOCUS_SCALE_STORAGE_KEY, focusScalePreference);
      } catch (error) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Could not save focus scale preference', error);
        }
      }
    }
    if (typeof settingsFocusScale !== 'undefined' && settingsFocusScale) {
      settingsFocusScale.value = focusScalePreference;
    }
    if (reRender && typeof refreshGearListIfVisible === 'function') {
      try {
        refreshGearListIfVisible();
      } catch (refreshError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Failed to refresh gear list after focus scale preference change', refreshError);
        }
      }
    }
  }
  var collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base'
  });
  var localeSort = function localeSort(a, b) {
    return collator.compare(a, b);
  };
  var DEVICE_GLOBAL_SCOPE = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : undefined;
  function updateGlobalDevicesReference(value) {
    if (!DEVICE_GLOBAL_SCOPE) {
      return;
    }
    try {
      DEVICE_GLOBAL_SCOPE.devices = value;
    } catch (assignError) {
      try {
        Object.defineProperty(DEVICE_GLOBAL_SCOPE, 'devices', {
          configurable: true,
          writable: true,
          value: value
        });
      } catch (defineError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Unable to expose device database globally.', defineError);
        }
      }
    }
    callCoreFunctionIfAvailable('populateLensDropdown', [], {
      defer: true
    });
  }
  function updateGlobalFocusScalePreference(value) {
    if (!DEVICE_GLOBAL_SCOPE) {
      return;
    }
    try {
      DEVICE_GLOBAL_SCOPE.focusScalePreference = value;
    } catch (assignError) {
      try {
        Object.defineProperty(DEVICE_GLOBAL_SCOPE, 'focusScalePreference', {
          configurable: true,
          writable: true,
          value: value
        });
      } catch (defineError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Unable to expose focus scale preference globally.', defineError);
        }
      }
    }
    try {
      updateLensFocusScaleSelectOptions(undefined, {
        preserveValue: true
      });
    } catch (focusScaleOptionError) {
      void focusScaleOptionError;
    }
  }
  function initializeDeviceDatabase() {
    if (DEVICE_GLOBAL_SCOPE && DEVICE_GLOBAL_SCOPE.devices && _typeof(DEVICE_GLOBAL_SCOPE.devices) === 'object') {
      return DEVICE_GLOBAL_SCOPE.devices;
    }
    if (typeof require === 'function') {
      try {
        var requiredDevices = require('../data');
        if (requiredDevices && _typeof(requiredDevices) === 'object') {
          updateGlobalDevicesReference(requiredDevices);
          return requiredDevices;
        }
      } catch (error) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Unable to load bundled device data.', error);
        }
      }
    }
    var fallback = {};
    updateGlobalDevicesReference(fallback);
    return fallback;
  }
  var devices = initializeDeviceDatabase();
  var FEEDBACK_TEMPERATURE_MIN = -20;
  var FEEDBACK_TEMPERATURE_MAX = 50;
  var temperatureUnit = TEMPERATURE_UNITS.celsius;
  var focusScalePreference = FOCUS_SCALE_VALUES.metric;
  var autoGearBackupDateFormatter = typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat === 'function' ? new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short'
  }) : null;
  var newCategorySelect;
  var newSubcategorySelect;
  var subcategoryFieldDiv;
  var newNameInput;
  var newWattInput;
  var wattFieldDiv;
  var dynamicFieldsDiv;
  var cameraFieldsDiv;
  var cameraWattInput;
  var cameraVoltageInput;
  var cameraPortTypeInput;
  var monitorFieldsDiv;
  var monitorScreenSizeInput;
  var monitorBrightnessInput;
  var monitorWattInput;
  var monitorVoltageInput;
  var monitorPortTypeInput;
  var monitorVideoInputsContainer;
  var lensFieldsDiv;
  var lensMountOptionsContainer;
  try {
    if (typeof localStorage !== 'undefined') {
      var storedTemperatureUnit = localStorage.getItem(TEMPERATURE_STORAGE_KEY);
      if (storedTemperatureUnit) {
        temperatureUnit = normalizeTemperatureUnit(storedTemperatureUnit);
      }
      var storedFocusScale = localStorage.getItem(FOCUS_SCALE_STORAGE_KEY);
      if (storedFocusScale) {
        focusScalePreference = normalizeFocusScale(storedFocusScale);
      } else {
        try {
          localStorage.setItem(FOCUS_SCALE_STORAGE_KEY, focusScalePreference);
        } catch (focusScaleStoreError) {
          console.warn('Could not persist default focus scale preference', focusScaleStoreError);
        }
      }
    }
  } catch (error) {
    console.warn('Could not load temperature or focus scale preference', error);
  }
  updateGlobalFocusScalePreference(focusScalePreference);
  var SUPPORTED_MOUNT_VOLTAGE_TYPES = function resolveSupportedMounts() {
    if (CORE_GLOBAL_SCOPE && Array.isArray(CORE_GLOBAL_SCOPE.SUPPORTED_MOUNT_VOLTAGE_TYPES) && CORE_GLOBAL_SCOPE.SUPPORTED_MOUNT_VOLTAGE_TYPES.length > 0) {
      return CORE_GLOBAL_SCOPE.SUPPORTED_MOUNT_VOLTAGE_TYPES;
    }
    var created = Object.freeze(['V-Mount', 'Gold-Mount', 'B-Mount']);
    if (CORE_GLOBAL_SCOPE && _typeof(CORE_GLOBAL_SCOPE) === 'object') {
      try {
        CORE_GLOBAL_SCOPE.SUPPORTED_MOUNT_VOLTAGE_TYPES = created;
      } catch (assignError) {
        void assignError;
      }
    }
    return created;
  }();
  var MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK = 'cameraPowerPlanner_mountVoltages';
  var cachedMountVoltagePrimaryKey = '';
  var cachedMountVoltageBackupKey = '';
  var mountVoltageKeysResolved = false;
  var readGlobalMountVoltageKey = function readGlobalMountVoltageKey(property) {
    if (!CORE_GLOBAL_SCOPE || _typeof(CORE_GLOBAL_SCOPE) !== 'object') {
      return '';
    }
    var value = CORE_GLOBAL_SCOPE[property];
    return typeof value === 'string' && value ? value : '';
  };
  var assignGlobalMountVoltageKey = function assignGlobalMountVoltageKey(property, value) {
    if (!CORE_GLOBAL_SCOPE || _typeof(CORE_GLOBAL_SCOPE) !== 'object') {
      return;
    }
    if (typeof value !== 'string' || !value) {
      return;
    }
    var descriptor = null;
    try {
      descriptor = Object.getOwnPropertyDescriptor(CORE_GLOBAL_SCOPE, property);
    } catch (descriptorError) {
      descriptor = null;
      void descriptorError;
    }
    if (descriptor && descriptor.configurable === false && descriptor.writable === false) {
      return;
    }
    try {
      CORE_GLOBAL_SCOPE[property] = value;
    } catch (assignError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn("Unable to expose ".concat(property, " globally"), assignError);
      }
    }
  };
  var resolveMountVoltageStorageKeys = function resolveMountVoltageStorageKeys() {
    if (mountVoltageKeysResolved) {
      return;
    }
    var resolvedPrimary = readGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_KEY') || readGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_KEY_RESOLVED');
    if (!resolvedPrimary && typeof getMountVoltageStorageKeyName === 'function') {
      try {
        var resolvedKey = getMountVoltageStorageKeyName();
        if (typeof resolvedKey === 'string' && resolvedKey) {
          resolvedPrimary = resolvedKey;
        }
      } catch (mountVoltageKeyError) {
        console.warn('Unable to resolve mount voltage storage key name', mountVoltageKeyError);
      }
    }
    if (!resolvedPrimary && typeof MOUNT_VOLTAGE_STORAGE_KEY_NAME === 'string' && MOUNT_VOLTAGE_STORAGE_KEY_NAME) {
      resolvedPrimary = MOUNT_VOLTAGE_STORAGE_KEY_NAME;
    }
    if (!resolvedPrimary) {
      resolvedPrimary = MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK;
    }
    var resolvedBackup = readGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_BACKUP_KEY') || readGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_BACKUP_KEY_RESOLVED');
    if (!resolvedBackup && typeof getMountVoltageStorageBackupKeyName === 'function') {
      try {
        var backupKeyName = getMountVoltageStorageBackupKeyName();
        if (typeof backupKeyName === 'string' && backupKeyName) {
          resolvedBackup = backupKeyName;
        }
      } catch (backupKeyError) {
        console.warn('Unable to resolve mount voltage storage backup key name', backupKeyError);
      }
    }
    if (!resolvedBackup && resolvedPrimary) {
      resolvedBackup = "".concat(resolvedPrimary, "__backup");
    }
    cachedMountVoltagePrimaryKey = resolvedPrimary || MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK;
    cachedMountVoltageBackupKey = resolvedBackup || "".concat(cachedMountVoltagePrimaryKey, "__backup");
    mountVoltageKeysResolved = true;
    assignGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_KEY', cachedMountVoltagePrimaryKey);
    assignGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_KEY_RESOLVED', cachedMountVoltagePrimaryKey);
    assignGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_BACKUP_KEY', cachedMountVoltageBackupKey);
    assignGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_BACKUP_KEY_RESOLVED', cachedMountVoltageBackupKey);
  };
  var getMountVoltagePrimaryStorageKey = function getMountVoltagePrimaryStorageKey() {
    if (!mountVoltageKeysResolved) {
      resolveMountVoltageStorageKeys();
    }
    return cachedMountVoltagePrimaryKey || MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK;
  };
  var getMountVoltageBackupStorageKey = function getMountVoltageBackupStorageKey() {
    if (!mountVoltageKeysResolved) {
      resolveMountVoltageStorageKeys();
    }
    return cachedMountVoltageBackupKey || "".concat(getMountVoltagePrimaryStorageKey(), "__backup");
  };
  var DEFAULT_MOUNT_VOLTAGES = function resolveDefaultMountVoltages() {
    if (CORE_GLOBAL_SCOPE && CORE_GLOBAL_SCOPE.DEFAULT_MOUNT_VOLTAGES && _typeof(CORE_GLOBAL_SCOPE.DEFAULT_MOUNT_VOLTAGES) === 'object') {
      return CORE_GLOBAL_SCOPE.DEFAULT_MOUNT_VOLTAGES;
    }
    var defaults = Object.freeze({
      'V-Mount': Object.freeze({
        high: 14.4,
        low: 12
      }),
      'Gold-Mount': Object.freeze({
        high: 14.4,
        low: 12
      }),
      'B-Mount': Object.freeze({
        high: 33.6,
        low: 21.6
      })
    });
    if (CORE_GLOBAL_SCOPE && _typeof(CORE_GLOBAL_SCOPE) === 'object') {
      try {
        CORE_GLOBAL_SCOPE.DEFAULT_MOUNT_VOLTAGES = defaults;
      } catch (assignError) {
        void assignError;
      }
    }
    return defaults;
  }();
  var TOTAL_CURRENT_LABEL_FALLBACK = 'Total Current (at {voltage}V):';
  var TOTAL_CURRENT_HELP_HIGH_FALLBACK = 'Current draw at the battery\'s main output ({voltage}V).';
  var TOTAL_CURRENT_HELP_LOW_FALLBACK = 'Current draw at auxiliary outputs ({voltage}V).';
  var mountVoltagePreferences = cloneMountVoltageMap(DEFAULT_MOUNT_VOLTAGES);
  var mountVoltageInputs = null;
  var mountVoltageSectionElem = null;
  var mountVoltageHeadingElem = null;
  var mountVoltageDescriptionElem = null;
  var mountVoltageNoteElem = null;
  var mountVoltageResetButton = typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && CORE_GLOBAL_SCOPE.mountVoltageResetButton ? CORE_GLOBAL_SCOPE.mountVoltageResetButton : typeof globalThis !== 'undefined' && globalThis && globalThis.mountVoltageResetButton ? globalThis.mountVoltageResetButton : null;
  var mountVoltageTitleElems = null;
  function syncMountVoltageResetButtonGlobal(value) {
    var targetScope = typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : typeof globalThis !== 'undefined' && globalThis ? globalThis : typeof window !== 'undefined' && window ? window : typeof self !== 'undefined' && self ? self : typeof global !== 'undefined' && global ? global : null;
    if (!targetScope || _typeof(targetScope) !== 'object') {
      return;
    }
    try {
      targetScope.mountVoltageResetButton = value;
    } catch (assignError) {
      void assignError;
      targetScope.mountVoltageResetButton = value;
    }
  }
  syncMountVoltageResetButtonGlobal(mountVoltageResetButton);
  function parseVoltageValue(value, fallback) {
    var numeric = Number.NaN;
    if (typeof value === 'number') {
      numeric = value;
    } else if (typeof value === 'string') {
      var normalized = value.replace(',', '.');
      numeric = Number.parseFloat(normalized);
    }
    if (!Number.isFinite(numeric)) {
      return fallback;
    }
    if (numeric <= 0) {
      return fallback;
    }
    var clamped = Math.min(1000, Math.max(0.1, numeric));
    return Math.round(clamped * 100) / 100;
  }
  function cloneMountVoltageMap() {
    var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_MOUNT_VOLTAGES;
    var result = {};
    SUPPORTED_MOUNT_VOLTAGE_TYPES.forEach(function (type) {
      var entry = source && source[type] ? source[type] : DEFAULT_MOUNT_VOLTAGES[type];
      var high = parseVoltageValue(entry && entry.high, DEFAULT_MOUNT_VOLTAGES[type].high);
      var low = parseVoltageValue(entry && entry.low, DEFAULT_MOUNT_VOLTAGES[type].low);
      result[type] = {
        high: high,
        low: low
      };
    });
    return result;
  }
  function normalizeMountVoltageSource(source) {
    if (!source || _typeof(source) !== 'object') {
      return cloneMountVoltageMap(DEFAULT_MOUNT_VOLTAGES);
    }
    return cloneMountVoltageMap(source);
  }
  function parseStoredMountVoltages(raw) {
    if (!raw) {
      return null;
    }
    try {
      if (typeof raw === 'string') {
        var parsed = JSON.parse(raw);
        return normalizeMountVoltageSource(parsed);
      }
      return normalizeMountVoltageSource(raw);
    } catch (error) {
      console.warn('Could not parse stored mount voltages', error);
      return null;
    }
  }
  function getDefaultMountKey(mount) {
    if (SUPPORTED_MOUNT_VOLTAGE_TYPES.includes(mount)) {
      return mount;
    }
    return 'V-Mount';
  }
  function getMountVoltageConfig(mount) {
    var key = getDefaultMountKey(mount);
    var entry = mountVoltagePreferences[key] || DEFAULT_MOUNT_VOLTAGES[key];
    return {
      high: parseVoltageValue(entry && entry.high, DEFAULT_MOUNT_VOLTAGES[key].high),
      low: parseVoltageValue(entry && entry.low, DEFAULT_MOUNT_VOLTAGES[key].low)
    };
  }
  function getActiveMountVoltageConfig() {
    var plate = getSelectedPlate();
    return getMountVoltageConfig(plate);
  }
  function formatVoltageForDisplay(voltage) {
    var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currentLang;
    var numeric = Number(voltage);
    if (!Number.isFinite(numeric)) {
      return '';
    }
    var options = {
      maximumFractionDigits: 2,
      minimumFractionDigits: numeric % 1 === 0 ? 0 : 1
    };
    if (typeof formatNumberForLang === 'function') {
      try {
        return formatNumberForLang(lang, numeric, options);
      } catch (error) {
        console.warn('formatNumberForLang failed for voltage display', error);
      }
    }
    try {
      var formatter = new Intl.NumberFormat(lang, options);
      return formatter.format(numeric);
    } catch (intlError) {
      void intlError;
    }
    return numeric.toFixed(options.minimumFractionDigits);
  }
  function getMountVoltagePreferencesClone() {
    return cloneMountVoltageMap(mountVoltagePreferences);
  }
  function persistMountVoltagePreferences(preferences) {
    if (typeof localStorage === 'undefined') {
      return;
    }
    var serialized;
    try {
      serialized = JSON.stringify(preferences);
    } catch (serializationError) {
      console.warn('Could not serialize mount voltage preferences', serializationError);
      return;
    }
    var primaryMountVoltageKey = getMountVoltagePrimaryStorageKey();
    try {
      localStorage.setItem(primaryMountVoltageKey, serialized);
    } catch (storageError) {
      console.warn('Could not save mount voltage preferences', storageError);
    }
    var backupMountVoltageKey = getMountVoltageBackupStorageKey();
    try {
      localStorage.setItem(backupMountVoltageKey, serialized);
    } catch (backupError) {
      console.warn('Could not save mount voltage backup copy', backupError);
    }
  }
  var MOUNT_VOLTAGE_RUNTIME_EXPORTS = Object.freeze({
    SUPPORTED_MOUNT_VOLTAGE_TYPES: SUPPORTED_MOUNT_VOLTAGE_TYPES,
    DEFAULT_MOUNT_VOLTAGES: DEFAULT_MOUNT_VOLTAGES,
    mountVoltageInputs: mountVoltageInputs,
    parseVoltageValue: parseVoltageValue,
    cloneMountVoltageMap: cloneMountVoltageMap,
    getMountVoltagePreferencesClone: getMountVoltagePreferencesClone,
    applyMountVoltagePreferences: applyMountVoltagePreferences,
    parseStoredMountVoltages: parseStoredMountVoltages,
    resetMountVoltagePreferences: resetMountVoltagePreferences,
    updateMountVoltageInputsFromState: updateMountVoltageInputsFromState,
    persistMountVoltagePreferences: persistMountVoltagePreferences
  });
  exposeCoreRuntimeConstants(MOUNT_VOLTAGE_RUNTIME_EXPORTS);
  function applyMountVoltagePreferences(preferences) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _ref6 = options || {},
      _ref6$persist = _ref6.persist,
      persist = _ref6$persist === void 0 ? true : _ref6$persist,
      _ref6$triggerUpdate = _ref6.triggerUpdate,
      triggerUpdate = _ref6$triggerUpdate === void 0 ? true : _ref6$triggerUpdate;
    mountVoltagePreferences = normalizeMountVoltageSource(preferences);
    if (persist) {
      persistMountVoltagePreferences(mountVoltagePreferences);
    }
    if (triggerUpdate) {
      updateMountVoltageInputsFromState();
      refreshTotalCurrentLabels(currentLang);
      if (typeof updateCalculations === 'function') {
        try {
          updateCalculations();
        } catch (calcError) {
          console.warn('Failed to refresh calculations after voltage change', calcError);
        }
      }
    }
  }
  function resetMountVoltagePreferences() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    applyMountVoltagePreferences(DEFAULT_MOUNT_VOLTAGES, options);
  }
  function formatVoltageInputValue(value) {
    return Number.isFinite(value) ? String(Math.round(Number(value) * 100) / 100) : '';
  }
  function updateMountVoltageInputsFromState() {
    if (!mountVoltageInputs) {
      return;
    }
    var preferences = mountVoltagePreferences || DEFAULT_MOUNT_VOLTAGES;
    SUPPORTED_MOUNT_VOLTAGE_TYPES.forEach(function (type) {
      var fields = mountVoltageInputs[type];
      if (!fields) return;
      var entry = preferences[type] || DEFAULT_MOUNT_VOLTAGES[type];
      if (fields.high) {
        fields.high.value = formatVoltageInputValue(entry && entry.high);
      }
      if (fields.low) {
        fields.low.value = formatVoltageInputValue(entry && entry.low);
      }
    });
  }
  function getTemplateString(lang, key, fallback) {
    var localeTexts = getLanguageTexts(lang);
    var defaultTexts = getLanguageTexts(DEFAULT_LANGUAGE);
    if (localeTexts && typeof localeTexts[key] === 'string') {
      return localeTexts[key];
    }
    if (defaultTexts && typeof defaultTexts[key] === 'string') {
      return defaultTexts[key];
    }
    return fallback;
  }
  function renderVoltageTemplate(template, voltage, lang, fallback) {
    var formatted = formatVoltageForDisplay(voltage, lang);
    var source = typeof template === 'string' && template.includes('{voltage}') ? template : fallback;
    if (typeof source !== 'string') {
      return formatted ? "".concat(formatted, " V") : '';
    }
    return source.replace('{voltage}', formatted);
  }
  function refreshTotalCurrentLabels() {
    var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentLang;
    var mount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var voltages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    if (typeof document === 'undefined') {
      return;
    }
    var highLabelElem = document.getElementById('totalCurrent144Label');
    var lowLabelElem = document.getElementById('totalCurrent12Label');
    if (!highLabelElem || !lowLabelElem) {
      return;
    }
    var effectiveMount = mount || getSelectedPlate();
    var config = voltages || getMountVoltageConfig(effectiveMount);
    var highTemplate = getTemplateString(lang, 'totalCurrentHighLabelTemplate', TOTAL_CURRENT_LABEL_FALLBACK);
    var lowTemplate = getTemplateString(lang, 'totalCurrentLowLabelTemplate', TOTAL_CURRENT_LABEL_FALLBACK);
    var highHelpTemplate = getTemplateString(lang, 'totalCurrentHighHelpTemplate', TOTAL_CURRENT_HELP_HIGH_FALLBACK);
    var lowHelpTemplate = getTemplateString(lang, 'totalCurrentLowHelpTemplate', TOTAL_CURRENT_HELP_LOW_FALLBACK);
    highLabelElem.textContent = renderVoltageTemplate(highTemplate, config.high, lang, TOTAL_CURRENT_LABEL_FALLBACK);
    lowLabelElem.textContent = renderVoltageTemplate(lowTemplate, config.low, lang, TOTAL_CURRENT_LABEL_FALLBACK);
    highLabelElem.setAttribute('data-help', renderVoltageTemplate(highHelpTemplate, config.high, lang, TOTAL_CURRENT_HELP_HIGH_FALLBACK));
    lowLabelElem.setAttribute('data-help', renderVoltageTemplate(lowHelpTemplate, config.low, lang, TOTAL_CURRENT_HELP_LOW_FALLBACK));
  }
  function updateMountVoltageSettingLabels() {
    var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentLang;
    var localeTexts = getLanguageTexts(lang);
    var fallbackTexts = getLanguageTexts(DEFAULT_LANGUAGE);
    if (!localeTexts && !fallbackTexts) return;
    if (mountVoltageHeadingElem) {
      mountVoltageHeadingElem.textContent = localeTexts.mountVoltageSettingsHeading || fallbackTexts.mountVoltageSettingsHeading || 'Battery mount voltages';
      var helpText = localeTexts.mountVoltageSettingsHelp || fallbackTexts.mountVoltageSettingsHelp || '';
      if (helpText) {
        mountVoltageHeadingElem.setAttribute('data-help', helpText);
      }
    }
    if (mountVoltageDescriptionElem) {
      mountVoltageDescriptionElem.textContent = localeTexts.mountVoltageDescription || fallbackTexts.mountVoltageDescription || '';
    }
    if (mountVoltageNoteElem) {
      var _texts$en;
      mountVoltageNoteElem.textContent = localeTexts.mountVoltageNote || ((_texts$en = texts.en) === null || _texts$en === void 0 ? void 0 : _texts$en.mountVoltageNote) || '';
    }
    if (mountVoltageResetButton) {
      var _texts$en2, _texts$en3;
      mountVoltageResetButton.textContent = localeTexts.mountVoltageReset || ((_texts$en2 = texts.en) === null || _texts$en2 === void 0 ? void 0 : _texts$en2.mountVoltageReset) || 'Restore defaults';
      var resetHelp = localeTexts.mountVoltageResetHelp || ((_texts$en3 = texts.en) === null || _texts$en3 === void 0 ? void 0 : _texts$en3.mountVoltageResetHelp) || '';
      if (resetHelp) {
        mountVoltageResetButton.setAttribute('data-help', resetHelp);
      }
    }
    if (mountVoltageTitleElems) {
      if (mountVoltageTitleElems.V) {
        var _texts$en4;
        mountVoltageTitleElems.V.textContent = localeTexts.mountVoltageCardLabelV || ((_texts$en4 = texts.en) === null || _texts$en4 === void 0 ? void 0 : _texts$en4.mountVoltageCardLabelV) || 'V-Mount';
      }
      if (mountVoltageTitleElems.Gold) {
        var _texts$en5;
        mountVoltageTitleElems.Gold.textContent = localeTexts.mountVoltageCardLabelGold || ((_texts$en5 = texts.en) === null || _texts$en5 === void 0 ? void 0 : _texts$en5.mountVoltageCardLabelGold) || 'Gold Mount';
      }
      if (mountVoltageTitleElems.B) {
        var _texts$en6;
        mountVoltageTitleElems.B.textContent = localeTexts.mountVoltageCardLabelB || ((_texts$en6 = texts.en) === null || _texts$en6 === void 0 ? void 0 : _texts$en6.mountVoltageCardLabelB) || 'B-Mount';
      }
    }
    if (mountVoltageInputs) {
      SUPPORTED_MOUNT_VOLTAGE_TYPES.forEach(function (type) {
        var fields = mountVoltageInputs[type];
        if (!fields) return;
        if (fields.highLabel) {
          var _texts$en7, _texts$en8;
          fields.highLabel.textContent = localeTexts.mountVoltageHighLabel || ((_texts$en7 = texts.en) === null || _texts$en7 === void 0 ? void 0 : _texts$en7.mountVoltageHighLabel) || 'High-voltage output';
          var highHelp = localeTexts.mountVoltageHighHelp || ((_texts$en8 = texts.en) === null || _texts$en8 === void 0 ? void 0 : _texts$en8.mountVoltageHighHelp) || '';
          if (highHelp) {
            var _fields$high;
            fields.highLabel.setAttribute('data-help', highHelp);
            (_fields$high = fields.high) === null || _fields$high === void 0 || _fields$high.setAttribute('data-help', highHelp);
          }
        }
        if (fields.lowLabel) {
          var _texts$en9, _texts$en0;
          fields.lowLabel.textContent = localeTexts.mountVoltageLowLabel || ((_texts$en9 = texts.en) === null || _texts$en9 === void 0 ? void 0 : _texts$en9.mountVoltageLowLabel) || 'Low-voltage output';
          var lowHelp = localeTexts.mountVoltageLowHelp || ((_texts$en0 = texts.en) === null || _texts$en0 === void 0 ? void 0 : _texts$en0.mountVoltageLowHelp) || '';
          if (lowHelp) {
            var _fields$low;
            fields.lowLabel.setAttribute('data-help', lowHelp);
            (_fields$low = fields.low) === null || _fields$low === void 0 || _fields$low.setAttribute('data-help', lowHelp);
          }
        }
      });
    }
  }
  try {
    if (typeof localStorage !== 'undefined') {
      var storedVoltages = localStorage.getItem(getMountVoltagePrimaryStorageKey());
      var parsedVoltages = parseStoredMountVoltages(storedVoltages);
      if (parsedVoltages) {
        mountVoltagePreferences = parsedVoltages;
      } else {
        var backupVoltages = localStorage.getItem(getMountVoltageBackupStorageKey());
        var parsedBackupVoltages = parseStoredMountVoltages(backupVoltages);
        if (parsedBackupVoltages) {
          mountVoltagePreferences = parsedBackupVoltages;
          persistMountVoltagePreferences(parsedBackupVoltages);
        }
      }
    }
  } catch (error) {
    console.warn('Could not load mount voltage preferences', error);
  }
  var schemaStorage = function () {
    if (typeof window === 'undefined') return null;
    try {
      if (!('localStorage' in window)) return null;
      var _window = window,
        _localStorage = _window.localStorage;
      var testKey = '__schema_cache__';
      _localStorage.setItem(testKey, '1');
      _localStorage.removeItem(testKey);
      return _localStorage;
    } catch (error) {
      console.warn('Device schema cache disabled', error);
      return null;
    }
  }();
  function loadCachedDeviceSchema() {
    if (!schemaStorage) return null;
    try {
      var raw = schemaStorage.getItem(DEVICE_SCHEMA_STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      return parsed && _typeof(parsed) === 'object' ? parsed : null;
    } catch (error) {
      console.warn('Failed to read cached device schema', error);
      try {
        schemaStorage.removeItem(DEVICE_SCHEMA_STORAGE_KEY);
      } catch (removeError) {
        console.warn('Failed to clear invalid cached device schema', removeError);
      }
      return null;
    }
  }
  function persistDeviceSchema(schema) {
    if (!schemaStorage) return;
    try {
      schemaStorage.setItem(DEVICE_SCHEMA_STORAGE_KEY, JSON.stringify(schema));
    } catch (error) {
      console.warn('Failed to cache device schema', error);
    }
  }
  function isValidDeviceSchema(candidate) {
    return candidate && _typeof(candidate) === 'object' && !Array.isArray(candidate);
  }
  function loadDeviceSchemaFromCacheStorage() {
    return _loadDeviceSchemaFromCacheStorage.apply(this, arguments);
  }
  function _loadDeviceSchemaFromCacheStorage() {
    _loadDeviceSchemaFromCacheStorage = _asyncToGenerator(_regenerator().m(function _callee() {
      var candidates, _iterator15, _step15, url, response, _t, _t2;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (!(typeof caches === 'undefined' || !caches || typeof caches.match !== 'function')) {
              _context.n = 1;
              break;
            }
            return _context.a(2, null);
          case 1:
            candidates = new Set([DEVICE_SCHEMA_PATH]);
            if (!DEVICE_SCHEMA_PATH.startsWith('./')) {
              candidates.add("./".concat(DEVICE_SCHEMA_PATH));
            }
            if (typeof window !== 'undefined' && window.location) {
              try {
                candidates.add(new URL(DEVICE_SCHEMA_PATH, window.location.href).toString());
              } catch (error) {
                console.warn('Failed to resolve schema.json cache URL', error);
              }
            }
            _iterator15 = _createForOfIteratorHelper(candidates);
            _context.p = 2;
            _iterator15.s();
          case 3:
            if ((_step15 = _iterator15.n()).done) {
              _context.n = 10;
              break;
            }
            url = _step15.value;
            _context.p = 4;
            _context.n = 5;
            return caches.match(url, {
              ignoreSearch: true
            });
          case 5:
            response = _context.v;
            if (!response) {
              _context.n = 7;
              break;
            }
            _context.n = 6;
            return response.clone().json();
          case 6:
            return _context.a(2, _context.v);
          case 7:
            _context.n = 9;
            break;
          case 8:
            _context.p = 8;
            _t = _context.v;
            console.warn('Failed to read schema.json from cache entry', url, _t);
          case 9:
            _context.n = 3;
            break;
          case 10:
            _context.n = 12;
            break;
          case 11:
            _context.p = 11;
            _t2 = _context.v;
            _iterator15.e(_t2);
          case 12:
            _context.p = 12;
            _iterator15.f();
            return _context.f(12);
          case 13:
            return _context.a(2, null);
        }
      }, _callee, null, [[4, 8], [2, 11, 12, 13]]);
    }));
    return _loadDeviceSchemaFromCacheStorage.apply(this, arguments);
  }
  function finalizeDeviceSchemaLoad(candidate) {
    if (isValidDeviceSchema(candidate)) {
      deviceSchema = candidate;
      persistDeviceSchema(candidate);
    } else if (!deviceSchema) {
      deviceSchema = cachedDeviceSchema || {};
    }
    schedulePopulateCategoryOptions();
  }
  function schedulePopulateCategoryOptions() {
    var triggerPopulate = function triggerPopulate() {
      try {
        populateCategoryOptions();
      } catch (error) {
        console.error('populateCategoryOptions failed during scheduled execution', error);
      }
    };
    if (typeof window !== 'undefined' && typeof window.setTimeout === 'function') {
      window.setTimeout(triggerPopulate, 0);
    } else if (typeof setTimeout === 'function') {
      setTimeout(triggerPopulate, 0);
    } else {
      triggerPopulate();
    }
  }
  var cachedDeviceSchema = loadCachedDeviceSchema();
  var deviceSchema;
  try {
    deviceSchema = require('../data/schema.json');
  } catch (_unused2) {
    deviceSchema = cachedDeviceSchema;
    if (typeof fetch === 'function') {
      fetch(DEVICE_SCHEMA_PATH).then(function (response) {
        if (!response || !response.ok) {
          throw new Error("Unexpected response when loading schema.json: ".concat(response ? response.status : 'no response'));
        }
        return response.json();
      }).then(finalizeDeviceSchemaLoad).catch(function (error) {
        console.warn('Failed to fetch schema.json', error);
        if (typeof caches === 'undefined' || !caches || typeof caches.match !== 'function') {
          finalizeDeviceSchemaLoad(deviceSchema);
          return;
        }
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
  function generateAutoGearId(prefix) {
    var base = prefix || 'rule';
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return "".concat(base, "-").concat(crypto.randomUUID());
    }
    return "".concat(base, "-").concat(Math.random().toString(36).slice(2), "-").concat(Date.now());
  }
  function normalizeAutoGearQuantity(value) {
    var num = parseInt(value, 10);
    return Number.isFinite(num) && num > 0 ? num : 1;
  }
  function parseAutoGearDraftNames(value) {
    if (typeof value !== 'string') return [];
    var raw = value.trim();
    if (!raw) return [];
    var hasDelimiters = /[;\n\r]/.test(raw);
    var parts = hasDelimiters ? raw.split(/[;\n\r]+/) : [raw];
    return parts.map(function (part) {
      var segment = part.trim();
      if (!segment) return null;
      var signMatch = segment.match(/^([+-])\s*(.+)$/);
      var listType = signMatch ? signMatch[1] === '-' ? 'remove' : 'add' : null;
      var content = signMatch ? signMatch[2].trim() : segment;
      if (!content) return null;
      var quantityMatch = content.match(/^(\d+)\s*[x×]\s*(.+)$/i);
      if (quantityMatch) {
        var name = quantityMatch[2].trim();
        if (!name) return null;
        return {
          name: name,
          quantity: normalizeAutoGearQuantity(quantityMatch[1]),
          listType: listType
        };
      }
      return {
        name: content,
        listType: listType
      };
    }).filter(Boolean);
  }
  function normalizeAutoGearText(value) {
    var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref7$collapseWhitesp = _ref7.collapseWhitespace,
      collapseWhitespace = _ref7$collapseWhitesp === void 0 ? true : _ref7$collapseWhitesp;
    if (typeof value === 'number' && Number.isFinite(value)) {
      return String(value);
    }
    if (typeof value !== 'string') return '';
    var trimmed = value.trim();
    if (!collapseWhitespace) return trimmed;
    return trimmed.replace(/\s+/g, ' ');
  }
  function normalizeAutoGearSelectorType(value) {
    var candidate = typeof value === 'string' ? value.trim().toLowerCase() : '';
    if (!candidate) return 'none';
    if (!AUTO_GEAR_SELECTOR_TYPE_SET.has(candidate)) return 'none';
    return AUTO_GEAR_SELECTOR_TYPE_MAP[candidate] || 'none';
  }
  function normalizeAutoGearSelectorDefault(type, value, context) {
    var text = normalizeAutoGearText(value);
    if (!text) return '';
    var options = getAutoGearSelectorOptions(type, context ? {
      selectorContext: context
    } : null);
    if (!options.length) return text;
    var match = options.find(function (option) {
      return option.toLowerCase() === text.toLowerCase();
    });
    return match || text;
  }
  function resolveDevicesSnapshot() {
    if (DEVICE_GLOBAL_SCOPE && DEVICE_GLOBAL_SCOPE.devices && _typeof(DEVICE_GLOBAL_SCOPE.devices) === 'object') {
      return DEVICE_GLOBAL_SCOPE.devices;
    }
    try {
      return typeof devices !== 'undefined' && devices && _typeof(devices) === 'object' ? devices : null;
    } catch (error) {
      if (error && _typeof(error) === 'object' && error.name === 'ReferenceError') {
        return null;
      }
      throw error;
    }
  }
  function resolveTripodPreferenceSelect(type) {
    if (typeof document === 'undefined') return null;
    var id = AUTO_GEAR_TRIPOD_FIELD_IDS[type];
    if (!id) return null;
    return document.getElementById(id);
  }
  function collectTripodPreferenceOptions(type) {
    if (!AUTO_GEAR_TRIPOD_SELECTOR_TYPES.has(type)) return [];
    var select = resolveTripodPreferenceSelect(type);
    if (!select || !select.options) return [];
    var options = Array.from(select.options);
    var seen = new Set();
    var results = [];
    options.forEach(function (option) {
      if (!option) return;
      var value = typeof option.value === 'string' ? option.value.trim() : '';
      var label = typeof option.textContent === 'string' ? option.textContent.trim() : '';
      var storeValue = value || label;
      if (!storeValue) return;
      var dedupeKey = storeValue.toLowerCase();
      if (seen.has(dedupeKey)) return;
      seen.add(dedupeKey);
      results.push({
        value: storeValue,
        label: label || storeValue
      });
    });
    return results;
  }
  function getAutoGearSelectorOptions(type, itemOrContext) {
    var normalizedType = normalizeAutoGearSelectorType(type);
    var catalog = resolveDevicesSnapshot();
    if (!catalog || _typeof(catalog) !== 'object') {
      return [];
    }
    if (normalizedType === 'monitor') {
      var monitorDb = catalog && catalog.monitors ? catalog.monitors : null;
      if (!monitorDb || _typeof(monitorDb) !== 'object') return [];
      return Object.keys(monitorDb).filter(function (name) {
        return name && name !== 'None';
      }).sort(localeSort);
    }
    if (normalizedType === 'directorMonitor') {
      var directorDb = catalog && catalog.directorMonitors ? catalog.directorMonitors : null;
      if (!directorDb || _typeof(directorDb) !== 'object') return [];
      return Object.keys(directorDb).filter(function (name) {
        return name && name !== 'None';
      }).sort(localeSort);
    }
    if (normalizedType === 'fizHandUnit') {
      var groups = _typeof(AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS) === 'object' ? AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS : typeof globalThis !== 'undefined' && _typeof(globalThis.AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS) === 'object' ? globalThis.AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS : Object.create(null);
      var motorMap = _typeof(AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP) === 'object' ? AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP : typeof globalThis !== 'undefined' && _typeof(globalThis.AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP) === 'object' ? globalThis.AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP : Object.create(null);
      var contextValue = '';
      if (itemOrContext && _typeof(itemOrContext) === 'object') {
        var context = itemOrContext.selectorContext || itemOrContext.context;
        if (typeof context === 'string') {
          contextValue = context.trim();
        }
      } else if (typeof itemOrContext === 'string') {
        contextValue = itemOrContext.trim();
      }
      var group = null;
      if (contextValue) {
        group = groups[contextValue] || null;
        if (!group) {
          var normalizedContext = normalizeAutoGearTriggerValue(contextValue);
          if (normalizedContext) {
            if (groups[normalizedContext]) {
              group = groups[normalizedContext];
            } else if (motorMap[normalizedContext] && groups[motorMap[normalizedContext]]) {
              group = groups[motorMap[normalizedContext]];
            }
          }
        }
      }
      if (group && Array.isArray(group.options)) {
        return group.options.slice();
      }
      var fallback = [];
      Object.values(groups).forEach(function (entry) {
        if (!entry || !Array.isArray(entry.options)) return;
        entry.options.forEach(function (option) {
          if (!option || fallback.includes(option)) return;
          fallback.push(option);
        });
      });
      return fallback;
    }
    if (AUTO_GEAR_TRIPOD_SELECTOR_TYPES.has(normalizedType)) {
      return collectTripodPreferenceOptions(normalizedType).map(function (option) {
        return option.value;
      });
    }
    return [];
  }
  function getAutoGearSelectorLabel(type) {
    var normalizedType = normalizeAutoGearSelectorType(type);
    var langTexts = getLanguageTexts(currentLang);
    var fallbackTexts = getLanguageTexts(DEFAULT_LANGUAGE);
    if (normalizedType === 'monitor') {
      return langTexts.autoGearSelectorMonitorOption || fallbackTexts.autoGearSelectorMonitorOption || 'Monitor selector';
    }
    if (normalizedType === 'directorMonitor') {
      return langTexts.autoGearSelectorDirectorOption || fallbackTexts.autoGearSelectorDirectorOption || 'Director monitor selector';
    }
    if (normalizedType === 'tripodHeadBrand') {
      return langTexts.autoGearSelectorTripodHeadOption || fallbackTexts.autoGearSelectorTripodHeadOption || 'Tripod head selector';
    }
    if (normalizedType === 'tripodBowl') {
      return langTexts.autoGearSelectorTripodBowlOption || fallbackTexts.autoGearSelectorTripodBowlOption || 'Tripod bowl selector';
    }
    if (normalizedType === 'tripodTypes') {
      return langTexts.autoGearSelectorTripodTypesOption || fallbackTexts.autoGearSelectorTripodTypesOption || 'Tripod type selector';
    }
    if (normalizedType === 'tripodSpreader') {
      return langTexts.autoGearSelectorTripodSpreaderOption || fallbackTexts.autoGearSelectorTripodSpreaderOption || 'Tripod spreader selector';
    }
    if (normalizedType === 'fizHandUnit') {
      return langTexts.autoGearSelectorFizHandUnitOption || fallbackTexts.autoGearSelectorFizHandUnitOption || 'FIZ hand unit selector';
    }
    return langTexts.autoGearSelectorNoneOption || fallbackTexts.autoGearSelectorNoneOption || 'No selector';
  }
  function getAutoGearSelectorScrollHint() {
    var langTexts = getLanguageTexts(currentLang);
    var fallbackTexts = getLanguageTexts(DEFAULT_LANGUAGE);
    return langTexts.autoGearSelectorScrollHint || fallbackTexts.autoGearSelectorScrollHint || 'Scroll to see more devices.';
  }
  function getAutoGearSelectorDefaultPlaceholder() {
    var langTexts = getLanguageTexts(currentLang);
    var fallbackTexts = getLanguageTexts(DEFAULT_LANGUAGE);
    return langTexts.autoGearSelectorDefaultPlaceholder || fallbackTexts.autoGearSelectorDefaultPlaceholder || 'Choose a default device';
  }
  function getAutoGearMonitorDefaultPlaceholder() {
    var langTexts = getLanguageTexts(currentLang);
    var fallbackTexts = getLanguageTexts(DEFAULT_LANGUAGE);
    return langTexts.autoGearMonitorDefaultPlaceholder || fallbackTexts.autoGearMonitorDefaultPlaceholder || 'Use recommended automatically';
  }
  function formatAutoGearSelectorValue(type, value) {
    var normalizedValue = typeof value === 'string' ? value.trim() : '';
    if (!normalizedValue) return '';
    var normalizedType = normalizeAutoGearSelectorType(type);
    if (AUTO_GEAR_TRIPOD_SELECTOR_TYPES.has(normalizedType)) {
      var options = collectTripodPreferenceOptions(normalizedType);
      var match = options.find(function (option) {
        return option.value.toLowerCase() === normalizedValue.toLowerCase();
      });
      if (match && match.label) {
        return match.label;
      }
    }
    if (typeof addArriKNumber === 'function' && (normalizedType === 'monitor' || normalizedType === 'directorMonitor' || normalizedType === 'fizHandUnit')) {
      return addArriKNumber(normalizedValue);
    }
    return normalizedValue;
  }
  function populateAutoGearCategorySelect(select, currentValue) {
    var _texts, _texts2;
    if (!select) return;
    var current = typeof currentValue === 'string' ? currentValue : '';
    var lang = typeof currentLang === 'string' ? currentLang : 'en';
    select.innerHTML = '';
    GEAR_LIST_CATEGORIES.forEach(function (category) {
      var option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      if (current === category) {
        option.selected = true;
      }
      select.appendChild(option);
    });
    var customOption = document.createElement('option');
    customOption.value = AUTO_GEAR_CUSTOM_CATEGORY;
    customOption.textContent = ((_texts = texts) === null || _texts === void 0 || (_texts = _texts[lang]) === null || _texts === void 0 ? void 0 : _texts.autoGearCustomCategory) || ((_texts2 = texts) === null || _texts2 === void 0 || (_texts2 = _texts2.en) === null || _texts2 === void 0 ? void 0 : _texts2.autoGearCustomCategory) || 'Custom Additions';
    if (!current || current === AUTO_GEAR_CUSTOM_CATEGORY) {
      customOption.selected = true;
    }
    select.appendChild(customOption);
  }
  function formatAutoGearOwnGearLabel(item) {
    if (!item || typeof item.name !== 'string') return '';
    var quantityValue = typeof (item === null || item === void 0 ? void 0 : item.quantity) === 'number' ? String(item.quantity) : item === null || item === void 0 ? void 0 : item.quantity;
    var quantityText = formatOwnGearQuantityText(quantityValue);
    if (quantityText) {
      return "".concat(item.name, " (").concat(quantityText, ")");
    }
    return item.name;
  }
  function refreshAutoGearOwnGearConditionOptions(selected) {
    if (!autoGearOwnGearSelect) return;
    var selectedValues = Array.isArray(selected) ? selected.filter(function (value) {
      return typeof value === 'string';
    }).map(function (value) {
      return value.trim();
    }).filter(Boolean) : collectAutoGearSelectedValues(selected, 'ownGear');
    autoGearOwnGearSelect.innerHTML = '';
    autoGearOwnGearSelect.multiple = true;
    var items = getAutoGearOwnGearItems();
    var seen = new Set();
    var appendOption = function appendOption(id, label) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (typeof id !== 'string') return;
      var trimmedId = id.trim();
      if (!trimmedId || seen.has(trimmedId)) return;
      var option = document.createElement('option');
      option.value = trimmedId;
      option.textContent = label || trimmedId;
      if (options.dataset && option.dataset) {
        Object.entries(options.dataset).forEach(function (_ref8) {
          var _ref9 = _slicedToArray(_ref8, 2),
            key = _ref9[0],
            value = _ref9[1];
          if (value == null) return;
          option.dataset[key] = value;
        });
      }
      if (options.fallback) {
        option.dataset.autoGearFallback = 'true';
      }
      if (selectedValues.includes(trimmedId)) {
        option.selected = true;
      }
      autoGearOwnGearSelect.appendChild(option);
      seen.add(trimmedId);
    };
    items.forEach(function (item) {
      if (!item || typeof item.id !== 'string') return;
      var trimmedId = item.id.trim();
      if (!trimmedId) return;
      var dataset = {};
      if (typeof item.name === 'string' && item.name) {
        dataset.name = item.name;
      }
      var formattedQuantity = formatOwnGearQuantityText(item.quantity);
      if (formattedQuantity) {
        dataset.quantity = formattedQuantity;
      }
      if (typeof item.notes === 'string' && item.notes) {
        dataset.notes = item.notes;
      }
      appendOption(trimmedId, formatAutoGearOwnGearLabel(item) || item.name || trimmedId, {
        dataset: dataset
      });
    });
    selectedValues.forEach(function (value) {
      if (!value || seen.has(value)) return;
      var record = typeof findAutoGearOwnGearById === 'function' ? findAutoGearOwnGearById(value) : null;
      var label = (record === null || record === void 0 ? void 0 : record.name) || value;
      appendOption(value, label, {
        fallback: true
      });
    });
    var selectableOptions = Array.from(autoGearOwnGearSelect.options || []).filter(function (option) {
      return !option.disabled;
    });
    autoGearOwnGearSelect.size = computeAutoGearMultiSelectSize(selectableOptions.length, {
      minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS
    });
    var hasSelectable = selectableOptions.some(function (option) {
      return option.dataset.autoGearFallback !== 'true';
    });
    autoGearOwnGearSelect.disabled = !hasSelectable && selectedValues.length === 0;
  }
  function updateAutoGearOwnGearOptions() {
    var selects = [autoGearAddOwnGearSelect, autoGearRemoveOwnGearSelect].filter(Boolean);
    if (!selects.length) return;
    var items = getAutoGearOwnGearItems();
    selects.forEach(function (select) {
      var _texts$currentLang, _texts$en1;
      if (!select) return;
      var currentValue = select.value || '';
      var placeholder = select.getAttribute('data-placeholder') || ((_texts$currentLang = texts[currentLang]) === null || _texts$currentLang === void 0 ? void 0 : _texts$currentLang.autoGearOwnGearPlaceholder) || ((_texts$en1 = texts.en) === null || _texts$en1 === void 0 ? void 0 : _texts$en1.autoGearOwnGearPlaceholder) || 'Manual entry';
      select.innerHTML = '';
      var placeholderOption = document.createElement('option');
      placeholderOption.value = '';
      placeholderOption.textContent = placeholder;
      select.appendChild(placeholderOption);
      items.forEach(function (item) {
        if (!item || typeof item.id !== 'string' || !item.id || typeof item.name !== 'string') return;
        var option = document.createElement('option');
        option.value = item.id;
        option.textContent = formatAutoGearOwnGearLabel(item) || item.name;
        option.dataset.name = item.name;
        if (item.notes) option.dataset.notes = item.notes;
        if (item.source) option.dataset.source = item.source;
        var formattedQuantity = formatOwnGearQuantityText(item.quantity);
        if (formattedQuantity) option.dataset.quantity = formattedQuantity;
        if (item.id === currentValue) option.selected = true;
        select.appendChild(option);
      });
      if (currentValue && select.value !== currentValue) {
        if (select.querySelector("option[value=\"".concat(currentValue, "\"]"))) {
          select.value = currentValue;
        } else {
          select.value = '';
        }
      }
      select.disabled = items.length === 0;
    });
    refreshAutoGearOwnGearConditionOptions(Array.isArray(autoGearEditorDraft === null || autoGearEditorDraft === void 0 ? void 0 : autoGearEditorDraft.ownGear) ? autoGearEditorDraft.ownGear : undefined);
  }
  function isAutoGearMonitoringCategory(value) {
    if (typeof value !== 'string') return false;
    return value.trim().toLowerCase() === 'monitoring';
  }
  function isMonitoringCategorySelected(select) {
    var _select$options;
    if (!select) return false;
    var directValue = typeof select.value === 'string' ? select.value : '';
    if (isAutoGearMonitoringCategory(directValue)) {
      return true;
    }
    var option = ((_select$options = select.options) === null || _select$options === void 0 ? void 0 : _select$options[select.selectedIndex]) || null;
    if (!option) return false;
    var optionValue = typeof option.value === 'string' ? option.value : '';
    if (isAutoGearMonitoringCategory(optionValue)) {
      return true;
    }
    var optionLabel = typeof option.textContent === 'string' ? option.textContent : '';
    return isAutoGearMonitoringCategory(optionLabel);
  }
  function matchesTripodCategory(value) {
    var normalized = typeof value === 'string' ? value.trim().toLowerCase() : '';
    if (!normalized) return false;
    if (normalized === 'camera support') return true;
    if (normalized === 'grip') return true;
    return normalized.includes('tripod');
  }
  function isTripodCategorySelected(select) {
    var _select$options2;
    if (!select) return false;
    var directValue = typeof select.value === 'string' ? select.value : '';
    if (matchesTripodCategory(directValue)) return true;
    var option = ((_select$options2 = select.options) === null || _select$options2 === void 0 ? void 0 : _select$options2[select.selectedIndex]) || null;
    if (!option) return false;
    if (matchesTripodCategory(option.value)) return true;
    var optionLabel = typeof option.textContent === 'string' ? option.textContent : '';
    return matchesTripodCategory(optionLabel);
  }
  function setAutoGearFieldVisibility(field, isVisible) {
    if (!field) return;
    if (isVisible) {
      field.hidden = false;
      field.removeAttribute('hidden');
      field.removeAttribute('aria-hidden');
      if (Object.prototype.hasOwnProperty.call(field.dataset, 'autoGearHiddenDisplay')) {
        var storedDisplay = field.dataset.autoGearHiddenDisplay;
        if (storedDisplay) {
          field.style.display = storedDisplay;
        } else {
          field.style.removeProperty('display');
        }
        delete field.dataset.autoGearHiddenDisplay;
      } else if (field.style.display === 'none') {
        field.style.removeProperty('display');
      }
    } else {
      field.hidden = true;
      field.setAttribute('hidden', '');
      field.setAttribute('aria-hidden', 'true');
      if (!Object.prototype.hasOwnProperty.call(field.dataset, 'autoGearHiddenDisplay')) {
        field.dataset.autoGearHiddenDisplay = field.style.display || '';
      }
      field.style.display = 'none';
    }
  }
  function updateAutoGearMonitorFieldGroup(group) {
    if (!group || !group.select) return;
    var select = group.select,
      screenSizeField = group.screenSizeField,
      screenSizeInput = group.screenSizeInput,
      selectorTypeField = group.selectorTypeField,
      selectorTypeSelect = group.selectorTypeSelect,
      selectorDefaultField = group.selectorDefaultField,
      selectorDefaultInput = group.selectorDefaultInput;
    var isMonitoring = isMonitoringCategorySelected(select);
    var isTripod = isTripodCategorySelected(select);
    var showScreenSize = isMonitoring;
    var showSelectorFields = isMonitoring || isTripod;
    setAutoGearFieldVisibility(screenSizeField, showScreenSize);
    setAutoGearFieldVisibility(selectorTypeField, showSelectorFields);
    setAutoGearFieldVisibility(selectorDefaultField, showSelectorFields);
    if (!showScreenSize && screenSizeInput) {
      screenSizeInput.value = '';
    }
    if (!showSelectorFields) {
      if (selectorTypeSelect) selectorTypeSelect.value = 'none';
      if (selectorDefaultInput) {
        selectorDefaultInput.value = '';
        if (Object.prototype.hasOwnProperty.call(selectorDefaultInput.dataset || {}, 'autoGearPreferredDefault')) {
          delete selectorDefaultInput.dataset.autoGearPreferredDefault;
        }
      }
    }
  }
  function extractAutoGearContextNotes(name) {
    var contexts = [];
    if (!name || typeof name !== 'string') {
      return {
        baseName: '',
        contexts: contexts
      };
    }
    var baseName = name.trim();
    var contextPattern = /^(.*\([^()]*\)) \(([^()]+)\)$/;
    var match = baseName.match(contextPattern);
    while (match) {
      var candidate = match[2].trim();
      if (/handheld\b/i.test(candidate) || /15-21"?$/.test(candidate)) {
        contexts.unshift(candidate);
        baseName = match[1].trim();
      } else {
        break;
      }
      match = baseName.match(contextPattern);
    }
    return {
      baseName: baseName,
      contexts: contexts
    };
  }
  function normalizeAutoGearItem(entry) {
    var _ownGearRecord;
    if (!entry || _typeof(entry) !== 'object') return null;
    var requestedName = normalizeAutoGearText(entry.name);
    var ownGearSourceId = typeof entry.ownGearId === 'string' ? entry.ownGearId.trim() : '';
    var ownGearFallbackLabel = normalizeAutoGearText(entry.ownGearLabel);
    var ownGearNameInput = normalizeAutoGearText(entry.ownGearName);
    var ownGearRecord = null;
    if (ownGearSourceId) {
      ownGearRecord = findAutoGearOwnGearById(ownGearSourceId) || null;
    }
    var rawName = ((_ownGearRecord = ownGearRecord) === null || _ownGearRecord === void 0 ? void 0 : _ownGearRecord.name) || ownGearNameInput || requestedName;
    if (!rawName) return null;
    var _extractAutoGearConte = extractAutoGearContextNotes(requestedName || rawName),
      baseName = _extractAutoGearConte.baseName,
      contexts = _extractAutoGearConte.contexts;
    var name = baseName || rawName;
    var storedContexts = Array.isArray(entry.contextNotes) ? entry.contextNotes.filter(function (value) {
      return typeof value === 'string' && value.trim();
    }) : [];
    storedContexts.forEach(function (note) {
      var trimmed = note.trim();
      if (!trimmed) return;
      if (!contexts.includes(trimmed)) contexts.push(trimmed);
    });
    var category = normalizeAutoGearText(entry.category);
    var quantity = normalizeAutoGearQuantity(entry.quantity);
    var id = typeof entry.id === 'string' && entry.id ? entry.id : generateAutoGearId('item');
    var screenSize = normalizeAutoGearText(entry.screenSize);
    var selectorType = normalizeAutoGearSelectorType(entry.selectorType);
    var selectorContext = typeof entry.selectorContext === 'string' ? entry.selectorContext.trim() : '';
    var selectorDefault = normalizeAutoGearSelectorDefault(selectorType, entry.selectorDefault, selectorContext);
    var selectorEnabled = !!entry.selectorEnabled;
    if (selectorType === 'none') {
      selectorEnabled = false;
    } else if (isAutoGearMonitoringCategory(category)) {
      selectorEnabled = true;
    }
    var notes = normalizeAutoGearText(entry.notes);
    var ownGearId = '';
    var ownGearLabel = '';
    if (ownGearRecord) {
      ownGearId = ownGearRecord.id;
      ownGearLabel = ownGearRecord.name || '';
      name = ownGearRecord.name || name;
      if (!notes && typeof ownGearRecord.notes === 'string') {
        var trimmedNotes = normalizeAutoGearText(ownGearRecord.notes);
        if (trimmedNotes) notes = trimmedNotes;
      }
    } else if (ownGearSourceId) {
      ownGearId = ownGearSourceId;
      ownGearLabel = ownGearFallbackLabel || ownGearNameInput || name;
    }
    return {
      id: id,
      name: name,
      category: category,
      quantity: quantity,
      screenSize: screenSize,
      selectorType: selectorType,
      selectorDefault: selectorDefault,
      selectorEnabled: selectorEnabled,
      selectorContext: selectorContext,
      notes: notes,
      contextNotes: contexts,
      ownGearId: ownGearId,
      ownGearLabel: ownGearLabel
    };
  }
  function normalizeAutoGearTriggerList(values) {
    if (!Array.isArray(values)) return [];
    return Array.from(new Set(values.map(function (value) {
      return typeof value === 'string' ? value.trim() : '';
    }).filter(Boolean)));
  }
  var AUTO_GEAR_SCENARIO_LOGIC_VALUES = new Set(['all', 'any', 'multiplier']);
  function normalizeAutoGearScenarioLogic(value) {
    if (typeof value !== 'string') return 'all';
    var normalized = value.trim().toLowerCase();
    if (!normalized) return 'all';
    if (normalized === 'or') return 'any';
    if (normalized === 'and') return 'all';
    if (normalized === 'any') return 'any';
    if (normalized === 'multiplier' || normalized === 'multiply' || normalized === 'multiplied') {
      return 'multiplier';
    }
    return AUTO_GEAR_SCENARIO_LOGIC_VALUES.has(normalized) ? normalized : 'all';
  }
  var AUTO_GEAR_CONDITION_LOGIC_VALUES = new Set(['all', 'any', 'or', 'none', 'multiplier']);
  var AUTO_GEAR_CONDITION_LOGIC_FIELDS = {
    mattebox: 'matteboxLogic',
    cameraHandle: 'cameraHandleLogic',
    viewfinderExtension: 'viewfinderExtensionLogic',
    deliveryResolution: 'deliveryResolutionLogic',
    videoDistribution: 'videoDistributionLogic',
    camera: 'cameraLogic',
    ownGear: 'ownGearLogic',
    monitor: 'monitorLogic',
    tripodHeadBrand: 'tripodHeadBrandLogic',
    tripodBowl: 'tripodBowlLogic',
    tripodTypes: 'tripodTypesLogic',
    tripodSpreader: 'tripodSpreaderLogic',
    crewPresent: 'crewPresentLogic',
    crewAbsent: 'crewAbsentLogic',
    wireless: 'wirelessLogic',
    motors: 'motorsLogic',
    controllers: 'controllersLogic',
    distance: 'distanceLogic'
  };
  function normalizeAutoGearConditionLogic(value) {
    if (typeof value !== 'string') return 'all';
    var normalized = value.trim().toLowerCase();
    if (!normalized) return 'all';
    if (normalized === 'or') return 'or';
    if (normalized === 'and') return 'all';
    if (normalized === 'any') return 'any';
    if (normalized === 'none' || normalized === 'no' || normalized === 'exclude' || normalized === 'absent') {
      return 'none';
    }
    if (normalized === 'multiplier' || normalized === 'multiply' || normalized === 'multiplied') {
      return 'multiplier';
    }
    if (!AUTO_GEAR_CONDITION_LOGIC_VALUES.has(normalized)) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unknown auto gear condition logic joiner. Falling back to "all".', value);
      }
      return 'all';
    }
    return normalized;
  }
  function readAutoGearConditionLogic(rule, key) {
    if (!rule || _typeof(rule) !== 'object') return 'all';
    var property = AUTO_GEAR_CONDITION_LOGIC_FIELDS[key];
    var raw;
    if (property && Object.prototype.hasOwnProperty.call(rule, property)) {
      raw = rule[property];
    }
    if (raw == null) {
      var alias = "".concat(key, "Mode");
      if (Object.prototype.hasOwnProperty.call(rule, alias)) {
        raw = rule[alias];
      }
    }
    if (raw == null && rule.conditionLogic && _typeof(rule.conditionLogic) === 'object') {
      raw = rule.conditionLogic[key];
    }
    return normalizeAutoGearConditionLogic(raw);
  }
  function normalizeAutoGearScenarioMultiplier(value) {
    var num = parseInt(value, 10);
    return Number.isFinite(num) && num > 1 ? num : 1;
  }
  function normalizeAutoGearScenarioPrimary(value) {
    return typeof value === 'string' ? value.trim() : '';
  }
  function normalizeVideoDistributionTriggerList(values) {
    if (!Array.isArray(values)) return [];
    var base = normalizeAutoGearTriggerList(values);
    var seen = new Set();
    var result = [];
    base.forEach(function (value) {
      var lower = value.toLowerCase();
      var normalized = lower === '__none__' || lower === 'none' ? '__none__' : value;
      if (!normalized || seen.has(normalized)) return;
      seen.add(normalized);
      result.push(normalized);
    });
    return result;
  }
  function normalizeAutoGearTriggerValue(value) {
    return typeof value === 'string' ? value.trim().toLowerCase() : '';
  }
  function autoGearRuleMatteboxKey(rule) {
    if (!rule || _typeof(rule) !== 'object') return '';
    var matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox : [];
    if (!matteboxList.length) return '';
    return matteboxList.map(normalizeAutoGearTriggerValue).filter(Boolean).sort(function (a, b) {
      return a.localeCompare(b);
    }).join('|');
  }
  var AUTO_GEAR_SHOOTING_DAY_MODES = new Set(['minimum', 'maximum', 'every']);
  function normalizeAutoGearShootingDayMode(value) {
    if (typeof value !== 'string') return 'minimum';
    var normalized = value.trim().toLowerCase();
    if (!normalized) return 'minimum';
    if (AUTO_GEAR_SHOOTING_DAY_MODES.has(normalized)) return normalized;
    if (normalized === 'min' || normalized === 'at least') return 'minimum';
    if (normalized === 'max' || normalized === 'at most') return 'maximum';
    if (normalized === 'each' || normalized === 'every') return 'every';
    return 'minimum';
  }
  function normalizeAutoGearShootingDayValue(value) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      var rounded = Math.round(value);
      return rounded > 0 ? rounded : null;
    }
    if (typeof value === 'string') {
      var trimmed = value.trim();
      if (!trimmed) return null;
      var parsed = Number.parseInt(trimmed, 10);
      if (!Number.isFinite(parsed)) return null;
      return parsed > 0 ? parsed : null;
    }
    return null;
  }
  function normalizeAutoGearShootingDaysList(values) {
    if (!Array.isArray(values)) return [];
    var unique = new Set();
    values.forEach(function (value) {
      var normalized = normalizeAutoGearShootingDayValue(value);
      if (Number.isFinite(normalized) && normalized > 0) {
        unique.add(normalized);
      }
    });
    return Array.from(unique).sort(function (a, b) {
      return a - b;
    });
  }
  function normalizeAutoGearShootingDaysCondition(setting) {
    if (!setting) return null;
    if (Array.isArray(setting)) {
      var values = normalizeAutoGearShootingDaysList(setting);
      if (!values.length) return null;
      var maxValue = values[values.length - 1];
      return Number.isFinite(maxValue) && maxValue > 0 ? {
        mode: 'minimum',
        value: maxValue
      } : null;
    }
    if (_typeof(setting) === 'object') {
      var _ref0, _ref1, _ref10, _setting$mode, _ref11, _ref12, _ref13, _ref14, _setting$value;
      var modeSource = (_ref0 = (_ref1 = (_ref10 = (_setting$mode = setting.mode) !== null && _setting$mode !== void 0 ? _setting$mode : setting.type) !== null && _ref10 !== void 0 ? _ref10 : setting.comparison) !== null && _ref1 !== void 0 ? _ref1 : setting.condition) !== null && _ref0 !== void 0 ? _ref0 : setting.kind;
      var mode = normalizeAutoGearShootingDayMode(modeSource);
      var valueSource = (_ref11 = (_ref12 = (_ref13 = (_ref14 = (_setting$value = setting.value) !== null && _setting$value !== void 0 ? _setting$value : setting.count) !== null && _ref14 !== void 0 ? _ref14 : setting.days) !== null && _ref13 !== void 0 ? _ref13 : setting.minimum) !== null && _ref12 !== void 0 ? _ref12 : setting.maximum) !== null && _ref11 !== void 0 ? _ref11 : setting.frequency;
      var value = normalizeAutoGearShootingDayValue(valueSource);
      if (Number.isFinite(value) && value > 0) {
        return {
          mode: mode,
          value: value
        };
      }
      return null;
    }
    var normalizedValue = normalizeAutoGearShootingDayValue(setting);
    if (Number.isFinite(normalizedValue) && normalizedValue > 0) {
      return {
        mode: 'minimum',
        value: normalizedValue
      };
    }
    return null;
  }
  function normalizeAutoGearRule(rule) {
    if (!rule || _typeof(rule) !== 'object') return null;
    var id = typeof rule.id === 'string' && rule.id ? rule.id : generateAutoGearId('rule');
    var label = typeof rule.label === 'string' ? rule.label.trim() : '';
    var always = false;
    if (Array.isArray(rule.always)) {
      always = rule.always.some(function (value) {
        if (typeof value === 'string') {
          var trimmed = value.trim().toLowerCase();
          if (!trimmed) return false;
          if (trimmed === 'false' || trimmed === '0') return false;
          return true;
        }
        return Boolean(value);
      });
    } else if (typeof rule.always === 'string') {
      var trimmed = rule.always.trim().toLowerCase();
      always = trimmed === 'true' || trimmed && trimmed !== 'false' && trimmed !== '0';
    } else {
      always = Boolean(rule.always);
    }
    var scenarios = normalizeAutoGearTriggerList(rule.scenarios);
    var scenarioLogic = normalizeAutoGearScenarioLogic(rule.scenarioLogic);
    var scenarioMultiplier = 1;
    var scenarioPrimary = '';
    if (scenarioLogic === 'multiplier') {
      scenarioMultiplier = normalizeAutoGearScenarioMultiplier(rule.scenarioMultiplier);
      var requestedPrimary = normalizeAutoGearScenarioPrimary(rule.scenarioPrimary);
      var normalizedPrimary = normalizeAutoGearTriggerValue(requestedPrimary);
      if (normalizedPrimary) {
        var matched = scenarios.find(function (value) {
          return normalizeAutoGearTriggerValue(value) === normalizedPrimary;
        });
        if (matched) {
          scenarioPrimary = matched;
        } else if (requestedPrimary) {
          scenarioPrimary = requestedPrimary;
          scenarios.push(requestedPrimary);
        }
      }
      if (!scenarioPrimary && scenarios.length) {
        scenarioPrimary = scenarios[0];
      }
    }
    scenarios = scenarios.sort(function (a, b) {
      return a.localeCompare(b);
    });
    if (scenarioLogic === 'multiplier' && scenarioPrimary) {
      var _normalizedPrimary = normalizeAutoGearTriggerValue(scenarioPrimary);
      var hasPrimary = scenarios.some(function (value) {
        return normalizeAutoGearTriggerValue(value) === _normalizedPrimary;
      });
      if (!hasPrimary) {
        scenarios.push(scenarioPrimary);
        scenarios.sort(function (a, b) {
          return a.localeCompare(b);
        });
      }
    }
    var mattebox = normalizeAutoGearTriggerList(rule.mattebox).sort(function (a, b) {
      return a.localeCompare(b);
    });
    var cameraHandle = normalizeAutoGearTriggerList(rule.cameraHandle).sort(function (a, b) {
      return a.localeCompare(b);
    });
    var viewfinderExtension = normalizeAutoGearTriggerList(rule.viewfinderExtension).sort(function (a, b) {
      return a.localeCompare(b);
    });
    var deliveryResolution = normalizeAutoGearTriggerList(rule.deliveryResolution).sort(function (a, b) {
      return a.localeCompare(b);
    });
    var videoDistribution = normalizeVideoDistributionTriggerList(rule.videoDistribution).sort(function (a, b) {
      return a.localeCompare(b);
    });
    var camera = normalizeAutoGearTriggerList(rule.camera).sort(function (a, b) {
      return a.localeCompare(b);
    });
    var ownGear = normalizeAutoGearTriggerList(rule.ownGear).sort(function (a, b) {
      return a.localeCompare(b);
    });
    var cameraWeight = normalizeAutoGearCameraWeightCondition(rule.cameraWeight);
    var monitor = normalizeAutoGearTriggerList(rule.monitor).sort(function (a, b) {
      return a.localeCompare(b);
    });
    var tripodHeadBrand = normalizeAutoGearTriggerList(rule.tripodHeadBrand).sort(function (a, b) {
      return a.localeCompare(b);
    });
    var tripodBowl = normalizeAutoGearTriggerList(rule.tripodBowl).sort(function (a, b) {
      return a.localeCompare(b);
    });
    var tripodTypes = normalizeAutoGearTriggerList(rule.tripodTypes).sort(function (a, b) {
      return a.localeCompare(b);
    });
    var tripodSpreader = normalizeAutoGearTriggerList(rule.tripodSpreader).sort(function (a, b) {
      return a.localeCompare(b);
    });
    var crewPresent = normalizeAutoGearTriggerList(rule.crewPresent).sort(function (a, b) {
      return a.localeCompare(b);
    });
    var crewAbsent = normalizeAutoGearTriggerList(rule.crewAbsent).sort(function (a, b) {
      return a.localeCompare(b);
    });
    var wireless = normalizeAutoGearTriggerList(rule.wireless).sort(function (a, b) {
      return a.localeCompare(b);
    });
    var motors = normalizeAutoGearTriggerList(rule.motors).sort(function (a, b) {
      return a.localeCompare(b);
    });
    var controllers = normalizeAutoGearTriggerList(rule.controllers).sort(function (a, b) {
      return a.localeCompare(b);
    });
    var distance = normalizeAutoGearTriggerList(rule.distance).sort(function (a, b) {
      return a.localeCompare(b);
    });
    var shootingDays = normalizeAutoGearShootingDaysCondition(rule.shootingDays);
    var matteboxLogic = readAutoGearConditionLogic(rule, 'mattebox');
    var cameraHandleLogic = readAutoGearConditionLogic(rule, 'cameraHandle');
    var viewfinderExtensionLogic = readAutoGearConditionLogic(rule, 'viewfinderExtension');
    var deliveryResolutionLogic = readAutoGearConditionLogic(rule, 'deliveryResolution');
    var videoDistributionLogic = readAutoGearConditionLogic(rule, 'videoDistribution');
    var cameraLogic = readAutoGearConditionLogic(rule, 'camera');
    var ownGearLogic = readAutoGearConditionLogic(rule, 'ownGear');
    var monitorLogic = readAutoGearConditionLogic(rule, 'monitor');
    var tripodHeadBrandLogic = readAutoGearConditionLogic(rule, 'tripodHeadBrand');
    var tripodBowlLogic = readAutoGearConditionLogic(rule, 'tripodBowl');
    var tripodTypesLogic = readAutoGearConditionLogic(rule, 'tripodTypes');
    var tripodSpreaderLogic = readAutoGearConditionLogic(rule, 'tripodSpreader');
    var crewPresentLogic = readAutoGearConditionLogic(rule, 'crewPresent');
    var crewAbsentLogic = readAutoGearConditionLogic(rule, 'crewAbsent');
    var wirelessLogic = readAutoGearConditionLogic(rule, 'wireless');
    var motorsLogic = readAutoGearConditionLogic(rule, 'motors');
    var controllersLogic = readAutoGearConditionLogic(rule, 'controllers');
    var distanceLogic = readAutoGearConditionLogic(rule, 'distance');
    var conditionLogic = {};
    if (scenarioLogic && scenarioLogic !== 'all') {
      conditionLogic.scenarios = scenarioLogic;
    }
    if (matteboxLogic && matteboxLogic !== 'all') conditionLogic.mattebox = matteboxLogic;
    if (cameraHandleLogic && cameraHandleLogic !== 'all') conditionLogic.cameraHandle = cameraHandleLogic;
    if (viewfinderExtensionLogic && viewfinderExtensionLogic !== 'all') {
      conditionLogic.viewfinderExtension = viewfinderExtensionLogic;
    }
    if (deliveryResolutionLogic && deliveryResolutionLogic !== 'all') {
      conditionLogic.deliveryResolution = deliveryResolutionLogic;
    }
    if (videoDistributionLogic && videoDistributionLogic !== 'all') {
      conditionLogic.videoDistribution = videoDistributionLogic;
    }
    if (cameraLogic && cameraLogic !== 'all') conditionLogic.camera = cameraLogic;
    if (ownGearLogic && ownGearLogic !== 'all') conditionLogic.ownGear = ownGearLogic;
    if (monitorLogic && monitorLogic !== 'all') conditionLogic.monitor = monitorLogic;
    if (tripodHeadBrandLogic && tripodHeadBrandLogic !== 'all') {
      conditionLogic.tripodHeadBrand = tripodHeadBrandLogic;
    }
    if (tripodBowlLogic && tripodBowlLogic !== 'all') {
      conditionLogic.tripodBowl = tripodBowlLogic;
    }
    if (tripodTypesLogic && tripodTypesLogic !== 'all') {
      conditionLogic.tripodTypes = tripodTypesLogic;
    }
    if (tripodSpreaderLogic && tripodSpreaderLogic !== 'all') {
      conditionLogic.tripodSpreader = tripodSpreaderLogic;
    }
    if (crewPresentLogic && crewPresentLogic !== 'all') conditionLogic.crewPresent = crewPresentLogic;
    if (crewAbsentLogic && crewAbsentLogic !== 'all') conditionLogic.crewAbsent = crewAbsentLogic;
    if (wirelessLogic && wirelessLogic !== 'all') conditionLogic.wireless = wirelessLogic;
    if (motorsLogic && motorsLogic !== 'all') conditionLogic.motors = motorsLogic;
    if (controllersLogic && controllersLogic !== 'all') conditionLogic.controllers = controllersLogic;
    if (distanceLogic && distanceLogic !== 'all') conditionLogic.distance = distanceLogic;
    if (!always && !scenarios.length && !shootingDays && !mattebox.length && !cameraHandle.length && !viewfinderExtension.length && !deliveryResolution.length && !videoDistribution.length && !camera.length && !ownGear.length && !cameraWeight && !monitor.length && !tripodHeadBrand.length && !tripodBowl.length && !tripodTypes.length && !tripodSpreader.length && !crewPresent.length && !crewAbsent.length && !wireless.length && !motors.length && !controllers.length && !distance.length) return null;
    var add = Array.isArray(rule.add) ? rule.add.map(normalizeAutoGearItem).filter(Boolean) : [];
    var remove = Array.isArray(rule.remove) ? rule.remove.map(normalizeAutoGearItem).filter(Boolean) : [];
    if (!add.length && !remove.length) return null;
    return {
      id: id,
      label: label,
      always: always,
      scenarioLogic: scenarioLogic,
      scenarioPrimary: scenarioPrimary,
      scenarioMultiplier: scenarioMultiplier,
      scenarios: scenarios,
      mattebox: mattebox,
      cameraHandle: cameraHandle,
      viewfinderExtension: viewfinderExtension,
      deliveryResolution: deliveryResolution,
      videoDistribution: videoDistribution,
      camera: camera,
      ownGear: ownGear,
      cameraWeight: cameraWeight,
      monitor: monitor,
      tripodHeadBrand: tripodHeadBrand,
      tripodBowl: tripodBowl,
      tripodTypes: tripodTypes,
      tripodSpreader: tripodSpreader,
      crewPresent: crewPresent,
      crewAbsent: crewAbsent,
      wireless: wireless,
      motors: motors,
      controllers: controllers,
      distance: distance,
      shootingDays: shootingDays,
      matteboxLogic: matteboxLogic,
      cameraHandleLogic: cameraHandleLogic,
      viewfinderExtensionLogic: viewfinderExtensionLogic,
      deliveryResolutionLogic: deliveryResolutionLogic,
      videoDistributionLogic: videoDistributionLogic,
      cameraLogic: cameraLogic,
      ownGearLogic: ownGearLogic,
      monitorLogic: monitorLogic,
      tripodHeadBrandLogic: tripodHeadBrandLogic,
      tripodBowlLogic: tripodBowlLogic,
      tripodTypesLogic: tripodTypesLogic,
      tripodSpreaderLogic: tripodSpreaderLogic,
      crewPresentLogic: crewPresentLogic,
      crewAbsentLogic: crewAbsentLogic,
      wirelessLogic: wirelessLogic,
      motorsLogic: motorsLogic,
      controllersLogic: controllersLogic,
      distanceLogic: distanceLogic,
      conditionLogic: conditionLogic,
      add: add,
      remove: remove
    };
  }
  function autoGearItemSnapshot(item) {
    var normalized = normalizeAutoGearItem(item);
    if (!normalized) {
      return {
        name: '',
        category: '',
        quantity: 0,
        screenSize: '',
        selectorType: 'none',
        selectorDefault: '',
        selectorEnabled: false,
        notes: '',
        ownGearId: '',
        ownGearLabel: ''
      };
    }
    var name = normalized.name,
      category = normalized.category,
      quantity = normalized.quantity,
      screenSize = normalized.screenSize,
      selectorType = normalized.selectorType,
      selectorDefault = normalized.selectorDefault,
      selectorEnabled = normalized.selectorEnabled,
      notes = normalized.notes,
      ownGearId = normalized.ownGearId,
      ownGearLabel = normalized.ownGearLabel;
    return {
      name: name,
      category: category,
      quantity: normalizeAutoGearQuantity(quantity),
      screenSize: screenSize,
      selectorType: selectorType,
      selectorDefault: selectorDefault,
      selectorEnabled: selectorEnabled,
      notes: notes,
      ownGearId: ownGearId,
      ownGearLabel: ownGearLabel
    };
  }
  function autoGearItemSortKey(item) {
    var snapshot = autoGearItemSnapshot(item);
    var name = snapshot.name || '';
    var category = snapshot.category || '';
    var quantity = normalizeAutoGearQuantity(snapshot.quantity);
    var screenSize = snapshot.screenSize || '';
    var selectorType = snapshot.selectorType || 'none';
    var selectorDefault = snapshot.selectorDefault || '';
    var selectorEnabled = snapshot.selectorEnabled ? '1' : '0';
    var notes = snapshot.notes || '';
    var ownGearId = snapshot.ownGearId || '';
    var ownGearLabel = snapshot.ownGearLabel || '';
    return "".concat(name, "|").concat(category, "|").concat(quantity, "|").concat(screenSize, "|").concat(selectorType, "|").concat(selectorEnabled, "|").concat(selectorDefault, "|").concat(notes, "|").concat(ownGearId, "|").concat(ownGearLabel);
  }
  function snapshotAutoGearRuleForFingerprint(rule) {
    var normalized = normalizeAutoGearRule(rule);
    if (!normalized) return null;
    var mapItems = function mapItems(items) {
      return items.map(autoGearItemSnapshot).sort(function (a, b) {
        return autoGearItemSortKey(a).localeCompare(autoGearItemSortKey(b));
      });
    };
    return {
      label: normalized.label || '',
      always: normalized.always ? 1 : 0,
      scenarios: normalized.scenarios.slice().sort(function (a, b) {
        return a.localeCompare(b);
      }),
      mattebox: normalized.mattebox.slice().sort(function (a, b) {
        return a.localeCompare(b);
      }),
      cameraHandle: normalized.cameraHandle.slice().sort(function (a, b) {
        return a.localeCompare(b);
      }),
      viewfinderExtension: normalized.viewfinderExtension.slice().sort(function (a, b) {
        return a.localeCompare(b);
      }),
      deliveryResolution: normalized.deliveryResolution.slice().sort(function (a, b) {
        return a.localeCompare(b);
      }),
      videoDistribution: normalized.videoDistribution.slice().sort(function (a, b) {
        return a.localeCompare(b);
      }),
      camera: normalized.camera.slice().sort(function (a, b) {
        return a.localeCompare(b);
      }),
      cameraWeight: normalized.cameraWeight ? {
        operator: normalized.cameraWeight.operator,
        value: normalized.cameraWeight.value
      } : null,
      monitor: normalized.monitor.slice().sort(function (a, b) {
        return a.localeCompare(b);
      }),
      tripodHeadBrand: normalized.tripodHeadBrand.slice().sort(function (a, b) {
        return a.localeCompare(b);
      }),
      tripodBowl: normalized.tripodBowl.slice().sort(function (a, b) {
        return a.localeCompare(b);
      }),
      tripodTypes: normalized.tripodTypes.slice().sort(function (a, b) {
        return a.localeCompare(b);
      }),
      tripodSpreader: normalized.tripodSpreader.slice().sort(function (a, b) {
        return a.localeCompare(b);
      }),
      crewPresent: normalized.crewPresent.slice().sort(function (a, b) {
        return a.localeCompare(b);
      }),
      crewAbsent: normalized.crewAbsent.slice().sort(function (a, b) {
        return a.localeCompare(b);
      }),
      wireless: normalized.wireless.slice().sort(function (a, b) {
        return a.localeCompare(b);
      }),
      motors: normalized.motors.slice().sort(function (a, b) {
        return a.localeCompare(b);
      }),
      controllers: normalized.controllers.slice().sort(function (a, b) {
        return a.localeCompare(b);
      }),
      distance: normalized.distance.slice().sort(function (a, b) {
        return a.localeCompare(b);
      }),
      shootingDays: normalizeAutoGearShootingDaysCondition(normalized.shootingDays),
      matteboxLogic: normalizeAutoGearConditionLogic(normalized.matteboxLogic),
      cameraHandleLogic: normalizeAutoGearConditionLogic(normalized.cameraHandleLogic),
      viewfinderExtensionLogic: normalizeAutoGearConditionLogic(normalized.viewfinderExtensionLogic),
      deliveryResolutionLogic: normalizeAutoGearConditionLogic(normalized.deliveryResolutionLogic),
      videoDistributionLogic: normalizeAutoGearConditionLogic(normalized.videoDistributionLogic),
      cameraLogic: normalizeAutoGearConditionLogic(normalized.cameraLogic),
      monitorLogic: normalizeAutoGearConditionLogic(normalized.monitorLogic),
      tripodHeadBrandLogic: normalizeAutoGearConditionLogic(normalized.tripodHeadBrandLogic),
      tripodBowlLogic: normalizeAutoGearConditionLogic(normalized.tripodBowlLogic),
      tripodTypesLogic: normalizeAutoGearConditionLogic(normalized.tripodTypesLogic),
      tripodSpreaderLogic: normalizeAutoGearConditionLogic(normalized.tripodSpreaderLogic),
      crewPresentLogic: normalizeAutoGearConditionLogic(normalized.crewPresentLogic),
      crewAbsentLogic: normalizeAutoGearConditionLogic(normalized.crewAbsentLogic),
      wirelessLogic: normalizeAutoGearConditionLogic(normalized.wirelessLogic),
      motorsLogic: normalizeAutoGearConditionLogic(normalized.motorsLogic),
      controllersLogic: normalizeAutoGearConditionLogic(normalized.controllersLogic),
      distanceLogic: normalizeAutoGearConditionLogic(normalized.distanceLogic),
      conditionLogic: normalized.conditionLogic ? Object.keys(normalized.conditionLogic).reduce(function (acc, key) {
        acc[key] = normalizeAutoGearConditionLogic(normalized.conditionLogic[key]);
        return acc;
      }, {}) : {},
      add: mapItems(normalized.add),
      remove: mapItems(normalized.remove)
    };
  }
  function autoGearRuleSortKey(rule) {
    var alwaysKey = rule && rule.always ? '1' : '0';
    var scenarioKey = Array.isArray(rule.scenarios) ? rule.scenarios.join('|') : '';
    var matteboxKey = Array.isArray(rule.mattebox) ? rule.mattebox.join('|') : '';
    var cameraHandleKey = Array.isArray(rule.cameraHandle) ? rule.cameraHandle.join('|') : '';
    var viewfinderKey = Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension.join('|') : '';
    var deliveryResolutionKey = Array.isArray(rule.deliveryResolution) ? rule.deliveryResolution.join('|') : '';
    var videoDistributionKey = Array.isArray(rule.videoDistribution) ? rule.videoDistribution.join('|') : '';
    var cameraKey = Array.isArray(rule.camera) ? rule.camera.join('|') : '';
    var cameraWeightCondition = normalizeAutoGearCameraWeightCondition(rule === null || rule === void 0 ? void 0 : rule.cameraWeight);
    var cameraWeightKey = cameraWeightCondition ? "".concat(cameraWeightCondition.operator, ":").concat(cameraWeightCondition.value) : '';
    var monitorKey = Array.isArray(rule.monitor) ? rule.monitor.join('|') : '';
    var tripodHeadBrandKey = Array.isArray(rule.tripodHeadBrand) ? rule.tripodHeadBrand.join('|') : '';
    var tripodBowlKey = Array.isArray(rule.tripodBowl) ? rule.tripodBowl.join('|') : '';
    var tripodTypesKey = Array.isArray(rule.tripodTypes) ? rule.tripodTypes.join('|') : '';
    var tripodSpreaderKey = Array.isArray(rule.tripodSpreader) ? rule.tripodSpreader.join('|') : '';
    var crewPresentKey = Array.isArray(rule.crewPresent) ? rule.crewPresent.join('|') : '';
    var crewAbsentKey = Array.isArray(rule.crewAbsent) ? rule.crewAbsent.join('|') : '';
    var wirelessKey = Array.isArray(rule.wireless) ? rule.wireless.join('|') : '';
    var motorsKey = Array.isArray(rule.motors) ? rule.motors.join('|') : '';
    var controllersKey = Array.isArray(rule.controllers) ? rule.controllers.join('|') : '';
    var distanceKey = Array.isArray(rule.distance) ? rule.distance.join('|') : '';
    var shootingDaysCondition = normalizeAutoGearShootingDaysCondition(rule === null || rule === void 0 ? void 0 : rule.shootingDays);
    var shootingDaysKey = shootingDaysCondition ? "".concat(shootingDaysCondition.mode, ":").concat(shootingDaysCondition.value) : '';
    var matteboxLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.matteboxLogic);
    var cameraHandleLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.cameraHandleLogic);
    var viewfinderLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.viewfinderExtensionLogic);
    var deliveryResolutionLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.deliveryResolutionLogic);
    var videoDistributionLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.videoDistributionLogic);
    var cameraLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.cameraLogic);
    var monitorLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.monitorLogic);
    var tripodHeadBrandLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.tripodHeadBrandLogic);
    var tripodBowlLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.tripodBowlLogic);
    var tripodTypesLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.tripodTypesLogic);
    var tripodSpreaderLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.tripodSpreaderLogic);
    var crewPresentLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.crewPresentLogic);
    var crewAbsentLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.crewAbsentLogic);
    var wirelessLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.wirelessLogic);
    var motorsLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.motorsLogic);
    var controllersLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.controllersLogic);
    var distanceLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.distanceLogic);
    var addKey = Array.isArray(rule.add) ? rule.add.map(autoGearItemSortKey).join('|') : '';
    var removeKey = Array.isArray(rule.remove) ? rule.remove.map(autoGearItemSortKey).join('|') : '';
    return "".concat(alwaysKey, "|").concat(scenarioKey, "|").concat(matteboxKey, "|").concat(cameraHandleKey, "|").concat(viewfinderKey, "|").concat(deliveryResolutionKey, "|").concat(videoDistributionKey, "|").concat(cameraKey, "|").concat(cameraWeightKey, "|").concat(monitorKey, "|").concat(tripodHeadBrandKey, "|").concat(tripodBowlKey, "|").concat(tripodTypesKey, "|").concat(tripodSpreaderKey, "|").concat(crewPresentKey, "|").concat(crewAbsentKey, "|").concat(wirelessKey, "|").concat(motorsKey, "|").concat(controllersKey, "|").concat(distanceKey, "|").concat(shootingDaysKey, "|").concat(matteboxLogicKey, "|").concat(cameraHandleLogicKey, "|").concat(viewfinderLogicKey, "|").concat(deliveryResolutionLogicKey, "|").concat(videoDistributionLogicKey, "|").concat(cameraLogicKey, "|").concat(monitorLogicKey, "|").concat(tripodHeadBrandLogicKey, "|").concat(tripodBowlLogicKey, "|").concat(tripodTypesLogicKey, "|").concat(tripodSpreaderLogicKey, "|").concat(crewPresentLogicKey, "|").concat(crewAbsentLogicKey, "|").concat(wirelessLogicKey, "|").concat(motorsLogicKey, "|").concat(controllersLogicKey, "|").concat(distanceLogicKey, "|").concat(rule.label || '', "|").concat(addKey, "|").concat(removeKey);
  }
  function createAutoGearRulesFingerprint(rules) {
    var snapshot = (Array.isArray(rules) ? rules : []).map(snapshotAutoGearRuleForFingerprint).filter(Boolean).sort(function (a, b) {
      return autoGearRuleSortKey(a).localeCompare(autoGearRuleSortKey(b));
    });
    return stableStringify(snapshot);
  }
  function normalizeAutoGearPreset(entry) {
    if (!entry || _typeof(entry) !== 'object') return null;
    var label = typeof entry.label === 'string' ? entry.label.trim() : '';
    if (!label) return null;
    var rawRules = Array.isArray(entry.rules) ? entry.rules : [];
    var rules = rawRules.map(normalizeAutoGearRule).filter(Boolean);
    var id = typeof entry.id === 'string' && entry.id ? entry.id : generateAutoGearId('preset');
    var fingerprint = createAutoGearRulesFingerprint(rules);
    return {
      id: id,
      label: label,
      rules: rules,
      fingerprint: fingerprint
    };
  }
  function normalizeAutoGearBackupEntry(entry) {
    if (!entry || _typeof(entry) !== 'object') return null;
    var rawCreatedAt = typeof entry.createdAt === 'string' ? entry.createdAt : null;
    var timestamp = rawCreatedAt ? Date.parse(rawCreatedAt) : NaN;
    if (!Number.isFinite(timestamp)) return null;
    var createdAt = new Date(timestamp).toISOString();
    var rawRules = Array.isArray(entry.rules) ? entry.rules : [];
    var normalizedRules = rawRules.map(normalizeAutoGearRule).filter(Boolean);
    var rules = rawRules.length === 0 ? [] : normalizedRules;
    var id = typeof entry.id === 'string' && entry.id ? entry.id : generateAutoGearId('backup');
    var monitorDefaults = normalizeAutoGearMonitorDefaults(entry.monitorDefaults);
    var note = typeof entry.note === 'string' ? entry.note : '';
    return {
      id: id,
      createdAt: createdAt,
      rules: rules,
      monitorDefaults: monitorDefaults,
      note: note
    };
  }
  function readAutoGearBackupsFromStorage() {
    var retentionLimit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : AUTO_GEAR_BACKUP_RETENTION_DEFAULT;
    var stored = [];
    if (typeof loadAutoGearBackups === 'function') {
      try {
        stored = loadAutoGearBackups();
      } catch (error) {
        console.warn('Failed to load automatic gear backups', error);
        stored = [];
      }
    } else if (typeof localStorage !== 'undefined') {
      try {
        var raw = localStorage.getItem(AUTO_GEAR_BACKUPS_KEY);
        stored = raw ? JSON.parse(raw) : [];
      } catch (error) {
        console.warn('Failed to read automatic gear backups from storage', error);
        stored = [];
      }
    }
    if (!Array.isArray(stored)) return [];
    var limit = clampAutoGearBackupRetentionLimit(retentionLimit);
    return stored.map(normalizeAutoGearBackupEntry).filter(Boolean).sort(function (a, b) {
      if (a.createdAt === b.createdAt) return 0;
      return a.createdAt > b.createdAt ? -1 : 1;
    }).slice(0, limit);
  }
  function sortAutoGearPresets(list) {
    return list.sort(function (a, b) {
      return a.label.localeCompare(b.label, undefined, {
        sensitivity: 'base',
        numeric: true
      });
    });
  }
  function readAutoGearPresetsFromStorage() {
    var stored = [];
    if (typeof loadAutoGearPresets === 'function') {
      try {
        stored = loadAutoGearPresets();
      } catch (error) {
        console.warn('Failed to load automatic gear presets', error);
        stored = [];
      }
    } else if (typeof localStorage !== 'undefined') {
      try {
        var raw = localStorage.getItem(AUTO_GEAR_PRESETS_KEY);
        stored = raw ? JSON.parse(raw) : [];
      } catch (error) {
        console.warn('Failed to read automatic gear presets from storage', error);
        stored = [];
      }
    }
    if (!Array.isArray(stored)) return [];
    return sortAutoGearPresets(stored.map(normalizeAutoGearPreset).filter(Boolean));
  }
  function persistAutoGearPresets(presets) {
    var payload = Array.isArray(presets) ? presets.map(function (preset) {
      return {
        id: preset.id,
        label: preset.label,
        rules: Array.isArray(preset.rules) ? preset.rules : []
      };
    }) : [];
    if (typeof saveAutoGearPresets === 'function') {
      try {
        saveAutoGearPresets(payload);
        return;
      } catch (error) {
        console.warn('Failed to save automatic gear presets', error);
      }
    }
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(AUTO_GEAR_PRESETS_KEY, JSON.stringify(payload));
    } catch (error) {
      console.warn('Failed to persist automatic gear presets', error);
    }
  }
  var AUTO_GEAR_MONITOR_DEFAULT_TYPES = {
    focus: 'monitor',
    handheld7: 'monitor',
    combo15: 'directorMonitor',
    director15: 'directorMonitor'
  };
  var AUTO_GEAR_MONITOR_DEFAULT_LABEL_KEYS = {
    focus: 'autoGearDefaultFocusMonitorLabel',
    handheld7: 'autoGearDefaultHandheldMonitorLabel',
    combo15: 'autoGearDefaultComboMonitorLabel',
    director15: 'autoGearDefaultDirectorMonitorLabel'
  };
  function normalizeAutoGearMonitorDefaults(value) {
    var result = {
      focus: '',
      handheld7: '',
      combo15: '',
      director15: ''
    };
    if (!value || _typeof(value) !== 'object') {
      return result;
    }
    Object.keys(AUTO_GEAR_MONITOR_DEFAULT_TYPES).forEach(function (key) {
      var type = AUTO_GEAR_MONITOR_DEFAULT_TYPES[key];
      var normalized = normalizeAutoGearSelectorDefault(type, value[key]);
      result[key] = normalized;
    });
    return result;
  }
  function readAutoGearMonitorDefaultsFromStorage() {
    var stored = {};
    if (typeof loadAutoGearMonitorDefaults === 'function') {
      try {
        stored = loadAutoGearMonitorDefaults();
      } catch (error) {
        console.warn('Failed to load automatic gear monitor defaults', error);
        stored = {};
      }
    } else if (typeof localStorage !== 'undefined') {
      try {
        var raw = localStorage.getItem(AUTO_GEAR_MONITOR_DEFAULTS_KEY);
        stored = raw ? JSON.parse(raw) : {};
      } catch (error) {
        console.warn('Failed to read automatic gear monitor defaults from storage', error);
        stored = {};
      }
    }
    return normalizeAutoGearMonitorDefaults(stored);
  }
  function persistAutoGearMonitorDefaults(defaults) {
    var payload = normalizeAutoGearMonitorDefaults(defaults);
    if (typeof saveAutoGearMonitorDefaults === 'function') {
      try {
        saveAutoGearMonitorDefaults(payload);
        return payload;
      } catch (error) {
        console.warn('Failed to save automatic gear monitor defaults', error);
      }
    }
    if (typeof localStorage === 'undefined') {
      return payload;
    }
    try {
      localStorage.setItem(AUTO_GEAR_MONITOR_DEFAULTS_KEY, JSON.stringify(payload));
    } catch (error) {
      console.warn('Failed to persist automatic gear monitor defaults', error);
    }
    return payload;
  }
  function readActiveAutoGearPresetIdFromStorage() {
    if (typeof loadAutoGearActivePresetId === 'function') {
      try {
        var value = loadAutoGearActivePresetId();
        return typeof value === 'string' ? value : '';
      } catch (error) {
        console.warn('Failed to load automatic gear active preset id', error);
        return '';
      }
    }
    if (typeof localStorage === 'undefined') return '';
    try {
      var _value = localStorage.getItem(AUTO_GEAR_ACTIVE_PRESET_KEY);
      return typeof _value === 'string' ? _value : '';
    } catch (error) {
      console.warn('Failed to read automatic gear active preset id from storage', error);
      return '';
    }
  }
  function persistActiveAutoGearPresetId(presetId) {
    if (typeof saveAutoGearActivePresetId === 'function') {
      try {
        saveAutoGearActivePresetId(typeof presetId === 'string' ? presetId : '');
        return;
      } catch (error) {
        console.warn('Failed to save automatic gear active preset id', error);
      }
    }
    if (typeof localStorage === 'undefined') return;
    try {
      if (presetId) {
        localStorage.setItem(AUTO_GEAR_ACTIVE_PRESET_KEY, presetId);
      } else {
        localStorage.removeItem(AUTO_GEAR_ACTIVE_PRESET_KEY);
      }
    } catch (error) {
      console.warn('Failed to persist automatic gear active preset id', error);
    }
  }
  function readAutoGearAutoPresetIdFromStorage() {
    if (typeof loadAutoGearAutoPresetId === 'function') {
      try {
        var value = loadAutoGearAutoPresetId();
        return typeof value === 'string' ? value : '';
      } catch (error) {
        console.warn('Failed to load automatic gear auto preset id', error);
        return '';
      }
    }
    if (typeof localStorage === 'undefined') return '';
    try {
      var _value2 = localStorage.getItem(AUTO_GEAR_AUTO_PRESET_KEY);
      return typeof _value2 === 'string' ? _value2 : '';
    } catch (error) {
      console.warn('Failed to read automatic gear auto preset id from storage', error);
      return '';
    }
  }
  function persistAutoGearAutoPresetId(presetId) {
    if (typeof saveAutoGearAutoPresetId === 'function') {
      try {
        saveAutoGearAutoPresetId(typeof presetId === 'string' ? presetId : '');
        return;
      } catch (error) {
        console.warn('Failed to save automatic gear auto preset id', error);
      }
    }
    if (typeof localStorage === 'undefined') return;
    try {
      if (presetId) {
        localStorage.setItem(AUTO_GEAR_AUTO_PRESET_KEY, presetId);
      } else {
        localStorage.removeItem(AUTO_GEAR_AUTO_PRESET_KEY);
      }
    } catch (error) {
      console.warn('Failed to persist automatic gear auto preset id', error);
    }
  }
  function readAutoGearBackupVisibilityFromStorage() {
    if (typeof loadAutoGearBackupVisibility === 'function') {
      try {
        return !!loadAutoGearBackupVisibility();
      } catch (error) {
        console.warn('Failed to load automatic gear backup visibility', error);
        return false;
      }
    }
    if (typeof localStorage === 'undefined') return false;
    try {
      return localStorage.getItem(AUTO_GEAR_BACKUP_VISIBILITY_KEY) === '1';
    } catch (error) {
      console.warn('Failed to read automatic gear backup visibility from storage', error);
      return false;
    }
  }
  function persistAutoGearBackupVisibility(flag) {
    var enabled = !!flag;
    if (typeof saveAutoGearBackupVisibility === 'function') {
      try {
        saveAutoGearBackupVisibility(enabled);
        return;
      } catch (error) {
        console.warn('Failed to save automatic gear backup visibility', error);
      }
    }
    if (typeof localStorage === 'undefined') return;
    try {
      if (enabled) {
        localStorage.setItem(AUTO_GEAR_BACKUP_VISIBILITY_KEY, '1');
      } else {
        localStorage.removeItem(AUTO_GEAR_BACKUP_VISIBILITY_KEY);
      }
    } catch (error) {
      console.warn('Failed to persist automatic gear backup visibility', error);
    }
  }
  function clampAutoGearBackupRetentionLimit(value) {
    var numeric = Number(value);
    if (!Number.isFinite(numeric)) {
      return AUTO_GEAR_BACKUP_RETENTION_DEFAULT;
    }
    var rounded = Math.round(numeric);
    if (!Number.isFinite(rounded)) {
      return AUTO_GEAR_BACKUP_RETENTION_DEFAULT;
    }
    if (rounded < AUTO_GEAR_BACKUP_RETENTION_MIN_VALUE) {
      return AUTO_GEAR_BACKUP_RETENTION_MIN_VALUE;
    }
    if (rounded > AUTO_GEAR_BACKUP_RETENTION_MAX) {
      return AUTO_GEAR_BACKUP_RETENTION_MAX;
    }
    return rounded;
  }
  function readAutoGearBackupRetentionFromStorage() {
    if (typeof loadAutoGearBackupRetention === 'function') {
      try {
        return clampAutoGearBackupRetentionLimit(loadAutoGearBackupRetention());
      } catch (error) {
        console.warn('Failed to load automatic gear backup retention', error);
      }
    }
    if (typeof localStorage === 'undefined') {
      return AUTO_GEAR_BACKUP_RETENTION_DEFAULT;
    }
    try {
      var raw = localStorage.getItem(AUTO_GEAR_BACKUP_RETENTION_KEY);
      if (raw === null || raw === undefined) {
        return AUTO_GEAR_BACKUP_RETENTION_DEFAULT;
      }
      try {
        var parsed = JSON.parse(raw);
        return clampAutoGearBackupRetentionLimit(parsed);
      } catch (parseError) {
        var numeric = Number(raw);
        if (Number.isFinite(numeric)) {
          return clampAutoGearBackupRetentionLimit(numeric);
        }
        throw parseError;
      }
    } catch (error) {
      console.warn('Failed to read automatic gear backup retention from storage', error);
      return AUTO_GEAR_BACKUP_RETENTION_DEFAULT;
    }
  }
  function persistAutoGearBackupRetention(retention) {
    var normalized = clampAutoGearBackupRetentionLimit(retention);
    if (typeof saveAutoGearBackupRetention === 'function') {
      try {
        saveAutoGearBackupRetention(normalized);
        return true;
      } catch (error) {
        console.warn('Failed to save automatic gear backup retention', error);
      }
    }
    if (typeof localStorage === 'undefined') {
      return false;
    }
    try {
      localStorage.setItem(AUTO_GEAR_BACKUP_RETENTION_KEY, JSON.stringify(normalized));
      return true;
    } catch (error) {
      console.warn('Failed to persist automatic gear backup retention', error);
      return false;
    }
  }
  function persistAutoGearBackups(backups) {
    var payload = Array.isArray(backups) ? backups.map(function (entry) {
      return {
        id: entry.id,
        createdAt: entry.createdAt,
        rules: Array.isArray(entry.rules) ? entry.rules : [],
        monitorDefaults: normalizeAutoGearMonitorDefaults(entry.monitorDefaults),
        note: typeof entry.note === 'string' ? entry.note : undefined
      };
    }) : [];
    if (typeof saveAutoGearBackups === 'function') {
      var storedPayload = saveAutoGearBackups(payload);
      return Array.isArray(storedPayload) ? storedPayload : payload;
    }
    if (typeof localStorage === 'undefined') {
      throw new Error('Storage unavailable');
    }
    localStorage.setItem(AUTO_GEAR_BACKUPS_KEY, JSON.stringify(payload));
    return payload;
  }
  function enforceAutoGearBackupRetentionLimit(limit) {
    var normalized = clampAutoGearBackupRetentionLimit(limit);
    var previousLimit = autoGearBackupRetention;
    if (normalized === previousLimit) {
      callCoreFunctionIfAvailable('renderAutoGearBackupRetentionControls', [], {
        defer: true
      });
      return {
        success: true,
        trimmed: [],
        previousLimit: previousLimit
      };
    }
    var previousBackups = autoGearBackups.slice();
    var trimmedEntries = [];
    var retentionPersisted = persistAutoGearBackupRetention(normalized);
    if (!retentionPersisted) {
      autoGearBackupRetentionInput && (autoGearBackupRetentionInput.value = String(autoGearBackupRetention));
      callCoreFunctionIfAvailable('renderAutoGearBackupRetentionControls', [], {
        defer: true
      });
      return {
        success: false,
        error: new Error('retention-persist-failed'),
        previousLimit: previousLimit
      };
    }
    autoGearBackupRetention = normalized;
    if (autoGearBackups.length > normalized) {
      var updatedBackups = autoGearBackups.slice(0, normalized);
      trimmedEntries.push.apply(trimmedEntries, _toConsumableArray(autoGearBackups.slice(normalized)));
      try {
        var persistedBackups = persistAutoGearBackups(updatedBackups) || [];
        var finalBackups = Array.isArray(persistedBackups) ? persistedBackups : [];
        if (finalBackups.length < updatedBackups.length) {
          trimmedEntries.push.apply(trimmedEntries, _toConsumableArray(updatedBackups.slice(finalBackups.length)));
        }
        autoGearBackups = finalBackups;
      } catch (error) {
        console.warn('Failed to trim automatic gear backups to retention limit', error);
        autoGearBackupRetention = previousLimit;
        persistAutoGearBackupRetention(previousLimit);
        try {
          persistAutoGearBackups(previousBackups);
        } catch (restoreError) {
          console.warn('Failed to restore automatic gear backups after trim error', restoreError);
        }
        autoGearBackups = readAutoGearBackupsFromStorage(previousLimit);
        callCoreFunctionIfAvailable('renderAutoGearBackupControls', [], {
          defer: true
        });
        callCoreFunctionIfAvailable('renderAutoGearBackupRetentionControls', [], {
          defer: true
        });
        return {
          success: false,
          error: error,
          previousLimit: previousLimit
        };
      }
    }
    callCoreFunctionIfAvailable('renderAutoGearBackupControls', [], {
      defer: true
    });
    callCoreFunctionIfAvailable('renderAutoGearBackupRetentionControls', [], {
      defer: true
    });
    return {
      success: true,
      trimmed: trimmedEntries,
      previousLimit: previousLimit
    };
  }
  function readAutoGearRulesFromStorage() {
    var stored = [];
    if (typeof loadAutoGearRules !== 'undefined' && typeof loadAutoGearRules === 'function') {
      try {
        stored = loadAutoGearRules();
      } catch (error) {
        console.warn('Failed to load automatic gear rules', error);
        stored = [];
      }
    } else if (typeof localStorage !== 'undefined') {
      try {
        var raw = localStorage.getItem(AUTO_GEAR_RULES_KEY);
        stored = raw ? JSON.parse(raw) : [];
      } catch (error) {
        console.warn('Failed to load automatic gear rules', error);
        stored = [];
      }
    }
    if (!Array.isArray(stored)) return [];
    return stored.map(normalizeAutoGearRule).filter(Boolean);
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
    var fallbackTexts = getLanguageTexts(DEFAULT_LANGUAGE);
    var isEditing = (autoGearEditorActiveItem === null || autoGearEditorActiveItem === void 0 ? void 0 : autoGearEditorActiveItem.listType) === normalizedType;
    var defaultKey = normalizedType === 'remove' ? 'autoGearRemoveItemButton' : 'autoGearAddItemButton';
    var defaultLabel = langTexts[defaultKey] || fallbackTexts[defaultKey] || button.textContent || '';
    var updateLabel = langTexts.autoGearUpdateItemButton || fallbackTexts.autoGearUpdateItemButton || defaultLabel;
    var label = isEditing ? updateLabel : defaultLabel;
    var glyph = isEditing ? ICON_GLYPHS.save : normalizedType === 'remove' ? ICON_GLYPHS.minus : ICON_GLYPHS.add;
    setButtonLabelWithIcon(button, label, glyph);
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
    var _ref15 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref15$skipRender = _ref15.skipRender,
      skipRender = _ref15$skipRender === void 0 ? false : _ref15$skipRender,
      _ref15$skipRefresh = _ref15.skipRefresh,
      skipRefresh = _ref15$skipRefresh === void 0 ? false : _ref15$skipRefresh;
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
      Object.entries(obj).forEach(function (_ref16) {
        var _ref17 = _slicedToArray(_ref16, 2),
          key = _ref17[0],
          value = _ref17[1];
        if (!value || _typeof(value) !== 'object' || Array.isArray(value)) return;
        addName(key);
        _visit(value);
      });
    };
    if (_typeof(devices) === 'object' && devices) {
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
    var offlineHeight = offlineIndicator && offlineIndicator.style.display !== 'none' ? getElementHeight(offlineIndicator) : 0;
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
    var updateOnlineStatus = function updateOnlineStatus() {
      var isOnline = typeof navigator.onLine === 'boolean' ? navigator.onLine : true;
      offlineIndicator.style.display = isOnline ? 'none' : 'block';
      if (typeof updateInstallBannerPosition === 'function') {
        updateInstallBannerPosition();
      }
    };
    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
    }
    updateOnlineStatus();
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
    overlay.classList.add('hidden');
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
    overlay.classList.remove('hidden');
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
  var ownGearItems = [];
  var ownGearEditingId = null;
  var ownGearDialog = null;
  var ownGearForm = null;
  var ownGearListElem = null;
  var ownGearEmptyState = null;
  var ownGearListSummary = null;
  var ownGearNameInput = null;
  var ownGearQuantityInput = null;
  var ownGearNotesInput = null;
  var ownGearSaveButton = null;
  var ownGearResetButton = null;
  var ownGearCloseButton = null;
  var ownGearSuggestionsList = null;
  var ownGearAddHelp = null;
  var OWN_GEAR_SOURCE_CATALOG = 'catalog';
  var OWN_GEAR_SOURCE_CUSTOM = 'custom';
  var ownGearSuggestionCache = {
    lang: null,
    list: [],
    lookup: new Set()
  };
  var autoGearOwnGearCache = {
    items: [],
    map: new Map()
  };
  function invalidateAutoGearOwnGearCache() {
    autoGearOwnGearCache = {
      items: [],
      map: new Map()
    };
  }
  function refreshAutoGearOwnGearCache() {
    var items = [];
    var moduleApi = resolveOwnGearModule();
    if (moduleApi && typeof moduleApi.loadStoredOwnGearItems === 'function') {
      try {
        items = moduleApi.loadStoredOwnGearItems();
      } catch (error) {
        console.warn('Unable to load own gear items for automatic gear rules via module.', error);
      }
    }
    if (!Array.isArray(items) || !items.length) {
      if (Array.isArray(ownGearItems) && ownGearItems.length) {
        items = ownGearItems.slice();
      } else {
        items = loadStoredOwnGearItems();
      }
    }
    var normalized = Array.isArray(items) ? items.map(normalizeOwnGearRecord).filter(Boolean) : [];
    var map = new Map();
    normalized.forEach(function (item) {
      if (!item || !item.id) return;
      map.set(item.id, item);
    });
    autoGearOwnGearCache = {
      items: normalized,
      map: map
    };
    return autoGearOwnGearCache;
  }
  function getAutoGearOwnGearCache() {
    if (autoGearOwnGearCache && Array.isArray(autoGearOwnGearCache.items) && autoGearOwnGearCache.items.length) {
      return autoGearOwnGearCache;
    }
    return refreshAutoGearOwnGearCache();
  }
  function getAutoGearOwnGearItems() {
    return getAutoGearOwnGearCache().items.slice();
  }
  function findAutoGearOwnGearById(id) {
    if (!id) return null;
    var cache = getAutoGearOwnGearCache();
    return cache.map.get(id) || null;
  }
  function generateOwnGearId() {
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
    var moduleApi = resolveOwnGearModule();
    if (moduleApi && typeof moduleApi.persistOwnGearItems === 'function') {
      try {
        moduleApi.persistOwnGearItems(ownGearItems);
        return;
      } catch (error) {
        console.warn('Unable to persist own gear items via module.', error);
      }
    }
    if (typeof saveOwnGear !== 'function') {
      return;
    }
    try {
      var payload = ownGearItems.map(function (item) {
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
      saveOwnGear(payload);
      if (typeof document !== 'undefined') {
        try {
          document.dispatchEvent(new CustomEvent('own-gear-data-changed'));
        } catch (error) {
          void error;
        }
      }
    } catch (error) {
      console.warn('Failed to save own gear items', error);
    }
  }
  function invalidateOwnGearSuggestionCache() {
    ownGearSuggestionCache = {
      lang: null,
      list: [],
      lookup: new Set()
    };
  }
  function collectOwnGearSuggestionInfo() {
    var lang = typeof currentLang === 'string' ? currentLang : DEFAULT_LANGUAGE;
    if (ownGearSuggestionCache.lang === lang && ownGearSuggestionCache.list.length) {
      return ownGearSuggestionCache;
    }
    var uniqueNames = new Map();
    var addName = function addName(name) {
      if (typeof name !== 'string') {
        return;
      }
      var trimmed = name.trim();
      if (!trimmed) {
        return;
      }
      var key = trimmed.toLowerCase();
      if (uniqueNames.has(key)) {
        return;
      }
      uniqueNames.set(key, trimmed);
    };
    var _traverseDevices = function traverseDevices(value, seen) {
      if (!value) return;
      if (typeof value === 'string') {
        addName(value);
        return;
      }
      if (_typeof(value) !== 'object') {
        return;
      }
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
      if (typeof value.name === 'string') {
        addName(value.name);
      }
      if (typeof value.label === 'string') {
        addName(value.label);
      }
      if (typeof value.brand === 'string' && typeof value.model === 'string') {
        addName("".concat(value.brand, " ").concat(value.model));
      }
      if (Array.isArray(value)) {
        value.forEach(function (entry) {
          return _traverseDevices(entry, seen);
        });
        return;
      }
      Object.keys(value).forEach(function (key) {
        if (key === 'name' || key === 'label' || key === 'brand' || key === 'model') {
          return;
        }
        _traverseDevices(value[key], seen);
      });
    };
    try {
      if (_typeof(devices) === 'object' && devices) {
        _traverseDevices(devices, new WeakSet());
      }
    } catch (error) {
      console.warn('Unable to collect device catalog names for own gear suggestions', error);
    }
    try {
      var langItems = gearItemTranslations && _typeof(gearItemTranslations) === 'object' ? gearItemTranslations[lang] || gearItemTranslations[DEFAULT_LANGUAGE] || null : null;
      if (langItems && _typeof(langItems) === 'object') {
        Object.keys(langItems).forEach(function (key) {
          addName(key);
          var translated = langItems[key];
          if (typeof translated === 'string') {
            addName(translated);
          }
        });
      }
    } catch (error) {
      console.warn('Unable to include custom gear translations in suggestions', error);
    }
    ownGearItems.forEach(function (item) {
      if (item && typeof item.name === 'string') {
        addName(item.name);
      }
    });
    var collator = typeof Intl !== 'undefined' && typeof Intl.Collator === 'function' ? new Intl.Collator(lang || DEFAULT_LANGUAGE, {
      sensitivity: 'base'
    }) : null;
    var list = Array.from(uniqueNames.values()).sort(function (a, b) {
      if (collator) {
        try {
          return collator.compare(a, b);
        } catch (error) {
          void error;
        }
      }
      return a.localeCompare(b);
    });
    var lookup = new Set(uniqueNames.keys());
    ownGearSuggestionCache = {
      lang: lang,
      list: list,
      lookup: lookup
    };
    return ownGearSuggestionCache;
  }
  function refreshOwnGearSuggestions() {
    if (!ownGearSuggestionsList) {
      return;
    }
    var _collectOwnGearSugges = collectOwnGearSuggestionInfo(),
      list = _collectOwnGearSugges.list;
    ownGearSuggestionsList.innerHTML = '';
    var fragment = document.createDocumentFragment();
    list.forEach(function (name) {
      var option = document.createElement('option');
      option.value = name;
      fragment.appendChild(option);
    });
    ownGearSuggestionsList.appendChild(fragment);
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
  function formatOwnGearCountText(count, langTexts) {
    var fallbackTexts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getLanguageTexts(DEFAULT_LANGUAGE);
    var templateKey = count === 1 ? 'ownGearListSummaryOne' : 'ownGearListSummaryOther';
    var template = langTexts && langTexts[templateKey] || fallbackTexts && fallbackTexts[templateKey] || '';
    if (!template) {
      return count > 0 ? String(count) : '';
    }
    if (template.includes('%s')) {
      return formatWithPlaceholdersSafe(template, String(count));
    }
    return "".concat(template, " ").concat(count).trim();
  }
  function updateOwnGearSummary() {
    if (!ownGearListSummary) {
      return;
    }
    var langTexts = getLanguageTexts(currentLang);
    var summary = formatOwnGearCountText(ownGearItems.length, langTexts);
    if (summary) {
      ownGearListSummary.textContent = summary;
      ownGearListSummary.removeAttribute('hidden');
    } else {
      ownGearListSummary.textContent = '';
      ownGearListSummary.setAttribute('hidden', '');
    }
  }
  function createOwnGearActionButton(label, icon, onClick) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var button = document.createElement('button');
    button.type = 'button';
    button.className = options.className || 'own-gear-item-action';
    var iconHtml = typeof iconMarkup === 'function' && icon ? iconMarkup(icon, 'btn-icon') : '';
    button.innerHTML = "".concat(iconHtml).concat(escapeHtml(label));
    button.setAttribute('aria-label', options.ariaLabel || label);
    button.addEventListener('click', onClick);
    return button;
  }
  var ICON_FONT_KEYS = Object.freeze({
    ESSENTIAL: 'essential',
    FILM: 'film',
    GADGET: 'gadget',
    UICONS: 'uicons',
    TEXT: 'text'
  });
  var VALID_ICON_FONTS = new Set(Object.values(ICON_FONT_KEYS));
  function toCodePointChar(value, radix) {
    var codePoint = parseInt(value, radix);
    if (!Number.isFinite(codePoint) || codePoint < 0) {
      return null;
    }
    try {
      if (typeof String.fromCodePoint === 'function') {
        return String.fromCodePoint(codePoint);
      }
    } catch (rangeError) {
      void rangeError;
    }
    if (codePoint <= 0xffff) {
      return String.fromCharCode(codePoint);
    }
    return null;
  }
  function normalizeGlyphChar(char) {
    if (typeof char !== 'string') {
      return '';
    }
    var trimmed = char.trim();
    if (!trimmed) {
      return '';
    }
    var unicodeMatch = trimmed.match(/^(?:\\)+u([0-9A-Fa-f]{4})$/);
    if (unicodeMatch) {
      var decoded = toCodePointChar(unicodeMatch[1], 16);
      if (decoded) {
        return decoded;
      }
    }
    var unicodeBraceMatch = trimmed.match(/^(?:\\)+u\{([0-9A-Fa-f]+)\}$/);
    if (unicodeBraceMatch) {
      var _decoded = toCodePointChar(unicodeBraceMatch[1], 16);
      if (_decoded) {
        return _decoded;
      }
    }
    var hexEntityMatch = trimmed.match(/^&#x([0-9A-Fa-f]+);$/i);
    if (hexEntityMatch) {
      var _decoded2 = toCodePointChar(hexEntityMatch[1], 16);
      if (_decoded2) {
        return _decoded2;
      }
    }
    var decimalEntityMatch = trimmed.match(/^&#(\d+);$/);
    if (decimalEntityMatch) {
      var _decoded3 = toCodePointChar(decimalEntityMatch[1], 10);
      if (_decoded3) {
        return _decoded3;
      }
    }
    return trimmed;
  }
  function iconGlyph(char) {
    var font = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ICON_FONT_KEYS.UICONS;
    var normalizedFont = VALID_ICON_FONTS.has(font) ? font : ICON_FONT_KEYS.UICONS;
    var normalizedChar = normalizeGlyphChar(char);
    return Object.freeze({
      char: normalizedChar,
      font: normalizedFont
    });
  }
  function resolveIconGlyph(glyph) {
    if (!glyph) {
      return {
        char: '',
        font: ICON_FONT_KEYS.UICONS,
        className: '',
        size: undefined
      };
    }
    if (glyph.markup) {
      var size = Number.isFinite(glyph.size) ? glyph.size : undefined;
      return {
        markup: glyph.markup,
        className: glyph.className || '',
        font: ICON_FONT_KEYS.UICONS,
        size: size
      };
    }
    if (typeof glyph === 'string') {
      return {
        char: normalizeGlyphChar(glyph),
        font: ICON_FONT_KEYS.UICONS,
        className: '',
        size: undefined
      };
    }
    if (_typeof(glyph) === 'object') {
      var char = typeof glyph.char === 'string' ? normalizeGlyphChar(glyph.char) : '';
      var fontKey = glyph.font && VALID_ICON_FONTS.has(glyph.font) ? glyph.font : ICON_FONT_KEYS.UICONS;
      var className = typeof glyph.className === 'string' ? glyph.className : '';
      var _size = Number.isFinite(glyph.size) ? glyph.size : undefined;
      if (glyph.markup) {
        return {
          markup: glyph.markup,
          className: className,
          font: fontKey,
          size: _size
        };
      }
      return {
        char: char,
        font: fontKey,
        className: className,
        size: _size
      };
    }
    return {
      char: '',
      font: ICON_FONT_KEYS.UICONS,
      className: '',
      size: undefined
    };
  }
  function applyIconGlyph(element, glyph) {
    if (!element) return;
    var resolved = resolveIconGlyph(glyph);
    if (resolved.markup) {
      element.innerHTML = ensureSvgHasAriaHidden(resolved.markup);
      element.setAttribute('aria-hidden', 'true');
      if (resolved.className) {
        resolved.className.split(/\s+/).filter(Boolean).forEach(function (cls) {
          return element.classList.add(cls);
        });
      }
      element.removeAttribute('data-icon-font');
      return;
    }
    var char = resolved.char || '';
    element.textContent = char;
    if (char) {
      element.setAttribute('data-icon-font', resolved.font);
    } else {
      element.removeAttribute('data-icon-font');
    }
  }
  function formatSvgCoordinate(value) {
    if (!Number.isFinite(value)) return '0';
    var rounded = Math.round(value * 100) / 100;
    if (Number.isInteger(rounded)) return String(rounded);
    return rounded.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
  }
  function positionSvgMarkup(markup, centerX, centerY) {
    var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 24;
    if (typeof markup !== 'string') {
      return {
        markup: '',
        x: '0',
        y: '0'
      };
    }
    var trimmed = markup.trim();
    if (!trimmed) {
      return {
        markup: '',
        x: '0',
        y: '0'
      };
    }
    var half = size / 2;
    var x = formatSvgCoordinate(centerX);
    var y = formatSvgCoordinate(centerY);
    var width = formatSvgCoordinate(size);
    var height = formatSvgCoordinate(size);
    var cleaned = trimmed.replace(/<svg\b([^>]*)>/i, function (match) {
      var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var attrText = attrs.replace(/\s+x\s*=\s*"[^"]*"/gi, '').replace(/\s+y\s*=\s*"[^"]*"/gi, '').trim();
      var additions = [];
      var hasWidth = /(?:^|\s)width\s*=/i.test(attrText);
      var hasHeight = /(?:^|\s)height\s*=/i.test(attrText);
      if (!hasWidth) additions.push("width=\"".concat(width, "\""));
      if (!hasHeight) additions.push("height=\"".concat(height, "\""));
      additions.push("x=\"-".concat(formatSvgCoordinate(half), "\""));
      additions.push("y=\"-".concat(formatSvgCoordinate(half), "\""));
      attrText = [attrText].concat(additions).filter(Boolean).join(' ').trim();
      return attrText ? "<svg ".concat(attrText, ">") : '<svg>';
    });
    return {
      markup: cleaned,
      x: x,
      y: y
    };
  }
  function glyphText(glyph) {
    var resolved = resolveIconGlyph(glyph);
    return resolved.char || '';
  }
  var PRODUCTION_COMPANY_ICON = iconGlyph("\\uE2D5", ICON_FONT_KEYS.UICONS);
  var RENTAL_HOUSE_ICON = iconGlyph("\\uEA09", ICON_FONT_KEYS.UICONS);
  var ASPECT_RATIO_ICON = iconGlyph("\\uE86E", ICON_FONT_KEYS.UICONS);
  var REQUIRED_SCENARIOS_ICON = iconGlyph("\\uF4D4", ICON_FONT_KEYS.UICONS);
  var MONITORING_SUPPORT_ICON = iconGlyph("\\uEFFC", ICON_FONT_KEYS.UICONS);
  var STAR_ICON_SVG = "\n  <svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path\n      d=\"M12 17.25 6.545 20.2 7.9 13.975 3 9.45l6.272-.7L12 3l2.728 5.75L21 9.45l-4.9 4.525 1.355 6.225Z\"\n      fill=\"currentColor\"\n      stroke=\"currentColor\"\n      stroke-width=\"0\"\n    />\n  </svg>\n".trim();
  var ICON_GLYPHS = Object.freeze({
    batteryBolt: iconGlyph("\\uE1A6", ICON_FONT_KEYS.UICONS),
    batteryFull: iconGlyph("\\uE1A9", ICON_FONT_KEYS.UICONS),
    bolt: iconGlyph("\\uF1F8", ICON_FONT_KEYS.ESSENTIAL),
    plug: iconGlyph("\\uEE75", ICON_FONT_KEYS.UICONS),
    sliders: iconGlyph("\\uF143", ICON_FONT_KEYS.ESSENTIAL),
    screen: iconGlyph("\\uF11D", ICON_FONT_KEYS.GADGET),
    brightness: iconGlyph("\\uE2B3", ICON_FONT_KEYS.UICONS),
    wifi: iconGlyph("\\uF4AC", ICON_FONT_KEYS.UICONS),
    gears: iconGlyph("\\uE8AF", ICON_FONT_KEYS.UICONS),
    controller: iconGlyph("\\uF117", ICON_FONT_KEYS.GADGET),
    distance: iconGlyph("\\uEFB9", ICON_FONT_KEYS.UICONS),
    sensor: iconGlyph("\\uEC2B", ICON_FONT_KEYS.UICONS),
    viewfinder: iconGlyph("\\uF114", ICON_FONT_KEYS.FILM),
    camera: iconGlyph("\\uE333", ICON_FONT_KEYS.UICONS),
    trash: iconGlyph("\\uF254", ICON_FONT_KEYS.ESSENTIAL),
    reload: iconGlyph("\\uF202", ICON_FONT_KEYS.ESSENTIAL),
    load: iconGlyph("\\uE0E0", ICON_FONT_KEYS.UICONS),
    installApp: iconGlyph("\\uE9D4", ICON_FONT_KEYS.UICONS),
    add: Object.freeze({
      char: '+',
      font: ICON_FONT_KEYS.TEXT,
      className: 'icon-text'
    }),
    minus: Object.freeze({
      char: '−',
      font: ICON_FONT_KEYS.TEXT,
      className: 'icon-text'
    }),
    arrowLeft: Object.freeze({
      char: '←',
      font: ICON_FONT_KEYS.TEXT,
      className: 'icon-text'
    }),
    check: iconGlyph("\\uE3D8", ICON_FONT_KEYS.UICONS),
    fileExport: iconGlyph("\\uE7AB", ICON_FONT_KEYS.UICONS),
    fileImport: iconGlyph("\\uE7C7", ICON_FONT_KEYS.UICONS),
    save: iconGlyph("\\uF207", ICON_FONT_KEYS.ESSENTIAL),
    share: iconGlyph("\\uF219", ICON_FONT_KEYS.ESSENTIAL),
    paperPlane: iconGlyph("\\uED67", ICON_FONT_KEYS.UICONS),
    magnet: iconGlyph("\\uF1B5", ICON_FONT_KEYS.ESSENTIAL),
    codec: iconGlyph("\\uE4CD", ICON_FONT_KEYS.UICONS),
    timecode: iconGlyph("\\uF10E", ICON_FONT_KEYS.FILM),
    audioIn: iconGlyph("\\uF1C3", ICON_FONT_KEYS.ESSENTIAL),
    audioOut: iconGlyph("\\uF22F", ICON_FONT_KEYS.ESSENTIAL),
    note: iconGlyph("\\uF13E", ICON_FONT_KEYS.ESSENTIAL),
    overview: iconGlyph("\\uF1F5", ICON_FONT_KEYS.UICONS),
    gearList: iconGlyph("\\uE467", ICON_FONT_KEYS.UICONS),
    contacts: iconGlyph("\\uF404", ICON_FONT_KEYS.UICONS),
    feedback: iconGlyph("\\uE791", ICON_FONT_KEYS.UICONS),
    resetView: iconGlyph("\\uEB6D", ICON_FONT_KEYS.UICONS),
    pin: iconGlyph("\\uF1EF", ICON_FONT_KEYS.ESSENTIAL),
    sun: iconGlyph("\\uF1FE", ICON_FONT_KEYS.UICONS),
    moon: iconGlyph("\\uEC7E", ICON_FONT_KEYS.UICONS),
    circleX: iconGlyph("\\uF131", ICON_FONT_KEYS.ESSENTIAL),
    settingsGeneral: iconGlyph("\\uE5A3", ICON_FONT_KEYS.UICONS),
    settingsAutoGear: iconGlyph("\\uE8AF", ICON_FONT_KEYS.UICONS),
    settingsAccessibility: iconGlyph("\\uF392", ICON_FONT_KEYS.UICONS),
    settingsBackup: iconGlyph("\\uE5BD", ICON_FONT_KEYS.UICONS),
    settingsData: iconGlyph("\\uE5C7", ICON_FONT_KEYS.UICONS),
    settingsAbout: iconGlyph("\\uEA4F", ICON_FONT_KEYS.UICONS),
    star: Object.freeze({
      markup: STAR_ICON_SVG,
      className: 'icon-svg favorite-star-icon'
    }),
    warning: iconGlyph("\\uF26F", ICON_FONT_KEYS.ESSENTIAL)
  });
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
      if (resolved.className) classes.push(resolved.className);
      var markup = ensureSvgHasAriaHidden(resolved.markup);
      return "<span class=\"".concat(classes.join(' '), "\"").concat(styleAttr, " aria-hidden=\"true\">").concat(markup, "</span>");
    }
    var char = resolved.char || '';
    if (!char) return '';
    return "<span class=\"".concat(classes.join(' '), "\"").concat(styleAttr, " data-icon-font=\"").concat(resolved.font, "\" aria-hidden=\"true\">").concat(char, "</span>");
  }
  function renderOwnGearList() {
    if (!ownGearListElem) {
      return;
    }
    ownGearListElem.innerHTML = '';
    var langTexts = getLanguageTexts(currentLang);
    if (!ownGearItems.length) {
      if (ownGearEmptyState) {
        ownGearEmptyState.removeAttribute('hidden');
      }
      updateOwnGearSummary();
      return;
    }
    if (ownGearEmptyState) {
      ownGearEmptyState.setAttribute('hidden', '');
    }
    var fragment = document.createDocumentFragment();
    ownGearItems.forEach(function (item) {
      if (!item || typeof item.id !== 'string') {
        return;
      }
      var listItem = document.createElement('li');
      listItem.className = 'own-gear-item';
      listItem.dataset.ownGearId = item.id;
      var body = document.createElement('div');
      body.className = 'own-gear-item-body';
      var title = document.createElement('p');
      title.className = 'own-gear-item-title';
      var quantityText = formatOwnGearQuantityText(item.quantity || '');
      title.textContent = quantityText ? "".concat(quantityText, " \xD7 ").concat(item.name) : item.name;
      body.appendChild(title);
      if (item.notes) {
        var note = document.createElement('p');
        note.className = 'own-gear-item-note';
        note.textContent = item.notes;
        body.appendChild(note);
      }
      listItem.appendChild(body);
      var actions = document.createElement('div');
      actions.className = 'own-gear-item-actions';
      var editLabel = langTexts.ownGearEditButton || 'Edit';
      var editAria = langTexts.ownGearEditButtonAria ? formatWithPlaceholdersSafe(langTexts.ownGearEditButtonAria, item.name) : editLabel;
      var editButton = createOwnGearActionButton(editLabel, ICON_GLYPHS.sliders, function () {
        startEditingOwnGearItem(item.id);
      }, {
        ariaLabel: editAria
      });
      actions.appendChild(editButton);
      var deleteLabel = langTexts.ownGearDeleteButton || 'Remove';
      var deleteAria = langTexts.ownGearDeleteButtonAria ? formatWithPlaceholdersSafe(langTexts.ownGearDeleteButtonAria, item.name) : deleteLabel;
      var deleteButton = createOwnGearActionButton(deleteLabel, ICON_GLYPHS.trash, function () {
        removeOwnGearItem(item.id);
      }, {
        ariaLabel: deleteAria,
        className: 'own-gear-item-action own-gear-item-action-danger'
      });
      actions.appendChild(deleteButton);
      listItem.appendChild(actions);
      fragment.appendChild(listItem);
    });
    ownGearListElem.appendChild(fragment);
    updateOwnGearSummary();
  }
  function resetOwnGearForm() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (ownGearNameInput) {
      ownGearNameInput.value = '';
      ownGearNameInput.setCustomValidity('');
    }
    if (ownGearQuantityInput) {
      ownGearQuantityInput.value = '';
      ownGearQuantityInput.setCustomValidity('');
    }
    if (ownGearNotesInput) {
      ownGearNotesInput.value = '';
    }
    ownGearEditingId = null;
    updateOwnGearSaveButtonState();
    if (options.focusName && ownGearNameInput && typeof ownGearNameInput.focus === 'function') {
      ownGearNameInput.focus();
    }
  }
  function updateOwnGearSaveButtonState() {
    if (!ownGearSaveButton) {
      return;
    }
    var langTexts = getLanguageTexts(currentLang);
    var fallbackTexts = getLanguageTexts(DEFAULT_LANGUAGE);
    if (ownGearEditingId) {
      var label = langTexts.ownGearUpdateButton || fallbackTexts.ownGearUpdateButton || 'Update item';
      setButtonLabelWithIcon(ownGearSaveButton, label, ICON_GLYPHS.save);
    } else {
      var _label = langTexts.ownGearSaveButton || fallbackTexts.ownGearSaveButton || 'Save item';
      setButtonLabelWithIcon(ownGearSaveButton, _label, ICON_GLYPHS.add);
    }
  }
  function normalizeOwnGearQuantityInput(raw) {
    if (typeof raw !== 'string') {
      return {
        value: '',
        valid: true
      };
    }
    var trimmed = raw.trim();
    if (!trimmed) {
      return {
        value: '',
        valid: true
      };
    }
    var normalized = trimmed.replace(',', '.');
    var parsed = Number(normalized);
    if (!Number.isFinite(parsed) || parsed < 0) {
      return {
        value: '',
        valid: false
      };
    }
    var formatted = formatOwnGearQuantityText(String(parsed));
    return {
      value: formatted,
      valid: true
    };
  }
  function handleOwnGearSubmit(event) {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    if (!ownGearNameInput) {
      return;
    }
    var langTexts = getLanguageTexts(currentLang);
    var fallbackTexts = getLanguageTexts(DEFAULT_LANGUAGE);
    var rawName = ownGearNameInput.value || '';
    var trimmedName = rawName.trim();
    if (!trimmedName) {
      var message = langTexts.ownGearNameRequired || fallbackTexts.ownGearNameRequired || 'Enter an item name to continue.';
      ownGearNameInput.setCustomValidity(message);
      ownGearNameInput.reportValidity();
      return;
    }
    ownGearNameInput.setCustomValidity('');
    var quantityResult = normalizeOwnGearQuantityInput(ownGearQuantityInput ? ownGearQuantityInput.value : '');
    if (!quantityResult.valid) {
      if (ownGearQuantityInput) {
        var _message = langTexts.ownGearQuantityInvalid || fallbackTexts.ownGearQuantityInvalid || 'Enter a non-negative quantity.';
        ownGearQuantityInput.setCustomValidity(_message);
        ownGearQuantityInput.reportValidity();
      }
      return;
    }
    if (ownGearQuantityInput) {
      ownGearQuantityInput.setCustomValidity('');
      ownGearQuantityInput.value = quantityResult.value;
    }
    var notes = ownGearNotesInput ? ownGearNotesInput.value.trim() : '';
    var _collectOwnGearSugges2 = collectOwnGearSuggestionInfo(),
      lookup = _collectOwnGearSugges2.lookup;
    var fromCatalog = lookup.has(trimmedName.toLowerCase());
    var source = fromCatalog ? OWN_GEAR_SOURCE_CATALOG : OWN_GEAR_SOURCE_CUSTOM;
    if (ownGearEditingId) {
      var index = ownGearItems.findIndex(function (item) {
        return item && item.id === ownGearEditingId;
      });
      if (index !== -1) {
        var updated = _objectSpread(_objectSpread({}, ownGearItems[index]), {}, {
          name: trimmedName,
          source: source
        });
        if (quantityResult.value) {
          updated.quantity = quantityResult.value;
        } else {
          delete updated.quantity;
        }
        if (notes) {
          updated.notes = notes;
        } else {
          delete updated.notes;
        }
        ownGearItems[index] = updated;
      }
    } else {
      var entry = {
        id: generateOwnGearId(),
        name: trimmedName,
        source: source
      };
      if (quantityResult.value) {
        entry.quantity = quantityResult.value;
      }
      if (notes) {
        entry.notes = notes;
      }
      ownGearItems.push(entry);
    }
    persistOwnGearItems();
    invalidateOwnGearSuggestionCache();
    renderOwnGearList();
    refreshOwnGearSuggestions();
    resetOwnGearForm({
      focusName: true
    });
  }
  function startEditingOwnGearItem(id) {
    var item = ownGearItems.find(function (entry) {
      return entry && entry.id === id;
    });
    if (!item) {
      return;
    }
    ownGearEditingId = id;
    if (ownGearNameInput) {
      ownGearNameInput.value = item.name;
      ownGearNameInput.setCustomValidity('');
    }
    if (ownGearQuantityInput) {
      ownGearQuantityInput.value = item.quantity || '';
      ownGearQuantityInput.setCustomValidity('');
    }
    if (ownGearNotesInput) {
      ownGearNotesInput.value = item.notes || '';
    }
    updateOwnGearSaveButtonState();
    if (ownGearNameInput && typeof ownGearNameInput.focus === 'function') {
      ownGearNameInput.focus();
    }
  }
  function removeOwnGearItem(id) {
    var index = ownGearItems.findIndex(function (entry) {
      return entry && entry.id === id;
    });
    if (index === -1) {
      return;
    }
    var item = ownGearItems[index];
    var langTexts = getLanguageTexts(currentLang);
    var confirmTemplate = langTexts.ownGearDeleteConfirm || 'Remove “%s” from your gear list?';
    var confirmMessage = confirmTemplate;
    if (confirmTemplate.includes('%s')) {
      confirmMessage = formatWithPlaceholdersSafe(confirmTemplate, item.name);
    }
    var confirmed = true;
    if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
      confirmed = window.confirm(confirmMessage);
    }
    if (!confirmed) {
      return;
    }
    ownGearItems.splice(index, 1);
    if (ownGearEditingId === id) {
      resetOwnGearForm();
    }
    persistOwnGearItems();
    invalidateOwnGearSuggestionCache();
    renderOwnGearList();
    refreshOwnGearSuggestions();
  }
  function openOwnGearDialog() {
    if (!ownGearDialog) {
      return;
    }
    resetOwnGearForm();
    refreshOwnGearSuggestions();
    openDialog(ownGearDialog);
    if (ownGearNameInput && typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(function () {
        if (typeof ownGearNameInput.focus === 'function') {
          ownGearNameInput.focus();
        }
      });
    }
  }
  function applyOwnGearLocalization(lang) {
    var langTexts = getLanguageTexts(lang);
    var fallbackTexts = getLanguageTexts(DEFAULT_LANGUAGE);
    if (ownGearDialog) {
      var title = document.getElementById('ownGearDialogHeading');
      if (title) {
        title.textContent = resolveTextEntry(langTexts, fallbackTexts, 'ownGearDialogTitle', 'Own gear');
      }
      var description = document.getElementById('ownGearDialogDescription');
      if (description) {
        var text = resolveTextEntry(langTexts, fallbackTexts, 'ownGearDialogDescription', '');
        description.textContent = text;
        if (text) {
          description.setAttribute('data-help', text);
        } else {
          description.removeAttribute('data-help');
        }
      }
    }
    var addHeading = document.getElementById('ownGearAddHeading');
    if (addHeading) {
      addHeading.textContent = resolveTextEntry(langTexts, fallbackTexts, 'ownGearAddHeading', 'Add gear');
    }
    if (ownGearAddHelp) {
      var helpText = resolveTextEntry(langTexts, fallbackTexts, 'ownGearAddHelp', '');
      ownGearAddHelp.textContent = helpText;
      if (helpText) {
        ownGearAddHelp.removeAttribute('hidden');
        ownGearAddHelp.setAttribute('data-help', helpText);
      } else {
        ownGearAddHelp.setAttribute('hidden', '');
        ownGearAddHelp.removeAttribute('data-help');
      }
    }
    var nameLabel = document.getElementById('ownGearNameLabel');
    if (nameLabel) {
      nameLabel.textContent = resolveTextEntry(langTexts, fallbackTexts, 'ownGearNameLabel', 'Item');
    }
    if (ownGearNameInput) {
      var placeholder = resolveTextEntry(langTexts, fallbackTexts, 'ownGearNamePlaceholder', '');
      if (placeholder) {
        ownGearNameInput.setAttribute('placeholder', placeholder);
      } else {
        ownGearNameInput.removeAttribute('placeholder');
      }
      var _helpText = resolveTextEntry(langTexts, fallbackTexts, 'ownGearNameHelp', '');
      if (_helpText) {
        ownGearNameInput.setAttribute('data-help', _helpText);
      } else {
        ownGearNameInput.removeAttribute('data-help');
      }
    }
    var quantityLabel = document.getElementById('ownGearQuantityLabel');
    if (quantityLabel) {
      quantityLabel.textContent = resolveTextEntry(langTexts, fallbackTexts, 'ownGearQuantityLabel', 'Quantity');
    }
    if (ownGearQuantityInput) {
      var _placeholder = resolveTextEntry(langTexts, fallbackTexts, 'ownGearQuantityPlaceholder', '');
      if (_placeholder) {
        ownGearQuantityInput.setAttribute('placeholder', _placeholder);
      } else {
        ownGearQuantityInput.removeAttribute('placeholder');
      }
      var _helpText2 = resolveTextEntry(langTexts, fallbackTexts, 'ownGearQuantityHelp', '');
      if (_helpText2) {
        ownGearQuantityInput.setAttribute('data-help', _helpText2);
      } else {
        ownGearQuantityInput.removeAttribute('data-help');
      }
    }
    var notesLabel = document.getElementById('ownGearNotesLabel');
    if (notesLabel) {
      notesLabel.textContent = resolveTextEntry(langTexts, fallbackTexts, 'ownGearNotesLabel', 'Notes');
    }
    if (ownGearNotesInput) {
      var _placeholder2 = resolveTextEntry(langTexts, fallbackTexts, 'ownGearNotesPlaceholder', '');
      if (_placeholder2) {
        ownGearNotesInput.setAttribute('placeholder', _placeholder2);
      } else {
        ownGearNotesInput.removeAttribute('placeholder');
      }
      var _helpText3 = resolveTextEntry(langTexts, fallbackTexts, 'ownGearNotesHelp', '');
      if (_helpText3) {
        ownGearNotesInput.setAttribute('data-help', _helpText3);
      } else {
        ownGearNotesInput.removeAttribute('data-help');
      }
    }
    if (ownGearResetButton) {
      var label = resolveTextEntry(langTexts, fallbackTexts, 'ownGearResetButton', 'Reset');
      setButtonLabelWithIcon(ownGearResetButton, label, ICON_GLYPHS.reload);
    }
    if (ownGearCloseButton) {
      var _label2 = resolveTextEntry(langTexts, fallbackTexts, 'ownGearCloseButton', 'Close');
      setButtonLabelWithIcon(ownGearCloseButton, _label2, ICON_GLYPHS.circleX);
    }
    var listHeading = document.getElementById('ownGearListHeading');
    if (listHeading) {
      listHeading.textContent = resolveTextEntry(langTexts, fallbackTexts, 'ownGearListHeading', 'Your gear');
    }
    if (ownGearEmptyState) {
      ownGearEmptyState.textContent = resolveTextEntry(langTexts, fallbackTexts, 'ownGearListEmpty', 'No gear saved yet.');
    }
    updateOwnGearSaveButtonState();
    renderOwnGearList();
    refreshOwnGearSuggestions();
  }
  function initializeOwnGearManager() {
    if (typeof document === 'undefined') {
      return;
    }
    ownGearDialog = document.getElementById('ownGearDialog');
    if (!ownGearDialog) {
      return;
    }
    ownGearForm = document.getElementById('ownGearForm');
    ownGearListElem = document.getElementById('ownGearList');
    ownGearEmptyState = document.getElementById('ownGearEmptyState');
    ownGearListSummary = document.getElementById('ownGearListSummary');
    ownGearNameInput = document.getElementById('ownGearName');
    ownGearQuantityInput = document.getElementById('ownGearQuantity');
    ownGearNotesInput = document.getElementById('ownGearNotes');
    ownGearSaveButton = document.getElementById('ownGearSaveButton');
    ownGearResetButton = document.getElementById('ownGearResetButton');
    ownGearCloseButton = document.getElementById('ownGearCloseButton');
    ownGearSuggestionsList = document.getElementById('ownGearSuggestions');
    ownGearAddHelp = document.getElementById('ownGearAddHelp');
    ownGearItems = loadStoredOwnGearItems();
    applyOwnGearLocalization(currentLang);
    if (ownGearForm) {
      ownGearForm.addEventListener('submit', handleOwnGearSubmit);
    }
    if (ownGearResetButton) {
      ownGearResetButton.addEventListener('click', function () {
        resetOwnGearForm({
          focusName: true
        });
      });
    }
    if (ownGearCloseButton) {
      ownGearCloseButton.addEventListener('click', function () {
        closeDialog(ownGearDialog);
        resetOwnGearForm();
      });
    }
    if (ownGearDialog && typeof ownGearDialog.addEventListener === 'function') {
      ownGearDialog.addEventListener('cancel', function (event) {
        if (event && typeof event.preventDefault === 'function') {
          event.preventDefault();
        }
        closeDialog(ownGearDialog);
        resetOwnGearForm();
      });
      ownGearDialog.addEventListener('close', function () {
        resetOwnGearForm();
      });
    }
    try {
      exposeCoreRuntimeConstant('openOwnGearDialog', openOwnGearDialog);
    } catch (error) {
      void error;
      if (typeof globalThis !== 'undefined') {
        globalThis.openOwnGearDialog = openOwnGearDialog;
      }
    }
  }
  function initializeLayoutControls() {
    setupSideMenu();
    setupResponsiveControls();
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
    scheduleLayoutInitialization();
  }
  var escapeDiv;
  function escapeHtml(str) {
    if (!escapeDiv && typeof globalThis !== 'undefined' && globalThis.document) {
      escapeDiv = globalThis.document.createElement('div');
    }
    if (!escapeDiv) return String(str);
    escapeDiv.textContent = str;
    return escapeDiv.innerHTML;
  }
  var VIDEO_OUTPUT_TYPES = new Set(['3G-SDI', '6G-SDI', '12G-SDI', 'Mini BNC', 'HDMI', 'Mini HDMI', 'Micro HDMI', 'DisplayPort']);
  var DEFAULT_FILTER_SIZE = '4x5.65';
  var AUTO_BACKUP_NAME_PREFIX = 'auto-backup-';
  var AUTO_BACKUP_DELETION_PREFIX = 'auto-backup-before-delete-';
  var showAutoBackups = false;
  try {
    if (typeof localStorage !== 'undefined') {
      showAutoBackups = localStorage.getItem('showAutoBackups') === 'true';
    }
  } catch (e) {
    console.warn('Could not load auto backup visibility preference', e);
  }
  function cloneProjectEntryForSetup(projectEntry) {
    if (!projectEntry || _typeof(projectEntry) !== 'object') {
      return {};
    }
    var snapshot = {};
    var projectInfo = projectEntry.projectInfo,
      gearList = projectEntry.gearList,
      autoGearRules = projectEntry.autoGearRules;
    if (projectInfo && _typeof(projectInfo) === 'object') {
      try {
        snapshot.projectInfo = CORE_DEEP_CLONE(projectInfo);
      } catch (error) {
        console.warn('Failed to clone project info for auto backup import', error);
        snapshot.projectInfo = projectInfo;
      }
    }
    if (projectEntry && _typeof(projectEntry.powerSelection) === 'object') {
      try {
        snapshot.powerSelection = CORE_DEEP_CLONE(projectEntry.powerSelection);
      } catch (error) {
        console.warn('Failed to clone project power selection for auto backup import', error);
        snapshot.powerSelection = projectEntry.powerSelection;
      }
    }
    if (typeof gearList === 'string' && gearList.trim()) {
      snapshot.gearList = gearList;
    }
    if (Array.isArray(autoGearRules) && autoGearRules.length) {
      try {
        snapshot.autoGearRules = CORE_DEEP_CLONE(autoGearRules);
      } catch (error) {
        console.warn('Failed to clone auto gear rules for auto backup import', error);
        snapshot.autoGearRules = autoGearRules.slice();
      }
    }
    var metadata = projectEntry && _typeof(projectEntry) === 'object' ? projectEntry.__cineAutoBackupMetadata : null;
    if (metadata && _typeof(metadata) === 'object') {
      try {
        Object.defineProperty(snapshot, '__cineAutoBackupMetadata', {
          configurable: true,
          enumerable: false,
          writable: true,
          value: {
            version: typeof metadata.version === 'number' ? metadata.version : 1,
            snapshotType: metadata.snapshotType === 'delta' ? 'delta' : 'full',
            base: typeof metadata.base === 'string' ? metadata.base : null,
            sequence: typeof metadata.sequence === 'number' ? metadata.sequence : 0,
            createdAt: typeof metadata.createdAt === 'string' ? metadata.createdAt : null,
            changedKeys: Array.isArray(metadata.changedKeys) ? metadata.changedKeys.slice() : [],
            removedKeys: Array.isArray(metadata.removedKeys) ? metadata.removedKeys.slice() : []
          }
        });
      } catch (error) {
        try {
          snapshot.__cineAutoBackupMetadata = metadata;
        } catch (assignmentError) {
          void assignmentError;
        }
      }
    }
    return snapshot;
  }
  function ensureAutoBackupsFromProjects() {
    if (typeof loadProject !== 'function') return false;
    var projects;
    try {
      projects = loadProject();
    } catch (error) {
      console.warn('Failed to read projects while syncing auto backups', error);
      return false;
    }
    if (!projects || _typeof(projects) !== 'object') {
      return false;
    }
    var setups = getSetups();
    var changed = false;
    Object.keys(projects).forEach(function (name) {
      if (typeof name !== 'string' || !name) return;
      var isAutoBackup = name.startsWith(AUTO_BACKUP_NAME_PREFIX) || name.startsWith(AUTO_BACKUP_DELETION_PREFIX);
      if (!isAutoBackup) return;
      if (Object.prototype.hasOwnProperty.call(setups, name)) return;
      var snapshot = cloneProjectEntryForSetup(projects[name]);
      setups[name] = snapshot;
      changed = true;
    });
    if (changed) {
      try {
        storeSetups(setups);
      } catch (error) {
        console.warn('Failed to persist imported auto backups from projects', error);
        return false;
      }
    }
    return changed;
  }
  if (showAutoBackups) {
    try {
      ensureAutoBackupsFromProjects();
    } catch (error) {
      console.warn('Failed to prepare auto backups from project storage', error);
    }
  }
  function getSetups() {
    return loadSetups();
  }
  function storeSetups(setups) {
    saveSetups(setups);
  }
  function storeDevices(deviceData) {
    saveDeviceData(deviceData);
  }
  function loadSession() {
    return typeof loadSessionState === 'function' ? loadSessionState() : null;
  }
  function storeSession(state) {
    if (typeof saveSessionState === 'function') {
      saveSessionState(state);
    }
  }
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
  function memoizeNormalization(fn) {
    var cache = new Map();
    return function (value) {
      if (!value) return '';
      var str = String(value).replace(/[™®]/g, '').trim();
      var key = str.toLowerCase();
      if (!cache.has(key)) cache.set(key, fn(str, key));
      return cache.get(key);
    };
  }
  var VIDEO_TYPE_PATTERNS = [{
    needles: ['12g'],
    value: '12G-SDI'
  }, {
    needles: ['6g'],
    value: '6G-SDI'
  }, {
    needles: ['3g'],
    value: '3G-SDI'
  }, {
    needles: ['hd', 'sdi'],
    value: '3G-SDI'
  }, {
    needles: ['mini', 'bnc'],
    value: 'Mini BNC'
  }, {
    needles: ['micro', 'hdmi'],
    value: 'Micro HDMI'
  }, {
    needles: ['mini', 'hdmi'],
    value: 'Mini HDMI'
  }, {
    needles: ['hdmi'],
    value: 'HDMI'
  }, {
    needles: ['displayport'],
    value: 'DisplayPort'
  }, {
    needles: ['display', 'port'],
    value: 'DisplayPort'
  }, {
    needles: ['dp'],
    value: 'DisplayPort'
  }];
  var normalizeVideoType = memoizeNormalization(function (_, key) {
    var match = VIDEO_TYPE_PATTERNS.find(function (_ref18) {
      var needles = _ref18.needles;
      return needles.every(function (n) {
        return key.includes(n);
      });
    });
    return match ? match.value : '';
  });
  var FIZ_CONNECTOR_MAP = {
    'lemo 4-pin (lbus)': 'LBUS (LEMO 4-pin)',
    'lbus (lemo 4-pin)': 'LBUS (LEMO 4-pin)',
    'lbus (4-pin lemo)': 'LBUS (LEMO 4-pin)',
    'lbus (4-pin lemo for motors)': 'LBUS (LEMO 4-pin)',
    '4-pin lemo (lbus)': 'LBUS (LEMO 4-pin)',
    'lemo 4-pin': 'LEMO 4-pin',
    '4-pin lemo': 'LEMO 4-pin',
    'lemo 7-pin': 'LEMO 7-pin',
    'lemo 7-pin 1b': 'LEMO 7-pin',
    '7-pin lemo': 'LEMO 7-pin',
    '7-pin lemo (lcs)': 'LEMO 7-pin (LCS)',
    '7-pin lemo (cam)': 'LEMO 7-pin (CAM)',
    'ext (lemo 7-pin)': 'EXT LEMO 7-pin',
    'hirose 12pin': 'Hirose 12-pin',
    '12-pin hirose': 'Hirose 12-pin',
    '12pin broadcast connector': 'Hirose 12-pin',
    'lens 12 pin': 'Hirose 12-pin',
    'lens terminal 12-pin': 'Hirose 12-pin',
    'lens terminal 12-pin jack': 'Hirose 12-pin',
    'lens terminal': 'Hirose 12-pin',
    'usb type-c': 'USB-C',
    'usb-c': 'USB-C',
    'usb-c (usb 3.2 / 3.1 gen 1)': 'USB-C',
    'usb-c / gigabit ethernet (via adapter)': 'USB-C',
    'active ef mount': 'Active EF mount',
    'lanc (2.5mm stereo mini jack)': 'LANC',
    '2.5 mm sub-mini (lanc)': 'LANC',
    'remote a (2.5mm)': 'REMOTE A connector',
    'remote control terminal': 'REMOTE A connector',
    'remote 8 pin': 'REMOTE B connector'
  };
  function createMapNormalizer(map) {
    return memoizeNormalization(function (str, key) {
      return map[key] || str;
    });
  }
  var normalizeFizConnectorType = createMapNormalizer(FIZ_CONNECTOR_MAP);
  var VIEWFINDER_TYPE_MAP = {
    'dsmc3 red touch 7" lcd (optional)': 'RED Touch 7" LCD (Optional)',
    'red touch 7.0" lcd (optional)': 'RED Touch 7" LCD (Optional)',
    'lcd touch panel': 'LCD touchscreen',
    'lcd touchscreen': 'LCD touchscreen',
    'native lcd capacitive touchscreen': 'LCD touchscreen',
    'integrated touchscreen lcd': 'LCD touchscreen',
    'free-angle lcd': 'Vari-angle LCD',
    'lcd monitor (native)': 'Integrated LCD monitor',
    'native lcd viewfinder': 'Integrated LCD monitor',
    'lcd monitor lm-v2 (supplied)': 'LCD Monitor LM-V2',
    'integrated main monitor': 'Integrated LCD monitor',
    'optional evf-v70 viewfinder': 'EVF-V70 (Optional)',
    'optional evf-v50': 'EVF-V50 (Optional)',
    'optional oled viewfinder': 'OLED EVF (Optional)',
    'blackmagic pocket cinema camera pro evf (optional)': 'Blackmagic Pro EVF (Optional)',
    'external backlit lcd status display': 'LCD status display',
    'built-in fold-out lcd': 'Fold-out LCD',
    'oled lvf (live view finder)': 'OLED EVF',
    'lcd capacitive touchscreen': 'LCD touchscreen',
    'lemo 26 pin': 'LEMO 26-pin port'
  };
  var normalizeViewfinderType = createMapNormalizer(VIEWFINDER_TYPE_MAP);
  var POWER_PORT_TYPE_MAP = {
    'lemo 8-pin (dc in / bat)': 'Bat LEMO 8-pin',
    'lemo 8-pin (bat)': 'Bat LEMO 8-pin',
    'bat (lemo 8-pin)': 'Bat LEMO 8-pin',
    'lemo 8-pin': 'Bat LEMO 8-pin',
    '2-pin dc-input': '2-pin DC-IN',
    '2-pin xlr': 'XLR 2-pin',
    '2-pin locking connector': 'LEMO 2-pin',
    '2-pin locking connector / 2-pin lemo': 'LEMO 2-pin',
    '4-pin xlr / dc in 12v': 'XLR 4-pin',
    '4-pin xlr / v-lock': 'XLR 4-pin',
    'xlr 4-pin jack': 'XLR 4-pin',
    'xlr 4-pin (main input)': 'XLR 4-pin',
    'xlr-type 4 pin (male) / square-shaped 5 pin connector (battery)': 'XLR 4-pin / Square 5-pin',
    '12-pin molex connector (at battery plate rear) / 4-pin xlr (external power)': 'Molex 12-pin / XLR 4-pin',
    'battery slot': 'Battery Slot',
    'usb-c': 'USB-C',
    'usb type-c': 'USB-C',
    'usb-c pd': 'USB-C PD',
    'usb-c (power delivery)': 'USB-C PD',
    'dc input': 'DC IN',
    'weipu sf610/s2 (12vdc) input': 'Weipu SF610/S2',
    '6-pin 1b dc-in / tb50 battery mount': '6-pin 1B DC-IN / TB50'
  };
  var mapPowerPortOne = createMapNormalizer(POWER_PORT_TYPE_MAP);
  function normalizePowerPortType(type) {
    if (!type) return [];
    var toArray = function toArray(val) {
      return mapPowerPortOne(val).split('/').map(function (p) {
        return mapPowerPortOne(p);
      }).filter(Boolean);
    };
    return Array.isArray(type) ? type.flatMap(toArray) : toArray(type);
  }
  function ensureList(list, defaults) {
    if (!Array.isArray(list)) return [];
    return list.map(function (item) {
      return typeof item === 'string' ? _objectSpread(_objectSpread({}, defaults), {}, {
        type: item
      }) : _objectSpread(_objectSpread({}, defaults), item || {});
    });
  }
  function fixPowerInput(dev) {
    var _dev$power, _dev$power2;
    if (!dev) return;
    if (dev.powerInput && !((_dev$power = dev.power) !== null && _dev$power !== void 0 && _dev$power.input)) {
      dev.power = _objectSpread(_objectSpread({}, dev.power || {}), {}, {
        input: {
          type: normalizePowerPortType(dev.powerInput)
        }
      });
      delete dev.powerInput;
    }
    var input = (_dev$power2 = dev.power) === null || _dev$power2 === void 0 ? void 0 : _dev$power2.input;
    if (!input) return;
    var normalizeEntry = function normalizeEntry(it) {
      if (typeof it === 'string') {
        return {
          type: normalizePowerPortType(it)
        };
      }
      if (it) {
        var pType = it.portType,
          tType = it.type,
          rest = _objectWithoutProperties(it, _excluded);
        var typeField = !tType && pType ? pType : tType;
        return _objectSpread(_objectSpread({}, rest), {}, {
          type: typeField ? normalizePowerPortType(typeField) : []
        });
      }
      return {
        type: []
      };
    };
    dev.power.input = Array.isArray(input) ? input.map(normalizeEntry) : normalizeEntry(input);
  }
  function applyFixPowerInput(collection) {
    if (!collection || _typeof(collection) !== 'object') return;
    Object.values(collection).forEach(fixPowerInput);
  }
  function unifyDevices(devicesData) {
    var _devicesData$fiz, _devicesData$fiz2;
    if (!devicesData || _typeof(devicesData) !== 'object') return;
    Object.values(devicesData.cameras || {}).forEach(function (cam) {
      var _cam$power, _cam$power2;
      if ((_cam$power = cam.power) !== null && _cam$power !== void 0 && _cam$power.input && cam.power.input.powerDrawWatts !== undefined) {
        delete cam.power.input.powerDrawWatts;
      }
      fixPowerInput(cam);
      if (Array.isArray((_cam$power2 = cam.power) === null || _cam$power2 === void 0 ? void 0 : _cam$power2.batteryPlateSupport)) {
        cam.power.batteryPlateSupport = cam.power.batteryPlateSupport.map(function (it) {
          if (typeof it === 'string') {
            var m = it.match(/([^()]+)(?:\(([^)]+)\))?(?:\s*-\s*(.*))?/);
            var type = m ? m[1].trim() : it;
            var mount = m && m[2] ? m[2].trim().toLowerCase() : '';
            if (!mount) {
              mount = /adapted|via adapter/i.test(it) ? 'adapted' : 'native';
            } else if (/via adapter/i.test(mount)) {
              mount = 'adapted';
            }
            var notes = m && m[3] ? m[3].trim() : /via adapter/i.test(it) ? 'via adapter' : '';
            return {
              type: type,
              mount: mount,
              notes: notes
            };
          }
          return {
            type: it.type || '',
            mount: (it.mount ? it.mount : it.native ? 'native' : it.adapted ? 'adapted' : 'native').toLowerCase(),
            notes: it.notes || ''
          };
        });
      }
      if (cam.power) {
        cam.power.powerDistributionOutputs = ensureList(cam.power.powerDistributionOutputs, {
          type: '',
          voltage: '',
          current: '',
          wattage: null,
          notes: ''
        });
      }
      cam.videoOutputs = ensureList(cam.videoOutputs, {
        type: '',
        notes: ''
      }).flatMap(function (vo) {
        var _ref19 = vo || {},
          count = _ref19.count,
          rest = _objectWithoutProperties(_ref19, _excluded2);
        var norm = normalizeVideoType(rest.type);
        if (!VIDEO_OUTPUT_TYPES.has(norm)) return [];
        var parsedCount = parseInt(count, 10);
        var num = Number.isFinite(parsedCount) && parsedCount > 0 ? parsedCount : 1;
        var base = _objectSpread(_objectSpread({}, rest), {}, {
          type: norm,
          notes: rest.notes || ''
        });
        return Array.from({
          length: num
        }, function () {
          return _objectSpread({}, base);
        });
      });
      cam.fizConnectors = ensureList(cam.fizConnectors, {
        type: '',
        notes: ''
      }).map(function (fc) {
        var _ref20 = fc || {},
          type = _ref20.type,
          rest = _objectWithoutProperties(_ref20, _excluded3);
        return _objectSpread(_objectSpread({}, rest), {}, {
          type: normalizeFizConnectorType(type)
        });
      });
      cam.viewfinder = ensureList(cam.viewfinder, {
        type: '',
        resolution: '',
        connector: '',
        notes: ''
      }).map(function (vf) {
        var _ref21 = vf || {},
          type = _ref21.type,
          rest = _objectWithoutProperties(_ref21, _excluded4);
        return _objectSpread(_objectSpread({}, rest), {}, {
          type: normalizeViewfinderType(type)
        });
      });
      cam.recordingMedia = ensureList(cam.recordingMedia, {
        type: '',
        notes: ''
      }).map(function (m) {
        var _ref22 = m || {},
          _ref22$type = _ref22.type,
          type = _ref22$type === void 0 ? '' : _ref22$type,
          _ref22$notes = _ref22.notes,
          notes = _ref22$notes === void 0 ? '' : _ref22$notes;
        var match = type.match(/^(.*?)(?:\((.*)\))?$/);
        if (match) {
          type = match[1].trim();
          notes = notes || (match[2] ? match[2].trim() : '');
        }
        if (/^SD UHS-II$/i.test(type)) {
          type = 'SD Card';
          notes = notes ? "".concat(notes, "; UHS-II") : 'UHS-II';
        } else if (/^SD \(UHS-II\/UHS-I\)$/i.test(type)) {
          type = 'SD Card';
          notes = 'UHS-II/UHS-I';
        } else if (type === 'CFast 2.0 card slots') {
          type = 'CFast 2.0';
          notes = notes || 'Dual Slots';
        } else if (type === 'CFexpress Type B (Dual Slots)') {
          type = 'CFexpress Type B';
          notes = notes || 'Dual Slots';
        } else if (type === 'CFexpress Type B (via adapter)') {
          type = 'CFexpress Type B';
          notes = notes || 'via adapter';
        } else if (/^SD UHS-II \(Dual Slots\)$/i.test(type)) {
          type = 'SD Card';
          notes = notes ? "".concat(notes, "; UHS-II (Dual Slots)") : 'UHS-II (Dual Slots)';
        } else if (type === 'SD Card (Dual Slots)') {
          type = 'SD Card';
          notes = notes || 'Dual Slots';
        } else if (type === 'SD card slot (for proxy/backup)') {
          type = 'SD Card';
          notes = notes || 'for proxy/backup';
        }
        return {
          type: type,
          notes: notes
        };
      });
      cam.timecode = ensureList(cam.timecode, {
        type: '',
        notes: ''
      });
      cam.lensMount = ensureList(cam.lensMount, {
        type: '',
        mount: 'native',
        notes: ''
      }).map(function (lm) {
        return {
          type: lm.type,
          mount: lm.mount ? lm.mount.toLowerCase() : 'native',
          notes: lm.notes || ''
        };
      }).filter(function (lm, idx, arr) {
        return idx === arr.findIndex(function (o) {
          return o.type === lm.type && o.mount === lm.mount && o.notes === lm.notes;
        });
      });
    });
    Object.values(devicesData.lenses || {}).forEach(function (lens) {
      if (!lens || _typeof(lens) !== 'object') return;
      var normalizeMountEntry = function normalizeMountEntry(entry) {
        if (!entry) return null;
        if (typeof entry === 'string') {
          var trimmed = entry.trim();
          if (!trimmed) return null;
          return {
            type: trimmed,
            mount: 'native'
          };
        }
        var type = typeof entry.type === 'string' ? entry.type.trim() : '';
        if (!type) return null;
        var status = typeof entry.mount === 'string' ? entry.mount.trim().toLowerCase() : '';
        return {
          type: type,
          mount: status === 'adapted' ? 'adapted' : 'native'
        };
      };
      var existingMountOptions = lens.mountOptions;
      var normalizedOptions = [];
      var pushNormalizedEntry = function pushNormalizedEntry(entry) {
        var normalized = normalizeMountEntry(entry);
        if (normalized) {
          normalizedOptions.push(normalized);
        }
      };
      if (Array.isArray(existingMountOptions)) {
        existingMountOptions.forEach(pushNormalizedEntry);
      } else if (existingMountOptions && _typeof(existingMountOptions) === 'object') {
        pushNormalizedEntry(existingMountOptions);
      }
      if (!normalizedOptions.length && Array.isArray(lens.lensMount)) {
        lens.lensMount.forEach(pushNormalizedEntry);
        delete lens.lensMount;
      }
      if (!normalizedOptions.length) {
        var mountType = typeof lens.mount === 'string' ? lens.mount.trim() : '';
        if (mountType) {
          pushNormalizedEntry({
            type: mountType,
            mount: 'native'
          });
        }
      }
      var dedupedOptions = [];
      normalizedOptions.forEach(function (opt) {
        if (!opt || !opt.type) return;
        var mountState = opt.mount === 'adapted' ? 'adapted' : 'native';
        var alreadyPresent = dedupedOptions.some(function (existing) {
          return existing.type === opt.type && existing.mount === mountState;
        });
        if (!alreadyPresent) {
          dedupedOptions.push({
            type: opt.type,
            mount: mountState
          });
        }
      });
      var safeMountOptions = Array.isArray(dedupedOptions) ? dedupedOptions : [];
      lens.mountOptions = safeMountOptions;
      var mountOptions = Array.isArray(lens.mountOptions) ? lens.mountOptions : [];
      if (mountOptions.length) {
        var primary = mountOptions.find(function (opt) {
          return opt && opt.mount === 'native' && opt.type;
        }) || mountOptions[0];
        var primaryType = primary && primary.type ? primary.type : '';
        if (primaryType) {
          lens.mount = primaryType;
        } else if (typeof lens.mount === 'string') {
          lens.mount = lens.mount.trim();
        }
      } else if (typeof lens.mount === 'string') {
        lens.mount = lens.mount.trim();
        if (!lens.mount) {
          delete lens.mount;
        }
      }
    });
    ['monitors', 'video', 'viewfinders'].forEach(function (key) {
      applyFixPowerInput(devicesData[key]);
    });
    var fizGroups = devicesData.fiz || {};
    ['motors', 'controllers', 'distance'].forEach(function (key) {
      applyFixPowerInput(fizGroups[key]);
    });
    Object.values(((_devicesData$fiz = devicesData.fiz) === null || _devicesData$fiz === void 0 ? void 0 : _devicesData$fiz.motors) || {}).forEach(function (m) {
      if (!m) return;
      if (m.connector && !m.fizConnector) {
        m.fizConnector = m.connector;
        delete m.connector;
      }
      if (m.fizConnector) {
        m.fizConnector = normalizeFizConnectorType(m.fizConnector);
      }
    });
    Object.values(((_devicesData$fiz2 = devicesData.fiz) === null || _devicesData$fiz2 === void 0 ? void 0 : _devicesData$fiz2.controllers) || {}).forEach(function (c) {
      if (!c) return;
      if (c.FIZ_connector && !c.fizConnector && !c.fizConnectors) {
        c.fizConnector = c.FIZ_connector;
        delete c.FIZ_connector;
      }
      if (Array.isArray(c.fizConnectors)) {
        c.fizConnectors = c.fizConnectors.map(function (fc) {
          if (!fc) return {
            type: ''
          };
          var type = normalizeFizConnectorType(fc.type || fc);
          var notes = fc.notes || undefined;
          return notes ? {
            type: type,
            notes: notes
          } : {
            type: type
          };
        });
      } else if (c.fizConnector) {
        var parts = String(c.fizConnector).split(',').map(function (s) {
          return s.trim();
        }).filter(Boolean);
        c.fizConnectors = parts.map(function (p) {
          return {
            type: normalizeFizConnectorType(p)
          };
        });
        delete c.fizConnector;
      } else {
        c.fizConnectors = [];
      }
    });
  }
  if (window.defaultDevices === undefined) {
    window.defaultDevices = CORE_DEEP_CLONE(devices);
    unifyDevices(window.defaultDevices);
  }
  var storedDevices = loadDeviceData();
  if (storedDevices) {
    var merged = CORE_DEEP_CLONE(window.defaultDevices);
    for (var _i6 = 0, _Object$entries = Object.entries(storedDevices); _i6 < _Object$entries.length; _i6++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i6], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      if (key === 'fiz' && value && _typeof(value) === 'object') {
        merged.fiz = merged.fiz || {};
        for (var _i7 = 0, _Object$entries2 = Object.entries(value); _i7 < _Object$entries2.length; _i7++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i7], 2),
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
    updateGlobalDevicesReference(devices);
  }
  unifyDevices(devices);
  function getBatteryPlateSupport(name) {
    var cam = devices.cameras[name];
    if (!cam || !cam.power || !Array.isArray(cam.power.batteryPlateSupport)) return [];
    return cam.power.batteryPlateSupport.filter(Boolean);
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
    for (var _i8 = 0, _Object$entries3 = Object.entries(devices.batteries); _i8 < _Object$entries3.length; _i8++) {
      var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i8], 2),
        name = _Object$entries3$_i[0],
        info = _Object$entries3$_i[1];
      if (info && info.mount_type === mountType) out[name] = info;
    }
    return out;
  }
  function getHotswapsByMount(mountType) {
    var out = {};
    for (var _i9 = 0, _Object$entries4 = Object.entries(devices.batteryHotswaps || {}); _i9 < _Object$entries4.length; _i9++) {
      var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i9], 2),
        name = _Object$entries4$_i[0],
        info = _Object$entries4$_i[1];
      if (info && info.mount_type === mountType) out[name] = info;
    }
    return out;
  }
  function getBatteryMountType(batteryName) {
    var _devices;
    if (!batteryName || batteryName === 'None') {
      return '';
    }
    var info = (_devices = devices) === null || _devices === void 0 || (_devices = _devices.batteries) === null || _devices === void 0 ? void 0 : _devices[batteryName];
    var mount = info && typeof info.mount_type === 'string' ? info.mount_type : '';
    return mount || '';
  }
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
  function applyBatteryPlateSelectionFromBattery(batteryName, currentPlateValue) {
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
    var camName = typeof (cameraSelect === null || cameraSelect === void 0 ? void 0 : cameraSelect.value) === 'string' ? cameraSelect.value : '';
    var plates = typeof getAvailableBatteryPlates === 'function' ? getAvailableBatteryPlates(camName) : [];
    if (!Array.isArray(plates) || !plates.length) return null;
    var plateValue = typeof (batteryPlateSelect === null || batteryPlateSelect === void 0 ? void 0 : batteryPlateSelect.value) === 'string' ? batteryPlateSelect.value : '';
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
    var cam = devices.cameras[camName];
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
    var cam = devices.cameras[camName];
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
    var camName = cameraSelect.value;
    var plates = getAvailableBatteryPlates(camName);
    var current = batteryPlateSelect.value;
    batteryPlateSelect.innerHTML = '';
    if (plates.length) {
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
    updateViewfinderSettingsVisibility();
    updateViewfinderExtensionVisibility();
    updateMonitoringConfigurationOptions();
  }
  function updateViewfinderSettingsVisibility() {
    var _devices2;
    var cam = (_devices2 = devices) === null || _devices2 === void 0 || (_devices2 = _devices2.cameras) === null || _devices2 === void 0 ? void 0 : _devices2[cameraSelect === null || cameraSelect === void 0 ? void 0 : cameraSelect.value];
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
    var _devices3;
    if (!monitoringConfigurationSelect) return;
    var cam = (_devices3 = devices) === null || _devices3 === void 0 || (_devices3 = _devices3.cameras) === null || _devices3 === void 0 ? void 0 : _devices3[cameraSelect === null || cameraSelect === void 0 ? void 0 : cameraSelect.value];
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
    var _devices4;
    var cam = (_devices4 = devices) === null || _devices4 === void 0 || (_devices4 = _devices4.cameras) === null || _devices4 === void 0 ? void 0 : _devices4[cameraSelect === null || cameraSelect === void 0 ? void 0 : cameraSelect.value];
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
    var fallbackTexts = getLanguageTexts(DEFAULT_LANGUAGE);
    var helpText = resolveTextEntry(langTexts, fallbackTexts, 'batterySelectHelp', '');
    if (helpText) {
      label.setAttribute('data-help', helpText);
    } else {
      label.removeAttribute('data-help');
    }
    if (getSelectedPlate() === 'B-Mount') {
      label.textContent = resolveTextEntry(langTexts, fallbackTexts, 'batteryBMountLabel', 'B-Mount Battery:');
    } else {
      label.textContent = resolveTextEntry(langTexts, fallbackTexts, 'batteryLabel', 'Battery:');
    }
  }
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
      var bats = devices.batteries;
      if (!supportsB) {
        bats = Object.fromEntries(Object.entries(bats).filter(function (_ref23) {
          var _ref24 = _slicedToArray(_ref23, 2),
            b = _ref24[1];
          return b.mount_type !== 'B-Mount';
        }));
      }
      if (!supportsGold) {
        bats = Object.fromEntries(Object.entries(bats).filter(function (_ref25) {
          var _ref26 = _slicedToArray(_ref25, 2),
            b = _ref26[1];
          return b.mount_type !== 'Gold-Mount';
        }));
      }
      populateSelect(batterySelect, bats, true);
      swaps = devices.batteryHotswaps || {};
      if (!supportsB) {
        swaps = Object.fromEntries(Object.entries(swaps).filter(function (_ref27) {
          var _ref28 = _slicedToArray(_ref27, 2),
            b = _ref28[1];
          return b.mount_type !== 'B-Mount';
        }));
      }
      if (!supportsGold) {
        swaps = Object.fromEntries(Object.entries(swaps).filter(function (_ref29) {
          var _ref30 = _slicedToArray(_ref29, 2),
            b = _ref30[1];
          return b.mount_type !== 'Gold-Mount';
        }));
      }
    }
    if (!/FXLion Nano/i.test(current)) {
      swaps = Object.fromEntries(Object.entries(swaps).filter(function (_ref31) {
        var _ref32 = _slicedToArray(_ref31, 1),
          name = _ref32[0];
        return name !== 'FX-Lion NANO Dual V-Mount Hot-Swap Plate';
      }));
    }
    var totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
    if (isFinite(totalCurrentLow) && totalCurrentLow > 0) {
      swaps = Object.fromEntries(Object.entries(swaps).filter(function (_ref33) {
        var _ref34 = _slicedToArray(_ref33, 2),
          info = _ref34[1];
        return typeof info.pinA !== 'number' || info.pinA >= totalCurrentLow;
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
    for (var _i0 = 0, _Object$entries5 = Object.entries(BRAND_KEYWORDS); _i0 < _Object$entries5.length; _i0++) {
      var _Object$entries5$_i = _slicedToArray(_Object$entries5[_i0], 2),
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
    var fallbackTexts = getLanguageTexts(DEFAULT_LANGUAGE);
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
      var warning = resolveTextEntry(langTexts, fallbackTexts, 'incompatibleFIZWarning', '');
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
    var cam = devices.cameras[camName];
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
      var fallbackTexts = getLanguageTexts(DEFAULT_LANGUAGE);
      var warning = resolveTextEntry(langTexts, fallbackTexts, 'amiraCforceRemoteWarning', '');
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
      var _fallbackTexts = getLanguageTexts(DEFAULT_LANGUAGE);
      var _warning = resolveTextEntry(_langTexts, _fallbackTexts, 'missingFIZControllerWarning', '');
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
    var cam = devices.cameras[camName];
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
      msg = resolveTextEntry(getLanguageTexts(currentLang), getLanguageTexts(DEFAULT_LANGUAGE), 'arriCLMNoUMC4Warning', '');
    } else if (usesUMC4 && motors.some(function (m) {
      return !clmRegex.test(m);
    })) {
      msg = resolveTextEntry(getLanguageTexts(currentLang), getLanguageTexts(DEFAULT_LANGUAGE), 'arriUMC4Warning', '');
    } else if ((usesRIA1 || usesRF) && motors.some(function (m) {
      return clmRegex.test(m);
    })) {
      msg = resolveTextEntry(getLanguageTexts(currentLang), getLanguageTexts(DEFAULT_LANGUAGE), 'arriRIA1Warning', '');
    } else if (distance && distance !== 'None' && !(usesUMC4 || usesRIA1 || usesRF || builtInController)) {
      msg = resolveTextEntry(getLanguageTexts(currentLang), getLanguageTexts(DEFAULT_LANGUAGE), 'distanceControllerWarning', '');
    } else if (onlyMasterGrip && !usesRF) {
      msg = resolveTextEntry(getLanguageTexts(currentLang), getLanguageTexts(DEFAULT_LANGUAGE), 'masterGripWirelessWarning', '');
    }
    if (msg) {
      setStatusMessage(compatElem, msg);
      var langTexts = getLanguageTexts(currentLang);
      var fallbackTexts = getLanguageTexts(DEFAULT_LANGUAGE);
      var umcWarning = resolveTextEntry(langTexts, fallbackTexts, 'arriUMC4Warning', '');
      if (msg === umcWarning && umcWarning) {
        setStatusLevel(compatElem, 'warning');
      } else {
        setStatusLevel(compatElem, 'danger');
      }
    }
  }
  var gearItemTranslations = {};
  if (typeof texts === 'undefined') {
    try {
      var translations = require('./translations.js');
      window.texts = translations.texts;
      window.categoryNames = translations.categoryNames;
      window.gearItems = translations.gearItems;
      gearItemTranslations = translations.gearItems || {};
    } catch (e) {
      console.warn('Failed to load translations', e);
    }
  } else {
    gearItemTranslations = typeof gearItems !== 'undefined' ? gearItems : {};
  }
  var SUPPORTED_LANGUAGES = (typeof texts === "undefined" ? "undefined" : _typeof(texts)) === "object" && texts !== null ? Object.keys(texts) : [DEFAULT_LANGUAGE];
  function resolveLanguagePreference(candidate) {
    if (!candidate) {
      return {
        language: DEFAULT_LANGUAGE,
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
      language: DEFAULT_LANGUAGE,
      matched: false
    };
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
  var autoGearConditionSections = {
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
    cameraWeight: autoGearCameraWeightSection,
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
  var autoGearConditionAddShortcuts = {
    always: ((_autoGearConditionSec = autoGearConditionSections.always) === null || _autoGearConditionSec === void 0 ? void 0 : _autoGearConditionSec.querySelector('.auto-gear-condition-add')) || null,
    scenarios: ((_autoGearConditionSec2 = autoGearConditionSections.scenarios) === null || _autoGearConditionSec2 === void 0 ? void 0 : _autoGearConditionSec2.querySelector('.auto-gear-condition-add')) || null,
    shootingDays: ((_autoGearConditionSec3 = autoGearConditionSections.shootingDays) === null || _autoGearConditionSec3 === void 0 ? void 0 : _autoGearConditionSec3.querySelector('.auto-gear-condition-add')) || null,
    mattebox: ((_autoGearConditionSec4 = autoGearConditionSections.mattebox) === null || _autoGearConditionSec4 === void 0 ? void 0 : _autoGearConditionSec4.querySelector('.auto-gear-condition-add')) || null,
    cameraHandle: ((_autoGearConditionSec5 = autoGearConditionSections.cameraHandle) === null || _autoGearConditionSec5 === void 0 ? void 0 : _autoGearConditionSec5.querySelector('.auto-gear-condition-add')) || null,
    viewfinderExtension: ((_autoGearConditionSec6 = autoGearConditionSections.viewfinderExtension) === null || _autoGearConditionSec6 === void 0 ? void 0 : _autoGearConditionSec6.querySelector('.auto-gear-condition-add')) || null,
    deliveryResolution: ((_autoGearConditionSec7 = autoGearConditionSections.deliveryResolution) === null || _autoGearConditionSec7 === void 0 ? void 0 : _autoGearConditionSec7.querySelector('.auto-gear-condition-add')) || null,
    videoDistribution: ((_autoGearConditionSec8 = autoGearConditionSections.videoDistribution) === null || _autoGearConditionSec8 === void 0 ? void 0 : _autoGearConditionSec8.querySelector('.auto-gear-condition-add')) || null,
    camera: ((_autoGearConditionSec9 = autoGearConditionSections.camera) === null || _autoGearConditionSec9 === void 0 ? void 0 : _autoGearConditionSec9.querySelector('.auto-gear-condition-add')) || null,
    ownGear: ((_autoGearConditionSec0 = autoGearConditionSections.ownGear) === null || _autoGearConditionSec0 === void 0 ? void 0 : _autoGearConditionSec0.querySelector('.auto-gear-condition-add')) || null,
    cameraWeight: ((_autoGearConditionSec1 = autoGearConditionSections.cameraWeight) === null || _autoGearConditionSec1 === void 0 ? void 0 : _autoGearConditionSec1.querySelector('.auto-gear-condition-add')) || null,
    monitor: ((_autoGearConditionSec10 = autoGearConditionSections.monitor) === null || _autoGearConditionSec10 === void 0 ? void 0 : _autoGearConditionSec10.querySelector('.auto-gear-condition-add')) || null,
    tripodHeadBrand: ((_autoGearConditionSec11 = autoGearConditionSections.tripodHeadBrand) === null || _autoGearConditionSec11 === void 0 ? void 0 : _autoGearConditionSec11.querySelector('.auto-gear-condition-add')) || null,
    tripodBowl: ((_autoGearConditionSec12 = autoGearConditionSections.tripodBowl) === null || _autoGearConditionSec12 === void 0 ? void 0 : _autoGearConditionSec12.querySelector('.auto-gear-condition-add')) || null,
    tripodTypes: ((_autoGearConditionSec13 = autoGearConditionSections.tripodTypes) === null || _autoGearConditionSec13 === void 0 ? void 0 : _autoGearConditionSec13.querySelector('.auto-gear-condition-add')) || null,
    tripodSpreader: ((_autoGearConditionSec14 = autoGearConditionSections.tripodSpreader) === null || _autoGearConditionSec14 === void 0 ? void 0 : _autoGearConditionSec14.querySelector('.auto-gear-condition-add')) || null,
    crewPresent: ((_autoGearConditionSec15 = autoGearConditionSections.crewPresent) === null || _autoGearConditionSec15 === void 0 ? void 0 : _autoGearConditionSec15.querySelector('.auto-gear-condition-add')) || null,
    crewAbsent: ((_autoGearConditionSec16 = autoGearConditionSections.crewAbsent) === null || _autoGearConditionSec16 === void 0 ? void 0 : _autoGearConditionSec16.querySelector('.auto-gear-condition-add')) || null,
    wireless: ((_autoGearConditionSec17 = autoGearConditionSections.wireless) === null || _autoGearConditionSec17 === void 0 ? void 0 : _autoGearConditionSec17.querySelector('.auto-gear-condition-add')) || null,
    motors: ((_autoGearConditionSec18 = autoGearConditionSections.motors) === null || _autoGearConditionSec18 === void 0 ? void 0 : _autoGearConditionSec18.querySelector('.auto-gear-condition-add')) || null,
    controllers: ((_autoGearConditionSec19 = autoGearConditionSections.controllers) === null || _autoGearConditionSec19 === void 0 ? void 0 : _autoGearConditionSec19.querySelector('.auto-gear-condition-add')) || null,
    distance: ((_autoGearConditionSec20 = autoGearConditionSections.distance) === null || _autoGearConditionSec20 === void 0 ? void 0 : _autoGearConditionSec20.querySelector('.auto-gear-condition-add')) || null
  };
  var autoGearConditionRemoveButtons = {
    always: ((_autoGearConditionSec21 = autoGearConditionSections.always) === null || _autoGearConditionSec21 === void 0 ? void 0 : _autoGearConditionSec21.querySelector('.auto-gear-condition-remove')) || null,
    scenarios: ((_autoGearConditionSec22 = autoGearConditionSections.scenarios) === null || _autoGearConditionSec22 === void 0 ? void 0 : _autoGearConditionSec22.querySelector('.auto-gear-condition-remove')) || null,
    shootingDays: ((_autoGearConditionSec23 = autoGearConditionSections.shootingDays) === null || _autoGearConditionSec23 === void 0 ? void 0 : _autoGearConditionSec23.querySelector('.auto-gear-condition-remove')) || null,
    mattebox: ((_autoGearConditionSec24 = autoGearConditionSections.mattebox) === null || _autoGearConditionSec24 === void 0 ? void 0 : _autoGearConditionSec24.querySelector('.auto-gear-condition-remove')) || null,
    cameraHandle: ((_autoGearConditionSec25 = autoGearConditionSections.cameraHandle) === null || _autoGearConditionSec25 === void 0 ? void 0 : _autoGearConditionSec25.querySelector('.auto-gear-condition-remove')) || null,
    viewfinderExtension: ((_autoGearConditionSec26 = autoGearConditionSections.viewfinderExtension) === null || _autoGearConditionSec26 === void 0 ? void 0 : _autoGearConditionSec26.querySelector('.auto-gear-condition-remove')) || null,
    deliveryResolution: ((_autoGearConditionSec27 = autoGearConditionSections.deliveryResolution) === null || _autoGearConditionSec27 === void 0 ? void 0 : _autoGearConditionSec27.querySelector('.auto-gear-condition-remove')) || null,
    videoDistribution: ((_autoGearConditionSec28 = autoGearConditionSections.videoDistribution) === null || _autoGearConditionSec28 === void 0 ? void 0 : _autoGearConditionSec28.querySelector('.auto-gear-condition-remove')) || null,
    camera: ((_autoGearConditionSec29 = autoGearConditionSections.camera) === null || _autoGearConditionSec29 === void 0 ? void 0 : _autoGearConditionSec29.querySelector('.auto-gear-condition-remove')) || null,
    ownGear: ((_autoGearConditionSec30 = autoGearConditionSections.ownGear) === null || _autoGearConditionSec30 === void 0 ? void 0 : _autoGearConditionSec30.querySelector('.auto-gear-condition-remove')) || null,
    cameraWeight: ((_autoGearConditionSec31 = autoGearConditionSections.cameraWeight) === null || _autoGearConditionSec31 === void 0 ? void 0 : _autoGearConditionSec31.querySelector('.auto-gear-condition-remove')) || null,
    monitor: ((_autoGearConditionSec32 = autoGearConditionSections.monitor) === null || _autoGearConditionSec32 === void 0 ? void 0 : _autoGearConditionSec32.querySelector('.auto-gear-condition-remove')) || null,
    tripodHeadBrand: ((_autoGearConditionSec33 = autoGearConditionSections.tripodHeadBrand) === null || _autoGearConditionSec33 === void 0 ? void 0 : _autoGearConditionSec33.querySelector('.auto-gear-condition-remove')) || null,
    tripodBowl: ((_autoGearConditionSec34 = autoGearConditionSections.tripodBowl) === null || _autoGearConditionSec34 === void 0 ? void 0 : _autoGearConditionSec34.querySelector('.auto-gear-condition-remove')) || null,
    tripodTypes: ((_autoGearConditionSec35 = autoGearConditionSections.tripodTypes) === null || _autoGearConditionSec35 === void 0 ? void 0 : _autoGearConditionSec35.querySelector('.auto-gear-condition-remove')) || null,
    tripodSpreader: ((_autoGearConditionSec36 = autoGearConditionSections.tripodSpreader) === null || _autoGearConditionSec36 === void 0 ? void 0 : _autoGearConditionSec36.querySelector('.auto-gear-condition-remove')) || null,
    crewPresent: ((_autoGearConditionSec37 = autoGearConditionSections.crewPresent) === null || _autoGearConditionSec37 === void 0 ? void 0 : _autoGearConditionSec37.querySelector('.auto-gear-condition-remove')) || null,
    crewAbsent: ((_autoGearConditionSec38 = autoGearConditionSections.crewAbsent) === null || _autoGearConditionSec38 === void 0 ? void 0 : _autoGearConditionSec38.querySelector('.auto-gear-condition-remove')) || null,
    wireless: ((_autoGearConditionSec39 = autoGearConditionSections.wireless) === null || _autoGearConditionSec39 === void 0 ? void 0 : _autoGearConditionSec39.querySelector('.auto-gear-condition-remove')) || null,
    motors: ((_autoGearConditionSec40 = autoGearConditionSections.motors) === null || _autoGearConditionSec40 === void 0 ? void 0 : _autoGearConditionSec40.querySelector('.auto-gear-condition-remove')) || null,
    controllers: ((_autoGearConditionSec41 = autoGearConditionSections.controllers) === null || _autoGearConditionSec41 === void 0 ? void 0 : _autoGearConditionSec41.querySelector('.auto-gear-condition-remove')) || null,
    distance: ((_autoGearConditionSec42 = autoGearConditionSections.distance) === null || _autoGearConditionSec42 === void 0 ? void 0 : _autoGearConditionSec42.querySelector('.auto-gear-condition-remove')) || null
  };
  if (autoGearAddRuleBtn) {
    autoGearAddRuleBtn.setAttribute('aria-controls', 'autoGearEditor');
    autoGearAddRuleBtn.setAttribute('aria-expanded', autoGearEditor && !autoGearEditor.hidden ? 'true' : 'false');
  }
  if (autoGearEditor) {
    autoGearEditor.setAttribute('aria-hidden', autoGearEditor.hidden ? 'true' : 'false');
  }
  var autoGearRuleNameInput = document.getElementById('autoGearRuleName');
  var autoGearRuleNameLabel = document.getElementById('autoGearRuleNameLabel');
  var autoGearScenariosSelect = document.getElementById('autoGearScenarios');
  var autoGearScenariosLabel = document.getElementById('autoGearScenariosLabel');
  var autoGearScenarioModeSelectElement = document.getElementById('autoGearScenarioMode');
  var autoGearScenarioModeLabel = document.getElementById('autoGearScenarioModeLabel');
  var autoGearScenarioMultiplierContainer = document.getElementById('autoGearScenarioMultiplierContainer');
  var autoGearScenarioBaseSelect = document.getElementById('autoGearScenarioBase');
  var autoGearScenarioBaseLabel = document.getElementById('autoGearScenarioBaseLabel');
  var autoGearScenarioFactorInput = document.getElementById('autoGearScenarioFactor');
  var autoGearScenarioFactorLabel = document.getElementById('autoGearScenarioFactorLabel');
  var autoGearShootingDaysMode = document.getElementById('autoGearShootingDaysMode');
  var autoGearShootingDaysInput = document.getElementById('autoGearShootingDays');
  var autoGearShootingDaysLabel = document.getElementById('autoGearShootingDaysLabel');
  var autoGearShootingDaysHelp = document.getElementById('autoGearShootingDaysHelp');
  var autoGearShootingDaysValueLabel = document.getElementById('autoGearShootingDaysCountLabel');
  var autoGearMatteboxSelect = document.getElementById('autoGearMattebox');
  var autoGearMatteboxLabel = document.getElementById('autoGearMatteboxLabel');
  var autoGearMatteboxModeLabel = document.getElementById('autoGearMatteboxModeLabel');
  var autoGearMatteboxModeSelect = document.getElementById('autoGearMatteboxMode');
  var autoGearCameraHandleSelect = document.getElementById('autoGearCameraHandle');
  var autoGearCameraHandleLabel = document.getElementById('autoGearCameraHandleLabel');
  var autoGearCameraHandleModeLabel = document.getElementById('autoGearCameraHandleModeLabel');
  var autoGearCameraHandleModeSelect = document.getElementById('autoGearCameraHandleMode');
  var autoGearViewfinderExtensionSelect = document.getElementById('autoGearViewfinderExtension');
  var autoGearViewfinderExtensionLabel = document.getElementById('autoGearViewfinderExtensionLabel');
  var autoGearViewfinderExtensionModeLabel = document.getElementById('autoGearViewfinderExtensionModeLabel');
  var autoGearViewfinderExtensionModeSelect = document.getElementById('autoGearViewfinderExtensionMode');
  var autoGearDeliveryResolutionSelect = document.getElementById('autoGearDeliveryResolution');
  var autoGearDeliveryResolutionLabel = document.getElementById('autoGearDeliveryResolutionLabel');
  var autoGearDeliveryResolutionModeLabel = document.getElementById('autoGearDeliveryResolutionModeLabel');
  var autoGearDeliveryResolutionModeSelect = document.getElementById('autoGearDeliveryResolutionMode');
  var autoGearVideoDistributionSelect = document.getElementById('autoGearVideoDistribution');
  var autoGearVideoDistributionLabel = document.getElementById('autoGearVideoDistributionLabel');
  var autoGearVideoDistributionModeLabel = document.getElementById('autoGearVideoDistributionModeLabel');
  var autoGearVideoDistributionModeSelect = document.getElementById('autoGearVideoDistributionMode');
  var autoGearCameraSelect = document.getElementById('autoGearCamera');
  var autoGearCameraLabel = document.getElementById('autoGearCameraLabel');
  var autoGearCameraModeLabel = document.getElementById('autoGearCameraModeLabel');
  var autoGearCameraModeSelect = document.getElementById('autoGearCameraMode');
  var autoGearOwnGearLabel = document.getElementById('autoGearOwnGearLabel');
  var autoGearOwnGearModeLabel = document.getElementById('autoGearOwnGearModeLabel');
  var autoGearOwnGearModeSelect = document.getElementById('autoGearOwnGearMode');
  var autoGearOwnGearSelect = document.getElementById('autoGearOwnGear');
  var autoGearCameraWeightLabel = document.getElementById('autoGearCameraWeightLabel');
  var autoGearCameraWeightOperator = document.getElementById('autoGearCameraWeightOperator');
  var autoGearCameraWeightOperatorLabel = document.getElementById('autoGearCameraWeightOperatorLabel');
  var autoGearCameraWeightValueInput = document.getElementById('autoGearCameraWeightValue');
  var autoGearCameraWeightValueLabel = document.getElementById('autoGearCameraWeightValueLabel');
  var autoGearCameraWeightHelp = document.getElementById('autoGearCameraWeightHelp');
  var autoGearMonitorSelect = document.getElementById('autoGearMonitor');
  var autoGearMonitorLabel = document.getElementById('autoGearMonitorLabel');
  var autoGearMonitorModeLabel = document.getElementById('autoGearMonitorModeLabel');
  var autoGearMonitorModeSelect = document.getElementById('autoGearMonitorMode');
  var autoGearTripodHeadBrandSelect = document.getElementById('autoGearTripodHeadBrand');
  var autoGearTripodHeadBrandLabel = document.getElementById('autoGearTripodHeadBrandLabel');
  var autoGearTripodHeadBrandModeLabel = document.getElementById('autoGearTripodHeadBrandModeLabel');
  var autoGearTripodHeadBrandModeSelect = document.getElementById('autoGearTripodHeadBrandMode');
  var autoGearTripodBowlSelect = document.getElementById('autoGearTripodBowl');
  var autoGearTripodBowlLabel = document.getElementById('autoGearTripodBowlLabel');
  var autoGearTripodBowlModeLabel = document.getElementById('autoGearTripodBowlModeLabel');
  var autoGearTripodBowlModeSelect = document.getElementById('autoGearTripodBowlMode');
  var autoGearTripodTypesSelect = document.getElementById('autoGearTripodTypes');
  var autoGearTripodTypesLabel = document.getElementById('autoGearTripodTypesLabel');
  var autoGearTripodTypesModeLabel = document.getElementById('autoGearTripodTypesModeLabel');
  var autoGearTripodTypesModeSelect = document.getElementById('autoGearTripodTypesMode');
  var autoGearTripodSpreaderSelect = document.getElementById('autoGearTripodSpreader');
  var autoGearTripodSpreaderLabel = document.getElementById('autoGearTripodSpreaderLabel');
  var autoGearTripodSpreaderModeLabel = document.getElementById('autoGearTripodSpreaderModeLabel');
  var autoGearTripodSpreaderModeSelect = document.getElementById('autoGearTripodSpreaderMode');
  var autoGearCrewPresentSelect = document.getElementById('autoGearCrewPresent');
  var autoGearCrewPresentLabel = document.getElementById('autoGearCrewPresentLabel');
  var autoGearCrewPresentModeLabel = document.getElementById('autoGearCrewPresentModeLabel');
  var autoGearCrewPresentModeSelect = document.getElementById('autoGearCrewPresentMode');
  var autoGearCrewAbsentSelect = document.getElementById('autoGearCrewAbsent');
  var autoGearCrewAbsentLabel = document.getElementById('autoGearCrewAbsentLabel');
  var autoGearCrewAbsentModeLabel = document.getElementById('autoGearCrewAbsentModeLabel');
  var autoGearCrewAbsentModeSelect = document.getElementById('autoGearCrewAbsentMode');
  var autoGearWirelessSelect = document.getElementById('autoGearWireless');
  var autoGearWirelessLabel = document.getElementById('autoGearWirelessLabel');
  var autoGearWirelessModeLabel = document.getElementById('autoGearWirelessModeLabel');
  var autoGearWirelessModeSelect = document.getElementById('autoGearWirelessMode');
  var autoGearMotorsSelect = document.getElementById('autoGearMotors');
  var autoGearMotorsLabel = document.getElementById('autoGearMotorsLabel');
  var autoGearMotorsModeLabel = document.getElementById('autoGearMotorsModeLabel');
  var autoGearMotorsModeSelect = document.getElementById('autoGearMotorsMode');
  var autoGearControllersSelect = document.getElementById('autoGearControllers');
  var autoGearControllersLabel = document.getElementById('autoGearControllersLabel');
  var autoGearControllersModeLabel = document.getElementById('autoGearControllersModeLabel');
  var autoGearControllersModeSelect = document.getElementById('autoGearControllersMode');
  var autoGearDistanceSelect = document.getElementById('autoGearDistance');
  var autoGearDistanceLabel = document.getElementById('autoGearDistanceLabel');
  var autoGearDistanceModeLabel = document.getElementById('autoGearDistanceModeLabel');
  var autoGearDistanceModeSelect = document.getElementById('autoGearDistanceMode');
  var autoGearConditionLabels = {
    always: autoGearAlwaysLabel,
    scenarios: autoGearScenariosLabel,
    shootingDays: autoGearShootingDaysLabel,
    mattebox: autoGearMatteboxLabel,
    cameraHandle: autoGearCameraHandleLabel,
    viewfinderExtension: autoGearViewfinderExtensionLabel,
    deliveryResolution: autoGearDeliveryResolutionLabel,
    videoDistribution: autoGearVideoDistributionLabel,
    camera: autoGearCameraLabel,
    ownGear: autoGearOwnGearLabel,
    cameraWeight: autoGearCameraWeightLabel,
    monitor: autoGearMonitorLabel,
    tripodHeadBrand: autoGearTripodHeadBrandLabel,
    tripodBowl: autoGearTripodBowlLabel,
    tripodTypes: autoGearTripodTypesLabel,
    tripodSpreader: autoGearTripodSpreaderLabel,
    crewPresent: autoGearCrewPresentLabel,
    crewAbsent: autoGearCrewAbsentLabel,
    wireless: autoGearWirelessLabel,
    motors: autoGearMotorsLabel,
    controllers: autoGearControllersLabel,
    distance: autoGearDistanceLabel
  };
  var autoGearConditionSelects = {
    always: null,
    scenarios: autoGearScenariosSelect,
    shootingDays: autoGearShootingDaysInput,
    mattebox: autoGearMatteboxSelect,
    cameraHandle: autoGearCameraHandleSelect,
    viewfinderExtension: autoGearViewfinderExtensionSelect,
    deliveryResolution: autoGearDeliveryResolutionSelect,
    videoDistribution: autoGearVideoDistributionSelect,
    camera: autoGearCameraSelect,
    ownGear: autoGearOwnGearSelect,
    cameraWeight: autoGearCameraWeightValueInput,
    monitor: autoGearMonitorSelect,
    tripodHeadBrand: autoGearTripodHeadBrandSelect,
    tripodBowl: autoGearTripodBowlSelect,
    tripodTypes: autoGearTripodTypesSelect,
    tripodSpreader: autoGearTripodSpreaderSelect,
    crewPresent: autoGearCrewPresentSelect,
    crewAbsent: autoGearCrewAbsentSelect,
    wireless: autoGearWirelessSelect,
    motors: autoGearMotorsSelect,
    controllers: autoGearControllersSelect,
    distance: autoGearDistanceSelect
  };
  var autoGearConditionLogicLabels = {
    mattebox: autoGearMatteboxModeLabel,
    cameraHandle: autoGearCameraHandleModeLabel,
    viewfinderExtension: autoGearViewfinderExtensionModeLabel,
    deliveryResolution: autoGearDeliveryResolutionModeLabel,
    videoDistribution: autoGearVideoDistributionModeLabel,
    camera: autoGearCameraModeLabel,
    ownGear: autoGearOwnGearModeLabel,
    monitor: autoGearMonitorModeLabel,
    tripodHeadBrand: autoGearTripodHeadBrandModeLabel,
    tripodBowl: autoGearTripodBowlModeLabel,
    tripodTypes: autoGearTripodTypesModeLabel,
    tripodSpreader: autoGearTripodSpreaderModeLabel,
    crewPresent: autoGearCrewPresentModeLabel,
    crewAbsent: autoGearCrewAbsentModeLabel,
    wireless: autoGearWirelessModeLabel,
    motors: autoGearMotorsModeLabel,
    controllers: autoGearControllersModeLabel,
    distance: autoGearDistanceModeLabel
  };
  var autoGearConditionLogicSelects = {
    mattebox: autoGearMatteboxModeSelect,
    cameraHandle: autoGearCameraHandleModeSelect,
    viewfinderExtension: autoGearViewfinderExtensionModeSelect,
    deliveryResolution: autoGearDeliveryResolutionModeSelect,
    videoDistribution: autoGearVideoDistributionModeSelect,
    camera: autoGearCameraModeSelect,
    ownGear: autoGearOwnGearModeSelect,
    monitor: autoGearMonitorModeSelect,
    tripodHeadBrand: autoGearTripodHeadBrandModeSelect,
    tripodBowl: autoGearTripodBowlModeSelect,
    tripodTypes: autoGearTripodTypesModeSelect,
    tripodSpreader: autoGearTripodSpreaderModeSelect,
    crewPresent: autoGearCrewPresentModeSelect,
    crewAbsent: autoGearCrewAbsentModeSelect,
    wireless: autoGearWirelessModeSelect,
    motors: autoGearMotorsModeSelect,
    controllers: autoGearControllersModeSelect,
    distance: autoGearDistanceModeSelect
  };
  Object.values(autoGearConditionLogicSelects).forEach(function (select) {
    if (select) select.disabled = true;
  });
  var AUTO_GEAR_CONDITION_KEYS = ['always', 'scenarios', 'shootingDays', 'mattebox', 'cameraHandle', 'viewfinderExtension', 'deliveryResolution', 'videoDistribution', 'camera', 'ownGear', 'cameraWeight', 'monitor', 'tripodHeadBrand', 'tripodBowl', 'tripodTypes', 'tripodSpreader', 'crewPresent', 'crewAbsent', 'wireless', 'motors', 'controllers', 'distance'];
  var AUTO_GEAR_REPEATABLE_CONDITIONS = new Set(['scenarios', 'mattebox', 'cameraHandle', 'viewfinderExtension', 'deliveryResolution', 'videoDistribution', 'camera', 'ownGear', 'monitor', 'tripodHeadBrand', 'tripodBowl', 'tripodTypes', 'tripodSpreader', 'crewPresent', 'crewAbsent', 'wireless', 'motors', 'controllers', 'distance']);
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
  var currentLang = DEFAULT_LANGUAGE;
  var updateHelpQuickLinksForLanguage;
  var updateHelpResultsSummaryText;
  var lastRuntimeHours = null;
  try {
    var savedLang = localStorage.getItem("language");
    var resolvedSaved = resolveLanguagePreference(savedLang);
    if (savedLang && resolvedSaved.matched) {
      currentLang = resolvedSaved.language;
    } else if (typeof navigator !== "undefined") {
      var navLangs = Array.isArray(navigator.languages) ? navigator.languages : [navigator.language];
      var _iterator2 = _createForOfIteratorHelper(navLangs),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var lang = _step2.value;
          var resolvedNavigator = resolveLanguagePreference(lang);
          if (resolvedNavigator.matched) {
            currentLang = resolvedNavigator.language;
            break;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (e) {
    console.warn("Could not load language from localStorage", e);
  }
  function setLanguage(lang) {
    var _texts$en35, _texts$en36, _texts$en37, _texts$en38, _texts$en39, _texts$en40, _texts$en41, _texts$en42, _texts$en43, _texts$en44, _texts$en45, _texts$en46, _texts$en47, _texts$en48, _texts$en49, _texts$en50, _texts$en51, _texts$en52, _texts$en53, _texts$en54, _texts$en158, _texts$en159, _texts$lang, _texts$en160, _texts$lang2, _texts$en161, _texts$lang3, _texts$en162, _texts$lang4, _texts$en163, _texts$en225;
    var requested = typeof lang === "string" ? lang : "";
    var resolved = resolveLanguagePreference(requested);
    var normalizedLang = resolved.language;
    if (!texts[normalizedLang]) {
      console.warn("Missing translation bundle for \"".concat(normalizedLang, "\". Falling back to ").concat(DEFAULT_LANGUAGE, "."));
      normalizedLang = DEFAULT_LANGUAGE;
    }
    if (requested && normalizedLang === DEFAULT_LANGUAGE && !resolved.matched && requested.slice(0, 2).toLowerCase() !== DEFAULT_LANGUAGE) {
      console.warn("Unsupported language preference \"".concat(requested, "\". Falling back to ").concat(DEFAULT_LANGUAGE, "."));
    }
    lang = normalizedLang;
    var previousLang = currentLang;
    currentLang = lang;
    var shouldDispatchLanguageChange = previousLang !== lang;
    var dispatchLanguageChange = function dispatchLanguageChange() {
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
    document.title = texts[lang].appTitle;
    document.getElementById("mainTitle").textContent = texts[lang].appTitle;
    document.getElementById("tagline").textContent = texts[lang].tagline;
    var doc = typeof document !== "undefined" ? document : null;
    var runtimeScope = getCoreGlobalObject();
    var fallbackLocale = texts[DEFAULT_LANGUAGE] || {};
    var resolveLocaleString = function resolveLocaleString(key) {
      if (!key) return "";
      var bundle = texts[lang];
      var value = bundle && typeof bundle[key] === "string" ? bundle[key] : null;
      if (value && value.trim()) {
        return value;
      }
      var fallbackValue = typeof fallbackLocale[key] === "string" ? fallbackLocale[key] : "";
      return fallbackValue;
    };
    var applyTextContent = function applyTextContent(element, key) {
      var fallbackValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      if (!element) return;
      var text = resolveLocaleString(key) || fallbackValue;
      element.textContent = text;
    };
    var createHelpLink = function createHelpLink(href, text) {
      var _ref35 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        target = _ref35.target,
        highlight = _ref35.highlight,
        _ref35$isButton = _ref35.isButton,
        isButton = _ref35$isButton === void 0 ? true : _ref35$isButton;
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
    var applySuggestionTemplate = function applySuggestionTemplate(element, key) {
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
    var applySuggestionText = function applySuggestionText(element, key) {
      if (!element) return;
      var text = resolveLocaleString(key);
      element.textContent = text;
      if (!text) {
        element.setAttribute("hidden", "");
      } else {
        element.removeAttribute("hidden");
      }
    };
    var resolveRuntimeValue = function resolveRuntimeValue(name) {
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
    var registerResolvedElement = function registerResolvedElement(globalName, element) {
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
    var resolveElement = function resolveElement(globalName, elementId) {
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
    var settingsShowAutoBackupsEl = resolveElement("settingsShowAutoBackups", "settingsShowAutoBackups");
    var backupSettingsButton = resolveElement("backupSettings", "backupSettings");
    var backupDiffToggleButtonEl = resolveElement("backupDiffToggleButton", "backupDiffToggleButton");
    var backupDiffHeadingEl = resolveElement("backupDiffHeading", "backupDiffHeading");
    var backupDiffIntroEl = resolveElement("backupDiffIntro", "backupDiffIntro");
    var backupDiffPrimaryLabelEl = resolveElement("backupDiffPrimaryLabel", "backupDiffPrimaryLabel");
    var backupDiffPrimarySelectEl = resolveElement("backupDiffPrimarySelect", "backupDiffPrimary");
    var backupDiffSecondaryLabelEl = resolveElement("backupDiffSecondaryLabel", "backupDiffSecondaryLabel");
    var backupDiffSecondarySelectEl = resolveElement("backupDiffSecondarySelect", "backupDiffSecondary");
    var backupDiffEmptyStateEl = resolveElement("backupDiffEmptyState", "backupDiffEmptyState");
    var backupDiffNotesLabelEl = resolveElement("backupDiffNotesLabel", "backupDiffNotesLabel");
    var backupDiffNotesEl = resolveElement("backupDiffNotes", "backupDiffNotes");
    var backupDiffExportButtonEl = resolveElement("backupDiffExportButton", "backupDiffExport");
    var backupDiffCloseButtonEl = resolveElement("backupDiffCloseButton", "backupDiffClose");
    var restoreRehearsalButton = resolveElement("restoreRehearsalButton", "restoreRehearsalButton");
    var restoreRehearsalHeading = resolveElement("restoreRehearsalHeading", "restoreRehearsalHeading");
    var restoreRehearsalIntro = resolveElement("restoreRehearsalIntro", "restoreRehearsalIntro");
    var restoreRehearsalModeLabel = resolveElement("restoreRehearsalModeLabel", "restoreRehearsalModeLabel");
    var restoreRehearsalModeBackupText = resolveElement("restoreRehearsalModeBackupText", "restoreRehearsalModeBackupText");
    var restoreRehearsalModeProjectText = resolveElement("restoreRehearsalModeProjectText", "restoreRehearsalModeProjectText");
    var restoreRehearsalFileLabel = resolveElement("restoreRehearsalFileLabel", "restoreRehearsalFileLabel");
    var restoreRehearsalBrowse = resolveElement("restoreRehearsalBrowse", "restoreRehearsalBrowse");
    var restoreRehearsalFileName = resolveElement("restoreRehearsalFileName", "restoreRehearsalFileName");
    var restoreRehearsalStatus = resolveElement("restoreRehearsalStatus", "restoreRehearsalStatus");
    var restoreRehearsalRuleHeading = resolveElement("restoreRehearsalRuleHeading", "restoreRehearsalRuleHeading");
    var restoreRehearsalRuleIntro = resolveElement("restoreRehearsalRuleIntro", "restoreRehearsalRuleIntro");
    var restoreRehearsalRuleEmpty = resolveElement("restoreRehearsalRuleEmpty", "restoreRehearsalRuleEmpty");
    var restoreRehearsalTableCaption = resolveElement("restoreRehearsalTableCaption", "restoreRehearsalTableCaption");
    var restoreRehearsalMetricHeader = resolveElement("restoreRehearsalMetricHeader", "restoreRehearsalMetricHeader");
    var restoreRehearsalLiveHeader = resolveElement("restoreRehearsalLiveHeader", "restoreRehearsalLiveHeader");
    var restoreRehearsalSandboxHeader = resolveElement("restoreRehearsalSandboxHeader", "restoreRehearsalSandboxHeader");
    var restoreRehearsalDifferenceHeader = resolveElement("restoreRehearsalDifferenceHeader", "restoreRehearsalDifferenceHeader");
    var restoreRehearsalCloseButton = resolveElement("restoreRehearsalCloseButton", "restoreRehearsalClose");
    var restoreRehearsalProceedButton = resolveElement("restoreRehearsalProceedButton", "restoreRehearsalProceed");
    var restoreRehearsalAbortButton = resolveElement("restoreRehearsalAbortButton", "restoreRehearsalAbort");
    if (skipLink) skipLink.textContent = texts[lang].skipToContent;
    var offlineElem = document.getElementById("offlineIndicator");
    if (offlineElem) {
      offlineElem.textContent = texts[lang].offlineIndicator;
      var offlineHelp = texts[lang].offlineIndicatorHelp || texts[lang].offlineIndicator;
      offlineElem.setAttribute("data-help", offlineHelp);
    }
    applyInstallTexts(lang);
    var legalLinks = LEGAL_LINKS[lang] || LEGAL_LINKS.en;
    var impressumElem = document.getElementById("impressumLink");
    if (impressumElem) {
      impressumElem.textContent = texts[lang].impressum;
      if (legalLinks !== null && legalLinks !== void 0 && legalLinks.imprint) {
        impressumElem.setAttribute("href", legalLinks.imprint);
      }
    }
    var privacyElem = document.getElementById("privacyLink");
    if (privacyElem) {
      privacyElem.textContent = texts[lang].privacy;
      if (legalLinks !== null && legalLinks !== void 0 && legalLinks.privacy) {
        privacyElem.setAttribute("href", legalLinks.privacy);
      }
    }
    var setupManageHeadingElem = document.getElementById("setupManageHeading");
    setupManageHeadingElem.textContent = texts[lang].setupManageHeading;
    setupManageHeadingElem.setAttribute("data-help", texts[lang].setupManageHeadingHelp);
    var deviceSelectionHeadingElem = document.getElementById("deviceSelectionHeading");
    deviceSelectionHeadingElem.textContent = texts[lang].deviceSelectionHeading;
    deviceSelectionHeadingElem.setAttribute("data-help", texts[lang].deviceSelectionHeadingHelp);
    var resultsHeadingElem = document.getElementById("resultsHeading");
    resultsHeadingElem.textContent = texts[lang].resultsHeading;
    resultsHeadingElem.setAttribute("data-help", texts[lang].resultsHeadingHelp);
    var deviceManagerHeadingElem = document.getElementById("deviceManagerHeading");
    deviceManagerHeadingElem.textContent = texts[lang].deviceManagerHeading;
    deviceManagerHeadingElem.setAttribute("data-help", texts[lang].deviceManagerHeadingHelp);
    var batteryComparisonHeadingElem = document.getElementById("batteryComparisonHeading");
    var batteryComparisonDescriptionElem = document.getElementById("batteryComparisonDescription");
    var batteryTableElem = document.getElementById("batteryTable");
    var setupDiagramHeadingElem = document.getElementById("setupDiagramHeading");
    setupDiagramHeadingElem.textContent = texts[lang].setupDiagramHeading;
    setupDiagramHeadingElem.setAttribute("data-help", texts[lang].setupDiagramHeadingHelp);
    var sideMenuLinks = document.querySelectorAll("#sideMenu [data-nav-key]");
    sideMenuLinks.forEach(function (link) {
      var navKey = link.dataset.navKey;
      if (!navKey) {
        return;
      }
      var label = texts[lang][navKey];
      if (label) {
        if (navKey === 'contactsNav' && typeof setButtonLabelWithIcon === 'function' && (link === null || link === void 0 ? void 0 : link.tagName) === 'BUTTON') {
          setButtonLabelWithIcon(link, label, _typeof(ICON_GLYPHS) === 'object' && ICON_GLYPHS && ICON_GLYPHS.contacts ? ICON_GLYPHS.contacts : iconGlyph("\\uF404", ICON_FONT_KEYS.UICONS));
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
        link.removeAttribute("title");
        link.removeAttribute("data-help");
      }
    });
    applyOwnGearLocalization(lang);
    var savedSetupsLabelElem = document.getElementById("savedSetupsLabel");
    savedSetupsLabelElem.textContent = texts[lang].savedSetupsLabel;
    savedSetupsLabelElem.setAttribute("data-help", texts[lang].setupSelectHelp);
    var setupNameLabelElem = document.getElementById("setupNameLabel");
    setupNameLabelElem.textContent = texts[lang].setupNameLabel;
    setupNameLabelElem.setAttribute("data-help", texts[lang].setupNameHelp);
    setButtonLabelWithIcon(deleteSetupBtn, texts[lang].deleteSetupBtn, ICON_GLYPHS.trash);
    var sharedLinkLabelElem = document.getElementById("sharedLinkLabel");
    sharedLinkLabelElem.textContent = texts[lang].sharedLinkLabel;
    sharedLinkLabelElem.setAttribute("data-help", texts[lang].sharedLinkHelp);
    setButtonLabelWithIcon(applySharedLinkBtn, texts[lang].loadSharedLinkBtn, ICON_GLYPHS.fileImport);
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
    var deleteGearListHelp = texts[lang].deleteGearListBtnHelp || texts[lang].deleteGearListBtn;
    if (deleteGearListProjectBtn) {
      setButtonLabelWithIcon(deleteGearListProjectBtn, texts[lang].deleteGearListBtn, ICON_GLYPHS.trash);
      deleteGearListProjectBtn.setAttribute("title", deleteGearListHelp);
      deleteGearListProjectBtn.setAttribute("data-help", deleteGearListHelp);
      deleteGearListProjectBtn.setAttribute("aria-label", deleteGearListHelp);
    }
    var editProjectBtnElem = document.getElementById("editProjectBtn");
    if (editProjectBtnElem) {
      editProjectBtnElem.textContent = texts[lang].editProjectBtn;
      editProjectBtnElem.setAttribute("title", texts[lang].editProjectBtn);
      editProjectBtnElem.setAttribute("data-help", texts[lang].editProjectBtn);
    }
    var addExtraGearBtnElem = document.getElementById("addExtraGearBtn");
    if (addExtraGearBtnElem) {
      var _texts$en10;
      var extraLabel = texts[lang].addExtraGearBtn || ((_texts$en10 = texts.en) === null || _texts$en10 === void 0 ? void 0 : _texts$en10.addExtraGearBtn) || "Add temporary extra gear";
      addExtraGearBtnElem.textContent = extraLabel;
      addExtraGearBtnElem.setAttribute("title", extraLabel);
      addExtraGearBtnElem.setAttribute("data-help", extraLabel);
    }
    shareSetupBtn.setAttribute("title", texts[lang].shareSetupBtn);
    shareSetupBtn.setAttribute("data-help", texts[lang].shareSetupHelp);
    if (shareDialogHeadingElem) {
      var _texts$en11;
      var heading = texts[lang].shareDialogTitle || ((_texts$en11 = texts.en) === null || _texts$en11 === void 0 ? void 0 : _texts$en11.shareDialogTitle) || shareDialogHeadingElem.textContent;
      shareDialogHeadingElem.textContent = heading;
    }
    if (shareFilenameLabelElem) {
      var _texts$en12;
      var filenameLabel = texts[lang].shareFilenameLabel || ((_texts$en12 = texts.en) === null || _texts$en12 === void 0 ? void 0 : _texts$en12.shareFilenameLabel) || shareFilenameLabelElem.textContent;
      shareFilenameLabelElem.textContent = filenameLabel;
    }
    if (shareConfirmBtn) {
      var _texts$en13;
      var confirmLabel = texts[lang].shareDialogConfirm || ((_texts$en13 = texts.en) === null || _texts$en13 === void 0 ? void 0 : _texts$en13.shareDialogConfirm) || shareConfirmBtn.textContent;
      setButtonLabelWithIcon(shareConfirmBtn, confirmLabel, ICON_GLYPHS.fileExport);
      shareConfirmBtn.setAttribute('title', confirmLabel);
      shareConfirmBtn.setAttribute('aria-label', confirmLabel);
      shareConfirmBtn.setAttribute('data-help', texts[lang].shareSetupHelp);
    }
    if (shareCancelBtn) {
      var _texts$en14;
      var cancelLabel = texts[lang].shareDialogCancel || ((_texts$en14 = texts.en) === null || _texts$en14 === void 0 ? void 0 : _texts$en14.shareDialogCancel) || shareCancelBtn.textContent;
      setButtonLabelWithIcon(shareCancelBtn, cancelLabel, ICON_GLYPHS.circleX);
      shareCancelBtn.setAttribute('title', cancelLabel);
      shareCancelBtn.setAttribute('aria-label', cancelLabel);
    }
    if (shareIncludeAutoGearText) {
      var _texts$en15, _texts$en16;
      var label = texts[lang].shareIncludeAutoGearLabel || ((_texts$en15 = texts.en) === null || _texts$en15 === void 0 ? void 0 : _texts$en15.shareIncludeAutoGearLabel) || shareIncludeAutoGearText.textContent;
      shareIncludeAutoGearText.textContent = label;
      var help = texts[lang].shareIncludeAutoGearHelp || ((_texts$en16 = texts.en) === null || _texts$en16 === void 0 ? void 0 : _texts$en16.shareIncludeAutoGearHelp) || label;
      if (shareIncludeAutoGearLabelElem) {
        shareIncludeAutoGearLabelElem.setAttribute('data-help', help);
      }
      if (shareIncludeAutoGearCheckbox) {
        shareIncludeAutoGearCheckbox.setAttribute('aria-label', label);
      }
    }
    var sharedImportLegendText = sharedImportLegend ? sharedImportLegend.textContent : '';
    if (sharedImportDialogHeading) {
      var _texts$en17;
      var title = texts[lang].sharedImportDialogTitle || ((_texts$en17 = texts.en) === null || _texts$en17 === void 0 ? void 0 : _texts$en17.sharedImportDialogTitle) || sharedImportDialogHeading.textContent;
      sharedImportDialogHeading.textContent = title;
    }
    if (sharedImportDialogMessage) {
      var _texts$en18;
      var message = texts[lang].sharedImportDialogMessage || ((_texts$en18 = texts.en) === null || _texts$en18 === void 0 ? void 0 : _texts$en18.sharedImportDialogMessage) || sharedImportDialogMessage.textContent;
      sharedImportDialogMessage.textContent = message;
      sharedImportDialogMessage.setAttribute('data-help', message);
    }
    if (sharedImportConfirmBtn) {
      var _texts$en19;
      var _label3 = texts[lang].sharedImportDialogConfirm || ((_texts$en19 = texts.en) === null || _texts$en19 === void 0 ? void 0 : _texts$en19.sharedImportDialogConfirm) || sharedImportConfirmBtn.textContent;
      setButtonLabelWithIcon(sharedImportConfirmBtn, _label3, ICON_GLYPHS.check);
      sharedImportConfirmBtn.setAttribute('data-help', _label3);
    }
    if (sharedImportCancelBtn) {
      var _texts$en20;
      var _label4 = texts[lang].sharedImportDialogCancel || ((_texts$en20 = texts.en) === null || _texts$en20 === void 0 ? void 0 : _texts$en20.sharedImportDialogCancel) || sharedImportCancelBtn.textContent;
      setButtonLabelWithIcon(sharedImportCancelBtn, _label4, ICON_GLYPHS.circleX);
      sharedImportCancelBtn.setAttribute('data-help', _label4);
    }
    if (sharedImportLegend) {
      var _texts$en21;
      var legend = texts[lang].sharedImportAutoGearLabel || ((_texts$en21 = texts.en) === null || _texts$en21 === void 0 ? void 0 : _texts$en21.sharedImportAutoGearLabel) || sharedImportLegend.textContent;
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
      var _texts$en22, _texts$en23;
      var _label5 = texts[lang].sharedImportAutoGearNone || ((_texts$en22 = texts.en) === null || _texts$en22 === void 0 ? void 0 : _texts$en22.sharedImportAutoGearNone) || sharedImportModeNoneOption.textContent;
      sharedImportModeNoneOption.textContent = _label5;
      var _help = texts[lang].sharedImportAutoGearNoneHelp || ((_texts$en23 = texts.en) === null || _texts$en23 === void 0 ? void 0 : _texts$en23.sharedImportAutoGearNoneHelp) || _label5;
      sharedImportModeNoneOption.setAttribute('data-help', _help);
      sharedImportModeNoneOption.setAttribute('title', _help);
      sharedImportModeNoneOption.setAttribute('aria-label', _label5);
    }
    if (sharedImportModeProjectOption) {
      var _texts$en24, _texts$en25;
      var _label6 = texts[lang].sharedImportAutoGearProject || ((_texts$en24 = texts.en) === null || _texts$en24 === void 0 ? void 0 : _texts$en24.sharedImportAutoGearProject) || sharedImportModeProjectOption.textContent;
      sharedImportModeProjectOption.textContent = _label6;
      var _help2 = texts[lang].sharedImportAutoGearProjectHelp || ((_texts$en25 = texts.en) === null || _texts$en25 === void 0 ? void 0 : _texts$en25.sharedImportAutoGearProjectHelp) || _label6;
      sharedImportModeProjectOption.setAttribute('data-help', _help2);
      sharedImportModeProjectOption.setAttribute('title', _help2);
      sharedImportModeProjectOption.setAttribute('aria-label', _label6);
    }
    if (sharedImportModeGlobalOption) {
      var _texts$en26, _texts$en27;
      var _label7 = texts[lang].sharedImportAutoGearGlobal || ((_texts$en26 = texts.en) === null || _texts$en26 === void 0 ? void 0 : _texts$en26.sharedImportAutoGearGlobal) || sharedImportModeGlobalOption.textContent;
      sharedImportModeGlobalOption.textContent = _label7;
      var _help3 = texts[lang].sharedImportAutoGearGlobalHelp || ((_texts$en27 = texts.en) === null || _texts$en27 === void 0 ? void 0 : _texts$en27.sharedImportAutoGearGlobalHelp) || _label7;
      sharedImportModeGlobalOption.setAttribute('data-help', _help3);
      sharedImportModeGlobalOption.setAttribute('title', _help3);
      sharedImportModeGlobalOption.setAttribute('aria-label', _label7);
    }
    applySharedLinkBtn.setAttribute("title", texts[lang].loadSharedLinkBtn);
    applySharedLinkBtn.setAttribute("data-help", texts[lang].applySharedLinkHelp);
    runtimeFeedbackBtn.setAttribute("title", texts[lang].runtimeFeedbackBtn);
    runtimeFeedbackBtn.setAttribute("data-help", texts[lang].runtimeFeedbackBtnHelp);
    setButtonLabelWithIcon(runtimeFeedbackBtn, texts[lang].runtimeFeedbackBtn, ICON_GLYPHS.feedback);
    if (setupSelect.options.length > 0) {
      setupSelect.options[0].textContent = texts[lang].newSetupOption;
    }
    checkSetupChanged();
    var cameraLabelElem = document.getElementById("cameraLabel");
    cameraLabelElem.textContent = texts[lang].cameraLabel;
    cameraLabelElem.setAttribute("data-help", texts[lang].cameraSelectHelp);
    var monitorLabelElem = document.getElementById("monitorLabel");
    monitorLabelElem.textContent = texts[lang].monitorLabel;
    monitorLabelElem.setAttribute("data-help", texts[lang].monitorSelectHelp);
    var videoLabelElem = document.getElementById("videoLabel");
    videoLabelElem.textContent = texts[lang].videoLabel;
    videoLabelElem.setAttribute("data-help", texts[lang].videoSelectHelp);
    var cageLabelElem = document.getElementById("cageLabel");
    if (cageLabelElem) {
      cageLabelElem.textContent = texts[lang].cageLabel;
      cageLabelElem.setAttribute("data-help", texts[lang].cageSelectHelp);
    }
    var distanceLabelElem = document.getElementById("distanceLabel");
    distanceLabelElem.textContent = texts[lang].distanceLabel;
    distanceLabelElem.setAttribute("data-help", texts[lang].distanceSelectHelp);
    var batteryPlateLabelElem = document.getElementById("batteryPlateLabel");
    batteryPlateLabelElem.textContent = texts[lang].batteryPlateLabel;
    batteryPlateLabelElem.setAttribute("data-help", texts[lang].batteryPlateSelectHelp);
    var batteryHotswapLabelElem = document.getElementById("batteryHotswapLabel");
    if (batteryHotswapLabelElem) {
      batteryHotswapLabelElem.textContent = texts[lang].batteryHotswapLabel;
      batteryHotswapLabelElem.setAttribute("data-help", texts[lang].batteryHotswapSelectHelp);
    }
    updateBatteryLabel();
    var fizLegendElem = document.getElementById("fizLegend");
    if (fizLegendElem) {
      fizLegendElem.textContent = texts[lang].fizLegend;
      fizLegendElem.setAttribute("data-help", texts[lang].fizLegendHelp);
    }
    var fizMotorsLabelElem = document.getElementById("fizMotorsLabel");
    if (fizMotorsLabelElem) {
      fizMotorsLabelElem.textContent = texts[lang].fizMotorsLabel;
      fizMotorsLabelElem.setAttribute("data-help", texts[lang].fizMotorsHelp);
    }
    var fizControllersLabelElem = document.getElementById("fizControllersLabel");
    if (fizControllersLabelElem) {
      fizControllersLabelElem.textContent = texts[lang].fizControllersLabel;
      fizControllersLabelElem.setAttribute("data-help", texts[lang].fizControllersHelp);
    }
    document.querySelectorAll('#motorNotesLabel,#controllerNotesLabel,#distanceNotesLabel').forEach(function (el) {
      el.textContent = texts[lang].notesLabel;
    });
    var cineResultsModule = (typeof cineResults === "undefined" ? "undefined" : _typeof(cineResults)) === 'object' ? cineResults : null;
    var resultsLocalizationApplied = false;
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
          setButtonLabelWithIcon: typeof setButtonLabelWithIcon === 'function' ? setButtonLabelWithIcon : null,
          iconGlyphs: typeof ICON_GLYPHS !== 'undefined' ? ICON_GLYPHS : null
        });
      } catch (cineResultsError) {
        console.warn('cineResults.localizeResultsSection failed', cineResultsError);
        resultsLocalizationApplied = false;
      }
    }
    var batteryComparisonLocalized = false;
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
      var resultsPlainSummaryElem = document.getElementById("resultsPlainSummary");
      if (resultsPlainSummaryElem) {
        resultsPlainSummaryElem.setAttribute("data-help", texts[lang].resultsPlainSummaryHelp);
      }
      var resultsPlainSummaryTitleElem = document.getElementById("resultsPlainSummaryTitle");
      if (resultsPlainSummaryTitleElem) {
        resultsPlainSummaryTitleElem.textContent = texts[lang].resultsPlainSummaryTitle;
      }
      var resultsPlainSummaryTextElem = document.getElementById("resultsPlainSummaryText");
      if (resultsPlainSummaryTextElem) {
        resultsPlainSummaryTextElem.textContent = texts[lang].resultsPlainSummaryPrompt;
      }
      var resultsPlainSummaryNoteElem = document.getElementById("resultsPlainSummaryNote");
      if (resultsPlainSummaryNoteElem) {
        resultsPlainSummaryNoteElem.textContent = texts[lang].resultsPlainSummaryNote;
      }
      var breakdownListTarget = typeof breakdownListElem !== "undefined" && breakdownListElem ? breakdownListElem : document.getElementById('breakdownList');
      if (breakdownListTarget) {
        breakdownListTarget.setAttribute("data-help", texts[lang].breakdownListHelp);
      }
      var totalPowerLabelElem = document.getElementById("totalPowerLabel");
      totalPowerLabelElem.textContent = texts[lang].totalPowerLabel;
      totalPowerLabelElem.setAttribute("data-help", texts[lang].totalPowerHelp);
      refreshTotalCurrentLabels(lang);
      updateMountVoltageSettingLabels(lang);
      var batteryCountLabelElem = document.getElementById("batteryCountLabel");
      batteryCountLabelElem.textContent = texts[lang].batteryCountLabel;
      batteryCountLabelElem.setAttribute("data-help", texts[lang].batteryCountHelp);
      if (pinWarnElem) pinWarnElem.setAttribute("data-help", texts[lang].pinWarningHelp);
      if (dtapWarnElem) dtapWarnElem.setAttribute("data-help", texts[lang].dtapWarningHelp);
      if (hotswapWarnElem) hotswapWarnElem.setAttribute("data-help", texts[lang].hotswapWarningHelp);
      if (powerWarningTitleElem) powerWarningTitleElem.textContent = texts[lang].powerWarningTitle;
      if (powerWarningLimitsHeadingElem) powerWarningLimitsHeadingElem.textContent = texts[lang].powerWarningLimitsHeading;
      if (powerWarningAdviceElem) powerWarningAdviceElem.textContent = texts[lang].powerWarningAdvice;
      if (powerWarningCloseBtn) setButtonLabelWithIcon(powerWarningCloseBtn, texts[lang].powerWarningClose, ICON_GLYPHS.check);
      var unitElem = document.getElementById("batteryLifeUnit");
      if (unitElem) unitElem.textContent = texts[lang].batteryLifeUnit;
      var fb = renderFeedbackTable(getCurrentSetupKey());
      if (batteryLifeLabelElem) {
        var _label8 = texts[lang].batteryLifeLabel;
        if (fb) {
          var userNote = texts[lang].runtimeUserCountNote.replace('{count}', fb.count);
          var idx = _label8.indexOf(')');
          if (idx !== -1) {
            _label8 = "".concat(_label8.slice(0, idx), ", ").concat(userNote).concat(_label8.slice(idx));
          }
        }
        batteryLifeLabelElem.textContent = _label8;
        batteryLifeLabelElem.setAttribute("data-help", texts[lang].batteryLifeHelp);
      }
      if (runtimeAverageNoteElem) {
        runtimeAverageNoteElem.textContent = fb && fb.count > 4 ? texts[lang].runtimeAverageNote : '';
      }
      dispatchTemperatureNoteRender(lastRuntimeHours);
      refreshFeedbackTemperatureLabel(lang, temperatureUnit);
      updateFeedbackTemperatureOptions(lang, temperatureUnit);
      var tempNoteElem = document.getElementById("temperatureNote");
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
    var lensDeviceMountHeadingElem = document.getElementById("lensDeviceMountHeading");
    if (lensDeviceMountHeadingElem) {
      lensDeviceMountHeadingElem.textContent = texts[lang].lensDeviceMountHeading;
    }
    var lensDeviceMountLabelElem = document.getElementById("lensDeviceMountLabel");
    if (lensDeviceMountLabelElem) {
      lensDeviceMountLabelElem.textContent = texts[lang].lensDeviceMountLabel;
      lensDeviceMountLabelElem.setAttribute('data-help', texts[lang].lensDeviceMountHelp);
    }
    var lensFocusScaleLabelElem = document.getElementById("lensFocusScaleUnitLabel");
    if (lensFocusScaleLabelElem) {
      var focusScaleLabel = texts[lang].lensFocusScaleLabel || texts[lang].focusScaleSetting;
      var focusScaleHelp = texts[lang].lensFocusScaleHelp || texts[lang].lensFocusScaleLabel || texts[lang].focusScaleSettingHelp || focusScaleLabel;
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
    document.getElementById("monitorLatencyLabel").textContent = texts[lang].monitorLatencyLabel;
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
    document.getElementById("viewfinderLatencyLabel").textContent = texts[lang].viewfinderLatencyLabel;
    document.getElementById("videoVideoInputsHeading").textContent = texts[lang].videoVideoInputsHeading;
    document.getElementById("videoVideoInputsLabel").textContent = texts[lang].videoVideoInputsLabel;
    document.getElementById("videoVideoOutputsHeading").textContent = texts[lang].videoVideoOutputsHeading;
    document.getElementById("videoVideoOutputsLabel").textContent = texts[lang].videoVideoOutputsLabel;
    document.getElementById("monitorDetailsHeading").textContent = texts[lang].monitorDetailsHeading;
    document.getElementById("monitorPowerHeading").textContent = texts[lang].monitorPowerHeading;
    var addDeviceLabel = texts[lang].addDeviceBtn;
    var updateDeviceLabel = texts[lang].updateDeviceBtn;
    if (addDeviceBtn.dataset.mode === "edit") {
      setButtonLabelWithIcon(addDeviceBtn, updateDeviceLabel, ICON_GLYPHS.save);
      addDeviceBtn.setAttribute('data-help', texts[lang].updateDeviceBtnHelp);
    } else {
      setButtonLabelWithIcon(addDeviceBtn, addDeviceLabel, ICON_GLYPHS.add);
      addDeviceBtn.setAttribute('data-help', texts[lang].addDeviceBtnHelp);
    }
    setButtonLabelWithIcon(cancelEditBtn, texts[lang].cancelEditBtn, ICON_GLYPHS.circleX);
    cancelEditBtn.setAttribute('data-help', texts[lang].cancelEditBtnHelp);
    setButtonLabelWithIcon(exportBtn, texts[lang].exportDataBtn, ICON_GLYPHS.fileExport);
    exportBtn.setAttribute('data-help', texts[lang].exportDataBtnHelp);
    setButtonLabelWithIcon(importDataBtn, texts[lang].importDataBtn, ICON_GLYPHS.fileImport);
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
      setButtonLabelWithIcon(toggleDeviceBtn, texts[lang].toggleDeviceManager, ICON_GLYPHS.gears);
      toggleDeviceBtn.setAttribute("title", texts[lang].toggleDeviceManager);
      toggleDeviceBtn.setAttribute("data-help", texts[lang].toggleDeviceManagerHelp);
      toggleDeviceBtn.setAttribute("aria-expanded", "false");
    } else {
      setButtonLabelWithIcon(toggleDeviceBtn, texts[lang].hideDeviceManager, ICON_GLYPHS.minus);
      toggleDeviceBtn.setAttribute("title", texts[lang].hideDeviceManager);
      toggleDeviceBtn.setAttribute("data-help", texts[lang].hideDeviceManagerHelp);
      toggleDeviceBtn.setAttribute("aria-expanded", "true");
    }
    Array.from(newCategorySelect.options).forEach(function (opt) {
      opt.textContent = getCategoryLabel(opt.value, lang);
    });
    var noneMap = {
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
    refreshDeviceLists();
    applyFilters();
    updateCalculations();
    var existingDevicesHeading = typeof document !== 'undefined' ? document.getElementById('existingDevicesHeading') : null;
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
    var settingsTitleElem = document.getElementById("settingsTitle");
    if (settingsTitleElem) {
      settingsTitleElem.textContent = texts[lang].settingsHeading;
      settingsTitleElem.setAttribute("data-help", texts[lang].settingsHeadingHelp || texts[lang].settingsHeading);
    }
    if (settingsTablist) {
      var _texts$en28;
      var sectionsLabel = texts[lang].settingsSectionsLabel || ((_texts$en28 = texts.en) === null || _texts$en28 === void 0 ? void 0 : _texts$en28.settingsSectionsLabel) || settingsTablist.getAttribute('aria-label') || texts[lang].settingsHeading || 'Settings sections';
      settingsTablist.setAttribute('aria-label', sectionsLabel);
    }
    var getSettingsTabLabelText = function getSettingsTabLabelText(button) {
      var _button$querySelector;
      if (!button || _typeof(button) !== 'object') return '';
      var labelNode = (_button$querySelector = button.querySelector) === null || _button$querySelector === void 0 ? void 0 : _button$querySelector.call(button, '.settings-tab-label');
      if (labelNode && typeof labelNode.textContent === 'string') {
        var trimmed = labelNode.textContent.trim();
        if (trimmed) return trimmed;
      }
      return typeof button.textContent === 'string' ? button.textContent.trim() : '';
    };
    var summarizeSettingsTabHelp = function summarizeSettingsTabHelp(helpText) {
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
    var applySettingsTabLabel = function applySettingsTabLabel(button, labelValue, helpValue) {
      var _button$querySelector2, _button$querySelector3;
      if (!button) return;
      var label = (labelValue || getSettingsTabLabelText(button) || '').trim();
      var labelElement = (_button$querySelector2 = button.querySelector) === null || _button$querySelector2 === void 0 ? void 0 : _button$querySelector2.call(button, '.settings-tab-label');
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
      var captionElement = (_button$querySelector3 = button.querySelector) === null || _button$querySelector3 === void 0 ? void 0 : _button$querySelector3.call(button, '.settings-tab-caption');
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
      var _texts$en29, _texts$en30;
      var generalLabel = texts[lang].settingsTabGeneral || ((_texts$en29 = texts.en) === null || _texts$en29 === void 0 ? void 0 : _texts$en29.settingsTabGeneral) || getSettingsTabLabelText(settingsTabGeneral) || 'General';
      var generalHelp = texts[lang].settingsTabGeneralHelp || ((_texts$en30 = texts.en) === null || _texts$en30 === void 0 ? void 0 : _texts$en30.settingsTabGeneralHelp) || texts[lang].settingsHeadingHelp || generalLabel;
      applySettingsTabLabel(settingsTabGeneral, generalLabel, generalHelp);
      if (generalSettingsHeading) {
        generalSettingsHeading.textContent = generalLabel;
        generalSettingsHeading.setAttribute('data-help', generalHelp);
      }
      if (generalLanguageHeading) {
        var _texts$en31;
        var sectionHeading = texts[lang].generalSectionLanguageHeading || ((_texts$en31 = texts.en) === null || _texts$en31 === void 0 ? void 0 : _texts$en31.generalSectionLanguageHeading) || generalLanguageHeading.textContent;
        generalLanguageHeading.textContent = sectionHeading;
      }
      if (generalAppearanceHeading) {
        var _texts$en32;
        var _sectionHeading = texts[lang].generalSectionAppearanceHeading || ((_texts$en32 = texts.en) === null || _texts$en32 === void 0 ? void 0 : _texts$en32.generalSectionAppearanceHeading) || generalAppearanceHeading.textContent;
        generalAppearanceHeading.textContent = _sectionHeading;
      }
      if (generalTypographyHeading) {
        var _texts$en33;
        var _sectionHeading2 = texts[lang].generalSectionTypographyHeading || ((_texts$en33 = texts.en) === null || _texts$en33 === void 0 ? void 0 : _texts$en33.generalSectionTypographyHeading) || generalTypographyHeading.textContent;
        generalTypographyHeading.textContent = _sectionHeading2;
      }
      if (generalBrandingHeading) {
        var _texts$en34;
        var _sectionHeading3 = texts[lang].generalSectionBrandingHeading || ((_texts$en34 = texts.en) === null || _texts$en34 === void 0 ? void 0 : _texts$en34.generalSectionBrandingHeading) || generalBrandingHeading.textContent;
        generalBrandingHeading.textContent = _sectionHeading3;
      }
    }
    applySettingsTabLabel(settingsTabAutoGear, texts[lang].settingsTabAutoGear || ((_texts$en35 = texts.en) === null || _texts$en35 === void 0 ? void 0 : _texts$en35.settingsTabAutoGear) || texts[lang].autoGearHeading || ((_texts$en36 = texts.en) === null || _texts$en36 === void 0 ? void 0 : _texts$en36.autoGearHeading), texts[lang].settingsTabAutoGearHelp || ((_texts$en37 = texts.en) === null || _texts$en37 === void 0 ? void 0 : _texts$en37.settingsTabAutoGearHelp) || texts[lang].autoGearHeadingHelp || ((_texts$en38 = texts.en) === null || _texts$en38 === void 0 ? void 0 : _texts$en38.autoGearHeadingHelp));
    applySettingsTabLabel(settingsTabAccessibility, texts[lang].settingsTabAccessibility || ((_texts$en39 = texts.en) === null || _texts$en39 === void 0 ? void 0 : _texts$en39.settingsTabAccessibility) || texts[lang].accessibilityHeading || ((_texts$en40 = texts.en) === null || _texts$en40 === void 0 ? void 0 : _texts$en40.accessibilityHeading), texts[lang].settingsTabAccessibilityHelp || ((_texts$en41 = texts.en) === null || _texts$en41 === void 0 ? void 0 : _texts$en41.settingsTabAccessibilityHelp) || texts[lang].accessibilityHeadingHelp || ((_texts$en42 = texts.en) === null || _texts$en42 === void 0 ? void 0 : _texts$en42.accessibilityHeadingHelp));
    applySettingsTabLabel(settingsTabBackup, texts[lang].settingsTabBackup || ((_texts$en43 = texts.en) === null || _texts$en43 === void 0 ? void 0 : _texts$en43.settingsTabBackup) || texts[lang].backupHeading || ((_texts$en44 = texts.en) === null || _texts$en44 === void 0 ? void 0 : _texts$en44.backupHeading), texts[lang].settingsTabBackupHelp || ((_texts$en45 = texts.en) === null || _texts$en45 === void 0 ? void 0 : _texts$en45.settingsTabBackupHelp) || texts[lang].backupHeadingHelp || ((_texts$en46 = texts.en) === null || _texts$en46 === void 0 ? void 0 : _texts$en46.backupHeadingHelp));
    applySettingsTabLabel(settingsTabData, texts[lang].settingsTabData || ((_texts$en47 = texts.en) === null || _texts$en47 === void 0 ? void 0 : _texts$en47.settingsTabData) || texts[lang].dataHeading || ((_texts$en48 = texts.en) === null || _texts$en48 === void 0 ? void 0 : _texts$en48.dataHeading), texts[lang].settingsTabDataHelp || ((_texts$en49 = texts.en) === null || _texts$en49 === void 0 ? void 0 : _texts$en49.settingsTabDataHelp) || texts[lang].dataHeadingHelp || ((_texts$en50 = texts.en) === null || _texts$en50 === void 0 ? void 0 : _texts$en50.dataHeadingHelp));
    applySettingsTabLabel(settingsTabAbout, texts[lang].settingsTabAbout || ((_texts$en51 = texts.en) === null || _texts$en51 === void 0 ? void 0 : _texts$en51.settingsTabAbout) || texts[lang].aboutHeading || ((_texts$en52 = texts.en) === null || _texts$en52 === void 0 ? void 0 : _texts$en52.aboutHeading), texts[lang].settingsTabAboutHelp || ((_texts$en53 = texts.en) === null || _texts$en53 === void 0 ? void 0 : _texts$en53.settingsTabAboutHelp) || texts[lang].aboutHeadingHelp || ((_texts$en54 = texts.en) === null || _texts$en54 === void 0 ? void 0 : _texts$en54.aboutHeadingHelp));
    var settingsLanguageLabel = document.getElementById("settingsLanguageLabel");
    if (settingsLanguageLabel) {
      settingsLanguageLabel.textContent = texts[lang].languageSetting;
      var languageHelp = texts[lang].settingsLanguageHelp || texts[lang].languageSetting;
      settingsLanguageLabel.setAttribute("data-help", languageHelp);
      if (settingsLanguage) {
        settingsLanguage.setAttribute("data-help", languageHelp);
        settingsLanguage.setAttribute("aria-label", texts[lang].languageSetting);
      }
    }
    var settingsDarkLabel = document.getElementById("settingsDarkModeLabel");
    if (settingsDarkLabel) {
      settingsDarkLabel.textContent = texts[lang].darkModeSetting;
      var darkModeHelp = texts[lang].settingsDarkModeHelp || texts[lang].darkModeSetting;
      settingsDarkLabel.setAttribute("data-help", darkModeHelp);
      if (settingsDarkMode) {
        settingsDarkMode.setAttribute("data-help", darkModeHelp);
        settingsDarkMode.setAttribute("aria-label", texts[lang].darkModeSetting);
      }
    }
    var settingsPinkLabel = document.getElementById("settingsPinkModeLabel");
    if (settingsPinkLabel) {
      settingsPinkLabel.textContent = texts[lang].pinkModeSetting;
      var pinkModeHelp = texts[lang].settingsPinkModeHelp || texts[lang].pinkModeSetting;
      settingsPinkLabel.setAttribute("data-help", pinkModeHelp);
      if (settingsPinkMode) {
        settingsPinkMode.setAttribute("data-help", pinkModeHelp);
        settingsPinkMode.setAttribute("aria-label", texts[lang].pinkModeSetting);
      }
    }
    var accentLabel = document.getElementById("accentColorLabel");
    var accentHelp = texts[lang].accentColorHelp || texts[lang].accentColorSetting;
    if (accentLabel) {
      accentLabel.textContent = texts[lang].accentColorSetting;
      accentLabel.setAttribute("data-help", accentHelp);
    }
    if (accentColorInput) {
      accentColorInput.setAttribute("data-help", accentHelp);
      accentColorInput.setAttribute("aria-label", texts[lang].accentColorSetting);
    }
    if (accentColorResetButton) {
      var accentResetLabel = texts[lang] && texts[lang].accentColorReset || texts.en && texts.en.accentColorReset || accentColorResetButton.textContent || 'Reset to default';
      var accentResetHelp = texts[lang] && texts[lang].accentColorResetHelp || accentHelp;
      accentColorResetButton.textContent = accentResetLabel;
      accentColorResetButton.setAttribute('data-help', accentResetHelp);
      accentColorResetButton.setAttribute('aria-label', accentResetHelp);
      accentColorResetButton.setAttribute('title', accentResetHelp);
    }
    var settingsTemperatureUnitLabel = document.getElementById('settingsTemperatureUnitLabel');
    if (settingsTemperatureUnitLabel) {
      settingsTemperatureUnitLabel.textContent = texts[lang].temperatureUnitSetting;
      var tempUnitHelp = texts[lang].temperatureUnitSettingHelp || texts[lang].temperatureUnitSetting;
      settingsTemperatureUnitLabel.setAttribute('data-help', tempUnitHelp);
      if (typeof settingsTemperatureUnit !== 'undefined' && settingsTemperatureUnit) {
        settingsTemperatureUnit.setAttribute('data-help', tempUnitHelp);
        settingsTemperatureUnit.setAttribute('aria-label', texts[lang].temperatureUnitSetting);
        Array.from(settingsTemperatureUnit.options || []).forEach(function (option) {
          if (!option) return;
          var normalized = normalizeTemperatureUnit(option.value);
          option.textContent = getTemperatureUnitLabelForLang(lang, normalized);
        });
        settingsTemperatureUnit.value = temperatureUnit;
      }
    }
    var settingsFocusScaleLabel = document.getElementById('settingsFocusScaleLabel');
    if (settingsFocusScaleLabel) {
      settingsFocusScaleLabel.textContent = texts[lang].focusScaleSetting;
      var _focusScaleHelp = texts[lang].focusScaleSettingHelp || texts[lang].focusScaleSetting;
      settingsFocusScaleLabel.setAttribute('data-help', _focusScaleHelp);
      if (typeof settingsFocusScale !== 'undefined' && settingsFocusScale) {
        settingsFocusScale.setAttribute('data-help', _focusScaleHelp);
        settingsFocusScale.setAttribute('aria-label', texts[lang].focusScaleSetting);
        Array.from(settingsFocusScale.options || []).forEach(function (option) {
          if (!option) return;
          var normalized = normalizeFocusScale(option.value);
          option.textContent = getFocusScaleLabelForLang(lang, normalized);
        });
        settingsFocusScale.value = focusScalePreference;
      }
    }
    var fontSizeLabel = document.getElementById("settingsFontSizeLabel");
    if (fontSizeLabel) {
      fontSizeLabel.textContent = texts[lang].fontSizeSetting;
      var sizeHelp = texts[lang].fontSizeSettingHelp || texts[lang].fontSizeSetting;
      fontSizeLabel.setAttribute("data-help", sizeHelp);
      if (settingsFontSize) {
        settingsFontSize.setAttribute("data-help", sizeHelp);
        settingsFontSize.setAttribute("aria-label", texts[lang].fontSizeSetting);
      }
    }
    var fontFamilyLabel = document.getElementById("settingsFontFamilyLabel");
    if (fontFamilyLabel) {
      fontFamilyLabel.textContent = texts[lang].fontFamilySetting;
      var familyHelp = texts[lang].fontFamilySettingHelp || texts[lang].fontFamilySetting;
      fontFamilyLabel.setAttribute("data-help", familyHelp);
      if (settingsFontFamily) {
        settingsFontFamily.setAttribute("data-help", familyHelp);
        settingsFontFamily.setAttribute("aria-label", texts[lang].fontFamilySetting);
      }
    }
    if (localFontsButton) {
      var localFontsHelp = texts[lang].localFontsButtonHelp || localFontsButton.textContent;
      localFontsButton.setAttribute("data-help", localFontsHelp);
      localFontsButton.setAttribute("title", localFontsHelp);
      localFontsButton.setAttribute("aria-label", localFontsHelp);
    }
    if (bundledFontGroup) {
      var builtInLabel = texts[lang] && texts[lang].bundledFontsGroup || texts.en && texts.en.bundledFontsGroup || bundledFontGroup.label;
      if (builtInLabel) bundledFontGroup.label = builtInLabel;
    }
    if (localFontsGroup) {
      var localLabel = texts[lang] && texts[lang].localFontsGroup || texts.en && texts.en.localFontsGroup || localFontsGroup.label;
      if (localLabel) localFontsGroup.label = localLabel;
    }
    if (localFontsButton) {
      var localFontsLabel = texts[lang] && texts[lang].localFontsButton || texts.en && texts.en.localFontsButton || localFontsButton.textContent;
      if (localFontsLabel) {
        setButtonLabelWithIcon(localFontsButton, localFontsLabel, ICON_GLYPHS.add);
        localFontsButton.setAttribute('aria-label', localFontsLabel);
        localFontsButton.setAttribute('title', localFontsLabel);
      }
    }
    if (localFontsStatus && localFontsStatus.dataset.statusKey) {
      var statusKey = localFontsStatus.dataset.statusKey;
      var arg = localFontsStatus.dataset.statusArg;
      var template = texts[lang] && texts[lang][statusKey] || texts.en && texts.en[statusKey] || '';
      if (template && arg !== undefined && arg !== null) {
        template = template.replace('%s', arg);
      } else if (!template && arg !== undefined && arg !== null) {
        template = arg;
      }
      localFontsStatus.textContent = template;
    }
    var settingsLogoLabel = document.getElementById("settingsLogoLabel");
    if (settingsLogoLabel) {
      settingsLogoLabel.textContent = texts[lang].logoSetting;
      var logoHelp = texts[lang].logoSettingHelp || texts[lang].logoSetting;
      settingsLogoLabel.setAttribute("data-help", logoHelp);
      if (settingsLogo) {
        settingsLogo.setAttribute("data-help", logoHelp);
        settingsLogo.setAttribute("aria-label", texts[lang].logoSetting);
      }
    }
    if (autoGearHeadingElem) {
      var _texts$en55, _texts$en56;
      autoGearHeadingElem.textContent = texts[lang].autoGearHeading || ((_texts$en55 = texts.en) === null || _texts$en55 === void 0 ? void 0 : _texts$en55.autoGearHeading) || 'Automatic Gear Rules';
      var headingHelp = texts[lang].autoGearHeadingHelp || ((_texts$en56 = texts.en) === null || _texts$en56 === void 0 ? void 0 : _texts$en56.autoGearHeadingHelp);
      if (headingHelp) autoGearHeadingElem.setAttribute('data-help', headingHelp);
    }
    if (autoGearDescriptionElem) {
      var _texts$en57;
      autoGearDescriptionElem.textContent = texts[lang].autoGearDescription || ((_texts$en57 = texts.en) === null || _texts$en57 === void 0 ? void 0 : _texts$en57.autoGearDescription) || '';
    }
    if (autoGearMonitorDefaultsHeading) {
      var _texts$en58;
      var _heading = texts[lang].autoGearMonitorDefaultsHeading || ((_texts$en58 = texts.en) === null || _texts$en58 === void 0 ? void 0 : _texts$en58.autoGearMonitorDefaultsHeading) || autoGearMonitorDefaultsHeading.textContent;
      autoGearMonitorDefaultsHeading.textContent = _heading;
    }
    if (autoGearMonitorDefaultsDescription) {
      var _texts$en59;
      var description = texts[lang].autoGearMonitorDefaultsDescription || ((_texts$en59 = texts.en) === null || _texts$en59 === void 0 ? void 0 : _texts$en59.autoGearMonitorDefaultsDescription) || autoGearMonitorDefaultsDescription.textContent;
      autoGearMonitorDefaultsDescription.textContent = description;
    }
    autoGearMonitorDefaultControls.forEach(function (control) {
      var _texts$en60, _control$label, _control$label2;
      if (!control) return;
      var labelKey = AUTO_GEAR_MONITOR_DEFAULT_LABEL_KEYS[control.key];
      var labelText = labelKey ? texts[lang][labelKey] || ((_texts$en60 = texts.en) === null || _texts$en60 === void 0 ? void 0 : _texts$en60[labelKey]) || ((_control$label = control.label) === null || _control$label === void 0 ? void 0 : _control$label.textContent) : (_control$label2 = control.label) === null || _control$label2 === void 0 ? void 0 : _control$label2.textContent;
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
      var _texts$en61;
      autoGearPresetDescription.textContent = texts[lang].autoGearPresetDescription || ((_texts$en61 = texts.en) === null || _texts$en61 === void 0 ? void 0 : _texts$en61.autoGearPresetDescription) || '';
    }
    if (autoGearPresetLabel) {
      var _texts$en62, _texts$en63;
      var _label9 = texts[lang].autoGearPresetLabel || ((_texts$en62 = texts.en) === null || _texts$en62 === void 0 ? void 0 : _texts$en62.autoGearPresetLabel) || autoGearPresetLabel.textContent;
      var _help4 = texts[lang].autoGearPresetDescription || ((_texts$en63 = texts.en) === null || _texts$en63 === void 0 ? void 0 : _texts$en63.autoGearPresetDescription) || _label9;
      autoGearPresetLabel.textContent = _label9;
      autoGearPresetLabel.setAttribute('data-help', _help4);
      if (autoGearPresetSelect) {
        autoGearPresetSelect.setAttribute('aria-label', _label9);
        autoGearPresetSelect.setAttribute('data-help', _help4);
      }
    }
    if (autoGearSavePresetButton) {
      var _texts$en64;
      var _label0 = texts[lang].autoGearSavePresetButton || ((_texts$en64 = texts.en) === null || _texts$en64 === void 0 ? void 0 : _texts$en64.autoGearSavePresetButton) || autoGearSavePresetButton.textContent;
      setButtonLabelWithIcon(autoGearSavePresetButton, _label0, ICON_GLYPHS.save);
      autoGearSavePresetButton.setAttribute('data-help', _label0);
      autoGearSavePresetButton.setAttribute('aria-label', _label0);
    }
    if (autoGearDeletePresetButton) {
      var _texts$en65;
      var _label1 = texts[lang].autoGearDeletePresetButton || ((_texts$en65 = texts.en) === null || _texts$en65 === void 0 ? void 0 : _texts$en65.autoGearDeletePresetButton) || autoGearDeletePresetButton.textContent;
      setButtonLabelWithIcon(autoGearDeletePresetButton, _label1, ICON_GLYPHS.trash);
      autoGearDeletePresetButton.setAttribute('data-help', _label1);
      autoGearDeletePresetButton.setAttribute('aria-label', _label1);
    }
    if (autoGearAddRuleBtn) {
      var _texts$en66, _texts$en67;
      var _label10 = texts[lang].autoGearAddRule || ((_texts$en66 = texts.en) === null || _texts$en66 === void 0 ? void 0 : _texts$en66.autoGearAddRule) || autoGearAddRuleBtn.textContent;
      setButtonLabelWithIcon(autoGearAddRuleBtn, _label10, ICON_GLYPHS.add);
      var _help5 = texts[lang].autoGearHeadingHelp || ((_texts$en67 = texts.en) === null || _texts$en67 === void 0 ? void 0 : _texts$en67.autoGearHeadingHelp) || _label10;
      autoGearAddRuleBtn.setAttribute('data-help', _help5);
    }
    if (autoGearResetFactoryButton) {
      var _texts$en68, _texts$en69;
      var _label11 = texts[lang].autoGearResetFactoryButton || ((_texts$en68 = texts.en) === null || _texts$en68 === void 0 ? void 0 : _texts$en68.autoGearResetFactoryButton) || autoGearResetFactoryButton.textContent;
      var _help6 = texts[lang].autoGearResetFactoryHelp || ((_texts$en69 = texts.en) === null || _texts$en69 === void 0 ? void 0 : _texts$en69.autoGearResetFactoryHelp) || _label11;
      setButtonLabelWithIcon(autoGearResetFactoryButton, _label11, ICON_GLYPHS.reload);
      autoGearResetFactoryButton.setAttribute('data-help', _help6);
      autoGearResetFactoryButton.setAttribute('title', _help6);
      autoGearResetFactoryButton.setAttribute('aria-label', _label11);
    }
    if (autoGearExportButton) {
      var _texts$en70, _texts$en71;
      var _label12 = texts[lang].autoGearExportButton || ((_texts$en70 = texts.en) === null || _texts$en70 === void 0 ? void 0 : _texts$en70.autoGearExportButton) || autoGearExportButton.textContent;
      var _help7 = texts[lang].autoGearExportHelp || ((_texts$en71 = texts.en) === null || _texts$en71 === void 0 ? void 0 : _texts$en71.autoGearExportHelp) || _label12;
      setButtonLabelWithIcon(autoGearExportButton, _label12, ICON_GLYPHS.fileExport);
      autoGearExportButton.setAttribute('data-help', _help7);
      autoGearExportButton.setAttribute('title', _help7);
      autoGearExportButton.setAttribute('aria-label', _label12);
    }
    if (autoGearImportButton) {
      var _texts$en72, _texts$en73;
      var _label13 = texts[lang].autoGearImportButton || ((_texts$en72 = texts.en) === null || _texts$en72 === void 0 ? void 0 : _texts$en72.autoGearImportButton) || autoGearImportButton.textContent;
      var _help8 = texts[lang].autoGearImportHelp || ((_texts$en73 = texts.en) === null || _texts$en73 === void 0 ? void 0 : _texts$en73.autoGearImportHelp) || _label13;
      setButtonLabelWithIcon(autoGearImportButton, _label13, ICON_GLYPHS.fileImport);
      autoGearImportButton.setAttribute('data-help', _help8);
      autoGearImportButton.setAttribute('title', _help8);
      autoGearImportButton.setAttribute('aria-label', _label13);
    }
    if (autoGearSearchLabel) {
      var _texts$en74, _texts$en75;
      var _label14 = texts[lang].autoGearSearchLabel || ((_texts$en74 = texts.en) === null || _texts$en74 === void 0 ? void 0 : _texts$en74.autoGearSearchLabel) || autoGearSearchLabel.textContent;
      var _help9 = texts[lang].autoGearSearchHelp || ((_texts$en75 = texts.en) === null || _texts$en75 === void 0 ? void 0 : _texts$en75.autoGearSearchHelp) || _label14;
      autoGearSearchLabel.textContent = _label14;
      autoGearSearchLabel.setAttribute('data-help', _help9);
      if (autoGearSearchInput) {
        var _texts$en76;
        var placeholder = texts[lang].autoGearSearchPlaceholder || ((_texts$en76 = texts.en) === null || _texts$en76 === void 0 ? void 0 : _texts$en76.autoGearSearchPlaceholder) || autoGearSearchInput.getAttribute('placeholder') || '';
        autoGearSearchInput.setAttribute('placeholder', placeholder);
        autoGearSearchInput.setAttribute('aria-label', _label14);
        autoGearSearchInput.setAttribute('data-help', _help9);
      }
    }
    if (autoGearFilterScenarioLabel) {
      var _texts$en77, _texts$en78;
      var _label15 = texts[lang].autoGearFilterScenarioLabel || ((_texts$en77 = texts.en) === null || _texts$en77 === void 0 ? void 0 : _texts$en77.autoGearFilterScenarioLabel) || autoGearFilterScenarioLabel.textContent;
      var _help0 = texts[lang].autoGearFilterScenarioHelp || ((_texts$en78 = texts.en) === null || _texts$en78 === void 0 ? void 0 : _texts$en78.autoGearFilterScenarioHelp) || _label15;
      autoGearFilterScenarioLabel.textContent = _label15;
      autoGearFilterScenarioLabel.setAttribute('data-help', _help0);
      if (autoGearFilterScenarioSelect) {
        autoGearFilterScenarioSelect.setAttribute('aria-label', _label15);
        autoGearFilterScenarioSelect.setAttribute('data-help', _help0);
      }
    }
    if (autoGearFilterClearButton) {
      var _texts$en79;
      var _label16 = texts[lang].autoGearFilterClear || ((_texts$en79 = texts.en) === null || _texts$en79 === void 0 ? void 0 : _texts$en79.autoGearFilterClear) || autoGearFilterClearButton.textContent;
      setButtonLabelWithIcon(autoGearFilterClearButton, _label16, ICON_GLYPHS.circleX);
      autoGearFilterClearButton.setAttribute('data-help', _label16);
      autoGearFilterClearButton.setAttribute('aria-label', _label16);
    }
    refreshAutoGearScenarioFilterOptions(getAutoGearRules());
    if (autoGearBackupsHeading) {
      var _texts$en80;
      autoGearBackupsHeading.textContent = texts[lang].autoGearBackupsHeading || ((_texts$en80 = texts.en) === null || _texts$en80 === void 0 ? void 0 : _texts$en80.autoGearBackupsHeading) || autoGearBackupsHeading.textContent;
    }
    if (autoGearBackupsDescription) {
      var _texts$en81;
      var _description = texts[lang].autoGearBackupsDescription || ((_texts$en81 = texts.en) === null || _texts$en81 === void 0 ? void 0 : _texts$en81.autoGearBackupsDescription) || '';
      autoGearBackupsDescription.textContent = _description;
      if (_description) {
        autoGearBackupsDescription.setAttribute('data-help', _description);
      }
    }
    if (autoGearShowBackupsLabel) {
      var _texts$en82, _texts$en83;
      var _label17 = texts[lang].autoGearShowBackupsLabel || ((_texts$en82 = texts.en) === null || _texts$en82 === void 0 ? void 0 : _texts$en82.autoGearShowBackupsLabel) || autoGearShowBackupsLabel.textContent;
      var _help1 = texts[lang].autoGearShowBackupsHelp || ((_texts$en83 = texts.en) === null || _texts$en83 === void 0 ? void 0 : _texts$en83.autoGearShowBackupsHelp) || _label17;
      autoGearShowBackupsLabel.textContent = _label17;
      autoGearShowBackupsLabel.setAttribute('data-help', _help1);
      if (autoGearShowBackupsCheckbox) {
        autoGearShowBackupsCheckbox.setAttribute('aria-label', _label17);
        autoGearShowBackupsCheckbox.setAttribute('data-help', _help1);
      }
    }
    if (autoGearBackupsHiddenNotice) {
      var _texts$en84;
      var hiddenText = texts[lang].autoGearBackupsHidden || ((_texts$en84 = texts.en) === null || _texts$en84 === void 0 ? void 0 : _texts$en84.autoGearBackupsHidden) || autoGearBackupsHiddenNotice.textContent;
      autoGearBackupsHiddenNotice.textContent = hiddenText;
    }
    if (autoGearBackupRetentionLabel) {
      var _texts$en85, _texts$en86;
      var _label18 = texts[lang].autoGearBackupRetentionLabel || ((_texts$en85 = texts.en) === null || _texts$en85 === void 0 ? void 0 : _texts$en85.autoGearBackupRetentionLabel) || autoGearBackupRetentionLabel.textContent;
      var _help10 = texts[lang].autoGearBackupRetentionHelp || ((_texts$en86 = texts.en) === null || _texts$en86 === void 0 ? void 0 : _texts$en86.autoGearBackupRetentionHelp) || _label18;
      autoGearBackupRetentionLabel.textContent = _label18;
      autoGearBackupRetentionLabel.setAttribute('data-help', _help10);
      if (autoGearBackupRetentionInput) {
        autoGearBackupRetentionInput.setAttribute('aria-label', _label18);
        autoGearBackupRetentionInput.setAttribute('title', _label18);
      }
    }
    if (autoGearBackupRetentionSummary) {
      callCoreFunctionIfAvailable('renderAutoGearBackupRetentionControls', [], {
        defer: true
      });
    }
    if (autoGearBackupSelectLabel) {
      var _texts$en87;
      var _label19 = texts[lang].autoGearBackupSelectLabel || ((_texts$en87 = texts.en) === null || _texts$en87 === void 0 ? void 0 : _texts$en87.autoGearBackupSelectLabel) || autoGearBackupSelectLabel.textContent;
      autoGearBackupSelectLabel.textContent = _label19;
      if (autoGearBackupSelect) {
        autoGearBackupSelect.setAttribute('aria-label', _label19);
        autoGearBackupSelect.setAttribute('title', _label19);
      }
    }
    if (autoGearBackupRestoreButton) {
      var _texts$en88;
      var _label20 = texts[lang].autoGearBackupRestore || ((_texts$en88 = texts.en) === null || _texts$en88 === void 0 ? void 0 : _texts$en88.autoGearBackupRestore) || autoGearBackupRestoreButton.textContent;
      setButtonLabelWithIcon(autoGearBackupRestoreButton, _label20, ICON_GLYPHS.fileImport);
      autoGearBackupRestoreButton.setAttribute('aria-label', _label20);
      autoGearBackupRestoreButton.setAttribute('title', _label20);
    }
    if (autoGearBackupEmptyMessage) {
      var _texts$en89;
      var emptyText = texts[lang].autoGearBackupEmpty || ((_texts$en89 = texts.en) === null || _texts$en89 === void 0 ? void 0 : _texts$en89.autoGearBackupEmpty) || autoGearBackupEmptyMessage.textContent;
      autoGearBackupEmptyMessage.textContent = emptyText;
    }
    if (autoGearBackupSelect) {
      callCoreFunctionIfAvailable('renderAutoGearBackupControls', [], {
        defer: true
      });
    }
    if (autoGearRuleNameLabel) {
      var _texts$en90, _texts$en91;
      var _label21 = texts[lang].autoGearRuleNameLabel || ((_texts$en90 = texts.en) === null || _texts$en90 === void 0 ? void 0 : _texts$en90.autoGearRuleNameLabel) || autoGearRuleNameLabel.textContent;
      autoGearRuleNameLabel.textContent = _label21;
      var _help11 = texts[lang].autoGearRuleNameHelp || ((_texts$en91 = texts.en) === null || _texts$en91 === void 0 ? void 0 : _texts$en91.autoGearRuleNameHelp) || _label21;
      autoGearRuleNameLabel.setAttribute('data-help', _help11);
      if (autoGearRuleNameInput) {
        autoGearRuleNameInput.setAttribute('data-help', _help11);
        autoGearRuleNameInput.setAttribute('aria-label', _label21);
      }
    }
    if (autoGearConditionSelectLabel) {
      var _texts$en92, _texts$en93;
      var _label22 = texts[lang].autoGearConditionSelectLabel || ((_texts$en92 = texts.en) === null || _texts$en92 === void 0 ? void 0 : _texts$en92.autoGearConditionSelectLabel) || autoGearConditionSelectLabel.textContent || 'Add a condition';
      var _help12 = texts[lang].autoGearConditionSelectHelp || ((_texts$en93 = texts.en) === null || _texts$en93 === void 0 ? void 0 : _texts$en93.autoGearConditionSelectHelp) || _label22;
      autoGearConditionSelectLabel.textContent = _label22;
      autoGearConditionSelectLabel.setAttribute('data-help', _help12);
      if (autoGearConditionSelect) {
        autoGearConditionSelect.setAttribute('aria-label', _label22);
        autoGearConditionSelect.setAttribute('data-help', _help12);
      }
    }
    if (autoGearConditionAddButton) {
      var _texts$en94;
      var _label23 = texts[lang].autoGearAddCondition || ((_texts$en94 = texts.en) === null || _texts$en94 === void 0 ? void 0 : _texts$en94.autoGearAddCondition) || autoGearConditionAddButton.textContent || 'Add condition';
      setButtonLabelWithIcon(autoGearConditionAddButton, _label23, ICON_GLYPHS.add);
      autoGearConditionAddButton.setAttribute('aria-label', _label23);
      autoGearConditionAddButton.setAttribute('data-help', _label23);
    }
    if (autoGearAlwaysLabel) {
      var _texts$en95, _texts$en96;
      var _label24 = texts[lang].autoGearAlwaysLabel || ((_texts$en95 = texts.en) === null || _texts$en95 === void 0 ? void 0 : _texts$en95.autoGearAlwaysLabel) || autoGearAlwaysLabel.textContent || 'Always include';
      var _help13 = texts[lang].autoGearAlwaysHelp || ((_texts$en96 = texts.en) === null || _texts$en96 === void 0 ? void 0 : _texts$en96.autoGearAlwaysHelp) || _label24;
      autoGearAlwaysLabel.textContent = _label24;
      autoGearAlwaysLabel.setAttribute('data-help', _help13);
      if (autoGearAlwaysHelp) {
        autoGearAlwaysHelp.textContent = _help13;
        autoGearAlwaysHelp.setAttribute('data-help', _help13);
      }
    }
    configureAutoGearConditionButtons();
    refreshAutoGearConditionPicker();
    updateAutoGearConditionAddButtonState();
    if (autoGearScenariosLabel) {
      var _texts$en97, _texts$en98;
      var _label25 = texts[lang].autoGearScenariosLabel || ((_texts$en97 = texts.en) === null || _texts$en97 === void 0 ? void 0 : _texts$en97.autoGearScenariosLabel) || autoGearScenariosLabel.textContent;
      autoGearScenariosLabel.textContent = _label25;
      var _help14 = texts[lang].autoGearScenariosHelp || ((_texts$en98 = texts.en) === null || _texts$en98 === void 0 ? void 0 : _texts$en98.autoGearScenariosHelp) || _label25;
      autoGearScenariosLabel.setAttribute('data-help', _help14);
      if (autoGearScenariosSelect) {
        autoGearScenariosSelect.setAttribute('data-help', _help14);
        autoGearScenariosSelect.setAttribute('aria-label', _label25);
      }
      if (autoGearScenarioModeLabel) {
        var _texts$en99, _texts$en100;
        var modeLabel = texts[lang].autoGearScenarioModeLabel || ((_texts$en99 = texts.en) === null || _texts$en99 === void 0 ? void 0 : _texts$en99.autoGearScenarioModeLabel) || autoGearScenarioModeLabel.textContent || 'Scenario matching';
        var modeHelp = texts[lang].autoGearScenarioModeHelp || ((_texts$en100 = texts.en) === null || _texts$en100 === void 0 ? void 0 : _texts$en100.autoGearScenarioModeHelp) || modeLabel;
        autoGearScenarioModeLabel.textContent = modeLabel;
        autoGearScenarioModeLabel.setAttribute('data-help', modeHelp);
        if (autoGearScenarioModeSelectElement) {
          autoGearScenarioModeSelectElement.setAttribute('data-help', modeHelp);
          autoGearScenarioModeSelectElement.setAttribute('aria-label', modeLabel);
        }
      }
      if (autoGearScenarioBaseLabel) {
        var _texts$en101, _texts$en102;
        var baseLabel = texts[lang].autoGearScenarioBaseLabel || ((_texts$en101 = texts.en) === null || _texts$en101 === void 0 ? void 0 : _texts$en101.autoGearScenarioBaseLabel) || autoGearScenarioBaseLabel.textContent || 'Base scenario';
        var baseHelp = texts[lang].autoGearScenarioBaseHelp || ((_texts$en102 = texts.en) === null || _texts$en102 === void 0 ? void 0 : _texts$en102.autoGearScenarioBaseHelp) || baseLabel;
        autoGearScenarioBaseLabel.textContent = baseLabel;
        autoGearScenarioBaseLabel.setAttribute('data-help', baseHelp);
        if (autoGearScenarioBaseSelect) {
          autoGearScenarioBaseSelect.setAttribute('data-help', baseHelp);
          autoGearScenarioBaseSelect.setAttribute('aria-label', baseLabel);
        }
      }
      if (autoGearScenarioFactorLabel) {
        var _texts$en103, _texts$en104;
        var factorLabel = texts[lang].autoGearScenarioFactorLabel || ((_texts$en103 = texts.en) === null || _texts$en103 === void 0 ? void 0 : _texts$en103.autoGearScenarioFactorLabel) || autoGearScenarioFactorLabel.textContent || 'Multiplier factor';
        var factorHelp = texts[lang].autoGearScenarioFactorHelp || ((_texts$en104 = texts.en) === null || _texts$en104 === void 0 ? void 0 : _texts$en104.autoGearScenarioFactorHelp) || factorLabel;
        autoGearScenarioFactorLabel.textContent = factorLabel;
        autoGearScenarioFactorLabel.setAttribute('data-help', factorHelp);
        if (autoGearScenarioFactorInput) {
          autoGearScenarioFactorInput.setAttribute('data-help', factorHelp);
          autoGearScenarioFactorInput.setAttribute('aria-label', factorLabel);
        }
      }
    }
    if (autoGearShootingDaysLabel) {
      var _texts$en105, _texts$en106, _texts$en107, _texts$en108, _texts$en109, _texts$en110;
      var _label26 = texts[lang].autoGearShootingDaysLabel || ((_texts$en105 = texts.en) === null || _texts$en105 === void 0 ? void 0 : _texts$en105.autoGearShootingDaysLabel) || autoGearShootingDaysLabel.textContent || 'Shooting days condition';
      var _help15 = texts[lang].autoGearShootingDaysHelp || ((_texts$en106 = texts.en) === null || _texts$en106 === void 0 ? void 0 : _texts$en106.autoGearShootingDaysHelp) || _label26;
      var minimumLabel = texts[lang].autoGearShootingDaysModeMinimum || ((_texts$en107 = texts.en) === null || _texts$en107 === void 0 ? void 0 : _texts$en107.autoGearShootingDaysModeMinimum) || 'Minimum';
      var maximumLabel = texts[lang].autoGearShootingDaysModeMaximum || ((_texts$en108 = texts.en) === null || _texts$en108 === void 0 ? void 0 : _texts$en108.autoGearShootingDaysModeMaximum) || 'Maximum';
      var everyLabel = texts[lang].autoGearShootingDaysModeEvery || ((_texts$en109 = texts.en) === null || _texts$en109 === void 0 ? void 0 : _texts$en109.autoGearShootingDaysModeEvery) || 'Every';
      var valueLabel = texts[lang].autoGearShootingDaysValueLabel || ((_texts$en110 = texts.en) === null || _texts$en110 === void 0 ? void 0 : _texts$en110.autoGearShootingDaysValueLabel) || 'Shooting days value';
      autoGearShootingDaysLabel.textContent = _label26;
      autoGearShootingDaysLabel.setAttribute('data-help', _help15);
      if (autoGearShootingDaysMode) {
        autoGearShootingDaysMode.setAttribute('data-help', _help15);
        autoGearShootingDaysMode.setAttribute('aria-label', _label26);
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
        autoGearShootingDaysValueLabel.setAttribute('data-help', _help15);
      }
      if (autoGearShootingDaysInput) {
        autoGearShootingDaysInput.setAttribute('data-help', _help15);
        autoGearShootingDaysInput.setAttribute('aria-label', valueLabel || _label26);
      }
      if (autoGearShootingDaysHelp) {
        autoGearShootingDaysHelp.textContent = _help15;
        autoGearShootingDaysHelp.setAttribute('data-help', _help15);
      }
    }
    if (autoGearMatteboxLabel) {
      var _texts$en111, _texts$en112;
      var _label27 = texts[lang].autoGearMatteboxLabel || ((_texts$en111 = texts.en) === null || _texts$en111 === void 0 ? void 0 : _texts$en111.autoGearMatteboxLabel) || autoGearMatteboxLabel.textContent;
      autoGearMatteboxLabel.textContent = _label27;
      var _help16 = texts[lang].autoGearMatteboxHelp || ((_texts$en112 = texts.en) === null || _texts$en112 === void 0 ? void 0 : _texts$en112.autoGearMatteboxHelp) || _label27;
      autoGearMatteboxLabel.setAttribute('data-help', _help16);
      if (autoGearMatteboxSelect) {
        autoGearMatteboxSelect.setAttribute('data-help', _help16);
        autoGearMatteboxSelect.setAttribute('aria-label', _label27);
      }
    }
    if (autoGearCameraHandleLabel) {
      var _texts$en113, _texts$en114;
      var _label28 = texts[lang].autoGearCameraHandleLabel || ((_texts$en113 = texts.en) === null || _texts$en113 === void 0 ? void 0 : _texts$en113.autoGearCameraHandleLabel) || autoGearCameraHandleLabel.textContent;
      autoGearCameraHandleLabel.textContent = _label28;
      var _help17 = texts[lang].autoGearCameraHandleHelp || ((_texts$en114 = texts.en) === null || _texts$en114 === void 0 ? void 0 : _texts$en114.autoGearCameraHandleHelp) || _label28;
      autoGearCameraHandleLabel.setAttribute('data-help', _help17);
      if (autoGearCameraHandleSelect) {
        autoGearCameraHandleSelect.setAttribute('data-help', _help17);
        autoGearCameraHandleSelect.setAttribute('aria-label', _label28);
      }
    }
    if (autoGearViewfinderExtensionLabel) {
      var _texts$en115, _texts$en116;
      var _label29 = texts[lang].autoGearViewfinderExtensionLabel || ((_texts$en115 = texts.en) === null || _texts$en115 === void 0 ? void 0 : _texts$en115.autoGearViewfinderExtensionLabel) || autoGearViewfinderExtensionLabel.textContent;
      autoGearViewfinderExtensionLabel.textContent = _label29;
      var _help18 = texts[lang].autoGearViewfinderExtensionHelp || ((_texts$en116 = texts.en) === null || _texts$en116 === void 0 ? void 0 : _texts$en116.autoGearViewfinderExtensionHelp) || _label29;
      autoGearViewfinderExtensionLabel.setAttribute('data-help', _help18);
      if (autoGearViewfinderExtensionSelect) {
        autoGearViewfinderExtensionSelect.setAttribute('data-help', _help18);
        autoGearViewfinderExtensionSelect.setAttribute('aria-label', _label29);
      }
    }
    if (autoGearDeliveryResolutionLabel) {
      var _texts$en117, _texts$en118;
      var _label30 = texts[lang].autoGearDeliveryResolutionLabel || ((_texts$en117 = texts.en) === null || _texts$en117 === void 0 ? void 0 : _texts$en117.autoGearDeliveryResolutionLabel) || autoGearDeliveryResolutionLabel.textContent;
      autoGearDeliveryResolutionLabel.textContent = _label30;
      var _help19 = texts[lang].autoGearDeliveryResolutionHelp || ((_texts$en118 = texts.en) === null || _texts$en118 === void 0 ? void 0 : _texts$en118.autoGearDeliveryResolutionHelp) || _label30;
      autoGearDeliveryResolutionLabel.setAttribute('data-help', _help19);
      if (autoGearDeliveryResolutionSelect) {
        autoGearDeliveryResolutionSelect.setAttribute('data-help', _help19);
        autoGearDeliveryResolutionSelect.setAttribute('aria-label', _label30);
      }
    }
    if (autoGearVideoDistributionLabel) {
      var _texts$en119, _texts$en120;
      var _label31 = texts[lang].autoGearVideoDistributionLabel || ((_texts$en119 = texts.en) === null || _texts$en119 === void 0 ? void 0 : _texts$en119.autoGearVideoDistributionLabel) || autoGearVideoDistributionLabel.textContent;
      autoGearVideoDistributionLabel.textContent = _label31;
      var _help20 = texts[lang].autoGearVideoDistributionHelp || ((_texts$en120 = texts.en) === null || _texts$en120 === void 0 ? void 0 : _texts$en120.autoGearVideoDistributionHelp) || _label31;
      autoGearVideoDistributionLabel.setAttribute('data-help', _help20);
      if (autoGearVideoDistributionSelect) {
        autoGearVideoDistributionSelect.setAttribute('data-help', _help20);
        autoGearVideoDistributionSelect.setAttribute('aria-label', _label31);
      }
    }
    if (autoGearCameraLabel) {
      var _texts$en121, _texts$en122;
      var _label32 = texts[lang].autoGearCameraLabel || ((_texts$en121 = texts.en) === null || _texts$en121 === void 0 ? void 0 : _texts$en121.autoGearCameraLabel) || autoGearCameraLabel.textContent;
      autoGearCameraLabel.textContent = _label32;
      var _help21 = texts[lang].autoGearCameraHelp || ((_texts$en122 = texts.en) === null || _texts$en122 === void 0 ? void 0 : _texts$en122.autoGearCameraHelp) || _label32;
      autoGearCameraLabel.setAttribute('data-help', _help21);
      if (autoGearCameraSelect) {
        autoGearCameraSelect.setAttribute('data-help', _help21);
        autoGearCameraSelect.setAttribute('aria-label', _label32);
      }
    }
    if (autoGearOwnGearLabel) {
      var _texts$en123, _texts$en124, _texts$en125, _texts$en126;
      var _label33 = texts[lang].autoGearConditionOwnGearLabel || texts[lang].autoGearOwnGearLabel || ((_texts$en123 = texts.en) === null || _texts$en123 === void 0 ? void 0 : _texts$en123.autoGearConditionOwnGearLabel) || ((_texts$en124 = texts.en) === null || _texts$en124 === void 0 ? void 0 : _texts$en124.autoGearOwnGearLabel) || autoGearOwnGearLabel.textContent;
      var _help22 = texts[lang].autoGearConditionOwnGearHelp || ((_texts$en125 = texts.en) === null || _texts$en125 === void 0 ? void 0 : _texts$en125.autoGearConditionOwnGearHelp) || texts[lang].autoGearOwnGearHelp || ((_texts$en126 = texts.en) === null || _texts$en126 === void 0 ? void 0 : _texts$en126.autoGearOwnGearHelp) || _label33;
      autoGearOwnGearLabel.textContent = _label33;
      autoGearOwnGearLabel.setAttribute('data-help', _help22);
      if (autoGearOwnGearSelect) {
        autoGearOwnGearSelect.setAttribute('data-help', _help22);
        autoGearOwnGearSelect.setAttribute('aria-label', _label33);
      }
    }
    if (autoGearCameraWeightLabel) {
      var _texts$en127, _texts$en128;
      var _label34 = texts[lang].autoGearCameraWeightLabel || ((_texts$en127 = texts.en) === null || _texts$en127 === void 0 ? void 0 : _texts$en127.autoGearCameraWeightLabel) || autoGearCameraWeightLabel.textContent || 'Camera weight';
      var _help23 = texts[lang].autoGearCameraWeightHelp || ((_texts$en128 = texts.en) === null || _texts$en128 === void 0 ? void 0 : _texts$en128.autoGearCameraWeightHelp) || _label34;
      autoGearCameraWeightLabel.textContent = _label34;
      autoGearCameraWeightLabel.setAttribute('data-help', _help23);
    }
    if (autoGearCameraWeightOperatorLabel) {
      var _texts$en129;
      var _label35 = texts[lang].autoGearCameraWeightOperatorLabel || ((_texts$en129 = texts.en) === null || _texts$en129 === void 0 ? void 0 : _texts$en129.autoGearCameraWeightOperatorLabel) || autoGearCameraWeightOperatorLabel.textContent || 'Weight comparison';
      autoGearCameraWeightOperatorLabel.textContent = _label35;
      autoGearCameraWeightOperatorLabel.setAttribute('data-help', _label35);
      if (autoGearCameraWeightOperator) {
        var _texts$en130, _texts$en131, _texts$en132;
        autoGearCameraWeightOperator.setAttribute('data-help', _label35);
        autoGearCameraWeightOperator.setAttribute('aria-label', _label35);
        var greaterLabel = texts[lang].autoGearCameraWeightOperatorGreater || ((_texts$en130 = texts.en) === null || _texts$en130 === void 0 ? void 0 : _texts$en130.autoGearCameraWeightOperatorGreater) || 'Heavier than';
        var lessLabel = texts[lang].autoGearCameraWeightOperatorLess || ((_texts$en131 = texts.en) === null || _texts$en131 === void 0 ? void 0 : _texts$en131.autoGearCameraWeightOperatorLess) || 'Lighter than';
        var equalLabel = texts[lang].autoGearCameraWeightOperatorEqual || ((_texts$en132 = texts.en) === null || _texts$en132 === void 0 ? void 0 : _texts$en132.autoGearCameraWeightOperatorEqual) || 'Exactly';
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
      var _texts$en133, _texts$en134;
      var _label36 = texts[lang].autoGearCameraWeightValueLabel || ((_texts$en133 = texts.en) === null || _texts$en133 === void 0 ? void 0 : _texts$en133.autoGearCameraWeightValueLabel) || autoGearCameraWeightValueLabel.textContent || 'Weight threshold (grams)';
      var _help24 = texts[lang].autoGearCameraWeightHelp || ((_texts$en134 = texts.en) === null || _texts$en134 === void 0 ? void 0 : _texts$en134.autoGearCameraWeightHelp) || _label36;
      autoGearCameraWeightValueLabel.textContent = _label36;
      autoGearCameraWeightValueLabel.setAttribute('data-help', _help24);
      if (autoGearCameraWeightValueInput) {
        autoGearCameraWeightValueInput.setAttribute('data-help', _help24);
        autoGearCameraWeightValueInput.setAttribute('aria-label', _label36);
      }
    }
    if (autoGearCameraWeightHelp) {
      var _texts$en135;
      var _help25 = texts[lang].autoGearCameraWeightHelp || ((_texts$en135 = texts.en) === null || _texts$en135 === void 0 ? void 0 : _texts$en135.autoGearCameraWeightHelp) || autoGearCameraWeightHelp.textContent || '';
      autoGearCameraWeightHelp.textContent = _help25;
      if (_help25) {
        autoGearCameraWeightHelp.setAttribute('data-help', _help25);
      }
    }
    if (autoGearMonitorLabel) {
      var _texts$en136, _texts$en137;
      var _label37 = texts[lang].autoGearMonitorLabel || ((_texts$en136 = texts.en) === null || _texts$en136 === void 0 ? void 0 : _texts$en136.autoGearMonitorLabel) || autoGearMonitorLabel.textContent;
      autoGearMonitorLabel.textContent = _label37;
      var _help26 = texts[lang].autoGearMonitorHelp || ((_texts$en137 = texts.en) === null || _texts$en137 === void 0 ? void 0 : _texts$en137.autoGearMonitorHelp) || _label37;
      autoGearMonitorLabel.setAttribute('data-help', _help26);
      if (autoGearMonitorSelect) {
        autoGearMonitorSelect.setAttribute('data-help', _help26);
        autoGearMonitorSelect.setAttribute('aria-label', _label37);
      }
    }
    if (autoGearTripodHeadBrandLabel) {
      var _texts$en138, _texts$en139;
      var _label38 = texts[lang].autoGearTripodHeadBrandLabel || ((_texts$en138 = texts.en) === null || _texts$en138 === void 0 ? void 0 : _texts$en138.autoGearTripodHeadBrandLabel) || autoGearTripodHeadBrandLabel.textContent;
      autoGearTripodHeadBrandLabel.textContent = _label38;
      var _help27 = texts[lang].autoGearTripodHeadBrandHelp || ((_texts$en139 = texts.en) === null || _texts$en139 === void 0 ? void 0 : _texts$en139.autoGearTripodHeadBrandHelp) || _label38;
      autoGearTripodHeadBrandLabel.setAttribute('data-help', _help27);
      if (autoGearTripodHeadBrandSelect) {
        autoGearTripodHeadBrandSelect.setAttribute('data-help', _help27);
        autoGearTripodHeadBrandSelect.setAttribute('aria-label', _label38);
      }
    }
    if (autoGearTripodBowlLabel) {
      var _texts$en140, _texts$en141;
      var _label39 = texts[lang].autoGearTripodBowlLabel || ((_texts$en140 = texts.en) === null || _texts$en140 === void 0 ? void 0 : _texts$en140.autoGearTripodBowlLabel) || autoGearTripodBowlLabel.textContent;
      autoGearTripodBowlLabel.textContent = _label39;
      var _help28 = texts[lang].autoGearTripodBowlHelp || ((_texts$en141 = texts.en) === null || _texts$en141 === void 0 ? void 0 : _texts$en141.autoGearTripodBowlHelp) || _label39;
      autoGearTripodBowlLabel.setAttribute('data-help', _help28);
      if (autoGearTripodBowlSelect) {
        autoGearTripodBowlSelect.setAttribute('data-help', _help28);
        autoGearTripodBowlSelect.setAttribute('aria-label', _label39);
      }
    }
    if (autoGearTripodTypesLabel) {
      var _texts$en142, _texts$en143;
      var _label40 = texts[lang].autoGearTripodTypesLabel || ((_texts$en142 = texts.en) === null || _texts$en142 === void 0 ? void 0 : _texts$en142.autoGearTripodTypesLabel) || autoGearTripodTypesLabel.textContent;
      autoGearTripodTypesLabel.textContent = _label40;
      var _help29 = texts[lang].autoGearTripodTypesHelp || ((_texts$en143 = texts.en) === null || _texts$en143 === void 0 ? void 0 : _texts$en143.autoGearTripodTypesHelp) || _label40;
      autoGearTripodTypesLabel.setAttribute('data-help', _help29);
      if (autoGearTripodTypesSelect) {
        autoGearTripodTypesSelect.setAttribute('data-help', _help29);
        autoGearTripodTypesSelect.setAttribute('aria-label', _label40);
      }
    }
    if (autoGearTripodSpreaderLabel) {
      var _texts$en144, _texts$en145;
      var _label41 = texts[lang].autoGearTripodSpreaderLabel || ((_texts$en144 = texts.en) === null || _texts$en144 === void 0 ? void 0 : _texts$en144.autoGearTripodSpreaderLabel) || autoGearTripodSpreaderLabel.textContent;
      autoGearTripodSpreaderLabel.textContent = _label41;
      var _help30 = texts[lang].autoGearTripodSpreaderHelp || ((_texts$en145 = texts.en) === null || _texts$en145 === void 0 ? void 0 : _texts$en145.autoGearTripodSpreaderHelp) || _label41;
      autoGearTripodSpreaderLabel.setAttribute('data-help', _help30);
      if (autoGearTripodSpreaderSelect) {
        autoGearTripodSpreaderSelect.setAttribute('data-help', _help30);
        autoGearTripodSpreaderSelect.setAttribute('aria-label', _label41);
      }
    }
    if (autoGearCrewPresentLabel) {
      var _texts$en146, _texts$en147;
      var _label42 = texts[lang].autoGearCrewPresentLabel || ((_texts$en146 = texts.en) === null || _texts$en146 === void 0 ? void 0 : _texts$en146.autoGearCrewPresentLabel) || autoGearCrewPresentLabel.textContent;
      autoGearCrewPresentLabel.textContent = _label42;
      var _help31 = texts[lang].autoGearCrewPresentHelp || ((_texts$en147 = texts.en) === null || _texts$en147 === void 0 ? void 0 : _texts$en147.autoGearCrewPresentHelp) || _label42;
      autoGearCrewPresentLabel.setAttribute('data-help', _help31);
      if (autoGearCrewPresentSelect) {
        autoGearCrewPresentSelect.setAttribute('data-help', _help31);
        autoGearCrewPresentSelect.setAttribute('aria-label', _label42);
      }
    }
    if (autoGearCrewAbsentLabel) {
      var _texts$en148, _texts$en149;
      var _label43 = texts[lang].autoGearCrewAbsentLabel || ((_texts$en148 = texts.en) === null || _texts$en148 === void 0 ? void 0 : _texts$en148.autoGearCrewAbsentLabel) || autoGearCrewAbsentLabel.textContent;
      autoGearCrewAbsentLabel.textContent = _label43;
      var _help32 = texts[lang].autoGearCrewAbsentHelp || ((_texts$en149 = texts.en) === null || _texts$en149 === void 0 ? void 0 : _texts$en149.autoGearCrewAbsentHelp) || _label43;
      autoGearCrewAbsentLabel.setAttribute('data-help', _help32);
      if (autoGearCrewAbsentSelect) {
        autoGearCrewAbsentSelect.setAttribute('data-help', _help32);
        autoGearCrewAbsentSelect.setAttribute('aria-label', _label43);
      }
    }
    if (autoGearWirelessLabel) {
      var _texts$en150, _texts$en151;
      var _label44 = texts[lang].autoGearWirelessLabel || ((_texts$en150 = texts.en) === null || _texts$en150 === void 0 ? void 0 : _texts$en150.autoGearWirelessLabel) || autoGearWirelessLabel.textContent;
      autoGearWirelessLabel.textContent = _label44;
      var _help33 = texts[lang].autoGearWirelessHelp || ((_texts$en151 = texts.en) === null || _texts$en151 === void 0 ? void 0 : _texts$en151.autoGearWirelessHelp) || _label44;
      autoGearWirelessLabel.setAttribute('data-help', _help33);
      if (autoGearWirelessSelect) {
        autoGearWirelessSelect.setAttribute('data-help', _help33);
        autoGearWirelessSelect.setAttribute('aria-label', _label44);
      }
    }
    if (autoGearMotorsLabel) {
      var _texts$en152, _texts$en153;
      var _label45 = texts[lang].autoGearMotorsLabel || ((_texts$en152 = texts.en) === null || _texts$en152 === void 0 ? void 0 : _texts$en152.autoGearMotorsLabel) || autoGearMotorsLabel.textContent;
      autoGearMotorsLabel.textContent = _label45;
      var _help34 = texts[lang].autoGearMotorsHelp || ((_texts$en153 = texts.en) === null || _texts$en153 === void 0 ? void 0 : _texts$en153.autoGearMotorsHelp) || _label45;
      autoGearMotorsLabel.setAttribute('data-help', _help34);
      if (autoGearMotorsSelect) {
        autoGearMotorsSelect.setAttribute('data-help', _help34);
        autoGearMotorsSelect.setAttribute('aria-label', _label45);
      }
    }
    if (autoGearControllersLabel) {
      var _texts$en154, _texts$en155;
      var _label46 = texts[lang].autoGearControllersLabel || ((_texts$en154 = texts.en) === null || _texts$en154 === void 0 ? void 0 : _texts$en154.autoGearControllersLabel) || autoGearControllersLabel.textContent;
      autoGearControllersLabel.textContent = _label46;
      var _help35 = texts[lang].autoGearControllersHelp || ((_texts$en155 = texts.en) === null || _texts$en155 === void 0 ? void 0 : _texts$en155.autoGearControllersHelp) || _label46;
      autoGearControllersLabel.setAttribute('data-help', _help35);
      if (autoGearControllersSelect) {
        autoGearControllersSelect.setAttribute('data-help', _help35);
        autoGearControllersSelect.setAttribute('aria-label', _label46);
      }
    }
    if (autoGearDistanceLabel) {
      var _texts$en156, _texts$en157;
      var _label47 = texts[lang].autoGearDistanceLabel || ((_texts$en156 = texts.en) === null || _texts$en156 === void 0 ? void 0 : _texts$en156.autoGearDistanceLabel) || autoGearDistanceLabel.textContent;
      autoGearDistanceLabel.textContent = _label47;
      var _help36 = texts[lang].autoGearDistanceHelp || ((_texts$en157 = texts.en) === null || _texts$en157 === void 0 ? void 0 : _texts$en157.autoGearDistanceHelp) || _label47;
      autoGearDistanceLabel.setAttribute('data-help', _help36);
      if (autoGearDistanceSelect) {
        autoGearDistanceSelect.setAttribute('data-help', _help36);
        autoGearDistanceSelect.setAttribute('aria-label', _label47);
      }
    }
    var logicLabelText = texts[lang].autoGearConditionLogicLabel || ((_texts$en158 = texts.en) === null || _texts$en158 === void 0 ? void 0 : _texts$en158.autoGearConditionLogicLabel) || 'Match behavior';
    var logicHelpText = texts[lang].autoGearConditionLogicHelp || ((_texts$en159 = texts.en) === null || _texts$en159 === void 0 ? void 0 : _texts$en159.autoGearConditionLogicHelp) || logicLabelText;
    var logicOptionTexts = {
      all: ((_texts$lang = texts[lang]) === null || _texts$lang === void 0 ? void 0 : _texts$lang.autoGearConditionLogicAll) || ((_texts$en160 = texts.en) === null || _texts$en160 === void 0 ? void 0 : _texts$en160.autoGearConditionLogicAll) || 'Require every selected value',
      any: ((_texts$lang2 = texts[lang]) === null || _texts$lang2 === void 0 ? void 0 : _texts$lang2.autoGearConditionLogicAny) || ((_texts$en161 = texts.en) === null || _texts$en161 === void 0 ? void 0 : _texts$en161.autoGearConditionLogicAny) || 'Match any selected value',
      none: ((_texts$lang3 = texts[lang]) === null || _texts$lang3 === void 0 ? void 0 : _texts$lang3.autoGearConditionLogicNone) || ((_texts$en162 = texts.en) === null || _texts$en162 === void 0 ? void 0 : _texts$en162.autoGearConditionLogicNone) || 'Require none of the selected values',
      multiplier: ((_texts$lang4 = texts[lang]) === null || _texts$lang4 === void 0 ? void 0 : _texts$lang4.autoGearConditionLogicMultiplier) || ((_texts$en163 = texts.en) === null || _texts$en163 === void 0 ? void 0 : _texts$en163.autoGearConditionLogicMultiplier) || 'Multiply by matched values'
    };
    Object.entries(autoGearConditionLogicSelects).forEach(function (_ref36) {
      var _ref37 = _slicedToArray(_ref36, 2),
        key = _ref37[0],
        select = _ref37[1];
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
      var _texts$en164;
      autoGearAddItemsHeading.textContent = texts[lang].autoGearAddItemsHeading || ((_texts$en164 = texts.en) === null || _texts$en164 === void 0 ? void 0 : _texts$en164.autoGearAddItemsHeading) || autoGearAddItemsHeading.textContent;
    }
    if (autoGearAddOwnGearLabel) {
      var _texts$en165, _texts$en166, _texts$en167;
      var _label48 = texts[lang].autoGearOwnGearLabel || ((_texts$en165 = texts.en) === null || _texts$en165 === void 0 ? void 0 : _texts$en165.autoGearOwnGearLabel) || autoGearAddOwnGearLabel.textContent;
      var _help37 = texts[lang].autoGearOwnGearHelp || ((_texts$en166 = texts.en) === null || _texts$en166 === void 0 ? void 0 : _texts$en166.autoGearOwnGearHelp) || _label48;
      var _placeholder3 = texts[lang].autoGearOwnGearPlaceholder || ((_texts$en167 = texts.en) === null || _texts$en167 === void 0 ? void 0 : _texts$en167.autoGearOwnGearPlaceholder) || '';
      autoGearAddOwnGearLabel.textContent = _label48;
      autoGearAddOwnGearLabel.setAttribute('data-help', _help37);
      if (autoGearAddOwnGearSelect) {
        autoGearAddOwnGearSelect.setAttribute('aria-label', _label48);
        autoGearAddOwnGearSelect.setAttribute('data-help', _help37);
        if (_placeholder3) {
          autoGearAddOwnGearSelect.setAttribute('data-placeholder', _placeholder3);
        } else {
          autoGearAddOwnGearSelect.removeAttribute('data-placeholder');
        }
      }
    }
    if (autoGearAddItemLabel) {
      var _texts$en168, _texts$en169;
      var _label49 = texts[lang].autoGearAddItemLabel || ((_texts$en168 = texts.en) === null || _texts$en168 === void 0 ? void 0 : _texts$en168.autoGearAddItemLabel) || autoGearAddItemLabel.textContent;
      var hint = texts[lang].autoGearAddMultipleHint || ((_texts$en169 = texts.en) === null || _texts$en169 === void 0 ? void 0 : _texts$en169.autoGearAddMultipleHint) || '';
      var helpText = hint ? "".concat(_label49, " \u2013 ").concat(hint) : _label49;
      autoGearAddItemLabel.textContent = _label49;
      autoGearAddItemLabel.setAttribute('data-help', helpText);
      if (autoGearAddNameInput) {
        autoGearAddNameInput.setAttribute('aria-label', _label49);
        autoGearAddNameInput.setAttribute('data-help', helpText);
        if (hint) {
          autoGearAddNameInput.setAttribute('placeholder', hint);
        } else {
          autoGearAddNameInput.removeAttribute('placeholder');
        }
      }
    }
    if (autoGearAddCategoryLabel) {
      var _texts$en170;
      var _label50 = texts[lang].autoGearAddCategoryLabel || ((_texts$en170 = texts.en) === null || _texts$en170 === void 0 ? void 0 : _texts$en170.autoGearAddCategoryLabel) || autoGearAddCategoryLabel.textContent;
      autoGearAddCategoryLabel.textContent = _label50;
      if (autoGearAddCategorySelect) {
        autoGearAddCategorySelect.setAttribute('aria-label', _label50);
      }
    }
    if (autoGearAddQuantityLabel) {
      var _texts$en171;
      var _label51 = texts[lang].autoGearAddQuantityLabel || ((_texts$en171 = texts.en) === null || _texts$en171 === void 0 ? void 0 : _texts$en171.autoGearAddQuantityLabel) || autoGearAddQuantityLabel.textContent;
      autoGearAddQuantityLabel.textContent = _label51;
      if (autoGearAddQuantityInput) {
        autoGearAddQuantityInput.setAttribute('aria-label', _label51);
      }
    }
    if (autoGearAddScreenSizeLabel) {
      var _texts$en172;
      var _label52 = texts[lang].autoGearAddScreenSizeLabel || ((_texts$en172 = texts.en) === null || _texts$en172 === void 0 ? void 0 : _texts$en172.autoGearAddScreenSizeLabel) || autoGearAddScreenSizeLabel.textContent;
      autoGearAddScreenSizeLabel.textContent = _label52;
      if (autoGearAddScreenSizeInput) {
        autoGearAddScreenSizeInput.setAttribute('aria-label', _label52);
      }
    }
    if (autoGearAddSelectorTypeLabel) {
      var _texts$en173;
      var _label53 = texts[lang].autoGearAddSelectorTypeLabel || ((_texts$en173 = texts.en) === null || _texts$en173 === void 0 ? void 0 : _texts$en173.autoGearAddSelectorTypeLabel) || autoGearAddSelectorTypeLabel.textContent;
      autoGearAddSelectorTypeLabel.textContent = _label53;
      if (autoGearAddSelectorTypeSelect) {
        var _texts$en174, _texts$en175, _texts$en176, _texts$en177, _texts$en178, _texts$en179, _texts$en180;
        autoGearAddSelectorTypeSelect.setAttribute('aria-label', _label53);
        var noneLabel = texts[lang].autoGearSelectorNoneOption || ((_texts$en174 = texts.en) === null || _texts$en174 === void 0 ? void 0 : _texts$en174.autoGearSelectorNoneOption) || 'No selector';
        var monitorLabel = texts[lang].autoGearSelectorMonitorOption || ((_texts$en175 = texts.en) === null || _texts$en175 === void 0 ? void 0 : _texts$en175.autoGearSelectorMonitorOption) || 'Monitor selector';
        var directorLabel = texts[lang].autoGearSelectorDirectorOption || ((_texts$en176 = texts.en) === null || _texts$en176 === void 0 ? void 0 : _texts$en176.autoGearSelectorDirectorOption) || 'Director monitor selector';
        var tripodHeadLabel = texts[lang].autoGearSelectorTripodHeadOption || ((_texts$en177 = texts.en) === null || _texts$en177 === void 0 ? void 0 : _texts$en177.autoGearSelectorTripodHeadOption) || 'Tripod head selector';
        var _tripodBowlLabel = texts[lang].autoGearSelectorTripodBowlOption || ((_texts$en178 = texts.en) === null || _texts$en178 === void 0 ? void 0 : _texts$en178.autoGearSelectorTripodBowlOption) || 'Tripod bowl selector';
        var _tripodTypesLabel = texts[lang].autoGearSelectorTripodTypesOption || ((_texts$en179 = texts.en) === null || _texts$en179 === void 0 ? void 0 : _texts$en179.autoGearSelectorTripodTypesOption) || 'Tripod type selector';
        var _tripodSpreaderLabel = texts[lang].autoGearSelectorTripodSpreaderOption || ((_texts$en180 = texts.en) === null || _texts$en180 === void 0 ? void 0 : _texts$en180.autoGearSelectorTripodSpreaderOption) || 'Tripod spreader selector';
        var selectorLabels = new Map([['none', noneLabel], ['monitor', monitorLabel], ['directorMonitor', directorLabel], ['tripodHeadBrand', tripodHeadLabel], ['tripodBowl', _tripodBowlLabel], ['tripodTypes', _tripodTypesLabel], ['tripodSpreader', _tripodSpreaderLabel]]);
        Array.from(autoGearAddSelectorTypeSelect.options || []).forEach(function (opt) {
          var text = selectorLabels.get(opt.value);
          if (text) opt.textContent = text;
        });
      }
    }
    if (autoGearAddSelectorDefaultLabel) {
      var _texts$en181;
      var _label54 = texts[lang].autoGearAddSelectorDefaultLabel || ((_texts$en181 = texts.en) === null || _texts$en181 === void 0 ? void 0 : _texts$en181.autoGearAddSelectorDefaultLabel) || autoGearAddSelectorDefaultLabel.textContent;
      autoGearAddSelectorDefaultLabel.textContent = _label54;
      if (autoGearAddSelectorDefaultInput) {
        autoGearAddSelectorDefaultInput.setAttribute('aria-label', _label54);
      }
    }
    if (autoGearAddNotesLabel) {
      var _texts$en182;
      var _label55 = texts[lang].autoGearAddNotesLabel || ((_texts$en182 = texts.en) === null || _texts$en182 === void 0 ? void 0 : _texts$en182.autoGearAddNotesLabel) || autoGearAddNotesLabel.textContent;
      autoGearAddNotesLabel.textContent = _label55;
      if (autoGearAddNotesInput) {
        autoGearAddNotesInput.setAttribute('aria-label', _label55);
      }
    }
    if (autoGearAddItemButton) {
      if (typeof updateAutoGearItemButtonState === 'function') {
        updateAutoGearItemButtonState('add');
      }
    }
    if (autoGearRemoveItemsHeading) {
      var _texts$en183;
      autoGearRemoveItemsHeading.textContent = texts[lang].autoGearRemoveItemsHeading || ((_texts$en183 = texts.en) === null || _texts$en183 === void 0 ? void 0 : _texts$en183.autoGearRemoveItemsHeading) || autoGearRemoveItemsHeading.textContent;
    }
    if (autoGearRemoveOwnGearLabel) {
      var _texts$en184, _texts$en185, _texts$en186;
      var _label56 = texts[lang].autoGearOwnGearLabel || ((_texts$en184 = texts.en) === null || _texts$en184 === void 0 ? void 0 : _texts$en184.autoGearOwnGearLabel) || autoGearRemoveOwnGearLabel.textContent;
      var _help38 = texts[lang].autoGearOwnGearHelp || ((_texts$en185 = texts.en) === null || _texts$en185 === void 0 ? void 0 : _texts$en185.autoGearOwnGearHelp) || _label56;
      var _placeholder4 = texts[lang].autoGearOwnGearPlaceholder || ((_texts$en186 = texts.en) === null || _texts$en186 === void 0 ? void 0 : _texts$en186.autoGearOwnGearPlaceholder) || '';
      autoGearRemoveOwnGearLabel.textContent = _label56;
      autoGearRemoveOwnGearLabel.setAttribute('data-help', _help38);
      if (autoGearRemoveOwnGearSelect) {
        autoGearRemoveOwnGearSelect.setAttribute('aria-label', _label56);
        autoGearRemoveOwnGearSelect.setAttribute('data-help', _help38);
        if (_placeholder4) {
          autoGearRemoveOwnGearSelect.setAttribute('data-placeholder', _placeholder4);
        } else {
          autoGearRemoveOwnGearSelect.removeAttribute('data-placeholder');
        }
      }
    }
    if (autoGearRemoveItemLabel) {
      var _texts$en187, _texts$en188;
      var _label57 = texts[lang].autoGearRemoveItemLabel || ((_texts$en187 = texts.en) === null || _texts$en187 === void 0 ? void 0 : _texts$en187.autoGearRemoveItemLabel) || autoGearRemoveItemLabel.textContent;
      var _hint = texts[lang].autoGearRemoveMultipleHint || ((_texts$en188 = texts.en) === null || _texts$en188 === void 0 ? void 0 : _texts$en188.autoGearRemoveMultipleHint) || '';
      var _helpText4 = _hint ? "".concat(_label57, " \u2013 ").concat(_hint) : _label57;
      autoGearRemoveItemLabel.textContent = _label57;
      autoGearRemoveItemLabel.setAttribute('data-help', _helpText4);
      if (autoGearRemoveNameInput) {
        autoGearRemoveNameInput.setAttribute('aria-label', _label57);
        autoGearRemoveNameInput.setAttribute('data-help', _helpText4);
        if (_hint) {
          autoGearRemoveNameInput.setAttribute('placeholder', _hint);
        } else {
          autoGearRemoveNameInput.removeAttribute('placeholder');
        }
      }
    }
    if (autoGearRemoveCategoryLabel) {
      var _texts$en189;
      var _label58 = texts[lang].autoGearRemoveCategoryLabel || ((_texts$en189 = texts.en) === null || _texts$en189 === void 0 ? void 0 : _texts$en189.autoGearRemoveCategoryLabel) || autoGearRemoveCategoryLabel.textContent;
      autoGearRemoveCategoryLabel.textContent = _label58;
      if (autoGearRemoveCategorySelect) {
        autoGearRemoveCategorySelect.setAttribute('aria-label', _label58);
      }
    }
    if (autoGearRemoveQuantityLabel) {
      var _texts$en190;
      var _label59 = texts[lang].autoGearRemoveQuantityLabel || ((_texts$en190 = texts.en) === null || _texts$en190 === void 0 ? void 0 : _texts$en190.autoGearRemoveQuantityLabel) || autoGearRemoveQuantityLabel.textContent;
      autoGearRemoveQuantityLabel.textContent = _label59;
      if (autoGearRemoveQuantityInput) {
        autoGearRemoveQuantityInput.setAttribute('aria-label', _label59);
      }
    }
    if (autoGearRemoveScreenSizeLabel) {
      var _texts$en191;
      var _label60 = texts[lang].autoGearRemoveScreenSizeLabel || ((_texts$en191 = texts.en) === null || _texts$en191 === void 0 ? void 0 : _texts$en191.autoGearRemoveScreenSizeLabel) || autoGearRemoveScreenSizeLabel.textContent;
      autoGearRemoveScreenSizeLabel.textContent = _label60;
      if (autoGearRemoveScreenSizeInput) {
        autoGearRemoveScreenSizeInput.setAttribute('aria-label', _label60);
      }
    }
    if (autoGearRemoveSelectorTypeLabel) {
      var _texts$en192;
      var _label61 = texts[lang].autoGearRemoveSelectorTypeLabel || ((_texts$en192 = texts.en) === null || _texts$en192 === void 0 ? void 0 : _texts$en192.autoGearRemoveSelectorTypeLabel) || autoGearRemoveSelectorTypeLabel.textContent;
      autoGearRemoveSelectorTypeLabel.textContent = _label61;
      if (autoGearRemoveSelectorTypeSelect) {
        var _texts$en193, _texts$en194, _texts$en195, _texts$en196, _texts$en197, _texts$en198, _texts$en199;
        autoGearRemoveSelectorTypeSelect.setAttribute('aria-label', _label61);
        var _noneLabel = texts[lang].autoGearSelectorNoneOption || ((_texts$en193 = texts.en) === null || _texts$en193 === void 0 ? void 0 : _texts$en193.autoGearSelectorNoneOption) || 'No selector';
        var _monitorLabel = texts[lang].autoGearSelectorMonitorOption || ((_texts$en194 = texts.en) === null || _texts$en194 === void 0 ? void 0 : _texts$en194.autoGearSelectorMonitorOption) || 'Monitor selector';
        var _directorLabel = texts[lang].autoGearSelectorDirectorOption || ((_texts$en195 = texts.en) === null || _texts$en195 === void 0 ? void 0 : _texts$en195.autoGearSelectorDirectorOption) || 'Director monitor selector';
        var _tripodHeadLabel = texts[lang].autoGearSelectorTripodHeadOption || ((_texts$en196 = texts.en) === null || _texts$en196 === void 0 ? void 0 : _texts$en196.autoGearSelectorTripodHeadOption) || 'Tripod head selector';
        var _tripodBowlLabel2 = texts[lang].autoGearSelectorTripodBowlOption || ((_texts$en197 = texts.en) === null || _texts$en197 === void 0 ? void 0 : _texts$en197.autoGearSelectorTripodBowlOption) || 'Tripod bowl selector';
        var _tripodTypesLabel2 = texts[lang].autoGearSelectorTripodTypesOption || ((_texts$en198 = texts.en) === null || _texts$en198 === void 0 ? void 0 : _texts$en198.autoGearSelectorTripodTypesOption) || 'Tripod type selector';
        var _tripodSpreaderLabel2 = texts[lang].autoGearSelectorTripodSpreaderOption || ((_texts$en199 = texts.en) === null || _texts$en199 === void 0 ? void 0 : _texts$en199.autoGearSelectorTripodSpreaderOption) || 'Tripod spreader selector';
        var _selectorLabels = new Map([['none', _noneLabel], ['monitor', _monitorLabel], ['directorMonitor', _directorLabel], ['tripodHeadBrand', _tripodHeadLabel], ['tripodBowl', _tripodBowlLabel2], ['tripodTypes', _tripodTypesLabel2], ['tripodSpreader', _tripodSpreaderLabel2]]);
        Array.from(autoGearRemoveSelectorTypeSelect.options || []).forEach(function (opt) {
          var text = _selectorLabels.get(opt.value);
          if (text) opt.textContent = text;
        });
      }
    }
    if (autoGearRemoveSelectorDefaultLabel) {
      var _texts$en200;
      var _label62 = texts[lang].autoGearRemoveSelectorDefaultLabel || ((_texts$en200 = texts.en) === null || _texts$en200 === void 0 ? void 0 : _texts$en200.autoGearRemoveSelectorDefaultLabel) || autoGearRemoveSelectorDefaultLabel.textContent;
      autoGearRemoveSelectorDefaultLabel.textContent = _label62;
      if (autoGearRemoveSelectorDefaultInput) {
        autoGearRemoveSelectorDefaultInput.setAttribute('aria-label', _label62);
      }
    }
    if (autoGearRemoveNotesLabel) {
      var _texts$en201;
      var _label63 = texts[lang].autoGearRemoveNotesLabel || ((_texts$en201 = texts.en) === null || _texts$en201 === void 0 ? void 0 : _texts$en201.autoGearRemoveNotesLabel) || autoGearRemoveNotesLabel.textContent;
      autoGearRemoveNotesLabel.textContent = _label63;
      if (autoGearRemoveNotesInput) {
        autoGearRemoveNotesInput.setAttribute('aria-label', _label63);
      }
    }
    updateAutoGearOwnGearOptions();
    if (autoGearDraftImpactHeading) {
      var _texts$en202;
      var _heading2 = texts[lang].autoGearDraftImpactHeading || ((_texts$en202 = texts.en) === null || _texts$en202 === void 0 ? void 0 : _texts$en202.autoGearDraftImpactHeading) || autoGearDraftImpactHeading.textContent;
      autoGearDraftImpactHeading.textContent = _heading2;
    }
    if (autoGearDraftImpactDescription) {
      var _texts$en203;
      var _description2 = texts[lang].autoGearDraftImpactDescription || ((_texts$en203 = texts.en) === null || _texts$en203 === void 0 ? void 0 : _texts$en203.autoGearDraftImpactDescription) || autoGearDraftImpactDescription.textContent;
      autoGearDraftImpactDescription.textContent = _description2;
      if (autoGearDraftImpactHeading) {
        autoGearDraftImpactHeading.setAttribute('data-help', _description2);
      }
      if (autoGearDraftImpactContainer) {
        autoGearDraftImpactContainer.setAttribute('data-help', _description2);
      }
    }
    if (autoGearDraftWarningHeading) {
      var _texts$en204;
      var _heading3 = texts[lang].autoGearDraftWarningHeading || ((_texts$en204 = texts.en) === null || _texts$en204 === void 0 ? void 0 : _texts$en204.autoGearDraftWarningHeading) || autoGearDraftWarningHeading.textContent;
      autoGearDraftWarningHeading.textContent = _heading3;
    }
    if (autoGearRemoveItemButton) {
      if (typeof updateAutoGearItemButtonState === 'function') {
        updateAutoGearItemButtonState('remove');
      }
    }
    if (autoGearSaveRuleButton) {
      var _texts$en205;
      var _label64 = texts[lang].autoGearSaveRule || ((_texts$en205 = texts.en) === null || _texts$en205 === void 0 ? void 0 : _texts$en205.autoGearSaveRule) || autoGearSaveRuleButton.textContent;
      setButtonLabelWithIcon(autoGearSaveRuleButton, _label64);
      autoGearSaveRuleButton.setAttribute('data-help', _label64);
    }
    if (autoGearCancelEditButton) {
      var _texts$en206;
      var _label65 = texts[lang].autoGearCancelEdit || ((_texts$en206 = texts.en) === null || _texts$en206 === void 0 ? void 0 : _texts$en206.autoGearCancelEdit) || autoGearCancelEditButton.textContent;
      setButtonLabelWithIcon(autoGearCancelEditButton, _label65, ICON_GLYPHS.circleX);
      autoGearCancelEditButton.setAttribute('data-help', _label65);
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
    var contrastLabel = document.getElementById("settingsHighContrastLabel");
    if (contrastLabel) {
      contrastLabel.textContent = texts[lang].highContrastSetting;
      var contrastHelp = texts[lang].highContrastSettingHelp || texts[lang].highContrastSetting;
      contrastLabel.setAttribute("data-help", contrastHelp);
      if (settingsHighContrast) {
        settingsHighContrast.setAttribute("data-help", contrastHelp);
        settingsHighContrast.setAttribute("aria-label", texts[lang].highContrastSetting);
      }
    }
    var accessibilityHeading = document.getElementById("accessibilityHeading");
    if (accessibilityHeading) {
      accessibilityHeading.textContent = texts[lang].accessibilityHeading;
      accessibilityHeading.setAttribute("data-help", texts[lang].accessibilityHeadingHelp || texts[lang].accessibilityHeading);
    }
    var backupHeading = document.getElementById("backupHeading");
    if (backupHeading) {
      backupHeading.textContent = texts[lang].backupHeading;
      backupHeading.setAttribute("data-help", texts[lang].backupHeadingHelp || texts[lang].backupHeading);
    }
    var projectBackupsHeading = typeof document !== 'undefined' ? document.getElementById('projectBackupsHeading') : null;
    if (projectBackupsHeading) {
      var headingText = texts[lang].projectBackupsHeading || "Project Backups";
      projectBackupsHeading.textContent = headingText;
      var descriptionText = texts[lang].projectBackupsDescription || "";
      if (descriptionText) {
        projectBackupsHeading.setAttribute("data-help", descriptionText);
      } else {
        projectBackupsHeading.removeAttribute("data-help");
      }
    }
    var projectBackupsDescription = typeof document !== 'undefined' ? document.getElementById('projectBackupsDescription') : null;
    if (projectBackupsDescription) {
      var _descriptionText = texts[lang].projectBackupsDescription || "";
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
      var dataHelp = texts[lang].dataHeadingHelp || texts[lang].dataHeading;
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
      var _texts$en207, _texts$en208;
      var _headingText = texts[lang].storagePersistenceHeading || ((_texts$en207 = texts.en) === null || _texts$en207 === void 0 ? void 0 : _texts$en207.storagePersistenceHeading) || storagePersistenceHeading.textContent;
      storagePersistenceHeading.textContent = _headingText;
      var _headingHelp = texts[lang].storagePersistenceHeadingHelp || ((_texts$en208 = texts.en) === null || _texts$en208 === void 0 ? void 0 : _texts$en208.storagePersistenceHeadingHelp) || _headingText;
      storagePersistenceHeading.setAttribute('data-help', _headingHelp);
    }
    if (storagePersistenceIntro) {
      var _texts$en209;
      storagePersistenceIntro.textContent = texts[lang].storagePersistenceIntro || ((_texts$en209 = texts.en) === null || _texts$en209 === void 0 ? void 0 : _texts$en209.storagePersistenceIntro) || storagePersistenceIntro.textContent;
    }
    if (storagePersistenceRequestButton) {
      var _texts$en210, _texts$en211;
      var requestLabel = texts[lang].storagePersistenceRequest || ((_texts$en210 = texts.en) === null || _texts$en210 === void 0 ? void 0 : _texts$en210.storagePersistenceRequest) || storagePersistenceRequestButton.textContent;
      setButtonLabelWithIcon(storagePersistenceRequestButton, requestLabel, ICON_GLYPHS.save);
      storagePersistenceRequestButton.dataset.defaultLabel = requestLabel;
      var requestHelp = texts[lang].storagePersistenceRequestHelp || ((_texts$en211 = texts.en) === null || _texts$en211 === void 0 ? void 0 : _texts$en211.storagePersistenceRequestHelp) || requestLabel;
      storagePersistenceRequestButton.setAttribute('data-help', requestHelp);
      storagePersistenceRequestButton.setAttribute('title', requestHelp);
      storagePersistenceRequestButton.setAttribute('aria-label', requestHelp);
    }
    if (storagePersistenceStatus) {
      var _texts$en212;
      var idleText = texts[lang].storagePersistenceStatusIdle || ((_texts$en212 = texts.en) === null || _texts$en212 === void 0 ? void 0 : _texts$en212.storagePersistenceStatusIdle) || storagePersistenceStatus.textContent;
      storagePersistenceStatus.textContent = idleText;
      storagePersistenceStatus.setAttribute('data-help', idleText);
    }
    callCoreFunctionIfAvailable('renderStoragePersistenceStatus', [], {
      defer: true
    });
    if (storageActionsHeading) {
      var _texts$en213, _texts$en214;
      var _headingText2 = texts[lang].storageActionsHeading || ((_texts$en213 = texts.en) === null || _texts$en213 === void 0 ? void 0 : _texts$en213.storageActionsHeading) || storageActionsHeading.textContent;
      storageActionsHeading.textContent = _headingText2;
      var _headingHelp2 = texts[lang].storageActionsHeadingHelp || ((_texts$en214 = texts.en) === null || _texts$en214 === void 0 ? void 0 : _texts$en214.storageActionsHeadingHelp) || _headingText2;
      storageActionsHeading.setAttribute('data-help', _headingHelp2);
    }
    if (storageActionsIntro) {
      var _texts$en215;
      storageActionsIntro.textContent = texts[lang].storageActionsIntro || ((_texts$en215 = texts.en) === null || _texts$en215 === void 0 ? void 0 : _texts$en215.storageActionsIntro) || storageActionsIntro.textContent;
    }
    if (storageBackupNowButton) {
      var _texts$en216, _texts$en217;
      var backupLabel = texts[lang].storageBackupNow || ((_texts$en216 = texts.en) === null || _texts$en216 === void 0 ? void 0 : _texts$en216.storageBackupNow) || storageBackupNowButton.textContent;
      setButtonLabelWithIcon(storageBackupNowButton, backupLabel, ICON_GLYPHS.fileExport);
      var backupHelp = texts[lang].storageBackupNowHelp || ((_texts$en217 = texts.en) === null || _texts$en217 === void 0 ? void 0 : _texts$en217.storageBackupNowHelp) || backupLabel;
      storageBackupNowButton.setAttribute('data-help', backupHelp);
      storageBackupNowButton.setAttribute('title', backupHelp);
    }
    if (storageOpenBackupTabButton) {
      var _texts$en218, _texts$en219;
      var openLabel = texts[lang].storageOpenBackupTab || ((_texts$en218 = texts.en) === null || _texts$en218 === void 0 ? void 0 : _texts$en218.storageOpenBackupTab) || storageOpenBackupTabButton.textContent;
      setButtonLabelWithIcon(storageOpenBackupTabButton, openLabel, ICON_GLYPHS.settingsBackup);
      var openHelp = texts[lang].storageOpenBackupTabHelp || ((_texts$en219 = texts.en) === null || _texts$en219 === void 0 ? void 0 : _texts$en219.storageOpenBackupTabHelp) || openLabel;
      storageOpenBackupTabButton.setAttribute('data-help', openHelp);
      storageOpenBackupTabButton.setAttribute('title', openHelp);
    }
    if (storageStatusHeading) {
      var _texts$en220, _texts$en221;
      var statusHeading = texts[lang].storageStatusHeading || ((_texts$en220 = texts.en) === null || _texts$en220 === void 0 ? void 0 : _texts$en220.storageStatusHeading) || storageStatusHeading.textContent;
      storageStatusHeading.textContent = statusHeading;
      var statusHelp = texts[lang].storageStatusHeadingHelp || ((_texts$en221 = texts.en) === null || _texts$en221 === void 0 ? void 0 : _texts$en221.storageStatusHeadingHelp) || statusHeading;
      storageStatusHeading.setAttribute('data-help', statusHelp);
    }
    if (storageStatusLastProjectLabel) {
      var _texts$en222;
      storageStatusLastProjectLabel.textContent = texts[lang].storageStatusLastProjectLabel || ((_texts$en222 = texts.en) === null || _texts$en222 === void 0 ? void 0 : _texts$en222.storageStatusLastProjectLabel) || storageStatusLastProjectLabel.textContent;
    }
    if (storageStatusLastAutoBackupLabel) {
      var _texts$en223;
      storageStatusLastAutoBackupLabel.textContent = texts[lang].storageStatusLastAutoBackupLabel || ((_texts$en223 = texts.en) === null || _texts$en223 === void 0 ? void 0 : _texts$en223.storageStatusLastAutoBackupLabel) || storageStatusLastAutoBackupLabel.textContent;
    }
    if (storageStatusLastFullBackupLabel) {
      var _texts$en224;
      storageStatusLastFullBackupLabel.textContent = texts[lang].storageStatusLastFullBackupLabel || ((_texts$en224 = texts.en) === null || _texts$en224 === void 0 ? void 0 : _texts$en224.storageStatusLastFullBackupLabel) || storageStatusLastFullBackupLabel.textContent;
    }
    var statusDefaultText = texts[lang].storageStatusNever || ((_texts$en225 = texts.en) === null || _texts$en225 === void 0 ? void 0 : _texts$en225.storageStatusNever) || (storageStatusLastProjectValue ? storageStatusLastProjectValue.textContent : '');
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
      var _texts$en226;
      var sectionHelp = texts[lang].loggingSectionHelp || texts[lang].loggingHeadingHelp || ((_texts$en226 = texts.en) === null || _texts$en226 === void 0 ? void 0 : _texts$en226.loggingHeadingHelp) || '';
      if (sectionHelp) {
        loggingSection.setAttribute('data-help', sectionHelp);
      } else {
        loggingSection.removeAttribute('data-help');
      }
    }
    if (loggingHeading) {
      var _texts$en227, _texts$en228;
      var _headingText3 = texts[lang].loggingHeading || ((_texts$en227 = texts.en) === null || _texts$en227 === void 0 ? void 0 : _texts$en227.loggingHeading) || loggingHeading.textContent || 'Diagnostics log';
      loggingHeading.textContent = _headingText3;
      var _headingHelp3 = texts[lang].loggingHeadingHelp || ((_texts$en228 = texts.en) === null || _texts$en228 === void 0 ? void 0 : _texts$en228.loggingHeadingHelp) || _headingText3;
      loggingHeading.setAttribute('data-help', _headingHelp3);
    }
    if (loggingIntro) {
      var _texts$en229;
      loggingIntro.textContent = texts[lang].loggingIntro || ((_texts$en229 = texts.en) === null || _texts$en229 === void 0 ? void 0 : _texts$en229.loggingIntro) || loggingIntro.textContent;
    }
    if (loggingLevelFilterLabel) {
      var _texts$en230;
      var _filterLabel = texts[lang].loggingLevelFilterLabel || ((_texts$en230 = texts.en) === null || _texts$en230 === void 0 ? void 0 : _texts$en230.loggingLevelFilterLabel) || loggingLevelFilterLabel.textContent;
      loggingLevelFilterLabel.textContent = _filterLabel;
      loggingLevelFilterLabel.setAttribute('data-help', _filterLabel);
    }
    if (loggingLevelFilter) {
      var _texts$en231, _texts$en232, _texts$en233, _texts$en234, _texts$en235;
      var optionTexts = {
        all: texts[lang].loggingLevelFilterAll || ((_texts$en231 = texts.en) === null || _texts$en231 === void 0 ? void 0 : _texts$en231.loggingLevelFilterAll) || 'All levels',
        info: texts[lang].loggingLevelFilterInfo || ((_texts$en232 = texts.en) === null || _texts$en232 === void 0 ? void 0 : _texts$en232.loggingLevelFilterInfo) || 'Info and above',
        warn: texts[lang].loggingLevelFilterWarn || ((_texts$en233 = texts.en) === null || _texts$en233 === void 0 ? void 0 : _texts$en233.loggingLevelFilterWarn) || 'Warnings and errors',
        error: texts[lang].loggingLevelFilterError || ((_texts$en234 = texts.en) === null || _texts$en234 === void 0 ? void 0 : _texts$en234.loggingLevelFilterError) || 'Errors only'
      };
      Array.from(loggingLevelFilter.options || []).forEach(function (option) {
        if (!option || typeof option.value !== 'string') return;
        var key = option.value;
        if (Object.prototype.hasOwnProperty.call(optionTexts, key)) {
          option.textContent = optionTexts[key];
        }
      });
      var filterHelp = texts[lang].loggingLevelFilterHelp || ((_texts$en235 = texts.en) === null || _texts$en235 === void 0 ? void 0 : _texts$en235.loggingLevelFilterHelp) || '';
      if (filterHelp) {
        loggingLevelFilter.setAttribute('data-help', filterHelp);
      } else {
        loggingLevelFilter.removeAttribute('data-help');
      }
    }
    if (loggingNamespaceFilterLabel) {
      var _texts$en236;
      var namespaceLabel = texts[lang].loggingNamespaceFilterLabel || ((_texts$en236 = texts.en) === null || _texts$en236 === void 0 ? void 0 : _texts$en236.loggingNamespaceFilterLabel) || loggingNamespaceFilterLabel.textContent;
      loggingNamespaceFilterLabel.textContent = namespaceLabel;
    }
    if (loggingNamespaceFilter) {
      var _texts$en237, _texts$en238;
      var _placeholder5 = texts[lang].loggingNamespaceFilterPlaceholder || ((_texts$en237 = texts.en) === null || _texts$en237 === void 0 ? void 0 : _texts$en237.loggingNamespaceFilterPlaceholder) || '';
      if (_placeholder5) {
        loggingNamespaceFilter.setAttribute('placeholder', _placeholder5);
      }
      var namespaceHelp = texts[lang].loggingNamespaceFilterHelp || ((_texts$en238 = texts.en) === null || _texts$en238 === void 0 ? void 0 : _texts$en238.loggingNamespaceFilterHelp) || _placeholder5;
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
      var _texts$en239;
      var historyLabel = texts[lang].loggingHistoryLimitLabel || ((_texts$en239 = texts.en) === null || _texts$en239 === void 0 ? void 0 : _texts$en239.loggingHistoryLimitLabel) || loggingHistoryLimitLabel.textContent;
      loggingHistoryLimitLabel.textContent = historyLabel;
    }
    if (loggingHistoryLimitHelp) {
      var _texts$en240;
      var historyHelp = texts[lang].loggingHistoryLimitHelp || ((_texts$en240 = texts.en) === null || _texts$en240 === void 0 ? void 0 : _texts$en240.loggingHistoryLimitHelp) || loggingHistoryLimitHelp.textContent;
      loggingHistoryLimitHelp.textContent = historyHelp;
    }
    if (loggingHistoryLimit) {
      var _texts$en241, _texts$en242;
      var limitHelp = texts[lang].loggingHistoryLimitHelp || ((_texts$en241 = texts.en) === null || _texts$en241 === void 0 ? void 0 : _texts$en241.loggingHistoryLimitHelp) || '';
      if (limitHelp) {
        loggingHistoryLimit.setAttribute('data-help', limitHelp);
      } else {
        loggingHistoryLimit.removeAttribute('data-help');
      }
      var limitAria = texts[lang].loggingHistoryLimitAria || ((_texts$en242 = texts.en) === null || _texts$en242 === void 0 ? void 0 : _texts$en242.loggingHistoryLimitAria) || '';
      if (limitAria) {
        loggingHistoryLimit.setAttribute('aria-label', limitAria);
      }
    }
    if (loggingConsoleOutputLabel) {
      var _texts$en243;
      var consoleLabel = texts[lang].loggingConsoleOutputLabel || ((_texts$en243 = texts.en) === null || _texts$en243 === void 0 ? void 0 : _texts$en243.loggingConsoleOutputLabel) || loggingConsoleOutputLabel.textContent;
      loggingConsoleOutputLabel.textContent = consoleLabel;
    }
    if (loggingConsoleOutputHelp) {
      var _texts$en244;
      var consoleHelp = texts[lang].loggingConsoleOutputHelp || ((_texts$en244 = texts.en) === null || _texts$en244 === void 0 ? void 0 : _texts$en244.loggingConsoleOutputHelp) || loggingConsoleOutputHelp.textContent;
      loggingConsoleOutputHelp.textContent = consoleHelp;
    }
    if (loggingCaptureConsoleLabel) {
      var _texts$en245;
      var consoleCaptureLabel = texts[lang].loggingCaptureConsoleLabel || ((_texts$en245 = texts.en) === null || _texts$en245 === void 0 ? void 0 : _texts$en245.loggingCaptureConsoleLabel) || loggingCaptureConsoleLabel.textContent;
      loggingCaptureConsoleLabel.textContent = consoleCaptureLabel;
    }
    if (loggingCaptureConsoleHelp) {
      var _texts$en246;
      var consoleCaptureHelp = texts[lang].loggingCaptureConsoleHelp || ((_texts$en246 = texts.en) === null || _texts$en246 === void 0 ? void 0 : _texts$en246.loggingCaptureConsoleHelp) || loggingCaptureConsoleHelp.textContent;
      loggingCaptureConsoleHelp.textContent = consoleCaptureHelp;
    }
    if (loggingCaptureErrorsLabel) {
      var _texts$en247;
      var captureLabel = texts[lang].loggingCaptureErrorsLabel || ((_texts$en247 = texts.en) === null || _texts$en247 === void 0 ? void 0 : _texts$en247.loggingCaptureErrorsLabel) || loggingCaptureErrorsLabel.textContent;
      loggingCaptureErrorsLabel.textContent = captureLabel;
    }
    if (loggingCaptureErrorsHelp) {
      var _texts$en248;
      var captureHelp = texts[lang].loggingCaptureErrorsHelp || ((_texts$en248 = texts.en) === null || _texts$en248 === void 0 ? void 0 : _texts$en248.loggingCaptureErrorsHelp) || loggingCaptureErrorsHelp.textContent;
      loggingCaptureErrorsHelp.textContent = captureHelp;
    }
    if (loggingPersistSessionLabel) {
      var _texts$en249;
      var persistLabel = texts[lang].loggingPersistSessionLabel || ((_texts$en249 = texts.en) === null || _texts$en249 === void 0 ? void 0 : _texts$en249.loggingPersistSessionLabel) || loggingPersistSessionLabel.textContent;
      loggingPersistSessionLabel.textContent = persistLabel;
    }
    if (loggingPersistSessionHelp) {
      var _texts$en250;
      var persistHelp = texts[lang].loggingPersistSessionHelp || ((_texts$en250 = texts.en) === null || _texts$en250 === void 0 ? void 0 : _texts$en250.loggingPersistSessionHelp) || loggingPersistSessionHelp.textContent;
      loggingPersistSessionHelp.textContent = persistHelp;
    }
    if (loggingStatus) {
      var _texts$en251;
      var statusText = texts[lang].loggingStatusIdle || ((_texts$en251 = texts.en) === null || _texts$en251 === void 0 ? void 0 : _texts$en251.loggingStatusIdle) || '';
      loggingStatus.textContent = statusText;
      if (statusText) {
        loggingStatus.setAttribute('data-help', statusText);
      }
    }
    if (loggingEmpty) {
      var _texts$en252;
      var _emptyText = texts[lang].loggingEmptyState || ((_texts$en252 = texts.en) === null || _texts$en252 === void 0 ? void 0 : _texts$en252.loggingEmptyState) || loggingEmpty.textContent;
      loggingEmpty.textContent = _emptyText;
      if (_emptyText) {
        loggingEmpty.setAttribute('data-help', _emptyText);
      }
    }
    if (loggingUnavailable) {
      var _texts$en253;
      loggingUnavailable.textContent = texts[lang].loggingUnavailable || ((_texts$en253 = texts.en) === null || _texts$en253 === void 0 ? void 0 : _texts$en253.loggingUnavailable) || loggingUnavailable.textContent;
    }
    var showAutoBackupsLabel = document.getElementById("settingsShowAutoBackupsLabel");
    if (showAutoBackupsLabel) {
      showAutoBackupsLabel.textContent = texts[lang].showAutoBackupsSetting;
      var autoBackupsHelp = texts[lang].showAutoBackupsHelp || texts[lang].showAutoBackupsSetting;
      showAutoBackupsLabel.setAttribute("data-help", autoBackupsHelp);
      if (settingsShowAutoBackupsEl) {
        settingsShowAutoBackupsEl.setAttribute("data-help", autoBackupsHelp);
        settingsShowAutoBackupsEl.setAttribute("aria-label", texts[lang].showAutoBackupsSetting);
      }
    }
    if (backupDiffToggleButtonEl) {
      var compareLabel = texts[lang].versionCompareButton || 'Compare versions';
      setButtonLabelWithIcon(backupDiffToggleButtonEl, compareLabel, ICON_GLYPHS.note);
      var compareHelp = texts[lang].versionCompareButtonHelp || compareLabel;
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
      var primaryLabel = texts[lang].versionComparePrimaryLabel || 'Baseline version';
      backupDiffPrimaryLabelEl.textContent = primaryLabel;
      if (backupDiffPrimarySelectEl) {
        backupDiffPrimarySelectEl.setAttribute('aria-label', primaryLabel);
      }
    }
    if (backupDiffSecondaryLabelEl) {
      var compareLabelText = texts[lang].versionCompareSecondaryLabel || 'Comparison version';
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
      var _placeholder6 = texts[lang].versionCompareNotesPlaceholder || 'Record context, on-set observations, or required follow-up.';
      backupDiffNotesEl.placeholder = _placeholder6;
    }
    if (backupDiffExportButtonEl) {
      var exportLabel = texts[lang].versionCompareExport || 'Export log';
      setButtonLabelWithIcon(backupDiffExportButtonEl, exportLabel, ICON_GLYPHS.fileExport);
      var exportHelp = texts[lang].versionCompareExportHelp || exportLabel;
      backupDiffExportButtonEl.setAttribute('data-help', exportHelp);
      backupDiffExportButtonEl.setAttribute('title', exportHelp);
    }
    if (backupDiffCloseButtonEl) {
      var closeLabel = texts[lang].versionCompareClose || texts[lang].cancelSettings || 'Close';
      setButtonLabelWithIcon(backupDiffCloseButtonEl, closeLabel, ICON_GLYPHS.circleX);
    }
    if (backupSettingsButton) {
      var _backupLabel = texts[lang].backupSettings;
      setButtonLabelWithIcon(backupSettingsButton, _backupLabel, ICON_GLYPHS.fileExport);
      var _backupHelp = texts[lang].backupSettingsHelp || _backupLabel;
      backupSettingsButton.setAttribute("data-help", _backupHelp);
      backupSettingsButton.setAttribute("title", _backupHelp);
      backupSettingsButton.setAttribute("aria-label", _backupHelp);
    }
    if (restoreSettings) {
      var restoreLabel = texts[lang].restoreSettings;
      setButtonLabelWithIcon(restoreSettings, restoreLabel, ICON_GLYPHS.fileImport);
      var restoreHelp = texts[lang].restoreSettingsHelp || restoreLabel;
      restoreSettings.setAttribute("data-help", restoreHelp);
      restoreSettings.setAttribute("title", restoreHelp);
      restoreSettings.setAttribute("aria-label", restoreHelp);
    }
    if (restoreRehearsalButton) {
      var rehearsalLabel = texts[lang].restoreRehearsalButton || 'Restore rehearsal';
      setButtonLabelWithIcon(restoreRehearsalButton, rehearsalLabel, ICON_GLYPHS.load);
      var rehearsalHelp = texts[lang].restoreRehearsalButtonHelp || rehearsalLabel;
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
      var browseLabel = texts[lang].restoreRehearsalFileButton || 'Choose file';
      setButtonLabelWithIcon(restoreRehearsalBrowse, browseLabel, ICON_GLYPHS.fileImport);
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
      var _texts$en254;
      restoreRehearsalRuleHeading.textContent = texts[lang].restoreRehearsalRuleHeading || ((_texts$en254 = texts.en) === null || _texts$en254 === void 0 ? void 0 : _texts$en254.restoreRehearsalRuleHeading) || restoreRehearsalRuleHeading.textContent;
    }
    if (restoreRehearsalRuleIntro) {
      var _texts$en255;
      restoreRehearsalRuleIntro.textContent = texts[lang].restoreRehearsalRuleIntro || ((_texts$en255 = texts.en) === null || _texts$en255 === void 0 ? void 0 : _texts$en255.restoreRehearsalRuleIntro) || restoreRehearsalRuleIntro.textContent;
    }
    if (restoreRehearsalRuleEmpty) {
      var _texts$en256;
      restoreRehearsalRuleEmpty.textContent = texts[lang].restoreRehearsalRuleEmpty || ((_texts$en256 = texts.en) === null || _texts$en256 === void 0 ? void 0 : _texts$en256.restoreRehearsalRuleEmpty) || restoreRehearsalRuleEmpty.textContent;
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
    var resolvedRestoreRehearsalCloseButton = typeof restoreRehearsalCloseButton !== 'undefined' ? restoreRehearsalCloseButton : resolveElement('restoreRehearsalCloseButton', 'restoreRehearsalClose');
    if (resolvedRestoreRehearsalCloseButton) {
      var _closeLabel = texts[lang].restoreRehearsalClose || texts[lang].cancelSettings || 'Close';
      setButtonLabelWithIcon(resolvedRestoreRehearsalCloseButton, _closeLabel, ICON_GLYPHS.circleX);
      resolvedRestoreRehearsalCloseButton.setAttribute('title', _closeLabel);
      resolvedRestoreRehearsalCloseButton.setAttribute('aria-label', _closeLabel);
    }
    if (restoreRehearsalProceedButton) {
      var _texts$en257, _texts$en258;
      var proceedLabel = texts[lang].restoreRehearsalProceed || ((_texts$en257 = texts.en) === null || _texts$en257 === void 0 ? void 0 : _texts$en257.restoreRehearsalProceed) || 'Continue rehearsal restore';
      var proceedHelp = texts[lang].restoreRehearsalProceedHelp || ((_texts$en258 = texts.en) === null || _texts$en258 === void 0 ? void 0 : _texts$en258.restoreRehearsalProceedHelp) || proceedLabel;
      setButtonLabelWithIcon(restoreRehearsalProceedButton, proceedLabel, ICON_GLYPHS.check);
      restoreRehearsalProceedButton.setAttribute('data-help', proceedHelp);
      restoreRehearsalProceedButton.setAttribute('title', proceedHelp);
      restoreRehearsalProceedButton.setAttribute('aria-label', proceedHelp);
    }
    if (restoreRehearsalAbortButton) {
      var _texts$en259, _texts$en260;
      var abortLabel = texts[lang].restoreRehearsalAbort || ((_texts$en259 = texts.en) === null || _texts$en259 === void 0 ? void 0 : _texts$en259.restoreRehearsalAbort) || 'Abort rehearsal';
      var abortHelp = texts[lang].restoreRehearsalAbortHelp || ((_texts$en260 = texts.en) === null || _texts$en260 === void 0 ? void 0 : _texts$en260.restoreRehearsalAbortHelp) || abortLabel;
      setButtonLabelWithIcon(restoreRehearsalAbortButton, abortLabel, ICON_GLYPHS.circleX);
      restoreRehearsalAbortButton.setAttribute('data-help', abortHelp);
      restoreRehearsalAbortButton.setAttribute('title', abortHelp);
      restoreRehearsalAbortButton.setAttribute('aria-label', abortHelp);
    }
    if (factoryResetButton) {
      var resetLabel = texts[lang].factoryResetButton || "Factory reset";
      var resetHelp = texts[lang].factoryResetButtonHelp || resetLabel;
      setButtonLabelWithIcon(factoryResetButton, resetLabel, ICON_GLYPHS.reload);
      factoryResetButton.setAttribute("data-help", resetHelp);
      factoryResetButton.setAttribute("title", resetHelp);
      factoryResetButton.setAttribute("aria-label", resetHelp);
    }
    var aboutHeading = document.getElementById("aboutHeading");
    if (aboutHeading) {
      aboutHeading.textContent = texts[lang].aboutHeading;
      aboutHeading.setAttribute("data-help", texts[lang].aboutHeadingHelp || texts[lang].aboutHeading);
    }
    var aboutVersionElem = typeof document !== 'undefined' ? document.getElementById('aboutVersion') : null;
    if (aboutVersionElem) aboutVersionElem.textContent = "".concat(texts[lang].versionLabel, " ").concat(APP_VERSION);
    var supportLink = typeof document !== 'undefined' ? document.getElementById('supportLink') : null;
    if (supportLink) {
      supportLink.textContent = texts[lang].supportLink;
      var supportHelp = texts[lang].supportLinkHelp || texts[lang].supportLink;
      supportLink.setAttribute("data-help", supportHelp);
      supportLink.setAttribute("title", supportHelp);
    }
    if (settingsSave) {
      var _texts$en261;
      var _label66 = texts[lang].saveSettings || ((_texts$en261 = texts.en) === null || _texts$en261 === void 0 ? void 0 : _texts$en261.saveSettings) || settingsSave.textContent;
      setButtonLabelWithIcon(settingsSave, _label66);
      var saveHelp = texts[lang].saveSettingsHelp || texts[lang].saveSettings || _label66;
      settingsSave.setAttribute("data-help", saveHelp);
      settingsSave.setAttribute("title", saveHelp);
      settingsSave.setAttribute("aria-label", saveHelp);
    }
    if (settingsCancel) {
      var _texts$en262;
      var _cancelLabel = texts[lang].cancelSettings || ((_texts$en262 = texts.en) === null || _texts$en262 === void 0 ? void 0 : _texts$en262.cancelSettings) || settingsCancel.textContent;
      setButtonLabelWithIcon(settingsCancel, _cancelLabel, ICON_GLYPHS.circleX);
      var cancelHelp = texts[lang].cancelSettingsHelp || texts[lang].cancelSettings || _cancelLabel;
      settingsCancel.setAttribute("data-help", cancelHelp);
      settingsCancel.setAttribute("title", cancelHelp);
      settingsCancel.setAttribute("aria-label", cancelHelp);
    }
    var menuToggle = document.getElementById("menuToggle");
    if (menuToggle) {
      var _texts$en263, _texts$en264;
      var menuLabel = texts[lang].menuToggleLabel || ((_texts$en263 = texts.en) === null || _texts$en263 === void 0 ? void 0 : _texts$en263.menuToggleLabel) || menuToggle.getAttribute("aria-label") || "Menu";
      var _closeLabel2 = texts[lang].sideMenuClose || ((_texts$en264 = texts.en) === null || _texts$en264 === void 0 ? void 0 : _texts$en264.sideMenuClose) || menuToggle.dataset.closeLabel || "Close menu";
      var closeHelp = texts[lang].sideMenuCloseHelp || _closeLabel2;
      menuToggle.setAttribute("title", menuLabel);
      menuToggle.setAttribute("aria-label", menuLabel);
      var menuHelp = texts[lang].menuToggleHelp || menuLabel;
      menuToggle.setAttribute("data-help", menuHelp);
      menuToggle.dataset.menuLabel = menuLabel;
      menuToggle.dataset.menuHelp = menuHelp;
      menuToggle.dataset.closeLabel = _closeLabel2;
      menuToggle.dataset.closeHelp = closeHelp;
    }
    var sideMenu = document.getElementById("sideMenu");
    if (sideMenu) {
      var sideMenuHelp = texts[lang].sideMenuHelp;
      if (sideMenuHelp) {
        sideMenu.setAttribute("data-help", sideMenuHelp);
      } else {
        sideMenu.removeAttribute("data-help");
      }
    }
    var sideMenuTitle = document.getElementById("sideMenuTitle");
    if (sideMenuTitle) {
      var _texts$en265;
      var titleLabel = texts[lang].sideMenuTitle || ((_texts$en265 = texts.en) === null || _texts$en265 === void 0 ? void 0 : _texts$en265.sideMenuTitle) || sideMenuTitle.textContent;
      sideMenuTitle.textContent = titleLabel;
      var titleHelp = texts[lang].sideMenuTitleHelp || texts[lang].sideMenuHelp || titleLabel;
      sideMenuTitle.setAttribute("data-help", titleHelp);
    }
    var closeMenuButton = document.getElementById("closeMenuButton");
    var closeMenuLabel = document.getElementById("closeMenuLabel");
    if (closeMenuButton) {
      var _texts$en266;
      var _closeLabel3 = texts[lang].sideMenuClose || ((_texts$en266 = texts.en) === null || _texts$en266 === void 0 ? void 0 : _texts$en266.sideMenuClose) || closeMenuButton.getAttribute("aria-label") || "Close menu";
      var _closeHelp = texts[lang].sideMenuCloseHelp || _closeLabel3;
      closeMenuButton.setAttribute("aria-label", _closeLabel3);
      closeMenuButton.setAttribute("title", _closeHelp);
      closeMenuButton.setAttribute("data-help", _closeHelp);
      if (closeMenuLabel) {
        closeMenuLabel.textContent = _closeLabel3;
      }
    }
    if (reloadButton) {
      reloadButton.setAttribute("title", texts[lang].reloadAppLabel);
      reloadButton.setAttribute("aria-label", texts[lang].reloadAppLabel);
      reloadButton.setAttribute("data-help", texts[lang].reloadAppHelp || texts[lang].reloadAppLabel);
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
      var helpShortcutList = texts[lang].helpButtonShortcuts;
      if (typeof helpShortcutList === 'string' && helpShortcutList.trim()) {
        helpButton.setAttribute('data-shortcuts', helpShortcutList);
      } else {
        helpButton.removeAttribute('data-shortcuts');
      }
      var helpAriaShortcuts = texts[lang].helpButtonAriaShortcuts || 'F1 Control+Slash Meta+Slash Shift+Slash KeyH';
      if (typeof helpAriaShortcuts === 'string' && helpAriaShortcuts.trim()) {
        helpButton.setAttribute('aria-keyshortcuts', helpAriaShortcuts);
      } else {
        helpButton.removeAttribute('aria-keyshortcuts');
      }
      if (hoverHelpButton) {
        setButtonLabelWithIcon(hoverHelpButton, texts[lang].hoverHelpButtonLabel, ICON_GLYPHS.note);
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
        setButtonLabelWithIcon(closeHelpBtn, texts[lang].helpClose, ICON_GLYPHS.circleX);
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
      var quickStartHeading = doc && doc.querySelector ? doc.querySelector("#helpQuickStartGuide h4") : null;
      if (quickStartHeading) {
        var fallback = quickStartHeading.textContent || "Quick start checklist";
        applyTextContent(quickStartHeading, "helpQuickStartChecklistTitle", fallback);
      }
      var onboardingCopyElement = doc ? doc.getElementById("helpOnboardingTutorialCopy") : null;
      if (onboardingCopyElement) {
        var fallbackCopy = onboardingCopyElement.textContent || "to walk through every workflow before configuring your first project.";
        applyTextContent(onboardingCopyElement, "helpOnboardingTutorialCopy", fallbackCopy);
      }
      var dataSafetyHeading = doc && doc.querySelector ? doc.querySelector("#helpDataSafety h4") : null;
      if (dataSafetyHeading) {
        var _fallback = dataSafetyHeading.textContent || "Protect your work";
        applyTextContent(dataSafetyHeading, "helpDataSafetyTitle", _fallback);
      }
      var restoreDrillHeading = doc ? doc.getElementById("helpRestoreDrillHeading") : null;
      if (restoreDrillHeading) {
        var _fallback2 = restoreDrillHeading.textContent || "Restore rehearsal drill";
        applyTextContent(restoreDrillHeading, "helpRestoreDrillTitle", _fallback2);
      }
      var restoreDrillNote = doc ? doc.getElementById("helpRestoreDrillNote") : null;
      if (restoreDrillNote) {
        var _fallback3 = restoreDrillNote.textContent || "Record the filename, timestamp and verification results in your backup log before closing the rehearsal so every drill leaves behind a documented recovery point.";
        applyTextContent(restoreDrillNote, "helpRestoreDrillNote", _fallback3);
      }
      if (helpDataAuditHeading) {
        var _fallback4 = helpDataAuditHeading.textContent || "Monthly data health check";
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
        var _fallback5 = helpDataAuditNote.textContent || "Log the results in your backup rotation checklist so you always know which copies were verified offline.";
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
    setButtonLabelWithIcon(document.getElementById("generateOverviewBtn"), texts[lang].generateOverviewBtn, ICON_GLYPHS.overview);
    setButtonLabelWithIcon(document.getElementById("generateGearListBtn"), texts[lang].generateGearListBtn, ICON_GLYPHS.gearList);
    setButtonLabelWithIcon(document.getElementById("shareSetupBtn"), texts[lang].shareSetupBtn, ICON_GLYPHS.fileExport);
    var exportRevert = document.getElementById("exportAndRevertBtn");
    if (exportRevert) {
      setButtonLabelWithIcon(exportRevert, texts[lang].exportAndRevertBtn, ICON_GLYPHS.reload);
      exportRevert.setAttribute('data-help', texts[lang].exportAndRevertBtnHelp);
    }
    var downloadDiagramButton = typeof downloadDiagramBtn !== 'undefined' && downloadDiagramBtn || (typeof document !== 'undefined' && document && typeof document.getElementById === 'function' ? document.getElementById('downloadDiagram') : null);
    if (downloadDiagramButton) {
      downloadDiagramButton.textContent = texts[lang].downloadDiagramBtn;
      downloadDiagramButton.setAttribute("title", texts[lang].downloadDiagramBtn);
      downloadDiagramButton.setAttribute("aria-label", texts[lang].downloadDiagramBtn);
      downloadDiagramButton.setAttribute("data-help", texts[lang].downloadDiagramHelp);
    }
    if (gridSnapToggleBtn) {
      setButtonLabelWithIcon(gridSnapToggleBtn, texts[lang].gridSnapToggle, ICON_GLYPHS.magnet);
      gridSnapToggleBtn.setAttribute("title", texts[lang].gridSnapToggle);
      gridSnapToggleBtn.setAttribute("aria-label", texts[lang].gridSnapToggle);
      gridSnapToggleBtn.setAttribute("data-help", texts[lang].gridSnapToggleHelp);
      var snapActive = false;
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
    var resetViewBtn = typeof document !== 'undefined' ? document.getElementById('resetView') : null;
    if (resetViewBtn) {
      setButtonLabelWithIcon(resetViewBtn, texts[lang].resetViewBtn, ICON_GLYPHS.resetView);
      resetViewBtn.setAttribute("title", texts[lang].resetViewBtn);
      resetViewBtn.setAttribute("aria-label", texts[lang].resetViewBtn);
      resetViewBtn.setAttribute("data-help", texts[lang].resetViewHelp);
    }
    var zoomInBtn = typeof document !== 'undefined' ? document.getElementById('zoomIn') : null;
    if (zoomInBtn) {
      setButtonLabelWithIcon(zoomInBtn, '', ICON_GLYPHS.add);
      zoomInBtn.setAttribute("title", texts[lang].zoomInLabel);
      zoomInBtn.setAttribute("aria-label", texts[lang].zoomInLabel);
      zoomInBtn.setAttribute("data-help", texts[lang].zoomInHelp);
    }
    var zoomOutBtn = typeof document !== 'undefined' ? document.getElementById('zoomOut') : null;
    if (zoomOutBtn) {
      setButtonLabelWithIcon(zoomOutBtn, '', ICON_GLYPHS.minus);
      zoomOutBtn.setAttribute("title", texts[lang].zoomOutLabel);
      zoomOutBtn.setAttribute("aria-label", texts[lang].zoomOutLabel);
      zoomOutBtn.setAttribute("data-help", texts[lang].zoomOutHelp);
    }
    var diagramHint = typeof document !== 'undefined' ? document.getElementById('diagramHint') : null;
    if (diagramHint) {
      diagramHint.textContent = texts[lang].diagramMoveHint;
    }
    var fallbackProjectForm = texts.en && texts.en.projectForm ? texts.en.projectForm : {};
    var projectFormTexts = texts[lang].projectForm || fallbackProjectForm;
    if (projectFormTexts) {
      var _texts$en267, _texts$lang5;
      resolveContactsDomRefs();
      var setLabelText = function setLabelText(element, key) {
        if (!element) return;
        var value = projectFormTexts[key] || fallbackProjectForm[key];
        if (value) element.textContent = value;
      };
      var setPlaceholder = function setPlaceholder(element, key) {
        if (!element) return;
        var value = projectFormTexts[key] || fallbackProjectForm[key];
        if (value) element.setAttribute('placeholder', value);
      };
      var setOptionText = function setOptionText(element, key) {
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
        var crewLabelText = projectFormTexts.crewHeading || fallbackProjectForm.crewHeading;
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
        var rangeTemplate = projectFormTexts.recordingFrameRateRangeHint || fallbackProjectForm.recordingFrameRateRangeHint || '';
        var defaultHint = projectFormTexts.recordingFrameRateDefaultHint || fallbackProjectForm.recordingFrameRateDefaultHint || '';
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
      setLabelText(lensesHeadingElem, 'lensesHeading');
      setLabelText(lensManufacturerLabel, 'lensManufacturerStep');
      setLabelText(lensSeriesLabel, 'lensSeriesStep');
      setLabelText(lensesLabelElem, 'lensesLabel');
      setLabelText(lensSelectionsHeadingElem, 'lensSelectionsLabel');
      setLabelText(lensSelectionsHintElem, 'lensSelectionsHint');
      setOptionText(lensManufacturerPlaceholderOption, 'lensManufacturerPlaceholder');
      setOptionText(lensSeriesPlaceholderOption, 'lensSeriesPlaceholder');
      if (lensSeriesEmptyElem) {
        var seriesEmptyText = projectFormTexts.lensSeriesEmpty || fallbackProjectForm.lensSeriesEmpty;
        if (seriesEmptyText) lensSeriesEmptyElem.textContent = seriesEmptyText;
      }
      if (lensOptionsEmptyElem) {
        var optionsEmptyText = projectFormTexts.lensOptionsEmpty || fallbackProjectForm.lensOptionsEmpty;
        if (optionsEmptyText) lensOptionsEmptyElem.textContent = optionsEmptyText;
      }
      if (lensSelectionChipsElem) {
        var removeTemplate = projectFormTexts.lensRemoveLabel || fallbackProjectForm.lensRemoveLabel;
        var mountLabelText = projectFormTexts.lensMountLabel || fallbackProjectForm.lensMountLabel;
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
        var _noneLabel2 = projectFormTexts.viewfinderExtensionNone || fallbackProjectForm.viewfinderExtensionNone;
        var yesLabel = projectFormTexts.viewfinderExtensionYes || fallbackProjectForm.viewfinderExtensionYes;
        if (_noneLabel2) viewfinderExtensionSelect.options[0].textContent = _noneLabel2;
        if (yesLabel) viewfinderExtensionSelect.options[1].textContent = yesLabel;
      }
      var projectCancelButton = typeof document !== 'undefined' ? document.getElementById('projectCancel') : null;
      var cancelText = projectFormTexts.cancel || fallbackProjectForm.cancel || (projectCancelButton ? projectCancelButton.textContent : projectDialogCloseBtn === null || projectDialogCloseBtn === void 0 ? void 0 : projectDialogCloseBtn.getAttribute('aria-label')) || 'Cancel';
      if (projectCancelButton) {
        setButtonLabelWithIcon(projectCancelButton, cancelText, ICON_GLYPHS.circleX);
      }
      if (projectDialogCloseBtn) {
        projectDialogCloseBtn.innerHTML = iconMarkup(ICON_GLYPHS.circleX, 'btn-icon');
        projectDialogCloseBtn.setAttribute('aria-label', cancelText);
        projectDialogCloseBtn.setAttribute('title', cancelText);
        projectDialogCloseBtn.setAttribute('data-help', cancelText);
      }
      if (projectSubmitBtn) {
        var submitText = projectFormTexts.submit || fallbackProjectForm.submit;
        if (submitText) {
          setButtonLabelWithIcon(projectSubmitBtn, submitText, ICON_GLYPHS.check);
          projectSubmitBtn.setAttribute('aria-label', submitText);
        }
      }
      var crewPlaceholders = {
        name: projectFormTexts.crewNamePlaceholder || fallbackProjectForm.crewNamePlaceholder,
        phone: projectFormTexts.crewPhonePlaceholder || fallbackProjectForm.crewPhonePlaceholder,
        email: projectFormTexts.crewEmailPlaceholder || fallbackProjectForm.crewEmailPlaceholder,
        website: projectFormTexts.crewWebsitePlaceholder || fallbackProjectForm.crewWebsitePlaceholder
      };
      var crewRoleLabels = texts[lang].crewRoles || texts.en && texts.en.crewRoles || {};
      var fallbackContacts = ((_texts$en267 = texts.en) === null || _texts$en267 === void 0 ? void 0 : _texts$en267.contacts) || {};
      var contactsTexts = ((_texts$lang5 = texts[lang]) === null || _texts$lang5 === void 0 ? void 0 : _texts$lang5.contacts) || fallbackContacts;
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
      if (userProfileRoleInput && contactsTexts.userProfileRolePlaceholder) {
        userProfileRoleInput.setAttribute('placeholder', contactsTexts.userProfileRolePlaceholder);
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
        setButtonLabelWithIcon(avatarOptionsDeleteButton, contactsTexts.avatarDelete, ICON_GLYPHS.trash);
        avatarOptionsDeleteButton.setAttribute('aria-label', contactsTexts.avatarDelete);
        avatarOptionsDeleteButton.setAttribute('title', contactsTexts.avatarDelete);
        avatarOptionsDeleteButton.setAttribute('data-help', contactsTexts.avatarDelete);
      }
      if (avatarOptionsEditButton && contactsTexts.avatarEditAction) {
        setButtonLabelWithIcon(avatarOptionsEditButton, contactsTexts.avatarEditAction, ICON_GLYPHS.sliders);
        avatarOptionsEditButton.setAttribute('aria-label', contactsTexts.avatarEditAction);
        avatarOptionsEditButton.setAttribute('title', contactsTexts.avatarEditAction);
        avatarOptionsEditButton.setAttribute('data-help', contactsTexts.avatarEditAction);
      }
      if (avatarOptionsChangeButton && contactsTexts.avatarChange) {
        setButtonLabelWithIcon(avatarOptionsChangeButton, contactsTexts.avatarChange, ICON_GLYPHS.camera);
        avatarOptionsChangeButton.setAttribute('aria-label', contactsTexts.avatarChange);
        avatarOptionsChangeButton.setAttribute('title', contactsTexts.avatarChange);
        avatarOptionsChangeButton.setAttribute('data-help', contactsTexts.avatarChange);
      }
      if (avatarEditTitle && contactsTexts.avatarEditAction) {
        avatarEditTitle.textContent = contactsTexts.avatarEditAction;
      }
      if (avatarEditInstructions && contactsTexts.avatarEditInstructions) {
        avatarEditInstructions.textContent = contactsTexts.avatarEditInstructions;
      }
      if (avatarEditZoomLabelElem && contactsTexts.avatarEditZoomLabel) {
        avatarEditZoomLabelElem.textContent = contactsTexts.avatarEditZoomLabel;
      }
      if (avatarEditCancelButton && contactsTexts.avatarEditCancel) {
        setButtonLabelWithIcon(avatarEditCancelButton, contactsTexts.avatarEditCancel, ICON_GLYPHS.circleX);
        avatarEditCancelButton.setAttribute('aria-label', contactsTexts.avatarEditCancel);
        avatarEditCancelButton.setAttribute('title', contactsTexts.avatarEditCancel);
        avatarEditCancelButton.setAttribute('data-help', contactsTexts.avatarEditCancel);
      }
      if (avatarEditApplyButton && contactsTexts.avatarEditApply) {
        setButtonLabelWithIcon(avatarEditApplyButton, contactsTexts.avatarEditApply, ICON_GLYPHS.check);
        avatarEditApplyButton.setAttribute('aria-label', contactsTexts.avatarEditApply);
        avatarEditApplyButton.setAttribute('title', contactsTexts.avatarEditApply);
        avatarEditApplyButton.setAttribute('data-help', contactsTexts.avatarEditApply);
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
          setButtonLabelWithIcon(saveButton, getContactsText('saveContact', 'Save to contacts'), ICON_GLYPHS.save);
        }
        var manageButton = row.querySelector('.person-manage-contacts');
        if (manageButton) {
          setButtonLabelWithIcon(manageButton, getContactsText('openManager', 'Open contacts'), ICON_GLYPHS.gears);
        }
        updateRowLinkedBadge(row);
      });
      var stripTrailingPunctuation = function stripTrailingPunctuation(value) {
        return typeof value === 'string' ? value.replace(/[\s\u00a0]*[:：]\s*$/, '') : value;
      };
      var addEntryLabel = projectFormTexts.addEntry || fallbackProjectForm.addEntry || 'Add';
      if (addPersonBtn) {
        var crewLabel = stripTrailingPunctuation(projectFormTexts.crewHeading || fallbackProjectForm.crewHeading || 'Crew');
        var _label67 = "".concat(addEntryLabel, " ").concat(crewLabel).trim();
        setButtonLabelWithIcon(addPersonBtn, _label67, ICON_GLYPHS.add);
        addPersonBtn.setAttribute('aria-label', _label67);
        addPersonBtn.setAttribute('data-help', _label67);
      }
      if (addPrepBtn) {
        var prepLabel = stripTrailingPunctuation(projectFormTexts.prepLabel || fallbackProjectForm.prepLabel || 'Prep');
        var _label68 = "".concat(addEntryLabel, " ").concat(prepLabel).trim();
        setButtonLabelWithIcon(addPrepBtn, _label68, ICON_GLYPHS.add);
        addPrepBtn.setAttribute('aria-label', _label68);
        addPrepBtn.setAttribute('data-help', _label68);
      }
      if (addShootBtn) {
        var shootLabel = stripTrailingPunctuation(projectFormTexts.shootLabel || fallbackProjectForm.shootLabel || 'Shoot');
        var _label69 = "".concat(addEntryLabel, " ").concat(shootLabel).trim();
        setButtonLabelWithIcon(addShootBtn, _label69, ICON_GLYPHS.add);
        addShootBtn.setAttribute('aria-label', _label69);
        addShootBtn.setAttribute('data-help', _label69);
      }
      if (addReturnBtn) {
        var returnLabel = stripTrailingPunctuation(projectFormTexts.returnLabel || fallbackProjectForm.returnLabel || 'Return Day');
        var _label70 = "".concat(addEntryLabel, " ").concat(returnLabel).trim();
        setButtonLabelWithIcon(addReturnBtn, _label70, ICON_GLYPHS.add);
        addReturnBtn.setAttribute('aria-label', _label70);
        addReturnBtn.setAttribute('data-help', _label70);
      }
      if (addStorageNeedBtn) {
        var storageLabelText = stripTrailingPunctuation(projectFormTexts.storageNeedsLabel || fallbackProjectForm.storageNeedsLabel || 'Recording media needs');
        var _label71 = "".concat(addEntryLabel, " ").concat(storageLabelText).trim();
        setButtonLabelWithIcon(addStorageNeedBtn, _label71, ICON_GLYPHS.add);
        addStorageNeedBtn.setAttribute('aria-label', _label71);
        addStorageNeedBtn.setAttribute('data-help', _label71);
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
      var closeText = texts[lang].iosPwaHelpClose;
      setButtonLabelWithIcon(iosPwaHelpClose, closeText, ICON_GLYPHS.check);
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
  }
  var cameraSelect = document.getElementById("cameraSelect");
  var monitorSelect = document.getElementById("monitorSelect");
  var videoSelect = document.getElementById("videoSelect");
  var videoDistributionSelect = document.getElementById("videoDistribution");
  var cageSelect = document.getElementById("cageSelect");
  var motorSelects = [document.getElementById("motor1Select"), document.getElementById("motor2Select"), document.getElementById("motor3Select"), document.getElementById("motor4Select")];
  var controllerSelects = [document.getElementById("controller1Select"), document.getElementById("controller2Select"), document.getElementById("controller3Select"), document.getElementById("controller4Select")];
  var distanceSelect = document.getElementById("distanceSelect");
  var batterySelect = document.getElementById("batterySelect");
  var hotswapSelect = document.getElementById("batteryHotswapSelect");
  var lensSelect = document.getElementById("lenses");
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
  var addStorageNeedBtn = document.getElementById("addStorageNeedBtn");
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
  var avatarEditSection = null;
  var avatarEditTitle = null;
  var avatarEditInstructions = null;
  var avatarEditViewport = null;
  var avatarEditImage = null;
  var avatarEditZoomInput = null;
  var avatarEditZoomLabelElem = null;
  var avatarEditCancelButton = null;
  var avatarEditApplyButton = null;
  var avatarOptionsContext = null;
  var avatarEditState = null;
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
    avatarOptionsPreview = avatarOptionsPreview || document.getElementById('avatarOptionsPreview');
    avatarOptionsDeleteButton = avatarOptionsDeleteButton || document.getElementById('avatarDeleteButton');
    avatarOptionsEditButton = avatarOptionsEditButton || document.getElementById('avatarEditButton');
    avatarOptionsChangeButton = avatarOptionsChangeButton || document.getElementById('avatarChangeButton');
    avatarEditSection = avatarEditSection || document.getElementById('avatarEditSection');
    avatarEditTitle = avatarEditTitle || document.getElementById('avatarEditTitle');
    avatarEditInstructions = avatarEditInstructions || document.getElementById('avatarEditInstructions');
    avatarEditViewport = avatarEditViewport || document.getElementById('avatarEditViewport');
    avatarEditImage = avatarEditImage || document.getElementById('avatarEditImage');
    avatarEditZoomInput = avatarEditZoomInput || document.getElementById('avatarEditZoom');
    avatarEditZoomLabelElem = avatarEditZoomLabelElem || document.getElementById('avatarEditZoomLabel');
    avatarEditCancelButton = avatarEditCancelButton || document.getElementById('avatarEditCancel');
    avatarEditApplyButton = avatarEditApplyButton || document.getElementById('avatarEditApply');
  }
  var monitoringConfigurationUserChanged = false;
  var crewRoles = ['Producer', 'Production Manager', 'Director', 'Assistant Director', 'Production Assistant', 'DoP', 'Camera Operator', 'B-Camera Operator', 'Steadicam Operator', 'Drone Operator', '1st AC', '2nd AC', 'DIT', 'Video Operator', 'Key Gaffer', 'Gaffer', 'Best Boy Electric', 'Electrician', 'Rigging Gaffer', 'Key Grip', 'Best Boy Grip', 'Grip', 'Dolly Grip', 'Rigging Grip'];
  var HORSE_ICON_SVG = "\n  <svg viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n    <path\n      d=\"m1 40c0-8 3-17 3-17a4.84 4.84 0 0 0-1.829-3.064 1 1 0 0 1 .45-1.716 19.438 19.438 0 0 1 4.379-.22c.579-2.317-1.19-3.963-2.782-4.938a1 1 0 0 1 .393-1.85 14.128 14.128 0 0 1 6.389.788c0-.958-1.147-2.145-2.342-3.122a1 1 0 0 1 .708-1.773 40.655 40.655 0 0 1 6.634.895 3.723 3.723 0 0 0-1.049-2.264 1 1 0 0 1 .823-1.652c6.151.378 9.226 1.916 9.226 1.916l10-1s8.472-2.311 15.954.5a1 1 0 0 1-.084 1.9c-1.455.394-2.87 1.143-2.87 2.6 0 0 4.426.738 5.675 4.114a1 1 0 0 1-1.228 1.317c-1.64-.48-4.273-.88-6.447.569Z\"\n      fill=\"#805333\"\n    />\n    <path\n      d=\"m30.18 42.82c1.073 2.7 2.6 9.993 3.357 13.8a2 2 0 0 1-1.964 2.38h-28.573a2 2 0 0 1-2-2v-18c0-2.55 10.03-22.11 23.99-23.87Z\"\n      fill=\"#a56a43\"\n    />\n    <path\n      d=\"m55.67 48.46-6.34 2.97a6 6 0 0 1-7.98-2.88l-.25-.54-.76-1.6a4.956 4.956 0 0 0-4.68-2.87c-.22.01-.44.02-.66.02a16.019 16.019 0 0 1-8.28-29.66c-1.81-2.97-3.45-8.03 2.03-12.49a2.1 2.1 0 0 1 2.5 0c4.23 3.45 4.21 7.25 3.16 10.17a16 16 0 0 1 15.91 11.36l5.31 11.31 2.92 6.22a6.008 6.008 0 0 1-2.88 7.99Z\"\n      fill=\"#cb8252\"\n    />\n    <circle cx=\"42\" cy=\"26\" r=\"3\" fill=\"#2c2f38\" />\n    <circle cx=\"54\" cy=\"43\" r=\"1\" fill=\"#805333\" />\n    <path\n      d=\"m58.55 40.47-2.92-6.22-14.53 13.76.25.54a6 6 0 0 0 7.98 2.88l6.34-2.97a6.008 6.008 0 0 0 2.88-7.99Zm-4.55 3.53a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z\"\n      fill=\"#cf976a\"\n    />\n    <circle cx=\"41\" cy=\"25\" r=\"1.25\" fill=\"#ecf0f1\" />\n  </svg>\n".trim();
  var PINK_MODE_ICON_FILES = Object.freeze(['src/illustrations/unicorns/unicorn.svg', 'src/illustrations/unicorns/unicorn-2.svg', 'src/illustrations/unicorns/celebrate.svg', 'src/illustrations/unicorns/sunglasses.svg', 'src/illustrations/unicorns/toy.svg']);
  function createPinkModeIconImageMarkup(path) {
    if (typeof path !== 'string' || !path) {
      return '';
    }
    var safePath = escapeHtml(path);
    return "<img src=\"".concat(safePath, "\" alt=\"\" loading=\"lazy\" decoding=\"async\" aria-hidden=\"true\" class=\"pink-mode-icon-image\">");
  }
  var PINK_MODE_ICON_FALLBACK_MARKUP = Object.freeze(PINK_MODE_ICON_FILES.map(createPinkModeIconImageMarkup).filter(Boolean));
  var PINK_MODE_ANIMATED_ICON_FILES = Object.freeze(['src/animations/cat.json', 'src/animations/cup.json', 'src/animations/cupcake.json', 'src/animations/flamingo.json', 'src/animations/float.json', 'src/animations/float-2.json', 'src/animations/fox.json', 'src/animations/heart.json', 'src/animations/horn.json', 'src/animations/invitation.json', 'src/animations/mask.json', 'src/animations/rainbow.json', 'src/animations/rocking-horse.json', 'src/animations/slippers.json', 'src/animations/sunglasses.json', 'src/animations/unicorn.json', 'animated icons 3/camera.json', 'animated icons 3/director-chair.json', 'animated icons 3/dog.json', 'animated icons 3/fox.json', 'animated icons 3/fox-2.json', 'animated icons 3/fox-3.json', 'animated icons 3/horse.json', 'animated icons 3/mountains.json', 'animated icons 3/movie-camera.json', 'animated icons 3/pinata.json', 'animated icons 3/script.json', 'animated icons 3/video-camera.json']);
  var PINK_MODE_ICON_RAIN_MIN_COUNT = 18;
  var PINK_MODE_ICON_RAIN_MAX_COUNT = 30;
  var PINK_MODE_ICON_RAIN_MIN_DURATION_MS = 4200;
  var PINK_MODE_ICON_RAIN_MAX_DURATION_MS = 6400;
  var PINK_MODE_ICON_RAIN_MIN_SIZE_PX = 56;
  var PINK_MODE_ICON_RAIN_MAX_SIZE_PX = 96;
  var PINK_MODE_ICON_RAIN_VERTICAL_START_VH_MIN = 12;
  var PINK_MODE_ICON_RAIN_VERTICAL_START_VH_MAX = 26;
  var PINK_MODE_ICON_RAIN_HORIZONTAL_MARGIN_PERCENT = 0;
  var PINK_MODE_ICON_RAIN_HORIZONTAL_DRIFT_VW_MIN = -12;
  var PINK_MODE_ICON_RAIN_HORIZONTAL_DRIFT_VW_MAX = 12;
  var PINK_MODE_ICON_RAIN_MIN_SCALE = 0.78;
  var PINK_MODE_ICON_RAIN_MAX_SCALE = 1.12;
  var PINK_MODE_ICON_RAIN_MAX_ACTIVE = 64;
  var PINK_MODE_ICON_RAIN_COOLDOWN_MS = 8000;
  var PINK_MODE_ICON_RAIN_DELAY_SPREAD_MS = 720;
  var pinkModeIcons = {
    off: Object.freeze({
      className: 'icon-svg pink-mode-icon',
      markup: HORSE_ICON_SVG
    }),
    onSequence: Object.freeze([])
  };
  var pinkModeIconRotationTimer = null;
  var pinkModeIconIndex = 0;
  var PINK_MODE_ANIMATED_ICON_MIN_INTERVAL_MS = 14800;
  var PINK_MODE_ANIMATED_ICON_MAX_INTERVAL_MS = 23800;
  var PINK_MODE_ANIMATED_ICON_MIN_DURATION_MS = 6400;
  var PINK_MODE_ANIMATED_ICON_MAX_DURATION_MS = 10800;
  var PINK_MODE_ANIMATED_ICON_MIN_SIZE_PX = 72;
  var PINK_MODE_ANIMATED_ICON_MAX_SIZE_PX = 72;
  var PINK_MODE_ANIMATED_ICON_MAX_ACTIVE = 4;
  var PINK_MODE_ANIMATED_ICON_MAX_PLACEMENT_ATTEMPTS = 12;
  var PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX = 28;
  var PINK_MODE_ANIMATED_ICON_MIN_SCALE = 0.65;
  var PINK_MODE_ANIMATED_ICON_FULL_SIZE_VIEWPORT_MIN = 920;
  var PINK_MODE_ANIMATED_ICON_AVOID_SELECTOR = ['a', 'button', 'input', 'select', 'textarea', 'label', 'summary', '[role="button"]', '[role="link"]', '[role="menu"]', '[role="dialog"]', '[role="listbox"]', '[role="combobox"]', '[role="textbox"]', '[contenteditable="true"]', '.form-row', '.form-row-actions', '.form-actions', '.toolbar', '.controls', '.dialog', '.modal'].join(', ');
  var PINK_MODE_ANIMATED_ICON_RECENT_SPOT_LIMIT = 6;
  var PINK_MODE_ANIMATED_ICON_RECENT_SPOT_MARGIN_PX = 120;
  var PINK_MODE_ANIMATED_ICON_PROBE_POINTS = Object.freeze([Object.freeze({
    x: 0,
    y: 0
  }), Object.freeze({
    x: 0.35,
    y: 0
  }), Object.freeze({
    x: -0.35,
    y: 0
  }), Object.freeze({
    x: 0,
    y: 0.35
  }), Object.freeze({
    x: 0,
    y: -0.35
  }), Object.freeze({
    x: 0.25,
    y: 0.25
  }), Object.freeze({
    x: -0.25,
    y: 0.25
  }), Object.freeze({
    x: 0.25,
    y: -0.25
  }), Object.freeze({
    x: -0.25,
    y: -0.25
  })]);
  var pinkModeAnimatedIconLayer = null;
  var pinkModeIconRainLayer = null;
  var pinkModeAnimatedIconTimeoutId = null;
  var pinkModeAnimatedIconsActive = false;
  var pinkModeAnimatedIconTemplates = null;
  var pinkModeAnimatedIconTemplatesPromise = null;
  var pinkModeAnimatedIconInstances = new Set();
  var pinkModeAnimatedIconLastTemplateName = null;
  var pinkModeAnimatedIconPlacementHistory = [];
  var pinkModeIconRainInstances = new Set();
  var pinkModeIconRainLastTriggeredAt = 0;
  var pinkModeBodyReadyQueue = [];
  var pinkModeBodyReadyScheduled = false;
  var pinkModeBodyReadyTimerId = null;
  function flushPinkModeBodyReadyQueue() {
    if (!pinkModeBodyReadyQueue.length) {
      return;
    }
    var callbacks = pinkModeBodyReadyQueue.splice(0, pinkModeBodyReadyQueue.length);
    var _iterator3 = _createForOfIteratorHelper(callbacks),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var callback = _step3.value;
        if (typeof callback !== 'function') {
          continue;
        }
        try {
          callback();
        } catch (error) {
          console.warn('Could not run deferred pink mode callback', error);
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }
  function schedulePinkModeBodyReadyCheck() {
    if (pinkModeBodyReadyTimerId) {
      return;
    }
    pinkModeBodyReadyTimerId = setTimeout(function () {
      pinkModeBodyReadyTimerId = null;
      if (typeof document === 'undefined' || !document) {
        pinkModeBodyReadyScheduled = false;
        pinkModeBodyReadyQueue.length = 0;
        return;
      }
      if (document.body) {
        pinkModeBodyReadyScheduled = false;
        flushPinkModeBodyReadyQueue();
        return;
      }
      if (document.readyState === 'loading') {
        var _resume = function resume() {
          document.removeEventListener('DOMContentLoaded', _resume);
          schedulePinkModeBodyReadyCheck();
        };
        try {
          document.addEventListener('DOMContentLoaded', _resume, {
            once: true
          });
        } catch (listenerError) {
          void listenerError;
          document.addEventListener('DOMContentLoaded', _resume);
        }
        return;
      }
      schedulePinkModeBodyReadyCheck();
    }, 16);
  }
  function whenPinkModeBodyReady(callback) {
    if (typeof callback !== 'function' || typeof document === 'undefined') {
      return false;
    }
    if (document.body) {
      callback();
      return true;
    }
    if (!pinkModeBodyReadyQueue.includes(callback)) {
      pinkModeBodyReadyQueue.push(callback);
    }
    if (!pinkModeBodyReadyScheduled) {
      pinkModeBodyReadyScheduled = true;
      schedulePinkModeBodyReadyCheck();
    } else if (!pinkModeBodyReadyTimerId) {
      schedulePinkModeBodyReadyCheck();
    }
    return true;
  }
  var pinkModeAnimatedIconPressListenerCleanup = null;
  var pinkModeAnimatedIconLastTouchTime = 0;
  var pinkModeReduceMotionQuery = typeof window !== 'undefined' && typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  function ensureSvgHasAriaHidden(markup) {
    if (typeof markup !== 'string') return '';
    var trimmed = markup.trim();
    if (!trimmed) return '';
    if (!/^<svg\b/i.test(trimmed)) return trimmed;
    if (/\baria-hidden\s*=\s*['"]/i.test(trimmed)) return trimmed;
    return trimmed.replace(/<svg\b/i, function (match) {
      return "".concat(match, " aria-hidden=\"true\"");
    });
  }
  function normalizePinkModeIconMarkup(markup) {
    if (typeof markup !== 'string') return '';
    var trimmed = markup.trim();
    if (!trimmed) return '';
    return trimmed;
  }
  function setPinkModeIconSequence(markupList) {
    if (!Array.isArray(markupList) || !markupList.length) {
      return false;
    }
    var configs = markupList.map(ensureSvgHasAriaHidden).map(normalizePinkModeIconMarkup).filter(Boolean).map(function (markup) {
      return Object.freeze({
        className: 'icon-svg pink-mode-icon',
        markup: markup
      });
    });
    if (!configs.length) {
      return false;
    }
    pinkModeIcons.onSequence = Object.freeze(configs);
    if (typeof document !== 'undefined' && document.body && document.body.classList.contains('pink-mode')) {
      if (typeof stopPinkModeIconRotation === 'function') {
        stopPinkModeIconRotation();
      }
      pinkModeIconIndex = 0;
      if (typeof applyPinkModeIcon === 'function') {
        applyPinkModeIcon(pinkModeIcons.onSequence[pinkModeIconIndex], {
          animate: false
        });
      }
      if (typeof startPinkModeIconRotation === 'function') {
        startPinkModeIconRotation();
      }
    }
    return true;
  }
  function loadPinkModeIconsFromFiles() {
    return _loadPinkModeIconsFromFiles.apply(this, arguments);
  }
  function _loadPinkModeIconsFromFiles() {
    _loadPinkModeIconsFromFiles = _asyncToGenerator(_regenerator().m(function _callee2() {
      var responses, markupList;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            if (!(typeof fetch !== 'function')) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            _context2.n = 2;
            return Promise.all(PINK_MODE_ICON_FILES.map(function (path) {
              return fetch(path).then(function (response) {
                return response.ok ? response.text() : null;
              }).catch(function () {
                return null;
              });
            }));
          case 2:
            responses = _context2.v;
            markupList = responses.filter(Boolean);
            if (markupList.length) {
              setPinkModeIconSequence(markupList);
            }
          case 3:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    return _loadPinkModeIconsFromFiles.apply(this, arguments);
  }
  function loadPinkModeAnimatedIconTemplates() {
    return _loadPinkModeAnimatedIconTemplates.apply(this, arguments);
  }
  function _loadPinkModeAnimatedIconTemplates() {
    _loadPinkModeAnimatedIconTemplates = _asyncToGenerator(_regenerator().m(function _callee3() {
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            if (!pinkModeAnimatedIconTemplates) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2, pinkModeAnimatedIconTemplates);
          case 1:
            if (!pinkModeAnimatedIconTemplatesPromise) {
              _context3.n = 2;
              break;
            }
            return _context3.a(2, pinkModeAnimatedIconTemplatesPromise);
          case 2:
            if (!(typeof fetch !== 'function')) {
              _context3.n = 3;
              break;
            }
            pinkModeAnimatedIconTemplates = Object.freeze([]);
            return _context3.a(2, pinkModeAnimatedIconTemplates);
          case 3:
            pinkModeAnimatedIconTemplatesPromise = Promise.all(PINK_MODE_ANIMATED_ICON_FILES.map(function (path) {
              return fetch(path).then(function (response) {
                return response.ok ? response.text() : null;
              }).catch(function () {
                return null;
              });
            })).then(function (contents) {
              return Object.freeze(contents.map(function (content, index) {
                return content ? Object.freeze({
                  name: PINK_MODE_ANIMATED_ICON_FILES[index],
                  data: content
                }) : null;
              }).filter(Boolean));
            }).catch(function (error) {
              console.warn('Could not load pink mode animated icons', error);
              return Object.freeze([]);
            }).then(function (templates) {
              pinkModeAnimatedIconTemplates = templates;
              return templates;
            });
            return _context3.a(2, pinkModeAnimatedIconTemplatesPromise);
        }
      }, _callee3);
    }));
    return _loadPinkModeAnimatedIconTemplates.apply(this, arguments);
  }
  function ensurePinkModeAnimationLayer(options) {
    if (typeof document === 'undefined') {
      return null;
    }
    var useGlobalLayer = Boolean(options && options.global);
    var host = useGlobalLayer ? document.body || document.getElementById('mainContent') : document.getElementById('mainContent') || document.body;
    if (!host) {
      return null;
    }
    var layer = useGlobalLayer ? pinkModeIconRainLayer : pinkModeAnimatedIconLayer;
    if (layer && layer.isConnected && host.contains(layer)) {
      return layer;
    }
    if (layer && layer.parentNode) {
      layer.parentNode.removeChild(layer);
    }
    layer = document.createElement('div');
    layer.className = useGlobalLayer ? 'pink-mode-animation-layer pink-mode-animation-layer--global' : 'pink-mode-animation-layer';
    layer.setAttribute('aria-hidden', 'true');
    host.appendChild(layer);
    if (useGlobalLayer) {
      pinkModeIconRainLayer = layer;
    } else {
      pinkModeAnimatedIconLayer = layer;
    }
    return layer;
  }
  function resolvePinkModeScrollHeight(host) {
    if (!host || _typeof(host) !== 'object') {
      return null;
    }

    try {
      var value = host.scrollHeight;
      if (typeof value === 'number' && value > 0) {
        return value;
      }
    } catch (error) {
      void error;
    }

    var doc =
      typeof host.ownerDocument !== 'undefined' && host.ownerDocument
        ? host.ownerDocument
        : typeof document !== 'undefined' && document
          ? document
          : null;
    if (!doc || _typeof(doc) !== 'object') {
      return null;
    }

    var scrollingElement =
      typeof doc.scrollingElement !== 'undefined' && doc.scrollingElement
        ? doc.scrollingElement
        : doc.documentElement || null;

    if (!scrollingElement || scrollingElement === host) {
      return null;
    }

    try {
      var fallbackValue = scrollingElement.scrollHeight;
      if (typeof fallbackValue === 'number' && fallbackValue > 0) {
        return fallbackValue;
      }
    } catch (fallbackError) {
      void fallbackError;
    }

    return null;
  }
  function resolvePinkModeHostExtent(host, hostRect, fallbackHeight) {
    var scrollHeight = resolvePinkModeScrollHeight(host);
    if (typeof scrollHeight === 'number' && scrollHeight > 0) {
      return scrollHeight;
    }
    if (hostRect && typeof hostRect.height === 'number' && hostRect.height > 0) {
      return hostRect.height;
    }
    if (hostRect && typeof hostRect.top === 'number' && typeof hostRect.bottom === 'number') {
      var derivedHeight = hostRect.bottom - hostRect.top;
      if (Number.isFinite(derivedHeight) && derivedHeight > 0) {
        return derivedHeight;
      }
    }
    return fallbackHeight;
  }
  function computePinkModeAnimationAvoidRegions(layer) {
    if (typeof document === 'undefined' || typeof document.querySelectorAll !== 'function') {
      return Object.freeze([]);
    }
    var elements = document.querySelectorAll(PINK_MODE_ANIMATED_ICON_AVOID_SELECTOR);
    if (!elements || !elements.length) {
      return Object.freeze([]);
    }
    var regions = [];
    var _iterator4 = _createForOfIteratorHelper(elements),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var element = _step4.value;
        if (!element) {
          continue;
        }
        if (layer && layer.contains(element)) {
          continue;
        }
        if (typeof element.getBoundingClientRect !== 'function') {
          continue;
        }
        var rect = element.getBoundingClientRect();
        if (!rect) {
          continue;
        }
        var width = rect.width,
          height = rect.height,
          left = rect.left,
          right = rect.right,
          top = rect.top,
          bottom = rect.bottom;
        if (!Number.isFinite(width) || !Number.isFinite(height)) {
          continue;
        }
        if (width <= 0 || height <= 0) {
          continue;
        }
        var margin = Math.max(PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX, Math.min(width, height) * 0.3);
        regions.push({
          left: left,
          right: right,
          top: top,
          bottom: bottom,
          margin: margin
        });
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    return Object.freeze(regions);
  }
  function collectPinkModeAnimationInstanceRegions(layer) {
    if (!pinkModeAnimatedIconInstances.size) {
      return Object.freeze([]);
    }
    var regions = [];
    var _iterator5 = _createForOfIteratorHelper(pinkModeAnimatedIconInstances),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var instance = _step5.value;
        if (!instance || !instance.container) {
          continue;
        }
        var node = instance.container;
        if (!node.isConnected) {
          continue;
        }
        if (layer && node.parentNode && layer !== node.parentNode && !layer.contains(node)) {
          continue;
        }
        if (typeof node.getBoundingClientRect !== 'function') {
          continue;
        }
        var rect = node.getBoundingClientRect();
        if (!rect) {
          continue;
        }
        var left = rect.left,
          right = rect.right,
          top = rect.top,
          bottom = rect.bottom,
          width = rect.width,
          height = rect.height;
        if (!Number.isFinite(width) || !Number.isFinite(height)) {
          continue;
        }
        if (width <= 0 || height <= 0) {
          continue;
        }
        var largestSide = Math.max(width, height);
        regions.push({
          left: left,
          right: right,
          top: top,
          bottom: bottom,
          margin: Math.max(PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX * 1.25, largestSide * 0.6)
        });
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    return Object.freeze(regions);
  }
  function callPinkModeAnimatedIconPressHandler() {
    var handler = null;
    if (typeof window !== 'undefined' && typeof window.handlePinkModeIconPress === 'function') {
      handler = window.handlePinkModeIconPress;
    } else if (typeof handlePinkModeIconPress === 'function') {
      handler = handlePinkModeIconPress;
    }
    if (typeof handler === 'function') {
      try {
        handler();
        return true;
      } catch (error) {
        console.warn('Could not process pink mode icon press', error);
      }
    }
    return false;
  }
  function extractPinkModeAnimatedIconPoint(event) {
    if (!event) {
      return null;
    }
    if (typeof event.clientX === 'number' && typeof event.clientY === 'number') {
      return {
        x: event.clientX,
        y: event.clientY
      };
    }
    var touches = (event.touches && event.touches.length ? event.touches : null) || (event.changedTouches && event.changedTouches.length ? event.changedTouches : null);
    if (touches) {
      var touch = touches[0];
      if (touch && typeof touch.clientX === 'number' && typeof touch.clientY === 'number') {
        return {
          x: touch.clientX,
          y: touch.clientY
        };
      }
    }
    return null;
  }
  function isPointWithinRect(point, rect) {
    if (!point || !rect) {
      return false;
    }
    var x = point.x,
      y = point.y;
    var left = rect.left,
      right = rect.right,
      top = rect.top,
      bottom = rect.bottom;
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return false;
    }
    if (!Number.isFinite(left) || !Number.isFinite(right) || !Number.isFinite(top) || !Number.isFinite(bottom)) {
      return false;
    }
    return x >= left && x <= right && y >= top && y <= bottom;
  }
  function detectPinkModeAnimatedIconPress(point) {
    if (!point || !pinkModeAnimatedIconInstances.size) {
      return false;
    }
    var instances = Array.from(pinkModeAnimatedIconInstances);
    for (var index = instances.length - 1; index >= 0; index -= 1) {
      var instance = instances[index];
      if (!instance || instance.destroyed) {
        continue;
      }
      var container = instance.container;
      if (!container || !container.isConnected || typeof container.getBoundingClientRect !== 'function') {
        continue;
      }
      var rect = container.getBoundingClientRect();
      if (!rect || rect.width <= 0 || rect.height <= 0) {
        continue;
      }
      if (isPointWithinRect(point, rect) && callPinkModeAnimatedIconPressHandler()) {
        return true;
      }
    }
    return false;
  }
  function handlePinkModeAnimatedIconPointerEvent(event) {
    if (!event || event.defaultPrevented || !event.isTrusted) {
      return;
    }
    if (typeof event.button === 'number' && event.button !== 0) {
      return;
    }
    var pointerType = typeof event.pointerType === 'string' ? event.pointerType.toLowerCase() : '';
    if (pointerType === 'touch' || pointerType === 'pen') {
      pinkModeAnimatedIconLastTouchTime = Date.now();
    } else {
      pinkModeAnimatedIconLastTouchTime = 0;
    }
    var point = extractPinkModeAnimatedIconPoint(event);
    if (!point) {
      return;
    }
    detectPinkModeAnimatedIconPress(point);
  }
  function handlePinkModeAnimatedIconMouseEvent(event) {
    if (!event || event.defaultPrevented || !event.isTrusted) {
      return;
    }
    if (typeof event.button === 'number' && event.button !== 0) {
      return;
    }
    if (pinkModeAnimatedIconLastTouchTime) {
      var now = Date.now();
      if (now - pinkModeAnimatedIconLastTouchTime < 450) {
        return;
      }
    }
    var point = extractPinkModeAnimatedIconPoint(event);
    if (!point) {
      return;
    }
    detectPinkModeAnimatedIconPress(point);
  }
  function handlePinkModeAnimatedIconTouchEvent(event) {
    if (!event || !event.isTrusted) {
      return;
    }
    pinkModeAnimatedIconLastTouchTime = Date.now();
    var point = extractPinkModeAnimatedIconPoint(event);
    if (!point) {
      return;
    }
    detectPinkModeAnimatedIconPress(point);
  }
  function teardownPinkModeAnimatedIconPressListener() {
    if (!pinkModeAnimatedIconPressListenerCleanup) {
      return;
    }
    try {
      pinkModeAnimatedIconPressListenerCleanup();
    } catch (cleanupError) {
      console.warn('Could not detach pink mode animation press listener', cleanupError);
    }
    pinkModeAnimatedIconPressListenerCleanup = null;
    pinkModeAnimatedIconLastTouchTime = 0;
  }
  function ensurePinkModeAnimatedIconPressListener() {
    if (pinkModeAnimatedIconPressListenerCleanup || typeof document === 'undefined') {
      return;
    }
    var target = document;
    if (!target) {
      return;
    }
    if (typeof window !== 'undefined' && typeof window.PointerEvent === 'function') {
      target.addEventListener('pointerdown', handlePinkModeAnimatedIconPointerEvent, true);
      pinkModeAnimatedIconPressListenerCleanup = function pinkModeAnimatedIconPressListenerCleanup() {
        target.removeEventListener('pointerdown', handlePinkModeAnimatedIconPointerEvent, true);
        pinkModeAnimatedIconLastTouchTime = 0;
      };
      return;
    }
    target.addEventListener('mousedown', handlePinkModeAnimatedIconMouseEvent, true);
    target.addEventListener('touchstart', handlePinkModeAnimatedIconTouchEvent, true);
    pinkModeAnimatedIconPressListenerCleanup = function pinkModeAnimatedIconPressListenerCleanup() {
      target.removeEventListener('mousedown', handlePinkModeAnimatedIconMouseEvent, true);
      target.removeEventListener('touchstart', handlePinkModeAnimatedIconTouchEvent, true);
      pinkModeAnimatedIconLastTouchTime = 0;
    };
  }
  function isPinkModeAnimationSpotClear(layer, hostRect, x, y, size, avoidRegions) {
    if (typeof document === 'undefined' || typeof document.elementFromPoint !== 'function') {
      return true;
    }
    var viewportWidth = typeof window !== 'undefined' && typeof window.innerWidth === 'number' ? window.innerWidth : document.documentElement && typeof document.documentElement.clientWidth === 'number' ? document.documentElement.clientWidth : null;
    var viewportHeight = typeof window !== 'undefined' && typeof window.innerHeight === 'number' ? window.innerHeight : document.documentElement && typeof document.documentElement.clientHeight === 'number' ? document.documentElement.clientHeight : null;
    var baseX = (hostRect ? hostRect.left : 0) + x;
    var baseY = (hostRect ? hostRect.top : 0) + y;
    var candidate = {
      left: baseX - size / 2,
      right: baseX + size / 2,
      top: baseY - size / 2,
      bottom: baseY + size / 2
    };
    if (Array.isArray(avoidRegions) && avoidRegions.length) {
      var _iterator6 = _createForOfIteratorHelper(avoidRegions),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var region = _step6.value;
          if (!region) {
            continue;
          }
          var regionMargin = typeof region.margin === 'number' ? Math.max(PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX, size * 0.25, region.margin) : Math.max(PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX, size * 0.25);
          if (candidate.left < region.right + regionMargin && candidate.right > region.left - regionMargin && candidate.top < region.bottom + regionMargin && candidate.bottom > region.top - regionMargin) {
            return false;
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
    var _iterator7 = _createForOfIteratorHelper(PINK_MODE_ANIMATED_ICON_PROBE_POINTS),
      _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var point = _step7.value;
        var sampleX = baseX + point.x * size;
        var sampleY = baseY + point.y * size;
        if (viewportWidth !== null && (sampleX < 0 || sampleX > viewportWidth)) {
          continue;
        }
        if (viewportHeight !== null && (sampleY < 0 || sampleY > viewportHeight)) {
          continue;
        }
        var elementsAtPoint = typeof document.elementsFromPoint === 'function' ? document.elementsFromPoint(sampleX, sampleY) : [document.elementFromPoint(sampleX, sampleY)].filter(Boolean);
        var _iterator8 = _createForOfIteratorHelper(elementsAtPoint),
          _step8;
        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var element = _step8.value;
            if (!element) {
              continue;
            }
            if (layer && element === layer) {
              continue;
            }
            if (layer && layer.contains(element)) {
              return false;
            }
            if (typeof element.matches === 'function' && element.matches(PINK_MODE_ANIMATED_ICON_AVOID_SELECTOR) || typeof element.closest === 'function' && element.closest(PINK_MODE_ANIMATED_ICON_AVOID_SELECTOR)) {
              return false;
            }
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
    return true;
  }
  function findPinkModeAnimationPlacement(_ref38) {
    var layer = _ref38.layer,
      hostRect = _ref38.hostRect,
      hostTop = _ref38.hostTop,
      visibleTop = _ref38.visibleTop,
      visibleBottom = _ref38.visibleBottom,
      horizontalPadding = _ref38.horizontalPadding,
      verticalPadding = _ref38.verticalPadding,
      hostWidth = _ref38.hostWidth,
      size = _ref38.size,
      avoidRegions = _ref38.avoidRegions,
      _ref38$leftMarginExte = _ref38.leftMarginExtension,
      leftMarginExtension = _ref38$leftMarginExte === void 0 ? 0 : _ref38$leftMarginExte,
      _ref38$rightMarginExt = _ref38.rightMarginExtension,
      rightMarginExtension = _ref38$rightMarginExt === void 0 ? 0 : _ref38$rightMarginExt;
    var minY = Math.max(visibleTop - hostTop + verticalPadding, verticalPadding);
    var maxY = Math.max(visibleBottom - hostTop - verticalPadding, minY);
    var marginLeft = Math.max(0, leftMarginExtension);
    var marginRight = Math.max(0, rightMarginExtension);
    var baseMinX = horizontalPadding;
    var baseMaxX = Math.max(hostWidth - horizontalPadding, baseMinX);
    var minX = baseMinX - marginLeft;
    var maxX = baseMaxX + marginRight;
    for (var attempt = 0; attempt < PINK_MODE_ANIMATED_ICON_MAX_PLACEMENT_ATTEMPTS; attempt += 1) {
      var y = maxY > minY ? minY + Math.random() * (maxY - minY) : minY;
      var x = maxX > minX ? minX + Math.random() * (maxX - minX) : minX;
      if (isPinkModeAnimationSpotClear(layer, hostRect, x, y, size, avoidRegions)) {
        return {
          x: x,
          y: y
        };
      }
    }
    return null;
  }
  function destroyPinkModeAnimatedIconInstance(instance) {
    if (!instance || instance.destroyed) {
      return;
    }
    if (typeof instance.cleanup === 'function') {
      try {
        instance.cleanup();
      } catch (cleanupError) {
        console.warn('Could not detach pink mode animation interactions', cleanupError);
      }
      instance.cleanup = null;
    }
    instance.destroyed = true;
    if (instance.animation && typeof instance.animation.destroy === 'function') {
      try {
        instance.animation.destroy();
      } catch (error) {
        console.warn('Could not dispose pink mode animation', error);
      }
    }
    if (instance.container && instance.container.parentNode) {
      instance.container.parentNode.removeChild(instance.container);
    }
    pinkModeAnimatedIconInstances.delete(instance);
    if (!pinkModeAnimatedIconInstances.size) {
      teardownPinkModeAnimatedIconPressListener();
    }
  }
  function destroyPinkModeIconRainInstance(instance) {
    if (!instance || instance.destroyed) {
      return;
    }
    if (typeof instance.cleanup === 'function') {
      try {
        instance.cleanup();
      } catch (cleanupError) {
        console.warn('Could not detach pink mode rain interactions', cleanupError);
      }
      instance.cleanup = null;
    }
    instance.destroyed = true;
    if (instance.animation && typeof instance.animation.destroy === 'function') {
      try {
        instance.animation.destroy();
      } catch (error) {
        console.warn('Could not dispose pink mode rain animation', error);
      }
    }
    if (instance.container && instance.container.parentNode) {
      instance.container.parentNode.removeChild(instance.container);
    }
    pinkModeIconRainInstances.delete(instance);
    if (!pinkModeIconRainInstances.size && pinkModeIconRainLayer && pinkModeIconRainLayer.parentNode) {
      pinkModeIconRainLayer.parentNode.removeChild(pinkModeIconRainLayer);
      pinkModeIconRainLayer = null;
    }
  }
  function spawnPinkModeIconRainInstance(templates) {
    if (!Array.isArray(templates) || !templates.length || typeof window === 'undefined' || !window.lottie || typeof window.lottie.loadAnimation !== 'function') {
      return false;
    }
    var layer = ensurePinkModeAnimationLayer({
      global: true
    });
    if (!layer) {
      return false;
    }
    var sanitizedTemplates = templates.filter(Boolean);
    if (!sanitizedTemplates.length) {
      return false;
    }
    var activeTemplateNames = new Set();
    var _iterator9 = _createForOfIteratorHelper(pinkModeIconRainInstances),
      _step9;
    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var _instance = _step9.value;
        if (!_instance) continue;
        var templateName = _instance.templateName;
        if (typeof templateName === 'string' && templateName) {
          activeTemplateNames.add(templateName);
        }
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }
    var _iterator0 = _createForOfIteratorHelper(pinkModeAnimatedIconInstances),
      _step0;
    try {
      for (_iterator0.s(); !(_step0 = _iterator0.n()).done;) {
        var _instance2 = _step0.value;
        if (!_instance2) continue;
        var _templateName = _instance2.templateName;
        if (typeof _templateName === 'string' && _templateName) {
          activeTemplateNames.add(_templateName);
        }
      }
    } catch (err) {
      _iterator0.e(err);
    } finally {
      _iterator0.f();
    }
    var availableTemplates = sanitizedTemplates.filter(function (template) {
      if (!template || typeof template.name !== 'string') {
        return true;
      }
      return !activeTemplateNames.has(template.name);
    });
    if (!availableTemplates.length) {
      availableTemplates = sanitizedTemplates;
    }
    var template = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
    if (!template || !template.data) {
      return false;
    }
    var container = document.createElement('div');
    container.className = 'pink-mode-animation-instance pink-mode-icon-rain';
    container.setAttribute('aria-hidden', 'true');
    var size = Math.round(Math.random() * (PINK_MODE_ICON_RAIN_MAX_SIZE_PX - PINK_MODE_ICON_RAIN_MIN_SIZE_PX) + PINK_MODE_ICON_RAIN_MIN_SIZE_PX);
    container.style.setProperty('--pink-mode-animation-size', "".concat(size, "px"));
    var minHorizontalPercent = 0;
    var maxHorizontalPercent = 100;
    if (typeof window !== 'undefined' && window.visualViewport) {
      var viewport = window.visualViewport;
      var layoutWidth = typeof window.innerWidth === 'number' && window.innerWidth > 0 ? window.innerWidth : typeof viewport.width === 'number' && viewport.width > 0 ? viewport.width : 0;
      var visualWidth = typeof viewport.width === 'number' && viewport.width > 0 ? viewport.width : layoutWidth;
      if (layoutWidth > 0 && visualWidth > 0) {
        var rawOffsetLeft = typeof viewport.offsetLeft === 'number' ? viewport.offsetLeft : typeof viewport.pageLeft === 'number' ? viewport.pageLeft : 0;
        var offsetLeft = Math.min(Math.max(rawOffsetLeft, 0), Math.max(layoutWidth - visualWidth, 0));
        var offsetRight = Math.max(0, layoutWidth - visualWidth - offsetLeft);
        var computedMin = offsetLeft / layoutWidth * 100;
        var computedMax = 100 - offsetRight / layoutWidth * 100;
        if (Number.isFinite(computedMin) && Number.isFinite(computedMax) && computedMax > computedMin) {
          minHorizontalPercent = Math.max(0, Math.min(100, computedMin));
          maxHorizontalPercent = Math.max(minHorizontalPercent, Math.min(100, computedMax));
        }
      }
    }
    var horizontalMargin = Math.max(0, Math.min(40, PINK_MODE_ICON_RAIN_HORIZONTAL_MARGIN_PERCENT));
    minHorizontalPercent = Math.max(minHorizontalPercent, horizontalMargin);
    maxHorizontalPercent = Math.min(100 - horizontalMargin, maxHorizontalPercent);
    if (maxHorizontalPercent <= minHorizontalPercent) {
      minHorizontalPercent = 0;
      maxHorizontalPercent = 100;
    }
    var horizontalPercent = Math.random() * (maxHorizontalPercent - minHorizontalPercent) + minHorizontalPercent;
    container.style.setProperty('--pink-mode-animation-x', "".concat(horizontalPercent.toFixed(2), "%"));
    var verticalOffset = Math.random() * (PINK_MODE_ICON_RAIN_VERTICAL_START_VH_MAX - PINK_MODE_ICON_RAIN_VERTICAL_START_VH_MIN) + PINK_MODE_ICON_RAIN_VERTICAL_START_VH_MIN;
    container.style.setProperty('--pink-mode-animation-y', "-".concat(verticalOffset.toFixed(2), "vh"));
    var duration = Math.round(Math.random() * (PINK_MODE_ICON_RAIN_MAX_DURATION_MS - PINK_MODE_ICON_RAIN_MIN_DURATION_MS) + PINK_MODE_ICON_RAIN_MIN_DURATION_MS);
    container.style.setProperty('--pink-mode-rain-duration', "".concat(duration, "ms"));
    var scale = Math.random() * (PINK_MODE_ICON_RAIN_MAX_SCALE - PINK_MODE_ICON_RAIN_MIN_SCALE) + PINK_MODE_ICON_RAIN_MIN_SCALE;
    container.style.setProperty('--pink-mode-rain-scale', scale.toFixed(3));
    var drift = Math.random() * (PINK_MODE_ICON_RAIN_HORIZONTAL_DRIFT_VW_MAX - PINK_MODE_ICON_RAIN_HORIZONTAL_DRIFT_VW_MIN) + PINK_MODE_ICON_RAIN_HORIZONTAL_DRIFT_VW_MIN;
    container.style.setProperty('--pink-mode-rain-drift', "".concat(drift.toFixed(2), "vw"));
    var rotation = Math.random() * 40 - 20;
    container.style.setProperty('--pink-mode-rain-rotation', "".concat(rotation.toFixed(2), "deg"));
    layer.appendChild(container);
    var animationData;
    try {
      animationData = JSON.parse(template.data);
    } catch (error) {
      console.warn('Could not parse pink mode rain animation', error);
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
      return false;
    }
    var animationInstance;
    try {
      animationInstance = window.lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData
      });
    } catch (error) {
      console.warn('Could not start pink mode rain animation', error);
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
      return false;
    }
    var instance = {
      container: container,
      animation: animationInstance,
      destroyed: false,
      templateName: typeof template.name === 'string' ? template.name : null
    };
    container.addEventListener('animationend', function () {
      destroyPinkModeIconRainInstance(instance);
    }, {
      once: true
    });
    pinkModeIconRainInstances.add(instance);
    if (pinkModeIconRainInstances.size > PINK_MODE_ICON_RAIN_MAX_ACTIVE) {
      var oldest = pinkModeIconRainInstances.values().next().value;
      if (oldest && oldest !== instance) {
        destroyPinkModeIconRainInstance(oldest);
      }
    }
    return true;
  }
  function triggerPinkModeIconRain() {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }
    if (!document.body) {
      whenPinkModeBodyReady(triggerPinkModeIconRain);
      return;
    }
    if (pinkModeReduceMotionQuery && pinkModeReduceMotionQuery.matches) {
      return;
    }
    var now = Date.now();
    if (pinkModeIconRainLastTriggeredAt && now - pinkModeIconRainLastTriggeredAt < PINK_MODE_ICON_RAIN_COOLDOWN_MS) {
      return;
    }
    pinkModeIconRainLastTriggeredAt = now;
    var proceedWithTemplates = function proceedWithTemplates() {
      if (!document || !document.body || !document.body.classList.contains('pink-mode')) {
        return;
      }
      loadPinkModeAnimatedIconTemplates().then(function (templates) {
        if (!Array.isArray(templates) || !templates.length) {
          return templates;
        }
        var maxAdditional = Math.max(0, PINK_MODE_ICON_RAIN_MAX_COUNT - PINK_MODE_ICON_RAIN_MIN_COUNT);
        var dropCount = PINK_MODE_ICON_RAIN_MIN_COUNT + Math.round(Math.random() * maxAdditional);
        for (var i = 0; i < dropCount; i += 1) {
          var delay = Math.round(Math.random() * PINK_MODE_ICON_RAIN_DELAY_SPREAD_MS + i * 60);
          window.setTimeout(function () {
            spawnPinkModeIconRainInstance(templates);
          }, delay);
        }
        return templates;
      }).catch(function (error) {
        console.warn('Could not trigger pink mode icon rain', error);
      });
    };
    var runtime = resolvePinkModeLottieRuntime();
    if (runtime && typeof runtime.loadAnimation === 'function') {
      proceedWithTemplates();
      return;
    }
    ensurePinkModeLottieRuntime().then(function (lottie) {
      if (!lottie || typeof lottie.loadAnimation !== 'function') {
        return null;
      }
      proceedWithTemplates();
      return lottie;
    }).catch(function (error) {
      console.warn('Could not trigger pink mode icon rain', error);
    });
  }
  function spawnPinkModeAnimatedIconInstance(templates) {
    if (!pinkModeAnimatedIconsActive || !Array.isArray(templates) || !templates.length || typeof window === 'undefined' || !window.lottie || typeof window.lottie.loadAnimation !== 'function') {
      return false;
    }
    var layer = ensurePinkModeAnimationLayer();
    if (!layer) {
      return false;
    }
    var sanitizedTemplates = templates.filter(Boolean);
    if (!sanitizedTemplates.length) {
      return false;
    }
    var activeTemplateNames = new Set();
    var _iterator1 = _createForOfIteratorHelper(pinkModeAnimatedIconInstances),
      _step1;
    try {
      for (_iterator1.s(); !(_step1 = _iterator1.n()).done;) {
        var _instance3 = _step1.value;
        if (!_instance3) {
          continue;
        }
        var templateName = typeof _instance3.templateName === 'string' && _instance3.templateName ? _instance3.templateName : null;
        if (templateName) {
          activeTemplateNames.add(templateName);
        }
      }
    } catch (err) {
      _iterator1.e(err);
    } finally {
      _iterator1.f();
    }
    var availableTemplates = sanitizedTemplates.filter(function (template) {
      if (!template || typeof template.name !== 'string') {
        return true;
      }
      return !activeTemplateNames.has(template.name);
    });
    if (!availableTemplates.length) {
      return false;
    }
    if (availableTemplates.length > 1 && pinkModeAnimatedIconLastTemplateName) {
      var filteredTemplates = availableTemplates.filter(function (template) {
        return template && template.name !== pinkModeAnimatedIconLastTemplateName;
      });
      if (filteredTemplates.length) {
        availableTemplates = filteredTemplates;
      }
    }
    var template = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
    if (!template || !template.data) {
      return false;
    }
    var container = document.createElement('div');
    container.className = 'pink-mode-animation-instance';
    container.setAttribute('aria-hidden', 'true');
    var duration = Math.round(Math.random() * (PINK_MODE_ANIMATED_ICON_MAX_DURATION_MS - PINK_MODE_ANIMATED_ICON_MIN_DURATION_MS) + PINK_MODE_ANIMATED_ICON_MIN_DURATION_MS);
    var baseSize = Math.random() * (PINK_MODE_ANIMATED_ICON_MAX_SIZE_PX - PINK_MODE_ANIMATED_ICON_MIN_SIZE_PX) + PINK_MODE_ANIMATED_ICON_MIN_SIZE_PX;
    var viewportWidth = typeof window !== 'undefined' && typeof window.innerWidth === 'number' ? window.innerWidth : document.documentElement && typeof document.documentElement.clientWidth === 'number' ? document.documentElement.clientWidth : null;
    var viewportScale = viewportWidth && viewportWidth < PINK_MODE_ANIMATED_ICON_FULL_SIZE_VIEWPORT_MIN ? Math.max(PINK_MODE_ANIMATED_ICON_MIN_SCALE, viewportWidth / PINK_MODE_ANIMATED_ICON_FULL_SIZE_VIEWPORT_MIN) : 1;
    var size = Math.max(Math.round(baseSize * viewportScale), Math.round(PINK_MODE_ANIMATED_ICON_MIN_SIZE_PX * PINK_MODE_ANIMATED_ICON_MIN_SCALE));
    var host = layer.parentElement || document.body;
    var viewportHeight = typeof window !== 'undefined' && window.innerHeight ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : size * 4;
    var viewportTop = typeof window !== 'undefined' && typeof window.scrollY === 'number' ? window.scrollY : document.documentElement && typeof document.documentElement.scrollTop === 'number' ? document.documentElement.scrollTop : 0;
    var viewportBottom = viewportTop + viewportHeight;
    var hostRect = host ? host.getBoundingClientRect() : null;
    var hostTop = hostRect ? hostRect.top + viewportTop : 0;
    var hostHeight = resolvePinkModeHostExtent(host, hostRect, viewportHeight);
    var hostBottom = hostTop + hostHeight;
    var visibleTop = Math.max(hostTop, viewportTop);
    var visibleBottom = Math.min(hostBottom, viewportBottom);
    if (visibleBottom <= visibleTop) {
      visibleTop = hostTop;
      visibleBottom = hostBottom;
    }
    var hostWidth = host && typeof host.clientWidth === 'number' && host.clientWidth > 0 ? host.clientWidth : viewportWidth || size * 4;
    var hostOffsetLeft = hostRect && Number.isFinite(hostRect.left) ? hostRect.left : 0;
    var hostOffsetTop = hostRect && Number.isFinite(hostRect.top) ? hostRect.top : 0;
    var safeHorizontalRange = Math.max(hostWidth, size * 3);
    var safeVerticalRange = Math.max(hostHeight, size * 3);
    var horizontalPadding = Math.min(Math.max(size * 0.6 + 48, 48), safeHorizontalRange / 2);
    var verticalPadding = Math.min(Math.max(size * 0.6 + 64, 64), safeVerticalRange / 2);
    var hostRight = hostRect && Number.isFinite(hostRect.right) ? hostRect.right : hostOffsetLeft + hostWidth;
    var leftMarginSpace = viewportWidth && Number.isFinite(hostOffsetLeft) ? Math.max(0, hostOffsetLeft) : 0;
    var rightMarginSpace = viewportWidth && Number.isFinite(hostRight) ? Math.max(0, viewportWidth - hostRight) : leftMarginSpace;
    var leftMarginExtension = 0;
    var rightMarginExtension = 0;
    if (viewportWidth && hostWidth && viewportWidth > hostWidth && (leftMarginSpace > 0 || rightMarginSpace > 0)) {
      var marginSafetyBuffer = Math.min(horizontalPadding, Math.max(size * 0.4, 32));
      leftMarginExtension = Math.max(0, leftMarginSpace - marginSafetyBuffer);
      rightMarginExtension = Math.max(0, rightMarginSpace - marginSafetyBuffer);
    }
    var historicalAvoidRegions = pinkModeAnimatedIconPlacementHistory.map(function (spot) {
      if (!spot) {
        return null;
      }
      var spotX = spot.x,
        spotY = spot.y,
        spotSize = spot.size;
      if (!Number.isFinite(spotX) || !Number.isFinite(spotY)) {
        return null;
      }
      var halfSize = Number.isFinite(spotSize) && spotSize > 0 ? spotSize / 2 : PINK_MODE_ANIMATED_ICON_MIN_SIZE_PX / 2;
      var margin = Math.max(PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX, PINK_MODE_ANIMATED_ICON_RECENT_SPOT_MARGIN_PX, halfSize);
      var centerX = hostOffsetLeft + spotX;
      var centerY = hostOffsetTop + spotY;
      return {
        left: centerX - halfSize,
        right: centerX + halfSize,
        top: centerY - halfSize,
        bottom: centerY + halfSize,
        margin: margin
      };
    }).filter(Boolean);
    var avoidRegions = [].concat(_toConsumableArray(computePinkModeAnimationAvoidRegions(layer)), _toConsumableArray(collectPinkModeAnimationInstanceRegions(layer)), _toConsumableArray(historicalAvoidRegions));
    var placement = findPinkModeAnimationPlacement({
      layer: layer,
      hostRect: hostRect,
      hostTop: hostTop,
      visibleTop: visibleTop,
      visibleBottom: visibleBottom,
      horizontalPadding: horizontalPadding,
      verticalPadding: verticalPadding,
      hostWidth: hostWidth,
      size: size,
      avoidRegions: avoidRegions,
      leftMarginExtension: leftMarginExtension,
      rightMarginExtension: rightMarginExtension
    });
    if (!placement) {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
      return false;
    }
    var x = placement.x,
      y = placement.y;
    pinkModeAnimatedIconPlacementHistory.push({
      x: x,
      y: y,
      size: size
    });
    if (pinkModeAnimatedIconPlacementHistory.length > PINK_MODE_ANIMATED_ICON_RECENT_SPOT_LIMIT) {
      pinkModeAnimatedIconPlacementHistory.splice(0, pinkModeAnimatedIconPlacementHistory.length - PINK_MODE_ANIMATED_ICON_RECENT_SPOT_LIMIT);
    }
    container.style.setProperty('--pink-mode-animation-duration', "".concat(duration, "ms"));
    container.style.setProperty('--pink-mode-animation-size', "".concat(size, "px"));
    container.style.setProperty('--pink-mode-animation-x', "".concat(x, "px"));
    container.style.setProperty('--pink-mode-animation-y', "".concat(y, "px"));
    layer.appendChild(container);
    var animationData;
    try {
      animationData = JSON.parse(template.data);
    } catch (error) {
      console.warn('Could not parse pink mode animation', error);
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
      return false;
    }
    var animationInstance;
    try {
      animationInstance = window.lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData
      });
    } catch (error) {
      console.warn('Could not start pink mode animation', error);
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
      return false;
    }
    var instance = {
      container: container,
      animation: animationInstance,
      destroyed: false,
      templateName: typeof template.name === 'string' ? template.name : null
    };
    container.addEventListener('animationend', function () {
      destroyPinkModeAnimatedIconInstance(instance);
    }, {
      once: true
    });
    pinkModeAnimatedIconInstances.add(instance);
    if (pinkModeAnimatedIconInstances.size > PINK_MODE_ANIMATED_ICON_MAX_ACTIVE) {
      var oldest = pinkModeAnimatedIconInstances.values().next().value;
      if (oldest && oldest !== instance) {
        destroyPinkModeAnimatedIconInstance(oldest);
      }
    }
    pinkModeAnimatedIconLastTemplateName = typeof template.name === 'string' ? template.name : null;
    ensurePinkModeAnimatedIconPressListener();
    return true;
  }
  function scheduleNextPinkModeAnimatedIcon(templates) {
    if (!pinkModeAnimatedIconsActive) {
      return;
    }
    var delay = Math.round(Math.random() * (PINK_MODE_ANIMATED_ICON_MAX_INTERVAL_MS - PINK_MODE_ANIMATED_ICON_MIN_INTERVAL_MS) + PINK_MODE_ANIMATED_ICON_MIN_INTERVAL_MS);
    pinkModeAnimatedIconTimeoutId = window.setTimeout(function () {
      pinkModeAnimatedIconTimeoutId = null;
      if (!pinkModeAnimatedIconsActive) {
        return;
      }
      spawnPinkModeAnimatedIconInstance(templates);
      if (pinkModeAnimatedIconsActive) {
        scheduleNextPinkModeAnimatedIcon(templates);
      }
    }, delay);
    if (pinkModeAnimatedIconTimeoutId && typeof pinkModeAnimatedIconTimeoutId.unref === 'function') {
      pinkModeAnimatedIconTimeoutId.unref();
    }
  }
  function activatePinkModeAnimatedIcons() {
    if (pinkModeAnimatedIconsActive || !document || !document.body || !document.body.classList.contains('pink-mode')) {
      return;
    }
    pinkModeAnimatedIconsActive = true;
    loadPinkModeAnimatedIconTemplates().then(function (templates) {
      if (!pinkModeAnimatedIconsActive) {
        return templates;
      }
      if (!templates.length) {
        stopPinkModeAnimatedIcons();
        return templates;
      }
      spawnPinkModeAnimatedIconInstance(templates);
      scheduleNextPinkModeAnimatedIcon(templates);
      return templates;
    }).catch(function (error) {
      console.warn('Could not prepare pink mode animated icons', error);
      stopPinkModeAnimatedIcons();
    });
  }
  function startPinkModeAnimatedIcons() {
    if (pinkModeAnimatedIconsActive) {
      return;
    }
    if (typeof document === 'undefined' || !document) {
      return;
    }
    if (!document.body) {
      whenPinkModeBodyReady(startPinkModeAnimatedIcons);
      return;
    }
    if (pinkModeReduceMotionQuery && pinkModeReduceMotionQuery.matches) {
      return;
    }
    if (!document.body.classList.contains('pink-mode')) {
      return;
    }
    var runtime = resolvePinkModeLottieRuntime();
    if (runtime && typeof runtime.loadAnimation === 'function') {
      activatePinkModeAnimatedIcons();
      return;
    }
    ensurePinkModeLottieRuntime().then(function (lottie) {
      if (!lottie || typeof lottie.loadAnimation !== 'function') {
        return null;
      }
      if (!document || !document.body || !document.body.classList.contains('pink-mode') || pinkModeReduceMotionQuery && pinkModeReduceMotionQuery.matches) {
        return null;
      }
      activatePinkModeAnimatedIcons();
      return lottie;
    }).catch(function (error) {
      console.warn('Could not prepare pink mode animated icons', error);
      stopPinkModeAnimatedIcons();
    });
  }
  function stopPinkModeAnimatedIcons() {
    pinkModeAnimatedIconsActive = false;
    if (pinkModeAnimatedIconTimeoutId) {
      clearTimeout(pinkModeAnimatedIconTimeoutId);
      pinkModeAnimatedIconTimeoutId = null;
    }
    if (pinkModeAnimatedIconInstances.size) {
      Array.from(pinkModeAnimatedIconInstances).forEach(function (instance) {
        destroyPinkModeAnimatedIconInstance(instance);
      });
      pinkModeAnimatedIconInstances.clear();
    }
    if (!pinkModeAnimatedIconInstances.size) {
      teardownPinkModeAnimatedIconPressListener();
    }
    pinkModeAnimatedIconPlacementHistory.length = 0;
    if (pinkModeAnimatedIconLayer && pinkModeAnimatedIconLayer.parentNode) {
      pinkModeAnimatedIconLayer.parentNode.removeChild(pinkModeAnimatedIconLayer);
    }
    pinkModeAnimatedIconLayer = null;
    pinkModeAnimatedIconLastTemplateName = null;
  }
  if (pinkModeReduceMotionQuery) {
    var handlePinkModeReduceMotionChange = function handlePinkModeReduceMotionChange(event) {
      if (event.matches) {
        stopPinkModeAnimatedIcons();
      } else if (document.body && document.body.classList.contains('pink-mode')) {
        startPinkModeAnimatedIcons();
      }
    };
    if (typeof pinkModeReduceMotionQuery.addEventListener === 'function') {
      pinkModeReduceMotionQuery.addEventListener('change', handlePinkModeReduceMotionChange);
    } else if (typeof pinkModeReduceMotionQuery.addListener === 'function') {
      pinkModeReduceMotionQuery.addListener(handlePinkModeReduceMotionChange);
    }
  }
  var PINK_MODE_ICON_INTERVAL_MS = 30000;
  var PINK_MODE_ICON_ANIMATION_CLASS = 'pink-mode-icon-pop';
  var PINK_MODE_ICON_ANIMATION_RESET_DELAY = 450;
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
    aspectRatio: ASPECT_RATIO_ICON,
    codec: ICON_GLYPHS.codec,
    baseFrameRate: iconGlyph("\uE46F", ICON_FONT_KEYS.UICONS),
    sensorMode: ICON_GLYPHS.sensor,
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
  setButtonLabelWithIcon = function setButtonLabelWithIcon(button, label) {
    var glyph = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ICON_GLYPHS.save;
    if (!button) return;
    var safeLabel = escapeButtonLabelSafely(typeof label === 'string' ? label : '');
    var iconHtml = resolveButtonIconMarkup(glyph);
    button.innerHTML = "".concat(iconHtml).concat(safeLabel);
  };
  if (CORE_GLOBAL_SCOPE && _typeof(CORE_GLOBAL_SCOPE) === 'object') {
    try {
      CORE_GLOBAL_SCOPE.setButtonLabelWithIcon = setButtonLabelWithIcon;
    } catch (setButtonLabelAssignError) {
      CORE_GLOBAL_SCOPE.setButtonLabelWithIcon = setButtonLabelWithIcon;
      void setButtonLabelAssignError;
    }
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
    var _ref39 = options || {},
      _ref39$contextPaths = _ref39.contextPaths,
      contextPaths = _ref39$contextPaths === void 0 ? [] : _ref39$contextPaths,
      _ref39$fallbackContex = _ref39.fallbackContext,
      fallbackContext = _ref39$fallbackContex === void 0 ? '' : _ref39$fallbackContex,
      _ref39$actionKey = _ref39.actionKey,
      actionKey = _ref39$actionKey === void 0 ? 'addEntry' : _ref39$actionKey;
    setButtonLabelWithIcon(button, '', glyph || ICON_GLYPHS.add);
    var actionLabel = getLocalizedPathText(['projectForm', actionKey], actionKey === 'removeEntry' ? 'Remove' : 'Add');
    var paths = Array.isArray(contextPaths) ? contextPaths : [contextPaths];
    var contextLabel = '';
    var _iterator10 = _createForOfIteratorHelper(paths),
      _step10;
    try {
      for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
        var path = _step10.value;
        if (!path) continue;
        var resolved = getLocalizedPathText(path, '');
        if (resolved) {
          contextLabel = resolved;
          break;
        }
      }
    } catch (err) {
      _iterator10.e(err);
    } finally {
      _iterator10.f();
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
  var CONTACT_AVATAR_MAX_BYTES = 300 * 1024;
  var CONTACT_AVATAR_MAX_SOURCE_BYTES = 6 * 1024 * 1024;
  var CONTACT_AVATAR_MAX_DIMENSION = 256;
  var CONTACT_AVATAR_JPEG_QUALITY = 0.85;
  var CONTACT_AVATAR_JPEG_MIN_QUALITY = 0.55;
  var contactsCache = [];
  var contactsInitialized = false;
  var userProfileState = {
    name: '',
    role: '',
    avatar: '',
    phone: '',
    email: ''
  };
  var userProfileDirty = false;
  var userProfilePendingAnnouncement = false;
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
    var moduleApi = resolveContactsModule();
    if (moduleApi && typeof moduleApi.sanitizeContactValue === 'function') {
      try {
        return moduleApi.sanitizeContactValue(value);
      } catch (error) {
        console.warn('Unable to sanitize contact value via module.', error);
      }
    }
    if (typeof value !== 'string') return '';
    return value.trim();
  }
  function normalizeContactEntry(entry) {
    var moduleApi = resolveContactsModule();
    if (moduleApi && typeof moduleApi.normalizeContactEntry === 'function') {
      try {
        return moduleApi.normalizeContactEntry(entry);
      } catch (error) {
        console.warn('Unable to normalize contact via module.', error);
      }
    }
    if (!entry || _typeof(entry) !== 'object') return null;
    var id = sanitizeContactValue(entry.id) || generateContactId();
    var name = sanitizeContactValue(entry.name);
    var role = sanitizeContactValue(entry.role);
    var phone = sanitizeContactValue(entry.phone);
    var email = sanitizeContactValue(entry.email);
    var avatar = typeof entry.avatar === 'string' && entry.avatar.startsWith('data:') ? entry.avatar : '';
    var createdAt = Number.isFinite(entry.createdAt) ? entry.createdAt : Date.now();
    var updatedAt = Number.isFinite(entry.updatedAt) ? entry.updatedAt : createdAt;
    var normalized = {
      id: id,
      name: name,
      role: role,
      phone: phone,
      email: email,
      createdAt: createdAt,
      updatedAt: updatedAt
    };
    if (avatar) normalized.avatar = avatar;
    return normalized;
  }
  function sortContacts(list) {
    var moduleApi = resolveContactsModule();
    if (moduleApi && typeof moduleApi.sortContacts === 'function') {
      try {
        return moduleApi.sortContacts(list);
      } catch (error) {
        console.warn('Unable to sort contacts via module.', error);
      }
    }
    return (Array.isArray(list) ? list.filter(Boolean) : []).map(normalizeContactEntry).filter(Boolean).sort(function (a, b) {
      var nameA = ((a === null || a === void 0 ? void 0 : a.name) || '').toLowerCase();
      var nameB = ((b === null || b === void 0 ? void 0 : b.name) || '').toLowerCase();
      if (nameA && nameB && nameA !== nameB) {
        try {
          return nameA.localeCompare(nameB);
        } catch (error) {
          void error;
        }
      }
      if (nameA && !nameB) return -1;
      if (!nameA && nameB) return 1;
      return ((a === null || a === void 0 ? void 0 : a.createdAt) || 0) - ((b === null || b === void 0 ? void 0 : b.createdAt) || 0);
    });
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
  function setContactSelectOptions(select, selectedId) {
    if (!select) return;
    var currentValue = typeof selectedId === 'string' ? selectedId : select.value;
    var optionLang = select.lang;
    if (!optionLang && typeof document !== 'undefined' && document && document.documentElement) {
      optionLang = document.documentElement.lang || '';
    }
    if (!optionLang) {
      optionLang = currentLang || DEFAULT_LANGUAGE;
    }
    var optionDirection = select.dir || resolveDocumentDirection(optionLang || currentLang || DEFAULT_LANGUAGE);
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
    var placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = getContactsText('selectPlaceholder', 'Select contact');
    applyLocaleMetadata(placeholder, optionLang, optionDirection);
    select.appendChild(placeholder);
    contactsCache.forEach(function (contact) {
      var option = document.createElement('option');
      option.value = contact.id;
      option.textContent = getContactDisplayLabel(contact);
      applyLocaleMetadata(option, optionLang, optionDirection);
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
      applyLocaleMetadata(fallback, optionLang, optionDirection);
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
    if (avatarValue) {
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
    var _ref40 = options || {},
      _ref40$restoreFocus = _ref40.restoreFocus,
      restoreFocus = _ref40$restoreFocus === void 0 ? false : _ref40$restoreFocus;
    if (avatarEditSection) {
      avatarEditSection.classList.add('hidden');
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
    refreshAvatarOptionsActions();
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
    resolveContactsDomRefs();
    if (!avatarOptionsDialog) return;
    avatarOptionsContext = context || null;
    var avatarValue = typeof (context === null || context === void 0 ? void 0 : context.getAvatar) === 'function' ? context.getAvatar() : '';
    var fallbackName = typeof (context === null || context === void 0 ? void 0 : context.getName) === 'function' ? context.getName() : '';
    updateAvatarOptionsPreview(avatarValue, fallbackName);
    stopAvatarEditing();
    refreshAvatarOptionsActions();
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
  function initializeAvatarEditState(dataUrl) {
    resolveContactsDomRefs();
    if (!avatarEditViewport || !avatarEditImage) return;
    if (!dataUrl) {
      announceContactsMessage(getContactsText('avatarMissingImage', 'Add a photo before editing.'));
      return;
    }
    var viewportRect = avatarEditViewport.getBoundingClientRect();
    var viewportSize = Math.round(Math.max(avatarEditViewport.offsetWidth || 0, viewportRect.width || 0, viewportRect.height || 0));
    if (!viewportSize) {
      announceContactsMessage(getContactsText('avatarEditUnavailable', 'Photo editor unavailable.'));
      return;
    }
    var image = new Image();
    image.decoding = 'async';
    var mime = parseDataUrlMimeType(dataUrl);
    image.onload = function () {
      var _avatarEditSection;
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
      (_avatarEditSection = avatarEditSection) === null || _avatarEditSection === void 0 || _avatarEditSection.classList.remove('hidden');
      if (avatarEditZoomInput) {
        avatarEditZoomInput.value = '100';
      }
      updateAvatarEditMetrics(avatarEditState);
      refreshAvatarOptionsActions();
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
    if (!avatarValue) {
      announceContactsMessage(getContactsText('avatarMissingImage', 'Add a photo before editing.'));
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
    refreshAvatarOptionsActions();
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
      return {
        id: contact.id,
        name: contact.name || '',
        role: contact.role || '',
        phone: contact.phone || '',
        email: contact.email || '',
        avatar: contact.avatar || '',
        label: getContactDisplayLabel(contact)
      };
    });
  }
  function getUserProfileSnapshot() {
    var name = typeof userProfileState.name === 'string' ? userProfileState.name.trim() : '';
    var role = typeof userProfileState.role === 'string' ? userProfileState.role.trim() : '';
    var avatar = typeof userProfileState.avatar === 'string' ? userProfileState.avatar : '';
    var phone = typeof userProfileState.phone === 'string' ? userProfileState.phone.trim() : '';
    var email = typeof userProfileState.email === 'string' ? userProfileState.email.trim() : '';
    return {
      name: name,
      role: role,
      avatar: avatar,
      phone: phone,
      email: email
    };
  }
  function applyUserProfileToDom() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    resolveContactsDomRefs();
    var profile = getUserProfileSnapshot();
    var preserveSelection = Boolean(options && options.preserveSelection);
    var preserveTarget = options && options.preserveSelectionTarget ? options.preserveSelectionTarget : preserveSelection ? typeof document !== 'undefined' ? document.activeElement : null : null;
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
      if (preserveTarget === userProfileRoleInput) {
        var roleStart = userProfileRoleInput.selectionStart;
        var roleEnd = userProfileRoleInput.selectionEnd;
        userProfileRoleInput.value = profile.role;
        try {
          userProfileRoleInput.setSelectionRange(roleStart, roleEnd);
        } catch (error) {
          void error;
        }
      } else {
        userProfileRoleInput.value = profile.role;
      }
    }
    if (userProfilePhoneInput) {
      if (preserveTarget === userProfilePhoneInput) {
        var phoneStart = userProfilePhoneInput.selectionStart;
        var phoneEnd = userProfilePhoneInput.selectionEnd;
        userProfilePhoneInput.value = profile.phone;
        try {
          userProfilePhoneInput.setSelectionRange(phoneStart, phoneEnd);
        } catch (error) {
          void error;
        }
      } else {
        userProfilePhoneInput.value = profile.phone;
      }
    }
    if (userProfileEmailInput) {
      if (preserveTarget === userProfileEmailInput) {
        var emailStart = userProfileEmailInput.selectionStart;
        var emailEnd = userProfileEmailInput.selectionEnd;
        userProfileEmailInput.value = profile.email;
        try {
          userProfileEmailInput.setSelectionRange(emailStart, emailEnd);
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
    try {
      if (typeof loadUserProfile === 'function') {
        var loaded = loadUserProfile();
        if (loaded && _typeof(loaded) === 'object') {
          userProfileState = {
            name: typeof loaded.name === 'string' ? loaded.name : '',
            role: typeof loaded.role === 'string' ? loaded.role : '',
            avatar: typeof loaded.avatar === 'string' ? loaded.avatar : '',
            phone: typeof loaded.phone === 'string' ? loaded.phone : '',
            email: typeof loaded.email === 'string' ? loaded.email : ''
          };
        } else {
          userProfileState = {
            name: '',
            role: '',
            avatar: '',
            phone: '',
            email: ''
          };
        }
      }
    } catch (error) {
      console.warn('Failed to load user profile', error);
      userProfileState = {
        name: '',
        role: '',
        avatar: '',
        phone: '',
        email: ''
      };
    }
    userProfileDirty = false;
    userProfilePendingAnnouncement = false;
    applyUserProfileToDom();
    dispatchGearProviderDataChanged('user-profile');
  }
  function persistUserProfileState() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var profile = getUserProfileSnapshot();
    userProfileState = profile;
    if (typeof saveUserProfile === 'function') {
      try {
        saveUserProfile(profile);
      } catch (error) {
        console.warn('Failed to save user profile', error);
      }
    }
    userProfileDirty = false;
    var activeElement = typeof document !== 'undefined' ? document.activeElement : null;
    var shouldPreserve = activeElement === userProfileNameInput || activeElement === userProfileRoleInput || activeElement === userProfilePhoneInput || activeElement === userProfileEmailInput;
    applyUserProfileToDom({
      preserveSelection: shouldPreserve,
      preserveSelectionTarget: shouldPreserve ? activeElement : null
    });
    if (options && options.announce) {
      announceContactsMessage(getContactsText('userProfileSaved', 'Profile saved.'));
      userProfilePendingAnnouncement = false;
    }
    dispatchGearProviderDataChanged('user-profile');
  }
  function handleUserProfileNameInput() {
    if (!userProfileNameInput) return;
    var rawValue = typeof userProfileNameInput.value === 'string' ? userProfileNameInput.value : '';
    if (rawValue.trim() === userProfileState.name.trim()) {
      return;
    }
    userProfileState = {
      name: rawValue,
      role: userProfileState.role || '',
      avatar: userProfileState.avatar || '',
      phone: userProfileState.phone || '',
      email: userProfileState.email || ''
    };
    userProfileDirty = true;
    userProfilePendingAnnouncement = true;
    persistUserProfileState();
  }
  function handleUserProfileRoleInput() {
    if (!userProfileRoleInput) return;
    var rawValue = typeof userProfileRoleInput.value === 'string' ? userProfileRoleInput.value : '';
    if (rawValue.trim() === userProfileState.role.trim()) {
      return;
    }
    userProfileState = {
      name: userProfileState.name || '',
      role: rawValue,
      avatar: userProfileState.avatar || '',
      phone: userProfileState.phone || '',
      email: userProfileState.email || ''
    };
    userProfileDirty = true;
    userProfilePendingAnnouncement = true;
    persistUserProfileState();
  }
  function handleUserProfilePhoneInput() {
    if (!userProfilePhoneInput) return;
    var rawValue = typeof userProfilePhoneInput.value === 'string' ? userProfilePhoneInput.value : '';
    if (rawValue.trim() === userProfileState.phone.trim()) {
      return;
    }
    userProfileState = {
      name: userProfileState.name || '',
      role: userProfileState.role || '',
      avatar: userProfileState.avatar || '',
      phone: rawValue,
      email: userProfileState.email || ''
    };
    userProfileDirty = true;
    userProfilePendingAnnouncement = true;
    persistUserProfileState();
  }
  function handleUserProfileEmailInput() {
    if (!userProfileEmailInput) return;
    var rawValue = typeof userProfileEmailInput.value === 'string' ? userProfileEmailInput.value : '';
    if (rawValue.trim() === userProfileState.email.trim()) {
      return;
    }
    userProfileState = {
      name: userProfileState.name || '',
      role: userProfileState.role || '',
      avatar: userProfileState.avatar || '',
      phone: userProfileState.phone || '',
      email: rawValue
    };
    userProfileDirty = true;
    userProfilePendingAnnouncement = true;
    persistUserProfileState();
  }
  function handleUserProfileFieldBlur() {
    if (!userProfileDirty && !userProfilePendingAnnouncement) {
      return;
    }
    userProfileDirty = false;
    if (userProfilePendingAnnouncement) {
      userProfilePendingAnnouncement = false;
      announceContactsMessage(getContactsText('userProfileSaved', 'Profile saved.'));
    }
  }
  function handleUserProfileAvatarCleared() {
    if (!userProfileState.avatar) {
      return;
    }
    userProfileState = {
      name: userProfileState.name || '',
      role: userProfileState.role || '',
      avatar: '',
      phone: userProfileState.phone || '',
      email: userProfileState.email || ''
    };
    persistUserProfileState();
    announceContactsMessage(getContactsText('avatarCleared', 'Profile photo removed.'));
    if (isDialogOpen(avatarOptionsDialog)) {
      closeAvatarOptionsDialog();
    }
  }
  function handleUserProfileAvatarButtonClick() {
    var hasAvatar = Boolean(userProfileState && userProfileState.avatar);
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
        return userProfileState.avatar || '';
      },
      getName: function getName() {
        var _userProfileNameInput;
        return userProfileState.name || ((_userProfileNameInput = userProfileNameInput) === null || _userProfileNameInput === void 0 ? void 0 : _userProfileNameInput.value) || '';
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
        userProfileState = {
          name: userProfileState.name || ((_userProfileNameInput2 = userProfileNameInput) === null || _userProfileNameInput2 === void 0 ? void 0 : _userProfileNameInput2.value) || '',
          role: userProfileState.role || '',
          avatar: dataUrl,
          phone: userProfileState.phone || '',
          email: userProfileState.email || ''
        };
        persistUserProfileState();
        announceContactsMessage(getContactsText('avatarUpdated', 'Profile photo updated.'));
        closeAvatarOptionsDialog();
      }
    });
  }
  function handleUserProfileAvatarInputChange() {
    if (!userProfileAvatarInput) return;
    var _ref41 = userProfileAvatarInput.files || [],
      _ref42 = _slicedToArray(_ref41, 1),
      file = _ref42[0];
    if (!file) {
      return;
    }
    readAvatarFile(file, function (dataUrl) {
      userProfileState = {
        name: userProfileState.name || '',
        role: userProfileState.role || '',
        avatar: dataUrl,
        phone: userProfileState.phone || '',
        email: userProfileState.email || ''
      };
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
    var _ref43 = options || {},
      _ref43$preserveSelect = _ref43.preserveSelect,
      preserveSelect = _ref43$preserveSelect === void 0 ? false : _ref43$preserveSelect;
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
    if (!contactId) {
      badge.hidden = true;
      return;
    }
    var contact = getContactById(contactId);
    var baseLabel = getContactsText('linkedBadge', 'Linked to contact');
    if (contact && contact.name) {
      badge.textContent = "".concat(baseLabel, ": ").concat(contact.name);
    } else {
      badge.textContent = baseLabel;
    }
    badge.hidden = false;
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
  function estimateDataUrlSize(dataUrl) {
    if (typeof dataUrl !== 'string' || !dataUrl) return 0;
    var marker = 'base64,';
    var base64Index = dataUrl.indexOf(marker);
    if (base64Index === -1) return dataUrl.length;
    var base64 = dataUrl.slice(base64Index + marker.length).trim();
    if (!base64) return 0;
    var padding = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0;
    return Math.max(0, Math.floor(base64.length / 4) * 3 - padding);
  }
  function optimiseAvatarDataUrl(dataUrl, mimeType, onSuccess, onError) {
    if (!dataUrl || typeof document === 'undefined') {
      if (typeof onError === 'function') onError();
      return;
    }
    try {
      var image = new Image();
      var handleFailure = function handleFailure() {
        image.onload = null;
        image.onerror = null;
        if (typeof onError === 'function') onError();
      };
      image.onload = function () {
        image.onload = null;
        image.onerror = null;
        try {
          var width = image.naturalWidth || image.width || 0;
          var height = image.naturalHeight || image.height || 0;
          if (!width || !height) {
            handleFailure();
            return;
          }
          var scale = Math.min(1, CONTACT_AVATAR_MAX_DIMENSION / Math.max(width, height));
          var targetWidth = Math.max(1, Math.round(width * scale));
          var targetHeight = Math.max(1, Math.round(height * scale));
          var canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          var ctx = canvas.getContext('2d');
          if (!ctx) {
            handleFailure();
            return;
          }
          ctx.clearRect(0, 0, targetWidth, targetHeight);
          ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
          var preferPng = typeof mimeType === 'string' && /image\/(png|gif|webp)/i.test(mimeType);
          var exportOrder = preferPng ? ['image/png', 'image/jpeg'] : ['image/jpeg', 'image/png'];
          var tryCandidate = function tryCandidate(candidate) {
            var size = estimateDataUrlSize(candidate);
            if (size && size <= CONTACT_AVATAR_MAX_BYTES) {
              if (typeof onSuccess === 'function') onSuccess(candidate);
              return true;
            }
            return false;
          };
          for (var index = 0; index < exportOrder.length; index += 1) {
            var type = exportOrder[index];
            if (type === 'image/jpeg') {
              var quality = CONTACT_AVATAR_JPEG_QUALITY;
              while (quality + 0.0001 >= CONTACT_AVATAR_JPEG_MIN_QUALITY) {
                var bounded = Math.max(CONTACT_AVATAR_JPEG_MIN_QUALITY, Math.min(0.95, Number(quality.toFixed(2))));
                var candidate = canvas.toDataURL('image/jpeg', bounded);
                if (tryCandidate(candidate)) return;
                if (bounded === CONTACT_AVATAR_JPEG_MIN_QUALITY) break;
                quality -= 0.1;
              }
            } else {
              var _candidate = canvas.toDataURL(type);
              if (tryCandidate(_candidate)) return;
            }
          }
          handleFailure();
        } catch (canvasError) {
          void canvasError;
          handleFailure();
        }
      };
      image.onerror = handleFailure;
      image.decoding = 'async';
      image.src = dataUrl;
    } catch (error) {
      void error;
      if (typeof onError === 'function') onError();
    }
  }
  function readAvatarFile(file, onSuccess, onError) {
    if (!file) return;
    if (file.size > CONTACT_AVATAR_MAX_SOURCE_BYTES) {
      if (typeof onError === 'function') onError('tooLarge');
      return;
    }
    var reader = new FileReader();
    var handleError = function handleError(reason) {
      if (typeof onError === 'function') onError(reason);
    };
    reader.addEventListener('error', function () {
      return handleError('readError');
    });
    reader.addEventListener('load', function () {
      var result = typeof reader.result === 'string' ? reader.result : '';
      if (!result) {
        handleError('readError');
        return;
      }
      var initialSize = estimateDataUrlSize(result);
      if (initialSize && initialSize <= CONTACT_AVATAR_MAX_BYTES) {
        if (typeof onSuccess === 'function') onSuccess(result);
        return;
      }
      optimiseAvatarDataUrl(result, typeof file.type === 'string' ? file.type : '', function (optimised) {
        if (optimised && estimateDataUrlSize(optimised) <= CONTACT_AVATAR_MAX_BYTES) {
          if (typeof onSuccess === 'function') onSuccess(optimised);
          return;
        }
        if (initialSize && initialSize <= CONTACT_AVATAR_MAX_BYTES) {
          if (typeof onSuccess === 'function') onSuccess(result);
          return;
        }
        handleError('tooLarge');
      }, function () {
        if (initialSize && initialSize <= CONTACT_AVATAR_MAX_BYTES) {
          if (typeof onSuccess === 'function') onSuccess(result);
          return;
        }
        handleError('readError');
      });
    });
    try {
      reader.readAsDataURL(file);
    } catch (error) {
      handleError('readError');
    }
  }
  function handleAvatarFileSelection(row, file) {
    readAvatarFile(file, function (dataUrl) {
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
    var _ref44 = options || {},
      _ref44$skipDirty = _ref44.skipDirty,
      skipDirty = _ref44$skipDirty === void 0 ? false : _ref44$skipDirty,
      _ref44$skipAnnounceme = _ref44.skipAnnouncement,
      skipAnnouncement = _ref44$skipAnnounceme === void 0 ? false : _ref44$skipAnnounceme;
    row.dataset.syncingContact = '1';
    try {
      var roleSel = row.querySelector('select[name="crewRole"]');
      if (roleSel) {
        if (contact.role && !Array.from(roleSel.options).some(function (opt) {
          return opt.value === contact.role;
        })) {
          var _texts9, _texts0;
          var opt = document.createElement('option');
          opt.value = contact.role;
          var roleLabels = ((_texts9 = texts) === null || _texts9 === void 0 || (_texts9 = _texts9[currentLang]) === null || _texts9 === void 0 ? void 0 : _texts9.crewRoles) || ((_texts0 = texts) === null || _texts0 === void 0 || (_texts0 = _texts0.en) === null || _texts0 === void 0 ? void 0 : _texts0.crewRoles) || {};
          opt.textContent = roleLabels[contact.role] || contact.role;
          roleSel.appendChild(opt);
        }
        if (contact.role) {
          roleSel.value = contact.role;
        }
      }
      var nameInput = row.querySelector('.person-name');
      if (nameInput) nameInput.value = contact.name || '';
      var phoneInput = row.querySelector('.person-phone');
      if (phoneInput) phoneInput.value = contact.phone || '';
      var emailInput = row.querySelector('.person-email');
      if (emailInput) emailInput.value = contact.email || '';
      var websiteInput = row.querySelector('.person-website');
      if (websiteInput) websiteInput.value = contact.website || '';
      setRowAvatar(row, contact.avatar || '', {
        name: contact.name
      });
      row.dataset.contactId = contact.id;
      var contactSelect = row.querySelector('.person-contact-select');
      if (contactSelect) {
        setContactSelectOptions(contactSelect, contact.id);
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
    if (typeof text !== 'string') return [];
    var normalized = text.replace(/\r\n?/g, '\n');
    var folded = [];
    normalized.split('\n').forEach(function (line) {
      if (/^[ \t]/.test(line) && folded.length) {
        folded[folded.length - 1] += line.replace(/^[ \t]/, '');
      } else {
        folded.push(line);
      }
    });
    var contacts = [];
    var current = null;
    folded.forEach(function (line) {
      var _keySegments$;
      if (/^BEGIN:VCARD/i.test(line)) {
        current = {
          name: '',
          role: '',
          phone: '',
          email: '',
          website: '',
          avatar: ''
        };
        return;
      }
      if (/^END:VCARD/i.test(line)) {
        if (current && (current.name || current.email || current.phone || current.website)) {
          contacts.push(_objectSpread({}, current));
        }
        current = null;
        return;
      }
      if (!current) return;
      var _line$split = line.split(':'),
        _line$split2 = _toArray(_line$split),
        rawKey = _line$split2[0],
        rawValueParts = _line$split2.slice(1);
      if (!rawValueParts.length) return;
      var keySegments = rawKey.split(';');
      var baseKey = (_keySegments$ = keySegments[0]) === null || _keySegments$ === void 0 ? void 0 : _keySegments$.toUpperCase();
      var value = rawValueParts.join(':').trim();
      if (!baseKey) return;
      if (baseKey === 'FN') {
        current.name = sanitizeContactValue(value);
        return;
      }
      if (baseKey === 'N' && !current.name) {
        current.name = value.split(';').filter(Boolean).join(' ').trim();
        return;
      }
      if (baseKey === 'TEL') {
        if (!current.phone) current.phone = sanitizeContactValue(value);
        return;
      }
      if (baseKey === 'EMAIL') {
        if (!current.email) current.email = sanitizeContactValue(value);
        return;
      }
      if (baseKey === 'URL' || /\.URL$/.test(baseKey)) {
        if (!current.website) current.website = sanitizeContactValue(value);
        return;
      }
      if ((baseKey === 'ROLE' || baseKey === 'TITLE') && !current.role) {
        current.role = sanitizeContactValue(value);
        return;
      }
      if (baseKey === 'ORG' && !current.role) {
        current.role = sanitizeContactValue(value);
        return;
      }
      if (baseKey === 'PHOTO') {
        var dataValue = value;
        if (!dataValue) return;
        if (/^data:/i.test(dataValue)) {
          current.avatar = dataValue;
          return;
        }
        var params = keySegments.slice(1);
        var mime = 'image/jpeg';
        params.forEach(function (param) {
          var _param$split = param.split('='),
            _param$split2 = _slicedToArray(_param$split, 2),
            paramKey = _param$split2[0],
            paramValue = _param$split2[1];
          if (!paramValue) return;
          var normalizedKey = paramKey.trim().toUpperCase();
          var normalizedValue = paramValue.trim();
          if (normalizedKey === 'MEDIATYPE') {
            mime = normalizedValue;
          } else if (normalizedKey === 'TYPE') {
            var lowered = normalizedValue.toLowerCase();
            if (lowered.includes('/')) {
              mime = lowered;
            } else {
              mime = "image/".concat(lowered);
            }
          }
        });
        current.avatar = "data:".concat(mime, ";base64,").concat(dataValue);
      }
    });
    return contacts.map(function (entry) {
      return {
        name: sanitizeContactValue(entry.name),
        role: sanitizeContactValue(entry.role),
        phone: sanitizeContactValue(entry.phone),
        email: sanitizeContactValue(entry.email),
        website: sanitizeContactValue(entry.website),
        avatar: typeof entry.avatar === 'string' && entry.avatar.startsWith('data:') ? entry.avatar : ''
      };
    }).filter(function (entry) {
      return entry.name || entry.email || entry.phone || entry.website;
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
    var added = 0;
    var updated = 0;
    imported.forEach(function (entry) {
      var candidate = {
        name: sanitizeContactValue(entry.name || ''),
        role: sanitizeContactValue(entry.role || ''),
        phone: sanitizeContactValue(entry.phone || ''),
        email: sanitizeContactValue(entry.email || ''),
        website: sanitizeContactValue(entry.website || entry.url || ''),
        avatar: entry.avatar && entry.avatar.startsWith('data:') ? entry.avatar : ''
      };
      var existing = contactsCache.find(function (contact) {
        if (candidate.email && contact.email && candidate.email.toLowerCase() === contact.email.toLowerCase()) return true;
        if (candidate.phone && contact.phone) {
          var normalizedCandidate = candidate.phone.replace(/\D+/g, '');
          var normalizedExisting = contact.phone.replace(/\D+/g, '');
          if (normalizedCandidate && normalizedExisting && normalizedCandidate === normalizedExisting) return true;
        }
        if (candidate.name && contact.name && candidate.name.toLowerCase() === contact.name.toLowerCase()) return true;
        if (candidate.website && contact.website && candidate.website.toLowerCase() === contact.website.toLowerCase()) return true;
        return false;
      });
      if (existing) {
        if (candidate.name) existing.name = candidate.name;
        if (candidate.role) existing.role = candidate.role;
        if (candidate.phone) existing.phone = candidate.phone;
        if (candidate.email) existing.email = candidate.email;
        if (candidate.website) existing.website = candidate.website;
        if (candidate.avatar) existing.avatar = candidate.avatar;
        existing.updatedAt = Date.now();
        updated += 1;
        updateCrewRowsForContact(existing);
      } else {
        var contact = normalizeContactEntry({
          id: generateContactId(),
          name: candidate.name,
          role: candidate.role,
          phone: candidate.phone,
          email: candidate.email,
          website: candidate.website,
          avatar: candidate.avatar,
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
        contactsCache.push(contact);
        added += 1;
      }
    });
    contactsCache = sortContacts(contactsCache);
    saveContactsToStorage(contactsCache);
    renderContactsList();
    updateContactPickers();
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
    avatarButton.innerHTML = iconMarkup(ICON_GLYPHS.camera, 'btn-icon avatar-change-icon');
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
    setButtonLabelWithIcon(useButton, getContactsText('useInProject', 'Add to project crew'), ICON_GLYPHS.add);
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
    setButtonLabelWithIcon(deleteButton, getContactsText('deleteContact', 'Delete contact'), ICON_GLYPHS.trash);
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
      var _ref45 = avatarInput.files || [],
        _ref46 = _slicedToArray(_ref45, 1),
        file = _ref46[0];
      if (!file) return;
      readAvatarFile(file, function (dataUrl) {
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
    var _ref47 = options || {},
      _ref47$focusContactId = _ref47.focusContactId,
      focusContactId = _ref47$focusContactId === void 0 ? null : _ref47$focusContactId;
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
  function initializeContactsModule() {
    var _avatarOptionsCloseBu, _avatarOptionsForm, _avatarOptionsDialog, _avatarOptionsDialog2, _avatarOptionsDeleteB, _avatarOptionsChangeB, _avatarOptionsEditBut, _avatarEditCancelButt, _avatarEditApplyButto, _avatarEditZoomInput, _avatarEditZoomInput2, _avatarEditViewport, _avatarEditViewport2, _avatarEditViewport3, _avatarEditViewport4, _avatarEditViewport5, _contactsCloseButton, _contactsForm, _contactsDialog, _openContactsBtn;
    resolveContactsDomRefs();
    if (contactsInitialized) return;
    contactsInitialized = true;
    contactsCache = loadStoredContacts();
    loadUserProfileState();
    renderContactsList();
    updateContactPickers();
    applyUserProfileToDom();
    if (userProfileNameInput) {
      userProfileNameInput.addEventListener('input', handleUserProfileNameInput);
      userProfileNameInput.addEventListener('blur', handleUserProfileFieldBlur);
    }
    if (userProfileRoleInput) {
      userProfileRoleInput.addEventListener('input', handleUserProfileRoleInput);
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
        var _ref48 = contactsImportInput.files || [],
          _ref49 = _slicedToArray(_ref48, 1),
          file = _ref49[0];
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
    (_avatarOptionsDeleteB = avatarOptionsDeleteButton) === null || _avatarOptionsDeleteB === void 0 || _avatarOptionsDeleteB.addEventListener('click', handleAvatarDeleteAction);
    (_avatarOptionsChangeB = avatarOptionsChangeButton) === null || _avatarOptionsChangeB === void 0 || _avatarOptionsChangeB.addEventListener('click', handleAvatarChangeAction);
    (_avatarOptionsEditBut = avatarOptionsEditButton) === null || _avatarOptionsEditBut === void 0 || _avatarOptionsEditBut.addEventListener('click', handleAvatarEditAction);
    (_avatarEditCancelButt = avatarEditCancelButton) === null || _avatarEditCancelButt === void 0 || _avatarEditCancelButt.addEventListener('click', handleAvatarEditCancel);
    (_avatarEditApplyButto = avatarEditApplyButton) === null || _avatarEditApplyButto === void 0 || _avatarEditApplyButto.addEventListener('click', applyAvatarEditChanges);
    (_avatarEditZoomInput = avatarEditZoomInput) === null || _avatarEditZoomInput === void 0 || _avatarEditZoomInput.addEventListener('input', handleAvatarEditZoomInputChange);
    (_avatarEditZoomInput2 = avatarEditZoomInput) === null || _avatarEditZoomInput2 === void 0 || _avatarEditZoomInput2.addEventListener('change', handleAvatarEditZoomInputChange);
    (_avatarEditViewport = avatarEditViewport) === null || _avatarEditViewport === void 0 || _avatarEditViewport.addEventListener('pointerdown', handleAvatarEditPointerDown);
    (_avatarEditViewport2 = avatarEditViewport) === null || _avatarEditViewport2 === void 0 || _avatarEditViewport2.addEventListener('pointermove', handleAvatarEditPointerMove);
    (_avatarEditViewport3 = avatarEditViewport) === null || _avatarEditViewport3 === void 0 || _avatarEditViewport3.addEventListener('pointerup', handleAvatarEditPointerUp);
    (_avatarEditViewport4 = avatarEditViewport) === null || _avatarEditViewport4 === void 0 || _avatarEditViewport4.addEventListener('pointercancel', handleAvatarEditPointerCancel);
    (_avatarEditViewport5 = avatarEditViewport) === null || _avatarEditViewport5 === void 0 || _avatarEditViewport5.addEventListener('keydown', handleAvatarEditKeyDown);
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
    (_openContactsBtn = openContactsBtn) === null || _openContactsBtn === void 0 || _openContactsBtn.addEventListener('click', function (event) {
      event.preventDefault();
      openDialog(contactsDialog);
    });
  }
  function createCrewRow() {
    var _texts$en268, _texts$currentLang2, _texts$currentLang3, _texts$en269, _texts$currentLang4, _texts$en270, _texts$currentLang5, _texts$en271;
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (!crewContainer) return;
    var row = document.createElement('div');
    row.className = 'person-row';
    var documentLang = '';
    if (typeof document !== 'undefined' && document && document.documentElement) {
      documentLang = document.documentElement.lang || '';
    }
    var rowLanguage = documentLang || currentLang || DEFAULT_LANGUAGE;
    var rowDirection = resolveDocumentDirection(rowLanguage);
    applyLocaleMetadata(row, rowLanguage, rowDirection);
    var fallbackProjectForm = ((_texts$en268 = texts.en) === null || _texts$en268 === void 0 ? void 0 : _texts$en268.projectForm) || {};
    var projectFormTexts = ((_texts$currentLang2 = texts[currentLang]) === null || _texts$currentLang2 === void 0 ? void 0 : _texts$currentLang2.projectForm) || fallbackProjectForm;
    var roleLabels = ((_texts$currentLang3 = texts[currentLang]) === null || _texts$currentLang3 === void 0 ? void 0 : _texts$currentLang3.crewRoles) || ((_texts$en269 = texts.en) === null || _texts$en269 === void 0 ? void 0 : _texts$en269.crewRoles) || {};
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
    avatarButton.innerHTML = iconMarkup(ICON_GLYPHS.camera, 'btn-icon avatar-change-icon');
    avatarContainer.appendChild(avatarButton);
    var avatarFileInput = document.createElement('input');
    avatarFileInput.type = 'file';
    avatarFileInput.accept = 'image/*';
    avatarFileInput.className = 'visually-hidden';
    avatarFileInput.tabIndex = -1;
    avatarContainer.appendChild(avatarFileInput);
    var roleSel = document.createElement('select');
    roleSel.name = 'crewRole';
    roleSel.className = 'person-role-select';
    applyLocaleMetadata(roleSel, rowLanguage, rowDirection);
    crewRoles.forEach(function (r) {
      var opt = document.createElement('option');
      opt.value = r;
      opt.textContent = roleLabels[r] || r;
      applyLocaleMetadata(opt, rowLanguage, rowDirection);
      roleSel.appendChild(opt);
    });
    if (data.role && !crewRoles.includes(data.role)) {
      var opt = document.createElement('option');
      opt.value = data.role;
      opt.textContent = roleLabels[data.role] || data.role;
      applyLocaleMetadata(opt, rowLanguage, rowDirection);
      roleSel.appendChild(opt);
    }
    if (data.role) roleSel.value = data.role;
    var nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'crewName';
    nameInput.className = 'person-name';
    nameInput.placeholder = projectFormTexts.crewNamePlaceholder || fallbackProjectForm.crewNamePlaceholder || 'Name';
    nameInput.value = data.name || '';
    applyLocaleMetadata(nameInput, rowLanguage, rowDirection);
    var phoneInput = document.createElement('input');
    phoneInput.type = 'tel';
    phoneInput.name = 'crewPhone';
    phoneInput.className = 'person-phone';
    phoneInput.placeholder = projectFormTexts.crewPhonePlaceholder || fallbackProjectForm.crewPhonePlaceholder || 'Phone';
    phoneInput.value = data.phone || '';
    applyLocaleMetadata(phoneInput, rowLanguage, rowDirection);
    var emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'crewEmail';
    emailInput.className = 'person-email';
    emailInput.placeholder = projectFormTexts.crewEmailPlaceholder || fallbackProjectForm.crewEmailPlaceholder || 'Email';
    emailInput.value = data.email || '';
    applyLocaleMetadata(emailInput, rowLanguage, rowDirection);
    var websiteInput = document.createElement('input');
    websiteInput.type = 'url';
    websiteInput.name = 'crewWebsite';
    websiteInput.className = 'person-website';
    websiteInput.placeholder = projectFormTexts.crewWebsitePlaceholder || fallbackProjectForm.crewWebsitePlaceholder || 'Website';
    websiteInput.value = data.website || '';
    applyLocaleMetadata(websiteInput, rowLanguage, rowDirection);
    var contactSelect = document.createElement('select');
    contactSelect.className = 'person-contact-select';
    applyLocaleMetadata(contactSelect, rowLanguage, rowDirection);
    setContactSelectOptions(contactSelect, data.contactId);
    var roleLabel = createHiddenLabel(ensureElementId(roleSel, crewRoleLabelText), crewRoleLabelText);
    var nameLabel = createHiddenLabel(ensureElementId(nameInput, crewNameLabelText), crewNameLabelText);
    var phoneLabel = createHiddenLabel(ensureElementId(phoneInput, crewPhoneLabelText), crewPhoneLabelText);
    var emailLabel = createHiddenLabel(ensureElementId(emailInput, crewEmailLabelText), crewEmailLabelText);
    var websiteLabel = createHiddenLabel(ensureElementId(websiteInput, crewWebsiteLabelText), crewWebsiteLabelText);
    var contactLabel = createHiddenLabel(ensureElementId(contactSelect, crewContactLabelText), crewContactLabelText);
    var linkedBadge = document.createElement('span');
    linkedBadge.className = 'person-linked-badge';
    linkedBadge.textContent = getContactsText('linkedBadge', 'Linked to contact');
    linkedBadge.hidden = true;
    var saveContactBtn = document.createElement('button');
    saveContactBtn.type = 'button';
    saveContactBtn.className = 'person-save-contact';
    setButtonLabelWithIcon(saveContactBtn, getContactsText('saveContact', 'Save to contacts'), ICON_GLYPHS.save);
    saveContactBtn.addEventListener('click', function () {
      return saveCrewRowAsContact(row);
    });
    var manageContactsBtn = document.createElement('button');
    manageContactsBtn.type = 'button';
    manageContactsBtn.className = 'person-manage-contacts';
    setButtonLabelWithIcon(manageContactsBtn, getContactsText('openManager', 'Open contacts'), ICON_GLYPHS.gears);
    manageContactsBtn.addEventListener('click', function () {
      return openDialog(contactsDialog);
    });
    var removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'person-remove-btn';
    var removeBase = ((_texts$currentLang4 = texts[currentLang]) === null || _texts$currentLang4 === void 0 || (_texts$currentLang4 = _texts$currentLang4.projectForm) === null || _texts$currentLang4 === void 0 ? void 0 : _texts$currentLang4.removeEntry) || ((_texts$en270 = texts.en) === null || _texts$en270 === void 0 || (_texts$en270 = _texts$en270.projectForm) === null || _texts$en270 === void 0 ? void 0 : _texts$en270.removeEntry) || 'Remove';
    var crewHeading = ((_texts$currentLang5 = texts[currentLang]) === null || _texts$currentLang5 === void 0 || (_texts$currentLang5 = _texts$currentLang5.projectForm) === null || _texts$currentLang5 === void 0 ? void 0 : _texts$currentLang5.crewHeading) || ((_texts$en271 = texts.en) === null || _texts$en271 === void 0 || (_texts$en271 = _texts$en271.projectForm) === null || _texts$en271 === void 0 ? void 0 : _texts$en271.crewHeading) || 'Crew';
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
      var _ref50 = avatarFileInput.files || [],
        _ref51 = _slicedToArray(_ref50, 1),
        file = _ref51[0];
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
    var _texts$currentLang6, _texts$en272, _texts$currentLang7, _texts$en273;
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
    var removeBase = ((_texts$currentLang6 = texts[currentLang]) === null || _texts$currentLang6 === void 0 || (_texts$currentLang6 = _texts$currentLang6.projectForm) === null || _texts$currentLang6 === void 0 ? void 0 : _texts$currentLang6.removeEntry) || ((_texts$en272 = texts.en) === null || _texts$en272 === void 0 || (_texts$en272 = _texts$en272.projectForm) === null || _texts$en272 === void 0 ? void 0 : _texts$en272.removeEntry) || 'Remove';
    var prepLabelText = ((_texts$currentLang7 = texts[currentLang]) === null || _texts$currentLang7 === void 0 || (_texts$currentLang7 = _texts$currentLang7.projectForm) === null || _texts$currentLang7 === void 0 ? void 0 : _texts$currentLang7.prepLabel) || ((_texts$en273 = texts.en) === null || _texts$en273 === void 0 || (_texts$en273 = _texts$en273.projectForm) === null || _texts$en273 === void 0 ? void 0 : _texts$en273.prepLabel) || 'Prep';
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
    var _texts$currentLang8, _texts$en274, _texts$currentLang9, _texts$en275;
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
    var removeBase = ((_texts$currentLang8 = texts[currentLang]) === null || _texts$currentLang8 === void 0 || (_texts$currentLang8 = _texts$currentLang8.projectForm) === null || _texts$currentLang8 === void 0 ? void 0 : _texts$currentLang8.removeEntry) || ((_texts$en274 = texts.en) === null || _texts$en274 === void 0 || (_texts$en274 = _texts$en274.projectForm) === null || _texts$en274 === void 0 ? void 0 : _texts$en274.removeEntry) || 'Remove';
    var shootLabelText = ((_texts$currentLang9 = texts[currentLang]) === null || _texts$currentLang9 === void 0 || (_texts$currentLang9 = _texts$currentLang9.projectForm) === null || _texts$currentLang9 === void 0 ? void 0 : _texts$currentLang9.shootLabel) || ((_texts$en275 = texts.en) === null || _texts$en275 === void 0 || (_texts$en275 = _texts$en275.projectForm) === null || _texts$en275 === void 0 ? void 0 : _texts$en275.shootLabel) || 'Shoot';
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
    var _texts$currentLang0, _texts$en276, _texts$currentLang1, _texts$en277;
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
    var removeBase = ((_texts$currentLang0 = texts[currentLang]) === null || _texts$currentLang0 === void 0 || (_texts$currentLang0 = _texts$currentLang0.projectForm) === null || _texts$currentLang0 === void 0 ? void 0 : _texts$currentLang0.removeEntry) || ((_texts$en276 = texts.en) === null || _texts$en276 === void 0 || (_texts$en276 = _texts$en276.projectForm) === null || _texts$en276 === void 0 ? void 0 : _texts$en276.removeEntry) || 'Remove';
    var returnLabelText = ((_texts$currentLang1 = texts[currentLang]) === null || _texts$currentLang1 === void 0 || (_texts$currentLang1 = _texts$currentLang1.projectForm) === null || _texts$currentLang1 === void 0 ? void 0 : _texts$currentLang1.returnLabel) || ((_texts$en277 = texts.en) === null || _texts$en277 === void 0 || (_texts$en277 = _texts$en277.projectForm) === null || _texts$en277 === void 0 ? void 0 : _texts$en277.returnLabel) || 'Return Day';
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
    var _devices5;
    var entries = [];
    if (!type) return entries;
    var cameraDb = ((_devices5 = devices) === null || _devices5 === void 0 ? void 0 : _devices5.cameras) || {};
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
    var _devices6, _devices7;
    var cameraDb = ((_devices6 = devices) === null || _devices6 === void 0 ? void 0 : _devices6.cameras) || {};
    var mediaDb = ((_devices7 = devices) === null || _devices7 === void 0 || (_devices7 = _devices7.gearList) === null || _devices7 === void 0 ? void 0 : _devices7.media) || {};
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
    Object.entries(cameraDb).forEach(function (_ref52) {
      var _ref53 = _slicedToArray(_ref52, 2),
        name = _ref53[0],
        cam = _ref53[1];
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
      var variantHint = typeof (info === null || info === void 0 ? void 0 : info.model) === 'string' ? info.model : '';
      var match = variantHint.match(/(CFexpress Type [AB](?: \(v\d(?:\.\d)?\))?|CFast 2\.0|microSDXC UHS-I|SDXC UHS-II|SDXC UHS-I|XQD|RED MINI-MAG|Codex Compact Drive)/i);
      if (match) {
        addType(match[0].replace(/\s+/g, ' ').trim());
      }
    });
    return typeOrder.sort(localeSort);
  }
  function getStorageVariantOptions(type) {
    var _devices8;
    var variants = [];
    if (!type) return variants;
    var normalizedType = type.toLowerCase();
    var mediaDb = ((_devices8 = devices) === null || _devices8 === void 0 || (_devices8 = _devices8.gearList) === null || _devices8 === void 0 ? void 0 : _devices8.media) || {};
    var seen = new Set();
    var addVariant = function addVariant(value, label) {
      if (!value || seen.has(value)) return;
      variants.push({
        value: value,
        label: label || value
      });
      seen.add(value);
    };
    Object.entries(mediaDb).forEach(function (_ref54) {
      var _ref55 = _slicedToArray(_ref54, 2),
        name = _ref55[0],
        info = _ref55[1];
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
      var capacityLabel = (info === null || info === void 0 ? void 0 : info.capacityTb) != null ? formatCapacity(info.capacityTb, 'TB') : (info === null || info === void 0 ? void 0 : info.capacityGb) != null ? formatCapacity(info.capacityGb, 'GB') : '';
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
    row.append(quantityLabel, quantityInput, typeLabel, typeSelect, variantLabel, variantSelect, notesLabel, notesInput, removeBtn);
    storageNeedsContainer.appendChild(row);
    updateStorageRequirementTypeOptions();
    if (typeof markProjectFormDataDirty === 'function') {
      markProjectFormDataDirty();
    }
    return row;
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
  if (addStorageNeedBtn) {
    addStorageNeedBtn.addEventListener('click', function () {
      createStorageRequirementRow();
      scheduleProjectAutoSave(true);
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
  var totalPowerElem = document.getElementById("totalPower");
  var totalCurrent144Elem = document.getElementById("totalCurrent144");
  var totalCurrent12Elem = document.getElementById("totalCurrent12");
  var batteryLifeElem = document.getElementById("batteryLife");
  var batteryLifeLabelElem = document.getElementById("batteryLifeLabel");
  var runtimeAverageNoteElem = document.getElementById("runtimeAverageNote");
  var batteryCountElem = document.getElementById("batteryCount");
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
  var powerDiagramElem = document.getElementById("powerDiagram");
  var powerDiagramBarElem = document.getElementById("powerDiagramBar");
  var maxPowerTextElem = document.getElementById("maxPowerText");
  var powerDiagramLegendElem = document.getElementById("powerDiagramLegend");
  var currentPowerWarningKey = '';
  var dismissedPowerWarningKey = '';
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
    var _texts$en278, _texts$en279, _texts$en280;
    if (!powerWarningDialog) return;
    var _ref56 = context || {},
      batteryName = _ref56.batteryName,
      current = _ref56.current,
      hasPinLimit = _ref56.hasPinLimit,
      pinLimit = _ref56.pinLimit,
      hasDtapRating = _ref56.hasDtapRating,
      dtapLimit = _ref56.dtapLimit,
      dtapAllowed = _ref56.dtapAllowed;
    var safeBatteryName = batteryName && batteryName.trim() ? batteryName.trim() : (batterySelect === null || batterySelect === void 0 ? void 0 : batterySelect.value) || '';
    var formattedCurrent = formatCurrentValue(Number(current) || 0);
    var langTexts = texts[currentLang] || texts.en || {};
    var messageTemplate = langTexts.powerWarningMessage || ((_texts$en278 = texts.en) === null || _texts$en278 === void 0 ? void 0 : _texts$en278.powerWarningMessage) || '';
    var message = messageTemplate ? messageTemplate.replace(/\{battery\}/g, safeBatteryName).replace(/\{current\}/g, formattedCurrent) : "".concat(safeBatteryName, " exceeds every available output (").concat(formattedCurrent, "A).");
    if (powerWarningMessageElem) {
      powerWarningMessageElem.textContent = message;
    }
    var pinsDetail = hasPinLimit ? (langTexts.powerWarningPinsDetail || ((_texts$en279 = texts.en) === null || _texts$en279 === void 0 ? void 0 : _texts$en279.powerWarningPinsDetail) || 'Pins limit: {max}A').replace(/\{max\}/g, formatCurrentValue(Number(pinLimit) || 0)) : langTexts.powerWarningPinsUnavailable || ((_texts$en280 = texts.en) === null || _texts$en280 === void 0 ? void 0 : _texts$en280.powerWarningPinsUnavailable) || 'Pins limit unavailable.';
    if (powerWarningPinsDetailElem) {
      powerWarningPinsDetailElem.textContent = pinsDetail;
    }
    var dtapDetail = '';
    if (hasDtapRating && dtapAllowed) {
      var _texts$en281;
      dtapDetail = (langTexts.powerWarningDtapDetail || ((_texts$en281 = texts.en) === null || _texts$en281 === void 0 ? void 0 : _texts$en281.powerWarningDtapDetail) || 'D-Tap limit: {max}A').replace(/\{max\}/g, formatCurrentValue(Number(dtapLimit) || 0));
    } else if (hasDtapRating && !dtapAllowed) {
      var _texts$en282;
      dtapDetail = langTexts.powerWarningDtapBlocked || ((_texts$en282 = texts.en) === null || _texts$en282 === void 0 ? void 0 : _texts$en282.powerWarningDtapBlocked) || 'D-Tap cannot be used with the current configuration.';
    } else {
      var _texts$en283;
      dtapDetail = langTexts.powerWarningDtapUnavailable || ((_texts$en283 = texts.en) === null || _texts$en283 === void 0 ? void 0 : _texts$en283.powerWarningDtapUnavailable) || 'No D-Tap output is available.';
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
    if (!powerDiagramElem || !powerDiagramBarElem || !maxPowerTextElem || !powerDiagramLegendElem) return;
    if (!availableWatt || availableWatt <= 0) {
      powerDiagramElem.classList.add("hidden");
      powerDiagramBarElem.innerHTML = "";
      powerDiagramLegendElem.innerHTML = "";
      maxPowerTextElem.textContent = "";
      setStatusLevel(maxPowerTextElem, null);
      return;
    }
    powerDiagramElem.classList.remove("hidden");
    powerDiagramBarElem.innerHTML = "";
    powerDiagramLegendElem.innerHTML = "";
    var MAX_WIDTH = 300;
    var total = segments.reduce(function (sum, s) {
      return sum + s.power;
    }, 0);
    var scale = MAX_WIDTH / Math.max(availableWatt, total);
    var limitPos = availableWatt * scale;
    segments.forEach(function (seg) {
      var width = seg.power * scale;
      if (width <= 0) return;
      var div = document.createElement("div");
      div.className = "segment ".concat(seg.className);
      div.style.width = "".concat(width, "px");
      div.setAttribute("title", "".concat(seg.label, " ").concat(seg.power.toFixed(1), " W"));
      powerDiagramBarElem.appendChild(div);
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
      over.style.left = "".concat(limitPos, "px");
      powerDiagramBarElem.appendChild(over);
    }
    var limit = document.createElement("div");
    limit.className = "limit-line";
    limit.style.left = "".concat(limitPos, "px");
    if (typeof maxPinA === 'number' && maxPinA > 0) {
      var label = document.createElement("span");
      label.className = "limit-label";
      label.textContent = "".concat(texts[currentLang].pinLabel, " ").concat(maxPinA, " A");
      limit.appendChild(label);
    }
    powerDiagramBarElem.appendChild(limit);
    powerDiagramElem.classList.toggle("over", total > availableWatt);
    maxPowerTextElem.textContent = "".concat(texts[currentLang].availablePowerLabel, " ").concat(availableWatt.toFixed(0), " W");
    setStatusLevel(maxPowerTextElem, total > availableWatt ? 'danger' : null);
  }
  var setupSelect = document.getElementById("setupSelect");
  var setupNameInput = document.getElementById("setupName");
  var saveSetupBtn = document.getElementById("saveSetupBtn");
  var deleteSetupBtn = document.getElementById("deleteSetupBtn");
  var shareSetupBtn = document.getElementById("shareSetupBtn");
  var sharedLinkRow = document.getElementById("sharedLinkRow");
  var sharedLinkInput = document.getElementById("sharedLinkInput");
  var shareLinkMessage = document.getElementById("shareLinkMessage");
  var shareIncludeAutoGearCheckbox = document.getElementById("shareIncludeAutoGear");
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
  if (shareFilenameInput && shareFilenameMessage) {
    shareFilenameInput.setAttribute('aria-describedby', 'shareFilenameMessage');
  }
  var sharedImportDialog = document.getElementById("sharedImportDialog");
  var sharedImportForm = document.getElementById("sharedImportForm");
  var sharedImportDialogHeading = document.getElementById("sharedImportDialogHeading");
  var sharedImportDialogMessage = document.getElementById("sharedImportDialogMessage");
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
    changedDevices: "x",
    feedback: "f",
    autoGearRules: "a",
    autoGearCoverage: "z",
    diagramPositions: "y"
  };
  var sharedKeyMapKeys = Object.keys(sharedKeyMap);
  var sharedHasOwn = Object.prototype.hasOwnProperty;
  var lastSharedSetupData = null;
  var lastSharedAutoGearRules = null;
  var sharedImportPreviousPresetId = '';
  var sharedImportProjectPresetActive = false;
  var sharedImportPreparedForImport = false;
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
    var _texts$en284, _texts$en285;
    var langTexts = texts[currentLang] || texts.en || {};
    var fallback = langTexts.sharedImportAutoGearPresetFallback || ((_texts$en284 = texts.en) === null || _texts$en284 === void 0 ? void 0 : _texts$en284.sharedImportAutoGearPresetFallback) || 'Shared automatic gear rules';
    var projectName = getSharedImportProjectName(sharedData);
    if (!projectName) {
      return fallback;
    }
    var template = langTexts.sharedImportAutoGearPresetName || ((_texts$en285 = texts.en) === null || _texts$en285 === void 0 ? void 0 : _texts$en285.sharedImportAutoGearPresetName) || '%s';
    if (template.includes('%s')) {
      return formatWithPlaceholdersSafe(template, projectName);
    }
    return "".concat(template, " ").concat(projectName).trim();
  }
  function ensureSharedAutoGearPreset(rules, sharedData) {
    var _texts$currentLang10, _texts$en286;
    var normalizedRules = Array.isArray(rules) ? rules.map(normalizeAutoGearRule).filter(Boolean) : [];
    if (!normalizedRules.length) return null;
    var label = getSharedImportPresetLabel(sharedData);
    var fingerprint = createAutoGearRulesFingerprint(normalizedRules);
    var preset = autoGearPresets.find(function (entry) {
      return entry.fingerprint === fingerprint;
    }) || null;
    var fallback = ((_texts$currentLang10 = texts[currentLang]) === null || _texts$currentLang10 === void 0 ? void 0 : _texts$currentLang10.sharedImportAutoGearPresetFallback) || ((_texts$en286 = texts.en) === null || _texts$en286 === void 0 ? void 0 : _texts$en286.sharedImportAutoGearPresetFallback) || 'Shared automatic gear rules';
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
      var _value3 = setup[_key3];
      if (_value3 != null) {
        out[sharedKeyMap[_key3]] = _value3;
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
        var _value4 = setup[_short];
        if (_value4 != null) {
          expanded[_key5] = _value4;
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
        var _value5 = setup[_short2];
        if (_value5 != null) {
          merged[_key6] = _value5;
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
  var deviceManagerPreferredOrder = ["cameras", "viewfinders", "monitors", "video", "wirelessReceivers", "directorMonitors", "iosVideo", "lenses", "fiz.motors", "fiz.controllers", "fiz.handUnits", "fiz.distance", "batteries", "batteryHotswaps", "accessories.batteries", "accessories.powerPlates", "accessories.cables", "accessories.cages", "accessories.cameraSupport", "accessories.cameraStabiliser", "accessories.chargers", "accessories.videoAssist", "accessories.media", "accessories.cardReaders", "accessories.filters", "accessories.matteboxes", "accessories.rigging", "accessories.grip", "accessories.sliders", "accessories.tripodHeads", "accessories.tripods", "accessories.carts"];
  function normalizeCategoryKey(key) {
    var _devices9, _devices0, _devices1;
    if (!key) return null;
    if (key === "accessories" || key === "fiz" || key === "filterOptions") return null;
    if (key.startsWith("accessories.cables.")) return "accessories.cables";
    if (key === "videoAssist" && (_devices9 = devices) !== null && _devices9 !== void 0 && (_devices9 = _devices9.accessories) !== null && _devices9 !== void 0 && _devices9.videoAssist) return "accessories.videoAssist";
    if (key === "media" && (_devices0 = devices) !== null && _devices0 !== void 0 && (_devices0 = _devices0.accessories) !== null && _devices0 !== void 0 && _devices0.media) return "accessories.media";
    if (key === "cardReaders" && (_devices1 = devices) !== null && _devices1 !== void 0 && (_devices1 = _devices1.accessories) !== null && _devices1 !== void 0 && _devices1.cardReaders) return "accessories.cardReaders";
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
      if (!node || _typeof(node) !== 'object') return;
      if (Array.isArray(node.attributes)) {
        addCategory(path.join('.'));
      }
      Object.entries(node).forEach(function (_ref57) {
        var _ref58 = _slicedToArray(_ref57, 2),
          childKey = _ref58[0],
          value = _ref58[1];
        if (childKey === 'attributes') return;
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
      Object.entries(data).forEach(function (_ref59) {
        var _ref60 = _slicedToArray(_ref59, 2),
          key = _ref60[0],
          value = _ref60[1];
        if (key === 'accessories') {
          if (value && _typeof(value) === 'object') {
            Object.entries(value).forEach(function (_ref61) {
              var _ref62 = _slicedToArray(_ref61, 2),
                subKey = _ref62[0],
                subValue = _ref62[1];
              if (subValue && _typeof(subValue) === 'object' && !Array.isArray(subValue)) {
                addCategory("accessories.".concat(subKey));
              }
            });
          }
        } else if (key === 'fiz') {
          if (value && _typeof(value) === 'object') {
            Object.entries(value).forEach(function (_ref63) {
              var _ref64 = _slicedToArray(_ref63, 2),
                subKey = _ref64[0],
                subValue = _ref64[1];
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
    var orderMap = new Map(deviceManagerPreferredOrder.map(function (key, index) {
      return [key, index];
    }));
    sorted.sort(function (a, b) {
      var idxA = orderMap.has(a) ? orderMap.get(a) : deviceManagerPreferredOrder.length;
      var idxB = orderMap.has(b) ? orderMap.get(b) : deviceManagerPreferredOrder.length;
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
    var renameInProgress = Boolean(selectedName && typedName && typedName !== selectedName);
    var storageKey = selectedName || typedName || '';
    return {
      typedName: typedName,
      selectedName: selectedName,
      renameInProgress: renameInProgress,
      storageKey: storageKey
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
  newCategorySelect = document.getElementById("newCategory");
  newSubcategorySelect = document.getElementById("newSubcategory");
  subcategoryFieldDiv = document.getElementById("subcategoryField");
  newNameInput = document.getElementById("newName");
  newWattInput = document.getElementById("newWatt");
  wattFieldDiv = document.getElementById("wattField");
  dynamicFieldsDiv = document.getElementById("dynamicFields");
  cameraFieldsDiv = document.getElementById("cameraFields");
  cameraWattInput = document.getElementById("cameraWatt");
  cameraVoltageInput = document.getElementById("cameraVoltage");
  cameraPortTypeInput = document.getElementById("cameraPortType");
  monitorFieldsDiv = document.getElementById("monitorFields");
  monitorScreenSizeInput = document.getElementById("monitorScreenSize");
  monitorBrightnessInput = document.getElementById("monitorBrightness");
  monitorWattInput = document.getElementById("monitorWatt");
  monitorVoltageInput = document.getElementById("monitorVoltage");
  monitorPortTypeInput = document.getElementById("monitorPortType");
  monitorVideoInputsContainer = document.getElementById("monitorVideoInputsContainer");
  lensFieldsDiv = document.getElementById("lensFields");
  lensMountOptionsContainer = document.getElementById("lensMountOptionsContainer");
  function populateCategoryOptions() {
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
        for (var _i1 = 0, _Object$entries6 = Object.entries(deviceSchema.accessories); _i1 < _Object$entries6.length; _i1++) {
          var _Object$entries6$_i = _slicedToArray(_Object$entries6[_i1], 2),
            _sub = _Object$entries6$_i[0],
            obj = _Object$entries6$_i[1];
          if (_sub === 'cables') {
            addOpt('accessories.cables');
          } else if (obj && obj.attributes) {
            addOpt("accessories.".concat(_sub));
          }
        }
      }
      for (var _i10 = 0, _Object$entries7 = Object.entries(deviceSchema); _i10 < _Object$entries7.length; _i10++) {
        var _Object$entries7$_i = _slicedToArray(_Object$entries7[_i10], 2),
          _key7 = _Object$entries7$_i[0],
          _obj = _Object$entries7$_i[1];
        if (_key7 === 'accessories' || _key7 === 'fiz') continue;
        if (_obj && _obj.attributes) addOpt(_key7);
      }
      if (deviceSchema.fiz) {
        for (var _i11 = 0, _Object$entries8 = Object.entries(deviceSchema.fiz); _i11 < _Object$entries8.length; _i11++) {
          var _Object$entries8$_i = _slicedToArray(_Object$entries8[_i11], 2),
            _sub2 = _Object$entries8$_i[0],
            _obj2 = _Object$entries8$_i[1];
          if (_obj2 && _obj2.attributes) addOpt("fiz.".concat(_sub2));
        }
      }
    }
    if (_typeof(devices) === 'object') {
      var existing = new Set(Array.from(newCategorySelect.options).map(function (o) {
        return o.value;
      }));
      var addIfMissing = function addIfMissing(val) {
        if (!existing.has(val)) {
          addOpt(val);
          existing.add(val);
        }
      };
      for (var _i12 = 0, _Object$entries9 = Object.entries(devices); _i12 < _Object$entries9.length; _i12++) {
        var _Object$entries9$_i = _slicedToArray(_Object$entries9[_i12], 2),
          _key8 = _Object$entries9$_i[0],
          _obj3 = _Object$entries9$_i[1];
        if (_key8 === 'accessories') {
          for (var _i13 = 0, _Object$keys = Object.keys(_obj3 || {}); _i13 < _Object$keys.length; _i13++) {
            var _sub3 = _Object$keys[_i13];
            addIfMissing("accessories.".concat(_sub3));
          }
        } else if (_key8 === 'fiz') {
          for (var _i14 = 0, _Object$keys2 = Object.keys(_obj3 || {}); _i14 < _Object$keys2.length; _i14++) {
            var _sub4 = _Object$keys2[_i14];
            addIfMissing("fiz.".concat(_sub4));
          }
        } else if (_obj3 && _typeof(_obj3) === 'object' && !Array.isArray(_obj3)) {
          addIfMissing(_key8);
        }
      }
    }
    syncDeviceManagerCategories();
  }
  populateCategoryOptions();
  function getCategoryContainer(categoryKey, subcategory) {
    var _ref65 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref65$create = _ref65.create,
      create = _ref65$create === void 0 ? false : _ref65$create;
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
    if (originalCategory === 'accessories.cables' && (_devices$accessories = devices.accessories) !== null && _devices$accessories !== void 0 && _devices$accessories.cables && container && originalSubcategory && !Object.keys(container).length) {
      delete devices.accessories.cables[originalSubcategory];
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
  var videoPowerInput = document.getElementById("videoPower");
  var videoVideoInputsContainer = document.getElementById("videoVideoInputsContainer");
  var videoVideoOutputsContainer = document.getElementById("videoVideoOutputsContainer");
  var videoFrequencyInput = document.getElementById("videoFrequency");
  var videoLatencyInput = document.getElementById("videoLatency");
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
    var isVideoLike = category === "video" || category === "wirelessReceivers" || category === "iosVideo" || data && (data.videoInputs || data.videoOutputs || data.frequency);
    if (isVideoLike) {
      videoFieldsDiv.insertBefore(wattFieldDiv, videoFieldsDiv.firstChild);
    } else {
      addDeviceForm.insertBefore(wattFieldDiv, cameraFieldsDiv);
    }
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
  var batteryPlateRow = document.getElementById("batteryPlateRow");
  var batteryPlateSelect = document.getElementById("batteryPlateSelect");
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
  var categoryExcludedAttrs = {
    batteries: ["capacity", "pinA", "dtapA"],
    batteryHotswaps: ["capacity", "pinA"],
    "accessories.batteries": ["capacity", "pinA"],
    cameras: ["powerDrawWatts", "power", "recordingMedia", "lensMount", "videoOutputs", "fizConnectors", "viewfinder", "timecode"],
    lenses: ["mount", "mountOptions", "focusScale"],
    monitors: ["screenSizeInches", "brightnessNits", "power", "powerDrawWatts", "videoInputs", "videoOutputs", "wirelessTx", "latencyMs", "audioOutput"],
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
    var _ref66 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref66$preserveValue = _ref66.preserveValue,
      preserveValue = _ref66$preserveValue === void 0 ? true : _ref66$preserveValue;
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
      var _label72 = document.createElement('label');
      _label72.setAttribute('for', attrId);
      _label72.textContent = labelText;
      _row.appendChild(_label72);
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
    if (inputType === 'list' || inputType === 'json' || inputType === 'textarea') {
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
    control.dataset.attrType = inputType;
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
      var _help39 = document.createElement('p');
      _help39.className = 'schema-field-help';
      _help39.textContent = config.help;
      controlContainer.appendChild(_help39);
    }
    row.appendChild(controlContainer);
    return row;
  }
  function getSchemaAttributesForCategory(category) {
    if (!deviceSchema) return [];
    var parts = category.split('.');
    var node = deviceSchema;
    var _iterator11 = _createForOfIteratorHelper(parts),
      _step11;
    try {
      for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
        var p = _step11.value;
        node = node && node[p];
        if (!node) return [];
      }
    } catch (err) {
      _iterator11.e(err);
    } finally {
      _iterator11.f();
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
    var _iterator12 = _createForOfIteratorHelper(getSchemaAttributesForCategory(category)),
      _step12;
    try {
      for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
        var attr = _step12.value;
        if (skip(attr)) continue;
        seen.add(attr);
        attrs.push(attr);
      }
    } catch (err) {
      _iterator12.e(err);
    } finally {
      _iterator12.f();
    }
    if (data && _typeof(data) === 'object' && !Array.isArray(data)) {
      for (var _i15 = 0, _Object$keys3 = Object.keys(data); _i15 < _Object$keys3.length; _i15++) {
        var _key0 = _Object$keys3[_i15];
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
    var _iterator13 = _createForOfIteratorHelper(attrs),
      _step13;
    try {
      for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
        var attr = _step13.value;
        var _value6 = data && data[attr] !== undefined ? data[attr] : undefined;
        list.appendChild(createSchemaField(category, attr, _value6));
      }
    } catch (err) {
      _iterator13.e(err);
    } finally {
      _iterator13.f();
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
    if (dynamicFieldsDiv && dynamicFieldsDiv.dataset && dynamicFieldsDiv.dataset.attrs) {
      try {
        var parsed = JSON.parse(dynamicFieldsDiv.dataset.attrs);
        if (Array.isArray(parsed)) {
          attrs = parsed;
        }
      } catch (err) {
        console.warn('Failed to parse dynamic field attributes', err);
      }
    }
    if (!attrs.length) {
      attrs = getCombinedCategoryAttributes(category, {}, exclude);
    }
    var filteredAttrs = attrs.filter(function (attr) {
      return !exclude.includes(attr);
    });
    var result = {};
    var _iterator14 = _createForOfIteratorHelper(filteredAttrs),
      _step14;
    try {
      for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
        var attr = _step14.value;
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
          var list = el.value.split('\n').map(function (item) {
            return item.trim();
          }).filter(Boolean);
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
            } catch (_unused3) {
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
      _iterator14.e(err);
    } finally {
      _iterator14.f();
    }
    markCollectedDynamicAttributes(result, filteredAttrs);
    return result;
  }
  function applyDynamicFieldValues(target, category) {
    var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    if (!target) {
      return {};
    }
    var values = collectDynamicFieldValues(category, exclude);
    Object.assign(target, values);
    var attrs = getCollectedDynamicAttributes(values);
    removeClearedDynamicAttributes(target, attrs, values);
    return values;
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
  var installPromptBanner = document.getElementById("installPromptBanner");
  var installPromptBannerText = document.getElementById("installPromptBannerText");
  var installPromptBannerAction = document.getElementById("installPromptBannerAction");
  var installPromptBannerIcon = document.getElementById("installPromptBannerIcon");
  var installPromptBannerDismiss = document.getElementById("installPromptBannerDismiss");
  var installGuideDialog = document.getElementById("installGuideDialog");
  var installGuideTitle = document.getElementById("installGuideTitle");
  var installGuideIntro = document.getElementById("installGuideIntro");
  var installGuideSteps = document.getElementById("installGuideSteps");
  var installGuideNote = document.getElementById("installGuideNote");
  var installGuideMigration = document.getElementById("installGuideMigration");
  var installGuideMigrationTitle = document.getElementById("installGuideMigrationTitle");
  var installGuideMigrationIntro = document.getElementById("installGuideMigrationIntro");
  var installGuideMigrationSteps = document.getElementById("installGuideMigrationSteps");
  var installGuideMigrationNote = document.getElementById("installGuideMigrationNote");
  var installGuideClose = document.getElementById("installGuideClose");
  var iosPwaHelpDialog = document.getElementById("iosPwaHelpDialog");
  var iosPwaHelpTitle = document.getElementById("iosPwaHelpTitle");
  var iosPwaHelpIntro = document.getElementById("iosPwaHelpIntro");
  var iosPwaHelpStep1 = document.getElementById("iosPwaHelpStep1");
  mountVoltageSectionElem = document.getElementById('mountVoltageSettings');
  mountVoltageHeadingElem = document.getElementById('mountVoltageHeading');
  mountVoltageDescriptionElem = document.getElementById('mountVoltageDescription');
  mountVoltageNoteElem = document.getElementById('mountVoltageNote');
  mountVoltageResetButton = document.getElementById('mountVoltageReset');
  syncMountVoltageResetButtonGlobal(mountVoltageResetButton);
  mountVoltageTitleElems = {
    V: document.getElementById('mountVoltageVTitle'),
    Gold: document.getElementById('mountVoltageGoldTitle'),
    B: document.getElementById('mountVoltageBTitle')
  };
  mountVoltageInputs = {
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
  updateMountVoltageInputsFromState();
  updateMountVoltageSettingLabels(currentLang);
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
    if (!installGuideDialog) return;
    currentInstallGuidePlatform = platform;
    lastActiveBeforeInstallGuide = document.activeElement;
    renderInstallGuideContent(platform);
    installGuideDialog.removeAttribute('hidden');
    var focusTarget = installGuideClose || installGuideDialog.querySelector('button, [href], [tabindex]:not([tabindex="-1"])');
    if (focusTarget && typeof focusTarget.focus === 'function') {
      try {
        focusTarget.focus();
      } catch (_unused4) {
        focusTarget.focus();
      }
    }
  }
  function closeInstallGuide() {
    if (!installGuideDialog) return;
    installGuideDialog.setAttribute('hidden', '');
    currentInstallGuidePlatform = null;
    if (lastActiveBeforeInstallGuide && typeof lastActiveBeforeInstallGuide.focus === 'function') {
      try {
        lastActiveBeforeInstallGuide.focus();
      } catch (_unused5) {
        lastActiveBeforeInstallGuide.focus();
      }
    }
  }
  function setupInstallBanner() {
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
      if (typeof setButtonLabelWithIcon === 'function') {
        setButtonLabelWithIcon(installPromptBannerDismiss, '', ICON_GLYPHS.circleX);
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
      if (closeLabel && typeof setButtonLabelWithIcon === 'function') {
        setButtonLabelWithIcon(installGuideClose, closeLabel, ICON_GLYPHS.circleX);
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
      } catch (_unused6) {
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
      } catch (_unused7) {
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
    } catch (_unused8) {
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
      } catch (_unused9) {
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
      } catch (_unused0) {
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
  settingsTabIconAssignments.forEach(function (_ref67) {
    var _button$querySelector4;
    var _ref68 = _slicedToArray(_ref67, 2),
      button = _ref68[0],
      glyph = _ref68[1];
    if (!button || !glyph) return;
    var iconElement = (_button$querySelector4 = button.querySelector) === null || _button$querySelector4 === void 0 ? void 0 : _button$querySelector4.call(button, '.settings-tab-icon');
    if (!iconElement) return;
    applyIconGlyph(iconElement, glyph);
    iconElement.setAttribute('aria-hidden', 'true');
  });
  var generalSettingsHeading = document.getElementById('generalSettingsHeading');
  var generalLanguageHeading = document.getElementById('generalLanguageHeading');
  var generalAppearanceHeading = document.getElementById('generalAppearanceHeading');
  var generalTypographyHeading = document.getElementById('generalTypographyHeading');
  var generalBrandingHeading = document.getElementById('generalBrandingHeading');
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
    var _ref69 = options || {},
      _ref69$focusTab = _ref69.focusTab,
      focusTab = _ref69$focusTab === void 0 ? false : _ref69$focusTab;
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
        } catch (_unused1) {
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
      } catch (_unused10) {
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
        } catch (_unused11) {
          backupButton.focus();
        }
      }
    });
  }
  var autoGearConditionConfigs = AUTO_GEAR_CONDITION_KEYS.reduce(function (acc, key) {
    var section = autoGearConditionSections[key] || null;
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
  var createDeferredAutoGearRefresher = function createDeferredAutoGearRefresher(functionName) {
    return function (selected) {
      return callCoreFunctionIfAvailable(functionName, [selected], {
        defer: true
      });
    };
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
    var _texts$currentLang11, _texts$en287;
    if (!autoGearConditionSelect) return;
    var previousValue = autoGearConditionSelect.value || '';
    var placeholderLabel = ((_texts$currentLang11 = texts[currentLang]) === null || _texts$currentLang11 === void 0 ? void 0 : _texts$currentLang11.autoGearConditionPlaceholder) || ((_texts$en287 = texts.en) === null || _texts$en287 === void 0 ? void 0 : _texts$en287.autoGearConditionPlaceholder) || 'Choose a condition';
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
  function focusAutoGearConditionPicker() {
    if (autoGearConditionSelect) {
      try {
        autoGearConditionSelect.focus({
          preventScroll: true
        });
      } catch (_unused12) {
        autoGearConditionSelect.focus();
      }
    }
  }
  function focusAutoGearConditionSection(key) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var config = getAutoGearConditionConfig(key);
    if (!config || !config.section) {
      return;
    }
    var section = config.section,
      select = config.select;
    var _ref70 = options || {},
      _ref70$flash = _ref70.flash,
      flash = _ref70$flash === void 0 ? false : _ref70$flash;
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
    } catch (_unused13) {
      target.focus();
    }
  }
  function notifyAutoGearConditionRepeat(key) {
    var _texts$currentLang12, _texts$en288;
    if (typeof showNotification !== 'function') {
      return;
    }
    var template = ((_texts$currentLang12 = texts[currentLang]) === null || _texts$currentLang12 === void 0 ? void 0 : _texts$currentLang12.autoGearConditionRepeatHint) || ((_texts$en288 = texts.en) === null || _texts$en288 === void 0 ? void 0 : _texts$en288.autoGearConditionRepeatHint) || '';
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
  function configureAutoGearConditionButtons() {
    var _texts$currentLang13, _texts$en289, _texts$currentLang14, _texts$en290;
    var addLabel = ((_texts$currentLang13 = texts[currentLang]) === null || _texts$currentLang13 === void 0 ? void 0 : _texts$currentLang13.autoGearConditionAddShortcut) || ((_texts$en289 = texts.en) === null || _texts$en289 === void 0 ? void 0 : _texts$en289.autoGearConditionAddShortcut) || 'Add another condition';
    var removeLabel = ((_texts$currentLang14 = texts[currentLang]) === null || _texts$currentLang14 === void 0 ? void 0 : _texts$currentLang14.autoGearConditionRemove) || ((_texts$en290 = texts.en) === null || _texts$en290 === void 0 ? void 0 : _texts$en290.autoGearConditionRemove) || 'Remove this condition';
    AUTO_GEAR_CONDITION_KEYS.forEach(function (key) {
      var config = getAutoGearConditionConfig(key);
      if (!config) return;
      if (config.addShortcut) {
        setButtonLabelWithIcon(config.addShortcut, '', ICON_GLYPHS.add);
        config.addShortcut.setAttribute('aria-label', addLabel);
        config.addShortcut.setAttribute('title', addLabel);
        config.addShortcut.setAttribute('data-help', addLabel);
      }
      if (config.removeButton) {
        setButtonLabelWithIcon(config.removeButton, '', ICON_GLYPHS.minus);
        config.removeButton.setAttribute('aria-label', removeLabel);
        config.removeButton.setAttribute('title', removeLabel);
        config.removeButton.setAttribute('data-help', removeLabel);
      }
    });
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
        } catch (_unused14) {
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
      } catch (_unused15) {
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
    var _ref71 = options || {},
      _ref71$preserveDraft = _ref71.preserveDraft,
      preserveDraft = _ref71$preserveDraft === void 0 ? false : _ref71$preserveDraft;
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
  Object.entries(autoGearConditionLogicSelects).forEach(function (_ref72) {
    var _ref73 = _slicedToArray(_ref72, 2),
      key = _ref73[0],
      select = _ref73[1];
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
        } catch (_unused16) {
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
        } catch (_unused17) {
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
    var _ref74 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      fallback = _ref74.fallback,
      _ref74$minRows = _ref74.minRows,
      minRows = _ref74$minRows === void 0 ? AUTO_GEAR_MULTI_SELECT_MIN_ROWS : _ref74$minRows,
      _ref74$maxRows = _ref74.maxRows,
      maxRows = _ref74$maxRows === void 0 ? AUTO_GEAR_MULTI_SELECT_MAX_ROWS : _ref74$maxRows;
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
      } catch (_unused18) {
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
      var _texts$currentLang15, _texts$en291;
      haystack.push('always');
      var alwaysText = ((_texts$currentLang15 = texts[currentLang]) === null || _texts$currentLang15 === void 0 ? void 0 : _texts$currentLang15.autoGearAlwaysMeta) || ((_texts$en291 = texts.en) === null || _texts$en291 === void 0 ? void 0 : _texts$en291.autoGearAlwaysMeta) || 'Always active';
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
      var _texts$currentLang16, _texts$en292, _texts$currentLang17, _texts$en293, _texts$currentLang18, _texts$en294, _texts$currentLang19, _texts$en295;
      var shootingLabel = ((_texts$currentLang16 = texts[currentLang]) === null || _texts$currentLang16 === void 0 ? void 0 : _texts$currentLang16.autoGearShootingDaysLabel) || ((_texts$en292 = texts.en) === null || _texts$en292 === void 0 ? void 0 : _texts$en292.autoGearShootingDaysLabel) || 'Shooting days condition';
      var minimumLabel = ((_texts$currentLang17 = texts[currentLang]) === null || _texts$currentLang17 === void 0 ? void 0 : _texts$currentLang17.autoGearShootingDaysModeMinimum) || ((_texts$en293 = texts.en) === null || _texts$en293 === void 0 ? void 0 : _texts$en293.autoGearShootingDaysModeMinimum) || 'Minimum';
      var maximumLabel = ((_texts$currentLang18 = texts[currentLang]) === null || _texts$currentLang18 === void 0 ? void 0 : _texts$currentLang18.autoGearShootingDaysModeMaximum) || ((_texts$en294 = texts.en) === null || _texts$en294 === void 0 ? void 0 : _texts$en294.autoGearShootingDaysModeMaximum) || 'Maximum';
      var everyLabel = ((_texts$currentLang19 = texts[currentLang]) === null || _texts$currentLang19 === void 0 ? void 0 : _texts$currentLang19.autoGearShootingDaysModeEvery) || ((_texts$en295 = texts.en) === null || _texts$en295 === void 0 ? void 0 : _texts$en295.autoGearShootingDaysModeEvery) || 'Every';
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
      getAutoGearScenarioFallbackOptions().forEach(function (_ref75) {
        var value = _ref75.value,
          label = _ref75.label;
        if (!options.has(value)) {
          options.set(value, label);
        }
      });
    }
    return Array.from(options.entries()).map(function (_ref76) {
      var _ref77 = _slicedToArray(_ref76, 2),
        value = _ref77[0],
        label = _ref77[1];
      return {
        value: value,
        label: label
      };
    }).sort(function (a, b) {
      return localeSort(a.label, b.label);
    });
  }
  function refreshAutoGearScenarioFilterOptions(rules) {
    var _texts$currentLang20, _texts$en296;
    if (!autoGearFilterScenarioSelect) return autoGearScenarioFilter;
    var options = collectAutoGearScenarioFilterOptions(rules);
    var anyLabel = ((_texts$currentLang20 = texts[currentLang]) === null || _texts$currentLang20 === void 0 ? void 0 : _texts$currentLang20.autoGearFilterScenarioAny) || ((_texts$en296 = texts.en) === null || _texts$en296 === void 0 ? void 0 : _texts$en296.autoGearFilterScenarioAny) || 'All scenarios';
    autoGearFilterScenarioSelect.innerHTML = '';
    var anyOption = document.createElement('option');
    anyOption.value = 'all';
    anyOption.textContent = anyLabel;
    autoGearFilterScenarioSelect.appendChild(anyOption);
    options.forEach(function (_ref78) {
      var value = _ref78.value,
        label = _ref78.label;
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
  function refreshAutoGearShootingDaysValue(selected) {
    if (!autoGearShootingDaysInput) return;
    var condition = function () {
      if (selected && _typeof(selected) === 'object' && !Array.isArray(selected)) {
        return normalizeAutoGearShootingDaysCondition(selected);
      }
      if (Array.isArray(selected) && selected.length) {
        return normalizeAutoGearShootingDaysCondition({
          mode: 'minimum',
          value: selected[0]
        });
      }
      if (autoGearEditorDraft !== null && autoGearEditorDraft !== void 0 && autoGearEditorDraft.shootingDays) {
        return normalizeAutoGearShootingDaysCondition(autoGearEditorDraft.shootingDays);
      }
      return null;
    }();
    var mode = condition ? condition.mode : 'minimum';
    if (autoGearShootingDaysMode) {
      autoGearShootingDaysMode.value = AUTO_GEAR_SHOOTING_DAY_MODES.has(mode) ? mode : 'minimum';
    }
    var value = condition ? condition.value : '';
    autoGearShootingDaysInput.value = value ? String(value) : '';
  }
  function refreshAutoGearScenarioOptions(selected) {
    if (!autoGearScenariosSelect) return;
    var candidateValues = Array.isArray(selected) ? selected : typeof selected === 'string' && selected ? [selected] : Array.isArray(autoGearEditorDraft === null || autoGearEditorDraft === void 0 ? void 0 : autoGearEditorDraft.scenarios) ? autoGearEditorDraft.scenarios : [];
    var selectedValues = Array.from(new Set(candidateValues.filter(function (value) {
      return typeof value === 'string';
    }).map(function (value) {
      return value.trim();
    }).filter(Boolean)));
    autoGearScenariosSelect.innerHTML = '';
    autoGearScenariosSelect.multiple = true;
    var source = document.getElementById('requiredScenarios');
    var hasOptions = false;
    if (source) {
      Array.from(source.options).forEach(function (opt) {
        if (!opt.value) return;
        var option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.textContent;
        if (selectedValues.includes(opt.value)) {
          option.selected = true;
        }
        autoGearScenariosSelect.appendChild(option);
        hasOptions = true;
      });
    }
    if (!hasOptions) {
      var _texts$currentLang21, _texts$en297;
      var placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = ((_texts$currentLang21 = texts[currentLang]) === null || _texts$currentLang21 === void 0 ? void 0 : _texts$currentLang21.autoGearScenarioPlaceholder) || ((_texts$en297 = texts.en) === null || _texts$en297 === void 0 ? void 0 : _texts$en297.autoGearScenarioPlaceholder) || 'Select scenarios';
      placeholder.disabled = true;
      placeholder.selected = true;
      autoGearScenariosSelect.appendChild(placeholder);
    } else {
      selectedValues.forEach(function (value) {
        var exists = Array.from(autoGearScenariosSelect.options || []).some(function (option) {
          return option && option.value === value;
        });
        if (!exists) {
          var fallbackOption = document.createElement('option');
          fallbackOption.value = value;
          fallbackOption.textContent = value;
          fallbackOption.selected = true;
          autoGearScenariosSelect.appendChild(fallbackOption);
        }
      });
    }
    var selectableOptions = Array.from(autoGearScenariosSelect.options || []).filter(function (option) {
      return !option.disabled;
    });
    autoGearScenariosSelect.size = computeAutoGearMultiSelectSize(selectableOptions.length, {
      minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS
    });
    applyAutoGearScenarioSettings(selectedValues);
  }
  function getAutoGearScenarioSelectedValues() {
    if (!autoGearScenariosSelect) return [];
    return Array.from(autoGearScenariosSelect.selectedOptions || []).map(function (option) {
      return option ? option.value : '';
    }).filter(function (value) {
      return typeof value === 'string' && value.trim();
    });
  }
  function applyAutoGearScenarioSettings(selectedValues) {
    var _autoGearScenarioMode;
    var values = Array.isArray(selectedValues) ? selectedValues.filter(function (value) {
      return typeof value === 'string' && value.trim();
    }) : [];
    var uniqueValues = Array.from(new Set(values));
    var desiredMode = autoGearEditorDraft ? normalizeAutoGearScenarioLogic(autoGearEditorDraft.scenarioLogic) : normalizeAutoGearScenarioLogic((_autoGearScenarioMode = autoGearScenarioModeSelectElement) === null || _autoGearScenarioMode === void 0 ? void 0 : _autoGearScenarioMode.value);
    if (autoGearScenarioModeSelectElement) {
      var _texts$currentLang22, _texts$en298, _texts$currentLang23, _texts$en299, _texts$currentLang24, _texts$en300;
      var modeLabels = {
        all: ((_texts$currentLang22 = texts[currentLang]) === null || _texts$currentLang22 === void 0 ? void 0 : _texts$currentLang22.autoGearScenarioModeAll) || ((_texts$en298 = texts.en) === null || _texts$en298 === void 0 ? void 0 : _texts$en298.autoGearScenarioModeAll) || 'Require every selected scenario',
        any: ((_texts$currentLang23 = texts[currentLang]) === null || _texts$currentLang23 === void 0 ? void 0 : _texts$currentLang23.autoGearScenarioModeAny) || ((_texts$en299 = texts.en) === null || _texts$en299 === void 0 ? void 0 : _texts$en299.autoGearScenarioModeAny) || 'Match any selected scenario',
        multiplier: ((_texts$currentLang24 = texts[currentLang]) === null || _texts$currentLang24 === void 0 ? void 0 : _texts$currentLang24.autoGearScenarioModeMultiplier) || ((_texts$en300 = texts.en) === null || _texts$en300 === void 0 ? void 0 : _texts$en300.autoGearScenarioModeMultiplier) || 'Multiply when combined'
      };
      Array.from(autoGearScenarioModeSelectElement.options || []).forEach(function (option) {
        if (!option) return;
        if (option.value === 'multiplier') {
          option.disabled = uniqueValues.length < 2;
        } else {
          option.disabled = false;
        }
        var label = modeLabels[option.value] || modeLabels.all;
        if (label) {
          option.textContent = label;
        }
      });
      var nextMode = desiredMode;
      if (nextMode === 'multiplier' && uniqueValues.length < 2) {
        nextMode = 'all';
      }
      autoGearScenarioModeSelectElement.value = nextMode;
      if (autoGearEditorDraft && autoGearEditorDraft.scenarioLogic !== nextMode) {
        autoGearEditorDraft.scenarioLogic = nextMode;
      }
      updateAutoGearScenarioMultiplierVisibility(nextMode, uniqueValues);
    } else {
      updateAutoGearScenarioMultiplierVisibility(desiredMode, uniqueValues);
    }
  }
  function updateAutoGearScenarioMultiplierVisibility(mode, selectedValues) {
    if (!autoGearScenarioMultiplierContainer) return;
    var normalizedMode = normalizeAutoGearScenarioLogic(mode);
    var values = Array.isArray(selectedValues) ? selectedValues.filter(function (value) {
      return typeof value === 'string' && value.trim();
    }) : [];
    var shouldShow = normalizedMode === 'multiplier' && values.length >= 1;
    autoGearScenarioMultiplierContainer.hidden = !shouldShow;
    autoGearScenarioMultiplierContainer.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
    if (autoGearScenarioFactorInput) {
      autoGearScenarioFactorInput.disabled = !shouldShow;
    }
    refreshAutoGearScenarioBaseSelect(values, {
      forceDisable: !shouldShow
    });
  }
  function refreshAutoGearScenarioBaseSelect(selectedValues) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!autoGearScenarioBaseSelect) return;
    var _options$forceDisable = options.forceDisable,
      forceDisable = _options$forceDisable === void 0 ? false : _options$forceDisable;
    var values = Array.isArray(selectedValues) ? selectedValues.filter(function (value) {
      return typeof value === 'string' && value.trim();
    }) : [];
    var uniqueValues = Array.from(new Set(values));
    var previousValue = autoGearScenarioBaseSelect.value || '';
    autoGearScenarioBaseSelect.innerHTML = '';
    if (forceDisable || !uniqueValues.length) {
      var _texts$currentLang25, _texts$en301;
      var placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = ((_texts$currentLang25 = texts[currentLang]) === null || _texts$currentLang25 === void 0 ? void 0 : _texts$currentLang25.autoGearScenarioBasePlaceholder) || ((_texts$en301 = texts.en) === null || _texts$en301 === void 0 ? void 0 : _texts$en301.autoGearScenarioBasePlaceholder) || 'Select a base scenario';
      placeholder.disabled = true;
      placeholder.selected = true;
      autoGearScenarioBaseSelect.appendChild(placeholder);
      autoGearScenarioBaseSelect.disabled = true;
      return;
    }
    uniqueValues.forEach(function (value) {
      var option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      autoGearScenarioBaseSelect.appendChild(option);
    });
    var preferred = autoGearEditorDraft ? normalizeAutoGearScenarioPrimary(autoGearEditorDraft.scenarioPrimary) : '';
    var normalizedPreferred = normalizeAutoGearTriggerValue(preferred);
    var nextValue = '';
    if (normalizedPreferred) {
      var matched = uniqueValues.find(function (value) {
        return normalizeAutoGearTriggerValue(value) === normalizedPreferred;
      });
      if (matched) {
        nextValue = matched;
      }
    }
    if (!nextValue && previousValue) {
      var normalizedPrevious = normalizeAutoGearTriggerValue(previousValue);
      var matchedPrevious = uniqueValues.find(function (value) {
        return normalizeAutoGearTriggerValue(value) === normalizedPrevious;
      });
      if (matchedPrevious) {
        nextValue = matchedPrevious;
      }
    }
    if (!nextValue) {
      nextValue = uniqueValues[0];
    }
    autoGearScenarioBaseSelect.value = nextValue;
    autoGearScenarioBaseSelect.disabled = false;
  }
  function refreshAutoGearMatteboxOptions(selected) {
    if (!autoGearMatteboxSelect) return;
    var candidateValues = Array.isArray(selected) ? selected : typeof selected === 'string' && selected ? [selected] : Array.isArray(autoGearEditorDraft === null || autoGearEditorDraft === void 0 ? void 0 : autoGearEditorDraft.mattebox) ? autoGearEditorDraft.mattebox : [];
    var selectedValues = Array.from(new Set(candidateValues.filter(function (value) {
      return typeof value === 'string';
    }).map(function (value) {
      return value.trim();
    }).filter(Boolean)));
    autoGearMatteboxSelect.innerHTML = '';
    autoGearMatteboxSelect.multiple = true;
    var source = document.getElementById('mattebox');
    var hasOptions = false;
    if (source) {
      Array.from(source.options).forEach(function (opt) {
        if (!opt.value) return;
        var option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.textContent;
        if (selectedValues.includes(opt.value)) {
          option.selected = true;
        }
        autoGearMatteboxSelect.appendChild(option);
        hasOptions = true;
      });
    }
    if (!hasOptions) {
      var _texts$currentLang26, _texts$en302;
      var placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = ((_texts$currentLang26 = texts[currentLang]) === null || _texts$currentLang26 === void 0 ? void 0 : _texts$currentLang26.autoGearMatteboxPlaceholder) || ((_texts$en302 = texts.en) === null || _texts$en302 === void 0 ? void 0 : _texts$en302.autoGearMatteboxPlaceholder) || 'Select mattebox options';
      placeholder.disabled = true;
      placeholder.selected = true;
      autoGearMatteboxSelect.appendChild(placeholder);
    } else {
      selectedValues.forEach(function (value) {
        var exists = Array.from(autoGearMatteboxSelect.options || []).some(function (option) {
          return option && option.value === value;
        });
        if (!exists) {
          var fallbackOption = document.createElement('option');
          fallbackOption.value = value;
          fallbackOption.textContent = value;
          fallbackOption.selected = true;
          autoGearMatteboxSelect.appendChild(fallbackOption);
        }
      });
    }
    var selectableOptions = Array.from(autoGearMatteboxSelect.options || []).filter(function (option) {
      return !option.disabled;
    });
    autoGearMatteboxSelect.size = computeAutoGearMultiSelectSize(selectableOptions.length, {
      minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS
    });
  }
  function refreshAutoGearCameraHandleOptions(selected) {
    if (!autoGearCameraHandleSelect) return;
    var candidateValues = Array.isArray(selected) ? selected : typeof selected === 'string' && selected ? [selected] : Array.isArray(autoGearEditorDraft === null || autoGearEditorDraft === void 0 ? void 0 : autoGearEditorDraft.cameraHandle) ? autoGearEditorDraft.cameraHandle : [];
    var selectedValues = Array.from(new Set(candidateValues.filter(function (value) {
      return typeof value === 'string';
    }).map(function (value) {
      return value.trim();
    }).filter(Boolean)));
    autoGearCameraHandleSelect.innerHTML = '';
    autoGearCameraHandleSelect.multiple = true;
    var source = document.getElementById('cameraHandle');
    var hasOptions = false;
    if (source) {
      Array.from(source.options).forEach(function (opt) {
        if (!opt.value) return;
        var option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.textContent;
        if (selectedValues.includes(opt.value)) {
          option.selected = true;
        }
        autoGearCameraHandleSelect.appendChild(option);
        hasOptions = true;
      });
    }
    if (!hasOptions) {
      var _texts$currentLang27, _texts$en303;
      var placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = ((_texts$currentLang27 = texts[currentLang]) === null || _texts$currentLang27 === void 0 ? void 0 : _texts$currentLang27.autoGearCameraHandlePlaceholder) || ((_texts$en303 = texts.en) === null || _texts$en303 === void 0 ? void 0 : _texts$en303.autoGearCameraHandlePlaceholder) || 'Select camera handles';
      placeholder.disabled = true;
      placeholder.selected = true;
      autoGearCameraHandleSelect.appendChild(placeholder);
    } else {
      selectedValues.forEach(function (value) {
        var exists = Array.from(autoGearCameraHandleSelect.options || []).some(function (option) {
          return option && option.value === value;
        });
        if (!exists) {
          var fallbackOption = document.createElement('option');
          fallbackOption.value = value;
          fallbackOption.textContent = value;
          fallbackOption.selected = true;
          autoGearCameraHandleSelect.appendChild(fallbackOption);
        }
      });
    }
    var selectableOptions = Array.from(autoGearCameraHandleSelect.options || []).filter(function (option) {
      return !option.disabled;
    });
    autoGearCameraHandleSelect.size = computeAutoGearMultiSelectSize(selectableOptions.length, {
      minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS
    });
  }
  function resolveViewfinderOptionValue(option) {
    if (!option) return '';
    var raw = typeof option.value === 'string' ? option.value : '';
    return raw ? raw : '__none__';
  }
  function getViewfinderFallbackLabel(value) {
    if (value === '__none__') {
      var _texts$currentLang28, _texts$en304;
      return ((_texts$currentLang28 = texts[currentLang]) === null || _texts$currentLang28 === void 0 ? void 0 : _texts$currentLang28.viewfinderExtensionNone) || ((_texts$en304 = texts.en) === null || _texts$en304 === void 0 ? void 0 : _texts$en304.viewfinderExtensionNone) || 'No';
    }
    return value;
  }
  function getVideoDistributionFallbackLabel(value) {
    if (value === '__none__') {
      var _texts$currentLang29, _texts$en305;
      return ((_texts$currentLang29 = texts[currentLang]) === null || _texts$currentLang29 === void 0 ? void 0 : _texts$currentLang29.autoGearVideoDistributionNone) || ((_texts$en305 = texts.en) === null || _texts$en305 === void 0 ? void 0 : _texts$en305.autoGearVideoDistributionNone) || 'No video distribution selected';
    }
    return value;
  }
  function normalizeVideoDistributionOptionValue(value) {
    if (typeof value !== 'string') return '';
    var trimmed = value.trim();
    if (!trimmed) return '';
    var lower = trimmed.toLowerCase();
    if (lower === '__none__' || lower === 'none') return '__none__';
    return trimmed;
  }
  function refreshAutoGearViewfinderExtensionOptions(selected) {
    if (!autoGearViewfinderExtensionSelect) return;
    var candidateValues = Array.isArray(selected) ? selected : typeof selected === 'string' && selected ? [selected] : Array.isArray(autoGearEditorDraft === null || autoGearEditorDraft === void 0 ? void 0 : autoGearEditorDraft.viewfinderExtension) ? autoGearEditorDraft.viewfinderExtension : [];
    var selectedValues = Array.from(new Set(candidateValues.filter(function (value) {
      return typeof value === 'string';
    }).map(function (value) {
      return value.trim();
    }).filter(Boolean)));
    autoGearViewfinderExtensionSelect.innerHTML = '';
    autoGearViewfinderExtensionSelect.multiple = true;
    var source = document.getElementById('viewfinderExtension');
    var hasOptions = false;
    if (source) {
      Array.from(source.options).forEach(function (opt) {
        var option = document.createElement('option');
        var value = resolveViewfinderOptionValue(opt);
        option.value = value;
        option.textContent = opt.textContent;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearViewfinderExtensionSelect.appendChild(option);
        hasOptions = true;
      });
    }
    if (!hasOptions) {
      var _texts$currentLang30, _texts$en306;
      var placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = ((_texts$currentLang30 = texts[currentLang]) === null || _texts$currentLang30 === void 0 ? void 0 : _texts$currentLang30.autoGearViewfinderExtensionPlaceholder) || ((_texts$en306 = texts.en) === null || _texts$en306 === void 0 ? void 0 : _texts$en306.autoGearViewfinderExtensionPlaceholder) || 'Select viewfinder extension options';
      placeholder.disabled = true;
      placeholder.selected = true;
      autoGearViewfinderExtensionSelect.appendChild(placeholder);
    } else {
      selectedValues.forEach(function (value) {
        var exists = Array.from(autoGearViewfinderExtensionSelect.options || []).some(function (option) {
          return option && option.value === value;
        });
        if (!exists) {
          var fallbackOption = document.createElement('option');
          fallbackOption.value = value;
          fallbackOption.textContent = getViewfinderFallbackLabel(value);
          fallbackOption.selected = true;
          autoGearViewfinderExtensionSelect.appendChild(fallbackOption);
        }
      });
    }
    var selectableOptions = Array.from(autoGearViewfinderExtensionSelect.options || []).filter(function (option) {
      return !option.disabled;
    });
    autoGearViewfinderExtensionSelect.size = computeAutoGearMultiSelectSize(selectableOptions.length, {
      minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS
    });
  }
  function refreshAutoGearDeliveryResolutionOptions(selected) {
    if (!autoGearDeliveryResolutionSelect) return;
    var selectedValues = collectAutoGearSelectedValues(selected, 'deliveryResolution');
    autoGearDeliveryResolutionSelect.innerHTML = '';
    autoGearDeliveryResolutionSelect.multiple = true;
    var seen = new Set();
    var addOption = function addOption(value, label) {
      var normalized = typeof value === 'string' ? value.trim() : '';
      if (!normalized || seen.has(normalized)) return;
      var option = document.createElement('option');
      option.value = normalized;
      option.textContent = label || normalized;
      if (selectedValues.includes(normalized)) {
        option.selected = true;
      }
      autoGearDeliveryResolutionSelect.appendChild(option);
      seen.add(normalized);
    };
    if (deliveryResolutionSelect) {
      Array.from(deliveryResolutionSelect.options || []).forEach(function (opt) {
        if (!opt || typeof opt.value !== 'string') return;
        var value = opt.value.trim();
        if (!value) return;
        var label = (opt.textContent || value).trim();
        addOption(value, label);
      });
    }
    selectedValues.forEach(function (value) {
      if (!seen.has(value)) addOption(value, value);
    });
    if (!autoGearDeliveryResolutionSelect.options.length) {
      var _texts$currentLang31, _texts$en307;
      var placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = ((_texts$currentLang31 = texts[currentLang]) === null || _texts$currentLang31 === void 0 ? void 0 : _texts$currentLang31.autoGearDeliveryResolutionPlaceholder) || ((_texts$en307 = texts.en) === null || _texts$en307 === void 0 ? void 0 : _texts$en307.autoGearDeliveryResolutionPlaceholder) || 'Select delivery resolutions';
      placeholder.disabled = true;
      placeholder.selected = true;
      autoGearDeliveryResolutionSelect.appendChild(placeholder);
    }
    var visibleCount = Array.from(autoGearDeliveryResolutionSelect.options || []).filter(function (option) {
      return !option.disabled;
    }).length;
    autoGearDeliveryResolutionSelect.size = computeAutoGearMultiSelectSize(visibleCount, {
      minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS
    });
  }
  function refreshAutoGearVideoDistributionOptions(selected) {
    if (!autoGearVideoDistributionSelect) return;
    var candidateValues = Array.isArray(selected) ? selected : typeof selected === 'string' && selected ? [selected] : Array.isArray(autoGearEditorDraft === null || autoGearEditorDraft === void 0 ? void 0 : autoGearEditorDraft.videoDistribution) ? autoGearEditorDraft.videoDistribution : [];
    var normalizedSelections = Array.from(new Set(candidateValues.map(normalizeVideoDistributionOptionValue).filter(Boolean)));
    var hasNoneSelection = normalizedSelections.includes('__none__');
    var selectedValues = normalizedSelections.filter(function (value) {
      return value !== '__none__';
    });
    autoGearVideoDistributionSelect.innerHTML = '';
    autoGearVideoDistributionSelect.multiple = true;
    var noneOption = document.createElement('option');
    noneOption.value = '__none__';
    noneOption.textContent = getVideoDistributionFallbackLabel('__none__');
    if (hasNoneSelection) {
      noneOption.selected = true;
    }
    autoGearVideoDistributionSelect.appendChild(noneOption);
    var source = document.getElementById('videoDistribution');
    var hasOptions = false;
    if (source) {
      Array.from(source.options).forEach(function (opt) {
        var value = normalizeVideoDistributionOptionValue(opt.value);
        if (!value) return;
        if (value === '__none__') {
          if (hasNoneSelection) {
            noneOption.selected = true;
          }
          return;
        }
        var option = document.createElement('option');
        option.value = value;
        option.textContent = opt.textContent;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearVideoDistributionSelect.appendChild(option);
        hasOptions = true;
      });
    }
    if (!hasOptions) {
      var _texts$currentLang32, _texts$en308;
      var placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = ((_texts$currentLang32 = texts[currentLang]) === null || _texts$currentLang32 === void 0 ? void 0 : _texts$currentLang32.autoGearVideoDistributionPlaceholder) || ((_texts$en308 = texts.en) === null || _texts$en308 === void 0 ? void 0 : _texts$en308.autoGearVideoDistributionPlaceholder) || 'Select video distribution options';
      placeholder.disabled = true;
      placeholder.selected = true;
      autoGearVideoDistributionSelect.appendChild(placeholder);
    } else {
      selectedValues.forEach(function (value) {
        var exists = Array.from(autoGearVideoDistributionSelect.options || []).some(function (option) {
          return option && option.value === value;
        });
        if (!exists) {
          var fallbackOption = document.createElement('option');
          fallbackOption.value = value;
          fallbackOption.textContent = getVideoDistributionFallbackLabel(value);
          fallbackOption.selected = true;
          autoGearVideoDistributionSelect.appendChild(fallbackOption);
        }
      });
    }
    var selectableOptions = Array.from(autoGearVideoDistributionSelect.options || []).filter(function (option) {
      return !option.disabled;
    });
    autoGearVideoDistributionSelect.size = computeAutoGearMultiSelectSize(selectableOptions.length, {
      minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS
    });
  }
  function collectAutoGearSelectedValues(selected, key) {
    var candidateValues = Array.isArray(selected) ? selected : typeof selected === 'string' && selected ? [selected] : Array.isArray(autoGearEditorDraft === null || autoGearEditorDraft === void 0 ? void 0 : autoGearEditorDraft[key]) ? autoGearEditorDraft[key] : [];
    return Array.from(new Set(candidateValues.filter(function (value) {
      return typeof value === 'string';
    }).map(function (value) {
      return value.trim();
    }).filter(Boolean)));
  }
  function getCrewRoleEntries() {
    var _texts$en309;
    var langTexts = texts[currentLang] || texts.en || {};
    var crewRoleMap = langTexts.crewRoles || ((_texts$en309 = texts.en) === null || _texts$en309 === void 0 ? void 0 : _texts$en309.crewRoles) || {};
    var seen = new Set();
    var entries = [];
    Object.entries(crewRoleMap).forEach(function (_ref79) {
      var _ref80 = _slicedToArray(_ref79, 2),
        value = _ref80[0],
        label = _ref80[1];
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
    TEMPERATURE_STORAGE_KEY: TEMPERATURE_STORAGE_KEY,
    TEMPERATURE_UNITS: TEMPERATURE_UNITS,
    TEMPERATURE_SCENARIOS: TEMPERATURE_SCENARIOS,
    FOCUS_SCALE_STORAGE_KEY: FOCUS_SCALE_STORAGE_KEY,
    FOCUS_SCALE_VALUES: FOCUS_SCALE_VALUES,
    FEEDBACK_TEMPERATURE_MIN: FEEDBACK_TEMPERATURE_MIN,
    FEEDBACK_TEMPERATURE_MAX: FEEDBACK_TEMPERATURE_MAX
  };
  Object.assign(CORE_RUNTIME_CONSTANTS, MOUNT_VOLTAGE_RUNTIME_EXPORTS);
  Object.assign(CORE_RUNTIME_CONSTANTS, {
    startPinkModeAnimatedIcons: startPinkModeAnimatedIcons,
    stopPinkModeAnimatedIcons: stopPinkModeAnimatedIcons,
    pinkModeIcons: pinkModeIcons,
    ensureSvgHasAriaHidden: ensureSvgHasAriaHidden,
    triggerPinkModeIconRain: triggerPinkModeIconRain,
    PINK_MODE_ICON_INTERVAL_MS: PINK_MODE_ICON_INTERVAL_MS,
    PINK_MODE_ICON_ANIMATION_CLASS: PINK_MODE_ICON_ANIMATION_CLASS,
    PINK_MODE_ICON_ANIMATION_RESET_DELAY: PINK_MODE_ICON_ANIMATION_RESET_DELAY,
    getGridSnapState: getGridSnapState,
    setGridSnapState: setGridSnapState
  });
  exposeCoreRuntimeConstants(CORE_RUNTIME_CONSTANTS);
  exposeCoreRuntimeBindings({
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
      }
    },
    pinkModeIconRotationTimer: {
      get: function get() {
        return pinkModeIconRotationTimer;
      },
      set: function set(value) {
        if (typeof value === 'number' || value === null || _typeof(value) === 'object') {
          pinkModeIconRotationTimer = value;
        }
      }
    },
    pinkModeIconIndex: {
      get: function get() {
        return pinkModeIconIndex;
      },
      set: function set(value) {
        if (typeof value === 'number') {
          pinkModeIconIndex = value;
        }
      }
    }
  });
}